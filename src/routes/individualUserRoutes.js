const express = require('express');
const router = express.Router();
const {
    createIndividualUser,
    getIndividualUser,
    updateIndividualUser,
    deleteIndividualUser
} = require('../controllers/individualUserController.js');

router.post('/register', createIndividualUser);
router.get('/:id', getIndividualUser);
router.put('/:id', updateIndividualUser);
router.delete('/:id', deleteIndividualUser);

module.exports = router;
