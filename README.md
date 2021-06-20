# Translator

Translator is a tool for generating translation files for [Nuxt.js i18n](https://github.com/nuxt-community/nuxt-i18n) package. 
It will scan all **.vue** and **.js** files in **/pages** and **/components** directories for `$t('<insert translate tag here>')`. 
If the tag does not exist, it will be created in translation's JSON file with an empty (`""`) value.


# Features!

  - Generate new translation files or update existing ones.
  - Never miss a forgotten translation

# Installation
Install with npm or yarn
```sh
npm install @razmooo/translator --save-dev
yarn add @razmooo/translator --dev .
```

# How to use
To create a new translation file with empty values just execute:
```sh
translator
```
If you want to update non-existing values in a existing translation file:
```sh
translator path/to/file
```

# Example
By default the **i18n** module will use the **/lang** directory, so you can use the following command:

```sh
translator lang/en-US.json
```
This will create a file **translations.json** on the root directory.
