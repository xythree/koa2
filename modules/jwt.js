
let jwt = require("jsonwebtoken")
let config = require("../config")
let secretOrPrivateKey = config.jwt.secretOrPrivateKey  //加密的key（密钥）

exports.getToken = (data, expiresIn) => {
    
    return jwt.sign(data, secretOrPrivateKey, {
        expiresIn: expiresIn || 60 * 60 * 24 //过期时间  1天
    })
}

exports.verifyToken = token => { //校验token
    let data = {
        code: -1,
        msg: "无效或者伪造的token"
    }
    
    jwt.verify(token, secretOrPrivateKey, (err, decode) => {
        let _data = {}
        
        if (err) {
            if (err.message == "jwt expired") {
                _data.code = -1
                _data.msg = "token过期"
            } else if (err.message == "invalid token") {
                //_data.code = -1
                //_data.msg = "无效或者伪造的token"
            }
        } else {
            _data.code = 1
            _data.data = decode
            _data.msg = ""
            /*
            decode = {
                    "username": "username",//jwt.sign传入的data
                    "iat": 1505378121,
                    "exp": 1505464521
                }
            */
        }

        data = _data
    })
    
    return data
}
























