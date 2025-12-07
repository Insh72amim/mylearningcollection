export const javaData = {
  sections: {
    syntax: {
      title: "Java Syntax",
      description: "Fundamental syntax and language constructs of Java",
      color: "orange",
      topics: [
        {
          id: "basic-syntax",
          title: "Basic Syntax & Types",
          content: `
# Java Syntax Basics

Java is a strongly-typed, object-oriented language. Every Java program must have at least one class and a main method.

## Entry Point
\`\`\`java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

## Primitive Types
Java has 8 primitive data types.
\`\`\`java
int age = 30;
double salary = 4500.50;
boolean isActive = true;
char grade = 'A';
byte b = 100;
short s = 10000;
long l = 1000000000L;
float f = 3.14f;
\`\`\`

## Type Inference (Java 10+)
Use \`var\` for local variable type inference.
\`\`\`java
var name = "John"; // Inferred as String
var list = new ArrayList<String>(); // Inferred as ArrayList<String>
\`\`\`
          `,
        },
        {
          id: "control-flow",
          title: "Control Flow",
          content: `
# Control Flow

Standard if-else and switch statements.

## Enhanced Switch (Java 14+)
\`\`\`java
String day = "MONDAY";
int numLetters = switch (day) {
    case "MONDAY", "FRIDAY", "SUNDAY" -> 6;
    case "TUESDAY" -> 7;
    default -> throw new IllegalStateException("Invalid day: " + day);
};
\`\`\`
          `,
        },
      ],
    },
    oop: {
      title: "Object Oriented Programming",
      description: "Classes, Objects, Inheritance, and Polymorphism in Java",
      color: "red",
      topics: [
        {
          id: "classes-objects",
          title: "Classes and Objects",
          content: `
# Classes & Objects

## Class Definition
\`\`\`java
public class Car {
    private String model;
    private int year;

    // Constructor
    public Car(String model, int year) {
        this.model = model;
        this.year = year;
    }

    // Method
    public void start() {
        System.out.println(model + " starting...");
    }
}
\`\`\`
          `,
        },
        {
          id: "interfaces",
          title: "Interfaces",
          content: `
# Interfaces

Interfaces define a contract. Since Java 8, they can have default and static methods.

\`\`\`java
interface Vehicle {
    void move();
    
    // Default method (Java 8)
    default void honk() {
        System.out.println("Honk!");
    }
}

class Bike implements Vehicle {
    @Override
    public void move() {
        System.out.println("Bike moving");
    }
}
\`\`\`
          `,
        },
      ],
    },
    collections: {
      title: "Collections Framework",
      description: "Lists, Sets, Maps and Queues",
      color: "blue",
      topics: [
        {
          id: "lists",
          title: "Lists",
          content: `
# List Interface

Ordered collection (sequence). Allows duplicates.

## ArrayList vs LinkedList
- **ArrayList**: Resizable array. Fast random access O(1). Slow insertion in middle O(n).
- **LinkedList**: Doubly linked list. Fast insertion/deletion O(1). Slow random access O(n).

\`\`\`java
List<String> list = new ArrayList<>();
list.add("Java");
list.add("Python");
list.get(0); // "Java"
\`\`\`
          `,
        },
        {
          id: "maps",
          title: "Maps",
          content: `
# Map Interface

Key-Value pairs. Keys must be unique.

## HashMap
Uses hashing. O(1) average lookup. Unordered.

\`\`\`java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 90);
scores.put("Bob", 85);

for (Map.Entry<String, Integer> entry : scores.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
\`\`\`
          `,
        },
      ],
    },
    multithreading: {
        title: "Multithreading",
        description: "Concurrent programming in Java",
        color: "purple",
        topics: [
            {
                id: "basics",
                title: "Thread Basics",
                content: `
# Creating Threads

## Extending Thread
\`\`\`java
class MyThread extends Thread {
    public void run() {
        System.out.println("Thread running");
    }
}
new MyThread().start();
\`\`\`

## Implementing Runnable
\`\`\`java
Runnable task = () -> System.out.println("Task running");
new Thread(task).start();
\`\`\`
                `,
            }
        ]
    }
  },
};

export const getJavaSectionData = (sectionId) => {
  return javaData.sections[sectionId] || null;
};
