import React, { useState } from 'react';
import { PaletteSectionData } from './types';
import PaletteSection from './components/PaletteSection';

// Augment the global window interface for TypeScript
declare global {
  interface Window {
    html2canvas: any;
    jspdf: any;
  }
}

const paletteData: PaletteSectionData[] = [
  {
    title: 'Earth & Volcano',
    icon: '🌋',
    imageUrl: 'https://images.unsplash.com/photo-1589177927318-151b7f0c4c47?q=80&w=2070&auto=format&fit=crop',
    colors: [
      { name: 'Pompeian Red', hex: '#A42A2E' },
      { name: 'Vesuvian Terracotta', hex: '#B55E3C' },
      { name: 'Lava Black', hex: '#1F1B1A' },
      { name: 'Vesuvian Stone Gray', hex: '#4E4447' },
    ],
  },
  {
    title: 'Sea & Coast',
    icon: '🌊',
    imageUrl: 'https://images.unsplash.com/photo-1534354203852-1d36a18e0a29?q=80&w=1964&auto=format&fit=crop',
    colors: [
      { name: 'Tyrrhenian Blue', hex: '#2A6FA9' },
      { name: 'Capri Blue', hex: '#0F5D84', note: 'Alternative to Tyrrhenian Blue, for Tirrenia logo' },
      { name: 'Emerald Green', hex: '#2E8857' },
      { name: 'Olive Green', hex: '#6E7A3B' },
    ],
  },
  {
    title: 'Daily Life & Gastronomy',
    icon: '🍋',
    imageUrl: 'https://images.unsplash.com/photo-1600689404614-2c0401b44d2d?q=80&w=1974&auto=format&fit=crop',
    colors: [
      { name: 'Coffee Brown', hex: '#8A5B36', note: 'For Caffè al Banco logo' },
      { name: 'Dark Espresso', hex: '#3B2C28' },
      { name: 'Sorrento Lemon Yellow', hex: '#EACB2F' },
    ],
  },
  {
    title: 'Art & History',
    icon: '🏛️',
    imageUrl: 'https://images.unsplash.com/photo-1557622242-271b337039a8?q=80&w=1935&auto=format&fit=crop',
    colors: [
      { name: 'Antique Gold', hex: '#C9A64E' },
      { name: 'Historic Sign Green', hex: '#224B3B' },
    ],
  },
  {
    title: 'Neutrals / Bases',
    icon: '⚪',
    imageUrl: 'https://images.unsplash.com/photo-1590055273153-6147585575e4?q=80&w=1974&auto=format&fit=crop',
    colors: [
      { name: 'Whitewash White', hex: '#F2F0E9' },
      { name: 'Cream White (Flat White)', hex: '#EFE5D4' },
      { name: 'Sand Beige', hex: '#D8C2A6' },
      { name: 'Light Marble', hex: '#E9E2D7' },
      { name: 'Milk Cream', hex: '#F3EBDE' },
    ],
  },
];

const App: React.FC = () => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleDownloadPdf = () => {
    if (!window.html2canvas || !window.jspdf) {
      alert('The libraries for PDF generation have not been loaded yet. Please try again in a moment.');
      return;
    }

    setIsGeneratingPdf(true);
    const input = document.getElementById('root');

    if (input) {
      window.html2canvas(input, {
        scale: 2,
        useCORS: true,
        logging: false,
        onclone: (document: Document) => {
          const downloadButton = document.querySelector('.download-pdf-button');
          if (downloadButton) {
            (downloadButton as HTMLElement).style.display = 'none';
          }
        },
      }).then((canvas: HTMLCanvasElement) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new window.jspdf.jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const canvasAspectRatio = canvas.width / canvas.height;
        const imgHeight = pdfWidth / canvasAspectRatio;
        
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();

        while (heightLeft > 0) {
          position -= pdf.internal.pageSize.getHeight();
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
          heightLeft -= pdf.internal.pageSize.getHeight();
        }

        pdf.save('palette-campania-tradition.pdf');
        setIsGeneratingPdf(false);
      }).catch((err: Error) => {
        console.error("Error during PDF generation:", err);
        alert('An error occurred while generating the PDF.');
        setIsGeneratingPdf(false);
      });
    }
  };


  return (
    <div className="min-h-screen font-sans text-gray-800">
      <header className="py-12 px-4 text-center relative">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          🎨 Complete Palette
        </h1>
        <p className="mt-2 text-xl text-gray-600">
          Tirrenia / Campania Tradition
        </p>
        <div className="absolute top-4 right-4 md:top-6 md:right-6">
          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="download-pdf-button bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-gray-50 disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
            aria-label="Download the palette as a PDF"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {isGeneratingPdf ? 'Generating...' : 'Download PDF'}
          </button>
        </div>
      </header>
      <main className="container mx-auto px-4 pb-16">
        <div className="space-y-16">
          {paletteData.map((section) => (
            <PaletteSection
              key={section.title}
              title={section.title}
              icon={section.icon}
              imageUrl={section.imageUrl}
              colors={section.colors}
            />
          ))}
        </div>
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Created with passion for color and tradition.</p>
      </footer>
    </div>
  );
};

export default App;