const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.port || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// app.use((req, res, next) => {
//     res.render('mantinance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}: ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.js');
        }
    });
    
    next();
});
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.get('/',(req, res) => {
   res.render('home.hbs',{
       pageTitle: 'Home Page',
       welcomeMessage: 'Welcome to www.mirzafurqan.com I ' +
       'hope you enjoy learning here!'
   });
});
app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',
    });
});
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to Handle Request'
    });
});
app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});