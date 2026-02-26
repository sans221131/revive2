"use client";

import { useState } from "react";
import { cx } from "./cx";

export type AccordionItem = {
	id: string;
	question: string;
	answer: string;
};

type AccordionProps = {
	items: AccordionItem[];
	defaultOpenId?: string;
	className?: string;
};

export function Accordion({ items, defaultOpenId, className }: AccordionProps) {
	const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

	return (
		<div className={cx("divide-y divide-[#E6E8EC]", className)}>
			{items.map((item) => {
				const isOpen = item.id === openId;
				return (
					<div key={item.id} className="group">
						<h3>
							<button
								type="button"
								onClick={() => setOpenId(isOpen ? null : item.id)}
								className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2C59]/40"
								aria-expanded={isOpen}
								aria-controls={`accordion-${item.id}`}
								id={`accordion-trigger-${item.id}`}
							>
								<span
									className={cx(
										"text-[15px] font-semibold leading-snug transition-colors duration-200",
										isOpen ? "text-[#0A2C59]" : "text-[#0A2C59]/80 group-hover:text-[#0A2C59]",
									)}
								>
									{item.question}
								</span>
								<span
									className={cx(
										"flex h-6 w-6 shrink-0 items-center justify-center text-xl font-light leading-none transition-all duration-300",
										isOpen ? "rotate-45 text-[#FACB06]" : "rotate-0 text-[#0A2C59]/30 group-hover:text-[#0A2C59]/60",
									)}
									aria-hidden="true"
								>
									+
								</span>
							</button>
						</h3>
						<div
							id={`accordion-${item.id}`}
							role="region"
							aria-labelledby={`accordion-trigger-${item.id}`}
							className={cx(
								"grid transition-all duration-300 ease-out",
								isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
							)}
						>
							<div className="overflow-hidden">
								<p className="pb-5 pr-10 text-[14px] leading-relaxed text-[#6C7676]">{item.answer}</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Accordion;
