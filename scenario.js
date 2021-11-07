class MySet {
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

// тесты
const set = new MySet([4, 8, 15, 15, 16, 23, 42]);

// хранит только уникальные значения
console.log([...set]); // [ 4, 8, 15, 16, 23, 42 ]

// есть свойство size
console.log(set.size); // 6

// работает в цикле for-of
for (const item of set) {
    console.log(item); // 4 8 15 16 23 42
}

// есть методы keys, values, entries
for (const item of set.entries()) {
    console.log(item); // [ 4, 4 ] [ 8, 8 ] ...
}

// есть метод clear
set.clear();
console.log(set.size); // 0

const object = {
    getValue() { return this.value }
}

const data = {
    value: 42
}

// есть метод add
set.add(object);
set.add(data);

// который может работать в цепочке вызовов
set.add(object).add(object).add(object);

// есть метод delete
set.delete(data);

// есть метод has
console.log(set.has({})); // false
console.log(set.has(object)); // true
console.log(set.has(data)); // false

// и кое-что еще
console.log(set === set.valueOf()) // true
console.log(String(set)) // [object ^_^]
console.log(Object.prototype.toString.call(set)) // [object ^_^]

// есть forEach, который делает какие-то странные вещи...
set.forEach(function (item) {
    console.log(item.getValue.call(this)); // 42
}, data)