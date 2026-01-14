
import React, { useState, useEffect, useCallback } from 'react';
import { Unit } from './types';
import { LBS_PER_LITER, KG_PER_LITER } from './constants';

const unitAbbreviations: Record<Unit, string> = {
  [Unit.LBS]: 'Lbs',
  [Unit.L]: 'L',
  [Unit.KG]: 'Kg',
};

const commonInputClasses = "w-full bg-black text-white text-center text-lg p-3 border-2 border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-[0_0_10px_rgba(255,255,0,0.5),inset_0_0_5px_rgba(255,255,0,0.3)] transition-shadow duration-300";

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('100.00');
  const [fromUnit, setFromUnit] = useState<Unit>(Unit.LBS);
  const [toUnit, setToUnit] = useState<Unit>(Unit.KG);
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | null>(null);

  const calculateConversion = useCallback(() => {
    if (fromUnit === toUnit) {
      setError('Selecione unidades diferentes');
      setResult('');
      return;
    }
    setError(null);

    const value = parseFloat(inputValue);
    if (isNaN(value) || value === 0) {
      setResult(`0.00 ${unitAbbreviations[toUnit]}`);
      return;
    }

    let valueInLiters: number;
    switch (fromUnit) {
      case Unit.LBS:
        valueInLiters = value / LBS_PER_LITER;
        break;
      case Unit.KG:
        valueInLiters = value / KG_PER_LITER;
        break;
      case Unit.L:
      default:
        valueInLiters = value;
        break;
    }

    let convertedValue: number;
    switch (toUnit) {
      case Unit.LBS:
        convertedValue = valueInLiters * LBS_PER_LITER;
        break;
      case Unit.KG:
        convertedValue = valueInLiters * KG_PER_LITER;
        break;
      case Unit.L:
      default:
        convertedValue = valueInLiters;
        break;
    }

    setResult(`${convertedValue.toFixed(2)} ${unitAbbreviations[toUnit]}`);
  }, [inputValue, fromUnit, toUnit]);

  useEffect(() => {
    calculateConversion();
  }, [calculateConversion]);

  const handleClear = () => {
    setInputValue('');
    setFromUnit(Unit.LBS);
    setToUnit(Unit.KG);
    setResult(`0.00 ${unitAbbreviations[Unit.KG]}`);
    setError(null);
  };

  return (
    <main className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4 font-mono antialiased">
      <div className="w-full max-w-sm mx-auto">
        <h1 className="text-3xl font-bold mb-10 text-center text-yellow-400 drop-shadow-[0_0_5px_#ffff00]">
          Conversor de Unidades para Querosene de Aviação
        </h1>

        <div className="space-y-6">
          {/* Input Unit */}
          <div>
            <label htmlFor="fromUnit" className="block text-sm text-yellow-400 uppercase tracking-widest mb-2 text-center">Unidade de Entrada</label>
            <select
              id="fromUnit"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value as Unit)}
              className={`${commonInputClasses} custom-select`}
            >
              {Object.values(Unit).map((unit) => (
                <option key={unit} value={unit} className="bg-black text-white">
                  {unit}
                </option>
              ))}
            </select>
          </div>

          {/* Value */}
          <div>
            <label htmlFor="value" className="block text-sm text-yellow-400 uppercase tracking-widest mb-2 text-center">Valor</label>
            <input
              id="value"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="0.00"
              className={commonInputClasses}
            />
          </div>

          {/* Output Unit */}
          <div>
            <label htmlFor="toUnit" className="block text-sm text-yellow-400 uppercase tracking-widest mb-2 text-center">Unidade de Saída</label>
            <select
              id="toUnit"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value as Unit)}
              className={`${commonInputClasses} custom-select`}
            >
              {Object.values(Unit).map((unit) => (
                <option key={unit} value={unit} className="bg-black text-white">
                  {unit}
                </option>
              ))}
            </select>
          </div>

          {/* Result */}
          <div>
            <label className="block text-sm text-yellow-400 uppercase tracking-widest mb-2 text-center">Resultado</label>
            <div className={`flex items-center justify-center h-28 ${commonInputClasses}`}>
              {error ? (
                <span className="text-red-500 text-base">{error}</span>
              ) : (
                <span className="text-5xl font-bold tracking-wider">{result.split(' ')[0]}
                  <span className="text-3xl ml-2 align-baseline text-yellow-400">{result.split(' ')[1]}</span>
                </span>
              )}
            </div>
          </div>
          
          {/* Clear Button */}
          <button
            onClick={handleClear}
            className={`${commonInputClasses} font-bold uppercase tracking-widest hover:bg-yellow-400 hover:text-black transition-colors duration-300`}
          >
            Limpar
          </button>
        </div>
      </div>
    </main>
  );
};

export default App;
