<template>
  <div class="import-dataset-step step-content d-flex flex-column">
    <div class="title-section">
      <h4 class="title text-content">{{ content.title }}</h4>
      <p class="description text-content">
        Please select a folder to be imported.<br>
        Currently supported:<br>
        1. All data is placed in selected folder, and all files are
        listed in a `label_mapping.csv` file.<br>
        2. Data were classified by subfolders.<br>
      </p>
    </div>
    <div class="content-section flex-fill">
      <p class="description text-content">
        Selected folder: 
        <b-form-file
          id="input-folder-browser"
          ref="input-folder-browser"
          class="mb-2"
          v-model="selectedFolder"
          :state="Boolean(selectedFolder)"
          :directory="true"
          @input="checkFolderContent"
          placeholder="Choose a folder..."
        >
      </b-form-file>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImportDatasetStep',
  props: {
    content: Object
  },
  created: function () {
  },
  methods: {
    checkFolderContent (pathInfo) {
      // TODO: send `pathInfo` to backend, and set the status of
      // `b-form-file` as valid or invalid by the returned response.
      let targetPath = `${pathInfo.path}/label_mapping.csv`
    }
  },
  data () {
    return {
      selectedFolder: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.step-content {
  color: black;
  padding: 20px;
}
.text-content {
  text-align: left;
}
.description {
  text-align: left;
}
</style>
