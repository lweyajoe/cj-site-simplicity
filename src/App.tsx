import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import WhatsAppWidget from "./components/WhatsAppWidget";
import { CartProvider } from "./contexts/CartContext";
import { publicRoutes } from "./routes/publicRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { productManagementRoutes } from "./routes/productManagementRoutes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
const helmetContext = {};

const App = () => (
  <HelmetProvider context={helmetContext}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <ErrorBoundary>
            <Helmet>
              <title>CPAJoe Financial Advisory</title>
              <meta name="description" content="Expert financial advisory services in Kenya" />
              <meta name="robots" content="index, follow" />
              <meta property="og:type" content="website" />
              <meta property="og:site_name" content="CPAJoe - Financial Advisory" />
              <meta name="twitter:site" content="@CPAJoeKenya" />
            </Helmet>
            <Toaster />
            <Sonner />
            <WhatsAppWidget />
            <BrowserRouter>
              <Routes>
                {publicRoutes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                ))}
                {adminRoutes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                ))}
                {productManagementRoutes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                ))}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ErrorBoundary>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;