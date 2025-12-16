# LLD Interview Implementation Guide 🎯

## Quick Reference for Technical Interviews

---

## 📋 Step-by-Step Approach

### Phase 1: Clarification (5 minutes)

**Ask These Questions:**

1. **Scale & Scope**
   - How many users/entities?
   - Expected load (concurrent requests)?
   - Performance requirements?

2. **Functional Requirements**
   - What are the core features?
   - Any special edge cases?
   - Priority of features?

3. **Non-Functional Requirements**
   - Thread safety needed?
   - Persistence required?
   - Real-time updates?

**Example (Parking Lot):**
```
❓ "How many floors and spots per floor?"
❓ "What vehicle types do we need to support?"
❓ "Should we handle concurrent parking requests?"
❓ "Do we need payment integration?"
❓ "Should we persist data or keep in-memory?"
```

---

### Phase 2: High-Level Design (10 minutes)

**Draw Class Diagram First!**

```
┌─────────────────┐
│   Main Class    │ (Usually Singleton)
├─────────────────┤
│ - attributes    │
├─────────────────┤
│ + methods()     │
└────────┬────────┘
         │ contains/uses
         ▼
┌─────────────────┐
│  Helper Class   │
└─────────────────┘
```

**Identify:**
- Main entities (nouns from requirements)
- Relationships (HAS-A, IS-A, USES)
- Core operations (verbs from requirements)

**Example (Elevator):**
```
Entities:
- ElevatorController (Singleton)
- Elevator (multiple instances)
- Request (abstract → Internal/External)
- Door, Display

Relationships:
- Controller HAS-MANY Elevators (1:N)
- Elevator HAS-ONE Door (1:1)
- Elevator HAS-MANY Requests (1:N)
```

---

### Phase 3: Design Patterns Selection (3 minutes)

**Common Patterns by Problem Type:**

| Problem Type | Likely Patterns |
|-------------|----------------|
| System Controller | Singleton |
| Multiple Implementations | Strategy, Factory |
| Object States | State Pattern |
| Undo/Redo | Command Pattern |
| Event Notifications | Observer Pattern |
| Object Creation | Factory, Builder |
| Legacy Integration | Adapter Pattern |

**Quick Pattern Checklist:**
- [ ] Need single instance? → **Singleton**
- [ ] Multiple algorithms? → **Strategy**
- [ ] Different object types? → **Factory**
- [ ] State transitions? → **State**
- [ ] Undo functionality? → **Command**
- [ ] Notify on changes? → **Observer**

---

### Phase 4: Core Implementation (25 minutes)

**Implementation Order:**

1. **Enums & Constants** (2 min)
```java
public enum VehicleType { CAR, TRUCK, MOTORCYCLE }
public enum SpotType { COMPACT, LARGE, HANDICAPPED }
```

2. **Base/Abstract Classes** (5 min)
```java
public abstract class Vehicle {
    protected String licensePlate;
    protected VehicleType type;
    
    public abstract VehicleType getType();
}
```

3. **Concrete Classes** (8 min)
```java
public class Car extends Vehicle {
    public Car(String licensePlate) {
        super(licensePlate, VehicleType.CAR);
    }
}
```

4. **Main Controller** (10 min)
```java
public class ParkingLot {
    private static ParkingLot instance;
    private List<ParkingFloor> floors;
    
    public synchronized Ticket parkVehicle(Vehicle v) {
        // Implementation
    }
}
```

---

### Phase 5: Handle Edge Cases (5 minutes)

**Common Edge Cases:**

1. **Null Checks**
```java
if (vehicle == null) {
    throw new IllegalArgumentException("Vehicle cannot be null");
}
```

2. **Concurrent Access**
```java
public synchronized void criticalOperation() {
    // Thread-safe implementation
}
```

3. **Capacity Limits**
```java
if (isFull()) {
    throw new ParkingFullException("No available spots");
}
```

4. **Invalid States**
```java
if (spot.isOccupied()) {
    throw new IllegalStateException("Spot already occupied");
}
```

---

## 🎨 Design Pattern Templates

### 1. Singleton Pattern

```java
public class SystemController {
    private static SystemController instance;
    private static final Object lock = new Object();
    
    private SystemController() {
        // Private constructor
    }
    
    // Thread-safe lazy initialization
    public static SystemController getInstance() {
        if (instance == null) {
            synchronized (lock) {
                if (instance == null) {
                    instance = new SystemController();
                }
            }
        }
        return instance;
    }
}
```

