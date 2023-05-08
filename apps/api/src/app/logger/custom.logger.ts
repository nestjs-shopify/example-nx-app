import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends Logger {
  // /**
  //  * Write an 'error' level log.
  //  */
  // error(message: any, ...optionalParams: [...any, string?, string?]): void {
  //     // any
  //     super.error(message, ...optionalParams);
  // }
  // /**
  //  * Write a 'warn' level log.
  //  */
  // warn(message: any, ...optionalParams: [...any, string?, string?]): void {
  //     // any
  //     super.warn(message, ...optionalParams);
  // }
  // /**
  //  * Write a 'debug' level log.
  //  */
  // debug(message: any, ...optionalParams: [...any, string?, string?]): void {
  //     // any
  //     super.debug(message, ...optionalParams);
  // }
  // /**
  //  * Write a 'verbose' level log.
  //  */
  // verbose(message: any, ...optionalParams: [...any, string?, string?]): void {
  //     // any
  //     super.verbose(message, ...optionalParams);
  // }
}
