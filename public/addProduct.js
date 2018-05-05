let app = new Vue({
    el: '#prod',
    data: {
        productName: '',
        productVendor: '',
        productPrice: '',
        selectedVendorId: '',
        vendors: ''
    },
    methods: {
        addProduct() {
            axios.post('/api/products', {
                name: this.productName,
                vendor: this.productVendor,
                price: this.productPrice,
                vendorId: this.selectedVendorId
            })
                .then((product) => {
                    window.alert("Product added to the list successfully.")
                }).catch((err)=>{
                    window.alert('Error in adding Product : '+product.name+" to the list.")
                })
        }
    },
    created() {
        axios.get('/api/vendors')
            .then((vendorList) => {
                console.log('hello')
                this.vendors = vendorList.data
                console.log(vendorList.length)
            })
    }
}
)