import React from 'react';
import type { PaletteSectionData } from '../types';
import ColorCard from './ColorCard';

const PaletteSection: React.FC<PaletteSectionData> = ({ title, icon, imageUrl, colors }) => {
  return (
    <section>
      <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
        <img 
          src={imageUrl} 
          alt={`Inspiration for ${title} color palette`} 
          className="w-full h-48 md:h-64 object-cover" 
          loading="lazy" 
        />
      </div>
      <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {colors.map((color) => (
          <ColorCard key={color.name} color={color} />
        ))}
      </div>
    </section>
  );
};

export default PaletteSection;