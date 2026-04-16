export class Component {
    elem = null;
    state = {};

    setState(partialState) {
        this.state = {
            ...this.state,
            ...partialState
        };

        this.rerender();
        return this;
    }

    render() {
        throw new Error("Method render() must be implemented");
    }

    rerender() {
        if (!this.elem) return;

        const newNode = this.render();
        this.elem.replaceWith(newNode);
        this.elem = newNode;
    }

    mount(parent) {
        this.elem = this.render();
        parent.append(this.elem);
    }

    unmount() {
        if (this.elem) {
            this.elem.remove();
            this.elem = null;
        }
    }
}