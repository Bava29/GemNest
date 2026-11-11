/* ======================================
   GEMNEST HEADER JAVASCRIPT
====================================== */

document.addEventListener("DOMContentLoaded", function () {

    const html = document.documentElement;

    // Elements
    const menuToggle = document.getElementById("gem-menu-toggle");
    const mobileMenu = document.getElementById("gem-mobile-menu");

    const homeToggle = document.getElementById("gem-home-toggle");
    const homeSubmenu = document.getElementById("gem-home-submenu");

    const themeButtons = [
        document.getElementById("gem-desktop-theme"),
        document.getElementById("gem-mobile-theme")
    ];

    const rtlButtons = [
        document.getElementById("gem-desktop-rtl"),
        document.getElementById("gem-mobile-rtl")
    ];

    // ==================================
    // MOBILE MENU TOGGLE
    // ==================================

    menuToggle.addEventListener("click", function () {

        mobileMenu.classList.toggle("active");

        const isOpen = mobileMenu.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });


    // ==================================
    // MOBILE HOME DROPDOWN
    // ==================================

    homeToggle.addEventListener("click", function () {

        homeSubmenu.classList.toggle("active");
        homeToggle.classList.toggle("active");

        const isOpen = homeSubmenu.classList.contains("active");

        homeToggle.setAttribute("aria-expanded", isOpen);

    });


    // ==================================
    // DARK MODE
    // ==================================

    function updateTheme() {

        const isDark = html.classList.contains("dark-mode");

        themeButtons.forEach(button => {

            if (button) {

                button.innerHTML = isDark
                    ? '<i class="fa-solid fa-sun"></i>'
                    : '<i class="fa-solid fa-moon"></i>'

            }

        });

    }

    // Restore saved theme
    if (localStorage.getItem("gemnest-theme") === "dark") {
        html.classList.add("dark-mode");
    }

    updateTheme();

    themeButtons.forEach(button => {

        if (button) {

            button.addEventListener("click", function () {

                html.classList.toggle("dark-mode");

                const theme = html.classList.contains("dark-mode")
                    ? "dark"
                    : "light";

                localStorage.setItem("gemnest-theme", theme);

                updateTheme();

            });

        }

    });


    // ==================================
    // RTL MODE
    // ==================================

    function updateRTL() {

        const isRTL = html.getAttribute("dir") === "rtl";

        rtlButtons.forEach(button => {

            if (button) {

                button.innerHTML = isRTL
                    ? '<i class="fa-solid fa-right-left"></i>'
                    : '<i class="fa-solid fa-right-left"></i>'

            }

        });

    }

    // Restore saved direction
    if (localStorage.getItem("gemnest-direction") === "rtl") {
        html.setAttribute("dir", "rtl");
    }

    updateRTL();

    rtlButtons.forEach(button => {

        if (button) {

            button.addEventListener("click", function () {

                const isRTL = html.getAttribute("dir") === "rtl";

                const direction = isRTL ? "ltr" : "rtl";

                html.setAttribute("dir", direction);

                localStorage.setItem("gemnest-direction", direction);

                updateRTL();

            });

        }

    });


    // ==================================
    // CLOSE MOBILE MENU ON LINK CLICK
    // ==================================

    const mobileLinks = mobileMenu.querySelectorAll(
        "a:not(.gem-mobile-home-row > a)"
    );

    mobileLinks.forEach(link => {

        link.addEventListener("click", function () {

            mobileMenu.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        });

    });

});

