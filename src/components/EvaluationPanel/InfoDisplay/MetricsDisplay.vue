<template>
    <div class="px-2">
        <table class="table table-bordered table-sm mb-1">
            <thead class="thead-dark">
                <tr>
                    <th>{{Sensitivity}}</th>
                    <th>{{specificity }}</th>
                    <th>{{precision }}</th>
                    <th>{{f1Score }}</th>
                    <th>{{auc }}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td
                        class="td text-light"
                        v-for="(value, key) in metricsData"
                        :key="key"
                    >{{ value | numberFormater }}</td>
                </tr>
            </tbody>
        </table>
        <p class="table-anotation text-left">{{ anotationText }}</p>
    </div>
</template>

<script>
export default {
    name: "MetricDisplay",
    props: {
        metricsData: {
            type: Object
        },
        currentTab: {
            type: String
        },
        graphData:{
            type: Object
        },
    },
    // test what props passed in
    // mounted(){
    //     console.log(this.graphData.modelType)
    // },
    data() {
        return {
            anotationText: `
                We use test dataset to evaluate the model.
                This table shows sensitivity ,specificity, precision, F1 score, AUC. F1
                score : 2 * Precision * Sensitivity / (Precision Sensitivity). AUC: Area under ROC curve
                `,
        };
    },
    methods:{
        isMultiTypeandAllClass(){
            return this.currentTab ==='all class' && this.graphData.modelType ==="multiType"
        }
    },
    computed:{
        Sensitivity(){
            return this.isMultiTypeandAllClass()?
            'Macro Sensitivity':
            'Sensitivity'
        },
        specificity(){
            return this.isMultiTypeandAllClass()?
            'Macro Specificity':
            'Specificity'
        },
        precision(){
            return this.isMultiTypeandAllClass()?
            'Macro Precision':
            'Precision'
        },
        f1Score(){
            return this.isMultiTypeandAllClass()?
            'Macro F1 Score':
            'F1 Score'
        },
        auc(){
            return this.isMultiTypeandAllClass()?
            'Weighted AUC':
            'AUC'
        }  
    },
    filters: {
        numberFormater(val) {
            // console.log(val)
            if(val=== -1){
                return "NAN"
            }
            if(val=== 'not available yet'){
                return "NAN"
            }
            return parseFloat(val).toFixed(4)
        }
    }
};
</script>

<style scoped>
.table-anotation {
    font-size: 14px;
}
</style>
