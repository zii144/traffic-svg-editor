MD.Keyboard = function(){

  const keys = {
    "v": { name: "選取工具",         cb: ()=> state.set("canvasMode", "select") },
    "q": { name: "自由手繪工具",       cb: ()=> state.set("canvasMode", "fhpath") },
    "l": { name: "直線工具",           cb: ()=> state.set("canvasMode", "fhplineath")},
    "r": { name: "矩形工具",      cb: ()=> state.set("canvasMode", "rect")},
    "o": { name: "橢圓工具",        cb: ()=> state.set("canvasMode", "ellipse")},
    "s": { name: "圖形工具",          cb: ()=> state.set("canvasMode", "shapelib")},
    "p": { name: "路徑工具",           cb: ()=> state.set("canvasMode", "path")},
    "t": { name: "文字工具",           cb: ()=> state.set("canvasMode", "text")},
    "z": { name: "縮放工具",           cb: ()=> state.set("canvasMode", "zoom")},
    "e": { name: "滴管工具",     cb: ()=> state.set("canvasMode", "eyedropper")},
    "x": { name: "聚焦填色/筆畫",   cb: ()=> editor.focusPaint()}, 
"shift_x":   { name: "切換填色/筆畫",  cb: ()=> editor.switchPaint()},  
    "alt":   { name: false,                 cb: ()=> $("#workarea").toggleClass("out", state.get("canvasMode") === "zoom" )},  
    "cmd_s": { name: "儲存 SVG 檔案",       cb: ()=> editor.save()},
    "cmd_z": { name: "復原",                cb: ()=> editor.undo()},
    "cmd_y": { name: "重做",                cb: ()=> editor.redo()},
"cmd_shift_z": { name: "重做",              cb: ()=> editor.redo()},
    "cmd_c": { name: "複製",                cb: ()=> editor.copySelected()},
    "cmd_x": { name: "剪下",                 cb: ()=> editor.cutSelected()},
    "cmd_v": { name: "貼上",               cb: ()=> editor.pasteSelected()},
    "cmd_d": { name: "複製副本",           cb: ()=> editor.duplicateSelected()},
    "cmd_u": { name: "檢視原始碼",         cb: ()=> editor.source()},
    "cmd_a": { name: "全選",          cb: ()=> svgCanvas.selectAllInCurrentLayer()},
    "cmd_b": { name: "設定粗體",       cb: ()=> editor.text.setBold()},
    "cmd_i": { name: "設定斜體",     cb: ()=> editor.text.setItalic()},
    "cmd_g": { name: "群組選取項目",      cb: ()=> editor.groupSelected()},
    "cmd_shift_g":  { name: "解散群組",      cb: ()=> editor.ungroupSelected()},
    "cmd_o": { name: "開啟 SVG 檔案",       cb: ()=> editor.import.open()},
    "cmd_k": { name: "置入圖片",         cb: ()=> editor.import.place()},
    "backspace": { name: "刪除",          cb: ()=> editor.deleteSelected()},
    "delete":    { name: "刪除",          cb: ()=> editor.deleteSelected()},
    "ctrl_arrowleft":        { name: "旋轉 -1度",  cb: ()=> editor.rotateSelected(0,1)},
    "ctrl_arrowright":       { name: "旋轉 +1度",  cb: ()=> editor.rotateSelected(1,1)},
    "ctrl_shift_arrowleft":  { name: "旋轉 -5度",  cb: ()=> editor.rotateSelected(0,5)},
    "ctrl_shift_arrowright": { name: "旋轉 +5度", cb: ()=> editor.rotateSelected(1,5)},
    "shift_o":  { name: "下一個項目",         cb: ()=> svgCanvas.cycleElement(0)},
    "shift_p":  { name: "上一個項目",         cb: ()=> svgCanvas.cycleElement(1)},
    "shift_r":  { name: "顯示/隱藏尺規",  cb: ()=> editor.rulers.toggleRulers()},
    "cmd_+":  { name: "放大",             cb: ()=> editor.zoom.multiply(1.5)},
    "cmd_-":  { name: "縮小",            cb: ()=> editor.zoom.multiply(0.75)},
    "cmd_=":  { name: "實際大小",         cb: ()=> editor.zoom.reset()},
    "arrowleft":  { name: "向左微調",      cb: ()=> editor.moveSelected(-1,0)},
    "arrowright":  { name: "向右微調",    cb: ()=> editor.moveSelected(1,0)},
    "arrowup":  { name: "向上微調",          cb: ()=> editor.moveSelected(0,-1)},
    "arrowdown":  { name: "向下微調",      cb: ()=> editor.moveSelected(0,1)},
    "shift_arrowleft": {name: "向左跳躍",   cb: () => editor.moveSelected(state.get("canvasSnapStep") * -1, 0)},
    "shift_arrowright": {name: "向右跳躍", cb: () => editor.moveSelected(state.get("canvasSnapStep") * 1, 0)},
    "shift_arrowup": {name: "向上跳躍",       cb: () => editor.moveSelected(0, state.get("canvasSnapStep") * -1)},
    "shift_arrowdown": {name: "向下跳躍",   cb: () => editor.moveSelected(0, state.get("canvasSnapStep") * 1)},
    "cmd_arrowup":{ name: "向前一層",   cb: () => editor.moveUpSelected()},
    "cmd_arrowdown":{ name: "向後一層", cb: () => editor.moveDownSelected()},
    "cmd_shift_arrowup":{ name: "置於最前", cb: () => editor.moveToTopSelected()},
    "cmd_shift_arrowdown":{ name: "置於最後", cb: () => editor.moveToBottomSelected()},
    "escape":  { name: false,    cb: ()=> editor.escapeMode()},
    "enter":    { name: false,   cb: ()=> editor.escapeMode()},
    " ":  { name: "平移畫布",  cb: (e)=> editor.pan.startPan(e)},
  };

  document.addEventListener("keydown", function(e){
    const exceptions = $(":focus").length || $("#color_picker").is(":visible");
    if (exceptions) return false;
    const modKey = !svgedit.browser.isMac() ? "ctrlKey" : "metaKey";
    const cmd = e[modKey] ? "cmd_" : "";
    const shift = e.shiftKey ? "shift_" : "";
    const key = cmd + shift + e.key.toLowerCase();
    const canvasMode = state.get("canvasMode");
    
    const modalIsOpen = Object.values(editor.modal).filter((modal) => {
      const isHidden = modal.el.classList.contains("hidden");
      if (!isHidden && key === "cmd_enter") modal.confirm();
      if (!isHidden && key === "escape") modal.close();
      return !isHidden;
    }).length;

    // keyboard shortcut exists for app
    if (!modalIsOpen && keys[key]) {
      e.preventDefault();
      keys[key].cb();
    }
  });

  document.addEventListener("keyup", function(e){
    if ($("#color_picker").is(":visible")) return e;
    const canvasMode = state.get("canvasMode");
    const key = e.key.toLowerCase();
    const keys = {
    "alt":     ()=> $("#workarea").removeClass("out"),
    " ": ()=> editor.pan.stopPan(),
    }
    if (keys[key]) {
      e.preventDefault();
      keys[key]();
    }
  })

  // modal shortcuts
  const shortcutEl = document.getElementById("shortcuts");
  const docFrag = document.createDocumentFragment();
  for (const key in keys) {
    const name = keys[key].name;
    if (!name) continue;
    const shortcut = document.createElement("div");
    shortcut.classList.add("shortcut")
    const chords = key.split("_");
    const shortcutKeys = document.createElement("div");
    shortcutKeys.classList.add("shortcut-keys")
    chords.forEach(key => {
      const shortcutKey = document.createElement("div"); 
      shortcutKey.classList.add("shortcut-key");
      if (key === "arrowright") key = "→";
      if (key === "arrowleft") key = "←";
      if (key === "arrowup") key = "↑";
      if (key === "arrowdown") key = "↓";
      if (key === " ") key = "SPACEBAR";
      if (key === "shift") key = "⇧";
      if (key === "cmd") key = svgedit.browser.isMac() ? "⌘" : "Ctrl";
      shortcutKey.textContent = key;
      shortcutKeys.appendChild(shortcutKey);
      shortcut.appendChild(shortcutKeys);
    });

    const shortcutName = document.createElement("div"); 
    shortcutName.classList.add("shortcut-name");
    shortcutName.textContent = name;
    shortcutKeys.appendChild(shortcutName);

    docFrag.appendChild(shortcutKeys);
  }

  shortcutEl.appendChild(docFrag);


}