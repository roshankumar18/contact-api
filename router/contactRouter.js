const express = require("express")
const router = express.Router();
const {getContacts,getContact,createContact,updateContact,deleteContact} = require("../controllers/contactController");
const validateToken = require("../middleware/tokenHandler");

router.use(validateToken)
router.get("/",getContacts).post("/",createContact)
router.get("/:id",getContact).put("/:id",updateContact).delete("/:id",deleteContact)


module.exports = router