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

import {
  APIInteraction as Interaction,
  APIUser as User,
  APIApplicationCommandInteractionDataOption as Option,
} from "discord-api-types/v9";
import os from "os";

export const getEnv = (name: string) => process.env[name] || process.exit(1);
export const getUser = (i: Interaction) => (i.user || i.member?.user) as User;
export const getTypingOption = (options: Option[]) => {
  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    if ((option.type === 3 || option.type === 4) && option.focused) {
      return option;
    }
  }
};
export const getUptime = () => {
  let uptime = os.uptime();
  let prettyUptime = "Up for ";
  if (uptime > 60 * 60 * 24) {
    prettyUptime += `${Math.floor(uptime / (60 * 60 * 24))} days, `;
    uptime = uptime % (60 * 60 * 24);
  }
  if (uptime > 60 * 60) {
    prettyUptime += `${Math.floor(uptime / (60 * 60))} hours, `;
    uptime = uptime % (60 * 60);
  }
  if (uptime > 60) {
    prettyUptime += `${Math.floor(uptime / 60)} minutes, `;
    uptime = uptime % 60;
  }
  prettyUptime += `${Math.floor(uptime)} seconds`;
  return prettyUptime;
};
