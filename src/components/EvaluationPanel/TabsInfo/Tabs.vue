<template>
    <div class="container">
        <!-- Confusion Matrix 的 Modal -->
        <div>
            <b-modal hide-footer centered id="modal-lg" title="Confusion Matrix">
                <h1>
                    <ConfusionMatrix :data="selectedMatrixData" />
                </h1>
            </b-modal>
        </div>

        <!-- tabs 麵包屑 -->

        <div class="m-0 bg-white text-white ">
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

        <!-- <div class="row align-self-center">
            <div class="col-12 pl-1 pt-2">
                <ul class="pt-0 breadcrumb rounded text-black-50 m-0 p-3">
                    <li v-for="tab in tabs" :key="tab.id">
                        <a href="#" class="current" @click.prevent="changeView(tab)">{{ tab.name }}</a>
                    </li>
                </ul>
            </div>
        </div>-->

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
                <MetricsDisplay :metrics-data=" tab.metrics" class="col-12"></MetricsDisplay>
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

            <!-- relable 的按鈕  還沒建立 TODO:-->
            <b-button block pill size="sm" class="mt-4" variant="outline-dark">Relable</b-button>
        </Tab>
    </div>
</template>

<script>
// This is to test without link to autoDL
import localJson from "../deepra_mnistV2.json";

// import data
import { createData } from "@/components/EvaluationPanel/TabsInfo/Tab-data.js";

// import need modules
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
            tabs: null, // initialize as null to avoid rendering when component is just created
            views: [], // e.g. => [ 'class 0','class 1','class 2'...]
            currentView: "",
            newThreshold: 0
        };
    },
    created() {
        console.log("--- Tabs: fetching data from store ---");

        // load data
        // FIXME: brefore push to remote, REMEMBER switch to vueUtils.clone and comment out localJason
        let data = vueUtils.clone(this.$store.getters['Validation/validationOutput'])
        // let data = localJson;
        // console.log(data)

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
            fileFetcher.readJson(fn, true).then(result => {
                console.log("--- parsed json ---");
                console.log(result);
                parsed = result;

                let tabData = createData(parsed.labels, parsed.metrics);
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
            let tabData = createData(data.labels, data.metrics);
            this.tabs = tabData;
            this.$emit("model-data", {
                result: tabData
            });
            this.getView();
            this.currentView = this.views[0];
        }
    },
    mounted() {},
    computed: {
        selectedMatrixData() {
            // Check whether `this.views` is loaded or not. If not, skip this operation.
            if (this.views.length === 0) {
                return;
            }

            let currentTab = this.views.indexOf(this.currentView); // get the current view index
            return this.tabs[currentTab]["confusionMatrixInfo"];
        },
        activeClass() {
            if (this.currentView === "all class") {
                return "currentUsed";
            }
        }
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

.breadcrumbV2 {
    font-size: 24px;
}

ul.breadcrumb {
    padding: 6px 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border: 1px solid rgb(8, 8, 8);
    cursor: pointer;
    background: #696969;
    margin-bottom: -1px;
    margin-right: -1px;
    list-style: none;
    li {
        // display: inline;
        font-size: 18px;
        + li:before {
            padding: 15px;
            color: rgb(8, 8, 8);
            content: "   ";
        }
        a {
            font-size: 20px;
            // color:rgba(255, 255, 255, 0.5);
            color: #343a40;
            text-decoration: none;
            &:hover {
                // color: rgba(255, 255, 255, 0.75);
                color: #121416;
                text-decoration: none;
            }
            .current {
                background-color: #fff;
            }
        }
    }
}

// .active {
//     color: #0567c9;
//     text-decoration: none;
// }

table {
    font-family: "Open Sans", sans-serif;
    width: 750px;
    border-collapse: collapse;
    border: 3px solid #44475c;
    margin: 10px 10px 0 10px;
}

/* 設定內部框線 */
table,
th,
td {
    border: 1px solid #44475c;
}

table th {
    text-transform: uppercase;
    text-align: center;
    background: #44475c;
    color: #fff;
    /* cursor: pointer; */
    padding: 8px;
    min-width: 30px;
}

table th:first-child {
    /* color: #44475c; */
    background: #44475c;
}

/* table th:hover {
  background: #717699;
} */

/* 這裡需要先設定可能最大的row number, 如果實際資料大於這邊設定的最大值，就會無法呈現效果了 */
table tr:nth-child(1) td:first-child {
    text-transform: uppercase;
    font-weight: bold;
    color: #fff;
    background: #44475c;
}

table tr:nth-child(2) td:first-child {
    text-transform: uppercase;
    font-weight: bold;
    color: #fff;
    background: #44475c;
}
table tr:nth-child(3) td:first-child {
    text-transform: uppercase;
    font-weight: bold;
    color: #fff;
    background: #44475c;
}
table tr:nth-child(4) td:first-child {
    text-transform: uppercase;
    font-weight: bold;
    color: #fff;
    background: #44475c;
}
table tr:nth-child(5) td:first-child {
    text-transform: uppercase;
    font-weight: bold;
    color: #fff;
    background: #44475c;
}

table td {
    text-align: center;
    padding: 8px;
    border-right: 2px solid #7d82a8;
}
</style>
