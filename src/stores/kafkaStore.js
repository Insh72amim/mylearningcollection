import { create } from 'zustand';

const useKafkaStore = create((set, get) => ({
  brokers: [
    { id: 'broker-1', name: 'Broker 1', partitions: [] },
    { id: 'broker-2', name: 'Broker 2', partitions: [] },
    { id: 'broker-3', name: 'Broker 3', partitions: [] },
  ],
  topics: [
    { name: 'user-events', partitionCount: 3, replicationFactor: 1 }
  ],
  messages: [],
  consumers: [
    { id: 'consumer-1', groupId: 'group-a', assignedPartitions: [] }
  ],
  
  // Actions
  addBroker: () => set((state) => ({
    brokers: [...state.brokers, { 
      id: `broker-${state.brokers.length + 1}`, 
      name: `Broker ${state.brokers.length + 1}`, 
      partitions: [] 
    }]
  })),

  produceMessage: (topicName, content) => {
    const state = get();
    const topic = state.topics.find(t => t.name === topicName);
    if (!topic) return;

    // Simple Round Robin for now
    const messageCount = state.messages.filter(m => m.topic === topicName).length;
    const partitionIndex = messageCount % topic.partitionCount;
    
    // Find which broker holds this partition (mock logic: partition N is on broker N % brokerCount)
    // In a real app, we'd map partitions to brokers explicitly.
    // For visualization, let's just say Partition 0 is on Broker 1, P1 on B2, etc.
    
    const newMessage = {
      id: `msg-${Date.now()}`,
      content,
      topic: topicName,
      partition: partitionIndex,
      offset: messageCount, // Simplified offset
      timestamp: Date.now()
    };

    set((state) => ({
      messages: [...state.messages, newMessage]
    }));
  },

  reset: () => set({ messages: [] })
}));

export default useKafkaStore;
