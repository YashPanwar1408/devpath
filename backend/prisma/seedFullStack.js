const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ==============================================================================
// 1. HELPER FUNCTIONS
// ==============================================================================

// Extract slug from href (e.g., '/learn/full-stack/html/html-basic' -> 'html-basic')
const getSlug = (href) => {
  const parts = href.split('/');
  return parts[parts.length - 1];
};

// ==============================================================================
// 2. CONTENT GENERATOR (Bootstraps meaningful text for every topic)
// ==============================================================================

const generateContent = (title, category) => {
  const lowerTitle = title.toLowerCase();
  const content = getTopicContent(title, category, lowerTitle);
  return content || generateGenericContent(title, category);
};

const getTopicContent = (title, category, lowerTitle) => {
  // HTML Topics
  if (category === 'HTML') {
    if (lowerTitle.includes('introduction')) {
      return `# ${title}

HTML (HyperText Markup Language) is the standard markup language for creating web pages and applications. It provides the structure and content of every website you visit on the internet. HTML uses a system of tags and elements to define different parts of a document, such as headings, paragraphs, links, and images.

HTML documents are plain text files that web browsers read and render into visual web pages. Every HTML document follows a basic structure with a DOCTYPE declaration, an html root element, and head and body sections. Modern HTML5 introduces semantic elements that improve accessibility and SEO.

Learning HTML is essential for anyone pursuing web development. While CSS handles styling and JavaScript adds interactivity, HTML forms the foundation upon which all web content is built. Understanding proper HTML structure ensures your websites are accessible, maintainable, and search-engine friendly.

Professional developers use HTML daily to structure content, create forms, embed media, and build the skeleton of web applications. Mastering HTML semantics and best practices is crucial for creating websites that work across all devices and browsers.`;
    }
    if (lowerTitle.includes('basic') || lowerTitle.includes('tutorial')) {
      return `# ${title}

HTML basics cover the fundamental concepts every web developer must understand. This includes the structure of HTML documents, proper nesting of elements, and the distinction between block and inline elements. Every HTML file starts with a DOCTYPE declaration followed by html, head, and body tags.

The core building blocks of HTML are elements and tags. Tags are enclosed in angle brackets and usually come in pairs - an opening tag and a closing tag. Elements can contain text content, other elements, or both. Understanding how to properly nest and close tags prevents rendering issues and maintains code quality.

HTML attributes provide additional information about elements. Common attributes include class, id, src, href, and alt. These attributes are specified within the opening tag and help define element behavior, provide metadata, or link to external resources. Learning to use attributes correctly is fundamental to effective HTML development.

Write HTML is a critical skill for building any web application. Even modern frameworks like React and Vue ultimately generate HTML. Solid HTML foundations ensure you can structure content logically, create accessible websites, and debug markup issues efficiently.`;
    }
    if (lowerTitle.includes('elements')) {
      return `# ${title}

HTML elements are the building blocks of web pages, consisting of a start tag, content, and an end tag. Elements define the structure and meaning of content, from headings and paragraphs to complex interactive components. Understanding elements is fundamental to creating well-structured HTML documents.

Elements can be nested inside other elements to create hierarchical document structures. Block-level elements like div, p, and h1 start on new lines and take full width, while inline elements like span, a, and strong flow within text. Proper nesting maintains document validity and ensures consistent rendering across browsers.

Some elements are self-closing or void elements, meaning they don't have closing tags. Examples include img, br, hr, and input. These elements typically don't contain content but may have attributes that define their behavior. HTML5 allows either self-closing syntax or leaving them unclosed.

Modern HTML5 introduced semantic elements that describe their content's meaning, not just its presentation. Elements like header, nav, article, and footer help browsers, search engines, and assistive technologies understand page structure. Using semantic elements improves SEO, accessibility, and code maintainability.`;
    }
    if (lowerTitle.includes('attributes')) {
      return `# ${title}

HTML attributes provide additional information about elements and modify their behavior or appearance. Attributes are always specified in the opening tag and consist of a name-value pair separated by an equals sign. Common attributes include id, class, src, href, and style.

Global attributes can be used on any HTML element. These include class for applying CSS styles, id for unique identification, title for tooltip text, and data-* for custom data storage. The style attribute allows inline CSS, though external stylesheets are generally preferred for maintainability.

Some attributes are element-specific and only work with certain tags. For example, the src attribute specifies image sources for img tags, href defines link destinations for a tags, and type determines input field types for input elements. Understanding which attributes apply to which elements is essential for valid HTML.

Boolean attributes like disabled, checked, and readonly don't require values - their presence alone activates the feature. Modern HTML5 introduced many new attributes for forms, media elements, and semantic markup. Proper use of attributes enhances functionality, accessibility, and user experience.`;
    }
    if (lowerTitle.includes('headings')) {
      return `# ${title}

HTML heading elements range from h1 to h6, with h1 being the most important and h6 the least. Headings define the hierarchical structure of document content, helping users and search engines understand page organization. Each page should typically have one h1 element as the main heading.

Heading hierarchy matters for both accessibility and SEO. Screen readers use headings to navigate content, and search engines use them to understand page topics and structure. Skipping heading levels (like going from h1 to h3) should be avoided as it creates confusion and accessibility issues.

Headings should describe the content that follows them. They're not for styling text larger - CSS handles that. Using headings properly improves content scanability, allowing users to quickly find information they need. Well-structured headings create a logical outline of your document.

Professional developers use headings to create semantic document structures that benefit all users. Properly implemented headings improve page rankings, make content accessible to assistive technologies, and provide clear visual hierarchy. Headings are fundamental to good HTML authoring practices.`;
    }
    if (lowerTitle.includes('paragraphs')) {
      return `# ${title}

The p element represents paragraph text in HTML. Paragraphs are block-level elements that automatically add space before and after themselves, creating clear separation between chunks of text. They're one of the most commonly used HTML elements for structuring written content.

Browsers automatically handle paragraph rendering, adding default margins and line spacing. While these defaults can be overridden with CSS, the p tag's semantic meaning remains important for document structure. Screen readers treat paragraphs as distinct content blocks, improving navigation for visually impaired users.

Paragraphs can contain inline elements like strong, em, a, and span, but shouldn't contain block-level elements like headings or divs. This nesting rule maintains valid HTML structure. Breaking this rule can cause rendering inconsistencies across different browsers.

Using paragraphs appropriately improves content readability and maintainability. Long blocks of text should be broken into multiple paragraphs to enhance scanability. Well-structured paragraphs make content easier to read, understand, and maintain over time.`;
    }
    if (lowerTitle.includes('forms')) {
      return `# ${title}

HTML forms are essential for collecting user input on websites. They enable users to submit data to servers for processing, powering everything from login pages to complex multi-step applications. Forms consist of the form element and various input controls like text fields, checkboxes, radio buttons, and submit buttons.

The form element has important attributes including action (the URL to submit data to) and method (HTTP method, typically GET or POST). The name attribute on form controls determines how data is sent to the server. Understanding form submission mechanics is crucial for web development.

Form validation can occur on both client and server sides. HTML5 introduced built-in validation attributes like required, pattern, min, and max. These provide immediate feedback to users without JavaScript, improving user experience. However, server-side validation remains essential for security.

Modern forms require careful attention to accessibility and user experience. Proper labeling, error messaging, and keyboard navigation ensure forms work for all users. Forms are fundamental to interactive web applications, from simple contact forms to complex data entry systems.`;
    }
    if (lowerTitle.includes('tables')) {
      return `# ${title}

HTML tables organize data into rows and columns, making complex information easy to scan and understand. Tables consist of the table element containing thead, tbody, and tfoot sections, with tr elements defining rows and th or td elements defining cells. Tables should be used for tabular data, not layout.

Table structure includes several semantic elements. The thead element contains header rows, tbody contains body content, and tfoot contains footer rows. The th element represents header cells and should include scope attributes for accessibility. This structure helps assistive technologies interpret table data correctly.

Tables can include caption elements to provide descriptions, col and colgroup elements to style columns, and rowspan or colspan attributes to merge cells. Complex tables require careful planning to remain accessible. Responsive tables often need CSS or JavaScript techniques to work on mobile devices.

Professional developers use tables exclusively for data that logically fits tabular structure. Tables excel at displaying financial data, schedules, comparison charts, and statistical information. Proper table markup with semantic elements ensures data remains accessible and meaningful across all devices and technologies.`;
    }
    if (lowerTitle.includes('links')) {
      return `# ${title}

HTML links, created with the a (anchor) element, connect web pages together and form the foundation of web navigation. The href attribute specifies the link destination, which can be another page, a file download, an email address, or a location on the same page. Links are fundamental to the interconnected nature of the web.

Links can be absolute (full URLs) or relative (paths relative to the current page). Relative links are preferred for internal navigation as they work regardless of domain changes. The target attribute controls where linked content opens - _self for the same window or _blank for new tabs, though the latter should be used sparingly.

Accessible links require descriptive text that makes sense out of context. Avoid generic phrases like "click here." The link text should clearly indicate the destination or action. The title attribute can provide additional context, and aria-label can override link text for screen readers when necessary.

Modern web applications use links for navigation between pages and views. Framework routers often intercept link clicks to enable client-side navigation without full page reloads. Understanding link behavior is essential for creating navigable, user-friendly websites and applications.`;
    }
    if (lowerTitle.includes('images')) {
      return `# ${title}

The img element embeds images in HTML documents. It's a self-closing element that requires the src attribute specifying the image file path. The alt attribute provides alternative text describing the image, crucial for accessibility and SEO. Images without alt text create accessibility barriers for screen reader users.

Image file formats include JPEG for photos, PNG for graphics with transparency, SVG for scalable vector graphics, and modern formats like WebP and AVIF for better compression. Choosing appropriate formats affects page load times and visual quality. Responsive images use srcset and sizes attributes to serve different images based on device characteristics.

Images should be optimized for web use to minimize file sizes without sacrificing quality. This includes compression, appropriate dimensions, and lazy loading for images below the fold. The loading="lazy" attribute enables native browser lazy loading. Image optimization significantly impacts website performance.

Professional developers consider image accessibility, performance, and responsive design. They use appropriate alt text, optimize file sizes, implement responsive images, and leverage modern formats. Images are crucial for engaging user experiences but must be implemented thoughtfully to maintain fast load times and accessibility.`;
    }
    if (lowerTitle.includes('lists')) {
      return `# ${title}

HTML provides three list types: unordered lists (ul), ordered lists (ol), and description lists (dl). Unordered lists display items with bullets, ordered lists use numbers or letters, and description lists pair terms with definitions. Lists structure related items, improving content organization and scanability.

List items are created with li elements inside ul or ol containers. Lists can be nested to create hierarchical structures, useful for navigation menus, table of contents, or outlining complex information. Proper nesting maintains valid HTML and ensures correct rendering across browsers.

Description lists use dt elements for terms and dd elements for definitions. These are ideal for glossaries, metadata displays, or any term-definition pairing. While less common than ul or ol, description lists provide semantic meaning for specific content types.

Lists appear throughout websites - navigation menus, blog archives, product catalogs, and comment threads. CSS transforms plain lists into sophisticated navigation systems, dropdown menus, and custom-styled components. Understanding list structure is fundamental to web development.`;
    }
    if (lowerTitle.includes('semantic')) {
      return `# ${title}

Semantic HTML uses elements that clearly describe their meaning to both browsers and developers. Semantic elements like header, nav, main, article, section, aside, and footer replace generic div elements, making code more readable and meaningful. Semantic markup improves accessibility, SEO, and code maintainability.

Semantic elements help assistive technologies understand page structure. Screen readers use semantic landmarks to help users navigate efficiently. Search engines use semantic markup to better understand content hierarchy and importance, potentially improving rankings. Browsers can also apply default styling more intelligently to semantic elements.

Choosing the right semantic element requires understanding each element's purpose. The article element represents self-contained content, section groups related content, aside contains tangentially related content, and nav contains navigation links. Using semantic elements correctly makes HTML more expressive and meaningful.

Modern web development emphasizes semantic HTML as a foundation for accessible, maintainable websites. Semantic markup separates content structure from presentation, allowing CSS to handle styling while HTML focuses on meaning. This separation of concerns creates more flexible, easier to maintain codebases.`;
    }
    if (lowerTitle.includes('style')) {
      return `# ${title}

HTML provides multiple ways to apply CSS styles to elements. The style attribute adds inline styles directly to elements, the style element embeds CSS in the document head, and the link element connects external stylesheets. External stylesheets are generally preferred for separation of concerns and cacheability.

Inline styles using the style attribute have the highest specificity, overriding external and internal styles. While convenient for testing, inline styles harm maintainability by mixing presentation with content. They prevent style reuse and make global design changes difficult. Inline styles should be used sparingly.

The style element in the document head embeds CSS directly in HTML documents. This approach loads styles without additional HTTP requests but prevents caching across pages. Style elements are useful for page-specific CSS but increase HTML file size and can't be shared across site pages.

External stylesheets linked with link elements offer the best separation of concerns. They're cached by browsers, reducing bandwidth usage across site visits. Multiple pages can share stylesheets, ensuring design consistency. Modern web development strongly favors external CSS for its maintainability and performance benefits.`;
    }
    if (lowerTitle.includes('buttons')) {
      return `# ${title}

HTML buttons enable user interactions through the button element. Buttons can submit forms, trigger JavaScript functions, or reset form fields. The type attribute specifies button behavior: "submit" for form submission, "button" for JavaScript interactions, or "reset" to clear form fields.

Buttons differ from links semantically and functionally. Buttons perform actions within the current context, while links navigate to new locations. Using the correct element is important for accessibility - screen readers announce them differently, and keyboard users expect different behaviors. Never use div or span elements styled as buttons.

Button styling and interactivity can be customized extensively with CSS and JavaScript. Buttons support focus, hover, and active states that provide visual feedback. The disabled attribute prevents interaction, useful for form validation. Accessible buttons include appropriate labels and respond to both mouse and keyboard inputs.

Modern web applications rely heavily on buttons for user interactions. They trigger API calls, open modals, toggle UI elements, and control application state. Well-designed buttons with clear labels and appropriate visual feedback create intuitive user interfaces. Button implementation affects both functionality and user experience.`;
    }
    if (lowerTitle.includes('input')) {
      return `# ${title}

HTML input elements collect various types of user data. The type attribute determines input behavior: text, email, password, number, date, checkbox, radio, file, and many others. HTML5 introduced numerous input types that provide built-in validation and specialized interfaces on mobile devices.

Input elements require associated label elements for accessibility. Labels can wrap inputs or use the for attribute matching the input's id. Clear labels help all users understand what information is expected. The placeholder attribute provides example text but shouldn't replace labels.

Input validation improves data quality and user experience. HTML5 validation attributes include required, pattern (regex validation), min, max, minlength, and maxlength. Browser-provided validation messages appear when validation fails. Custom validation styling uses CSS pseudo-classes like :valid and :invalid.

Professional forms use semantic input types that provide appropriate keyboards on mobile devices and built-in validation. Email inputs show @ keys, number inputs show numeric keypads, and date inputs show date pickers. Proper input implementation enhances usability across all devices and user abilities.`;
    }
    if (lowerTitle.includes('canvas')) {
      return `# ${title}

The HTML5 Canvas element provides a drawing surface for creating graphics, animations, and interactive visualizations with JavaScript. Canvas uses a 2D rendering context accessed via getContext('2d'), offering methods for drawing shapes, text, images, and applying transformations. Canvas is essential for game development, data visualization, and image manipulation.

Canvas operates using immediate mode rendering, meaning drawn content isn't stored as objects but rendered directly to pixels. This differs from SVG's retained mode where elements remain as DOM objects. Canvas excels at rendering many objects or frequent updates, while SVG works better for interactive, scalable graphics with fewer elements.

Drawing on canvas involves setting context properties like fillStyle, strokeStyle, lineWidth, and font, then calling drawing methods like fillRect, strokeRect, arc, and fillText. Transformations including rotate, scale, and translate modify the drawing context. The save and restore methods preserve and restore context state.

Professional developers use Canvas for charts, graphs, image filters, games, and real-time animations. Canvas integrates with requestAnimationFrame for smooth animations and supports WebGL for 3D graphics. Canvas content isn't accessible by default, requiring additional ARIA labels and fallback content for screen readers.`;
    }
    if (lowerTitle.includes('svg')) {
      return `# ${title}

SVG (Scalable Vector Graphics) is an XML-based format for defining vector graphics in HTML. Unlike raster images that pixelate when scaled, SVG graphics remain sharp at any size. SVG elements are part of the DOM, making them styleable with CSS and manipulable with JavaScript. SVG is ideal for icons, logos, charts, and interactive graphics.

SVG uses geometric shapes like rect, circle, ellipse, line, polyline, polygon, and path to create graphics. The path element is most powerful, supporting curves and complex shapes with commands like M (move to), L (line to), and C (curve to). SVG supports gradients, patterns, filters, and animations through declarative markup.

SVG elements can be styled with CSS, including :hover states and transitions. SVG supports transformations, clipping paths, and masks. The viewBox attribute defines the coordinate system, enabling responsive scaling. SVG is fully accessible, with text remaining selectable and screen-reader compatible when properly structured.

Modern web development extensively uses SVG for responsive icons, interactive data visualizations, and animated illustrations. SVG sprites combine multiple icons efficiently. SVG animations use SMIL, CSS animations, or JavaScript libraries. Unlike Canvas, SVG maintains element structure, making it superior for interactive, accessible graphics that need to scale perfectly.`;
    }
    if (lowerTitle.includes('video') || lowerTitle.includes('audio') || lowerTitle.includes('media')) {
      return `# ${title}

HTML5 introduced native video and audio elements, eliminating the need for plugins like Flash. The video and audio elements provide built-in controls and JavaScript APIs for custom players. Multiple source elements support different formats, ensuring compatibility across browsers. Media elements revolutionized web content delivery.

The controls attribute displays browser-default playback controls. Attributes include autoplay (starts automatically), loop (repeats continuously), muted (starts muted), preload (hints for loading strategy), and poster (thumbnail for videos). Custom controls use JavaScript APIs like play(), pause(), currentTime, and volume.

Media events like loadedmetadata, canplay, playing, pause, and ended enable interactive experiences. The HTMLMediaElement API provides properties for duration, playback rate, buffered ranges, and more. Media Source Extensions (MSE) enable adaptive bitrate streaming for services like Netflix and YouTube.

Professional video integration requires optimization for web delivery. Modern formats like WebM and MP4 with H.264/H.265 provide good compression. Responsive video uses CSS for sizing and object-fit for aspect ratios. Accessibility requires captions via track elements. Media implementation impacts page performance, requiring lazy loading and appropriate preload strategies.`;
    }
    if (lowerTitle.includes('responsive') || lowerTitle.includes('rwd')) {
      return `# ${title}

Responsive web design creates websites that adapt to different screen sizes and devices. HTML supports responsive design through viewport meta tags, flexible images, and semantic markup. The viewport meta tag controls how mobile browsers render pages, preventing tiny text on small screens. Responsive HTML works with CSS media queries for device-appropriate layouts.

The viewport meta tag uses content="width=device-width, initial-scale=1.0" to match screen width and set initial zoom. Without this tag, mobile browsers render pages at desktop width and scale down. Responsive images use srcset and sizes attributes to serve appropriate image resolutions, reducing bandwidth on mobile devices.

Semantic HTML improves responsive designs by separating content structure from presentation. Elements like nav, article, and aside can be reordered for different layouts using CSS Flexbox or Grid. Mobile-first development starts with mobile designs and progressively enhances for larger screens, ensuring core functionality works everywhere.

Modern responsive development combines HTML viewport settings, CSS media queries, flexible grids, and responsive images. Progressive enhancement ensures basic functionality works without JavaScript. Responsive typography uses relative units like rem and fluid scaling with clamp(). Testing across real devices ensures responsive designs work in practice, not just on desktop simulators.`;
    }
    if (lowerTitle.includes('api') || lowerTitle.includes('web apis')) {
      return `# ${title}

Web APIs provide JavaScript interfaces for browser capabilities beyond basic HTML/CSS. APIs include DOM manipulation, network requests (Fetch, XMLHttpRequest), storage (localStorage, IndexedDB), geolocation, notifications, and device sensors. Modern web applications rely heavily on these APIs to deliver app-like experiences in browsers.

Storage APIs enable offline functionality and state persistence. LocalStorage provides simple key-value storage, SessionStorage maintains data per browser session, and IndexedDB offers structured database storage for large datasets. The Cache API works with Service Workers for offline web applications.

Network APIs handle server communication. The Fetch API provides promise-based HTTP requests, replacing older XMLHttpRequest. WebSocket enables real-time bidirectional communication. Server-Sent Events (SSE) delivers server-to-client event streams. These APIs power modern dynamic web applications.

Device APIs access hardware capabilities. Geolocation provides location coordinates, Media Capture accesses cameras and microphones, Web Bluetooth connects to Bluetooth devices, and Vibration API controls device vibration. Permission APIs protect user privacy by requiring explicit consent for sensitive features.`;
    }
    if (lowerTitle.includes('storage')) {
      return `# ${title}

Web Storage API provides mechanisms for storing data in browsers. LocalStorage persists data indefinitely until explicitly cleared, while SessionStorage maintains data only for the browser session. Both offer simple key-value storage accessible via JavaScript. Storage APIs enable offline functionality and improved user experiences.

Storage uses string key-value pairs accessed via setItem, getItem, removeItem, and clear methods. Complex data requires JSON serialization. Storage capacity typically ranges from 5-10MB per origin. Storage events notify other tabs when storage changes, enabling cross-tab communication.

Unlike cookies, storage data doesn't transfer to servers with every request, reducing bandwidth. However, storage lacks cookies' security features and HTTP-only protection. Storage is vulnerable to XSS attacks, so never store sensitive data like passwords or tokens. Storage is synchronous, potentially blocking main thread for large operations.

Modern applications use storage for user preferences, cached API responses, form data backup, and offline functionality. IndexedDB suits larger, structured datasets requiring queries. Service Workers and Cache API provide more sophisticated offline strategies. Understanding storage limitations and security implications ensures proper implementation.`;
    }
    if (lowerTitle.includes('geolocation')) {
      return `# ${title}

The Geolocation API provides access to device location through GPS, Wi-Fi, IP address, and cell towers. The navigator.geolocation object offers getCurrentPosition for one-time location and watchPosition for continuous tracking. Location data enables mapping, navigation, location-based services, and localized content.

Geolocation requires user permission due to privacy implications. Browsers display permission prompts when websites request location. Users can deny, grant temporarily, or grant permanently. HTTPS is required for geolocation in modern browsers. Successful location requests return latitude, longitude, accuracy, and optionally altitude and speed.

Error handling manages denied permissions, unavailable location services, and timeouts. Options include enableHighAccuracy for GPS precision, timeout for request duration, and maximumAge for cached position validity. High accuracy drains batteries faster, requiring balance between precision and efficiency.

Location services power ride-sharing, food delivery, weather services, and local search. Reverse geocoding converts coordinates to addresses using services like Google Maps API. Privacy-conscious implementations request location only when needed and clearly explain usage. Location tracking raises ethical considerations requiring transparent data handling and user control.`;
    }
    if (lowerTitle.includes('drag') || lowerTitle.includes('drop')) {
      return `# ${title}

The HTML5 Drag and Drop API enables dragging elements between locations in web pages. Elements become draggable with the draggable="true" attribute. Event handlers on drag sources and drop targets control behavior during drag operations. Drag and drop enhances user interfaces for file uploads, list reordering, and content organization.

Drag events include dragstart (drag begins), drag (during drag), dragend (drag finishes), dragenter (enters drop target), dragover (over drop target), dragleave (leaves target), and drop (released on target). The dataTransfer object carries data during drags, supporting multiple MIME types and custom formats.

Implementing drop zones requires preventDefault() on dragover events to enable dropping. The drop event receives dragged data for processing. Visual feedback during drags improves user experience - adding classes on dragover and removing on drop or dragleave. The effectAllowed and dropEffect properties control cursor appearance.

Modern applications use drag and drop for Kanban boards, file uploaders, image galleries, and dashboard customization. Mobile devices don't support drag and drop natively, requiring touch event alternatives or libraries. Accessibility considerations include keyboard alternatives, as drag and drop isn't universally accessible. Libraries like interact.js simplify cross-device drag and drop implementation.`;
    }
    if (lowerTitle.includes('accessibility')) {
      return `# ${title}

Web accessibility ensures people with disabilities can use websites effectively. HTML provides semantic elements, ARIA attributes, and best practices for creating accessible content. Accessibility isn't optional - many countries legally require accessible websites. Accessible sites also benefit SEO and improve usability for everyone.

Semantic HTML forms the accessibility foundation. Using correct elements like button instead of div for buttons, nav for navigation, and heading hierarchy helps assistive technologies understand content structure. Alt text on images, labels on form inputs, and proper heading levels create accessible experiences.

ARIA (Accessible Rich Internet Applications) attributes supplement HTML semantics for complex interfaces. Roles like role="dialog" or role="tablist", states like aria-expanded, and properties like aria-label provide information to assistive technologies. However, proper HTML semantics should always be preferred over ARIA when possible.

Accessibility testing includes keyboard navigation (Tab, Enter, Escape), screen reader compatibility (NVDA, JAWS, VoiceOver), color contrast ratios, and focus management. Tools like Lighthouse, axe, and WAVE identify accessibility issues. Building with accessibility in mind from the start costs less than retrofitting. Inclusive design benefits all users through clearer interfaces and better usability.`;
    }
    if (lowerTitle.includes('events')) {
      return `# ${title}

HTML events enable interactivity by detecting user actions and triggering JavaScript responses. Events include clicks, key presses, form submissions, mouse movements, page loads, and more. Understanding event handling is fundamental to creating dynamic, interactive web applications.

Event listeners attach to elements using addEventListener, which requires an event type and callback function. Events bubble from target elements up through ancestors, allowing parent elements to handle child events. The stopPropagation method prevents bubbling, while preventDefault stops default actions like form submissions or link navigation.

The event object passed to handlers contains information about the event including type, target, currentTarget, timestamp, and event-specific properties. Mouse events provide coordinates, keyboard events provide key codes, and form events provide input values. Event delegation uses bubbling to handle events efficiently on many elements.

Modern applications separate behavior (JavaScript) from structure (HTML) by attaching events programmatically rather than using inline onclick attributes. This separation improves maintainability and security. Custom events enable component communication. Understanding event timing, bubbling, and delegation patterns is essential for building responsive, efficient user interfaces.`;
    }
    return null; // Return null if no specific content found for this HTML topic
  }

  // CSS Topics
  if (category === 'CSS') {
    if (lowerTitle.includes('introduction') || lowerTitle.includes('home')) {
      return `# ${title}

CSS (Cascading Style Sheets) is the styling language that controls how HTML elements are displayed. CSS separates presentation from content, allowing designers to change site-wide styles from a single file. It controls layout, colors, fonts, animations, and responsive design, making it essential for modern web development.

CSS consists of selectors that target HTML elements and declarations that define styles. A declaration includes a property and value, like color: blue or font-size: 16px. Multiple declarations form rule sets that transform plain HTML into visually appealing websites.

The "cascading" nature means styles can be inherited from parent elements and overridden by more specific rules. Understanding specificity, inheritance, and the cascade is crucial for managing styles effectively. CSS also supports variables, calculations, and logical grouping for maintainable stylesheets.

Professional web development requires strong CSS skills. Modern CSS includes powerful features like Flexbox and Grid for layout, custom properties for theming, and animations for engaging interfaces. CSS frameworks like Tailwind and Bootstrap build on CSS foundations, but understanding core CSS principles remains essential.`;
    }
    if (lowerTitle.includes('syntax')) {
      return `# ${title}

CSS syntax consists of selectors, properties, and values organized into rule sets. A rule set begins with a selector identifying which HTML elements to style, followed by curly braces containing property-value pairs called declarations. Each declaration ends with a semicolon, and the last semicolon is optional but recommended.

Selectors can be simple element names, classes, IDs, attributes, or complex combinations. Element selectors like p target all paragraph elements, class selectors like .button target elements with class="button", and ID selectors like #header target the element with id="header". Understanding selector syntax is fundamental to applying styles effectively.

Property-value pairs define specific styles. Properties describe what to change (color, font-size, margin), and values specify how to change it (blue, 16px, 10px). Some properties accept multiple values, like margins that can be specified for each side. Values can be keywords, numbers, percentages, or colors in various formats.

Comments in CSS use /* comment syntax */ and can span multiple lines. Comments help explain complex selectors, document browser-specific hacks, or organize large stylesheets. Well-commented CSS improves maintainability, especially when working in teams or returning to code after time away.`;
    }
    if (lowerTitle.includes('selectors')) {
      return `# ${title}

CSS selectors identify which HTML elements to style. Understanding selectors is crucial for efficient CSS development. Selectors range from simple element names to complex combinations using combinators, pseudo-classes, and attribute selectors. Mastering selectors enables precise element targeting without cluttering HTML with classes.

Basic selectors include element (p), class (.classname), ID (#idname), and universal (*) selectors. Class selectors are reusable across multiple elements, while ID selectors target unique elements. The universal selector targets all elements but should be used carefully due to performance implications on large documents.

Combinators create relationships between selectors. Descendant selectors (div p) target all p elements inside div elements. Child selectors (div > p) target only direct children. Adjacent sibling (h1 + p) and general sibling (h1 ~ p) selectors target elements based on their position relative to siblings.

Attribute selectors target elements based on their attributes. [type="text"] targets inputs with type="text", [class^="btn"] targets classes starting with "btn", and [href$=".pdf"] targets links ending with ".pdf". These powerful selectors reduce the need for extra classes in HTML markup.`;
    }
    if (lowerTitle.includes('box model')) {
      return `# ${title}

The CSS box model defines how element size is calculated, consisting of content, padding, border, and margin layers. Understanding the box model is fundamental to CSS layout. By default, width and height properties set content box size, with padding and border adding to total element size.

Each layer serves a specific purpose. Content contains text or nested elements, padding creates space inside borders, borders create visible boundaries, and margins create space outside borders. These layers can be controlled independently for each side (top, right, bottom, left) or using shorthand properties.

The box-sizing property controls how browsers calculate element dimensions. The default content-box calculates width as content only, often causing sizing confusion. The border-box value includes padding and border in width calculations, making layouts more predictable. Most modern developers set box-sizing: border-box globally.

Box model understanding prevents common layout issues like unexpected element sizes or broken layouts. Margins collapse between adjacent elements in certain situations, combining rather than adding. Padding never collapses and always creates space between content and borders. Mastering the box model is essential for reliable CSS layouts.`;
    }
    if (lowerTitle.includes('flexbox') || lowerTitle.includes('flex')) {
      return `# ${title}

Flexbox is a one-dimensional layout system for arranging elements in rows or columns. It provides powerful alignment, distribution, and ordering capabilities that were difficult or impossible with older CSS techniques. Flexbox revolutionized CSS layout by solving common problems like vertical centering and equal-height columns.

Flexbox requires a flex container (display: flex) holding flex items. The flex-direction property controls whether items arrange horizontally (row) or vertically (column). Container properties like justify-content align items along the main axis, while align-items aligns items along the cross axis. These properties create flexible, responsive layouts with minimal code.

Flex items can grow, shrink, and set base sizes using flex-grow, flex-shrink, and flex-basis properties, often combined in the shorthand flex property. This flexibility allows items to adapt to available space, creating responsive layouts without media queries. The order property reorders items visually without changing HTML.

Modern web layouts extensively use Flexbox for navigation bars, card layouts, form controls, and centering content. Flexbox works exceptionally well for components where items arrange in a single direction. For two-dimensional layouts, CSS Grid is preferred, but Flexbox and Grid often work together in complex layouts.`;
    }
    if (lowerTitle.includes('grid')) {
      return `# ${title}

CSS Grid is a two-dimensional layout system for creating complex grid-based layouts. Unlike Flexbox's one-dimensional approach, Grid handles both rows and columns simultaneously, making it ideal for page layouts and components requiring precise positioning in both dimensions. Grid has become the standard for modern web layouts.

Grid containers (display: grid) define rows and columns using grid-template-rows and grid-template-columns properties. The fr (fraction) unit distributes available space proportionally, while other units like px, %, and auto offer precise control. The gap property creates spacing between grid tracks without affecting outer margins.

Grid items can span multiple rows or columns using grid-column and grid-row properties. Named grid lines and areas make complex layouts more readable and maintainable. The grid-template-areas property creates visual grid templates directly in CSS, making layouts self-documenting and easy to modify.

Professional developers use Grid for page layouts, dashboards, galleries, and any interface requiring two-dimensional control. Grid combines with Flexbox - Grid for overall layout and Flexbox for components within grid cells. Understanding Grid enables creating complex, responsive layouts previously requiring complicated float or position hacks.`;
    }
    if (lowerTitle.includes('position')) {
      return `# ${title}

The CSS position property controls how elements are positioned in documents. Values include static (default), relative, absolute, fixed, and sticky. Understanding positioning is essential for creating layered layouts, tooltips, modals, navigation bars, and other sophisticated UI components.

Relative positioning moves elements from their normal position using top, right, bottom, and left properties. The element's original space remains reserved, and other elements aren't affected. Relative positioning often serves as a reference point for absolutely positioned children.

Absolute positioning removes elements from normal document flow and positions them relative to the nearest positioned ancestor (any ancestor with position other than static). If no positioned ancestor exists, absolute positioning uses the document body. This enables overlays, tooltips, and dropdown menus that appear above other content.

Fixed positioning removes elements from document flow and positions them relative to the viewport. Fixed elements remain visible when users scroll, making them ideal for persistent headers, navigation bars, or back-to-top buttons. Sticky positioning combines relative and fixed behaviors, switching modes based on scroll position.`;
    }
    if (lowerTitle.includes('media queries')) {
      return `# ${title}

Media queries enable responsive design by applying styles based on device characteristics like screen width, height, resolution, and orientation. They're essential for creating websites that work well on devices from small phones to large desktop monitors. Media queries are the foundation of mobile-first responsive design.

Media query syntax uses @media followed by media type (screen, print) and conditions. The most common queries test viewport width with min-width and max-width. Multiple conditions combine with and, or, or not operators. Modern best practice starts with mobile styles and progressively enhances for larger screens with min-width queries.

Common breakpoints target typical device sizes: 640px for small tablets, 768px for tablets, 1024px for laptops, and 1280px for desktops. However, breakpoints should be chosen based on design needs rather than specific devices. Content should determine where layouts need to change, not arbitrary device dimensions.

Responsive design requires more than just media queries. Developers combine fluid layouts, flexible images, responsive typography, and touch-friendly interfaces. Modern CSS features like Grid and Flexbox reduce media query needs by adapting automatically. However, media queries remain essential for major layout changes and device-specific optimizations.`;
    }
    if (lowerTitle.includes('animation')) {
      return `# ${title}

CSS animations create sophisticated motion effects without JavaScript. Animations are defined using @keyframes rules that specify style changes at various points during the animation. The animation property applies these keyframes to elements, controlling duration, timing, delay, iteration, and direction.

Keyframes define animation stages using percentages or from/to keywords. At each stage, specify CSS properties that should change. The browser smoothly interpolates between keyframes, creating fluid motion. Animations can change any animatable CSS property including transforms, opacity, colors, and dimensions.

The animation property is shorthand for animation-name, animation-duration, animation-timing-function, animation-delay, animation-iteration-count, animation-direction, animation-fill-mode, and animation-play-state. Understanding each sub-property provides fine control over animation behavior. Timing functions like ease, linear, and cubic-bezier control acceleration and deceleration.

Professional animations enhance user experience without causing distraction or performance issues. Excessive animation can make interfaces feel sluggish or overwhelming. Respect user preferences with prefers-reduced-motion media queries, which disable animations for users who find them disorienting. Well-crafted animations guide attention, provide feedback, and create delightful interactions.`;
    }
    if (lowerTitle.includes('variables') || lowerTitle.includes('custom properties')) {
      return `# ${title}

CSS custom properties (CSS variables) store reusable values that can be referenced throughout stylesheets. Variables are defined with -- prefix and accessed using the var() function. They enable dynamic theming, reduce repetition, and make stylesheets more maintainable. Unlike preprocessor variables, CSS variables update live in the browser.

Variables are declared within selectors, typically :root for global scope. For example, --primary-color: #3498db defines a color variable. Variables can store any CSS value including colors, dimensions, fonts, or complex values like gradients. Scoped variables in specific selectors override global ones, enabling component-specific customization.

The var() function retrieves variable values and accepts fallback values if variables are undefined. For example, var(--primary-color, blue) uses blue if --primary-color isn't defined. This fallback mechanism ensures styles degrade gracefully. Variables can reference other variables, creating hierarchical theming systems.

Modern web applications use CSS variables extensively for theming, component customization, and responsive design. JavaScript can read and modify CSS variables, enabling dynamic theme switching and state-dependent styling. While Sass variables compile to static values, CSS variables provide runtime flexibility essential for modern interactive applications.`;
    }
    if (lowerTitle.includes('transitions')) {
      return `# ${title}

CSS transitions create smooth animations when property values change. Unlike animations that run automatically, transitions activate when triggered by state changes like hover, focus, or JavaScript modifications. Transitions enhance user experience by making changes feel smooth and natural rather than jarring and instant.

The transition property is shorthand for transition-property (what to animate), transition-duration (how long), transition-timing-function (acceleration curve), and transition-delay (wait time). For example, transition: background-color 0.3s ease creates a 0.3-second background color transition with ease timing.

Timing functions control how transitions progress over time. Linear timing creates consistent speed, ease starts slow then speeds up and slows down, and cubic-bezier enables custom curves. The transition-property can target specific properties or use all to transition everything. Multiple transitions can be comma-separated for different properties.

Effective transitions provide visual feedback for user interactions. Buttons change color on hover, form fields highlight on focus, and menus animate open and closed. Transitions should be quick enough to feel responsive but not so fast users miss them. Durations between 200-400ms work well for most interface transitions, creating polished, professional user experiences.`;
    }
    if (lowerTitle.includes('specificity')) {
      return `# ${title}

CSS specificity determines which styles apply when multiple rules target the same element. Specificity is calculated based on selector types: inline styles have highest specificity, followed by IDs, classes/attributes/pseudo-classes, and finally elements/pseudo-elements. Understanding specificity prevents styling conflicts and reduces !important usage.

Specificity is calculated as a three-part number (inline, IDs, classes+attributes+pseudo-classes, elements). For example, #header .nav li has specificity (0,1,1,1) - one ID, one class, one element. More specific selectors override less specific ones. Equal specificity uses source order - later rules win.

The !important declaration overrides normal specificity rules, making styles difficult to override. !important creates maintenance problems and should be avoided except for utility classes or third-party style overrides. Refactoring specificity issues by increasing selector specificity is preferable to !important.

Professional CSS maintainability requires managing specificity consciously. Methodologies like BEM keep specificity low and consistent. Avoiding deeply nested selectors and ID selectors maintains flexibility. CSS architecture balancing specificity and maintainability produces scalable, conflict-free stylesheets.`;
    }
    if (lowerTitle.includes('pseudo-class')) {
      return `# ${title}

CSS pseudo-classes style elements based on their state or position rather than attributes. Common pseudo-classes include :hover, :focus, :active, :visited, :first-child, :last-child, :nth-child, and :not. Pseudo-classes enable dynamic styling without JavaScript, creating interactive, context-aware designs.

State pseudo-classes respond to user interactions. :hover applies when users point at elements, :focus when elements receive keyboard or programmatic focus, and :active during clicks. :visited styles visited links differently. These pseudo-classes create interactive feedback without JavaScript.

Structural pseudo-classes select elements by position. :first-child and :last-child target first and last children, :nth-child(n) uses formulas for patterns, :only-child targets solitary children. These selectors eliminate the need for classes on every element, producing cleaner HTML.

Form pseudo-classes style inputs based on state: :valid, :invalid, :required, :optional, :checked, :disabled. These provide visual feedback during form interactions. Modern pseudo-classes like :is(), :where(), and :has() offer powerful selection capabilities. Understanding pseudo-classes enables sophisticated styling with minimal markup.`;
    }
    if (lowerTitle.includes('pseudo-element')) {
      return `# ${title}

CSS pseudo-elements style specific parts of elements or insert generated content. Using double-colon syntax (::before, ::after, ::first-line, ::first-letter), pseudo-elements create visual effects without extra HTML. Pseudo-elements are essential for decorative effects, icons, and special typography.

::before and ::after pseudo-elements insert content before or after element content. They require the content property, which can be text, images, or empty strings for styling purposes. These pseudo-elements are inline by default but accept display changes. They're commonly used for icons, decorative elements, and clearfix hacks.

::first-letter and ::first-line style initial letters and lines, enabling drop caps and special formatting. ::selection styles text users select. ::marker customizes list markers. Modern pseudo-elements like ::placeholder style form placeholders. Pseudo-elements expand styling possibilities beyond HTML structure.

Professional designs use pseudo-elements for decorative effects, reducing HTML clutter. Icon fonts and symbols often use ::before and ::after. Quotation marks, tooltips, and badges commonly use pseudo-elements. Understanding pseudo-elements enables cleaner markup and reusable styling patterns. However, pseudo-element content isn't selectable or accessible to screen readers.`;
    }
    if (lowerTitle.includes('colors')) {
      return `# ${title}

CSS supports multiple color formats including named colors, hexadecimal, RGB, RGBA, HSL, and HSLA. Modern CSS adds color functions for manipulation and relative colors. Understanding color formats enables precise color control and theming systems. Color choice significantly impacts design aesthetics and accessibility.

Hexadecimal colors use # followed by six (or three for shorthand) digits representing red, green, blue values. RGB/RGBA uses rgb(r, g, b) or rgba(r, g, b, a) functions with values 0-255 for colors and 0-1 for alpha transparency. HSL/HSLA specifies hue, saturation, lightness, enabling intuitive color variations.

Modern CSS includes currentColor keyword inheriting text color, transparent for fully transparent colors, and color() function for wide-gamut colors. Custom properties store colors for theming. Color-contrast() and color-mix() functions (where supported) enable dynamic color calculations.

Accessible color usage requires sufficient contrast between text and backgrounds. WCAG AA requires 4.5:1 ratio for normal text, 3:1 for large text. Tools like Contrast Checker validate accessibility. Color shouldn't convey information alone - combine with text or patterns. Understanding color psychology, cultural associations, and accessibility ensures effective design.`;
    }
    if (lowerTitle.includes('transform')) {
      return `# ${title}

CSS transforms alter element appearance through rotation, scaling, skewing, and translation without affecting document flow. Transform functions include rotate(), scale(), translateX/Y/Z(), skew(), and matrix() for simultaneous transformations. Transforms are hardware-accelerated, making them performant for animations.

2D transforms operate in two dimensions. translate(x, y) moves elements, scale(x, y) changes size, rotate(deg) rotates, and skew(deg) slants. Multiple transforms can be chained: transform: rotate(45deg) scale(1.2). Transform-origin controls the point around which transformations occur, defaulting to element center.

3D transforms add depth using perspective and Z-axis. perspective() creates 3D space, translateZ() moves on Z-axis, rotateX/Y/Z() rotates in 3D. The transform-style: preserve-3d property maintains 3D positioning for child elements. Backface-visibility controls whether element backs show during 3D rotations.

Transforms enable sophisticated visual effects - rotating cards, scaling on hover, creating 3D flips, and parallax scrolling. Transforms combined with transitions create smooth interactive effects. Unlike modifying top/left, transforms don't trigger layout recalculation, making them efficient for animations. Modern UI animations extensively rely on transform properties.`;
    }
    if (lowerTitle.includes('units')) {
      return `# ${title}

CSS units measure sizes, distances, and time in stylesheets. Understanding units is fundamental to responsive design and precise layouts. Units divide into absolute (fixed size) and relative (proportional size). Choosing appropriate units affects accessibility, maintainability, and responsive behavior.

Absolute units include px (pixels), pt (points), cm, mm, and in (inches). Pixels are most common for absolute sizing. While absolute sizing seems precise, it doesn't respond to user preferences or viewport changes. Absolute units suit specific cases like borders or shadows but generally should be avoided for layout and typography.

Relative units scale based on context. em sizes relative to parent element font-size, rem relative to root element, % relative to parent size. vw/vh size relative to viewport width/height, vmin/vmax relative to smaller/larger viewport dimension. Relative units create flexible, accessible designs adapting to different contexts.

Modern best practices favor rem for typography (respects user font preferences), % or vw/vh for layouts, and px for small fixed values like borders. The ch unit sizes relative to "0" character width, useful for text-based sizing. The clamp() function combines min, preferred, and max values for fluid typography. Choosing appropriate units is essential for responsive, accessible web design.`;
    }
    if (lowerTitle.includes('sass') || lowerTitle.includes('scss')) {
      return `# ${title}

Sass (Syntactically Awesome Style Sheets) is a CSS preprocessor adding features like variables, nesting, mixins, functions, and inheritance. Sass extends CSS with programming capabilities, improving maintainability for large projects. Sass compiles to standard CSS before deployment.

Variables in Sass store reusable values like colors, fonts, or dimensions using $ syntax. Unlike CSS custom properties, Sass variables compile to static values. Nesting mirrors HTML structure, improving readability but requiring care to avoid excessive specificity. Partial files and @import organize stylesheets into manageable modules.

Mixins are reusable style blocks accepting arguments, eliminating repetition. @extend shares styles between selectors. Functions perform calculations and return values. Control directives like @if, @each, and @for enable conditional and iterative styling. These features reduce code duplication and improve maintainability.

Modern development often pairs Sass with CSS custom properties - Sass for build-time logic, CSS properties for runtime theming. Build tools like webpack, Vite, or Parcel compile Sass automatically. While native CSS has adopted some Sass features (variables, nesting proposal), Sass remains valuable for complex projects requiring advanced preprocessing capabilities.`;
    }
    if (lowerTitle.includes('responsive') || (lowerTitle.includes('rwd') && !lowerTitle.includes('keyword'))) {
      return `# ${title}

Responsive web design (RWD) creates websites that adapt gracefully to different devices and screen sizes. RWD combines fluid grids, flexible images, and media queries to deliver optimal experiences from phones to large monitors. Mobile traffic dominates the web, making responsive design essential rather than optional.

Fluid grids use relative units like percentages instead of fixed pixels, allowing layouts to scale proportionally. Modern CSS Grid and Flexbox create sophisticated responsive layouts with minimal code. Container queries (emerging feature) enable components to respond to parent size rather than viewport, improving modularity.

Media queries apply styles based on device characteristics. Mobile-first approaches start with mobile styles and enhance for larger screens using min-width queries. Common breakpoints target tablets (768px) and desktops (1024px), but content should dictate breakpoints. Media queries also detect orientation, resolution, and user preferences like dark mode or reduced motion.

Responsive images use srcset and sizes attributes to serve appropriately sized images, reducing bandwidth. The picture element provides more control with multiple sources and art direction. CSS object-fit controls image scaling within containers. Combining responsive HTML, CSS, and performance optimization creates fast, adaptive websites that work everywhere.`;
    }
    if (lowerTitle.includes('border') && !lowerTitle.includes('image')) {
      return `# ${title}

CSS borders create visible boundaries around elements using border-width, border-style, and border-color properties. The border shorthand combines these: border: 1px solid #000. Borders can be set individually for each side (top, right, bottom, left) or applied uniformly. Borders affect box model dimensions unless box-sizing: border-box is set.

Border styles include solid, dashed, dotted, double, groove, ridge, inset, and outset. Border width accepts thin, medium, thick keywords or specific values. Border color accepts any CSS color format. Individual sides use border-top, border-right, etc. The border-radius property creates rounded corners.

Modern borders include border-image for complex borders using images, and outline for focus indicators that don't affect layout. Box-shadow creates drop shadows and multiple borders without affecting layout. Border-radius creates rounded corners, accepting different values for each corner for elliptical rounding.

Professional designs use borders for visual separation, focus indicators, and decorative effects. Subtle borders prevent harsh edges, while prominent borders create emphasis. Borders on form fields indicate interactivity. Focus indicators (outlines or border changes) are essential for keyboard accessibility. Borders are fundamental to visual design and UI clarity.`;
    }
    if (lowerTitle.includes('margin') || lowerTitle.includes('padding')) {
      return `# ${title}

Margins and padding create space around and within elements. Margins create external space between elements, while padding creates internal space between content and borders. Understanding these spacing properties is fundamental to layout control and visual hierarchy. Proper spacing improves readability and visual appeal.

Both properties accept one to four values setting all sides, vertical/horizontal pairs, or individual sides. For example, margin: 10px applies to all sides, margin: 10px 20px sets vertical and horizontal, margin: 10px 20px 30px 40px sets top, right, bottom, left. Shorthand reduces code and improves maintainability.

Margin collapse occurs when vertical margins between adjacent elements combine rather than add. The larger margin wins, not the sum. Padding never collapses. Understanding collapse prevents unexpected spacing. Margin auto centers block elements with defined width. Negative margins pull elements closer or create overlaps.

Best practices use consistent spacing scales (8px, 16px, 24px) for visual harmony. Modern spacing utilities and custom properties centralize spacing values. Maintaining consistent spacing throughout designs creates professional, polished interfaces. Proper spacing improves scannability, groups related content, and creates visual rhythm.`;
    }
    if (lowerTitle.includes('display')) {
      return `# ${title}

The CSS display property controls how elements generate boxes in the layout. Values include block, inline, inline-block, flex, grid, none, and many others. Understanding display is fundamental to CSS layout. Display determines element sizing, positioning, and interaction with siblings.

Block elements (div, p, h1) start on new lines and take full available width. Inline elements (span, a, strong) flow within text and size to content. Inline-block combines inline flow with block sizing capabilities. Display: none removes elements completely from layout, unlike visibility: hidden which reserves space.

Display: flex creates flex containers enabling flexbox layout. Display: grid creates grid containers for two-dimensional layouts. These modern display modes revolutionized CSS layout, replacing float-based designs. Display: contents removes the element's box, promoting children to the parent's level in layout.

Modern layouts extensively use flex and grid display modes. Display: table and related values create table-like layouts without HTML tables. Display impacts accessibility - screen readers may announce elements differently based on display. Understanding display behavior enables creating any layout from simple stacks to complex grids and flexible components.`;
    }
    if (lowerTitle.includes('float')) {
      return `# ${title}

The float property moves elements to the left or right, allowing text and inline elements to wrap around them. Originally designed for magazine-style text wrapping, floats became the primary layout technique before Flexbox and Grid emerged. Understanding floats remains relevant for wrapping text around images and understanding legacy code.

Float values include left (moves element left), right (moves element right), and none (default). Floated elements are removed from normal document flow but remain affecting surrounding content. Text and inline elements wrap around floated elements. Multiple floats stack horizontally until width is insufficient.

Clearing floats prevents content from wrapping. The clear property with left, right, or both values moves elements below floats. Container collapse occurs when all children are floated - the clearfix hack or overflow: auto solves this. Modern layouts often use display: flow-root for float containment.

While Flexbox and Grid replaced floats for layout, floats remain useful for text wrapping around images - their original purpose. Legacy codebases extensively use floats. Understanding float behavior helps maintain older code and implement specific wrapping effects. For new projects, prefer modern layout methods over float-based designs.`;
    }
    if (lowerTitle.includes('overflow')) {
      return `# ${title}

The overflow property controls how content behaves when it exceeds element boundaries. Values include visible (default, content overflows), hidden (clips overflow), scroll (adds scrollbars), and auto (scrollbars only when needed). Overflow management is essential for constrained layouts, scrollable regions, and preventing layout breaks.

Overflow-x and overflow-y control horizontal and vertical overflow independently. Overflow: hidden clips content, useful for clearing floats, preventing margin collapse, or creating specific effects. Overflow: scroll always shows scrollbars even when unnecessary, while auto shows them only when content overflows.

Modern overflow values include overflow: clip (hard clipping without scrolling), overlay (deprecated, scrollbars over content), and scroll-behavior: smooth for smooth scrolling. The overflow-wrap and word-break properties control text overflow behavior. Text-overflow: ellipsis adds ... for truncated text.

Professional designs use overflow carefully. Scrollable regions require sufficient contrast for scrollbars and keyboard accessibility. Overflow: hidden prevents layout breaks but hides content. Touch devices need sufficient scroll target sizes. Understanding overflow behavior prevents layout issues and creates controlled scrolling experiences.`;
    }
    return null; // Return null if no specific content found for this CSS topic
  }

  // JavaScript Topics
  if (category === 'JavaScript') {
    if (lowerTitle.includes('tutorial') || lowerTitle.includes('intro')) {
      return `# ${title}

JavaScript is the programming language of the web, enabling interactive, dynamic web pages and applications. Originally created for browser environments, JavaScript now powers servers (Node.js), mobile apps (React Native), and desktop applications (Electron). JavaScript is essential for modern web development.

JavaScript executes in the browser, responding to user interactions and manipulating page content. Variables store data, functions encapsulate logic, and objects organize code. JavaScript is dynamically typed, meaning variable types are determined at runtime. Modern JavaScript (ES6+) includes powerful features like arrow functions, destructuring, and modules.

JavaScript interacts with HTML and CSS through the DOM (Document Object Model). The DOM represents page structure as objects JavaScript can modify. Event listeners respond to user actions. Modern JavaScript development uses frameworks like React, Vue, and Angular that abstract DOM manipulation into component-based architectures.

Professional JavaScript requires understanding scope, closures, asynchronous programming, and design patterns. JavaScript powers everything from simple form validation to complex single-page applications. Learning JavaScript opens doors to full-stack development, as the same language works across the entire stack with Node.js.`;
    }
    if (lowerTitle.includes('variable')) {
      return `# ${title}

JavaScript variables store data values that can be referenced and manipulated throughout code. Modern JavaScript provides three keywords for declaring variables: let (block-scoped, mutable), const (block-scoped, immutable reference), and var (function-scoped, legacy). Understanding variable declaration and scoping is fundamental to JavaScript development.

Variable names must start with letters, underscores, or dollar signs, followed by letters, digits, underscores, or dollar signs. Naming conventions include camelCase for variables and functions, PascalCase for classes. Descriptive names improve code readability. Reserved keywords cannot be used as variable names.

Let and const introduced in ES6 provide block scoping, preventing many bugs caused by var's function scoping and hoisting behavior. Const prevents reassignment but doesn't make objects immutable - object properties can still change. Developers prefer const by default, using let only when reassignment is necessary, and avoiding var entirely.

Variable scope determines where variables are accessible. Block scope confines let and const to the nearest curly braces, function scope applies to var. Global variables are accessible everywhere but should be minimized to prevent conflicts. Understanding scope and the temporal dead zone prevents common JavaScript errors.`;
    }
    if (lowerTitle.includes('function')) {
      return `# ${title}

JavaScript functions are reusable blocks of code that perform specific tasks. Functions encapsulate logic, accept parameters, return values, and create modular, maintainable code. Functions are first-class objects in JavaScript, meaning they can be assigned to variables, passed as arguments, and returned from other functions.

Function declarations use the function keyword: function name(params) {}. Function expressions assign functions to variables: const name = function(params) {}. Arrow functions introduced in ES6 provide concise syntax: const name = (params) => {}. Arrow functions have different this binding behavior, important for object methods and callbacks.

Parameters pass data into functions. Default parameters provide fallback values. Rest parameters (...args) collect multiple arguments into an array. Return statements send values back to callers. Functions without explicit returns return undefined. Higher-order functions accept or return other functions, enabling powerful functional programming patterns.

Modern JavaScript extensively uses functions for callbacks, promises, event handlers, and component logic. Pure functions return the same output for the same input without side effects, improving testability and predictability. Understanding function scope, closures, and this binding is essential for effective JavaScript development.`;
    }
    if (lowerTitle.includes('objects')) {
      return `# ${title}

JavaScript objects are collections of key-value pairs representing entities with properties and methods. Objects organize related data and functionality, forming the foundation of JavaScript programming. Object literals use curly braces: {key: value}. Properties store data, methods are functions attached to objects.

Properties are accessed using dot notation (obj.property) or bracket notation (obj['property']). Bracket notation allows dynamic property names and properties with special characters. Methods are functions that belong to objects, accessing object data via this keyword. Object constructors and classes create multiple instances with shared structure.

Modern JavaScript includes powerful object features. Destructuring extracts properties: const {name, age} = person. Spread operator copies objects: {...obj}. Object.keys(), Object.values(), and Object.entries() enable iteration. Property shorthand, computed property names, and method syntax improve readability and flexibility.

Objects model real-world entities in code - users, products, orders. Object-oriented programming organizes code around objects. JSON (JavaScript Object Notation) uses object-like syntax for data interchange. Understanding objects, prototypes, and this binding is fundamental to JavaScript mastery.`;
    }
    if (lowerTitle.includes('array')) {
      return `# ${title}

JavaScript arrays store ordered collections of values accessible by numeric indices. Arrays can contain any data type, including mixed types. Array methods provide powerful data manipulation capabilities. Arrays are fundamental to JavaScript programming, used for lists, collections, and data processing.

Arrays are created with square brackets: [1, 2, 3] or new Array(). Indices start at zero. Arrays have a length property tracking element count. Common methods include push (add to end), pop (remove from end), shift (remove from start), and unshift (add to start). These methods mutate the array.

Higher-order array methods enable functional programming. map() transforms elements, filter() selects elements, reduce() accumulates values, forEach() iterates elements. These methods don't mutate original arrays (except forEach), returning new arrays instead. find(), some(), and every() search arrays.

Modern JavaScript includes array destructuring, spread operator for copying/concatenating, and Array.from() for creating arrays from iterables. Understanding array methods, immutability, and functional patterns is crucial for data manipulation. Arrays power most list-based UI components in modern frameworks.`;
    }
    if (lowerTitle.includes('async') || lowerTitle.includes('promise')) {
      return `# ${title}

Asynchronous JavaScript handles operations that take time without blocking code execution. Callbacks, Promises, and async/await manage asynchronous operations like network requests, file operations, and timers. Understanding asynchronous patterns is essential for modern JavaScript development.

Promises represent eventual completion or failure of asynchronous operations. Promises have three states: pending (initial), fulfilled (successful), or rejected (failed). The then() method handles success, catch() handles errors. Promises chain operations elegantly, avoiding callback hell from nested callbacks.

Async/await syntax introduced in ES8 makes asynchronous code look synchronous. Async functions return promises implicitly. The await keyword pauses execution until promises resolve, making code more readable. Try/catch blocks handle errors with async/await. Async/await is now the preferred asynchronous pattern.

Modern web applications heavily rely on asynchronous operations for API calls, database queries, and real-time updates. Fetch API uses promises for HTTP requests. Understanding promise chaining, error handling, parallel execution with Promise.all(), and async/await patterns is crucial for building responsive applications.`;
    }
    if (lowerTitle.includes('dom')) {
      return `# ${title}

The DOM (Document Object Model) is a programming interface representing HTML documents as a tree structure. JavaScript manipulates the DOM to dynamically update content, structure, and styling. Understanding DOM manipulation is fundamental to interactive web development, though modern frameworks often abstract this complexity.

Element selection uses methods like getElementById(), getElementsByClassName(), querySelector(), and querySelectorAll(). querySelector uses CSS selectors for flexible element selection. Once elements are selected, JavaScript can read and modify properties including textContent, innerHTML, style, className, and attributes.

Creating and modifying elements involves createElement(), appendChild(), insertBefore(), and removeChild(). Event listeners attach to elements using addEventListener(), responding to clicks, input changes, keyboard presses, and more. Modern best practices favor event delegation - attaching listeners to parent elements rather than many children.

While frameworks like React abstract DOM manipulation, understanding the DOM remains valuable. Direct DOM manipulation is sometimes necessary for integration with third-party libraries or performance optimization. DOM performance impacts page responsiveness - batch DOM updates, use documentFragment for bulk insertions, and avoid layout thrashing.`;
    }
    if (lowerTitle.includes('class') && !lowerTitle.includes('pseudo')) {
      return `# ${title}

JavaScript classes introduced in ES6 provide cleaner syntax for object-oriented programming. Classes are syntactic sugar over JavaScript's existing prototype-based inheritance but offer more familiar syntax for developers from class-based languages. Classes organize code around blueprints for creating objects with shared structure and behavior.

Class syntax includes a constructor method for initialization and method definitions for behavior. The new keyword creates class instances. Classes support inheritance via extends keyword, enabling subclasses to inherit parent properties and methods. The super keyword accesses parent class constructors and methods.

Class fields and methods can be public or private (prefixed with #). Static methods belong to the class rather than instances. Getters and setters provide controlled property access. Classes can include computed property names and method shorthand. Understanding class features enables clean object-oriented JavaScript.

Modern JavaScript frameworks use classes extensively, especially React class components (though hooks are now preferred). Classes organize related functionality, model domain entities, and structure complex applications. While functional programming is popular in JavaScript, classes remain valuable for certain OOP patterns and framework requirements.`;
    }
    if (lowerTitle.includes('modules')) {
      return `# ${title}

JavaScript modules organize code into reusable, maintainable files. ES6 modules use import and export statements to share code between files. Modules have their own scope, preventing global namespace pollution. Modern JavaScript development is built on modules, enabling large-scale application architecture.

The export keyword makes functions, objects, classes, or variables available to other modules. Named exports: export const func, default exports: export default func. Import statements bring exports into files: import {func} from './file' for named exports, import func from './file' for default exports. Star imports import everything: import * as name.

Modules load dependencies, organize features, and enable code splitting. Build tools like webpack, Rollup, and Vite bundle modules for browsers. Dynamic imports (import()) load modules on demand, improving initial load times. Module formats include ES6 modules (ESM), CommonJS (Node.js), AMD, and UMD.

Professional JavaScript applications organize code into modules by feature or layer. Module organization affects maintainability, testability, and bundle size. Tree-shaking removes unused exports from production bundles. Understanding modules, circular dependencies, and module resolution enables scalable application architecture.`;
    }
    if (lowerTitle.includes('json')) {
      return `# ${title}

JSON (JavaScript Object Notation) is a lightweight data interchange format using JavaScript object syntax. JSON represents structured data as text, making it ideal for transmitting data between servers and web applications. Nearly all modern APIs use JSON for data exchange. Understanding JSON is essential for web development.

JSON supports objects, arrays, strings, numbers, booleans, and null. JSON syntax resembles JavaScript objects but requires double quotes for strings and keys. JSON.parse() converts JSON strings to JavaScript objects. JSON.stringify() converts JavaScript objects to JSON strings. These methods enable data serialization and deserialization.

APIs return data as JSON. Fetch requests receive JSON responses parsed into JavaScript objects. JSON configuration files store application settings. JSON is human-readable and language-independent, supported by virtually all programming languages. The simplicity and ubiquity of JSON drove its adoption over XML.

Working with JSON involves parsing responses, extracting data, and validating structure. JSON doesn't support functions, undefined, or dates (requires string conversion). Deep copying requires JSON.parse(JSON.stringify(obj)). Understanding JSON structure, parsing, and stringifying is fundamental to API integration and data persistence.`;
    }
    return null; // Return null if no specific content found for JavaScript
  }

  // React Topics
  if (category === 'React') {
    if (lowerTitle.includes('intro') || lowerTitle.includes('home')) {
      return `# ${title}

React is a JavaScript library for building user interfaces, created and maintained by Meta. React enables creating interactive, dynamic web applications through component-based architecture. React's virtual DOM efficiently updates only changed parts of pages. React has become the most popular front-end library in web development.

React applications are built from components - reusable, self-contained pieces of UI. Components receive data through props and manage local state. JSX syntax combines JavaScript and HTML-like markup in the same file. React updates the DOM efficiently by comparing virtual DOM snapshots and applying minimal necessary changes.

React's declarative nature means developers describe what UI should look like for given states, and React handles updates. This contrasts with imperative DOM manipulation. React ecosystem includes React Router for navigation, Redux or Context for state management, and countless libraries. React Native extends React to mobile development.

Professional React development requires understanding components, props, state, lifecycle, hooks, and performance optimization. React powers applications for Facebook, Netflix, Airbnb, and countless others. React skills are highly demanded in the job market. Learning React enables building modern, performant web applications.`;
    }
    if (lowerTitle.includes('jsx')) {
      return `# ${title}

JSX (JavaScript XML) is a syntax extension for JavaScript that looks like HTML but works in JavaScript files. JSX makes React components more readable by combining markup and logic. JSX isn't required for React but is standard practice. Babel compiles JSX to React.createElement() calls.

JSX elements use HTML-like tags but with key differences. className replaces class (reserved JavaScript keyword), htmlFor replaces for, and inline styles use objects with camelCase properties. JSX expressions embed JavaScript in curly braces: {variable}. JSX supports all JavaScript expressions including conditionals and function calls.

JSX must return a single parent element, often using fragments (<>...</>) to avoid unnecessary divs. Self-closing tags require slashes: <img />. JSX passes props to components like HTML attributes but can pass any JavaScript type including functions and objects. JSX compiles to JavaScript, enabling all JavaScript capabilities within markup.

Understanding JSX enables writing React components naturally. JSX improves readability by colocating markup and behavior. JSX is type-safe with TypeScript. While JSX looks like HTML, it's JavaScript, so understanding differences prevents common mistakes. JSX is fundamental to React development and similar libraries like Vue JSX.`;
    }
    if (lowerTitle.includes('component')) {
      return `# ${title}

React components are the building blocks of React applications. Components are JavaScript functions or classes that return JSX describing UI. Components can be composed together, reused across applications, and tested independently. Component-based architecture makes complex UIs manageable by breaking them into small, focused pieces.

Functional components are JavaScript functions returning JSX. Class components extend React.Component and use render methods. Modern React favors functional components with hooks over class components. Components accept props (properties) as arguments, enabling parent components to pass data to children. Components manage their own state for local data.

Components should be focused on a single responsibility. Breaking UIs into small components improves reusability and testability. Components can be pure (same props produce same output) or side-effectful. Component naming conventions use PascalCase. Files typically export one main component with possible helper components.

Professional React development emphasizes component composition over inheritance. Container/presentational patterns separate data logic from UI rendering. Higher-order components and render props share logic across components. React's component model enables building complex UIs from simple, reusable pieces. Understanding components is fundamental to React mastery.`;
    }
    if (lowerTitle.includes('props')) {
      return `# ${title}

Props (properties) pass data from parent components to child components in React. Props are read-only in child components, enforcing unidirectional data flow. Props can be any JavaScript type - primitives, objects, arrays, or functions. Props make components reusable by customizing behavior without changing code.

Props are accessed as function parameters in functional components or via this.props in class components. Destructuring props improves readability: function Component({name, age}). Default props provide fallback values. Prop spreading (...props) passes all props to children. Children prop contains elements between component opening and closing tags.

Props validation through PropTypes (separate package) or TypeScript ensures components receive expected data types. This catches bugs early and documents component APIs. Required props, custom validators, and shape definitions describe component contracts. TypeScript provides superior type checking for props.

Understanding props flow, immutability, and composition patterns is essential for React. Props enable component reusability and declarative programming. Callback props enable child-to-parent communication. Props drilling (passing props through many levels) indicates potential state management needs. Props are fundamental to React's component model.`;
    }
    if (lowerTitle.includes('state')) {
      return `# ${title}

State represents data that changes over time within React components. Unlike props (received from parents), state is owned and managed by components. State changes trigger re-renders, updating the UI. The useState hook manages state in functional components, while class components use this.state and this.setState.

useState returns current state and a setter function: const [value, setValue] = useState(initialValue). Calling the setter with a new value triggers re-render. State updates are asynchronous and batched for performance. Functional updates (setValue(prev => prev + 1)) ensure correct values when updates depend on previous state.

State should contain minimal data needed for rendering. Derived values should be computed during render rather than stored in state. State updates are shallow merges in class components but replacements in hooks. Immutable updates are crucial - never mutate state directly. State changes should create new objects or arrays.

Managing state effectively is crucial for React applications. Local state suffices for component-specific data, while global state requires Context or libraries like Redux. Understanding when to lift state vs keep it local, batching updates, and avoiding unnecessary state improves application performance and maintainability.`;
    }
    if (lowerTitle.includes('useeffect')) {
      return `# ${title}

The useEffect hook handles side effects in React functional components. Side effects include data fetching, subscriptions, timers, and DOM manipulation. useEffect runs after render by default, preventing blocking. Understanding useEffect is crucial for managing component lifecycle and side effects in modern React.

useEffect accepts a function containing side effect code and an optional dependency array. Without dependencies, effects run after every render. Empty dependency array [] runs effects once on mount. Specific dependencies cause effects to run when those values change. Return cleanup functions for subscriptions or timers.

Common useEffect patterns include fetching data on mount, subscribing to WebSocket connections, setting timers, and updating document titles. Effects should be focused on single concerns. Multiple useEffect calls separate different side effects. Dependency array must include all used external values to prevent stale closures.

Professional useEffect usage involves understanding dependency arrays, cleanup functions, and effect timing. Missing dependencies cause bugs, while unnecessary dependencies cause performance issues. ESLint plugin react-hooks/exhaustive-deps warns about dependency issues. useEffect replaced class lifecycle methods, providing more declarative side effect management.`;
    }
    if (lowerTitle.includes('hooks')) {
      return `# ${title}

React Hooks are functions that enable using state and other React features in functional components. Hooks were introduced in React 16.8, allowing functional components to match class component capabilities. Hooks include useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef, and custom hooks. Hooks fundamentally changed React development.

Hook rules require calling hooks at the top level of components, never inside conditionals or loops. Hooks must be called in the same order every render. This ensures React correctly associates hook state between renders. The ESLint plugin eslint-plugin-react-hooks enforces these rules.

Built-in hooks cover most needs. useState manages component state, useEffect handles side effects, useContext accesses context values, useReducer manages complex state logic, useCallback memoizes functions, useMemo memoizes values, and useRef persists values between renders without causing re-renders.

Custom hooks extract reusable logic into functions. Custom hooks enable sharing stateful logic across components without render props or HOCs. Custom hooks follow naming convention use*. Understanding hooks, their rules, and when to use each hook is essential for modern React development.`;
    }
    if (lowerTitle.includes('router')) {
      return `# ${title}

React Router enables navigation and routing in single-page React applications. React Router manages URL changes, renders appropriate components, and provides navigation APIs. Client-side routing delivers fast transitions without full page reloads. React Router is the standard routing solution for React applications.

React Router uses components like BrowserRouter (HTML5 history), Routes (route container), Route (individual routes), and Link or NavLink (navigation links). Routes match URL patterns to components. Dynamic segments (:id) capture URL parameters accessible via useParams hook. Nested routes enable complex route hierarchies.

Navigation methods include Link components for declarative navigation and useNavigate hook for programmatic navigation. Route guards and protected routes implement authentication. Redirect component or useNavigate enable conditional redirects. URL parameters pass data between routes. Location state passes data without showing in URLs.

Modern React applications require sophisticated routing for multi-page experiences. React Router v6 simplified API and improved performance. Understanding routing, nested routes, route parameters, and programmatic navigation is essential for complex React applications. React Router enables creating applications that feel native while remaining single-page apps.`;
    }
    return null; // Return null if no specific content found for React
  }

  // Node.js Topics
  if (category === 'Node.js') {
    if (lowerTitle.includes('intro') || lowerTitle.includes('home')) {
      return `# ${title}

Node.js is a JavaScript runtime environment that executes JavaScript outside browsers. Built on Chrome's V8 engine, Node.js enables server-side JavaScript development. Node.js uses an event-driven, non-blocking I/O model making it efficient for data-intensive real-time applications. Node.js revolutionized JavaScript by extending it beyond browsers.

Node.js enables full-stack JavaScript development - the same language for frontend and backend. Node.js includes npm (Node Package Manager), the world's largest software registry. Node.js APIs provide file system access, networking, process management, and more. Node.js powers servers, CLI tools, build tools, and microservices.

Node.js excels at I/O-bound applications - web servers, APIs, real-time applications, and streaming services. The non-blocking model handles many concurrent connections efficiently. However, CPU-intensive tasks can block the event loop. Understanding Node.js async patterns is crucial for effective development.

Professional Node.js development requires understanding async/await, streams, buffers, event emitters, and modules. Major companies including Netflix, LinkedIn, and PayPal use Node.js for scalability and performance. Node.js skills are highly valued in modern development. Learning Node.js enables building complete applications with JavaScript.`;
    }
    if (lowerTitle.includes('event loop')) {
      return `# ${title}

The Node.js event loop is the mechanism that handles asynchronous operations. Node.js is single-threaded but processes many operations concurrently through the event loop. Understanding the event loop is crucial for writing performant Node.js applications and diagnosing performance issues.

The event loop phases include timers (setTimeout, setInterval callbacks), pending callbacks (I/O callbacks), idle/prepare (internal), poll (retrieve new I/O events), check (setImmediate callbacks), and close callbacks. The event loop processes each phase's queue before moving to the next phase.

Node.js offloads blocking I/O operations to the system kernel or worker pool, keeping the event loop free. When operations complete, callbacks are queued for execution. Process.nextTick and Promise callbacks have higher priority, executing before the next event loop phase. Understanding this timing is crucial for correct async behavior.

Professional Node.js development requires understanding event loop behavior to avoid blocking operations. Long-running synchronous code blocks the event loop, degrading performance. CPU-intensive work should use worker threads. Monitoring event loop lag helps identify performance bottlenecks. Understanding the event loop enables writing efficient, scalable Node.js applications.`;
    }
    if (lowerTitle.includes('modules') || lowerTitle.includes('npm')) {
      return `# ${title}

Node.js modules organize code into reusable files. CommonJS modules use require() to import and module.exports to export. ES modules use import/export syntax. Understanding modules is fundamental to Node.js development. NPM (Node Package Manager) distributes packages that can be used as modules in applications.

Package.json defines project metadata, dependencies, scripts, and configuration. Dependencies install via npm install, creating node_modules folder. Dev dependencies support development but aren't needed in production. Semantic versioning (^, ~) controls update ranges. Package-lock.json ensures consistent dependency versions across installs.

NPM scripts automate common tasks - testing, building, starting servers. Scripts run via npm run scriptName (or npm start/test shortcuts). NPM registry hosts over 1 million packages. Popular packages include Express (web framework), Lodash (utilities), and Axios (HTTP client). NPM alternatives include Yarn and pnpm.

Professional Node.js projects carefully manage dependencies, minimize package sizes, audit security vulnerabilities, and lock dependency versions. Understanding npm, package.json, module resolution, and publishing packages is essential. Well-structured modules improve code organization, reusability, and maintainability.`;
    }
    if (lowerTitle.includes('express')) {
      return `# ${title}

Express.js is a minimal, flexible Node.js web application framework. Express simplifies building APIs and web servers with routing, middleware, and template support. Express is the most popular Node.js framework, powering millions of applications. Understanding Express is essential for Node.js backend development.

Express applications use app.get(), app.post(), etc. for routing. Routes handle HTTP requests and send responses. Middleware functions process requests before reaching route handlers. Middleware can parse JSON, handle CORS, log requests, authenticate users, and more. Middleware chains via next() calls.

Express routing supports route parameters (:id), query strings, and pattern matching. Router objects organize routes into modules. Response methods include res.send(), res.json(), res.status(), res.redirect(). Request objects provide access to headers, body, parameters, and more. Error-handling middleware has four parameters.

Professional Express applications use middleware for cross-cutting concerns, implement RESTful API design, validate inputs, handle errors gracefully, and structure routes logically. Express is unopinionated, allowing flexible architecture. Understanding Express architecture, middleware, routing, and error handling enables building scalable Node.js backends.`;
    }
    if (lowerTitle.includes('async') || lowerTitle.includes('promise')) {
      return `# ${title}

Asynchronous programming is essential in Node.js due to its non-blocking I/O model. Callbacks, Promises, and async/await manage asynchronous operations. Node.js APIs primarily use callbacks historically, but modern development favors Promises and async/await for cleaner code.

Node.js I/O operations like file reading, database queries, and HTTP requests are asynchronous by default. Callback patterns use error-first callbacks: (err, result). Callback hell occurs when nesting many callbacks. Promises and async/await flatten this structure, improving readability and error handling.

Async/await syntax makes asynchronous code look synchronous. Async functions return promises, and await pauses execution until promises resolve. Try/catch blocks handle async errors. Promise.all() runs multiple async operations in parallel. Understanding promise chaining, error propagation, and async patterns prevents common mistakes.

Professional Node.js development extensively uses async/await for I/O operations, API calls, and database queries. Understanding event loop timing, promise microtasks, and error handling is crucial. Async patterns enable building responsive applications that handle many concurrent operations efficiently.`;
    }
    if (lowerTitle.includes('file system') || lowerTitle.includes('fs')) {
      return `# ${title}

The Node.js File System (fs) module provides APIs for interacting with the file system. The fs module can read, write, delete, and manipulate files and directories. Understanding fs APIs is fundamental for Node.js server development, build tools, and CLI applications.

The fs module offers both synchronous and asynchronous APIs. Asynchronous methods use callbacks or promises (fs.promises). Async methods prevent blocking the event loop, crucial for server applications. Synchronous methods are acceptable for CLI tools or initialization code but should be avoided in servers.

Common fs operations include reading files (readFile, readFileSync), writing files (writeFile), creating directories (mkdir), deleting files (unlink), checking existence (access), and watching files (watch). Streams (createReadStream, createWriteStream) efficiently handle large files without loading entire content into memory.

Professional Node.js applications use fs for server-side file operations, build tools, log management, and asset processing. Always handle errors, use async APIs in servers, and prefer streams for large files. Understanding fs permissions, paths, and stream concepts enables building file-based features reliably.`;
    }
    if (lowerTitle.includes('http') || lowerTitle.includes('server')) {
      return `# ${title}

The Node.js HTTP module creates web servers and makes HTTP requests. The http.createServer() method creates servers that listen for requests and send responses. Understanding Node's HTTP module is fundamental, though most developers use frameworks like Express that build on it.

HTTP servers created with createServer accept callback functions receiving request and response objects. Request objects provide HTTP method, URL, headers, and body. Response objects write status codes, headers, and body content. The server.listen() method starts listening on specified ports.

HTTP modules support both servers and clients. The http.request() method makes outbound HTTP requests. Modern alternatives like axios or fetch (available in recent Node.js) provide more convenient APIs. The HTTPS module provides secure HTTPS servers and clients.

Professional Node.js servers usually use Express or similar frameworks rather than raw HTTP. However, understanding underlying HTTP concepts helps debug issues and optimize performance. Modern practices include connection pooling, keep-alive, request timeouts, and proper header management. HTTP/2 and HTTP/3 support exists through specific modules.`;
    }
    if (lowerTitle.includes('rest api')) {
      return `# ${title}

REST (Representational State Transfer) APIs are the standard architecture for web services. RESTful APIs use HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on resources. Understanding REST principles is essential for building backend APIs that frontend applications consume.

REST APIs use URL paths to represent resources (/users, /products/:id). HTTP methods indicate operations: GET retrieves, POST creates, PUT/PATCH updates, DELETE removes. Status codes communicate results: 200 success, 201 created, 400 bad request, 401 unauthorized, 404 not found, 500 server error. JSON is the standard data format.

RESTful design principles include statelessness (each request contains all needed information), resource-based URLs, proper HTTP method usage, and meaningful status codes. Versioning (v1, v2 in URLs or headers) manages API evolution. Pagination, filtering, and sorting handle large datasets. CORS enables cross-origin requests.

Professional REST API development includes input validation, authentication (JWT, OAuth), authorization, rate limiting, error handling, documentation (Swagger/OpenAPI), and testing. APIs should be consistent, predictable, and well-documented. Understanding REST principles, HTTP semantics, and security best practices enables building production-ready APIs.`;
    }
    return null; // Return null if no specific content found for Node.js
  }

  // Next.js Topics
  if (category === 'Next.js') {
    if (lowerTitle.includes('intro') || lowerTitle.includes('what is') || lowerTitle.includes('home')) {
      return `# ${title}

Next.js is a React framework for building production-ready web applications. Created by Vercel, Next.js adds server-side rendering, static site generation, API routes, and optimized performance to React. Next.js simplifies complex configurations, providing excellent defaults and developer experience. Next.js has become the leading React framework.

Next.js supports multiple rendering strategies in one application. Pages can be server-rendered (SSR), statically generated (SSG), incrementally regenerated (ISR), or client-rendered. This flexibility enables optimizing each page for its specific needs. The App Router (Next.js 13+) introduces React Server Components and improved routing.

Next.js includes built-in optimizations: image optimization, font loading, code splitting, prefetching, and more. API routes enable building full-stack applications without separate backend servers. File-based routing creates routes from file structure. TypeScript, CSS modules, and Tailwind work out of the box.

Professional Next.js development delivers fast, SEO-friendly applications with excellent user experience. Companies like TikTok, Twitch, and Nike use Next.js. Understanding Next.js rendering strategies, data fetching, and optimization features enables building modern, performant web applications. Next.js skills are highly valuable in React ecosystem.`;
    }
    if (lowerTitle.includes('app router')) {
      return `# ${title}

The Next.js App Router, introduced in Next.js 13, revolutionizes routing with React Server Components, layouts, and improved data fetching. The App Router lives in the app directory, offering more features and better performance than the older Pages Router. Understanding the App Router is essential for modern Next.js development.

App Router uses file-system routing where folders define routes and special files define UI. page.js defines route segments, layout.js defines shared UI, loading.js provides loading states, and error.js handles errors. Nested folders create nested routes. Route groups (folder) organize routes without affecting URLs.

Server Components are default in App Router, rendering on the server for better performance and SEO. Client Components (marked with 'use client') enable interactivity. Server Actions enable server mutations without API routes. Parallel routes and intercepting routes enable advanced patterns like modals and multi-section layouts.

Professional Next.js applications leverage App Router's features for better performance, SEO, and developer experience. Understanding Server Components, data fetching patterns, and new Router features enables building cutting-edge applications. While Pages Router remains supported, App Router represents Next.js's future direction.`;
    }
    if (lowerTitle.includes('ssr') || lowerTitle.includes('server-side rendering')) {
      return `# ${title}

Server-Side Rendering (SSR) generates HTML on servers for each request. Next.js sends fully-rendered HTML to browsers, improving initial load performance and SEO. SSR enables dynamic content while maintaining SEO benefits. Understanding SSR tradeoffs helps choose appropriate rendering strategies for different pages.

In Next.js Pages Router, getServerSideProps fetches data on each request. In App Router, Server Components render on the server by default. SSR provides fresh data on each request but increases server load and response time compared to static generation. SSR is ideal for personalized or frequently-changing content.

SSR improves perceived performance and SEO compared to client-side rendering. Search engines receive fully-rendered HTML. Users see content immediately without waiting for JavaScript to load and fetch data. However, SSR requires server infrastructure and increases complexity compared to static sites.

Professional applications use SSR for authenticated pages, personalized content, or real-time data. Balancing SSR with caching, CDN, and performance optimization ensures fast response times. Understanding when to use SSR vs SSG vs ISR optimizes performance, costs, and user experience. Next.js makes SSR accessible without manual server setup.`;
    }
    if (lowerTitle.includes('ssg') || lowerTitle.includes('static')) {
      return `# ${title}

Static Site Generation (SSG) pre-renders pages at build time, creating static HTML files served from CDNs. SSG provides maximum performance and scalability - pages load instantly and handle unlimited traffic. Next.js makes SSG simple while maintaining dynamic capabilities. SSG is ideal for content that doesn't change per request.

In Pages Router, getStaticProps fetches data at build time. For dynamic routes, getStaticPaths defines which paths to generate. In App Router, pages are statically generated by default unless they use dynamic features. generateStaticParams creates static dynamic routes.

SSG benefits include instant page loads, low hosting costs, excellent SEO, and maximum scalability. CDN distribution serves pages globally with minimal latency. However, SSG requires rebuilding to update content and doesn't support per-request personalization. Incremental Static Regeneration (ISR) addresses some limitations.

Professional sites use SSG for marketing pages, blogs, documentation, and content that updates infrequently. Combining SSG with client-side data fetching enables dynamic features on static pages. Understanding SSG tradeoffs and implementation patterns enables building fast, scalable sites with Next.js.`;
    }
    if (lowerTitle.includes('isr') || lowerTitle.includes('incremental')) {
      return `# ${title}

Incremental Static Regeneration (ISR) combines SSG's performance with dynamic data's freshness. ISR regenerates static pages in background after specified intervals, keeping cache fresh without full rebuilds. ISR enables scaling to millions of pages while maintaining up-to-date content.

ISR uses revalidate option in getStaticProps or Next.js App Router revalidation. When revalidation interval passes, the next request triggers background regeneration. Users always receive cached pages instantly, while fresh content generates in background. Subsequent requests receive updated content.

ISR benefits include SSG performance, manageable build times, and fresh content without full rebuilds. ISR works with CDNs supporting stale-while-revalidate. On-demand revalidation enables updating specific pages programmatically. ISR scales to sites with thousands of pages without long build times.

Professional applications use ISR for product catalogs, news sites, and content platforms needing balance between performance and freshness. Understanding ISR caching, revalidation timing, and fallback behavior optimizes user experience. ISR is a Next.js differentiating feature enabling new architectural patterns.`;
    }
    if (lowerTitle.includes('server actions')) {
      return `# ${title}

Server Actions enable calling server functions from client components without building API routes. Marked with 'use server', Server Actions run on the server, accessing databases and secrets securely. Server Actions simplify full-stack development by eliminating API boilerplate.

Server Actions are defined in Server Components or separate files with 'use server'. Actions receive FormData or serializable arguments. Forms can call actions via action prop, enabling progressive enhancement - forms work without JavaScript. useFormState and useFormStatus hooks provide form state on client.

Server Actions handle mutations - creating, updating, or deleting data. Actions validate inputs, perform operations, and revalidate pages. Actions integrated with React's Suspense and transitions provide optimistic UI updates. Error handling uses try/catch, returning error messages to client.

Professional Next.js applications use Server Actions for form submissions, data mutations, and server operations. Server Actions reduce code, improve security by keeping sensitive logic server-side, and enable progressive enhancement. Understanding Server Actions patterns enables building modern, full-stack applications within Next.js.`;
    }
    if (lowerTitle.includes('middleware')) {
      return `# ${title}

Next.js Middleware runs code before requests are completed, enabling request modification, response rewriting, redirects, and header manipulation. Middleware executes on the edge, close to users, providing low-latency logic execution. Middleware is powerful for authentication, redirects, and request customization.

Middleware is defined in middleware.ts at the project root or in route folders. Middleware receives request and event objects, returning responses or calling next(). Middleware can rewrite URLs (showing different content at same URL), redirect, set headers, or return early responses. Matcher config controls which routes run middleware.

Common middleware use cases include authentication (checking tokens, redirecting unauthorized users), A/B testing, internationalization, bot detection, and feature flags. Middleware runs on every request to matched routes before rendering, enabling centralized logic execution. Middleware can read cookies, headers, and URL parameters.

Professional Next.js applications use middleware for cross-cutting concerns affecting many routes. Middleware is efficient, running on edge networks close to users. Understanding middleware capabilities, limitations (no file system access), and performance implications enables building sophisticated routing logic and authentication systems.`;
    }
    if (lowerTitle.includes('api routes')) {
      return `# ${title}

Next.js API Routes enable building backend APIs within Next.js applications. API Routes are serverless functions handling HTTP requests, eliminating the need for separate backend servers. API Routes simplify full-stack development by keeping frontend and backend in one project.

In Pages Router, files in pages/api become API endpoints. In App Router, route.ts files in app directories define API routes. API handlers export functions for HTTP methods (GET, POST). Request and response objects handle inputs and outputs. API Routes can access environment variables, databases, and external services.

API Routes suit building APIs consumed by the same application, server-side logic, webhooks, and integrations. For production APIs at scale, dedicated API servers may be more appropriate. API Routes run in serverless environments with cold starts and execution time limits.

Professional Next.js applications use API Routes for form handlers, authentication endpoints, database operations, and third-party integrations. Understanding request handling, error responses, CORS, and serverless limitations enables building robust APIs. API Routes with Server Actions provide flexible options for backend logic in Next.js.`;
    }
    return null; // Return null if no specific content found for Next.js
  }

  // Databases Topics
  if (category === 'Databases') {
    if (lowerTitle.includes('sql') || lowerTitle.includes('mysql') || lowerTitle.includes('postgresql')) {
      return `# ${title}

SQL (Structured Query Language) is the standard language for relational database management. SQL databases like MySQL and PostgreSQL organize data into tables with defined schemas. Understanding SQL is fundamental for backend development, as most applications require persistent data storage with ACID guarantees.

SQL operations include SELECT (retrieve data), INSERT (add records), UPDATE (modify records), and DELETE (remove records). WHERE clauses filter results, JOIN combines tables, GROUP BY aggregates data, and ORDER BY sorts results. SQL databases ensure data integrity through constraints, foreign keys, and transactions.

Relational databases excel at structured data with relationships between entities. Strong typing, normalization, and ACID properties ensure data consistency. SQL databases scale vertically and support complex queries. PostgreSQL adds advanced features like JSON columns, full-text search, and custom types.

Professional applications use SQL databases for transactional data, user accounts, orders, and relational data. Understanding schema design, indexing, query optimization, and transaction management is crucial. SQL skills are essential for backend developers. ORMs like Prisma abstract SQL but understanding underlying concepts remains important.`;
    }
    if (lowerTitle.includes('mongodb') || lowerTitle.includes('nosql')) {
      return `# ${title}

MongoDB is a NoSQL document database storing data in JSON-like documents. MongoDB provides flexibility with schema-less design, horizontal scalability, and natural data modeling. Understanding MongoDB is valuable for applications requiring flexible schemas, rapid development, or massive scalability.

MongoDB stores documents in collections (similar to tables). Documents are JSON objects with nested structures and arrays. MongoDB queries use JavaScript-like syntax. CRUD operations include insertOne, find, updateMany, and deleteOne. Aggregation pipelines process data through multiple stages.

MongoDB excels at flexible data models, horizontal scaling (sharding), and development speed. Document model matches application objects naturally. However, MongoDB trades strong consistency guarantees for scalability and flexibility. Multi-document transactions are supported but less efficient than SQL.

Professional applications use MongoDB for content management, catalogs, user profiles, and real-time analytics. Understanding document design, indexing, aggregation, and replication is crucial. Combining MongoDB with SQL databases (polyglot persistence) leverages each database's strengths for different data types.`;
    }
    if (lowerTitle.includes('prisma') || lowerTitle.includes('orm')) {
      return `# ${title}

Prisma is a modern ORM (Object-Relational Mapping) tool for Node.js and TypeScript. Prisma provides type-safe database access, automatic migrations, and intuitive query API. Prisma simplifies database operations while maintaining performance and flexibility. Prisma has become the leading ORM for modern TypeScript applications.

Prisma schema defines data models in readable syntax. Prisma generates type-safe client code matching schema exactly. Migrations handle database schema changes. Prisma Client provides chainable query API: prisma.user.findMany(). Relations, filtering, sorting, and pagination are elegant and type-safe.

Prisma supports PostgreSQL, MySQL, SQLite, SQL Server, and MongoDB. Prisma Migrate handles schema changes and version control. Prisma Studio provides visual database browser. Type safety prevents runtime errors from typos or schema mismatches. Generated types integrate seamlessly with TypeScript.

Professional TypeScript applications prefer Prisma for database access. Prisma balances abstraction with control, supports raw SQL when needed, and optimizes queries automatically. Understanding Prisma schema, migrations, and query API enables building database-backed applications efficiently with excellent developer experience and type safety.`;
    }
    if (lowerTitle.includes('index') || lowerTitle.includes('optimization')) {
      return `# ${title}

Database indexes dramatically improve query performance by enabling fast data lookup without scanning entire tables. Indexes work like book indexes, pointing to data locations. Understanding indexing is crucial for building performant applications. Poorly indexed databases cause slow queries and scalability issues.

Indexes are created on frequently queried columns. B-tree indexes (default) efficiently support equality and range queries. Unique indexes enforce uniqueness constraints. Composite indexes cover multiple columns. Full-text indexes enable text search. Each database system offers specialized index types.

Indexes speed reads but slow writes (indexes must be updated on inserts/updates). Over-indexing wastes space and degrades write performance. Analyzing query patterns identifies beneficial indexes. EXPLAIN commands show whether queries use indexes. Covering indexes include all queried columns, avoiding table lookups.

Professional database design carefully balances read and write performance through strategic indexing. Monitoring slow queries, analyzing execution plans, and adding appropriate indexes optimizes performance. Understanding index types, when to use them, and their tradeoffs is essential for scalable applications handling significant data volumes.`;
    }
    if (lowerTitle.includes('transaction')) {
      return `# ${title}

Database transactions are sequences of operations that execute as single units, ensuring data consistency. Transactions provide ACID properties: Atomicity (all-or-nothing), Consistency (valid state), Isolation (concurrent transactions don't interfere), and Durability (committed data persists). Understanding transactions is crucial for maintaining data integrity.

Transactions begin with BEGIN or START TRANSACTION, execute operations, then COMMIT (save changes) or ROLLBACK (undo changes). All operations within transactions succeed together or fail together. Transactions prevent partial updates that could corrupt data. Banking transfers, order processing, and multi-step operations require transactions.

Isolation levels control how transactions interact: Read Uncommitted (dirty reads possible), Read Committed (prevents dirty reads), Repeatable Read (prevents non-repeatable reads), Serializable (full isolation). Higher isolation prevents more anomalies but reduces concurrency. Choosing appropriate isolation balances consistency and performance.

Professional applications use transactions for operations affecting multiple tables or requiring atomicity. Transactions prevent race conditions, ensure data consistency, and enable recovery from failures. Understanding transaction scope, deadlocks, and isolation levels prevents data corruption and optimizes concurrent access to shared data.`;
    }
    if (lowerTitle.includes('join')) {
      return `# ${title}

SQL joins combine rows from multiple tables based on related columns. Joins enable retrieving related data in single queries rather than multiple queries. Understanding joins is fundamental to working with relational databases. Proper join usage significantly affects query performance and result accuracy.

INNER JOIN returns only matching rows from both tables. LEFT JOIN returns all left table rows plus matches from right (null for non-matches). RIGHT JOIN reverses LEFT JOIN. FULL OUTER JOIN returns all rows from both tables. CROSS JOIN returns cartesian products. Self-joins join tables to themselves.

Joins use ON clauses specifying join conditions, typically foreign key relationships. Multiple joins combine data from many tables. Join order affects query performance - query planners optimize automatically but understanding helps with complex queries. Subqueries sometimes replace joins for specific patterns.

Professional database queries extensively use joins to retrieve related data efficiently. Understanding join types, performance characteristics, and when to use each enables writing efficient queries. Complex business logic often requires multi-table joins. Properly designed schemas with appropriate foreign keys make joins natural and performant.`;
    }
    return null; // Return null if no specific content found for Databases
  }

  // Backend Architecture Topics
  if (category === 'Backend Architecture') {
    if (lowerTitle.includes('mvc')) {
      return `# ${title}

MVC (Model-View-Controller) is a design pattern separating applications into three components: Models (data and business logic), Views (presentation), and Controllers (handle requests, coordinate models and views). MVC remains popular for organizing web applications, though modern frameworks adapt the pattern.

Models represent data and business logic, handling database operations and validation. Controllers receive requests, process inputs, call appropriate models, and return responses. Views render HTML or JSON for clients. Clear separation enables independent development and testing of each layer.

MVC promotes organized, maintainable code by separating concerns. However, strict MVC can be limiting - real applications often need additional layers like services or repositories. Many frameworks loosely follow MVC, adapting to modern patterns like API-first development where views are frontend applications.

Professional backend development uses MVC-influenced architectures for organization. Understanding separation of concerns, layer responsibilities, and communication patterns enables building maintainable applications. While pure MVC is less common in APIs, the principles of separating data, logic, and presentation remain valuable.`;
    }
    if (lowerTitle.includes('microservices') || lowerTitle.includes('monolith')) {
      return `# ${title}

Monolithic architectures deploy applications as single units, while microservices split applications into small, independent services communicating via APIs. Each approach has tradeoffs. Understanding when to use each is crucial for architectural decisions. Many successful applications start monolithic and migrate to microservices as needed.

Monoliths are simpler to develop, deploy, and debug. All code shares the same database and runs in one process. Monoliths suit small teams, early-stage products, and applications with tight coupling. Downsides include scaling entire application for one busy component and deployment coupling all code.

Microservices enable independent scaling, deployment, and technology choices per service. Teams work independently on separate services. Microservices suit large organizations and complex domains. However, microservices increase operational complexity, network latency, and distributed system challenges like consistency and debugging.

Professional architectural decisions consider team size, domain complexity, and scalability needs. Starting with well-organized monoliths and extracting microservices as needed balances simplicity and scalability. Understanding tradeoffs, communication patterns, and operational overhead guides appropriate architecture choices for specific contexts.`;
    }
    if (lowerTitle.includes('repository pattern')) {
      return `# ${title}

The Repository Pattern abstracts data access logic into repository classes, separating business logic from database operations. Repositories provide collection-like interfaces for accessing domain objects. This pattern enables changing datastores without affecting business logic and improves testability through mocking.

Repositories encapsulate queries, inserts, updates, and deletes for specific entity types. Business logic calls repository methods like userRepository.findById() without knowing whether data comes from SQL, MongoDB, or APIs. Repositories can combine multiple data sources or implement caching transparently.

Repository patterns work well with dependency injection, enabling replacing implementations for testing or different environments. Generic repositories provide common operations, while specific repositories add specialized queries. However, repositories can become anemic when they simply wrap ORMs without adding value.

Professional applications use repositories to decouple business logic from data access. Understanding when repositories add value vs adding unnecessary abstraction is important. Repositories shine when data access is complex, multiple data sources exist, or testing requires mocking data. ORMs like Prisma sometimes make repositories less necessary.`;
    }
    if (lowerTitle.includes('service layer')) {
      return `# ${title}

Service layers contain business logic, coordinating between controllers and data access. Services encapsulate complex operations, validation, and business rules. Service layers enable reusing logic across different controllers or consumers. Understanding service layers is essential for organizing backend applications.

Services are typically classes with methods representing business operations. Controllers call services to perform operations, keeping controllers thin. Services coordinate multiple repositories, implement transactions, and enforce business rules. Services should be independent of HTTP concerns, enabling reuse in queues, CLI, or other contexts.

Service layer patterns enable testing business logic independently of web framework or database. Services can call other services, creating hierarchical operations. However, excessive service layers can lead to over-engineering. Balance service abstraction with practical simplicity.

Professional backend applications separate controllers (HTTP handling), services (business logic), and repositories (data access) for maintainability and testability. Understanding these layers, their responsibilities, and communication patterns enables building organized, scalable backend applications. Service layers become essential as applications grow in complexity.`;
    }
    if (lowerTitle.includes('clean architecture')) {
      return `# ${title}

Clean Architecture, proposed by Robert Martin, organizes code around business logic independent of frameworks, databases, or UI. Core principle is dependency inversion - dependencies point inward toward business logic, not outward to external concerns. Clean Architecture maximizes maintainability and testability.

Clean Architecture layers include Entities (business objects), Use Cases (application logic), Interface Adapters (controllers, presenters), and Frameworks (web, database). Inner layers know nothing about outer layers. Outer layers depend on inner layers through interfaces. This prevents business logic depending on implementation details.

Benefits include easier testing (mock external dependencies), framework flexibility (swap databases or web frameworks), and postponed infrastructure decisions. Downsides include increased complexity and abstraction. Clean Architecture suits complex domains but may be overkill for simple CRUD applications.

Professional teams adopt Clean Architecture principles selectively based on domain complexity. Understanding dependency inversion, boundaries, and layered architecture guides building maintainable systems. While pure Clean Architecture is rare, its principles inform better architectural decisions and more testable, flexible code.`;
    }
    if (lowerTitle.includes('event driven')) {
      return `# ${title}

Event-Driven Architecture decouples components by communicating through events rather than direct calls. Components publish events when actions occur, and interested components subscribe to events. Event-driven systems enable scalability, flexibility, and loose coupling. Understanding event-driven patterns is valuable for distributed systems.

Event-driven systems use message buses or event streams (Kafka, RabbitMQ, AWS EventBridge). Producers emit events, consumers process them asynchronously. Events represent facts (UserRegistered, OrderPlaced). Multiple consumers can process same events for different purposes. Events enable building systems that react to changes.

Benefits include loose coupling, independent scaling, and temporal decoupling (consumers process events later). Event sourcing stores events as source of truth, enabling time travel and audit logs. However, event-driven systems increase complexity, debugging difficulty, and eventual consistency challenges.

Professional applications use events for integration between services, handling long-running processes, and building reactive systems. Understanding when events add value vs adding complexity is important. Event-driven architectures suit domains with complex workflows, many integrations, or requirements for audit trails and flexibility.`;
    }
    if (lowerTitle.includes('cqrs')) {
      return `# ${title}

CQRS (Command Query Responsibility Segregation) separates read and write operations into different models. Commands modify state, queries retrieve data. Separating these concerns enables optimizing each independently. CQRS is powerful for complex domains but adds complexity inappropriate for simple applications.

Write models (commands) enforce business rules, validate inputs, and update data. Read models (queries) provide efficient data retrieval, often denormalized for fast reads. Separate databases can serve reads and writes, scaled independently. Event sourcing commonly pairs with CQRS.

Benefits include independent optimization of reads and writes, simplified business logic, and better scalability. Challenges include complexity, eventual consistency between read and write models, and increased infrastructure. CQRS suits complex domains with different read and write patterns but is overkill for CRUD applications.

Professional systems use CQRS selectively for parts requiring independent read/write scaling or complex business logic. Understanding when CQRS solves real problems vs adding unnecessary complexity is crucial. CQRS combined with event sourcing enables powerful audit capabilities but requires significant investment in infrastructure and learning.`;
    }
    return null; // Return null if no specific content found for Backend Architecture
  }

  // DevOps Topics
  if (category === 'DevOps') {
    if (lowerTitle.includes('docker')) {
      return `# ${title}

Docker is a containerization platform packaging applications with their dependencies into portable containers. Containers run consistently across development, testing, and production environments, solving "works on my machine" problems. Understanding Docker is essential for modern application deployment and development workflows.

Docker images are templates containing application code, runtime, libraries, and dependencies. Images build from Dockerfiles specifying layered instructions. Containers are running instances of images, isolated from host systems and other containers. Docker Hub hosts public images for popular software.

Docker benefits include consistent environments, simplified deployment, efficient resource usage, and isolating applications. Developers run production-like environments locally. CI/CD pipelines build and test in containers. Containers start quickly and use fewer resources than virtual machines.

Professional development extensively uses Docker for local development, testing, and production deployment. Understanding Dockerfile best practices, multi-stage builds, volume management, and networking enables leveraging Docker effectively. Docker is fundamental to modern DevOps practices and cloud-native development.`;
    }
    if (lowerTitle.includes('kubernetes')) {
      return `# ${title}

Kubernetes (K8s) is a container orchestration platform automating deployment, scaling, and management of containerized applications. Kubernetes handles container scheduling, load balancing, self-healing, and rolling updates. Understanding Kubernetes is increasingly important as organizations adopt cloud-native architectures.

Kubernetes core concepts include Pods (smallest deployable units), Deployments (manage Pod replicas), Services (expose Pods network), and Namespaces (multi-tenancy). Kubernetes schedules Pods across cluster nodes, restarts failed containers, scales Pods based on load, and performs zero-downtime deployments.

Kubernetes configuration uses YAML files declaring desired state. Kubernetes continuously reconciles actual state with desired state. ConfigMaps and Secrets manage configuration and sensitive data. Ingress controllers handle HTTP routing. Persistent Volumes provide storage for stateful applications.

Professional organizations use Kubernetes for managing microservices, ensuring availability, and enabling scalable infrastructure. Kubernetes is complex - managed services like EKS, GKE, and AKS simplify operations. Understanding Kubernetes architecture, resources, and deployment patterns enables building cloud-native applications at scale.`;
    }
    if (lowerTitle.includes('ci cd') || lowerTitle.includes('ci/cd')) {
      return `# ${title}

CI/CD (Continuous Integration/Continuous Deployment) automates software delivery from code commit to production deployment. CI frequently merges code changes, running automated tests to catch issues early. CD automatically deploys passing builds to production. CI/CD enables fast, reliable software delivery at scale.

CI involves committing code multiple times daily, triggering automated builds and tests. Failed builds stop the pipeline, preventing broken code from reaching production. Unit tests, integration tests, and linting run automatically. Fast feedback loops catch bugs when context is fresh.

CD extends CI by automatically deploying to staging and production environments. CD requires comprehensive testing, feature flags, and monitoring. Deployment strategies include blue-green deployments, canary releases, and rolling updates. Infrastructure as Code ensures environment consistency.

Professional development teams use CI/CD for faster releases, reduced manual errors, and improved code quality. Popular CI/CD tools include GitHub Actions, GitLab CI, Jenkins, and CircleCI. Understanding pipeline design, testing strategies, and deployment patterns enables building reliable automated delivery pipelines.`;
    }
    if (lowerTitle.includes('github actions')) {
      return `# ${title}

GitHub Actions provides CI/CD automation directly in GitHub repositories. Actions run workflows triggered by repository events like pushes, pull requests, or schedules. GitHub Actions simplifies automation without external CI services. Understanding GitHub Actions enables building sophisticated automation workflows.

Workflows are YAML files in .github/workflows defining jobs, steps, and triggers. Jobs run on GitHub-hosted or self-hosted runners. Actions (reusable units) perform specific tasks - checkout code, setup Node.js, run tests. Marketplace offers thousands of pre-built actions.

Common workflows include testing on pull requests, building and publishing Docker images, deploying to cloud platforms, and automating releases. Matrix strategies test across multiple platforms and versions. Secrets store sensitive credentials securely. Workflow status badges show build health.

Professional repositories use GitHub Actions for automated testing, deployment, code quality checks, and dependency updates. GitHub Actions integrates seamlessly with GitHub features like pull request status checks. Understanding workflow syntax, action composition, and best practices enables powerful automation directly in code repositories.`;
    }
    if (lowerTitle.includes('nginx')) {
      return `# ${title}

Nginx is a high-performance web server, reverse proxy, and load balancer. Nginx efficiently handles static files, proxies requests to application servers, and balances load across multiple servers. Understanding Nginx is valuable for deploying production web applications and configuring infrastructure.

As a reverse proxy, Nginx receives client requests and forwards them to backend servers, returning responses to clients. This enables SSL termination, caching, load balancing, and protecting backend servers. Nginx configuration uses declarative syntax defining server blocks, locations, and upstream servers.

Nginx excels at serving static files, SSL/TLS termination, request compression, and handling thousands of concurrent connections efficiently. Nginx can load balance across multiple application instances. Nginx Plus adds advanced features like health checks and dynamic reconfiguration.

Professional deployments use Nginx as reverse proxy for Node.js applications, API gateways, and load balancers. Nginx configuration handles redirects, rewrites, rate limiting, and security headers. Understanding Nginx configuration, performance tuning, and common patterns enables building robust production infrastructure.`;
    }
    if (lowerTitle.includes('linux')) {
      return `# ${title}

Linux is the dominant operating system for servers, cloud infrastructure, and development environments. Understanding Linux fundamentals is essential for backend developers and DevOps engineers. Linux knowledge enables managing servers, debugging production issues, and automating infrastructure operations.

Essential Linux concepts include file system hierarchy, permissions (chmod, chown), processes (ps, top, kill), package management (apt, yum), and shell scripting. Common commands include ls, cd, grep, find, ssh, and systemctl. Understanding pipes, redirects, and command chaining enables powerful command-line workflows.

Linux servers require managing users, permissions, security, and services. SSH provides secure remote access. Systemd manages services and startup. Cron schedules tasks. Log files in /var/log contain diagnostic information. Understanding these systems enables maintaining production servers.

Professional developers use Linux for servers, containers, and development. Understanding Linux fundamentals, shell scripting, and system administration enables effective work in modern development environments. While GUI tools exist, command-line proficiency remains essential for efficient server management and automation.`;
    }
    if (lowerTitle.includes('docker compose')) {
      return `# ${title}

Docker Compose defines and runs multi-container applications using YAML configuration. Compose simplifies managing applications requiring multiple services - web servers, databases, caches. Single commands start entire stacks with proper networking and volumes. Docker Compose is essential for local development environments.

Compose files define services (containers), networks, and volumes. Services specify images, ports, environment variables, and dependencies. Networks enable service communication. Volumes persist data across container restarts. docker-compose up starts all services, docker-compose down stops them. Scaling services uses replicas.

Compose benefits include declarative configuration, easy multi-service management, and consistent environments across team members. Compose files document application architecture. Compose simplifies local development requiring multiple services. Compose works for development and simple deployments but Kubernetes handles production at scale.

Professional teams use Compose for development environments, ensuring developers run identical stacks. Compose configurations often mirror production architectures. Understanding Compose syntax, service dependencies, and networking enables building complex development environments. Docker Compose bridges the gap between local development and production deployments.`;
    }
    return null; // Return null if no specific content found for DevOps
  }

  // Cloud Topics
  if (category === 'Cloud') {
    if (lowerTitle.includes('aws')) {
      return `# ${title}

Amazon Web Services (AWS) is the leading cloud platform offering computing, storage, databases, networking, and hundreds of other services. AWS enables building scalable applications without managing physical infrastructure. Understanding AWS fundamentals is valuable for modern application development and deployment.

Core AWS services include EC2 (virtual servers), S3 (object storage), RDS (managed databases), Lambda (serverless functions), and VPC (networking). AWS provides global infrastructure spanning regions and availability zones ensuring high availability. IAM manages permissions and access control.

AWS benefits include pay-as-you-go pricing, global scale, extensive service catalog, and reliability. However, AWS complexity can be overwhelming. Understanding which services solve which problems is crucial. Cost management and security require careful attention.

Professional applications leverage AWS for scalable, reliable infrastructure. Major companies including Netflix, Airbnb, and NASA use AWS. Understanding AWS core services, pricing models, and architecture patterns enables building cloud-native applications. AWS skills are highly valued in the job market.`;
    }
    if (lowerTitle.includes('ec2')) {
      return `# ${title}

EC2 (Elastic Compute Cloud) provides resizable virtual servers in AWS. EC2 instances run Linux or Windows with configurable CPU, memory, storage, and networking. Understanding EC2 enables running applications on AWS infrastructure with flexible scaling and pricing options.

EC2 instances launch from AMIs (Amazon Machine Images) - templates including operating systems and software. Instance types optimize for different workloads - compute-optimized, memory-optimized, storage-optimized. Security groups control inbound and outbound traffic. Elastic IPs provide static IP addresses.

EC2 pricing includes On-Demand (pay by hour), Reserved (commitment discounts), and Spot (unused capacity at lower prices). Auto Scaling automatically adjusts instance count based on demand. Load Balancers distribute traffic across instances. EBS volumes provide persistent storage.

Professional applications use EC2 for web servers, application servers, and batch processing. While containers and serverless reduce EC2 usage, EC2 remains relevant for specific workloads, legacy applications, or cost optimization. Understanding EC2 fundamentals is essential for AWS architecture decisions.`;
    }
    if (lowerTitle.includes('s3')) {
      return `# ${title}

S3 (Simple Storage Service) provides object storage for any amount of data. S3 stores files (objects) in buckets with 99.999999999% durability. S3 is fundamental to AWS architecture, used for backups, static websites, data lakes, and application storage.

Objects have keys (filenames), data (file content), and metadata. Buckets are containers for objects with configurable permissions, versioning, and lifecycle policies. S3 supports server-side encryption, access logging, and event notifications. Pre-signed URLs provide temporary access to private objects.

S3 storage classes optimize for different access patterns: Standard (frequent access), Intelligent-Tiering (automatic optimization), Infrequent Access (cheaper for rarely accessed data), Glacier (archival). S3 Transfer Acceleration speeds uploads for global users. CloudFront CDN delivers S3 content globally.

Professional applications use S3 for user uploads, backups, static assets, logs, and data lakes. S3 integrates with AWS services like Lambda and Athena. Understanding S3 features, storage classes, and security enables efficient, cost-effective storage solutions. S3 is one of AWS's most fundamental services.`;
    }
    if (lowerTitle.includes('vercel')) {
      return `# ${title}

Vercel is a deployment platform optimized for frontend frameworks, especially Next.js (created by Vercel). Vercel provides zero-config deployments, automatic scaling, CDN distribution, and preview deployments. Vercel simplifies deploying modern web applications with excellent developer experience.

Vercel deploys via Git integration - push to GitHub triggers automatic deployments. Preview deployments create unique URLs for each pull request, enabling testing before merging. Production deployments update live sites. Vercel handles SSL certificates, CDN distribution, and caching automatically.

Vercel specializes in Next.js but supports React, Vue, Angular, and static sites. Serverless Functions enable backend APIs. Edge Functions run code close to users globally. Analytics and Web Vitals monitoring provide insights. Vercel integrates with Headless CMSs and databases.

Professional teams use Vercel for marketing sites, web applications, and documentation. Git-based workflows, automatic previews, and zero-config deployment accelerate development. Understanding Vercel's features, pricing, and optimization techniques enables maximizing platform benefits. Vercel abstracts infrastructure complexity while maintaining flexibility.`;
    }
    if (lowerTitle.includes('firebase')) {
      return `# ${title}

Firebase is Google's Backend-as-a-Service platform providing databases, authentication, hosting, and more. Firebase enables building full-stack applications without backend server code. Real-time Database and Firestore provide NoSQL databases with real-time synchronization. Firebase accelerates development for web and mobile applications.

Firebase services include Authentication (user management), Firestore (document database), Realtime Database (JSON database), Storage (file storage), Hosting (static hosting), and Functions (serverless backend). Firebase provides SDKs for web, iOS, and Android with consistent APIs.

Firebase benefits include rapid development, real-time capabilities, automatic scaling, and Google Cloud integration. Firebase handles infrastructure, security rules control access, and offline support syncs data when connections restore. However, Firebase costs can escalate with usage and vendor lock-in concerns exist.

Professional applications use Firebase for prototypes, real-time features, and mobile backends. Understanding Firebase services, security rules, and pricing enables building applications quickly. Firebase suits small to medium applications and teams wanting fast development without backend infrastructure management.`;
    }
    if (lowerTitle.includes('lambda') || lowerTitle.includes('serverless')) {
      return `# ${title}

AWS Lambda runs code without managing servers (serverless computing). Lambda executes functions in response to events - HTTP requests, file uploads, database changes. Lambda automatically scales, runs functions only when triggered, and charges only for execution time. Understanding Lambda enables building cost-effective, scalable applications.

Lambda functions are code responding to triggers. Common triggers include API Gateway (HTTP), S3 (file events), DynamoDB (database changes), and EventBridge (scheduled events). Functions have configurable memory, timeout, and environment variables. Lambda supports multiple languages including Node.js, Python, and Java.

Lambda benefits include no server management, automatic scaling, pay-per-use pricing, and built-in availability. However, Lambda has cold starts (initial delays), execution time limits, and stateless nature requiring external storage. Lambda suits event-driven, unpredictable workloads but may not be cost-effective for consistent high traffic.

Professional applications use Lambda for APIs, data processing, automation, and event handling. Lambda combines with other AWS services to build serverless architectures. Understanding Lambda limits, best practices, and cost optimization enables leveraging serverless computing effectively. Serverless represents a paradigm shift in application architecture.`;
    }
    return null; // Return null if no specific content found for Cloud
  }

  // System Design Topics
  if (category === 'System Design') {
    if (lowerTitle.includes('scalability')) {
      return `# ${title}

Scalability is a system's ability to handle growing workload by adding resources. Vertical scaling adds resources to single servers (more CPU, RAM), while horizontal scaling adds more servers. Understanding scalability is crucial for building systems supporting business growth without complete rewrites.

Scalability challenges include database bottlenecks, stateful sessions, file storage, and consistency across distributed systems. Solutions include database sharding, stateless architecture, distributed caching, and CDNs. Load balancers distribute requests across servers. Microservices enable independent scaling of different features.

Horizontal scaling provides better fault tolerance and allows scaling beyond single-server limits. However, horizontal scaling increases complexity - distributed systems face network latency, partial failures, and consistency challenges. Understanding CAP theorem helps make tradeoffs between consistency, availability, and partition tolerance.

Professional systems plan for scale from the start through proper architecture. Premature optimization wastes resources, but fundamental design decisions affect scalability dramatically. Understanding bottlenecks, measuring performance, and scaling strategically enables supporting growing user bases. Scalability is essential for successful applications.`;
    }
    if (lowerTitle.includes('load balancer')) {
      return `# ${title}

Load balancers distribute incoming traffic across multiple servers, improving availability and scalability. Load balancers prevent single servers from becoming overwhelmed and enable horizontal scaling. Understanding load balancing is essential for building highly available, scalable applications.

Load balancing algorithms include Round Robin (equal distribution), Least Connections (route to least busy server), IP Hash (consistent routing per client), and Weighted (servers handle proportional load based on capacity). Health checks ensure traffic only routes to healthy servers.

Load balancers operate at different layers - Layer 4 (TCP/UDP) and Layer 7 (HTTP/HTTPS). Layer 7 balancers enable routing based on URLs, headers, or cookies. SSL termination at load balancers offloads encryption from application servers. Session persistence ensures requests from same client reach the same server when needed.

Professional applications use load balancers for high availability, zero-downtime deployments, and horizontal scaling. Cloud providers offer managed load balancers (AWS ELB, Azure Load Balancer). Understanding load balancing strategies, health checks, and session management enables building resilient, scalable systems.`;
    }
    if (lowerTitle.includes('caching')) {
      return `# ${title}

Caching stores frequently accessed data in fast storage to reduce latency and database load. Caches significantly improve performance and scalability. Understanding caching strategies, invalidation, and tradeoffs is crucial for optimizing application performance.

Cache locations include client-side (browser cache), CDN (static assets), application cache (Redis, Memcached), and database cache. Cache-aside (lazy loading) loads data on cache miss. Write-through writes to cache and database simultaneously. Write-behind writes to cache immediately, database asynchronously.

Cache invalidation is famously difficult - determining when to remove or update cached data. TTL (Time To Live) expires cache after set duration. Cache keys must uniquely identify data. Cache stampede occurs when many requests simultaneously miss cache, overwhelming database. Solutions include locking and early expiration.

Professional applications strategically cache database queries, API responses, computed results, and static assets. Cache hit rates measure effectiveness. Understanding what, where, and how long to cache requires balancing freshness and performance. Caching is one of the most effective performance optimizations.`;
    }
    if (lowerTitle.includes('cdn')) {
      return `# ${title}

Content Delivery Networks (CDNs) distribute static content across geographically distributed servers, delivering files from servers closest to users. CDNs dramatically reduce latency, improve load times, and reduce origin server load. Understanding CDNs is essential for optimizing global application performance.

CDNs cache static assets like images, CSS, JavaScript, and videos at edge locations worldwide. When users request content, CDN serves from nearest edge location. Cache misses fetch from origin servers then cache for future requests. CDNs handle traffic spikes by distributing load across many servers.

CDN features include SSL/TLS termination, DDoS protection, image optimization, and compression. CDN providers include Cloudflare, AWS CloudFront, and Fastly. Cache control headers configure caching behavior. Purge APIs invalidate cached content when updated.

Professional applications use CDNs for static assets, improving performance globally. CDNs are especially beneficial for media-heavy sites, global audiences, and traffic spikes. Understanding CDN configuration, caching strategies, and cost optimization ensures maximum benefit. CDNs are fundamental to modern web performance.`;
    }
    if (lowerTitle.includes('rate limiting')) {
      return `# ${title}

Rate limiting controls request frequency from clients, preventing abuse, protecting resources, and ensuring fair usage. Rate limits are expressed as requests per time window (e.g., 100 requests per minute). Understanding rate limiting is essential for building robust, secure APIs.

Rate limiting strategies include fixed window (simple but allows bursts), sliding window (smoother but more complex), token bucket (allows bursts up to bucket size), and leaky bucket (constant rate). Rate limits can be per IP, per user, or global. Different endpoints may have different limits.

Rate limit responses include 429 Too Many Requests status, Retry-After headers indicating wait time, and current limit status headers. Graceful degradation serves cached or reduced functionality when limits reached. Rate limits protect against DDoS attacks, scraping, and buggy clients.

Professional APIs implement rate limiting to ensure stability and fair resource usage. Rate limiting prevents single clients from monopolizing resources. Understanding rate limiting algorithms, storage (Redis), and user experience enables balancing security and usability. Rate limiting is essential for production APIs.`;
    }
    if (lowerTitle.includes('message queue')) {
      return `# ${title}

Message queues enable asynchronous communication between services by buffering messages in reliable queues. Producers send messages, consumers process them independently. Message queues decouple services, enable load leveling, and improve system resilience. Understanding message queues is valuable for distributed systems.

Popular message queue systems include RabbitMQ, AWS SQS, and Redis. Queues store messages durably, delivering them to consumers when ready. Dead letter queues handle failed messages. Priority queues process high-priority messages first. Message acknowledgment ensures reliable processing.

Message queues enable background job processing, microservice communication, and handling traffic spikes. Long-running tasks move to queues, responding immediately to users. Queues buffer between fast producers and slow consumers. Multiple consumers process queues in parallel, enabling horizontal scaling.

Professional applications use queues for email sending, image processing, report generation, and service integration. Understanding queue patterns (point-to-point vs pub/sub), message durability, and error handling enables building resilient asynchronous systems. Message queues are fundamental to scalable architectures.`;
    }
    if (lowerTitle.includes('cap theorem')) {
      return `# ${title}

CAP theorem states distributed systems can provide only two of three guarantees: Consistency (all nodes see same data), Availability (every request receives response), and Partition Tolerance (system works despite network failures). Understanding CAP guides distributed system design decisions.

In practice, partition tolerance is required (networks fail), forcing choices between consistency and availability. CP systems (e.g., MongoDB with strong consistency) sacrifice availability during partitions. AP systems (e.g., Cassandra) sacrifice consistency, allowing divergent data. Different consistency levels provide flexibility.

Consistency models include strong consistency (immediate consistency), eventual consistency (converges eventually), and bounded staleness (consistent within time bound). Many systems offer tunable consistency, allowing applications to choose per operation. Understanding tradeoffs enables appropriate choices for different data types.

Professional distributed systems carefully consider CAP tradeoffs. Critical data may require consistency (financial transactions), while less critical data may prefer availability (social media feeds). Understanding CAP theorem, consistency models, and database characteristics enables making informed architecture decisions for distributed systems.`;
    }
    return null; // Return null if no specific content found for System Design
  }

  // Security Topics
  if (category === 'Security') {
    if (lowerTitle.includes('https') || lowerTitle.includes('ssl') || lowerTitle.includes('tls')) {
      return `# ${title}

HTTPS encrypts communication between browsers and servers using TLS (Transport Layer Security, formerly SSL). HTTPS prevents eavesdropping, tampering, and ensures server identity. HTTPS is now standard for web security - modern browsers warn users about insecure HTTP sites.

HTTPS uses certificates issued by Certificate Authorities (CAs) verifying server identity. Browsers trust specific CAs, rejecting certificates from untrusted sources. Let's Encrypt provides free certificates with automated renewal. Certificate validity periods and renewal are critical operational concerns.

HTTPS encrypts data in transit, protecting passwords, personal information, and session tokens. HTTP/2 and HTTP/3 require HTTPS. HTTPS prevents man-in-the-middle attacks where attackers intercept traffic. Mixed content (HTTPS pages loading HTTP resources) creates vulnerabilities browsers block.

Professional websites exclusively use HTTPS for security and user trust. Understanding certificate management, TLS configuration, and common issues enables maintaining secure connections. HTTPS is legally required for handling sensitive data in many jurisdictions. Security-conscious development requires HTTPS everywhere.`;
    }
    if (lowerTitle.includes('cors')) {
      return `# ${title}

CORS (Cross-Origin Resource Sharing) allows servers to specify which origins can access resources. Browsers block cross-origin requests by default for security. CORS headers enable legitimate cross-origin access while preventing unauthorized access. Understanding CORS is essential for API development.

CORS involves preflight requests (OPTIONS) for complex requests. Servers respond with Access-Control-Allow-Origin specifying allowed origins, Access-Control-Allow-Methods specifying allowed HTTP methods, and Access-Control-Allow-Headers specifying allowed custom headers. Credentials require Access-Control-Allow-Credentials.

Common CORS issues include misconfigured headers, missing OPTIONS handlers, and wildcard with credentials (not allowed). CORS errors appear in browser console. During development, proxies or browser extensions bypass CORS, but production requires proper configuration.

Professional APIs configure CORS appropriately - specific origins for production, wildcards for public APIs. Understanding same-origin policy, preflight requests, and CORS headers prevents security issues while enabling legitimate cross-origin access. Overly permissive CORS creates security vulnerabilities.`;
    }
    if (lowerTitle.includes('csrf')) {
      return `# ${title}

CSRF (Cross-Site Request Forgery) tricks authenticated users into executing unwanted actions. Attackers create requests that browsers automatically include authentication cookies. CSRF can change passwords, transfer funds, or perform actions without user consent. Understanding CSRF prevents serious security vulnerabilities.

CSRF protection uses tokens that attackers cannot access. Synchronizer tokens embed unpredictable tokens in forms, verified on submission. Double-submit cookies send tokens in both cookie and form, comparing them. SameSite cookies prevent browsers from sending cookies on cross-site requests (modern, effective approach).

CSRF primarily affects state-changing requests (POST, PUT, DELETE). GET requests shouldn't change state (HTTP specification and CSRF defense). AJAX requests can use custom headers - same-origin policy prevents attackers from setting custom headers. Checking Origin and Referer headers provides partial protection.

Professional applications implement CSRF protection on all state-changing endpoints. Modern frameworks often include CSRF protection. Understanding CSRF attack vectors and protection mechanisms prevents unauthorized actions. CSRF protection is critical security requirement for web applications handling authentication.`;
    }
    if (lowerTitle.includes('xss')) {
      return `# ${title}

XSS (Cross-Site Scripting) injects malicious scripts into trusted websites. XSS occurs when applications include untrusted data without proper validation or escaping. XSS enables stealing session cookies, capturing keystrokes, or defacing sites. XSS is among the most common web vulnerabilities.

XSS types include stored XSS (malicious data persists in database, affecting all users), reflected XSS (malicious data immediately reflected, affecting victim user), and DOM-based XSS (vulnerability in client-side code). Prevention requires different approaches for each context - HTML, JavaScript, URLs, CSS.

XSS prevention requires sanitizing user input and escaping output appropriately for context. HTML escape converts &lt;, &gt;, &amp;, quotes to entities. JavaScript context requires different escaping. Content Security Policy (CSP) headers restrict script sources, preventing many XSS attacks even if injection occurs.

Professional development treats all user input as untrusted, validating and sanitizing rigorously. Modern frameworks like React provide automatic HTML escaping. Understanding XSS attack vectors, context-appropriate encoding, and defense-in-depth enables building secure applications. XSS prevention is fundamental to web security.`;
    }
    if (lowerTitle.includes('sql injection')) {
      return `# ${title}

SQL injection injects malicious SQL code through application inputs, manipulating database queries. SQL injection can read sensitive data, modify or delete records, or execute admin operations. SQL injection remains a critical security vulnerability despite being well-understood and preventable.

SQL injection occurs when applications concatenate user input directly into SQL queries. Attackers craft input breaking out of intended query structure. Classic example: username: admin'-- bypasses password checks. More sophisticated attacks extract data, enumerate schema, or achieve remote code execution.

Prevention requires parameterized queries (prepared statements) separating SQL code from data. ORMs like Prisma use parameterized queries by default. Input validation provides defense-in-depth but isn't sufficient alone. Principle of least privilege limits damage from successful attacks. Escaping is context-dependent and error-prone.

Professional development exclusively uses parameterized queries for database access. Understanding SQL injection vectors, testing applications for vulnerabilities, and following secure coding practices prevents this critical vulnerability. SQL injection prevention is non-negotiable for any application with database access.`;
    }
    if (lowerTitle.includes('jwt')) {
      return `# ${title}

JWT (JSON Web Token) is a compact, self-contained token format for transmitting information between parties. JWTs commonly implement authentication - servers issue JWTs after login, clients include JWTs in subsequent requests. Understanding JWTs is essential for modern API authentication.

JWTs consist of three parts: header (algorithm and type), payload (claims like user ID, expiration), and signature (verifies integrity). JWTs are base64-encoded, dot-separated strings. Signature ensures JWTs haven't been tampered with. JWTs are stateless - servers verify signatures without database lookups.

JWT advantages include statelessness, scalability, and cross-domain authentication. However, JWTs can't be invalidated before expiration (use short expiration and refresh tokens). Storing JWTs in localStorage risks XSS attacks; httpOnly cookies are more secure. JWT payload is not encrypted - don't store sensitive data.

Professional applications use JWTs for API authentication, especially microservices and mobile apps. Understanding JWT security considerations, refresh token strategies, and secure storage enables building secure authentication systems. While popular, JWTs aren't always the best choice - consider alternatives like sessions.`;
    }
    if (lowerTitle.includes('oauth')) {
      return `# ${title}

OAuth 2.0 is an authorization framework enabling third-party applications to access user resources without exposing credentials. OAuth powers "Login with Google/GitHub/Facebook" buttons. Understanding OAuth is valuable for implementing social login and building APIs requiring third-party access.

OAuth roles include Resource Owner (user), Client (third-party app), Resource Server (API), and Authorization Server (issues tokens). OAuth flows vary by client type. Authorization Code flow suits server apps, Implicit flow (deprecated) suited browser apps, Client Credentials flow suits machine-to-machine, and PKCE extension secures mobile/SPA apps.

OAuth uses access tokens (short-lived, access resources) and refresh tokens (long-lived, obtain new access tokens). Scopes limit what resources tokens can access. OAuth separates authentication (who you are) from authorization (what you can access). OpenID Connect adds authentication layer on OAuth 2.0.

Professional applications implement OAuth for social login, API integrations, and third-party access. Understanding OAuth flows, security considerations (state parameter prevents CSRF), and token management enables building secure authorization systems. OAuth is standard for authorization in modern web applications.`;
    }
    return null; // Return null if no specific content found for Security
  }

  // Testing Topics
  if (category === 'Testing') {
    if (lowerTitle.includes('unit test')) {
      return `# ${title}

Unit testing verifies individual functions or components in isolation. Unit tests are fast, focused, and numerous. They catch bugs early, document code behavior, and enable confident refactoring. Understanding unit testing is fundamental to professional software development.

Unit tests follow Arrange-Act-Assert pattern: set up data, execute code, verify results. Tests should be independent, repeatable, and fast. Mocking isolates units from dependencies like databases or APIs. Test coverage measures code exercised by tests but high coverage doesn't guarantee quality.

Popular JavaScript testing frameworks include Jest (React standard), Mocha, and Vitest. Test frameworks provide assertions, mocking, and test runners. Good unit tests are readable, focus on behavior not implementation, and test edge cases. TDD (Test-Driven Development) writes tests before code.

Professional development includes unit testing as standard practice. Tests prevent regressions, document expected behavior, and improve design by forcing testable code. Understanding unit testing patterns, mocking, and test organization enables building reliable, maintainable software with confidence.`;
    }
    if (lowerTitle.includes('integration test')) {
      return `# ${title}

Integration testing verifies multiple components working together. Integration tests catch issues at component boundaries and ensure proper integration. They're slower than unit tests but faster than end-to-end tests. Understanding integration testing balances different testing levels.

Integration tests might test API endpoint with real database, multiple components interacting, or service integrations. Tests verify components communicate correctly, data flows properly, and business logic spans components correctly. Integration tests use test databases, mock external services, and clean up state between tests.

Integration testing strategies include bottom-up (test lower-level integrations first), top-down (test high-level flows first), and big bang (test everything together). Balance determines how many integration tests - too few miss integration issues, too many slow development.

Professional development includes integration tests for critical paths and complex interactions. Integration tests provide confidence that components work together correctly. Understanding testing pyramid (many unit tests, fewer integration tests, few E2E tests) optimizes test suite effectiveness and speed.`;
    }
    if (lowerTitle.includes('e2e') || lowerTitle.includes('end-to-end')) {
      return `# ${title}

End-to-end testing verifies complete user workflows in environments resembling production. E2E tests interact with applications like real users - clicking buttons, filling forms, navigating pages. E2E tests catch integration issues but are slowest and most brittle tests.

E2E testing tools include Playwright, Cypress, and Selenium. These tools control real browsers, enabling realistic testing. E2E tests verify critical user journeys - signup, login, checkout. Tests should be stable, maintainable, and provide clear error messages when failing.

E2E test challenges include flakiness (intermittent failures), slow execution, and maintenance burden. Strategies for reliability include proper waits, stable selectors, test isolation, and parallel execution. E2E tests should focus on happy paths and critical flows, not exhaustive scenarios covered by unit tests.

Professional development uses E2E tests sparingly for critical business flows. E2E tests provide confidence that applications work end-to-end but shouldn't replace lower-level tests. Understanding E2E testing tradeoffs, best practices, and maintenance strategies enables effective use without overwhelming teams.`;
    }
    if (lowerTitle.includes('jest')) {
      return `# ${title}

Jest is a JavaScript testing framework created by Meta, widely used especially with React. Jest provides test runner, assertion library, mocking capabilities, and code coverage in one package. Zero-config operation and great developer experience make Jest popular for JavaScript testing.

Jest features include snapshot testing (compare rendered output), parallel test execution, built-in code coverage, mocking (functions, modules, timers), and watch mode (reruns tests on changes). Jest uses describe blocks for grouping and test/it blocks for individual tests. Expect provides assertions.

Jest integrates seamlessly with React via react-testing-library. Snapshot tests capture component output, failing when output changes unexpectedly. Mocking isolates units from dependencies. Jest configuration handles different environments, transforms (TypeScript, JSX), and module resolution.

Professional React and Node.js projects commonly use Jest for testing. Understanding Jest features, best practices, and ecosystem enables comprehensive testing strategies. Jest's rich feature set, community support, and excellent documentation make it the standard choice for JavaScript testing.`;
    }
    if (lowerTitle.includes('playwright') || lowerTitle.includes('cypress')) {
      return `# ${title}

Modern E2E testing frameworks like Playwright and Cypress revolutionized browser testing. Both provide reliable, developer-friendly APIs for testing web applications. Understanding these tools enables building comprehensive E2E test suites with better reliability than traditional Selenium tests.

Playwright supports multiple browsers (Chrome, Firefox, Safari) in one API, runs tests in parallel, and provides powerful automation features. Playwright emphasizes speed, reliability, and multi-browser testing. Auto-waiting, network interception, and context isolation improve test stability.

Cypress runs in browser, providing real-time reloads, time travel debugging, and excellent debugging experience. Cypress emphasizes developer experience but initially only supported Chrome. Cypress Cloud provides test recording and debugging. Both frameworks significantly reduce test flakiness compared to Selenium.

Professional teams adopt Playwright or Cypress for E2E testing. Understanding each tool's strengths - Playwright for multi-browser, Cypress for developer experience - guides selection. Both represent modern E2E testing best practices with better reliability and developer experience than previous generation tools.`;
    }
    return null; // Return null if no specific content found for Testing
  }

  // Performance Topics
  if (category === 'Performance') {
    if (lowerTitle.includes('web vitals')) {
      return `# ${title}

Core Web Vitals are Google's metrics for measuring user experience: Largest Contentful Paint (loading), First Input Delay (interactivity), and Cumulative Layout Shift (visual stability). These metrics affect SEO rankings and user perception. Understanding Web Vitals guides performance optimization priorities.

LCP measures when main content loads (goal: 2.5s or less). FID measures response to first interaction (goal: 100ms or less). CLS measures unexpected layout shifts (goal: 0.1 or less). Additional metrics include FCP (First Contentful Paint) and TTFB (Time To First Byte).

Improving LCP involves optimizing images, reducing render-blocking resources, and server response times. Improving FID requires reducing JavaScript execution time and code splitting. Improving CLS needs size attributes on images, avoiding injecting content above, and using CSS transitions.

Professional development monitors Web Vitals using Lighthouse, PageSpeed Insights, and real user monitoring. Understanding what metrics measure and how to improve them enables building fast, delightful user experiences that rank well in search. Web performance directly impacts business metrics.`;
    }
    if (lowerTitle.includes('lazy loading')) {
      return `# ${title}

Lazy loading defers loading resources until needed, improving initial page load. Images, JavaScript, and routes can be lazy loaded. Lazy loading is fundamental to performance optimization, especially for content-heavy sites. Understanding lazy loading enables faster initial loads and better resource utilization.

Image lazy loading uses native loading="lazy" attribute or Intersection Observer API. Browser loads images only when near viewport. Code splitting lazy loads JavaScript - React.lazy() and dynamic import() load components or modules on demand. Route-based code splitting loads only current route's code.

Lazy loading benefits include faster initial load, reduced bandwidth, and improved performance metrics. However, lazy loading can cause layout shift if not implemented carefully or delay content appearing. Placeholders, skeleton screens, and blur-up techniques improve perceived performance.

Professional applications extensively use lazy loading for images, routes, and components. Understanding when and how to lazy load optimizes performance without harming user experience. Lazy loading combined with proper priorities and critical path optimization creates fast-loading applications.`;
    }
    if (lowerTitle.includes('code splitting')) {
      return `# ${title}

Code splitting breaks JavaScript bundles into smaller chunks loaded on demand. Instead of loading entire application upfront, code splitting loads only necessary code initially, reducing initial load time. Understanding code splitting is crucial for optimizing large application performance.

Code splitting strategies include route-based (split per route), component-based (split heavy components), and vendor (separate third-party code). Webpack, Rollup, and Vite support code splitting via dynamic imports. Modern frameworks like Next.js automatically code split routes.

Code splitting benefits include smaller initial bundles, faster time to interactive, and efficient caching. Shared code moves to common chunks. Lazy loading components or routes loads their split chunks on demand. Prefetching and preloading hints optimize subsequent navigations.

Professional applications strategically code split to balance bundle sizes, number of requests, and caching. Understanding bundler behavior, chunk naming, and loading strategies optimizes performance. Analyzing bundle size, identifying large dependencies, and splitting strategically creates faster applications.`;
    }
    if (lowerTitle.includes('caching')) {
      return `# ${title}

Performance optimization heavily relies on caching at multiple levels. Browser cache, service workers, CDN cache, and server cache all reduce latency and server load. Understanding caching strategies and cache headers enables building fast applications.

Cache-Control headers instruct caching behavior: max-age sets expiration, public allows CDN caching, private restricts to browser cache, no-cache requires revalidation. ETag and Last-Modified enable conditional requests. Immutable indicates resources never change, enabling aggressive caching.

Service workers enable offline functionality and advanced caching strategies. Cache-first serves cached content immediately, network-first fetches fresh content, and stale-while-revalidate balances speed and freshness. Versioned URLs enable long cache times without staleness concerns.

Professional applications optimize caching for static assets (long cache times with versioning), APIs (short cache times or no cache), and HTML (short cache or no cache). Understanding cache invalidation, versioning strategies, and HTTP caching enables maximizing performance benefits.`;
    }
    return null; // Return null if no specific content found for Performance
  }

  // Mobile Topics
  if (category === 'Mobile') {
    if (lowerTitle.includes('react native')) {
      return `# ${title}

React Native enables building native mobile apps using React and JavaScript. React Native renders native components rather than web views, providing native performance and feel. Understanding React Native enables building iOS and Android apps with shared codebase and React knowledge.

React Native components map to native components - View becomes iOS UIView or Android ViewGroup. React Native includes platform-specific code, allowing customization per platform. Metro bundler packages JavaScript. Hot reloading speeds development. Native modules access platform capabilities unavailable in JavaScript.

React Native benefits include code sharing across platforms, React skills reuse, hot reloading, and JavaScript development speed. Challenges include platform differences, native module dependencies, and slightly lower performance than pure native. Expo simplifies React Native development with managed workflow.

Professional mobile development increasingly uses React Native for cross-platform apps. Companies like Facebook, Instagram, and Airbnb use React Native. Understanding React Native architecture, platform differences, and performance optimization enables building quality mobile applications efficiently.`;
    }
    if (lowerTitle.includes('expo')) {
      return `# ${title}

Expo is a framework and platform for React Native, providing managed workflow eliminating native code compilation. Expo includes pre-built native modules, development tools, and build services. Expo dramatically simplifies React Native development, especially for web developers learning mobile.

Expo provides managed and bare workflows. Managed workflow handles native code entirely - developers write only JavaScript. Bare workflow ejects to standard React Native for full native control. EAS (Expo Application Services) handles builds, updates, and app store submissions.

Expo includes pre-built modules for camera, location, notifications, file system, and more. Expo Go app enables testing on physical devices without building. OTA (Over The Air) updates push JavaScript changes without app store submissions. Expo CLI provides development server and commands.

Professional developers start with Expo for rapid development, ejecting to bare workflow if needing custom native code. Understanding Expo limitations, managed vs bare workflows, and EAS services enables making informed choices for mobile development. Expo has become the recommended way to start React Native projects.`;
    }
    return null; // Return null if no specific content found for Mobile
  }

  // Professional Tools Topics
  if (category === 'Professional Tools') {
    if (lowerTitle.includes('git')) {
      return `# ${title}

Git is the distributed version control system used by nearly all developers. Git tracks code changes, enables collaboration, and provides history enabling reverting mistakes. Understanding Git is essential for professional development. Every developer needs Git proficiency.

Core Git concepts include commits (snapshots of changes), branches (parallel development lines), and merges (combining branches). Common commands include git add (stage changes), git commit (save changes), git push (upload to remote), git pull (download from remote), and git merge (combine branches).

Git workflows include feature branches (develop features in separate branches), Git Flow (structured branching model), and trunk-based development (frequent commits to main branch). Pull requests enable code review before merging. Understanding branching, merging, and conflict resolution enables effective collaboration.

Professional development requires Git mastery. Understanding Git internals, advanced commands (rebase, cherry-pick, bisect), and best practices (atomic commits, meaningful messages, frequent commits) enables effective version control. Git is fundamental to modern software development workflows.`;
    }
    if (lowerTitle.includes('rest api') || lowerTitle.includes('restful')) {
      return `# ${title}

REST (Representational State Transfer) APIs are the dominant web service architecture. RESTful principles enable building scalable, maintainable APIs consumed by various clients. Understanding REST is essential for backend development, frontend API integration, and designing API contracts.

REST principles include statelessness, resource-based URLs, standard HTTP methods, and meaningful status codes. Resources are nouns (/users, /products), methods are verbs (GET retrieve, POST create, PUT/PATCH update, DELETE remove). JSON is standard data format. Status codes communicate results (200 OK, 201 Created, 404 Not Found, 500 Server Error).

REST best practices include versioning (v1, v2 in URLs), pagination for large collections, filtering and sorting, consistent error responses, and proper authentication. HATEOAS (Hypermedia as Engine of Application State) provides links for related resources. Caching and idempotency improve reliability.

Professional API development follows REST principles for predictability and maintainability. Understanding Richardson Maturity Model, HTTP semantics, and API design patterns enables building intuitive, developer-friendly APIs. Well-designed REST APIs accelerate frontend development and enable diverse client integrations.`;
    }
    if (lowerTitle.includes('graphql')) {
      return `# ${title}

GraphQL is a query language for APIs enabling clients to request exactly needed data. GraphQL provides single endpoint with flexible queries, contrasting with REST's fixed endpoints. Understanding GraphQL enables building efficient, developer-friendly APIs especially for complex data requirements.

GraphQL schemas define types, queries (read data), mutations (modify data), and subscriptions (real-time updates). Clients send queries specifying desired fields. GraphQL resolvers fetch requested data. GraphQL returns only requested fields, avoiding over-fetching or under-fetching common with REST.

GraphQL benefits include precise data fetching, reduced requests, strong typing, and excellent introspection. Challenges include complexity, n+1 query problems, and caching difficulty. DataLoader solves n+1 problems. Apollo and Relay are popular GraphQL clients.

Professional applications use GraphQL for complex data requirements, mobile apps needing efficient data fetching, or rapidly evolving APIs. Understanding GraphQL schema design, resolver patterns, and performance optimization enables building effective GraphQL APIs. GraphQL shines when data requirements vary significantly across clients.`;
    }
    if (lowerTitle.includes('websocket')) {
      return `# ${title}

WebSockets enable bidirectional, real-time communication between clients and servers. Unlike HTTP's request-response pattern, WebSockets maintain open connections for both parties to send messages anytime. Understanding WebSockets enables building real-time features like chat, notifications, and live updates.

WebSocket connection starts with HTTP handshake, upgrading to WebSocket protocol. Both client and server can send messages independently. WebSockets maintain persistent connections, avoiding repeated connection overhead. Socket.IO abstracts WebSockets, providing fallbacks and additional features.

WebSocket use cases include chat applications, real-time dashboards, collaborative editing, gaming, and notifications. WebSockets are more efficient than polling for frequently updating data. However, WebSockets require careful connection management, reconnection logic, and scalability considerations.

Professional applications use WebSockets sparingly for truly real-time features. Understanding when WebSockets versus polling versus Server-Sent Events is appropriate guides architectural decisions. WebSocket implementations require considering authentication, message formats, connection limits, and horizontal scaling challenges.`;
    }
    if (lowerTitle.includes('redis')) {
      return `# ${title}

Redis is an in-memory data structure store used as database, cache, and message broker. Redis provides extremely fast data access through RAM storage. Understanding Redis enables building high-performance caching layers, session stores, and real-time features.

Redis supports various data structures: strings, hashes, lists, sets, sorted sets, and more. Redis commands manipulate these structures atomically. Pub/Sub enables messaging patterns. Redis persistence options include snapshots and append-only files. Redis Cluster provides horizontal scaling.

Common Redis use cases include caching database queries, session storage, rate limiting, real-time analytics, leaderboards, and message queues. Redis's speed and data structures make it versatile. However, Redis data lives in RAM, limiting dataset size and requiring careful capacity planning.

Professional applications extensively use Redis for caching and real-time features. Understanding Redis data structures, persistence options, and scalability strategies enables leveraging Redis effectively. Redis is fundamental infrastructure for high-performance applications requiring fast data access or real-time capabilities.`;
    }
    return null; // Return null if no specific content found for Professional Tools
  }

  return null; // Return null for categories not yet handled
};

