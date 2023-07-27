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
                <router-link exact :to="'/HomePage/' + this.$route.params.id">
                  <v-img src="../../assets/Images/logo.png" width="50"></v-img>
                </router-link>
                <div>
                  {{ projectStatus?.project_name }} ( {{ projectStatus?.project_code }})
                </div>
              </div>
            </div>

            <template v-if="value == true">
              <v-simple-table fixed-header height="700px">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th id="text-left">Task_Type</th>
                      <th id="">{{ findUsertype(data?.category) }}</th>
                    </tr>
                    <tr>
                      <th id="text-left">Task_Name</th>
                      <th id="">{{ data.task_name }}</th>
                    </tr>
                    <tr>
                      <th id="text-left">Task_Description</th>
                      <th id="alignment" v-html="data.task_description"></th>
                    </tr>
                    <tr>
                      <th id="text-left">Priority</th>
                      <th id="">{{ findPrioritytype(data?.priority) }}</th>
                    </tr>
                    <tr>
                      <th id="text-left">Assignee</th>
                      <th id="">{{ getAssignee(data.assignee) }}</th>
                    </tr>
                    <tr>
                      <th id="text-left">Start_Date</th>
                      <th id="">{{ data.start_date }}</th>
                    </tr>
                    <tr>
                      <th id="text-left">End_Date</th>
                      <th id="">{{ data.end_date }}</th>
                    </tr>
                    <tr>
                      <th id="text-left">Estimated_hour</th>
                      <th id="">{{ data.estimated_hours }}</th>
                    </tr>
                    <tr>
                      <th id="text-left">Actual_hour</th>
                      <th id="">{{ data.actual_hours }}</th>
                    </tr>
                    <tr>
                      <th id="text-left">Files</th>
                      <th id="">{{ files?.name }}</th>
                    </tr>
                  </thead>
                  <br />
                  <v-row align="center" justify="space-around">
                    <v-btn v-on:click="value = false" color="#4fa5h6">Back</v-btn>
                    <v-btn color="#4fa5d6" v-on:click="add1()">Add</v-btn>
                  </v-row>
                </template>
              </v-simple-table>
            </template>
          </div>
          <v-form
            ref="form"
            @submit.prevent="add"
            method="post"
            v-if="value == false"
            v-model="isValid"
          >
            <div class="addTask">
              <v-col class="d-flex" cols="6" sm="2">
                <v-autocomplete
                  background-color="white"
                  :items="category"
                  v-model="data.category"
                  v-on:keyup="checking()"
                  label="category"
                  :rules="categoryRules"
                  :error-messages="categoryError || ''"
                  outlined
                ></v-autocomplete>
              </v-col>

              <v-col class="d-flex" cols="12" sm="12">
                <v-text-field
                  background-color="white"
                  v-model="data.task_name"
                  label="subject"
                  :rules="subjectRules"
                  :error-messages="subjectError"
                  v-on:keyup="checking()"
                  outlined
                ></v-text-field>
              </v-col>
              <v-card elevation="3"
                ><br />
                <v-col cols="12" lg="12" md="12" sm="12">
                  <ckeditor
                    :editor="editor"
                    v-on:keyup="checking()"
                    v-model="data.task_description"
                    :rules="discriptionRules"
                    minLength="10"
                    maxlength="255"
                    :config="editorConfig"
                    ref="editorCk"
                  />
                </v-col>

                <v-col cols="12" lg="12" md="12" sm="12">
                  <v-row>
                    <v-col class="d-flex" cols="6" lg="6" md="6" sm="6">
                      <v-autocomplete
                        max-height="3%"
                        v-model="data.priority"
                        :items="priority"
                        :rules="priorityRules"
                        v-on:keyup="checking()"
                        label="priority"
                        outlined
                      ></v-autocomplete>
                    </v-col>

                    <v-col class="d-flex" cols="6" lg="6" md="6" sm="6">
                      <br />
                      <v-autocomplete
                        max-height="3%"
                        v-model="data.assignee"
                        v-on:keyup="checking()"
                        :items="assigne"
                        label="assignee"
                        outlined
                      ></v-autocomplete>
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
                        ref="menu1"
                        v-model="menu1"
                        :close-on-content-click="false"
                        :return-value.sync="data.end_date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date1"
                            outlined
                            label="endDate"
                            prepend-inner-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date1"
                          no-title
                          scrollablex
                          :min="data.start_date"
                          :max="projectStatus?.end_date"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu1 = false">
                            Cancel
                          </v-btn>
                          <v-btn text color="primary" @click="$refs.menu1.save(date1)">
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col class="d-flex" cols="6" lg="6" md="6" sm="6">
                      <v-text-field
                        type="number"
                        min="0"
                        max="72"
                        v-model="data.estimated_hours"
                        :rules="hoursRules"
                        max-height="3%"
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
                        v-model="data.actual_hours"
                        :rules="hoursRules"
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
                        label="File input"
                        placeholder="Select your files"
                        outlined
                        :show-size="1000"
                        accept="image/png,image/jpeg,image/jpg, application/pdf,video/mp4,text/csv"
                        v-on:change="handleFileUploads($event)"
                      >
                        <template v-slot:selection="{ index, text }">
                          <v-chip v-if="index < 2" color="blue " dark label small>
                            {{ text }}
                          </v-chip>
                        </template>
                      </v-file-input>
                    </v-col>
                  </v-row>

                  <v-row align="center" justify="space-around">
                    <v-btn
                      v-on:click="value = true"
                      color="#4fa5h6"
                      :disabled="!isValid"
                      @click="previeClick"
                      >Preview</v-btn
                    >
                    <v-btn color="#4fa5d6" v-on:click="add()" :disabled="this.addForm"
                      >Add</v-btn
                    >
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
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import ApiService from "../../service/apiservice";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import sideNavigation from "./adminSideNav.vue";
import topNavigation from "./adminTopNav.vue";
import http from "../../http-common";
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
  validations: {
    data: {
      task_description: { required, minLength: minLength(10), maxLength: maxLength(255) },
      $autodirty: true,
    },
  },
  data() {
    return {
      addForm: false,
      isValid: true,
      value: false,

      user_list: [],
      itemsDate: [],
      formSubmitted: false,
      projectStatus: [],
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

      menu3: false,
      menu2: false,
      menu: false,
      menu1: false,
      // tempFile: [],
      file: [],
      files: [],
      fileSubmit: false,
      data: {
        project_id: this.$route.params.id,
        end_date: null,
        start_date: null,
        assignee: null,
        estimated_hours: null,
        actual_hours: null,
        task_name: null,
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

      hoursRules: [
        (v) => !/^[0-9e]{10,12}$/.test(v) || "Allow digits only",
        (v) => !v || /^[0-9]{0,2}(\.[0-9]{0,2})?$/.test(v) || "Invalid hour",
        (v) => !v || (0 < v && v <= 72) || "hours should be between 0 and 72",
      ],
      subjectRules: [
        (v) => !!v || "Subject is required",
        (v) => !/^\s/.test(v) || "Invalid subject",
        (v) => (v && v.length >= 3) || "Subject must greater than 3",
        (v) => (v && v.length <= 50) || "Subject should between 3 to 50",
        (v) =>
          /^[A-Z a-z 0-9!@#$&()`.+,"-{}=<>:;]+([ _!@#$&()`.+,"-{}=<>:;]?[A-Za-z0-9!@#$&()`.+,"-{}=<>:;]+)*$/.test(
            v
          ) || "Subject should between 3 to 50",
      ],
      discriptionRules: [
        (v) => !v || "Description is required",
        (v) => !/^\s/.test(v) || "Invalid description",
        (v) => /^(.|\s)*[a-zA-Z]+(.|\s)*$/.test(v),
        (v) => (v && v.length > 10) || "Description must greater than 10",
        (v) => (v && v.length < 11) || "Description must 255 characters",
      ],

      priorityRules: [(v) => !!v || "Priority  is required"],
      categoryRules: [(v) => !!v || "Category  is required"],
    };
  },
  methods: {
    // resetImageUploader() {
    //           this.$refs.imageUploader.value = '';
    //       },
    getAssignee(id) {
      if (id == null) {
        return null;
      } else {
        let assigneeSelected = this.user_list.filter((item) => {
          if (item.user_id == id) {
            return item;
          }
        });
        return assigneeSelected[0].user_name;
      }
    },
    async getUser() {
      try {
        const id = this.$route.params.id;

        const response = await ApiService("/project/Usersprojects/" + id, "GET", null);
        console.log(response);
        if (response.length !== 0) {
          this.user_list = response;
        }
      } catch (error) {
        console.log(error, "error................");
      }
    },

    async ProjectStatus() {
      try {
        const id = this.$route.params.id;

        const response = await ApiService("/project/overallProjectStatus/" + id, "GET");

        this.projectStatus = response;
      } catch (error) {
        Vue.$toast.warning("Failed to load data", {
          position: "top",
        });
      }
    },

    submit() {
      this.formSubmitted = true;
    },

    async add() {
      if (this.$refs.form.validate()) {
        this.addForm = true;
        try {
          const response = await ApiService("task/addTask", "POST", this.data);
          if (response.statusCode == 50) {
            Vue.$toast.error("Project not found", {
              position: "top",
            });
          } else if (response.statusCode == 1) {
            console.log(response.statusCode);
            Vue.$toast.error("Mail not sent ", {
              position: "top",
            });
          } else if (response.statusCode == 1030) {
            Vue.$toast.error("Already exist this task in the project ", {
              position: "top",
            });
          } else if (response.statusCode == 69) {
            Vue.$toast.error("description should be in 10and 255 ", {
              position: "top",
            });
          } else if (response.statusCode == 708) {
            Vue.$toast.error("File not received ", {
              position: "top",
            });
          } else if (response.statusCode == 710) {
            Vue.$toast.error("Only support jpeg,jpg,png,csv,mp4,pdf", {
              position: "top",
            });
          } else if (response.statusCode == 711) {
            Vue.$toast.error("File size should be less than or equal to 200MB", {
              position: "top",
            });
          } else if (response.statusCode == 67) {
            Vue.$toast.error("actual hours should be in 0 to 72 ", {
              position: "top",
            });
          } else if (response.statusCode == 200) {
            Vue.$toast.success("New Task Created ", {
              position: "top",
            });

            this.$router.push("/TaskView/" + this.$route.params.id);
          }
          let formData = new FormData();
          const URL = "/task/upload/" + response.task_id;
          formData.append("file", this.files);
          await http.post(URL, formData, "POST").then((response1) => {
            this.data = response1.data.error;
          });
          this.isSubmit = false;
          this.dialog = false;
        } catch (error) {
          console.log(error.errorMessage, "error................");
        }
      }
    },
    async add1() {
      try {
        const response = await ApiService("task/addTask", "POST", this.data);
        if (response.statusCode == 50) {
          Vue.$toast.error("Project not found", {
            position: "top",
          });
        } else if (response.statusCode == 115) {
          Vue.$toast.error("Mail not sent ", {
            position: "top",
          });
        } else if (response.statusCode == 69) {
          Vue.$toast.error("Description should be in 10 and 255", {
            position: "top",
          });
        } else if (response.statusCode == 67) {
          Vue.$toast.error("actual hours should be in 0 to 72 ", {
            position: "top",
          });
        } else if (response.statusCode == 200) {
          Vue.$toast.success("New Task Created ", {
            position: "top",
          });

          this.$router.push("/TaskView/" + this.$route.params.id);

          let formData = new FormData();
          const URL = "/task/upload/" + response.task_id;

          formData.append("file", this.files);
          await http.post(URL, formData, "POST").then((response1) => {
            this.data = response1.data.error;
          });
          this.isSubmit = false;
          this.fileSubmit = false;
          this.dialog = false;
        }
      } catch (error) {
        console.log(error.errorMessage, "error................");
      }
    },
    handleFileUploads($event) {
      if ($event) {
        this.file = $event[0];
        this.files = $event;
        //   this.tempFile = this.files?.name;
        //   console.log(`file:${this.files?.name}`);
        // } else {
        //   console.log(`file:${this.files?.name}`);
        //   console.log("hi");
        //   this.files = this.files?.name;
      }
    },

    findUsertype(value) {
      if (value === 1) {
        return "Bug";
      } else if (value === 2) {
        return "Developer Issue";
      } else if (value === 3) {
        return "Request";
      } else if (value === 4) {
        return "Task";
      } else if (value === 5) {
        return "Others";
      }
    },
    findPrioritytype(value) {
      if (value === 1) {
        return "Low";
      } else if (value === 2) {
        return "Normal";
      } else if (value === 3) {
        return "High";
      }
    },
    checking() {
      this.addForm = false;
    },
  },
  mounted() {
    this.ProjectStatus();

    this.getUser();
    setTimeout(() => {}, 100);
  },
  computed: {
    assigne() {
      let datavlues = [];
      this.user_list?.map((data) => {
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
.error-show {
  color: red;
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
.inputFile input[type="file"] {
  z-index: -1;
  position: absolute;
  opacity: 0;
}
.inputFile input:focus + label {
  outline: 2px solid;
}
#alignment {
  word-break: break-all;
}
</style>
