const User = require('../models/Users');//Importando Models
const Email = require('../utils/Email')//Importando função Enviar Email
const yup = require('yup');//Importando função para validar Dados



class UserControllers {
    //Registrando usuario
    async register(request, response) {
        //Verificando se todos os dados necessarios foram passados
        let schema = yup.object().shape({
            name: yup.string().required(),
            cpf: yup.string().required(),
            email: yup.string().required(),
            address: yup.string().required(),
            password: yup.string().required(),
            phone: yup.string().required(),

        });
        if (!(await schema.isValid(request.body))) {
            return response.json({ error: 'Validation Failled' });
        }
        var Database = new User;
        //Verificar se existe um usuario com os dados "Unicos"
        const existe = await Database.exist(request);
        if (!existe) {
            const result = await Database.db_insert(request);
            if (result) {
                return response.json({ result: 'registered user' });
            }
        }
        return response.json({ error: 'register fails' })
    }

    //Entrando com usuario
    async login(request, response) {
        //Verificando se todos os dados necessarios foram passados
        let schema = yup.object().shape({
            email: yup.string().required(),
            password: yup.string().required(),
        });
        if (!(await schema.isValid(request.body))) {
            return response.json({ error: 'Validation Fails' });
        }
        var Database = new User;
        //Buscando Usuario
        var user = await Database.db_login(request);
        if (user == undefined) {
            return response.json({ result: "User not found" });
        }
        return response.json(user);
    }

    //Listagem de usuario
    async list(request, response) {
        var Database = new User;
        //Buscando Usuarios
        var list = await Database.list();
        return response.json(list);
    }
    //Atualizar senha de usuarios
    async update_pass(request, response) {
        //Verificando se todos os dados necessarios foram passados
        let schema = yup.object().shape({
            email: yup.string().required(),
            new_password: yup.string().required(),
        });
        if (!(await schema.isValid(request.body))) {
            return response.json({ error: 'Validation Fails' });
        }
        //Atualizando o banco de dados
        var result = await ChangePass(request);
        return response.json(result);

    }
    //Recuperar senha de usuarios
    async recover_pass(request, response) {
        //Verificando se todos os dados necessarios foram passados
        let schema = yup.object().shape({
            email: yup.string().email().required(),
            title: yup.string().required(),
        });
        //Gerando uma senha nova para o usuario
        request.body.new_password = Math.random().toString(36).substring(7);
        if (!(await schema.isValid(request.body))) {
            return response.json({ error: 'Validation Fails' });
        }
        //Atualizando o banco de dados
        var result = await ChangePass(request);
        //Enviar email
        var recover = new Email();
        recover.sendEmail(request);
        return response.json(result);
    }
}
//Atualizar BD
ChangePass = async (request) => {
    var Database = new User;
    var changed = await Database.update_pass(request)
    //Verifica se houve sucesso na atualização
    if (changed) {
        return ({ result: 'password changed' })
    }
    return ({ error: 'email not found' })
}
module.exports = UserControllers;
