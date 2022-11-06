import { useEffect, useState } from "react";

interface Props {
  defaultState: boolean;
  duration: number;
  exitState: boolean;
}

// a function that are similar to useState, but it receive a default state, and execution duration and that resets the original state once the duration is finished.
// should return the state, and a function that starts the execution of the timer
export default function useDelayState({ defaultState, duration }: Props) {
  const [state, setState] = useState(defaultState);

  function setStateWithDelay(startDelay = duration) {
    setState(true);
    setTimeout(() => {
      setState(false);
    }, startDelay);
  }

  useEffect(() => {
    setState(defaultState);
  }, [defaultState]);

  return [state, setStateWithDelay] as const;
}
