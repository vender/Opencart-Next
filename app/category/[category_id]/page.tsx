// app/category/[category_id]/page.tsx
import Container from "#/components/ui/container";
import Breadcrumb from "#/components/layout/breadcrumb";
import ProductGrid from "#/components/product/product-grid";
import ShopFilters from "#/components/ui/filters";
import SearchTopBar from "#/components/ui/top-bar";
import clsx from "clsx";
import { getCategory, getProducts } from "#/lib";

const uniqArray = (array: any[]) =>
  [...new Map(array.map((item) => [JSON.stringify(item), item])).values()];

export async function generateMetadata({ params }: { params: Promise<{ category_id: string }> }) {
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

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category_id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { category_id } = await params;
  const search = await searchParams;
  const products = await getProducts(category_id);
  const category = await getCategory(category_id);
  
  const allParams = new Set<string>();
  Object.values(search).forEach((val:any) => {
    val.split(",")
       .filter(Boolean)
       .forEach((v:any) => allParams.add(v));
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
