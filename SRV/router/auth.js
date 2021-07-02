const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некорректные данные').isEmail(),
        check('password', 'Некорректные данные').isLength({ min: 6 })
    ],
    async (req,res) => {
        try {
            const errors = validationResult(JSON.parse(req.headers.body))

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Неверный логин или пароль'
                })
            }
            const {email, password} = JSON.parse(req.headers.body)
            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: 'Такой пользователь уже есть' })
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashedPassword, admin: 0 })

            await user.save()

            res.status(201).json({ message: 'пользователь создан' })

        } catch (e) {
            res.status(500).json({ message: 'Неверный логин или пароль' })
        }
    })

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Некорректные данные').normalizeEmail().isEmail(),
        check('password', 'Некорректные данные').exists()
    ],
    async (req,res) => {
        try {
            const errors = validationResult(JSON.parse(req.headers.body))

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Неверный логин или пароль'
                })
            }

            const {email, password} = JSON.parse(req.headers.body)
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'Неверный логин или пароль' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный логин или пароль' })
            }

            const token = jwt.sign(
                { userId: user._id },
                'Messenger',
                { expiresIn: '2h' }
            )

            res.json({ token, userId: user._id, admin: user.admin})

        } catch (e) {
            res.status(500).json({ message: 'Неверный логин или пароль' })
        }
    })


module.exports = router
