const movingCat = document.querySelector('#cat');
const motionStage = document.querySelector('#stage');
const speech = document.querySelector('#speech');
motionStage.addEventListener('pointermove', event => {
  if (movingCat.classList.contains('eating')) return;
  const bounds = motionStage.getBoundingClientRect();
  const x = (event.clientX - (bounds.left + bounds.width / 2)) / bounds.width;
  const y = (event.clientY - (bounds.top + bounds.height / 2)) / bounds.height;
  movingCat.style.setProperty('--look-x', Math.max(-5, Math.min(5, x * 9)) + 'px');
  movingCat.style.setProperty('--look-y', Math.max(-3, Math.min(3, y * 5)) + 'px');
  movingCat.style.setProperty('--look-angle', Math.max(-2, Math.min(2, x * 3)) + 'deg');
});
motionStage.addEventListener('pointerleave', () => {
  ['--look-x', '--look-y', '--look-angle'].forEach(p => movingCat.style.removeProperty(p));
});

const commonPetLines = ['嗯？是在摸我吗？', '呼噜呼噜……手感合格。', '猫把脑袋往你手心里塞了塞。', '这只手暂时归猫了。', '再摸一下也不是不可以。'];
const personalities = [
  ['异色瞳猫', ['左眼说可以，右眼说再摸一下。', '猫认真盯着你：你的两只眼睛怎么一样？', '黑白分明，但喜欢你这件事不分。', '侦察完毕：这是一只会摸猫的人类。', '异色瞳发射！你已被可爱击中。', '尾巴扫过来，偷偷勾住你的手。', '黄色眼睛负责警戒，蓝色眼睛负责撒娇。', '猫切换了观察模式：人类，你很可疑地可爱。', '一边高冷，一边呼噜，猫并不矛盾。', '两只眼睛开完会，一致同意继续摸。']],
  ['歪头奶油猫', ['猫又歪了一点：这样摸得到吗？', '脑袋歪着，呼噜声倒是很直。', '你也歪头，我们就是同一个频道。', '猫试图把问号歪成一个爱心。', '摸左边，猫却把右边递了过来。', '歪头角度增加五度，可爱度超标。', '猫正在思考，为什么摸摸会这么舒服。', '世界有点歪，但你的手很正好。', '再歪一点，就能把耳朵送到你手下。', '奶油猫加载中……请继续摸摸。']],
  ['花猫', ['花色很多，心眼暂时只有一个：再摸。', '猫端庄地坐着，尾巴却偷偷摇了。', '这一块花纹摸完，请摸下一块。', '猫假装是座雕像，呼噜声暴露了。', '你摸到了今日幸运色。', '花猫郑重批准了你的觐见。', '三种颜色，三倍可爱，不接受反驳。', '尾巴把爪爪围起来：今天也要端庄。', '猫用花纹给你的手盖了一枚章。', '看起来很严肃，其实心里在放烟花。']],
  ['趴趴虎斑', ['猫已经趴平，请开始全自动按摩。', '能躺着被摸，为什么要坐起来？', '你摸你的，猫继续摊成一张饼。', '虎斑猫进入省电呼噜模式。', '前爪伸出来：这里也要。', '猫往地上一贴，拒绝结束营业。', '本猫没有偷懒，只是在进行地板研究。', '趴着不动，也是一种积极配合。', '猫饼翻面失败，决定继续躺平。', '你负责摸，猫负责把自己放得扁扁的。']],
  ['大笑猫', ['哈哈哈哈！你摸到猫的笑点了！', '猫笑得胡须都在抖。', '再摸一下，猫要笑出喵声了。', '开心得嘴巴能装下一整条鱼！', '今天的快乐由你承包啦！', '猫一边笑，一边把尾巴拍得啪啪响。', '猫笑到暂时忘记保持矜持。', '哈哈！这位人类的摸法很有喜剧效果。', '快乐从耳朵尖一路滚到了尾巴。', '猫决定把今天命名为哈哈日。']],
  ['金色虎斑', ['金色猫猫正在收取摸摸税。', '本王允许你再摸五秒。', '猫眯起眼：这位按摩师可以留下。', '金色尾巴优雅地圈住了你的手。', '尊贵的肚皮只展示，不一定能摸。', '今日摸猫运势：大吉。', '摸得不错，赏你一声很轻的喵。', '请注意礼仪：先摸头，再夸本王好看。', '金色猫猫闪了一下，其实是心情很好。', '王座可以没有，专属按摩师不能没有。']],
  ['眼镜猫', ['猫扶了扶不存在的眼镜：手法尚可。', '经研究，摸摸能显著提高呼噜指数。', '实验记录：人类再次被猫吸引。', '猫正在严肃评估你的按摩资质。', '结论已发表：建议继续摸。', '猫的眼神像老师，尾巴却已经投降。', '本次摸摸的学术价值非常高。', '请保持这个力度，猫正在采集数据。', '论文题目：《论人类手掌的舒适性》。', '评审意见：大修后继续摸十分钟。']],
  ['蓬蓬灰猫', ['小心，摸下去可能找不到手。', '蓬松度检测：今天是百分之一百二。', '猫的毛毛把你的手吞掉了。', '请沿着毛摸，不然猫会变成蒲公英。', '摸完这一圈，猫看起来又大了一圈。', '灰猫轻轻抖毛，送你一小朵云。', '你摸到猫了吗？还是只摸到了云？', '毛毛深处传来了一声很远的呼噜。', '蓬松猫拒绝承认自己其实只有这么大。', '今日掉落：一团软乎乎的好心情。']]
];
const rapidLines = ['等等等等，毛要被摸出火星啦！', '连续摸摸达成，呼噜发动机启动！', '猫被摸成了震动模式！', '好快！你的手是装了小马达吗？', '摸摸连击，猫心加十分！'];
const personalityRapidLines = [
  ['两只眼睛同时锁定你：连摸认证成功！', '黑白猫尾巴一扫，接住了你的四连摸。'],
  ['歪头速度跟不上你的手速啦！', '奶油猫被连续摸成了一个小问号。'],
  ['端庄失败！花猫被摸得尾巴乱摇。', '四连摸击穿了花猫的雕像模式。'],
  ['趴趴猫震了四下，又迅速贴回地面。', '猫饼收到四连击，决定再摊平一点。'],
  ['哈哈哈哈！四下全都摸在笑点上！', '大笑猫笑到原地弹了四次。'],
  ['大胆！竟敢对本王使用四连摸……再来一次。', '金色猫猫的威严被连续摸掉了一小块。'],
  ['实验成功：四连摸使呼噜指数瞬间翻倍。', '眼镜猫记录下了你的高速摸猫数据。'],
  ['四连摸之后，蓬蓬猫炸成了一朵云！', '你的手速在毛毛里掀起了一阵小风暴。']
];
const holdLines = ['猫慢慢靠过来：别松手。', '正在蹭蹭充电……满格！', '长按成功，解锁一只融化的猫。', '呼噜——这块地方以后是你的专座。', '猫把整颗脑袋交给了你的手心。'];
let reactionTimer, holdTimer, streakTimer, cooldownTimer;
let tapCount = 0;
let longPressTriggered = false;
let pointerActive = false;
let rapidCooldown = false;
const pickLine = lines => lines[Math.floor(Math.random() * lines.length)];
const specialLines = () => personalities[window.currentCatStyle || 0][1];
const rapidSpecialLines = () => personalityRapidLines[window.currentCatStyle || 0];

