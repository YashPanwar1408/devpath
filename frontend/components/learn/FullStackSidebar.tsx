'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Code2, FileCode, Layers, Server, Database, GitBranch, Network, Globe, Cloud, Shield, CheckCircle, Zap, Smartphone, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

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
  { title: 'HTML Summary', href: '/learn/full-stack/html/html-summary' },
  { title: 'HTML Accessibility', href: '/learn/full-stack/html/html-accessibility' },
  { title: 'HTML Tag List', href: '/learn/full-stack/html/html-tag-list' },
  { title: 'HTML Global Attributes', href: '/learn/full-stack/html/html-global-attributes' },
];

const cssTopics = [
  { title: 'CSS Introduction', href: '/learn/full-stack/css/css-introduction' },
  { title: 'CSS Syntax', href: '/learn/full-stack/css/css-syntax' },
  { title: 'CSS Selectors', href: '/learn/full-stack/css/css-selectors' },
  { title: 'CSS How To', href: '/learn/full-stack/css/css-how-to' },
  { title: 'CSS Comments', href: '/learn/full-stack/css/css-comments' },
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
  { title: 'CSS Position', href: '/learn/full-stack/css/css-position' },
  { title: 'CSS Z-index', href: '/learn/full-stack/css/css-z-index' },
  { title: 'CSS Overflow', href: '/learn/full-stack/css/css-overflow' },
  { title: 'CSS Float', href: '/learn/full-stack/css/css-float' },
  { title: 'CSS Inline-block', href: '/learn/full-stack/css/css-inline-block' },
  { title: 'CSS Align', href: '/learn/full-stack/css/css-align' },
  { title: 'CSS Combinators', href: '/learn/full-stack/css/css-combinators' },
  { title: 'CSS Pseudo-class', href: '/learn/full-stack/css/css-pseudo-class' },
  { title: 'CSS Pseudo-element', href: '/learn/full-stack/css/css-pseudo-element' },
  { title: 'CSS Opacity', href: '/learn/full-stack/css/css-opacity' },
  { title: 'CSS Navigation Bar', href: '/learn/full-stack/css/css-navigation-bar' },
  { title: 'CSS Dropdowns', href: '/learn/full-stack/css/css-dropdowns' },
  { title: 'CSS Image Gallery', href: '/learn/full-stack/css/css-image-gallery' },
  { title: 'CSS Image Sprites', href: '/learn/full-stack/css/css-image-sprites' },
  { title: 'CSS Attr Selectors', href: '/learn/full-stack/css/css-attr-selectors' },
  { title: 'CSS Forms', href: '/learn/full-stack/css/css-forms' },
  { title: 'CSS Counters', href: '/learn/full-stack/css/css-counters' },
  { title: 'CSS Website Layout', href: '/learn/full-stack/css/css-website-layout' },
  { title: 'CSS Units', href: '/learn/full-stack/css/css-units' },
  { title: 'CSS Specificity', href: '/learn/full-stack/css/css-specificity' },
  { title: 'CSS !important', href: '/learn/full-stack/css/css-important' },
  { title: 'CSS Math Functions', href: '/learn/full-stack/css/css-math-functions' },
  { title: 'CSS Rounded Corners', href: '/learn/full-stack/css/css-rounded-corners' },
  { title: 'CSS Border Images', href: '/learn/full-stack/css/css-border-images' },
  { title: 'CSS Backgrounds', href: '/learn/full-stack/css/css-backgrounds-advanced' },
  { title: 'CSS Colors Advanced', href: '/learn/full-stack/css/css-colors-advanced' },
  { title: 'CSS Color Keywords', href: '/learn/full-stack/css/css-color-keywords' },
  { title: 'CSS Gradients', href: '/learn/full-stack/css/css-gradients' },
  { title: 'CSS Shadow Effects', href: '/learn/full-stack/css/css-shadow-effects' },
  { title: 'CSS Text Effects', href: '/learn/full-stack/css/css-text-effects' },
  { title: 'CSS Web Fonts', href: '/learn/full-stack/css/css-web-fonts' },
  { title: 'CSS 2D Transforms', href: '/learn/full-stack/css/css-2d-transforms' },
  { title: 'CSS 3D Transforms', href: '/learn/full-stack/css/css-3d-transforms' },
  { title: 'CSS Transitions', href: '/learn/full-stack/css/css-transitions' },
  { title: 'CSS Animations', href: '/learn/full-stack/css/css-animations' },
  { title: 'CSS Tooltips', href: '/learn/full-stack/css/css-tooltips' },
  { title: 'CSS Style Images', href: '/learn/full-stack/css/css-style-images' },
  { title: 'CSS Image Reflection', href: '/learn/full-stack/css/css-image-reflection' },
  { title: 'CSS object-fit', href: '/learn/full-stack/css/css-object-fit' },
  { title: 'CSS object-position', href: '/learn/full-stack/css/css-object-position' },
  { title: 'CSS Masking', href: '/learn/full-stack/css/css-masking' },
  { title: 'CSS Buttons', href: '/learn/full-stack/css/css-buttons' },
  { title: 'CSS Pagination', href: '/learn/full-stack/css/css-pagination' },
  { title: 'CSS Multiple Columns', href: '/learn/full-stack/css/css-multiple-columns' },
  { title: 'CSS User Interface', href: '/learn/full-stack/css/css-user-interface' },
  { title: 'CSS Variables', href: '/learn/full-stack/css/css-variables' },
  { title: 'CSS Box Sizing', href: '/learn/full-stack/css/css-box-sizing' },
  { title: 'CSS Media Queries', href: '/learn/full-stack/css/css-media-queries' },
  { title: 'CSS Flexbox', href: '/learn/full-stack/css/css-flexbox' },
  { title: 'CSS Grid', href: '/learn/full-stack/css/css-grid' },
];

