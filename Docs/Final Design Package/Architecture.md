# Architecture Document

## Svelte and SvelteKit

Svelte and SvelteKit serve as the core framework and metaframework for our project. Svelte provides a highly optimized and reactive UI experience by compiling components into highly efficient JavaScript. SvelteKit builds upon Svelte, offering features such as server-side rendering (SSR), static site generation (SSG), and simplified routing.

*Key Features*:

**Reactive Components**: Svelte's reactivity system eliminates the need for complex state management libraries.

**SSR and SSG**: SvelteKit allows pre-rendering of pages for better performance and SEO.

**File-based Routing**: Simplifies navigation and route creation.

**API Routes**: Enables backend functionality within the same codebase.

**Simplified Stores**: Provides an easy way to manage global state.

## Flowbite-Svelte

Flowbite-Svelte is a UI component library built on top of Tailwind CSS, offering pre-built, customizable components that enhance the development speed and UI consistency.

*Key Features*:

**Tailwind-based**: Fully integrates with Tailwind CSS for easy customization.

**Accessible Components**: Ensures compliance with accessibility standards.

**Pre-built UI Elements**: Includes buttons, modals, dropdowns, and more.

**Consistent Design System**: Maintains a cohesive look across the application.

## Tailwind CSS

Tailwind CSS is a utility-first CSS framework that allows rapid UI development through composable classes, eliminating the need for traditional CSS stylesheets.

*Key Features*:

**Utility-First Approach**: Encourages inline styling with composable classes.

**Customization**: Easily configurable through the Tailwind config file.

**Responsive Design**: Built-in support for mobile-first development.

**Performance Optimization**: Removes unused styles with tree-shaking.



The database is hosted in a MariaDB container. `/var/lib/mysql` is mapped to a persistent volume, and port 3306 is exposed on the host.

### PHPMyAdmin

PHPMyAdmin is hosted in a container to provide a web interface for managing the database. The application is pointed to the database container. No ports are exposed, as the application is accessed through the reverse proxy.

### SEPPTIC Application

The SEPPTIC application is hosted in a container running the Sveltekit application. This container can be automatically updated by using GitHub Actions as described in the [deployment instructions](./Deployment%20Instructions.md). No ports are exposed, as the application is accessed through the reverse proxy.

### Reverse Proxy

The reverse proxy is hosted in a container running the Nginx Reverse Proxy Manager. It can be managed through the web interface at [proxy.cybergames.byu.edu](https://proxy.cybergames.byu.edu). The reverse proxy is responsible for routing traffic to the appropriate container based on the subdomain. The reverse proxy is exposed on ports 80 and 443 on the host. The following subdomains are currently configured:

- `cybergames.byu.edu` -> SEPPTIC container on 3000
- `db.cybergames.byu.edu` -> PHPMyAdmin container on 80
- `proxy.cybergames.byu.edu` -> Nginx Reverse Proxy Manager on 81