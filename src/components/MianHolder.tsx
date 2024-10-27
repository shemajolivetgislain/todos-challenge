import React, { ReactNode } from "react";

interface MainHolderProps {
  children: ReactNode;
  className?: string;
}

const MainHolder: React.FC<MainHolderProps> = ({
  children,
  className = "",
}) => {
  return (
    <section
      className={`w-full min-h-full h-full px-8 py-12 bg-whiteTheme-lightAccent ${className} dark:bg-darkTheme-backgroundColor`}
    >
      {children}
    </section>
  );
};

export default MainHolder;
