import type { InputHTMLAttributes } from "react";
import { cx } from "./cx";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			className={cx(
				"h-11 w-full rounded-xl border border-[#E6E8EC] bg-[#FFFFFF] px-3 text-sm text-[#020203] placeholder:text-[#6C7676] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2C59]/35",
				className,
			)}
			{...props}
		/>
	);
}

export default Input;
