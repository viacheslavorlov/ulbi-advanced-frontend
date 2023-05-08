import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/app/providers/TemeProvider';
import { ThemeDecorator } from '@/shared/config/themeDecorator/themeDecorator';
import AdminPanelPage from './AdminPanelPage';

export default {
    title: 'shared/AdminPanelPage',
    component: AdminPanelPage,
    argTypes: {
        background: { control: 'background' },
    },
} as ComponentMeta<typeof AdminPanelPage>;

const Template: ComponentStory<typeof AdminPanelPage> = (args) => <AdminPanelPage {...args} />;

export const LightAdminPanelPage = Template.bind({});
LightAdminPanelPage.args = {};

export const DarkAdminPanelPage = Template.bind({});
DarkAdminPanelPage.args = {};
DarkAdminPanelPage.decorators = [ThemeDecorator(Theme.DARK)];
