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

import NaCl from "tweetnacl";
import { Request, Response, NextFunction } from "express";
import { getEnv, log } from "../Utils";

const PUBLIC_KEY = getEnv("PUBLIC_KEY");

export const Ed25519 = (req: Request, res: Response, next: NextFunction) => {
  if (PUBLIC_KEY === "DISABLE_VERIFICATION") return next(); // local development

  const signature = req.get("X-Signature-Ed25519");
  const timestamp = req.get("X-Signature-Timestamp");
  const body = req.body;

  if (!signature || !timestamp || !body) {
    return res.status(401).end("Unauthorized");
  }

  const isVerified = NaCl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, "hex"),
    Buffer.from(PUBLIC_KEY, "hex")
  );

  if (!isVerified) {
    res.status(401).end("Unauthorized");
    const ip = req.header("CF-Connecting-IP") || req.header("X-Forwarded-For");
    log.warn(`Denied unauthorized request from ${ip || req.ip}`);
    log.warn(`User-Agent: ${req.header("User-Agent")}`);
    return;
  }

  log.verbose("Successfully verified request");
  next(); // all is good, continue
};
