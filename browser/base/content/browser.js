/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*-
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var { XPCOMUtils } = ChromeUtils.importESModule(
  "resource://gre/modules/XPCOMUtils.sys.mjs"
);
var { AppConstants } = ChromeUtils.importESModule(
  "resource://gre/modules/AppConstants.sys.mjs"
);

// lazy module getters

ChromeUtils.defineESModuleGetters(this, {
  AIWindow:
    "moz-src:///browser/components/aiwindow/ui/modules/AIWindow.sys.mjs",
  AMTelemetry: "resource://gre/modules/AddonManager.sys.mjs",
  AboutNewTab: "resource:///modules/AboutNewTab.sys.mjs",
  AboutReaderParent: "resource:///actors/AboutReaderParent.sys.mjs",
  ActionsProviderContextualSearch:
    "moz-src:///browser/components/urlbar/ActionsProviderContextualSearch.sys.mjs",
  AddonManager: "resource://gre/modules/AddonManager.sys.mjs",
  BrowserTelemetryUtils: "resource://gre/modules/BrowserTelemetryUtils.sys.mjs",
  BrowserUIUtils: "resource:///modules/BrowserUIUtils.sys.mjs",
  BrowserUsageTelemetry: "resource:///modules/BrowserUsageTelemetry.sys.mjs",
  BrowserWindowTracker: "resource:///modules/BrowserWindowTracker.sys.mjs",
  CFRPageActions: "resource:///modules/asrouter/CFRPageActions.sys.mjs",
  Color: "resource://gre/modules/Color.sys.mjs",
  ContentAnalysis:
    "moz-src:///browser/components/contentanalysis/content/ContentAnalysis.sys.mjs",
  ContextualIdentityService:
    "resource://gre/modules/ContextualIdentityService.sys.mjs",
  CustomizableUI:
    "moz-src:///browser/components/customizableui/CustomizableUI.sys.mjs",
  DevToolsSocketStatus:
    "resource://devtools/shared/security/DevToolsSocketStatus.sys.mjs",
  DownloadUtils: "resource://gre/modules/DownloadUtils.sys.mjs",
  DownloadsCommon:
    "moz-src:///browser/components/downloads/DownloadsCommon.sys.mjs",
  E10SUtils: "resource://gre/modules/E10SUtils.sys.mjs",
  ExtensionsUI: "resource:///modules/ExtensionsUI.sys.mjs",
  HomePage: "resource:///modules/HomePage.sys.mjs",
  LightweightThemeConsumer:
    "resource://gre/modules/LightweightThemeConsumer.sys.mjs",
  LoginHelper: "resource://gre/modules/LoginHelper.sys.mjs",
  LoginManagerParent: "resource://gre/modules/LoginManagerParent.sys.mjs",
  MigrationUtils: "resource:///modules/MigrationUtils.sys.mjs",
  NetUtil: "resource://gre/modules/NetUtil.sys.mjs",
  NewTabPagePreloading:
    "moz-src:///browser/components/tabbrowser/NewTabPagePreloading.sys.mjs",
  NewTabUtils: "resource://gre/modules/NewTabUtils.sys.mjs",
  NimbusFeatures: "resource://nimbus/ExperimentAPI.sys.mjs",
  nsContextMenu: "chrome://browser/content/nsContextMenu.sys.mjs",
  OpenInTabsUtils:
    "moz-src:///browser/components/tabbrowser/OpenInTabsUtils.sys.mjs",
  OpenSearchManager:
    "moz-src:///browser/components/search/OpenSearchManager.sys.mjs",
  PageActions: "resource:///modules/PageActions.sys.mjs",
  PageThumbs: "resource://gre/modules/PageThumbs.sys.mjs",
  PanelMultiView:
    "moz-src:///browser/components/customizableui/PanelMultiView.sys.mjs",
  PanelView:
    "moz-src:///browser/components/customizableui/PanelMultiView.sys.mjs",
  PictureInPicture: "resource://gre/modules/PictureInPicture.sys.mjs",
  PlacesTransactions: "resource://gre/modules/PlacesTransactions.sys.mjs",
  PlacesUIUtils: "moz-src:///browser/components/places/PlacesUIUtils.sys.mjs",
  PlacesUtils: "resource://gre/modules/PlacesUtils.sys.mjs",
  PopupAndRedirectBlockerObserver:
    "resource:///modules/PopupAndRedirectBlockerObserver.sys.mjs",
  PrivateBrowsingUtils: "resource://gre/modules/PrivateBrowsingUtils.sys.mjs",
  PrivateBrowsingUI: "moz-src:///browser/modules/PrivateBrowsingUI.sys.mjs",
  ProcessHangMonitor: "resource:///modules/ProcessHangMonitor.sys.mjs",
  ProfilesDatastoreService:
    "moz-src:///toolkit/profile/ProfilesDatastoreService.sys.mjs",
  PromptUtils: "resource://gre/modules/PromptUtils.sys.mjs",
  ReaderMode: "moz-src:///toolkit/components/reader/ReaderMode.sys.mjs",
  ResetPBMPanel:
    "moz-src:///browser/components/privatebrowsing/ResetPBMPanel.sys.mjs",
  SafeBrowsing: "resource://gre/modules/SafeBrowsing.sys.mjs",
  Sanitizer: "resource:///modules/Sanitizer.sys.mjs",
  ScreenshotsUtils: "resource:///modules/ScreenshotsUtils.sys.mjs",
  SearchUIUtils: "moz-src:///browser/components/search/SearchUIUtils.sys.mjs",
  SelectableProfileService:
    "resource:///modules/profiles/SelectableProfileService.sys.mjs",
  SessionStartup: "resource:///modules/sessionstore/SessionStartup.sys.mjs",
  SessionStore: "resource:///modules/sessionstore/SessionStore.sys.mjs",
  SessionWindowUI: "resource:///modules/sessionstore/SessionWindowUI.sys.mjs",
  SharingUtils: "resource:///modules/SharingUtils.sys.mjs",
  ShortcutUtils: "resource://gre/modules/ShortcutUtils.sys.mjs",
  SiteDataManager: "resource:///modules/SiteDataManager.sys.mjs",
  SitePermissions: "resource:///modules/SitePermissions.sys.mjs",
  SubDialog: "resource://gre/modules/SubDialog.sys.mjs",
  SubDialogManager: "resource://gre/modules/SubDialog.sys.mjs",
  TabCrashHandler: "resource:///modules/ContentCrashHandlers.sys.mjs",
  TabsSetupFlowManager:
    "resource:///modules/firefox-view-tabs-setup-manager.sys.mjs",
  TaskbarTabsChrome:
    "resource:///modules/taskbartabs/TaskbarTabsChrome.sys.mjs",
  TelemetryEnvironment: "resource://gre/modules/TelemetryEnvironment.sys.mjs",
  ToolbarContextMenu:
    "moz-src:///browser/components/customizableui/ToolbarContextMenu.sys.mjs",
  ToolbarDropHandler:
    "moz-src:///browser/components/customizableui/ToolbarDropHandler.sys.mjs",
  ToolbarIconColor: "moz-src:///browser/themes/ToolbarIconColor.sys.mjs",
  TranslationsParent: "resource://gre/actors/TranslationsParent.sys.mjs",
  UITour: "moz-src:///browser/components/uitour/UITour.sys.mjs",
  UpdateUtils: "resource://gre/modules/UpdateUtils.sys.mjs",
  URILoadingHelper: "resource:///modules/URILoadingHelper.sys.mjs",
  UrlbarPrefs: "moz-src:///browser/components/urlbar/UrlbarPrefs.sys.mjs",
  UrlbarProviderSearchTips:
    "moz-src:///browser/components/urlbar/UrlbarProviderSearchTips.sys.mjs",
  UrlbarTokenizer:
    "moz-src:///browser/components/urlbar/UrlbarTokenizer.sys.mjs",
  UrlbarUtils: "moz-src:///browser/components/urlbar/UrlbarUtils.sys.mjs",
  Weave: "resource://services-sync/main.sys.mjs",
  WebNavigationFrames: "resource://gre/modules/WebNavigationFrames.sys.mjs",
  webrtcUI: "resource:///modules/webrtcUI.sys.mjs",
  WebsiteFilter: "resource:///modules/policies/WebsiteFilter.sys.mjs",
  ZoomUI: "resource:///modules/ZoomUI.sys.mjs",
});

ChromeUtils.defineLazyGetter(this, "fxAccounts", () => {
  return ChromeUtils.importESModule(
    "resource://gre/modules/FxAccounts.sys.mjs"
  ).getFxAccountsSingleton();
});

XPCOMUtils.defineLazyScriptGetter(
  this,
  ["BrowserCommands", "kSkipCacheFlags"],
  "chrome://browser/content/browser-commands.js"
);

XPCOMUtils.defineLazyScriptGetter(
  this,
  "PlacesTreeView",
  "chrome://browser/content/places/treeView.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  ["PlacesInsertionPoint", "PlacesController", "PlacesControllerDragHelper"],
  "chrome://browser/content/places/controller.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  "PrintUtils",
  "chrome://global/content/printUtils.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  "ZoomManager",
  "chrome://global/content/viewZoomOverlay.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  "FullZoom",
  "chrome://browser/content/tabbrowser/browser-fullZoom.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  "PanelUI",
  "chrome://browser/content/customizableui/panelUI.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  "gViewSourceUtils",
  "chrome://global/content/viewSourceUtils.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  "gTabsPanel",
  "chrome://browser/content/tabbrowser/browser-allTabsMenu.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  [
    "BrowserAddonUI",
    "gExtensionsNotifications",
    "gUnifiedExtensions",
    "gXPInstallObserver",
  ],
  "chrome://browser/content/browser-addons.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  "ctrlTab",
  "chrome://browser/content/tabbrowser/browser-ctrlTab.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  ["CustomizationHandler", "AutoHideMenubar"],
  "chrome://browser/content/browser-customization.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  ["PointerLock", "FullScreen"],
  "chrome://browser/content/browser-fullScreenAndPointerLock.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  "gIdentityHandler",
  "chrome://browser/content/browser-siteIdentity.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  "gPermissionPanel",
  "chrome://browser/content/browser-sitePermissionPanel.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  "SelectTranslationsPanel",
  "chrome://browser/content/translations/selectTranslationsPanel.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  "FullPageTranslationsPanel",
  "chrome://browser/content/translations/fullPageTranslationsPanel.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  "gProtectionsHandler",
  "chrome://browser/content/browser-siteProtections.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  "gTrustPanelHandler",
  "chrome://browser/content/browser-trustPanel.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  ["gGestureSupport", "gHistorySwipeAnimation"],
  "chrome://browser/content/browser-gestureSupport.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  "gSafeBrowsing",
  "chrome://browser/content/browser-safebrowsing.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  "gSync",
  "chrome://browser/content/browser-sync.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  "gBrowserThumbnails",
  "chrome://browser/content/browser-thumbnails.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  [
    "DownloadsPanel",
    "DownloadsOverlayLoader",
    "DownloadsView",
    "DownloadsViewUI",
    "DownloadsViewController",
    "DownloadsSummary",
    "DownloadsFooter",
    "DownloadsBlockedSubview",
  ],
  "chrome://browser/content/downloads/downloads.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  ["DownloadsButton", "DownloadsIndicatorView"],
  "chrome://browser/content/downloads/indicator.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  "gEditItemOverlay",
  "chrome://browser/content/places/editBookmark.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  "gGfxUtils",
  "chrome://browser/content/browser-graphics-utils.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  "ToolbarKeyboardNavigator",
  "chrome://browser/content/browser-toolbarKeyNav.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  "A11yUtils",
  "chrome://browser/content/browser-a11yUtils.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  "gSharedTabWarning",
  "chrome://browser/content/browser-webrtc.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  "gPageStyleMenu",
  "chrome://browser/content/browser-pagestyle.js"
);
XPCOMUtils.defineLazyScriptGetter(
  this,
  "gProfiles",
  "chrome://browser/content/browser-profiles.js"
);

// lazy service getters

