const knex = require('../database/index');

class Hospital {
    //Registrar um usuario no BANCO DE DADOS
    async db_insert(request,response) {
        await knex('hospital').insert(request.body,function (err) { 
            if (err) {
                return ({ error: 'register fails' });
            }
        }); 
        return ({ result: 'hospital registered' })
    }
    //Entrar com um usuario
    async db_login(request) {
        const { email, password } = request.body;
        const result = await knex('hospital').first().where({email: email,password: password},function (err) { //(err, result)  
            if (err) throw err;
        });
        return result;
    }
    //Listando os hospital
    async list() {
        const result = await knex('hospital',function (err) {  
            if (err) throw err;
        });
        return result;
        
    }
    //Atualização de senha do usuario
    async update_pass(request) {
        const { email, new_password} = request.body;
        const result = await knex('hospital').where('email', '=', email).update({ password: new_password })
        if(result){
            return ({ result: 'password changed' })
        }
        return ({ error: 'email not found' })
    }
    //Verificando se os dados "Unicos" já foram usados
    async exist(request){
        const { email} = request.body;
        const result = await knex('hospital').first().where({email: email})
        return result;
    }
}
module.exports = Hospital;//Exportando a Classe de Hospital
