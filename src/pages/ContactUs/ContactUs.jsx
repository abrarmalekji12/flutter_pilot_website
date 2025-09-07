import React, { useState } from 'react';
import './ContactUs.css';
import CustomAppBar from '../../componets/appbar';
import { getUID } from '../../utils/commonFnc';
import Swal from 'sweetalert2';
import { commonStyles, contactUsStyles } from '../../styles/commonStyles';
import { Box, Container, makeStyles, Typography } from '@material-ui/core';



export default function ContactUs() {
  const classes = commonStyles();
  const contactUsClasses = contactUsStyles();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
 const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let formId="xjkowjaq"

    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'We will get back to you soon.',
          confirmButtonColor: '#173e7c'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later!',
        confirmButtonColor: '#d33'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomAppBar type="contactUs">
    <div className="contact-us-container">
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
                  Contact Us
                </Typography>
                
                <Typography variant="body1" className={classes.subtitle}>
                  We’d love to hear from you. Reach out with questions, feedback, or suggestions.
                </Typography>
                
              </div>
              
            </Box>
            </Container>
      {/* <header className="contact-header">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you. Reach out with questions, feedback, or suggestions.</p>
      </header> */}

      <main className="contact-content">
        <form onSubmit={handleSubmit} action={`https://formspree.io/f/${getUID()}`} method="post">
          <div className="form-group">
            <label>Your Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Your Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} rows="6" required />
          </div>

          <button type="submit">Send Message</button>
        </form>
      </main>
    </div>
    </CustomAppBar>
  );
}