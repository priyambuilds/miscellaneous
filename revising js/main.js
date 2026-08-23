let a = 1;
let b = 2;
console.log(a + b);
console.log("sum of 10 + 20 is" + a + b); // this becomes a string. It wont add it will concatinate
console.log(a + b + "sum of 10 + 20 is"); // This will output 30 is sum of 10 + 20.
console.log("sum of 10 + 20 is" + (a + b));
console.log(`sum of 10 + 20 is ${a + b}`);
console.log("1" + 1); // 11
console.log("1" - 1); // 0

// accept and answer
let a = 1;
let b = 2;
let c = a;
a = b;
b = c;

// a/b = quotient
// a%b = remainder

// There are two types of incerements of ++ and -- namely pre and post
let a = 10;
let b = a++;
console.log(a, b); // 11, 10

let a = 10;
let b = ++a;
console.log(a, b); // 11, 11

let a = 11, b = 22
let c = a + b + a++ + b++ + ++a + ++b
console.log("a=" + a)
console.log("b=" + b)
console.log("c=" + c)

let a = true
a++ // output will be 2

let a = 10
a++ // works

let  a = 10++ // this will throw an error because 10 is a constant.

let a = 10
let b = ++(a++)

console.log(Math.pow(2, 3)) // 2^3 = 8
console.log(Math.sqrt(16)) // 4 (square root of 16)
console.log(Math.cbrt(16))
console.log(Math.abs(-10)) // 10
console.log(Math.max(10, 20, 30))
console.log(Math.min(10, 20, 30))
console.log(Math.trunc(Math.random()*9000)+1000)

let a = 89.92932
console.log(Number(a.toFixed(2))) // output will be 89.92

// Calculate the area and perimeter of a rectangle
const area = (a, b) => a*b
const perimeter = (a, b) => 2*(a+b)
console.log(area(10, 20))
console.log(perimeter(10, 20))

// Calculate the area of a triangle by herons formula
const tarea = (a, b, c) => {
    if (a+b > c && a+c > b && b+c > a) {
        const s = 1/2 * (a + b + c)
        const area = Math.sqrt(s*(s-a)*(s-b)*(s-c))
        return area
    }
    else {
        return "Invalid nos"
    }
} 

console.log(`area of the triangle is ${tarea(10, 20, 30)}`)

// Calculate the circumferance of a circlee
const circumferance = (r) => (2*Math.PI*r).toFixed(2)

// Discount
const discount = (price) => {
    if (typeof price !== 'number' || price < 0) {
        return "Please enter a valid number"
    }

    const rate = (price >= 0 && price <= 5000) ? 0
                : (price > 5000 && price <= 7000) ? 0.05
                : (price > 7000 && price <= 9000) ? 0.10
                : 0.2

    const finalPrice = price - (price * rate)

    return finalPrice
}

console.log(discount(1000))

// Units
let unit = 100
let remainingUnits = unit
let totalBill = 0
const bijliBill = (unit) => {
    if (typeof unit !== 'number' || unit <= 0) {
        return "Please enter a valid number"
    }
    if (remainingUnits > 0) {
        totalUnitsInThisTier = Math.min(remainingUnits, 100)
        remainingUnits -= totalUnitsInThisTier
        totalBill += totalUnitsInThisTier * 4.2
    }
    if (remainingUnits > 0) {
        totalUnitsInThisTier = Math.min(remainingUnits, 101, 200)
        remainingUnits -= totalUnitsInThisTier
        totalBill += totalUnitsInThisTier * 6
    }
    if (remainingUnits > 0) {
        totalUnitsInThisTier = Math.min(remainingUnits, 201, 400)
        remainingUnits -= totalUnitsInThisTier
        totalBill += totalUnitsInThisTier * 8
    }
    if (remainingUnits > 0) {
        totalBill += remainingUnits * 13
    }

}

