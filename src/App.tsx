import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Ambulances from "./Pages/Ambulances";
import Doctors from "./Pages/Doctors";
import Home from "./Pages/Home";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system">
          <BrowserRouter>
            <Routes>
              <Route path="/" Component={Home}></Route>
              <Route path="/doctors" Component={Doctors}></Route>
              <Route path="/ambulances" Component={Ambulances}></Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>

        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
