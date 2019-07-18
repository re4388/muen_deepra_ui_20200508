<template>
  <div class="project-card d-flex flex-column">
    <div class="title-section d-flex flex-row">
      <h4 class="title flex-fill">{{ details.name }}</h4>
      <a class="btn-more-options">
        <div class="content">...</div>
      </a>
    </div>
    <div class="content d-flex flex-row">
      <div class="image-section flex-column">
        <div class="thumbnail-section">
        </div>
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
  </div>
</template>

<script>
import { EventBus } from '@/event_bus.js'

export default {
  name: 'ProjectCard',
  props: {
    details: Object
  },
  computed: {
    description: function () {
      return this.details.description
    },
    creationDate: function () {
      let date = new Date()
      let ts = this.details.creation_timestamp
      date.setTime(ts.seconds + String(ts.nanos/1000000))
      return date.toUTCString().split(' ').slice(0, 5).join(' ')
    }
  },
  methods: {
    openProject () {
      this.$store.dispatch('setCurrentProject', this.details)
      console.log('---- saved project info : ')
      console.log(this.$store.getters.currentProject)
      EventBus.$emit('entryChanged', 'project')
      this.$router.push('/project-profile')
    }
  },
  data () {
    return {
    }
  }
}
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
  width: $card-min-width*0.4;
  height: auto;
  margin-bottom: 10px;
}
.thumbnail-section {
  background-color: rgb(150, 150, 150);
  height: $card-height*0.5;
}
.tag-section {
  color: white;
  text-align: left;
  padding: 15px;
  background-color: rgb(0, 25, 75);
  width: $card-min-width*0.4;
  height: $card-height*0.25;
}
.text-section {
  padding: 0px 10px;
}
.description {
  text-align: left;
  height: $card-height*0.45;
  margin-bottom: 0px;
}
.creation-date {
  text-align: left;
  margin-bottom: 0px;
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
