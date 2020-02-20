let express = require('express')
let session = require('express-session')
var converter = require('./service/converter');
var storyService = require('./service/storyService');

let app = express()
app.set('views', './views');
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use('/assets', express.static('public'))
app.use(session({ secret: 'hexadecimal', resave: false, saveUninitialized: true, cookie: { secure: false }}))
app.use(require('./middlewares/flash'))





app.get('/' , (request, response) => {
    response.render('index', {value: "", story : ''})
})




app.post('/convert' , (request, response) => {
    let fieldToConvert = request.body.fieldToConvert;
    if(fieldToConvert === undefined || fieldToConvert === "") {
        request.flash('error', "Vous n'avez pas entrée de chaine à convertir")
        response.redirect('/')
    }
    else {

        let convertMethod = request.body.convertMethod;
        let convertResult = converter.convert(fieldToConvert, convertMethod)
        const storyErrorMsg = "Eror retrieving story"
        try {
            storyService.getStory(fieldToConvert, convertResult, convertMethod)
            .then(function(results){
                story = results.text;
                response.render('index', {value: convertResult, story : story})
            }).catch(e => {
                console.log(e)
                response.render('index', {value: convertResult, story : storyErrorMsg})
            })
        } catch(err) {
                console.log('Error retriving story');
                response.render('index', {value: convertResult, story : storyErrorMsg})
        }
    }
    
})



app.listen(8080)