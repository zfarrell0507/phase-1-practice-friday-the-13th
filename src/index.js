let currentMovie = {}
let blood = document.querySelector('#amount')

fetch(`http://localhost:3000/movies`)
    .then(resp => resp.json())
    .then(movies => {
        renderMovies(movies)
        renderOneMovie(movies[0])
        handleBloodForm()
    })

function renderMovies(movies) {
    movies.forEach(movie => {
        let image = document.createElement('img')
        image.src = movie.image
        let picContainer = document.querySelector('#movie-list')
        picContainer.append(image)
        image.addEventListener('click', () => renderOneMovie(movie))
    })
}

function renderOneMovie(movie) {
    currentMovie = movie
    let title = document.querySelector('#title')
    title.textContent = movie.title
    let year = document.getElementById('year-released')
    year.textContent = movie.release_year
    let description = document.querySelector('#description')
    description.textContent = movie.description
    let detailImage = document.querySelector('#detail-image')
    detailImage.src = movie.image
    blood.textContent = movie.blood_amount
    let watchedButton = document.querySelector('#watched')
    watchedButton.textContent = movie.watched ? "Watched" : "Unwatched"
    watchedButton.addEventListener('click', () => toggleWatchedButton(movie))
}

function toggleWatchedButton(movie) {
    movie.watched = !movie.watched
    let watchedButton = document.querySelector('#watched')
    watchedButton.textContent = movie.watched ? "Watched" : "Unwatched"
    console.log(movie)
}
function handleBloodForm() {
    let blooodForm = document.querySelector('#blood-form')
    blooodForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const input = document.querySelector('#blood-amount').value
        currentMovie.blood_amount += parseInt(input)
        blood.textContent = currentMovie.blood_amount
        blooodForm.reset()
    })
}
