import Container from "#/components/ui/container";
import { getInformationPage } from "#/lib";
import Prose from "#/components/prose";

export async function generateMetadata({ params }:any) {
  const { id } = await params;
  const pageInfo = await getInformationPage(id);

  return {
    title: pageInfo.title,
    openGraph: {
      description: pageInfo.title,
    },
  };
}

async function page({ params }:any) {
  const { id } = await params;
  const pageInfo = await getInformationPage(id);
  
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
