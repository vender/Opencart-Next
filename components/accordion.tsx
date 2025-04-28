import React, { useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { heightCollapse } from "#/components/ui/motion/height-collapse";
import Prose from "#/components/prose";
import Attriblist from "#/components/ui/attrib-list";

type CollapseProps = {
	i: number;
	titleKey?: string;
	type?: string;
	title?: string;
	content?: any;
	contentKey?: any;
	expanded: number;
	setExpanded: any;
	variant?: "gray" | "transparent";
};

export function Collapse({
	i,
	expanded,
	type,
	setExpanded,
	titleKey,
	title,
	content,
	contentKey,
	variant = "gray",
}: CollapseProps) {
	const isOpen = i === expanded;
	
	return (
		<div
			className={clsx({
				"rounded-md bg-gray-200": variant === "gray",
				"shadow-sm": isOpen,
			})}
		>
			<motion.header
				initial={false}
				onClick={() => setExpanded(isOpen ? false : i)}
				className={clsx(
					"cursor-pointer flex items-center justify-between transition-colors py-5 md:py-6",
					{
						"px-6 md:px-8 lg:px-10": variant === "gray",
						"border-t border-gray-300": variant === "transparent",
					}
				)}
			>
				<h2
					className={clsx(
						"text-sm font-semibold leading-relaxed text-heading pe-2",
						{
							"md:text-base": variant === "gray",
							"md:text-base lg:text-lg": variant === "transparent",
						}
					)}
				>
					{titleKey ? titleKey : title}
				</h2>
				<div className="flex-shrink-0 relative w-4 h-4 flex justify-center items-center">
					<div className="w-full h-0.5 bg-heading rounded-sm" />
					<div
						className={`origin-bottom transform w-0.5 h-full bg-heading rounded-sm absolute bottom-0 transition-transform duration-500 ease-in-out ${isOpen ? "scale-0" : "scale-100"
							}`}
					/>
				</div>
			</motion.header>
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						key="content"
						initial="from"
						animate="to"
						exit="from"
						variants={heightCollapse()}
					>
						<div
							className={clsx("pb-6 md:pb-7 leading-7 text-sm text-gray-600", {
								"pt-5 border-t border-gray-300 px-6 md:px-8 lg:px-10":
									variant === "gray",
							})}
						>
							{content && type == 'attrib' ?
								<Attriblist content={content} /> :
								(content && type == 'description' ? <Prose className="product-description" html={content} /> : content)
							}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

type AccordionProps = {
	translatorNS: string;
	items: {
		titleKey?: string;
		title?: string;
		contentKey?: string;
		content?: string;
	}[];
	variant?: "gray" | "transparent";
};

const Accordion: React.FC<AccordionProps> = ({
	items,
	variant = "gray",
}) => {
	const [expanded, setExpanded] = useState<number>(0);

	return (
		<>
			{items?.map((item, index) => (
				<Collapse
					i={index}
					key={item.titleKey}
					titleKey={item.titleKey}
					contentKey={item.contentKey}
					expanded={expanded}
					setExpanded={setExpanded}
					variant={variant}
				/>
			))}
		</>
	);
};

export default Accordion;
