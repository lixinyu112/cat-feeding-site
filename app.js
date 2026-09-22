const $ = selector => document.querySelector(selector);
const saved = JSON.parse(localStorage.getItem("feed-cat-v1") || "{}");
const state = {
  count: Number(saved.count) || 0,
  history: Array.isArray(saved.history) ? saved.history : []
};

const reactions = {
  love: ["好吃！再来一份！😻", "爱你！呼噜呼噜～ 💗", "猫很开心！✨", "满分，允许你摸一下。", "猫的尾巴已经替我鼓掌了！", "我宣布：今天是小鱼干节！", "好吃到胡须都在跳舞。", "喵呜！这口要写进猫的日记。", "再吃一口，我就原谅吸尘器。", "幸福得差点把呼噜声开成拖拉机。"],
  okay: ["吃一小口就好。", "嗯，还可以。下次想吃鱼。", "猫认真尝了尝：及格。", "咀嚼三秒，决定保持神秘。", "还行，猫的眉毛没有意见。", "我吃的是这个吗？我只是路过碗边。", "味道不错，但我还是想念小鱼干。", "猫点了点头，又假装没点。"],
  curious: ["这个先闻闻，不乱吃。", "好奇，但猫决定谨慎一点。", "闻起来新鲜，先请人类查一查。", "鼻子已经考察过了，嘴巴先请假。", "这东西长得很有想法，但猫先不吃。", "我用胡须量了一下：先放旁边。", "猫绕它三圈，决定回去睡一觉。"],
  avoid: ["这个不适合猫吃，换一个吧。⚠️", "猫摇摇头：我不吃这个。", "留给人类吧，猫选择小鱼干。", "这个归你，我负责监督。", "猫把碗推远了半个爪子的距离。", "谢谢，但我的胃已经申请回避。", "猫闻完认真地盖上了想象中的盖子。"],
  danger: ["不行！这个对猫有危险，快拿走。⚠️", "猫后退三步：千万别喂这个！", "警报！这会伤害猫，别让我碰到。⚠️", "这个不能吃，猫已经躲到安全区了。", "猫认真摇头：危险的东西请收好。"],
  surprise: ["这不是食物！但猫可以玩一下。", "猫把它推到了桌边。", "不能吃，先收进猫的收藏。", "等一下，我要先给它起个名字。", "不是晚饭？那就当新玩具吧。", "猫用一只爪子批准了这份礼物。"],
  unknown: ["猫没认出来，先不吃。", "这个是什么？猫要先闻一闻。", "神秘物品已登记，猫暂时不下嘴。", "闻过了，暂时归类为：很像东西。", "猫眯起眼睛：你是不是在考我？", "等我查完猫语词典再决定。"]
};
const foodReactions = {
  "水": ["咕噜咕噜……解渴成功！💧", "水水水！猫现在是一只清爽小猫。", "喝完水，胡须都精神了。"],
  "清水": ["咕噜咕噜……解渴成功！💧", "水水水！猫现在是一只清爽小猫。"],
  "鱼": ["鱼！今天正式宣布为小鱼干日！🐟", "这条鱼的表现，值得一阵呼噜声。", "猫的灵魂被鱼香叫醒了。"],
  "小鱼干": ["小鱼干日成立！全票通过！🐟", "嘎嘣脆，猫的快乐很简单。", "这不是零食，这是猫咪的勋章。"],
  "猫粮": ["熟悉的味道，可靠的幸福。🥣", "猫粮到位，今日份安心已到账。", "每一粒都认识我，我也认识每一粒。"],
  "猫罐头": ["罐头一开，猫的心也开了。🥫", "今天的罐头，香得像小小的庆典。", "请把这份快乐盖章保存。"],
  "苹果": ["苹果脆脆，猫只负责尝一小口。🍎", "今天的苹果看起来很有礼貌。", "猫给苹果颁发：清爽奖。"],
  "香蕉": ["香蕉弯弯，猫的问号也弯弯。🍌", "闻起来像一条黄色的小船。", "猫尝过了，决定把香蕉当摆件。"],
  "草莓": ["草莓红红，猫的心情也红红。🍓", "这一颗看起来像小小的宝石。", "猫宣布：今天有一点点莓好。"],
  "西瓜": ["西瓜很大，猫先从小口口开始。🍉", "清清爽爽，猫的夏天到了。", "猫和西瓜对视后，决定和平相处。"],
  "南瓜": ["南瓜软乎乎，像一朵能吃的云。🎃", "猫批准这份橙色温柔。", "吃完南瓜，感觉可以睡一个南瓜形的觉。"],
  "胡萝卜": ["胡萝卜？猫今天也要当兔子吗？🥕", "橙色的，像一根小小的阳光。", "猫礼貌品尝，然后把主角让给兔子。"],
  "米饭": ["米饭粒粒，猫的肚肚稳稳。🍚", "这是很认真、很踏实的一口。", "猫把米饭想象成了白色小云朵。"],
  "熟牛肉": ["牛肉登场，猫的胡须立刻立正。🥩", "这口有点厉害，猫要慢慢享受。", "牛肉让今天变得很有分量。"],
  "鸡肉": ["鸡肉软软，猫咪点头。🍗", "这是一口很可靠的香。", "鸡肉通过了猫的严格面试。"]
};
const surprises = {
  "纸箱": "这不是食物，是猫的新房产。📦",
  "毛线球": "猫宣布：追捕毛线行动开始！🧶",
  "袜子": "这只袜子从现在起失踪了。🧦",
  "手机": "猫把手机坐住了：先陪我。📱",
  "电脑": "猫找到了键盘，准备写一封乱码信。💻",
  "相机": "猫摆好姿势，只给你拍一张。📷",
  "礼物": "猫拆开礼物，最后选中了盒子。🎁",
  "羽毛": "猫的眼睛已经锁定目标。🪶",
  "月亮": "月亮太远，猫决定先追它的影子。🌙",
  "星星": "猫接过星星，藏进了小爪子。⭐",
  "泡泡": "啪！猫只留下了一脸困惑。🫧",
  "爱心": "这个猫收下了，不准反悔。❤️",
  "抱抱": "猫假装不愿意，但没有逃跑。🤗",
  "老鼠": "等等，这次是玩具还是活的？🐭",
  "玩具熊": "猫和它对视了一分钟，决定当室友。🧸",
  "蝴蝶结": "戴上五秒钟，然后郑重地甩掉。🎀",
  "皇冠": "终于承认我的身份了？👑",
  "作业": "猫趴在作业上：这题我替你睡。📚",
  "镜子": "镜子里也有一只猫！要不要打招呼？🪞",
  "彩虹": "猫想抓住彩虹的一角，爪子扑了个空。🌈",
  "雪花": "凉凉的！猫把爪子藏进了肚皮。❄️",
  "音乐": "猫踩着拍子走了两步：演出结束。🎵",
  "床": "这不是东西，这是猫今天的行程。🛏️",
  "金币": "猫把它拨进角落，宣布这里是金库。🪙",
  "钱": "猫不认识钱，但很喜欢它装过的袋子。💰"
};
const pick = list => list[Math.floor(Math.random() * list.length)];
const save = () => localStorage.setItem("feed-cat-v1", JSON.stringify(state));
let busy = false;
let resetTimer;
let foodAnimation;

