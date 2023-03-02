const { MongoClient } = require('mongodb');

// Configuração da conexão com o banco de dados
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

// Conexão com o banco de dados
client.connect().then(() => {
    const db = client.db('nome_do_banco_de_dados');
    const collection = db.collection('nome_da_colecao');

    // CREATE
    const create = (data) => {
        return collection.insertOne(data).then(result => {
            return result.insertedId.toString();
        });
    }

    // READ
    const read = (id) => {
        return collection.findOne({ _id: new ObjectId(id) });
    }

    // UPDATE
    const update = (id, data) => {
        return collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
    }

    // DELETE
    const remove = (id) => {
        return collection.deleteOne({ _id: new ObjectId(id) })
    }
