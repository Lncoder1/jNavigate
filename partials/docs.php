<h2>Documentation</h2>

<p>
  jNavigate aims to provide enough options to fit most implementations. 
  If you do not find what you need within this page please use the 
  <a class="trigger" href="index.php?page=form">Example form</a> to make
  a suggestion and I will do my best to respond to all requests.
</p>

<h3>Usage</h3>
<p>
  To enable a content section to be loaded dynamically is as simple as the
  line of code below.
</p>
<p>
  <code>$("#mycontentdiv").jNavigate();</code>
</p>
<p>
  By default this will load the content from any anchor tag or form submit/button
  outside of the container with the class of <code>.trigger</code> and any
  <code>input[type=submit]</code> inside the container where the container
  is <code>#mycontentdiv</code> shown in the above example. For more options to 
  customise the behaviour please see below.
</p>

<h3>Options</h3>
<ul id="option-list">
  <li>
      <p>
        <strong>intTrigger</strong> - 
        default: <code>&quot;input[type=submit]&quot;</code> -
        accepts: <code><em>String</em></code>
      </p>
      <p>
        A selector for elements inside the container that when clicked 
        will trigger the container content to be loaded from either the href
        or parent form action.
      </p>
  </li>
  <li>
      <p>
        <strong>extTrigger</strong> - 
        default: <code>&quot;.trigger&quot;</code> -
        accepts: <code><em>String</em></code>
      </p>
      <p>
        A selector for elements outside the container that when clicked 
        will trigger the container content to be loaded from either the href
        or parent form action.      
      </p>
  </li>
  <li>
      <p>
        <strong>switchContent</strong> - 
        default: <code>true</code> -
        accepts: <code><em>Boolean</em></code>
      </p>
      <p>
        Flags whether the containers content should be switched out with the
        response text. This would be set to false in some instances if
        overriding the default action in a <a href="#loaded">callback</a>.
      </p>
  </li>
  <li>
      <p>
        <strong>showLoader</strong> - 
        default: <code>true</code> -
        accepts: <code><em>Boolean</em></code>
      </p>
      <p>
        Flags whether the container should be overlayed with a loading 
        indicator when switching container content.
      </p>
  </li>
  <li>
      <p>
        <strong>loadingColor</strong> - 
        default: <code>#FFFFFF</code> -
        accepts: <code><em>String</em></code>
      </p>
      <p>
        Background color of the loading indicator. Supports any CSS color 
        formatting.
      </p>
  </li>
  <li>
      <p>
        <strong>spinner</strong> - 
        default: <code>&quot;images/ajax-loader.gif&quot;</code> -
        accepts: <code><em>String</em></code>
      </p>
      <p>
        Loading image used as the overlays background.
      </p>
  </li>
  <li>
      <p>
        <strong>useHistory</strong> - 
        default: <code>true</code> -
        accepts: <code><em>Boolean</em></code>
      </p>
      <p>
        Flags whether to use history for application state. If true this 
        will only be available to people using web browsers that support the
        HTML5 <a href="http://www.w3.org/TR/html5/history.html">history API
        </a>.
      </p>
  </li>
  <li id="loaded">
      <p>
        <strong>loaded</strong> - 
        default: <code>null</code> -
        accepts: <code><em>function</em></code>
      </p>
      <p>
        Callback that is fired once the content has been successfully loaded.
      </p>
  </li>
  <li>
      <p>
        <strong>error</strong> - 
        default: <code>function</code> -
        accepts: <code><em>function</em></code>
      </p>
      <p>
        Function to run if an error occurs during the request. By default 
        the original click event action is carried out.
      </p>
  </li>
</ul>
