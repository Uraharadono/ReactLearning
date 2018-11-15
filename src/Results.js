import React from "react";
import pf from "petfinder-client";
import { Consumer } from "./SearchContext";
import Pet from "./Pet";
import SearchBox from "./SearchBox";

const petfinder = pf({
    key: process.env.API_KEY,
    secret: process.env.API_SECRET
});

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pets: []
        };
    }

    componentDidMount() {
        this.search();
    }

    search = () => {
        petfinder.pet
            .find({
                output: "full",
                location: this.props.searchParams.location,
                animal: this.props.searchParams.animal,
                breed: this.props.searchParams.breed
            })
            .then(data => {
                let pets;
                if (data.petfinder.pets != null && data.petfinder.pets.pet != null) {
                    if (Array.isArray(data.petfinder.pets.pet)) {
                        pets = data.petfinder.pets.pet;
                    } else {
                        pets = [data.petfinder.pets.pet];
                    }
                } else {
                    pets = [];
                }

                this.setState({
                    pets: pets
                    // moze i ovako jer su iste rijeci, ali je meni sranje
                    // pets
                });
            });
    }

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
            <div className="search">
                <SearchBox search={this.search} />
                {this.state.pets.map(pet => {
                    let breed;

                    if (Array.isArray(pet.breeds.breed)) {
                        breed = pet.breeds.breed.join(", ");
                    } else {
                        breed = pet.breeds.breed;
                    }
                    return (
                        <Pet
                            key={pet.id}
                            animal={pet.animal}
                            name={pet.name}
                            breed={breed}
                            media={pet.media}
                            location={`${pet.contact.city}, ${pet.contact.state}`}
                            id={pet.id}
                        />
                    );
                })}
            </div>
        );
    }
}

// export default Results;
export default function ResultsWithContext(props) {
    return (
        <Consumer>
            {context => <Results {...props} searchParams={context} />}
        </Consumer>
    );
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
// render(<App></App>, document.getElementById("root"));
