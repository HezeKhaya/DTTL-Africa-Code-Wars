import { Link, type LinkProps } from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";

export function ExternalLink({
	children,
	...rest
}: Omit<LinkProps, "target" | "rel">) {
	return (
		<Link {...rest} target="_blank" rel="noopener noreferrer">
			{children}
			<LuExternalLink />
		</Link>
	);
}
