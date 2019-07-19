<template>
  <div id="viewer-container" class="container">
    <!-- <div v-if="!image">
      <h2>Select an image</h2>
      <input type="file" @change="onFileChange">
    </div>
    <div v-else>
      <img :src="image" />
      <button @click="removeImage">Remove image</button>
    </div> -->
  </div>
</template>

<script>
// import ImagePreview from '@/components/ViewerPanel/ImageProcessing.vue';

export default {
  name:"ViewerContainer",
  components: {
    // ImagePreview
  },
  // data () {
  //   return {
  //     image: null
  //   }
  // },
  // methods: {
  //   onFileChange(e) {
  //     var files = e.target.files || e.dataTransfer.files;
  //     if (!files.length)
  //       return;
  //     this.createImage(files[0]);
  //   },
  //   createImage(file) {
  //     var image = new Image();
  //     var reader = new FileReader();
  //     var vm = this;

  //     reader.onload = (e) => {
  //       vm.image = e.target.result;
  //     };
  //     reader.readAsDataURL(file);
  //   },
  //   removeImage: function (e) {
  //     this.image = '';
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.container {
  min-width: 100%;
  height: 100%;
  padding-right: 0px;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  border: 1px solid green;
  text-align: center;
}

img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
button {
  
}
</style>