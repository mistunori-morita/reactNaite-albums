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
#### flex-box例
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

#### class component

```javascript
↓ ,{ Component } これが追加されて
import React ,{ Component } from 'react';
import { View, Text } from 'react-native';

↓　classで記載していく
class AlbumList extends Component {
 //render(){ } を使う
 render(){
  return (
    <View>
      <Text>Alubum List !!!</Text>
    </View>
  );
 }
}

export default AlbumList;


```


### componentWillMount実行時の注意
```
Accessing the In-App Developer Menu
You can access the developer menu by shaking your device or by selecting "Shake Gesture" inside the Hardware menu in the iOS Simulator. You can also use the ⌘D keyboard shortcut when your app is running in the iOS Simulator, or ⌘M when running in an Android emulator.

```

- つまり⌘Dを押してビルドしないとだめ、http://localhost:8081/debugger-uiとかにダイレクトで言っても意味がないので注意！


### npm install --save axiosをインストール
- ターミナルで`npm install --save axios`をインストール
```javascript
import React ,{ Component } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios'; //追記

class AlbumList extends Component {
  componentWillMount() {
    //ここでapiの取得を行っている
    axios.get('https://rallycoding.herokuapp.com/api/music_albums')
    .then(response => console.log(response));
  }


 render() {
  return (
    <View>
      <Text>Alubum List !!!</Text>
    </View>
  );
 }
}

export default AlbumList;

```
- デバッカーにapi情報が表示されていればひとまずOK


### ajax設定
```javascript
import React ,{ Component } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

class AlbumList extends Component {
  //初期化
  state = { albums:[] }; //追記


  componentWillMount() {
    axios.get('https://rallycoding.herokuapp.com/api/music_albums')
    .then(response => this.setState({ albums: response.dta })); //編集
  }


 render() {
  return (
    <View>
      <Text>Alubum List !!!</Text>
    </View>
  );
 }
}

export default AlbumList;

```

### 関数を定義してajaxで取得したデータを呼び出す

```javascript

import React ,{ Component } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

class AlbumList extends Component {

  state = { albums:[] };


  componentWillMount() {
    axios.get('https://rallycoding.herokuapp.com/api/music_albums')
    .then(response => this.setState({ albums: response.data }));
  }

  //追記
  renderAlbums() {
    return this.state.albums.map(album => <Text>{album.title}</Text>);
  }



 render() {
  console.log(this.state);

  return (
  //Viewの中身を関数に変更
    <View>
      {this.renderAlbums()}
    </View>
  );
 }
}

export default AlbumList;


```

### 個別のデータを取得 AlbumDetail.jsの作成

```javascript

//AlbumList.js
//変更
renderAlbums() {
  return this.state.albums.map(album =>
    <Text key={album.title}>{album.title}</Text>
  );
}

その後,componentsフォルダにAlbumDetail.jsを作成

//AlbumDetail
import React from 'react';
import { View, Text } from 'react-native';

const AlbumDetail = () => {

};


export default AlbumDetail;

//AlbumListに作成したAlbumDetailをimport
import AlbumDetail from './AlbumDetail';

```

```javascript

//AlbumList ここを編集
import { View } from 'react-native';

  renderAlbums() {
    return this.state.albums.map(album =>
      <AlbumDetail key={album.title} album={album}/>
    );
  }

//AlbumDetail
const AlbumDetail = (props) => {
  return(
    <View>
      <Text>{props.album.title}</Text>
    </View>
  );
};

これでリロードして表示されていればAlbumDetailの作成に成功している
```


### 再使用可能コンポーネント　カードスタイル作成
- src/components/Card.jsを作成

```javascript
//card.js　最初の設定
import React from 'react';
import { View } from 'react-native';

const Card = () => {
  return (
    <View></View>
  );
};

export default Card;

```

- Card.jsの作り込み

```javascript
//styleing
import React from 'react';
import { View } from 'react-native';

const Card = () => {
  return (
    //styleの付与
    <View style={styles.containerStyle}></View>
  );
};

//stylesの定義
const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'ddd',
    borderBotomWidth: 0,
    shadowcolor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
};s

export default Card;

```

- Card.js component propsを渡す