const jsTopics = [
  { title: 'JS Basics', href: '/learn/full-stack/javascript/js-basics' },
  { title: 'ES6+', href: '/learn/full-stack/javascript/es6+' },
  { title: 'DOM', href: '/learn/full-stack/javascript/dom' },
  { title: 'Events', href: '/learn/full-stack/javascript/events' },
  { title: 'Async JS', href: '/learn/full-stack/javascript/async-js' },
  { title: 'Fetch API', href: '/learn/full-stack/javascript/fetch-api' },
  { title: 'Modules', href: '/learn/full-stack/javascript/modules' },
  { title: 'Error Handling', href: '/learn/full-stack/javascript/error-handling' },
  { title: 'LocalStorage', href: '/learn/full-stack/javascript/localstorage' },
];

const nodeTopics = [
  { title: 'Node.js Introduction', href: '/learn/full-stack/node/node-introduction' },
  { title: 'Node.js Get Started', href: '/learn/full-stack/node/node-get-started' },
  { title: 'Node.js Modules', href: '/learn/full-stack/node/node-modules' },
  { title: 'Node.js HTTP Module', href: '/learn/full-stack/node/node-http-module' },
  { title: 'Node.js File System', href: '/learn/full-stack/node/node-file-system' },
  { title: 'Node.js URL Module', href: '/learn/full-stack/node/node-url-module' },
  { title: 'Node.js NPM', href: '/learn/full-stack/node/node-npm' },
  { title: 'Node.js Events', href: '/learn/full-stack/node/node-events' },
  { title: 'Upload Files', href: '/learn/full-stack/node/upload-files' },
  { title: 'Node.js Email', href: '/learn/full-stack/node/node-email' },
  { title: 'Express.js', href: '/learn/full-stack/node/express' },
  { title: 'Middleware', href: '/learn/full-stack/node/middleware' },
  { title: 'Routing', href: '/learn/full-stack/node/routing' },
  { title: 'Template Engines (EJS, Pug)', href: '/learn/full-stack/node/template-engines-ejs-pug' },
  { title: 'Error Handling', href: '/learn/full-stack/node/error-handling' },
  { title: 'Form Handling', href: '/learn/full-stack/node/form-handling' },
  { title: 'File Uploads', href: '/learn/full-stack/node/file-uploads' },
  { title: 'Session Management', href: '/learn/full-stack/node/session-management' },
  { title: 'Cookies', href: '/learn/full-stack/node/cookies' },
  { title: 'Authentication (Passport)', href: '/learn/full-stack/node/authentication-passport' },
  { title: 'REST API', href: '/learn/full-stack/node/rest-api' },
  { title: 'Streams', href: '/learn/full-stack/node/streams' },
  { title: 'Buffers', href: '/learn/full-stack/node/buffers' },
  { title: 'Crypto Module', href: '/learn/full-stack/node/crypto-module' },
  { title: 'Path Module', href: '/learn/full-stack/node/path-module' },
  { title: 'OS Module', href: '/learn/full-stack/node/os-module' },
  { title: 'Process Module', href: '/learn/full-stack/node/process-module' },
  { title: 'Query String', href: '/learn/full-stack/node/query-string' },
  { title: 'Timer Module', href: '/learn/full-stack/node/timer-module' },
  { title: 'Zlib Module', href: '/learn/full-stack/node/zlib-module' },
  { title: 'Assertions', href: '/learn/full-stack/node/assertions' },
  { title: 'Debugging', href: '/learn/full-stack/node/debugging' },
  { title: 'Util Module', href: '/learn/full-stack/node/util-module' },
  { title: 'Agent (http, https)', href: '/learn/full-stack/node/agent-http-https' },
  { title: 'DNS Module', href: '/learn/full-stack/node/dns-module' },
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
];

