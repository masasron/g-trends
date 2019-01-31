'use strict';

const fetch = require('node-fetch');
const querystring = require('querystring');

class DownloadTrendRequest {

    constructor(widget) {
        this.request = {
            url: 'https://trends.google.com/trends/api/widgetdata/multiline/csv',
            method: 'GET',
            headers: {
                'accept': 'application/json, text/plain, */*',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.8,he;q=0.6,ru;q=0.4,es;q=0.2,de;q=0.2,la;q=0.2',
                'cache-control': 'no-cache',
                'cookie': '',
                'pragma': 'no-cache',
                'referer': 'https://trends.google.com/trends/explore',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
            },
            qs: {
                hl: 'en-US',
                tz: '-180',
                req: JSON.stringify(widget.request),
                token: widget.token,
                tz: '-180'
            }
        }
    }

    fetch() {
        return new Promise((resolve, reject) => {
            fetch(`${this.request.url}?${querystring.stringify(this.request.qs)}`, {
                compress: true,
                method: this.request.method,
                headers: this.request.headers
            }).then(async response => {
                if (response.headers.get('content-type') !== 'text/csv; charset=utf-8') {
                    return reject(`Expected response content type to be "text/csv; charset=utf-8" got "${response.headers.get('content-type')}"`);
                }
                try {
                    const text = await response.text();
                    resolve(text);
                } catch (error) {
                    reject(error);
                }
            }).catch(reject);
        });
    }

}

module.exports = DownloadTrendRequest