import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "main/pages/HomePage";
import ProfilePage from "main/pages/ProfilePage";
import AdminUsersPage from "main/pages/AdminUsersPage";

import TodosIndexPage from "main/pages/Todos/TodosIndexPage";
import TodosCreatePage from "main/pages/Todos/TodosCreatePage";
import TodosEditPage from "main/pages/Todos/TodosEditPage";

import MenuItemsIndexPage from "main/pages/MenuItems/MenuItemsIndexPage";
import MenuItemsCreatePage from "main/pages/MenuItems/MenuItemsCreatePage";
import MenuItemsEditPage from "main/pages/MenuItems/MenuItemsEditPage";

import OrganizationsIndexPage from "main/pages/Organizations/OrganizationsIndexPage";
import OrganizationsCreatePage from "main/pages/Organizations/OrganizationsCreatePage";
import OrganizationsEditPage from "main/pages/Organizations/OrganizationsEditPage";

import RecommendationsIndexPage from "main/pages/Recommendations/RecommendationsIndexPage";
import RecommendationsCreatePage from "main/pages/Recommendations/RecommendationsCreatePage";
import RecommendationsEditPage from "main/pages/Recommendations/RecommendationsEditPage";

import ReviewsIndexPage from "main/pages/Reviews/ReviewsIndexPage";
import ReviewsCreatePage from "main/pages/Reviews/ReviewsCreatePage";
import ReviewsEditPage from "main/pages/Reviews/ReviewsEditPage";

import HelpRequestsIndexPage from "main/pages/HelpRequests/HelpRequestsIndexPage";
import HelpRequestsCreatePage from "main/pages/HelpRequests/HelpRequestsCreatePage";
import HelpRequestsEditPage from "main/pages/HelpRequests/HelpRequestsEditPage";

import ArticlesIndexPage from "main/pages/Articles/ArticlesIndexPage";
import ArticlesCreatePage from "main/pages/Articles/ArticlesCreatePage";
import ArticlesEditPage from "main/pages/Articles/ArticlesEditPage";

import DiningCommonsIndexPage from "main/pages/DiningCommons/DiningCommonsIndexPage";
import DiningCommonsCreatePage from "main/pages/DiningCommons/DiningCommonsCreatePage";
import DiningCommonsEditPage from "main/pages/DiningCommons/DiningCommonsEditPage";


import UCSBDatesIndexPage from "main/pages/UCSBDates/UCSBDatesIndexPage";
import UCSBDatesCreatePage from "main/pages/UCSBDates/UCSBDatesCreatePage";
import UCSBDatesEditPage from "main/pages/UCSBDates/UCSBDatesEditPage";



import { hasRole, useCurrentUser } from "main/utils/currentUser";

import "bootstrap/dist/css/bootstrap.css";


function App() {

  const { data: currentUser } = useCurrentUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        {
          hasRole(currentUser, "ROLE_ADMIN") && <Route exact path="/admin/users" element={<AdminUsersPage />} />
        }
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/todos/list" element={<TodosIndexPage />} />
              <Route exact path="/todos/create" element={<TodosCreatePage />} />
              <Route exact path="/todos/edit/:todoId" element={<TodosEditPage />} />
            </>
          )
        }
          {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/menuitems/list" element={<MenuItemsIndexPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_ADMIN") && (
            <>
              <Route exact path="/menuitems/create" element={<MenuItemsCreatePage />} />
              <Route exact path="/menuitems/edit/:code" element={<MenuItemsEditPage />} />
            </>
          )
        }
          {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/organizations/list" element={<OrganizationsIndexPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_ADMIN") && (
            <>
              <Route exact path="/organizations/create" element={<OrganizationsCreatePage />} />
              <Route exact path="/organizations/edit/:code" element={<OrganizationsEditPage />} />
            </>
          )
        }
      {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/recommendations/list" element={<RecommendationsIndexPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_ADMIN") && (
            <>
              <Route exact path="/recommendations/create" element={<RecommendationsCreatePage />} />
              <Route exact path="/recommendations/edit/:code" element={<RecommendationsEditPage />} />
            </>
          )
        }
         {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/reviews/list" element={<ReviewsIndexPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_ADMIN") && (
            <>
              <Route exact path="/reviews/create" element={<ReviewsCreatePage />} />
              <Route exact path="/reviews/edit/:code" element={<ReviewsEditPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/helprequests/list" element={<HelpRequestsIndexPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_ADMIN") && (
            <>
              <Route exact path="/helprequests/create" element={<HelpRequestsCreatePage />} />
              <Route exact path="/helprequests/edit/:code" element={<HelpRequestsEditPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/articles/list" element={<ArticlesIndexPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_ADMIN") && (
            <>
              <Route exact path="/articles/create" element={<ArticlesCreatePage />} />
              <Route exact path="/articles/edit/:code" element={<ArticlesEditPage />} />
            </>
          )
        }
        
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/diningCommons/list" element={<DiningCommonsIndexPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_ADMIN") && (
            <>
              <Route exact path="/diningCommons/create" element={<DiningCommonsCreatePage />} />
              <Route exact path="/diningCommons/edit/:code" element={<DiningCommonsEditPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/ucsbdates/list" element={<UCSBDatesIndexPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_ADMIN") && (
            <>
              <Route exact path="/ucsbdates/create" element={<UCSBDatesCreatePage />} />
              <Route exact path="/ucsbdates/edit/:id" element={<UCSBDatesEditPage />} />
            </>
          )
        }

      </Routes>
    </BrowserRouter>
  );
}

export default App;
