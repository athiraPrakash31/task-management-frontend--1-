<template>
  <div class="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
    <!-- top nav -->
    <memeberTopnav />

    <div class="app-main">
      <!-- side nav -->

      <div class="app-main__outer">
        <div class="app-main__inner">
          <div class="container rounded bg-white mt-12 mb-2">
            <div class="row">
              <div class="col-md-3 border-right">
                <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                  <img
                    class="rounded-circle mt-5"
                    width="150px"
                    alt=""
                    src="https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg"
                  />

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
                              <v-icon color="black" dark v-bind="attrs" v-on="on">
                                fa fa-pen
                              </v-icon></template
                            >

                            <v-card>
                              <v-card-title> </v-card-title>
                              <!--modal profile edit  -->
                              <v-card-text>
                                <v-container>
                                  <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                      <label class="labels">First Name</label
                                      ><input
                                        type="text"
                                        class="form-control"
                                        placeholder="first name"
                                        value=""
                                        v-model="tempData.first_name"
                                      />

                                      <label class="labels">Last Name</label
                                      ><input
                                        type="text"
                                        class="form-control"
                                        value=""
                                        placeholder="last name"
                                        v-model="tempData.last_name"
                                      />

                                      <label class="labels">Phone_no</label
                                      ><input
                                        type="text"
                                        class="form-control"
                                        value=""
                                        placeholder="phone number"
                                        v-model="tempData.phone_no"
                                      />
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>

                                <button
                                  class="btn btn-primary profile-button"
                                  type="button"
                                  @click="dialog = false"
                                >
                                  close
                                </button>
                                &nbsp;

                                <button
                                  class="btn btn-primary profile-button"
                                  type="button"
                                  @click="add"
                                >
                                  Update
                                </button>
                              </v-card-actions>
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
                        placeholder="lastname"
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
import memeberTopnav from "./MemberTopNav.vue";
  import ApiService from "../../service/apiservice";
import http from "../../http-common";
import Vue from "vue";
import "vue-toast-notification/dist/theme-sugar.css";

export default {
  components: { memeberTopnav },
  data() {
    return {
      flag: "",
      dialog: false,
      image: "",
      profile: {
        profileData: [],
      },
      data: {
        user_name: "",
        first_name: "",
        last_name: "",
        phone_no: "",
        email: "",
      },
    };
  },
  methods: {
    selectFile() {
      this.file = this.$refs.flag.files[0];
    },
    async getUser() {
      const response = await ApiService("users/getProfile", "GET");
      this.data = response;
      this.tempData = {
        first_name: this.data.first_name,
        last_name: this.data.last_name,
        phone_no: this.data.phone_no,
      };
    },
    async add() {
      const response = await ApiService("users/updateProfile", "PUT", this.tempData);
      this.dialog = false;
      console.log(response)
      this.getUser();
       Vue.$toast.success("Profile updated successfully", {
              position: "top",
            });
            
    },
    async updatePic() {
  
      let formData = new FormData();
      formData.append("image", this.image);
      http.post("/admin/profileImage", formData).then((response) => {
        this.data = response.data.error;
      });
    },
    handleFileUpload() {
      this.image = this.$refs.file.files[0];
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
.row{
  background-color:#ADD8E6;
}
</style>
