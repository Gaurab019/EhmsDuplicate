export default function MainDetails({ admissionReceipt, IPR }) {
  return (
    <>
      {!admissionReceipt ? (
        <section className="flex flex-col items-center justify-start gap-2">
          <hr className="border-2 border-black" width="100%"></hr>
          {!IPR ? (
            <h2 className="font-bold text-xl uppercase mb-1">Paid Bill</h2>
          ) : (
            <h2 className="font-bold text-xl uppercase mb-1">
              IN Patient Bill
            </h2>
          )}
        </section>
      ) : (
        <section className="flex flex-col items-center justify-start gap-2">
          <hr className="border-2 border-black" width="100%"></hr>
          <h2 className="font-bold text-xl uppercase mb-1">
            Admission Receipt
          </h2>
        </section>
      )}
    </>
  );
}
