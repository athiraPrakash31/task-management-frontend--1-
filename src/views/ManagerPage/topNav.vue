<template>

  <div class="app-header header-shadow" style="width:100%; ">
    <div v-if="sideBar!=null">
    <div class="app-header__logo">
                
                <div class="header__pane ml-auto">
                    <div>
                        <button type="button" class="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
                            <span class="hamburger-box">
                                <span class="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="app-header__mobile-menu">
                <div>
                    <button type="button" class="hamburger hamburger--elastic mobile-toggle-nav">
                        <span class="hamburger-box">
                            <span class="hamburger-inner"></span>
                        </span>
                    </button>
                </div>
            </div>
          </div>
    <div class="header__pane ml-auto"></div>
  
                
            
          
         
    <div class="app-header__mobile-menu">
      <div>
       
      </div>
    </div>
    <div class="app-header__menu">
      <span>
        <button
          type="button"
          class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
        >
          <span class="btn-icon-wrapper">
            <em class="fa fa-ellipsis-v fa-w-6"></em>
          </span>
        </button>
      </span>
    </div>
    <div class="app-header__content">
      <div class="app-header-left">
        
        <ul class="header-menu nav" >
          <li class="nav-item">
            <router-link to="/ManagerDashBoard" class="nav-link" style="color:#4fa5d6; font-size: 15px; font-weight: bold;">
              <em class="nav-link-icon fa fa-database" style="color:black"> </em>
              DashBoad
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
                  style="color:#4fa5d6; font-size: 15px; font-weight: bold;"
                >
                
                  <em class="nav-link-icon fa fa-edit" style="color:black"></em>
                  Projects
                </a>
                <div class="dropdown-menu dropdown-menu">
                                    <h6  class="dropdown-header">Projects</h6>
                  <div v-for="item in ProjectList" :key="item.id">
                
                    <button
                     
                      type="button"
                      tabindex="0"
                      @click="ProjectDetail(item.project_id)"
                      class="dropdown-item"
                    >
                      {{ item?.project_name }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="dropdown nav-item" >
            <a href="javascript:void(0);" class="nav-link" style="color:#4fa5d6; font-size: 15px; font-weight: bold;">
              <em class="nav-link-icon fa fa-eye" style="color:black"></em>
              Recently Viewed
            </a>
          </li>

          <li class="dropdown nav-item">
            <div class="widget-content-right">
              <div class="btn-group">
                <a
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  class="p-0 btn"
                >
                  <button
                    type="button"
                    class="btn-shadow rounded-circle p-1 btn btn-primary btn"
                  >
                    <em class="fa text-white fa-add pr-1 pl-1"></em>
                  </button>
                </a>
                <div class="dropdown-menu dropdown-menu-left">
                 
                  <router-link to="/manager/UserView">
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
      

        
			
        <button type="button" id="TooltipDemo" @click="notification" class="btn-open-options mr-5">
          <em class="nav-link-icon fa fa-bell" style="color:black"></em>
         </button>
         

         


        


        

      
            
        <div class="header-btn-lg pr-0">
          <div class="widget-content p-0">
            <div class="widget-content-wrapper">
              <div class="widget-content-left">
                <div class="btn-group">
                  <a
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    class="p-0 btn"
                  >
                    <img
                      width="42"
                      class="rounded-circle"
                      src="../../assets/Images/profile.png"
                      alt=""
                    />
                    <em class="fa fa-angle-down ml-2 opacity-8"></em>
                  </a>
                  <div class="dropdown-menu dropdown-menu-right">
                    <router-link to="/ManagerProfile">
                      <button type="button" tabindex="0" class="dropdown-item">
                        User Profile
                      </button>
                    </router-link>

                    <router-link to="/manager/ChangePassword">
                      <button type="button" tabindex="0" class="dropdown-item">
                        Change Password
                      </button>
                    </router-link>

                    <div tabindex="-1" class="dropdown-divider"></div>
                    <button
                      @click="logout"
                      type="button"
                      tabindex="0"
                      class="dropdown-item"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
              <div class="widget-content-left ml-3 header-user-info">
                <div class="widget-heading">Innovature Technologies K.K</div>
                <div class="widget-subheading"></div>
              </div>
              <div class="widget-content-right header-user-info ml-3">
                <v-img src="../../assets/Images/logo.png" width="50"></v-img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template>
      <!-- notification bar  -->
      <div  v-if="step==2">

      <nav>
        <v-navigation-drawer white app right class="" width="400" style="overflow:auto;">
          
             <template v-slot:prepend>
        

              <v-icon  @click="step--" color="black" class="btn float-right">fa fa-times</v-icon>
              <br/><br/>
           
                  <v-col class="d-flex"  cols="12" sm="12">
                        <v-form action="" 
>
                          <v-text-field
                            v-model="searchKey"
                            label="Search By user "
                            
                            outlined
                            prepend-inner-icon="mdi-magnify"
                            dense
                          ></v-text-field>
                        </v-form>
                      </v-col>
             <div v-for="Data in notificationList" :key="Data.id">
              <div class="card cardMsg mb-3 widget-content">
                <v-avatar>
                  <img
                    src="../../assets/Images/profilePicc.jpg"
                    alt="John"
                  />
                </v-avatar>
                <div class="widget-content-outer">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <div class="widget-heading">
                        {{Data?.content}}
                       
                       {{Data.project_id_notification?.project_name}}
                      </div>
                      <div class="widget-subheading">Revenue streams</div>

                      <div class="widget-subheading">about 3 hours ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
             
            
           
            
     
        
      </template>
            </v-navigation-drawer>
            </nav>

</div>
</template>
  </div>
  </template>

<script>
// import http from "../../http-common";
import ApiService from "../../service/apiservice";
// import Notification from "./NotificationView.vue";

export default {
  components: {   },
  data: () => ({
    notificationValue:0,
    ProjectList: [],
    notificationList:[],
  sideBar:"",
  step:1,
    dialogCompose: false,
  }),

  mounted() {
    this.getProjectsList();
    this.sideBar=this.$route.params.id;
  },
  methods: {
    async notification()
{
this.step=this.step+1;
try {
        const response = await ApiService("/notification", "GET");
        this.notificationList = response;
      } catch (error) {
        console.log(error, "error................");
      }
} ,   async getProjectsList() {
      try {
        const response = await ApiService("/project/getProject", "GET");
        this.ProjectList = response.allocatedProject;
      } catch (error) {
        console.log(error, "error................");
      }
    },
    ProjectDetail(id) {
      // localStorage.setItem("projectId", JSON.stringify(id));
      this.id=this.$route.params.id;

      this.$router.push({ path: "/manager/HomeView/" + id });
      window.location.reload()

    },
    async getProjectDetails(id) {
      try {
        const response = await ApiService(
         "/project/overallProjectStatus/"+id,
          "GET",
          
        );
        this.ProjectData = response;
      } catch (error) {
        console.log(error, "error................");
      }
    },
    logout() {
      this.$router.push("/");
      localStorage.clear();
    },
  },
};
</script>
<style scoped>
.notification {
	font-size: 20px;
	position: relative;
}
 .notification .num {
	position: absolute;
	top: -6px;
	right: -6px;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	border: 2px solid var(--light);
	background: var(--red);
	color: var(--light);
	font-weight: 700;
	font-size: 12px;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>