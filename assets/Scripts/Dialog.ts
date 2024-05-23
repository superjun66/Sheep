import { _decorator, Component, Node, Label, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Dialog')
export class Dialog extends Component {
    @property({ type: String })
    public content: String = '默认文字'


    @property({ type: String })
    public title: String = '默认标题'


    start() {
        let titleNode = this.node.getChildByName('Title')
        let titleComponent = titleNode.getComponent(Label)
        titleComponent.string = this.title + ''
        let contentNode = this.node.getChildByName('Content')
        let contentComponent = contentNode.getComponent(Label)
        contentComponent.string = this.content + ''
        tween(this.node).to(.5, { scale: new Vec3(1, 1, 1), position: new Vec3(0, 0, 0) }).start()
    }

    close() {
        this.node.parent.removeChild(this.node)
    }
}

