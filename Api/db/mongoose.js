//This file handles the connection of database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/task-manager',).then(()=>{console.log("Connecting to Mongodb successfully. ");
}).catch((e)=>{console.log("Error while attempting  to connect to MongoDB");
;});


//to prevent deprecation warnings

/* mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false); */
module.exports ={
    mongoose
};
