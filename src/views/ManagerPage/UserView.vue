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
              <v-img src="../../assets/Images/logo.png" width="70"></v-img>

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
                >
                  <v-icon left> mdi-account-multiple-plus-outline </v-icon>
                </v-btn>
              </div>


            
            </div>
          </div>
        </div>
        <template>
          <!-------------------------------View Users- TABLE--------------------------------------------->
          <div class="datatable">
            <template v-if="!this.isFetching">
              <v-data-table
                :headers="headers"
                :items="user_list.users"
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
                <template v-slot:[`item.role.role_name`]="{ item }"
                  ><td>{{ item?.user.role_name }}</td></template
                >
                <template v-slot:[`item.active_projects`]="{ item }">
                  <td v-if="(item.active_projects!=null)" color="green">
                    <v-icon
                      v-bind="attrs"
                      v-on="on"
                      color="blue"
                      size="large"
                      @click="OpenUserInfo(item.user_id)"
                      >mdi-information-outline</v-icon
                    >Allocated
                  </td>
                  <td v-if="(item.active_projects==null)" color="green">
                    <v-icon
                      v-bind="attrs"
                      v-on="on"
                      color="blue"
                      size="large"
                      @click="OpenUserInfo(item.user_id)"
                      ></v-icon
                    >Free
                  </td></template
                >
                <!------------------------------------------------Delete dialogue Box------------------------------------------------------------>

                <template v-slot:[`item.action`]="{ item }">
                  <v-row>
                    <div v-if="users.users.length == 0">
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

              </v-data-table>
             
            </template>
          </div>
        </template>
      </div>
    </div>

    <!-------------------- user allocation modal ------------------>

    <v-dialog v-model="UserAllocationModal" persistent max-width="700">
      <v-card v-if="UserAllocationModal">
        <div id="title">
          <v-card-title>
            <span class="text-h5">Allocate User</span>
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
                        :rules="typesRules"
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
                  <v-card-actions class="justify-center"> </v-card-actions>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            color="blue darken-1"
            style="color: white"
            @click="AddAssignee"
          >
            Add
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
                      <th class="text-center">#</th>
                      <th>Project Name</th>
                      <th class="text-center">start Date</th>
                      <th class="text-center">End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in UserAllocationInfo" :key="item.user_id">
                      <td class="text-center text-muted">{{ item.project_code }}</td>
                      <td>
                        <div class="widget-content p-0">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left flex2">

                              <div class="widget-heading">
                                {{ item.project_name }}                              </div>

                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="text-center">
                        <p> {{ item.from_date }} </p>
                      </td>
                      <td class="text-center">
                        <p>{{ item.to_date }}</p>
                      </td>
                    </tr>
                    
                    <tr>
                    
                  
                    </tr>
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
import topNavigation from "./topNav.vue";
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
      from_date: "",
      type: [
        { value: "2", text: "Manager" },
        { value: "3", text: "Guest" },
      ],

      id: localStorage.getItem("id"),

      role: "",
      dialog: false,
      isValid: false,
      valid: true,
      menu2: false,
      menu1: false,

      confirmation: false,
      Re_confirmation: false,
      isSubmit: false,
      isFetching: false,
      UserAllocationInfo:[],
      UserAllocationModal: false,
      ProjectList: [],
      users: {
        from_date:"",
        to_date:"",
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
RoleList:[],
      searchResult: "",
      searchKey: "",

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

          value: "user_id",
          sortable: false,
          align: "start",
          width: "3%",
        },
        { text: "NAME", sortable: false, value: "user_name", width: "15%" },
        { text: "EMAIL", value: "email", sortable: false, width: "20%" },
        { text: "STATUS", value: "active_projects", sortable: false, width: "10%" },

        { text: "ROLE", value: "role.role_name", sortable: false, width: "10%" },
        
        { text: "Action", value: "action", sortable: false, width: "10%" },
      ],
      user_list: { users: [], loading: false },
      limit: [
        {
          type: "fromto",
          from: this.StartDate,
        },
      ],
      data: {
        error: [],
        user_name: "",
        email: "",
        role: "",
       
        selected: "Select",
      },
      nameRules: [
        (v) => !!v || "Name is required",
        (v) =>
          /^[a-zA-Z ]+(?:-[a-zA-Z ]+)*$/.test(v) || "Enter a valid user name",
      ],

      emailRules: [
        (v) => !!v || "Email is required",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "Email must be valid",
      ],
      typesRules: [(v) => !!v || "Role is required"],
    };
  },

  methods: {
    // allowedDates: val => parseInt(val.Date.parse(this.EndDate) <= Date.parse(this.StartDate)),
    async ProjectDetails(id) {
      const response = await ApiService("project/overallProjectStatus/" + id, "GET");
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
        this.ProjectList = response.allocatedProject;
      } catch (error) {
        console.log(error, "error................");
      }
    },
    async getRole() {
      try {
        const response = await ApiService("/users/getRoles", "GET");
        this.RoleList = response;
       
      } catch (error) {
        console.log(error, "error................");
      }
    },
    async  OpenUserInfo(uid) {
      this.userInfoModal = true;

      this.user_id = uid;
      try {
        const URL = `/users/getAllocatedProjects/${this.user_id}`;
        const response = await ApiService(URL, "GET");
        this.UserAllocationInfo=response.allocatedProject;
        
        }
       catch (error) {
        Vue.$toast.error("Failed", {
          position: "top",
        });
      }
     
    },
    // allocate user to the project
    async AddAssignee() {
      try {
        const response = await ApiService(
          "project/allocateUser/" + this.project.project_id,
          "POST",
          this.users
        );
              for (let i = 0; i <= this.response.length - 1; i++) {
                alert()
              }
                

        this.confirmation = false;
        if(response[0].code==2){
          Vue.$toast.success("User added Successfully", {
              position: "top",
            });
        }
        else{
          Vue.$toast.warning(" Allocation failed", {
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
        const response = await ApiService("/users", "GET", null, null, params);
        console.log(response, "responseresponseresponse");

        this.user_list = { users: response?.data };
        console.log(this.user_list)
        this.pagination.pageCount = response?.count;
        this.pagenationCount = response?.count;
        this.isFetching = false;
        // this.pagination?.limit = response?.limit;
        console.log(response);
        console.log(this.pagination.pageCount, "Count");
        this.handlePageChange();
      } catch (error) {
        console.log(error, "error................");
        this.isFetching = false;
      }
    },
    //-----------------------------------------------Serach User------------------------------------------------------------------------------------

    async searchUser() {
      // this.flag=1;

      if (this.searchKey == "") {

 const params = {page:1,limit:10 };
      const response = await ApiService("/users", "GET", null, null, params);
      this.user_list = { users: response?.data, loading: false };

      }
      else{
const params = {searchCol:"user_name", searchKey: this.searchKey };
      console.log(params, "searchKey..................");
      const response = await ApiService("/users", "GET", null, null, params);
      console.log(response, "response....................");
      this.user_list = { users: response?.data, loading: false };
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
          if (response.status == 32) {
            Vue.$toast.warning("" + response.errorMessage, {
              position: "top",
            });
          } else {
            this.getUser();
            Vue.$toast.success("User added Successfully", {
              position: "top",
            });
            this.dialog = false;
          }
        } catch (error) {
          console.log(error, "error................");
          // this.user_list.loading = false;
        }
      }
    },

    //------------------------------------------delete user-------------------------------------------------------------------
    async dlt() {
      try {
        const URL = `/users/${this.user_id}`;
        const response = await ApiService(URL, "DELETE");
        if (response.status == 32) {
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
      this.UserAllocationModal = false;
      this.users.users = [];
      this.$refs.form.resetValidation();
      this.value = "";
    },
  },

  //----------------------------------------------watch func for pagination----------------------------------------------------------------
  watch: {
    // whenever  the given depenedancy  changes, this function will run

    searchKey: function () {
      console.log(this.data.searchKey, "search key key key.........................");

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
    };
    this.getUser(params);
    this.getRole()
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

/* .custom-loader {
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
} */
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
  margin-top: -45px;
  margin-right: 238px;
}
.heading2 {
  justify-content: space-between;
  width: 100%;
}
.v-text-field {
  margin-left: 5%;
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
</style>