let amt = 0
let d500 = 0
let d200 = 0
let d100 = 0
let d50 = 0
let d20 = 0
let d10 = 0
let d5 = 0
let d2 = 0
let d1 = 0
// Note denomination
const den = (amt) => {
    let remainingamt = amt
    if (remainingAmount >= 500) {
        d500 += Math.floor(remainingamt/500)
        remainingamt = remainingamt%500
    }
    if (remainingAmount >= 200) {
        d500 += Math.floor(remainingamt/200)
        remainingamt = remainingamt%200
    }
    if (remainingAmount >= 500) {
        d500 += Math.floor(remainingamt/500)
        remainingamt = remainingamt%500
    }
    if (remainingAmount >= 500) {
        d500 += Math.floor(remainingamt/500)
        remainingamt = remainingamt%500
    }
    if (remainingAmount >= 500) {
        d500 += Math.floor(remainingamt/500)
        remainingamt = remainingamt%500
    }
    if (remainingAmount >= 500) {
        d500 += Math.floor(remainingamt/500)
        remainingamt = remainingamt%500
    }
    if (remainingAmount >= 500) {
        d500 += Math.floor(remainingamt/500)
        remainingamt = remainingamt%500
    }
}

// bijli bill
const bill = (unit) => {
    if (typeof unit !== 'number' || unit < 0) {
        return "Please enter a valid number"
    }

    let totalBill = 0
    let remainingUnits = unit

    if (remainingUnits >= 0) {
        totalUnitsInThisTier = Math.min(remainingUnits, 100)
        remainingUnits -= totalUnitsInThisTier
        totalBill += totalUnitsInThisTier * 4.2
    }
    if (remainingUnits >= 0) {
        totalUnitsInThisTier = Math.min(remainingUnits, 101, 200)
        remainingUnits -= totalUnitsInThisTier
        totalBill += totalUnitsInThisTier * 6
    }
    if (remainingUnits >= 0) {
        totalUnitsInThisTier = Math.min(remainingUnits, 201, 400)
        remainingUnits -= totalUnitsInThisTier
        totalBill += totalUnitsInThisTier * 8
    }
    if (remainingUnits >= 0) {
        totalBill += remainingUnits*13
        remainingUnits -= remainingUnits
    }
    return totalBill
    
}

console.log(bill(350))

// Note deminonation
const denomination = (amount) => {
    if (typeof amount !== 'number' || amount <= 0) {
        return "Please enter a valid number"
    }
    let d500 = 0
    let d200 = 0
    let d100 = 0
    let d50 = 0
    let d20 = 0
    let d10 = 0
    let d5 = 0
    let d2 = 0
    let d1 = 0
    let remainingAmount = amount

    if (remainingAmount >= 500) {
        d500 += Math.floor(remainingAmount/500)
        remainingAmount = remainingAmount%500
    }
    if (remainingAmount >= 200) {
        d200 += Math.floor(remainingAmount/200)
        remainingAmount = remainingAmount%200
    }
    if (remainingAmount >= 100) {
        d100 += Math.floor(remainingAmount/100)
        remainingAmount = remainingAmount%100
    }
    if (remainingAmount >= 50) {
        d50 += Math.floor(remainingAmount/50)
        remainingAmount = remainingAmount%50
    }
    if (remainingAmount >= 20) {
        d20 += Math.floor(remainingAmount/20)
        remainingAmount = remainingAmount%20
    }
    if (remainingAmount >= 10) {
        d10 += Math.floor(remainingAmount/10)
        remainingAmount = remainingAmount%10
    }
    if (remainingAmount >= 5) {
        d5 += Math.floor(remainingAmount/5)
        remainingAmount = remainingAmount%5
    }
    if (remainingAmount >= 2) {
        d2 += Math.floor(remainingAmount/2)
        remainingAmount = remainingAmount%2
    }
    if (remainingAmount === 1) {
        d1 += Math.floor(remainingAmount/1)
        remainingAmount = remainingAmount%1
    }
    return console.log(`total demonimation for ${amount} is ${d500}, ${d200}, ${d100}, ${d50}, ${d20}, ${d10}, ${d5}, ${d2}, ${d1}`)
}

// Sum of n natural nos
let n = 12
for(i=0; i<=12; i++) {
    let newNum = 0
    newNum += i
}

denomination(15063)

// Factors of a Number
let factors = []
const fac = (no) => {
    for (i= 0; i<= no/2 ; i++) {
        if (no%i == 0) {
            factors.push[i]
        }
    }
    factors.push(no)
    return factors
}

