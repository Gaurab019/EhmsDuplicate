export default function Footer({ billername }) {
  return (
    <>
      <footer className="footer flex justify-between items-center border-gray-300  mt-10">
        <span className="">
          Created By:{" "}
          <span className="font-bold">{billername.toUpperCase()}</span>
        </span>
        <span className="font-bold">Authorised Signature</span>
      </footer>
    </>
  );
}
