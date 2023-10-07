const express = require("express")
const { registerUser, loginUser ,currentUser} = require("../controllers/userController")
const validateToken = require("../middleware/tokenHandler")
const router = express.Router()

router.post('/register',registerUser)
router.get('/login',loginUser)
router.get('/current',validateToken,currentUser)

module.exports = router
