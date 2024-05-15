import Footer from "./footer.js";
import Header from "./header.js";
function Layout(props) {
  return (
    <>
      <Header></Header>
      <main style={{ height: "85vh" }}>{props.children}</main>
      <Footer></Footer>
    </>
  );
}

export default Layout;
