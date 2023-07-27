<template>
  <div class="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
    <!-- top nav -->
    <topNavigation />

    <div class="app-main">
      <!-- side nav -->

      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <router-link exact :to="'/HomePage/' + this.$route.params.id">
              <v-img src="../../assets/Images/logo.png" width="70"></v-img></router-link>
              <div>Innovature Technologies K.K</div>
            </div>
          </div>
        </div>
        <!---------------------------Role filter ---------------------------------------->
        <template>
          <div>
            <div class="d-flex justify-space-between">
              <!--------------------------------------Search--------------------------------------------------------------------->
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-form
                    action=""
                    v-on:keyup="searchUser()"
                    @submit.prevent="searchUser()"
                  >
                    <v-text-field
                      filled
                      label="Search............"
                      prepend-icon="mdi-magnify"
                      solo
                      v-model="searchKey"
                    ></v-text-field>
                  </v-form>
                </v-col>
              </v-row>
              <!-- bulk users assignee to project -->
              <div class="mr-4" v-if="users.users.length != 0">
                <v-btn
                  tile
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                  @click="bulkusersModal()"
                >
                  <v-icon left> mdi-account-multiple-plus-outline </v-icon>
                  Allocate All users
                </v-btn>
              </div>
              <!-------------------------------------Add New User---------------------------------------->
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn tile color="success" v-bind="attrs" v-on="on">
                    <v-icon left> mdi-plus </v-icon>
                    New User
                  </v-btn>
                </template>
                <v-card v-if="dialog">
                  <div id="title">
                    <v-card-title>
                      <span class="text-h5">Add User</span>
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
                                <label class="label" for="User Type"
                                  >Type<span id="imp">*</span>
                                </label>
                              </v-col>
                              <v-col sm="2" md="10">
                                <v-select
                                  :rules="typesRules"
                                  :items="type"
                                  outlined
                                  v-model="data.role"
                                  placeholder="User type"
                                ></v-select>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col sm="2" md="2">
                                <label class="label" for="name"
                                  >Designation<span id="imp">*</span>
                                </label>
                              </v-col>
                              <v-col sm="2" md="10">
                                <v-text-field
                                  height="20px"
                                  outlined
                                  type="text"
                                  id="designation"
                                  :rules="designationRules"
                                  v-model="data.designation"
                                  placeholder="Designation"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                      Close
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      @click="submit"
                      class="ma-2"
                      :loading="this.isSubmit"
                      :disabled="this.isSubmit"
                    >
                      <template v-slot:loader>
                        <span class="custom-loader">
                          <v-icon light>mdi-cached</v-icon>
                        </span>
                      </template>

                      Add
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
            <!-------------------------------View Users---------------------------------------------->

            <template v-if="!this.isFetching">
              <v-data-table
                :headers="headers"
                :items="user_list.users"
                :hide-default-footer="true"
                class="elevation-1"
              >
                <template v-slot:[`item.users.users`]="{ item }">
                  <input
                    type="checkbox"
                    v-model="users.users"
                    :value="item.user_id"
                    number
                  />
                </template>
                <template v-slot:[`item.role`]="{ item }"
                  ><td>{{ findUsertype(item?.role) }}</td></template
                >

                <!------------------------------------------------Delete dialogue Box------------------------------------------------------------>

                <template v-slot:[`item.action`]="{ item }">
                  <v-row>
                    <div v-if="users.users.length == 0">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            class="mr-5"
                            v-bind="attrs"
                            v-on="on"
                            color="red"
                            @click="openModal(item.user_id)"
                            >mdi-delete</v-icon
                          >
                        </template>
                        <span>Delete User</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            class="mr-5"
                            color="blue"
                            v-bind="attrs"
                            v-on="on"
                            @click="openUserAllocationModal(item.user_id)"
                            >mdi-account-plus-outline</v-icon
                          >
                        </template>
                        <span>Allocate User</span>
                      </v-tooltip>
                    </div>
                  </v-row>
                  <v-row> </v-row>
                </template>

                <!---------------------------------------------------Pagination----------------------------------------------------------------------------->
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
            </template>
            <template v-else>
              <v-container style="height: 400px">
                <v-row class="fill-height" align-content="center" justify="center">
                  <v-col class="text-subtitle-1 text-center" cols="12">
                    Getting your datas
                  </v-col>
                  <v-col cols="6">
                    <v-progress-linear
                      color="#2196F3"
                      indeterminate
                      rounded
                      height="6"
                    ></v-progress-linear>
                  </v-col>
                </v-row>
              </v-container>
            </template>
          </div>
        </template>
      </div>
    </div>

    <v-dialog v-model="confirmation" max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Confirm </v-card-title>

        <v-card-text> Are you sure you want to delete this record? </v-card-text>

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

        <v-card-text>
          This user is already assigned in a project. Do you want to delete?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red" text @click="onClose()"> No </v-btn>

          <v-btn color="green darken-1" text @click="ReConfirmDelete()"> Yes </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- user allocation modal -->

    <v-dialog v-model="UserAllocationModal" persistent max-width="600px">
      <v-card v-if="UserAllocationModal">
        <div id="title">
          <v-card-title>
            <span class="text-h5">Add User</span>
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
                      <label class="label" for="User Type"
                        >Project<span id="imp">*</span>
                      </label>
                    </v-col>
                    <v-col sm="2" md="10">
                      <v-select
                        :rules="typesRules"
                        :items="options"
                        outlined
                        v-model="project.project_id"
                        placeholder="Project Name"
                      ></v-select>
                    </v-col>
                  </v-row>

                  <v-card-actions class="justify-center"> </v-card-actions>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="CloseUserAllocationModal()">
            Close
          </v-btn>
          <v-btn color="blue darken-1" style="color: white" @click="AddAssignee">
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      type: [
        // {value:"1", text:"Admin"},
        { value: "2", text: "Member" },
        { value: "3", text: "Guest" },
      ],

      id: localStorage.getItem("id"),

      role: "",
      dialog: false,
      isValid: false,
      valid: true,
      confirmation: false,
      Re_confirmation: false,
      isSubmit: false,
      isFetching: false,

      UserAllocationModal: false,
      ProjectList: [],
      users: {
        users: [],
      },

      project: {
        project_id: "",
      },

      pagination: {
        pageCount: "",
        pageNumberCount: 1,

        page: 1,
        limit: 10,
      },

      searchResult: "",
      searchKey: "",

      headers: [
        { text: "", value: "users.users", sortable: false, align: "start" },
        { text: "ID", value: "user_id", sortable: false, align: "start" },
        {
          text: "NAME",

          sortable: false,
          value: "user_name",
        },
        { text: "EMAIL", value: "email", sortable: false },
        { text: "USER TYPE", value: "role", sortable: false },
        { text: "Designation", value: "designation", sortable: false },

        { text: "Action", value: "action", sortable: false },
      ],
      user_list: { users: [], loading: false },

      data: {
        error: [],
        user_name: "",
        email: "",
        role: "",
        designation: "",
        selected: "Select",
      },
      nameRules: [(v) => !!v || "Name is required"],

      emailRules: [
        (v) => !!v || "Email is required",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "Email must be valid",
      ],
      typesRules: [(v) => !!v || "User type is required"],
      designationRules: [(v) => !!v || "Department Id is required"],
    };
  },

  methods: {
    async getProjectsList() {
      try {
        const response = await ApiService("/admin/projectlist", "GET");
        this.ProjectList = response.rows;
      } catch (error) {
        console.log(error, "error................");
      }
    },
    // allocate user to the project
    async AddAssignee() {
      try {
        const response = await ApiService(
          "/admin/projects/" + this.project.project_id,
          "POST",
          this.users
        );
        this.confirmation = false;
        if (response.status == 200) {
          Vue.$toast.success("User is allocated to a project", {
            position: "top",
          });
        } else if (response.status == 93) {
          Vue.$toast.warning("User is already allocated ", {
            position: "top",
          });
        }
        this.UserAllocationModal = false;
        this.users.users = [];
      } catch (error) {
        console.log(error, "error................");
      }
    },

    // <!------------------------------------------get user-------------------------------------------------->
    async getUser(params) {
      this.isFetching = true;
      try {
        const response = await ApiService("admin/users", "GET", null, null, params);

        this.user_list = { users: response?.rows };
        this.pagination.pageCount = response?.count;
        this.pagenationCount = response?.count;
        this.isFetching = false;
        this.handlePageChange();
      } catch (error) {
        console.log(error, "error................");
        this.isFetching = false;
      }
    },
    //-----------------------------------------------Serach User------------------------------------------------------------------------------------

    async searchUser() {
      const params = { searchKey: this.searchKey };
      const response = await ApiService("/users", "GET", null, null, params);
      this.user_list = { users: response?.rows, loading: false };
    },

    // <!-------------------------usertype covertion--------------------------------------->
    findUsertype(value) {
      if (value === 0) {
        return "Admin";
      }
      const role = this.type.find((data) => data?.value == value);
      return role?.text;
    },
    // --------------------add user button--------------------------------------------------------------
    async submit() {
      if (this.$refs.form.validate()) {
        this.user_list.loading = true;
        this.isSubmit = true;
        try {
          const data = {
            user_name: this.data.user_name,
            email: this.data.email,
            role: this.data.role,
            designation: this.data.designation,
          };
          const response = await ApiService("admin/users", "POST", data);
          this.user_list.loading = false;
          this.isSubmit = false;
          this.dialog = false;
          if (response.status == 32) {
            Vue.$toast.warning("" + response.errorMessage, {
              position: "top",
            });
          } else {
            this.getUser();
            Vue.$toast.success("User added Successfully", {
              position: "top",
            });
          }
        } catch (error) {
          console.log(error, "error................");
          this.user_list.loading = false;
        }
      }
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
      this.getUser(params);
    },

    handlePageChange() {
    

      this.pagination.pageNumberCount = Math.ceil(
        this.pagination.pageCount / this.pagination.limit
      );
      
    },
    //------------------------------------------delete user-------------------------------------------------------------------
    async dlt() {
      try {
        this.Re_confirmation = true;
        this.confirmation = false;
      } catch (error) {
        Vue.$toast.error("failed", {
          position: "top",
        });
      }
    },
    async ReConfirmDelete() {
      try {
        const URL = `/admin/users/${this.user_id}`;
        const response = await ApiService(URL, "DELETE");
        if (response.status == 200) {
          Vue.$toast.success("User Deleted Successfully", {
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

    onClose() {
      this.confirmation = false;

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
      this.UserAllocationModal = false;
      this.users.users = [];
    },
  },

  //----------------------------------------------watch func for pagination----------------------------------------------------------------
  watch: {
    // whenever  the given depenedancy  changes, this function will run
    "pagination.limit": function () {
      console.log(
        this.pagination.limit,
        "this.pagination.limitthis.pagination.limitthis.pagination.limit"
      );
      const params = {
        page: this.pagination.page,
        limit: this.pagination.limit,
      };
      console.log("hyyyyyy");
      this.getUser(params);
    },
    // pagination: function () {
    //   const pageNumber = this.findPageNumberCount(
    //     this.pagination.pageCount,
    //     this.pagination.limit
    //   );
    // },

    searchKey: function () {
      this.searchUser();
    },

    //---------------------------------remove data from the form after sumbmit----------------------------------------------------------
    dialog: function (val) {
      if (val) {
        this.data.user_name = "";
        this.data.email = "";
        this.data.role = "";
        this.data.designation = "";
      }
    },
  },

  beforeMount() {
    const params = {
      page: this.pagination.page,
      limit: this.pagination.limit,
      searchKey: this.data.searchKey,
    };
    this.getUser(params);
    this.searchUser(params);
    this.getProjectsList();
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
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
