$(window).on("load", function() {
    var $preloader = $("#page-preloader"),
      $spinner = $preloader.find(".spinner");
    $spinner.delay(1000).fadeOut("slow");
    $preloader.delay(1500).fadeOut("slow");
  });