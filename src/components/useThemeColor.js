import { useEffect } from 'react';

export const useThemeColor = (color = '#fdfdfd') => {
  useEffect(() => {
    // Проверяем, существует ли уже meta-тег theme-color
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (!metaThemeColor) {
      // Создаём новый meta-тег
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }

    // Устанавливаем цвет
    metaThemeColor.content = color;

    // Также устанавливаем для Apple устройств
    let appleStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');

    if (!appleStatusBar) {
      appleStatusBar = document.createElement('meta');
      appleStatusBar.name = 'apple-mobile-web-app-status-bar-style';
      document.head.appendChild(appleStatusBar);
    }

    appleStatusBar.content = 'default';

  }, [color]);
};
