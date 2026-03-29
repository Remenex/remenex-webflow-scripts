
(function () {
  const INSTANCES = new Map();

  function parseBool(value, fallback = false) {
    if (value === null || value === undefined || value === '') return fallback;
    return value === 'true' || value === '1' || value === 'yes';
  }

  function parseNum(value, fallback) {
    const n = parseFloat(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function getAttr(el, name, fallback = null) {
    const value = el.getAttribute(name);
    return value === null ? fallback : value;
  }

  function destroyInstance(root) {
    const instance = INSTANCES.get(root);
    if (!instance) return;

    if (instance.cleanupFns && instance.cleanupFns.length) {
      instance.cleanupFns.forEach((fn) => {
        try { fn(); } catch (e) {}
      });
    }

    if (instance.embla) {
      try { instance.embla.destroy(); } catch (e) {}
    }

    if (instance.originalHTML && instance.container) {
      instance.container.innerHTML = instance.originalHTML;
    }

    INSTANCES.delete(root);
    root.removeAttribute('data-remenex-ready');
  }

  function shouldDisableByBreakpoint(root) {
    const disableBelow = parseNum(getAttr(root, 'remenex-breakpoint-disable'), null);
    if (disableBelow === null) return false;
    return window.innerWidth <= disableBelow;
  }

  function shouldReduceMotion(root) {
    const mode = getAttr(root, 'remenex-reduced-motion', 'pause');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return prefersReduced ? mode : false;
  }

  function duplicateSlides(container, duplicateCount, axis = 'x') {
    const originalHTML = container.innerHTML;
    let finalHTML = originalHTML;

    const styles = window.getComputedStyle(container);
    const gap = parseFloat(styles.gap) || 0;

    const spacer = `<div remenex-spacer style="${
      axis === 'y'
        ? `height: ${gap}px;`
        : `width: ${gap}px;`
    } flex: 0 0 auto;"></div>`;

    for (let i = 0; i < duplicateCount; i++) {
      finalHTML += spacer + originalHTML;
    }

    container.innerHTML = finalHTML;
    return originalHTML;
  }

  function buildOptions(root) {
    const direction = getAttr(root, 'remenex-direction', 'horizontal');
    const axis = direction === 'vertical' ? 'y' : 'x';

    return {
      axis,
      loop: parseBool(getAttr(root, 'remenex-loop'), true),
      dragFree: parseBool(getAttr(root, 'remenex-drag-free'), true),
      draggable: parseBool(getAttr(root, 'remenex-drag'), false),
      active: parseBool(getAttr(root, 'remenex-active'), true),
      align: getAttr(root, 'remenex-align', 'start'),
      direction: getAttr(root, 'remenex-dir', 'ltr')
    };
  }

  function buildAutoScrollOptions(root, wrapper) {
    const reverse = parseBool(getAttr(root, 'remenex-reverse'), false);
    const pauseOnInteraction = parseBool(getAttr(root, 'remenex-pause-on-interaction'), true);

    return {
      speed: parseNum(getAttr(root, 'remenex-speed'), 1),
      startDelay: parseNum(getAttr(root, 'remenex-start-delay'), 0),
      direction: reverse ? 'backward' : 'forward',
      defaultInteraction: pauseOnInteraction,
      rootNode: () => wrapper
    };
  }

  function initOne(root) {
    destroyInstance(root);

    const viewport = root.querySelector('[remenex-viewport]');
    const container = root.querySelector('[remenex-container]');
    const slides = root.querySelectorAll('[remenex-slide]');

    if (!viewport || !container || !slides.length) return;

    if (shouldDisableByBreakpoint(root)) return;

    const reducedMotionMode = shouldReduceMotion(root);
    if (reducedMotionMode === 'disable') return;

    const gap = parseNum(getAttr(root, 'remenex-gap'), 48);
    container.style.setProperty('--remenex-gap', gap + 'px');
    container.style.gap = gap + 'px';

    const options = buildOptions(root);
    root.setAttribute('data-remenex-axis', options.axis);

    const duplicateCount = Math.max(0, Math.floor(parseNum(getAttr(root, 'remenex-duplicate'), 1)));
    const originalHTML = duplicateSlides(container, duplicateCount);

    const autoScrollPlugin = EmblaCarouselAutoScroll(
      buildAutoScrollOptions(root, root)
    );

    const embla = EmblaCarousel(viewport, options, [autoScrollPlugin]);

    const cleanupFns = [];

    const pauseOnHover = parseBool(getAttr(root, 'remenex-pause-on-hover'), false);
    if (pauseOnHover) {
      const onEnter = () => embla.plugins().autoScroll?.stop();
      const onLeave = () => {
        if (reducedMotionMode !== 'pause') {
          embla.plugins().autoScroll?.play();
        }
      };

      root.addEventListener('mouseenter', onEnter);
      root.addEventListener('mouseleave', onLeave);

      cleanupFns.push(() => root.removeEventListener('mouseenter', onEnter));
      cleanupFns.push(() => root.removeEventListener('mouseleave', onLeave));
    }

    const stopWhenHidden = () => {
      if (document.hidden) {
        embla.plugins().autoScroll?.stop();
      } else if (reducedMotionMode !== 'pause') {
        embla.plugins().autoScroll?.play();
      }
    };

    document.addEventListener('visibilitychange', stopWhenHidden);
    cleanupFns.push(() => document.removeEventListener('visibilitychange', stopWhenHidden));

    const onResize = () => {
      if (shouldDisableByBreakpoint(root)) {
        destroyInstance(root);
      } else {
        const current = INSTANCES.get(root);
        if (!current) initOne(root);
      }
    };

    window.addEventListener('resize', onResize);
    cleanupFns.push(() => window.removeEventListener('resize', onResize));

    if (reducedMotionMode !== 'pause') {
      embla.plugins().autoScroll?.play();
    }

    root.setAttribute('data-remenex-ready', 'true');

    INSTANCES.set(root, {
      embla,
      container,
      originalHTML,
      cleanupFns
    });
  }

  function initAll() {
    document.querySelectorAll('[remenex-marquee]').forEach(initOne);
  }

  function apiFor(root) {
    const instance = INSTANCES.get(root);
    if (!instance) return null;

    return {
      play(startDelay) {
        instance.embla.plugins().autoScroll?.play(startDelay);
      },
      stop() {
        instance.embla.plugins().autoScroll?.stop();
      },
      reset() {
        instance.embla.plugins().autoScroll?.reset();
      },
      isPlaying() {
        return instance.embla.plugins().autoScroll?.isPlaying() || false;
      },
      reInit() {
        initOne(root);
      },
      destroy() {
        destroyInstance(root);
      },
      embla() {
        return instance.embla;
      }
    };
  }

  window.RemenexMarquee = {
    init: initAll,
    get(selectorOrElement) {
      const root = typeof selectorOrElement === 'string'
        ? document.querySelector(selectorOrElement)
        : selectorOrElement;

      if (!root) return null;
      return apiFor(root);
    },
    destroy(selectorOrElement) {
      const root = typeof selectorOrElement === 'string'
        ? document.querySelector(selectorOrElement)
        : selectorOrElement;

      if (!root) return;
      destroyInstance(root);
    },
    reInit(selectorOrElement) {
      const root = typeof selectorOrElement === 'string'
        ? document.querySelector(selectorOrElement)
        : selectorOrElement;

      if (!root) return;
      initOne(root);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();