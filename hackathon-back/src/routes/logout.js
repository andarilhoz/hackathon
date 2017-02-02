'use strict';
const express = require('express'),
	      router  = express.Router()

router.get('/',(req,res) => {
	    req.logout();
	    res.status(200).send();
});


module.exports = router;
