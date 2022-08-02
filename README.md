# Bakery 🍪

A JavaScript-based cookie management module.

## Disclaimer

Since this is my first JavaScript project, I know that there are things that might be done in a better way.<br>
Feel free to contribute into this project and report issues [here](https://github.com/cinkciarzkozak/bakery/issues).

## Usage

To start using Bakery, you can import it into existing JS file:<br>

- from URL:<br>
```javascript
import * as Bakery from 'https://cdn.cichocki.me/js/bakery.js'
```

- locally:<br>
```javascript
import * as Bakery from './bakery.js'
```

**Note:** Make sure that you have added `type="module"` into your `<script>` tag:
```html
<script type="module" src="script.js">'
```
Otherwise Bakery will not work, and you'll likely get `SyntaxError` on console.

## Functions

### getCookie()

Usage: `getCookie("name")`<br>
Returns value of cookie with specified `name`.<br><br>

### setCookie()

Usage: `setCookie("name", "value", "expire", "path")`<br>
Creates a cookie with specified parameters:
| Parameter   | Description               | Required |
| :---------- | :------------------------ | :-- |
| `name`      | cookie name               | ✅ |
| `value`     | value of cookie           | ⚠️ |
| `expire`    | how long cookie will stay | ❌ |
| `path`      | path to cookie's catalog  | ❌ |

**Note:** You'll get warning when creating cookie without `value`:<br>
![image](https://user-images.githubusercontent.com/20629343/182138161-c24fe277-bc64-4694-a123-dc641f2a88ba.png)<br>

#### Cookie expiration date
The `expire` parameter allows you to set time of cookie expiration date.<br>
Correct time units are:<br>
| Symbol   | Time unit |
| :------- | :-------- |
| `s`      | seconds   |
| `m`      | minutes   |
| `h`      | hours     |
| `d`      | days      |
| `w`      | weeks     |
| `mo`     | months    |
| `y`      | years     |

**Note:** If incorrect time unit will be specified, you'll get a warning in console. A cookie will expire after session.<br><br>
![image](https://user-images.githubusercontent.com/20629343/182137781-f8f1a779-4181-467c-8b96-f40d54a9c315.png)

Example usage:<br>
```javascript
Bakery.setCookie("emoji", "😎", "7d")
```
In this case, cookie will expire 7 days after creating.<br><br>

### removeCookie()

Usage: `removeCookie("name")`<br>
Removes a cookie with specified `name`.<br><br>

### removeAllCookies()

Usage: `removeAllCookies()`<br>
Removes all cookies from the website.<br><br>

### listCookies()

Usage: `listCookies()`<br>
Displays list of cookies available on the website, as a table in browser's console.<br>
![image](https://user-images.githubusercontent.com/20629343/182140760-a3386b35-e3a4-4b08-9b4f-5f8642b199b5.png)<br><br>

### logToConsole()

Usage: `logToConsole(true|false)`<br>
This function allows logging commands in browser's console.<br><br>

## Examples

### Creating a cookie

To create a cookie named "name" with value "Bakery", with expiration date of 1 month, we have to use `setCookie()` command as shown below:<br>
```javascript
import * as Bakery from './bakery.js'

Bakery.setCookie("name", "Bakery", "1mo")
```
With `logToConsole(true)`, we should see a following output:

![image](https://user-images.githubusercontent.com/20629343/182137417-699c17d7-a845-4ae1-93f6-f2d682c64079.png)<br>

### Updating a cookie

To edit a cookie, we can use a `setCookie()` command in the same way as before, but with different values.<br>
For example, if you want to change the expiration date of `name` cookie from 1 month to 2 weeks, we can do this using:<br>
```javascript
Bakery.setCookie("name", "Bakery", "2w")
```

### Removing a cookie

Removing a cookie is very simple - we have to specify only a name of cookie.<br>
Usage: `removeCookie("name")`<br>
