/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

window.GravityMode = {
  enabled: false,
  elements: [],
  lastTime: 0,
  requestID: null,

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.start();
    } else {
      this.stop();
    }
  },

  start() {
    let targets = [];

    // Toolbars
    let toolbox = document.getElementById("navigator-toolbox");
    if (toolbox) {
      for (let child of toolbox.children) {
        if (!child.hidden && window.getComputedStyle(child).display !== "none") {
          targets.push(child);
        }
      }
    }

    // Content area
    let browser = document.getElementById("browser");
    if (browser) {
      targets.push(browser);
    }

    this.elements = [];
    for (let el of targets) {
      let rect = el.getBoundingClientRect();
      this.elements.push({
        node: el,
        originalBottom: rect.bottom, // Use initial bottom for floor collision
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 10,
        vy: 0,
        rot: 0,
        vrot: (Math.random() - 0.5) * 0.05,
      });
    }

    this.lastTime = performance.now();
    this.requestID = window.requestAnimationFrame(this.animate.bind(this));
  },

  animate(time) {
    if (!this.enabled) return;

    const dt = (time - this.lastTime) / 1000; // Delta time in seconds
    this.lastTime = time;

    let height = document.documentElement.clientHeight;

    for (let item of this.elements) {
      item.vy += 0.5 * dt; // Gravity
      item.x += item.vx * dt;
      item.y += item.vy * dt;
      item.rot += item.vrot * dt;

      // Floor collision
      let rect = item.node.getBoundingClientRect();

      if (rect.bottom >= height) {
        // Adjust position based on how much the bottom is past the floor.
        // This is a simplification; a more complex model would be needed for perfect rotation correction.
        let overshoot = rect.bottom - height;
        item.y -= overshoot;

        // Bounce
        item.vy *= -0.6;

        // Friction
        item.vx *= 0.95;
        item.vrot *= 0.9;

        // Stop if slow
        if (Math.abs(item.vy) < 0.5) item.vy = 0;
        if (Math.abs(item.vx) < 0.1) item.vx = 0;
        if (Math.abs(item.vrot) < 0.001) item.vrot = 0;
      }

      item.node.style.transform = `translate(${item.x}px, ${item.y}px) rotate(${item.rot}rad)`;
    }

    this.requestID = window.requestAnimationFrame(this.animate.bind(this));
  },

  stop() {
    if (this.requestID) {
      window.cancelAnimationFrame(this.requestID);
      this.requestID = null;
    }

    for (let item of this.elements) {
      item.node.style.transform = "";
    }
    this.elements = [];
  },
};
