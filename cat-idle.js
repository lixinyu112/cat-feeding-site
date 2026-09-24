const idleCat = document.querySelector("#cat");
const idleSpeech = document.querySelector("#speech");
let idleTimer;
let idleEndTimer;
let idleActive = false;

const idleStates = [
  {className: "idle-yawn", lines: ["猫打了个哈欠：刚才谁在说话？", "哈——欠。猫的嘴巴先下班五秒。"]},
  {className: "idle-stretch", lines: ["猫伸了个懒腰，骨头发出小小的喵声。", "伸展完毕，猫的长度增加了两厘米。"]},
  {className: "idle-look", lines: ["猫突然看向角落：那里刚刚是不是有东西？", "猫盯着空气，空气先投降了。"]},
  {className: "idle-groom", lines: ["猫认真整理了一根胡须。只整理一根。", "猫开始梳毛，今天也要蓬松得很有秩序。"]},
  {className: "idle-daydream", lines: ["猫发呆中……脑内正在播放小鱼干。", "猫暂时离开房间，去了一个全是纸箱的地方。"]},
  {className: "idle-tail", lines: ["猫的尾巴自己晃了起来，猫本人表示不知情。", "尾巴发来一条消息：喵。"]},
  {className: "idle-sit", lines: ["猫端坐三秒，决定什么也不解释。", "猫突然变得很端庄，但只坚持了一会儿。"]}
];
const personalityIdle = {
  detective: {className: "idle-investigate", lines: ["猫正在审问角落里的灰尘。", "侦探猫发现了一个可疑的空气泡泡。"]},
  confused: {className: "idle-confused", lines: ["猫忘了自己刚才想做什么。", "猫歪着头，等一个并不存在的答案。"]},
  lazy: {className: "idle-lazy", lines: ["猫决定今天只移动一根胡须。", "躺着就是虎斑猫的最高效率。"]},
  silly: {className: "idle-silly", lines: ["猫突然笑场，自己也不知道为什么。", "大笑猫正在努力保持严肃……失败。"]},
  royal: {className: "idle-royal", lines: ["本王正在等待一场合适的掌声。", "金色猫猫巡视完王国，决定继续坐王座。"]},
  scientist: {className: "idle-scientist", lines: ["实验记录：猫又观察了空气三秒。", "研究员猫正在测量今日的呼噜频率。"]},
  fluffy: {className: "idle-fluffy", lines: ["有点冷，猫把自己蓬成了一朵云。", "蓬蓬灰猫抖了抖毛，温度上升两度。"]}
};

function scheduleIdle() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(runIdleState, 8500 + Math.random() * 6500);
}

function runIdleState() {
  if (typeof busy !== "undefined" && busy) return scheduleIdle();
  if (idleActive || idleCat.classList.contains("petted") || idleCat.classList.contains("nuzzled") || idleCat.classList.contains("zoomies")) {
    return scheduleIdle();
  }
  const personalityState = personalityIdle[idleCat.dataset.personality];
  const state = personalityState && Math.random() < .6
    ? personalityState
    : idleStates[Math.floor(Math.random() * idleStates.length)];
  idleActive = true;
  idleCat.classList.add(state.className);
  idleSpeech.textContent = state.lines[Math.floor(Math.random() * state.lines.length)];
  clearTimeout(idleEndTimer);
  idleEndTimer = setTimeout(() => {
    idleCat.classList.remove(state.className);
    idleSpeech.textContent = "我准备好了。";
    idleActive = false;
    scheduleIdle();
  }, 2600);
}

window.cancelIdleState = () => {
  clearTimeout(idleTimer);
  clearTimeout(idleEndTimer);
  idleStates.forEach(state => idleCat.classList.remove(state.className));
  idleActive = false;
};
window.interruptIdleState = () => {
  window.cancelIdleState();
  scheduleIdle();
};
scheduleIdle();
