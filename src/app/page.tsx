// src/app/page.tsx
"use client";
import React, { useState } from "react";
import NumberGrid from "./components/NumberGrid";
import Resultado from "./components/Resultado";
import Modal from "./components/Modal";

export default function Home() {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tentando submeter com números:", selectedNumbers);
    if (selectedNumbers.length < 6) {
      setErrorMessage("Por favor, selecione pelo menos 6 números.");
      console.log("Falha na submissão: menos de 6 números selecionados.");
      return;
    }
    setErrorMessage(null);
    setIsModalOpen(true); // Abre o modal apenas na submissão
    console.log("Submissão bem-sucedida: modal aberto.");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    console.log("Modal fechado.");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">
          Verificar Apostas
        </h1>
        <form
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Evita submissões via tecla Enter
            }
          }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecione pelo menos 6 Números
          </label>
          <NumberGrid
            selectedNumbers={selectedNumbers}
            setSelectedNumbers={setSelectedNumbers}
          />
          <p className="mt-2 text-sm text-gray-600">
            Números selecionados: {selectedNumbers.length} / 15
          </p>
          {errorMessage && (
            <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
          )}
          <button
            type="submit"
            className={`mt-4 w-full py-2 rounded-md transition ${
              selectedNumbers.length >= 6
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-blue-300 text-gray-700 cursor-not-allowed"
            }`}
            disabled={selectedNumbers.length < 6}
          >
            Verificar
          </button>
        </form>
      </div>

      {/* Modal para exibir o Resultado */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Resultado numerosApostados={selectedNumbers} onClose={closeModal} />
      </Modal>
    </div>
  );
}
