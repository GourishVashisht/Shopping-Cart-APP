const User = require('../../connection').User

const route = require('express').Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op

route.post('/signup', (req, res) => {
    User.create({
        userName: req.body.userName,
        password: req.body.password
    })
        .then((user) => {
            res.redirect('../../index.html')
        }).catch((err) => {
            console.log('sorry')
            res.redirect('../../index.html')
        })
})

// route.post('/signin',(req,res)=>{
//     User.findOne({
//         userName: req.body.userName,
//         password: req.body.password
//     })
//     .then((user)=>{
//         if(user){
//             res.redirect('../../dashboard.html')
//         }
//         else{
//             res.send('../../index.html')
//         }
//     })
// })

module.exports = route

