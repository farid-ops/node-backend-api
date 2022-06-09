const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

module.exports.getAllUsers =((request, response)=>{
   User.find()
       .then((users)=>response.status(200).json(users))
       .catch((error)=>response.stat(400).json({error}))
});

module.exports.findOneUser=((request, response)=>{
    User.findOne({_id: request.params.id})
        .then((user)=>response.status(200).json(user))
        .catch((error)=>response.status(400).json({error}))
});

module.exports.saveUser=((request, response)=>{
    const user = new User({
      email: request.body.email,
      password: request.body.password
    })
    user.save()
        .then(()=>response.status(200).json({message: 'objet cree'}))
        .catch((error)=>response.status(400).json({error}))
})

module.exports.updateUser=((request, response)=>{
    const user = new User({
        _id: request.params.id,
        email: request.body.email,
        password: request.body.password
    })
    User.updateOne({_id: request.params.id}, {...user})
        .then(()=>response.status(200).json({update: true}))
        .catch((error)=>response.status(200).json({error}))
})

module.exports.deleteUser=((request, response)=>{
    User.deleteOne({_id: request.params.id})
        .then(()=>response.status(200).json({deleted: true}))
        .catch((error)=>response.status(400).json({error}))
})

module.exports.signin=((request, response, next)=>{
    User.findOne({email: request.body.email})
        .then(user=>{
            if (!user){
                return response.status(401).json({error: 'Utilisateur introuvable'})
            }
            bcrypt.compare(request.body.password, user.password)
                .then((valid)=>{
                    if (!valid){
                        return response.status(401).json({erreur: 'Mot de passe incorrect'})
                    }
                    response.status(200).json({
                        token: jwt.sign(
                            {userId : user._id},
                            'RANDOM_VIKING',
                            {expiresIn: '24h'}
                        )
                    })
                }).catch((error)=>response.status(500).json({error}))
        }).catch((error)=>response.status(500).json({error}))
});

module.exports.signup=((request, response, next)=>{
    bcrypt.hash(request.body.password, 10)
        .then(
            hash=>{
                const user = new User({
                    email: request.body.email,
                    password: hash
                })
                user.save()
                    .then((user)=>response.status(200).json(user))
                    .catch((error)=>response.status(400).json({message: 'erreur d\'enregistrement.'}))
            }
        ).catch((error)=>response.status(400).json({error}))

});