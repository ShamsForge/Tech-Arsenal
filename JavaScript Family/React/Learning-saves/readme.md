# React Course Topics

---

## Chapter 1: Components

**Explanation:**  
Components are reusable, independent pieces of UI in React. They can be functions or classes and help organize the UI into smaller, manageable parts.

**Code Example:**
```jsx
function Welcome() {
  return <h1>Hello, World!</h1>;
}
```

**Use Cases:**
1. Creating a header, footer, or sidebar for a website.
2. Building a reusable button component.

---

## Chapter 2: Lists

**Explanation:**  
Lists in React are used to render multiple items dynamically using JavaScript arrays and the `.map()` method.

**Code Example:**
```jsx
const items = ['Apple', 'Banana', 'Cherry'];
function FruitList() {
  return (
    <ul>
      {items.map(fruit => <li key={fruit}>{fruit}</li>)}
    </ul>
  );
}
```

**Use Cases:**
1. Displaying a list of products in an online store.
2. Showing comments under a blog post.

---

## Chapter 3: State

**Explanation:**  
State is a built-in object that stores property values that belong to a component. When state changes, the component re-renders.

**Code Example:**
```jsx
import { useState } from 'react';
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**Use Cases:**
1. Tracking the number of items in a shopping cart.
2. Managing form input values.

---

## Chapter 4: Conditional Rendering

**Explanation:**  
Conditional rendering lets you show or hide UI elements based on certain conditions.

**Code Example:**
```jsx
function Greeting({ isLoggedIn }) {
  return isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in.</h1>;
}
```

**Use Cases:**
1. Showing a login button if the user is not authenticated.
2. Displaying a loading spinner while data is being fetched.

---

## Chapter 5: Props

**Explanation:**  
Props (properties) are used to pass data from parent to child components.

**Code Example:**
```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

**Use Cases:**
1. Passing user information to a profile component.
2. Sending a callback function to a child component.

---

## Chapter 6: Component Composition

**Explanation:**  
Component composition is the practice of combining multiple components to build complex UIs.

**Code Example:**
```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}
function Profile() {
  return (
    <Card>
      <h2>Jane Doe</h2>
      <p>Software Engineer</p>
    </Card>
  );
}
```

**Use Cases:**
1. Wrapping content in a styled container.
2. Creating layouts with nested components.

---

## Chapter 7: Modal Component Composition

**Explanation:**  
Modal component composition involves creating a modal dialog as a reusable component and composing it with other components.

**Code Example:**
```jsx
function Modal({ isOpen, children }) {
  if (!isOpen) return null;
  return <div className="modal">{children}</div>;
}
```

**Use Cases:**
1. Displaying a confirmation dialog before deleting an item.
2. Showing a form in a popup window.

---

## Chapter 8: Passing Data as Children

**Explanation:**  
You can pass data or elements between components using the `children` prop.

**Code Example:**
```jsx
function Wrapper({ children }) {
  return <div className="wrapper">{children}</div>;
}
```

**Use Cases:**
1. Creating a layout component that wraps any content.
2. Passing custom content to a modal or card component.

---

## Chapter 9: Controlled Inputs

**Explanation:**  
Controlled inputs are form elements whose values are managed by React state.

**Code Example:**
```jsx
import { useState } from 'react';
function NameInput() {
  const [name, setName] = useState('');
  return (
    <input value={name} onChange={e => setName(e.target.value)} />
  );
}
```

**Use Cases:**
1. Handling user input in a search bar.
2. Managing form submissions.

---

## Chapter 10: Global State vs Normal State

**Explanation:**  
Normal state is local to a component, while global state is shared across multiple components, often managed by context or state management libraries.

**Code Example:**
```jsx
// Local state
const [count, setCount] = useState(0);

// Global state (using Context)
const CountContext = React.createContext();
```

**Use Cases:**
1. Local state: toggling a dropdown menu.
2. Global state: managing user authentication status.

---

## Chapter 11: Reusable Components

**Explanation:**  
Reusable components are designed to be used in multiple places with different data or configurations.

**Code Example:**
```jsx
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}
```

**Use Cases:**
1. A button component used for submit, cancel, or delete actions.
2. An input component for different types of forms.

---

## Chapter 12: Prop Drilling

**Explanation:**  
Prop drilling is the process of passing data through multiple layers of components via props.

**Code Example:**
```jsx
function Grandparent({ value }) {
  return <Parent value={value} />;
}
function Parent({ value }) {
  return <Child value={value} />;
}
function Child({ value }) {
  return <span>{value}</span>;
}
```

**Use Cases:**
1. Passing user data from a top-level component to deeply nested components.
2. Sending theme settings down the component tree.

---