```javascript
//AlbumDetailの編集　先程作ったcardのスタイルを適用させる（ざっくりいえば外枠フレーム的な感じ）
import React from 'react';
import { View, Text } from 'react-native';
import Card from './Card';


const AlbumDetail = (props) => {
  return(
    <Card>
      <Text>{props.album.title}</Text>
    </Card>
  );
};


export default AlbumDetail;

//Card.jsの編集
//propsを受け取って、渡す
const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
    //ココ追記
      {props.children}
    </View>
  );
};

これができるとapiの取得した各値にスタイルが追加されて、囲まれて見えるようになる
```

- カードをセクションに分ける
- src/components/CardSection.jsを作成
```javascript
//CardSection
import React from 'react';
import { View } from 'react-native';


const CardSection = (props) => {
  return(
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};
//ここのconst stylesの名前を使って  <View style={styles.containerStyle}>のstylesと紐付いている
const styles = {
  containerStyle: {
      borderBotomWidth: 1,
      padding: 5,
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      borderColor: '#ddd',
      position: 'relative'
  }
};

export default CardSection;



//AlbumDetailに作成したCardSectionをimport
import React from 'react';
import { View, Text } from 'react-native';
import Card from './Card';
//作成したCardSectionを読み込み
import CardSection from './CardSection';


const AlbumDetail = (props) => {
  return(
    <Card>
    //CardSectionでwrapする
      <CardSection>
        <Text>{props.album.title}</Text>
      </CardSection>
    </Card>
  );
};


export default AlbumDetail;

これで問題なければシュミレーターを起動したらcssが適用されている
```

## コンポーネントのレイアウト処理
### flexboxによるレイアウト
- headerスタイリング

```javascript

//AlbumDetail

import React from 'react';
import { View, Text } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';


const AlbumDetail = (props) => {
  return(
    <Card>
      <CardSection>
        <View></View>
        //viewにスタイルを追加
        <View style={styles.haederContentStyle}>
          <Text>{props.album.title}</Text>
          <Text>{props.album.artist}</Text>
        </View>
      </CardSection>
    </Card>
  );
};

//スタイルを定義
const styles = {
  haederContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
};

export default AlbumDetail;


```

- header image追加

```javascript
//AlubumDetail import修正
import { View, Text, Image } from 'react-native';

//propsを albumにし、その下のconstで指定すると
//props.album.xxxという書き方をしなくてもスッキリとかける
const AlbumDetail = ({ album }) => {
  const { title, artist, thumbnail_image } = album;
  return(
    <Card>
      <CardSection>
        <View>
          <Image
            style={styles.thumbnailStyle}
            source={{ url: thumbnail_image }}
          />
        </View>
        <View style={styles.haederContentStyle}>
          <Text>{title}</Text>
          <Text>{artist}</Text>
        </View>
      </CardSection>
    </Card>
  );
};

//image部分のスタイルを追加することで画像が出て来る
const styles = {
  haederContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  //追加
  thumbnailStyle: {
    height: 50,
    width: 50
  }
};

export default AlbumDetail;

この時点で問題なければthumbnailが表示されている


//styleの省略　このように書くことで
// {styles.haederContentStyle}>ではなく
const { thumbnailStyle, haederContentStyle } = styles;

<View style={haederContentStyle}>

このようにして省略して書くことができる
```

- アルバム・ジャケット表示(apiデータのthumbnail)/style調整

