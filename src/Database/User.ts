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
import { Interaction } from "httpcord";
import { DocumentReference, DocumentSnapshot } from "firebase-admin/firestore";
import { getUser as getRawUser } from "../Utils";

export async function getUser(id: string) {
  const reference = Firestore.doc(`users/${id}`);
  const snapshot = await reference.get();
  return new User(reference, snapshot);
}

class User {
  private reference: DocumentReference;
  private snapshot: DocumentSnapshot;
  private data?: DBUser;

  constructor(reference: DocumentReference, snapshot: DocumentSnapshot) {
    this.reference = reference;
    this.snapshot = snapshot;
    this.data = snapshot.data() as DBUser;
  }

  private async updateSnapshot(snapshot?: DocumentSnapshot) {
    if (snapshot) this.snapshot = snapshot;
    else this.snapshot = await this.reference.get();
    this.data = this.snapshot.data() as DBUser;
  }

  async ensureExists(data: DBUser) {
    const snapshot = await this.reference.get();
    if (snapshot.exists) return;
    await this.reference.create(data);
    await this.updateSnapshot();
  }

  private async updateReference(data: Partial<DBUser>) {
    if (data) await this.reference.update(data);
    await this.updateSnapshot();
  }

  async update(i: Interaction) {
    if (!i.isApplicationCommand()) return; // TODO: change to be more generic

    const user = getRawUser(i);
    await this.ensureExists({ type: 0, id: user.id, locale: i.locale });

    const oldData = this.data as DBUser;
    const newData: Partial<DBUser> = {};

    // Update type if it expired
    if (Date.now() > (oldData.typeExpiresAt?.toMillis() || Date.now() + 1)) {
      newData.type = 0;
      newData.typeExpiresAt = undefined;
    }

    // Update locale
    if (oldData.locale !== i.locale) newData.locale = i.locale;

    // commit
    await this.updateReference(newData);
  }
}