const generateGenericContent = (title, category) => {
  return `# ${title}

This topic covers ${title} in ${category || 'web'} development. ${title} is an important concept that developers encounter regularly when building modern applications. Understanding this topic helps create more effective and maintainable code.

${title} provides specific capabilities that solve common development challenges. Developers use this technology to implement features, improve code organization, and enhance application functionality. This concept builds on foundational knowledge and extends capabilities in meaningful ways.

In professional development environments, ${title} appears frequently in codebases and technical discussions. Teams rely on this knowledge to make architectural decisions and implement solutions. Mastering this topic improves your ability to contribute to projects and understand existing code.

Practical application of ${title} involves understanding both theory and implementation. Developers should know when to apply this concept, how to implement it correctly, and what trade-offs exist. This knowledge enables building robust applications that meet user needs while maintaining code quality.`;
};

// ==============================================================================
// 2. TOPIC DATA (All Sidebar Topics)
// ==============================================================================

const htmlTopics = [
  { title: 'HTML Introduction', href: '/learn/full-stack/html/html-introduction' },
  { title: 'HTML Tutorial', href: '/learn/full-stack/html/html-tutorial' },
  { title: 'HTML Editors', href: '/learn/full-stack/html/html-editors' },
  { title: 'HTML Basic', href: '/learn/full-stack/html/html-basic' },
  { title: 'HTML Elements', href: '/learn/full-stack/html/html-elements' },
  { title: 'HTML Attributes', href: '/learn/full-stack/html/html-attributes' },
  { title: 'HTML Headings', href: '/learn/full-stack/html/html-headings' },
  { title: 'HTML Paragraphs', href: '/learn/full-stack/html/html-paragraphs' },
  { title: 'HTML Styles', href: '/learn/full-stack/html/html-styles' },
  { title: 'HTML Formatting', href: '/learn/full-stack/html/html-formatting' },
  { title: 'HTML Quotations', href: '/learn/full-stack/html/html-quotations' },
  { title: 'HTML Comments', href: '/learn/full-stack/html/html-comments' },
  { title: 'HTML Colors', href: '/learn/full-stack/html/html-colors' },
  { title: 'HTML CSS', href: '/learn/full-stack/html/html-css' },
  { title: 'HTML Links', href: '/learn/full-stack/html/html-links' },
  { title: 'HTML Images', href: '/learn/full-stack/html/html-images' },
  { title: 'HTML Favicon', href: '/learn/full-stack/html/html-favicon' },
  { title: 'HTML Page Title', href: '/learn/full-stack/html/html-page-title' },
  { title: 'HTML Tables', href: '/learn/full-stack/html/html-tables' },
  { title: 'HTML Lists', href: '/learn/full-stack/html/html-lists' },
  { title: 'HTML Block & Inline', href: '/learn/full-stack/html/html-block-inline' },
  { title: 'HTML Div', href: '/learn/full-stack/html/html-div' },
  { title: 'HTML Classes', href: '/learn/full-stack/html/html-classes' },
  { title: 'HTML Id', href: '/learn/full-stack/html/html-id' },
  { title: 'HTML Buttons', href: '/learn/full-stack/html/html-buttons' },
  { title: 'HTML Iframes', href: '/learn/full-stack/html/html-iframes' },
  { title: 'HTML JavaScript', href: '/learn/full-stack/html/html-javascript' },
  { title: 'HTML File Paths', href: '/learn/full-stack/html/html-file-paths' },
  { title: 'HTML Head', href: '/learn/full-stack/html/html-head' },
  { title: 'HTML Layout', href: '/learn/full-stack/html/html-layout' },
  { title: 'HTML Responsive', href: '/learn/full-stack/html/html-responsive' },
  { title: 'HTML Computercode', href: '/learn/full-stack/html/html-computercode' },
  { title: 'HTML Semantics', href: '/learn/full-stack/html/html-semantics' },
  { title: 'HTML Style Guide', href: '/learn/full-stack/html/html-style-guide' },
  { title: 'HTML Entities', href: '/learn/full-stack/html/html-entities' },
  { title: 'HTML Symbols', href: '/learn/full-stack/html/html-symbols' },
  { title: 'HTML Emojis', href: '/learn/full-stack/html/html-emojis' },
  { title: 'HTML Charsets', href: '/learn/full-stack/html/html-charsets' },
  { title: 'HTML URL Encode', href: '/learn/full-stack/html/html-url-encode' },
  { title: 'HTML vs XHTML', href: '/learn/full-stack/html/html-vs-xhtml' },
  { title: 'HTML Forms', href: '/learn/full-stack/html/html-forms' },
  { title: 'HTML Form Attributes', href: '/learn/full-stack/html/html-form-attributes' },
  { title: 'HTML Form Elements', href: '/learn/full-stack/html/html-form-elements' },
  { title: 'HTML Input Types', href: '/learn/full-stack/html/html-input-types' },
  { title: 'HTML Input Attributes', href: '/learn/full-stack/html/html-input-attributes' },
  { title: 'HTML Input Form Attributes', href: '/learn/full-stack/html/html-input-form-attributes' },
  { title: 'HTML Graphics', href: '/learn/full-stack/html/html-graphics' },
  { title: 'HTML Canvas', href: '/learn/full-stack/html/html-canvas' },
  { title: 'HTML SVG', href: '/learn/full-stack/html/html-svg' },
  { title: 'HTML Media', href: '/learn/full-stack/html/html-media' },
  { title: 'HTML Video', href: '/learn/full-stack/html/html-video' },
  { title: 'HTML Audio', href: '/learn/full-stack/html/html-audio' },
  { title: 'HTML Plug-ins', href: '/learn/full-stack/html/html-plug-ins' },
  { title: 'HTML YouTube', href: '/learn/full-stack/html/html-youtube' },
  { title: 'HTML APIs', href: '/learn/full-stack/html/html-apis' },
  { title: 'HTML Web APIs', href: '/learn/full-stack/html/html-web-apis' },
  { title: 'HTML Geolocation', href: '/learn/full-stack/html/html-geolocation' },
  { title: 'HTML Drag and Drop', href: '/learn/full-stack/html/html-drag-drop' },
  { title: 'HTML Web Storage', href: '/learn/full-stack/html/html-web-storage' },
  { title: 'HTML Web Workers', href: '/learn/full-stack/html/html-web-workers' },
  { title: 'HTML SSE', href: '/learn/full-stack/html/html-sse' },
  { title: 'HTML Examples', href: '/learn/full-stack/html/html-examples' },
  { title: 'HTML Editor', href: '/learn/full-stack/html/html-editor' },
  { title: 'HTML Quiz', href: '/learn/full-stack/html/html-quiz' },
  { title: 'HTML Exercises', href: '/learn/full-stack/html/html-exercises' },
  { title: 'HTML Website', href: '/learn/full-stack/html/html-website' },
  { title: 'HTML Syllabus', href: '/learn/full-stack/html/html-syllabus' },
  { title: 'HTML Study Plan', href: '/learn/full-stack/html/html-study-plan' },
  { title: 'HTML Interview Prep', href: '/learn/full-stack/html/html-interview-prep' },
  { title: 'HTML Bootcamp', href: '/learn/full-stack/html/html-bootcamp' },
  { title: 'HTML Certificate', href: '/learn/full-stack/html/html-certificate' },
  { title: 'HTML Summary', href: '/learn/full-stack/html/html-summary' },
  { title: 'HTML Accessibility', href: '/learn/full-stack/html/html-accessibility' },
  { title: 'HTML Tag List', href: '/learn/full-stack/html/html-tag-list' },
  { title: 'HTML Global Attributes', href: '/learn/full-stack/html/html-global-attributes' },
  { title: 'HTML Browser Support', href: '/learn/full-stack/html/html-browser-support' },
  { title: 'HTML Events', href: '/learn/full-stack/html/html-events' },
  { title: 'HTML Canvas Reference', href: '/learn/full-stack/html/html-canvas-reference' },
  { title: 'HTML Audio/Video', href: '/learn/full-stack/html/html-audio-video' },
  { title: 'HTML Doctypes', href: '/learn/full-stack/html/html-doctypes' },
  { title: 'HTML Character Sets', href: '/learn/full-stack/html/html-character-sets' },
  { title: 'HTML Lang Codes', href: '/learn/full-stack/html/html-lang-codes' },
  { title: 'HTTP Messages', href: '/learn/full-stack/html/http-messages' },
  { title: 'HTTP Methods', href: '/learn/full-stack/html/http-methods' },
  { title: 'PX to EM Converter', href: '/learn/full-stack/html/px-to-em-converter' },
  { title: 'Keyboard Shortcuts', href: '/learn/full-stack/html/keyboard-shortcuts' }
];

