<template>
    <div class="container">

 

        <!-- Confusion Matrix 的 Modal -->
        <div>
            <b-modal hide-footer centered id="modal-lg" title="Confusion Matrix">
                <h1>
                    <ConfusionMatrix :data="selectedMatrixData" :new-threshold="newThreshold" />
                </h1>
            </b-modal>
        </div>

        <div v-if="tabs === null">
            <!-- <b-alert show variant="light" class="mt-5">
                
            </b-alert>-->

            <b-alert show variant="dark">
                <a href="#" class="alert-link">
                    <router-link
                        to="/project-overview"
                    >Please open the existed project or train a project first</router-link>
                </a>
            </b-alert>
        </div>

        <!-- tabs 麵包屑 -->

        <div class="m-0 bg-white text-white">
            <b-tabs
                class="text-info"
                no-nav-style
                active-nav-item-class="font-weight-bold text-uppercase text-dark"
            >
                <b-tab
                    v-for="tab in tabs"
                    :key="tab.name"
                    :title="tab.name"
                    @click.prevent="changeView(tab)"
                ></b-tab>
            </b-tabs>
        </div>

        <!-- 每一個lable/Tab 的元件們 -->
        <Tab
            v-for="tab in tabs"
            :key="tab.id"
            :name="tab.name"
            :current-view="currentView"
            class="currentView container"
        >
            <!-- tab 標題 -->
            <div class="row" slot="title">
                <h5 class="col-12 text-center text-light m-0 mt-3">{{ tab.name | capitalize }}</h5>
            </div>

            <!-- MetricsDisplay -->
            <div class="row mt-3" slot="MetricsDisplay">
                <MetricsDisplay :metrics-data=" tab.metrics" class="col-12" />
            </div>

            <!-- GraphDisplay -->
            <GraphDisplay
                class="outterGrpah"
                slot="GraphDisplay"
                :graph-data="tab.grpah"
                :new-threshold="newThreshold"
            />

            <!-- ThresholdAdjustment -->
            <ThresholdAdjustment
                slot="ThresholdAdjustment"
                class="mt-3"
                :threshold-data="tab.threshold"
                :graph-data="tab.grpah"
                @threshold-change="ThresholdChange"
            ></ThresholdAdjustment>

            <!-- Confusion Matrix 的按鈕 -->
            <b-button
                block
                pill
                size="sm"
                class="mt-4"
                v-b-modal.modal-lg
                variant="outline-dark"
            >Confusion Matrix</b-button>

            <!-- relabel 的按鈕  還沒建立 TODO:-->
            <b-button block pill size="sm" class="mt-4" variant="outline-dark">Relabel</b-button>

            <!-- export files related to validation, maybe we should group this with `div` tag -->
            <b-button
                block pill
                size="sm"
                class="mt-4"
                variant="outline-dark"
                @click="$refs.exportFolderInput[0].click()">
                Export
            </b-button>
            <input
                id="exportFolderInput"
                type="file"
                ref="exportFolderInput"
                style="display:none;"
                webkitdirectory
                @change="onExport"
            />
        </Tab>
    </div>
</template>

<script>

/***** local Fake data to locally test *****/
// minist data 
import localJson from "../deepra_mnistV2.json";
// binary data
import localJson2 from "../binary_data.json";


// import data
import { generateModel } from "@/components/EvaluationPanel/TabsInfo/dataProcess.js";



// import utilties
import modPath from "path";
import modFs from "fs";
import fileFetcher from "@/utils/file_fetcher.js";
import vueUtils from "@/api/vue_utils.js";

// import components
import Tab from "./Tab";
import MetricsDisplay from "../InfoDisplay/MetricsDisplay";
import GraphDisplay from "../InfoDisplay/GraphDisplay";
import ThresholdAdjustment from "../InfoDisplay/ThresholdAdjustment";
import ConfusionMatrix from "../InfoDisplay/ConfusionMatrix";

import validationService from '@/api/validation_service.js'
import { mapGetters, mapActions } from "vuex"

export default {
    name: "Tabs",

    components: {
        Tab,
        MetricsDisplay,
        GraphDisplay,
        ThresholdAdjustment,
        ConfusionMatrix
    },

    data() {
        return {
            tabs: null,
            views: [], //  => [ 'class 0','class 1','class 2'...]
            currentView: "",
            newThreshold: 0
        };
    },

    created() {
        this.dataInit();
    },

    mounted() {},

    computed: {
        selectedMatrixData() {
            // views data is async, so need to skip operation when no views
            if (this.views.length === 0) {
                return;
            }
            // get the current view index
            let currentTab = this.views.indexOf(this.currentView);
            return this.tabs[currentTab]["confusionMatrixInfo"];
        },
        activeClass() {
            if (this.currentView === "all class") {
                return "currentUsed";
            }
        },
        ...mapGetters('Validation', {
            exportLocation: 'outputLocation'
        })
    },

    methods: {
        // get all tabs
        getView() {
            this.views = this.tabs.map(key => {
                return key.name;
            });
        },

        changeView(tab) {
            this.currentView = tab.name;
        },

        ThresholdChange(obj) {
            this.newThreshold = obj.result;
        },

        dataInit() {
            console.log("--- Tabs: fetching data from store ---");

            // FIXME: brefore push to remote, REMEMBER switch to vueUtils.clone and comment out localJason
            let data = vueUtils.clone(this.$store.getters['Validation/validationOutput'])
            // let data = localJson;
            // let data = localJson2;

            // if no training data, get data from current project
            if (data.content === null) {
                let projectInfo = this.$store.getters["Project/currentProject"];
                console.log(
                    "--- no parsed validation output, try to retrieve data from cached folder ---"
                );
                let cachedDir = modPath.join(
                    projectInfo.location,
                    "deepra_output",
                    ".cached"
                );
                let fn = modPath.join(cachedDir, "validation_output.json");
                let parsed = null;
                fileFetcher.readJson(fn, false).then(result => {
                    console.log("--- parsed json ---");
                    console.log(result);
                    parsed = result;

                    let tabData = generateModel(parsed.labels, parsed.metrics);

                    console.log("--- parsed tabData ---");
                    console.log(tabData);
                    this.tabs = tabData;
                    this.$emit("model-data", {
                        result: tabData
                    });
                    this.getView();
                    this.currentView = this.views[0];
                });
            } else {

                let tabData = generateModel(data.labels, data.metrics)
                console.log(tabData)

                this.tabs = tabData;
                this.$emit("model-data", {
                    result: tabData
                });
                this.getView();
                this.currentView = this.views[0];
            }
        },

        ...mapActions('Validation', {
            setExportLocation: 'setOutputLocation'
        }),

        onExport (evnt) {
            let projectInfo = this.$store.getters["Project/currentProject"]
            let outputLocation = evnt.target.files[0].path
            if (outputLocation === undefined) return
            validationService.exportFiles(projectInfo, outputLocation).then((result) => {
                console.log(result)
            })
        }
    },

    filters: {
        capitalize: function(value) {
            if (!value) return "";
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    }
};
</script>



<style lang="scss" scoped>
.outterGrpah {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-self: center;
    height: 500px;
    width: 600px;
}
#modal {
    position: absolute;
    left: calc(20% - 50px);
    top: calc(30% - 50px);
    z-index: 2;
}
#btn-export-files {
    // visibility: hidden;
    display: none;
}
</style>
