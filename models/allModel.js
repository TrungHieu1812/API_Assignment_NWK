var { model } = require("mongoose");

var db = require("./db");

const User_Schema = new db.mongoose.Schema(
    {
        fullname: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        avatar: { type: String, required: false },
        role :{type: Number, enum: [0,1]} //0: admin, 1: users
    },
    { collection: 'users' }
);


const Comics_Schema = new db.mongoose.Schema(
    {
        name: { type: String, required: true },
        desc: { type: String, required: true },
        author: { type: String, required: true },
        release: { type: Number, required: true },
        cover_img: { type: String, required: false },
        list_image: [
            {type: String,required: true,},
          ],
        id_comment:[
            {type: db.mongoose.Schema.Types.ObjectId, ref: 'Comment_Model'}
        ],
        chapter: { type: Number, required: true },
    },
    { collection: 'comics' }
);


const Comment_Schema = new db.mongoose.Schema(
    {
        content: { type: String, required: true },
        date: { type: Date, default: Date.now },
        id_comic: {type: db.mongoose.Schema.Types.ObjectId, ref: 'Comic_Model',required: true},
        id_user: {type: db.mongoose.Schema.Types.ObjectId, ref: 'User_Model',required: true},
    },
    { collection: 'comments' }
);





let User_Model = db.mongoose.model('User_Model', User_Schema);
let Comic_Model = db.mongoose.model("Comic_Model", Comics_Schema);
let Comment_Model = db.mongoose.model("Comment_Model", Comment_Schema);

module.exports = {
    User_Model,
    Comic_Model,
    Comment_Model,
};
