import type { HTMLAttributes } from "react";
import { cx } from "./cx";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cx(
				"rounded-2xl border border-[#E6E8EC] bg-[#FFFFFF] shadow-[0_12px_30px_rgba(2,2,3,0.05)]",
				className,
			)}
			{...props}
		/>
	);
}

export default Card;
