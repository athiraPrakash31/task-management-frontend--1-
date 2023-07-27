<!-- SIDE NAVIGATION BAR -->
<template>
  <div class="app-sidebar sidebar-shadow" style="background-color: #4fa5d6">
    <div class="app-header__logo">
      <div class="logo-src"></div>
      <div class="header__pane ml-auto">
        <div>
          <button
            type="button"
            class="hamburger close-sidebar-btn hamburger--elastic"
            data-class="closed-sidebar"
          >
            <span class="hamburger-box">
              <span class="hamburger-inner"></span>
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="app-header__mobile-menu">
      <div>
        <button
          type="button"
          class="hamburger hamburger--elastic mobile-toggle-nav"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </div>
    <div class="app-header__menu">
      <div class="header__pane ml-auto"></div>
      <span>
        <button
          type="button"
          class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
        ></button>
      </span>
    </div>

    <div class="app-sidebar__inner sideNav">
      <ul class="vertical-nav-menu" style="justify-content: center">
        <br />
        <li class="list">
          <router-link exact :to="'/HomePage/' + this.$route.params.id">
            <a class="mm">
              <v-icon class="list mr-3" style="font-size: 22px"
                >mdi-home</v-icon
              >
              Home
            </a>
          </router-link>
        </li>
        <div v-if="this.projectRole!=5">
        <br />
        <li >
          <router-link exact :to="'/addTask/' + this.$route.params.id">
            <a style="font-size: 22px" class="mm">
              <v-icon class="mr-3">mdi-checkbox-marked-circle-plus-outline</v-icon>
              Add Task
            </a>
          </router-link>
        </li>
      </div>
        <br />
        <li>
          <router-link :to="'/TaskView/' + this.$route.params.id" exact>
            <a style="font-size: 22px" href="index.html">
              <v-icon class="mr-3">mdi-clipboard-text</v-icon>
              Task
            </a>
          </router-link>
        </li>
        <br />
        <li>
          <router-link :to="'/file/' + this.$route.params.id">
            <a
              style="font-size: 22px"
              routerLinkActive="activebutton"
              href="index.html"
            >
              <v-icon class="mr-3">mdi-file-document-multiple</v-icon>
              Files
            </a>
          </router-link>
        </li>
        <br />
        <li>
          <router-link :to="'/members/' + this.$route.params.id">
            <a style="font-size: 22px" class="mm">
              <v-icon class="mr-3">mdi-cog-outline</v-icon>
              Project Settings
            </a>
          </router-link>
        </li>
        <br />
      </ul>
      <v-spacer />
    </div>
  </div>
</template>


<script>
import ApiService from "../../service/apiservice";

export default {
  data() {
    return {
  projectRole:"",
  props: {
    id: Number,
  },
}
  },

  mounted() {
    
    
    this.GetProjectRole();
    this.projectRole=localStorage.getItem("projectRole");

  },
  methods: {

    async GetProjectRole(){
      const response =  await ApiService("/project/projectRole/"+this.$route.params.id, "GET");
        this.ProjectRoleList = response;
        localStorage.setItem(
              "projectRole",
              JSON.stringify(response.project_role)
            );
            console.log("proje",response.project_role)
    },
  },
};
</script>


<!-- STYLE -->
<style>
.router-link-exact-active {
  background-color: rgb(255, 255, 255);
  /* color: black; */
  color: red;
}
.router-link-exact-active a {
  color: black;
}
.cardMsg {
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
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
.sideNav {
  margin-top: 22%;
  font-size: 20px;
  font-weight: bold;
  margin-left: -38%;
}
.list:hover {
  color: black;
}
</style>