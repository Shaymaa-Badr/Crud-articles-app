const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const query = require('./db/db')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    query.execute(`select * from blogs`, (err, data) => {
       
        //res.json(data)
        res.render("index.ejs", { data })
    })
});
app.post('/admin', (req, res) => {
    const { title, blog } = req.body
 
    query.execute(`insert into blogs (title,blog) values ('${title}','${blog}')`)
    res.redirect('/')
});

app.get('/admin', (req, res) => {
    query.execute(`select * from blogs`, (err, data) => {
 
        res.render('admin.ejs', { data })
    })

});

app.get('/readmore/:id', (req, res) => {
    query.execute(`select * from blogs where id=${req.params.id}`, (err, [data]) => {
        //res.json(data)
        res.render("readmore.ejs", { data })
    })
});

app.get('/delete/:id', (req, res) => {
    query.execute(`delete from blogs where id=${req.params.id}`)
    res.redirect('/')

});

app.get('/update/:id', (req, res) => {  
    query.execute(`select * from blogs where id=${req.params.id}`, (err, [data]) => {
        res.render('update.ejs', { data })
    })
});

app.post('/updateblog/:id', (req, res) => {
    const { title, blog } = req.body
    query.execute(`update blogs set title='${title}', blog='${blog}' where id =${req.params.id}`)
    res.redirect('/')

});

app.post('/search',async (req, res) => {
    const {term} = req.body
   
    await query.execute(`select * from blogs where title like "%${term}%" `, (err, [data]) => {
        res.render('search.ejs', { data })
    })
   
});

// app.get('/search', (req, res) => {
//     const {term} = req.query
//     console.log(term)
//     query.execute(`select * from blogs where title like %${term}% `, (err, [data]) => {
//         res.render('search.ejs', { data })
//     })
   
// });


app.listen(3000, () => {
    console.log('App listening on port 3000!');
});