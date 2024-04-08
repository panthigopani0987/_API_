const mongoose = require('mongoose');

const crudSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : String,
        required : true
    },
    status : {
        type : Boolean,
        required : true
    },
    created_date: { 
        type: Date, 
        required : true,
        default: Date.now 
    },
    updated_date: { 
        type: Date, 
        required : true,
        default: Date.now 
    },
    image : {
        type : String,
        required : true
    }
});

const user = mongoose.model('User',crudSchema);

module.exports = user;