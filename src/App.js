import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Header from './Header.js';
import Description from './Description.js';
import firebase from './firebase.js';

const dbRef = firebase.database().ref();
const apiKey = `875e4d600eaf27cc3eaca8c5bf1ac2a8`;

class App extends Component {
  constructor(){
    super();
    this.state = {
      movie: [],
      visuallyhidden: true,
      movieList: {},
    };
  };

//Set dbRef with parameters to be set later for firebase storing.
  componentDidMount(){
    dbRef.on('value', (snapshot) => {
      this.setState({
        movieList: snapshot.val()
      });
    });
  }

//create a method that calls in the axios. in this call the with_genre will refer to the genre_id in state and randomize which array (page) it will pull a movie from.
getMovies = id => {
    return axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/discover/movie`,
      dataType: 'json',
      params: {
        api_key: apiKey,
        language:'en-US', 
        sort_by: 'popularity.desc', 
        include_adult: 'false', 
        include_video: 'false', 
        page: Math.floor(Math.random() * 6 + 1),
        with_genres: id
      }
    }).then((res) => {
      res = res.data.results
      this.setState({
        movie: res 
      })
      this.randomMovie()
    })
  }

//Create a method that will randomize the which object within the called in array that gets appended to the page in state.
randomMovie = () => {
  const randomNumber =this.state.movie[Math.floor(Math.random() * this.state.movie.length)]
  console.log(randomNumber)
  this.setState({
    movie: randomNumber
  })
  //Add variable that takes the random movie title and pushes it into firebase.
  const pulledMovieName = {
    title: this.state.movie.title
  }
  dbRef.push(pulledMovieName);
}

//On click of button grab value of button and update the state, right after updating the state we call the api. Also removes the visuallyhidden class from the movie information being appended to DOM change to show upon click.
handleClick = e =>{
  const movieID = e.target.value
  this.getMovies(movieID)
  this.setState({
    visuallyhidden: false
  })
}

  render() {
    return (
      <div>
        <Header />
        <Description />
          <div className="App wrapper">
            {/* Add number that references to a specific genre id to the value, which will be passed into the axios call to call in movies with that genre ID on click of button */}
          <div>  
            <button value='35' className="sunny" onClick={this.handleClick}>Sunny</button>
          </div>
          <div>
            <button value='18' className="rainy" onClick={this.handleClick}>Rainy</button>
          </div>
          <div>
            <button value='27' className="foggy" onClick={this.handleClick}>Foggy</button>
          </div>
          <div>
            <button value='9648' className="cloudy" onClick={this.handleClick}>Cloudy</button>
          </div>
          <div>
            <button value='28' className="disaster" onClick={this.handleClick}>Disaster Alert</button> 
          </div>
        </div>
        {/* Append movie title, description, and poster to DOM on click. Add ternary operator to toggle visuallyhidden class so section shows on click */}
        <section className={this.state.visuallyhidden ? 'visuallyhidden' : 'movie-info wrapper'}>
          <div className="movie-description">
            <h2>{this.state.movie.title}</h2>
            <p>{this.state.movie.overview}</p>
          </div>
          <div className="movie-poster">
            <img src={`http://image.tmdb.org/t/p/w500/${this.state.movie.poster_path}`} alt="Movie poster of the random movie that is called in on the user button click."/>
          </div>
        </section> 
        </div>  
    );
  }
}

export default App;
