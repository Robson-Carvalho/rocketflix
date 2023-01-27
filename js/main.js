import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const buttonToChangeMovie = document.querySelector("#btn");
const movieContainer = document.querySelector("#movie");

const fluxControl = {
  isTheFirstAccess: true,
};

buttonToChangeMovie.addEventListener("click", () => {
  handleMovieSwitching();
});

const addMovieOnScreen = (movie) => {
  if (movie.overview === "") {
    handleMovieSwitching();
    return;
  }

  const cardMovie = `
  <div class="card">
          <img class="cover" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" />
          <div class="info">
            <p class="title">${movie.title}</p>
            <p class="description">${movie.overview}</p>
          </div>
        </div>
  `;
  movieContainer.innerHTML = cardMovie;
};

const getMoviesInAPI = async (page = generateRandomNumber(5)) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`
    );

    addMovieOnScreen(response.data.results[generateRandomNumber(20)]);
  } catch (error) {
    console.log(error);
  }
};

const generateRandomNumber = (maxRandomNumber) => {
  return Math.floor(Math.random() * maxRandomNumber + 1);
};

const handleMovieSwitching = () => {
  if (fluxControl.isTheFirstAccess) {
    getMoviesInAPI(1);
    fluxControl.isTheFirstAccess = !fluxControl.isTheFirstAccess;
    return;
  }
  getMoviesInAPI();
};

handleMovieSwitching();
