const express = require('express');
const router  = express.Router();

//renders myListings.ejs page to localhost:3000/myListings
router.get('/newListings', (req, res) => {

    res.render('/listings/newListings.ejs');
});




module.exports = router;