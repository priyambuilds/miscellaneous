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

// Taking no in arr
let arr = new Array(5)
for(let i = 0; i<arr.length; i++) {
    arr[i] = Number(prompt("Enter a no"))
}

// Reduce
let arr = [10, 11, 12, 13, 14, 15]
let sum = 0
for(let i = 0; i<arr.length; i++) {
    sum += arr[i]
}
console.log(sum)

// Max
let arr = [10, 20, 45, 1, 49, 21]
let max = arr[0]
for(let i = 1; i<arr.length; i++) {
    if(max<arr[i]) {
        max = arr[i]
    }
}
console.log(max)

// 2nd max
let arr = [10, 20, 45, 1, 49, 21]
let max1 = Math.max(arr[0], arr[1])
let max2 = Math.min(arr[0], arr[1])
for(let i = 2; i<arr.length; i++) {
    if(max1<arr[i]) {
        max2 = max1
        max1 = arr[i]
    }
    else if (max2<arr[i]) {
        max2 = arr[i]
    }
}
console.log(`${max1}, ${max2}`)

// reverse array
let arr = [10, 20, 45, 1, 49, 21]
let newArr = []
for(let i = arr.length - 1; i>=0; i--) {
    newArr.push(arr[i])
}
console.log(newArr)

// rev arr 2nd method
let arr = [10, 20, 45, 1, 49, 21]
let i = 0, j = arr.length-1
while(1!=j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
    i++
    j--
}
console.log(arr)

// Left rotation by 1
let arr = [1, 2, 3, 4, 5, 6]
let copy = arr[0]
for(i=0; i<arr.length-1; i++) {
    arr[i] = arr[i+1]
}
arr[arr.length - 1] = copy
console.log(arr)

// Right rotation by 1
let arr = [1, 2, 3, 4, 5, 6]
let copy = arr[arr.length - 1]
for(i=arr.length-1; i>0;i--) {
    arr[i] = arr[i-1]
}
arr[0] = copy
console.log(arr)

// Left and right rotation by k element
// Left rotation
let arr = [1, 2, 3, 4, 5, 6]
let k = Number(prompt("Enter a no"))
k = k%arr.length
for(j=0; j<k;j++) {
    let copy = arr[0]
    for(let i =0; i<arr.length-1; i++) {
        arr[i] = arr[i+1]
    }
    arr[arr.length-1] = copy
}
console.log(arr)

// Right rortation
let arr = [1, 2, 3, 4, 5, 6]
let k = Number(prompt("Enter a no"))
k = k%arr.length
for(j=0; j<k;j++) {
    let copy = arr[arr.length-1]
    for(let i=arr.length-1; i>0; i--) {
        arr[i] = arr[i-1]
    }
    arr[0] = copy
}
console.log(arr)

// Objects
// Object initialization
let fruit = "apple"

let bag = {
    store: "fruit", // Literal key
    [fruit]: 5 // Computed key {dynamic}
}

// Dot notation
let bag = {}
bag.quantity = 6

// Bracket notation (post creationp)
let bat = {}
let dynamicFruit = "banana"

bag[dynamicFruit] = 10
bag["organic apple"] = 3

// Object assign or spread
let bag = []
Object.assign(bag, {orange: 8, grape: 12}) // used when we want to merge multiple properties or object together at once
let updatedBag = {...bag, mango:2} // creates a brand new object combining the old and new values
alert("age" in user) // true, property "age" exists

// for in loop
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};
for(let key in user) {
    // key
    alert(key)
    // values
    alert(user[key])
}

let user = {
    name: "John",
    surname: "Smith",
}
user.name = "Pete"
delete user.name
console.log(user)

const isEmpty = (obj) => {
    for(let key in obj) {
        return false
    }
    return true
}

let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
};

let sum = 0
for(let key in salaries) {
    sum += salaries[key]
}
alert(sum)

let obj = {
  width: 200,
  height: 300,
  title: "My menu"
};
const multiplyNumeric = (obj) => {
    for(let key in obj) {
        if(typeof obj[key] == 'number') {
            obj[key] *= 2
        }
    }
}
multiplyNumeric(obj)
console.log(obj)

// Cloning an object
let user = {
  name: "John",
  age: 30
};

let clone = {}

for(let key in user) {
    clone[key] = user[key]
}

const clone = {...user}

// Object.assign
// It can be used for shallow cloning but failts for deep cloning
const obj1 = { a: 0, b: { c: 0 } };
const obj2 = Object.assign({}, obj1);
console.log(obj2); // { a: 0, b: { c: 0 } }

obj1.a = 1;
console.log(obj1); // { a: 1, b: { c: 0 } }
console.log(obj2); // { a: 0, b: { c: 0 } }

