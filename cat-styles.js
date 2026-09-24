const CAT_STYLES = [
  {file:"cat-1.png",name:"黑白异色瞳",personality:"detective",ratio:710/674,mouth:[.6580103402,.3433599020],paw:[.62,.91]},
  {file:"cat-2.png",name:"歪头奶油猫",personality:"confused",ratio:520/626,mouth:[.5405498111,.4330101043],paw:[.58,.93]},
  {file:"cat-3.png",name:"坐姿花猫",personality:"elegant",ratio:502/726,mouth:[.3885506821,.3854839541],paw:[.42,.79]},
  {file:"cat-4.png",name:"趴趴虎斑",personality:"lazy",ratio:766/532,mouth:[.7001886864,.4881240868],paw:[.67,.82]},
  {file:"cat-5.png",name:"大笑长毛猫",personality:"silly",ratio:666/674,mouth:[.6058390794,.2061651803],paw:[.67,.86]},
  {file:"cat-6.png",name:"金色虎斑",personality:"royal",ratio:550/640,mouth:[.50,.38],paw:[.52,.88]},
  {file:"cat-7.png",name:"棕色眼镜猫",personality:"scientist",ratio:638/604,mouth:[.3361204067,.4034320265],paw:[.46,.90]},
  {file:"cat-8.png",name:"蓬蓬灰猫",personality:"fluffy",ratio:518/650,mouth:[.4661695010,.3249105348],paw:[.52,.92]}
];
const catSwatches=document.querySelector("#catSwatches"),catStyleName=document.querySelector("#catStyleName"),catCutout=document.querySelector(".cat-cutout");
const savedCatStyle=Number(localStorage.getItem("cat-style-index")||0);

CAT_STYLES.forEach(({file,name},index)=>{const button=document.createElement("button");button.type="button";button.className="cat-swatch";button.title=name;button.setAttribute("aria-label",`选择${name}`);button.dataset.index=index;const image=document.createElement("img");image.src=`cats/${file}`;image.alt="";button.append(image);button.addEventListener("click",()=>selectCat(index));catSwatches.append(button);});
function selectCat(index){const{file,name,personality}=CAT_STYLES[index];catCutout.style.backgroundImage=`url("cats/${file}")`;catStyleName.textContent=name;document.querySelectorAll(".cat-swatch").forEach(button=>button.classList.toggle("selected",Number(button.dataset.index)===index));localStorage.setItem("cat-style-index",index);window.currentCatStyle=index;document.querySelector("#cat").dataset.personality=personality;document.querySelector("#cat").className="cat";}
function renderedImageBox(){const style=CAT_STYLES[window.currentCatStyle||0],cat=document.querySelector("#cat").getBoundingClientRect(),stage=document.querySelector("#stage").getBoundingClientRect(),boxRatio=cat.width/cat.height,width=style.ratio>boxRatio?cat.width:cat.height*style.ratio,height=style.ratio>boxRatio?cat.width/style.ratio:cat.height;return{left:cat.left-stage.left+(cat.width-width)/2,top:cat.top-stage.top+cat.height-height,width,height,stage};}
function currentMouthPoint(){const index=window.currentCatStyle||0;return CAT_STYLES[index].mouth;}
window.getCurrentCatAnchor=kind=>{const style=CAT_STYLES[window.currentCatStyle||0],point=kind==="mouth"?currentMouthPoint():style[kind],box=renderedImageBox();return{x:box.left+box.width*point[0],y:box.top+box.height*point[1]};};
selectCat(Number.isInteger(savedCatStyle)&&savedCatStyle<CAT_STYLES.length?savedCatStyle:0);