const reactTopics = [
  { title: 'React Intro', href: '/learn/full-stack/react/react-intro' },
  { title: 'JSX', href: '/learn/full-stack/react/jsx' },
  { title: 'Components', href: '/learn/full-stack/react/components' },
  { title: 'Props', href: '/learn/full-stack/react/props' },
  { title: 'State', href: '/learn/full-stack/react/state' },
  { title: 'Hooks', href: '/learn/full-stack/react/hooks' },
  { title: 'useEffect', href: '/learn/full-stack/react/useeffect' },
  { title: 'Context API', href: '/learn/full-stack/react/context-api' },
  { title: 'React Router', href: '/learn/full-stack/react/react-router' },
];

const nextTopics = [
  { title: 'Next.js Introduction', href: '/learn/full-stack/next/intro' },
  { title: 'App Router', href: '/learn/full-stack/next/app-router' },
  { title: 'Server Components', href: '/learn/full-stack/next/server-components' },
  { title: 'Client Components', href: '/learn/full-stack/next/client-components' },
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
  { title: 'Fonts', href: '/learn/full-stack/next/fonts' },
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
  { title: 'Layered', href: '/learn/full-stack/backend-architecture/layered' },
  { title: 'Microservices', href: '/learn/full-stack/backend-architecture/microservices' },
  { title: 'Monolith', href: '/learn/full-stack/backend-architecture/monolith' },
  { title: 'Repository Pattern', href: '/learn/full-stack/backend-architecture/repository-pattern' },
];

const devopsTopics = [
  { title: 'Git Basics', href: '/learn/full-stack/devops/git-basics' },
  { title: 'GitHub', href: '/learn/full-stack/devops/github' },
  { title: 'CI/CD', href: '/learn/full-stack/devops/cicd' },
  { title: 'Docker', href: '/learn/full-stack/devops/docker' },
  { title: 'Docker Compose', href: '/learn/full-stack/devops/docker-compose' },
  { title: 'Kubernetes', href: '/learn/full-stack/devops/kubernetes' },
  { title: 'Nginx', href: '/learn/full-stack/devops/nginx' },
];

