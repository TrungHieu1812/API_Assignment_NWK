var myModel = require("../../models/allModel");
const { param } = require("../../routes/api");

var objReturn = {
    status: 1,
    message: "",
};

const getUser = async (req, res) => {
    let listUser;
    try {
        listUser = await myModel.User_Model.find();
        if (listUser.length > 0) {
            objReturn.data = 0;
        } else {
            objReturn.status = 0;
            objReturn.message = "Không có dữ liệu phù hợp!";
        }
        objReturn.data = listUser;
    } catch (error) {
        objReturn.message = error.message;
        objReturn.status = 0;
    }
    return res.status(200).json(objReturn.data);
};

const getOneUser = async (req, res) => {
    try {
        let User = await myModel.User_Model.findById(req.params.idu);

        objReturn.data = User;
    } catch (error) {
        objReturn.message = error.message;
        objReturn.message = "Không tìm user!";
    }
    return res.status(200).json(objReturn.data);
};

const addUser = async (req, res) => {

    let objUser = new myModel.User_Model();
    objUser.fullname = req.body.fullname;
    objUser.username = req.body.username;
    objUser.password = req.body.password;
    objUser.email = req.body.email;
    objUser.avatar = req.body.avatar;
    objUser.role = req.body.role;

    try {
        await objUser.save();
        objReturn.message = "Thêm thành công!";
    } catch (error) {
        objReturn.message = "Thêm thất bại!";
    }

    return res.json(objReturn);
};


const updateUser = async (req, res) => {

    let objUser = await myModel.User_Model.findById(req.params.idu);
    (objUser.fullname = req.body.fullname),
    (objUser.username = req.body.username),
    (objUser.password = req.body.password),
    (objUser.email = req.body.email),
    (objUser.avatar = req.body.avatar);
    (objUser.role = req.body.role);

    console.log('objUser ',objUser);


    try {
        await  myModel.User_Model.findByIdAndUpdate(req.params.idu, objUser);
        objReturn.message = "Sửa thành công!";
    } catch (error) {
        objReturn.message = "Sửa thất bại!";
        console.log(error.message);
    }

    return res.json(objReturn);
};

const deleteUser = async (req, res) => {
    try {
        await myModel.User_Model.findByIdAndDelete(req.params.idu);
        objReturn.message = "Xoá thành công!";
    } catch (error) {
        objReturn.message = "Xóa thất bại!";
    }

    return res.json(objReturn);
};

module.exports = {
    getUser,
    addUser,
    updateUser,
    deleteUser,
    getOneUser
};
