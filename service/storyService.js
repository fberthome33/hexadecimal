const request = require('request');
const rp = require('request-promise')
const http = require('http');
const URL = 'http://numbersapi.com/NUMBER_PARAM?json'
class StoryService {

    static getStory(input, convertedInput, convertMethod) {
        let decimalNumber
        if (convertMethod === "hexaToDec") {
            decimalNumber = convertedInput
        } else if (convertMethod === "decToHexa") {
            decimalNumber = input
        }

        
        let url = URL.replace('NUMBER_PARAM', decimalNumber);
        console.log(url)
        return new Promise((resolve, reject) => {
            var req = http.get(url, function (res) {
                res.on('data', function (d) {
                    try {
                        return resolve(JSON.parse(d));
                    } catch (e) {
                        return reject('Error durind json parsing');
                    }
                });
            });

            req.on('error', function (e) {
                 return reject('Error durind call');
            });
            /*req.setTimeout(function() {
                 reject('Request Timeout calling');
              }, 5000);*/
            })
    }
    
}
module.exports = StoryService