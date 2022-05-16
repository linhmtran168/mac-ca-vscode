# mac-ca-vs-code

Make all certificates in Keychain Access available to VS Code extensions

## Feature

This is just a very simple extensions that use some codes from [mac-ca](https://github.com/jfromaniello/mac-ca) and [win-ca](https://github.com/ukoloff/win-ca) packages.
It replaces `tls.createSecureContext` function with a custom function that load all certs from Keychain Access to the tls context. So self-signed certificates installed in the Keychain can be available to all VS Code extensions.

## Installation

Install from [here](https://marketplace.visualstudio.com/items?itemName=linhmtran168.mac-ca-vscode) or open VS Code,
hit `Ctrl+Shift+X` (Extensions pane),
search for `mac-ca-vscode` and press `Install`.

## Caveats

- After installing, a restart my required for the changes to take effect.
- Only works in MacOS, for other OS, it will do nothing.

## Credits

- [win-ca](https://github.com/ukoloff/win-ca)
- [mac-ca](https://github.com/jfromaniello/mac-ca)
