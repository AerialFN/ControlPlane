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

import interactions from "..";
import { getUser } from "../../Database";
import { getUser as getRawUser } from "../../Utils";

// The moment this is registered all hell will be set loose so to avoid burning
// servers it is currently commented out

// interactions.slash.register(
//   { name: "start", description: "Create a bot" },
//   async (interaction) => {
//     const rawUser = getRawUser(interaction);
//     getUser(rawUser.id).then((user) => user.update(interaction));
//     await interaction.respond("Not yet!");
//   }
// );