XPCOMUtils.defineLazyServiceGetters(this, {
  ContentPrefService2: [
    "@mozilla.org/content-pref/service;1",
    Ci.nsIContentPrefService2,
  ],
  classifierService: [
    "@mozilla.org/url-classifier/dbservice;1",
    Ci.nsIURIClassifier,
  ],
  Favicons: ["@mozilla.org/browser/favicon-service;1", Ci.nsIFaviconService],
  WindowsUIUtils: ["@mozilla.org/windows-ui-utils;1", Ci.nsIWindowsUIUtils],
  BrowserHandler: ["@mozilla.org/browser/clh;1", Ci.nsIBrowserHandler],
});

if (AppConstants.ENABLE_WEBDRIVER) {
  XPCOMUtils.defineLazyServiceGetter(
    this,
    "Marionette",
    "@mozilla.org/remote/marionette;1",
    Ci.nsIMarionette
  );

  XPCOMUtils.defineLazyServiceGetter(
    this,
    "RemoteAgent",
    "@mozilla.org/remote/agent;1",
    Ci.nsIRemoteAgent
  );
} else {
  this.Marionette = { running: false };
  this.RemoteAgent = { running: false };
}

ChromeUtils.defineLazyGetter(this, "RTL_UI", () => {
  return Services.locale.isAppLocaleRTL;
});
function gLocaleChangeObserver() {
  delete window.RTL_UI;
  window.RTL_UI = Services.locale.isAppLocaleRTL;
}

ChromeUtils.defineLazyGetter(this, "gBrandBundle", () => {
  return Services.strings.createBundle(
    "chrome://branding/locale/brand.properties"
  );
});

ChromeUtils.defineLazyGetter(this, "gBrowserBundle", () => {
  return Services.strings.createBundle(
    "chrome://browser/locale/browser.properties"
  );
});

ChromeUtils.defineLazyGetter(this, "gCustomizeMode", () => {
  let { CustomizeMode } = ChromeUtils.importESModule(
    "moz-src:///browser/components/customizableui/CustomizeMode.sys.mjs"
  );
  return new CustomizeMode(window);
});

ChromeUtils.defineLazyGetter(this, "gNavToolbox", () => {
  return document.getElementById("navigator-toolbox");
});

ChromeUtils.defineLazyGetter(this, "gURLBar", () => {
  let urlbar = document.getElementById("urlbar");

  let beforeFocusOrSelect = event => {
    // In customize mode, the url bar is disabled. If a new tab is opened or the
    // user switches to a different tab, this function gets called before we've
    // finished leaving customize mode, and the url bar will still be disabled.
    // We can't focus it when it's disabled, so we need to re-run ourselves when
    // we've finished leaving customize mode.
    if (
      CustomizationHandler.isCustomizing() ||
      CustomizationHandler.isExitingCustomizeMode
    ) {
      gNavToolbox.addEventListener(
        "aftercustomization",
        () => {
          if (event.type == "beforeselect") {
            gURLBar.select();
          } else {
            gURLBar.focus();
          }
        },
        {
          once: true,
        }
      );
      event.preventDefault();
      return;
    }

    if (window.fullScreen) {
      FullScreen.showNavToolbox();
    }
  };
  urlbar.addEventListener("beforefocus", beforeFocusOrSelect);
  urlbar.addEventListener("beforeselect", beforeFocusOrSelect);

  return urlbar;
});

// High priority notification bars shown at the top of the window.
ChromeUtils.defineLazyGetter(this, "gNotificationBox", () => {
  let securityDelayMS = Services.prefs.getIntPref(
    "security.notification_enable_delay"
  );

  return new MozElements.NotificationBox(element => {
    element.classList.add("global-notificationbox");
    element.setAttribute("notificationside", "top");
    element.setAttribute("prepend-notifications", true);
    // We want this before the tab notifications.
    document.getElementById("notifications-toolbar").prepend(element);
  }, securityDelayMS);
});

ChromeUtils.defineLazyGetter(this, "InlineSpellCheckerUI", () => {
  let { InlineSpellChecker } = ChromeUtils.importESModule(
    "resource://gre/modules/InlineSpellChecker.sys.mjs"
  );
  return new InlineSpellChecker();
});

ChromeUtils.defineLazyGetter(this, "PopupNotifications", () => {
  // eslint-disable-next-line no-shadow
  let { PopupNotifications } = ChromeUtils.importESModule(
    "resource://gre/modules/PopupNotifications.sys.mjs"
  );
  try {
    // Hide all PopupNotifications while the the address bar has focus,
    // including the virtual focus in the results popup, and the URL is being
    // edited or the page proxy state is invalid while async tab switching.
    let shouldSuppress = () => {
      // "Blank" pages, like about:welcome, have a pageproxystate of "invalid", but
      // popups like CFRs should not automatically be suppressed when the address
      // bar has focus on these pages as it disrupts user navigation using FN+F6.
      // See `UrlbarInput.setURI()` where pageproxystate is set to "invalid" for
      // all pages that the "isBlankPageURL" method returns true for.
      const urlBarEdited = isBlankPageURL(gBrowser.currentURI.spec)
        ? gURLBar.hasAttribute("usertyping")
        : gURLBar.getAttribute("pageproxystate") != "valid";
      return (
        (urlBarEdited && gURLBar.focused) ||
        (gURLBar.getAttribute("pageproxystate") != "valid" &&
          gBrowser.selectedBrowser._awaitingSetURI) ||
        shouldSuppressPopupNotifications()
      );
    };

    // Before a Popup is shown, check that its anchor is visible.
    // If the anchor is not visible, use one of the fallbacks.
    // If no fallbacks are visible, return null.
    const getVisibleAnchorElement = anchorElement => {
      // If the anchor element is present in the Urlbar,
      // ensure that both the anchor and page URL are visible.
      gURLBar.maybeHandleRevertFromPopup(anchorElement);
      anchorElement?.dispatchEvent(
        new CustomEvent("PopupNotificationsBeforeAnchor", { bubbles: true })
      );
      if (anchorElement?.checkVisibility()) {
        return anchorElement;
      }
      let fallback = [
        document.getElementById("trust-icon-container"),
        gURLBar.querySelector(".searchmode-switcher-icon"),
        document.getElementById("identity-icon"),
        document.getElementById("remote-control-icon"),
      ];
      return fallback.find(element => element?.checkVisibility()) ?? null;
    };

    return new PopupNotifications(
      gBrowser,
      document.getElementById("notification-popup"),
      document.getElementById("notification-popup-box"),
      { shouldSuppress, getVisibleAnchorElement }
    );
  } catch (ex) {
    console.error(ex);
    return null;
  }
});

ChromeUtils.defineLazyGetter(this, "MacUserActivityUpdater", () => {
  if (AppConstants.platform != "macosx") {
    return null;
  }

  return Cc["@mozilla.org/widget/macuseractivityupdater;1"].getService(
    Ci.nsIMacUserActivityUpdater
  );
});

ChromeUtils.defineLazyGetter(this, "Win7Features", () => {
  if (AppConstants.platform != "win") {
    return null;
  }

  const WINTASKBAR_CONTRACTID = "@mozilla.org/windows-taskbar;1";
  if (
    WINTASKBAR_CONTRACTID in Cc &&
    Cc[WINTASKBAR_CONTRACTID].getService(Ci.nsIWinTaskbar).available
  ) {
    let { AeroPeek } = ChromeUtils.importESModule(
      "resource:///modules/WindowsPreviewPerTab.sys.mjs"
    );
    return {
      onOpenWindow() {
        AeroPeek.onOpenWindow(window);
        this.handledOpening = true;
      },
      onCloseWindow() {
        if (this.handledOpening) {
          AeroPeek.onCloseWindow(window);
        }
      },
      handledOpening: false,
    };
  }
  return null;
});

ChromeUtils.defineLazyGetter(this, "gRestoreLastSessionObserver", () => {
  let { RestoreLastSessionObserver } = ChromeUtils.importESModule(
    "resource:///modules/sessionstore/SessionWindowUI.sys.mjs"
  );
  return new RestoreLastSessionObserver(window);
});

XPCOMUtils.defineLazyPreferenceGetter(
  this,
  "gToolbarKeyNavEnabled",
  "browser.toolbars.keyboard_navigation",
  false,
  (aPref, aOldVal, aNewVal) => {
    if (window.closed) {
      return;
    }
    if (aNewVal) {
      ToolbarKeyboardNavigator.init();
    } else {
      ToolbarKeyboardNavigator.uninit();
    }
  }
);

XPCOMUtils.defineLazyPreferenceGetter(
  this,
  "gBookmarksToolbarVisibility",
  "browser.toolbars.bookmarks.visibility",
  "newtab"
);

XPCOMUtils.defineLazyPreferenceGetter(
  this,
  "gFxaToolbarEnabled",
  "identity.fxaccounts.toolbar.enabled",
  false,
  (aPref, aOldVal, aNewVal) => {
    updateFxaToolbarMenu(aNewVal);
  }
);

XPCOMUtils.defineLazyPreferenceGetter(
  this,
  "gFxaToolbarAccessed",
  "identity.fxaccounts.toolbar.accessed",
  false,
  () => {
    updateFxaToolbarMenu(gFxaToolbarEnabled);
  }
);

XPCOMUtils.defineLazyPreferenceGetter(
  this,
  "gAddonAbuseReportEnabled",
  "extensions.abuseReport.enabled",
  false
);

XPCOMUtils.defineLazyPreferenceGetter(
  this,
  "gMiddleClickNewTabUsesPasteboard",
  "browser.tabs.searchclipboardfor.middleclick",
  true
);

XPCOMUtils.defineLazyPreferenceGetter(
  this,
  "gPrintEnabled",
  "print.enabled",
  false,
  (aPref, aOldVal, aNewVal) => {
    updatePrintCommands(aNewVal);
  }
);

XPCOMUtils.defineLazyPreferenceGetter(
  this,
  "gTranslationsEnabled",
  "browser.translations.enable",
  false
);

XPCOMUtils.defineLazyPreferenceGetter(
  this,
  "gUseFeltPrivacyUI",
  "browser.privatebrowsing.felt-privacy-v1",
  false
);

customElements.setElementCreationCallback("screenshots-buttons", () => {
  Services.scriptloader.loadSubScript(
    "chrome://browser/content/screenshots/screenshots-buttons.js",
    window
  );
});

customElements.setElementCreationCallback("menu-message", () => {
  ChromeUtils.importESModule(
    "chrome://browser/content/asrouter/components/menu-message.mjs",
    { global: "current" }
  );
});

customElements.setElementCreationCallback("webrtc-preview", () => {
  ChromeUtils.importESModule(
    "chrome://browser/content/webrtc/webrtc-preview.mjs",
    { global: "current" }
  );
});

var gBrowser;
var gContextMenu = null; // nsContextMenu instance
var gMultiProcessBrowser = window.docShell.QueryInterface(
  Ci.nsILoadContext
).useRemoteTabs;
var gFissionBrowser = window.docShell.QueryInterface(
  Ci.nsILoadContext
).useRemoteSubframes;

var gBrowserAllowScriptsToCloseInitialTabs = false;

if (AppConstants.platform != "macosx") {
  var gEditUIVisible = true;
}

Object.defineProperty(this, "gReduceMotion", {
  enumerable: true,
  get() {
    return typeof gReduceMotionOverride == "boolean"
      ? gReduceMotionOverride
      : gReduceMotionSetting;
  },
});
// Reduce motion during startup. The setting will be reset later.
let gReduceMotionSetting = true;
// This is for tests to set.
var gReduceMotionOverride;

// Smart getter for the findbar.  If you don't wish to force the creation of
// the findbar, check gFindBarInitialized first.

Object.defineProperty(this, "gFindBar", {
  enumerable: true,
  get() {
    return gBrowser.getCachedFindBar();
  },
});

Object.defineProperty(this, "gFindBarInitialized", {
  enumerable: true,
  get() {
    return gBrowser.isFindBarInitialized();
  },
});

Object.defineProperty(this, "gFindBarPromise", {
  enumerable: true,
  get() {
    return gBrowser.getFindBar();
  },
});

function shouldSuppressPopupNotifications() {
  // We have to hide notifications explicitly when the window is
  // minimized because of the effects of the "noautohide" attribute on Linux.
  // This can be removed once bug 545265 and bug 1320361 are fixed.
  // Hide popup notifications when system tab prompts are shown so they
  // don't cover up the prompt.
  return (
    window.windowState == window.STATE_MINIMIZED ||
    gBrowser?.selectedBrowser.hasAttribute("tabDialogShowing") ||
    gDialogBox?.isOpen
  );
}

