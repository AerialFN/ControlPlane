// Messaging Manager
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

import AMQP from "amqplib";
import { getEnv, log, sleep } from "../Utils";

const url = getEnv("AMQP_ENDPOINT");

class MessagingManager {
  private connection?: AMQP.Connection;
  private channel?: AMQP.Channel;

  blocked = false;
  connected = false;
  isConnecting = false;

  constructor() {
    this.connect();
  }

  async connect() {
    if (this.isConnecting) return;
    while (!this.connected) {
      this.isConnecting = true;
      try {
        log.verbose("Attempting to connect to AMQP...");
        await this.tryConnect.apply(this);
        this.isConnecting = false;
      } catch (e) {
        log.error(`Error while connecting to AQMP: ${e}`);
        log.error("Retrying in 10 seconds");
      }
      await sleep(10000);
    }
  }

  private async tryConnect() {
    try {
      if (this.channel) await this.channel.close();
      if (this.connection) await this.connection.close();
    } catch (e) {
      log.warn(`Error whilst cleaning up connection: ${e}. Continuing.`);
    }

    this.connection = await AMQP.connect(url);

    this.connection.on("close", this.disconnect.bind(this));
    this.connection.on("error", this.disconnect.bind(this));
    this.connection.on("blocked", (() => (this.blocked = true)).bind(this));
    this.connection.on("unblocked", (() => (this.blocked = false)).bind(this));

    this.channel = await this.connection.createChannel();
    this.channel.assertQueue("jobs", { durable: true });

    this.channel.on("close", this.disconnect.bind(this));
    this.channel.on("error", this.disconnect.bind(this));

    this.connected = true;
    log.info("Connected to AMQP server and established queue.");
  }

  private async disconnect(e?: Error) {
    this.connected = false;
    log.warn(`Lost connection to AMQP - ${e?.message || "unknown"} error.`);
    await sleep(3000);
    await this.connect();
  }

  async push(msg: string) {
    if (!this.connected) await this.connect();
    this.channel?.sendToQueue("jobs", Buffer.from(msg), { persistent: true });
    log.verbose(`Pushed ${msg} to queue.`);
  }
}

export default new MessagingManager();
