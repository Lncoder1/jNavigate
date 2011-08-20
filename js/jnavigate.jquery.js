(function ($) {
  
  var settings = {
        intTrigger: ".jnavigate-int-trigger"
      , extTrigger: ".jnavigate-ext-trigger"
      , switchContent: true
      , showLoader: true
      , loadingColor: "#FFF"
      , spinner: "images/ajax-loader.gif"
      , useHistory: true
      , loaded: null
      ,  error: null
    }
  
  ,  methods = {
      
        init: function (opts) {
          var selector = this.selector
            ,  options = $.extend(settings, opts);
          if (useHistory) {
            history.replaceState(
                createHistoryState(
                  $.extend({selector: selector}, options)
                )
              ,  ""
              ,  window.location.href
            );
          }
          return this.each(function () {
            var $this = $(this);
            $this.selector = selector;
            options.jNavigateContainer = $this;
            $(options.extTrigger).bind("click", options, transport);
            $this.delegate(options.intTrigger, "click", options, transport);
            $this.data("jnavigate-triggers", {
                intTrigger: options.intTrigger
              ,  extTrigger: options.extTrigger
            });
          });
          
        }
        
      ,  addLoading: function (opts) {
        
          var options = $.extend(settings, opts);
        
          return this.each(function () {
            var $container = $(this)
              ,  $overlay = $(document.createElement("div"))
              , bounds = $container.offset()
              , ovLeft = bounds.left + parseInt($container.css("borderLeftWidth"))
              , ovTop = bounds.top + parseInt($container.css("borderTopWidth"));
            $overlay
              .css({
                    display: "none"
                  , width: $container.innerWidth()
                  , height: $container.innerHeight()
                  , position: "absolute"
                  , top: ovTop
                  , left: ovLeft
                  , backgroundImage: "url(" + options.spinner + ")"
                  , backgroundPosition: "center"
                  , backgroundRepeat: "no-repeat"
                  , backgroundColor: options.loadingColor
                  , zIndex: 999
               })
              .appendTo("body")
              .fadeIn(150);
            $container.data("jnavigate-overlay", $overlay);
          });
          
         }
       
      ,  loadContent: function (options) {
          var selector = this.selector;
          options = $.extend(options, settings);
          return this.each(function () {
            var $this = $(this);
            if (options.showLoader) {
              methods.addLoading.call($this);
            }
            $.ajax({
                type: options.httpmethod || "GET"
              , url: options.url
              , data: "jnavigate=true" + options.params
              , dataType: "html"
              , success: function (data) {
                  var $overlay = $this.data("jnavigate-overlay");
                  if (options.switchContent) {
                    $this.children().fadeTo(0,0);
                    $this.html(data);
                    if (options.showLoader)
                      $overlay
                        .fadeOut(100)
                        .remove();
                    $this.children().fadeTo(500,1);
                  }
                  if (options.loaded)
                    options.loaded.call($this, data);
                  // only push state for gets (don't want repeat form posts etc)
                  if ((useHistory || options.useHistory) && 
                    (options.httpmethod && options.httpmethod.toUpperCase() === "GET")) {
                    var cs = history.state;
                    // don't push current state if page refresh
                    if (cs && (cs.url && cs.url === options.url)) {
                        return;
                    }
                    history.pushState(
                        createHistoryState($.extend(options, {selector: selector}))
                      , ""
                      ,  options.url
                    );
                  }
                }
              , error : options.error || function (xhr, ts, err) {
                  if (options.$form && options.$form.length) {
                    options.$form.submit();
                  } else window.location = options.url;
                }
            });

          });
          
        }

      ,  destroy: function () {
          return this.each(function () {
            var $this = $(this)
              ,  triggers = $this.data("jnavigate-triggers");
            if (triggers) {
              $this.undelegate(triggers.intTrigger, "click", transport);
              $(triggers.extTrigger).unbind("click", transport);
              $.removeData($this, "jnavigate-triggers");
            }
          });
        }
    
    }
    
  ,  transport = function (ev) {
      var $button = $(this)
        ,  request = {
              url: null
            ,  httpmethod: "GET"
            ,  params: ""
            ,  $form: null
        }
      if (this.nodeName === "INPUT" || this.nodeName === "BUTTON") {
        request.$form = $button.closest("form");
        request.url = request.$form.attr("action");
        request.httpmethod = request.$form.attr("method");
        request.params += "&" + request.$form.serialize();
      } else request.url = $button.attr("href");
      if ($button.attr("name")) {
        request.params += "&jnavigateTrigger=" + $button.attr("name");
      }
      if (request.url) {
        ev.preventDefault();
        methods.loadContent.call(
            ev.data.jNavigateContainer
          ,  $.extend(request, ev.data)
        );
      }
    }
    
  , createHistoryState = function (params) {
      return {
          url: params.url || window.location.href
        ,  httpmethod: params.httpmethod
        ,  selector: params.selector
        ,  showLoader: params.showLoader
        ,  params: params.params
        ,  switchContent: params.switchContent
      }
    }
  
  ,  useHistory = settings.useHistory &&  !!(history && history.pushState);
  
  if (useHistory) {
    window.addEventListener("popstate", function (ev) {
      if (ev.state) {
        methods.loadContent.call($(ev.state.selector), ev.state, true);
      }
    }, false);
  }

  $.fn.jNavigate = function (method) {
      
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method == "object") {
      return methods.init.apply(this, arguments);
    }
    
  };
    
})(jQuery);
