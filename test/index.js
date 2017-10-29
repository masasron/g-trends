'use strict'

const { ExploreTrendRequest } = require('../')

const explorer = new ExploreTrendRequest()

explorer.addKeyword('Dream about snakes')
        .compare('Dream about falling')
        .download().then( csv => {
            console.log('[✔] Done, take a look at your beautiful CSV formatted data!')
            console.log(csv)
        }).catch( error => {
            console.log('[!] Failed fetching csv data due to an error',error)
        })
