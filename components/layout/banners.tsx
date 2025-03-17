"use client"
import { SwiperSlide } from 'swiper/react';
import Carousel from "#/components/ui/carousel";
import Image from 'next/image';
import Link from 'next/link';

interface Banner {
  banner_id: string;
  name: string;
  status: number;
  banner_image_id: string;
  language_id: string;
  title: string;
  link: string;
  image: string;
  width: number;
  height: number;
}

export default function Banners({ banners }: { banners: Banner[] }) {
    
    return (
        <div className='carouselWrapper relative max-w-[1920px] mb-5 md:mb-12 lg:mb-14 2xl:mb-16 mx-auto overflow-hidden px-4 md:px-8 2xl:px-0'>
            <Carousel
				autoplay={{ delay: 5000 }}
				className="mx-0"
				pagination={{
					clickable: true,
				}}
                arrows={true}
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
                                alt={banner.title}
                            />
                        </Link>
                    </SwiperSlide>
                ))
                }
            </Carousel>
        </div>
    )
}
