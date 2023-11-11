"use strict"

// ------------- preloader -------------
document.addEventListener("DOMContentLoaded", function () {
  var preloader = document.getElementById("preloader")
  setTimeout(function () {
    preloader.style.opacity = "0"
  }, 1500)
  preloader.addEventListener("transitionend", function () {
    preloader.style.display = "none"
  })
})
// ------------- END OF preloader -------------

// ------------- shrinking header on scroll -------------
// Get the header element
const headerElement = document.querySelector(".header")

// Define the callback function for the IntersectionObserver
const callback = function (entries, observer) {
  if (entries[0].isIntersecting) {
    headerElement.classList.remove("header--scrolled")
  } else {
    headerElement.classList.add("header--scrolled")
  }
}

// Create an IntersectionObserver instance with the callback function
const headerObserver = new IntersectionObserver(callback)

// Add error handling in case the header element is not found
if (headerElement) {
  // Observe the header element for changes
  headerObserver.observe(headerElement)
} else {
  console.error("Header element not found.")
}
// ------------- END OF shrinking header on scroll -------------

// ------------- hamburger menu -------------
const iconMenu = document.querySelector(".icon-menu")
const menuBody = document.querySelector(".menu__body")
const menuLinks = document.querySelectorAll(".menu__link")
const menuSublinks = document.querySelectorAll(".menu__sublink")
const headerActions = document.querySelector(".header__actions")

if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    toggleMenu()
  })

  //event handlers for menu items
  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (iconMenu.classList.contains("_active")) {
        toggleMenu()
      }
    })
  })

  //event handlers for menu subitems
  menuSublinks.forEach((sublink) => {
    sublink.addEventListener("click", function (e) {
      if (iconMenu.classList.contains("_active")) {
        toggleMenu()
      }
    })
  })

  // close menu when clicking inside header__actions
  headerActions.addEventListener("click", function (e) {
    if (iconMenu.classList.contains("_active")) {
      toggleMenu()
    }
  })

  // toggle menu function
  function toggleMenu() {
    document.body.classList.toggle("body--lock")
    iconMenu.classList.toggle("_active")
    menuBody.classList.toggle("_active")
  }

  // close hamburger menu on device rotating
  window.addEventListener("orientationchange", function () {
    if (document.body.classList.contains("body--lock")) {
      document.body.classList.remove("body--lock")
    }
    if (iconMenu.classList.contains("_active")) {
      iconMenu.classList.remove("_active")
    }
    if (menuBody.classList.contains("_active")) {
      menuBody.classList.remove("_active")
    }
  })
}
// ------------- END OF hamburger menu -------------

// ------------- 2-levels menu  (menu + submenu) -------------
document.addEventListener("DOMContentLoaded", () => {
  const menuBtns = document.querySelectorAll(".menu__btn")
  const drops = document.querySelectorAll(".menu__sublist")

  menuBtns.forEach((el) => {
    el.addEventListener("click", (e) => {
      let currentBtn = e.currentTarget
      let drop = currentBtn
        .closest(".menu__item")
        .querySelector(".menu__sublist")

      menuBtns.forEach((el) => {
        if (el !== currentBtn) {
          el.classList.remove("menu__btn--active")
        }
      })

      drops.forEach((el) => {
        if (el !== drop) {
          el.classList.remove("menu__sublist--active")
        }
      })

      drop.classList.toggle("menu__sublist--active")
      currentBtn.classList.toggle("menu__btn--active")
    })
  })

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".menu")) {
      menuBtns.forEach((el) => {
        el.classList.remove("menu__btn--active")
      })

      drops.forEach((el) => {
        el.classList.remove("menu__sublist--active")
      })
    }
  })
})
// ------------- END OF 2-levels menu  (menu + submenu) -------------

window.addEventListener("load", function () {
  // ------------- slider-hero SWIPER -------------
  if (document.querySelector(".slider-hero__slider")) {
    const swiperHero = new Swiper(".slider-hero__slider", {
      speed: 500,
      loop: true,

      // If we need pagination
      pagination: {
        el: ".slider-hero__pagination",
        renderBullet: function (index, className) {
          return (
            '<span class="' +
            className +
            '">' +
            "<span>" +
            "0" +
            (index + 1) +
            "</span>" +
            "</span>"
          )
        },
      },

      // Navigation arrows
      navigation: {
        nextEl: ".slider-hero__arrow-next",
        prevEl: ".slider-hero__arrow-prev",
      },
    })
  }

  // ------------- slider-interiors SWIPER -------------
  if (document.querySelector(".slider-interiors__slider")) {
    const swiperInterior = new Swiper(".slider-interiors__slider", {
      speed: 500,
      loop: true,

      // Navigation arrows
      navigation: {
        nextEl: ".slider-interiors__arrow-next",
        prevEl: ".slider-interiors__arrow-prev",
      },
    })
  }
})

// ------------- tabs function -------------
function initializeTabSwitching(containerSelector) {
  const container = document.querySelector(containerSelector)

  if (!container) {
    console.error(`Container with selector ${containerSelector} not found.`)
    return
  }

  container.addEventListener("click", documentActions)

  function documentActions(e) {
    const targetElement = e.target

    if (
      targetElement.classList.contains("tab-button") &&
      !targetElement.classList.contains("_active")
    ) {
      const activeElement = container.querySelector(".tab-button._active")
      const elements = container.querySelectorAll(".tab-item")
      const elementType = targetElement.dataset.tabType

      activeElement.classList.remove("_active")
      targetElement.classList.add("_active")

      elements.forEach((element) => {
        !elementType || element.dataset.tabType === elementType
          ? (element.hidden = false)
          : (element.hidden = true)
      })
    }
  }
}

// apply to the listed containers only
initializeTabSwitching(".tabs-products")
// ------------- END OF tabs function -------------
