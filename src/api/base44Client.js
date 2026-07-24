import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

//Create a client with authentication required
export const base44 = createClient({
  appId: appId || 'standalone',
  token,
  functionsVersion,
  serverUrl: '',
  requiresAuth: false,
  appBaseUrl: appBaseUrl || ''
});

const isStandalone = !appId && !appBaseUrl;

// Disable SDK analytics tracking to prevent 405 errors on standalone deployments
if (base44.analytics) {
  try {
    base44.analytics.cleanup();
    base44.analytics.track = () => {};
  } catch (e) {
    // Ignore cleanup errors
  }
}

// In standalone mode without a Base44 backend URL, return dummy promises immediately
if (isStandalone && base44.entities) {
  base44.entities = new Proxy(base44.entities, {
    get() {
      return {
        list: async () => [],
        filter: async () => [],
        get: async () => null,
        create: async (data) => ({ id: "local", ...data }),
        update: async (id, data) => ({ id, ...data }),
        delete: async () => true,
      };
    }
  });
}
