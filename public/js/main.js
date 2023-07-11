$(document).ready(function () {
  $('.header__burger').click(function () {
    $('.header__burger, .adaptiv').toggleClass('active');
    $('body').toggleClass('lock');
  });

  $('.faq').click(function () {
    $('.questions').toggleClass('active');
    $('#adaptiv, #header, #footer').toggleClass('lock');
  });

  $('.questions__maintitle-mainplus').click(function () {
    $('.questions').removeClass('active');
  });

  const faqs = document.querySelectorAll('.questions__cont');
  faqs.forEach(questions__cont => {
    questions__cont.addEventListener("click", () => {
      questions__cont.classList.toggle("active");
    });
  });

  let intro = $("#intro");
  let header = $("#header");
  let introH = intro.innerHeight();
  let headerH = header.innerHeight();

  headerScroll();

  $(window).on("scroll resize", function () {
    headerScroll();
  });

  function headerScroll() {
    let introH = intro.innerHeight();
    let headerH = header.innerHeight();
    let scrollTop = $(this).scrollTop();

    if (scrollTop >= introH - headerH) {
      header.addClass("header--dark");
    } else {
      header.removeClass("header--dark");
    }
  }

  $("[data-scroll]").on("click", function (event) {
    event.preventDefault();
    let scrollEl = $(this).data("scroll");
    let scrollElPos = $(scrollEl).offset().top;

    $("html, body").animate({
      scrollTop: scrollElPos - headerH
    });
  });

  let windowH = $(window).height();

  $(window).on("scroll", function () {
    let scrollTop = $(this).scrollTop();

    $("[data-scrollspy]").each(function () {
      let $this = $(this);
      let sectionId = $this.data('scrollspy');
      let sectionOffset = $this.offset().top;
      sectionOffset -= windowH * 0.333333;

      if (scrollTop >= sectionOffset) {
        $('#nav [data-scroll]').removeClass('line');
        $('#nav [data-scroll="' + sectionId + '"]').addClass('line');

        let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        if (width < 1265) {
          $('#footer [data-scroll]').removeClass('line');
        }
      }
    });
  });

  $('#adaptiv [data-scroll]').on('click', function (event) {
    event.preventDefault();
    $('.header__burger, .adaptiv').removeClass('active');
    $('body').removeClass('lock');
  });
});

$(window).on('DOMContentLoaded', function () {
  const passwordInput = document.getElementById('password');
  const repeatPasswordInput = document.getElementById('repeat_password');
  const errorMessage = document.getElementById('error_message');

  if (passwordInput && repeatPasswordInput && errorMessage) {
    function validatePasswords() {
      const password = passwordInput.value;
      const repeatPassword = repeatPasswordInput.value;

      if (password !== repeatPassword) {
        errorMessage.textContent = 'Passwords do not match.';
      } else {
        errorMessage.textContent = '';
      }
    }

    passwordInput.addEventListener('input', validatePasswords);
    repeatPasswordInput.addEventListener('input', validatePasswords);
  }
});
