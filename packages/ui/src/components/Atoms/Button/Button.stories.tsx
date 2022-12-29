import { Button } from './Button';
import { Meta, StoryFn } from '@storybook/react';

export default {
    title: 'Atoms/Button',
    component: Button,
    argTypes: {},
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Stay Fresh!',
};
