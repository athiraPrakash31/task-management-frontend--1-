<template>
  <div
    class="
      app-container app-theme-white
      body-tabs-shadow
      fixed-sidebar fixed-header
    "
  >
    <!-- top nav -->
    <topNavigation />

    <div class="app-main">
      <!-- side nav -->

      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading" style="margin-left: 40%">
              <router-link
              to="/DashBoardViewPage"
              style="background:none;"              
            >
              <v-img src="../../assets/Images/logo.png" alt="logo" width="70"></v-img></router-link>
              <div>Innovature Technologies K.K</div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 col-lg-6">
            <div class="row">
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <div
                      class="
                        card-header-tab card-header-tab-animation card-header
                      "
                    >
                      <div class="card-header-title">
                        <em
                          class="
                            metismenu-state-icon
                            fa fa-file-code-o
                            caret-left
                          "
                          
                        ></em>
                        Projects
                      </div>
                      
                    </div>
                  </v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <div
                      class="card cardMsg mb-3 widget-content"
                      v-for="item in ProjectLoaded"
                      :key="item.id"
                    >
                      <v-avatar>
                        <img src="../../assets/Images/logo.png"   alt="" />
                      </v-avatar>
                      <div
                        class="widget-content-outer"
                        @mouseover="upHere = true"
                        @mouseleave="upHere = false"
                      >
                        <div class="widget-content-right-top">
                   
                            <!-- <template v-slot:activator="{ on, attrs }"> -->
                              <a
                                class="btn float-right"
                                v-on:click="ProjectSetting(item.project_id)"
                                title="Project setting"
                              >
                                <v-icon
                                  v-bind="attrs"
                                  v-on="on"
                                  style="color: black"
                                  >mdi-cog-outline</v-icon
                                >
                              </a>
                         

                          
                        </div>

                        <!------------------------------------------------------------------------------------------------------------------>
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left">
                            <a v-on:click="ProjectDetail(item.project_id)">
                              <div class="widget-heading">
                                {{ item.project_name }}
                              </div>
                            </a>

                            <div class="widget-subheading">
                              {{ item.project_code }}
                            </div>
                            <br />
                            <div class="widget-subheading">
                              <ul class="header-menu nav">
                                <li class="nav-item">
                                  <router-link to="/AdminDashBoardView">
                                  </router-link>
                                </li>
                                <li class="btn-group nav-item">
                                  <router-link
                                    :to="'/TaskView/' + item.project_id"
                                  >
                                    <a
                                      href="javascript:void(0);"
                                      class="nav-link"
                                      style="color: black"
                                    >
                                      Task
                                    </a>
                                  </router-link>
                                </li>
                                <li class="dropdown nav-item" v-if="item.project_role!=5">
                                  <router-link
                                    :to="'/addTask/' + item.project_id"
                                  >
                                    <a
                                      href="javascript:void(0);"
                                      class="nav-link"
                                      style="color: black"
                                    >
                                      Add Task
                                    </a>
                                  </router-link>
                                </li>
                                <li class="dropdown nav-item">
                                  <router-link :to="'/file/' + item.project_id">
                                    <a
                                      href="javascript:void(0);"
                                      class="nav-link"
                                      style="color: black"
                                    >
                                      Files
                                    </a>
                                  </router-link>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <some-component v-show="upHere"> </some-component>
                        </div>
                      </div>
                    </div>
                    <div v-if="length < items.length">
                      <button
                        class="btn float-right"
                        @click="loadMore"
                        style="color: cornflowerblue; font-size: 14px"
                      >
                        Load More
                      </button>
                    </div>
                    <div v-if="length >= items.length">
                      <button
                        class="btn float-right"
                        @click="loadLess"
                        style="color: cornflowerblue; font-size: 14px"
                      >
                        Load Less
                      </button>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>

            <br /><br /><br /><br /><br />

            <div class="row margin-top">
              <v-expansion-panels>
                <v-expansion-panel>
                  <div class="mb-3 card">
                    <v-expansion-panel-header>
                      <div
                        class="
                          card-header-tab card-header-tab-animation card-header
                        "
                      >
                        <div class="card-header-title">
                          
                          My Tasks
                        </div>
                        
                      </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <div class="card cardMsg mb-3 widget-content">
                        <div class="table-responsive">
                          <table
                            class="
                              align-middle
                              mb-0
                              table table-borderless table-striped table-hover
                            "
                          >
                            <taskList />
                           
                            <thead>
                              <tr>
                                <th id="" class="text-center">Key</th>
                                <th id="" class="text">Project Name</th>
                                <th id="" class="text">Task Name</th>
                                <th id="" class="text">Priority</th>
                                <th id="" class="text">Status</th>
                                <th id="" class="text">Due</th>
                              </tr>
                            </thead>
                            
                            <tbody>
                             
                              <tr v-for="item in task_list" :key="item.user_id"  @click="handleClick(item.project_id,item.task_id)">
                                
                                <td class="text-center text-muted">#345</td>
                                <td>
                                  <div class="widget-content p-0">
                                    <div class="widget-content-wrapper">
                                      <div class="widget-content-left flex2">
                                        <div class="widget-heading">
                                          {{ item.project_name }}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div class="widget-content p-0 center">
                                    <div class="widget-content-wrapper">
                                      <div class="widget-content-left flex2">
                                        <div class="widget-heading">
                                          {{ item.task_name }}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td v-if="item.priority == 3">
                                  <em
                                    class="fa fa-arrow-up"
                                    style="color: red"
                                    aria-hidden="true"
                                  ></em>
                                </td>
                                <td v-if="item.priority == 2">
                                  <em
                                    class="fa fa-arrow-right"
                                    style="color: black"
                                    aria-hidden="true"
                                  ></em>
                                </td>
                                <td v-if="item.priority == 1">
                                  <em
                                    class="fa fa-arrow-down"
                                    style="color: gray"
                                    aria-hidden="true"
                                  ></em>
                                </td>

                                <td v-if="item.task_status == 1">
                                  <div class="badge badge-danger">open</div>
                                </td>
                                <td v-if="item.task_status == 2">
                                  <div class="badge badge-primary">
                                    Inprogress
                                  </div>
                                </td>
                                <td v-if="item.task_status == 3">
                                  <div class="badge badge-warning">
                                    Resolved
                                  </div>
                                </td>
                                <td v-if="item.task_status == 4">
                                  <div class="badge badge-success">Closed</div>
                                </td>
                                <div v-if="!(new Date(item.end_date) - new Date()  > 24 * 60*60)" >
                                <td style="color: red">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-fire"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"
                                    />
                                  </svg>
                                 
                                    {{ new Date(item.end_date).toDateString() }}
                                    </td>
                                  </div> 
                                  <div v-if="new Date(item.end_date) - new Date()  > 24 * 60*60" >
                                <td>
                                    {{ new Date(item.end_date).toDateString() }}
                                    </td>
                                  </div> 
                              </tr>
                            </tbody>
                          </table>
                          <button
                            class="btn float-right"
                            @click="loadMore"
                            style="color: cornflowerblue; font-size: 14px"
                          ></button>
                        </div>
                      </div>
                    </v-expansion-panel-content>
                  </div>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </div>

          <div class="col-md-12 col-lg-6"  style="z-index: 2;">
            <div class="mb-3 card">
              <div class="card-header-tab card-header">
                <div class="card-header-title">
                  <em
                    class="
                      header-icon
                      lnr-rocket
                      icon-gradient
                      bg-tempting-azure
                    "
                  >
                  </em>
                  Recent Updates
                </div>
              </div>
              <div v-if="NotifyLength == 0" style="margin-left: 40%">
                  <p>No data Available</p>
                </div>
              <div v-for="Data in NotificationLoaded" :key="Data.id">
                <div class="card cardMsg mb-3 widget-content">
                  <v-avatar class="mr-3">
                    <img src="../../assets/Images/profilePicc.jpg"  alt=""/>
                  </v-avatar>
                  <div class="widget-content-outer">
                    <div class="widget-content-wrapper">
                      <div class="widget-content-left">
                        <div class="widget-heading">
                          {{ Data?.content }}

                          <v-btn
              x-small
              color="primary"
              dark
              @click="ProjectDetail(Data.project_id_notification?.project_id)"
            >
            {{ Data.project_id_notification?.project_name }}
            </v-btn>  
                        </div>
                  
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="notificationListLength < notificationList.length">
                <button
                  class="btn float-right"
                  @click="loadMoreNotification"
                  style="color: cornflowerblue; font-size: 14px"
                >
                  Load More
                </button>
              </div>
             
              <div v-if="notificationListLength >= notificationList.length && notificationList.length>5">
                <button
                  class="btn float-right"
                  @click="loadLessNotification"
                  style="color: cornflowerblue; font-size: 14px"
                >
                  Load Less
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- ------------------------------------------------------SECOND ROW-------------------------------------------------- -->

        <!-- ---------------------------------------------------------------END-------------------------------------------------- -->
      </div>
    </div>
  </div>
