import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql

  # This type defines the queryable fields for every book in our data source.
  type Profile {
    name: String
    username: String
    email: String
    password: String
    phone: String
    location: String
  }

  type Userdata {
    userid: String
    # TODO
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Query {
    profiles: [Profile]
    userdata: [Userdata]
  }
`;



const profiles = [
    {
      name: 'John',
      username: 'john',
      email: 'john@abc.com',
      password: 'dwsadewfw323232231@##@',
      phone: '123456789',
      location: '123, 123',
    },
    {
      name: 'Bob',
      username: 'bob',
      email: 'bob@abc.com',
      password: 'w38732732&@%!@%#@',
      phone: '123456789',
      location: '456, 456',
    },
  ];


// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves profiles from the "profiles" array above.
const resolvers = {
    Query: {
      profiles: () => profiles,
    },
  };




// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);