async function gLazyFindCommand(cmd, ...args) {
  let fb = await gFindBarPromise;
  // We could be closed by now, or the tab with XBL binding could have gone away:
  if (fb && fb[cmd]) {
    fb[cmd].apply(fb, args);
  }
}

var gPageIcons = {
  "about:home": "chrome://branding/content/icon32.png",
  "about:newtab": "chrome://branding/content/icon32.png",
  "about:opentabs": "chrome://branding/content/icon32.png",
  "about:welcome": "chrome://branding/content/icon32.png",
  "about:privatebrowsing": "chrome://browser/skin/privatebrowsing/favicon.svg",
};

var gInitialPages = [
  "about:blank",
  "about:home",
  "about:firefoxview",
  "about:newtab",
  "about:opentabs",
  "about:privatebrowsing",
  "about:sessionrestore",
  "about:welcome",
  "about:welcomeback",
  "chrome://browser/content/blanktab.html",
];

function isInitialPage(url) {
  if (!(url instanceof Ci.nsIURI)) {
    try {
      url = Services.io.newURI(url);
    } catch (ex) {
      return false;
    }
  }

  let nonQuery = url.prePath + url.filePath;
  return gInitialPages.includes(nonQuery) || nonQuery == BROWSER_NEW_TAB_URL;
}

function browserWindows() {
  return Services.wm.getEnumerator("navigator:browser");
}

function updateBookmarkToolbarVisibility() {
  BookmarkingUI.updateEmptyToolbarMessage();
  setToolbarVisibility(
    BookmarkingUI.toolbar,
    gBookmarksToolbarVisibility,
    false,
    false
  );
}

// This is a stringbundle-like interface to gBrowserBundle, formerly a getter for
// the "bundle_browser" element.
var gNavigatorBundle = {
  getString(key) {
    return gBrowserBundle.GetStringFromName(key);
  },
  getFormattedString(key, array) {
    return gBrowserBundle.formatStringFromName(key, array);
  },
};

function updateFxaToolbarMenu(enable, isInitialUpdate = false) {
  // We only show the Firefox Account toolbar menu if the feature is enabled and
  // if sync is enabled.
  const syncEnabled = Services.prefs.getBoolPref(
    "identity.fxaccounts.enabled",
    false
  );

  const mainWindowEl = document.documentElement;
  const fxaPanelEl = PanelMultiView.getViewNode(document, "PanelUI-fxa");
  const taskbarTab = mainWindowEl.hasAttribute("taskbartab");

  // To minimize the toolbar button flickering or appearing/disappearing during startup,
  // we use this pref to anticipate the likely FxA status.
  const statusGuess = !!Services.prefs.getStringPref(
    "identity.fxaccounts.account.device.name",
    ""
  );
  mainWindowEl.setAttribute(
    "fxastatus",
    statusGuess ? "signed_in" : "not_configured"
  );

  fxaPanelEl.addEventListener("ViewShowing", gSync.updateSendToDeviceTitle);

  if (enable && syncEnabled && !taskbarTab) {
    mainWindowEl.setAttribute("fxatoolbarmenu", "visible");

    // We have to manually update the sync state UI when toggling the FxA toolbar
    // because it could show an invalid icon if the user is logged in and no sync
    // event was performed yet.
    if (!isInitialUpdate) {
      gSync.maybeUpdateUIState();
    }
  } else {
    mainWindowEl.removeAttribute("fxatoolbarmenu");
  }
}

function UpdateBackForwardCommands(aWebNavigation) {
  var backCommand = document.getElementById("Browser:Back");
  var forwardCommand = document.getElementById("Browser:Forward");

  // Avoid setting attributes on commands if the value hasn't changed!
  // Remember, guys, setting attributes on elements is expensive!  They
  // get inherited into anonymous content, broadcast to other widgets, etc.!
  // Don't do it if the value hasn't changed! - dwh

  var backDisabled = backCommand.hasAttribute("disabled");
  var forwardDisabled = forwardCommand.hasAttribute("disabled");
  if (backDisabled == aWebNavigation.canGoBack) {
    if (backDisabled) {
      backCommand.removeAttribute("disabled");
    } else {
      backCommand.setAttribute("disabled", true);
    }
  }

  if (forwardDisabled == aWebNavigation.canGoForward) {
    if (forwardDisabled) {
      forwardCommand.removeAttribute("disabled");
    } else {
      forwardCommand.setAttribute("disabled", true);
    }
  }
}

function updatePrintCommands(enabled) {
  var printCommand = document.getElementById("cmd_print");
  var printPreviewCommand = document.getElementById("cmd_printPreviewToggle");

  if (enabled) {
    printCommand.removeAttribute("disabled");
    printPreviewCommand.removeAttribute("disabled");
  } else {
    printCommand.setAttribute("disabled", "true");
    printPreviewCommand.setAttribute("disabled", "true");
  }
}

/**
 * Click-and-Hold implementation for the Back and Forward buttons
 * XXXmano: should this live in toolbarbutton.js?
 */
function SetClickAndHoldHandlers() {
  // Bug 414797: Clone the back/forward buttons' context menu into both buttons.
  let popup = document.getElementById("backForwardMenu").cloneNode(true);
  popup.removeAttribute("id");
  // Prevent the back/forward buttons' context attributes from being inherited.
  popup.setAttribute("context", "");

  function backForwardMenuCommand(event) {
    BrowserCommands.gotoHistoryIndex(event);
    // event.stopPropagation is here for the cloned version
    // to prevent already-handled clicks on menu items from
    // propagating to the back or forward button.
    event.stopPropagation();
  }

  let backButton = document.getElementById("back-button");
  backButton.setAttribute("type", "menu");
  popup.addEventListener("command", backForwardMenuCommand);
  popup.addEventListener("popupshowing", FillHistoryMenu);
  backButton.prepend(popup);
  gClickAndHoldListenersOnElement.add(backButton);

  let forwardButton = document.getElementById("forward-button");
  popup = popup.cloneNode(true);
  forwardButton.setAttribute("type", "menu");
  popup.addEventListener("command", backForwardMenuCommand);
  popup.addEventListener("popupshowing", FillHistoryMenu);
  forwardButton.prepend(popup);
  gClickAndHoldListenersOnElement.add(forwardButton);
}

const gClickAndHoldListenersOnElement = {
  _timers: new Map(),

  _mousedownHandler(aEvent) {
    if (
      aEvent.button != 0 ||
      aEvent.currentTarget.open ||
      aEvent.currentTarget.disabled
    ) {
      return;
    }

    // Prevent the menupopup from opening immediately
    aEvent.currentTarget.menupopup.hidden = true;

    aEvent.currentTarget.addEventListener("mouseout", this);
    aEvent.currentTarget.addEventListener("mouseup", this);
    this._timers.set(
      aEvent.currentTarget,
      setTimeout(b => this._openMenu(b), 500, aEvent.currentTarget)
    );
  },

  _clickHandler(aEvent) {
    if (
      aEvent.button == 0 &&
      aEvent.target == aEvent.currentTarget &&
      !aEvent.currentTarget.open &&
      !aEvent.currentTarget.disabled &&
      // When menupopup is not hidden and we receive
      // a click event, it means the mousedown occurred
      // on aEvent.currentTarget and mouseup occurred on
      // aEvent.currentTarget.menupopup, we don't
      // need to handle the click event as menupopup
      // handled mouseup event already.
      aEvent.currentTarget.menupopup.hidden
    ) {
      let cmdEvent = document.createEvent("xulcommandevent");
      cmdEvent.initCommandEvent(
        "command",
        true,
        true,
        window,
        0,
        aEvent.ctrlKey,
        aEvent.altKey,
        aEvent.shiftKey,
        aEvent.metaKey,
        0,
        null,
        aEvent.inputSource
      );
      aEvent.currentTarget.dispatchEvent(cmdEvent);

      // This is here to cancel the XUL default event
      // dom.click() triggers a command even if there is a click handler
      // however this can now be prevented with preventDefault().
      aEvent.preventDefault();
    }
  },

  _openMenu(aButton) {
    this._cancelHold(aButton);
    aButton.firstElementChild.hidden = false;
    aButton.open = true;
  },

  _mouseoutHandler(aEvent) {
    let buttonRect = aEvent.currentTarget.getBoundingClientRect();
    if (
      aEvent.clientX >= buttonRect.left &&
      aEvent.clientX <= buttonRect.right &&
      aEvent.clientY >= buttonRect.bottom
    ) {
      this._openMenu(aEvent.currentTarget);
    } else {
      this._cancelHold(aEvent.currentTarget);
    }
  },

  _mouseupHandler(aEvent) {
    this._cancelHold(aEvent.currentTarget);
  },

  _cancelHold(aButton) {
    clearTimeout(this._timers.get(aButton));
    aButton.removeEventListener("mouseout", this);
    aButton.removeEventListener("mouseup", this);
  },

  _keypressHandler(aEvent) {
    if (aEvent.key == " " || aEvent.key == "Enter") {
      aEvent.preventDefault();
      // Normally, command events get fired for keyboard activation. However,
      // we've set type="menu", so that doesn't happen. Handle this the same
      // way we handle clicks.
      aEvent.target.click();
    }
  },

  handleEvent(e) {
    switch (e.type) {
      case "mouseout":
        this._mouseoutHandler(e);
        break;
      case "mousedown":
        this._mousedownHandler(e);
        break;
      case "click":
        this._clickHandler(e);
        break;
      case "mouseup":
        this._mouseupHandler(e);
        break;
      case "keypress":
        // Note that we might not be the only ones dealing with keypresses.
        // See bug 1921772 for more context.
        if (!e.defaultPrevented) {
          this._keypressHandler(e);
        }
        break;
    }
  },

  remove(aButton) {
    aButton.removeEventListener("mousedown", this, true);
    aButton.removeEventListener("click", this, true);
    aButton.removeEventListener("keypress", this, true);
  },

  add(aElm) {
    this._timers.delete(aElm);

    aElm.addEventListener("mousedown", this, true);
    aElm.addEventListener("click", this, true);
    aElm.addEventListener("keypress", this, true);
  },
};

const gSessionHistoryObserver = {
  observe(subject, topic) {
    if (topic != "browser:purge-session-history") {
      return;
    }

    var backCommand = document.getElementById("Browser:Back");
    backCommand.setAttribute("disabled", "true");
    var fwdCommand = document.getElementById("Browser:Forward");
    fwdCommand.setAttribute("disabled", "true");

    // Clear undo history of the URL bar
    gURLBar.editor.clearUndoRedo();
  },
};

const gStoragePressureObserver = {
  _lastNotificationTime: -1,

  async observe(subject, topic) {
    if (topic != "QuotaManager::StoragePressure") {
      return;
    }

    const NOTIFICATION_VALUE = "storage-pressure-notification";
    if (gNotificationBox.getNotificationWithValue(NOTIFICATION_VALUE)) {
      // Do not display the 2nd notification when there is already one
      return;
    }

    // Don't display notification twice within the given interval.
    // This is because
    //   - not to annoy user
    //   - give user some time to clean space.
    //     Even user sees notification and starts acting, it still takes some time.
    const MIN_NOTIFICATION_INTERVAL_MS = Services.prefs.getIntPref(
      "browser.storageManager.pressureNotification.minIntervalMS"
    );
    let duration = Date.now() - this._lastNotificationTime;
    if (duration <= MIN_NOTIFICATION_INTERVAL_MS) {
      return;
    }
    this._lastNotificationTime = Date.now();

    MozXULElement.insertFTLIfNeeded("browser/preferences/preferences.ftl");

    const BYTES_IN_GIGABYTE = 1073741824;
    const USAGE_THRESHOLD_BYTES =
      BYTES_IN_GIGABYTE *
      Services.prefs.getIntPref(
        "browser.storageManager.pressureNotification.usageThresholdGB"
      );
    let messageFragment = document.createDocumentFragment();
    let message = document.createElement("span");

    let buttons = [{ supportPage: "storage-permissions" }];
    let usage = subject.QueryInterface(Ci.nsISupportsPRUint64).data;
    if (usage < USAGE_THRESHOLD_BYTES) {
      // The firefox-used space < 5GB, then warn user to free some disk space.
      // This is because this usage is small and not the main cause for space issue.
      // In order to avoid the bad and wrong impression among users that
      // firefox eats disk space a lot, indicate users to clean up other disk space.
      document.l10n.setAttributes(message, "space-alert-under-5gb-message2");
    } else {
      // The firefox-used space >= 5GB, then guide users to about:preferences
      // to clear some data stored on firefox by websites.
      document.l10n.setAttributes(message, "space-alert-over-5gb-message2");
      buttons.push({
        "l10n-id": "space-alert-over-5gb-settings-button",
        callback() {
          // The advanced subpanes are only supported in the old organization, which will
          // be removed by bug 1349689.
          openPreferences("privacy-sitedata");
        },
      });
    }
    messageFragment.appendChild(message);

    await gNotificationBox.appendNotification(
      NOTIFICATION_VALUE,
      {
        label: messageFragment,
        priority: gNotificationBox.PRIORITY_WARNING_HIGH,
      },
      buttons
    );

    // This seems to be necessary to get the buttons to display correctly
    // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1504216
    document.l10n.translateFragment(gNotificationBox.currentNotification);
  },
};

