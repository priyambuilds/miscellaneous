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

const splitEvenly = (total, n) => {
    let newTotal = Math.round(total*100)
    let base = Math.round(newTotal/n)
    let cents = newTotal%n
    let arr = new Array(n).fill(base).map((num, i) => (i < cents ? num + 1 : num)/100)
    return arr
}

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

const balances = (paid, owed) => {
    let netBal = Object.fromEntries(
        Object.keys(paid).map(person => [
            person, paid[person] - owed[person]
        ])
    )
    return netBal
}

const verify = (obj) => {
    const sum = Object.values(obj).reduce((acc, item) => acc + item, 0)
    return Math.abs(sum) < 0.01;
}

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

const byMember = (obj, name) => {
    return obj.filter(({ paidBy, participants }) => {
        return paidBy === name || participants.includes(name)
    })
    .map(({desc}) => desc)
}

const search = (obj, name) => {
    const result =  obj.filter(({ desc }) =>
        desc.toLowerCase().includes(name.toLowerCase())
    )
    return result.map(item => item.desc).join()
}
search(expenses, "wi")

