// ACP Entry Point
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

import Express from "express";
import { RawBody, Ed25519, JSONBody } from "./Middleware";

const app = Express();
app.use(RawBody, Ed25519, JSONBody);

app.post("/", async (request, response) => {
  if (request.body.type === 1) {
    // discord ping making sure server is alive
    return response.json({ type: 1 }).send();
  } else if (request.body.type === 2) {
    // slash command
    return response
      .json({ type: 4, data: { content: "Hello, world!" } })
      .send();
  }
});

app.get("/", (req, res) => {
  return res.status(200).send("Hello, world!");
});

app.listen(process.env.PORT || 5000);