var gKeywordURIFixup = {
  check(browser, { fixedURI, keywordProviderName, preferredURI }) {
    // We get called irrespective of whether we did a keyword search, or
    // whether the original input would be vaguely interpretable as a URL,
    // so figure that out first.
    if (
      !keywordProviderName ||
      !fixedURI ||
      !fixedURI.host ||
      UrlbarPrefs.get("browser.fixup.dns_first_for_single_words") ||
      UrlbarPrefs.get("dnsResolveSingleWordsAfterSearch") == 0
    ) {
      return;
    }

    let contentPrincipal = browser.contentPrincipal;

    // At this point we're still only just about to load this URI.
    // When the async DNS lookup comes back, we may be in any of these states:
    // 1) still on the previous URI, waiting for the preferredURI (keyword
    //    search) to respond;
    // 2) at the keyword search URI (preferredURI)
    // 3) at some other page because the user stopped navigation.
    // We keep track of the currentURI to detect case (1) in the DNS lookup
    // callback.
    let previousURI = browser.currentURI;

    // now swap for a weak ref so we don't hang on to browser needlessly
    // even if the DNS query takes forever
    let weakBrowser = Cu.getWeakReference(browser);
    browser = null;

    // Additionally, we need the host of the parsed url
    let hostName = fixedURI.displayHost;
    // and the ascii-only host for the pref:
    let asciiHost = fixedURI.asciiHost;

    let onLookupCompleteListener = {
      async onLookupComplete(request, record, status) {
        let browserRef = weakBrowser.get();
        if (!Components.isSuccessCode(status) || !browserRef) {
          return;
        }

        let currentURI = browserRef.currentURI;
        // If we're in case (3) (see above), don't show an info bar.
        if (
          !currentURI.equals(previousURI) &&
          !currentURI.equals(preferredURI)
        ) {
          return;
        }

        // show infobar offering to visit the host
        let notificationBox = gBrowser.getNotificationBox(browserRef);
        if (notificationBox.getNotificationWithValue("keyword-uri-fixup")) {
          return;
        }

        let displayHostName = "http://" + hostName + "/";
        let message = gNavigatorBundle.getFormattedString(
          "keywordURIFixup.message",
          [displayHostName]
        );
        let yesMessage = gNavigatorBundle.getFormattedString(
          "keywordURIFixup.goTo",
          [displayHostName]
        );

        let buttons = [
          {
            label: yesMessage,
            accessKey: gNavigatorBundle.getString(
              "keywordURIFixup.goTo.accesskey"
            ),
            callback() {
              // Do not set this preference while in private browsing.
              if (!PrivateBrowsingUtils.isWindowPrivate(window)) {
                let prefHost = asciiHost;
                // Normalize out a single trailing dot - NB: not using endsWith/lastIndexOf
                // because we need to be sure this last dot is the *only* dot, too.
                // More generally, this is used for the pref and should stay in sync with
                // the code in URIFixup::KeywordURIFixup .
                if (prefHost.indexOf(".") == prefHost.length - 1) {
                  prefHost = prefHost.slice(0, -1);
                }
                let pref = "browser.fixup.domainwhitelist." + prefHost;
                Services.prefs.setBoolPref(pref, true);
              }
              openTrustedLinkIn(fixedURI.spec, "current");
            },
          },
        ];
        let notification = await notificationBox.appendNotification(
          "keyword-uri-fixup",
          {
            label: message,
            priority: notificationBox.PRIORITY_INFO_HIGH,
          },
          buttons
        );
        notification.persistence = 1;
      },
    };

    try {
      Services.uriFixup.checkHost(
        fixedURI,
        onLookupCompleteListener,
        contentPrincipal.originAttributes
      );
    } catch (ex) {
      // Ignore errors.
    }
  },

  observe(fixupInfo) {
    fixupInfo.QueryInterface(Ci.nsIURIFixupInfo);

    let browser = fixupInfo.consumer?.top?.embedderElement;
    if (!browser || browser.ownerGlobal != window) {
      return;
    }

    this.check(browser, fixupInfo);
  },
};

function HandleAppCommandEvent(evt) {
  switch (evt.command) {
    case "Back":
      BrowserCommands.back();
      break;
    case "Forward":
      BrowserCommands.forward();
      break;
    case "Reload":
      BrowserCommands.reloadSkipCache();
      break;
    case "Stop":
      if (XULBrowserWindow.stopCommand.getAttribute("disabled") != "true") {
        BrowserCommands.stop();
      }
      break;
    case "Search":
      SearchUIUtils.webSearch(window);
      break;
    case "Bookmarks":
      SidebarController.toggle("viewBookmarksSidebar");
      break;
    case "Home":
      BrowserCommands.home();
      break;
    case "New":
      BrowserCommands.openTab();
      break;
    case "Close":
      BrowserCommands.closeTabOrWindow();
      break;
    case "Find":
      gLazyFindCommand("onFindCommand");
      break;
    case "Help":
      openHelpLink("firefox-help");
      break;
    case "Open":
      BrowserCommands.openFileWindow();
      break;
    case "Print":
      PrintUtils.startPrintWindow(gBrowser.selectedBrowser.browsingContext);
      break;
    case "Save":
      saveBrowser(gBrowser.selectedBrowser);
      break;
    case "SendMail":
      MailIntegration.sendLinkForBrowser(gBrowser.selectedBrowser);
      break;
    default:
      return;
  }
  evt.stopPropagation();
  evt.preventDefault();
}

function loadOneOrMoreURIs(aURIString, aTriggeringPrincipal, aPolicyContainer) {
  // we're not a browser window, pass the URI string to a new browser window
  if (window.location.href != AppConstants.BROWSER_CHROME_URL) {
    window.openDialog(
      AppConstants.BROWSER_CHROME_URL,
      "_blank",
      "all,dialog=no",
      aURIString
    );
    return;
  }

  // This function throws for certain malformed URIs, so use exception handling
  // so that we don't disrupt startup
  try {
    gBrowser.loadTabs(aURIString.split("|"), {
      inBackground: false,
      replace: true,
      triggeringPrincipal: aTriggeringPrincipal,
      policyContainer: aPolicyContainer,
    });
  } catch (e) {}
}

function openLocation(event) {
  if (window.location.href == AppConstants.BROWSER_CHROME_URL) {
    gURLBar.select();
    gURLBar.view.autoOpen({ event });
    return;
  }

  // If there's an open browser window, redirect the command there.
  let win = URILoadingHelper.getTargetWindow(window);
  if (win) {
    win.focus();
    win.openLocation();
    return;
  }

  // There are no open browser windows; open a new one.
  window.openDialog(
    AppConstants.BROWSER_CHROME_URL,
    "_blank",
    "chrome,all,dialog=no",
    BROWSER_NEW_TAB_URL
  );
}

var gLastOpenDirectory = {
  _lastDir: null,
  get path() {
    if (!this._lastDir || !this._lastDir.exists()) {
      try {
        this._lastDir = Services.prefs.getComplexValue(
          "browser.open.lastDir",
          Ci.nsIFile
        );
        if (!this._lastDir.exists()) {
          this._lastDir = null;
        }
      } catch (e) {}
    }
    return this._lastDir;
  },
  set path(val) {
    try {
      if (!val || !val.isDirectory()) {
        return;
      }
    } catch (e) {
      return;
    }
    this._lastDir = val.clone();

    // Don't save the last open directory pref inside the Private Browsing mode
    if (!PrivateBrowsingUtils.isWindowPrivate(window)) {
      Services.prefs.setComplexValue(
        "browser.open.lastDir",
        Ci.nsIFile,
        this._lastDir
      );
    }
  },
  reset() {
    this._lastDir = null;
  },
};

function readFromClipboard() {
  var url;

  try {
    // Create transferable that will transfer the text.
    var trans = Cc["@mozilla.org/widget/transferable;1"].createInstance(
      Ci.nsITransferable
    );
    trans.init(window.docShell.QueryInterface(Ci.nsILoadContext));

    trans.addDataFlavor("text/plain");

    // If available, use selection clipboard, otherwise global one
    let clipboard = Services.clipboard;
    if (clipboard.isClipboardTypeSupported(clipboard.kSelectionClipboard)) {
      clipboard.getData(trans, clipboard.kSelectionClipboard);
    } else {
      clipboard.getData(trans, clipboard.kGlobalClipboard);
    }

    var data = {};
    trans.getTransferData("text/plain", data);

    if (data) {
      data = data.value.QueryInterface(Ci.nsISupportsString);
      url = data.data;
    }
  } catch (ex) {}

  return url;
}

function UpdateUrlbarSearchSplitterState() {
  var splitter = document.getElementById("urlbar-search-splitter");
  var urlbar = document.getElementById("urlbar-container");
  var searchbar = document.getElementById("search-container");

  if (document.documentElement.hasAttribute("customizing")) {
    if (splitter) {
      splitter.remove();
    }
    return;
  }

  // If the splitter is already in the right place, we don't need to do anything:
  if (
    splitter &&
    ((splitter.nextElementSibling == searchbar &&
      splitter.previousElementSibling == urlbar) ||
      (splitter.nextElementSibling == urlbar &&
        splitter.previousElementSibling == searchbar))
  ) {
    return;
  }

  let ibefore = null;
  let resizebefore = "none";
  let resizeafter = "none";
  if (urlbar && searchbar) {
    if (urlbar.nextElementSibling == searchbar) {
      resizeafter = "sibling";
      ibefore = searchbar;
    } else if (searchbar.nextElementSibling == urlbar) {
      resizebefore = "sibling";
      ibefore = urlbar;
    }
  }

  if (ibefore) {
    if (!splitter) {
      splitter = document.createXULElement("splitter");
      splitter.id = "urlbar-search-splitter";
      splitter.setAttribute("resizebefore", resizebefore);
      splitter.setAttribute("resizeafter", resizeafter);
      splitter.setAttribute("skipintoolbarset", "true");
      splitter.setAttribute("overflows", "false");
      splitter.className = "chromeclass-toolbar-additional";
    }
    urlbar.parentNode.insertBefore(splitter, ibefore);
  } else if (splitter) {
    splitter.remove();
  }
}

function UpdatePopupNotificationsVisibility() {
  // Only need to update PopupNotifications if it has already been initialized
  // for this window (i.e. its getter no longer exists).
  if (!Object.getOwnPropertyDescriptor(window, "PopupNotifications").get) {
    // Notify PopupNotifications that the visible anchors may have changed. This
    // also checks the suppression state according to the "shouldSuppress"
    // function defined earlier in this file.
    PopupNotifications.anchorVisibilityChange();
  }

  // This is similar to the above, but for notifications attached to the
  // hamburger menu icon (such as update notifications and add-on install
  // notifications.)
  PanelUI?.updateNotifications();
}

function PageProxyClickHandler(aEvent) {
  if (aEvent.button == 1 && Services.prefs.getBoolPref("middlemouse.paste")) {
    middleMousePaste(aEvent);
  }
}

