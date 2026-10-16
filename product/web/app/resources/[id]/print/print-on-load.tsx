"use client";

import { useEffect } from "react";

/** Opens the print dialog once the sheet has loaded, and offers a button to print again. */
export function PrintOnLoad() {
  useEffect(() => {
    window.print();
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-white print:hidden"
    >
      Print again
    </button>
  );
}
