const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use('/graphql', 
    graphqlHTTP({
        schema: '',
        rootValue: 'resolvers',
        graphiql: true
    })
)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
})