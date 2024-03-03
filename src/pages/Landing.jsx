import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomAppBar from "../componets/appbar";
import ProductShowcase from "../componets/productshowcase";
import FeatureShowcase from "../componets/featurediscription";
import NewsletterSubscription from "../componets/newslattersubscription";

const featurelist = [
  {
    title: "Design",
    url: "GIF_1.gif",
    discription:
      "Flutter Pilot has a straightforward interface where the main UI is in the center and on the left side there is a widget tree on the right side, you will see the properties of the selected component. you can add widgets by simply dragging & dropping them. and do replace, wrap, and a lot more handy operations.",
    alignleft: true,
  },
  {
    title: "Functions",
    url: "GIF_2.jpg",
    discription: (
      <text>
        • Wrap, replace and remove any widget in the tree anytime.
        <br />
        • Create variables and use them everywhere <br />
        • Save favorite widgets and reuse them in any project. <br />
        • Create Apis
      </text>
    ),
    alignleft: false,
  },
  {
    title: "Make it Responsive!",
    url: "GIF_3.jpg",
    discription:
      "you can use res() function which takes two or three arguments, first for the desktop screen, second for the tablet screen, and third (if you want to) for mobile size.",
    alignleft: true,
  },
];

export default function Landing() {
  return (
    <>
      <CustomAppBar />
      <ProductShowcase />
      {featurelist.map((e) => {
        return (
          <FeatureShowcase
            title={e.title}
            url={e.url}
            discription={e.discription}
            alignleft={e.alignleft}
          />
        );
      })}
      <NewsletterSubscription />
    </>
  );
}
