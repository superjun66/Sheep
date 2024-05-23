import { _decorator, Component, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Door')
export class Door extends Component {
    private time: number = .5

    //关门方法
    public closeDoor() {
        tween(this.node).to(this.time, { position: new Vec3(0, 0, 0) }).call(() => {
            this.isOpen = false
        }).start()
    }
    // 开门方法
    public openDoor() {
        tween(this.node).to(this.time, { position: new Vec3(720, 0, 0) }).call(() => {
            this.isOpen = true
        }).start()
    }
    public isOpen = false
}

