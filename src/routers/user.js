const express= require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')

//Create new user
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        const token = await user.generateAuthToken()

        await user.save()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    } 
});

//Log in user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        
        res.send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

// Log out user
router.post('/users/logout', auth, async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Log out all users
router.post('/users/logoutall', auth, async(req,res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Get 'my' user info
router.get('/users/me', auth, async (req,res) => {
    res.send(req.user)
})


// Update user with specific id
router.patch('/users/me', auth, async(req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if (!isValidOperation) {
        return res.status(400).send({error: "One or more of your update items is invalid"})
    }


    try {


        updates.forEach(update => {
            req.user[update] = req.body[update]
        })

        await req.user.save()

        // const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete user
router.delete('/users/me', auth, async (req,res) => {
    const _id = req.user._id
    try {
        // const user = await User.findByIdAndDelete(_id)
        
        // if(!user) {
        //     return res.status(404).send('No user found with that ID')
        // }

        await req.user.remove()
        res.send(req.user)

    } catch (e) {
        res.status(500).send(e)
    }
})


module.exports = router