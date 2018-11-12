import React from "react";
import pf from "petfinder-client";
import { navigate } from "@reach/router"

const petfinder = pf({
    key: "130015cd42380eabf21cb2b04a374cb9",
    secret: "e44e30dce18764e5823ce61bb8f718b6"
});

class Details extends React.Component {
    // ovo je onaj novi fazon sto je on pokazao, stage 3 ili 5, top level class property
    state = {
        loading: true
    };

    // ovo je kako meni treba da koristim
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         loading: true
    //     };
    // }

    componentDidMount() {
        petfinder.pet.get({
            output: "full",
            id: this.props.id
        }).then((data) => {
            const pet = data.petfinder.pet;
            let breed;
            if (Array.isArray(pet.breeds.breed)) {
                breed = pet.breeds.breed.join(", ");
            }
            else {
                breed = pet.breeds.breed;
            }
            this.setState({
                name: pet.name,
                anima: pet.animal,
                location: `${pet.contact.city}, ${pet.contact.state}`,
                description: pet.description,
                media: pet.media,
                breed: breed,
                loading: false
            })
        }).catch(err => {
            this.setState({ error: err });
            navigate("/");
        }
        );
    }

    render() {
        // return <h1>MADAFAKAAAAAAAAAA!</h1>

        if (this.state.loading) {
            return <h1>loading...</h1>
        }
        else {
            const { name, animal, breed, location, description } = this.state;
            return <div className="details">
                <div>
                    <h1>{name}</h1>
                    <h2>{animal} - {breed} - {location}</h2>
                    <p>{description}</p>
                </div>
            </div>
        }
    }
}

export default Details;