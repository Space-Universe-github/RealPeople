// Binary Rain Effect
function createBinaryRain() {
  const container = document.createElement('div');
  container.className = 'binary-rain';
  document.body.appendChild(container);

  function createBinary() {
    const binary = document.createElement('div');
    binary.className = 'binary';
    binary.style.left = `${Math.random() * 100}vw`;
    binary.style.animationDuration = `${Math.random() * 2 + 1}s`;
    binary.style.opacity = Math.random();
    binary.textContent = Math.random() > 0.5 ? '0' : '1';
    
    container.appendChild(binary);
    
    const duration = Math.random() * 2000 + 1000;
    binary.animate([
      { transform: 'translateY(-20px)', opacity: 1 },
      { transform: 'translateY(100vh)', opacity: 0 }
    ], {
      duration,
      easing: 'linear'
    }).onfinish = () => {
      binary.remove();
    };
  }

  setInterval(createBinary, 100);
}

// Enhanced Loading Animation
document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen');
  const logo = loadingScreen.querySelector('.logo');
  
  // Add loading text
  const loadingText = document.createElement('div');
  loadingText.className = 'loading-text';
  loadingText.textContent = 'Loading...';
  loadingScreen.appendChild(loadingText);

  // Start binary rain
  createBinaryRain();

  // Glitch effect on logo
  function glitchLogo() {
    const glitchDuration = 100;
    const glitches = 3;
    
    for (let i = 0; i < glitches; i++) {
      setTimeout(() => {
        logo.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
        logo.style.filter = `hue-rotate(${Math.random() * 360}deg) blur(${Math.random() * 2}px)`;
      }, i * glitchDuration);
    }
    
    setTimeout(() => {
      logo.style.transform = '';
      logo.style.filter = '';
    }, glitches * glitchDuration);
  }

  // Trigger glitch effect periodically
  const glitchInterval = setInterval(glitchLogo, 2000);

  // Hide loading screen after animation
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      clearInterval(glitchInterval);
    }, 500);
  }, 5000);
});

// Intro sequence handler with safer audio handling
document.addEventListener('DOMContentLoaded', () => {
  const introSequence = document.getElementById('intro-sequence');
  const whisperAudio = document.getElementById('whisper-audio');
  
  // Start intro animations
  setTimeout(() => {
    introSequence.classList.add('hide-intro');
    setTimeout(() => {
      introSequence.style.display = 'none';
    }, 500);
  }, 5000);

  // Play audio only after user interaction
  const playAudioAfterInteraction = () => {
    whisperAudio.play().catch(error => {
      console.log('Audio playback prevented:', error);
    });
    // Remove the event listeners after first interaction
    document.removeEventListener('click', playAudioAfterInteraction);
    document.removeEventListener('keydown', playAudioAfterInteraction);
    document.removeEventListener('touchstart', playAudioAfterInteraction);
  };

  // Add event listeners for user interaction
  document.addEventListener('click', playAudioAfterInteraction);
  document.addEventListener('keydown', playAudioAfterInteraction);
  document.addEventListener('touchstart', playAudioAfterInteraction);
});

// Smooth scroll functionality
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-target], a[href^="#"]').forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = element.getAttribute('data-target') || element.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Add click handler for scroll indicator
document.addEventListener('DOMContentLoaded', () => {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = scrollIndicator.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }
});

// Parallax effect
window.addEventListener('scroll', () => {
  const parallaxBg = document.querySelector('.parallax-bg');
  const scrolled = window.pageYOffset;
  parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Intersection Observer for fade-in elements
const fadeInElements = document.querySelectorAll('.fade-in');
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeInElements.forEach(element => {
  fadeInObserver.observe(element);
});

// Tooltip functionality
const tooltipElements = document.querySelectorAll('[data-tooltip]');

tooltipElements.forEach(element => {
  element.addEventListener('mouseenter', e => {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = element.dataset.tooltip;
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    tooltip.style.top = `${rect.top - tooltipRect.height - 10}px`;
    tooltip.style.left = `${rect.left + (rect.width - tooltipRect.width) / 2}px`;
  });

  element.addEventListener('mouseleave', () => {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) tooltip.remove();
  });
});

// Random glitch effect
const glitchElements = document.querySelectorAll('.glitch-text');

function triggerRandomGlitch() {
  const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
  randomElement.style.animation = 'none';
  randomElement.offsetHeight; // Trigger reflow
  randomElement.style.animation = '';
  
  setTimeout(triggerRandomGlitch, Math.random() * 3000 + 2000);
}

triggerRandomGlitch();