const cssTopics = [
  { title: 'CSS HOME', href: '/learn/full-stack/css/css-home' },
  { title: 'CSS Introduction', href: '/learn/full-stack/css/css-introduction' },
  { title: 'CSS Syntax', href: '/learn/full-stack/css/css-syntax' },
  { title: 'CSS Selectors', href: '/learn/full-stack/css/css-selectors' },
  { title: 'CSS How To', href: '/learn/full-stack/css/css-how-to' },
  { title: 'CSS Comments', href: '/learn/full-stack/css/css-comments' },
  { title: 'CSS Errors', href: '/learn/full-stack/css/css-errors' },
  { title: 'CSS Colors', href: '/learn/full-stack/css/css-colors' },
  { title: 'CSS Backgrounds', href: '/learn/full-stack/css/css-backgrounds' },
  { title: 'CSS Borders', href: '/learn/full-stack/css/css-borders' },
  { title: 'CSS Margins', href: '/learn/full-stack/css/css-margins' },
  { title: 'CSS Padding', href: '/learn/full-stack/css/css-padding' },
  { title: 'CSS Height/Width', href: '/learn/full-stack/css/css-height-width' },
  { title: 'CSS Box Model', href: '/learn/full-stack/css/css-box-model' },
  { title: 'CSS Outline', href: '/learn/full-stack/css/css-outline' },
  { title: 'CSS Text', href: '/learn/full-stack/css/css-text' },
  { title: 'CSS Fonts', href: '/learn/full-stack/css/css-fonts' },
  { title: 'CSS Icons', href: '/learn/full-stack/css/css-icons' },
  { title: 'CSS Links', href: '/learn/full-stack/css/css-links' },
  { title: 'CSS Lists', href: '/learn/full-stack/css/css-lists' },
  { title: 'CSS Tables', href: '/learn/full-stack/css/css-tables' },
  { title: 'CSS Display', href: '/learn/full-stack/css/css-display' },
  { title: 'CSS Max-width', href: '/learn/full-stack/css/css-max-width' },
  { title: 'CSS Position', href: '/learn/full-stack/css/css-position' },
  { title: 'CSS Z-index', href: '/learn/full-stack/css/css-z-index' },
  { title: 'CSS Overflow', href: '/learn/full-stack/css/css-overflow' },
  { title: 'CSS Float', href: '/learn/full-stack/css/css-float' },
  { title: 'CSS Inline-block', href: '/learn/full-stack/css/css-inline-block' },
  { title: 'CSS Align', href: '/learn/full-stack/css/css-align' },
  { title: 'CSS Combinators', href: '/learn/full-stack/css/css-combinators' },
  { title: 'CSS Pseudo-classes', href: '/learn/full-stack/css/css-pseudo-classes' },
  { title: 'CSS Pseudo-elements', href: '/learn/full-stack/css/css-pseudo-elements' },
  { title: 'CSS Opacity', href: '/learn/full-stack/css/css-opacity' },
  { title: 'CSS Navigation Bars', href: '/learn/full-stack/css/css-navigation-bars' },
  { title: 'CSS Dropdowns', href: '/learn/full-stack/css/css-dropdowns' },
  { title: 'CSS Image Gallery', href: '/learn/full-stack/css/css-image-gallery' },
  { title: 'CSS Image Sprites', href: '/learn/full-stack/css/css-image-sprites' },
  { title: 'CSS Attr Selectors', href: '/learn/full-stack/css/css-attr-selectors' },
  { title: 'CSS Forms', href: '/learn/full-stack/css/css-forms' },
  { title: 'CSS Counters', href: '/learn/full-stack/css/css-counters' },
  { title: 'CSS Units', href: '/learn/full-stack/css/css-units' },
  { title: 'CSS Inheritance', href: '/learn/full-stack/css/css-inheritance' },
  { title: 'CSS Specificity', href: '/learn/full-stack/css/css-specificity' },
  { title: 'CSS !important', href: '/learn/full-stack/css/css-important' },
  { title: 'CSS Math Functions', href: '/learn/full-stack/css/css-math-functions' },
  { title: 'CSS Optimization', href: '/learn/full-stack/css/css-optimization' },
  { title: 'CSS Accessibility', href: '/learn/full-stack/css/css-accessibility' },
  { title: 'CSS Website Layout', href: '/learn/full-stack/css/css-website-layout' },
  { title: 'CSS Rounded Corners', href: '/learn/full-stack/css/css-rounded-corners' },
  { title: 'CSS Border Images', href: '/learn/full-stack/css/css-border-images' },
  { title: 'CSS Backgrounds Advanced', href: '/learn/full-stack/css/css-backgrounds-advanced' },
  { title: 'CSS Colors Advanced', href: '/learn/full-stack/css/css-colors-advanced' },
  { title: 'CSS Color Keywords', href: '/learn/full-stack/css/css-color-keywords' },
  { title: 'CSS Gradients', href: '/learn/full-stack/css/css-gradients' },
  { title: 'CSS Shadows', href: '/learn/full-stack/css/css-shadows' },
  { title: 'CSS Text Effects', href: '/learn/full-stack/css/css-text-effects' },
  { title: 'CSS Custom Fonts', href: '/learn/full-stack/css/css-custom-fonts' },
  { title: 'CSS 2D Transforms', href: '/learn/full-stack/css/css-2d-transforms' },
  { title: 'CSS 3D Transforms', href: '/learn/full-stack/css/css-3d-transforms' },
  { title: 'CSS Transitions', href: '/learn/full-stack/css/css-transitions' },
  { title: 'CSS Animations', href: '/learn/full-stack/css/css-animations' },
  { title: 'CSS Tooltips', href: '/learn/full-stack/css/css-tooltips' },
  { title: 'CSS Image Styling', href: '/learn/full-stack/css/css-image-styling' },
  { title: 'CSS Image Modal', href: '/learn/full-stack/css/css-image-modal' },
  { title: 'CSS Image Centering', href: '/learn/full-stack/css/css-image-centering' },
  { title: 'CSS Image Filters', href: '/learn/full-stack/css/css-image-filters' },
  { title: 'CSS Image Shapes', href: '/learn/full-stack/css/css-image-shapes' },
  { title: 'CSS object-fit', href: '/learn/full-stack/css/css-object-fit' },
  { title: 'CSS object-position', href: '/learn/full-stack/css/css-object-position' },
  { title: 'CSS Masking', href: '/learn/full-stack/css/css-masking' },
  { title: 'CSS Buttons', href: '/learn/full-stack/css/css-buttons' },
  { title: 'CSS Pagination', href: '/learn/full-stack/css/css-pagination' },
  { title: 'CSS Multiple Columns', href: '/learn/full-stack/css/css-multiple-columns' },
  { title: 'CSS User Interface', href: '/learn/full-stack/css/css-user-interface' },
  { title: 'CSS Variables', href: '/learn/full-stack/css/css-variables' },
  { title: 'CSS @property', href: '/learn/full-stack/css/css-property' },
  { title: 'CSS Box Sizing', href: '/learn/full-stack/css/css-box-sizing' },
  { title: 'CSS Media Queries', href: '/learn/full-stack/css/css-media-queries' },
  { title: 'CSS MQ Examples', href: '/learn/full-stack/css/css-mq-examples' },
  { title: 'Flexbox Intro', href: '/learn/full-stack/css/flexbox-intro' },
  { title: 'Flex Container', href: '/learn/full-stack/css/flex-container' },
  { title: 'Flex Items', href: '/learn/full-stack/css/flex-items' },
  { title: 'Flex Responsive', href: '/learn/full-stack/css/flex-responsive' },
  { title: 'Grid Intro', href: '/learn/full-stack/css/grid-intro' },
  { title: 'Grid Container', href: '/learn/full-stack/css/grid-container' },
  { title: 'Grid Items', href: '/learn/full-stack/css/grid-items' },
  { title: 'Grid 12-column Layout', href: '/learn/full-stack/css/grid-12-column-layout' },
  { title: 'CSS @supports', href: '/learn/full-stack/css/css-supports' },
  { title: 'RWD Intro', href: '/learn/full-stack/css/rwd-intro' },
  { title: 'RWD Viewport', href: '/learn/full-stack/css/rwd-viewport' },
  { title: 'RWD Grid View', href: '/learn/full-stack/css/rwd-grid-view' },
  { title: 'RWD Media Queries', href: '/learn/full-stack/css/rwd-media-queries' },
  { title: 'RWD Images', href: '/learn/full-stack/css/rwd-images' },
  { title: 'RWD Videos', href: '/learn/full-stack/css/rwd-videos' },
  { title: 'RWD Frameworks', href: '/learn/full-stack/css/rwd-frameworks' },
  { title: 'RWD Templates', href: '/learn/full-stack/css/rwd-templates' },
  { title: 'SASS Tutorial', href: '/learn/full-stack/css/sass-tutorial' },
  { title: 'CSS Templates', href: '/learn/full-stack/css/css-templates' },
  { title: 'CSS Examples', href: '/learn/full-stack/css/css-examples' },
  { title: 'CSS Editor', href: '/learn/full-stack/css/css-editor' },
  { title: 'CSS Snippets', href: '/learn/full-stack/css/css-snippets' },
  { title: 'CSS Quiz', href: '/learn/full-stack/css/css-quiz' },
  { title: 'CSS Exercises', href: '/learn/full-stack/css/css-exercises' },
  { title: 'CSS Website', href: '/learn/full-stack/css/css-website' },
  { title: 'CSS Syllabus', href: '/learn/full-stack/css/css-syllabus' },
  { title: 'CSS Study Plan', href: '/learn/full-stack/css/css-study-plan' },
  { title: 'CSS Interview Prep', href: '/learn/full-stack/css/css-interview-prep' },
  { title: 'CSS Bootcamp', href: '/learn/full-stack/css/css-bootcamp' },
  { title: 'CSS Certificate', href: '/learn/full-stack/css/css-certificate' },
  { title: 'CSS Reference', href: '/learn/full-stack/css/css-reference' },
  { title: 'CSS Selectors Reference', href: '/learn/full-stack/css/css-selectors-reference' },
  { title: 'CSS Combinators Reference', href: '/learn/full-stack/css/css-combinators-reference' },
  { title: 'CSS Pseudo-classes Reference', href: '/learn/full-stack/css/css-pseudo-classes-reference' },
  { title: 'CSS Pseudo-elements Reference', href: '/learn/full-stack/css/css-pseudo-elements-reference' },
  { title: 'CSS At-rules', href: '/learn/full-stack/css/css-at-rules' },
  { title: 'CSS Functions', href: '/learn/full-stack/css/css-functions' },
  { title: 'CSS Web Safe Fonts', href: '/learn/full-stack/css/css-web-safe-fonts' },
  { title: 'CSS Animatable', href: '/learn/full-stack/css/css-animatable' },
  { title: 'CSS Units Reference', href: '/learn/full-stack/css/css-units-reference' },
  { title: 'CSS PX-EM Converter', href: '/learn/full-stack/css/css-px-em-converter' },
  { title: 'CSS Colors Reference', href: '/learn/full-stack/css/css-colors-reference' },
  { title: 'CSS Color Values', href: '/learn/full-stack/css/css-color-values' },
  { title: 'CSS Default Values', href: '/learn/full-stack/css/css-default-values' },
  { title: 'CSS Browser Support', href: '/learn/full-stack/css/css-browser-support' },
];

