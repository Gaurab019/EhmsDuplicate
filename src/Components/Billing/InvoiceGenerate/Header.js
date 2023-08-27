export default function Header({
  handlePrint,
  address,
  hospitalphno,
  asset,
  hospitallogo,
}) {
  return (
    <div className="flex justify-center gap-10">
      <div className="w-16 h-44 flex justify-center items-center">
        <img src={asset} alt="HospitalLogo" />
      </div>
      <header className="flex flex-col items-center justify-center mb-3 text-center">
        {/* <div> */}
        <h1 className="font-bold uppercase tracking-wide text-4xl mb-3">
          Sree Hospitals
        </h1>
        <p className="flex items-center justify-center">
          <span>{address}</span>{" "}
        </p>
        <p className="flex items-center justify-center">
          Ph No. : <span>{hospitalphno}</span>
        </p>
        {/* </div> */}

        {/* <div>
          <ul className="flex items-center justify-between flex-wrap">
            <li>
              <button
                onClick={handlePrint}
                className="bg-gray-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-gray-500 hover:bg-transparent hover:text-gray-500 transition-all duration-300"
              >
                Print
              </button>
            </li>
            <li className="mx-2">
              <button className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
                Download
              </button>
            </li>
            <li>
              <button className="bg-green-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-green-500 hover:bg-transparent hover:text-green-500 transition-all duration-300">
                Send
              </button>
            </li>
          </ul>
        </div> */}
      </header>
      <div className="w-16 h-44  flex justify-center items-center">
        <img src={hospitallogo} alt="hospitallogo" />
      </div>
    </div>
  );
}
