export const designPatterns = {
  creational: {
    id: 'creational',
    title: 'Creational Patterns',
    description: 'Deal with object creation mechanisms, trying to create objects in a manner suitable to the situation.',
    patterns: [
      {
        id: 'singleton',
        title: 'Singleton',
        type: 'Creational',
        summary: 'Ensure a class has only one instance and provide a global point of access to it.',
        problem: 'The application needs one, and only one, instance of an object. Additionally, lazy initialization and global access are necessary.',
        solution: 'Make the class of the single instance responsible for creation, initialization, access, and enforcement. Declare the instance as a private static data member. Provide a public static factory method that returns the instance.',
        realWorldAnalogy: 'The government of a country is an excellent example of the Singleton pattern. A country can have only one official government. Regardless of the personal identities of the individuals who form governments, the title, "The Government of X", is a global point of access to the group of people in charge.',
        structure: {
          nodes: [
            { id: 'client', type: 'default', position: { x: 100, y: 100 }, data: { label: 'Client' } },
            { id: 'singleton', type: 'default', position: { x: 300, y: 100 }, data: { label: 'Singleton\n- instance: Singleton\n+ getInstance(): Singleton' }, style: { border: '2px solid #3b82f6', padding: 10 } }
          ],
          edges: [
            { id: 'e1', source: 'client', target: 'singleton', label: 'getInstance()' }
          ]
        },
        code: `class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Singleton, cls).__new__(cls)
            # Initialize your instance here
        return cls._instance

# Usage
s1 = Singleton()
s2 = Singleton()

print(s1 is s2)  # True`,
        pros: [
          'You can be sure that a class has only a single instance.',
          'You gain a global access point to that instance.',
          'The singleton object is initialized only when it’s requested for the first time.'
        ],
        cons: [
          'Violates the Single Responsibility Principle. The pattern solves two problems at the time.',
          'The Singleton pattern can mask bad design, for instance, when the components of the program know too much about each other.',
          'The pattern requires special treatment in a multithreaded environment so that multiple threads won’t create a singleton object several times.'
        ]
      },
      {
        id: 'factory-method',
        title: 'Factory Method',
        type: 'Creational',
        summary: 'Define an interface for creating an object, but let subclasses decide which class to instantiate.',
        problem: 'Imagine that you’re creating a logistics management application. The first version of your app can only handle transportation by trucks, so the bulk of your code lives inside the Truck class. Later, you need to add Sea logistics. Adding a new class to the creator requires changing the creator\'s code.',
        solution: 'Replace direct object construction calls (using the new operator) with calls to a special factory method. Objects returned by a factory method are often referred to as products.',
        realWorldAnalogy: 'A logistics company. The "PlanDelivery" method is the factory method. It creates a "Transport" object. RoadLogistics (Creator) creates a Truck (Product). SeaLogistics (Creator) creates a Ship (Product).',
        structure: {
          nodes: [
            { id: 'creator', type: 'default', position: { x: 100, y: 100 }, data: { label: 'Creator\n+ factoryMethod()' } },
            { id: 'concreteCreator', type: 'default', position: { x: 100, y: 250 }, data: { label: 'ConcreteCreator\n+ factoryMethod()' } },
            { id: 'product', type: 'default', position: { x: 350, y: 100 }, data: { label: 'Product' } },
            { id: 'concreteProduct', type: 'default', position: { x: 350, y: 250 }, data: { label: 'ConcreteProduct' } }
          ],
          edges: [
            { id: 'e1', source: 'concreteCreator', target: 'creator', type: 'smoothstep', arrowHeadType: 'arrowclosed' },
            { id: 'e2', source: 'concreteProduct', target: 'product', type: 'smoothstep', arrowHeadType: 'arrowclosed' },
            { id: 'e3', source: 'concreteCreator', target: 'concreteProduct', label: 'creates', style: { strokeDasharray: '5,5' } }
          ]
        },
        code: `from abc import ABC, abstractmethod

class Creator(ABC):
    @abstractmethod
    def factory_method(self):
        pass

    def some_operation(self):
        product = self.factory_method()
        return f"Creator: The same creator's code has just worked with {product.operation()}"

class ConcreteCreator1(Creator):
    def factory_method(self):
        return ConcreteProduct1()

class Product(ABC):
    @abstractmethod
    def operation(self):
        pass

class ConcreteProduct1(Product):
    def operation(self):
        return "{Result of the ConcreteProduct1}"`,
        pros: [
          'You avoid tight coupling between the creator and the concrete products.',
          'Single Responsibility Principle. You can move the product creation code into one place in the program, making the code easier to support.',
          'Open/Closed Principle. You can introduce new types of products into the program without breaking existing client code.'
        ],
        cons: [
          'The code may become more complicated since you need to introduce a lot of new subclasses to implement the pattern.'
        ]
      },
      {
        id: 'abstract-factory',
        title: 'Abstract Factory',
        type: 'Creational',
        summary: 'Produce families of related objects without specifying their concrete classes.',
        problem: 'You need to create a family of related objects (e.g., Chair, Sofa, CoffeeTable) that come in different variants (Modern, Victorian, ArtDeco). You want to ensure that the objects you create match each other.',
        solution: 'Define an interface for creating all distinct products of the family (createChair, createSofa). Then create a separate factory class for each variant of the product family.',
        realWorldAnalogy: 'A furniture shop. You need a set of furniture. A "Modern Furniture Factory" will give you a modern chair, modern sofa, etc. A "Victorian Furniture Factory" will give you Victorian versions.',
        structure: {
          nodes: [
            { id: 'absFactory', type: 'default', position: { x: 100, y: 50 }, data: { label: 'AbstractFactory' } },
            { id: 'concFactory1', type: 'default', position: { x: 50, y: 150 }, data: { label: 'ConcreteFactory1' } },
            { id: 'concFactory2', type: 'default', position: { x: 150, y: 150 }, data: { label: 'ConcreteFactory2' } },
            { id: 'absProductA', type: 'default', position: { x: 350, y: 50 }, data: { label: 'AbstractProductA' } },
            { id: 'prodA1', type: 'default', position: { x: 300, y: 150 }, data: { label: 'ProductA1' } },
            { id: 'prodA2', type: 'default', position: { x: 400, y: 150 }, data: { label: 'ProductA2' } }
          ],
          edges: [
            { id: 'e1', source: 'concFactory1', target: 'absFactory' },
            { id: 'e2', source: 'concFactory2', target: 'absFactory' },
            { id: 'e3', source: 'prodA1', target: 'absProductA' },
            { id: 'e4', source: 'prodA2', target: 'absProductA' },
            { id: 'e5', source: 'concFactory1', target: 'prodA1', style: { strokeDasharray: '5,5' } }
          ]
        },
        code: `class AbstractFactory(ABC):
    @abstractmethod
    def create_product_a(self): pass
    @abstractmethod
    def create_product_b(self): pass

class ConcreteFactory1(AbstractFactory):
    def create_product_a(self): return ConcreteProductA1()
    def create_product_b(self): return ConcreteProductB1()

class AbstractProductA(ABC):
    @abstractmethod
    def useful_function_a(self): pass

class ConcreteProductA1(AbstractProductA):
    def useful_function_a(self): return "The result of the product A1."`,
        pros: [
          'You can be sure that the products you’re getting from a factory are compatible with each other.',
          'You avoid tight coupling between concrete products and client code.',
          'Single Responsibility Principle.',
          'Open/Closed Principle.'
        ],
        cons: [
          'The code becomes more complicated than it should be.'
        ]
      },
      {
        id: 'builder',
        title: 'Builder',
        type: 'Creational',
        summary: 'Construct complex objects step by step.',
        problem: 'Imagine a complex object that requires laborious, step-by-step initialization of many fields and nested objects. Such initialization code is usually buried inside a monstrous constructor with lots of parameters.',
        solution: 'Extract the object construction code out of its own class and move it to separate objects called builders.',
        realWorldAnalogy: 'Building a house. You can build a simple house, or a house with a garage, swimming pool, statues, and garden. You can use the same construction steps (buildWalls, buildDoors, buildRoof) but vary the implementation or order.',
        structure: {
          nodes: [
            { id: 'director', type: 'default', position: { x: 50, y: 100 }, data: { label: 'Director' } },
            { id: 'builder', type: 'default', position: { x: 200, y: 50 }, data: { label: 'Builder\n+ buildPart()' } },
            { id: 'concBuilder', type: 'default', position: { x: 200, y: 150 }, data: { label: 'ConcreteBuilder\n+ buildPart()\n+ getResult()' } },
            { id: 'product', type: 'default', position: { x: 350, y: 150 }, data: { label: 'Product' } }
          ],
          edges: [
            { id: 'e1', source: 'director', target: 'builder', label: 'uses' },
            { id: 'e2', source: 'concBuilder', target: 'builder' },
            { id: 'e3', source: 'concBuilder', target: 'product', label: 'creates', style: { strokeDasharray: '5,5' } }
          ]
        },
        code: `class Builder(ABC):
    @property
    @abstractmethod
    def product(self): pass
    @abstractmethod
    def produce_part_a(self): pass
    @abstractmethod
    def produce_part_b(self): pass

class ConcreteBuilder1(Builder):
    def __init__(self): self.reset()
    def reset(self): self._product = Product1()
    @property
    def product(self):
        product = self._product
        self.reset()
        return product
    def produce_part_a(self): self._product.add("PartA1")
    def produce_part_b(self): self._product.add("PartB1")

class Director:
    def __init__(self): self._builder = None
    @property
    def builder(self): return self._builder
    @builder.setter
    def builder(self, builder): self._builder = builder
    def build_minimal_viable_product(self):
        self.builder.produce_part_a()`,
        pros: [
          'You can construct objects step-by-step, defer construction steps or run steps recursively.',
          'You can reuse the same construction code when building various representations of products.',
          'Single Responsibility Principle.'
        ],
        cons: [
          'The overall complexity of the code increases since the pattern requires creating multiple new classes.'
        ]
      },
      {
        id: 'prototype',
        title: 'Prototype',
        type: 'Creational',
        summary: 'Copy existing objects without making your code dependent on their classes.',
        problem: 'You have an object, and you want to create an exact copy of it. You have to know the object’s class to create a duplicate, but sometimes you only know the interface.',
        solution: 'Delegate the cloning process to the actual objects that are being cloned. The pattern declares a common interface for all objects that support cloning.',
        realWorldAnalogy: 'Mitosis. A cell divides to create an exact copy of itself. The cell doesn\'t need to know "how" to build a cell from scratch; it just copies its own state.',
        structure: {
          nodes: [
            { id: 'client', type: 'default', position: { x: 50, y: 100 }, data: { label: 'Client' } },
            { id: 'prototype', type: 'default', position: { x: 200, y: 50 }, data: { label: 'Prototype\n+ clone()' } },
            { id: 'concProto1', type: 'default', position: { x: 200, y: 150 }, data: { label: 'ConcretePrototype1\n+ clone()' } },
            { id: 'concProto2', type: 'default', position: { x: 350, y: 150 }, data: { label: 'ConcretePrototype2\n+ clone()' } }
          ],
          edges: [
            { id: 'e1', source: 'client', target: 'prototype', label: 'uses' },
            { id: 'e2', source: 'concProto1', target: 'prototype' },
            { id: 'e3', source: 'concProto2', target: 'prototype' }
          ]
        },
        code: `import copy

class Prototype:
    def clone(self):
        return copy.deepcopy(self)

class ConcretePrototype(Prototype):
    def __init__(self, field):
        self.field = field

# Usage
p1 = ConcretePrototype([1, 2, 3])
p2 = p1.clone()
p2.field.append(4)
print(p1.field) # [1, 2, 3]
print(p2.field) # [1, 2, 3, 4]`,
        pros: [
          'You can clone objects without coupling to their concrete classes.',
          'You can get rid of repeated initialization code in favor of cloning pre-built prototypes.',
          'You can produce complex objects more conveniently.'
        ],
        cons: [
          'Cloning complex objects that have circular references might be very tricky.'
        ]
      }
    ]
  },
  // Placeholder for structural and behavioral
  structural: {
    id: 'structural',
    title: 'Structural Patterns',
    description: 'Ease the design by identifying a simple way to realize relationships between entities.',
    patterns: [
      {
        id: 'adapter',
        title: 'Adapter',
        type: 'Structural',
        summary: 'Allows objects with incompatible interfaces to collaborate.',
        problem: 'You have an existing class (Service) with a useful behavior, but its interface is incompatible with the rest of your code (Client). You can\'t change the Service code.',
        solution: 'Create an adapter class that wraps the Service object. The adapter implements the interface expected by the Client and delegates calls to the Service object, translating data as needed.',
        realWorldAnalogy: 'A power plug adapter. You have a US plug (Client) and a UK socket (Service). The adapter allows them to work together.',
        structure: {
          nodes: [
            { id: 'client', type: 'default', position: { x: 50, y: 100 }, data: { label: 'Client' } },
            { id: 'target', type: 'default', position: { x: 200, y: 50 }, data: { label: 'Target Interface' } },
            { id: 'adapter', type: 'default', position: { x: 200, y: 150 }, data: { label: 'Adapter' } },
            { id: 'adaptee', type: 'default', position: { x: 350, y: 150 }, data: { label: 'Adaptee' } }
          ],
          edges: [
            { id: 'e1', source: 'client', target: 'target', label: 'uses' },
            { id: 'e2', source: 'adapter', target: 'target' },
            { id: 'e3', source: 'adapter', target: 'adaptee', label: 'adapts' }
          ]
        },
        code: `class Target:
    def request(self):
        return "Target: The default target's behavior."

class Adaptee:
    def specific_request(self):
        return ".eetpadA eht fo roivaheb laicepS"

class Adapter(Target):
    def __init__(self, adaptee):
        self.adaptee = adaptee

    def request(self):
        return f"Adapter: (TRANSLATED) {self.adaptee.specific_request()[::-1]}"`,
        pros: [
          'Single Responsibility Principle. You can separate the interface or data conversion code from the primary business logic.',
          'Open/Closed Principle. You can introduce new types of adapters into the program without breaking the existing client code.'
        ],
        cons: [
          'The overall complexity of the code increases because you need to introduce a set of new interfaces and classes.'
        ]
      },
      {
        id: 'bridge',
        title: 'Bridge',
        type: 'Structural',
        summary: 'Split a large class or a set of closely related classes into two separate hierarchies—abstraction and implementation—which can be developed independently.',
        problem: 'You have a Shape class with subclasses Circle and Square. You want to extend this to support colors (Red, Blue). Inheritance leads to a Cartesian product: RedCircle, BlueCircle, RedSquare, BlueSquare. Adding a Triangle or Green color explodes the number of classes.',
        solution: 'Switch from inheritance to composition. Extract the color-related code into its own class hierarchy (Color). The Shape class then gets a reference to a Color object.',
        realWorldAnalogy: 'Remote controls and Devices. The Remote is the Abstraction, the Device (TV, Radio) is the Implementation. You can develop new remotes and new devices independently.',
        structure: {
          nodes: [
            { id: 'abstraction', type: 'default', position: { x: 100, y: 50 }, data: { label: 'Abstraction' } },
            { id: 'impl', type: 'default', position: { x: 300, y: 50 }, data: { label: 'Implementation' } },
            { id: 'refinedAbs', type: 'default', position: { x: 100, y: 150 }, data: { label: 'RefinedAbstraction' } },
            { id: 'concImpl', type: 'default', position: { x: 300, y: 150 }, data: { label: 'ConcreteImplementation' } }
          ],
          edges: [
            { id: 'e1', source: 'abstraction', target: 'impl', label: 'bridge' },
            { id: 'e2', source: 'refinedAbs', target: 'abstraction' },
            { id: 'e3', source: 'concImpl', target: 'impl' }
          ]
        },
        code: `class Abstraction:
    def __init__(self, implementation):
        self.implementation = implementation
    
    def operation(self):
        return f"Abstraction: Base operation with:\n{self.implementation.operation_implementation()}"

class Implementation(ABC):
    @abstractmethod
    def operation_implementation(self): pass

class ConcreteImplementationA(Implementation):
    def operation_implementation(self):
        return "ConcreteImplementationA: Here's the result on the platform A."`,
        pros: [
          'You can create platform-independent classes and apps.',
          'Client code works with high-level abstractions. It isn’t exposed to the platform details.',
          'Open/Closed Principle.',
          'Single Responsibility Principle.'
        ],
        cons: [
          'You might make the code more complicated by applying the pattern to a highly cohesive class.'
        ]
      },
      {
        id: 'composite',
        title: 'Composite',
        type: 'Structural',
        summary: 'Compose objects into tree structures and then work with these structures as if they were individual objects.',
        problem: 'You have a structure of objects that can be represented as a tree (e.g., Orders containing Boxes, Boxes containing Products or other Boxes). You want to calculate the total price. Iterating over all items is complex because you need to know the classes and nesting.',
        solution: 'Use a common interface for both simple elements (Leaves) and containers (Composites). The container delegates the work to its children and aggregates the results.',
        realWorldAnalogy: 'An army structure. General -> Colonels -> Majors -> Captains -> Soldiers. The General gives an order, which cascades down. The General doesn\'t need to know the details of every soldier.',
        structure: {
          nodes: [
            { id: 'component', type: 'default', position: { x: 200, y: 50 }, data: { label: 'Component\n+ execute()' } },
            { id: 'leaf', type: 'default', position: { x: 100, y: 150 }, data: { label: 'Leaf' } },
            { id: 'composite', type: 'default', position: { x: 300, y: 150 }, data: { label: 'Composite\n+ add()\n+ remove()\n+ getChildren()' } }
          ],
          edges: [
            { id: 'e1', source: 'leaf', target: 'component' },
            { id: 'e2', source: 'composite', target: 'component' },
            { id: 'e3', source: 'composite', target: 'component', label: 'children', type: 'step', style: { strokeDasharray: '5,5' } }
          ]
        },
        code: `class Component(ABC):
    @abstractmethod
    def operation(self): pass

class Leaf(Component):
    def operation(self): return "Leaf"

class Composite(Component):
    def __init__(self): self._children = []
    def add(self, component): self._children.append(component)
    def operation(self):
        results = [child.operation() for child in self._children]
        return f"Branch({'+'.join(results)})"`,
        pros: [
          'You can work with complex tree structures more conveniently: use polymorphism and recursion.',
          'Open/Closed Principle. You can introduce new element types into the app without breaking the existing code.'
        ],
        cons: [
          'It might be difficult to provide a common interface for classes whose functionality differs too much.'
        ]
      },
      {
        id: 'decorator',
        title: 'Decorator',
        type: 'Structural',
        summary: 'Attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.',
        problem: 'You want to add features to an object (e.g., send email notification) but inheritance is static and you can\'t inherit from multiple classes (e.g., EmailAndSMSAndSlackNotification).',
        solution: 'Use composition. Create a wrapper (Decorator) that implements the same interface as the wrapped object. The wrapper adds its own behavior before or after delegating to the wrapped object.',
        realWorldAnalogy: 'Wearing clothes. You are the object. You can wear a shirt (Decorator), then a jacket (Decorator), then a raincoat (Decorator). You gain the properties of all layers.',
        structure: {
          nodes: [
            { id: 'component', type: 'default', position: { x: 200, y: 50 }, data: { label: 'Component' } },
            { id: 'concComp', type: 'default', position: { x: 100, y: 150 }, data: { label: 'ConcreteComponent' } },
            { id: 'decorator', type: 'default', position: { x: 300, y: 150 }, data: { label: 'Decorator' } },
            { id: 'concDec', type: 'default', position: { x: 300, y: 250 }, data: { label: 'ConcreteDecorator' } }
          ],
          edges: [
            { id: 'e1', source: 'concComp', target: 'component' },
            { id: 'e2', source: 'decorator', target: 'component' },
            { id: 'e3', source: 'concDec', target: 'decorator' },
            { id: 'e4', source: 'decorator', target: 'component', label: 'wraps', style: { strokeDasharray: '5,5' } }
          ]
        },
        code: `class Component(ABC):
    @abstractmethod
    def operation(self): pass

class ConcreteComponent(Component):
    def operation(self): return "ConcreteComponent"

class Decorator(Component):
    def __init__(self, component): self._component = component
    def operation(self): return self._component.operation()

class ConcreteDecoratorA(Decorator):
    def operation(self):
        return f"ConcreteDecoratorA({self.component.operation()})"`,
        pros: [
          'You can extend an object’s behavior without making a new subclass.',
          'You can add or remove responsibilities from an object at runtime.',
          'You can combine several behaviors by wrapping an object into multiple decorators.',
          'Single Responsibility Principle.'
        ],
        cons: [
          'It’s hard to remove a specific wrapper from the wrappers stack.',
          'It’s hard to implement a decorator in such a way that its behavior doesn’t depend on the order in the decorators stack.'
        ]
      },
      {
        id: 'facade',
        title: 'Facade',
        type: 'Structural',
        summary: 'Provide a simplified interface to a library, a framework, or any other complex set of classes.',
        problem: 'Your code needs to work with a complex library that has dozens of classes. You need to initialize them, track dependencies, and execute methods in the correct order. Your business logic becomes tightly coupled to the library details.',
        solution: 'Create a Facade class that provides a simple interface to the complex subsystem. It handles the initialization and delegation.',
        realWorldAnalogy: 'Placing an order by phone. You call customer service (Facade). The operator talks to the warehouse, payment system, and delivery service for you. You don\'t need to call them individually.',
        structure: {
          nodes: [
            { id: 'client', type: 'default', position: { x: 50, y: 100 }, data: { label: 'Client' } },
            { id: 'facade', type: 'default', position: { x: 200, y: 100 }, data: { label: 'Facade' } },
            { id: 'sub1', type: 'default', position: { x: 350, y: 50 }, data: { label: 'SubsystemA' } },
            { id: 'sub2', type: 'default', position: { x: 350, y: 100 }, data: { label: 'SubsystemB' } },
            { id: 'sub3', type: 'default', position: { x: 350, y: 150 }, data: { label: 'SubsystemC' } }
          ],
          edges: [
            { id: 'e1', source: 'client', target: 'facade', label: 'uses' },
            { id: 'e2', source: 'facade', target: 'sub1' },
            { id: 'e3', source: 'facade', target: 'sub2' },
            { id: 'e4', source: 'facade', target: 'sub3' }
          ]
        },
        code: `class Facade:
    def __init__(self, subsystem1, subsystem2):
        self._subsystem1 = subsystem1 or Subsystem1()
        self._subsystem2 = subsystem2 or Subsystem2()

    def operation(self):
        results = []
        results.append("Facade initializes subsystems:")
        results.append(self._subsystem1.operation1())
        results.append(self._subsystem2.operation1())
        return "\n".join(results)`,
        pros: [
          'You can isolate your code from the complexity of a subsystem.'
        ],
        cons: [
          'A facade can become a god object coupled to all classes of an app.'
        ]
      },
      {
        id: 'flyweight',
        title: 'Flyweight',
        type: 'Structural',
        summary: 'Let you fit more objects into the available amount of RAM by sharing common parts of state between multiple objects.',
        problem: 'You are creating a game with millions of particles (bullets, missiles, shrapnel). Each particle object stores its coordinates, vector, speed, AND a heavy sprite image. The RAM runs out because the sprite is duplicated millions of times.',
        solution: 'Separate the intrinsic state (shared, read-only, e.g., sprite) from the extrinsic state (unique, e.g., coordinates). Store the intrinsic state in a Flyweight object and share it.',
        realWorldAnalogy: 'Library books. The library has one copy of a book (Flyweight). Many people (Contexts) can read it. The state "who is reading it right now" is extrinsic.',
        structure: {
          nodes: [
            { id: 'client', type: 'default', position: { x: 50, y: 100 }, data: { label: 'Client' } },
            { id: 'flyweightFactory', type: 'default', position: { x: 200, y: 50 }, data: { label: 'FlyweightFactory' } },
            { id: 'flyweight', type: 'default', position: { x: 350, y: 100 }, data: { label: 'Flyweight' } },
            { id: 'context', type: 'default', position: { x: 200, y: 150 }, data: { label: 'Context' } }
          ],
          edges: [
            { id: 'e1', source: 'client', target: 'flyweightFactory' },
            { id: 'e2', source: 'flyweightFactory', target: 'flyweight', label: 'manages' },
            { id: 'e3', source: 'context', target: 'flyweight', label: 'references' }
          ]
        },
        code: `class Flyweight:
    def __init__(self, shared_state):
        self._shared_state = shared_state
    def operation(self, unique_state):
        s = json.dumps(self._shared_state)
        u = json.dumps(unique_state)
        print(f"Flyweight: Displaying shared ({s}) and unique ({u}) state.")

class FlyweightFactory:
    _flyweights = {}
    def __init__(self, initial_flyweights):
        for state in initial_flyweights:
            self._flyweights[self.get_key(state)] = Flyweight(state)
    def get_flyweight(self, shared_state):
        key = self.get_key(shared_state)
        if not self._flyweights.get(key):
            self._flyweights[key] = Flyweight(shared_state)
        return self._flyweights[key]`,
        pros: [
          'You can save lots of RAM, assuming your program has tons of similar objects.'
        ],
        cons: [
          'You might be trading RAM over CPU cycles when some of the context data needs to be recalculated each time someone calls a flyweight method.',
          'The code becomes much more complicated.'
        ]
      },
      {
        id: 'proxy',
        title: 'Proxy',
        type: 'Structural',
        summary: 'Provide a substitute or placeholder for another object.',
        problem: 'You have a massive object that consumes a lot of system resources. You need it only from time to time, but it\'s always created at startup, slowing everything down.',
        solution: 'Create a proxy class with the same interface as the original service object. The proxy receives client requests, creates the real service object only when needed (lazy initialization), and delegates the work.',
        realWorldAnalogy: 'Credit card. It\'s a proxy for a bundle of cash. You can use it to pay, and the money is moved later.',
        structure: {
          nodes: [
            { id: 'client', type: 'default', position: { x: 50, y: 100 }, data: { label: 'Client' } },
            { id: 'subject', type: 'default', position: { x: 200, y: 50 }, data: { label: 'Subject Interface' } },
            { id: 'proxy', type: 'default', position: { x: 200, y: 150 }, data: { label: 'Proxy' } },
            { id: 'realSubject', type: 'default', position: { x: 350, y: 150 }, data: { label: 'RealSubject' } }
          ],
          edges: [
            { id: 'e1', source: 'client', target: 'subject' },
            { id: 'e2', source: 'proxy', target: 'subject' },
            { id: 'e3', source: 'realSubject', target: 'subject' },
            { id: 'e4', source: 'proxy', target: 'realSubject', label: 'controls' }
          ]
        },
        code: `class Subject(ABC):
    @abstractmethod
    def request(self): pass

class RealSubject(Subject):
    def request(self): print("RealSubject: Handling request.")

class Proxy(Subject):
    def __init__(self, real_subject):
        self._real_subject = real_subject
    def request(self):
        if self.check_access():
            self._real_subject.request()
            self.log_access()`,
        pros: [
          'You can control the service object without clients knowing about it.',
          'You can manage the lifecycle of the service object when clients don’t care about it.',
          'The proxy works even if the service object isn’t ready or is not available.',
          'Open/Closed Principle.'
        ],
        cons: [
          'The code may become more complicated since you need to introduce a lot of new classes.',
          'The response from the service might get delayed.'
        ]
      }
    ] 
  },
  behavioral: {
    id: 'behavioral',
    title: 'Behavioral Patterns',
    description: 'Identify common communication patterns between objects and realize these patterns.',
    patterns: [
      {
        id: 'chain-of-responsibility',
        title: 'Chain of Responsibility',
        type: 'Behavioral',
        summary: 'Pass requests along a chain of handlers.',
        problem: 'You have a request (e.g., HTTP request) that needs to pass through multiple checks (Auth, Logging, Validation, Caching). Coupling the code that sends the request to the code that processes it is bad.',
        solution: 'Transform particular behaviors into stand-alone objects called handlers. Link these handlers into a chain. Each handler decides either to process the request or to pass it to the next handler in the chain.',
        realWorldAnalogy: 'Tech support. Tier 1 support handles simple issues. If they can\'t, they pass it to Tier 2. If Tier 2 can\'t, they pass it to Tier 3 (Engineers).',
        structure: {
          nodes: [
            { id: 'client', type: 'default', position: { x: 50, y: 100 }, data: { label: 'Client' } },
            { id: 'handler', type: 'default', position: { x: 200, y: 50 }, data: { label: 'Handler\n+ setNext()\n+ handle()' } },
            { id: 'h1', type: 'default', position: { x: 200, y: 150 }, data: { label: 'ConcreteHandler1' } },
            { id: 'h2', type: 'default', position: { x: 350, y: 150 }, data: { label: 'ConcreteHandler2' } }
          ],
          edges: [
            { id: 'e1', source: 'client', target: 'h1' },
            { id: 'e2', source: 'h1', target: 'handler' },
            { id: 'e3', source: 'h1', target: 'h2', label: 'next' }
          ]
        },
        code: `class Handler(ABC):
    @abstractmethod
    def set_next(self, handler): pass
    @abstractmethod
    def handle(self, request): pass

class AbstractHandler(Handler):
    _next_handler = None
    def set_next(self, handler):
        self._next_handler = handler
        return handler
    def handle(self, request):
        if self._next_handler:
            return self._next_handler.handle(request)
        return None

class MonkeyHandler(AbstractHandler):
    def handle(self, request):
        if request == "Banana":
            return f"Monkey: I'll eat the {request}"
        return super().handle(request)`,
        pros: [
          'You can control the order of request handling.',
          'Single Responsibility Principle.',
          'Open/Closed Principle.'
        ],
        cons: [
          'Some requests may end up unhandled.'
        ]
      },
      {
        id: 'command',
        title: 'Command',
        type: 'Behavioral',
        summary: 'Turn a request into a stand-alone object that contains all information about the request.',
        problem: 'You want to create a GUI with buttons. A "Save" button needs to save text. A "Copy" button needs to copy text. You don\'t want to create a subclass of Button for every operation.',
        solution: 'Encapsulate the request details (object, method, arguments) into a separate Command class. The Button just triggers the Command.execute() method.',
        realWorldAnalogy: 'Ordering at a restaurant. You (Client) give an order (Command) to the waiter (Invoker). The waiter places the order on the wall. The chef (Receiver) picks it up and cooks it.',
        structure: {
          nodes: [
            { id: 'invoker', type: 'default', position: { x: 100, y: 100 }, data: { label: 'Invoker' } },
            { id: 'command', type: 'default', position: { x: 250, y: 50 }, data: { label: 'Command\n+ execute()' } },
            { id: 'concCmd', type: 'default', position: { x: 250, y: 150 }, data: { label: 'ConcreteCommand' } },
            { id: 'receiver', type: 'default', position: { x: 400, y: 150 }, data: { label: 'Receiver' } }
          ],
          edges: [
            { id: 'e1', source: 'invoker', target: 'command', label: 'calls' },
            { id: 'e2', source: 'concCmd', target: 'command' },
            { id: 'e3', source: 'concCmd', target: 'receiver', label: 'calls' }
          ]
        },
        code: `class Command(ABC):
    @abstractmethod
    def execute(self): pass

class SimpleCommand(Command):
    def __init__(self, payload): self._payload = payload
    def execute(self): print(f"SimpleCommand: {self._payload}")

class Invoker:
    _on_start = None
    def set_on_start(self, command): self._on_start = command
    def do_something_important(self):
        if isinstance(self._on_start, Command):
            self._on_start.execute()`,
        pros: [
          'Single Responsibility Principle.',
          'Open/Closed Principle.',
          'You can implement undo/redo.',
          'You can implement deferred execution of operations.'
        ],
        cons: [
          'The code may become more complicated since you need to introduce a lot of new classes.'
        ]
      },
      {
        id: 'iterator',
        title: 'Iterator',
        type: 'Behavioral',
        summary: 'Traverse elements of a collection without exposing its underlying representation.',
        problem: 'Collections can be complex (List, Stack, Tree, Graph). Clients want to traverse them but shouldn\'t care about how they store data. Adding traversal algorithms to the collection bloats it.',
        solution: 'Extract the traversal behavior of a collection into a separate object called an iterator.',
        realWorldAnalogy: 'Tourists in Rome. You can walk randomly, use a guide (Iterator), or use a map (Iterator). The city (Collection) remains the same, but the traversal method differs.',
        structure: {
          nodes: [
            { id: 'client', type: 'default', position: { x: 50, y: 100 }, data: { label: 'Client' } },
            { id: 'iterator', type: 'default', position: { x: 200, y: 50 }, data: { label: 'Iterator\n+ getNext()\n+ hasMore()' } },
            { id: 'iterable', type: 'default', position: { x: 200, y: 150 }, data: { label: 'Iterable\n+ createIterator()' } }
          ],
          edges: [
            { id: 'e1', source: 'client', target: 'iterator', label: 'uses' },
            { id: 'e2', source: 'client', target: 'iterable', label: 'uses' },
            { id: 'e3', source: 'iterable', target: 'iterator', label: 'creates' }
          ]
        },
        code: `class AlphabeticalOrderIterator(Iterator):
    _position: int = None
    _reverse: bool = False

    def __init__(self, collection, reverse=False):
        self._collection = collection
        self._reverse = reverse
        self._position = -1 if reverse else 0

    def __next__(self):
        try:
            value = self._collection[self._position]
            self._position += -1 if self._reverse else 1
            return value
        except IndexError:
            raise StopIteration()`,
        pros: [
          'Single Responsibility Principle.',
          'Open/Closed Principle.',
          'You can iterate over the same collection in parallel because each iterator object contains its own iteration state.'
        ],
        cons: [
          'Applying the pattern can be an overkill if your app only works with simple collections.'
        ]
      },
      {
        id: 'mediator',
        title: 'Mediator',
        type: 'Behavioral',
        summary: 'Reduce chaotic dependencies between objects. The pattern restricts direct communications between the objects and forces them to collaborate only via a mediator object.',
        problem: 'A dialog box with many controls (Checkbox, Button, Textbox). If Checkbox is checked, Textbox is enabled. If Button is clicked, validate Textbox. All elements become coupled.',
        solution: 'Create a Mediator class (the Dialog). All controls communicate only with the Mediator. The Mediator handles the logic.',
        realWorldAnalogy: 'Air Traffic Control. Pilots (Components) don\'t talk to each other. They talk to the Tower (Mediator).',
        structure: {
          nodes: [
            { id: 'mediator', type: 'default', position: { x: 200, y: 50 }, data: { label: 'Mediator\n+ notify()' } },
            { id: 'c1', type: 'default', position: { x: 100, y: 150 }, data: { label: 'Component1' } },
            { id: 'c2', type: 'default', position: { x: 300, y: 150 }, data: { label: 'Component2' } }
          ],
          edges: [
            { id: 'e1', source: 'c1', target: 'mediator' },
            { id: 'e2', source: 'c2', target: 'mediator' }
          ]
        },
        code: `class Mediator(ABC):
    def notify(self, sender, event): pass

class ConcreteMediator(Mediator):
    def __init__(self, c1, c2):
        self._c1 = c1
        self._c1.mediator = self
        self._c2 = c2
        self._c2.mediator = self

    def notify(self, sender, event):
        if event == "A":
            print("Mediator reacts on A and triggers following operations:")
            self._c2.do_c()`,
        pros: [
          'Single Responsibility Principle.',
          'Open/Closed Principle.',
          'You can reduce coupling between various components of a program.'
        ],
        cons: [
          'Over time a mediator can evolve into a God Object.'
        ]
      },
      {
        id: 'memento',
        title: 'Memento',
        type: 'Behavioral',
        summary: 'Capture and restore an object\'s internal state without violating encapsulation.',
        problem: 'You want to implement Undo. You need to save the state of an object. But the object has private fields that you can\'t access from outside.',
        solution: 'Delegate creating the state snapshot to the actual owner of that state, the originator object. The snapshot is a Memento object.',
        realWorldAnalogy: 'Save points in games. You save the game state (Memento). Later you can reload it.',
        structure: {
          nodes: [
            { id: 'caretaker', type: 'default', position: { x: 50, y: 100 }, data: { label: 'Caretaker' } },
            { id: 'originator', type: 'default', position: { x: 200, y: 100 }, data: { label: 'Originator\n+ save()\n+ restore()' } },
            { id: 'memento', type: 'default', position: { x: 350, y: 100 }, data: { label: 'Memento' } }
          ],
          edges: [
            { id: 'e1', source: 'caretaker', target: 'originator', label: 'do something' },
            { id: 'e2', source: 'caretaker', target: 'memento', label: 'keeps' },
            { id: 'e3', source: 'originator', target: 'memento', label: 'creates' }
          ]
        },
        code: `class Memento:
    def __init__(self, state): self._state = state
    def get_state(self): return self._state

class Originator:
    _state = None
    def save(self): return Memento(self._state)
    def restore(self, memento): self._state = memento.get_state()

class Caretaker:
    def __init__(self, originator):
        self._mementos = []
        self._originator = originator
    def backup(self): self._mementos.append(self._originator.save())
    def undo(self):
        if not self._mementos: return
        memento = self._mementos.pop()
        self._originator.restore(memento)`,
        pros: [
          'You can produce snapshots of the object’s state without violating its encapsulation.',
          'You can simplify the originator’s structure by letting the caretaker maintain the history of the originator’s life cycle.'
        ],
        cons: [
          'The app might consume lots of RAM if clients create mementos too often.',
          'Caretakers need to track the originator’s lifecycle to be able to destroy obsolete mementos.'
        ]
      },
      {
        id: 'observer',
        title: 'Observer',
        type: 'Behavioral',
        summary: 'Define a subscription mechanism to notify multiple objects about any events that happen to the object they’re observing.',
        problem: 'You have a Customer and a Store. The Customer wants to know when a product is in stock. Polling (checking every 5 mins) is inefficient. Spamming all customers is annoying.',
        solution: 'The object that has some interesting state is often called subject. All other objects that want to track changes to the subject\'s state are called subscribers.',
        realWorldAnalogy: 'Newspaper subscription. You subscribe, and they deliver the paper when it\'s ready. You don\'t go to the office every day to check.',
        structure: {
          nodes: [
            { id: 'publisher', type: 'default', position: { x: 100, y: 50 }, data: { label: 'Publisher\n+ subscribe()\n+ unsubscribe()\n+ notify()' } },
            { id: 'subscriber', type: 'default', position: { x: 300, y: 50 }, data: { label: 'Subscriber\n+ update()' } },
            { id: 'concSub', type: 'default', position: { x: 300, y: 150 }, data: { label: 'ConcreteSubscriber' } }
          ],
          edges: [
            { id: 'e1', source: 'publisher', target: 'subscriber', label: 'notifies' },
            { id: 'e2', source: 'concSub', target: 'subscriber' }
          ]
        },
        code: `class Subject(ABC):
    @abstractmethod
    def attach(self, observer): pass
    @abstractmethod
    def detach(self, observer): pass
    @abstractmethod
    def notify(self): pass

class ConcreteSubject(Subject):
    _state: int = None
    _observers: List[Observer] = []
    def attach(self, observer): self._observers.append(observer)
    def detach(self, observer): self._observers.remove(observer)
    def notify(self):
        for observer in self._observers: observer.update(self)

class Observer(ABC):
    @abstractmethod
    def update(self, subject): pass`,
        pros: [
          'Open/Closed Principle.',
          'You can establish relations between objects at runtime.'
        ],
        cons: [
          'Subscribers are notified in random order.'
        ]
      },
      {
        id: 'state',
        title: 'State',
        type: 'Behavioral',
        summary: 'Let an object alter its behavior when its internal state changes. It appears as if the object changed its class.',
        problem: 'A Document object can be in Draft, Moderation, or Published state. The publish() method behaves differently in each state. Huge switch statements are hard to maintain.',
        solution: 'Create separate classes for each state. The Document object delegates the work to a state object.',
        realWorldAnalogy: 'Your smartphone. When unlocked, buttons type text. When locked, buttons might take a photo or do nothing.',
        structure: {
          nodes: [
            { id: 'context', type: 'default', position: { x: 100, y: 100 }, data: { label: 'Context\n+ request()' } },
            { id: 'state', type: 'default', position: { x: 300, y: 50 }, data: { label: 'State\n+ handle()' } },
            { id: 's1', type: 'default', position: { x: 250, y: 150 }, data: { label: 'ConcreteStateA' } },
            { id: 's2', type: 'default', position: { x: 350, y: 150 }, data: { label: 'ConcreteStateB' } }
          ],
          edges: [
            { id: 'e1', source: 'context', target: 'state', label: 'defines' },
            { id: 'e2', source: 's1', target: 'state' },
            { id: 'e3', source: 's2', target: 'state' }
          ]
        },
        code: `class State(ABC):
    @property
    def context(self): return self._context
    @context.setter
    def context(self, context): self._context = context
    @abstractmethod
    def handle1(self): pass

class Context:
    _state = None
    def __init__(self, state): self.transition_to(state)
    def transition_to(self, state):
        self._state = state
        self._state.context = self
    def request1(self): self._state.handle1()

class ConcreteStateA(State):
    def handle1(self):
        print("ConcreteStateA handles request1.")
        self.context.transition_to(ConcreteStateB())`,
        pros: [
          'Single Responsibility Principle.',
          'Open/Closed Principle.',
          'Simplify the code of the context by eliminating bulky state machine conditionals.'
        ],
        cons: [
          'Applying the pattern can be overkill if a state machine has only a few states or rarely changes.'
        ]
      },
      {
        id: 'strategy',
        title: 'Strategy',
        type: 'Behavioral',
        summary: 'Define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.',
        problem: 'A navigation app. You can route by Car, Walking, or Public Transport. Adding a new route type (Cyclist) requires changing the main Navigator class.',
        solution: 'Extract the routing algorithms into separate classes called strategies. The context (Navigator) holds a reference to a strategy and delegates the work.',
        realWorldAnalogy: 'Getting to the airport. You can take a bus, order a cab, or ride a bicycle. These are your strategies. You pick one based on budget or time.',
        structure: {
          nodes: [
            { id: 'context', type: 'default', position: { x: 100, y: 100 }, data: { label: 'Context' } },
            { id: 'strategy', type: 'default', position: { x: 300, y: 50 }, data: { label: 'Strategy\n+ execute()' } },
            { id: 's1', type: 'default', position: { x: 250, y: 150 }, data: { label: 'ConcreteStrategyA' } },
            { id: 's2', type: 'default', position: { x: 350, y: 150 }, data: { label: 'ConcreteStrategyB' } }
          ],
          edges: [
            { id: 'e1', source: 'context', target: 'strategy', label: 'uses' },
            { id: 'e2', source: 's1', target: 'strategy' },
            { id: 'e3', source: 's2', target: 'strategy' }
          ]
        },
        code: `class Strategy(ABC):
    @abstractmethod
    def do_algorithm(self, data): pass

class Context:
    def __init__(self, strategy): self._strategy = strategy
    @property
    def strategy(self): return self._strategy
    @strategy.setter
    def strategy(self, strategy): self._strategy = strategy
    def do_some_business_logic(self):
        result = self._strategy.do_algorithm(["a", "b", "c"])
        print(f"Context: Sorting data using strategy: {','.join(result)}")

class ConcreteStrategyA(Strategy):
    def do_algorithm(self, data): return sorted(data)`,
        pros: [
          'You can swap algorithms used inside an object at runtime.',
          'You can isolate the implementation details of an algorithm from the code that uses it.',
          'Open/Closed Principle.'
        ],
        cons: [
          'If you only have a couple of algorithms and they rarely change, there’s no real reason to overcomplicate the program with new classes and interfaces.',
          'Clients must be aware of the differences between strategies to be able to select a proper one.'
        ]
      },
      {
        id: 'template-method',
        title: 'Template Method',
        type: 'Behavioral',
        summary: 'Define the skeleton of an algorithm in the superclass but let subclasses override specific steps of the algorithm without changing its structure.',
        problem: 'You have a DataMiner app that mines PDF, DOC, and CSV. The steps are: openFile(), extractData(), parseData(), closeFile(). open/close/extract are similar, but parse is different.',
        solution: 'Create a base class with a template method that calls the steps. Steps can be abstract or have default implementations.',
        realWorldAnalogy: 'Building a house. Build foundation, build walls, build roof. A "Wooden House" and "Glass House" follow the same steps but implementation differs.',
        structure: {
          nodes: [
            { id: 'abstract', type: 'default', position: { x: 200, y: 50 }, data: { label: 'AbstractClass\n+ templateMethod()\n+ step1()\n+ step2()' } },
            { id: 'c1', type: 'default', position: { x: 100, y: 150 }, data: { label: 'ConcreteClass1' } },
            { id: 'c2', type: 'default', position: { x: 300, y: 150 }, data: { label: 'ConcreteClass2' } }
          ],
          edges: [
            { id: 'e1', source: 'c1', target: 'abstract' },
            { id: 'e2', source: 'c2', target: 'abstract' }
          ]
        },
        code: `class AbstractClass(ABC):
    def template_method(self):
        self.base_operation1()
        self.required_operations1()
        self.base_operation2()
        self.hook1()

    def base_operation1(self): print("AbstractClass says: I am doing the bulk of the work")
    def base_operation2(self): print("AbstractClass says: But I let subclasses override some operations")
    @abstractmethod
    def required_operations1(self): pass
    def hook1(self): pass

class ConcreteClass1(AbstractClass):
    def required_operations1(self): print("ConcreteClass1 says: Implemented Operation1")`,
        pros: [
          'You can let clients override only certain parts of a large algorithm, making them less affected by changes that happen to other parts of the algorithm.',
          'You can pull the duplicate code into a superclass.'
        ],
        cons: [
          'Some clients may be limited by the provided skeleton of an algorithm.',
          'You might violate the Liskov Substitution Principle by suppressing a default step implementation via a subclass.'
        ]
      },
      {
        id: 'visitor',
        title: 'Visitor',
        type: 'Behavioral',
        summary: 'Separate algorithms from the objects on which they operate.',
        problem: 'You have a graph of nodes (City, Industry, SightSeeing). You want to export it to XML. You don\'t want to add exportToXML() to every node class.',
        solution: 'Create a Visitor interface with methods like visitCity(City), visitIndustry(Industry). The nodes accept the visitor and call the appropriate method.',
        realWorldAnalogy: 'Insurance agent. He visits a house, a factory, a shop. He does different things (sells different policies) depending on the building type.',
        structure: {
          nodes: [
            { id: 'visitor', type: 'default', position: { x: 300, y: 50 }, data: { label: 'Visitor\n+ visitA()\n+ visitB()' } },
            { id: 'element', type: 'default', position: { x: 100, y: 50 }, data: { label: 'Element\n+ accept(v)' } },
            { id: 'concElA', type: 'default', position: { x: 50, y: 150 }, data: { label: 'ConcreteElementA' } },
            { id: 'concElB', type: 'default', position: { x: 150, y: 150 }, data: { label: 'ConcreteElementB' } }
          ],
          edges: [
            { id: 'e1', source: 'concElA', target: 'element' },
            { id: 'e2', source: 'concElB', target: 'element' },
            { id: 'e3', source: 'element', target: 'visitor', label: 'accepts' }
          ]
        },
        code: `class Component(ABC):
    @abstractmethod
    def accept(self, visitor): pass

class ConcreteComponentA(Component):
    def accept(self, visitor): visitor.visit_concrete_component_a(self)
    def exclusive_method_of_concrete_component_a(self): return "A"

class Visitor(ABC):
    @abstractmethod
    def visit_concrete_component_a(self, element): pass
    @abstractmethod
    def visit_concrete_component_b(self, element): pass

class ConcreteVisitor1(Visitor):
    def visit_concrete_component_a(self, element):
        print(f"{element.exclusive_method_of_concrete_component_a()} + ConcreteVisitor1")`,
        pros: [
          'Open/Closed Principle. You can introduce a new behavior that can work with objects of different classes without changing these classes.',
          'Single Responsibility Principle. You can move multiple versions of the same behavior into the same class.'
        ],
        cons: [
          'You need to update all visitors each time a class is added to or removed from the element hierarchy.',
          'Visitors might lack the necessary access to the private fields and methods of the elements that they’re supposed to work with.'
        ]
      }
    ]
  }
};
