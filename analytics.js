(() => {
  'use strict';

  const measurementId = 'G-WX015PXD1L';
  const consentKey = 'tk_analytics_consent';
  const banner = document.querySelector('[data-analytics-consent]');
  const acceptButton = document.querySelector('[data-analytics-accept]');
  const declineButton = document.querySelector('[data-analytics-decline]');
  const settingsButton = document.querySelector('[data-analytics-settings]');
  let analyticsLoaded = false;
  let consent = readConsent();

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted'
  });
  window.gtag('set', 'ads_data_redaction', true);

  function readConsent() {
    try {
      const value = window.localStorage.getItem(consentKey);
      return value === 'granted' || value === 'denied' ? value : null;
    } catch {
      return null;
    }
  }

  function saveConsent(value) {
    consent = value;
    try {
      window.localStorage.setItem(consentKey, value);
    } catch {
      // The choice still applies for the current page when storage is unavailable.
    }
  }

  function clearAnalyticsCookies() {
    document.cookie.split(';').forEach((cookie) => {
      const name = cookie.split('=')[0].trim();
      if (!name.startsWith('_ga')) return;
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${window.location.hostname}; SameSite=Lax`;
    });
  }

  function loadAnalytics() {
    if (analyticsLoaded || consent !== 'granted') return;
    analyticsLoaded = true;

    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      send_page_view: true
    });

    const googleTag = document.createElement('script');
    googleTag.async = true;
    googleTag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(googleTag);
  }

  function setConsent(value) {
    saveConsent(value);
    banner.hidden = true;

    if (value === 'granted') {
      loadAnalytics();
      return;
    }

    window.gtag('consent', 'update', { analytics_storage: 'denied' });
    clearAnalyticsCookies();
  }

  function track(eventName, parameters = {}) {
    if (consent !== 'granted' || !analyticsLoaded) return;
    window.gtag('event', eventName, parameters);
  }

  acceptButton?.addEventListener('click', () => setConsent('granted'));
  declineButton?.addEventListener('click', () => setConsent('denied'));
  settingsButton?.addEventListener('click', () => {
    banner.hidden = false;
    banner.querySelector('button')?.focus({ preventScroll: true });
  });

  document.addEventListener('click', (event) => {
    const target = event.target.closest('a, button');
    if (!target) return;

    if (target.matches('[data-copy-contact]')) {
      const method = target.dataset.copyStatusId?.startsWith('phone') ? 'copy_phone' : 'copy_email';
      track('contact_action', { method, location: 'contact_section' });
      return;
    }

    if (target.matches('a[href^="mailto:"]')) {
      track('contact_action', { method: 'email_link', location: target.closest('#contact') ? 'contact_section' : 'connect_section' });
      return;
    }

    if (target.matches('a[href^="tel:"]')) {
      track('contact_action', { method: 'phone_link', location: 'contact_section' });
      return;
    }

    if (target.matches('.blog-card')) {
      track('medium_article_click', { article_title: target.querySelector('h3')?.textContent.trim() || 'Recent article' });
      return;
    }

    if (target.matches('.connect-link')) {
      track('professional_profile_click', { platform: target.querySelector('strong')?.textContent.trim() || 'Profile' });
    }
  });

  document.addEventListener('portfolio:contact-handoff', () => {
    track('generate_lead', { method: 'contact_form' });
  });

  if (consent === 'granted') {
    loadAnalytics();
  } else if (consent === null) {
    banner.hidden = false;
  }
})();
