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
          class="
            btn-icon btn-icon-only btn btn-primary btn-sm
            mobile-toggle-header-nav
          "
        ></button>
      </span>
    </div>

    <div class="app-sidebar__inner sideNav">
      <ul class="vertical-nav-menu" style="justify-content: center">
        <br />
        <li class="list">
          <router-link :to="'/memeberhome/' + this.$route.params.id">
            <a class="mm">
              <v-icon class="list mr-3" style="font-size: 22px"
                >mdi-home</v-icon
              >
              Home
            </a>
          </router-link>
        </li>
        <br />
        <template v-if="role==4">
          <li>
            <router-link :to="'/memberaddTask/' + this.$route.params.id">
              <a style="" class="mm">
                <v-icon class="mr-3" style="font-size: 22px"
                  >mdi-checkbox-marked-circle-plus-outline</v-icon
                >
                Add Task
              </a>
            </router-link>
          </li>
          <br />
        </template>

        <li>
          <router-link :to="'/MemberTaskView/' + this.$route.params.id">
            <a style="" href="index.html" class="mm">
              <v-icon class="mr-3" style="font-size: 22px"
                >mdi-clipboard-text</v-icon
              >
              Task
            </a>
          </router-link>
        </li>
        <br />
        <li>
          <router-link :to="'/memberFileView/' + this.$route.params.id">
            <a
              style="font-size: 22px"
              routerLinkActive="activebutton"
              href="index.html"
              class="mm"
            >
              <v-icon class="mr-3">mdi-file-document-multiple</v-icon>
              Files
            </a>
          </router-link>
        </li>
        <br />
        <li>
          <router-link :to="'/memberList/' + this.$route.params.id">
            <a href="index.html" class="mm">
              <v-icon class="mr-3" style="font-size: 22px"
                >mdi-cog-outline</v-icon
              >
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

export default {

 
  data() {
    return {
      role:"",
      id: localStorage.getItem("id"),
    };
  },
  methods: {
    
    ProjectDetail(id) {
      this.$router.push("/memeberhome/" + id);
    },
  },
  mounted(){
     this.role= localStorage.getItem("role");
  },
};
</script>
  
  
  <!-- STYLE -->
  <style>
@import "https://demo.dashboardpack.com/architectui-html-free/main.css";

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