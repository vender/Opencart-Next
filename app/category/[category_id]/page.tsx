import Container from "#/components/ui/container";
import Breadcrumb from "#/components/layout/breadcrumb";
import ProductGrid from "#/components/product/product-grid";
import { getCategory, getProducts } from "#/lib";
import ShopFilters from "#/components/ui/filters";
import SearchTopBar from "#/components/ui/top-bar";
import clsx from "clsx";

type Props = {
  params: { id: string; category_id: number };
};

export async function generateMetadata({ params }: Props) {
  const category = await getCategory(params.category_id);

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

export default async function Category({ params, searchParams }: any) {
  const products = await getProducts(params.category_id);
  const category = await getCategory(params.category_id);

  let attribs: any = [];
  let attribute_groups: any = [];
  let allParams: any = [];
  let filterdProd: any = [];

  Object.entries(searchParams).forEach((value: any, key: any) => {
    value[1]
      .split(",")
      .filter((e: any) => e)
      .map((i: any) => {
        allParams.push([i]);
      });
  });

  // products &&
  //   products.map((item: any) => {
  //     item.attributes?.map((i: any) => {
  //       if(i.status == 1) {
  //         i.attribute.map((i: any) => {
  //           // if (!removeAttrib.find((ra) => i.attribute_id == ra)) {
  //             attribute_groups.push([i.attribute_id, i.name]);
  //           // }
  //         });
  //       }
  //     });
  //   });

  // products.map((prod: any) => {
  //   prod.attributes?.map((group: any) => {
  //     group.attribute.map((attr: any) => {
  //       // if (!removeAttrib.includes(Number(attr.attribute_id))) {
  //         if (attr.text && attr.status != 0) {
  //           attribs.push(attr);
            
  //           allParams.map((param: any) => {
  //             if (attr.text == param[0]) {
  //               filterdProd.push(prod.product_id);
  //             }
  //           });
  //         }
  //       // }
  //     });
  //   });
  // });

  return (
      <Container>
        <div className="pt-4 md:pt-8">
          <Breadcrumb parent={category?.parent} title={category.name} />
        </div>
        <div className={`flex pt-4 md:pt-8 pb-16 lg:pb-20`}>
          {attribs.length ? (
            <div className="flex-shrink-0 pe-24 hidden lg:block w-96">
              <ShopFilters
                attribute_groups={uniqArray(attribute_groups)}
                attribs={uniqArray(attribs)}
              />
            </div>
          ) : null}

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
