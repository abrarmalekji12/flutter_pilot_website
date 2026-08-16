// src/pages/Landing.js
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import CustomAppBar from "../componets/appbar";
import PromptGeneratorHero from "../componets/promptgeneratorhero";
import ProductShowcase from "../componets/productshowcase";
import FeatureShowcase from "../componets/featurediscription";
import { commonStyles } from "../styles/commonStyles";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import ApiRoundedIcon from "@mui/icons-material/ApiRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import AndroidRoundedIcon from "@mui/icons-material/AndroidRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import TableChartRoundedIcon from "@mui/icons-material/TableChartRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import TouchAppRoundedIcon from "@mui/icons-material/TouchAppRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

const featurelist = [
  {
    title: "Visual Design & AI Editing",
    url: "visual_edit_preview.mp4",
    subtitle: "Drag, drop, and prompt your way to a polished UI — no code required.",
    heroMedia: true,
    isVideo: true,
  },
  {
    title: "Comprehensive Tooling",
    subtitle: "Everything you need to design, connect, and ship — in one workspace.",
    featureGrid: true,
    items: [
      {
        icon: <ChatRoundedIcon fontSize="small" />,
        title: "Conversational Editing",
        description: "Tweak styles, add screens, or redesign layouts by just typing to the AI.",
      },
      {
        icon: <DashboardCustomizeRoundedIcon fontSize="small" />,
        title: "Figma Conversion",
        description: "Import Figma designs and instantly generate clean, editable Flutter code.",
      },
      {
        icon: <CodeRoundedIcon fontSize="small" />,
        title: "Export Flutter Code",
        description: "Download production-ready code anytime — no lock-in, fully yours.",
      },
      {
        icon: <ApiRoundedIcon fontSize="small" />,
        title: "Integrate Endpoints",
        description: "Connect REST APIs and wire data to your UI components with ease.",
      },
      {
        icon: <LanguageRoundedIcon fontSize="small" />,
        title: "Share as Web App",
        description: "Instantly share your web-app link with everyone — live updates in real-time.",
      },
      {
        icon: <AndroidRoundedIcon fontSize="small" />,
        title: "One-Click APK",
        description: "Generate an installable Android APK natively from your workspace.",
      },
      // {
      //   icon: <AppleIcon fontSize="small" />,
      //   title: "iOS App Builder",
      //   description: "Build and preview your Flutter projects natively on iOS devices.",
      // },
    ],
    isVideo: false,
  },
  {
    title: "Built for Real Apps",
    subtitle:
      "From data management to team workflows — everything you need to build production-ready Flutter apps.",
    badge: "Platform",
    featureGrid: true,
    items: [
      {
        icon: <AutoAwesomeRoundedIcon fontSize="small" />,
        title: "AI Project Creator",
        description:
          "Bootstrap a multi-screen app from a single sentence — AI handles screens, navigation, and structure.",
      },
      {
        icon: <TableChartRoundedIcon fontSize="small" />,
        title: "Google Sheets",
        description:
          "Connect any Google Sheet and turn spreadsheet data into a live, interactive Flutter UI.",
      },
      {
        icon: <StorageRoundedIcon fontSize="small" />,
        title: "Local Data",
        description:
          "Build offline-first apps with on-device storage, AI-assisted schemas, and auto migrations.",
      },
      {
        icon: <TouchAppRoundedIcon fontSize="small" />,
        title: "Actions Builder",
        description:
          "Define navigation, dialogs, conditions, and device features with visual logic flows.",
      },
      {
        icon: <DevicesRoundedIcon fontSize="small" />,
        title: "Cross-Platform",
        description:
          "Preview and test your app on mobile, tablet, and desktop viewports in real time.",
      },
      {
        icon: <GroupsRoundedIcon fontSize="small" />,
        title: "Team Collaboration",
        description:
          "Commit-based version control and shared editing for seamless multi-user workflows.",
      },
    ],
    isVideo: false,
  },
];

export default function Landing() {
  const common = commonStyles();
  const location = useLocation();

  // When redirected here from /download (or with a #download hash), scroll to
  // the download/product showcase section once the page has rendered.
  useEffect(() => {
    const wantsDownload =
      location.state?.scrollTo === "download" || location.hash === "#download";
    if (!wantsDownload) return;

    const scrollToDownload = () => {
      const el = document.getElementById("download");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    // Defer to the next frame so the lazily-rendered section is in the DOM.
    const timer = setTimeout(scrollToDownload, 100);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <CustomAppBar type="home">
      <main>
        {/* AI Prompt Section */}
        <motion.section
          className={common.responsiveContainer}
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
        >
          <PromptGeneratorHero />
        </motion.section>

        {/* Hero Section / Download Section */}
        <motion.section
          id="download"
          className={common.responsiveContainer}
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
        >
          <ProductShowcase />
        </motion.section>
        {/* Features Section - Each feature is a consistent section */}
        {featurelist.map((e, index) => (
          <section className={common.responsiveContainer} key={index}>
            <FeatureShowcase
              title={e.title}
              url={e.url}
              subtitle={e.subtitle}
              discription={e.discription}
              alignleft={e.alignleft}
              index={index}
              isVideo={e.isVideo}
              noMedia={e.noMedia}
              heroMedia={e.heroMedia}
              featureGrid={e.featureGrid}
              items={e.items}
              badge={e.badge}
            />
          </section>
        ))}

      </main>
    </CustomAppBar>
  );
}
