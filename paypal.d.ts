// paypal.d.ts
export {};

declare global {
  interface Window {
    paypal: any;
  }
}
