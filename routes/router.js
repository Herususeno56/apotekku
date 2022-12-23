const express = require("express");
const router = express.Router();
const samplecontroler = require("../controlers/samplecontroler");
const storage = require("../controlers/storage");
const {register, login, getData, getDataId, putData, deleteData, search} = require("../controlers/authController");

//SAMPLE
router.get("/", samplecontroler.methodGet);
router.post("/", samplecontroler.methodPost);
router.put("/", samplecontroler.methodPut);
router.delete("/", samplecontroler.methodDelete);

//storage
router.post("/storage", storage.postData);
router.get("/storage", storage.getData);
router.get("/storage/:id", storage.getDataId);
router.put("/storage/:id", storage.putData);
router.delete("/storage/:id", storage.deleteData);
//search
router.post("/storage/search", storage.search);

//user
router.post("/auth/register", register);
router.post("/auth/login", login)
router.get("/auth/user", getData)
router.get("/auth/user/:id", getDataId)
router.put("/auth/user/:id",putData)
router.delete("/auth/user/:id", deleteData)
//search
router.post("/auth/search", search);


module.exports = router;
