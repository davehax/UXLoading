# UXLoading
Blockout elements with a loading message

Adds "UXLoading" to the window namespace.

Plain JS, no dependencies.

IE10+, Modern browser compatible.

## Usage

UXLoading.**show**(_selector_ [ , _title_ = 'Loading', _message_ = '' ]);

Will blockout an element and show what you specify

```JavaScript
UXLoading.show('.ajax-component', 'Fetching data', 'Give us a sec, mate');
```

- selector - Mandatory. Must be a valid CSS selector
- title - Optional
- message - Optional

***
UXLoading.**hide**(_selector_);

```JavaScript
UXLoading.hide('.ajax-component');
```

- selector - Mandatary. Must be a valid CSS selector

***
UXLoading.**hideAll**();

Hides all current messages

```JavaScript
UXLoading.hideAll();
```
