<template>
    <div
      class="
        app-container app-theme-white
        body-tabs-shadow
        fixed-sidebar fixed-header
      "
    >
      <memeberTopnav />
  
      <div class="app-main">
        <memebersidenav />
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
            <!---------------------------------------------------section starts----------------------------------------------------------------------------------------->
            <div>
              <div class="maintitle">
                <div class="title1">
                  <div>
                    <template
                      ><span v-if="taskData?.category == 1">
                        <v-chip class="ma-2" color="error" outlined>
                          Developer Issue
                        </v-chip>
                      </span>
                      <span v-if="taskData?.category == 2">
                        <v-chip class="ma-2" color="warning" outlined>
                          Bug
                        </v-chip>
                      </span>
                      <span v-if="taskData?.category == 3">
                        <v-chip class="ma-2" color="primary" outlined>
                          Request
                        </v-chip>
                      </span>
                    </template>
                  </div>
  
                  <div>
                    <a x-small>Start Date</a>&nbsp;&nbsp;&nbsp;
                    <a x-small>Due Date</a>&nbsp;&nbsp;&nbsp;
                    <v-btn x-small shaped color="green">Closed</v-btn>
                  </div>
                </div>
                <div class="subtitle">
                  <h5>{{ taskData?.task_name }}</h5>
                  <div>
                    <v-btn rounded x-small><v-icon>mdi-eye</v-icon>Watch</v-btn>
                    <router-link :to='"/memberTaskEdit/"+ this.$route.params.id'>
                      <v-btn rounded x-small
                        ><v-icon>mdi-lead-pencil</v-icon>Edit</v-btn
                      >
                    </router-link>
                    <v-btn rounded x-small
                      ><v-icon>mdi-dots-vertical</v-icon></v-btn
                    >
                  </div>
                </div>
  
                <div class="taskcontent">
                  <!-----------------------accound section---------------------->
  
                  <div class="taskassignee">
                    <div class="acnt">
                      <div>
                        <v-img
                          src="../../assets/Images/profile1.png"
                          width="70"
                        ></v-img>
                      </div>
                      <v-col cols="12" sm="6">
                        <h5>{{ taskData?.assignee }}</h5>
                        <p>created :{{ taskData?.created_date }}</p>
                      </v-col>
                    </div>
  
                    <div class="qbtn">
                      <v-btn x-small
                        ><v-icon>mdi-format-quote-close</v-icon>Quote</v-btn
                      >
                      <v-btn x-small><v-icon>mdi-star</v-icon>0</v-btn>
                    </div>
                  </div>
                  <!-----------------description---------------------------------------->
  
                  <div>
                    <div>
                      <div class="discription"      v-html="taskData?.task_description">
                   
                      </div>
                      <!------------------------------------------------------------------>
  
                      <div class="tdata" v-if="shown">
                        <template>
                          <v-row>
                            <v-col cols="6">
                              <template>
                                <div class="gridleft1">
                                  <v-row>
                                    <v-col cols="6" sm="3">
                                      <span>Priority : </span>
                                    </v-col>
                                    <v-col cols="6" sm="3">
                                      <template>
                                        <td v-if="taskData?.priority == 0">
                                          High
                                        </td>
                                      </template>
                                      <template>
                                        <td v-if="taskData?.priority == 1">
                                          Normal
                                        </td>
                                      </template>
  
                                      <template>
                                        <td v-if="taskData?.priority == 2">
                                          Low
                                        </td>
                                      </template>
                                    </v-col>
                                  </v-row>
                                </div>
                              </template>
                            </v-col>
                            <v-col cols="6">
                              <template>
                                <div class="gridright1">
                                  <v-row>
                                    <v-col cols="6" sm="3">
                                      <span>Assignee : </span>
                                    </v-col>
                                    <v-col cols="6" sm="3">
                                      {{ taskData?.assignee }}
                                    </v-col>
                                  </v-row>
                                </div>
                              </template>
                            </v-col>
                          </v-row>
                        </template>
                        <template>
                          <v-row>
                            <v-col cols="6">
                              <template>
                                <div class="gridleft">
                                  <v-row>
                                    <v-col cols="6" sm="3">
                                      <span>Category : </span>
                                    </v-col>
                                    <v-col cols="6" sm="3"> </v-col>
                                  </v-row>
                                </div>
                              </template>
                            </v-col>
                            <v-col cols="6">
                              <template>
                                <div class="gridright">
                                  <v-row>
                                    <v-col cols="6" sm="3">
                                      <span>Milestone : </span>
                                    </v-col>
                                    <v-col cols="6" sm="3">
                                      {{ taskData?.assignee }}
                                    </v-col>
                                  </v-row>
                                </div>
                              </template>
                            </v-col>
                          </v-row>
                        </template>
                        <template>
                          <v-row>
                            <v-col cols="6">
                              <template>
                                <div class="gridleft">
                                  <v-row>
                                    <v-col cols="6" sm="3">
                                      <span>Version : </span>
                                    </v-col>
                                    <v-col cols="6" sm="3"> </v-col>
                                  </v-row>
                                </div>
                              </template>
                            </v-col>
                            <v-col cols="6">
                              <template>
                                <div class="gridright">
                                  <v-row>
                                    <v-col cols="6" sm="3">
                                      <span class="v-hidden"> ''</span>
                                    </v-col>
                                    <v-col cols="6" sm="3"> </v-col>
                                  </v-row>
                                </div>
                              </template>
                            </v-col>
                          </v-row>
                        </template>
                        <template>
                          <v-row>
                            <v-col cols="6">
                              <template>
                                <div class="gridleft">
                                  <v-row>
                                    <v-col cols="6" sm="3">
                                      <span>Estimated Hours : </span>
                                    </v-col>
                                    <v-col cols="6" sm="3">
                                      {{ taskData?.estimated_hours }}
                                    </v-col>
                                  </v-row>
                                </div>
                              </template>
                            </v-col>
                            <v-col cols="6">
                              <template>
                                <div class="gridright">
                                  <v-row>
                                    <v-col cols="6" sm="3">
                                      <span>Aactual Hours : </span>
                                    </v-col>
                                    <v-col cols="6" sm="3">
                                      {{ taskData?.actual_hours }}
                                    </v-col>
                                  </v-row>
                                </div>
                              </template>
                            </v-col>
                          </v-row>
                        </template>
                        <template>
                          <v-row>
                            <v-col cols="6">
                              <template>
                                <div class="gridleft">
                                  <v-row>
                                    <v-col cols="6" sm="3">
                                      <span>Resolution : </span>
                                    </v-col>
                                    <v-col cols="6" sm="3">
                                      {{ taskData?.estimated_hours }}
                                    </v-col>
                                  </v-row>
                                </div>
                              </template>
                            </v-col>
                          </v-row>
                        </template>
                      </div>
                    </div>
                    <v-btn @click="show" class="upbtn">
                      <v-icon>mdi-apple-keyboard-control</v-icon>
                    </v-btn>
                  </div>
                </div>
                <div class="attachment">
                  <template>
                    <template>
                      <div class="attachmentdiv">
                        <v-btn
                          @click="
                            expand = !expand;
                            expand2 = false;
                          "
                        >
                          <v-icon>mdi-attachment</v-icon>
                          <span>Attachment</span></v-btn
                        >
                        <v-btn
                          @click="
                            expand2 = !expand2;
                            expand = false;
                          "
                        >
                          <v-icon>mdi-lan-pending</v-icon>
                          <span>Subtasking</span></v-btn
                        >
                        <v-expand-transition>
                          <v-card
                            v-show="expand"
                            height="100"
                            width="100%"
                            class="mx-auto"
                          >
                            <v-btn class="btnattachment" x-small rounded
                              ><v-icon>mdi-plus</v-icon>Attach file</v-btn
                            >
                          </v-card>
                        </v-expand-transition>
                        <v-expand-transition>
                          <v-card
                            v-show="expand2"
                            height="100"
                            width="100%"
                            class="mx-auto"
                          >
                            <v-btn x-small class="btnattachment1"
                              ><v-icon>mdi-plus</v-icon>Add child issue</v-btn
                            >
                          </v-card>
                        </v-expand-transition>
                      </div>
                    </template>
                  </template>
                </div>
                <div class="cmts">
                  <p>Comments</p>
                  <div class="cmtdiv"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="footer1">
          <v-footer padless>
            <div class="firstshow" v-show="showText">
              <v-btn rounded class="attachmentbtn"
                ><v-icon>mdi-paperclip</v-icon></v-btn
              >

              <v-text-field
                outlined
                placeholder="Write a comment,use @mention to notify a colleague..........."
                disabled
              ></v-text-field>
              <v-btn class="attachmentbtn" @click="showText = !showText"
                ><v-icon>mdi-message-draw</v-icon>Change Status</v-btn
              >
            </div>

            <div class="ckeditor" v-show="!showText">
              <div class="ckmain">
                <v-col>
                  <ckeditor
                    :editor="editor"
                    v-model="editorData"
                    :config="editorConfig"
                    placeholder="Write a comment,use @mention to notify a colleague..........."
                  ></ckeditor>
                  <v-text-field
                    outlined
                    placeholder="Notify comment to:"
                  ></v-text-field>
                </v-col>
              </div>
              <div class="quater">
                <div class="status">
                  <v-select label="Status" :items="items" outlined></v-select>
                </div>

                <div class="statusform">
                  <div class="styledate">
                    <v-select
                      label="Assigne"
                      :items="items"
                      outlined
                    ></v-select>
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
                          label="Date"
                          hint="MM/DD/YYYY format"
                          persistent-hint
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
                  </div>
                  <div class="styledate">
                    <v-text-field label="Milestone" outlined></v-text-field>
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
                          label="Date"
                          hint="MM/DD/YYYY format"
                          persistent-hint
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
                  </div>
                  <div class="styledate">
                    <v-select
                      label="Resolution"
                      :items="items"
                      outlined
                    ></v-select>

                    <v-text-field outlined label="Est/Act"></v-text-field>
                  </div>
                </div>
                <div class="csbtn">
                  <v-btn @click="showText = !showText" color="#4fa5h6"
                    >Back</v-btn
                  >&nbsp;&nbsp;

                  <v-btn color="#4fa5d6">Submit</v-btn>
                </div>
              </div>
            </div>
          </v-footer>
        </div>
        </div>
      </div>
    </div>
  </template>
                    
                 
  
            <!--------------------------------------------------------section Ends-------------------------------------------------------------------------------------->
  
  
  
  <script >
