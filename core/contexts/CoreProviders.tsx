import { providers } from '../../src/data/contexts';
import { combineProviders } from './combineProviders';

export const CoreProviders = combineProviders(...providers);
