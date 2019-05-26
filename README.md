# combat-okr
基于 Node.js 小程序 实现 OKR 目标管理工具

###  项目介绍
OKR(Objectives and Key Results)全称为“目标和关键成果”，是企业进行目标管理的一个简单有效的系统，能够将目标管理自上而下贯穿到基层。制定OKR的基本方法是：首先，要设定一个“目标”（Objective），这个目标不必是确切的、可衡量的，例如“我想让我的网站更好”；然后，设定若干可以量化的“关键结果”（Key Results），用来帮助自己实现目标，例如“让网站速度加快30%”或者“融入度提升15%”之类的具体目标。



本项目为 Node.js 构建 Web API，并使用微信小程序构建前台工具。主要考察对微信小程序项目中的应用能力，分成以下两个部分：

1. Node.js API 的运用，结合 Koa2 框架输出应用的 API 接口
2. 微信小程序的基本运用，框架、组件以及 API 的运用能力


### 项目展示


### 项目解读
使用 Node.js 的 Koa2 及 微信小程序完成 OKR 管理工具，对每日代办事情已经指定的目标和成就进行关联。项目主要包含以下几个模块：

1. 欢迎页面（用于获取用户信息进行登录）
2. Todo 页面
3. Todo 列表
4. Todo 绑定 Keyresult 页面
5. 历史完成代办事件
6. OKR 管理
7. OKR 列表
8. OKR 查看
9. OKR 新建
10. OKR 编辑

### 项目拆解

本项目主要分为  12 个任务：

任务一： 环境搭建

主要通过 Koa2 快速搭建 Web 服务框架，配置一个测试的 API ，例如：/api/test 返回 { code : 200 } 即可。

任务二：数据库配置

主要通过原型图和业务需求，获取存储的信息内容，以及其中关系进行数据库的构建和对应表及字段的配置。

任务三：页面模版

主要通过小程序新建页面文件 及配置 app.json 引用每个页面的文件地址。

任务四：页面样式

主要通过配置 app.json 的 pages 页面的顺序完成后台页面的结构与样式。

任务五：用户登录

主要通过小程序 app_key 、app_sercet 来获取用户的 open_id 完成用户信息的记录。

任务六：Todos 代办事项

主要通过 Node.js API 完成相关接口，在小程序中完成 Todes 部分的添加、修改状态以及删除 功能。

任务七：History 完成事项

主要通过  Node.js API 完成相关接口，在小程序中完成历史已完成的 Todes 展示。

任务八：OKR CUD

主要通过  Node.js API 完成相关接口，在小程序中完成 OKR 的新建、列表、编辑、删除功能。

任务九：KR 关联页
主要通过  Node.js API 完成相关接口，在 Todes 页面中完成单项 Todo 与 KR 的绑定的展示、关联、取消关联功能。

任务十：OKR 详情

主要通过  Node.js API 完成相关接口，在小程序中 OKR 完成点击单项目标所展现的 OKR详情。


### 任务详情页


1.1 -环境搭建

Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。

正因为 Koa 没有捆绑任何中间件，所以我们在开发应用的时候一定要注意自己开发，或者找 Koa 对应的中间件，并且还要注意对应的版本。本次任务中我们需要用到 Koa2 来搭建 Web 服务，通过 koa-router 中间件配置一个测试的 API。

任务要求：

1. 使用  Koa2 来搭建 Web 服务。
2. 实现全局响应处理模块，捕捉全局错误并配置返回值。
3. 实现测试 API 返回 Code200


任务提示：

1. 下载安装 koa 、koa-router、koa-bodyparser
2. 新建 middlewares/response ，try 处理响应结果 catch 处理全局错误信息
3. 新建 controllers/test ，返回 Code200，MessageSuccess
4. 把路由的配置分离到单独的 routes 文件夹中，并配置测试 API
5. 路由需要使用 api 前缀


参考资料：

https://koajs.com/


1.2 - 数据库配置

本次任务我们需要配置数据库的及其表设计。在数据库的配置中，我们首要根据业务需求梳理大框架模块，本次 OKR 项目主要是做什么 ，有哪几个重要的板块 ？项目主要为：用户定义 OKR，然后每天添加代办事项，代办事项和 OKR 关联，根据代办事项的完成状态统计出 OKR 的完成度及状态。

任务要求：

配置数据库，生成 sql 文件，放置在更目录的 db 文件夹中


任务提示：

