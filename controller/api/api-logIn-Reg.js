var mymodel = require('../../models/allModel');
// const bcrypt = require("bcrypt");


const login = async (req, res, next) => {
    
    try {
        const objU = await mymodel.User_Model.findOne({username:req.body.username});

        if (objU){ 
            if(objU.password === req.body.password){
                if (objU.role === 0) {
                    res.json({
                      exists: true,
                      role: 0,
                      fullname: objU.fullname,
                      email: objU.email,
                      message: "Đăng nhập thành công",
                    });
                  } else if (objU.role === 1) {
                    res.json({
                      exists: true,
                      role: 1,
                      fullname: objU.fullname,
                      email: objU.email,
                      message: "Đăng nhập thành công",
                    });
                  }
            }else{
                res.json({
                    exists: true,
                    message: "Đăng nhập không thành công",
                    error: "Mật khẩu không đúng",
                });
            }
        }else{
            res.json({
                exists: false,
                error: "Không tồn tại tài khoản "+req.body.username,
              });
        }
       
    } catch (error) {
        // objReturn.message = error.message;
        res.status(500).json({ error: "Lỗi đăng nhập" });
    }

}


const reg = async (req, res, next) => {

    const { fullname, username, password, email, avatar } = req.body;

    try {
      const existingUser = await mymodel.User_Model.findOne({ username: username });
      if (existingUser) {
        // Username đã tồn tại;
        res.json({ exists: true ,message: "Tài khoản "+ username+" đã tồn tại" });
      } else {
        const newUser = new mymodel.User_Model({
          fullname,
          username,
          password,
          email,
          avatar,
          role: 1,
        });
        const savedUser = await newUser.save();
        res.json({ exists: false, savedUser ,message: "Đăng ký thành công"}); // false là chưa có username thì đăng ký;
      }
    } catch (error) {
      res.status(500).json({ error: "Lỗi tạo mới người dùng" });
    }
}




const logout = async (req, res, next) => {
    // try {
    //     console.log( req.user);
    //     // req.user.generateAuthToken();
    //     await req.user.save()
    //     return res.status(200).json({msg: 'Đăng xuất thành công'});
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).send(error.message)
    // }
 
}



module.exports = {
    login,
    reg,
    logout
};