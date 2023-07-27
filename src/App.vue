<template>
  
  <v-app>
    <v-content>
  <router-view></router-view>
 </v-content>
  </v-app>
</template>

<script>
export default {

  name: 'App',

  data: () => ({
    //
  }),


  mounted() {
    let Script = document.createElement("script");
    Script.setAttribute(
      "src",
      "https://demo.dashboardpack.com/architectui-html-free/assets/scripts/main.js"
    );
    Script.async = true;

    document.head.appendChild(Script);
    document.getElementById("myDropdown").classList.toggle("show")
  },
};
</script>


<style>
.ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline {
  min-height: 200px;
}
.fixed-header .app-header{
  z-index:999;
}
.dropdown-item:hover, .dropdown-item:focus{
  background-color:#ddd !important;
}
.dropdown-content a { border-bottom:1px solid #e0e0e0e0; }
  @media  screen and (max-width:1265px) {
    footer{
      left: 80px !important;
    }
}
@media  screen and (max-width:991px) {
    footer{
      left: 4px !important;
    }
}
p{
    word-wrap: break-word;
}
.col-lg-12{
  word-break:break-all;
}
</style>
