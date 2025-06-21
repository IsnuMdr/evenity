"use client";

import { useRef } from "react";
import { ITicket } from "@/lib/database/models/ticket.model";
import { DownloadIcon } from "lucide-react";
import TicketCard from "./TicketCard";
import html2canvas from "html2canvas";

const TicketDownloadButton = ({ ticket }: { ticket: ITicket }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const downloadAsImage = async () => {
    if (!printRef.current) return;

    // 💡 Tunggu hingga DOM stabil
    await new Promise((r) => requestAnimationFrame(r));
    await new Promise((r) => setTimeout(r, 300));

    const canvas = await html2canvas(printRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
      scrollX: 0,
      scrollY: 0,
      windowWidth: 800, // bantu render viewport
    });

    const imgData = canvas.toDataURL("image/png");
    const pdfModule = await import("jspdf");
    const jsPDF = pdfModule.default;
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [5.5, 3],
    });
    pdf.addImage(imgData, "PNG", 0, 0, 5.5, 3);
    pdf.save(`ticket-${ticket._id}.pdf`);
  };

  return (
    <>
      {/* Area untuk print (disembunyikan dari layar, tapi tetap dirender) */}
      <div
        ref={printRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          zIndex: -1,
          width: "800px", // lebar tetap
          padding: "2rem",
          background: "#fff",
          overflow: "hidden", // cegah konten melebihi
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth: "100%",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          <TicketCard ticketData={ticket} />
        </div>
      </div>

      {/* Tombol print */}
      <button
        onClick={downloadAsImage}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition flex items-center"
      >
        <DownloadIcon className="h-5 w-5 mr-2" />
        Download
      </button>
    </>
  );
};

export default TicketDownloadButton;
