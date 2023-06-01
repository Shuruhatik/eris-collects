declare type EventListener = (...args: any[]) => void;
declare class InteractionCollector {
    private client;
    private channel?;
    private filter?;
    private time?;
    private interactions;
    private ended;
    private listener;
    private _events?;
    constructor(client: any, options: {
        channel?: any;
        filter?: (interaction: any) => boolean;
        time?: number;
    });
    stop(reason?: string): void;
    on(event: string, listener: EventListener): void;
    emit(event: string, ...args: any[]): void;
    get total(): number;
    get first(): any;
    get last(): any;
}
export { InteractionCollector };
