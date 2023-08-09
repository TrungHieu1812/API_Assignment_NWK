var myModel = require("../../models/allModel");

var objReturn = {
    status: 1,
    message: "",
};


// Get comments theo id truyện
const getComment = async (req, res) => {
    let listCom;
    try {
        listCom = await myModel.Comment_Model.find({ id_comic: req.params.idc }).populate('id_user')

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
    try {
        const comic = await myModel.Comic_Model.findById(req.params.comicId);
        const users = await myModel.User_Model.findById(req.params.usersId);
        // console.log({comic, users});
        let cmt = new myModel.Comment_Model();
        await comic.updateOne({ $push: { id_comment: cmt._id } });
        cmt.date = req.body.date;
        cmt.content = req.body.content;
        cmt.id_comic = comic;
        cmt.id_user = users;
        try {
            await cmt.save();
            res.status(200).json({ cmt });
        } catch (error) {
            res.json({ message: error.message });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};

const updateCmt = async (req, res) => {
    try {
        const cmt = await myModel.Comment_Model.findById(req.params.cmtId);
        const users = await myModel.Comment_Model.findById(req.params.usersId);
        if (cmt.id_user != req.params.usersId) {
            return res.status(401).json({ message: "Bạn không có quyền sửa bình luận này!" });
        } else {
            cmt.content = req.body.content;
            cmt.date = req.body.date;
            await cmt.save();
            const comic = await myModel.Comic_Model.findById(cmt.id_comic);
            const index = comic.id_comment.indexOf(cmt._id); //tìm vị trí của cmt vừa update
            // nếu tìm thấy
            if (index > -1) {
                comic.id_comment[index] = cmt._id;
            }
            await comic.save();
            res.status(200).json(comic);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};


const deleteCmt = async (req, res) => {
    try {
        const cmt = await myModel.Comment_Model.findById(req.params.cmtId);
        if (cmt.id_user != req.params.usersId) {
            return res.status(401).json({ msg: "Bạn không có quyền xóa bình luận này!" });
        }

        const comic = await myModel.Comic_Model.findById(cmt.id_comic);
        const index = comic.id_comment.indexOf(cmt._id);
        if (index > -1) {
            comic.id_comment.splice(index, 1);
        }
        await comic.save();
        await myModel.Comment_Model.findByIdAndDelete(req.params.cmtId);
        res.status(200).json({message: 'Xóa bình luận thành công'});

    } catch (error) {
        console.error(error);
        res.status(500).json(error.message)
    }
};






module.exports = {
    getComment,
    addComment,
    updateCmt,
    deleteCmt
};
