<template>
  <div class="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
    <!-- top nav -->
    <topNavigation />

    <div class="app-main">
      <!-- side nav -->

      <div class="app-main__outer">
        <div class="app-main__inner">
          <div class="container rounded bg-white mt-12 mb-2" id="BoxCenter" type="file">
            <div class="row">
              <div class="col-md-3 border-right" id="leftSide">
                <div
                  class="d-flex flex-column align-items-center text-center p-3 py-5"
                >
                  <div
                    class="image-input"
                    :style="{ 'background-image': `url(${profile_photo})` }"
                    @click="chooseImage"
                  >
                    <span v-if="!profile_photo" class="placeholder">
                      <v-icon>mdi-camera</v-icon>
                    </span>
                    <input
                    
                      value="files"
                      class="file-input"
                      ref="fileInput"
                      type="file"
                      alt="avatar"
                      @change="onSelectFile"
                    />
                    <br />
                    <br />
                  </div>
                  <div v-if="profile_photo == 0">
                    <v-btn class="btn" @click="updatePic()" disabled>save</v-btn>
                  </div>
                  <div v-if="profile_photo != 0">
                    <v-btn class="btn" @click="updatePic()">save</v-btn>
                  </div>
                   <img
                   hidden
                    width="150"
                    height="150"
                    class="rounded-circle"
                    v-bind:src="profile_photo"
                    alt=""
                    title="Profile"
                  />
                  <!-- <input type="file" @click="updatePic()" />  -->

                  <!-- <v-icon >mdi-camera</v-icon> -->

                  <br />

                                   
                  <!-- <v-file-input
                    v-model="file"
                    :rules="filesRules"
                    :error-messages="filesError"
                    placeholder="Select your files"
                    outlined
                    accept="image/jpg,image/jpeg,image/png"
                    v-on:change="handleFileUploads($event)"
                  >
                  </v-file-input>
                  <div v-if="files == 0">
                    <v-btn class="btn" @click="updatePic()" disabled>save</v-btn>
                  </div>
                  <div v-if="files != 0">
                    <v-btn class="btn" @click="updatePic()">save</v-btn>
                  </div> -->

                  <!-------------------- image upload -->

                  <span class="font-weight-bold">{{ data.user_name }}</span
                  ><span class="text-black-50">{{ data.email }}</span
                  ><span> </span>
                </div>
              </div>
              <div class="col-md-9 border-right">
                <div class="p-3 py-5">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Profile Settings</h4>
                    <div class="p-3 py-5">
                      <div
                        class="d-flex justify-content-between align-items-center experience"
                      >
                        <v-row justify="center">
                          <v-dialog v-model="dialog" persistent max-width="800">
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon color="grey" dark v-bind="attrs" v-on="on">
                                fa fa-pen
                              </v-icon></template
                            >
                            <v-card>
                              <v-card-title> </v-card-title>
                              <!--modal profile edit  -->
                              <v-card-text>
                                <v-container>
                                  <v-form
                                    ref="form"
                                    v-model="isValid"
                                    lazy-validation
                                    @submit="form()"
                                  >
                                    <v-row>
                                      <v-col cols="12" sm="12" md="12">
                                        <label class="labels">First Name</label>
                                        <v-text-field
                                          outlined
                                          type="text"
                                          :rules="nameRules"
                                          :error-messages="nameError"
                                          placeholder="first name"
                                          v-model="tempData.first_name"
                                          name="name"
                                        ></v-text-field>
                                        <label class="labels">Last Name</label
                                        ><v-text-field
                                          type="text"
                                          outlined
                                          value=""
                                          :rules="LastnameRules"
                                          placeholder="last name"
                                          v-model="tempData.last_name"
                                        ></v-text-field>

                                        <label class="labels">Phone_no</label
                                        ><v-text-field
                                          outlined
                                          :spinners="true"
                                          type="Text"
                                          id="your-input-field"
                                          value=""
                                          :rules="numberRules"
                                          placeholder="phone number"
                                          v-model="tempData.phone_no"
                                        ></v-text-field>

                                        <v-card-actions>
                                          <v-spacer></v-spacer>

                                          <button
                                            class="btn btn-primary profile-button"
                                            type="button"
                                            @click="close()"
                                          >
                                            close
                                          </button>
                                          &nbsp;

                                          <button
                                            class="btn btn-primary profile-button"
                                            type="button"
                                            :disabled="!isValid"
                                            @click="add()"
                                          >
                                            Update
                                          </button>
                                        </v-card-actions>
                                      </v-col>
                                    </v-row>
                                  </v-form>
                                </v-container>
                              </v-card-text>
                            </v-card>
                          </v-dialog>
                        </v-row>
                      </div>
                      <br />
                    </div>
                  </div>

                  <!-------------------------------------------------- profile page----------------------------------------------------------------->

                  <div class="row mt-3">
                    <div class="col-md-6">
                      <label class="labels">First Name</label
                      ><input
                        disabled="disabled"
                        type="text"
                        class="form-control"
                        placeholder="first name"
                        value=""
                        v-model="data.first_name"
                      />
                    </div>
                    <div class="col-md-6">
                      <label class="labels">Last Name</label
                      ><input
                        disabled="disabled"
                        type="text"
                        class="form-control"
                        value=""
                        placeholder="last name"
                        v-model="data.last_name"
                      />
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-md-6">
                      <label class="labels">User Name</label
                      ><input
                        disabled="disabled"
                        type="text"
                        class="form-control"
                        placeholder="user name"
                        value=""
                        v-model="data.user_name"
                      />
                    </div>
                    <div class="col-md-6">
                      <label class="labels">Phone_no</label
                      ><input
                        disabled="disabled"
                        type="text"
                        class="form-control"
                        value=""
                        placeholder="phone number"
                        v-model="data.phone_no"
                      />
                    </div>
                    <div class="col-md-12">
                      <label class="labels">Email</label
                      ><input
                        disabled="disabled"
                        type="text"
                        class="form-control"
                        placeholder="email"
                        value=""
                        v-model="data.email"
                      />
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
import topNavigation from "./adminTopNav.vue";
import ApiService from "../../service/apiservice";
// import http from "../../http-common";
import http from "../../http-post.js";

