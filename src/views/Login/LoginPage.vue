<template>
  <div class="row">
    <div class="col-6 imagee" style="margin-top: 6%">
      <div class="row">
        <v-img
          class="imgclass"
          max-height="80%"
          max-width="70%"
          style="margin-left: 30%"
          src="../../assets/Images/login.jpg"
        ></v-img>
      </div>
    </div>
    <div class="col-6 forms" style="margin-top: 15%">
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
          <div class="row justify-content-center">
            <h3 class="align-center" style="margin-bottom: 10%">LOGIN</h3>
          </div>
          <v-form
            v-model="isValid"
           
            @submit.prevent="login"
            method="post"
            autocomplete="off"
          >
            <v-container>
              <v-text-field
                placeholder="Email"
                max-width="600"
                class="textField"
                v-on:keyup="ButoonCheck()"
                v-model="datas.email"
                :rules="emailRules"
                maxlength = "255"
                outlined
                prepend-inner-icon="mdi-account"
                clearable
                name="email"
              ></v-text-field>

              <v-text-field
                placeholder="Password"
                v-model="datas.password"
                :rules="passwordRules"
                outlined
                maxlength="25"
                v-on:keyup="ButoonCheck()"
                prepend-inner-icon="mdi-lock"
                :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="passwordShow = !passwordShow"
                :type="passwordShow ? 'text' : 'password'"
                name="password"
              ></v-text-field>
              <p class="forgot">
                <a href="/emailVerification"> Forgot Password?</a>
              </p>
            </v-container>

            <template>
              <div v-if="buttonValue==true">
                <v-card-actions class="justify-center">
                <button type="submit" class="button-18" :disabled="!isValid">
                  LOGIN
                </button>
              </v-card-actions>
              </div>
              <div v-if="buttonValue==false">
                <v-card-actions class="justify-center">
                <button type="submit" class="button-18" :disabled="isValid">
                  LOGIN
                </button>
              </v-card-actions>
              </div>
             
            </template>
          </v-form>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import "vue-toast-notification/dist/theme-sugar.css";
