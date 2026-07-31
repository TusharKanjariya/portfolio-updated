const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const header = document.querySelector('[data-header]');
const main = document.querySelector('main');
const footer = document.querySelector('.site-footer');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const progress = document.createElement('div');
progress.className = 'scroll-progress';
progress.setAttribute('aria-hidden', 'true');
document.body.append(progress);

function setMenu(open, { restoreFocus = true } = {}) {
  if (open) header.classList.remove('hidden');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mobileMenu.setAttribute('aria-hidden', String(!open));
  mobileMenu.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  main.inert = open;
  footer.inert = open;

  if (open) {
    window.setTimeout(() => mobileMenu.querySelector('a')?.focus(), 50);
  } else if (restoreFocus) {
    menuButton.focus();
  }
}

menuButton.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

const focusDestination = (hash) => {
  if (!hash?.startsWith('#')) return;
  const target = document.getElementById(decodeURIComponent(hash.slice(1)));
  const focusTarget = target?.querySelector('h1, h2, h3') || target;
  if (!focusTarget) return;
  const hadTabIndex = focusTarget.hasAttribute('tabindex');
  if (!hadTabIndex) focusTarget.setAttribute('tabindex', '-1');
  focusTarget.focus({ preventScroll: true });
  if (!hadTabIndex) {
    focusTarget.addEventListener('blur', () => focusTarget.removeAttribute('tabindex'), { once: true });
  }
};

mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    setMenu(false, { restoreFocus: false });
    requestAnimationFrame(() => focusDestination(link.hash));
  });
});

document.addEventListener('keydown', (event) => {
  const menuIsOpen = menuButton.getAttribute('aria-expanded') === 'true';
  if (event.key === 'Escape' && menuIsOpen) {
    setMenu(false);
  }
  if (event.key === 'Tab' && menuIsOpen) {
    const focusable = [menuButton, ...mobileMenu.querySelectorAll('a')];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

const desktopQuery = window.matchMedia('(min-width: 901px)');
const handleDesktopChange = (event) => {
  if (event.matches && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false, { restoreFocus: false });
  }
};

if (desktopQuery.addEventListener) {
  desktopQuery.addEventListener('change', handleDesktopChange);
} else {
  desktopQuery.addListener(handleDesktopChange);
}

let lastScrollY = window.scrollY;
let scrollFramePending = false;
let scrollRange = 1;
const updateScrollRange = () => {
  scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
};
const updateScrollState = () => {
  const current = window.scrollY;
  progress.style.transform = `scaleX(${Math.min(1, current / scrollRange)})`;
  header.classList.toggle('scrolled', current > 16);
  header.classList.toggle('hidden', current > lastScrollY && current > 180 && !document.body.classList.contains('menu-open'));
  lastScrollY = current;
  scrollFramePending = false;
};
updateScrollRange();
window.addEventListener('resize', updateScrollRange, { passive: true });
if ('ResizeObserver' in window) {
  new ResizeObserver(updateScrollRange).observe(document.body);
}
window.addEventListener('scroll', () => {
  if (scrollFramePending) return;
  scrollFramePending = true;
  requestAnimationFrame(updateScrollState);
}, { passive: true });
window.addEventListener('load', () => requestAnimationFrame(updateScrollState), { once: true });
window.addEventListener('hashchange', () => requestAnimationFrame(updateScrollState));

const reveals = document.querySelectorAll('.reveal');
document.querySelectorAll('.timeline, .credentials-grid, .skill-columns, .blog-grid, .connect-grid, .archive-grid').forEach((group) => {
  Array.from(group.children).forEach((element, index) => {
    if (element.classList.contains('reveal')) {
      element.style.setProperty('--delay', `${Math.min(index * 45, 270)}ms`);
    }
  });
});
if (reduceMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((element) => element.classList.add('in-view'));
} else {
  reveals.forEach((element) => {
    const bounds = element.getBoundingClientRect();
    if (bounds.top < window.innerHeight * 0.94 && bounds.bottom > 0) {
      element.classList.add('in-view');
    }
  });
  document.documentElement.classList.add('motion-ready', 'hero-ready');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  reveals.forEach((element) => {
    if (!element.classList.contains('in-view')) {
      revealObserver.observe(element);
    }
  });
}

if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const bindPointerMotion = (element, update, reset) => {
    let bounds;
    let pointer;
    let frame = 0;

    element.addEventListener('pointerenter', () => {
      bounds = element.getBoundingClientRect();
    });
    element.addEventListener('pointermove', (event) => {
      pointer = { x: event.clientX, y: event.clientY };
      if (frame || !bounds) return;
      frame = requestAnimationFrame(() => {
        update(bounds, pointer);
        frame = 0;
      });
    });
    element.addEventListener('pointerleave', () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      bounds = undefined;
      reset();
    });
  };

  document.querySelectorAll('.button').forEach((button) => {
    bindPointerMotion(button, (bounds, pointer) => {
      button.style.setProperty('--mx', `${(pointer.x - bounds.left - bounds.width / 2) * 0.16}px`);
      button.style.setProperty('--my', `${(pointer.y - bounds.top - bounds.height / 2) * 0.22}px`);
    }, () => {
      button.style.setProperty('--mx', '0px');
      button.style.setProperty('--my', '0px');
    });
  });

}

