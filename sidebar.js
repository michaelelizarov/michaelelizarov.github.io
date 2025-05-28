// sidebar.js
'use strict';

// Ensure we use the same storage keys as app-global.js
const STORAGE_KEYS = { LANGUAGE: 'preferredLang', THEME: 'theme', USER_TYPE: 'currentUserType' };

/**
 * Localization helper function
 * Retrieves translated string by key
 * @param {string} key - Translation key
 * @param {Object} replacements - Optional replacement values
 * @param {string} langParam - Optional language override
 * @returns {string} - Translated string
 */
function getLocalizedString(key, replacements = {}, langParam = null) {
    // Use global translation function if available
    if (typeof window.getTranslatedStringGlobal === 'function') {
        return window.getTranslatedStringGlobal(key, replacements, langParam);
    }
    
    // Fallback: try to get from local translations
    const lang = langParam || document.documentElement.lang || 'he';
    if (window.translations && window.translations[lang] && window.translations[lang][key]) {
        return window.translations[lang][key];
    }
    
    // If still no translation found, return the key as-is for better UX
    return key;
}

/**
 * Sidebar component class
 * Handles sidebar initialization, state management, and event handling
 */
class Sidebar {
    /**
     * Create a sidebar instance
     * @param {Object} config - Configuration options
     */
    constructor(config = {}) {
        this.config = Object.assign({
            sidebarId: 'main-sidebar',
            collapsedClass: 'collapsed',
            mobileOpenClass: 'sidebar-mobile-open',
            collapseToggleId: 'sidebar-collapse-toggle',
            mobileToggleId: 'mobile-sidebar-toggle',
            storageKey: 'sidebarState',
            breakpoint: 768 // Mobile breakpoint in pixels
        }, config);
        
        // Start with sidebar collapsed by default
        this.isCollapsed = true;
        this.isMobileOpen = false;
        
        // Initialize after DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }
    
    /**
     * Initialize sidebar
     */
    init() {
        // Get DOM elements
        this.sidebar = document.getElementById(this.config.sidebarId);
        this.collapseToggle = document.getElementById(this.config.collapseToggleId);
        this.mobileToggle = document.getElementById(this.config.mobileToggleId);
        
        if (!this.sidebar) {
            console.warn('Sidebar element not found');
            return;
        }
        
        // Always start collapsed
        this.isCollapsed = true;
        
        // Apply initial state
        this.updateSidebarState();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Check responsive mode
            this.checkResponsiveMode();
        
        // Add resize listener for responsive behavior
        window.addEventListener('resize', () => this.checkResponsiveMode());
    }
    
    /**
     * Check and update responsive behavior
     */
    checkResponsiveMode() {
        const isMobileView = window.innerWidth < this.config.breakpoint;
        
        // In mobile view, force expanded sidebar but hide by default
        if (isMobileView) {
            // Remove collapsed class if in mobile view
            if (this.sidebar.classList.contains(this.config.collapsedClass)) {
                this.sidebar.classList.remove(this.config.collapsedClass);
            }
            
            // Show/hide mobile toggle button
            if (this.mobileToggle) {
                this.mobileToggle.style.display = 'flex';
            }
            
            // Hide collapse toggle in mobile view
            if (this.collapseToggle) {
                this.collapseToggle.style.display = 'none';
            }
        } else {
            // Apply collapsed state in desktop view
            this.updateSidebarState();
            
            // Hide mobile toggle in desktop view
            if (this.mobileToggle) {
                this.mobileToggle.style.display = 'none';
            }
            
            // Hide collapse toggle in desktop view (no expansion)
            if (this.collapseToggle) {
                this.collapseToggle.style.display = 'none';
            }
            
            // Close mobile sidebar if open
            if (this.isMobileOpen) {
                this.isMobileOpen = false;
                document.body.classList.remove(this.config.mobileOpenClass);
            }
        }
    }
    
    /**
     * Update sidebar state based on current collapsed state
     */
    updateSidebarState() {
        if (this.sidebar) {
            // Always add collapsed class in desktop view
            this.sidebar.classList.add(this.config.collapsedClass);
            document.body.classList.add('sidebar-collapsed');
        }
    }
    
    /**
     * Set up event listeners for sidebar controls
     */
    setupEventListeners() {
        // Mobile toggle button
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', () => this.toggleMobile());
        }
        
        // Close mobile sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMobileOpen && 
                this.sidebar && 
                !this.sidebar.contains(e.target) && 
                !e.target.closest(`.${this.config.mobileToggleId}`)) {
                this.toggleMobile();
            }
        });
        
        // Close mobile sidebar with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMobileOpen) {
                this.toggleMobile();
                // Return focus to the toggle button
                const mobileToggle = document.getElementById(this.config.mobileToggleId);
                if (mobileToggle) {
                    mobileToggle.focus();
                }
            }
        });
    }
    
    /**
     * Toggle mobile sidebar open/closed state
     */
    toggleMobile() {
        this.isMobileOpen = !this.isMobileOpen;
        document.body.classList.toggle(this.config.mobileOpenClass, this.isMobileOpen);
        
        // Manage focus trap and accessibility
        if (this.isMobileOpen) {
            // Set focus to first focusable element in sidebar
            setTimeout(() => {
                const firstFocusable = this.sidebar.querySelector('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (firstFocusable) {
                    firstFocusable.focus();
                }
            }, 100);
        }
    }
    
    /**
     * Save sidebar state to localStorage
     */
    save() {
        localStorage.setItem(this.config.storageKey, JSON.stringify({
            isCollapsed: this.isCollapsed,
            isMobileOpen: this.isMobileOpen
        }));
    }
}

