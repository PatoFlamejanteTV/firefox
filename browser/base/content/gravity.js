/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*-
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint-disable no-undef */

var Gravity = {
  toggle() {
    let browser = gBrowser.selectedBrowser;
    let script = `
      (function() {
        // Access content window
        let win = content;
        let doc = content.document;

        if (win.__gravityInterval) {
            win.clearInterval(win.__gravityInterval);
            win.__gravityInterval = null;
            win.location.reload();
            return;
        }

        let elements = Array.from(doc.body.getElementsByTagName("*"));
        let bodies = [];

        for (let el of elements) {
            let rect = el.getBoundingClientRect();
            if (rect.width > 5 && rect.height > 5) {
                 let style = win.getComputedStyle(el);
                 if (style.display === 'none' || style.visibility === 'hidden') continue;

                bodies.push({
                    el: el,
                    x: rect.left,
                    y: rect.top,
                    vx: (Math.random() - 0.5) * 10,
                    vy: 0,
                    w: rect.width,
                    h: rect.height
                });
            }
        }

        for (let b of bodies) {
            b.el.style.position = "fixed";
            b.el.style.left = b.x + "px";
            b.el.style.top = b.y + "px";
            b.el.style.width = b.w + "px";
            b.el.style.height = b.h + "px";
            b.el.style.margin = "0";
            b.el.style.transform = "none";
            b.el.style.transition = "none";
        }

        win.__gravityInterval = win.setInterval(() => {
            for (let b of bodies) {
                b.vy += 1;
                b.x += b.vx;
                b.y += b.vy;

                if (b.y + b.h > win.innerHeight) {
                    b.y = win.innerHeight - b.h;
                    b.vy *= -0.6;
                    b.vx *= 0.9;
                }
                if (b.x < 0) {
                    b.x = 0;
                    b.vx *= -0.6;
                }
                if (b.x + b.w > win.innerWidth) {
                    b.x = win.innerWidth - b.w;
                    b.vx *= -0.6;
                }

                b.el.style.left = b.x + "px";
                b.el.style.top = b.y + "px";
            }
        }, 20);
      })();
    `;

    browser.messageManager.loadFrameScript(
      "data:application/javascript," + encodeURIComponent(script),
      false
    );
  },
};
