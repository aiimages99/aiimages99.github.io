document.addEventListener("DOMContentLoaded", function () {
    const adsFrames = document.querySelectorAll(".adsframe");
  
    adsFrames.forEach((adsFrame) => {
      const url = adsFrame.getAttribute("data-url");
      if (url) {
        // Set the required styles for the div
        adsFrame.style.position = "relative";
        adsFrame.style.width = "100%";
        adsFrame.style.height = "100%"; // Customize height if needed
        //adsFrame.style.min-height = "100px";
        adsFrame.style.paddingBottom = "25%"; // Adjust padding as required
  
        // Create the iframe element
        const iframe = document.createElement("iframe");
        iframe.src = url;
        iframe.style.position = "absolute";
        iframe.style.top = "0";
        iframe.style.left = "0";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";
  
        // Append the iframe to the div
        adsFrame.appendChild(iframe);
      }
    });
  });