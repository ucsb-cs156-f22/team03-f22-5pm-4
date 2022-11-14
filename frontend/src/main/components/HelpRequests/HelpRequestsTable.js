import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { onDeleteSuccess, cellToAxiosParamsDelete } from "main/utils/HelpRequestsUtils"
// import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";



export default function HelpRequestsTable({ helpRequests, currentUser }) {

    // const navigate = useNavigate();

    // const editCallback = (cell) => {
    //     navigate(`/HelpRequests/edit/${cell.row.values.id}`)
    // }

    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/HelpRequest/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'Explanation',
            accessor: 'explanation', // accessor is the "key" in the data
        },
        {
            Header: 'Id',
            accessor: 'id',
        },
        {
            Header: 'Request Time',
            accessor: 'requestTime',
        },
        {
            Header: 'Requester\'s Email',
            accessor: 'requesterEmail',
        },
        {
            Header: 'Solved?',
            id: 'solved',
            accessor: (row, _rowIndex) => String(row.solved) 
        },
        {
            Header: 'Table or BreakoutRoom Number',
            accessor: 'tableOrBreakoutRoom',
        },
        {
            Header: 'Team Id',
            accessor: 'teamId',
        }
    ];

    const testid = "HelpRequestsTable"

    const columnsIfAdmin = [
        ...columns,
        // ButtonColumn("Edit", "primary", editCallback, "UCSBDatesTable"),
        ButtonColumn("Delete", "danger", deleteCallback, testid)
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={helpRequests}
        columns={columnsToDisplay}
        testid={testid}
    />;
};