const express = require('express');
const router = express.Router()
const Menu = require('../Models/menu');


router.post('/', async (req, res, next) => {
    try {
        const menus = new Menu(req.body);
        await menus.save() 
        res.status(201).json(menus)
    }
    catch (err) {
        res.status(500).send('Error occured')  
    }

}) 
router.get('/', async (req, res, next ) =>{   
    try{ 
        const menus = await Menu.find(); 
        res.status(200).json(menus)
    }
    catch(err){
        res.status(404).send('data not found ')
    }  

})
router.get('/:menuId',async (req, res, next) =>{
    try{
        const menu = await Menu.findById(req.params.menuId).exec(); 
        res.status(200).json(menu)
 
    } 
    catch(err){
         res.status(404).send('menu of given id not found!')

    } 


})

module.exports = router