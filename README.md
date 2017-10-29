# G Trends
A simple API client for Google Trends.

## Quick Start
```sh
npm install g-trends
```

## Super simple to use
G Trends client is designed to be the simplest way for developers to access Google Trends data.

```js
const { ExploreTrendRequest } = require('g-trends')

const explorer = new ExploreTrendRequest()

explorer.addKeyword('Dream about snakes')
        .compare('Dream about falling')
        .download().then( csv => {
            console.log('[✔] Done, take a look at your beautiful CSV formatted data!')
            console.log(csv)
        }).catch( error => {
            console.log('[!] Failed fetching csv data due to an error',error)
        })
```

```sh
[✔] Done, take a look at your beautiful CSV formatted data!
[ [ 'Day',
    'Dream about snakes: (Worldwide)',
    'Dream about falling: (Worldwide)' ],
  [ '2017-09-29', '26', '58' ],
  [ '2017-09-30', '68', '88' ],
  [ '2017-10-01', '57', '100' ],
  [ '2017-10-02', '72', '60' ],
  [ '2017-10-03', '65', '70' ],
  [ '2017-10-04', '35', '55' ],
  [ '2017-10-05', '55', '58' ],
  [ '2017-10-06', '34', '80' ],
  [ '2017-10-07', '66', '69' ],
  ...
```

## ExploreTrendRequest

### Method Listing

`normalize()`

the `normalize` method give you a quick way to overwrite the default normalization function and process the raw Google Trends data before it resolved.

```js
const explorer = new ExploreTrendRequest()
explorer.normalize( raw => raw.split("\n") ).addKeyword('dogs').
```

`searchProvider()`

The `searchProvider` method allow you to choose the search provider you wise to extract data from.

```js

const { ExploreTrendRequest,SearchProviders } = require('g-trends')

const explorer = new ExploreTrendRequest()

// SearchProviders.News, SearchProviders.Web, SearchProviders.YouTube
// SearchProviders.GoogleImages, SearchProviders.GoogleShopping

explorer.searchProvider(SearchProviders.News)
        .addKeyword('Bitcoin')
        .download().then( csv => {
            console.log('[✔] Done, take a look at your beautiful CSV formatted data!')
            console.log(csv)
        }).catch( error => {
            console.log('[!] Failed fetching csv data due to an error',error)
        })
```

`addKeyword()`

The `addKeyword` method appends a given keywords to the trend exploration request.

```js
const explorer = new ExploreTrendRequest()

explorer.searchProvider(SearchProviders.News)
        .addKeyword('Bitcoin')
        .addKeyword('Cats')
        .addKeyword('Dogs')
        .download().then( csv => {
            console.log(csv)
        })
```

`between()`

The `between` method allows you to extract trend data for a given time period.

```js
const explorer = new ExploreTrendRequest()

explorer.searchProvider(SearchProviders.News)
        .addKeyword('Bitcoin')
        .addKeyword('Cats')
        .addKeyword('Dogs')
        .between('2017-01-01','2017-01-10')
        .download().then( csv => {
            console.log(csv)
        })
```

`pastHour()`

The `pastHour` method allows you to extract trend data for a the past hour.

```js
explorer.pastHour()
        .addKeyword('Cats')
        .addKeyword('Dogs')
        .download().then( csv => {
            console.log(csv)
        })
```

`pastFourHours()`

The `pastFourHours` method allows you to extract trend data for a the past 4 hours.

```js
explorer.pastFourHours()
        .addKeyword('Cats')
        .addKeyword('Dogs')
        .download().then( csv => {
            console.log(csv)
        })
```


`pastDay()`

The `pastDay` method allows you to extract trend data for a the past day.

```js
explorer.pastDay()
        .addKeyword('Cats')
        .addKeyword('Dogs')
        .download().then( csv => {
            console.log(csv)
        })
```

`past7Days()`

The `past7Days` method allows you to extract trend data for a the past 7 days.

```js
explorer.past7Days()
        .addKeyword('Cats')
        .addKeyword('Dogs')
        .download().then( csv => {
            console.log(csv)
        })
```

`past30Days()`

The `past30Days` method allows you to extract trend data for a the past 30 days.

```js
explorer.past30Days()
        .addKeyword('Cats')
        .addKeyword('Dogs')
        .download().then( csv => {
            console.log(csv)
        })
```

`past90Days()`

The `past90Days` method allows you to extract trend data for a the past 90 days.

```js
explorer.past90Days()
        .addKeyword('Cats')
        .addKeyword('Dogs')
        .download().then( csv => {
            console.log(csv)
        })
```

`past12Months()`

The `past12Months` method allows you to extract trend data for a the past 12 months.

```js
explorer.past12Months()
        .addKeyword('Cats')
        .addKeyword('Dogs')
        .download().then( csv => {
            console.log(csv)
        })
```

`past5Years()`

The `past5Years` method allows you to extract trend data for a the past 5 years.

```js
explorer.past5Years()
        .addKeyword('Cats')
        .addKeyword('Dogs')
        .download().then( csv => {
            console.log(csv)
        })
```

`from2004ToPresent()`

The `from2004ToPresent` method allows you to extract trend data from 2004 to the present.

```js
explorer.from2004ToPresent()
        .addKeyword('Cats')
        .addKeyword('Dogs')
        .download().then( csv => {
            console.log(csv)
        })
```
