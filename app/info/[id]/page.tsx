import Container from "#/components/ui/container";
import { getInformationPage } from "#/lib";
import parse from "html-react-parser";
import { use } from 'react'


export async function generateMetadata({ params, searchParams }: any) {
  const pageInfo = await getInformationPage(params.id);

  return {
    title: pageInfo.title,
    openGraph: {
      description: pageInfo.title,
    },
  };
}

export default function Page(props:any) {
  const params = use(props.params) as any;
  const pageInfo = use(getInformationPage(params.id));
  const description:any = parse(pageInfo.description);
  return (
    <Container>
      <div className="py-16 lg:py-20 px-0 max-w-5xl mx-auto space-y-4">
        <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-3 xl:mb-5">
          {pageInfo.title}
        </h2>
        <div className="py-4">
          <div className="overflow-hidden">{parse(description)}</div>
        </div>
      </div>
    </Container>
  );
}
