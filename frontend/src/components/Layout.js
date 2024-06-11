import Footer from "./footer.js";
import Header from "./header.js";
import { Helmet } from "react-helmet";
function Layout(props) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={props.description} />
        <meta name="author" content="Mani MJ" />
        <meta name="keywords" content={props.keywords} />
        <title>{props.title}</title>
      </Helmet>
      <Header></Header>
      <main style={{ height: "76vh" }} className="overflow-y-auto">
        {props.children}
      </main>
      <Footer></Footer>
    </>
  );
}
Layout.defaultProps = {
  description: "Mern stack project",
  keywords: "mongoDB,ReactJS,Node,Express,MERN",
  title: "Ecommmerce - Mani",
};

export default Layout;