obj2.a = 2;
console.log(obj1); // { a: 1, b: { c: 0 } }
console.log(obj2); // { a: 2, b: { c: 0 } }

obj2.b.c = 3;
console.log(obj1); // { a: 1, b: { c: 3 } }
console.log(obj2); // { a: 2, b: { c: 3 } }

// It can be used to merge objects
const o1 = { a: 1 };
const o2 = { b: 2 };
const o3 = { c: 3 };
const obj = Object.assign({}, o1, o2, o3)
console.log(obj) // { a: 1, b: 2, c: 3 }

// Recursive deep clone
const deepClone = (item) => {

}

// Deep clone
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

const deepClone = (item) => {
    if(typeof item !== 'object' || item === null) {
        return item;
    }
    const copy = Array.isArray(item) ? [] : {}; 
    
    for(let key in item) { 
        copy[key] = deepClone(item[key]);
    }
    
    return copy;
}
const perfectClone = deepClone(user);

console.log(perfectClone);

let clone = structuredClone(user)
alert(user === clone) // This will return false. Because these 2 objects point to entirely different memory locations now.

// Method is simply a function that has been assigned as a property to an object
const user = {
    name: "Priyam",
    age: 23,
    login: function () {
        console.log("Login")
    }
}
user.login()

const user = {
    name: "Priyam",
    age: 23,
    login () {
        console.log("Login")
    }
}
user.login()

let user = {
  name: "John",
  age: 30
};

user.sayHi = function() {
  alert("Hello!");
};

user.sayHi(); // Hello!

// this
// We use this because its dynamic.
// this is simply not connected to an object but a property of every object
// therefore even if we copy the object the methods will still work
// this is evaluated during the runtime, depending on the context
const user = {
    name: "Priyam",
    age: 23,
    login () {
        alert(this.name)
    }
}
user.login()

function makeUser () {
    return {
        name: "pritam",
        ref: this
    }
}
let user = makeUser()
alert(user.ref.name)

// calculator
let calculator = {
    read() {
        this.a = Number(prompt("enter two nos"))
        this.b = Number(prompt("enter two nos"))
    },
    sum() {
        return this.a+this.b
    },
    mul() {
        return this.a*this.b
    }
}

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );

let ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep: function() { // shows the current step
    alert( this.step );
    return this;
  }
};
ladder.up().up().down().showStep().down().showStep();
console.log(ladder)

// Constructor
function User(name, age) {
    this.name = name 
    this.age = age 
    this.isAdmin = false

    this.login = function() {
        console.log(this.name + " logged in.")
    }
}

let user1 = new User("Priyam", 18)
let user2 = new User("Alice", 25)

user1.login()
user2.login()

function User(name, age) {
    this.name = name 
    this.age = age
    this.isAdmin = true
    this.login = function() {
        alert("logged in")
    }
}
user1 = new User("oriyam", 12)
user2 = new User("oriya2m", 11)
user1.login()
user2.login()

let sharedMemory = {}
function A() {
    return sharedMemory
}
function B() {
    return sharedMemory
}

let a = new A();
let b = new B();

alert( a == b ); // true


// Calculator
function Calculator() {
    this.read = function() {
        this.a = Number(prompt("Enter 1st no"))
        this.b = Number(prompt("Enter 1st no"))
    }
    this.sum = function() {
        return this.a+this.b
    }
    this.mul = function() {
        return this.a*this.b
    }
}

let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );

// Accumulator
function Accumulator(val) {
    this.value = val
    this.read = function() {
        this.value += Number(prompt("Enter 1st no"))
    }
}

let accumulator = new Accumulator(1); // initial value 1

accumulator.read(); // adds the user-entered value
accumulator.read(); // adds the user-entered value

alert(accumulator.value); // shows the sum of these values

// Nullish operator
let userScore = 0
let score1 = userScore || 10
let score2 = userScore ?? 10
console.log(score1)
console.log(score2)

// even nos
let arr = []
for(let i = 0; i<=10; i++) {
    if(i%2==0) arr.push(i)
}
console.log(arr)

// repeat untill correct
let input = Number(prompt("enter a no"))
while(input <= 100) {
    input = prompt("Please enter a no greater than 100")
}

// prime nos
let n = Number(prompt("enter a no"))
let arr = []
for(let i = 2; i<n; i++){
    let isPrime = true
    for(j=2; j<=Math.sqrt(i); j++) {
        if (i%j == 0) {
            isPrime = false
            break
        }
    }
    if (isPrime) {
        arr.push(i)
    }
}
console.log(arr)

