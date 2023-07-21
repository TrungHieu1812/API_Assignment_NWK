const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Assignment_NWK')
    .catch((error)=>{
        console.log("Loi ket noi");
        console.log(error);
    });


module.exports = {mongoose}    