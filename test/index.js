'use strict'

const { ExploreTrendRequest,DownloadTrendRequest } = require('../')

const explore_request = new ExploreTrendRequest()

explore_request.setEngine('web')
               .past30Days()
               .addKeyword('Dream about snakes')
               .compare('Dream about falling')
               .fetch().then( download_request_details => {
        
     const download_request = new DownloadTrendRequest(download_request_details)
     
     download_request.fetch().then( csv_data => {
        console.log('[✔] Done, take a look at your beautiful CSV formatted data!')
        console.log(csv_data)
     }).catch( error => {
         console.log('[!] Failed fetching csv data due to an error',error)
     })

}).catch( error => {
    console.log('[!] Failed fetching widget request data due to an unexpected server response',error)
})