import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import MenuItemForm from "main/components/MenuItems/MenuItemsForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function MenuItemsCreatePage() {

  const objectToAxiosParams = (MenuItem) => ({
    url: "/api/UCSBDiningCommonsMenuItem/post",
    method: "POST",
    params: {
      id:MenuItem.id,
      diningCommonsCode: MenuItem.diningCommonsCode,
      name: MenuItem.name,
      station: MenuItem.station,
    }
  });

  const onSuccess = (MenuItem) => {
    toast(`New Dining Commons Menu Item Created - id: ${MenuItem.id} name: ${MenuItem.name}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    ["/api/UCSBDiningCommonsMenuItem/all"]
  );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess) {
    return <Navigate to="/UCSBDiningCommonsMenuItem/list" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New Dining Commons Menu Item</h1>

        <MenuItemForm submitAction={onSubmit} />

      </div>
    </BasicLayout>
  )
}