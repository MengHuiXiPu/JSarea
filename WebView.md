## WebView

#### WebView的概念 

> `WebView` 用来展示网页的 `view` 组件，该组件是你运行自己的浏览器或者在你的线程中展示线上内容的基础。使用 `Webkit` 渲染引擎来展示，并且支持前进后退等基于浏览历史，放大缩小，等更多功能。
>
> 
>
> 简单来说 `WebView` 是手机中内置了一款高性能 `Webkit` 内核浏览器，在 `SDK` 中封装的一个组件。不过没有提供地址栏和导航栏，只是单纯的展示一个网页界面。

以上是一个客户端开发者描述的，而站在一个前端开发者的角度，使用过后的感受就是：

> WebView 可以简单理解为页面里的 iframe 。原生app与 WebView 的交互可以简单看作是页面与页面内 iframe 页面进行的交互。就如页面与页面内的 iframe 共用一个 Window 一样，原生与 WebView 也共用了一套原生的方法。

既然我们使用了 WebView 来承载 H5 ，那么便少不了与 Native 之间发生交互， WebView 所承载的页面，通过 JS 与 Native 进行通信，我们将这个通信“桥梁”为 JSBridge 。如果你参与过微信内置浏览器的 H5 开发，会发现一个经常出现的东西，叫做 `WeixinJSBridge`。

**JSBridge**

JSBridge 简单来讲，主要是 **给 JavaScript 提供调用 Native 功能的接口**，让混合开发中的『前端部分』可以方便地使用地址位置、摄像头甚至支付等 Native 功能。

既然是『简单来讲』，那么 JSBridge 的用途肯定不只『调用 Native 功能』这么简单宽泛。实际上，JSBridge 就像其名称中的『Bridge』的意义一样，是 Native 和非 Native 之间的桥梁，它的核心是 **构建 Native 和非 Native 间消息通信的通道**，而且是 **双向通信的通道**。

