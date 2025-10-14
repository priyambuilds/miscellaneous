1.  What are props?
2.  What is destructuring props?
3.  What is Array.map() method in React?
4.  Passing objects as props
5.  State management in React:
    React components only re-render when state managed by hooks (like React components only re-render when state managed by hooks (like useState) changes. Regular variables don't trigger re-renders. Here's what happens:

        1. Component renders initially with state = "Yes"

        2. User clicks button → handleClick runs → state = "Heck yes" executes

        3. Variable changes in memory, but React has no notification mechanism for regular variables

        4. Button continues displaying "Yes" because the component never re-renders

React batches state updates and schedules re-renders for performance optimization. Regular variable mutations bypass this entire system.

```jsx
export default function App() {
  let state = "Yes";

  function handleClick() {
    state = "Heck yes";
  }

  return (
    <main>
      <h1 className="title">Is state important to know?</h1>
      <button onClick={handleClick} className="value">
        {state}
      </button>
    </main>
  );
}
```

**The fix:**

```jsx
import { useState } from "react";

export default function App() {
  const [state, setState] = useState("Yes");

  function handleClick() {
    setState("Heck yes");
  }

  return (
    <main>
      <h1 className="title">Is state important to know?</h1>
      <button onClick={handleClick} className="value">
        {state}
      </button>
    </main>
  );
}
```

useState returns a state value and a setter function. When you call setState("Heck yes"), React queues a re-render with the new value. On the next render, useState returns the updated value, and your button displays correctly.

```jsx
import React from "react";

export default function App() {
  const [count, setCount] = React.useState(0);
  /**
   * Note: if you ever need the old value of state
   * to help you determine the new value of state,
   * you should pass a callback function to your
   * state setter function instead of using
   * state directly. This callback function will
   * receive the old value of state as its parameter,
   * which you can then use to determine your new
   * value of state.
   */
  function add() {
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
  }

  function subtract() {
    setCount(count - 1);
    setCount(count - 1);
    setCount(count - 1);
  }

  return (
    <main className="container">
      <h1>How many times will Bob say "state" in this section?</h1>
      <div className="counter">
        <button
          className="minus"
          onClick={subtract}
          aria-label="Decrease count"
        >
          –
        </button>
        <h2 className="count">{count}</h2>
        <button className="plus" onClick={add} aria-label="Increase count">
          +
        </button>
      </div>
    </main>
  );
}
```
