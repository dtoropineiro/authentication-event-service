'use strict'

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/field-validator')
const { validateJwt } = require('../middlewares/jwtValidator');
const { isDate } = require('../middlewares/date-validator');
const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/events')
const router = Router();

router.use(validateJwt);

router.post('/',
    [
        check('title', 'title required.').not().isEmpty(),
        check('start', 'Invalid date.').custom(isDate),
        check('end', 'Invalid date.').custom(isDate),
        validateFields
    ],
    createEvent);
router.get('/', getEvents);
router.put('/:id',    [
    check('title', 'title required.').not().isEmpty(),
    check('start', 'Invalid date.').custom(isDate),
    check('end', 'Invalid date.').custom(isDate),
    validateFields
    ],
    updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
