"use client"
import { SwiperSlide } from 'swiper/react';
import Carousel from "#/components/ui/carousel";
import Image from 'next/image';

import Link from 'next/link';

export default function Banners({ banners }: { banners: any }) {
    
    return (
        <div className='carouselWrapper relative max-w-[1920px] mb-5 md:mb-12 lg:mb-14 2xl:mb-16 mx-auto overflow-hidden px-4 md:px-8 2xl:px-0'>
            <Carousel
				autoplay={false}
				className="mx-0"
				buttonClassName="hidden"
				pagination={{
					clickable: true,
				}}
			>
                {banners && banners?.map((banner: any) => (

                    <SwiperSlide className="carouselItem px-0 2xl:px-3.5" key={banner.banner_image_id}>
                        <Link
                            href={banner.link}
                            className={"h-full group flex justify-center relative overflow-hidden"}
                        >
                            <Image
                                src={`${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${banner.image}`}
                                className="bg-gray-300 w-full rounded"
                                width={banner.width}
                                height={banner.height}
                                quality={100}
                                priority={true}
                                alt={banner?.title}
                            />
                        </Link>
                    </SwiperSlide>
                ))
                }
            </Carousel>
        </div>
    )
}
