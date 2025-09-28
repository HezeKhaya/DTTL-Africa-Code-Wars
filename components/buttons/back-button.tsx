"use client";

import type { ButtonProps } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import type { ReactElement } from "react";
import React from "react";

export function BackButton({
	children,
}: {
	children: ReactElement<ButtonProps>;
}) {
	const router = useRouter();

	return React.cloneElement(children, {
		onClick: router.back,
	});
}