function CreateContainerTabMenu(event) {
  // Do not open context menus within menus.
  // Note that triggerNode is null if we're opened by long press.
  if (event.target.triggerNode?.closest("menupopup")) {
    event.preventDefault();
    return;
  }
  createUserContextMenu(event, {
    useAccessKeys: false,
    showDefaultTab: true,
  });
}

function FillHistoryMenu(event) {
  let parent = event.target;

  // Lazily add the hover listeners on first showing and never remove them
  if (!parent.hasStatusListener) {
    // Show history item's uri in the status bar when hovering, and clear on exit
    parent.addEventListener("DOMMenuItemActive", function (aEvent) {
      // Only the current page should have the checked attribute, so skip it
      if (!aEvent.target.hasAttribute("checked")) {
        XULBrowserWindow.setOverLink(aEvent.target.getAttribute("uri"));
      }
    });
    parent.addEventListener("DOMMenuItemInactive", function () {
      XULBrowserWindow.setOverLink("");
    });

    parent.hasStatusListener = true;
  }

  // Remove old entries if any
  let children = parent.children;
  for (var i = children.length - 1; i >= 0; --i) {
    if (children[i].hasAttribute("index")) {
      parent.removeChild(children[i]);
    }
  }

  const MAX_HISTORY_MENU_ITEMS = 15;

  const tooltipBack = gNavigatorBundle.getString("tabHistory.goBack");
  const tooltipCurrent = gNavigatorBundle.getString("tabHistory.reloadCurrent");
  const tooltipForward = gNavigatorBundle.getString("tabHistory.goForward");

  function updateSessionHistory(sessionHistory, initial, ssInParent) {
    let count = ssInParent
      ? sessionHistory.count
      : sessionHistory.entries.length;

    if (!initial) {
      if (count <= 1) {
        // if there is only one entry now, close the popup.
        parent.hidePopup();
        return;
      } else if (parent.id != "backForwardMenu" && !parent.parentNode.open) {
        // if the popup wasn't open before, but now needs to be, reopen the menu.
        // It should trigger FillHistoryMenu again. This might happen with the
        // delay from click-and-hold menus but skip this for the context menu
        // (backForwardMenu) rather than figuring out how the menu should be
        // positioned and opened as it is an extreme edgecase.
        parent.parentNode.open = true;
        return;
      }
    }

    let index = sessionHistory.index;
    let half_length = Math.floor(MAX_HISTORY_MENU_ITEMS / 2);
    let start = Math.max(index - half_length, 0);
    let end = Math.min(
      start == 0 ? MAX_HISTORY_MENU_ITEMS : index + half_length + 1,
      count
    );
    if (end == count) {
      start = Math.max(count - MAX_HISTORY_MENU_ITEMS, 0);
    }

    let existingIndex = 0;

    for (let j = end - 1; j >= start; j--) {
      let entry = ssInParent
        ? sessionHistory.getEntryAtIndex(j)
        : sessionHistory.entries[j];
      // Explicitly check for "false" to stay backwards-compatible with session histories
      // from before the hasUserInteraction was implemented.
      if (
        BrowserUtils.navigationRequireUserInteraction &&
        entry.hasUserInteraction === false &&
        // Always list the current and last navigation points.
        j != end - 1 &&
        j != index
      ) {
        continue;
      }
      let uri = ssInParent ? entry.URI.spec : entry.url;

      let item =
        existingIndex < children.length
          ? children[existingIndex]
          : document.createXULElement("menuitem");

      item.setAttribute("uri", uri);
      item.setAttribute("label", entry.title || uri);
      item.setAttribute("index", j);

      // Cache this so that BrowserCommands.gotoHistoryIndex doesn't need the
      // original index
      item.setAttribute("historyindex", j - index);

      if (j != index) {
        // Use --menuitem-icon rather than the image attribute in order to
        // allow CSS to override this.
        item.style.setProperty(
          "--menuitem-icon",
          `url(page-icon:${CSS.escape(uri)})`
        );
      }

      if (j < index) {
        item.className =
          "unified-nav-back menuitem-iconic menuitem-with-favicon";
        item.setAttribute("tooltiptext", tooltipBack);
      } else if (j == index) {
        item.setAttribute("type", "radio");
        item.setAttribute("checked", "true");
        item.className = "unified-nav-current";
        item.setAttribute("tooltiptext", tooltipCurrent);
      } else {
        item.className =
          "unified-nav-forward menuitem-iconic menuitem-with-favicon";
        item.setAttribute("tooltiptext", tooltipForward);
      }

      if (!item.parentNode) {
        parent.appendChild(item);
      }

      existingIndex++;
    }

    if (!initial) {
      let existingLength = children.length;
      while (existingIndex < existingLength) {
        parent.removeChild(parent.lastElementChild);
        existingIndex++;
      }
    }
  }

  // If session history in parent is available, use it. Otherwise, get the session history
  // from session store.
  let sessionHistory = gBrowser.selectedBrowser.browsingContext.sessionHistory;
  if (sessionHistory?.count) {
    // Don't show the context menu if there is only one item.
    if (sessionHistory.count <= 1) {
      event.preventDefault();
      return;
    }

    updateSessionHistory(sessionHistory, true, true);
  } else {
    sessionHistory = SessionStore.getSessionHistory(
      gBrowser.selectedTab,
      updateSessionHistory
    );
    updateSessionHistory(sessionHistory, true, false);
  }
}

function toOpenWindowByType(inType, uri, features) {
  var topWindow = Services.wm.getMostRecentWindow(inType);

  if (topWindow) {
    topWindow.focus();
  } else if (features) {
    window.open(uri, "_blank", features);
  } else {
    window.open(
      uri,
      "_blank",
      "chrome,extrachrome,menubar,resizable,scrollbars,status,toolbar"
    );
  }
}
/**
 * Open a new browser window. See `BrowserWindowTracker.openWindow` for
 * options.
 *
 * @return a reference to the new window.
 */
function OpenBrowserWindow(options) {
  let timerId = Glean.browserTimings.newWindow.start();
  options ??= {};
  options.openerWindow ??= window;

  AIWindow.handleAIWindowOptions(window, options);

  let win = BrowserWindowTracker.openWindow(options);

  win.addEventListener(
    "MozAfterPaint",
    () => {
      Glean.browserTimings.newWindow.stopAndAccumulate(timerId);
    },
    { once: true }
  );

  return win;
}

/**
 * Update the global flag that tracks whether or not any edit UI (the Edit menu,
 * edit-related items in the context menu, and edit-related toolbar buttons
 * is visible, then update the edit commands' enabled state accordingly.  We use
 * this flag to skip updating the edit commands on focus or selection changes
 * when no UI is visible to improve performance (including pageload performance,
 * since focus changes when you load a new page).
 *
 * If UI is visible, we use goUpdateGlobalEditMenuItems to set the commands'
 * enabled state so the UI will reflect it appropriately.
 *
 * If the UI isn't visible, we enable all edit commands so keyboard shortcuts
 * still work and just lazily disable them as needed when the user presses a
 * shortcut.
 *
 * This doesn't work on Mac, since Mac menus flash when users press their
 * keyboard shortcuts, so edit UI is essentially always visible on the Mac,
 * and we need to always update the edit commands.  Thus on Mac this function
 * is a no op.
 */
function updateEditUIVisibility() {
  if (AppConstants.platform == "macosx") {
    return;
  }

  let editMenuPopupState = document.getElementById("menu_EditPopup").state;
  let contextMenuPopupState = document.getElementById(
    "contentAreaContextMenu"
  ).state;
  let placesContextMenuPopupState =
    document.getElementById("placesContext").state;

  let oldVisible = gEditUIVisible;

  // The UI is visible if the Edit menu is opening or open, if the context menu
  // is open, or if the toolbar has been customized to include the Cut, Copy,
  // or Paste toolbar buttons.
  gEditUIVisible =
    editMenuPopupState == "showing" ||
    editMenuPopupState == "open" ||
    contextMenuPopupState == "showing" ||
    contextMenuPopupState == "open" ||
    placesContextMenuPopupState == "showing" ||
    placesContextMenuPopupState == "open";
  const kOpenPopupStates = ["showing", "open"];
  if (!gEditUIVisible) {
    // Now check the edit-controls toolbar buttons.
    let placement = CustomizableUI.getPlacementOfWidget("edit-controls");
    let areaType = placement ? CustomizableUI.getAreaType(placement.area) : "";
    if (areaType == CustomizableUI.TYPE_PANEL) {
      let customizablePanel = PanelUI.overflowPanel;
      gEditUIVisible = kOpenPopupStates.includes(customizablePanel.state);
    } else if (
      areaType == CustomizableUI.TYPE_TOOLBAR &&
      window.toolbar.visible
    ) {
      // The edit controls are on a toolbar, so they are visible,
      // unless they're in a panel that isn't visible...
      if (placement.area == "nav-bar") {
        let editControls = document.getElementById("edit-controls");
        gEditUIVisible =
          !editControls.hasAttribute("overflowedItem") ||
          kOpenPopupStates.includes(
            document.getElementById("widget-overflow").state
          );
      } else {
        gEditUIVisible = true;
      }
    }
  }

  // Now check the main menu panel
  if (!gEditUIVisible) {
    gEditUIVisible = kOpenPopupStates.includes(PanelUI.panel.state);
  }

  // No need to update commands if the edit UI visibility has not changed.
  if (gEditUIVisible == oldVisible) {
    return;
  }

  // If UI is visible, update the edit commands' enabled state to reflect
  // whether or not they are actually enabled for the current focus/selection.
  if (gEditUIVisible) {
    goUpdateGlobalEditMenuItems();
  } else {
    // Otherwise, enable all commands, so that keyboard shortcuts still work,
    // then lazily determine their actual enabled state when the user presses
    // a keyboard shortcut.
    goSetCommandEnabled("cmd_undo", true);
    goSetCommandEnabled("cmd_redo", true);
    goSetCommandEnabled("cmd_cut", true);
    goSetCommandEnabled("cmd_copy", true);
    goSetCommandEnabled("cmd_paste", true);
    goSetCommandEnabled("cmd_selectAll", true);
    goSetCommandEnabled("cmd_delete", true);
    goSetCommandEnabled("cmd_switchTextDirection", true);
  }
}

let gFileMenu = {
  /**
   * Updates User Context Menu Item UI visibility depending on
   * privacy.userContext.enabled pref state.
   */
  updateUserContextUIVisibility() {
    let menu = document.getElementById("menu_newUserContext");
    menu.hidden = !Services.prefs.getBoolPref(
      "privacy.userContext.enabled",
      false
    );
    // Visibility of File menu item shouldn't change frequently.
    if (PrivateBrowsingUtils.isWindowPrivate(window)) {
      menu.setAttribute("disabled", "true");
    }
  },

  /**
   * Updates the enabled state of the "Import From Another Browser" command
   * depending on the DisableProfileImport policy.
   */
  updateImportCommandEnabledState() {
    if (!Services.policies.isAllowed("profileImport")) {
      document
        .getElementById("cmd_file_importFromAnotherBrowser")
        .setAttribute("disabled", "true");
    }
  },

  /**
   * Updates the "Close tab" command to reflect the number of selected tabs,
   * when applicable.
   */
  updateTabCloseCountState() {
    document.l10n.setAttributes(
      document.getElementById("menu_close"),
      "menu-file-close-tab",
      { tabCount: gBrowser.selectedTabs.length }
    );
  },

  onPopupShowing(event) {
    // We don't care about submenus:
    if (event.target.id != "menu_FilePopup") {
      return;
    }
    this.updateUserContextUIVisibility();
    this.updateImportCommandEnabledState();
    this.updateTabCloseCountState();
    if (AppConstants.platform == "macosx") {
      SharingUtils.updateShareURLMenuItem(
        gBrowser.selectedBrowser,
        document.getElementById("menu_savePage")
      );
    }
    PrintUtils.updatePrintSetupMenuHiddenState();

    const aiWindowMenu = event.target.querySelector("#menu_newAIWindow");
    const classicWindowMenu = event.target.querySelector(
      "#menu_newClassicWindow"
    );

    aiWindowMenu.hidden =
      !AIWindow.isAIWindowEnabled() || AIWindow.isAIWindowActive(window);
    classicWindowMenu.hidden =
      !AIWindow.isAIWindowEnabled() || !AIWindow.isAIWindowActive(window);
  },
};

