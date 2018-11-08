# ngx-steem-keychain

This package contains an Angular service for easy communication
with [Steem Keychain](https://github.com/MattyIce/steem-keychain) browser extension.

Every method available on the global `steem_keychain` object
is wrapped so that an observable is returned.

## Installation

```
npm install --save @steeveproject/ngx-steem-keychain
```

## Example

```typescript
export class FoobarComponent {

    constructor(
        private steemKeychain: SteemKeychainService
    ) { }

    doKeychainHandshake(): Observable<Response> {
        return this.steemKeychain.requestHandshake();
    }
}
```

## Documentation

In this case code is the best documentation since the module is pretty small.

Please check `src/steem-keychain.service.ts` for all available methods.

## Authors

@tchap created this package when working on [Steeve](https://www.steeve.app).

## License

This package is MIT-licensed.

## Credits

[angular-library-started](https://github.com/robisim74/angular-library-starter)
was used to bootstrap this package.
