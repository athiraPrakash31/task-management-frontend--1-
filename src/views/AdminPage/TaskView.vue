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
      <sideNavigation />
      <div class="app-main__outer">
        <div class="app-main__inner">
          <div class="app-page-title bg-light p-1">
            <div class="page-title-wrapper">
              <div class="page-title-heading">
                <router-link exact :to="'/HomePage/' + this.$route.params.id">
                  <v-img src="../../assets/Images/logo.png" width="50"></v-img
                ></router-link>
                <div>
                  {{ ProjectData?.project_name }} (
                  {{ ProjectData?.project_code }})
                </div>
              </div>
            </div>
          </div>
          <!---------------------------Role filter ---------------------------------------->
          <template>
            <div>
              <div class="d-flex justify-space-between bottom-60">
                <!--------------------------------------filter--------------------------------------------------------------------->
                <div class="d-flex">
                  <div class="page-title-heading">Status:</div>

                  <v-btn-toggle
                    v-model="text"
                    color="deep-purple accent-3"
                    group
                  >
                    <v-btn
                      class="ma-2"
                      outlined
                      style="text-transform: capitalize"
                      @click="StatusFilter(5)"
                    >
                      All
                    </v-btn>

                    <v-btn
                      class="ma-2"
                      outlined
                      @click="StatusFilter(1)"
                      style="text-transform: capitalize"
                    >
                      Open
                    </v-btn>
                    <v-btn
                      class="ma-2"
                      outlined
                      @click="StatusFilter(2)"
                      style="text-transform: capitalize"
                    >
                      Inprogress
                    </v-btn>
                    <v-btn
                      class="ma-2"
                      outlined
                      @click="StatusFilter(4)"
                      style="text-transform: capitalize"
                    >
                      Closed
                    </v-btn>
                  </v-btn-toggle>
                </div>

                <v-col
                  class="d-flex searchBar"
                  style="margin-left: 30%"
                  cols="12"
                  sm="12"
                >
                  <v-form
                    action=""
                    v-on:keyup="searchQuestion()"
                    @submit.prevent="searchQuestion()"
                  >
                    <v-text-field
                      v-model="searchKey"
                      label="Search Task"
                      outlined
                      prepend-inner-icon="mdi-magnify"
                      dense
                    ></v-text-field>
                  </v-form>
                </v-col>
                <br />
              </div>

              <div class="d-flex justify-space-between">
                <div style="float: left">
                  <v-container fluid>
                    <v-row> </v-row>
                  </v-container>
                </div>
              </div>
              <!-------------------------------View Tasks---------------------------------------------->
              <div class="datatable">
                <div v-if="task_list.task.length == 0">
                  <v-data-table
                    :headers="headers"
                    :items="task_list.task"
                    hide-default-footer
                    class="elevation-1"
                    @click:row="handleClick"
                  ></v-data-table>
                </div>
                <div v-if="task_list.task.length != 0">
                  <v-data-table
                    :headers="headers"
                    :items="task_list.task"
                    class="elevation-1"
                    @click:row="handleClick"
                  >
                    <!-- TASK TYPE COLUMN -->
                    <template v-slot:[`item.issueType`]="{ item }"
                      ><td v-if="item.category == 1">
                        <v-chip class="ma-2" color="warning" outlined>
                          Bug
                        </v-chip>
                      </td>
                      <td v-if="item.category == 2">
                        <v-chip class="ma-2" color="error" outlined>
                          Developer Issue
                        </v-chip>
                      </td>
                      <td v-if="item.category == 3">
                        <v-chip class="ma-2" color="primary" outlined>
                          Request
                        </v-chip>
                      </td>
                      <td v-if="item.category == 4">
                        <v-chip class="ma-2" color="success" outlined>
                          Task
                        </v-chip>
                      </td>
                      <td v-if="item.category == 5">
                        <v-chip class="ma-2" color="blue" outlined>
                          Other
                        </v-chip>
                      </td>
                    </template>
                    <!-- TASK STATUS COLUMN -->
                    <template v-slot:[`item.task_status`]="{ item }">
                      <td v-if="item.task_status == 1">
                        <v-chip class="ma-2" color="error" outlined>
                          Open
                        </v-chip>
                      </td>
                      <td v-if="item.task_status == 2">
                        <v-chip class="ma-2" color="primary" outlined>
                          Inprogress
                        </v-chip>
                      </td>
                      <td v-if="item.task_status == 3">
                        <v-chip class="ma-2" color="warning" outlined>
                          Resolved
                        </v-chip>
                      </td>
                      <td v-if="item.task_status == 4">
                        <v-chip class="ma-2" color="green" outlined>
                          Closed
                        </v-chip>
                      </td>
                    </template>
                    <!-- PRIORITY STATUS COLUMN -->
                    <template v-slot:[`item.priority`]="{ item }">
                      <td v-if="item.priority == 3">
                        <v-tooltip left>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon v-bind="attrs" v-on="on" color="red"
                              >mdi-arrow-up-thick</v-icon
                            >
                          </template>
                          <span>High</span>
                        </v-tooltip>
                      </td>
                      <td v-if="item.priority == 2">
                        <v-tooltip left>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon v-bind="attrs" v-on="on" color="#4622bd"
                              >mdi-arrow-right-thick</v-icon
                            >
                          </template>
                          <span>Normal</span>
                        </v-tooltip>
                      </td>
                      <td v-if="item.priority == 1">
                        <v-tooltip left>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon v-bind="attrs" v-on="on" color="green"
                              >mdi-arrow-down-thick</v-icon
                            >
                          </template>
                          <span>Low</span>
                        </v-tooltip>
                      </td>
                    </template>

                    <template v-slot:[`item.start_date`]="{ item }"
                      ><td>
                        {{ moment(item.start_date).calendar() }}
                      </td></template
                    >
                    <template v-slot:[`item.end_date`]="{ item }"
                      ><td>
                        {{ momentt(item.end_date).calendar() }}
                      </td></template
                    >
                    <template v-slot:[`item.Status`]>
                      <v-chip color="error" outlined> closed </v-chip>
                    </template>

                    <!------------------------------------------------Delete dialogue Box------------------------------------------------------------>

                    <template v-slot:[`item.action`]="{ item }">
                      <v-row>
                        <v-icon color="black" @click="openModal(item.task_id)"
                          >mdi-paperclip</v-icon
                        >
                      </v-row>
                    </template>

                    <!-------------------------------------------------------------------------------------------------------------------------------->
                  </v-data-table>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <v-dialog v-model="confirmation" max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Confirm </v-card-title>

        <v-card-text>
          Are you sure you want to delete this record?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red" text @click="onClose()"> No </v-btn>

          <v-btn color="green darken-1" text @click="dlt()"> Yes </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--------Delete  Re confirmation modal------------------ -->

    <v-dialog v-model="Re_confirmation" max-width="30%">
      <v-card>
        <v-card-title class="text-h5"> Re-Confirm </v-card-title>

        <v-card-text> Task is not closed. Do you want to delete? </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red" text @click="onClose()"> No </v-btn>

          <v-btn color="green darken-1" text @click="ReConfirmDelete()">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
    
