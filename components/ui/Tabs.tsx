import { cx } from "./cx";

export type TabOption<T extends string> = {
	id: T;
	label: string;
};

type TabsProps<T extends string> = {
	tabs: Array<TabOption<T>>;
	active: T;
	onChange: (id: T) => void;
	className?: string;
};

export function Tabs<T extends string>({ tabs, active, onChange, className }: TabsProps<T>) {
	return (
		<div className={cx("inline-flex w-full flex-wrap gap-2", className)} role="tablist" aria-label="Student life categories">
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
							"rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2C59]/40",
							isActive
								? "border-[#0A2C59] bg-[#0A2C59] text-[#FFFFFF]"
								: "border-[#E6E8EC] bg-[#FFFFFF] text-[#0A2C59] hover:bg-[#F7F7F7]",
						)}
					>
						{tab.label}
					</button>
				);
			})}
		</div>
	);
}

export default Tabs;
