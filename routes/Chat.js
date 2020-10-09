const express = require('express')
const router = express.Router()

router.get('/activeusers', (req,res)=>{
    res.send('List all active users.');
})

module.exports = router;