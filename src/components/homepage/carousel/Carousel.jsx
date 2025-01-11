// ! Copyright @
// ! Syafiq
// ! Syahri Ramadhan Wiraasmara (ARI)
'use client';
import "./carousel.css";
import * as React from "react";
import PropTypes from 'prop-types';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
Carousel.propTypes = {
};
export default function Carousel(props) {
    const images = [
        'https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/158063/bellingrath-gardens-alabama-landscape-scenic-158063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/68767/divers-underwater-ocean-swim-68767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/913215/pexels-photo-913215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ];
    const captions = ["Nature", "Landscape", "Underwater", "Mountain", "Space"];

    const [currentSlide, setCurrentSlide] = React.useState(1);
    const carouselRef = React.useRef(null);

    const [isLeftOrRight, setIsLeftOrRight] = React.useState('');

    const goToNextSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide % 5) + 1);
        setIsLeftOrRight('w3-animate-right');
    };
      
    const goToPrevSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide - 2 + 5) % 5 + 1);
        setIsLeftOrRight('w3-animate-left');
    };
      

    React.useEffect(() => {
        const interval = setInterval(goToNextSlide, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slides-container">
            <div className="carousel place-self-center" ref={carouselRef}>
                <div className={`slide-item ${currentSlide === 1 ? 'active ' + isLeftOrRight : 'slide'}`}><img src={images[0]} title={captions[0]}/></div>
                <div className={`slide-item ${currentSlide === 2 ? 'active ' + isLeftOrRight : 'slide'}`}><img src={images[1]} title={captions[1]}/></div>
                <div className={`slide-item ${currentSlide === 3 ? 'active ' + isLeftOrRight : 'slide'}`}><img src={images[2]} title={captions[2]}/></div>
                <div className={`slide-item ${currentSlide === 4 ? 'active ' + isLeftOrRight : 'slide'}`}><img src={images[3]} title={captions[3]}/></div>
                <div className={`slide-item ${currentSlide === 5 ? 'active ' + isLeftOrRight : 'slide'}`}><img src={images[4]} title={captions[4]}/></div>
            </div>
            <button type="button" className="slide-button prev-button" role="button" onClick={goToPrevSlide}>
                <ChevronLeftIcon />
            </button>
            <button type="button" className="slide-button next-button" role="button" onClick={goToNextSlide}>
                <ChevronRightIcon />
            </button>
        </div>
    );
};
