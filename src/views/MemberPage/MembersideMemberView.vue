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

    <div class="app-main">
      <!-- side nav -->
      <memebersidenav />

      <div class="app-main__outer sec">
        <div class="app-page-title title bg-light">
          <div class="page-title-wrapper">
            <div class="page-title-heading" width="100%">
              <v-img src="../../assets/Images/logo.png" width="50"></v-img>
              <div>{{ ProjectData?.project_name }} ( {{ProjectData?.project_code}})</div>
            </div>
          </div>
        </div>

        <!--------sub sidebar--------->

        <psSidebar>

       
          
   




       
          
         
             
          <div class="table">
            <div class="d-flex justify-space-between"></div>
            <!--------------------------------View Members----------------------------------------------->
            <div>
              
              <v-data-table
                :headers="headers"
                :items="user_list"
                :items-per-page="5"
                
                class="custom_table_class"
              
              
                
                
              >
                <template v-slot:[`item.role`]="{ item }"
                  ><td>{{ findUsertype(item?.role) }}</td></template
                >
                <template v-slot:[`item.joined_date`]="{ item }"
                    ><p>{{ moment(item.joined_date).format('DD/MM/YYYY') }}</p>
                </template>
                <template v-slot:[`item.action`]="{ item }">
                    <v-row>
                     
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon
                              class="mr-5"
                              v-bind="attrs"
                              v-on="on"
                              color="red"
                              @click="openModal(item.user_id)"
                              >mdi-delete</v-icon
                            >
                          </template>
                          <span>Delete User</span>
                        </v-tooltip>
                        
                     
                    </v-row>
                    <v-row> </v-row>
                  </template>




              </v-data-table>
<!-- delete modal -->

              <v-dialog v-model="confirmation" max-width="400">
      <v-card>
        <v-card-title class="text-h5"> </v-card-title>

        <v-card-text> Are you sure you want to delete this record? </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red" text @click="onClose()"> No </v-btn>

          <v-btn color="green darken-1" text @click="deleteUser()"> Yes </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
            </div>
            
          </div>
          
        </psSidebar>
        
      </div>
    </div>
  </div>
</template>





  <script>
import ApiService from "../../service/apiservice.js";
import psSidebar from "./projectSettingnav.vue";
import memebersidenav from "./MemberSideNav.vue";
import memeberTopnav from "./MemberTopNav.vue";
let moment = require("moment");
export default {
  components: { memebersidenav, memeberTopnav, psSidebar },

  data() {
    return {
      confirmation:false,
      type: [
          { value: "1", text: "Admin" },
          { value: "2", text: "Member" },
          { value: "3", text: "Guest" },
        
        ], 
      role: "",
      moment: moment,
      dialog: false,
      
      isValid: false,
      ProjectData:[],
      valid: true,
     
      headers: [
        { text: "NAME",sortable: false,value: "user_name" ,class:"info"},
        { text: "ROLE", value: "user.role.role_name", sortable: false ,class:"info"},
        { text: "JOINED ON", value: "joined_date", sortable: false,class:"info",},
        { text: "ACTION", value: "action", sortable: false ,class:"info"},
      ],
      user_list: [],
    };
  },
  methods: {
    async getProjectDetails() {
      try {
        const id = this.$route.params.id;
        const response = await ApiService(
          "/project/overallProjectStatus/"+id,
          "GET",
          
        );
        this.ProjectData = response;
      } catch (error) {
        console.log(error, "error................");
      }
    },
    async getUser() {
      try {
        const id = this.$route.params.id;

        const response = await ApiService("project/Usersprojects/"+id, "GET", null);

        if (response?.userlist?.length !== 0) {
          this.user_list = response?.userlist;
        }
      } catch (error) {
        console.log(error, "error................");
      }
    },
    //-------------------------------------------------user type convertion----------------------------------------------------------
    findUsertype(value) {
      if (value === 0) {
        return "Admin";
      }
      const role = this.type.find((data) => data?.value == value);
      console.log(this.type, "this.type");
      return role?.text;
    },
    openModal(){
      this.confirmation=true;
    },
    deleteUser(){
      this.confirmation=false;

    },
    onClose(){

      this.confirmation=false;


    }
  },
  beforeMount() {
    this.getProjectDetails();

    this.getUser();
  },
};
</script>
    
    <style scoped>

#imp {
  color: red;
}
.v-text-field {
  height: 20%;
}
.label {
  font-size: medium;
}
.title {
  padding: 15px 0px 15px 0;
  margin: 0 !important;
  position: relative;
  min-height: 65px;
  padding-top: 16px;
}
.table {
  width: 78%;
  height: 100%;
  padding: 43px;
}
.app-main {
  width: 100%;
}
.sec {
  width: 100% !important;
}
.custom_table_class > div > table > thead {
  background-color: #4fa5d6;
  border-radius: 10px;
}

</style>