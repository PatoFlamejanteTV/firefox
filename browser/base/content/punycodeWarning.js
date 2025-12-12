document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const targetUrl = urlParams.get("url");

    document.getElementById("goBackButton").addEventListener("click", () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "about:newtab";
        }
    });

    document.getElementById("readMoreButton").addEventListener("click", () => {
        const descContainer = document.getElementById("errorDescriptionContainer");
        descContainer.hidden = !descContainer.hidden;
    });

    document.getElementById("proceedButton").addEventListener("click", () => {
        if (targetUrl) {
            let newUrl;
            try {
                newUrl = new URL(targetUrl);
            } catch(e) {
                console.error("Invalid target URL", targetUrl);
                return;
            }
            newUrl.searchParams.set("ignorePunycode", "1");
            window.location.href = newUrl.href;
        }
    });
});
