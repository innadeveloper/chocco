//hamburger
let burger  = document.querySelector('.hamburger');
let overlay = document.querySelector('.overlay');
let body = document.querySelector('body');
let links = document.querySelectorAll('.menu-mobile__link');

links.forEach(function(element) {
    element.addEventListener('click', toggleMenu);
})

function toggleMenu() {
    burger.classList.toggle('hamburger--active');
    overlay.classList.toggle('overlay--active');
    body.classList.toggle('body--active-menu');
} 

burger.addEventListener('click', toggleMenu);


//slider
const slider = $('.products').bxSlider({
    pager: false,
    controls: false,
    speed: 800
});

$('.product-slider__arrow--direction--prev').click(e => {
    e.preventDefault();
    slider.goToPrevSlide();
})

$('.product-slider__arrow--direction--next').click(e => {
    e.preventDefault();
    slider.goToNextSlide();
})


//team
const openItem = item => {
    const container = item.closest(".team__item");
    const contentBlock = container.find(".team__content");
    const textBlock = contentBlock.find(".team__content-block");
    const reqHeight = textBlock.height();

    container.addClass("active");
    contentBlock.height(reqHeight);
}

const closeEveryItem = container => {
    const items = container.find('.team__content');
    const itemContainer = container.find(".team__item");

    itemContainer.removeClass("active");
    items.height(0);
}

$('.team__title').click(e => {
    const $this = $(e.currentTarget);
    const container = $this.closest('.team');
    const elemContainer = $this.closest(".team__item");

    if (elemContainer.hasClass("active")) {
        closeEveryItem(container);
    }   else {
        closeEveryItem(container);
        openItem($this);
    }

}); 

//horiz. accordion 
const mesureWidth = (item) => {
    let reqItemWidth = 0;

    const screenWidth = $(window).width();
    const container = item.closest(".products-menu");
    const titlesBlocks = container.find(".products-menu__title");
    const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

    const textContainer = item.find(".products-menu__container");
    const paddingLeft = parseInt(textContainer.css("padding-left"));
    const paddingRight = parseInt(textContainer.css("padding-right"));

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
        reqItemWidth = screenWidth - titlesWidth;
    } else {
        reqItemWidth = 500;
    }

    return {
        container: reqItemWidth,
        textContainer: reqItemWidth - paddingRight - paddingLeft
    }
};

const closeEveryItemInContainer = (container) => {
    const items = container.find(".products-menu__item");
    const content = container.find(".products-menu__content");

    items.removeClass("active");
    content.width(0);
};

const openItemNeu = (item) => {
    const hiddenContent = item.find(".products-menu__content");
    const reqWidth = mesureWidth(item);
    const textBlock = item.find(".products-menu__container");

    item.addClass("active");
    hiddenContent.width(reqWidth.container);
    textBlock.width(reqWidth.textContainer);
};

$(".products-menu__title").on("click", (e) => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const item = $this.closest(".products-menu__item");
    const itemOpened = item.hasClass("active");
    const container = $this.closest(".products-menu");

    if (itemOpened) {
        closeEveryItemInContainer(container)
    } else {
        closeEveryItemInContainer(container)
        openItemNeu(item);
    }    
}); 

$(".products-menu__close").on("click", e => {
    e.preventDefault();

    closeEveryItemInContainer($('.products-menu'));
});
 

//reviews-switcher plugin
class SlideShow {
    constructor(selector, config = {}) {
        this.target = document.querySelector(selector)
        this.content = this.target.querySelector('[data-show-content]')
        this.items = Array.from(this.content.children)
        this.nav = this.target.querySelector('[data-show-nav]') 

        this.setPositionItems()
        this.setAnimation(config.animate)
        this.setActiveSlide(config.active)  

        this.nav.addEventListener('click', (event) => {
            event.preventDefault()

            const currentNav = event.target.closest('[data-show-link]')

            if (currentNav) {
                this.setActiveSlide(parseInt(currentNav.dataset.showLink))
            }
        })
    }

    setAnimation(config = {}) {
        this.items.forEach((item) => {
            item.style.transition = `opacity ${config.time || 1}s ${config.mode || 'ease'}`
        })
    }