import VueToast from "vue-toast-notification";
import http from "../../http-common";
Vue.use(VueToast);
export default {
  data: () => ({
    isValid: true,
    buttonValue:true,
    datas: {
      email: "",
      password: "",
    },
    passwordShow: false,
    emailRules: [
      (v) => !!v || "Email is required",
     
      (v) =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "Email must be valid",
        (v) => (v.length <255)|| "Maximum 255 characters ",
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => v.length >= 8 || "Minimum 8 characters ",
     
    ],
  }),

  methods: {
    login() {
      http.post("/login", this.datas).then((response) => {
        this.data = response.data.error;
        console.log(this.data);
        localStorage.setItem("role", JSON.stringify(response.data.role));
        if (response.data.statusCode == 31) {
          this.buttonValue=false;
          Vue.$toast.error("Inavlid Email or Password", {
            position: "top",
          });
        } else if (response.data.statusCode == 11) {
          this.buttonValue=false;
          Vue.$toast.error("wrong password", {
            position: "top",
            canTimeout: true,
            errorDuration: 500,
            preventDuplicates:1,
            preventOpenDuplicates: 1,
            successDuration: 80,
            autoClose: 1000,
             closeOnClick: true,
            alertInfoDuration: 8000,
            duration: 500,
          });
          
        } else if (response.data.statusCode == 21) {
          this.buttonValue=false;
          Vue.$toast.error("fill all details", {
            position: "top",
          });
        } else {
          if (response.data.role == 1) {
            localStorage.setItem(
              "accessTocken",
              JSON.stringify(response.data.accessToken)
            );
            localStorage.setItem(
              "refreshToken",
              JSON.stringify(response.data.refreshToken)
            );
            localStorage.setItem("role", JSON.stringify(response.data.role));
            this.$router.push("/DashBoardViewPage");
            Vue.$toast.success("Login Success...", {
              position: "top",
            });
          } else if (response.data.role == 3 || response.data.role == 4) {
            localStorage.setItem(
              "accessTocken",
              JSON.stringify(response.data.accessToken)
            );
            localStorage.setItem(
              "refreshToken",
              JSON.stringify(response.data.refreshToken)
            );
            this.$router.push("/memeberDashboard");
            Vue.$toast.success("Login Success...", {
              position: "top",
            });
          } else if (response.data.role == 2) {
            localStorage.setItem(
              "accessTocken",
              JSON.stringify(response.data.accessToken)
            );
            localStorage.setItem(
              "refreshToken",
              JSON.stringify(response.data.refreshToken)
            );
            localStorage.setItem("role", JSON.stringify(response.data.role));
            this.$router.push("/DashBoardViewPage");
            Vue.$toast.success("Login Success...", {
              position: "top",
            });
          } else {
            console.log();
          }
        }
      });
    },
    ButoonCheck(){
      this.buttonValue=true;
    
    }
  },
  watch:{
    email: function () {
     
     this.ButoonCheck();
   },

  },
  mounted() {
    localStorage.clear();
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
  /* background: url(https://i.imgur.com/73BxBuI.png); */
  background-size: cover;
  background-position: center;
  padding: 50px;
  margin: 50px auto;
  width: 50%;
  min-height: auto;
  -webkit-box-shadow: 0 2px 60px -5px rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 60px -5px rgba(0, 0, 0, 0.1);
}
.title {
  max-width: 100%;
  display: flex;
  justify-content: center;
}
.login {
  margin-left: 40%;
}

.logo {
  font-family: "Source Sans Pro", "Arial", sans-serif;
  font-size: 36px;
  text-align: center;
  color: #000000;
}

.logo .logo-font {
  color: #3bc3ff;
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

.login-form {
  max-width: 300px;
  margin: 0 auto;
}
.sign {
  margin-top: 8%;
  margin-left: auto;
  margin-right: auto;
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

.slider-feature-card {
  background: #fff;
  max-width: 280px;
  margin: 0 auto;
  padding: 30px;
  text-align: center;
  -webkit-box-shadow: 0 2px 25px -3px rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 25px -3px rgba(0, 0, 0, 0.1);
}

.slider-feature-card img {
  height: 80px;
  margin-top: 30px;
  margin-bottom: 30px;
}

.slider-feature-card h3,
.slider-feature-card p {
  margin-bottom: 30px;
}

.carousel-indicators {
  bottom: -50px;
}

.carousel-indicators li {
  cursor: pointer;
}
.forgot {
  /* float: right; */
  color: #888888;
  margin-left: 70%;
}
.loginBox {
  margin: 10%;
}
h3 {
  font-size: 50px;
  font-weight: 600;

  background-image: repeating-radial-gradient(
    circle closest-corner at 100px 100px,
    #553c9a,
    #0a99ff 0%,
    #5419f6 30%
  );
  color: transparent;
  background-clip: text;

  -webkit-background-clip: text;
}

/* CSS */
.button-18 {
  align-items: center;
  background-color: #0a66c2;
  border: 0;
  border-radius: 100px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-flex;
  font-family: -apple-system, system-ui, system-ui, "Segoe UI", Roboto, "Helvetica Neue",
    "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans",
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica,
    Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 20px;
  max-width: 480px;
  min-height: 40px;
  min-width: 0px;
  overflow: hidden;
  padding: 0px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
  touch-action: manipulation;
  transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s,
    box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s,
    color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
}

.button-18:hover,
.button-18:focus {
  background-color: #16437e;
  color: #ffffff;
}

.button-18:active {
  background: #09223b;
  color: rgb(255, 255, 255, 0.7);
}

.button-18:disabled {
  cursor: not-allowed;
  background: rgba(0, 0, 0, 0.08);
  color: rgba(0, 0, 0, 0.3);
}
@media only screen and (max-width: 768px) {
  .imgclass {
    display: none;
  }
  .imagee {
    margin-left: 20%;
  }

  .forms {
    margin-top: 3004px;
  }
  .container {
    width: 300px;
  }
  h3 {
    font-size: 40px;
    margin-left: 100%;
  }
  .button-18 {
    width: 200%;
    margin-left: 30%;
  }
}
</style>
