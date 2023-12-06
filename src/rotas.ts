import { Router } from "express";
import { atualizarCarros, cadastraCarros, detalhaCarros, excluirCarros, listaCarros } from "./controladores/carros";

export const rotas = Router()

rotas.get('/carros', listaCarros)

rotas.get('/carros/:id', detalhaCarros)

rotas.post('/carros', cadastraCarros)

rotas.put('/carros/:id', atualizarCarros)

rotas.delete('/carros/:id', excluirCarros)

export default rotas