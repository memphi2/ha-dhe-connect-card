const Be = globalThis, ht = Be.ShadowRoot && (Be.ShadyCSS === void 0 || Be.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, pt = /* @__PURE__ */ Symbol(), Mt = /* @__PURE__ */ new WeakMap();
let Ai = class {
  constructor(t, i, r) {
    if (this._$cssResult$ = !0, r !== pt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (ht && t === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (t = Mt.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && Mt.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const zr = (e) => new Ai(typeof e == "string" ? e : e + "", void 0, pt), Ae = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((r, n, o) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[o + 1], e[0]);
  return new Ai(i, e, pt);
}, Kr = (e, t) => {
  if (ht) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const r = document.createElement("style"), n = Be.litNonce;
    n !== void 0 && r.setAttribute("nonce", n), r.textContent = i.cssText, e.appendChild(r);
  }
}, Ht = ht ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const r of t.cssRules) i += r.cssText;
  return zr(i);
})(e) : e;
const { is: Lr, defineProperty: Pr, getOwnPropertyDescriptor: Mr, getOwnPropertyNames: Hr, getOwnPropertySymbols: jr, getPrototypeOf: Fr } = Object, We = globalThis, jt = We.trustedTypes, Wr = jt ? jt.emptyScript : "", Ur = We.reactiveElementPolyfillSupport, fe = (e, t) => e, ze = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Wr : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, mt = (e, t) => !Lr(e, t), Ft = { attribute: !0, type: String, converter: ze, reflect: !1, useDefault: !1, hasChanged: mt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), We.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Q = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Ft) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, r, i);
      n !== void 0 && Pr(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, r) {
    const { get: n, set: o } = Mr(this.prototype, t) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: n, set(a) {
      const s = n?.call(this);
      o?.call(this, a), this.requestUpdate(t, s, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ft;
  }
  static _$Ei() {
    if (this.hasOwnProperty(fe("elementProperties"))) return;
    const t = Fr(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(fe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(fe("properties"))) {
      const i = this.properties, r = [...Hr(i), ...jr(i)];
      for (const n of r) this.createProperty(n, i[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [r, n] of i) this.elementProperties.set(r, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, r] of this.elementProperties) {
      const n = this._$Eu(i, r);
      n !== void 0 && this._$Eh.set(n, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const n of r) i.unshift(Ht(n));
    } else t !== void 0 && i.push(Ht(t));
    return i;
  }
  static _$Eu(t, i) {
    const r = i.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const r of i.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Kr(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, i, r) {
    this._$AK(t, r);
  }
  _$ET(t, i) {
    const r = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, r);
    if (n !== void 0 && r.reflect === !0) {
      const o = (r.converter?.toAttribute !== void 0 ? r.converter : ze).toAttribute(i, r.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const r = this.constructor, n = r._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = r.getPropertyOptions(n), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : ze;
      this._$Em = n;
      const s = a.fromAttribute(i, o.type);
      this[n] = s ?? this._$Ej?.get(n) ?? s, this._$Em = null;
    }
  }
  requestUpdate(t, i, r, n = !1, o) {
    if (t !== void 0) {
      const a = this.constructor;
      if (n === !1 && (o = this[t]), r ??= a.getPropertyOptions(t), !((r.hasChanged ?? mt)(o, i) || r.useDefault && r.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, r)))) return;
      this.C(t, i, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: r, reflect: n, wrapped: o }, a) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? i ?? this[t]), o !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (i = void 0), this._$AL.set(t, i)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [n, o] of r) {
        const { wrapped: a } = o, s = this[n];
        a !== !0 || this._$AL.has(n) || s === void 0 || this.C(n, void 0, o, s);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((i) => this._$ET(i, this[i])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
Q.elementStyles = [], Q.shadowRootOptions = { mode: "open" }, Q[fe("elementProperties")] = /* @__PURE__ */ new Map(), Q[fe("finalized")] = /* @__PURE__ */ new Map(), Ur?.({ ReactiveElement: Q }), (We.reactiveElementVersions ??= []).push("2.1.2");
const _t = globalThis, Wt = (e) => e, Ke = _t.trustedTypes, Ut = Ke ? Ke.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ci = "$lit$", B = `lit$${Math.random().toFixed(9).slice(2)}$`, Ti = "?" + B, Vr = `<${Ti}>`, G = document, be = () => G.createComment(""), we = (e) => e === null || typeof e != "object" && typeof e != "function", gt = Array.isArray, Yr = (e) => gt(e) || typeof e?.[Symbol.iterator] == "function", rt = `[ 	
\f\r]`, he = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Vt = /-->/g, Yt = />/g, j = RegExp(`>|${rt}(?:([^\\s"'>=/]+)(${rt}*=${rt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Gt = /'/g, qt = /"/g, Oi = /^(?:script|style|textarea|title)$/i, Gr = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), l = Gr(1), T = /* @__PURE__ */ Symbol.for("lit-noChange"), m = /* @__PURE__ */ Symbol.for("lit-nothing"), Zt = /* @__PURE__ */ new WeakMap(), V = G.createTreeWalker(G, 129);
function Di(e, t) {
  if (!gt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ut !== void 0 ? Ut.createHTML(t) : t;
}
const qr = (e, t) => {
  const i = e.length - 1, r = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = he;
  for (let s = 0; s < i; s++) {
    const c = e[s];
    let u, f, h = -1, v = 0;
    for (; v < c.length && (a.lastIndex = v, f = a.exec(c), f !== null); ) v = a.lastIndex, a === he ? f[1] === "!--" ? a = Vt : f[1] !== void 0 ? a = Yt : f[2] !== void 0 ? (Oi.test(f[2]) && (n = RegExp("</" + f[2], "g")), a = j) : f[3] !== void 0 && (a = j) : a === j ? f[0] === ">" ? (a = n ?? he, h = -1) : f[1] === void 0 ? h = -2 : (h = a.lastIndex - f[2].length, u = f[1], a = f[3] === void 0 ? j : f[3] === '"' ? qt : Gt) : a === qt || a === Gt ? a = j : a === Vt || a === Yt ? a = he : (a = j, n = void 0);
    const p = a === j && e[s + 1].startsWith("/>") ? " " : "";
    o += a === he ? c + Vr : h >= 0 ? (r.push(u), c.slice(0, h) + Ci + c.slice(h) + B + p) : c + B + (h === -2 ? s : p);
  }
  return [Di(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class $e {
  constructor({ strings: t, _$litType$: i }, r) {
    let n;
    this.parts = [];
    let o = 0, a = 0;
    const s = t.length - 1, c = this.parts, [u, f] = qr(t, i);
    if (this.el = $e.createElement(u, r), V.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = V.nextNode()) !== null && c.length < s; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(Ci)) {
          const v = f[a++], p = n.getAttribute(h).split(B), y = /([.?@])?(.*)/.exec(v);
          c.push({ type: 1, index: o, name: y[2], strings: p, ctor: y[1] === "." ? Jr : y[1] === "?" ? Xr : y[1] === "@" ? Qr : Ue }), n.removeAttribute(h);
        } else h.startsWith(B) && (c.push({ type: 6, index: o }), n.removeAttribute(h));
        if (Oi.test(n.tagName)) {
          const h = n.textContent.split(B), v = h.length - 1;
          if (v > 0) {
            n.textContent = Ke ? Ke.emptyScript : "";
            for (let p = 0; p < v; p++) n.append(h[p], be()), V.nextNode(), c.push({ type: 2, index: ++o });
            n.append(h[v], be());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Ti) c.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = n.data.indexOf(B, h + 1)) !== -1; ) c.push({ type: 7, index: o }), h += B.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const r = G.createElement("template");
    return r.innerHTML = t, r;
  }
}
function re(e, t, i = e, r) {
  if (t === T) return t;
  let n = r !== void 0 ? i._$Co?.[r] : i._$Cl;
  const o = we(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, i, r)), r !== void 0 ? (i._$Co ??= [])[r] = n : i._$Cl = n), n !== void 0 && (t = re(e, n._$AS(e, t.values), n, r)), t;
}
class Zr {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: r } = this._$AD, n = (t?.creationScope ?? G).importNode(i, !0);
    V.currentNode = n;
    let o = V.nextNode(), a = 0, s = 0, c = r[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let u;
        c.type === 2 ? u = new se(o, o.nextSibling, this, t) : c.type === 1 ? u = new c.ctor(o, c.name, c.strings, this, t) : c.type === 6 && (u = new en(o, this, t)), this._$AV.push(u), c = r[++s];
      }
      a !== c?.index && (o = V.nextNode(), a++);
    }
    return V.currentNode = G, n;
  }
  p(t) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, i), i += r.strings.length - 2) : r._$AI(t[i])), i++;
  }
}
class se {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, r, n) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = r, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && t?.nodeType === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = re(this, t, i), we(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== T && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Yr(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && we(this._$AH) ? this._$AA.nextSibling.data = t : this.T(G.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: r } = t, n = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = $e.createElement(Di(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const o = new Zr(n, this), a = o.u(this.options);
      o.p(i), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let i = Zt.get(t.strings);
    return i === void 0 && Zt.set(t.strings, i = new $e(t)), i;
  }
  k(t) {
    gt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, n = 0;
    for (const o of t) n === i.length ? i.push(r = new se(this.O(be()), this.O(be()), this, this.options)) : r = i[n], r._$AI(o), n++;
    n < i.length && (this._$AR(r && r._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const r = Wt(t).nextSibling;
      Wt(t).remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Ue {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, r, n, o) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = m;
  }
  _$AI(t, i = this, r, n) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = re(this, t, i, 0), a = !we(t) || t !== this._$AH && t !== T, a && (this._$AH = t);
    else {
      const s = t;
      let c, u;
      for (t = o[0], c = 0; c < o.length - 1; c++) u = re(this, s[r + c], i, c), u === T && (u = this._$AH[c]), a ||= !we(u) || u !== this._$AH[c], u === m ? t = m : t !== m && (t += (u ?? "") + o[c + 1]), this._$AH[c] = u;
    }
    a && !n && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Jr extends Ue {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class Xr extends Ue {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class Qr extends Ue {
  constructor(t, i, r, n, o) {
    super(t, i, r, n, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = re(this, t, i, 0) ?? m) === T) return;
    const r = this._$AH, n = t === m && r !== m || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, o = t !== m && (r === m || n);
    n && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class en {
  constructor(t, i, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    re(this, t);
  }
}
const tn = { I: se }, rn = _t.litHtmlPolyfillSupport;
rn?.($e, se), (_t.litHtmlVersions ??= []).push("3.3.3");
const nn = (e, t, i) => {
  const r = i?.renderBefore ?? t;
  let n = r._$litPart$;
  if (n === void 0) {
    const o = i?.renderBefore ?? null;
    r._$litPart$ = n = new se(t.insertBefore(be(), o), o, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
const ft = globalThis;
let te = class extends Q {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = nn(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return T;
  }
};
te._$litElement$ = !0, te.finalized = !0, ft.litElementHydrateSupport?.({ LitElement: te });
const on = ft.litElementPolyfillSupport;
on?.({ LitElement: te });
(ft.litElementVersions ??= []).push("4.2.2");
const Ni = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const an = { attribute: !0, type: String, converter: ze, reflect: !1, hasChanged: mt }, sn = (e = an, t, i) => {
  const { kind: r, metadata: n } = i;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), r === "accessor") {
    const { name: a } = i;
    return { set(s) {
      const c = t.get.call(this);
      t.set.call(this, s), this.requestUpdate(a, c, e, !0, s);
    }, init(s) {
      return s !== void 0 && this.C(a, void 0, e, s), s;
    } };
  }
  if (r === "setter") {
    const { name: a } = i;
    return function(s) {
      const c = this[a];
      t.call(this, s), this.requestUpdate(a, c, e, !0, s);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function vt(e) {
  return (t, i) => typeof i == "object" ? sn(e, t, i) : ((r, n, o) => {
    const a = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, r), a ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(e, t, i);
}
function Ce(e) {
  return vt({ ...e, state: !0, attribute: !1 });
}
const cn = { CHILD: 2 }, Ii = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Ri = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, i, r) {
    this._$Ct = t, this._$AM = i, this._$Ci = r;
  }
  _$AS(t, i) {
    return this.update(t, i);
  }
  update(t, i) {
    return this.render(...i);
  }
};
const { I: ln } = tn, Jt = (e) => e, Xt = () => document.createComment(""), pe = (e, t, i) => {
  const r = e._$AA.parentNode, n = t === void 0 ? e._$AB : t._$AA;
  if (i === void 0) {
    const o = r.insertBefore(Xt(), n), a = r.insertBefore(Xt(), n);
    i = new ln(o, a, e, e.options);
  } else {
    const o = i._$AB.nextSibling, a = i._$AM, s = a !== e;
    if (s) {
      let c;
      i._$AQ?.(e), i._$AM = e, i._$AP !== void 0 && (c = e._$AU) !== a._$AU && i._$AP(c);
    }
    if (o !== n || s) {
      let c = i._$AA;
      for (; c !== o; ) {
        const u = Jt(c).nextSibling;
        Jt(r).insertBefore(c, n), c = u;
      }
    }
  }
  return i;
}, F = (e, t, i = e) => (e._$AI(t, i), e), dn = {}, un = (e, t = dn) => e._$AH = t, hn = (e) => e._$AH, nt = (e) => {
  e._$AR(), e._$AA.remove();
};
const Qt = (e, t, i) => {
  const r = /* @__PURE__ */ new Map();
  for (let n = t; n <= i; n++) r.set(e[n], n);
  return r;
}, x = Ii(class extends Ri {
  constructor(e) {
    if (super(e), e.type !== cn.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e, t, i) {
    let r;
    i === void 0 ? i = t : t !== void 0 && (r = t);
    const n = [], o = [];
    let a = 0;
    for (const s of e) n[a] = r ? r(s, a) : a, o[a] = i(s, a), a++;
    return { values: o, keys: n };
  }
  render(e, t, i) {
    return this.dt(e, t, i).values;
  }
  update(e, [t, i, r]) {
    const n = hn(e), { values: o, keys: a } = this.dt(t, i, r);
    if (!Array.isArray(n)) return this.ut = a, o;
    const s = this.ut ??= [], c = [];
    let u, f, h = 0, v = n.length - 1, p = 0, y = o.length - 1;
    for (; h <= v && p <= y; ) if (n[h] === null) h++;
    else if (n[v] === null) v--;
    else if (s[h] === a[p]) c[p] = F(n[h], o[p]), h++, p++;
    else if (s[v] === a[y]) c[y] = F(n[v], o[y]), v--, y--;
    else if (s[h] === a[y]) c[y] = F(n[h], o[y]), pe(e, c[y + 1], n[h]), h++, y--;
    else if (s[v] === a[p]) c[p] = F(n[v], o[p]), pe(e, n[h], n[v]), v--, p++;
    else if (u === void 0 && (u = Qt(a, p, y), f = Qt(s, h, v)), u.has(s[h])) if (u.has(s[v])) {
      const _ = f.get(a[p]), $ = _ !== void 0 ? n[_] : null;
      if ($ === null) {
        const S = pe(e, n[h]);
        F(S, o[p]), c[p] = S;
      } else c[p] = F($, o[p]), pe(e, n[h], $), n[_] = null;
      p++;
    } else nt(n[v]), v--;
    else nt(n[h]), h++;
    for (; p <= y; ) {
      const _ = pe(e, c[y + 1]);
      F(_, o[p]), c[p++] = _;
    }
    for (; h <= v; ) {
      const _ = n[h++];
      _ !== null && nt(_);
    }
    return this.ut = a, un(e, c), T;
  }
}), ne = [
  "overview",
  "controls",
  "bath",
  "timers",
  "memory",
  "consumption",
  "saving",
  "weather",
  "radio",
  "diagnostics",
  "support",
  "actions"
], pn = {
  key: "unknown",
  domain: "sensor",
  section: "overview",
  label: "Unknown",
  icon: "mdi:help-circle-outline",
  order: 0
}, mn = [
  g("water_flow", "overview", "Current water flow", "mdi:waves-arrow-right", 10, !1, [
    "wasserfluss",
    "wasserdurchfluss",
    "aktueller_wasserdurchfluss"
  ]),
  g("power", "overview", "Current power consumption", "mdi:flash", 11, !1, [
    "stromverbrauch",
    "aktueller_stromverbrauch",
    "leistungsaufnahme",
    "aktuelle_leistungsaufnahme"
  ]),
  g("nominal_power", "diagnostics", "Nominal power", "mdi:flash-outline", 12, !0),
  g("inlet_temperature", "overview", "Inlet temperature", "mdi:thermometer-low", 13, !0, [
    "zulauftemperatur"
  ]),
  g("outlet_temperature", "overview", "Outlet temperature", "mdi:thermometer-high", 14, !0, [
    "auslauftemperatur"
  ]),
  g("scald_protection_temperature_limit", "diagnostics", "Scald protection temperature limit", "mdi:thermometer-alert", 15, !0),
  g("device_status", "overview", "Device status", "mdi:state-machine", 16, !0),
  g("protocol_version", "diagnostics", "Protocol version", "mdi:protocol", 17, !0),
  g("water_consumption_week", "consumption", "Water consumption week", "mdi:water", 30),
  g("water_consumption_year", "consumption", "Water consumption year", "mdi:water", 31),
  g("water_consumption_total", "consumption", "Total water consumption", "mdi:water-sync", 32),
  g("odb_hot_water_volume", "consumption", "Total hot water volume", "mdi:water-thermometer", 33, !0),
  g("energy_consumption_week", "consumption", "Energy consumption week", "mdi:lightning-bolt", 34),
  g("energy_consumption_year", "consumption", "Energy consumption year", "mdi:lightning-bolt", 35),
  g("energy_consumption_total", "consumption", "Total energy consumption", "mdi:lightning-bolt-circle", 36),
  g("odb_heating_energy", "consumption", "Total heating energy", "mdi:radiator", 37, !0),
  g("last_usage_water", "consumption", "Last usage water", "mdi:water-check", 38),
  g("last_usage_energy", "consumption", "Last usage energy", "mdi:lightning-bolt", 39),
  g("last_usage_time", "consumption", "Last usage duration", "mdi:timer-outline", 40),
  g("last_usage_cost", "consumption", "Last usage cost", "mdi:cash", 41),
  g("odb_possible_energy_saving", "saving", "Possible energy saving", "mdi:leaf-circle", 50, !0),
  g("odb_actual_water_saving", "saving", "Actual water saving", "mdi:water-percent", 51, !0),
  g("saving_monitor_consumption_water", "saving", "Saving monitor consumption water", "mdi:water", 52),
  g("saving_monitor_consumption_energy", "saving", "Saving monitor consumption energy", "mdi:flash", 53),
  g("saving_monitor_consumption_co2", "saving", "Saving monitor consumption CO2", "mdi:molecule-co2", 54),
  g("saving_monitor_activation_rate", "saving", "Saving monitor activation rate", "mdi:percent", 55),
  g("saving_monitor_possible_water", "saving", "Saving monitor possible water saving", "mdi:water-plus", 56),
  g("saving_monitor_possible_energy", "saving", "Saving monitor possible energy saving", "mdi:lightning-bolt-outline", 57),
  g("saving_monitor_possible_co2", "saving", "Saving monitor possible CO2 saving", "mdi:molecule-co2", 58),
  g("saving_monitor_possible_cost", "saving", "Saving monitor possible cost saving", "mdi:cash-plus", 59),
  g("saving_monitor_real_water", "saving", "Saving monitor real water saving", "mdi:water-check", 60),
  g("saving_monitor_real_energy", "saving", "Saving monitor real energy saving", "mdi:lightning-bolt", 61),
  g("saving_monitor_real_co2", "saving", "Saving monitor real CO2 saving", "mdi:molecule-co2", 62),
  g("saving_monitor_real_cost", "saving", "Saving monitor real cost saving", "mdi:cash-check", 63),
  g("bath_fill_remaining_volume", "bath", "Bath fill remaining", "mdi:bathtub", 70),
  g("bath_fill_current_volume", "bath", "Current bath fill volume", "mdi:bathtub-outline", 71, !0),
  g("brush_timer_remaining", "timers", "Brush timer remaining", "mdi:toothbrush", 80),
  g("shower_timer_remaining", "timers", "Shower timer remaining", "mdi:shower-head", 81),
  g("wellness_runtime_normalized", "diagnostics", "Wellness runtime", "mdi:chart-timeline-variant", 90, !0),
  g("error_status", "overview", "Error status", "mdi:alert-circle-outline", 18),
  g("reconnect_count", "diagnostics", "Reconnects", "mdi:restart", 91),
  g("connection_state", "diagnostics", "Connection state", "mdi:lan-connect", 92, !1, ["verbindungsstatus"]),
  g("last_reconnect_reason", "diagnostics", "Last reconnect reason", "mdi:alert-outline", 93),
  g("next_reconnect_delay", "diagnostics", "Next reconnect delay", "mdi:timer-sand", 94),
  g("device_info", "diagnostics", "Device info", "mdi:information-outline", 95, !0),
  g("product_id", "diagnostics", "Product ID", "mdi:identifier", 96, !0),
  g("wlan_mac", "diagnostics", "WLAN MAC", "mdi:wifi", 97, !0),
  g("bluetooth_mac", "diagnostics", "Bluetooth MAC", "mdi:bluetooth", 98, !0),
  g("operating_duration", "diagnostics", "Operating duration", "mdi:clock-outline", 99, !0)
], _n = [
  J("bath_fill_target_volume", "bath", "Bath fill target volume", "mdi:bathtub", 100),
  J("child_safety_temperature_limit", "controls", "Child safety temperature limit", "mdi:thermometer-high", 101),
  J("eco_flow_limit", "controls", "Eco flow limit", "mdi:water-pump", 102),
  J("brush_timer_duration", "timers", "Brush timer seconds", "mdi:toothbrush", 103),
  J("shower_timer_duration", "timers", "Shower timer seconds", "mdi:timer-edit", 104),
  ...q().map(
    (e) => J(
      `temperature_memory_${e}_temperature`,
      "memory",
      `Memory ${e} temperature`,
      yt(e),
      120 + e,
      e > 2
    )
  )
], gn = [
  A("eco_mode", "controls", "Eco mode", "mdi:leaf", 150),
  A("child_safety_active", "controls", "Child safety", "mdi:thermometer-check", 151),
  A("bath_fill_active", "bath", "Bath fill", "mdi:bathtub", 152),
  A("brush_timer_active", "timers", "Brush timer", "mdi:toothbrush", 153),
  A("shower_timer_active", "timers", "Shower timer", "mdi:shower-head", 154),
  A("wellness_cold_prevention", "controls", "Cold prevention", "mdi:shower", 160),
  A(
    "wellness_winter_pick_me_up",
    "controls",
    "Winter pick-me-up",
    "mdi:snowflake-thermometer",
    161
  ),
  A("wellness_summer_fitness", "controls", "Summer fitness", "mdi:weather-sunny", 162),
  A(
    "wellness_circulation_boost",
    "controls",
    "Circulation boost",
    "mdi:heart-pulse",
    163
  )
], fn = [
  W("reset_brush_timer", "timers", "Reset brush timer", "mdi:toothbrush", 180, !0),
  W("reset_shower_timer", "timers", "Reset shower timer", "mdi:shower-head", 181, !0),
  W("repair_pairing", "actions", "Repair pairing", "mdi:refresh", 182, !0, !0),
  W("disconnect_radio_pairing", "actions", "Disconnect radio pairing", "mdi:speaker-bluetooth", 183, !0, !0),
  W(
    "bridge_temperature_maximum",
    "controls",
    "Bridge maximum temperature (5 min)",
    "mdi:thermometer-chevron-up",
    184
  ),
  ...q().map(
    (e) => W(`temperature_memory_${e}`, "memory", `Memory ${e}`, yt(e), 200 + e, e > 2)
  ),
  ...q(3).map(
    (e) => W(
      `delete_temperature_memory_${e}`,
      "memory",
      `Delete memory ${e}`,
      "mdi:trash-can-outline",
      230 + e,
      !0,
      !0
    )
  )
], vn = [
  {
    key: "controlunit_name",
    domain: "text",
    section: "diagnostics",
    label: "Device name",
    icon: "mdi:form-textbox",
    diagnostic: !0,
    order: 90
  },
  ...q().map((e) => ({
    key: `temperature_memory_${e}_name`,
    domain: "text",
    section: "memory",
    label: `Memory ${e} name`,
    icon: yt(e),
    optional: e > 2,
    order: 260 + e
  }))
], k = [
  {
    key: "water_heating",
    domain: "climate",
    section: "controls",
    label: "Water heating",
    icon: "mdi:water-thermometer",
    aliases: ["setpoint", "durchlauferhitzer"],
    order: 1
  },
  {
    key: "scald_protection_active",
    domain: "binary_sensor",
    section: "diagnostics",
    label: "Scald protection active",
    icon: "mdi:shield-check",
    optional: !0,
    diagnostic: !0,
    order: 8
  },
  ...mn,
  ..._n,
  ...gn,
  ...fn,
  ...vn,
  {
    key: "weather_location",
    domain: "select",
    section: "weather",
    label: "Weather location",
    icon: "mdi:map-marker",
    order: 300
  },
  {
    key: "weather",
    domain: "weather",
    section: "weather",
    label: "Weather",
    icon: "mdi:weather-partly-cloudy",
    order: 301
  },
  {
    key: "radio",
    domain: "media_player",
    section: "radio",
    label: "Radio",
    icon: "mdi:radio",
    order: 320
  }
].sort((e, t) => e.order - t.order), Se = Object.fromEntries(
  k.map((e) => [e.key, e])
), Te = Object.fromEntries(
  ne.map((e) => [e, []])
);
for (const e of k)
  Te[e.section].push(e);
function q(e = 1, t = 12) {
  return Array.from({ length: t - e + 1 }, (i, r) => e + r);
}
function yt(e) {
  return e < 10 ? `mdi:numeric-${e}-box-outline` : "mdi:counter";
}
function g(e, t, i, r, n, o = !1, a = []) {
  return {
    key: e,
    domain: "sensor",
    section: t,
    label: i,
    icon: r,
    optional: o,
    diagnostic: t === "diagnostics",
    aliases: a,
    order: n
  };
}
function J(e, t, i, r, n, o = !1) {
  return { key: e, domain: "number", section: t, label: i, icon: r, optional: o, order: n };
}
function A(e, t, i, r, n, o = []) {
  return { key: e, domain: "switch", section: t, label: i, icon: r, aliases: o, order: n };
}
function W(e, t, i, r, n, o = !1, a = !1) {
  return {
    key: e,
    domain: "button",
    section: t,
    label: i,
    icon: r,
    optional: o,
    dangerous: a,
    order: n
  };
}
const yn = 500, ei = 250, Bi = {
  tap: "tap_action",
  hold: "hold_action",
  double_tap: "double_tap_action"
}, bn = { action: "more-info" };
function ot(e) {
  if (!(!e || typeof e != "object" || Array.isArray(e)))
    return { ...e };
}
function ti(e, t, i) {
  const r = e[Bi[t]];
  if (st(r))
    return typeof r.entity == "string" ? { ...r } : { ...r, entity: i };
}
function st(e) {
  return !!(e && e.action !== "none");
}
function wn(e, t, i) {
  const r = ti(e, t, i);
  if (!r)
    return;
  const o = { entity: typeof r.entity == "string" ? r.entity : i };
  for (const a of ["tap", "hold", "double_tap"]) {
    const s = ti(e, a, i);
    s && (o[Bi[a]] = s);
  }
  return o;
}
const $n = [
  "water_flow",
  "power",
  "outlet_temperature",
  "inlet_temperature",
  "water_consumption_total",
  "energy_consumption_total",
  "bath_fill_remaining_volume"
], bt = [
  "eco_mode",
  "child_safety_active",
  "child_safety_temperature_limit",
  "eco_flow_limit",
  "bridge_temperature_maximum"
], Ve = [
  "wellness_cold_prevention",
  "wellness_winter_pick_me_up",
  "wellness_summer_fitness",
  "wellness_circulation_boost"
], wt = [
  "bath_fill_active",
  "bath_fill_target_volume",
  "bath_fill_remaining_volume",
  "bath_fill_current_volume"
], $t = [
  "brush_timer_active",
  "brush_timer_duration",
  "brush_timer_remaining",
  "reset_brush_timer",
  "shower_timer_active",
  "shower_timer_duration",
  "shower_timer_remaining",
  "reset_shower_timer"
], St = ["repair_pairing", "disconnect_radio_pairing"], zi = [
  "state",
  "ha",
  "muted",
  "vivid",
  "custom"
], kt = [
  "water",
  "hot",
  "energy",
  "eco",
  "wellness",
  "timer",
  "weather",
  "radio",
  "safety",
  "status",
  "ok",
  "alert",
  "memory",
  "action"
], Sn = new Set(kt), kn = /^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, En = /^(?:rgb|rgba|hsl|hsla)\([-+0-9.%\s,/]+\)$/i, xn = /^var\(--[a-zA-Z0-9_-]+(?:\s*,\s*(?:#[0-9a-fA-F]{3,8}|[a-zA-Z]+))?\)$/, An = /^[a-zA-Z]+$/;
function Cn(e) {
  if (!Nn(e))
    return {};
  const t = {};
  for (const [i, r] of Object.entries(e)) {
    if (!Dn(i))
      continue;
    const n = On(r);
    n && (t[i] = n);
  }
  return t;
}
function Tn(e) {
  return kt.flatMap((t) => {
    const i = e[t];
    return i ? [`--dhe-user-icon-${t}-color: ${i};`] : [];
  }).join(" ");
}
function On(e) {
  if (typeof e != "string")
    return;
  const t = e.trim();
  if (!(!t || t.includes(";") || t.includes("{") || t.includes("}")) && (kn.test(t) || En.test(t) || xn.test(t) || An.test(t)))
    return t;
}
function Dn(e) {
  return Sn.has(e);
}
function Nn(e) {
  return !!(e && typeof e == "object" && !Array.isArray(e));
}
const Ki = new Set(ne), In = new Set(Object.keys(Se)), Rn = /* @__PURE__ */ new Set([
  "binary_sensor",
  "button",
  "climate",
  "media_player",
  "number",
  "select",
  "sensor",
  "switch",
  "text",
  "weather"
]), Bn = new Set(zi), Li = ["auto", "mini", "tablet", "panel", "kiosk"], Pi = ["auto", "compact", "normal", "large"], zn = new Set(Li), Kn = new Set(Pi);
function ie(e) {
  const t = Le(e) ? e : {};
  return {
    type: "custom:dhe-connect-card",
    device_id: Un(t.device_id),
    name: t.name,
    tap_action: ot(t.tap_action) ?? { ...bn },
    hold_action: ot(t.hold_action),
    double_tap_action: ot(t.double_tap_action),
    show_unavailable: I(t.show_unavailable, !1),
    show_optional: I(t.show_optional, !1),
    show_diagnostics: I(t.show_diagnostics, !0),
    show_dangerous_actions: I(t.show_dangerous_actions, !1),
    show_weather_services: I(t.show_weather_services, !1),
    show_icon_animations: I(t.show_icon_animations, !0),
    show_display_buttons: I(t.show_display_buttons, !1),
    show_support_mode: I(t.show_support_mode, !1),
    icon_theme: ii(t.icon_theme, Bn, "state"),
    icon_colors: Cn(t.icon_colors),
    layout_mode: ii(t.layout_mode, zn, "auto"),
    tile_size: Vn(t.tile_size),
    overview_columns: Hn(t.overview_columns, 3, 1, 6),
    sections: Ln(t.sections),
    overview_entities: Pn(t.overview_entities),
    section_entity_order: Mn(t.section_entity_order),
    hide_entities: jn(t.hide_entities),
    entities: Fn(t.entities)
  };
}
function Ln(e) {
  if (!Array.isArray(e) || !e.length)
    return [...ne];
  const t = [
    ...new Set(e.filter((i) => Ki.has(i)))
  ];
  return t.length ? t : [...ne];
}
function Pn(e) {
  return Array.isArray(e) ? Et(e) : [...$n];
}
function Mn(e) {
  if (!Le(e))
    return {};
  const t = {};
  for (const [i, r] of Object.entries(e)) {
    if (!Ki.has(i) || !Array.isArray(r))
      continue;
    const n = Et(r).filter(
      (o) => Se[o]?.section === i
    );
    n.length && (t[i] = n);
  }
  return t;
}
function Hn(e, t, i, r) {
  return typeof e != "number" || !Number.isInteger(e) ? t : Math.min(r, Math.max(i, e));
}
function jn(e) {
  return Array.isArray(e) ? Et(e) : [];
}
function Fn(e) {
  if (!Le(e))
    return {};
  const t = {};
  for (const [i, r] of Object.entries(e)) {
    const n = ct(i);
    if (typeof r == "string" && r.trim() && n) {
      t[n] = r.trim();
      continue;
    }
    if (!Le(r) || !Wn(i))
      continue;
    const o = {};
    for (const [a, s] of Object.entries(r)) {
      const c = ct(a);
      typeof s == "string" && s.trim() && c && (o[c] = s.trim());
    }
    Object.keys(o).length && (t[i] = o);
  }
  return t;
}
function ct(e) {
  if (typeof e == "string")
    return In.has(e) ? e : void 0;
}
function Et(e) {
  return [
    ...new Set(
      e.map((t) => ct(t)).filter((t) => !!t)
    )
  ];
}
function Le(e) {
  return !!(e && typeof e == "object" && !Array.isArray(e));
}
function Wn(e) {
  return typeof e == "string" && Rn.has(e);
}
function Un(e) {
  return typeof e == "string" && e.trim() ? e.trim() : void 0;
}
function I(e, t) {
  return typeof e == "boolean" ? e : t;
}
function ii(e, t, i) {
  return typeof e == "string" && t.has(e) ? e : i;
}
function Vn(e) {
  return typeof e == "string" && Kn.has(e) ? e : "auto";
}
const Yn = { button: { apply_memory: "Speicher anwenden", delete_memory: "Speicher löschen", off: "Aus", on: "Ein", press: "Ausführen", run: "Ausführen", turn_off: "Ausschalten", turn_on: "Einschalten" }, confirm: { run: "{label} ausführen?" }, editor: { action: { "call-service": "Dienst aufrufen", "more-info": "Mehr Info", navigate: "Navigieren", none: "Keine", toggle: "Umschalten", url: "URL" }, action_entity: "Aktions-Entität", action_entity_help: "Optionale Entität für Mehr-Info, Umschalten und ähnliche Aktionen.", action_type: "Aktion", action_type_help: "Legt fest, was bei dieser Interaktion passiert.", actions_help: "Konfiguriert Klick, Halten und Doppelklick.", advanced_options: "Erweiterte Optionen", advanced_options_help: "Darstellung, Diagnose und optionale Steuerung", available_overview_entities: "Verfügbare Kacheln", available_section_entities: "Verfügbare Entitäten", basic_settings: "Gerät und Darstellung", dangerous_actions: "Riskante Aktionen", dangerous_actions_help: "Zeigt Aktionen, die Gerätezustand zurücksetzen, löschen oder reparieren können.", device: "Gerät", device_help: "Pflichtfeld. Wähle das Home-Assistant-Gerät; die Entitäten werden darüber gefunden.", device_preview: "Geräte-Vorschau", device_preview_empty: "Gerät auswählen", device_preview_help: "Eingeklappte Vorschau des ausgewählten Home-Assistant-Geräts und Discovery-Status.", device_preview_loading: "Lade Entitäten", device_preview_ready: "Bereit", device_preview_selected: "DHE-Gerät ausgewählt", diagnostics: "Diagnose", diagnostics_help: "Zeigt Diagnose- und technische Geräte-Entitäten.", display_buttons: "Display-Button-Ansicht", display_buttons_help: "Stellt unterstützte Steuerungen als Kacheln ähnlich dem Gerätedisplay dar.", double_tap_action: "Doppelklick-Aktion", drag_to_reorder: "Zum Sortieren ziehen", entities: "Entitäten", entities_help: "Gefundene Entitäten anzeigen, ausblenden oder überschreiben.", entity_override: "Override", entity_override_custom: "Benutzerdefinierte Entitäts-ID", entity_override_custom_help: "Nutze dieses Feld, wenn die Ziel-Entität noch nicht in der Liste steht.", entity_override_help: "Optionale Ersatz-Entität für diese Kartenfunktion.", entity_visibility_help: "Zeigt oder versteckt diese Entität in der Karte.", hold_action: "Halten-Aktion", icon_animations: "Icon-Animationen", icon_animations_help: "Aktiviert zustandsabhängige Icon-Bewegung, wenn Bewegung erlaubt ist.", icon_color: { action: "Aktionen", alert: "Alarm", eco: "Eco", energy: "Energie", hot: "Warmwasser", memory: "Speicher", ok: "OK", radio: "Radio", safety: "Sicherheit", status: "Status", timer: "Timer", water: "Wasser", weather: "Wetter", wellness: "Wellness" }, icon_color_help: "Optionale CSS-Farbe, Hex-Wert oder Home-Assistant-Theme-Variable.", icon_theme: { _: "Icon-Theme", custom: "Eigene Farben", ha: "Home Assistant", muted: "Ruhig", state: "Statusfarben", vivid: "Kräftig" }, icon_theme_help: "Legt fest, wie stark Icons Statusfarben und dem aktiven Home-Assistant-Theme folgen.", layout_mode: { _: "Layoutmodus", auto: "Automatisch", kiosk: "Kiosk", mini: "Mini", panel: "Panel", tablet: "Tablet" }, layout_mode_help: "Passt den masonry-artigen Abschnittsfluss für Mobile, Tablet, Panel und Kiosk an.", name: "Name", name_help: "Optionaler Kartentitel für den Kartenkopf.", navigation_path: "Navigationspfad", navigation_path_help: "Dashboard-Pfad, den eine Navigationsaktion öffnet.", optional_missing: "Optionale fehlende Entitäten", optional_missing_help: "Zeigt optionale Steuerungen auch dann, wenn ihre Entität fehlt.", overview_entities: "Übersicht-Kacheln", overview_entities_help: "Wähle Übersicht-Kacheln und ziehe ausgewählte Einträge in die gewünschte Reihenfolge.", overview_entity_visibility_help: "Nimmt diese Entität in die Übersicht-Kacheln auf.", section_visibility_help: "Zeigt diesen Abschnitt und macht ihn sortierbar.", sections: "Abschnitte", sections_help: "Wähle sichtbare Abschnitte und ziehe sie in die gewünschte Reihenfolge.", selected_overview_entities: "Ausgewählte Kacheln", selected_section_entities: "Ausgewählte Entitäten", service: "Dienst", service_data: "Dienstdaten als JSON", service_data_help: "Optionales JSON-Objekt, das als Dienstdaten übergeben wird.", service_help: "Home-Assistant-Dienst oder Perform-Action-Name.", service_target_area: "Dienst-Zielbereich-IDs", service_target_area_help: "Kommagetrennte Bereichs-IDs für das Dienstziel.", service_target_device: "Dienst-Zielgeräte-IDs", service_target_device_help: "Kommagetrennte Geräte-IDs für das Dienstziel.", service_target_entity: "Dienst-Zielentität", service_target_entity_help: "Entitäts-ID für das Dienstziel.", support_mode: "Diagnose- und Supportmodus", support_mode_help: "Zeigt Support-Werkzeuge für GitHub-Issues, Entity-Audits und lokale Kompatibilitätschecks.", tap_action: "Klick-Aktion", tile_size: { _: "Kachelgröße", auto: "Automatisch", compact: "Kompakt", large: "Groß", normal: "Normal" }, tile_size_help: "Steuert die dynamische Größe von Übersicht- und Display-Kacheln.", unavailable: "Nicht verfügbare Entitäten", unavailable_help: "Zeigt Entitäten auch, wenn Home Assistant sie als nicht verfügbar oder unbekannt meldet.", url_path: "URL-Pfad", url_path_help: "URL, die eine URL-Aktion öffnet.", weather_services: "Wetterdienste", weather_services_help: "Zeigt Hilfsdienste für die Wetterfunktionen." }, entity: { memory: "Speicher {slot}", memory_delete: "Speicher {slot} löschen", memory_name: "Speicher {slot} Name", memory_temperature: "Speicher {slot} Temperatur" }, error: { action_failed: "Aktion fehlgeschlagen: {message}" }, field: { country_id: "Länder-ID", location_id: "Standort-ID", name: "Name", radio_source: "Radioquelle", result: "Ergebnis", volume: "Lautstärke", weather_service: "Wetterdienst" }, label: { current: "Aktuell {value}°", memory: "Speicher {slot}", target: "Ziel" }, overview: { delta: "{value}", group: { bath: "Bad", control: "Steuerung", energy: "Energie", saving: "Sparen", status: "Status", temperature: "Temp", timer: "Timer", water: "Wasser" }, trend: { down: "Sinkt", flat: "Stabil", up: "Steigt" } }, overview_short: { bath_fill_remaining_volume: "Badewanne", device_status: "Gerät", energy_consumption_total: "Energie", error_status: "Fehler", inlet_temperature: "Zulauf", outlet_temperature: "Auslauf", power: "Strom", water_consumption_total: "Wasser", water_flow: "Durchfluss" }, section: { actions: "Aktionen", bath: "Badewannenfüllung", consumption: "Verbrauch", controls: "Steuerung", diagnostics: "Diagnose", memory: "Temperaturspeicher", overview: "Übersicht", radio: "Radio", radio_favorites: "Radio-Favoriten", saving: "Sparmonitor", support: "Diagnose & Support", timers: "Timer", water_heating: "Warmwasser", weather: "Wetter", wellness: "Wellnessprogramme" }, service: { add_weather_favorite: "Favorit hinzufügen", remove_weather_favorite: "Favorit entfernen", search_weather_location: "Suchen", select_weather_location: "Standort auswählen", toggle_weather_favorite: "Favorit umschalten" }, state: { loading: "Lädt", not_found: "Nicht gefunden", unavailable: "Nicht verfügbar", unknown: "Unbekannt" }, status: { connection: "Verbindung {state}", device: "Gerät {state}", discovered: "Gerät erkannt", select_device: "DHE-Gerät auswählen", status: "Status {state}" }, support: { check: { active_entities: "Aktive Entitäten", base_entity: "Basis-Klimaentität", custom_element: "Karten-Custom-Element", device: "Ausgewähltes Gerät", device_registry: "Geräte-Registry", disabled_entities: "Deaktivierte oder versteckte Registry-Einträge", entity_registry: "Entity-Registry", required_entities: "Abdeckung der Pflicht-Entitäten", support_export: "Support-Paket-Export", unavailable_entities: "Nicht verfügbare Entitäten" }, compatibility: "Kompatibilitätscheck", compatibility_list: "Kompatibilitätsprüfungen", domain_distribution: "Domänenverteilung", entity_audit: "Entity-Audit", entity_audit_list: "Entity-Audit-Zeilen", entity_status: { available: "Verfügbar", missing: "Fehlt", unavailable: "Nicht verfügbar", unknown: "Unbekannt" }, export: "Support-Paket exportieren", export_hint: "Erstellt ein anonymisiertes JSON-Paket für GitHub-Issues.", integration_diagnostics: "Integrationsdiagnose", registry_status: { disabled: "Deaktiviert", enabled: "Aktiviert", hidden: "Versteckt", unknown: "Unbekannt" }, self_test: "Selbsttest", self_test_failed: "Fehlgeschlagene Checks", self_test_pass: "Alle Checks bestanden", self_test_warn: "Warnungen", stat: { available: "Verfügbar", base_entity: "Basis-Entität", config_entry: "Config Entry", device: "Gerät", mapped: "Zugeordnet", missing_required: "Pflicht fehlt", registry: "Registry", unavailable: "Nicht verfügbar" }, status: { fail: "Fehler", pass: "OK", warn: "Warnung" }, value: { no: "Nein", yes: "Ja" } }, tooltip: { decrease: "Verringern", increase: "Erhöhen", next: "Weiter", pause: "Pause", play: "Wiedergabe", previous: "Zurück" } }, Gn = { bath_fill_active: "Badewannenfüllung", bath_fill_current_volume: "Aktuelle Badewannenfüllung", bath_fill_remaining_volume: "Restmenge Badewanne", bath_fill_target_volume: "Zielmenge Badewanne", bluetooth_mac: "Bluetooth-MAC", bridge_temperature_maximum: "Maximum überbrücken (5 Min.)", brush_timer_active: "Zahnbürsten-Timer", brush_timer_duration: "Zahnbürsten-Timer Sekunden", brush_timer_remaining: "Zahnbürsten-Timer verbleibend", child_safety_active: "Kindersicherung", child_safety_temperature_limit: "Temperaturgrenze Kindersicherung", connection_state: "Verbindungsstatus", controlunit_name: "Gerätename", device_info: "Geräteinfo", device_status: "Gerätestatus", disconnect_radio_pairing: "Radio-Kopplung trennen", eco_flow_limit: "Eco-Durchflussgrenze", eco_mode: "Eco-Modus", energy_consumption_total: "Energieverbrauch gesamt", energy_consumption_week: "Energieverbrauch Woche", energy_consumption_year: "Energieverbrauch Jahr", error_status: "Fehlerstatus", inlet_temperature: "Zulauftemperatur", last_reconnect_reason: "Letzter Wiederverbindungsgrund", last_usage_cost: "Letzte Kosten", last_usage_energy: "Letzter Energieverbrauch", last_usage_time: "Letzte Nutzungsdauer", last_usage_water: "Letzter Wasserverbrauch", next_reconnect_delay: "Nächster Wiederverbindungsversuch", nominal_power: "Nennleistung", odb_actual_water_saving: "Tatsächliche Wassereinsparung", odb_heating_energy: "Heizenergie gesamt", odb_hot_water_volume: "Warmwassermenge gesamt", odb_possible_energy_saving: "Mögliche Energieeinsparung", operating_duration: "Betriebsdauer", outlet_temperature: "Auslauftemperatur", power: "Aktuelle Leistungsaufnahme", product_id: "Produkt-ID", protocol_version: "Protokollversion", radio: "Radio", reconnect_count: "Wiederverbindungen", repair_pairing: "Kopplung reparieren", reset_brush_timer: "Zahnbürsten-Timer zurücksetzen", reset_shower_timer: "Dusch-Timer zurücksetzen", saving_monitor_activation_rate: "Sparmonitor Aktivierungsrate", saving_monitor_consumption_co2: "Sparmonitor CO2-Verbrauch", saving_monitor_consumption_energy: "Sparmonitor Energieverbrauch", saving_monitor_consumption_water: "Sparmonitor Wasserverbrauch", saving_monitor_possible_co2: "Sparmonitor mögliche CO2-Einsparung", saving_monitor_possible_cost: "Sparmonitor mögliche Kosteneinsparung", saving_monitor_possible_energy: "Sparmonitor mögliche Energieeinsparung", saving_monitor_possible_water: "Sparmonitor mögliche Wassereinsparung", saving_monitor_real_co2: "Sparmonitor reale CO2-Einsparung", saving_monitor_real_cost: "Sparmonitor reale Kosteneinsparung", saving_monitor_real_energy: "Sparmonitor reale Energieeinsparung", saving_monitor_real_water: "Sparmonitor reale Wassereinsparung", scald_protection_active: "Verbrühschutz aktiv", scald_protection_temperature_limit: "Temperaturgrenze Verbrühschutz", shower_timer_active: "Dusch-Timer", shower_timer_duration: "Dusch-Timer Sekunden", shower_timer_remaining: "Dusch-Timer verbleibend", unknown: "Unbekannt", water_consumption_total: "Wasserverbrauch gesamt", water_consumption_week: "Wasserverbrauch Woche", water_consumption_year: "Wasserverbrauch Jahr", water_flow: "Aktueller Wasserfluss", water_heating: "Warmwasser", weather: "Wetter", weather_location: "Wetterstandort", wellness_circulation_boost: "Kreislauf-Boost", wellness_cold_prevention: "Kaltwasservermeidung", wellness_runtime_normalized: "Wellness-Laufzeit", wellness_summer_fitness: "Sommer-Fitness", wellness_winter_pick_me_up: "Winter-Belebung", wlan_mac: "WLAN-MAC" }, qn = {
  ui: Yn,
  entity_labels: Gn
}, Zn = { button: { apply_memory: "Apply memory", delete_memory: "Delete memory", off: "Off", on: "On", press: "Press", run: "Run", turn_off: "Turn off", turn_on: "Turn on" }, confirm: { run: "Run {label}?" }, editor: { action: { "call-service": "Call service", "more-info": "More info", navigate: "Navigate", none: "None", toggle: "Toggle", url: "URL" }, action_entity: "Action entity", action_entity_help: "Optional entity used by more-info, toggle and similar actions.", action_type: "Action", action_type_help: "Choose what happens when this interaction is triggered.", actions_help: "Configure tap, hold and double tap behavior.", advanced_options: "Advanced options", advanced_options_help: "Layout, diagnostics and optional controls", available_overview_entities: "Available tiles", available_section_entities: "Available entities", basic_settings: "Device and layout", dangerous_actions: "Dangerous actions", dangerous_actions_help: "Show controls that can reset, delete or repair device state.", device: "Device", device_help: "Required. Select the Home Assistant device; entities are discovered from this device.", device_preview: "Device preview", device_preview_empty: "Select a device", device_preview_help: "Collapsed preview of the selected Home Assistant device and discovery state.", device_preview_loading: "Loading entities", device_preview_ready: "Ready", device_preview_selected: "DHE device selected", diagnostics: "Diagnostics", diagnostics_help: "Show diagnostic and technical device entities.", display_buttons: "Display-style buttons", display_buttons_help: "Render supported controls as tiles similar to the device display.", double_tap_action: "Double tap action", drag_to_reorder: "Drag to reorder", entities: "Entities", entities_help: "Show, hide or override discovered entities.", entity_override: "Override", entity_override_custom: "Custom entity ID", entity_override_custom_help: "Use this when the target entity is not listed yet.", entity_override_help: "Optional replacement entity for this card function.", entity_visibility_help: "Show or hide this entity in the card.", hold_action: "Hold action", icon_animations: "Icon animations", icon_animations_help: "Enable state-aware icon motion when motion is allowed.", icon_color: { action: "Actions", alert: "Alert", eco: "Eco", energy: "Energy", hot: "Hot water", memory: "Memory", ok: "OK", radio: "Radio", safety: "Safety", status: "Status", timer: "Timer", water: "Water", weather: "Weather", wellness: "Wellness" }, icon_color_help: "Optional CSS color, hex value or Home Assistant theme variable.", icon_theme: { _: "Icon theme", custom: "Custom", ha: "Home Assistant", muted: "Muted", state: "State colors", vivid: "Vivid" }, icon_theme_help: "Choose how strongly icons follow state colors and the active Home Assistant theme.", layout_mode: { _: "Layout mode", auto: "Auto", kiosk: "Kiosk", mini: "Mini", panel: "Panel", tablet: "Tablet" }, layout_mode_help: "Adjust masonry-like section flow for mobile, tablet, panel and kiosk dashboards.", name: "Name", name_help: "Optional card title shown in the card header.", navigation_path: "Navigation path", navigation_path_help: "Dashboard path opened by a navigate action.", optional_missing: "Optional missing entities", optional_missing_help: "Show optional controls even when their entity is missing.", overview_entities: "Overview tiles", overview_entities_help: "Select overview tiles and drag selected entries into the display order.", overview_entity_visibility_help: "Include this entity in the overview tiles.", section_visibility_help: "Show this section and make it available for ordering.", sections: "Sections", sections_help: "Choose visible sections and drag them into the card order.", selected_overview_entities: "Selected tiles", selected_section_entities: "Selected entities", service: "Service", service_data: "Service data JSON", service_data_help: "Optional JSON object passed as service data.", service_help: "Home Assistant service or perform-action name.", service_target_area: "Service target area IDs", service_target_area_help: "Comma-separated area IDs for the service target.", service_target_device: "Service target device IDs", service_target_device_help: "Comma-separated device IDs for the service target.", service_target_entity: "Service target entity", service_target_entity_help: "Entity ID used as the service target.", support_mode: "Diagnostics & support mode", support_mode_help: "Shows support tools for issue reports, entity audits and local compatibility checks.", tap_action: "Tap action", tile_size: { _: "Tile size", auto: "Auto", compact: "Compact", large: "Large", normal: "Normal" }, tile_size_help: "Controls dynamic overview and display tile sizing.", unavailable: "Unavailable entities", unavailable_help: "Show entities even when Home Assistant reports unavailable or unknown.", url_path: "URL path", url_path_help: "URL opened by a URL action.", weather_services: "Weather services", weather_services_help: "Show weather helper service controls." }, entity: { memory: "Memory {slot}", memory_delete: "Delete memory {slot}", memory_name: "Memory {slot} name", memory_temperature: "Memory {slot} temperature" }, error: { action_failed: "Action failed: {message}" }, field: { country_id: "Country ID", location_id: "Location ID", name: "Name", radio_source: "Radio source", result: "Result", volume: "Volume", weather_service: "Weather service" }, label: { current: "Current {value}°", memory: "Memory {slot}", target: "Target" }, overview: { delta: "{value}", group: { bath: "Bath", control: "Control", energy: "Energy", saving: "Saving", status: "Status", temperature: "Temp", timer: "Timer", water: "Water" }, trend: { down: "Down", flat: "Flat", up: "Up" } }, overview_short: { bath_fill_remaining_volume: "Bath left", device_status: "Device", energy_consumption_total: "Energy", error_status: "Error", inlet_temperature: "Inlet", outlet_temperature: "Outlet", power: "Power", water_consumption_total: "Water", water_flow: "Flow" }, section: { actions: "Actions", bath: "Bath fill", consumption: "Consumption", controls: "Controls", diagnostics: "Diagnostics", memory: "Temperature memories", overview: "Overview", radio: "Radio", radio_favorites: "Radio favorites", saving: "Saving monitor", support: "Diagnostics & support", timers: "Timers", water_heating: "Water heating", weather: "Weather", wellness: "Wellness programs" }, service: { add_weather_favorite: "Add favorite", remove_weather_favorite: "Remove favorite", search_weather_location: "Search", select_weather_location: "Select location", toggle_weather_favorite: "Toggle favorite" }, state: { loading: "Loading", not_found: "Not found", unavailable: "Unavailable", unknown: "Unknown" }, status: { connection: "Connection {state}", device: "Device {state}", discovered: "Device discovered", select_device: "Select a DHE device", status: "Status {state}" }, support: { check: { active_entities: "Active entities", base_entity: "Base climate entity", custom_element: "Card custom element", device: "Selected device", device_registry: "Device registry", disabled_entities: "Disabled or hidden registry entries", entity_registry: "Entity registry", required_entities: "Required entity coverage", support_export: "Support package export", unavailable_entities: "Unavailable entities" }, compatibility: "Compatibility checker", compatibility_list: "Compatibility checks", domain_distribution: "Domain distribution", entity_audit: "Entity audit", entity_audit_list: "Entity audit rows", entity_status: { available: "Available", missing: "Missing", unavailable: "Unavailable", unknown: "Unknown" }, export: "Export support package", export_hint: "Creates an anonymized JSON package for GitHub issues.", integration_diagnostics: "Integration diagnostics", registry_status: { disabled: "Disabled", enabled: "Enabled", hidden: "Hidden", unknown: "Unknown" }, self_test: "Self-test", self_test_failed: "Failed checks", self_test_pass: "All checks passed", self_test_warn: "Warnings", stat: { available: "Available", base_entity: "Base entity", config_entry: "Config entry", device: "Device", mapped: "Mapped", missing_required: "Missing required", registry: "Registry", unavailable: "Unavailable" }, status: { fail: "Fail", pass: "Pass", warn: "Warn" }, value: { no: "No", yes: "Yes" } }, tooltip: { decrease: "Decrease", increase: "Increase", next: "Next", pause: "Pause", play: "Play", previous: "Previous" } }, Jn = { bath_fill_active: "Bath fill", bath_fill_current_volume: "Current bath fill volume", bath_fill_remaining_volume: "Bath fill remaining", bath_fill_target_volume: "Bath fill target volume", bluetooth_mac: "Bluetooth MAC", bridge_temperature_maximum: "Bridge maximum temperature (5 min)", brush_timer_active: "Brush timer", brush_timer_duration: "Brush timer seconds", brush_timer_remaining: "Brush timer remaining", child_safety_active: "Child safety", child_safety_temperature_limit: "Child safety temperature limit", connection_state: "Connection state", controlunit_name: "Device name", device_info: "Device info", device_status: "Device status", disconnect_radio_pairing: "Disconnect radio pairing", eco_flow_limit: "Eco flow limit", eco_mode: "Eco mode", energy_consumption_total: "Total energy consumption", energy_consumption_week: "Energy consumption week", energy_consumption_year: "Energy consumption year", error_status: "Error status", inlet_temperature: "Inlet temperature", last_reconnect_reason: "Last reconnect reason", last_usage_cost: "Last usage cost", last_usage_energy: "Last usage energy", last_usage_time: "Last usage duration", last_usage_water: "Last usage water", next_reconnect_delay: "Next reconnect delay", nominal_power: "Nominal power", odb_actual_water_saving: "Actual water saving", odb_heating_energy: "Total heating energy", odb_hot_water_volume: "Total hot water volume", odb_possible_energy_saving: "Possible energy saving", operating_duration: "Operating duration", outlet_temperature: "Outlet temperature", power: "Current power consumption", product_id: "Product ID", protocol_version: "Protocol version", radio: "Radio", reconnect_count: "Reconnects", repair_pairing: "Repair pairing", reset_brush_timer: "Reset brush timer", reset_shower_timer: "Reset shower timer", saving_monitor_activation_rate: "Saving monitor activation rate", saving_monitor_consumption_co2: "Saving monitor consumption CO2", saving_monitor_consumption_energy: "Saving monitor consumption energy", saving_monitor_consumption_water: "Saving monitor consumption water", saving_monitor_possible_co2: "Saving monitor possible CO2 saving", saving_monitor_possible_cost: "Saving monitor possible cost saving", saving_monitor_possible_energy: "Saving monitor possible energy saving", saving_monitor_possible_water: "Saving monitor possible water saving", saving_monitor_real_co2: "Saving monitor real CO2 saving", saving_monitor_real_cost: "Saving monitor real cost saving", saving_monitor_real_energy: "Saving monitor real energy saving", saving_monitor_real_water: "Saving monitor real water saving", scald_protection_active: "Scald protection active", scald_protection_temperature_limit: "Scald protection temperature limit", shower_timer_active: "Shower timer", shower_timer_duration: "Shower timer seconds", shower_timer_remaining: "Shower timer remaining", unknown: "Unknown", water_consumption_total: "Total water consumption", water_consumption_week: "Water consumption week", water_consumption_year: "Water consumption year", water_flow: "Current water flow", water_heating: "Water heating", weather: "Weather", weather_location: "Weather location", wellness_circulation_boost: "Circulation boost", wellness_cold_prevention: "Cold prevention", wellness_runtime_normalized: "Wellness runtime", wellness_summer_fitness: "Summer fitness", wellness_winter_pick_me_up: "Winter pick-me-up", wlan_mac: "WLAN MAC" }, Xn = {
  ui: Zn,
  entity_labels: Jn
}, ke = "dhe-connect-card-translations-changed", Y = {
  de: lt(qn),
  en: lt(Xn)
}, Mi = {};
Y.de.ui, Y.en.ui;
Y.de.entityLabels, Y.en.entityLabels;
const Qn = [
  [/^temperature_memory_(\d+)$/, "entity.memory"],
  [/^temperature_memory_(\d+)_name$/, "entity.memory_name"],
  [/^temperature_memory_(\d+)_temperature$/, "entity.memory_temperature"],
  [/^delete_temperature_memory_(\d+)$/, "entity.memory_delete"]
];
function Hi(e, t) {
  const i = Ct(e);
  i && (Mi[i] = lt(t), ao(i));
}
function ji(e) {
  for (const [t, i] of Object.entries(e))
    Hi(t, i);
}
function eo(e) {
  return xt(e).split("-", 1)[0] || "en";
}
function xt(e) {
  const t = e?.locale?.language ?? (typeof navigator < "u" ? navigator.language : "") ?? "";
  return Ct(t) || "en";
}
function d(e, t, i = {}) {
  return so(
    io(xt(e), t) ?? t,
    i
  );
}
function O(e, t) {
  return d(t, `section.${e}`);
}
function At(e, t) {
  for (const [i, r] of Qn) {
    const n = e.key.match(i);
    if (n?.[1])
      return d(t, r, { slot: n[1] });
  }
  return ro(xt(t), e.key) ?? e.label;
}
function to(e, t, i) {
  const r = `overview_short.${e.key}`, n = d(t, r);
  return n === r ? i : n;
}
function io(e, t) {
  for (const i of Fi(e)) {
    const r = i.ui[t];
    if (r)
      return r;
  }
}
function ro(e, t) {
  for (const i of Fi(e)) {
    const r = i.entityLabels[t];
    if (r)
      return r;
  }
}
function Fi(e) {
  const t = [];
  for (const i of no(e)) {
    const r = Mi[i];
    r && t.push(r);
    const n = Y[i];
    n && !t.includes(n) && t.push(n);
  }
  return t.includes(Y.en) || t.push(Y.en), t;
}
function no(e) {
  const t = Ct(e), i = t.split("-", 1)[0] ?? "";
  return [...new Set([t, i, "en"].filter(Boolean))];
}
function Ct(e) {
  return e.trim().toLowerCase().replace(/_/g, "-");
}
function lt(e) {
  const t = Pe(e) ? e : {};
  return {
    ui: Wi(Pe(t.ui) ? t.ui : {}),
    entityLabels: oo(t.entity_labels)
  };
}
function Wi(e, t = "") {
  const i = {};
  for (const [r, n] of Object.entries(e)) {
    const o = r === "_" ? t : t ? `${t}.${r}` : r;
    if (typeof n == "string") {
      o && (i[o] = n);
      continue;
    }
    Pe(n) && Object.assign(i, Wi(n, o));
  }
  return i;
}
function oo(e) {
  if (!Pe(e))
    return {};
  const t = {};
  for (const [i, r] of Object.entries(e))
    typeof r == "string" && (t[i] = r);
  return t;
}
function ao(e) {
  typeof window > "u" || window.dispatchEvent(
    new CustomEvent(ke, {
      detail: { language: e }
    })
  );
}
function Pe(e) {
  return !!(e && typeof e == "object" && !Array.isArray(e));
}
function so(e, t) {
  return e.replace(
    /\{([a-z_]+)\}/g,
    (i, r) => Object.prototype.hasOwnProperty.call(t, r) ? String(t[r]) : i
  );
}
const co = /* @__PURE__ */ new Set(["unavailable"]), Ui = /^(?:(?:stiebel(?:\s+eltron)?|stiebel-eltron)\s+)?dhe[\s_-]*connect\b/i, lo = /^(?:\s*(?:card|integration|durchlauferhitzer|water\s+heater))?(?:\s*[-:–—/|]\s*|\s+|$)/i;
function b(e, t = "") {
  const i = Me(e);
  if (!i)
    return t.trim();
  const r = ri(i);
  if (r)
    return r;
  const n = Me(t);
  return !n || n === i ? "" : ri(n) || n;
}
function uo(e) {
  const t = Me(e);
  return !!(t && Ui.test(t));
}
function ri(e) {
  let t = Me(e);
  if (!t)
    return "";
  for (let i = 0; i < 4; i += 1) {
    const r = t.replace(Ui, "");
    if (r === t)
      break;
    t = r.replace(lo, "").trim();
  }
  return Vi(t);
}
function C(e, t, i) {
  const r = At(e, i).trim(), n = po(i, t) ?? t?.attributes.friendly_name, o = b(n, r) || r;
  return eo(i) === "de" && uo(n) && mo(e, o) ? r : o;
}
function D(e, t) {
  if (!t)
    return d(e, "state.not_found");
  const i = e.formatEntityState?.(t);
  if (i)
    return b(i) || d(e, "state.unknown");
  const r = _o(e, t.state);
  if (r)
    return r;
  const n = b(t.state) || d(e, "state.unknown"), o = t.attributes.unit_of_measurement;
  return typeof o == "string" && !co.has(t.state) ? `${n} ${o}` : n;
}
function ho(e, t, i, r) {
  const n = C(t, i, r);
  return typeof e == "string" && e.trim() && b(e, n) || n;
}
function po(e, t) {
  if (!(!e?.formatEntityName || !t))
    try {
      const i = e.formatEntityName(t, [{ type: "entity" }], {
        separator: " "
      });
      return typeof i == "string" && i.trim() ? i : void 0;
    } catch {
      return;
    }
}
function Vi(e) {
  return e.replace(/\s+/g, " ").trim();
}
function Me(e) {
  return typeof e == "string" ? Vi(e) : "";
}
function mo(e, t) {
  const i = ni(t), r = ni(e.label);
  return i === r || r.endsWith(i);
}
function ni(e) {
  return e.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
function _o(e, t) {
  switch (t) {
    case "off":
      return d(e, "button.off");
    case "on":
      return d(e, "button.on");
    case "unavailable":
      return d(e, "state.unavailable");
    case "unknown":
      return d(e, "state.unknown");
    default:
      return;
  }
}
const Yi = /* @__PURE__ */ new Set(["unavailable"]), go = /* @__PURE__ */ new Set(["heat", "heating", "on"]), fo = /* @__PURE__ */ new Set(["heating", "preheating"]);
function Ye(e) {
  return e.includes(".") ? e.split(".").slice(1).join(".") : e;
}
function ve(e) {
  return e.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
function Tt(e, t) {
  if (!t)
    return;
  const r = (e.states && typeof e.states == "object" && !Array.isArray(e.states) ? e.states : {})[t];
  if (!(!r || typeof r != "object"))
    return {
      ...r,
      state: typeof r.state == "string" ? r.state : "unknown",
      attributes: r.attributes && typeof r.attributes == "object" && !Array.isArray(r.attributes) ? r.attributes : {},
      entity_id: t
    };
}
function L(e) {
  return !e || Yi.has(e.state);
}
function Ge(e) {
  if (!e || L(e))
    return !1;
  const t = e.attributes.hvac_action;
  return typeof t == "string" ? fo.has(t.toLowerCase()) : go.has(e.state.toLowerCase());
}
function K(e) {
  if (!(!e || Yi.has(e.state)))
    return qe(e.state);
}
function w(e, t) {
  return qe(e?.attributes[t]);
}
function qe(e) {
  if (typeof e == "number")
    return Number.isFinite(e) ? e : void 0;
  if (typeof e != "string" || !e.trim())
    return;
  const t = Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function Ee(e) {
  return e?.state === "on" || e?.state === "heat" || e?.state === "playing";
}
function Ot(e, t, i) {
  return Math.min(Math.max(e, t), i);
}
function Gi(e, t) {
  if (!Number.isFinite(t) || t <= 0)
    return e;
  const i = Math.max(0, String(t).split(".")[1]?.length ?? 0);
  return Number((Math.round(e / t) * t).toFixed(i));
}
function qi(e) {
  return [
    e.key,
    e.label,
    ...e.aliases ?? []
  ].map(ve).filter((t, i, r) => !!t && r.indexOf(t) === i);
}
function Zi(e, t, i) {
  const r = qi(e), n = ve(Ye(t)), o = typeof i?.translation_key == "string" ? ve(i.translation_key) : "", a = typeof i?.unique_id == "string" ? ve(i.unique_id) : "";
  let s = 0;
  return o && r.includes(o) && (s += 80), a && r.some((c) => a === c || a.endsWith(`_${c}`)) && (s += 75), r.some((c) => n === c || n.endsWith(`_${c}`)) && (s += 45), s;
}
function vo(e, t, i) {
  return Zi(e, t, i) > 0;
}
const Ze = "stiebel_dhe_connect", yo = new Set(
  k.map((e) => e.domain)
);
function Ji(e, t) {
  const i = xo(e), r = new Set(t.hide_entities), n = t.device_id ?? null, o = ai(e, i, n), s = So(
    e,
    i,
    oi(t, "water_heating", "climate"),
    "climate",
    n
  ) ?? bo(e, t, o.climate ?? []), c = oe(e, s), u = n ?? c?.device_id ?? void 0, f = s ? To(s) : [], h = {}, v = Ao(e, u ?? null), p = (u ?? null) === n ? o : ai(e, i, u ?? null);
  for (const _ of k) {
    if (r.has(_.key))
      continue;
    const $ = oi(t, _.key, _.domain), S = Xi(i, $, _.domain);
    if (S) {
      h[_.key] = S;
      continue;
    }
    if (_.key === "water_heating" && s) {
      h[_.key] = s;
      continue;
    }
    const Z = wo(
      e,
      i,
      _,
      u ?? null,
      f,
      p[_.domain] ?? []
    );
    if (Z) {
      h[_.key] = Z;
      continue;
    }
    if (_.diagnostic) {
      const H = v.get(_.key);
      H && (h[_.key] = H);
    }
  }
  const y = c?.config_entry_id ?? Object.values(h).map((_) => oe(e, _)?.config_entry_id).find((_) => typeof _ == "string" && _.length > 0);
  return {
    baseEntity: s,
    configEntryId: y,
    deviceId: u ?? void 0,
    entityIds: h,
    definitions: k
  };
}
function oi(e, t, i) {
  const r = e.entities[t];
  if (typeof r == "string")
    return r;
  const n = e.entities[i];
  if (typeof n == "string" && t === i)
    return n;
  if (n && typeof n == "object") {
    const o = n[t];
    if (typeof o == "string")
      return o;
  }
}
function bo(e, t, i) {
  const r = i, n = t.device_id, o = r.find((a) => {
    const s = oe(e, a);
    return s?.platform === Ze && (!n || s.device_id === n);
  });
  return o || r.find((a) => {
    const s = Ye(a);
    return s.includes("dhe") || s.includes("stiebel");
  });
}
function wo(e, t, i, r, n, o) {
  let a;
  for (const s of o) {
    const c = $o(e, t, s, i, r, n);
    c <= 0 || (!a || c > a.score || c === a.score && s < a.entityId) && (a = { entityId: s, score: c });
  }
  return a?.entityId;
}
function $o(e, t, i, r, n, o) {
  const a = oe(e, i), s = Ye(i), c = qi(r);
  let u = Zi(r, i, a), f = 0;
  a?.platform === Ze && (f += 20), n && a?.device_id === n && (f += 50), o.some(
    (v) => c.some((p) => s === `${v}_${p}`)
  ) && (u += 25);
  const h = Eo(t, i);
  return typeof h == "string" && c.some((v) => ve(h).includes(v)) && (u += 15), u > 0 ? f + u : 0;
}
function oe(e, t) {
  if (t)
    return e.entities?.[t];
}
function Xi(e, t, i) {
  if (!(!t || !e[t]) && !(i && !t.startsWith(`${i}.`)))
    return t;
}
function So(e, t, i, r, n) {
  const o = Xi(t, i, r);
  if (o)
    return Dt(e, o, n) ? o : void 0;
}
function Dt(e, t, i) {
  if (!i)
    return !0;
  const r = oe(e, t);
  return !r?.device_id || r.device_id === i;
}
function ko(e, t) {
  const i = oe(e, t);
  return !i?.disabled_by && !i?.hidden_by && i?.hidden !== !0;
}
function Eo(e, t) {
  const i = e[t];
  if (!i || typeof i != "object" || Array.isArray(i))
    return;
  const r = i.attributes;
  if (!(!r || typeof r != "object" || Array.isArray(r)))
    return r.friendly_name;
}
function xo(e) {
  return e.states && typeof e.states == "object" && !Array.isArray(e.states) ? e.states : {};
}
function ai(e, t, i) {
  const r = {};
  for (const n of Object.keys(t)) {
    const o = Qi(n);
    o && ko(e, n) && Dt(e, n, i) && (r[o] ??= []).push(n);
  }
  return r;
}
function Qi(e) {
  const [t] = e.split(".", 1);
  return t && yo.has(t) ? t : void 0;
}
function Ao(e, t) {
  const i = /* @__PURE__ */ new Map(), r = e.entities ?? {};
  for (const [n, o] of Object.entries(r)) {
    const a = Qi(n);
    if (!a || !Dt(e, n, t) || o?.hidden === !0 || o?.hidden_by || o?.disabled_by === "user")
      continue;
    const s = Co(n, a, o);
    if (!s)
      continue;
    const c = i.get(s);
    (!c || n < c) && i.set(s, n);
  }
  return i;
}
function Co(e, t, i) {
  const r = typeof i?.translation_key == "string" && i.translation_key.trim() ? i.translation_key.trim() : void 0;
  if (r && k.some(
    (o) => o.domain === t && o.key === r
  ))
    return r;
  const n = typeof i?.unique_id == "string" ? i.unique_id : "";
  if (n) {
    for (const o of k)
      if (o.domain === t && (n.endsWith(`_${o.key}`) || e.endsWith(`_${o.key}`)))
        return o.key;
  }
}
function To(e) {
  const t = Ye(e), i = t.split("_").filter(Boolean), r = /* @__PURE__ */ new Set();
  return i.length > 1 && r.add(i.slice(0, -1).join("_")), i.length > 2 && r.add(i.slice(0, -2).join("_")), r.add(t.replace(/_(setpoint|water_heating|durchlauferhitzer)$/, "")), [...r].filter(Boolean);
}
const Oo = new Set(k.map((e) => e.domain));
class er {
  constructor() {
    this._registrySignatureCache = "", this._stateSignatureCache = "";
  }
  get(t, i) {
    const r = Do(i);
    if (this._entry && this._entry.configSignature === r && this._registrySource === t.entities && this._stateSource === t.states)
      return this._entry.discovered;
    const n = this._registrySignature(t), o = this._stateSignature(t);
    if (this._entry && this._entry.configSignature === r && this._entry.registrySignature === n && this._entry.stateSignature === o)
      return this._entry.discovered;
    const a = Ji(t, i);
    return this._entry = {
      configSignature: r,
      registrySignature: n,
      stateSignature: o,
      discovered: a
    }, a;
  }
  clear() {
    this._entry = void 0, this._registrySource = void 0, this._registrySignatureCache = "", this._stateSource = void 0, this._stateSignatureCache = "";
  }
  _registrySignature(t) {
    const i = t.entities;
    return this._registrySource === i ? this._registrySignatureCache : (this._registrySource = i, this._registrySignatureCache = No(t), this._registrySignatureCache);
  }
  _stateSignature(t) {
    const i = t.states;
    return this._stateSource === i ? this._stateSignatureCache : (this._stateSource = i, this._stateSignatureCache = Io(t), this._stateSignatureCache);
  }
}
function Do(e) {
  return JSON.stringify({
    device_id: e.device_id ?? "",
    hide_entities: e.hide_entities,
    entities: e.entities
  });
}
function No(e) {
  const t = e.entities ?? {};
  let i = "";
  for (const r in t) {
    if (!ir(t, r) || !tr(r))
      continue;
    const n = t[r];
    i += `${r}${n?.config_entry_id ?? ""}${n?.device_id ?? ""}${n?.disabled_by ?? ""}${n?.hidden === !0 ? "1" : ""}${n?.hidden_by ?? ""}${n?.platform ?? ""}${n?.translation_key ?? ""}${n?.unique_id ?? ""}`;
  }
  return i;
}
function Io(e) {
  const t = e.states && typeof e.states == "object" ? e.states : {};
  let i = "";
  for (const r in t) {
    if (!ir(t, r) || !tr(r))
      continue;
    const n = t[r], o = n?.attributes && typeof n.attributes == "object" && !Array.isArray(n.attributes) ? n.attributes.friendly_name ?? "" : "";
    i += `${r}${typeof o == "string" ? o : ""}`;
  }
  return i;
}
function tr(e) {
  const t = e.indexOf(".");
  if (t <= 0)
    return !1;
  const i = e.slice(0, t);
  return i ? Oo.has(i) : !1;
}
function ir(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
const rr = [
  "more-info",
  "toggle",
  "navigate",
  "url",
  "call-service",
  "none"
];
function nr(e, t) {
  const i = typeof e?.action == "string" ? e.action : void 0;
  return i === "perform-action" ? "call-service" : or(i) ? i : t === "tap_action" ? "more-info" : "none";
}
function Ro(e, t) {
  const i = or(t.action) ? t.action : nr(t, e);
  if (i === "none")
    return e === "tap_action" ? { action: i } : void 0;
  const r = { action: i };
  return De(t, r, "entity"), i === "navigate" && De(t, r, "navigation_path"), i === "url" && De(t, r, "url_path"), i === "call-service" && (r.action = "perform-action", De(t, r, "perform_action", t.service ?? t.perform_action), ci(t, r, "target"), ci(t, r, "data")), r;
}
function si(e, t) {
  if (!Oe(e))
    return "";
  const i = e[t];
  return typeof i == "string" ? i : Array.isArray(i) ? i.filter((r) => typeof r == "string").join(", ") : "";
}
function Bo(e, t, i) {
  const r = Oe(e) ? { ...e } : {}, n = Lo(i ?? "");
  return n.length ? r[t] = n.length === 1 ? n[0] : n : delete r[t], Object.keys(r).length ? r : void 0;
}
function zo(e) {
  return Oe(e) ? JSON.stringify(e, null, 2) : "";
}
function Ko(e) {
  if (!e.trim())
    return { valid: !0 };
  try {
    const t = JSON.parse(e);
    return Oe(t) ? { valid: !0, value: t } : { valid: !1 };
  } catch {
    return { valid: !1 };
  }
}
function De(e, t, i, r = e[i]) {
  const n = r;
  typeof n == "string" && n.trim() && (t[i] = n.trim());
}
function ci(e, t, i) {
  const r = e[i];
  Oe(r) && Object.keys(r).length && (t[i] = { ...r });
}
function Lo(e) {
  return e.split(/[\n,]/).map((t) => t.trim()).filter(Boolean);
}
function or(e) {
  return typeof e == "string" && rr.includes(e);
}
function Oe(e) {
  return !!(e && typeof e == "object" && !Array.isArray(e));
}
const Po = (e) => e ?? m;
function E(e, t) {
  const i = t.count !== void 0, r = t.helpKey ? d(e, t.helpKey) : void 0, n = ["editor-foldout", t.className].filter(Boolean).join(" ");
  return l`
    <details class=${n} ?open=${!!t.open}>
      <summary>
        <span class="summary-label">
          <span>${d(e, t.titleKey)}</span>
          ${t.helpKey ? sr(e, t.helpKey) : ""}
        </span>
        ${i || r ? l`
              <small class=${[
    "summary-meta",
    i && r ? "with-count-and-help" : ""
  ].filter(Boolean).join(" ")}>
                ${i ? l`<span class="summary-count">${t.count}</span>` : ""}
                ${r ? l`<span class="summary-help">${r}</span>` : ""}
              </small>
            ` : ""}
      </summary>
      <div class="editor-foldout-content">${t.content}</div>
    </details>
  `;
}
function U(e, t, i, r, n = "") {
  return l`
    <div class=${["ha-form-row", n].filter(Boolean).join(" ")}>
      ${ar(e, t, i)}
      ${r}
    </div>
  `;
}
function Mo(e, t, i, r) {
  return l`
    <div class="action-textarea-row">
      ${ar(e, t, i)}
      ${r}
    </div>
  `;
}
function Je(e, t, i, r, n = {}) {
  const o = n.isLocalizedText ? t : d(e, t), a = n.helpKey ? d(e, n.helpKey) : void 0;
  return l`
    <ha-formfield
      class="switch-formfield"
      .label=${o}
      title=${a ?? o}
      aria-label=${a ?? o}
    >
      <ha-switch
        .checked=${i}
        aria-label=${a ?? o}
        @click=${dt}
        @change=${(c) => {
    c.stopPropagation(), r(c);
  }}
      ></ha-switch>
      <span slot="label" class="switch-formfield-label">${o}</span>
      ${a ? cr(a, "label") : ""}
    </ha-formfield>
  `;
}
function ar(e, t, i) {
  return l`
    <span class="field-label">
      <span>${d(e, t)}</span>
      ${i ? sr(e, i) : ""}
    </span>
  `;
}
function sr(e, t) {
  return cr(d(e, t));
}
function cr(e, t) {
  const i = l`<ha-icon icon="mdi:information-outline" aria-hidden="true"></ha-icon>`;
  return l`
    <button
      class="help-icon"
      type="button"
      slot=${Po(t)}
      title=${e}
      aria-label=${e}
      @click=${dt}
      @pointerdown=${dt}
      @keydown=${Ho}
    >
      ${i}
    </button>
  `;
}
function dt(e) {
  e.stopPropagation();
}
function Ho(e) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), e.stopPropagation());
}
function Xe(e) {
  const t = li(e.target);
  if (t !== void 0)
    return t;
  const i = li(e.currentTarget);
  return i !== void 0 ? i : !1;
}
function ge(e) {
  const t = He(e.target);
  if (typeof t == "string")
    return t;
  const i = He(e.currentTarget);
  return typeof i == "string" ? i : "";
}
function jo(e) {
  const t = e.detail;
  return typeof t?.value == "string" ? t.value : ge(e);
}
function Ne(e) {
  const i = e.detail?.value;
  if (typeof i == "string")
    return i || void 0;
  const r = He(e.target);
  if (typeof r == "string")
    return r || void 0;
  const n = He(e.currentTarget);
  return typeof n == "string" && n || void 0;
}
function Fo(e) {
  return typeof e == "string" ? e : "";
}
function li(e) {
  if (!e)
    return;
  const t = e.checked;
  return typeof t == "boolean" ? t : void 0;
}
function He(e) {
  if (!e)
    return;
  const t = e.value;
  return typeof t == "string" ? t : void 0;
}
const Wo = {
  device: {
    filter: [{ integration: Ze }],
    entity: [{ domain: "climate" }]
  }
}, Uo = {
  text: {}
}, Vo = [
  { key: "show_diagnostics", labelKey: "editor.diagnostics" },
  { key: "show_weather_services", labelKey: "editor.weather_services" },
  { key: "show_icon_animations", labelKey: "editor.icon_animations" },
  { key: "show_display_buttons", labelKey: "editor.display_buttons" },
  { key: "show_support_mode", labelKey: "editor.support_mode" },
  { key: "show_dangerous_actions", labelKey: "editor.dangerous_actions" },
  { key: "show_unavailable", labelKey: "editor.unavailable" },
  { key: "show_optional", labelKey: "editor.optional_missing" }
], Yo = [
  {
    key: "layout_mode",
    labelKey: "editor.layout_mode",
    options: Li
  },
  {
    key: "tile_size",
    labelKey: "editor.tile_size",
    options: Pi
  },
  {
    key: "icon_theme",
    labelKey: "editor.icon_theme",
    options: zi
  }
];
function Go(e) {
  return l`
    <section class="editor-section basic-editor">
      <h3>${d(e.hass, "editor.basic_settings")}</h3>
      <div class="ha-form-list">
        <ha-selector
          class="ha-picker-control"
          .hass=${e.hass}
          .label=${d(e.hass, "editor.device")}
          .helper=${d(e.hass, "editor.device_help")}
          .selector=${Wo}
          .value=${e.config.device_id ?? ""}
          .required=${!0}
          @value-changed=${e.deviceChanged}
        ></ha-selector>
        ${qo(e)}
        <ha-selector
          class="ha-picker-control"
          data-editor-field="name"
          .hass=${e.hass}
          .label=${d(e.hass, "editor.name")}
          .helper=${d(e.hass, "editor.name_help")}
          .selector=${Uo}
          .value=${Fo(e.config.name)}
          @value-changed=${e.nameChanged}
          @change=${e.nameChanged}
        ></ha-selector>
      </div>

      ${E(e.hass, {
    className: "advanced-editor",
    titleKey: "editor.advanced_options",
    helpKey: "editor.advanced_options_help",
    content: l`
          <div class="advanced-group advanced-selects">
            ${Yo.map((t) => Zo(e, t))}
          </div>
          ${e.config.icon_theme === "custom" ? l`<div class="advanced-group">${Jo(e)}</div>` : ""}
          <div class="advanced-group checks">
            ${Vo.map((t) => ea(e, t))}
          </div>
        `
  })}
    </section>
  `;
}
function qo(e) {
  const t = !!e.config.device_id, i = t ? e.devicePreviewReady ? "editor.device_preview_ready" : "editor.device_preview_loading" : "editor.device_preview_empty", r = e.devicePreviewLabel || d(
    e.hass,
    t ? "editor.device_preview_selected" : "status.select_device"
  );
  return E(e.hass, {
    className: "device-preview-foldout",
    titleKey: "editor.device_preview",
    helpKey: "editor.device_preview_help",
    count: d(e.hass, i),
    content: l`
      <div class="device-preview">
        <ha-icon icon=${t ? "mdi:check-circle-outline" : "mdi:devices-off"}></ha-icon>
        <div>
          <strong>${r}</strong>
          <span>${d(e.hass, i)}</span>
        </div>
      </div>
    `
  });
}
function Zo(e, t) {
  const i = String(e.config[t.key]), r = d(e.hass, t.labelKey);
  return U(
    e.hass,
    t.labelKey,
    `${t.labelKey}_help`,
    l`
      <select
        data-option-key=${t.key}
        .value=${i}
        aria-label=${r}
        @change=${(n) => e.selectChanged(t.key, n.target.value)}
      >
        ${t.options.map(
      (n) => l`
            <option value=${n} ?selected=${n === i}>
              ${d(e.hass, `${t.labelKey}.${n}`)}
            </option>
          `
    )}
      </select>
    `
  );
}
function Jo(e) {
  return l`
    <div class="icon-color-grid">
      ${kt.map((t) => Xo(e, t))}
    </div>
  `;
}
function Xo(e, t) {
  const i = e.config.icon_colors[t] ?? "";
  return U(
    e.hass,
    `editor.icon_color.${t}`,
    "editor.icon_color_help",
    l`
      <div class="icon-color-control" style=${i ? `--dhe-editor-icon-color: ${i};` : ""}>
        <span class="icon-color-swatch" aria-hidden="true"></span>
        <ha-textfield
          data-icon-color-tone=${t}
          .value=${i}
          aria-label=${d(e.hass, `editor.icon_color.${t}`)}
          .placeholder=${Qo(t)}
          .helper=${d(e.hass, "editor.icon_color_help")}
          helperPersistent
          @change=${(r) => e.iconColorChanged(t, r)}
        ></ha-textfield>
      </div>
    `,
    "icon-color-row"
  );
}
function Qo(e) {
  return `var(--dhe-${e}-color)`;
}
function ea(e, t) {
  const i = !!e.config[t.key];
  return Je(
    e.hass,
    t.labelKey,
    i,
    (r) => e.checkboxChanged(t.key, Xe(r)),
    { helpKey: `${t.labelKey}_help` }
  );
}
const lr = "application/x-dhe-connect-section", dr = "application/x-dhe-connect-overview-entity";
function ta(e) {
  const t = oa(e.sections), i = d(e.hass, "editor.drag_to_reorder");
  return l`
    <section class="sections-editor">
      ${E(e.hass, {
    className: "sections-foldout",
    titleKey: "editor.sections",
    helpKey: "editor.sections_help",
    count: e.sections.length,
    content: l`
          <div class="order-list section-order-list">
            ${x(
      t,
      (r) => r,
      (r) => na(e, r, i)
    )}
          </div>
        `
  })}
    </section>
  `;
}
function ia(e) {
  const t = ca(e.activeEntityKeys), i = la(
    e.overviewEntities,
    t
  ), r = i.map((s) => s.key), n = new Set(r), o = t.filter(
    (s) => !n.has(s.key)
  ), a = d(e.hass, "editor.drag_to_reorder");
  return l`
    <section class="overview-editor">
      ${E(e.hass, {
    className: "overview-foldout",
    titleKey: "editor.overview_entities",
    helpKey: "editor.overview_entities_help",
    count: i.length,
    content: l`
          <div class="overview-entity-groups">
            ${i.length ? E(e.hass, {
      className: "overview-entity-section",
      titleKey: "editor.selected_overview_entities",
      count: i.length,
      content: l`
                    <div class="order-list overview-order-list">
                      ${x(
        i,
        (s) => s.key,
        (s) => ui(
          e,
          s,
          n,
          r,
          a
        )
      )}
                    </div>
                  `
    }) : ""}
            ${o.length ? E(e.hass, {
      className: "overview-entity-section",
      titleKey: "editor.available_overview_entities",
      count: o.length,
      content: l`
                    <div class="overview-entity-grid">
                      ${x(
        o,
        (s) => s.key,
        (s) => ui(
          e,
          s,
          n,
          r,
          a
        )
      )}
                    </div>
                  `
    }) : ""}
          </div>
        `
  })}
    </section>
  `;
}
function di(e, t, i) {
  return i ? e.includes(t) ? e : [...e, t] : e.includes(t) ? e.filter((r) => r !== t) : e;
}
function ur(e, t) {
  return e.every((i) => t.has(i)) ? e : e.filter((i) => t.has(i));
}
function je(e, t, i) {
  if (t === i)
    return e;
  const r = e.indexOf(t), n = e.indexOf(i);
  if (r < 0 || n < 0)
    return e;
  const o = [...e], [a] = o.splice(r, 1);
  return o.splice(n, 0, a), o;
}
function ra(e, t, i, r) {
  if (!r)
    return je(e, t, i);
  const n = ur(e, r), o = je(n, t, i);
  return da(e, r, o);
}
function na(e, t, i) {
  const r = e.sections.includes(t);
  return l`
    <div
      class="order-row section-order-row"
      data-section-key=${t}
      @dragover=${(n) => pr(n, r)}
      @drop=${(n) => sa(e, t, r, n)}
    >
      <div class="check switch-row">
        ${Je(
    e.hass,
    O(t, e.hass),
    r,
    (n) => e.toggleSection(t, Xe(n)),
    {
      helpKey: "editor.section_visibility_help",
      isLocalizedText: !0
    }
  )}
      </div>
      <div class="order-actions">
        <button
          class="drag-handle"
          type="button"
          title=${i}
          aria-label=${i}
          aria-keyshortcuts="ArrowUp ArrowDown"
          draggable=${r ? "true" : "false"}
          ?disabled=${!r}
          @dragstart=${(n) => hr(n, lr, t)}
          @keydown=${(n) => _r(
    n,
    t,
    e.sections,
    (o) => e.reorderSection(t, o),
    r
  )}
        >
          <ha-icon icon="mdi:drag"></ha-icon>
        </button>
      </div>
    </div>
  `;
}
function ui(e, t, i, r, n) {
  const o = i.has(t.key);
  return l`
    <div
      class="overview-entity-toggle"
      data-overview-key=${t.key}
      @dragover=${(a) => pr(a, o)}
      @drop=${(a) => aa(e, t.key, o, a)}
    >
      <div class="check switch-row">
        ${Je(
    e.hass,
    At(t, e.hass),
    o,
    (a) => e.toggleOverviewEntity(t.key, Xe(a)),
    {
      helpKey: "editor.overview_entity_visibility_help",
      isLocalizedText: !0
    }
  )}
      </div>
      ${o ? l`
            <div class="order-actions">
              <button
                class="drag-handle"
                type="button"
                title=${n}
                aria-label=${n}
                aria-keyshortcuts="ArrowUp ArrowDown"
                draggable="true"
                @dragstart=${(a) => hr(a, dr, t.key)}
                @keydown=${(a) => _r(
    a,
    t.key,
    r,
    (s) => e.reorderOverviewEntity(t.key, s),
    !0
  )}
              >
                <ha-icon icon="mdi:drag"></ha-icon>
              </button>
            </div>
          ` : ""}
    </div>
  `;
}
function oa(e) {
  const t = new Set(e);
  return [
    ...e,
    ...ne.filter((i) => !t.has(i))
  ];
}
function hr(e, t, i) {
  e.dataTransfer?.setData(t, i), e.dataTransfer && (e.dataTransfer.effectAllowed = "move");
}
function pr(e, t) {
  t && (e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = "move"));
}
function aa(e, t, i, r) {
  mr(
    i,
    r,
    dr,
    (n) => e.reorderOverviewEntity(n, t)
  );
}
function sa(e, t, i, r) {
  mr(
    i,
    r,
    lr,
    (n) => e.reorderSection(n, t)
  );
}
function mr(e, t, i, r) {
  if (!e)
    return;
  t.preventDefault();
  const n = t.dataTransfer?.getData(i);
  n && r(n);
}
function _r(e, t, i, r, n) {
  if (!n || e.key !== "ArrowUp" && e.key !== "ArrowDown")
    return;
  e.preventDefault(), e.stopPropagation();
  const o = i.indexOf(t);
  if (o < 0)
    return;
  const a = e.key === "ArrowUp" ? -1 : 1, s = i[o + a];
  s && r(s);
}
function ca(e) {
  return e ? k.filter((t) => e.has(t.key)) : k;
}
function la(e, t) {
  if (!e.length || !t.length)
    return [];
  const i = new Map(
    t.map((r) => [r.key, r])
  );
  return e.map((r) => i.get(r)).filter((r) => !!r);
}
function da(e, t, i) {
  const r = [...i];
  return e.map(
    (n) => t.has(n) ? r.shift() ?? n : n
  );
}
const ua = Ae`
  .editor {
    display: grid;
    gap: 14px;
  }

  label {
    display: grid;
    gap: 6px;
  }

  input[type="text"],
  input[type="number"],
  select,
  textarea {
    box-sizing: border-box;
    width: 100%;
    min-height: 40px;
    padding: 8px 10px;
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    background: var(--card-background-color);
    color: var(--primary-text-color);
  }

  textarea {
    min-height: 84px;
    resize: vertical;
    font-family: var(--code-font-family, monospace);
  }

  textarea.invalid {
    border-color: var(--error-color);
  }

  ha-textfield,
  ha-textarea {
    display: block;
    min-width: 0;
    width: 100%;
  }

  ha-textarea.invalid {
    --mdc-theme-error: var(--error-color);
  }

  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  .checks {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 10px;
  }

  .actions-editor {
    display: grid;
    gap: 10px;
  }

  .action-list {
    display: grid;
    gap: 10px;
  }

  .action-fields {
    display: grid;
    gap: 10px;
    padding: 10px;
  }

  .check {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .check ha-switch,
  .switch-formfield ha-switch {
    flex: 0 0 auto;
  }

  .switch-formfield {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    width: 100%;
    color: var(--primary-text-color);
  }

  .switch-formfield-label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .editor-section,
  .entity-editor,
  .sections-editor,
  .actions-editor {
    display: grid;
    gap: 10px;
  }

  .editor-section {
    padding: 12px;
    border: 1px solid color-mix(in srgb, var(--divider-color) 72%, transparent);
    border-radius: 8px;
    background: color-mix(
      in srgb,
      var(--card-background-color) 88%,
      var(--secondary-background-color)
    );
  }

  .ha-form-list {
    display: grid;
    gap: 10px;
  }

  .ha-picker-control {
    display: block;
    min-width: 0;
    width: 100%;
  }

  .ha-form-row {
    display: grid;
    grid-template-columns: minmax(140px, 0.75fr) minmax(180px, 1.25fr);
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .field-label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    overflow: hidden;
    color: var(--primary-text-color);
  }

  .field-label > span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .action-form-row {
    grid-template-columns: minmax(112px, 0.8fr) minmax(160px, 1.2fr);
  }

  .action-textarea-row {
    display: grid;
    gap: 6px;
  }

  .icon-color-grid {
    display: grid;
    gap: 10px;
  }

  .icon-color-control {
    display: grid;
    grid-template-columns: 28px minmax(0, 1fr);
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .icon-color-swatch {
    width: 24px;
    height: 24px;
    border: 1px solid color-mix(in srgb, var(--divider-color) 72%, transparent);
    border-radius: 999px;
    background: var(--dhe-editor-icon-color, var(--state-icon-color, var(--secondary-text-color)));
    box-shadow: inset 0 0 0 2px var(--card-background-color);
  }

  .action-form-row .field-label,
  .action-textarea-row .field-label {
    min-width: 0;
    overflow: hidden;
    color: var(--primary-text-color);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .help-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background: transparent;
    cursor: help;
    flex: 0 0 auto;
    color: var(--secondary-text-color);
  }

  .help-icon ha-icon {
    --mdc-icon-size: 16px;
  }

  .help-icon:hover {
    color: var(--primary-color);
    background: color-mix(in srgb, var(--primary-color) 12%, transparent);
  }

  .help-icon:focus-visible {
    color: var(--primary-color);
    background: color-mix(in srgb, var(--primary-color) 12%, transparent);
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  .device-preview {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
    gap: 10px;
    min-width: 0;
    padding: 4px;
  }

  .device-preview ha-icon {
    color: var(--primary-color);
  }

  .device-preview div {
    display: grid;
    gap: 2px;
    min-width: 0;
  }

  .device-preview strong,
  .device-preview span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .device-preview span {
    color: var(--secondary-text-color);
    font-size: 12px;
  }

  .editor-foldout {
    overflow: hidden;
    border: 1px solid color-mix(in srgb, var(--divider-color) 72%, transparent);
    border-radius: 8px;
    background: color-mix(
      in srgb,
      var(--card-background-color) 88%,
      var(--secondary-background-color)
    );
  }

  .editor-foldout > summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 42px;
    padding: 0 12px;
    cursor: pointer;
    list-style: none;
  }

  .editor-foldout > summary::-webkit-details-marker {
    display: none;
  }

  .editor-foldout > summary:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  .editor-foldout > summary .summary-label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    overflow: hidden;
    color: var(--primary-text-color);
    font-weight: 500;
  }

  .editor-foldout > summary .summary-label > span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .editor-foldout > summary .summary-meta {
    display: grid;
    gap: 2px;
    justify-items: end;
    flex: 0 1 auto;
    min-width: 0;
    color: var(--secondary-text-color);
    font-size: 12px;
    line-height: 1.25;
    text-align: right;
  }

  .editor-foldout > summary .summary-count,
  .editor-foldout > summary .summary-help {
    min-width: 0;
    max-width: 32ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .editor-foldout > summary .summary-meta.with-count-and-help .summary-count {
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }

  .editor-foldout[open] > summary {
    border-bottom: 1px solid var(--divider-color);
  }

  .editor-foldout-content {
    display: grid;
    gap: 10px;
    padding: 10px;
  }

  .advanced-group {
    display: grid;
    gap: 10px;
    min-width: 0;
    padding: 8px;
    border: 1px solid color-mix(in srgb, var(--divider-color) 72%, transparent);
    border-radius: 8px;
    background: color-mix(
      in srgb,
      var(--card-background-color) 90%,
      var(--secondary-background-color)
    );
  }

  .overview-editor {
    display: grid;
    gap: 8px;
  }

  .overview-entity-groups {
    display: grid;
    gap: 10px;
  }

  .section-entity-groups {
    grid-template-columns: 1fr;
  }

  .overview-entity-section,
  .sections-editor {
    min-width: 0;
  }

  .overview-entity-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 8px;
  }

  .overview-order-list,
  .overview-entity-grid {
    padding: 8px;
  }

  .order-list {
    display: grid;
    gap: 6px;
  }

  .order-row,
  .overview-entity-toggle {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 8px;
    min-width: 0;
    padding: 8px;
    border: 1px solid color-mix(in srgb, var(--divider-color) 72%, transparent);
    border-radius: 8px;
    background: color-mix(
      in srgb,
      var(--card-background-color) 88%,
      var(--secondary-background-color)
    );
  }

  .overview-entity-grid .overview-entity-toggle {
    grid-template-columns: minmax(0, 1fr);
  }

  .drag-handle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: var(--secondary-text-color);
    cursor: grab;
  }

  .drag-handle:hover:not(:disabled),
  .drag-handle:focus-visible:not(:disabled) {
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    color: var(--primary-color);
  }

  .drag-handle:focus-visible:not(:disabled) {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  .drag-handle:active:not(:disabled) {
    cursor: grabbing;
  }

  .drag-handle:disabled {
    cursor: default;
    opacity: 0.38;
  }

  .drag-handle ha-icon {
    --mdc-icon-size: 20px;
  }

  .overview-entity-toggle .switch-formfield-label,
  .section-order-row .switch-formfield-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .editor-section h3,
  .overview-editor h3,
  .sections-editor h3,
  .actions-editor h3,
  .entity-editor h3 {
    margin: 0;
    color: var(--secondary-text-color);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0;
    text-transform: uppercase;
  }

  .order-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .entity-override-control {
    display: grid;
    gap: 4px;
    min-width: 0;
  }

  .section-entity-toggle .entity-override-inline {
    grid-column: 1 / -1;
    padding-top: 4px;
    border-top: 1px solid color-mix(in srgb, var(--divider-color) 56%, transparent);
  }

  @media (min-width: 560px) {
    .checks,
    .section-order-list,
    .overview-editor .overview-entity-groups {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 459px) {
    .ha-form-row,
    .action-form-row {
      grid-template-columns: 1fr;
    }
  }`;
function gr(e, t) {
  if (!t || e.includes("support"))
    return [...e];
  const i = [...e], r = i.indexOf("diagnostics"), n = i.indexOf("actions"), o = r >= 0 ? r + 1 : n >= 0 ? n : i.length;
  return i.splice(o, 0, "support"), i;
}
var ha = Object.defineProperty, pa = Object.getOwnPropertyDescriptor, Nt = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? pa(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (r ? a(t, i, n) : a(n)) || n);
  return r && n && ha(t, i, n), n;
};
const ma = [
  { key: "tap_action", labelKey: "editor.tap_action" },
  { key: "hold_action", labelKey: "editor.hold_action" },
  { key: "double_tap_action", labelKey: "editor.double_tap_action" }
], _a = ne.filter(
  (e) => e !== "overview"
), ga = new Set(_a), hi = Object.fromEntries(
  Object.entries(Te).map(([e, t]) => [
    e,
    t.map((i) => i.key)
  ])
), pi = "application/x-dhe-connect-section-entity", fa = "editor.drag_to_reorder", va = [
  "type",
  "device_id",
  "name",
  "show_unavailable",
  "show_optional",
  "show_diagnostics",
  "show_dangerous_actions",
  "show_weather_services",
  "show_icon_animations",
  "show_display_buttons",
  "show_support_mode",
  "icon_theme",
  "layout_mode",
  "tile_size",
  "overview_columns"
], ya = [
  "sections",
  "overview_entities",
  "hide_entities"
], ba = {
  controls: [...bt, ...Ve],
  bath: wt,
  timers: $t,
  weather: ["weather", "weather_location"],
  actions: St
};
let xe = class extends te {
  constructor() {
    super(...arguments), this._config = ie({}), this._discoveryCache = new er(), this._activeEntityKeysCache = /* @__PURE__ */ new WeakMap(), this._translationsChanged = () => {
      this.requestUpdate();
    }, this._deviceChanged = (e) => {
      const t = Ne(e);
      t && this._updateConfig({ device_id: t });
    }, this._nameChanged = (e) => {
      this._updateConfig({ name: jo(e) || void 0 });
    };
  }
  setConfig(e) {
    this._config = ie(e);
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(ke, this._translationsChanged);
  }
  disconnectedCallback() {
    window.removeEventListener(ke, this._translationsChanged), super.disconnectedCallback();
  }
  render() {
    const e = this._activeEntityKeys(), t = new Set(this._config.hide_entities), i = this._pinnedEntityKeys(t), r = this._orderingContext(e);
    return l`
      <div class="editor">
        ${Go({
      hass: this.hass,
      config: this._config,
      devicePreviewLabel: this._devicePreviewLabel(),
      devicePreviewReady: e !== void 0,
      deviceChanged: this._deviceChanged,
      iconColorChanged: (n, o) => this._iconColorChanged(n, o),
      nameChanged: this._nameChanged,
      selectChanged: (n, o) => this._selectOptionChanged(n, o),
      checkboxChanged: (n, o) => this._checkboxChanged(n, o)
    })}
        <section class="actions-editor">
          ${E(this.hass, {
      className: "actions-foldout",
      titleKey: "section.actions",
      helpKey: "editor.actions_help",
      content: l`
              <div class="action-list">
                ${ma.map((n) => this._actionField(n))}
              </div>
            `
    })}
        </section>
        ${ta(r)}
        ${ia(r)}
        <section class="entity-editor section-entities-editor">
          ${this._orderedEntityEditorSections().map(
      (n) => this._sectionEntitySelector(
        n,
        t,
        i,
        e
      )
    )}
        </section>
      </div>
    `;
  }
  _orderingContext(e) {
    return {
      hass: this.hass,
      sections: this._config.sections,
      overviewEntities: e ? ur(this._config.overview_entities, e) : this._config.overview_entities,
      activeEntityKeys: e,
      toggleSection: (t, i) => this._toggleSection(t, i),
      reorderSection: (t, i) => this._reorderSection(t, i),
      toggleOverviewEntity: (t, i) => this._overviewEntityChanged(t, i),
      reorderOverviewEntity: (t, i) => this._reorderOverviewEntity(t, i, e)
    };
  }
  _devicePreviewLabel() {
    const e = this._config.device_id;
    if (!e)
      return;
    const t = this.hass?.devices?.[e];
    return t?.name_by_user || t?.name || void 0;
  }
  _activeEntityKeys() {
    if (!this.hass)
      return;
    const e = this._discoveryCache.get(this.hass, this._config), t = this._activeEntityKeysCache.get(e);
    if (t)
      return t;
    const i = new Set(Object.keys(e.entityIds));
    return this._activeEntityKeysCache.set(e, i), i;
  }
  _orderedEntityEditorSections() {
    return this._config.sections.filter(
      (e) => e !== "overview" && ga.has(e)
    );
  }
  _sectionEntitySelector(e, t, i, r) {
    const n = this._orderedSectionEntityDefinitions(
      e,
      i,
      r
    );
    if (!n.length)
      return m;
    const o = n.filter((u) => !t.has(u.key)), a = n.filter((u) => t.has(u.key)), s = o.map((u) => u.key), c = new Set(s);
    return E(this.hass, {
      className: `overview-foldout entity-section entity-section-${e}`,
      titleKey: `section.${e}`,
      count: o.length,
      content: l`
        <div class="overview-entity-groups section-entity-groups">
          ${o.length ? E(this.hass, {
        className: "overview-entity-section",
        titleKey: "editor.selected_section_entities",
        count: o.length,
        content: l`
                  <div class="order-list overview-order-list">
                    ${x(
          o,
          (u) => u.key,
          (u) => this._sectionEntityToggle(e, u, c, s)
        )}
                  </div>
                `
      }) : ""}
          ${a.length ? E(this.hass, {
        className: "overview-entity-section",
        titleKey: "editor.available_section_entities",
        count: a.length,
        content: l`
                  <div class="overview-entity-grid">
                    ${x(
          a,
          (u) => u.key,
          (u) => this._sectionEntityToggle(e, u, c, s)
        )}
                  </div>
                `
      }) : ""}
        </div>
      `
    });
  }
  _orderedSectionEntityDefinitions(e, t, i) {
    const n = (Te[e] ?? []).filter(
      (p) => !i || i.has(p.key) || t?.has(p.key)
    );
    if (!n.length)
      return [];
    const o = new Map(
      n.map((p) => [p.key, p])
    ), a = hi[e] ?? [], s = mi(e, a).filter(
      (p) => o.has(p)
    ), c = new Set(s), u = [
      ...s.map((p) => o.get(p)).filter((p) => !!p),
      ...n.filter((p) => !c.has(p.key))
    ], f = this._config.section_entity_order[e];
    if (!f?.length)
      return u;
    const h = f.map((p) => o.get(p)).filter((p) => !!p), v = new Set(h.map((p) => p.key));
    return [
      ...h,
      ...u.filter((p) => !v.has(p.key))
    ];
  }
  _entityOverrideKeys() {
    const e = /* @__PURE__ */ new Set();
    for (const [t, i] of Object.entries(this._config.entities))
      if (typeof i == "string" && Se[t] && e.add(t), !(!i || typeof i != "object" || Array.isArray(i)))
        for (const r of Object.keys(i))
          Se[r] && e.add(r);
    return e;
  }
  _sectionEntityToggle(e, t, i, r) {
    const n = i.has(t.key), o = e !== "memory", a = $a(this._config.entities, t), s = d(this.hass, fa);
    return l`
      <div
        class="overview-entity-toggle section-entity-toggle"
        data-entity-key=${t.key}
        data-entity-section=${e}
        @dragover=${(c) => n && o ? this._allowEntityDrop(c) : void 0}
        @drop=${(c) => n && o ? this._dropSectionEntity(e, t.key, c) : void 0}
      >
        <div class="check switch-row">
          ${Je(
      this.hass,
      At(t, this.hass),
      n,
      (c) => this._entityVisibilityChanged(t.key, Xe(c)),
      {
        helpKey: "editor.overview_entity_visibility_help",
        isLocalizedText: !0
      }
    )}
        </div>
        ${this._renderSectionEntityDragHandle(
      n,
      o,
      e,
      t.key,
      r,
      s
    )}
        ${this._renderSectionEntityOverride(t, a)}
      </div>
    `;
  }
  _renderSectionEntityDragHandle(e, t, i, r, n, o) {
    return !e || !t ? m : l`
      <div class="order-actions">
        <button
          class="drag-handle"
          type="button"
          title=${o}
          aria-label=${o}
          aria-keyshortcuts="ArrowUp ArrowDown"
          draggable="true"
          @dragstart=${(a) => this._setSectionEntityDragData(a, r)}
          @keydown=${(a) => this._reorderSectionEntityByKeyboard(a, i, r, n)}
        >
          <ha-icon icon="mdi:drag"></ha-icon>
        </button>
      </div>
    `;
  }
  _renderSectionEntityOverride(e, t) {
    return l`
      <div class="entity-override-control entity-override-inline">
        ${ka(
      this.hass,
      e,
      t,
      (i) => this._entityOverrideChanged(e, i)
    )}
        <ha-textfield
          .value=${t}
          .label=${d(this.hass, "editor.entity_override_custom")}
          .helper=${d(this.hass, "editor.entity_override_custom_help")}
          helperPersistent
          @change=${(i) => this._entityOverrideTextChanged(e, i)}
        ></ha-textfield>
      </div>
    `;
  }
  _actionField(e) {
    const t = this._config[e.key], i = nr(t, e.key), r = wa(e.key, t, i);
    return l`
      <details class="editor-foldout action-card" data-action-card-key=${e.key} ?open=${r}>
        <summary>
          <span class="summary-label">
            <span>${d(this.hass, e.labelKey)}</span>
          </span>
          <small>${d(this.hass, `editor.action.${i}`)}</small>
        </summary>
        <div class="action-fields">
          ${U(
      this.hass,
      "editor.action_type",
      "editor.action_type_help",
      l`
              <select
                data-action-key=${e.key}
                .value=${i}
                aria-label=${d(this.hass, "editor.action_type")}
                @change=${(n) => this._actionTypeChanged(e.key, n)}
              >
                ${rr.map(
        (n) => l`<option value=${n} ?selected=${n === i}>
                      ${d(this.hass, `editor.action.${n}`)}
                    </option>`
      )}
              </select>
            `,
      "action-form-row"
    )}
          ${i !== "none" ? l`
                ${U(
      this.hass,
      "editor.action_entity",
      "editor.action_entity_help",
      l`
                    <ha-entity-picker
                      data-action-key=${e.key}
                      data-action-property="entity"
                      .hass=${this.hass}
                      .value=${typeof t?.entity == "string" ? t.entity : ""}
                      aria-label=${d(this.hass, "editor.action_entity")}
                      @value-changed=${(n) => this._actionEntityChanged(e.key, n)}
                    ></ha-entity-picker>
                  `,
      "action-form-row"
    )}
              ` : ""}
          ${i === "navigate" ? this._actionTextField(e.key, "navigation_path", "editor.navigation_path") : ""}
          ${i === "url" ? this._actionTextField(e.key, "url_path", "editor.url_path") : ""}
          ${i === "call-service" ? l`
                ${this._actionTextField(e.key, "service", "editor.service")}
                ${this._actionTargetEntityField(e.key)}
                ${this._actionTargetTextField(
      e.key,
      "area_id",
      "editor.service_target_area"
    )}
                ${this._actionTargetTextField(
      e.key,
      "device_id",
      "editor.service_target_device"
    )}
                ${this._actionDataField(e.key)}
              ` : ""}
        </div>
      </details>
    `;
  }
  _actionTextField(e, t, i) {
    const r = this._config[e], n = t === "service" ? r?.service ?? r?.perform_action : r?.[t];
    return U(
      this.hass,
      i,
      `${i}_help`,
      l`
        <ha-textfield
          data-action-key=${e}
          data-action-property=${t}
          .value=${typeof n == "string" ? n : ""}
          aria-label=${d(this.hass, i)}
          .helper=${d(this.hass, `${i}_help`)}
          helperPersistent
          @input=${(o) => this._actionPropertyChanged(e, t, o)}
        ></ha-textfield>
      `,
      "action-form-row"
    );
  }
  _actionTargetEntityField(e) {
    const t = this._config[e];
    return U(
      this.hass,
      "editor.service_target_entity",
      "editor.service_target_entity_help",
      l`
        <ha-entity-picker
          data-action-key=${e}
          data-action-property="target_entity"
          .hass=${this.hass}
          .value=${si(t?.target, "entity_id")}
          aria-label=${d(this.hass, "editor.service_target_entity")}
          @value-changed=${(i) => this._actionTargetEntityChanged(e, i)}
        ></ha-entity-picker>
      `,
      "action-form-row"
    );
  }
  _actionTargetTextField(e, t, i) {
    const r = this._config[e];
    return U(
      this.hass,
      i,
      `${i}_help`,
      l`
        <ha-textfield
          data-action-key=${e}
          data-action-property=${`target_${t}`}
          .value=${si(r?.target, t)}
          aria-label=${d(this.hass, i)}
          .helper=${d(this.hass, `${i}_help`)}
          helperPersistent
          @input=${(n) => this._actionTargetTextChanged(e, t, n)}
        ></ha-textfield>
      `,
      "action-form-row"
    );
  }
  _actionDataField(e) {
    const t = this._config[e];
    return Mo(
      this.hass,
      "editor.service_data",
      "editor.service_data_help",
      l`
        <ha-textarea
          data-action-key=${e}
          data-action-property="data"
          .value=${zo(t?.data)}
          aria-label=${d(this.hass, "editor.service_data")}
          .helper=${d(this.hass, "editor.service_data_help")}
          helperPersistent
          @input=${(i) => this._actionDataChanged(e, i)}
        ></ha-textarea>
      `
    );
  }
  _checkboxChanged(e, t) {
    if (e === "show_support_mode") {
      this._updateConfig({
        show_support_mode: t,
        sections: gr(this._config.sections, t)
      });
      return;
    }
    this._updateConfig({ [e]: t });
  }
  _selectOptionChanged(e, t) {
    this._updateConfig({
      [e]: t
    });
  }
  _iconColorChanged(e, t) {
    const i = ge(t), r = { ...this._config.icon_colors };
    i ? r[e] = i : delete r[e], this._updateConfig({ icon_colors: r });
  }
  _entityVisibilityChanged(e, t) {
    const i = new Set(this._config.hide_entities);
    t ? i.delete(e) : i.add(e), this._updateConfig({ hide_entities: [...i] });
  }
  _entityOverrideChanged(e, t) {
    this._updateConfig({
      entities: _i(
        this._config.entities,
        e,
        Ne(t)
      )
    });
  }
  _entityOverrideTextChanged(e, t) {
    this._updateConfig({
      entities: _i(
        this._config.entities,
        e,
        ge(t) || void 0
      )
    });
  }
  _actionTypeChanged(e, t) {
    const i = t.target;
    this._updateActionConfig(e, { action: i.value });
  }
  _actionEntityChanged(e, t) {
    this._updateActionConfig(e, { entity: Ne(t) });
  }
  _actionPropertyChanged(e, t, i) {
    const r = ge(i);
    if (t === "service") {
      this._updateActionConfig(e, {
        perform_action: r || void 0,
        service: r || void 0
      });
      return;
    }
    this._updateActionConfig(e, { [t]: r || void 0 });
  }
  _actionTargetEntityChanged(e, t) {
    this._updateActionTarget(e, "entity_id", Ne(t));
  }
  _actionTargetTextChanged(e, t, i) {
    this._updateActionTarget(e, t, ge(i));
  }
  _updateActionTarget(e, t, i) {
    this._updateActionConfig(e, {
      target: Bo(this._config[e]?.target, t, i)
    });
  }
  _actionDataChanged(e, t) {
    const i = t.target, r = Ko(typeof i.value == "string" ? i.value : "");
    i.classList.toggle("invalid", !r.valid), i.toggleAttribute("aria-invalid", !r.valid), r.valid && this._updateActionConfig(e, { data: r.value });
  }
  _updateActionConfig(e, t) {
    const i = this._config[e], r = Ro(e, { ...i, ...t });
    this._updateConfig({ [e]: r });
  }
  _toggleSection(e, t) {
    this._updateConfig({
      sections: di(this._config.sections, e, t)
    });
  }
  _reorderSection(e, t) {
    const i = je(this._config.sections, e, t);
    this._updateConfig({ sections: i });
  }
  _overviewEntityChanged(e, t) {
    this._updateConfig({
      overview_entities: di(
        this._config.overview_entities,
        e,
        t
      )
    });
  }
  _reorderOverviewEntity(e, t, i) {
    const r = ra(
      this._config.overview_entities,
      e,
      t,
      i
    );
    this._updateConfig({ overview_entities: r });
  }
  _setSectionEntityDragData(e, t) {
    e.dataTransfer?.setData(pi, t), e.dataTransfer && (e.dataTransfer.effectAllowed = "move");
  }
  _allowEntityDrop(e) {
    e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = "move");
  }
  _dropSectionEntity(e, t, i) {
    i.preventDefault();
    const r = i.dataTransfer?.getData(pi);
    r && this._reorderSectionEntity(e, r, t);
  }
  _reorderSectionEntityByKeyboard(e, t, i, r) {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown")
      return;
    e.preventDefault(), e.stopPropagation();
    const n = r.indexOf(i);
    if (n < 0)
      return;
    const o = e.key === "ArrowUp" ? -1 : 1, a = r[n + o];
    a && this._reorderSectionEntity(t, i, a);
  }
  _reorderSectionEntity(e, t, i) {
    const r = this._pinnedEntityKeys(), n = this._orderedSectionEntityDefinitions(
      e,
      r,
      this._activeEntityKeys()
    ).map(
      (c) => c.key
    ), o = je(n, t, i);
    if (ut(n, o))
      return;
    const a = mi(
      e,
      hi[e] ?? []
    ), s = { ...this._config.section_entity_order };
    ut(o, a) ? delete s[e] : s[e] = o, this._updateConfig({ section_entity_order: s });
  }
  _updateConfig(e) {
    const t = ie({ ...this._config, ...e });
    xa(this._config, t) || (this._config = t, this._emitConfigChanged(t));
  }
  _emitConfigChanged(e) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _pinnedEntityKeys(e = new Set(this._config.hide_entities)) {
    return /* @__PURE__ */ new Set([
      ...e,
      ...this._entityOverrideKeys()
    ]);
  }
};
xe.styles = ua;
Nt([
  vt({ attribute: !1 })
], xe.prototype, "hass", 2);
Nt([
  Ce()
], xe.prototype, "_config", 2);
xe = Nt([
  Ni("dhe-connect-card-editor")
], xe);
function mi(e, t) {
  const i = ba[e] ?? [], r = new Set(i), n = new Set(t), o = i.filter((s) => n.has(s)), a = t.filter((s) => !r.has(s));
  return [...o, ...a];
}
function wa(e, t, i) {
  if (e !== "tap_action")
    return i !== "none";
  if (!t)
    return !1;
  const r = Object.keys(t);
  return !(t.action === "more-info" && r.length === 1);
}
function $a(e, t) {
  const i = e[t.key];
  if (typeof i == "string")
    return i;
  const r = e[t.domain];
  if (r && typeof r == "object" && !Array.isArray(r)) {
    const n = r[t.key];
    return typeof n == "string" ? n : "";
  }
  return "";
}
function _i(e, t, i) {
  const r = { ...e }, n = r[t.domain];
  if (n && typeof n == "object" && !Array.isArray(n)) {
    const o = { ...n };
    delete o[t.key], Object.keys(o).length ? r[t.domain] = o : delete r[t.domain];
  }
  return i ? r[t.key] = i : delete r[t.key], r;
}
function Sa(e) {
  const t = gi.get(e);
  if (t)
    return t;
  const i = {
    entity: {
      filter: [{ domain: e }]
    }
  };
  return gi.set(e, i), i;
}
function ka(e, t, i, r) {
  return Ea() ? l`
      <ha-selector
        class="ha-picker-control"
        .hass=${e}
        .value=${i}
        .selector=${Sa(t.domain)}
        @value-changed=${r}
      ></ha-selector>
    ` : l`
    <ha-entity-picker
      class="ha-picker-control"
      .hass=${e}
      .value=${i}
      .includeDomains=${[t.domain]}
      @value-changed=${r}
    ></ha-entity-picker>
  `;
}
function Ea() {
  return typeof customElements < "u" && !!customElements.get("ha-selector");
}
function ut(e, t) {
  return e.length === t.length && e.every((i, r) => i === t[r]);
}
function xa(e, t) {
  if (e === t)
    return !0;
  for (const i of va)
    if (e[i] !== t[i])
      return !1;
  for (const i of ya)
    if (!ut(e[i] ?? [], t[i] ?? []))
      return !1;
  return !(e.icon_colors !== t.icon_colors && !X(e.icon_colors, t.icon_colors) || e.entities !== t.entities && !X(e.entities, t.entities) || e.section_entity_order !== t.section_entity_order && !X(e.section_entity_order, t.section_entity_order) || e.tap_action !== t.tap_action && !X(e.tap_action, t.tap_action) || e.hold_action !== t.hold_action && !X(e.hold_action, t.hold_action) || e.double_tap_action !== t.double_tap_action && !X(e.double_tap_action, t.double_tap_action));
}
function X(e, t) {
  return JSON.stringify(e) === JSON.stringify(t);
}
const gi = /* @__PURE__ */ new Map();
const Aa = {}, fi = Ii(class extends Ri {
  constructor() {
    super(...arguments), this.ot = Aa;
  }
  render(e, t) {
    return t();
  }
  update(e, [t, i]) {
    if (Array.isArray(t)) {
      if (Array.isArray(this.ot) && this.ot.length === t.length && t.every((r, n) => r === this.ot[n])) return T;
    } else if (this.ot === t) return T;
    return this.ot = Array.isArray(t) ? Array.from(t) : t, this.render(t, i);
  }
}), Ca = {
  search_weather_location: /* @__PURE__ */ new Set(["entry_id", "name", "country_id"]),
  add_weather_favorite: /* @__PURE__ */ new Set([
    "entry_id",
    "name",
    "country_id",
    "result_number",
    "location_id"
  ]),
  remove_weather_favorite: /* @__PURE__ */ new Set([
    "entry_id",
    "name",
    "country_id",
    "result_number",
    "location_id"
  ]),
  toggle_weather_favorite: /* @__PURE__ */ new Set([
    "entry_id",
    "name",
    "country_id",
    "result_number",
    "location_id"
  ]),
  select_weather_location: /* @__PURE__ */ new Set([
    "entry_id",
    "name",
    "country_id",
    "result_number",
    "location_id"
  ])
};
function vi(e) {
  return e?.state === "on" ? "turn_off" : "turn_on";
}
async function ce(e, t, i, r = {}) {
  const n = t.trim(), [o, a] = n.split(".", 2);
  if (!(!o || !a))
    return e.callService(o, i, {
      entity_id: n,
      ...r
    });
}
async function Ta(e, t, i, r) {
  if (!Number.isFinite(r))
    return;
  const n = w(i, "min_temp") ?? 20, o = w(i, "max_temp") ?? 60, a = w(i, "target_temp_step") ?? 0.5, s = Gi(Ot(r, n, o), a);
  return ce(e, t, "set_temperature", { temperature: s });
}
async function yi(e, t, i, r) {
  const n = w(i, "temperature") ?? K(i) ?? 38;
  return Ta(e, t, i, n + r);
}
async function Oa(e, t, i, r) {
  const n = qe(r);
  if (n === void 0)
    return;
  const o = w(i, "min"), a = w(i, "max"), s = w(i, "step") ?? 1, c = Gi(
    Ot(n, o ?? Number.NEGATIVE_INFINITY, a ?? Number.POSITIVE_INFINITY),
    s
  );
  return ce(e, t, "set_value", { value: c });
}
async function Da(e, t, i) {
  return ce(e, t, "set_value", { value: i });
}
async function Na(e, t, i) {
  if (i.length !== 0)
    return ce(e, t, "select_option", { option: i });
}
async function Ia(e, t, i) {
  const r = qe(i);
  if (r === void 0)
    return;
  const n = Ot(r, 0, 1);
  return ce(e, t, "volume_set", { volume_level: n });
}
async function Ra(e, t, i, r) {
  const n = {}, o = r ? { entry_id: r, ...i } : i, a = Ca[t];
  if (a) {
    for (const [s, c] of Object.entries(o)) {
      if (!a.has(s))
        continue;
      const u = c.trim();
      if (u)
        if (s === "country_id" || s === "result_number") {
          const f = Number(u);
          if (!Number.isFinite(f))
            continue;
          n[s] = f;
        } else
          n[s] = u;
    }
    return e.callService("stiebel_dhe_connect", t, n);
  }
}
class Ba {
  constructor() {
    this.pendingTapTimers = /* @__PURE__ */ new Map();
  }
  handleClick(t, i) {
    t.stopPropagation();
    const r = i.entityId;
    if (!r || this.consumeSuppressedClick(r))
      return;
    if (!i.hasDoubleTap) {
      i.dispatch(r, "tap");
      return;
    }
    if (this.clearPendingTap(r)) {
      i.dispatch(r, "double_tap");
      return;
    }
    const n = window.setTimeout(() => {
      this.pendingTapTimers.delete(r), i.dispatch(r, "tap");
    }, ei);
    this.pendingTapTimers.set(r, n);
  }
  handleDoubleClick(t, i) {
    t.preventDefault(), t.stopPropagation();
    const r = i.entityId;
    !r || !i.hasDoubleTap || !this.clearPendingTap(r) || i.dispatch(r, "double_tap");
  }
  handlePointerDown(t, i) {
    const r = i.entityId;
    if (!r || !i.hasHold || !za(t))
      return;
    this.clearPendingHold(), this.clearSuppressedClick();
    const n = window.setTimeout(() => {
      this.clearPendingTap(r), this.suppressedClickEntityId = r, this.pendingHold = void 0, i.dispatch(r, "hold");
    }, yn);
    this.pendingHold = { entityId: r, timer: n };
  }
  handlePointerEnd() {
    this.clearPendingHold(), this.suppressedClickEntityId && this.scheduleSuppressedClickReset();
  }
  clear() {
    for (const t of this.pendingTapTimers.values())
      window.clearTimeout(t);
    this.pendingTapTimers.clear(), this.clearPendingHold(), this.clearSuppressedClick();
  }
  clearPendingTap(t) {
    const i = this.pendingTapTimers.get(t);
    return i === void 0 ? !1 : (window.clearTimeout(i), this.pendingTapTimers.delete(t), !0);
  }
  clearPendingHold() {
    this.pendingHold && (window.clearTimeout(this.pendingHold.timer), this.pendingHold = void 0);
  }
  consumeSuppressedClick(t) {
    return this.suppressedClickEntityId !== t ? !1 : (this.clearSuppressedClick(), !0);
  }
  scheduleSuppressedClickReset() {
    this.clearSuppressedClickResetTimer(), this.suppressedClickResetTimer = window.setTimeout(() => {
      this.suppressedClickEntityId = void 0, this.suppressedClickResetTimer = void 0;
    }, ei + 100);
  }
  clearSuppressedClick() {
    this.suppressedClickEntityId = void 0, this.clearSuppressedClickResetTimer();
  }
  clearSuppressedClickResetTimer() {
    this.suppressedClickResetTimer !== void 0 && (window.clearTimeout(this.suppressedClickResetTimer), this.suppressedClickResetTimer = void 0);
  }
}
function za(e) {
  return (!("button" in e) || e.button === 0) && e.isPrimary !== !1;
}
const Ka = 256, Ie = /* @__PURE__ */ new Map();
function le(e) {
  if (typeof e != "string")
    return "";
  const t = Ie.get(e);
  if (t !== void 0)
    return t;
  const i = e.trim().toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ");
  return Ie.size >= Ka && Ie.clear(), Ie.set(e, i), i;
}
const La = /* @__PURE__ */ new Set(["error_status", "reconnect_count", "last_reconnect_reason"]), fr = /* @__PURE__ */ new Set([
  "device_status",
  "device_info",
  "protocol_version",
  "product_id",
  "wlan_mac",
  "bluetooth_mac",
  "connection_state",
  "controlunit_name"
]), Pa = /* @__PURE__ */ new Set(["device_status", "connection_state"]), Ma = /* @__PURE__ */ new Set(["off", "idle", "standby"]), Ha = /* @__PURE__ */ new Set(["0", "00:00", "00:00:00"]), ja = /* @__PURE__ */ new Set([
  "0",
  "available",
  "bereit",
  "connected",
  "fehlerfrei",
  "idle",
  "kein fehler",
  "keine stoerung",
  "keine störung",
  "none",
  "no error",
  "no fault",
  "normal",
  "ok",
  "online",
  "ready",
  "verbunden"
]), Fa = /* @__PURE__ */ new Set(["false", "off", "unknown", "unbekannt"]), Wa = /* @__PURE__ */ new Set([
  "alarm",
  "alert",
  "error",
  "fault",
  "failed",
  "disconnected",
  "fehler",
  "getrennt",
  "nicht verbunden",
  "offline",
  "unavailable",
  "problem",
  "stoerung",
  "störung",
  "target below inlet"
]), Ua = [
  "error",
  "alarm",
  "fault",
  "fehler",
  "stoerung",
  "störung"
];
function Va(e, t, i = !0) {
  const r = Ya(e, t, i);
  return [
    "icon-bubble",
    r.tone,
    `motion-${r.motion}`,
    r.animated ? "animated" : "",
    r.active ? "active" : ""
  ].filter(Boolean).join(" ");
}
function Ya(e, t, i = !0) {
  const r = Ga(e, t), n = Ja(e), o = !!(t && !L(t));
  return {
    tone: r,
    motion: n,
    active: !!(t && Xa(e, t)),
    animated: o && i && Qa(e, t)
  };
}
function Ga(e, t) {
  const i = e.key;
  if (i === "water_heating" && Ge(t))
    return "hot";
  if (It(e))
    return t && yr(t.state) ? "alert" : "ok";
  if (Za(e) && t) {
    if (Qe(t.state))
      return "ok";
    if (wr(t.state))
      return "alert";
  }
  return i === "outlet_temperature" ? "hot" : qa(e) ? "status" : i.includes("child_safety") || i.includes("scald") || e.icon.includes("shield") ? "safety" : e.domain === "switch" && i.startsWith("wellness_") ? "wellness" : i.includes("memory") ? "memory" : i.startsWith("eco_") ? "eco" : i.includes("timer") || i.includes("duration") || i.includes("time") ? "timer" : i.includes("water") || i.includes("bath") || i.includes("flow") || i.includes("temperature") || i === "water_heating" ? "water" : i.includes("energy") || i.includes("power") || i.includes("cost") || i.includes("co2") ? "energy" : i.includes("eco") || i.includes("saving") ? "eco" : e.domain === "weather" || i === "weather_location" ? "weather" : e.domain === "media_player" ? "radio" : e.domain === "button" ? "action" : "water";
}
function It(e) {
  return La.has(e.key);
}
function qa(e) {
  return fr.has(e.key);
}
function Za(e) {
  return Pa.has(e.key);
}
function Ja(e) {
  const t = e.key;
  return It(e) ? "alert" : e.domain === "media_player" ? "radio" : t === "outlet_temperature" || t === "water_heating" ? "heat" : t.includes("bath") ? "water-fill" : t === "water_flow" || t.includes("flow") ? "water-flow" : t.includes("energy") || t.includes("power") || t.includes("cost") ? "energy" : t.includes("timer") || t.includes("duration") || t.includes("time") ? "timer" : e.domain === "switch" && t.startsWith("wellness_") ? "wellness" : t.startsWith("eco_") || t.includes("saving") ? "eco" : t.includes("memory") ? "memory" : e.domain === "weather" || t === "weather_location" ? "weather" : t.includes("child_safety") || t.includes("scald") || e.icon.includes("shield") ? "safety" : fr.has(t) ? "status" : "water-flow";
}
function Xa(e, t) {
  return e.domain === "switch" ? Ee(t) : e.domain === "media_player" ? vr(t) : e.domain === "button" ? !1 : e.domain === "climate" ? Ge(t) : !0;
}
function vr(e) {
  return !Ma.has(e.state.toLowerCase());
}
function Qa(e, t) {
  if (!t || L(t) || e.domain === "button")
    return !1;
  if (e.domain === "switch" || e.domain === "binary_sensor")
    return Ee(t);
  if (e.domain === "media_player")
    return vr(t);
  if (e.domain === "climate")
    return Ge(t);
  if (e.domain === "weather")
    return !0;
  const i = e.key;
  return i === "water_flow" || i === "power" ? (K(t) ?? 0) > 0 : i === "outlet_temperature" || i === "inlet_temperature" ? K(t) !== void 0 : i.includes("timer") || i.includes("duration") || i.includes("time") ? !Ha.has(t.state) : i === "device_status" || i === "connection_state" ? Qe(t.state) || wr(t.state) : It(e) ? yr(t.state) : !1;
}
function Qe(e) {
  const t = le(e);
  return ja.has(t);
}
function yr(e) {
  const t = le(e);
  return !(!t || Qe(t) || br(t) || Fa.has(t));
}
function br(e) {
  const t = Number(e);
  return Number.isFinite(t) && t === 0;
}
function wr(e) {
  const t = le(e);
  if (Qe(t) || br(t))
    return !1;
  const i = Number(t);
  return Number.isFinite(i) ? i !== 0 : Wa.has(t) || Ua.some((r) => t.includes(r));
}
const $r = {
  auto: {
    height: "clamp(52px, 7cqi, 68px)",
    icon: "clamp(34px, 4.6cqi, 40px)"
  },
  compact: {
    height: "52px",
    icon: "34px"
  },
  normal: {
    height: "60px",
    icon: "36px"
  },
  large: {
    height: "72px",
    icon: "40px"
  }
};
function es(e) {
  return e.layout_mode === "mini" ? 4 : ["panel", "kiosk"].includes(e.layout_mode) ? 10 : e.tile_size === "large" ? 9 : e.tile_size === "normal" ? 7 : 5;
}
function ts(e) {
  return [
    `layout-${e.layout_mode}`,
    `tile-size-${e.tile_size}`
  ].filter(Boolean);
}
function Sr(e) {
  const t = $r[e.tile_size], i = is(e);
  return [
    `--dhe-overview-columns: ${e.overview_columns};`,
    `--dhe-overview-tile-height: ${t.height};`,
    i ? `--dhe-layout-icon-bubble-size: ${i};` : ""
  ].filter(Boolean).join(" ");
}
function is(e) {
  if (!(e.layout_mode === "mini" && e.tile_size === "auto"))
    return $r[e.tile_size].icon;
}
function Re(e, t) {
  if (!rs())
    return t();
  const i = performance.now(), r = t(), n = performance.now() - i;
  return console.debug(`[dhe-connect-card][perf] ${e}: ${n.toFixed(2)}ms`), r;
}
function rs() {
  return !1;
}
const ns = /* @__PURE__ */ new Set([
  "0",
  "available",
  "bereit",
  "connected",
  "fehlerfrei",
  "idle",
  "kein fehler",
  "keine stoerung",
  "keine störung",
  "none",
  "no error",
  "no fault",
  "normal",
  "ok",
  "online",
  "ready",
  "verbunden"
]), os = [
  "alarm",
  "alert",
  "disconnected",
  "error",
  "failed",
  "fault",
  "fehler",
  "getrennt",
  "nicht verbunden",
  "offline",
  "problem",
  "stoerung",
  "störung",
  "target below inlet"
], as = /* @__PURE__ */ new Set(["unavailable", "unknown", "unbekannt"]), Rt = [
  "delta",
  "change",
  "change_since_last",
  "difference",
  "last_delta"
], Bt = ["change_percent", "delta_percent", "percentage_delta"], kr = [
  "sparkline",
  "history",
  "samples",
  "trend_values",
  "values"
], ss = /* @__PURE__ */ new Set(["water_flow", "power"]), cs = /* @__PURE__ */ new Set(["down", "decreasing", "falling", "sinkend"]), ls = /* @__PURE__ */ new Set(["flat", "neutral", "stable", "gleichbleibend"]), ds = /* @__PURE__ */ new Set(["rising", "steigend", "up", "increasing"]);
class us {
  get(t, i) {
    const r = _s(t, i);
    if (this._entry?.signature === r)
      return this._entry.tiles;
    const n = Er(t, i);
    return this._entry = { signature: r, tiles: n }, n;
  }
  clear() {
    this._entry = void 0;
  }
}
function Er(e, t) {
  const i = [];
  for (const r of e.config.overview_entities) {
    const { definition: n, entityId: o, state: a } = e.entity(t, r);
    e.canRender(n, a) && i.push(hs(e, n, o, a));
  }
  return i;
}
function hs(e, t, i, r) {
  const n = C(t, r, e.hass), o = D(e.hass, r), a = ps(t), s = ms(t, r), c = fs(e.hass, r), u = vs(e.hass, r, c);
  return {
    key: t.key,
    definition: t,
    entityId: i,
    state: r,
    label: n,
    shortLabel: to(t, e.hass, n),
    value: o,
    group: a,
    condition: s,
    iconClass: e.iconBubbleClass(t, r),
    trend: u,
    delta: c,
    sparkline: ys(r)
  };
}
function ps(e) {
  const t = e.key;
  return t.includes("status") || t.includes("connection") || t.includes("reconnect") ? "status" : t.includes("energy") || t.includes("power") || t.includes("cost") || t.includes("co2") ? "energy" : t.includes("temperature") || t === "water_heating" ? "temperature" : t.includes("bath") ? "bath" : t.includes("timer") || t.includes("duration") || t.includes("time") ? "timer" : t.includes("eco") || t.includes("saving") ? "saving" : e.domain === "switch" || e.domain === "button" ? "control" : "water";
}
function ms(e, t) {
  if (!t)
    return "neutral";
  if (e.key === "error_status" || e.key.includes("alarm"))
    return $i(t.state) ? "alert" : "ok";
  if (e.key === "device_status" || e.key === "connection_state")
    return $i(t.state) ? "alert" : Cr(t.state) ? "ok" : "warning";
  if (e.domain === "switch" || e.domain === "binary_sensor")
    return t.state === "on" ? "active" : "idle";
  const i = K(t);
  return i !== void 0 && ss.has(e.key) ? i > 0 ? "active" : "idle" : "neutral";
}
function _s(e, t) {
  const i = [
    e.hass.locale?.language ?? "",
    me(e.config.show_diagnostics),
    me(e.config.show_dangerous_actions),
    me(e.config.show_optional),
    me(e.config.show_unavailable)
  ];
  for (const r of e.config.overview_entities) {
    const { definition: n, entityId: o, state: a } = e.entity(t, r);
    i.push(
      n.key,
      o ?? "",
      me(e.canRender(n, a)),
      e.iconBubbleClass(n, a),
      a?.state ?? "",
      wi(a, "friendly_name"),
      wi(a, "unit_of_measurement"),
      xr(a, ["trend", "trend_direction", "trendDirection"]) ?? "",
      bi(ae(a, Rt)),
      bi(ae(a, Bt)),
      gs(a)
    );
  }
  return i.join("");
}
function gs(e) {
  const t = Ar(e, kr);
  return t?.length ? `${t.length}:${t.join(",")}` : "";
}
function fs(e, t) {
  const i = ae(t, Rt), r = ae(t, Bt), n = i ?? r;
  if (n === void 0)
    return;
  const o = n > 0 ? "+" : "", a = r !== void 0 && i === void 0 ? "%" : typeof t?.attributes.unit_of_measurement == "string" ? ` ${t.attributes.unit_of_measurement}` : "";
  return d(e, "overview.delta", { value: `${o}${ks(n)}${a}` });
}
function vs(e, t, i) {
  const r = bs(t) ?? ws(t);
  if (r)
    return {
      direction: r,
      icon: r === "up" ? "mdi:trending-up" : r === "down" ? "mdi:trending-down" : "mdi:trending-neutral",
      label: i ?? d(e, `overview.trend.${r}`)
    };
}
function ys(e) {
  const t = Ar(e, kr);
  if (!(!t || t.length < 2))
    return {
      values: t,
      points: Ss(t)
    };
}
function ae(e, t) {
  if (e)
    for (const i of t) {
      const r = Tr(e.attributes[i]);
      if (r !== void 0)
        return r;
    }
}
function xr(e, t) {
  if (e)
    for (const i of t) {
      const r = e.attributes[i];
      if (typeof r == "string" && r.trim())
        return r;
    }
}
function me(e) {
  return e ? "1" : "0";
}
function bi(e) {
  return e === void 0 ? "" : String(e);
}
function wi(e, t) {
  if (!e?.attributes || typeof e.attributes != "object" || Array.isArray(e.attributes))
    return "";
  const i = e.attributes[t];
  return typeof i == "string" ? i : "";
}
function Ar(e, t) {
  if (e)
    for (const i of t) {
      const r = $s(e.attributes[i]);
      if (r?.length)
        return r;
    }
}
function bs(e) {
  const t = le(
    xr(e, ["trend", "trend_direction", "trendDirection"])
  );
  if (t) {
    if (cs.has(t))
      return "down";
    if (ls.has(t))
      return "flat";
    if (ds.has(t))
      return "up";
  }
}
function ws(e) {
  const t = ae(e, Rt) ?? ae(e, Bt);
  if (t !== void 0)
    return t > 0 ? "up" : t < 0 ? "down" : "flat";
}
function $s(e) {
  if (!Array.isArray(e))
    return;
  const t = e.map((i) => Tr(i)).filter((i) => i !== void 0);
  return t.length >= 2 ? t.slice(-18) : void 0;
}
function Ss(e) {
  const t = Math.min(...e), r = Math.max(...e) - t || 1, n = e.length > 1 ? 100 / (e.length - 1) : 100;
  return e.map((o, a) => {
    const s = Number((a * n).toFixed(2)), c = Number((22 - (o - t) / r * 18).toFixed(2));
    return `${s},${c}`;
  }).join(" ");
}
function Cr(e) {
  return ns.has(le(e));
}
function $i(e) {
  const t = le(e);
  if (!t)
    return !1;
  if (as.has(t))
    return !0;
  if (Cr(t))
    return !1;
  const i = Number(t);
  return Number.isFinite(i) ? i !== 0 : os.some((r) => t.includes(r));
}
function Tr(e) {
  const t = typeof e == "number" ? e : typeof e == "string" ? Number(e) : NaN;
  return Number.isFinite(t) ? t : void 0;
}
function ks(e) {
  return Number(e.toFixed(Math.abs(e) < 10 ? 1 : 0)).toString();
}
function Es(e, t, i) {
  const r = i ?? Er(e, t);
  return r.length ? l`
    <section class="card-section" data-section="overview">
      <div
        class="metric-grid"
        style=${Sr(e.config)}
      >
        ${x(
    r,
    (n) => n.key,
    (n) => xs(e, n)
  )}
      </div>
    </section>
  ` : m;
}
function xs(e, t) {
  return l`
    <button
      class=${As(t)}
      type="button"
      data-overview-key=${t.key}
      data-overview-group=${t.group}
      data-overview-condition=${t.condition}
      ?disabled=${!t.entityId}
      title=${t.label}
      aria-label=${`${t.label}: ${t.value}`}
      @click=${(i) => e.handleTap(i, t.entityId)}
      @dblclick=${(i) => e.handleDoubleTap(i, t.entityId)}
      @pointerdown=${(i) => e.startHold(i, t.entityId)}
      @pointerup=${e.cancelHold}
      @pointerleave=${e.cancelHold}
      @pointercancel=${e.cancelHold}
    >
      <div class=${t.iconClass}>
        <ha-icon icon=${t.definition.icon}></ha-icon>
      </div>
      <span class="metric-label" title=${t.label}>${t.shortLabel}</span>
      <strong class="metric-value">${t.value}</strong>
      ${t.trend ? l`
            <span class=${`overview-trend trend-${t.trend.direction}`}>
              <ha-icon icon=${t.trend.icon}></ha-icon>
              <span class=${t.delta ? "overview-delta" : ""}>${t.trend.label}</span>
            </span>
          ` : m}
      ${t.sparkline ? l`
            <svg
              class="overview-sparkline"
              viewBox="0 0 100 24"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polyline points=${t.sparkline.points}></polyline>
            </svg>
          ` : m}
    </button>
  `;
}
function As(e) {
  return [
    "metric",
    "entity-action",
    `overview-group-${e.group}`,
    `overview-condition-${e.condition}`,
    e.trend ? `has-trend trend-${e.trend.direction}` : "",
    e.delta ? "has-delta" : "",
    e.sparkline ? "has-sparkline" : ""
  ].filter(Boolean).join(" ");
}
function Cs(e) {
  const t = Array.isArray(e.attributes.source_list) ? e.attributes.source_list.map(String).filter(Boolean) : [], i = Ts(e), r = typeof e.attributes.source == "string" ? e.attributes.source : "", n = t.map((o) => {
    const a = b(o) || o;
    return {
      id: i.find((c) => Os(c, o, a))?.id,
      label: a,
      source: o,
      active: o === r
    };
  });
  return n.length ? Si(n) : Si(
    i.map((o) => ({
      id: o.id,
      label: o.label,
      source: o.source,
      active: o.source === r || o.label === b(r)
    }))
  );
}
function Ts(e) {
  return Array.isArray(e.attributes.favorites) ? e.attributes.favorites.flatMap((t) => {
    if (!t || typeof t != "object")
      return [];
    const i = t, r = i.id ?? i.Id, n = i.name ?? i.Name, o = String(n ?? r ?? "").trim(), a = b(o) || o;
    return a ? [
      {
        id: r === void 0 ? void 0 : String(r),
        label: a,
        source: o
      }
    ] : [];
  }) : [];
}
function Os(e, t, i) {
  if (e.label === i)
    return !0;
  const r = b(t);
  return e.label === r ? !0 : !!(e.id && r.includes(`(${e.id})`));
}
function Si(e) {
  const t = /* @__PURE__ */ new Set();
  return e.filter((i) => {
    const r = `${i.source}:${i.id ?? ""}`;
    return t.has(r) ? !1 : (t.add(r), !0);
  });
}
const Ds = [
  {
    service: "media_previous_track",
    tooltipKey: "tooltip.previous",
    icon: "mdi:skip-previous"
  },
  { service: "media_play", tooltipKey: "tooltip.play", icon: "mdi:play" },
  { service: "media_pause", tooltipKey: "tooltip.pause", icon: "mdi:pause" },
  { service: "media_next_track", tooltipKey: "tooltip.next", icon: "mdi:skip-next" }
];
function Ns(e) {
  const t = Array.isArray(e.state.attributes.source_list) ? e.state.attributes.source_list.map(String) : [], i = typeof e.state.attributes.media_title == "string" && b(e.state.attributes.media_title) || D(e.hass, e.state), r = b(e.state.attributes.source) || b(e.state.state), n = Cs(e.state);
  return l`
    <section class="card-section" data-section="radio">
      <h3>${O("radio", e.hass)}</h3>
      <div class="media-row ${e.mediaBusy ? "busy" : ""}" aria-busy=${String(e.mediaBusy)}>
        <button
          class="media-main entity-action"
          type="button"
          aria-label=${`${i}: ${r}`}
          @click=${e.actions.tap}
          @dblclick=${e.actions.doubleTap}
          @pointerdown=${e.actions.startHold}
          @pointerup=${e.actions.cancelHold}
          @pointerleave=${e.actions.cancelHold}
          @pointercancel=${e.actions.cancelHold}
        >
          <div class=${e.iconClass}><ha-icon icon="mdi:radio"></ha-icon></div>
          <div class="main">
            <strong>${i}</strong>
            <span>${r}</span>
          </div>
        </button>
        ${Ds.map((o) => Is(e, o))}
      </div>
      ${Rs(e, t)}
      ${Bs(e, n)}
    </section>
  `;
}
function Is(e, t) {
  const i = e.serviceBusy(t.service), r = d(e.hass, t.tooltipKey);
  return l`
    <button
      class="icon"
      title=${r}
      aria-label=${r}
      ?disabled=${i}
      aria-busy=${String(i)}
      @click=${() => e.actions.callService(t.service)}
    >
      <ha-icon icon=${t.icon}></ha-icon>
    </button>
  `;
}
function Rs(e, t) {
  return l`
    <div class="inline-control ${e.sourceBusy || e.volumeBusy ? "busy" : ""}">
      <select
        ?disabled=${e.sourceBusy}
        aria-label=${d(e.hass, "field.radio_source")}
        aria-busy=${String(e.sourceBusy)}
        @change=${e.actions.selectSource}
      >
        ${t.map(
    (i) => l`<option value=${i} ?selected=${i === e.state.attributes.source}>
              ${b(i) || i}
            </option>`
  )}
      </select>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        .value=${String(e.state.attributes.volume_level ?? 0)}
        ?disabled=${e.volumeBusy}
        aria-label=${d(e.hass, "field.volume")}
        aria-busy=${String(e.volumeBusy)}
        @change=${e.actions.setVolume}
      />
    </div>
  `;
}
function Bs(e, t) {
  return t.length ? l`
    <div class="radio-favorites">
      <h4>${d(e.hass, "section.radio_favorites")}</h4>
      <div
        class="favorite-list"
        role="list"
        aria-label=${d(e.hass, "section.radio_favorites")}
      >
        ${t.map(
    (i) => l`
            <div class="favorite-item" role="listitem">
              <button
                class="favorite-row ${i.active ? "active" : ""}"
                type="button"
                title=${i.label}
                aria-label=${i.label}
                aria-pressed=${String(i.active)}
                ?disabled=${e.sourceBusy}
                aria-busy=${String(e.sourceBusy)}
                @click=${() => e.actions.selectSourceByName(i.source)}
              >
                <div class="favorite-icon"><ha-icon icon="mdi:star"></ha-icon></div>
                <span>${i.label}</span>
                ${i.id ? l`<small>#${i.id}</small>` : m}
              </button>
            </div>
          `
  )}
      </div>
    </div>
  ` : m;
}
function P(e) {
  return e !== m && e !== null && e !== void 0 && e !== "";
}
class zs {
  constructor(t = () => {
  }) {
    this.onChange = t, this.activeKeys = /* @__PURE__ */ new Set();
  }
  isBusy(t) {
    return this.activeKeys.has(t);
  }
  isEntityBusy(t) {
    const i = `${t}:`;
    for (const r of this.activeKeys)
      if (r.startsWith(i))
        return !0;
    return !1;
  }
  async run(t, i) {
    if (!this.activeKeys.has(t)) {
      this.activeKeys.add(t), this.emit();
      try {
        return await i();
      } finally {
        this.activeKeys.delete(t), this.emit();
      }
    }
  }
  clear() {
    this.activeKeys.size && (this.activeKeys.clear(), this.emit());
  }
  emit() {
    this.onChange(new Set(this.activeKeys));
  }
}
function R(e, t) {
  return `${e}:${t}`;
}
function Or(e) {
  return `weather:${e}`;
}
const Ks = "search_weather_location", Ls = [
  { key: "name", labelKey: "field.name" },
  { key: "country_id", labelKey: "field.country_id" },
  { key: "result_number", labelKey: "field.result" },
  { key: "location_id", labelKey: "field.location_id" }
], Ps = {
  name: "",
  country_id: "34",
  result_number: "1",
  location_id: ""
}, Ms = [
  "search_weather_location",
  "add_weather_favorite",
  "remove_weather_favorite",
  "toggle_weather_favorite",
  "select_weather_location"
], Hs = new Set(Ve);
function js(e, t) {
  const i = e.entity(t, "water_heating"), r = tt(e, "controls", [
    ...bt,
    ...Ve
  ]), n = Js(r), o = de(
    n,
    (s) => e.config.show_display_buttons ? Qs(e, t, s) : Xs(e, t, s)
  ), a = i.entityId && i.state ? e.renderClimateControl(i.entityId, i.state) : m;
  return !P(a) && !o.length ? m : l`
    <section class="card-section" data-section="controls">
      <h3>${d(e.hass, "section.water_heating")}</h3>
      ${a}
      ${o}
    </section>
  `;
}
function Fs(e, t) {
  return Dr(e, t, "bath", wt);
}
function Ws(e, t) {
  return Dr(e, t, "timers", $t);
}
function Us(e, t) {
  if (e.config.show_display_buttons)
    return ec(e, t);
  const i = de(q(), (r) => ic(e, t, r));
  return i.length ? l`
    <section class="card-section" data-section="memory">
      <h3>${O("memory", e.hass)}</h3>
      <div class="rows memory">${i}</div>
    </section>
  ` : m;
}
function Vs(e, t) {
  const i = et(
    e,
    t,
    tt(e, "weather", ["weather", "weather_location"])
  );
  return i.length ? l`
    <section class="card-section" data-section="weather">
      <h3>${O("weather", e.hass)}</h3>
      ${i}
      ${e.config.show_weather_services ? rc(e, t) : m}
    </section>
  ` : m;
}
function Ys(e, t) {
  const i = et(
    e,
    t,
    tt(e, "actions", St)
  );
  return i.length ? l`
    <section class="card-section" data-section="actions">
      <h3>${O("actions", e.hass)}</h3>
      <div class="rows">${i}</div>
    </section>
  ` : m;
}
function ki(e, t, i) {
  const r = nc(
    e,
    i,
    Te[i] ?? []
  ), n = de(
    r,
    (o) => Nr(e, t, o.key)
  );
  return n.length ? l`
    <section class="card-section" data-section=${i}>
      <h3>${O(i, e.hass)}</h3>
      <div class="rows">${n}</div>
    </section>
  ` : m;
}
function Dr(e, t, i, r) {
  const n = tt(e, i, r);
  return e.config.show_display_buttons ? qs(
    e,
    O(i, e.hass),
    t,
    n,
    i
  ) : Gs(
    e,
    O(i, e.hass),
    t,
    n,
    i
  );
}
function Gs(e, t, i, r, n) {
  const o = et(e, i, r);
  return o.length ? l`
    <section class="card-section" data-section=${n}>
      <h3>${t}</h3>
      <div class="rows">${o}</div>
    </section>
  ` : m;
}
function qs(e, t, i, r, n) {
  const o = Ir(e, i, r, n);
  return P(o) ? l`
    <section class="card-section" data-section=${n}>
      <h3>${t}</h3>
      ${o}
    </section>
  ` : m;
}
function et(e, t, i) {
  return de(i, (r) => Nr(e, t, r));
}
function Nr(e, t, i) {
  const r = e.entity(t, i);
  if (!e.canRender(r.definition, r.state))
    return m;
  const n = C(r.definition, r.state, e.hass), o = D(e.hass, r.state), a = e.renderRowControl(r.definition, r.entityId, r.state), s = e.isEntityBusy(r.entityId), c = `${n}: ${o}`;
  return l`
    <div
      class="entity-row ${s ? "busy" : ""}"
      data-entity-key=${r.definition.key}
      aria-busy=${String(s)}
    >
      ${zt(
    e,
    r.entityId,
    "entity-main entity-action",
    c,
    l`
          <div class=${e.iconBubbleClass(r.definition, r.state)}>
            <ha-icon icon=${r.definition.icon}></ha-icon>
          </div>
          <div class="main">
            <strong>${n}</strong>
            <span>${o}</span>
          </div>
        `
  )}
      ${P(a) ? l`<div class="row-control">${a}</div>` : m}
    </div>
  `;
}
function Ir(e, t, i, r) {
  const n = de(i, (o) => Zs(e, t, o));
  return n.length ? l`<div class="display-button-grid ${r}">${n}</div>` : m;
}
function Zs(e, t, i) {
  const r = e.entity(t, i);
  if (!e.canRender(r.definition, r.state))
    return m;
  const n = C(r.definition, r.state, e.hass), o = D(e.hass, r.state), a = e.renderRowControl(r.definition, r.entityId, r.state), s = r.state ? Ee(r.state) : !1, c = e.isEntityBusy(r.entityId), u = `${n}: ${o}`;
  return l`
    <div
      class="display-button-tile ${s ? "active" : ""} ${c ? "busy" : ""}"
      data-entity-key=${r.definition.key}
      aria-busy=${String(c)}
    >
      ${zt(
    e,
    r.entityId,
    "display-button-main entity-action",
    u,
    l`
          <div class=${e.iconBubbleClass(r.definition, r.state)}>
            <ha-icon icon=${r.definition.icon}></ha-icon>
          </div>
          <span>${n}</span>
          <strong>${o}</strong>
        `
  )}
      ${P(a) ? l`<div class="display-button-control">${a}</div>` : m}
    </div>
  `;
}
function Js(e) {
  const t = [];
  for (const i of e) {
    const r = Hs.has(i) ? "wellness" : "controls", n = t[t.length - 1];
    n && n.group === r ? n.keys.push(i) : t.push({ group: r, keys: [i] });
  }
  return t;
}
function Xs(e, t, i) {
  const r = et(e, t, i.keys);
  if (!r.length)
    return m;
  const n = i.group === "wellness" ? "rows entity-list wellness" : "rows entity-list", o = l`<div class=${n}>${r}</div>`;
  return i.group !== "wellness" ? o : l`
    <div class="subsection">
      <h4>${d(e.hass, "section.wellness")}</h4>
      ${o}
    </div>
  `;
}
function Qs(e, t, i) {
  const r = i.group === "wellness" ? "wellness" : "controls", n = Ir(e, t, i.keys, r);
  return P(n) ? i.group !== "wellness" ? n : l`
    <div class="subsection">
      <h4>${d(e.hass, "section.wellness")}</h4>
      ${n}
    </div>
  ` : m;
}
function zt(e, t, i, r, n) {
  return l`
    <button
      class=${i}
      type="button"
      ?disabled=${!t}
      aria-label=${r}
      @click=${(o) => e.handleTap(o, t)}
      @dblclick=${(o) => e.handleDoubleTap(o, t)}
      @pointerdown=${(o) => e.startHold(o, t)}
      @pointerup=${e.cancelHold}
      @pointerleave=${e.cancelHold}
      @pointercancel=${e.cancelHold}
    >
      ${n}
    </button>
  `;
}
function ec(e, t) {
  const i = de(q(), (r) => tc(e, t, r));
  return i.length ? l`
    <section class="card-section" data-section="memory">
      <h3>${O("memory", e.hass)}</h3>
      <div class="display-button-grid memory-display">${i}</div>
    </section>
  ` : m;
}
function tc(e, t, i) {
  const r = Rr(e, t, i);
  if (!Br(e, r))
    return m;
  const { name: n, temp: o, press: a, del: s } = r, c = n.state, u = o.state, f = a.state, h = s.state, v = c && !L(c) ? b(c.state) || d(e.hass, "label.memory", { slot: i }) : d(e.hass, "label.memory", { slot: i }), p = u ? D(e.hass, u) : D(e.hass, f), y = a.entityId ?? o.entityId ?? n.entityId ?? s.entityId, _ = u ? o.definition : a.definition, $ = a.entityId, S = s.entityId, Z = $ ? e.isServiceBusy($, "press") : !1, H = S ? e.isServiceBusy(S, "press") : !1, N = Fe(
    e,
    a.definition,
    $,
    f,
    "button.apply_memory",
    Z,
    "mdi:play"
  ), Lt = Fe(
    e,
    s.definition,
    S,
    h,
    "button.delete_memory",
    H,
    "mdi:trash-can-outline",
    !0
  ), Pt = e.isEntityBusy(y);
  return l`
    <div
      class="display-button-tile memory-display-tile ${Pt ? "busy" : ""}"
      data-memory-slot=${i}
      aria-busy=${String(Pt)}
    >
      ${zt(
    e,
    y,
    "display-button-main entity-action",
    `${v}: ${p}`,
    l`
          <div class=${e.iconBubbleClass(_, u ?? f)}>
            <ha-icon icon=${_.icon}></ha-icon>
          </div>
          <span>${v}</span>
          <strong>${p}</strong>
        `
  )}
      ${P(N) || P(Lt) ? l`
            <div class="display-button-control memory-display-actions">
              ${N}
              ${Lt}
            </div>
          ` : m}
    </div>
  `;
}
function ic(e, t, i) {
  const { name: r, temp: n, press: o, del: a } = Rr(e, t, i), s = r.entityId, c = r.state, u = n.entityId, f = n.state, h = o.entityId, v = o.state, p = a.entityId, y = a.state;
  if (!Br(e, { name: r, temp: n, press: o, del: a }))
    return m;
  const _ = s ? e.isServiceBusy(s, "set_value") : !1, $ = u ? e.isServiceBusy(u, "set_value") : !1, S = h ? e.isServiceBusy(h, "press") : !1, Z = p ? e.isServiceBusy(p, "press") : !1, H = [s, u, h, p].some(
    (N) => e.isEntityBusy(N)
  );
  return l`
    <div class="memory-row ${H ? "busy" : ""}" aria-busy=${String(H)}>
      <div class=${e.iconBubbleClass(n.definition, n.state)}>
        <ha-icon icon=${n.definition.icon}></ha-icon>
      </div>
      <div class="memory-fields">
        ${s && c ? l`<input
              type="text"
              .value=${c.state}
              aria-label=${d(e.hass, "entity.memory_name", { slot: i })}
              ?disabled=${_}
              aria-busy=${String(_)}
              @change=${(N) => e.setText(s, N)}
            />` : l`<strong>${d(e.hass, "label.memory", { slot: i })}</strong>`}
        ${u && f ? l`<input
              type="number"
              min=${String(f.attributes.min ?? 20)}
              max=${String(f.attributes.max ?? 60)}
              step=${String(f.attributes.step ?? 0.5)}
              .value=${String(K(f) ?? "")}
              aria-label=${d(e.hass, "entity.memory_temperature", { slot: i })}
              ?disabled=${$}
              aria-busy=${String($)}
              @change=${(N) => e.setNumber(u, f, N)}
            />` : m}
      </div>
      ${Fe(
    e,
    o.definition,
    h,
    v,
    "button.apply_memory",
    S,
    "mdi:play"
  )}
      ${Fe(
    e,
    a.definition,
    p,
    y,
    "button.delete_memory",
    Z,
    "mdi:trash-can-outline",
    !0
  )}
    </div>
  `;
}
function Fe(e, t, i, r, n, o, a, s = !1) {
  if (!i || !r || s && !e.config.show_dangerous_actions)
    return m;
  const c = d(e.hass, n);
  return l`
    <button
      class=${`icon${s ? " danger" : ""}`}
      type="button"
      title=${c}
      aria-label=${c}
      ?disabled=${o}
      aria-busy=${String(o)}
      @click=${() => e.pressButton(t, i)}
    >
      <ha-icon icon=${a}></ha-icon>
    </button>
  `;
}
function Rr(e, t, i) {
  return {
    name: e.entity(t, `temperature_memory_${i}_name`),
    temp: e.entity(t, `temperature_memory_${i}_temperature`),
    press: e.entity(t, `temperature_memory_${i}`),
    del: e.entity(t, `delete_temperature_memory_${i}`)
  };
}
function de(e, t) {
  const i = [];
  for (const r of e) {
    const n = t(r);
    P(n) && i.push(n);
  }
  return i;
}
function Br(e, t) {
  return Object.values(t).some(
    (i) => e.canRender(i.definition, i.state)
  );
}
function rc(e, t) {
  const i = e.isActionBusy(Or(e.weatherService));
  return l`
    <div class="service-box ${i ? "busy" : ""}" aria-busy=${String(i)}>
      <select
        .value=${e.weatherService}
        aria-label=${d(e.hass, "field.weather_service")}
        ?disabled=${i}
        aria-busy=${String(i)}
        @change=${(r) => {
    e.setWeatherService(r.target.value);
  }}
      >
        ${Ms.map(
    (r) => l`<option value=${r}>${d(e.hass, `service.${r}`)}</option>`
  )}
      </select>
      ${Ls.map((r) => oc(e, r, i))}
      <button
        class="chip"
        type="button"
        aria-label=${d(e.hass, "button.run")}
        ?disabled=${i}
        aria-busy=${String(i)}
        @click=${() => e.callWeather(t)}
      >
        ${d(e.hass, "button.run")}
      </button>
    </div>
  `;
}
function nc(e, t, i) {
  const r = e.config.section_entity_order[t];
  if (!r?.length || !i.length)
    return i;
  const n = new Map(i.map((s) => [s.key, s])), o = r.map((s) => n.get(s)).filter((s) => !!s);
  if (!o.length)
    return i;
  const a = new Set(o.map((s) => s.key));
  return [
    ...o,
    ...i.filter((s) => !a.has(s.key))
  ];
}
function tt(e, t, i) {
  const r = e.config.section_entity_order[t];
  if (!r?.length || !i.length)
    return i;
  const n = new Set(i), o = r.filter((s) => n.has(s));
  if (!o.length)
    return i;
  const a = new Set(o);
  return [...o, ...i.filter((s) => !a.has(s))];
}
function oc(e, t, i) {
  return l`
    <input
      placeholder=${d(e.hass, t.labelKey)}
      .value=${e.weatherForm[t.key]}
      aria-label=${d(e.hass, t.labelKey)}
      ?disabled=${i}
      aria-busy=${String(i)}
      @input=${(r) => e.setWeatherFormValue(t.key, r.target.value)}
    />
  `;
}
const ac = {
  active_entities: "support.check.active_entities",
  base_entity: "support.check.base_entity",
  custom_element: "support.check.custom_element",
  device: "support.check.device",
  device_registry: "support.check.device_registry",
  disabled_entities: "support.check.disabled_entities",
  entity_registry: "support.check.entity_registry",
  required_entities: "support.check.required_entities",
  support_export: "support.check.support_export",
  unavailable_entities: "support.check.unavailable_entities"
}, sc = {
  fail: "support.status.fail",
  pass: "support.status.pass",
  warn: "support.status.warn"
};
function cc(e) {
  const t = d(e.hass, "support.export");
  return l`
    <section
      class="card-section support-section"
      data-section="support"
      role="region"
      aria-labelledby="dhe-support-heading"
    >
      <h3 id="dhe-support-heading">${d(e.hass, "section.support")}</h3>
      <div class="support-actions">
        <button
          class="chip"
          type="button"
          aria-label=${t}
          aria-describedby="dhe-support-export-hint"
          @click=${e.exportSupportPackage}
        >
          <ha-icon icon="mdi:package-down"></ha-icon>
          ${t}
        </button>
        <span id="dhe-support-export-hint">${d(e.hass, "support.export_hint")}</span>
      </div>
      <div class="support-grid">
        ${lc(e)}
        ${dc(e)}
        ${uc(e)}
        ${hc(e)}
      </div>
    </section>
  `;
}
function lc(e) {
  const t = e.model.summary, i = e.model.checks.filter((n) => n.level === "fail").length, r = e.model.checks.filter((n) => n.level === "warn").length;
  return it(
    e,
    "support.self_test",
    "dhe-support-self-test-title",
    "mdi:clipboard-pulse-outline",
    l`
      <div
        class="support-score ${i ? "fail" : r ? "warn" : "pass"}"
        role="status"
        aria-live="polite"
      >
        <strong>${i || r || t.availableEntities}</strong>
        <span>
          ${i ? d(e.hass, "support.self_test_failed") : r ? d(e.hass, "support.self_test_warn") : d(e.hass, "support.self_test_pass")}
        </span>
      </div>
      <dl class="support-stats">
        ${z(e, "support.stat.mapped", t.mappedEntities)}
        ${z(e, "support.stat.available", t.availableEntities)}
        ${z(e, "support.stat.unavailable", t.unavailableEntities)}
        ${z(e, "support.stat.missing_required", t.missingRequiredEntities)}
      </dl>
    `
  );
}
function dc(e) {
  const t = e.model.diagnostics;
  return it(
    e,
    "support.integration_diagnostics",
    "dhe-support-diagnostics-title",
    "mdi:stethoscope",
    l`
      <dl class="support-stats">
        ${z(e, "support.stat.device", t.deviceIdHash ?? "-")}
        ${z(e, "support.stat.config_entry", t.configEntryIdHash ?? "-")}
        ${z(e, "support.stat.base_entity", t.baseEntityHash ?? "-")}
        ${z(
      e,
      "support.stat.registry",
      d(
        e.hass,
        t.entityRegistryAvailable ? "support.value.yes" : "support.value.no"
      )
    )}
      </dl>
      ${Object.keys(t.domains).length ? l`
            <div
              class="support-domain-list"
              role="list"
              aria-label=${d(e.hass, "support.domain_distribution")}
            >
              ${x(
      Object.entries(t.domains),
      ([i]) => i,
      ([i, r]) => l`<span role="listitem">${i}: ${r}</span>`
    )}
            </div>
          ` : m}
    `
  );
}
function uc(e) {
  return it(
    e,
    "support.compatibility",
    "dhe-support-compatibility-title",
    "mdi:check-decagram-outline",
    l`
      <div
        class="support-checks"
        role="list"
        aria-label=${d(e.hass, "support.compatibility_list")}
      >
        ${x(
      e.model.checks,
      (t) => t.key,
      (t) => pc(e, t)
    )}
      </div>
    `
  );
}
function hc(e) {
  return it(
    e,
    "support.entity_audit",
    "dhe-support-entity-audit-title",
    "mdi:format-list-checks",
    l`
      <div
        class="support-entity-list"
        role="list"
        aria-label=${d(e.hass, "support.entity_audit_list")}
      >
        ${x(
      e.model.entities,
      (t) => t.key,
      (t) => mc(e, t)
    )}
      </div>
    `
  );
}
function it(e, t, i, r, n) {
  return l`
    <article class="support-panel" role="group" aria-labelledby=${i}>
      <h4 id=${i}>
        <ha-icon icon=${r}></ha-icon>
        ${d(e.hass, t)}
      </h4>
      ${n}
    </article>
  `;
}
function pc(e, t) {
  return l`
    <div class="support-check ${t.level}" role="listitem">
      <ha-icon icon=${_c(t.level)}></ha-icon>
      <span>${d(e.hass, ac[t.key])}</span>
      <strong>${d(e.hass, sc[t.level])}</strong>
      ${t.value !== void 0 ? l`<small>${t.value}</small>` : m}
    </div>
  `;
}
function mc(e, t) {
  const i = d(e.hass, `support.entity_status.${t.status}`), r = d(
    e.hass,
    `support.registry_status.${t.registryStatus}`
  );
  return l`
    <div
      class="support-entity-row ${t.status}"
      role="listitem"
      title=${t.key}
      aria-label=${`${t.key}: ${i}, ${r}`}
    >
      <span>${t.key}</span>
      <small>${t.domain}</small>
      <strong>${i}</strong>
      <small>${r}</small>
    </div>
  `;
}
function z(e, t, i) {
  return l`
    <div>
      <dt>${d(e.hass, t)}</dt>
      <dd>${i}</dd>
    </div>
  `;
}
function _c(e) {
  switch (e) {
    case "pass":
      return "mdi:check-circle-outline";
    case "warn":
      return "mdi:alert-circle-outline";
    case "fail":
      return "mdi:close-circle-outline";
  }
}
function gc(e, t) {
  const i = at(e, t.connection);
  if (i)
    return d(e, "status.connection", { state: i });
  const r = at(e, t.device);
  if (r)
    return d(e, "status.device", { state: r });
  const n = at(e, t.error);
  return n ? d(e, "status.status", { state: n }) : t.hasBaseEntity ? d(e, "status.discovered") : d(e, "status.select_device");
}
function at(e, t) {
  if (!(!t || L(t)))
    return b(t.state) || d(e, "state.unknown");
}
const fc = Ae`
  @media (prefers-reduced-motion: reduce), (update: slow) {
    :host {
      --dhe-icon-motion-state: paused;
    }

    .icon-bubble,
    .icon-bubble::after,
    .icon-bubble ha-icon {
      animation: none !important;
    }

    .icon-bubble,
    .icon-bubble::after,
    .icon-bubble ha-icon,
    .metric,
    .entity-row,
    .media-row,
    .memory-row,
    .display-button-tile,
    .entity-action {
      transition: none !important;
    }
  }

  @keyframes dhe-water-wave {
    0%,
    100% {
      clip-path: inset(56% 0 0 0 round 999px);
      transform: translateY(3px) rotate(-3deg);
    }
    50% {
      clip-path: inset(30% 0 0 0 round 999px);
      transform: translateY(-3px) rotate(3deg);
    }
  }

  @keyframes dhe-water-fill {
    0%,
    100% {
      clip-path: inset(62% 0 0 0 round 999px);
      transform: translateY(4px);
      opacity: 0.14;
    }
    50% {
      clip-path: inset(22% 0 0 0 round 999px);
      transform: translateY(-3px);
      opacity: 0.26;
    }
  }

  @keyframes dhe-water-fill-icon {
    0%,
    100% {
      transform: translateY(1px) rotate(-1deg);
    }
    50% {
      transform: translateY(-2px) rotate(1deg);
    }
  }

  @keyframes dhe-icon-float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-2.5px);
    }
  }

  @keyframes dhe-heat-flicker {
    0%,
    100% {
      transform: translateY(0) scale(1) rotate(0);
      filter: drop-shadow(0 0 2px currentColor);
    }
    30% {
      transform: translateY(-1px) scale(1.08) rotate(-2deg);
      filter: drop-shadow(0 0 7px currentColor);
    }
    58% {
      transform: translateY(1px) scale(0.98) rotate(2deg);
      filter: drop-shadow(0 0 4px currentColor);
    }
  }

  @keyframes dhe-heat-steam {
    0% {
      transform: translateY(7px) scale(0.72);
      opacity: 0;
    }
    35% {
      opacity: 0.24;
    }
    100% {
      transform: translateY(-7px) scale(1.08);
      opacity: 0;
    }
  }

  @keyframes dhe-energy-spark {
    0%,
    100% {
      transform: scale(1);
      filter: drop-shadow(0 0 0 transparent);
    }
    45% {
      transform: scale(1.17);
      filter: drop-shadow(0 0 7px currentColor);
    }
  }

  @keyframes dhe-energy-glow {
    0%,
    100% {
      transform: scale(0.72);
      opacity: 0.1;
    }
    45% {
      transform: scale(1.22);
      opacity: 0.28;
    }
  }

  @keyframes dhe-leaf-sway {
    0%,
    100% {
      transform: rotate(-7deg) translateY(0);
    }
    50% {
      transform: rotate(7deg) translateY(-1px);
    }
  }

  @keyframes dhe-eco-orbit {
    0%,
    100% {
      clip-path: ellipse(34% 48% at 44% 52%);
      transform: rotate(-18deg) scale(0.86);
      opacity: 0.14;
    }
    50% {
      clip-path: ellipse(42% 55% at 56% 48%);
      transform: rotate(18deg) scale(1.08);
      opacity: 0.28;
    }
  }

  @keyframes dhe-timer-orbit {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dhe-timer-tick {
    0% {
      transform: rotate(-9deg);
    }
    100% {
      transform: rotate(9deg);
    }
  }

  @keyframes dhe-weather-cloud {
    0%,
    100% {
      transform: translateX(-3px);
      opacity: 0.12;
    }
    50% {
      transform: translateX(4px);
      opacity: 0.26;
    }
  }

  @keyframes dhe-weather-drift {
    0%,
    100% {
      transform: translateX(-2px);
    }
    50% {
      transform: translateX(3px);
    }
  }

  @keyframes dhe-radio-pulse {
    0% {
      transform: scale(0.55);
      opacity: 0.22;
    }
    100% {
      transform: scale(1.45);
      opacity: 0;
    }
  }

  @keyframes dhe-wellness-aura {
    0%,
    100% {
      transform: scale(0.72) rotate(-8deg);
      opacity: 0.13;
    }
    50% {
      transform: scale(1.16) rotate(8deg);
      opacity: 0.3;
    }
  }

  @keyframes dhe-heart-beat {
    0%,
    55%,
    100% {
      transform: scale(1);
    }
    12% {
      transform: scale(1.16);
    }
    22% {
      transform: scale(0.98);
    }
    34% {
      transform: scale(1.1);
    }
  }

  @keyframes dhe-radio-beat {
    0%,
    65%,
    100% {
      transform: scale(1);
    }
    18% {
      transform: scale(1.15);
    }
    30% {
      transform: scale(1.04);
    }
  }

  @keyframes dhe-shield-sweep {
    0%,
    100% {
      clip-path: polygon(0 0, 18% 0, 0 100%, 0 100%);
      transform: translateX(-3px);
      opacity: 0.08;
    }
    50% {
      clip-path: polygon(0 0, 100% 0, 82% 100%, 0 100%);
      transform: translateX(3px);
      opacity: 0.24;
    }
  }

  @keyframes dhe-status-signal {
    0% {
      clip-path: circle(12% at 50% 72%);
      opacity: 0.1;
    }
    35% {
      clip-path: circle(34% at 50% 72%);
      opacity: 0.2;
    }
    70% {
      clip-path: circle(58% at 50% 72%);
      opacity: 0.28;
    }
    100% {
      clip-path: circle(80% at 50% 72%);
      opacity: 0.06;
    }
  }

  @keyframes dhe-alert-shake {
    0%,
    100% {
      transform: rotate(0);
    }
    20% {
      transform: rotate(-8deg);
    }
    35% {
      transform: rotate(7deg);
    }
    50% {
      transform: rotate(-4deg);
    }
  }

  @keyframes dhe-alert-pulse {
    0%,
    100% {
      transform: scale(0.72);
      opacity: 0.12;
    }
    45% {
      transform: scale(1.28);
      opacity: 0.32;
    }
  }

  @keyframes dhe-memory-rise {
    0%,
    100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-2px) scale(1.08);
    }
  }
`, vc = Ae`
  :host {
    --dhe-card-background: var(--ha-card-background, var(--card-background-color));
    --dhe-card-border-color: var(--ha-card-border-color, var(--divider-color));
    --dhe-secondary-background: var(--secondary-background-color, var(--dhe-card-background));
    --dhe-accent-color: var(--accent-color, var(--primary-color));
    --dhe-state-active-color: var(--state-active-color, var(--dhe-accent-color));
    --dhe-info-color: var(--info-color, var(--dhe-accent-color));
    --dhe-success-color: var(--success-color, #43a047);
    --dhe-warning-color: var(--warning-color, #f9a825);
    --dhe-error-color: var(--error-color, #e53935);
    --dhe-water-color: var(--dhe-user-icon-water-color, var(--dhe-info-color));
    --dhe-hot-color: var(--dhe-user-icon-hot-color, var(--dhe-error-color));
    --dhe-energy-color: var(--dhe-user-icon-energy-color, var(--dhe-warning-color));
    --dhe-eco-color: var(--dhe-user-icon-eco-color, var(--dhe-success-color));
    --dhe-wellness-color: var(
      --dhe-user-icon-wellness-color,
      color-mix(in srgb, var(--dhe-accent-color) 72%, var(--dhe-success-color))
    );
    --dhe-timer-color: var(
      --dhe-user-icon-timer-color,
      color-mix(in srgb, var(--dhe-accent-color) 68%, var(--secondary-text-color))
    );
    --dhe-weather-color: var(--dhe-user-icon-weather-color, var(--dhe-info-color));
    --dhe-radio-color: var(
      --dhe-user-icon-radio-color,
      color-mix(in srgb, var(--dhe-accent-color) 72%, var(--dhe-warning-color))
    );
    --dhe-safety-color: var(--dhe-user-icon-safety-color, var(--dhe-success-color));
    --dhe-status-color: var(--dhe-user-icon-status-color, var(--secondary-text-color));
    --dhe-ok-color: var(--dhe-user-icon-ok-color, var(--dhe-success-color));
    --dhe-alert-color: var(--dhe-user-icon-alert-color, var(--dhe-error-color));
    --dhe-memory-color: var(--dhe-user-icon-memory-color, var(--dhe-accent-color));
    --dhe-action-color: var(--dhe-user-icon-action-color, var(--dhe-state-active-color));
    --dhe-primary-gradient-start: color-mix(
      in srgb,
      var(--dhe-water-color) 90%,
      var(--dhe-accent-color)
    );
    --dhe-primary-gradient-end: color-mix(
      in srgb,
      var(--dhe-water-color) 62%,
      var(--dhe-card-background)
    );
    --dhe-hot-gradient-start: color-mix(
      in srgb,
      var(--dhe-warning-color) 42%,
      var(--dhe-hot-color)
    );
    --dhe-hot-gradient-end: var(--dhe-hot-color);
    --dhe-icon-background-alpha: 18%;
    --dhe-icon-active-background-alpha: 28%;
    --dhe-icon-ring-alpha: 22%;
    --dhe-icon-active-ring-alpha: 46%;
    --dhe-icon-glow-alpha: 18%;
    --dhe-icon-filter-alpha: 58%;
    --dhe-row-background: color-mix(
      in srgb,
      var(--dhe-card-background) 88%,
      var(--dhe-secondary-background)
    );
    --dhe-row-border: color-mix(in srgb, var(--dhe-card-border-color) 78%, transparent);
    --dhe-row-hover: color-mix(in srgb, var(--dhe-accent-color) 7%, var(--dhe-row-background));
    --dhe-row-shadow: inset 0 1px 0 color-mix(in srgb, var(--primary-text-color) 4%, transparent);
    --dhe-ha-icon-bubble-size: 36px;
    --dhe-ha-icon-size: 20px;
    --dhe-ha-row-height: 48px;
    --dhe-ha-row-inner-height: 40px;
    --dhe-ha-tile-height: 56px;
    --dhe-layout-row-height: 24px;
    --dhe-layout-section-gap: 14px;
    --dhe-layout-column-gap: 14px;
    --dhe-overview-tile-height: var(--dhe-ha-tile-height);
    --dhe-layout-icon-bubble-size: var(--dhe-ha-icon-bubble-size);
    --dhe-focus-ring-color: color-mix(in srgb, var(--primary-color) 84%, white 16%);
    --dhe-icon-motion-state: running;
    container-type: inline-size;
    display: block;
  }

  :host([hidden]) {
    display: none;
  }

  .dhe-card {
    color-scheme: light dark;
    overflow: hidden;
    padding: 16px;
    border: var(--ha-card-border-width, 0) solid var(--dhe-card-border-color);
    border-radius: var(--ha-card-border-radius, 8px);
    background: var(--dhe-card-background);
    box-shadow: var(--ha-card-box-shadow, none);
    color: var(--primary-text-color);
    font-family: var(
      --primary-font-family,
      var(--paper-font-body1_-_font-family, Roboto, sans-serif)
    );
  }

  header,
  .title-block,
  .entity-row,
  .media-row,
  .memory-row,
  .climate-control,
  .inline-control {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  header {
    justify-content: space-between;
    margin-bottom: 14px;
  }

  h2,
  h3,
  p {
    margin: 0;
    letter-spacing: 0;
  }

  h2 {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.2;
  }

  h3 {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
    color: var(--secondary-text-color);
    text-transform: uppercase;
  }

  h4 {
    margin: 0 0 8px;
    color: var(--secondary-text-color);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0;
  }

  p,
  span {
    color: var(--secondary-text-color);
    font-size: 13px;
    line-height: 1.3;
  }

  section {
    min-width: 0;
    padding: 10px 0;
    border-top: 1px solid var(--divider-color);
    content-visibility: auto;
    contain-intrinsic-size: auto 180px;
  }

  .content-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-auto-flow: row dense;
    grid-auto-rows: minmax(var(--dhe-layout-row-height), auto);
    column-gap: var(--dhe-layout-column-gap);
    align-items: start;
  }

  .tile-size-auto {
    --dhe-ha-tile-height: clamp(52px, 7cqi, 68px);
  }

  .tile-size-compact {
    --dhe-ha-icon-bubble-size: 34px;
    --dhe-ha-icon-size: 18px;
    --dhe-ha-tile-height: 52px;
  }

  .tile-size-normal {
    --dhe-ha-tile-height: 60px;
  }

  .tile-size-normal section {
    padding: 12px 0;
  }

  .tile-size-large {
    --dhe-ha-icon-bubble-size: 40px;
    --dhe-ha-icon-size: 22px;
    --dhe-ha-tile-height: 72px;
  }

  .tile-size-large section {
    padding: 14px 0;
  }

  .layout-mini {
    --dhe-ha-icon-bubble-size: 32px;
    --dhe-ha-icon-size: 18px;
    --dhe-ha-row-height: 44px;
    --dhe-ha-tile-height: 52px;
    --dhe-layout-row-height: 20px;
    --dhe-layout-section-gap: 10px;
    --dhe-layout-column-gap: 10px;
    padding: 12px;
  }

  .layout-mini header {
    margin-bottom: 8px;
  }

  .layout-mini h2 {
    font-size: 18px;
  }

  .layout-tablet {
    --dhe-layout-column-gap: 12px;
  }

  .layout-panel {
    min-height: var(--dhe-panel-min-height, calc(100dvh - 32px));
  }

  .layout-kiosk {
    min-height: var(--dhe-kiosk-min-height, 100dvh);
    padding: 20px;
    border-radius: 0;
    box-shadow: none;
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --dhe-icon-background-alpha: 22%;
      --dhe-icon-active-background-alpha: 34%;
      --dhe-icon-glow-alpha: 24%;
      --dhe-row-hover: color-mix(in srgb, var(--dhe-accent-color) 12%, var(--dhe-row-background));
    }
  }
`, yc = Ae`
  .temperature {
    text-align: right;
  }

  .error-banner {
    margin: 0 0 12px;
    padding: 10px 12px;
    border-radius: 8px;
    background: color-mix(in srgb, var(--error-color) 12%, transparent);
    color: var(--error-color);
    font-size: 13px;
    line-height: 1.35;
  }

  .temperature strong {
    display: block;
    font-size: 28px;
    line-height: 1;
  }

  .metric-grid {
    display: grid;
    grid-template-columns: repeat(var(--dhe-overview-columns, 3), minmax(0, 1fr));
    gap: 8px;
  }

  .metric {
    --dhe-metric-icon-bubble-size: var(
      --dhe-layout-icon-bubble-size,
      var(--dhe-ha-icon-bubble-size)
    );
    position: relative;
    display: grid;
    grid-template-columns: var(--dhe-metric-icon-bubble-size) minmax(0, 1fr) auto;
    gap: 2px 8px;
    align-items: center;
    box-sizing: border-box;
    min-width: 0;
    min-height: var(--dhe-overview-tile-height, var(--dhe-ha-tile-height));
    padding: 7px;
    border: 1px solid var(--dhe-row-border);
    border-radius: 8px;
    background: var(--dhe-row-background);
    box-shadow: var(--dhe-row-shadow);
    transition:
      background 160ms ease,
      border-color 160ms ease,
      box-shadow 160ms ease;
  }

  .metric-label,
  .metric-value,
  .overview-trend {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .metric-label {
    grid-row: 1;
    grid-column: 2;
    color: var(--secondary-text-color);
    font-size: 12px;
    line-height: 1.2;
  }

  .metric-value {
    grid-row: 2;
    grid-column: 2;
    color: var(--primary-text-color);
    font-size: 16px;
  }

  .metric .icon-bubble {
    grid-row: 1 / 3;
    flex-basis: var(--dhe-metric-icon-bubble-size);
    width: var(--dhe-metric-icon-bubble-size);
    height: var(--dhe-metric-icon-bubble-size);
    --mdc-icon-size: clamp(18px, calc(var(--dhe-metric-icon-bubble-size) * 0.56), 24px);
  }

  .overview-trend {
    position: absolute;
    top: 7px;
    right: 7px;
    display: inline-flex;
    align-items: center;
    gap: 3px;
    max-width: 72px;
    color: var(--secondary-text-color);
    font-size: 11px;
  }

  .overview-trend ha-icon {
    --mdc-icon-size: 14px;
    flex: 0 0 14px;
  }

  .overview-trend.trend-up {
    color: var(--dhe-warning-color);
  }

  .overview-trend.trend-down {
    color: var(--dhe-info-color);
  }

  .overview-trend.trend-flat {
    color: var(--secondary-text-color);
  }

  @container (max-width: 520px) {
    .overview-trend {
      max-width: 18px;
    }

    .overview-trend .overview-delta {
      display: none;
    }
  }

  .overview-sparkline {
    position: absolute;
    right: 7px;
    bottom: 3px;
    left: calc(var(--dhe-metric-icon-bubble-size) + 15px);
    width: auto;
    height: 10px;
    color: var(--dhe-icon-color, var(--primary-color));
    opacity: 0.58;
    pointer-events: none;
  }

  .overview-sparkline polyline {
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2.5;
    vector-effect: non-scaling-stroke;
  }

  .metric.overview-condition-alert {
    border-color: color-mix(in srgb, var(--dhe-error-color) 46%, var(--dhe-row-border));
    background: color-mix(in srgb, var(--dhe-error-color) 8%, var(--dhe-row-background));
  }

  .metric.overview-condition-warning {
    border-color: color-mix(in srgb, var(--dhe-warning-color) 42%, var(--dhe-row-border));
    background: color-mix(in srgb, var(--dhe-warning-color) 8%, var(--dhe-row-background));
  }

  .metric.overview-condition-active,
  .metric.overview-condition-ok {
    border-color: color-mix(in srgb, var(--dhe-success-color) 26%, var(--dhe-row-border));
  }

  .metric.overview-group-water {
    --dhe-icon-color: var(--dhe-water-color);
  }

  .metric.overview-group-temperature {
    --dhe-icon-color: var(--dhe-hot-color);
  }

  .metric.overview-group-energy {
    --dhe-icon-color: var(--dhe-energy-color);
  }

  .metric.overview-group-status {
    --dhe-icon-color: var(--dhe-status-color);
  }

  .metric.overview-group-bath {
    --dhe-icon-color: var(--dhe-water-color);
  }

  .metric.overview-group-timer {
    --dhe-icon-color: var(--dhe-timer-color);
  }

  .metric.overview-group-saving,
  .metric.overview-group-control {
    --dhe-icon-color: var(--dhe-eco-color);
  }

  .rows {
    display: grid;
    gap: 6px;
  }

  .entity-row,
  .media-row,
  .memory-row {
    box-sizing: border-box;
    min-height: var(--dhe-ha-row-height);
    padding: 4px;
    border: 1px solid var(--dhe-row-border);
    border-radius: 8px;
    background: var(--dhe-row-background);
    box-shadow: var(--dhe-row-shadow);
    transition:
      background 160ms ease,
      border-color 160ms ease,
      box-shadow 160ms ease;
  }

  .entity-row:hover,
  .entity-row:focus-within,
  .media-row:hover,
  .media-row:focus-within,
  .memory-row:hover,
  .memory-row:focus-within,
  .display-button-tile:hover,
  .display-button-tile:focus-within,
  .metric:hover,
  .metric:focus-visible {
    border-color: color-mix(in srgb, var(--primary-color) 40%, var(--dhe-row-border));
    background: var(--dhe-row-hover);
    box-shadow:
      var(--dhe-row-shadow),
      0 2px 10px rgba(0, 0, 0, 0.08);
  }

  .subsection,
  .radio-favorites {
    margin-top: 12px;
  }

  .favorite-list {
    display: grid;
    gap: 6px;
  }

  .favorite-item {
    min-width: 0;
  }

  .favorite-item > .favorite-row {
    width: 100%;
  }

  .main {
    display: grid;
    flex: 1;
    min-width: 0;
    gap: 2px;
  }

  .main strong,
  .main span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .main strong {
    color: var(--primary-text-color);
    font-size: 14px;
    font-weight: 500;
    line-height: 1.25;
  }

  .main span {
    color: var(--secondary-text-color);
    font-size: 13px;
    line-height: 1.25;
  }

  button,
  select,
  input {
    font: inherit;
  }

  button {
    cursor: pointer;
    border: 0;
    color: var(--primary-text-color);
    background: color-mix(in srgb, var(--secondary-background-color) 86%, transparent);
  }

  button:disabled,
  input:disabled,
  select:disabled {
    cursor: default;
    opacity: 0.62;
  }

  .display-button-tile.busy,
  .entity-row.busy,
  .media-row.busy,
  .memory-row.busy,
  .climate-control.busy,
  .inline-control.busy,
  .service-box.busy {
    border-color: color-mix(in srgb, var(--primary-color) 36%, var(--dhe-row-border));
  }

  .entity-action {
    min-width: 0;
    border: 0;
    color: inherit;
    background: transparent;
    text-align: left;
    transition:
      background 160ms ease,
      color 160ms ease;
  }

  .metric.entity-action {
    border: 1px solid var(--dhe-row-border);
    background: var(--dhe-row-background);
    box-shadow: var(--dhe-row-shadow);
  }

  .metric.entity-action:not(:disabled):hover,
  .metric.entity-action:not(:disabled):focus-visible {
    border-color: color-mix(in srgb, var(--primary-color) 40%, var(--dhe-row-border));
    background: var(--dhe-row-hover);
    box-shadow:
      var(--dhe-row-shadow),
      0 2px 10px rgba(0, 0, 0, 0.08);
  }

  .entity-action:not(:disabled):hover .icon-bubble,
  .entity-action:not(:disabled):focus-visible .icon-bubble {
    transform: translateY(-1px);
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--dhe-icon-color) 42%, transparent),
      0 6px 16px color-mix(in srgb, var(--dhe-icon-color) 20%, transparent);
  }

  .title-block.entity-action,
  .temperature.entity-action,
  .entity-main,
  .media-main {
    padding: 0;
  }

  .title-block.entity-action {
    flex: 1 1 auto;
  }

  .temperature.entity-action {
    flex: 0 0 auto;
  }

  .entity-main,
  .media-main {
    display: flex;
    flex: 1;
    align-items: center;
    gap: 12px;
    box-sizing: border-box;
    min-height: var(--dhe-ha-row-inner-height);
    padding: 0 6px;
    border-radius: 8px;
  }

  .row-control {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: flex-end;
    min-width: 0;
  }

  .row-control select {
    width: min(154px, 100%);
    max-width: 154px;
  }

  button.icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 36px;
    width: 36px;
    height: 36px;
    border-radius: 999px;
  }

  button.chip {
    min-height: 32px;
    padding: 0 12px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
  }

  button.active,
  button.chip:hover,
  button.icon:hover,
  .favorite-row.active,
  .favorite-row:hover {
    background: color-mix(in srgb, var(--primary-color) 18%, transparent);
    color: var(--primary-color);
  }

  button.danger {
    color: var(--error-color);
  }

  button:focus-visible,
  input:focus-visible,
  select:focus-visible {
    outline: 2px solid var(--dhe-focus-ring-color);
    outline-offset: 2px;
  }

  input,
  select {
    min-height: 36px;
    box-sizing: border-box;
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    background: var(--card-background-color);
    color: var(--primary-text-color);
  }

  input[type="number"] {
    width: 76px;
    padding: 6px 8px;
    text-align: center;
  }

  input[type="text"],
  select {
    width: 100%;
    min-width: 0;
    padding: 6px 8px;
  }

  .entity-row input[type="text"],
  .entity-row select {
    width: min(190px, 34vw);
  }

  input[type="range"] {
    width: 100%;
    accent-color: var(--primary-color);
  }

  .climate-control {
    flex-wrap: wrap;
    margin-bottom: 8px;
    box-sizing: border-box;
    min-height: var(--dhe-ha-row-height);
    padding: 8px;
    border: 1px solid var(--dhe-row-border);
    border-radius: 8px;
    background: var(--dhe-row-background);
    box-shadow: var(--dhe-row-shadow);
  }

  .temperature-control {
    display: grid;
    flex: 1 1 180px;
    min-width: 0;
    gap: 4px;
  }

  .inline-control,
  .service-box {
    display: grid;
    grid-template-columns: minmax(120px, 1fr) minmax(120px, 1fr);
    gap: 8px;
    margin-top: 8px;
  }

  .service-box {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
    padding: 8px;
    border: 1px solid var(--dhe-row-border);
    border-radius: 8px;
    background: var(--dhe-row-background);
    box-shadow: var(--dhe-row-shadow);
  }

  .support-actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 10px;
  }

  .support-actions button.chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .support-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
    gap: 8px;
  }

  .support-panel {
    min-width: 0;
    padding: 10px;
    border: 1px solid var(--dhe-row-border);
    border-radius: 8px;
    background: var(--dhe-row-background);
    box-shadow: var(--dhe-row-shadow);
  }

  .support-panel h4 {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .support-score {
    display: grid;
    grid-template-columns: 44px minmax(0, 1fr);
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  .support-score strong {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--dhe-support-color) 16%, transparent);
    color: var(--dhe-support-color);
    font-size: 18px;
  }

  .support-score.pass {
    --dhe-support-color: var(--dhe-success-color);
  }

  .support-score.warn {
    --dhe-support-color: var(--dhe-warning-color);
  }

  .support-score.fail {
    --dhe-support-color: var(--dhe-error-color);
  }

  .support-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
    gap: 8px;
    margin: 0;
  }

  .support-stats div {
    min-width: 0;
  }

  .support-stats dt,
  .support-check span,
  .support-entity-row span,
  .support-domain-list span {
    color: var(--secondary-text-color);
    font-size: 12px;
  }

  .support-stats dd {
    margin: 2px 0 0;
    overflow: hidden;
    color: var(--primary-text-color);
    font-size: 14px;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .support-checks,
  .support-entity-list,
  .support-domain-list {
    display: grid;
    gap: 6px;
  }

  .support-entity-list {
    max-height: 340px;
    overflow: auto;
    padding-right: 2px;
  }

  .support-domain-list {
    grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
    margin-top: 10px;
  }

  .support-check,
  .support-entity-row {
    display: grid;
    align-items: center;
    gap: 6px;
    min-width: 0;
    min-height: 32px;
    padding: 4px 6px;
    border-radius: 8px;
    background: color-mix(in srgb, var(--dhe-card-background) 72%, transparent);
  }

  .support-check:focus-within,
  .support-entity-row:focus-within {
    outline: 2px solid var(--dhe-focus-ring-color);
    outline-offset: 1px;
  }

  .support-check {
    grid-template-columns: 22px minmax(0, 1fr) auto auto;
  }

  .support-entity-row {
    grid-template-columns: minmax(0, 1fr) auto auto auto;
    border-left: 3px solid transparent;
  }

  .support-check ha-icon {
    --mdc-icon-size: 20px;
    color: var(--dhe-support-color);
  }

  .support-check.pass {
    --dhe-support-color: var(--dhe-success-color);
  }

  .support-check.warn {
    --dhe-support-color: var(--dhe-warning-color);
  }

  .support-check.fail {
    --dhe-support-color: var(--dhe-error-color);
  }

  .support-entity-row.available {
    border-left-color: var(--dhe-success-color);
  }

  .support-entity-row.unavailable,
  .support-entity-row.unknown {
    border-left-color: var(--dhe-warning-color);
  }

  .support-entity-row.missing {
    border-left-color: var(--dhe-error-color);
  }

  .support-check span,
  .support-entity-row span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .support-check strong,
  .support-check small,
  .support-entity-row strong,
  .support-entity-row small {
    font-size: 12px;
    white-space: nowrap;
  }

  .display-button-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
    gap: 8px;
  }

  .display-button-tile {
    display: grid;
    grid-template-rows: 1fr auto;
    box-sizing: border-box;
    min-width: 0;
    min-height: max(96px, calc(var(--dhe-overview-tile-height, 56px) * 1.75));
    border: 1px solid var(--dhe-row-border);
    border-radius: 8px;
    background: var(--dhe-row-background);
    box-shadow: var(--dhe-row-shadow);
    transition:
      background 160ms ease,
      border-color 160ms ease,
      box-shadow 160ms ease;
  }

  .display-button-tile.active {
    border-color: color-mix(in srgb, var(--primary-color) 46%, var(--dhe-row-border));
    background: color-mix(in srgb, var(--primary-color) 10%, var(--dhe-row-background));
  }

  .display-button-main {
    display: grid;
    align-content: start;
    justify-items: start;
    min-width: 0;
    padding: 8px;
    gap: 6px;
    border-radius: 8px;
    background: transparent;
    text-align: left;
  }

  .display-button-main span,
  .display-button-main strong {
    width: 100%;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .display-button-main span {
    color: var(--secondary-text-color);
    font-size: 12px;
  }

  .display-button-main strong {
    color: var(--primary-text-color);
    font-size: 14px;
    font-weight: 500;
  }

  .display-button-control {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    padding: 0 8px 8px;
  }

  .display-button-control > * {
    flex: 1 1 auto;
    min-width: 0;
  }

  .display-button-control button.icon {
    flex: 0 0 36px;
  }

  .display-button-control button.chip {
    display: inline-flex;
    justify-content: center;
    width: 100%;
  }

  .favorite-row {
    display: grid;
    grid-template-columns: 30px minmax(0, 1fr) auto;
    align-items: center;
    gap: 8px;
    box-sizing: border-box;
    min-width: 0;
    min-height: var(--dhe-ha-row-height);
    padding: 4px 8px 4px 5px;
    border: 1px solid var(--dhe-row-border);
    border-radius: 8px;
    background: var(--dhe-row-background);
    box-shadow: var(--dhe-row-shadow);
    text-align: left;
    transition:
      background 160ms ease,
      border-color 160ms ease,
      color 160ms ease;
  }

  .favorite-row.active {
    border-color: color-mix(in srgb, var(--primary-color) 46%, var(--dhe-row-border));
  }

  .favorite-row span {
    min-width: 0;
    overflow: hidden;
    color: inherit;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .favorite-row small {
    color: var(--secondary-text-color);
    font-size: 12px;
  }

  .favorite-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--primary-color) 14%, transparent);
    color: var(--primary-color);
    --state-icon-color: var(--primary-color);
    --paper-item-icon-color: var(--primary-color);
    --mdc-icon-size: 18px;
  }

  .memory-fields {
    display: grid;
    grid-template-columns: minmax(120px, 1fr) 92px;
    flex: 1;
    min-width: 0;
    gap: 8px;
  }

  @container (min-width: 560px) {
    .dhe-card {
      padding: 18px;
    }

    .content-grid {
      grid-template-columns: repeat(12, minmax(0, 1fr));
      align-items: start;
      column-gap: var(--dhe-layout-column-gap, 16px);
    }

    .content-grid > .card-section {
      grid-column: span 6;
    }

    .content-grid > [data-section="overview"] {
      grid-column: 1 / -1;
    }

    .content-grid > [data-section="controls"],
    .content-grid > [data-section="memory"] {
      grid-column: span 7;
    }

    .content-grid > [data-section="bath"],
    .content-grid > [data-section="timers"],
    .content-grid > [data-section="consumption"],
    .content-grid > [data-section="saving"],
    .content-grid > [data-section="weather"],
    .content-grid > [data-section="radio"],
    .content-grid > [data-section="support"],
    .content-grid > [data-section="actions"] {
      grid-column: span 5;
    }

    .rows.memory {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }

    .favorite-list {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    .display-button-grid {
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
    }

    .service-box {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }

    .layout-panel .content-grid > [data-section] {
      grid-column: 1 / -1;
    }

    .layout-tablet .content-grid > [data-section],
    .layout-kiosk .content-grid > [data-section] {
      grid-column: span 6;
    }

    .layout-tablet .content-grid > [data-section="overview"],
    .layout-tablet .content-grid > [data-section="diagnostics"],
    .layout-tablet .content-grid > [data-section="support"] {
      grid-column: 1 / -1;
    }

    .layout-kiosk .content-grid > [data-section="overview"] {
      grid-column: 1 / -1;
    }
  }

  @container (min-width: 1060px) {
    .layout-auto .content-grid,
    .layout-kiosk .content-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      column-gap: 18px;
    }

    .layout-auto .content-grid > [data-section],
    .layout-kiosk .content-grid > [data-section] {
      grid-column: span 1;
    }

    .layout-auto .content-grid > [data-section="overview"],
    .layout-kiosk .content-grid > [data-section="overview"] {
      grid-column: 1 / -1;
    }

    .layout-auto .content-grid > [data-section="controls"],
    .layout-auto .content-grid > [data-section="memory"] {
      grid-column: span 2;
    }

    .layout-panel .content-grid > [data-section] {
      grid-column: 1 / -1;
    }
  }

  @container (max-width: 360px) {
    .metric-grid {
      grid-template-columns: minmax(0, 1fr);
    }

    .entity-row,
    .media-row,
    .memory-row {
      gap: 8px;
    }

    .entity-main,
    .media-main {
      gap: 8px;
      padding: 0 2px;
    }

    input[type="number"] {
      width: 68px;
    }

    .entity-row input[type="text"],
    .entity-row select {
      width: min(112px, 100%);
    }

    .row-control select {
      width: 112px;
      max-width: 112px;
    }
  }

  @media (max-width: 520px) {
    .dhe-card {
      padding: 12px;
    }

    header {
      align-items: flex-start;
    }

    .temperature strong {
      font-size: 22px;
    }

    .entity-row,
    .media-row,
    .memory-row {
      gap: 8px;
    }

    .media-row {
      flex-wrap: wrap;
    }

    .memory-fields,
    .inline-control {
      grid-template-columns: 1fr;
    }
  }
`, bc = Ae`
  .icon-bubble {
    --dhe-icon-color: var(--dhe-water-color);
    position: relative;
    display: inline-flex;
    flex: 0 0 var(--dhe-ha-icon-bubble-size);
    align-items: center;
    justify-content: center;
    width: var(--dhe-ha-icon-bubble-size);
    height: var(--dhe-ha-icon-bubble-size);
    overflow: hidden;
    border-radius: 999px;
    background: color-mix(
      in srgb,
      var(--dhe-icon-color) var(--dhe-icon-background-alpha),
      transparent
    );
    color: var(--dhe-icon-color);
    --state-icon-color: var(--dhe-icon-color);
    --paper-item-icon-color: var(--dhe-icon-color);
    --iron-icon-fill-color: var(--dhe-icon-color);
    --mdc-icon-size: var(--dhe-ha-icon-size);
    box-shadow:
      inset 0 0 0 1px
        color-mix(in srgb, var(--dhe-icon-color) var(--dhe-icon-ring-alpha), transparent),
      0 0 0 color-mix(in srgb, var(--dhe-icon-color) 0%, transparent);
    transition:
      background 160ms ease,
      box-shadow 160ms ease,
      transform 160ms ease;
  }

  .icon-bubble ha-icon {
    position: relative;
    z-index: 1;
    color: var(--dhe-icon-color) !important;
    fill: var(--dhe-icon-color) !important;
  }

  .icon-bubble.animated::after {
    position: absolute;
    inset: 5px;
    border-radius: inherit;
    background: currentColor;
    content: "";
    opacity: 0.2;
    contain: paint;
    animation-play-state: var(--dhe-icon-motion-state, running);
  }

  .icon-bubble.primary {
    --dhe-icon-color: var(--text-primary-color, #ffffff);
    background: linear-gradient(
      135deg,
      var(--dhe-primary-gradient-start),
      var(--dhe-primary-gradient-end)
    );
    color: var(--dhe-icon-color);
    box-shadow: 0 8px 18px
      color-mix(in srgb, var(--dhe-water-color) 28%, transparent);
  }

  .icon-bubble.primary.water {
    --dhe-icon-color: var(--text-primary-color, #ffffff);
  }

  .icon-bubble.primary.hot {
    --dhe-icon-color: var(--text-primary-color, #ffffff);
    background: linear-gradient(
      135deg,
      var(--dhe-hot-gradient-start),
      var(--dhe-hot-gradient-end)
    );
    box-shadow: 0 8px 18px
      color-mix(in srgb, var(--dhe-hot-color) 26%, transparent);
  }

  .icon-bubble.active {
    background: color-mix(
      in srgb,
      var(--dhe-icon-color) var(--dhe-icon-active-background-alpha),
      transparent
    );
    box-shadow:
      0 0 0 1px
        color-mix(
          in srgb,
          var(--dhe-icon-color) var(--dhe-icon-active-ring-alpha),
          transparent
        ),
      0 0 18px color-mix(in srgb, var(--dhe-icon-color) var(--dhe-icon-glow-alpha), transparent),
      inset 0 0 18px
        color-mix(in srgb, var(--dhe-icon-color) 24%, transparent);
  }

  .icon-bubble.primary.active {
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--dhe-water-color) 94%, var(--dhe-accent-color)),
      color-mix(in srgb, var(--dhe-water-color) 72%, var(--dhe-card-background))
    );
  }

  .icon-bubble.primary.hot.active {
    background: linear-gradient(
      135deg,
      var(--dhe-hot-gradient-start),
      var(--dhe-hot-gradient-end)
    );
  }

  .icon-bubble.water {
    --dhe-icon-color: var(--dhe-water-color);
  }

  .icon-bubble.wellness {
    --dhe-icon-color: var(--dhe-wellness-color);
  }

  .icon-bubble.energy {
    --dhe-icon-color: var(--dhe-energy-color);
  }

  .icon-bubble.hot {
    --dhe-icon-color: var(--dhe-hot-color);
  }

  .icon-bubble.eco {
    --dhe-icon-color: var(--dhe-eco-color);
  }

  .icon-bubble.timer {
    --dhe-icon-color: var(--dhe-timer-color);
  }

  .icon-bubble.weather {
    --dhe-icon-color: var(--dhe-weather-color);
  }

  .icon-bubble.radio {
    --dhe-icon-color: var(--dhe-radio-color);
  }

  .icon-bubble.safety {
    --dhe-icon-color: var(--dhe-safety-color);
  }

  .icon-bubble.status {
    --dhe-icon-color: var(--dhe-status-color);
  }

  .icon-bubble.ok {
    --dhe-icon-color: var(--dhe-ok-color);
  }

  .icon-bubble.alert {
    --dhe-icon-color: var(--dhe-alert-color);
  }

  .icon-bubble.memory {
    --dhe-icon-color: var(--dhe-memory-color);
  }

  .icon-bubble.action {
    --dhe-icon-color: var(--dhe-action-color);
  }

  .icon-theme-ha .icon-bubble:not(.primary):not(.alert):not(.hot):not(.ok) {
    --dhe-icon-color: var(--dhe-state-active-color);
    background: color-mix(
      in srgb,
      var(--dhe-state-active-color) var(--dhe-icon-background-alpha),
      var(--dhe-card-background)
    );
    color: var(--dhe-icon-color);
  }

  .icon-theme-muted .icon-bubble:not(.primary) {
    --dhe-icon-background-alpha: 10%;
    --dhe-icon-active-background-alpha: 16%;
    --dhe-icon-ring-alpha: 14%;
    --dhe-icon-active-ring-alpha: 28%;
    --dhe-icon-glow-alpha: 10%;
    background: color-mix(in srgb, var(--dhe-row-background) 78%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--divider-color) 80%, transparent);
    opacity: 0.9;
  }

  .icon-theme-vivid .icon-bubble:not(.primary) {
    --dhe-icon-background-alpha: 26%;
    --dhe-icon-active-background-alpha: 38%;
    --dhe-icon-ring-alpha: 44%;
    --dhe-icon-active-ring-alpha: 58%;
    --dhe-icon-glow-alpha: 24%;
    background: color-mix(in srgb, var(--dhe-icon-color) 26%, transparent);
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--dhe-icon-color) 44%, transparent),
      0 0 14px color-mix(in srgb, var(--dhe-icon-color) 16%, transparent);
  }

  .icon-bubble.animated ha-icon {
    filter: drop-shadow(
      0 0 5px
        color-mix(in srgb, var(--dhe-icon-color) var(--dhe-icon-filter-alpha), transparent)
    );
    contain: paint;
    animation-play-state: var(--dhe-icon-motion-state, running);
  }

  .icon-bubble.animated.active::after,
  .icon-bubble.animated.active ha-icon {
    will-change: transform, opacity, filter, clip-path;
  }

  .icon-bubble.animated.motion-water-flow::after {
    background: linear-gradient(180deg, transparent 38%, currentColor 40%);
    animation: dhe-water-wave 2.8s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-water-flow ha-icon {
    animation: dhe-icon-float 2.8s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-water-fill::after {
    background: linear-gradient(180deg, transparent 42%, currentColor 44%);
    animation: dhe-water-fill 3.2s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-water-fill ha-icon {
    animation: dhe-water-fill-icon 3.2s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-energy ha-icon {
    animation: dhe-energy-spark 1.7s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-energy::after {
    animation: dhe-energy-glow 1.7s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-heat ha-icon {
    transform-origin: 50% 85%;
    animation: dhe-heat-flicker 2.1s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-heat::after {
    background:
      radial-gradient(circle at 45% 72%, currentColor 0 12%, transparent 13%),
      radial-gradient(circle at 58% 65%, currentColor 0 10%, transparent 11%);
    animation: dhe-heat-steam 2.1s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-eco ha-icon {
    transform-origin: 50% 82%;
    animation: dhe-leaf-sway 3.4s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-eco::after {
    animation: dhe-eco-orbit 3.4s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-timer::after {
    inset: 9px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    background: transparent;
    animation: dhe-timer-orbit 1.8s linear infinite;
  }

  .icon-bubble.animated.motion-timer ha-icon {
    transform-origin: center;
    animation: dhe-timer-tick 1.4s steps(2, end) infinite;
  }

  .icon-bubble.animated.motion-weather::after {
    background:
      radial-gradient(circle at 36% 50%, currentColor 0 23%, transparent 25%),
      radial-gradient(circle at 58% 46%, currentColor 0 30%, transparent 32%);
    animation: dhe-weather-cloud 3.6s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-weather ha-icon {
    animation: dhe-weather-drift 3.6s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-wellness::after {
    background:
      radial-gradient(circle at 42% 44%, currentColor 0 19%, transparent 21%),
      radial-gradient(circle at 58% 58%, currentColor 0 24%, transparent 26%);
    animation: dhe-wellness-aura 2.9s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-wellness ha-icon {
    transform-origin: 50% 75%;
    animation: dhe-heart-beat 2.2s ease-out infinite;
  }

  .icon-bubble.animated.motion-radio::after {
    animation: dhe-radio-pulse 2s ease-out infinite;
  }

  .icon-bubble.animated.motion-radio ha-icon {
    transform-origin: 50% 80%;
    animation: dhe-radio-beat 1.6s ease-out infinite;
  }

  .icon-bubble.animated.motion-safety::after {
    animation: dhe-shield-sweep 2.8s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-status::after {
    animation: dhe-status-signal 2.4s steps(4, end) infinite;
  }

  .icon-bubble.animated.motion-alert ha-icon {
    transform-origin: 50% 80%;
    animation: dhe-alert-shake 1.45s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-alert::after {
    animation: dhe-alert-pulse 1.45s ease-in-out infinite;
  }

  .icon-bubble.animated.motion-memory ha-icon {
    animation: dhe-memory-rise 2.4s ease-in-out infinite;
  }
`, wc = [vc, bc, yc, fc];
function $c(e, t, i) {
  const r = t.device_id ?? i.deviceId, n = new Set(t.hide_entities), o = k.filter(
    (_) => !n.has(_.key)
  ), a = o.map(
    (_) => Ac(e, i, _, r)
  ), s = a.filter((_) => _.entityIdHash).length, c = a.filter((_) => _.status === "available").length, u = a.filter(
    (_) => ["unavailable", "unknown"].includes(_.status)
  ).length, f = a.filter(
    (_) => !_.optional && _.status === "missing"
  ).length, h = a.filter(
    (_) => _.optional && _.status === "missing"
  ).length, v = r ? Kt(e, r).filter(
    ([, _]) => !!(_.disabled_by || _.hidden_by || _.hidden)
  ).length : 0, p = a.filter(
    (_) => _.diagnostic && _.status !== "missing"
  ).length, y = {
    generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    summary: {
      knownEntities: o.length,
      mappedEntities: s,
      availableEntities: c,
      unavailableEntities: u,
      missingRequiredEntities: f,
      missingOptionalEntities: h,
      disabledOrHiddenRegistryEntities: v,
      diagnosticEntities: p
    },
    diagnostics: {
      cardType: t.type,
      deviceIdHash: ye(i.deviceId),
      configEntryIdHash: ye(i.configEntryId),
      baseEntityHash: ye(i.baseEntity),
      selectedDevice: xc(e, t, i),
      entityRegistryAvailable: !!e.entities,
      deviceRegistryAvailable: !!e.devices,
      domains: Tc(e, i)
    },
    entities: a,
    checks: []
  };
  return y.checks = Cc(y), y;
}
function Sc(e, t) {
  return {
    schema: "dhe-connect-card-support/v1",
    generated_at: e.generatedAt,
    card: {
      type: t.type,
      sections: [...t.sections],
      options: {
        show_unavailable: t.show_unavailable,
        show_optional: t.show_optional,
        show_diagnostics: t.show_diagnostics,
        show_weather_services: t.show_weather_services,
        show_icon_animations: t.show_icon_animations,
        show_display_buttons: t.show_display_buttons,
        show_support_mode: t.show_support_mode,
        icon_theme: t.icon_theme,
        layout_mode: t.layout_mode,
        tile_size: t.tile_size,
        overview_columns: t.overview_columns
      },
      entity_overrides: Object.keys(t.entities).length,
      hidden_entities: t.hide_entities.length,
      overview_entities: t.overview_entities.length
    },
    diagnostics: e.diagnostics,
    summary: e.summary,
    checks: e.checks,
    entities: e.entities
  };
}
function kc(e = /* @__PURE__ */ new Date()) {
  return `dhe-connect-card-support-${e.toISOString().replace(/[:.]/g, "-")}.json`;
}
function Ec(e, t) {
  if (typeof document > "u" || typeof URL > "u" || typeof URL.createObjectURL != "function" || typeof Blob > "u")
    return;
  const i = URL.createObjectURL(new Blob([t], { type: "application/json" })), r = document.createElement("a");
  r.href = i, r.download = e, r.rel = "noopener", r.click(), window.setTimeout(() => URL.revokeObjectURL(i), 0);
}
function xc(e, t, i) {
  const r = t.device_id ?? i.deviceId;
  return r ? e.devices?.[r] ? !0 : Kt(e, r).some(
    ([, n]) => n.device_id === r
  ) : !1;
}
function Ac(e, t, i, r) {
  const n = t.entityIds[i.key], o = (n ? [n, e.entities?.[n]] : void 0) ?? Oc(e, r, i), a = o?.[0], s = o?.[1], c = Tt(e, n ?? a);
  return {
    key: i.key,
    domain: i.domain,
    optional: !!i.optional,
    diagnostic: !!i.diagnostic,
    dangerous: !!i.dangerous,
    status: Dc(c),
    registryStatus: Nc(s),
    entityIdHash: ye(n ?? a),
    registryHash: ye(s?.unique_id ?? s?.translation_key)
  };
}
function Cc(e) {
  return [
    {
      key: "device",
      level: e.diagnostics.selectedDevice ? "pass" : "warn"
    },
    {
      key: "base_entity",
      level: e.diagnostics.baseEntityHash ? "pass" : "fail"
    },
    {
      key: "entity_registry",
      level: e.diagnostics.entityRegistryAvailable ? "pass" : "warn"
    },
    {
      key: "device_registry",
      level: e.diagnostics.deviceRegistryAvailable ? "pass" : "warn"
    },
    {
      key: "active_entities",
      level: e.summary.availableEntities > 0 ? "pass" : "fail",
      value: e.summary.availableEntities
    },
    {
      key: "required_entities",
      level: e.summary.missingRequiredEntities === 0 ? "pass" : "warn",
      value: e.summary.missingRequiredEntities
    },
    {
      key: "unavailable_entities",
      level: e.summary.unavailableEntities === 0 ? "pass" : "warn",
      value: e.summary.unavailableEntities
    },
    {
      key: "disabled_entities",
      level: e.summary.disabledOrHiddenRegistryEntities === 0 ? "pass" : "warn",
      value: e.summary.disabledOrHiddenRegistryEntities
    },
    {
      key: "custom_element",
      level: Ic() ? "pass" : "warn"
    },
    {
      key: "support_export",
      level: "pass"
    }
  ];
}
function Tc(e, t) {
  const i = {};
  for (const r of Object.values(t.entityIds)) {
    if (!Tt(e, r))
      continue;
    const n = r.split(".", 1)[0] ?? "unknown";
    i[n] = (i[n] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(i).sort(([r], [n]) => r.localeCompare(n)));
}
function Kt(e, t) {
  return Object.entries(e.entities ?? {}).filter(([, i]) => i.platform !== Ze ? !1 : !t || i.device_id === t);
}
function Oc(e, t, i) {
  if (t)
    return Kt(e, t).find(([r, n]) => r.startsWith(`${i.domain}.`) ? vo(i, r, n) : !1);
}
function Dc(e) {
  return e ? e.state === "unknown" ? "unknown" : L(e) ? "unavailable" : "available" : "missing";
}
function Nc(e) {
  return e ? e.disabled_by ? "disabled" : e.hidden || e.hidden_by ? "hidden" : "enabled" : "unknown";
}
function Ic() {
  return typeof customElements > "u" || !!customElements.get("dhe-connect-card");
}
function ye(e) {
  if (!e)
    return;
  let t = 2166136261;
  for (let i = 0; i < e.length; i += 1)
    t ^= e.charCodeAt(i), t = Math.imul(t, 16777619);
  return `h${(t >>> 0).toString(16).padStart(8, "0")}`;
}
var Rc = Object.defineProperty, Bc = Object.getOwnPropertyDescriptor, ue = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Bc(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (r ? a(t, i, n) : a(n)) || n);
  return r && n && Rc(t, i, n), n;
};
const zc = [...bt, ...Ve];
let M = class extends te {
  constructor() {
    super(...arguments), this._config = ie({}), this._weatherService = Ks, this._weatherForm = { ...Ps }, this._busyActionKeys = /* @__PURE__ */ new Set(), this._discoveryCache = new er(), this._overviewTiles = new us(), this._actions = new Ba(), this._serviceCalls = new zs((e) => {
      this._busyActionKeys = new Set(e);
    }), this._translationsChanged = () => {
      this._overviewTiles.clear(), this.requestUpdate();
    }, this._cancelHoldAction = () => {
      this._actions.handlePointerEnd();
    };
  }
  setConfig(e) {
    const t = Ei(this._config);
    this._config = ie(e), this._supportModelCache = void 0, this._renderableSectionsCache = void 0, Ei(this._config) !== t && this.requestUpdate();
  }
  getCardSize() {
    return es(this._config);
  }
  static getConfigElement() {
    return document.createElement("dhe-connect-card-editor");
  }
  static getStubConfig(e) {
    return { type: "custom:dhe-connect-card", device_id: Ji(e, ie({})).deviceId };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(ke, this._translationsChanged);
  }
  disconnectedCallback() {
    window.removeEventListener(ke, this._translationsChanged), this._actions.clear(), this._serviceCalls.clear(), this._discoveryCache.clear(), this._overviewTiles.clear(), this._supportModelCache = void 0, this._renderableSectionsCache = void 0, super.disconnectedCallback();
  }
  render() {
    if (!this.hass)
      return l`<ha-card class="dhe-card">${d(void 0, "state.loading")}</ha-card>`;
    const e = Re("discovery", () => this._discoverEntities()), t = this._entityResolver(e), i = t("water_heating"), r = i.entityId, n = ho(
      this._config.name,
      i.definition,
      i.state,
      this.hass
    ), o = this._sectionRenderContext(t), a = Re(
      "overview-tiles",
      () => this._overviewTiles.get(o, e)
    ), s = Re(
      "section-filter",
      () => this._renderableSections(t, e)
    );
    return l`
      <ha-card class=${this._cardClass()} style=${this._cardStyle()}>
        <header>
          ${this._renderActionButton(
      r,
      "title-block entity-action",
      n,
      l`
              <div class=${this._headerIconClass(i.state)}><ha-icon icon="mdi:water-thermometer"></ha-icon></div>
              <div>
                <h2>${n}</h2>
                <p>${this._statusText(e, t)}</p>
              </div>
            `
    )}
          ${this._renderHeaderTemperature(i.state, r)}
        </header>
        ${this._errorMessage ? l`<div class="error-banner" role="alert">${this._errorMessage}</div>` : m}

        <div
          class="content-grid"
          style=${`--dhe-section-count: ${s.length};`}
        >
          ${x(
      s,
      (c) => c,
      (c) => this._renderSection(o, e, c, a)
    )}
        </div>
      </ha-card>
    `;
  }
  _discoverEntities() {
    return this._discoveryCache.get(this.hass, this._config);
  }
  _cardClass() {
    return [
      "dhe-card",
      ...ts(this._config),
      `icon-theme-${this._config.icon_theme}`
    ].filter(Boolean).join(" ");
  }
  _cardStyle() {
    const e = [Sr(this._config)];
    return this._config.icon_theme === "custom" && e.push(Tn(this._config.icon_colors)), e.join(" ");
  }
  _renderSection(e, t, i, r) {
    switch (i) {
      case "overview":
        return fi(
          [
            r,
            this._config.layout_mode,
            this._config.tile_size,
            this._config.overview_columns
          ],
          () => Es(e, t, r)
        );
      case "controls":
        return js(e, t);
      case "bath":
        return Fs(e, t);
      case "timers":
        return Ws(e, t);
      case "memory":
        return Us(e, t);
      case "consumption":
      case "saving":
        return ki(e, t, i);
      case "weather":
        return Vs(e, t);
      case "radio":
        return this._renderRadio(t, e.entity);
      case "diagnostics":
        return this._config.show_diagnostics ? ki(e, t, "diagnostics") : m;
      case "support":
        return this._config.show_support_mode ? this._renderSupportSection(t) : m;
      case "actions":
        return Ys(e, t);
      default:
        return m;
    }
  }
  _sectionRenderContext(e) {
    return {
      hass: this.hass,
      config: this._config,
      weatherService: this._weatherService,
      weatherForm: this._weatherForm,
      entity: (t, i) => e(i),
      canRender: (t, i) => this._canRender(t, i),
      iconBubbleClass: (t, i) => this._iconBubbleClass(t, i),
      renderClimateControl: (t, i) => this._climateControl(t, i),
      renderRowControl: (t, i, r) => this._rowControl(t, i, r),
      isActionBusy: (t) => this._isActionBusy(t),
      isServiceBusy: (t, i) => this._isServiceBusy(t, i),
      isEntityBusy: (t) => this._isEntityBusy(t),
      handleTap: (t, i) => this._handleTapAction(t, i),
      handleDoubleTap: (t, i) => this._handleDoubleTapAction(t, i),
      startHold: (t, i) => this._startHoldAction(t, i),
      cancelHold: this._cancelHoldAction,
      pressButton: (t, i) => {
        this._pressButton(t, i);
      },
      setNumber: (t, i, r) => {
        this._setNumber(t, i, r);
      },
      setText: (t, i) => {
        this._setText(t, i);
      },
      callWeather: (t) => {
        this._callWeather(t);
      },
      setWeatherService: (t) => {
        this._weatherService = t;
      },
      setWeatherFormValue: (t, i) => {
        this._weatherForm = {
          ...this._weatherForm,
          [t]: i
        };
      }
    };
  }
  _renderActionButton(e, t, i, r) {
    return l`
      <button
        class=${t}
        type="button"
        ?disabled=${!e}
        aria-label=${i}
        @click=${(n) => this._handleTapAction(n, e)}
        @dblclick=${(n) => this._handleDoubleTapAction(n, e)}
        @pointerdown=${(n) => this._startHoldAction(n, e)}
        @pointerup=${this._cancelHoldAction}
        @pointerleave=${this._cancelHoldAction}
        @pointercancel=${this._cancelHoldAction}
      >
        ${r}
      </button>
    `;
  }
  _renderHeaderTemperature(e, t) {
    const i = w(e, "temperature"), r = w(e, "current_temperature"), n = i !== void 0 ? d(this.hass, "label.target", { value: `${i}°` }) : r !== void 0 ? d(this.hass, "label.current", { value: r }) : D(this.hass, e);
    return l`
      ${this._renderActionButton(
      t,
      "temperature entity-action",
      n,
      l`
          <strong>${i !== void 0 ? `${i}°` : D(this.hass, e)}</strong>
          <span>
            ${r !== void 0 ? d(this.hass, "label.current", { value: r }) : d(this.hass, "label.target")}
          </span>
        `
    )}
    `;
  }
  _renderRadio(e, t) {
    const i = t(e, "radio"), r = i.entityId, n = i.state;
    return !this._canRender(i.definition, n) || !r || !n ? m : Ns({
      hass: this.hass,
      entityId: r,
      state: n,
      iconClass: this._iconBubbleClass(i.definition, n),
      sourceBusy: this._isServiceBusy(r, "select_source"),
      volumeBusy: this._isServiceBusy(r, "volume_set"),
      mediaBusy: this._isEntityBusy(r),
      serviceBusy: (o) => this._isServiceBusy(r, o),
      actions: {
        tap: (o) => this._handleTapAction(o, r),
        doubleTap: (o) => this._handleDoubleTapAction(o, r),
        startHold: (o) => this._startHoldAction(o, r),
        cancelHold: this._cancelHoldAction,
        callService: (o) => {
          this._call(r, o);
        },
        selectSource: (o) => {
          this._selectMediaSource(r, o);
        },
        selectSourceByName: (o) => {
          this._selectMediaSourceByName(r, o);
        },
        setVolume: (o) => {
          this._setVolume(r, o);
        }
      }
    });
  }
  _renderableSections(e, t) {
    const i = Kc(this._config, t, this.hass);
    if (this._renderableSectionsCache?.signature === i)
      return this._renderableSectionsCache.sections;
    const r = gr(
      this._config.sections,
      this._config.show_support_mode
    ).filter(
      (n) => this._sectionHasRenderableContent(n, e)
    );
    return this._renderableSectionsCache = { signature: i, sections: r }, r;
  }
  _sectionHasRenderableContent(e, t) {
    switch (e) {
      case "overview":
        return this._config.overview_entities.some(
          (i) => this._isEntityRenderable(t, i)
        );
      case "controls": {
        const i = t("water_heating");
        return !!(i.entityId && i.state) || this._hasRenderableEntity(t, zc);
      }
      case "bath":
        return this._hasRenderableEntity(t, wt);
      case "timers":
        return this._hasRenderableEntity(t, $t);
      case "memory":
        return q().some(
          (i) => this._hasRenderableEntity(t, [
            `temperature_memory_${i}_name`,
            `temperature_memory_${i}_temperature`,
            `temperature_memory_${i}`,
            `delete_temperature_memory_${i}`
          ])
        );
      case "consumption":
      case "saving":
      case "diagnostics":
        return e === "diagnostics" && !this._config.show_diagnostics ? !1 : (Te[e] ?? []).some(
          (i) => this._isEntityRenderable(t, i.key)
        );
      case "support":
        return this._config.show_support_mode;
      case "weather":
        return this._hasRenderableEntity(t, ["weather", "weather_location"]);
      case "radio":
        return this._isEntityRenderable(t, "radio");
      case "actions":
        return this._hasRenderableEntity(t, St);
      default:
        return !1;
    }
  }
  _hasRenderableEntity(e, t) {
    return t.some((i) => this._isEntityRenderable(e, i));
  }
  _isEntityRenderable(e, t) {
    const i = e(t);
    return this._canRender(i.definition, i.state);
  }
  _climateControl(e, t) {
    const i = w(t, "temperature") ?? K(t) ?? 38, r = w(t, "min_temp") ?? 20, n = w(t, "max_temp") ?? 60, o = w(t, "target_temp_step") ?? 0.5, a = this._isServiceBusy(e, "set_temperature"), s = t.state === "off" ? "turn_on" : "turn_off", c = this._isServiceBusy(e, s), u = this._isEntityBusy(e);
    return l`
      <div class="climate-control ${u ? "busy" : ""}" aria-busy=${String(u)}>
        <button class="icon" type="button" title=${d(this.hass, "tooltip.decrease")} aria-label=${d(this.hass, "tooltip.decrease")} ?disabled=${a} aria-busy=${String(a)} @click=${() => this._adjustTemp(e, t, -o)}>
          <ha-icon icon="mdi:minus"></ha-icon>
        </button>
        <div class="temperature-control">
          <strong>${i} °C</strong>
          <input
            type="range"
            min=${String(r)}
            max=${String(n)}
            step=${String(o)}
            .value=${String(i)}
            aria-label=${d(this.hass, "label.target")}
            ?disabled=${a}
            aria-busy=${String(a)}
            @change=${(f) => this._setClimateFromInput(e, t, f)}
          />
        </div>
        <button class="icon" type="button" title=${d(this.hass, "tooltip.increase")} aria-label=${d(this.hass, "tooltip.increase")} ?disabled=${a} aria-busy=${String(a)} @click=${() => this._adjustTemp(e, t, o)}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
        <button class="chip" type="button" ?disabled=${c} aria-busy=${String(c)} @click=${() => this._toggleClimate(e, t)}>
          ${t.state === "off" ? d(this.hass, "button.turn_on") : d(this.hass, "button.turn_off")}
        </button>
      </div>
    `;
  }
  _rowControl(e, t, i) {
    if (!t || !i || L(i))
      return m;
    switch (e.domain) {
      case "switch": {
        const r = vi(i), n = this._isServiceBusy(t, r), o = C(e, i, this.hass);
        return l`
          <button class="chip ${Ee(i) ? "active" : ""}" type="button" aria-label=${o} ?disabled=${n} aria-busy=${String(n)} @click=${() => this._toggleSwitch(t, i)}>
            ${Ee(i) ? d(this.hass, "button.on") : d(this.hass, "button.off")}
          </button>
        `;
      }
      case "button": {
        const r = this._isServiceBusy(t, "press"), n = C(e, i, this.hass);
        return l`
          <button class="chip" type="button" aria-label=${n} ?disabled=${r} aria-busy=${String(r)} @click=${() => this._pressButton(e, t)}>
            ${d(this.hass, "button.press")}
          </button>
        `;
      }
      case "number": {
        const r = this._isServiceBusy(t, "set_value"), n = C(e, i, this.hass);
        return l`
          <input
            class="number"
            type="number"
            min=${String(i.attributes.min ?? "")}
            max=${String(i.attributes.max ?? "")}
            step=${String(i.attributes.step ?? 1)}
            .value=${String(K(i) ?? "")}
            aria-label=${n}
            ?disabled=${r}
            aria-busy=${String(r)}
            @change=${(o) => this._setNumber(t, i, o)}
          />
        `;
      }
      case "select":
        return this._selectControl(t, i);
      case "text": {
        const r = this._isServiceBusy(t, "set_value"), n = C(e, i, this.hass);
        return l`
          <input
            class="text"
            type="text"
            .value=${i.state}
            aria-label=${n}
            ?disabled=${r}
            aria-busy=${String(r)}
            @change=${(o) => this._setText(t, o)}
          />
        `;
      }
      default:
        return m;
    }
  }
  _selectControl(e, t) {
    const i = this._isServiceBusy(e, "select_option"), r = Array.isArray(t.attributes.options) ? t.attributes.options.map(String) : [], n = b(t.attributes.friendly_name, e) || e;
    return r.length ? l`
      <select
        ?disabled=${i}
        aria-label=${n}
        aria-busy=${String(i)}
        @change=${(o) => this._selectOption(e, o)}
      >
        ${r.map(
      (o) => l`<option value=${o} ?selected=${o === t.state}>
              ${b(o) || o}
            </option>`
    )}
      </select>
    ` : m;
  }
  _entity(e, t) {
    const i = Se[t] ?? pn, r = e.entityIds[t], n = Tt(this.hass, r);
    return { definition: i, entityId: r, state: n };
  }
  _entityResolver(e) {
    const t = /* @__PURE__ */ new Map();
    return (i) => {
      const r = t.get(i);
      if (r)
        return r;
      const n = this._entity(e, i);
      return t.set(i, n), n;
    };
  }
  _canRender(e, t) {
    return this._config.hide_entities.includes(e.key) || e.dangerous && !this._config.show_dangerous_actions || e.diagnostic && !this._config.show_diagnostics ? !1 : t ? this._config.show_unavailable || !L(t) : e.diagnostic ? !1 : this._config.show_optional && !!e.optional;
  }
  _iconBubbleClass(e, t) {
    return Va(e, t, this._config.show_icon_animations);
  }
  _headerIconClass(e) {
    const t = Ge(e);
    return [
      "icon-bubble",
      "primary",
      t ? "hot" : "water",
      "motion-heat",
      t ? "active" : "",
      t && this._config.show_icon_animations ? "animated" : ""
    ].filter(Boolean).join(" ");
  }
  _handleTapAction(e, t) {
    this._actions.handleClick(e, this._interactionOptions(t));
  }
  _handleDoubleTapAction(e, t) {
    this._actions.handleDoubleClick(e, this._interactionOptions(t));
  }
  _startHoldAction(e, t) {
    this._actions.handlePointerDown(e, this._interactionOptions(t));
  }
  _interactionOptions(e) {
    return {
      entityId: e,
      hasDoubleTap: st(this._config.double_tap_action),
      hasHold: st(this._config.hold_action),
      dispatch: (t, i) => this._fireAction(t, i)
    };
  }
  _fireAction(e, t) {
    if (!e)
      return;
    const i = wn(this._config, t, e);
    i && this.dispatchEvent(
      new CustomEvent("hass-action", {
        bubbles: !0,
        composed: !0,
        detail: { action: t, config: i }
      })
    );
  }
  _isActionBusy(e) {
    return this._busyActionKeys.has(e);
  }
  _isServiceBusy(e, t) {
    return this._isActionBusy(R(e, t));
  }
  _isEntityBusy(e) {
    return e ? this._serviceCalls.isEntityBusy(e) : !1;
  }
  _statusText(e, t) {
    return gc(this.hass, {
      connection: t("connection_state").state,
      device: t("device_status").state,
      error: t("error_status").state,
      hasBaseEntity: !!e.baseEntity
    });
  }
  _supportModel(e) {
    const t = [
      ee(e),
      this._config.show_diagnostics ? "diag1" : "diag0",
      ee(this.hass?.states),
      ee(this.hass?.entities),
      ee(this.hass?.devices)
    ].join("|");
    if (this._supportModelCache?.signature === t)
      return this._supportModelCache.model;
    const i = Re(
      "support-model",
      () => $c(this.hass, this._config, e)
    );
    return this._supportModelCache = { signature: t, model: i }, i;
  }
  _renderSupportSection(e) {
    const t = this._supportModel(e);
    return fi(
      [t, this.hass?.locale?.language ?? ""],
      () => cc({
        hass: this.hass,
        model: t,
        exportSupportPackage: () => this._exportSupportPackage(e)
      })
    );
  }
  async _call(e, t) {
    await this._runEntityService(e, t);
  }
  async _toggleClimate(e, t) {
    const i = t.state === "off" ? "turn_on" : "turn_off";
    await this._runEntityService(e, i);
  }
  async _toggleSwitch(e, t) {
    const i = vi(t);
    await this._runEntityService(e, i);
  }
  async _pressButton(e, t) {
    e.dangerous && !window.confirm(
      d(this.hass, "confirm.run", {
        label: C(e, void 0, this.hass)
      })
    ) || await this._runEntityService(t, "press");
  }
  async _adjustTemp(e, t, i) {
    await this._runServiceCall(
      R(e, "set_temperature"),
      () => yi(this.hass, e, t, i)
    );
  }
  async _setClimateFromInput(e, t, i) {
    await this._runServiceCall(
      R(e, "set_temperature"),
      () => yi(
        this.hass,
        e,
        t,
        Number(i.target.value) - (w(t, "temperature") ?? K(t) ?? 0)
      )
    );
  }
  async _setNumber(e, t, i) {
    await this._runServiceCall(
      R(e, "set_value"),
      () => Oa(this.hass, e, t, i.target.value)
    );
  }
  async _setText(e, t) {
    await this._runServiceCall(
      R(e, "set_value"),
      () => Da(this.hass, e, t.target.value)
    );
  }
  async _selectOption(e, t) {
    await this._runServiceCall(
      R(e, "select_option"),
      () => Na(this.hass, e, t.target.value)
    );
  }
  async _selectMediaSource(e, t) {
    await this._selectMediaSourceByName(e, t.target.value);
  }
  async _selectMediaSourceByName(e, t) {
    await this._runEntityService(e, "select_source", { source: t });
  }
  async _runEntityService(e, t, i) {
    await this._runServiceCall(
      R(e, t),
      () => ce(this.hass, e, t, i)
    );
  }
  async _setVolume(e, t) {
    await this._runServiceCall(
      R(e, "volume_set"),
      () => Ia(this.hass, e, t.target.value)
    );
  }
  async _callWeather(e) {
    await this._runServiceCall(
      Or(this._weatherService),
      () => Ra(
        this.hass,
        this._weatherService,
        this._weatherForm,
        e.configEntryId
      )
    );
  }
  _exportSupportPackage(e) {
    const t = this._supportModel(e), i = Sc(t, this._config), r = JSON.stringify(i, null, 2);
    this.dispatchEvent(
      new CustomEvent("dhe-connect-support-package", {
        bubbles: !0,
        composed: !0,
        detail: { supportPackage: i, json: r }
      })
    ), Ec(kc(), r);
  }
  async _runServiceCall(e, t) {
    await this._serviceCalls.run(e, async () => {
      try {
        this._errorMessage = void 0, await t();
      } catch (i) {
        const r = d(this.hass, "error.action_failed", {
          message: i instanceof Error ? i.message : String(i)
        });
        this._errorMessage = r, this.dispatchEvent(
          new CustomEvent("hass-notification", {
            bubbles: !0,
            composed: !0,
            detail: { message: r }
          })
        );
      }
    });
  }
};
M.styles = wc;
ue([
  vt({ attribute: !1 })
], M.prototype, "hass", 2);
ue([
  Ce()
], M.prototype, "_weatherService", 2);
ue([
  Ce()
], M.prototype, "_weatherForm", 2);
ue([
  Ce()
], M.prototype, "_errorMessage", 2);
ue([
  Ce()
], M.prototype, "_busyActionKeys", 2);
M = ue([
  Ni("dhe-connect-card")
], M);
function Ei(e) {
  return JSON.stringify(e);
}
function Kc(e, t, i) {
  return [
    e.sections.join(","),
    e.overview_entities.join(","),
    _e(e.show_optional),
    _e(e.show_unavailable),
    _e(e.show_diagnostics),
    _e(e.show_dangerous_actions),
    _e(e.show_support_mode),
    String(ee(t)),
    String(ee(i?.states))
  ].join("");
}
const xi = /* @__PURE__ */ new WeakMap();
let Lc = 1;
function ee(e) {
  if (!e || typeof e != "object")
    return 0;
  const t = e, i = xi.get(t);
  if (i !== void 0)
    return i;
  const r = Lc++;
  return xi.set(t, r), r;
}
function _e(e) {
  return e ? "1" : "0";
}
window.registerDheConnectCardTranslation = Hi;
window.registerDheConnectCardTranslations = ji;
window.dheConnectCardTranslations && ji(window.dheConnectCardTranslations);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "dhe-connect-card",
  name: "DHE Connect Card",
  description: "Mushroom-style card for the Stiebel DHE Connect integration",
  preview: !0
});
//# sourceMappingURL=ha-dhe-connect-card.js.map
