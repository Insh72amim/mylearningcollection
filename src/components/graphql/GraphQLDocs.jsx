import React from "react";
import CodeBlock from "../common/CodeBlock";

const GraphQLDocs = () => {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-4 text-white">
        GraphQL: The Deep Dive
      </h1>
      <p className="text-xl text-gray-300 mb-8">
        A query language for APIs and a runtime for fulfilling those queries
        with your existing data. GraphQL provides a complete and understandable
        description of the data in your API.
      </p>

      {/* What is GraphQL */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          What is GraphQL?
        </h2>
        <p className="text-gray-300 mb-4">
          GraphQL is a query language for APIs developed by Facebook in 2012 and
          open-sourced in 2015. Unlike REST, where you have multiple endpoints
          returning fixed data structures, GraphQL provides a single endpoint
          that allows clients to request exactly the data they need.
        </p>
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3 text-green-400">
            Key Benefits
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
              <strong>Precise Data Fetching:</strong> Request exactly what you
              need, nothing more
            </li>
            <li>
              <strong>Single Request:</strong> Get multiple resources in a
              single query
            </li>
            <li>
              <strong>Strongly Typed Schema:</strong> Self-documenting API with
              type safety
            </li>
            <li>
              <strong>No Over/Under-fetching:</strong> Eliminate the need for
              multiple endpoints
            </li>
            <li>
              <strong>Rapid Product Iteration:</strong> Add new fields and types
              without breaking existing queries
            </li>
          </ul>
        </div>
      </section>

      {/* Schema Definition */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          Schema Definition Language (SDL)
        </h2>
        <p className="text-gray-300 mb-4">
          GraphQL uses a schema to define the structure of your API. The schema
          is written in GraphQL Schema Definition Language (SDL).
        </p>

        <CodeBlock
          language="graphql"
          title="Basic Schema Example"
          code={`type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
  createdAt: DateTime!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  published: Boolean!
  tags: [String!]!
}

type Query {
  user(id: ID!): User
  users(limit: Int, offset: Int): [User!]!
  post(id: ID!): Post
  posts(authorId: ID): [Post!]!
}

type Mutation {
  createUser(name: String!, email: String!): User!
  updateUser(id: ID!, name: String, email: String): User!
  deleteUser(id: ID!): Boolean!
  createPost(title: String!, content: String!, authorId: ID!): Post!
}

type Subscription {
  postAdded: Post!
  userUpdated(id: ID!): User!
}`}
        />
      </section>

      {/* Queries */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">Queries</h2>
        <p className="text-gray-300 mb-4">
          Queries are used to fetch data from the server. You specify exactly
          which fields you want to retrieve.
        </p>

        <CodeBlock
          language="graphql"
          title="Query Examples"
          code={`# Simple query
query GetUser {
  user(id: "123") {
    id
    name
    email
  }
}

# Query with nested fields
query GetUserWithPosts {
  user(id: "123") {
    id
    name
    email
    posts {
      id
      title
      published
    }
  }
}

# Query with variables
query GetUser($userId: ID!) {
  user(id: $userId) {
    id
    name
    email
    posts {
      id
      title
    }
  }
}

# Query with aliases
query GetTwoUsers {
  firstUser: user(id: "1") {
    id
    name
  }
  secondUser: user(id: "2") {
    id
    name
  }
}

# Query with fragments
query GetUsers {
  user1: user(id: "1") {
    ...UserFields
  }
  user2: user(id: "2") {
    ...UserFields
  }
}

fragment UserFields on User {
  id
  name
  email
  createdAt
}`}
        />
      </section>

      {/* Mutations */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">Mutations</h2>
        <p className="text-gray-300 mb-4">
          Mutations are used to modify data on the server (create, update,
          delete operations).
        </p>

        <CodeBlock
          language="graphql"
          title="Mutation Examples"
          code={`# Create a new user
mutation CreateUser {
  createUser(name: "John Doe", email: "john@example.com") {
    id
    name
    email
    createdAt
  }
}

# Update a user with variables
mutation UpdateUser($userId: ID!, $name: String!) {
  updateUser(id: $userId, name: $name) {
    id
    name
    email
  }
}

# Multiple mutations in one request
mutation CreateUserAndPost($userName: String!, $userEmail: String!, $postTitle: String!) {
  newUser: createUser(name: $userName, email: $userEmail) {
    id
    name
  }
  newPost: createPost(title: $postTitle, content: "...", authorId: "123") {
    id
    title
  }
}`}
        />
      </section>

      {/* Subscriptions */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">Subscriptions</h2>
        <p className="text-gray-300 mb-4">
          Subscriptions allow clients to receive real-time updates when specific
          events occur on the server.
        </p>

        <CodeBlock
          language="graphql"
          title="Subscription Example"
          code={`# Subscribe to new posts
subscription OnPostAdded {
  postAdded {
    id
    title
    content
    author {
      name
    }
  }
}

# Subscribe to user updates
subscription OnUserUpdated($userId: ID!) {
  userUpdated(id: $userId) {
    id
    name
    email
  }
}`}
        />
      </section>

      {/* Resolvers */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">Resolvers</h2>
        <p className="text-gray-300 mb-4">
          Resolvers are functions that handle fetching the data for each field
          in your schema.
        </p>

        <CodeBlock
          language="javascript"
          title="Resolver Implementation (Node.js)"
          code={`const resolvers = {
  Query: {
    user: async (parent, { id }, context) => {
      return await context.db.user.findUnique({
        where: { id }
      });
    },
    users: async (parent, { limit = 10, offset = 0 }, context) => {
      return await context.db.user.findMany({
        take: limit,
        skip: offset
      });
    }
  },

  Mutation: {
    createUser: async (parent, { name, email }, context) => {
      return await context.db.user.create({
        data: { name, email }
      });
    },
    updateUser: async (parent, { id, name, email }, context) => {
      return await context.db.user.update({
        where: { id },
        data: { name, email }
      });
    }
  },

  User: {
    posts: async (parent, args, context) => {
      // This resolver is called when posts field is requested
      return await context.db.post.findMany({
        where: { authorId: parent.id }
      });
    }
  },

  Subscription: {
    postAdded: {
      subscribe: (parent, args, context) => {
        return context.pubsub.asyncIterator(['POST_ADDED']);
      }
    }
  }
};`}
        />
      </section>

      {/* DataLoader */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          DataLoader - Solving N+1 Problem
        </h2>
        <p className="text-gray-300 mb-4">
          DataLoader is a utility for batching and caching data fetches,
          preventing the N+1 query problem.
        </p>

        <CodeBlock
          language="javascript"
          title="DataLoader Example"
          code={`const DataLoader = require('dataloader');

// Create a batch loading function
const batchUsers = async (userIds) => {
  const users = await db.user.findMany({
    where: { id: { in: userIds } }
  });
  
  // Return users in the same order as requested
  return userIds.map(id => 
    users.find(user => user.id === id)
  );
};

// Create DataLoader instance
const userLoader = new DataLoader(batchUsers);

// Use in resolver
const resolvers = {
  Post: {
    author: (post, args, context) => {
      // Instead of fetching directly:
      // return db.user.findUnique({ where: { id: post.authorId } });
      
      // Use DataLoader for batching:
      return context.loaders.user.load(post.authorId);
    }
  }
};

// In context setup
const context = {
  loaders: {
    user: new DataLoader(batchUsers)
  }
};`}
        />
      </section>

      {/* Server Implementation */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          Server Implementation
        </h2>

        <CodeBlock
          language="javascript"
          title="Apollo Server Setup"
          code={`const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

// Define your schema
const typeDefs = \`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    user(id: ID!): User
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
\`;

// Define your resolvers
const resolvers = {
  Query: {
    user: (parent, { id }) => {
      return users.find(user => user.id === id);
    },
    users: () => users
  },
  Mutation: {
    createUser: (parent, { name, email }) => {
      const newUser = {
        id: String(users.length + 1),
        name,
        email
      };
      users.push(newUser);
      return newUser;
    }
  }
};

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => ({
    // Add context like database, auth, etc.
    db,
    user: await getUserFromToken(req.headers.authorization)
  })
});

console.log(\`🚀 Server ready at \${url}\`);`}
        />
      </section>

      {/* Client Implementation */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          Client Implementation
        </h2>

        <CodeBlock
          language="javascript"
          title="Apollo Client (React)"
          code={`import { ApolloClient, InMemoryCache, gql, useQuery, useMutation } from '@apollo/client';

// Create Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

// Define queries
const GET_USER = gql\`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
\`;

const CREATE_USER = gql\`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
\`;

// Use in React component
function UserProfile({ userId }) {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>{data.user.name}</h1>
      <p>{data.user.email}</p>
    </div>
  );
}

function CreateUserForm() {
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    createUser({
      variables: {
        name: formData.get('name'),
        email: formData.get('email'),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit" disabled={loading}>
        Create User
      </button>
      {error && <p>Error: {error.message}</p>}
      {data && <p>Created user: {data.createUser.name}</p>}
    </form>
  );
}`}
        />
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          Best Practices
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              1. Use Pagination
            </h3>
            <p className="text-gray-300 mb-3">
              Always implement pagination for list queries to avoid performance
              issues.
            </p>
            <CodeBlock
              language="graphql"
              code={`type Query {
  users(
    limit: Int = 10
    offset: Int = 0
  ): [User!]!
  
  # Or cursor-based pagination
  userConnection(
    first: Int
    after: String
  ): UserConnection!
}

type UserConnection {
  edges: [UserEdge!]!
  pageInfo: PageInfo!
}

type UserEdge {
  node: User!
  cursor: String!
}

type PageInfo {
  hasNextPage: Boolean!
  endCursor: String
}`}
            />
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              2. Input Types for Mutations
            </h3>
            <p className="text-gray-300 mb-3">
              Use input types to group mutation arguments for better
              organization.
            </p>
            <CodeBlock
              language="graphql"
              code={`input CreateUserInput {
  name: String!
  email: String!
  age: Int
}

input UpdateUserInput {
  name: String
  email: String
  age: Int
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
}`}
            />
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              3. Error Handling
            </h3>
            <p className="text-gray-300 mb-3">
              Implement proper error handling with custom error codes.
            </p>
            <CodeBlock
              language="javascript"
              code={`const { GraphQLError } = require('graphql');

const resolvers = {
  Query: {
    user: async (parent, { id }, context) => {
      const user = await context.db.user.findUnique({
        where: { id }
      });
      
      if (!user) {
        throw new GraphQLError('User not found', {
          extensions: {
            code: 'USER_NOT_FOUND',
            argumentName: 'id',
          },
        });
      }
      
      return user;
    }
  }
};`}
            />
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              4. Authentication & Authorization
            </h3>
            <CodeBlock
              language="javascript"
              code={`const resolvers = {
  Query: {
    me: (parent, args, context) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }
      return context.user;
    },
    
    adminData: (parent, args, context) => {
      if (!context.user?.isAdmin) {
        throw new GraphQLError('Not authorized', {
          extensions: { code: 'FORBIDDEN' }
        });
      }
      return getAdminData();
    }
  }
};`}
            />
          </div>
        </div>
      </section>

      {/* GraphQL vs REST */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          GraphQL vs REST
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-700 px-4 py-3 text-left text-white">
                  Aspect
                </th>
                <th className="border border-gray-700 px-4 py-3 text-left text-white">
                  GraphQL
                </th>
                <th className="border border-gray-700 px-4 py-3 text-left text-white">
                  REST
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr>
                <td className="border border-gray-700 px-4 py-3 font-semibold">
                  Endpoints
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  Single endpoint
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  Multiple endpoints
                </td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-3 font-semibold">
                  Data Fetching
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  Client specifies exact data needed
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  Server determines response structure
                </td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-3 font-semibold">
                  Over/Under-fetching
                </td>
                <td className="border border-gray-700 px-4 py-3">Eliminated</td>
                <td className="border border-gray-700 px-4 py-3">
                  Common problem
                </td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-3 font-semibold">
                  Versioning
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  Not needed (evolve schema)
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  Often requires API versions
                </td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-3 font-semibold">
                  Type System
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  Strongly typed
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  No built-in type system
                </td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-3 font-semibold">
                  Real-time
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  Built-in subscriptions
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  Requires WebSockets or SSE
                </td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-3 font-semibold">
                  Caching
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  More complex (normalized cache)
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  Simple (HTTP caching)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-3 font-semibold">
                  Learning Curve
                </td>
                <td className="border border-gray-700 px-4 py-3">Steeper</td>
                <td className="border border-gray-700 px-4 py-3">Gentler</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Common Tools */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          Popular GraphQL Tools
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-400">
              Apollo Server
            </h3>
            <p className="text-gray-300">
              Production-ready GraphQL server for Node.js
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-400">
              Apollo Client
            </h3>
            <p className="text-gray-300">
              Comprehensive state management library for JavaScript
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-400">
              GraphQL Yoga
            </h3>
            <p className="text-gray-300">
              Fully-featured GraphQL server with focus on easy setup
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-400">
              Hasura
            </h3>
            <p className="text-gray-300">
              Instant GraphQL APIs on your databases
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-400">
              Prisma
            </h3>
            <p className="text-gray-300">
              Next-generation ORM with GraphQL support
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-400">
              GraphQL Playground
            </h3>
            <p className="text-gray-300">
              Interactive IDE for exploring GraphQL APIs
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GraphQLDocs;
