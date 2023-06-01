type InteractionListener = (interaction: any) => void;
type EventListener = (...args: any[]) => void;

class InteractionCollector {
  private client: any;
  private channel?: any;
  private filter?: (interaction: any) => boolean;
  private time?: number;
  private interactions: any[];
  private ended: boolean;
  private listener: InteractionListener;
  private _events?: { [event: string]: EventListener[] };

  constructor(client: any, options: { channel?: any; filter?: (interaction: any) => boolean; time?: number }) {
    this.client = client;
    this.channel = options.channel;
    this.filter = options.filter;
    this.time = options.time;
    this.interactions = [];
    this.ended = false;

    this.listener = (interaction) => {
      if (this.channel && interaction.channel.id !== this.channel.id) return;
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

  stop(reason = "nothing"): void {
    if (this.ended) return;
    this.ended = true;
    this.client.removeListener("interactionCreate", this.listener);
    this.emit("end", this.interactions, reason);
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
    return this.interactions.length;
  }

  get first(): any {
    return this.interactions[0];
  }

  get last(): any {
    return this.interactions[this.interactions.length - 1];
  }
}

export { InteractionCollector };
