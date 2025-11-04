import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// Start the service worker
worker.start({
  onUnhandledRequest: 'bypass', // Allows requests to pass through if they're not handled by MSW
});