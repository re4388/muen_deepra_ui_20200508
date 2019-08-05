


//說明
// 前兩個class沒有自己的method, 然後彙整，呼叫http的class, 再利用條件式看是哪一種class, 再去呼叫分別的函數，另外函數也是寫在外面

class Data1 {
    constructor(d1) {
        this.d1 = d1
    }
}

let d1 = new Data1('this is from data1')


class Data2 {
    constructor(d1) {
        this.d1 = d1
    }
}

let d2 = new Data2('this is from data2')



class metaData {
    constructor(data) {
        this.data = data
    }
    dataTalk(){
        // console.log(this.data)
        if (this.data.d1 === "this is from data1") {
            return data1Take()
        } else {
            return data2Take()
        }
    }    
}


let data1Take = () => {
    return 'this is from data1'
}

let data2Take = () => {
    return 'this is from data2'
}

let m1 = new metaData(d1)
console.log(m1.dataTalk())

let m2 = new metaData(d2)
console.log(m2.dataTalk())





// 說明
// 前兩個class有自己的method邏輯，都要寫好，最後一個呼叫http的class, 透過建構式引入兩個class, 然後再用一個method去呼叫他們兩個class分別需要的class

// class Data1 {
//     constructor(d1) {
//         this.d1 = d1
//     }
//     letDataTake() {
//         return this.d1
//     }
// }

// let d1= new Data1('this is from data1')


// class Data2 {
//     constructor(d1) {
//         this.d1 = d1
//     }
//     letDataTake() {
//         return this.d1
//     }
// }

// let d2 = new Data2('this is from data2')



// class metaData {
//     constructor (data) {
//         this.data = data
//     }

//     dataTalk(){
//         return this.data.letDataTake()
//     }
// }

// let m1 = new metaData(d1)
// console.log(m1.dataTalk())

// let m2 = new metaData(d2)
// console.log(m2.dataTalk())

