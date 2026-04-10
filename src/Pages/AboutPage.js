import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    minHeight: "100vh",
    paddingTop: "120px",
    paddingBottom: "80px",
    background: "transparent",
    position: "relative",
  },
  section: {
    marginBottom: "120px",
    "&:last-child": {
      marginBottom: "60px",
    },
  },
  // Hero Section
  hero: {
    textAlign: "center",
    padding: "0",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "600px",
      height: "600px",
      background: "radial-gradient(circle, rgba(238, 188, 29, 0.05) 0%, transparent 70%)",
      borderRadius: "50%",
      zIndex: -1,
    },
  },
  aboutLabel: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#EEBC1D",
    marginBottom: "30px",
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "3px",
    textTransform: "uppercase",
    opacity: 0.9,
  },
  heroTitle: {
    fontSize: "4rem",
    fontWeight: "800",
    background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #ffffff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    lineHeight: "1.2",
    fontFamily: "'Orbitron', sans-serif",
    maxWidth: "1000px",
    margin: "0 auto",
    letterSpacing: "1px",
    textShadow: "0 4px 20px rgba(255, 255, 255, 0.1)",
    "@media (max-width: 768px)": {
      fontSize: "2.8rem",
    },
    "@media (max-width: 480px)": {
      fontSize: "2.2rem",
    },
  },
  heroImage: {
    width: "100%",
    maxWidth: "800px",
    height: "auto",
    marginTop: "60px",
    borderRadius: "20px",
    boxShadow: "0 20px 60px rgba(238, 188, 29, 0.2)",
    display: "block",
    margin: "60px auto 0",
  },
  bitcoinImage: {
    backgroundImage: "url('/bitcoin-7013663_1280.jpg')",
  },
  // Story Section
  storySection: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "0 20px",
  },
  storyTitle: {
    fontSize: "3.2rem",
    fontWeight: "700",
    background: "linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "50px",
    fontFamily: "'Orbitron', sans-serif",
    lineHeight: "1.3",
    textAlign: "center",
    letterSpacing: "0.5px",
    "@media (max-width: 768px)": {
      fontSize: "2.4rem",
    },
  },
  storyText: {
    fontSize: "1.25rem",
    color: "#d1d5db",
    lineHeight: "1.8",
    marginBottom: "35px",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "400",
    textAlign: "justify",
    textJustify: "inter-word",
    "@media (max-width: 768px)": {
      fontSize: "1.1rem",
      textAlign: "left",
    },
  },
  // Image Sections
  imageSection: {
    textAlign: "center",
    margin: "120px 0",
    position: "relative",
  },
  sectionImage: {
    width: "100%",
    maxWidth: "1000px",
    height: "auto",
    borderRadius: "20px",
    boxShadow: "0 30px 80px rgba(0, 0, 0, 0.6), 0 10px 30px rgba(238, 188, 29, 0.1)",
    border: "1px solid rgba(238, 188, 29, 0.1)",
    transition: "all 0.6s ease",
    "&:hover": {
      transform: "translateY(-10px)",
      boxShadow: "0 40px 100px rgba(0, 0, 0, 0.7), 0 20px 40px rgba(238, 188, 29, 0.2)",
    },
  },
  // Content Grid
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "100px",
    alignItems: "center",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 20px",
    "@media (max-width: 968px)": {
      gridTemplateColumns: "1fr",
      gap: "60px",
    },
  },
  contentText: {
    "& h2": {
      fontSize: "2.8rem",
      fontWeight: "700",
      background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "40px",
      fontFamily: "'Orbitron', sans-serif",
      lineHeight: "1.3",
      letterSpacing: "0.5px",
      "@media (max-width: 768px)": {
        fontSize: "2.2rem",
      },
    },
    "& p": {
      fontSize: "1.2rem",
      color: "#d1d5db",
      lineHeight: "1.8",
      marginBottom: "30px",
      fontFamily: "'Inter', sans-serif",
      fontWeight: "400",
      textAlign: "justify",
      textJustify: "inter-word",
      "@media (max-width: 768px)": {
        fontSize: "1.1rem",
        textAlign: "left",
      },
    },
  },
  contentImage: {
    width: "100%",
    height: "auto",
    borderRadius: "20px",
    boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5), 0 8px 25px rgba(238, 188, 29, 0.1)",
    border: "1px solid rgba(238, 188, 29, 0.1)",
    transition: "all 0.6s ease",
    "&:hover": {
      transform: "translateY(-8px) scale(1.02)",
      boxShadow: "0 35px 80px rgba(0, 0, 0, 0.6), 0 15px 35px rgba(238, 188, 29, 0.2)",
    },
  },
  // Future Section
  futureSection: {
    maxWidth: "900px",
    margin: "0 auto",
    textAlign: "center",
    padding: "0 20px",
  },
  futureTitle: {
    fontSize: "3.2rem",
    fontWeight: "700",
    background: "linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "60px",
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: "0.5px",
    "@media (max-width: 768px)": {
      fontSize: "2.4rem",
    },
  },
  termsGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "80px",
  },
  termTag: {
    padding: "12px 24px",
    background: "linear-gradient(135deg, rgba(238, 188, 29, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)",
    border: "1px solid rgba(238, 188, 29, 0.2)",
    borderRadius: "30px",
    color: "#e5e7eb",
    fontSize: "1rem",
    fontWeight: "500",
    fontFamily: "'Inter', sans-serif",
    transition: "all 0.4s ease",
    cursor: "pointer",
    backdropFilter: "blur(10px)",
    "&:hover": {
      background: "linear-gradient(135deg, rgba(238, 188, 29, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%)",
      borderColor: "rgba(238, 188, 29, 0.5)",
      color: "#EEBC1D",
      transform: "translateY(-3px)",
      boxShadow: "0 8px 25px rgba(238, 188, 29, 0.2)",
    },
  },
  futureText: {
    fontSize: "1.25rem",
    color: "#d1d5db",
    lineHeight: "1.8",
    marginBottom: "35px",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "400",
    textAlign: "justify",
    textJustify: "inter-word",
    "@media (max-width: 768px)": {
      fontSize: "1.1rem",
      textAlign: "left",
    },
  },
  // Final Image
  finalImageSection: {
    textAlign: "center",
    margin: "100px 0 80px 0",
    position: "relative",
  },
  finalImage: {
    width: "100%",
    maxWidth: "700px",
    height: "auto",
    borderRadius: "20px",
    boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5), 0 8px 25px rgba(238, 188, 29, 0.15)",
    border: "1px solid rgba(238, 188, 29, 0.1)",
    transition: "all 0.6s ease",
    "&:hover": {
      transform: "translateY(-10px) scale(1.02)",
      boxShadow: "0 35px 80px rgba(0, 0, 0, 0.6), 0 15px 35px rgba(238, 188, 29, 0.25)",
    },
  },
}));

const AboutPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Container maxWidth="xl">
        {/* Hero Section */}
        <section className={`${classes.section} ${classes.hero}`}>
          <h2 className={classes.aboutLabel}>About Us.</h2>
          <h1 className={classes.heroTitle}>
            CyrionTrade is the leading<br />
            automated trading bot out there.
          </h1>
          <img 
            src="/About US/bitcoin-7013663_1280.jpg" 
            alt="Bitcoin" 
            className={classes.heroImage}
          />
        </section>

        {/* Story Section */}
        <section className={`${classes.section} ${classes.storySection}`}>
          <h2 className={classes.storyTitle}>Create magic</h2>
          <p className={classes.storyText}>
            Mix a successful Daytrader with a brilliant Engineer and you get the real m.a.g.i.c. 
            Cryptocurrency magic, to be exact.
          </p>
          <p className={classes.storyText}>
            Pim did what every great Engineer would do: automate it. Unconsciously creating the ideal trader; 
            unbeatable fast, reliable and – most importantly – always trading. The fan base grew from family, 
            friends and friends of friends to people all over the world in no time. And then the realization came; 
            this might be something big.
          </p>
          <p className={classes.storyText}>
            By making CyrionTrade public we were able to help many traders create their own magic. 
            Would you like to try it out? Sign up for a free trial. Have fun!
          </p>
        </section>

        {/* First Image */}
        <section className={classes.imageSection}>
          <img 
            src="/About US/close-up-hand-holding-coin.jpg" 
            alt="Close up hand holding coin" 
            className={classes.sectionImage}
          />
        </section>

        {/* How We Got This Far Section */}
        <section className={classes.section}>
          <div className={classes.contentGrid}>
            <div className={classes.contentText}>
              <h2>How we got this far.</h2>
              <p>
                CyrionTrade is an AI-driven bot that makes crypto trading accessible, fun, and worthwhile for everyone. 
                We pursue perfection. Work hard. Learn every day.
              </p>
              <p>
                Join forces with our amazing team. And grow rapidly. Together we optimize and innovate a bot that hosts 
                more than nine million transactions worth an estimated 2 billion USD each month.
              </p>
            </div>
            <div>
              <img 
                src="/About US/man-analyzing-stock-market-charts-financial-data-electronic-board.jpg" 
                alt="Man analyzing stock market charts and financial data on electronic board" 
                className={classes.contentImage}
              />
            </div>
          </div>
        </section>

        {/* Future Section */}
        <section className={`${classes.section} ${classes.futureSection}`}>
          <h2 className={classes.futureTitle}>This is the future.</h2>
          
          <div className={classes.termsGrid}>
            <span className={classes.termTag}>zk-SNARKs</span>
            <span className={classes.termTag}>Miners</span>
            <span className={classes.termTag}>Nodes</span>
            <span className={classes.termTag}>Bulls</span>
            <span className={classes.termTag}>Bears</span>
            <span className={classes.termTag}>FOMO</span>
            <span className={classes.termTag}>FUD</span>
          </div>

          <p className={classes.futureText}>
            Some of those terms may sound like Marvel villains or curse words ("I should FUD you upside the head 
            for staring at my nodes!").
          </p>
          
          {/* Future Image */}
          <div className={classes.finalImageSection}>
            <img 
              src="/About US/2143743.jpg" 
              alt="Blockchain technology illustration" 
              className={classes.finalImage}
            />
          </div>

          <p className={classes.futureText}>
            And for good reason, because however cryptic crypto may seem, the underlying Blockchain technology is as safe as possible. 
            No wonder everyone that joins us is instantly hooked.
          </p>
          <p className={classes.futureText}>
            Want to experience the future of trading? Join CyrionTrade today and discover how our advanced AI-driven platform 
            can transform your trading journey. Start your free trial and most importantly, Have fun!
          </p>
        </section>
      </Container>
    </div>
  );
};

export default AboutPage;