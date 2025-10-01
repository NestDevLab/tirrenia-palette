import React, { useState, useEffect } from 'react';
import type { Color } from '../types';

const ColorCard: React.FC<{ color: Color }> = ({ color }) => {
  const { name, hex, note } = color;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-white">
      <div
        className="h-32"
        style={{ backgroundColor: hex }}
      />
      <div className="p-4 border-t-4" style={{borderColor: hex}}>
        <p className="font-bold text-lg text-gray-900">{name}</p>
        <button
          onClick={handleCopy}
          className="font-mono text-sm mt-1 p-1 -ml-1 rounded-md transition-colors duration-200 text-gray-600 hover:bg-gray-100"
          aria-label={`Copy hex code ${hex}`}
        >
          {copied ? 'Copied!' : hex.toUpperCase()}
        </button>
        {note && (
            <p className="text-xs text-gray-500 mt-2 flex items-start gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0 mt-px" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>{note}</span>
            </p>
        )}
      </div>
    </div>
  );
};

export default ColorCard;