// Check for prime no
let no = 99
const primeno = (no) => {
    if(no == 2 || no == 3 || no == 5) return true
    if(no%2 == 0 || no%3 == 0 || no% 5 == 0) return false
    for (i = 7; i<= Math.sqrt(no); i++) {
        if (no%i ==0) return false
    }
    return true
}


// Factors of a Number
const calculateFactors = (number) => {
    // Guard clause for edge cases
    if (typeof number !== 'number' || number <= 0) return "Please enter a positive integer";

    let result = [];
    
    // Boundary fixed: loop up to exactly half the number
    for (let i = 1; i <= number / 2; i++) {
        if (number % i === 0) {
            result.push(i); // Array syntax fixed
        }
    }
    
    // A number is always a factor of itself
    result.push(number); 
    
    return result; // Output fixed
};

console.log(calculateFactors(50)); 
// Output: [1, 2, 5, 10, 25, 50]

// Check for prime no
const prime = (no) => {
    if (typeof no !== 'number' || no <= 1) return false;
    if(no=== 2 || no === 3 || no === 5) return true
    if(no%2 ==0 || no%3 ==0 || no%5 == 0) return false
    const limit = Math.sqrt(no)
    for(let i = 7; i<=Math.floor(limit); i+=2) {
        if(no%i === 0) return false
    }
    return true
}
prime(7) 

// start;
// while(end) {
//     code
//     change;
// }
let i = 1
while (i<23) {
    console.log(i)
    i++
}

let ans = prompt("kuch bhi dedo")
while (ans !== 'exit') {
    ans = prompt("kuch bhi dedo")
}

// Sum of digits
const sumofdig = (no) => {
    let sum = String(no).split('').map(Number).reduce((a, b) => a+b)
    return sum
}
console.log(1234)

// Rev of a no
const rev = (no) => {
    let reverse = String(no).split('').reverse().join('')
    return reverse
}
console.log(rev(123))

// Sum of digits
const sumOfDigits = (number) => {
    let sum = 0
    let newNo = number
    while(newNo>0) {
        sum += newNo%10
        newNo = Math.floor(newNo/10)
    }
    return sum
}
sumOfDigits(123)

// Reverse of a no
const reverse = (num) => {
    let reverseNo = ""
    let newNo = num
    while(newNo>0) {
        reverseNo+= newNo%10
        newNo = Math.floor(newNo/10)
    }
    return Number(reverseNo)
}
reverse(1999)

// strong no
const strong = (no) => {
    let sumfact = String(no).split('').map((n) => {
        n = Number(n)
        let fact = 1
        for (let i = 2; i<=n; i++) {
            fact *= i
        }
        n = fact
        return n
    }).reduce((a, b) => a+b)
    if (sumfact == no) return true
    return false
}
console.log(strong(145))


// Strong no
const strongNo = (num) => {
    let factSum = 0
    let newNo = num
    while(newNo>0) {
        let digit = newNo%10
        let fact = 1
        for(let i = digit; i>1; i--) {
            fact *= i
        }
        factSum += fact
        newNo = Math.floor(newNo/10)
    }
    return factSum === num
}

// no guesser
let random = Math.floor(Math.random()*100 +1)
let guess = 0
let attempts = 3
while(guess !== random && attempts > 0) {
    guess = prompt("enter a no")
    if (guess == 0) break
    if (guess > random) {
        alert(`a bit too high you have ${attempts - 1} left`)
    }
    else if (guess < random) alert(`a bit too low you have ${attempts - 1} left`)
    attempts--
}
if (guess == random) alert

// Number guesser
// let random = Math.floor(Math.random()*100 + 1)
// let guess = 0
// let attempts = 3
// let  remainingAttempts = 0
// while (guess !== random && attempts !== remainingAttempts) {
//     guess = Number(prompt("Guess the no"))
//     if(guess==0) break
//     if (guess>random) alert(`Too High you have ${attempts-remainingAttempts - 1} left`)
//     else if (guess<random) alert(`Too Low ${attempts-remainingAttempts - 1} left`)
//     remainingAttempts++
//     }
// if (guess==random) alert("You won the game")
// if(attempts==remainingAttempts) alert("You have lost all attempts")

