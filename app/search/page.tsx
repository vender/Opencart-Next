import Container from "#/components/ui/container";
import Breadcrumb from "#/components/layout/breadcrumb";
import ProductGrid from "#/components/product/product-grid";
import { searchProduct } from '#/lib';
import { use } from "react";

export default function page(props:any) {
    const searchParams = use(props.searchParams) as any;

    let products = []
    if(searchParams?.search?.length && searchParams?.search?.length > 2) {
        products = use(searchProduct(searchParams.search));
    }
    
    return (
        <Container>
            <div className="pt-4 md:pt-8">
            <Breadcrumb parent={0} title="Поиск" />
            </div>
            <div className={`flex pt-4 md:pt-8 pb-16 lg:pb-20`}>
            <div className="w-full">
                <h1 className="text-2xl font-bold text-heading hidden lg:inline-flex pb-1 mb-5">Результаты поиска</h1>
                <ProductGrid products={products} className="" />
            </div>
            </div>
        </Container>
    )
}
