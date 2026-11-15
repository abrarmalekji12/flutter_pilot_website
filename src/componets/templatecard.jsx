import React from "react";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import TabletMacRoundedIcon from "@mui/icons-material/TabletMacRounded";
import DesktopWindowsRoundedIcon from "@mui/icons-material/DesktopWindowsRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import { templateCardStyles } from "../styles/commonStyles";
import TemplatePreview from "./TemplatePreview";
import { studioTemplateUrl } from "../utils/studioLinks";

const PLATFORM_ICONS = {
  mobile: SmartphoneRoundedIcon,
  phone: SmartphoneRoundedIcon,
  tablet: TabletMacRoundedIcon,
  desktop: DesktopWindowsRoundedIcon,
  web: LanguageRoundedIcon,
};

// Templates published before showcases only have screenshot URLs; present
// them in the same framed layout.
const legacyPresentation = (imageURLs) => {
  const shots = (Array.isArray(imageURLs) ? imageURLs : []).filter(Boolean).slice(0, 5).map((url) => ({ url, aspect: 9 / 19.5 }));
  if (!shots.length) return null;
  return { kind: "showcase", preset: shots.length === 1 ? "hero" : "fan", backdrop: "graphite", shots };
};

export default function TemplateCard({ name, description, imageURLs, templateId, presentation, platforms }) {
  const classes = templateCardStyles();
  const summary =
    typeof description === "string" && description.trim().length > 0
      ? description.trim()
      : "Ready-to-use template designed for rapid customization in FlutterPilot.";
  const preview = presentation || legacyPresentation(imageURLs);
  const platformIcons = [...new Set((platforms || []).map((p) => PLATFORM_ICONS[p]).filter(Boolean))].slice(0, 4);

  return (
    <a
      href={studioTemplateUrl(templateId)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Get started with the ${name} template`}
      className={classes.root}
    >
      <div className={classes.previewWrap}>
        {preview ? (
          <TemplatePreview presentation={preview} name={name} className={classes.preview} />
        ) : (
          <div className={`${classes.preview} ${classes.previewEmpty}`} aria-hidden="true">
            {(name || "?").trim().charAt(0).toUpperCase()}
          </div>
        )}
        {platformIcons.length > 0 && (
          <span className={classes.platformChip} aria-hidden="true">
            {platformIcons.map((Icon, i) => <Icon key={i} fontSize="inherit" />)}
          </span>
        )}
      </div>
      <div className={classes.footer}>
        <div className={classes.text}>
          <h3 className={classes.title}>{name}</h3>
          <p className={classes.description}>{summary}</p>
        </div>
        <span className={classes.cta} aria-hidden="true"><ArrowForwardRoundedIcon fontSize="small" /></span>
      </div>
    </a>
  );
}
