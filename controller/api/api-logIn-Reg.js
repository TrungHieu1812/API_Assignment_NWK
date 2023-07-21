var mymodel = require('../../models/allModel');
// const bcrypt = require("bcrypt");


var objReturn = {
    status: 1,
    message: "",
};

const login = async (req, res, next) => {
    
    try {
        let objU = await mymodel.User_Model.findOne({username:req.body.username});

        if (objU != null){ 
            //tồn tại username ==> kiểm tra passwd
            if(objU.password == req.body.password){
                //đúng thông tin tài khoản ==>lưu vào session
                req.session.userid = objU;
                //chuyển trang về trang quản trị
                // return res.redirect('/users')
                objReturn.message = "Đăng nhập thành công!";
            }else{
                objReturn.message = 'Mật khẩu không đúng!';
            }
        }else{
            objReturn.message = 'Không tồn tại tài khoản : '+req.body.username;
        }
       
    } catch (error) {
        objReturn.message = error.message;
    }

}


const reg = async (req, res, next) => {

    try {
        const salt = await bcrypt.genSalt(10);

        const user = new mymodel.User_Model(req.body);

        user.password = await bcrypt.hash(req.body.password, salt);
        const token = await user.generateAuthToken();

        let new_u = await user.save()


        return res.status(201).json({ user: new_u, token })

    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: error.message})
    }


}




const logout = async (req, res, next) => {
    try {
        console.log( req.user);
        // req.user.generateAuthToken();
        req.user.token = null; //xóa token
        await req.user.save()
        return res.status(200).json({msg: 'Đăng xuất thành công'});
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
 
}



module.exports = {
    login,
    reg,
    logout
};