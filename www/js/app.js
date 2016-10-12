(function () {
    var $ = jQuery;

    var defaultValues = {
        imagePlaceholder: "img/placeholder.png"
    };


    var imageHandlers = function () {
        var preloader = $("#preloader");
        preloader.removeClass("active");

        var imageList = $("img");
        var imageLoadFunction = function () {
            console.log("Loaded");
        };
        var imageErrorFunction = function () {
            this.src = defaultValues.imagePlaceholder;
        };
        for (var i = 0, l = imageList.length; i < l; i++) {
            imageList[i].onerror = imageErrorFunction;
        }
    };


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
                $(".menu-wrapper").addClass("slide-out-left");
                setTimeout(function () {
                    $(".menu-wrapper").removeClass("slide-in-left");
                    $(".menu-wrapper").removeClass("slide-out-left");
                }, 300);
                return;
            }
            blockNavigation = true;
            previousMenu.removeClass("active");
            nextMenu.addClass("active");
            nextSection.scrollTop(0);

            $(".menu-wrapper").addClass("slide-out-left");
            $(".menu-wrapper").removeClass("slide-in-left");
            previousSection.addClass("slide-up");
            nextSection.addClass("slide-up");

            setTimeout(function () {
                blockNavigation = false;
                $(".menu-wrapper").removeClass("slide-out-left");
                nextSection.addClass("active");
                nextSection.removeClass("slide-up");
                previousSection.removeClass("active");
                previousSection.removeClass("slide-up");
            }, 300);
        });
        // $(".section").on("scroll", function () {
        //     console.log("start");
        //     if ($(this)[0].scrollHeight - $(this).scrollTop() == $(this).outerHeight()) {
        //         console.log("end");
        //     }
        // })
    };

    var bindMenu = function () {
        $("body").on("click", ".menu-icon", function (event) {
            $(".menu-wrapper").addClass("slide-in-left");
        });
    };

    var setResume = function () {
        var resume = $("#resume iframe");
        resume[0].height = (($("#resume").height() - $("#resume .page-header").height() - 100)) + "px";
        resume[0].width = ("100%");
        resume.css("display", "block");
    };
    var initialize = function () {
        bindNavigationHandlers();
        bindMenu();
        setResume();
    };
    $(document).ready(function () {
        initialize();
    });
    imageHandlers();
}());