import { Checkmark } from './Checkmark';
import { Meta, StoryFn } from '@storybook/react';

export default {
    title: 'Checkmark',
    component: Checkmark,
    argTypes: {},
} as Meta<typeof Checkmark>;

const Template: StoryFn<typeof Checkmark> = (args) => <Checkmark {...args} />;

export const Default = Template.bind({});
Default.args = {
    success: false,
};