```javascript

//AlubumDetail
const AlbumDetail = ({ album }) => {
  const { title, artist, thumbnail_image } = album;
  const {
    //追加したstyleを記述
    thumbnailStyle,
    haederContentStyle,
    thumbnailContainerStyle,
    headerTextStyle
  } = styles;

  return(
    <Card>
      <CardSection>
        <View style={thumbnailContainerStyle}>
          <Image
            style={thumbnailStyle}
            source={{ url: thumbnail_image }}
          />
        </View>
        <View style={haederContentStyle}>
          <Text style={headerTextStyle}>{title}</Text>
          <Text>{artist}</Text>
        </View>
      </CardSection>
    </Card>
  );
};

//styleを追記
const styles = {
  haederContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  }
};

//thumbnailイメージ追加
//image　を追記
const { title, artist, thumbnail_image ,image} = album;

  return(
    <Card>
      <CardSection>
        <View style={thumbnailContainerStyle}>
          <Image
            style={thumbnailStyle}
            source={{ url: thumbnail_image }}
          />
        </View>
        <View style={haederContentStyle}>
          <Text style={headerTextStyle}>{title}</Text>
          <Text>{artist}</Text>
        </View>
      </CardSection>
      //追加
      <CardSection>
        <Image source={{ uri: image}} />
      </CardSection>
    </Card>
  );
};




//styleを追加
const styles = {
  haederContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};

//styleの宣言
const {
  thumbnailStyle,
  haederContentStyle,
  thumbnailContainerStyle,
  headerTextStyle,
  //これが追加
  imageStyle
} = styles;

//style呼び出し
<CardSection>
  <Image
  //ここで呼び出し
  style={imageStyle}
    source={{ uri: image }}
  />
</CardSection>

問題がなければジャケット写真が表示されている
```

## コンテンツをスクロール
- AlbumList.js

```js
import { ScrollView } from 'react-native';
に変更

//Viewの部分ScrollViewに変更
return (
  <ScrollView>
    {this.renderAlbums()}
  </ScrollView>
);

//index.js

const App = () => (
  //style flex 1を追記
   <View style={{ flex: 1}}>
      <Header headerText={'Albums'}/>
      <AlbumList />
   </View>
);

```

## ボタンでユーザー入力の処理
- src/components/Button.jsを作成
```js
//Button.js

//まず雛形となるButtonコンポーネントを作成
import React from 'react';
import { Text } from 'react-native';

const Button = () => {
  return (
      <Text>Click me!!!</Text>
  );
};

//ここでdefaultできてないと読込先でエラーになる
export default Button;


//この状態でAlbumDetailにimport
import Button from './Button';

//AlbumDetailに
<CardSection>
  <Button />
</CardSection>
を追記してシュミレーターをリロードするとボタンが追加されている

```
### ReactNativeのドキュメントを見てボタンを設定
- 先ほどの状態だとButtonコンポーネントを作成しただけで特に変化がないのReactNativeのコンポーネントを使う
- TouchableOpacityの設定

```js
//Button.jsに追記

import React from 'react';
//TouchableOpacityを読み込む
import { Text, TouchableOpacity } from 'react-native';

const Button = () => {
  return (
    //TouchableOpacityでラップする
    <TouchableOpacity>
      <Text>Click me!!!</Text>
    </TouchableOpacity>
  );
};

export default Button;

```

### Buttonのスタイル追加
- Button.jsにstylesを追記してスタイリングする
```js
//Button.jsに追記


//1 TouchableOpacityのスタイリング
const styles = {
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  }
};

const Button = () => {
  //先ほど作ったbuttonStyleをstylesに突っ込む
  const { buttonStyle } = styles;
  return (
    //styleを適用させる
    <TouchableOpacity style={buttonStyle}>
      <Text>Click me!!!</Text>
    </TouchableOpacity>
  );
};

//2 Textのスタイリング
const styles = {
  //textStyleを作成
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }, //ここにカンマないとエラーで止まるので注意！
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  }
};

const Button = () => {
  //textStyleの追加
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity style={buttonStyle}>
      //styleの適用
      <Text style={textStyle}>Click me!!!</Text>
    </TouchableOpacity>
  );
};

これでできているとボタンが作成されている
```

## ユーザー入力のイベント設定
- イベントの設定
```js
//onPressを設定したら,comand+Dでリモートデバッカーを起動しないとみれないので注意！
<TouchableOpacity onPress={() => console.log('pressed!')} style={buttonStyle}>

まずこれでイベントを設定してみれることを確認

//AlubumDetail
<CardSection>
  <Button onPress={ () => console.log(title)}/>
</CardSection>

//Button.js

//onPressを渡して
const Button = ({ onPress }) => {
  const { buttonStyle, textStyle } = styles;
  return (
    //ここでonPressに設定
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        Click me!!!
      </Text>
    </TouchableOpacity>
  );
};

これができると、AlubumDetailでtitleをコンソールログするようにしているので、タイトルが表示されるようになる


```
## モバイルアプリ間のリンク
