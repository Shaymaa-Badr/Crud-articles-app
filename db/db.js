const mysql2 = require('mysql2')

const query = mysql2.createConnection({
    host:'localhost',
    database: 'blogsdb',
    user:'root',
    password:''
})
module.exports = query