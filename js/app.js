(function () {
    var $ = jQuery;

    var defaultValues = {
        imagePlaceholder: "img/placeholder.png"
    };


    var imageHandlers = function () {
        var imageList = $("img");
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
        };

        for (var i = 0, l = imageList.length; i < l; i++) {
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
        var myClick = false;
        $("body").on("click touchstart", ".menu-items li", function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            var that = this;
            if (myClick) {
                return;
            }
            myClick = true;

            var body = $("body");
            var nextSection = $("#" + that.getAttribute("data-href"));
            var previousMenu = $(".menu-items li.active");
            var nextMenu = $(that);

            if (nextMenu.hasClass("active") || blockNavigation) {
                return;
            }
            // clearTimeout(myClick);

            body.stop().animate({
                scrollTop: nextSection[0].offsetTop
            }, 0, 'swing', function () {

            });


            $(".menu-wrapper").toggleClass("slide-in-left");
            $(".menu-icon .glyphicon").toggleClass("glyphicon-remove");
            setTimeout(function () {
                $(".menu-wrapper").removeClass("slide-out-left");
            }, 300);

            myClick = setTimeout(function () {
                myClick = false;
            }, 100);
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
        var myClick = false;
        $("body").on("click touchstart", ".menu-icon span", function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            // clearTimeout(myClick);
            if (myClick) {
                return;
            }
            myClick = true;
            $(".menu-wrapper").toggleClass("slide-in-left");
            $(".menu-icon .glyphicon").toggleClass("glyphicon-remove");
            setTimeout(function () {
                myClick = false;
            }, 100);
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
        // $('[data-toggle="tooltip"]').tooltip({
        //     trigger: "click touchstart"
        // });
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