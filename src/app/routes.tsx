import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ClientHomePage } from "./pages/client/ClientHomePage";
import { ClientAIPage } from "./pages/client/ClientAIPage";
import { ClientProfessionalsPage } from "./pages/client/ClientProfessionalsPage";
import { ChatPage } from "./pages/ChatPage";
import { ConsultantHomePage } from "./pages/consultant/ConsultantHomePage";
import { ConsultantProfilePage } from "./pages/consultant/ConsultantProfilePage";
import { ConsultantRequestsPage } from "./pages/consultant/ConsultantRequestsPage";
import { AdminHomePage } from "./pages/admin/AdminHomePage";
import { AdminVerifyPage } from "./pages/admin/AdminVerifyPage";
import { AdminManageUsersPage } from "./pages/admin/AdminManageUsersPage";
import { AdminAIDictionaryPage } from "./pages/admin/AdminAIDictionaryPage";
import { ThankYouPage } from "./pages/ThankYouPage";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/thank-you",
    Component: ThankYouPage,
  },
  {
    path: "/client/home",
    Component: ClientHomePage,
  },
  {
    path: "/client/ai-assistant",
    Component: ClientAIPage,
  },
  {
    path: "/client/professionals",
    Component: ClientProfessionalsPage,
  },
  {
    path: "/chat/:consultantId",
    Component: ChatPage,
  },
  {
    path: "/consultant/home",
    Component: ConsultantHomePage,
  },
  {
    path: "/consultant/profile",
    Component: ConsultantProfilePage,
  },
  {
    path: "/consultant/requests/:type",
    Component: ConsultantRequestsPage,
  },
  {
    path: "/admin/home",
    Component: AdminHomePage,
  },
  {
    path: "/admin/verify",
    Component: AdminVerifyPage,
  },
  {
    path: "/admin/manage-users",
    Component: AdminManageUsersPage,
  },
  {
    path: "/admin/ai-dictionary",
    Component: AdminAIDictionaryPage,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
