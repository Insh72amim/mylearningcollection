import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code, Copy, Check, ArrowLeft, ChevronRight } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const CppSyntax = ({ onBack }) => {
  const [copiedCode, setCopiedCode] = useState("");

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  const syntaxSections = [
    {
      id: "basic-types",
      title: "Basic Data Types",
      content: `C++ provides several fundamental data types to store different kinds of values.`,
      code: `// Integer types
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

// Auto keyword (C++11+) - type deduction
auto number = 42;        // int
auto pi = 3.14;          // double
auto name = "John";      // const char*`,
    },
    {
      id: "variables",
      title: "Variable Declaration & Initialization",
      content: `C++ offers multiple ways to declare and initialize variables with different syntax styles.`,
      code: `// Traditional initialization
int x = 10;
double y = 3.14;

// Uniform initialization (C++11+)
int a{20};
double b{2.718};
std::string name{"Alice"};

// Direct initialization
int c(30);
std::string greeting("Hello World");

// Default initialization
int defaultInt{};        // 0
double defaultDouble{};  // 0.0
std::string defaultStr{}; // empty string

// Const variables
const int MAX_SIZE = 100;
const double PI{3.14159};

// Reference variables
int original = 42;
int& ref = original;     // ref is an alias for original`,
    },
    {
      id: "control-flow",
      title: "Control Flow Structures",
      content: `Control flow statements allow you to control the execution order of your program.`,
      code: `// if-else statements
int score = 85;
char grade;

if (score >= 90) {
    grade = 'A';
} else if (score >= 80) {
    grade = 'B';
} else if (score >= 70) {
    grade = 'C';
} else {
    grade = 'F';
}

// Ternary operator
int max = (a > b) ? a : b;

// Switch statement
switch (grade) {
    case 'A':
        std::cout << "Excellent!" << std::endl;
        break;
    case 'B':
        std::cout << "Good job!" << std::endl;
        break;
    case 'C':
        std::cout << "Satisfactory" << std::endl;
        break;
    default:
        std::cout << "Keep trying!" << std::endl;
}`,
    },
    {
      id: "loops",
      title: "Loop Structures",
      content: `C++ provides several types of loops for repetitive operations.`,
      code: `// For loop
for (int i = 0; i < 10; ++i) {
    std::cout << i << " ";
}

// Range-based for loop (C++11+)
std::vector<int> numbers = {1, 2, 3, 4, 5};
for (const auto& num : numbers) {
    std::cout << num << " ";
}

// While loop
int count = 0;
while (count < 5) {
    std::cout << count << std::endl;
    count++;
}

// Do-while loop
int input;
do {
    std::cout << "Enter a positive number: ";
    std::cin >> input;
} while (input <= 0);

// Enhanced for loop with index (C++20)
for (auto [index, value] : std::views::enumerate(numbers)) {
    std::cout << "Index: " << index << ", Value: " << value << std::endl;
}`,
    },
    {
      id: "functions",
      title: "Functions",
      content: `Functions are reusable blocks of code that perform specific tasks.`,
      code: `// Basic function declaration and definition
int add(int a, int b) {
    return a + b;
}

// Function with default parameters
void greet(const std::string& name = "World") {
    std::cout << "Hello, " << name << "!" << std::endl;
}

// Function overloading
int multiply(int a, int b) {
    return a * b;
}

double multiply(double a, double b) {
    return a * b;
}

// Lambda expressions (C++11+)
auto square = [](int x) { return x * x; };

// Lambda with capture
int multiplier = 10;
auto multiplyBy10 = [multiplier](int x) { return x * multiplier; };

// Generic lambda (C++14+)
auto genericAdd = [](auto a, auto b) { return a + b; };

// Function templates
template<typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}`,
    },
    {
      id: "pointers-references",
      title: "Pointers and References",
      content: `Pointers and references provide ways to indirectly access and manipulate memory.`,
      code: `// Basic pointer operations
int value = 42;
int* ptr = &value;       // ptr points to value

std::cout << value;      // Output: 42
std::cout << &value;     // Output: memory address
std::cout << ptr;        // Output: same memory address
std::cout << *ptr;       // Output: 42 (dereferencing)

*ptr = 100;              // Modify value through pointer
std::cout << value;      // Output: 100

// Pointer arithmetic
int arr[] = {10, 20, 30, 40, 50};
int* p = arr;            // Points to first element

std::cout << *p;         // 10
std::cout << *(p + 1);   // 20
std::cout << *(p + 2);   // 30

// References
int original = 10;
int& ref = original;     // ref is an alias for original

ref = 20;                // Modifies original
std::cout << original;   // Output: 20

// Smart pointers (C++11+)
#include <memory>

// unique_ptr - exclusive ownership
std::unique_ptr<int> uniquePtr = std::make_unique<int>(42);
std::cout << *uniquePtr; // 42

// shared_ptr - shared ownership
std::shared_ptr<int> sharedPtr1 = std::make_shared<int>(100);
std::shared_ptr<int> sharedPtr2 = sharedPtr1;  // Shared ownership`,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4">
            <ArrowLeft className="w-5 h-5" />
            Back to C++ Overview
          </button>

          <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <Code className="w-8 h-8 text-cyan-400" />
            C++ Syntax Fundamentals
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl">
            Master the core syntax elements of C++ including data types,
            variables, control flow, functions, and memory management.
          </p>
        </motion.div>

        {/* Syntax Sections */}
        <div className="space-y-8">
          {syntaxSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-3 rounded-lg">
                  <ChevronRight className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {section.title}
                </h2>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {section.content}
              </p>

              {/* Code Block */}
              <div className="relative rounded-xl overflow-hidden border border-gray-600">
                <div className="flex justify-between items-center bg-gray-900 px-4 py-3 border-b border-gray-600">
                  <span className="text-sm text-gray-400 font-mono">C++</span>
                  <button
                    onClick={() => copyCode(section.code)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                    {copiedCode === section.code ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-gray-950 overflow-hidden">
                  <SyntaxHighlighter
                    language="cpp"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: "1.5rem",
                      background: "rgb(3, 7, 18)",
                      fontSize: "0.875rem",
                      lineHeight: "1.6",
                      borderRadius: "0",
                    }}
                    showLineNumbers={false}
                    wrapLines={true}
                    wrapLongLines={true}>
                    {section.code}
                  </SyntaxHighlighter>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center">
          <p className="text-gray-400">
            Continue learning with <span className="text-cyan-400">OOP</span>{" "}
            and <span className="text-cyan-400">Comparison</span> sections
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CppSyntax;
