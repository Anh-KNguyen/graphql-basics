import { GraphQLServer } from 'graphql-yoga'

// Type definitions (schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`

// Resolvers
const resolvers = {
    Query: {
        title() {
            return 'Dune'
        },
        price() {
            return 10.99
        },
        releaseYear() {
            return 2021
        },
        inStock() {
            return True
        },
        rating() {
            return null
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})