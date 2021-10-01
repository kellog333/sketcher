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
        this.tool = props.tool;
    }
    
    doMouseDown(event) {
        let layer = createLayer();
        this.path = new paper.Path();
        this.path.strokeColor = this.color;
        this.path.lineWidth = this.lineWidth;
        this.path.add(event.point);

        this.group.addChild(new paper.Shape.Ellipse({
            layer: layer,
            center: event.point,
            strokeColor: this.color,
            fillColor: this.color,
            radius: this.lineWidth / 2
        }));
        layer.addChild(this.group);
    }

    doMouseMove(event) {
        if (!this.path) return;
        this.path.add(event.point);
        this.path.selected = true;
    }

    doMouseUp(event) {
        this.path.add(event.point);
        this.path.simplify();
        const action = new DrawAction({
            layer: this.path.layer.name,
            tool: this.tool,
            points: this.path.segments.map(seg => {
                return {
                    x: seg._point._x,
                    y: seg._point._y
                }
            })
        });

        history.add(action);
        this.path.selected = false;
        this.path = null;
        this.group = null;
    }
}

export const Pen = new paper.Tool();
Pen.doMouseDown = doMouseDown;
Pen.doMouseMove = doMouseMove;
Pen.doMouseUp = doMouseUp;