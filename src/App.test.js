import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

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
});
