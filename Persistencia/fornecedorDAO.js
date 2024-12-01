// DAO - Data Access Object
import Fornecedor from "../Modelo/fornecedor.js";
import conectar from "./Conexao.js";

export default class FornecedorDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar(); // Retorna uma conexão
            const sql = `
            CREATE TABLE IF NOT EXISTS fornecedor (
                forn_id INT NOT NULL AUTO_INCREMENT,
                forn_nome VARCHAR(200) NOT NULL,
                forn_cnpj VARCHAR(20) NOT NULL,
                forn_cep VARCHAR(10) NOT NULL,
                forn_telefone VARCHAR(15) NOT NULL,
                forn_email VARCHAR(100) NOT NULL,
                CONSTRAINT pk_fornecedor PRIMARY KEY(forn_id)
            )
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `
                INSERT INTO fornecedor (forn_nome, forn_cnpj, forn_cep, forn_telefone, forn_email)
                VALUES (?, ?, ?, ?, ?)
            `;
            const parametros = [
                fornecedor.nome,
                fornecedor.cnpj,
                fornecedor.cep,
                fornecedor.telefone,
                fornecedor.email,
            ]; // Dados do fornecedor
            const resultado = await conexao.execute(sql, parametros);
            fornecedor.id = resultado[0].insertId; // Atribui o ID gerado ao objeto
            await conexao.release(); // Libera a conexão
        }
    }

    async alterar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `
                UPDATE fornecedor
                SET forn_nome = ?, forn_cnpj = ?, forn_cep = ?, forn_telefone = ?, forn_email = ?
                WHERE forn_id = ?
            `;
            const parametros = [
                fornecedor.nome,
                fornecedor.cnpj,
                fornecedor.cep,
                fornecedor.telefone,
                fornecedor.email,
                fornecedor.id,
            ]; // Dados do fornecedor
            await conexao.execute(sql, parametros);
            await conexao.release(); // Libera a conexão
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let sql = "";
        let parametros = [];

        if (isNaN(parseInt(termo))) {
            sql = `
                SELECT * FROM fornecedor
                WHERE forn_nome LIKE ?
            `;
            parametros = ['%' + termo + '%'];
        } else {
            sql = `
                SELECT * FROM fornecedor
                WHERE forn_id = ?
            `;
            parametros = [termo];
        }

        const [linhas] = await conexao.execute(sql, parametros);
        const listaFornecedores = linhas.map((linha) => new Fornecedor(
            linha['forn_id'],
            linha['forn_nome'],
            linha['forn_cnpj'],
            linha['forn_cep'],
            linha['forn_telefone'],
            linha['forn_email']
        ));
        await conexao.release(); // Libera a conexão
        return listaFornecedores;
    }

    async excluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `
                DELETE FROM fornecedor
                WHERE forn_id = ?
            `;
            const parametros = [fornecedor.id]; // ID do fornecedor
            await conexao.execute(sql, parametros);
            await conexao.release(); // Libera a conexão
        }
    }
}
