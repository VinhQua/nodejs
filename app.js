const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./modules/blog');
//connect to mongoDB
const DBURI = "mongodb+srv://vinhqua:Quang123@cluster0.uvd1bzz.mongodb.net/test"
mongoose.connect(DBURI,{useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=> {
    console.log('connect to mongoDB')
    app.listen(3000,()=> console.log('server is running on port 3000'))    
})
.catch((err)=> console.log(err))

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
//mongoose and mongo sandbox routes 
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: ' New Blog 2',
        snippet: "About my blog 2",
        body: "more about my blog 2"
    })
    blog.save()
        .then((result)=> {
            res.send(result)
        }).catch((err)=> {
            console.log(err)
        })
})
app.get('/all-blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((result)=> {
            console.log(result)
            res.render('index',{title: 'All Blogs',blogs:result})
        })
        .catch((err)=> {console.log(err)})
})
app.post('/add-blog', (req, res) => {
    console.log(req.body)
    const blog = new Blog(req.body)
    blog.save()
        .then((result)=> {
            console.log(result)
            res.redirect('/all-blogs')
        })
        .catch((err)=> {console.log(err)})
})
app.delete('/delete-blog/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result)=> {{
        res.json({redirect: '/all-blogs'})
    }
}).catch((err)=> {console.log(err)})
})
app.get('/blog/create', (req, res) => {
    res.render('create',{title: 'Create A Blog'});
})
app.get('/blog/:id', (req, res) => {
    Blog.findById(req.params.id)
        .then((result)=> {
            res.render('blog',{title: 'Blog',blog:result})
        })
        .catch((err)=> {console.log(err)})
})

app.get('/', (req, res) => {
    res.redirect('/all-blogs')
})
app.get('/about', (req, res) => {
    res.render('about',{title: 'About'});
})
app.get('/about-me', (req, res) => {
    res.redirect('/about')
})

app.use((req,res)=>{
    res.render('404',{title: 'Page Not Found'});
})