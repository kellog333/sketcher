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
        local.path.strokeColor = this.color
    }
}