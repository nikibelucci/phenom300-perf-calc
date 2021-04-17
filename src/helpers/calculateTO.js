import { takeoffData } from "../database/takeoffData";

const calculate = (elev, totalWeight, temp) => {
  //1. Define indexes for database query: elevation, totalWeight, temeperature

  const elevationIndex = Math.ceil(elev / 1000) * 1000;

  var totalWeightIndex = "";

 // console.log(totalWeight);

  if (totalWeight <= 14000) {
    totalWeightIndex = "14000";
  } else if (14000 < totalWeight && totalWeight <= 14800) {
    totalWeightIndex = "14800";
  } else if (14800 < totalWeight && totalWeight <= 15600) {
    totalWeightIndex = "15600";
  } else if (15600 < totalWeight && totalWeight <= 16400) {
    totalWeightIndex = "16400";
  } else if (16400 < totalWeight && totalWeight <= 17200) {
    totalWeightIndex = "17200";
  } else if (17200 < totalWeight && totalWeight <= 18387) {
    totalWeightIndex = "18387";
  } else if (totalWeight > 18387) {
    totalWeightIndex = "18387";
  }

  const tempIndex = Math.ceil(temp / 5) * 5;

  //2. Lookup value in takeoff Database

 // console.log(`Query with ${elevationIndex},${totalWeightIndex},${tempIndex} `);

  var result = takeoffData[elevationIndex][totalWeightIndex][tempIndex]
    ? {
        rwy: takeoffData[elevationIndex][totalWeightIndex][tempIndex].rwy,
        v1: takeoffData[elevationIndex][totalWeightIndex][tempIndex].vs.split(
          "/"
        )[0],
        vr: takeoffData[elevationIndex][totalWeightIndex][tempIndex].vs.split(
          "/"
        )[1],
        v2: takeoffData[elevationIndex][totalWeightIndex][tempIndex].vs.split(
          "/"
        )[2]
      }
    : "No data found";

  // Return final results
/*   console.log(
    `Result for ${elevationIndex},${totalWeightIndex},${tempIndex}`,
    result
  ); */

  return result;
};

export default calculate;
