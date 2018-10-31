import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";

class App extends React.Component {
  handleTitleClick() {
    alert("You clicked title.");
  }
  render() {
    return React.createElement(
      "div",
      { id: "neki-id", onClick: this.handleTitleClick },
      [
        React.createElement("h1", {}, "Adopt me!"),
        React.createElement(Pet, {
          name: "Lujka",
          animal: "Dog",
          breed: "Avlijaner"
        }),
        React.createElement(Pet, {
          name: "Shanequa",
          animal: "Cat",
          breed: "Jos gori avlijaner"
        }),
        React.createElement(Pet, {
          name: "Konjo",
          animal: "Horse",
          breed: "Travnati avlijaner"
        })
      ]
    );
  }
}

// const App = () => {
//     // ovo se builda ovako: tip elementa, njegovi atributi , children
//     return React.createElement("div", { id: "neki-id" }, [
//         React.createElement("h1", {}, "Adopt me!"),
//         React.createElement(Pet, { name: "Lujka", animal: "Dog", breed: "Avlijaner" }),
//         React.createElement(Pet, { name: "Shanequa", animal: "Cat", breed: "Jos gori avlijaner" }),
//         React.createElement(Pet, { name: "Konjo", animal: "Horse", breed: "Travnati avlijaner" })
//     ]);
// }

// ovo dvoje je isto
// ReactDOM.render(React.createElement(App), document.getElementById("root"));
render(React.createElement(App), document.getElementById("root"));