// Array is a linear data structure which stores multiple values in a continuous manner
// let arr = []
for(let i = 0; i<5; i++) {
    ans  = Number(prompt("Enter a no"))
    arr.push(ans)
}
console.log(arr)

// sum
let arr = [10, 20, 30, 40]
let sum = 0
for(let i = 0; i<arr.length; i++) {
    sum += arr[i]
}

// let arr = [10, 20, 30, 40]
let sum = 0
for(let i = 0; i<arr.length; i++) {
    sum += arr[i]
}
console.log(arr, sum)

// Max
// let arr = [10, 20, 30, 40, 70, 10, 5, 2]
// let max = arr[0]
// for (i=0; i<arr.length; i++) {
//     if(max > arr[i]) continue
//     else if (max <arr[i]) max = arr[i]
// }

let arr = [10, 20, 30, 40, 70, 10, 5, 2]
let uniqueArr = [...new set(arr)]
let max1 = arr[0]
let max2 = arr[1]
for (i=0; i<arr.length; i++) {
    if(max1 > arr[i]) continue
    else if (max1 <arr[i]) max1 = arr[i]
}
for (i=0; i<arr.length; i++) {
    if(arr[i] < max2 <max1) continue
    else if (arr[i] > max2 < max1) max2 = arr[i]
}

// Max
// let arr = [743, 564, 2674 ,56 ,454 ,4564, 4543, 56643, 124, 24553, 34643, 3546, 3454, 3 , 543]
// let max = arr[0]
for(let i = 1; i<arr.length; i++) {
    if(max>arr[i]) continue
    else if (arr[i] > max) max = arr[i]
}
console.log(max)

// 2nd max
// let arr = [743, 564, 2674 ,56 ,454 ,4564, 4543, 56643, 124, 24553, 34643, 3546, 3454, 3 , 543]
let max1 = arr[0]
let max2 = arr[1]
for(let i = 1; i<arr.length; i++) {
    if(max1>arr[i]) continue
    else if (arr[i] > max1) max1 = arr[i]
}
if(max2 == max1) max2 = arr[2]
for(let i = 2; i<arr.length; i++) {
    if(max2>arr[i]) continue
    else if (arr[i] > max2 && arr[i] < max1) max2 = arr[i]
}
console.log(max1, max2)

// reverse
let arr = [743, 564, 2674 ,56 ,454 ,4564, 4543, 56643, 124, 24553, 34643, 3546, 3454, 3 , 543]
for (i=arr.length -1; i>=0; i++) {
    let newarr = []
    newarr.push(arr[i])
}
// reverse
// let arr = [743, 564, 2674 ,56 ,454 ,4564, 4543, 56643, 124, 24553, 34643, 3546, 3454, 3 , 543]
// let newarr = []
for(let i = arr.length - 1; i>=0; i--) {
    newarr.push(arr[i])
}
console.log(newarr)

// left rotation 
// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// let newarr = []
// let rotation = k
// const rot = (arr, k) => {
//     for(i=k; i<arr.length; i++) {
//         newarr.push(arr[i])
//     }
//     for(i=0; i<nl i++) {
//         newarr.push(arr[i])
//     }
//     return newarr
// }

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let newarr = []
let rotation = 2
const rot = (arr, k) => {
    for(let i = arr.length - k; i<arr.length; i++) {
        newarr.push(arr[i])
    }
    for(i = 0; i <arr.length - k; i++) {
        newarr.push(arr[i])
    }
    return newarr
}
console.log(rot(arr, rotation))

// Left rotation by k element
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let newarr = []
let n = 2
const rotation = (arr, n) => {
    for(let i =n; i<arr.length;i++ ) {
        newarr.push(arr[i])
    }
    for(let i =0; i<n;i++ ) {
        newarr.push(arr[i])
    }
    return newarr
}
console.log(rotation(arr, n))

let str = "priyam"
for(i=0; i<str.length; i++) {
    console.log(str[i])
}

let str = "priyam"
let reverse = str.split('').reverse().join('')
console.log(reverse)
for(i = str.length - 1; i>=0; i--) {
    reverse += str[i]
}

// print str in new line
// let str = "priyam"
for(i=0; i<str.length; i++) {
    console.log(str[i])
}

