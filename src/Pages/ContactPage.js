import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Card, CardContent, Typography } from "@material-ui/core";
import { Email, Phone, LocationOn, Schedule } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  container: {
    minHeight: "100vh",
    paddingTop: "140px",
    paddingBottom: "100px",
    background: "transparent",
    position: "relative",
  },
  heroSection: {
    textAlign: "center",
    marginBottom: "80px",
  },
  title: {
    fontSize: "4rem",
    fontWeight: "800",
    background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #ffffff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "30px",
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: "1px",
    textShadow: "0 4px 20px rgba(255, 255, 255, 0.1)",
    "@media (max-width: 768px)": {
      fontSize: "2.8rem",
    },
  },
  subtitle: {
    fontSize: "1.3rem",
    color: "#d1d5db",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "400",
    marginBottom: "60px",
    lineHeight: "1.7",
    maxWidth: "700px",
    margin: "0 auto 60px",
    textAlign: "center",
    "@media (max-width: 768px)": {
      fontSize: "1.1rem",
    },
  },
  contactGrid: {
    marginBottom: "60px",
  },
  contactCard: {
    background: "linear-gradient(135deg, rgba(238, 188, 29, 0.08) 0%, rgba(255, 215, 0, 0.03) 100%)",
    border: "1px solid rgba(238, 188, 29, 0.15)",
    borderRadius: "20px",
    padding: "40px 30px",
    textAlign: "center",
    height: "100%",
    transition: "all 0.4s ease",
    backdropFilter: "blur(10px)",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(135deg, rgba(238, 188, 29, 0.05) 0%, transparent 100%)",
      opacity: 0,
      transition: "opacity 0.4s ease",
    },
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 20px 40px rgba(238, 188, 29, 0.15), 0 8px 25px rgba(0, 0, 0, 0.3)",
      borderColor: "rgba(238, 188, 29, 0.3)",
      "&::before": {
        opacity: 1,
      },
    },
  },
  contactIcon: {
    fontSize: "2.5rem",
    color: "#EEBC1D",
    marginBottom: "15px",
  },
  contactTitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#fff",
    marginBottom: "10px",
    fontFamily: "'Inter', sans-serif",
  },
  contactInfo: {
    fontSize: "1rem",
    color: "#bbb",
    fontFamily: "'Inter', sans-serif",
  },
  formSection: {
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(238, 188, 29, 0.02) 100%)",
    borderRadius: "24px",
    padding: "60px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "1px",
      background: "linear-gradient(90deg, transparent 0%, rgba(238, 188, 29, 0.3) 50%, transparent 100%)",
    },
    "@media (max-width: 768px)": {
      padding: "40px 30px",
    },
  },
  formTitle: {
    fontSize: "1.8rem",
    fontWeight: "500",
    color: "#fff",
    marginBottom: "10px",
    fontFamily: "'Inter', sans-serif",
    textAlign: "left",
  },
  formSubtitle: {
    fontSize: "0.9rem",
    color: "#999",
    marginBottom: "30px",
    fontFamily: "'Inter', sans-serif",
    textAlign: "left",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    textAlign: "left",
  },
  label: {
    display: "block",
    fontSize: "0.95rem",
    color: "#999",
    marginBottom: "8px",
    fontFamily: "'Inter', sans-serif",
  },
  input: {
    width: "100%",
    padding: "18px 20px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "2px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    color: "#fff",
    fontFamily: "'Inter', sans-serif",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.3s ease",
    "&:focus": {
      borderColor: "#EEBC1D",
      backgroundColor: "rgba(238, 188, 29, 0.05)",
      boxShadow: "0 0 0 3px rgba(238, 188, 29, 0.1)",
    },
    "&::placeholder": {
      color: "#666",
    },
  },
  textArea: {
    width: "100%",
    minHeight: "140px",
    padding: "18px 20px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "2px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    color: "#fff",
    fontFamily: "'Inter', sans-serif",
    fontSize: "1rem",
    resize: "vertical",
    outline: "none",
    transition: "all 0.3s ease",
    "&:focus": {
      borderColor: "#EEBC1D",
      backgroundColor: "rgba(238, 188, 29, 0.05)",
      boxShadow: "0 0 0 3px rgba(238, 188, 29, 0.1)",
    },
    "&::placeholder": {
      color: "#666",
    },
  },
  submitButton: {
    padding: "18px 40px",
    backgroundColor: "#EEBC1D",
    color: "#000",
    fontWeight: "700",
    fontSize: "1.1rem",
    borderRadius: "50px",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
    alignSelf: "center",
    transition: "all 0.3s ease",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#FFD700",
      transform: "translateY(-2px)",
      boxShadow: "0 10px 30px rgba(238, 188, 29, 0.4)",
    },
  },
  required: {
    color: "#ff6b6b",
  },
  imageSection: {
    marginTop: "60px",
    textAlign: "center",
  },
  bitcoinImage: {
    width: "100%",
    maxWidth: "600px",
    height: "auto",
    borderRadius: "12px",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.3)",
  },
}));

const ContactPage = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const contactInfo = [
    {
      icon: <Email className={classes.contactIcon} />,
      title: "Email Us",
      info: "support@cyriontrade.com"
    },
    {
      icon: <Phone className={classes.contactIcon} />,
      title: "Call Us",
      info: "+1 (555) 123-4567"
    },
    {
      icon: <LocationOn className={classes.contactIcon} />,
      title: "Visit Us",
      info: "123 Crypto Street, Digital City"
    },
    {
      icon: <Schedule className={classes.contactIcon} />,
      title: "Business Hours",
      info: "24/7 Support Available"
    }
  ];

  return (
    <div className={classes.container}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <div className={classes.heroSection}>
          <Typography className={classes.title}>Get In Touch</Typography>
          <Typography className={classes.subtitle}>
            Have questions about our platform? Need technical support? Our team is here to help you succeed in your trading journey.
          </Typography>
        </div>

        {/* Contact Info Cards */}
        <Grid container spacing={4} className={classes.contactGrid}>
          {contactInfo.map((contact, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card className={classes.contactCard}>
                <CardContent>
                  {contact.icon}
                  <Typography className={classes.contactTitle}>
                    {contact.title}
                  </Typography>
                  <Typography className={classes.contactInfo}>
                    {contact.info}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Contact Form */}
        <div className={classes.formSection}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Typography className={classes.formTitle}>Send us a Message</Typography>
              <Typography className={classes.formSubtitle}>
                Fill out the form and we'll get back to you within 24 hours.
                <br />Fields marked with <span className={classes.required}>*</span> are required.
              </Typography>

              <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.inputGroup}>
                  <label className={classes.label}>
                    Full Name <span className={classes.required}>*</span>
                  </label>
                  <input
                    className={classes.input}
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={classes.inputGroup}>
                  <label className={classes.label}>
                    Email Address <span className={classes.required}>*</span>
                  </label>
                  <input
                    className={classes.input}
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={classes.inputGroup}>
                  <label className={classes.label}>
                    Subject <span className={classes.required}>*</span>
                  </label>
                  <input
                    className={classes.input}
                    name="subject"
                    placeholder="What is this regarding?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={classes.inputGroup}>
                  <label className={classes.label}>
                    Message <span className={classes.required}>*</span>
                  </label>
                  <textarea
                    className={classes.textArea}
                    name="message"
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className={classes.submitButton}>
                  Send Message
                </button>
              </form>
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Bitcoin Image */}
              <div className={classes.imageSection}>
                <img 
                  src="/bitcoin-7013663_1280.jpg" 
                  alt="Bitcoin cryptocurrency trading" 
                  className={classes.bitcoinImage}
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;