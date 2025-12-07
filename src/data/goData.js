export const goData = {
  sections: {
    syntax: {
      title: "Go Syntax",
      description: "Simple, reliable, and efficient software.",
      color: "cyan",
      topics: [
        {
          id: "basic-syntax",
          title: "Basics & Variables",
          content: `
# Go Syntax Basics

Go is a statically typed, compiled language. Programs are organized into packages.

## Hello World
\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
\`\`\`

## Variables
Go has type inference with \`:=\`.
\`\`\`go
var x int = 10
y := 20        // Inferred as int
name := "Gopher" // string
const Pi = 3.14
\`\`\`
          `,
        },
        {
          id: "control-flow",
          title: "Control Flow",
          content: `
# Control Flow

## If-Else
Parentheses are not needed around conditions.
\`\`\`go
if x > 10 {
    fmt.Println("Big")
} else {
    fmt.Println("Small")
}
\`\`\`

## For Loop
Go only has \`for\` loops.
\`\`\`go
// Classic for
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

// While-style
sum := 1
for sum < 100 {
    sum += sum
}
\`\`\`
          `,
        },
      ],
    },
    structs: {
      title: "Structs & Interfaces",
      description: "Type system without classes.",
      color: "blue",
      topics: [
        {
          id: "structs",
          title: "Structs",
          content: `
# Structs

Typed collections of fields.

\`\`\`go
type Person struct {
    Name string
    Age  int
}

func main() {
    p := Person{Name: "Bob", Age: 30}
    fmt.Println(p.Name)
}
\`\`\`
          `,
        },
        {
          id: "interfaces",
          title: "Interfaces",
          content: `
# Interfaces

Interfaces are implemented implicitly.

\`\`\`go
type Greeter interface {
    Greet()
}

type Person struct{ Name string }

// Implicit implementation
func (p Person) Greet() {
    fmt.Println("Hi, I'm " + p.Name)
}

func sayHello(g Greeter) {
    g.Greet()
}
\`\`\`
          `,
        },
      ],
    },
    concurrency: {
      title: "Concurrency",
      description: "Goroutines and Channels",
      color: "green",
      topics: [
        {
          id: "goroutines",
          title: "Goroutines",
          content: `
# Goroutines

Lightweight threads managed by the Go runtime.

\`\`\`go
func say(s string) {
    for i := 0; i < 3; i++ {
        fmt.Println(s)
    }
}

func main() {
    go say("world") // New goroutine
    say("hello")    // Current goroutine
}
\`\`\`
          `,
        },
        {
          id: "channels",
          title: "Channels",
          content: `
# Channels

Pipes that connect concurrent goroutines.

\`\`\`go
func sum(s []int, c chan int) {
    sum := 0
    for _, v := range s {
        sum += v
    }
    c <- sum // Send sum to c
}

func main() {
    s := []int{7, 2, 8, -9, 4, 0}
    c := make(chan int)
    go sum(s[:len(s)/2], c)
    go sum(s[len(s)/2:], c)
    x, y := <-c, <-c // Receive from c
    fmt.Println(x, y, x+y)
}
\`\`\`
          `,
        },
      ],
    },
    errorhandling: {
        title: "Error Handling",
        description: "Defer, Panic, Recover",
        color: "red",
        topics: [
            {
                id: "errors",
                title: "Errors",
                content: `
# Error Handling

Functions often return an error value.

\`\`\`go
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 0)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println(result)
    }
}
\`\`\`
                `,
            }
        ]
    }
  },
};

export const getGoSectionData = (sectionId) => {
  return goData.sections[sectionId] || null;
};