/**
 * Opens a new tab with the userContextId specified as an attribute of
 * sourceEvent. This attribute is propagated to the top level originAttributes
 * living on the tab's docShell.
 *
 * @param event
 *        A click event on a userContext File Menu option
 */
function openNewUserContextTab(event) {
  openTrustedLinkIn(BROWSER_NEW_TAB_URL, "tab", {
    userContextId: parseInt(event.target.getAttribute("data-usercontextid")),
  });
}

var XULBrowserWindow = {
  // Stored Status, Link and Loading values
  status: "",
  defaultStatus: "",
  overLink: "",
  startTime: 0,
  isBusy: false,
  busyUI: false,

  QueryInterface: ChromeUtils.generateQI([
    "nsIWebProgressListener",
    "nsIWebProgressListener2",
    "nsISupportsWeakReference",
    "nsIXULBrowserWindow",
  ]),

  get stopCommand() {
    delete this.stopCommand;
    return (this.stopCommand = document.getElementById("Browser:Stop"));
  },
  get reloadCommand() {
    delete this.reloadCommand;
    return (this.reloadCommand = document.getElementById("Browser:Reload"));
  },
  get _elementsForTextBasedTypes() {
    delete this._elementsForTextBasedTypes;
    return (this._elementsForTextBasedTypes = [
      document.getElementById("pageStyleMenu"),
      document.getElementById("context-viewpartialsource-selection"),
      document.getElementById("context-print-selection"),
    ]);
  },
  get _elementsForFind() {
    delete this._elementsForFind;
    return (this._elementsForFind = [
      document.getElementById("cmd_find"),
      document.getElementById("cmd_findAgain"),
      document.getElementById("cmd_findPrevious"),
    ]);
  },
  get _elementsForViewSource() {
    delete this._elementsForViewSource;
    return (this._elementsForViewSource = [
      document.getElementById("context-viewsource"),
      document.getElementById("View:PageSource"),
    ]);
  },
  get _menuItemForRepairTextEncoding() {
    delete this._menuItemForRepairTextEncoding;
    return (this._menuItemForRepairTextEncoding = document.getElementById(
      "repair-text-encoding"
    ));
  },
  get _menuItemForTranslations() {
    delete this._menuItemForTranslations;
    return (this._menuItemForTranslations =
      document.getElementById("cmd_translate"));
  },

  setDefaultStatus(status) {
    this.defaultStatus = status;
    StatusPanel.update();
  },

  /**
   * Tells the UI what link we are currently over.
   *
   * @param {string} url
   *   The URL of the link.
   * @param {object} [options]
   *   This is an extension of nsIXULBrowserWindow for JS callers, will be
   *   passed on to LinkTargetDisplay.
   */
  setOverLink(url, options = undefined) {
    window.dispatchEvent(
      new CustomEvent("OverLink", {
        detail: { url },
      })
    );

    if (url) {
      url = Services.textToSubURI.unEscapeURIForUI(url);

      /**
       * Encode bidirectional formatting characters.
       *
       * @see https://url.spec.whatwg.org/#url-rendering-i18n
       * @see https://www.unicode.org/reports/tr9/#Directional_Formatting_Characters
       */
      url = url.replace(
        /[\u061c\u200e\u200f\u202a-\u202e\u2066-\u2069]/g,
        encodeURIComponent
      );

      if (UrlbarPrefs.get("trimURLs")) {
        url = BrowserUIUtils.trimURL(url);
      }
    }

    this.overLink = url;
    LinkTargetDisplay.update(options);
  },

  onEnterDOMFullscreen() {
    // Clear the status panel.
    this.status = "";
    this.setDefaultStatus("");
    this.setOverLink("", { hideStatusPanelImmediately: true });
  },

  showTooltip(xDevPix, yDevPix, tooltip, direction, _browser) {
    if (
      Cc["@mozilla.org/widget/dragservice;1"]
        .getService(Ci.nsIDragService)
        .getCurrentSession()
    ) {
      return;
    }

    if (!document.hasFocus()) {
      return;
    }

    let elt = document.getElementById("remoteBrowserTooltip");
    elt.label = tooltip;
    elt.style.direction = direction;
    elt.openPopupAtScreen(
      xDevPix / window.devicePixelRatio,
      yDevPix / window.devicePixelRatio,
      false,
      null
    );
  },

  hideTooltip() {
    let elt = document.getElementById("remoteBrowserTooltip");
    elt.hidePopup();
  },

  getTabCount() {
    return gBrowser.tabs.length;
  },

  onProgressChange() {
    // Do nothing.
  },

  onProgressChange64(
    aWebProgress,
    aRequest,
    aCurSelfProgress,
    aMaxSelfProgress,
    aCurTotalProgress,
    aMaxTotalProgress
  ) {
    return this.onProgressChange(
      aWebProgress,
      aRequest,
      aCurSelfProgress,
      aMaxSelfProgress,
      aCurTotalProgress,
      aMaxTotalProgress
    );
  },

  // This function fires only for the currently selected tab.
  onStateChange(aWebProgress, aRequest, aStateFlags, aStatus) {
    const nsIWebProgressListener = Ci.nsIWebProgressListener;

    let browser = gBrowser.selectedBrowser;
    gProtectionsHandler.onStateChange(aWebProgress, aStateFlags);

    if (
      aStateFlags & nsIWebProgressListener.STATE_START &&
      aStateFlags & nsIWebProgressListener.STATE_IS_NETWORK
    ) {
      if (aRequest && aWebProgress.isTopLevel) {
        OpenSearchManager.clearEngines(browser);
      }

      this.isBusy = true;

      if (
        !(aStateFlags & nsIWebProgressListener.STATE_RESTORING) &&
        aWebProgress.isTopLevel
      ) {
        this.busyUI = true;

        if (this.spinCursorWhileBusy) {
          window.setCursor("progress");
        }

        // XXX: This needs to be based on window activity...
        this.stopCommand.removeAttribute("disabled");
        CombinedStopReload.switchToStop(aRequest, aWebProgress);
      }
    } else if (aStateFlags & nsIWebProgressListener.STATE_STOP) {
      // This (thanks to the filter) is a network stop or the last
      // request stop outside of loading the document, stop throbbers
      // and progress bars and such
      if (aRequest) {
        let msg = "";
        let location;
        let canViewSource = true;
        // Get the URI either from a channel or a pseudo-object
        if (aRequest instanceof Ci.nsIChannel || "URI" in aRequest) {
          location = aRequest.URI;

          // For keyword URIs clear the user typed value since they will be changed into real URIs
          if (location.scheme == "keyword" && aWebProgress.isTopLevel) {
            gBrowser.userTypedValue = null;
          }

          canViewSource = location.scheme != "view-source";

          if (location.spec != "about:blank") {
            switch (aStatus) {
              case Cr.NS_ERROR_NET_TIMEOUT:
                msg = gNavigatorBundle.getString("nv_timeout");
                break;
            }
          }
        }

        this.status = "";
        this.setDefaultStatus(msg);

        // Disable View Source menu entries for images, enable otherwise
        let isText =
          browser.documentContentType &&
          BrowserUtils.mimeTypeIsTextBased(browser.documentContentType);
        for (let element of this._elementsForViewSource) {
          if (canViewSource && isText) {
            element.removeAttribute("disabled");
          } else {
            element.setAttribute("disabled", "true");
          }
        }

        this._updateElementsForContentType();

        // Update Override Text Encoding state.
        // Can't cache the button, because the presence of the element in the DOM
        // may change over time.
        let button = document.getElementById("characterencoding-button");
        if (browser.mayEnableCharacterEncodingMenu) {
          this._menuItemForRepairTextEncoding.removeAttribute("disabled");
          button?.removeAttribute("disabled");
        } else {
          this._menuItemForRepairTextEncoding.setAttribute("disabled", "true");
          button?.setAttribute("disabled", "true");
        }
      }

      this.isBusy = false;

      if (this.busyUI && aWebProgress.isTopLevel) {
        this.busyUI = false;

        if (this.spinCursorWhileBusy) {
          window.setCursor("auto");
        }

        this.stopCommand.setAttribute("disabled", "true");
        CombinedStopReload.switchToReload(aRequest, aWebProgress);
      }
    }
  },

  /**
   * An nsIWebProgressListener method called by tabbrowser.  The `aIsSimulated`
   * parameter is extra and not declared in nsIWebProgressListener, however; see
   * below.
   *
   * @param {nsIWebProgress} aWebProgress
   *   The nsIWebProgress instance that fired the notification.
   * @param {nsIRequest} aRequest
   *   The associated nsIRequest.  This may be null in some cases.
   * @param {nsIURI} aLocationURI
   *   The URI of the location that is being loaded.
   * @param {integer} aFlags
   *   Flags that indicate the reason the location changed.  See the
   *   nsIWebProgressListener.LOCATION_CHANGE_* values.
   * @param {boolean} aIsSimulated
   *   True when this is called by tabbrowser due to switching tabs and
   *   undefined otherwise.  This parameter is not declared in
   *   nsIWebProgressListener.onLocationChange; see bug 1478348.
   */
  onLocationChange(aWebProgress, aRequest, aLocationURI, aFlags, aIsSimulated) {
    var location = aLocationURI ? aLocationURI.spec : "";

    UpdateBackForwardCommands(gBrowser.webNavigation);

    Services.obs.notifyObservers(
      aWebProgress,
      "touchbar-location-change",
      location
    );

    // For most changes we only need to update the browser UI if the primary
    // content area was navigated or the selected tab was changed. We don't need
    // to do anything else if there was a subframe navigation.

    if (!aWebProgress.isTopLevel) {
      return;
    }

    if (aLocationURI && (aLocationURI.schemeIs("http") || aLocationURI.schemeIs("https"))) {
      let host;
      try {
        host = aLocationURI.host;
      } catch (e) {}

      if (host && host.startsWith("xn--")) {
        // Check for bypass param
        let isBypassed = false;
        try {
          let urlObj = new URL(aLocationURI.spec);
          if (urlObj.searchParams.get("ignorePunycode") === "1") {
            isBypassed = true;
          }
        } catch (e) {}

        if (!isBypassed) {
          let warningPage = "chrome://browser/content/punycodeWarning.xhtml";
          let redirectUrl = warningPage + "?url=" + encodeURIComponent(aLocationURI.spec);

          // Redirect
          aBrowser.loadURI(redirectUrl, {
            triggeringPrincipal: Services.scriptSecurityManager.getSystemPrincipal(),
            replace: true,
          });
          return;
        }
      }
    }

    this.setOverLink("", { hideStatusPanelImmediately: true });

    let isSameDocument =
      aFlags & Ci.nsIWebProgressListener.LOCATION_CHANGE_SAME_DOCUMENT;
    if (
      (location == "about:blank" &&
        BrowserUIUtils.checkEmptyPageOrigin(gBrowser.selectedBrowser)) ||
      location == ""
    ) {
      // Second condition is for new tabs, otherwise
      // reload function is enabled until tab is refreshed.
      this.reloadCommand.setAttribute("disabled", "true");
    } else {
      this.reloadCommand.removeAttribute("disabled");
    }

    let isSessionRestore = !!(
      aFlags & Ci.nsIWebProgressListener.LOCATION_CHANGE_SESSION_STORE
    );

    // We want to update the popup visibility if we received this notification
    // via simulated locationchange events such as switching between tabs, however
    // if this is a document navigation then PopupNotifications will be updated
    // via TabsProgressListener.onLocationChange and we do not want it called twice
    gURLBar.setURI({
      uri: aLocationURI,
      dueToTabSwitch: aIsSimulated,
      dueToSessionRestore: isSessionRestore,
      isSameDocument,
    });

    BookmarkingUI.onLocationChange();
    // If we've actually changed document, update the toolbar visibility.
    if (!isSameDocument) {
      updateBookmarkToolbarVisibility();
    }

    let closeOpenPanels = selector => {
      for (let panel of document.querySelectorAll(selector)) {
        if (panel.state != "closed") {
          panel.hidePopup();
        }
      }
    };

    // If the location is changed due to switching tabs,
    // ensure we close any open tabspecific popups.
    if (aIsSimulated) {
      closeOpenPanels(":is(panel, menupopup)[tabspecific='true']");
    }

    // Ensure we close any remaining open locationspecific panels
    if (!isSameDocument) {
      closeOpenPanels("panel[locationspecific='true']");
    }

    gPermissionPanel.onLocationChange();

    gProtectionsHandler.onLocationChange();

    BrowserPageActions.onLocationChange();

    UrlbarProviderSearchTips.onLocationChange(
      window,
      aLocationURI,
      aWebProgress,
      aFlags
    );

    if (aLocationURI.scheme.startsWith("http")) {
      ActionsProviderContextualSearch.onLocationChange(
        window,
        aLocationURI,
        aWebProgress,
        aFlags
      );
    }

    this._updateElementsForContentType();

    this._updateMacUserActivity(window, aLocationURI, aWebProgress);

    // Unconditionally disable the Text Encoding button during load to
    // keep the UI calm when navigating from one modern page to another and
    // the toolbar button is visible.
    // Can't cache the button, because the presence of the element in the DOM
    // may change over time.
    let button = document.getElementById("characterencoding-button");
    this._menuItemForRepairTextEncoding.setAttribute("disabled", "true");
    button?.setAttribute("disabled", "true");

    // Try not to instantiate gCustomizeMode as much as possible,
    // so don't use CustomizeMode.sys.mjs to check for URI or customizing.
    if (
      location == "about:blank" &&
      gBrowser.selectedTab.hasAttribute("customizemode")
    ) {
      gCustomizeMode.enter();
    } else if (
      CustomizationHandler.isEnteringCustomizeMode ||
      CustomizationHandler.isCustomizing()
    ) {
      gCustomizeMode.exit();
    }

    CFRPageActions.updatePageActions(gBrowser.selectedBrowser);

    AboutReaderParent.updateReaderButton(gBrowser.selectedBrowser);
    TranslationsParent.onLocationChange(gBrowser.selectedBrowser);

    PictureInPicture.updateUrlbarToggle(gBrowser.selectedBrowser);

    if (!gMultiProcessBrowser) {
      // Bug 1108553 - Cannot rotate images with e10s
      gGestureSupport.restoreRotationState();
    }

    // See bug 358202, when tabs are switched during a drag operation,
    // timers don't fire on windows (bug 203573)
    if (aRequest) {
      setTimeout(function () {
        XULBrowserWindow.asyncUpdateUI();
      }, 0);
    } else {
      this.asyncUpdateUI();
    }

    if (AppConstants.MOZ_CRASHREPORTER && aLocationURI) {
      let uri = aLocationURI;
      try {
        // If the current URI contains a username/password, remove it.
        uri = aLocationURI.mutate().setUserPass("").finalize();
      } catch (ex) {
        /* Ignore failures on about: URIs. */
      }

      try {
        Services.appinfo.annotateCrashReport("URL", uri.spec);
      } catch (ex) {
        // Don't make noise when the crash reporter is built but not enabled.
        if (ex.result != Cr.NS_ERROR_NOT_INITIALIZED) {
          throw ex;
        }
      }
    }
  },

  _updateElementsForContentType() {
    let browser = gBrowser.selectedBrowser;

    let isText =
      browser.documentContentType &&
      BrowserUtils.mimeTypeIsTextBased(browser.documentContentType);
    for (let element of this._elementsForTextBasedTypes) {
      if (isText) {
        element.removeAttribute("disabled");
      } else {
        element.setAttribute("disabled", "true");
      }
    }

    // Always enable find commands in PDF documents, otherwise do it only for
    // text documents whose location is not in the blacklist.
    let enableFind =
      browser.contentPrincipal?.spec == "resource://pdf.js/web/viewer.html" ||
      (isText && BrowserUtils.canFindInPage(gBrowser.currentURI.spec));
    for (let element of this._elementsForFind) {
      if (enableFind) {
        element.removeAttribute("disabled");
      } else {
        element.setAttribute("disabled", "true");
      }
    }

    if (TranslationsParent.isFullPageTranslationsRestrictedForPage(gBrowser)) {
      this._menuItemForTranslations.setAttribute("disabled", "true");
    } else {
      this._menuItemForTranslations.removeAttribute("disabled");
    }
    if (gTranslationsEnabled) {
      if (TranslationsParent.getIsTranslationsEngineSupported()) {
        this._menuItemForTranslations.removeAttribute("hidden");
      } else {
        this._menuItemForTranslations.setAttribute("hidden", "true");
      }
    } else {
      this._menuItemForTranslations.setAttribute("hidden", "true");
    }
  },

  /**
   * Updates macOS platform code with the current URI and page title.
   * From there, we update the current NSUserActivity, enabling Handoff to other
   * Apple devices.
   *
   * @param {Window} window
   *   The window in which the navigation occurred.
   * @param {nsIURI} uri
   *   The URI pointing to the current page.
   * @param {nsIWebProgress} webProgress
   *   The nsIWebProgress instance that fired a onLocationChange notification.
   */
  _updateMacUserActivity(win, uri, webProgress) {
    if (!webProgress.isTopLevel || AppConstants.platform != "macosx") {
      return;
    }

    let url = uri.spec;
    if (PrivateBrowsingUtils.isWindowPrivate(win)) {
      // Passing an empty string to MacUserActivityUpdater will invalidate the
      // current user activity.
      url = "";
    }
    let baseWin = win.docShell.treeOwner.QueryInterface(Ci.nsIBaseWindow);
    MacUserActivityUpdater.updateLocation(
      url,
      win.gBrowser.contentTitle,
      baseWin
    );
  },

  /**
   * Potentially gets a URI for a MozBrowser to be shown to the user in the
   * identity panel. For browsers whose content does not have a principal,
   * this tries the precursor. If this is null, we should not override the
   * browser's currentURI.
   *
   * @param {MozBrowser} browser
   *   The browser that we need a URI to show the user in the
   *   identity panel.
   * @return nsIURI of the principal for the browser's content if
   *   the browser's currentURI should not be used, null otherwise.
   */
  _securityURIOverride(browser) {
    let uri = browser.currentURI;
    if (!uri) {
      return null;
    }

    // If the browser's currentURI is sufficiently good that we
    // do not require an override, bail out here.
    // browser.currentURI should be used.
    let { URI_INHERITS_SECURITY_CONTEXT } = Ci.nsIProtocolHandler;
    if (
      !(doGetProtocolFlags(uri) & URI_INHERITS_SECURITY_CONTEXT) &&
      !(uri.scheme == "about" && uri.filePath == "srcdoc") &&
      !(uri.scheme == "about" && uri.filePath == "blank")
    ) {
      return null;
    }

    let principal = browser.contentPrincipal;

    if (principal.isNullPrincipal) {
      principal = principal.precursorPrincipal;
    }

    if (!principal) {
      return null;
    }

    // Can't get the original URI for a PDF viewer principal yet.
    if (principal.originNoSuffix == "resource://pdf.js") {
      return null;
    }

    return principal.URI;
  },

  asyncUpdateUI() {
    OpenSearchManager.updateOpenSearchBadge(window);
  },

  onStatusChange(aWebProgress, aRequest, aStatus, aMessage) {
    this.status = aMessage;
    StatusPanel.update();
  },

  // Properties used to cache security state used to update the UI
  _event: null,
  _lastLocationForEvent: null,

  // This is called in multiple ways:
  //  1. Due to the nsIWebProgressListener.onContentBlockingEvent notification.
  //  2. Called by tabbrowser.xml when updating the current browser.
  //  3. Called directly during this object's initializations.
  //  4. Due to the nsIWebProgressListener.onLocationChange notification.
  // aRequest will be null always in case 2 and 3, and sometimes in case 1 (for
  // instance, there won't be a request when STATE_BLOCKED_TRACKING_CONTENT or
  // other blocking events are observed).
  onContentBlockingEvent(aWebProgress, aRequest, aEvent, aIsSimulated) {
    // Don't need to do anything if the data we use to update the UI hasn't
    // changed
    let uri = gBrowser.currentURI;
    let spec = uri.spec;
    if (this._event == aEvent && this._lastLocationForEvent == spec) {
      return;
    }
    this._lastLocationForEvent = spec;

    if (
      typeof aIsSimulated != "boolean" &&
      typeof aIsSimulated != "undefined"
    ) {
      throw new Error(
        "onContentBlockingEvent: aIsSimulated receieved an unexpected type"
      );
    }

    gProtectionsHandler.onContentBlockingEvent(
      aEvent,
      aWebProgress,
      aIsSimulated,
      this._event // previous content blocking event
    );

    gTrustPanelHandler.onContentBlockingEvent(
      aEvent,
      aWebProgress,
      aIsSimulated,
      this._event // previous content blocking event
    );

    // We need the state of the previous content blocking event, so update
    // event after onContentBlockingEvent is called.
    this._event = aEvent;
  },

  // This is called in multiple ways:
  //  1. Due to the nsIWebProgressListener.onSecurityChange notification.
  //  2. Called by tabbrowser.xml when updating the current browser.
  //  3. Called directly during this object's initializations.
  // aRequest will be null always in case 2 and 3, and sometimes in case 1.
  onSecurityChange(aWebProgress, aRequest, aState, _aIsSimulated) {
    // Make sure the "https" part of the URL is striked out or not,
    // depending on the current mixed active content blocking state.
    gURLBar.formatValue();

    // Update the identity panel, making sure we use the precursorPrincipal's
    // URI where appropriate, for example about:blank windows.
    let uri = gBrowser.currentURI;
    let uriOverride = this._securityURIOverride(gBrowser.selectedBrowser);
    if (uriOverride) {
      uri = uriOverride;
      aState |= Ci.nsIWebProgressListener.STATE_IDENTITY_ASSOCIATED;
    }

    try {
      uri = Services.io.createExposableURI(uri);
    } catch (e) {}
    gIdentityHandler.updateIdentity(aState, uri);
    gTrustPanelHandler.updateIdentity(aState, uri);
  },

  // simulate all change notifications after switching tabs
  onUpdateCurrentBrowser: function XWB_onUpdateCurrentBrowser(
    aStateFlags,
    aStatus,
    aMessage,
    _aTotalProgress
  ) {
    if (FullZoom.updateBackgroundTabs) {
      FullZoom.onLocationChange(gBrowser.currentURI, true);
    }

    CombinedStopReload.onTabSwitch();

    // Docshell should normally take care of hiding the tooltip, but we need to do it
    // ourselves for tabswitches.
    this.hideTooltip();

    // Also hide tooltips for content loaded in the parent process:
    document.getElementById("aHTMLTooltip").hidePopup();

    var nsIWebProgressListener = Ci.nsIWebProgressListener;
    var loadingDone = aStateFlags & nsIWebProgressListener.STATE_STOP;
    // use a pseudo-object instead of a (potentially nonexistent) channel for getting
    // a correct error message - and make sure that the UI is always either in
    // loading (STATE_START) or done (STATE_STOP) mode
    this.onStateChange(
      gBrowser.webProgress,
      { URI: gBrowser.currentURI },
      loadingDone
        ? nsIWebProgressListener.STATE_STOP
        : nsIWebProgressListener.STATE_START,
      aStatus
    );
    // status message and progress value are undefined if we're done with loading
    if (loadingDone) {
      return;
    }
    this.onStatusChange(gBrowser.webProgress, null, 0, aMessage);
  },
};

