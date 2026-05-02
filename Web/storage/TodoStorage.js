export class TodoStorage {
    static KEY = "todos";

    static load() {
        const raw = localStorage.getItem(this.KEY);
        return raw ? JSON.parse(raw) : [];
    }

    static save(todos) {
        localStorage.setItem(this.KEY, JSON.stringify(todos));
    }
}