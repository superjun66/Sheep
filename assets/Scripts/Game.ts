import { _decorator, Component, Node, Prefab, Sprite, instantiate, input, Input, tween, Vec3, Vec2, Color, Label, Animation } from 'cc';
import { Card } from './Card';
import { Dialog } from './Dialog';
import { Door } from './Door';
const { ccclass, property } = _decorator;
@ccclass('Game')
export class Game extends Component {
    // 游戏启动的遮罩
    @property({ type: Prefab })
    public door: Node = null
    private doorInstance: Node = null

    // 弹窗
    @property({ type: Prefab })
    public dialog: Node = null

    // 容器
    @property({ type: Node })
    public container: Node = null

    // 卡牌
    @property({ type: Prefab })
    public cardPrefab: Prefab = null

    // 消除栏
    @property({ type: Node })
    public box: Node = null

    // 当前所有卡牌
    private allCardsValue: number[] = []
    // 等待区上一步
    private lastCard: { value, containerIndex, position } = null
    // 当前等待区
    private cardsContainer: Node[] = []
    // 填充的精灵数组
    private total: number = 30
    // 所有精灵种类
    private totalCardType: number = 6
    // 游戏状态
    private gameStatus = 0   //0：游戏准备，1：游戏进行中，2：游戏结束
    private boxPostion: any[] = [
        { x: -275.3, t: 0 },
        { x: -165.10000000000002, t: 0 },
        { x: -54.90000000000002, t: 0 },
        { x: 55.29999999999998, t: 0 },
        { x: 165.5, t: 0 },
        { x: 275.7, t: 0 }]

    private allCards: { ele, index }[] = []
    private mapPostion: any[] = [
        { x: -278.8, t: 249.59999999999997 },
        { x: -233.8, t: 249.59999999999997 },
        { x: -188.8, t: 249.59999999999997 },
        { x: -143.8, t: 249.59999999999997 },
        { x: -98.80000000000001, t: 249.59999999999997 },
        { x: -53.80000000000001, t: 249.59999999999997 },
        { x: -8.800000000000011, t: 249.59999999999997 },
        { x: 36.19999999999999, t: 249.59999999999997 },
        { x: 81.19999999999999, t: 249.59999999999997 },
        { x: 126.19999999999999, t: 249.59999999999997 },
        { x: 171.2, t: 249.59999999999997 },
        { x: 216.2, t: 249.59999999999997 },
        { x: 261.2, t: 249.59999999999997 },
        { x: -278.8, t: 131.49999999999997 },
        { x: -233.8, t: 131.49999999999997 },
        { x: -188.8, t: 131.49999999999997 },
        { x: -143.8, t: 131.49999999999997 },
        { x: -98.80000000000001, t: 131.49999999999997 },
        { x: -53.80000000000001, t: 131.49999999999997 },
        { x: -8.800000000000011, t: 131.49999999999997 },
        { x: 36.19999999999999, t: 131.49999999999997 },
        { x: 81.19999999999999, t: 131.49999999999997 },
        { x: 126.19999999999999, t: 131.49999999999997 },
        { x: 171.2, t: 131.49999999999997 },
        { x: 216.2, t: 131.49999999999997 },
        { x: 261.2, t: 131.49999999999997 },
        { x: -278.8, t: 13.399999999999977 },
        { x: -233.8, t: 13.399999999999977 },
        { x: -188.8, t: 13.399999999999977 },
        { x: -143.8, t: 13.399999999999977 },
        { x: -98.80000000000001, t: 13.399999999999977 },
        { x: -53.80000000000001, t: 13.399999999999977 },
        { x: -8.800000000000011, t: 13.399999999999977 },
        { x: 36.19999999999999, t: 13.399999999999977 },
        { x: 81.19999999999999, t: 13.399999999999977 },
        { x: 126.19999999999999, t: 13.399999999999977 },
        { x: 171.2, t: 13.399999999999977 },
        { x: 216.2, t: 13.399999999999977 },
        { x: 261.2, t: 13.399999999999977 },
        { x: -278.8, t: -104.69999999999999 },
        { x: -233.8, t: -104.69999999999999 },
        { x: -188.8, t: -104.69999999999999 },
        { x: -143.8, t: -104.69999999999999 },
        { x: -98.80000000000001, t: -104.69999999999999 },
        { x: -53.80000000000001, t: -104.69999999999999 },
        { x: -8.800000000000011, t: -104.69999999999999 },
        { x: 36.19999999999999, t: -104.69999999999999 },
        { x: 81.19999999999999, t: -104.69999999999999 },
        { x: 126.19999999999999, t: -104.69999999999999 },
        { x: 171.2, t: -104.69999999999999 },
        { x: 216.2, t: -104.69999999999999 },
        { x: 261.2, t: -104.69999999999999 },
        { x: -278.8, t: -222.79999999999995 },
        { x: -233.8, t: -222.79999999999995 },
        { x: -188.8, t: -222.79999999999995 },
        { x: -143.8, t: -222.79999999999995 },
        { x: -98.80000000000001, t: -222.79999999999995 },
        { x: -53.80000000000001, t: -222.79999999999995 },
        { x: -8.800000000000011, t: -222.79999999999995 },
        { x: 36.19999999999999, t: -222.79999999999995 },
        { x: 81.19999999999999, t: -222.79999999999995 },
        { x: 126.19999999999999, t: -222.79999999999995 },
        { x: 171.2, t: -222.79999999999995 },
        { x: 216.2, t: -222.79999999999995 },
        { x: 261.2, t: -222.79999999999995 }
    ]
    initGame(currentAllCard?: any[]) {
        if (!currentAllCard) {
            this.cardsContainer = []
            this.box.destroyAllChildren()
            this.box.removeAllChildren()
        }

        this.allCardsValue = []
        this.allCards = []
        this.container.destroyAllChildren()
        this.container.removeAllChildren()

        let totalCardNum = currentAllCard ? currentAllCard.length : this.total
        let randomIndex = this.getRandomNum(0, this.mapPostion.length, totalCardNum)
        randomIndex = randomIndex.sort((a, b) => { return a - b })
        // 生成默认卡片
        randomIndex.forEach((ele, index) => {
            let card = instantiate(this.cardPrefab)
            let component = card.getComponent(Card)
            let cardValue = currentAllCard ? currentAllCard[index] : Math.floor(Math.random() * this.totalCardType + 1)
            component.val = cardValue
            component.clickable = randomIndex.indexOf(ele + 1) > -1 && (ele + 1) % 13 !== 0 ? false : true
            this.allCardsValue.push(component.val)
            this.container.addChild(card)
            this.allCards.push({
                index: ele,
                ele: card
            })
            card.setPosition(new Vec3(0, 0, 0))
            // 随机发牌
            tween(card).to(Math.random(), { position: new Vec3(this.mapPostion[ele].x, this.mapPostion[ele].t, 0) }).call(() => {
                card.setPosition(new Vec3(this.mapPostion[ele].x, this.mapPostion[ele].t, 0))
                card.on(Input.EventType.TOUCH_START, this.cardClick, this)
            }).start()
        })
    }

