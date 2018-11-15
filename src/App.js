import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import pf from "petfinder-client";
import { Provider } from "./SearchContext";
import Results from "./Results";
import Details from "./Details";
import SearchParams from "./SearchParams";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
})

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      location: "Seattle, WA",
      animal: "",
      breed: "",
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds
    }
  }

  handleLocationChange = event => {
    this.setState({
      location: event.target.value
    });
  };

  handleAnimalChange = event => {
    this.setState(
      {
        animal: event.target.value,
        breed: ""
      },
      // ne mogu uraditi da dole na kraju ove funkcije "handleAnimalChange" pozovem ovo getBreeds
      // jer ovaj setState je wrapan u setTImeout i moze se desiti da se "handleAnimalChange" izvrsi prije poziva
      // ove funkcije "this.getBreeds"
      this.getBreeds
    );
  };

  handleBreedChange = event => {
    this.setState({
      breed: event.target.value
    });
  };

  getBreeds() {
    if (this.state.animal) {
      petfinder.breed.list({ animal: this.state.animal }).then(data => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          this.setState({
            breeds: data.petfinder.breeds.breed
          });
        }
      });
    } else {
      this.setState({ breds: [] });
    }
  }

  render() {
    return (
      <div>
        <header>
          <Link to="/">
            Adopt me!
        </Link>
        <Link to="/search-params">
        <span aria-label="search" role="img" >
          :smile:
        </span>
        </Link>
        </header>

        <Provider value={this.state}>
          <Router>
            <Results path="/" />
            <Details path="/details/:id" />
            <SearchParams path="/search-params"></SearchParams>
          </Router>
        </Provider>
      </div>
    )
  }
}

// ovo je ako ne koristim jsx, vec pure js
// render(React.createElement(App), document.getElementById("root"));
// ovo je ako koristim jsx
render(<App></App>, document.getElementById("root"));
