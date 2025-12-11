/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*-
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var Gravity = {
  toggle() {
    let browser = gBrowser.selectedBrowser;

    let script = `
        (function() {
            if (window.__gravityRunning) {
                return;
            }
            window.__gravityRunning = true;

            let bodies = [];
            let lastTime = performance.now();

            function createBody(el) {
                let rect = el.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) return null;

                let style = window.getComputedStyle(el);
                if (style.display === 'none' || style.visibility === 'hidden') return null;
                if (style.position === 'fixed') return null;

                return {
                    el: el,
                    x: rect.left,
                    y: rect.top,
                    vx: (Math.random() - 0.5) * 10,
                    vy: 0,
                    w: rect.width,
                    h: rect.height,
                    rot: 0,
                    vrot: (Math.random() - 0.5) * 0.2
                };
            }

            let elements = document.body.querySelectorAll("div, p, h1, h2, h3, h4, h5, h6, img, button, input, textarea, a, span, li, tr, td");

            for (let el of elements) {
                let body = createBody(el);
                if (body) {
                    bodies.push(body);
                    // Lock dimensions before setting position fixed
                    el.style.width = body.w + "px";
                    el.style.height = body.h + "px";
                    el.style.boxSizing = "border-box";
                }
            }

            // Apply fixed position after calculating everything to avoid layout shifts affecting subsequent calculations (mostly)
             for (let b of bodies) {
                 b.el.style.position = "fixed";
                 b.el.style.left = b.x + "px";
                 b.el.style.top = b.y + "px";
                 b.el.style.margin = "0";
                 b.el.style.transformOrigin = "center center";
             }

            function update() {
                let now = performance.now();
                let dt = Math.min((now - lastTime) / 16, 2); // Limit dt to avoid huge jumps
                lastTime = now;

                for (let b of bodies) {
                    b.vy += 0.5 * dt; // gravity
                    b.x += b.vx * dt;
                    b.y += b.vy * dt;
                    b.rot += b.vrot * dt;

                    // Floor
                    if (b.y + b.h > window.innerHeight) {
                        b.y = window.innerHeight - b.h;
                        b.vy *= -0.6;
                        b.vx *= 0.9;
                    }

                    // Walls
                    if (b.x < 0) {
                        b.x = 0;
                        b.vx *= -0.6;
                    }
                    if (b.x + b.w > window.innerWidth) {
                        b.x = window.innerWidth - b.w;
                        b.vx *= -0.6;
                    }

                    b.el.style.left = b.x + "px";
                    b.el.style.top = b.y + "px";
                    b.el.style.transform = "rotate(" + b.rot + "rad)";
                }

                requestAnimationFrame(update);
            }

            requestAnimationFrame(update);
        })();
    `;

    let mm = browser.messageManager;
    mm.loadFrameScript(
      "data:application/javascript," + encodeURIComponent(script),
      false
    );

    // Notification
    let notificationBox = gBrowser.getNotificationBox(browser);
    if (notificationBox) {
      let label = gNavigatorBundle.getString("gravity.enabled.label");
      notificationBox.appendNotification("gravity-enabled", {
        label,
        priority: notificationBox.PRIORITY_INFO_LOW,
      });
    }
  },
};
