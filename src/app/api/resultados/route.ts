// src/app/api/resultados/route.ts
import { NextResponse } from "next/server";

// Simulando resultado da Mega Sena
export async function GET(request: Request) {
  const resultado = [5, 12, 23, 45, 50, 60]; // Números simulados
  return NextResponse.json({ resultado });
}
