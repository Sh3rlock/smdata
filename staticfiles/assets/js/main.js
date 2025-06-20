/* ===================================================================
    
    Author          : Valid Theme
    Template Name   : Tekni - IT Solutions & Services Template
    Version         : 1.2
    
* ================================================================= */
(function($) {
	"use strict";

	$(document).ready(function() {


		/* ==================================================
		    # Wow Init
		 ===============================================*/
		var wow = new WOW({
			boxClass: 'wow', // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset: 0, // distance to the element when triggering the animation (default is 0)
			mobile: true, // trigger animations on mobile devices (default is true)
			live: true // act on asynchronously loaded content (default is true)
		});
		wow.init();


		/* ==================================================
		    # Tooltip Init
		===============================================*/
		$('[data-toggle="tooltip"]').tooltip();


		/* ==================================================
		    # Youtube Video Init
		 ===============================================*/
		$('.player').mb_YTPlayer();


		/* ==================================================
		    # imagesLoaded active
		===============================================*/
		$('#gallery-masonary,.blog-masonry').imagesLoaded(function() {

			/* Filter menu */
			$('.mix-item-menu').on('click', 'button', function() {
				var filterValue = $(this).attr('data-filter');
				$grid.isotope({
					filter: filterValue
				});
			});

			/* filter menu active class  */
			$('.mix-item-menu button').on('click', function(event) {
				$(this).siblings('.active').removeClass('active');
				$(this).addClass('active');
				event.preventDefault();
			});

			/* Filter active */
			var $grid = $('#gallery-masonary').isotope({
				itemSelector: '.gallery-item',
				percentPosition: true,
				masonry: {
					columnWidth: '.gallery-item',
				}
			});

			/* Filter active */
			$('.blog-masonry').isotope({
				itemSelector: '.blog-item',
				percentPosition: true,
				masonry: {
					columnWidth: '.blog-item',
				}
			});

		});


		/* ==================================================
		    # Fun Factor Init
		===============================================*/
		$('.timer').countTo();
		$('.fun-fact').appear(function() {
			$('.timer').countTo();
		}, {
			accY: -100
		});


		/* ==================================================
            # Hover Active Init
        ===============================================*/
		$('.hover-active-item').on('mouseenter', function() {
			var $this;
			$this = $(this);
			if ($this.hasClass('active')) {
				$this.addClass('active');
			} else {
				$this.addClass('active');
				$this.siblings().removeClass('active');
			}
		})


		/* ==================================================
		    _Progressbar Init
		 ===============================================*/
		function animateElements() {
			$('.progressbar').each(function() {
				var elementPos = $(this).offset().top;
				var topOfWindow = $(window).scrollTop();
				var percent = $(this).find('.circle').attr('data-percent');
				var animate = $(this).data('animate');
				if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
					$(this).data('animate', true);
					$(this).find('.circle').circleProgress({
						// startAngle: -Math.PI / 2,
						value: percent / 100,
						size: 120,
						thickness: 6,
						lineCap: 'round',
						emptyFill: '#ffffff',
						fill: {
							gradient: ['#1351d8', '#9c00ff']
						}
					}).on('circle-animation-progress', function(event, progress, stepValue) {
						$(this).find('strong').text((stepValue * 100).toFixed(0) + "%");
					}).stop();
				}
			});
		}

		animateElements();
		$(window).scroll(animateElements);


		/* ==================================================
		    # Magnific popup init
		 ===============================================*/
		$(".popup-link").magnificPopup({
			type: 'image',
			// other options
		});

		$(".popup-gallery").magnificPopup({
			type: 'image',
			gallery: {
				enabled: true
			},
			// other options
		});

		$(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
			type: "iframe",
			mainClass: "mfp-fade",
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});

		$('.magnific-mix-gallery').each(function() {
			var $container = $(this);
			var $imageLinks = $container.find('.item');

			var items = [];
			$imageLinks.each(function() {
				var $item = $(this);
				var type = 'image';
				if ($item.hasClass('magnific-iframe')) {
					type = 'iframe';
				}
				var magItem = {
					src: $item.attr('href'),
					type: type
				};
				magItem.title = $item.data('title');
				items.push(magItem);
			});

			$imageLinks.magnificPopup({
				mainClass: 'mfp-fade',
				items: items,
				gallery: {
					enabled: true,
					tPrev: $(this).data('prev-text'),
					tNext: $(this).data('next-text')
				},
				type: 'image',
				callbacks: {
					beforeOpen: function() {
						var index = $imageLinks.index(this.st.el);
						if (-1 !== index) {
							this.goTo(index);
						}
					}
				}
			});
		});


		/* ==================================================
            # Banner Carousel
         ===============================================*/
		const bannerFade = new Swiper(".banner-fade", {
			// Optional parameters
			direction: "horizontal",
			loop: true,
			autoplay: true,
			effect: "fade",
			fadeEffect: {
				crossFade: true
			},
			speed: 2000,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			// If we need pagination
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
			},

			// Navigation arrows
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev"
			}

			// And if we need scrollbar
			/*scrollbar: {
            el: '.swiper-scrollbar',
          },*/
		});


		/* ==================================================
            # Banner Carousel
         ===============================================*/
		const bannerStyleTwo = new Swiper(".banner-style-two-carousel", {
			// Optional parameters
			direction: "horizontal",
			loop: true,
			autoplay: true,
			effect: "fade",
			fadeEffect: {
				crossFade: true
			},
			speed: 2000,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			// If we need pagination
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
			},

			// Navigation arrows
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev"
			}

			// And if we need scrollbar
			/*scrollbar: {
            el: '.swiper-scrollbar',
          },*/
		});


		/* ==================================================
            # Project Carousel
         ===============================================*/
		const projectStyleOneCarousel = new Swiper(".project-style-one-carousel", {
			// Optional parameters
			direction: "horizontal",
			loop: true,
			grabCursor: true,
			autoplay: true,
			// If we need pagination
			pagination: {
				el: '.project-pagination',
				type: 'fraction',
				clickable: true,
			},

			// Navigation arrows
			navigation: {
				nextEl: ".project-button-next",
				prevEl: ".project-button-prev"
			}

			// And if we need scrollbar
			/*scrollbar: {
            el: '.swiper-scrollbar',
          },*/
		});


		/* ==================================================
            # Testimonials Carousel
         ===============================================*/
		const testimonialCarousel = new Swiper(".testimonial-carousel", {
			// Optional parameters
			direction: "horizontal",
			loop: true,
			autoplay: true,

			// And if we need scrollbar
			/*scrollbar: {
            el: '.swiper-scrollbar',
          },*/
		});


		/* ==================================================
            # Testimonail Style Two Carousel
         ===============================================*/
		const testimonialTwo = new Swiper(".testimonial-style-two-carousel", {
			// Optional parameters
			loop: true,
			freeMode: true,
			grabCursor: true,
			slidesPerView: 1,
			spaceBetween: 50,
			autoplay: true,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			breakpoints: {
				768: {
					slidesPerView: 1,
					spaceBetween: 30,
				},
				992: {
					slidesPerView: 2,
					spaceBetween: 30,
				}
			},
		});


		/* ==================================================
            # Testimonial Carousel
         ===============================================*/

		var testimonialThree = new Swiper('.testimonial-style-three-carousel', {
			spaceBetween: 10,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			loop: true,
			loopedSlides: 4
		});
		var testimonialBullet = new Swiper('.testimonial-bullet', {
			spaceBetween: 10,
			slidesPerView: 'auto',
			touchRatio: 0.2,
			slideToClickedSlide: true,
			loop: true,
			loopedSlides: 3,
			centeredSlides: true,
		});
		testimonialThree.controller.control = testimonialBullet;
		testimonialBullet.controller.control = testimonialThree;


		/* ==================================================
            # Testimonail Style Four Carousel
         ===============================================*/
		const testimonialFour = new Swiper(".testimonial-style-four-carousel", {
			// Optional parameters
			loop: true,
			freeMode: true,
			grabCursor: true,
			slidesPerView: 1,
			spaceBetween: 50,
			autoplay: true,
			navigation: {
				nextEl: '.testimonial-four-next',
				prevEl: '.testimonial-four-prev',
			},
			breakpoints: {
				768: {
					slidesPerView: 1,
					spaceBetween: 30,
				},
				992: {
					slidesPerView: 2,
					spaceBetween: 30,
				}
			},
		});


		/* ==================================================
            # Project Two
         ===============================================*/
		const projectTwo = new Swiper(".project-style-two-carousel", {
			// Optional parameters
			loop: true,
			freeMode: true,
			grabCursor: true,
			slidesPerView: 1,
			spaceBetween: 50,
			autoplay: false,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			breakpoints: {
				1024: {
					slidesPerView: 2,
				},
				1367: {
					slidesPerView: 2.3,
				},
			},

			// Navigation arrows
			navigation: {
				nextEl: ".project-two-next",
				prevEl: ".project-two-prev"
			}
		});


		/* ==================================================
            # Team Carousel
         ===============================================*/
		const teamCarousel = new Swiper(".team-carousel", {
			// Optional parameters
			loop: true,
			slidesPerView: 1,
			spaceBetween: 15,
			autoplay: true,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			// Navigation arrows
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev"
			},
			breakpoints: {
				768: {
					slidesPerView: 2,
					spaceBetween: 30,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 30,
				}
			},
		});


		/* ==================================================
            # Services Carousel
         ===============================================*/
		const servicesCarousel = new Swiper(".services-carousel", {
			// Optional parameters
			loop: true,
			freeMode: true,
			grabCursor: true,
			slidesPerView: 1,
			spaceBetween: 30,
			autoplay: true,
			// If we need pagination
			pagination: {
				el: '.services-pagination',
				type: 'fraction',
				clickable: true,
			},
			// Navigation arrows
			navigation: {
				nextEl: ".services-button-next",
				prevEl: ".services-button-prev"
			},
			breakpoints: {
				800: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
				1367: {
					slidesPerView: 3.6,
				},
			},
		});

		/* ==================================================
            # Brand Carousel
         ===============================================*/
		const brandTwoCarousel = new Swiper(".brand-two-carousel", {
			// Optional parameters
			loop: true,
			freeMode: true,
			grabCursor: true,
			slidesPerView: 2,
			spaceBetween: 30,
			autoplay: false,
			breakpoints: {
				800: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
				1250: {
					slidesPerView: 5,
				},
			},
		});

		/* ==================================================
		    Splite Text
		================================================== */
		let text_split = document.querySelector(".split-text");
		if (text_split) {
			const animEls = document.querySelectorAll('.split-text');
			animEls.forEach(el => {
				var splitEl = new SplitText(el, {
					type: "lines, words",
					linesClass: "line"
				});
				var splitTl = gsap.timeline({
					duration: .15,
					ease: 'power4',
					scrollTrigger: {
						trigger: el,
						start: 'top 90%'
					}
				});

				splitTl.from(splitEl.words, {
					yPercent: "100",
					stagger: 0.025,
				});

			});
		}

		/* ==================================================
		    Services Hover JS
		================================================== */
		let image_hover_animation = document.querySelector(".image-hover-wrapper");
		if (image_hover_animation) {
			const link = document.querySelectorAll('.image-hover-item');
			const linkHoverReveal = document.querySelectorAll('.image-hover-wrapper');
			const linkImages = document.querySelectorAll('.image-hover-placeholder');
			for (let i = 0; i < link.length; i++) {
				link[i].addEventListener('mousemove', (e) => {
					linkHoverReveal[i].style.opacity = 1;
					linkHoverReveal[i].style.transform = `translateX(-50px) rotate(-8deg)`;
					linkImages[i].style.transform = 'scale(1, 1)';
				})
				link[i].addEventListener('mouseleave', (e) => {
					linkHoverReveal[i].style.opacity = 0;
					linkHoverReveal[i].style.transform = `translateX(100px) rotate(8deg)`;
					linkImages[i].style.transform = 'scale(0.5, 0.5)';
				})
			}
		}


		/* ===================================================================
			Curosor Hover Init JS
		* ================================================================= */
		let curosr_hover = document.querySelector(".cursor-follower");
		if (curosr_hover) {
			const cursor = document.querySelector(".cursor");
			const follower = document.querySelector(".cursor-follower");
			const card = document.querySelectorAll(".cursor-target");

			let posX = 0,
				posY = 0,
				mouseX = 0,
				mouseY = 0;

			TweenMax.to({}, 0.02, {
				repeat: -1,
				onRepeat: function() {
					posX += (mouseX - posX) / 9;
					posY += (mouseY - posY) / 9;

					TweenMax.set(follower, {
						css: {
							left: posX - 20,
							top: posY - 20
						}
					});

					TweenMax.set(cursor, {
						css: {
							left: mouseX,
							top: mouseY
						}
					});
				}
			});

			document.addEventListener("mousemove", (e) => {
				mouseX = e.pageX;
				mouseY = e.pageY;
			});

			card.forEach((el) => {
				el.addEventListener("mouseenter", () => {
					cursor.classList.add("active");
					follower.classList.add("active");
				});

				el.addEventListener("mouseleave", () => {
					cursor.classList.remove("active");
					follower.classList.remove("active");
				});
			});

		}


		/* ==================================================
		    Contact Form Validations
		================================================== */
		$('.contact-form').each(function() {
			var formInstance = $(this);
			formInstance.submit(function() {

				var action = $(this).attr('action');

				$("#message").slideUp(750, function() {
					$('#message').hide();

					$('#submit')
						.after('<img src="assets/img/ajax-loader.gif" class="loader" />')
						.attr('disabled', 'disabled');

					$.post(action, {
							name: $('#name').val(),
							email: $('#email').val(),
							phone: $('#phone').val(),
							comments: $('#comments').val()
						},
						function(data) {
							document.getElementById('message').innerHTML = data;
							$('#message').slideDown('slow');
							$('.contact-form img.loader').fadeOut('slow', function() {
								$(this).remove()
							});
							$('#submit').removeAttr('disabled');
						}
					);
				});
				return false;
			});
		});

	}); // end document ready function


	/* ==================================================
        Preloader Init
     ===============================================*/
	$(window).on('load', function(event) {
		$('#preloader').delay(500).fadeOut(500);
	});


})(jQuery); // End jQuery