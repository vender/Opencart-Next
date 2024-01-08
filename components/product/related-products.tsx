import SectionHeader from "#/components/layout/section-header";
import ProductCard from "#/components/product/product-card";

interface ProductsProps {
	sectionHeading: string;
	related: any;
	className?: string;
}

const RelatedProducts: React.FC<ProductsProps> = ({
	sectionHeading,
	related,
	className = "mb-9 lg:mb-10 xl:mb-14",
}) => {
	
	return (
		related.length ? 
			<div className={className}>
				<SectionHeader sectionHeading={sectionHeading} /> 
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-3 md:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8">
					{related && related?.map((product: any) => (
							<ProductCard
								key={`product--key${product.id}`}
								product={product}
								imgWidth={340}
								imgHeight={440}
								variant="grid"
							/>
					))}
				</div>
			</div>
		: null
	);
};

export default RelatedProducts;
