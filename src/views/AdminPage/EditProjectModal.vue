<template>
  <v-dialog v-model="dialogCompose" width="700">
    <template v-slot:activator="{ on, attrs }">
      <a class="btn float-right" v-on:click="ProjectEditing(ProjectDate.project_id)" title="Project Edit">
        <v-icon v-bind="attrs" v-on="on" style="color: blue" @click="refreshEdit()"
          >mdi-pencil</v-icon
        >
      </a>
    </template>

    <v-card class="overflow-visible" color="#FFFFFF">
      <v-toolbar flat color="#4FA5D6">
        <v-toolbar-title style="color: white">Edit Project </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="dialogCompose = false" dark>
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </v-toolbar>
      <br />
      <v-form
        ref="form"
        v-model="isSubmit"
        @submit.prevent="update()"
        method="post"
        autocomplete="off"
      >
        <v-card-text>
          <v-row>
            <v-col lg="" md="2" sm="">
              <label class="label" for="name">Project Name<span id="imp">*</span> </label>
            </v-col>
            <v-col class="text" sm="2" md="8">
              <v-text-field
                outlined
                clearable
                placeholder="Project"
                color="black"
                :rules="nameRules"
                :error-messages="nameError"
                v-model="projectData.project_name"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col lg="" md="2" sm="">
              <label class="label" for="name">Start Date<span id="imp">*</span> </label>
            </v-col>
            <v-col class="text" sm="2" md="8">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :v-bind="projectData.start_date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="projectData.start_date"
                    :rules="startdateRules"
                    :error="startdateError"
                    outlined
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>

                <v-date-picker
                  v-model="projectData.start_date"
                  no-title
                  scrollable
                  @input="menu = false"
                  :min="new Date().toISOString().substr(0, 10)"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)"> OK </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col lg="" md="2" sm="">
              <label class="label" for="name">End Date<span id="imp">*</span> </label>
            </v-col>
            <v-col class="text" sm="2" md="8">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                :v-bind="projectData.end_date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="projectData.end_date"
                    :rules="enddateRules"
                    :error="enddateError"
                    outlined
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="projectData.end_date"
                  no-title
                  scrollable
                  @input="menu1 = false"
                  :min="new Date().toISOString().substr(0, 10)"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu1 = false"> Cancel </v-btn>
                  <v-btn text color="primary" @click="$refs.menu1.save(date)"> OK </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col lg="" md="2" sm="">
              <label class="label" for="name">Description<span id="imp">*</span> </label>
            </v-col>
            <v-col class="text" sm="2" md="8">
              <v-textarea
                color="black"
                outlined
                clearable
                :rules="descriptionRules"
                :error-messages="descriptionError"
                v-model="projectData.project_description"
                required
              ></v-textarea>
            </v-col>
          </v-row>
          <v-card-actions class="justify-center">
            <v-btn
              color="#4FA5D6"
              style="color: white"
              :disabled="this.addForm"
              type="submit"
            >
              save
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import ApiService from "../../service/apiservice";
import Vue from "vue";
import "vue-toast-notification/dist/theme-sugar.css";
export default {
  datas: () => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
  }),
  data() {
    return {
      addForm: false,
      isSubmit: true,
      menu: false,
      menu1: false,
      isValid: false,
      valid: true,
      hasSaved: false,
      model: null,
      dialogCompose: false,

      projectData: {
        project_name: "",
        start_date: "",
        end_date: "",
        project_description: "",
      },
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => !/^\s/.test(v) || "Invalid name",
        (v) => /^[A-Za-z0-9 _]+$/.test(v) || "Special charcters not allowed",
        (v) => /^[A-Za-z0-9 _]{3,30}$/.test(v) || "Name should between 3 to 30",
      ],
      codeRules: [
        (v) => !!v || "Code is required",
        (v) => !/^\s/.test(v) || "Invalid code",
        (v) =>
          /^(?=.)(?:[a-zA-Z\d]+(?:(?:\.||_)[a-zA-Z\d])*){3,15}$/.test(v) ||
          "Code should between 3 to 15",
      ],
      startdateRules: [(v) => !!v || "Date is required"],
      enddateRules: [(v) => !!v || "Date is required"],
      descriptionRules: [
        (v) => !!v || "Description is required",
        (v) => !/^\s/.test(v) || "Invalid description",
        (v) => /^(.|\s)*[a-z A-Z]+(.|\s)*$/.test(v),
        (v) => (v && v.length > 10) || "Description must greater than 10",
        (v) => (v && v.length <= 255) || "Description must be only upto 255 characters",
      ],
    };
  },

  methods: {
    async getUser() {
      const id = this.$route.params.id;
      const response = await ApiService("project/overallProjectStatus/" + id, "GET");
      this.projectData = response;
    },

    async update() {
      this.addForm = true;

      const id = this.$route.params.id;
      this.inputs = {
        project_name: this.projectData.project_name,
        start_date: this.projectData.start_date,
        end_date: this.projectData.end_date,
        project_description: this.projectData.project_description,
      };
      const response = await ApiService("/project/" + id, "PUT", this.inputs);
      if (response.statusCode == 200) {
        Vue.$toast.success("Project updated successfully", {
          position: "top",
        });
      } else if (response.statusCode == 401) {
        Vue.$toast.warning("" + response.errorMessage, {
          position: "top",
        });
      }
      window.location.reload();
    },

    profile() {
      this.profileCompose = true;
    },

    compose() {
      this.dialogCompose = false;
    },
    saveDraft() {
      this.dialogCompose = false;
    },
    save() {
      this.isEditing = !this.isEditing;
      this.hasSaved = true;
    },

    async ProjectStatus() {
      try {
        const id = this.$route.params.id;

        const response = await ApiService("/project/overallProjectStatus/" + id, "GET");
        if (response.statusCode == 52) {
          this.$router.push("/DashBoardViewPage");
        }
        this.projectStatus = response;

        this.inProgress =
          (this.projectStatus.inProgress * 100) / this.projectStatus.total_task;
        this.closed = Math.floor(
          this.projectStatus.total_task
            ? (this.projectStatus.closed * 100) / this.projectStatus.total_task
            : 0
        );
        this.openTask =
          (this.projectStatus.openTask * 100) / this.projectStatus.total_task;
        this.resolved =
          (this.projectStatus.resolved * 100) / this.projectStatus.total_task;
        this.projectRole = localStorage.getItem("projectRole");
      } catch (error) {
        Vue.$toast.warning("Failed to load data", {
          position: "top",
        });
      }
    },
    refreshEdit() {
      this.ProjectStatus();
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>
<style>
#imp {
  color: red;
}
</style>
