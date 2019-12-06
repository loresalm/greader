
var BackgroundDiv= document.createElement("Div")
BackgroundDiv.setAttribute("id", "background-div");
document.body.appendChild(BackgroundDiv)


var TitleDiv= document.createElement("Div")
TitleDiv.setAttribute("id", "title-div");
var tl = document.createElement("span")
tl.textContent = " Are You Gonna' Pass? "

TitleDiv.appendChild(tl)
BackgroundDiv.appendChild(TitleDiv)

var PutDataDiv= document.createElement("Div")
PutDataDiv.setAttribute("id", "put-data-div");
BackgroundDiv.appendChild(PutDataDiv)

var putPtl= document.createElement("Div")
var tlPutData = document.createElement("span")
tlPutData.textContent = "Add Subject:"
putPtl.appendChild(tlPutData)
PutDataDiv.appendChild(putPtl)


function inpt(name, pholder, parent, type){
    var inptT = document.createElement("INPUT");
    inptT.setAttribute("name",name);
    inptT.setAttribute("type", type);
    inptT.setAttribute("placeholder", pholder);
    parent.appendChild(inptT)
    return inptT
}

var ExamNameImp= inpt("examNameImp", "Exam Name", PutDataDiv, "text")
var BlockImp= inpt("blockImp", "Block", PutDataDiv, "text")
var CoefImp= inpt("coefImp", "Coeff", PutDataDiv, "number")
var NbMidImp= inpt("nbMidImp", "Nb Midterm", PutDataDiv, "number")
NbMidImp.setAttribute("onclick", "createMidChoose()")

var ChooseMidDiv= document.createElement("Div")
PutDataDiv.appendChild(ChooseMidDiv)

var checkPerc = 0
function createMidChoose() {
    if(ChooseMidDiv != null){
        ChooseMidDiv.remove()
        EXAM_DATA.midterm = []
        checkPerc = 0
    }
    ChooseMidDiv = document.createElement("Div")

    if(NbMidImp.value > 6){
        alert("Too many midterm...")
        return
    }
    for(var i = 0; i <NbMidImp.value; i++){
        var nameMid= inpt("nameMid"+ i, "NameMid",  ChooseMidDiv,"text")
        var percMid= inpt("midPer"+ i, "%", ChooseMidDiv,"number")
        percMid.style.width= "30px";  
    }
    PutDataDiv.appendChild(ChooseMidDiv)

}
var AddButtonDiv = document.createElement("Div")
AddButtonDiv.setAttribute("id", "add-button-div");
var btnAddSubj = inpt("btnAddSubjImp", "", AddButtonDiv, "button")
btnAddSubj.setAttribute("value", "ADD")
btnAddSubj.setAttribute("onclick", "addSubject()")
BackgroundDiv.appendChild(AddButtonDiv)

BackgroundDiv
var checkNbblock= 0
function addSubject(){

    if(!(isNaN(BlockImp.value))){
        alert("put block name...")
        return
    }
 
    if(!(CoefImp.value > 0)){
        alert("put positive coeff...")
        return
    }
    if(!(NbMidImp.value > 0)){
        alert("put positive number mid...")
        return
    }

    for(var i = 0; i <NbMidImp.value; i++){
        EXAM_DATA.addMd(document.querySelector('input[name=nameMid'+i+']').value, Number(document.querySelector('input[name=midPer'+i+']').value))
        checkPerc+= EXAM_DATA.midterm[i][1]

    }
    if(!(checkPerc == 100)){
        alert("put right %...")
        checkPerc = 0
        EXAM_DATA.midterm = []
        return
    }

    EXAM_DATA.name = ExamNameImp.value
    EXAM_DATA.block = BlockImp.value
    console.log(CoefImp.value)
    EXAM_DATA.coeff = CoefImp.value



    if(!(EXAM.addExam(EXAM_DATA.block))){
        alert("too many blocks...")
        checkPerc = 0
        EXAM_DATA.midterm = []
        return
    }

    updateDisplayBlock()

    checkPerc = 0
    EXAM_DATA.midterm = []
    EXAM_DATA.name = ''
    EXAM_DATA.block = ''
    EXAM_DATA.coeff = ''


}

