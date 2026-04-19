export class Component {
    elem = null;
    props = {};

    setProps(props) {
        this.props = {
            ...this.props,
            ...props
        };

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
}