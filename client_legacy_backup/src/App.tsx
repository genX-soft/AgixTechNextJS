import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FloatingChatCta } from "@/components/shared/floating-chat-cta";
import NotFound from "@/pages/not-found";
import AIAutomationServicesPage from "@/pages/ai-automation-services";
import AgenticAISystemsPage from "@/pages/agentic-ai-systems";
import AIVoiceAgentsPage from "@/pages/ai-voice-agents";
import ConversationalAIChatbotsPage from "@/pages/conversational-ai-chatbots";
import RAGKnowledgeAIPage from "@/pages/rag-knowledge-ai";
import PredictiveAnalyticsAIPage from "@/pages/predictive-analytics-ai";
import ComputerVisionSolutionsPage from "@/pages/computer-vision-solutions";
import CustomAIProductDevelopmentPage from "@/pages/custom-ai-product-development";
import HealthcareIndustryPage from "@/pages/industries/healthcare";
import RealEstateIndustryPage from "@/pages/industries/real-estate";
import EdTechIndustryPage from "@/pages/industries/edtech";
import EcommerceIndustryPage from "@/pages/industries/ecommerce";
import FintechIndustryPage from "@/pages/industries/fintech";
import InsuranceIndustryPage from "@/pages/industries/insurance";
import LogisticsIndustryPage from "@/pages/industries/logistics";
import HospitalityIndustryPage from "@/pages/industries/hospitality";
import CaseStudiesPage from "@/pages/case-studies";
import SunoCaseStudyPage from "@/pages/case-studies/suno";
import EnovaCaseStudyPage from "@/pages/case-studies/enova";
import DaveCaseStudyPage from "@/pages/case-studies/dave";
import OcrolusCaseStudyPage from "@/pages/case-studies/ocrolus";
import BabylonHealthCaseStudyPage from "@/pages/case-studies/babylon-health";
import KiteTherapyCaseStudyPage from "@/pages/case-studies/kite-therapy";
import HelloDrivenCaseStudyPage from "@/pages/case-studies/hello-driven";
import AlbertsonsCaseStudyPage from "@/pages/case-studies/albertsons";
import KrogerCaseStudyPage from "@/pages/case-studies/kroger";
import StitchFixCaseStudyPage from "@/pages/case-studies/stitch-fix";
import QuizletCaseStudyPage from "@/pages/case-studies/quizlet";
import HiltonHotelsCaseStudyPage from "@/pages/case-studies/hilton-hotels";
import PolyAICaseStudyPage from "@/pages/case-studies/polyai";
import UltaBeautyCaseStudyPage from "@/pages/case-studies/ulta-beauty";
import KnewtonCaseStudyPage from "@/pages/case-studies/knewton";
import RiiidLabsCaseStudyPage from "@/pages/case-studies/riiid-labs";
import HouseCanaryCaseStudyPage from "@/pages/case-studies/housecanary";
import AlphaSenseCaseStudyPage from "@/pages/case-studies/alphasense";
import MindtripCaseStudyPage from "@/pages/case-studies/mindtrip";
import BrainfishCaseStudyPage from "@/pages/case-studies/brainfish";
import PropertiAICaseStudyPage from "@/pages/case-studies/properti-ai";
import DartmouthCollegeCaseStudyPage from "@/pages/case-studies/dartmouth-college";
import InnitCaseStudyPage from "@/pages/case-studies/innit";
import HungryrootCaseStudyPage from "@/pages/case-studies/hungryroot";
import NavanCaseStudyPage from "@/pages/case-studies/navan";
import GeoveaCaseStudyPage from "@/pages/case-studies/geovea";
import LuxuryEscapesCaseStudyPage from "@/pages/case-studies/luxury-escapes";
import NaratixCaseStudyPage from "@/pages/case-studies/naratix";
import OperationalIntelligencePage from "@/pages/intelligence/operational";
import ConversationalIntelligencePage from "@/pages/intelligence/conversational";
import DecisionIntelligencePage from "@/pages/intelligence/decision";
import AgenticSystemsPage from "@/pages/intelligence/agentic";
import EnterpriseKnowledgePage from "@/pages/intelligence/enterprise-knowledge";
import AboutPage from "@/pages/about";

