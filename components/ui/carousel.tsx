import React, { useRef } from "react";
import { Swiper } from "swiper/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "swiper/css";
import "swiper/css/pagination";

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

// Кастомные кнопки
const CustomPrevButton = ({ onClick } : any) => (
	<button className="w-7 h-7 md:w-7 md:h-7 lg:w-9 lg:h-9 xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 text-sm md:text-base lg:text-xl 3xl:text-2xl text-black flex items-center justify-center rounded-full text-gray-0 bg-white absolute transition duration-250 hover:bg-gray-900 hover:text-white focus:outline-none start-0 transform shadow-navigation" onClick={onClick}>
	  <IoIosArrowBack />
	</button>
);
  
const CustomNextButton = ({ onClick } : any) => (
	<button className="w-7 h-7 lg:w-9 lg:h-9 xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 text-sm md:text-base lg:text-xl 3xl:text-2xl text-black flex items-center justify-center rounded-full bg-white absolute transition duration-250 hover:bg-gray-900 hover:text-white focus:outline-none end-0 transform shadow-navigation" onClick={onClick}>
	  <IoIosArrowForward />
	</button>
);

export default function Carousel({
	children,
	className = "",
	buttonClassName = "",
	buttonSize = "default",
	paginationVariant = "default",
	pagination,
	breakpoints,
	arrows,
	autoHeight = false,
	autoplay = {
		delay: 5000,
	}
}: CarouselPropsType) {
	
	const prevRef:any = useRef(null);
	const nextRef:any = useRef(null);	

	return (
		<div className={`carouselWrapper relative ${className} ${paginationVariant === "circle" ? "dotsCircle" : ""}`} >
			<Swiper
				loop={true}
				autoplay={autoplay}
				autoHeight={autoHeight}
				breakpoints={breakpoints}
				modules={[Pagination, Navigation, Autoplay]}
				pagination={pagination}
				navigation={{
					prevEl: prevRef.current, // Привязываем кнопку "Назад"
					nextEl: nextRef.current, // Привязываем кнопку "Вперед"
				}}
				onBeforeInit={(swiper: any) => {
					swiper.params.navigation.prevEl = prevRef.current;
					swiper.params.navigation.nextEl = nextRef.current;
				}}
			>
				{children}
				{arrows && 
					<div className={`flex items-center w-full absolute top-2/4 z-10 ${buttonClassName}`}>
						<CustomPrevButton onClick={() => prevRef.current?.click()} />
						<CustomNextButton onClick={() => nextRef.current?.click()} />

						<div ref={prevRef} className="hidden"></div>
						<div ref={nextRef} className="hidden"></div>
					</div>
				}
			</Swiper>
			
			
		</div>
	)
}