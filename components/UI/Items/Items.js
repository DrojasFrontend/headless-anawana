import classNames from "classnames/bind";
import styles from "./Items.module.scss";
let cx = classNames.bind(styles);

export default function Items({ data, translations }) {
    const items = data?.items;
    return (
        <section className="sectionItems pt-4 pb-5">
            <div className="container-fluid">
                <div className="row">
                    {items.map((item, index) => (
                        <div className="col-12 col-lg-3" key={index}>
                            <div className="item text-center">
                                <img className="m-auto" src={item.icono.mediaItemUrl} alt={item.titulo} />
                                <h3 className="fs-4 mb-1">{item.titulo}</h3>
                                <p className="text-gray fs-p">{item.detalle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
