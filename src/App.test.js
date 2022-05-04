import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App, { calcularNovoSaldo } from "./App";

describe("Componente principal", () => {
  describe("Quando eu abro o app do banco", () => {
    test("o nome é exibido", () => {
      render(<App />);

      expect(screen.getByText("ByteBank")).toBeInTheDocument();
    });

    test("o saldo é exibido", () => {
      render(<App />);

      expect(screen.getByText("Saldo:")).toBeInTheDocument();
    });

    test("o botao de realizar transação é exibido", () => {
      render(<App />);

      expect(screen.getByText("Realizar operação")).toBeInTheDocument();
    });
  });
  describe("Quando eu realizo uma transação", () => {
    test("que é um saque, meu saldo diminua", () => {
      const valores = {
        transacao: "saque",
        valor: 50,
      };

      const novoSaldo = calcularNovoSaldo(valores, 150);

      expect(novoSaldo).toBe(100);
    });
    test("que é um deposito, meu saldo aumente", () => {
      const valores = {
        transacao: "deposito",
        valor: 50,
      };

      const novoSaldo = calcularNovoSaldo(valores, 150);

      expect(novoSaldo).toBe(200);
    });
    test("que é um saque, a transação deve ser realizada", () => {
      render(<App />);

      const saldo = screen.getByText("R$ 1000");
      const transacao = screen.getByLabelText("Saque");
      const valor = screen.getByTestId("valor");
      const botaoOperacao = screen.getByText("Realizar operação");

      expect(saldo.textContent).toBe("R$ 1000");

      fireEvent.click(transacao, {
        target: {
          value: "saque",
        },
      });

      fireEvent.change(valor, {
        target: {
          value: 10,
        },
      });

      fireEvent.click(botaoOperacao);

      expect(saldo.textContent).toBe("R$ 990");
    });

    test("que é um deposito, a transação deve ser realizada", () => {
      render(<App />);

      const saldo = screen.getByText("R$ 1000");
      const transacao = screen.getByLabelText("Depósito");
      const valor = screen.getByTestId("valor");
      const botaoOperacao = screen.getByText("Realizar operação");

      expect(saldo.textContent).toBe("R$ 1000");

      fireEvent.click(transacao, {
        target: {
          value: "deposito",
        },
      });

      fireEvent.change(valor, {
        target: {
          value: 100,
        },
      });

      fireEvent.click(botaoOperacao);

      expect(saldo.textContent).toBe("R$ 1100");
    });
  });
});
