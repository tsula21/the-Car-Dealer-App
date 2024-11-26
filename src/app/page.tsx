import MainPage from "./components/MainPage";

export default function Home() {
  return (
    <div className=" flex  justify-center items-center h-screen ">
      <div className="bg-black bg-opacity-40 backdrop-blur-lg  mx-5 md:mx-0  p-8 rounded-xl shadow-2xl">
        <h2 className="text-2xl sm:text-4xl font-bold text-[#fff] text-center mb-6">
          The Car Dealer App
        </h2>

        <MainPage />
      </div>
    </div>
  );
}
