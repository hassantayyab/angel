<p align="center">
  <a href="https://www.gatsbyjs.com/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Angel HVAC Website
</h1>

## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the minimal starter.

    ```shell
    # create a new Gatsby site using the minimal starter
    npm init gatsby
    ```

2.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd my-gatsby-site/
    npm run develop
    ```

3.  **Open the code and start customizing!**

    Your site is now running at http://localhost:8000!

    Edit `src/pages/index.js` to see your site update in real-time!


## Tool/Libraries
1. TailwindCSS (https://tailwindcss.com/)
2. GatsbyJS
3. WordPress (WPGraphQL)
4. Headless UI (https://headlessui.dev/)
5. GlideJS (https://glidejs.com/)


## WordPress Plugins

1. WPGraphQL + WPGatsby
2. ACF + ACF PRO + WPGraphQL ACF
3. Custom Post Type UI + Simple Custom Post Order
4. Yoast SEO + WPGraphQL SEO


## WordPress Theme

You can find a blank theme created for Nexvel sites here: `/wp-plugins/blank-theme.zip`. It adds support for the ACF options page as well as additional page templates.


## Clean Code Rules

1. Title/Subtitle for hero section and Heading/Subheading for the rest.
2. Use an underscore before the ACF names so it's easier to find them.
3. If a component is not being used anywhere else in the code then we probably do not need a WordPress field for it. To be sure, please have a discussion before implementing this component.
4. Kebab-case for pages/templates and camelCase for the rest.
5. If a component is not being used in any other page/post then it shouldn't be placed in `/common` or `/utils`.
6. `/utils` can only have smaller sub-components (e.g. button, carousel) that are used in bigger components (e.g. sections).
7. The Menu and Footer components should be used in the layout component instead of pages. Using Menu inside of Hero is okay too, since it's still being imported once.
8. If a component becomes too big, break it down into a smaller ones. Move the smaller components in a separate directory named after the component.
9. After applying the default styles in TailwindCSS, use the responsive classes in ascending order i.e. `sm, md, lg, xl, 2xl`.
10. If you’re going to create UI components, make sure you use these: https://headlessui.dev/.
11. Make sure you use TailwindCSS + helper libraries installed to build everything, unless it’s impossible to do so. We can have a discussion before doing so.
12. More coming soon...
