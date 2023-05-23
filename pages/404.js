import Link from "next/link";

function NotFound() {
  return (
    <div className="notFoundContainer">
      <Link href="/">Home Page</Link>
      <div className="notFoundTextContainer">
        <h1>Pages Not Found!!!</h1>;
      </div>
    </div>
  );
}

export default NotFound;
