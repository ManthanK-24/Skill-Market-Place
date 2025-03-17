const express = require('express');
const router = express.Router();
const { createSkill } = require('../controllers/SkillController');

const { updateSkill } = require('../controllers/SkillController');



router.post('/create', createSkill);

router.put('/update/:skillId', updateSkill);


module.exports = router;