import memebersidenav from './MemberSideNav.vue';
  import memeberTopnav from './MemberTopNav.vue';
  import ApiService from "@/service/apiservice";
  import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
  export default {
    components: { memebersidenav, memeberTopnav },
    data() {
      return {
        showText: true,
      ProjectData: [],
      taskData: [],
      shown: true,
      expand: false,
      expand2: false,

      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        // The configuration of the editor.
      },
      items: ["Open", "Close"],
      };
    },
  
    methods: {
      async getdetails() {
        try {
          const tid = this.$route.params.id;
          const response = await ApiService(
            "task/getTask/" + tid,
            "GET",
            null,
            null,
            null
          );
          this.taskData = response;
        } catch (error) {
          console.log(error, "error................");
          this.isFetching = false;
        }
      },
      async getProjectDetails(id) {
        try {
          const response = await ApiService("/member/project/" + id, "GET");
          this.ProjectData = response;
        } catch (error) {
          console.log(error, "error................");
        }
      },
      show() {
        this.shown = !this.shown;
      },
    },
    mounted() {
      this.getdetails();
      const pId = this.$route.params.id;
   
      this.getProjectDetails(pId);
    },
  };
  </script>
  
  <style scoped>
 .maintitle {
  width: 100%;
  height: 10%;
}
.subtitle {
  display: flex;
  justify-content: space-between;
}
.taskcontent {
  width: 100%;
  margin-top: 2%;
  border: 1px solid gray;
  padding: 2rem;
}
.taskassignee {
  height: 20%;
  margin-top: 1%;
  display: flex;
  justify-content: space-between;
}
.acnt {
  display: flex;
  width: 36%;
}

