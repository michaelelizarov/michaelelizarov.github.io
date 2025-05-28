// app-global.js
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEYS = { LANGUAGE: 'preferredLang', THEME: 'theme', USER_TYPE: 'currentUserType' };
    const DEFAULT_LANG = 'he';
    const SUPPORTED_LANGS = ['he', 'en'];
    const VALID_USER_TYPES = ['instructor', 'trainee_general', 'trainee_workshop']; // Added trainee_workshop
    const DEFAULT_USER_TYPE = 'trainee_general';
    const htmlEl = document.documentElement;
    
    // Define setLanguage function globally for use in event listeners
    window.setLanguage = function(lang) {
        if (!SUPPORTED_LANGS.includes(lang)) return;
        
        // Store language preference
        localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
        
        // Set HTML attributes
        htmlEl.lang = lang;
        htmlEl.dir = lang === 'he' ? 'rtl' : 'ltr';
        
        // Update any language toggle buttons on the page
        const langToggleBtn = document.querySelector('.lang-switch-btn');
        if (langToggleBtn) {
            langToggleBtn.textContent = lang === 'he' ? 'English' : 'עברית';
            // Add current language attribute for reference
            langToggleBtn.setAttribute('data-current-lang', lang);
        }
        
        // Dispatch event for components to react
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang }
        }));
        
        // Apply translations to page
        applyLanguage(lang);
        
        // Update window.currentLang
        window.currentLang = lang;
        
        // Force a page reload to ensure all translations are applied correctly
        if (window.location.href.includes('login.html')) {
            window.location.reload();
        }
    };
    // Base translations: Global keys used across multiple pages or by global components.
    // Page-specific keys should reside in their respective *_translations.js files.
    const baseTranslations = {
        he: {
            // Language & Theme
            lang_toggle_en: "English",
            lang_toggle_he: "עברית",
            theme_toggle_sr: "החלף ערכת נושא",
            logo_title: "לוגו פלטפורמת סימולציות סייבר",
            platform_title_sidebar: "סימולציות סייבר", // Used in sidebar
            // Common UI Elements
            nav_logout: "התנתקות",
            cancel_button_modal: "ביטול",
            save_button_modal: "שמור", // Generic save
            close_modal_tooltip: "סגור חלון",
            edit_tooltip: "ערוך",
            delete_tooltip: "מחק",
            view_details_tooltip: "צפה בפירוט",
            remove_item_tooltip: "הסר פריט",
            loading_text: "טוען...",
            error_loading_data: "שגיאה בטעינת נתונים.",
            no_data_available_generic: "אין נתונים זמינים להצגה.",
            image_missing_alt_suffix: "(תמונה חסרה)",
            go_back_button_general: "חזור",
            continue_button_general: "המשך",
            confirm_action_prompt: "האם אתה בטוח שברצונך לבצע פעולה זו?",
            // Forms & Validation
            validation_fill_all_fields: "אנא מלא את כל שדות החובה כראוי.",
            select_option_placeholder: "בחר מהרשימה...",
            // Common Statuses & Difficulties (used for badges, filters etc.)
            status_active: "פעיל",
            status_paused: "מושהית",
            status_error: "שגיאה",
            status_draft: "טיוטה",
            status_published: "פורסם",
            status_archived: "בארכיון",
            status_pending_review: "ממתין לבדיקה",
            status_completed: "הושלם",
            status_running: "רצה",
            status_starting: "בתהליך התחלה",
            status_all: "הכל",
            difficulty_all: "כל הרמות",
            difficulty_easy_badge: "קל",
            difficulty_medium_badge: "בינוני",
            difficulty_hard_badge: "קשה",
            difficulty_expert_badge: "מומחה",
            difficulty_low: "נמוכה", // More specific if needed
            difficulty_high: "גבוהה", // More specific if needed
            // Date/Time related
            month_jan: "ינואר", month_feb: "פברואר", month_mar: "מרץ",
            month_apr: "אפריל", month_may: "מאי", month_jun: "יוני",
            month_jul: "יולי", month_aug: "אוגוסט", month_sep: "ספטמבר",
            month_oct: "אוקטובר", month_nov: "נובמבר", month_dec: "דצמבר",
            minutes_suffix: "דק'",
            // Specific action button texts that might be reused
            trainee_start_simulation_button: "התחל סימולציה",
            open_button: "פתח",
            watch_button: "צפה",
            download_button: "הורד",
            read_button: "קרא",
            go_to_site_button: "עבור לאתר",
            apply_filters_button: "החל מסננים", // Common filter button text
            // MITRE Tactic Names
            mitre_tactic_reconnaissance: "איסוף מודיעין",
            mitre_tactic_resource_development: "פיתוח משאבים",
            mitre_tactic_initial_access: "גישה ראשונית",
            mitre_tactic_execution: "הפעלה",
            mitre_tactic_persistence: "הישארות",
            mitre_tactic_privilege_escalation: "הסלמת הרשאות",
            mitre_tactic_defense_evasion: "התחמקות מהגנות",
            mitre_tactic_credential_access: "גישה לפרטי הזדהות",
            mitre_tactic_discovery: "גילוי",
            mitre_tactic_lateral_movement: "תנועה רוחבית",
            mitre_tactic_collection: "איסוף",
            mitre_tactic_command_and_control: "שליטה ובקרה",
            mitre_tactic_exfiltration: "הוצאת מידע",
            mitre_tactic_impact: "השפעה",
            // General alerts / confirmations
            alert_changes_saved_successfully: "השינויים נשמרו בהצלחה (סימולציה).",
            alert_item_deleted_successfully: "הפריט נמחק בהצלחה (סימולציה).",
            confirm_delete_generic_prefix: "האם אתה בטוח שברצונך למחוק את {itemName}?", // {itemName} placeholder
            // Pagination
            pagination_previous: "הקודם",
            pagination_next: "הבא",
            pagination_page_num: "עמוד {num}",
        },
        en: {
            lang_toggle_en: "English",
            lang_toggle_he: "עברית",
            theme_toggle_sr: "Toggle theme",
            logo_title: "Cyber Simulation Platform Logo",
            platform_title_sidebar: "Cyber Simulations",
            nav_logout: "Logout",
            cancel_button_modal: "Cancel",
            save_button_modal: "Save",
            close_modal_tooltip: "Close window",
            edit_tooltip: "Edit",
            delete_tooltip: "Delete",
            view_details_tooltip: "View Details",
            remove_item_tooltip: "Remove item",
            loading_text: "Loading...",
            error_loading_data: "Error loading data.",
            no_data_available_generic: "No data available to display.",
            image_missing_alt_suffix: "(Image missing)",
            go_back_button_general: "Back",
            continue_button_general: "Continue",
            confirm_action_prompt: "Are you sure you want to perform this action?",
            validation_fill_all_fields: "Please fill in all required fields correctly.",
            select_option_placeholder: "Select from list...",
            status_active: "Active",
            status_paused: "Paused",
            status_error: "Error",
            status_draft: "Draft",
            status_published: "Published",
            status_archived: "Archived",
            status_pending_review: "Pending Review",
            status_completed: "Completed",
            status_running: "Running",
            status_starting: "Starting",
            status_all: "All",
            difficulty_all: "All Levels",
            difficulty_easy_badge: "Easy",
            difficulty_medium_badge: "Medium",
            difficulty_hard_badge: "Hard",
            difficulty_expert_badge: "Expert",
            difficulty_low: "Low",
            difficulty_high: "High",
            month_jan: "January", month_feb: "February", month_mar: "March",
            month_apr: "April", month_may: "May", month_jun: "June",
            month_jul: "July", month_aug: "August", month_sep: "September",
            month_oct: "October", month_nov: "November", month_dec: "December",
            minutes_suffix: "min",
            trainee_start_simulation_button: "Start Simulation",
            open_button: "Open",
            watch_button: "Watch",
            download_button: "Download",
            read_button: "Read",
            go_to_site_button: "Go to Site",
            apply_filters_button: "Apply Filters",
            mitre_tactic_reconnaissance: "Reconnaissance",
            mitre_tactic_resource_development: "Resource Development",
            mitre_tactic_initial_access: "Initial Access",
            mitre_tactic_execution: "Execution",
            mitre_tactic_persistence: "Persistence",
            mitre_tactic_privilege_escalation: "Privilege Escalation",
            mitre_tactic_defense_evasion: "Defense Evasion",
            mitre_tactic_credential_access: "Credential Access",
            mitre_tactic_discovery: "Discovery",
            mitre_tactic_lateral_movement: "Lateral Movement",
            mitre_tactic_collection: "Collection",
            mitre_tactic_command_and_control: "Command and Control",
            mitre_tactic_exfiltration: "Exfiltration",
            mitre_tactic_impact: "Impact",
            alert_changes_saved_successfully: "Changes saved successfully (mock).",
            alert_item_deleted_successfully: "Item deleted successfully (mock).",
            confirm_delete_generic_prefix: "Are you sure you want to delete {itemName}?",
            pagination_previous: "Previous",
            pagination_next: "Next",
            pagination_page_num: "Page {num}",
        }
    };
    // Initialize window.translations with baseTranslations
    // Page-specific translation files will merge into this object.
    window.translations = JSON.parse(JSON.stringify(baseTranslations)); // Deep copy
    // --- Language Management ---
    function getInitialLanguage() {
        const savedLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
        if (savedLang && SUPPORTED_LANGS.includes(savedLang)) return savedLang;
        const browserLang = navigator.language.split('-')[0];
        if (SUPPORTED_LANGS.includes(browserLang)) return browserLang;
        return DEFAULT_LANG;
    }
    window.currentLang = getInitialLanguage();
    window.getTranslatedStringGlobal = function(key, replacements = {}, langParam = null) {
        const language = langParam || window.currentLang || document.documentElement.lang || DEFAULT_LANG;
        let langPack = window.translations[language];
        if (!langPack && language !== DEFAULT_LANG && window.translations[DEFAULT_LANG]) {
            langPack = window.translations[DEFAULT_LANG];
        } else if (!langPack) {
            return `[${key}]`; // Return key if no language pack found
        }
        let text = langPack[key];
        if (text === undefined) {
            // Fallback to default language if key not found in current language
            if (language !== DEFAULT_LANG && window.translations[DEFAULT_LANG] && window.translations[DEFAULT_LANG][key] !== undefined) {
                text = window.translations[DEFAULT_LANG][key];
            } else {
                return `[${key}]`; // Return key if not found in any language pack
            }
        }
        if (typeof text === 'string' && replacements && Object.keys(replacements).length > 0) {
            for (const placeholder in replacements) {
                text = text.replace(new RegExp(`{${placeholder}}`, 'g'), replacements[placeholder]);
            }
        }
        return text;
    };
    window.applyTranslationsGlobal = function() {
        const effectiveLang = window.currentLang;
        htmlEl.lang = effectiveLang;
        htmlEl.dir = effectiveLang === 'he' ? 'rtl' : 'ltr';
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.dataset.langKey;
            const replacements = el.dataset.langReplacements ? JSON.parse(el.dataset.langReplacements) : {};
            let textToSet = getTranslatedStringGlobal(key, replacements, effectiveLang);
            if (el.tagName === 'TITLE') document.title = textToSet;
            else if (el.tagName === 'INPUT' && (el.type === 'button' || el.type === 'submit' || el.type === 'reset')) el.value = textToSet;
            else if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') {
                el.textContent = textToSet;
            }
        });
        document.querySelectorAll('[data-lang-key-placeholder]').forEach(el => {
            el.placeholder = getTranslatedStringGlobal(el.dataset.langKeyPlaceholder, {}, effectiveLang);
        });
        document.querySelectorAll('[data-lang-key-alt]').forEach(el => {
            el.alt = getTranslatedStringGlobal(el.dataset.langKeyAlt, {}, effectiveLang);
        });
        document.querySelectorAll('[data-lang-key-title]').forEach(el => {
            el.title = getTranslatedStringGlobal(el.dataset.langKeyTitle, {}, effectiveLang);
        });
        document.querySelectorAll('[data-lang-key-label]').forEach(el => {
            el.setAttribute('aria-label', getTranslatedStringGlobal(el.dataset.langKeyLabel, {}, effectiveLang));
        });
        // Update global toggle buttons (like on login page) text
        const globalLangToggleBtns = document.querySelectorAll('.global-toggle-container .lang-switch-btn');
        if (globalLangToggleBtns.length > 0) {
            const buttonTextKey = effectiveLang === 'he' ? 'lang_toggle_en' : 'lang_toggle_he';
            const buttonText = getTranslatedStringGlobal(buttonTextKey);
            globalLangToggleBtns.forEach(btn => btn.textContent = buttonText);
        }
        // Update sidebar language toggle button text specifically if it's already rendered
        const sidebarLangToggleBtn = document.getElementById('language-toggle-sidebar');
        if (sidebarLangToggleBtn) {
            const buttonTextKey = effectiveLang === 'he' ? 'lang_toggle_en' : 'lang_toggle_he';
            sidebarLangToggleBtn.textContent = getTranslatedStringGlobal(buttonTextKey);
        }
        // Call page-specific translation update function if it exists
        // This allows pages to update dynamically generated content that isn't covered by data-lang-key
        if (typeof window.updatePageSpecificTranslations === 'function') {
            window.updatePageSpecificTranslations(window.translations[effectiveLang], effectiveLang);
        }
    };
    function getInitialTheme() {
        const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
        if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
        // Check for OS preference if no saved theme
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light'; // Default to light if no preference detected
    }
    window.currentTheme = getInitialTheme();
    function applyTheme(theme) {
        const isDarkTheme = theme === 'dark';
        const bodyEl = document.body;
        
        if (isDarkTheme) {
            bodyEl.classList.add('dark-theme');
            document.documentElement.classList.add('dark');
        } else {
            bodyEl.classList.remove('dark-theme');
            document.documentElement.classList.remove('dark');
        }
        
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
        
        // Update theme toggle button
        const themeBtn = document.querySelector('.theme-switch-btn');
        if (themeBtn) {
            const lightIcon = document.getElementById('theme-icon-light-global');
            const darkIcon = document.getElementById('theme-icon-dark-global');
            
            if (isDarkTheme) {
                lightIcon?.classList.add('hidden');
                darkIcon?.classList.remove('hidden');
                themeBtn.setAttribute('aria-pressed', 'true');
                themeBtn.setAttribute('title', getTranslatedStringGlobal('theme_toggle_light'));
            } else {
                lightIcon?.classList.remove('hidden');
                darkIcon?.classList.add('hidden');
                themeBtn.setAttribute('aria-pressed', 'false');
                themeBtn.setAttribute('title', getTranslatedStringGlobal('theme_toggle_dark'));
            }
        }
        
        // Dispatch theme change event for charts and other components
        const themeChangeEvent = new CustomEvent('themeChanged', { 
            detail: { theme: theme }
        });
        document.dispatchEvent(themeChangeEvent);
        
        // Also dispatch the chart-specific event
        const chartThemeChangeEvent = new CustomEvent('chartThemeChanged', { 
            detail: { isDarkTheme: isDarkTheme }
        });
        document.dispatchEvent(chartThemeChangeEvent);
    }
    
    // Add this function to enhance the theme toggle handling
    function updateChartContainerTheme(theme) {
        // Apply immediate styling to chart containers before chart redrawing
        const chartContainers = document.querySelectorAll('.chart-container');
        
        chartContainers.forEach(container => {
            // Update canvas background color
            const canvas = container.querySelector('canvas');
            if (canvas) {
                if (theme === 'dark') {
                    canvas.style.backgroundColor = getComputedStyle(document.documentElement)
                        .getPropertyValue('--chart-canvas-bg-color-dark').trim();
                    // Improve contrast slightly in dark mode
                    canvas.style.filter = 'contrast(1.05)';
                } else {
                    canvas.style.backgroundColor = getComputedStyle(document.documentElement)
                        .getPropertyValue('--chart-canvas-bg-color-light').trim();
                    canvas.style.filter = 'none';
                }
            }
            
            // Update text elements inside chart containers
            const textElements = container.querySelectorAll('text');
            textElements.forEach(text => {
                if (theme === 'dark') {
                    text.style.fill = getComputedStyle(document.documentElement)
                        .getPropertyValue('--chart-text-color-dark').trim();
                } else {
                    text.style.fill = getComputedStyle(document.documentElement)
                        .getPropertyValue('--chart-text-color-light').trim();
                }
            });
        });
    }

    function setTheme(theme) {
        // Validate and apply the theme
        const validTheme = theme === 'dark' || theme === 'light' ? theme : getInitialTheme();
        applyTheme(validTheme);
        
        // Update chart containers immediately
        updateChartContainerTheme(validTheme);
        
        // Force an immediate repaint to ensure all changes are visible
        document.body.style.display = 'none';
        document.body.offsetHeight; // Trigger a reflow
        document.body.style.display = '';
    }

    function setupGlobalEventListeners() {
        // Language switcher button
        const langSwitchBtn = document.querySelector('.lang-switch-btn');
        if (langSwitchBtn) {
            // Set initial button text based on current language
            langSwitchBtn.textContent = window.currentLang === 'he' ? 'English' : 'עברית';
            
            langSwitchBtn.addEventListener('click', () => {
                const currentLang = window.currentLang || DEFAULT_LANG;
                const newLang = currentLang === 'he' ? 'en' : 'he';
                setLanguage(newLang);
                
                // Force reload for login page specifically to ensure all elements are updated
                if (window.location.href.includes('login.html')) {
                    window.location.reload();
                }
            });
        }
        // Theme toggle button
        const themeToggleBtn = document.querySelector('.theme-switch-btn');
        if (themeToggleBtn) {
            themeToggleBtn.setAttribute('aria-pressed', window.currentTheme === 'dark' ? 'true' : 'false');
            themeToggleBtn.addEventListener('click', () => {
                const newTheme = window.currentTheme === 'dark' ? 'light' : 'dark';
                setTheme(newTheme);
                themeToggleBtn.setAttribute('aria-pressed', newTheme === 'dark' ? 'true' : 'false');
                
                // Update charts when theme changes
                // Dispatch a custom event that charts can listen for
                const themeToggledEvent = new CustomEvent('themeToggled', { detail: { theme: newTheme } });
                document.dispatchEvent(themeToggledEvent);
                
                // Update chart containers immediately
                updateChartContainerTheme(newTheme);
                
                // Call specific chart update functions if they exist
                if (typeof window.updateInstructorReportsCharts === 'function') {
                    window.updateInstructorReportsCharts();
                }
                if (typeof window.updateTraineeProgressCharts === 'function') {
                    window.updateTraineeProgressCharts();
                }
                if (typeof window.updateInstructorMainCharts === 'function') {
                    window.updateInstructorMainCharts();
                }
                if (typeof window.updateInstructorCostCharts === 'function') {
                    window.updateInstructorCostCharts();
                }
                
                // Update email inputs if they exist to maintain dark theme
                document.querySelectorAll('input[type="email"]').forEach(input => {
                    if (newTheme === 'dark') {
                        input.style.backgroundColor = 'var(--input-bg-color-dark)';
                        input.style.color = 'var(--input-text-color-dark)';
                        input.style.borderColor = 'var(--input-border-color-dark)';
                    } else {
                        input.style.backgroundColor = '';
                        input.style.color = '';
                        input.style.borderColor = '';
                    }
                });
            });
        }
    }
    // Initialize the page with current language and theme
    applyTheme(window.currentTheme);
    window.applyTranslationsGlobal();
    setupGlobalEventListeners();
    // Make VALID_USER_TYPES available globally for sidebar.js and other components
    window.VALID_USER_TYPES = VALID_USER_TYPES;
    // Set current user type from localStorage if available
    const savedUserType = localStorage.getItem(STORAGE_KEYS.USER_TYPE);
    if (savedUserType && VALID_USER_TYPES.includes(savedUserType)) {
        window.currentUserType = savedUserType;
        document.body.dataset.userType = savedUserType;
    } else {
        window.currentUserType = DEFAULT_USER_TYPE;
        document.body.dataset.userType = DEFAULT_USER_TYPE;
    }
    // If the sidebar component is loaded, render it
    if (typeof window.renderDynamicSidebar === 'function') {
        window.renderDynamicSidebar();
    }

    // Function to handle dark theme for email inputs
    function setupDarkThemeForEmailInputs() {
        const emailInputs = document.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            if (document.body.classList.contains('dark-theme')) {
                input.classList.add('dark-theme-email');
                input.style.backgroundColor = 'var(--input-bg-color-dark)';
                input.style.color = 'var(--input-text-color-dark)';
                input.style.borderColor = 'var(--input-border-color-dark)';
            }
            
            // Add event listeners to maintain dark theme on focus, input, and blur
            input.addEventListener('focus', () => {
                if (document.body.classList.contains('dark-theme')) {
                    input.style.backgroundColor = 'var(--input-bg-color-dark)';
                    input.style.color = 'var(--input-text-color-dark)';
                    input.style.borderColor = 'var(--input-focus-border-color-dark)';
                }
            });
            
            input.addEventListener('input', () => {
                if (document.body.classList.contains('dark-theme')) {
                    input.style.backgroundColor = 'var(--input-bg-color-dark)';
                    input.style.color = 'var(--input-text-color-dark)';
                }
            });
            
            input.addEventListener('blur', () => {
                if (document.body.classList.contains('dark-theme')) {
                    input.style.backgroundColor = 'var(--input-bg-color-dark)';
                    input.style.color = 'var(--input-text-color-dark)';
                    input.style.borderColor = 'var(--input-border-color-dark)';
                }
            });
        });
    }

    // Function to initialize the forgot password functionality
    function setupForgotPasswordModal() {
        // Skip this if the disableForgotPasswordModal flag is set to true
        if (window.disableForgotPasswordModal === true) {
            return;
        }
        
        const forgotPasswordLink = document.querySelector('#forgot-password-link');
        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Create modal if it doesn't exist
                let modal = document.getElementById('forgot-password-modal');
                if (!modal) {
                    modal = document.createElement('div');
                    modal.id = 'forgot-password-modal';
                    modal.className = 'fixed inset-0 flex items-center justify-center z-50';
                    modal.innerHTML = `
                        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
                        <div class="relative card p-6 rounded-xl shadow-lg max-w-md w-full mx-4">
                            <h3 data-lang-key="forgot_password_title" class="text-xl font-semibold text-header mb-4">שחזור סיסמה</h3>
                            <p data-lang-key="forgot_password_instruction" class="text-text-color mb-4">יש להזין את כתובת האימייל שלך, ונשלח קישור לאיפוס הסיסמה.</p>
                            <form id="forgot-password-form" class="space-y-4">
                                <div>
                                    <label for="reset-email" data-lang-key="forgot_password_email_label" class="form-label">אימייל</label>
                                    <input type="email" id="reset-email" class="form-input dark-theme-email w-full" required>
                                </div>
                                <div class="flex justify-end space-x-2 rtl:space-x-reverse">
                                    <button type="button" id="forgot-password-cancel" class="btn btn-neutral" data-lang-key="forgot_password_cancel_button">ביטול</button>
                                    <button type="submit" class="btn btn-primary" data-lang-key="forgot_password_submit_button">שלח</button>
                                </div>
                            </form>
                        </div>
                    `;
                    document.body.appendChild(modal);
                    
                    // Setup event listeners
                    const cancelButton = document.getElementById('forgot-password-cancel');
                    const form = document.getElementById('forgot-password-form');
                    const emailInput = document.getElementById('reset-email');
                    
                    // Apply dark theme to email input if needed
                    if (document.body.classList.contains('dark-theme')) {
                        emailInput.classList.add('dark-theme-email');
                        emailInput.style.backgroundColor = 'var(--input-bg-color-dark)';
                        emailInput.style.color = 'var(--input-text-color-dark)';
                    }
                    
                    cancelButton.addEventListener('click', () => {
                        modal.remove();
                    });
                    
                    form.addEventListener('submit', (e) => {
                        e.preventDefault();
                        const email = emailInput.value.trim();
                        
                        if (email) {
                            // Replace form with success message
                            const modalContent = modal.querySelector('.card');
                            modalContent.innerHTML = `
                                <h3 data-lang-key="forgot_password_success_title" class="text-xl font-semibold text-header mb-4">בקשה נשלחה</h3>
                                <p data-lang-key="forgot_password_success_message" class="text-text-color mb-4">תודה! אם כתובת האימייל ${email} קיימת במערכת, תקבל הודעה עם הוראות לאיפוס הסיסמה.</p>
                                <div class="flex justify-end">
                                    <button type="button" id="forgot-password-close" class="btn btn-primary" data-lang-key="forgot_password_close_button">סגור</button>
                                </div>
                            `;
                            
                            document.getElementById('forgot-password-close').addEventListener('click', () => {
                                modal.remove();
                            });
                        }
                    });
                } else {
                    // Show existing modal
                    modal.style.display = 'flex';
                }
            });
        }
    }

    // Setup dark theme for email inputs
    setupDarkThemeForEmailInputs();
    
    // Setup forgot password functionality
    setupForgotPasswordModal();
    
    // Update email inputs when theme changes
    document.addEventListener('themeChanged', function(e) {
        setTimeout(() => {
            setupDarkThemeForEmailInputs();
        }, 100);
    });

    // Function to update all charts when theme changes
    function updateAllChartsOnThemeChange() {
        // Update instructor main charts if available
        if (window.updateInstructorMainCharts) {
            window.updateInstructorMainCharts();
        }
        
        // Update instructor cost resource charts if available
        if (window.updateCostResourceCharts) {
            window.updateCostResourceCharts();
        }
        
        // Update instructor reports analytics charts if available
        if (window.updateReportsAnalyticsCharts) {
            window.updateReportsAnalyticsCharts();
        }
        
        // Update trainee progress charts if available
        if (window.updateTraineeProgressCharts) {
            window.updateTraineeProgressCharts();
        }
        
        // Find all chart containers and update their background color for immediate visual feedback
        const chartContainers = document.querySelectorAll('.chart-container');
        const isDarkMode = document.body.classList.contains('dark-theme');
        
        chartContainers.forEach(container => {
            container.style.transition = 'background-color 0.3s ease';
            container.style.backgroundColor = isDarkMode ? 
                getComputedStyle(document.documentElement)
                    .getPropertyValue('--chart-canvas-bg-color-dark').trim() : 
                getComputedStyle(document.documentElement)
                    .getPropertyValue('--chart-canvas-bg-color-light').trim();
                
            // Force update of text elements inside chart containers
            const textElements = container.querySelectorAll('text');
            textElements.forEach(text => {
                text.style.fill = isDarkMode ? 
                    getComputedStyle(document.documentElement)
                        .getPropertyValue('--chart-text-color-dark').trim() :
                    getComputedStyle(document.documentElement)
                        .getPropertyValue('--chart-text-color-light').trim();
            });
        });
        
        // Dispatch event to notify charts about theme change
        const themeChangeEvent = new CustomEvent('chartThemeChanged', { 
            detail: { theme: isDarkMode ? 'dark' : 'light' } 
        });
        document.dispatchEvent(themeChangeEvent);
    }

    // Add the theme changed event listener to trigger chart updates
    document.addEventListener('themeChanged', function(e) {
        // Update theme-specific elements
        updateAllChartsOnThemeChange();
    });

    // Function to apply the selected language
    function applyLanguage(lang) {
        if (!SUPPORTED_LANGS.includes(lang)) {
            console.error(`Language '${lang}' is not supported. Using default.`);
            lang = DEFAULT_LANG;
        }
        htmlEl.lang = lang;
        htmlEl.dir = lang === 'he' ? 'rtl' : 'ltr';
        window.currentLang = lang;
        localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
        
        // Update language toggle button text
        const langBtn = document.querySelector('.lang-switch-btn');
        if (langBtn) {
            langBtn.textContent = getTranslatedStringGlobal(`lang_toggle_${lang === 'he' ? 'en' : 'he'}`);
            langBtn.setAttribute('data-current-lang', lang);
        }
        
        applyTranslationsGlobal();
        
        // Dispatch a custom event that pages can listen for
        const langChangeEvent = new CustomEvent('languageChanged', { detail: { language: lang } });
        document.dispatchEvent(langChangeEvent);
    }
    

    
    // Initialize language and theme
    function initialize() {
        // Load language preference
        let lang = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
        if (!lang || !SUPPORTED_LANGS.includes(lang)) {
            lang = DEFAULT_LANG;
        }
        window.currentLang = lang;
        
        // Load theme preference
        let theme = localStorage.getItem(STORAGE_KEYS.THEME);
        if (!theme || !['light', 'dark'].includes(theme)) {
            // Check for system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                theme = 'dark';
            } else {
                theme = 'light';
            }
        }
        
        // Apply settings
        applyLanguage(lang);
        applyTheme(theme);
        
        // Setup dark mode email inputs
        setupDarkThemeForEmailInputs();
    }
    
    // Initialize the page
    initialize();
});