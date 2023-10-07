const aysncHanlder = require("express-async-handler")
const Contact = require("../models/contactModels")
const { default: mongoose } = require("mongoose")

const getContacts = aysncHanlder(async (req,res)=>{
    const contacts = await Contact.find({user_id:req.user.id})

    res.status(200).json(contacts)
})

const getContact = aysncHanlder (async (req,res)=>{
    console.log("in contact")
    const contact = await Contact.findById(req.params.id)
    console.log(contact)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
}
)
const createContact = ( async (req,res)=>{
    const {name,email,phone} = req.body
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("all fields mandatory")
    }
    const contact =await Contact.create({
        user_id:req.user.id,
        name,
        email,
        phone})

    res.status(201).json(contact)
})
const updateContact= async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user dont have permission to updae other user contacts")
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json({updatedContact})
}
const deleteContact = async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user dont have permission to delete other user contacts")
    }
    await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json({message:`deleted contact for ${req.params.id}`})
}
module.exports = {getContacts,getContact,createContact,updateContact,deleteContact}