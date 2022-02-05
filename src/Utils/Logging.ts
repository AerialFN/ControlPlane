// Logging Manager
// Copyright (C) 2022  andre4ik3
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

export class LoggingManager {
  constructor() {
    process.on("uncaughtException", this.uncaughtExceptionHandler);
    process.on("unhandledRejection", this.unhandledRejectionHandler);
  }

  private uncaughtExceptionHandler(e: Error) {
    console.error(`Uncaught Exception: ${e.name}`);
    console.error(e.message);
    console.error(e.stack);
  }

  private unhandledRejectionHandler(r: unknown, p: Promise<unknown>) {
    console.error(`Unhandled Rejection: ${p}`);
    console.error(r);
  }
}
