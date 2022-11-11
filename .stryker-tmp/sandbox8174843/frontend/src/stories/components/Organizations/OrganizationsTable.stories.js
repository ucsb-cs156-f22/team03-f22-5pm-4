import React from 'react';

import OrganizationsTable from "main/components/Organizations/OrganizationsTable";
import { organizationsFixtures } from 'fixtures/organizationsFixtures';
//import { currentUserFixtures } from 'fixtures/currentUserFixtures';

export default {
    title: 'components/Organizations/OrganizationsTable',
    component: OrganizationsTable
};

const Template = (args) => {
    return (
        <OrganizationsTable {...args} />
    )
};
//afn[eknFA]
export const Empty = Template.bind({});

Empty.args = {
    organizations: []
};

export const ThreeOrganizations = Template.bind({});

ThreeOrganizations.args = {
    organizations: organizationsFixtures.threeOrganizations
};

// export const ThreeOrganizationsAsAdmin = Template.bind({});

// ThreeOrganizationsAsAdmin.args = {
//     organizations: organizationsFixtures.threeOrganizations,
//     currentUser: currentUserFixtures.adminUser
// };

