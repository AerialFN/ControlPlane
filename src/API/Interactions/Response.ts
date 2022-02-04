// Discord API Interaction Response
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

import API from "..";
import { APIMessage as Message } from "discord-api-types/v9";

const BASE = "/webhooks/718924404876378112/";

// Create Response
export async function createResponse(msg: Message, id: string, token: string) {
  const request = await API.post(`${BASE}/${id}/${token}`, msg);
  if (request.status === 200 && request.data) return request.data as Message;
}

// Get Response
export async function getResponse(token: string) {
  const request = await API.get(`${BASE}/${token}/messages/@original`);
  if (request.status === 200 && request.data) return request.data as Message;
}

// Edit Response
export async function editResponse(msg: Partial<Message>, token: string) {
  const request = await API.patch(`${BASE}/${token}/messages/@original`, msg);
  if (request.status === 200 && request.data) return request.data as Message;
}

// Delete Response
export async function deleteResponse(token: string) {
  await API.patch(`${BASE}/${token}/messages/@original`);
}
