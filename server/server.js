const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const bodyParser = require('body-parser')
const { buildSchema } = require('graphql')
const expressPlayground = require('graphql-playground-middleware-express').default
const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000

const app = express()

app.use(bodyParser.json())

app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

app.use('/graphql', 
    graphqlHTTP({
        schema: buildSchema(`
            type RootQuery {
                hello: String
            }

            type RootMutation {
                someMutation: String
            }

            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `),
        rootValue: {
            hello: () => {
                return 'Hello world'
            }
        },
        graphiql: true
    })
)

mongoose.connect(`mongodb+srv://graphqluser:testing123@cluster0.mvizr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Running on PORT ${PORT}`)
    })
}).catch((error) => {
    console.log(error)

})

