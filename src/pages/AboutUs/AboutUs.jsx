import React from 'react';
import './AboutUs.css';
import CustomAppBar from '../../componets/appbar';
import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import { commonStyles, contactUsStyles } from '../../styles/commonStyles';

export default function AboutUs() {
  const classes = commonStyles();
  const contactUsClasses = contactUsStyles();

  return (
    <CustomAppBar type="aboutUs">
      <div className="about-us-container">
        <Container className={`${classes.productShowCaseContainer} title-container`} maxWidth="xl">
        {/* Background Elements */}
        <div className={classes.bgGlow}></div>
        <div className={`${classes.floatingShape} ${classes.shapePhone} phoneShape`}></div>
        <div className={`${classes.floatingShape} ${classes.shapeTablet} tabletShape`}></div>
        <div className={`${classes.floatingShape} ${classes.shapeLaptop} laptopShape`} ></div>

        <Box className={contactUsClasses.contentWrapper}>
          <div className={contactUsClasses.textContainer}>
            <Typography
              variant="h2"
              className={`${classes.title}`}
            >
              About Us
            </Typography>

            <Typography variant="body1" className={classes.subtitle}>
              Empowering developers to build apps faster with visual tools.
            </Typography>

          </div>

        </Box>
      </Container>
        {/* <header className="about-header">
          <h1>About Us</h1>
          <p>Empowering developers to build apps faster with visual tools.</p>
        </header> */}

        <main className="about-content">
          <section>
            <h2>Our Mission</h2>
            <p>
              FlutterPilot is on a mission to simplify app development by offering a low-code, drag-and-drop interface
              built on top of Flutter. We aim to make app development accessible, fast, and powerful for developers of all levels.
            </p>
          </section>

          <section>
            <h2>What We Offer</h2>
            <ul>
              <li>🚀 Drag-and-drop UI builder for Flutter</li>
              <li>🧩 Custom widget import support</li>
              <li>🖥️ Desktop & web editor compatibility</li>
              <li>📦 Code export & real-time preview</li>
            </ul>
          </section>

          <section>
            <h2>Why Choose FlutterPilot?</h2>
            <p>
              We believe developers should spend more time on creativity and logic, and less on repetitive UI boilerplate.
              Our platform gives you speed, flexibility, and control — all in a visually intuitive interface.
            </p>
          </section>

          <section>
            <h2>Contact Details</h2>
            <div className="contact-info">
              <p><strong>📍 Address:</strong> AM Softwares, Kolikhad Farm, Modasa, Gujarat, India, 383315</p>
              <p><strong>✉️ Email:</strong> <a href="mailto:fromamsoftwares@gmail.com">fromamsoftwares@gmail.com</a></p>
            </div>
          </section>
        </main>
      </div>
    </CustomAppBar>
  );
}