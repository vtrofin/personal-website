# Trofin.me

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

- Run with the vercel serverless api

```
npm run serve_api
```

- Run just the vueJS front-end

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

## Configure the app

### Customize configuration

See the Vuejs CLI [Configuration Reference](https://cli.vuejs.org/config/).

### Debugger config

Just use regular old Launch Chrome configuration

### Prettier setting for vue files.

```
// settings.json
"[vue]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
```

### Env variables

```
CLIENT_ID=
CLIENT_SECRET=
REFRESH_TOKEN=
SENDER_EMAIL=testmaa33@gmail.com
RECEIVER_EMAIL=
REDIRECT_URL=https://developers.google.com/oauthplayground
VUE_APP_CONTACT_TOKEN=
```

- Set up Vercel production env variables [here](https://vercel.com/victortrofin/personal-website/settings/environment-variables)
- Notes about [VueJS and env variables](https://cli.vuejs.org/guide/mode-and-env.html#example-staging-mode)

## Contact form

- [App page](https://console.developers.google.com/apis/credentials?project=send-email-from-web-form) (testmaa33@gmail.com)
- Get refresh token [here](https://developers.google.com/oauthplayground/) => Settings => Use your own OAuth credentials
- Add refresh token to .env file for dev.
- Add refresh token to [secret](https://vercel.com/docs/cli#commands/secrets). Link secret to [prod env](https://vercel.com/docs/environment-variables#)

### Vercel docs:

- See limits [here](https://vercel.com/docs/platform/limits#serverless-function-size)
- Vercel CLI [reference](https://vercel.com/docs/cli#commands/overview/basic-usage)
- Notes about [Vercel and env variables](https://vercel.com/docs/environment-variables#development-environment-variables)

## Font-awesome:

- If you need to use font-aweme you'll have to use these package versions

```
"@fortawesome/fontawesome-svg-core": "^1.2.32"
"@fortawesome/vue-fontawesome": "^3.0.0-3"
```

- Follow the config from [here](https://www.npmjs.com/package/@fortawesome/vue-fontawesome)
- How to use in code:

```
<fa icon="user-secret" />
<fa :icon="['fab', 'twitter']" :class="fa-3x" />
```

## Add meta tags

- Check out `main.js` and `meta_tag.js` files

## Git lfs

Vercel does not work with git lfs. Git lfs Removed.

```
// Check tracked files
git lfs ls-files

// Fetch all images
git lfs fetch --all
git lfs pull

// Push all images
git lfs push --all
```
