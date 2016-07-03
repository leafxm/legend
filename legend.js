  var Legend = (function(){
    function Legend(target,content,options,customClass) {
      //初始化要用的参数
      if(target.nodeType){
         this.target = target;
       }else{
        alert("未输入正确的目标元素，默认添加到body")
        this.target = document.getElementsByTagName('body')[0];
       }
      this.content = content;
      this.options = options;
      this.customClass = customClass;
      var id = parseInt(Math.random()*1000)
      while(this.idObj[id]==true){
        id = parseInt(Math.random()*1000);
      }
      this.idObj[id] = true;
      this.divClass = "dia"+id;
      //初始化
      this.init();
    }
    Legend.prototype.init = function() {
      this.initStyle(); //初始化样式表
      this.initDom(); //初始化DOM结构     
    }
    Legend.prototype.idObj = {};
    Legend.prototype.initDom = function(){
      var target = this.target,
          level = this.content.level,
          color = this.content.color,
          divClass = this.divClass,
          fra = document.createDocumentFragment();
      for(var i = 0,len=color.length;i<len;i++){    
        var dia = document.createElement("div");
        dia.setAttribute('data-attr',level[i]);
        dia.setAttribute('class',divClass)    
        fra.appendChild(dia);
        if(this.options.shape=="triangle"){
          dia.style.borderColor = '#ffffff #ffffff '+color[i]+' #ffffff';
        }else{
          dia.style.background = color[i];
        }
      }
      if(color.length == level.length-1){
        var unit = document.createElement("div");
        unit.innerHTML = "单位："+level[level.length-1];
        unit.setAttribute('style','font-size:14px;font-align:right;');
        fra.appendChild(unit);
      }
      var div = document.createElement("div");
      div.className = this.customClass?this.customClass:"";
      div.appendChild(fra);
      target.appendChild(div);
  }
  Legend.prototype.initStyle = function(){
    var targetClass = this.target.className ? ('.'+this.target.className):"";
    var className =targetClass + " ."+this.divClass;
    var rules = {
      shape:(function(){
        var triangle ='width:0;height:0;border-width:0 0.5em 1em;border-style:solid;' 
        var square = 'width:1em;height:1em;';    
        return {
          square : square,
          circle : square + 'border-radius:0.5em;',
          triangle:triangle,
        }
      })(),
      arrange:{
        vertical:{
          s:'margin-top:0.5em;',
          a:'margin-left:2em;'
        },
        horizontal:{
          s:'display:inline-block;margin-right:1em;',
          a:' line-height:5em;'
      },
    }
  }
    var style = rules.shape[this.options.shape]+rules.arrange[this.options.arrange].s+"font-size:"+this.options.fontSize;
    var marginLeft = [0.5,-0.5,2,1];
    var index = this.options.arrange =="vertical"?2:0;
    index = this.options.shape == "triangle" ? index+1:index;

    var afterStyle = "content:attr(data-attr);font-size:0.5em;white-space:nowrap;"+rules.arrange[this.options.arrange].a+"margin-left:"+marginLeft[index]+"em;";
    var styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
    styleEl.sheet.addRule(className,style);
    styleEl.sheet.addRule(className+'::after',afterStyle);
  }
  return Legend;
})()