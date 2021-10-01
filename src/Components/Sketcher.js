import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import paper from 'paper';
import Tools from './Tools';
import { Pen } from './Tools/Pen';

class Sketcher extends PureComponent {
    static PropTypes = {
        lineColor: PropTypes.string,
        lineWidth: PropTypes.number,
        fillColor: PropTypes.string,
        background: PropTypes.string,
        opacity: PropTypes.number,
        undoSteps: PropTypes.number,
        tool: PropTypes.string,
        value: PropTypes.object
    }

    _initTools = () => {
        this._tools = {};
        this._tools[Tools.Pen] = new Pen();
    }

    _doMouseDown = (e) => {
        this._selectedTool.doMouseDown(e);
    }

    _doMouseUp = (e) => {
        this._selectedTool.doMouseUp(e);
    }

    _doMouseMove = (e) => {
        this._selectedTool.doMouseMove(e);
    }

    componentDidMount = () => {
        let {
            tool,
            value,
            undoSteps
        } = this.props;

        let canvas = this._canvas;

        this._initTools(canvas);

        let selectedTool = this._tools[tool];
        this._selectedTool = selectedTool;

        canvas.on('mousedown', this._doMouseDown);
        canvas.on('mouseup', this._doMouseUp);
        canvas.on('mousemove', this._doMouseMove);
        canvas.on('touchstart', this._doMouseDown);
        canvas.on('touchmove', this._doMouseMove);
        canvas.on('touchend', this._doMouseUp);
    }

}
