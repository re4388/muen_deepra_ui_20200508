<template>
  <div class="project-card d-flex flex-column">
    <div class="title-section d-flex flex-row">
      <h4 class="title flex-fill">{{ projectName }}</h4>
      <div class="dropdown-wrapper">
        <b-dropdown class="dropdown-list" right size="sm">
          <b-dropdown-item
            class="dropdown-item-delete"
            variant="danger"
            @click="showModalDeleteProject"
          >Delete</b-dropdown-item>
          <b-dropdown-item
            class="dropdown-item-edit"
            variant="danger"
            :name="projectName"
            @click="showModalEditProject"
          >Rename</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <div class="content d-flex flex-row">
      <div class="image-section flex-column">
        <div class="thumbnail-section"></div>
        <div class="tag-section">
          <p>tags</p>
        </div>
      </div>
      <div class="text-section flex-fill align-items-start flex-column">
        <p class="description flex-fill">Description: {{ description }}</p>
        <p class="creation-date">Created: {{ creationDate }}</p>
        <a class="btn-open-project" @click="openProject">
          <div class="content">Open</div>
        </a>
      </div>
    </div>
    <b-modal ref="modal-delete-project" title="delete" @ok="deleteProject">
      <p>Are you sure that you want to delete this project?</p>
    </b-modal>
    <b-modal ref="modal-edit-project" title="Double click to edit" @ok="updateInfo">
      <p>
        Name:
        <b @dblclick="edit = true" v-if="edit === false">{{ projectName }}</b>
      
      <input
        v-if="edit === true"
        v-model="projectName"
        v-on:blur="edit=false; $emit('update')"
        @keyup.enter="edit=false; $emit('update')"
      />
      </p>
      <p>
        Description:
        <b @dblclick="edit2 = true" v-if="edit2 === false">{{ projectDescription }}</b>
      <input
        v-if="edit2 === true"
        v-model="projectDescription"
        v-on:blur="edit2=false; $emit('update')"
        @keyup.enter="edit2=false; $emit('update')"
      />
      </p>
    </b-modal>
  </div>
</template>


<script>
import projectService from "@/api/projects_service.js";
import { EventBus } from "@/event_bus.js";

export default {
  name: "ProjectCard",
  props: {
    details: Object
  },
  data() {
    return {
      edit: false,
      edit2: false,
      projectName: this.details.name,
      projectDescription: this.details.description
    };
  },
  computed: {
    description: function() {
      return this.projectDescription;
    },
    creationDate: function() {
      let date = new Date();
      let ts = this.details.creation_timestamp;
      // unit: milisecond
      date.setTime(ts.seconds + "000");
      return date
        .toUTCString()
        .split(" ")
        .slice(0, 5)
        .join(" ");
    }
  },
  methods: {
    openProject() {
      this.$store.dispatch("Project/setCurrentProject", this.details);
      console.log("---- saved project info : ");
      console.log(this.$store.getters["Project/currentProject"]);
      EventBus.$emit("pageChanged", {
        pages: [`Project: ${this.details.name}`],
        keepRoot: false
      });
      EventBus.$emit("entryChanged", "project");
      this.$store.dispatch("setCurrentEntry", "project");
      this.$router.push("/project-profile");
    },
    showModalDeleteProject() {
      this.$refs["modal-delete-project"].show();
    },
    showModalEditProject() {
      this.$refs["modal-edit-project"].show();
    },
    deleteProject() {
      console.log(this.details.uuid);
      projectService
        .deleteProject(this.details.uuid)
        .then(result => {
          console.log(result);
          EventBus.$emit("projectDeleted");
        })
        .catch(result => {
          alert("project is failed to be deleted");
          // console.log('Project')
        });
    },
    updateName() {
      projectService
        .updateProjectName(this.details.uuid, this.projectName)
        .then(result => {
        });
    },

    updateDescription() {
      projectService
        .updateProjectDesc(this.details.uuid, this.projectDescription)
        .then(result => {
        });
    },

    updateInfo() {
      if (this.projectName !== this.details.name) {
        this.updateName();
      }

      if (this.projectDescription !== this.details.description) {
        this.updateDescription();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$shadow: rgba(0, 0, 0, 0.2);
$card-height: 200px;
$card-min-width: 600px;

.project-card {
  display: block;
  max-width: 80%;
  min-width: $card-min-width;
  height: $card-height;
  margin: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  padding: 5px 15px;
  background-color: rgb(225, 225, 225);
  box-shadow: 0 0.1875rem 1.5rem $shadow;
}
.title-section {
  & .title {
    margin: 5px 10px 5px;
    text-align: left;
  }
  & .btn-more-options {
    user-select: none;
    & .content {
      margin-right: 10px;
      width: 25px;
      height: 25px;
      line-height: 25px;
      font-size: 25px;
      font-size: 18px;
      &:hover {
        color: rgb(150, 150, 150);
      }
      &:active {
        color: black;
      }
    }
  }
}
.image-section {
  background-color: rgb(175, 175, 175);
  width: $card-min-width * 0.4;
  height: auto;
  margin-bottom: 10px;
}
.thumbnail-section {
  background-color: rgb(150, 150, 150);
  height: $card-height * 0.5;
}
.tag-section {
  color: white;
  text-align: left;
  padding: 15px;
  background-color: rgb(0, 25, 75);
  width: $card-min-width * 0.4;
  height: $card-height * 0.25;
}
.text-section {
  padding: 0px 10px;
}
.description {
  text-align: left;
  height: $card-height * 0.45;
  margin-bottom: 0px;
}
.creation-date {
  text-align: left;
  margin-bottom: 0px;
}

.dropdown-wrapper {
  align-content: center;
  align-items: center;
}

.dropdown-list {
  position: relative;
  margin: 0.5rem;
  height: 20px;
}

$btn-height: 30px;
.btn-open-project {
  & .content {
    background-color: rgb(185, 185, 185);
    color: rgb(25, 25, 25);
    width: 50px;
    height: $btn-height;
    line-height: $btn-height;
    box-shadow: 2px 2px 2px $shadow;
    float: right;
    text-align: center;
    text-decoration: none;
    margin-bottom: auto;
    user-select: none;
    &:active {
      background-color: rgb(200, 200, 200);
    }
  }
}
</style>
