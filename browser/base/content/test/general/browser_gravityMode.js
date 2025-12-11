/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */

"use strict";

add_task(async function test_gravity_mode() {
  await BrowserTestUtils.withNewTab({
    gBrowser,
    url: "data:text/html,<body><div id='falling' style='width:100px;height:100px;background:red;'>Falling</div></body>"
  }, async function(browser) {
    // Wait for content to load
    await SpecialPowers.spawn(browser, [], async function() {
      // Ensure element is initially static
      let div = content.document.getElementById("falling");
      Assert.ok(!div.style.transform.includes("translate"), "Element should not have transform initially");
    });

    // Trigger gravity mode
    let win = browser.ownerGlobal;
    let cmd = win.document.getElementById("cmd_gravityMode");
    Assert.ok(cmd, "Command element exists");
    cmd.doCommand();

    // Wait for gravity to kick in (interval is 20ms)
    // We use a small delay
    await new Promise(r => setTimeout(r, 200));

    await SpecialPowers.spawn(browser, [], async function() {
      let div = content.document.getElementById("falling");
      // It should have transform now
      Assert.ok(div.style.transform.includes("translate"), "Element should have transform after gravity mode enabled. Got: " + div.style.transform);
    });

    // Toggle off
    cmd.doCommand();

    await new Promise(r => setTimeout(r, 100));

    await SpecialPowers.spawn(browser, [], async function() {
      let div = content.document.getElementById("falling");
      Assert.ok(!div.style.transform.includes("translate"), "Element should reset transform after gravity mode disabled. Got: " + div.style.transform);
    });
  });
});
