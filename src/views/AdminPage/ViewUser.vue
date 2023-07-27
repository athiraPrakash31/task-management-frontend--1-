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
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-heading heading2">
            <div class="search">
              <router-link
              to="/DashBoardViewPage"
              class="nav-link"
              style="color: #4fa5d6; font-size: 15px; font-weight: bold"
            >
      
                <v-img src="../../assets/Images/logo.png" width="70"></v-img></router-link>
              

              <v-col cols="12" sm="6">
                <div class="ttl">Innovature Technologies K.K</div>
              </v-col>
              <!--------------------------------------Search--------------------------------------------------------------------->
              <v-col cols="12" sm="10">
                <v-row>
                  <v-col cols="12" sm="3" md="12">
                    <v-form
                      class="srch"
                      action=""
                      v-on:keyup="searchUser()"
                      @submit.prevent="searchUser()"
                    >
                      <v-text-field
                        filled
                        label="Search Name"
                        prepend-inner-icon="mdi-magnify"
                        solo
                        v-model="searchKey"
                      ></v-text-field>
                    </v-form>
                  </v-col>
                </v-row>
              </v-col>
            </div>
            <!---------------------------------------bulk users assignee to project------------------------------------------------------------------------------>
            <div class="addbtns">
              <div class="mr-4" v-if="users.users.length != 0">
                <v-btn
                  rounded
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                  @click="bulkusersModal()"
                  title="Allocate Users"
                >
                  <v-icon left> mdi-account-multiple-plus-outline </v-icon>
                </v-btn>
              </div>

              <!-----------------------Add new user--------------------------------------------------------------->

              <v-dialog v-model="dialog" persistent max-width="700">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    rounded
                    color="success"
                    v-bind="attrs"
                    v-on="on"
                    title="Add user"
                  >
                    <v-icon> mdi-plus </v-icon>
                  </v-btn>
                </template>

                <v-card v-if="dialog">
                  <div id="title">
                    <v-card-title>
                      <span class="text-h5">Add User</span>
                      <v-spacer></v-spacer>

                      <v-btn icon @click="dialog = false" dark>
                        <v-icon> mdi-close </v-icon>
                      </v-btn>
                    </v-card-title>
                  </div>
                  <br />
                  <v-card-text>
                    <v-container>
                      <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                        autocomplete="off"
                      >
                        <v-row>
                          <v-col>
                            <v-row>
                              <v-col sm="2" md="2">
                                <label class="label" for="name"
                                  >Name <span id="imp">*</span>
                                </label>
                              </v-col>
                              <v-col sm="2" md="10">
                                <v-text-field
                                  outlined
                                  type="text"
                                  id="name"
                                  :rules="nameRules"
                                  height="20"
                                  v-model="data.user_name"
                                  placeholder="Name"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col sm="2" md="2">
                                <label class="label" for="name"
                                  >Email<span id="imp">*</span>
                                </label>
                              </v-col>
                              <v-col sm="2" md="10">
                                <v-text-field
                                  height="20px"
                                  outlined
                                  type="text"
                                  id="email"
                                  :rules="emailRules"
                                  v-model="data.email"
                                  placeholder="Email"
                                ></v-text-field>
                              </v-col>
                            </v-row>

                            <v-row>
                              <v-col sm="2" md="2">
                                <label class="label" for="Role"
                                  >Role<span id="imp">*</span>
                                </label>
                              </v-col>
                              <v-col sm="2" md="10">
                                <v-select
                                  :rules="rolerule"
                                  :items="roleLists"
                                  @keyup.tab="submitEmail"
                                  outlined
                                  v-model="data.role"
                                  placeholder="Role"
                                ></v-select>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                  </v-card-text>

                  <v-card-actions class="justify-center">
                    <v-btn
                      color="blue darken-1"
                      @click="submit"
                      class="ma-2"
                      :disabled="this.isSubmit"
                    >
                      Add
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </div>

        <template>
          <!-------------------------------View Users---------------------------------------------->
          <div class="datatable">
            <template v-if="!this.isFetching">
              <v-data-table
                :headers="headers"
                :items="user_list.users"
                class="elevation-1"
                :group-desc="true"
              >
                <template v-slot:[`item.users.users`]="{ item }">
                  <input
                    v-if="item.role.role_id != 1"
                    type="checkbox"
                    v-model="users.users"
                    :value="item.user_id"
                    number
                  />
                </template>
                <template v-slot:[`item.slNo`]="{ item }"
                  ><td>{{ user_list.users.indexOf(item) + 1 }}</td></template
                >
                <template v-slot:[`item.role`]="{ item }"
                  ><td>{{ findUsertype(item?.role) }}</td></template
                >
                <template v-slot:[`item.active_projects`]="{ item }">
                  <td
                    v-if="
                      item.active_projects !== null && item.active_projects > 0
                    "
                    color="green"
                  >
                    <v-icon
                      v-bind="attrs"
                      v-on="on"
                      color="blue"
                      size="large"
                      @click="OpenUserInfo(item.user_id)"
                      >mdi-information-outline</v-icon
                    >Allocated
                  </td>
                  <td
                    v-if="
                      item.active_projects === null ||
                      item.active_projects === 0
                    "
                    color="green"
                  >
                    Free
                  </td></template
                >

                <!------------------------------------------------Delete dialogue Box------------------------------------------------------------>

                <template v-slot:[`item.action`]="{ item }">
                  <v-row>
                    <div v-if="users.users.length == 0" style="display:flex">
                      <template>
                        <v-icon
                          class="mr-3"
                          color="blue"
                          @click="editmodal(item)"
                          title="Edit"
                          >mdi-pencil</v-icon
                        >
                      </template>

                      <template>
                        <v-icon
                          class="mr-3"
                          color="red"
                          @click="openModal(item.user_id)"
                          title="Delete"
                          >mdi-delete</v-icon
                        >
                      </template>

                      <template v-if="item.role.role_id != 1">
                        <v-icon
                          class="mr-3"
                          color="blue"
                          title="Allocate User"
                          @click="openUserAllocationModal(item.user_id)"
                          >mdi-account-plus-outline</v-icon
                        >
                      </template>
                    </div>
                  </v-row>
                  <v-row> </v-row>
                </template>

                <!---------------------------------------------------Pagination----------------------------------------------------------------------------->
              </v-data-table>
            </template>
          </div>
        </template>
      </div>
    </div>

    <v-dialog v-model="confirmation" max-width="400">
      <v-card>
        <v-card-title class="text-h5"> </v-card-title>

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
        <v-card-title class="text-h5"> </v-card-title>

        <v-card-text>
          This user is already assigned in a project. Do you want to delete?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red" text @click="onClose()"> No </v-btn>

          <v-btn color="green darken-1" text @click="ReConfirmDelete()">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-------------------- user allocation modal ------------------>

    <v-dialog v-model="UserAllocationModal" persistent max-width="700">
      <v-card v-if="UserAllocationModal">
        <div id="title">
          <v-card-title>
            <span class="text-h5" style="color: aliceblue">Allocate User</span>
            <v-spacer></v-spacer>

            <v-btn icon @click="CloseUserAllocationModal()" dark>
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
        </div>
        <br />
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="isValid" lazy-validation>
              <v-row>
                <v-col>
                  <v-row>
                    <v-col sm="2" md="2">
                      <label class="label" for="project"
                        >Project<span id="imp">*</span>
                      </label>
                    </v-col>
                    <v-col sm="2" md="10">
                      <v-select
                        :rules="projectRule"
                        :items="options"
                        outlined
                        @change="ProjectDetails($event)"
                        v-model="project.project_id"
                        placeholder="Project Name"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col sm="2" md="2">
                      <label class="label" for="startdate"
                        >Start Date<span id="imp">*</span>
                      </label>
                    </v-col>
                    <v-col sm="2" md="10">
                      <v-menu
                        v-model="menu2"
                        min-width="auto"
                        :close-on-content-click="false"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="users.from_date"
                            placeholder="Start Date"
                            icon="mdi-calendar"
                            readonly
                            outlined
                            :rules="projectDateRule"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="users.from_date"
                          :min="minDate"
                          :max="maxDate"
                          @input="(menu2 = false), (value = 2)"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col sm="2" md="2">
                      <label class="label" for="enddate"
                        >End Date<span id="imp">*</span>
                      </label>
                    </v-col>
                    <v-col sm="2" md="10">
                      <v-menu
                        min-width="auto"
                        v-model="menu1"
                        :close-on-content-click="false"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="users.to_date"
                            placeholder="End Date"
                            icon="mdi-calendar"
                            readonly
                            outlined
                            :rules="projectDateRule"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="users.to_date"
                          :min="users.from_date"
                          :max="maxDate"
                          @input="menu1 = false"
                          :allowed-dates="allowedDates"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col sm="2" md="2">
                      <label class="label" for="Role"
                        >Role<span id="imp">*</span>
                      </label>
                    </v-col>
                    <v-col sm="2" md="10">
                      <v-select
                        :rules="rolerule"
                        :items="ProjectRoleLists"
                        @keyup.tab="submitEmail"
                        outlined
                        v-model="users.role"
                        placeholder="Role"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-card-actions class="justify-center"> </v-card-actions>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            :disabled="this.isallocateForm"
            color="blue darken-1"
            style="color: white"
            @click="AddAssignee"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-----------------------------------------------Edit user----------------------------------------------------------------->
    <v-dialog v-model="editDialog" persistent max-width="700">
      <v-card v-if="editDialog">
        <div id="title">
          <v-card-title>
            <span class="text-h5">Edit User</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="closeDialog" dark>
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-card-title>
        </div>
        <br />
        <v-card-text>
          <v-container>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              autocomplete="off"
            >
              <v-row>
                <v-col>
                  <v-row>
                    <v-col sm="2" md="2">
                      <label class="label" for="name"
                        >Name <span id="imp">*</span>
                      </label>
                    </v-col>
                    <v-col sm="2" md="10">
                      <v-text-field
                        outlined
                        type="text"
                        id="name"
                        :rules="nameRules"
                        height="20"
                        v-model="userdata.user_name"
                        placeholder="Name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col sm="2" md="2">
                      <label class="label" for="name"
                        >Email<span id="imp">*</span>
                      </label>
                    </v-col>
                    <v-col sm="2" md="10">
                      <v-text-field
                        height="20px"
                        outlined
                        type="text"
                        id="email"
                        @keyup.tab="submitEmail"
                        :rules="emailRules"
                        v-model="userdata.email"
                        placeholder="Email"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col sm="2" md="2">
                      <label class="label" for="Role"
                        >Role<span id="imp">*</span>
                      </label>
                    </v-col>
                    <v-col sm="2" md="10">
                      <v-select
                        :rules="typesRules"
                        :items="roleLists"
                        outlined
                        v-model="userdata.role"
                        placeholder="Role"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn
            v-if="buttonValue == true"
            color="blue darken-1"
            @click="editUser"
            class="ma-2"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- user information modal -->

    <v-row justify="center">
      <v-dialog v-model="userInfoModal" width="700px">
        <v-card>
          <v-toolbar flat color="#4FA5D6">
            <v-toolbar-title style="color: white"
              >Allocation Details
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon @click="userInfoModal = false" dark>
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-toolbar>
          <v-spacer></v-spacer>
          <v-card-text>
            <v-list three-line subheader>
              <br /><br />

              <p class="font-black text-h6">Allocated Project Details</p>
            </v-list>
            <!-- box project details-->
            <div class="card cardMsg mb-3 widget-content">
              <div class="table-responsive">
                <table
                  class="
                    align-middle
                    mb-0
                    table table-borderless table-striped table-hover
                  "
                >
                  <thead>
                    <tr>
                      <th id="" class="text-center">Project Code</th>
                      <th id="">Project Name</th>
                      <th id="" class="text-center">start Date</th>
                      <th id="" class="text-center">End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in UserAllocationInfo" :key="item.user_id">
                      <td class="text-center text-muted">
                        {{ item.project_code }}
                      </td>
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
                      <td class="text-center">
                        <p>{{ item.from_date }}</p>
                      </td>
                      <td class="text-center">
                        <p>{{ item.to_date }}</p>
                      </td>
                    </tr>

                    <tr></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="userInfoModal = false">
              Ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import topNavigation from "./adminTopNav.vue";
