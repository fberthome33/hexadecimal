let express = require('express')
let session = require('express-session')
var converter = require('./service/hexaDecimalConverter');
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
        let decimalNumber = decimalInput(fieldToConvert, convertResult, convertMethod)
        const storyErrorMsg = "Error retrieving story"

        try {
            storyService.getStory(decimalNumber)
            .then(function(results){
                story = results.text;
                response.render('index', {value: convertResult, story : story})
            }).catch(e => {
                response.render('index', {value: convertResult, story : storyErrorMsg})
            })
        } catch(err) {
                console.log('Error retriving story');
                response.render('index', {value: convertResult, story : storyErrorMsg})
        }
    }
    
})

function decimalInput(input, convertedInput, convertMethod) {
    let decimalNumber
    if (convertMethod === "hexaToDec") {
        decimalNumber = convertedInput
    } else if (convertMethod === "decToHexa") {
        decimalNumber = input
    }
    return decimalNumber;
}

app.listen(8080)