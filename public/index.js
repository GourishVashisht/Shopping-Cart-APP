let app = new Vue({
    el: '#prod',
    data: {
        products: '',
        vendors: '',
        selectedVendorId: '',
        selecteProductId: '',
        checkedNames:[]
    },
    methods: {
        addToCart(event) {
            axios.post('/api/cart', {
                productId: event.target.id,
            }).then(() => {
                alert("Product added to cart successfully")
            })
        },
        filterRecords(){
            if(this.checkedNames.length == 0){
                console.log('now length is 0')
                axios.get('/api/products')
                .then((productList)=>{
                   this.products = productList.data 
                })
            }
            else{
            axios.get('/api/products/filter/'+this.checkedNames)
            .then((productList)=>{
                this.products = productList.data
            })
        }
        }
    },
    created() {
        axios.get('/api/products')
            .then((productList) => {
                this.products = productList.data
                console.log('no of products : ' + this.products.length)
                axios.get('/api/vendors')
                    .then((vendorList) => {
                        console.log('hello')
                        this.vendors = vendorList.data
                        console.log('no of vendors : ' + this.vendors.length)
                    })
            })

    }
}
)