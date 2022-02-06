// Interaction Manager
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
  APIInteraction as Interaction,
  APIInteractionResponse as Response,
  APIChatInputApplicationCommandInteraction as ChatInput,
} from "discord-api-types/v9";
import SlashCommandManager from "./Commands";
import ComponentManager from "./Components";
import AutocompleteManager from "./Autocompletes";

class InteractionManager {
  private slash = SlashCommandManager;
  private component = ComponentManager;
  private complete = AutocompleteManager;

  async execute(interaction: Interaction): Promise<Response> {
    if (interaction.type === 1) {
      return { type: 1 };
    } else if (interaction.type === 2 && interaction.data.type === 1) {
      return await this.slash.execute(interaction as ChatInput);
    } else if (interaction.type === 3) {
      return await this.component.execute(interaction);
    } else if (interaction.type === 4) {
      return await this.complete.execute(interaction);
    } else {
      return { type: 4, data: { content: "Unknown interaction.", flags: 64 } };
    }
  }
}

export default new InteractionManager();
