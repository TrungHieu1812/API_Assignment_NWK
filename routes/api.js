var express = require("express");

var router = express.Router();

var api_user = require("../controller/api/api_users");
var api_comic = require("../controller/api/api_comics");
var api_comment = require("../controller/api/api_comments");
var api_LogIn_Reg = require("../controller/api/api-logIn-Reg");



//Đăng nhập - Đăng ký - Đăng xuất
router.post('/login', api_LogIn_Reg.login);
router.post('/reg', api_LogIn_Reg.reg); 
// router.get('/logout',mdw.api_auth, api_LogIn_Reg.logout);


//users
router.get("/users", api_user.getUser);
router.get("/users/:idu", api_user.getOneUser);
router.post("/users", api_user.addUser);
router.put("/update-user/:idu",api_user.updateUser);
router.delete("/delete-user/:idu",api_user.deleteUser);



//comics
router.get("/list-comics", api_comic.getListComic);
router.get("/comics/:idc", api_comic.getComic);
router.get("/read-comics/:idc", api_comic.readComic);
router.post("/comics", api_comic.addComic);
router.put("/update-comic/:idc",api_comic.updateComic);
router.delete("/delete-comic/:idc",api_comic.deleteComic);



//comments
router.get("/comics/comments/:idc", api_comment.getComment);
router.post("/comics/comments/:comicId/:usersId", api_comment.addComment);
router.put("/update-comments/:cmtId/:usersId",api_comment.updateCmt);
router.delete("/delete-comments/:cmtId/:usersId",api_comment.deleteCmt);

module.exports = router;