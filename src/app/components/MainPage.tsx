"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Car2, truncateText } from "@/types/Cars";

const MainPage = () => {
  const [carArr, setCarArr] = useState<Car2[] | null>(null);
  const [makeId, setMakeId] = useState<string>(""); // State for Make ID
  const [selectedYear, setSelectedYear] = useState<string>(""); // State for selected year

  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    // Function to fetch car makes data
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
        );
        const res = await response.json();
        setCarArr(res?.Results);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };
    fetchData(); // Call the function
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Selectors */}
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-8 items-center justify-center">
        {/* Select Make */}

        <select
          name="cars"
          id="cars"
          className="w-full sm:w-[300px] cursor-pointer text-black block rounded-md border-gray-300 bg-white py-2 pl-3 pr-10 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          defaultValue=""
          onChange={(e) => setMakeId(e.target.value)}
        >
          <option value="" disabled>
            Select a car make
          </option>
          {carArr?.map((car, index) => (
            <option key={index} value={car.MakeId} className="text-black">
              {truncateText(car.MakeName, 25)}{" "}
            </option>
          ))}
        </select>

        {/* Select Year */}
        <select
          name="cars"
          id="cars"
          className={`w-full sm:w-[300px] text-black block rounded-md border-gray-300 bg-white py-2 pl-3 pr-10 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            makeId ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          defaultValue=""
          disabled={!makeId}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="" disabled>
            Select Year
          </option>
          {[...Array(10)].map((_, i) => {
            const year = 2015 + i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>

      {/* Button Next */}
      <div className="flex justify-center mt-6">
        <button
          className={`w-full sm:w-24 py-2 px-4 rounded-md transition-colors ${
            !makeId || !selectedYear
              ? "bg-gray-400 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={!makeId || !selectedYear}
          onClick={() => router.push(`/result/${makeId}/${selectedYear}`)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MainPage;
