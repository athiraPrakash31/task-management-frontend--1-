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
      <div class="app-main__outer">
        <div class="app-main__inner">
          <div class="app-page-title bg-light p-1">
            <div class="page-title-wrapper">
              <div class="page-title-heading">
                <v-img src="../../assets/Images/logo.png" width="50"></v-img>
                <div>
                  {{ ProjectData?.project_name }} (
                  {{ ProjectData?.project_code }})
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
                <div v-for="Data in taskHistoryData" :key="Data.id">
                  <div class="card cardMsg mb-3 widget-content">
                    <v-avatar>
                      <img src="../../assets/Images/profilepic.png" alt="John" />
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
                          <div class="widget-subheading">Revenue streams</div>

                          <div class="widget-subheading">about 3 hours ago</div>
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
                          <div class="widget-subheading">Revenue streams</div>

                          <div class="widget-subheading">about 3 hours ago</div>
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
                          <div class="widget-subheading">Revenue streams</div>

                          <div class="widget-subheading">about 3 hours ago</div>
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
                          <div class="widget-subheading">Revenue streams</div>

                          <div class="widget-subheading">about 3 hours ago</div>
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
                          <div class="widget-subheading">Revenue streams</div>

                          <div class="widget-subheading">about 3 hours ago</div>
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
                          <div class="widget-subheading">Revenue streams</div>

                          <div class="widget-subheading">about 3 hours ago</div>
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
                            ></v-badge>and <v-badge
                              color="warning"
                              content="Assigned"
                              left
                              inline
                            ></v-badge>
                            a Task
                          </div>
                          <div class="widget-subheading">Revenue streams</div>

                          <div class="widget-subheading">about 3 hours ago</div>
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
                          <div class="widget-subheading">Revenue streams</div>

                          <div class="widget-subheading">about 3 hours ago</div>
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
                            ></v-badge>and <v-badge
                              color="warning"
                              content="Re-Assign"
                              left
                              inline
                            ></v-badge>
                            Task status
                          </div>
                          <div class="widget-subheading">Revenue streams</div>

                          <div class="widget-subheading">about 3 hours ago</div>
                        </div>
                       
                        </div>
                      </div>
                      
                    </div>
                   
                  </div>
                  <div v-if="length==0" style="margin-left: 40%;">
                          <p>No data Available </p>
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
                <div class="widget-content">
                  <div class="widget-content-outer">
                    <div class="widget-content-wrapper">
                      <div class="widget-content-left pr-2 fsize-1"></div>
                      <div class="widget-content-right w-100">
                        <div class="progress-bar-xs progress">
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
                          <div class="sub-label-right">closed {{closed}}%</div>
                          &nbsp;&nbsp;&nbsp;
                        </div>
                        <div class="text-center d-flex">
                          <div class="sub-label-right">
                            Open:
                            <div class="badge badge-danger mr-2">
                              {{ ProjectData.openTask }}
                            </div>
                          </div>
                          <br />

                          <div class="sub-label-right">
                            In Progress:
                            <div class="badge badge-primary mr-2">
                              {{ ProjectData.inProgress }}
                            </div>
                          </div>
                        
                          <br />
                          <div class="sub-label-right">
                            Resolved:
                            <div class="badge badge-warning mr-2">
                              {{ ProjectData.resolved }}
                            </div>
                          </div>
                          <br />
                          <div class="sub-label-right">
                            Closed:
                            <div class="badge badge-success mr-2">
                              {{ ProjectData.closed }}
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
                      <div class="widget-content-outer">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left">
                            <div class="widget-heading">
                              {{ ProjectData?.project_name }}
                            </div>
                            <div class="widget-subheading">
                              {{ ProjectData?.project_code }}
                            </div>
                            <br />
                            <p>{{ ProjectData?.project_description }}</p>
                            <br />
                            <div class="widget-subheading">
                              Start Date: {{ ProjectData?.start_date }}
                            </div>
                            <div class="widget-subheading">
                              End Date: {{ ProjectData?.end_date }}
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
import sideNavigation from "./SideNav.vue";
import topNavigation from "./topNav.vue";
import ApiService from "../../service/apiservice";

export default {
  
  components: { sideNavigation, topNavigation },
  data() {
    return {
      
      status: {
        resolved: Number,
        closed: Number,
        inProgress: Number,
        openTask: Number,
      },
      dialogCompose: false,
      width:20,
      confirmation: false,
      ProjectData: [],
      taskHistoryData: [],
      projectStatus: [],
      dialogm1: "",
      length:0,
      dialog: false,
      userId: {
        id: this.$route.params.id,
      },
    };
  },
  methods: {

    
    currentDate() {
      const current = new Date();

      const date = `${current.getDay()}-${current.getDate()}-${
        current.getMonth() + 1
      }-${current.getFullYear()}`;

      return date;
    },

    async taskHistory() {
      try {
        const id = this.$route.params.id;
        const response = await ApiService("task/getTaskHistory/" + id, "GET");

        this.taskHistoryData = response;
         this.length=this.taskHistoryData.length;
       
        console.log(this.ProjectData);
      } catch (error) {
        console.log(error, "error................");
      }
    },
    async ProjectDetails() {
      try {
        const id = this.$route.params.id;
        const response = await ApiService(
          "/project/overallProjectStatus/" + id,
          "GET"
        );

        this.ProjectData = response;
        this.inProgress =
          (this.ProjectData.inProgress * 100) / this.ProjectData.total_task;
        this.closed =
          (this.ProjectData.closed * 100) / this.ProjectData.total_task;
        this.openTask =
          (this.ProjectData.openTask * 100) / this.ProjectData.total_task;
        this.resolved =
          (this.ProjectData.resolved * 100) / this.ProjectData.total_task;
      } catch (error) {
        console.log(error, "error................");
      }
    },

    onClose() {
      this.confirmation = false;
      this.project_id = null;
    },
  },

  beforeMount() {
    this.ProjectDetails();
    this.taskHistory();
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
</style>
  