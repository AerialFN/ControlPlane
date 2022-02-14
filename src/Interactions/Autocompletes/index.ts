// Autocomplete Manager
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
  APIApplicationCommandAutocompleteInteraction as Interaction,
  APIApplicationCommandAutocompleteResponse as Response,
  APIApplicationCommandOptionChoice as Choice,
} from "discord-api-types/v9";
import { readdir } from "fs/promises";
import { getTypingOption, log } from "../../Utils";

type Handler = (i: Interaction) => Promise<Choice<string>[]> | Choice<string>[];
const noCompletions: Choice[] = [
  {
    name: "No completions available.",
    value: "autocomplete_unavailable",
  },
];

class AutocompleteManager {
  private registeredCompletes: Map<string, Handler> = new Map();

  register(commandName: string, argName: string, fn: Handler) {
    this.registeredCompletes.set(`${commandName}::${argName}`, fn);
  }

  async execute(int: Interaction): Promise<Response> {
    const focusedOption = getTypingOption(int.data.options);
    if (!focusedOption) return { type: 8, data: { choices: noCompletions } };

    const name = `${int.data.name}::${focusedOption.name}`;
    const fn = this.registeredCompletes.get(name);
    if (fn) return { type: 8, data: { choices: await fn(int) } };
    log.warn(`Unknown autocomplete interaction: ${name}.`);
    return { type: 8, data: { choices: noCompletions } };
  }
}

export default new AutocompleteManager();

readdir(__dirname).then((files) =>
  files.forEach((file) => require(`./${file}`))
);
