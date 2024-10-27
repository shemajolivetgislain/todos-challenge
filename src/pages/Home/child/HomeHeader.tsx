import React from "react";
import { FaAngleRight } from "react-icons/fa6";

export const HomeHeader: React.FC = () => {
  return (
    <section className="w-full flex flex-col gap-4">
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
    </section>
  );
};
