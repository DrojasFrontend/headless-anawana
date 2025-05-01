import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ReservasIframeListaPropiedades.module.scss";

const cx = classNames.bind(styles);

const ReservasIframeListaPropiedades = ({ 
  baseSrc = "https://reservas.anawanapremiumhomes.com",
  idi = "3",
  className = ""
}) => {
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Función para obtener parámetros de URL
    const getParam = (name) => {
      const match = new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)').exec(location.search);
      return match ? decodeURIComponent(match[1]) : null;
    };

    // Verificar si hay parámetros en la URL
    if (window.location.search) {
      const arrival = getParam('arrival') || '';
      const departure = getParam('departure') || '';
      const guests = getParam('guests') || '';
      const destination = getParam('destination') || 'all';
      const address = getParam('address') || 'all';
      const gro = getParam('gro') || '';
      const urlIdi = getParam('idi') || idi;
      const typ = getParam('typ') || '';

      // Si tenemos los parámetros necesarios, actualizamos el src del iframe
      if (arrival && departure && guests && iframeRef.current) {
        let qparams = `?idi=${urlIdi}&arrival=${arrival}&departure=${departure}&guests=${guests}&address=${address}`;
        
        if (typ) {
          qparams += `&typ=${typ}`;
        }
        
        if (destination) {
          qparams += `&destination=${destination}`;
        }
        
        iframeRef.current.src = baseSrc + qparams;
      }
    }

    // Inicializar el redimensionamiento del iframe cuando el script esté disponible
    const initIframeResizer = () => {
      if (window.iFrameResize) {
        window.iFrameResize({ log: false }, '.icnea-iframe');
      } else {
        // Si el script no está cargado, intentamos cargar el script
        const script = document.createElement('script');
        script.src = "https://reservas.anawanapremiumhomes.com/assets/js/vendors/iframeResizer.min.js";
        script.onload = () => {
          window.iFrameResize({ log: false }, '.icnea-iframe');
        };
        document.body.appendChild(script);
      }
    };

    // Cargar el script de redimensionamiento
    initIframeResizer();

    // Limpiar script al desmontar
    return () => {
      const script = document.querySelector('script[src="https://reservas.anawanapremiumhomes.com/assets/js/vendors/iframeResizer.min.js"]');
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [baseSrc, idi]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    // Hacer scroll al inicio cuando cargue el iframe
    window.scrollTo(0, 0);
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
        className="icnea-iframe"
        src={`${baseSrc}?idi=${idi}`}
        title="Catálogo de propiedades Anawana Premium Homes"
        style={{ 
          width: "100%", 
          minHeight: "400px",
          border: "none"
        }}
        scrolling="no"
        frameBorder="0"
        loading="lazy"
        onLoad={handleIframeLoad}
      />
    </div>
  );
};

export default ReservasIframeListaPropiedades; 