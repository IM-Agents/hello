(function () {
  const MAX_HISTORY = 10;

  const els = {
    display: document.getElementById("display"),
    degBtn: document.getElementById("degBtn"),
    radBtn: document.getElementById("radBtn"),
    historyList: document.getElementById("historyList"),
    historyEmpty: document.getElementById("historyEmpty"),
    histCount: document.getElementById("histCount"),
  };

  const state = {
    memory: 0,
    angleMode: "deg",
    display: "0",
    operand: null,
    pendingOp: null,
    waitingForOperand: false,
    exprMode: false,
    history: [],
  };

  function toAngleRad(x) {
    return state.angleMode === "deg" ? (x * Math.PI) / 180 : x;
  }

  function formatNum(n) {
    if (!Number.isFinite(n)) return "Error";
    const s = String(n);
    if (s.length > 16) return n.toPrecision(12).replace(/\.?0+e/, "e");
    return s.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
  }

  function setDisplay(str) {
    state.display = str;
    els.display.textContent = str;
  }

  function getValue() {
    const v = parseFloat(state.display);
    return Number.isFinite(v) ? v : 0;
  }

  function safeEvalArithmetic(expr) {
    const t = expr.replace(/\s+/g, "").replace(/×/g, "*").replace(/÷/g, "/");
    if (/[^0-9.+\-*/()]/.test(t)) return NaN;
    if (!/[0-9)]$/.test(t)) return NaN;
    try {
      return Function(`"use strict"; return (${t})`)();
    } catch {
      return NaN;
    }
  }

  function applyBinary(a, b, op) {
    switch (op) {
      case "+":
      return a + b;
      case "-":
      return a - b;
      case "*":
      return a * b;
      case "/":
      return b === 0 ? NaN : a / b;
      case "pow":
      return Math.pow(a, b);
      default:
      return b;
    }
  }

  function commitOp() {
    if (state.pendingOp == null || state.operand == null) return;
    const next = getValue();
    const res = applyBinary(state.operand, next, state.pendingOp);
    setDisplay(formatNum(res));
    state.operand = null;
    state.pendingOp = null;
    state.waitingForOperand = true;
  }

  function addHistory(expression, result) {
    state.history.unshift({ expression, result });
    if (state.history.length > MAX_HISTORY) state.history.pop();
    renderHistory();
  }

  function renderHistory() {
    const n = state.history.length;
    els.histCount.textContent = String(n);
    if (n === 0) {
      els.historyEmpty.hidden = false;
      els.historyList.hidden = true;
      els.historyList.innerHTML = "";
      return;
    }
    els.historyEmpty.hidden = true;
    els.historyList.hidden = false;
    els.historyList.innerHTML = state.history
      .map(
        (h) =>
          `<li class="history-item"><span>${escapeHtml(h.expression)}</span> = <strong>${escapeHtml(
            h.result
          )}</strong></li>`
      )
      .join("");
  }

  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  document.querySelector(".keypad").addEventListener("click", (e) => {
    const btn = e.target.closest(".key");
    if (!btn) return;
    const action = btn.dataset.action;
    const value = btn.dataset.value;

    if (action === "num") {
      if (state.display === "Error") {
        setDisplay(value === "." ? "0." : value);
        state.waitingForOperand = false;
        return;
      }
      if (state.exprMode) {
        const d = state.display;
        if (d === "0" && value !== ".") setDisplay(value);
        else setDisplay(d + value);
        return;
      }
      if (state.waitingForOperand) {
        setDisplay(value === "." ? "0." : value);
        state.waitingForOperand = false;
      } else {
        if (value === "." && state.display.includes(".")) return;
        if (state.display === "0" && value !== ".") setDisplay(value);
        else setDisplay(state.display + value);
      }
      return;
    }

    if (action === "op") {
      if (state.display === "Error") return;
      if (state.exprMode) {
        setDisplay(state.display + " " + value + " ");
        return;
      }
      if (!state.waitingForOperand && state.pendingOp != null) {
        commitOp();
        if (state.display === "Error") return;
      }
      state.operand = getValue();
      state.pendingOp = value;
      state.waitingForOperand = true;
      return;
    }

    if (action === "equals") {
      if (state.display === "Error") return;
      if (state.exprMode) {
        const expr = state.display.trim();
        const res = safeEvalArithmetic(expr);
        const out = formatNum(res);
        addHistory(expr, out);
        setDisplay(out);
        state.exprMode = false;
        state.operand = null;
        state.pendingOp = null;
        state.waitingForOperand = true;
        return;
      }
      const expr = buildExprLabel();
      if (state.pendingOp != null && state.operand != null) {
        const next = getValue();
        const res = applyBinary(state.operand, next, state.pendingOp);
        const out = formatNum(res);
        addHistory(expr || `${state.operand} ${opSymbol(state.pendingOp)} ${next}`, out);
        setDisplay(out);
        state.operand = null;
        state.pendingOp = null;
        state.waitingForOperand = true;
      }
      return;
    }

    if (action === "backspace") {
      if (state.waitingForOperand && !state.exprMode) return;
      if (state.display.length <= 1) {
        setDisplay("0");
        state.exprMode = false;
      } else {
        setDisplay(state.display.slice(0, -1));
      }
      return;
    }

    if (action === "reset") {
      setDisplay("0");
      state.operand = null;
      state.pendingOp = null;
      state.waitingForOperand = false;
      state.exprMode = false;
      return;
    }

    if (action === "negate") {
      if (state.display === "Error" || state.exprMode) return;
      const v = getValue();
      setDisplay(formatNum(-v));
      return;
    }

    if (action === "mc") {
      if (state.exprMode) return;
      state.memory = 0;
      return;
    }
    if (action === "mr") {
      if (state.exprMode) return;
      setDisplay(formatNum(state.memory));
      state.waitingForOperand = true;
      return;
    }
    if (action === "mplus") {
      if (state.exprMode) return;
      state.memory += getValue();
      return;
    }
    if (action === "mminus") {
      if (state.exprMode) return;
      state.memory -= getValue();
      return;
    }

    if (action === "sin" || action === "cos" || action === "tan") {
      if (state.display === "Error" || state.exprMode) return;
      let v = getValue();
      const rad = toAngleRad(v);
      let r =
        action === "sin" ? Math.sin(rad) : action === "cos" ? Math.cos(rad) : Math.tan(rad);
      setDisplay(formatNum(r));
      state.waitingForOperand = true;
      return;
    }

    if (action === "log") {
      if (state.display === "Error" || state.exprMode) return;
      setDisplay(formatNum(Math.log10(getValue())));
      state.waitingForOperand = true;
      return;
    }
    if (action === "ln") {
      if (state.display === "Error" || state.exprMode) return;
      setDisplay(formatNum(Math.log(getValue())));
      state.waitingForOperand = true;
      return;
    }

    if (action === "sqrt") {
      if (state.display === "Error" || state.exprMode) return;
      setDisplay(formatNum(Math.sqrt(getValue())));
      state.waitingForOperand = true;
      return;
    }

    if (action === "pi") {
      if (state.exprMode) {
        setDisplay(state.display + String(Math.PI));
      } else {
        setDisplay(formatNum(Math.PI));
        state.waitingForOperand = true;
      }
      return;
    }
    if (action === "e") {
      if (state.exprMode) {
        setDisplay(state.display + String(Math.E));
      } else {
        setDisplay(formatNum(Math.E));
        state.waitingForOperand = true;
      }
      return;
    }

    if (action === "percent") {
      if (state.display === "Error" || state.exprMode) return;
      setDisplay(formatNum(getValue() / 100));
      state.waitingForOperand = true;
      return;
    }

    if (action === "pow") {
      if (state.display === "Error") return;
      if (state.exprMode) {
        setDisplay(state.display + " ** ");
      } else {
        state.operand = getValue();
        state.pendingOp = "pow";
        state.waitingForOperand = true;
      }
      return;
    }

    if (action === "paren") {
      state.exprMode = true;
      state.operand = null;
      state.pendingOp = null;
      if (state.display === "0" || state.waitingForOperand) {
        setDisplay(value);
        state.waitingForOperand = false;
      } else {
        setDisplay(state.display + value);
      }
    }
  });

  function opSymbol(op) {
    if (op === "*") return "×";
    if (op === "/") return "÷";
    if (op === "pow") return "^";
    return op;
  }

  function buildExprLabel() {
    if (state.pendingOp == null || state.operand == null) return "";
    return `${state.operand} ${opSymbol(state.pendingOp)} ${getValue()}`;
  }

  els.degBtn.addEventListener("click", () => {
    state.angleMode = "deg";
    els.degBtn.classList.add("is-active");
    els.radBtn.classList.remove("is-active");
  });
  els.radBtn.addEventListener("click", () => {
    state.angleMode = "rad";
    els.radBtn.classList.add("is-active");
    els.degBtn.classList.remove("is-active");
  });

  renderHistory();
})();
