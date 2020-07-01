const axios = require('axios');
const express = require('express')
const expressGraphQL = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        personas: [Persona]
    },
  type Persona {
        id : Int,
        nombre: String,
        username: String,
        email: String
  }
`);

const getPersonas = new Promise( (resolve, reject) => {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(function (response) {
            resolve(response.data);
        })
});

const root = { 
    personas : async () => {
        return await getPersonas
    }
}


const app = express()
const port = 4000
app.use('/graphql', expressGraphQL({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

app.listen(port, () => console.log(`Servidor graphql corriendo en http://localhost:${port}/graphql`))


/*
    go to 
    http://localhost:4000/graphql

    query:

    { personas {
        id, 
        username
    } }

*/
