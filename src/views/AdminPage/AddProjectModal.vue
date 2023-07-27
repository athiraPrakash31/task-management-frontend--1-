<template>
  <v-dialog v-model="dialogCompose" width="700">
    <template v-slot:activator="{ on, attrs }">
      <button v-bind="attrs" v-on="on" type="button" tabindex="0" class="dropdown-item">
        Add Project
      </button>
    </template>
    <v-card class="overflow-visible" color="#FFFFFF">
      <v-toolbar flat color="#4FA5D6">
        <v-toolbar-title style="color: white">Add Project </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="dialogCompose = false" dark>
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </v-toolbar>
      <br />
      <v-form ref="form" v-model="valid" autocomplete="off">
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
                v-model="inputs.project_name"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col lg="" md="2">
              <label class="label" for="name">Project Code<span id="imp">*</span> </label>
            </v-col>
            <v-col class="text" sm="2" md="8">
              <v-text-field
                outlined
                clearable
                 v-on:keyup="checking()"
                placeholder="Project code"
                color="black"
                :rules="codeRules"
                :error-messages="codeError"
                v-model="inputs.project_code"
                required
              >
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col lg="" md="2">
              <label class="label" for="name">Start Date<span id="imp">*</span> </label>
            </v-col>
            <v-col class="text" sm="2" md="8">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="inputs.start_date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
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
                  v-model="date"
                  no-title
                  scrollable
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
            <v-col lg="" md="2">
              <label class="label" for="name">End Date<span id="imp">*</span> </label>
            </v-col>
            <v-col class="text" sm="2" md="8">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                :return-value.sync="inputs.end_date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date1"
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
                  v-model="date1"
                  no-title
                  scrollable
                  :min="inputs.start_date"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu1 = false"> Cancel </v-btn>
                  <v-btn text color="primary" @click="$refs.menu1.save(date1)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col lg="" md="2">
              <label class="label" for="name">Description<span id="imp">*</span> </label>
            </v-col>

            <v-col class="text" sm="2" md="8">
              <v-textarea
                color="black"
                outlined
                clearable
                :rules="descriptionRules"
                :error-messages="descriptionError"
                v-model="inputs.project_description"
                required
              ></v-textarea>
            </v-col>
          </v-row>
          <v-card-actions class="justify-center">
            <v-btn
              color="#4FA5D6"
              style="color: white"
              :disabled="this.addForm"
              @click="add()"
            >
              Add
            </v-btn>
          </v-card-actions>
          <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left>
            Project has been created
          </v-snackbar>
          <v-snackbar v-model="hasCanceled" :timeout="2000" absolut bottom left>
          </v-snackbar>
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
      menu: false,
      menu1: false,
      isValid: false,
      valid: true,
      hasSaved: false,
      model: null,
      dialogCompose: false,
      inputs: {
        project_name: "",
        project_code: "",
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
          /^[A-Za-z0-9_]{3,15}$/.test(v) ||
          "Project code should be between 3 and 15 character length and supports only uppercase,lowercase alphabets,numbers and underscore",
      ],
      startdateRules: [(v) => !!v || "Date is required"],
      enddateRules: [(v) => !!v || "Date is required"],
      descriptionRules: [
        (v) => !!v || "Description is required",
        (v) => !/^\s/.test(v) || "Invalid description",
        (v) =>/^[A-Za-z0-9!@#$&()`.+,"-{}=<>:;~]+([ _!@#$&()`.+,"-{}=<>:;]?[A-Z a-z0-9!@#$&()`.+,"-{}=<>:;]+)*$/.test(v),
        (v) => (v && v.length >= 10) || "Description must be  10",
        (v) => (v && v.length <= 255) || "Description must be 255 characters",
      ],
    };
  },

  methods: {
    addProject() {
      this.inputs.project_name = "";
      this.inputs.project_code = "";
      this.inputs.start_date = "";
      this.inputs.end_date = "";
      this.inputs.project_description = "";
    },
    async add() {
      if (this.$refs.form.validate()) {
        this.addForm = true;
        this.dialog = true;
        console.log(this.inputs);
        this.$refs.form.validate();
        try {
          const response = await ApiService("/project", "POST", this.inputs);
          this.dialog = false;
          if (response.statusCode == 100) {
            Vue.$toast.error("Project code already existing", {
              position: "top",
            });
          } else if (response.statusCode == 200) {
            Vue.$toast.success("Project Added ", {
              position: "top",
            });
            this.$refs.form.reset();
            this.$router.go("/DashBoardViewPage");
          }
        } catch (error) {
          console.log(error.errorMessage, "error................");
        }
      }
    },
    checking(){
      // alert()
this.addForm=false;
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
  },
};
</script>
<style>
#imp {
  color: red;
}
.text {
  margin-left: 12%;
}

.label {
  font-size: 130%;
}
</style>
