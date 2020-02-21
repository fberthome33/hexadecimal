const http = require('http');
const URL = 'http://numbersapi.com/NUMBER_PARAM?json'
class StoryService {

    static getStory(decimalNumber) {     
        console.log("decimalNumber" + decimalNumber)
        let url = URL.replace('NUMBER_PARAM', decimalNumber);
        console.log(url)
        return new Promise((resolve, reject) => {
            var req = http.get(url, function (res) {
                res.on('data', function (d) {
                    try {
                        console.log(JSON.parse(d))
                        return resolve(JSON.parse(d));
                    } catch (e) {
                        return reject('Error during json parsing');
                    }
                });
            });

            req.on('error', function (e) {
                 return reject('Error during call');
            });
            req.setTimeout(5000, function() {
                console.log('Timeout')
                 return reject('Request Timeout calling');
              });
            })
    }
    
}
module.exports = StoryService