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
      <sideNavigation :id="ProjectData.project_id" />
      <div class="app-main__outer neww">
        <div class="app-main__inner">
          <div class="app-page-title bg-light p-1">
            <div class="page-title-wrapper">
              <div class="page-title-heading">
                <router-link exact :to="'/HomePage/' + this.$route.params.id">
                <v-img
                  src="../../assets/Images/logo.png"
                  alt="logo"
                  width="50"
                ></v-img></router-link>
                <div
                  style="
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  "
                >
                  {{ projectStatus?.project_name }} (
                  {{ projectStatus?.project_code }})
                </div>
              </div>
            </div>
          </div>

          <h5 id="f1">
            Project Home :
            <span id="f2"
              >Recent Updates <v-icon>mdi-signal-variant</v-icon></span
            >
          </h5>

          <div class="row">
            <div class="col-md-6 col-lg-8">
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
                  </div>
                </div>

                <div v-for="Data in TaskHistoryLoaded" :key="Data.id">
                  <div class="card cardMsg mb-3 widget-content" >
                    <v-avatar>
                      <img
                        src="../../assets/Images/profilepic.png"
                        alt="John"
                      />
                    </v-avatar>
                    <div class="widget-content-outer">
                      <div class="widget-content-wrapper">
                        <div
                          class="widget-content-left"
                          v-if="Data.action == 1"
                        >
                          <div class="widget-heading">
                            {{ Data.action_by }}
                            <v-badge
                              color="error"
                              content="Deleted"
                              left
                              inline
                            ></v-badge>
                            a task
                          </div>
                          <div class="widget-subheading">
                            Created Date: {{ Data.created_date }}
                          </div>
                        </div>
                        <div
                          class="widget-content-left"
                          v-if="Data.action == 2"
                        >
                          <div class="widget-heading">
                            {{ Data.action_by }}
                            <v-badge
                              color="primary"
                              content="Created"
                              left
                              inline
                            ></v-badge>
                            a new task
                          </div>
                          <div class="widget-subheading">
                            Created Date: {{ Data.created_date }}
                          </div>
                        </div>
                        <div
                          class="widget-content-left"
                          v-if="Data.action == 3"
                        >
                          <div class="widget-heading">
                            {{ Data.action_by }}
                            <v-badge
                              color="primary"
                              content="Updated"
                              left
                              inline
                            ></v-badge>
                            a new task
                          </div>
                          <div class="widget-subheading">
                            Created Date: {{ Data.created_date }}
                          </div>
                        </div>

                        <div
                          class="widget-content-left"
                          v-if="Data.action == 4"
                        >
                          <div class="widget-heading">
                            {{ Data.action_by }}
                            <v-badge
                              color="success"
                              content=" Uploaded"
                              left
                              inline
                            ></v-badge>
                            a file
                          </div>
                          <div class="widget-subheading">
                            Created Date: {{ Data.created_date }}
                          </div>
                        </div>
                        <div
                          class="widget-content-left"
                          v-if="Data.action == 5"
                        >
                          <div class="widget-heading">
                            {{ Data.action_by }}
                            <v-badge
                              color="warning"
                              content=" Assigned"
                              left
                              inline
                            ></v-badge>
                            a file
                          </div>
                          <div class="widget-subheading">
                            Created Date: {{ Data.created_date }}
                          </div>
                        </div>
                        <div
                          class="widget-content-left"
                          v-if="Data.action == 6"
                        >
                          <div class="widget-heading">
                            {{ Data.action_by }}
                            <v-badge
                              color="warning"
                              content=" Re-Assigned"
                              left
                              inline
                            ></v-badge>
                            a Task
                          </div>
                          <div class="widget-subheading">
                            Created Date: {{ Data.created_date }}
                          </div>
                        </div>
                        <div
                          class="widget-content-left"
                          v-if="Data.action == 7"
                        >
                          <div class="widget-heading">
                            {{ Data.action_by }}
                            <v-badge
                              color="primary"
                              content=" Created  "
                              left
                              inline
                            ></v-badge
                            >and
                            <v-badge
                              color="warning"
                              content="Assigned"
                              left
                              inline
                            ></v-badge>
                            a Task
                          </div>
                          <div class="widget-subheading">
                            Created Date: {{ Data.created_date }}
                          </div>
                        </div>
                        <div
                          class="widget-content-left"
                          v-if="Data.action == 8"
                        >
                          <div class="widget-heading">
                            {{ Data.action_by }}
                            <v-badge
                              color="primary"
                              content=" Changed  "
                              left
                              inline
                            ></v-badge>
                            Task status
                          </div>
                          <div class="widget-subheading">
                            Created Date: {{ Data.created_date }}
                          </div>
                        </div>
                        <div
                          class="widget-content-left"
                          v-if="Data.action == 9"
                        >
                          <div class="widget-heading">
                            {{ Data.action_by }}
                            <v-badge
                              color="primary"
                              content="Updated"
                              left
                              inline
                            ></v-badge
                            >and
                            <v-badge
                              color="warning"
                              content="Re-Assign"
                              left
                              inline
                            ></v-badge>
                            Task status
                          </div>
                          <div class="widget-subheading">
                            Created Date: {{ Data.created_date }}
                          </div>
                        </div>


                        <div
                          class="widget-content-left"
                          v-if="Data.action == 11"
                        >
                          <div class="widget-heading">
                            {{ Data.action_by }}
                            <v-badge
                              color="primary"
                              content="Updated"
                              left
                              inline
                            ></v-badge
                            >Changed status 
                            <v-badge
                              color="warning"
                              content="Re-Assign"
                              left
                              inline
                            ></v-badge>
                           
                          </div>
                          <div class="widget-subheading">
                            Created Date: {{ Data.created_date }}
                          </div>
                        </div>

                        <div
                          class="widget-content-left"
                          v-if="Data.action == 12"
                        >
                          <div class="widget-heading">
                            {{ Data.action_by }}
                            <v-badge
                              color="primary"
                              content="Updated"
                              left
                              inline
                            ></v-badge
                            >Changed assignee
                            <v-badge
                              color="warning"
                              content="Re-Assign"
                              left
                              inline
                            ></v-badge>
                           
                          </div>
                          <div class="widget-subheading">
                            Created Date: {{ Data.created_date }}
                          </div>
                        </div>

                        <div
                          class="widget-content-left"
                          v-if="Data.action == 13"
                        >
                          <div class="widget-heading">
                            {{ Data.action_by }}
                            <v-badge
                              color="primary"
                              content="Updated"
                              left
                              inline
                            ></v-badge
                            >Changed status And Assignee
                            <v-badge
                              color="warning"
                              content="Re-Assign"
                              left
                              inline
                            ></v-badge>
                            
                          </div>
                          <div class="widget-subheading">
                            Created Date: {{ Data.created_date }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="length == 0" style="margin-left: 40%">
                  <p>No data Available</p>
                </div>
                <div v-if="lengthTask < taskHistoryData.length">
                  <button
                    class="btn float-right"
                    @click="loadMore"
                    style="color: cornflowerblue; font-size: 14px"
                  >
                    Load More
                  </button>
                </div>
                <div v-if="lengthTask > taskHistoryData.length">
                  <button
                    class="btn float-right"
                    @click="loadLess"
                    style="color: cornflowerblue; font-size: 14px"
                  >
                    Load Less
                  </button>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-4">
              <div
                class="
                  card-shadow-danger
                  mb-3
                  widget-chart widget-chart2
                  text-left
                  card
                "
              >
                <div class="widget-content" style="word-break:break-all;">
                  <div class="widget-content-outer">
                    <div class="widget-content-wrapper">
                      <div class="widget-content-left pr-2 fsize-1"></div>
                      <div class="widget-content-right w-100">
                        <div class="progress-bar-xs progress" style="word-wrap:break-word;">

                          <div
                            class="progress-bar bg-danger"
                            role="progressbar"
                            aria-valuenow="10"
                            aria-valuemin="0"
                          
                            aria-valuemax="100"
                            :style="{ width: this.openTask + '%' }"
                          ></div>
                      
   
                          <div
                            class="progress-bar bg-primary"
                            role="progressbar"
                            aria-valuenow="20"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            :style="{ width: this.inProgress + '%' }"
                          ></div>
                          <div
                            class="progress-bar bg-warning"
                            role="progressbar"
                            aria-valuenow="60"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            :style="{ width: this.resolved + '%' }"
                          ></div>
                          <div
                            class="progress-bar bg-success"
                            role="progressbar"
                            aria-valuenow="10"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            :style="{ width: this.closed + '%' }"
                          ></div>
                        </div>

                        <div class="progress-sub-label">
                          <div class="sub-label-right">
                            closed {{ this.closed }}%
                          </div>
                          &nbsp;&nbsp;&nbsp;
                        </div>
                        <div class="text-center d-flex">
                          <div class="sub-label-right">
                            Open:
                            <div class="badge badge-danger mr-2">
                              {{ projectStatus.openTask }}
                            </div>
                          </div>
                          <br />

                          <div class="sub-label-right">
                            In Progress:

                            <div class="badge badge-primary mr-2">
                              {{ projectStatus.inProgress }}
                            </div>
                          </div>

                          <br />
                          <div class="sub-label-right">
                            Resolved:
                            <div class="badge badge-warning mr-2">
                              {{ projectStatus.resolved }}
                            </div>
                          </div>
                          <br />
                          <div class="sub-label-right">
                            Closed:
                            <div class="badge badge-success mr-2">
                              {{ projectStatus.closed }}
                            </div>
                          </div>
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="
                  card-shadow-danger
                  mb-3
                  widget-chart widget-chart2
                  text-left
                  card
                "
              >
                <div class="widget-content">
                  <div class="widget-content-outer">
                    <div class="widget-content-wrapper">
                      <div class="card-header-title" id="f1">Project</div>
                      <v-spacer></v-spacer>

                      <div v-if="this.projectRole == 3">
                       <editProject/>

<!-- 
                          < v-slot:activator="{ on, attrs }"> -->
                            <a
                              class="btn float-right"
                              v-on:click="ProjectDelete(ProjectData.project_id)"
                              title="Delete project"
                            >
                              <v-icon
                                v-bind="attrs"
                                v-on="on"
                                style="color: red"
                                >mdi-delete</v-icon
                              >
                            </a>
                          <!-- </template> -->
                        
                      </div>
                    </div>
                    <v-dialog
                      class="modal"
                      v-model="confirmation"
                      max-width="500"
                    >
                      <v-card
                        ><br />

                        <v-card-text>
                          <h5>
                            <p>
                              Resources are allocated to this project.<br />
                              Are you sure to delete the Project?
                            </p>
                          </h5>
                        </v-card-text>

                        <v-card-actions
                          ><br /><br /><br /><br /><br />
                          <v-spacer></v-spacer>

                          <v-btn color="red" text @click="onClose()">
                            No
                          </v-btn>

                          <v-btn color="green darken-1" text @click="dlt()">
                            Yes
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <div class="card cardMsg mb-3 widget-content">
                      <v-avatar>
                        <img
                          src="https://innovature.ai/wp-content/uploads/2020/10/logo.png"
                          alt="John"
                        />
                      </v-avatar>
                      <div
                        class="widget-content-outer"
                        style="word-break: break-all"
                      >
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left">
                            <div class="widget-heading WordBreak">
                              {{ projectStatus?.project_name }}
                            </div>
                            <div class="widget-subheading WordBreak">
                              {{ projectStatus?.project_code }}
                            </div>
                            <br />
                            <p style="word-wrap: brak-word" class="WordBreak">
                              {{ projectStatus?.project_description }}
                            </p>
                            <br />
                            <div class="widget-subheading WordBreak">
                              Start Date: {{ projectStatus?.start_date }}
                            </div>
                            <div class="widget-subheading WordBreak">
                              End Date: {{ projectStatus?.end_date }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sideNavigation from "./adminSideNav.vue";
import topNavigation from "./adminTopNav.vue";
import ApiService from "../../service/apiservice";
import editProject from "./EditProjectModal.vue";
import Vue from "vue";
import "vue-toast-notification/dist/theme-sugar.css";

export default {
  components: { sideNavigation, topNavigation, editProject },
  data() {
    return {
      status: {
        resolved: Number,
        closed: Number,
        inProgress: Number,
        openTask: Number,
      },
      dialogCompose: false,
      lengthTask: 5,
      confirmation: false,
      ProjectData: [],
      projectStatus: [],
      dialogm1: "",
      dialog: false,
      ProjectRoleList: [],
      taskHistoryData: [],
      projectRole: "",
      userId: {
        id: this.$route.params.id,
      },
      dateFormatConfig: {
        dayOfWeekNames: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        dayOfWeekNamesShort: ["Su", "Mo", "Tu", "We", "Tr", "Fr", "Sa"],
        monthNames: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        monthNamesShort: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    };
  },
  methods: {
    async taskHistory() {
      try {
        const id = this.$route.params.id;
        const response = await ApiService("task/getTaskHistory/" + id, "GET");

        this.taskHistoryData = response;
        this.length = this.taskHistoryData.length;
      } catch (error) {
        Vue.$toast.warning("Failed to load data", {
          position: "top",
        });
      }
    },

    async ProjectStatus() {
      try {
        const id = this.$route.params.id;
  

        const response = await ApiService(
          "/project/overallProjectStatus/" + id,
          "GET"
        );
  if(response.statusCode==52){
    this.$router.push("/DashBoardViewPage");
  }
        this.projectStatus = response;
       
          this.inProgress =
            (this.projectStatus.inProgress * 100) /
            this.projectStatus.total_task;
          this.closed = Math.floor(
            this.projectStatus.total_task
              ? (this.projectStatus.closed * 100) /
                  this.projectStatus.total_task
              : 0
          );
          this.openTask =
            (this.projectStatus.openTask * 100) / this.projectStatus.total_task;
          this.resolved =
            (this.projectStatus.resolved * 100) / this.projectStatus.total_task;
            this.projectRole = localStorage.getItem("projectRole");
      } catch (error) {
        Vue.$toast.warning("Failed to load data", {
          position: "top",
        });
      }
    },
    loadMore() {
      if (this.lengthTask > this.taskHistoryData.lengthTask) return;
      this.lengthTask = this.lengthTask + 3;
    },
    loadLess() {
      if (this.lengthTask < this.taskHistoryData.lengthTask) return;
      this.lengthTask = 5;
    },
    async dlt() {
      try {
        const id = this.$route.params.id;
        const URL = "/project/project/" + id;
        const response = await ApiService(URL, "DELETE");
        if (response.statusCode == 200) {
          Vue.$toast.success("Project Deleted Successfully", {
            position: "top",
          });
          this.$router.push("/DashBoardViewPage");

        }
        this.confirmation = false;
      } catch (error) {
        Vue.$toast.warning("Error", {
          position: "top",
        });
      }
    },
    async GetProjectRole() {
      const response = await ApiService(
        "/project/projectRole/" + this.$route.params.id,
        "GET"
      );
      if(response.statusCode==399){
    this.$router.go("/DashBoardViewPage");
  }
      this.ProjectRoleList = response;
      localStorage.setItem(
        "projectRole",
        JSON.stringify(response.project_role)
      );
    },

    ProjectDelete(id) {
      this.confirmation = true;
      this.project_id = id;
    },
    onClose() {
      this.confirmation = false;
      this.project_id = null;
    },
  },

  mounted() {
    this.projectRole = localStorage.getItem("projectRole");
    this.ProjectStatus();
    this.GetProjectRole
    setTimeout(() => {
      this.taskHistory();

}, 100);
   
  },
  computed: {
    TaskHistoryLoaded() {
      return this.taskHistoryData.slice(0, this.lengthTask);
    },
  },
};
</script>

<style scoped>

#f1 {
  font-size: larger;
  font-weight: bold;
}
#f2 {
  font-size: medium;
  font-weight: 500;
}
#frame {
  box-sizing: border-box;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: aliceblue;
  width: 70%;
  height: fit-content;
}
#filter {
  margin-left: 750px;
  margin-top: -31px;
}
#btn {
  margin-left: 2%;
}
#pfil {
  margin-left: 3%;
}
.modal {
  height: 50%;
}
.WordBreak{
  overflow-wrap: break-word;  
    word-wrap: break-word; 
    word-break: break-word;

}

</style>