.discription {
  margin-top: 2%;
  width: 100%;
}
.qbtn {
  justify-content: space-between;
  margin-right: 22px;
}
.v-hidden {
  visibility: hidden;
}
.title1 {
  display: flex;
  justify-content: space-between;
}

.gridleft {
  margin-top: 3%;
  border-bottom: 1px solid rgb(124, 109, 109);
}
.gridright {
  margin-top: 3%;
  border-bottom: 1px solid rgb(124, 109, 109);
}
.gridleft1 {
  margin-top: 3%;

  border-bottom: 1px solid rgb(124, 109, 109);
  /* height: 100%; */
}
.gridright1 {
  margin-top: 3%;

  border-bottom: 1px solid rgb(124, 109, 109);
}
.upbtn {
  width: 100%;
  margin-top: 2%;
  box-shadow: none;
}
.attachment {
  margin-top: 2%;
}
/* .attachmentdiv{
  border: 1px solid gray;
} */
.cmts {
  margin-top: 2%;
}
.cmtdiv {
  border: 1px solid gray;
}
.footer1 {
  margin-top: 2%;
  width: 100%;
  position: sticky;
  bottom: 0;
}
.attachmentbtn {
  box-shadow: none;
}
.btnattachment {
  margin-left: 92%;
  margin-top: 2.5%;
}
.btnattachment1 {
  margin-left: 90.5%;
  margin-top: 2.5%;
}
/* ckeditor */
.ckeditor {
  display: flex;
  flex-direction: row;
  height: 10%;
  width: 100%;
}
.ckmain {
  width: 75%;
}
.quater {
  width: 30% !important;
}
.statusform {
  display: flex;
  flex-direction: column;
}
.estact {
  display: flex;
}
.styledate {
  display: flex;
}
.firstshow {
  width: 100%;
  display: flex;
  margin-left: 20px;
}
.statusform {
  display: flex;
}
.sform {
  display: flex;
}
.csbtn {
  justify-content: center;
}
  </style>