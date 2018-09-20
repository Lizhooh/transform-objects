
## transform-objects
通过模型更改对象的键。
Change the key of the object through the model.

### Installation
```js
yarn add transform-objects
```


### Usage

```js
const transformObjects = require('./');

test('transform-objects', () => {
    const data = {
        my_id: 4,
        barrder_title: "广告",
        url: "/dasd",
        thumb: "xsxasxasxaxas",
        content: "dasda",
        user: {
            u_id: 1,
            u_name: 'dasd',
        },
        list: [{
            my_id: 4,
            barrder_title: "广告",
            url: "/dasd",
            thumb: "xsxasxasxaxas",
            content: "dasda",
        }, {
            my_id: 4,
            barrder_title: "广告",
            url: "/dasd",
            thumb: "xsxasxasxaxas",
            content: "dasda",
        }],
    }

    expect(transformObjects(data, {
        my_id: 'id',
        barrder_title: 'title',
        content: 'text',
        user: {
            $key: 'user_data',
            u_id: 'id',
            u_name: 'name',
        },
        list: ['new_list', {
            my_id: 'id',
            barrder_title: 'title',
            content: 'text',
        }],
    })).toEqual({
        id: 4,
        title: "广告",
        url: "/dasd",
        thumb: "xsxasxasxaxas",
        text: "dasda",
        user_data: {
            id: 1,
            name: 'dasd',
        },
        new_list: [{
            id: 4,
            title: "广告",
            url: "/dasd",
            thumb: "xsxasxasxaxas",
            text: "dasda",
        }, {
            id: 4,
            title: "广告",
            url: "/dasd",
            thumb: "xsxasxasxaxas",
            text: "dasda",
        }],
    });
});
```

If it is an array.

```js
list: [newKey, obj];
list: [obj];
```

If it is an object.

```js
user: {
    $key: 'user_data',  // <-- new key: user => user_data
    u_id: 'id',
    u_name: 'name',
}
```

### Test

```js
git clone https://github.com/Lizhooh/transform-objects.git
cd transform-objects
npm install

npm run test
```

