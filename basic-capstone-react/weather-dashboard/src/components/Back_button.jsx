import React from 'react';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  return (
    <button
      onClick={() => window.location.href = 'https://stellular-marshmallow-b77b25.netlify.app/'}
      className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg transition-all duration-200 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 md:px-5 md:py-2.5 md:text-base sm:px-4 sm:py-2 sm:text-sm"
    >
      <ArrowLeft size={20} />
      Back
    </button>
  );
};

export default BackButton;