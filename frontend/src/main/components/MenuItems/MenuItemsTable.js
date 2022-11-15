import OurTable, { ButtonColumn} from "main/components/OurTable";
 import { useBackendMutation } from "main/utils/useBackend";
 import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/MenuItemUtils"
 import { useNavigate } from "react-router-dom";
 import { hasRole } from "main/utils/currentUser";

export default function MenuItemsTable({ menuItems, currentUser }) {

    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/UCSBDiningCommonsMenuItem/edit/${cell.row.values.id}`)
    }

    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/UCSBDiningCommonsMenuItem/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
       
        {
            Header: 'Dining Commons Code',
            accessor: 'diningCommonsCode', 
        },
        {
            Header: 'ID',
            accessor: 'id',
        },
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Station',
            accessor: 'station',
        }
    ];

     const columnsIfAdmin = [
        ...columns,
         ButtonColumn("Edit", "primary", editCallback, "MenuItemsTable"),
         ButtonColumn("Delete", "danger", deleteCallback, "MenuItemsTable")
     ];
    
    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;
   
    //const columnsToDisplay = columns;

    return <OurTable
        data={menuItems}
        columns={columnsToDisplay}
        testid={"MenuItemsTable"}
    />;
};