const jsTopics = [
  { title: 'JS Tutorial', href: '/learn/full-stack/javascript/js-tutorial' },
  { title: 'JS Syntax', href: '/learn/full-stack/javascript/js-syntax' },
  { title: 'JS Variables', href: '/learn/full-stack/javascript/js-variables' },
  { title: 'JS Operators', href: '/learn/full-stack/javascript/js-operators' },
  { title: 'JS If Conditions', href: '/learn/full-stack/javascript/js-if-conditions' },
  { title: 'JS Loops', href: '/learn/full-stack/javascript/js-loops' },
  { title: 'JS Strings', href: '/learn/full-stack/javascript/js-strings' },
  { title: 'JS Numbers', href: '/learn/full-stack/javascript/js-numbers' },
  { title: 'JS Functions', href: '/learn/full-stack/javascript/js-functions' },
  { title: 'JS Objects', href: '/learn/full-stack/javascript/js-objects' },
  { title: 'JS Scope', href: '/learn/full-stack/javascript/js-scope' },
  { title: 'JS Dates', href: '/learn/full-stack/javascript/js-dates' },
  { title: 'JS Temporal Dates', href: '/learn/full-stack/javascript/js-temporal-dates' },
  { title: 'JS Arrays', href: '/learn/full-stack/javascript/js-arrays' },
  { title: 'JS Sets', href: '/learn/full-stack/javascript/js-sets' },
  { title: 'JS Maps', href: '/learn/full-stack/javascript/js-maps' },
  { title: 'JS Iterations', href: '/learn/full-stack/javascript/js-iterations' },
  { title: 'JS Math', href: '/learn/full-stack/javascript/js-math' },
  { title: 'JS RegExp', href: '/learn/full-stack/javascript/js-regexp' },
  { title: 'JS Data Types', href: '/learn/full-stack/javascript/js-data-types' },
  { title: 'JS Errors', href: '/learn/full-stack/javascript/js-errors' },
  { title: 'JS Conventions', href: '/learn/full-stack/javascript/js-conventions' },
  { title: 'JS References', href: '/learn/full-stack/javascript/js-references' },
  { title: 'JS ECMAScript 2026', href: '/learn/full-stack/javascript/js-ecmascript-2026' },
  { title: 'JS Versions', href: '/learn/full-stack/javascript/js-versions' },
  { title: 'JS HTML DOM', href: '/learn/full-stack/javascript/js-html-dom' },
  { title: 'JS Events', href: '/learn/full-stack/javascript/js-events' },
  { title: 'JS Projects', href: '/learn/full-stack/javascript/js-projects' },
  { title: 'JS Functions Advanced', href: '/learn/full-stack/javascript/js-functions-advanced' },
  { title: 'JS Objects Advanced', href: '/learn/full-stack/javascript/js-objects-advanced' },
  { title: 'JS Classes', href: '/learn/full-stack/javascript/js-classes' },
  { title: 'JS Asynchronous', href: '/learn/full-stack/javascript/js-asynchronous' },
  { title: 'JS Modules', href: '/learn/full-stack/javascript/js-modules' },
  { title: 'JS Meta & Proxy', href: '/learn/full-stack/javascript/js-meta-proxy' },
  { title: 'JS Typed Arrays', href: '/learn/full-stack/javascript/js-typed-arrays' },
  { title: 'JS DOM Navigation', href: '/learn/full-stack/javascript/js-dom-navigation' },
  { title: 'JS Windows', href: '/learn/full-stack/javascript/js-windows' },
  { title: 'JS Web APIs', href: '/learn/full-stack/javascript/js-web-apis' },
  { title: 'JS AJAX', href: '/learn/full-stack/javascript/js-ajax' },
  { title: 'JS JSON', href: '/learn/full-stack/javascript/js-json' },
  { title: 'JS jQuery', href: '/learn/full-stack/javascript/js-jquery' },
  { title: 'JS Graphics', href: '/learn/full-stack/javascript/js-graphics' },
  { title: 'JS Examples', href: '/learn/full-stack/javascript/js-examples' },
  { title: 'JS Reference', href: '/learn/full-stack/javascript/js-reference' },
];

