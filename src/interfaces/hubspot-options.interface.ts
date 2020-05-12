import {BottleneckOptions} from 'hubspot';

export interface HubspotOptionsInterface {
    apiKey: string,
    baseUrl?: string,
    limiter?: BottleneckOptions,
}
