function stateManagement(obj, type) {
    this.storageType =  type;   //the storage type: session. local or db
    this.currentObject = obj;
    this.stack = [];
    this.currentIndex = 0;
    this.indexObject = null;


    this.save = function(){
        //add the provided object to the stack
        stack.push(this.currentObject);
        // //increase the currentIndex to match the new
        // this.currentIndex + 1;
    };
    //to undo is to shift index
    this.undo = function(){

        this.currentIndex -= 1;
        //show content on this index instead
        console.log(JSON.stringify(stack));
        var removedItem = stack.slice(this.currentIndex, 0);
        console.log(removedItem);
        console.log(JSON.stringify(stack));


    };
    this.redo = function(){

    };
    //compares to objects and returns the difference between them
    this.detectChange = function(obj1, obj2){


    };
    this.storeState = function(){
        localStorage.setItem('lastState',  JSON.stringify(this.currentObject));
    };
    this.restoreState = function(){
        return JSON.parse(localStorage.getItem('lastState'));
    };
    this.clearStorage = function(){
        localStorage.removeItem("lastState");
        this.stack = [];

    };
}
//
// function arr_diff (a1, a2) {
//
//     var a = [], diff = [];
//
//     for (var i = 0; i < a1.length; i++) {
//         a[a1[i]] = true;
//     }
//
//     for (var i = 0; i < a2.length; i++) {
//         if (a[a2[i]]) {
//             delete a[a2[i]];
//         } else {
//             a[a2[i]] = true;
//         }
//     }
//
//     for (var k in a) {
//         diff.push(k);
//     }
//
//     return diff;
// };
//
// console.log(arr_diff(['31322'], ['dasd']));


//
// undo: function(){
//         this.save();
//         if(this.stUndo.length>0) {
//             this.stRedo.push(this.pages);
//             this.lastSav=this.stUndo.pop();
//             var temp = JSON.stringify(this.lastSav);
//             this.pages = JSON.parse(temp);
//             this.syncLS();
//             this.disableUndo = false;
//             this.disableRedo = false;
//             return
//         }
//         this.disableUndo = true;
//     },
//     redo: function(){
//         this.save();
//         if(this.stRedo.length>0) {
//             this.stUndo.push(this.pages);
//             this.lastSav=this.stRedo.pop();
//             var temp = JSON.stringify(this.lastSav);
//             this.pages = JSON.parse(temp);
//             this.syncLS();
//             this.disableRedo = false;
//             this.disableUndo = false;
//             return
//         }
//         this.disableRedo = true;
//     },
//     clear: function() {
//         localStorage.clear();
//
//     },
//     tesad: function() {
//         if(this.L.lastSav) {
//             this.pages=JSON.parse(this.L.lastSav);
//             if(this.L.stUndo) this.stUndo=JSON.parse(this.L.stUndo);
//             if(this.L.stRedo) this.stRedo=JSON.parse(this.L.stRedo);
//             var temp = JSON.stringify(this.lastSav);
//             this.lastSav = JSON.parse(temp);
//
//         }
//     },
//     save: function(){
//         var mod = {l:1};
//         var w = JSON.stringify(this.pages);
//
//         console.log(JSON.stringify(this.LastSav));
//
//         if(this.lastSav && JSON.stringify(this.lastSav) == w) return;
//
//         if(this.lastSav) {
//             this.stUndo.push(this.lastSav);
//             if(this.stUndo.length>this.stackSize) this.stUndo.shift();
//             mod.u = 1;
//         }
//         if(this.stRedo.length>0) {this.stRedo.length=0;mod.r=1;}
//         this.lastSav=JSON.parse(w);
//         this.syncLS(mod);
//     },
//     syncLS: function(what) {
//         what= what || {u:1,l:1,r:1};  //U=undo, L=lastSav, R=redo
//         if(what.u) this.L.stUndo=JSON.stringify(this.stUndo);
//         if(what.r) this.L.stRedo=JSON.stringify(this.stRedo);
//         if(what.l) this.L.lastSav=JSON.stringify(this.lastSav);
//     },





//compare the last saved obj with the provided/attempt to be saved to detect difference
//detect what operation caused the prompt for save/change?
//apply changes to object

//localstorage, sessionstorage, db
//lagrer bare forandringer
//kan bestemme når skal lagre
//masse feilmeldinger, men helst at man ikke kan gjøre feil ved å ha tenkt på alt mulig