const num = Number(prompt("enter a no"))
const Binary = (n) => {
    if(n === 0) return "0"
    let binary = ""
    while(n > 0) {
        binary = n%2 + binary
        n = Math.floor(n/2)
    }
    return binary
}
console.log((Binary(num)))

const ran = (min,max) => {
    Math.random() * (max-min) + min
}

let str = "hello"
alert(str[0])
alert(str.at(0))
alert(str[str.length - 1])
alert(str.at(-1))

function Triangle(base, height) {
    this.base = base
    this.height = height
    this.area = function() {
        return 1/2 * this.base * this.height
    }

}
const t = new Triangle(10, 5);
console.log("Triangle area:", t.area());  //OP: Triangle area: 25

function Rectangle (l, b) {
    this.l = l
    this.b = b 
    this.isSquare = function () {
        return this.l === this.b
    }
    this.perimeter = function () {
        return 2*(this.l+this.b)
    }
}

const r1 = new Rectangle(5, 5);
console.log("Is square?", r1.isSquare()); //OP: Is square? true

function Circle (r) {
    this.r = r
    this.diameter = function () {
        return this.r*2
    }
    this.perimeter = function () {
        return 2*(this.l+this.b)
    }
}
const c = new Circle(7);
console.log("Circle diameter:", c.diameter());  //OP: Circle diameter: 14


console.log("Rectangle perimeter:", new Rectangle(4, 6).perimeter());
console.log("Circle perimeter:", new Circle(5).perimeter());

function Rectangle (l, b) {
    this.l = l
    this.b = b 
    this.isSquare = function () {
        return this.l === this.b
    }
    this.perimeter = function () {
        return 2*(this.l+this.b)
    }
    this.hasSameArea = function (r2) {
        const r1area = this.l * this.b
        const r2area = r2.l * r2.b
        return r1area === r2area
    }
}
const r1 = new Rectangle(4, 5);
const r2 = new Rectangle(10, 2);
console.log("Same area?", r1.hasSameArea(r2)); //Same area? true

const ucFirst = (str) => {
    if (!str) return str
    return str[0].toUpperCase() + str.slice(1)
}
ucFirst("john") == "John";

const checkSpam = (str) => {
    return str.toLowerCase().includes("viagra") || str.toLowerCase().includes("xxx");
}
checkSpam('buy ViAgRA now') == true
checkSpam('free xxxxx') == true
checkSpam("innocent rabbit") == false

const truncate = (str, maxlength) => {
    return str.length > maxlength
    ? str.slice(0, maxlength - 1) + "…"
    :str
}
truncate("What I'd like to tell on this topic is:", 20) == "What I'd like to te…"
truncate("Hi everyone!", 20) == "Hi everyone!"

const extractCurrencyValue = (str) => {
    return +str.slice(1)
}
alert( extractCurrencyValue('$120') === 120 ); // true

// Array operations
let styles = ["Jass", "Blues"]
styles.push("Rock-n-Roll")
let mid = Math.floor(styles.length / 2)
styles[mid] = "Classics"
alert(styles.shift())
styles.unshift("Rap", "a")

const sumInput = () => {
    let arr = []
    let sum = 0
    while(true) {
        let input = prompt("enter a no")
        if(input === null || input === '' || !isFinite(input)) {
            break
        }
        arr.push(+input)
    }
    for(i of arr) {
        sum += i
    }
    return sum
}
console.log(sumInput())

// map
const arr = [1, 2, 3, 4]
const mapped = Array.map((x) => x*2)

// dash to camel
const camelize = (str) => {
    return str.split("-").map((word, index) => {
        return index === 0 ? word : word[0].toUpperCase() + word.slice(1)
    }).join('')
}
camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';

// Filter range
const filterRange = (arr, a, b) => {
    let newArr = []
    for(i of arr) {
        if(i>=a && i<=b) newArr.push(i)
    }
    return newArr
}

const filterRange = (arr, a, b) => {
    return arr.filter(i => (a <= i && i<=b))
}

let arr = [5, 3, 8, 1];
let filtered = filterRange(arr, 1, 4);
alert( filtered ); // 3,1 (matching values)
alert( arr ); // 5,3,8,1 (not modified)

// filter range in place
const filterRangeInPlace = (arr, a, b) => {
    for(let i = arr.length-1; i>=0; i--) {
        if(a>arr[i] || arr[i]>b) {
            arr.splice(i, 1)
        }
    }
}
let arr = [5, 3, 8, 1];
filterRangeInPlace(arr, 1, 4); // removed the numbers except from 1 to 4
alert( arr ); // [3, 1]

let arr = [5, 2, 1, -10, 8];
const sortDec = (arr) => {
    
}
alert( arr ); // 8, 5, 2, 1, -10

