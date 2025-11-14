/**
 * Celopass Embed Widget
 * Add this script to your website to embed payment buttons
 * 
 * Usage:
 * <script src="https://celopass.me/embed.js"></script>
 * <div data-celopass="username"></div>
 */

(function() {
  'use strict';

  // Configuration
  const EMBED_URL = 'https://celopass.me/embed';
  const WIDGET_SCRIPT = 'https://celopass.me/embed.js';

  function initEmbed() {
    const containers = document.querySelectorAll('[data-celopass]');
    
    containers.forEach(container => {
      const username = container.getAttribute('data-celopass');
      if (!username) return;

      // Create iframe
      const iframe = document.createElement('iframe');
      iframe.src = `${EMBED_URL}/${username}`;
      iframe.style.width = '100%';
      iframe.style.minHeight = '400px';
      iframe.style.border = 'none';
      iframe.style.borderRadius = '8px';
      iframe.scrolling = 'no';
      iframe.setAttribute('allowtransparency', 'true');
      
      // Handle iframe resize
      iframe.onload = function() {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          iframe.style.height = iframeDoc.body.scrollHeight + 'px';
        } catch (e) {
          // Cross-origin, use default height
          iframe.style.height = '500px';
        }
      };

      // Clear container and add iframe
      container.innerHTML = '';
      container.appendChild(iframe);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEmbed);
  } else {
    initEmbed();
  }

  // Also support manual initialization
  window.CelopassEmbed = {
    init: initEmbed
  };
})();

