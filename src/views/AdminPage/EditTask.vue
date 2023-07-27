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
                <v-img src="../../assets/Images/logo.png" width="50"></v-img>
                </router-link>
                <div>
                  {{ ProjectData?.project_name }} (
                  {{ ProjectData?.project_code }})
                </div>
              </div>
            </div>
          </div>
          <v-form
            ref="form"
            @submit.prevent="add"
            method="post"
            v-if="value == false"
          >
            <div class="addTask">
              <v-col class="d-flex" cols="12" sm="2">
                <v-select
                  background-color="white"
                  :items="category"
                  v-model="taskdata.category"
                  label="category"
                  :rules="categoryRules"
                  :error-messages="categoryError"
                  outlined
                ></v-select>
              </v-col>
              <v-col class="d-flex" cols="6" sm="2">
                <v-select
                  :items="taskstatus"
                  v-model="taskdata.task_status"
                  label="Task Status"
                  :rules="taskstatusRules"
                  :error-messages="taskstatusError"
                  outlined
                ></v-select>
              </v-col>

              <v-col class="d-flex" cols="12" sm="12">
                <v-text-field
                  background-color="white"
                  v-model="taskdata.task_name"
                  label="subject"
                  :rules="subjectRules"
                  :error-messages="subjectError"
                  outlined
                ></v-text-field>
              </v-col>
              <v-card elevation="3"
                ><br />
                <v-col cols="12" lg="12" md="12" sm="12">
                  <ckeditor
                    :editor="editor"
                    :error-messages="discriptionError"
                    v-model="taskdata.task_description"
                    placeholder="Add a Description @ mentioned members"
                    :config="editorConfig"
                    :rules="discriptionRules"
                  ></ckeditor>
                </v-col>

                <v-col cols="12" lg="12" md="12" sm="12">
                  <v-row>
                    <v-col class="d-flex" cols="6" lg="6" md="6" sm="6">
                      <v-select
                        max-height="3%"
                        v-model="taskdata.priority"
                        :items="priority"
                        :rules="priorityRules"
                        :error-messages="priorityError"
                        label="priority"
                        outlined
                      ></v-select>
                    </v-col>
                    <v-col class="d-flex" cols="6" lg="6" md="6" sm="6">
                      <v-select
                        :items="assigne"
                        v-model="taskdata.assignee"
                        :rules="assigneeRules"
                        :error-messages="assigneeError"
                        label="Assignee"
                        outlined
                      ></v-select>
                    </v-col>

                    <v-col class="d-flex" cols="6" lg="6" md="6" sm="6">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="taskdata.start_date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="taskdata.start_date"
                            label="startDate"
                            prepend-inner-icon="mdi-calendar"
                            :rules="startDateRules"
                            :error-messages="startDateError"
                            readonly
                            outlined
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          :min="new Date().toISOString().substr(0, 10)"
                          v-model="date"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col class="d-flex" cols="6" lg="6" md="6" sm="6">
                      <v-menu
                        ref="menu2"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :return-value.sync="taskdata.end_date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="taskdata.end_date"
                            label="endDate"
                            prepend-inner-icon="mdi-calendar"
                            readonly
                            :rules="endDateRules"
                            :error-messages="endDateError"
                            outlined
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          :min="new Date().toISOString().substr(0, 10)"
                          v-model="date1"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu2 = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu2.save(date1)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col class="d-flex" cols="6" lg="6" md="6" sm="6">
                      <v-text-field
                        v-model="taskdata.estimated_hours"
                        max-height="3%"
                        min="0"
                        max="72"
                        label="estimatedHours"
                        outlined
                      >
                      </v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="6" lg="6" md="6" sm="6">
                      <v-text-field
                        type="number"
                        min="0"
                        max="72"
                        v-model="taskdata.actual_hours"
                        max-height="3%"
                        label="actualHours"
                        outlined
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6" lg="6" md="6" sm="6">
                      <v-file-input
                        v-model="filedata.filename"
                        :rules="filesRules"
                        :error-messages="filesError"
                        label="File input"
                        multiple
                        placeholder="Select your files"
                        outlined
                        :show-size="1000"
                        accept="image/png,image/jpeg,image/jpg, application/pdf,video/mp4,text/csv"
                      
                      
                      >
                      
              
                        <!--  -->
                      </v-file-input>
                    </v-col>
                  </v-row>

                  <v-row align="center" justify="space-around">
                    <v-btn color="#4fa5d6" v-on:click="edit">Save</v-btn>
                    <router-link
                      :to="
                        '/taskupdation/' +
                        this.$route.params.id +
                        '/' +
                        this.$route.params.task_id
                      "
                    >
                      <v-btn color="#4fa5h6">Back</v-btn>
                    </router-link>
                  </v-row>
                </v-col>

                <v-card-actions>
                  <v-card-subtitle> </v-card-subtitle>
                </v-card-actions>
              </v-card>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <!--------------------------------------------functions--------------------------------------------------->
  
  <script>
