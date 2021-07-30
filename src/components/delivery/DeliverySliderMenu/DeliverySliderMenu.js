import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom';
// import Swiper core and required modules
import SwiperCore, {
    Scrollbar, Navigation
  } from 'swiper/core';
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import './DeliverySliderMenu.css';
import { PStore } from '../../../store/PStore';

// install Swiper modules
SwiperCore.use([Scrollbar, Navigation]);

const DeliverySliderMenu = ({ single }) => {

    const { products } = useContext(PStore);

    return(
        <div className="deliverySliderMenu">
            <Swiper slidesPerView={4} scrollbar={true} spaceBetween={30} navigation={true} grabCursor={true} className="mySwiper">
            { products.filter(fav => fav.ProductFiveStar === 'tak').map(prod => ( 
                    <SwiperSlide key={ prod.Id }>
                        <Link to={ `${ single }${ prod.Id }` }>
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

export default DeliverySliderMenu;