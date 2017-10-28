'use strict'

const request = require('request')

class ExploreTrendRequest {

    constructor(){
        this.filters = {
            comparisonItem:[],
            category: 0,
            property: ''
        }

        this.time = null

        this.request = {
            url: 'https://trends.google.com/trends/api/explore',
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
                hl:'en-US',
                tz:'-180',
                req: null,
                tz:'-180'
            }
        }
    }

    setEngine(engine){
        let engines = {
            web: '',
            news: 'news',
            images: 'images',
            youtube: 'youtube',
            google_shopping: 'froogle'
        }

        if (typeof engines[engine] === 'undefined'){
            throw `Invalid engine please choose one of the following ${Object.keys(engines).join(',')}`
        }

        this.filters.property = engines[engine]

        return this
    }

    setTimePeriod(start_date,end_date){
        this.time = `${start_date} ${end_date}`

        return this
    }

    pastHour(){
        this.time = 'now 1-H'

        return this
    }

    pastFourHours(){
        this.time = 'now 4-H'

        return this
    }

    pastDay(){
        this.time = 'now 1-d'
        
        return this
    }

    past7Days(){
        this.time = 'today 7-d'
        
        return this
    }

    past30Days(){
        this.time = 'today 1-m'
        
        return this
    }

    past90Days(){
        this.time = 'today 3-m'
        
        return this
    }

    past12Months(){
        this.time = 'today 12-m'
        
        return this
    }

    past5Years(){
        this.time = 'today 5-y'
        
        return this
    }

    from2004ToPresent(){
        this.time = 'all'

        return this
    }

    addKeyword(keyword,geo = ''){
        this.filters.comparisonItem.push({
            keyword,
            geo,
            time: this.time
        })

        return this
    }

    compare(keyword,geo = ''){
        return this.addKeyword(keyword,geo)
    }

    fetch(){
        this.filters.comparisonItem = this.filters.comparisonItem.map( item => {
            item.time = this.time
            return item
        })

        this.request.qs.req = JSON.stringify(this.filters)

        return new Promise( (resolve,reject) => {
            request(this.request,(error,response,body) => {
                if (error){
                    return reject(error)
                }

                try{
                    resolve(JSON.parse(body.split("\n")[1]).widgets[0])
                }catch(ex){
                    reject({
                        ex:ex,
                        body: body,
                        qs: this.request.qs
                    })
                }
            })
        })
    }

}

module.exports = ExploreTrendRequest