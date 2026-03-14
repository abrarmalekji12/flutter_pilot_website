import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomAppBar from "../../componets/appbar";
import { commonStyles } from "../../styles/commonStyles";

const useStyles = makeStyles((theme) => ({
  pageWrap: {
    // Standardized via commonStyles.responsiveContainer
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
  sectionGap: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(3),
    },
  },
  formCard: {
    background: "rgba(255, 255, 255, 0.96)",
    borderRadius: "20px",
    boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)",
    padding: theme.spacing(4),
    border: "1px solid rgba(148, 163, 184, 0.22)",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2.5),
      borderRadius: "16px",
    },
  },
  formGroup: {
    marginBottom: theme.spacing(2.1),
  },
  label: {
    display: "block",
    marginBottom: theme.spacing(0.9),
    fontWeight: 600,
    color: "#1e293b",
  },
  input: {
    width: "100%",
    padding: "12px 13px",
    border: "1px solid rgba(30, 41, 59, 0.18)",
    borderRadius: "10px",
    fontSize: "1rem",
    background: "#fff",
    color: "#1e293b",
    resize: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    "&:focus": {
      outline: "none",
      borderColor: "#1e40af",
      boxShadow: "0 0 0 3px rgba(30, 64, 175, 0.12)",
    },
  },
  submitBtn: {
    background: "linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)",
    color: "#fff",
    padding: "12px 24px",
    fontSize: "0.95rem",
    fontWeight: 700,
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 10px 24px rgba(37, 99, 235, 0.3)",
    "&:hover:not(:disabled)": {
      transform: "translateY(-1px)",
      boxShadow: "0 14px 30px rgba(37, 99, 235, 0.34)",
    },
    "&:disabled": {
      opacity: 0.7,
      cursor: "not-allowed",
    },
  },
}));

export default function ContactUs() {
  const localClasses = useStyles();
  const classes = commonStyles();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formId = "xjkowjaq";

    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const Swal = (await import("sweetalert2")).default;
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "We will get back to you soon.",
          confirmButtonColor: "#173e7c",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Form submission failed");
      }
    } catch (err) {
      const Swal = (await import("sweetalert2")).default;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again later!",
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomAppBar type="contactUs">
      <div className={classes.responsiveContainer}>
        <Container className={localClasses.headerCard} maxWidth={false} disableGutters>
          <p className={localClasses.eyebrow}>Contact</p>
          <h1 className={localClasses.title}>Contact Us</h1>
          <p className={localClasses.subtitle}>
            We’d love to hear from you. Reach out with questions, feedback, or suggestions.
          </p>
        </Container>

        <main className={localClasses.sectionGap}>
          <div className={localClasses.formCard}>
            <Box component="form" onSubmit={handleSubmit}>
              <div className={localClasses.formGroup}>
                <label htmlFor="name" className={localClasses.label}>Your Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={localClasses.input}
                />
              </div>

              <div className={localClasses.formGroup}>
                <label htmlFor="email" className={localClasses.label}>Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={localClasses.input}
                />
              </div>

              <div className={localClasses.formGroup}>
                <label htmlFor="message" className={localClasses.label}>Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  required
                  className={localClasses.input}
                />
              </div>

              <button type="submit" disabled={isSubmitting} className={localClasses.submitBtn}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </Box>
          </div>
        </main>
      </div>
    </CustomAppBar>
  );
}
