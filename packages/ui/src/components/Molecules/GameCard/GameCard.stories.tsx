import { GameCard } from './GameCard';
import { Meta, StoryFn } from '@storybook/react';

export default {
    title: 'Molecules/GameCard',
    component: GameCard,
    argTypes: {},
} as Meta<typeof GameCard>;

const Template: StoryFn<typeof GameCard> = (args) => <GameCard {...args} />;

export const Default = Template.bind({});
Default.args = {
    id: '1123',
    onclick: (e, s, id) => console.log({ e, s, id })
};
