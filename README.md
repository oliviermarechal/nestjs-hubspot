<p align="center">
  <h3 align="center">
    nestjs-hubspot
  </h3>

  <p align="center">
    Injectable Hubspot client for your nestjs projects
  </p>
</p>

## Table Of Contents

- [About](#about)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## About

`nestjs-hubspot` implements a module, `HubspotModule`, which when imported into
your nestjs project provides a Hubspot client to any class that injects it.

## Installation

```bash
npm install --save nestjs-stripe
```

## Getting Started

The simplest way to use `nestjs-hubspot` is to use `HubspotModule.forRoot`

```typescript
import { Module } from '@nestjs-common';
import { HubspotModule } from 'nestjs-hubspot';

@Module({
  imports: [
    HubspotModule.forRoot({
      apiKey: 'my_secret_key',
    }),
  ],
})
export class AppModule {}
```

You can then inject the Stripe client into any of your injectables by using a
custom decorator

```typescript
import { Injectable } from '@nestjs/common';
import { InjectHubspot } from 'nestjs-stripe';
import Hubspot from 'hubspot';

@Injectable()
export class AppService {
  public constructor(
    @InjectHubspot() private readonly hubspotClient: Hubspot,
  ) {}
}
```

Asynchronous setup is also supported

```typescript
import { Module } from '@nestjs-common';
import { HubspotModule } from 'nestjs-hubspot';

@Module({
  imports: [
    HubspotModule.forRootAsync({
      // inject: [ConfigService], with configService
      useFactory: (/* configService: ConfigService */) => ({
        apiKey: process.env.API_KEY, // configService.get('stripe_key'),
      }),
    }),
  ],
})
export class AppModule {}
```

## Example

In order to run the example run the following commands in your terminal. The
expected output of the example is to show that the Stripe client was
successfully injected into the `AppService`.

```bash
cd example
yarn install
yarn start
```

## Contributing

I would greatly appreciate any contributions to make this project better. Please
make sure to follow the below guidelines before getting your hands dirty.

1. Fork the repository
2. Create your branch (`git checkout -b my-branch`)
3. Commit any changes to your branch
4. Push your changes to your remote branch
5. Open a pull request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- [nestjs](https://nestjs.com)
- [hubspot-node](https://github.com/MadKudu/node-hubspot)

Copyright &copy; 2020 Maréchal Olivier
