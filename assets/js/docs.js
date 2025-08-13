// Documentation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSidebarNavigation();
    initMobileMenu();
    initCodeCopy();
    initActiveSectionHighlighting();
    initSmoothScrolling();
    initProTips();
    initDonationSection();
});

// Sidebar Navigation
function initSidebarNavigation() {
    const navTopics = document.querySelectorAll('.nav-topic');
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    
    // Handle topic expansion/collapse (accordion behavior)
    navTopics.forEach(topic => {
        topic.addEventListener('click', function(e) {
            e.preventDefault();
            
            const topicName = this.getAttribute('data-topic');
            const subtopics = this.nextElementSibling;
            
            // Check if this topic is already expanded
            const isCurrentlyExpanded = this.classList.contains('expanded');
            
            // First, collapse all topics
            navTopics.forEach(otherTopic => {
                otherTopic.classList.remove('expanded');
                otherTopic.nextElementSibling.classList.remove('expanded');
            });
            
            // Then, expand the clicked topic only if it wasn't already expanded
            if (!isCurrentlyExpanded) {
                this.classList.add('expanded');
                subtopics.classList.add('expanded');
            }
        });
    });
    
    // Handle subtopic navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Smooth scroll to target
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const sidebar = document.getElementById('sidebar');
                if (sidebar.classList.contains('open')) {
                    sidebar.classList.remove('open');
                }
            }
        });
    });
    
    // Expand the first topic by default
    const firstTopic = navTopics[0];
    if (firstTopic) {
        firstTopic.classList.add('expanded');
        firstTopic.nextElementSibling.classList.add('expanded');
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            
            // Animate hamburger menu
            const spans = this.querySelectorAll('span');
            if (sidebar.classList.contains('open')) {
                // Transform to X
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                // Reset to hamburger
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('open');
                const spans = sidebarToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// Code Copy Functionality
function initCodeCopy() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.closest('.code-block');
            const codeElement = codeBlock.querySelector('code');
            const codeText = codeElement.textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(codeText).then(() => {
                // Show success state
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.classList.add('copied');
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy code:', err);
                // Fallback for older browsers
                fallbackCopyTextToClipboard(codeText, this);
            });
        });
    });
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('copied');
            }, 2000);
        }
    } catch (err) {
        console.error('Fallback copy failed:', err);
    }
    
    document.body.removeChild(textArea);
}

// Active Section Highlighting
function initActiveSectionHighlighting() {
    const sections = document.querySelectorAll('.doc-section, [id]');
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.id;
                
                // Update active nav link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                        
                        // Expand the parent topic if it's collapsed (accordion behavior)
                        const parentTopic = link.closest('.nav-item').querySelector('.nav-topic');
                        const subtopics = link.closest('.subtopics');
                        if (parentTopic && subtopics) {
                            // First, collapse all topics
                            const allTopics = document.querySelectorAll('.nav-topic');
                            allTopics.forEach(topic => {
                                topic.classList.remove('expanded');
                                topic.nextElementSibling.classList.remove('expanded');
                            });
                            
                            // Then expand only the current topic
                            parentTopic.classList.add('expanded');
                            subtopics.classList.add('expanded');
                        }
                    }
                });
            }
        });
    }, {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    });
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    // Check if smooth scrolling is supported
    if ('scrollBehavior' in document.documentElement.style) {
        return; // Native smooth scrolling is available
    }
    
    // Polyfill for older browsers
    const smoothScrollTo = (target, duration = 500) => {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    };
    
    // Override default scroll behavior
    const originalScrollIntoView = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function(options) {
        if (options && options.behavior === 'smooth') {
            smoothScrollTo(this, 500);
        } else {
            originalScrollIntoView.call(this, options);
        }
    };
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            const sidebarToggle = document.getElementById('sidebarToggle');
            if (sidebarToggle) {
                const spans = sidebarToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    }
    
    // Ctrl/Cmd + K to focus search (if implemented)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Focus search input if it exists
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading for code blocks (optional enhancement)
function initLazyLoading() {
    const codeBlocks = document.querySelectorAll('.code-block');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const codeBlock = entry.target;
                // Add any lazy loading logic here if needed
                observer.unobserve(codeBlock);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    codeBlocks.forEach(block => {
        observer.observe(block);
    });
}