function resetToIdle() {
  $("#cat").classList.remove("eating", "happy", "dislike");
  $("#stage").classList.remove("happy", "dislike");
  $("#bowlFood").textContent = "";
  const pop = $("#foodPop");
  pop.classList.remove("fly");
  foodAnimation?.cancel?.();
  pop.textContent = "";
  $("#speech").textContent = "我准备好了。";
  resetTimer = undefined;
}

function renderHistory() {
  $("#feedCount").textContent = state.count;
  const list = $("#historyList");
  list.replaceChildren();
  if (!state.history.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "猫今天还没有收到东西。";
    list.append(empty);
    return;
  }
  state.history.forEach(entry => {
    const row = document.createElement("div");
    row.className = "history-row";
    const name = document.createElement("span");
    name.textContent = `${entry.icon} ${entry.food}`;
    const time = document.createElement("small");
    time.textContent = entry.time;
    row.append(name, time);
    list.append(row);
  });
}

function hearts() {
  const rect = $("#cat").getBoundingClientRect();
  for (let index = 0; index < 5; index++) {
    setTimeout(() => {
      const heart = document.createElement("i");
      heart.className = "heart";
      heart.textContent = pick(["💗", "✨", "♡"]);
      heart.style.left = rect.left + rect.width / 2 + (Math.random() * 90 - 45) + "px";
      heart.style.top = rect.top + 50 + "px";
      document.body.append(heart);
      setTimeout(() => heart.remove(), 1300);
    }, index * 110);
  }
}

