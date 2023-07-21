var myModel = require("../../models/allModel");

var objReturn = {
    status: 1,
    message: "",
};

const getListComic = async (req, res) => {
    let listComic;
    try {
        listComic = await myModel.Comic_Model.find().select({name:true,cover_img:true});
        if (listComic.length > 0) {
            objReturn.data = 0;
        } else {
            objReturn.status = 0;
            objReturn.message = "Không có dữ liệu phù hợp!";
        }
        objReturn.data = listComic;
    } catch (error) {
        objReturn.message = error.message;
        objReturn.status = 0;
    }
    return res.status(200).json(objReturn.data);
};

const getComic = async (req, res) => {
    let Comic;
    try {
        Comic = await myModel.Comic_Model.findById(req.params.idc)
        .select({name:true,
                desc:true,
                author:true,
                release:true,
                cover_img:true,
        }).populate('id_comment',"content date")

        objReturn.data = Comic;
    } catch (error) {
        objReturn.message = error.message;
        objReturn.message = "Không tìm thấy truyện!";
    }
    return res.status(200).json(objReturn.data);
};

const readComic = async (req, res) => {
    let Comic;
    try {
        Comic = await myModel.Comic_Model.findById(req.params.idc).select({list_image:true});
        objReturn.data = Comic;
    } catch (error) {
        objReturn.message = error.message;
        objReturn.message = "Không tìm thấy truyện!";
    }
    return res.status(200).json(objReturn.data);
};

const addComic = async (req, res) => {

    let objComic = new myModel.Comic_Model();
    objComic.name = req.body.name;
    objComic.desc = req.body.desc;
    objComic.author = req.body.author;
    objComic.release = req.body.release;
    objComic.cover_img = req.body.cover_img;
    objComic.list_image = req.body.list_image;

    try {
        await objComic.save();
        objReturn.message = "Thêm thành công!";
    } catch (error) {
        objReturn.message = "Thêm thất bại!";
    }

    return res.json(objReturn);
};


const updateComic = async (req, res) => {


    let objComic = await myModel.Comic_Model.findById(req.params.idc);
    (objComic.name = req.body.name),
    (objComic.desc = req.body.desc),
    (objComic.author = req.body.author),
    (objComic.release = req.body.release),
    (objComic.cover_img = req.body.avatar),
    (objComic.list_image = req.body.list_image);


    try {
        await  myModel.Comic_Model.findByIdAndUpdate(req.params.idc, objComic);
        objReturn.message = "Sửa thành công!";
    } catch (error) {
        objReturn.message = "Sửa thất bại!";
        console.log(error.message);
    }

    return res.json(objReturn);
};

const deleteComic = async (req, res) => {
    try {
        await myModel.Comic_Model.findByIdAndDelete(req.params.idc);
        objReturn.message = "Xoá thành công!";
    } catch (error) {
        objReturn.message = "Xóa thất bại!";
    }

    return res.json(objReturn);
};

module.exports = {
    getListComic,
    getComic,
    readComic,
    addComic,
    updateComic,
    deleteComic,
    
};
