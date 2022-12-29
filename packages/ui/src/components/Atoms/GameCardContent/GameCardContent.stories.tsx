import { GameCardContent } from './GameCardContent';
import { Meta, StoryFn } from '@storybook/react';

export default {
    title: 'Atoms/GameCardContent',
    component: GameCardContent,
    argTypes: {},
} as Meta<typeof GameCardContent>;

const Template: StoryFn<typeof GameCardContent> = (args) => <GameCardContent {...args} />;

export const Default = Template.bind({});
Default.args = {
    id: '3111',
};
