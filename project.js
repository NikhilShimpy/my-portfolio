// Mobile menu toggle (using jQuery like your home page)
$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

// View More/Less functionality
document.querySelectorAll('.view-more-btn').forEach(button => {
    button.addEventListener('click', function() {
        const projectDetails = this.parentElement.querySelector('.project-full-details');
        const isExpanded = projectDetails.classList.contains('active');
        
        if (isExpanded) {
            // Collapse the details
            projectDetails.classList.remove('active');
            this.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
        } else {
            // Expand the details
            projectDetails.classList.add('active');
            this.innerHTML = 'Collapse <i class="fas fa-chevron-up"></i>';
        }
    });
});

// Image slider functionality
document.querySelectorAll('.project-card').forEach(card => {
    const slider = card.querySelector('.project-image-slider');
    const images = slider.querySelectorAll('img');
    const prevBtn = card.querySelector('.prev-btn');
    const nextBtn = card.querySelector('.next-btn');
    
    let currentIndex = 0;
    
    // Show initial image
    if (images.length > 0) {
        images[currentIndex].classList.add('active');
    }
    
    // Function to show specific slide
    function showSlide(index) {
        // Hide all images
        images.forEach(img => img.classList.remove('active'));
        
        // Adjust index if out of bounds
        if (index >= images.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = images.length - 1;
        } else {
            currentIndex = index;
        }
        
        // Show current image
        images[currentIndex].classList.add('active');
    }
    
    // Next button event
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentIndex + 1);
        });
    }
    
    // Previous button event
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentIndex - 1);
        });
    }
});

// Auto-truncate text that overflows
function checkTextOverflow() {
  document.querySelectorAll('.text-content').forEach(container => {
    const shortText = container.querySelector('.project-desc-short');
    const fullDetails = container.querySelector('.project-full-details');
    const viewMoreBtn = container.parentElement.querySelector('.view-more-btn');
    
    // Don't reset if already expanded by user
    if (!fullDetails.classList.contains('active')) {
      shortText.style.display = '-webkit-box';
      viewMoreBtn.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
    }
    
    // Check if text is truncated
    if (shortText.scrollHeight > shortText.offsetHeight) {
      // Text is truncated, show read more button
      viewMoreBtn.style.display = 'block';
    } else {
      // Text is not truncated, check if there are details to show
      if (fullDetails.children.length > 0) {
        viewMoreBtn.style.display = 'block';
      } else {
        viewMoreBtn.style.display = 'none';
      }
    }
  });
}

// Run on load and resize
window.addEventListener('load', checkTextOverflow);
window.addEventListener('resize', checkTextOverflow);