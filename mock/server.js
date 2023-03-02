// server.js
const jsonServer = require('json-server')
//现在我要读取文件了
const fs = require('fs')
const server = jsonServer.create()
const router = jsonServer.router('./mock/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

//登录校验接口
server.post('/login', (req, res, next) => {
    fs.readFile('./mock/db.json', (err, data) => {
        const db = JSON.parse(data);
        const users = db.users;
        let isLogin = false;
        let email;
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === req.body.email && users[i].password === req.body.password) {
                isLogin = true;
                email = users[i].email;
            }
        }
        if (isLogin) {
            res.send({ code: 0, email })
        } else {
            res.send({ code: -1 })
        }
    });
})

//注册校验接口
// server.post('/register', (req, res, next) => {
//     fs.readFile('./mock/db.json', (err, data) => {
//         const db = JSON.parse(data);
//         let users = db.users;
//         //console.log(users);
//         let isLogin = true;
//         for (let i = 0; i < users.length; i++) {
//             if (users[i].email === req.body.email && users[i].password === req.body.password) {
//                 isLogin = false;
//             }
//         }
//         if (isLogin === false) {
//             res.send({ code: -1 })
//         } else {
//             res.send({ code: 0 })
//             const Email = req.body.email;
//             const passWord = req.body.password;
//             users.push({
//                 "email": Email,
//                 "password": passWord
//             })

//         }
//     });

// })

server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})