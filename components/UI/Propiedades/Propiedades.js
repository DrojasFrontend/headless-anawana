import Image from "next/image";

import classNames from "classnames/bind";
import styles from "./Propiedades.module.scss";
let cx = classNames.bind(styles);

import placeholderImg from "../../../public/img/1259x1500.svg";

export default function Propiedades({ data, allCategories, activeTab, setActiveTab, translations }) {
    return (
        <section className="pt-4 pt-lg-5 ">
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
                                <h2 className="font-secondary fs-2 text-uppercase fw-light mb-1">Propiedades</h2>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => setActiveTab('all')}
                                        className={`d-block button button-black text-center w-100 ${activeTab === 'all'
                                            ? ''
                                            : ''
                                            }`}
                                    >
                                        <span className="line line-white d-flex justify-content-center align-items-center">
                                            Todas las propiedades
                                            <span className="line-black-top"></span>
                                            <span className="line-black-right"></span>
                                            <span className="line-black-bottom"></span>
                                            <span className="line-black-left"></span>
                                        </span>
                                    </button>
                                    {allCategories.map((categoria) => (
                                        <button
                                            key={categoria.id}
                                            onClick={() => setActiveTab(categoria.slug)}
                                            className={`button button-black mt-1 text-center w-100 ${activeTab === categoria.slug
                                                ? ''
                                                : ''
                                                }`}
                                        >
                                            <span className="line line-white d-flex justify-content-center align-items-center">
                                                {categoria.name}
                                                <span className="line-black-top"></span>
                                                <span className="line-black-right"></span>
                                                <span className="line-black-bottom"></span>
                                                <span className="line-black-left"></span>
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Grid de propiedades */}
                        <div className="col-12 col-lg-8">
                            <div className="row">
                                {data.map((propiedad) => (
                                    <div key={propiedad.id} className="col-12 col-lg-6 col-xl-4 p-lg-1">
                                        <div className="d-flex mb-1 mb-lg-0 position-relative justify-content-center">
                                            <Image 
                                                className="d-flex"
                                                src={propiedad?.featuredImage?.node?.mediaItemUrl || placeholderImg} 
                                                alt={propiedad.title} 
                                                width={propiedad?.featuredImage?.node?.mediaDetails?.width || 1259} 
                                                height={propiedad?.featuredImage?.node?.mediaDetails?.height || 1500} 
                                            />
                                            <div className="position-absolute bottom-0 w-100 p-1 z-1">
                                                <h3 className="fs-6 text-white">{propiedad.title}</h3>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {data.length === 0 && (
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
