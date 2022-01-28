// Ed25519 Middleware
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

import { Request, Response } from "express";
import NaCl from "tweetnacl";

const PUBLIC_KEY = process.env.PUBLIC_KEY || process.exit(1);

export const Ed25519 = (req: Request, res: Response, next: Function) => {
  const signature = req.get("X-Signature-Ed25519");
  const timestamp = req.get("X-Signature-Timestamp");
  const body = req.body;

  if (!signature || !timestamp || !body) {
    return res.status(401).end("Unauthorized");
  }

  const isVerified = NaCl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature!, "hex"),
    Buffer.from(PUBLIC_KEY, "hex")
  );

  if (!isVerified) return res.status(401).end("Unauthorized");

  next(); // all is good, continue
};
