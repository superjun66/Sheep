import { _decorator, Component, Node, Prefab, Sprite, tween, Vec2, Vec3, Color, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Card')
export class Card extends Component {

    // // 容器
    // @property({ type: Node })
    // public box: Node = null

    // 填充的精灵数组
    // private fillStatus: Sprite[] = []

    @property({ type: Boolean })
    public clickable: boolean = true

    @property({ type: Number })
    public val: number = 1

    @property({ type: SpriteFrame })
    public bg1: SpriteFrame = null
    @property({ type: SpriteFrame })
    public bg2: SpriteFrame = null
    @property({ type: SpriteFrame })
    public bg3: SpriteFrame = null
    @property({ type: SpriteFrame })
    public bg4: SpriteFrame = null
    @property({ type: SpriteFrame })
    public bg5: SpriteFrame = null
    @property({ type: SpriteFrame })
    public bg6: SpriteFrame = null

    start() {
        let bgComponent = this.node.getComponent(Sprite)
        bgComponent.spriteFrame = this['bg' + this.val]
    }
    update() {
        let bgComponent = this.node.getComponent(Sprite)
        bgComponent.color = this.clickable ? new Color(255, 255, 255, 255) : new Color(150, 137, 137, 255)
    }

}

