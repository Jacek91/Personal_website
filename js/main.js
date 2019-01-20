$(window).on("load", function() {
  var $preloader = $("#page-preloader"),
    $spinner = $preloader.find(".spinner");
  $spinner.delay(1000).fadeOut("slow");
  $preloader.delay(1500).fadeOut("slow");
});

$(".hamburger").on("click", function() {
  $(this).toggleClass("opened");
  $(this).toggleClass("left");
  $(".left_main_page").toggleClass("animation");
});

$(".menu li a").on("click", function() {
  $(".left_main_page").toggleClass("animation");
  $(".hamburger").toggleClass("opened");
  $(".hamburger").toggleClass("left");
});

var month = new Array();
month[0] = "JAN";
month[1] = "FEB";
month[2] = "MAR";
month[3] = "APR";
month[4] = "MAY";
month[5] = "JUN";
month[6] = "JUL";
month[7] = "AUG";
month[8] = "SEP";
month[9] = "OCT";
month[10] = "NOV";
month[11] = "DEC";

var date = new Date();
$(".day").text(date.getDate());
$(".month").text(month[date.getMonth()]);
$(".year").text(date.getFullYear());

var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }

  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

$(window).scroll(function() {
  if ($(this).scrollTop() > 1500 && !$(".skill-bar").hasClass("animated")) {
    $(".skill-bar").addClass("animated");
    jQuery(".skillbar").each(function() {
      jQuery(this)
        .find(".skillbar-bar")
        .animate(
          {
            width: jQuery(this).attr("data-percent")
          },
          2000
        );
    });
  } else if (
    $(this).scrollTop() < 1000 &&
    $(".skill-bar").hasClass("animated")
  ) {
    $(".skill-bar").removeClass("animated");
    jQuery(".skillbar").each(function() {
      jQuery(this)
        .find(".skillbar-bar")
        .animate(
          {
            width: "0%"
          },
          2000
        );
    });
  }
});

$(window).scroll(function() {
  if ($(this).scrollTop() > 2600 && $(this).scrollTop() < 2800) {
    $(".education_year").each(function(index, value) {
      if (index === 0) {
        $(this).css({
          animation: "pulse 1s infinite",
          color: "#0099cc"
        });
      }
    });
  } else if ($(this).scrollTop() > 2800 && $(this).scrollTop() < 3100) {
    $(".education_year").each(function(index, value) {
      if (index === 1) {
        $(this).css({
          animation: "pulse 1s infinite",
          color: "#0099cc"
        });
      }
    });
  } else if ($(this).scrollTop() > 3100 && $(this).scrollTop() < 3300) {
    $(".education_year").each(function(index, value) {
      if (index === 2) {
        $(this).css({
          animation: "pulse 1s infinite",
          color: "#0099cc"
        });
      }
    });
  } else if ($(this).scrollTop() < 2500 || $(this).scrollTop() > 3450) {
    $(".education_year").css({
      animation: "",
      color: "#2f2d2d"
    });
  }
});

var buttons = $("#myProjects .buttons a");

buttons.click(function(e) {
  e.preventDefault();
  buttons.each(function() {
    $(this).removeClass("activeBtn");
  });
  var btn = $(this);
  btn.addClass("activeBtn");
  var a = btn.attr("href");
  a = a.substr(1);
  $("figure").each(function() {
    if (!$(this).hasClass(a) && a != "all") {
      $(this).addClass("hide");
    } else {
      $(this).removeClass("hide");
    }
  });
});

function progress() {
  var windowScrollTop = $(window).scrollTop();
  var docHeight = $(document).height();
  var windowHeight = $(window).height();
  var progress = (windowScrollTop / (docHeight - windowHeight)) * 125;
  var $bgColor = "#0099cc";

  $(".progress-bar--incIntroduction")
    .height(progress + "%")
    .css({
      backgroundColor: $bgColor
    });

  $(".progress_count").html(Math.round(progress * 0.8) + "%");
}

progress();

$(document).on("scroll", progress);

var menu_selector = ".menu";

function onScroll() {
  var scroll_top = $(document).scrollTop();
  $(menu_selector + " a").each(function() {
    var hash = $(this).attr("href");
    var target = $(hash);
    if (
      target.position().top <= scroll_top &&
      target.position().top + target.outerHeight() > scroll_top
    ) {
      $(menu_selector + " a.active").removeClass("active");
      $(this).addClass("active");
    } else {
      $(this).removeClass("active");
    }
  });
}

$(document).ready(function() {
  $(document).on("scroll", onScroll);

  $(" .menu a[href^=#]").click(function(e) {
    e.preventDefault();

    $(menu_selector + " a.active").removeClass("active");
    $(this).addClass("active");
    var hash = $(this).attr("href");
    var target = $(hash);

    $("html, body").animate(
      {
        scrollTop: target.offset().top
      },
      500,
      function() {
        window.location.hash = hash;
        $(document).on("scroll", onScroll);
      }
    );
  });
});
