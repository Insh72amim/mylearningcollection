export const designPatterns = {
  creational: {
    id: 'creational',
    title: 'Creational Patterns',
    description: 'Deal with object creation mechanisms, trying to create objects in a manner suitable to the situation.',
    patterns: [
      {
        id: 'singleton',
        title: 'Singleton',
        description: 'Ensure a class has only one instance and provide a global point of access to it.',
        diagram: {
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

    @staticmethod
    def get_instance():
        if Singleton._instance is None:
            Singleton._instance = Singleton()
        return Singleton._instance`
      },
      {
        id: 'factory',
        title: 'Factory Method',
        description: 'Define an interface for creating an object, but let subclasses decide which class to instantiate.',
        code: `class Creator:
    def factory_method(self):
        pass

class ConcreteCreator(Creator):
    def factory_method(self):
        return ConcreteProduct()`
      },
      {
        id: 'builder',
        title: 'Builder',
        description: 'Separate the construction of a complex object from its representation.',
        code: `class Builder:
    def build_part_a(self): pass
    def build_part_b(self): pass
    def get_result(self): pass`
      }
    ]
  },
  structural: {
    id: 'structural',
    title: 'Structural Patterns',
    description: 'Ease the design by identifying a simple way to realize relationships between entities.',
    patterns: [
      {
        id: 'adapter',
        title: 'Adapter',
        description: 'Convert the interface of a class into another interface clients expect.',
        code: `class Adapter(Target):
    def __init__(self, adaptee):
        self.adaptee = adaptee
    
    def request(self):
        return self.adaptee.specific_request()`
      },
      {
        id: 'decorator',
        title: 'Decorator',
        description: 'Attach additional responsibilities to an object dynamically.',
        code: `class Decorator(Component):
    def __init__(self, component):
        self.component = component
    
    def operation(self):
        return f"Decorated {self.component.operation()}"`
      }
    ]
  },
  behavioral: {
    id: 'behavioral',
    title: 'Behavioral Patterns',
    description: 'Identify common communication patterns between objects and realize these patterns.',
    patterns: [
      {
        id: 'observer',
        title: 'Observer',
        description: 'Define a one-to-many dependency so that when one object changes state, all its dependents are notified.',
        code: `class Subject:
    def attach(self, observer): ...
    def notify(self):
        for observer in self._observers:
            observer.update()`
      },
      {
        id: 'strategy',
        title: 'Strategy',
        description: 'Define a family of algorithms, encapsulate each one, and make them interchangeable.',
        code: `class Context:
    def __init__(self, strategy):
        self.strategy = strategy
    
    def execute(self):
        return self.strategy.execute()`
      }
    ]
  }
};

export const lldExamples = [
  {
    id: 'elevator',
    title: 'Elevator System',
    difficulty: 'Medium',
    description: 'Design a control system for a building with M floors and N elevators.',
    requirements: [
      'Handle user requests (inside and outside elevator)',
      'Optimize for wait time or throughput',
      'Handle emergency states',
      'Scalable to multiple elevators'
    ],
    classes: [
      'ElevatorController', 'ElevatorCar', 'Request', 'Dispatcher', 'Door'
    ],
    code: `class ElevatorController:
    def __init__(self, num_elevators):
        self.elevators = [Elevator(i) for i in range(num_elevators)]
        self.dispatcher = Dispatcher(self.elevators)
    
    def handle_request(self, floor, direction):
        self.dispatcher.dispatch(floor, direction)`
  },
  {
    id: 'parking-lot',
    title: 'Parking Lot',
    difficulty: 'Easy',
    description: 'Design a parking lot management system.',
    requirements: [
      'Multiple floors and spot types (Compact, Large, Handicapped)',
      'Ticket issuance and payment calculation',
      'Real-time availability tracking',
      'Entry and exit gates'
    ],
    classes: [
      'ParkingLot', 'ParkingFloor', 'ParkingSpot', 'Ticket', 'Vehicle'
    ],
    code: `class ParkingLot:
    def park_vehicle(self, vehicle):
        spot = self.find_available_spot(vehicle.type)
        if spot:
            spot.occupy(vehicle)
            return Ticket(spot)`
  },
  {
    id: 'chess',
    title: 'Chess Game',
    difficulty: 'Hard',
    description: 'Design a multiplayer chess game.',
    requirements: [
      'Standard chess rules (move validation, checkmate, stalemate)',
      'Player history and stats',
      'Undo/Redo functionality',
      'Timer support'
    ],
    classes: [
      'Game', 'Board', 'Piece', 'Player', 'Move'
    ],
    code: `class Game:
    def make_move(self, start, end):
        piece = self.board.get_piece(start)
        if piece.can_move(self.board, end):
            piece.move(end)
            self.switch_turn()`
  }
];
