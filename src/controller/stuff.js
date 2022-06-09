const Product=require('../model/product')

exports.getAll = ((request, response)=>{
    Product.find()
        .then((products)=>response.status(200).json(products))
        .catch((error)=>response.status(400).json({error}))
})

exports.createProduct = ((request, response)=>{
    const product = new Product({
        title: request.body.title,
        description: request.body.description,
        imageUrl: request.body.imageUrl,
        price: request.body.price,
        userId: request.body.user
    })
    product.save()
        .then(()=>response.status(201).json({message: 'object create'}))
        .catch((error)=>response.status(400).json({error}))
})

exports.getProductById = ((request, response)=>{
    Product.findById({_id: request.params.id})
        .then((product)=>response.status(200).json(product))
        .catch((error)=>response.status(400).json({error}))
})

exports.updateProduct = ((request, response)=>{
    const product = new Product({
        _id: request.params.id,
        title: request.body.title,
        description: request.body.description,
        imageUrl: request.body.imageUrl,
        price: request.body.price,
        userId: request.body.userId
    })
    Product.updateOne({_id: request.params.id}, product)
        .then(()=>response.status(200).json({message: "is ok"}))
        .catch((error)=>response.status(400).json({error}))
})

exports.delete = ((request, response)=>{
    Product.findOne({_id: request.params.id})
        .then((isValid)=>{
            if (!isValid){
                response.status(400).json({message: 'No suche product'})
            }
            if (request.params.id !== request.auth.id){
                response.status(400).json({message: 'Unauthorized'})
            }
            Product.deleteOne(request.params.id)
                .then(()=>response.status(302).json({message: 'Deleted'}))
                .catch((error)=>response.status(400).json({error}))
        })
        .catch((error)=>response.status(400).json({error}))
})