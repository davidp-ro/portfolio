import Script from "next/script";

export default function TestAddToCalPage() {
  return (
    <main className="h-screen w-full max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mt-6 mb-1">Add to Calendar Test</h1>
      <p className="mb-8">
        This page is expecting a <code>sksid</code> parameter in the URL to
        render the "Add to Calendar" SalesKick widget below.
      </p>
      <div id="sk-add-to-cal"></div>
      <Script
        async
        src="https://cdn.saleskick.com/embed/add-to-cal/latest.js"
        strategy="afterInteractive"
      />
      <Script id="sk-add-to-cal-init" strategy="afterInteractive">
        {`
          window.addEventListener("sk:addToCal:ready", function () {
            window.SK_ADD_TO_CAL.setConfig({
              "submissionId": new URLSearchParams(location.search).get("sksid")
            });
            window.SK_ADD_TO_CAL.load();
          });
        `}
      </Script>
    </main>
  );
}