1. 用户信息表 user
2. 目标表 objective
3. 成就表 keyresult
4. 代办事项表 todo
5. 代办事项与成就关联表 todo_keyresult


1.3 - 页面模版

本次任务我们需要为小程序配置页面模版，根据需求梳理出共有多少个页面，在 pages 目录下创建对应页面的文件夹和相关文件，并在 app.json 中配置 pages 以及 tabs。

任务要求：
成一下页面配置：

1. 欢迎页
2. Todo 列表页
3. Todo Keyresult 绑定页
4. Todo 完成历史页
5. OKR 列表页
6. OKR 新建页
7. OKR 编辑页
8. OKR 详情页


任务提示：

"pages/welcome/welcome"
"pages/todo/todo"
"pages/todo_keyresult/todo_keyresult"
"pages/okr/okr"
"pages/okr_edit/okr_edit"
"pages/okr_create/okr_create"
"pages/okr_detail/okr_detail"
"pages/history/history"

1.4 - 页面样式与交互

在上一节中我们配置好了各个页面的模版文件，这次我们需要为其 WXML 文件添加相关的 DOM 结构以及为 WXSS 文件添加 CSS 丰富其展示效果。在本次任务中，我们需要为相关页面添加其结构和样式以及基本交互，大家可以尽情发挥。

任务要求：

1. 欢迎页，为按钮绑定点击时间，点击跳转到 Todo 列表页
2. Todo列表页，输入框确定增加一项 Todo，点击 Todo 触发 ActionSheet 
3. 展示关联、标记、删除选项，点击标记、删除移除该项目。
4. History 历史页展示标记完成的 Todo，点击 Todo 触发展示标记、删除选项，选择后移除该项目。
5. Todo Keyresult 关联页，展示所有 OKR，点击 KR 高亮，再次点击熄灭。
6. OKR 列表页，点击添加按钮跳转到 OKR 新建页面，点击其中项目触发 ActionSheet 
7. 展示查看、编辑、标记、删除等选项。点击查看跳转到 OKR 详情页，点击编辑跳转到 OKR 编辑页面。
8. OKR 新建页面，点击 + 按钮添加多一项 KR ，点击 - 按钮删除该对应 KR 项目。编辑页面同理。
9. OKR 展示页，展示所有 OKR 以及 KR 相关联的 Todo，点击 KR 触发 ActioSheet 展示标记选项。


任务提示：

后台各个页面中涉及到的样式尽可能服用。

1.5 - 用户登录

本次任务我们需要完成微信小程序的登录，在欢迎页面中，检测本地存储是否有用户识别 token，如果有自动跳转到代办页面。如果没有，当用户点击登录按钮时候，调取 wx.login 接口获取 code，发送到服务器的登录 API，登录 API 接受到 code 后向微信服务器发送请求获取用户 open_id 并存进数据库返回 user_id。可以使用加密方法将 user_id 进行加密返回给客户端。在客户端发送请求时，如果已经登录的用户，在请求头 headers 中带上 token 字段。服务器新建一个判断用户的中间件，获取到请求时如果请求头上有 token 字段，对 token 字段进行解密获取到其 user_id ，并写一个测试接口进行测试，成功后返回 user_id 。

任务要求：

1. 完成用户登录 API ：POST  /api/login
2. 完成用户身份中间件。
3. 新建 models 文件夹创建请求文件 request.js 封装 wx.request 接口返回 Promise 格式。
4. 在 models 文件夹中新建 user.js 处理登录信息逻辑。
5. 完成小程序用户登录，登录后把 token 进行本地存储并，跳转到 Todos 代办列表页面。
6. 登录过的小程序用户自动跳转到 Todos 代办列表页面。


任务提示：


参考小程序文档：https://developers.weixin.qq.com/miniprogram/dev/api/wx.login.html
使用 koa-bodyparser 获取
创建中间件 middlewares/users.js ，获取 ctx.headers 中的 token 字段进行解密，解密后返回的用户 id 存放在 ctx.state.user_id 中进行备用。
使用 testAPI 进行测试，登录后请求 testAPI 返回该用户的 id 。


1.6 - Todes 代办事项

在进入页面时候，如果我们没有添加过 Todos ，那么页面中只有一个输入按钮。我们添加 Todos，获取曾经添加但是没有完成的 todo 都将在 Todos 中展示。点击 Todo 的状态可以选择切换该 Todo 的状态为已完成，同时也能删除该 Todo，已完成或被删除的 Todo 将不在 Todos 列表中展示。本次任务，我们一起来完成代办事项的相关操作，我们需要完成相关操作的 API ，以及完成页面逻辑的接入。

