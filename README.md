# reactNaite-albums


## ESLint setting
1. atom環境設定⇨インストール　「linter-eslint」＋　「linter」
2. reactNaiteを作成したディレクトリで、`npm install --save-dev eslint-config-rallycoding`
3. エディター内でディレクトリ一番上部分で新規ファイル`.eslintrc`
```.eslintrc
{
  "extends": "rallycoding"
}

```


## versionの違い
ドキュメントをみればわかるが、頻繁にバージョンが変化している。
ver0.47には`index.ios.js`が含まれているが、新しいバージョンは`App.js(コンポーネントの一部
  )`で,`index.ios.js`に相当する部分は`index.js`なので注意！
それ以外は普通にビルドすれば行けると思われる。

## component作成
ディレクトリ直下に`src/components/header.js(headerの場合)`という風に作っていく、それを`index.js`に`import Header from './src/components/header';`という形で読み込む



## style 例
```
// Improt libraries for maiking a components
import React from 'react';
import { Text } from 'react-native';


//Make a component
const Header = () => {
  const { textStyle } = styles;
  return <Text style={textStyle}>Albums!</Text>;
};

const styles = {
  textStyle:{
    fontSize: 20
  }
};
// Make the component available to other parts of the App
export default Header;


```

```flex-box
// Improt libraries for maiking a components
import React from 'react';
import { Text,View } from 'react-native';


//Make a component
const Header = () => {
  const { textStyle ,viewStyle } = styles;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>Albums!</Text>
    </View>
  );
};

const styles = {
  viewStyle:{
    backgroundColor: '#F8F8F8',
    justifyContent: 'center', //ここに追加
    alignItems: 'center',　//ここに追加
    height: 60,　//pxは不要
    paddingTop: 15
  },
  textStyle:{
    fontSize: 20
  }
};
// Make the component available to other parts of the App
export default Header;

```
