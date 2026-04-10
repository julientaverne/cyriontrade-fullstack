import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    minHeight: "100vh",
    paddingTop: "140px",
    paddingBottom: "100px",
    background: "transparent",
    position: "relative",
  },
  hero: {
    textAlign: "center",
    marginBottom: "80px",
  },
  title: {
    fontSize: "3.5rem",
    fontWeight: "700",
    background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "25px",
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: "0.5px",
    textShadow: "0 4px 20px rgba(255, 255, 255, 0.1)",
    "@media (max-width: 768px)": {
      fontSize: "2.5rem",
    },
  },
  lastUpdated: {
    fontSize: "1.1rem",
    color: "#9ca3af",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "400",
  },
  content: {
    maxWidth: "800px",
    margin: "0 auto",
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(238, 188, 29, 0.01) 100%)",
    borderRadius: "24px",
    padding: "60px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
    "@media (max-width: 768px)": {
      padding: "40px 30px",
    },
  },
  section: {
    marginBottom: "60px",
    "&:last-child": {
      marginBottom: "40px",
    },
  },
  sectionTitle: {
    fontSize: "1.8rem",
    fontWeight: "600",
    background: "linear-gradient(135deg, #EEBC1D 0%, #FFD700 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "30px",
    fontFamily: "'Orbitron', sans-serif",
    lineHeight: "1.4",
    letterSpacing: "0.3px",
  },
  sectionText: {
    fontSize: "1.1rem",
    color: "#d1d5db",
    lineHeight: "1.8",
    marginBottom: "30px",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "400",
    textAlign: "justify",
    textJustify: "inter-word",
  },
  list: {
    paddingLeft: "0",
    marginBottom: "25px",
    listStyle: "none",
  },
  listItem: {
    fontSize: "1rem",
    color: "#bbb",
    lineHeight: "1.8",
    marginBottom: "12px",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "400",
    paddingLeft: "20px",
    position: "relative",
    "&:before": {
      content: '"•"',
      color: "#666",
      position: "absolute",
      left: "0",
    },
  },
  highlight: {
    color: "#fff",
    fontWeight: "500",
  },
}));

const TermsPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Container maxWidth="xl">
        {/* Hero Section */}
        <div className={classes.hero}>
          <h1 className={classes.title}>Terms and conditions</h1>
          <p className={classes.lastUpdated}>Last updated on 30/07/2025 at 12:00 PM</p>
        </div>

        {/* Content */}
        <div className={classes.content}>
          <section className={classes.section}>
            <h2 className={classes.sectionTitle}>1. Definitions</h2>

            <p className={classes.sectionText}>
              <span className={classes.highlight}>Account</span>: the Account on the Platform created by User, which is limited for use by User via the Login Credentials.
            </p>
            <p className={classes.sectionText}>
              <span className={classes.highlight}>Signals</span>: recommendations for buying or selling cryptocurrencies shared by third party "Signal Providers" 
              (also named "Traders") engaging with CyrionTrade. Users have the option to configure the software on the Platform as such that it will 
              automatically buy currencies on the basis of information of these Signals.
            </p>
            <p className={classes.sectionText}>
              <span className={classes.highlight}>Platform</span>: the platform CyrionTrade has developed to enable Users to connect with Signal Providers, 
              enabling Users to trade in crypto currencies on the crypto market using a crypto trader bot and in accordance with Signals provided. 
              The Platform is available through the Website and through the App.
            </p>
            <p className={classes.sectionText}>
              <span className={classes.highlight}>User(s)</span>: individual private person(s) or legal entity(ies) making use of the Services. 
              Users are also referred to as "you".
            </p>
            <p className={classes.sectionText}>
              <span className={classes.highlight}>Exchange Partner</span>: cryptocurrency exchanges that have entered into partnership agreements 
              with CyrionTrade to provide enhanced Services to Users.
            </p>
          </section>

          <section className={classes.section}>
            <h2 className={classes.sectionTitle}>2. Registration and personal account</h2>
            <p className={classes.sectionText}>
              If you want to use our Services, go to our Website and/or download our App.
            </p>
            <p className={classes.sectionText}>
              To make use of all the functions of the Platform, CyrionTrade requires you to register and create an Account. 
              In order to create an Account, you must inter alia provide your e-mail address and choose a strong password, 
              as instructed during the registration process. The e-mail address and chosen password, together, form the "Login Credentials".
            </p>
            <p className={classes.sectionText}>
              You may not allow use of your Account by any third party. You are fully responsible for non-disclosure of your Login Credentials 
              and the use of your Account. If, for whatsoever reason, your Account is blocked or deleted, you are no longer entitled to use the Platform.
            </p>
            <p className={classes.sectionText}>
              You warrant that the information provided when creating an Account is correct and complete. You are responsible for the accuracy of the data in your Account.
            </p>
            <p className={classes.sectionText}>
              Users may only maintain one Account per individual or legal entity. Creating multiple Accounts to circumvent promotional limitations, 
              subscription restrictions, or other Terms is strictly prohibited and may result in immediate termination of all associated Accounts.
            </p>
          </section>

          <section className={classes.section}>
            <h2 className={classes.sectionTitle}>3. Offers and prices</h2>
            <p className={classes.sectionText}>
              All offers and free trials regarding the Services are subject to these Terms.
            </p>
            <p className={classes.sectionText}>
              The prices on the Website, App and Platform do not include taxes and expenses, unless indicated otherwise.
            </p>
            <p className={classes.sectionText}>
              CyrionTrade has the right to amend its prices at any time. Such price change may take effect immediately.
            </p>
            <p className={classes.sectionText}>
              CyrionTrade cannot be held to an offer or quotation that can reasonably be understood to contain an obvious mistake or error.
            </p>
            <p className={classes.sectionText}>
              Promotional offers, discount codes, and partnership benefits are subject to specific terms and conditions that will be communicated 
              at the time of the offer. CyrionTrade reserves the right to modify, suspend, or terminate promotional offers at any time without prior notice.
            </p>
          </section>

          <section className={classes.section}>
            <h2 className={classes.sectionTitle}>4. Subscription</h2>
            <p className={classes.sectionText}>
              You need a subscription to use all the functions of the Platform (the "Subscription"). Subscriptions are offered for a fixed amount 
              per month and/or per year. You can apply for a Subscription on our Website.
            </p>
            <p className={classes.sectionText}>
              CyrionTrade offers several sorts of packages as a Subscription. Each package differs in the amount of positions, selected currencies, 
              frequency of scanning the stock market and the amount of support from CyrionTrade. You can find all packages on our Website.
            </p>
            <p className={classes.sectionText}>
              After the Initial Term, the Subscription shall automatically renew for the same period as the Initial Term, unless CyrionTrade or User 
              gives written notice via the Website or Platform to the other of its intention not to renew the Subscription.
            </p>
            <p className={classes.sectionText}>
              User has the right to withdraw the Subscription within 14 days after having applied for the Subscription.
            </p>
          </section>

          <section className={classes.section}>
            <h2 className={classes.sectionTitle}>5. Payment</h2>
            <p className={classes.sectionText}>
              The price of the subscription will be paid every month by User. Possible methods of payment are displayed on the Website 
              and include for example PayPal, credit cards (e.g. Visa or MasterCard) and cryptocurrencies.
            </p>
            <p className={classes.sectionText}>
              In the event CyrionTrade is unable to collect the fees due, or User does not pay the fees within the specified period, 
              CyrionTrade has the right to disable any functionality of the Platform or Account to the User.
            </p>
          </section>

          <section className={classes.section}>
            <h2 className={classes.sectionTitle}>6. Fair use of our Platform</h2>
            <p className={classes.sectionText}>
              You must be at least 18 years old to use our Platform.
            </p>
            <p className={classes.sectionText}>
              You may not use the Platform (or other Services) in such way that you violate Dutch and any other applicable law and regulations, 
              including but not limited to financial and taxation regulations.
            </p>
            <p className={classes.sectionText}>
              As a condition for using the Platform (or other Services), you agree not to provide any information, data or content to us or the Platform 
              that is incorrect, inaccurate, incomplete or that violates any law or regulation.
            </p>
          </section>

          <section className={classes.section}>
            <h2 className={classes.sectionTitle}>7. Privacy</h2>
            <p className={classes.sectionText}>
              CyrionTrade respects your privacy and anticipates the EU General Data Protection Regulation (GDPR). When you make use of our Services, 
              we will collect certain personal data from you. In our Privacy Policy you can read which personal data we collect and for what purposes.
            </p>
          </section>

          <section className={classes.section}>
            <h2 className={classes.sectionTitle}>8. Intellectual property</h2>
            <p className={classes.sectionText}>
              CyrionTrade is the exclusive licensee of all intellectual property rights vesting in and relating to (all content made available through the use of) 
              our Services, such as – but not limited to – patents, patent applications, trademarks, trademark applications, database rights, service marks, 
              trade names, copyrights, trade secrets, licenses, domain names, know-how, property rights and processes.
            </p>
          </section>

          <section className={classes.section}>
            <h2 className={classes.sectionTitle}>9. Availability of the Services and disclaimer of warranties</h2>
            <p className={classes.sectionText}>
              The Platform is available on computers, handheld mobile devices running on iOS and Android and other devices specifically indicated as compatible by CyrionTrade. 
              CyrionTrade uses all reasonable efforts to ensure that you can access and use the Platform at all times.
            </p>
            <p className={classes.sectionText}>
              CyrionTrade will use its reasonable efforts to properly select Signal Providers. However, CyrionTrade is in no way responsible for the quality or content of the Signals. 
              The results of selected Signals are entirely at the risk of the User.
            </p>
            <p className={classes.sectionText}>
              To the maximum extent permitted by applicable law, CyrionTrade hereby disclaims all implied warranties regarding the availability of the Platform (or other Services). 
              The Services are provided "as is" and "as available" without warranty of any kind.
            </p>
          </section>

          <section className={classes.section}>
            <h2 className={classes.sectionTitle}>10. Limitation of liability</h2>
            <p className={classes.sectionText}>
              Unless there is willful misconduct or gross negligence on the part of CyrionTrade, <span className={classes.highlight}>CyrionTrade is not liable</span> in any way 
              for Users' (direct or indirect) damages or costs of whatsoever nature.
            </p>
            <p className={classes.sectionText}>
              If CyrionTrade is liable, for any reason, the liability will be limited to an amount of $ 1000 USD or 100% of the total amount paid by User 
              for the use of the Services in the foregoing 6 months, whichever is lower.
            </p>
          </section>

          <section className={classes.section}>
            <h2 className={classes.sectionTitle}>11. Risks</h2>
            <p className={classes.sectionText}>
              The use of our Services is only suitable for Users that fully understand the risks involved in such use. This implies that you understand 
              the price volatility in the cryptocurrency market and that <span className={classes.highlight}>the potential loss in trading or holding crypto currencies can be all or substantial</span>. 
              You guarantee that you shall only put in money that you can afford to lose.
            </p>
            <p className={classes.sectionText}>
              At no point, CyrionTrade provides any investment, legal or tax advice. CyrionTrade does not consider your personal circumstances. 
              If you wish to receive such advice, it is your responsibility to seek independent, professional advice prior to the use of our Services.
            </p>
          </section>


        </div>
      </Container>
    </div>
  );
};

export default TermsPage;