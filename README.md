# My personal website

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

### Nodemailer

Mailing app done with user testmaa33@gmail.com. See the app details [here](https://console.developers.google.com/apis/credentials?project=send-email-from-web-form)

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

- See details on how to configure font-awesome with the vue 3 app [here](https://github.com/FortAwesome/vue-fontawesome/issues/230#issuecomment-696719673). Problem is package is still currently in beta.
