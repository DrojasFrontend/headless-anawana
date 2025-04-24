import Image from "next/image";
import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Propiedades.module.scss";
let cx = classNames.bind(styles);

// Importar estilos de Swiper
import "swiper/css";
import "swiper/css/effect-fade";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

import placeholderImg from "../../../public/img/1259x1500.svg";

export default function Propiedades({ data, allCategories, activeTab, setActiveTab, translations }) {
    const [slidesPerView, setSlidesPerView] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSlidesPerView(1);
            } else if (window.innerWidth < 992) {
                setSlidesPerView(2);
            } else {
                setSlidesPerView(3);
            }
        };

        // Establecer el valor inicial
        handleResize();

        // Agregar el event listener
        window.addEventListener("resize", handleResize);

        // Limpiar el event listener
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className="sectionPropiedades pt-4 pt-lg-5 ">
            {!data || !allCategories ? (
                <div className="container-fluid">
                    <div className="text-center py-8">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container-fluid">
                    <div className="row">
                        {/* Panel de categorías */}
                        <div className="col-12 col-lg-4 mb-lg-0 mb-2">
                            <div className="bg-white rounded-lg shadow-md p-lg-4 ps-0">
                                <h2 className="font-base fs-2 fw-light mb-1">Properties</h2>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => setActiveTab('all')}
                                        className={`justify-content-start button border-0 customHoverLink position-relative py-1 ${activeTab === 'all'
                                            ? cx(["active"])
                                            : ''
                                            }`}
                                    >
                                        All properties
                                    </button>
                                    {allCategories.map((categoria) => (
                                        <button
                                            key={categoria.id}
                                            onClick={() => setActiveTab(categoria.slug)}
                                            className={`justify-content-start button border-0 customHoverLink position-relative py-1 ${activeTab === categoria.slug
                                                ? cx(["active"])
                                                : ''
                                                }`}
                                        >
                                            {categoria.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Swiper de propiedades */}
                        <div className="col-12 col-lg-8">
                            {data.length > 0 ? (
                                <Swiper
                                    modules={[Navigation, Pagination, Autoplay]}
                                    spaceBetween={10}
                                    slidesPerView={1}
                                    navigation={true}
                                    pagination={{ clickable: true }}
                                    autoplay={{
                                        delay: 3500,
                                        disableOnInteraction: false,
                                    }}
                                    speed={1500}
                                    className={cx(["propiedades-swiper"])}
                                    breakpoints={{
                                        768: {
                                            slidesPerView: 2,
                                        },
                                        1200: {
                                            slidesPerView: 3,
                                        },
                                    }}
                                >
                                    {data.map((propiedad) => (
                                        <SwiperSlide key={propiedad.id} className={cx(["propiedad-slide"])}>
                                            <div className={cx(["position-relative", "img"])}>
                                                <Image
                                                    className={cx(["propiedad-imagen"])}
                                                    src={propiedad?.featuredImage?.node?.mediaItemUrl || placeholderImg}
                                                    alt={propiedad.title}
                                                    width={propiedad?.featuredImage?.node?.mediaDetails?.width || 1259}
                                                    height={propiedad?.featuredImage?.node?.mediaDetails?.height || 1500}
                                                    layout="responsive"
                                                />
                                                <div className="position-absolute bottom-0 w-100 p-1 z-1">
                                                    <p className="fs-p text-white">{propiedad.title}</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    No se encontraron propiedades en esta categoría
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
