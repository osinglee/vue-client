<h2 id="t4">4. CSS 功能拓展 (CSS Extensions)</h2>

<h3 id="t4-1">4.1. 嵌套规则 (Nested Rules)</h3>

Sass 允许将一套 CSS 样式嵌套进另一套样式中，内层的样式将它外层的选择器作为父选择器，例如：

```scss
#main p {
  color: #00ff00;
  width: 97%;

  .redbox {
    background-color: #ff0000;
    color: #000000;
  }
}
```

编译为

```css
#main p {
  color: #00ff00;
  width: 97%; }
  #main p .redbox {
    background-color: #ff0000;
    color: #000000; }
```

嵌套功能避免了重复输入父选择器，而且令复杂的 CSS 结构更易于管理：

```scss
#main {
  width: 97%;

  p, div {
    font-size: 2em;
    a { font-weight: bold; }
  }

  pre { font-size: 3em; }
}
```

编译为

```css
#main {
  width: 97%; }
  #main p, #main div {
    font-size: 2em; }
    #main p a, #main div a {
      font-weight: bold; }
  #main pre {
    font-size: 3em; }
```

<h3 id="t4-2">4.2. 父选择器 `&` (Referencing Parent Selectors: `&`)</h3>

在嵌套 CSS 规则时，有时也需要直接使用嵌套外层的父选择器，例如，当给某个元素设定 `hover` 样式时，或者当 `body` 元素有某个 classname 时，可以用 `&` 代表嵌套规则外层的父选择器。

```scss
a {
  font-weight: bold;
  text-decoration: none;
  &:hover { text-decoration: underline; }
  body.firefox & { font-weight: normal; }
}
```

编译为

```css
a {
  font-weight: bold;
  text-decoration: none; }
  a:hover {
    text-decoration: underline; }
  body.firefox a {
    font-weight: normal; }
```

编译后的 CSS 文件中 `&` 将被替换成嵌套外层的父选择器，如果含有多层嵌套，最外层的父选择器会一层一层向下传递：

```scss
#main {
  color: black;
  a {
    font-weight: bold;
    &:hover { color: red; }
  }
}
```

编译为

```css
#main {
  color: black; }
  #main a {
    font-weight: bold; }
    #main a:hover {
      color: red; }
```

`&` 必须作为选择器的第一个字符，其后可以跟随后缀生成复合的选择器，例如

```scss
#main {
  color: black;
  &-sidebar { border: 1px solid; }
}
```

编译为

```css
#main {
  color: black; }
  #main-sidebar {
    border: 1px solid; }
```

当父选择器含有不合适的后缀时，Sass 将会报错。

<h3 id="t4-3">4.3. 属性嵌套 (Nested Properties)</h3>

有些 CSS 属性遵循相同的命名空间 (namespace)，比如 `font-family, font-size, font-weight` 都以 `font` 作为属性的命名空间。为了便于管理这样的属性，同时也为了避免了重复输入，Sass 允许将属性嵌套在命名空间中，例如：

```scss
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}
```

编译为

```css
.funky {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold; }
```

命名空间也可以包含自己的属性值，例如：

```scss
.funky {
  font: 20px/24px {
    family: fantasy;
    weight: bold;
  }
}
```

编译为

```css
.funky {
  font: 20px/24px;
    font-family: fantasy;
    font-weight: bold; }
```

<h3 id="t4-4">4.4. 占位符选择器 `%foo` (Placeholder Selectors: `%foo`)</h3>

