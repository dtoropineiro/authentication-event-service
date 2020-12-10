const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/field-validator')
const { createUser, userLogin, revalidateToken } = require('../controllers/auth')
const { validateJwt } = require('../middlewares/jwtValidator');
const router = Router();


router.post(
    '/new',
     [//midlewares
        check('name', 'Name required.').not().isEmpty(),
        check('email', 'Invalid Email.').isEmail(),
        check('password', 'Password must be longer than 6 characters.')
        .isLength({min:6}), validateFields
     ], 
     createUser);

router.post('/',
        [
        check('email', 'Invalid Email.').isEmail(),
        check('password', 'Password must be longer than 6 characters.')
        .isLength({min:6}), validateFields
        ],
        userLogin);

router.get('/renew', validateJwt, revalidateToken);

module.exports = router;