function particles(symbols, amount = 4) {
  const rect = movingCat.getBoundingClientRect();
  for (let i = 0; i < amount; i++) {
    const spark = document.createElement('i');
    spark.className = 'pet-spark';
    spark.textContent = pickLine(symbols);
    spark.style.left = rect.left + rect.width * (.25 + Math.random() * .5) + 'px';
    spark.style.top = rect.top + rect.height * (.25 + Math.random() * .25) + 'px';
    spark.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
    document.body.append(spark);
    setTimeout(() => spark.remove(), 1200);
  }
}
function react(lines, className, duration = 2600, symbols = ['♡', '✦', '💗', '♪']) {
  if (typeof busy !== 'undefined' && busy) return;
  movingCat.classList.remove('petted', 'nuzzled', 'zoomies');
  void movingCat.offsetWidth;
  movingCat.classList.add(className);
  speech.textContent = pickLine(lines);
  particles(symbols, className === 'zoomies' ? 7 : 4);
  clearTimeout(reactionTimer);
  reactionTimer = setTimeout(() => {
    movingCat.classList.remove('petted', 'nuzzled', 'zoomies');
    speech.textContent = '我准备好了。';
  }, duration);
}
function registerTap() {
  if (rapidCooldown) return;
  tapCount++;
  if (tapCount === 1) {
    clearTimeout(streakTimer);
    streakTimer = setTimeout(() => { tapCount = 0; }, 1600);
  }
  if (tapCount >= 4) {
    clearTimeout(streakTimer);
    tapCount = 0;
    react([...rapidLines, ...rapidSpecialLines()], 'zoomies', 3000, ['💥', '✨', '♡', '！']);
    rapidCooldown = true;
    movingCat.classList.add('cooling');
    cooldownTimer = setTimeout(() => {
      rapidCooldown = false;
      movingCat.classList.remove('cooling');
    }, 1800);
  } else {
    react(Math.random() < .55 ? commonPetLines : specialLines(), 'petted');
  }
}
movingCat.addEventListener('pointerdown', event => {
  if ((typeof busy !== 'undefined' && busy) || rapidCooldown) return;
  pointerActive = true;
  longPressTriggered = false;
  movingCat.setPointerCapture?.(event.pointerId);
  clearTimeout(holdTimer);
  holdTimer = setTimeout(() => {
    longPressTriggered = true;
    tapCount = 0;
    react([...holdLines, ...specialLines()], 'nuzzled', 3400, ['💗', '♡', '～']);
  }, 650);
});
movingCat.addEventListener('pointerup', event => {
  if (!pointerActive) return;
  pointerActive = false;
  clearTimeout(holdTimer);
  movingCat.releasePointerCapture?.(event.pointerId);
  if (!longPressTriggered) registerTap();
});
movingCat.addEventListener('pointercancel', () => { pointerActive = false; clearTimeout(holdTimer); });
movingCat.addEventListener('click', event => event.preventDefault());
movingCat.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); registerTap(); }
});
window.cancelPetReaction = () => {
  clearTimeout(reactionTimer); clearTimeout(holdTimer); clearTimeout(streakTimer); clearTimeout(cooldownTimer);
  tapCount = 0;
  pointerActive = false; rapidCooldown = false;
  movingCat.classList.remove('petted', 'nuzzled', 'zoomies', 'cooling');
};
