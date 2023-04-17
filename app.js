const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');

//connect to mongoDB
const DBURI = "mongodb+srv://<vinqua>:<Quang123>@cluster0.uvd1bzz.mongodb.net/test"


app.set('view engine', 'ejs');
app.set('views', './views');
app.listen(3000, () => {

    console.log('Server is running on port 3000');
})
app.use(express.static('public'));
app.use(morgan('dev'));
app.get('/', (req, res) => {
    const blogs =[
        {title: 'Blog 1',snipet:'snipet1'},
        {title: 'Blog 2',snipet:'snipet2'},
        {title: 'Blog 3',snipet:'snipet3'},
    ]
    res.render('index',{title: 'Home',blogs});
})
app.get('/about', (req, res) => {
    res.render('about',{title: 'About'});
})
app.get('/about-me', (req, res) => {
    res.redirect('/about')
})
app.get('/blog/create', (req, res) => {
    res.render('create',{title: 'Create A Blog'});
    console.log('new blog')
})
app.use((req,res)=>{
    res.render('404',{title: 'Page Not Found'});
})