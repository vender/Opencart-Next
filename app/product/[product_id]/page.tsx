import { getProduct, relatedProducts } from '#/lib';
import { notFound } from 'next/navigation';
import Container from "#/components/ui/container";
import ProductSingleDetails from "#/components/product/product-single-details";
import RelatedProducts from "#/components/product/related-products";
import Divider from "#/components/ui/divider";
import Breadcrumb from "#/components/layout/breadcrumb";
import { use } from 'react';

export async function generateMetadata({ params }: { params: Promise<{ product_id: number }> }) {
    const {product_id} = await params;
    const product = await getProduct(product_id);

	return {
	  title: product.name,
	  openGraph: {
		images: [`${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${product?.image}`],
		description: product.description,
	  },
	}
}

export default function ProductPage(props:any) {
    const params = use(props.params) as any;
    const product = use(getProduct(params.product_id));
    const related = use(relatedProducts(params.product_id));
    
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
                    <ProductSingleDetails product={product} />
                    <RelatedProducts sectionHeading="Рекомендуемые товары" related={related} />
                </Container>
            </>
        )
    }
}
