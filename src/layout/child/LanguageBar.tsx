import { IoCaretUpSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  setDefaultLanguage,
  setIsLanguapePopMenuOpen,
} from "../../app/features/translationSlice";
import { useTranslation } from "react-i18next";

interface Language {
  code: string;
  icon: string;
  name: string;
}

const LanguageBar: React.FC = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { defaultLanguage, translationlanguage } = useSelector(
    (state: any) => state.translation
  );

  // Filter out the default language
  const filteredLanguages = translationlanguage.filter(
    (lang: Language) => lang.code !== defaultLanguage
  );

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="absolute flex flex-col items-center z-[100000000] text-whiteTheme-greenAccent">
      <div className="mt-4">
        <IoCaretUpSharp size={25} className="w-fit" />
      </div>
      <div className="flex flex-col gap-2 bg-whiteTheme-greenAccent text-black px-6 py-3 rounded -mt-2 ">
        {filteredLanguages.map((lang: Language) => (
          <span
            key={lang.code}
            className="flex items-center gap-2 py-2 cursor-pointer"
            onClick={() => {
              dispatch(setDefaultLanguage(lang.code));
              dispatch(setIsLanguapePopMenuOpen(false));
              changeLanguage(lang.code);
            }}
          >
            <img
              src={lang.icon}
              alt={`${lang.name} flag`}
              className="w-5 h-5 rounded-full"
            />
            <h1 className="text-sm">{lang.name}</h1>
          </span>
        ))}
      </div>
    </div>
  );
};

export default LanguageBar;
