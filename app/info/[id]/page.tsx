import Container from "#/components/ui/container";
import { getInformationPage } from "#/lib";
import Prose from "#/components/prose";
import { use } from 'react'

export async function generateMetadata(props:any) {
  const params = use(props.params) as any;
  const pageInfo = await getInformationPage(params.id);

  return {
    title: pageInfo.title,
    openGraph: {
      description: pageInfo.title,
    },
  };
}

async function page(props:any) {
  const params = use(props.params) as any;
  const pageInfo = await getInformationPage(params.id);
  // const description = product?.description.replace(/(<([^>]+)>)|(&lt;...|gt;)|&/gi, "");
  return (
    <Container>
      <div className="py-16 lg:py-20 px-0 max-w-5xl mx-auto space-y-4">
        <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-3 xl:mb-5">
          {pageInfo.title}
        </h2>
        <div className="py-4">
          {/* {pageInfo.description} */}
          <Prose className="overflow-hidden" html={pageInfo.description} />
        </div>
      </div>
    </Container>
  );
}

export default page;
