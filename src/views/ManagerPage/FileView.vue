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
                <v-img src="../../assets/Images/logo.png" width="50"></v-img>
                <div>
                  {{ ProjectData?.project_name }} (
                  {{ ProjectData?.project_code }})
                </div>
              </div>
            </div>
          </div>
          <!---------------------------------------------------file/folder creation----------------------------------------------------------------------------->
          <div>
            <div class="col-md-6 col-lg-9">
              <div class="filediv">
                <div>
                  <h5 id="f1">File</h5>
                </div>

                <div class="folderfilediv">
                  <template>
                    <template>
                      <div class="attachmentdiv">
                        <v-btn
                          @click="
                            expand = !expand;
                            expand2 = false;
                          "
                          rounded
                          class="ma-2"
                          small
                        >
                          <v-icon color="#c6c7bf">mdi-folder-plus</v-icon>
                          <span> Add Folder</span></v-btn
                        >
                        <v-btn
                          @click="
                            expand2 = !expand2;
                            expand = false;
                          "
                          rounded
                          class="ma-2"
                          small
                        >
                          <v-icon color="#c6c7bf">mdi-file-plus</v-icon>
                          <span>Add File</span></v-btn
                        >
                        <v-btn rounded class="ma-2" small
                          ><v-icon color="#c6c7bf">mdi-file-export</v-icon>Open
                          in browser
                        </v-btn>
                      </div>
                    </template>
                  </template>
                </div>
              </div>
              <v-expand-transition>
                <v-card
                  v-show="expand"
                  height="100"
                  width="100%"
                  class="mx-auto"
                >
                  <div class="addfolder">
                    <v-col cols="12" sm="6">
                      <v-text-field outlined label="Add folder"></v-text-field
                    ></v-col>
                    <div class="addcancel">
                      <v-btn class="btnattachment" small rounded color="#4fa5d6"
                        >Add</v-btn
                      >&nbsp;&nbsp;
                      <v-btn
                        class="btnattachment"
                        small
                        rounded
                        @click="expand = !expand"
                        color="#4fa5h6"
                        >Cancel</v-btn
                      >
                    </div>
                  </div>
                </v-card>
              </v-expand-transition>
              <v-expand-transition>
                <v-card
                  v-show="expand2"
                  height="100"
                  width="100%"
                  class="mx-auto"
                >
                  <div class="addfolder">
                    <v-col cols="12" sm="6">
                      <div class="pprclip">
                        <v-file-input
                          label="Add file"
                          outlined
                          dense
                          placeholder="Select your file"
                        ></v-file-input></div
                    ></v-col>
                    <div class="addcancel">
                      <v-btn class="btnattachment" small rounded color="#4fa5d6"
                        >Add</v-btn
                      >&nbsp;&nbsp;
                      <v-btn
                        class="btnattachment"
                        small
                        rounded
                        @click="expand2 = !expand2"
                        color="#4fa5h6"
                        >Cancel</v-btn
                      >
                    </div>
                  </div>
                </v-card>
              </v-expand-transition>
            </div>
            <!----------------------------------------------------------file/folder selcection----------------------------------------------------------------------------------->

            <div class="row">
              <div class="col-md-6 col-lg-9">
                <div></div>
                <div class="frame1">
                  <div class="selctdiv">
                    <div>
                      <v-checkbox
                        value="select"
                        hide-details
                        label="Select All"
                      >
                      </v-checkbox>
                    </div>

                    <div>
                      <span>checked item(s)</span>
                      &nbsp;&nbsp;
                      <!-------------------------------------------------------------------------------->
                      <template>
                        <v-dialog v-model="dialog" persistent max-width="700">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn class="ma-3" small v-bind="attrs" v-on="on" disabled
                              >Rename
                            </v-btn>
                          </template>
                          <v-card>
                            <div id="title">
                              <v-card-title>
                                <span class="text-h5">Rename</span>
                                <v-spacer></v-spacer>

                                <v-btn icon @click="dialog = false" dark>
                                  <v-icon> mdi-close </v-icon>
                                </v-btn>
                              </v-card-title>
                            </div>
                            <div class="rename">
                              <v-text-field
                                outlined
                                placeholder="Rename"
                              ></v-text-field>
                            </div>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <div class="renamebtn">
                                <v-btn @click="dialog = false"> Cancel </v-btn
                                >&nbsp;
                                <v-btn color="primary" @click="dialog = false">
                                  Rename
                                </v-btn>
                              </div>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </template>
                      <!------------------------------------------------------------------------------------------------------------------->
                      <template>
                        <v-dialog v-model="dialog1" persistent max-width="700">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn class="ma-3" small v-bind="attrs" v-on="on" disabled
                              >Move
                            </v-btn>
                          </template>
                          <v-card>
                            <div id="title">
                              <v-card-title>
                                <span class="text-h5"
                                  >Please select destination folder and click
                                  "Move".</span
                                >
                                <v-spacer></v-spacer>

                                <v-btn icon @click="dialog1 = false" dark>
                                  <v-icon> mdi-close </v-icon>
                                </v-btn>
                              </v-card-title>
                            </div>
                            <div class="rename">
                              <v-select outlined :items="items"></v-select>
                            </div>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <div class="renamebtn">
                                <v-btn @click="dialog1 = false"> Cancel </v-btn
                                >&nbsp;
                                <v-btn color="primary" @click="dialog1 = false">
                                  Move
                                </v-btn>
                              </div>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </template>

                      <template>
                        <v-dialog v-model="dialog2" persistent max-width="700">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn class="ma-3" small v-bind="attrs" v-on="on" disabled
                              >Delete
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-title></v-card-title>
                            <v-spacer></v-spacer>
                            <v-card-text
                              >Are you sure you want delete checked file/folder
                              ?</v-card-text
                            >
                            <v-spacer></v-spacer>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <div class="renamebtn">
                                <v-btn @click="dialog2 = false"> Cancel </v-btn
                                >&nbsp;
                                <v-btn color="primary" @click="dialog2 = false">
                                  Ok
                                </v-btn>
                              </div>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </template>
                      <v-btn class="ma-3" small disabled>Download </v-btn>
                    </div>
                  </div>

                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th id="" >File Name</th>
                          <th id="" >Size</th>
                          <th id="" >Updated By</th>
                          <th id="" >Updated</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>This folder is emplty</td>
                        </tr>
                      </tbody>
                    </template></v-simple-table
                  >
                  <div class="selctdiv1">
                    <div>
                      <v-checkbox
                        value="select"
                        hide-details
                        label="Select All"
                      >
                      </v-checkbox>
                    </div>

                    <div>
                      <span>checked item(s)</span>
                      &nbsp;&nbsp;
                      <template>
                        <v-dialog v-model="dialog" persistent max-width="700">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn class="ma-3" small v-bind="attrs" v-on="on" disabled>
                              Rename
                            </v-btn>
                          </template>
                          <v-card>
                            <div id="title">
                              <v-card-title>
                                <span class="text-h5">Rename</span>
                                <v-spacer></v-spacer>

                                <v-btn icon @click="dialog = false" dark>
                                  <v-icon> mdi-close </v-icon>
                                </v-btn>
                              </v-card-title>
                            </div>
                            <div class="rename">
                              <v-text-field
                                outlined
                                placeholder="Rename"
                              ></v-text-field>
                            </div>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <div class="renamebtn">
                                <v-btn @click="dialog = false"> Cancel </v-btn
                                >&nbsp;
                                <v-btn color="primary" @click="dialog = false">
                                  Rename
                                </v-btn>
                              </div>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </template>

                      <template>
                        <v-dialog v-model="dialog1" persistent max-width="700">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn class="ma-3" small v-bind="attrs" v-on="on" disabled
                              >Move
                            </v-btn>
                          </template>
                          <v-card>
                            <div id="title">
                              <v-card-title>
                                <span class="text-h5"
                                  >Please select destination folder and click
                                  "Move".</span
                                >
                                <v-spacer></v-spacer>

                                <v-btn icon @click="dialog1 = false" dark>
                                  <v-icon> mdi-close </v-icon>
                                </v-btn>
                              </v-card-title>
                            </div>
                            <div class="rename">
                              <v-select outlined :items="items"></v-select>
                            </div>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <div class="renamebtn">
                                <v-btn @click="dialog1 = false"> Cancel </v-btn
                                >&nbsp;
                                <v-btn color="primary" @click="dialog1 = false">
                                  Move
                                </v-btn>
                              </div>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </template>

                      <template>
                        <v-dialog v-model="dialog2" persistent max-width="700">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn class="ma-3" small v-bind="attrs" v-on="on" disabled
                              >Delete
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-title></v-card-title>
                            <v-spacer></v-spacer>
                            <v-card-text
                              >Are you sure you want delete checked file/folder
                              ?</v-card-text
                            >
                            <v-spacer></v-spacer>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <div class="renamebtn">
                                <v-btn @click="dialog2 = false"> Cancel </v-btn
                                >&nbsp;
                                <v-btn color="primary" @click="dialog2 = false">
                                  Ok
                                </v-btn>
                              </div>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </template>
                      <v-btn class="ma-3" small disabled>Download </v-btn>
                    </div>
                  </div>
                </div>
              </div>
              <!-------------------------------------------------Recent update Section------------------------------------------------------------------>

              <div class="col-md-6 col-lg-3">
                <h6>Recent Updates</h6>
                <div
                  class="
                    card-shadow-danger
                    mb-3
                    widget-chart widget-chart2
                    text-left
                    card
                  "
                >
                  <div class="widget-content">
                    <div class="widget-content-outer">
                      <div class="widget-content-wrapper">
                        <div class="widget-content-left pr-2 fsize-1"></div>
                        <div class="widget-content-right w-100"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--------------------------------------------------------------------------------------------------------------->

                <h6>Find Files</h6>
                <div
                  class="
                    card-shadow-danger
                    mb-3
                    widget-chart widget-chart2
                    text-left
                    card
                  "
                >
                  <div class="widget-content">
                    <div class="widget-content-outer">
                      <div class="widget-content-wrapper">
                        <div class="widget-content-left pr-2 fsize-1"></div>
                        <div class="widget-content-right w-100">
                          <p>Updated</p>
                          <template>
                            <v-container>
                              <v-row>
                                <v-col cols="12" lg="6">
                                  <v-menu
                                    ref="menu1"
                                    v-model="menu1"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="auto"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="dateFormatted"
                                        prepend-icon="mdi-calendar"
                                        v-bind="attrs"
                                        @blur="date = parseDate(dateFormatted)"
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-model="date"
                                      no-title
                                      @input="menu1 = false"
                                    ></v-date-picker>
                                  </v-menu>
                                </v-col>

                                <v-col cols="12" lg="6">
                                  <v-menu
                                    v-model="menu2"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="auto"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="computedDateFormatted"
                                        persistent-hint
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-model="date"
                                      no-title
                                      @input="menu2 = false"
                                    ></v-date-picker>
                                  </v-menu>
                                </v-col>
                              </v-row>
                            </v-container>
                          </template>
                          <!------------------------------------------------------------------------------------------------------------->
                          <p>By</p>
                          <template>
                            <v-container fluid>
                              <v-row align="center">
                                <v-col class="d-flex" cols="12" sm="10">
                                  <v-select outlined :items="items"></v-select>
                                </v-col>
                                <v-icon>mdi-account-multiple</v-icon>
                              </v-row>
                            </v-container></template
                          >
                          <!---------------------------------------------------------------------------------------------------------------------->
                          <p>Keyword</p>
                          <template>
                            <v-form>
                              <v-container>
                                <v-row>
                                  <v-col cols="2" sm="2" md="12">
                                    <v-text-field outlined></v-text-field>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-form>
                          </template>
                          <!---------------------------------------------------------------------------------------------------------------->
                          <template>
                            <v-row
                              align="center"
                              justify="space-around"
                            ></v-row>
                            <v-btn depressed color="primary"> Search</v-btn>
                          </template>

                          <!-------------------------------------------------------------------------------------------------->
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
    </div>
  </div>
</template>
                        
                  
  
  <script scoped>
import sideNavigation from "./SideNav.vue";
import topNavigation from "./topNav.vue";
import ApiService from "../../service/apiservice";

export default {
  components: { sideNavigation, topNavigation },

  data() {
    return {
      ProjectData: [],
      projectStatus: [],
      expand: false,
      expand2: false,
      dialog: false,
      dialog1: false,
      dialog2: false,

      data: {
        isHidden: false,
      },
    };
  },
  methods: {
    async getProjectDetails(id) {
      try {
        // const id = this.$route.params.id;
        const response = await ApiService("/project/overallProjectStatus/" + id, "GET");
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