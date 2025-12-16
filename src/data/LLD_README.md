# Low Level Design (LLD) Examples - Complete Guide

## 📚 Overview

This directory contains **interview-ready**, **production-quality** Low Level Design examples implemented in **Java**. Each example is comprehensive and includes:

- ✅ Complete class implementations
- ✅ Design pattern applications
- ✅ Class diagrams and relationships
- ✅ Detailed tradeoff analysis
- ✅ Interview tips and best practices
- ✅ Thread-safety considerations
- ✅ Extensibility guidelines

---

## 🎯 Current Examples

### 1. **Elevator System** (Medium)
**Problem**: Design a control system for a building with M floors and N elevators.

**Key Concepts**:
- Singleton Pattern (Controller)
- Strategy Pattern (Scheduling algorithms: FCFS, SCAN, LOOK)
- State Pattern (Elevator states)
- Observer Pattern (Display updates)
- Concurrent request handling
- Thread-safe operations

**Real-world Applications**: Smart buildings, office complexes, residential towers

---

### 2. **Parking Lot System** (Easy)
**Problem**: Design a multi-level parking lot with different vehicle and spot types.

**Key Concepts**:
- Singleton Pattern (ParkingLot)
- Factory Pattern (Spot creation)
- Strategy Pattern (Parking strategies, pricing models)
- Enum-based type safety
- Real-time availability tracking

**Real-world Applications**: Shopping malls, airports, commercial buildings

---

### 3. **Chess Game** (Hard)
**Problem**: Design a complete two-player chess game with all rules and move validation.

**Key Concepts**:
- Template Method Pattern (Piece movement)
- Command Pattern (Move history, undo/redo)
- Factory Pattern (Piece creation)
- Memento Pattern (Game state)
- Complex move validation
- Special moves (Castling, En Passant, Promotion)

**Real-world Applications**: Gaming platforms, chess engines, online multiplayer systems

---

## 🏗️ Architecture Principles

All examples follow these principles:

### 1. **SOLID Principles**
- **S**ingle Responsibility: Each class has one clear purpose
- **O**pen/Closed: Open for extension, closed for modification
- **L**iskov Substitution: Subtypes are substitutable for base types
- **I**nterface Segregation: Focused, client-specific interfaces
- **D**ependency Inversion: Depend on abstractions, not concretions

### 2. **Design Patterns**
Each example demonstrates multiple design patterns:
- **Creational**: Singleton, Factory, Builder
- **Structural**: Adapter, Decorator, Composite
- **Behavioral**: Strategy, Observer, Command, State, Template Method

### 3. **Clean Code**
- Meaningful names
- Small, focused methods
- Proper encapsulation
- Comprehensive documentation
- Error handling

---

## 💻 How to Use These Examples

### For Interview Preparation

1. **Understand the Problem**
   - Read requirements carefully
   - Ask clarifying questions
   - Identify constraints and edge cases

2. **Design First**
   - Draw class diagrams
   - Identify relationships (HAS-A, IS-A)
   - Choose appropriate design patterns
   - Discuss tradeoffs

3. **Implement Incrementally**
   - Start with core classes
   - Add basic functionality
   - Implement special cases
   - Add error handling

4. **Optimize and Extend**
   - Discuss performance implications
   - Consider scalability
   - Mention possible extensions
   - Handle edge cases

### Practice Strategy

**Week 1-2: Elevator System**
- Day 1-2: Understand requirements, draw diagrams
- Day 3-4: Implement core classes (Elevator, Controller)
- Day 5-6: Add scheduling strategies
- Day 7: Handle edge cases, threading

**Week 3-4: Parking Lot**
- Day 1-2: Design class hierarchy
- Day 3-4: Implement spot allocation
- Day 5-6: Add payment processing
- Day 7: Optimize and test

**Week 5-6: Chess Game**
- Day 1-3: Implement board and basic pieces
- Day 4-5: Add move validation
- Day 6-7: Special moves and game rules

---

## 🎨 Design Pattern Quick Reference

### Singleton
```java
public class Controller {
    private static Controller instance;
    
    private Controller() {}
    
    public static synchronized Controller getInstance() {
        if (instance == null) {
            instance = new Controller();
        }
        return instance;
    }
}
```

### Factory
```java
public class SpotFactory {
    public static ParkingSpot createSpot(SpotType type) {
        switch (type) {
            case COMPACT: return new CompactSpot();
            case LARGE: return new LargeSpot();
            default: throw new IllegalArgumentException();
        }
    }
}
```

### Strategy
```java
public interface SchedulingStrategy {
    Elevator selectElevator(List<Elevator> elevators, int floor);
}

public class FCFSStrategy implements SchedulingStrategy {
    @Override
    public Elevator selectElevator(List<Elevator> elevators, int floor) {
        // Implementation
    }
}
```

