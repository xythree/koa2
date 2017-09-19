
let minify = require("html-minifier").minify

let {getToken, verifyToken} = require("../modules/jwt")

module.exports = (router, render) => {
    
    router.get("/login", async ctx => { 
        let params = ctx.request.query
        let result = {
                code: 0,
                msg: "用户名或者密码错误"
            }
        
        if (params.username && params.password) {
            
            //查询数据库，例子简化写死
            let data = [{username: "username"}]//mon.users.find({username: params.username,password: params.password})
            
            if (data.length) {
                result.code = 1
                //生成token
                result.data = getToken({username: params.username})
                result.msg = ""
            }
        }

        ctx.body = result
    })
    
    router.get("/check_token", async ctx => {
        let params = ctx.request.query

        ctx.body = verifyToken(params.token)
    })
    
    
    router.get("/", async ctx => {
        let html = await render("index/index")
        
        ctx.body = minify(html, {
            removeComments: true, //去除注释
            minifyJS: true,
            minifyCSS: true,
            collapseWhitespace: true
        })
    })
    
}























