import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';

import icon1 from '../assets/icon.webp';
import icon2 from '../assets/icon.webp';
import icon3 from '../assets/icon.webp';
import icon4 from '../assets/icon.webp';
import icon5 from '../assets/icon.webp';
import icon6 from '../assets/icon.webp';

const brandLogos = [
    icon1,
    icon2,
    icon3,
    icon4,
    icon5,
    icon6,
    // Add more logos as needed
];


export const SponsorPage = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="carousel-container w-full p-9">
            <Slider {...settings}>
                {brandLogos.map((logo, index) => (
                    <div key={index} className="carousel-slide">
                        <Image src={logo} alt={`Brand logo ${index + 1}`} className="brand-logo" width={200} height={100} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};