const http = require('http');
const URL = 'http://numbersapi.com/NUMBER_PARAM?json';
const REQUEST_TIMEOUT = 5000;

class StoryService {

    static getStory(decimalNumber) {     
        let url = URL.replace('NUMBER_PARAM', decimalNumber);
        return new Promise((resolve, reject) => {
            var req = http.get(url, function (res) {
                res.on('data', function (d) {
                    try {
                        return resolve(JSON.parse(d));
                    } catch (e) {
                        return reject('Error during json parsing');
                    }
                });
            });

            req.on('error', function (e) {
                 return reject('Error during call');
            });
            req.setTimeout(REQUEST_TIMEOUT, function() {
                return reject('Request call story timeout');
              });
            })
    }
    
}
module.exports = StoryService;