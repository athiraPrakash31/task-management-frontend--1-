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

      <div class="app-main__outer sec">
        <div class="app-page-title title bg-light">
          <div class="page-title-wrapper">
            <div class="page-title-heading" width="100%">
              <router-link exact :to="'/HomePage/' + this.$route.params.id">
                <v-img src="../../assets/Images/logo.png" width="50"></v-img
              ></router-link>
              <div>
                {{ ProjectData?.project_name }} (
                {{ ProjectData?.project_code }})
              </div>
            </div>

            <div
              class="addbtns"
              style="margin-left: 60%"
              v-if="projectRole == 3 || projectRole == 4"
            >
              <div class="mr-4">
                <v-btn
                  rounded
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                  @click="bulkusersModal()"
                  title="Allocate users"
                >
                  <v-icon left> mdi-account-multiple-plus-outline </v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </div>

        <!--------sub sidebar--------->

        <psSidebar>
          <div class="table">
            <div class="d-flex justify-space-between"></div>
            <!--------------------------------View Members----------------------------------------------->
            <div
              v-if="projectRole == 5 || projectRole == 6 || projectRole == 7"
            >
              <div>
                <v-data-table
                  :headers="headersNew"
                  :items="user_list"
                  :items-per-page="5"
                  class="custom_table_class"
                >
                  <template v-slot:[`item.role`]="{ item }"
                    ><td>{{ item?.role }}</td></template
                  >
                  <template v-slot:[`item.joined_date`]="{ item }"
                    ><p>{{ moment(item.joined_date).format("DD/MM/YYYY") }}</p>
                  </template>
                  <template v-slot:[`item.action`]="{ item }">
                    <v-row v-if="projectRole == 4 || projectRole == 3">
                
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            class="mr-5"
                            v-bind="attrs"
                            v-on="on"
                            color="red"
                            title="Remove User"
                            @click="openModal(item.user_id)"
                            >mdi-account-minus</v-icon
                          >
                        </template>
                        
                     
                    </v-row>
                    <v-row> </v-row>
                  </template>
                </v-data-table>

                <!-------------------- user allocation modal ------------------>

                <v-dialog
                  v-model="UserAllocationModal"
                  persistent
                  max-width="700"
                >
                  <v-card v-if="UserAllocationModal">
                    <div id="title">
                      <v-card-title>
                        <span class="text-h5" style="color: aliceblue"
                          >Allocate User</span
                        >
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
                                <v-col sm="2" md="3">
                                  <label class="label" for="project"
                                    >User Name<span id="imp">*</span>
                                  </label>
                                </v-col>
                                <v-col sm="2" md="9">
                                  <v-select
                                    :items="options"
                                    outlined
                                    menu-props="auto"
                                    multiple
                                    :rules="nameRules"
                                    v-model="users.users"
                                    placeholder="User Name"
                                  ></v-select>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col sm="2" md="3">
                                  <label class="label" for="startdate"
                                    >Start Date<span id="imp">*</span>
                                  </label>
                                </v-col>
                                <v-col sm="2" md="9">
                                  <v-menu
                                    v-model="menu2"
                                    min-width="auto"
                                    :close-on-content-click="false"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="users.from_date"
                                        :rules="projectDateRule"
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
                                <v-col sm="2" md="3">
                                  <label class="label" for="startdate"
                                    >End Date<span id="imp">*</span>
                                  </label>
                                </v-col>
                                <v-col sm="2" md="9">
                                  <v-menu
                                    v-model="menu1"
                                    min-width="auto"
                                    :close-on-content-click="false"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="users.to_date"
                                        placeholder="Start Date"
                                        icon="mdi-calendar"
                                        :rules="projectDateRule"
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
                                      @input="(menu1 = false), (value = 2)"
                                    ></v-date-picker>
                                  </v-menu>
                                </v-col>
                              </v-row>

                              <v-row>
                                <v-col sm="2" md="3">
                                  <label class="label" for="Role"
                                    >Role<span id="imp">*</span>
                                  </label>
                                </v-col>
                                <v-col sm="2" md="9">
                                  <v-select
                                    :rules="RoleRule"
                                    :items="ProjectRoleLists"
                                    outlined
                                    v-model="users.role"
                                    placeholder="Role"
                                  ></v-select>
                                </v-col>
                              </v-row>

                              <v-card-actions class="justify-center">
                              </v-card-actions>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-container>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                      <v-btn
                        color="blue darken-1"
                        style="color: white"
                        :disabled="isallocateForm"
                        @click="AddAssignee"
                      >
                        Add
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- delete modal -->

                <v-dialog v-model="confirmation" max-width="400">
                  <v-card>
                    <v-card-title class="text-h5"> </v-card-title>

                    <v-card-text>
                      Are you sure you want to delete this record?
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn color="red" text @click="onClose()"> No </v-btn>

                      <v-btn color="green darken-1" text @click="deleteUser()">
                        Yes
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </div>

            <div v-if="projectRole == 3 || projectRole == 4">
              <div>
                <v-data-table
                  :headers="headers"
                  :items="user_list"
                  :items-per-page="5"
                  class="custom_table_class"
                >
                  <template v-slot:[`item.role`]="{ item }"
                    ><td>{{ item?.role }}</td></template
                  >
                  <template v-slot:[`item.joined_date`]="{ item }"
                    ><p>{{ moment(item.joined_date).format("DD/MM/YYYY") }}</p>
                  </template>
                  <template v-slot:[`item.action`]="{ item }">
                    <v-row v-if="projectRole == 4 || projectRole == 3">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }" >
                          <v-icon
                            class="mr-5"
                            v-bind="attrs"
                            v-on="on"
                            color="red"
                            
                            @click="openModal(item.user_id)"
                            >mdi-account-minus</v-icon
                          >
                        </template>
                        <span>Remove User</span>
                      </v-tooltip>
                    </v-row>
                    <v-row> </v-row>
                  </template>
                </v-data-table>

                <!-------------------- user allocation modal ------------------>

                <v-dialog
                  v-model="UserAllocationModal"
                  persistent
                  max-width="700"
                >
                  <v-card v-if="UserAllocationModal">
                    <div id="title">
                      <v-card-title>
                        <span class="text-h5" style="color: aliceblue"
                          >Allocate User</span
                        >
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
                                <v-col sm="2" md="3">
                                  <label class="label" for="project"
                                    >User Name<span id="imp">*</span>
                                  </label>
                                </v-col>
                                <v-col sm="2" md="9">
                                  <v-select
                                    :items="options"
                                    outlined
                                    menu-props="auto"
                                    multiple
                                    :rules="nameRules"
                                    v-model="users.users"
                                    placeholder="User Name"
                                  ></v-select>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col sm="2" md="3">
                                  <label class="label" for="startdate"
                                    >Start Date<span id="imp">*</span>
                                  </label>
                                </v-col>
                                <v-col sm="2" md="9">
                                  <v-menu
                                    v-model="menu2"
                                    min-width="auto"
                                    :close-on-content-click="false"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="users.from_date"
                                        :rules="projectDateRule"
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
                                <v-col sm="2" md="3">
                                  <label class="label" for="startdate"
                                    >End Date<span id="imp">*</span>
                                  </label>
                                </v-col>
                                <v-col sm="2" md="9">
                                  <v-menu
                                    v-model="menu1"
                                    min-width="auto"
                                    :close-on-content-click="false"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="users.to_date"
                                        placeholder="Start Date"
                                        icon="mdi-calendar"
                                        :rules="projectDateRule"
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
                                      @input="(menu1 = false), (value = 2)"
                                    ></v-date-picker>
                                  </v-menu>
                                </v-col>
                              </v-row>

                              <v-row>
                                <v-col sm="2" md="3">
                                  <label class="label" for="Role"
                                    >Role<span id="imp">*</span>
                                  </label>
                                </v-col>
                                <v-col sm="2" md="9">
                                  <v-select
                                    :rules="RoleRule"
                                    :items="ProjectRoleLists"
                                    outlined
                                    v-model="users.role"
                                    placeholder="Role"
                                  ></v-select>
                                </v-col>
                              </v-row>

                              <v-card-actions class="justify-center">
                              </v-card-actions>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-container>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                      <v-btn
                        color="blue darken-1"
                        style="color: white"
                        :disabled="isallocateForm"
                        @click="AddAssignee"
                      >
                        Add
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- delete modal -->

                <v-dialog v-model="confirmation" max-width="400">
                  <v-card>
                    <v-card-title class="text-h5"> </v-card-title>

                    <v-card-text>
                      Are you sure you want to delete this record?
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn color="red" text @click="onClose()"> No </v-btn>

                      <v-btn color="green darken-1" text @click="deleteUser()">
                        Yes
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </div>
          </div>
        </psSidebar>
      </div>
    </div>
  </div>
