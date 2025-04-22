import { useState, useEffect } from "react";
import { storageService } from "@/core/services/StorageService/StorageService";
import SunIcon from "@/shared/icons/SunIcon/SunIcon";
import MoonIcon from "@/shared/icons/MoonIcon/MoonIcon";

const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

const THEME_ATTRIBUTE = "data-bs-theme";

const isDarkTheme = () =>
  document.documentElement.getAttribute(THEME_ATTRIBUTE) === THEMES.DARK;

function Theme() {
  const [isChecked, setIsChecked] = useState(isDarkTheme());

  const toggleTheme = async () => {
    const currentTheme = document.documentElement.getAttribute(THEME_ATTRIBUTE);
    const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;

    document.documentElement.setAttribute(THEME_ATTRIBUTE, newTheme);
    document.body.classList.replace(document.body.classList[0], newTheme);

    setIsChecked(isDarkTheme());

    await storageService.save(storageService.THEME, newTheme);
  };

  useEffect(() => {
    const initialize = async () => {
      const theme =
        (await storageService.get(storageService.THEME)) ?? THEMES.LIGHT;

      document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);

      !document.body.classList.contains(theme) &&
        document.body.classList.add(theme);

      setIsChecked(theme === THEMES.DARK);
    };

    initialize();
  }, []);

  return (
    <div className="d-flex align-items-center gap-1 theme-toggle">
      <SunIcon />

      <div className="d-flex align-items-center justify-content-center form-check form-switch fs-6">
        <label
          htmlFor="toggle-dark"
          className="form-label form-check-label"
        ></label>
        <input
          id="toggle-dark"
          type="checkbox"
          checked={isChecked}
          className="form-check-input cursor-pointer"
          onChange={toggleTheme}
        />
      </div>

      <MoonIcon />
    </div>
  );
}

export default Theme;
