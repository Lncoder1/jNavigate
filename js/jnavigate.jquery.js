(function ($) {
  
  // default settings
  var settings = {
      intTrigger: ".jnavigate-int-trigger"
    , extTrigger: ".jnavigate-ext-trigger"
    , switchContent: true
    , showLoader: true
    , loadingColor: "#FFF"
    , useHistory: true
    , spinner: "styles/images/ajax-loader.gif"
    , loaded: null
    , error: null
  }
  
  var methods = {}; // plugin API
    
  /**
   * Initialise content areas
   */
  methods.init = function (opts) {
    var selector = this.selector
      , options = $.extend({}, settings, opts);
    // replace current history state (should just be the landing page)
    if (options.useHistory && historySupported) {
      history.replaceState(
          createHistoryState(
            $.extend({selector: selector}, options)
          )
        ,  ""
        ,  location.href
      );
    }
    return this.each(function () {
      var $this = $(this);
      // reinstate original selector
      $this.selector = selector;
      // add a reference to the content area for event data
      options.jNavigateContainer = $this;
      // bind event handlers
      $(options.extTrigger).bind("click", options, transport);
      $this.delegate(options.intTrigger, "click", options, transport);
      // cache the trigger selectors
      $this.data("jnavigate-triggers", {
          intTrigger: options.intTrigger
        , extTrigger: options.extTrigger
      });
    });
    
  };
      
  /**
   * Adds a loading overlay over selected elements and caches
   * a reference to the related overlay in the jQuery data object for each
   */
  methods.overlay = function (opts) {
    var options = $.extend({}, settings, opts);
    return this.each(function () {
      var $container = $(this)
        , $overlay = $(document.createElement("div"))
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
   };
     
  /**
   * Loads external content into the selected area
   * requires at least url in opts
   */
  methods.navigate = function (opts) {
    var selector = this.selector // need to retain selector for history state
      , options = $.extend({}, settings, opts);
    if (options.url) {
      return this.each(function () {
        var $this = $(this);
        if (options.showLoader) { // add loading overlay if required
          methods.overlay.call($this);
        }
        $.ajax({ // make the request - need to abstract params out at some point
            type: options.httpmethod || "GET"
          , url: options.url
          , data: "jnavigate=true" + (options.params || "")
          , dataType: "html"
          , success: function (data) {
              var $overlay = $this.data("jnavigate-overlay");
              if (options.switchContent) { // replace existing html?
                // retain dimensions of container by fading out it's children
                $this.children().fadeTo(0,0);
                $this.html(data);
                if ($overlay)
                  $overlay
                    .fadeOut(100)
                    .remove(); 
                $this.children().fadeTo(500,1);
              }
              if (options.loaded) // call UDF for loaded
                options.loaded.call($this, data);
              // only push get requests (don't want repeat form posts etc)
              if ((options.useHistory && historySupported) && 
                ((options.httpmethod || "GET").toUpperCase() === "GET")) {
                // don't push state if refresh or history pop
                if (locationCache === options.url) {
                    return;
                }
                history.pushState(
                    createHistoryState(
                      $.extend(options, {selector: selector})
                    )
                  , ""
                  ,  options.url
                );
              }
            }
            // default error handler either submits the form or actions a link
          , error : options.error || function (xhr, ts, err) {
              if (options.$form && options.$form.length) {
                options.$form.submit();
              } else location.href = options.url;
            }
        });
      });
    } else return this;
  };

  /**
   * Remove event listeners from triggers and any jNavigate data
   */
  methods.destroy = function () {
    return this.each(function () {
      var $this = $(this)
        , triggers = $this.data("jnavigate-triggers");
      if (triggers) {
        $this.undelegate(triggers.intTrigger, "click", transport);
        $(triggers.extTrigger).unbind("click", transport);
        $.removeData($this, "jnavigate-triggers");
      }
    });
  };
    
  /**
   * Click handler for internal and external triggers
   */
  var transport = function (ev) {
    var $button = $(this)
      , request = { // default request parameters
            url: null
          , httpmethod: "GET"
          , params: ""
          , $form: null
      };
    // if trigger is a form trigger
    if (this.nodeName === "INPUT" || this.nodeName === "BUTTON") {
      request.$form = $button.closest("form");
      if (request.$form.length) { // found an ancestor form to submit
        request.url = request.$form.attr("action") || location.href;
        request.httpmethod = request.$form.attr("method");
        request.params += "&" + request.$form.serialize();
        if ($button.attr("name")) { // send the clicked buttons name through
          request.params += "&jnavigateTrigger=" + $button.attr("name");
        }
      }
    } else request.url = $button.attr("href"); // anchor link
    if (request.url) {
      ev.preventDefault();
      methods.navigate.call(
          ev.data.jNavigateContainer
        , $.extend(ev.data, request)
      );
    }
  };
    
  /**
   * Creates a state hash with simple values so we
   * can recreate the correct page state on history 
   * pop
   */
  var createHistoryState = function (params) {
    return {
         url: params.url || window.location.href
      ,  httpmethod: params.httpmethod
      ,  selector: params.selector
      ,  showLoader: params.showLoader
      ,  params: params.params
      ,  switchContent: params.switchContent
    }
  };
  
  var historySupported = !!(history && history.pushState)
    , locationCache = location.href; // not all support history.state
  
  /**
   * If users browser supports the history API
   * attach a global popstate listener as all jNavigate 
   * instances will push to the history stack with their 
   * own container selector, url and params
   */
  if (historySupported) {
    window.addEventListener("popstate", function (ev) {
      if (ev.state && ev.state.selector) {
        locationCache = ev.state.url;
        methods.navigate.call($(ev.state.selector), ev.state);
      }
    }, false);
  }

  $.fn.jNavigate = function (method) {
      
    if (methods[method]) {
      return methods[method].apply(
          this
        , Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof method === "object") {
      return methods.init.apply(this, arguments);
    }
    
  };
    
})(jQuery);