// reverse
let str = "priyam"
let reversee = ""
for(let i=str.length-1; i>=0; i--) {
    reversee += str[i]
}
console.log(reversee)



// Palindrome
let palindrome = "priyam"
let revpalindrome =  ""
const checkPalindrome = (palindrome) => {
for(let i=palindrome.length-1; i>=0; i--) {
    revpalindrome += palindrome[i]
}
return revpalindrome == palindrome ? true : false
return revpalindrome
}
console.log(checkPalindrome(palindrome), revpalindrome)

// toggle
let str = "AbCdeFGhI"
let toggled = str.split('').map((n) => {
    if(n == n.toUpperCase()) {
        n = n.toLocaleLowerCase()
    }
    else if(n == n.toLowerCase()) {
        n = n.toUpperCase()
    }
    return n
}).join('')
console.log(toggled)

// toggle
let toggle = "AbCdeFGhI"
const toggleStr = (toggle) => {
    let newStr = ""
    for(let i =0; i<toggle.length; i++) {
        if(toggle[i] === toggle[i].toUpperCase()) {
            newStr += toggle[i].toLowerCase()
        }
        else {
            newStr += toggle[i].toUpperCase()
        }
    }
    return newStr
}
console.log(toggleStr(toggle))

let frequency = "hellowwppererraipe"
let obj = {}
const freq = (str) => {
    for(i=0; i<str.length;i++) {
        let char = str[i]
        if(obj[char]) {
            obj[char]++
        }
        else obj[char] = 1
    }
    return obj
}

// Frequency
let frequency = "hellowwppererraipe"
let object = {}
const strFrequency = (frequency) => {
    for(i=0; i<frequency.length; i++) {
        let char = frequency[i]
        if(object[char]) {
            object[char]++
        }
        else {
            object[char] = 1
        }
    }
    return object
}
console.log(strFrequency(frequency))

// HCF
const factors =  (n) => {
    let factors = []
    for(let i = 1; i<=Math.floor(n/2); i++) {
        if (n%i == 0) factors.push(i)
    }
    factors.push(n)
    return factors
}

const hcf = (n1, n2) => {
    let fact1 = factors(n1)
    let fact2 = factors(n2)
    for(let i=fact1.length - 1; i>=0; i--) {
        if(fact2.includes(fact1[i])) {
            return fact1[i]
        }
    }
    return 1
}

console.log(hcf(46, 28))
// For each
// For each is used to do operations on the existing array
let num = [1, 2, 3, 4, 5, 6]
num.forEach((element) => {
    console.log(element*element)
})
// From
let namee = "Priyam"
let from = Array.from(namee)
// For of
for(let i of num) {
    console.log(i)
}

// Map
// Map creates a new array
let arr = [12, 123, 23, 45]
let abc = arr.map((value, index, array) => {
    console.log(value, index, array)
    return value + index
})
console.log(a)

// Filter
let arr2 = [12 ,24 ,2, 1, 23, 12]
let abc2 = arr.filter((value) => {
    return value<10
})
console.log(abc2)

// Reduce
// Reduces an array to a single value
let arr3 = [1, 2, 3 ,5 , 54, 3, 4]
let abc3 = arr3.reduce((h1, h2) => {
    return h1+h2
})
console.log(abc3)

// Question

let arr = []
const addArr = (arr) => {
    let ans
    while(ans !== 0) {
        ans = Number(prompt("enter a no"))
        arr.push(ans)
    }
    return arr
}

// let arr5 = []
// const addArr = (array) => {
//     let input
//     while (input !== 0) {
//         input = Number(prompt("enter a number"))
//         array.push(input)
//     }
//     return array
// }
// console.log(addArr(arr5))

let arr6 = [10, 200, 182, 182, 1029, 100, 1283, 120]
let div = arr6.filter((n) => {
    if (n%10 == 0) return n
})
console.log(div)

// Divisible by 10
// let arr6 = [10, 200, 182, 182, 1029, 100, 1283, 120]
// const divisbleby10 = (arr) => {
//     let filtered = arr6.filter((value) => {
//         return value%10 === 0
//     })
//     return filtered
// }
// console.log(divisbleby10(arr6))

