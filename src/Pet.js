import React from "react";

const Pet = props => {
  // with pure js
  // return React.createElement("div", {}, [
  //   React.createElement("h1", {}, props.name),
  //   React.createElement("h2", {}, props.animal),
  //   React.createElement("h2", {}, props.breed)
  // ]);

  // this is jsx stuff
  return (
    <div>
      <h1>{props.name}</h1>
      <h2>{props.animal}</h2>
      <h2>{props.breed}</h2>
    </div>
  )
};

export default Pet;