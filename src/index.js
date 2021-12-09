import { GraphQLServer } from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Demo user data
const users = [{
    id: '1',
    name: 'Anh',
    email: 'anh@exmaple.com',
    age: 24
}, {
    id: '2',
    name: 'Kate',
    email: 'kate@example.com'
}, {
    id: '3',
    name: 'Kim',
    email: 'kim@example'
}
]

const posts = [{
    id: '01',
    title: 'Reboot Server',
    body: 'Before rebooting the server..',
    published: true,
    author: '1'
}, {
    id: '02',
    title: 'Shutting Down Server',
    body: 'Before shutting down server..',
    published: true,
    author: '1'
}, {
    id: '03',
    title: 'Starting Server',
    body: 'After starting up the server..',
    published: false,
    author: '3'
}
]

// Type definitions (schema)
const typeDefs = `
    type Query {
        greeting(name: String, position: String): String!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }
`

// Resolvers
const resolvers = {
    Query: {
        greeting(parent, args, ctx, info) {
            if (args.name && args.position) {
                return `Hello, ${args.name}! You are a great ${args.position}`
            } else {
                return 'Hello!'
            }
        },
        add(parent, args, ctx, info) {
            if (args.numbers.length == 0) {
                return 0
            }

            return args.numbers.reduce((accumulator, currentValue) => {
                return accumulator + currentValue
            })
        },
        grades(parent, args, ctx, info) {
            return [99, 80, 93]
        },
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }
            return posts.filter((posts) => {
                const isTitleMatch = posts.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = posts.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        },
        me() {
            return {
                id: '155',
                name: 'Mike',
                email: 'mike@example.com'
            }
        },
        post() {
            return {
                id: '0136',
                title: 'Reboot Server',
                body: 'Before restarting your server, please make sure..',
                published: true
            }
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
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