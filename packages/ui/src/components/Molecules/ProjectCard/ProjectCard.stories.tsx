import { ProjectCard } from "./ProjectCard";
import { Meta, StoryFn } from "@storybook/react";

export default {
	title: "Molecules/ProjectCard",
	component: ProjectCard,
	argTypes: {},
} as Meta<typeof ProjectCard>;

const Template: StoryFn<typeof ProjectCard> = (args) => <ProjectCard {...args} />;

export const Default = Template.bind({});
Default.args = {};
