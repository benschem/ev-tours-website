# Ev Tours & Charter's website

A fast, modern static site built by [Rocketzip](https://rocketzip.com.au)

## 🎯 Goals

- Small footprint - no page builder bloat
- No ongoing maintenance or costs
- Fast and accessible - score highly on Google Lighthouse
- No vendor lock-in - switch between services freely
- Optimised for SEO

## 🛠 Tech stack choices

- #### Building the site
  - Static Site Generator: [Eleventy](https://www.11ty.dev/) (11ty) with Liquid templating language
  - CSS bundled by PostCSS with prefixing and minification
  - Minimal client side Javascript

- #### The data
  - JSON-based content that lives in the repository

- #### CMS
  - [Decap CMS](https://decapcms.org/docs/intro/) - a client side CMS that lives in the repository
  - Decap CMS needs to authenticate to Github with OAuth. Github needs a server to talk to during the authentication process. If you’re hosting at Netlify, they take care of that. If not, you’re on your own.

- #### Hosting
  - [Netlify](https://www.netlify.com/) for deployment

- #### Form submissions
  - Netlify's [Serverless form handling](https://docs.netlify.com/forms/setup/)

- #### Analytics
  - [Plasuible Analytics](https://plausible.io) - hosted by Rocketzip

## 🚫 No running process or database = no worries

Eleventy runs a build process on command that compiles the site and generates static files to be served directly. The hosting providor (Netlify or other) handles form submissions. The CMS runs completely on the client.

When the content is updated via the CMS, a commit is pushed to the main branch of the repository on Github which triggers Netlify to run Eleventy's build command and deploy the new files. Developers can manually edit the code and push a commit to the main branch to also trigger a build and deploy.

Benefits:

- Nothing to hack
- No software updates needed
- Website won't crash or break
- Static files are cheap or free to host

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed

### Installation

```bash
git clone https://github.com/benschem/ev-tours-website.git
cd ev-tours-website
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

## 📤 Deployment

You can deploy to any static hosting provider. Here's how to deploy with Netlify:

- Connect your GitHub repo to Netlify
- Set the build command to: `npm run build`
- Set the publish directory to: `\public`

## 📝 License

### Copyright

The copyright for this website is owned by EV Tours & Charter.

### License to Use

EV Tours & Charter is granted a non-exclusive, worldwide license to use this website for their business purposes. The website may not be sold, sublicensed, or redistributed without the express written consent of the copyright holder.

### Third-party Software and Assets

This website may use third-party libraries, frameworks, or assets. These are subject to their respective licenses. Make sure to review the licenses of any third-party tools or libraries used in this project.

---

If you have any questions or need further clarification, please contact [Rocketzip](https://rocketzip.com.au).
