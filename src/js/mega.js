// MARK:设置两个常量：
const INTENT_ENTER = 300;//menu显示延迟时间
const INTENT_LEAVE = 400;//menu隐藏延迟时间

const expanded = [];

function addEvents (parent, menu) {
  let timeout;

  parent.addEventListener('mouseenter', () => {
    // MARK:清楚延迟计时器timeout
    clearTimeout(timeout);

    // MARK:如果menu本身就是展示状态，则啥也不做
    if (isOpen(menu)) {
      return;
    }

    // MARK:如果menu不是展示状态，则在发省mouseenter事件后，延迟INTENT_ENTER ms展示menu
    timeout = setTimeout(() => {
      if (expanded.length) {
        hide(expanded[0]);
        show(menu, false);
      } else {
        show(menu, true);
      }
    }, INTENT_ENTER);
  });

  parent.addEventListener('mouseleave', () => {
    clearTimeout(timeout);

    // MARK:如果menu为展示状态，则延迟INTENT_LEAVE时间后隐藏
    timeout = setTimeout(
      () => isOpen(menu) && hide(menu),//KNOWLEGE:使用&&连接条件A和待执行函数B，A为真就执行B,A为假就不执行B,可以学习
      INTENT_LEAVE
    );
  });
}

function isOpen (menu) {
  /**
   * @dest 判断medu是否是展示状态
   * @param menu:
   * @return: TYPE Boolean
  */

  //MARK:expanded数组存储位于展示状态的menu,如果medu位于expanded数组中，则说明medu为展示状态，返回true
  return expanded.indexOf(menu) !== -1;
}

function show (menu, animate) {
  /**
   * @dest
   * @
   */
  if (animate) {
    menu.classList.add('o-header__mega--animation');
  }
}