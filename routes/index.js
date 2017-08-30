const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
  res.render('home',{});
});

router.get('/event/new', (req, res)=>{
    res.render('')
});


module.exports = router;