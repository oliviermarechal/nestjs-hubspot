import { Inject } from '@nestjs/common';
import {HubspotClientToken} from '../constants';

export function InjectHubspot() {
    return Inject(HubspotClientToken);
}
