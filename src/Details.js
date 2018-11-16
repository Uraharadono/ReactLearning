import React from "react";
import pf from "petfinder-client";
import { navigate } from "@reach/router"
import Carousel from "./Carousel";
import Modal from "./Modal";

const petfinder = pf({
    key: process.env.API_KEY,
    secret: process.env.API_SECRET
});

class Details extends React.Component {
    // ovo je onaj novi fazon sto je on pokazao, stage 3 ili 5, top level class property
    state = {
        loading: true,
        showModal: true
    };

    // ovo je kako meni treba da koristim
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         loading: true
    //     };
    // }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    };

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
            const { name, animal, breed, location, description, media, showModal } = this.state;
            
            // Ovo je drugi nacin od ovoga sto sam ja iskoristio, ternarni operator
            // let modal;
            // if(showModal) modal = <Modal/>
            // else model = null;

            return (
                <div className="details">
                    <Carousel media={media} />
                    {/* <div onClick={console.log("click")}> */}
                    <div>
                        <h1>{name}</h1>
                        <h2>{animal} - {breed} - {location}</h2>
                        <button onClick={this.toggleModal}> Adopt {name}</button>
                        <p>{description}</p>
                        {
                            showModal ? (
                                <Modal>
                                    <h1>Would you like to adopt {name}</h1>
                                    <div className="buttons">
                                        <button onClick={this.toggleModal}>Yes</button>
                                        <button onClick={this.toggleModal}>No</button>
                                    </div>
                                </Modal>
                            ) : null
                        }
                    </div>
                </div>
            )
        }
    }
}

export default Details;