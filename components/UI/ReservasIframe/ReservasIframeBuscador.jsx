import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ReservasIframeBuscador.module.scss";

const cx = classNames.bind(styles);

const ReservasIframeBuscador = ({ 
  src = "https://reservas.anawanapremiumhomes.com/es/search", 
  height = 320,
  className = ""
}) => {
  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(height);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const handleMessage = (event) => {
      // Asegúrate de que el mensaje viene del dominio esperado
      if (event.origin !== new URL(src).origin) return;
      
      // Si el mensaje contiene información sobre la altura
      if (event.data && event.data.type === 'setHeight') {
        setIframeHeight(event.data.height);
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [src]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={cx("reservasIframeContainer", { loading: isLoading }, className)}>
      {isLoading && (
        <div className={cx("loadingIndicator")}>
          <span>Cargando...</span>
        </div>
      )}
      <iframe 
        ref={iframeRef}
        src={src}
        title="Sistema de reservas Anawana Premium Homes"
        style={{ 
          width: "100%", 
          border: "none",
          minHeight: "320px",
        }}
        loading="lazy"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        importance="high"
        onLoad={handleIframeLoad}
      />
    </div>
  );
};

export default ReservasIframeBuscador; 