Sass 额外提供了一种特殊类型的选择器：占位符选择器 (placeholder selector)。与常用的 id 与 class 选择器写法相似，只是 `#` 或 `.` 替换成了 `%`。必须通过 [@extend](#t7-3) 指令调用，更多介绍请查阅 [@extend-Only Selectors](#t7-3-6)。

当占位符选择器单独使用时（未通过 `@extend` 调用），不会编译到 CSS 文件中。

<h2 id="t6">6. SassScript</h2>

在 CSS 属性的基础上 Sass 提供了一些名为 SassScript 的新功能。 SassScript 可作用于任何属性，允许属性使用变量、算数运算等额外功能。

通过 interpolation，SassScript 甚至可以生成选择器或属性名，这一点对编写 mixin 有很大帮助。

<h3 id="t6-1">6.1. Interactive Shell</h3>

Interactive Shell 可以在命令行中测试 SassScript 的功能。在命令行中输入 `sass -i`，然后输入想要测试的 SassScript 查看输出结果：

```
$ sass -i
>> "Hello, Sassy World!"
"Hello, Sassy World!"
>> 1px + 1px + 1px
3px
>> #777 + #777
#eeeeee
>> #777 + #888
white
```

<h3 id="t6-2">6.2. 变量 `$` (Variables: `$`)</h3>

SassScript 最普遍的用法就是变量，变量以美元符号开头，赋值方法与 CSS 属性的写法一样：

```scss
$width: 5em;
```

直接使用即调用变量：

```css
#main {
  width: $width;
}
```

变量支持块级作用域，嵌套规则内定义的变量只能在嵌套规则内使用（局部变量），不在嵌套规则内定义的变量则可在任何地方使用（全局变量）。将局部变量转换为全局变量可以添加 `!global` 声明：

```scss
#main {
  $width: 5em !global;
  width: $width;
}

#sidebar {
  width: $width;
}
```

编译为

```css
#main {
  width: 5em;
}

#sidebar {
  width: 5em;
}
```

<h3 id="t6-3">6.3. 数据类型 (Data Types)</h3>

SassScript 支持 6 种主要的数据类型：

- 数字，`1, 2, 13, 10px`
- 字符串，有引号字符串与无引号字符串，`"foo", 'bar', baz`
- 颜色，`blue, #04a3f9, rgba(255,0,0,0.5)`
- 布尔型，`true, false`
- 空值，`null`
- 数组 (list)，用空格或逗号作分隔符，`1.5em 1em 0 2em, Helvetica, Arial, sans-serif`
- maps, 相当于 JavaScript 的 object，`(key1: value1, key2: value2)`

SassScript 也支持其他 CSS 属性值，比如 Unicode 字符集，或 `!important` 声明。然而Sass 不会特殊对待这些属性值，一律视为无引号字符串。

<h4 id="t6-3-1">6.3.1. 字符串 (Strings)</h4>

SassScript 支持 CSS 的两种字符串类型：有引号字符串 (quoted strings)，如 `"Lucida Grande"` `'http://sass-lang.com'`；与无引号字符串 (unquoted strings)，如 `sans-serif` `bold`，在编译 CSS 文件时不会改变其类型。只有一种情况例外，使用 `#{}` (interpolation) 时，有引号字符串将被编译为无引号字符串，这样便于在 mixin 中引用选择器名：

```scss
@mixin firefox-message($selector) {
  body.firefox #{$selector}:before {
    content: "Hi, Firefox users!";
  }
}
@include firefox-message(".header");
```

编译为

```css
body.firefox .header:before {
  content: "Hi, Firefox users!"; }
```

<h4 id="t6-3-2">6.3.2. 数组 (Lists)</h4>

数组 (lists) 指 Sass 如何处理 CSS 中 `margin: 10px 15px 0 0` 或者 `font-face: Helvetica, Arial, sans-serif` 这样通过空格或者逗号分隔的一系列的值。事实上，独立的值也被视为数组 —— 只包含一个值的数组。

数组本身没有太多功能，但 [Sass list functions](http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html#list-functions) 赋予了数组更多新功能：`nth` 函数可以直接访问数组中的某一项；`join` 函数可以将多个数组连接在一起；`append` 函数可以在数组中添加新值；而 `@each` 指令能够遍历数组中的每一项。

数组中可以包含子数组，比如 `1px 2px, 5px 6px` 是包含 `1px 2px` 与 `5px 6px` 两个数组的数组。如果内外两层数组使用相同的分隔方式，需要用圆括号包裹内层，所以也可以写成 `(1px 2px) (5px 6px)`。变化是，之前的 `1px 2px, 5px 6px` 使用逗号分割了两个子数组 (comma-separated)，而 `(1px 2px) (5px 6px)` 则使用空格分割(space-separated)。

当数组被编译为 CSS 时，Sass 不会添加任何圆括号（CSS 中没有这种写法），所以 `(1px 2px) (5px 6px)` 与 `1px 2px, 5px 6px` 在编译后的 CSS 文件中是完全一样的，但是它们在 Sass 文件中却有不同的意义，前者是包含两个数组的数组，而后者是包含四个值的数组。

用 `()` 表示不包含任何值的空数组（在 Sass 3.3 版之后也视为空的 map）。空数组不可以直接编译成 CSS，比如编译 `font-family: ()` Sass 将会报错。如果数组中包含空数组或空值，编译时将被清除，比如 `1px 2px () 3px` 或 `1px 2px null 3px`。

基于逗号分隔的数组允许保留结尾的逗号，这样做的意义是强调数组的结构关系，尤其是需要声明只包含单个值的数组时。例如 `(1,)` 表示只包含 `1` 的数组，而 `(1 2 3,)` 表示包含 `1 2 3` 这个以空格分隔的数组的数组。

<h4 id="t6-3-3">6.3.3. Maps</h3>

Maps represent an association between keys and values, where keys are used to look up values. They make it easy to collect values into named groups and access those groups dynamically. They have no direct parallel in CSS, although they’re syntactically similar to media query expressions:

```scss
$map: (key1: value1, key2: value2, key3: value3);
```

Unlike lists, maps must always be surrounded by parentheses and must always be comma-separated. Both the keys and values in maps can be any SassScript object. A map may only have one value associated with a given key (although that value may be a list). A given value may be associated with many keys, though.

Like lists, maps are mostly manipulated using SassScript functions. The map-get function looks up values in a map and the map-merge function adds values to a map. The @each directive can be used to add styles for each key/value pair in a map. The order of pairs in a map is always the same as when the map was created.

Maps can also be used anywhere lists can. When used by a list function, a map is treated as a list of pairs. For example, (key1: value1, key2: value2) would be treated as the nested list key1 value1, key2 value2 by list functions. Lists cannot be treated as maps, though, with the exception of the empty list. () represents both a map with no key/value pairs and a list with no elements.

Note that map keys can be any Sass data type (even another map) and the syntax for declaring a map allows arbitrary SassScript expressions that will be evaluated to determine the key.

Maps cannot be converted to plain CSS. Using one as the value of a variable or an argument to a CSS function will cause an error. Use the inspect($value) function to produce an output string useful for debugging maps.

<h4 id="t6-3-4">6.3.4. 颜色 (Colors)</h3>

Any CSS color expression returns a SassScript Color value. This includes a large number of named colors which are indistinguishable from unquoted strings.

In compressed output mode, Sass will output the smallest CSS representation of a color. For example, #FF0000 will output as red in compressed mode, but blanchedalmond will output as #FFEBCD.

A common issue users encounter with named colors is that since Sass prefers the same output format as was typed in other output modes, a color interpolated into a selector becomes invalid syntax when compressed. To avoid this, always quote named colors if they are meant to be used in the construction of a selector.

<h3 id="t6-4">6.4. 运算 (Operations)</h3>

所有数据类型均支持相等运算 `==` 或 `!=`，此外，每种数据类型也有其各自支持的运算方式。

<h4 id="t6-4-1">6.4.1. 数字运算 (Number Operations)</h4>

SassScript 支持数字的加减乘除、取整等运算 (`+, -, *, /, %`)，如果必要会在不同单位间转换值。

```scss
p {
  width: 1in + 8pt;
}
```

编译为

```css
p {
  width: 1.111in; }
```

关系运算 `<, >, <=, >=` 也可用于数字运算，相等运算 `==, !=` 可用于所有数据类型。

<h5 id="t6-4-1-1">6.4.1.1. 除法运算 `/` (Division and `/`)</h5>

`/` 在 CSS 中通常起到分隔数字的用途，SassScript 作为 CSS 语言的拓展当然也支持这个功能，同时也赋予了 `/` 除法运算的功能。也就是说，如果 `/` 在 SassScript 中把两个数字分隔，编译后的 CSS 文件中也是同样的作用。

以下三种情况 `/` 将被视为除法运算符号：

* 如果值，或值的一部分，是变量或者函数的返回值
* 如果值被圆括号包裹
* 如果值是算数表达式的一部分

```scss
p {
  font: 10px/8px;             // Plain CSS, no division
  $width: 1000px;
  width: $width/2;            // Uses a variable, does division
  width: round(1.5)/2;        // Uses a function, does division
  height: (500px/2);          // Uses parentheses, does division
  margin-left: 5px + 8px/2px; // Uses +, does division
}
```

编译为

```css
p {
  font: 10px/8px;
  width: 500px;
  height: 250px;
  margin-left: 9px; }
```

如果需要使用变量，同时又要确保 `/` 不做除法运算而是完整地编译到 CSS 文件中，只需要用 `#{}` 插值语句将变量包裹。

```scss
p {
  $font-size: 12px;
  $line-height: 30px;
  font: #{$font-size}/#{$line-height};
}
```

编译为

```css
p {
  font: 12px/30px; }
```

<h4 id="t6-4-2">6.4.2. 颜色值运算 (Color Operations)</h4>

颜色值的运算是分段计算进行的，也就是分别计算红色，绿色，以及蓝色的值：

```scss
p {
  color: #010203 + #040506;
}
```

计算 `01 + 04 = 05` `02 + 05 = 07` `03 + 06 = 09`，然后编译为

```css
p {
  color: #050709; }
```

使用 [color functions](http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html) 比计算颜色值更方便一些。

数字与颜色值之间也可以进行算数运算，同样也是分段计算的，比如

```scss
p {
  color: #010203 * 2;
}
```

计算 `01 * 2 = 02` `02 * 2 = 04` `03 * 2 = 06`，然后编译为

```css
p {
  color: #020406; }
```

需要注意的是，如果颜色值包含 alpha channel（rgba 或 hsla 两种颜色值），必须拥有相等的 alpha 值才能进行运算，因为算术运算不会作用于 alpha 值。

```scss
p {
  color: rgba(255, 0, 0, 0.75) + rgba(0, 255, 0, 0.75);
}
```

编译为

```css
p {
  color: rgba(255, 255, 0, 0.75); }
```

颜色值的 alpha channel 可以通过 [opacify](http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html#opacify-instance_method) 或 [transparentize](http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html#transparentize-instance_method) 两个函数进行调整。

```scss
$translucent-red: rgba(255, 0, 0, 0.5);
p {
  color: opacify($translucent-red, 0.3);
  background-color: transparentize($translucent-red, 0.25);
}
```

编译为

```css
p {
  color: rgba(255, 0, 0, 0.8);
  background-color: rgba(255, 0, 0, 0.25); }
```

IE 滤镜要求所有的颜色值包含 alpha 层，而且格式必须固定 `#AABBCCDD`，使用 `ie_hex_str` 函数可以很容易地将颜色转化为 IE 滤镜要求的格式。

```scss
$translucent-red: rgba(255, 0, 0, 0.5);
$green: #00ff00;
div {
  filter: progid:DXImageTransform.Microsoft.gradient(enabled='false', startColorstr='#{ie-hex-str($green)}', endColorstr='#{ie-hex-str($translucent-red)}');
}
```

编译为

```css
div {
  filter: progid:DXImageTransform.Microsoft.gradient(enabled='false', startColorstr=#FF00FF00, endColorstr=#80FF0000);
}
```

<h4 id="t6-4-3">6.4.3. 字符串运算 (String Operations)</h4>

`+` 可用于连接字符串

```scss
p {
  cursor: e + -resize;
}
```

编译为

```css
p {
  cursor: e-resize; }
```

注意，如果有引号字符串（位于 `+` 左侧）连接无引号字符串，运算结果是有引号的，相反，无引号字符串（位于 `+` 左侧）连接有引号字符串，运算结果则没有引号。

```scss
p:before {
  content: "Foo " + Bar;
  font-family: sans- + "serif";
}
```

编译为

```css
p:before {
  content: "Foo Bar";
  font-family: sans-serif; }
```

运算表达式与其他值连用时，用空格做连接符：

```scss
p {
  margin: 3px + 4px auto;
}
```

编译为

```css
p {
  margin: 7px auto; }
```

在有引号的文本字符串中使用 `#{}` 插值语句可以添加动态的值：

```scss
p:before {
  content: "I ate #{5 + 10} pies!";
}
```

编译为

```css
p:before {
  content: "I ate 15 pies!"; }
```

空的值被视作插入了空字符串：

```scss
$value: null;
p:before {
  content: "I ate #{$value} pies!";
}
```

编译为

```css
p:before {
  content: "I ate pies!"; }
```

<h4 id="t6-4-4">6.4.4. 布尔运算 (Boolean Operations)</h4>

SassScript 支持布尔型的 `and` `or` 以及 `not` 运算。

<h4 id="t6-4-5">6.4.5. 数组运算 (List Operations)</h4>

数组不支持任何运算方式，只能使用 [list functions](http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html#list-functions) 控制。

<h3 id="t6-5">6.5. 圆括号 (Parentheses)</h3>

圆括号可以用来影响运算的顺序：

```scss
p {
  width: 1em + (2em * 3);
}
```

编译为

```css
p {
  width: 7em; }
```

<h3 id="t6-6">6.6. 函数 (Functions)</h3>

SassScript 定义了多种函数，有些甚至可以通过普通的 CSS 语句调用：

```scss
p {
  color: hsl(0, 100%, 50%);
}
```

编译为

```css
p {
  color: #ff0000; }
```

<h4 id="t6-6-1">6.6.1. 关键词参数 (Keyword Arguments)</h4>

Sass 函数允许使用关键词参数 (keyword arguments)，上面的例子也可以写成：

```scss
p {
  color: hsl($hue: 0, $saturation: 100%, $lightness: 50%);
}
```

虽然不够简明，但是阅读起来会更方便。关键词参数给函数提供了更灵活的接口，以及容易调用的参数。关键词参数可以打乱顺序使用，如果使用默认值也可以省缺，另外，参数名被视为变量名，下划线、短横线可以互换使用。

通过 [Sass::Script::Functions](http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html) 查看完整的 Sass 函数列表，参数名，以及如何自定义函数。

<h3 id="t6-7">6.7. 插值语句 `#{}` (Interpolation: `#{}`)</h3>

通过 `#{}` 插值语句可以在选择器或属性名中使用变量：

```scss
$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: blue;
}
```

编译为

```css
p.foo {
  border-color: blue; }
```

`#{}` 插值语句也可以在属性值中插入 SassScript，大多数情况下，这样可能还不如使用变量方便，但是使用 `#{}` 可以避免 Sass 运行运算表达式，直接编译 CSS。

```scss
p {
  $font-size: 12px;
  $line-height: 30px;
  font: #{$font-size}/#{$line-height};
}
```

编译为

```css
p {
  font: 12px/30px; }
```

<h3 id="t6-8">6.8. `&` in SassScript</h3>

Just like when it’s used in selectors, & in SassScript refers to the current parent selector. It’s a comma-separated list of space-separated lists. For example:

```scss
.foo.bar .baz.bang, .bip.qux {
  $selector: &;
}
```

The value of $selector is now ((".foo.bar" ".baz.bang"), ".bip.qux"). The compound selectors are quoted here to indicate that they’re strings, but in reality they would be unquoted. Even if the parent selector doesn’t contain a comma or a space, & will always have two levels of nesting, so it can be accessed consistently.

If there is no parent selector, the value of & will be null. This means you can use it in a mixin to detect whether a parent selector exists:

```scss
@mixin does-parent-exist {
  @if & {
    &:hover {
      color: red;
    }
  } @else {
    a {
      color: red;
    }
  }
}
```

<h3 id="t6-9">6.9. 变量定义 `!default` (Variable Defaults: `!default`)</h3>

可以在变量的结尾添加 `!default` 给一个未通过 `!default` 声明赋值的变量赋值，此时，如果变量已经被赋值，不会再被重新赋值，但是如果变量还没有被赋值，则会被赋予新的值。

```scss
$content: "First content";
$content: "Second content?" !default;
$new_content: "First time reference" !default;

#main {
  content: $content;
  new-content: $new_content;
}
```

编译为

```css
#main {
  content: "First content";
  new-content: "First time reference"; }
```

变量是 null 空值时将视为未被 `!default` 赋值。

```scss
$content: null;
$content: "Non-null content" !default;

#main {
  content: $content;
}
```

编译为

```css
#main {
  content: "Non-null content"; }
```