/**
 * Renders the dynamic sidebar based on user type
 * @param {Object} options - Configuration options
 * @param {string} options.userType - User type (instructor, trainee_general, trainee_workshop)
 * @param {string} options.currentPage - Current page identifier
 */
function renderDynamicSidebar(options = {}) {
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
    if (!sidebarPlaceholder) {
        console.warn('Sidebar placeholder not found');
        return;
    }
    
    // Get current settings
    const lang = window.currentLang || document.documentElement.lang || 'he';
    const userType = options.userType || window.currentUserType || localStorage.getItem('currentUserType') || 'trainee_general';
    
    // Determine home page based on user type
    let homePage = 'landing_trainee_general.html';
    switch (userType) {
        case 'instructor':
            homePage = 'landing_instructor.html';
            break;
        case 'trainee_workshop':
            homePage = 'landing_trainee_workshop.html';
            break;
        default:
            homePage = 'landing_trainee_general.html';
    }
    
    // Determine sidebar links based on user type
    let sidebarLinks = [];
    
    switch (userType) {
        case 'instructor':
            sidebarLinks = getInstructorSidebarLinks(lang);
            break;
        case 'trainee_general':
            sidebarLinks = getTraineeGeneralSidebarLinks(lang);
            break;
        case 'trainee_workshop':
            sidebarLinks = getTraineeWorkshopSidebarLinks(lang);
            break;
        default:
            sidebarLinks = getTraineeGeneralSidebarLinks(lang); // Default fallback
    }
    
    // Build sidebar HTML
    let sidebarHTML = `
    <aside id="main-sidebar" class="main-sidebar collapsed">
        <div class="sidebar-header">
            <a href="${homePage}" class="product-logo-link" title="${getLocalizedString('cyber_sim_platform', {}, lang)}">
                <svg xmlns="http://www.w3.org/2000/svg" class="product-logo" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="32" height="32">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            </a>
        </div>
        <nav>
    `;
    
    // Add links
    sidebarLinks.forEach(link => {
        const isActive = window.location.href.includes(link.href);
        const activeClass = isActive ? 'active' : '';
        
        let badgeHTML = '';
        if (link.badge) {
            const badgeType = link.badge.type || 'primary';
            badgeHTML = `<span class="sidebar-badge badge-${badgeType}">${link.badge.count}</span>`;
        }
        
        // Don't add title attribute to prevent tooltips
        sidebarHTML += `
            <a href="${link.href}" class="sidebar-link ${activeClass}">
                ${link.icon}
                <span class="link-text">${link.text}</span>
                ${badgeHTML}
            </a>
        `;
    });
    
                // Add theme, language toggle buttons and logout button
    sidebarHTML += `
        </nav>
        <div class="mt-auto">
            <!-- Bottom controls -->
            <div class="sidebar-bottom-controls">
                <!-- Theme and language toggle column -->
                <div class="theme-lang-toggle-column">
                    <!-- Theme toggle -->
                    <button class="theme-switch-btn sidebar-bottom-btn" aria-label="${getLocalizedString('toggle_theme', {}, lang)}" title="${getLocalizedString('toggle_theme', {}, lang)}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="theme-toggle-light w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="theme-toggle-dark w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        <span class="link-text">${getLocalizedString('toggle_theme', {}, lang)}</span>
                    </button>
                    
                    <!-- Language toggle -->
                    <button class="lang-switch-btn sidebar-bottom-btn" aria-label="${getLocalizedString('toggle_language', {}, lang)}" title="${getLocalizedString('toggle_language', {}, lang)}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        <span class="link-text">
                            ${lang === 'he' ? 'EN' : 'HE'}
                        </span>
                    </button>
                </div>
                
                <!-- Logout button -->
                <a href="login.html" class="sidebar-bottom-btn danger-btn" title="${getLocalizedString('nav_logout', {}, lang)}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    <span class="link-text">${getLocalizedString('nav_logout', {}, lang)}</span>
                </a>
            </div>
            </div>
        </aside>
    `;
    
    // Mobile toggle button
    sidebarHTML += `
    <button id="mobile-sidebar-toggle" class="mobile-sidebar-toggle">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    </button>
    `;
    
    // Insert the sidebar into the placeholder
    sidebarPlaceholder.innerHTML = sidebarHTML;
    
    // Initialize the sidebar
    const sidebar = new Sidebar();
    
    // Setup theme and language toggle functionality
    setupToggleButtons();
    
    // Make the sidebar accessible
    enhanceSidebarAccessibility();
    
    // Set up focus trap for mobile
    setupSidebarFocusTrap();
}