const nodeTopics = [
  { title: 'Node HOME', href: '/learn/full-stack/node/node-home' },
  { title: 'Node Intro', href: '/learn/full-stack/node/node-intro' },
  { title: 'Node Get Started', href: '/learn/full-stack/node/node-get-started' },
  { title: 'Node JS Requirements', href: '/learn/full-stack/node/node-js-requirements' },
  { title: 'Node.js vs Browser', href: '/learn/full-stack/node/nodejs-vs-browser' },
  { title: 'Node Cmd Line', href: '/learn/full-stack/node/node-cmd-line' },
  { title: 'Node V8 Engine', href: '/learn/full-stack/node/node-v8-engine' },
  { title: 'Node Architecture', href: '/learn/full-stack/node/node-architecture' },
  { title: 'Node Event Loop', href: '/learn/full-stack/node/node-event-loop' },
  { title: 'Node Async', href: '/learn/full-stack/node/node-async' },
  { title: 'Node Promises', href: '/learn/full-stack/node/node-promises' },
  { title: 'Node Async/Await', href: '/learn/full-stack/node/node-async-await' },
  { title: 'Node Errors Handling', href: '/learn/full-stack/node/node-errors-handling' },
  { title: 'Node Modules', href: '/learn/full-stack/node/node-modules' },
  { title: 'Node ES Modules', href: '/learn/full-stack/node/node-es-modules' },
  { title: 'Node NPM', href: '/learn/full-stack/node/node-npm' },
  { title: 'Node package.json', href: '/learn/full-stack/node/node-package-json' },
  { title: 'Node NPM Scripts', href: '/learn/full-stack/node/node-npm-scripts' },
  { title: 'Node Manage Dep', href: '/learn/full-stack/node/node-manage-dep' },
  { title: 'Node Publish Packages', href: '/learn/full-stack/node/node-publish-packages' },
  { title: 'HTTP Module', href: '/learn/full-stack/node/http-module' },
  { title: 'HTTPS Module', href: '/learn/full-stack/node/https-module' },
  { title: 'File System (fs)', href: '/learn/full-stack/node/file-system-fs' },
  { title: 'Path Module', href: '/learn/full-stack/node/path-module' },
  { title: 'OS Module', href: '/learn/full-stack/node/os-module' },
  { title: 'URL Module', href: '/learn/full-stack/node/url-module' },
  { title: 'Events Module', href: '/learn/full-stack/node/events-module' },
  { title: 'Stream Module', href: '/learn/full-stack/node/stream-module' },
  { title: 'Buffer Module', href: '/learn/full-stack/node/buffer-module' },
  { title: 'Crypto Module', href: '/learn/full-stack/node/crypto-module' },
  { title: 'Timers Module', href: '/learn/full-stack/node/timers-module' },
  { title: 'DNS Module', href: '/learn/full-stack/node/dns-module' },
  { title: 'Assert Module', href: '/learn/full-stack/node/assert-module' },
  { title: 'Util Module', href: '/learn/full-stack/node/util-module' },
  { title: 'Readline Module', href: '/learn/full-stack/node/readline-module' },
  { title: 'Node ES6+', href: '/learn/full-stack/node/node-es6-plus' },
  { title: 'Node Process', href: '/learn/full-stack/node/node-process' },
  { title: 'Node TypeScript', href: '/learn/full-stack/node/node-typescript' },
  { title: 'Node Adv. TypeScript', href: '/learn/full-stack/node/node-adv-typescript' },
  { title: 'Node Lint & Formatting', href: '/learn/full-stack/node/node-lint-formatting' },
  { title: 'Node Frameworks', href: '/learn/full-stack/node/node-frameworks' },
  { title: 'Express.js', href: '/learn/full-stack/node/expressjs' },
  { title: 'Middleware Concept', href: '/learn/full-stack/node/middleware-concept' },
  { title: 'REST API Design', href: '/learn/full-stack/node/rest-api-design' },
  { title: 'API Authentication', href: '/learn/full-stack/node/api-authentication' },
  { title: 'Node.js with Frontend', href: '/learn/full-stack/node/nodejs-with-frontend' },
  { title: 'MySQL Get Started', href: '/learn/full-stack/node/mysql-get-started' },
  { title: 'MySQL Create Database', href: '/learn/full-stack/node/mysql-create-database' },
  { title: 'MySQL Create Table', href: '/learn/full-stack/node/mysql-create-table' },
  { title: 'MySQL Insert Into', href: '/learn/full-stack/node/mysql-insert-into' },
  { title: 'MySQL Select From', href: '/learn/full-stack/node/mysql-select-from' },
  { title: 'MySQL Where', href: '/learn/full-stack/node/mysql-where' },
  { title: 'MySQL Order By', href: '/learn/full-stack/node/mysql-order-by' },
  { title: 'MySQL Delete', href: '/learn/full-stack/node/mysql-delete' },
  { title: 'MySQL Drop Table', href: '/learn/full-stack/node/mysql-drop-table' },
  { title: 'MySQL Update', href: '/learn/full-stack/node/mysql-update' },
  { title: 'MySQL Limit', href: '/learn/full-stack/node/mysql-limit' },
  { title: 'MySQL Join', href: '/learn/full-stack/node/mysql-join' },
  { title: 'MongoDB Get Started', href: '/learn/full-stack/node/mongodb-get-started' },
  { title: 'MongoDB Create DB', href: '/learn/full-stack/node/mongodb-create-db' },
  { title: 'MongoDB Collection', href: '/learn/full-stack/node/mongodb-collection' },
  { title: 'MongoDB Insert', href: '/learn/full-stack/node/mongodb-insert' },
  { title: 'MongoDB Find', href: '/learn/full-stack/node/mongodb-find' },
  { title: 'MongoDB Query', href: '/learn/full-stack/node/mongodb-query' },
  { title: 'MongoDB Sort', href: '/learn/full-stack/node/mongodb-sort' },
  { title: 'MongoDB Delete', href: '/learn/full-stack/node/mongodb-delete' },
  { title: 'MongoDB Drop Collection', href: '/learn/full-stack/node/mongodb-drop-collection' },
  { title: 'MongoDB Update', href: '/learn/full-stack/node/mongodb-update' },
  { title: 'MongoDB Limit', href: '/learn/full-stack/node/mongodb-limit' },
  { title: 'MongoDB Join', href: '/learn/full-stack/node/mongodb-join' },
  { title: 'GraphQL', href: '/learn/full-stack/node/graphql' },
  { title: 'Socket.IO', href: '/learn/full-stack/node/socketio' },
  { title: 'WebSockets', href: '/learn/full-stack/node/websockets' },
  { title: 'Node Adv. Debugging', href: '/learn/full-stack/node/node-adv-debugging' },
  { title: 'Node Testing Apps', href: '/learn/full-stack/node/node-testing-apps' },
  { title: 'Node Test Frameworks', href: '/learn/full-stack/node/node-test-frameworks' },
  { title: 'Node Test Runner', href: '/learn/full-stack/node/node-test-runner' },
  { title: 'Node Env Variables', href: '/learn/full-stack/node/node-env-variables' },
  { title: 'Node Dev vs Prod', href: '/learn/full-stack/node/node-dev-vs-prod' },
  { title: 'Node CI/CD', href: '/learn/full-stack/node/node-cicd' },
  { title: 'Node Security', href: '/learn/full-stack/node/node-security' },
  { title: 'Node Deployment', href: '/learn/full-stack/node/node-deployment' },
  { title: 'Node Logging', href: '/learn/full-stack/node/node-logging' },
  { title: 'Node Monitoring', href: '/learn/full-stack/node/node-monitoring' },
  { title: 'Node Performance', href: '/learn/full-stack/node/node-performance' },
  { title: 'Child Process Module', href: '/learn/full-stack/node/child-process-module' },
  { title: 'Cluster Module', href: '/learn/full-stack/node/cluster-module' },
  { title: 'Worker Threads', href: '/learn/full-stack/node/worker-threads' },
  { title: 'Microservices', href: '/learn/full-stack/node/microservices' },
  { title: 'Node WebAssembly', href: '/learn/full-stack/node/node-webassembly' },
  { title: 'HTTP2 Module', href: '/learn/full-stack/node/http2-module' },
  { title: 'Perf_hooks Module', href: '/learn/full-stack/node/perf-hooks-module' },
  { title: 'VM Module', href: '/learn/full-stack/node/vm-module' },
  { title: 'TLS/SSL Module', href: '/learn/full-stack/node/tls-ssl-module' },
  { title: 'Net Module', href: '/learn/full-stack/node/net-module' },
  { title: 'Zlib Module', href: '/learn/full-stack/node/zlib-module' },
  { title: 'Real-World Examples', href: '/learn/full-stack/node/real-world-examples' },
  { title: 'RasPi Get Started', href: '/learn/full-stack/node/raspi-get-started' },
  { title: 'RasPi GPIO Introduction', href: '/learn/full-stack/node/raspi-gpio-introduction' },
  { title: 'RasPi Blinking LED', href: '/learn/full-stack/node/raspi-blinking-led' },
  { title: 'RasPi LED & Pushbutton', href: '/learn/full-stack/node/raspi-led-pushbutton' },
  { title: 'RasPi Flowing LEDs', href: '/learn/full-stack/node/raspi-flowing-leds' },
  { title: 'RasPi WebSocket', href: '/learn/full-stack/node/raspi-websocket' },
  { title: 'RasPi RGB LED WebSocket', href: '/learn/full-stack/node/raspi-rgb-led-websocket' },
  { title: 'RasPi Components', href: '/learn/full-stack/node/raspi-components' },
  { title: 'Built-in Modules', href: '/learn/full-stack/node/built-in-modules' },
  { title: 'EventEmitter (events)', href: '/learn/full-stack/node/eventemitter-events' },
  { title: 'Worker (cluster)', href: '/learn/full-stack/node/worker-cluster' },
  { title: 'Cipher (crypto)', href: '/learn/full-stack/node/cipher-crypto' },
  { title: 'Decipher (crypto)', href: '/learn/full-stack/node/decipher-crypto' },
  { title: 'DiffieHellman (crypto)', href: '/learn/full-stack/node/diffiehellman-crypto' },
  { title: 'ECDH (crypto)', href: '/learn/full-stack/node/ecdh-crypto' },
  { title: 'Hash (crypto)', href: '/learn/full-stack/node/hash-crypto' },
  { title: 'Hmac (crypto)', href: '/learn/full-stack/node/hmac-crypto' },
  { title: 'Sign (crypto)', href: '/learn/full-stack/node/sign-crypto' },
  { title: 'Verify (crypto)', href: '/learn/full-stack/node/verify-crypto' },
  { title: 'Socket (dgram, net, tls)', href: '/learn/full-stack/node/socket-dgram-net-tls' },
  { title: 'ReadStream (fs, stream)', href: '/learn/full-stack/node/readstream-fs-stream' },
  { title: 'WriteStream (fs, stream)', href: '/learn/full-stack/node/writestream-fs-stream' },
  { title: 'Server (http, https, net, tls)', href: '/learn/full-stack/node/server-http-https-net-tls' },
  { title: 'Agent (http, https)', href: '/learn/full-stack/node/agent-http-https' },
  { title: 'Request (http)', href: '/learn/full-stack/node/request-http' },
  { title: 'Response (http)', href: '/learn/full-stack/node/response-http' },
  { title: 'Message (http)', href: '/learn/full-stack/node/message-http' },
  { title: 'Interface (readline)', href: '/learn/full-stack/node/interface-readline' },
];

