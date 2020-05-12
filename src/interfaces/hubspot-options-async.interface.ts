import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import {HubspotOptionsInterface} from './hubspot-options.interface';
import {HubspotOptionsFactoryInterface} from './hubspot-options-factory.interface';

export interface HubspotOptionsAsyncInterface extends Pick<ModuleMetadata, 'imports'> {
    inject?: any[];
    useClass?: Type<HubspotOptionsFactoryInterface>;
    useExisting?: Type<HubspotOptionsFactoryInterface>;
    useFactory?: (...args: any[]) => Promise<HubspotOptionsInterface> | HubspotOptionsInterface;
}
