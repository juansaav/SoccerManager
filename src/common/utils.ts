import * as _ from "lodash";
const countryCodes = require("country-codes-list");

export class Utils {
  public static countryCodes = countryCodes.customList(
    "countryCode",
    "{countryNameEn}"
  );

  public static randomInt(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  public static cleanObj(obj) {
    return _.omitBy(_.omitBy(obj, _.isNull), _.isUndefined);
  }

  public static validCountry(countryCode) {
    return this.countryCodes[countryCode];
  }
}
