const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')


router.get('/welcome',authMiddleware,(req,res)=>{
    const { username,id,role } = req.userInfo;

    res.json({
        message:'Welcome to the homepage',
        user:{
            _id:id,
            username,
            role
        }
    })
})

module.exports = router;