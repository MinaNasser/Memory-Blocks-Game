 document.querySelector(".control-buttons span").onclick=function(){
    let yourName=prompt("what is your name?");
   if(yourName==null||yourName==""){
        document.querySelector(".name span").innerHTML="Unknown";
    }else{
        document.querySelector(".name span").innerHTML=yourName;
    }
    document.querySelector(".control-buttons").remove();  
 }
 let duration=1000;
 let blocksContainer=document.querySelector(".memory-game-blocks");
 let blocks=Array.from(blocksContainer.children);
//  let order=Array.from(Array(blocks.length).keys());
 let orderRange=[...Array(blocks.length).keys()];
 
 shuffle(orderRange);

 function shuffle(array){
    let current =array.length;
    let temp;
    let random;
    while(current>0){
        random = Math.floor(Math.random()*current);
        current--;
        temp=array[current];
        array[current]=array[random];
        array[random]=temp;
    }

    return array;

 }
function flipBlock(selectBlock){
    selectBlock.classList.add("is-flipped");
    let allFilipped=blocks.filter((flippedBlock)=>flippedBlock.classList.contains("is-flipped"));
    if(allFilipped.length===2){
        stopClicking();
        checkMatchedBlocks(allFilipped[0],allFilipped[1]);
    }
}
blocks.forEach((block,index)=>{
    block.style.order=orderRange[index];
    block.addEventListener("click",function(){
        flipBlock(block);
        if(firstBlock==null){
            firstBlock=block;
        }else{
            secondBlock=block;
            checkMatchedBlocks(firstBlock,secondBlock);
        }
    })
});

function stopClicking(){
    blocksContainer.classList.add("no-clicking");
    setTimeout(()=>{
        blocksContainer.classList.remove("no-clicking");
    },duration);
}
function checkMatchedBlocks(firstBlock,secondBlock)
{
    let triesElement=document.querySelector(".tries span");
    if(firstBlock.dataset.technology===secondBlock.dataset.technology){
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
        document.getElementById("success").play();
        

    }
    else{
        triesElement.innerHTML=parseInt(triesElement.innerHTML)+1;
        
        setTimeout(()=>{
            firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        },duration);
        document.getElementById("fail").play();

    }
} 

