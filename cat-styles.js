const CAT_STYLES = [
  {file:"cat-1.png",name:"黑白异色瞳",ratio:710/674,mouth:[.50,.32],paw:[.62,.91]},
  {file:"cat-2.png",name:"歪头奶油猫",ratio:520/626,mouth:[.48,.42],paw:[.58,.93]},
  {file:"cat-3.png",name:"坐姿花猫",ratio:502/726,mouth:[.49,.28],paw:[.42,.79]},
  {file:"cat-4.png",name:"趴趴虎斑",ratio:766/532,mouth:[.72,.36],paw:[.67,.82]},
  {file:"cat-5.png",name:"大笑长毛猫",ratio:666/674,mouth:[.52,.25],paw:[.67,.82]},
  {file:"cat-6.png",name:"金色虎斑",ratio:550/640,mouth:[.50,.40],paw:[.52,.88]},
  {file:"cat-7.png",name:"棕色眼镜猫",ratio:638/604,mouth:[.43,.34],paw:[.46,.90]},
  {file:"cat-8.png",name:"蓬蓬灰猫",ratio:518/650,mouth:[.50,.36],paw:[.52,.92]}
];
const catSwatches = document.querySelector("#catSwatches");
const catStyleName = document.querySelector("#catStyleName");
const catCutout = document.querySelector(".cat-cutout");
const savedCatStyle = Number(localStorage.getItem("cat-style-index") || 0);

CAT_STYLES.forEach(({file, name}, index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "cat-swatch";
  button.title = name;
  button.setAttribute("aria-label", `选择${name}`);
  button.dataset.index = index;
  const image = document.createElement("img");
  image.src = `cats/${file}`;
  image.alt = "";
  button.append(image);
  button.addEventListener("click", () => selectCat(index));
  catSwatches.append(button);
});

function selectCat(index) {
  const {file, name} = CAT_STYLES[index];
  catCutout.style.backgroundImage = `url("cats/${file}")`;
  catStyleName.textContent = name;
  document.querySelectorAll(".cat-swatch").forEach(button => {
    button.classList.toggle("selected", Number(button.dataset.index) === index);
  });
  localStorage.setItem("cat-style-index", index);
  window.currentCatStyle = index;
}

window.getCurrentCatAnchor = kind => {
  const style = CAT_STYLES[window.currentCatStyle || 0];
  const point = style[kind];
  const cat = document.querySelector("#cat").getBoundingClientRect();
  const stage = document.querySelector("#stage").getBoundingClientRect();
  const boxRatio = cat.width / cat.height;
  const imageWidth = style.ratio > boxRatio ? cat.width : cat.height * style.ratio;
  const imageHeight = style.ratio > boxRatio ? cat.width / style.ratio : cat.height;
  const imageLeft = cat.left - stage.left + (cat.width - imageWidth) / 2;
  const imageTop = cat.top - stage.top + cat.height - imageHeight;
  return {x: imageLeft + imageWidth * point[0], y: imageTop + imageHeight * point[1]};
};

selectCat(Number.isInteger(savedCatStyle) && savedCatStyle < CAT_STYLES.length ? savedCatStyle : 0);
