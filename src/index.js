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

const comments = [{
    id: '11',
    text: 'Awesome guide!',
    author: '1',
    post: '01'
}, {
    id: '12',
    text: 'Great Job!!',
    author: '2',
    post: '01'
}, {
    id: '13',
    text: 'Helped a ton!',
    author: '3',
    post: '02'
}, {
    id: '14',
    text: 'Thank you!',
    author: '1',
    post: '03'
}]

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }

`

// Resolvers
const resolvers = {
    Query: {
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
        comments(parent, args, ctx, info) {
            return comments
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
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })  
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post
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