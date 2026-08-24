import {
	useEffect,
	useRef,
	useState,
	type ReactNode,
} from "react";
import type { FunctionComponent } from "../../common/types";

interface RevealProps {
	children: ReactNode;
	className?: string;
	delay?: number;
}

export const Reveal = ({
	children,
	className = "",
	delay = 0,
}: RevealProps): FunctionComponent => {
	const elementRef = useRef<HTMLDivElement | null>(null);
	const [isVisible, setIsVisible] = useState<boolean>(
		() => typeof IntersectionObserver === "undefined"
	);

	useEffect((): (() => void) => {
		const element = elementRef.current;
		if (!element) return (): void => {};
		if (typeof IntersectionObserver === "undefined") {
			return (): void => {};
		}

		const observer = new IntersectionObserver(
			(entries: Array<IntersectionObserverEntry>): void => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setIsVisible(true);
						observer.disconnect();
					}
				}
			},
			{ rootMargin: "0px 0px -40px 0px", threshold: 0.1 }
		);
		observer.observe(element);
		return (): void => {
			observer.disconnect();
		};
	}, []);

	return (
		<div
			ref={elementRef}
			style={{ transitionDelay: `${String(delay)}ms` }}
			className={`transition-all duration-700 ease-out ${
				isVisible
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-10"
			} ${className}`}
		>
			{children}
		</div>
	);
};
