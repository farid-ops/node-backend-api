const jwt = require('jsonwebtoken')

module.exports=((request, response, next)=>{
    try {
        const token = request.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, 'RANDOM_VIKING');
        const userId = decodeToken.userId;
        request.auth = {userId}
        if (request.body.userId && request.body.userId !== userId){
            throw 'User id not available'
        }else{
            next()
        }
    }catch (error){
        response.status(500).json({error: error | 'Server error'})
    }

})