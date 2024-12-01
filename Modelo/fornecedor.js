import FornecedorDAO from "../Persistencia/fornecedorDAO";
export default class Fornecedor {
    // Atributos privados
    #id;
    #nome;
    #cnpj;
    #cep;
    #telefone;
    #email;

    // Métodos getters e setters
    get id() {
        return this.#id;
    }

    set id(novoId) {
        this.#id = novoId;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get cnpj() {
        return this.#cnpj;
    }

    set cnpj(novoCnpj) {
        this.#cnpj = novoCnpj;
    }

    get cep() {
        return this.#cep;
    }

    set cep(novoCep) {
        this.#cep = novoCep;
    }

    get telefone() {
        return this.#telefone;
    }

    set telefone(novoTelefone) {
        this.#telefone = novoTelefone;
    }

    get email() {
        return this.#email;
    }

    set email(novoEmail) {
        this.#email = novoEmail;
    }

    // Construtor
    constructor(id = 0, nome = "", cnpj = "", cep = "", telefone = "", email = "") {
        this.#id = id;
        this.#nome = nome;
        this.#cnpj = cnpj;
        this.#cep = cep;
        this.#telefone = telefone;
        this.#email = email;
    }

    // Método para conversão em JSON
    toJSON() {
        return {
            "id": this.#id,
            "nome": this.#nome,
            "cnpj": this.#cnpj,
            "cep": this.#cep,
            "telefone": this.#telefone,
            "email": this.#email
        };
    }

    // Métodos de persistência
    async incluir() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.incluir(this);
    }

    async consultar(termo) {
        const fornecedorDAO = new FornecedorDAO();
        return await fornecedorDAO.consultar(termo);
    }

    async excluir() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.excluir(this);
    }

    async alterar() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.alterar(this);
    }
}
