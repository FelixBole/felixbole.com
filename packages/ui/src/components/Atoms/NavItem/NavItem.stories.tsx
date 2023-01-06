import { NavItem } from "./NavItem";
import { Meta, StoryFn } from "@storybook/react";

export default {
	title: "Atoms/NavItem",
	component: NavItem,
	argTypes: {},
} as Meta<typeof NavItem>;

const Template: StoryFn<typeof NavItem> = (args) => <NavItem {...args} />;

export const Default = Template.bind({});
Default.args = {
	icon: 'home',
	textPosition: 'BOTTOM',
	children: 'Home',
	fill: 'white',
	color: 'white',
	stroke: 'white',
};
