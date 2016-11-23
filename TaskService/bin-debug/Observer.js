var NPC = (function () {
    function NPC(id) {
        this.id = id;
    }
    var d = __define,c=NPC,p=c.prototype;
    p.getId = function () {
        return this.id;
    };
    p.setEmoji = function (emoji) {
        this.emoji = emoji;
    };
    //根据变化的任务的相应状态改变相应NPC头顶的符号
    p.onChange = function (task) {
        //任务刚创建时
        if (task.getState() == TaskStatus.ACCEPTABLE) {
            if (this.id == task.getGETNpcId()) {
                this.emoji = "publisher" + task.getId();
            }
        }
        else if (task.getState() == TaskStatus.CANSUBMIT) {
            if (this.id == task.getGETNpcId()) {
                this.emoji = "accepter" + task.getId();
            }
            if (this.id == task.getSETNpcId()) {
                this.emoji = "accepter" + task.getId();
            }
        }
        else if (task.getState() == TaskStatus.SUBMITTED) {
            this.emoji = task.getId();
        }
        new Main().showEmoji(this.emoji);
    };
    return NPC;
}());
egret.registerClass(NPC,'NPC',["Observer"]);
var TaskPanel = (function () {
    function TaskPanel(id) {
        this.id = id;
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.getId = function () {
        return this.id;
    };
    p.onChange = function (task) {
        //任务面板
        if (task.getState() == TaskStatus.ACCEPTABLE) {
            new Main().showPanel(task, "taskpanel not accept" + task.getId());
        }
        if (task.getState() == TaskStatus.DURING) {
            new Main().showPanel(task, "taskpanel accepttask" + task.getId());
        }
        if (task.getState() == TaskStatus.CANSUBMIT) {
            new Main().showPanel(task, "taskpanel cansubmit" + task.getId());
        }
        if (task.getState() == TaskStatus.SUBMITTED) {
            new Main().showPanel(task, "taskpanel submitted" + task.getId());
        }
        //对话面板
        if (Main.click) {
            if (task.getState() == TaskStatus.ACCEPTABLE) {
                new Main().showPanel(task, "accept" + task.getId());
            }
            else if (task.getState() == TaskStatus.CANSUBMIT) {
                new Main().showPanel(task, "finish" + task.getId());
            }
        }
    };
    return TaskPanel;
}());
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
var KillButton = (function () {
    function KillButton() {
        this.killAmount = 0;
    }
    var d = __define,c=KillButton,p=c.prototype;
    p.onChange = function () {
        this.killAmount++;
        for (var i = 0; i < TaskService.getInstance().taskList.length; i++) {
            if (TaskService.getInstance().taskList[i].condition == "kill") {
                new KillMonsterTaskCondition().onAccept(TaskService.getInstance().taskList[i]);
            }
        }
    };
    return KillButton;
}());
egret.registerClass(KillButton,'KillButton',["Observer"]);
//# sourceMappingURL=Observer.js.map