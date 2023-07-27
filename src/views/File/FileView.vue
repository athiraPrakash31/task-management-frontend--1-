<template>
  <div
    class="
      app-container app-theme-white
      body-tabs-shadow
      fixed-sidebar fixed-header
    "
  >
    <!-- top nav -->
    <topNavigation />

    <div class="app-main">
      <!-- side nav -->
      <sideNavigation :id="ProjectData.project_id" />
      <div class="app-main__outer">
        <div class="app-main__inner">
          <div class="app-page-title bg-light p-1">
            <div class="page-title-wrapper">
              <div class="page-title-heading">
                <router-link exact :to="'/HomePage/' + this.$route.params.id">
                  <v-img src="../../assets/Images/logo.png" width="50"></v-img
                ></router-link>
                <div>
                  {{ ProjectData?.project_name }} (
                  {{ ProjectData?.project_code }})
                </div>
              </div>
            </div>
          </div>
          <!---------------------------------------------------file/folder creation----------------------------------------------------------------------------->

          <div>
            <h5 id="f1">Files</h5>
          </div>

          <!----------------------------------------------------------file/folder selcection----------------------------------------------------------------------------------->

          <div class="row">
            <div class="col-md-12 col-lg-12">
              <div></div>
              <div class="frame1">
                <div class="selctdiv">
                  <div></div>
                </div>
                <!--------------------------------------------------------------------------------------------------------------------------------->

                <template>
                  <div v-if="file_list.files.length == 0">
                    <v-data-table
                      :headers="headers"
                      :items="file_list.files"
                      :items-per-page="20"
                      class="elevation-1"
                      v-model="files"
                      hide-default-footer
                      item-key="file_id"
                      @click:row="handleClick"
                    ></v-data-table>
                  </div>
                  <div v-if="file_list.files.length != 0">
                    <v-data-table
                      :headers="headers"
                      :items="file_list.files"
                      :items-per-page="20"
                      class="elevation-1"
                      v-model="files"
                      item-key="file_id"
                      @click:row="handleClick"
                    >
                      <template v-slot:[`item.name`]="{ item }">
                        <a @click="openfile(item)">{{ item.name }}</a>
                      </template>
                      <template v-slot:[`item.action`]="{ item }">
                        <v-row>
                          <div v-if="files.length == 0">
                            <v-menu bottom left>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  dark
                                  icon
                                  v-bind="attrs"
                                  v-on="on"
                                  class="black--text"
                                  v-show="projectRole != 5"
                                >
                                  <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                              </template>

                              <v-list>
                                <v-list-item>
                                  <v-btn @click="renamemodal(item)"
                                    >Rename</v-btn
                                  >
                                </v-list-item>
                              </v-list>
                            </v-menu>
                          </div>
                        </v-row>
                      </template>
                    </v-data-table>
                  </div>
                </template>

                <!--------------------------------------------------------------------------->

                <template>
                  <v-dialog v-model="renamedialog" persistent max-width="700">
                    <v-card>
                      <div id="title">
                        <v-card-title>
                          <span class="text-h5">Rename</span>
                          <v-spacer></v-spacer>

                          <v-btn icon @click="renamedialog = false" dark>
                            <v-icon> mdi-close </v-icon>
                          </v-btn>
                        </v-card-title>
                      </div>
                      <div class="rename">
                        <v-form v-model="isValid" @submit.prevent="renamefile">
                          <v-col sm="2" md="10">
                            <v-text-field
                              autocomplete="off"
                              outlined
                              type="text"
                              id="name"
                              :rules="filenameRules"
                              height="20"
                              v-model="filedata.name"
                              label="Rename"
                            ></v-text-field>
                          </v-col>
                        </v-form>
                      </div>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <div class="renamebtn" v-if="buttonValue == true">
                          <v-btn @click="renamedialog = false"> Cancel </v-btn
                          >&nbsp;
                          <v-btn
                            color="primary"
                            @click="renamefile"
                            :disabled="!isValid"
                          >
                            Rename
                          </v-btn>
                        </div>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template>
                <!--------------------------------------------------------------------------------------------------------------------------------------------->
                <div class="selctdiv1">
                  <div></div>
                </div>
              </div>
            </div>
            <!-------------------------------------------------Recent update Section------------------------------------------------------------------>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
                        
                  
  
  <script scoped>
