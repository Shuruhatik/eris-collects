type MessageListener = (message: any) => void;
type EventListener = (...args: any[]) => void;

class MessageCollector {
  private client: any;
  private channel?: any;
  private filter?: (message: any) => boolean;
  private time?: number;
  private messages: any[];
  private ended: boolean;
  private listener: MessageListener;
  private _events?: { [event: string]: EventListener[] };

  constructor(client: any, options: { channel?: any; filter?: (message: any) => boolean; time?: number }) {
    this.client = client;
    this.channel = options.channel;
    this.filter = options.filter;
    this.time = options.time;
    this.messages = [];
    this.ended = false;

    this.listener = (message) => {
      if (this.channel && message.channel.id !== this.channel.id) return;
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

  stop(reason = "nothing"): void {
    if (this.ended) return;
    this.ended = true;
    this.client.removeListener("messageCreate", this.listener);
    this.emit("end", this.messages, reason);
  }

  on(event: string, listener: EventListener): void {
    if (!this._events) {
      this._events = {};
    }
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push(listener);
  }

  emit(event: string, ...args: any[]): void {
    if (this._events && this._events[event]) {
      for (const listener of this._events[event]) {
        listener(...args);
      }
    }
  }

  get total(): number {
    return this.messages.length;
  }

  get first(): any {
    return this.messages[0];
  }

  get last(): any {
    return this.messages[this.messages.length - 1];
  }
}

export { MessageCollector };