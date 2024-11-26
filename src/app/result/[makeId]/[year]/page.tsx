import React, { Suspense } from "react";
import { Car } from "@/types/Cars";

async function fetchPosts(makeId: string, year: string) {
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );
  const data = await response.json();
  return data;
}

async function CarModels({ makeId, year }: { makeId: string; year: string }) {
  const models = await fetchPosts(makeId, year);

  return (
    <div className={`${models.Results?.length == 0 && "flex justify-center"}`}>
      {models.Results?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
          {models.Results?.map((car: Car, index: number) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  {car.Make_Name}
                </h3>
                <p className="text-gray-600 mt-2 text-center">
                  {car.Model_Name}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative text-center p-6 bg-blue-100 text-blue-700 rounded-lg shadow-md w-full sm:w-96">
          <p className="text-xl font-semibold">Nothing to display</p>
          <p className="text-gray-600 mt-2">Try a different make or year.</p>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-t-blue-100 border-l-transparent border-r-transparent"></div>
        </div>
      )}
    </div>
  );
}

export default async function Page({ params }: any) {
  const { makeId, year } = await params;

  return (
    <div className="p-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#fff] text-center mb-6">
        Find the Best Deals by {year}
      </h2>

      {/* Wrap the component that fetches data with Suspense */}
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <CarModels makeId={makeId} year={year} />
      </Suspense>
    </div>
  );
}
