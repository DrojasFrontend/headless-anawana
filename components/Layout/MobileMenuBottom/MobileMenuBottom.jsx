import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames/bind';
import styles from './MobileMenuBottom.module.scss';

const cx = classNames.bind(styles);

export default function MobileMenuBottom({ menuItems }) {
  if (!menuItems || menuItems.length === 0) return null;

  return (
    <div className={cx(['mobileMenuBottom', '', 'fixed-bottom'])}>
      <div className={cx(['menuContainer', 'd-flex', 'justify-content-around', 'align-items-center'])}>
        {menuItems.map((item, index) => (
          <Link key={index} href={item.cta?.url || '#'}>
            <a className={cx(['menuItem', 'text-center', 'py-1'])} target={item.cta?.target || '_self'}>
              {item.icono?.mediaItemUrl && (
                <div className={cx(['iconContainer', 'mx-auto'])}>
                  <Image 
                    src={item.icono.mediaItemUrl} 
                    alt={item.cta?.title || 'Menu icon'} 
                    width={20} 
                    height={20}
                  />
                </div>
              )}
              <span className={cx(['menuTitle', 'font-secondary'])}>{item.cta?.title || ''}</span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
} 