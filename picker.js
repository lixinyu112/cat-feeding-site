const PICKER_GROUPS = [
  {name: "水果", items: [
    "苹果", "青苹果", "梨", "橘子", "柠檬", "青柠", "香蕉", "西瓜",
    "葡萄", "草莓", "蓝莓", "哈密瓜", "樱桃", "桃子", "芒果",
    "菠萝", "椰子", "猕猴桃", "橄榄"
  ]},
  {name: "蔬菜", items: [
    "南瓜", "胡萝卜", "豌豆", "黄瓜", "番茄", "西兰花", "生菜",
    "菠菜", "玉米", "茄子", "牛油果", "甜椒", "蘑菇",
    "豆子", "土豆", "红薯", "姜", "花生", "栗子", "洋葱"
  ]},
  {name: "主食", items: [
    "米饭", "饭团", "米饼", "面包", "法棍", "薄饼", "贝果",
    "牛角包", "松饼", "华夫饼", "面条", "意大利面", "寿司",
    "便当", "咖喱饭", "粥", "三明治", "饺子", "月饼", "团子"
  ]},
  {name: "零食", items: [
    "蛋糕", "生日蛋糕", "纸杯蛋糕", "甜甜圈", "曲奇", "巧克力",
    "冰淇淋", "甜筒", "布丁", "棒棒糖", "糖果", "爆米花",
    "蜂蜜", "薯条", "披萨", "汉堡", "热狗", "炸鸡",
    "奶酪", "苹果派"
  ]},
  {name: "猫饭", items: [
    "猫粮", "猫罐头", "猫冻干", "小鱼干", "三文鱼", "金枪鱼",
    "鳕鱼", "鲈鱼", "鸡肉", "牛肉", "虾", "鸡蛋", "清水"
  ]},
  {name: "饮品", items: [
    "水", "牛奶", "酸奶", "咖啡", "绿茶", "红茶", "奶茶",
    "珍珠奶茶", "可乐", "果汁", "奶昔", "啤酒", "红酒", "鸡尾酒"
  ]},
  {name: "小彩蛋", items: [
    "纸箱", "毛线球", "袜子", "玩具熊", "花束", "玫瑰",
    "手机", "电脑", "相机", "耳机", "钥匙", "礼物",
    "羽毛", "足球", "月亮", "星星", "彩虹", "泡泡",
    "爱心", "抱抱", "老鼠"
  ]}
];

if (typeof document !== "undefined") {
const tabs = document.querySelector("#pickerTabs");
const options = document.querySelector("#pickerOptions");
document.querySelector("#pickerCount").textContent =
  PICKER_GROUPS.reduce((total, group) => total + group.items.length, 0) + " 种选择";

function showGroup(index) {
  [...tabs.children].forEach((tab, tabIndex) => {
    tab.setAttribute("aria-selected", String(index === tabIndex));
    tab.tabIndex = index === tabIndex ? 0 : -1;
  });
  options.replaceChildren();
  PICKER_GROUPS[index].items.forEach(name => {
    const choice = document.createElement("button");
    choice.type = "button";
    choice.className = "picker-choice";
    choice.title = name;
    const icon = document.createElement("span");
    icon.className = "picker-emoji";
    icon.textContent = lookupItem(name).emoji;
    const label = document.createElement("span");
    label.textContent = name;
    choice.append(icon, label);
    choice.addEventListener("click", () => feed(name));
    options.append(choice);
  });
}

PICKER_GROUPS.forEach((group, index) => {
  const tab = document.createElement("button");
  tab.type = "button";
  tab.role = "tab";
  tab.textContent = group.name;
  tab.addEventListener("click", () => showGroup(index));
  tabs.append(tab);
});
showGroup(0);
}

if (typeof module !== "undefined") module.exports = {PICKER_GROUPS};
