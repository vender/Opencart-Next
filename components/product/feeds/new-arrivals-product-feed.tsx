import ProductsBlock from "#/components/product/products-block";

export default function NewArrivalsProductFeed({latestProducts}:any) {
	const isLoading = false;
	const error : any = {};

	return (
		<ProductsBlock
			sectionHeading="Свежие поступления"
			products={latestProducts}
			loading={isLoading}
			error={error?.message}
			uniqueKey="new-arrivals"
		/>
	);
}
