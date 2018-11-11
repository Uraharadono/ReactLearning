import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";

class App extends React.Component {
  // handleTitleClick() {
  //   alert("You clicked title.");
  // }
  render() {
    // return React.createElement(
    //   "div",
    //   { id: "neki-id", onClick: this.handleTitleClick },
    //   [
    //     React.createElement("h1", {}, "Adopt me!"),
    //     React.createElement(Pet, {
    //       name: "Lujka",
    //       animal: "Dog",
    //       breed: "Avlijaner"
    //     }),
    //     React.createElement(Pet, {
    //       name: "Shanequa",
    //       animal: "Cat",
    //       breed: "Jos gori avlijaner"
    //     }),
    //     React.createElement(Pet, {
    //       name: "Konjo",
    //       animal: "Horse",
    //       breed: "Travnati avlijaner"
    //     })
    //   ]
    // );
    return (
      /* Posto u reactu mora se uvijek sve wrapat u div kad je return u pitanju mogu staviti umjesto div-a 
      <React.Fragment>
      ..sadrzaj
      </React.Fragment>
      */
      <div>
        <h1>Adopt me</h1>
        <Pet name="Lujka" animal="Dog" breed="Avlijaner"></Pet>
        <Pet name="Shanequa" animal="Cat" breed="Jos gori avlijaner"></Pet>
        <Pet name="Konjo" animal="Horse" breed="Travnati avlijaner"></Pet>
      </div>
    )
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

// ovo je ako ne koristim jsx, vec pure js
// render(React.createElement(App), document.getElementById("root"));
// ovo je ako koristim jsx
render(<App></App>, document.getElementById("root"));