const cloudTopics = [
  { title: 'AWS Basics', href: '/learn/full-stack/cloud/aws-basics' },
  { title: 'EC2', href: '/learn/full-stack/cloud/ec2' },
  { title: 'S3', href: '/learn/full-stack/cloud/s3' },
  { title: 'Vercel', href: '/learn/full-stack/cloud/vercel' },
  { title: 'Netlify', href: '/learn/full-stack/cloud/netlify' },
  { title: 'Railway', href: '/learn/full-stack/cloud/railway' },
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
];

const mobileTopics = [
  { title: 'React Native', href: '/learn/full-stack/mobile/react-native' },
  { title: 'Expo', href: '/learn/full-stack/mobile/expo' },
  { title: 'Native Navigation', href: '/learn/full-stack/mobile/native-navigation' },
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

export function FullStackSidebar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = React.useState('');

  const categories = React.useMemo(() => [
    { id: 'html', title: 'HTML', topics: htmlTopics, icon: Globe },
    { id: 'css', title: 'CSS', topics: cssTopics, icon: Code2 },
    { id: 'javascript', title: 'JavaScript', topics: jsTopics, icon: FileCode },
    { id: 'nodejs', title: 'Node.js', topics: nodeTopics, icon: Server },
    { id: 'react', title: 'React', topics: reactTopics, icon: Layers },
    { id: 'nextjs', title: 'Next.js', topics: nextTopics, icon: FileCode },
    { id: 'databases', title: 'Databases', topics: databaseTopics, icon: Database },
    { id: 'backend', title: 'Backend Architecture', topics: backendArchTopics, icon: Network },
    { id: 'devops', title: 'DevOps', topics: devopsTopics, icon: GitBranch },
    { id: 'cloud', title: 'Cloud', topics: cloudTopics, icon: Cloud },
    { id: 'system-design', title: 'System Design', topics: systemDesignTopics, icon: Network },
    { id: 'security', title: 'Security', topics: securityTopics, icon: Shield },
    { id: 'testing', title: 'Testing', topics: testingTopics, icon: CheckCircle },
    { id: 'performance', title: 'Performance', topics: performanceTopics, icon: Zap },
    { id: 'mobile', title: 'Mobile', topics: mobileTopics, icon: Smartphone },
    { id: 'tools', title: 'Professional Tools', topics: professionalToolsTopics, icon: Wrench },
  ], []);

  // Filter categories and topics based on search
  const filteredCategories = React.useMemo(() => {
    if (!searchQuery.trim()) return categories;
    
    const query = searchQuery.toLowerCase();
    return categories
      .map(cat => ({
        ...cat,
        topics: cat.topics.filter(topic =>
          topic.title.toLowerCase().includes(query)
        ),
      }))
      .filter(cat => cat.topics.length > 0);
  }, [searchQuery, categories]);

  return (
    <div className="h-full w-80 bg-card/50 backdrop-blur-xl border-r border-white/10">
      <div className="sticky top-0 z-10 bg-card/90 backdrop-blur-xl border-b border-white/10 p-6">
        <Link 
          href="/learn"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Overview
        </Link>
        <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400">
          Full Stack Development
        </h2>
        
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <Input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background/50 border-white/10 focus:border-purple-500/50 transition-colors"
          />
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="p-4 space-y-2">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            
            return (
              <Collapsible 
                key={category.id} 
                defaultOpen={category.topics.some(t => pathname === t.href)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between h-auto py-3 px-4 hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-purple-400" />
                      <span className="font-semibold text-sm">{category.title}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 transition-transform group-data-[state=open]:rotate-90" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-1 ml-4 space-y-1">
                  {category.topics.map((topic) => {
                    const isActive = pathname === topic.href;
                    return (
                      <Link
                        key={topic.href}
                        href={topic.href}
                        className={`
                          block py-2 px-4 rounded-lg text-sm transition-all duration-200
                          ${isActive
                            ? 'bg-linear-to-r from-purple-500/20 to-pink-500/10 text-purple-300 font-medium border-l-2 border-purple-500'
                            : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                          }
                        `}
                      >
                        {topic.title}
                      </Link>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
