import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import PicOne from "../../../assets/pics/picOne.jpg";
import PicTwo from "../../../assets/pics/picTwo.jpg";
import PicThree from "../../../assets/pics/picThree.jpg";
import PicFour from "../../../assets/pics/picFour.jpg";
export const HomeHeader: React.FC = () => {
  return (
    <section className="w-full flex flex-col gap-4">
      {/* Row one */}
      <div className="flex justify-between">
        {" "}
        {/* Path */}
        <span className="flex flex-col gap-2">
          <ul className="flex items-center space-x-2 text-sm text-whiteTheme-accentDark">
            <li>Workspaces</li>
            <li>
              <FaAngleRight />
            </li>
            <li>Creative</li>
            <li>
              <FaAngleRight />
            </li>
            <li className="text-black text-base font-semibold">
              Creative Website
            </li>
          </ul>
          <h1 className="text-2xl font-semibold text-black">Website Design</h1>
        </span>
        {/* DATES */}
        <span className="flex flex-col items-end gap-1">
          <h1 className="text-sm font-bold text-black">From 23 April</h1>
          <article className="flex items-center gap-2">
            <span className="bg-green-600 w-2 h-2 rounded-full inline-block p-1"></span>
            <h6 className="text-slate-500 text-sm">Updated 12 min ago</h6>
          </article>
        </span>
      </div>
      {/* Row 2 */}
      <div className="flex gap-2 items-center">
        <div className="flex gap-2 items-center">
          <span className="flex gap-2 items-center">
            <MdLockOutline size={17} className="text-slate-500" />
            <h1 className="text-sm font-semibold text-black">Limited Access</h1>
            <MdKeyboardArrowRight size={20} className="text-slate-500" />
          </span>
          <span className="flex items-center gap-1 py-4 border-l-2 border-slate-400"></span>
          <span className="flex -space-x-1.5 rtl:space-x-reverse">
            <img
              className="w-8 h-8 object-cover border-2 border-white rounded-full dark:border-gray-800"
              src={PicTwo}
              alt="pic1"
            ></img>
            <img
              className="w-8 h-8 border-2 object-cover border-white rounded-full dark:border-gray-800"
              src={PicOne}
              alt="pic2"
            ></img>
            <img
              className="w-8 h-8 object-cover border-2 border-white rounded-full dark:border-gray-800"
              src={PicThree}
              alt="pic3"
            ></img>
            <img
              className="w-8 h-8 object-cover border-2 border-white rounded-full dark:border-gray-800"
              src={PicFour}
              alt="pic4"
            ></img>
            <a
              className="flex items-center justify-center bg-primary w-8 h-8 text-xs font-medium text-white bg-gray-400 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
              href="#"
            >
              +2
            </a>
          </span>
        </div>
      </div>
    </section>
  );
};
