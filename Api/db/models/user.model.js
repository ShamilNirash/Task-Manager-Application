const mongoose = require("mongoose");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { log } = require("console");
const { rejects } = require("assert");
const { resolve } = require("path");
const jwtsecret = "4094072763bheriuhnefqjiomn014364BIUB#E8636743ewwsde9488";
const refreshSecret = "072763bheri4364BIUB#E8636743ewws094072763bheriuh";
let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    minlength: 1,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    minlength: 8,
  },
  sessions: [
    {
      token: { type: String, require: true },
      expireAt: {
        type: Number,
        require: true,
      },
    },
  ],
});

/*
 * Override toJson() method
 * to avoid getting password and sessions
 */
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  return new _.omit(userObject, ["password", "sessions"]);
};
/* 
*return jwtsecret
*/
UserSchema.statics.getJwtSecret= ()=>{
  return  refreshSecret;
}

/* 
generate  json web token
 */
UserSchema.methods.generateAuthToken = function () {
  const user = this;
  return new Promise((resolve, reject) => {
    jwt.sign(
      { _id: user._id },
      jwtsecret,
      { expiresIn: "20s" },
      (err, token) => {
        if (!err) {
          return resolve(token);
        } else {
          return reject();
        }
      }
    );
  });
};

/* 
generate refresh token
 */
UserSchema.methods.generateRefreshToken = function () {
  user = this;
  return new Promise((resolve, reject) => {
    jwt.sign(
      { _id: user._id },
      refreshSecret,
      {
        expiresIn: "30m",
      },
      (err, token) => {
        if (!err) {
          return resolve(token);
        } else {
          return reject();
        }
      }
    );
  });
};

/* 
create session
 */
UserSchema.methods.createSession = function () {
  const user = this;
  return new Promise((resolve, reject) => {
    user
      .generateRefreshToken()
      .then((token) => {
        return saveToDatabase(token, user); // Assuming saveToDatabase returns a promise
      })
      .then((token) => {
        return resolve(token);
      })
      .catch((e) => {
        reject("failed to create the session", e); // Reject the promise if there's an error
      });
  });
};

/* HELPER METHODS */
/* 
save session to database
*/
let saveToDatabase = (refreshToken, user) => {
  return new Promise((resolve, reject) => {
    user.sessions.push({
      token: refreshToken,
      expireAt: generateRefreshTokenExpireTime(),
    });
    user
      .save()
      .then(() => {
        return resolve(refreshToken);
      })
      .catch((e) => {
        return reject("failed to save the session  in database", e);
      });
  });
};

let generateRefreshTokenExpireTime = function () {
  let currentTime = Date.now() / 1000; // convert to milliseconds
  const timeDuration = 10;
  return currentTime + timeDuration * 24 * 60 * 60;
};

/* Model methods */
UserSchema.statics.findByCredentials = function (email, password) {
  user = this;
  return new Promise((resolve, reject) => {
    user.findOne({ email }).then((user) => {
      if (!user) {
        return reject();
      } else {
        //pls look this
        if (user.password == password) {
          return resolve(user);
        } else {
          return reject();
        }
      }
    });
  }).catch((e) => {
    console.log(e);
  });
};

UserSchema.statics.findByIdAndToken = function (id, token) {
  user = this;
  return  user.findOne({
    "_id": id,
    "sessions.token": token,
  });
};

UserSchema.statics.hasRefreshTokenExpired = (expiresAt) => {
  let secondsSinceEpoch = Date.now() / 1000; // convert to second from milliseconds
  if (secondsSinceEpoch < expiresAt) {
    return false;
  } else {
    return true;
  }
};

/* Middle Ware */
/* before user document is save this code run  */
/* UserSchema.pre("save", function (next) {
  let user = this;
  let costFactor = 10;
  if (user.isModified("password")) {
    bcrypt.genSalt(costFactor, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
}); */

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
