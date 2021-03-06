# Rackspace Developer Portal

[https://developer.rackspace.com](https://developer.rackspace.com)

![Rackspace Developer Portal](/img/portfolio/developer.rackspace.com/developer.rackspace.com.jpg)

The deceptively simple Rackspace developer portal is actually the front-end for the expansive, purpose-built content management system we created, [deconst](https://github.com/deconst). Deconst allows content writers to use existing documentation tools like Sphinx and Jekyll (or whatever else they want) to _create_ content, then separately allows site administrators to define how that content is presented as part of a larger website, or multiple websites.

Building the Rackspace developer portal presented the unique challenge of consistently styling content from many sources, written by many writers, and generated by many different tools. The flexibility of Sass proved indispensable on this front, allowing the nuances of different documentation sources to be succinctly styled with a few mixins.

In order to get the right content to the browser in the first place, however, deconst needed a robust system for loading the presentation-agnostic content into the correct templates for the website being displayed. I leveraged Express and Nunjucks (and plenty of custom hooks in between) to provide the Nunjucks templates with access to the deconst content API. The end result was an open-ended template API that made building and maintaining such a large site an absolute breeze.
