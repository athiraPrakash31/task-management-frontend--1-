<template>
  <div style="z-index: 99;">
  <div class="app-header header-shadow" style="width: 100%">
    <div v-if="sideBar != null">
     
      <div class="app-header__mobile-menu">
        <div>
          <button
            type="button"
            class="hamburger hamburger--elastic mobile-toggle-nav"
          >
            <span class="hamburger-box">
              <span class="hamburger-inner"></span>
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="header__pane ml-auto"></div>

    <div class="app-header__mobile-menu">
      <div></div>
    </div>
    <div class="app-header__menu">
      <span>
        <button
          type="button"
          class="
            btn-icon btn-icon-only btn btn-primary btn-sm
            mobile-toggle-header-nav
          "
        >
          <span class="btn-icon-wrapper">
            <em class="fa fa-ellipsis-v fa-w-6"></em>
          </span>
        </button>
      </span>
    </div>
    <div class="app-header__content" >
      
      <div class="app-header-left" style="float: left;">
        <ul class="header-menu nav">
          <div class="widget-content-right header-user-info ml-3">
            <router-link
              to="/DashBoardViewPage"
             
          
            >
                   
                <v-img
                  src="../../assets/Images/logo.png"
                  width="40"
                  alt=""
                  style="text-decoration: none;"
                ></v-img>
                </router-link>
              </div>
          <li class="nav-item">
            <router-link
              to="/DashBoardViewPage"
              class="nav-link"
              style="color: #4fa5d6; font-size: 15px; font-weight: bold"
              title="Dashboard"
            >
              <em class="nav-link-icon fa fa-database" style="color: black">
              </em>
              DashBoard
            </router-link>
          </li>
          <li class="btn-group nav-item">
            <div class="widget-content-left">
              <div class="btn-group">
                <a
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  class="btn nav-link"
                  style="color: #4fa5d6; font-size: 15px; font-weight: bold"
                  title="Projects"
                >
                  <em
                    class="nav-link-icon fa fa-edit"
                    style="color: black"
                  ></em>
                  Projects
                </a>

                <div
                  class="dropdown-menu dropdown-menu auto"
                  style="max-height: 200px; overflow: scroll"
                >
                  <h6 class="dropdown-header">Projects</h6>
                  <div v-for="item in ProjectLoaded" :key="item.id">
                    <div v-if="item.project_id==id">
                      <button
                      type="button"
                      tabindex="0"
                     
                      @click="ProjectDetail(item.project_id)"
                     
                      class="dropdown-item activeColor"
                    >
                      {{ item.project_name }}
                    </button>
                    </div>
                    <div v-if="item.project_id!=id">
                      <button
                      type="button"
                      tabindex="0"
                     
                      @click="ProjectDetail(item.project_id)"
                      class="dropdown-item"
                    >
                      {{ item.project_name }}
                    </button>
                </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="dropdown nav-item">
            <a
              href="javascript:void(0);"
              class="nav-link"
              style="color: #4fa5d6; font-size: 15px; font-weight: bold"
              title="Recently Viewed"
            >
              <em class="nav-link-icon fa fa-eye" style="color: black"></em>
              Recently Viewed
            </a>
          </li>

          <li class="dropdown nav-item" v-if="role == 1">
            <div class="widget-content-right">
              <div class="btn-group">
                <a
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  class="p-0 btn"
                >
                  <button
                  title="Add"
                    type="button"
                    class="btn-shadow rounded-circle p-1 btn btn-primary btn"
                  >
                    <em class="fa text-white fa-add pr-1 pl-1"></em>
                  </button>
                </a>
                <div class="dropdown-menu dropdown-menu-left">
                  <addProject />

                  <router-link to="/viewuser" style="text-decoration: none">
                    <button type="button" tabindex="0" class="dropdown-item">
                      User Management
                    </button>
                  </router-link>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="app-header-right">
        <!---------- Notification View---- -->
        <div v-if="NotifiationBarOpen == 2">
          <button
            type="button"
            id="TooltipDemo"
            @click="NotifiationBarOpen--"
            class="btn-open-options mr-5"
            
          >
            <em class="nav-link-icon fa fa-bell" style="color: black"></em
            ><sup style="font-size: 12px; color: red; font-weight: bold"></sup>
          </button>
        </div>

        <div v-if="NotifiationBarOpen == 1">
          <button
            type="button"
            id="TooltipDemo"
            @click="notification"
            class="btn-open-options mr-5"
            title="Notifications"
          >
            <em class="nav-link-icon fa fa-bell" style="color: black"></em
            ><sup
              v-if="this.NotificationNum != 0"
              style="font-size: 14px; color: red; font-weight: bold"
              >{{ this.NotificationNum }}</sup
            >
          </button>
        </div>

        <div class="header-btn-lg pr-0">
          <div class="widget-content p-0">
            <div class="widget-content-wrapper">
              <div class="widget-content-left">
                <div class="btn-group">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <div v-bind="attrs" v-on="on">
                        <img
                          width="30"
                          height="30"
                          class="rounded-circle"
                          v-bind:src="profile_photo" 
                          alt=""
                          title="Profile"
                        />
                         <em class="fa fa-angle-down ml-2 opacity-8" title="Profile"></em>
                      </div>
                    </template>
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>
                          <router-link to="/profile">
                            <button type="button" class="dropdown-item">
                              User Profile
                            </button>
                          </router-link>
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>
                          <router-link to="/changePassword">
                            <button type="button" class="dropdown-item">
                              Change Password
                            </button>
                          </router-link>
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>
                          <router-link to="">
                            <button
                              @click="logout"
                              type="button"
                              tabindex="0"
                              class="dropdown-item"
                            >
                              Logout
                            </button>
                          </router-link>
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </div>
              <div class="widget-content-right header-user-info ml-3">
                <router-link
              to="/DashBoardViewPage"
             
            >
                <v-img
                  src="../../assets/Images/logo.png"
                  width="40"
                  alt=""
                ></v-img></router-link>
              </div>
              <div class="widget-content-left ml-3 header-user-info">
                <div class="widget-heading">Innovature Technologies K.K</div>
                <div class="widget-subheading"></div>
              </div>
              <div class="widget-content-right header-user-info ml-3">
                <v-img src="" width="50" alt=""></v-img>
              </div>
            </div>
          </div>

         
        </div>
     
    </div>
   
  </div>
