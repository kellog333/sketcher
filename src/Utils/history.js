class History {
    constructor(limit) {
        this.limit = limit;
        this.clear();
    }

    add(action) {
        if (this.action.length >= this.limit || this.current == this.history.length - 1 ) {
            this.history.shift();
        }
        this.history.push(action);
        this.current = this.history.length;
    }

    undo() {
        if (this.current > 0) {
            this.history[--this.current].undo();
        }
    }

    redo() {
        if (this.history.length > this.current) {
            this.history[this.current++].execute();
        }
    }

    clear() {
        this.history = [];
        this.current = 0;
    }
}

export default new History(20);