// node 服务处理加载各种资源请求
// index.html
// js
// vue


const Koa = require('koa')
console.log("koa ==", Koa );
// 创建实例
const app = new Koa()
const fs = require("fs")
const path = require('path')

// 使用 compile
const compileSFC = require('@vue/compiler-sfc')

const compileDOM = require('@vue/compiler-dom')

// 中间件配置
// 处理路由
app.use(async ctx => {
    const { url, query } = ctx.request;
    console.log("url =", url);
    if (url == '/') {
        // 加载index.html
        ctx.type = "text/html"
        ctx.body = fs.readFileSync(path.join(__dirname, './index.html'), 'utf8')
        // ctx.body = fs.readFileSync("./index.html", 'utf8')  
    } else if(url.endsWith(".js")) {
        const p = path.join(__dirname, url)
        ctx.type = "application/javascript"
        ctx.body = reweiteImport(fs.readFileSync(p, 'utf8'))
    } else if(url.startsWith('/@modules/')) {
        // 裸模块名称
        const modulesName = url.replace('/@modules/', '')
        // 在 node_modules目录中 找
        const prefix = path.join(__dirname, '../node_modules', modulesName)
        console.log("prefix ==", prefix);
        // 从package json 中 获取 module 字段
        const module = require(prefix + '/package.json').module
        const filePath = path.join(prefix, module)
        console.log("filePath ==", filePath);
        // 读取 文件
        const ret = fs.readFileSync(filePath, 'utf8')
        ctx.type = "application/javascript"
        ctx.body = reweiteImport(ret)


    }
    else if(url.indexOf('.vue') > -1) {
        // 获取加载问价 
        // SFC 请求 single file component
        // 读取Vue 文件 ，解析为js
        const p = path.join(__dirname, url.split('?')[0])

        const ast = compileSFC.parse(fs.readFileSync(p, 'utf8'))


        // 如果 query 没有 type 那么 他就是 sfc
        if(!query.type) {
            
            console.log("ast ==", ast);
            // 获取脚本部分的内容
    
            const scriptContent = ast.descriptor.script.content
            // 替换默认的导出为 一个常量  方便后续修改
            const script = scriptContent.replace("export default ", 'const __script = ')
            console.log(script);
            ctx.type = 'application/javascript'
            ctx.body = `
                ${reweiteImport(script)}
                //解析 template  vite 会把 对 template 的解析变成一次新的请求，单独解析
                import { render as  __render } from '${url}?type=template'
                export default __script
                `


        } else if(query.type === 'template'){
            const tpl = ast.descriptor.template.content
            // 编译 为 render
            const render = compileDOM.compile(tpl, {mode: 'module'}).code
            console.log("render ==", render);
            ctx.type = "application/javascript"
            ctx.body = reweiteImport(render)
        }
     

    }

})


// 裸模块地址重写
// import xx form 'vue'
// import xx form '/@modules/vue
function reweiteImport(content) {
    return content.replace(/ from ['"](.*)['"]/g, function (s1, s2) {
        if(s2.startsWith('./') || s2.startsWith('/') || s2.startsWith('../')){
            return s1
        } else {
            // 裸模块
            return ` from '/@modules/${s2}'`
        }
    })
}

app.listen(3333, () => {
    console.log("server startUp 1");
})