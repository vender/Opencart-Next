import Container from "#/components/ui/container";
import ContactForm from "#/components/form/contact-form";
import ContactInfoBlock from "#/components/contact-info";
import { siteInfo } from "#/lib";

export const metadata = {
	title: 'Связаться с нами',
}

export default async function page() {
	const siteInfoData = await siteInfo();
  	return (
		<>
			<Container>
				<div className="my-14 lg:my-16 xl:my-20 px-0 pb-2 lg: xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
					<div className="md:w-full lg:w-2/5 2xl:w-2/6 flex flex-col h-full">
						<ContactInfoBlock siteInfo={siteInfoData} />
					</div>
					<div className="md:w-full lg:w-3/5 2xl:w-4/6 flex h-full md:ms-7 flex-col lg:ps-7">
						<div className="flex pb-7 md:pb-9 mt-7 md:-mt-1.5">
							<h4 className="text-2xl 2xl:text-3xl font-bold text-heading">
								Напишите нам
							</h4>
						</div>
						<ContactForm productName="" />
					</div>
				</div>
			</Container>
		</>
  	)
}