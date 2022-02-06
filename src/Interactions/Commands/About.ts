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
import { Emoji, getUser as getRawUser, getUptime } from "../../Utils";
import { APIEmbed } from "discord-api-types/v9";
import { getUser } from "../../Database";

Slash.register("about", false, async (interaction, respond) => {
  const rawUser = getRawUser(interaction);
  getUser(rawUser.id).then((user) => user.update(interaction));

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
  await respond({ embeds: [embed] });
});
