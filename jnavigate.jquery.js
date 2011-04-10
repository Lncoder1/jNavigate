(function ($) {

  $.fn.jNavigate = function (options) {

    var settings = $.extend({
            intTrigger: "input[type=submit]"
          , extTrigger: ".transport"
          , useHistory: true
          , switchContent: true
          , loaded: null
          , showLoader: true
          ,	error: null
          , spinner: "images/ajax-loader.gif"
        }, options)
      , useHistory = settings.useHistory && 
          !!(history && history.pushState);
    
    var addLoading = function (options) {
      var $overlay = $(document.createElement("div"))
        , bounds = $container.offset()
        , ovLeft = bounds.left + parseInt($container.css("borderLeftWidth"))
        , ovTop = bounds.top + parseInt($container.css("borderTopWidth"));
      $overlay.css({
          display: "none"
        , width: $container.innerWidth()
        , height: $container.innerHeight()
        , position: "absolute"
        , top: ovTop
        , left: ovLeft
        , backgroundImage: "url(" + settings.spinner + ")"
        , backgroundPosition: "center"
        , backgroundRepeat: "no-repeat"
        , backgroundColor: "white"
        , zIndex: 999
      });
      $overlay.appendTo(document.body);
      $overlay.fadeIn(150);
      return $overlay;
    }

    var transport = function (ev) {
      var url
        , $button = $(this)
	      ,	$form
      	,	state = {
      			url: null
	        ,	httpmethod: "GET"
	        , params: "jnavigate=true"
	      };
      if (this.nodeName === "INPUT" || this.nodeName === "BUTTON") {
      	$form = $button.closest("form");
        url = $form.attr("action");
        state.httpmethod = $form.attr("method");
        state.params += "&" + $form.serialize();
      } else url = $button.attr("href");
      if ($button.attr("name")) {
        state.params += "&trigger=" + $button.attr("name");
      }
      if (url && url != "") {
        ev.preventDefault();
        state.url = url;
        makeRequest(state, $form);
      }
    }
    
    var makeRequest = function (state, $form) {
        if (settings.showLoader) {
          var $overlay = addLoading({
            container : $container
          });
        }
        $.ajax({
            type: state.httpmethod
          , url: state.url
          , data: state.params
          , dataType: "html"
          , success: function (data) {
              if (settings.switchContent) {
                $container.html(data);
                $container.children().fadeTo(0,0);
                if (settings.showLoader)
                  $overlay
                    .fadeOut(100)
                    .remove();
                $container.children().fadeTo(500,1);
              }
              if (settings.loaded)
                settings.loaded(data);
              // only push state for gets (don't want repeat form posts etc
              if (useHistory && state.httpmethod.toUpperCase() === "GET") {
                var cs = history.state;
                // don't push current state if page refresh
                if (cs && ((cs.url && cs.url === state.url) && 
                    (cs.params && cs.params === state.params))) {
                    return;
                }
                history.pushState(state, "", state.url);
              }
            }
          , error : settings.error || function (xhr, ts, err) {
		      		if ($form && $form.length) {
		      			$form.submit();
		      		} else window.location = state.url;
		      	}
        });
    }

    var $container = this;
    $(settings.extTrigger).bind("click", transport);
    $container.delegate(settings.intTrigger, "click", transport);
    if (useHistory) {
      window.addEventListener("popstate", function (ev) {
        if (ev.state && typeof ev.state.url !== "object") {
          makeRequest(ev.state);
        }
      }, false);
    }

    return this;
  }
    
})(jQuery);
