import { fireEvent, render, waitFor } from "@testing-library/react";
// import { render } from "@testing-library/react"
// import {render, waitFore} from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import MenuItemsIndexPage from "main/pages/MenuItems/MenuItemsIndexPage";


import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { menuItemFixtures } from "fixtures/menuItemFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
//import mockConsole from "jest-mock-console";


const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("UCSBDiningCommonsMenuItem tests", () => {

    const axiosMock = new AxiosMockAdapter(axios);

    const testId = "MenuItemTable";

    const setupUserOnly = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    const setupAdminUser = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    test("renders without crashing for regular user", () => {
        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/UCSBDiningCommonsMenuItem/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <DiningCommonsMenuItemsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    test("renders without crashing for admin user", () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/UCSBDiningCommonsMenuItem/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <DiningCommonsMenuItemsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    test("renders three diningCommonMenuItem without crashing for regular user", async () => {
        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/UCSBDiningCommonsMenuItem/all").reply(200, menuItemFixtures.threeMenuItem);
        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <MenuItemsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(  () => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent(1); } );
        expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent(2);
        expect(getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent(3);

    });

    test("renders three diningCommonsMenuItem without crashing for admin user", async () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/UCSBDiningCommonsMenuItem/all").reply(200, menuItemFixtures.threeMenuItem);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <MenuItemsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent(1); });
        expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent(2);
        expect(getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent(3);
        expect(getByTestId(`${testId}-cell-row-0-col-diningCommonsCode`)).toHaveTextContent("ortega");
        expect(getByTestId(`${testId}-cell-row-1-col-diningCommonsCode`)).toHaveTextContent("ortega");
        expect(getByTestId(`${testId}-cell-row-2-col-diningCommonsCode`)).toHaveTextContent("portola");
        expect(getByTestId(`${testId}-cell-row-0-col-name`)).toHaveTextContent("Tofu Banh Mi Sandwich (v)");
        expect(getByTestId(`${testId}-cell-row-1-col-name`)).toHaveTextContent("Chicken Caesar Salad");
        expect(getByTestId(`${testId}-cell-row-2-col-name`)).toHaveTextContent("Cream of Broccoli Soup (v)");
        expect(getByTestId(`${testId}-cell-row-0-col-station`)).toHaveTextContent("Entree Specials");
        expect(getByTestId(`${testId}-cell-row-1-col-station`)).toHaveTextContent("Entrees");
        expect(getByTestId(`${testId}-cell-row-2-col-station`)).toHaveTextContent("Greens & Grains");

    });

    test("renders empty table when backend unavailable, user only", async () => {
        setupUserOnly();

        const queryClient = new QueryClient();
        axiosMock.onGet("/api/UCSBDiningCommonsMenuItem/all").timeout();
        const { queryByTestId, getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <MenuItemsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(3); });

        const expectedHeaders = ['ID',  'Dining Commons Code', 'Dish','Station'];
        expectedHeaders.forEach((headerText) => {
          const header = getByText(headerText);
          expect(header).toBeInTheDocument();
        });


        expect(queryByTestId(`${testId}-cell-row-0-col-id`)).not.toBeInTheDocument();
    });

    
    test("test what happens when you click delete, admin", async () => {
        setupAdminUser();

        const queryClient = new QueryClient();
        axiosMock.onGet("/api/UCSBDiningCommonsMenuItem/all").reply(200, menuItemFixtures.threeMenuItem);
        axiosMock.onDelete("/api/UCSBDiningCommonsMenuItem", {params: {id: 1}}).reply(200, "DiningCommonsMenuItem with id 1 deleted");



        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <MenuItemsIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toBeInTheDocument(); });
        expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent(1); 
        const deleteButton = getByTestId(`${testId}-cell-row-0-col-Delete-button`);
        expect(deleteButton).toBeInTheDocument();
        fireEvent.click(deleteButton);
        await waitFor(() => { expect(mockToast).toBeCalledWith("DiningCommonsMenuItem with id 1 deleted") });


    });

    // test("test what happens when you click edit as an admin", async () => {
    //     setupAdminUser();

    //     const queryClient = new QueryClient();
    //     axiosMock.onGet("/api/UCSBDiningCommonsMenuItem/all").reply(200,menuItemFixtures.threeMenuItem);

    //     const { getByTestId } = render(
    //         <QueryClientProvider client={queryClient}>
    //             <MemoryRouter>
    //                 <MenuItemsIndexPage />
    //             </MemoryRouter>
    //         </QueryClientProvider>
    //     );


    //     await waitFor(() => { expect(getByTestId(`${testId}-cell-row-0-col-id`)).toBeInTheDocument(); });

    //     expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1"); 


    //     const editButton = getByTestId(`${testId}-cell-row-0-col-Edit-button`);
    //     expect(editButton).toBeInTheDocument();
       
    //     fireEvent.click(editButton);


    //     await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/UCSBDiningCommonsMenuItem/edit/1'));

    // });

    

});