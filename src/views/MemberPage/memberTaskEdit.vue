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
                <v-img src="../../assets/Images/logo.png" width="50"></v-img>
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
              <v-col class="d-flex" cols="6" sm="2">
                <v-select
                  background-color="white"
                  :items="options"
                  v-model="this.taskdata.category"
                  label="category"
                  :rules="categoryRules"
                  :error-messages="categoryError"
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
                      <v-menu
                        ref="menu3"
                        v-model="menu3"
                        :close-on-content-click="false"
                        :return-value.sync="taskdata.task_deadline"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="taskdata.task_deadline"
                            label="deadline"
                            prepend-inner-icon="mdi-calendar"
                            :rules="deadlineRules"
                            :error-messages="deadlineError"
                            readonly
                            outlined
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          :min="new Date().toISOString().substr(0, 10)"
                          v-model="date2"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu3 = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu3.save(date2)"
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
                        :rules="hoursRules"
                        :error-messages="hoursError"
                        label="estimatedHours"
                        outlined
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6" lg="6" md="6" sm="6">
                      <v-file-input
                        v-model="files"
                        :rules="filesRules"
                        :error-messages="filesError"
                        counter
                        label="File input"
                        multiple
                        placeholder="Select your files"
                        outlined
                        :show-size="1000"
                      >
                        <template v-slot:selection="{ index, text }">
                          <v-chip
                            v-if="index < 2"
                            color="blue "
                            dark
                            label
                            small
                          >
                            {{ text }}
                          </v-chip>

                          <span
                            v-else-if="index === 2"
                            class="text-overline grey--text text--darken-3 mx-2"
                          >
                            +{{ files.length - 2 }} File(s)
                          </span>
                        </template>
                      </v-file-input>
                    </v-col>
                  </v-row>

                  <v-row align="center" justify="space-around">
                    <v-btn color="#4fa5d6" v-on:click="edit">Save</v-btn>
                    <router-link :to="'/taskupdation/' + this.$route.params.id">
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
import sideNavigation from "./MemberSideNav.vue";
import topNavigation from "./MemberTopNav.vue";
import Vue from "vue";
import "vue-toast-notification/dist/theme-sugar.css";
import VueToast from "vue-toast-notification";
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
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        // The configuration of the editor.
      },
      isValid: false,
      menu3: false,
      menu2: false,
      menu: false,
      menu1: false,
      files: [],
      assignee: "",

      taskdata: {
        end_date: "",
        start_date: "",
        estimated_hours: "",
        task_name: "",
        category: "",
        task_description: "",
        task_deadline: "",
      },

      priority: [
        { value: 1, text: "Low" },
        { value: 2, text: "Normal" },
        { value: 3, text: "High" },
      ],

      typeRules: [(v) => !!v || "Task Type is required"],
      hoursRules: [(v) => !!v || "Hours is required"],
      subjectRules: [
        (v) => !!v || "Subject is required",
        (v) =>
          (v && v.length <= 10) || "Subject must be less than 10 characters",
      ],
      discriptionRules: [
        (v) => !!v || "Description is required",
      ],
      priorityRules: [(v) => !!v || "Priority  is required"],
      categoryRules: [(v) => !!v || "Category  is required"],
      assigneeRules: [(v) => !!v || "Assignee  is required"],
      startDateRules: [(v) => !!v || "Start Date  is required"],
      endDateRules: [(v) => !!v || "End Date  is required"],
    };
  },
  methods: {
    async getdetails() {
      try {
        const tid = this.$route.params.id;

        const response = await ApiService(
          "task/getTask/" + tid,
          "GET",

          null,
          null
        );
        const formatedStartDate = response.start_date
          ? moment(response?.start_date).format("YYYY-MM-DD")
          : "";
        const formatedEndDate = response.end_date
          ? moment(response?.end_date).format("YYYY-MM-DD")
          : "";
        const formatedDeadLine = response.task_deadline
          ? moment(response?.task_deadline).format("YYYY-MM-DD")
          : "";
        this.taskdata.category = response.category;
        this.taskdata.end_date = formatedEndDate;
        this.taskdata.start_date = formatedStartDate;
        this.taskdata.estimated_hours = response.estimated_hours;
        this.taskdata.task_name = response.task_name;
        this.taskdata.task_description = response.task_description;
        this.taskdata.task_deadline = formatedDeadLine;
        this.taskdata.priority = response.priority;
      } catch (error) {
        console.log(error, "error................");
        this.isFetching = false;
      }
    },

    async edit() {
      try {
        const tid = this.$route.params.id;

        const response = await ApiService(
          "task/updateTask/" + tid,
          "PUT",
          this.taskdata,
          null,
          null
        );
        this.taskData = response;


        if (response.status == 21) {
          Vue.$toast.warning("Invalid Access", {});
        } else {
          Vue.$toast.success("User updated Successfully", {
            position: "top",
          });

          this.$router.push("/taskupdation/" + this.$route.params.id);
        }
      } catch (error) {
        console.log(error, "error................");
        this.isFetching = false;
      }
    },

    async getProjectDetails() {
      try {
        const id = this.$route.params.id;
        const response = await ApiService("/admin/project/" + id, "GET");

        this.ProjectData = response;
      } catch (error) {
        console.log(error, "error................");
      }
    },

    async getCategoryType() {
      try {
        const response = await ApiService("/admin/getCategory/", "GET");
        this.categoryData = response;
      } catch (error) {
        console.log(error, "error................");
      }
    },
    async getUser() {
      try {
        // const id = this.$route.params.id;

        const response = await ApiService("admin/Usersprojects/1", "GET", null);

        if (response?.userList?.length !== 0) {
          this.user_list = response?.userList;
        }
      } catch (error) {
        console.log(error, "error................");
      }
    },

    show() {},
  },
  beforeMount() {
    this.getProjectDetails();
    this.getdetails();
    this.getUser();
    this.getCategoryType();
  },
  computed: {
    assigne() {
      console.log(this.user_list[1]);
      let opts = [];
      for (let i = 0; i <= this.user_list.length - 1; i++) {
        opts.push({
          text: this.user_list[i].user_name,
          value: this.user_list[i].role,
        });
      }
      return opts;
    },
    options() {
      console.log(this.categoryData[1]);
      let opts = [];
      for (let i = 0; i <= this.categoryData.length - 1; i++) {
        opts.push({
          text: this.categoryData[i].category_name,
          value: this.categoryData[i].category_id,
        });
      }
      return opts;
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
  