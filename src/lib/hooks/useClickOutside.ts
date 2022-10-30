import { RefObject, useEffect } from "react";

export default function useClickOutside(
  ref: RefObject<HTMLElement>,
  callback: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
) {
  useEffect(
    () => {
      const listener = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return;
        }
        callback(event);
      };
      document.addEventListener("mousedown", listener as any);
      document.addEventListener("touchstart", listener as any);
      return () => {
        document.removeEventListener("mousedown", listener as any);
        document.removeEventListener("touchstart", listener as any);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, callback]
  );
}
