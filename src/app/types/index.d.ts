/* eslint-disable @typescript-eslint/consistent-type-definitions */

import { TSecret } from "./secret";

declare global {
  namespace Express {
    interface Request {
      secret: TSecret;
    }
  }
}
