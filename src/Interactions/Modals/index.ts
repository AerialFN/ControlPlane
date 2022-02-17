// Modal Manager
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
  APIModalSubmitInteraction as Interaction,
  APIInteractionResponse as Response,
} from "discord-api-types/v9";
import { log, loadAll } from "../../Utils";

type Handler = (i: Interaction, params: string[]) => Promise<Response>;

class ModalManager {
  private registeredComponents: Map<string, Handler> = new Map();

  register(name: string, fn: Handler) {
    this.registeredComponents.set(name, fn);
  }

  async execute(int: Interaction): Promise<Response> {
    const data = int.data.custom_id.split("::");

    const params = data.slice(1, data.length);
    const name = data[0];

    const fn = this.registeredComponents.get(name);
    if (fn) return await fn(int, params);

    log.warn(`Unknown modal interaction: ${name}.`);
    return { type: 4, data: { content: "Unknown modal.", flags: 64 } };
  }
}

export default new ModalManager();
loadAll(__dirname);
