'use strict'

module.exports = {
    GoogleTrendsCSV: data => {
        return data.split("\n").filter( row => row.split(',').length > 1).map( row => row.split(','))
    }
}