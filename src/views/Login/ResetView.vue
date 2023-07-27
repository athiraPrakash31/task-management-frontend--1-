<template>
  <v-card elevation="4" max-width="500" class="reset">
    <div class="row">
      <div class="col-sm-12">
        <div class="title">
          <v-card class="overflow-visible" color="#FFFFFF">
            <v-toolbar flat color="#4FA5D6" class="justify-center" width="420">
              <v-toolbar-title class="login" style="color: white">
                Reset Password
              </v-toolbar-title>
            </v-toolbar>
          </v-card>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <br />

        <v-form v-model="isValid" autocomplete="off">
          <v-container>
            <v-text-field
              v-model="data.newPassword"
              label="Password"
              name="password"
              prepend-inner-icon="mdi-lock"
              :rules="passwordRules"
              outlined
              :append-icon="passwordShow1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="passwordShow1 = !passwordShow1"
              :type="passwordShow1 ? 'text' : 'password'"
            />

            <v-text-field
              v-model="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              prepend-inner-icon="mdi-lock"
              :rules="confirmPasswordRules"
              outlined
              :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="passwordShow = !passwordShow"
              :type="passwordShow ? 'text' : 'password'"
            />
          </v-container>

          <template>
            <v-card-actions class="justify-center">
              <v-btn
                color="#4FA5D6"
                style="color: white"
                :disabled="!isValid"
                @click="reset"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </template>
        </v-form>
      </div>
    </div>
  </v-card>
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
      isValid: false,
      data: {
        newPassword: "",
      },
      confirmPassword: "",
      passwordRules: [
       
          (v) => !!v || "Password is required",

        (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-_])[A-Za-z\d#?!@$%^&*-_]{8,25}$/.test(
            v
          ) || "Password must be of length 8 to 25 and  contain at least one uppercase, one lowercase, one number and special characters(#?!@$%^&*-_))",
    
      ],
      confirmPasswordRules: [
        (value) => !!value || "type confirm password",
        (value) =>
          value === this.data.newPassword || "The password confirmation does not match.",
      ],

      passwordShow: false,
      passwordShow1: false,
    };
  },

  methods: {
    async reset() {
      try {
        let token = this.$route.params.url;

        const response = await ApiService(
          "login/forgotPassword/setNewPassword/" + token,
          "PUT",
          this.data
        );

        if (response.status == 27) {
          Vue.$toast.error("" + response.errorMessage, {
            position: "top",
          });
        } else if (response.status == 31) {
          Vue.$toast.warning("" + response.errorMessage, {
            position: "top",
          });
        } else if (response.status == 32) {
          Vue.$toast.warning("" + response.errorMessage, {
            position: "top",
          });
        } else if (response.status == 33) {
          Vue.$toast.warning("" + response.errorMessage, {
            position: "top",
          });
        } else if (response.status == 25) {
          Vue.$toast.warning("" + response.errorMessage, {
            position: "top",
          });
        } else if (response.status == 23) {
          Vue.$toast.warning("" + response.errorMessage, {
            position: "top",
          });
        } else if (response.status == 91 || response.status == 51) {
          Vue.$toast.warning("Invalid Url", {
            position: "top",
          });
        } else {
          Vue.$toast.success("Successfully reset password", {
            position: "top",
          });
          this.$router.push("/");
        }
      } catch (error) {
        Vue.$toast.error("Network Error", {
          position: "top",
        });
      }
    },
  },
  mounted() {
     localStorage.clear();
  },
  computed: {
    passwordConfirmationRule() {
      return () => this.newPassword === this.confirmPassword || "Password must match";
    },
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap);

body {
  background: #f5f5f5;
}

@media only screen and (max-width: 767px) {
  .hide-on-mobile {
    display: none;
  }
}

.login-box {
  background-size: cover;
  background-position: center;
  padding: 50px;
  margin: 50px auto;
  width: 50%;
  min-height: auto;
  -webkit-box-shadow: 0 2px 60px -5px rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 60px -5px rgba(0, 0, 0, 0.1);
}

.logo {
  font-family: "Source Sans Pro", "Arial", sans-serif;
  font-size: 25px;
  align-items: center;
  color: white;
}
.login {
  margin-left: 30%;
}

.logo .logo-font {
  color: white;
}
.title {
  max-width: 100%;
  display: flex;
  justify-content: center;
}

@media only screen and (max-width: 767px) {
  .logo {
    font-size: 34px;
  }
}

.header-title {
  text-align: center;
  margin-bottom: 50px;
}
.reset {
  margin-left: 30%;
}
.login-form {
  max-width: 300px;
  margin: 0 auto;
}

.login-form .form-control {
  border-radius: 0;
  margin-bottom: 30px;
}

.login-form .form-group {
  position: relative;
}

.login-form .form-group .forgot-password {
  position: absolute;
  top: 6px;
  right: 15px;
}

.login-form .btn {
  border-radius: 0;
  -webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.login-form .btn.btn-primary {
  background: #3bc3ff;
  border-color: #31c0ff;
}
.reset {
  margin-top: 8%;
  margin-left: auto;
  margin-right: auto;
}
</style>
