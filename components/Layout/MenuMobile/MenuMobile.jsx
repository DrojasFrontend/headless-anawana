import { useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "../../LanguageSwitcher/LanguageSwitcher";
import IconClose from "../../SVG/IconClose";

import classNames from "classnames/bind";
import styles from "./MenuMobile.module.scss";
let cx = classNames.bind(styles);

export default function MenuMobile({ isOpen, data, logo, onClose }) {
  const [mounted, setMounted] = useState(false);

  return (
    <section
      className={`menuMobile position-fixed top-0 left-0 w-100 h-100 bg-white z-2 ${
        isOpen ? "active" : ""
      }`}
    >
      <button
        type="button"
        className="position-absolute top-0 right-0 d-flex justify-content-end p-2 border-0 p-0 w-100 bg-transparent z-1"
        onClick={onClose}
      >
        <IconClose />
      </button>
      <ul className="d-flex flex-column pt-5 px-2 justify-content-lg-around align-middle w-100">
        {data?.headerMenuItems.nodes?.map((menuItem, index) => (
          <li
            key={index}
            className={`d-flex justify-content-lg-center align-content-center font-secondary ${menuItem.cssClasses?.join(
              " "
            )}`}
          >
            {(menuItem.cssClasses || []).includes("reservar") ? (
              <a
                href={menuItem?.path}
                className="button button-white"
                target={menuItem?.target}
                onClick={onClose}
              >
                <span className="line line-white d-flex justify-content-center align-items-center">
                  {menuItem?.label}
                  <span className="line-white-top"></span>
                  <span className="line-white-right"></span>
                  <span className="line-white-bottom"></span>
                  <span className="line-white-left"></span>
                </span>
              </a>
            ) : (
              <Link href={menuItem?.path}>
                <a 
                  className="d-flex align-items-center text-primary text-uppercase mb-1"
                  onClick={onClose}
                >
                  {menuItem?.label}
                </a>
              </Link>
            )}
          </li>
        ))}
      </ul>
      <LanguageSwitcher />
    </section>
  );
}