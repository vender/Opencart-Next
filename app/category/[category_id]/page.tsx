import Container from "#/components/ui/container";
import Breadcrumb from "#/components/layout/breadcrumb";
import ProductGrid from "#/components/product/product-grid";
import { getCategory, getProducts } from "#/lib";
import SearchTopBar from "#/components/ui/top-bar";
import clsx from "clsx";
import { use } from "react"

export async function generateMetadata({ params }:any) {
  const { category_id } = await params;
  const category = await getCategory(category_id);

  return {
    title: category.name,
    openGraph: {
      images: [
        `${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${category?.image}`,
      ],
      description: category.description,
    },
  };
}

const uniqArray = (array: any) => {
  return array
    .map(JSON.stringify)
    .filter(
      (item: any, index: any, arr: any) => arr.indexOf(item, index + 1) === -1
    )
    .map(JSON.parse);
};

export default function Category(props:any) {
  const params = use(props.params) as any;
  const category_id = params.category_id;
  
  const products = use(getProducts(category_id));
  const category = use(getCategory(category_id));

  let attribs: any = [];
  let filterdProd: any = [];

  return (
      <Container>
        <div className="pt-4 md:pt-8">
          <Breadcrumb parent={category?.parent} title={category.name} />
        </div>
        <div className={`flex pt-4 md:pt-8 pb-16 lg:pb-20`}>
          <div className={clsx(`w-full`, attribs.length && "lg:-ms-9")}>
            <SearchTopBar category={category} />
            <ProductGrid
              products={products}
              filterdProd={uniqArray(filterdProd)}
              className=""
            />
          </div>
        </div>
      </Container>
  );
}
