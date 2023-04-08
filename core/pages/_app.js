import "bootstrap/dist/css/bootstrap.css";
import "@/styles/profile.css";
import "@/styles/globals.css";
import CartContextProvider from "@/contexts/CartContext";
import AuthContextProvider from "@/contexts/AuthContext";
import CategoriesContextProvider from "@/contexts/CategoriesContexts";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <CategoriesContextProvider>
          <Component {...pageProps} />
        </CategoriesContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  );
}
