/**
 * main.js — Site-wide UX enhancements
 */
(function () {
    'use strict';

    /* ── Smooth scroll for anchor links ── */
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var href = this.getAttribute('href');
                if (href === '#' || href === '#top') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Update URL without page jump
                    if (history.pushState) history.pushState(null, '', href);
                }
            });
        });

        /* ── Navbar toggler (vanilla JS fallback if Bootstrap JS delayed) ── */
        var toggler = document.querySelector('.navbar-toggler');
        if (toggler) {
            toggler.addEventListener('click', function () {
                var target = document.querySelector(this.getAttribute('data-bs-target'));
                if (target) target.classList.toggle('show');
            });
        }

        /* ── Update copyright year in footer automatically ── */
        document.querySelectorAll('.footer').forEach(function (footer) {
            footer.innerHTML = footer.innerHTML.replace(/©\s*\d{4}/, '© ' + new Date().getFullYear());
        });

        /* ── Back-to-top: show/hide on scroll ── */
        var fab = document.querySelector('.telegram-fab');
        if (fab) {
            var lastScroll = 0;
            window.addEventListener('scroll', function () {
                var st = window.pageYOffset || document.documentElement.scrollTop;
                if (st > 600 && st < lastScroll) {
                    fab.style.transform = 'scale(1)';
                } else if (st > 600) {
                    fab.style.transform = 'scale(0.85)';
                } else {
                    fab.style.transform = 'scale(1)';
                }
                lastScroll = st;
            }, { passive: true });
        }

        /* ── Skip-nav focus handler (accessibility) ── */
        var skip = document.getElementById('skip-nav');
        if (skip) {
            skip.addEventListener('focus', function () { this.style.top = '0'; });
            skip.addEventListener('blur', function () { this.style.top = '-100%'; });
        }
    });

    /* ── Service Worker registration ── */
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/sw.js').catch(function () { });
        });
    }
})();
