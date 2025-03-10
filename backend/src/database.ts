import mysql from 'mysql2';
import dotenv from 'dotenv';


dotenv.config();



const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


connection.connect((err) => {
    if(err) {
        console.error('Erro ao conectar no banco de dados:', err, "Banco de Dados:", process.env.DB_NAME)
        console.log("Banco de Dados:", process.env.DB_NAME);
        return;
    }

    console.log('Conectado ao banco de dados com sucesso!')
});

export default connection;