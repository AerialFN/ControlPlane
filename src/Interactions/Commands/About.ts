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
import Messaging from "../../Messaging";
import { APIEmbed } from "discord-api-types/v9";
import { getUser } from "../../Database";
import { Emoji, Color, getUser as getRawUser } from "../../Utils";

const messagingStatus = Messaging.connected
  ? Emoji.statusDead
  : Messaging.blocked
    ? Emoji.statusOffline
    : Emoji.statusOnline;

Slash.register("about", false, async (interaction, respond) => {
  const rawUser = getRawUser(interaction);
  getUser(rawUser.id).then((user) => user.update(interaction));

  const embed: APIEmbed = {
    color: Color.purple,
    title: "About Aerial",
    description:
      "Aerial is an [open-source](https://github.com/AerialFN) Fortnite bot, allowing you to start and manage bots on-demand, via slash commands. It consists of several databases and servers all working together to make the magic happen.",
    fields: [
      {
        name: "Component Status",
        value: `
        ${Emoji.statusOnline} Control Plane
        ${messagingStatus} Messaging Service
        `,
      },
    ],
    footer: {
      // It is against the terms of the license (and therefore Copyright law) to
      // remove or modify this text. Moreover, source code must be provided to
      // any user that asks for it, even over the network, as per the terms of
      // the GNU Affero General Public License 3.0.
      text: "Copyright © andre4ik3. Aerial is licensed under the GNU AGPL 3.0.",
    },
  };
  await respond({ embeds: [embed] });
});
