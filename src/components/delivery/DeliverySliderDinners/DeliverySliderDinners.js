import React, { useContext } from 'react';
import './DeliverySliderDinner.css';
import { PStore } from '../../../store/PStore';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom';

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";

// import Swiper core and required modules
import SwiperCore, {
    Scrollbar, Navigation
  } from 'swiper/core';
  
  // install Swiper modules
  SwiperCore.use([Scrollbar, Navigation]);

const DeliverySliderDinner = () => {

    const { products } = useContext(PStore);

    return(
        <div className="deliverySliderDinner">
            <Swiper slidesPerView={3} slidesPerColumn={2} spaceBetween={30} navigation={true} grabCursor={true} scrollbar={true} className="mySwiper">
            { products.filter(fav => fav.ProductCategory === 'Obiady').map(prod => ( 
                <SwiperSlide key={ prod.Id }>
                    <Link to={ `single/${ prod.Id }` }>
                        <div className="dvl-slide-content">
                            <img alt="food" src={ prod.ProductUrl } />
                            <div className="dvl-slide-bg-rgba">
                                <h3>{ prod.ProductName }</h3>
                            </div>
                        </div>
                    </Link>
                </SwiperSlide>
            )) }    
            </Swiper>
        </div>
    );
};

export default DeliverySliderDinner;