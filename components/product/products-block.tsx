import React from "react";
import SectionHeader from "#/components/layout/section-header";
import ProductCard from "#/components/product/product-card";

interface ProductsProps {
	sectionHeading: string;
	categorySlug?: string;
	className?: string;
	products?: any[];
	loading: boolean;
	error?: string;
	uniqueKey?: string;
}

export default function ProductsBlock({
	sectionHeading,
	categorySlug,
	className = "mb-9 md:mb-9 lg:mb-10 xl:mb-12",
	products,
	loading,
	error,
	uniqueKey,
}: ProductsProps) {
	return (
		<div className={className}>
			<SectionHeader
				sectionHeading={sectionHeading}
				categorySlug={categorySlug}
			/>

			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-3 md:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8">
				{loading && !products?.length ? (
					<></>
				) : (
					products?.map((product: any) => (
						<ProductCard
							key={`product--key${product.product_id}`}
							product={product}
							imgWidth={340}
							imgHeight={440}
							variant="grid"
						/>
					))
				)}
			</div>
		</div>
	)
}