    getRandomNum(min, max, countNum) {
        var arr = [];
        // 在此处补全代码
        for (let i = 0; i < countNum; i++) {
            var number = Math.floor(Math.random() * (max - min) + min);
            if (arr.indexOf(number) == -1) { //去除重复项
                arr.push(number);
            } else {
                i--;
            }
        }
        return arr;
    }

    // 可点击（遮盖判断）
    clickableCheck(node: Node, isBack?: boolean) {
        let curPosition = { x: node.position.x, t: node.position.y }
        let mapIndex = this.mapPostion.findIndex(ele => {
            return ele.x === curPosition.x && ele.t === curPosition.t
        })
        let curItem = this.allCards.find(ele => {
            return ele.index === mapIndex
        })
        if (mapIndex > -1 && curItem) {
            let index = this.allCards.findIndex((ele) => { return ele.index === curItem.index })
            // 第一个就不可点，换行不可点，
            if (index - 1 >= 0 && this.allCards[index - 1].index === curItem.index - 1 || mapIndex == 1) {
                this.allCards[index - 1].ele.getComponent(Card).clickable = isBack ? false : true
            }
        }
    }

    start() {
        let doorInstance = instantiate(this.door)
        this.doorInstance = doorInstance
        this.node.addChild(doorInstance)
        let animate = this.node.getComponent(Animation)
        animate.play()

    }
    update() {
        // 检查是否结束游戏
        let doorObj = this.doorInstance.getComponent(Door)
        let doorStatus = doorObj.isOpen  // false 表示关闭,true 表示打开
        if (this.gameStatus === 1 && this.cardsContainer.length === 6) {
            this.message('游戏结束', '所有栏位已经占满')
            doorObj.isOpen = false
            doorObj.closeDoor()
            this.gameStatus = 0
        } else if (this.gameStatus === 0 && doorStatus) {
            this.initGame()
            this.gameStatus = 1
        }
    }
    cardClick(e) {
        let node = e.currentTarget
        let card = node.getComponent('Card')
        this.lastCard = {
            position: {
                x: node.position.x,
                t: node.position.y
            },
            value: card.val,
            containerIndex: 0
        }
        if (this.cardsContainer.length < 6 && card.clickable) {
            for (let index = 0; index < this.allCardsValue.length; index++) {
                if (this.allCardsValue[index] === card.val) {
                    this.allCardsValue.splice(index, 1)
                    break
                }
            }
            this.clickableCheck(node)
            card.clickable = false
            this.groupCheck(card, node)
        }

    }


