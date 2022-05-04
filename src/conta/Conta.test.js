import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import App from "../App"
import Conta from "./Conta"

describe("Componente de conta", ()=>{
    test("Exibir o saldo da conta com formatação monetária", ()=>{

        render(<Conta saldo={1000} />)

        const saldo = screen.getByText('R$', {exact: false})

        expect(saldo).toBeTruthy()
    })

    it('Chama a funcao de realizar transacao, quando o botao é clicado', ()=> {
        const funcaoRealizarTransacao = jest.fn();

        render(<Conta  saldo={1000} realizarTransacao={funcaoRealizarTransacao} />)

        fireEvent.click(screen.getByText('Realizar operação'))

        expect(funcaoRealizarTransacao).toHaveBeenCalled()
    })
})