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
import { getEnv, log } from "../Utils";

const hostname = getEnv("AMQP_HOSTNAME");
const username = getEnv("AMQP_USERNAME");
const password = getEnv("AMQP_PASSWORD");

class MessagingManager {
  private connection?: AMQP.Connection;
  private channel?: AMQP.Channel;

  async connect() {
    this.connection = await AMQP.connect({ username, password, hostname });
    this.channel = await this.connection.createChannel();
    this.channel.assertQueue("jobs", { durable: true });
    log.info("Connected to AMQP server and established queue.");
  }

  async push(msg: string) {
    if (!this.connection) await this.connect();
    this.channel?.sendToQueue("jobs", Buffer.from(msg), { persistent: true });
    log.verbose(`Pushed ${msg} to queue.`);
  }
}

export default new MessagingManager();