function finish(food, item) {
  const stage = $("#stage");
  const cat = $("#cat");
  cat.classList.remove("eating", "happy", "dislike");
  stage.classList.remove("happy", "dislike");
  if (item.category === "love") {
    cat.classList.add("happy");
    stage.classList.add("happy");
    hearts();
  } else if (item.category === "avoid" || item.category === "danger") {
    cat.classList.add("dislike");
    stage.classList.add("dislike");
  }
  $("#speech").textContent = item.category === "surprise" && surprises[food]
    ? surprises[food]
    : pick(foodReactions[food] || reactions[item.category]);
  if (item.category === "surprise") {
    $("#bowlFood").textContent = "";
  } else if (item.category !== "love" && item.category !== "okay") {
    $("#bowlFood").textContent = item.emoji;
  } else {
    $("#bowlFood").textContent = "";
  }
  state.count++;
  state.history.unshift({
    food, icon: item.emoji, type: item.category,
    time: new Date().toLocaleTimeString("zh-CN", {hour: "2-digit", minute: "2-digit"})
  });
  state.history = state.history.slice(0, 30);
  save();
  renderHistory();
  resetTimer = setTimeout(resetToIdle, 3500);
}

function feed(raw) {
  const food = raw.trim();
  if (!food || busy) return false;
  if (typeof cancelPetReaction === "function") cancelPetReaction();
  clearTimeout(resetTimer);
  resetTimer = undefined;
  busy = true;
  $("#feedButton").disabled = true;
  const item = lookupItem(food);
  const cat = $("#cat");
  const pop = $("#foodPop");
  $("#stage").classList.remove("happy", "dislike");
  cat.classList.remove("happy", "dislike", "eating");
  $("#speech").textContent = `这是……${food}？`;
  $("#bowlFood").textContent = item.emoji;
  const stage = $("#stage");
  pop.textContent = item.emoji;
  animateFoodToCat(item, pop, stage);

  const edible = item.category === "love" || item.category === "okay";
  setTimeout(() => {
    if (edible) cat.classList.add("eating");
    setTimeout(() => {
      try {
        finish(food, item);
      } catch (error) {
        console.error("Could not complete feeding", error);
        $("#speech").textContent = "猫闻过了，稍后再试一次。";
      } finally {
        busy = false;
        $("#feedButton").disabled = false;
      }
    }, edible ? 900 : 350);
  }, 500);
  return true;
}

