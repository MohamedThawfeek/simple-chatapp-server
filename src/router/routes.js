const router = require("express").Router();
const {
  Login,
  GetUser,
  Signup,
  GetContact
} = require("../controller/authentication/authentication");
const { ChatCreate, GetChats } = require("../controller/chat/chat");

// User Authentication
const { Authentication } = require("../middleware/authentication");

router.post("/login", Login);
router.post("/signup", Signup);
router.get("/user", [Authentication], GetUser);
router.get("/get-contact", [Authentication], GetContact);


router.post("/create-chat", [Authentication], ChatCreate);
router.post("/get-chat", [Authentication], GetChats);

module.exports = router;
