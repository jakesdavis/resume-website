(function () {
    var $ = jQuery;

    var preloader = $("#preloader");
    preloader.removeClass("active");

    // var imageList = $("img");
    // var imageLoadFunction = function () {
    //     console.log("Loaded");
    // };
    // for (var i = 0, l = imageList.length; i < l; i++) {
    //     imageList[i].onload = imageLoadFunction;
    // }

    var bindNavigationHandlers = function () {
        var blockNavigation = false;
        $("body").on("click", ".menu-items li", function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();

            var previousMenu = $(".menu-items li.active");
            var nextMenu = $(this);

            var previousSection = $("section.active");
            var nextSection = $("#" + this.getAttribute("data-href"));

            if (nextMenu.hasClass("active") || blockNavigation) {
                return;
            }
            blockNavigation = true;
            previousMenu.removeClass("active");
            nextMenu.addClass("active");

            previousSection.addClass("slide-up");
            nextSection.addClass("slide-up");
            setTimeout(function () {
                blockNavigation = false;
                nextSection.addClass("active");
                nextSection.removeClass("slide-up");
                previousSection.removeClass("active");
                previousSection.removeClass("slide-up");
            }, 300);
        });
    };

    var bindMenu = function () {
        $("body").on("click", ".menu-icon", function (event) {
            $(".menu-wrapper").addClass("slide-in-left");
        });
    };
    var initialize = function () {
        bindNavigationHandlers();
        bindMenu();
    };

    $(document).ready(function () {
        initialize();
    });
}());