function animateFoodToCat(item, pop, stage) {
  const edible = item.category === "love" || item.category === "okay";
  const anchorKind = item.category === "surprise" ? "paw" : "mouth";
  const fallback = {x: stage.clientWidth / 2, y: 105};
  const anchor = typeof getCurrentCatAnchor === "function" ? getCurrentCatAnchor(anchorKind) : fallback;
  const bowl = stage.querySelector?.(".bowl")?.getBoundingClientRect?.();
  const stageRect = stage.getBoundingClientRect?.();
  const source = bowl && stageRect
    ? {x: bowl.left - stageRect.left + bowl.width / 2, y: bowl.top - stageRect.top}
    : {x: stage.clientWidth / 2, y: 285};

  let frames;
  if (edible) {
    frames = [
      {left: `${source.x}px`, top: `${source.y}px`, opacity: 1, transform: "translate(-50%,-50%) scale(1)"},
      {left: `${anchor.x}px`, top: `${anchor.y}px`, opacity: 1, transform: "translate(-50%,-50%) scale(.72)", offset: .78},
      {left: `${anchor.x}px`, top: `${anchor.y}px`, opacity: 0, transform: "translate(-50%,-50%) scale(.12)"}
    ];
  } else if (item.category === "surprise") {
    frames = [
      {left: `${source.x}px`, top: `${source.y}px`, opacity: 1, transform: "translate(-50%,-50%) rotate(0)"},
      {left: `${anchor.x}px`, top: `${anchor.y - 12}px`, opacity: 1, transform: "translate(-50%,-50%) rotate(-10deg)", offset: .75},
      {left: `${anchor.x}px`, top: `${anchor.y}px`, opacity: 1, transform: "translate(-50%,-50%) rotate(8deg)"}
    ];
  } else if (item.category === "danger") {
    frames = [
      {left: `${source.x}px`, top: `${source.y}px`, opacity: 1},
      {left: `${anchor.x}px`, top: `${anchor.y + 55}px`, opacity: 1, offset: .48},
      {left: `${source.x + 85}px`, top: `${source.y + 5}px`, opacity: 0, transform: "translate(-50%,-50%) rotate(25deg)"}
    ];
  } else if (item.category === "curious") {
    frames = [
      {left: `${source.x}px`, top: `${source.y}px`, opacity: 1},
      {left: `${anchor.x - 12}px`, top: `${anchor.y + 25}px`, opacity: 1, transform: "translate(-50%,-50%) rotate(-8deg)", offset: .45},
      {left: `${anchor.x + 12}px`, top: `${anchor.y + 25}px`, opacity: 1, transform: "translate(-50%,-50%) rotate(8deg)", offset: .72},
      {left: `${anchor.x}px`, top: `${anchor.y + 34}px`, opacity: 0, transform: "translate(-50%,-50%) scale(.85)"}
    ];
  } else if (item.category === "unknown") {
    frames = [
      {left: `${source.x}px`, top: `${source.y}px`, opacity: 1, transform: "translate(-50%,-50%) rotate(0)"},
      {left: `${anchor.x}px`, top: `${anchor.y + 35}px`, opacity: 1, transform: "translate(-50%,-50%) rotate(-14deg)", offset: .55},
      {left: `${anchor.x + 45}px`, top: `${anchor.y + 55}px`, opacity: 0, transform: "translate(-50%,-50%) rotate(18deg)"}
    ];
  } else {
    frames = [
      {left: `${source.x}px`, top: `${source.y}px`, opacity: 1},
      {left: `${anchor.x}px`, top: `${anchor.y + 30}px`, opacity: 1, offset: .62},
      {left: `${anchor.x + 55}px`, top: `${anchor.y + 70}px`, opacity: 0, transform: "translate(-50%,-50%) rotate(18deg)"}
    ];
  }
  pop.style.left = frames[frames.length - 1].left;
  pop.style.top = frames[frames.length - 1].top;
  pop.style.bottom = "auto";
  if (pop.animate) {
    foodAnimation?.cancel?.();
    foodAnimation = pop.animate(frames, {duration: edible ? 1000 : 850, easing: "cubic-bezier(.22,.8,.3,1)", fill: "forwards"});
  }
}

$("#feedForm").addEventListener("submit", event => {
  event.preventDefault();
  const input = $("#foodInput");
  if (feed(input.value)) input.value = "";
});
$("#historyButton").addEventListener("click", () => $("#history").classList.add("open"));
$("#historyClose").addEventListener("click", () => $("#history").classList.remove("open"));
renderHistory();
