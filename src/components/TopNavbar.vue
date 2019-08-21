<template>
  <div id="top-navbar" class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap">
    <div class="page-indicator-container">
      <router-link :to="{path: '/'}"  >
        <a @click="onClick" id="brand">{{ brandText }}</a>
      </router-link>
      <a id="page-indicator">{{ pageIndicatorDisplay }}</a>
      <a id="page-indicator">{{ showPojectName }}</a>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/event_bus.js";

export default {
  name: "TopNavbar",
  props: {
    brandText: String
  },
  created() {
    EventBus.$on("showProjectName", projectNameInfo => {
      let projectNameFormat = "";
      if (projectNameInfo === "notInsideProject") {
        projectNameFormat = "";
      } else {
        projectNameFormat = "> Project Name: " + projectNameInfo;
      }
      this.showPojectName = projectNameFormat;
    }),
      EventBus.$on("pageChanged", info => {
        if (typeof info === "string") {
          this.pageIndicatorInfo = {
            pages: info === "" ? [] : [info],
            keepRoot: false
          };
        } else {
          this.pageIndicatorInfo = info;
        }
      });
  },
  methods: {
    onClick() {
      EventBus.$emit('showProjectName', 'notInsideProject')
    }
  },
  computed: {
    pageIndicatorDisplay: function() {
      if (this.pageIndicatorInfo.pages.length === 0) {
        return "Welcome to DeepRA";
      } else {
        let indicator = [""];
        indicator.push(...this.pageIndicatorInfo.pages);
        // this.pageIndicator = this.pageIndicatorInfo.keepRoot ?
        //   this.pageIndicator + indicator.join(' > ') : indicator.join(' > ')
        return indicator.join("");
      }
    }
  },
  // showProjectName
  data() {
    return {
      showPojectName: "",
      pageIndicator: "",
      pageIndicatorInfo: {
        pages: [],
        keepRoot: true
      }
    };
  }
};
</script>

<style lang="scss" scoped>
$navbar-height: 56px;

#top-navbar {
  min-height: $navbar-height;
}
#brand {
  color: white;
  position: relative;
  width: 136px;
  left: 0px;
  margin: 20px;
  font-size: 18px;
}
#page-indicator {
  color: white;
  font: bold;
}
</style>
