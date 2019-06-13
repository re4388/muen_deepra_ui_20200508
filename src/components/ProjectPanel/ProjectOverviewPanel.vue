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
    </div>
  </div>
</template>

<script>
import ProjectCard from './ProjectCard.vue'
import projectData from './project_data.json'

export default {
  name: 'ProjectOverviewPanel',
  components: {
    ProjectCard
  },
  data () {
    return {
      projects: projectData.content
    }
  }
}
</script>

<style lang="scss" scoped>
#project-overview-panel {
  min-height: 100%;
  background-color: gray;
  overflow-y: scroll;
}
.page-content {
  margin-top: 10px;
}
</style>
