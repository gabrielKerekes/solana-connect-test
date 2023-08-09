# Test Solana Trezor integration

This repository is mainly meant to aid in developing the Solana Trezor integration.

## Setup

Clone trezor-suite repo:

```
git clone https://github.com/vacuumlabs/trezor-suite.git
```

Checkout whichever up-to-date branch with Solana changes:

```
git checkout solana-poc
```

Initialize trezor-suite repo:

```
yarn
```

Build libs in trezor-suite repo:

```
yarn build:libs
```

Initialize connect-web:

```
cd packages/connect-web
yarn predev
```

Run connect-web:

```
cd packages/connect-web
yarn dev
```

Initialize this repository:

```
yarn
```

Link the local connect-web package:

```
yarn link ../trezor-suite/packages/connect-web -A -r -p
```

Run the app:

```
yarn start
```

To communicate with an emulator trezor bridge needs to run on port 21324 so we need to stop the trezor bridge service:

```
launchctl unload /Library/LaunchAgents/com.bitcointrezor.trezorBridge.trezord.plist
```

_The guide is focused on mac, the steps are similar on Linux, but I don't the correct commands to stop the service and launch bridge on port 21324._

Run Trezor bridge on port 21324:

```
/Applications/Utilities/TREZOR\ Bridge/trezord -e 21324
```

Start the Trezor emulator and test the commands.

Each time you modify connect you need to rebuild it:

```
cd packages/connect && yarn build:lib
```

And then maybe you also need to relink connect-web it in this repo:

```
yarn link ../trezor-suite/packages/connect-web -A -r -p
```

I'm not sure about the last two steps because I had some issues doing this and it never worked as I'd expect :/ Stopping, rebuilding and restarting everything seemed to work though :D It might also be needed to increase the connect and connect-web versions in package.json to prevent yarn cache from caching the packages.
