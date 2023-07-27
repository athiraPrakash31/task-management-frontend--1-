<template>
    <div class="app-main__outer section">
      <div height="100%" class="frame">
        <v-card height="100%" width="18%">
          <v-navigation-drawer
            class="sideBar"
            absolute
            color="rgba(255,255,255,.45);"
            width="100%"
            permanent
          >
  
          <div class="navigator">
          <v-row justify="left">
            <v-icon>mdi-settings</v-icon>
            <h6 id="h6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Project Settings </h6>
          </v-row>
          <div class=" navcontent">
          
            <ul class="vertical-nav-menu" style="justify-content: center">
              <v-list class="list">
                <router-link to="/members" custom v-slot="{ isActive }">
                  <div :class="{ ActiveLink: isActive }">
                    <a class="mm"> MEMBERS </a>
                  </div>
                </router-link>
              </v-list>
              <v-list class="list">
                <router-link to="/home" custom v-slot="{ isActive }">
                  <div :class="{ ActiveLink: isActive }">
                    <a class="mm"> ISSUE TYPE </a>
                  </div>
                </router-link>
              </v-list>
              <v-list class="list">
                <router-link to="/home" custom v-slot="{ isActive }">
                  <div :class="{ ActiveLink: isActive }">
                    <a class="mm"> CATEOGORY </a>
                  </div>
                </router-link>
              </v-list>
            </ul>
         
        </div>
          </div>
          </v-navigation-drawer>
        </v-card>
  
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data: () => ({}),
  };
  </script>
  
  
  
  
  <style scoped>
  .mainDiv {
    min-height: 100%;
    max-width: 20%;
    background-color: #d6d6d6e0;
    font-family: "Open Sans", sans-serif;
  }
  .section {
    padding-left: 0 !important;
    width: 100%;
  }
  .mm {
    color: black;
    font-size: medium;
  }
  .title {
    padding: 15px 0px 15px 0;
    margin: 0 !important;
    position: relative;
    min-height: 65px;
    padding-top: 16px;
  }
  #h6 {
    font-size: x-large;
    font-weight: 400;
   
    margin-left: 25px;
    margin-top: 29px;
  }
  .frame {
    display: -webkit-inline-box;
    height: 100%;
    width: 100%;
  }
  .ActiveLink {
    background-color: rgb(205, 218, 213);
  
    /* color:black */
  }
  .list:hover {
    background-color: rgb(205, 218, 213);
  }
  
  .navigator {
    margin-top: 7%;
    margin-left: 4%;
  }
  .navcontent {
    margin-top: 10%;
  }
  .list {
    padding: 5%;
  }
  </style>