import React, { useEffect, useState } from "react";
import { Box, Chip, Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { collection, getDocs } from "firebase/firestore";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { ref, getDownloadURL } from "firebase/storage";
import CustomAppBar from "../../componets/appbar";
import TemplateCard from "../../componets/templatecard";
import TemplateCardSkeleton from "../../componets/templatecardskeleton";
import { auth, db, storage } from "../../utils/firebaseconfig";

const useStyles = makeStyles((theme) => ({
  page: {
    width: "90%",
    maxWidth: "1500px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing(4),
    marginBottom: 0,
    [theme.breakpoints.down("sm")]: {
      width: "94%",
      marginTop: theme.spacing(3),
      marginBottom: 0,
    },
  },
  headerCard: {
    borderRadius: "18px",
    border: "1px solid rgba(148, 163, 184, 0.28)",
    background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
    padding: theme.spacing(3, 3.2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2.3, 2),
    },
  },
  eyebrow: {
    margin: 0,
    marginBottom: theme.spacing(1),
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontSize: "0.76rem",
    fontWeight: 700,
    color: "#1d4ed8",
  },
  title: {
    margin: 0,
    marginBottom: theme.spacing(1),
    color: "#0f172a",
    fontSize: "2.05rem",
    lineHeight: 1.16,
    letterSpacing: "-0.38px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.62rem",
    },
  },
  subtitle: {
    margin: 0,
    color: "#475569",
    lineHeight: 1.75,
    maxWidth: "780px",
  },
  metaRow: {
    marginTop: theme.spacing(1.7),
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
  },
  chip: {
    fontWeight: 600,
    borderColor: "rgba(30, 64, 175, 0.22)",
    color: "#1e40af",
    background: "rgba(30, 64, 175, 0.06)",
  },
  gridWrap: {
    marginTop: theme.spacing(2),
    alignItems: "stretch",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1.5),
    },
  },
  cardItem: {
    display: "flex",
  },
  statusCard: {
    borderRadius: "14px",
    border: "1px dashed rgba(148, 163, 184, 0.45)",
    background: "rgba(255, 255, 255, 0.86)",
    color: "#64748b",
    textAlign: "center",
    padding: theme.spacing(3, 2),
  },
}));

export default function Template() {
  const classes = useStyles();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const querySnapshot = await getDocs(collection(db, "templates"));
          const data = await Promise.all(
            querySnapshot.docs.map(async (doc) => {
              const template = { id: doc.id, ...doc.data() };

              if (template.imageURLs && Array.isArray(template.imageURLs)) {
                let fetchedUrls = await Promise.all(
                  template.imageURLs.map(async (path) => {
                    try {
                      return await getDownloadURL(ref(storage, path));
                    } catch (error) {
                      console.error(`Error fetching image for path ${path}:`, error);
                      return null;
                    }
                  })
                );
                fetchedUrls = fetchedUrls.filter((url) => url !== null);
                template.imageURLs = fetchedUrls;
              }

              return template;
            })
          );
          setTemplates(data);
        } catch (error) {
          console.error("Error fetching templates:", error);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          await signInAnonymously(auth);
        } catch (error) {
          console.error("Error signing in anonymously:", error);
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <CustomAppBar type="template">
      <Container maxWidth={false} disableGutters className={classes.page}>
        <header className={classes.headerCard}>
          <p className={classes.eyebrow}>Templates</p>
          <h1 className={classes.title}>Template Library</h1>
          <p className={classes.subtitle}>
            Start faster with ready-to-edit Flutter app templates. Pick a structure,
            open it in the builder, and customize screens to match your product workflow.
          </p>
          <div className={classes.metaRow}>
            <Chip
              label={loading ? "Loading templates..." : `${templates.length} templates available`}
              variant="outlined"
              className={classes.chip}
            />
            <Chip label="Mobile-first UI" variant="outlined" className={classes.chip} />
            <Chip label="Production-ready structure" variant="outlined" className={classes.chip} />
          </div>
        </header>

        {loading ? (
          <Grid container spacing={2.4} className={classes.gridWrap}>
            {[0, 1, 2, 3].map((i) => (
              <Grid key={i} item xs={12} md={6} className={classes.cardItem}>
                <TemplateCardSkeleton />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2.4} className={classes.gridWrap}>
            {templates.map((template) => (
              <Grid key={template.id} item xs={12} md={6} className={classes.cardItem}>
                <TemplateCard
                  templateId={template.id}
                  name={template.name}
                  description={template.description}
                  imageURLs={template.imageURLs}
                />
              </Grid>
            ))}

            {templates.length === 0 && (
              <Grid item xs={12}>
                <div className={classes.statusCard}>
                  No templates available right now. Please check back soon.
                </div>
              </Grid>
            )}
          </Grid>
        )}
      </Container>
    </CustomAppBar>
  );
}
