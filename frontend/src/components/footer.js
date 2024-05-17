import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-neutral-900 flex  flex-col justify-center items-center text-white">
      <h2 className="text-2xl mt-4 font-semibold">
        All Rights Reserved by &copy; Mani MJ
      </h2>
      <div className="flex gap-4 mt-2 text-sm mb-1">
        <Link className="hover:text-gray-400" to="/about">
          About &nbsp; |
        </Link>
        <Link className="hover:text-gray-400" to="/contact">
          Contact &nbsp; |
        </Link>
        <Link className="hover:text-gray-400" to="/policy">
          Privacy Policy &nbsp;
        </Link>
      </div>
    </div>
  );
}

export default Footer;
