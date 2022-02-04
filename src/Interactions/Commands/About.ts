// "About" Slash Command
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

import Slash from ".";
import os from "os";
import { Emoji } from "../../Utils";
import { APIEmbed, APIUser } from "discord-api-types/v9";
import { User } from "../../Database";

const getUptime = () => {
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

Slash.register("about", false, async (interaction, respond, _) => {
  const rawUser = (interaction.user || interaction.member?.user) as APIUser;
  const user = new User(rawUser);
  await user.update();

  const embed: APIEmbed = {
    color: 0x852087,
    title: "About Aerial",
    description:
      "Aerial is an [open-source](https://github.com/AerialFN) Fortnite bot, allowing you to start and manage bots on-demand, via slash commands. It consists of several databases and servers all working together to make the magic happen.",
    fields: [
      {
        name: "Component Status",
        value: `${Emoji.statusOnline} Control Plane`,
      },
    ],
    footer: {
      text: `${getUptime()} • Made with </> by andre4ik3`,
    },
  };
  respond({ embeds: [embed] });
});