### Observer
```java
public interface Observer {
    void update(int floor, State state);
}

public class Display implements Observer {
    @Override
    public void update(int floor, State state) {
        System.out.println("Floor: " + floor + ", State: " + state);
    }
}
```

---

## ⚖️ Common Tradeoffs to Discuss

### 1. **Concurrency Control**
- **Pessimistic Locking**: `synchronized`, `ReentrantLock`
  - Pros: Prevents conflicts
  - Cons: Reduced throughput
- **Optimistic Locking**: Compare-and-swap
  - Pros: Better performance
  - Cons: Retry overhead

### 2. **Data Structure Choice**
- **ArrayList vs LinkedList**
  - ArrayList: Fast random access, slow insertion
  - LinkedList: Fast insertion, slow access
- **HashMap vs TreeMap**
  - HashMap: O(1) average, no ordering
  - TreeMap: O(log n), sorted keys

### 3. **Caching Strategy**
- **No Cache**: Simple, always fresh
- **LRU Cache**: Memory efficient, evicts least used
- **TTL Cache**: Time-based expiry, predictable

### 4. **Scalability**
- **Vertical Scaling**: Single powerful machine
- **Horizontal Scaling**: Multiple machines, distributed
- **Hybrid**: Combination of both

---

## 💡 Interview Tips

### Do's ✅
1. **Ask clarifying questions** before diving into code
2. **Start with high-level design** (class diagram)
3. **Explain your thought process** out loud
4. **Mention design patterns** you're using
5. **Discuss tradeoffs** of different approaches
6. **Consider edge cases** and error handling
7. **Write clean, readable code** with good naming
8. **Test your solution** mentally or with examples

### Don'ts ❌
1. Don't jump straight into coding
2. Don't ignore the interviewer's hints
3. Don't over-engineer simple problems
4. Don't forget about error handling
5. Don't ignore performance implications
6. Don't be silent - communicate!
7. Don't give up if stuck - ask for help
8. Don't forget to discuss extensibility

---

## 🔍 Common Interview Questions

### Elevator System
- How would you handle multiple concurrent requests?
- What scheduling algorithm is best for minimizing wait time?
- How would you implement emergency mode?
- How would you extend this to support VIP floors?

### Parking Lot
- How would you handle peak hours with high traffic?
- What if you need to support 1000 floors?
- How would you implement reserved parking?
- How would you add support for electric vehicle charging?

### Chess Game
- How would you detect checkmate efficiently?
- How would you implement an AI player?
- How would you support network multiplayer?
- How would you save and restore game state?

---

## 📖 Recommended Resources

### Books
1. **Head First Design Patterns** - Best for learning patterns
2. **Effective Java** by Joshua Bloch - Java best practices
3. **Clean Code** by Robert Martin - Code quality
4. **System Design Interview** by Alex Xu - Complete guide

### Online Resources
1. LeetCode - Practice coding problems
2. GeeksforGeeks - LLD examples and explanations
3. Refactoring.Guru - Design patterns with examples
4. System Design Primer - GitHub repository

### Practice Platforms
1. InterviewBit
2. Pramp (mock interviews)
3. Educative.io
4. Grokking the Object Oriented Design Interview

---

## 🚀 Extension Ideas

### Elevator System
- Load balancing across elevators
- Energy optimization mode
- Predictive scheduling using ML
- Integration with building security systems

### Parking Lot
- Dynamic pricing based on demand
- Reservation system
- Integration with payment gateways
- Mobile app for spot finding

### Chess Game
- AI opponent with different difficulty levels
- Online multiplayer with matchmaking
- Tournament mode
- Chess puzzle solver
- Game analysis and statistics

---

## 📝 Code Review Checklist

Before submitting or presenting your solution:

- [ ] All classes have single responsibility
- [ ] Proper use of interfaces and abstract classes
- [ ] Appropriate design patterns applied
- [ ] Thread-safety considered (if applicable)
- [ ] Error handling implemented
- [ ] Edge cases covered
- [ ] Code is well-documented
- [ ] Variable and method names are meaningful
- [ ] No code duplication
- [ ] SOLID principles followed
- [ ] Extension points identified
- [ ] Performance implications discussed

---

## 🤝 Contributing

To add a new LLD example:

1. Create comprehensive class implementations
2. Identify and apply relevant design patterns
3. Draw class diagrams
4. Document tradeoffs and design decisions
5. Add interview tips specific to the problem
6. Include usage examples
7. Test thoroughly

---

## 📞 Support

For questions or clarifications:
- Review the existing implementations
- Study the design patterns used
- Practice implementing from scratch
- Time yourself to simulate interview conditions

---

**Remember**: The goal is not just to write working code, but to demonstrate:
- System design thinking
- Knowledge of design patterns
- Understanding of tradeoffs
- Clean code practices
- Communication skills

Good luck with your interview preparation! 🎯