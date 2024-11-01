import NotFoundImage from "../assets/images/404page.svg";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center  dark:bg-darkTheme-backgroundColor h-screen w-full">
      <h1 className="text-whiteTheme-primaryColor font-semibold text-2xl">
        Page you are looking for, not found!
      </h1>
      <img src={NotFoundImage} className="w-[30rem]" alt="Not found Image" />
    </div>
  );
};

export default NotFound;
