// app/category/[category_id]/page.tsx
import Container from "#/components/ui/container";
import Breadcrumb from "#/components/layout/breadcrumb";
import ProductGrid from "#/components/product/product-grid";
import ShopFilters from "#/components/ui/filters";
import SearchTopBar from "#/components/ui/top-bar";
import clsx from "clsx";
import { getCategory, getProducts } from "#/lib";

type Params = {
  category_id: string;
};

type SearchParams = {
  [key: string]: string; // filters like color=red,blue
};

const uniqArray = (array: any[]) =>
  [...new Map(array.map((item) => [JSON.stringify(item), item])).values()];

export async function generateMetadata({ params }: { params: Params }) {
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

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const products = await getProducts(params.category_id);
  const category = await getCategory(params.category_id);
  
  const allParams = new Set<string>();
  Object.values(searchParams).forEach((val) => {
    val
      .split(",")
      .filter(Boolean)
      .forEach((v) => allParams.add(v));
  });

  const attribs: any[] = [];
  const attribute_groups: any[] = [];
  const filteredProd = new Set<number>();

  products?.forEach((product: any) => {
    product.attributes?.forEach((group: any) => {
      if (group.status != '1') return;

      group.attribute?.forEach((attr: any) => {
        if (!attr.text || attr.status === 0) return;

        attribs.push(attr);
        attribute_groups.push([attr.attribute_id, attr.name]);

        if (allParams.has(attr.text)) {
          filteredProd.add(product.product_id);
        }
      });
    });
  });

  console.log('Пример продукта:', products?.[0]);

  // console.log(category);

  return (
    <Container>
      <div className="pt-4 md:pt-8">
        <Breadcrumb parent={category?.parent} title={category.name} />
      </div>
      <div className="flex pt-4 md:pt-8 pb-16 lg:pb-20">
        {attribs.length > 0 && (
          <div className="flex-shrink-0 pe-24 hidden lg:block w-96">
            <ShopFilters
              attribute_groups={uniqArray(attribute_groups)}
              attribs={uniqArray(attribs)}
            />
          </div>
        )}

        <div className={clsx("w-full", attribs.length && "lg:-ms-9")}>
          <SearchTopBar category={category} />
          <ProductGrid
            products={products}
            filterdProd={uniqArray(Array.from(filteredProd))}
          />
        </div>
      </div>
    </Container>
  );
}
