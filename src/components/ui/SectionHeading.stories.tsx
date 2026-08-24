import type { Meta, StoryObj } from "@storybook/react-vite";
import { SectionHeading } from "./SectionHeading";

const meta = {
	component: SectionHeading,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	title: "UI/SectionHeading",
} satisfies Meta<typeof SectionHeading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		tag: "Our Creations",
		title: "Browse the gallery",
	},
};

export const DarkTag: Story = {
	args: {
		tag: "Pricing Guide",
		tagClassName: "bg-nb-black text-nb-yellow",
		title: "Average pricing estimates",
	},
};

export const LongTitle: Story = {
	args: {
		tag: "FAQ",
		title: "Important info about orders, logistics, and ingredients",
	},
};
