前端自动化构建工具

需求：
    1. 简单创建创建工程
        执行命令： fam create project
        功能概述： 在相应的文件夹下面创建一个工程，工程文件夹统一命名为"www"，目的是为了与cordova 结合
    2. 添加模块
        执行命令： fam addmodule <moduleNameList>
        功能概述： 在相应的项目下新增一些模块
    3. 添加服务
        执行命令： fam
        功能概述： 在相应工程的相应模块下新增一些服务
    4. 添加页面
        执行命令： fam addpage <moduleName> <pageNameList>
        功能模块： 在相应工程的相应模块下添加一些页面
    5. 移除页面
        执行命令： fam removepage <moduleName> <pageNameList>
        模块功能： 将工程中相应模块下的相应页面移除
    6. 移除模块
        执行命令： fam
        模块功能： 将工程中相应的模块移除
    7. 使用JSON创建工程
        执行命令： fam createProject
        模块功能： 根据json文件的描述创建相应的工程
    8. 编辑页面
        执行命令： fam editpage <moduleName> <pageName>
        模块功能： 根据原先页面中的内容对页面进行进一步的改造
    9. html5模式互转
        执行命令： fam h5model <html5|original>
        模块功能： 将工程的html5模式与原始模式互转
功能需求：
    说明：本项目所有需要的函数均位于famFunction目录下
    1. 获取控制台输入信息以及当前操作目录
       [状态]     已实现
       [参考文件] argv.js
    2. 模块以及自定义cmd命令创建流程
       [状态]     已了解
       [参考项目] filesearch
       [流程]
            1. 创建项目
            在项目目录下执行npm init生成一个package.json文件来初始化项目。有必要的话，可以根据提示输入你想要的内容，你也可以一直敲Enter键来得到一个package.json文件。
            2. 配置package.json
            3. 实现功能
            4. 安装模块：在项目下执行npm link命令
    3. 重命名文件
       [状态] 已实现
       [参考文件] fileRename.js
    4. 创建目录
       [状态] 已实现
       [参考文件] createForlder.js
    5. 读取文件内容
       [状态] 已实现
       [参考文件] readFile.js
    6. 写入文件内容
       [状态] 已实现
       [参考文件] writeFile.js
    7. 修改内容
       [状态] 已实现
       [参考文件] modifyContent.js
    8. 复制文件
       [状态] 已实现
       [参考文件] copyFile.js
    9. cmd控制台信息显示与刷新
       [状态] 未实现
       [参考文件]
    10. 逐行读取代码
        [状态] 已实现
        [参考文件] readline.js
    11. 向字符串中插入参数
        [状态] 已实现
        [参考文件] insertParam.js
    12. 遍历当前文件夹中所有文件
        [状态] 已实现
        [参考文件] traversal.js
    13. 删除文件
        [状态] 已实现
        [参考文件] unlink.js
    注：等这些单元编写完毕，要将他们整合到一个大的文件里面
API集合：
    common.js
    [接口]：
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    