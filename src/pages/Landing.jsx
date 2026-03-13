// src/pages/Landing.js
import React from "react";
import { Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import CustomAppBar from "../componets/appbar";
import ProductShowcase from "../componets/productshowcase";
import FeatureShowcase from "../componets/featurediscription";
import NewsletterSubscription from "../componets/newslattersubscription";

const useStyles = makeStyles((theme) => ({
  section: {
    // padding: theme.spacing(8, 2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4, 2),
    },
  },
  hero: {
    textAlign: "center",
    padding: theme.spacing(10, 2),
    background: "linear-gradient(45deg, #4A154B 30%, #1B486D 90%)",
    color: "#fff",
    borderRadius: "0 0 40px 40px",
  },
  heroTitle: {
    fontWeight: "bold",
    fontSize: "3rem",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  heroSubtitle: {
    fontSize: "1.25rem",
    maxWidth: "600px",
    margin: "0 auto",
  },
}));

const featurelist = [
  {
    title: "AI UI Scaffolding",
    url: "ai_generation_feature.png",
    discription: (
      <React.Fragment>
        <li>
          <strong>Prompt to Layout:</strong> Generate beautiful UI layouts and screen structures using simple text prompts.
        </li>
        <li>
          <strong>Automated Screens:</strong> Quickly create screens, dialogs, and bottom sheets to kickstart your project.
        </li>
        <li>
          <strong>Figma Import:</strong> Bring your Figma designs into the editor and convert them into basic Flutter code.
        </li>
      </React.Fragment>
    ),
    alignleft: false,
    isVideo: false
  },
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
    title: "API & Data Integration",
    url: "GIF_2.jpg",
    discription: (
      <React.Fragment>
        <li>
          <strong>Postman Imports:</strong> Load your API structures easily by importing Postman JSON collections.
        </li>
        <li>
          <strong>Direct Testing:</strong> Test your API endpoints within the platform to verify data responses.
        </li>
        <li>
          <strong>Simplified Integration:</strong> Connect APIs to your UI with minimal code using our pre-built methods.
        </li>
      </React.Fragment>
    ),
    alignleft: false,
    isVideo: false
  },
  {
    title: "Real-time Preview",
    url: "GIF_3.jpg",
    discription: (
      <React.Fragment>
        <li>
          <strong>Instant Rendering:</strong> See your changes reflected in the preview in real-time as you design.
        </li>
        <li>
          <strong>High-Fidelity Preview:</strong> Navigate through your screens to check the look and feel of your application.
        </li>
        <li>
          <strong>Device Preview:</strong> Test your design directly inside the platform or on your mobile device.
        </li>
      </React.Fragment>
    ),
    alignleft: true,
    isVideo: false
  },
  {
    title: "Code & Expressions",
    url: "GIF_2.jpg",
    discription: (
      <React.Fragment>
        <li>
          <strong>Dart Expressions:</strong> Use Dart logic for properties like width, padding, and colors for dynamic layouts.
        </li>
        <li>
          <strong>Live Code Feedback:</strong> Get instant suggestions and error highlights while writing custom Dart code.
        </li>
        <li>
          <strong>Flutter Code Export:</strong> Export the generated Flutter code for your screens, including navigation and API calls.
        </li>
      </React.Fragment>
    ),
    alignleft: false,
    isVideo: false
  },
  {
    title: "Collaboration & Tools",
    url: "GIF_3.jpg",
    discription: (
      <React.Fragment>
        <li>
          <strong>Team Collaboration:</strong> Work together with other team members on the same project in real-time.
        </li>
        <li>
          <strong>Change Tracking:</strong> Use the built-in commit system to keep track of your project's progress.
        </li>
        <li>
          <strong>Reduced Boilerplate:</strong> Focus on your app's unique logic while we handle the repetitive UI code.
        </li>
      </React.Fragment>
    ),
    alignleft: true,
    isVideo: false
  },
];

export default function Landing() {
  const classes = useStyles();

  return (
    <CustomAppBar type="home">
      <React.Fragment>
        {/* Hero Section */}
        {/* <motion.div
          className={classes.hero}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" className={classes.heroTitle}>
            Build Flutter UIs Faster
          </Typography>
          <Typography variant="body1" className={classes.heroSubtitle}>
            A powerful visual editor for Flutter — drag, drop, and customize widgets with ease.
          </Typography>
        </motion.div> */}

        {/* Product Showcase */}
        <motion.div
          className={classes.section}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <ProductShowcase />
        </motion.div>

        {/* Features */}
        <Container maxWidth="xl">
          {featurelist.map((e, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: e.alignleft ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <FeatureShowcase
                title={e.title}
                url={e.url}
                discription={e.discription}
                alignleft={e.alignleft}
                index={index}
                isVideo={e.isVideo}
              />
            </motion.div>
          ))}
        </Container>

        {/* Newsletter */}
        <motion.div
          className={classes.section}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <NewsletterSubscription />
        </motion.div>
      </React.Fragment>
    </CustomAppBar>
  );
}