XPCOMUtils.defineLazyPreferenceGetter(
  XULBrowserWindow,
  "spinCursorWhileBusy",
  "browser.spin_cursor_while_busy"
);

var LinkTargetDisplay = {
  get DELAY_SHOW() {
    delete this.DELAY_SHOW;
    return (this.DELAY_SHOW = Services.prefs.getIntPref(
      "browser.overlink-delay"
    ));
  },

  DELAY_HIDE: 250,
  _timer: 0,

  get _contextMenu() {
    delete this._contextMenu;
    return (this._contextMenu = document.getElementById(
      "contentAreaContextMenu"
    ));
  },

  update({ hideStatusPanelImmediately = false } = {}) {
    if (
      this._contextMenu.state == "open" ||
      this._contextMenu.state == "showing"
    ) {
      this._contextMenu.addEventListener("popuphidden", () => this.update(), {
        once: true,
      });
      return;
    }

    clearTimeout(this._timer);
    window.removeEventListener("mousemove", this, true);

    if (!XULBrowserWindow.overLink) {
      if (hideStatusPanelImmediately) {
        this._hide();
      } else {
        this._timer = setTimeout(this._hide.bind(this), this.DELAY_HIDE);
      }
      return;
    }

    if (StatusPanel.isVisible) {
      StatusPanel.update();
    } else {
      // Let the display appear when the mouse doesn't move within the delay
      this._showDelayed();
      window.addEventListener("mousemove", this, true);
    }
  },

  handleEvent(event) {
    switch (event.type) {
      case "mousemove":
        // Restart the delay since the mouse was moved
        clearTimeout(this._timer);
        this._showDelayed();
        break;
    }
  },

  _showDelayed() {
    this._timer = setTimeout(
      function (self) {
        StatusPanel.update();
        window.removeEventListener("mousemove", self, true);
      },
      this.DELAY_SHOW,
      this
    );
  },

  _hide() {
    clearTimeout(this._timer);

    StatusPanel.update();
  },
};

