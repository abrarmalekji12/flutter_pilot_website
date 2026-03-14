// src/pages/Landing.js
import React from "react";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import CustomAppBar from "../componets/appbar";
import PromptGeneratorHero from "../componets/promptgeneratorhero";
import ProductShowcase from "../componets/productshowcase";
import FeatureShowcase from "../componets/featurediscription";

const useStyles = makeStyles((theme) => ({
  section: {
    width: "90%",
    maxWidth: "1500px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      width: "94%",
      marginTop: theme.spacing(3),
    },
  },
}));

const featurelist = [
  {
    title: "Visual Design & AI Editing",
    url: "dragAndDrop.mov",
    discription: (
      <React.Fragment>
        <li>
          <strong>Easy Drag & Drop:</strong> Customize your UI visually with our intuitive drag-and-drop builder.
        </li>
        <li>
          <strong>AI Screen Generation:</strong> Add new screens or custom components using AI prompts or build them from scratch.
        </li>
        <li>
          <strong>Pre-built Widgets:</strong> Use a library of ready-to-use Flutter components to speed up your design process.
        </li>
      </React.Fragment>
    ),
    alignleft: true,
    isVideo: true
  },
  {
    title: "Comprehensive Tooling",
    noMedia: true,
    discription: (
      <React.Fragment>
        <li>
          <strong>Conversational Editing:</strong> Instruct the AI to tweak styles, add components, or redesign screens by just typing.
        </li>
        <li>
          <strong>Figma Conversion:</strong> Bring your Figma designs directly into the editor without complex setup to generate code.
        </li>
        <li>
          <strong>Ready-to-Ship Code:</strong> Export clean, production-ready Flutter code with organized file structures.
        </li>
        <li>
          <strong>One-Click APK:</strong> Generate an installable Android APK natively from your workspace.
        </li>
      </React.Fragment>
    ),
    alignleft: false,
    isVideo: false
  }
];

export default function Landing() {
  const classes = useStyles();

  return (
    <CustomAppBar type="home">
      <main>
        {/* AI Prompt Section */}
        <motion.section
          className={classes.section}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <PromptGeneratorHero />
        </motion.section>

        {/* Hero Section */}
        <motion.section
          className={classes.section}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <ProductShowcase />
        </motion.section>

        {/* Features Section - Each feature is a consistent section */}
        {featurelist.map((e, index) => (
          <section className={classes.section} key={index}>
            <FeatureShowcase
              title={e.title}
              url={e.url}
              discription={e.discription}
              alignleft={e.alignleft}
              index={index}
              isVideo={e.isVideo}
              noMedia={e.noMedia}
            />
          </section>
        ))}

      </main>
    </CustomAppBar>
  );
}
