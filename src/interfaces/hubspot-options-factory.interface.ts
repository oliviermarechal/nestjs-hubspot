import {HubspotOptionsInterface} from './hubspot-options.interface';

export interface HubspotOptionsFactoryInterface {
    createHubspotOptions(): Promise<HubspotOptionsInterface> | HubspotOptionsInterface;
}
