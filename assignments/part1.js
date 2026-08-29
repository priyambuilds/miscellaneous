const members = ["rahul", "aisha", "kabir"];

const expenses = [
  { id: 1, desc: "Milk", amount: 60,  paidBy: "rahul", participants: ["rahul", "aisha", "kabir"] },
  { id: 2, desc: "Gas",  amount: 960, paidBy: "aisha", participants: ["rahul", "aisha", "kabir"] },
  { id: 3, desc: "Wifi", amount: 840, paidBy: "rahul", participants: ["rahul", "aisha"] }
];

const totalPaid = (expenses, members) => {
    let initialBalances = Object.fromEntries(members.map(m => [m, 0]))
    let total = expenses.reduce((acc, { paidBy, amount }) => {
        acc[paidBy] += amount;
        return acc
    }, initialBalances)
    return total
}
console.log(totalPaid(expenses, members))

const splitEvenly = (total, n) => {
    let newTotal = Math.round(total*100)
    let base = Math.round(newTotal/n)
    let cents = newTotal%n
    let arr = new Array(n).fill(base).map((num, i) => (i < cents ? num + 1 : num)/100)
    return arr
}

console.log(splitEvenly(100, 3))

const totalOwed = (expenses, members) => {
    let totalBal = Object.fromEntries(members.map(n => [n, 0]))
    let totalExp = expenses.reduce((acc, { amount, participants }) => {
        const shares = splitEvenly(amount, participants.length)
        participants.forEach((person, index) => {
            acc[person] += shares[index]
        })
        return acc
    }, totalBal)
    return totalExp
}
console.log(totalOwed(expenses, members))

const balances = (paid, owed) => {
    let netBal = Object.fromEntries(
        Object.keys(paid).map(person => [
            person, paid[person] - owed[person]
        ])
    )
    return netBal
}
console.log(balances(totalPaid(expenses, members), totalOwed(expenses, members)))

const verify = (obj) => {
    const sum = Object.values(obj).reduce((acc, item) => acc + item, 0)
    return Math.abs(sum) < 0.01;
}
console.log(balances(totalPaid(expenses, members), totalOwed(expenses, members)))

// If 2 members are tied at the top, it will return the array of those 2 member's names
const biggestSpender = (obj) => {
    const maxAmount = Math.max(...Object.values((obj)))
    const result = Object.entries(obj)
        .filter(n => n[1] === maxAmount)
        .map(n => n[0])
    if (result.length === 1) {
        return result[0]
    } else return result
}
console.log(biggestSpender(totalPaid(expenses, members)))

const byMember = (obj, name) => {
    return obj.filter(({ paidBy, participants }) => {
        return paidBy === name || participants.includes(name)
    })
    .map(({desc}) => desc)
}
console.log(byMember(expenses, "kabir"));

const search = (obj, name) => {
    return obj.filter(({ desc }) =>
        desc.toLowerCase().includes(name.toLowerCase())
    )
    .map(item => item.desc).join()
}
search(expenses, "wi")

const filterExpenses = (obj, {member, search}) => {
    return obj.filter(({ paidBy, participants, desc }) => {
        const members = participants.includes(member) || !member || paidBy == member
        const item = desc.toLowerCase().includes(search.toLowerCase()) || !search
        return members && item
    })
    .map(n => n.desc)
}
console.log(filterExpenses(expenses, { member: null, search: "" }))

const summary = () => {
    let total = Object.values(totalPaid(expenses, members))
    let count = total.length
    total = total.reduce((acc, item) => acc + item, 0)
    let average = total/count
    let biggest = biggestSpender(totalPaid(expenses, members))
    return {total, count, average, biggest}
}
console.log(summary())

const a = { x: 1 };
const b = a;
b.x = 2;
console.log(a.x); // 2. Because b.x still points to the same reference in the memory where a.x is stored. For objects we cant create a true copy with just an = assignmemt operator.

const c = { x: 1, nested: { y: 1 } };
const d = { ...c };
d.x = 99;
d.nested.y = 99;
console.log(c.x);            // 1. ... spread operator create a shallow copy of the original object. Meaning d.x does not point to the same reference in the memory as c.x and both are independent of each other
console.log(c.nested.y);     // 99 ... created a shallow copy. But it's still not a true copy. It works only for the top level stuff defined inside the object.

const list = [1, 2, 3];
const copy = list;
copy.push(4);
console.log(list.length);    // 4 arrays are basically a special type of object. Therefore they follow the same rules as an object

const todos = [{ id: 1, done: false }, { id: 2, done: false }];
const toggleDone = (todo, id) => {
    return todo.map(item => {
        if (id === item.id) {
            return {...item, done: !item.done}
        }
        return item
    })
}
const next = toggleDone(todos, 2)
console.log(next[0] === todos[0])
console.log(next[1] === todos[1])