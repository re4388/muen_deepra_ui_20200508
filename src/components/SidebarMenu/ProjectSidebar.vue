<template>
  <div id="project-sidebar">
    <sidebar-menu 
    :menu="menu" 
    :collapsed="collapsed" 
    :width="width" 
    :widthCollapsed="widthCollapsed" 
    :theme="theme" />
  </div>
</template>

<script>
  import {
    SidebarMenu
  } from 'vue-sidebar-menu'
  import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

  const separator = {
    template: `<hr style="border-color: rgba(255, 255, 255); margin: 10px;"/>`
  }

  export default {
    name: 'ProjectSidebar',
    components: {
      SidebarMenu
    },
    data() {
      return {
        menu: [
          {
            title: 'Profile',
            href: '/project-profile',
            icon: {
              element: 'font-awesome-icon',
              attributes: {
                icon: 'file-alt'
              }
            }
          },
          {
            title: 'Train',
            href: '/training',
            icon: {
              element: 'font-awesome-icon',
              attributes: {
                icon: 'spinner'
              }
            }
          },
          {
            title: 'Evaluation',
            href: '/evaluation',
            icon: {
              element: 'font-awesome-icon',
              attributes: {
                icon: 'chart-line'
              }
            }
          },
          {
            title: 'Viewer',
            href: '/viewer-overview',
            icon: {
              element: 'font-awesome-icon',
              attributes: {
                icon: 'x-ray'
              }
            }
          },
        ],
        collapsed: false,
        width: '150px',
        widthCollapsed: '50px',
        theme: 'default-theme'
      }
    },
    methods: {}
  }

</script>

<style lang="scss">
.v-sidebar-menu {
  height: inherit;
  position: relative;

  & .collapse-btn {
    content: '...';
    outline: 0;

    &:after {
      content: '...';
    }

    &:hover {
      background-color: rgb(60, 60, 60);
    }
  }

  & .vsm-title {
    text-align: left;
  }

  & .router-link-exact-active .vsm-title {
    color: #4285f4;
  }

  & .vsm-header {
    text-align: center;
  }

  & .vsm-icon {
    color: orange;
  }

  & .vsm-item.mobile-item>.vsm-link {
    color: orange;
  }
}
</style>
