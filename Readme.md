Eris Collectors
===
**eris-collects** is a package that provides utility classes for collecting interactions and messages in the Eris library. It simplifies the process of collecting and managing interactions and messages from specific channels with customizable filters and time limits.

<div align="center">
    <p>
		<a href="https://bio.shuruhatik.com/" target="_blank"><img src="https://i.imgur.com/0Vm4FRF.png" width="212" height="44" alt="Powered by Shuruhatik"/></a>
	</p>
</div>

## Installation

You can install the **eris-collects** package using npm:
```bash
npm install eris-collects
```

## Usage
Here is an example of how to use the **eris-collects** package to create an interaction collector:

```javascript
const { InteractionCollector } = require('eris-collects');

// Create an instance of the collector
const collector = new InteractionCollector(client, {
  channel: channel, // The channel to collect interactions from
  filter: (interaction) => interaction.data.name === 'ping', // Optional filter function
  time: 60000 // Optional time limit in milliseconds
});

// Listen for the 'collect' event
collector.on('collect', (interaction) => {
  console.log(`Collected interaction ${interaction.id}`);
});

// Listen for the 'end' event
collector.on('end', (interactions, reason) => {
  console.log(`Collector ended. Collected ${interactions.length} interactions. Reason: ${reason}`);
});

// Stop the collector manually
collector.stop("reason");
```

## API
### `new InteractionCollector(client, options)`

Creates a new instance of the InteractionCollector.
- `client` (required): The Eris client instance.
- `options` (required): An object containing the following properties:
  - `channel` (optional): The channel to collect interactions from.
  - `filter` (optional): A function that acts as a filter for the collected interactions. Only interactions that pass the filter will be collected.
  - `time` (optional): The time limit in milliseconds. The collector will automatically stop after the specified time.

### `collector.on(event, listener)`
Adds an event listener to the collector.
- `event`: The name of the event to listen for. Supported events:
  - `'collect'`: Emitted when an interaction is collected. The listener receives the collected interaction as an argument.
  - `'end'`: Emitted when the collector ends. The listener receives the collected interactions and the reason for ending as arguments.
- `listener`: The function to be called when the event is emitted.

### `collector.stop([reason])`
Stops the collector manually.
- `reason` (optional): The reason for stopping the collector. Defaults to `"nothing"`.

### `collector.emit(event, ...args)`
Emits an event with optional arguments.
- `event`: The name of the event to emit.
- `args`: Optional arguments to pass to the event listeners.

### `collector.total`
A read-only property that returns the total number of collected interactions.

### `collector.first`
A read-only property that returns the first collected interaction.

### `collector.last`
A read-only property that returns the last collected interaction.


## MessageCollector
The `MessageCollector` class allows you to collect messages from a specific channel.

### Usage
Here is an example of how to use the `MessageCollector` class:

```javascript
const { MessageCollector } = require('eris-collects');

// Create an instance of the collector
const collector = new MessageCollector(client, {
  channel: channel, // The channel to collect messages from
  filter: (message) => message.content.includes('hello'), // Optional filter function
  time: 60000 // Optional time limit in milliseconds
});

// Listen for the 'collect' event


collector.on('collect', (message) => {
  console.log(`Collected message ${message.id}`);
});

// Listen for the 'end' event
collector.on('end', (messages, reason) => {
  console.log(`Collector ended. Collected ${messages.length} messages. Reason: ${reason}`);
});

// Stop the collector manually
collector.stop();
```

### API
The `MessageCollector` class provides the same methods and properties as the `InteractionCollector` class. Please refer to the `InteractionCollector` API documentation for more details.

## Sponsors 
- Love what I do? Send me some [coffee](https://buymeacoff.ee/shuruhatik) !?  ☕
- Can't send coffees?   Your support will help me to continue working on open-source projects like this.  🙏😇

## Help
If you don't understand something in the documentation, you are experiencing problems, or you just need a gentle
nudge in the right direction, please don't hesitate to join our official [Discord Server](https://dsc.gg/shuruhatik) .


## License
Refer to the [LICENSE](LICENSE) file.
