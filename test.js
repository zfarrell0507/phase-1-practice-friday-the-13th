document.addEventListener("DOMContentLoaded", () => {

    const movieList = document.querySelector('#movie-list')
    let currentMovie = {};
    
    
        fetch(`http://localhost:3000/movies`)
            .then(resp => resp.json())
            .then(data => {
                data.forEach(movieContent => renderMovie(movieContent));
            })
        
    
    
    // C1: function for movie displayed
    function renderMovie(movieContent) {
        const img = document.createElement('img')
        img.src = movieContent.image;
        img.id = movieContent.id;
        movieList.appendChild(img);
        img.addEventListener('click', () => renderMovieDetails(movieContent))
    }
    
    function renderMovieDetails(movieContent) {
        currentMovie = movieContent;
        const movieInfo = document.querySelector('#movie-info');
        const title = movieInfo.querySelector('#title');
        const year = movieInfo.querySelector('#year-released');
        const summary = movieInfo.querySelector('#description');
        const movieImg = movieInfo.querySelector('#detail-image');
        const button = movieInfo.querySelector('#watched');
    
        button.addEventListener('click', e => changeButton(e));
        title.textContent = movieContent.title;
        year.textContent = movieContent.release_year;
        summary.textContent = movieContent.description;
        movieImg.src = movieContent.image;
        if (movieContent.watched === false) {
            button.textContent = "UNWATCHED";
        } 
        else {
            button.textContent = "WATCHED";
        }
    }
    
    function updateMovie(e) {
        fetch(`http://localhost:3000/movies/${e.target.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "watched": e.target
            })
        })
            .then(resp => resp.json)
    }
    
    function changeButton(e) {
        if (e.target.textContent === "UNWATCHED") {
            e.watched = true;
        } 
        else {
            e.watched = false;
        }
        console.log(e)
        return updateMovie(e)
    }

})