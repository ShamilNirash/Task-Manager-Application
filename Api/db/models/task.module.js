const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    listId:{
        type:mongoose.Types.ObjectId,
      /*   required:true */
    } ,
    isCompleted:{
        type:Boolean,
        required: true,
        default:false
    }

})

const Task =mongoose.model('Task',taskSchema);

module.exports={
    Task
}