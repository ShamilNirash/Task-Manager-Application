const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { mongoose } = require("./db/mongoose");
const cors = require("cors");
const createProxyMiddleware = require("http-proxy-middleware");
//load models to app.js
const { list } = require("./db/models/list.model");
const { Task } = require("./db/models/task.module");
const { User } = require("./db/models/user.model");

// load middleware(body of request)
app.use(bodyParser.json());

// CORS HEADERS MIDDLEWARE
app.use(cors({}));

let verifySession = (req, res, next) => {   //not app.use() because always not want to execute this function
  // grab the refresh token from the request header
  let refreshToken = req.header("x-refresh-token");

  // grab the _id from the request header
  let _id = req.header("_id");

  User.findByIdAndToken(_id, refreshToken)
    .then((user) => {
      if (!user) {
        // user couldn't be found
        return Promise.reject({
          error:
            "User not found. Make sure that the refresh token and user id are correct",
        });
      }

      // if the code reaches here - the user was found
      // therefore the refresh token exists in the database - but we still have to check if it has expired or not
      else {
        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;
        let isSessionValid = false;

        user.sessions.forEach((session) => {
          if (session.token === refreshToken) {
            // check if the session has expired
           
            if (User.hasRefreshTokenExpired(session.expireAt) === false) {
              // refresh token has not expired
              isSessionValid = true;
             
            }
          }
        });
        if (isSessionValid) {
          // the session is VALID - call next() to continue with processing this web request
          next();
        } else {
          // the session is not valid
          return Promise.reject({
            error: "Refresh token has expired or the session is invalid",
          });
        }
      }
    })
    .catch((e) => {
      res.status(401).send(e);
    });
};

/* 
path: Get /lists
task: get all lists
 */

app.get("/lists", async (req, res) => {
  try {
    const lists = await list.find();

    res.send(lists);
  } catch (error) {
    console.error("Error retrieving lists:", error);
    res.status(500).send("Error retrieving lists");
  }
});

/* 
path: Put /lists
task: input new list
 */
app.post("/lists", async (req, res) => {
  console.log(req.body.title)
  try {
   
    let title = await req.body.title; //get the title of request
    let newList = await new list({ title }); //create a new list
    await newList.save().then((updatedList) => {
      res.send(updatedList);
    }); //send the updated list as response
  } catch (error) {
    console.log("Error has been Occur in Post :", error);
    res.status(500).send("Error has been Occur in Post");
  }
});

/* 
path: Patch /lists/:id 
task: update specified list
*/
app.patch("/lists/:id", (req, res) => {
  list.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }).then(() => {
    res.sendStatus(200);
  });
});

/* 
path: Delete lists/:id 
task: delete specified list 
*/
app.delete("/lists/:id", (req, res) => {
  list.findOneAndDelete({ _id: req.params.id }).then((list) => {
    res.send(list);
  });
});

/* 
path: Get list/:listId/tasks
task: get tasks related to one list id 
*/
app.get("/lists/:listId/tasks", async (req, res) => {
  try {
    await Task.find({ listId: req.params.listId }).then((tasks) => {
      res.send(tasks);
    });
  } catch (error) {
    console.log("This is an error in list/:listId/tasks", error);
    res.sendStatus(500).send("Error has been occur in list/:listId/tasks");
  }
});

app.get("/lists/:listId/tasks/:taskId", (req, res) => {
  Task.findOne({
    listId: req.params.listId,
    _id: req.params.taskId,
  }).then((foundTask) => {
    res.send(foundTask);
  });
});
/* 
path: Post list/:listId/tasks
task: add new task to related list id
*/
app.post("/lists/:listId/tasks", (req, res) => {
  let title = req.body.title;
  let listId = req.params.listId;
  let newTask = new Task({ title, listId });
  newTask.save().then((task) => {
    res.send(task);
  });
});

/* 
path: Patch lists/:listId/tasks
task: update task to related list id and task id
 */
app.patch("/lists/:listId/tasks/:taskId", (req, res) => {
  Task.findOneAndUpdate(
    {
      listId: req.params.listId,
      _id: req.params.taskId,
    },
    { $set: { isCompleted: req.body.isCompleted } }
  ).then(() => {});
});

/* 
path: Delete lists/:listId/tasks/:taskId
task: delete task related to the task id no and list id no
 */
app.delete("/lists/:listId/tasks/:taskId", (req, res) => {
  Task.findOneAndDelete({
    listId: req.params.listId,
    _id: req.params.taskId,
  }).then((removedTask) => {
    res.send(removedTask);
  });
});

/* USER ROUTES */
/*
 *path: Post /users
 *task: signup
 */
app.post("/users", (req, res) => {
  try {
    let body = req.body;
    let newUser = new User(body);
    newUser
      .save()
      .then(() => {
        return newUser.createSession();
      })
      .then((refreshToken) => {
        return newUser.generateAuthToken().then((authToken) => {
          res
             .header("x-refresh-token",refreshToken)
             .header( "x-accessToken", authToken)
             .send(newUser)
        });
      });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});
/*
 *path: Post users/login
 *task: login
 */
app.post("/users/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  User.findByCredentials(email, password)
    .then((user) => {
      return user.createSession().then((refreshToken) => {
        return user.generateAuthToken().then((authToken) => {
          return { refreshToken, authToken };
        });
      });
    })
    .then((token) => {
      res
        .header("x-refresh-token", token.refreshToken)
        .header("x-accessToken", token.authToken)
        .send(user);
    })
    .catch((e) => {
      res.status(404).send(e);
    });
});

app.get("/users/me/access-token", verifySession, (req, res) => {
  req.userObject
    .generateAuthToken()
    .then((token) => {
      res.header("x-accessToken", token).send(token);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
