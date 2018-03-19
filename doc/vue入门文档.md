VUEJS

### 结构介绍，生命周期，动态赋值，列表渲染
```html
<div id="app">
    <button @click="add">按钮</button>
    <button @click="change">改变</button>
   <ol id="list">
        <li v-for="item in arr">{{item.text}}</li>
   </ol>
   <p>{{msg}}</p>
   <p>{{arr}}</p>
   <p>{{json}}</p>
</div>    
```
```vue
new Vue({
    el:"#app",
    data:{
        msg:"Hello",
        arr:[{
            text:"大前端"
        },{
            text:"Java"
        },{
            text:"安卓"
        }],
        json:{a:"appple",b:"banana"}
    },
    created:function(){
            setTimeout(() => {
                console.log("延迟下");
                this.msg = "Hello";
            },2000);
            console.log(document.getElementById("app").innerHTML);
            console.log("created");
    },
    methods:{
        add:function(){
            // 原生写法
            // document.getElementById("list").innerHTML += "<li>1</li>"
            this.arr.push({text: Math.random()});
            this.change();
        },
        change:function(){
            this.arr[1].text = "前端部门";
        }
    },
    watch:{
            a:function(val, oldVal){
                console.log('new: ',val,' old:', oldVal)
            }
    },
    beforeCreate:function(){
        debugger
        console.log("before");
    },
    mounted:function(){
        console.log("计算属性");
    }
});
```
 - el: 跟节点
 - data: vue会对这个data里面所有初始化的对象进行监听，当发生变化 vue会自动渲染所有应用到的模板
 - created: 实例创建完成后被立即调用，注意和渲染是两回事
 - methods：定义组件手动触发方法
 - watch: 监听数据，当数据有变化的时候触发
 - beforeCreate: 创建之前调用
 - mounted: 计算属性
 - @click | v-bind:click： 为节点绑定事件
 - `<li v-for="item in arr">{{item.text}}</li>`: for循环li标签，arr为数据源，item为列表里等每一项
 
### 输入事件
 ```html
    <div id="app">
        <div><input type="text" @keydown="show()"/></div>
        <div><input type="text" @keydown="showCode($event)"/></div>
        <div><input type="text" @keydown.13="showEnter()"/></div>
        <div><input type="text" @keydown.enter="showEnter()"/></div>
    </div>
```
```vue
        new Vue({
            el: "#app",
            data: {

            },
            methods: {
                show: function () {
                   console.log("哈哈");
                },
                showCode:function(ev){
                    if(ev.keyCode==13){
                        console.log("您按回车了");
                    }
                    console.log(ev.keyCode);
                    
                },
                showEnter:function(){
                    alert("您按回车了");
                }
            }
        });
```
- @keydown: 为节点绑定键盘按下事件，@keydown.13和@keydown.enter 是evnet.watch===13的简写。相同的@keydown.left==='按下鼠标左键'，@keydown.right==='按下鼠标右键'
- @dblclick: 双击
- @contextmenu: 右键
- @keydown：按下事件
    - ev.preventDefault() 取消默认行为
    - ev.preventDefault = true
    - ev.prevent：取消默认行为
    - ev.stop：取消事件冒泡
    - ev.cancelBubble=true

### 动态控制style写法
```html
<div id="app">
   <p :title="msg" :style="{color:'red'}">文字。。。。。。</p>
   <p :title="msg" :style="[obj,bg]">文字。。。。。。</p>
   <p :title="msg" :style="more">文字。。。。。。</p>
</div>   
```
```vue
new Vue({
    el:"#app",
    data:{
        msg:"信息",
        obj:{color:'red'},
        bg:{background:"blue"},
        more:{
            color:"red",
            background:"gray"
        }
    }
});
```
- style: 可接收对象，数组写法。注意千万别省略了style前面的`:`号

###自定义指令
```vue
    <div id="app">
        <strong v-red>红色文字</strong>
        <strong v-red>红色文字2</strong>
        <strong v-red>红色文字3</strong>
        <input v-focus>
    </div>
```
```vue
        Vue.directive("red", function (el, tags) {
            el.style.color = "red";
            el.style.background = "green";
        });
        Vue.directive('focus', {
          inserted: function (el) {
            el.focus()
          }
        })
```
- directive：注册指令入口。本例展示了全局注册指令的方式，只要节点绑定了对应的指令，就会执行指令的方法

```vue
    new Vue({
        el: "#app",
        data: {},
        directives: {
            focus: {
                inserted: function (el,binding,vnode,oldVnode) {
                  el.focus();
                }
            }
        }
    });
```
- directive：注册指令入口。本例属于局部注册，只能在当前实例当中注册
    - focus：指令名称
        - inserted：指令方法

###组件
```vue
<div id="app">
    <p>父级：{{str}}</p>
    <child-com :msg="str"></child-com>
    <child-com :msg="number"></child-com>
</div>
<template id="child">
    <div>
        <p>我是子组件对象</p>
        <input type="button" value="按钮" @click="change()"/>
        <strong>{{msg}}</strong>
    </div>
</template>
```
```vue
new Vue({
    el:"#app",
    data:{
        str:"我是父组件对象"
    },
    components:{
        "child-com":{
            template:"#child",
            props:['msg'],
            methods:{
                change(){
                    this.msg = "子对象里面的内容被改变了"
                }
            }
        }
    }
})
```
- 将公共需要复用的模块抽离出来，作为一个公共模块，供各个组件/对象调用
- components: 定义子组件。
    - template：子组件模板
    - props：父组件传入的值，
    - methods: 子组件执行的方法