<script>
import sideNavigation from "../AdminPage/adminSideNav.vue";

import topNavigation from "./adminTopNav.vue";
import ApiService from "../../service/apiservice.js";
import Vue from "vue";
import "vue-toast-notification/dist/theme-sugar.css";
import VueToast from "vue-toast-notification";
let moment = require("moment");
Vue.use(VueToast);

export default {
  components: { sideNavigation, topNavigation },

  data() {
    return {
      moment: moment,
      momentt: moment,

      category: [
        { value: "1", text: "closed" },
        { value: "2", text: "open" },
        { value: "3", text: "Client" },
      ],
      priority: [
        { value: "1", text: "Normal" },
        { value: "2", text: "High" },
        { value: "3", text: "Low" },
      ],
      role: "",
      dialog: false,
      isValid: false,
      valid: true,
      confirmation: false,
      Re_confirmation: false,
      UserAllocationModal: false,
      ProjectList: [],
      category_id: [],
      ProjectData: [],
      project: {
        project_id: "",
      },

      pagination: {
        pageCount: "",
        pageNumberCount: 1,
      },

      flag: undefined,
      searchFlag: undefined,
      searchResult: "",
      searchKey: "",

      headers: [
        {
          text: "Issue Type",
          value: "issueType",
          sortable: false,
          align: "start",
        },
        {
          text: "Key",

          sortable: false,
          value: "task_id",
        },
        { text: "Subject", value: "task_name", sortable: false },
        { text: "Assignee", value: "assignee.user_name", sortable: false },
        { text: "Status", value: "task_status", sortable: false },

        { text: "Priority", value: "priority", sortable: false },
        { text: "Start Date", value: "start_date", sortable: false },
        { text: "Updated Date", value: "end_date", sortable: false },
        { text: "Action", value: "action", sortable: false },
      ],
      task_list: { task: [], loading: false },

      data: {
        error: [],
        user_name: "",
        email: "",
        category: "",
        designation: "",
        selected: "Select",
      },
      nameRules: [(v) => !!v || "Name is required"],

      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail must be valid",
      ],
      typesRules: [(v) => !!v || "User type is required"],
      designationRules: [(v) => !!v || "Department Id is required"],
    };
  },

  methods: {
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

    async getProjectsList() {
      try {
        const response = await ApiService("/  ", "GET");
        this.ProjectList = response.rows;
      } catch (error) {
        console.log(error, "error................");
      }
    },

    // <!------------------------------------------get user-------------------------------------------------->
    async getTask(params) {
      try {
        const response = await ApiService(
          "/task/tasklist",
          "GET",
          null,
          null,
          params
        );

        this.task_list = { task: response?.data };
        this.pagination.pageCount = response?.count;
        this.pagenationCount = response?.count;
        this.handlePageChange();
      } catch (error) {
        console.log(error, "error................");
      }
    },
    //-----------------------------------------------Serach User------------------------------------------------------------------------------------

    async searchQuestion() {
      if (this.searchKey == "") {
        const params = {
          searchCol2: "project_id",
          searchKey2: this.$route.params.id,
          sortMethod: "desc",
          sortCol: "task_id",
        };
        const response = await ApiService(
          "/task/tasklist",
          "GET",
          null,
          null,
          params
        );
        this.task_list = { task: response?.data };
      } else {
        const params = {
          searchCol2: "project_id",
          searchKey2: this.$route.params.id,
          searchCol: "task_name",
          searchKey: this.searchKey,
          sortMethod: "desc",
          sortCol: "task_id",
        };
        const response = await ApiService(
          "task/tasklist",
          "GET",
          null,
          null,
          params
        );
        this.task_list = { task: response?.data };
      }
    },
    async StatusFilter(id) {
      if (id == 5) {
        this.params = {
          searchCol2: "project_id",
          searchKey2: this.$route.params.id,
          sortMethod: "desc",
          sortCol: "task_id",
        };
        const response = await ApiService(
          "task/tasklist",
          "GET",
          null,
          null,
          this.params
        );
        this.task_list = { task: response?.data };
      } else {
        this.params = {
          searchCol2: "project_id",
          searchKey2: this.$route.params.id,
          searchCol: "task_status",
          searchKey: id,
          sortMethod: "desc",
          sortCol: "task_id",
        };
        this.getTask(this.params);
      }
    },

    // <!-------------------------usertype covertion--------------------------------------->
    findUsertype(value) {
      if (value === 0) {
        return "bug";
      }
      const category = this.category.find((data) => data?.value == value);
      return category?.text;
    },

    //-------------------------pagination---------------------------------------------------------
    findPageNumberCount(totalCount, pageSize) {
      // we suppose that if we have 0 items we want 1 empty page
      if (totalCount && pageSize) {
        return 2;
      }
    },

    handlePageSizeChange(pageNumber) {
      const params = {
        page: pageNumber,
        limit: this.pagination.limit,
        searchKey2: this.$route.params.id,
      };
      this.pagination.page = pageNumber;
      this.getTask(params);
    },

    handlePageChange() {
      this.pagination.pageNumberCount = Math.ceil(
        this.pagination.pageCount / this.pagination.limit
      );
    },

    openModal(uid) {
      this.confirmation = true;

      this.task_id = uid;
    },

    onClose() {
      this.confirmation = false;
      this.Re_confirmation = false;

      this.task_id = null;
    },
    handleClick(category) {
      const id = this.$route.params.id;

      this.$router.push("/taskupdation/" + id + "/" + category.task_id);
    },
  },

  //----------------------------------------------watch func for pagination----------------------------------------------------------------
  watch: {
    // whenever question changes, this function will run
    "pagination.limit": function () {
      const params = {
        page: this.pagination.page,
        limit: this.pagination.limit,
      };

      this.getUser(params);
    },
    pagination: function () {
      const pageNumber = this.findPageNumberCount(
        this.pagination.pageCount,
        this.pagination.limit
      );
      console.log(pageNumber);
    },

    searchKey: function () {
      this.searchQuestion();
    },

    //---------------------------------remove data from the form after sumbmit----------------------------------------------------------
    dialog: function (val) {
      if (val) {
        this.data.user_name = "";
        this.data.email = "";
        this.data.user_type = "";
        this.data.designation = "";
      }
    },
  },

  beforeMount() {
    const params = {
      searchCol2: "project_id",
      searchKey: this.data.searchKey,
      searchKey2: this.$route.params.id,
      sortMethod: "desc",
      sortCol: "task_id",
    };
    this.getTask(params);

    setTimeout(() => {
      this.getCategoryType();
    }, 100);
    setTimeout(() => {
      this.getProjectDetails();
    }, 150);

    this.getProjectsList();
  },
};
</script>
  

    
    <style scoped>
#title {
  background-color: #4fa5d6;
}
#imp {
  color: red;
}
.v-text-field {
  height: 20%;
}
.label {
  font-size: medium;
}
@media (max-width: 480px) {
  .searchBar {
    margin-right: -80%;
  }
}
</style>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  