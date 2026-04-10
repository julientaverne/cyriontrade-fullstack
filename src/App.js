import { makeStyles } from "@material-ui/core";
import Homepage from "./Pages/HomePage";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CoinPage from "./Pages/CoinPage";
import MarketplacePage from "./Pages/MarketplacePage";
import StrategyDetailPage from "./Pages/StrategyDetailPage";
import TemplateDetailPage from "./Pages/TemplateDetailPage";
import CopyBotDetailPage from "./Pages/CopyBotDetailPage";
import SignalDetailPage from "./Pages/SignalDetailPage";
import PricingPage from "./Pages/PricingPage";
import AboutPage from "./Pages/AboutPage";
import TermsPage from "./Pages/TermsPage";
import ContactPage from "./Pages/ContactPage";
import ReferralDashboard from "./components/Referral/ReferralDashboard";
import BonusPage from "./components/Bonus/BonusPage";
import NotFoundPage from "./Pages/NotFoundPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import SubscriptionNotification from "./components/SubscriptionNotification";
import Alert from "./components/Alert";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "#ffffff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "radial-gradient(ellipse at top, rgba(26, 29, 41, 0.8) 0%, rgba(20, 22, 26, 0.9) 50%, rgba(10, 14, 26, 0.95) 100%)",
      zIndex: -2,
    },
    "&::after": {
      content: '""',
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 20% 80%, rgba(238, 188, 29, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.02) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(238, 188, 29, 0.01) 0%, transparent 50%)
      `,
      zIndex: -1,
    },
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <SubscriptionNotification />
      <div className={classes.App}>
        <Header />
        <Switch>
          <Route path="/" component={Homepage} exact />
          <Route path="/coins/:id" component={CoinPage} exact />
          <Route path="/marketplace/:category?" component={MarketplacePage} exact />
          <Route path="/strategy/:id" component={StrategyDetailPage} exact />
          <Route path="/template/:id" component={TemplateDetailPage} exact />
          <Route path="/copybot/:id" component={CopyBotDetailPage} exact />
          <Route path="/signal/:id" component={SignalDetailPage} exact />
          <Route path="/pricing" component={PricingPage} exact />
          <Route path="/about" component={AboutPage} exact />
          <Route path="/terms" component={TermsPage} exact />
          <Route path="/contact" component={ContactPage} exact />
          <Route path="/referrals" component={ReferralDashboard} exact />
          <Route path="/bonuses" component={BonusPage} exact />
          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
