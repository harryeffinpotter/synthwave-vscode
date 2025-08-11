(function () {
  //====================================
  // Theme replacement CSS (Glow styles)
  //====================================
  const tokenReplacements = {
    /* Red */
    'fe4450': "color: #fff5f6; text-shadow: 0 0 2px #000, 0 0 10px #fc1f2c[NEON_BRIGHTNESS], 0 0 5px #fc1f2c[NEON_BRIGHTNESS], 0 0 25px #fc1f2c[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Light neon pink */
    'ff99e5': "color: #ffccf0; text-shadow: 0 0 2px #100c0f, 0 0 5px #ff66d933, 0 0 10px #fff3; backface-visibility: hidden;",
    /* Cyan/Light Blue for variables */
    '6fc3df': "color: #b8e7ff; text-shadow: 0 0 2px #000, 0 0 10px #00d4ff[NEON_BRIGHTNESS], 0 0 20px #00d4ff[NEON_BRIGHTNESS], 0 0 40px #00d4ff[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* BRIGHT CYAN for variables */
    '00ffff': "color: #ffffff; text-shadow: 0 0 2px #000, 0 0 10px #00ffff[NEON_BRIGHTNESS], 0 0 20px #00ffff[NEON_BRIGHTNESS], 0 0 40px #00ffff[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* LIGHT PINK for functions */
    'ffb3ff': "color: #ffffff; text-shadow: 0 0 2px #000, 0 0 10px #ff00ff[NEON_BRIGHTNESS], 0 0 20px #ff00ff[NEON_BRIGHTNESS], 0 0 40px #ff00ff[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* HOT PINK for classes */
    'ff1493': "color: #ffffff; text-shadow: 0 0 2px #000, 0 0 10px #ff1493[NEON_BRIGHTNESS], 0 0 20px #ff1493[NEON_BRIGHTNESS], 0 0 40px #ff1493[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* LIGHT GREEN for keywords */
    '7fff00': "color: #ffffff; text-shadow: 0 0 2px #000, 0 0 10px #7fff00[NEON_BRIGHTNESS], 0 0 20px #7fff00[NEON_BRIGHTNESS], 0 0 40px #7fff00[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* WHITE for operators */
    'ffffff': "color: #ffffff; text-shadow: 0 0 2px #000, 0 0 10px #ffffff[NEON_BRIGHTNESS], 0 0 20px #ffffff[NEON_BRIGHTNESS], 0 0 40px #ffffff[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Dark cyan for strings */
    '008b8b': "color: #00ffff; text-shadow: 0 0 2px #000, 0 0 10px #008b8b[NEON_BRIGHTNESS], 0 0 20px #008b8b[NEON_BRIGHTNESS], 0 0 40px #008b8b[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Light Blue (was yellow) */
    'a0d8ef': "color: #d0f0ff; text-shadow: 0 0 2px #001722, 0 0 8px #6fc3df[NEON_BRIGHTNESS], 0 0 2px #6fc3df[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    'b8e7ff': "color: #d0f0ff; text-shadow: 0 0 2px #001722, 0 0 8px #6fc3df[NEON_BRIGHTNESS], 0 0 2px #6fc3df[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Yellow */
    'fede5d': "color: #f4eee4; text-shadow: 0 0 2px #393a33, 0 0 8px #f39f05[NEON_BRIGHTNESS], 0 0 2px #f39f05[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Green */
    '72f1b8': "color: #72f1b8; text-shadow: 0 0 2px #100c0f, 0 0 10px #257c55[NEON_BRIGHTNESS], 0 0 35px #212724[NEON_BRIGHTNESS]; backface-visibility: hidden;",
    /* Blue */
    '36f9f6': "color: #fdfdfd; text-shadow: 0 0 2px #001716, 0 0 3px #03edf9[NEON_BRIGHTNESS], 0 0 5px #03edf9[NEON_BRIGHTNESS], 0 0 8px #03edf9[NEON_BRIGHTNESS]; backface-visibility: hidden;"
  };

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
      let updatedThemeStyles = !disableGlow 
        ? replaceTokens(initialThemeStyles, tokenReplacements) 
        : initialThemeStyles;
      
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