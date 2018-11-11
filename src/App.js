import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import Results from "./Results";
import Details from "./Details";

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Link to="/">
            Adopt me!
        </Link>
        </header>


        <Router>
          <Results path="/" />
          <Details path="/details/:id" />
        </Router>

      </div>
    )
  }
}

// ovo je ako ne koristim jsx, vec pure js
// render(React.createElement(App), document.getElementById("root"));
// ovo je ako koristim jsx
render(<App></App>, document.getElementById("root"));
