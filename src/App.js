import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component{

  state ={
    isLoading: true,
    movies:[]
  }

  getMovies = async() => {
    const {data: {data: {movies}}}= await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating")
    console.log("api movies:", movies);
    console.log("state movies:", this.state.movies);
    this.setState({movies: movies});
    console.log("state movies:", this.state.movies);
    this.setState({isLoading: false});
  }

  componentDidMount(){
    this.getMovies();
  }
  
  render(){
    const {isLoading, movies} = this.state;
    return(
      <section class="container">
        {isLoading ? <div class="loader"><span>Loading...</span></div> : movies.map(movie => (<Movie key={movie.id} id={movie.id} year={movie.year} title={movie.title} summary={movie.summary} poster={movie.medium_cover_image} genres={movie.genres}></Movie>))}
      </section>
    )
  }
}
export default App;