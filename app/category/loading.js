import Skeleton from '@mui/material/Skeleton';
import Container from "#/components/ui/container";
import ProductCardLoading from "#/components/layout/loadings/product-card-loading";

export default function Loading() {
    
    return (
      <Container>
          <div className="pt-4 md:pt-8">
            <Skeleton variant="rectangular" />
          </div>
          <div className={`flex pt-4 md:pt-8 pb-16 lg:pb-20`}>  
            <div className="w-full">
              <Skeleton animation="wave" height={40} width="100%" className='mb-7' />
              <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 '>
                <ProductCardLoading />
                <ProductCardLoading />
                <ProductCardLoading />
                <ProductCardLoading />
                <ProductCardLoading />
                <ProductCardLoading />
                <ProductCardLoading />
                <ProductCardLoading />
                <ProductCardLoading />
              </div>
            </div>
          </div>
        </Container>
    )
}