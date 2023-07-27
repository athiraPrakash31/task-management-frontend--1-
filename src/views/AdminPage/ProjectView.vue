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
          <div class="app-page-title">
            <div class="page-title-wrapper">
              <div class="page-title-heading">
                <router-link exact :to="'/HomePage/' + this.$route.params.id">
                <v-img src="../../assets/Images/logo.png" width="70"></v-img></router-link>
                <div>Innovature Technologies K.K</div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 col-lg-12">
              <div class="mb-3 card">
                <div
                  class="card-header-tab card-header-tab-animation card-header"
                >
                  <div class="card-header-title">Projects</div>

                  <ul class="nav">
                    <li class="nav-item">
                      <a href="javascript:void(0);" class="active nav-link"
                        ><em class="nav-link-icon fa fa-edit"></em>Edit</a
                      >
                    </li>
                    <li class="nav-item">
                      <v-dialog v-model="dialog" width="500">
                        <template v-slot:activator="{ on, attrs }">
                          <a @click="openModal()" v-bind="attrs" v-on="on" class="active nav-link">
                            <em class="nav-link-icon fa fa-add"></em> Add
                            Assignee</a
                          >
                        </template>
                      </v-dialog>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="card cardMsg mb-3 widget-content">
                <v-avatar>
                  <img
                    src="https://innovature.ai/wp-content/uploads/2020/10/logo.png"
                    alt="John"
                  />
                </v-avatar>
                <div class="widget-content-outer">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <div class="widget-heading">
                        {{ ProjectData?.project_name }}
                      </div>
                      <div class="widget-subheading">
                        {{ ProjectData?.project_code }}
                      </div>
                      <br />
                      <p>{{ ProjectData?.project_description }}</p>
                      <br />
                      <div class="widget-subheading">
                        Start Date: {{ ProjectData?.start_date }}
                      </div>
                      <div class="widget-subheading">
                        End Date: {{ ProjectData?.end_date }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center">
            <v-dialog v-model="dialog" width="500">
              <v-card>
                <template>
                  <v-card-title class="text-h5 grey lighten-2">
                    Assignee a Manager
                  </v-card-title>

                  <br />

                  <v-form
                    ref="form"
                    v-model="isValid"
                    @submit.prevent="AddAssignee"
                    method="post"
                  >
                    <v-card-text>
                      <span style="color: black">Assignee</span
                      ><sup class="red--text">*</sup>
                      <v-select
                        outlined
                        clearable
                        placeholder="manager"
                        color="black"
                        :rules="assigneeRules"
                        :error-messages="assigneeError"
                        required
                        v-model="data.manager_id"
                        :items="options"
                      >
                      </v-select>

                      <v-card-actions class="justify-center">
                        <v-btn
                          color="#4FA5D6"
                          style="color: white"
                          :disabled="!isValid"
                          type="submit"
                        >
                          Add
                        </v-btn>
                      </v-card-actions>
                    </v-card-text>
                  </v-form>

                  <br /> </template></v-card
            ></v-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

       
   
      
      <script>
import sideNavigation from "./adminSideNav.vue";
import topNavigation from "./adminTopNav.vue";
import ApiService from "../../service/apiservice";
export default {
  components: { sideNavigation, topNavigation },
  data: () => ({
    ProjectData: [],
    listManager: [],
    dialog: false,
    pagination: {
      searchCol: "user_type",
      searchKey: 1,
    },

    data: {
      manager_id: "",
    },
  }),

  mounted() {
    this.getProjectDetails();
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
    async AddAssignee() {
      try {
        const id = this.$route.params.id;
        const response = await ApiService(
          "/admin/projects/" + id,
          "PUT",
          this.data
        );
        this.listsss = response.rows;
      } catch (error) {
        console.log(error, "error................");
      }
    },
  },
  openModal(){
    this.dialog=true
  }
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
</style>