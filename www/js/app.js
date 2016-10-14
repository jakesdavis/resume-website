(function () {
    var $ = jQuery;

    var defaultValues = {
        imagePlaceholder: "img/placeholder.png"
    };


    var imageHandlers = function () {
        var imageList = $("img, iframe");
        var imageReady = 0;
        var imageLoadFunction = function () {
            imageReady++;
            if (imageList.size() <= imageReady) {
                $("#preloader").removeClass("active");
                $("body").addClass("done");
                setResume();
                setPortfolio();
            }
        };
        var imageErrorFunction = function () {
            this.src = defaultValues.imagePlaceholder;
            // if (this.src !== this.getAttribute("data-src") ) {
            // }
        };
        // $("body").on("load", "img", imageLoadFunction);
        // $(img)

        for (var i = 0, l = imageList.length; i < l; i++) {
            // imageList[i].src = imageList[i].getAttribute("data-src");
            imageList[i].onerror = imageErrorFunction;
            if (!imageList[i].complete) {
                imageList[i].onload = imageLoadFunction;
            } else {
                imageLoadFunction();
            }
        }
    };


    var bindNavigationHandlers = function () {
        var blockNavigation = false;
        $("body").on("click touchstart", ".menu-items li", function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            var body = $("body");
            var nextSection = $("#" + this.getAttribute("data-href"));
            body.stop().animate({
                scrollTop: nextSection[0].offsetTop
            }, 0, 'swing', function () {

            });

            var previousMenu = $(".menu-items li.active");
            var nextMenu = $(this);

            // var previousSection = $("section.active");

            $(".menu-wrapper").toggleClass("slide-in-left");
            $(".menu-icon .glyphicon").toggleClass("glyphicon-remove");

            if (nextMenu.hasClass("active") || blockNavigation) {
                return;
            }
            // blockNavigation = true;
            // previousMenu.removeClass("active");
            // nextMenu.addClass("active");
            // nextSection.scrollTop(0);

            // previousSection.addClass("slide-up");
            // nextSection.addClass("slide-up");

            setTimeout(function () {
                //     blockNavigation = false;
                $(".menu-wrapper").removeClass("slide-out-left");
                //     nextSection.addClass("active");
                //     nextSection.removeClass("slide-up");
                //     previousSection.removeClass("active");
                //     previousSection.removeClass("slide-up");
            }, 300);
        });
        var sectionTopList = [];
        var sectionList = $("section");
        for (var i = 0, l = sectionList.size(); i < l; i++) {
            sectionTopList.push({
                id: sectionList[i].id,
                offsetTop: sectionList[i].offsetTop - 75,
                scrollHeight: (sectionList[i].scrollHeight)
            })
        }
        var firstTime;
        var customScrollFunction = function () {
            for (var i = 0, l = sectionTopList.length; i < l; i++) {
                if ($("body").scrollTop() > sectionTopList[i].offsetTop) {
                    if (!$("[data-href='" + sectionTopList[i].id + "']").hasClass("active")) {
                        var previousMenu = $(".menu-items li.active");
                        var nextMenu = $("[data-href='" + sectionTopList[i].id + "']");
                        previousMenu.removeClass("active");
                        nextMenu.addClass("active");
                    } else {

                    }
                } else {
                    break;
                }
            }
        };
        customScrollFunction();
        $(document).on("scroll", customScrollFunction);
    };

    var bindMenu = function () {
        $("body").on("touchstart", ".menu-icon span", function (event) {
            $(".menu-wrapper").toggleClass("slide-in-left");
            $(".menu-icon .glyphicon").toggleClass("glyphicon-remove");
        });
    };

    var setResume = function () {
        var resume = $("#resume iframe");
        resume[0].height = (($("#resume").height() - $("#resume .page-header").height() - 150)) + "px";
        resume[0].width = ("100%");
        resume.css("display", "block");
    };
    var setPortfolio = function () {
        var portfolioRow = $("#portfolio .page-content>.row");
        var max, iframeContent, thumnailContent, imgContent;
        $(".thumbnail").height("auto");
        if (window.innerHeight < 600) {
            return;
        }
        for (var i = 0, l = portfolioRow.length; i < l; i++) {
            thumnailContent = $("#portfolio .page-content>.row:nth-child(" + (i + 1) + ") .thumbnail");
            iframeContent = $("#portfolio .page-content>.row .thumbnail iframe").parent();
            imgContent = $("#portfolio .page-content>.row:nth-child(" + (i + 1) + ") .item.active img");

            if (thumnailContent[0]) {
                max = $(thumnailContent[0]).height();
            }
            if (thumnailContent[1] && $(thumnailContent[1]).height() > max) {
                max = $(thumnailContent[1]).height();
            }
            if (thumnailContent[2] && $(thumnailContent[2]).height() > max) {
                max = $(thumnailContent[2]).height();
            }

            if (thumnailContent.size() > 0) {
                thumnailContent.height(max + 20);
            }
            if (iframeContent.size() > 0) {
                iframeContent.height($(imgContent).height());
            }
        }

    };
    var initialize = function () {
        bindNavigationHandlers();
        bindMenu();
        setResume();
        setPortfolio();
        // $("body ").niceScroll();
        $('[data-toggle="tooltip"]').tooltip();
    };
    $(document).ready(function () {
        initialize();
        $(window).resize(function () {
            setResume();
            setPortfolio();
            // $("body ").niceScroll();
        });
    });
    imageHandlers();
}());