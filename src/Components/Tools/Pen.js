import paper from 'paper';
import history from '../../Utils/history';
import { createLayer, DrawAction } from '../../Utils/action';
import PaperTools from './PaperTools';


class Pen extends PaperTools {

    constructor(props) {
        let canvas = this._canvas;
        this.path = null;
        this.group = null;
        this.color = props.color;
        this.lineWidth = props.lineWidth;
    }
    
    doMouseDown(event) {
        let layer = createLayer();
        local.path = new paper.Path();
        local.path.strokeColor = this.color;
        local.path.lineWidth = this.lineWidth;
        local.path.add(event.point);

        local.group.addChild(new paper.Shape.Ellipse({
            layer: layer,
            center: event.point,
            strokeColor: this.color,
            fillColor: this.color,
            radius: this.lineWidth / 2
        }));
        layer.addChild(local.group);
    }

    doMouseMove(event) {
        if (!local.path) return;
        local.path.add(event.point);
        local.path.selected = true;
    }

    doMouseUp(event) {
        local.path.add(event.point);
        local.path.simplify();
    }
}