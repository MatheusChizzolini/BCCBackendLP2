import { Router } from "express";
import FornecedorCtrl from "../Controle/fornecedorCtrl.js";

const fornCtrl = new FornecedorCtrl();
const rotaFornecedor = Router();

rotaFornecedor.post("/", fornCtrl.gravar);
rotaFornecedor.put("/:id", fornCtrl.editar);
rotaFornecedor.patch("/:id", fornCtrl.editar);
rotaFornecedor.delete("/:id", fornCtrl.excluir);
rotaFornecedor.get("/:id", fornCtrl.consultar);
rotaFornecedor.get("/",fornCtrl.consultar);

export default rotaFornecedor;
