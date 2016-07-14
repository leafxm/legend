# 生成图例项

示例：[http://leafxm.com/legend/](http://leafxm.com/legend/)

使用方法：

1. 引入legend.js文件
2. 使用new Legend(target,content,options,customClass);


参数意义：

1. target是生成的legend元素的父元素
2. content: 要添加的内容对象，属性包括color和level数组，level应比color多一项最后一个是单位，表示每个图例形状的颜色和对应的解释
3. options:选项对象，包括属性fontSize(确定形状大小），shape('square','circle','triangle'三种选项），arrange（'horizontal'和'vertical'两种选项）
