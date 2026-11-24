(function () {
  var THEME_KEY = "totalfreak-site-theme";
  var root = document.documentElement;

  function applyTheme(theme) {
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    var toggle = document.getElementById("themeToggle");
    if (toggle) {
      toggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    }
  }

  function initThemeToggle() {
    var toggle = document.getElementById("themeToggle");
    if (!toggle) return;

    applyTheme(root.classList.contains("dark") ? "dark" : "light");

    toggle.addEventListener("click", function () {
      var nextTheme = root.classList.contains("dark") ? "light" : "dark";
      applyTheme(nextTheme);
      try {
        localStorage.setItem(THEME_KEY, nextTheme);
      } catch (e) {
        // Ignore storage errors in restricted contexts
      }
    });

    if (window.matchMedia) {
      var media = window.matchMedia("(prefers-color-scheme: dark)");
      media.addEventListener("change", function (event) {
        try {
          if (!localStorage.getItem(THEME_KEY)) {
            applyTheme(event.matches ? "dark" : "light");
          }
        } catch (e) {
          applyTheme(event.matches ? "dark" : "light");
        }
      });
    }
  }

  function initTourPreview() {
    var steps = document.querySelectorAll("[data-tour-step]");
    var caption = document.getElementById("tourCaption");
    if (!steps.length || !caption) return;

    steps.forEach(function (step) {
      step.addEventListener("click", function () {
        steps.forEach(function (item) {
          item.classList.remove("is-active");
          item.setAttribute("aria-pressed", "false");
        });
        step.classList.add("is-active");
        step.setAttribute("aria-pressed", "true");
        var text = step.getAttribute("data-caption");
        if (text) {
          caption.textContent = text;
        }
      });
    });
  }

  function initProjectFilters() {
    var buttons = document.querySelectorAll("[data-filter]");
    var cards = document.querySelectorAll("[data-category]");
    if (!buttons.length || !cards.length) return;

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var filter = button.getAttribute("data-filter");

        buttons.forEach(function (btn) {
          var active = btn === button;
          btn.classList.toggle("is-active", active);
          btn.setAttribute("aria-pressed", active ? "true" : "false");
        });

        cards.forEach(function (card) {
          var categories = (card.getAttribute("data-category") || "").split(" ");
          var show = filter === "all" || categories.indexOf(filter) !== -1;
          card.hidden = !show;
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initThemeToggle();
    initTourPreview();
    initProjectFilters();
  });
})();
