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
			<div className="border-3 border-nb-black bg-nb-white p-6 shadow-[6px_6px_0px_0px_#0D0D0D]">
				<p className="font-mono text-sm font-bold uppercase">
					Card inside a blue section
				</p>
			</div>
		),
		id: "example-blue",
	},
};