    setPositionItems() {
        this.content.style.position = 'relative'

        for (const item of this.items) {
            item.style.position = 'absolute'
            item.style.top = 0
            item.style.opacity = 0
        }
    }

    setActiveSlide(index = 1) {
        this.items.forEach((item, i) => {
            if (index === i + 1) {
                item.style.position = 'relative'
                item.style.opacity = 1
                item.style.zIndex = 20
            } else {
                item.style.position = 'absolute'
                item.style.opacity = 0
                item.style.zIndex = 0
            }
        }) 

        this.setActiveNav(index)
    } 

    setActiveNav(index) {
        for (const nav of this.nav.children) {
            if (nav === this.nav.children[index - 1]) {
                nav.classList.add(`${nav.classList[0]}--active`)
            } else {
                nav.classList.remove(`${nav.classList[0]}--active`)
            }  
        }
    }   

}

const slide = new SlideShow('.slide-show', {
    active: 1,
    animate: {
        time: 2,
        mode: 'ease-in'
    }
})
 
//console.log(slide)

/* setTimeout(() => {
    slide.setActiveSlide(3)
}, 3000) */


//player
let player;
const playerContainer = $(".player");
 
let eventsInit = () => {
 $(".player__start").click(e => {
   e.preventDefault();
 
   if (playerContainer.hasClass("paused")) {
     player.pauseVideo();
   } else {
     player.playVideo();
   }
 });
 
 $(".player__playback").click(e => {
   const bar = $(e.currentTarget);
   const clickedPosition = e.originalEvent.layerX;
   const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
   const newPlaybackPositionSec =
     (player.getDuration() / 100) * newButtonPositionPercent;
 
   $(".player__playback-button").css({
     left: `${newButtonPositionPercent}%`
   });
 
   player.seekTo(newPlaybackPositionSec);
 });
 
 $(".player__splash").click(e => {
   player.playVideo();
 })
};
 
const formatTime = timeSec => {
 const roundTime = Math.round(timeSec);
 
 const minutes = addZero(Math.floor(roundTime / 60));
 const seconds = addZero(roundTime - minutes * 60);
 
 function addZero(num) {
   return num < 10 ? `0${num}` : num;
 }
 
 return `${minutes} : ${seconds}`;
};
 
const onPlayerReady = () => {
 let interval;
 const durationSec = player.getDuration();
 
 $(".player__duration-estimate").text(formatTime(durationSec));
 
 if (typeof interval !== "undefined") {
   clearInterval(interval);
 }
 
 interval = setInterval(() => {
   const completedSec = player.getCurrentTime();
   const completedPercent = (completedSec / durationSec) * 100;
 
   $(".player__playback-button").css({
     left: `${completedPercent}%`
   });
 
   $(".player__duration-completed").text(formatTime(completedSec));
 }, 1000);
};
 
const onPlayerStateChange = event => {
 /*
   -1 (воспроизведение видео не начато)
   0 (воспроизведение видео завершено)
   1 (воспроизведение)
   2 (пауза)
   3 (буферизация)
   5 (видео подают реплики).
 */
 switch (event.data) {
   case 1:
     playerContainer.addClass("active");
     playerContainer.addClass("paused");
     break;
 
   case 2:
     playerContainer.removeClass("active");
     playerContainer.removeClass("paused");
     break;
 }
};
 
function onYouTubeIframeAPIReady() {
 player = new YT.Player("yt-player", {
   height: "405",
   width: "660",
   videoId: "gd-P9FH2WQ4",
   events: {
     onReady: onPlayerReady,
     onStateChange: onPlayerStateChange
   },
   playerVars: {
     controls: 0,
     disablekb: 0,
     showinfo: 0,
     rel: 0,
     autoplay: 0,
     modestbranding: 0
   }
 });
}
 
eventsInit();


//form & modal
const validateFields = (form, fieldsArray) => {

    fieldsArray.forEach((field) => {
        field.removeClass("input-error");
        if (field.val().trim() === "") {
            field.addClass("input-error");
        }
    }); 

    const errorFields = form.find(".input-error");

    return errorFields.length === 0;
}

