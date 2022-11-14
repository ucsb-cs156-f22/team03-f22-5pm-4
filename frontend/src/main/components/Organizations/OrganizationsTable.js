import OurTable, {ButtonColumn} from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import {  onDeleteSuccess } from "main/utils/UCSBDateUtils"
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/ucsborganizations",
        method: "DELETE",
        params: {
            code: cell.row.values.code
        }
    }
}

export default function OrganizationsTable({ organizations, currentUser }) {

    const _navigate = useNavigate();

    // const editCallback = (cell) => {
    //     navigate(`/organizations/edit/${cell.row.values.code}`)
    // }

    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/ucsborganizations/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'Organization Code',
            accessor: 'orgCode', 
        },
        {
            Header: 'Short Organization Name',
            accessor: 'orgTranslationShort',
        },
        {
            Header: 'Organization Name',
            accessor: 'orgTranslation',
        },
        {
            Header: 'Inactive?',
            id: 'inactive',
            accessor: (row, _rowIndex) => String(row.inactive)

        }
    ];

    const testid = "OrganizationsTable";

    const columnsIfAdmin = [
        ...columns,
    //     ButtonColumn("Edit", "primary", editCallback, testid),
        ButtonColumn("Delete", "danger", deleteCallback, testid)
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_USER") ? columnsIfAdmin : columns;

    // const columnsToDisplay = columns;

    return <OurTable
        data={organizations}
        columns={columnsToDisplay}
        testid={"OrganizationsTable"}
    />;
};