import type { ButtonHTMLAttributes } from "react";
import { cx } from "./cx";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
	primary:
		"bg-[#FACB06] text-[#0A2C59] border border-[#FACB06] hover:bg-[#C8A205] hover:border-[#C8A205] focus-visible:ring-[#FACB06]/60",
	secondary:
		"bg-transparent text-[#0A2C59] border border-[#0A2C59] hover:bg-[#0A2C59] hover:text-[#FFFFFF] focus-visible:ring-[#0A2C59]/40",
	ghost:
		"bg-transparent text-[#0A2C59] border border-transparent hover:bg-[#0A2C59]/10 focus-visible:ring-[#0A2C59]/40",
};

const sizeClasses: Record<ButtonSize, string> = {
	sm: "h-9 px-3 text-sm",
	md: "h-11 px-5 text-sm",
	lg: "h-12 px-6 text-base",
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: ButtonVariant;
	size?: ButtonSize;
};

export function Button({ className, variant = "primary", size = "md", type = "button", ...props }: ButtonProps) {
	return (
		<button
			type={type}
			className={cx(
				"inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
				variantClasses[variant],
				sizeClasses[size],
				className,
			)}
			{...props}
		/>
	);
}

export default Button;
