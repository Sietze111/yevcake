import type { Meta, StoryObj } from "@storybook/react-vite";
import "../../common/i18n";
import { BackToTopButton } from "./BackToTopButton";

const meta = {
	component: BackToTopButton,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	title: "Layout/BackToTopButton",
} satisfies Meta<typeof BackToTopButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const VisibleAfterScroll: Story = {
	render: () => (
		<div style={{ height: "200vh" }}>
			<BackToTopButton />
		</div>
	),
};
