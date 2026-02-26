"use client";

import { createContext, useContext, useState } from "react";

type EnquireModalContextValue = {
	open: boolean;
	openModal: () => void;
	closeModal: () => void;
};

const EnquireModalContext = createContext<EnquireModalContextValue | null>(null);

export function EnquireModalProvider({ children }: { children: React.ReactNode }) {
	const [open, setOpen] = useState(false);

	return (
		<EnquireModalContext.Provider
			value={{
				open,
				openModal: () => setOpen(true),
				closeModal: () => setOpen(false),
			}}
		>
			{children}
		</EnquireModalContext.Provider>
	);
}

export function useEnquireModal() {
	const ctx = useContext(EnquireModalContext);
	if (!ctx) throw new Error("useEnquireModal must be used inside EnquireModalProvider");
	return ctx;
}
