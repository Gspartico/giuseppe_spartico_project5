import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Header from './Header.js';
import Description from './Description.js'
// import randomMovie from 'randomMovie.js'

const apiKey = `875e4d600eaf27cc3eaca8c5bf1ac2a8`

class App extends Component {
  constructor(){
    super();
    this.state = {
      movie: []
    };
  };

//create a method that calls in the axios. in this call the with_genre will refer to the genre_id in state.
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
        page: Math.floor(Math.random() * 6),
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

randomMovie = () => {
  // console.log(this.state.movie.length)
  const randomNumber =this.state.movie[Math.floor(Math.random() * this.state.movie.length)]
  // console.log(this.state.movie,'this is my movie')
  console.log(randomNumber)
  this.setState({
    movie: randomNumber
  })
}

//on click of button grab value of button and update the state, right after updating the state we call the api
handleClick = e =>{
  const movieID = e.target.value
  // console.log(e.target.value)
  this.getMovies(movieID)
}

  render() {
    console.log(this.state.movie)
    return (
      <section>
      <Header />
      <Description />
      <div className="App wrapper">
        <div>
        <button value='35' onClick={this.handleClick}>Sunny</button>
        </div>
        <div>
        <button value='18' onClick={this.handleClick}>Rainy</button>
        </div>
        <div>
        <button value='27' onClick={this.handleClick}>Foggy</button>
        </div>
        <div>
        <button value='9648' onClick={this.handleClick}>Cloudy</button>
        </div>
        <div className="disaster">
          <img src="/assets/Tornado.png" alt=""/>
        <button value='28' onClick={this.handleClick}>Disaster Alert</button> 
        </div>
      </div>
      <div>
        <h2>{this.state.movie.title}</h2>
          <img src={`http://image.tmdb.org/t/p/w500/${this.state.movie.poster_path}`} alt="Movie poster of the random movie that is called in on the user button click."/>
        <p>{this.state.movie.overview}</p>
      </div>
      </section>
    );
  }
}

export default App;

//Call in Moviedb discover/movies API using axios
//Isolate the genre_id's in response.results genre_ID"

//link each genre to five different weather options that can be selected by a user
//when weather option is selected, on click of button randomly pull a movie in the associated array
//append movie title and image to DOM with results.title and results.poster_path