const reactTopics = [
  { title: 'React Home', href: '/learn/full-stack/react/react-home' },
  { title: 'React Intro', href: '/learn/full-stack/react/react-intro' },
  { title: 'React Get Started', href: '/learn/full-stack/react/react-get-started' },
  { title: 'React First App', href: '/learn/full-stack/react/react-first-app' },
  { title: 'React Render HTML', href: '/learn/full-stack/react/react-render-html' },
  { title: 'React Upgrade', href: '/learn/full-stack/react/react-upgrade' },
  { title: 'React ES6', href: '/learn/full-stack/react/react-es6' },
  { title: 'React JSX Intro', href: '/learn/full-stack/react/react-jsx-intro' },
  { title: 'React JSX Expressions', href: '/learn/full-stack/react/react-jsx-expressions' },
  { title: 'React JSX Attributes', href: '/learn/full-stack/react/react-jsx-attributes' },
  { title: 'React JSX If Statements', href: '/learn/full-stack/react/react-jsx-if-statements' },
  { title: 'React Components', href: '/learn/full-stack/react/react-components' },
  { title: 'React Class', href: '/learn/full-stack/react/react-class' },
  { title: 'React Props', href: '/learn/full-stack/react/react-props' },
  { title: 'React Props Destructuring', href: '/learn/full-stack/react/react-props-destructuring' },
  { title: 'React Props Children', href: '/learn/full-stack/react/react-props-children' },
  { title: 'React Events', href: '/learn/full-stack/react/react-events' },
  { title: 'React Conditionals', href: '/learn/full-stack/react/react-conditionals' },
  { title: 'React Lists', href: '/learn/full-stack/react/react-lists' },
  { title: 'React Forms', href: '/learn/full-stack/react/react-forms' },
  { title: 'React Forms Submit', href: '/learn/full-stack/react/react-forms-submit' },
  { title: 'React Textarea', href: '/learn/full-stack/react/react-textarea' },
  { title: 'React Select', href: '/learn/full-stack/react/react-select' },
  { title: 'React Multiple Inputs', href: '/learn/full-stack/react/react-multiple-inputs' },
  { title: 'React Checkbox', href: '/learn/full-stack/react/react-checkbox' },
  { title: 'React Radio', href: '/learn/full-stack/react/react-radio' },
  { title: 'React CSS Styling', href: '/learn/full-stack/react/react-css-styling' },
  { title: 'React CSS Modules', href: '/learn/full-stack/react/react-css-modules' },
  { title: 'React CSS-in-JS', href: '/learn/full-stack/react/react-css-in-js' },
  { title: 'React Sass', href: '/learn/full-stack/react/react-sass' },
  { title: 'React Portals', href: '/learn/full-stack/react/react-portals' },
  { title: 'React Suspense', href: '/learn/full-stack/react/react-suspense' },
  { title: 'React Router', href: '/learn/full-stack/react/react-router' },
  { title: 'React Transitions', href: '/learn/full-stack/react/react-transitions' },
  { title: 'React Forward Ref', href: '/learn/full-stack/react/react-forward-ref' },
  { title: 'React HOC', href: '/learn/full-stack/react/react-hoc' },
  { title: 'What is Hooks?', href: '/learn/full-stack/react/what-is-hooks' },
  { title: 'React useState', href: '/learn/full-stack/react/react-usestate' },
  { title: 'React useEffect', href: '/learn/full-stack/react/react-useeffect' },
  { title: 'React useContext', href: '/learn/full-stack/react/react-usecontext' },
  { title: 'React useRef', href: '/learn/full-stack/react/react-useref' },
  { title: 'React useReducer', href: '/learn/full-stack/react/react-usereducer' },
  { title: 'React useCallback', href: '/learn/full-stack/react/react-usecallback' },
  { title: 'React useMemo', href: '/learn/full-stack/react/react-usememo' },
  { title: 'React Custom Hooks', href: '/learn/full-stack/react/react-custom-hooks' },
  { title: 'React Exercises', href: '/learn/full-stack/react/react-exercises' },
  { title: 'React Compiler', href: '/learn/full-stack/react/react-compiler' },
  { title: 'React Quiz', href: '/learn/full-stack/react/react-quiz' },
  { title: 'React Exercises (Practice)', href: '/learn/full-stack/react/react-exercises-practice' },
  { title: 'React Syllabus', href: '/learn/full-stack/react/react-syllabus' },
  { title: 'React Study Plan', href: '/learn/full-stack/react/react-study-plan' },
  { title: 'React Server', href: '/learn/full-stack/react/react-server' },
  { title: 'React Interview Prep', href: '/learn/full-stack/react/react-interview-prep' },
];

