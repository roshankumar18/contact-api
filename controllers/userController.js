const aysncHanlder = require("express-async-handler")
const User = require("../models/userModel")
const userModel = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt= require("jsonwebtoken")
const { default: mongoose } = require("mongoose")

const registerUser= (async(req,res)=>{
    
        console.log(req.body)
        const{username,email,password}= req.body
        if(!username || !email || !password){
            res.status(400)
            throw new Error("Please fill the details")
        }
        console.log(username,password,email)
        const hashPassword = await bcrypt.hash(password,10)
        console.log(hashPassword)
        const user = await userModel.create({username,
            email,
            password:hashPassword})
        res.json({id:user.id,email:user.email})
    
    })

const loginUser =  (async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("all fields are mandatory")
        console.log("wrong fields")
    }
    const user = await userModel.findOne({email})
    
    if(user && await bcrypt.compare(password,user.password)){
        accessToken = jwt.sign({user:{
            id:user.id,
            username:user.username,
            email:user.email}},
            process.env.ACCESS_TOKEN_SECRET,
        {"expiresIn":"60m"})
        res.status(200).json({accessToken})  
    }else{
        res.status(401)
        throw new Error("email or password is not valid")
    }
    

    
})

const currentUser = async(req,res)=>{
    res.status(200).json(req.user)
}

module.exports = {registerUser,loginUser,currentUser}