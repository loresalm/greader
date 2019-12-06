

const EXAM_DATA= {
    block: '',
    coeff: '',
    name: '',
    midterm: [],

    addMd: function(md, pe){
        this.midterm.push([md, pe, 4])
    }
}
function calculateGrade(mid){
    var noteEx= 0
    for(var i= 0; i < mid.length; i++){
        noteEx+= (mid[i][1]/100)*mid[i][2]
    }

    // approssimare note giusto (0.25)
    return noteEx
}

function calculateGradeBlock(exm){
    var noteBl= 0
    var sumCo = 0
    for(var i= 0; i < exm.length; i++){
        noteBl+= exm[i][0]*exm[i][1]
        sumCo += exm[i][1]
    }
    noteBl = noteBl/sumCo
    return noteBl.toFixed(3)
}


const EXAM= {
    exams: [[],[],[],[],[]],
    blocks: [],
    addExam: function(){ 
            if (!(this.blocks.includes(EXAM_DATA.block))){
                if (this.blocks.length > 5) {
                false
                return
            } else {
                this.blocks.push(EXAM_DATA.block)
                this.blocks_grades.push(4)
                }
    
        } 
        this.exams[this.blocks.indexOf(EXAM_DATA.block)].push(Object.assign({}, EXAM_DATA))
        this.exams_grades[this.blocks.indexOf(EXAM_DATA.block)].push([calculateGrade(EXAM_DATA.midterm), Number(EXAM_DATA.coeff)])
        return true
    },
    exams_grades: [[],[],[],[],[]],
    updateGrade: function(pos1, pos2){
        this.exams_grades[pos1][pos2][0]= calculateGrade(this.exams[pos1][pos2].midterm)
        this.blocks_grades[pos1] = calculateGradeBlock(this.exams_grades[pos1])
    },

    blocks_grades: []


}





 




