var myModel = require("../../models/allModel");

var objReturn = {
    status: 1,
    message: "",
};

//Get comments theo id truyện
const getComment = async (req, res) => {
    let listCom;
    try {
        listCom = await myModel.Comment_Model.find({id_comic:req.params.idc})
                                             .select({content:true,date:true,_id:false})
                                            
        if (listCom.length > 0) {
            objReturn.data = 0;
        } else {
            objReturn.status = 0;
            objReturn.message = "Không có dữ liệu phù hợp!";
        }
        objReturn.data = listCom;
    } catch (error) {
        objReturn.message = error.message;
        objReturn.status = 0;
    }
    return res.status(200).json(objReturn.data);
};

const getComment1 = async (req, res) => {
    const comicId = req.params.idc;
    let listCom;
    try {
        listCom = await myModel.Comic_Model.findById(req.params.idc)
                                            .select({name:true,
                                                desc:true,
                                                author:true,
                                                release:true,
                                                cover_img:true,
                                            }) 
                                            .populate('id_comment')
                                            .find({id_comic:req.params.idc})
                                            // .select({content:true,date:true,_id:false})
                                            
        if (listCom.length > 0) {
            objReturn.data = 0;
        } else {
            objReturn.status = 0;
            objReturn.message = "Không có dữ liệu phù hợp!";
        }
        objReturn.data = listCom;
    } catch (error) {
        objReturn.message = error.message;
        objReturn.status = 0;
    }
    return res.status(200).json(objReturn.data);
};
  

const addComment = async (req, res) => {

    const comicId = req.params.idc;

    let obj = new myModel.Comment_Model({comicId});
    // obj.id_comic = req.body.id_comic;
    obj.id_user = req.body.id_user;
    obj.content = req.body.content;

    try {
        await obj.save();
        objReturn.message = "Thêm thành công!";
    } catch (error) {
        objReturn.message = "Thêm thất bại!";
    }

    return res.json(objReturn);
};


// app.post("/comics/:id/comments", async (req, res) => {
//     const comicId = req.params.id;
//     const { userId, content } = req.body;
//     try {
//       const comment = new Comment({ comicId, userId, content });
//       await comment.save();
//       res.json(comment);
//     } catch (error) {
//       res.status(500).json({ error: "Lỗi gửi bình luận" });
//     }
//   });


// const updateUser = async (req, res) => {

//     let objUser = await myModel.User_Model.findById(req.params.idu);
//     (objUser.fullname = req.body.fullname),
//     (objUser.username = req.body.username),
//     (objUser.password = req.body.password),
//     (objUser.email = req.body.email),
//     (objUser.avatar = req.body.avatar);


//     try {
//         await  myModel.User_Model.findByIdAndUpdate(req.params.idu, objUser);
//         objReturn.message = "Sửa thành công!";
//     } catch (error) {
//         objReturn.message = "Sửa thất bại!";
//         console.log(error.message);
//     }

//     return res.json(objReturn);
// };

// const deleteUser = async (req, res) => {
//     try {
//         await myModel.User_Model.findByIdAndDelete(req.params.idu);
//         objReturn.message = "Xoá thành công!";
//     } catch (error) {
//         objReturn.message = "Xóa thất bại!";
//     }

//     return res.json(objReturn);
// };

module.exports = {
    getComment,
    addComment,
    // updateUser,
    // deleteUser,
};