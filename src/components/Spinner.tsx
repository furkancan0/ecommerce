import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="absolute right-0 left-0 top-1 flex justify-center items-center h-full z-20">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Spinner;
