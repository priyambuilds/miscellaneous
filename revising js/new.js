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