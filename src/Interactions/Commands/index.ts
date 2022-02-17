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

import { createFollowUp, editResponse } from "../../API";
import {
  APIChatInputApplicationCommandInteraction as Interaction,
  APIInteractionResponse as Response,
  APIMessage as Message,
} from "discord-api-types/v9";
import { log, loadAll } from "../../Utils";

export type EditMessage = (_: Partial<Message>) => Promise<Message | undefined>;
export type FollowUp = (_: Message) => Promise<Message | undefined>;

type Handler = (i: Interaction, e: EditMessage, c: FollowUp) => unknown;
type MapData = { ephemeral: boolean; fn: Handler };

class SlashCommandManager {
  private registeredCommands: Map<string, MapData> = new Map();

  register(name: string, ephemeral: boolean, fn: Handler) {
    this.registeredCommands.set(name, { fn, ephemeral });
  }

  private getResponse(int: Interaction) {
    return (msg: Partial<Message>) => editResponse(msg, int.token);
  }

  private getFollowUp(int: Interaction) {
    return (msg: Message) => createFollowUp(msg, int.token);
  }

  async execute(int: Interaction): Promise<Response> {
    const registered = this.registeredCommands.get(int.data.name);
    if (registered) {
      registered.fn(int, this.getResponse(int), this.getFollowUp(int));
      return { type: 5, data: { flags: registered.ephemeral ? 64 : 0 } };
    }
    log.warn(`Unknown command interaction: ${int.data.name}.`);
    return { type: 4, data: { content: "Unknown command.", flags: 64 } };
  }
}

export default new SlashCommandManager();

loadAll(__dirname);
