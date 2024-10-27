import { useEffect, useState } from "react";
import ActionButton from "../components/buttons/ActionButton";
import { IoMoonOutline } from "react-icons/io5";
import { CiLight } from "react-icons/ci";
import LanguageBar from "./child/LanguageBar";
// import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
// import { setLanguageChange } from "../app/features/actionSlice";
import { IoIosNotificationsOutline } from "react-icons/io";
import picTwo from "../assets/pics/picOne.jpg";
import { flagLanguages } from "../constants/flagLanguage";
import {
  setTranslation,
  setIsLanguapePopMenuOpen,
} from "../app/features/translationSlice";
import { FaAngleDown } from "react-icons/fa";

const ActionBar: React.FC = () => {
  //   const { t } = useTranslation();
  const dispatch = useDispatch();
  //   const languageChange = useSelector(
  //     (state: any) => state.todosActions.languageChange
  //   );
  const { defaultLanguage, translationlanguage, isLanguapePopMenuOpen } =
    useSelector((state: any) => state.translation);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("theme");
    return savedMode === "dark";
  });
  useEffect(() => {
    dispatch(setTranslation(flagLanguages));
  }, [dispatch]);

  const currentLanguage = translationlanguage.find(
    (lang: any) => lang.code === defaultLanguage
  );

  const toggleThemeMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  //   const handleLanguageChange = () => {
  //     dispatch(setLanguageChange(!languageChange));
  //   };

  return (
    <>
      <div className="flex gap-3 items-center">
        <div className="flex flex-col gap-5 items-center space-y-3">
          <div
            className="flex items-center gap-4 relative cursor-pointer"
            onClick={() => {
              dispatch(setIsLanguapePopMenuOpen(!isLanguapePopMenuOpen));
            }}
          >
            <img
              src={currentLanguage?.icon}
              alt="flag"
              className="w-6 h-6 rounded-full"
            />
            <span className=" flex items-center gap-2 text-black dark:text-white">
              <p className="text-sm">{currentLanguage?.name}</p>
              <FaAngleDown />
            </span>
          </div>
          {isLanguapePopMenuOpen && <LanguageBar />}
        </div>
        <ActionButton onClick={toggleThemeMode}>
          {darkMode ? (
            <CiLight
              className="text-whiteTheme-primaryColor dark:text-darkTheme-textColor"
              size={21}
            />
          ) : (
            <IoMoonOutline
              className="text-whiteTheme-primaryColor dark:text-darkTheme-textColor"
              size={21}
            />
          )}
        </ActionButton>
        <ActionButton className="">
          <div className="relative">
            <IoIosNotificationsOutline
              size={22}
              className="text-whiteTheme-primaryColor dark:text-darkTheme-textColor"
            />
            <span className="absolute top-1 right-2 grid min-h-[6px] min-w-[6px] translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-red-600 py-1 px-1 text-xs text-white"></span>
          </div>
        </ActionButton>

        <img
          src={picTwo}
          alt=""
          className="w-11 h-11 rounded-full object-fit"
        />
      </div>
    </>
  );
};

export default ActionBar;
