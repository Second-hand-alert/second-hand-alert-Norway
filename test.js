fetch('https://gdfypn0d7k.execute-api.eu-central-1.amazonaws.com/production/v1/no/books/search?isbn13=9788202857134')
  .then(response => {
    console.log('###### Response from Bookis: ' + JSON.stringify(response))
    console.log(response.headers)
    console.log(response.status)
    console.log(response.ok)
    console.log(response.body)
    return response.json()
  })
  .then(bookisResponse => {
    // console.log('###### JSON from Bookis: ' + JSON)
    console.dir(bookisResponse)
    console.log(JSON.stringify(bookisResponse, null, 2))
    console.log(bookisResponse.data[0].availability)
  })
  .catch(error => {
    console.error('Failed to fetch JSON from Bookis AWS: ', error)
  })
