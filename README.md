# Translator

Translator is a tool for generating translation files for [Nuxt.js i18n](https://github.com/nuxt-community/nuxt-i18n) package. 
It will scan all **.vue**, **.js** and **.ts** files in **/pages**, **/components** and **/layouts** directories for 

```
$t('<insert translate tag here>')
ex.
$t('about.team')
```

If the tag does not exist, it will be created in translation's JSON file with an empty (`""`) value.


# Features!

  - Generate new translation files or update existing ones.
  - Never miss a forgotten translation

# Installation
Install with npm or yarn
```sh
npm install @razmooo/translator --save-dev
yarn add @razmooo/translator --dev
```

# How to use
To create a new translation file with empty values just execute:
```sh
translator
```
If you want to update non-existing values in a existing translation file:
```sh
yarn translator --file-output path/to/file
```

# Example
If you have a json files with translations in `lang` folder, you can specify the json file, which will be updated.
```sh
yarn translator --file-output lang/en-US.json
```

# Help
Type ``yarn translator --help`` for help output.