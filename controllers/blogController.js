const Blog = require('../modules/blog')
const blogAll = (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then((result)=> {
        console.log(result)
        res.render('blogs/index',{title: 'All Blogs',blogs:result})
    })
    .catch((err)=> {console.log(err)})
}

const blogAdd = (req, res) => {
    console.log(req.body)
    const blog = new Blog(req.body)
    blog.save()
        .then((result)=> {
            console.log(result)
            res.redirect('/blog/all')
        })
        .catch((err)=> {console.log(err)})
}
const blogDelete =(req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result)=> {{
        res.json({redirect: '/blog/all'})
    }
}).catch((err)=> {console.log(err)})
}
const blogCreate = (req, res) => {
    res.render('blogs/create',{title: 'Create A Blog'});
}
const blog = (req, res) => {
    Blog.findById(req.params.id)
        .then((result)=> {
            res.render('blogs/blog',{title: 'Blog',blog:result})
        })
        .catch((err)=> {
            res.render('404',{title: 'Page Not Found'});

            console.log(err)
        })
}
module.exports = {
    blogAll,
    blogAdd,
    blogDelete,
    blogCreate,
    blog,
}