const copyText = async (value) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const helper = document.createElement('textarea');
  helper.value = value;
  helper.setAttribute('readonly', '');
  helper.style.cssText = 'position:fixed;left:-9999px;opacity:0;pointer-events:none';
  document.body.appendChild(helper);
  helper.select();
  const copied = document.execCommand('copy');
  helper.remove();
  if (!copied) throw new Error('Copy unavailable');
};

const contactForm = document.querySelector('[data-contact-form]');
if (contactForm) {
  const fields = [...contactForm.querySelectorAll('input, textarea')];
  const submitButton = contactForm.querySelector('[data-submit-button]');
  const submitLabel = contactForm.querySelector('[data-submit-label]');
  const formStatus = contactForm.querySelector('[data-form-status]');
  const formRecovery = contactForm.querySelector('[data-form-recovery]');
  const copyEnquiryButton = contactForm.querySelector('[data-copy-enquiry]');
  const enquiryCopyLabel = contactForm.querySelector('[data-enquiry-copy-label]');
  const enquiryCopyIcon = contactForm.querySelector('[data-enquiry-copy-icon]');
  let formOpening = false;
  let formResetTimer;
  let enquiryResetTimer;
  let lastEnquiry = '';

  contactForm.noValidate = true;

  const fieldMessage = (field) => {
    const value = field.value.trim();
    if (!value) return field.name === 'message' ? 'Add a short project description.' : `Enter your ${field.name}.`;
    if (field.name === 'email' && field.validity.typeMismatch) return 'Enter a complete email address, such as you@company.com.';
    if (field.name === 'message' && value.length < 10) return 'Please add at least 10 characters.';
    if (field.validity.tooLong) return `Keep this under ${field.maxLength} characters.`;
    return '';
  };

  const validateField = (field) => {
    const message = fieldMessage(field);
    const error = contactForm.querySelector(`[data-field-error="${field.name}"]`);
    field.setAttribute('aria-invalid', String(Boolean(message)));
    if (error) error.textContent = message;
    return !message;
  };

  fields.forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validateField(field);
      if (lastEnquiry) {
        lastEnquiry = '';
        formRecovery.hidden = true;
        formStatus.textContent = '';
        window.clearTimeout(enquiryResetTimer);
        copyEnquiryButton.classList.remove('is-copied');
        enquiryCopyLabel.textContent = 'Copy ready message';
        enquiryCopyIcon.textContent = '⧉';
      }
    });
  });

  const resetFormAction = () => {
    window.clearTimeout(formResetTimer);
    formOpening = false;
    submitButton.disabled = false;
    submitLabel.textContent = 'Start a conversation';
  };

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (formOpening) return;

    const invalidFields = fields.filter((field) => !validateField(field));
    const firstInvalid = invalidFields[0];
    if (firstInvalid) {
      formStatus.textContent = 'Please check the highlighted field.';
      firstInvalid.focus();
      return;
    }

    const data = new FormData(contactForm);
    const name = String(data.get('name')).trim();
    const email = String(data.get('email')).trim();
    const message = String(data.get('message')).trim();
    const subjectText = `Portfolio enquiry from ${name}`;
    const subject = encodeURIComponent(subjectText);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    lastEnquiry = `To: Tushar Kanjariya <tusharkanjariya2014@gmail.com>\nSubject: ${subjectText}\n\nName: ${name}\nEmail: ${email}\n\n${message}`;

    document.dispatchEvent(new CustomEvent('portfolio:contact-handoff'));

    formOpening = true;
    formRecovery.hidden = true;
    submitButton.disabled = true;
    submitLabel.textContent = 'Opening email app…';
    formStatus.textContent = 'Preparing your ready-to-send message.';
    requestAnimationFrame(() => {
      window.location.href = `mailto:tusharkanjariya2014@gmail.com?subject=${subject}&body=${body}`;
    });
    formResetTimer = window.setTimeout(() => {
      resetFormAction();
      formStatus.textContent = 'If nothing opened, use the ready-message fallback below.';
      formRecovery.hidden = false;
    }, 1800);
  });

  copyEnquiryButton.addEventListener('click', async () => {
    if (!lastEnquiry || copyEnquiryButton.getAttribute('aria-busy') === 'true') return;
    window.clearTimeout(enquiryResetTimer);
    copyEnquiryButton.setAttribute('aria-busy', 'true');
    try {
      await copyText(lastEnquiry);
      copyEnquiryButton.focus({ preventScroll: true });
      copyEnquiryButton.classList.add('is-copied');
      enquiryCopyLabel.textContent = 'Message copied';
      enquiryCopyIcon.textContent = '✓';
      formStatus.textContent = 'Ready-to-send enquiry copied. Paste it into any email service.';
      enquiryResetTimer = window.setTimeout(() => {
        copyEnquiryButton.classList.remove('is-copied');
        enquiryCopyLabel.textContent = 'Copy ready message';
        enquiryCopyIcon.textContent = '⧉';
      }, 1800);
    } catch {
      formStatus.textContent = 'Copying is unavailable. Select the email address above or call directly.';
      copyEnquiryButton.focus();
    } finally {
      copyEnquiryButton.removeAttribute('aria-busy');
    }
  });

  window.addEventListener('pageshow', resetFormAction);
}

