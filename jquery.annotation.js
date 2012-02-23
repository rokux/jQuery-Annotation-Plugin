(function($) {
    $.fn.mapper = function(options) {
        var settings = $.extend({
            "overlay": ".overlay>li",
            "map": ".map",
            "offset": 10
        }, options);

        return this.each(function() {
            var $root = $(this),
                $container = $("<div class='mapper-container'></div>"),
                $overlay = $("<div class='mapper-overlay'></div>"),
                $source = $root.find(settings.overlay),
                $bigpicture = $root.children(settings.map).eq(0),
                w = 0,
                h = 0;

            $container.appendTo($root);
            $bigpicture.detach().appendTo($container).addClass("mapper-bigpicture");
            $overlay.appendTo($container);

            w = $bigpicture.width();
            h = $bigpicture.height();
            $container.css({
                "width": w,
                "height": h
            });
            $overlay.css({
                "width": w,
                "height": h
            });

            $source.each(function() {
                var $el = $(this),
                    l = parseInt($el.attr("data-x"), 10),
                    t = parseInt($el.attr("data-y"), 10),
                    $hotarea = $("<div class='mapper-hotarea'></div>"),
                    $hotspot = $("<a class='mapper-hotspot'></a>"),
                    $panel = $("<div class='mapper-infopanel'></div>"),
                    $close = $("<div class='mapper-close-button'>x</div>"),
                    $arrow = $("<div class='mapper-panel-arrow'></div>"),
                    $wrapper = $("<div class='mapper-content-wrapper'></div>"),
                    $content = $($el.html()),
                    hspan = 0;

                if ($el.parent().not($root)) {
                    $el.parent().hide();
                }
                $hotarea.appendTo($overlay).append($hotspot, $panel);
                $panel.append($wrapper, $close, $arrow);
                $wrapper.append($content);

                hspan = $hotspot.outerWidth(true) + settings.offset + $panel.outerWidth(true);
                /*
                 * in the later stage, the hotspot can be bigger than the panel,
                 * i.e., the hot spot is a rectangle
                 * then the height can be re-written as
                 * `Math.max($panel.outerHeight(true), $hotspot.outerHeight(true))`
                 * code for positioning the panel and hostpot vertically need updating accordingly
                 */
                $hotarea.css({
                    "width": hspan,
                    "height": $panel.outerHeight(true)
                });
                $panel.css({
                    "top": 0
                });

                if (l - $hotspot.outerWidth(true) / 2 + h > w) { // panel on the left
                    $hotarea.css({
                        "left": l - $hotspot.outerWidth(true) / 2 - settings.offset - $panel.outerWidth(true)
                    });
                    $hotspot.css({
                        "right": 0
                    });
                    $panel.css({
                        "left": 0
                    });
                    $arrow.css({
                        "right": -parseInt($panel.css("padding-right"), 10) * 2,
                        "border-left-color": $panel.css("background-color")
                    });

                } else { // panel on the right
                    $hotarea.css({
                        "left": l - $hotspot.outerWidth(true) / 2
                    });
                    $hotspot.css({
                        "left": 0
                    });
                    $panel.css({
                        "right": 0
                    });
                    $arrow.css({
                        "left": -parseInt($panel.css("padding-right"), 10) * 2,
                        "border-right-color": $panel.css("background-color")
                    });
                } // end configuring horizontally
                if (t - $panel.outerHeight(true) / 2 < 0) { // to the top
                    $hotarea.css({
                        "top": 0
                    });
                    $hotspot.css({
                        "top": t - $hotspot.outerHeight(true) / 2
                    });
                    $arrow.css({
                        "top": t - $arrow.outerHeight() / 2
                    });
                } else if (t + $panel.outerHeight(true) / 2 > h) { // to the bottom
                    $hotarea.css({
                        "bottom": 0
                    });
                    $hotspot.css({
                        "top": t - $hotarea.position().top- $hotspot.outerHeight(true) / 2
                    });
                    $arrow.css({
                        "top": t - $hotarea.position().top - $arrow.outerHeight() / 2
                    });
                } else {
                    $hotarea.css({
                        "top": t - $panel.outerHeight(true) / 2
                    });
                    $hotspot.css({
                        "top": $panel.outerHeight(true) / 2
                    });
                    $arrow.css({
                        "top": $panel.innerHeight() / 2
                    });
                }
            });
            
            $overlay.find(".mapper-infopanel").hide();
            
            $overlay.on("mouseenter.mapper", ".mapper-hotspot", function() {
                $(this).next().fadeIn();
            });
            
            $overlay.on("mouseleave.mapper", ".mapper-hotarea", function() {
                $(this).children(".mapper-infopanel").fadeOut();
            });
            
            $overlay.on("click.mapper", ".mapper-close-button", function() {
                $(this).parent().fadeOut();
            });

        });
    };
})(jQuery);