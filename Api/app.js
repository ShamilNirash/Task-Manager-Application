const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const {mongoose} = require('./db/mongoose');
const cors = require("cors");
const createProxyMiddleware = require("http-proxy-middleware")
//load models to app.js
const {list}= require('./db/models/list.model');
const {Task}= require('./db/models/task.module');

// load middleware(body of request)
app.use(bodyParser.json());

// CORS HEADERS MIDDLEWARE
app.use(cors({}));

/* 
path: Get /lists
task: get all lists
 */

/* app.get("/lists", (req, res) => {
  list.find().then((lists) => {
    console.log(lists)
    res.send(lists);
  });
}); */

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
  try{
    let title =await req.body.title;          //get the title of request
   let newList =await  new list({title});    //create a new list
   await newList.save().then((updatedList)=>{res.send(updatedList)});   //send the updated list as response
  }catch(error){
    console.log("Error has been Occur in Post :", error);
    res.sendStatus(500).send("Error has been Occur in Post");
  } 
  
});

/* 
path: Patch /lists/:id 
task: update specified list
*/
app.patch("/lists/:id", (req, res) => {
  list.findOneAndUpdate({_id:req.params.id},{$set:req.body}).then(()=>{res.sendStatus(200);});
});

/* 
path: Delete lists/:id 
task: delete specified list 
*/
app.delete("/lists/:id", (req, res) => {
  list.findOneAndDelete({_id:req.params.id}).then((list)=>{res.send(list);});
});


/* 
path: Get list/:listId/tasks
task: get tasks related to one list id 
*/
/* app.get("/lists/:listId/tasks",(req,res)=>{
  Task.find({listId:req.params.listId}).then((tasks)=>{res.send(tasks);});
});
 */
app.get("/lists/:listId/tasks/:taskId",(req,res)=>{
  Task.findOne({
    listId:req.params.listId,
    _id:req.params.taskId
  }).then((foundTask)=>{res.send(foundTask);});
})
/* 
path: Post list/:listId/tasks
task: add new task to related list id
*/
app.post("/lists/:listId/tasks",(req,res)=>{
  let title= req.body.title;
  let listId = req.params.listId;
  let newTask = new Task({title, listId});
  newTask.save().then((task)=>{res.send(task);});
})

/* 
path: Patch lists/:listId/tasks
task: update task to related list id and task id
 */
app.patch('/lists/:listId/tasks/:taskId',(req,res)=>{
  Task.findOneAndUpdate({
    listId:req.params.listId,
     _id:req.params.taskId},
     {$set:req.body}).then(()=>{res.sendStatus(200)})
})

/* 
path: Delete lists/:listId/tasks/:taskId
task: delete task related to the task id no and list id no
 */
app.delete("/lists/:listId/tasks/:taskId",(req,res)=>{
  Task.findOneAndDelete({
    listId:req.params.listId,
    _id: req.params.taskId
  }).then((removedTask)=>{res.send(removedTask);});
})

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