</template>





  <script>
import ApiService from "../../service/apiservice.js";
import psSidebar from "./psSidebar.vue";
import sideNavigation from "./adminSideNav.vue";
import topNavigation from "./adminTopNav.vue";
import Vue from "vue";
import "vue-toast-notification/dist/theme-sugar.css";
import VueToast from "vue-toast-notification";
Vue.use(VueToast);

let moment = require("moment");
export default {
  components: { sideNavigation, topNavigation, psSidebar },

  data() {
    return {
      confirmation: false,
      type: [
        { value: "1", text: "Admin" },
        { value: "2", text: "Member" },
        { value: "3", text: "Guest" },
      ],
      role: "",
      menu2: false,
      menu1: false,
      moment: moment,
      allocatedUser: "",
      unAllocatedUser: "",
      dialog: false,
      RoleList: [],
      UserAllocationModal: false,
      users: {
        from_date: "",
        to_date: "",
        users: [],
        role: "",
      },
      isallocateForm: false,
      status: "",
      isValid: false,
      ProjectData: [],
      valid: true,
      // joined_date: joined_date.slice(0,11),
      nameRules: [(v) => v.length > 0 || "user names required"],
      projectDateRule: [(v) => !!v || "Date is required"],
      RoleRule: [(v) => !!v || "Role is required"],
      headersNew: [
        { text: "NAME", sortable: false, value: "user_name", class: "info" },
        {
          text: "ROLE",
          value: "role",
          sortable: false,
          class: "info",
        },
        {
          text: "JOINED ON",
          value: "joined_date",
          sortable: false,
          class: "info",
        },

        {
          text: "ACTION",
          value: "action",
          sortable: false,
          class: "info",
          align: " d-none",
        },
      ],
      headers: [
        { text: "NAME", sortable: false, value: "user_name", class: "info" },
        {
          text: "ROLE",
          value: "role",
          sortable: false,
          class: "info",
        },
        {
          text: "JOINED ON",
          value: "joined_date",
          sortable: false,
          class: "info",
        },

        { text: "ACTION", value: "action", sortable: false, class: "info" },
      ],
      UserList: [],
      projectRole: "",

      user_list: [],
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

        this.users.from_date = response.start_date;
        this.users.to_date = response.end_date;
        this.minDate = response.start_date;
        this.maxDate = response.end_date;
        this.ProjectData = response;
        console.log(response);
      } catch (error) {
        console.log(error, "error................");
      }
    },
    async getUser() {
      try {
        const id = this.$route.params.id;

        const response = await ApiService(
          "/project/getUnallocatedUsers/" + id,
          "GET"
        );
        this.UserList = response;
      } catch (error) {
        console.log(error, "error................");
        this.isFetching = false;
      }
    },
    bulkusersModal() {
      this.getUser();
      this.getProjectRole();
      this.UserAllocationModal = true;
    },
    async getAllocatedUser() {
      try {
        const id = this.$route.params.id;

        const response = await ApiService(
          "project/Usersprojects/" + id,
          "GET",
          null
        );

        if (response.length !== 0) {
          this.user_list = response;
        }
      } catch (error) {
        console.log(error, "error................");
      }
    },
    async AddAssignee() {
      if (this.$refs.form.validate()) {
        this.isallocateForm = true;
        const id = this.$route.params.id;
        try {
          const response = await ApiService(
            "project/allocateUser/" + id,
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
          this.allocatedUser="",
          this.unAllocatedUser="",
          this.getAllocatedUser();
          this.$refs.form.reset();

          this.users.users = [];
          this.UserAllocationModal = false;
         
        } catch (error) {
          Vue.$toast.warning("Allocation Failed", {
            position: "top",
          });
        }
      }
    },
    //-------------------------------------------------user type convertion----------------------------------------------------------
    findUsertype(value) {
      if (value === 0) {
        return "Admin";
      }
      const role = this.type.find((data) => data?.value == value);
      console.log(this.type, "this.type");
      return role?.text;
    },
    openModal(user_id) {
      this.uid = user_id;
      this.confirmation = true;
    },
    async deleteUser() {
      const params = {
        project_id: this.$route.params.id,
      };

      try {
        const response = await ApiService(
          "project/unallocated/" + this.uid,
          "DELETE",
          null,
          null,
          params
        );

        if (response.statusCode == 200) {
          Vue.$toast.success("User Deleted Successfully", {
            position: "top",
          });
        }
        if (response.statusCode == 400) {
          Vue.$toast.Error("Error", {
            position: "top",
          });
        }
        this.Re_confirmation = false;
        this.user_list = null;
      } catch (error) {
        Vue.$toast.error("Failed", {
          position: "top",
        });
      }
      this.$router.go("/members/" + this.$route.params.id);
      this.confirmation = false;
    },
    onClose() {
      this.confirmation = false;
    },
    CloseUserAllocationModal() {
      this.$refs.form.reset();
      this.getProjectDetails();

      this.UserAllocationModal = false;
    },
    async getProjectRole() {
      try {
        const response = await ApiService("/users/projectrolelist", "GET");
        this.ProjectRoleList = response;
      } catch (error) {
        console.log(error, "error................");
      }
    },
  },
  beforeMount() {
    this.getProjectDetails();

    this.getAllocatedUser();
    this.projectRole = localStorage.getItem("projectRole");
  },

  computed: {
    options() {
      let opts = [];
      for (let i = 0; i <= this.UserList.length - 1; i++) {
        opts.push({
          text: this.UserList[i].user_name,
          value: this.UserList[i].user_id,
        });
      }
      return opts;
    },
    ProjectRoleLists() {
      let opts = [];
      for (let i = 0; i <= this.ProjectRoleList.length - 1; i++) {
        if (this.ProjectRoleList[i].role_id >= this.projectRole) {
          opts.push({
            text: this.ProjectRoleList[i].role_name,
            value: this.ProjectRoleList[i].role_id,
          });
        }
      }
      return opts;
    },
  },
};
</script>
    
    <style scoped>
#imp {
  color: red;
}
.v-text-field {
  height: 20%;
}
.label {
  font-size: medium;
}
.title {
  padding: 15px 0px 15px 0;
  margin: 0 !important;
  position: relative;
  min-height: 65px;
  padding-top: 16px;
}
.table {
  width: 78%;
  height: 100%;
  padding: 43px;
}
.app-main {
  width: 100%;
}
.sec {
  width: 100% !important;
}
.custom_table_class > div > table > thead {
  background-color: #4fa5d6;
  border-radius: 10px;
}
</style>