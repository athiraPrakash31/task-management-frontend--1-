<template>
  <div class="app-header header-shadow">

    <div class="header__pane ml-auto"></div>

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
    <div class="app-header__content">
      <div class="app-header-left">
       
        <ul class="header-menu nav"  style=" padding-left:230px">
          <li class="nav-item">
            <router-link to="/memeberDashboard" class="nav-link"  style="color:#4fa5d6; font-size: 15px; font-weight: bold;">
              <em class="nav-link-icon fa fa-database"> </em>
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
                  style="color:#4fa5d6; font-size: 15px; font-weight: bold;"
                >
                  <em class="nav-link-icon fa fa-edit"></em>
                  Projects
                </a>
                <div class="dropdown-menu dropdown-menu">
                  <h6 tabindex="-1" class="dropdown-header">Projects</h6>
                  <div v-for="item in ProjectList" :key="item.id">
                    <button
                      @click="ProjectDetail(item.project_id)"
                      type="button"
                      tabindex="0"
                      class="dropdown-item"
                    >
                      {{ item.project_name }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="dropdown nav-item">
            <a href="javascript:void(0);" class="nav-link"  style="color:#4fa5d6; font-size: 15px; font-weight: bold;">
              <em class="nav-link-icon fa fa-eye"></em>
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
                    disabled
                  >
                    <em class="fa text-white fa-add pr-1 pl-1"></em>
                  </button>
                </a>
              
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="app-header-right">
        <button type="button" id="TooltipDemo" @click="step++" class="btn-open-options mr-5">
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
                    <router-link to="/memberProfile">
                    <button type="button" tabindex="0" class="dropdown-item">
                      User Profile
                    </button>
                  </router-link>

                    <router-link to="/memberchangepassword">
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
        <v-navigation-drawer white app right class="" width="400">
          
             <template v-slot:prepend>
        

              <v-icon  @click="step++" color="black" class="btn float-right">fa fa-times</v-icon>
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
             
              <div class="card cardMsg mb-3 widget-content">
                <v-avatar>
                  <img
                    src="https://www.shutterstock.com/image-vector/young-man-avatar-character-260nw-661669825.jpg"
                    alt="John"
                  />
                </v-avatar>
                <div class="widget-content-outer">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <div class="widget-heading">
                        Alan Posted a
                        <v-badge
                          color="primary"
                          content="Comment"
                          left
                          inline
                        ></v-badge>
                        on the issue
                      </div>
                      <div class="widget-subheading">Revenue streams</div>

                      <div class="widget-subheading">about 3 hours ago</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card cardMsg mb-3 widget-content">
                <v-avatar>
                  <img
                    src="https://www.shutterstock.com/image-vector/young-man-avatar-character-260nw-661669825.jpg"
                    alt="John"
                  />
                </v-avatar>
                <div class="widget-content-outer">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <div class="widget-heading">
                        Ajith Posted a
                        <v-badge
                          color="primary"
                          content="Comment"
                          left
                          inline
                        ></v-badge>
                        on the issue
                      </div>
                      <div class="widget-subheading">Revenue streams</div>

                      <div class="widget-subheading">about 3 hours ago</div>
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
import ApiService from '@/service/apiservice';

 import http from "../../http-common";

export default {
  
  components: {  },
  data: () => ({
    ProjectList: "",
    step:1,
    dialogCompose:false,
  }),
  methods: {
    async getproject(){

      const response=await ApiService("/project/getProject", "GET", null)


      this.ProjectList = response.allocatedProject

    },

    ProjectDetail(id) {

      this.$router.replace({ path: "/memeberhome/" +id});
      localStorage.removeItem('id')
      localStorage.setItem('id', id)
    },
    logout() {
      this.$router.push("/");
      localStorage.clear();
    },
  },

  mounted() {
    http.get("project/overallProjectStatus").then((response) => {
      this.ProjectList = response;
    });

  this.getproject();
   },
 
  
};
</script>
      