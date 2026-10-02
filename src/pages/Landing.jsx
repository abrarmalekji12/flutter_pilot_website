// src/pages/Landing.js
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import CustomAppBar from "../componets/appbar";
import PromptGeneratorHero from "../componets/promptgeneratorhero";
import ProductShowcase from "../componets/productshowcase";
import FeatureShowcase from "../componets/featurediscription";
import PartnerSolutionSpotlight from "../componets/PartnerSolutionSpotlight";
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
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import DesignServicesRoundedIcon from "@mui/icons-material/DesignServicesRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";

const featurelist = [
  {
    title: "Visual Design & AI Editing",
    url: "/productShowCase2.mp4",
    poster: "/flutterpilot_ss.webp",
    subtitle: "Generate the first draft with AI, then refine every widget in the visual Studio.",
    badge: "Design",
    badgeIcon: <DesignServicesRoundedIcon fontSize="small" />,
    heroMedia: true,
    isVideo: true,
  },
  {
    title: "Comprehensive Tooling",
    subtitle: "Everything you need to design, connect, and ship — in one workspace.",
    badge: "Studio stack",
    badgeIcon: <ConstructionRoundedIcon fontSize="small" />,
    tone: "dark",
    featureGrid: true,
    items: [
      {
        icon: <ChatRoundedIcon fontSize="small" />,
        title: "Project-Aware AI Copilot",
        description: "Create screens, components, variables, and endpoints through a conversation grounded in your project.",
      },
      {
        icon: <DashboardCustomizeRoundedIcon fontSize="small" />,
        title: "Figma Import",
        description: "Bring design structure into the Studio, then continue with visual editing and Flutter-aware controls.",
      },
      {
        icon: <CodeRoundedIcon fontSize="small" />,
        title: "Own the Flutter Source",
        description: "Export the complete Flutter project when you are ready to continue in your own development workflow.",
      },
      {
        icon: <ApiRoundedIcon fontSize="small" />,
        title: "REST & Postman",
        description: "Create and test REST endpoints, import Postman collections, and bind responses to the UI.",
      },
      {
        icon: <LanguageRoundedIcon fontSize="small" />,
        title: "One-Click Web Deploy",
        description: "Deploy a hosted Flutter web app from the Studio and share the live URL immediately.",
      },
      {
        icon: <AndroidRoundedIcon fontSize="small" />,
        title: "Cloud-Built Android APK",
        description: "Request an installable Android build without leaving the Studio.",
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
    title: "From Prototype to Real App",
    subtitle:
      "Add the data, behavior, state, testing, and version history a real Flutter project needs.",
    badge: "Platform",
    badgeIcon: <DevicesRoundedIcon fontSize="small" />,
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
        title: "Connected Data",
        description:
          "Work with Google Sheets, REST APIs, Firebase, Supabase, or local collections from one Studio.",
      },
      {
        icon: <StorageRoundedIcon fontSize="small" />,
        title: "Data Panel",
        description:
          "Design schemas, manage rows, generate realistic samples, and build offline-first flows.",
      },
      {
        icon: <TouchAppRoundedIcon fontSize="small" />,
        title: "Actions & State",
        description:
          "Define navigation, conditions, state updates, dialogs, and device behavior with visual flows.",
      },
      {
        icon: <DevicesRoundedIcon fontSize="small" />,
        title: "Cross-Platform",
        description:
          "Preview and test your app on mobile, tablet, and desktop viewports in real time.",
      },
      {
        icon: <GroupsRoundedIcon fontSize="small" />,
        title: "Versioned Team Workflow",
        description:
          "Use commit-based version control, cloud sync, and project sharing to coordinate changes.",
      },
    ],
    isVideo: false,
  },
];

export default function Landing() {
  const common = commonStyles();
  const location = useLocation();
  const navigate = useNavigate();

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
              poster={e.poster}
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
              badgeIcon={e.badgeIcon}
              tone={e.tone}
            />
          </section>
        ))}

        {/* Partner Solution — an independent product from our network. Placed after
            FlutterPilot's own capabilities and before the Studio CTA on purpose. */}
        <motion.section
          className={common.responsiveContainer}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        >
          <PartnerSolutionSpotlight />
        </motion.section>

        <motion.section
          className={common.responsiveContainer}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        >
          <div className={common.studioCta}>
            <div className={common.studioCtaCopy}>
              <span className={common.studioCtaEyebrow}>Ready when you are</span>
              <h2 className={common.studioCtaTitle}>Turn the idea into a working Flutter project</h2>
              <p className={common.studioCtaText}>
                This site helps you explore FlutterPilot. The actual building happens in FlutterPilot Studio—where
                you generate, edit, connect, preview, and export your app.
              </p>
              <div className={common.studioCtaMeta} aria-label="FlutterPilot platform availability">
                <span className={common.studioCtaMetaItem}>
                  <LanguageRoundedIcon aria-hidden="true" /> Browser-based Studio
                </span>
                <span className={common.studioCtaMetaItem}>
                  <DevicesRoundedIcon aria-hidden="true" /> Desktop and mobile apps
                </span>
                <span className={common.studioCtaMetaItem}>
                  <CodeRoundedIcon aria-hidden="true" /> Exportable Flutter source
                </span>
              </div>
            </div>
            <div className={common.studioCtaActions}>
              <Button
                className={common.studioCtaPrimary}
                endIcon={<ArrowForwardRoundedIcon />}
                onClick={() => window.open("https://studio.flutterpilot.com", "_blank", "noopener,noreferrer")}
              >
                Open FlutterPilot Studio
              </Button>
              <Button
                className={common.studioCtaSecondary}
                startIcon={<MenuBookRoundedIcon />}
                onClick={() => navigate("/docs")}
              >
                Explore product guide
              </Button>
            </div>
          </div>
        </motion.section>

      </main>
    </CustomAppBar>
  );
}
