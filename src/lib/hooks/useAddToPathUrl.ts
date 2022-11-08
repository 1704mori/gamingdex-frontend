import { useState } from "react";

export default function useAddToPathUrl() {
  const [url, setUrl] = useState<string>(
    window.history.state?.url || window.location.pathname
  );

  const addToPathUrl = (path: string) => {
    setUrl(path);
    window.history.replaceState(
      { ...window.history.state, as: path, url: path },
      "",
      path
    );
  };

  return [url, addToPathUrl as (path: string) => void] as const;
}
