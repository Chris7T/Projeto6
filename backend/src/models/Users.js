const knex = require('../database/index');//Importando Knex para Acessar Banco de Dados

class User {
    //Registrar um usuario no BANCO DE DADOS
    async db_insert(request) {
        const result = await knex('user').insert(request.body)
        return result
    }
    //Entrar com um usuario
    async db_login(request) {
        const { email, password } = request.body;
        const result = await knex('user').first().where({email: email,password: password},function (err) { //(err, result)  
            if (err) throw err;
        });
        return result;
    }
    //Listando os usuarios
    async list() {
        const result = await knex('user',function (err) {  
            if (err) throw err;
        });
        return result;
    }
    //Atualização de senha do usuario
    async update_pass(request) {
        const { email, new_password} = request.body;
        const result = await knex('user').where('email', '=', email).update({ password: new_password })
        return result;
    }
    //Verificando se os dados "Unicos" já foram usados
    async exist(request){
        const { email, cpf, } = request.body;
        const result = await knex('user').first().where({email: email}).orWhere({cpf: cpf})
        return result;
    }
}
module.exports = User;//Exportando a Classe de Usuario