/* =========================================
   GEMNEST - CUSTOM KIT BUILDER
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const material = document.getElementById("gem-kit-material");
    const charms = document.getElementById("gem-kit-charms");
    const findings = document.getElementById("gem-kit-findings");

    const quantity = document.getElementById("gem-kit-quantity");

    const materialPrice = document.getElementById("gem-kit-material-price");
    const charmPrice = document.getElementById("gem-kit-charm-price");
    const findingPrice = document.getElementById("gem-kit-finding-price");
    const quantityDisplay = document.getElementById("gem-kit-quantity-display");
    const totalDisplay = document.getElementById("gem-kit-total");

    const previewColour = document.getElementById("gem-kit-preview-colour");
    const previewName = document.getElementById("gem-kit-preview-name");

    const minus = document.getElementById("gem-kit-minus");
    const plus = document.getElementById("gem-kit-plus");
    const reset = document.getElementById("gem-kit-reset");

    if (!material || !charms || !findings || !quantity) return;

    const colourData = {
        blush: {
            name: "Blush Collection",
            colour: "#d99ca5"
        },
        ocean: {
            name: "Ocean Collection",
            colour: "#668da6"
        },
        earth: {
            name: "Earth Collection",
            colour: "#a87952"
        },
        lavender: {
            name: "Lavender Collection",
            colour: "#aa92c2"
        }
    };

    const currency = amount =>
        "₹" + amount.toLocaleString("en-IN");

    function updateKitPrice() {

        const basePrice = Number(material.selectedOptions[0].value);
        const charmCost = Number(charms.value);
        const findingCost = Number(findings.value);
        const kitQuantity = Number(quantity.value);

        const singleKitTotal = basePrice + charmCost + findingCost;
        const finalTotal = singleKitTotal * kitQuantity;

        materialPrice.textContent = currency(basePrice);
        charmPrice.textContent = currency(charmCost);
        findingPrice.textContent = currency(findingCost);

        quantityDisplay.textContent = kitQuantity;
        totalDisplay.textContent = currency(finalTotal);

        const selectedColour = document.querySelector(
            'input[name="gem-kit-colour"]:checked'
        );

        if (selectedColour) {

            const colour = colourData[selectedColour.value];

            previewColour.style.background = colour.colour;
            previewName.textContent = colour.name;

        }

    }

    material.addEventListener("change", updateKitPrice);
    charms.addEventListener("change", updateKitPrice);
    findings.addEventListener("change", updateKitPrice);

    document.querySelectorAll('input[name="gem-kit-colour"]')
        .forEach(input => {
            input.addEventListener("change", updateKitPrice);
        });

    plus.addEventListener("click", function () {

        let current = Number(quantity.value);

        if (current < 10) {
            quantity.value = current + 1;
            updateKitPrice();
        }

    });

    minus.addEventListener("click", function () {

        let current = Number(quantity.value);

        if (current > 1) {
            quantity.value = current - 1;
            updateKitPrice();
        }

    });

    reset.addEventListener("click", function () {

        material.value = "gemstone";
        charms.value = "0";
        findings.value = "100";
        quantity.value = 1;

        document.querySelector(
            'input[name="gem-kit-colour"][value="blush"]'
        ).checked = true;

        updateKitPrice();

    });

    updateKitPrice();

});

// ===== ABOUT ACHIEVEMENT COUNTER =====

const achievementCounters = document.querySelectorAll(
    ".gem-achievement-count"
);

const achievementObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = Number(counter.dataset.target);
            const duration = 1800;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                const easedProgress = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.floor(target * easedProgress)
                    .toLocaleString("en-IN");

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString("en-IN");
                }
            }

            requestAnimationFrame(updateCounter);
            observer.unobserve(counter);
        }
    });
}, {
    threshold: 0.5
});

achievementCounters.forEach(counter => {
    achievementObserver.observe(counter);
});

// ===== GEMNEST MATERIAL FILTER SYSTEM =====

document.addEventListener("DOMContentLoaded", function () {

    const grid = document.getElementById("gemMaterialProductGrid");

    if (!grid) return;

    const products = Array.from(
        grid.querySelectorAll(".gem-material-product")
    );

    const searchInput = document.getElementById("gemMaterialSearch");
    const priceInput = document.getElementById("gemMaterialPrice");
    const priceValue = document.getElementById("gemMaterialPriceValue");
    const stockInput = document.getElementById("gemMaterialStock");
    const sortSelect = document.getElementById("gemMaterialSort");
    const countElement = document.getElementById("gemMaterialCount");
    const activeFilters = document.getElementById("gemMaterialActiveFilters");
    const emptyState = document.getElementById("gemMaterialEmpty");

    const materialInputs = document.querySelectorAll(
        'input[name="gemMaterialType"]'
    );

    const colourInputs = document.querySelectorAll(
        'input[name="gemMaterialColour"]'
    );

    function getSelectedValues(inputs) {
        return Array.from(inputs)
            .filter(input => input.checked)
            .map(input => input.value);
    }

    function renderActiveFilters() {
        activeFilters.innerHTML = "";

        const filters = [];

        getSelectedValues(materialInputs).forEach(value => {
            filters.push({ label: value, type: "material", value });
        });

        getSelectedValues(colourInputs).forEach(value => {
            filters.push({ label: value, type: "colour", value });
        });

        if (searchInput.value.trim()) {
            filters.push({
                label: `Search: ${searchInput.value.trim()}`,
                type: "search"
            });
        }

        if (Number(priceInput.value) < 2000) {
            filters.push({
                label: `Up to ₹${Number(priceInput.value).toLocaleString("en-IN")}`,
                type: "price"
            });
        }

        if (stockInput.checked) {
            filters.push({ label: "In Stock", type: "stock" });
        }

        filters.forEach(filter => {
            const chip = document.createElement("span");
            chip.className = "gem-material-filter-chip";

            const label = document.createElement("span");
            label.textContent = filter.label;

            const remove = document.createElement("button");
            remove.type = "button";
            remove.innerHTML = "&times;";
            remove.setAttribute("aria-label", `Remove ${filter.label} filter`);

            remove.addEventListener("click", function () {
                if (filter.type === "material") {
                    materialInputs.forEach(input => {
                        if (input.value === filter.value) input.checked = false;
                    });
                }

                if (filter.type === "colour") {
                    colourInputs.forEach(input => {
                        if (input.value === filter.value) input.checked = false;
                    });
                }

                if (filter.type === "search") searchInput.value = "";
                if (filter.type === "price") priceInput.value = 2000;
                if (filter.type === "stock") stockInput.checked = false;

                priceValue.textContent =
                    `₹${Number(priceInput.value).toLocaleString("en-IN")}`;

                applyMaterialFilters();
            });

            chip.append(label, remove);
            activeFilters.appendChild(chip);
        });
    }

    function applyMaterialFilters() {

        const selectedMaterials = getSelectedValues(materialInputs);
        const selectedColours = getSelectedValues(colourInputs);
        const searchTerm = searchInput.value.trim().toLowerCase();
        const maxPrice = Number(priceInput.value);
        const inStockOnly = stockInput.checked;

        let visibleProducts = [];

        products.forEach(product => {

            const name = product.dataset.name.toLowerCase();
            const material = product.dataset.material;
            const colour = product.dataset.colour;
            const price = Number(product.dataset.price);
            const inStock = product.dataset.stock === "yes";

            const matchesMaterial =
                selectedMaterials.length === 0 ||
                selectedMaterials.includes(material);

            const matchesColour =
                selectedColours.length === 0 ||
                selectedColours.includes(colour);

            const matchesSearch =
                name.includes(searchTerm) ||
                material.toLowerCase().includes(searchTerm) ||
                colour.toLowerCase().includes(searchTerm);

            const matchesPrice = price <= maxPrice;

            const matchesStock = !inStockOnly || inStock;

            const isVisible =
                matchesMaterial &&
                matchesColour &&
                matchesSearch &&
                matchesPrice &&
                matchesStock;

            product.hidden = !isVisible;

            if (isVisible) {
                visibleProducts.push(product);
            }
        });

        // Sorting
        const sortValue = sortSelect.value;

        visibleProducts.sort((a, b) => {
            if (sortValue === "low") {
                return Number(a.dataset.price) - Number(b.dataset.price);
            }

            if (sortValue === "high") {
                return Number(b.dataset.price) - Number(a.dataset.price);
            }

            if (sortValue === "name") {
                return a.dataset.name.localeCompare(b.dataset.name);
            }

            return products.indexOf(a) - products.indexOf(b);
        });

        visibleProducts.forEach(product => grid.appendChild(product));

        countElement.textContent = visibleProducts.length;
        emptyState.hidden = visibleProducts.length !== 0;
        grid.hidden = visibleProducts.length === 0;

        renderActiveFilters();
    }

    function clearMaterialFilters() {
        materialInputs.forEach(input => input.checked = false);
        colourInputs.forEach(input => input.checked = false);

        searchInput.value = "";
        priceInput.value = 2000;
        stockInput.checked = false;
        sortSelect.value = "featured";

        priceValue.textContent = "₹2,000";

        applyMaterialFilters();
    }

    // Search
    searchInput.addEventListener("input", applyMaterialFilters);

    // Material filters
    materialInputs.forEach(input => {
        input.addEventListener("change", applyMaterialFilters);
    });

    // Colour filters
    colourInputs.forEach(input => {
        input.addEventListener("change", applyMaterialFilters);
    });

    // Price range
    priceInput.addEventListener("input", function () {
        priceValue.textContent =
            `₹${Number(priceInput.value).toLocaleString("en-IN")}`;

        applyMaterialFilters();
    });

    // Availability
    stockInput.addEventListener("change", applyMaterialFilters);

    // Sorting
    sortSelect.addEventListener("change", applyMaterialFilters);

    // Clear buttons
    document.getElementById("gemMaterialClear")
        .addEventListener("click", clearMaterialFilters);

    document.getElementById("gemMaterialApply")
        .addEventListener("click", applyMaterialFilters);

    document.getElementById("gemMaterialEmptyClear")
        .addEventListener("click", clearMaterialFilters);

    // Wishlist Toggle
    document.querySelectorAll(".gem-material-wishlist")
        .forEach(button => {
            button.addEventListener("click", function () {
                this.classList.toggle("active");

                const icon = this.querySelector("i");

                if (this.classList.contains("active")) {
                    icon.classList.remove("fa-regular");
                    icon.classList.add("fa-solid");
                } else {
                    icon.classList.remove("fa-solid");
                    icon.classList.add("fa-regular");
                }
            });
        });

    applyMaterialFilters();
});

/* =====================================
   GEMNEST - ALL PRODUCTS FILTER
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const grid = document.getElementById("gemCatalogueGrid");

    if (!grid) return;

    const cards = Array.from(
        grid.querySelectorAll(".gem-catalogue-card")
    );

    const searchInput = document.getElementById("gemProductSearch");
    const categoryFilter = document.getElementById("gemCategoryFilter");
    const colourFilter = document.getElementById("gemColourFilter");
    const sortFilter = document.getElementById("gemSortFilter");

    const countElement = document.getElementById("gemProductCount");
    const activeFilters = document.getElementById("gemActiveFilters");
    const clearButton = document.getElementById("gemClearFilters");
    const emptyClearButton = document.getElementById("gemMaterialEmptyClear");

    const emptyState = document.getElementById("gemCatalogueEmpty");
    const pagination = document.getElementById("gemPagination");

    const prevButton = document.getElementById("gemPrevPage");
    const nextButton = document.getElementById("gemNextPage");
    const pageNumbers = document.getElementById("gemPageNumbers");

    const productsPerPage = 100;

    let currentPage = 1;
    let filteredProducts = [...cards];

    // Category names
    const categoryNames = {
        all: "All Categories",
        beads: "Beads & Spacers",
        charms: "Charms & Pendants",
        chains: "Chains & Cords",
        findings: "Jewellery Findings",
        tools: "Tools & Accessories",
        kits: "DIY Jewellery Kits"
    };

    // Filter Products
    function filterProducts() {

        const searchValue = searchInput.value.toLowerCase().trim();
        const categoryValue = categoryFilter.value;
        const colourValue = colourFilter.value;

        filteredProducts = cards.filter(card => {

            const name = card.dataset.name.toLowerCase();
            const category = card.dataset.category;
            const colour = card.dataset.colour;

            const matchesSearch = name.includes(searchValue);

            const matchesCategory =
                categoryValue === "all" ||
                category === categoryValue;

            const matchesColour =
                colourValue === "all" ||
                colour === colourValue;

            return matchesSearch &&
                matchesCategory &&
                matchesColour;
        });

        // Sorting
        if (sortFilter.value === "low-high") {

            filteredProducts.sort((a, b) =>
                Number(a.dataset.price) - Number(b.dataset.price)
            );

        } else if (sortFilter.value === "high-low") {

            filteredProducts.sort((a, b) =>
                Number(b.dataset.price) - Number(a.dataset.price)
            );

        } else if (sortFilter.value === "name") {

            filteredProducts.sort((a, b) =>
                a.dataset.name.localeCompare(b.dataset.name)
            );

        } else {

            filteredProducts.sort((a, b) =>
                cards.indexOf(a) - cards.indexOf(b)
            );
        }

        currentPage = 1;
        renderProducts();
        updateActiveFilters();
    }

    // Display Products
    function renderProducts() {

        grid.innerHTML = "";

        const totalProducts = filteredProducts.length;
        const totalPages = Math.ceil(totalProducts / productsPerPage);

        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;

        const currentProducts = filteredProducts.slice(
            startIndex,
            endIndex
        );

        currentProducts.forEach(card => {
            grid.appendChild(card);
        });

        countElement.textContent = totalProducts;

        if (totalProducts === 0) {

            emptyState.classList.add("show");
            grid.style.display = "none";
            pagination.style.display = "none";

        } else {

            emptyState.classList.remove("show");
            grid.style.display = "grid";

            pagination.style.display =
                totalPages > 1 ? "flex" : "none";
        }

        renderPagination(totalPages);
    }

    // Pagination
    function renderPagination(totalPages) {

        pageNumbers.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {

            const button = document.createElement("button");

            button.type = "button";
            button.textContent = i;

            if (i === currentPage) {
                button.classList.add("active");
            }

            button.addEventListener("click", function () {

                currentPage = i;
                renderProducts();

            });

            pageNumbers.appendChild(button);
        }

        prevButton.disabled = currentPage === 1;
        nextButton.disabled =
            currentPage === totalPages || totalPages === 0;
    }

    prevButton.addEventListener("click", function () {

        if (currentPage > 1) {
            currentPage--;
            renderProducts();
        }

    });

    nextButton.addEventListener("click", function () {

        const totalPages = Math.ceil(
            filteredProducts.length / productsPerPage
        );

        if (currentPage < totalPages) {
            currentPage++;
            renderProducts();
        }

    });

    // Active Filter Display
    function updateActiveFilters() {

        const chips = [];

        if (categoryFilter.value !== "all") {
            chips.push(categoryNames[categoryFilter.value]);
        }

        if (colourFilter.value !== "all") {
            chips.push(
                colourFilter.options[colourFilter.selectedIndex].text
            );
        }

        if (searchInput.value.trim() !== "") {
            chips.push("Search: " + searchInput.value.trim());
        }

        if (chips.length === 0) {

            activeFilters.innerHTML =
                "<span>Showing all categories</span>";

        } else {

            activeFilters.innerHTML = chips.map(item =>
                `<span class="gem-filter-chip">${item}</span>`
            ).join("");

        }
    }

    // Clear Filters
    function clearFilters() {

        searchInput.value = "";
        categoryFilter.value = "all";
        colourFilter.value = "all";
        sortFilter.value = "featured";

        currentPage = 1;
        filterProducts();
    }

    clearButton.addEventListener("click", clearFilters);
    emptyClearButton.addEventListener("click", clearFilters);

    // Filter Events
    searchInput.addEventListener("input", filterProducts);
    categoryFilter.addEventListener("change", filterProducts);
    colourFilter.addEventListener("change", filterProducts);
    sortFilter.addEventListener("change", filterProducts);

    // Wishlist
    grid.addEventListener("click", function (event) {

        const wishlistButton = event.target.closest(".gem-wishlist");

        if (wishlistButton) {

            wishlistButton.classList.toggle("active");

            const icon = wishlistButton.querySelector("i");

            if (wishlistButton.classList.contains("active")) {
                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");
            } else {
                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");
            }
        }

    });

    // Add to Cart Demo Feedback
    grid.addEventListener("click", function (event) {

        const cartButton = event.target.closest(".gem-add-cart");

        if (!cartButton) return;

        const originalText = cartButton.innerHTML;

        cartButton.innerHTML =
            'Added <i class="fa-solid fa-check"></i>';

        cartButton.classList.add("added");

        setTimeout(function () {

            cartButton.innerHTML = originalText;
            cartButton.classList.remove("added");

        }, 1500);

    });

    // Initial Display: ALL categories
    categoryFilter.value = "all";
    filterProducts();

});

/* =========================================
   GEMNEST CUSTOM KIT BUILDER
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const builder = document.querySelector(".gem-kit-builder-section");

    if (!builder) return;

    const kitType = builder.querySelectorAll('input[name="kitType"]');
    const kitColour = builder.querySelectorAll('input[name="kitColour"]');
    const kitMaterials = builder.querySelectorAll('input[name="kitMaterial"]');
    const kitCharms = builder.querySelectorAll('input[name="kitCharm"]');
    const kitTools = builder.querySelectorAll('input[name="kitTool"]');

    const typeOutput = builder.querySelector("#gemKitType");
    const colourOutput = builder.querySelector("#gemKitColour");
    const itemsOutput = builder.querySelector("#gemKitItems");
    const totalOutput = builder.querySelector("#gemKitTotal");

    const buildButton = builder.querySelector("#gemKitBuildButton");
    const resetButton = builder.querySelector("#gemKitResetButton");

    function updateKitSummary() {

        let total = 0;
        let selectedItems = [];

        const selectedType = builder.querySelector(
            'input[name="kitType"]:checked'
        );

        const selectedColour = builder.querySelector(
            'input[name="kitColour"]:checked'
        );

        if (selectedType) {
            typeOutput.textContent = selectedType.value;
            total += Number(selectedType.dataset.price || 0);
        }

        if (selectedColour) {
            colourOutput.textContent = selectedColour.value;
        }

        const selectedOptions = [
            ...kitMaterials,
            ...kitCharms,
            ...kitTools
        ];

        selectedOptions.forEach(function (item) {
            if (item.checked) {
                selectedItems.push(item.value);
                total += Number(item.dataset.price || 0);
            }
        });

        itemsOutput.innerHTML = "";

        if (selectedItems.length === 0) {
            const emptyItem = document.createElement("li");
            emptyItem.textContent = "No additional items selected";
            itemsOutput.appendChild(emptyItem);
        } else {
            selectedItems.forEach(function (item) {
                const li = document.createElement("li");
                li.textContent = item;
                itemsOutput.appendChild(li);
            });
        }

        totalOutput.textContent = "₹" + total.toLocaleString("en-IN");
    }

    builder.querySelectorAll("input").forEach(function (input) {
        input.addEventListener("change", updateKitSummary);
    });

    resetButton.addEventListener("click", function () {

        builder.querySelector('input[name="kitType"][value="Bracelet Kit"]').checked = true;
        builder.querySelector('input[name="kitColour"][value="Pastel Dreams"]').checked = true;

        [...kitMaterials, ...kitCharms, ...kitTools].forEach(function (item) {
            item.checked = false;
        });

        builder.querySelector('input[name="kitMaterial"][value="Glass Beads"]').checked = true;

        updateKitSummary();
    });

    buildButton.addEventListener("click", function () {

        const selectedType = builder.querySelector(
            'input[name="kitType"]:checked'
        );

        const selectedColour = builder.querySelector(
            'input[name="kitColour"]:checked'
        );

        const selectedItems = [
            ...kitMaterials,
            ...kitCharms,
            ...kitTools
        ]
            .filter(item => item.checked)
            .map(item => item.value);

        const total = totalOutput.textContent;

        const kitDetails = [
            "My Custom GemNest Kit",
            "Jewellery Type: " + selectedType.value,
            "Colour Palette: " + selectedColour.value,
            "Selected Items: " + (selectedItems.length ? selectedItems.join(", ") : "None"),
            "Estimated Total: " + total
        ].join("\n");

        alert(kitDetails);
    });

    updateKitSummary();

});