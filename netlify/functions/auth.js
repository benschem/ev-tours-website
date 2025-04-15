const fetch = require("node-fetch"); // optional on Netlify Node 18+, required otherwise
const cookie = require("cookie");

exports.handler = async (event) => {
  const { queryStringParameters, headers, rawUrl } = event;
  const pathname = rawUrl.replace(/^https?:\/\/[^/]+/, "");

  const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
  const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
  const REDIRECT_URI = `https://${headers.host}/.netlify/functions/auth/callback`;

  // Route: /authorize → redirect user to GitHub
  if (pathname === "/.netlify/functions/auth/authorize") {
    const state = Math.random().toString(36).substring(2); // simple CSRF protection token

    // Set a cookie for state
    const cookieHeader = cookie.serialize("state", state, {
      httpOnly: true, // Make it inaccessible from JavaScript
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS
      maxAge: 600, // Keep it for 10 minutes
      path: "/", // Available site-wide
    });

    const redirectUrl =
      `https://github.com/login/oauth/authorize` +
      `?client_id=${CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&scope=repo` +
      `&state=${state}`;

    return {
      statusCode: 302,
      headers: {
        Location: redirectUrl,
        "Set-Cookie": cookieHeader, // Send state in cookie
      },
    };
  }

  // Route: /callback → handle GitHub response and get access token
  if (pathname === "/.netlify/functions/auth/callback") {
    const { code, state } = queryStringParameters;

    if (!code || !state) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing code or state parameter" }),
      };
    }

    // Read state from cookie
    const cookies = cookie.parse(headers.cookie || "");
    const storedState = cookies.state;

    // Verify state for CSRF protection
    if (state !== storedState) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: "Invalid state parameter, possible CSRF attack" }),
      };
    }

    try {
      const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code,
          redirect_uri: REDIRECT_URI,
        }),
      });

      const tokenData = await tokenRes.json();

      if (!tokenRes.ok || tokenData.error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: tokenData.error_description || "OAuth token exchange failed." }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ token: tokenData.access_token }),
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Server error during token exchange" }),
      };
    }
  }

  // Fallback for unhandled routes
  return {
    statusCode: 404,
    body: "Not Found",
  };
};
