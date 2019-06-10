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

export default {
  name: 'ProjectOverviewPanel',
  components: {
    ProjectCard
  },
  data () {
    return {
      projects: [
        {
          id: 1,
          name: 'Project 01'
        },
        {
          id: 2,
          name: 'Project 02'
        },
        {
          id: 3,
          name: 'Project 03'
        },
        {
          id: 4,
          name: 'Project 04'
        }
      ]
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