import Vue from "vue";
import "vue-toast-notification/dist/theme-sugar.css";

export default {
  components: { topNavigation },
  data() {
    return {
      isValid: true,
      valid: false,
      flag: "",
      dialog: false,
      name: "",
      file: "",
      files: "",
      profile_photo: "",
      profile: {
        profileData: [],
      },
      tempData: {
        first_name: "",
        last_name: "",
        phone_no: "",
      },
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => !/^\s/.test(v) || "Invalid name",
        (v) => /^[A-Za-z0-9 _]+$/.test(v) || "Special charcters not allowed",
        (v) =>
          /^[a-zA-Z]{3,30}$/.test(v) ||
          "Name should only contain alphabets and should between 3 to 30",
      ],
      LastnameRules: [
        (v) => !!v || "Name is required",
        (v) => !/^\s/.test(v) || "Invalid name",
        (v) => !/^[0-9 _]+$/.test(v) || "Special charcters not allowed",
        (v) =>
          /^[a-zA-Z ]{1,30}$/.test(v) ||
          "Name should only contain alphabets should between 1 to 30",
      ],
      numberRules: [
        (v) => !!v || "Number is required",
        (v) => !/^\s/.test(v) || "Only digits are allowed",
        (v) => !/^[A-Za-z _]+$/.test(v) || "Special charcters not allowed",
        (v) => /^[0-9]{10,12}$/.test(v) || "Phone number must be valid",
      ],
      data: {
        user_name: "",
        first_name: "",
        last_name: "",
        phone_no: "",
        email: "",
        image: "",
      },
    };
  },
  methods: {
    chooseImage() {
      this.$refs.fileInput.click();
    },
    onSelectFile(e) {
      this.file = e;
      const input = this.$refs.fileInput;
      const files = input.files;
      this.files = files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profile_photo = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    },
    async getUser() {
      const response = await ApiService("users/getProfile", "GET");
      this.data = response;
      this.tempData = {
        first_name: this.data.first_name,
        last_name: this.data.last_name,
        phone_no: this.data.phone_no,
      };

      this.profile_photo = response.profile_photo;
    },
    close() {
      this.dialog = false;
      this.getUser();
    },
    async add() {
      try {
        const response = await ApiService("users/updateProfile", "PUT", this.tempData);

        this.dialog = false;

        Vue.$toast.success("Profile updated successfully", {
          position: "top",
          successDuration: 800,
          duration: 500,
        });

        if (response.statusCode == 400) {
          Vue.$toast.warning("name is not allowed to be empty", {
            position: "top",
          });
        } else if (response.statusCode == 114) {
          Vue.$toast.warning("phone_no is not allowed to be empty  only use numbers", {
            position: "top",
          });
        } else if (response.statusCode == 53) {
          Vue.$toast.error("Access denied", {
            position: "top",
          });
        } else if (response.statusCode == 31) {
          Vue.$toast.error("User not found", {
            position: "top",
          });
        }
      } catch (error) {
        Vue.$toast.error("Empty fields are not allowed", {
          position: "top",
        });
      }
      this.$router.go("/profile");

      this.getUser();
    },

    async updatePic() {
      try {
        const formData = new FormData();
        const URL = "/users/upload";
        formData.append("file", this.files[0]);
        await http.post(URL, formData, "POST").then((response) => {
          this.$router.go("/profile");
          this.data = response.data.error;
        });
        Vue.$toast.success("Upload successfully", {
          position: "top",
        });
      } catch (error) {
        Vue.$toast.error(error.response.data.errorMessage, {
          position: "top",
          errorDuration: 7000,
        });
      }
      this.getUser();
    },
  },

  beforeMount() {
    this.getUser();
  },
};
</script>

<style scoped>
body {
  background: rgb(99, 39, 120);
}

.form-control:focus {
  box-shadow: none;
  border-color: #ba68c8;
}

.profile-button {
  background: rgb(99, 39, 120);
  box-shadow: none;
  border: none;
}
#your-input-field {
  appearance: none;
}

.profile-button:hover {
  background: #682773;
}

.profile-button:focus {
  background: #682773;
  box-shadow: none;
}

.profile-button:active {
  background: #682773;
  box-shadow: none;
}

.back:hover {
  color: #682773;
  cursor: pointer;
}

.labels {
  font-size: 100%;
}

.add-experience:hover {
  background: #417af7;
  color: #fff;
  cursor: pointer;
  border: solid 1px #2976fb;
}
/* .row {
  background-color: #add8e6;
} */
#leftSide {
  width: 50% !important;
}
#BoxCenter {
  margin-right: 25%;
}
.image-input {
  width: 150px;
  height: 150px;
  cursor: pointer;
  background-size: cover;
  background-position: center;
}

.placeholder {
  border-radius: 50%;

  background: #f2f2f2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family: Helvetica;
  box-shadow: 2%;
}
.placeholder:hover {
  background: #e0e0e0;
}
.file-input {
  display: none;
}
em {
  margin-left: 70%;
}
</style>
