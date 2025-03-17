const express = require('express');
const router = express.Router();
const {
    createCompanyUser,
    getCompanyUser,
    updateCompanyUser,
    deleteCompanyUser
} = require('../controllers/companyUserController');

router.post('/register', createCompanyUser);
router.get('/:id', getCompanyUser);
router.put('/:id', updateCompanyUser);
router.delete('/:id', deleteCompanyUser);

module.exports = router;
