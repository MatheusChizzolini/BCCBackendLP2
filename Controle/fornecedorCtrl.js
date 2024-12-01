import Fornecedor from "../Modelo/fornecedor";

export default class FornecedorCtrl {

    gravar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const nome = requisicao.body.nome;
            const cnpj = requisicao.body.cnpj;
            const cep = requisicao.body.cep;
            const telefone = requisicao.body.telefone;
            const email = requisicao.body.email;

            if (nome && cnpj && cep && telefone && email) {
                const fornecedor = new Fornecedor(0, nome, cnpj, cep, telefone, email);
                fornecedor.incluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Fornecedor adicionado com sucesso!",
                            "id": fornecedor.id
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível incluir o fornecedor: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe corretamente todos os dados de um fornecedor conforme documentação da API."
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    editar(requisicao, resposta) {
        resposta.type("application/json");
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")) {
            const id = requisicao.params.id;
            const nome = requisicao.body.nome;
            const cnpj = requisicao.body.cnpj;
            const cep = requisicao.body.cep;
            const telefone = requisicao.body.telefone;
            const email = requisicao.body.email;

            if (id > 0 && nome && cnpj && cep && telefone && email) {
                const fornecedor = new Fornecedor(id, nome, cnpj, cep, telefone, email);
                fornecedor.alterar()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Fornecedor alterado com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível alterar o fornecedor: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe corretamente todos os dados de um fornecedor conforme documentação da API."
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == 'DELETE') {
            const id = requisicao.params.id;

            if (id > 0) {
                const fornecedor = new Fornecedor(id);
                fornecedor.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Fornecedor excluído com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível excluir o fornecedor: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe um ID válido de um fornecedor conforme documentação da API."
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == "GET") {
            let id = requisicao.params.id;

            if (isNaN(id)) {
                id = "";
            }

            const fornecedor = new Fornecedor();
            fornecedor.consultar(id)
                .then((listaFornecedores) => {
                    resposta.status(200).json(listaFornecedores);
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao consultar fornecedores: " + erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }
}
