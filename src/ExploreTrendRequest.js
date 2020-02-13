'use strict'

const fetch = require('node-fetch');
const Normalize = require('./Normalize');
const querystring = require('querystring');
const DownloadTrendRequest = require('./DownloadTrendRequest');

class ExploreTrendRequest {

    constructor() {
        this.filters = {
            comparisonItem: [],
            category: 0,
            property: ''
        }

        this.past90Days()
        this.normalization_function = Normalize.GoogleTrendsCSV

        this.request = {
            url: 'https://trends.google.com/trends/api/explore',
            method: 'GET',
            gzip: true,
            headers: {
                'accept': 'application/json, text/plain, */*',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.8,he;q=0.6,ru;q=0.4,es;q=0.2,de;q=0.2,la;q=0.2',
                'cache-control': 'no-cache',
                'cookie': '',
                'pragma': 'no-cache',
                'referer': 'https://trends.google.com/trends/explore',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36'
            },
            qs: {
                hl: 'en-US',
                tz: '-180',
                req: null,
                tz: '-180'
            }
        }
    }

    normalize(fn) {
        this.normalization_function = fn

        return this
    }

    /**
     * Choose a search provider.
     * 
     * @param {string} engine
     *
     * @return {ExploreTrendRequest}
     */
    searchProvider(engine) {
        let engines = {
            web: '',
            news: 'news',
            images: 'images',
            youtube: 'youtube',
            google_shopping: 'froogle'
        }

        if (typeof engines[engine] === 'undefined') {
            throw `Invalid engine please choose one of the following ${Object.keys(engines).join(',')}`
        }

        this.filters.property = engines[engine]

        return this
    }

    /* * * * * * * * *
    *  Time Filters  *
    * * * * * * * * */

    between(start_date, end_date) {
        this.time = `${start_date} ${end_date}`

        return this
    }

    pastHour() {
        this.time = 'now 1-H'

        return this
    }

    pastFourHours() {
        this.time = 'now 4-H'

        return this
    }

    pastDay() {
        this.time = 'now 1-d'

        return this
    }

    past7Days() {
        this.time = 'now 7-d'

        return this
    }

    past30Days() {
        this.time = 'today 1-m'

        return this
    }

    past90Days() {
        this.time = 'today 3-m'

        return this
    }

    past12Months() {
        this.time = 'today 12-m'

        return this
    }

    past5Years() {
        this.time = 'today 5-y'

        return this
    }

    from2004ToPresent() {
        this.time = 'all'

        return this
    }

    /**
     * Add a new keyword for comparison.
     *
     * @param {string} keyword
     * @param {string} geo
     *
     * @return {ExploreTrendRequest}
     */
    addKeyword(keyword, geo = '') {
        this.filters.comparisonItem.push({
            keyword,
            geo,
            time: this.time
        })

        return this
    }

    /**
     * An alias method for the `addKeyword`
     * 
     * @param {string} keyword
     * @param {string} geo
     *
     * @return {ExploreTrendRequest}
     */
    compare(keyword, geo = '') {
        return this.addKeyword(keyword, geo)
    }

    /**
     * Download the CSV output for the current trend query.
     * 
     * @return {Promise}
     */
    download() {
        return new Promise((resolve, reject) => {
            this.resolveDownloadRequestDetails().then(details => {
                let download_request = new DownloadTrendRequest(details)
                download_request.fetch().then(result => {
                    resolve(this.normalization_function(result))
                }).catch(reject)
            }).catch(reject)
        })
    }

    /**
     * A valid explore request need to have the same time property on each comparison keyword.
     * 
     * @return {ExploreTrendRequest}
     */
    normalizeRequestTimeFormat() {
        this.filters.comparisonItem = this.filters.comparisonItem.map(item => {
            item.time = this.time
            return item
        })

        return this
    }

    /**
     * Google blocks requests with invalid cookies
     * This method makes a request in order to get a valid cookie.
     * 
     * @returns {Promise}
     */
    resolveGoogleGuestCookie() {
        return new Promise((resolve, reject) => {
            if (this.guest_cookie) {
                return resolve(this.guest_cookie);
            }
            fetch('https://trends.google.com/trends/explore').then(response => {
                this.guest_cookie = response.headers.get('set-cookie');
                resolve(this.guest_cookie);
            }).catch(reject);
        });
    }

    /**
     * Resolve the download request details in a JSON form.
     * 
     * @return {Promise}
     */
    resolveDownloadRequestDetails() {

        this.normalizeRequestTimeFormat()

        this.request.qs.req = JSON.stringify(this.filters)

        return new Promise((resolve, reject) => {
            this.resolveGoogleGuestCookie().then(cookie => {
                this.request.headers.cookie = cookie;
                fetch(`${this.request.url}?${querystring.stringify(this.request.qs)}`, {
                    compress: true,
                    method: this.request.method,
                    headers: this.request.headers
                }).then(async response => {
                    try {
                        let text = await response.text();
                        resolve(JSON.parse(text.split("\n")[1]).widgets[0]);
                    } catch (error) {
                        reject(error);
                    }
                }).catch(reject);
            }).catch(reject)
        })
    }

}

module.exports = ExploreTrendRequest