// Initialize lazy loading if needed
// initLazyLoading();

// Utility function to get current section
function getCurrentSection() {
    const sections = document.querySelectorAll('.doc-section');
    const scrollPosition = window.scrollY + 100; // Offset for better detection
    
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        
        if (scrollPosition >= sectionTop) {
            return section.id;
        }
    }
    
    return 'getting-started'; // Default
}

// Update URL hash without scrolling
function updateURLHash(hash) {
    if (history.pushState) {
        history.pushState(null, null, hash);
    } else {
        location.hash = hash;
    }
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    const hash = window.location.hash || '#getting-started';
    const targetSection = document.querySelector(hash);
    
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        // Update active nav link
        const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });
    }
});

// Pro Tips Functionality
function initProTips() {
    const proTipsContainer = document.getElementById('proTipsContainer');
    const proTipsToggle = document.getElementById('proTipsToggle');
    const proTipsContent = document.getElementById('proTipsContent');
    const tipSlides = document.querySelectorAll('.tip-slide');
    
    let currentTip = 0;
    let tipInterval;
    
    // Toggle Pro Tips visibility
    if (proTipsToggle && proTipsContainer) {
        proTipsToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            proTipsContainer.classList.toggle('collapsed');
            
            if (proTipsContainer.classList.contains('collapsed')) {
                clearInterval(tipInterval);
            } else {
                startTipRotation();
            }
        });
        
        // Also allow clicking on header to toggle
        proTipsContainer.querySelector('.pro-tips-header').addEventListener('click', function(e) {
            if (e.target !== proTipsToggle) {
                proTipsToggle.click();
            }
        });
    }
    
    // Rotate tips
    function rotateTips() {
        tipSlides.forEach(slide => slide.classList.remove('active'));
        currentTip = (currentTip + 1) % tipSlides.length;
        tipSlides[currentTip].classList.add('active');
    }
    
    function startTipRotation() {
        tipInterval = setInterval(rotateTips, 5000); // 6 seconds
    }
    
    // Start rotation if not collapsed
    if (!proTipsContainer.classList.contains('collapsed')) {
        startTipRotation();
    }
    
    // Pause rotation on hover
    if (proTipsContent) {
        proTipsContent.addEventListener('mouseenter', () => clearInterval(tipInterval));
        proTipsContent.addEventListener('mouseleave', () => {
            if (!proTipsContainer.classList.contains('collapsed')) {
                startTipRotation();
            }
        });
    }
}

// Donation Section Functionality
function initDonationSection() {
    const donationContainer = document.getElementById('donationContainer');
    const donationToggle = document.getElementById('donationToggle');
    const instapayBtn = document.getElementById('instapayBtn');
    const tooltip = document.getElementById('instapayTooltip');
    
    // Toggle donation box
    if (donationToggle && donationContainer) {
        donationToggle.addEventListener('click', function() {
            donationContainer.classList.toggle('collapsed');
        });
    }
    
    // InstaPay button functionality
    if (instapayBtn) {
        instapayBtn.addEventListener('click', function() {
            const phoneNumber = '01115081316';
            
            // Copy to clipboard
            navigator.clipboard.writeText(phoneNumber).then(() => {
                showTooltip();
            }).catch(err => {
                console.error('Failed to copy number:', err);
                // Fallback for older browsers
                fallbackCopyTextToClipboard(phoneNumber);
                showTooltip();
            });
        });
    }
    
    function showTooltip() {
        if (tooltip) {
            // Position tooltip near the button
            const rect = instapayBtn.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - 50 + 'px';
            tooltip.style.top = rect.top - 40 + 'px';
            
            tooltip.classList.add('show');
            
            setTimeout(() => {
                tooltip.classList.remove('show');
            }, 2000);
        }
    }
}
