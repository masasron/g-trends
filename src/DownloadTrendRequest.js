'use strict'

const request = require('request')

class DownloadTrendRequest{

    constructor(widget){
        this.request = {
            url: 'https://trends.google.com/trends/api/widgetdata/multiline/csv',
            method: 'GET',
            gzip: true,
            headers: {
                'accept':'application/json, text/plain, */*',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.8,he;q=0.6,ru;q=0.4,es;q=0.2,de;q=0.2,la;q=0.2',
                'cache-control':'no-cache',
                'cookie':'',
                'pragma':'no-cache',
                'referer':'https://trends.google.com/trends/explore',
                'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
            },
            qs: {
                hl: 'en-US',
                tz:'-180',
                req: JSON.stringify(widget.request),
                token: widget.token,
                tz:'-180'
            }
        }
    }

    fetch(){
        return new Promise( (resolve,reject) => {
            request(this.request,(error,response,body) => {
                
                if (error){
                    return reject(error)
                }
                
                if (response.headers['content-type'] !== 'text/csv; charset=utf-8'){
                    return reject(`Invalid content type response: ${JSON.stringify(response.headers)}`)
                }

                resolve(body)
            })
        })
    }

}

module.exports = DownloadTrendRequest