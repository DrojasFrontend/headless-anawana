import React from 'react';

/**
 * Componente de carga centralizado para toda la aplicación
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.minHeight='50vh'] - Altura mínima del contenedor
 * @param {boolean} [props.fullPage=false] - Si es true, el loading ocupará toda la pantalla
 * @returns {JSX.Element} - Elemento JSX con el spinner de carga
 */
export default function Loading({ minHeight = '50vh', fullPage = false }) {
  return (
    <div 
      className="loading-container" 
      style={{ 
        minHeight: fullPage ? '100vh' : minHeight 
      }}
    >
      <div className="loading-spinner"></div>
    </div>
  );
}
