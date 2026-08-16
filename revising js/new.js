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
let u = Number(prompt("enter your amount"))

const notes = (u) => {
    let fiveH = 0
    let twoH = 0
    let H = 0
    let fifty = 0
    let twenty = 0
    let ten = 0
    let one = 0
    let two = 0
    let left = u
    if (u < 0 || isNaN(u)) {
        alert("please enter a valid no");
        return
    }
    if(u>=500) {
        fiveH = Math.floor(left/500)
        left = left%500
    }
    if(left>=200) {
        twoH = Math.floor(left/200)
        left = left%200
    }
    if(left>=100) {
        H = Math.floor(left/100)
        left = left%100
    }
    if(left>=50) {
        fifty = Math.floor(left/50)
        left = left%50
    }
    if(left>=20) {
        twenty = Math.floor(left/20)
        left = left%20
    }
    if(left>=10) {
        ten = Math.floor(left/10)
        left = left%10
    }
    if(left>=2) {
        two = Math.floor(left/2)
        left =left%2
    }
    else {
        one = 1
    }

    console.log(`
        Your notes are:
        500s: ${fiveH}
        200s: ${twoH}
        100s: ${H}
        50s: ${fifty}
        20s: ${twenty}
        10s: ${ten}
        2s: ${two}
        1s: ${one}
    `);
}

notes(u);

// loops
// for(start; end; change) {}

// sum of n natural nos
let n = Number(prompt("Enter a no"))
let ans = 0
for(let i=1; i<=n; i++) {
    ans += i
}

// factors of a no
let n = Number(prompt("Enter a no"))
let ans = []
for(let i=1; i<=Math.floor(n/2); i++) {
    if(n%i === 0) {
        ans.push(i)
    }
}
console.log(ans)

// Prime no
let n = Number(prompt("Enter a no"))
const isPrime = (n) => {
    if (n<=1) return false
    if (n==2) return false
    if (n%2==0) return false
    for(let i = 3; i<=Math.sqrt(n); i+=2) {
        if(n%i==0) return false
    }
    return true
}

// While loop guessing game
let n = Number(prompt("Enter a no"))
let guess = Number(prompt("Enter your guess"))
while(guess !== n) {
    guess = Number(prompt("Enter your guess"))
}

// Add n natural no
let n = Number(prompt("Enter a no"))
const addition = (n) => {
    if(isNaN(n)) {
        console.log("Invalid")
    }
    else {
        if (n>0)
            {
                let sum = 0
                while(n>0) {
                    let rem = n%10
                    let sum = sum + rem
                    n = Math.floor(n/10)
                }
        console.log(sum)
    }
}
}

// Reverse of a no
let n = Number(prompt("Enter a no"))
const reverse = (n) => {
    let rev = 0
    while(n!==0) {
        var rem = n%10
        rev = rev*10 + rem
        n = Math.floor(n/10)
    }
    return `The result is ${rev}`
}

// Strong no
let n = Number(prompt("Enter a no"))
const getFactorial = (num) => {
    if (num === 0 || num === 1) return 1;
    let result = 1
    for(let i = 2; i<=num; i++) {
        result *= i
    }
    return result
}

const isStrongNo = (n) => {
    let temp = n
    let sum = 0
    while(temp>0) {
        let lastDigit = temp%10
        sum += getFactorial(lastDigit)
        temp = Math.floor(temp/10)
    }
    return sum === n
}

// Test cases
console.log(isStrongNo(145)); // true (1! + 4! + 5! = 145)
console.log(isStrongNo(40585)); // true
console.log(isStrongNo(123)); // false

// Guess the no
let n = Number(prompt("Enter a no"))
const guessGame = (n) => {
    let guess = Number(prompt("Enter your guess"))
    while(n!==guess) {
        guess = Number(prompt("Enter your guess"))
        if(guess > n) {
            alert("Lower")
        }
        else if(guess < n) {
            alert("Higher")
        }
    }
    alert("You won the game")
}
guessGame(n)