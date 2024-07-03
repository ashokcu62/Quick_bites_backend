const express = require('express');
const Contact = require('../Models/contact');
const router = express.Router()



router.post('/', async (req, res, next) => {
    try {
        const contact = new Contact(req.body);
        await contact.save()
        res.status(201).json(contact)
    }
    catch (err) {
        res.status(500).send('Error occured')
    }

})
router.get('/', async (req,res,next) =>{
    try{
        const contact = await Contact.find();
        res.status(200).json(contact)
    }
    catch(err){
        res.status(404).send('data not found ')
    }
})

module.exports = router

