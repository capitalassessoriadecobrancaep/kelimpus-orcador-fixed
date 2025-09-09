import React, { useState, useMemo } from 'react';

const WHATSAPP_NUMBER = "5511953423778"; // WhatsApp da Kelimpus

const PRICES = {
  almofada: 13.0,
  cadeira: 25.0,
  puff: 45.0,
  poltrona: 75.0,
  chaise: 115.0,
  sofaCama: 195.0,
  sofa: 210.0,
};

export default function App() {
  const [quantities, setQuantities] = useState({
    almofada: 0,
    cadeira: 2,
    puff: 0,
    poltrona: 0,
    chaise: 0,
    sofaCama: 0,
    sofa: 1,
  });

  const subtotalHigienizacao = useMemo(() => {
    return Object.keys(PRICES).reduce((acc, key) => acc + (PRICES[key] * (quantities[key] || 0)), 0);
  }, [quantities]);

  const formatBRL = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const buildWhatsAppLink = () => {
    const lines = [];
    lines.push("Olá! Gostaria de um orçamento para limpeza de estofados.");
    Object.keys(PRICES).forEach(key => {
      const q = quantities[key];
      if (q && q > 0) lines.push(`${labelOf(key)}: ${q} x ${formatBRL(PRICES[key])}`);
    });
    lines.push(`Total: ${formatBRL(subtotalHigienizacao)}`);
    const text = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  };

  function labelOf(key) {
    switch(key){
      case 'almofada': return 'Almofada';
      case 'cadeira': return 'Cadeira estofada';
      case 'puff': return 'Puff';
      case 'poltrona': return 'Poltrona';
      case 'chaise': return 'Chaise';
      case 'sofaCama': return 'Sofá-cama';
      case 'sofa': return 'Sofá';
      default: return key;
    }
  }

  const handleQtyChange = (key, value) => {
    const v = Math.max(0, parseInt(value || 0, 10));
    setQuantities(prev => ({ ...prev, [key]: Number.isNaN(v) ? 0 : v }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
        <header className="flex items-center gap-4 mb-6">
          <img src="/logo.png" alt="Kelimpus" className="w-28 h-28 object-contain" />
          <div>
            <h1 className="text-2xl font-bold">Kelimpus</h1>
            <p className="text-sm text-gray-600">Higienização • Impermeabilização • Limpeza de Estofados</p>
          </div>
        </header>

        <h2 className="text-lg font-semibold mb-3">Tabela de Preços</h2>
        <table className="w-full text-sm table-auto">
          <thead>
            <tr className="text-left text-gray-700 border-b">
              <th className="py-2">Serviço</th>
              <th className="py-2">Preço</th>
              <th className="py-2">Qtd</th>
              <th className="py-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(PRICES).map(key => (
              <tr key={key} className="border-b">
                <td className="py-3">{labelOf(key)}</td>
                <td className="py-3">{formatBRL(PRICES[key])}</td>
                <td className="py-3">
                  <input type="number" min="0" value={quantities[key]}
                    onChange={e => handleQtyChange(key, e.target.value)}
                    className="w-20 p-2 rounded border" />
                </td>
                <td className="py-3">{formatBRL(PRICES[key] * (quantities[key] || 0))}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 bg-gray-100 p-4 rounded text-right">
          <div className="text-sm text-gray-600">Total</div>
          <div className="text-2xl font-bold">{formatBRL(subtotalHigienizacao)}</div>
        </div>

        <div className="mt-6 flex gap-3">
          <a href={buildWhatsAppLink()} target="_blank" rel="noreferrer"
            className="px-4 py-2 rounded shadow bg-green-500 text-white">
            Enviar Orçamento via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
