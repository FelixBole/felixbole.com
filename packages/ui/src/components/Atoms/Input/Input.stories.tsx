import { Input } from "./Input";
import { Meta, StoryFn } from "@storybook/react";

export default {
	title: "Atoms/Input",
	component: Input,
	argTypes: {},
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
    defaultValue: undefined,
    type: 'text',
    placeholder: undefined,
    max: undefined,
    min: undefined,
    fillSpace: false,
    onchange: () => {},
    onfocus: () => {},
};
