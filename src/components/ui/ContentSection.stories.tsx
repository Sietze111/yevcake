import type { Meta, StoryObj } from "@storybook/react-vite";
import { ContentSection } from "./ContentSection";
import { SectionHeading } from "./SectionHeading";

const meta = {
	component: ContentSection,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	title: "UI/ContentSection",
} satisfies Meta<typeof ContentSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		background: "bg-nb-cream",
		children: <SectionHeading tag="Example" title="A section with content" />,
		id: "example-default",
	},
};

export const BlueBackground: Story = {
	args: {
		background: "bg-nb-blue",
		children: (
			<div className="border border-nb-line bg-nb-white p-6 shadow-[0_12px_26px_rgba(61,43,31,0.14)]">
				<p className="font-mono text-sm font-bold uppercase">
					Card inside a blue section
				</p>
			</div>
		),
		id: "example-blue",
	},
};
