import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';
import { withCircuitBreaker } from '@/lib/security/circuitBreaker';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

//Create a client with authentication required
const _base44 = createClient({
  appId,
  token,
  functionsVersion,
  serverUrl: '',
  requiresAuth: false,
  appBaseUrl
});

// Wrap with circuit breaker proxy (JACK-01)
export const base44 = new Proxy(_base44, {
  get(target, prop) {
    const value = target[prop];
    if (value && typeof value === 'object' && 'create' in value) {
      // Wrap entity stores with circuit breaker
      return new Proxy(value, {
        get(entityTarget, entityProp) {
          const entityValue = entityTarget[entityProp];
          if (typeof entityValue === 'function') {
            return (...args) => withCircuitBreaker(() => entityValue.apply(entityTarget, args), null);
          }
          return entityValue;
        }
      });
    }
    return value;
  }
});
