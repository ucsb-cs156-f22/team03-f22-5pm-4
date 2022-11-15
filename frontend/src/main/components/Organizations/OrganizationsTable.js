import OurTable, {ButtonColumn} from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/OrganizationsUtils"
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";


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

    // Stryker disable next-line all
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

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    // const columnsToDisplay = columns;

    return <OurTable
        data={organizations}
        columns={columnsToDisplay}
        testid={"OrganizationsTable"}
    />;
};