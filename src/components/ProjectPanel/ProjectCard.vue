<template>
  <div class="project-card d-flex flex-column">
    <div class="title-section d-flex flex-row">
      <h4 class="title flex-fill">{{ details.name }}</h4>
      <a class="btn-more-options" href="#">...</a>
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
        <p class="description flex-fill">Description: {{ details.description }}</p>
        <p class="creation-date"> Created: {{ details.creationDate }}</p>
        <!-- <button class="btn-open-project">Open</button> -->
        <a class="btn-open-project" href="#">Open</a>
      </div>
    </div>
    <!-- <p id="name">{{ details.name }}</p>
    <p id="creation-date">{{ details.creationDate }}</p>
    <p id="description">{{ details.description }}</p>
    <p id="path">{{ details.path }}</p>
    <a id="link" href="#">
      This is a link
    </a> -->
  </div>
</template>

<script>

export default {
  name: 'ProjectCard',
  props: {
    details: Object
  },
  data () {
    return {
      name: 'foo'
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
    margin-right: 10px;
    width: 50px;
    height: 25px;
    font-size: 18px;
  }
}
.image-section {
  background-color: rgb(175, 175, 175);
  width: $card-min-width*0.4;
  // height: $card-height*0.75;
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
  height: $card-height*0.5;
  margin-bottom: 0px;
}
.creation-date {
  text-align: left;
  margin-bottom: 0px;
}
.btn-open-project {
  background-color: rgb(185, 185, 185);
  border: 2px;
  box-shadow: 0 0.1rem 0.1rem $shadow;
  float: right;
  text-decoration: none;
  color: rgb(25, 25, 25);
  margin-bottom: auto;
  &:active {
    background-color: rgb(200, 200, 200);
  }
}
</style>