import sideNavigation from "../AdminPage/adminSideNav.vue";
import topNavigation from "../AdminPage/adminTopNav.vue";
import ApiService from "../../service/apiservice";
import Vue from "vue";
import "vue-toast-notification/dist/theme-sugar.css";
import VueToast from "vue-toast-notification";
Vue.use(VueToast);
export default {
  components: { sideNavigation, topNavigation },

  data() {
    return {
      ProjectData: [],
      projectStatus: [],

      renamedialog: false,

      files: [],
      projectRole: "",
      data: {
        isHidden: false,
      },
      filedata: {
        name: null,
        id: null,
      },
      isValid: true,
      buttonValue: true,

      filenameRules: [
        (v) => !!v || "File name is required",
        (v) => !/^\s/.test(v) || "Enter a valid file name",
        (v) =>
          /^[A-Za-z0-9]+([ _]?[A-Za-z0-9]+)*$/.test(v) ||
          "Enter a valid file name",
        (v) => (v && v.length <= 25) || "File name must be less than 25 characters",
      ],

      headers: [
        { text: "Id", value: "id", sortable: false },
        { text: "File Name", value: "name", sortable: false },

        { text: "Updated Date", value: "updated_date", sortable: false },

        { text: "", value: "action", sortable: false },
      ],
      file_list: { files: [] },
    };
  },
  methods: {
    renamemodal(fid) {
      console.log(fid, "fid");

      this.filedata = {
        name: fid.file_name,
        id: fid.file_id,
      };

      this.renamedialog = true;
    },
    async GetProjectRole() {
      const response = await ApiService(
        "/project/projectRole/" + this.$route.params.id,
        "GET"
      );
      this.ProjectRoleList = response;
      localStorage.setItem(
        "projectRole",
        JSON.stringify(response.project_role)
      );
    },
    handleClick(value) {
      console.log(value);
    },

    async renamefile(e) {
      try {
        const response = await ApiService(
          "/files/filename/" + this.filedata.id,
          "PUT",
          { file_name: this.filedata.name }
        );
        console.log(this.filedata.name, "file name file name");
        console.log(response);

        if (response.statusCode == 500) {
          Vue.$toast.success("File rename failed", {
            position: "top",
          });
          this.renamedialog = true;
        } else if (response.statusCode == 1326) {
          Vue.$toast.success("File rename failed", {
            position: "top",
          });
          this.renamedialog = true;
        } else if (response.statusCode == 1400) {
          Vue.$toast.success("Enter a valid rename", {
            position: "top",
          });
          this.renamedialog = true;
        } else {
          Vue.$toast.success("File renamed Successfully", {
            position: "top",
          });

          this.renamedialog = false;
          this.getfiles();
        }
        e.preventDefault();
      } catch (error) {
        console.log(error);
      }
    },
    openfile(data) {
      console.log(data?.file_path, "(data?.file_path");
      window.open(`${data?.file_path}`);
    },

    async getfiles() {
      try {
        const id = this.$route.params.id;
        const response = await ApiService(
          "/files/getProjectFiles/" + id,
          "GET"
        );
        console.log(response);

        const formatedFile = response?.subFiles?.map((data) => {
          return {
            ...data,
            name: data?.file_name,
            id: data?.file_id,
            updated_user_name: data?.updated_by_file?.user_name,
          };
        });
        const formatedFolder = response?.subFolders?.map((data) => {
          return {
            ...data,
            name: data?.folder_name,
            id: data?.folder_id,
            updated_user_name: data?.updated_by_folders?.user_name,
          };
        });
        this.file_list = { files: [...formatedFile, ...formatedFolder] };
      } catch (error) {
        console.log(error);
      }
    },

    async getProjectDetails(id) {
      try {
        // const id = this.$route.params.id;
        const response = await ApiService(
          "/project/overallProjectStatus/" + id,
          "GET"
        );
        this.ProjectData = response;
        console.log("project data", this.ProjectData);
      } catch (error) {
        console.log(error, "error................");
      }
    },
  },
  mounted() {
    const id = this.$route.params.id;
    this.getProjectDetails(id);
    this.getfiles();
    this.projectRole = localStorage.getItem("projectRole");

    this.GetProjectRole();
  },
};
</script>
  
  <style>
#f1 {
  font-size: larger;
  font-weight: bold;
}
.frame1 {
  margin-top: 3%;
  box-sizing: border-box;
  border: 1px solid black;
}
.addfolder {
  box-sizing: border-box;
  border: 1rem;
  width: 100%;
  height: 10%;
  display: flex;
}
.notShown {
  visibility: hidden !important;
}
#table {
  border-bottom: 1px solid black;
}
#table1 {
  border-top: 1px solid #c9d4cc;
}

.txtfld {
  margin-top: 2%;
  width: 20%;
}
.addcancel {
  margin-top: 2%;
}
.pprclip {
  display: flex;
}
.filediv {
  display: flex;
  justify-content: space-between;
}
.selctdiv {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid gray;
}
.selctdiv1 {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid gray;
}
#title {
  background-color: #4fa5d6;
}
.rename {
  margin-top: 5%;
  width: 65%;
  margin-left: 20%;
}
.renamebtn {
  margin-right: 30%;
  justify-content: space-around;
}
</style>