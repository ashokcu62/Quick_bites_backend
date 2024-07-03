const express = require('express')
const User = require('../Models/user')
const router = express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


router.post('/', async (req, res, next) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, saltRounds);
        const user = new User({
            ...req.body, 
            password: hash
        })
        await user.save()
        res.status(201).json(user)
    }
    catch (err) {
        res.status(400).send('Invalid Signup')
    }

})

router.post('/login', async (req, res, next) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const user = await User.findOne({ email: email }) //finding 

        if (!user) {
            return res.status(404).send( 'User not found')
        }
        const Auth = bcrypt.compareSync(password, user.password); // true
        if (!Auth) {
            return res.status(401).send('Login failed')
        }
        const token = jwt.sign({ _id: user._id, firstname: user.firstname }, process.env.JWT_SECRET, {    // secret key
            expiresIn: 3 * 24 * 60 * 60,
        });

        res.cookie("token", token, {
            withCredential: true,
            httpOnly: false,
        });
        res.status(200).json({ message: "Login Successfull", user:{ _id:user._id, firstname:user.firstname}})

    }
    catch (err) {
        res.status(400).send('Invalid login')
    }
})
router.post('/verify', async (req, res) => {
    const token = req.cookies.token 
    if (!token) {
        return res.status(401).send("user not logged in ")
    }
    return res.status(200).send("user logged in")
     

})


module.exports = router