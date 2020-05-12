import {DynamicModule, Global, Module, Provider} from '@nestjs/common';
import {HubspotOptionsAsyncInterface, HubspotOptionsFactoryInterface, HubspotOptionsInterface} from './interfaces';
import {HubspotClientToken, HubspotModuleOptions} from './constants';
import {getHubspotClient} from './util';

@Global()
@Module({})
export class HubspotModule {
    static forRoot(hubspotOptions: HubspotOptionsInterface): DynamicModule {
        return {
            module: HubspotModule,
            providers: [
                {provide: 'HUBSPOT_API_KEY', useValue: hubspotOptions.apiKey},
                {
                    provide: HubspotClientToken,
                    useValue: getHubspotClient(hubspotOptions)
                },
            ],
            exports: [
                {
                    provide: HubspotClientToken,
                    useValue: getHubspotClient(hubspotOptions)
                }
            ]
        }
    }

    static forRootAsync(hubspotOptions: HubspotOptionsAsyncInterface): DynamicModule {
        const hubspotProvider: Provider = {
            inject: [HubspotModuleOptions],
            provide: HubspotClientToken,
            useFactory: (options: HubspotOptionsInterface) => {
                return getHubspotClient(options);
            },
        };

        return {
            exports: [hubspotProvider],
            imports: hubspotOptions.imports,
            module: HubspotModule,
            providers: [...this.createAsyncProviders(hubspotOptions), hubspotProvider],
        };
    }

    private static createAsyncProviders(options: HubspotOptionsAsyncInterface): Provider[] {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }

        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
            },
        ];
    }

    private static createAsyncOptionsProvider(
        options: HubspotOptionsAsyncInterface,
    ): Provider {
        if (options.useFactory) {
            return {
                inject: options.inject || [],
                provide: HubspotModuleOptions,
                useFactory: options.useFactory,
            };
        }

        return {
            inject: [options.useExisting || options.useClass],
            provide: HubspotModuleOptions,
            useFactory: (optionsFactory: HubspotOptionsFactoryInterface) => optionsFactory.createHubspotOptions(),
        };
    }
}
