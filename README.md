# Плагин для ESLint

Плагин предлагает заменить lodash методы на нативные JS.  
Реализованы слкдующие методы:

1. \_.map(Array|Object, Function)

## Установка

```
npm i git+https://github.com/mgkOV/eslint-plugin-lodash-to-native.git
```

Подключаем плагин в `.eslintrc` файле:

```
{
  "plugins": [
      "lodash-to-native"
  ],
  "rules": {
      "lodash-to-native/map": "warn"
  }
}
```
