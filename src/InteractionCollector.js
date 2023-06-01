"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionCollector = void 0;
class InteractionCollector {
    constructor(client, options) {
        this.client = client;
        this.channel = options.channel;
        this.filter = options.filter;
        this.time = options.time;
        this.interactions = [];
        this.ended = false;
        this.listener = (interaction) => {
            if (this.channel && interaction.channel.id !== this.channel.id)
                return;
            if (this.filter && this.filter(interaction)) {
                this.interactions.push(interaction);
                this.emit("collect", interaction);
            }
        };
        this.client.on("interactionCreate", this.listener);
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
        this.client.removeListener("interactionCreate", this.listener);
        this.emit("end", this.interactions, reason);
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
        return this.interactions.length;
    }
    get first() {
        return this.interactions[0];
    }
    get last() {
        return this.interactions[this.interactions.length - 1];
    }
}
exports.InteractionCollector = InteractionCollector;
//# sourceMappingURL=InteractionCollector.js.map