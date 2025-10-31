// globals
const svgCanvas = new $.SvgCanvas(document.getElementById("svgcanvas"));
const editor = new MD.Editor();
const state = new State();

editor.modal = {
  about: new MD.Modal({
    html: `
      <h1>關於本應用程式</h1>
      <p>Method Draw 是一個簡單的 <a href="https://github.com/methodofaction/Method-Draw">開源</a> 向量繪圖應用程式。Method Draw 多年前從 <a href="https://github.com/SVG-Edit/svgedit">SVG-Edit</a> 分支出來，目標是改進和現代化介面。</p>
      <p>目前（2021），作者（<a href="http://method.ac/writing">Mark MacKay</a>）正在努力改進穩定性和程式碼品質，其中包含許多舊有的實作方式。目標是創造一個適合簡單平面設計任務的向量編輯器。</p>
      `
  }),
  source: new MD.Modal({
    html: `
      <div id="svg_source_editor">
        <div id="svg_source_overlay" class="overlay"></div>
        <div id="svg_source_container">
          <form>
            <textarea id="svg_source_textarea" spellcheck="false"></textarea>
          </form>
          <div id="tool_source_back" class="toolbar_button">
            <button id="tool_source_cancel" class="cancel">取消</button>
            <button id="tool_source_save" class="ok">套用變更</button>
          </div>
        </div>
    </div>`,
    js: function(el){
      el.children[0].classList.add("modal-item-source");
      el.querySelector("#tool_source_save").addEventListener("click", function(){
        var saveChanges = function() {
          svgCanvas.clearSelection();
          $('#svg_source_textarea').blur();
          editor.zoom.multiply(1);
          editor.rulers.update();
          editor.paintBox.fill.prep();
          editor.paintBox.stroke.prep();
          editor.modal.source.close();
        }

        if (!svgCanvas.setSvgString($('#svg_source_textarea').val())) {
          $.confirm("您的 SVG 原始碼中有解析錯誤。\n還原回原始的 SVG 原始碼？", function(ok) {
            if(!ok) return false;
            saveChanges();
          });
        } else {
          saveChanges();
        } 
      })
      el.querySelector("#tool_source_cancel").addEventListener("click", function(){
        editor.modal.source.close();
      });
    }
  }),
  configure: new MD.Modal({
    html: `
      <h1>設定</h1>
      <div id="configuration">
        <button class="warning">清除所有資料</button>
        </div>
      </div>`,
    js: function(el){
      const input = el.querySelector("#configuration button.warning");
      input.addEventListener("click", function(){
        state.clean();
      })
    }
  }),
  donate: new MD.Modal({
    html: `
      <h1>贊助</h1>
      <p>
        Method Draw 依靠您慷慨的贊助來持續開發。
        如果您覺得這個應用程式有用，請立即 <a href="https://method.ac/donate/">贊助</a>。
      </p>`
  }),
  shortcuts: new MD.Modal({
    html: `
      <h1>快捷鍵</h1>
      <div id="shortcuts"></div>`,
    js: function(el){
      el.children[0].classList.add("modal-item-wide");
    }
  })
};