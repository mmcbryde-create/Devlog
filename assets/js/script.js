document.addEventListener('DOMContentLoaded', () => {
  // Smooth Scrolling for Navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Modal Handling
  const modal = document.getElementById('inquiryModal');
  const btn = document.getElementById('inquiryBtn');
  const span = document.querySelector('.close-modal');

  if (btn && modal) {
    btn.onclick = () => {
      modal.style.display = "flex";
      // Small timeout to allow CSS transition to catch display change
      setTimeout(() => {
        modal.classList.add('show');
      }, 10);
    };
  }

  if (span && modal) {
    span.onclick = () => {
      closeModal();
    };
  }

  window.onclick = (event) => {
    if (event.target == modal) {
      closeModal();
    }
  };

  function closeModal() {
    if (modal) {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    }
  }

  // Form Submission Handling
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;

      submitBtn.innerText = 'Sending...';
      submitBtn.disabled = true;

      const data = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          submitBtn.innerText = 'Sent!';
          form.reset();
          // Close modal after short delay
          setTimeout(() => {
            closeModal();
            // Scroll to top as requested
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
          }, 1500);
        } else {
          submitBtn.innerText = 'Error!';
          alert("Oops! There was a problem submitting your form");
          submitBtn.disabled = false;
          setTimeout(() => {
            submitBtn.innerText = originalText;
          }, 2000);
        }
      } catch (error) {
        submitBtn.innerText = 'Error!';
        console.error('Error:', error);
        alert("Oops! There was a problem submitting your form");
        submitBtn.disabled = false;
        setTimeout(() => {
          submitBtn.innerText = originalText;
        }, 2000);
      }
    });
  }

  // Optional: Simple Scroll Animation Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, {
    threshold: 0.1
  });

  // Add observer to sections if needed in future for fade effects
  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });
  // Read More Logic
  const readMoreBtn = document.getElementById('readMoreBtn');
  const moreText = document.getElementById('more-text');
  const dots = document.getElementById('dots');

  if (readMoreBtn && moreText) {
    readMoreBtn.addEventListener('click', () => {
      const isHidden = !moreText.classList.contains('show');

      if (isHidden) {
        moreText.style.display = "block";
        // Small delay to allow CSS transition
        setTimeout(() => {
          moreText.classList.add('show');
        }, 10);
        if (dots) dots.style.display = "none";
        readMoreBtn.innerText = "Read Less";
      } else {
        moreText.classList.remove('show');
        setTimeout(() => {
          moreText.style.display = "none";
        }, 500); // Wait for fade out
        if (dots) dots.style.display = "inline";
        readMoreBtn.innerText = "Read More";
      }
    });
  }

  // --- Custom Cursor Logic ---
  const cursor = document.querySelector(".cursor");
  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });
  }

  // --- Sparkle Effect Logic ---
  function createSparkle(x, y) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = x + "px";
    sparkle.style.top = y + "px";
    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 600);
  }

  document.addEventListener("mousemove", function (e) {
    // Throttle sparkles slightly for performance if needed, or keep simple
    createSparkle(e.pageX, e.pageY);
  });

  // --- Tab Navigation Logic (Achievements Page) ---
  const tabs = document.querySelectorAll('.achievement-tab');
  if (tabs.length > 0) {
    tabs.forEach(tab => {
      tab.addEventListener('click', function () {
        const category = this.getAttribute('data-category');

        // Remove active class from all tabs
        document.querySelectorAll('.achievement-tab').forEach(t => t.classList.remove('active'));

        // Remove active class from all sections
        document.querySelectorAll('.achievement-section').forEach(section => section.classList.remove('active'));

        // Add active class to clicked tab
        this.classList.add('active');

        // Add active class to corresponding section
        const targetSection = document.getElementById(category + '-content');
        if (targetSection) {
          targetSection.classList.add('active');
        }
      });
    });
  }

  // Hero Slideshow Logic (Supports Multiple Instances)
  const slideshowContainers = document.querySelectorAll('.slideshow-container');

  if (slideshowContainers.length > 0) {
    const images = [
      'assets/images/IMG_7576.JPG',
      'assets/images/IMG_7609.JPG',
      'assets/images/IMG_7717 (1).JPG',
      'assets/images/IMG_8420.JPEG',
      'assets/images/Maceo McBryde-2 (3).jpg',
      'assets/images/Firstheadshot.jpeg',
      'assets/images/IMG_7628.png',
      'assets/images/IMG_7750.JPG',
      'assets/images/pic.jpg',
      'assets/images/IMG_7583 (1).png'
    ];

    slideshowContainers.forEach(container => {
      // Create image elements for this container
      images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('slide');
        if (index === 0) img.classList.add('active');
        container.appendChild(img);
      });

      // Cycle images for this container
      let currentSlide = 0;
      const slides = container.querySelectorAll('.slide');

      if (slides.length > 0) {
        setInterval(() => {
          slides[currentSlide].classList.remove('active');
          currentSlide = (currentSlide + 1) % slides.length;
          slides[currentSlide].classList.add('active');
        }, 4000);
      }
    });
  }
});
