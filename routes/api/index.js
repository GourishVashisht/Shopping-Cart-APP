const express = require('express')

const route = express.Router()

route.use('/products', require('./products'))
route.use('/vendors', require('./vendors'))
route.use('/cart', require('./cart'))
route.use('/users',require('./users'))

module.exports = {
    route
}