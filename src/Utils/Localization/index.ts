// Localization Manager
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

import { APIApplicationCommandInteraction } from "discord-api-types/v10";
import en from "./en.json";
import ru from "./ru.json";

const locales = { "en-US": en, ru };
type APILocale = APIApplicationCommandInteraction["locale"];
type Locale = keyof typeof locales;
type Key = keyof typeof en;

export const localize = (k: Key, l: APILocale) => {
  if (!(l in locales)) l = "en-US";
  return locales[l as Locale][k];
};
