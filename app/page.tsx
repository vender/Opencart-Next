import { getCategories, getBanners, getlatestProducts } from '#/lib'
import Banners from "#/components/layout/banners";
import BannerCarouselBlock from "#/components/layout/banner-carousel-block";
import CategoryBlock from "#/components/layout/category-block";
import NewArrivalsProductFeed from "#/components/product/feeds/new-arrivals-product-feed";

export default async function Home() {
  const categories = await getCategories(0);
  const sliderhome = await getBanners('common/home', 'content_top');
  const banners = await getBanners('common/home', 'content_bottom');
  const latestProducts = await getlatestProducts();
  
  return (
    <>
      <Banners banners={sliderhome} />
      <div className="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16">
        {banners.length ? <BannerCarouselBlock banners={banners} /> : null}
        <CategoryBlock categories={categories} type="rounded" sectionHeading="Категории товаров" />
        <NewArrivalsProductFeed latestProducts={latestProducts} />
      </div>
    </>
  )
}