<template>
  <div class="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
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
                  {{ ProjectData?.project_name }} ( {{ ProjectData?.project_code }})
                </div>
              </div>
            </div>

            <template v-if="value == true">
              <v-simple-table fixed-header height="700px">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th id="text-left">Task_Type</th>
                      <th id="">{{ data.category }}</th>
                    </tr>

                    <tr>
                      <th id="text-left">Task_Name</th>
                      <th  id="">{{ data.task_name }}</th>
                    </tr>
                    <tr>
                      <th id="text-left">Task_Description</th>
                      <th  id="">{{ data.task_description }}</th>
                    </tr>
                    <tr>
                      <th id="text-left">Priority</th>
                      <th  id="">{{ data.priority }}</th>
                    </tr>
                    <tr>
                      <th id="text-left">Assignee</th>
                      <th  id="">{{ assignee }}</th>
                    </tr>
                    <tr>
                      <th id="text-left">Start_Date</th>
                      <th  id="">{{ data.start_date }}</th>
                    </tr>
                    <tr>
                      <th id="text-left">End_Date</th>
                      <th  id="">{{ data.end_date }}</th>
                    </tr>
                    <tr>
                      <th id="text-left">Deadline</th>
                      <th  id="">{{ data.task_deadline }}</th>
                    </tr>
                    <tr>
                      <th id="text-left">Files</th>
                      <id>{{ data.files }}</id>
                    </tr>
                  </thead>
                  <br />
                  <v-row align="center" justify="space-around">
                    <v-btn v-on:click="value = false" color="#4fa5h6">Back</v-btn>
                    <v-btn color="#4fa5d6" v-on:click="add">Add</v-btn>
                  </v-row>
                </template>
              </v-simple-table>
            </template>
          </div>
          <v-form ref="form" @submit.prevent="add" method="post" v-if="value == false">
            <div class="addTask">
              <v-col class="d-flex" cols="6" sm="2">
                <v-select
                  background-color="white"
                  :items="category"
                  v-model="data.category"
                  label="category"
                  :rules="categoryRules"
                  :error-messages="categoryError"
                  outlined
                ></v-select>
              </v-col>

              <v-col class="d-flex" cols="12" sm="12">
                <v-text-field
                  background-color="white"
                  v-model="data.task_name"
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
                    v-model="data.task_description"
                    placeholder="Add a Description @ mentioned members"
                    :config="editorConfig"
                    :rules="discriptionRules"
                    :error-messages="discriptionError"
                  ></ckeditor>
                 
                </v-col>

                <v-col cols="12" lg="12" md="12" sm="12">
                  <v-row>
                    <v-col class="d-flex" cols="6" lg="6" md="6" sm="6">
                      <v-select
                        max-height="3%"
                        v-model="data.priority"
                        :items="priority"
                        :rules="priorityRules"
                        :error-messages="priorityError"
                        label="priority"
                        outlined
                      ></v-select>
                    </v-col>

                    <v-col class="d-flex" cols="6" lg="6" md="6" sm="6">
                      <v-select
                        max-height="3%"
                        v-model="data.assignee"
                        :items="assigne"
                        :rules="assigneeRules"
                        :error-messages="assigneeError"
                        label="assignee"
                        outlined
                      ></v-select>
                    </v-col>

                    <v-col class="d-flex" cols="6" lg="6" md="6" sm="6">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="data.start_date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date"
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
                          <v-btn text color="primary" @click="$refs.menu.save(date)">
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
                        :return-value.sync="data.end_date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date1"
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
                          <v-btn text color="primary" @click="$refs.menu2.save(date1)">
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col class="d-flex" cols="6" lg="6" md="6" sm="6">
                      <v-text-field
                        v-model="data.estimated_hours"
                        max-height="3%"
                        label="estimatedHours"
                        outlined
                      >
                      </v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="6" lg="6" md="6" sm="6">
                      <v-text-field
                        v-model="data.actual_hours"
                        max-height="3%"
                        label="actualHours"
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
                          <v-chip v-if="index < 2" color="blue " dark label small>
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
                    <v-btn v-on:click="value = true" color="#4fa5h6">Preview</v-btn>
                    <v-btn color="#4fa5d6" v-on:click="add">Add</v-btn>
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
import sideNavigation from "./SideNav.vue";
import topNavigation from "./topNav.vue";
import Vue from "vue";

import "vue-toast-notification/dist/theme-sugar.css";
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
      user_list: [],
      formSubmitted: false,
      editor: ClassicEditor,
                    editorConfig: {
                        toolbar: [ 'heading', '|', 'bold', 'italic', '|', 'bulletedList', 'numberedList', '|', 'undo', 'redo' ],
                        table: {
                            toolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
                        },
                        extraPlugins: [this.uploader],
                        language: 'nl',
                    },
      isValid: false,
      menu3: false,
      menu2: false,
      menu: false,
      menu1: false,
      files: [],

      data: {
        project_id: this.$route.params.id,
        end_date: "",
        start_date: "",
        assignee: "",
        estimated_hours: "",
        actual_hours: "",

        task_name: "",
        task_description: "",
      },

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
      hoursRules: [(v) => !!v || "Hours is required"],
      subjectRules: [(v) => !!v || "Subject is required"],
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
    async getProjectDetails(id) {
      try {
        const response = await ApiService("/project/overallProjectStatus/" + id, "GET");
        this.ProjectData = response;
      } catch (error) {
        console.log(error, "error................");
      }
    },

    submit() {
      this.formSubmitted = true;
    },

    async getUser() {
      try {
        const id = this.$route.params.id;

        const response = await ApiService("/project/Usersprojects/" + id, "GET", null);

        if (response?.userlist?.length !== 0) {
          this.user_list = response?.userlist;
        }
      } catch (error) {
        console.log(error, "error................");
      }
    },
    async add() {
      if (this.$refs.form.validate()) {
        this.isSubmit = true;
        this.$refs.form.validate();
        try {
          const response = await ApiService("task/addTask", "POST", this.data);

          this.isSubmit = false;
          this.dialog = false;
          if (response.status == 93) {
            Vue.$toast.error("task creation failed", {
              position: "top",
            });
          } else if (response.status == 51) {
            Vue.$toast.error("fields is not allowed", {
              position: "top",
            });
          } else if (response.statusCode == 200) {
            Vue.$toast.success("Task added ", {
              position: "top",
            });

            this.$router.push("/manager/taskDetail/" + this.$route.params.id+"/"+ this.$route.params.taskId);
          }
        } catch (error) {
          console.log(error.errorMessage, "error................");
        }
      }
    },
    show() {},
  },
  mounted() {
    const id = this.$route.params.id;
    this.getProjectDetails(id);
    this.getUser();
  },
  computed: {
    assigne() {
      let opts = [];
      for (let i = 0; i <= this.user_list.length - 1; i++) {
        opts.push({
          text: this.user_list[i].user_name,
          value: this.user_list[i].user.user_id,
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
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
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
