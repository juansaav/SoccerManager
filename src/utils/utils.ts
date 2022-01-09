import * as _ from "lodash";

export class Utils {
  public static randomInt(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  public static cleanObj(obj) {
    return _.omitBy(_.omitBy(obj, _.isNull), _.isUndefined);
  }
}
