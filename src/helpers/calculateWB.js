import arms from "../database/cgArms";
import trimTable from "../database/takeoffTrim";

const calculate = (values, actions) => {
  // Step 1.: Calculate totalWeight both in lbs and kg

  // helper function for creating new object with multiplied values
  function objectMap(object, mapFn) {
    return Object.keys(object).reduce((result, key) => {
      result[key] = mapFn(object[key]);
      return result;
    }, {});
  }

  //parseInt for input values to avoid strings
  const parsedInt = objectMap(values, value => {
    return parseInt(value);
  });

  // convert submitted lbs values to kg
  const convertedKg = objectMap(values, value => {
    return value * 0.453592;
  });

  //calculate total weight in kg and lbs

  const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);

  const totalWeightkg = sumValues(convertedKg).toFixed(0);
  const totalWeightlbs = sumValues(parsedInt).toFixed(0);

  // set aboveMTWO check flag

  const aboveMTWO = totalWeightkg > 8150;

  // Step 2.: Calculate the cg moments and final cg arm

  //create array with the associated cg arms
  const cgArms = Object.keys(convertedKg).map(item => {
    if (item !== "fuel") {
      return { [item]: arms[item] };
    } else {
      const fuelAmount = Math.ceil(convertedKg.fuel / 20) * 20;
      return { fuel: arms.fuel[fuelAmount] };
    }
  });

  //create object out of cg arms array
  const cgArmsObject = cgArms.reduce((obj, item) => {
    var keys = Object.keys(item);
    obj[keys[0]] = item[keys[0]];
    return obj;
  }, {});

  function multiplyObjects(object, multiplier, mapFn) {
    return Object.keys(object).reduce((result, key) => {
      result[key] = mapFn(object[key], multiplier[key]);
      return result;
    }, {});
  }

  // calculate moments (=weight * cg arms) in kg and save in momentsKG object
  const momentsKG = multiplyObjects(
    convertedKg,
    cgArmsObject,
    (value, multiplier) => {
      return value * multiplier;
    }
  );

  //calculate total moments in kg and lbs and total cg arm

  const totalMomentskg = sumValues(momentsKG);
  const totalCGArm = totalMomentskg / totalWeightkg;

  //Calculate the %MAC as final result

  const macIndex = (((totalCGArm - 6.72) * 100) / 2.05).toFixed(2);

  //Reference takeoffTrim from databse according to MAC index

  const findTakeoffTrim = macIndex => {
    var macIndicator = Math.ceil(macIndex / 3) * 3;
    if (macIndicator < 19) {
      return trimTable[19];
    } else if (macIndicator > 42) {
      return trimTable[42];
    } else {
      return trimTable[macIndicator];
    }
  };

  var takeOffTrim = {};

  takeOffTrim = findTakeoffTrim(macIndex);

  // Return final results

  const results = {
    macIndex,
    totalWeightkg,
    totalWeightlbs,
    takeOffTrim,
    aboveMTWO
  };

  return results;
};

export default calculate;
