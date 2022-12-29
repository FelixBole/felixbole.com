import { <FTName | capitalize> } from "./[FTName]";
import { Meta, StoryFn } from "@storybook/react";

export default {
	title: "[FTName]",
	component: <FTName | capitalize>,
	argTypes: {},
} as Meta<typeof <FTName | capitalize>>;

const Template: StoryFn<typeof <FTName | capitalize>> = (args) => <<FTName | capitalize> {...args} />;

export const Default = Template.bind({});
Default.args = {};
