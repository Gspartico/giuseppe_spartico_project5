import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

// const baseURL = `https://api.themoviedb.org/3/`;
const apiKey = `875e4d600eaf27cc3eaca8c5bf1ac2a8`
// const apiKey = `f0ba00aa70aa95e488fb89869bf99a39`

class App extends Component {
  constructor(){
    super();
    this.state = {
      movie: axios
    };
  };

  

  componentDidMount(){
    return axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/discover/movie`,
      dataType: 'jsonp',
      params: {
        api_key: apiKey,
        language:'en-US', 
        sort_by: 'popularity.desc', 
        include_adult: 'false', 
        include_video: 'false', 
        page: 1,
        with_genres: 28

      }
    }).then((response) => {
      response = response.data.results
      // console.log(response)
      this.setState({
        movie: response
        
      })
    })
      // response = response.data
      // console.log(response.data.results.genre_ids);
      // this.state({
      //   movies: response
      // })
}
handleClick = () =>{
  console.log('i work')
  const getMovie = Array.from(this.state.movie)
  console.log(getMovie)
  this.setState({
    response: getMovie
  })
//   // this.setState({
//   //   [e.target.]
//   // })
}

  render() {
    return (
      <div className="App">
      <h1>Test button</h1>
        <button onClick={this.handleClick}>Get a movie</button>
        
      </div>
    );
  }
}

export default App;

//Call in Moviedb discover/movies API using axios
//Isolate the genre_id's in response.results genre_ID"

//link each genre to five different weather options that can be selected by a user
//when weather option is selected, on click of button randomly pull a movie in the associated array
//append movie title and image to DOM with results.title and results.poster_path