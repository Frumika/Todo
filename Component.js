export class Component {
    elem = null;

    render() {
        throw new Error("Method render() must be implemented");
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