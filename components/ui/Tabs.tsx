import React from "react";
import { cx } from "./cx";

export type TabOption<T extends string> = {
	id: T;
	label: string;
	icon?: React.ReactNode;
};

type TabsProps<T extends string> = {
	tabs: Array<TabOption<T>>;
	active: T;
	onChange: (id: T) => void;
	className?: string;
};

export function Tabs<T extends string>({ tabs, active, onChange, className }: TabsProps<T>) {
	return (
		<div
			className={cx("flex w-full gap-1 rounded-2xl border border-[#E6E8EC] bg-[#F7F9FC] p-1.5", className)}
			role="tablist"
			aria-label="Student life categories"
		>
			{tabs.map((tab) => {
				const isActive = tab.id === active;
				return (
					<button
						key={tab.id}
						type="button"
						role="tab"
						aria-selected={isActive}
						aria-controls={`panel-${tab.id}`}
						id={`tab-${tab.id}`}
						onClick={() => onChange(tab.id)}
						className={cx(
							"flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2C59]/40",
							isActive
								? "bg-[#0A2C59] text-white shadow-[0_2px_10px_rgba(10,44,89,0.25)]"
								: "text-[#0A2C59]/60 hover:bg-white hover:text-[#0A2C59] hover:shadow-sm",
						)}
					>
						{tab.icon && <span className="shrink-0 opacity-80">{tab.icon}</span>}
						{tab.label}
					</button>
				);
			})}
		</div>
	);
}

export default Tabs;
