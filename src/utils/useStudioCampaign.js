import { useLocation } from "react-router-dom";
import { routes } from "../seo/seo";
import { campaignForPath } from "./studioLinks";

const knownPaths = routes.map((route) => route.path);

// The utm_campaign for Studio links on the current page.
export default function useStudioCampaign() {
  const { pathname } = useLocation();
  return campaignForPath(pathname, knownPaths);
}
