class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public static click : boolean;

    public static getInstance(){

        return this;
    }

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    


    //对话任务面板的ui
    public static Content1 = new egret.TextField();
    public static Content2 = new egret.TextField();
    public static Content3 = new egret.TextField();
    public static Content4 = new egret.TextField();
    public static button = new egret.TextField();

    public static ContentPanel1 = new egret.TextField();
    public static ContentPanel2 = new egret.TextField();
    public static ContentPanel3 = new egret.TextField();
    public static ContentPanel4 = new egret.TextField();

    //emoji
    public static Role1 = new egret.TextField();
    public static Role2 = new egret.TextField();

    public showPanel(task : Task, tag : String){

        //任务面板
        if(tag == "taskpanel not accept0" || tag == "taskpanel submitted0"){

            Main.ContentPanel1.x = 300;
            Main.ContentPanel1.y = 50;
            Main.ContentPanel1.size = 20;
            Main.ContentPanel1.text = "无进行中的任务";

            Main.ContentPanel2.text = "";
            Main.ContentPanel3.text = "";
            Main.ContentPanel4.text = "";

        }else if(tag == "taskpanel accepttask0" || tag == "taskpanel cansubmit0"){

            Main.ContentPanel1.x = 300;
            Main.ContentPanel1.y = 50;
            Main.ContentPanel1.size = 20;
            Main.ContentPanel1.text = "任务名称: " + task.getName();

            Main.ContentPanel2.x = 300;
            Main.ContentPanel2.y = 100;
            Main.ContentPanel2.size = 20;
            Main.ContentPanel2.text = "发布任务NPC: " + task.getGETNpcId();

            Main.ContentPanel3.x = 300;
            Main.ContentPanel3.y = 150;
            Main.ContentPanel3.size = 20;
            Main.ContentPanel3.text = "完成任务NPC: " + task.getSETNpcId();

            Main.ContentPanel4.x = 300;
            Main.ContentPanel4.y = 200;
            Main.ContentPanel4.size = 20;
            Main.ContentPanel4.text = "任务状态： " + task.getState();

        }

        if(tag == "taskpanel not accept1" || tag == "taskpanel submitted1"){

            Main.ContentPanel1.x = 300;
            Main.ContentPanel1.y = 50;
            Main.ContentPanel1.size = 20;
            Main.ContentPanel1.text = "无进行中的任务";

            Main.ContentPanel2.text = "";
            Main.ContentPanel3.text = "";
            Main.ContentPanel4.text = "";

        }else if(tag == "taskpanel accepttask1" || tag == "taskpanel cansubmit1"){

            Main.ContentPanel1.x = 300;
            Main.ContentPanel1.y = 50;
            Main.ContentPanel1.size = 20;
            Main.ContentPanel1.text = "任务名称: " + task.getName();

            Main.ContentPanel2.x = 300;
            Main.ContentPanel2.y = 100;
            Main.ContentPanel2.size = 20;
            Main.ContentPanel2.text = "发布任务NPC: " + task.getGETNpcId();

            Main.ContentPanel3.x = 300;
            Main.ContentPanel3.y = 150;
            Main.ContentPanel3.size = 20;
            Main.ContentPanel3.text = "完成任务NPC: " + task.getSETNpcId();

            Main.ContentPanel4.x = 300;
            Main.ContentPanel4.y = 200;
            Main.ContentPanel4.size = 20;
            Main.ContentPanel4.text = "任务状态： " + task.getState();

        }


        //对话面板
        if(tag == "accept0"){

            Main.Content1.x = 100;
            Main.Content1.y = 600;
            Main.Content1.text = "任务名称: " + task.getName();

            Main.Content2.x = 200;
            Main.Content2.y = 650;
            Main.Content2.text = "发布任务NPC: " + task.getGETNpcId();

            Main.Content3.x = 200;
            Main.Content3.y = 700;
            Main.Content3.text = "完成任务NPC: " + task.getSETNpcId();

            Main.Content4.x = 200;
            Main.Content4.y = 750;
            Main.Content4.text = "任务状态： " + task.getState();
            
            Main.button.x = 300;
            Main.button.y = 800;
            Main.button.text = "接受";
            Main.button.touchEnabled = true;
            Main.button.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){

                Main.button.text = "";
                Main.Content1.text = "";
                Main.Content2.text = "";
                Main.Content3.text = "";
                Main.Content4.text = "";
                task.onAccept();


            },this);
   
        }else if(tag == "finish0"){

            Main.Content1.x = 100;
            Main.Content1.y = 600;
            Main.Content1.text = "任务名称: " + task.getName();

            Main.Content2.x = 200;
            Main.Content2.y = 650;
            Main.Content2.text = "发布任务NPC: " + task.getGETNpcId();

            Main.Content3.x = 200;
            Main.Content3.y = 700;
            Main.Content3.text = "完成任务NPC: " + task.getSETNpcId();

            Main.Content4.x = 200;
            Main.Content4.y = 750;
            Main.Content4.text = "任务状态： " + task.getState();

            Main.button.x = 300;
            Main.button.y = 800;
            Main.button.text = "完成";
            Main.button.touchEnabled = true;
            Main.button.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){

                Main.button.text = "";
                Main.Content1.text = "";
                Main.Content2.text = "";
                Main.Content3.text = "";
                Main.Content4.text = "";
                task.onSubmit();


            },this);
        }

        if(tag == "accept1"){


            Main.Content1.x = 100;
            Main.Content1.y = 600;
            Main.Content1.text = "任务名称: " + task.getName();

            Main.Content2.x = 200;
            Main.Content2.y = 650;
            Main.Content2.text = "发布任务NPC: " + task.getGETNpcId();

            Main.Content3.x = 200;
            Main.Content3.y = 700;
            Main.Content3.text = "完成任务NPC: " + task.getSETNpcId();

            Main.Content4.x = 200;
            Main.Content4.y = 750;
            Main.Content4.text = "任务状态： " + task.getState();
            
            Main.button.x = 300;
            Main.button.y = 800;
            Main.button.text = "接受";
            Main.button.touchEnabled = true;
            Main.button.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){

            Main.Role2.text = "";
            Main.button.text = "";
            Main.Content1.text = "";
            Main.Content2.text = "";
            Main.Content3.text = "";
            Main.Content4.text = "";
            task.onAccept();

        },this);

    }else if(tag == "finish1"){

            Main.Content1.x = 100;
            Main.Content1.y = 600;
            Main.Content1.text = "任务名称: " + task.getName();

            Main.Content2.x = 200;
            Main.Content2.y = 650;
            Main.Content2.text = "发布任务NPC: " + task.getGETNpcId();

            Main.Content3.x = 200;
            Main.Content3.y = 700;
            Main.Content3.text = "完成任务NPC: " + task.getSETNpcId();

            Main.Content4.x = 200;
            Main.Content4.y = 750;
            Main.Content4.text = "任务状态： " + task.getState();

            Main.button.x = 300;
            Main.button.y = 800;
            Main.button.text = "完成";
            Main.button.touchEnabled = true;
            Main.button.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){

                Main.button.text = "";
                Main.Content1.text = "";
                Main.Content2.text = "";
                Main.Content3.text = "";
                Main.Content4.text = "";
                task.onSubmit();
            },this);
    }

}



    public showEmoji(emoji : String){

        //task0
        if(emoji == "publisher0"){
           
            Main.Role1.text = "发布者";
            Main.Role1.x = 40;
            Main.Role1.y = 220;
            Main.Role1.size = 20;
            Main.Role1.textColor = 0xFFFF00;
            

        }else if(emoji == "accepter0"){

            Main.Role1.text = "";


            Main.Role2.text = "接受者";
            Main.Role2.x = 340;
            Main.Role2.y = 530;
            Main.Role2.size = 20;
            Main.Role2.textColor = 0xFFFF00;

        }else if(emoji == "0"){

            Main.Role1.text = "";
            Main.Role2.text = "";
        }

        
        //task1
        if(emoji == "publisher1"){

            Main.Role2.text = "发布者";
            Main.Role2.x = 340;
            Main.Role2.y = 530;
            Main.Role2.size = 20;
            Main.Role2.textColor = 0xFFFF00;

        }else if(emoji == "accepter1"){

            Main.Role2.text = "";

            Main.Role1.text = "接受者";
            Main.Role1.x = 40;
            Main.Role1.y = 220;
            Main.Role1.size = 20;
            Main.Role1.textColor = 0xFFFF00;

        }else if(emoji == "1"){

            Main.Role1.text = "";
            Main.Role2.text = "";
        }


    }

    private createGameScene():void {

        var bg:egret.Shape = new egret.Shape()
        bg.graphics.beginFill( 0x336699 );
        bg.graphics.drawRect( 0, 0, this.stage.stageWidth, this.stage.stageHeight ); 
        bg.graphics.endFill();
        this.addChild(bg);

        this.touchEnabled = true;

        var NPC0 = new NPC("发布者");
        var NPC1 = new NPC("接受者");

        var taskPanel = new TaskPanel("dialogpanel");
        var taskAllTimePanel = new TaskPanel("taskpanel");
        var taskService = TaskService.getInstance();

        var task = new Task("0", "将消息传递给另一个NPC", TaskStatus.ACCEPTABLE, "发布者", "接受者", "talk");
        var task1 = new Task("1", "杀10只怪", TaskStatus.UNACCEPTABLE, "接受者", "发布者", "kill");


        var N0 = this.createBitmapByName("SentNPC_jpg");
        N0.width = 182;
        N0.height = 231;
        N0.touchEnabled = true;
        N0.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){

            Main.click = true;
            TaskService.getInstance().notify(task);
            TaskService.getInstance().notify(task1);
            
        }, this);

        this.addChild(N0);

        var N1 = this.createBitmapByName("GetNPC_jpg");
        N1.x = 300;
        N1.y = 300;
        N1.width = 182;
        N1.height = 231;
        N1.touchEnabled = true;
        N1.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){

           
            Main.click = true;
            TaskService.getInstance().notify(task);
            TaskService.getInstance().notify(task1);
            
        }, this);
        this.addChild(N1);


        var killButton = new KillButton();
        var sceneService = SceneService.getInstance();
        sceneService.addObserver(killButton);


        var killButtonText = new egret.TextField();
        killButtonText.x = 200;
        killButtonText.y = 1000;
        killButtonText.text = "杀怪"
        killButtonText.touchEnabled = true;
        killButtonText.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){

            //相当于杀了怪
            sceneService.notify();

        },this);

        this.addChild(killButtonText);
        this.addChild(Main.Role1);
        this.addChild(Main.Role2);
        this.addChild(Main.Content1);
        this.addChild(Main.Content2);
        this.addChild(Main.Content3);
        this.addChild(Main.Content4);
        this.addChild(Main.button);

        this.addChild(Main.ContentPanel1);
        this.addChild(Main.ContentPanel2);
        this.addChild(Main.ContentPanel3);
        this.addChild(Main.ContentPanel4);


        taskService.addObserver(NPC0);
        taskService.addObserver(NPC1);
        taskService.addObserver(taskPanel);
        taskService.addObserver(taskAllTimePanel);
        taskService.addTask(task);
        taskService.addTask(task1);

        taskService.getTaskByCustomRule(function(taskList : Task[]) : Task{

            for(var i = 0; i < taskList.length; i++){

                if(taskList[i].getState() == TaskStatus.ACCEPTABLE){

                    taskService.notify(taskList[i]);
                    return taskList[i];
                }
            }
        });








        
        
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }


}


