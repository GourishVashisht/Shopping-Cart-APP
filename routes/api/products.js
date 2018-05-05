const Product = require('../../connection').Product
const route = require('express').Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

route.get('/', (req, res) => {
    Product.findAll()
        .then((products) => {
            res.status(200).send(products)
        })
        .catch((err) => {
            console.log(err)
        })
})

route.get('/filter/:names', (req, res) => {
    let arr = req.params.names.split(",")
    Product.findAll({
        where: {
            vendorId: {
                [Op.in]: arr
            }
        }
    }).then((products) => {
        res.status(200).send(products)
    })
        .catch((err) => {
            console.log(err)
        })
})

route.get('/:id', (req, res) => {
    Product.findAll({
        where: {
            vendorId: req.params.id
        }
    })
        .then((products) => {
            res.status(200).send(products)
        })
        .catch((err) => {
            console.log(err)
        })
})
route.post('/', (req, res) => {
    console.log("going to add new product")
    if (isNaN(req.body.price)) {
        return res.status(403).send({
            error: 'price is not a number'
        })
    }
    Product.create({
        name: req.body.name,
        vendor: req.body.vendor,
        price: parseFloat(req.body.price),
        vendorId: req.body.vendorId
    })
        .then((product) => {
            res.status(201).send(product)
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = route