// Discord API Interaction Follow-Up
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

// Create Follow-Up Message
export async function createFollowUp(msg: Message, token: string) {
  const request = await API.post(`${BASE}/${token}`);
  if (request.status === 200 && request.data) return request.data as Message;
}

// Get Follow-Up Message
export async function getFollowUp(id: string, token: string) {
  const request = await API.get(`${BASE}/${token}/messages/${id}`);
  if (request.status === 200 && request.data) return request.data as Message;
}

// Edit Follow-Up Message
export async function editFollowUp(
  id: string,
  msg: Partial<Message>,
  token: string
) {
  const request = await API.patch(`${BASE}/${token}/messages/${id}`, msg);
  if (request.status === 200 && request.data) return request.data as Message;
}

// Delete Follow-Up Message
export async function deleteFollowUp(id: string, token: string) {
  await API.delete(`${BASE}/${token}/messages/${id}`);
}
