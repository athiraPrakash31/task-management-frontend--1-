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
                  <v-img src="../../assets/Images/logo.png" width="50"></v-img>
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
                      tile
                      color="deep-purple accent-3"
                      group
                    >
                      <v-btn @click="StatusFilter()" value="left"> All </v-btn>
  
                      <v-btn @click="StatusFilter(0)" value="center"> Open </v-btn>
  
                      <v-btn  @click="StatusFilter(1)" value="right"> Inprogress </v-btn>
  
                      <v-btn  @click="StatusFilter(3)" value="justify"> Closed </v-btn>
                    </v-btn-toggle>
                  </div>
                  <br />
                </div>
  
                <div class="d-flex justify-space-between">
                  <div style="float: left">
                    <!-----------SEARCH -->
  
  
                    <v-container fluid>
                      <v-row>
                        <v-col class="d-flex" cols="12" sm="3">
                          <v-form
                            action=""
                            v-on:keyup="searchQuestion()"
                            @submit.prevent="searchQuestion()"
                          >
                            <v-text-field
                              v-model="searchKey"
                              label="Search"
                              outlined
                              dense
                            ></v-text-field>
                          </v-form>
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="3">
                          <v-select
                          @input="changeItem"
                        
                            :items="items"
                            label="Assignee"
                            dense
                            outlined
                          ></v-select>
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="3">
                          <v-select
                            :items="options"
                            label="Status"
                            dense
                            outlined
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </div>
                </div>
                <!-------------------------------View Tasks---------------------------------------------->
                <div>
                  <v-data-table
                    :headers="headers"
                    :items="task_list.task"
                    :hide-default-footer="true"
                    class="elevation-1"
                  >
                    <!-- TASK TYPE COLUMN -->
                    <template v-slot:[`item.issueType`]="{ item }"
                      ><td v-if="item.category == 1">
                        <v-chip class="ma-2" color="error" outlined>
                          Developer Issue
                        </v-chip>
                      </td>
                      <td v-if="item.category == 2">
                        <v-chip class="ma-2" color="warning" outlined>
                          Bug
                        </v-chip>
                      </td>
                      <td v-if="item.category == 3">
                        <v-chip class="ma-2" color="primary" outlined>
                          Request
                        </v-chip>
                      </td>
                    </template>
                    <!-- TASK STATUS COLUMN -->
                    <template v-slot:[`item.task_status`]="{ item }">
                      <td v-if="item.task_status == 0">
                        <v-chip class="ma-2" color="green" outlined>
                          Open
                        </v-chip>
                      </td>
                      <td v-if="item.task_status == 1">
                        <v-chip class="ma-2" color="error" outlined>
                          Inprogress
                        </v-chip>
                      </td>
                      <td v-if="item.task_status == 2">
                        <v-chip class="ma-2" color="warning" outlined>
                          Resolved
                        </v-chip>
                      </td>
                      <td v-if="item.task_status == 3">
                        <v-chip class="ma-2" color="primary" outlined>
                          Closd
                        </v-chip>
                      </td>
                    </template>
                    <!-- PRIORITY STATUS COLUMN -->
                    <template v-slot:[`item.priority`]="{ item }">
                      <td v-if="item.task_status == 0">
                        <v-tooltip left>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon v-bind="attrs" v-on="on" color="red"
                              >mdi-arrow-up-thick</v-icon
                            >
                          </template>
                          <span>High</span>
                        </v-tooltip>
                      </td>
                      <td v-if="item.task_status == 1">
                        <v-tooltip left>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon v-bind="attrs" v-on="on" color="black"
                              >mdi-arrow-right-thick</v-icon
                            >
                          </template>
                          <span>Normal</span>
                        </v-tooltip>
                      </td>
                      <td v-if="item.task_status == 2">
                        <v-tooltip left>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon v-bind="attrs" v-on="on" color="gray"
                              >mdi-arrow-down-thick</v-icon
                            >
                          </template>
                          <span>Low</span>
                        </v-tooltip>
                      </td>
                    </template>
  
  
                    <template v-slot:[`item.start_date`]="{ item }"
                      ><td>{{moment(item.start_date).calendar() }}</td></template
                    >
                    <template v-slot:[`item.end_date`]="{ item }"
                      ><td>{{momentt(item.end_date).calendar() }}</td></template
                    >

                    <template v-slot:[`item.Status`]>
                      <v-chip color="error" outlined> closed </v-chip>
                    </template>
  
                    <!------------------------------------------------Delete dialogue Box------------------------------------------------------------>
  
                    <template v-slot:[`item.action`]="{ item }">
                      <v-row>
                        <v-icon color="red" @click="openModal(item.user_id)"
                          >mdi-arrow-up-thick</v-icon
                        >
                      </v-row>
                    </template>
  
                    <!-------------------------------------------------------------------------------------------------------------------------------->
                  </v-data-table>
  
                  <v-row>
                    <v-col cols="6" sm="12">
                      <v-row>
                        <v-col cols="12" sm="9">
                          <v-pagination
                            v-model="this.pagination.page"
                            :length="this.pagination.pageNumberCount"
                            total-visible="4"
                            @input="handlePageSizeChange"
                            :disabled="disabled"
                          ></v-pagination>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
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
    </div>
  </template>
      
  <script>
  import sideNavigation from "../AdminPage/adminSideNav.vue";
  // import AllocateUser from "./AllocateUser.vue";
  
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
  
        // type: ["Manager", "Employee", "Client"],
        category: [
          { value: "1", text: "closed" },
          { value: "2", text: "open" },
          { value: "3", text: "Client" },
        ], // Math.ceil(totalCount / pageSize)
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
        UserAllocationModal: false,
        ProjectList: [],
        category_id:[],
        ProjectData: [],
        project: {
          project_id: "",
        },
  
  
        pagination: {
          pageCount: "",
          pageNumberCount: 1,
  
          page: 1,
          limit: 10,
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
          { text: "Assignee", value: "assignee", sortable: false },
          { text: "Status", value: "task_status", sortable: false },
  
          { text: "Priority", value: "priority", sortable: false },
          { text: "Start Date", value: "start_date", sortable: false },
          { text: "Updated Date", value: "end_date", sortable: false },
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
            "/admin/project/"+id,
            "GET",
            
          );
          this.ProjectData = response;
        } catch (error) {
          console.log(error, "error................");
        }
      },
      async getCategoryType() {
        try {
          const response = await ApiService(
            "/admin/getCategory/",
            "GET",
            
          );
          this.categoryData = response;
        } catch (error) {
          console.log(error, "error................");
        }
      },
      async getProjectsList() {
        try {
          const response = await ApiService("/admin/projectlist", "GET");
          this.ProjectList = response.rows;
        } catch (error) {
          console.log(error, "error................");
        }
      },
      // <!------------------------------------------get user-------------------------------------------------->
      async getTask(params) {
        try {
          const response = await ApiService(
            "task/listTask",
            "GET",
            null,
            null,
            params
          );
  
          this.task_list = { task: response?.rows };
          this.pagination.pageCount = response?.count;
          this.pagenationCount = response?.count;
          this.handlePageChange();
        } catch (error) {
          console.log(error, "error................");
        }
      },
      //-----------------------------------------------Serach User------------------------------------------------------------------------------------
  async changeItem(){
  },
      async searchQuestion() {
        const params = { searchKey: this.searchKey };
        const response = await ApiService(
          "task/listTask",
          "GET",
          null,
          null,
          params
        );
        this.task_list = { task: response?.rows };
  
      },
      async StatusFilter(id) {
        const params = {
       
          searchCol:"task_status",
          searchKey: id
      };
        const response = await ApiService(
          "task/listTask",
          "GET",
          null,
          null,
          params
        );
        this.task_list = { task: response?.rows };
      
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
        };
        this.pagination.page = pageNumber;
        this.getTask(params);
      },
  
      handlePageChange() {
  
        this.pagination.pageNumberCount = Math.ceil(
          this.pagination.pageCount / this.pagination.limit
        );
  
      },
      //------------------------------------------delete user-------------------------------------------------------------------
      async dlt() {
        try {
          const URL = `/admin/users/${this.user_id}`;
          await ApiService(URL, "DELETE");
          this.confirmation = false;
          this.user_list = null;
          this.getUser();
          alert("Succesfully Deleted");
        } catch (error) {
          alert("Failed!!!");
        }
      },
  
      openModal(uid) {
        this.confirmation = true;
  
        this.user_id = uid;
      },
  
      onClose() {
        this.confirmation = false;
  
        this.user_id = null;
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
        console.log(pageNumber, "pageNumberpageNumber");
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
  
    mounted() {
      this.getCategoryType();
  
  
      this.getProjectDetails();
  
      const params = {
        page: this.pagination.page,
        limit: this.pagination.limit,
        searchKey: this.data.searchKey,
      };
      this.getTask(params);
  
      this.searchQuestion(params);
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
  </style>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    