/**
 * Enhances sidebar accessibility
 * - Adds proper ARIA attributes
 * - Ensures keyboard navigation works properly
 */
function enhanceSidebarAccessibility() {
    const sidebar = document.getElementById('main-sidebar');
    if (!sidebar) return;
    
    // Add proper ARIA labels and roles
    sidebar.setAttribute('role', 'navigation');
    sidebar.setAttribute('aria-label', getLocalizedString('main_navigation'));
    
    // Add keyboard navigation for sidebar links
    const sidebarLinks = sidebar.querySelectorAll('.sidebar-link');
    
    sidebarLinks.forEach((link, index) => {
        // Add appropriate ARIA attributes
        link.setAttribute('role', 'menuitem');
        
        // Add keyboard event listeners for arrow navigation
            link.addEventListener('keydown', (e) => {
            let targetLink = null;
            
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    targetLink = sidebarLinks[index + 1] || sidebarLinks[0];
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    targetLink = sidebarLinks[index - 1] || sidebarLinks[sidebarLinks.length - 1];
                    break;
                case 'Home':
                    e.preventDefault();
                    targetLink = sidebarLinks[0];
                    break;
                case 'End':
                    e.preventDefault();
                    targetLink = sidebarLinks[sidebarLinks.length - 1];
                    break;
            }
            
            if (targetLink) {
                targetLink.focus();
            }
        });
    });
    
    // Make collapse toggle accessible
    const collapseToggle = document.getElementById('sidebar-collapse-toggle');
    if (collapseToggle) {
        collapseToggle.setAttribute('role', 'button');
        collapseToggle.setAttribute('tabindex', '0');
        
        // Allow activation with Enter and Space
        collapseToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                collapseToggle.click();
            }
        });
    }
    
    // Make mobile toggle accessible
    const mobileToggle = document.getElementById('mobile-sidebar-toggle');
    if (mobileToggle) {
        mobileToggle.setAttribute('role', 'button');
        mobileToggle.setAttribute('tabindex', '0');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-controls', 'main-sidebar');
        
        // Update aria-expanded state when toggled
        document.addEventListener('click', () => {
            if (document.body.classList.contains('sidebar-mobile-open')) {
                mobileToggle.setAttribute('aria-expanded', 'true');
                    } else {
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

/**
 * Handles Tab key presses to trap focus within the mobile sidebar
 * @param {KeyboardEvent} e - The keyboard event
 */
const handleTabKey = (e) => {
    // Only process if sidebar is open on mobile
    if (!document.body.classList.contains('sidebar-mobile-open')) return;
    
    if (e.key === 'Tab') {
        const sidebar = document.getElementById('main-sidebar');
    if (!sidebar) return;
    
        // Get all focusable elements in the sidebar
    const focusableElements = sidebar.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
        // Trap focus within the sidebar
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    };
    
/**
 * Sets up a focus trap for the mobile sidebar
 * Ensures focus stays within the sidebar when it's open on mobile
 */
function setupSidebarFocusTrap() {
    const sidebar = document.getElementById('main-sidebar');
    const mobileToggle = document.getElementById('mobile-sidebar-toggle');
    
    if (!sidebar || !mobileToggle) return;
    
    // Track focus for mobile sidebar
    let lastFocusedElement = null;
    
    document.addEventListener('sidebarStateChanged', (e) => {
        if (e.detail && typeof e.detail.mobileOpen !== 'undefined') {
            if (e.detail.mobileOpen) {
                // Store last focused element before opening sidebar
                lastFocusedElement = document.activeElement;
            } else if (lastFocusedElement) {
                // Restore focus when closing sidebar
                lastFocusedElement.focus();
            }
        }
    });
    
    // Handle tab key to keep focus inside sidebar when open on mobile
    document.addEventListener('keydown', handleTabKey);
}

/**
 * Updates sidebar highlight when route changes without page reload
 * Useful for single-page applications or history API navigation
 * @param {string} newPath - The new path to highlight
 */
function updateSidebarForRouteChange(newPath) {
    if (!newPath) return;
    
    // Extract filename from path if needed
    const pathParts = newPath.split('/');
    const currentPath = pathParts[pathParts.length - 1] || 'index.html';
    
    // Store current path in history state for consistency
    const historyState = window.history.state || {};
    historyState.currentPath = currentPath;
    window.history.replaceState(historyState, '', window.location.href);
    
    // Update sidebar highlighting
    updateActiveSidebarLink();
}

/**
 * Updates the active state of sidebar links based on current page
 * Can be called after dynamic navigation changes to ensure proper highlighting
 */
function updateActiveSidebarLink() {
    try {
        const currentPath = window.location.pathname.split("/").pop() || "index.html";
        const sidebarLinks = document.querySelectorAll('#sidebar-placeholder .sidebar-link');
        
        // Get current position in scenario flow (if applicable)
        const scenarioFlowPages = [
            "trainee_architecture.html", 
            "trainee_email.html", 
            "trainee_cti.html",
            "trainee_questions.html", 
            "trainee_communication.html",
            "trainee_ai_assistant.html", 
            "trainee_mitre.html", 
            "trainee_mitigation.html"
        ];
        const currentPageFlowIndex = scenarioFlowPages.indexOf(currentPath);
        const isInScenarioFlow = currentPageFlowIndex !== -1;
        const userType = window.currentUserType || 'trainee_general';
        const isTrainee = userType.startsWith('trainee_');
        
        sidebarLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (!linkHref) return;
            
            // Extract the base path without query params
            const linkPath = linkHref.split("?")[0].split("/").pop();
            
            // Clear existing states
            link.classList.remove('active', 'flow-context');
            link.removeAttribute('aria-current');
            
            // Check for exact match - current page
            if (linkPath === currentPath) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
                
                // Auto expand sidebar if collapsed and item is active
                const sidebarEl = document.getElementById('main-sidebar');
                if (sidebarEl && sidebarEl.classList.contains('collapsed') && window.innerWidth > 767) {
                    if (!link.dataset.expandedSidebar) {
                        // Only auto-expand once per session to avoid annoyance
                        link.dataset.expandedSidebar = 'true';
                    }
                }
            } 
            // Check for flow context (for trainee user types)
            else if (isTrainee && isInScenarioFlow) {
                const linkFlowIndex = scenarioFlowPages.indexOf(linkPath);
                
                // This link is in the flow and:
                // - either it's a previous step (completed)
                // - or it's the next immediate step (available)
                if (linkFlowIndex !== -1 && (
                    linkFlowIndex < currentPageFlowIndex || 
                    linkFlowIndex === currentPageFlowIndex + 1
                )) {
                    link.classList.add('flow-context');
                    
                    // Add flow indicator if not already present
                    if (!link.querySelector('.flow-indicator')) {
                        const span = document.createElement('span');
                        span.className = 'flow-indicator';
                        link.appendChild(span);
                    }
                } else {
                    // Remove flow indicator if exists
                    const indicator = link.querySelector('.flow-indicator');
                    if (indicator) indicator.remove();
                }
            }
        });
        
        // Enhance keyboard accessibility after updating active states
        enhanceSidebarAccessibility();
        
        // Setup focus trap for mobile
        if (document.body.classList.contains('sidebar-mobile-open')) {
            setupSidebarFocusTrap();
        }
        
    } catch (e) {
        console.error("sidebar.js: Error in updateActiveSidebarLink:", e);
    }
}

/**
 * Shows a badge/notification on a sidebar link
 * Useful to highlight new items or notifications
 * @param {string} linkHref - The href of the link to add badge to
 * @param {number|string} count - The number or text to show in badge
 * @param {string} type - Badge type (default, primary, danger, etc.)
 */
function addSidebarLinkBadge(linkHref, count, type = 'primary') {
    if (!linkHref) return;
    
    // Find the link by href
    const link = document.querySelector(`#sidebar-placeholder .sidebar-link[href^="${linkHref}"]`);
    if (!link) return;
    
    // Remove existing badge if any
    const existingBadge = link.querySelector('.sidebar-badge');
    if (existingBadge) {
        existingBadge.remove();
    }
    
    // Create new badge
    const badge = document.createElement('span');
    badge.className = `sidebar-badge badge-${type}`;
    badge.textContent = count;
    
    // Add badge to link
    link.appendChild(badge);
}

// Export functions to global scope
window.renderDynamicSidebar = renderDynamicSidebar;
window.updateActiveSidebarLink = updateActiveSidebarLink;
window.updateSidebarForRouteChange = updateSidebarForRouteChange;
window.addSidebarLinkBadge = addSidebarLinkBadge;

// Initialize translations with default keys if needed
function initializeSidebarTranslations() {
    // Initialize translations object if it doesn't exist
    if (!window.translations) {
        window.translations = { he: {}, en: {} };
    }
    
    const he = window.translations.he || {};
    const en = window.translations.en || {};
    
    // Hebrew translation keys
    const heKeys = {
        "nav_landing_page": "עמוד נחיתה (מאמן)",
        "nav_instructor_main": "לוח מחוונים (מאמן)",
        "nav_cost_resource": "עלויות ומשאבים",
        "nav_instructor_manage_users_teams": "ניהול משתמשים וצוותים",
        "nav_instructor_manage_scenarios": "ניהול תרחישים",
        "nav_instructor_monitor_simulations": "ניטור סימולציות",
        "nav_instructor_reports_analytics": "דוחות ואנליטיקה",
        "nav_instructor_content_management": "ניהול תוכן",
        "trainee_landing_page": "עמוד נחיתה (חניך)",
        "trainee_dashboard": "לוח מחוונים (חניך)",
        "trainee_available_scenarios": "תרחישים זמינים",
        "trainee_architecture": "סקירת ארכיטקטורה",
        "trainee_email": "לקוח דוא\"ל",
        "trainee_cti": "מאגר מודיעין (CTI)",
        "trainee_questions": "שאלות מנחות",
        "trainee_communication": "תקשורת צוותית",
        "trainee_ai_assistant": "עוזר AI",
        "trainee_mitre": "נתיב תקיפה (MITRE)",
        "trainee_mitigation": "שלבי מיטיגציה",
        "trainee_my_progress": "ההתקדמות שלי",
        "trainee_prep_materials": "חומרי לימוד (מכינה)",
        "sidebar_collapse": "כווץ תפריט",
        "sidebar_expand": "הרחב תפריט",
        "toggle_mobile_menu": "פתח/סגור תפריט",
        "toggle_language": "החלף שפה",
        "toggle_sidebar": "פתח/סגור תפריט צדדי",
        "toggle_theme": "החלף מצב תצוגה",
        "cyber_sim_platform": "סימולציות סייבר",
        "nav_logout": "התנתק",
        "main_navigation": "ניווט ראשי"
    };
    
    // English translation keys
    const enKeys = {
        "nav_landing_page": "Landing Page (Instructor)",
        "nav_instructor_main": "Dashboard (Instructor)",
        "nav_cost_resource": "Costs & Resources",
        "nav_instructor_manage_users_teams": "Manage Users & Teams",
        "nav_instructor_manage_scenarios": "Manage Scenarios",
        "nav_instructor_monitor_simulations": "Monitor Simulations",
        "nav_instructor_reports_analytics": "Reports & Analytics",
        "nav_instructor_content_management": "Content Management",
        "trainee_landing_page": "Landing Page (Trainee)",
        "trainee_dashboard": "Dashboard (Trainee)",
        "trainee_available_scenarios": "Available Scenarios",
        "trainee_architecture": "Architecture Overview",
        "trainee_email": "Email Client",
        "trainee_cti": "CTI Feed",
        "trainee_questions": "Guiding Questions",
        "trainee_communication": "Team Communication",
        "trainee_ai_assistant": "AI Assistant",
        "trainee_mitre": "MITRE Attack View",
        "trainee_mitigation": "Mitigation Steps",
        "trainee_my_progress": "My Progress",
        "trainee_prep_materials": "Prep Materials",
        "sidebar_collapse": "Collapse Menu",
        "sidebar_expand": "Expand Menu",
        "toggle_mobile_menu": "Toggle Menu",
        "toggle_language": "Toggle Language",
        "toggle_sidebar": "Toggle Sidebar",
        "toggle_theme": "Toggle Theme",
        "cyber_sim_platform": "Cyber Simulations",
        "nav_logout": "Logout",
        "main_navigation": "Main Navigation"
    };
    
    // Add missing translations to Hebrew
    if (window.translations.he) {
        for (const key in heKeys) { 
            if (!window.translations.he[key]) {
                window.translations.he[key] = heKeys[key];
            }
        }
    } else {
        window.translations.he = heKeys;
    }
    
    // Add missing translations to English
    if (window.translations.en) {
        for (const key in enKeys) { 
            if (!window.translations.en[key]) {
                window.translations.en[key] = enKeys[key];
            }
        }
    } else {
        window.translations.en = enKeys;
    }
}

// Initialize translations immediately
initializeSidebarTranslations();

// Initial render
if (document.getElementById('sidebar-placeholder')) {
    renderDynamicSidebar();
} else {
    const observer = new MutationObserver((mutationsList, observer) => {
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const placeholder = document.getElementById('sidebar-placeholder');
                if (placeholder) {
                    renderDynamicSidebar();
                    observer.disconnect();
                    return;
                }
            }
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

// Listen for history changes to update sidebar without page reload
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.currentPath) {
        updateSidebarForRouteChange(event.state.currentPath);
    }
});

/**
 * Get instructor sidebar links based on the specified language
 * @param {string} lang - Language code (he/en)
 * @returns {Array} - Array of link objects
 */
function getInstructorSidebarLinks(lang) {
    return [
        {
            text: getLocalizedString('nav_landing_page', {}, lang),
            href: 'landing_instructor.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>`
        },
        {
            text: getLocalizedString('nav_instructor_main', {}, lang),
            href: 'instructor_main.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>`
        },
        {
            text: getLocalizedString('nav_cost_resource', {}, lang),
            href: 'instructor_cost_resource.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>`
        },
        {
            text: getLocalizedString('nav_instructor_manage_users_teams', {}, lang),
            href: 'instructor_manage_users_teams.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>`
        },
        {
            text: getLocalizedString('nav_instructor_manage_scenarios', {}, lang),
            href: 'instructor_manage_scenarios.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>`
        },
        {
            text: getLocalizedString('nav_instructor_monitor_simulations', {}, lang),
            href: 'instructor_monitor_simulations.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
            </svg>`
        },
        {
            text: getLocalizedString('nav_instructor_reports_analytics', {}, lang),
            href: 'instructor_reports_analytics.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
            </svg>`
        },
        {
            text: getLocalizedString('nav_instructor_content_management', {}, lang),
            href: 'instructor_content_management.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>`
        }
    ];
}

/**
 * Get trainee general sidebar links based on the specified language
 * @param {string} lang - Language code (he/en)
 * @returns {Array} - Array of link objects
 */
function getTraineeGeneralSidebarLinks(lang) {
    return [
        {
            text: getLocalizedString('trainee_landing_page', {}, lang),
            href: 'landing_trainee_general.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>`
        },
        {
            text: getLocalizedString('trainee_dashboard', {}, lang),
            href: 'trainee_dashboard.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>`
        },
        {
            text: getLocalizedString('trainee_available_scenarios', {}, lang),
            href: 'trainee_main.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>`
        },
        {
            text: getLocalizedString('trainee_architecture', {}, lang),
            href: 'trainee_architecture.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
            </svg>`
        },
        {
            text: getLocalizedString('trainee_email', {}, lang),
            href: 'trainee_email.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>`,
            badge: {
                count: 2,
                type: 'primary'
            }
        },
        {
            text: getLocalizedString('trainee_cti', {}, lang),
            href: 'trainee_cti.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>`
        },
        {
            text: getLocalizedString('trainee_questions', {}, lang),
            href: 'trainee_questions.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>`
        },
        {
            text: getLocalizedString('trainee_communication', {}, lang),
            href: 'trainee_communication.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>`,
            badge: {
                count: 3,
                type: 'primary'
            }
        },
        {
            text: getLocalizedString('trainee_ai_assistant', {}, lang),
            href: 'trainee_ai_assistant.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>`
        },
        {
            text: getLocalizedString('trainee_mitre', {}, lang),
            href: 'trainee_mitre.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
            </svg>`
        },
        {
            text: getLocalizedString('trainee_mitigation', {}, lang),
            href: 'trainee_mitigation.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>`
        },
        {
            text: getLocalizedString('trainee_my_progress', {}, lang),
            href: 'trainee_my_progress.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
            </svg>`
        },
        {
            text: getLocalizedString('trainee_prep_materials', {}, lang),
            href: 'trainee_prep_materials.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>`
        }
    ];
}

/**
 * Get trainee workshop sidebar links based on the specified language
 * @param {string} lang - Language code (he/en)
 * @returns {Array} - Array of link objects
 */
function getTraineeWorkshopSidebarLinks(lang) {
    return [
        {
            text: getLocalizedString('trainee_landing_page', {}, lang),
            href: 'landing_trainee_workshop.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>`
        },
        {
            text: getLocalizedString('trainee_architecture', {}, lang),
            href: 'trainee_architecture.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
            </svg>`
        },
        {
            text: getLocalizedString('trainee_email', {}, lang),
            href: 'trainee_email.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>`,
            badge: {
                count: 2,
                type: 'primary'
            }
        },
        {
            text: getLocalizedString('trainee_cti', {}, lang),
            href: 'trainee_cti.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>`
        },
        {
            text: getLocalizedString('trainee_questions', {}, lang),
            href: 'trainee_questions.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>`
        },
        {
            text: getLocalizedString('trainee_communication', {}, lang),
            href: 'trainee_communication.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>`,
            badge: {
                count: 3,
                type: 'primary'
            }
        },
        {
            text: getLocalizedString('trainee_ai_assistant', {}, lang),
            href: 'trainee_ai_assistant.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>`
        },
        {
            text: getLocalizedString('trainee_mitre', {}, lang),
            href: 'trainee_mitre.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
            </svg>`
        },
        {
            text: getLocalizedString('trainee_mitigation', {}, lang),
            href: 'trainee_mitigation.html',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>`
        }
    ];
}

/**
 * Sets up theme and language toggle buttons
 */
function setupToggleButtons() {
    const themeToggleBtn = document.querySelector('.theme-switch-btn');
    const langToggleBtn = document.querySelector('.lang-switch-btn');
    
    // Theme toggle functionality
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDarkTheme = document.body.classList.contains('dark-theme');
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', isDarkTheme ? 'light' : 'dark');
            
            // Dispatch theme changed event
            document.dispatchEvent(new CustomEvent('themeChanged', {
                detail: { theme: isDarkTheme ? 'light' : 'dark' }
            }));
        });
    }
    
    // Language toggle functionality
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const currentLang = document.documentElement.lang || 'he';
            const newLang = currentLang === 'he' ? 'en' : 'he';
            
            // Call the global setLanguage function if available
            if (typeof window.setLanguage === 'function') {
                window.setLanguage(newLang);
                // Update button text - the global function will handle everything else
                langToggleBtn.textContent = newLang === 'he' ? 'EN' : 'HE';
            } else {
                // Fallback if global function not available
                // Update HTML dir attribute for RTL/LTR
                document.documentElement.lang = newLang;
                document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr';
                
                // Store language preference using the correct storage key from app-global.js
                localStorage.setItem(STORAGE_KEYS.LANGUAGE, newLang);
                
                // Update button text
                langToggleBtn.textContent = newLang === 'he' ? 'EN' : 'HE';
                
                // Dispatch language changed event
                document.dispatchEvent(new CustomEvent('languageChanged', {
                    detail: { language: newLang }
                }));
                
                // Reload the page to apply translations
                window.location.reload();
            }
        });
    }
}

// Initialize sidebar when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
    if (sidebarPlaceholder) {
        renderDynamicSidebar();
    }
});

// Export functions for use in other modules
window.renderDynamicSidebar = renderDynamicSidebar;
window.setupToggleButtons = setupToggleButtons;