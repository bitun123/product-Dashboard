let allElems=document.querySelectorAll('.elem');
 let allFullElems = document.querySelectorAll('.fullElems')
 let allFullElemBackbtn = document.querySelectorAll('.back')
allElems.forEach((elem)=>{
elem.addEventListener("click",()=>{
allFullElems[elem.id].style.display = 'block'
})
})

allFullElemBackbtn.forEach((back)=>{
back.addEventListener("click",()=>{
    
})
})