<template>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="myLargeModalLabel">Confusion Matrix</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" @click="closeModal">×</span>
        </button>
      </div>
      <div class="modal-body">


        
        <table>
          <thead>
            <tr>
              <th v-for="category in categories" :key="category.id">{{category}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.id">
              <td
                v-for=" item in row"
                :key="item.id"
                
                :title="item.annotation"
                v-tippy="{ 
                          arrow: true, 
                          animation : 'fade', 
                          interactive : true,
                          }"
              >
                {{ item.data }}
                <!-- <br>
                {{ item.annotation | withAnnotation }}-->
              </td>
            </tr>
          </tbody>
        </table>




      </div>
    </div>


  </div>
</template>


<script>
import { confusion_matrix, confusion_matrix_caterogies } from "./data4";

export default {
  name: "ConfusionMatrix",
  data() {
    return {
      message: 'QQ',
      rows: confusion_matrix,
      categories: confusion_matrix_caterogies
    };
  },
  methods: {
    closeModal() {
      this.$emit("close-event");
    },
  },
  mounted() {
    // console.log(this.categories);
  },
  // filters: {
  //   withAnnotation(val) {
  //     if (val === "no file") {
  //       return;
  //     } else {
  //       return val;
  //     }
  //   }
  // }
};


</script>


<style scoped>
.container {
  padding: 30px;
  display: flex;
  justify-content: center;
}

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