**When to use:** Global point of control, ensure single instance

---

### 2. Factory Pattern

```java
public class VehicleFactory {
    public static Vehicle createVehicle(VehicleType type, String plate) {
        switch (type) {
            case CAR:
                return new Car(plate);
            case TRUCK:
                return new Truck(plate);
            case MOTORCYCLE:
                return new Motorcycle(plate);
            default:
                throw new IllegalArgumentException("Unknown type");
        }
    }
}
```

**When to use:** Create objects without exposing creation logic

---

### 3. Strategy Pattern

```java
// Strategy interface
public interface ParkingStrategy {
    ParkingSpot findSpot(List<ParkingFloor> floors, Vehicle vehicle);
}

// Concrete strategies
public class NearestSpotStrategy implements ParkingStrategy {
    @Override
    public ParkingSpot findSpot(List<ParkingFloor> floors, Vehicle v) {
        // Find nearest available spot
    }
}

public class OptimizedStrategy implements ParkingStrategy {
    @Override
    public ParkingSpot findSpot(List<ParkingFloor> floors, Vehicle v) {
        // Optimized allocation
    }
}

// Context
public class ParkingLot {
    private ParkingStrategy strategy;
    
    public void setStrategy(ParkingStrategy strategy) {
        this.strategy = strategy;
    }
    
    public ParkingSpot findSpot(Vehicle v) {
        return strategy.findSpot(floors, v);
    }
}
```

**When to use:** Multiple algorithms/behaviors that can be swapped

---

### 4. Observer Pattern

```java
// Observer interface
public interface DisplayObserver {
    void update(int floor, String status);
}

// Concrete observer
public class FloorDisplay implements DisplayObserver {
    @Override
    public void update(int floor, String status) {
        System.out.println("Floor " + floor + ": " + status);
    }
}

// Subject
public class Elevator {
    private List<DisplayObserver> observers = new ArrayList<>();
    
    public void addObserver(DisplayObserver observer) {
        observers.add(observer);
    }
    
    public void notifyObservers(int floor, String status) {
        for (DisplayObserver observer : observers) {
            observer.update(floor, status);
        }
    }
    
    private void moveToFloor(int floor) {
        // Movement logic
        notifyObservers(floor, "Arrived");
    }
}
```

**When to use:** Notify multiple objects when state changes

---

### 5. State Pattern

```java
// State interface
public interface ElevatorState {
    void handleRequest(Elevator elevator, Request request);
}

// Concrete states
public class IdleState implements ElevatorState {
    @Override
    public void handleRequest(Elevator elevator, Request request) {
        elevator.setState(new MovingState());
        // Process request
    }
}

public class MovingState implements ElevatorState {
    @Override
    public void handleRequest(Elevator elevator, Request request) {
        // Add to queue while moving
    }
}

// Context
public class Elevator {
    private ElevatorState state;
    
    public void setState(ElevatorState state) {
        this.state = state;
    }
    
    public void handleRequest(Request request) {
        state.handleRequest(this, request);
    }
}
```

**When to use:** Object behavior changes based on internal state

---

### 6. Command Pattern (Undo/Redo)

```java
// Command interface
public interface Command {
    void execute();
    void undo();
}

// Concrete command
public class MoveCommand implements Command {
    private Piece piece;
    private Position from;
    private Position to;
    private Piece captured;
    
    @Override
    public void execute() {
        captured = board.getPiece(to);
        board.movePiece(from, to);
    }
    
    @Override
    public void undo() {
        board.movePiece(to, from);
        if (captured != null) {
            board.placePiece(captured, to);
        }
    }
}

// Invoker
public class Game {
    private Stack<Command> history = new Stack<>();
    
    public void executeMove(Command command) {
        command.execute();
        history.push(command);
    }
    
    public void undoMove() {
        if (!history.isEmpty()) {
            Command command = history.pop();
            command.undo();
        }
    }
}
```

**When to use:** Need undo/redo, logging, or transaction support

---

## 🎯 Problem-Specific Quick Start

### Elevator System

**Must-Have Classes:**
```java
1. ElevatorController (Singleton)
2. Elevator (State machine)
3. Request (Abstract → Internal/External)
4. SchedulingStrategy (Interface)
5. Door, Display
```