import ApiService from "../../service/apiservice";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import sideNavigation from "./adminSideNav.vue";
import topNavigation from "./adminTopNav.vue";
import Vue from "vue";
import "vue-toast-notification/dist/theme-sugar.css";
import VueToast from "vue-toast-notification";
import http from "../../http-common";
Vue.use(VueToast);
import moment from "moment";
export default {
  components: {
    sideNavigation,
    topNavigation,
  },
  datas: () => ({
    ProjectData: [],
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    menu1: false,
    menu3: false,
    modal: false,
    menu2: false,
  }),
  data() {
    return {
      value: false,
      categoryData: [],
      user_list: [],
      formSubmitted: false,
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "bulletedList",
          "numberedList",
          "|",

          "undo",
          "redo",
        ],
      },

      isValid: false,
      menu3: false,
      menu2: false,
      menu: false,
      menu1: false,
      files: [],
      assignee: null,
      userList: [],

      taskdata: {
        project_id: this.$route.params.id,
        end_date: null,
        start_date: null,
        estimated_hours: null,
        task_name: null,
        category: null,
        task_description: null,
        actual_hours: null,
        task_status: null,
      },
      filedata: {
        filename: null,
      },
      taskstatus: [
        { value: 1, text: "Open" },
        { value: 2, text: "Inprogress" },
        { value: 3, text: "Resolved" },
        { value: 4, text: "Closed" },
      ],

      priority: [
        { value: 1, text: "Low" },
        { value: 2, text: "Normal" },
        { value: 3, text: "High" },
      ],
      category: [
        { value: 1, text: "Bug" },
        { value: 2, text: "Developer Issue" },
        { value: 3, text: "Request" },
        { value: 4, text: "Task" },
        { value: 5, text: "Other" },
      ],

      typeRules: [(v) => !!v || "Task Type is required"],
      subjectRules: [
        (v) => !!v || "Subject is required",
        (v) =>
          (v && v.length >= 3 && v.length <= 15) ||
          "Subject must be 3- 15 characters",
        (v) =>
          /^[a-zA-Z ]+(?:-[a-zA-Z ]+)*$/.test(v) || "Enter a valid Subject",
      ],
      discriptionRules: [
        (v) => !!v || "Description is required",
        // (v) => (v && v.length >= 5) || "Description must be  characters",
      ],
      taskstatusRules: [(v) => !!v || "Task status is required"],
      priorityRules: [(v) => !!v || "Priority  is required"],
      categoryRules: [(v) => !!v || "Category  is required"],
    };
  },
  methods: {
    async getdetails() {
      try {
        const tid = this.$route.params.task_id;
        const response = await ApiService(
          "task/getTask/" + tid,
          "GET",

          null,
          null
        );
        // console.log(response,"///////////////////////////////");
        const formatedStartDate = response.taskDetails.start_date
          ? moment(response?.start_date).format("YYYY-MM-DD")
          : null;
        const formatedEndDate = response.taskDetails.end_date
          ? moment(response?.end_date).format("YYYY-MM-DD")
          : null;

        const initialFile = response?.fileDetails?.files[0]?.file_name
        
          ? new File(
              [response?.fileDetails?.files[0]?.file_name],
              response?.fileDetails?.files[0]?.file_name,
              {
                type: "text/plain",
              }
            )
          : "";
        this.taskdata.task_status = response.taskDetails.task_status;
        this.taskdata.category = response.taskDetails.category;
        this.taskdata.end_date = formatedEndDate;
        this.taskdata.start_date = formatedStartDate;
        this.taskdata.estimated_hours = response.taskDetails.estimated_hours;
        this.taskdata.task_name = response.taskDetails.task_name;
        this.taskdata.task_description = response.taskDetails.task_description;
        this.taskdata.priority = response.taskDetails.priority;
        this.taskdata.assignee = response.taskDetails.assignee_id;
        this.taskdata.actual_hours = response.taskDetails.actual_hours;
        this.filedata.filename = initialFile;
      } catch (error) {
        console.log(error, "error................");
        this.isFetching = false;
      }
    },

    async edit() {
      try {
        const tid = this.$route.params.task_id;
        const response = await ApiService(
          "task/updateTask/" + tid,
          "PUT",
          this.taskdata,
          null,
          null
        );
        this.taskData = response;
        // console.log(this.taskData, "task data/////////////////////////");

        if (response.statusCode == 500) {
          Vue.$toast.warning("Task updation failed", {
            position: "top",
          });
        } else if (response.statusCode == 400) {
          Vue.$toast.warning("Task updation failed", {
            position: "top",
          });
        } else if (response.statusCode == 1033){
          Vue.$toast.warning("No Change in data",{
            position:"top",
          })
        }
        
        else {
          Vue.$toast.success("Task updated Successfully", {
            position: "top",
          });

          this.$router.push(
            "/taskupdation/" +
              this.$route.params.id +
              "/" +
              this.$route.params.task_id
          );
        }

        let formData = new FormData();
        const URL = "/task/upload/" + tid;
        formData.append("file", this.file);

        await http.post(URL, formData, "POST").then((response1) => {
          this.data = response1.data.error;
        });
      
      } catch (error) {
        console.log(error, "error................");
        this.isFetching = false;
      }
    },
 

    
    async getProjectDetails() {
      try {
        const id = this.$route.params.id;
        const response = await ApiService(
          "/project/overallProjectStatus/" + id,
          "GET"
        );
        this.ProjectData = response;
      } catch (error) {
        console.log(error, "error................");
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
  },
  beforeMount() {
    this.getProjectDetails();
    this.getUser();
    this.getdetails();
  },
  computed: {
    assigne() {
      let datavlues = [];
      // let datavlues = [{ text: "--------------", value: -1 }];
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

#Add {
  font-size: x-large;
  font-weight: bold;
  margin-left: 40%;
  margin-bottom: -2%;
}

label {
  font-weight: 300;
  font-size: large;
}

.form {
  margin-left: 5%;
  margin-bottom: 3%;
}

.button {
  margin-left: 35%;
}

.box {
  box-shadow: #4fa5d6 0px 0px 0px 2px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
  border: 2px solid;
  border-color: blue;
}
</style>
  