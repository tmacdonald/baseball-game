import { useRef, useEffect } from "react";

export default function useInterval(
  callback: (...args: any[]) => void,
  delay: number
) {
  const savedCallback = useRef<(...args: any[]) => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