const nextTopics = [
  { title: 'Next Home', href: '/learn/full-stack/next/next-home' },
  { title: 'What is Next', href: '/learn/full-stack/next/what-is-next' },
  { title: 'App Router', href: '/learn/full-stack/next/app-router' },
  { title: 'Pages Router', href: '/learn/full-stack/next/pages-router' },
  { title: 'File Structure', href: '/learn/full-stack/next/file-structure' },
  { title: 'Routing', href: '/learn/full-stack/next/routing' },
  { title: 'Layouts', href: '/learn/full-stack/next/layouts' },
  { title: 'Metadata', href: '/learn/full-stack/next/metadata' },
  { title: 'Fonts', href: '/learn/full-stack/next/fonts' },
  { title: 'Rendering', href: '/learn/full-stack/next/rendering' },
  { title: 'SSR', href: '/learn/full-stack/next/ssr' },
  { title: 'SSG', href: '/learn/full-stack/next/ssg' },
  { title: 'ISR', href: '/learn/full-stack/next/isr' },
  { title: 'Streaming', href: '/learn/full-stack/next/streaming' },
  { title: 'Edge Rendering', href: '/learn/full-stack/next/edge-rendering' },
  { title: 'Fetching', href: '/learn/full-stack/next/fetching' },
  { title: 'Server Actions', href: '/learn/full-stack/next/server-actions' },
  { title: 'API Routes', href: '/learn/full-stack/next/api-routes' },
  { title: 'Middleware', href: '/learn/full-stack/next/middleware' },
  { title: 'Images', href: '/learn/full-stack/next/images' },
  { title: 'Styling', href: '/learn/full-stack/next/styling' },
  { title: 'Tailwind', href: '/learn/full-stack/next/tailwind' },
  { title: 'Shadcn', href: '/learn/full-stack/next/shadcn' },
  { title: 'NextAuth', href: '/learn/full-stack/next/nextauth' },
  { title: 'Next.js JWT', href: '/learn/full-stack/next/nextjs-jwt' },
  { title: 'Middleware Auth', href: '/learn/full-stack/next/middleware-auth' },
  { title: 'Next.js Caching', href: '/learn/full-stack/next/nextjs-caching' },
  { title: 'Revalidation', href: '/learn/full-stack/next/revalidation' },
  { title: 'Parallel Routes', href: '/learn/full-stack/next/parallel-routes' },
  { title: 'Intercepting Routes', href: '/learn/full-stack/next/intercepting-routes' },
  { title: 'Error Handling', href: '/learn/full-stack/next/error-handling' },
];

