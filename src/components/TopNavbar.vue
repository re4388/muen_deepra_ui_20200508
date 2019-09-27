<template>
  <div id="top-navbar" class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap">
    <div class="draggable-region">
      <div class="page-indicator-container">
        <router-link :to="{path: '/'}"  >
          <a @click="onClick" id="brand">{{ brandText }}</a>
        </router-link>
        <a id="page-indicator">{{ pageIndicatorDisplay }}</a>
        <a id="page-indicator">{{ showPojectName }}</a>
      </div>
    </div>
    <div class="control-minimize control-button" @click="minimizeApp">
      <img class="control-icon" src="../assets/titlebar_minimize.png">
    </div>
    <div class="control-maximize control-button" @click="maximizeApp">
      <img class="control-icon" src="../assets/titlebar_maximize.png">
    </div>
    <div class="control-close control-button" @click="closeApp">
      <img class="control-icon" src="../assets/titlebar_close.png">
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
    },
    minimizeApp () {
      const { remote } = require('electron')
      remote.BrowserWindow.getFocusedWindow().minimize()
    },
    maximizeApp () {
      const { remote, BrowserWindow } = require('electron')
      if (remote.BrowserWindow.getFocusedWindow().isMaximized()) {
        remote.BrowserWindow.getFocusedWindow().unmaximize()
      } else {
        remote.BrowserWindow.getFocusedWindow().maximize()
      }
    },
    closeApp () {
      const { remote } = require('electron')
      remote.BrowserWindow.getFocusedWindow().close()
    }
  },
  computed: {
    pageIndicatorDisplay: function() {
      if (this.pageIndicatorInfo.pages.length === 0) {
        return "Welcome to MAIA"
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
      },
      isMaximized: true,
    };
  }
};
</script>

<style lang="scss" scoped>
$navbar-height: 56px;
$resizable-border: 2px;

#top-navbar {
  min-height: $navbar-height;
  padding: $resizable-border;
}
.draggable-region {
  height: $navbar-height - 2*$resizable-border;
  width: 100%;
  -webkit-app-region: drag;
}
#brand {
  color: white;
  position: relative;
  width: 136px;
  left: 10px;
  margin: 20px;
  font-size: 18px;
}
.page-indicator-container {
  position: relative;
  float: left;
  height: 100%;
  text-align: center;
  line-height: $navbar-height;
  left: 0px;
  -webkit-app-region: no-drag;
}
#page-indicator {
  color: white;
  font: bold;
  padding: 10px;
}
.control-button {
  height: $navbar-height;
  margin: auto;
  align-content: center;
}
.control-icon {
  width: 32px;
  padding: 10px;
  &:hover {
    background-color: rgb(175, 175, 175);
  }
}
</style>
