// "Start" Slash Command
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

Slash.register("start", true, async (interaction, respond) => {
  const rawUser = getRawUser(interaction);
  getUser(rawUser.id).then((user) => user.update(interaction));
  console.log(Messaging.connected, Messaging.blocked);
  if (rawUser.id !== "406856161015627835")
    return respond({ content: "Can't do that yet!" });
});