![图片](https://mmbiz.qpic.cn/mmbiz_png/xsw6Lt5pDCut4YGIN0iaAg1Vm9vaNvVvDsO7sdAicBMYb0roEjEyibYr1pqef8KzHtm3V4RibQichOictdb5ePasYUlQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

所谓 **双向通信的通道**:

- JS 向 Native 发送消息 : 调用相关功能、通知 Native 当前 JS 的相关状态等。
- Native 向 JS 发送消息 : 回溯调用结果、消息推送、通知 JS 当前 Native 的状态等。

JavaScript 是运行在一个单独的 JS Context 中（例如，WebView 的 Webkit 引擎、JSCore）。由于这些 Context 与原生运行环境的天然隔离，我们可以将这种情况与 RPC（Remote Procedure Call，远程过程调用）通信进行类比，将 Native 与 JavaScript 的每次互相调用看做一次 RPC 调用。如此一来我们可以按照通常的 RPC 方式来进行设计和实现。

![图片](https://mmbiz.qpic.cn/mmbiz_png/xsw6Lt5pDCut4YGIN0iaAg1Vm9vaNvVvDaDjYccYh8iawffy1F0Zn7kjM9eTthBMTElTlDro9XNDSZLZCwZuIpiag/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

在 JSBridge 的设计中，可以把前端看做 RPC 的客户端，把 Native 端看做 RPC 的服务器端，从而 JSBridge 要实现的主要逻辑就出现了：**通信调用（Native 与 JS 通信****）** 和 **句柄解析调用**。（如果你是个前端，而且并不熟悉 RPC 的话，你也可以把这个流程类比成 JSONP 的流程。）

通过以上的分析，可以清楚地知晓 JSBridge 主要的功能和职责，接下来，就分析一下在 Android WebView 和 iOS WebView 中实现 Native 与 JS 通信的原理。

#### Android WebView

> `Android 4.4`前：`Android WebView`在低版本 & 高版本采用了不同的`Webkit`版本的内核（正因为如此，H5的很多新特性，在Android版本小于4.4的安卓机上，都不支持）
>
> `Android 4.4`后：原本基于Webkit的WebView开始基于 `Chromium`内核，这一改动大大提升了 `WebView`组件的性能以及对 `HTML5, CSS3, JavaScript`的支持。不过它的API却没有很大的改动，在兼容低版本的同时只引进了少部分新的API，并不需要你做很大的改动。

在 Android WebView，要实现 JS 调用 Java，有 3 种方法：

- `JavascriptInterface`
- `WebViewClient.shouldOverrideUrlLoading()`
- `WebChromeClient.onXXX()`

#### 1、JavascriptInterface

这是 Android 提供的 JS 与 Native 通信的官方解决方案。

首先 Native 端需要实现这么一个类，给 JavaScript 调用。

```
public class WebAppInterface {    @JavascriptInterface    public void showToast(String toast) {        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();    }}
```

然后将这个 `WebAppInterface`类，通过以下代码，添加到 WebView 的 JavaScriptInterface 中。

```
WebView webView = (WebView) findViewById(R.id.webview);webView.addJavascriptInterface(new WebAppInterface(this), "Android"); // 这里的Android会被当做一个变量，注入到页面的window中。
```

接着就可以在 JS 中调用 Native 了。

```
function showAndroidToast(toast) {    Android.showToast(toast);}
```

#### 2、WebViewClient.shouldOverrideUrlLoading()

这个方法的作用是拦截所有 WebView 的 URL Scheme 。

URL Scheme 是一种类似于 url 的链接，是为了方便 app 直接互相调用设计的，形式和普通的 url 近似，主要区别是 protocol 和 host 一般是自定义的。

拦截 URL Scheme 的主要流程是：Web 端通过某种方式（例如 iframe.src/location.href）发送 URL Scheme 请求，之后 Native 拦截到请求并根据 URL Scheme（包括所带的参数）进行相关操作。

页面可以构造一个特殊格式的 URL Scheme 触发，shouldOverrideUrlLoading 拦截 URL 后判断其格式，然后 Native 就能执行自身的逻辑了。

```
public class CustomWebViewClient extends WebViewClient {  @Override  public boolean shouldOverrideUrlLoading(    WebView view,    String url    ) {      if (isJsBridgeUrl(url)) {        // JSbridge的处理逻辑        return true;      }      return super.shouldOverrideUrlLoading(view, url);    }}
```

#### 3、WebChromeClient.onXXX()

通过修改原来浏览器的 `window`某些方法，然后拦截固定规则的参数，然后分发给Java 对应的方法去处理

- alert，可以被 WebView 的 WebChromeClient.onJsAlert() 监听
- confirm，可以被 WebView 的 WebChromeClient.onJsConfirm() 监听
- console.log，可以被 WebView 的 WebChromeClient.onConsoleMessage() 监听
- prompt，可以被 WebView 的 `WebChromeClient.onJsPrompt()`监听

prompt 简单举例说明，Web 页面通过调用 `prompt()`方法，安卓客户端通过监听`WebChromeClient.onJsPrompt()`事件，拦截传入的参数，如果参数符合一定协议规范，那么就解析参数，扔给后续的 Java 去处理。

```
window.prompt(message, value);
```

`WebChromeClient.onJsPrompt()`就会受到回调。`onJsPrompt()`方法的 `message`参数的值正是JS的方法 `window.prompt()`的 `message`的值。

```
public class CustomWebChromeClient extends WebChromeClient {  @Override  public boolean onJsPrompt(    WebView view,    String url,    String message,    String defaultValue,    JsPromptResult result    ) {        // 处理JS 的调用逻辑        result.confirm();        return true;    }}
```

#### Java 调用 JavaScript

Android，在 Kitkat（4.4）只能用 loadUrl 一段 JavaScript 代码。

```
webView.loadUrl("javascript:" + javaScriptString);
```

而 Kitkat 之后的版本，也可以用 `evaluateJavascript` 方法实现：

```
webView.evaluateJavascript(javaScriptString, new ValueCallback<String>() {    @Override    public void onReceiveValue(String value) {      // native代码    }  });
```

#### IOS WebView

> In apps that run in iOS 8 and later, use the WKWebView class instead of using UIWebView. Additionally, consider setting the WKPreferences property javaScriptEnabled to NO if you render files that are not supposed to run JavaScript.

在 IOS8 之前，苹果手机的 WebView 使用的 `UIWebView`，`UIWebView`长期以来存在某些问题：

- 加载速度慢
- 存在内存泄漏
- 内存占用多，内存优化困难
- 如果内存占用过多还可能因为占用过多被系统kill掉

在 WWDC 2014 大会上，IOS8推出了 `WKWebView`，`WKWebView` 是现代 Webkit API 在 iOS 8 和 OS X Yosemite 应用中的核心部分。它代替了 UIKit 中的 `UIWebView` 和 AppKit 中的 `WebView`，提供了统一的跨双平台 API。拥有 60fps 滚动刷新率、内置手势、高效的 app 和 web 信息交换通道、和 Safari 相同的 JavaScript 引擎。

### JavaScript ↔︎ Swift 对话机制

#### 使用用户脚本来注入 JavaScript

`WKUserScript` 允许在正文加载之前或之后注入到页面中。这个强大的功能允许在页面中以安全且唯一的方式操作网页内容。

一个简单的例子如下，用户改变背景的用户脚本被插入到网页中：

```
let source = "document.body.style.background = \"#777;// 注入脚本 在文档加载完成后执行let userScript = WKUserScript()let userScript = WKUserScript(source: source, injectionTime: .AtDocumentEnd, forMainFrameOnly: true)let userContentController = WKUserContentController()userContentController.addUserScript(userScript)
let configuration = WKWebViewConfiguration()configuration.userContentController = userContentControllerself.webView =WKWebView(frame: self.view.bounds, configuration: configuration)
```

 对象可以以 JavaScript 源码形式初始化，初始化时还可以传入是在加载之前还是结束时注入，以及脚本影响的是这个布局还是仅主要布局。于是用户脚本被加入到 `WKUserContentController` 中，并且以 `WKWebViewConfiguration` 属性传入到 `WKWebView` 的初始化过程中。

这个样例可以简单扩展为更为高级的页面修改方法，例如去除广告、隐藏评论等。

#### Message Handlers

利用以下代码，可以跟Native进行通信

```
window.webkit.messageHandlers.{NAME}.postMessage()
```

Handler的name可以通过 `WKScriptMessageHandler` 协议中的 `addScriptMessageHandler()` 接口函数设置：

```
class NotificationScriptMessageHandler: NSObject, WKScriptMessageHandler {  func userContentController(    userContentController: WKUserContentController,    didReceiveScriptMessage message: WKScriptMessage!   ) {     println(message.body)  }}let userContentController = WKUserContentController()let handler = NotificationScriptMessageHandler()userContentController.addScriptMessageHandler(handler, name: "notification")
```

于是当通知进入 app 的时候，比如说在页面中创建一个新对象，相关信息就可以这样传递：

```
window.webkit.messageHandlers.notification.postMessage({body: '发送给Native'});
```

> 添加用户脚本来对 web 事件监听并用 Message Handler 将信息传回 app。

### 总结

通信原理是 JSBridge 实现的核心，实现方式可以各种各样，但是万变不离其宗。这里，推荐的实现方式如下：

- JavaScript 调用 Native 推荐使用 **注入 API** 的方式。（ iOS6 忽略，Android 4.2以下使用 WebViewClient 的 onJsPrompt 方式。）
- Native 调用 JavaScript 则直接执行拼接好的 JavaScript 代码即可。

对于其他方式，诸如 React Native、微信小程序 的通信方式都与上描述的近似，并根据实际情况进行优化。

以 React Native 的 iOS 端举例：JavaScript 运行在 JSCore 中，实际上可以与上面的方式一样，利用注入 API 来实现 JavaScript 调用 Native 功能。不过 React Native 并没有设计成 JavaScript 直接调用 Object-C，而是 **为了与 Native 开发里事件响应机制一致**，设计成 **需要在 Object-C 去调 JavaScript 时才通过返回值触发调用**。原理基本一样，只是实现方式不同。

**如果觉得这篇文章还不错**

 