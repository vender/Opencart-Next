import { getProduct, relatedProducts, loggedIn, reviews, availableOptions, getProductColors } from '#/lib';
import { notFound } from 'next/navigation';
import Container from "#/components/ui/container";
import ProductSingleDetails from "#/components/product/product-single-details";
import RelatedProducts from "#/components/product/related-products";
import Divider from "#/components/ui/divider";
import Breadcrumb from "#/components/layout/breadcrumb";


export async function generateMetadata({ params }:any) {
    const { product_id } = await params
    const product = await getProduct(product_id);

	return {
	  title: product.name,
	  openGraph: {
		images: [`${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${product?.image}`],
		description: product.description,
	  },
	}
}

export default async function ProductPage({ params }:any) {
    const { product_id } = await params;
    const product = await getProduct(product_id);
    const related = await relatedProducts(product_id);
    const isLogedIn = await loggedIn();
	const prodReviews = await reviews(product.product_id);
    const Colors = await getProductColors(product.sku, product.upc);
	const Options = await availableOptions(product.product_id);
    
    if(!product.product_id) {
        notFound();
    } else {
        return (
            <>
                <Divider className="mb-0" />
                <Container>
                    <div className="pt-8">
                        <Breadcrumb parent={product.categories[0]} title={false}/>
                    </div>
                    <ProductSingleDetails product={product} isLogedIn={isLogedIn} prodReviews={prodReviews} Options={Options} colors={Colors} />
                    <RelatedProducts sectionHeading="Рекомендуемые товары" related={related} />
                </Container>
            </>
        )
    }
}