BackgroundDiv.appendChild(document.createElement("P"))
var DisplayBlockDiv= document.createElement("Div")
DisplayBlockDiv.setAttribute("id", "display-block-div");
BackgroundDiv.appendChild(DisplayBlockDiv)

var BlockTitleDiv= document.createElement("Div")
BlockTitleDiv.setAttribute("id", "block-title-div");
var tlBlk = document.createElement("span")
tlBlk.textContent = "Here Are Your Year Notes..."
BlockTitleDiv.appendChild(tlBlk)
DisplayBlockDiv.appendChild(BlockTitleDiv)


function updateDisplayBlock(){

    DisplayBlockDiv.remove()
    DisplayBlockDiv= document.createElement("Div")
    DisplayBlockDiv.setAttribute("id", "display-block-div");
    BackgroundDiv.appendChild(DisplayBlockDiv)

    var BlockTitleDiv= document.createElement("Div")
    BlockTitleDiv.setAttribute("id", "block-title-div");
    var tlBlk = document.createElement("span")
    tlBlk.textContent = "Here Are Your Year Notes..."
    BlockTitleDiv.appendChild(tlBlk)
    DisplayBlockDiv.appendChild(BlockTitleDiv)

    
    for(var i = 0; i< EXAM.blocks.length; i++){


        var blk= document.createElement("Div")
        blk.setAttribute("class", "blk-class");
        DisplayBlockDiv.appendChild(blk)
        var titleBlkP= document.createElement("P")
        titleBlkP.innerHTML= EXAM.blocks[i]+ " mean ["+EXAM.blocks_grades[i]+"]"
        blk.appendChild(titleBlkP)
        blk.appendChild(document.createElement("P"))
    

        var boxIndex= EXAM.blocks.indexOf(EXAM.blocks[i])
        for(var j = 0; j< EXAM.exams[boxIndex].length; j++){
            
            var exmDiv= document.createElement("Div")
            exmDiv.setAttribute("class", "exm-class");
            blk.appendChild(exmDiv)

            var titleExmP = document.createElement("P")
            titleExmP.innerHTML= EXAM.exams[boxIndex][j].name +" grade ["+EXAM.exams_grades[boxIndex][j]+"]"
            exmDiv.appendChild(titleExmP)

            for(var x = 0; x < EXAM.exams[boxIndex][j].midterm.length; x++){
                createChangeGrade(exmDiv, EXAM.exams[boxIndex][j].midterm[x], i, j, x)
            }
        } 
    }
}



function createChangeGrade(exmDiv, nameMidPerNt, pos1, pos2, pos3){
    var titleMidP = document.createElement("P")
    titleMidP.innerHTML= nameMidPerNt[0] + " " 
    exmDiv.appendChild(titleMidP)
    
    var noteMidS = document.createElement("span")
    noteMidS.innerHTML= nameMidPerNt[2]
    exmDiv.appendChild(noteMidS)

    var btnPNote = inpt("btnNote", "", exmDiv, "button")
    btnPNote.setAttribute("value", "+")
    btnPNote.setAttribute("onclick", "onClick("+ 0.25 + "," + pos1+ "," + pos2+ "," +pos3+ ")")
    var btnMNote = inpt("btnNote", "", exmDiv, "button")
    btnMNote.setAttribute("value", "-")
    btnMNote.setAttribute("onclick", "onClick("+ (-0.25) + "," + pos1+ "," + pos2+ "," +pos3+ ")")

}



function onClick(dir, pos1, pos2, pos3){
    if(dir>0 && EXAM.exams[pos1][pos2].midterm[pos3][2] < 6){
        EXAM.exams[pos1][pos2].midterm[pos3][2]+= dir 
        EXAM.updateGrade(pos1, pos2)
        updateDisplayBlock()
        return
    }
    if(dir<0 && EXAM.exams[pos1][pos2].midterm[pos3][2] > 1){
        EXAM.exams[pos1][pos2].midterm[pos3][2]+= dir 
        EXAM.updateGrade(pos1, pos2)
        updateDisplayBlock()
        return
    }
    
    
}