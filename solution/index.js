module.exports = class {
    constructor(iter = []) {
        if (iter === null || typeof iter[Symbol.iterator] !== 'function') {
            throw new TypeError(
                'not iterable'
            )
        }
        this._set = []
        for(let i of iter) {
            this.add(i)
        }
    }

    // Iterator Protocol
    [Symbol.iterator]() {
        return this._set.values()
    }

    get size() {
        return this._set.length
    }

    // Generator
    *entries() {
        for (const v of this._set) {
            yield [v, v]
        }
    }

    clear() {
        this._set = []
    }

    add(i) {
        if (!this._set.includes(i)) {
            this._set.push(i)
        }
        return this
    }

    delete(i) {
        this._set = this._set.filter(e => e !== i)
    }

    has(i) {
        return this._set.includes(i)
    }

    keys() {
        return this[Symbol.iterator]();
    }

    values() {
        return this[Symbol.iterator]();
    }

    get [Symbol.toStringTag]() {
        return '^_^'
    }

    forEach(cb, context = this) {
        return this._set.forEach(cb, context)
    }
}