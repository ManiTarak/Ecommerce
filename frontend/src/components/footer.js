import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-neutral-900 flex  flex-col justify-center items-center text-white absolute bottom-0 w-[100%]">
      <h2 className="text-[20px] mt-[16px] font-semibold">
        All Rights Reserved by &copy; Mani MJ
      </h2>
      <div className="flex gap-4 mt-[8px] text-sm mb-[4px]">
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