function Router() {
  return (
    <Switch>
      <Route path="/" component={AIAutomationServicesPage} />
      <Route path="/case-studies" component={CaseStudiesPage} />
      <Route path="/case-studies/suno" component={SunoCaseStudyPage} />
      <Route path="/case-studies/enova" component={EnovaCaseStudyPage} />
      <Route path="/case-studies/dave" component={DaveCaseStudyPage} />
      <Route path="/case-studies/ocrolus" component={OcrolusCaseStudyPage} />
      <Route path="/case-studies/babylon-health" component={BabylonHealthCaseStudyPage} />
      <Route path="/case-studies/kite-therapy" component={KiteTherapyCaseStudyPage} />
      <Route path="/case-studies/hello-driven" component={HelloDrivenCaseStudyPage} />
      <Route path="/case-studies/albertsons" component={AlbertsonsCaseStudyPage} />
      <Route path="/case-studies/kroger" component={KrogerCaseStudyPage} />
      <Route path="/case-studies/stitch-fix" component={StitchFixCaseStudyPage} />
      <Route path="/case-studies/quizlet" component={QuizletCaseStudyPage} />
      <Route path="/case-studies/hilton-hotels" component={HiltonHotelsCaseStudyPage} />
      <Route path="/case-studies/polyai" component={PolyAICaseStudyPage} />
      <Route path="/case-studies/ulta-beauty" component={UltaBeautyCaseStudyPage} />
      <Route path="/case-studies/knewton" component={KnewtonCaseStudyPage} />
      <Route path="/case-studies/riiid-labs" component={RiiidLabsCaseStudyPage} />
      <Route path="/case-studies/housecanary" component={HouseCanaryCaseStudyPage} />
      <Route path="/case-studies/alphasense" component={AlphaSenseCaseStudyPage} />
      <Route path="/case-studies/mindtrip" component={MindtripCaseStudyPage} />
      <Route path="/case-studies/brainfish" component={BrainfishCaseStudyPage} />
      <Route path="/case-studies/properti-ai" component={PropertiAICaseStudyPage} />
      <Route path="/case-studies/dartmouth-college" component={DartmouthCollegeCaseStudyPage} />
      <Route path="/case-studies/innit" component={InnitCaseStudyPage} />
      <Route path="/case-studies/hungryroot" component={HungryrootCaseStudyPage} />
      <Route path="/case-studies/navan" component={NavanCaseStudyPage} />
      <Route path="/case-studies/geovea" component={GeoveaCaseStudyPage} />
      <Route path="/case-studies/luxury-escapes" component={LuxuryEscapesCaseStudyPage} />
      <Route path="/case-studies/naratix" component={NaratixCaseStudyPage} />
      <Route path="/services/agentic-ai-systems" component={AgenticAISystemsPage} />
      <Route path="/services/voice-agents" component={AIVoiceAgentsPage} />
      <Route path="/services/chatbots" component={ConversationalAIChatbotsPage} />
      <Route path="/services/rag-knowledge" component={RAGKnowledgeAIPage} />
      <Route path="/services/predictive-analytics" component={PredictiveAnalyticsAIPage} />
      <Route path="/services/computer-vision" component={ComputerVisionSolutionsPage} />
      <Route path="/services/custom-ai-product" component={CustomAIProductDevelopmentPage} />
      <Route path="/industries/healthcare" component={HealthcareIndustryPage} />
      <Route path="/industries/real-estate" component={RealEstateIndustryPage} />
      <Route path="/industries/edtech" component={EdTechIndustryPage} />
      <Route path="/industries/retail" component={EcommerceIndustryPage} />
      <Route path="/industries/fintech" component={FintechIndustryPage} />
      <Route path="/industries/insurance" component={InsuranceIndustryPage} />
      <Route path="/industries/logistics" component={LogisticsIndustryPage} />
      <Route path="/industries/hospitality" component={HospitalityIndustryPage} />
      <Route path="/intelligence/operational" component={OperationalIntelligencePage} />
      <Route path="/intelligence/conversational" component={ConversationalIntelligencePage} />
      <Route path="/intelligence/decision" component={DecisionIntelligencePage} />
      <Route path="/intelligence/agentic" component={AgenticSystemsPage} />
      <Route path="/intelligence/enterprise-knowledge" component={EnterpriseKnowledgePage} />
      <Route path="/corporate/about" component={AboutPage} />
      <Route path="/about" component={AboutPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <FloatingChatCta />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
