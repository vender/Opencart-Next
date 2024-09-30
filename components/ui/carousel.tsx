import React, { useRef } from "react";
import { Swiper } from "swiper/react";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "swiper/css";
import "swiper/css/pagination";
// import 'swiper/css/navigation';
import './styles.css';

import { Pagination, Navigation, Autoplay } from 'swiper/modules';

type CarouselPropsType = {
	children?: any;
	className?: string;
	buttonClassName?: string;
	buttonSize?: "default" | "small";
	paginationVariant?: "default" | "circle";
	centeredSlides?: boolean;
	breakpoints?: {} | any;
	pagination?: {} | any;
	arrows?: {} | any;
	autoHeight?: boolean;
	autoplay?: {} | any;
};

export default function Carousel({
	children,
	className = "",
	paginationVariant = "default",
	pagination,
	breakpoints,
	autoHeight = false,
	autoplay = {
		delay: 5000,
	}
}: CarouselPropsType) {

	return (
		<div className={`carouselWrapper relative ${className} ${paginationVariant === "circle" ? "dotsCircle" : ""}`} >
			<Swiper
				// loop={true}
				autoplay={autoplay}
				autoHeight={autoHeight}
				breakpoints={breakpoints}
				modules={[Pagination, Navigation, Autoplay]}
				pagination={pagination}
				navigation={true}
			>
				{children}
			</Swiper>
		</div>
	)
}