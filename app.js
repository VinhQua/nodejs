const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blogRoutes');
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

//Blog Routes
app.use('/blog', blogRouter);

app.get('/', (req, res) => {
    res.redirect('/blog/all')
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