import Layout from "../components/Layout";
import { useAuth } from "../context/auth";

function HomePage() {
  const [auth, setAuth] = useAuth();
  return (
    <div>
      <Layout
        title="Home - Ecommerce "
        description="Home page for the application"
        keywords="mongodb react js node express"
      >
        This is HomPage Page
        <pre>{JSON.stringify(auth)}</pre>
      </Layout>
    </div>
  );
}

export default HomePage;
