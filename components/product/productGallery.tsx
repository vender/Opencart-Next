"use client";
// import { useWindowSize } from "react-use";
import React, { useRef, useState } from 'react';
// import Carousel from "#/components/ui/carousel";
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import Image from "next/image";
import ReactHlsPlayer from "#/components/ReactHlsPlayer";
// import Plyr from "plyr-react"

// import "plyr-react/plyr.css"
import "swiper/css";
import "swiper/css/pagination";
// import 'swiper/css/navigation';
import '#/components/ui/styles.css';

import { Navigation, Thumbs, EffectFade } from 'swiper/modules';

const productGalleryCarouselResponsive = {
  "0": {
    slidesPerView: 1,
  },
};
export default function ProductGallery({ product }: any) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const playerRef = React.useRef(null);
  const swiperSlide = useSwiperSlide();
  const { images, name, videos } = product;
  
  return (
    <div className="carouselWrapper select-none col-span-5 grid grid-cols-12 gap-2.5">

      <div className='thumbsSwiper col-span-2 h-[552px]'>
        <div className="slider__prev cursor-pointer flex justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="ag94-b1" style={{ transform: "rotate(-90deg)" }}><path fill="currentColor" d="M7.293 1.293a1 1 0 0 0 0 1.414L16.586 12l-9.293 9.293a1 1 0 1 0 1.414 1.414l10-10a1 1 0 0 0 0-1.414l-10-10a1 1 0 0 0-1.414 0"></path></svg></div>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={5}
            slidesPerView={5}
            direction="vertical"
            watchSlidesProgress={true}
            modules={[Navigation, Thumbs]}
            navigation={{
              nextEl: ".slider__next",
              prevEl: ".slider__prev"
            }}
            className="h-full"
          >
            {videos && videos?.map((item: any, index: number) => {
              return (
              <SwiperSlide key={`product-video-key-${index}`}>
                <div className="col-span-1 !flex justify-center items-center transition duration-150 ease-in">
                  <Image
                    src={                      
                      item?.video_thumb ? item?.video_thumb : "/assets/placeholder/products/product-gallery.svg"
                    }
                    width={100}
                    height={100}
                    quality={100}
                    alt={`${name}--${index}`}
                    className="object-contain w-auto max-h-[100px]"
                  />
                </div>
              </SwiperSlide>
            )})}

            <SwiperSlide>
              <div className="!flex justify-center items-center transition duration-150 ease-in">
                <Image
                  src={
                    product?.image ? `${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${product?.image}` : "/assets/placeholder/products/product-gallery.svg"
                  }
                  width={100}
                  height={100}
                  priority={true}
                  quality={100}
                  alt={name}
                  className="object-contain w-auto max-h-[100px]"
                />
              </div>
            </SwiperSlide>

            {images?.map((item: any, index: number) => {
              return (
              <SwiperSlide key={`product-gallery-key-${index}`}>
                <div className="!flex justify-center items-center transition duration-150 ease-in">
                  <Image
                    src={
                      item?.thumb ? item?.thumb : (item?.image ? `${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${item?.image}` : "/assets/placeholder/products/product-gallery.svg")
                    }
                    width={100}
                    height={100}
                    quality={100}
                    alt={`${name}--${index}`}
                    className="object-contain w-auto max-h-[100px]"
                  />
                </div>
              </SwiperSlide>
            )})}
          </Swiper>
          <div className="slider__next flex justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="ag94-b1" style={{ transform: "rotate(90deg)" }}><path fill="currentColor" d="M7.293 1.293a1 1 0 0 0 0 1.414L16.586 12l-9.293 9.293a1 1 0 1 0 1.414 1.414l10-10a1 1 0 0 0 0-1.414l-10-10a1 1 0 0 0-1.414 0"></path></svg></div>
        </div>

      <div className='col-span-10'>
        <Swiper
          thumbs={{ swiper: thumbsSwiper }}
          breakpoints={productGalleryCarouselResponsive}
          className="product-gallery"
          autoHeight={false}
          navigation={false}

          modules={[Navigation, Thumbs, EffectFade]}
          onSlideChange={(swiper) => {
            const allPlayers = swiper.el.querySelectorAll('video')
            allPlayers.forEach((player: any) => {
              player.pause()
            })
          }}
        >
          {videos && videos?.map((item: any, index: number) => {
            return (
            <SwiperSlide key={`product-video-key-${index}`}>
              <div className="h-full max-h-[600px] !flex justify-center items-center transition duration-150 ease-in">
                <ReactHlsPlayer
                  playerRef={playerRef}
                  src={item?.video}
                  autoPlay={false}
                  muted={true}
                  loop={true}
                  controls={true}
                  width="100%"
                  height="100%"
                  className='max-h-full h-full'
                />
                {/* <video src={item?.video} controls muted className='h-full bg-black'></video> */}
              </div>
            </SwiperSlide>
          )})}

          <SwiperSlide>
            <div className="!flex justify-center items-center transition duration-150 ease-in">
              <Image
                src={
                  product?.image
                    ? `${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${product?.image}`
                    : "/assets/placeholder/products/product-gallery.svg"
                }
                width={600}
                height={600}
                quality={100}
                priority={true}
                alt={name}
                className="object-cover w-auto max-h-[600px]"
              />
            </div>
          </SwiperSlide>

          {images?.map((item: any, index: number) => {
            return (
            <SwiperSlide key={`product-gallery-key-${index}`}>
              <div className="col-span-1 !flex justify-center items-center transition duration-150 ease-in">
                <Image
                  src={
                    item?.image
                      ? `${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${item?.image}`
                      : "/assets/placeholder/products/product-gallery.svg"
                  }
                  quality={100}
                  placeholder="blur"
                  blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPsrgcAAZsBDIKsyq4AAAAASUVORK5CYII="
                  width={600}
                  height={600}
                  alt={`${name}--${index}`}
                  className="object-cover w-auto max-h-[600px]"
                />
              </div>
            </SwiperSlide>
          )})}
        </Swiper>
      </div>

    </div>
  );
}
