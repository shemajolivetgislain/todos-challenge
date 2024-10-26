import { Link } from "react-router-dom";
import { navLinks } from "../constants/navLinks";
import { useLocation } from "react-router-dom";
import { FC } from "react";
import { IoMdAdd } from "react-icons/io";

const SideBar: FC = () => {
  const { pathname } = useLocation();

  return (
    <section className="min-h-screen flex flex-col gap-16 h-screen w-[10vh] shadow-sm bg-whiteTheme-backgroundColor dark:bg-darkTheme-primaryColor dark:border-r-2 dark:border-darkTheme-borderColor">
      <header className="p-3">
        <img src={navLinks.logo} alt="Logo" className="w-10 h-10" />
      </header>
      <main className="h-full flex flex-col justify-between">
        <nav>
          <ul className="flex flex-col gap-3">
            {navLinks.links.map((link, index) => (
              <li
                key={index}
                className={`${
                  pathname === link.path
                    ? "bg-purple-50 border-l-4 border-whiteTheme-primaryColor text-whiteTheme-primaryColor dark:bg-purple-950 dark:text-darkTheme-textColor"
                    : "text-whiteTheme-accentColor"
                } p-3`}
              >
                <Link
                  to={link.path}
                  title={link.name}
                  className="custom-tooltip"
                >
                  <link.icon size={23} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Images */}
        <div className="flex flex-col gap-2 pl-2">
          {navLinks.imageSideBar.map((image, index) => (
            <img
              key={index}
              src={image.name}
              alt="image"
              className="border border-whiteTheme-primaryColor/20 rounded-full h-8 w-8 object-cover  relative flex items-center justify-center gap-2.5 lg:my-1 duration-300 ease-in-out bg-white hover:bg-whiteTheme-primaryColor hover:text-whiteTheme-secondColor"
            />
          ))}

          <span
            className="border rounded-full flex 
          items-center justify-center p-2 cursor-pointer w-8 h-8
          hover:bg-purple-50 hover:text-whiteTheme-primaryColor dark:text-darkTheme-textColor dark:hover:bg-darkTheme-backgroundColor"
          >
            <IoMdAdd size={15} />
          </span>
        </div>
        <footer className="py-7 border-t-2 border-purple-100">
          <ul className="flex flex-col gap-6">
            {navLinks.footerLinks.map((link, index) => (
              <li
                key={index}
                className={`${
                  pathname === link.path
                    ? "bg-purple-50 border-l-4 border-whiteTheme-primaryColor text-whiteTheme-primaryColor"
                    : "text-whiteTheme-accentColor"
                } px-3`}
              >
                <Link
                  to={link.path}
                  title={link.name}
                  className="custom-tooltip"
                >
                  <link.icon size={23} />
                </Link>
              </li>
            ))}
          </ul>
        </footer>
      </main>
    </section>
  );
};

export default SideBar;
