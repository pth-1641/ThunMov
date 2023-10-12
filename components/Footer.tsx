'use client';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="pt-20">
      <div className="max-w-7xl mx-auto pb-10">
        <Link href="/">
          <h1 className=" flex items-center text-2xl font-extrabold gap-2 select-none px-5">
            <Icon
              icon="ant-design:thunderbolt-filled"
              className="text-primary"
              height={40}
            />
            ThunMov
          </h1>
        </Link>
        <span className="block h-0.5 bg-white/5 rounded my-8" />
        <div className="flex items-center justify-between flex-col md:flex-row gap-8 px-5">
          <ul className="flex items-center flex-wrap gap-x-8 gap-y-2 text-xs font-semibold lg:gap-14">
            <li className="hover:text-primary duration-150 cursor-pointer">
              FAQ
            </li>
            <li className="hover:text-primary duration-150 cursor-pointer">
              TRUNG TÂM TRỢ GIÚP
            </li>
            <li className="hover:text-primary duration-150 cursor-pointer">
              ĐIỀU KHOẢN
            </li>
            <li className="hover:text-primary duration-150 cursor-pointer">
              CHÍNH SÁCH
            </li>
          </ul>
          <ul className="flex items-center gap-x-2.5 text-xs font-semibold">
            <Link
              href="https://github.com/pth-1641"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-black aspect-square p-2.5 hover:text-primary duration-150"
            >
              <Icon icon="mingcute:github-fill" height={16} />
            </Link>
            <Link
              href="https://fb.com/pth.1641"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-black aspect-square p-2.5 hover:text-primary duration-150"
            >
              <Icon icon="ri:facebook-fill" height={16} />
            </Link>
            <Link
              href="https://www.instagram.com/pth_1641"
              target="  "
              rel="noopener noreferrer"
              className="rounded-full bg-black aspect-square p-2.5 hover:text-primary duration-150"
            >
              <Icon icon="mdi:instagram" height={16} />
            </Link>
          </ul>
        </div>
      </div>
      <div className="bg-black pt-6 pb-8 px-5">
        <p className="max-w-7xl mx-auto text-sm font-medium">
          Copyright © {new Date().getFullYear()}. All Rights Reserved By{' '}
          <span className="text-primary">ThunMov</span>
        </p>
      </div>
    </footer>
  );
};
