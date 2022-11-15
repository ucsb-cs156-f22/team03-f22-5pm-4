import React from 'react';

import MenuItemTable from "main/components/MenuItems/MenuItemTable";
import { menuItemFixtures } from 'fixtures/menuItemFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/MenuItems/MenuItemsTable',
    component: MenuItemTable
};

const Template = (args) => {
    return (
        <MenuItemTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    menuItem: []
};

export const threeMenuItem = Template.bind({});

ThreeDates.args = {
    menuItem: menuItemFixtures.threeMenuItem
};

export const ThreeMenuItemAsAdmin = Template.bind({});

ThreeMenuItemsAsAdmin.args = {
    menuItem: menuItemFixtures.threeMenuItem,
    currentUser: currentUserFixtures.adminUser
};