</template>

<script>
import topNavigation from "./adminTopNav.vue";
import Vue from "vue";
import "vue-toast-notification/dist/theme-sugar.css";
import ApiService from "../../service/apiservice.js";

export default {
  components: { topNavigation },
  data(){
    return{


    upHere: false,
    items: [],
    confirmation: false,
    task_list: [],
    notificationList: [],
    dialogm1: "",
    length: 1,
    NotifyLength:"",
    notificationListLength: 5,
    dialog: false,
  };
  
},

  mounted() {
  
    this.getProjectsList();
    this.notification();
    const params = {
      searchCol2: "assignee",
      searchKey2: 2,
    };
    this.getTask(params);
    
  },
  methods: {
    // scriptValue(){
    //   let Script = document.createElement("script");
    // Script.setAttribute(
    //   "src",
    //   "https://demo.dashboardpack.com/architectui-html-free/assets/scripts/main.js"
    // );
    // document.head.appendChild(Script);
    // },
    async getProjectsList() {
      try {
        const response = await ApiService("/project/getProject", "GET");
        if(localStorage.getItem("role")==1){
          this.items = response.reverse();

        }else{
          this.items = response.allocatedProject.reverse();


        }
      } catch (error) {
        console.log(error, "error................");
      }
    },
    async getTask() {
      try {
        const response = await ApiService("/task/getTaskListDashboard", "GET");

        this.task_list = response.tasks;
        console.log("Task", this.task_list);
      } catch (error) {
        console.log(error, "error................");
      }
    },
    async dlt() {
      const URL = `project/project/${this.project_id}`;
      const response = await ApiService(URL, "DELETE");
      if (response.status == 200) {
        Vue.$toast.success("Project Deleted Successfully", {
          position: "top",
        });
      }
      this.dlt = false;
    },
    loadMoreNotification() {
      if (this.notificationListLength > this.notificationList.length) return;
      this.notificationListLength = this.notificationListLength + 3;
    },
    loadLessNotification() {
      if (this.notificationListLength < this.notificationList.length) return;
      this.notificationListLength = 5;
    },
    loadMore() {
      if (this.length > this.items.length) return;
      this.length = this.length + 3;
    },
    loadLess() {
      if (this.length < this.items.length) return;
      this.length = 1;
    },
    async notification() {
      this.step = this.step + 1;
      try {
        const response = await ApiService("/notification", "GET");
        this.notificationList = response;
        this.NotifyLength=this.notificationList.length;
      } catch (error) {
        console.log(error, "error................");
      }
    },

    ProjectDetail(id) {
      localStorage.setItem("projectId", JSON.stringify(id));
     

      this.$router.push("/HomePage/" + id);
    },
    ProjectSetting(id) {
      this.$router.push("/members/" + id);
    },
    ProjectDelete(id) {
      this.dlt = true;
      this.project_id = id;
    },
    onClose() {
      this.confirmation = false;
      this.project_id = null;
    },
    handleClick(id,taskid){
      
    

     
      this.$router.push("/taskupdation/"+id+"/"+taskid );
    }
  },

  computed: {
    ProjectLoaded() {
    
      return this.items.slice(0,this.length)
    },
    NotificationLoaded() {
      return this.notificationList.slice(0, this.notificationListLength);
    },
    
  },
};
</script>

<style>
@import "https://demo.dashboardpack.com/architectui-html-free/main.css";

.cardMsg {
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}
.hour-rem {
  float: right;
}
.project {
  height: 20px;
  background-color: black;
}
.NameAvtar {
  margin-left: 60%;
}
.bgcolorr {
  background-color: black;
}
</style>
