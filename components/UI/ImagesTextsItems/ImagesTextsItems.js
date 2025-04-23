import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./ImagesTextsItems.module.scss";
let cx = classNames.bind(styles);

export default function ImagesTextsItems({ data }) {
    return (
        <section className="sectionImagesTextsItems pb-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-lg-6 m-auto mb-lg-4 mb-2">
                        {data?.tituloPrincipal && (
                            <h2 className="fs-2 mb-1 text-center">{data?.tituloPrincipal}</h2>
                        )}
                        {data?.descripcionPrincipal && (
                            <p className="fs-p text-gray text-center">{data?.descripcionPrincipal}</p>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="position-relative d-block">
                            <Image
                                src={data?.imagen1?.mediaItemUrl}
                                alt={data?.imagen1?.altText}
                                width={1280}
                                height={720}
                                className="object-fit-cover"
                            />
                            <div className="d-none d-xl-flex position-absolute top-0 col-12 justify-content-end pt-10">
                                <Image
                                    src={data?.imagen2?.mediaItemUrl}
                                    alt={data?.imagen2?.altText}
                                    width={680}
                                    height={600}
                                    className="object-fit-cover m-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx(["row", "text"])}>
                    <div className="col-12 col-lg-6 mb-xl-0 mb-2">
                        <div className="pe-lg-5">
                            {data?.titulo && (
                                <h2 className="fs-2 mb-1">{data?.titulo}</h2>
                            )}
                            {data?.subtitulo && (
                                <h3 className="fs-medium mb-1 text-gray">{data?.subtitulo}</h3>
                            )}
                            {data?.descripcion && (
                                <p className="fs-p text-gray">{data?.descripcion}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="col-xl-8 pt-0">
                            <ul className={cx(["list"])}>
                                {data?.items?.map((item, index) => (
                                    <li className="d-lg-flex justify-content-between align-items-center py-1" key={index}>
                                        <h4 className="font-secondary fs-small text-gray text-uppercase mb-0">{item?.titulo}</h4>
                                        <p className="font-secondary fs-small text-gray">{item?.detalle}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}