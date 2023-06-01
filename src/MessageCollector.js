"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageCollector = void 0;
class MessageCollector {
    constructor(client, options) {
        this.client = client;
        this.channel = options.channel;
        this.filter = options.filter;
        this.time = options.time;
        this.messages = [];
        this.ended = false;
        this.listener = (message) => {
            if (this.channel && message.channel.id !== this.channel.id)
                return;
            if (this.filter && this.filter(message)) {
                this.messages.push(message);
                this.emit("collect", message);
            }
        };
        this.client.on("messageCreate", this.listener);
        if (this.time) {
            setTimeout(() => {
                this.stop("time");
            }, this.time);
        }
    }
    stop(reason = "nothing") {
        if (this.ended)
            return;
        this.ended = true;
        this.client.removeListener("messageCreate", this.listener);
        this.emit("end", this.messages, reason);
    }
    on(event, listener) {
        if (!this._events) {
            this._events = {};
        }
        if (!this._events[event]) {
            this._events[event] = [];
        }
        this._events[event].push(listener);
    }
    emit(event, ...args) {
        if (this._events && this._events[event]) {
            for (const listener of this._events[event]) {
                listener(...args);
            }
        }
    }
    get total() {
        return this.messages.length;
    }
    get first() {
        return this.messages[0];
    }
    get last() {
        return this.messages[this.messages.length - 1];
    }
}
exports.MessageCollector = MessageCollector;
//# sourceMappingURL=MessageCollector.js.map