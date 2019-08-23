<template>
    <!-- 上層有loop thru每一個tab的name, 又<a>會觸發currentTab -->
    <div v-if="name === currentTab" class="tab">
        <slot name="title"></slot>
        <slot name="MetricsDisplay"></slot>

        <div class="container">
            <div class="row innerGrpah">
                <div :class="[activeClass]">
                    <slot name="GraphDisplay"></slot>
                </div>

                <div class="col-sm-auto threshold" v-if="currentTab !== 'all class'">
                    <slot name="ThresholdAdjustment"></slot>
                </div>
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Tab",
    props: {
        name: {
            type: String
        },
        currentTab: {
            type: String
        }
    },
    data() {
        return {};
    },
    computed: {
        activeClass() {
            if (this.currentTab === "all class") {
                return "col-sm-12";
            } else {
                return "col-sm-8";
            }
        }
    }
};
</script>

<style scoped>
.innerGrpah {
    align-self: center;
    /* height: 1000px;
  width: 1000px; */
}

.threshold {
    max-width: 250px;
}
</style>
