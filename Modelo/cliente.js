import ClienteDAO from "../Persistencia/clienteDAO.js";

export default class Cliente {
    // Atributos privados
    #codigo;
    #nome;
    #cpf;
    #endereco;
    #dataNascimento;

    // Getters e setters
    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get cpf() {
        return this.#cpf;
    }

    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    get dataNascimento() {
        return this.#dataNascimento;
    }

    set dataNascimento(novaData) {
        this.#dataNascimento = novaData;
    }

    // Construtor
    constructor(codigo = 0, nome = "", cpf = "", endereco = "", dataNascimento = "") {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#endereco = endereco;
        this.#dataNascimento = dataNascimento;
    }

    // Override do método toJSON
    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "cpf": this.#cpf,
            "endereco": this.#endereco,
            "dataNascimento": this.#dataNascimento
        };
    }

    // Métodos de persistência
    async incluir() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.incluir(this);
    }

    async consultar(termo) {
        const clienteDAO = new ClienteDAO();
        return await clienteDAO.consultar(termo);
    }

    async excluir() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.excluir(this);
    }

    async alterar() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.alterar(this);
    }
}
