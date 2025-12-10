/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// Simple deterministic PRNG
let seed = 12345;
function random() {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
}

export const GravityMode = {
  // Map window -> state
  windows: new WeakMap(),

  toggle(window) {
    let state = this.windows.get(window);
    if (state && state.enabled) {
      this.stop(window);
    } else {
      this.start(window);
    }
  },

  start(window) {
    let document = window.document;
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

    let elements = [];
    for (let el of targets) {
      let rect = el.getBoundingClientRect();
      elements.push({
        node: el,
        originalBottom: rect.bottom, // Use initial bottom for floor collision
        x: 0,
        y: 0,
        vx: (random() - 0.5) * 10,
        vy: 0,
        rot: 0,
        vrot: (random() - 0.5) * 0.05,
      });
    }

    let state = {
      enabled: true,
      elements: elements,
      lastTime: window.performance.now(),
      requestID: null,
    };

    this.windows.set(window, state);

    const animate = (time) => {
      if (!state.enabled) return;

      let dt = (time - state.lastTime) / 16;
      if (dt > 4) dt = 4;
      state.lastTime = time;

      let height = document.documentElement.clientHeight;

      for (let item of state.elements) {
        item.vy += 0.5 * dt; // Gravity
        item.x += item.vx * dt;
        item.y += item.vy * dt;
        item.rot += item.vrot * dt;

        // Floor collision
        // We assume the element was initially static.
        // currentBottom = originalBottom + item.y
        let currentBottom = item.originalBottom + item.y;

        if (currentBottom >= height) {
          let overshoot = currentBottom - height;
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

        // Using toFixed(2) as requested to ensure numeric output
        item.node.style.transform = `translate(${item.x.toFixed(2)}px, ${item.y.toFixed(2)}px) rotate(${item.rot.toFixed(4)}rad)`;
      }

      state.requestID = window.requestAnimationFrame(animate);
    };

    state.requestID = window.requestAnimationFrame(animate);
  },

  stop(window) {
    let state = this.windows.get(window);
    if (!state) return;

    state.enabled = false;
    if (state.requestID) {
      window.cancelAnimationFrame(state.requestID);
    }

    for (let item of state.elements) {
      item.node.style.transform = "";
    }

    this.windows.delete(window);
  },
};
