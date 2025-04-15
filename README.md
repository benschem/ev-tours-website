# Ev Tours & Charter's website

A fast, modern static site built by [Rocketzip](https://rocketzip.com.au)

## 🎯 Goals

- Static, server generated site
- Small footprint - no page builder bloat
- No complex hosting
- No ongoing maintenance
- Fast and accessible - score highly on Google Lighthouse
- No vendor lock-in - switch between services freely
- Optimised for SEO

## 🛠 Tech stack choices

- #### Templating and bundling

  - Static Site Generator: [Eleventy](https://www.11ty.dev/) (11ty) with Liquid templating language
  - CSS bundled by PostCSS with prefixing and minification
  - Minimal client side Javascript

- #### The site content

  - Site content lives in the Github repository in JSON files
  - No need to host a database

- #### Content Management System (CMS)

  - [Decap CMS](https://decapcms.org/docs/intro/) - a client side CMS that accesses the Github repository
  - Serverless function for Github OAuth.

- #### Hosting

  - [Netlify](https://www.netlify.com/)'s free tier

- #### Form submissions

  - Netlify's [Serverless form handling](https://docs.netlify.com/forms/setup/)

- #### Analytics
  - [Plasuible Analytics](https://plausible.io) - hosted by Rocketzip
  - To switch services:
    - Remove the 2 redirects for `/pa-stats` in the `/src/_redirects` file
    - Remove the `script` tag with the `src=/pa-stats` from the `/src/_includes/layouts/base.liquid`
      > </script>

## ✅ Why did we choose this stack?

No running processes = no worries.

- No need to host a database
- No need to host a CMS
- No need to host a backend to handle form submissions
- No need to host a backend to handle authentication
- No need for a front end framwork

It's all just static files.

Benefits:

- No hosting costs
- Nothing to hack
- No software updates needed
- Website unlikely crash or break

## ✍🏻 How to make changes

To update the content, visit `https://evtours.com.au/admin` and log in. When you edit something and save a change, it should update the live website within a few minutes.

When the content is updated via the CMS, a commit is pushed to the main branch of the repository on Github, which triggers Netlify to run Eleventy's build command and deploy the rebuilt files.

Developers can manually edit the code and push a commit to the main branch to also trigger a build and deploy.

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed

### Installation

```bash
git clone https://github.com/evtours/website.git
cd website
npm install
```

### Run Locally

```bash
npm run dev
```

This will start a local development server at http://localhost:8080.

### Build for Production

```bash
npm run build
```

The site will be built and output to the `public` folder.

To see what's happening in the build step, check out `/eleventy.config.js`

## 📤 Deployment

You can deploy the contents of `\public` to any static hosting provider.

Here's how to deploy with Netlify:

- Connect your GitHub repo to Netlify
- Set the build command to: `npm run build`
- Set the publish directory to: `\public`

## 🔐 Decap CMS authentication

Decap needs authenticate to Github with OAuth. Github needs a server to talk to during the authentication process. To keep this site as "static" as possible, I've used a Netlify serverless function.

To create a GitHub OAuth App, login and go to https://github.com/settings/developers
Under “OAuth Apps”, click → “New OAuth App”

Set the name to anything, the homepage URL to https://evtours.com.au and the authorization callback URL to https://evtours.com.au/.netlify/functions/auth/callback

Then GitHub will show you an ID and a Secret - copy these.
Login to Netlify → Site Settings → Environment Variables and add both:

- Client ID → paste this into Netlify as GITHUB_CLIENT_ID
- Client Secret → paste this into Netlify as GITHUB_CLIENT_SECRET

That's it!

Decap will hit your /.netlify/functions/auth/authorize
That redirects to GitHub’s auth screen
GitHub uses your registered OAuth app to show the login prompt
GitHub redirects back to /.netlify/functions/auth/callback
Your function exchanges the code for a token

P.S. This is all already setup!

## 📝 License

### Copyright

The copyright for this website is owned by EV Tours & Charter.

### License to Use

EV Tours & Charter is granted a non-exclusive, worldwide license to use this website for their business purposes. The website may not be sold, sublicensed, or redistributed without the express written consent of the copyright holder.

### Third-party Software and Assets

This website may use third-party libraries, frameworks, or assets. These are subject to their respective licenses. Make sure to review the licenses of any third-party tools or libraries used in this project.

---

If you have any questions or need further clarification, please contact [Rocketzip](https://rocketzip.com.au).
