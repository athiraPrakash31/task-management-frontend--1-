import Vue from "vue";
import VueRouter from "vue-router";
import ProjectView from "../views/AdminPage/ProjectView.vue";
import MemberProfile from "../views/MemberPage/MemberProfile.vue";
import AdminDashBoardViewPage from "../views/AdminPage/AdminDashBoardPage.vue";
import AdminHomePage from "../views/AdminPage/homeView.vue";
import EmailVerification from "../views/Login/EmailVerification.vue";
import ResetView from "../views/Login/ResetView.vue";
import ViewUser from "../views/AdminPage/ViewUser.vue";
import ChangePassword from "../views/AdminPage/ChangePassword.vue";
import psSidebar from "../views/AdminPage/psSidebar.vue";
import MembersView from "../views/AdminPage/MembersView.vue";
import MemberTopNav from "../views/MemberPage/MemberTopNav.vue";
import MemberSideNav from "../views/MemberPage/MemberSideNav.vue";
import TaskView from "../views/AdminPage/TaskView.vue";
import AdminProfile from "../views/AdminPage/AdminProfile.vue";
import AddTask from "../views/AdminPage/AddTask.vue";
import MemberDashboard from "../views/MemberPage/MemberDashboard.vue";
import MemberHome from "../views/MemberPage/MemberHome.vue";
import MembersideMemberView from "../views/MemberPage/MembersideMemberView.vue";
import projectSettingnav from "../views/MemberPage/projectSettingnav.vue";
import MemebreChangepassword from "../views/MemberPage/MemebreChangepassword.vue"
import MemberTaskView from "../views/MemberPage/memberTaskView.vue"
import FileView from '../views/File/FileView.vue'
import TaskUpdates from '../views/AdminPage/TaskUpdates.vue'
import MemberAddTask from '../views/MemberPage/MemberAddTask.vue'
import EditTask from '../views/AdminPage/EditTask.vue'
import memberFileView from '../views/MemberPage/MemberFileView.vue'
import memberTaskUpdation from '../views/MemberPage/memberTaskUpdate.vue'
import MemberTaskEdit from '../views/MemberPage/memberTaskEdit.vue'
import NotificationView from '../views/AdminPage/NotificationView.vue'
// MANAGER ROUTER
import ManagerDashBoard from "../views/ManagerPage/ManagerDashBoard.vue";
import MangerViewUser from "../views/ManagerPage/UserView.vue";
import MangerHomePage from "../views/ManagerPage/HomePage.vue";
import ManagerTaskView from "../views/ManagerPage/TaskList.vue";
import ManagerTaskDetail from "../views/ManagerPage/TaskDetailViewpage.vue";
import ManagerTaskEdit from "../views/ManagerPage/EditTask.vue";
import ManagerAddTask from "../views/ManagerPage/addTask.vue";
import ManagerFileView from "../views/ManagerPage/FileView.vue";
import ManagerprojectSettings from "../views/ManagerPage/ProjectSetting.vue";
import ManagerProfile from "../views/ManagerPage/ProfilePage.vue";
import ManagerChangePassword from "../views/ManagerPage/ChangePassword.vue";
import loginPage from "../views/Login/LoginPage.vue";
import PageNotFound from "../views/Login/PageNotFound.vue";

Vue.use(VueRouter);

function guardMyroute(to, from, next) {
  var isAuthenticated = false;
  //this is just an example. You will have to find a better or
  // centralised way to handle you localstorage data handling
  if (localStorage.getItem("accessTocken")) {
    isAuthenticated = true;
  }

  if (isAuthenticated) {
    next(); // allow to enter route
  } else {
    next("/"); // go to '/login';
  }
}
const routes = [
  {
    path: "/",
    name: "loginPage",
    component: loginPage,
  },
  {
    path: "*",
    name: "PageNotFound",
    component: PageNotFound
  },
  {
    path: "/addTask",
    name: AddTask,
    component: AddTask,
    beforeEnter: guardMyroute,
  },

  {
    path: "/ProjectView/:id",
    name: "ProjectView",
    beforeEnter: guardMyroute,
    component: ProjectView,
  },
  {
    path: "/memberProfile",
    name: "MemberProfile",
    component: MemberProfile,
  },

  {
    path: "/DashBoardViewPage",
    name: "AdminDashBoardViewPage",
    beforeEnter: guardMyroute,
    component: AdminDashBoardViewPage,
  },

  {
    path: "/HomePage/:id",
    name: "AdminHomePage",
    beforeEnter: guardMyroute,
    component: AdminHomePage,
  },

  {
    path: "/emailVerification",
    name: "EmailVerification",
    component: EmailVerification,
  },
  {
    path: "/reset/:url",
    name: "ResetView",
    component: ResetView,
  },
  {
    path: "/viewuser",
    name: ViewUser,
    component: ViewUser,
    beforeEnter: guardMyroute,
  },
  {
    path: "/changePassword",
    name: ChangePassword,
    component: ChangePassword,
    beforeEnter: guardMyroute,
  },
  {
    path: "/psSidebar",
    name: psSidebar,
    component: psSidebar,
    beforeEnter: guardMyroute,
  },
  {

    path: '/members/:id',
    name: MembersView,
    component: MembersView,
    beforeEnter: guardMyroute,
  },
  {
    path: "/memeberTopnav",
    name: MemberTopNav,
    component: MemberTopNav,
    beforeEnter: guardMyroute,
  },
  {
    path: "/memebersidenav",
    name: MemberSideNav,
    component: MemberSideNav,
    beforeEnter: guardMyroute,
  },


  {
    path: "/TaskView/:id",
    name: TaskView,
    beforeEnter: guardMyroute,
    component: TaskView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/profile",
    name: AdminProfile,
    component: AdminProfile,
    beforeEnter: guardMyroute,
  },
  {
    path: "/addTask/:id",
    name: AddTask,
    component: AddTask,
    beforeEnter: guardMyroute,
  },

  {
    path: "/memeberDashboard",
    name: MemberDashboard,
    component: MemberDashboard,
    beforeEnter: guardMyroute,
  },
  {
    path: "/memeberhome/:id",
    name: MemberHome,
    component: MemberHome,
    beforeEnter: guardMyroute,
  },
  {
    path: "/memberList/:id",
    name: MembersideMemberView,
    component: MembersideMemberView,
    beforeEnter: guardMyroute,
  },
  {
    path: "/projectsettingsidenav",
    name: projectSettingnav,
    component: projectSettingnav,
    beforeEnter: guardMyroute,
  },
  {
    path: "/memberchangepassword",
    name: MemebreChangepassword,
    component: MemebreChangepassword,
    beforeEnter: guardMyroute
  },

  {

    path: '/MemberTaskView/:id',
    name: MemberTaskView,
    component: MemberTaskView,
    beforeEnter: guardMyroute,
  },
  {
    path: '/file/:id',
    name: FileView,
    component: FileView,
    beforeEnter: guardMyroute
  },
  {
    path: '/taskupdation/:id/:task_id',
    name: TaskUpdates,
    component: TaskUpdates,

    beforeEnter: guardMyroute
  },

  {
    path: '/Member/taskupdation/:id',
    name: memberTaskUpdation,
    component: memberTaskUpdation,
    beforeEnter: guardMyroute
  },
  {
    path: "/memberaddTask/:id/:task_id",
    name: MemberAddTask,
    component: MemberAddTask,
    beforeEnter: guardMyroute,
  },
  {
    path: "/edittask/:id/:task_id",
    name: EditTask,
    component: EditTask,
    beforeEnter: guardMyroute,
  },


  {
    path: "/memberTaskEdit/:id",
    name: MemberTaskEdit,
    component: MemberTaskEdit,
    beforeEnter: guardMyroute,
  },
  {
    path: "/memberFileView/:id",
    name: memberFileView,
    component: memberFileView,
    beforeEnter: guardMyroute
  }
  ,
  {
    path: "/Notification",
    name: NotificationView,
    component: NotificationView,
    beforeEnter: guardMyroute
  },


  //  MANAGER ROUTER


  {
    path: "/ManagerDashBoard",
    name: "ManagerDashBoard",
    beforeEnter: guardMyroute,
    component: ManagerDashBoard,
  },


  {
    path: "/manager/UserView",
    name: "MangerViewUser",
    beforeEnter: guardMyroute,
    component: MangerViewUser,
  },

  {
    path: "/manager/HomeView/:id",
    name: "MangerHomePage",
    beforeEnter: guardMyroute,
    component: MangerHomePage,
  },
  {
    path: "/manager/taskList/:id",
    name: "ManagerTaskView",
    beforeEnter: guardMyroute,
    component: ManagerTaskView,
  },
  {
    path: "/manager/taskDetail/:id/:taskId",
    name: "ManagerTaskDetail",
    beforeEnter: guardMyroute,
    component: ManagerTaskDetail,
  },
  {
    path: "/manager/taskEdit/:id/:taskId",
    name: "ManagerTaskEdit",
    beforeEnter: guardMyroute,
    component: ManagerTaskEdit,
  },
  {
    path: "/manager/addTask/:id",
    name: "ManagerAddTask",
    beforeEnter: guardMyroute,
    component: ManagerAddTask,
  },
  {
    path: "/manager/fileView/:id",
    name: "ManagerFileView",
    beforeEnter: guardMyroute,
    component: ManagerFileView,
  },
  {
    path: "/manager/projectSettings/:id",
    name: "ManagerprojectSettings",
    beforeEnter: guardMyroute,
    component: ManagerprojectSettings,
  },
  {
    path: "/ManagerProfile/",
    name: "ManagerProfile",
    beforeEnter: guardMyroute,
    component: ManagerProfile,
  },
  {
    path: "/manager/ChangePassword",
    name: "ManagerChangePassword",
    beforeEnter: guardMyroute,
    component: ManagerChangePassword,
  },
  {
    path: "/login",
    name: "loginPage",
    component: loginPage,
  },
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
