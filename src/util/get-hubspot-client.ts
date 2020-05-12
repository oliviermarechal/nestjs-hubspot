import Hubspot, {ApiOptions} from 'hubspot';
import {HubspotOptionsInterface} from '../interfaces';

export function getHubspotClient(options: HubspotOptionsInterface): Hubspot {
    const clientOptions: ApiOptions = {
        apiKey: options.apiKey,
        baseUrl: options.baseUrl,
        limiter: options.limiter,
    };

    return new Hubspot(clientOptions);
}
