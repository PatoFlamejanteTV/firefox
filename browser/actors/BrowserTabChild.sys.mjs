/* vim: set ts=2 sw=2 sts=2 et tw=80: */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

export class BrowserTabChild extends JSWindowActorChild {
  constructor() {
    super();
  }

  receiveMessage(message) {
    let context = this.manager.browsingContext;
    let docShell = context.docShell;

    switch (message.name) {
      case "ForceEncodingDetection":
        docShell.forceEncodingDetection();
        break;
      case "GravityMode":
        if (!this.gravityPhysics) {
          this.gravityPhysics = new GravityPhysics(this.contentWindow);
        }
        if (this.gravityPhysics.isActive()) {
          this.gravityPhysics.stop();
        } else {
          this.gravityPhysics.start();
        }
        break;
    }
  }
}

class GravityPhysics {
  constructor(win) {
    this.win = win;
    this.interval = null;
    this.elements = [];
  }

  isActive() {
    return !!this.interval;
  }

  start() {
    if (this.interval) this.stop();

    let doc = this.win.document;
    if (!doc || !doc.body) return;

    let selectors = ":is(div, p, img, h1, h2, h3, h4, h5, h6, a, span, button, input, li, td, section, article, svg, canvas):not(html, body, head, script, style, noscript, title, meta, link):is([style*=\"height\"], [style*=\"width\"]):not(:empty)";
    let candidates = Array.from(doc.body.querySelectorAll(selectors));

    let initialScrollY = this.win.scrollY;

    this.elements = candidates.map(el => {
      let rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return null;

      return {
        el,
        vx: (Math.random() - 0.5) * 5,
        vy: 0,
        x: 0,
        y: 0,
        rot: 0,
        vrot: (Math.random() - 0.5) * 5,
        originalTransform: el.style.transform,
        originalTransition: el.style.transition,
        initialBottom: rect.bottom
      };
    }).filter(d => d !== null);

    this.elements.forEach(d => {
      d.el.style.transition = "none";
    });

    let gravity = 0.5;

    let lastTime = 0;
    const animate = (timestamp) => {
      if (!this.interval) return; // a way to stop the loop
      if (!lastTime) lastTime = timestamp;
      const deltaTime = (timestamp - lastTime) / 20; // Normalize to original 20ms interval
      lastTime = timestamp;

      let floor = this.win.innerHeight;
      let scrollDiff = this.win.scrollY - initialScrollY;

      this.elements.forEach(d => {
        d.vy += gravity * deltaTime;
        d.x += d.vx * deltaTime;
        d.y += d.vy * deltaTime;
        d.rot += d.vrot * deltaTime;

        let visualBottom = d.initialBottom + d.y - scrollDiff;

        if (visualBottom >= floor && d.vy > 0) {
          d.vy *= -0.6;
          d.vx *= 0.8;
          d.vrot *= 0.8;
        }

        d.el.style.transform = `translate(${d.x}px, ${d.y}px) rotate(${d.rot}deg)`;
      });

      this.interval = this.win.requestAnimationFrame(animate);
    };
    this.interval = this.win.requestAnimationFrame(animate);
  }

  stop() {
    if (this.interval) {
      this.win.clearInterval(this.interval);
      this.interval = null;
    }
    this.elements.forEach(d => {
      d.el.style.transform = d.originalTransform || "";
      d.el.style.transition = d.originalTransition || "";
    });
    this.elements = [];
  }
}
