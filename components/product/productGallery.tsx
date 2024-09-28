"use client";
// import { useWindowSize } from "react-use";
import Carousel from "#/components/ui/carousel";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";

const productGalleryCarouselResponsive = {
  "0": {
    slidesPerView: 1,
  },
};

export default function ProductGallery({ product }: any) {
  // const { width } = useWindowSize();
  const { images, name } = product;

  return (
    <div className="col-span-5 grid grid-cols-1 gap-2.5">
      <Carousel
        pagination={{
          clickable: true,
        }}
        breakpoints={productGalleryCarouselResponsive}
        className="product-gallery"
        buttonClassName="hidden"
        autoHeight={true}
        // arrows={true}
      >
        {images?.map((item: any, index: number) => {
          // const prodImage = decodeURIComponent(item?.image);
          // console.log(prodImage);
          return (
          <SwiperSlide key={`product-gallery-key-${index}`}>
            <div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
              <Image
                src={
                  item?.image
                    ? `${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${item?.image}`
                    : "/assets/placeholder/products/product-gallery.svg"
                }
                width={400}
                height={400}
                alt={`${name}--${index}`}
                className="object-cover w-full"
              />
            </div>
          </SwiperSlide>
        )})}
      </Carousel>
    </div>
  );
}
