// src/app/components/Resultado.tsx
"use client";
import React, { useState, useEffect } from "react";

interface ResultadoProps {
  numerosApostados: number[];
  onClose?: () => void;
}

export default function Resultado({ numerosApostados, onClose }: ResultadoProps) {
  const [numerosSorteados, setNumerosSorteados] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [acertos, setAcertos] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/resultados");
        if (!res.ok) {
          throw new Error("Erro ao buscar resultados");
        }
        const data = await res.json();
        setNumerosSorteados(data.resultado);
        const acertosEncontrados = numerosApostados.filter(num => data.resultado.includes(num));
        setAcertos(acertosEncontrados);
        console.log("Números sorteados:", data.resultado);
        console.log("Acertos:", acertosEncontrados);
      } catch (err: any) {
        setError(err.message);
        console.log("Erro ao buscar resultados:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [numerosApostados]);

  if (isLoading) return <p>Carregando resultado...</p>;
  if (error) return <p className="text-red-600">Erro: {error}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Resultado</h2>
      <p className="mt-2">
        <span className="font-medium">Números Sorteados:</span>{" "}
        <strong>{numerosSorteados.join(", ")}</strong>
      </p>
      <p className="mt-2">
        <span className="font-medium">Números Apostados:</span>{" "}
        <strong>{numerosApostados.join(", ")}</strong>
      </p>
      <p className="mt-4">
        {acertos.length > 0 ? (
          <span className="text-green-600 font-semibold">
            Você acertou {acertos.length} número(s): {acertos.join(", ")}
          </span>
        ) : (
          <span className="text-red-600 font-semibold">Nenhum acerto.</span>
        )}
      </p>
      {/* Botão para fechar o modal */}
      {onClose && (
        <button
          onClick={onClose}
          className="mt-6 w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition"
        >
          Fechar
        </button>
      )}
    </div>
  );
}
