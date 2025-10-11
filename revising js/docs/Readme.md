# What happes when you run JS?

Everything in Javascript happens inside an "**execution context**"

Javascript is a "**synchronous single-threaded language**" -> JS can only execute **one command at a time and in a specific order**.

## 1. Evrything happens inside an Execution Context

```javascript
var n = 2;
function square(num) {
  var ans = num * num;
  return ans;
}
var square2 = square(n);
var square4 = square(4);

// num here is the parameter and n is the argument
```

When you run this code, a **global execution context** is created.
It is created in 2 phases.

---

1. **Memory creation** - allocation of memory to all the `variables` and `functions`
   <img src="image.png" width="50%">

   `Undefined` for `variables` and the whole code for the `functions`.

2. **Code execution** - JS now executes the code in the order it is written line by line.
   Here, the value for the `variable` `n` is set to `2` and the function `square` is called with the value of `n` as an argument.
   - When you invoke a function, i.e `square(n)`, a new temporary execution context is created different from the global execution context.
   - This too has 2 phases:
     - **Memory creation & code execution** - Memory is allocated for the `variables` and the `function` inside the function `square` and the code inside the function is executed.
     - **Returning the value** - The value returned by the function is stored in the `variable` `square2` and the value is returned to the caller.
     - The execution context is **destroyed**.

This is what the whole process looks like:

<img src="image-2.png" width="50%">

## 2. Call stack:

<img src="image-3.png" width="100"> -> <img src="image-4.png" width="100"> -> <img src="image-5.png" width="100"> -> <img src="image-3.png" width="100">

so, the call stack is a stack of execution contexts. Whenever a function is called, a new execution context is created and the previous execution context is pushed onto the stack. When the function returns, the previous execution context is popped off the stack.

Here's a practical example:
GetName is the global context, anonymous is the temporary execution context created when you call GetName. At line 9, this context after execution popps off the stack and the execution context is destroyed.

<img src="image-12.png" width="40%"> -> <img src="image-13.png" width="40%">

# Hoisting in JS:

![alt text](image-6.png)
Normally, this type of code would cause an error in some other language. But in JS it doesn't.
![alt text](image-7.png)
Here if we remove the `var`, its resulting in an error of not defined.
Not defined and undefind are two different things.

Even before the code starts executing, the memory is allocated to the variables and functions.

<img src="image-8.png" width="40%"> <img src="image-9.png" width="40%">

If we replace the function iwth a fatarrow, it throws an error because js now sees this function as a variable

<img src="image-10.png" width="50%"> <img src="image-11.png" width="40%">

# How functions work in JS

Every execution context whether global or local has its own memory space (kind of like its own virtual enviornemnt).

<img src="image-14.png" width="40%"> -> <img src="image-15.png" width="40%"> -> <img src="image-16.png" width="40%">

Practical example:

<img src="image-18.png" width="40%"> -> <img src="image-19.png" width="40%"> -> <img src="image-20.png" width="40%"> -> <img src="image-21.png" width="40%"> -> <img src="image-22.png" width="40%"> -> <img src="image-23.png" width="40%"> -> <img src="image-24.png" width="40%">

# The scope chain: Scope & Lexical Environment in JS:

**Scope means where you can access a specific variable or a function in the code.**

![alt text](image-25.png)

**Lexical Environment** is the local memory along with the lexical env of its parent. Lexical means **heirarchy**. For ex- you can say here that `c()` is **lexically** sitting inside `a()` & `a()` is lexically sitting inside the global scope.

![alt text](image-26.png)

**Scope chain** is the chain of **lexical environments** and their **parent references**.
This is what the scope chain looks practically:

<img src="image-27.png" width="50%">

# Let and Const in JS:

The `let` and `const` declerations are **Hoisted**.

`var` is assigned to the global memory space but `let` and `const` is assigned to a seperate memory space.

<img src="image-28.png" width="50%">

Here the value of `let` has not be initialized till line 3. This is called the **temporal dead zone**. That phase, from **hoisting**, **till its initialized** with some value, its a temporal dead one

<img src="image-29.png" width="50%">

If you try to access the value of `let` before it is initialized, it will throw an error.

<img src="image-30.png" width="50%">

If you try to access `a`, unlike `b` it will be `undefined` because `let` and c`onst` variables are asigned to **seperate memory spaces**.

<img src="image-31.png" width="50%">

# Closures:

**Closure** is jsut a function bind together with its .

<img src="image-32.png" width="50%">

Here we are returning `y` inside `x` function and trying to access `y` at a different part of the code. Here's where **closure** come into play. Even though `x` doesnt exists anymore, it still remembers its lexical scope.
So in other words, when you returned that function `y`, not just that function was returned but a **closure** enclosed function along with its **lexiacal scope** was returned.

<img src="image-33.png" width="50%">

<img src="image-34.png" width="50%">
