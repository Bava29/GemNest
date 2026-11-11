document.addEventListener("DOMContentLoaded", () => {
    const html = document.documentElement;
    const themeButtons = document.querySelectorAll("[data-gem-auth-theme]");
    const rtlButtons = document.querySelectorAll("[data-gem-auth-rtl]");
    const feedback = document.getElementById("gem-auth-feedback");
    const form = document.getElementById("gem-auth-form");
    const password = document.getElementById("gem-auth-password");
    const confirmPassword = document.getElementById("gem-auth-confirm-password");

    function updateThemeControls() {
        const isDark = html.classList.contains("dark-mode");
        const logo = document.querySelector(".gem-auth-logo img");
        const logoSource = isDark ? "images/logo-white.png" : "images/logo.png";
        if (logo && !logo.src.endsWith(logoSource)) logo.src = logoSource;

        themeButtons.forEach(button => {
            const icon = button.querySelector("i");
            const label = button.querySelector("span");
            if (icon) icon.className = `fa-solid ${isDark ? "fa-sun" : "fa-moon"}`;
            if (label) label.textContent = isDark ? "Light Mode" : "Dark Mode";
            button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
        });
    }

    function updateDirectionControls() {
        const isRtl = html.getAttribute("dir") === "rtl";
        rtlButtons.forEach(button => {
            const label = button.querySelector("span");
            if (label) label.textContent = isRtl ? "LTR Mode" : "RTL Mode";
            button.setAttribute("aria-label", isRtl ? "Switch to left-to-right layout" : "Switch to right-to-left layout");
        });
    }

    if (localStorage.getItem("gemnest-theme") === "dark") {
        html.classList.add("dark-mode");
    }
    html.setAttribute("dir", localStorage.getItem("gemnest-direction") || "ltr");
    updateThemeControls();
    updateDirectionControls();

    themeButtons.forEach(button => button.addEventListener("click", () => {
        html.classList.toggle("dark-mode");
        localStorage.setItem("gemnest-theme", html.classList.contains("dark-mode") ? "dark" : "light");
        updateThemeControls();
    }));

    rtlButtons.forEach(button => button.addEventListener("click", () => {
        const nextDirection = html.getAttribute("dir") === "rtl" ? "ltr" : "rtl";
        html.setAttribute("dir", nextDirection);
        localStorage.setItem("gemnest-direction", nextDirection);
        updateDirectionControls();
    }));

    document.querySelectorAll("[data-gem-auth-password]").forEach(button => {
        button.addEventListener("click", () => {
            const input = document.getElementById(button.dataset.gemAuthPassword);
            if (!input) return;
            const showPassword = input.type === "password";
            input.type = showPassword ? "text" : "password";
            button.setAttribute("aria-pressed", String(showPassword));
            button.setAttribute("aria-label", showPassword ? "Hide password" : "Show password");
            const icon = button.querySelector("i");
            if (icon) icon.className = `fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`;
        });
    });

    function validatePasswordMatch() {
        if (!password || !confirmPassword) return;
        confirmPassword.setCustomValidity(
            confirmPassword.value && password.value !== confirmPassword.value
                ? "Passwords do not match."
                : ""
        );
    }

    if (password && confirmPassword) {
        password.addEventListener("input", validatePasswordMatch);
        confirmPassword.addEventListener("input", validatePasswordMatch);
    }

    if (form) {
        form.addEventListener("submit", event => {
            event.preventDefault();
            validatePasswordMatch();
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            if (feedback) {
                feedback.textContent = confirmPassword
                    ? "Your details are valid. Account creation is not connected yet."
                    : "Your details are valid. Sign-in is not connected yet.";
            }
        });
    }

    document.querySelectorAll("[data-gem-auth-social]").forEach(button => {
        button.addEventListener("click", () => {
            if (feedback) feedback.textContent = `${button.dataset.gemAuthSocial} sign-in is not connected yet.`;
        });
    });

    document.querySelectorAll("[data-gem-auth-forgot]").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            if (feedback) feedback.textContent = "Password recovery is not connected yet.";
        });
    });

    document.querySelectorAll("[data-gem-auth-info]").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            if (feedback) feedback.textContent = `${link.dataset.gemAuthInfo} information is not available yet.`;
        });
    });
});
