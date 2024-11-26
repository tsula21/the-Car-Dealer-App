export interface Car {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}
export interface Car2 {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}

export const truncateText = (text: string, maxLength = 20) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};
