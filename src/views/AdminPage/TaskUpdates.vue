<template>
  <div
    class="
      app-container app-theme-white
      body-tabs-shadow
      fixed-sidebar fixed-header
    "
  >
    <topNavigation />

    <div class="app-main">
      <sideNavigation />
      <div class="app-main__outer">
        <div class="app-main__inner">
          <div class="app-page-title bg-light p-1">
            <div class="page-title-wrapper">
              <div class="page-title-heading">
                <router-link exact :to="'/HomePage/' + this.$route.params.id">
                <v-img src="../../assets/Images/logo.png" width="50"></v-img></router-link>
                <div>
                  {{ ProjectData?.project_name }} (
                  {{ ProjectData?.project_code }})
                </div>
              </div>
            </div>
          </div>
          <!---------------------------------------------------section starts----------------------------------------------------------------------------------------->
          <div>
            <div class="maintitle">
              <div class="title1">
                <div>
                  <template
                    ><span v-if="taskData?.category == 1">
                      <v-chip class="ma-2" color="error" outlined> Bug </v-chip>
                    </span>
                    <span v-if="taskData?.category == 2">
                      <v-chip class="ma-2" color="error" outlined>
                        Developer Issue
                      </v-chip>
                    </span>

                    <span v-if="taskData?.category == 3">
                      <v-chip class="ma-2" color="primary" outlined>
                        Request
                      </v-chip>
                    </span>
                    <span v-if="taskData?.category == 4">
                      <v-chip class="ma-2" color="primary" outlined>
                        Task
                      </v-chip>
                    </span>
                    <span v-if="taskData?.category == 5">
                      <v-chip class="ma-2" color="primary" outlined>
                        Other
                      </v-chip>
                    </span>
                  </template>
                </div>

                <div></div>
              </div>
              <div class="subtitle">
                <h5>{{ taskData?.task_name }}</h5>
                <div>
                  <div class="editdelete">
                
                    <router-link class="text"
                      :to="
                        '/edittask/' +
                        this.$route.params.id +
                        '/' +
                        this.$route.params.task_id
                      "
                    >
                   
                      <v-btn rounded x-small v-show="projectRole != 5" title="Edit"
                        ><v-icon>mdi-lead-pencil</v-icon></v-btn
                      >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     

                    </router-link>
 

                    <v-btn
                      v-show="projectRole != 5"
                      rounded
                      x-small
                      @click="confirmdelete"
                      title="Delete"
                    >
                      <v-icon>mdi-delete-circle</v-icon>
                    </v-btn>
                  </div>

                  <v-dialog v-model="alertDialog" persistent max-width="500">
                    <v-card>
                      <v-card-title class="text-h5">
                        <p>The task is in inprogress state...</p>
                        <p>Are you sure you want
                        to delete this?</p> 
                      </v-card-title>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="red darken-1"
                          text
                          @click="alertDialog = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          color="green darken-1"
                          text
                          @click="
                            alertDialog = false;
                            dialog = true;
                          "
                        >
                          Ok
                        </v-btn>
                      </v-card-actions>
                    </v-card>

                    <!--------------------------------------------------------------->
                  </v-dialog>
                  <v-dialog v-model="dialog" persistent max-width="290">
                    <v-card>
                      <v-card-title class="text-h5">
                        Are you sure ?
                      </v-card-title>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="red darken-1"
                          text
                          @click="dialog = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn color="green darken-1" text @click="deletetask">
                          Ok
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                    <!--------------------------------------------------------------->
                  </v-dialog>

                  <!----------------------------------------change--------------------------------->
                </div>
              </div>

              <div class="taskcontent">
                <!-----------------------accound section---------------------->

                <div class="taskassignee">
                  <div class="acnt">
                    <div>
                      <v-img
                        src="../../assets/Images/profile1.png"
                        width="70"
                      ></v-img>
                    </div>
                    <v-col cols="12" sm="6">
                      <h5>{{ taskData?.assignee }}</h5>
                    </v-col>
                  </div>
                </div>
                <!-----------------description---------------------------------------->

                <div>
                  <div>
                    <div
                      class="discription"
                      v-html="taskData?.task_description"
                    ></div>
                    <!------------------------------------------------------------------>

                    <div class="tdata" >
                      <template>
                        <v-row>
                          <v-col cols="6">
                            <template>
                              <div class="gridleft1">
                                <v-row>
                                  <v-col cols="6" sm="3">
                                    <span>Priority : </span>
                                  </v-col>
                                  <v-col cols="6" sm="3">
                                    {{ findpriority(taskData?.priority) }}
                                  </v-col>
                                </v-row>
                              </div>
                            </template>
                          </v-col>
                          <v-col cols="6">
                            <template>
                              <div class="gridright1">
                                <v-row>
                                  <v-col cols="6" sm="3">
                                    <span>Assignee : </span>
                                  </v-col>
                                  <v-col cols="6" sm="3">
                                    {{ taskData?.assignee }}
                                  </v-col>
                                </v-row>
                              </div>
                            </template>
                          </v-col>
                        </v-row>
                      </template>
                      <template>
                        <v-row>
                          <v-col cols="6">
                            <template>
                              <div class="gridleft">
                                <v-row>
                                  <v-col cols="6" sm="3">
                                    <span>Category : </span>
                                  </v-col>
                                  <v-col cols="6" sm="3">
                                    {{ findCategory(taskData?.category) }}
                                  </v-col>
                                </v-row>
                              </div>
                            </template>
                          </v-col>
                          <v-col cols="6">
                            <template>
                              <div class="gridleft">
                                <v-row>
                                  <v-col cols="6" sm="3">
                                    <span>Task status : </span>
                                  </v-col>
                                  <v-col cols="6" sm="3">
                                    {{ findStatus(taskData?.task_status) }}
                                  </v-col>
                                </v-row>
                              </div>
                            </template>
                          </v-col>
                        </v-row>
                      </template>
                      <template>
                        <v-row>
                          <v-col cols="6">
                            <template>
                              <div class="gridleft">
                                <v-row>
                                  <v-col cols="6" sm="3">
                                    <span>Start Date : </span>
                                  </v-col>

                                  <v-col cols="6" sm="3">
                                    {{ taskData?.start_date }}
                                  </v-col>
                                </v-row>
                              </div>
                            </template>
                          </v-col>
                          <v-col cols="6">
                            <template>
                              <div class="gridleft">
                                <v-row>
                                  <v-col cols="6" sm="3">
                                    <span>End Date : </span>
                                  </v-col>
                                  <v-col cols="6" sm="3">
                                    {{ taskData?.end_date }}
                                  </v-col>
                                </v-row>
                              </div>
                            </template>
                          </v-col>
                        </v-row>
                      </template>
                      <template>
                        <v-row>
                          <v-col cols="6">
                            <template>
                              <div class="gridright">
                                <v-row>
                                  <v-col cols="6" sm="3">
                                    <span>Actual Hours : </span>
                                  </v-col>
                                  <v-col cols="6" sm="3">
                                    {{ taskData?.actual_hours }}
                                  </v-col>
                                </v-row>
                              </div>
                            </template>
                          </v-col>
                          <v-col cols="6">
                            <template>
                              <div class="gridleft">
                                <v-row>
                                  <v-col cols="6" sm="4">
                                    <span>Estimated Hours : </span>
                                  </v-col>
                                  <v-col cols="6" sm="4">
                                    {{ taskData?.estimated_hours }}
                                  </v-col>
                                </v-row>
                              </div>
                            </template>
                          </v-col>
                        </v-row>
                      </template>
                      <template>
                        <v-row> </v-row>
                      </template>
                    </div>
                  </div>
                  <br><br>
                  <!-- <v-btn @click="show" class="upbtn">
                    <v-icon>mdi-apple-keyboard-control</v-icon>
                  </v-btn> -->
                </div>
              </div>
              <div class="attachment">
                <template>
                  <template>
                    <div class="attachmentdiv">
                      <v-btn
                        @click="
                          expand = !expand;
                          expand2 = false;
                        "
                      >
                        <v-icon>mdi-attachment</v-icon>
                        <span>Attachment</span></v-btn
                      >

                      <v-expand-transition>
                        <v-card
                          style="overflow: scroll"
                          max-height="100"
                          v-show="expand"
                          height="100"
                          width="100%"
                          class="mx-auto"
                        >
                         
                  
                          <template>
                            <v-data-table
                    :headers="headers"
                    :items="file_list.files"
                    :items-per-page="20"
                    class="elevation-1"
                    :hide-default-footer="true"
                    v-model="files"
                    item-key="file_id"
                    @click:row="handleClick"
                  >
                    <template v-slot:[`item.name`]="{ item }">
                      <a @click="openfile(item)">{{ item.file_name }}</a>
                    </template>
                    </v-data-table>
                            
                          </template>
                        </v-card>
                      </v-expand-transition>
                    </div>
                  </template>
                </template>
              </div>
              <div class="cmts">
                <p>Comments</p>
                <div class="cmtdiv"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="footer1">
          <v-footer padless fixed style="left: 272px ;right:4px">
            <div class="firstshow" v-show="showText">
              <v-btn rounded class="attachmentbtn"
                ><v-icon>mdi-paperclip</v-icon></v-btn
              >

              <v-text-field
                outlined
                placeholder="Write a comment,use @mention to notify a colleague..........."
                disabled
              ></v-text-field>
              <v-btn class="attachmentbtn" @click="showText = !showText"
                ><v-icon>mdi-message-draw</v-icon>Change Status</v-btn
              >
            </div>

            <div class="ckeditor" v-show="!showText"   >
              <div class="ckmain">
                <v-col>
                  <ckeditor
                    :editor="editor"
                    v-model="editorData"
                    :config="editorConfig"
                    placeholder="Write a comment,use @mention to notify a colleague..........."
                  ></ckeditor>
                  <v-text-field
                    outlined
                    placeholder="Notify comment to:"
                  ></v-text-field>
                </v-col>
              </div>
              <div class="quater">
                <div class="status">
                  <v-select
                    :items="taskstatus"
                    v-model="taskdata.task_status"
                    label="Task Status"
                    :rules="taskstatusRules"
                    :error-messages="taskstatusError"
                    outlined
                  ></v-select>


                
                </div>
                <div class="statusform">
                  <div class="styledate">
                    <v-select
                      :items="assigne"
                      v-model="taskdata.assignee"
                     
                      :rules="assigneeRules"
                      :error-messages="assigneeError"
                      label="Assignee"
                      outlined
                    ></v-select>
                  </div>
                </div>
                <div class="csbtn">
                  <v-btn @click="showText = !showText" color="#4fa5h6"
                    >Back</v-btn
                  >&nbsp;&nbsp;

                  <v-btn color="#4fa5d6" @click="editstatus " >Submit</v-btn>
                </div>
              </div>
            </div>
          </v-footer>
        </div>
      </div>
    </div>
  </div>
