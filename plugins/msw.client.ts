import { worker } from '~/mocks/browser';

export default defineNuxtPlugin(async () => {
  if (process.env.NODE_ENV === 'development') {
    await worker.start({ onUnhandledRequest: 'bypass' });
  }
});
