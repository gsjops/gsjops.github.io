/**
 * 个人网站 - 主脚本（首页）
 */

(function () {
  'use strict';

  /* ---------- 深色模式 ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  themeToggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* ---------- 导航栏滚动效果 ---------- */
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 20);
  });

  /* ---------- 移动端菜单 ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('open');
    navToggle.setAttribute(
      'aria-expanded',
      navMenu?.classList.contains('open') ? 'true' : 'false'
    );
  });

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- 滚动动画 ---------- */
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  fadeElements.forEach((el) => observer.observe(el));

  /* ---------- 返回顶部 ---------- */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backToTop?.classList.toggle('show', window.scrollY > 400);
  });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 当前页面导航高亮 ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();