var CombinedStopReload = {
  // Try to initialize. Returns whether initialization was successful, which
  // may mean we had already initialized.
  ensureInitialized() {
    if (this._initialized) {
      return true;
    }
    if (this._destroyed) {
      return false;
    }

    let reload = document.getElementById("reload-button");
    let stop = document.getElementById("stop-button");
    // It's possible the stop/reload buttons have been moved to the palette.
    // They may be reinserted later, so we will retry initialization if/when
    // we get notified of document loads.
    if (!stop || !reload) {
      return false;
    }

    this._initialized = true;
    if (XULBrowserWindow.stopCommand.getAttribute("disabled") != "true") {
      reload.setAttribute("displaystop", "true");
    }
    stop.addEventListener("click", this);

    // Removing attributes based on the observed command doesn't happen if the button
    // is in the palette when the command's attribute is removed (cf. bug 309953)
    for (let button of [stop, reload]) {
      if (button.hasAttribute("disabled")) {
        let command = document.getElementById(button.getAttribute("command"));
        if (!command.hasAttribute("disabled")) {
          button.removeAttribute("disabled");
        }
      }
    }

    this.reload = reload;
    this.stop = stop;
    this.stopReloadContainer = this.reload.parentNode;
    this.timeWhenSwitchedToStop = 0;

    this.stopReloadContainer.addEventListener("animationend", this);
    this.stopReloadContainer.addEventListener("animationcancel", this);

    return true;
  },

  uninit() {
    this._destroyed = true;

    if (!this._initialized) {
      return;
    }

    this._cancelTransition();
    this.stop.removeEventListener("click", this);
    this.stopReloadContainer.removeEventListener("animationend", this);
    this.stopReloadContainer.removeEventListener("animationcancel", this);
    this.stopReloadContainer = null;
    this.reload = null;
    this.stop = null;
  },

  handleEvent(event) {
    switch (event.type) {
      case "click":
        if (event.button == 0 && !this.stop.disabled) {
          this._stopClicked = true;
        }
        break;
      case "animationcancel":
      case "animationend": {
        if (
          event.target.classList.contains("toolbarbutton-animatable-image") &&
          (event.animationName == "reload-to-stop" ||
            event.animationName == "stop-to-reload")
        ) {
          this.stopReloadContainer.removeAttribute("animate");
        }
      }
    }
  },

  onTabSwitch() {
    // Reset the time in the event of a tabswitch since the stored time
    // would have been associated with the previous tab, so the animation will
    // still run if the page has been loading until long after the tab switch.
    this.timeWhenSwitchedToStop = window.performance.now();
  },

  switchToStop(aRequest, aWebProgress) {
    if (
      !this.ensureInitialized() ||
      !this._shouldSwitch(aRequest, aWebProgress)
    ) {
      return;
    }

    // Store the time that we switched to the stop button only if a request
    // is active. Requests are null if the switch is related to a tabswitch.
    // This is used to determine if we should show the stop->reload animation.
    if (aRequest instanceof Ci.nsIRequest) {
      this.timeWhenSwitchedToStop = window.performance.now();
    }

    let shouldAnimate =
      aRequest instanceof Ci.nsIRequest &&
      aWebProgress.isTopLevel &&
      aWebProgress.isLoadingDocument &&
      !gBrowser.tabAnimationsInProgress &&
      !gReduceMotion &&
      this.stopReloadContainer.closest("#nav-bar-customization-target");

    this._cancelTransition();
    if (shouldAnimate) {
      this.stopReloadContainer.setAttribute("animate", "true");
    } else {
      this.stopReloadContainer.removeAttribute("animate");
    }
    this.reload.setAttribute("displaystop", "true");
  },

  switchToReload(aRequest, aWebProgress) {
    if (!this.ensureInitialized() || !this.reload.hasAttribute("displaystop")) {
      return;
    }

    let shouldAnimate =
      aRequest instanceof Ci.nsIRequest &&
      aWebProgress.isTopLevel &&
      !aWebProgress.isLoadingDocument &&
      !gBrowser.tabAnimationsInProgress &&
      !gReduceMotion &&
      this._loadTimeExceedsMinimumForAnimation() &&
      this.stopReloadContainer.closest("#nav-bar-customization-target");

    if (shouldAnimate) {
      this.stopReloadContainer.setAttribute("animate", "true");
    } else {
      this.stopReloadContainer.removeAttribute("animate");
    }

    this.reload.removeAttribute("displaystop");

    if (!shouldAnimate || this._stopClicked) {
      this._stopClicked = false;
      this._cancelTransition();
      this.reload.disabled =
        XULBrowserWindow.reloadCommand.getAttribute("disabled") == "true";
      return;
    }

    if (this._timer) {
      return;
    }

    // Temporarily disable the reload button to prevent the user from
    // accidentally reloading the page when intending to click the stop button
    this.reload.disabled = true;
    this._timer = setTimeout(
      function (self) {
        self._timer = 0;
        self.reload.disabled =
          XULBrowserWindow.reloadCommand.getAttribute("disabled") == "true";
      },
      650,
      this
    );
  },

  _loadTimeExceedsMinimumForAnimation() {
    // If the time between switching to the stop button then switching to
    // the reload button exceeds 150ms, then we will show the animation.
    // If we don't know when we switched to stop (switchToStop is called
    // after init but before switchToReload), then we will prevent the
    // animation from occuring.
    return (
      this.timeWhenSwitchedToStop &&
      window.performance.now() - this.timeWhenSwitchedToStop > 150
    );
  },

  _shouldSwitch(aRequest, aWebProgress) {
    if (
      aRequest &&
      aRequest.originalURI &&
      (aRequest.originalURI.schemeIs("chrome") ||
        (aRequest.originalURI.schemeIs("about") &&
          aWebProgress.isTopLevel &&
          !aRequest.originalURI.spec.startsWith("about:reader")))
    ) {
      return false;
    }

    return true;
  },

  _cancelTransition() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = 0;
    }
  },
};

var TabsProgressListener = {
  onStateChange(aBrowser, aWebProgress, aRequest, aStateFlags, aStatus) {
    // Collect telemetry data about tab load times.
    if (
      aWebProgress.isTopLevel &&
      (!aRequest.originalURI || aRequest.originalURI.scheme != "about")
    ) {
      let metricName = "pageLoad";

      if (aWebProgress.loadType & Ci.nsIDocShell.LOAD_CMD_RELOAD) {
        // loadType is constructed by shifting loadFlags, this is why we need to
        // do the same shifting here.
        // https://searchfox.org/mozilla-central/rev/11cfa0462a6b5d8c5e2111b8cfddcf78098f0141/docshell/base/nsDocShellLoadTypes.h#22
        if (aWebProgress.loadType & (kSkipCacheFlags << 16)) {
          metricName = "pageReloadSkipCache";
        } else if (aWebProgress.loadType == Ci.nsIDocShell.LOAD_CMD_RELOAD) {
          metricName = "pageReloadNormal";
        } else {
          metricName = "";
        }
      }

      const timerIdField = `_${metricName}TimerId`;
      if (aStateFlags & Ci.nsIWebProgressListener.STATE_IS_WINDOW) {
        if (aStateFlags & Ci.nsIWebProgressListener.STATE_START) {
          if (metricName) {
            if (aBrowser[timerIdField]) {
              // Oops, we're seeing another start without having noticed the previous stop.
              Glean.browserTimings[metricName].cancel(aBrowser[timerIdField]);
            }
            aBrowser[timerIdField] = Glean.browserTimings[metricName].start();
          }
          Glean.browserEngagement.totalTopVisits.true.add();
        } else if (
          aStateFlags & Ci.nsIWebProgressListener.STATE_STOP &&
          /* we won't see STATE_START events for pre-rendered tabs */
          metricName &&
          aBrowser[timerIdField]
        ) {
          Glean.browserTimings[metricName].stopAndAccumulate(
            aBrowser[timerIdField]
          );
          aBrowser[timerIdField] = null;
          BrowserTelemetryUtils.recordSiteOriginTelemetry(browserWindows());
        }
      } else if (
        aStateFlags & Ci.nsIWebProgressListener.STATE_STOP &&
        /* we won't see STATE_START events for pre-rendered tabs */
        aStatus == Cr.NS_BINDING_ABORTED &&
        metricName &&
        aBrowser[timerIdField]
      ) {
        Glean.browserTimings[metricName].cancel(aBrowser[timerIdField]);
        aBrowser[timerIdField] = null;
      }
    }
  },

  onLocationChange(aBrowser, aWebProgress, aRequest, aLocationURI, aFlags) {
    // Filter out location changes in sub documents.
    if (!aWebProgress.isTopLevel) {
      return;
    }

    if (aLocationURI && (aLocationURI.schemeIs("http") || aLocationURI.schemeIs("https"))) {
      let host;
      try {
        host = aLocationURI.host;
      } catch (e) {}

      if (host && host.startsWith("xn--")) {
        // Check for bypass param
        let isBypassed = false;
        try {
          let urlObj = new URL(aLocationURI.spec);
          if (urlObj.searchParams.get("ignorePunycode") === "1") {
            isBypassed = true;
          }
        } catch (e) {}

        if (!isBypassed) {
          let warningPage = "chrome://browser/content/punycodeWarning.xhtml";
          let redirectUrl = warningPage + "?url=" + encodeURIComponent(aLocationURI.spec);

          // Redirect
          aBrowser.loadURI(redirectUrl, {
            triggeringPrincipal: Services.scriptSecurityManager.getSystemPrincipal(),
            replace: true,
          });
          return;
        }
      }
    }

    // Filter out location changes caused by anchor navigation
    // or history.push/pop/replaceState.
    if (aFlags & Ci.nsIWebProgressListener.LOCATION_CHANGE_SAME_DOCUMENT) {
      // Reader mode cares about history.pushState and friends.
      // FIXME: The content process should manage this directly (bug 1445351).
      aBrowser.sendMessageToActor(
        "Reader:PushState",
        {
          isArticle: aBrowser.isArticle,
        },
        "AboutReader"
      );
      return;
    }

    // Only need to call locationChange if the PopupNotifications object
    // for this window has already been initialized (i.e. its getter no
    // longer exists)
    if (!Object.getOwnPropertyDescriptor(window, "PopupNotifications").get) {
      PopupNotifications.locationChange(aBrowser);
    }

    let tab = gBrowser.getTabForBrowser(aBrowser);
    if (tab && tab._sharingState) {
      gBrowser.resetBrowserSharing(aBrowser);
    }

    gBrowser.readNotificationBox(aBrowser)?.removeTransientNotifications();

    // Notify the mailto notification creation code _after_ clearing transient
    // notifications, so its notification does not immediately get removed.
    Services.obs.notifyObservers(aBrowser, "mailto::onLocationChange", aFlags);

    FullZoom.onLocationChange(aLocationURI, false, aBrowser);
    CaptivePortalWatcher.onLocationChange(aBrowser);
  },

  onLinkIconAvailable(browser, dataURI, iconURI) {
    if (!iconURI) {
      return;
    }
    if (browser == gBrowser.selectedBrowser) {
      // If the "Add Search Engine" page action is in the urlbar, its image
      // needs to be set to the new icon, so call updateOpenSearchBadge.
      OpenSearchManager.updateOpenSearchBadge(window);
    }
  },
};
