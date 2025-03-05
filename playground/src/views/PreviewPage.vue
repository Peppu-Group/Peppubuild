<template>
    <div>
        <iframe id="preview-frame" style="width: 100%; height: 100vh; border: none;"></iframe>
    </div>
</template>
  
<script>
import { onMounted } from "vue";

export default {
    setup() {
        onMounted(() => {
            const html = sessionStorage.getItem("grapes-html") || "<p>No content available</p>";
            const css = sessionStorage.getItem("grapes-css") || "";
            const iframeElement = document.getElementById("preview-frame");

            const iframeDoc = iframeElement.contentWindow.document;

            // ✅ Function to add scripts dynamically inside the iframe
            const addScript = (src) => {
                return new Promise((resolve, reject) => {
                    const script = iframeDoc.createElement("script");
                    script.src = src;
                    script.async = true;
                    script.onload = () => {
                        console.log(`${src} loaded inside iframe`);
                        resolve();
                    };
                    script.onerror = () => {
                        console.error(`Failed to load ${src}`);
                        reject();
                    };
                    iframeDoc.head.appendChild(script);
                });
            };

            // ✅ Ensure the iframe triggers DOMContentLoaded manually
            const triggerDOMContentLoaded = () => {
                const event = new Event("DOMContentLoaded", {
                    bubbles: true,
                    cancelable: true,
                });
                iframeDoc.dispatchEvent(event);
            };


            iframeElement.onload = () => {
                // Open iframe document
                iframeDoc.open();
                iframeDoc.write(`
        <html>
        <head>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
          <style>${css}</style>
        </head>
        <body>${html}</body>
        </html>
      `);
                iframeDoc.close();

                // ✅ Add JavaScript file dynamically
                // Step 2: Load PeppuToken and trigger DOMContentLoaded manually
                addScript("https://cdn.jsdelivr.net/npm/pepputoken@0.0.5/dist/index.min.js")
                    .then(() => addScript("https://unpkg.com/sweetalert/dist/sweetalert.min.js"))
                    .then(() => {
                        console.log("PeppuToken loaded!");
                        triggerDOMContentLoaded(); // ✅ Manually trigger DOMContentLoaded event
                });
            }
        });

        return {};
    }
};
</script>
  
<style>
/* Add any global styles if needed */
</style>
