1. 將 `SideBarMenuRight/LabelPanel.vue` 這個元件的 `<h3>Labels</h3>` 改成 dropdown list, 讓這個 dropdown list 有類似 `EvaluationPanel` 裡面用來選擇 model 的那個 dropdown list 的功能. 

2. 使用者可以點選這個 dropdown list 來選擇要使用哪一次 model 跑完 validation 的結果. 這個結果會存在那個 model 資料夾底下的 `validation_all/validation_output.json`. 
而這個 json 的內容其實就和 `TrainingPanel/StepContent/PredictOnDatasetStep.vue`#L78 呼叫的 `validationService.getValidationOutput(projectInfo).then((result) => { //... })` 的 `result` 一樣. 

3. 將上述的 `validation_output.json` 讀進來後, 再利用以下的 code 把當時對 dataset 預測的結果存到 `Testing/predictedLabels` 這個 state 
``` 
// PredictOnDatasetStep.vue#L79-82 
let taskType = this.$store.getters['Project/taskType'] 
let labelConverter = new converterDict[taskType](result.prediction, result.labels.map(String)) 
let predictedLabels = labelConverter.convertAll() 
this.$store.dispatch('Testing/setPredictedLabels', predictedLabels) 
``` 

4. 不過這邊可能會遇到 async 操作的問題, 因為目前在讀取 `Testing/predictedLabels` 這個 state 的時機是在使用者一進入 `ViewerOverviewPanel` 時就開始處理, 所以可能要想法辦重新觸發那個處理動作, 或是想其他的方式來讓 UI 拿到新的資料 (可能可以用 refesh?) 
這部分的處理需要看一下 `ViewerOverviewPanel.vue`#L53-67