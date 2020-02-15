// require package
const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const moiveList = require('./movies.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// setting routes
app.get('/', (rep, res) => {
  res.render('index', { movies: moiveList.results })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const movies = moiveList.results.filter(movie => {
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { movies: movies, keyword: keyword })
})

app.get('/movies/:movie_id', (req, res) => {
  const movie = moiveList.results.find(movie => {
    return movie.id.toString() === req.params.movie_id
  })
  res.render('show', { movie: movie })
})

// listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
