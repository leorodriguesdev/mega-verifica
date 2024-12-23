// src/app/components/NumberGrid.tsx
"use client";
import React from "react";

interface NumberGridProps {
  selectedNumbers: number[];
  setSelectedNumbers: (numbers: number[]) => void;
}

export default function NumberGrid({ selectedNumbers, setSelectedNumbers }: NumberGridProps) {
  const MIN_SELECTION = 6;
  const MAX_SELECTION = 15;

  const handleNumberClick = (num: number) => {
    if (selectedNumbers.includes(num)) {
      // Remover o número se já estiver selecionado
      setSelectedNumbers(selectedNumbers.filter(n => n !== num));
      console.log(`Número ${num} desmarcado.`);
    } else {
      // Adicionar o número se ainda não estiver selecionado e não exceder o máximo
      if (selectedNumbers.length < MAX_SELECTION) {
        setSelectedNumbers([...selectedNumbers, num]);
        console.log(`Número ${num} marcado.`);
      } else {
        console.log(`Número ${num} não pode ser marcado: limite de seleção atingido.`);
      }
    }
  };

  const renderNumber = (num: number) => {
    const isSelected = selectedNumbers.includes(num);
    const isDisabled = !isSelected && selectedNumbers.length >= MAX_SELECTION;

    return (
      <button
        key={num}
        type="button" // Especifica o tipo como "button" para evitar submissão do formulário
        onClick={() => handleNumberClick(num)}
        className={`w-10 h-10 m-1 rounded-full border flex items-center justify-center
          ${isSelected ? 'bg-blue-500 text-white border-blue-700' : 'bg-white text-black border-gray-300'}
          hover:bg-blue-400 hover:text-white transition duration-200 ease-in-out
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={isDisabled}
        aria-pressed={isSelected}
        aria-label={`Número ${num}`}
      >
        {num.toString().padStart(2, '0')}
      </button>
    );
  };

  const numbers = Array.from({ length: 60 }, (_, i) => i + 1);

  return (
    <div className="mt-4 grid grid-cols-10 gap-2">
      {numbers.map(renderNumber)}
    </div>
  );
}
