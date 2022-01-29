// Slash Command Manager
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
  APIApplicationCommandInteraction as Interaction,
  APIInteractionResponse as InteractionResponse,
} from "discord-api-types/v9";
import { readdir } from "fs/promises";

type SlashCommandHandler = (_: Interaction) => Promise<InteractionResponse>;

class SlashCommandManager {
  private registeredCommands: Map<string, SlashCommandHandler>;

  constructor() {
    this.registeredCommands = new Map();
  }

  register(name: string, fn: SlashCommandHandler) {
    this.registeredCommands.set(name, fn);
  }

  async execute(interaction: Interaction): Promise<InteractionResponse> {
    const fn = this.registeredCommands.get(interaction.data.name);
    if (fn) return await fn(interaction);
    return { type: 4, data: { content: "Unknown command.", flags: 64 } };
  }
}

export default new SlashCommandManager();

readdir(__dirname).then((files) =>
  files.forEach((file) => require(`./${file}`))
);
