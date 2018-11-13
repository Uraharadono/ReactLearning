import React from "react";

class Carousel extends React.Component {
    state = {
        photos: [],
        active: 0
    };

    // da ne koristim ovaj novi fazon, da radim po onom starom svom
    // constructor(props) {
    //     super(props);

    //     this.handleIndexClick = this.handleIndexClick.bind(this);
    // }

    static getDerivedStateFromProps({ media }) {
        let photos = [];
        if (media && media.photos && media.photos.photo) {
            photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
        }

        return { photos };
    }

    handleIndexClick = event => {
        this.setState({
            // ovaj + pretvara string u broj (coercion)
            active: +event.target.dataset.index
        });
    };

    render() {
        const { photos, active } = this.state; // destructuring

        return (
            <div className="carousel">
                <img src={photos[active].value} alt="animal" />
                <div className="carousel-smaller">
                    {photos.map((photo, index) => (
                        /* eslint-disable-next-line */
                        <img
                            key={photo.value}
                            src={photo.value}
                            className={index === active ? "active" : ""}
                            alt="animal thumbnail"
                            data-index={index}
                            onClick={this.handleIndexClick}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Carousel;
