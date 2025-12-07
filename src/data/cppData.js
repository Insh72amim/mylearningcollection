// C++ content data structure based on the provided folder structure
export const cppData = {
  sections: {
    syntax: {
      id: "syntax",
      title: "C++ Syntax",
      description: "Core syntax and language fundamentals",
      icon: "Code",
      color: "blue",
      topics: [
        {
          id: "basic-syntax",
          title: "Basic Syntax",
          content: `
# C++ Basic Syntax

## Variable Declaration and Types

### Fundamental Data Types
\`\`\`cpp
// Integer types
int age = 25;
short shortNum = 100;
long longNum = 1000000;
long long veryLongNum = 1000000000000LL;

// Floating-point types
float height = 5.8f;
double precision = 3.14159265359;
long double highPrecision = 3.141592653589793238L;

// Character types
char initial = 'A';
wchar_t wideChar = L'€';
char16_t utf16Char = u'€';
char32_t utf32Char = U'🚀';

// Boolean type
bool isActive = true;
bool isComplete = false;
\`\`\`

### Auto Keyword (C++11+)
\`\`\`cpp
auto number = 42;        // int
auto pi = 3.14;          // double
auto name = "John";      // const char*
auto result = getValue(); // Type deduced from function return
\`\`\`

## Control Structures

### Conditional Statements
\`\`\`cpp
// if-else
if (score >= 90) {
    grade = 'A';
} else if (score >= 80) {
    grade = 'B';
} else {
    grade = 'C';
}

// Ternary operator
int max = (a > b) ? a : b;

// switch statement
switch (choice) {
    case 1:
        doOption1();
        break;
    case 2:
        doOption2();
        break;
    default:
        doDefault();
}
\`\`\`

### Loops
\`\`\`cpp
// for loop
for (int i = 0; i < 10; ++i) {
    cout << i << " ";
}

// Range-based for loop (C++11+)
vector<int> numbers = {1, 2, 3, 4, 5};
for (const auto& num : numbers) {
    cout << num << " ";
}

// while loop
int count = 0;
while (count < 5) {
    cout << count++;
}

// do-while loop
do {
    cout << "Enter a positive number: ";
    cin >> num;
} while (num <= 0);
\`\`\`

## Functions

### Basic Function Declaration
\`\`\`cpp
// Function declaration
int add(int a, int b);

// Function definition
int add(int a, int b) {
    return a + b;
}

// Function with default parameters
void greet(const string& name = "World") {
    cout << "Hello, " << name << "!" << endl;
}
\`\`\`

### Modern Function Features
\`\`\`cpp
// Lambda expressions (C++11+)
auto multiply = [](int a, int b) -> int {
    return a * b;
};

// Function templates
template<typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}
\`\`\`
          `,
        },
        {
          id: "pointers-references",
          title: "Pointers and References",
          content: `
# Pointers and References in C++

## Pointers

### Basic Pointer Operations
\`\`\`cpp
int value = 42;
int* ptr = &value;  // ptr points to value

cout << value;     // Output: 42
cout << &value;    // Output: memory address
cout << ptr;       // Output: same memory address
cout << *ptr;      // Output: 42 (dereferencing)

*ptr = 100;        // Modify value through pointer
cout << value;     // Output: 100
\`\`\`

### Pointer Arithmetic
\`\`\`cpp
int arr[] = {10, 20, 30, 40, 50};
int* p = arr;      // Points to first element

cout << *p;        // 10
cout << *(p + 1);  // 20
cout << *(p + 2);  // 30

p++;               // Move to next element
cout << *p;        // 20
\`\`\`

### Smart Pointers (C++11+)
\`\`\`cpp
#include <memory>

// unique_ptr - exclusive ownership
std::unique_ptr<int> uniquePtr = std::make_unique<int>(42);
cout << *uniquePtr;  // 42

// shared_ptr - shared ownership
std::shared_ptr<int> sharedPtr1 = std::make_shared<int>(100);
std::shared_ptr<int> sharedPtr2 = sharedPtr1;  // Shared ownership

// weak_ptr - non-owning observer
std::weak_ptr<int> weakPtr = sharedPtr1;
\`\`\`

## References

### Basic Reference Usage
\`\`\`cpp
int original = 10;
int& ref = original;  // ref is an alias for original

ref = 20;             // Modifies original
cout << original;     // Output: 20

// References must be initialized
// int& invalidRef;   // Error: references must be initialized
\`\`\`

### Reference vs Pointer
\`\`\`cpp
// Reference
void modifyByReference(int& value) {
    value = 100;
}

// Pointer
void modifyByPointer(int* value) {
    if (value != nullptr) {
        *value = 100;
    }
}

int num = 50;
modifyByReference(num);  // num becomes 100
modifyByPointer(&num);   // num becomes 100
\`\`\`
          `,
        },
      ],
    },
    oop: {
      id: "oop",
      title: "Object-Oriented Programming",
      description: "Classes, objects, inheritance, and polymorphism",
      icon: "Box",
      color: "purple",
      topics: [
        {
          id: "classes-objects",
          title: "Classes and Objects",
          content: `
# Classes and Objects in C++

## Basic Class Definition

### Simple Class Example
\`\`\`cpp
class Rectangle {
private:
    double width;
    double height;

public:
    // Constructor
    Rectangle(double w, double h) : width(w), height(h) {}
    
    // Destructor
    ~Rectangle() {
        cout << "Rectangle destroyed" << endl;
    }
    
    // Member functions
    double getArea() const {
        return width * height;
    }
    
    double getPerimeter() const {
        return 2 * (width + height);
    }
    
    // Setters and getters
    void setWidth(double w) { width = w; }
    void setHeight(double h) { height = h; }
    
    double getWidth() const { return width; }
    double getHeight() const { return height; }
};
\`\`\`

### Using the Class
\`\`\`cpp
// Creating objects
Rectangle rect1(10.0, 5.0);
Rectangle rect2(7.5, 3.2);

// Calling member functions
cout << "Area: " << rect1.getArea() << endl;
cout << "Perimeter: " << rect1.getPerimeter() << endl;

// Dynamic allocation
Rectangle* rectPtr = new Rectangle(15.0, 8.0);
cout << "Dynamic area: " << rectPtr->getArea() << endl;
delete rectPtr;  // Don't forget to delete!
\`\`\`

## Access Specifiers

### Public, Private, Protected
\`\`\`cpp
class AccessExample {
public:
    int publicVar;        // Accessible from anywhere
    void publicMethod() { 
        cout << "Public method" << endl; 
    }

private:
    int privateVar;       // Only accessible within the class
    void privateMethod() { 
        cout << "Private method" << endl; 
    }

protected:
    int protectedVar;     // Accessible within class and derived classes
    void protectedMethod() { 
        cout << "Protected method" << endl; 
    }
};
\`\`\`

## Constructors and Destructors

### Different Types of Constructors
\`\`\`cpp
class Student {
private:
    string name;
    int age;
    double gpa;

public:
    // Default constructor
    Student() : name("Unknown"), age(0), gpa(0.0) {
        cout << "Default constructor called" << endl;
    }
    
    // Parameterized constructor
    Student(const string& n, int a, double g) 
        : name(n), age(a), gpa(g) {
        cout << "Parameterized constructor called" << endl;
    }
    
    // Copy constructor
    Student(const Student& other) 
        : name(other.name), age(other.age), gpa(other.gpa) {
        cout << "Copy constructor called" << endl;
    }
    
    // Move constructor (C++11+)
    Student(Student&& other) noexcept
        : name(std::move(other.name)), age(other.age), gpa(other.gpa) {
        cout << "Move constructor called" << endl;
        other.age = 0;
        other.gpa = 0.0;
    }
    
    // Assignment operator
    Student& operator=(const Student& other) {
        if (this != &other) {
            name = other.name;
            age = other.age;
            gpa = other.gpa;
        }
        cout << "Assignment operator called" << endl;
        return *this;
    }
    
    // Move assignment operator (C++11+)
    Student& operator=(Student&& other) noexcept {
        if (this != &other) {
            name = std::move(other.name);
            age = other.age;
            gpa = other.gpa;
            other.age = 0;
            other.gpa = 0.0;
        }
        cout << "Move assignment operator called" << endl;
        return *this;
    }
    
    // Destructor
    ~Student() {
        cout << "Destructor called for " << name << endl;
    }
    
    // Display method
    void display() const {
        cout << "Name: " << name << ", Age: " << age << ", GPA: " << gpa << endl;
    }
};
\`\`\`
          `,
        },
        {
          id: "inheritance",
          title: "Inheritance",
          content: `
# Inheritance in C++

## Basic Inheritance

### Single Inheritance
\`\`\`cpp
// Base class
class Animal {
protected:
    string name;
    int age;

public:
    Animal(const string& n, int a) : name(n), age(a) {}
    
    virtual void makeSound() const {
        cout << name << " makes a sound" << endl;
    }
    
    virtual void display() const {
        cout << "Name: " << name << ", Age: " << age << endl;
    }
    
    virtual ~Animal() = default;  // Virtual destructor
};

// Derived class
class Dog : public Animal {
private:
    string breed;

public:
    Dog(const string& n, int a, const string& b) 
        : Animal(n, a), breed(b) {}
    
    // Override base class method
    void makeSound() const override {
        cout << name << " barks!" << endl;
    }
    
    void display() const override {
        Animal::display();  // Call base class method
        cout << "Breed: " << breed << endl;
    }
    
    // Dog-specific method
    void wagTail() const {
        cout << name << " wags tail happily!" << endl;
    }
};
\`\`\`

### Multiple Inheritance
\`\`\`cpp
class Flyable {
public:
    virtual void fly() const {
        cout << "Flying through the sky" << endl;
    }
    virtual ~Flyable() = default;
};

class Swimmable {
public:
    virtual void swim() const {
        cout << "Swimming through water" << endl;
    }
    virtual ~Swimmable() = default;
};

class Duck : public Animal, public Flyable, public Swimmable {
public:
    Duck(const string& n, int a) : Animal(n, a) {}
    
    void makeSound() const override {
        cout << name << " quacks!" << endl;
    }
    
    void fly() const override {
        cout << name << " flies over the pond" << endl;
    }
    
    void swim() const override {
        cout << name << " swims in the pond" << endl;
    }
};
\`\`\`

## Polymorphism

### Virtual Functions and Dynamic Binding
\`\`\`cpp
// Using polymorphism
void demonstratePolymorphism() {
    vector<unique_ptr<Animal>> animals;
    
    animals.push_back(make_unique<Dog>("Buddy", 3, "Golden Retriever"));
    animals.push_back(make_unique<Duck>("Quackers", 2));
    
    for (const auto& animal : animals) {
        animal->makeSound();  // Calls appropriate derived class method
        animal->display();
        cout << "---" << endl;
    }
}
\`\`\`

### Abstract Classes
\`\`\`cpp
// Abstract base class
class Shape {
protected:
    string color;

public:
    Shape(const string& c) : color(c) {}
    
    // Pure virtual function makes this an abstract class
    virtual double getArea() const = 0;
    virtual double getPerimeter() const = 0;
    
    // Non-pure virtual function
    virtual void display() const {
        cout << "Color: " << color << endl;
    }
    
    virtual ~Shape() = default;
};

class Circle : public Shape {
private:
    double radius;

public:
    Circle(const string& c, double r) : Shape(c), radius(r) {}
    
    double getArea() const override {
        return 3.14159 * radius * radius;
    }
    
    double getPerimeter() const override {
        return 2 * 3.14159 * radius;
    }
    
    void display() const override {
        Shape::display();
        cout << "Radius: " << radius << endl;
    }
};
\`\`\`
          `,
        },
        {
          id: "encapsulation-abstraction",
          title: "Encapsulation and Abstraction",
          content: `
# Encapsulation and Abstraction in C++

## Encapsulation

### Data Hiding and Access Control
\`\`\`cpp
class BankAccount {
private:
    string accountNumber;
    string ownerName;
    double balance;
    
    // Private helper method
    bool isValidAmount(double amount) const {
        return amount > 0;
    }

public:
    // Constructor
    BankAccount(const string& accNum, const string& owner, double initialBalance = 0.0)
        : accountNumber(accNum), ownerName(owner), balance(initialBalance) {
        if (initialBalance < 0) {
            balance = 0.0;
        }
    }
    
    // Controlled access to private data
    double getBalance() const { 
        return balance; 
    }
    
    string getAccountNumber() const { 
        return accountNumber; 
    }
    
    string getOwnerName() const { 
        return ownerName; 
    }
    
    // Controlled operations
    bool deposit(double amount) {
        if (isValidAmount(amount)) {
            balance += amount;
            return true;
        }
        return false;
    }
    
    bool withdraw(double amount) {
        if (isValidAmount(amount) && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }
    
    void displayAccountInfo() const {
        cout << "Account: " << accountNumber << endl;
        cout << "Owner: " << ownerName << endl;
        cout << "Balance: $" << fixed << setprecision(2) << balance << endl;
    }
};
\`\`\`

## Abstraction

### Interface-like Classes
\`\`\`cpp
// Abstract interface for drawable objects
class IDrawable {
public:
    virtual void draw() const = 0;
    virtual void move(int x, int y) = 0;
    virtual void scale(double factor) = 0;
    virtual ~IDrawable() = default;
};

// Abstract interface for serializable objects
class ISerializable {
public:
    virtual string serialize() const = 0;
    virtual void deserialize(const string& data) = 0;
    virtual ~ISerializable() = default;
};

// Concrete implementation
class Rectangle : public IDrawable, public ISerializable {
private:
    int x, y;           // Position
    int width, height;  // Dimensions

public:
    Rectangle(int x, int y, int w, int h) 
        : x(x), y(y), width(w), height(h) {}
    
    // Implement IDrawable interface
    void draw() const override {
        cout << "Drawing rectangle at (" << x << ", " << y 
             << ") with size " << width << "x" << height << endl;
    }
    
    void move(int newX, int newY) override {
        x = newX;
        y = newY;
    }
    
    void scale(double factor) override {
        width = static_cast<int>(width * factor);
        height = static_cast<int>(height * factor);
    }
    
    // Implement ISerializable interface
    string serialize() const override {
        return to_string(x) + "," + to_string(y) + "," + 
               to_string(width) + "," + to_string(height);
    }
    
    void deserialize(const string& data) override {
        // Simple implementation for demonstration
        istringstream iss(data);
        string token;
        
        if (getline(iss, token, ',')) x = stoi(token);
        if (getline(iss, token, ',')) y = stoi(token);
        if (getline(iss, token, ',')) width = stoi(token);
        if (getline(iss, token, ',')) height = stoi(token);
    }
};
\`\`\`

### PIMPL Idiom (Pointer to Implementation)
\`\`\`cpp
// In header file (Widget.h)
class Widget {
private:
    class Impl;          // Forward declaration
    unique_ptr<Impl> pImpl;  // Pointer to implementation

public:
    Widget();
    ~Widget();
    Widget(const Widget& other);
    Widget& operator=(const Widget& other);
    
    void doSomething();
    int getValue() const;
    void setValue(int value);
};

// In source file (Widget.cpp)
class Widget::Impl {
public:
    int value = 0;
    string data = "";
    vector<int> complexData;
    
    void performComplexOperation() {
        // Complex implementation details hidden
        for (int i = 0; i < 1000; ++i) {
            complexData.push_back(i * value);
        }
    }
};

Widget::Widget() : pImpl(make_unique<Impl>()) {}

Widget::~Widget() = default;  // Destructor can be defaulted

Widget::Widget(const Widget& other) 
    : pImpl(make_unique<Impl>(*other.pImpl)) {}

Widget& Widget::operator=(const Widget& other) {
    *pImpl = *other.pImpl;
    return *this;
}

void Widget::doSomething() {
    pImpl->performComplexOperation();
}

int Widget::getValue() const {
    return pImpl->value;
}

void Widget::setValue(int value) {
    pImpl->value = value;
}
\`\`\`
          `,
        },
      ],
    },
    compare: {
      id: "compare",
      title: "C++ Comparisons",
      description: "Comparing C++ with other languages and versions",
      icon: "GitCompare",
      color: "green",
      topics: [
        {
          id: "cpp-vs-languages",
          title: "C++ vs Java vs Python",
          content: `
# C++ vs C Comparison

## Key Differences

### Object-Oriented Programming
\`\`\`c
// C - Procedural approach
struct Point {
    int x, y;
};

void point_move(struct Point* p, int dx, int dy) {
    p->x += dx;
    p->y += dy;
}

void point_print(const struct Point* p) {
    printf("Point: (%d, %d)\\n", p->x, p->y);
}
\`\`\`

\`\`\`cpp
// C++ - Object-oriented approach
class Point {
private:
    int x, y;

public:
    Point(int x = 0, int y = 0) : x(x), y(y) {}
    
    void move(int dx, int dy) {
        x += dx;
        y += dy;
    }
    
    void print() const {
        cout << "Point: (" << x << ", " << y << ")" << endl;
    }
    
    // Operator overloading
    Point operator+(const Point& other) const {
        return Point(x + other.x, y + other.y);
    }
};
\`\`\`

### Memory Management
\`\`\`c
// C - Manual memory management
int* arr = (int*)malloc(10 * sizeof(int));
if (arr == NULL) {
    // Handle allocation failure
    return -1;
}
// Use array...
free(arr);
\`\`\`

\`\`\`cpp
// C++ - Multiple options
// 1. Manual (like C)
int* arr1 = new int[10];
delete[] arr1;

// 2. Smart pointers (preferred)
auto arr2 = make_unique<int[]>(10);
// Automatic cleanup

// 3. Containers (most preferred)
vector<int> arr3(10);
// Automatic memory management
\`\`\`

### Type Safety
\`\`\`c
// C - Less type safety
void* ptr = malloc(sizeof(int));
int* intPtr = (int*)ptr;  // C-style cast
\`\`\`

\`\`\`cpp
// C++ - Better type safety
void* ptr = malloc(sizeof(int));
int* intPtr = static_cast<int*>(ptr);  // Safer cast

// Even better - avoid void* when possible
auto intPtr2 = make_unique<int>(42);
\`\`\`

### Function Overloading
\`\`\`c
// C - Cannot overload functions
int add_int(int a, int b);
float add_float(float a, float b);
double add_double(double a, double b);
\`\`\`

\`\`\`cpp
// C++ - Function overloading
int add(int a, int b);
float add(float a, float b);
double add(double a, double b);

// Or use templates
template<typename T>
T add(T a, T b) {
    return a + b;
}
\`\`\`

## When to Use Each

### Use C When:
- **System Programming**: Operating systems, embedded systems
- **Performance Critical**: Every byte and cycle matters
- **Legacy Code**: Working with existing C codebases
- **Simple Programs**: Basic utilities and tools
- **Resource Constraints**: Very limited memory/processing power

### Use C++ When:
- **Application Development**: Desktop applications, games
- **Object-Oriented Design**: Complex systems with objects
- **Code Reusability**: Templates and generic programming
- **STL Benefits**: Need standard library containers/algorithms
- **Modern Features**: Smart pointers, lambdas, etc.
          `,
        },
        {
          id: "modern-cpp",
          title: "Modern C++ Features",
          content: `
# Modern C++ Features (C++11 to C++23)

## C++11 Features

### Auto Keyword and Type Deduction
\`\`\`cpp
// C++98/03 style
std::vector<std::string>::iterator it = vec.begin();
std::map<std::string, int>::const_iterator mapIt = myMap.begin();

// C++11+ style
auto it = vec.begin();
auto mapIt = myMap.cbegin();
auto lambda = [](int x) { return x * 2; };
\`\`\`

### Range-Based For Loops
\`\`\`cpp
std::vector<int> numbers = {1, 2, 3, 4, 5};

// Old style
for (std::vector<int>::iterator it = numbers.begin(); 
     it != numbers.end(); ++it) {
    std::cout << *it << " ";
}

// C++11 style
for (const auto& num : numbers) {
    std::cout << num << " ";
}
\`\`\`

### Smart Pointers
\`\`\`cpp
#include <memory>

// unique_ptr - single ownership
auto ptr1 = std::make_unique<int>(42);
std::cout << *ptr1 << std::endl;

// shared_ptr - shared ownership
auto ptr2 = std::make_shared<std::string>("Hello");
auto ptr3 = ptr2;  // Reference count increases

// weak_ptr - non-owning observer
std::weak_ptr<std::string> weakPtr = ptr2;
if (auto locked = weakPtr.lock()) {
    std::cout << *locked << std::endl;
}
\`\`\`

### Lambda Expressions
\`\`\`cpp
#include <algorithm>
#include <vector>

std::vector<int> numbers = {1, 2, 3, 4, 5};

// Lambda with capture
int multiplier = 10;
auto multiply = [multiplier](int x) { return x * multiplier; };

// Lambda with mutable capture
auto counter = [count = 0]() mutable { return ++count; };

// Using lambdas with STL algorithms
std::transform(numbers.begin(), numbers.end(), numbers.begin(),
               [](int x) { return x * x; });
\`\`\`

## C++14 Features

### Generic Lambdas
\`\`\`cpp
// Generic lambda (C++14)
auto genericLambda = [](auto x, auto y) {
    return x + y;
};

std::cout << genericLambda(1, 2) << std::endl;        // 3
std::cout << genericLambda(1.5, 2.3) << std::endl;   // 3.8
std::cout << genericLambda("Hello"s, " World"s) << std::endl;  // Hello World
\`\`\`

### Return Type Deduction
\`\`\`cpp
// C++14 - auto return type deduction
auto fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

// Works with complex return types too
auto createVector() {
    return std::vector<std::string>{"Hello", "World"};
}
\`\`\`

## C++17 Features

### Structured Bindings
\`\`\`cpp
#include <tuple>
#include <map>

// With tuples
auto [x, y, z] = std::make_tuple(1, 2.5, "hello");

// With pairs (from map)
std::map<std::string, int> myMap = {{"apple", 5}, {"banana", 3}};
for (const auto& [key, value] : myMap) {
    std::cout << key << ": " << value << std::endl;
}

// With custom types
struct Point { int x, y; };
Point p{10, 20};
auto [px, py] = p;
\`\`\`

### If/Switch with Initialization
\`\`\`cpp
// If with initialization
if (auto result = calculateValue(); result > 0) {
    std::cout << "Positive result: " << result << std::endl;
}

// Switch with initialization
switch (auto status = getStatus(); status) {
    case Status::SUCCESS:
        handleSuccess();
        break;
    case Status::ERROR:
        handleError();
        break;
}
\`\`\`

### std::optional
\`\`\`cpp
#include <optional>

std::optional<int> divide(int a, int b) {
    if (b == 0) {
        return std::nullopt;  // No value
    }
    return a / b;
}

auto result = divide(10, 3);
if (result.has_value()) {
    std::cout << "Result: " << result.value() << std::endl;
} else {
    std::cout << "Division by zero!" << std::endl;
}

// Or use value_or for default
std::cout << "Result: " << result.value_or(-1) << std::endl;
\`\`\`

## C++20 Features

### Concepts
\`\`\`cpp
#include <concepts>

// Define a concept
template<typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

// Use concept in template
template<Numeric T>
T add(T a, T b) {
    return a + b;
}

// More complex concept
template<typename T>
concept Container = requires(T t) {
    t.begin();
    t.end();
    t.size();
};

template<Container C>
void printSize(const C& container) {
    std::cout << "Size: " << container.size() << std::endl;
}
\`\`\`

### Ranges
\`\`\`cpp
#include <ranges>
#include <algorithm>

std::vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

// Filter even numbers and square them
auto result = numbers 
    | std::views::filter([](int n) { return n % 2 == 0; })
    | std::views::transform([](int n) { return n * n; });

for (int value : result) {
    std::cout << value << " ";  // 4 16 36 64 100
}
\`\`\`

### Coroutines
\`\`\`cpp
#include <coroutine>
#include <iostream>

struct Generator {
    struct promise_type {
        int current_value;
        
        Generator get_return_object() {
            return Generator{std::coroutine_handle<promise_type>::from_promise(*this)};
        }
        
        std::suspend_always initial_suspend() { return {}; }
        std::suspend_always final_suspend() noexcept { return {}; }
        void unhandled_exception() {}
        
        std::suspend_always yield_value(int value) {
            current_value = value;
            return {};
        }
    };
    
    std::coroutine_handle<promise_type> h;
    
    Generator(std::coroutine_handle<promise_type> handle) : h(handle) {}
    
    ~Generator() {
        if (h) h.destroy();
    }
    
    int next() {
        h.resume();
        return h.promise().current_value;
    }
    
    bool done() {
        return h.done();
    }
};

Generator fibonacci() {
    int a = 0, b = 1;
    while (true) {
        co_yield a;
        auto temp = a;
        a = b;
        b = temp + b;
    }
}
\`\`\`
          `,
        },
        {
          id: "performance-comparison",
          title: "Performance Considerations",
          content: `
# C++ Performance Considerations

## Memory Management Performance

### Stack vs Heap Allocation
\`\`\`cpp
#include <chrono>
#include <iostream>
#include <vector>

class Timer {
private:
    std::chrono::high_resolution_clock::time_point start;
public:
    Timer() : start(std::chrono::high_resolution_clock::now()) {}
    
    ~Timer() {
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::microseconds>(end - start);
        std::cout << "Time: " << duration.count() << " microseconds" << std::endl;
    }
};

void stackAllocation() {
    Timer timer;
    for (int i = 0; i < 1000000; ++i) {
        int localArray[100];  // Stack allocation - very fast
        localArray[0] = i;
    }
}

void heapAllocation() {
    Timer timer;
    for (int i = 0; i < 1000000; ++i) {
        int* heapArray = new int[100];  // Heap allocation - slower
        heapArray[0] = i;
        delete[] heapArray;
    }
}

void vectorAllocation() {
    Timer timer;
    for (int i = 0; i < 1000000; ++i) {
        std::vector<int> vec(100);  // Vector allocation
        vec[0] = i;
    }
}
\`\`\`

### Smart Pointer Performance
\`\`\`cpp
#include <memory>

void rawPointerTest() {
    Timer timer;
    for (int i = 0; i < 1000000; ++i) {
        int* ptr = new int(i);
        // Use ptr...
        delete ptr;
    }
}

void uniquePtrTest() {
    Timer timer;
    for (int i = 0; i < 1000000; ++i) {
        auto ptr = std::make_unique<int>(i);
        // Use ptr... (automatic cleanup)
    }
}

void sharedPtrTest() {
    Timer timer;
    for (int i = 0; i < 1000000; ++i) {
        auto ptr = std::make_shared<int>(i);
        // Use ptr... (reference counting overhead)
    }
}
\`\`\`

## Compiler Optimizations

### Inline Functions
\`\`\`cpp
// Function call overhead
int add(int a, int b) {
    return a + b;
}

// Inline suggestion (compiler may ignore)
inline int addInline(int a, int b) {
    return a + b;
}

// Force inline (compiler-specific)
__forceinline int addForceInline(int a, int b) {
    return a + b;
}

// Template functions are implicitly inline
template<typename T>
T addTemplate(T a, T b) {
    return a + b;
}

// Lambda (often inlined by compiler)
auto addLambda = [](int a, int b) { return a + b; };
\`\`\`

### Move Semantics Performance
\`\`\`cpp
#include <string>
#include <vector>

class LargeObject {
private:
    std::vector<int> data;
    std::string description;

public:
    // Constructor
    LargeObject(size_t size, const std::string& desc) 
        : data(size, 42), description(desc) {}
    
    // Copy constructor (expensive)
    LargeObject(const LargeObject& other) 
        : data(other.data), description(other.description) {
        std::cout << "Copy constructor called" << std::endl;
    }
    
    // Move constructor (cheap)
    LargeObject(LargeObject&& other) noexcept
        : data(std::move(other.data)), description(std::move(other.description)) {
        std::cout << "Move constructor called" << std::endl;
    }
    
    // Copy assignment (expensive)
    LargeObject& operator=(const LargeObject& other) {
        if (this != &other) {
            data = other.data;
            description = other.description;
        }
        std::cout << "Copy assignment called" << std::endl;
        return *this;
    }
    
    // Move assignment (cheap)
    LargeObject& operator=(LargeObject&& other) noexcept {
        if (this != &other) {
            data = std::move(other.data);
            description = std::move(other.description);
        }
        std::cout << "Move assignment called" << std::endl;
        return *this;
    }
};

void demonstrateMoveSemantics() {
    std::vector<LargeObject> objects;
    
    // This will use move constructor (C++11+)
    objects.emplace_back(1000000, "Large object");
    
    // This creates a temporary, then moves it
    objects.push_back(LargeObject(1000000, "Another large object"));
    
    // Explicit move
    LargeObject obj(1000000, "Move me");
    objects.push_back(std::move(obj));  // obj is now in moved-from state
}
\`\`\`

## Benchmarking Best Practices

### Micro-benchmarking Template
\`\`\`cpp
#include <chrono>
#include <functional>
#include <iostream>

template<typename Func>
auto benchmark(Func&& func, int iterations = 1000000) {
    auto start = std::chrono::high_resolution_clock::now();
    
    for (int i = 0; i < iterations; ++i) {
        func();
    }
    
    auto end = std::chrono::high_resolution_clock::now();
    auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
    
    std::cout << "Average time per operation: " 
              << duration.count() / iterations << " nanoseconds" << std::endl;
              
    return duration;
}

// Usage
void testFunction() {
    volatile int sum = 0;  // volatile prevents optimization
    for (int i = 0; i < 100; ++i) {
        sum += i;
    }
}

int main() {
    benchmark(testFunction);
    return 0;
}
\`\`\`

### Optimization Flags Impact
\`\`\`bash
# No optimization
g++ -O0 program.cpp -o program_debug

# Basic optimization
g++ -O1 program.cpp -o program_O1

# More aggressive optimization
g++ -O2 program.cpp -o program_O2

# Maximum optimization (may increase binary size)
g++ -O3 program.cpp -o program_O3

# Optimize for size
g++ -Os program.cpp -o program_size

# Fast math optimizations (may break IEEE compliance)
g++ -O3 -ffast-math program.cpp -o program_fast_math
\`\`\`
          `,
        },
        {
          id: "arrays",
          title: "Arrays",
          content: `
## C++

\`\`\`cpp
// Static arrays
int arr1[5] = {1, 2, 3, 4, 5};
int arr2[5];

// Dynamic arrays using new/delete
int* arr3 = new int[5];
delete[] arr3;

// Using std::array (C++11+)
#include <array>
std::array<int, 5> arr4 = {1, 2, 3, 4, 5};

// Using std::vector (dynamic array)
#include <vector>
std::vector<int> arr5 = {1, 2, 3, 4, 5};
\`\`\`

## Java

\`\`\`java
// Arrays in Java
int[] arr1 = {1, 2, 3, 4, 5};
int[] arr2 = new int[5];

// ArrayList for dynamic arrays
import java.util.ArrayList;
ArrayList<Integer> arr3 = new ArrayList<>();
arr3.add(1);
arr3.add(2);

// Arrays class utilities
import java.util.Arrays;
System.out.println(Arrays.toString(arr1));
\`\`\`

## Python

\`\`\`python
# Lists (dynamic arrays)
arr1 = [1, 2, 3, 4, 5]
arr2 = []

# Arrays using array module
import array
arr3 = array.array('i', [1, 2, 3, 4, 5])

# NumPy arrays
import numpy as np
arr4 = np.array([1, 2, 3, 4, 5])
\`\`\`
          `,
        },
        {
          id: "linked-lists",
          title: "Linked Lists",
          content: `
## C++

\`\`\`cpp
#include <iostream>

struct Node {
    int data;
    Node* next;
    
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
private:
    Node* head;

public:
    LinkedList() : head(nullptr) {}
    
    void insert(int data) {
        Node* newNode = new Node(data);
        if (!head) {
            head = newNode;
        } else {
            Node* temp = head;
            while (temp->next) {
                temp = temp->next;
            }
            temp->next = newNode;
        }
    }
    
    void display() {
        Node* temp = head;
        while (temp) {
            std::cout << temp->data << " -> ";
            temp = temp->next;
        }
        std::cout << "NULL" << std::endl;
    }
    
    ~LinkedList() {
        while (head) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
    }
};
\`\`\`

## Java

\`\`\`java
class Node {
    int data;
    Node next;
    
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    private Node head;
    
    public void insert(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
        } else {
            Node temp = head;
            while (temp.next != null) {
                temp = temp.next;
            }
            temp.next = newNode;
        }
    }
    
    public void display() {
        Node temp = head;
        while (temp != null) {
            System.out.print(temp.data + " -> ");
            temp = temp.next;
        }
        System.out.println("NULL");
    }
}

// Using Java's built-in LinkedList
import java.util.LinkedList;
LinkedList<Integer> list = new LinkedList<>();
list.add(1);
list.add(2);
\`\`\`

## Python

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def insert(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node
    
    def display(self):
        elements = []
        current = self.head
        while current:
            elements.append(str(current.data))
            current = current.next
        print(" -> ".join(elements) + " -> None")

# Using deque for linked list operations
from collections import deque
linked_list = deque([1, 2, 3, 4, 5])
\`\`\`
          `,
        },
        {
          id: "stacks",
          title: "Stacks",
          content: `
## C++

\`\`\`cpp
#include <stack>
#include <vector>
#include <iostream>

// Using STL stack
std::stack<int> st;
st.push(10);
st.push(20);
st.push(30);

std::cout << "Top: " << st.top() << std::endl;
st.pop();
std::cout << "Size: " << st.size() << std::endl;

// Custom stack implementation
template<typename T>
class Stack {
private:
    std::vector<T> data;

public:
    void push(const T& item) {
        data.push_back(item);
    }
    
    void pop() {
        if (!data.empty()) {
            data.pop_back();
        }
    }
    
    T& top() {
        return data.back();
    }
    
    bool empty() const {
        return data.empty();
    }
    
    size_t size() const {
        return data.size();
    }
};
\`\`\`

## Java

\`\`\`java
import java.util.Stack;

// Using Java Stack class
Stack<Integer> stack = new Stack<>();
stack.push(10);
stack.push(20);
stack.push(30);

System.out.println("Top: " + stack.peek());
stack.pop();
System.out.println("Size: " + stack.size());
System.out.println("Empty: " + stack.isEmpty());

// Using ArrayDeque as stack (recommended)
import java.util.ArrayDeque;
ArrayDeque<Integer> stackDeque = new ArrayDeque<>();
stackDeque.push(10);
stackDeque.push(20);
System.out.println("Top: " + stackDeque.peek());

// Custom stack implementation
class CustomStack<T> {
    private Object[] array;
    private int top;
    private int capacity;
    
    public CustomStack(int size) {
        array = new Object[size];
        capacity = size;
        top = -1;
    }
    
    public void push(T item) {
        if (top < capacity - 1) {
            array[++top] = item;
        }
    }
    
    @SuppressWarnings("unchecked")
    public T pop() {
        if (top >= 0) {
            return (T) array[top--];
        }
        return null;
    }
}
\`\`\`

## Python

\`\`\`python
# Using list as stack
stack = []
stack.append(10)  # push
stack.append(20)
stack.append(30)

print("Top:", stack[-1])  # peek
stack.pop()  # pop
print("Size:", len(stack))

# Using deque for better performance
from collections import deque
stack_deque = deque()
stack_deque.append(10)
stack_deque.append(20)
print("Top:", stack_deque[-1])
stack_deque.pop()

# Custom stack implementation
class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, item):
        self.items.append(item)
    
    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        return None
    
    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        return None
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)
\`\`\`
          `,
        },
        {
          id: "queues",
          title: "Queues",
          content: `
## C++

\`\`\`cpp
#include <queue>
#include <iostream>

// Using STL queue
std::queue<int> q;
q.push(10);
q.push(20);
q.push(30);

std::cout << "Front: " << q.front() << std::endl;
std::cout << "Back: " << q.back() << std::endl;
q.pop();
std::cout << "Size: " << q.size() << std::endl;

// Priority queue
std::priority_queue<int> pq;
pq.push(30);
pq.push(10);
pq.push(20);
std::cout << "Top priority: " << pq.top() << std::endl; // 30

// Custom queue implementation
template<typename T>
class Queue {
private:
    struct Node {
        T data;
        Node* next;
        Node(T val) : data(val), next(nullptr) {}
    };
    
    Node* front;
    Node* rear;
    size_t count;

public:
    Queue() : front(nullptr), rear(nullptr), count(0) {}
    
    void enqueue(const T& item) {
        Node* newNode = new Node(item);
        if (!rear) {
            front = rear = newNode;
        } else {
            rear->next = newNode;
            rear = newNode;
        }
        count++;
    }
    
    void dequeue() {
        if (front) {
            Node* temp = front;
            front = front->next;
            if (!front) rear = nullptr;
            delete temp;
            count--;
        }
    }
    
    T& getFront() { return front->data; }
    size_t size() const { return count; }
    bool empty() const { return front == nullptr; }
};
\`\`\`

## Java

\`\`\`java
import java.util.Queue;
import java.util.LinkedList;
import java.util.PriorityQueue;

// Using Queue interface with LinkedList
Queue<Integer> queue = new LinkedList<>();
queue.offer(10);  // add to rear
queue.offer(20);
queue.offer(30);

System.out.println("Front: " + queue.peek());
queue.poll();  // remove from front
System.out.println("Size: " + queue.size());

// Priority Queue
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(30);
pq.offer(10);
pq.offer(20);
System.out.println("Min element: " + pq.peek()); // 10

// ArrayDeque as queue
import java.util.ArrayDeque;
ArrayDeque<Integer> queueDeque = new ArrayDeque<>();
queueDeque.addLast(10);
queueDeque.addLast(20);
System.out.println("Front: " + queueDeque.peekFirst());

// Custom queue implementation
class CustomQueue<T> {
    private Node<T> front, rear;
    private int size;
    
    private static class Node<T> {
        T data;
        Node<T> next;
        
        Node(T data) {
            this.data = data;
        }
    }
    
    public void enqueue(T item) {
        Node<T> newNode = new Node<>(item);
        if (rear == null) {
            front = rear = newNode;
        } else {
            rear.next = newNode;
            rear = newNode;
        }
        size++;
    }
    
    public T dequeue() {
        if (front == null) return null;
        T data = front.data;
        front = front.next;
        if (front == null) rear = null;
        size--;
        return data;
    }
}
\`\`\`

## Python

\`\`\`python
# Using deque for queue operations
from collections import deque

queue = deque()
queue.append(10)    # enqueue
queue.append(20)
queue.append(30)

print("Front:", queue[0])
queue.popleft()     # dequeue
print("Size:", len(queue))

# Priority Queue
import heapq

pq = []
heapq.heappush(pq, 30)
heapq.heappush(pq, 10)
heapq.heappush(pq, 20)
print("Min element:", pq[0])
min_element = heapq.heappop(pq)

# Using queue module
import queue

# FIFO Queue
q = queue.Queue()
q.put(10)
q.put(20)
item = q.get()

# Priority Queue
pq = queue.PriorityQueue()
pq.put((2, "low priority"))
pq.put((1, "high priority"))

# Custom queue implementation
class Queue:
    def __init__(self):
        self.items = []
    
    def enqueue(self, item):
        self.items.append(item)
    
    def dequeue(self):
        if not self.is_empty():
            return self.items.pop(0)
        return None
    
    def front(self):
        if not self.is_empty():
            return self.items[0]
        return None
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)

# Better performance with deque
class DequeQueue:
    def __init__(self):
        self.items = deque()
    
    def enqueue(self, item):
        self.items.append(item)
    
    def dequeue(self):
        if self.items:
            return self.items.popleft()
        return None
\`\`\`
          `,
        },
        {
          id: "trees",
          title: "Trees",
          content: `
## C++

\`\`\`cpp
#include <iostream>
#include <queue>

// Binary Tree Node
struct TreeNode {
    int data;
    TreeNode* left;
    TreeNode* right;
    
    TreeNode(int val) : data(val), left(nullptr), right(nullptr) {}
};

class BinaryTree {
private:
    TreeNode* root;
    
    void inorderHelper(TreeNode* node) {
        if (node) {
            inorderHelper(node->left);
            std::cout << node->data << " ";
            inorderHelper(node->right);
        }
    }
    
    void deleteTree(TreeNode* node) {
        if (node) {
            deleteTree(node->left);
            deleteTree(node->right);
            delete node;
        }
    }

public:
    BinaryTree() : root(nullptr) {}
    
    void insert(int data) {
        if (!root) {
            root = new TreeNode(data);
            return;
        }
        
        std::queue<TreeNode*> q;
        q.push(root);
        
        while (!q.empty()) {
            TreeNode* temp = q.front();
            q.pop();
            
            if (!temp->left) {
                temp->left = new TreeNode(data);
                return;
            } else {
                q.push(temp->left);
            }
            
            if (!temp->right) {
                temp->right = new TreeNode(data);
                return;
            } else {
                q.push(temp->right);
            }
        }
    }
    
    void inorder() {
        inorderHelper(root);
        std::cout << std::endl;
    }
    
    ~BinaryTree() {
        deleteTree(root);
    }
};

// Binary Search Tree
class BST {
private:
    TreeNode* root;
    
    TreeNode* insertHelper(TreeNode* node, int data) {
        if (!node) {
            return new TreeNode(data);
        }
        
        if (data < node->data) {
            node->left = insertHelper(node->left, data);
        } else {
            node->right = insertHelper(node->right, data);
        }
        
        return node;
    }

public:
    BST() : root(nullptr) {}
    
    void insert(int data) {
        root = insertHelper(root, data);
    }
};
\`\`\`

## Java

\`\`\`java
import java.util.Queue;
import java.util.LinkedList;

// Binary Tree Node
class TreeNode {
    int data;
    TreeNode left, right;
    
    TreeNode(int data) {
        this.data = data;
        this.left = this.right = null;
    }
}

class BinaryTree {
    TreeNode root;
    
    public void insert(int data) {
        if (root == null) {
            root = new TreeNode(data);
            return;
        }
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        
        while (!queue.isEmpty()) {
            TreeNode temp = queue.poll();
            
            if (temp.left == null) {
                temp.left = new TreeNode(data);
                return;
            } else {
                queue.add(temp.left);
            }
            
            if (temp.right == null) {
                temp.right = new TreeNode(data);
                return;
            } else {
                queue.add(temp.right);
            }
        }
    }
    
    public void inorder(TreeNode node) {
        if (node != null) {
            inorder(node.left);
            System.out.print(node.data + " ");
            inorder(node.right);
        }
    }
    
    public void levelOrder() {
        if (root == null) return;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            System.out.print(node.data + " ");
            
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
    }
}

// Using TreeMap (Red-Black Tree)
import java.util.TreeMap;
TreeMap<Integer, String> treeMap = new TreeMap<>();
treeMap.put(1, "One");
treeMap.put(3, "Three");
treeMap.put(2, "Two");
\`\`\`

## Python

\`\`\`python
from collections import deque

# Binary Tree Node
class TreeNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

class BinaryTree:
    def __init__(self):
        self.root = None
    
    def insert(self, data):
        if not self.root:
            self.root = TreeNode(data)
            return
        
        queue = deque([self.root])
        
        while queue:
            node = queue.popleft()
            
            if not node.left:
                node.left = TreeNode(data)
                return
            else:
                queue.append(node.left)
            
            if not node.right:
                node.right = TreeNode(data)
                return
            else:
                queue.append(node.right)
    
    def inorder(self, node):
        if node:
            self.inorder(node.left)
            print(node.data, end=" ")
            self.inorder(node.right)
    
    def level_order(self):
        if not self.root:
            return
        
        queue = deque([self.root])
        
        while queue:
            node = queue.popleft()
            print(node.data, end=" ")
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

# Binary Search Tree
class BST:
    def __init__(self):
        self.root = None
    
    def insert(self, data):
        self.root = self._insert_helper(self.root, data)
    
    def _insert_helper(self, node, data):
        if not node:
            return TreeNode(data)
        
        if data < node.data:
            node.left = self._insert_helper(node.left, data)
        else:
            node.right = self._insert_helper(node.right, data)
        
        return node
    
    def search(self, data):
        return self._search_helper(self.root, data)
    
    def _search_helper(self, node, data):
        if not node or node.data == data:
            return node
        
        if data < node.data:
            return self._search_helper(node.left, data)
        
        return self._search_helper(node.right, data)

# Using built-in data structures
# For ordered operations, you might use:
import bisect

sorted_list = []
bisect.insort(sorted_list, 5)
bisect.insort(sorted_list, 2)
bisect.insort(sorted_list, 8)
print(sorted_list)  # [2, 5, 8]
\`\`\`
          `,
        },
        {
          id: "hash-tables",
          title: "Hash Tables",
          content: `
## C++

\`\`\`cpp
#include <unordered_map>
#include <unordered_set>
#include <iostream>

// Using STL unordered_map (hash table)
std::unordered_map<std::string, int> hashMap;
hashMap["apple"] = 5;
hashMap["banana"] = 3;
hashMap["orange"] = 8;

// Accessing values
std::cout << "Apple count: " << hashMap["apple"] << std::endl;

// Checking if key exists
if (hashMap.find("grape") != hashMap.end()) {
    std::cout << "Grape found" << std::endl;
} else {
    std::cout << "Grape not found" << std::endl;
}

// Using unordered_set
std::unordered_set<int> hashSet = {1, 2, 3, 4, 5};
hashSet.insert(6);

// Custom hash table implementation
template<typename K, typename V>
class HashTable {
private:
    struct Node {
        K key;
        V value;
        Node* next;
        
        Node(K k, V v) : key(k), value(v), next(nullptr) {}
    };
    
    Node** table;
    size_t capacity;
    size_t size;
    
    size_t hash(const K& key) {
        std::hash<K> hasher;
        return hasher(key) % capacity;
    }

public:
    HashTable(size_t cap = 16) : capacity(cap), size(0) {
        table = new Node*[capacity]();
    }
    
    void put(const K& key, const V& value) {
        size_t index = hash(key);
        Node* current = table[index];
        
        // Check if key already exists
        while (current) {
            if (current->key == key) {
                current->value = value;
                return;
            }
            current = current->next;
        }
        
        // Insert new node at beginning
        Node* newNode = new Node(key, value);
        newNode->next = table[index];
        table[index] = newNode;
        size++;
    }
    
    V get(const K& key) {
        size_t index = hash(key);
        Node* current = table[index];
        
        while (current) {
            if (current->key == key) {
                return current->value;
            }
            current = current->next;
        }
        
        throw std::runtime_error("Key not found");
    }
    
    ~HashTable() {
        for (size_t i = 0; i < capacity; i++) {
            Node* current = table[i];
            while (current) {
                Node* temp = current;
                current = current->next;
                delete temp;
            }
        }
        delete[] table;
    }
};
\`\`\`

## Java

\`\`\`java
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

// Using HashMap
HashMap<String, Integer> hashMap = new HashMap<>();
hashMap.put("apple", 5);
hashMap.put("banana", 3);
hashMap.put("orange", 8);

// Accessing values
System.out.println("Apple count: " + hashMap.get("apple"));

// Checking if key exists
if (hashMap.containsKey("grape")) {
    System.out.println("Grape found");
} else {
    System.out.println("Grape not found");
}

// Iterating through HashMap
for (Map.Entry<String, Integer> entry : hashMap.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}

// Using HashSet
HashSet<Integer> hashSet = new HashSet<>();
hashSet.add(1);
hashSet.add(2);
hashSet.add(3);
hashSet.add(2); // Won't add duplicate

// Custom hash table implementation
class HashTable<K, V> {
    private class Node {
        K key;
        V value;
        Node next;
        
        Node(K key, V value) {
            this.key = key;
            this.value = value;
        }
    }
    
    private Node[] table;
    private int capacity;
    private int size;
    
    @SuppressWarnings("unchecked")
    public HashTable(int capacity) {
        this.capacity = capacity;
        this.table = new Node[capacity];
        this.size = 0;
    }
    
    private int hash(K key) {
        return Math.abs(key.hashCode()) % capacity;
    }
    
    public void put(K key, V value) {
        int index = hash(key);
        Node current = table[index];
        
        // Check if key already exists
        while (current != null) {
            if (current.key.equals(key)) {
                current.value = value;
                return;
            }
            current = current.next;
        }
        
        // Insert new node
        Node newNode = new Node(key, value);
        newNode.next = table[index];
        table[index] = newNode;
        size++;
    }
    
    public V get(K key) {
        int index = hash(key);
        Node current = table[index];
        
        while (current != null) {
            if (current.key.equals(key)) {
                return current.value;
            }
            current = current.next;
        }
        
        return null;
    }
}
\`\`\`

## Python

\`\`\`python
# Using built-in dict (hash table)
hash_map = {}
hash_map["apple"] = 5
hash_map["banana"] = 3
hash_map["orange"] = 8

# Alternative initialization
hash_map = {"apple": 5, "banana": 3, "orange": 8}

# Accessing values
print("Apple count:", hash_map["apple"])

# Checking if key exists
if "grape" in hash_map:
    print("Grape found")
else:
    print("Grape not found")

# Using get() method with default
count = hash_map.get("grape", 0)

# Using set for hash-based storage
hash_set = {1, 2, 3, 4, 5}
hash_set.add(6)
hash_set.add(2)  # Won't add duplicate

# Iterating through dictionary
for key, value in hash_map.items():
    print(f"{key}: {value}")

# Using defaultdict
from collections import defaultdict

dd = defaultdict(int)
dd["apple"] += 1
dd["banana"] += 2

# Counter for frequency counting
from collections import Counter

words = ["apple", "banana", "apple", "orange", "banana", "apple"]
counter = Counter(words)
print(counter)  # Counter({'apple': 3, 'banana': 2, 'orange': 1})

# Custom hash table implementation
class HashTable:
    def __init__(self, capacity=16):
        self.capacity = capacity
        self.size = 0
        self.table = [[] for _ in range(capacity)]
    
    def _hash(self, key):
        return hash(key) % self.capacity
    
    def put(self, key, value):
        index = self._hash(key)
        bucket = self.table[index]
        
        # Check if key already exists
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        
        # Add new key-value pair
        bucket.append((key, value))
        self.size += 1
    
    def get(self, key):
        index = self._hash(key)
        bucket = self.table[index]
        
        for k, v in bucket:
            if k == key:
                return v
        
        raise KeyError(f"Key '{key}' not found")
    
    def remove(self, key):
        index = self._hash(key)
        bucket = self.table[index]
        
        for i, (k, v) in enumerate(bucket):
            if k == key:
                del bucket[i]
                self.size -= 1
                return v
        
        raise KeyError(f"Key '{key}' not found")
    
    def __contains__(self, key):
        try:
            self.get(key)
            return True
        except KeyError:
            return False
    
    def keys(self):
        keys = []
        for bucket in self.table:
            for k, v in bucket:
                keys.append(k)
        return keys
\`\`\`
          `,
        },
        {
          id: "graphs",
          title: "Graphs",
          content: `
## C++

\`\`\`cpp
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

// Adjacency List representation
class Graph {
private:
    std::unordered_map<int, std::vector<int>> adjList;
    bool isDirected;

public:
    Graph(bool directed = false) : isDirected(directed) {}
    
    void addVertex(int vertex) {
        if (adjList.find(vertex) == adjList.end()) {
            adjList[vertex] = std::vector<int>();
        }
    }
    
    void addEdge(int src, int dest) {
        addVertex(src);
        addVertex(dest);
        
        adjList[src].push_back(dest);
        if (!isDirected) {
            adjList[dest].push_back(src);
        }
    }
    
    // Breadth-First Search
    void BFS(int start) {
        std::unordered_set<int> visited;
        std::queue<int> q;
        
        q.push(start);
        visited.insert(start);
        
        while (!q.empty()) {
            int vertex = q.front();
            q.pop();
            std::cout << vertex << " ";
            
            for (int neighbor : adjList[vertex]) {
                if (visited.find(neighbor) == visited.end()) {
                    q.push(neighbor);
                    visited.insert(neighbor);
                }
            }
        }
        std::cout << std::endl;
    }
    
    // Depth-First Search
    void DFSHelper(int vertex, std::unordered_set<int>& visited) {
        visited.insert(vertex);
        std::cout << vertex << " ";
        
        for (int neighbor : adjList[vertex]) {
            if (visited.find(neighbor) == visited.end()) {
                DFSHelper(neighbor, visited);
            }
        }
    }
    
    void DFS(int start) {
        std::unordered_set<int> visited;
        DFSHelper(start, visited);
        std::cout << std::endl;
    }
    
    void printGraph() {
        for (auto& pair : adjList) {
            std::cout << pair.first << " -> ";
            for (int neighbor : pair.second) {
                std::cout << neighbor << " ";
            }
            std::cout << std::endl;
        }
    }
};

// Weighted Graph using adjacency list
class WeightedGraph {
private:
    std::unordered_map<int, std::vector<std::pair<int, int>>> adjList;

public:
    void addEdge(int src, int dest, int weight) {
        adjList[src].push_back({dest, weight});
        adjList[dest].push_back({src, weight}); // For undirected graph
    }
};
\`\`\`

## Java

\`\`\`java
import java.util.*;

// Adjacency List representation
class Graph {
    private Map<Integer, List<Integer>> adjList;
    private boolean isDirected;
    
    public Graph(boolean directed) {
        this.adjList = new HashMap<>();
        this.isDirected = directed;
    }
    
    public void addVertex(int vertex) {
        adjList.putIfAbsent(vertex, new ArrayList<>());
    }
    
    public void addEdge(int src, int dest) {
        addVertex(src);
        addVertex(dest);
        
        adjList.get(src).add(dest);
        if (!isDirected) {
            adjList.get(dest).add(src);
        }
    }
    
    // Breadth-First Search
    public void BFS(int start) {
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new LinkedList<>();
        
        queue.offer(start);
        visited.add(start);
        
        while (!queue.isEmpty()) {
            int vertex = queue.poll();
            System.out.print(vertex + " ");
            
            for (int neighbor : adjList.getOrDefault(vertex, new ArrayList<>())) {
                if (!visited.contains(neighbor)) {
                    queue.offer(neighbor);
                    visited.add(neighbor);
                }
            }
        }
        System.out.println();
    }
    
    // Depth-First Search
    public void DFS(int start) {
        Set<Integer> visited = new HashSet<>();
        DFSHelper(start, visited);
        System.out.println();
    }
    
    private void DFSHelper(int vertex, Set<Integer> visited) {
        visited.add(vertex);
        System.out.print(vertex + " ");
        
        for (int neighbor : adjList.getOrDefault(vertex, new ArrayList<>())) {
            if (!visited.contains(neighbor)) {
                DFSHelper(neighbor, visited);
            }
        }
    }
    
    public void printGraph() {
        for (Map.Entry<Integer, List<Integer>> entry : adjList.entrySet()) {
            System.out.print(entry.getKey() + " -> ");
            for (int neighbor : entry.getValue()) {
                System.out.print(neighbor + " ");
            }
            System.out.println();
        }
    }
}

// Weighted Graph
class WeightedGraph {
    private Map<Integer, List<Edge>> adjList;
    
    static class Edge {
        int dest, weight;
        
        Edge(int dest, int weight) {
            this.dest = dest;
            this.weight = weight;
        }
    }
    
    public WeightedGraph() {
        this.adjList = new HashMap<>();
    }
    
    public void addEdge(int src, int dest, int weight) {
        adjList.putIfAbsent(src, new ArrayList<>());
        adjList.putIfAbsent(dest, new ArrayList<>());
        
        adjList.get(src).add(new Edge(dest, weight));
        adjList.get(dest).add(new Edge(src, weight)); // For undirected
    }
}

// Usage example
public class GraphExample {
    public static void main(String[] args) {
        Graph graph = new Graph(false);
        
        graph.addEdge(0, 1);
        graph.addEdge(0, 2);
        graph.addEdge(1, 3);
        graph.addEdge(2, 3);
        
        System.out.println("BFS starting from vertex 0:");
        graph.BFS(0);
        
        System.out.println("DFS starting from vertex 0:");
        graph.DFS(0);
    }
}
\`\`\`

## Python

\`\`\`python
from collections import defaultdict, deque

# Adjacency List representation using defaultdict
class Graph:
    def __init__(self, directed=False):
        self.adj_list = defaultdict(list)
        self.is_directed = directed
    
    def add_vertex(self, vertex):
        if vertex not in self.adj_list:
            self.adj_list[vertex] = []
    
    def add_edge(self, src, dest):
        self.adj_list[src].append(dest)
        if not self.is_directed:
            self.adj_list[dest].append(src)
    
    def BFS(self, start):
        visited = set()
        queue = deque([start])
        visited.add(start)
        result = []
        
        while queue:
            vertex = queue.popleft()
            result.append(vertex)
            
            for neighbor in self.adj_list[vertex]:
                if neighbor not in visited:
                    queue.append(neighbor)
                    visited.add(neighbor)
        
        return result
    
    def DFS(self, start, visited=None):
        if visited is None:
            visited = set()
        
        visited.add(start)
        result = [start]
        
        for neighbor in self.adj_list[start]:
            if neighbor not in visited:
                result.extend(self.DFS(neighbor, visited))
        
        return result
    
    def DFS_iterative(self, start):
        visited = set()
        stack = [start]
        result = []
        
        while stack:
            vertex = stack.pop()
            if vertex not in visited:
                visited.add(vertex)
                result.append(vertex)
                
                # Add neighbors to stack in reverse order
                # to maintain left-to-right traversal
                for neighbor in reversed(self.adj_list[vertex]):
                    if neighbor not in visited:
                        stack.append(neighbor)
        
        return result
    
    def has_path(self, start, end):
        if start == end:
            return True
        
        visited = set()
        queue = deque([start])
        visited.add(start)
        
        while queue:
            vertex = queue.popleft()
            
            for neighbor in self.adj_list[vertex]:
                if neighbor == end:
                    return True
                if neighbor not in visited:
                    queue.append(neighbor)
                    visited.add(neighbor)
        
        return False
    
    def print_graph(self):
        for vertex in self.adj_list:
            print(f"{vertex} -> {' '.join(map(str, self.adj_list[vertex]))}")

# Weighted Graph
class WeightedGraph:
    def __init__(self, directed=False):
        self.adj_list = defaultdict(list)
        self.is_directed = directed
    
    def add_edge(self, src, dest, weight):
        self.adj_list[src].append((dest, weight))
        if not self.is_directed:
            self.adj_list[dest].append((src, weight))
    
    def dijkstra(self, start):
        import heapq
        
        # Distance dictionary
        distances = defaultdict(lambda: float('inf'))
        distances[start] = 0
        
        # Priority queue: (distance, vertex)
        pq = [(0, start)]
        visited = set()
        
        while pq:
            current_dist, current_vertex = heapq.heappop(pq)
            
            if current_vertex in visited:
                continue
            
            visited.add(current_vertex)
            
            for neighbor, weight in self.adj_list[current_vertex]:
                distance = current_dist + weight
                
                if distance < distances[neighbor]:
                    distances[neighbor] = distance
                    heapq.heappush(pq, (distance, neighbor))
        
        return dict(distances)

# Using NetworkX (popular graph library)
# pip install networkx
import networkx as nx

# Create a graph
G = nx.Graph()  # Undirected graph
# G = nx.DiGraph()  # Directed graph

# Add nodes and edges
G.add_node(1)
G.add_edge(1, 2)
G.add_edge(2, 3)
G.add_edge(3, 4)
G.add_edge(4, 1)

# Graph algorithms
print("Nodes:", list(G.nodes()))
print("Edges:", list(G.edges()))
print("Shortest path 1->3:", nx.shortest_path(G, 1, 3))

# Usage example
if __name__ == "__main__":
    graph = Graph(directed=False)
    
    # Add edges
    graph.add_edge(0, 1)
    graph.add_edge(0, 2)
    graph.add_edge(1, 3)
    graph.add_edge(2, 3)
    
    print("Graph representation:")
    graph.print_graph()
    
    print(f"BFS starting from vertex 0: {graph.BFS(0)}")
    print(f"DFS starting from vertex 0: {graph.DFS(0)}")
    print(f"Path exists from 0 to 3: {graph.has_path(0, 3)}")
\`\`\`
          `,
        },
      ],
    },
    oop: {
      id: "oop",
      title: "Object-Oriented Programming",
      description: "Classes, objects, inheritance, polymorphism and more",
      icon: "Box",
      color: "green",
      topics: [
        {
          id: "classes-objects",
          title: "Classes & Objects",
          content: `
# Classes & Objects

## What is Object-Oriented Programming?

Object-Oriented Programming (OOP) is a programming paradigm that uses objects and classes to design and build applications. C++ was designed with the main intention of adding object-oriented programming to C language.

### Why Object-Oriented Programming?

- As the size of the program increases **readability, maintainability, and bug-free nature of the program decrease**
- This was the major problem with languages like C which relied upon functions or procedure (procedural programming)
- Data was almost neglected, data security was easily compromised
- Using classes solves this problem by modeling program as a real-world scenario

## Difference between Procedure Oriented Programming and OOP

### Procedure Oriented Programming
- Consists of writing a set of instruction for the computer to follow
- The main focus is on functions and not on the flow of data
- Functions can either use local or global data
- Data moves openly from function to function

### Object-Oriented Programming
- Works on the concept of classes and object
- A class is a template to create objects
- Treats data as a critical element
- Decomposes the problem in objects and builds data and functions around the objects

## Basic Concepts in Object-Oriented Programming

- **Classes** - Basic template for creating objects
- **Objects** - Basic run-time entities
- **Data Abstraction & Encapsulation** - Wrapping data and functions into a single unit
- **Inheritance** - Properties of one class can be inherited into others
- **Polymorphism** - Ability to take more than one forms
- **Dynamic Binding** - Code which will execute is not known until the program runs
- **Message Passing** - message (Information) call format

## Classes in C++

**Collection of objects** is called class. It is a logical entity. Classes are user-defined data-types and are a template for creating objects. Classes consist of variables and functions which are also called class members.

\`\`\`cpp
#include<iostream>
using namespace std;

class Employee {
private:
    int id;
    int salary;
    
public:
    void setData(int empId, int empSalary) {
        id = empId;
        salary = empSalary;
    }
    
    void getData() {
        cout << "Employee ID: " << id << endl;
        cout << "Salary: " << salary << endl;
    }
};

int main() {
    Employee harry;
    harry.setData(1, 50000);
    harry.getData();
    return 0;
}
\`\`\`

## Objects in C++

Objects are instances of classes. When a class is defined, no memory is allocated, but when an object is instantiated, memory is allocated.

\`\`\`cpp
// Declaring objects
Employee harry, rohan, lovish;

// Objects can also be declared along with class definition
class Employee {
    // Class definition
} harry, rohan, lovish;
\`\`\`

## Benefits of Object-Oriented Programming

- Better code reusability using objects and inheritance
- Principle of data hiding helps build secure systems
- Multiple Objects can co-exist without any interference
- Software complexity can be easily managed
          `,
        },
        {
          id: "access-modifiers",
          title: "Access Modifiers",
          content: `
# Access Modifiers

Access modifiers in C++ are used to set the accessibility of classes, methods, and other members. They define how the members of a class can be accessed.

## Types of Access Modifiers

### Public Access Modifier

All the variables and functions declared under public access modifier will be available for everyone. They can be accessed both inside and outside the class. Dot (.) operator is used to access public data members directly.

\`\`\`cpp
class Employee {
public:
    int id;        // Public member
    string name;   // Public member
    
    void displayInfo() {  // Public function
        cout << "ID: " << id << ", Name: " << name << endl;
    }
};

int main() {
    Employee emp;
    emp.id = 101;      // Direct access to public member
    emp.name = "John"; // Direct access to public member
    emp.displayInfo(); // Calling public function
    return 0;
}
\`\`\`

### Private Access Modifier

All the variables and functions declared under a private access modifier can only be used inside the class. They are not accessible by any object or function outside the class.

\`\`\`cpp
class Employee {
private:
    int salary;    // Private member
    string ssn;    // Private member
    
public:
    void setSalary(int sal) {
        salary = sal;  // Can access private member from within class
    }
    
    int getSalary() {
        return salary; // Can access private member from within class
    }
};

int main() {
    Employee emp;
    // emp.salary = 50000;  // ERROR! Cannot access private member
    emp.setSalary(50000);   // OK! Using public function to set private data
    cout << emp.getSalary(); // OK! Using public function to get private data
    return 0;
}
\`\`\`

### Protected Access Modifier

Protected access modifier is similar to private access modifier, but protected members can be accessed by derived classes (inheritance).

\`\`\`cpp
class Employee {
protected:
    int employeeId;    // Protected member
    
public:
    void setId(int id) {
        employeeId = id;
    }
};

class Manager : public Employee {
public:
    void showId() {
        cout << employeeId; // Can access protected member in derived class
    }
};
\`\`\`

## Why Use Access Modifiers?

### Data Hiding
- **Private members cannot be accessed directly from outside the class**
- This helps in data security and prevents unauthorized access
- Forces users to use defined interfaces (public functions)

### Encapsulation
- **Binding (or wrapping) code and data together into a single unit**
- Hides internal implementation details
- Provides controlled access through public methods

### Example: Banking System
\`\`\`cpp
class BankAccount {
private:
    double balance;    // Private - cannot be directly modified
    string accountNum; // Private - sensitive information
    
public:
    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
    
    bool withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }
    
    double getBalance() {
        return balance;
    }
};
\`\`\`

In this example, the balance cannot be directly modified from outside, ensuring data integrity and security.
          `,
        },
        {
          id: "constructors",
          title: "Constructors",
          content: `
# Constructors in C++

A constructor is a special member function with the same name as the class. **The constructor doesn't have a return type**. Constructors are used to initialize the objects of its class. **Constructors are automatically invoked whenever an object is created.**

## Important Characteristics of Constructors

- **A constructor should be declared in the public section of the class**
- They are automatically invoked whenever the object is created
- They cannot return values and do not have return types
- **It can have default arguments**
- We cannot refer to their address

## Default Constructor

A default constructor is a constructor that takes no parameters.

\`\`\`cpp
#include <iostream>
using namespace std;

class Complex {
    int a, b;
    
public:
    // Default Constructor
    Complex() {
        a = 10;
        b = 0;
        cout << "Default constructor called" << endl;
    }
    
    void printNumber() {
        cout << "Number is: " << a << " + " << b << "i" << endl;
    }
};

int main() {
    Complex c1, c2, c3;  // Default constructor called for each object
    c1.printNumber();
    c2.printNumber();
    c3.printNumber();
    return 0;
}
\`\`\`

## Parameterized Constructor

Parameterized constructors are those constructors that take one or more parameters.

\`\`\`cpp
class Complex {
    int a, b;
    
public:
    // Parameterized Constructor
    Complex(int x, int y) {
        a = x;
        b = y;
        cout << "Parameterized constructor called" << endl;
    }
    
    void printNumber() {
        cout << "Number is: " << a << " + " << b << "i" << endl;
    }
};

int main() {
    // Different ways to call parameterized constructor
    
    // Implicit call
    Complex a(4, 6);
    a.printNumber();
    
    // Explicit call
    Complex b = Complex(5, 7);
    b.printNumber();
    
    return 0;
}
\`\`\`

## Constructor Overloading

Constructor overloading is a concept in which one class can have multiple constructors with different parameters. The compiler automatically chooses the appropriate constructor based on the arguments provided.

\`\`\`cpp
class Complex {
    int a, b;
    
public:
    // Default constructor
    Complex() {
        a = 0;
        b = 0;
    }
    
    // Parameterized constructor with 1 parameter
    Complex(int x) {
        a = x;
        b = 0;
    }
    
    // Parameterized constructor with 2 parameters
    Complex(int x, int y) {
        a = x;
        b = y;
    }
    
    void printNumber() {
        cout << "Number is: " << a << " + " << b << "i" << endl;
    }
};

int main() {
    Complex c1;          // Calls default constructor
    Complex c2(5);       // Calls constructor with 1 parameter
    Complex c3(4, 6);    // Calls constructor with 2 parameters
    
    c1.printNumber();
    c2.printNumber();
    c3.printNumber();
    
    return 0;
}
\`\`\`

## Constructor with Default Arguments

Default arguments can be provided in constructor declarations. If values are not provided when calling the constructor, the constructor uses the default arguments automatically.

\`\`\`cpp
class Rectangle {
    int length, width;
    
public:
    // Constructor with default arguments
    Rectangle(int l = 5, int w = 3) {
        length = l;
        width = w;
    }
    
    void display() {
        cout << "Length: " << length << ", Width: " << width << endl;
        cout << "Area: " << length * width << endl;
    }
};

int main() {
    Rectangle r1;        // Uses default values: 5, 3
    Rectangle r2(10);    // Uses: 10, 3 (default width)
    Rectangle r3(8, 6);  // Uses: 8, 6
    
    r1.display();
    r2.display();
    r3.display();
    
    return 0;
}
\`\`\`

## Dynamic Initialization of Objects

**The dynamic initialization of the object means that the object is initialized at the runtime**. This is beneficial when the data is of different formats or when initialization depends on runtime conditions.

\`\`\`cpp
#include <iostream>
using namespace std;

class BankDeposit {
    int principal;
    int years;
    float interestRate;
    float returnValue;
    
public:
    // Constructor for interest rate as float
    BankDeposit(int p, int y, float r) {
        principal = p;
        years = y;
        interestRate = r;
        returnValue = principal;
        
        for (int i = 0; i < y; i++) {
            returnValue = returnValue * (1 + interestRate);
        }
    }
    
    // Constructor for interest rate as integer (percentage)
    BankDeposit(int p, int y, int r) {
        principal = p;
        years = y;
        interestRate = float(r) / 100;
        returnValue = principal;
        
        for (int i = 0; i < y; i++) {
            returnValue = returnValue * (1 + interestRate);
        }
    }
    
    void show() {
        cout << "Principal amount: " << principal 
             << ", Return value after " << years 
             << " years is " << returnValue << endl;
    }
};

int main() {
    BankDeposit bd1, bd2, bd3;
    
    int p, y, R;
    float r;
    
    // Runtime initialization
    cout << "Enter principal, years, and interest rate (as percentage): ";
    cin >> p >> y >> R;
    bd1 = BankDeposit(p, y, R);
    bd1.show();
    
    cout << "Enter principal, years, and interest rate (as decimal): ";
    cin >> p >> y >> r;
    bd2 = BankDeposit(p, y, r);
    bd2.show();
    
    return 0;
}
\`\`\`
          `,
        },
        {
          id: "copy-constructor",
          title: "Copy Constructor",
          content: `
# Copy Constructor in C++

A Copy constructor is an **overloaded** constructor used to declare and initialize an object from another object. **A copy constructor is a type of constructor that creates a copy of another object**. If we want one object to resemble another object we can use a copy constructor.

## Copy Constructor Types

### Default Copy Constructor
The compiler defines the default copy constructor. If the user defines no copy constructor, compiler supplies its constructor.

### User Defined Copy Constructor
The programmer defines the user-defined constructor.

## Syntax Of User-defined Copy Constructor

\`\`\`cpp
Class_name(const class_name &old_object);
\`\`\`

## When Copy Constructor is Called

Copy Constructor is called in the following scenarios:

1. **When we initialize the object with another existing object of the same class type**
   - Example: \`Student s1 = s2\`, where Student is the class
2. **When the object of the same class type is passed by value as an argument**
3. **When the function returns the object of the same class type by value**

## Example: Copy Constructor

\`\`\`cpp
#include<iostream>
using namespace std;

class Number {
    int a;
    
public:
    // Default constructor
    Number() {
        a = 0;
    }
    
    // Parameterized constructor
    Number(int num) {
        a = num;
    }
    
    // Copy constructor (user-defined)
    Number(const Number &obj) {
        cout << "Copy constructor called!!!" << endl;
        a = obj.a;
    }
    
    void display() {
        cout << "The number for this object is " << a << endl;
    }
};

int main() {
    Number x, y, z(45), z2;
    x.display();
    y.display();
    z.display();
    
    // Copy constructor will be called
    Number z1(z);  // Copy constructor invoked
    z1.display();
    
    // Copy constructor will be called
    Number z3 = z; // Copy constructor invoked
    z3.display();
    
    // Note: z1 should exactly resemble z or x or y
    return 0;
}
\`\`\`

## Shallow Copy vs Deep Copy

### Shallow Copy
- The default copy constructor can only produce the shallow copy
- A Shallow copy is defined as the process of creating the copy of an object by copying data of all the member variables as it is
- **Problem**: When objects contain pointers, both objects point to the same memory location

\`\`\`cpp
class Demo {
public:
    int a, b;
    int *p;
    
    Demo() {
        p = new int;
    }
    
    // Default copy constructor creates shallow copy
    void display() {
        cout << "a=" << a << " b=" << b << " *p=" << *p << endl;
    }
};
\`\`\`

### Deep Copy
- Deep copy dynamically allocates the memory for the copy and then copies the actual value
- Both the source and copy have distinct memory locations
- Requires user-defined copy constructor

\`\`\`cpp
class Demo {
public:
    int a, b;
    int *p;
    
    Demo() {
        p = new int;
    }
    
    // User-defined copy constructor for deep copy
    Demo(const Demo &obj) {
        a = obj.a;
        b = obj.b;
        p = new int;    // Allocate new memory
        *p = *(obj.p);  // Copy the value, not the address
    }
    
    void display() {
        cout << "a=" << a << " b=" << b << " *p=" << *p << endl;
    }
    
    ~Demo() {
        delete p;  // Destructor to free memory
    }
};
\`\`\`

## Copy Constructor vs Assignment Operator

| Copy Constructor | Assignment Operator |
|------------------|-------------------|
| Called when object is being constructed | Called when object already exists |
| Creates a new object | Modifies existing object |
| No return type | Returns reference to current object |
| Cannot be inherited | Can be inherited |
          `,
        },
        {
          id: "destructor",
          title: "Destructor",
          content: `
# Destructor in C++

A destructor is a type of function which is called when the object is destroyed. **Destructor never takes an argument nor does it return any value**. Destructor is a member function which destructs or deletes an object.

## Syntax

\`\`\`cpp
~constructor-name();
\`\`\`

## Properties of Destructor

- **Destructor function is automatically invoked when the objects are destroyed**
- It cannot be declared static or const
- The destructor does not have arguments
- It has no return type not even void
- An object of a class with a Destructor cannot become a member of the union
- **A destructor should be declared in the public section of the class**
- The programmer cannot access the address of destructor

## When is Destructor Called?

A destructor function is called automatically when the object goes out of scope:
1. The function ends
2. The program ends
3. A block containing local variables ends
4. A delete operator is called

## How Destructors are Different from Normal Member Functions?

- Destructors have same name as the class preceded by a tilde (~)
- Destructors don't take any argument and don't return anything

## Example: Destructor

\`\`\`cpp
#include<iostream>
using namespace std;

int count = 0;

class num {
public:
    // Constructor
    num() {
        count++;
        cout << "This is the time when constructor is called for object number " << count << endl;
    }
    
    // Destructor
    ~num() {
        cout << "This is the time when my destructor is called for object number " << count << endl;
        count--;
    }
};

int main() {
    cout << "We are inside our main function" << endl;
    cout << "Creating first object n1" << endl;
    
    {
        cout << "Entering this block" << endl;
        cout << "Creating two more objects" << endl;
        num n2, n3;
        cout << "Exiting this block" << endl;
    }  // n2 and n3 destructors called here
    
    cout << "Back to main" << endl;
    return 0;
}  // n1 destructor called here
\`\`\`

## Practical Example: Resource Management

\`\`\`cpp
#include<iostream>
using namespace std;

class FileHandler {
private:
    string fileName;
    bool isOpen;
    
public:
    // Constructor
    FileHandler(string name) {
        fileName = name;
        isOpen = true;
        cout << "File " << fileName << " opened" << endl;
    }
    
    // Destructor - automatically clean up resources
    ~FileHandler() {
        if (isOpen) {
            cout << "File " << fileName << " closed automatically" << endl;
            isOpen = false;
        }
    }
    
    void closeFile() {
        if (isOpen) {
            cout << "File " << fileName << " closed manually" << endl;
            isOpen = false;
        }
    }
};

int main() {
    {
        FileHandler file1("data.txt");
        FileHandler file2("config.txt");
        // Files will be automatically closed when going out of scope
    }  // Destructors called here
    
    cout << "Files have been cleaned up automatically" << endl;
    return 0;
}
\`\`\`
          `,
        },
        {
          id: "friend-functions",
          title: "Friend Functions",
          content: `
# Friend Functions in C++

Friend functions are those functions that have **the right to access the private data members of class** even though **they are not defined inside the class. It is necessary to write the prototype of the friend function.** One main thing to note here is that if we have written the prototype for the friend function in the class it will not make that function a member of the class.

## Properties of Friend Function

- **Not in the scope of the class**
- Since it is not in the scope of the class, it cannot be called from the object of that class
  - For example, \`sumComplex()\` is invalid if called as \`obj.sumComplex()\`
- **A friend function can be invoked without the help of any object**
- Usually contain objects as arguments
- Can be declared under the public or private access modifier, it will not make any difference
- **It cannot access the members directly by their names**, it needs \`object_name.member_name\` to access any member

## Example: Friend Function

\`\`\`cpp
#include<iostream>
using namespace std;

class Complex {
    int a, b;
    
public:
    void setNumber(int n1, int n2) {
        a = n1;
        b = n2;
    }
    
    // Declaring friend function
    friend Complex sumComplex(Complex o1, Complex o2);
    
    void printNumber() {
        cout << "Number is: " << a << " + " << b << "i" << endl;
    }
};

// Friend function definition (outside the class)
Complex sumComplex(Complex o1, Complex o2) {
    Complex o3;
    o3.a = o1.a + o2.a;  // Can access private members directly
    o3.b = o1.b + o2.b;  // Can access private members directly
    return o3;
}

int main() {
    Complex c1, c2, sum;
    
    c1.setNumber(1, 4);
    c1.printNumber();
    
    c2.setNumber(5, 8);
    c2.printNumber();
    
    sum = sumComplex(c1, c2);  // Friend function called directly
    sum.printNumber();
    
    return 0;
}
\`\`\`

## Member Friend Functions

Friend functions can also be member functions of another class. In this case, the specific member function of one class can access private members of another class.

\`\`\`cpp
#include<iostream>
using namespace std;

// Forward declaration
class Complex;

class Calculator {
public:
    int add(int a, int b) {
        return (a + b);
    }
    
    int sumRealComplex(Complex, Complex);
    int sumCompComplex(Complex, Complex);
};

class Complex {
    int a, b;
    
    // Specific member functions of Calculator class are friends
    friend int Calculator::sumRealComplex(Complex o1, Complex o2);
    friend int Calculator::sumCompComplex(Complex o1, Complex o2);
    
public:
    void setNumber(int n1, int n2) {
        a = n1;
        b = n2;
    }
    
    void printNumber() {
        cout << "Number is: " << a << " + " << b << "i" << endl;
    }
};

int Calculator::sumRealComplex(Complex o1, Complex o2) {
    return (o1.a + o2.a);  // Can access private members
}

int Calculator::sumCompComplex(Complex o1, Complex o2) {
    return (o1.b + o2.b);  // Can access private members
}

int main() {
    Complex o1, o2;
    o1.setNumber(1, 4);
    o2.setNumber(5, 7);
    
    Calculator calc;
    int res = calc.sumRealComplex(o1, o2);
    cout << "The sum of real part of o1 and o2 is " << res << endl;
    
    int resc = calc.sumCompComplex(o1, o2);
    cout << "The sum of complex part of o1 and o2 is " << resc << endl;
    
    return 0;
}
\`\`\`

## Friend Classes

Friend classes are those classes that have permission to access private members of the class in which they are declared. If a class is declared as friend of another class, then it can access all the private members of that class.

\`\`\`cpp
#include<iostream>
using namespace std;

// Forward declaration
class Complex;

class Calculator {
public:
    int add(int a, int b) {
        return (a + b);
    }
    
    int sumRealComplex(Complex, Complex);
    int sumCompComplex(Complex, Complex);
};

class Complex {
    int a, b;
    
    // Entire Calculator class is friend
    friend class Calculator;
    
public:
    void setNumber(int n1, int n2) {
        a = n1;
        b = n2;
    }
    
    void printNumber() {
        cout << "Number is: " << a << " + " << b << "i" << endl;
    }
};

int Calculator::sumRealComplex(Complex o1, Complex o2) {
    return (o1.a + o2.a);  // Can access private members
}

int Calculator::sumCompComplex(Complex o1, Complex o2) {
    return (o1.b + o2.b);  // Can access private members
}

int main() {
    Complex o1, o2;
    o1.setNumber(1, 4);
    o2.setNumber(5, 7);
    
    Calculator calc;
    int res = calc.sumRealComplex(o1, o2);
    cout << "The sum of real part of o1 and o2 is " << res << endl;
    
    return 0;
}
\`\`\`

## Friend Function Example: Swapping Private Data

\`\`\`cpp
#include<iostream>
using namespace std;

class c2;  // Forward declaration

class c1 {
    int val1;
    friend void exchange(c1 &, c2 &);
    
public:
    void indata(int a) {
        val1 = a;
    }
    
    void display() {
        cout << val1 << endl;
    }
};

class c2 {
    int val2;
    friend void exchange(c1 &, c2 &);
    
public:
    void indata(int a) {
        val2 = a;
    }
    
    void display() {
        cout << val2 << endl;
    }
};

void exchange(c1 &x, c2 &y) {
    int tmp = x.val1;
    x.val1 = y.val2;
    y.val2 = tmp;
}

int main() {
    c1 oc1;
    c2 oc2;
    
    oc1.indata(34);
    oc2.indata(67);
    
    cout << "Before exchange:" << endl;
    oc1.display();
    oc2.display();
    
    exchange(oc1, oc2);
    
    cout << "After exchange:" << endl;
    oc1.display();
    oc2.display();
    
    return 0;
}
\`\`\`
          `,
        },
        {
          id: "static-members",
          title: "Static Data Members & Methods",
          content: `
# Static Data Members & Methods in C++

Static members belong to the class rather than to any specific object of the class. They are shared among all objects of the class.

## Static Data Members

When a **static data member is created, there is only a single copy of the data member which is shared between all the objects** of the class. Unlike regular data members, static data members are not tied to any particular object.

### Key Points about Static Data Members:
- Only one copy exists for the entire class
- Shared among all objects of the class
- Memory is allocated only once when the first object is created
- Must be defined outside the class
- Can be accessed without creating an object

## Static Methods

When a static method is created, they become independent of any object and class. **Static methods can only access static data members and static methods.** They cannot access non-static members directly.

### Key Points about Static Methods:
- Can be called without creating an object
- Can only access static data members and static methods
- Cannot access non-static members directly
- Called using scope resolution operator (::)

## Example: Static Members

\`\`\`cpp
#include <iostream>
using namespace std;

class Employee {
    int id;
    static int count;  // Static data member declaration
    
public:
    void setData() {
        cout << "Enter the id: ";
        cin >> id;
        count++;
    }
    
    void getData() {
        cout << "The id of this employee is " << id 
             << " and this is employee number " << count << endl;
    }
    
    static void getCount() {
        // cout << id;  // ERROR! Cannot access non-static member
        cout << "The value of count is " << count << endl;
    }
};

// Definition of static data member (required outside class)
int Employee::count = 0;  // Default value is 0

int main() {
    Employee harry, rohan, lovish;
    
    // Accessing static method without object
    Employee::getCount();
    
    harry.setData();
    harry.getData();
    Employee::getCount();
    
    rohan.setData();
    rohan.getData();
    Employee::getCount();
    
    lovish.setData();
    lovish.getData();
    Employee::getCount();
    
    return 0;
}
\`\`\`

## Static Members in Practice

\`\`\`cpp
#include <iostream>
using namespace std;

class BankAccount {
private:
    int accountNumber;
    double balance;
    static double interestRate;  // Same for all accounts
    static int totalAccounts;    // Count of total accounts
    
public:
    // Constructor
    BankAccount(int accNum, double bal) {
        accountNumber = accNum;
        balance = bal;
        totalAccounts++;
    }
    
    // Static method to set interest rate for all accounts
    static void setInterestRate(double rate) {
        interestRate = rate;
    }
    
    // Static method to get total number of accounts
    static int getTotalAccounts() {
        return totalAccounts;
    }
    
    // Non-static method to apply interest
    void applyInterest() {
        balance += balance * interestRate;
    }
    
    void display() {
        cout << "Account: " << accountNumber 
             << ", Balance: $" << balance << endl;
    }
    
    // Static method to display interest rate
    static void displayInterestRate() {
        cout << "Current interest rate: " << interestRate * 100 << "%" << endl;
    }
};

// Definition of static members
double BankAccount::interestRate = 0.05;  // 5% default interest
int BankAccount::totalAccounts = 0;

int main() {
    // Check initial state
    cout << "Initial accounts: " << BankAccount::getTotalAccounts() << endl;
    BankAccount::displayInterestRate();
    
    // Create accounts
    BankAccount acc1(1001, 1000.0);
    BankAccount acc2(1002, 2000.0);
    BankAccount acc3(1003, 3000.0);
    
    cout << "Total accounts created: " << BankAccount::getTotalAccounts() << endl;
    
    // Change interest rate for all accounts
    BankAccount::setInterestRate(0.07);  // 7% interest
    BankAccount::displayInterestRate();
    
    // Apply interest to all accounts
    acc1.applyInterest();
    acc2.applyInterest();
    acc3.applyInterest();
    
    // Display account details
    acc1.display();
    acc2.display();
    acc3.display();
    
    return 0;
}
\`\`\`

## Memory Allocation for Static Members

### For Regular Data Members:
- Memory is allocated when object is created
- Each object has its own copy
- Memory is freed when object is destroyed

### For Static Data Members:
- Memory is allocated only once when first object is created
- All objects share the same copy
- Memory persists until program ends
- Exists even if no objects are created

## Static Member Functions vs Regular Functions

| Static Member Functions | Regular Member Functions |
|------------------------|-------------------------|
| Can be called without object | Need object to be called |
| Cannot access non-static members | Can access all members |
| Cannot use 'this' pointer | Can use 'this' pointer |
| Called using :: operator | Called using . operator |
| Memory efficient | Each object has access |
          `,
        },
        {
          id: "arrays-objects",
          title: "Arrays & Objects",
          content: `
# Arrays in Classes & Array of Objects

## Arrays in Classes

Arrays can be used as data members in classes to store multiple values of the same type. This is very helpful when you need to store collections of related data within an object.

### Example: Shop Management System

\`\`\`cpp
#include <iostream>
using namespace std;

class Shop {
    int itemId[100];
    int itemPrice[100];
    int counter;
    
public:
    void initCounter() { 
        counter = 0; 
    }
    
    void setPrice() {
        cout << "Enter Id of your item no " << counter + 1 << endl;
        cin >> itemId[counter];
        cout << "Enter Price of your item" << endl;
        cin >> itemPrice[counter];
        counter++;
    }
    
    void displayPrice() {
        for (int i = 0; i < counter; i++) {
            cout << "The Price of item with Id " << itemId[i] 
                 << " is " << itemPrice[i] << endl;
        }
    }
};

int main() {
    Shop dukaan;
    dukaan.initCounter();
    dukaan.setPrice();
    dukaan.setPrice();
    dukaan.setPrice();
    dukaan.displayPrice();
    return 0;
}
\`\`\`

### Example: Student Grade Management

\`\`\`cpp
#include <iostream>
using namespace std;

class Student {
private:
    string name;
    int grades[5];  // Array to store 5 subject grades
    int numSubjects;
    
public:
    Student() {
        numSubjects = 0;
    }
    
    void setName(string studentName) {
        name = studentName;
    }
    
    void addGrade(int grade) {
        if (numSubjects < 5) {
            grades[numSubjects] = grade;
            numSubjects++;
        } else {
            cout << "Cannot add more grades. Maximum 5 subjects allowed." << endl;
        }
    }
    
    double calculateAverage() {
        if (numSubjects == 0) return 0;
        
        int total = 0;
        for (int i = 0; i < numSubjects; i++) {
            total += grades[i];
        }
        return (double)total / numSubjects;
    }
    
    void displayGrades() {
        cout << "Student: " << name << endl;
        cout << "Grades: ";
        for (int i = 0; i < numSubjects; i++) {
            cout << grades[i] << " ";
        }
        cout << "\nAverage: " << calculateAverage() << endl;
    }
};
\`\`\`

## Array of Objects

An array of objects is declared the same as any other data-type array. An array of objects consists of class objects as its elements. If the array consists of class objects it is called an array of objects.

### Example: Employee Management

\`\`\`cpp
#include <iostream>
using namespace std;

class Employee {
    int id;
    int salary;
    
public:
    void setId() {
        salary = 122;
        cout << "Enter the id of employee: ";
        cin >> id;
    }
    
    void getId() {
        cout << "The id of this employee is " << id << endl;
    }
};

int main() {
    // Creating array of Employee objects
    Employee fb[4];  // Array of 4 Employee objects
    
    // Setting data for each employee
    for (int i = 0; i < 4; i++) {
        fb[i].setId();
        fb[i].getId();
    }
    
    return 0;
}
\`\`\`

### Example: Bank Account Management

\`\`\`cpp
#include <iostream>
using namespace std;

class BankAccount {
private:
    int accountNumber;
    string accountHolder;
    double balance;
    
public:
    // Constructor
    BankAccount() {
        accountNumber = 0;
        accountHolder = "";
        balance = 0.0;
    }
    
    // Parameterized constructor
    BankAccount(int accNum, string holder, double bal) {
        accountNumber = accNum;
        accountHolder = holder;
        balance = bal;
    }
    
    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            cout << "Deposited $" << amount << " successfully." << endl;
        }
    }
    
    void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            cout << "Withdrawn $" << amount << " successfully." << endl;
        } else {
            cout << "Insufficient balance or invalid amount." << endl;
        }
    }
    
    void display() {
        cout << "Account: " << accountNumber 
             << ", Holder: " << accountHolder 
             << ", Balance: $" << balance << endl;
    }
    
    double getBalance() {
        return balance;
    }
};

int main() {
    // Array of BankAccount objects
    BankAccount accounts[3];
    
    // Initialize accounts using parameterized constructor values
    accounts[0] = BankAccount(1001, "John Doe", 5000.0);
    accounts[1] = BankAccount(1002, "Jane Smith", 3000.0);
    accounts[2] = BankAccount(1003, "Bob Johnson", 7000.0);
    
    // Display all accounts
    cout << "Initial Account Status:" << endl;
    for (int i = 0; i < 3; i++) {
        accounts[i].display();
    }
    
    // Perform some transactions
    accounts[0].deposit(1000);
    accounts[1].withdraw(500);
    accounts[2].deposit(2000);
    
    cout << "\nUpdated Account Status:" << endl;
    for (int i = 0; i < 3; i++) {
        accounts[i].display();
    }
    
    // Find account with highest balance
    int maxIndex = 0;
    for (int i = 1; i < 3; i++) {
        if (accounts[i].getBalance() > accounts[maxIndex].getBalance()) {
            maxIndex = i;
        }
    }
    
    cout << "\nAccount with highest balance:" << endl;
    accounts[maxIndex].display();
    
    return 0;
}
\`\`\`

## Passing Objects as Function Arguments

Objects can be passed as function arguments. This is useful when we want to operate on objects or compare objects.

### Example: Complex Number Operations

\`\`\`cpp
#include<iostream>
using namespace std;

class Complex {
    int a, b;
    
public:
    void setData(int v1, int v2) {
        a = v1;
        b = v2;
    }
    
    void setDataBySum(Complex o1, Complex o2) {
        a = o1.a + o2.a;
        b = o1.b + o2.b;
    }
    
    void printNumber() {
        cout << "Your number is " << a << " + " << b << "i" << endl;
    }
};

int main() {
    Complex c1, c2, c3;
    
    c1.setData(1, 2);
    c1.printNumber();
    
    c2.setData(3, 4);
    c2.printNumber();
    
    c3.setDataBySum(c1, c2);  // Passing objects as arguments
    c3.printNumber();
    
    return 0;
}
\`\`\`

## Memory Allocation for Objects

### Individual Objects:
- Memory allocated when object is created
- Each object has its own memory space
- Memory freed when object goes out of scope

### Array of Objects:
- Memory allocated for all objects at once
- Objects stored in contiguous memory locations
- All objects follow same lifecycle (creation/destruction)

### Functions and Objects:
- **Functions are shared among all objects** - only one copy exists
- **Data members have separate copies** for each object
- Static members are shared among all objects
          `,
        },
        {
          id: "inheritance",
          title: "Inheritance",
          content: `
# Inheritance in C++

## What is Inheritance?

- **Reusability** is a very important feature of OOPs
- Reusing classes saves time and money
- Reusing already tested and debugged classes will save a lot of effort of developing and debugging the same thing again
- The concept of **reusability in C++ is supported using inheritance**
- We can reuse the properties of an existing class by inheriting it
- The **existing class is called a base class**
- **The new class which is inherited from the base class is called a derived class**

## Inheritance Syntax & Visibility Mode

\`\`\`cpp
// Derived Class syntax
class derived_class_name : visibility_mode base_class_name
{
    // class members/methods/etc...
}
\`\`\`

### Note:
- **Default visibility mode is private**
- **Public Visibility Mode**: Public members of the base class becomes Public members of the derived class
- **Private Visibility Mode**: Public members of the base class become private members of the derived class
- **Private members are never inherited**

## Forms of Inheritance

### Single Inheritance
One derived class is inherited with only one base class.

### Hierarchical Inheritance
Several derived classes are inherited from a single base class.

### Multilevel Inheritance
One derived class is inherited from another derived class.

### Multiple Inheritance
One derived class is inherited with more than one base class.

### Hybrid Inheritance
**Combination of multiple inheritance and multilevel inheritance**.

## Single Inheritance Example

\`\`\`cpp
#include <iostream>
using namespace std;

// Base Class
class Employee {
public:
    int id;
    float salary;
    Employee(int inpId) {
        id = inpId;
        salary = 34.0;
    }
    Employee() {}
};

// Creating a Programmer class derived from Employee Base class
class Programmer : public Employee {
public:
    int languageCode;
    Programmer(int inpId) {
        id = inpId;
        languageCode = 9;
    }
    void getData() {
        cout << id << endl;
    }
};

int main() {
    Employee harry(1), rohan(2);
    cout << harry.salary << endl;
    cout << rohan.salary << endl;
    
    Programmer skillF(10);
    cout << skillF.languageCode << endl;
    cout << skillF.id << endl;
    skillF.getData();
    
    return 0;
}
\`\`\`

## Visibility Mode Examples

### Public Mode of Inheritance

\`\`\`cpp
class Base {
    int data1; // private by default and is not inheritable
public:
    int data2;
    void setData();
    int getData1();
    int getData2();
};

class Derived : public Base { // Public derivation
    int data3;
public:
    void process();
    void display();
};
\`\`\`

### Private Mode of Inheritance

\`\`\`cpp
class Base {
    int data1; // private by default and is not inheritable
public:
    int data2;
    void setData();
    int getData1();
    int getData2();
};

class Derived : private Base { // Private derivation
    int data3;
public:
    void process();
    void display();
};
\`\`\`

## Inheritance Visibility Table

| Base Class Member | Public Derivation | Private Derivation | Protected Derivation |
|-------------------|-------------------|-------------------|---------------------|
| Private | Not Inherited | Not Inherited | Not Inherited |
| Protected | Protected | Private | Protected |
| Public | Public | Private | Protected |

## Multilevel Inheritance

\`\`\`cpp
#include <iostream>
using namespace std;

class Student {
protected:
    int roll_number;
public:
    void set_roll_number(int);
    void get_roll_number();
};

void Student::set_roll_number(int r) {
    roll_number = r;
}

void Student::get_roll_number() {
    cout << "The roll number is " << roll_number << endl;
}

class Exam : public Student {
protected:
    float maths, physics;
public:
    void set_marks(float, float);
    void get_marks();
};

void Exam::set_marks(float m1, float m2) {
    maths = m1;
    physics = m2;
}

void Exam::get_marks() {
    cout << "Marks in maths: " << maths << endl;
    cout << "Marks in physics: " << physics << endl;
}

class Result : public Exam {
    float percentage;
public:
    void display_results() {
        get_roll_number();
        get_marks();
        cout << "Your result is " << (maths + physics) / 2 << "%" << endl;
    }
};

int main() {
    Result harry;
    harry.set_roll_number(420);
    harry.set_marks(94.0, 90.0);
    harry.display_results();
    return 0;
}
\`\`\`

## Multiple Inheritance

\`\`\`cpp
#include <iostream>
using namespace std;

class Base1 {
protected:
    int base1int;
public:
    void set_base1int(int a) {
        base1int = a;
    }
};

class Base2 {
protected:
    int base2int;
public:
    void set_base2int(int a) {
        base2int = a;
    }
};

class Base3 {
protected:
    int base3int;
public:
    void set_base3int(int a) {
        base3int = a;
    }
};

class Derived : public Base1, public Base2, public Base3 {
public:
    void show() {
        cout << "The value of Base1 is " << base1int << endl;
        cout << "The value of Base2 is " << base2int << endl;
        cout << "The value of Base3 is " << base3int << endl;
        cout << "The sum of these values is " << base1int + base2int + base3int << endl;
    }
};

int main() {
    Derived harry;
    harry.set_base1int(25);
    harry.set_base2int(5);
    harry.set_base3int(15);
    harry.show();
    
    return 0;
}
\`\`\`

## Constructor in Inheritance

\`\`\`cpp
#include <iostream>
using namespace std;

class Base1 {
    int data1;
public:
    Base1(int i) {
        data1 = i;
        cout << "Base1 class constructor called" << endl;
    }
    void printDataBase1() {
        cout << "The value of data1 is " << data1 << endl;
    }
};

class Base2 {
    int data2;
public:
    Base2(int i) {
        data2 = i;
        cout << "Base2 class constructor called" << endl;
    }
    void printDataBase2() {
        cout << "The value of data2 is " << data2 << endl;
    }
};

class Derived : public Base2, public Base1 {
    int derived1, derived2;
public:
    Derived(int a, int b, int c, int d) : Base1(a), Base2(b) {
        derived1 = c;
        derived2 = d;
        cout << "Derived class constructor called" << endl;
    }
    void printDataDerived() {
        cout << "The value of derived1 is " << derived1 << endl;
        cout << "The value of derived2 is " << derived2 << endl;
    }
};

int main() {
    Derived harry(1, 2, 3, 4);
    harry.printDataBase1();
    harry.printDataBase2();
    harry.printDataDerived();
    return 0;
}
\`\`\`
          `,
        },
        {
          id: "polymorphism",
          title: "Polymorphism",
          content: `
# Polymorphism in C++

## What is Polymorphism?

When **one task is performed by different ways** i.e. known as polymorphism. For example: to convince the customer differently, to draw something e.g. shape or rectangle etc.

In C++, we use **Function overloading and Function overriding to achieve polymorphism**.

## Types of Polymorphism

### Compile Time Polymorphism (Static Polymorphism)
- Function Overloading
- Operator Overloading

### Runtime Polymorphism (Dynamic Polymorphism)
- Function Overriding (Virtual Functions)

## Function Overloading

Function overloading is a feature where multiple functions can have the same name with different parameters.

\`\`\`cpp
#include <iostream>
using namespace std;

class Calculator {
public:
    int add(int a, int b) {
        return a + b;
    }
    
    int add(int a, int b, int c) {
        return a + b + c;
    }
    
    double add(double a, double b) {
        return a + b;
    }
    
    string add(string a, string b) {
        return a + b;
    }
};

int main() {
    Calculator calc;
    
    cout << calc.add(3, 4) << endl;           // Calls int add(int, int)
    cout << calc.add(3, 4, 5) << endl;       // Calls int add(int, int, int)
    cout << calc.add(3.5, 4.5) << endl;      // Calls double add(double, double)
    cout << calc.add("Hello", "World") << endl; // Calls string add(string, string)
    
    return 0;
}
\`\`\`

## Operator Overloading

Operator overloading allows you to redefine the way operators work for user-defined types.

\`\`\`cpp
#include <iostream>
using namespace std;

class Complex {
private:
    int real, imag;
    
public:
    Complex(int r = 0, int i = 0) {
        real = r;
        imag = i;
    }
    
    // Operator overloading using member function
    Complex operator + (const Complex &obj) {
        Complex res;
        res.real = real + obj.real;
        res.imag = imag + obj.imag;
        return res;
    }
    
    // Operator overloading for ==
    bool operator == (const Complex &obj) {
        return (real == obj.real && imag == obj.imag);
    }
    
    void display() {
        cout << real << " + " << imag << "i" << endl;
    }
};

int main() {
    Complex c1(10, 5);
    Complex c2(2, 4);
    Complex c3;
    
    c3 = c1 + c2;  // Using overloaded + operator
    
    cout << "c1: ";
    c1.display();
    cout << "c2: ";
    c2.display();
    cout << "c3 = c1 + c2: ";
    c3.display();
    
    if (c1 == c2) {
        cout << "c1 and c2 are equal" << endl;
    } else {
        cout << "c1 and c2 are not equal" << endl;
    }
    
    return 0;
}
\`\`\`

## Virtual Functions (Runtime Polymorphism)

Virtual functions enable runtime polymorphism. They allow a function call to be resolved at runtime rather than compile time.

\`\`\`cpp
#include <iostream>
using namespace std;

class Animal {
public:
    virtual void speak() {  // Virtual function
        cout << "Animal makes a sound" << endl;
    }
    
    virtual void move() {   // Virtual function
        cout << "Animal moves" << endl;
    }
    
    // Virtual destructor
    virtual ~Animal() {
        cout << "Animal destructor called" << endl;
    }
};

class Dog : public Animal {
public:
    void speak() override {  // Override virtual function
        cout << "Dog barks: Woof! Woof!" << endl;
    }
    
    void move() override {
        cout << "Dog runs on four legs" << endl;
    }
    
    ~Dog() {
        cout << "Dog destructor called" << endl;
    }
};

class Cat : public Animal {
public:
    void speak() override {
        cout << "Cat meows: Meow! Meow!" << endl;
    }
    
    void move() override {
        cout << "Cat jumps gracefully" << endl;
    }
    
    ~Cat() {
        cout << "Cat destructor called" << endl;
    }
};

void makeAnimalSpeak(Animal* animal) {
    animal->speak();  // Runtime polymorphism
    animal->move();
}

int main() {
    Animal* animals[3];
    
    animals[0] = new Animal();
    animals[1] = new Dog();
    animals[2] = new Cat();
    
    for (int i = 0; i < 3; i++) {
        cout << "Animal " << i + 1 << ": ";
        makeAnimalSpeak(animals[i]);
        cout << endl;
    }
    
    // Clean up memory
    for (int i = 0; i < 3; i++) {
        delete animals[i];
    }
    
    return 0;
}
\`\`\`

## Pure Virtual Functions and Abstract Classes

A pure virtual function is a virtual function that has no definition in the base class. A class containing pure virtual functions is called an abstract class.

\`\`\`cpp
#include <iostream>
using namespace std;

// Abstract class
class Shape {
public:
    // Pure virtual functions
    virtual double area() = 0;
    virtual double perimeter() = 0;
    virtual void display() = 0;
};

class Rectangle : public Shape {
private:
    double length, width;
    
public:
    Rectangle(double l, double w) : length(l), width(w) {}
    
    double area() override {
        return length * width;
    }
    
    double perimeter() override {
        return 2 * (length + width);
    }
    
    void display() override {
        cout << "Rectangle - Length: " << length << ", Width: " << width << endl;
        cout << "Area: " << area() << ", Perimeter: " << perimeter() << endl;
    }
};

class Circle : public Shape {
private:
    double radius;
    
public:
    Circle(double r) : radius(r) {}
    
    double area() override {
        return 3.14159 * radius * radius;
    }
    
    double perimeter() override {
        return 2 * 3.14159 * radius;
    }
    
    void display() override {
        cout << "Circle - Radius: " << radius << endl;
        cout << "Area: " << area() << ", Perimeter: " << perimeter() << endl;
    }
};

int main() {
    // Cannot instantiate abstract class
    // Shape s;  // ERROR!
    
    Shape* shapes[2];
    shapes[0] = new Rectangle(5.0, 3.0);
    shapes[1] = new Circle(4.0);
    
    for (int i = 0; i < 2; i++) {
        shapes[i]->display();
        cout << endl;
    }
    
    delete shapes[0];
    delete shapes[1];
    
    return 0;
}
\`\`\`

## Function Overriding vs Function Overloading

| Function Overloading | Function Overriding |
|---------------------|-------------------|
| Same function name, different parameters | Same function signature in base and derived class |
| Compile-time polymorphism | Runtime polymorphism |
| Within same class | Between base and derived classes |
| No inheritance required | Inheritance required |
| No virtual keyword needed | virtual keyword required |

## Benefits of Polymorphism

1. **Code Reusability**: Same interface for different implementations
2. **Flexibility**: Easy to extend and maintain code
3. **Dynamic Behavior**: Behavior determined at runtime
4. **Abstraction**: Hide implementation details from users
5. **Extensibility**: Easy to add new types without modifying existing code
          `,
        },
        {
          id: "advanced-oop",
          title: "Advanced OOP Concepts",
          content: `
# Advanced OOP Concepts

## Abstraction

**Hiding internal details and showing functionality** is known as abstraction. For example: phone call, we don't know the internal processing.

In C++, we use **abstract class and interface to achieve abstraction**.

### Example: ATM System Abstraction

\`\`\`cpp
#include <iostream>
using namespace std;

// Abstract base class for ATM operations
class ATM {
protected:
    double balance;
    string accountNumber;
    
public:
    ATM(string accNum, double bal) : accountNumber(accNum), balance(bal) {}
    
    // Pure virtual functions (abstract interface)
    virtual bool authenticate(string pin) = 0;
    virtual void deposit(double amount) = 0;
    virtual bool withdraw(double amount) = 0;
    virtual void displayBalance() = 0;
    
    // Concrete method
    void displayWelcome() {
        cout << "Welcome to ATM Service" << endl;
    }
};

class SavingsATM : public ATM {
private:
    string pin;
    double minBalance;
    
public:
    SavingsATM(string accNum, double bal, string p) 
        : ATM(accNum, bal), pin(p), minBalance(1000.0) {}
    
    bool authenticate(string userPin) override {
        return (pin == userPin);
    }
    
    void deposit(double amount) override {
        if (amount > 0) {
            balance += amount;
            cout << "Deposited: $" << amount << endl;
        }
    }
    
    bool withdraw(double amount) override {
        if (amount > 0 && (balance - amount) >= minBalance) {
            balance -= amount;
            cout << "Withdrawn: $" << amount << endl;
            return true;
        }
        cout << "Insufficient balance or minimum balance requirement not met" << endl;
        return false;
    }
    
    void displayBalance() override {
        cout << "Current Balance: $" << balance << endl;
    }
};

// User doesn't need to know internal implementation
void performATMOperations(ATM* atm, string pin) {
    atm->displayWelcome();
    
    if (atm->authenticate(pin)) {
        cout << "Authentication successful!" << endl;
        atm->displayBalance();
        atm->deposit(500);
        atm->withdraw(200);
        atm->displayBalance();
    } else {
        cout << "Authentication failed!" << endl;
    }
}

int main() {
    SavingsATM myATM("123456789", 5000.0, "1234");
    performATMOperations(&myATM, "1234");
    return 0;
}
\`\`\`

## Encapsulation

**Binding (or wrapping) code and data together into a single unit is known as encapsulation.** For example: capsule, it is wrapped with different medicines.

### Example: Student Information System

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

class Student {
private:
    string name;
    int age;
    vector<double> grades;
    double gpa;
    
    // Private helper method
    void calculateGPA() {
        if (grades.empty()) {
            gpa = 0.0;
            return;
        }
        
        double sum = 0.0;
        for (double grade : grades) {
            sum += grade;
        }
        gpa = sum / grades.size();
    }
    
    // Private validation method
    bool isValidGrade(double grade) {
        return (grade >= 0.0 && grade <= 100.0);
    }
    
public:
    // Constructor
    Student(string n, int a) : name(n), age(a), gpa(0.0) {
        if (age < 0) age = 0;  // Data validation
    }
    
    // Controlled access to private data
    void setName(string n) {
        if (!n.empty()) {
            name = n;
        }
    }
    
    string getName() const {
        return name;
    }
    
    void setAge(int a) {
        if (a >= 0 && a <= 150) {  // Validation
            age = a;
        }
    }
    
    int getAge() const {
        return age;
    }
    
    void addGrade(double grade) {
        if (isValidGrade(grade)) {
            grades.push_back(grade);
            calculateGPA();  // Automatically update GPA
        } else {
            cout << "Invalid grade! Grade should be between 0 and 100." << endl;
        }
    }
    
    double getGPA() const {
        return gpa;
    }
    
    void displayInfo() const {
        cout << "Name: " << name << ", Age: " << age 
             << ", GPA: " << gpa << endl;
    }
    
    // Method to display all grades
    void displayGrades() const {
        cout << "Grades for " << name << ": ";
        for (double grade : grades) {
            cout << grade << " ";
        }
        cout << endl;
    }
};

int main() {
    Student student("John Doe", 20);
    
    // Can only access through controlled methods
    student.addGrade(85.5);
    student.addGrade(92.0);
    student.addGrade(78.5);
    student.addGrade(105.0);  // Invalid - will be rejected
    
    student.displayInfo();
    student.displayGrades();
    
    // Cannot directly access private members
    // student.name = "Hacker";     // ERROR!
    // student.gpa = 4.0;           // ERROR!
    // student.calculateGPA();      // ERROR!
    
    return 0;
}
\`\`\`

## Nesting of Member Functions

If one member function is called inside the other member function of the same class it is called nesting of a member function.

\`\`\`cpp
#include <iostream>
using namespace std;

class Binary {
private:
    string s;
    
    void chk_bin() {  // Private nested function
        for (int i = 0; i < s.length(); i++) {
            if (s.at(i) != '0' && s.at(i) != '1') {
                cout << "Incorrect binary format" << endl;
                exit(0);
            }
        }
    }

public:
    void read() {
        cout << "Enter a binary number: ";
        cin >> s;
    }
    
    void ones_complement() {
        chk_bin();  // Nested function call
        for (int i = 0; i < s.length(); i++) {
            if (s.at(i) == '0') {
                s.at(i) = '1';
            } else {
                s.at(i) = '0';
            }
        }
    }
    
    void display() {
        cout << "Displaying your binary number: " << s << endl;
    }
};

int main() {
    Binary b;
    b.read();
    b.display();
    b.ones_complement();
    b.display();
    return 0;
}
\`\`\`

## Constructor Initialization List

\`\`\`cpp
#include <iostream>
using namespace std;

class Test {
    int a;
    int b;

public:
    // Using initialization list
    Test(int i, int j) : a(i), b(j) {
        cout << "Constructor body" << endl;
    }
    
    // Different initialization patterns
    // Test(int i, int j) : a(i), b(i+j) {}
    // Test(int i, int j) : a(i), b(2 * j) {}
    // Test(int i, int j) : a(i), b(a + j) {}  // OK: a initialized before b
    // Test(int i, int j) : b(j), a(i+b) {}    // ERROR: a initialized before b
    
    void printData() {
        cout << "a = " << a << ", b = " << b << endl;
    }
};

int main() {
    Test t(4, 6);
    t.printData();
    return 0;
}
\`\`\`

## Advantage of OOPs over Procedure-oriented Programming

1. **OOPs makes development and maintenance easier** whereas in Procedure-oriented programming language it is not easy to manage if code grows as project size grows.

2. **OOPs provide data hiding** whereas in Procedure-oriented programming language a global data can be accessed from anywhere.

3. **OOPs provide ability to simulate real-world event much more effectively**. We can provide the solution of real word problem if we are using the Object-Oriented Programming language.

### Comparison Table

| Aspect | Procedural Programming | Object-Oriented Programming |
|--------|----------------------|----------------------------|
| **Focus** | Functions and procedures | Objects and classes |
| **Data Security** | Global data accessible everywhere | Data hiding through encapsulation |
| **Code Reusability** | Limited reusability | High reusability through inheritance |
| **Maintenance** | Difficult for large projects | Easier maintenance and updates |
| **Problem Solving** | Top-down approach | Bottom-up approach |
| **Data Flow** | Data moves openly between functions | Data is secured within objects |
| **Scalability** | Becomes complex with size | Manageable even for large projects |

## Memory Management in OOP

### Object Memory Allocation
- **Memory is allocated to variables only when object is created**
- **Memory is not allocated when class is declared**
- **Each object has individual copy of all variables**
- **Functions are shared among all objects** (only one copy exists)

### Example: Memory Allocation

\`\`\`cpp
class Employee {
    int id;         // Memory allocated per object
    string name;    // Memory allocated per object
    static int count;  // Shared among all objects

public:
    void setData() {    // Single copy shared by all objects
        // Function implementation
    }
    
    static void getCount() {  // Single copy, accessible without object
        // Static function implementation
    }
};

int Employee::count = 0;  // Static member definition

int main() {
    Employee e1, e2, e3;  // Each has separate id, name
                          // All share same functions and count
    return 0;
}
\`\`\`

This completes the comprehensive OOP section covering all fundamental and advanced concepts from your reference material.
          `,
        },
      ],
    },
    multithreading: {
      id: "multithreading",
      title: "Multithreading",
      description: "Concurrency, threads, mutexes, and async operations",
      icon: "Cpu",
      color: "orange",
      topics: [
        {
          id: "thread-basics",
          title: "Thread Basics",
          content: `
# Thread Basics in C++

## Thread Creation Patterns

C++11 introduced the \`std::thread\` class, which provides a standard way to create and manage threads. Understanding how to launch threads with various callable objects is fundamental.

### 5 Ways to Create Threads
Below are the five common patterns for creating threads, ranging from function pointers to modern lambda expressions.

\`\`\`cpp
#include <iostream>
#include <thread>
#include <memory>

// 1. Function Pointer
void fun(int x) {
    std::cout << "Function Pointer: " << x << std::endl;
}

// 2. Lambda Expression
// Most common in modern C++. Allows capturing context variables.
auto lambda = [](int x) {
    std::cout << "Lambda: " << x << std::endl;
};

// 3. Functor (Function Object)
class Base {
public:
    void operator()(int x) {
        std::cout << "Functor: " << x << std::endl;
    }
};

// 4. Non-static Member Function
class Worker {
public:
    void run(int x) {
        std::cout << "Member Function: " << x << std::endl;
    }
};

// 5. Static Member Function
class Utility {
public:
    static void staticRun(int x) {
        std::cout << "Static Member: " << x << std::endl;
    }
};

int main() {
    // 1. Using Function Pointer
    std::thread t1(fun, 10);
    
    // 2. Using Lambda
    std::thread t2(lambda, 20);
    
    // 3. Using Functor
    std::thread t3(Base(), 30);
    
    // 4. Using Non-static Member Function
    // Requires passing the object instance (pointer) as the second argument
    Worker w;
    std::thread t4(&Worker::run, &w, 40);
    
    // 5. Using Static Member Function
    std::thread t5(&Utility::staticRun, 50);

    // Always join or detach!
    t1.join();
    t2.join();
    t3.join();
    t4.join();
    t5.join();
    
    return 0;
}
\`\`\`

## Lifecycle Management

### ID, Sleep, and Yield
Managing thread execution involves identifying threads, pausing execution, and cooperatively yielding control.

\`\`\`cpp
#include <iostream>
#include <thread>
#include <chrono>

void worker() {
    std::thread::id my_id = std::this_thread::get_id();
    std::cout << "Worker ID: " << my_id << std::endl;
    
    // Sleep for a duration
    std::this_thread::sleep_for(std::chrono::milliseconds(500));
    
    // Yield execution to allow other threads to run
    // Useful in busy-wait loops to reduce CPU consumption
    std::this_thread::yield();
}

int main() {
    std::thread t1(worker);
    std::thread::id t1_id = t1.get_id();
    
    std::cout << "Main thread sees t1 ID as: " << t1_id << std::endl;
    
    t1.join();
    return 0;
}
\`\`\`

### Join vs Detach
When a thread object goes out of scope, it must be either **joined** or **detached**, otherwise \`std::terminate\` is called.

- **Join**: The parent thread waits for the child thread to finish. This ensures the child has completed its work.
- **Detach**: The child thread runs independently (daemon). The OS reclaims resources when it finishes. **Danger**: If the main application exits, detached threads are abruptly killed.

\`\`\`cpp
void heavyTask() {
    std::this_thread::sleep_for(std::chrono::seconds(2));
    std::cout << "Task finished" << std::endl;
}

int main() {
    std::thread t_join(heavyTask);
    std::thread t_detach(heavyTask);
    
    t_join.join();   // Wait for this one
    t_detach.detach(); // Let this one run in background
    
    // If we return here immediately, t_detach might be killed before printing!
    std::this_thread::sleep_for(std::chrono::seconds(3)); 
    return 0;
}
\`\`\`
          `,
        },
        {
          id: "mutex-locking",
          title: "Mutex & Locking",
          content: `
# Mutex and Locking Mechanisms

Mutexes (Mutual Exclusions) are the primary mechanism to prevent Race Conditions by ensuring that only one thread can access a resource at a time.

## Mutex Types

### std::mutex and std::timed_mutex
\`\`\`cpp
#include <mutex>
#include <chrono>

std::mutex mtx;
std::timed_mutex t_mtx;

void critical_section() {
    // Blocking lock
    mtx.lock();
    // ... do work ...
    mtx.unlock();
    
    // Non-blocking try_lock
    if (mtx.try_lock()) {
        // ... do work ...
        mtx.unlock();
    }
    
    // Timed lock (try for 1 second)
    if (t_mtx.try_lock_for(std::chrono::seconds(1))) {
        // ... acquired ...
        t_mtx.unlock();
    }
}
\`\`\`

### Recursive Mutex
Standard mutexes cannot be locked twice by the same thread (undefined behavior). Use \`std::recursive_mutex\` if a thread needs to acquire the same lock multiple times (e.g., recursive functions).

\`\`\`cpp
std::recursive_mutex rm;

void access(int count) {
    if (count <= 0) return;
    
    rm.lock(); // Safe to re-lock
    std::cout << "Locked level " << count << std::endl;
    access(count - 1);
    rm.unlock();
}
\`\`\`

## RAII Lock Management (Recommended)
Manual \`lock()\` and \`unlock()\` lead to bugs if an exception is thrown or a return statement is hit before unlock. Always use RAII wrappers.

### std::lock_guard vs std::unique_lock
\`\`\`cpp
std::mutex m;

void good_practice() {
    // 1. std::lock_guard
    // Simple, lightweight. Locks on construction, unlocks on destruction.
    // Cannot be manually unlocked.
    {
        std::lock_guard<std::mutex> lg(m);
        // Protected code
    } // Automatically unlocked here

    // 2. std::unique_lock
    // More heavy-weight. Can be locked/unlocked manually, moved, and deferred.
    // Required for condition_variables.
    {
        std::unique_lock<std::mutex> ul(m);
        ul.unlock(); // Can unlock early
        // ... heavy calculation not needing lock ...
        ul.lock();   // Lock again
    }
}
\`\`\`

## Deadlock Avoidance
Deadlocks occur when two threads wait for each other's locks.
**Strategy**: Always lock mutexes in the same global order, or use \`std::lock\`.

\`\`\`cpp
std::mutex m1, m2;

void threadA() {
    // std::lock locks multiple mutexes using a deadlock-avoidance algorithm
    std::lock(m1, m2);
    
    // Adopt the locks (tell wrappers we already locked them)
    std::lock_guard<std::mutex> lg1(m1, std::adopt_lock);
    std::lock_guard<std::mutex> lg2(m2, std::adopt_lock);
    
    std::cout << "Thread A doing work" << std::endl;
}
\`\`\`
          `,
        },
        {
          id: "sync-async",
          title: "Synchronization & Async",
          content: `
# Synchronization & Async

Coordination between threads often requires waiting for specific events or results.

## Condition Variables
Used for waiting for a condition to become true (e.g., "Queue is not empty"). Always used with \`std::unique_lock\`.

### Producer-Consumer Pattern
\`\`\`cpp
#include <mutex>
#include <condition_variable>
#include <queue>

std::queue<int> buffer;
std::mutex mtx;
std::condition_variable cv;
const unsigned int MAX_BUFFER_SIZE = 10;

void producer() {
    for (int i = 0; i < 20; ++i) {
        std::unique_lock<std::mutex> lock(mtx);
        
        // Wait if buffer is full
        // cv.wait unlocks mtx and sleeps. Re-locks when notified AND predicate is true.
        cv.wait(lock, [] { return buffer.size() < MAX_BUFFER_SIZE; });
        
        buffer.push(i);
        std::cout << "Produced: " << i << std::endl;
        
        lock.unlock(); // Unlock before notifying to avoid waking thread just to block it
        cv.notify_one();
    }
}

void consumer() {
    for (int i = 0; i < 20; ++i) {
        std::unique_lock<std::mutex> lock(mtx);
        
        // Wait if buffer is empty
        cv.wait(lock, [] { return !buffer.empty(); });
        
        int val = buffer.front();
        buffer.pop();
        std::cout << "Consumed: " << val << std::endl;
        
        lock.unlock();
        cv.notify_one();
    }
}
\`\`\`

## Futures and Promises
Standard mechanism to return values or exceptions from threads.

### std::async
High-level interface to run tasks.
\`\`\`cpp
#include <future>

int calculate() { return 42; }

int main() {
    // launch::async forces a new thread
    std::future<int> f = std::async(std::launch::async, calculate);
    
    // get() blocks until the result is ready
    std::cout << "Result: " << f.get() << std::endl;
    return 0;
}
\`\`\`

### std::promise
Low-level setting of the result. Use when you need to set the value from within a thread manually.
\`\`\`cpp
void worker(std::promise<int> p) {
    try {
        // ... calculation ...
        p.set_value(100);
    } catch (...) {
        p.set_exception(std::current_exception());
    }
}

int main() {
    std::promise<int> p;
    std::future<int> f = p.get_future();
    std::thread t(worker, std::move(p));
    
    std::cout << "Got: " << f.get() << std::endl;
    t.join();
}
\`\`\`
          `,
        },
        {
          id: "concurrency-problems",
          title: "Concurrency Problems",
          content: `
# Classic Concurrency Problems (LeetCode)

These problems are famous for testing thread coordination skills. Detailed solutions below.

## 1. Print in Order (LeetCode 1114)
**Goal**: Ensure \`first()\`, \`second()\`, and \`third()\` execute in that exact order, regardless of how threads are scheduled.

### Solution using std::promise
Promises are perfect here because they represent a one-time event that has happened.

\`\`\`cpp
class Foo {
    std::promise<void> p1;
    std::promise<void> p2;

public:
    void first(function<void()> printFirst) {
        printFirst();
        p1.set_value(); // Signal first is done
    }

    void second(function<void()> printSecond) {
        p1.get_future().wait(); // Wait for first
        printSecond();
        p2.set_value(); // Signal second is done
    }

    void third(function<void()> printThird) {
        p2.get_future().wait(); // Wait for second
        printThird();
    }
};
\`\`\`

## 2. FizzBuzz Multithreaded (LeetCode 1195)
**Goal**: 4 threads. One prints "Fizz" (div 3), one "Buzz" (div 5), one "FizzBuzz" (div 15), one numbers. Coordinate them up to \`n\`.

### Solution using Condition Variable
We track the current number \`i\` and each thread checks if it's their "turn".

\`\`\`cpp
class FizzBuzz {
    int n;
    int i;
    std::mutex m;
    std::condition_variable cv;

public:
    FizzBuzz(int n) {
        this->n = n;
        this->i = 1;
    }

    void fizz(function<void()> printFizz) {
        while (true) {
            std::unique_lock<std::mutex> lock(m);
            cv.wait(lock, [this] { return i > n || (i % 3 == 0 && i % 5 != 0); });
            if (i > n) break;
            printFizz();
            i++;
            cv.notify_all();
        }
    }

    void buzz(function<void()> printBuzz) {
        while (true) {
            std::unique_lock<std::mutex> lock(m);
            cv.wait(lock, [this] { return i > n || (i % 5 == 0 && i % 3 != 0); });
            if (i > n) break;
            printBuzz();
            i++;
            cv.notify_all();
        }
    }

    void fizzbuzz(function<void()> printFizzBuzz) {
        while (true) {
            std::unique_lock<std::mutex> lock(m);
            cv.wait(lock, [this] { return i > n || (i % 15 == 0); });
            if (i > n) break;
            printFizzBuzz();
            i++;
            cv.notify_all();
        }
    }

    void number(function<void(int)> printNumber) {
        while (true) {
            std::unique_lock<std::mutex> lock(m);
            cv.wait(lock, [this] { return i > n || (i % 3 != 0 && i % 5 != 0); });
            if (i > n) break;
            printNumber(i);
            i++;
            cv.notify_all();
        }
    }
};
\`\`\`

## 3. Print FooBar Alternately (LeetCode 1115)
**Goal**: Thread A prints "Foo", Thread B prints "Bar". Repeat \`n\` times: FooBarFooBar...

### Solution using Mutex & CV
\`\`\`cpp
class FooBar {
    int n;
    std::mutex m;
    std::condition_variable cv;
    bool fooTurn = true; // State to track whose turn

public:
    FooBar(int n) {
        this->n = n;
    }

    void foo(function<void()> printFoo) {
        for (int i = 0; i < n; i++) {
            std::unique_lock<std::mutex> lock(m);
            cv.wait(lock, [this] { return fooTurn; });
            
            printFoo();
            fooTurn = false;
            cv.notify_one();
        }
    }

    void bar(function<void()> printBar) {
        for (int i = 0; i < n; i++) {
            std::unique_lock<std::mutex> lock(m);
            cv.wait(lock, [this] { return !fooTurn; });
            
            printBar();
            fooTurn = true;
            cv.notify_one();
        }
    }
};
\`\`\`

## 4. Print Zero Even Odd (LeetCode 1116)
**Goal**: Print 01020304...0n. Thread A prints 0, B prints Odd, C prints Even.

### Solution
\`\`\`cpp
class ZeroEvenOdd {
    int n;
    std::mutex m;
    std::condition_variable cv;
    int state = 0; // 0=Zero, 1=Odd, 2=Even
    int i = 1;

public:
    ZeroEvenOdd(int n) {
        this->n = n;
    }

    void zero(function<void(int)> printNumber) {
        while (true) {
            std::unique_lock<std::mutex> lock(m);
            cv.wait(lock, [this] { return state == 0 || i > n; });
            if (i > n) break;
            
            printNumber(0);
            
            if (i % 2 == 1) state = 1; // Next is odd
            else state = 2;            // Next is even
            
            cv.notify_all();
        }
    }

    void odd(function<void(int)> printNumber) {
        while (true) {
            std::unique_lock<std::mutex> lock(m);
            cv.wait(lock, [this] { return state == 1 || i > n; });
            if (i > n) break;
            
            printNumber(i++);
            state = 0; // Back to zero
            cv.notify_all();
        }
    }

    void even(function<void(int)> printNumber) {
        while (true) {
            std::unique_lock<std::mutex> lock(m);
            cv.wait(lock, [this] { return state == 2 || i > n; });
            if (i > n) break;
            
            printNumber(i++);
            state = 0; // Back to zero
            cv.notify_all();
        }
    }
};
\`\`\`

## 5. The Dining Philosophers (LeetCode 1226)
**Goal**: 5 philosophers sit at a table. Each needs 2 forks to eat. Prevent deadlock.

### Solution: Hierarchy Strategy
To create a strictly ordered resource hierarchy, perform the check: always pick up the lower-numbered fork first, then the higher-numbered fork. This breaks the circular wait condition.

\`\`\`cpp
class DiningPhilosophers {
    std::mutex forks[5];
public:
    void wantsToEat(int philosopher,
                    function<void()> pickLeftFork,
                    function<void()> pickRightFork,
                    function<void()> eat,
                    function<void()> putLeftFork,
                    function<void()> putRightFork) {
        
        int first = philosopher;
        int second = (philosopher + 1) % 5;
        
        // Enforce order: always lock smaller index first
        if (first > second) std::swap(first, second);
        
        std::unique_lock<std::mutex> lock1(forks[first]);
        std::unique_lock<std::mutex> lock2(forks[second]);
        
        pickLeftFork();
        pickRightFork();
        eat();
        putLeftFork();
        putRightFork();
    }
};
\`\`\`
          `,
        },
          
      // ... previous topics ...
      ],
    },
    stl: {
      title: "Standard Template Library",
      description:
        "The STL is a set of C++ template classes to provide common programming data structures and functions.",
      color: "cyan",
      topics: [
        {
          id: "containers",
          title: "Containers",
          content: `
# STL Containers

Containers store collections of objects. They are divided into sequence containers, associative containers, and unordered associative containers.

## Sequence Containers

### std::vector
Dynamic array. Fast random access O(1). Fast push_back O(1) amortized. Slow insert/erase in middle O(n).

\`\`\`cpp
#include <vector>
#include <iostream>

int main() {
    std::vector<int> numbers = {1, 2, 3};
    
    // O(1) Push back
    numbers.push_back(4);
    
    // O(1) Random Access
    std::cout << numbers[0] << std::endl; // 1
    
    // Iterating
    for (int n : numbers) {
        std::cout << n << " ";
    }
    return 0;
}
\`\`\`

### std::deque
Double-Ended Queue. Fast insert/erase at both front and back O(1). Random access O(1).
\`\`\`cpp
#include <deque>
std::deque<int> d = {1, 2, 3};
d.push_front(0); // O(1)
d.push_back(4);  // O(1)
\`\`\`

### std::list (Doubly Linked List)
Optimized for insertion/deletion anywhere O(1). No random access.

\`\`\`cpp
#include <list>
#include <iostream>
#include <algorithm> // For std::advance

int main() {
    std::list<int> l1 = {10, 20, 30};

    // 1. Insertion at Iterator (Pointer) position
    auto it = l1.begin(); 
    std::advance(it, 1); // Move iterator to 2nd position (O(n))
    l1.insert(it, 15);   // Insert 15 before 20: {10, 15, 20, 30}
    
    // 2. Splicing (Transferring elements efficiently O(1))
    std::list<int> l2 = {40, 50};
    // Move ALL of l2 to the end of l1. No copying involved!
    l1.splice(l1.end(), l2); 
    // l1: {10, 15, 20, 30, 40, 50}, l2 is now empty.

    // 3. Member Functions (std::sort doesn't work on list!)
    l1.push_back(15);    // {..., 50, 15}
    l1.sort();           // {10, 15, 15, 20, 30, 40, 50}
    l1.unique();         // Removes consecutive duplicates: {10, 15, 20, 30, 40, 50}
    
    // 4. Removing with Predicate
    l1.remove_if([](int n){ return n > 30; }); // {10, 15, 20, 30}
    
    return 0;
}
\`\`\`

## Container Adapters
Restricted interfaces built on top of other containers (usually deque or vector).

### std::stack (LIFO)
\`\`\`cpp
#include <stack>
std::stack<int> s;
s.push(1); // Push
s.pop();   // Pop
int top = s.top(); // Peek
\`\`\`

### std::queue (FIFO)
\`\`\`cpp
#include <queue>
std::queue<int> q;
q.push(1);
q.pop();
int front = q.front();
\`\`\`

### std::priority_queue (Max Heap)
\`\`\`cpp
#include <queue>
std::priority_queue<int> pq;
pq.push(10);
pq.push(30); 
pq.push(20);
// pq.top() is now 30 (largest element)
\`\`\`

## Associative Containers (Sorted)
Implemented as Red-Black Trees. Keys are sorted. Search is O(log n).

### std::set & std::map
\`\`\`cpp
#include <set>
#include <map>
#include <string>

// Set: Unique, sorted elements
std::set<int> unique_nums = {3, 1, 2, 1}; // {1, 2, 3}

// Map: Key-Value pairs, sorted by key
std::map<std::string, int> ages;
ages["Alice"] = 30; // O(log n)
ages["Bob"] = 25;   // O(log n)

if (ages.find("Alice") != ages.end()) {
    std::cout << "Alice found!" << std::endl;
}
\`\`\`

## Unordered Associative Containers (Hash Tables)
Keys are hashed. Search is O(1) on average. Order is random.

### std::unordered_map
\`\`\`cpp
#include <unordered_map>
std::unordered_map<std::string, int> cache;
cache["key"] = 123; // O(1) avg
\`\`\`
          `,
        },
        {
          id: "algorithms",
          title: "Algorithms",
          content: `
# STL Algorithms

The \`<algorithm>\` and \`<numeric>\` headers provide a collection of functions acting on ranges.

## Common Algorithms

### Sorting
\`\`\`cpp
#include <algorithm>
#include <vector>

std::vector<int> v = {4, 2, 5, 1, 3};

// Sort descending
std::sort(v.begin(), v.end(), std::greater<int>());
\`\`\`

### Searching & Counting
\`\`\`cpp
// Binary Search (container must be sorted)
bool exists = std::binary_search(v.begin(), v.end(), 3);

// Find (Linear scan)
auto it = std::find(v.begin(), v.end(), 5);

// Counting occurrences
int twos = std::count(v.begin(), v.end(), 2);

// Counting with predicate (e.g., even numbers)
int evens = std::count_if(v.begin(), v.end(), [](int n){ return n % 2 == 0; });
\`\`\`

### Logical Predicates
\`\`\`cpp
// Are all elements positive?
bool all_pos = std::all_of(v.begin(), v.end(), [](int n){ return n > 0; });

// Is there any negative element?
bool any_neg = std::any_of(v.begin(), v.end(), [](int n){ return n < 0; });
\`\`\`

### Numeric Operations (std::accumulate)
\`\`\`cpp
#include <numeric>

std::vector<int> nums = {1, 2, 3, 4};

// Sum all elements (Starts with initial value 0)
int sum = std::accumulate(nums.begin(), nums.end(), 0); 
// sum = 10;

// Reduce/Fold (e.g., product)
int product = std::accumulate(nums.begin(), nums.end(), 1, std::multiplies<int>());
// product = 24
\`\`\`

### Transformations
\`\`\`cpp
std::vector<int> squared;
// Apply function to each element
std::transform(nums.begin(), nums.end(), 
               std::back_inserter(squared), 
               [](int x) { return x * x; });
// squared is now {1, 4, 9, 16}
\`\`\`
          `,
        },
        {
          id: "iterators",
          title: "Iterators",
          content: `
# Iterators

Iterators are objects that point to elements in a container. They provide a common interface to traverse different types of containers.

## Iterator Types

1.  **Input Iterator**: Read only, forward moving (e.g., \`istream_iterator\`).
2.  **Output Iterator**: Write only, forward moving (e.g., \`ostream_iterator\`).
3.  **Forward Iterator**: Read/Write, forward moving (\`forward_list\`).
4.  **Bidirectional Iterator**: Can move backward (\`list\`, \`map\`, \`set\`).
5.  **Random Access Iterator**: Jump to any element, arithmetic operators (\`vector\`, \`deque\`, \`array\`).

## Usage Pattern

\`\`\`cpp
#include <vector>
#include <iostream>

int main() {
    std::vector<int> data = {10, 20, 30};
    
    // Explicit iterator type
    std::vector<int>::iterator it;
    
    for (it = data.begin(); it != data.end(); ++it) {
        std::cout << *it << " "; // Dereference to get value
    }
    
    // Constant iterator (read-only)
    std::vector<int>::const_iterator cit = data.cbegin();
    
    return 0;
}
\`\`\`
          `,
        },
        {
            id: "modern-utilities",
            title: "Modern Utilities",
            content: `
# Modern C++ Utilities

C++11, C++17, and C++20 introduced powerful types to handle common scenarios safely.

## std::optional (C++17)
Represents a value that may or may not be present (better than nullptr or references).

\`\`\`cpp
#include <optional>

std::optional<int> findUserAge(int id) {
    if (id == 99) return std::nullopt; // Found nothing
    return 25; // Found 25
}

int main() {
    auto age = findUserAge(99);
    if (age.has_value()) {
        std::cout << "Age: " << age.value() << std::endl;
    }
    
    // Or safely default
    int safeAge = age.value_or(0); 
}
\`\`\`

## std::variant (C++17)
Type-safe unions. Can hold one of several specified types.

\`\`\`cpp
#include <variant>

std::variant<int, float, std::string> value;

value = 10;
value = 3.14f;
value = "Hello";

// Accessing (throws if wrong type)
try {
    std::string s = std::get<std::string>(value);
} catch (const std::bad_variant_access& e) {
    std::cout << e.what() << std::endl;
}

// Assessing with visitor
std::visit([](auto&& arg){ std::cout << arg; }, value);
\`\`\`

## std::pair & std::tuple
Hold heterogeneous collection of values.

\`\`\`cpp
#include <utility>
#include <tuple>

// Pair
std::pair<std::string, int> user = {"Alice", 30};
std::cout << user.first << ": " << user.second << std::endl;

// Tuple (C++11)
std::tuple<int, double, std::string> t(1, 4.5, "test");
// Structured Binding (C++17) - Very useful!
auto [id, weight, name] = t;
\`\`\`
            `,
        },
      ],
    },
    // End of sections
  },
};

// Helper function to get section data
export const getCppSectionData = (sectionId) => {
  return cppData.sections[sectionId] || null;
};

// Helper function to get all sections
export const getAllCppSections = () => {
  return Object.values(cppData.sections);
};
