const faunadb = require('faunadb');
const q = faunadb.query;

// Configuração da conexão com o banco de dados
const client = new faunadb.Client({ secret: 'seu_secret_aqui' });

// CREATE
const create = (collection, data) => {
    return client.query(
        q.Create(q.Collection(collection), { data })
    ).then(response => {
        return response.ref.id;
    });
}

// READ
const read = (collection, id) => {
    return client.query(
        q.Get(q.Ref(q.Collection(collection), id))
    ).then(response => {
        return response.data;
    });
}

// UPDATE
const update = (collection, id, data) => {
    return client.query(
        q.Update(q.Ref(q.Collection(collection), id), { data })
    );
}

// DELETE
const remove = (collection, id) => {
    return client.query(
        q.Delete(q.Ref(q.Collection(collection), id))
    );
}

// Exemplo de uso
create('users', { name: 'fulano', email: 'fulano@example.com' }).then(id => {
    console.log(`Usuário criado com id ${id}`);
});

read('users', '123').then(user => {
    console.log(`Usuário com id 123: ${JSON.stringify(user)}`);
});

update('users', '123', { name: 'fulano', email: 'fulano@example.com' }).then(() => {
    console.log(`Usuário com id 123 atualizado`);
});

remove('users', '123').then(() => {
    console.log(`Usuário com id 123 removido`);
});