const databaseTopics = [
  { title: 'SQL Intro', href: '/learn/full-stack/databases/sql-intro' },
  { title: 'MySQL Basics', href: '/learn/full-stack/databases/mysql-basics' },
  { title: 'PostgreSQL', href: '/learn/full-stack/databases/postgresql' },
  { title: 'Tables', href: '/learn/full-stack/databases/tables' },
  { title: 'Joins', href: '/learn/full-stack/databases/joins' },
  { title: 'Indexes', href: '/learn/full-stack/databases/indexes' },
  { title: 'Transactions', href: '/learn/full-stack/databases/transactions' },
  { title: 'Stored Procedures', href: '/learn/full-stack/databases/stored-procedures' },
  { title: 'Optimization', href: '/learn/full-stack/databases/optimization' },
  { title: 'MongoDB Intro', href: '/learn/full-stack/databases/mongodb-intro' },
  { title: 'Collections', href: '/learn/full-stack/databases/collections' },
  { title: 'Aggregation', href: '/learn/full-stack/databases/aggregation' },
  { title: 'Indexing', href: '/learn/full-stack/databases/indexing' },
  { title: 'MongoDB Transactions', href: '/learn/full-stack/databases/mongodb-transactions' },
  { title: 'Prisma', href: '/learn/full-stack/databases/prisma' },
  { title: 'Drizzle', href: '/learn/full-stack/databases/drizzle' },
  { title: 'Sequelize', href: '/learn/full-stack/databases/sequelize' },
  { title: 'TypeORM', href: '/learn/full-stack/databases/typeorm' },
];

const backendArchTopics = [
  { title: 'MVC', href: '/learn/full-stack/backend-architecture/mvc' },
  { title: 'Clean Architecture', href: '/learn/full-stack/backend-architecture/clean-architecture' },
  { title: 'Hexagonal', href: '/learn/full-stack/backend-architecture/hexagonal' },
  { title: 'Repository Pattern', href: '/learn/full-stack/backend-architecture/repository-pattern' },
  { title: 'Service Layer', href: '/learn/full-stack/backend-architecture/service-layer' },
  { title: 'Monolith vs Microservices', href: '/learn/full-stack/backend-architecture/monolith-vs-microservices' },
  { title: 'Event Driven', href: '/learn/full-stack/backend-architecture/event-driven' },
  { title: 'CQRS', href: '/learn/full-stack/backend-architecture/cqrs' },
  { title: 'API Versioning', href: '/learn/full-stack/backend-architecture/api-versioning' },
];

const devopsTopics = [
  { title: 'Linux Basics', href: '/learn/full-stack/devops/linux-basics' },
  { title: 'Docker', href: '/learn/full-stack/devops/docker' },
  { title: 'Docker Compose', href: '/learn/full-stack/devops/docker-compose' },
  { title: 'Kubernetes', href: '/learn/full-stack/devops/kubernetes' },
  { title: 'CI CD', href: '/learn/full-stack/devops/ci-cd' },
  { title: 'GitHub Actions', href: '/learn/full-stack/devops/github-actions' },
  { title: 'Nginx', href: '/learn/full-stack/devops/nginx' },
  { title: 'PM2', href: '/learn/full-stack/devops/pm2' },
];

const cloudTopics = [
  { title: 'AWS Basics', href: '/learn/full-stack/cloud/aws-basics' },
  { title: 'EC2', href: '/learn/full-stack/cloud/ec2' },
  { title: 'S3', href: '/learn/full-stack/cloud/s3' },
  { title: 'RDS', href: '/learn/full-stack/cloud/rds' },
  { title: 'Lambda', href: '/learn/full-stack/cloud/lambda' },
  { title: 'Vercel', href: '/learn/full-stack/cloud/vercel' },
  { title: 'Railway', href: '/learn/full-stack/cloud/railway' },
  { title: 'Render', href: '/learn/full-stack/cloud/render' },
  { title: 'Firebase', href: '/learn/full-stack/cloud/firebase' },
];

const systemDesignTopics = [
  { title: 'Scalability', href: '/learn/full-stack/system-design/scalability' },
  { title: 'Load Balancers', href: '/learn/full-stack/system-design/load-balancers' },
  { title: 'Caching', href: '/learn/full-stack/system-design/caching' },
  { title: 'CDN', href: '/learn/full-stack/system-design/cdn' },
  { title: 'Rate Limiting', href: '/learn/full-stack/system-design/rate-limiting' },
  { title: 'Message Queues', href: '/learn/full-stack/system-design/message-queues' },
  { title: 'Databases at Scale', href: '/learn/full-stack/system-design/databases-at-scale' },
  { title: 'CAP Theorem', href: '/learn/full-stack/system-design/cap-theorem' },
  { title: 'Sharding', href: '/learn/full-stack/system-design/sharding' },
  { title: 'Consistent Hashing', href: '/learn/full-stack/system-design/consistent-hashing' },
];

const securityTopics = [
  { title: 'HTTPS', href: '/learn/full-stack/security/https' },
  { title: 'CORS', href: '/learn/full-stack/security/cors' },
  { title: 'CSRF', href: '/learn/full-stack/security/csrf' },
  { title: 'XSS', href: '/learn/full-stack/security/xss' },
  { title: 'SQL Injection', href: '/learn/full-stack/security/sql-injection' },
  { title: 'OAuth', href: '/learn/full-stack/security/oauth' },
  { title: 'JWT', href: '/learn/full-stack/security/jwt' },
  { title: 'Password Hashing', href: '/learn/full-stack/security/password-hashing' },
  { title: 'Secrets Management', href: '/learn/full-stack/security/secrets-management' },
];

const testingTopics = [
  { title: 'Unit Testing', href: '/learn/full-stack/testing/unit-testing' },
  { title: 'Integration Testing', href: '/learn/full-stack/testing/integration-testing' },
  { title: 'E2E', href: '/learn/full-stack/testing/e2e' },
  { title: 'Jest', href: '/learn/full-stack/testing/jest' },
  { title: 'Playwright', href: '/learn/full-stack/testing/playwright' },
  { title: 'Cypress', href: '/learn/full-stack/testing/cypress' },
  { title: 'Supertest', href: '/learn/full-stack/testing/supertest' },
];

const performanceTopics = [
  { title: 'Web Vitals', href: '/learn/full-stack/performance/web-vitals' },
  { title: 'Lazy Loading', href: '/learn/full-stack/performance/lazy-loading' },
  { title: 'Code Splitting', href: '/learn/full-stack/performance/code-splitting' },
  { title: 'Caching Strategies', href: '/learn/full-stack/performance/caching-strategies' },
  { title: 'Database Optimization', href: '/learn/full-stack/performance/database-optimization' },
  { title: 'Node Profiling', href: '/learn/full-stack/performance/node-profiling' },
];

const mobileTopics = [
  { title: 'React Native Intro', href: '/learn/full-stack/mobile/react-native-intro' },
  { title: 'Expo', href: '/learn/full-stack/mobile/expo' },
  { title: 'Navigation', href: '/learn/full-stack/mobile/navigation' },
  { title: 'State Management', href: '/learn/full-stack/mobile/state-management' },
  { title: 'Native APIs', href: '/learn/full-stack/mobile/native-apis' },
  { title: 'Publishing Apps', href: '/learn/full-stack/mobile/publishing-apps' },
];

const professionalToolsTopics = [
  { title: 'Git', href: '/learn/full-stack/professional-tools/git' },
  { title: 'GitHub', href: '/learn/full-stack/professional-tools/github' },
  { title: 'REST APIs', href: '/learn/full-stack/professional-tools/rest-apis' },
  { title: 'GraphQL APIs', href: '/learn/full-stack/professional-tools/graphql-apis' },
  { title: 'Swagger', href: '/learn/full-stack/professional-tools/swagger' },
  { title: 'Postman', href: '/learn/full-stack/professional-tools/postman' },
  { title: 'Stripe Payments', href: '/learn/full-stack/professional-tools/stripe-payments' },
  { title: 'WebSocket Communication', href: '/learn/full-stack/professional-tools/websocket-communication' },
  { title: 'Redis', href: '/learn/full-stack/professional-tools/redis' },
  { title: 'Cron Jobs', href: '/learn/full-stack/professional-tools/cron-jobs' },
];

// ==========================================
// 3. SEEDING LOGIC
// ==========================================

async function seedFullStack() {
  console.log('🌱 Seeding Full Stack Development curriculum...');

  // 1. Clean up existing data
  const existingDomain = await prisma.learnDomain.findUnique({
    where: { slug: 'full-stack' }
  });

  if (existingDomain) {
    console.log('🗑️  Deleting existing Full Stack data...');
    // Ensure cascading deletes are handled by your schema, otherwise you'd need to delete topics/categories first
    await prisma.learnDomain.delete({
      where: { slug: 'full-stack' }
    });
  }

  // 2. Create Full Stack Domain
  const domain = await prisma.learnDomain.create({
    data: {
      slug: 'full-stack',
      title: 'Full Stack Development'
    }
  });

  console.log('✅ Created Full Stack domain');

  // 3. Map Categories to Topic Arrays
  const categoriesData = [
    { title: 'HTML', topics: htmlTopics },
    { title: 'CSS', topics: cssTopics },
    { title: 'JavaScript', topics: jsTopics },
    { title: 'Node.js', topics: nodeTopics },
    { title: 'React', topics: reactTopics },
    { title: 'Next.js', topics: nextTopics },
    { title: 'Databases', topics: databaseTopics },
    { title: 'Backend Architecture', topics: backendArchTopics },
    { title: 'DevOps', topics: devopsTopics },
    { title: 'Cloud', topics: cloudTopics },
    { title: 'System Design', topics: systemDesignTopics },
    { title: 'Security', topics: securityTopics },
    { title: 'Testing', topics: testingTopics },
    { title: 'Performance', topics: performanceTopics },
    { title: 'Mobile', topics: mobileTopics },
    { title: 'Professional Tools', topics: professionalToolsTopics }
  ];

  let categoryOrder = 1;

  for (const catData of categoriesData) {
    console.log(`📂 Processing Category: ${catData.title}`);

    const category = await prisma.learnCategory.create({
      data: {
        title: catData.title,
        order: categoryOrder++,
        domainId: domain.id
      }
    });

    let topicOrder = 1;

    for (const t of catData.topics) {
      const slug = getSlug(t.href);
      const content = generateContent(t.title, catData.title);

      await prisma.learnTopic.create({
        data: {
          title: t.title,
          slug: slug,
          order: topicOrder++,
          content: content,
          categoryId: category.id
        }
      });
    }
  }

  console.log('✅ Full Stack Seeding Complete!');
}

seedFullStack()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });