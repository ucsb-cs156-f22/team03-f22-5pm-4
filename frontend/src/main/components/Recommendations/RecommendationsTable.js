import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/RecommendationUtils"
import { _useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export default function RecommendationsTable({ recommendations, currentUser }) {

    // const navigate = useNavigate();

    // const editCallback = (cell) => {
    //     navigate(`/recommendations/edit/${cell.row.values.code}`)
    // }

    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/Recommendation/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'id',
            accessor: 'id', 
        },
        {
            Header: 'Requester Email',
            accessor: 'requesterEmail',
        },
        {
            Header: 'Professor Email',
            accessor: 'professorEmail',
        },
        {
            Header: 'Explanation',
            accessor: 'explanation',
        },
        {
            Header: 'Date Requested',
            accessor: 'dateRequested',
        },
        {
            Header: 'Date Needed',
            accessor: 'dateNeeded',
        },
        {
            Header: 'Done',
            id: 'done',
            accessor: (row, _rowIndex) => String(row.isDone)
        } 
    ];

    const columnsIfAdmin = [
        ...columns,
        // ButtonColumn("Edit", "primary", editCallback, RecommendationsTable),
        ButtonColumn("Delete", "danger", deleteCallback, RecommendationsTable)
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={recommendations}
        columns={columnsToDisplay}
        testid={"RecommendationsTable"}
    />;
};