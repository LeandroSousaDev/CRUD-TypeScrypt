import { Request, Response } from 'express'
import { knex } from '../bancoDeDados/conexão'
import { Carro } from '../tipos'

export const listaCarros = async (req: Request, res: Response) => {

    try {
        const carros = await knex('carros')

        return res.status(200).json(carros)

    } catch {
        return res.status(500).json({ message: 'erro interno do servidor' })
    }
}

export const detalhaCarros = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const carro = await knex<Carro>('carros').where({ id: Number(id) }).first()

        if (!carro) {
            return res.status(404).json({ message: 'carro não encontrado' })
        }

        return res.status(200).json(carro)
    } catch {
        return res.status(500).json({ message: 'erro interno do servidor' })
    }
}

export const cadastraCarros = async (req: Request, res: Response) => {
    const { marca, modelo, cor, ano, valor } = req.body
    try {
        const carro = await knex<Omit<Carro, 'id'>>('carros')
            .insert({ marca, modelo, cor, ano, valor })
            .returning('*')

        return res.status(201).json(carro)
    } catch {
        return res.status(500).json({ message: 'erro interno do servidor' })
    }
}

export const atualizarCarros = async (req: Request, res: Response) => {
    const { id } = req.params
    const { marca, modelo, cor, ano, valor } = req.body

    try {
        const carro = await knex<Carro>('carros')
            .where({ id: Number(id) })
            .first()

        if (!carro) {
            return res.status(404).json({ message: 'carro não encontrado' })
        }

        await knex<Carro>('carros')
            .where({ id: Number(id) })
            .update({ marca, modelo, cor, ano, valor })

        return res.status(204).send()

    } catch {
        return res.status(500).json({ message: 'erro interno do servidor' })
    }
}

export const excluirCarros = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const carro = await knex<Carro>('carros').where({ id: Number(id) }).first()

        if (!carro) {
            return res.status(404).json({ message: 'carro não encontrado' })
        }

        await knex<Carro>('carros')
            .where({ id: Number(id) })
            .del()

        return res.status(204).send()

    } catch {
        return res.status(500).json({ message: 'erro interno do servidor' })
    }
}
