let app = new Vue({
    el: '#prod',
    data: {
        products: '',
        totalAmount: ''
    },
    created() {
        axios.get('/api/cart')
            .then((productList) => {
                this.products = productList.data
                console.log("cart has " + this.products.length + " products")
                let sum = 0;
                for (let i = 0; i < this.products.length; i++) {
                    sum += this.products[i].amount;
                }
                this.totalAmount = sum
                console.log("the total amount is : " + this.totalAmount)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    methods: {
        addToCart(event) {
            console.log('id------'+event.target.getAttribute('data-id'))
            axios.post('/api/cart', {
                productId: parseInt(event.target.getAttribute('data-id'))
            })
                .then((cart) => {
                    console.log("Incremented the product")
                    this.products = cart.data
                    let sum = 0;
                    for (let i = 0; i < this.products.length; i++) {
                        sum += this.products[i].amount;
                    }
                    this.totalAmount = sum
                }).catch((err) => {
                    console.log(err);
                })
        },
        removeFromCart() {
            console.log('id------'+event.target.getAttribute('data-id'))
            axios.put('/api/cart/dec', {
                productId: parseInt(event.target.getAttribute('data-id'))
            }).then((cart) => {
                console.log("decremented the product")
                this.products = cart.data
                let sum = 0;
                for (let i = 0; i < this.products.length; i++) {
                    sum += this.products[i].amount;
                }
                this.totalAmount = sum
            })
        }
    }
})