const Cart = require('../../connection').Cart
const Product = require('../../connection').Product
const route = require('express').Router()
const Op = require('sequelize').Op

route.get('/', (req, res) => {
    Cart.findAll({
        include: [{
            model: Product
        }],
        where:{
            userId: req.user.id
        }
    })
        .then((productList) => {
            res.status(200).send(productList)
        })
        .catch((err) => {
            res.send(501).send(err)
        })
})

route.post('/', (req, res) => {
    let prodId = req.body.productId
    Cart.find({
        include: [{
            model: Product
        }],
        where: {
            productId: prodId,
            [Op.and]:{userId: req.user.id}
        }
    })
        .then((item) => {
            if (item != null) {
                item.quantity++
                item.amount = item.amount + item.product.price
                item.save()
                    .then(() => {
                        Cart.findAll({
                            include: [{
                                model: Product
                            }],
                            where:{
                                userId: req.user.id
                            }
                        })
                            .then((items) => {
                                res.send(items)
                            })
                    })
            }
            else {
                Product.findOne({
                    where: {
                        id: prodId
                    }
                })
                    .then((product) => {
                        Cart.create({
                            quantity: 1,
                            amount: product.price,
                            productId: req.body.productId,
                            userId: req.user.id
                        })
                            .then(() => {
                                res.send('Product added to Your Cart')
                            })
                            .catch(() => {
                                res.send('ERROR : Adding in product to cart')
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        })
})

route.put('/dec', (req, res) => {
    let prodId = req.body.productId
    Cart.findOne({
        where: {
            productId: prodId,
            [Op.and]:{userId: req.user.id}
        }
    }).then((item) => {
        if (item.quantity == 1) {
            item.destroy()
                .then(() => {
                    Cart.findAll({
                        include: [{
                            model: Product
                        }],
                        where:{
                            userId: req.user.id
                        }
                    })
                        .then((cart) => {
                            res.status(200).send(cart)
                        })
                })
        } else {
            Product.findOne({
                where: {
                    id: prodId
                }
            }).then((product) => {
                item.quantity--;
                item.amount -= product.price;
                item.save()
                    .then(() => {
                        Cart.findAll({
                            include: [{
                                model: Product
                            }],
                            where:{
                                userId: req.user.id
                            }
                        })
                            .then((items) => {
                                res.send(items)
                            })
                    })
            })
        }
    })
})

module.exports = route