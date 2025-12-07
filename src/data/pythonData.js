export const pythonData = {
  sections: {
    syntax: {
      title: "Python Syntax",
      description: "Fundamental syntax and language constructs of Python",
      color: "yellow",
      topics: [
        {
          id: "basic-syntax",
          title: "Basic Syntax & Types",
          content: `
# Python Syntax Basics

Python is a dynamically-typed, interpreted language known for its readability. It uses indentation to define code blocks.

## Hello World
\`\`\`python
def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()
\`\`\`

## Variables & Types
Variables are dynamically typed.
\`\`\`python
name = "Alice"      # str
age = 30            # int
height = 5.8        # float
is_active = True    # bool
nothing = None      # NoneType

# Type Hints (Python 3.5+)
def greet(name: str) -> str:
    return f"Hello, {name}"
\`\`\`
          `,
        },
        {
          id: "control-flow",
          title: "Control Flow",
          content: `
# Control Flow

## If-Elif-Else
\`\`\`python
x = 10
if x > 10:
    print("Greater than 10")
elif x == 10:
    print("Equal to 10")
else:
    print("Less than 10")
\`\`\`

## Loops
\`\`\`python
# For loop
for i in range(5):
    print(i) # 0 to 4

# While loop
count = 0
while count < 3:
    print(count)
    count += 1
\`\`\`
          `,
        },
      ],
    },
    datastructures: {
      title: "Data Structures",
      description: "Built-in data structures: Lists, Dictionaries, Sets, Tuples",
      color: "blue",
      topics: [
        {
          id: "lists-tuples",
          title: "Lists & Tuples",
          content: `
# Lists & Tuples

## Lists (Mutable)
\`\`\`python
fruits = ["apple", "banana", "cherry"]
fruits.append("date")
print(fruits[0])  # apple
fruits[1] = "blueberry" 
\`\`\`

## Tuples (Immutable)
\`\`\`python
point = (10, 20)
# point[0] = 5  # Error!
x, y = point    # Unpacking
\`\`\`
          `,
        },
        {
          id: "dicts-sets",
          title: "Dictionaries & Sets",
          content: `
# Dictionaries & Sets

## Dictionaries (Key-Value)
\`\`\`python
user = {
    "name": "Alice",
    "age": 30
}
user["email"] = "alice@example.com"
print(user.get("name"))
\`\`\`

## Sets (Unique Elements)
\`\`\`python
unique_nums = {1, 2, 2, 3} 
print(unique_nums) # {1, 2, 3}
\`\`\`
          `,
        },
      ],
    },
    oop: {
      title: "Object Limited Programming",
      description: "Classes, Objects, Inheritance",
      color: "green",
      topics: [
        {
          id: "classes",
          title: "Classes & Objects",
          content: `
# Classes

\`\`\`python
class Dog:
    # Constructor
    def __init__(self, name):
        self.name = name
    
    # Method
    def bark(self):
        return f"{self.name} says Woof!"

my_dog = Dog("Rex")
print(my_dog.bark())
\`\`\`
          `,
        },
        {
            id: "inheritance",
            title: "Inheritance",
            content: `
# Inheritance

\`\`\`python
class Animal:
    def speak(self):
        pass

class Cat(Animal):
    def speak(self):
        return "Meow"

cats = [Cat(), Cat()]
for cat in cats:
    print(cat.speak())
\`\`\`
            `,
        }
      ],
    },
    advanced: {
        title: "Advanced Features",
        description: "List Comprehensions, Decorators, Lambdas",
        color: "purple",
        topics: [
            {
                id: "comprehensions",
                title: "Comprehensions",
                content: `
# List Comprehensions

Concise way to create lists.

\`\`\`python
nums = [1, 2, 3, 4, 5]
squares = [x * x for x in nums] 
# [1, 4, 9, 16, 25]

# With condition
evens = [x for x in nums if x % 2 == 0]
\`\`\`
                `,
            },
            {
                id: "decorators",
                title: "Decorators",
                content: `
# Decorators

Wraps a function to modify its behavior.

\`\`\`python
def my_decorator(func):
    def wrapper():
        print("Before function")
        func()
        print("After function")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()
\`\`\`
                `,
            }
        ]
    }
  },
};

export const getPythonSectionData = (sectionId) => {
  return pythonData.sections[sectionId] || null;
};
