$(document).ready(function ($) {
    // Show/hide clear button and clear input on click
    $(document).on('input', '.form-input', function() {
        var $clearBtn = $(this).siblings('.search-clear-btn');
        if ($(this).val()) {
            $clearBtn.show();
        } else {
            $clearBtn.hide();
        }
    });
    $(document).on('click', '.search-clear-btn', function() {
        var $input = $(this).siblings('.form-input');
        $input.val('').trigger('input').focus();
        $(this).hide();
    });
    // Navbar search functionality
    $(document).on('submit', '.header-search-form', function(e) {
        e.preventDefault();
        var query = $(this).find('.form-input').val().toLowerCase().trim();
        if (!query) return;
        // Search for section headings or menu items
        var found = false;
        // Search by section id
        $("section[id], div[id]").each(function() {
            var id = $(this).attr('id');
            if (id && id.toLowerCase().includes(query)) {
                $('html, body').animate({ scrollTop: $(this).offset().top - 80 }, 600);
                found = true;
                return false;
            }
        });
        // Search by heading text
        if (!found) {
            $("h1, h2, h3, h4, h5, h6").each(function() {
                if ($(this).text().toLowerCase().includes(query)) {
                    $('html, body').animate({ scrollTop: $(this).offset().top - 80 }, 600);
                    found = true;
                    return false;
                }
            });
        }
        if (!found) {
            // Show not found message
            if ($('#search-toast').length) $('#search-toast').remove();
            $('body').append("<div id='search-toast' style='position:fixed;top:30px;right:30px;background:#c00;color:#fff;padding:10px 20px;border-radius:6px;z-index:9999;'>No results found</div>");
            setTimeout(function(){ $('#search-toast').fadeOut(400,function(){ $(this).remove(); }); }, 1200);
        }
    });
    // --- Cart CRUD System ---
    // Load cart from localStorage if available
    let cart = {};
    function loadCart() {
        let c = localStorage.getItem('cart');
        cart = c ? JSON.parse(c) : {};
    }
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    loadCart();
    function updateCartNumber() {
    let total = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
    $(".cart-number").text(total);
    saveCart();
    }

    function showCartModal() {
        let cartHtml = '<div id="cart-modal" class="cart-modal" style="position:fixed;top:80px;right:30px;z-index:9999;background:#fff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.2);padding:20px;width:320px;max-height:400px;overflow:auto;">';
        cartHtml += '<h4 style="margin-bottom:15px;">Your Cart</h4>';
        if (Object.keys(cart).length === 0) {
            cartHtml += '<p>Your cart is empty.</p>';
        } else {
            cartHtml += '<ul style="list-style:none;padding:0;">';
            for (let key in cart) {
                let item = cart[key];
                cartHtml += `<li style="margin-bottom:12px;border-bottom:1px solid #eee;padding-bottom:8px;">
                    <strong>${item.name}</strong> <br>
                    Quantity: <button class="cart-dec" data-key="${key}" style="margin:0 4px;">-</button> <span>${item.qty}</span> <button class="cart-inc" data-key="${key}" style="margin:0 4px;">+</button>
                    <button class="cart-remove" data-key="${key}" style="margin-left:10px;color:#c00;background:none;border:none;">Remove</button>
                </li>`;
            }
            cartHtml += '</ul>';
        }
        cartHtml += '<button id="close-cart-modal" style="margin-top:10px;float:right;">Close</button>';
        cartHtml += '</div>';
        $("body").append(cartHtml);
    }

    // Remove modal if open
    $(document).on('click', '#close-cart-modal', function () {
        $('#cart-modal').remove();
    });

    // Show cart modal on cart icon click
    $(document).on('click', '.header-cart', function () {
        $('#cart-modal').remove();
        showCartModal();
    });

    // Add to cart button handler
    $(document).on('click', '.dish-add-btn', function () {
        let dishBox = $(this).closest('.dish-box');
        let name = dishBox.find('.dish-title .h3-title').text().trim();
        if (!name) return;
        if (cart[name]) {
            cart[name].qty++;
        } else {
            cart[name] = { name: name, qty: 1 };
        }
        updateCartNumber();
        saveCart();
        // Show quick add message
        $("body").append(`<div id='cart-toast' style='position:fixed;top:30px;right:30px;background:#28a745;color:#fff;padding:10px 20px;border-radius:6px;z-index:9999;'>Added: ${name}</div>`);
        setTimeout(function(){ $('#cart-toast').fadeOut(400,function(){ $(this).remove(); }); }, 1200);
    });

    // Increment item in cart
    $(document).on('click', '.cart-inc', function () {
    let key = $(this).data('key');
    cart[key].qty++;
    updateCartNumber();
    saveCart();
    $('#cart-modal').remove();
    showCartModal();
    });

    // Decrement item in cart
    $(document).on('click', '.cart-dec', function () {
        let key = $(this).data('key');
        if (cart[key].qty > 1) {
            cart[key].qty--;
        } else {
            delete cart[key];
        }
        updateCartNumber();
        saveCart();
        $('#cart-modal').remove();
        showCartModal();
    });

    // Remove item from cart
    $(document).on('click', '.cart-remove', function () {
    let key = $(this).data('key');
    delete cart[key];
    updateCartNumber();
    saveCart();
    $('#cart-modal').remove();
    showCartModal();
    });
    // Cart logic
    // Remove duplicate cartCount logic and use actual cart quantity
    function updateCartNumber() {
        let total = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
        if (total > 0) {
            $(".cart-number").text(total).show();
        } else {
            $(".cart-number").hide();
        }
        saveCart();
    }
    "use strict";


    var book_table = new Swiper(".book-table-img-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,
        effect: "coverflow",
        coverflowEffect: {
            rotate: 3,
            stretch: 2,
            depth: 100,
            modifier: 5,
            slideShadows: false,
        },
        loopAdditionSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    var team_slider = new Swiper(".team-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1.2,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
        },
    });

    jQuery(".filters").on("click", function () {
        jQuery("#menu-dish").removeClass("bydefault_show");
    });
    $(function () {
        var filterList = {
            init: function () {
                $("#menu-dish").mixItUp({
                    selectors: {
                        target: ".dish-box-wp",
                        filter: ".filter",
                    },
                    animation: {
                        effects: "fade",
                        easing: "ease-in-out",
                    },
                    load: {
                        filter: ".all, .breakfast, .lunch, .dinner",
                    },
                });
            },
        };
        filterList.init();
    });

    jQuery(".menu-toggle").click(function () {
        jQuery(".main-navigation").toggleClass("toggled");
    });

    jQuery(".header-menu ul li a").click(function () {
        jQuery(".main-navigation").removeClass("toggled");
    });

    gsap.registerPlugin(ScrollTrigger);

    var elementFirst = document.querySelector('.site-header');
    ScrollTrigger.create({
        trigger: "body",
        start: "30px top",
        end: "bottom bottom",

        onEnter: () => myFunction(),
        onLeaveBack: () => myFunction(),
    });

    function myFunction() {
        elementFirst.classList.toggle('sticky_head');
    }

    var scene = $(".js-parallax-scene").get(0);
    var parallaxInstance = new Parallax(scene);


});


jQuery(window).on('load', function () {
    $('body').removeClass('body-fixed');

    //activating tab of filter
    let targets = document.querySelectorAll(".filter");
    let activeTab = 0;
    let old = 0;
    let dur = 0.4;
    let animation;

    for (let i = 0; i < targets.length; i++) {
        targets[i].index = i;
        targets[i].addEventListener("click", moveBar);
    }

    // initial position on first === All 
    gsap.set(".filter-active", {
        x: targets[0].offsetLeft,
        width: targets[0].offsetWidth
    });

    function moveBar() {
        if (this.index != activeTab) {
            if (animation && animation.isActive()) {
                animation.progress(1);
            }
            animation = gsap.timeline({
                defaults: {
                    duration: 0.4
                }
            });
            old = activeTab;
            activeTab = this.index;
            animation.to(".filter-active", {
                x: targets[activeTab].offsetLeft,
                width: targets[activeTab].offsetWidth
            });

            animation.to(targets[old], {
                color: "#0d0d25",
                ease: "none"
            }, 0);
            animation.to(targets[activeTab], {
                color: "#fff",
                ease: "none"
            }, 0);

        }

    }
});