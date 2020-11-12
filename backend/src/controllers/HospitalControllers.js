const Hospital = require('../models/Hospital');//Importando Models
const Email = require('../utils/Email')//Importando função Enviar Email
const yup = require('yup');

class HospitalControllers {
    //Registrando usuario
    async register(request, response) {
        //Verificando se todos os dados necessarios foram passados
        let schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().required(),
            address: yup.string().required(),
            password: yup.string().required(),
            phone: yup.string().required(),
            total:yup.number().required(),
            current:yup.number().required(),
        });
        if (!(await schema.isValid(request.body))) {
            return response.json({ error: 'Validation Failled' });
        }
        var Database = new Hospital();
        //Verificar se existe um registro com os dados "Unicos"
        const existe = await Database.exist(request);
        if (!existe) {
            //Inserindo o Hospital
            const result = await Database.db_insert(request);
            if (result) {
                return response.json({ result: 'registered Hospital' });
            }
        }
        return response.json({ error: 'register fails' })
    }
    //Listar Hospitais
    async list(request, response) {
        var Database = new Hospital();
        //Buscando Hospital
        var list = await Database.list(request);
        return response.json(list);
    }
    //Login de Hospitais
    async login(request, response) {
        //Verificando se todos os dados necessarios foram passados
        let schema = yup.object().shape({
            email: yup.string().required(),
            password: yup.string().required(),
        });
        if (!(await schema.isValid(request.body))) {
            return response.json({ error: 'Validation Fails' });
        }
        var Database = new Hospital;
        //Buscando Usuario
        var hospital = await Database.db_login(request);
        if (hospital == undefined) {
            return response.json({ result: "Hospital not found" });
        }
        return response.json(hospital);
    }
    //Atualizar senha dos Hospitais
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
    //Recuperar senha de Hospital
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
    var Database = new Hospital;
    //Verificando se o dado passado existe
    const existe = await Database.exist(request);
    if (existe) {
        var changed = await Database.update_pass(request)
        //Verifica se houve sucesso na atualização
        if (changed) {
            return ({ result: 'password changed' })
        }
    }
    return ({ error: 'email not found' })
}
module.exports = HospitalControllers;