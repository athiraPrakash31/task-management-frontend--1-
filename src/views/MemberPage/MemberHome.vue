<template>
  <div class="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
    <!-- top nav -->
    <memeberTopnav />

    <div class="app-main">
      <!-- side nav -->
      <memebersidenav />
      <div class="app-main__outer">
        <div class="app-main__inner">
          <div class="app-page-title bg-light p-1">
            <div class="page-title-wrapper">
              <div class="page-title-heading">
                <v-img src="../../assets/Images/logo.png" width="50"></v-img>
                <div>
                  {{ projectStatus?.project_name }} ( {{ projectStatus?.project_code }})
                </div>
              </div>
              <div class="NameAvtar"></div>
            </div>
          </div>

          <h5 id="f1">
            Project Home :
            <span id="f2">Recent Updates <v-icon>mdi-signal-variant</v-icon></span>
          </h5>

          <div class="row">
            <div class="col-md-6 col-lg-8">
              <div class="mb-3 card">
                <div class="card-header-tab card-header">
                  <div class="card-header-title">
                    <em class="header-icon lnr-rocket icon-gradient bg-tempting-azure">
                    </em>
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
                          <v-badge
                            color="primary"
                            content="Comment"
                            left
                            inline
                          ></v-badge>
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
                          <v-badge
                            color="primary"
                            content="Updated"
                            left
                            inline
                          ></v-badge>
                          the issue
                        </div>
                        <div class="widget-subheading">Revenue streams</div>
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
                          Riya
                          <v-badge
                            color="primary"
                            content="Updated"
                            left
                            inline
                          ></v-badge>
                          the issue
                        </div>
                        <div class="widget-subheading">Revenue streams</div>
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
                          <v-badge
                            color="primary"
                            content="Updated"
                            left
                            inline
                          ></v-badge>
                          the issue
                        </div>
                        <div class="widget-subheading">Revenue streams</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-4">
              <div
                class="card-shadow-danger mb-3 widget-chart widget-chart2 text-left card"
              >
                <div class="widget-content">
                  <div class="widget-content-outer">
                    <div class="widget-content-wrapper">
                      <div class="widget-content-left pr-2 fsize-1"></div>
                      <div class="widget-content-right w-100">
                        <div class="progress-bar-xs progress">
                          <div
                            class="progress-bar bg-danger"
                            role="progressbar"
                            aria-valuenow="10"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style="width: 0%"
                          ></div>
                          <div
                            class="progress-bar bg-primary"
                            role="progressbar"
                            aria-valuenow="20"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style="width: 0%"
                          ></div>
                          <div
                            class="progress-bar bg-success"
                            role="progressbar"
                            aria-valuenow="60"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style="width: 100%"
                          ></div>
                          <div
                            class="progress-bar bg-warning"
                            role="progressbar"
                            aria-valuenow="10"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style="width: 0%"
                          ></div>
                        </div>

                        <div class="progress-sub-label">
                          <div class="sub-label-right">closed 100%</div>
                          &nbsp;&nbsp;&nbsp;
                        </div>
                      </div>
                    </div>

                    <div class="text-center d-flex">
                      <div class="sub-label-right">
                        Open:
                        <div class="badge badge-danger mr-2">
                          2{{ projectStatus?.openTask }}
                        </div>
                      </div>
                      <br />

                      <div class="sub-label-right">
                        In Progress:
                        <div class="badge badge-primary mr-2">
                          4{{ projectStatus?.Ongoing }}
                        </div>
                      </div>
                      <br />
                      <div class="sub-label-right">
                        Closed:
                        <div class="badge badge-success mr-2">
                          5 {{ projectStatus?.Closed }}
                        </div>
                      </div>
                      <br />
                      <div class="sub-label-right">
                        Resolved:
                        <div class="badge badge-warning mr-2">
                          6 {{ projectStatus?.Completed }}
                        </div>
                      </div>
                      <br />
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
import memebersidenav from "./MemberSideNav.vue";
import memeberTopnav from "./MemberTopNav.vue";
import ApiService from "../../service/apiservice";

export default {
  components: { memebersidenav, memeberTopnav },
  data() {
    return {
      ProjectData: "",
      projectStatus: [],
      dialogm1: "",
      dialog: false,
      userId: {
        id: this.$route.params.id,
      },
      dateFormatConfig: {
        dayOfWeekNames: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        dayOfWeekNamesShort: ["Su", "Mo", "Tu", "We", "Tr", "Fr", "Sa"],
        monthNames: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        monthNamesShort: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    };
  },
  methods: {
    currentDate() {
      const current = new Date();

      const date = `${current.getDay()}-${current.getDate()}-${
        current.getMonth() + 1
      }-${current.getFullYear()}`;

      return date;
    },

    async getProjectDetails(id) {
      try {
        const response = await ApiService("/user/projectDetails/" + id, "GET");
        this.ProjectData = response;
      } catch (error) {
        console.log(error, "error................");
      }
    },
    async AddAssignee() {
      try {
        const id = this.$route.params.id;
        const response = await ApiService("/memeber/projects/" + id, "PUT", this.data);
        this.listsss = response.rows;
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
        console.log(error, "error................");
      }
    },
  },

  mounted() {
    this.getProjectDetails();

    this.ProjectStatus();
  },
};
</script>

<style>
#f1 {
  font-size: larger;
  font-weight: bold;
}
#f2 {
  font-size: medium;
  font-weight: 500;
}
#frame {
  box-sizing: border-box;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: aliceblue;
  width: 70%;
  height: fit-content;
}
#filter {
  margin-left: 750px;
  margin-top: -31px;
}
#btn {
  margin-left: 2%;
}
#pfil {
  margin-left: 3%;
}
</style>
