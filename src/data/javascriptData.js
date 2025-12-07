export const javascriptData = {
  sections: {
    syntax: {
      title: "JavaScript Syntax",
      description: "Core language features and modern ES6+ syntax",
      color: "yellow",
      topics: [
        {
          id: "basic-syntax",
          title: "Basics & Variables",
          content: `
# JavaScript Syntax Basics

JavaScript is a dynamic, interpreted language that runs in browsers and Node.js.

## Hello World
\`\`\`javascript
console.log("Hello, World!");
\`\`\`

## Variables
Use \`let\`, \`const\`, and avoid \`var\`.
\`\`\`javascript
let name = "Alice";       // Mutable
const age = 30;           // Immutable
const isActive = true;    // Boolean
const nothing = null;     // Null
let undef;                // Undefined
\`\`\`

## Template Literals
\`\`\`javascript
const greeting = \`Hello, \${name}! You are \${age} years old.\`;
\`\`\`
          `,
        },
        {
          id: "control-flow",
          title: "Control Flow",
          content: `
# Control Flow

## If-Else
\`\`\`javascript
const x = 10;
if (x > 10) {
    console.log("Greater than 10");
} else if (x === 10) {
    console.log("Equal to 10");
} else {
    console.log("Less than 10");
}
\`\`\`

## Loops
\`\`\`javascript
// For loop
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// For...of (arrays)
const fruits = ["apple", "banana"];
for (const fruit of fruits) {
    console.log(fruit);
}

// For...in (objects)
const obj = { a: 1, b: 2 };
for (const key in obj) {
    console.log(key, obj[key]);
}
\`\`\`
          `,
        },
      ],
    },
    functions: {
      title: "Functions",
      description: "Arrow functions, callbacks, and closures",
      color: "blue",
      topics: [
        {
          id: "arrow-functions",
          title: "Arrow Functions",
          content: `
# Arrow Functions

Concise syntax for functions.

\`\`\`javascript
// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function
const addArrow = (a, b) => a + b;

// With body
const greet = (name) => {
    const message = \`Hello, \${name}!\`;
    return message;
};
\`\`\`
          `,
        },
        {
          id: "callbacks-closures",
          title: "Callbacks & Closures",
          content: `
# Callbacks & Closures

## Callbacks
\`\`\`javascript
function fetchData(callback) {
    setTimeout(() => {
        callback("Data loaded");
    }, 1000);
}

fetchData((result) => {
    console.log(result);
});
\`\`\`

## Closures
\`\`\`javascript
function createCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
\`\`\`
          `,
        },
      ],
    },
    async: {
      title: "Async JavaScript",
      description: "Promises, async/await, and the event loop",
      color: "green",
      topics: [
        {
          id: "promises",
          title: "Promises",
          content: `
# Promises

Handle asynchronous operations.

\`\`\`javascript
const fetchUser = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id: 1, name: "Alice" });
        }, 1000);
    });
};

fetchUser()
    .then(user => console.log(user))
    .catch(err => console.error(err));
\`\`\`
          `,
        },
        {
          id: "async-await",
          title: "Async/Await",
          content: `
# Async/Await

Syntactic sugar for Promises.

\`\`\`javascript
async function getUser() {
    try {
        const response = await fetch("/api/user");
        const user = await response.json();
        return user;
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
}

// Usage
const user = await getUser();
\`\`\`
          `,
        },
      ],
    },
    dom: {
        title: "DOM Manipulation",
        description: "Selecting, modifying, and handling events",
        color: "purple",
        topics: [
            {
                id: "dom-basics",
                title: "DOM Basics",
                content: `
# DOM Manipulation

## Selecting Elements
\`\`\`javascript
const el = document.getElementById("myId");
const els = document.querySelectorAll(".myClass");
const first = document.querySelector("div.container");
\`\`\`

## Modifying Elements
\`\`\`javascript
el.textContent = "New text";
el.innerHTML = "<strong>Bold</strong>";
el.style.color = "red";
el.classList.add("active");
\`\`\`

## Event Handling
\`\`\`javascript
const button = document.querySelector("button");
button.addEventListener("click", (event) => {
    console.log("Button clicked!", event);
});
\`\`\`
                `,
            }
        ]
    }
  },
};

export const getJavaScriptSectionData = (sectionId) => {
  return javascriptData.sections[sectionId] || null;
};
