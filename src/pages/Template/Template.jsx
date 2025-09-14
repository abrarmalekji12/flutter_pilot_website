import React, { useEffect, useState } from 'react'
import CustomAppBar from '../../componets/appbar';
import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { commonStyles } from '../../styles/commonStyles';
import { fetchTemplates } from '../../utils/firebaseconfig';
import { collection, getDocs } from "firebase/firestore";
import { db,storage, auth} from "../../utils/firebaseconfig";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { ref, getDownloadURL } from "firebase/storage";
import { useScroll } from 'framer-motion';
import TemplateCard from '../../componets/templatecard';
import TemplateCardSkeleton from '../../componets/templatecardskeleton';

const templateStyles = makeStyles((theme) => ({
  contentWrapper: {
    // position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 2,
    // display:"flex",
    // flexDirection:"column",
    // alignItems:"flex-end"
  },
  textContainer: {
    display:"flex",
    position: "relative",
    flexDirection:"column",
    alignItems:"center",
    textAlign: "center",
    margin:"40px 0px 0px 0px",
    maxWidth:"55%",
    fontFamily: "'Inter', sans-serif",/* clean, modern font */
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
      textAlign: "center",
    },
  },
}));

export default function Template() {

  const classes = commonStyles();
  const templateClasses = templateStyles();


  const [templates,setTemplates]=useState([]);
  const [loading,setLoading] =useState(false);
    useEffect(() => {
    // Step 1: Sign in anonymously
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Signed in as:", user.uid);

        try {
          // Step 2: Fetch docs from "templates"
          const querySnapshot = await getDocs(collection(db, "templates"));
         const data = await Promise.all(
           querySnapshot.docs.map(async (doc) => {
             let template = { id: doc.id, ...doc.data() };
             console.log("template==>", template);

             if (template.imageURLs && Array.isArray(template.imageURLs)) {
               console.log("called");
               let fetchedUrls = await Promise.all(
                 template.imageURLs.map(async (path) => {
                   const url = await getDownloadURL(ref(storage, "templates/" + path));
                   return url;
                 })
               );
               console.log("template.imageUrls==>", fetchedUrls);
               template.imageURLs = fetchedUrls;
             }

             return template;
           })
         );
          console.log("data==>",data)
          setTemplates(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching templates:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // If not signed in, trigger anonymous sign in
        await signInAnonymously(auth);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <CustomAppBar type="template">
         <Container className={classes.productShowCaseContainer} maxWidth="xl">
      {/* Background Elements */}
      <div className={classes.bgGlow}></div>
      <div className={`${classes.floatingShape} ${classes.shapePhone}`}></div>
      <div className={`${classes.floatingShape} ${classes.shapeTablet}`}></div>
      <div className={`${classes.floatingShape} ${classes.shapeLaptop}`}></div>
      
      <Box className={templateClasses.contentWrapper}>
        <div className={templateClasses.textContainer}>
          <Typography 
            variant="h2" 
            className={`${classes.title}`}
          >
            Choose Templates!
          </Typography>
          
          <Typography variant="body1" className={classes.subtitle}>
            FlutterPilot offers a variety of templates to help you get started with your app development process.
          </Typography>
          
        </div>
        
      </Box>
      {console.log("templates==>",templates)}
      <Grid  container className={classes.container} spacing={2}>
      {
        loading && 
        <React.Fragment>
          <Grid item xs={12} md={6}>
        <TemplateCardSkeleton/>
        </Grid>
        <Grid item xs={12} md={6}>
        <TemplateCardSkeleton/>
        </Grid>
        </React.Fragment>
      }
      {!loading && templates.map((v)=>{
        return (
        <Grid item xs={12} md={6}>
        <TemplateCard
          templateId = {v.id}
          name={v.name}
          description={v.description}
          device={v.device}
          imageURLs={v.imageURLs}
          // templateObj={v}
        />
        </Grid>)
      })}
      </Grid>
      </Container>

    </CustomAppBar>
  )
}
