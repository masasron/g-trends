'use strict'

const { ExploreTrendRequest,SearchProviders,Normalize } = require('../')

const explore_request = new ExploreTrendRequest()

explore_request.searchProvider(SearchProviders.Web)
               .past30Days()
               .addKeyword('Dream about snakes').compare('Dream about falling')
               .normalize(Normalize.GoogleTrendsCSV)
               .download().then( csv => {
                    console.log('[✔] Done, take a look at your beautiful CSV formatted data!')
                    console.log(csv)
                }).catch( error => {
                    console.log('[!] Failed fetching csv data due to an error',error)
                })