$('.form').submit((e) => {
    e.preventDefault();

    const form = $(e.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']"); 

    const modal = $("#modal");
    const content = modal.find(".modal__content");

    modal.removeClass("error-modal");

    const isValid = validateFields(form, [name, phone, comment, to]);

    if (isValid) {
        const request = $.ajax({
            url:"https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val(),
            }, 
           
            error: data => {               
            }
        }); 

        request.done((data) => {
            content.text(data.message); 
            $(".form")[0].reset();
        });

        request.fail(data => {
            const message = data.responseJSON.message;
            content.text(message);
            modal.addClass("error-modal");
        });

        request.always(() => {
            $.fancybox.open({
                src: "#modal",
                type: "inline",
            });
        })
    }        
});

$(".app-submit-btn").click(e => {
    e.preventDefault ();

    $.fancybox.close();
})

//map
let myMap;
const init = () => {
 myMap = new ymaps.Map("map", {
   center: [59.93916998692174, 30.309015096732622],
   zoom: 11,
   controls: [],
 });
 
 let coords = [
     [59.94554327989287, 30.38935262114668],
     [59.91142323563909, 30.50024587065841],
     [59.88693161784606, 30.319658102103713],
     [59.97033574821672, 30.315194906302924],
   ],
   myCollection = new ymaps.GeoObjectCollection({}, {
     draggable: false,
     iconLayout: 'default#image',
     iconImageHref: './img/icons/marker.svg',
     iconImageSize: [46, 57],
     iconImageOffset: [-35, -52]
   });
 
 for (let i = 0; i < coords.length; i++) {
   myCollection.add(new ymaps.Placemark(coords[i]));
 }
 
 myMap.geoObjects.add(myCollection);
 
 myMap.behaviors.disable('scrollZoom');
};
 
ymaps.ready(init);

//sections 
const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu");
const menuItems = sideMenu.find(".fixed-menu__item");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = sectionEq => {
    const position = sectionEq * -100;

    if (isNaN(position)) {
        console.error("передано не врное значение в countSectionPosition");
        return 0;
    }

    return position;
  };

const changeMenuThemeForSection = (sectionEq) => {
    const currentSection = sections.eq(sectionEq);
    const menuTheme = currentSection.attr("data-sidemenu-theme");
    const activeClass = "fixed-menu--shadowed";

    if (menuTheme === "black") {
        sideMenu.addClass(activeClass);
    } else {
        sideMenu.removeClass(activeClass);
    }
}

const resetActiveClassForItem = (items, itemEq, activeClass) => {
    items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
};

const perfomTransition = sectionEq => {
    if (inScroll) return;

    const transitionOver = 1000;
    const mouseInertionOver = 300;

    inScroll = true;

    const position = countSectionPosition(sectionEq);

    changeMenuThemeForSection(sectionEq);

    display.css({
      transform: `translateY(${position}%)`
    });

    resetActiveClassForItem(sections, sectionEq, "active");

    setTimeout(() => {
        inScroll = false;
  
        resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active");
  
      }, transitionOver + mouseInertionOver);
    };

const viewportScroller = () => {
    const activeSection = sections.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev(); 
    
    return {
        next() {
          if (nextSection.length) {
            perfomTransition(nextSection.index());
          }
        },
        prev() {
          if (prevSection.length) {
            perfomTransition(prevSection.index());
          }
        }
      };
    };

$(window).on("wheel", e => {
    const deltaY = e.originalEvent.deltaY;
    const scroller = viewportScroller();
    
    if (deltaY > 0) {
        scroller.next();
    }
    
    if (deltaY < 0) {
        scroller.prev();
    };
});

$(window).on("keydown", e => {
    const tagName = e.target.tagName.toLowerCase();
    const userTypingInInputs = tagName === "input" || tagName === "textarea";
    const scroller = viewportScroller();

    if (userTypingInInputs) return;

    switch (e.keyCode) {
        case 38: 
            scroller.prev();
            break;
  
        case 40:
            scroller.next();
            break;
    };
});

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click((e) => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`);
    
    perfomTransition(reqSection.index());

});

//https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
if (isMobile) {  
    $("body").swipe({
      swipe: function (event, direction) {
          const scroller = viewportScroller();
          let scrollDirection = "";
          
          if (direction === "up") scrollDirection = "next";
          if (direction === "down") scrollDirection = "prev";
          
          scroller[scrollDirection]();
      },
    });
}

 




