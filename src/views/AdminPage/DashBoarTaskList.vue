<template>
  <div class="card cardMsg mb-3 widget-content">
    <div class="table-responsive">
      <table class="align-middle mb-0 table table-borderless table-striped table-hover">
        <taskList />
        <thead>
          <tr>
            <th id="" class="text-center">Key</th>
            <th id="" class="text">Project Name</th>
            <th id="" class="text">Task Name</th>
            <th id="" class="text">Priority</th>
            <th id="" class="text">Status</th>
            <th id="" class="text">Due</th>
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
                      {{ item.project_name }}
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div class="widget-content p-0 center">
                <div class="widget-content-wrapper">
                  <div class="widget-content-left flex2">
                    <div class="widget-heading">
                      {{ item.task_name }}
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td v-if="item.priority == 3">
              <em class="fa fa-arrow-up" style="color: red" aria-hidden="true"></em>
            </td>
            <td v-if="item.priority == 2">
              <em class="fa fa-arrow-right" style="color: black" aria-hidden="true"></em>
            </td>
            <td v-if="item.priority == 1">
              <em class="fa fa-arrow-down" style="color: gray" aria-hidden="true"></em>
            </td>

            <td v-if="item.task_status == 1">
              <div class="badge badge-danger">open</div>
            </td>
            <td v-if="item.task_status == 2">
              <div class="badge badge-primary">Inprogress</div>
            </td>
            <td v-if="item.task_status == 3">
              <div class="badge badge-warning">Resolved</div>
            </td>
            <td v-if="item.task_status == 4">
              <div class="badge badge-success">Closed</div>
            </td>
            <td style="color: red">
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
        </tbody>
      </table>
      <button
        class="btn float-right"
        @click="loadMore"
        style="color: cornflowerblue; font-size: 14px"
      ></button>
    </div>
  </div>
</template>

<script>
import ApiService from "../../service/apiservice.js";
import Vue from "vue";
import "vue-toast-notification/dist/theme-sugar.css";
import VueToast from "vue-toast-notification";
Vue.use(VueToast);

export default {
  data() {
    return {
      task_list: [],
    };
  },

  methods: {
    // <!------------------------------------------get user-------------------------------------------------->
    async getTask() {
      try {
        const response = await ApiService("/task/getTaskListDashboard", "GET");

        this.task_list = response.tasks;
      } catch (error) {
        console.log(error, "error................");
      }
    },
  },

  beforeMount() {
    this.getTask();
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