**Critical Methods:**
```java
- handleExternalRequest(floor, direction)
- handleInternalRequest(elevatorId, floor)
- moveToFloor(targetFloor)
- processRequests()
```

**Key Decisions:**
- Scheduling: FCFS vs SCAN vs LOOK
- Queue: Single vs Separate up/down
- Threading: Runnable vs ExecutorService

---

### Parking Lot

**Must-Have Classes:**
```java
1. ParkingLot (Singleton)
2. ParkingFloor
3. ParkingSpot (Abstract → Compact/Large/Handicapped)
4. Vehicle (Abstract → Car/Truck/Motorcycle)
5. Ticket, Receipt
```

**Critical Methods:**
```java
- parkVehicle(vehicle) → Ticket
- removeVehicle(ticketId) → Receipt
- findAvailableSpot(vehicleType) → ParkingSpot
- calculateFee(ticket) → double
```

**Key Decisions:**
- Spot allocation: Nearest vs Random vs Optimized
- Pricing: Flat vs Hourly vs Dynamic
- Concurrency: Synchronized vs ConcurrentHashMap

---

### Chess Game

**Must-Have Classes:**
```java
1. Game
2. Board
3. Piece (Abstract → King/Queen/Rook/Bishop/Knight/Pawn)
4. Position, Move
5. Player
```

**Critical Methods:**
```java
- makeMove(from, to) → boolean
- isValidMove(move) → boolean
- isCheck() → boolean
- isCheckmate() → boolean
- undoMove()
```

**Key Decisions:**
- Board: 2D array vs Bitboards
- Validation: Piece-based vs Board-based
- History: Full snapshots vs Incremental moves

---

## 💬 What to Say During Interview

### While Designing
```
"I'm thinking we need a Singleton here because..."
"This looks like a good use case for Strategy pattern..."
"Let me draw the class hierarchy first..."
"I'll start with the core functionality and then add..."
```

### When Stuck
```
"Can I assume...?"
"Would you like me to focus on...?"
"Let me think about the tradeoffs..."
"I'm considering two approaches..."
```

### When Coding
```
"I'm using interface here for flexibility..."
"This needs to be thread-safe because..."
"I'll add error handling for..."
"Let me add a TODO for..."
```

---

## ⚡ Time Management

**45-Minute Interview:**
- 0-5 min: Clarification
- 5-15 min: Design & Diagram
- 15-40 min: Implementation
- 40-45 min: Edge cases & Discussion

**60-Minute Interview:**
- 0-5 min: Clarification
- 5-15 min: Design & Diagram
- 15-45 min: Implementation
- 45-55 min: Extensions & Optimization
- 55-60 min: Q&A

---

## ✅ Pre-Interview Checklist

**Before the interview:**
- [ ] Practice drawing class diagrams on whiteboard
- [ ] Memorize key design patterns
- [ ] Know time complexity of common operations
- [ ] Understand thread safety basics
- [ ] Practice explaining your thinking out loud
- [ ] Review SOLID principles
- [ ] Prepare clarifying questions
- [ ] Time yourself solving problems

**During the interview:**
- [ ] Ask questions before coding
- [ ] Start with high-level design
- [ ] Explain your choices
- [ ] Write clean, readable code
- [ ] Handle edge cases
- [ ] Discuss tradeoffs
- [ ] Mention extensibility
- [ ] Stay calm and communicate

---

## 🚨 Common Mistakes to Avoid

1. ❌ Starting to code immediately
2. ❌ Not asking clarifying questions
3. ❌ Ignoring design patterns
4. ❌ Poor variable naming
5. ❌ No error handling
6. ❌ Forgetting thread safety
7. ❌ Over-engineering
8. ❌ Not discussing tradeoffs
9. ❌ Silent implementation
10. ❌ Giving up too quickly

---

## 🎓 Final Tips

**Remember the 3 C's:**
1. **Clarify** - Understand requirements
2. **Communicate** - Explain your thinking
3. **Code** - Write clean, extensible code

**Show you understand:**
- System design principles
- Design patterns
- SOLID principles
- Tradeoff analysis
- Real-world constraints
- Extensibility

**Be prepared to discuss:**
- How would you scale this?
- What if requirements change?
- How would you test this?
- What are the performance bottlenecks?
- How would you handle failures?

---

**Good luck! 🍀**

Remember: The interviewer wants to see **how you think**, not just that you can code.