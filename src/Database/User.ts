// Firebase User
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

import Firestore from ".";
import { User as DBUser } from "./Types";
import { APIUser } from "discord-api-types/v9";
import { DocumentReference, DocumentSnapshot } from "firebase-admin/firestore";

export class User {
  private doc: DocumentReference;
  private currentUser: APIUser;
  private currentLocale: string;
  private snapshot?: DocumentSnapshot;
  public data?: DBUser;

  constructor(discordUser: APIUser, locale: string) {
    this.doc = Firestore.doc(`users/${discordUser.id}`);
    this.currentUser = discordUser;
    this.currentLocale = locale;
  }

  // Ensures the user exists in the database
  private async ensureExists() {
    const snapshot = await this.doc.get();
    if (!snapshot.exists) {
      await this.doc.create({
        id: this.currentUser.id,
        locale: this.currentLocale,
        type: 0,
      } as DBUser);
    }
  }

  async fetch() {
    await this.ensureExists();
    this.snapshot = await this.doc.get();
    this.data = this.snapshot.data() as DBUser;
    return this.data;
  }

  async update() {
    const newUser = await this.fetch();

    // Update type if it expired
    if (Date.now() > (newUser.typeExpiresAt?.toMillis() || Date.now() + 1)) {
      newUser.type = 0;
      newUser.typeExpiresAt = undefined;
    }

    // Update locale
    if (this.currentLocale) newUser.locale = this.currentLocale;

    // commit
    await this.doc.update(newUser);
  }
}
