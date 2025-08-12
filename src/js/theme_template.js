(function () {
  //====================================
  // Theme replacement CSS (Glow styles)
  //====================================
  const tokenReplacements = {
    /* Strings (legacy black) */
    '000000': "color: #000000; text-shadow: 0 0 2px #000000, 0 0 10px #000000[NEON_BRIGHTNESS], 0 0 20px #000000[NEON_BRIGHTNESS], 0 0 40px #000000[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Variables — lighter cyan, brighter glow */
    '8cd9ff': "color: #8cd9ff; text-shadow: 0 0 2px #000, 0 0 14px #6CD0FF[NEON_BRIGHTNESS], 0 0 28px #92DBFF[NEON_BRIGHTNESS], 0 0 64px #A4E1FF[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Variables (older builds) */
    '0479ff': "color: #0479ff; text-shadow: 0 0 2px #000, 0 0 10px #0479ff[NEON_BRIGHTNESS], 0 0 20px #0479ff[NEON_BRIGHTNESS], 0 0 40px #0479ff[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Language variables */
    'ffa7ad': "color: #ffa7ad; text-shadow: 0 0 2px #000, 0 0 10px #ffa7ad[NEON_BRIGHTNESS], 0 0 20px #ffa7ad[NEON_BRIGHTNESS], 0 0 40px #ffa7ad[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Storage/Keywords — now bright pink keyword colour, stronger pink glow */
    'ff77ff': "color: #ff77ff; text-shadow: 0 0 2px #000, 0 0 16px #ff77ff[NEON_BRIGHTNESS], 0 0 28px #ff77ff[NEON_BRIGHTNESS], 0 0 64px #ff77ff[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Light blue refs */
    '63d3ff': "color: #63d3ff; text-shadow: 0 0 2px #000, 0 0 10px #63d3ff[NEON_BRIGHTNESS], 0 0 20px #63d3ff[NEON_BRIGHTNESS], 0 0 40px #63d3ff[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    'a9c8ff': "color: #a9c8ff; text-shadow: 0 0 2px #000, 0 0 10px #a9c8ff[NEON_BRIGHTNESS], 0 0 20px #a9c8ff[NEON_BRIGHTNESS], 0 0 40px #a9c8ff[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Constants/numbers */
    'f97e72': "color: #f97e72; text-shadow: 0 0 2px #000, 0 0 10px #f97e72[NEON_BRIGHTNESS], 0 0 20px #f97e72[NEON_BRIGHTNESS], 0 0 40px #f97e72[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Character escape */
    'adffd6': "color: #adffd6; text-shadow: 0 0 2px #000, 0 0 10px #adffd6[NEON_BRIGHTNESS], 0 0 20px #adffd6[NEON_BRIGHTNESS], 0 0 40px #adffd6[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Entity */
    'ffc6ff': "color: #ffc6ff; text-shadow: 0 0 2px #000, 0 0 10px #ffc6ff[NEON_BRIGHTNESS], 0 0 20px #ffc6ff[NEON_BRIGHTNESS], 0 0 40px #ffc6ff[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* HTML tags */
    '72f1b8': "color: #72f1b8; text-shadow: 0 0 2px #000, 0 0 6px #72f1b8[NEON_BRIGHTNESS], 0 0 12px #72f1b8[NEON_BRIGHTNESS], 0 0 24px #72f1b8[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    '36f9f6': "color: #36f9f6; text-shadow: 0 0 2px #000, 0 0 12px #36f9f6[NEON_BRIGHTNESS], 0 0 24px #36f9f6[NEON_BRIGHTNESS], 0 0 56px #36f9f6[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Yellow attributes */
    'fede5d': "color: #fede5d; text-shadow: 0 0 2px #000, 0 0 10px #fede5d[NEON_BRIGHTNESS], 0 0 20px #fede5d[NEON_BRIGHTNESS], 0 0 40px #fede5d[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Classes - hot pink */
    'ff1493': "color: #ff1493; text-shadow: 0 0 2px #000, 0 0 12px #ff66ff[NEON_BRIGHTNESS], 0 0 24px #ff66ff[NEON_BRIGHTNESS], 0 0 56px #ff66ff[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Inherited class */
    'ffcdae': "color: #ffcdae; text-shadow: 0 0 2px #000, 0 0 10px #ffcdae[NEON_BRIGHTNESS], 0 0 20px #ffcdae[NEON_BRIGHTNESS], 0 0 40px #ffcdae[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Functions - light mint, cyan edge */
    'b6ffe2': "color: #b6ffe2; text-shadow: 0 0 2px #000, 0 0 12px #8cd9ff[NEON_BRIGHTNESS], 0 0 24px #8cd9ff[NEON_BRIGHTNESS], 0 0 56px #a4e1ff[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* JS numerics (lighter cyan) */
    'a6f3ff': "color: #a6f3ff; text-shadow: 0 0 2px #000, 0 0 14px #a6f3ff[NEON_BRIGHTNESS], 0 0 28px #a6f3ff[NEON_BRIGHTNESS], 0 0 64px #a6f3ff[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Control keywords (light blue base) */
    '9fdcff': "color: #9fdcff; text-shadow: 0 0 2px #000, 0 0 16px #66eeff[NEON_BRIGHTNESS], 0 0 28px #66eeff[NEON_BRIGHTNESS], 0 0 64px #66eeff[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Operators - theme uses b2c4ff; prefer crisp white glow but keep token color */
    'b2c4ff': "color: #b2c4ff; text-shadow: 0 0 2px #000, 0 0 10px #ffffff[NEON_BRIGHTNESS], 0 0 20px #ffffff[NEON_BRIGHTNESS], 0 0 40px #ffffff[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    'ffffff': "color: #ffffff; text-shadow: 0 0 2px #000, 0 0 10px #ffffff[NEON_BRIGHTNESS], 0 0 20px #ffffff[NEON_BRIGHTNESS], 0 0 40px #ffffff[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Unit */
    'ffbfba': "color: #ffbfba; text-shadow: 0 0 2px #000, 0 0 10px #ffbfba[NEON_BRIGHTNESS], 0 0 20px #ffbfba[NEON_BRIGHTNESS], 0 0 40px #ffbfba[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Support */
    'ff9aa1': "color: #ff9aa1; text-shadow: 0 0 2px #000, 0 0 10px #ff9aa1[NEON_BRIGHTNESS], 0 0 20px #ff9aa1[NEON_BRIGHTNESS], 0 0 40px #ff9aa1[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Support variable */
    'b4beff': "color: #b4beff; text-shadow: 0 0 2px #000, 0 0 10px #b4beff[NEON_BRIGHTNESS], 0 0 20px #b4beff[NEON_BRIGHTNESS], 0 0 40px #b4beff[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Object keys — lighter cyan */
    'bfe9ff': "color: #bfe9ff; text-shadow: 0 0 2px #000, 0 0 14px #bfe9ff[NEON_BRIGHTNESS], 0 0 28px #bfe9ff[NEON_BRIGHTNESS], 0 0 64px #bfe9ff[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Embedded punctuation */
    'ffec9e': "color: #ffec9e; text-shadow: 0 0 2px #000, 0 0 10px #ffec9e[NEON_BRIGHTNESS], 0 0 20px #ffec9e[NEON_BRIGHTNESS], 0 0 40px #ffec9e[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Python function call */
    '7fb2ff': "color: #7fb2ff; text-shadow: 0 0 2px #000, 0 0 10px #7fb2ff[NEON_BRIGHTNESS], 0 0 20px #7fb2ff[NEON_BRIGHTNESS], 0 0 40px #7fb2ff[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* C# storage type */
    '020202': "color: #020202; text-shadow: 0 0 2px #000, 0 0 10px #020202[NEON_BRIGHTNESS], 0 0 20px #020202[NEON_BRIGHTNESS], 0 0 40px #020202[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Red/error */
    'fe4450': "color: #fe4450; text-shadow: 0 0 2px #000, 0 0 10px #fe4450[NEON_BRIGHTNESS], 0 0 20px #fe4450[NEON_BRIGHTNESS], 0 0 40px #fe4450[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Markup heading pink */
    'ff99e5': "color: #ff99e5; text-shadow: 0 0 2px #000, 0 0 10px #ff99e5[NEON_BRIGHTNESS], 0 0 20px #ff99e5[NEON_BRIGHTNESS], 0 0 40px #ff99e5[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* CSS pseudo/orange */
    'dd5500': "color: #dd5500; text-shadow: 0 0 2px #000, 0 0 10px #dd5500[NEON_BRIGHTNESS], 0 0 20px #dd5500[NEON_BRIGHTNESS], 0 0 40px #dd5500[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Strings — no glow at all */
    '6ea4ff': "color: #6ea4ff;",
    '8bb8ff': "color: #6ea4ff;",
    'fff1bf': "color: #6ea4ff;",
    /* Comments — no glow */
    '9185d3': "color: #9185d3;"
  };

  //=============================
  // User config injection hooks
  //=============================
  // Provided by extension at build time
  const userOverrides = [USER_OVERRIDES];
  const userNoGlow = [USER_NOGLOW]; // array of hex strings (lowercased) with no glow

  // Build merged overrides, and add explicit no-glow entries
  const mergedOverrides = (() => {
    const out = { ...tokenReplacements, ...(userOverrides || {}) };
    if (Array.isArray(userNoGlow)) {
      for (const hex of userNoGlow) {
        if (typeof hex === 'string' && hex.length === 6) {
          out[hex.toLowerCase()] = `color: #${hex.toLowerCase()};`;
        }
      }
    }
    return out;
  })();

  //=============================
  // Helper functions
  //=============================

  /**
   * @summary Check if the style element exists and that it has synthwave '84 color content
   * @param {HTMLElement} tokensEl the style tag
   * @param {object} replacements key/value pairs of colour hex and the glow styles to replace them with
   * @returns {boolean}
   */
  const themeStylesExist = (tokensEl, replacements) => {
    // Check if styles exist and contain at least some of our colors
    if (tokensEl.innerText === '') return false;
    
    // Check for at least 3 of our main colors to verify it's our theme
    const mainColors = ['fe4450', '72f1b8', '36f9f6', 'fede5d'];
    let foundCount = 0;
    for (const color of mainColors) {
      if (tokensEl.innerText.toLowerCase().includes(`#${color}`)) {
        foundCount++;
      }
    }
    return foundCount >= 3;  // If we find at least 3 main colors, it's our theme
  };

  /**
   * @summary Search and replace colours within a CSS definition
   * @param {string} styles the text content of the style tag
   * @param {object} replacements key/value pairs of colour hex and the glow styles to replace them with
   * @returns 
   */
  const replaceTokens = (styles, replacements) => Object.keys(replacements).reduce((acc, color) => {
    const re = new RegExp(`color: #${color};`, 'gi');
    return acc.replace(re, replacements[color]);
  }, styles);

  /**
   * @summary Add a default glow that matches each token's own color when no explicit override exists
   * @param {string} styles CSS text
   * @param {object} overrides explicit color->style map used above
   * @returns {string}
   */
  const applyGenericGlow = (styles, overrides) => {
    const colorRegex = /color:\s*#([0-9a-fA-F]{6});/g;
    return styles.replace(colorRegex, (fullMatch, hex) => {
      const lower = hex.toLowerCase();
      // If an explicit override exists, leave it for the previous replacement
      if (overrides[lower]) return fullMatch;
      // Do not add generic glow to strings or comments like classes .mtk11 or comment scopes; rely on explicit map
      // Strings and comments are handled above and keep no glow.
      // Avoid over-glowing pure white; keep it but with its own glow color
      return `color: #${lower}; text-shadow: 0 0 2px #000, 0 0 10px #${lower}[NEON_BRIGHTNESS], 0 0 20px #${lower}[NEON_BRIGHTNESS], 0 0 40px #${lower}[NEON_BRIGHTNESS]; backface-visibility: hidden;`;
    });
  };

  /**
   * @summary Checks if a theme is applied, and that the theme belongs to the Synthwave 84 family
   * @returns {boolean}
   */
  const usingSynthwave = () => {
    const appliedTheme = document.querySelector('[class*="theme-json"]');
    const synthWaveTheme = document.querySelector('[class*="RobbOwen-synthwave-vscode-themes"]');
    return appliedTheme && synthWaveTheme;
  }

  /**
   * @summary Checks if the theme is synthwave, and that the styles exist, ready for replacement
   * @param {HTMLElement} tokensEl the style tag
   * @param {object} replacements key/value pairs of colour hex and the glow styles to replace them with
   * @returns 
   */
  const readyForReplacement = (tokensEl, tokenReplacements) => tokensEl 
    ? (
      // only init if we're using a Synthwave 84 subtheme
      usingSynthwave() &&         
      // does it have content ?
      themeStylesExist(tokensEl, tokenReplacements)
    )
    : false;

  /**
   * @summary Attempts to bootstrap the theme
   * @param {boolean} disableGlow 
   * @param {MutationObserver} obs 
   */
  const initNeonDreams = (disableGlow, obs) => {
    const tokensEl = document.querySelector('.vscode-tokens-styles');

    if (!tokensEl || !readyForReplacement(tokensEl, tokenReplacements)) {
      return;
    }

    // Add the theme styles if they don't already exist in the DOM
    if (!document.querySelector('#synthwave-84-theme-styles')) {
      const initialThemeStyles = tokensEl.innerText;
      
      // Replace tokens with glow styles
      let updatedThemeStyles = initialThemeStyles;
      if (!disableGlow) {
        // Apply explicit overrides (including user + no-glow), then generic same-color glow to anything left
        const withOverrides = replaceTokens(initialThemeStyles, mergedOverrides);
        updatedThemeStyles = applyGenericGlow(withOverrides, mergedOverrides);
      }
      
      /* append the remaining styles */
      updatedThemeStyles = `${updatedThemeStyles}[CHROME_STYLES]`;
  
      const newStyleTag = document.createElement('style');
      newStyleTag.setAttribute("id", "synthwave-84-theme-styles");
      newStyleTag.innerText = updatedThemeStyles.replace(/(\r\n|\n|\r)/gm, '');
      document.body.appendChild(newStyleTag);
      
      console.log('Synthwave \'84: NEON DREAMS initialised!');
    }

    // disconnect the observer because we don't need it anymore
    if (obs) {
      obs.disconnect();
      obs = null;
    }
  };

  /**
   * @summary A MutationObserver callback that attempts to bootstrap the theme and assigns a retry attempt if it fails
   */
  const watchForBootstrap = function(mutationsList, observer) {
    for(let mutation of mutationsList) {
      if (mutation.type === 'attributes' || mutation.type === 'childList') {
        // does the style div exist yet?
        const tokensEl = document.querySelector('.vscode-tokens-styles');
        if (readyForReplacement(tokensEl, tokenReplacements)) {
          // If everything we need is ready, then initialise
          initNeonDreams([DISABLE_GLOW], observer);
        } else {
          if (tokensEl) {
            // sometimes VS code takes a while to init the styles content, so if there stop this observer and add an observer for that
            observer.disconnect();
            observer.observe(tokensEl, { childList: true });
          }
        }
      }
    }
  };

  //=============================
  // Start bootstrapping!
  //=============================
  // Grab body node
  const bodyNode = document.querySelector('body');
  // Use a mutation observer to check when we can bootstrap the theme
  const observer = new MutationObserver(watchForBootstrap);
  /* watch for both attribute and childList changes because, depending on 
  the VS code version, the mutations might happen on the body, or they might 
  happen on a nested div */
  observer.observe(bodyNode, { attributes: true, childList: true });
})();