</div>
<template>
            <!-- notification bar  -->
            <div v-if="NotifiationBarOpen == 2">
              <div class="theme-settings__inner">
                <div class="scrollbar-container">
                  <nav >
                    <v-navigation-drawer
                      white
                      app
                      right
                      class=""
                      width="300"
                      style="overflow: auto ;z-index: -99; position: fixed; margin-top: 4%;" 
                    >
                      <template v-slot:prepend>
                        <v-icon
                          @click="NotifiationBarOpen--"
                          color="black"
                          class="btn float-right"
                          >fa fa-times</v-icon
                        >
                        <br /><br />

                        <v-col class="d-flex" cols="12" sm="12"> </v-col>
                        <div v-for="Data in notificationList" :key="Data.id">
                          <div class="card cardMsg mb-3 widget-content">
                            <v-avatar class="mr-3">
                              <img
                                src="../../assets/Images/profilePicc.jpg"
                                alt=""
                              />
                            </v-avatar>
                            <div class="widget-content-outer mr-6">
                              <div class="widget-content-wrapper">
                                <div class="widget-content-left">
                                  <div class="widget-heading">
                                    {{ Data?.content }}
                                    {{
                                      Data.project_id_notification?.project_name
                                    }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>
                    </v-navigation-drawer>
                  </nav>
                </div>
              </div>
            </div>
          </template>
</div>
</template>

<script>
import addProject from "./AddProjectModal.vue";
import ApiService from "../../service/apiservice";
import Vue from "vue";
import "vue-toast-notification/dist/theme-sugar.css";
import VueToast from "vue-toast-notification";
Vue.use(VueToast);
export default {
  components: { addProject },
  data() {
    return {
      id: "",
      clicked: false,
      NotificationNum: "",
      role: localStorage.getItem("role"),
      notificationValue: 0,
      ProjectList: [],
      notificationList: [],
      sideBar: "",
      profile_photo:"",
      NotifiationBarOpen: 1, //this value used to open side navigation bar
      dialogCompose: false,
    };
  },

  mounted() {
    this.getProjectsList();
    this.id = this.$route.params.id;
    this.notificationLimit();
  //   window.setInterval(() => {
  //   this.notificationLimit()
  // }, 1000)
  this.getUser();
  },
  methods: {
    scriptValue() {
      let Script = document.createElement("script");
      Script.setAttribute(
        "src",
        "https://demo.dashboardpack.com/architectui-html-free/assets/scripts/main.js"
      );
      document.head.appendChild(Script);
    },
    myFunction() {
      document.getElementById("myDropdown").classList.toggle("show");
    },

    async notificationLimit() {
      try {
        const response = await ApiService("/notification/count", "GET");
        console.log(response);
        this.NotificationNum = response;
      } catch (error) {
        console.log(error, "error................");
      }
      this.sideBar = this.$route.params.id;
    },
    async getProjectsList() {
      try {
        const response = await ApiService("/project/getProject", "GET");
        if (localStorage.getItem("role") == 1) {
          this.ProjectList = response;
        } else {
          this.ProjectList = response.allocatedProject;
        }
      } catch (error) {
        console.log(error, "error................");
      }
      this.sideBar = this.$route.params.id;
    },

    async getProjectRole(id) {
      try {
        const response = await ApiService("/project/projectRole/" + id, "GET");
        this.notificationList = response;
        if (response.statusCode == 50) {
          this.$router.push("/DashBoardViewPage");
        }
        localStorage.setItem(
          "projectRole",
          JSON.stringify(response.project_role)
        );
      } catch (error) {
        Vue.$toast.warning("Network error", {
          position: "top",
        });
      }
    },
    async notification() {
      this.NotifiationBarOpen = this.NotifiationBarOpen = 2;
      this.notificationLimit();
      try {
        const response = await ApiService("/notification", "GET");
        this.notificationList = response;
      } catch (error) {
        Vue.$toast.warning("Network error", {
          position: "top",
        });
        this.$router.push("/");
        localStorage.clear();
      }
    },
    async ProjectDetail(id) {
      this.clicked = true;
      localStorage.setItem("projectId", JSON.stringify(id));
      const response = await ApiService("/project/projectRole/" + id, "GET");
      this.notificationList = response;
      localStorage.setItem(
        "projectRole",
        JSON.stringify(response.project_role)
      );

      this.$router.push({ path: "/HomePage/" + id });
      this.clicked = true;
      window.location.reload();
    },
    async getProjectDetails(id) {
      try {
        const response = await ApiService(
          "/project/overallProjectStatus/" + id,
          "GET"
        );
        this.ProjectData = response;
      } catch (error) {
        Vue.$toast.warning("Network error", {
          position: "top",
        });
        this.$router.push("/");
        localStorage.clear();
      }
    },
    logout() {
      this.$router.push("/");
      localStorage.clear();
    },
    async getUser() {
      const response = await ApiService("users/getProfile", "GET");
      this.data = response;
     

      this.profile_photo = response.profile_photo;
    },
  },

  computed: {
    ProjectLoaded() {
      return this.ProjectList.slice().reverse();
    },
  },
};
</script>

<style scoped>
.scrollbar {
  margin-left: 30px;
  float: left;
  height: 300px;
  width: 65px;
  background: #f5f5f5;
  overflow-y: scroll;
  margin-bottom: 25px;
}
#style-1::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

#style-1::-webkit-scrollbar {
  width: 12px;
  background-color: #f5f5f5;
}

#style-1::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}

.text {
  text-decoration: none;
}

.dropbtn {
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropbtn:hover {
  background-color: transparent !important;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.dropdown-content {
  right: 0;
}
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
#myDropdown {
  background-color: #fff;
}
.dropdown-menu {
  overflow-x: hidden !important;
}
.dropdown a:hover {
  background-color: #ddd;
}

.show {
  display: block;
}

.v-menu__content {
}
.v-list.v-sheet a {
  text-decoration: none;
}
.activeColor {
  color: rgb(255, 255, 255);
  background-color: rgb(80, 183, 220);
  font-weight: bolder;
}
</style>