任务要求：

1. 获取 Todo 接口，GET： /api/todo
2. 添加 Todo 接口，POST：/api/todo
3. 修改 Todo 接口，PUT： /api/todo/:id
4. 删除 Todo 接口，DELETE：/api/todo/:id
5. 完成 Todo 展示页面
6. 在 Todo 展示页中可以在输入框中新建 Todo
7. 在 Todo 展示页中点击标记，修改 Todo 状态
8. 在 Todo 展示页中点击删除，删除改项目


1.7 - History 完成事项

历史页面主要展示已经被标记完成的代办事件，更具完成时间的顺序进行排序。在本任务中，我们来一起完成历史页面的代办数据展示。

任务要求：

1. 获取展示完成后的 Todo 列表
2. 在 Todo 历史页中点击标记，修改 Todo 状态
3. 在 Todo 历史页中点击删除，删除改项目


任务提示：

通过参数来判断是否完成如，GET：/api/todo?status=1


1.8 - OKR CUD

OKR 包含 O 目标以及 对应的 KR 成就，个 O 可以对应多个 KR。在本任务中，我们来一起完成 OKR 的新建、编辑、删除。

任务要求：
1. 获取 O 接口，GET： /api/objective
2. 新建 OKR 接口，POST：/api/okr
3. 修改 OKR 接口，PUT：/api/okr/:id
4. 删除 OKR 接口，DELETE: /api/okr/:id
5. 删除 KR 接口，DELETE：/api/keyresult/:id
6. 在 OKR 新建页面中可新建 OKR。
7. 在  OKR 编辑页面中可编辑 OKR。
8. 在 OKR 列表页面中展示所有状态 OKR。
9. 在 OKR 列表页面中点击可标记切换 OKR 状态。
10. 在 OKR 列表页面中可点击删除 OKR。
11. 在 OKR 编辑页面中可点击删除 KR


任务提示：

1. 新建 OKR 接口中，我们首先对 O 表进行添加一条记录返回 objective_id 再和 KR 数据一起添加到 KR 表中。
2. 编辑 OKR 页面，当点击 - 号附后调用删除 KR 的接口
3. 编辑 OKR 接口中，如果接受 keyresults 项目没有 id 则为新建需要为期创建新 kr ，否则则修改该 id 上的 kr


1.9 - Todo 关联 KR

OKR 项目管理工具的比较核心的点就是 Todo 和 KR 的关联，你每天做的事情是为了哪个 OKR 而做的，确保出这件事情的价值位置。我们在 OKR 中添加了多个 O ，一个 O 又对应多个 KR 。在 Todo 的关联是一对多的关联，就是一件事情可以关联一个甚至多个不同 O 下面的 KR。我们在 Todo 页面中获取到当前所有未完成的 OKR，当点击某个 Todo 时候，弹出OKR内容遮罩层进行对 KR 的选择，选中确认后对其进行关联。在本次任务中，我们一起来完成 Todo 和 OKR 的管理吧 ～

任务要求：

1. Todo 与 KR 关联添加接口 POST：/api/todo/:id/keyresult
2. Todo 与 KR 关联删除接口 DELETE: /api/todo/:id/keyresult
3. 所有 OKR 展示接口，GET：/api/okr
4. 点击关联弹出所有未完成的 OKR 列表，点击关联高亮，再次点击取消关联取消高亮。


任务提示：

所有 OKR 接口中，O 包含 KR ，如果该 KR 被该 Todo 关联过，则其 active 熟悉为 true
根据 KR 的 active 属性对添加、删除关联的 API 进行切换运用

1.10 - OKR 详情


在OKR 列表页面中，点击单条 OKR 跳转到 OKR 详情页面，在 OKR 详情页面中需要展示当前 目标信息，已经与该目标关联的成就。最后我们还要把和成就绑定的 todo 进行显示。在本次任务中，我们一起来完成 OKR 的详情页。

任务要求：

1. OKR 详情接口，GET：/api/okr/:id
2. KR 编辑接口，PUT：/api/keyresult/:id
3. 展示 O 相关的 KR ，并在 KR 中展示相关的 Todo


任务提示：

查询该 O 目标下所关联的所有 KR的 ID，接着那这些 ID 去 todo-keysult 关联表中关联查询所绑定的 todo。然后把目标数据、成就数据、代办数据进行整合性输出。

启动：

    cd koaSever
    nodemon app.js

