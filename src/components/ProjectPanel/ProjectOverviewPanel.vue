<template>
  <div id="project-overview-panel" class="container-main">
    <div class="page-content">
      <div class="project-list">
        <template v-for="(item, index) in projects">
          <project-card
            :key="index"
            :details="item"
          />
        </template>
      </div>
      <a id="btn-create-project" @click="createProject">
        <div class="content">+</div>
      </a>
    </div>
  </div>
</template>

<script>
import ProjectCard from './ProjectCard.vue'
import projectManager from '@/api/projects_service.js'
import { EventBus } from '@/event_bus.js'

export default {
  name: 'ProjectOverviewPanel',
  components: {
    ProjectCard
  },
  created () {
    // TODO: go to bottom of this page if this page is redirected from
    // `DataImportPanel` (that is, make users able to see that recently
    // created project card after they finish the data import phase from
    // `DataImportPanel`)
    EventBus.$on('projectDeleted', () => {
      this.fetchProjectData()
    })
  },
  mounted () {
    this.fetchProjectData()
    EventBus.$emit('pageChanged', 'ProjectOverview')
  },
  beforeDestroy () {
    EventBus.$off('projectDeleted')
  },
  watch: {
    '$route': 'fetchProjectData'
  },
  methods: {
    createProject () {
      this.$router.push('/import-data')
    },
    fetchProjectData () {
      projectManager.getProjectList().then((result) => {
        if (result.project_list.length == 0) return
        this.projects = result.project_list
        console.log(this.projects)
      })
    }
  },
  data () {
    return {
      projects: []
    }
  }
}
</script>

<style lang="scss" scoped>
$btn-diameter: 40px;
$btn-color-transparency: 0.7;

#project-overview-panel {
  min-height: 100%;
  background-color: gray;
  overflow-y: scroll;
  scrollbar-width: none;
}
.page-content {
  margin-top: 10px;
  padding: 0px 0px $btn-diameter 0px;
}
#btn-create-project {
  position: fixed;
  bottom: 10px;
  right: 5%;
  & .content {
    width: $btn-diameter;
    height: $btn-diameter;
    border-radius: $btn-diameter / 2;
    line-height: $btn-diameter;
    font-size: $btn-diameter / 1.5;
    user-select: none;
    background: rgba(0, 150, 0, $btn-color-transparency);
    color: rgba(200, 200, 200, $btn-color-transparency);
  }
  &:hover {
    & .content {
      background: rgba(0, 150, 0, 1);
      color: rgba(200, 200, 200, 1);
    }
  }
  &:active {
    & .content {
      background: rgba(0, 175, 0, 1);
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