</template>
                  
               

          <!--------------------------------------------------------section Ends-------------------------------------------------------------------------------------->
          


<script >
import sideNavigation from "../AdminPage/adminSideNav.vue";
import topNavigation from "../AdminPage/adminTopNav.vue";
import ApiService from "@/service/apiservice";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Vue from "vue";
import "vue-toast-notification/dist/theme-sugar.css";
import VueToast from "vue-toast-notification";
Vue.use(VueToast);
export default {
  components: { sideNavigation, topNavigation },
  data() {
    return {
      showText: true,
      ProjectData: [],
      taskData: [],
      files: [],
      tid: "",
      shown: true,
      expand: false,
      expand2: false,
      dialog: false,
      alertDialog: false,
      user_list: [],
      editor: ClassicEditor,
      editorData: "",
      projectRole: "",
      statusDialog: false,
      valid: true,

      taskstatus: [
        { value: 1, text: "Open" },
        { value: 2, text: "Inprogress" },
        { value: 3, text: "Resolved" },
        { value: 4, text: "Closed" },
      ],
      assignielist: [],

      taskdata: {
        task_status: null,
        assignee: null,
      },
    

      headers: [
       


        { text: "File Name", value: "name", sortable: false },

    
      ],
     
      file_list: { files: [] },

      editorConfig: {},

      projectId: JSON.parse(localStorage.getItem("projectId")),
      taskstatusRules: [(v) => !!v || "Task status is required"],
    };
  },

  methods: {
    async editstatus() {
      try {
        this.tid = this.$route.params.task_id;
        this.assigne=""
        console.log(this.tid,",,,,,,,,,,,,,,,,,,,,,,,,")
        console.log(this.taskdata,",,,,,,,,,,,,,,,,,,,,,,,,")
        const response = await ApiService(
          "task/changeStatus/" + this.tid,
          "PUT",
          this.taskdata
        );
          console.log(this.taskdata,"''''''''''''''''''''''''''''''")
        if (response.task_id == this.tid) {
          Vue.$toast.success("Status changed successfully", {
            position: "top",
            
          });
          this.$router.push("/TaskView/" + this.$route.params.id);

          // this.showText= true
          // this.getdetails()
   
        } else {
          Vue.$toast.warning("Status change failed", {
            position: "top",
          });
        }

        console.log(response);
      } catch (error) {
        console.log(error,);
      }
    },

    async GetProjectRole() {
      const response = await ApiService(
        "/project/projectRole/" + this.$route.params.id,
        "GET"
      );
      this.ProjectRoleList = response;
      localStorage.setItem(
        "projectRole",
        JSON.stringify(response.project_role)
      );
    },
    handleClick(value) {
      console.log(value);
      
    },

    findCategory(value) {
      if (value === 1) {
        return "Bug";
      } else if (value === 2) {
        return "Developer issue";
      } else if (value === 3) {
        return "Request";
      } else if (value === 4) {
        return "Task";
      } else if (value === 5) {
        return "Other";
      }
    },

    findpriority(value) {
      if (value === 3) {
        return "High";
      } else if (value === 2) {
        return "Normal";
      } else if (value === 1) {
        return "Low";
      }
    },

    findStatus(value) {
      if (value === 1) {
        return "Open";
      } else if (value === 2) {
        return "Inprogress";
      } else if (value === 3) {
        return "Resolved";
      } else if (value === 4) {
        return "Closed";
      }
    },
    async getdetails() {
      try {
        const tid = this.$route.params.task_id;
        const response = await ApiService(
          "task/getTask/" + tid,
          "GET",
          null,
          null,

          null
        );
        this.taskData = response.taskDetails;
        console.log(this.taskData,"QWEHUWHBFHr///////////////////")
        this.taskdata.task_status = response.taskDetails.task_status;
        this.taskdata.assignee = response?.taskDetails.assignee_id||null;
        console.log(response?.taskDetails.assignee_id||null,"ghjkl;");
      } catch (error) {
        console.log(error, "error................");
        this.isFetching = false;
      }
    },
    openfile(data) {
      console.log(data?.file_path, "(data?.file_path");
      window.open(`${data?.file_path}`);
      
      
    },

    async getProjectDetails(id) {
      try {
        const response = await ApiService(
          "/project/overallProjectStatus/" + id,
          "GET"
        );
        this.ProjectData = response;
        console.log(response);
      } catch (error) {
        console.log(error, "error................");
      }
    },
    async confirmdelete() {
      const tid = this.$route.params.task_id;
      const response = await ApiService("/task/confirmDelete/" + tid, "GET");
      console.log(response, "get confirm response...........................");
      if (response.statusCode === 200) {
        this.dialog = true;
      } else {
        this.alertDialog = true;
      }
    },

    async deletetask() {
      try {
        const tid = this.$route.params.task_id;
        const response = await ApiService("/task/deleteTask/" + tid, "PUT");
        this.dialog = false;
        this.$router.push("/TaskView/" + this.projectId);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },

    async gettaskfile() {
      try {
        const tid = this.$route.params.task_id;
        const response = await ApiService("task/getTask/" + tid, "GET");

        console.log(response);
        // this.fileData = response.fileDetails.files;
        this.file_list = { files: response?.fileDetails.files };

     
        console.log(this.file_list, "taskdata...............task");
        
        
      } catch (error) {
        console.log(error);
      }
    },
    async getUser() {
      try {
        const id = this.$route.params.id;

        const response = await ApiService(
          "project/Usersprojects/" + id,
          "GET",
          null
        );

        if (response?.userlist?.length !== 0) {
          this.user_list = response?.userlist;
          console.log(response, "responseeeeeeeeeeeeeee");
          console.log(this.user_list, " this.user_list .................");
        }
      } catch (error) {
        console.log(error, "error................");
      }
    },

    show() {
      this.shown = !this.shown;
    },
  },
  mounted() {
    const pId = localStorage.getItem("projectId");
    this.getProjectDetails(pId);
    this.projectRole = localStorage.getItem("projectRole");

    this.GetProjectRole();
    this.getdetails();
    this.getUser();
    this.gettaskfile();
  },
  computed: {
    assigne() {
      let datavlues = [];
      // let index=0
      this.user_list?.map((data) => {
        // index++
        datavlues.push({
          value: data?.user?.user_id,
          text: data?.user?.user_name,
        });
      });

      console.log(this.user_list, "opts.................");
      console.log(datavlues);
      return datavlues;
    },

    getUserId(name) {
      let id = 0;
      this.user_list?.map((data) => {
        if (name == data?.user?.user_name) {
          id = data?.user?.user_id;
        }
      });
      return id;
    },
  },
};
</script>

<style scoped>
.maintitle {
  width: 100%;
  height: 10%;
}
.subtitle {
  display: flex;
  justify-content: space-between;
}
.taskcontent {
  width: 100%;
  margin-top: 2%;
  border: 1px solid gray;
  padding: 2rem;
}
.taskassignee {
  height: 20%;
  margin-top: 1%;
  display: flex;
  justify-content: space-between;
}
.acnt {
  display: flex;
  width: 36%;
}

.discription {
  margin-top: 2%;
  width: 100%;
}
.qbtn {
  justify-content: space-between;
  margin-right: 22px;
}
.v-hidden {
  visibility: hidden;
}
.title1 {
  display: flex;
  justify-content: space-between;
}

.gridleft {
  margin-top: 3%;
  border-bottom: 1px solid rgb(124, 109, 109);
}
.gridright {
  margin-top: 3%;
  border-bottom: 1px solid rgb(124, 109, 109);
}
.gridleft1 {
  margin-top: 3%;

  border-bottom: 1px solid rgb(124, 109, 109);
  /* height: 100%; */
}
.gridright1 {
  margin-top: 3%;

  border-bottom: 1px solid rgb(124, 109, 109);
}
.upbtn {
  width: 100%;
  margin-top: 2%;
  box-shadow: none;
}
.attachment {
  margin-top: 2%;
}
/* .attachmentdiv{
  border: 1px solid gray;
} */
.cmts {
  margin-top: 1%;
    margin-bottom: 7%;
}

.cmtdiv {
  border: 1px solid gray;
}
.footer1 {
  margin-top: 2%;
  width: 100%;
 
  margin-left: 2%;
  bottom: 0;
  background: white;
 
}
.attachmentbtn {
  box-shadow: none;
}
.btnattachment {
  margin-left: 92%;
  margin-top: 2.5%;
}
.btnattachment1 {
  margin-left: 90.5%;
  margin-top: 2.5%;
}
/* ckeditor */
.ckeditor {
  display: flex;
  flex-direction: row;
  height: 10%;
  width: 100%;
}
.ckmain {
  width: 75%;
}
.quater {
  width: 30% !important;
  margin-top: 2%;
}
.statusform {
  display: flex;
  flex-direction: column;
}
.estact {
  display: flex;
}
.styledate {
  display: flex;
}
.firstshow {
  width: 100%;
  display: flex;
  margin-left: 20px;
}

.sform {
  display: flex;
}
.csbtn {
  justify-content: center;
}
.editdelete {
  display: flex;
}
.status{
  position:relative;
}


.text{
  text-decoration: none;
}

/* .v-footer{
  left:13%;
} */
</style>