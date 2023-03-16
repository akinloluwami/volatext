import { useEffect } from "react";
import { useRouter } from "next/router";
import { initGA, logPageView } from "../utils/analytics";

const GoogleAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    logPageView();
    router.events.on("routeChangeComplete", logPageView);
    return () => {
      router.events.off("routeChangeComplete", logPageView);
    };
  }, [router.events]);

  return <></>;
};

export default GoogleAnalytics;