import ApiService from "../../service/apiservice.js";
import Vue from "vue";
import "vue-toast-notification/dist/theme-sugar.css";
import VueToast from "vue-toast-notification";
Vue.use(VueToast);

export default {
  components: { topNavigation },

  data() {
    return {
      userInfoModal: false,
      to_date: "",
      isFormValid: false,

      from_date: "",
      type: [
        { value: "2", text: "Manager" },
        { value: "3", text: "Guest" },
      ],

      id: localStorage.getItem("id"),

      role: "",
      dialog: false,
      isValid: false,
      buttonValue: true,
      valid: true,
      menu2: false,
      menu1: false,

      confirmation: false,
      Re_confirmation: false,
      isSubmit: false,
      isallocateForm: false,
      editDialog: false,

      isFetching: false,
      UserAllocationInfo: [],
      UserAllocationModal: false,
      ProjectList: [],
      //add user
      users: {
        from_date: "",
        to_date: "",
        users: [],
        role: "",
      },

      project: {
        project_id: "",
      },

      pagination: {
        pageCount: "",
        pageNumberCount: 1,

        page: null,
        limit: null,
      },
      i: 0,
      localRole: "",
      ProjectRoleList: [],
      RoleList: [],
      success: 0,
      total: "",
      Error: 0,
      searchResult: "",
      searchKey: "",
      allocatedUser: "",
      unAllocatedUser: "",

      //edit
      userdata: {
        user_name: "",
        email: "",
        role: "",
        user_id: "",
      },
      headers: [
        {
          text: "",
          value: "users.users",
          sortable: false,
          align: "start",
          width: "2%",
        },
        {
          text: "ID",
          color: "red",

          value: "slNo",
          sortable: false,
          align: "start",
          width: "3%",
        },
        { text: "NAME", sortable: false, value: "user_name", width: "15%" },
        { text: "EMAIL", value: "email", sortable: false, width: "20%" },
        {
          text: "STATUS",
          value: "active_projects",
          sortable: false,
          width: "10%",
        },

        {
          text: "ROLE",
          value: "role.role_name",
          sortable: false,
          width: "10%",
        },

        { text: "Action", value: "action", sortable: false, width: "10%" },
      ],
      user_list: { users: [], loading: false },
      limit: [
        {
          type: "fromto",
          from: this.StartDate,
        },
      ],

      //view users
      data: {
        error: [],
        user_name: "",
        email: "",
        role: "",

        selected: "Select",
      },
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => !/^\s/.test(v) || "Enter a valid user name",
        (v) =>
          /^[a-zA-z]+([\s][a-zA-Z]+)*$/.test(v) || "Enter a valid user name",
        (v) =>
          (v && v.length >= 3 && v.length <= 30) ||
          "Name must be 3- 30 characters",
      ],
      projectRule: [(v) => !!v || "project is required"],
      projectDateRule: [(v) => !!v || "Date is required"],
      rolerule: [(v) => !!v || "Role is required"],
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /^[a-z][a-z0-9.+_]+@[a-z]+(?:\.[a-z-]+)$/.test(
            v
          ) || "Email must be valid",
        // (v) =>
        //   /^[a-z0-9]+@[a-z0-9.]+(?:\.[a-z0-9-]+)$/.test(v) ||
        //   "Email must be valid",

        (v) => (v && v.length >= 10 && v.length <= 55) || "Email must be less than 55",
      ],
    };
  },

  methods: {
    async ProjectDetails(id) {
      const response = await ApiService(
        "project/overallProjectStatus/" + id,
        "GET"
      );
     
      
      

      this.minDate = response.start_date;
      this.maxDate = response.end_date;
      this.users.from_date = response.start_date;
      this.users.to_date = response.end_date;
    },
    CheckDate() {
      if (Date.parse(this.EndDate) <= Date.parse(this.StartDate)) {
        alert("End date should be greater than Start date");
        document.getElementById("EndDate").value = "";
      }
    },
    async getProjectsList() {
      try {
        const response = await ApiService("/project/getProject", "GET");
        this.ProjectList = response.reverse();
      } catch (error) {
        console.log(error, "error................");
      }
    },
    async getRole() {
      try {
        const response = await ApiService("/users/rolelist", "GET");
        this.RoleList = response;
      } catch (error) {
        console.log(error, "error................");
      }
    },
    async getProjectRole() {
      try {
        const response = await ApiService("/users/projectrolelist", "GET");
        this.ProjectRoleList = response;
      } catch (error) {
        console.log(error, "error................");
      }
    },
    // allocate user to the project
    async AddAssignee() {
      if (this.$refs.form.validate()) {
        this.isallocateForm = true;
        try {
          const response = await ApiService(
            "project/allocateUser/" + this.project.project_id,
            "POST",
            this.users
          );
          if (response.statusCode == 75) {
            Vue.$toast.warning("End Date  must be greater than start date", {
              position: "top",
            });
          }
          if (response.statusCode == 57) {
            Vue.$toast.warning("Empty field UserName", {
              position: "top",
            });
          } else if (response.statusCode == 1012) {
            Vue.$toast.warning("Start date must be valid date", {
              position: "top",
            });
          } else if (response.statusCode == 1013) {
            Vue.$toast.warning("End date must be valid date", {
              position: "top",
            });
          }
          for (let i = 0; i < response.length; i++) {
            if (response[i].code == 2) {
              this.success = 1;
              this.allocatedUser =
                this.allocatedUser + " " + response[i].user_name + ",";
            }
            if (response[i].code == 1) {
              this.Error = 1;
              this.unAllocatedUser =
                this.unAllocatedUser + response[i].user_name + " , ";
            }
          }
          if (this.success == 1) {
            Vue.$toast.success(
              '"' + this.allocatedUser + ' " allocated Successfully',
              {
                position: "top",
              }
            );
          }
          if (this.Error == 1) {
            Vue.$toast.warning(this.unAllocatedUser + ' " already allocated', {
              position: "top",
            });
          }
     this.Error=0;
     this.success=0;
        this.isallocateForm=false;
        this.confirmation = false;
        this.allocatedUser="",
     this.unAllocatedUser="";
                  this.$refs.form.reset();

          this.$refs.form.reset();

          const params = {
            page: this.pagination.page,
            limit: this.pagination.limit,
            searchKey: this.data.searchKey,
            sortCol: "user_id",
            sortMethod: "desc",
          };

          this.getUser(params);
          this.UserAllocationModal = false;
          this.users.users = [];
        } catch (error) {
          console.log(error, "error................");
        }
      }
    },
    //----------close modal ------//
    closeDialog() {
      this.editDialog = false;
      console.log(document.body);
    },

    // <!------------------------------------------get user-------------------------------------------------->
    async getUser(params) {
      this.isFetching = true;
      try {
        const response = await ApiService("/users", "GET", null, null, params);
        console.log(response, "responseresponseresponse");
        this.total = response.total;
        this.user_list = { users: response?.data };
        console.log(this.user_list);
        this.isFetching = false;
      } catch (error) {
        this.isFetching = false;
      }
    },
    //-----------------------------------------------Serach User------------------------------------------------------------------------------------

    async searchUser() {
      if (this.searchKey == "") {
        const params = {};
        const response = await ApiService("/users", "GET", null, null, params);
        this.user_list = { users: response?.data, loading: false };
      } else {
        const params = { searchCol: "user_name", searchKey: this.searchKey };
        console.log(params, "searchKey..................");
        const response = await ApiService("/users", "GET", null, null, params);
        console.log(response, "response....................");
        this.user_list = { users: response?.data, loading: false };
      }
    },
    async OpenUserInfo(uid) {
      this.userInfoModal = true;

      this.user_id = uid;
      try {
        const URL = `/users/getAllocatedProjects/${this.user_id}`;
        const response = await ApiService(URL, "GET");
        this.UserAllocationInfo = response.allocatedProject;
      } catch (error) {
        Vue.$toast.error("Failed", {
          position: "top",
        });
      }
    },

    // <!-------------------------usertype covertion--------------------------------------->
    findUsertype(value) {
      if (value === 0) {
        return "Admin";
      }
      const role = this.type.find((data) => data?.value == value);
      console.log(this.type, "this.type");
      return role?.text;
    },
    // --------------------add user button--------------------------------------------------------------
    async submit() {
      const params = {
        page: this.pagination.page,
        limit: this.pagination.limit,
        searchKey: this.data.searchKey,
        sortCol: "user_id",
        sortMethod: "desc",
      };
      if (this.$refs.form.validate()) {
        this.isSubmit = true;
        try {
          const data = {
            user_name: this.data.user_name,
            email: this.data.email,
            role: this.data.role,
          };
          const response = await ApiService("/users", "POST", data);
          this.isSubmit = false;
          console.log(response, "res");
          console.log(response.errorMessage, "error res");
          if (response.statusCode == 32) {
            Vue.$toast.warning("" + response.errorMessage, {
              position: "top",
            });
          } else if (response.statusCode == 33) {
            Vue.$toast.warning("email already exists", {
              position: "top",
            });
          } else {
            Vue.$toast.success("User added Successfully", {
              position: "top",
            });
            this.dialog = false;
            this.getUser(params);
          }
        } catch (error) {
          console.log(error, "error................");
        }
      }
    },

    //------------------------------------------delete user-------------------------------------------------------------------
    async dlt() {
      try {
        const URL = `/users/${this.user_id}`;
        const response = await ApiService(URL, "DELETE");
        if (response.statusCode == 200) {
          Vue.$toast.success("User Deleted Successfully", {
            position: "top",
          });
        }
        if (response.statusCode == 92) {
          this.Re_confirmation = true;
          this.confirmation = false;
        }

        this.confirmation = false;
      } catch (error) {
        Vue.$toast.error("failed", {
          position: "top",
        });
      }
      this.getUser();
    },
    async ReConfirmDelete() {
      try {
        const URL = `/users/confirmdelete/${this.user_id}`;
        const response = await ApiService(URL, "DELETE");
        if (response.status == 200) {
          Vue.$toast.success("User Deleted Successfully", {
            position: "top",
          });
        }
        if (response.statusCode == 1011) {
          Vue.$toast.error("Cannot delete yourself", {
            position: "top",
          });
        }
        this.Re_confirmation = false;
        this.user_list = null;
        this.getUser();
      } catch (error) {
        Vue.$toast.error("Failed", {
          position: "top",
        });
      }
    },

    openModal(uid) {
      this.confirmation = true;

      this.user_id = uid;
    },

    editmodal(item) {
      console.log(item,"itemitem")
      this.editDialog = true;
      // alert("alert hi!!!")
      this.userdata.user_id = item.user_id;
      this.userdata.user_name = item.user_name;
      this.userdata.email = item.email;
      this.userdata.role = item.role.role_id;

    
    },

    onClose() {
      this.confirmation = false;
      this.Re_confirmation = false;
      this.user_id = null;
    },
    openUserAllocationModal(uid) {
      this.UserAllocationModal = true;

      this.users.users.push(uid);
    },
    bulkusersModal() {
      this.UserAllocationModal = true;
    },
    CloseUserAllocationModal() {
      this.$refs.form.reset();
      this.UserAllocationModal = false;
      this.users.users = [];
      this.$refs.form.resetValidation();
      this.value = "";
    },

  

    async editUser() {
      try {
        const udata = {
          user_name: this.userdata?.user_name,
          email: this.userdata?.email,
          role: this.userdata?.role,
        };
        const response = await ApiService(
          "users/" + this.userdata.user_id,
          "PUT",
          udata,
          null,
          null
        );
    
        console.log(this.userdata, "jhvgbjkld");
        console.log(response, "data...............user");

        
        if (response.statusCode == 113) {
          Vue.$toast.warning("Updation failed", {
            position: "top",
          });
          this.editDialog = true;
        }
        if (response.statusCode == 1015) {
          Vue.$toast.warning("Email already exist", {
            position: "top",
          });
          this.editDialog = true;
        } 
        if(response.statusCode==1050){
          Vue.$toast.warning("No change in User deatils",{
          position:"top",
          });
          this.getUser();
          this.editDialog = false;

        }
        if(response.statusCode == 95){
          Vue.$toast.warning("Name is required",{
          position:"top",
          });
       
          this.editDialog = true;

        }
        if(response.statusCode==200){
          Vue.$toast.success("User updated Successfully", {
            position: "top",
          });
          this.getUser();
          this.editDialog = false;
          
        }
      } catch (error) {
        Vue.$toast.warning("Updation failed", {
          position: "top",
        });
        console.log(error, "error................");
        this.editDialog = true;
      }
    },
  },

  //----------------------------------------------watch func for pagination----------------------------------------------------------------
  watch: {
    // whenever  the given depenedancy  changes, this function will run

    searchKey: function () {
      console.log(
        this.data.searchKey,
        "search key key key........................."
      );

      this.searchUser();
    },

    //---------------------------------remove data from the form after sumbmit----------------------------------------------------------
    dialog: function (val) {
      if (val) {
        this.data.user_name = "";
        this.data.email = "";
        this.data.role = "";
      }
    },
  },

  beforeMount() {
    const params = {
      page: this.pagination.page,
      limit: this.pagination.limit,
      searchKey: this.data.searchKey,
      sortCol: "user_id",
      sortMethod: "desc",
    };
    this.getUser(params);
    this.getRole();
    this.getProjectsList();
    this.getProjectRole();

    this.localRole = localStorage.getItem("role");
  },
  computed: {
    options() {
      console.log(this.ProjectList[1]);
      let opts = [];
      for (let i = 0; i <= this.ProjectList.length - 1; i++) {
        opts.push({
          text: this.ProjectList[i].project_name,
          value: this.ProjectList[i].project_id,
        });
      }
      return opts;
    },
    roleLists() {
      let opts = [];
      for (let i = 0; i <= this.RoleList.length - 1; i++) {
        opts.push({
          text: this.RoleList[i].role_name,
          value: this.RoleList[i].role_id,
        });
      }
      return opts;
    },
    ProjectRoleLists() {
      let opts = [];
      for (let i = 0; i <= this.ProjectRoleList.length - 1; i++) {
        opts.push({
          text: this.ProjectRoleList[i].role_name,
          value: this.ProjectRoleList[i].role_id,
        });
      }
      return opts;
    },
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
  margin-left: 5%;
  height: 20%;
}
.label {
  font-size: medium;
}

.datatable {
  width: 90%;
  margin-left: 5%;
}
.search {
  display: flex;
}
.addbtns {
  display: flex;
  justify-content: end;
}
.heading2 {
  justify-content: space-between;
  width: 100%;
}

.ttl {
  margin-top: 13px;
}
.srch {
  margin-left: -51px;
  margin-right: 13px;
}
.v-btn:not(.v-btn--round).v-size--default {
  height: 45px;
  min-width: 60px;
  padding: 0 16px;
}
.theme--light.v-icon:focus::after {
  opacity: 0 !important;
}
/* .datatable{
  overflow-y: hidden;
} */

</style>
