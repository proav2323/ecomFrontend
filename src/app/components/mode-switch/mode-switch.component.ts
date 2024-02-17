import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mode-switch',
  templateUrl: './mode-switch.component.html',
  styleUrls: ['./mode-switch.component.css'],
})
export class ModeSwitchComponent implements OnInit {
  HSThemeAppearance = {
    init() {
      const defaultTheme = 'default';
      let theme = localStorage.getItem('hs_theme') || defaultTheme;

      if (document.querySelector('html')!.classList.contains('dark')) return;
      this.setAppearance(theme);
    },
    _resetStylesOnLoad() {
      const $resetStyles = document.createElement('style');
      $resetStyles.innerText = `*{transition: unset !important;}`;
      $resetStyles.setAttribute('data-hs-appearance-onload-styles', '');
      document.head.appendChild($resetStyles);
      return $resetStyles;
    },
    setAppearance(theme: any, saveInStore = true, dispatchEvent = true) {
      const $resetStylesEl = this._resetStylesOnLoad();

      if (saveInStore) {
        localStorage.setItem('hs_theme', theme);
      }

      if (theme === 'auto') {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'default';
      }

      document.querySelector('html')!.classList.remove('dark');
      document.querySelector('html')!.classList.remove('default');
      document.querySelector('html')!.classList.remove('auto');

      document
        .querySelector('html')!
        .classList.add(this.getOriginalAppearance());

      setTimeout(() => {
        $resetStylesEl.remove();
      });

      if (dispatchEvent) {
        window.dispatchEvent(
          new CustomEvent('on-hs-appearance-change', { detail: theme })
        );
      }
    },
    getAppearance() {
      let theme = this.getOriginalAppearance();
      if (theme === 'auto') {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'default';
      }
      return theme;
    },
    getOriginalAppearance() {
      const defaultTheme = 'default';
      return localStorage.getItem('hs_theme') || defaultTheme;
    },
  };

  ngOnInit(): void {
    this.HSThemeAppearance.init();

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (this.HSThemeAppearance.getOriginalAppearance() === 'auto') {
          this.HSThemeAppearance.setAppearance('auto', false);
        }
      });

    window.addEventListener('load', () => {
      const $clickableThemes = document.querySelectorAll(
        '[data-hs-theme-click-value]'
      );
      const $switchableThemes = document.querySelectorAll(
        '[data-hs-theme-switch]'
      );

      $clickableThemes.forEach(($item: any) => {
        $item.addEventListener('click', () =>
          this.HSThemeAppearance.setAppearance(
            $item.getAttribute('data-hs-theme-click-value'),
            true,
            $item
          )
        );
      });

      $switchableThemes.forEach(($item: any) => {
        $item.addEventListener('change', (e: any) => {
          this.HSThemeAppearance.setAppearance(
            e.target!.checked ? 'dark' : 'default'
          );
        });

        $item.checked = this.HSThemeAppearance.getAppearance() === 'dark';
      });

      window.addEventListener('on-hs-appearance-change', (e: any) => {
        $switchableThemes.forEach(($item: any) => {
          $item.checked = e.detail === 'dark';
        });
      });
    });
  }
}
