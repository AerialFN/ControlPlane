// Miscellaneous Helpers
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

import { APIApplicationCommandInteractionDataOption as Option } from "discord-api-types/v9";
import { Interaction, User } from "httpcord";
import { log } from "./Logging";
import { readdir } from "fs/promises";
import { join } from "path";

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
export const getUser = (i: Interaction) => (i.user || i.member?.user) as User;
export const loadAll = (d: string, e = ".js") => {
  readdir(d).then((files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.endsWith(e)) require(join(d, file));
    }
  });
};
export const getEnv = (name: string): string => {
  if (process.env[name]) return process.env[name] as string;
  log.error(`Environment variable ${name} not found!`);
  process.exit(1);
};
export const getTypingOption = (options: Option[]) => {
  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    if ((option.type === 3 || option.type === 4) && option.focused) {
      return option;
    }
  }
};
