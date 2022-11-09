// import OurTable, { ButtonColumn } from "main/components/OurTable";
import OurTable from "main/components/OurTable";
// import { useBackendMutation } from "main/utils/useBackend";
// import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/UCSBDateUtils"
// import { useNavigate } from "react-router-dom";
// import { hasRole } from "main/utils/currentUser";

export default function HelpRequestsTable({ helpRequests, _currentUser }) {

    // const navigate = useNavigate();

    // const editCallback = (cell) => {
    //     navigate(`/ucsbdates/edit/${cell.row.values.id}`)
    // }

    // Stryker disable all : hard to test for query caching
    // const deleteMutation = useBackendMutation(
    //     cellToAxiosParamsDelete,
    //     { onSuccess: onDeleteSuccess },
    //     ["/api/ucsbdates/all"]
    // );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    // const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

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

    // const columnsIfAdmin = [
    //     ...columns,
    //     ButtonColumn("Edit", "primary", editCallback, "UCSBDatesTable"),
    //     ButtonColumn("Delete", "danger", deleteCallback, "UCSBDatesTable")
    // ];

    // const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    const columnsToDisplay = columns;

    return <OurTable
        data={helpRequests}
        columns={columnsToDisplay}
        testid={"HelpRequestsTable"}
    />;
};