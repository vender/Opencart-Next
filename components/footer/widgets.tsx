import WidgetLink from "./widget-link";

export default function Widgets({ widgets, data }:any) {
	
  	return (
		<div className="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16">
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-9 xl:gap-5  pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24 lg:mb-0.5 2xl:mb-0 3xl:-mb-1">
				{widgets?.map((widget:any) => (
					<WidgetLink
						key={`footer-widget--key${widget.footer_id}`}
						widget={widget}
						className="pb-3 md:pb-0"
					/>
				))}

			<div className="row">
				<div className="text-xl">
					<div className="mb-1">
						<a href="tel:+79183330100">+7 918 333 01 00</a> <sup>для партнеров</sup><br/>
						<a href="tel:+79262882925">+7 926 288 29 25</a> <sup>розница</sup>
					</div>
					<div className="text-base">
						<a href="mailto:89183330100@mail.ru">89183330100@mail.ru</a>
					</div>
				</div>
				<div className="mt-5 font-light">
					<div className="">353202, Краснодарский край,<br/> ст.Динская, пер.Дружбы, д. 2</div>
					<div className="my-5">График работы:<br/>пн−пт с 9:00 до 19:00</div>
					<div className="">ИП Лебедкик Николай Викторович<br/>ИНН 233001735008<br/>ОГРНИП 304233013500088</div>
				</div>
			</div>
			</div>
		</div>
  	)
}