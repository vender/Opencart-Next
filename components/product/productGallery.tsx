"use client";
import Carousel from "#/components/ui/carousel";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';

const productGalleryCarouselResponsive = {
  "0": {
    slidesPerView: 1,
  },
};

export default function ProductGallery({ product }: any) {
  const { images, name } = product;

  return (
    <div className="col-span-5 grid grid-cols-1 gap-2.5">
      <LightGallery
          speed={500}
          plugins={[lgZoom]}
          mode="lg-fade"
          selector={".product-gallery-image"}
          download={false}
          zoom={false}
          backgroundColor="#ffffff"
        >
        <Carousel
          pagination={{
            clickable: true,
          }}
          breakpoints={productGalleryCarouselResponsive}
          className="product-gallery"
          autoHeight={false}
          arrows={true}
          autoplay={false}
        >
          {images?.map((item: any, index: number) => {
            return (
              <SwiperSlide key={`product-gallery-key-${index}`} className="col-span-1 !flex justify-center items-center">
                  <Image
                    data-src={item?.image ? `${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${item?.image}` : "/assets/placeholder/products/product-gallery.svg"}
                    src={item?.image ? `${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${item?.image}` : "/assets/placeholder/products/product-gallery.svg"}
                    onError={(e) => { e.currentTarget.src = "/assets/placeholder/products/product-gallery.svg"; }}
                    width={400}
                    height={400}
                    alt={`${name}--${index}`}
                    loading="lazy"
                    className="object-cover w-auto max-h-[600px] product-gallery-image"
                  />
              </SwiperSlide>
            );
          })}
        </Carousel>
      </LightGallery>
    </div>
  );
}