const localTime = document.querySelector('[data-local-time]');
if (localTime) {
  try {
    const formatter = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    const updateLocalTime = () => {
      const now = new Date();
      localTime.textContent = `IST ${formatter.format(now)}`;
      localTime.dateTime = now.toISOString();
    };
    updateLocalTime();
    window.setInterval(updateLocalTime, 60000);
  } catch {
    localTime.textContent = 'IST';
  }
}

document.querySelectorAll('[data-copy-contact]').forEach((copyButton) => {
  const copyLabel = copyButton.querySelector('[data-copy-label]');
  const copyIcon = copyButton.querySelector('[data-copy-icon]');
  const copyStatus = document.getElementById(copyButton.dataset.copyStatusId);
  const defaultLabel = copyLabel.textContent;
  let resetCopyState;
  let copying = false;

  copyButton.addEventListener('click', async () => {
    if (copying) return;
    copying = true;
    copyButton.setAttribute('aria-busy', 'true');
    window.clearTimeout(resetCopyState);
    try {
      await copyText(copyButton.dataset.copyValue);
      copyButton.focus({ preventScroll: true });
      copyButton.classList.add('is-copied');
      copyLabel.textContent = 'Copied';
      copyIcon.textContent = '✓';
      copyStatus.textContent = copyButton.dataset.copySuccess;
      resetCopyState = window.setTimeout(() => {
        copyButton.classList.remove('is-copied');
        copyLabel.textContent = defaultLabel;
        copyIcon.textContent = '⧉';
      }, 1800);
    } catch {
      copyStatus.textContent = copyButton.dataset.copyFailure;
      copyButton.focus();
    } finally {
      copying = false;
      copyButton.removeAttribute('aria-busy');
    }
  });
});

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
