<template>
    <div class="container-fluid">
        <!-- 標題 -->
        <header class="row">
            <div class="col-12">
                <h2 class="text-light bg-color rounded-pill border p-2 m-3">{{ title }}</h2>
                <div id="page-content" class="text-light text-left">
                    The Model evaluation report is created at {{ createTime }}.
                    In this analysis, we analyzed {{ imageNumber }} image.
                    These images were go in {{ folderNumber }} folds
                    for training dataset and validation dataset.
                    It takes {{ trainingTime}} for training .
                    The prediction performance of model are shown in following table.
                </div>
            </div>
        </header>
        <!-- 主要內容 -->
        <main class="row">
            <Tabs class="col-12" @model-data="modelInfo"></Tabs>
        </main>
        <!-- footer -->
        <footer class="row">
            <div class="col-12 text-center text-muted py-4">copyright @muenai</div>
        </footer>
    </div>
</template>

<script>
import Tabs from "./TabsInfo/Tabs.vue";
import { EventBus } from "@/event_bus.js"

export default {
    name: "EvaluationPanel",
    components: {
        Tabs
    },
    data() {
        return {
            title: "First Image Dataset Model 1",
            // TODO: need to link to backend
            createTime: "**not available**",
            trainingTime: "**not available**",
            modelData: null
        };
    },
    methods: {
        modelInfo(obj) {
            this.modelData = obj.result;
            console.log("eva", this.modelData);
        }
    },
    mounted() {
        EventBus.$emit('pageChanged',this.$route.meta.title)
    },
    computed: {
        imageNumber() {
            if (this.modelData === null) {
                return;
            }
            return this.modelData[0]["graph"]["image"];
        },
        // here I proxy number of class as number of folders
        folderNumber() {
            if (this.modelData === null) {
                return;
            }
            if( this.modelData.length - 1 === 0 ){
                return 1
            }
            return this.modelData.length - 1;
        }
    }
};
</script>

<style lang="scss" scoped>
.container-fluid {
    // min-height: 100%;
    background-color: #808080;
    overflow-y: scroll;
}

.container {
    // list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>

