import * as _ from "lodash";
const countryCodes = require("country-codes-list");

enum PrismaError {
  P2025 = "P2025",
  P2002 = "P2002",
}

export class ErrorHandler {
  public static update(res, err) {
    // Prisma error
    let code = 500;
    let msg;
    if (err.code) {
      switch (err.code) {
        case 401:
          code = 401;
          break;
        case 404:
        case PrismaError.P2025:
          code = 404;
          break;
        case PrismaError.P2002:
          code = 400;
          msg = "Duplicate key " + err?.meta?.target[0];
          break;
        default:
          break;
      }
    }
    let log = "Error ";
    if (msg) {
      console.log(log + " " + code + " " + msg);
      res.status(code).send(msg);
    } else {
      console.log(log + " " + code);
      res.sendStatus(code);
    }
  }
}
