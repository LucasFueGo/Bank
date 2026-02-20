import { BrowserRouter } from "react-router-dom"; 
import { ProviderWrapper } from "./context/AuthContext";
import { DateProvider } from "./context/DateContext";
import App from "./App.jsx";

const AppLoader= () => {
  return (
    <BrowserRouter>
      <ProviderWrapper >
        <DateProvider>
          <App />
        </DateProvider>
      </ProviderWrapper >
    </BrowserRouter>
  )
}

export default AppLoader