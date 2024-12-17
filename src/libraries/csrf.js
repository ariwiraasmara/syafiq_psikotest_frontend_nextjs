import { simpleNextCSRF } from "simple-next-csrf";

const { csrfEnjector, csrfValidator } = simpleNextCSRF({
  secret: "hello-world",
  // your secret from environment variable
});

export { csrfEnjector, csrfValidator };
