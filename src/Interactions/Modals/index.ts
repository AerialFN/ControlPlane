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

// TODO: everything
// This is a copy paste of component manager
// ignore everything below

import {
  APIMessageComponentInteraction as Interaction,
  APIInteractionResponse as Response, // tbd MessageComponentInteractionResponse
} from "discord-api-types/v9";
import { readdir } from "fs/promises";
import { log } from "../../Utils";

type Handler = (i: Interaction, params: string[]) => Promise<Response>;
enum Component {
  "BUTTON" = 2,
  "SELECT_MENU" = 3,
}

class ModalManager {
  private registeredComponents: Map<string, Handler> = new Map();

  register(name: string, type: Component, fn: Handler) {
    this.registeredComponents.set(`${name}::${type}`, fn);
  }

  async execute(int: Interaction): Promise<Response> {
    const data = int.data.custom_id.split("::");
    const type = int.data.component_type;
    const params = data.slice(1, data.length);
    const name = data[0];

    const fn = this.registeredComponents.get(`${name}::${type}`);
    if (fn) return await fn(int, params);
    log.warn(`Unknown modal interaction: ${name}.`);
    return { type: 4, data: { content: "Unknown component.", flags: 64 } };
  }
}

export default new ModalManager();

readdir(__dirname).then((files) =>
  files.forEach((file) => require(`./${file}`))
);
