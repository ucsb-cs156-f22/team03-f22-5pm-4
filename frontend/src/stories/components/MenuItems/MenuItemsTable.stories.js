import React from 'react';

import MenuItemTable from "main/components/MenuItems/MenuItemTable";
import { MenuItemFixtures } from 'fixtures/menuItemFixtures';
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

export const ThreeDates = Template.bind({});

ThreeDates.args = {
    menuItem: menuItemFixtures.threeMenuItem
};

export const ThreeDatesAsAdmin = Template.bind({});

ThreeDatesAsAdmin.args = {
    menuItem: menuItemFixtures.threeMenuItem,
    currentUser: currentUserFixtures.adminUser
};