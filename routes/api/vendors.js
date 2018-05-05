const Vendor = require('../../connection').Vendor

const route = require('express').Router()

route.get('/', (req, res) => {
    Vendor.findAll()
        .then((vendors) => {
            res.status(200).send(vendors)
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = route

