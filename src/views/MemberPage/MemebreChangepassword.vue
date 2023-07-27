<template>
  <div
    class="
      app-container app-theme-white
      body-tabs-shadow
      fixed-sidebar fixed-header
    "
  >
    <!-- top nav -->
    <memeberTopnav />

      <!-- side nav -->

  
        <div class="mainDiv">
          <div class="cardStyle" style="margin-top:10%;margin-bottom: 10%;">
            <h2 class="formTitle row justify-content-center" style="margin-bottom: 10%;" >Change Password</h2>

            <v-form
              class="form"
              ref="form"
              v-model="valid"
              @submit.prevent="confirm"
            >
              <v-row class="mt-8">
                <v-col lg="3" sm="2" md="4">
                  <label class="label" for="name"
                    >Old Password<span id="imp">*</span>
                  </label>
                </v-col>
                <v-col lg="9" sm="3" md="10">
                  <v-text-field
                    outlined
                    placeholder="Old Password"
                    v-model="user.oldpassword"
                    :type="show ? 'text' : 'password'"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show = !show"
                    :rules="oldpasswordRules"
                  ></v-text-field>
                </v-col>

                <v-col lg="3" sm="2" md="4">
                  <label class="label" for="name"
                    >New Password<span id="imp">*</span>
                  </label>
                </v-col>
                <v-col lg="9" sm="3" md="10">
                  <v-text-field
                    outlined
                    placeholder="New Password"
                    v-model="user.newpassword"
                    :type="show1 ? 'text' : 'password'"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show1 = !show1"
                    :rules="newpasswordRules"
                  ></v-text-field>
                </v-col>

                <v-col lg="3" sm="2" md="4">
                  <label class="label" for="name"
                    >Confirm Password<span id="imp">*</span>
                  </label>
                </v-col>
                <v-col lg="9" sm="3" md="10">
                  <v-text-field
                    outlined
                    placeholder="Confirm Password"
                    v-model="user.confirmpassword"
                    :type="show2 ? 'text' : 'password'"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show2 = !show2"
                    :rules="confirmpasswordRules"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-btn
                type="submit"
                id="submitButton"
                class="button"
                color="primary"
                style="margin-left: 40%;"
                :disabled="!valid"
              >
                <span>Continue</span>
              </v-btn>
            </v-form>
          </div>
        </div>
      </div>
</template>
  
  
  <script>
  import memeberTopnav from "./MemberTopNav.vue";
  import ApiService from "../../service/apiservice.js";
  import Vue from "vue";
  import "vue-toast-notification/dist/theme-sugar.css";
  import VueToast from "vue-toast-notification";
  Vue.use(VueToast);
  
  export default {
    components: {  memeberTopnav },
  
    data() {
      return {
        valid: true,
        user: {
          oldpassword: "",
          newpassword: "",
          confirmPassword: "",
        },
  
        show: false,
        show1: false,
        show2: false,
        submitted: false,
  
        oldpasswordRules: [
          (v) => !!v || "Password is required",
          (v) =>
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(
              v
            ) ||
            "Password must contain at least lowercase letter, one number, a special character and one uppercase letter",
        ],
        newpasswordRules: [
          (v) => !!v || "New password is required",
          (v) =>
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(
              v
            ) ||
            "Password must contain at least lowercase letter, one number, a special character and one uppercase letter",
        ],
        confirmpasswordRules: [
          (v) => !!v || "Confirm password is required",
          // (v) =>
          // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(v) ||
          //   "Password must contain at least lowercase letter, one number, a special character and one uppercase letter",
          (v) => v === this.user.newpassword || "Password does not match",
        ],
      };
    },
    methods: {
      async confirm() {
        if (this.$refs.form.validate()) {
          try {
            const data = {
              old_password: this.user.oldpassword,
              new_password: this.user.newpassword,
            };
            const response = await ApiService(
              "member/changepassword",
              "PUT",
              data
            );
  
            if (response.status == 11) {
              Vue.$toast.warning("Invalid Access", {
                position: "top",
              });
            } else {
              Vue.$toast.success("password updated Successfully ", {
                position: "top",
              });
              this.$router.push("/");
            }
          } catch (error) {
            const errorMessage = error.response.data.errorMessage;
            if (errorMessage) {
              Vue.$toast.error(errorMessage, {
                position: "top",
              });
            } else {
              Vue.$toast.error("Internel Server Error !", {
                position: "top",
              });
            }
          }
  
        }
      },
    },
  };
  </script>
 
 <style scoped>
 .mainDiv {
   display: flex;
   min-height: 100%;
   align-items: center;
   justify-content: center;
   background-color: #f9f9f9;
   font-family: "Open Sans", sans-serif;
 }
 .cardStyle {
   width: 700px;
   /* border-color: white;
   background: #fff; */
   padding: 36px 0;
   /* border-radius: 4px; */
   margin: 30px 0;
   /* box-shadow: 0px 0 2px 0 rgba(0, 0, 0, 0.25); */
 }
 
 .buttonWrapper {
   margin-top: 40px;
 }
 .button {
   width: 30%;
   height: 40px;
   margin-left: 26%;
   display: block;
   color: #fff;
   background-color: #065492;
   border-color: #065492;
   text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
   box-shadow: 0 2px 0 rgba(0, 0, 0, 0.035);
   border-radius: 4px;
   font-size: 14px;
   cursor: pointer;
 }
 .submitButton:disabled,
 button[disabled] {
   border: 1px solid #cccccc;
   background-color: #cccccc;
   color: #666666;
 }
 
 .fram {
   margin-top: 20px;
 }
 
 @keyframes spin {
   0% {
     transform: rotate(0deg);
   }
   100% {
     transform: rotate(360deg);
   }
 }
 
 </style>