    // 移动卡牌
    moveCard(node: Node, position: Vec3, callback?: Function) {
        // 缓动特效暂时没做
        // tween(node)
        //     .to(this.moveTime, { position: new Vec3(position.x, position.y, 0) }, { easing: 'sineOutIn' })
        //     .call(() => {
        //         node.setPosition(new Vec3(position.x, position.y, 0))
        //         callback()
        //     })
        //     .start()
        node.setPosition(new Vec3(position.x, position.y, 0))
        if (typeof callback === 'function') callback()
    }


    // 点击卡牌排序
    groupCheck(card: Card, node: Node) {
        let currentBox = this.cardsContainer
        let res = currentBox.find((ele) => {
            return ele.getComponent(Card).val === card.val
        })
        // 移动前置卡牌
        let targetIndex = res ? currentBox.indexOf(res) : 0
        for (let index = currentBox.length - 1; index >= targetIndex; index--) {
            let curNode = currentBox[index]
            let positionItem = this.boxPostion[index + 1]
            this.cardsContainer[index + 1] = curNode
            this.moveCard(curNode, new Vec3(positionItem.x, positionItem.t, 0), () => { })
        }
        // 移动当前卡牌
        let targetPos = this.boxPostion[targetIndex]
        this.cardsContainer[targetIndex] = node
        this.lastCard.containerIndex = targetIndex
        this.moveCard(node, new Vec3(targetPos.x, targetPos.t, 0), () => {
            this.box.addChild(node)
            this.resultCheck()
        })
    }

    // 三消逻辑
    resultCheck() {
        let cards = this.cardsContainer
        let temp = []
        cards.forEach((ele, index) => {
            let card = ele.getComponent(Card)
            if (!temp.length) {
                temp.push({ key: card.val, Component: ele, index: index })
            } else {
                if (temp[temp.length - 1].key === card.val) {
                    temp.push({ key: card.val, Component: ele, index: index })
                } else {
                    temp = [{ key: card.val, Component: ele, index: index }]
                }
            }
            if (temp.length === 3) {
                // 清空元素
                temp.forEach(ele => {
                    tween(ele.Component).to(.1, {
                        position: new Vec3(temp[1].Component.position.x, temp[1].Component.position.y, 0)
                    }).call(() => {
                        this.box.removeChild(ele.Component)
                    }).start()

                    this.cardsContainer[ele.index] = null

                })

                // 移除操作栏
                this.cardsContainer = this.cardsContainer.filter((s) => {
                    return s !== null
                })
                // 清除判定数组
                temp = []
                // 移动现有卡牌
                this.cardsContainer.forEach((ele, index) => {
                    let mapItem = this.boxPostion[index]
                    this.moveCard(ele, new Vec3(mapItem.x, mapItem.y, 0))
                })
                // 消除之后不能撤回
                this.lastCard = null
            }
        })
    }


    // 弹窗方法
    message(title: string, msg: string) {
        let dialogInstance = instantiate(this.dialog)
        let comp = dialogInstance.getComponent('Dialog') as Dialog
        comp.title = title
        comp.content = msg
        this.node.addChild(dialogInstance)
    }


    // 撤回逻辑
    lastStep() {
        if (this.lastCard === null) {
            this.message('小提示', '没有上一步可以回退')
        } else {
            let newCard = instantiate(this.cardPrefab)
            newCard.getComponent(Card).val = this.lastCard.value
            this.allCardsValue.push(this.lastCard.value)
            newCard.getComponent(Card).clickable = true
            newCard.on(Input.EventType.TOUCH_START, this.cardClick, this)
            this.container.addChild(newCard)
            newCard.setPosition(new Vec3(this.lastCard.position.x, this.lastCard.position.t, 0))
            this.clickableCheck(newCard, true)
            // 移除操作栏
            this.cardsContainer[this.lastCard.containerIndex].destroy()
            this.cardsContainer[this.lastCard.containerIndex] = null
            this.cardsContainer = this.cardsContainer.filter((s) => {
                return s !== null
            })
            if (!this.cardsContainer.length) {
                this.box.destroyAllChildren()
                this.box.removeAllChildren()
            }
            // 移动现有卡牌
            this.cardsContainer.forEach((ele, index) => {
                let mapItem = this.boxPostion[index]
                this.moveCard(ele, new Vec3(mapItem.x, mapItem.y, 0))
            })
            this.lastCard = null
        }
    }

    // 打乱棋盘
    randomCards() {
        if (this.allCardsValue.length && this.gameStatus === 1) {
            this.initGame(this.allCardsValue)

        } else {
            this.message('小提示', '暂时不可使用随机棋盘')
        }
    }

    // 退出游戏
    quitGame() {
        this.message('小提示', '功能正在完善中...')
    }
}

