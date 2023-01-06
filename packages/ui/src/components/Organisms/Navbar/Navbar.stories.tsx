import { Navbar } from "./Navbar";
import { Meta, StoryFn } from "@storybook/react";
import { NavItem } from "../../Atoms/NavItem/NavItem";

export default {
	title: "Organisms/Navbar",
	component: Navbar,
	argTypes: {},
} as Meta<typeof Navbar>;

const Template: StoryFn<typeof Navbar> = (args) => <Navbar {...args} />;

export const Default = Template.bind({});
Default.args = {
    navItems: [
		{
			icon: 'home'
		},
		{
			icon: 'games',
		},
		{
			icon: 'music',
		},
		{
			icon: 'projects',
		},
	],
};
