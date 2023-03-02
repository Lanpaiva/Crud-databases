const mysql = require('mysql');

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senha',
    database: 'nome_do_banco_de_dados'
});

// Conexão com o banco de dados
connection.connect();

// CREATE
const create = (table, data, callback) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (error, results) => {
        if (error) throw error;
        callback(results.insertId);
    });
}

// READ
const read = (table, id, callback) => {
    connection.query(`SELECT * FROM ${table} WHERE id = ?`, id, (error, results) => {
        if (error) throw error;
        callback(results[0]);
    });
}

// UPDATE
const update = (table, id, data, callback) => {
    connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, id], (error, results) => {
        if (error) throw error;
        callback();
    });
}

// DELETE
const remove = (table, id, callback) => {
    connection.query(`DELETE FROM ${table} WHERE id = ?`, id, (error, results) => {
        if (error) throw error;
        callback();
    });
}

// Exemplo de uso
create('users', { name: 'fulano', email: 'fulano@example.com' }, (id) => {
    console.log(`Usuário criado com id ${id}`);
});

read('users', 1, (user) => {
    console.log(`Usuário com id 1: ${JSON.stringify(user)}`);
});

update('users', 1, { name: 'fulano', email: 'fulano@example.com' }, () => {
    console.log(`Usuário com id 1 atualizado`);
});

remove('users', 1, () => {
    console.log(`Usuário com id 1 removido`);
});

// Encerramento da conexão com o banco de dados
connection.end();
