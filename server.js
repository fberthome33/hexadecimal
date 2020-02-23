let express = require('express');
let session = require('express-session');
var converter = require('./utils/hexaDecimalConverter');
var formUtils = require('./utils/formUtils');
var storyService = require('./service/storyService');

let app = express();;
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static('public'));
app.use(session({ secret: 'hexadecimal', resave: false, saveUninitialized: true, cookie: { secure: false }}));
app.use(require('./middlewares/flash'));





app.get('/' , (request, response) => {
    response.render('index', {value: "", story : ''});
})

app.post('/convert' , (request, response) => {
    let fieldToConvert = request.body.fieldToConvert;
    if(fieldToConvert === undefined || fieldToConvert === "") {
        request.flash('error', "Vous n'avez pas entrée de chaine à convertir")
        response.redirect('/')
    }
    else {
        let convertMethod = request.body.convertMethod;
        let convertResult = converter.convert(fieldToConvert, convertMethod);
        let decimalNumber = formUtils.decimalInput(fieldToConvert, convertResult, convertMethod);

        try {
            storyService.getStory(decimalNumber)
            .then(function(results){
                story = results.text;
                response.render('index', {value: convertResult, story : story});
            }).catch(err => {
                response.render('index', {value: convertResult, story : err});
            })
        } catch(err) {
                response.render('index', {value: convertResult, story : err});
        }
    }
    
})

app.listen(8080)