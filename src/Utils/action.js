import paper from 'paper';
import uuid4 from 'uuid4';

export const createLayer = (id) => {
    if (!id) id = uuid4();
    let layer = new paper.Layer({
        name: id
    });
    paper.project.addLayer(layer);
    return layer;
}

export class DrawAction {
    constructor(args) {
        this._args = args;
    };

    execute() {
        if (!paper.project.layers[this._args.layer]) {
            createLayer(this._args.layer);
        }
        if (this.removed) {
            return paper.project.layers[this._args.layer].addChildren(this.removed);
        }
    }

    undo() {
        this.removed = paper.project.layers[this._args.layer].removeChildren();
    }
}