// Square
let arr7 = [10, 200, 182, 182, 1029, 100, 1283, 120]
let square = arr7.map((value) => {
    return value*value
})
console.log(square)

// Guess
let randomVar = Math.floor(Math.random()*100 + 1)
let guessed = 0
let maxAttempts = 5
while(guessed !== randomVar && maxAttempts !== 0) {
    guessed = Number(prompt("Enter a no"))
    if (guessed== 0) break
    if(guessed > randomVar) {
        alert(`A bit too high you have ${maxAttempts -1} left`)
    }
    else if (guessed<randomVar) alert(`you guessed a bit too low you have ${maxAttempts -1} left`)
    maxAttempts--
}
if(guessed == randomVar) alert("You won the game")

// Reverse each word in a sentence
// let str1 = "priyam bhai kese ho"
// const reverseStr = (str) => {
//     let copyStr = str.split(" ")
//     return copyStr.map((word) => {
//         let reversedWord = ""
//         for(let i =word.length - 1; i>=0; i--) {
//             reversedWord += word[i]
//         }
//         return reversedWord
//     }).join(" ")
// }
// console.log(reverseStr(str1))

let str = "Priyam bhai kese ho"
let rev = str.split(' ').map((n) => n.split('').reverse().join('')).join(' ')
console.log(rev)
// Better version
let str1 = "priyam bhai kese ho"
const reverseStr = (str) => {
    return copyStr = str.split(" ").map((word) => word.split("").reverse().join("")).join(" ")
}
console.log(reverseStr(str1))

let num = 1234
let rev = Number(String(num).split('').reverse().join(''))
console.log(rev)

let num = 1234
const rev = (n) => {
    let strnum = String(num)
    let reversed = ""
    for(i=strnum.length - 1; i>=0; i--) {
        reversed += strnum[i]
    }
    return Number(reversed)
}

// reverse a no
// let num1 = 1234
// const reverseNum = (num) => {
//     let strnum = num1.toString()
//     let reversed = ""
//     for(let i= strnum.length - 1; i>=0; i--) {
//         reversed += strnum[i]
//     }
//     return Number(reversed)
// }
// console.log(reverseNum(num1))

// Palindrome
let palindrome1 = "madam"
const verifyPalindrome = (pal) => {
    let reverse = pal.split().map((word) => word.split("").reverse().join("")).join("")
    return reverse == pal ? true : false
}
console.log(verifyPalindrome(palindrome1))

let str = "priyam dey"
let alphabetcal = str.split(' ').join('').split('').sort().join('')
console.log(alphabetcal)

// Arrange in aplhabetical order
let str2 = "priyam dey"
const ascendingOrder = (word) => {
    let arr = word.split().map((word) => word.split("").sort().join("")).join("")
    return arr
}
console.log(ascendingOrder(str2))

let str = "priyam is a good boy"
let uppercase = str.split(' ').map((n) => {
    let head = n[0].toUpperCase()
    let tail = n.slice(1)
    return head + tail
}).join(' ')
console.log(uppercase)

// Uppercase word
let str3 = "priyam is a good boy"
let upperStr = (str) => {
    return str.split(" ").map((word => {
        let head = word[0].toUpperCase()
        let tail = word.slice(1)
        return head + tail
    })).join(" ")
}
console.log(upperStr(str3))

// Occurance
let str4 = "priyam is a good boy"
const occurances = (str) => {
    obj = {}
    str = str.split(" ").join("")
    for(let i =0; i<str.length; i++) {
        let char = str[i]
        if(obj[char]) {
            obj[char]++
        }
        else obj[char] = 1
    }
    return obj
}
console.log(occurances(str4))

let arr8 = [1, 2, 3, 4, 5, 6, 6,8]
console.log(arr8.reduce((a1, a2) => a1+a2))

// add str array
let arr9 = ["pruam", 9, 293, 29, "good", 22, "boy"]
let arr9filtered = arr9.filter((i) => {
    return typeof i == 'number'
}).reduce((a1, a2) => a1+a2)
console.log(arr9filtered)

// clone array

let obj = ["apple", "banana", "apple", "orange", "banana", "apple"]
const occr = (obj) => {
    let newObj = {}
    obj.reduce((item, acc) => {
        
    })
}