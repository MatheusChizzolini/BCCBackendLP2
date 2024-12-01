
import { Router } from "express"; //micro-aplicação HTTP
import ClienteCtrl from "../Controle/clienteCtrl.js";

const cliCtrl = new ClienteCtrl();
const rotaCliente = Router();

rotaProduto.post("/", cliCtrl.gravar);
rotaProduto.put("/:codigo", cliCtrl.editar);
rotaProduto.patch("/:codigo", cliCtrl.editar);
rotaProduto.delete("/:codigo", cliCtrl.excluir);
rotaProduto.get("/:codigo", cliCtrl.consultar);
rotaProduto.get("/",cliCtrl.consultar);

export default rotaCliente;