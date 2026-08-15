// Swapping
let a = 10;
let b = 20;

[a,b] = [b,a]

console.log(a,b)

// Operators
let a = 12
let b = 6;

console.log(a/b) // this gives out the quotient 2

let a = 7
let b = 2

console.log(a%b) // this gives out the remainder 1

let a = 2
let b = 7

console.log(a%b) // in this case the divident is greater than the divisor so the remianer will be divident itself

let a = 4563
console.log(a%10 + Math.floor(a/10)%10 + Math.floor(a/100)%10 + Math.floor(a/1000)%10)

// increment, pre increment, and post increment
// post incremeent
let a = 10
let b = a++
console.log(b) // 10
console.log(a) // 11

// pre increment
let a = 10
let b = ++a
console.log(a) // 11
console.log(b) // 11

// error
let a = 10
let b = ++(a++) // this will give out an error

// Discount
let a = Number(prompt("enter your amount"))
const discount = (a) => {
    if (a < 0 || isNaN(a)) {
        alert("please enter a valid no");
        return
    }

    const disc = a <= 5000 ? 0
        : a <= 7000 ? 5
        : a <= 9000 ? 10
        : 20;

    console.log(`Your disc is ${disc} and your final price is ${ a - ((a*disc)/100)}`)
}

discount(a);

// Bill payable
let u = Number(prompt("enter your amount"))

const price = (u) => {
    let total = 0
    if (u < 0 || isNaN(u)) {
        alert("please enter a valid no");
        return
    }
    else if(u<=100) {
        total = u*4.2
    }
    else if(u<=200) {
        total = (u-100)*6 + 100*4.2
    }
    else if(u<=400) {
        total = (u-200)*6 + 100*4.2 + 200*6
    }
    else {
        total = 100*4.2 + 200*8 + 400*8 + (u-400)*13
    }

    return `Your total bill is ${total}`
}

price(u);

// notes
// Bill payable
let n = Number(prompt("enter your amount"))

const notes = (u) => {
    let fiveH = 0
    let twoH = 0
    let H = 0
    let ten = 0
    let one = 0
    let two = 0
    if (u < 0 || isNaN(u)) {
        alert("please enter a valid no");
        return
    }
    else if(u<=100) {
        total = u*4.2
    }
    else if(u<=200) {
        total = (u-100)*6 + 100*4.2
    }
    else if(u<=400) {
        total = (u-200)*6 + 100*4.2 + 200*6
    }
    else {
        total = 100*4.2 + 200*8 + 400*8 + (u-400)*13
    }

    return `Your total bill is ${total}`
}

price(u);