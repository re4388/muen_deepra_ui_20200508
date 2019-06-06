<template>
  <div id="sidebar">
    <sidebar-menu
      :menu="menu"
      :collapsed="collapsed"
      :width="width"
      :widthCollapsed="widthCollapsed"
      :theme="theme"
    />
  </div>
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const separator = {
  template: `<hr style="border-color: rgba(255, 255, 255); margin: 20px; height: 10px;">`
}

export default {
  name: 'Sidebar',
  components: {
    SidebarMenu,
    FontAwesomeIcon
  },
  data() {
    return {
      menu: [
        {
          title: 'My Projects',
          href: '#',
          icon: {
            element: 'font-awesome-icon',
            attributes: {
              icon: 'folder'
            }
          }
        },
        {
          title: 'My Models',
          href: '#',
          icon: {
            element: 'font-awesome-icon',
            attributes: {
              icon: 'cube',
            }
          }
        },
        {
          header: true,
          component: separator,
          visiableOnCollapse: true
        },
        {
          header: true,
          title: 'Tags'
        }
      ],
      collapsed: false,
      width: '150px',
      widthCollapsed: '50px',
      theme: 'default-theme'
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.v-sidebar-menu {
  height: inherit;
  position: relative;
  & .collapse-btn {
    content: '-';
    &:after {
      content: '-';
    }
  }
  & .vsm-title {
    text-align: left;
  }
  & .vsm-header {
    text-align: center;
  }
}
</style>
