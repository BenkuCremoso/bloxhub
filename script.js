document.addEventListener('DOMContentLoaded', function() {
    // Animation for download button
    const downloadBtn = document.querySelector('.download-btn');
    
    setInterval(() => {
        downloadBtn.classList.toggle('bounce');
        setTimeout(() => {
            downloadBtn.classList.toggle('bounce');
        }, 500);
    }, 3000);
    
    // Floating elements animation with random movements
    const fruits = document.querySelectorAll('.fruit');
    fruits.forEach(fruit => {
        const randomX = Math.random() * 20 - 10;
        const randomY = Math.random() * 20 - 10;
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 2;
        const randomRotation = Math.random() * 10 - 5;
        
        fruit.style.animation = `float ${randomDuration}s ease-in-out ${randomDelay}s infinite`;
        
        // Add some random movement and rotation
        setInterval(() => {
            const currentX = parseFloat(getComputedStyle(fruit).left);
            const currentY = parseFloat(getComputedStyle(fruit).top);
            
            fruit.style.left = `${currentX + (Math.random() * randomX)}px`;
            fruit.style.top = `${currentY + (Math.random() * randomY)}px`;
            fruit.style.transform = `rotate(${Math.random() * randomRotation}deg)`;
        }, 3000);
    });
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Donors hover effect
    const donors = document.querySelectorAll('.donor');
    donors.forEach(donor => {
        donor.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        donor.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Language selector functionality
    const languageBtn = document.querySelector('.language-btn');
    const languageDropdown = document.querySelector('.language-dropdown');
    const languageOptions = document.querySelectorAll('.language-option');
    
    languageBtn.addEventListener('click', function() {
        languageDropdown.classList.toggle('show');
    });
    
    // Close the dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.language-selector')) {
            languageDropdown.classList.remove('show');
        }
    });
    
    // Set default language (from localStorage or default to 'es')
    let currentLang = localStorage.getItem('bloxhub-language') || 'es';
    updateLanguage(currentLang);
    
    // Update button display for current language
    updateLanguageButton(currentLang);
    
    // Language switching functionality
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Update language in localStorage
            localStorage.setItem('bloxhub-language', lang);
            
            // Update the flag and text in the button
            updateLanguageButton(lang);
            
            // Update the page content
            updateLanguage(lang);
            
            languageDropdown.classList.remove('show');
        });
    });
    
    // Function to update the language button display
    function updateLanguageButton(lang) {
        const selectedOption = document.querySelector(`.language-option[data-lang="${lang}"]`);
        const flagIcon = selectedOption.querySelector('.flag-icon').cloneNode(true);
        const langText = selectedOption.querySelector('.lang-text').textContent;
        
        languageBtn.innerHTML = '';
        languageBtn.appendChild(flagIcon);
        const span = document.createElement('span');
        span.textContent = langText;
        languageBtn.appendChild(span);
    }
    
    // Function to update all page content based on selected language
    function updateLanguage(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        // Update any attributes that need translation (like placeholders, titles, etc.)
        const attributeElements = document.querySelectorAll('[data-i18n-attr]');
        attributeElements.forEach(element => {
            const data = element.getAttribute('data-i18n-attr').split(',');
            const key = data[0];
            const attr = data[1];
            if (translations[lang] && translations[lang][key]) {
                element.setAttribute(attr, translations[lang][key]);
            }
        });
        
        document.documentElement.lang = lang;
    }

    // Binance donation modal
    const binanceBtn = document.querySelector('.crypto');
    const binanceModal = document.getElementById('binance-modal');
    const closeModal = document.querySelector('.close-modal');
    
    binanceBtn.addEventListener('click', function(e) {
        e.preventDefault();
        binanceModal.classList.add('show-modal');
    });
    
    closeModal.addEventListener('click', function() {
        binanceModal.classList.remove('show-modal');
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === binanceModal) {
            binanceModal.classList.remove('show-modal');
        }
    });
});