function x() {
    var a = 7
    function y() {
        console.log(a)
    }
    return y
}


let obj = { 
    food: [10, 20, 30], 
    travel: [5, 15], 
    bills: [40, 60] 
}
const sumObj = (obj) => {
    for(key in obj) {
        obj[key] = obj[key].reduce((accumulator, currentval) => {
            return accumulator + currentval
        }, 0)
    }
    return obj
}
sumObj(obj)

let arr = ["apple", "banana", "apple", "orange", "banana", "apple"]
const wordOcc = (arr) => {
    let count = arr.reduce((acc, item) => {
        if(acc[item] === undefined) {
            acc[item] = 1
        } else {
            acc[item] += 1
        }
        return acc
    }, {})
    return count
}
console.log(wordOcc(arr))

let obj = { a: "x", b: "y", c: "z" }
const swapKV = (obj) => {
    let newobj = {}
    for(key in obj) {
        newobj[obj[key]] = key
    }
    return newobj
}
console.log(swapKV(obj))

let obj = { a: 10, b: 50, c: 20 }
const largestVal = (obj) => {
    let arr = Object.values(obj)
    let numArr = []
    for(let i = 0; i<arr.length-1; i++) {
        if(i%2 === 1) {
            numArr.push(i)
        }
    }
    console.log(arr)
    console.log(numArr)
    return Math.max(...numArr)
}
console.log(largestVal(obj))

let obj = ["apple", "banana", "apple", "orange", "banana", "apple"]
const occr = (obj) => {
    let newObj = obj.reduce((item, acc) => {
        if(acc[item] === undefined) {
            acc[item] = 1
        } else {
            acc[item] +=1
        }
    })
}

let obj = { food: [10, 20, 30], travel: [5, 15], bills: [40, 60] };
const sumVal = (obj) => {
    for (key in obj) {
        obj[key] = obj[key].reduce((acc, item) => {
            return acc + item
        }, 0)
    }
    return obj
}
sumVal(obj)

const arr = ["apple", "banana", "apple", "orange", "banana", "apple"]

const wordCount = arr.reduce((acc, word) => {
    if (acc[word] === undefined) {
        acc[word] = 1;
    }
    else {
        acc[word]++
    }
    return acc;
}, {})

console.log(wordCount)

const obj = { a: "x", b: "y", c: "z" }
const swapObj = (obj) => { 
    let temp = {}
    for (item in obj) {
        const value = obj[item]
        temp[value] = item
    }
    return temp
}
console.log(swapObj(obj))

const obj = { a: 10, b: 50, c: 20 }
const getLargest = (obj) => {
    let maxKey = null;
    let maxValue = -Infinity

    for (item in obj) {
        const currentVal = obj[item]
        if (currentVal > maxValue) {
            maxValue = currentVal
            maxKey = item
        }
    }
    return maxKey
}
console.log(getLargest(obj))

const obj = { fruits: ["apple", "banana"], veggies: ["carrot", "pea"] }
const flatten = (obj) => {
    const arr = []
    for (const item in obj) {
        arr.push(...obj[item])
    }
    return arr
}
console.log(flatten(obj))

const obj = [
  { name: "A", city: "Delhi" },
  { name: "B", city: "Mumbai" },
  { name: "C", city: "Delhi" }
]
const group = (arr) => {
    let output = {}
    for (const item of arr) { 
        if (!output[item.city]) {
            output[item.city] = []
        }

        output[item.city].push(item.name)
    }
    return output
}
console.log(group(obj))

const obj = { a: 20, b: 60, c: 40, d: 90 }

const filterVal = (obj) => {
    const temp = {}
    for (item in obj) {
        if (obj[item] > 50) {
            const currentVal = item
            temp[item] = obj[item]
        }
    }
    return temp
}
filterVal(obj)

const obj = { A: [80, 90], B: [70, 75, 85] }

const highest = (obj) => {
    let highestKey = null;
    let highestVal = -Infinity;
    for (const item in obj) {
        obj[item] = obj[item].reduce((acc, key) => {
            return acc + key / obj[item].length
        }, 0)
        if (obj[item] > highestVal) {
            highestVal = obj[item]
            highestKey = item
        }
    }
    return highestKey
}

console.log(highest(obj))


const unique = (obj) => {
    let arr = []
    for (item in obj) {
        arr.push(...obj[item])
    }
    return [...new Set(arr)]
}

console.log(unique(obj))

const obj = { x: [1,2,3], y: [2,3,4], z: [4,5] }
const fastUnique = [...new Set(Object.values(obj).flat())]
console.log(fastUnique)

let obj = { name: "Rahul", age: 23, city: "Noida" }, ["name","city"]

