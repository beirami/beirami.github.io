// /assets/js/external-links.js
(function () {
  var siteHost = location.hostname.replace(/^www\./,'');
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
      try {
        var u = new URL(href, location.origin);
        var external = u.hostname.replace(/^www\./,'') !== siteHost;
        if (!external || a.target) return;            // skip internal or already-targeted links
        a.target = '_blank';
        var rel = (a.getAttribute('rel') || '').split(/\s+/);
        if (!rel.includes('noopener')) rel.push('noopener');
        if (!rel.includes('noreferrer')) rel.push('noreferrer');
        if (!rel.includes('external')) rel.push('external');
        a.setAttribute('rel', rel.join(' ').trim());
      } catch (e) { /* ignore bad URLs */ }
    });
  });
})();
