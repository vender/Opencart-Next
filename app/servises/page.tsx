import Container from "#/components/ui/container";
import YamapWrapper from "#/components/ui/yamap";
import { getLocations, getInformationPage } from '#/lib';
import Prose from "#/components/prose";

export const metadata = {
	title: 'Сервисные центры',
}

async function page({ params }: { params: any }) {
  const pageInfo = await getInformationPage(8);
  const locations = await getLocations();
  
  return (
    <Container>
      <div className="py-16 lg:py-20 px-0 max-w-5xl mx-auto space-y-4">
        <h1 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-3 xl:mb-5">
          Сервисные центры
        </h1>
        <div>
          <Prose className="overflow-hidden" html={pageInfo.description} />
        </div>
        <div className="py-4">
          <YamapWrapper locations={locations} />
        </div>
      </div>
    </Container>
  );
}

export default page;
