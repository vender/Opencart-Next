
export default function CheckoutCardFooterItem({ item }) {
  return (
		<div className="flex items-center py-4 lg:py-5 border-b border-gray-300 text-sm lg:px-3 w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0">
			{item.title}
			<span className="ms-auto flex-shrink-0">{item.value}</span>
		</div>
  )
}