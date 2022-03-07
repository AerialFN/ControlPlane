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

import interactions from "..";
import Messaging from "../../Messaging";
import { APIEmbed } from "discord-api-types/v9";
import { getUser } from "../../Database";
import { Emoji, Color, getUser as getRawUser, localize } from "../../Utils";

const messagingStatus = () =>
  Messaging.connected
    ? Messaging.blocked
      ? Emoji.statusDegraded // AMQP online but is overloaded
      : Emoji.statusOnline // AMQP online and working fine
    : Emoji.statusDead; // AMQP offline/disconnected

interactions.slash.register(
  { name: "about", description: "Information about the bot" },
  async (interaction) => {
    const rawUser = getRawUser(interaction);
    getUser(rawUser.id).then((user) => user.update(interaction));

    const embed: APIEmbed = {
      color: Color.purple,
      title: localize("about_title", interaction.locale),
      description: localize("about_description", interaction.locale),
      fields: [
        {
          name: localize("about_status", interaction.locale),
          value: `
        ${Emoji.statusOnline} ${localize("acp", interaction.locale)}
        ${messagingStatus()} ${localize("messaging", interaction.locale)}
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
    await interaction.respond({ embeds: [embed] });
  }
);
