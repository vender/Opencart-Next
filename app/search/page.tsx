import Container from "#/components/ui/container";
import Breadcrumb from "#/components/layout/breadcrumb";
import ProductGrid from "#/components/product/product-grid";
import { use } from "react";
import { searchProduct } from '#/lib';


export default function Page(props:any) {
    const searchParams = use(props.searchParams) as any;
    const search = searchParams.search;
    
    let products = [];
    if(search?.length && search?.length > 2) {
        products = use(searchProduct(search));
    }
    
    return (
        <Container>
            <div className="pt-4 md:pt-8">
            <Breadcrumb parent={0} title="Поиск" />
            </div>
            <div className={`flex pt-4 md:pt-8 pb-16 lg:pb-20`}>
            <div className="w-full">
                <h1 className="text-2xl font-bold text-heading hidden lg:inline-flex pb-1 mb-5">Результаты поиска</h1>
                {products && <ProductGrid products={products} className="" />}
            </div>
            </div>
        </Container>
    )
}
