// Mobile menu toggle
$(document).ready(function () {
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }

        // Scroll spy
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

    // Smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 70, // Account for smaller header
        }, 500, 'linear')
    });

    // View More/Less functionality
    $('.view-more-btn').on('click', function() {
        const projectDetails = $(this).siblings('.text-content').find('.project-full-details');
        const isExpanded = projectDetails.hasClass('active');
        
        if (isExpanded) {
            // Collapse the details
            projectDetails.removeClass('active');
            $(this).html('Read More <i class="fas fa-chevron-down"></i>');
        } else {
            // Expand the details
            projectDetails.addClass('active');
            $(this).html('Read Less <i class="fas fa-chevron-up"></i>');
        }
    });

    // Image slider functionality
    $('.project-card').each(function() {
        const slider = $(this).find('.project-image-slider');
        const images = slider.find('img');
        const prevBtn = $(this).find('.prev-btn');
        const nextBtn = $(this).find('.next-btn');
        
        let currentIndex = 0;
        
        // Show initial image
        if (images.length > 0) {
            images.eq(currentIndex).addClass('active');
        }
        
        // Function to show specific slide
        function showSlide(index) {
            // Hide all images
            images.removeClass('active');
            
            // Adjust index if out of bounds
            if (index >= images.length) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = images.length - 1;
            } else {
                currentIndex = index;
            }
            
            // Show current image
            images.eq(currentIndex).addClass('active');
        }
        
        // Next button event
        if (nextBtn.length > 0) {
            nextBtn.on('click', function() {
                showSlide(currentIndex + 1);
            });
        }
        
        // Previous button event
        if (prevBtn.length > 0) {
            prevBtn.on('click', function() {
                showSlide(currentIndex - 1);
            });
        }
    });

    // Auto-truncate text that overflows
    function checkTextOverflow() {
        $('.text-content').each(function() {
            const shortText = $(this).find('.project-desc-short');
            const fullDetails = $(this).find('.project-full-details');
            const viewMoreBtn = $(this).siblings('.view-more-btn');
            
            // Don't reset if already expanded by user
            if (!fullDetails.hasClass('active')) {
                shortText.css('display', '-webkit-box');
                viewMoreBtn.html('Read More <i class="fas fa-chevron-down"></i>');
            }
            
            // Check if text is truncated
            if (shortText[0].scrollHeight > shortText[0].offsetHeight) {
                // Text is truncated, show read more button
                viewMoreBtn.show();
            } else {
                // Text is not truncated, check if there are details to show
                if (fullDetails.children().length > 0) {
                    viewMoreBtn.show();
                } else {
                    viewMoreBtn.hide();
                }
            }
        });
    }

    // Run on load and resize
    $(window).on('load resize', checkTextOverflow);
});

// add back 
// Smooth scroll to work section when coming from home page
$(document).ready(function() {
  // Check if URL has hash targeting work section
  if (window.location.hash === '#work') {
    setTimeout(function() {
      $('html, body').animate({
        scrollTop: $('#projects').offset().top - 70
      }, 800);
    }, 100);
  }
  
  // Optional: Add animation to the button
  setTimeout(function() {
    $('.back-to-home-btn').addClass('pulse');
  }, 2000);
  
  // Optional: Add pulse animation
  setInterval(function() {
    $('.back-to-home-btn').toggleClass('pulse');
  }, 4000);
});