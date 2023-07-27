<template>
  <div class="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
    <!-- top nav -->
    <topNavigation />

    <div class="app-main">
      <!-- side nav -->

      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading" style="margin-left: 40%">
              <v-img src="../../assets/Images/logo.png" width="70"></v-img>
              <div>Innovature Technologies K.K</div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 col-lg-6">
            <div class="row">
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <div class="card-header-tab card-header-tab-animation card-header">
                      <div class="card-header-title">
                        <em class="metismenu-state-icon fa fa-file-code-o caret-left"></em>
                        Projects
                      </div>
                    </div>
                  </v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <div
                      class="card cardMsg mb-3 widget-content"
                      v-for="item in items"
                      :key="item.id"
                    >
                      <v-avatar>
                        <img src="../../assets/Images/logo.png" />
                      </v-avatar>
                      <div
                        class="widget-content-outer"
                        @mouseover="upHere = true"
                        @mouseleave="upHere = false"
                      >
                        <div class="widget-content-right-top">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <a
                                class="btn float-right"
                                v-on:click="ProjectSetting(item.project_id)"
                              >
                                <v-icon v-bind="attrs" v-on="on" style="color: black"
                                  >mdi-cog-outline</v-icon
                                >
                              </a>
                            </template>
                            <span>Project setting</span>
                          </v-tooltip>
                        </div>
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left">
                            <a v-on:click="ProjectDetail(item.project_id)">
                              <div class="widget-heading">
                                {{ item?.project_name }}
                              </div>
                            </a>

                            <div class="widget-subheading">
                              {{ item?.project_code }}
                            </div>
                            <br />
                            <div class="widget-subheading">
                              <ul class="header-menu nav">
                                <li class="nav-item">
                                  <router-link to="/AdminDashBoardView"> </router-link>
                                </li>
                                <li class="btn-group nav-item">
                                  <router-link :to='"/manager/taskList/"+ this.$route.params.id'>
                                    <a
                                      href="javascript:void(0);"
                                      class="nav-link"
                                      style="color: black"
                                    >
                                      Task
                                    </a>
                                  </router-link>
                                </li>
                                <li class="dropdown nav-item">
                                  <router-link :to='"/manager/addTask/"+this.$route.params.id'>
                                    <a
                                      href="javascript:void(0);"
                                      class="nav-link"
                                      style="color: black"
                                    >
                                      Add Task
                                    </a>
                                  </router-link>
                                </li>
                                <li class="dropdown nav-item">
                                  <router-link :to="'/file/' + item.project_id">
                                    <a
                                      href="javascript:void(0);"
                                      class="nav-link"
                                      style="color: black"
                                    >
                                      Files
                                    </a>
                                  </router-link>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <some-component v-show="upHere"> </some-component>
                        </div>
                      </div>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
            <br /><br /><br /><br /><br />
            <div class="row margin-top">
              <v-expansion-panels>
                <v-expansion-panel>
                  <div class="mb-3 card">
                    <v-expansion-panel-header>
                      <div class="card-header-tab card-header-tab-animation card-header">
                        <div class="card-header-title">
                          <em
                            class="metismenu-state-icon fa fa-chevron-down caret-left"
                          ></em>
                          My Tasks
                        </div>
                        <div class="search-wrapper" style="float: left">
                          <div class="input-holder">
                            <input
                              type="text"
                              class="search-input"
                              placeholder="Type to search"
                            />
                            <button class="search-icon"><span></span></button>
                          </div>
                          <button class="close"></button>
                        </div>
                      </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <div class="card cardMsg mb-3 widget-content">
                        <div class="table-responsive">
                          <table
                            class="align-middle mb-0 table table-borderless table-striped table-hover"
                          >
                            <thead>
                              <tr>
                                <th class="text-center">Key</th>
                                <th>Subject</th>
                                <th class="text-center">Priority</th>
                                <th class="text-center">Status</th>
                                <th class="text-center">Due</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="item in task_list" :key="item.user_id">
                                <td class="text-center text-muted">#345</td>
                                <td>
                                  <div class="widget-content p-0">
                                    <div class="widget-content-wrapper">
                                      <div class="widget-content-left flex2">
                                        <div class="widget-heading">
                                          App:Registeration
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td class="text-center">
                                  <em
                                    class="fa fa-arrow-up"
                                    style="color: red"
                                    aria-hidden="true"
                                  ></em>
                                </td>
                                <td class="text-center">
                                  <div class="badge badge-warning">Closed</div>
                                </td>
                                <td class="text-center" style="color: red">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-fire"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"
                                    />
                                  </svg>
                                  Nov 29
                                </td>
                              </tr>
                              <tr>
                                <td class="text-center text-muted">#346</td>
                                <td>
                                  <div class="widget-content p-0">
                                    <div class="widget-content-wrapper">
                                      <div class="widget-content-left flex2">
                                        <div class="widget-heading">App:Login Page</div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td class="text-center">
                                  <em class="fa fa-arrow-right" aria-hidden="true"></em>
                                </td>
                                <td class="text-center">
                                  <div class="badge badge-success">Resolved</div>
                                </td>
                                <td class="text-center" style="color: red"></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </v-expansion-panel-content>
                  </div>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </div>

          <div class="col-md-12 col-lg-6">
            <div class="mb-3 card">
              <div class="card-header-tab card-header">
                <div class="card-header-title">
                  <em class="header-icon lnr-rocket icon-gradient bg-tempting-azure"> </em>
                  Recent Updates
                </div>
              </div>
              <div class="card cardMsg mb-3 widget-content">
                <v-avatar>
                  <img
                    src="https://www.shutterstock.com/image-vector/young-man-avatar-character-260nw-661669825.jpg"
                    alt="John"
                  />
                </v-avatar>
                <div class="widget-content-outer">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <div class="widget-heading">
                        Kelbin Posted a
                        <v-badge color="primary" content="Comment" left inline></v-badge>
                        on the issue
                      </div>
                      <div class="widget-subheading">Revenue streams</div>

                      <div class="widget-subheading">about 3 hours ago</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card cardMsg mb-3 widget-content">
                <v-avatar>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3WEmfJCME77ZGymWrlJkXRv5bWg9QQmQEzw&usqp=CAU"
                    alt="John"
                  />
                </v-avatar>
                <div class="widget-content-outer">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <div class="widget-heading">
                        Athira
                        <v-badge color="primary" content="Updated" left inline></v-badge>
                        the issue
                      </div>
                      <div class="widget-subheading">Revenue streams</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topNavigation from "./topNav.vue";
import "vue-toast-notification/dist/theme-sugar.css";
import ApiService from "../../service/apiservice.js";

export default {
  components: { topNavigation },
  data: () => ({
    upHere: false,
    items: [],
    confirmation: false,
    task_list: [],
    dialogm1: "",
    dialog: false,
  }),
  mounted() {
    this.getProjectsList();

    const params = {
      searchCol2: "assignee",
      searchKey2: 2,
    };
    this.getTask(params);
  },
  methods: {
    async getTask(params) {
      const response = await ApiService("task/listTask", null, null, "GET", params);
      this.task_list = response?.data.rows;
    },

    async getProjectsList() {
      try {
        const response = await ApiService("/project/getProject", "GET");
        this.items = response.allocatedProject;
      } catch (error) {
        console.log(error, "error................");
      }
    },

    ProjectDetail(id) {
      localStorage.setItem("projectId", JSON.stringify(id));

      this.$router.push("/manager/HomeView/" + id);
    },
    ProjectSetting(id) {
      this.$router.push("/members/" + id);
    },
    ProjectDelete(id) {
      this.confirmation = true;
      this.project_id = id;
    },
    onClose() {
      this.confirmation = false;
      this.project_id = null;
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
</style>
