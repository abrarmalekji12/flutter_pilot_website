// src/pages/Landing.js
import React from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
    title: "Design",
    url: "GIF_1.gif",
    discription:(
      <React.Fragment>
        <li>
          <strong>Clean Interface:</strong> Main canvas in the center, with a widget tree on the left and properties on the right.
        </li>
        <li>
          <strong>Drag & Drop Widgets:</strong> Add and organize components visually.
        </li>
        <li>
          <strong>Powerful Controls:</strong> Wrap, replace, or reuse widgets anytime.
        </li>
        <li>
          <strong>Code-Free:</strong> Focus on design — we handle the complexity.
        </li>
      </React.Fragment>
    ),
    alignleft: true,
  },
  {
    title: "Functions",
    url: "GIF_2.jpg",
    discription: (
      <React.Fragment>
        <li>
          <strong>Instant Edits:</strong> Wrap, replace, or remove any widget — anytime you want.
        </li>
        <li>
          <strong>Smart Variables:</strong> Create once and use them everywhere in your project.
        </li>
        <li>
          <strong>Favorites:</strong> Save your most-used widgets and drop them into new projects instantly.
        </li>
        <li>
          <strong>Seamless APIs:</strong> Connect APIs with just a few clicks.
        </li>
      </React.Fragment>
    ),
    alignleft: false,
  },
  {
    title: "Make it Responsive!",
    url: "GIF_3.jpg",
    discription: (
      <React.Fragment>
        <li>
          <strong>One Function, Full Power:</strong> Use <code>res()</code> to make your design responsive — instantly.
        </li>
        <li>
          <strong>Desktop, Tablet, Mobile:</strong> Pass arguments for each screen size, and Flutter Pilot adapts automatically.
        </li>
        <li>
          <strong>Zero Hassle:</strong> Forget writing endless media queries — <code>res()</code> does the heavy lifting.
        </li>
      </React.Fragment>
    ),
    alignleft: true,
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
        <Container maxWidth="maxWidthXl">
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