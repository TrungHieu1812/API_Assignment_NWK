var myModel = require("../../models/allModel");

var objReturn = {
    status: 1,
    message: "",
};

// Get comments theo id truyện
const getComment = async (req, res) => {
    let listCom;
    try {
        listCom = await myModel.Comment_Model.find({id_comic:req.params.idc})
                                             .select({content:true,date:true,_id:false})
                                             .populate('id_user','username')
                                            
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

//Get comments theo id truyện hiển thị trong chi tiết truyện
// const getComment = async (req, res) => {
//     let listCom;
//     try {
//         listCom = await myModel.Comic_Model.findById(req.params.idc)
//                                             .select({name:true,
//                                                 desc:true,
//                                                 author:true,
//                                                 release:true,
//                                                 cover_img:true,
//                                             }) 
//                                             .populate('id_comment',"content date")
//         if (listCom.length > 0) {
//             objReturn.data = 0;
//         } else {
//             objReturn.status = 0;
//             objReturn.message = "Không có dữ liệu phù hợp!";
//         }
//         objReturn.data = listCom;
//     } catch (error) {
//         objReturn.message = error.message;
//         objReturn.status = 0;
//     }
//     return res.status(200).json(objReturn.data);
// };
  

const addComment = async (req, res) => {

    const comicId = req.params.idc;
    const { content,id_user } = req.body;

    try {
      const comment = new myModel.Comment_Model({ content ,comicId, id_user });
      await comment.save();
      res.json(comment);
    } catch (error) {
      res.status(500).json({ error: "Lỗi gửi bình luận" });
    }
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



module.exports = {
    getComment,
    addComment,
};
