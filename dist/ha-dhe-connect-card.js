const Ce = globalThis, ct = Ce.ShadowRoot && (Ce.ShadyCSS === void 0 || Ce.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, lt = /* @__PURE__ */ Symbol(), Nt = /* @__PURE__ */ new WeakMap();
let ui = class {
  constructor(t, i, r) {
    if (this._$cssResult$ = !0, r !== lt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (ct && t === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (t = Nt.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && Nt.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const wr = (e) => new ui(typeof e == "string" ? e : e + "", void 0, lt), we = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((r, n, o) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[o + 1], e[0]);
  return new ui(i, e, lt);
}, $r = (e, t) => {
  if (ct) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const r = document.createElement("style"), n = Ce.litNonce;
    n !== void 0 && r.setAttribute("nonce", n), r.textContent = i.cssText, e.appendChild(r);
  }
}, Rt = ct ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const r of t.cssRules) i += r.cssText;
  return wr(i);
})(e) : e;
const { is: kr, defineProperty: Sr, getOwnPropertyDescriptor: xr, getOwnPropertyNames: Er, getOwnPropertySymbols: Ar, getPrototypeOf: Cr } = Object, Ie = globalThis, It = Ie.trustedTypes, Tr = It ? It.emptyScript : "", Or = Ie.reactiveElementPolyfillSupport, he = (e, t) => e, Te = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Tr : null;
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
} }, dt = (e, t) => !kr(e, t), Bt = { attribute: !0, type: String, converter: Te, reflect: !1, useDefault: !1, hasChanged: dt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Ie.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let J = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Bt) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, r, i);
      n !== void 0 && Sr(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, r) {
    const { get: n, set: o } = xr(this.prototype, t) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: n, set(a) {
      const d = n?.call(this);
      o?.call(this, a), this.requestUpdate(t, d, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Bt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(he("elementProperties"))) return;
    const t = Cr(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(he("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(he("properties"))) {
      const i = this.properties, r = [...Er(i), ...Ar(i)];
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
      for (const n of r) i.unshift(Rt(n));
    } else t !== void 0 && i.push(Rt(t));
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
    return $r(t, this.constructor.elementStyles), t;
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
      const o = (r.converter?.toAttribute !== void 0 ? r.converter : Te).toAttribute(i, r.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const r = this.constructor, n = r._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = r.getPropertyOptions(n), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Te;
      this._$Em = n;
      const d = a.fromAttribute(i, o.type);
      this[n] = d ?? this._$Ej?.get(n) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, i, r, n = !1, o) {
    if (t !== void 0) {
      const a = this.constructor;
      if (n === !1 && (o = this[t]), r ??= a.getPropertyOptions(t), !((r.hasChanged ?? dt)(o, i) || r.useDefault && r.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, r)))) return;
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
        const { wrapped: a } = o, d = this[n];
        a !== !0 || this._$AL.has(n) || d === void 0 || this.C(n, void 0, o, d);
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
J.elementStyles = [], J.shadowRootOptions = { mode: "open" }, J[he("elementProperties")] = /* @__PURE__ */ new Map(), J[he("finalized")] = /* @__PURE__ */ new Map(), Or?.({ ReactiveElement: J }), (Ie.reactiveElementVersions ??= []).push("2.1.2");
const ut = globalThis, zt = (e) => e, Oe = ut.trustedTypes, Lt = Oe ? Oe.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, hi = "$lit$", I = `lit$${Math.random().toFixed(9).slice(2)}$`, pi = "?" + I, Dr = `<${pi}>`, F = document, ge = () => F.createComment(""), _e = (e) => e === null || typeof e != "object" && typeof e != "function", ht = Array.isArray, Nr = (e) => ht(e) || typeof e?.[Symbol.iterator] == "function", Ge = `[ 	
\f\r]`, de = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Pt = /-->/g, Mt = />/g, H = RegExp(`>|${Ge}(?:([^\\s"'>=/]+)(${Ge}*=${Ge}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Kt = /'/g, Ht = /"/g, mi = /^(?:script|style|textarea|title)$/i, Rr = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), c = Rr(1), V = /* @__PURE__ */ Symbol.for("lit-noChange"), h = /* @__PURE__ */ Symbol.for("lit-nothing"), jt = /* @__PURE__ */ new WeakMap(), W = F.createTreeWalker(F, 129);
function gi(e, t) {
  if (!ht(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Lt !== void 0 ? Lt.createHTML(t) : t;
}
const Ir = (e, t) => {
  const i = e.length - 1, r = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = de;
  for (let d = 0; d < i; d++) {
    const s = e[d];
    let p, m, u = -1, f = 0;
    for (; f < s.length && (a.lastIndex = f, m = a.exec(s), m !== null); ) f = a.lastIndex, a === de ? m[1] === "!--" ? a = Pt : m[1] !== void 0 ? a = Mt : m[2] !== void 0 ? (mi.test(m[2]) && (n = RegExp("</" + m[2], "g")), a = H) : m[3] !== void 0 && (a = H) : a === H ? m[0] === ">" ? (a = n ?? de, u = -1) : m[1] === void 0 ? u = -2 : (u = a.lastIndex - m[2].length, p = m[1], a = m[3] === void 0 ? H : m[3] === '"' ? Ht : Kt) : a === Ht || a === Kt ? a = H : a === Pt || a === Mt ? a = de : (a = H, n = void 0);
    const _ = a === H && e[d + 1].startsWith("/>") ? " " : "";
    o += a === de ? s + Dr : u >= 0 ? (r.push(p), s.slice(0, u) + hi + s.slice(u) + I + _) : s + I + (u === -2 ? d : _);
  }
  return [gi(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class ve {
  constructor({ strings: t, _$litType$: i }, r) {
    let n;
    this.parts = [];
    let o = 0, a = 0;
    const d = t.length - 1, s = this.parts, [p, m] = Ir(t, i);
    if (this.el = ve.createElement(p, r), W.currentNode = this.el.content, i === 2 || i === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (n = W.nextNode()) !== null && s.length < d; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const u of n.getAttributeNames()) if (u.endsWith(hi)) {
          const f = m[a++], _ = n.getAttribute(u).split(I), y = /([.?@])?(.*)/.exec(f);
          s.push({ type: 1, index: o, name: y[2], strings: _, ctor: y[1] === "." ? zr : y[1] === "?" ? Lr : y[1] === "@" ? Pr : Be }), n.removeAttribute(u);
        } else u.startsWith(I) && (s.push({ type: 6, index: o }), n.removeAttribute(u));
        if (mi.test(n.tagName)) {
          const u = n.textContent.split(I), f = u.length - 1;
          if (f > 0) {
            n.textContent = Oe ? Oe.emptyScript : "";
            for (let _ = 0; _ < f; _++) n.append(u[_], ge()), W.nextNode(), s.push({ type: 2, index: ++o });
            n.append(u[f], ge());
          }
        }
      } else if (n.nodeType === 8) if (n.data === pi) s.push({ type: 2, index: o });
      else {
        let u = -1;
        for (; (u = n.data.indexOf(I, u + 1)) !== -1; ) s.push({ type: 7, index: o }), u += I.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const r = F.createElement("template");
    return r.innerHTML = t, r;
  }
}
function te(e, t, i = e, r) {
  if (t === V) return t;
  let n = r !== void 0 ? i._$Co?.[r] : i._$Cl;
  const o = _e(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, i, r)), r !== void 0 ? (i._$Co ??= [])[r] = n : i._$Cl = n), n !== void 0 && (t = te(e, n._$AS(e, t.values), n, r)), t;
}
class Br {
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
    const { el: { content: i }, parts: r } = this._$AD, n = (t?.creationScope ?? F).importNode(i, !0);
    W.currentNode = n;
    let o = W.nextNode(), a = 0, d = 0, s = r[0];
    for (; s !== void 0; ) {
      if (a === s.index) {
        let p;
        s.type === 2 ? p = new ae(o, o.nextSibling, this, t) : s.type === 1 ? p = new s.ctor(o, s.name, s.strings, this, t) : s.type === 6 && (p = new Mr(o, this, t)), this._$AV.push(p), s = r[++d];
      }
      a !== s?.index && (o = W.nextNode(), a++);
    }
    return W.currentNode = F, n;
  }
  p(t) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, i), i += r.strings.length - 2) : r._$AI(t[i])), i++;
  }
}
class ae {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, r, n) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = r, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = te(this, t, i), _e(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== V && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Nr(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && _e(this._$AH) ? this._$AA.nextSibling.data = t : this.T(F.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: r } = t, n = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = ve.createElement(gi(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const o = new Br(n, this), a = o.u(this.options);
      o.p(i), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let i = jt.get(t.strings);
    return i === void 0 && jt.set(t.strings, i = new ve(t)), i;
  }
  k(t) {
    ht(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, n = 0;
    for (const o of t) n === i.length ? i.push(r = new ae(this.O(ge()), this.O(ge()), this, this.options)) : r = i[n], r._$AI(o), n++;
    n < i.length && (this._$AR(r && r._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const r = zt(t).nextSibling;
      zt(t).remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Be {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, r, n, o) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = h;
  }
  _$AI(t, i = this, r, n) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = te(this, t, i, 0), a = !_e(t) || t !== this._$AH && t !== V, a && (this._$AH = t);
    else {
      const d = t;
      let s, p;
      for (t = o[0], s = 0; s < o.length - 1; s++) p = te(this, d[r + s], i, s), p === V && (p = this._$AH[s]), a ||= !_e(p) || p !== this._$AH[s], p === h ? t = h : t !== h && (t += (p ?? "") + o[s + 1]), this._$AH[s] = p;
    }
    a && !n && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class zr extends Be {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class Lr extends Be {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class Pr extends Be {
  constructor(t, i, r, n, o) {
    super(t, i, r, n, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = te(this, t, i, 0) ?? h) === V) return;
    const r = this._$AH, n = t === h && r !== h || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, o = t !== h && (r === h || n);
    n && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Mr {
  constructor(t, i, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    te(this, t);
  }
}
const Kr = { I: ae }, Hr = ut.litHtmlPolyfillSupport;
Hr?.(ve, ae), (ut.litHtmlVersions ??= []).push("3.3.3");
const jr = (e, t, i) => {
  const r = i?.renderBefore ?? t;
  let n = r._$litPart$;
  if (n === void 0) {
    const o = i?.renderBefore ?? null;
    r._$litPart$ = n = new ae(t.insertBefore(ge(), o), o, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
const pt = globalThis;
let Q = class extends J {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = jr(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return V;
  }
};
Q._$litElement$ = !0, Q.finalized = !0, pt.litElementHydrateSupport?.({ LitElement: Q });
const Wr = pt.litElementPolyfillSupport;
Wr?.({ LitElement: Q });
(pt.litElementVersions ??= []).push("4.2.2");
const _i = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const Ur = { attribute: !0, type: String, converter: Te, reflect: !1, hasChanged: dt }, Fr = (e = Ur, t, i) => {
  const { kind: r, metadata: n } = i;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), r === "accessor") {
    const { name: a } = i;
    return { set(d) {
      const s = t.get.call(this);
      t.set.call(this, d), this.requestUpdate(a, s, e, !0, d);
    }, init(d) {
      return d !== void 0 && this.C(a, void 0, e, d), d;
    } };
  }
  if (r === "setter") {
    const { name: a } = i;
    return function(d) {
      const s = this[a];
      t.call(this, d), this.requestUpdate(a, s, e, !0, d);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function mt(e) {
  return (t, i) => typeof i == "object" ? Fr(e, t, i) : ((r, n, o) => {
    const a = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, r), a ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(e, t, i);
}
function se(e) {
  return mt({ ...e, state: !0, attribute: !1 });
}
const ie = [
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
], Vr = {
  key: "unknown",
  domain: "sensor",
  section: "overview",
  label: "Unknown",
  icon: "mdi:help-circle-outline",
  order: 0
}, Yr = [
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
], Gr = [
  G("bath_fill_target_volume", "bath", "Bath fill target volume", "mdi:bathtub", 100),
  G("child_safety_temperature_limit", "controls", "Child safety temperature limit", "mdi:thermometer-high", 101),
  G("eco_flow_limit", "controls", "Eco flow limit", "mdi:water-pump", 102),
  G("brush_timer_duration", "timers", "Brush timer seconds", "mdi:toothbrush", 103),
  G("shower_timer_duration", "timers", "Shower timer seconds", "mdi:timer-edit", 104),
  ...Y().map(
    (e) => G(
      `temperature_memory_${e}_temperature`,
      "memory",
      `Memory ${e} temperature`,
      gt(e),
      120 + e,
      e > 2
    )
  )
], qr = [
  x("eco_mode", "controls", "Eco mode", "mdi:leaf", 150),
  x("child_safety_active", "controls", "Child safety", "mdi:thermometer-check", 151),
  x("bath_fill_active", "bath", "Bath fill", "mdi:bathtub", 152),
  x("brush_timer_active", "timers", "Brush timer", "mdi:toothbrush", 153),
  x("shower_timer_active", "timers", "Shower timer", "mdi:shower-head", 154),
  x("wellness_cold_prevention", "controls", "Cold prevention", "mdi:shower", 160),
  x("wellness_winter_refresh", "controls", "Winter refresh", "mdi:snowflake-thermometer", 161),
  x("wellness_summer_fitness", "controls", "Summer fitness", "mdi:weather-sunny", 162),
  x("wellness_circulation_support", "controls", "Circulation support", "mdi:heart-pulse", 163)
], Zr = [
  q("reset_brush_timer", "timers", "Reset brush timer", "mdi:toothbrush", 180, !0),
  q("reset_shower_timer", "timers", "Reset shower timer", "mdi:shower-head", 181, !0),
  q("repair_pairing", "actions", "Repair pairing", "mdi:refresh", 182, !0, !0),
  q("disconnect_radio_pairing", "actions", "Disconnect radio pairing", "mdi:speaker-bluetooth", 183, !0, !0),
  ...Y().map(
    (e) => q(`temperature_memory_${e}`, "memory", `Memory ${e}`, gt(e), 200 + e, e > 2)
  ),
  ...Y(3).map(
    (e) => q(
      `delete_temperature_memory_${e}`,
      "memory",
      `Delete memory ${e}`,
      "mdi:trash-can-outline",
      230 + e,
      !0,
      !0
    )
  )
], Jr = [
  {
    key: "controlunit_name",
    domain: "text",
    section: "diagnostics",
    label: "Device name",
    icon: "mdi:form-textbox",
    diagnostic: !0,
    order: 90
  },
  ...Y().map((e) => ({
    key: `temperature_memory_${e}_name`,
    domain: "text",
    section: "memory",
    label: `Memory ${e} name`,
    icon: gt(e),
    optional: e > 2,
    order: 260 + e
  }))
], L = [
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
  ...Yr,
  ...Gr,
  ...qr,
  ...Zr,
  ...Jr,
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
].sort((e, t) => e.order - t.order), vi = Object.fromEntries(
  L.map((e) => [e.key, e])
), ze = Object.fromEntries(
  ie.map((e) => [e, []])
);
for (const e of L)
  ze[e.section].push(e);
function Y(e = 1, t = 12) {
  return Array.from({ length: t - e + 1 }, (i, r) => e + r);
}
function gt(e) {
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
function G(e, t, i, r, n, o = !1) {
  return { key: e, domain: "number", section: t, label: i, icon: r, optional: o, order: n };
}
function x(e, t, i, r, n) {
  return { key: e, domain: "switch", section: t, label: i, icon: r, order: n };
}
function q(e, t, i, r, n, o = !1, a = !1) {
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
const Xr = 500, Wt = 250, fi = {
  tap: "tap_action",
  hold: "hold_action",
  double_tap: "double_tap_action"
}, Qr = { action: "more-info" };
function qe(e) {
  if (!(!e || typeof e != "object" || Array.isArray(e)))
    return { ...e };
}
function Ut(e, t, i) {
  const r = e[fi[t]];
  if (Xe(r))
    return typeof r.entity == "string" ? { ...r } : { ...r, entity: i };
}
function Xe(e) {
  return !!(e && e.action !== "none");
}
function en(e, t, i) {
  const r = Ut(e, t, i);
  if (!r)
    return;
  const o = { entity: typeof r.entity == "string" ? r.entity : i };
  for (const a of ["tap", "hold", "double_tap"]) {
    const d = Ut(e, a, i);
    d && (o[fi[a]] = d);
  }
  return o;
}
const tn = [
  "water_flow",
  "power",
  "outlet_temperature",
  "inlet_temperature",
  "water_consumption_total",
  "energy_consumption_total",
  "bath_fill_remaining_volume",
  "device_status",
  "error_status"
], Qe = [
  "eco_mode",
  "child_safety_active",
  "child_safety_temperature_limit",
  "eco_flow_limit"
], et = [
  "wellness_cold_prevention",
  "wellness_winter_refresh",
  "wellness_summer_fitness",
  "wellness_circulation_support"
], yi = [
  "bath_fill_active",
  "bath_fill_target_volume",
  "bath_fill_remaining_volume",
  "bath_fill_current_volume"
], bi = [
  "brush_timer_active",
  "brush_timer_duration",
  "brush_timer_remaining",
  "reset_brush_timer",
  "shower_timer_active",
  "shower_timer_duration",
  "shower_timer_remaining",
  "reset_shower_timer"
], wi = ["repair_pairing", "disconnect_radio_pairing"], $i = [
  "state",
  "ha",
  "muted",
  "vivid",
  "custom"
], _t = [
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
], rn = new Set(_t), nn = /^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, on = /^(?:rgb|rgba|hsl|hsla)\([-+0-9.%\s,/]+\)$/i, an = /^var\(--[a-zA-Z0-9_-]+(?:\s*,\s*(?:#[0-9a-fA-F]{3,8}|[a-zA-Z]+))?\)$/, sn = /^[a-zA-Z]+$/;
function cn(e) {
  if (!hn(e))
    return {};
  const t = {};
  for (const [i, r] of Object.entries(e)) {
    if (!un(i))
      continue;
    const n = dn(r);
    n && (t[i] = n);
  }
  return t;
}
function ln(e) {
  return _t.flatMap((t) => {
    const i = e[t];
    return i ? [`--dhe-user-icon-${t}-color: ${i};`] : [];
  }).join(" ");
}
function dn(e) {
  if (typeof e != "string")
    return;
  const t = e.trim();
  if (!(!t || t.includes(";") || t.includes("{") || t.includes("}")) && (nn.test(t) || on.test(t) || an.test(t) || sn.test(t)))
    return t;
}
function un(e) {
  return rn.has(e);
}
function hn(e) {
  return !!(e && typeof e == "object" && !Array.isArray(e));
}
const pn = new Set(ie), ki = new Set(Object.keys(vi)), mn = /* @__PURE__ */ new Set([
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
]), gn = new Set($i), Si = ["auto", "mini", "tablet", "panel", "kiosk"], xi = ["auto", "compact", "normal", "large"], _n = new Set(Si), vn = new Set(xi);
function ee(e) {
  const t = tt(e) ? e : {};
  return {
    type: "custom:dhe-connect-card",
    device_id: Sn(t.device_id),
    name: t.name,
    tap_action: qe(t.tap_action) ?? { ...Qr },
    hold_action: qe(t.hold_action),
    double_tap_action: qe(t.double_tap_action),
    show_unavailable: N(t.show_unavailable, !1),
    show_optional: N(t.show_optional, !1),
    show_diagnostics: N(t.show_diagnostics, !0),
    show_dangerous_actions: N(t.show_dangerous_actions, !1),
    show_weather_services: N(t.show_weather_services, !1),
    show_icon_animations: N(t.show_icon_animations, !0),
    show_display_buttons: N(t.show_display_buttons, !1),
    show_support_mode: N(t.show_support_mode, !1),
    icon_theme: Ft(t.icon_theme, gn, "state"),
    icon_colors: cn(t.icon_colors),
    layout_mode: Ft(t.layout_mode, _n, "auto"),
    tile_size: xn(t.tile_size, t.compact),
    overview_columns: bn(t.overview_columns, 3, 1, 6),
    sections: fn(t.sections),
    overview_entities: yn(t.overview_entities),
    hide_entities: wn(t.hide_entities),
    entities: $n(t.entities)
  };
}
function fn(e) {
  if (!Array.isArray(e) || !e.length)
    return [...ie];
  const t = [
    ...new Set(e.filter((i) => pn.has(i)))
  ];
  return t.length ? t : [...ie];
}
function yn(e) {
  return Array.isArray(e) ? [...new Set(e.filter((t) => ki.has(t)))] : [...tn];
}
function bn(e, t, i, r) {
  return typeof e != "number" || !Number.isInteger(e) ? t : Math.min(r, Math.max(i, e));
}
function wn(e) {
  return Array.isArray(e) ? [...new Set(e.filter((t) => it(t)))] : [];
}
function $n(e) {
  if (!tt(e))
    return {};
  const t = {};
  for (const [i, r] of Object.entries(e)) {
    if (typeof r == "string" && r.trim() && it(i)) {
      t[i] = r.trim();
      continue;
    }
    if (!tt(r) || !kn(i))
      continue;
    const n = {};
    for (const [o, a] of Object.entries(r))
      typeof a == "string" && a.trim() && it(o) && (n[o] = a.trim());
    Object.keys(n).length && (t[i] = n);
  }
  return t;
}
function tt(e) {
  return !!(e && typeof e == "object" && !Array.isArray(e));
}
function it(e) {
  return typeof e == "string" && ki.has(e);
}
function kn(e) {
  return typeof e == "string" && mn.has(e);
}
function Sn(e) {
  return typeof e == "string" && e.trim() ? e.trim() : void 0;
}
function N(e, t) {
  return typeof e == "boolean" ? e : t;
}
function Ft(e, t, i) {
  return typeof e == "string" && t.has(e) ? e : i;
}
function xn(e, t) {
  return typeof e == "string" && vn.has(e) ? e : t === !1 ? "large" : t === !0 ? "compact" : "auto";
}
const En = { button: { apply_memory: "Speicher anwenden", delete_memory: "Speicher löschen", off: "Aus", on: "Ein", press: "Ausführen", run: "Ausführen", turn_off: "Ausschalten", turn_on: "Einschalten" }, confirm: { run: "{label} ausführen?" }, editor: { action: { "call-service": "Dienst aufrufen", "more-info": "Mehr Info", navigate: "Navigieren", none: "Keine", toggle: "Umschalten", url: "URL" }, action_entity: "Aktions-Entität", action_entity_help: "Optionale Entität für Mehr-Info, Umschalten und ähnliche Aktionen.", action_type: "Aktion", action_type_help: "Legt fest, was bei dieser Interaktion passiert.", actions_help: "Konfiguriert Klick, Halten und Doppelklick.", advanced_options: "Erweiterte Optionen", advanced_options_help: "Darstellung, Diagnose und optionale Steuerung", available_overview_entities: "Verfügbare Kacheln", basic_settings: "Gerät und Darstellung", dangerous_actions: "Riskante Aktionen", dangerous_actions_help: "Zeigt Aktionen, die Gerätezustand zurücksetzen, löschen oder reparieren können.", device: "Gerät", device_help: "Pflichtfeld. Wähle das Home-Assistant-Gerät; die Entitäten werden darüber gefunden.", device_preview: "Geräte-Vorschau", device_preview_empty: "Gerät auswählen", device_preview_help: "Eingeklappte Vorschau des ausgewählten Home-Assistant-Geräts und Discovery-Status.", device_preview_loading: "Lade Entitäten", device_preview_ready: "Bereit", device_preview_selected: "DHE-Gerät ausgewählt", diagnostics: "Diagnose", diagnostics_help: "Zeigt Diagnose- und technische Geräte-Entitäten.", display_buttons: "Display-Button-Ansicht", display_buttons_help: "Stellt unterstützte Steuerungen als Kacheln ähnlich dem Gerätedisplay dar.", double_tap_action: "Doppelklick-Aktion", drag_to_reorder: "Zum Sortieren ziehen", entities: "Entitäten", entities_help: "Gefundene Entitäten anzeigen, ausblenden oder überschreiben.", entity_override: "Override", entity_override_help: "Optionale Ersatz-Entität für diese Kartenfunktion.", entity_visibility_help: "Zeigt oder versteckt diese Entität in der Karte.", hold_action: "Halten-Aktion", icon_animations: "Icon-Animationen", icon_animations_help: "Aktiviert zustandsabhängige Icon-Bewegung, wenn Bewegung erlaubt ist.", icon_color: { action: "Aktionen", alert: "Alarm", eco: "Eco", energy: "Energie", hot: "Warmwasser", memory: "Speicher", ok: "OK", radio: "Radio", safety: "Sicherheit", status: "Status", timer: "Timer", water: "Wasser", weather: "Wetter", wellness: "Wellness" }, icon_color_help: "Optionale CSS-Farbe, Hex-Wert oder Home-Assistant-Theme-Variable.", icon_theme: { _: "Icon-Theme", custom: "Eigene Farben", ha: "Home Assistant", muted: "Ruhig", state: "Statusfarben", vivid: "Kräftig" }, icon_theme_help: "Legt fest, wie stark Icons Statusfarben und dem aktiven Home-Assistant-Theme folgen.", layout_mode: { _: "Layoutmodus", auto: "Automatisch", kiosk: "Kiosk", mini: "Mini", panel: "Panel", tablet: "Tablet" }, layout_mode_help: "Passt den masonry-artigen Abschnittsfluss für Mobile, Tablet, Panel und Kiosk an.", legacy_entity_detected: "Legacy-Entity-Anker erkannt: {entity}.", legacy_entity_migrated_to_device: "Zu Gerät {device} migriert.", legacy_entity_migrated_to_override: "Nutze vorübergehend ein Warmwasser-Override, bis ein Gerät ausgewählt ist.", name: "Name", name_help: "Optionaler Kartentitel für den Kartenkopf.", navigation_path: "Navigationspfad", navigation_path_help: "Dashboard-Pfad, den eine Navigationsaktion öffnet.", optional_missing: "Optionale fehlende Entitäten", optional_missing_help: "Zeigt optionale Steuerungen auch dann, wenn ihre Entität fehlt.", overview_columns: "Übersicht-Spalten", overview_columns_help: "Standardanzahl der Übersichtsspalten bei normaler Kartenbreite.", overview_entities: "Übersicht-Kacheln", overview_entities_help: "Wähle Übersicht-Kacheln und ziehe ausgewählte Einträge in die gewünschte Reihenfolge.", overview_entity_visibility_help: "Nimmt diese Entität in die Übersicht-Kacheln auf.", section_visibility_help: "Zeigt diesen Abschnitt und macht ihn sortierbar.", sections: "Abschnitte", sections_help: "Wähle sichtbare Abschnitte und ziehe sie in die gewünschte Reihenfolge.", selected_overview_entities: "Ausgewählte Kacheln", service: "Dienst", service_data: "Dienstdaten als JSON", service_data_help: "Optionales JSON-Objekt, das als Dienstdaten übergeben wird.", service_help: "Home-Assistant-Dienst oder Perform-Action-Name.", service_target_area: "Dienst-Zielbereich-IDs", service_target_area_help: "Kommagetrennte Bereichs-IDs für das Dienstziel.", service_target_device: "Dienst-Zielgeräte-IDs", service_target_device_help: "Kommagetrennte Geräte-IDs für das Dienstziel.", service_target_entity: "Dienst-Zielentität", service_target_entity_help: "Entitäts-ID für das Dienstziel.", support_mode: "Diagnose- und Supportmodus", support_mode_help: "Zeigt Support-Werkzeuge für GitHub-Issues, Entity-Audits und lokale Kompatibilitätschecks.", tap_action: "Klick-Aktion", tile_size: { _: "Kachelgröße", auto: "Automatisch", compact: "Kompakt", large: "Groß", normal: "Normal" }, tile_size_help: "Steuert die dynamische Größe von Übersicht- und Display-Kacheln.", unavailable: "Nicht verfügbare Entitäten", unavailable_help: "Zeigt Entitäten auch, wenn Home Assistant sie als nicht verfügbar oder unbekannt meldet.", url_path: "URL-Pfad", url_path_help: "URL, die eine URL-Aktion öffnet.", weather_services: "Wetterdienste", weather_services_help: "Zeigt Hilfsdienste für die Wetterfunktionen." }, entity: { memory: "Speicher {slot}", memory_delete: "Speicher {slot} löschen", memory_name: "Speicher {slot} Name", memory_temperature: "Speicher {slot} Temperatur" }, error: { action_failed: "Aktion fehlgeschlagen: {message}" }, field: { country_id: "Länder-ID", location_id: "Standort-ID", name: "Name", radio_source: "Radioquelle", result: "Ergebnis", volume: "Lautstärke", weather_service: "Wetterdienst" }, label: { current: "Aktuell {value}°", memory: "Speicher {slot}", target: "Ziel" }, overview: { delta: "{value}", group: { bath: "Bad", control: "Steuerung", energy: "Energie", saving: "Sparen", status: "Status", temperature: "Temp", timer: "Timer", water: "Wasser" }, trend: { down: "Sinkt", flat: "Stabil", up: "Steigt" } }, overview_short: { bath_fill_remaining_volume: "Badewanne", device_status: "Gerät", energy_consumption_total: "Energie", error_status: "Fehler", inlet_temperature: "Zulauf", outlet_temperature: "Auslauf", power: "Strom", water_consumption_total: "Wasser", water_flow: "Durchfluss" }, section: { actions: "Aktionen", bath: "Badewannenfüllung", consumption: "Verbrauch", controls: "Steuerung", diagnostics: "Diagnose", memory: "Temperaturspeicher", overview: "Übersicht", radio: "Radio", radio_favorites: "Radio-Favoriten", saving: "Sparmonitor", support: "Diagnose & Support", timers: "Timer", water_heating: "Warmwasser", weather: "Wetter", wellness: "Wellnessprogramme" }, service: { add_weather_favorite: "Favorit hinzufügen", remove_weather_favorite: "Favorit entfernen", search_weather_location: "Suchen", select_weather_location: "Standort auswählen", toggle_weather_favorite: "Favorit umschalten" }, state: { loading: "Lädt", not_found: "Nicht gefunden", unavailable: "Nicht verfügbar", unknown: "Unbekannt" }, status: { connection: "Verbindung {state}", device: "Gerät {state}", discovered: "Gerät erkannt", select_device: "DHE-Gerät auswählen", status: "Status {state}" }, support: { check: { active_entities: "Aktive Entitäten", base_entity: "Basis-Klimaentität", custom_element: "Karten-Custom-Element", device: "Ausgewähltes Gerät", device_registry: "Geräte-Registry", disabled_entities: "Deaktivierte oder versteckte Registry-Einträge", entity_registry: "Entity-Registry", required_entities: "Abdeckung der Pflicht-Entitäten", support_export: "Support-Paket-Export", unavailable_entities: "Nicht verfügbare Entitäten" }, compatibility: "Kompatibilitätscheck", compatibility_list: "Kompatibilitätsprüfungen", domain_distribution: "Domänenverteilung", entity_audit: "Entity-Audit", entity_audit_list: "Entity-Audit-Zeilen", entity_status: { available: "Verfügbar", missing: "Fehlt", unavailable: "Nicht verfügbar", unknown: "Unbekannt" }, export: "Support-Paket exportieren", export_hint: "Erstellt ein anonymisiertes JSON-Paket für GitHub-Issues.", integration_diagnostics: "Integrationsdiagnose", registry_status: { disabled: "Deaktiviert", enabled: "Aktiviert", hidden: "Versteckt", unknown: "Unbekannt" }, self_test: "Selbsttest", self_test_failed: "Fehlgeschlagene Checks", self_test_pass: "Alle Checks bestanden", self_test_warn: "Warnungen", stat: { available: "Verfügbar", base_entity: "Basis-Entität", config_entry: "Config Entry", device: "Gerät", mapped: "Zugeordnet", missing_required: "Pflicht fehlt", registry: "Registry", unavailable: "Nicht verfügbar" }, status: { fail: "Fehler", pass: "OK", warn: "Warnung" }, value: { no: "Nein", yes: "Ja" } }, tooltip: { decrease: "Verringern", increase: "Erhöhen", next: "Weiter", pause: "Pause", play: "Wiedergabe", previous: "Zurück" } }, An = { bath_fill_active: "Badewannenfüllung", bath_fill_current_volume: "Aktuelle Badewannenfüllung", bath_fill_remaining_volume: "Restmenge Badewanne", bath_fill_target_volume: "Zielmenge Badewanne", bluetooth_mac: "Bluetooth-MAC", brush_timer_active: "Zahnbürsten-Timer", brush_timer_duration: "Zahnbürsten-Timer Sekunden", brush_timer_remaining: "Zahnbürsten-Timer verbleibend", child_safety_active: "Kindersicherung", child_safety_temperature_limit: "Temperaturgrenze Kindersicherung", connection_state: "Verbindungsstatus", controlunit_name: "Gerätename", device_info: "Geräteinfo", device_status: "Gerätestatus", disconnect_radio_pairing: "Radio-Kopplung trennen", eco_flow_limit: "Eco-Durchflussgrenze", eco_mode: "Eco-Modus", energy_consumption_total: "Energieverbrauch gesamt", energy_consumption_week: "Energieverbrauch Woche", energy_consumption_year: "Energieverbrauch Jahr", error_status: "Fehlerstatus", inlet_temperature: "Zulauftemperatur", last_reconnect_reason: "Letzter Wiederverbindungsgrund", last_usage_cost: "Letzte Kosten", last_usage_energy: "Letzter Energieverbrauch", last_usage_time: "Letzte Nutzungsdauer", last_usage_water: "Letzter Wasserverbrauch", next_reconnect_delay: "Nächster Wiederverbindungsversuch", nominal_power: "Nennleistung", odb_actual_water_saving: "Tatsächliche Wassereinsparung", odb_heating_energy: "Heizenergie gesamt", odb_hot_water_volume: "Warmwassermenge gesamt", odb_possible_energy_saving: "Mögliche Energieeinsparung", operating_duration: "Betriebsdauer", outlet_temperature: "Auslauftemperatur", power: "Aktuelle Leistungsaufnahme", product_id: "Produkt-ID", protocol_version: "Protokollversion", radio: "Radio", reconnect_count: "Wiederverbindungen", repair_pairing: "Kopplung reparieren", reset_brush_timer: "Zahnbürsten-Timer zurücksetzen", reset_shower_timer: "Dusch-Timer zurücksetzen", saving_monitor_activation_rate: "Sparmonitor Aktivierungsrate", saving_monitor_consumption_co2: "Sparmonitor CO2-Verbrauch", saving_monitor_consumption_energy: "Sparmonitor Energieverbrauch", saving_monitor_consumption_water: "Sparmonitor Wasserverbrauch", saving_monitor_possible_co2: "Sparmonitor mögliche CO2-Einsparung", saving_monitor_possible_cost: "Sparmonitor mögliche Kosteneinsparung", saving_monitor_possible_energy: "Sparmonitor mögliche Energieeinsparung", saving_monitor_possible_water: "Sparmonitor mögliche Wassereinsparung", saving_monitor_real_co2: "Sparmonitor reale CO2-Einsparung", saving_monitor_real_cost: "Sparmonitor reale Kosteneinsparung", saving_monitor_real_energy: "Sparmonitor reale Energieeinsparung", saving_monitor_real_water: "Sparmonitor reale Wassereinsparung", scald_protection_active: "Verbrühschutz aktiv", scald_protection_temperature_limit: "Temperaturgrenze Verbrühschutz", shower_timer_active: "Dusch-Timer", shower_timer_duration: "Dusch-Timer Sekunden", shower_timer_remaining: "Dusch-Timer verbleibend", unknown: "Unbekannt", water_consumption_total: "Wasserverbrauch gesamt", water_consumption_week: "Wasserverbrauch Woche", water_consumption_year: "Wasserverbrauch Jahr", water_flow: "Aktueller Wasserfluss", water_heating: "Warmwasser", weather: "Wetter", weather_location: "Wetterstandort", wellness_circulation_support: "Kreislaufunterstützung", wellness_cold_prevention: "Kaltwasservermeidung", wellness_summer_fitness: "Sommer-Fitness", wellness_winter_refresh: "Winter-Erfrischung", wlan_mac: "WLAN-MAC" }, Cn = {
  ui: En,
  entity_labels: An
}, Tn = { button: { apply_memory: "Apply memory", delete_memory: "Delete memory", off: "Off", on: "On", press: "Press", run: "Run", turn_off: "Turn off", turn_on: "Turn on" }, confirm: { run: "Run {label}?" }, editor: { action: { "call-service": "Call service", "more-info": "More info", navigate: "Navigate", none: "None", toggle: "Toggle", url: "URL" }, action_entity: "Action entity", action_entity_help: "Optional entity used by more-info, toggle and similar actions.", action_type: "Action", action_type_help: "Choose what happens when this interaction is triggered.", actions_help: "Configure tap, hold and double tap behavior.", advanced_options: "Advanced options", advanced_options_help: "Layout, diagnostics and optional controls", available_overview_entities: "Available tiles", basic_settings: "Device and layout", dangerous_actions: "Dangerous actions", dangerous_actions_help: "Show controls that can reset, delete or repair device state.", device: "Device", device_help: "Required. Select the Home Assistant device; entities are discovered from this device.", device_preview: "Device preview", device_preview_empty: "Select a device", device_preview_help: "Collapsed preview of the selected Home Assistant device and discovery state.", device_preview_loading: "Loading entities", device_preview_ready: "Ready", device_preview_selected: "DHE device selected", diagnostics: "Diagnostics", diagnostics_help: "Show diagnostic and technical device entities.", display_buttons: "Display-style buttons", display_buttons_help: "Render supported controls as tiles similar to the device display.", double_tap_action: "Double tap action", drag_to_reorder: "Drag to reorder", entities: "Entities", entities_help: "Show, hide or override discovered entities.", entity_override: "Override", entity_override_help: "Optional replacement entity for this card function.", entity_visibility_help: "Show or hide this entity in the card.", hold_action: "Hold action", icon_animations: "Icon animations", icon_animations_help: "Enable state-aware icon motion when motion is allowed.", icon_color: { action: "Actions", alert: "Alert", eco: "Eco", energy: "Energy", hot: "Hot water", memory: "Memory", ok: "OK", radio: "Radio", safety: "Safety", status: "Status", timer: "Timer", water: "Water", weather: "Weather", wellness: "Wellness" }, icon_color_help: "Optional CSS color, hex value or Home Assistant theme variable.", icon_theme: { _: "Icon theme", custom: "Custom", ha: "Home Assistant", muted: "Muted", state: "State colors", vivid: "Vivid" }, icon_theme_help: "Choose how strongly icons follow state colors and the active Home Assistant theme.", layout_mode: { _: "Layout mode", auto: "Auto", kiosk: "Kiosk", mini: "Mini", panel: "Panel", tablet: "Tablet" }, layout_mode_help: "Adjust masonry-like section flow for mobile, tablet, panel and kiosk dashboards.", legacy_entity_detected: "Legacy entity anchor detected: {entity}.", legacy_entity_migrated_to_device: "Migrated to device {device}.", legacy_entity_migrated_to_override: "Using a temporary water-heating override until a device can be selected.", name: "Name", name_help: "Optional card title shown in the card header.", navigation_path: "Navigation path", navigation_path_help: "Dashboard path opened by a navigate action.", optional_missing: "Optional missing entities", optional_missing_help: "Show optional controls even when their entity is missing.", overview_columns: "Overview columns", overview_columns_help: "Default overview tile columns for normal-width cards.", overview_entities: "Overview tiles", overview_entities_help: "Select overview tiles and drag selected entries into the display order.", overview_entity_visibility_help: "Include this entity in the overview tiles.", section_visibility_help: "Show this section and make it available for ordering.", sections: "Sections", sections_help: "Choose visible sections and drag them into the card order.", selected_overview_entities: "Selected tiles", service: "Service", service_data: "Service data JSON", service_data_help: "Optional JSON object passed as service data.", service_help: "Home Assistant service or perform-action name.", service_target_area: "Service target area IDs", service_target_area_help: "Comma-separated area IDs for the service target.", service_target_device: "Service target device IDs", service_target_device_help: "Comma-separated device IDs for the service target.", service_target_entity: "Service target entity", service_target_entity_help: "Entity ID used as the service target.", support_mode: "Diagnostics & support mode", support_mode_help: "Shows support tools for issue reports, entity audits and local compatibility checks.", tap_action: "Tap action", tile_size: { _: "Tile size", auto: "Auto", compact: "Compact", large: "Large", normal: "Normal" }, tile_size_help: "Controls dynamic overview and display tile sizing.", unavailable: "Unavailable entities", unavailable_help: "Show entities even when Home Assistant reports unavailable or unknown.", url_path: "URL path", url_path_help: "URL opened by a URL action.", weather_services: "Weather services", weather_services_help: "Show weather helper service controls." }, entity: { memory: "Memory {slot}", memory_delete: "Delete memory {slot}", memory_name: "Memory {slot} name", memory_temperature: "Memory {slot} temperature" }, error: { action_failed: "Action failed: {message}" }, field: { country_id: "Country ID", location_id: "Location ID", name: "Name", radio_source: "Radio source", result: "Result", volume: "Volume", weather_service: "Weather service" }, label: { current: "Current {value}°", memory: "Memory {slot}", target: "Target" }, overview: { delta: "{value}", group: { bath: "Bath", control: "Control", energy: "Energy", saving: "Saving", status: "Status", temperature: "Temp", timer: "Timer", water: "Water" }, trend: { down: "Down", flat: "Flat", up: "Up" } }, overview_short: { bath_fill_remaining_volume: "Bath left", device_status: "Device", energy_consumption_total: "Energy", error_status: "Error", inlet_temperature: "Inlet", outlet_temperature: "Outlet", power: "Power", water_consumption_total: "Water", water_flow: "Flow" }, section: { actions: "Actions", bath: "Bath fill", consumption: "Consumption", controls: "Controls", diagnostics: "Diagnostics", memory: "Temperature memories", overview: "Overview", radio: "Radio", radio_favorites: "Radio favorites", saving: "Saving monitor", support: "Diagnostics & support", timers: "Timers", water_heating: "Water heating", weather: "Weather", wellness: "Wellness programs" }, service: { add_weather_favorite: "Add favorite", remove_weather_favorite: "Remove favorite", search_weather_location: "Search", select_weather_location: "Select location", toggle_weather_favorite: "Toggle favorite" }, state: { loading: "Loading", not_found: "Not found", unavailable: "Unavailable", unknown: "Unknown" }, status: { connection: "Connection {state}", device: "Device {state}", discovered: "Device discovered", select_device: "Select a DHE device", status: "Status {state}" }, support: { check: { active_entities: "Active entities", base_entity: "Base climate entity", custom_element: "Card custom element", device: "Selected device", device_registry: "Device registry", disabled_entities: "Disabled or hidden registry entries", entity_registry: "Entity registry", required_entities: "Required entity coverage", support_export: "Support package export", unavailable_entities: "Unavailable entities" }, compatibility: "Compatibility checker", compatibility_list: "Compatibility checks", domain_distribution: "Domain distribution", entity_audit: "Entity audit", entity_audit_list: "Entity audit rows", entity_status: { available: "Available", missing: "Missing", unavailable: "Unavailable", unknown: "Unknown" }, export: "Export support package", export_hint: "Creates an anonymized JSON package for GitHub issues.", integration_diagnostics: "Integration diagnostics", registry_status: { disabled: "Disabled", enabled: "Enabled", hidden: "Hidden", unknown: "Unknown" }, self_test: "Self-test", self_test_failed: "Failed checks", self_test_pass: "All checks passed", self_test_warn: "Warnings", stat: { available: "Available", base_entity: "Base entity", config_entry: "Config entry", device: "Device", mapped: "Mapped", missing_required: "Missing required", registry: "Registry", unavailable: "Unavailable" }, status: { fail: "Fail", pass: "Pass", warn: "Warn" }, value: { no: "No", yes: "Yes" } }, tooltip: { decrease: "Decrease", increase: "Increase", next: "Next", pause: "Pause", play: "Play", previous: "Previous" } }, On = { bath_fill_active: "Bath fill", bath_fill_current_volume: "Current bath fill volume", bath_fill_remaining_volume: "Bath fill remaining", bath_fill_target_volume: "Bath fill target volume", bluetooth_mac: "Bluetooth MAC", brush_timer_active: "Brush timer", brush_timer_duration: "Brush timer seconds", brush_timer_remaining: "Brush timer remaining", child_safety_active: "Child safety", child_safety_temperature_limit: "Child safety temperature limit", connection_state: "Connection state", controlunit_name: "Device name", device_info: "Device info", device_status: "Device status", disconnect_radio_pairing: "Disconnect radio pairing", eco_flow_limit: "Eco flow limit", eco_mode: "Eco mode", energy_consumption_total: "Total energy consumption", energy_consumption_week: "Energy consumption week", energy_consumption_year: "Energy consumption year", error_status: "Error status", inlet_temperature: "Inlet temperature", last_reconnect_reason: "Last reconnect reason", last_usage_cost: "Last usage cost", last_usage_energy: "Last usage energy", last_usage_time: "Last usage duration", last_usage_water: "Last usage water", next_reconnect_delay: "Next reconnect delay", nominal_power: "Nominal power", odb_actual_water_saving: "Actual water saving", odb_heating_energy: "Total heating energy", odb_hot_water_volume: "Total hot water volume", odb_possible_energy_saving: "Possible energy saving", operating_duration: "Operating duration", outlet_temperature: "Outlet temperature", power: "Current power consumption", product_id: "Product ID", protocol_version: "Protocol version", radio: "Radio", reconnect_count: "Reconnects", repair_pairing: "Repair pairing", reset_brush_timer: "Reset brush timer", reset_shower_timer: "Reset shower timer", saving_monitor_activation_rate: "Saving monitor activation rate", saving_monitor_consumption_co2: "Saving monitor consumption CO2", saving_monitor_consumption_energy: "Saving monitor consumption energy", saving_monitor_consumption_water: "Saving monitor consumption water", saving_monitor_possible_co2: "Saving monitor possible CO2 saving", saving_monitor_possible_cost: "Saving monitor possible cost saving", saving_monitor_possible_energy: "Saving monitor possible energy saving", saving_monitor_possible_water: "Saving monitor possible water saving", saving_monitor_real_co2: "Saving monitor real CO2 saving", saving_monitor_real_cost: "Saving monitor real cost saving", saving_monitor_real_energy: "Saving monitor real energy saving", saving_monitor_real_water: "Saving monitor real water saving", scald_protection_active: "Scald protection active", scald_protection_temperature_limit: "Scald protection temperature limit", shower_timer_active: "Shower timer", shower_timer_duration: "Shower timer seconds", shower_timer_remaining: "Shower timer remaining", unknown: "Unknown", water_consumption_total: "Total water consumption", water_consumption_week: "Water consumption week", water_consumption_year: "Water consumption year", water_flow: "Current water flow", water_heating: "Water heating", weather: "Weather", weather_location: "Weather location", wellness_circulation_support: "Circulation support", wellness_cold_prevention: "Cold prevention", wellness_summer_fitness: "Summer fitness", wellness_winter_refresh: "Winter refresh", wlan_mac: "WLAN MAC" }, Dn = {
  ui: Tn,
  entity_labels: On
}, fe = "dhe-connect-card-translations-changed", U = {
  de: rt(Cn),
  en: rt(Dn)
}, Ei = {};
U.de.ui, U.en.ui;
U.de.entityLabels, U.en.entityLabels;
const Nn = [
  [/^temperature_memory_(\d+)$/, "entity.memory"],
  [/^temperature_memory_(\d+)_name$/, "entity.memory_name"],
  [/^temperature_memory_(\d+)_temperature$/, "entity.memory_temperature"],
  [/^delete_temperature_memory_(\d+)$/, "entity.memory_delete"]
];
function Ai(e, t) {
  const i = yt(e);
  i && (Ei[i] = rt(t), Mn(i));
}
function Ci(e) {
  for (const [t, i] of Object.entries(e))
    Ai(t, i);
}
function Rn(e) {
  return vt(e).split("-", 1)[0] || "en";
}
function vt(e) {
  const t = e?.locale?.language ?? (typeof navigator < "u" ? navigator.language : "") ?? "";
  return yt(t) || "en";
}
function l(e, t, i = {}) {
  return Kn(
    Bn(vt(e), t) ?? t,
    i
  );
}
function C(e, t) {
  return l(t, `section.${e}`);
}
function ft(e, t) {
  for (const [i, r] of Nn) {
    const n = e.key.match(i);
    if (n?.[1])
      return l(t, r, { slot: n[1] });
  }
  return zn(vt(t), e.key) ?? e.label;
}
function In(e, t, i) {
  const r = `overview_short.${e.key}`, n = l(t, r);
  return n === r ? i : n;
}
function Bn(e, t) {
  for (const i of Ti(e)) {
    const r = i.ui[t];
    if (r)
      return r;
  }
}
function zn(e, t) {
  for (const i of Ti(e)) {
    const r = i.entityLabels[t];
    if (r)
      return r;
  }
}
function Ti(e) {
  const t = [];
  for (const i of Ln(e)) {
    const r = Ei[i];
    r && t.push(r);
    const n = U[i];
    n && !t.includes(n) && t.push(n);
  }
  return t.includes(U.en) || t.push(U.en), t;
}
function Ln(e) {
  const t = yt(e), i = t.split("-", 1)[0] ?? "";
  return [...new Set([t, i, "en"].filter(Boolean))];
}
function yt(e) {
  return e.trim().toLowerCase().replace(/_/g, "-");
}
function rt(e) {
  const t = De(e) ? e : {};
  return {
    ui: Oi(De(t.ui) ? t.ui : {}),
    entityLabels: Pn(t.entity_labels)
  };
}
function Oi(e, t = "") {
  const i = {};
  for (const [r, n] of Object.entries(e)) {
    const o = r === "_" ? t : t ? `${t}.${r}` : r;
    if (typeof n == "string") {
      o && (i[o] = n);
      continue;
    }
    De(n) && Object.assign(i, Oi(n, o));
  }
  return i;
}
function Pn(e) {
  if (!De(e))
    return {};
  const t = {};
  for (const [i, r] of Object.entries(e))
    typeof r == "string" && (t[i] = r);
  return t;
}
function Mn(e) {
  typeof window > "u" || window.dispatchEvent(
    new CustomEvent(fe, {
      detail: { language: e }
    })
  );
}
function De(e) {
  return !!(e && typeof e == "object" && !Array.isArray(e));
}
function Kn(e, t) {
  return e.replace(
    /\{([a-z_]+)\}/g,
    (i, r) => Object.prototype.hasOwnProperty.call(t, r) ? String(t[r]) : i
  );
}
const Hn = /* @__PURE__ */ new Set(["unavailable"]), Di = /^(?:(?:stiebel(?:\s+eltron)?|stiebel-eltron)\s+)?dhe[\s_-]*connect\b/i, jn = /^(?:\s*(?:card|integration|durchlauferhitzer|water\s+heater))?(?:\s*[-:–—/|]\s*|\s+|$)/i;
function b(e, t = "") {
  const i = Ne(e);
  if (!i)
    return t.trim();
  const r = Vt(i);
  if (r)
    return r;
  const n = Ne(t);
  return !n || n === i ? "" : Vt(n) || n;
}
function Wn(e) {
  const t = Ne(e);
  return !!(t && Di.test(t));
}
function Vt(e) {
  let t = Ne(e);
  if (!t)
    return "";
  for (let i = 0; i < 4; i += 1) {
    const r = t.replace(Di, "");
    if (r === t)
      break;
    t = r.replace(jn, "").trim();
  }
  return Ni(t);
}
function E(e, t, i) {
  const r = ft(e, i).trim(), n = Fn(i, t) ?? t?.attributes.friendly_name, o = b(n, r) || r;
  return Rn(i) === "de" && Wn(n) && Vn(e, o) ? r : o;
}
function T(e, t) {
  if (!t)
    return l(e, "state.not_found");
  const i = e.formatEntityState?.(t);
  if (i)
    return b(i) || l(e, "state.unknown");
  const r = Yn(e, t.state);
  if (r)
    return r;
  const n = b(t.state) || l(e, "state.unknown"), o = t.attributes.unit_of_measurement;
  return typeof o == "string" && !Hn.has(t.state) ? `${n} ${o}` : n;
}
function Un(e, t, i, r) {
  const n = E(t, i, r);
  return typeof e == "string" && e.trim() && b(e, n) || n;
}
function Fn(e, t) {
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
function Ni(e) {
  return e.replace(/\s+/g, " ").trim();
}
function Ne(e) {
  return typeof e == "string" ? Ni(e) : "";
}
function Vn(e, t) {
  const i = Yt(t), r = Yt(e.label);
  return i === r || r.endsWith(i);
}
function Yt(e) {
  return e.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
function Yn(e, t) {
  switch (t) {
    case "off":
      return l(e, "button.off");
    case "on":
      return l(e, "button.on");
    case "unavailable":
      return l(e, "state.unavailable");
    case "unknown":
      return l(e, "state.unknown");
    default:
      return;
  }
}
const Ri = /* @__PURE__ */ new Set(["unavailable"]), Gn = /* @__PURE__ */ new Set(["heat", "heating", "on"]), qn = /* @__PURE__ */ new Set(["heating", "preheating"]);
function Le(e) {
  return e.includes(".") ? e.split(".").slice(1).join(".") : e;
}
function pe(e) {
  return e.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
function bt(e, t) {
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
function P(e) {
  return !e || Ri.has(e.state);
}
function Pe(e) {
  if (!e || P(e))
    return !1;
  const t = e.attributes.hvac_action;
  return typeof t == "string" ? qn.has(t.toLowerCase()) : Gn.has(e.state.toLowerCase());
}
function z(e) {
  if (!(!e || Ri.has(e.state)))
    return Me(e.state);
}
function $(e, t) {
  return Me(e?.attributes[t]);
}
function Me(e) {
  if (typeof e == "number")
    return Number.isFinite(e) ? e : void 0;
  if (typeof e != "string" || !e.trim())
    return;
  const t = Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function ye(e) {
  return e?.state === "on" || e?.state === "heat" || e?.state === "playing";
}
function wt(e, t, i) {
  return Math.min(Math.max(e, t), i);
}
function Ii(e, t) {
  if (!Number.isFinite(t) || t <= 0)
    return e;
  const i = Math.max(0, String(t).split(".")[1]?.length ?? 0);
  return Number((Math.round(e / t) * t).toFixed(i));
}
function Bi(e) {
  return [
    e.key,
    e.label,
    ...e.aliases ?? []
  ].map(pe).filter((t, i, r) => !!t && r.indexOf(t) === i);
}
function zi(e, t, i) {
  const r = Bi(e), n = pe(Le(t)), o = typeof i?.translation_key == "string" ? pe(i.translation_key) : "", a = typeof i?.unique_id == "string" ? pe(i.unique_id) : "";
  let d = 0;
  return o && r.includes(o) && (d += 80), a && r.some((s) => a === s || a.endsWith(`_${s}`)) && (d += 75), r.some((s) => n === s || n.endsWith(`_${s}`)) && (d += 45), d;
}
function Zn(e, t, i) {
  return zi(e, t, i) > 0;
}
const Ke = "stiebel_dhe_connect";
function Li(e, t) {
  const i = new Set(t.hide_entities), n = eo(
    e,
    Gt(t, "water_heating", "climate"),
    "climate",
    t.device_id
  ) ?? Jn(e, t), o = re(e, n), a = t.device_id ?? o?.device_id ?? void 0, d = n ? io(n) : [], s = {};
  for (const m of L) {
    if (i.has(m.key))
      continue;
    const u = Gt(t, m.key, m.domain), f = Pi(e, u, m.domain);
    if (f) {
      s[m.key] = f;
      continue;
    }
    if (m.key === "water_heating" && n) {
      s[m.key] = n;
      continue;
    }
    const _ = Xn(
      e,
      m,
      a ?? null,
      d
    );
    _ && (s[m.key] = _);
  }
  const p = o?.config_entry_id ?? Object.values(s).map((m) => re(e, m)?.config_entry_id).find((m) => typeof m == "string" && m.length > 0);
  return {
    baseEntity: n,
    configEntryId: p,
    deviceId: a ?? void 0,
    entityIds: s,
    definitions: L
  };
}
function Gt(e, t, i) {
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
function Jn(e, t) {
  const i = Object.keys(He(e)).filter(
    (o) => o.startsWith("climate.") && Mi(e, o) && $t(e, o, t.device_id)
  ), r = t.device_id, n = i.find((o) => {
    const a = re(e, o);
    return a?.platform === Ke && (!r || a.device_id === r);
  });
  return n || i.find((o) => {
    const a = Le(o);
    return a.includes("dhe") || a.includes("stiebel");
  });
}
function Xn(e, t, i, r) {
  let n;
  for (const o of Object.keys(He(e))) {
    if (!o.startsWith(`${t.domain}.`) || !Mi(e, o) || !$t(e, o, i))
      continue;
    const a = Qn(e, o, t, i, r);
    a <= 0 || (!n || a > n.score || a === n.score && o < n.entityId) && (n = { entityId: o, score: a });
  }
  return n?.entityId;
}
function Qn(e, t, i, r, n) {
  const o = re(e, t), a = Le(t), d = Bi(i);
  let s = zi(i, t, o), p = 0;
  o?.platform === Ke && (p += 20), r && o?.device_id === r && (p += 50), n.some(
    (u) => d.some((f) => a === `${u}_${f}`)
  ) && (s += 25);
  const m = to(e, t);
  return typeof m == "string" && d.some((u) => pe(m).includes(u)) && (s += 15), s > 0 ? p + s : 0;
}
function re(e, t) {
  if (t)
    return e.entities?.[t];
}
function Pi(e, t, i) {
  if (!(!t || !He(e)[t]) && !(i && !t.startsWith(`${i}.`)))
    return t;
}
function eo(e, t, i, r) {
  const n = Pi(e, t, i);
  if (n)
    return $t(e, n, r) ? n : void 0;
}
function $t(e, t, i) {
  if (!i)
    return !0;
  const r = re(e, t);
  return !r?.device_id || r.device_id === i;
}
function Mi(e, t) {
  const i = re(e, t);
  return !i?.disabled_by && !i?.hidden_by && i?.hidden !== !0;
}
function to(e, t) {
  const i = He(e)[t];
  if (!i || typeof i != "object" || Array.isArray(i))
    return;
  const r = i.attributes;
  if (!(!r || typeof r != "object" || Array.isArray(r)))
    return r.friendly_name;
}
function He(e) {
  return e.states && typeof e.states == "object" && !Array.isArray(e.states) ? e.states : {};
}
function io(e) {
  const t = Le(e), i = t.split("_").filter(Boolean), r = /* @__PURE__ */ new Set();
  return i.length > 1 && r.add(i.slice(0, -1).join("_")), i.length > 2 && r.add(i.slice(0, -2).join("_")), r.add(t.replace(/_(setpoint|water_heating|durchlauferhitzer)$/, "")), [...r].filter(Boolean);
}
const ro = new Set(L.map((e) => e.domain));
class Ki {
  constructor() {
    this._registrySnapshot = [], this._stateSnapshot = [];
  }
  get(t, i) {
    const r = this._registrySignature(t), n = this._stateSignature(t), o = no(i, r, n);
    if (this._entry?.signature === o)
      return this._entry.discovered;
    const a = Li(t, i);
    return this._entry = { signature: o, discovered: a }, a;
  }
  clear() {
    this._entry = void 0, this._registrySource = void 0, this._registrySnapshot = [], this._stateSource = void 0, this._stateSnapshot = [];
  }
  _registrySignature(t) {
    const i = t.entities;
    return this._registrySource === i ? this._registrySnapshot : (this._registrySource = i, this._registrySnapshot = oo(t), this._registrySnapshot);
  }
  _stateSignature(t) {
    const i = t.states;
    return this._stateSource === i ? this._stateSnapshot : (this._stateSource = i, this._stateSnapshot = ao(t), this._stateSnapshot);
  }
}
function no(e, t, i) {
  return JSON.stringify({
    device_id: e.device_id ?? "",
    hide_entities: e.hide_entities,
    entities: e.entities,
    registry: t,
    states: i
  });
}
function oo(e) {
  return Object.entries(e.entities ?? {}).filter(([t]) => Hi(t)).map(([t, i]) => [
    t,
    i?.config_entry_id ?? "",
    i?.device_id ?? "",
    i?.disabled_by ?? "",
    i?.hidden === !0 ? "1" : "",
    i?.hidden_by ?? "",
    i?.platform ?? "",
    i?.translation_key ?? "",
    i?.unique_id ?? ""
  ]).sort(([t], [i]) => String(t).localeCompare(String(i)));
}
function ao(e) {
  const t = e.states && typeof e.states == "object" ? e.states : {};
  return Object.entries(t).filter(([i]) => Hi(i)).map(([i, r]) => [
    i,
    r?.attributes && typeof r.attributes == "object" && !Array.isArray(r.attributes) ? r.attributes.friendly_name ?? "" : ""
  ]).sort(([i], [r]) => String(i).localeCompare(String(r)));
}
function Hi(e) {
  const t = e.split(".", 1)[0];
  return t ? ro.has(t) : !1;
}
const ji = [
  "more-info",
  "toggle",
  "navigate",
  "url",
  "call-service",
  "none"
];
function Wi(e, t) {
  const i = typeof e?.action == "string" ? e.action : void 0;
  return i === "perform-action" ? "call-service" : Ui(i) ? i : t === "tap_action" ? "more-info" : "none";
}
function so(e, t) {
  const i = Ui(t.action) ? t.action : Wi(t, e);
  if (i === "none")
    return e === "tap_action" ? { action: i } : void 0;
  const r = { action: i };
  return Se(t, r, "entity"), i === "navigate" && Se(t, r, "navigation_path"), i === "url" && Se(t, r, "url_path"), i === "call-service" && (r.action = "perform-action", Se(t, r, "perform_action", t.service ?? t.perform_action), Zt(t, r, "target"), Zt(t, r, "data")), r;
}
function qt(e, t) {
  if (!$e(e))
    return "";
  const i = e[t];
  return typeof i == "string" ? i : Array.isArray(i) ? i.filter((r) => typeof r == "string").join(", ") : "";
}
function co(e, t, i) {
  const r = $e(e) ? { ...e } : {}, n = ho(i ?? "");
  return n.length ? r[t] = n.length === 1 ? n[0] : n : delete r[t], Object.keys(r).length ? r : void 0;
}
function lo(e) {
  return $e(e) ? JSON.stringify(e, null, 2) : "";
}
function uo(e) {
  if (!e.trim())
    return { valid: !0 };
  try {
    const t = JSON.parse(e);
    return $e(t) ? { valid: !0, value: t } : { valid: !1 };
  } catch {
    return { valid: !1 };
  }
}
function Se(e, t, i, r = e[i]) {
  const n = r;
  typeof n == "string" && n.trim() && (t[i] = n.trim());
}
function Zt(e, t, i) {
  const r = e[i];
  $e(r) && Object.keys(r).length && (t[i] = { ...r });
}
function ho(e) {
  return e.split(/[\n,]/).map((t) => t.trim()).filter(Boolean);
}
function Ui(e) {
  return typeof e == "string" && ji.includes(e);
}
function $e(e) {
  return !!(e && typeof e == "object" && !Array.isArray(e));
}
function A(e, t) {
  const i = ["editor-foldout", t.className].filter(Boolean).join(" ");
  return c`
    <details class=${i} ?open=${!!t.open}>
      <summary>
        <span class="summary-label">
          <span>${l(e, t.titleKey)}</span>
          ${t.helpKey ? Vi(e, t.helpKey) : ""}
        </span>
        ${t.count !== void 0 ? c`<small>${t.count}</small>` : t.helpKey ? c`<small>${l(e, t.helpKey)}</small>` : ""}
      </summary>
      <div class="editor-foldout-content">${t.content}</div>
    </details>
  `;
}
function S(e, t, i, r, n = "") {
  return c`
    <div class=${["ha-form-row", n].filter(Boolean).join(" ")}>
      ${Fi(e, t, i)}
      ${r}
    </div>
  `;
}
function po(e, t, i, r) {
  return c`
    <div class="action-textarea-row">
      ${Fi(e, t, i)}
      ${r}
    </div>
  `;
}
function je(e, t, i, r, n = {}) {
  const o = n.isLocalizedText ? t : l(e, t), a = n.helpKey ? l(e, n.helpKey) : void 0;
  return c`
    <ha-formfield
      class="switch-formfield"
      .label=${o}
      title=${a ?? o}
      aria-label=${a ?? o}
    >
      <ha-switch
        .checked=${i}
        aria-label=${a ?? o}
        @click=${mo}
        @change=${(s) => {
    s.stopPropagation(), r(s);
  }}
      ></ha-switch>
      <span slot="label" class="switch-formfield-label">${o}</span>
      ${a ? Yi(a, "label") : ""}
    </ha-formfield>
  `;
}
function Fi(e, t, i) {
  return c`
    <span class="field-label">
      <span>${l(e, t)}</span>
      ${i ? Vi(e, i) : ""}
    </span>
  `;
}
function Vi(e, t) {
  return Yi(l(e, t));
}
function Yi(e, t) {
  const i = c`<ha-icon icon="mdi:help-circle-outline" aria-hidden="true"></ha-icon>`;
  return t ? c`
      <button
        class="help-icon"
        type="button"
        slot=${t}
        title=${e}
        aria-label=${e}
        @click=${Z}
        @pointerdown=${Z}
        @keydown=${Z}
      >
        ${i}
      </button>
    ` : c`
    <button
      class="help-icon"
      type="button"
      title=${e}
      aria-label=${e}
      @click=${Z}
      @pointerdown=${Z}
      @keydown=${Z}
    >
      ${i}
    </button>
  `;
}
function mo(e) {
  e.stopPropagation();
}
function Z(e) {
  e.preventDefault(), e.stopPropagation();
}
function We(e) {
  return !!(e.currentTarget || e.target).checked;
}
function xe(e) {
  const t = e.target?.value;
  return typeof t == "string" ? t : "";
}
function Ee(e) {
  const i = e.detail?.value;
  if (typeof i == "string")
    return i || void 0;
  const r = e.target?.value;
  return typeof r == "string" && r || void 0;
}
function go(e) {
  return typeof e == "string" ? e : "";
}
const _o = {
  device: {
    filter: [{ integration: Ke }],
    entity: [{ domain: "climate" }]
  }
}, vo = [
  { key: "show_diagnostics", labelKey: "editor.diagnostics" },
  { key: "show_weather_services", labelKey: "editor.weather_services" },
  { key: "show_icon_animations", labelKey: "editor.icon_animations" },
  { key: "show_display_buttons", labelKey: "editor.display_buttons" },
  { key: "show_support_mode", labelKey: "editor.support_mode" },
  { key: "show_dangerous_actions", labelKey: "editor.dangerous_actions" },
  { key: "show_unavailable", labelKey: "editor.unavailable" },
  { key: "show_optional", labelKey: "editor.optional_missing" }
], fo = [
  {
    key: "layout_mode",
    labelKey: "editor.layout_mode",
    options: Si
  },
  {
    key: "tile_size",
    labelKey: "editor.tile_size",
    options: xi
  },
  {
    key: "icon_theme",
    labelKey: "editor.icon_theme",
    options: $i
  }
];
function yo(e) {
  return c`
    <section class="editor-section basic-editor">
      <h3>${l(e.hass, "editor.basic_settings")}</h3>
      <div class="ha-form-list">
        <ha-selector
          class="ha-picker-control"
          .hass=${e.hass}
          .label=${l(e.hass, "editor.device")}
          .helper=${l(e.hass, "editor.device_help")}
          .selector=${_o}
          .value=${e.config.device_id ?? ""}
          .required=${!0}
          @value-changed=${e.deviceChanged}
        ></ha-selector>
        ${bo(e)}
        ${wo(e)}
        ${S(
    e.hass,
    "editor.name",
    "editor.name_help",
    c`
            <ha-textfield
              .value=${go(e.config.name)}
              aria-label=${l(e.hass, "editor.name")}
              .helper=${l(e.hass, "editor.name_help")}
              helperPersistent
              @input=${e.nameChanged}
            ></ha-textfield>
          `
  )}
      </div>

      <div class="numeric-grid">
        ${$o(e)}
      </div>
      ${A(e.hass, {
    className: "advanced-editor",
    titleKey: "editor.advanced_options",
    helpKey: "editor.advanced_options_help",
    content: c`
          <div class="advanced-group advanced-selects">
            ${fo.map((t) => ko(e, t))}
          </div>
          ${e.config.icon_theme === "custom" ? c`<div class="advanced-group">${So(e)}</div>` : ""}
          <div class="advanced-group checks">
            ${vo.map((t) => Ao(e, t))}
          </div>
        `
  })}
    </section>
  `;
}
function bo(e) {
  const t = !!e.config.device_id, i = t ? e.devicePreviewReady ? "editor.device_preview_ready" : "editor.device_preview_loading" : "editor.device_preview_empty", r = e.devicePreviewLabel || l(
    e.hass,
    t ? "editor.device_preview_selected" : "status.select_device"
  );
  return A(e.hass, {
    className: "device-preview-foldout",
    titleKey: "editor.device_preview",
    helpKey: "editor.device_preview_help",
    count: l(e.hass, i),
    content: c`
      <div class="device-preview">
        <ha-icon icon=${t ? "mdi:check-circle-outline" : "mdi:devices-off"}></ha-icon>
        <div>
          <strong>${r}</strong>
          <span>${l(e.hass, i)}</span>
        </div>
      </div>
    `
  });
}
function wo(e) {
  const t = e.legacyMigration;
  if (!t)
    return "";
  const i = t.migratedDeviceId ? l(e.hass, "editor.legacy_entity_migrated_to_device", {
    device: t.migratedDeviceId
  }) : l(e.hass, "editor.legacy_entity_migrated_to_override");
  return c`
    <div class="migration-warning" role="alert">
      <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
      <span>
        ${l(e.hass, "editor.legacy_entity_detected", {
    entity: t.legacyEntity
  })}
        ${i}
      </span>
    </div>
  `;
}
function $o(e) {
  return S(
    e.hass,
    "editor.overview_columns",
    "editor.overview_columns_help",
    c`
      <ha-textfield
        type="number"
        inputmode="numeric"
        min="1"
        max="6"
        step="1"
        .value=${String(e.config.overview_columns)}
        aria-label=${l(e.hass, "editor.overview_columns")}
        .helper=${l(e.hass, "editor.overview_columns_help")}
        helperPersistent
        @input=${e.overviewColumnsChanged}
      ></ha-textfield>
    `
  );
}
function ko(e, t) {
  const i = String(e.config[t.key]), r = l(e.hass, t.labelKey);
  return S(
    e.hass,
    t.labelKey,
    `${t.labelKey}_help`,
    c`
      <select
        data-option-key=${t.key}
        .value=${i}
        aria-label=${r}
        @change=${(n) => e.selectChanged(t.key, n.target.value)}
      >
        ${t.options.map(
      (n) => c`
            <option value=${n} ?selected=${n === i}>
              ${l(e.hass, `${t.labelKey}.${n}`)}
            </option>
          `
    )}
      </select>
    `
  );
}
function So(e) {
  return c`
    <div class="icon-color-grid">
      ${_t.map((t) => xo(e, t))}
    </div>
  `;
}
function xo(e, t) {
  const i = e.config.icon_colors[t] ?? "";
  return S(
    e.hass,
    `editor.icon_color.${t}`,
    "editor.icon_color_help",
    c`
      <div class="icon-color-control" style=${i ? `--dhe-editor-icon-color: ${i};` : ""}>
        <span class="icon-color-swatch" aria-hidden="true"></span>
        <ha-textfield
          data-icon-color-tone=${t}
          .value=${i}
          aria-label=${l(e.hass, `editor.icon_color.${t}`)}
          .placeholder=${Eo(t)}
          .helper=${l(e.hass, "editor.icon_color_help")}
          helperPersistent
          @change=${(r) => e.iconColorChanged(t, r)}
        ></ha-textfield>
      </div>
    `,
    "icon-color-row"
  );
}
function Eo(e) {
  return `var(--dhe-${e}-color)`;
}
function Ao(e, t) {
  const i = !!e.config[t.key];
  return je(
    e.hass,
    t.labelKey,
    i,
    (r) => e.checkboxChanged(t.key, We(r)),
    { helpKey: `${t.labelKey}_help` }
  );
}
const Co = { CHILD: 2 }, To = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Oo = class {
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
const { I: Do } = Kr, Jt = (e) => e, Xt = () => document.createComment(""), ue = (e, t, i) => {
  const r = e._$AA.parentNode, n = t === void 0 ? e._$AB : t._$AA;
  if (i === void 0) {
    const o = r.insertBefore(Xt(), n), a = r.insertBefore(Xt(), n);
    i = new Do(o, a, e, e.options);
  } else {
    const o = i._$AB.nextSibling, a = i._$AM, d = a !== e;
    if (d) {
      let s;
      i._$AQ?.(e), i._$AM = e, i._$AP !== void 0 && (s = e._$AU) !== a._$AU && i._$AP(s);
    }
    if (o !== n || d) {
      let s = i._$AA;
      for (; s !== o; ) {
        const p = Jt(s).nextSibling;
        Jt(r).insertBefore(s, n), s = p;
      }
    }
  }
  return i;
}, j = (e, t, i = e) => (e._$AI(t, i), e), No = {}, Ro = (e, t = No) => e._$AH = t, Io = (e) => e._$AH, Ze = (e) => {
  e._$AR(), e._$AA.remove();
};
const Qt = (e, t, i) => {
  const r = /* @__PURE__ */ new Map();
  for (let n = t; n <= i; n++) r.set(e[n], n);
  return r;
}, M = To(class extends Oo {
  constructor(e) {
    if (super(e), e.type !== Co.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e, t, i) {
    let r;
    i === void 0 ? i = t : t !== void 0 && (r = t);
    const n = [], o = [];
    let a = 0;
    for (const d of e) n[a] = r ? r(d, a) : a, o[a] = i(d, a), a++;
    return { values: o, keys: n };
  }
  render(e, t, i) {
    return this.dt(e, t, i).values;
  }
  update(e, [t, i, r]) {
    const n = Io(e), { values: o, keys: a } = this.dt(t, i, r);
    if (!Array.isArray(n)) return this.ut = a, o;
    const d = this.ut ??= [], s = [];
    let p, m, u = 0, f = n.length - 1, _ = 0, y = o.length - 1;
    for (; u <= f && _ <= y; ) if (n[u] === null) u++;
    else if (n[f] === null) f--;
    else if (d[u] === a[_]) s[_] = j(n[u], o[_]), u++, _++;
    else if (d[f] === a[y]) s[y] = j(n[f], o[y]), f--, y--;
    else if (d[u] === a[y]) s[y] = j(n[u], o[y]), ue(e, s[y + 1], n[u]), u++, y--;
    else if (d[f] === a[_]) s[_] = j(n[f], o[_]), ue(e, n[u], n[f]), f--, _++;
    else if (p === void 0 && (p = Qt(a, _, y), m = Qt(d, u, f)), p.has(d[u])) if (p.has(d[f])) {
      const v = m.get(a[_]), k = v !== void 0 ? n[v] : null;
      if (k === null) {
        const O = ue(e, n[u]);
        j(O, o[_]), s[_] = O;
      } else s[_] = j(k, o[_]), ue(e, n[u], k), n[v] = null;
      _++;
    } else Ze(n[f]), f--;
    else Ze(n[u]), u++;
    for (; _ <= y; ) {
      const v = ue(e, s[y + 1]);
      j(v, o[_]), s[_++] = v;
    }
    for (; u <= f; ) {
      const v = n[u++];
      v !== null && Ze(v);
    }
    return this.ut = a, Ro(e, s), V;
  }
}), Gi = "application/x-dhe-connect-section", qi = "application/x-dhe-connect-overview-entity";
function Bo(e) {
  const t = Mo(e.sections);
  return c`
    <section class="sections-editor">
      ${A(e.hass, {
    className: "sections-foldout",
    titleKey: "editor.sections",
    helpKey: "editor.sections_help",
    count: e.sections.length,
    content: c`
          <div class="order-list section-order-list">
            ${M(
      t,
      (i) => i,
      (i) => Po(e, i)
    )}
          </div>
        `
  })}
    </section>
  `;
}
function zo(e) {
  const t = jo(e.activeEntityKeys), i = Wo(
    e.overviewEntities,
    t
  ), r = i.map((a) => a.key), n = new Set(i.map((a) => a.key)), o = t.filter(
    (a) => !n.has(a.key)
  );
  return c`
    <section class="overview-editor">
      ${A(e.hass, {
    className: "overview-foldout",
    titleKey: "editor.overview_entities",
    helpKey: "editor.overview_entities_help",
    count: i.length,
    content: c`
          <div class="overview-entity-groups">
            ${i.length ? A(e.hass, {
      className: "overview-entity-section",
      titleKey: "editor.selected_overview_entities",
      count: i.length,
      content: c`
                    <div class="order-list overview-order-list">
                      ${M(
        i,
        (a) => a.key,
        (a) => ti(e, a, n, r)
      )}
                    </div>
                  `
    }) : ""}
            ${o.length ? A(e.hass, {
      className: "overview-entity-section",
      titleKey: "editor.available_overview_entities",
      count: o.length,
      content: c`
                    <div class="overview-entity-grid">
                      ${M(
        o,
        (a) => a.key,
        (a) => ti(e, a, n, r)
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
function ei(e, t, i) {
  return i ? e.includes(t) ? [...e] : [...e, t] : e.filter((r) => r !== t);
}
function Zi(e, t) {
  return e.filter((i) => t.has(i));
}
function nt(e, t, i) {
  if (t === i)
    return [...e];
  const r = [...e], n = r.indexOf(t), o = r.indexOf(i);
  if (n < 0 || o < 0)
    return r;
  const [a] = r.splice(n, 1);
  return r.splice(o, 0, a), r;
}
function Lo(e, t, i, r) {
  if (!r)
    return nt(e, t, i);
  const n = Zi(e, r), o = nt(n, t, i);
  return Uo(e, r, o);
}
function Po(e, t) {
  const i = e.sections.includes(t);
  return c`
    <div
      class="order-row section-order-row"
      data-section-key=${t}
      @dragover=${(r) => Xi(r, i)}
      @drop=${(r) => Ko(e, t, i, r)}
    >
      <div class="check switch-row">
        ${je(
    e.hass,
    C(t, e.hass),
    i,
    (r) => e.toggleSection(t, We(r)),
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
          title=${l(e.hass, "editor.drag_to_reorder")}
          aria-label=${l(e.hass, "editor.drag_to_reorder")}
          aria-keyshortcuts="ArrowUp ArrowDown"
          draggable=${i ? "true" : "false"}
          ?disabled=${!i}
          @dragstart=${(r) => Ji(r, Gi, t)}
          @keydown=${(r) => er(
    r,
    t,
    e.sections,
    (n) => e.reorderSection(t, n),
    i
  )}
        >
          <ha-icon icon="mdi:drag"></ha-icon>
        </button>
      </div>
    </div>
  `;
}
function ti(e, t, i, r) {
  const n = i.has(t.key);
  return c`
    <div
      class="overview-entity-toggle"
      data-overview-key=${t.key}
      @dragover=${(o) => Xi(o, n)}
      @drop=${(o) => Ho(e, t.key, n, o)}
    >
      <div class="check switch-row">
        ${je(
    e.hass,
    ft(t, e.hass),
    n,
    (o) => e.toggleOverviewEntity(t.key, We(o)),
    {
      helpKey: "editor.overview_entity_visibility_help",
      isLocalizedText: !0
    }
  )}
      </div>
      ${n ? c`
            <div class="order-actions">
              <button
                class="drag-handle"
                type="button"
                title=${l(e.hass, "editor.drag_to_reorder")}
                aria-label=${l(e.hass, "editor.drag_to_reorder")}
                aria-keyshortcuts="ArrowUp ArrowDown"
                draggable="true"
                @dragstart=${(o) => Ji(o, qi, t.key)}
                @keydown=${(o) => er(
    o,
    t.key,
    r,
    (a) => e.reorderOverviewEntity(t.key, a),
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
function Mo(e) {
  const t = new Set(e);
  return [
    ...e,
    ...ie.filter((i) => !t.has(i))
  ];
}
function Ji(e, t, i) {
  e.dataTransfer?.setData(t, i), e.dataTransfer && (e.dataTransfer.effectAllowed = "move");
}
function Xi(e, t) {
  t && (e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = "move"));
}
function Ko(e, t, i, r) {
  Qi(
    i,
    r,
    Gi,
    (n) => e.reorderSection(n, t)
  );
}
function Ho(e, t, i, r) {
  Qi(
    i,
    r,
    qi,
    (n) => e.reorderOverviewEntity(n, t)
  );
}
function Qi(e, t, i, r) {
  if (!e)
    return;
  t.preventDefault();
  const n = t.dataTransfer?.getData(i);
  n && r(n);
}
function er(e, t, i, r, n) {
  if (!n || e.key !== "ArrowUp" && e.key !== "ArrowDown")
    return;
  e.preventDefault(), e.stopPropagation();
  const o = i.indexOf(t);
  if (o < 0)
    return;
  const a = e.key === "ArrowUp" ? -1 : 1, d = i[o + a];
  d && r(d);
}
function jo(e) {
  return e ? L.filter((t) => e.has(t.key)) : L;
}
function Wo(e, t) {
  if (!e.length || !t.length)
    return [];
  const i = new Map(
    t.map((r) => [r.key, r])
  );
  return e.map((r) => i.get(r)).filter((r) => !!r);
}
function Uo(e, t, i) {
  const r = [...i];
  return e.map(
    (n) => t.has(n) ? r.shift() ?? n : n
  );
}
const Fo = we`
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

  .numeric-grid,
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
  .entity-visible ha-switch,
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

  .migration-warning {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 8px;
  }

  .migration-warning ha-icon {
    color: var(--primary-color);
  }

  .migration-warning {
    border: 1px solid color-mix(in srgb, var(--warning-color, #ffa600) 48%, transparent);
    background: color-mix(
      in srgb,
      var(--warning-color, #ffa600) 12%,
      var(--card-background-color)
    );
    color: var(--primary-text-color);
    font-size: 13px;
    line-height: 1.35;
  }

  .migration-warning ha-icon {
    color: var(--warning-color, #ffa600);
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

  .editor-foldout > summary small {
    flex: 0 1 auto;
    min-width: 0;
    overflow: hidden;
    color: var(--secondary-text-color);
    font-size: 12px;
    text-align: right;
    text-overflow: ellipsis;
    white-space: nowrap;
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

  .entity-mapping-list {
    display: grid;
    gap: 8px;
    padding: 8px;
  }

  .entity-mapping-row {
    display: grid;
    grid-template-columns: minmax(180px, 0.9fr) minmax(180px, 1.1fr);
    align-items: center;
    gap: 8px;
    min-width: 0;
    padding: 6px;
    border: 1px solid color-mix(in srgb, var(--divider-color) 72%, transparent);
    border-radius: 8px;
    background: var(--card-background-color);
  }

  .entity-visible {
    display: block;
    align-items: center;
    min-width: 0;
  }

  .entity-override-row {
    grid-template-columns: minmax(72px, 0.5fr) minmax(140px, 1.5fr);
  }

  .entity-section-list {
    display: grid;
    gap: 10px;
  }

  @media (min-width: 560px) {
    .checks,
    .section-order-list,
    .overview-entity-groups {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 459px) {
    .ha-form-row,
    .action-form-row,
    .entity-mapping-row {
      grid-template-columns: 1fr;
    }
  }`, ii = /* @__PURE__ */ new Set();
function tr(e, t) {
  const i = Vo(t);
  if (!i)
    return { config: t };
  const r = Yo(t), n = qo(e, i), o = Zo(n?.device_id);
  let a = !1;
  return !r.device_id && o && (r.device_id = o), !r.device_id && Go(e, i, r) && (r.entities = {
    ...r.entities ?? {},
    water_heating: i
  }, a = !0), {
    config: r,
    legacy: {
      legacyEntity: i,
      migratedDeviceId: r.device_id,
      usedWaterHeatingOverride: a,
      resolved: !!(r.device_id || a || rr(r))
    }
  };
}
function ir(e, t) {
  const i = `${e}:${t.legacyEntity}:${t.migratedDeviceId ?? "unresolved"}`;
  if (ii.has(i))
    return;
  ii.add(i);
  const r = t.migratedDeviceId ? `device_id ${t.migratedDeviceId}` : t.usedWaterHeatingOverride ? "a temporary water_heating entity override" : "Home Assistant registry metadata", n = t.resolved ? `migrated to ${r}` : `waiting for ${r} before migration can complete`;
  console.warn(
    `DHE Connect Card: legacy card-level entity anchor "${t.legacyEntity}" detected; ${n}. Update the card config to device_id.`
  );
}
function Vo(e) {
  return typeof e.entity == "string" && e.entity.trim() ? e.entity.trim() : void 0;
}
function Yo(e) {
  const t = { ...e };
  return delete t.entity, t;
}
function Go(e, t, i) {
  return rr(i) ? !1 : !!(e?.states[t] && t.startsWith("climate."));
}
function rr(e) {
  const t = e.entities;
  if (!t)
    return !1;
  if (typeof t.water_heating == "string" && t.water_heating.trim())
    return !0;
  const i = t.climate;
  return !!(i && typeof i == "object" && !Array.isArray(i) && typeof i.water_heating == "string" && i.water_heating.trim());
}
function qo(e, t) {
  return e?.entities?.[t];
}
function Zo(e) {
  return typeof e == "string" && e.trim() ? e.trim() : void 0;
}
function nr(e, t) {
  if (!t || e.includes("support"))
    return [...e];
  const i = [...e], r = i.indexOf("diagnostics"), n = i.indexOf("actions"), o = r >= 0 ? r + 1 : n >= 0 ? n : i.length;
  return i.splice(o, 0, "support"), i;
}
var Jo = Object.defineProperty, Xo = Object.getOwnPropertyDescriptor, Ue = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Xo(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (r ? a(t, i, n) : a(n)) || n);
  return r && n && Jo(t, i, n), n;
};
const Qo = [
  { key: "tap_action", labelKey: "editor.tap_action" },
  { key: "hold_action", labelKey: "editor.hold_action" },
  { key: "double_tap_action", labelKey: "editor.double_tap_action" }
];
let ne = class extends Q {
  constructor() {
    super(...arguments), this._config = ee({}), this._discoveryCache = new Ki(), this._sourceConfig = {}, this._translationsChanged = () => {
      this.requestUpdate();
    }, this._deviceChanged = (e) => {
      const t = Ee(e);
      t && this._updateConfig({ device_id: t });
    }, this._nameChanged = (e) => {
      this._updateConfig({ name: xe(e) || void 0 });
    }, this._overviewColumnsChanged = (e) => {
      const t = e.target, i = Number.parseInt(t.value, 10);
      this._updateConfig({ overview_columns: i });
    };
  }
  setConfig(e) {
    this._sourceConfig = e, this._applyConfigMigration(!1);
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(fe, this._translationsChanged);
  }
  disconnectedCallback() {
    window.removeEventListener(fe, this._translationsChanged), super.disconnectedCallback();
  }
  willUpdate(e) {
    e.has("hass") && this._applyConfigMigration(!0);
  }
  render() {
    const e = this._activeEntityKeys(), t = new Set(this._config.hide_entities), i = this._orderingContext(e);
    return c`
      <div class="editor">
        ${yo({
      hass: this.hass,
      config: this._config,
      devicePreviewLabel: this._devicePreviewLabel(),
      devicePreviewReady: e !== void 0,
      legacyMigration: this._legacyMigration,
      deviceChanged: this._deviceChanged,
      iconColorChanged: (r, n) => this._iconColorChanged(r, n),
      nameChanged: this._nameChanged,
      overviewColumnsChanged: this._overviewColumnsChanged,
      selectChanged: (r, n) => this._selectOptionChanged(r, n),
      checkboxChanged: (r, n) => this._checkboxChanged(r, n)
    })}
        ${Bo(i)}
        ${zo(i)}
        <section class="actions-editor">
          ${A(this.hass, {
      className: "actions-foldout",
      titleKey: "section.actions",
      helpKey: "editor.actions_help",
      content: c`
              <div class="action-list">
                ${Qo.map((r) => this._actionField(r))}
              </div>
            `
    })}
        </section>
        <section class="entity-editor">
          ${A(this.hass, {
      className: "entities-foldout",
      titleKey: "editor.entities",
      helpKey: "editor.entities_help",
      content: c`
              <div class="entity-section-list">
                ${ie.map(
        (r) => this._entitySection(r, t)
      )}
              </div>
            `
    })}
        </section>
      </div>
    `;
  }
  _orderingContext(e) {
    return {
      hass: this.hass,
      sections: this._config.sections,
      overviewEntities: e ? Zi(this._config.overview_entities, e) : this._config.overview_entities,
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
    if (this.hass)
      return new Set(Object.keys(this._discoveryCache.get(this.hass, this._config).entityIds));
  }
  _entitySection(e, t) {
    const i = ze[e] ?? [];
    if (!i.length)
      return "";
    const r = i.filter((n) => !t.has(n.key)).length;
    return A(this.hass, {
      className: "entity-section",
      titleKey: `section.${e}`,
      count: `${r}/${i.length}`,
      content: c`
        <div class="entity-mapping-list">
          ${i.map(
        (n) => this._entityMappingRow(n, t)
      )}
        </div>
      `
    });
  }
  _entityMappingRow(e, t) {
    const i = t.has(e.key), r = ia(this._config.entities, e);
    return c`
      <div class="entity-mapping-row" data-entity-key=${e.key}>
        <div class="entity-visible switch-row">
          ${je(
      this.hass,
      ft(e, this.hass),
      !i,
      (n) => this._entityVisibilityChanged(e.key, We(n)),
      {
        helpKey: "editor.entity_visibility_help",
        isLocalizedText: !0
      }
    )}
        </div>
        ${S(
      this.hass,
      "editor.entity_override",
      "editor.entity_override_help",
      c`
            <ha-entity-picker
              .hass=${this.hass}
              .value=${r}
              .includeDomains=${[e.domain]}
              @value-changed=${(n) => this._entityOverrideChanged(e, n)}
            ></ha-entity-picker>
          `,
      "entity-override-row"
    )}
      </div>
    `;
  }
  _actionField(e) {
    const t = this._config[e.key], i = Wi(t, e.key), r = ta(e.key, t, i);
    return c`
      <details class="editor-foldout action-card" data-action-card-key=${e.key} ?open=${r}>
        <summary>
          <span class="summary-label">
            <span>${l(this.hass, e.labelKey)}</span>
          </span>
          <small>${l(this.hass, `editor.action.${i}`)}</small>
        </summary>
        <div class="action-fields">
          ${S(
      this.hass,
      "editor.action_type",
      "editor.action_type_help",
      c`
              <select
                data-action-key=${e.key}
                .value=${i}
                aria-label=${l(this.hass, "editor.action_type")}
                @change=${(n) => this._actionTypeChanged(e.key, n)}
              >
                ${ji.map(
        (n) => c`<option value=${n} ?selected=${n === i}>
                      ${l(this.hass, `editor.action.${n}`)}
                    </option>`
      )}
              </select>
            `,
      "action-form-row"
    )}
          ${i !== "none" ? c`
                ${S(
      this.hass,
      "editor.action_entity",
      "editor.action_entity_help",
      c`
                    <ha-entity-picker
                      data-action-key=${e.key}
                      data-action-property="entity"
                      .hass=${this.hass}
                      .value=${typeof t?.entity == "string" ? t.entity : ""}
                      aria-label=${l(this.hass, "editor.action_entity")}
                      @value-changed=${(n) => this._actionEntityChanged(e.key, n)}
                    ></ha-entity-picker>
                  `,
      "action-form-row"
    )}
              ` : ""}
          ${i === "navigate" ? this._actionTextField(e.key, "navigation_path", "editor.navigation_path") : ""}
          ${i === "url" ? this._actionTextField(e.key, "url_path", "editor.url_path") : ""}
          ${i === "call-service" ? c`
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
    return S(
      this.hass,
      i,
      `${i}_help`,
      c`
        <ha-textfield
          data-action-key=${e}
          data-action-property=${t}
          .value=${typeof n == "string" ? n : ""}
          aria-label=${l(this.hass, i)}
          .helper=${l(this.hass, `${i}_help`)}
          helperPersistent
          @input=${(o) => this._actionPropertyChanged(e, t, o)}
        ></ha-textfield>
      `,
      "action-form-row"
    );
  }
  _actionTargetEntityField(e) {
    const t = this._config[e];
    return S(
      this.hass,
      "editor.service_target_entity",
      "editor.service_target_entity_help",
      c`
        <ha-entity-picker
          data-action-key=${e}
          data-action-property="target_entity"
          .hass=${this.hass}
          .value=${qt(t?.target, "entity_id")}
          aria-label=${l(this.hass, "editor.service_target_entity")}
          @value-changed=${(i) => this._actionTargetEntityChanged(e, i)}
        ></ha-entity-picker>
      `,
      "action-form-row"
    );
  }
  _actionTargetTextField(e, t, i) {
    const r = this._config[e];
    return S(
      this.hass,
      i,
      `${i}_help`,
      c`
        <ha-textfield
          data-action-key=${e}
          data-action-property=${`target_${t}`}
          .value=${qt(r?.target, t)}
          aria-label=${l(this.hass, i)}
          .helper=${l(this.hass, `${i}_help`)}
          helperPersistent
          @input=${(n) => this._actionTargetTextChanged(e, t, n)}
        ></ha-textfield>
      `,
      "action-form-row"
    );
  }
  _actionDataField(e) {
    const t = this._config[e];
    return po(
      this.hass,
      "editor.service_data",
      "editor.service_data_help",
      c`
        <ha-textarea
          data-action-key=${e}
          data-action-property="data"
          .value=${lo(t?.data)}
          aria-label=${l(this.hass, "editor.service_data")}
          .helper=${l(this.hass, "editor.service_data_help")}
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
        sections: nr(this._config.sections, t)
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
    const i = xe(t), r = { ...this._config.icon_colors };
    i ? r[e] = i : delete r[e], this._updateConfig({ icon_colors: r });
  }
  _entityVisibilityChanged(e, t) {
    const i = new Set(this._config.hide_entities);
    t ? i.delete(e) : i.add(e), this._updateConfig({ hide_entities: [...i] });
  }
  _entityOverrideChanged(e, t) {
    this._updateConfig({
      entities: ra(
        this._config.entities,
        e,
        Ee(t)
      )
    });
  }
  _actionTypeChanged(e, t) {
    const i = t.target;
    this._updateActionConfig(e, { action: i.value });
  }
  _actionEntityChanged(e, t) {
    this._updateActionConfig(e, { entity: Ee(t) });
  }
  _actionPropertyChanged(e, t, i) {
    const r = xe(i);
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
    this._updateActionTarget(e, "entity_id", Ee(t));
  }
  _actionTargetTextChanged(e, t, i) {
    this._updateActionTarget(e, t, xe(i));
  }
  _updateActionTarget(e, t, i) {
    this._updateActionConfig(e, {
      target: co(this._config[e]?.target, t, i)
    });
  }
  _actionDataChanged(e, t) {
    const i = t.target, r = uo(typeof i.value == "string" ? i.value : "");
    i.classList.toggle("invalid", !r.valid), i.toggleAttribute("aria-invalid", !r.valid), r.valid && this._updateActionConfig(e, { data: r.value });
  }
  _updateActionConfig(e, t) {
    const i = this._config[e], r = so(e, { ...i, ...t });
    this._updateConfig({ [e]: r });
  }
  _toggleSection(e, t) {
    this._updateConfig({
      sections: ei(this._config.sections, e, t)
    });
  }
  _reorderSection(e, t) {
    const i = nt(this._config.sections, e, t);
    this._updateConfig({ sections: i });
  }
  _overviewEntityChanged(e, t) {
    this._updateConfig({
      overview_entities: ei(
        this._config.overview_entities,
        e,
        t
      )
    });
  }
  _reorderOverviewEntity(e, t, i) {
    const r = Lo(
      this._config.overview_entities,
      e,
      t,
      i
    );
    this._updateConfig({ overview_entities: r });
  }
  _updateConfig(e) {
    const t = ee({ ...this._config, ...e });
    this._sourceConfig = this._configForDispatch(t), this._config = t, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._sourceConfig },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _applyConfigMigration(e) {
    const t = tr(this.hass, this._sourceConfig);
    if (this._legacyMigration = t.legacy, this._config = ee(t.config), !t.legacy || (ir("editor", t.legacy), !e || !t.legacy.resolved))
      return;
    const i = `${t.legacy.legacyEntity}:${t.legacy.migratedDeviceId ?? "override"}`;
    this._emittedLegacyMigrationKey !== i && (this._emittedLegacyMigrationKey = i, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  _configForDispatch(e) {
    return !this._legacyMigration || this._legacyMigration.resolved || ea(e) ? (this._legacyMigration = void 0, e) : {
      ...e,
      entity: this._legacyMigration.legacyEntity
    };
  }
};
ne.styles = Fo;
Ue([
  mt({ attribute: !1 })
], ne.prototype, "hass", 2);
Ue([
  se()
], ne.prototype, "_config", 2);
Ue([
  se()
], ne.prototype, "_legacyMigration", 2);
ne = Ue([
  _i("dhe-connect-card-editor")
], ne);
function ea(e) {
  if (typeof e.device_id == "string" && e.device_id.trim())
    return !0;
  const t = e.entities?.water_heating;
  if (typeof t == "string" && t.trim())
    return !0;
  const i = e.entities?.climate;
  return !!(i && typeof i == "object" && !Array.isArray(i) && typeof i.water_heating == "string" && i.water_heating.trim());
}
function ta(e, t, i) {
  if (e !== "tap_action")
    return i !== "none";
  if (!t)
    return !1;
  const r = Object.keys(t);
  return !(t.action === "more-info" && r.length === 1);
}
function ia(e, t) {
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
function ra(e, t, i) {
  const r = { ...e }, n = r[t.domain];
  if (n && typeof n == "object" && !Array.isArray(n)) {
    const o = { ...n };
    delete o[t.key], Object.keys(o).length ? r[t.domain] = o : delete r[t.domain];
  }
  return i ? r[t.key] = i : delete r[t.key], r;
}
const na = {
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
function ri(e) {
  return e?.state === "on" ? "turn_off" : "turn_on";
}
async function ce(e, t, i, r = {}) {
  const n = t.split(".", 1)[0] ?? "";
  return e.callService(n, i, { entity_id: t, ...r });
}
async function oa(e, t, i, r) {
  if (!Number.isFinite(r))
    return;
  const n = $(i, "min_temp") ?? 20, o = $(i, "max_temp") ?? 60, a = $(i, "target_temp_step") ?? 0.5, d = Ii(wt(r, n, o), a);
  return ce(e, t, "set_temperature", { temperature: d });
}
async function ni(e, t, i, r) {
  const n = $(i, "temperature") ?? z(i) ?? 38;
  return oa(e, t, i, n + r);
}
async function aa(e, t, i, r) {
  const n = Me(r);
  if (n === void 0)
    return;
  const o = $(i, "min"), a = $(i, "max"), d = $(i, "step") ?? 1, s = Ii(
    wt(n, o ?? Number.NEGATIVE_INFINITY, a ?? Number.POSITIVE_INFINITY),
    d
  );
  return ce(e, t, "set_value", { value: s });
}
async function sa(e, t, i) {
  return ce(e, t, "set_value", { value: i });
}
async function ca(e, t, i) {
  return ce(e, t, "select_option", { option: i });
}
async function la(e, t, i) {
  const r = Me(i);
  if (r === void 0)
    return;
  const n = wt(r, 0, 1);
  return ce(e, t, "volume_set", { volume_level: n });
}
async function da(e, t, i, r) {
  const n = {}, o = r ? { entry_id: r, ...i } : i, a = na[t];
  if (a) {
    for (const [d, s] of Object.entries(o)) {
      if (!a.has(d))
        continue;
      const p = s.trim();
      if (p)
        if (d === "country_id" || d === "result_number") {
          const m = Number(p);
          if (!Number.isFinite(m))
            continue;
          n[d] = m;
        } else
          n[d] = p;
    }
    return e.callService("stiebel_dhe_connect", t, n);
  }
}
class ua {
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
    }, Wt);
    this.pendingTapTimers.set(r, n);
  }
  handleDoubleClick(t, i) {
    t.preventDefault(), t.stopPropagation();
    const r = i.entityId;
    !r || !i.hasDoubleTap || !this.clearPendingTap(r) || i.dispatch(r, "double_tap");
  }
  handlePointerDown(t, i) {
    const r = i.entityId;
    if (!r || !i.hasHold || !ha(t))
      return;
    this.clearPendingHold(), this.clearSuppressedClick();
    const n = window.setTimeout(() => {
      this.clearPendingTap(r), this.suppressedClickEntityId = r, this.pendingHold = void 0, i.dispatch(r, "hold");
    }, Xr);
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
    }, Wt + 100);
  }
  clearSuppressedClick() {
    this.suppressedClickEntityId = void 0, this.clearSuppressedClickResetTimer();
  }
  clearSuppressedClickResetTimer() {
    this.suppressedClickResetTimer !== void 0 && (window.clearTimeout(this.suppressedClickResetTimer), this.suppressedClickResetTimer = void 0);
  }
}
function ha(e) {
  return (!("button" in e) || e.button === 0) && e.isPrimary !== !1;
}
const pa = /* @__PURE__ */ new Set(["error_status", "reconnect_count", "last_reconnect_reason"]), or = /* @__PURE__ */ new Set([
  "device_status",
  "device_info",
  "protocol_version",
  "product_id",
  "wlan_mac",
  "bluetooth_mac",
  "connection_state",
  "controlunit_name"
]), ma = /* @__PURE__ */ new Set(["device_status", "connection_state"]), ga = /* @__PURE__ */ new Set(["off", "idle", "standby"]), _a = /* @__PURE__ */ new Set(["0", "00:00", "00:00:00"]), va = /* @__PURE__ */ new Set([
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
]), fa = /* @__PURE__ */ new Set(["false", "off", "unknown", "unbekannt"]), ya = /* @__PURE__ */ new Set([
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
]), ba = [
  "error",
  "alarm",
  "fault",
  "fehler",
  "stoerung",
  "störung"
];
function wa(e, t, i = !0) {
  const r = $a(e, t, i);
  return [
    "icon-bubble",
    r.tone,
    `motion-${r.motion}`,
    r.animated ? "animated" : "",
    r.active ? "active" : ""
  ].filter(Boolean).join(" ");
}
function $a(e, t, i = !0) {
  const r = ka(e, t), n = Ea(e), o = !!(t && !P(t));
  return {
    tone: r,
    motion: n,
    active: !!(t && Aa(e, t)),
    animated: o && i && Ca(e, t)
  };
}
function ka(e, t) {
  const i = e.key;
  if (i === "water_heating" && Pe(t))
    return "hot";
  if (kt(e))
    return t && sr(t.state) ? "alert" : "ok";
  if (xa(e) && t) {
    if (Fe(t.state))
      return "ok";
    if (lr(t.state))
      return "alert";
  }
  return i === "outlet_temperature" ? "hot" : Sa(e) ? "status" : i.includes("child_safety") || i.includes("scald") || e.icon.includes("shield") ? "safety" : i.includes("wellness") ? "wellness" : i.includes("memory") ? "memory" : i.startsWith("eco_") ? "eco" : i.includes("timer") || i.includes("duration") || i.includes("time") ? "timer" : i.includes("water") || i.includes("bath") || i.includes("flow") || i.includes("temperature") || i === "water_heating" ? "water" : i.includes("energy") || i.includes("power") || i.includes("cost") || i.includes("co2") ? "energy" : i.includes("eco") || i.includes("saving") ? "eco" : e.domain === "weather" || i === "weather_location" ? "weather" : e.domain === "media_player" ? "radio" : e.domain === "button" ? "action" : "water";
}
function kt(e) {
  return pa.has(e.key);
}
function Sa(e) {
  return or.has(e.key);
}
function xa(e) {
  return ma.has(e.key);
}
function Ea(e) {
  const t = e.key;
  return kt(e) ? "alert" : e.domain === "media_player" ? "radio" : t === "outlet_temperature" || t === "water_heating" ? "heat" : t.includes("bath") ? "water-fill" : t === "water_flow" || t.includes("flow") ? "water-flow" : t.includes("energy") || t.includes("power") || t.includes("cost") ? "energy" : t.includes("timer") || t.includes("duration") || t.includes("time") ? "timer" : t.includes("wellness") ? "wellness" : t.startsWith("eco_") || t.includes("saving") ? "eco" : t.includes("memory") ? "memory" : e.domain === "weather" || t === "weather_location" ? "weather" : t.includes("child_safety") || t.includes("scald") || e.icon.includes("shield") ? "safety" : or.has(t) ? "status" : "water-flow";
}
function Aa(e, t) {
  return e.domain === "switch" ? ye(t) : e.domain === "media_player" ? ar(t) : e.domain === "button" ? !1 : e.domain === "climate" ? Pe(t) : !0;
}
function ar(e) {
  return !ga.has(e.state.toLowerCase());
}
function Ca(e, t) {
  if (!t || P(t) || e.domain === "button")
    return !1;
  if (e.domain === "switch" || e.domain === "binary_sensor")
    return ye(t);
  if (e.domain === "media_player")
    return ar(t);
  if (e.domain === "climate")
    return Pe(t);
  if (e.domain === "weather")
    return !0;
  const i = e.key;
  return i === "water_flow" || i === "power" ? (z(t) ?? 0) > 0 : i === "outlet_temperature" || i === "inlet_temperature" ? z(t) !== void 0 : i.includes("timer") || i.includes("duration") || i.includes("time") ? !_a.has(t.state) : i === "device_status" || i === "connection_state" ? Fe(t.state) || lr(t.state) : kt(e) ? sr(t.state) : !1;
}
function Fe(e) {
  const t = St(e);
  return va.has(t);
}
function sr(e) {
  const t = St(e);
  return !(!t || Fe(t) || cr(t) || fa.has(t));
}
function cr(e) {
  const t = Number(e);
  return Number.isFinite(t) && t === 0;
}
function lr(e) {
  const t = St(e);
  if (Fe(t) || cr(t))
    return !1;
  const i = Number(t);
  return Number.isFinite(i) ? i !== 0 : ya.has(t) || ba.some((r) => t.includes(r));
}
function St(e) {
  return e.trim().toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ");
}
const dr = {
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
function Ta(e) {
  return e.layout_mode === "mini" ? 4 : ["panel", "kiosk"].includes(e.layout_mode) ? 10 : e.tile_size === "large" ? 9 : e.tile_size === "normal" ? 7 : 5;
}
function Oa(e) {
  return [
    `layout-${e.layout_mode}`,
    `tile-size-${e.tile_size}`
  ].filter(Boolean);
}
function ur(e) {
  const t = dr[e.tile_size], i = Da(e);
  return [
    `--dhe-overview-columns: ${e.overview_columns};`,
    `--dhe-overview-tile-height: ${t.height};`,
    i ? `--dhe-layout-icon-bubble-size: ${i};` : ""
  ].filter(Boolean).join(" ");
}
function Da(e) {
  if (!(e.layout_mode === "mini" && e.tile_size === "auto"))
    return dr[e.tile_size].icon;
}
function Ae(e, t) {
  if (!Na())
    return t();
  const i = performance.now(), r = t(), n = performance.now() - i;
  return console.debug(`[dhe-connect-card][perf] ${e}: ${n.toFixed(2)}ms`), r;
}
function Na() {
  return !1;
}
const Ra = /* @__PURE__ */ new Set([
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
]), Ia = [
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
], Ba = /* @__PURE__ */ new Set(["unavailable", "unknown", "unbekannt"]), xt = [
  "delta",
  "change",
  "change_since_last",
  "difference",
  "last_delta"
], Et = ["change_percent", "delta_percent", "percentage_delta"], hr = [
  "sparkline",
  "history",
  "samples",
  "trend_values",
  "values"
], oi = /* @__PURE__ */ new WeakMap();
let za = 1;
class La {
  get(t, i) {
    const r = Ha(t, i);
    if (this._entry?.signature === r)
      return this._entry.tiles;
    const n = pr(t, i);
    return this._entry = { signature: r, tiles: n }, n;
  }
  clear() {
    this._entry = void 0;
  }
}
function pr(e, t) {
  return e.config.overview_entities.map((i) => e.entity(t, i)).filter(({ definition: i, state: r }) => e.canRender(i, r)).map(
    ({ definition: i, entityId: r, state: n }) => Pa(e, i, r, n)
  );
}
function Pa(e, t, i, r) {
  const n = E(t, r, e.hass), o = T(e.hass, r), a = Ma(t), d = Ka(t, r), s = Wa(e.hass, r), p = Ua(e.hass, r, s);
  return {
    key: t.key,
    definition: t,
    entityId: i,
    state: r,
    label: n,
    shortLabel: In(t, e.hass, n),
    value: o,
    group: a,
    condition: d,
    iconClass: e.iconBubbleClass(t, r),
    trend: p,
    delta: s,
    sparkline: Fa(r)
  };
}
function Ma(e) {
  const t = e.key;
  return t.includes("status") || t.includes("connection") || t.includes("reconnect") ? "status" : t.includes("energy") || t.includes("power") || t.includes("cost") || t.includes("co2") ? "energy" : t.includes("temperature") || t === "water_heating" ? "temperature" : t.includes("bath") ? "bath" : t.includes("timer") || t.includes("duration") || t.includes("time") ? "timer" : t.includes("eco") || t.includes("saving") ? "saving" : e.domain === "switch" || e.domain === "button" ? "control" : "water";
}
function Ka(e, t) {
  if (!t)
    return "neutral";
  if (e.key === "error_status" || e.key.includes("alarm"))
    return ai(t.state) ? "alert" : "ok";
  if (e.key === "device_status" || e.key === "connection_state")
    return ai(t.state) ? "alert" : gr(t.state) ? "ok" : "warning";
  if (e.domain === "switch" || e.domain === "binary_sensor")
    return t.state === "on" ? "active" : "idle";
  const i = z(t);
  return i !== void 0 && ["water_flow", "power"].includes(e.key) ? i > 0 ? "active" : "idle" : "neutral";
}
function Ha(e, t) {
  const i = e.config.overview_entities.map((r) => {
    const { definition: n, entityId: o, state: a } = e.entity(t, r);
    return {
      key: n.key,
      entityId: o ?? "",
      renderable: e.canRender(n, a),
      iconClass: e.iconBubbleClass(n, a),
      state: a?.state ?? "",
      friendly: a?.attributes && typeof a.attributes.friendly_name == "string" ? a.attributes.friendly_name : "",
      unit: a?.attributes && typeof a.attributes.unit_of_measurement == "string" ? a.attributes.unit_of_measurement : "",
      trend: Va(a, ["trend", "trend_direction"]),
      delta: oe(a, xt),
      deltaPercent: oe(a, Et),
      sparkline: ja(a)
    };
  });
  return JSON.stringify({
    language: e.hass.locale?.language ?? "",
    diagnostics: e.config.show_diagnostics,
    dangerous: e.config.show_dangerous_actions,
    optional: e.config.show_optional,
    unavailable: e.config.show_unavailable,
    tiles: i
  });
}
function ja(e) {
  const t = mr(e, hr);
  return t?.length ? [
    Ya(t),
    t.length,
    ot(t[0] ?? 0),
    ot(t[t.length - 1] ?? 0)
  ].join(":") : "";
}
function Wa(e, t) {
  const i = oe(t, xt), r = oe(t, Et), n = i ?? r;
  if (n === void 0)
    return;
  const o = n > 0 ? "+" : "", a = r !== void 0 && i === void 0 ? "%" : typeof t?.attributes.unit_of_measurement == "string" ? ` ${t.attributes.unit_of_measurement}` : "";
  return l(e, "overview.delta", { value: `${o}${ot(n)}${a}` });
}
function Ua(e, t, i) {
  const r = Ga(t) ?? qa(t);
  if (r)
    return {
      direction: r,
      icon: r === "up" ? "mdi:trending-up" : r === "down" ? "mdi:trending-down" : "mdi:trending-neutral",
      label: i ?? l(e, `overview.trend.${r}`)
    };
}
function Fa(e) {
  const t = mr(e, hr);
  if (!(!t || t.length < 2))
    return {
      values: t,
      points: Ja(t)
    };
}
function oe(e, t) {
  if (e)
    for (const i of t) {
      const r = _r(e.attributes[i]);
      if (r !== void 0)
        return r;
    }
}
function Va(e, t) {
  if (e)
    for (const i of t) {
      const r = e.attributes[i];
      if (typeof r == "string" && r.trim())
        return r;
    }
}
function mr(e, t) {
  if (e)
    for (const i of t) {
      const r = Za(e.attributes[i]);
      if (r?.length)
        return r;
    }
}
function Ya(e) {
  const t = oi.get(e);
  if (t !== void 0)
    return t;
  const i = za++;
  return oi.set(e, i), i;
}
function Ga(e) {
  const t = At(e?.attributes.trend);
  if (t) {
    if (["down", "decreasing", "falling", "sinkend"].includes(t))
      return "down";
    if (["flat", "neutral", "stable", "gleichbleibend"].includes(t))
      return "flat";
    if (["rising", "steigend", "up", "increasing"].includes(t))
      return "up";
  }
}
function qa(e) {
  const t = oe(e, xt) ?? oe(e, Et);
  if (t !== void 0)
    return t > 0 ? "up" : t < 0 ? "down" : "flat";
}
function Za(e) {
  if (!Array.isArray(e))
    return;
  const t = e.map((i) => _r(i)).filter((i) => i !== void 0);
  return t.length >= 2 ? t.slice(-18) : void 0;
}
function Ja(e) {
  const t = Math.min(...e), r = Math.max(...e) - t || 1, n = e.length > 1 ? 100 / (e.length - 1) : 100;
  return e.map((o, a) => {
    const d = Number((a * n).toFixed(2)), s = Number((22 - (o - t) / r * 18).toFixed(2));
    return `${d},${s}`;
  }).join(" ");
}
function gr(e) {
  return Ra.has(At(e));
}
function ai(e) {
  const t = At(e);
  if (!t)
    return !1;
  if (Ba.has(t))
    return !0;
  if (gr(t))
    return !1;
  const i = Number(t);
  return Number.isFinite(i) ? i !== 0 : Ia.some((r) => t.includes(r));
}
function _r(e) {
  const t = typeof e == "number" ? e : typeof e == "string" ? Number(e) : NaN;
  return Number.isFinite(t) ? t : void 0;
}
function ot(e) {
  return Number(e.toFixed(Math.abs(e) < 10 ? 1 : 0)).toString();
}
function At(e) {
  return typeof e == "string" ? e.trim().toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ") : "";
}
function Xa(e, t, i) {
  const r = i ?? pr(e, t);
  return r.length ? c`
    <section class="card-section" data-section="overview">
      <div
        class="metric-grid"
        style=${ur(e.config)}
      >
        ${M(
    r,
    (n) => n.key,
    (n) => Qa(e, n)
  )}
      </div>
    </section>
  ` : h;
}
function Qa(e, t) {
  return c`
    <button
      class=${es(t)}
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
      ${t.trend ? c`
            <span class=${`overview-trend trend-${t.trend.direction}`}>
              <ha-icon icon=${t.trend.icon}></ha-icon>
              <span class=${t.delta ? "overview-delta" : ""}>${t.trend.label}</span>
            </span>
          ` : h}
      ${t.sparkline ? c`
            <svg
              class="overview-sparkline"
              viewBox="0 0 100 24"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polyline points=${t.sparkline.points}></polyline>
            </svg>
          ` : h}
    </button>
  `;
}
function es(e) {
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
function ts(e) {
  const t = Array.isArray(e.attributes.source_list) ? e.attributes.source_list.map(String).filter(Boolean) : [], i = is(e), r = typeof e.attributes.source == "string" ? e.attributes.source : "", n = t.map((o) => {
    const a = b(o) || o;
    return {
      id: i.find((s) => rs(s, o, a))?.id,
      label: a,
      source: o,
      active: o === r
    };
  });
  return n.length ? si(n) : si(
    i.map((o) => ({
      id: o.id,
      label: o.label,
      source: o.source,
      active: o.source === r || o.label === b(r)
    }))
  );
}
function is(e) {
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
function rs(e, t, i) {
  if (e.label === i)
    return !0;
  const r = b(t);
  return e.label === r ? !0 : !!(e.id && r.includes(`(${e.id})`));
}
function si(e) {
  const t = /* @__PURE__ */ new Set();
  return e.filter((i) => {
    const r = `${i.source}:${i.id ?? ""}`;
    return t.has(r) ? !1 : (t.add(r), !0);
  });
}
const ns = [
  {
    service: "media_previous_track",
    tooltipKey: "tooltip.previous",
    icon: "mdi:skip-previous"
  },
  { service: "media_play", tooltipKey: "tooltip.play", icon: "mdi:play" },
  { service: "media_pause", tooltipKey: "tooltip.pause", icon: "mdi:pause" },
  { service: "media_next_track", tooltipKey: "tooltip.next", icon: "mdi:skip-next" }
];
function os(e) {
  const t = Array.isArray(e.state.attributes.source_list) ? e.state.attributes.source_list.map(String) : [], i = typeof e.state.attributes.media_title == "string" && b(e.state.attributes.media_title) || T(e.hass, e.state), r = b(e.state.attributes.source) || b(e.state.state), n = ts(e.state);
  return c`
    <section class="card-section" data-section="radio">
      <h3>${C("radio", e.hass)}</h3>
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
        ${ns.map((o) => as(e, o))}
      </div>
      ${ss(e, t)}
      ${cs(e, n)}
    </section>
  `;
}
function as(e, t) {
  const i = e.serviceBusy(t.service), r = l(e.hass, t.tooltipKey);
  return c`
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
function ss(e, t) {
  return c`
    <div class="inline-control ${e.sourceBusy || e.volumeBusy ? "busy" : ""}">
      <select
        ?disabled=${e.sourceBusy}
        aria-label=${l(e.hass, "field.radio_source")}
        aria-busy=${String(e.sourceBusy)}
        @change=${e.actions.selectSource}
      >
        ${t.map(
    (i) => c`<option value=${i} ?selected=${i === e.state.attributes.source}>
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
        aria-label=${l(e.hass, "field.volume")}
        aria-busy=${String(e.volumeBusy)}
        @change=${e.actions.setVolume}
      />
    </div>
  `;
}
function cs(e, t) {
  return t.length ? c`
    <div class="radio-favorites">
      <h4>${l(e.hass, "section.radio_favorites")}</h4>
      <div
        class="favorite-list"
        role="list"
        aria-label=${l(e.hass, "section.radio_favorites")}
      >
        ${t.map(
    (i) => c`
            <button
              class="favorite-row ${i.active ? "active" : ""}"
              type="button"
              role="listitem"
              title=${i.label}
              aria-label=${i.label}
              aria-pressed=${String(i.active)}
              ?disabled=${e.sourceBusy}
              aria-busy=${String(e.sourceBusy)}
              @click=${() => e.actions.selectSourceByName(i.source)}
            >
              <div class="favorite-icon"><ha-icon icon="mdi:star"></ha-icon></div>
              <span>${i.label}</span>
              ${i.id ? c`<small>#${i.id}</small>` : h}
            </button>
          `
  )}
      </div>
    </div>
  ` : h;
}
function w(e) {
  return e !== h && e !== null && e !== void 0 && e !== "";
}
class ls {
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
function vr(e) {
  return `weather:${e}`;
}
const ds = "search_weather_location", us = [
  { key: "name", labelKey: "field.name" },
  { key: "country_id", labelKey: "field.country_id" },
  { key: "result_number", labelKey: "field.result" },
  { key: "location_id", labelKey: "field.location_id" }
], hs = {
  name: "",
  country_id: "34",
  result_number: "1",
  location_id: ""
}, ps = [
  "search_weather_location",
  "add_weather_favorite",
  "remove_weather_favorite",
  "toggle_weather_favorite",
  "select_weather_location"
];
function ms(e, t) {
  const i = e.entity(t, "water_heating"), r = at(e, t, Qe), n = at(e, t, et), o = e.config.show_display_buttons ? st(e, t, Qe, "controls") : r.length ? c`<div class="rows entity-list">${r}</div>` : h, a = e.config.show_display_buttons ? st(e, t, et, "wellness") : n.length ? c`<div class="rows entity-list wellness">${n}</div>` : h, d = i.entityId && i.state ? e.renderClimateControl(i.entityId, i.state) : h;
  return !w(d) && !w(o) && !w(a) ? h : c`
    <section class="card-section" data-section="controls">
      <h3>${l(e.hass, "section.water_heating")}</h3>
      ${d}
      ${o}
      ${w(a) ? c`
            <div class="subsection">
              <h4>${l(e.hass, "section.wellness")}</h4>
              ${a}
            </div>
          ` : h}
    </section>
  `;
}
function gs(e, t) {
  return fr(e, t, "bath", yi);
}
function _s(e, t) {
  return fr(e, t, "timers", bi);
}
function vs(e, t) {
  if (e.config.show_display_buttons)
    return ks(e, t);
  const i = Y().map((r) => xs(e, t, r)).filter(w);
  return i.length ? c`
    <section class="card-section" data-section="memory">
      <h3>${C("memory", e.hass)}</h3>
      <div class="rows memory">${i}</div>
    </section>
  ` : h;
}
function fs(e, t) {
  const i = e.entity(t, "weather"), r = e.entity(t, "weather_location");
  return !e.canRender(i.definition, i.state) && !e.canRender(r.definition, r.state) ? h : c`
    <section class="card-section" data-section="weather">
      <h3>${C("weather", e.hass)}</h3>
      ${be(e, t, "weather")}
      ${be(e, t, "weather_location")}
      ${e.config.show_weather_services ? Es(e, t) : h}
    </section>
  `;
}
function ys(e, t) {
  const i = wi.map((r) => be(e, t, r)).filter(w);
  return i.length ? c`
    <section class="card-section" data-section="actions">
      <h3>${C("actions", e.hass)}</h3>
      <div class="rows">${i}</div>
    </section>
  ` : h;
}
function ci(e, t, i) {
  const r = (ze[i] ?? []).map((n) => be(e, t, n.key)).filter(w);
  return r.length ? c`
    <section class="card-section" data-section=${i}>
      <h3>${C(i, e.hass)}</h3>
      <div class="rows">${r}</div>
    </section>
  ` : h;
}
function fr(e, t, i, r) {
  return e.config.show_display_buttons ? ws(e, C(i, e.hass), t, r, i) : bs(e, C(i, e.hass), t, r, i);
}
function bs(e, t, i, r, n) {
  const o = at(e, i, r);
  return o.length ? c`
    <section class="card-section" data-section=${n}>
      <h3>${t}</h3>
      <div class="rows">${o}</div>
    </section>
  ` : h;
}
function ws(e, t, i, r, n) {
  const o = st(e, i, r, n);
  return w(o) ? c`
    <section class="card-section" data-section=${n}>
      <h3>${t}</h3>
      ${o}
    </section>
  ` : h;
}
function at(e, t, i) {
  return i.map((r) => be(e, t, r)).filter(w);
}
function be(e, t, i) {
  const r = e.entity(t, i);
  if (!e.canRender(r.definition, r.state))
    return h;
  const n = E(r.definition, r.state, e.hass), o = T(e.hass, r.state), a = e.renderRowControl(r.definition, r.entityId, r.state), d = e.isEntityBusy(r.entityId), s = `${n}: ${o}`;
  return c`
    <div class="entity-row ${d ? "busy" : ""}" aria-busy=${String(d)}>
      ${Ct(
    e,
    r.entityId,
    "entity-main entity-action",
    s,
    c`
          <div class=${e.iconBubbleClass(r.definition, r.state)}>
            <ha-icon icon=${r.definition.icon}></ha-icon>
          </div>
          <div class="main">
            <strong>${n}</strong>
            <span>${o}</span>
          </div>
        `
  )}
      ${w(a) ? c`<div class="row-control">${a}</div>` : h}
    </div>
  `;
}
function st(e, t, i, r) {
  const n = i.map((o) => $s(e, t, o)).filter(w);
  return n.length ? c`<div class="display-button-grid ${r}">${n}</div>` : h;
}
function $s(e, t, i) {
  const r = e.entity(t, i);
  if (!e.canRender(r.definition, r.state))
    return h;
  const n = E(r.definition, r.state, e.hass), o = T(e.hass, r.state), a = e.renderRowControl(r.definition, r.entityId, r.state), d = r.state ? ye(r.state) : !1, s = e.isEntityBusy(r.entityId), p = `${n}: ${o}`;
  return c`
    <div
      class="display-button-tile ${d ? "active" : ""} ${s ? "busy" : ""}"
      data-entity-key=${r.definition.key}
      aria-busy=${String(s)}
    >
      ${Ct(
    e,
    r.entityId,
    "display-button-main entity-action",
    p,
    c`
          <div class=${e.iconBubbleClass(r.definition, r.state)}>
            <ha-icon icon=${r.definition.icon}></ha-icon>
          </div>
          <span>${n}</span>
          <strong>${o}</strong>
        `
  )}
      ${w(a) ? c`<div class="display-button-control">${a}</div>` : h}
    </div>
  `;
}
function Ct(e, t, i, r, n) {
  return c`
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
function ks(e, t) {
  const i = Y().map((r) => Ss(e, t, r)).filter(w);
  return i.length ? c`
    <section class="card-section" data-section="memory">
      <h3>${C("memory", e.hass)}</h3>
      <div class="display-button-grid memory-display">${i}</div>
    </section>
  ` : h;
}
function Ss(e, t, i) {
  const r = yr(e, t, i);
  if (!br(e, r))
    return h;
  const { name: n, temp: o, press: a, del: d } = r, s = n.state, p = o.state, m = a.state, u = d.state, f = s && !P(s) ? b(s.state) || l(e.hass, "label.memory", { slot: i }) : l(e.hass, "label.memory", { slot: i }), _ = p ? T(e.hass, p) : T(e.hass, m), y = a.entityId ?? o.entityId ?? n.entityId ?? d.entityId, v = p ? o.definition : a.definition, k = a.entityId, O = d.entityId, Ye = k ? e.isServiceBusy(k, "press") : !1, ke = O ? e.isServiceBusy(O, "press") : !1, D = Re(
    e,
    a.definition,
    k,
    m,
    "button.apply_memory",
    Ye,
    "mdi:play"
  ), Ot = Re(
    e,
    d.definition,
    O,
    u,
    "button.delete_memory",
    ke,
    "mdi:trash-can-outline",
    !0
  ), Dt = e.isEntityBusy(y);
  return c`
    <div
      class="display-button-tile memory-display-tile ${Dt ? "busy" : ""}"
      data-memory-slot=${i}
      aria-busy=${String(Dt)}
    >
      ${Ct(
    e,
    y,
    "display-button-main entity-action",
    `${f}: ${_}`,
    c`
          <div class=${e.iconBubbleClass(v, p ?? m)}>
            <ha-icon icon=${v.icon}></ha-icon>
          </div>
          <span>${f}</span>
          <strong>${_}</strong>
        `
  )}
      ${w(D) || w(Ot) ? c`
            <div class="display-button-control memory-display-actions">
              ${D}
              ${Ot}
            </div>
          ` : h}
    </div>
  `;
}
function xs(e, t, i) {
  const { name: r, temp: n, press: o, del: a } = yr(e, t, i), d = r.entityId, s = r.state, p = n.entityId, m = n.state, u = o.entityId, f = o.state, _ = a.entityId, y = a.state;
  if (!br(e, { name: r, temp: n, press: o, del: a }))
    return h;
  const v = d ? e.isServiceBusy(d, "set_value") : !1, k = p ? e.isServiceBusy(p, "set_value") : !1, O = u ? e.isServiceBusy(u, "press") : !1, Ye = _ ? e.isServiceBusy(_, "press") : !1, ke = [d, p, u, _].some(
    (D) => e.isEntityBusy(D)
  );
  return c`
    <div class="memory-row ${ke ? "busy" : ""}" aria-busy=${String(ke)}>
      <div class=${e.iconBubbleClass(n.definition, n.state)}>
        <ha-icon icon=${n.definition.icon}></ha-icon>
      </div>
      <div class="memory-fields">
        ${d && s ? c`<input
              type="text"
              .value=${s.state}
              aria-label=${l(e.hass, "entity.memory_name", { slot: i })}
              ?disabled=${v}
              aria-busy=${String(v)}
              @change=${(D) => e.setText(d, D)}
            />` : c`<strong>${l(e.hass, "label.memory", { slot: i })}</strong>`}
        ${p && m ? c`<input
              type="number"
              min=${String(m.attributes.min ?? 20)}
              max=${String(m.attributes.max ?? 60)}
              step=${String(m.attributes.step ?? 0.5)}
              .value=${String(z(m) ?? "")}
              aria-label=${l(e.hass, "entity.memory_temperature", { slot: i })}
              ?disabled=${k}
              aria-busy=${String(k)}
              @change=${(D) => e.setNumber(p, m, D)}
            />` : h}
      </div>
      ${Re(
    e,
    o.definition,
    u,
    f,
    "button.apply_memory",
    O,
    "mdi:play"
  )}
      ${Re(
    e,
    a.definition,
    _,
    y,
    "button.delete_memory",
    Ye,
    "mdi:trash-can-outline",
    !0
  )}
    </div>
  `;
}
function Re(e, t, i, r, n, o, a, d = !1) {
  if (!i || !r || d && !e.config.show_dangerous_actions)
    return h;
  const s = l(e.hass, n);
  return c`
    <button
      class=${`icon${d ? " danger" : ""}`}
      type="button"
      title=${s}
      aria-label=${s}
      ?disabled=${o}
      aria-busy=${String(o)}
      @click=${() => e.pressButton(t, i)}
    >
      <ha-icon icon=${a}></ha-icon>
    </button>
  `;
}
function yr(e, t, i) {
  return {
    name: e.entity(t, `temperature_memory_${i}_name`),
    temp: e.entity(t, `temperature_memory_${i}_temperature`),
    press: e.entity(t, `temperature_memory_${i}`),
    del: e.entity(t, `delete_temperature_memory_${i}`)
  };
}
function br(e, t) {
  return Object.values(t).some(
    (i) => e.canRender(i.definition, i.state)
  );
}
function Es(e, t) {
  const i = e.isActionBusy(vr(e.weatherService));
  return c`
    <div class="service-box ${i ? "busy" : ""}" aria-busy=${String(i)}>
      <select
        .value=${e.weatherService}
        aria-label=${l(e.hass, "field.weather_service")}
        ?disabled=${i}
        aria-busy=${String(i)}
        @change=${(r) => {
    e.setWeatherService(r.target.value);
  }}
      >
        ${ps.map(
    (r) => c`<option value=${r}>${l(e.hass, `service.${r}`)}</option>`
  )}
      </select>
      ${us.map((r) => As(e, r, i))}
      <button
        class="chip"
        type="button"
        aria-label=${l(e.hass, "button.run")}
        ?disabled=${i}
        aria-busy=${String(i)}
        @click=${() => e.callWeather(t)}
      >
        ${l(e.hass, "button.run")}
      </button>
    </div>
  `;
}
function As(e, t, i) {
  return c`
    <input
      placeholder=${l(e.hass, t.labelKey)}
      .value=${e.weatherForm[t.key]}
      aria-label=${l(e.hass, t.labelKey)}
      ?disabled=${i}
      aria-busy=${String(i)}
      @input=${(r) => e.setWeatherFormValue(t.key, r.target.value)}
    />
  `;
}
const Cs = {
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
}, Ts = {
  fail: "support.status.fail",
  pass: "support.status.pass",
  warn: "support.status.warn"
};
function Os(e) {
  const t = l(e.hass, "support.export");
  return c`
    <section
      class="card-section support-section"
      data-section="support"
      role="region"
      aria-labelledby="dhe-support-heading"
    >
      <h3 id="dhe-support-heading">${l(e.hass, "section.support")}</h3>
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
        <span id="dhe-support-export-hint">${l(e.hass, "support.export_hint")}</span>
      </div>
      <div class="support-grid">
        ${Ds(e)}
        ${Ns(e)}
        ${Rs(e)}
        ${Is(e)}
      </div>
    </section>
  `;
}
function Ds(e) {
  const t = e.model.summary, i = e.model.checks.filter((n) => n.level === "fail").length, r = e.model.checks.filter((n) => n.level === "warn").length;
  return Ve(
    e,
    "support.self_test",
    "dhe-support-self-test-title",
    "mdi:clipboard-pulse-outline",
    c`
      <div
        class="support-score ${i ? "fail" : r ? "warn" : "pass"}"
        role="status"
        aria-live="polite"
      >
        <strong>${i || r || t.availableEntities}</strong>
        <span>
          ${i ? l(e.hass, "support.self_test_failed") : r ? l(e.hass, "support.self_test_warn") : l(e.hass, "support.self_test_pass")}
        </span>
      </div>
      <dl class="support-stats">
        ${B(e, "support.stat.mapped", t.mappedEntities)}
        ${B(e, "support.stat.available", t.availableEntities)}
        ${B(e, "support.stat.unavailable", t.unavailableEntities)}
        ${B(e, "support.stat.missing_required", t.missingRequiredEntities)}
      </dl>
    `
  );
}
function Ns(e) {
  const t = e.model.diagnostics;
  return Ve(
    e,
    "support.integration_diagnostics",
    "dhe-support-diagnostics-title",
    "mdi:stethoscope",
    c`
      <dl class="support-stats">
        ${B(e, "support.stat.device", t.deviceIdHash ?? "-")}
        ${B(e, "support.stat.config_entry", t.configEntryIdHash ?? "-")}
        ${B(e, "support.stat.base_entity", t.baseEntityHash ?? "-")}
        ${B(
      e,
      "support.stat.registry",
      l(
        e.hass,
        t.entityRegistryAvailable ? "support.value.yes" : "support.value.no"
      )
    )}
      </dl>
      ${Object.keys(t.domains).length ? c`
            <div
              class="support-domain-list"
              role="list"
              aria-label=${l(e.hass, "support.domain_distribution")}
            >
              ${M(
      Object.entries(t.domains),
      ([i]) => i,
      ([i, r]) => c`<span role="listitem">${i}: ${r}</span>`
    )}
            </div>
          ` : h}
    `
  );
}
function Rs(e) {
  return Ve(
    e,
    "support.compatibility",
    "dhe-support-compatibility-title",
    "mdi:check-decagram-outline",
    c`
      <div
        class="support-checks"
        role="list"
        aria-label=${l(e.hass, "support.compatibility_list")}
      >
        ${M(
      e.model.checks,
      (t) => t.key,
      (t) => Bs(e, t)
    )}
      </div>
    `
  );
}
function Is(e) {
  return Ve(
    e,
    "support.entity_audit",
    "dhe-support-entity-audit-title",
    "mdi:format-list-checks",
    c`
      <div
        class="support-entity-list"
        role="list"
        aria-label=${l(e.hass, "support.entity_audit_list")}
      >
        ${M(
      e.model.entities,
      (t) => t.key,
      (t) => zs(e, t)
    )}
      </div>
    `
  );
}
function Ve(e, t, i, r, n) {
  return c`
    <article class="support-panel" role="group" aria-labelledby=${i}>
      <h4 id=${i}>
        <ha-icon icon=${r}></ha-icon>
        ${l(e.hass, t)}
      </h4>
      ${n}
    </article>
  `;
}
function Bs(e, t) {
  return c`
    <div class="support-check ${t.level}" role="listitem">
      <ha-icon icon=${Ls(t.level)}></ha-icon>
      <span>${l(e.hass, Cs[t.key])}</span>
      <strong>${l(e.hass, Ts[t.level])}</strong>
      ${t.value !== void 0 ? c`<small>${t.value}</small>` : h}
    </div>
  `;
}
function zs(e, t) {
  const i = l(e.hass, `support.entity_status.${t.status}`), r = l(
    e.hass,
    `support.registry_status.${t.registryStatus}`
  );
  return c`
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
function B(e, t, i) {
  return c`
    <div>
      <dt>${l(e.hass, t)}</dt>
      <dd>${i}</dd>
    </div>
  `;
}
function Ls(e) {
  switch (e) {
    case "pass":
      return "mdi:check-circle-outline";
    case "warn":
      return "mdi:alert-circle-outline";
    case "fail":
      return "mdi:close-circle-outline";
  }
}
function Ps(e, t) {
  const i = Je(e, t.connection);
  if (i)
    return l(e, "status.connection", { state: i });
  const r = Je(e, t.device);
  if (r)
    return l(e, "status.device", { state: r });
  const n = Je(e, t.error);
  return n ? l(e, "status.status", { state: n }) : t.hasBaseEntity ? l(e, "status.discovered") : l(e, "status.select_device");
}
function Je(e, t) {
  if (!(!t || P(t)))
    return b(t.state) || l(e, "state.unknown");
}
const Ms = we`
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
`, Ks = we`
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
`, Hs = we`
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
`, js = we`
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
`, Ws = [Ks, js, Hs, Ms];
function Us(e, t, i) {
  const r = t.device_id ?? i.deviceId, n = new Set(t.hide_entities), o = L.filter(
    (v) => !n.has(v.key)
  ), a = o.map(
    (v) => qs(e, i, v, r)
  ), d = a.filter((v) => v.entityIdHash).length, s = a.filter((v) => v.status === "available").length, p = a.filter(
    (v) => ["unavailable", "unknown"].includes(v.status)
  ).length, m = a.filter(
    (v) => !v.optional && v.status === "missing"
  ).length, u = a.filter(
    (v) => v.optional && v.status === "missing"
  ).length, f = r ? Tt(e, r).filter(
    ([, v]) => !!(v.disabled_by || v.hidden_by || v.hidden)
  ).length : 0, _ = a.filter(
    (v) => v.diagnostic && v.status !== "missing"
  ).length, y = {
    generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    summary: {
      knownEntities: o.length,
      mappedEntities: d,
      availableEntities: s,
      unavailableEntities: p,
      missingRequiredEntities: m,
      missingOptionalEntities: u,
      disabledOrHiddenRegistryEntities: f,
      diagnosticEntities: _
    },
    diagnostics: {
      cardType: t.type,
      deviceIdHash: me(i.deviceId),
      configEntryIdHash: me(i.configEntryId),
      baseEntityHash: me(i.baseEntity),
      selectedDevice: Gs(e, t, i),
      entityRegistryAvailable: !!e.entities,
      deviceRegistryAvailable: !!e.devices,
      domains: Js(e, i)
    },
    entities: a,
    checks: []
  };
  return y.checks = Zs(y), y;
}
function Fs(e, t) {
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
function Vs(e = /* @__PURE__ */ new Date()) {
  return `dhe-connect-card-support-${e.toISOString().replace(/[:.]/g, "-")}.json`;
}
function Ys(e, t) {
  if (typeof document > "u" || typeof URL > "u" || typeof URL.createObjectURL != "function" || typeof Blob > "u")
    return;
  const i = URL.createObjectURL(new Blob([t], { type: "application/json" })), r = document.createElement("a");
  r.href = i, r.download = e, r.rel = "noopener", r.click(), window.setTimeout(() => URL.revokeObjectURL(i), 0);
}
function Gs(e, t, i) {
  const r = t.device_id ?? i.deviceId;
  return r ? e.devices?.[r] ? !0 : Tt(e, r).some(
    ([, n]) => n.device_id === r
  ) : !1;
}
function qs(e, t, i, r) {
  const n = t.entityIds[i.key], o = (n ? [n, e.entities?.[n]] : void 0) ?? Xs(e, r, i), a = o?.[0], d = o?.[1], s = bt(e, n ?? a);
  return {
    key: i.key,
    domain: i.domain,
    optional: !!i.optional,
    diagnostic: !!i.diagnostic,
    dangerous: !!i.dangerous,
    status: Qs(s),
    registryStatus: ec(d),
    entityIdHash: me(n ?? a),
    registryHash: me(d?.unique_id ?? d?.translation_key)
  };
}
function Zs(e) {
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
      level: tc() ? "pass" : "warn"
    },
    {
      key: "support_export",
      level: "pass"
    }
  ];
}
function Js(e, t) {
  const i = {};
  for (const r of Object.values(t.entityIds)) {
    if (!bt(e, r))
      continue;
    const n = r.split(".", 1)[0] ?? "unknown";
    i[n] = (i[n] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(i).sort(([r], [n]) => r.localeCompare(n)));
}
function Tt(e, t) {
  return Object.entries(e.entities ?? {}).filter(([, i]) => i.platform !== Ke ? !1 : !t || i.device_id === t);
}
function Xs(e, t, i) {
  if (t)
    return Tt(e, t).find(([r, n]) => r.startsWith(`${i.domain}.`) ? Zn(i, r, n) : !1);
}
function Qs(e) {
  return e ? e.state === "unknown" ? "unknown" : P(e) ? "unavailable" : "available" : "missing";
}
function ec(e) {
  return e ? e.disabled_by ? "disabled" : e.hidden || e.hidden_by ? "hidden" : "enabled" : "unknown";
}
function tc() {
  return typeof customElements > "u" || !!customElements.get("dhe-connect-card");
}
function me(e) {
  if (!e)
    return;
  let t = 2166136261;
  for (let i = 0; i < e.length; i += 1)
    t ^= e.charCodeAt(i), t = Math.imul(t, 16777619);
  return `h${(t >>> 0).toString(16).padStart(8, "0")}`;
}
var ic = Object.defineProperty, rc = Object.getOwnPropertyDescriptor, le = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? rc(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (r ? a(t, i, n) : a(n)) || n);
  return r && n && ic(t, i, n), n;
};
const nc = [...Qe, ...et];
let K = class extends Q {
  constructor() {
    super(...arguments), this._sourceConfig = {}, this._config = ee({}), this._weatherService = ds, this._weatherForm = { ...hs }, this._busyActionKeys = /* @__PURE__ */ new Set(), this._discoveryCache = new Ki(), this._overviewTiles = new La(), this._actions = new ua(), this._serviceCalls = new ls((e) => {
      this._busyActionKeys = new Set(e);
    }), this._translationsChanged = () => {
      this._overviewTiles.clear(), this.requestUpdate();
    }, this._cancelHoldAction = () => {
      this._actions.handlePointerEnd();
    };
  }
  setConfig(e) {
    const t = li(this._config);
    this._sourceConfig = e, this._applyConfigMigration(), this._supportModelCache = void 0, this._renderableSectionsCache = void 0, li(this._config) !== t && this.requestUpdate();
  }
  getCardSize() {
    return Ta(this._config);
  }
  static getConfigElement() {
    return document.createElement("dhe-connect-card-editor");
  }
  static getStubConfig(e) {
    return { type: "custom:dhe-connect-card", device_id: Li(e, ee({})).deviceId };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(fe, this._translationsChanged);
  }
  disconnectedCallback() {
    window.removeEventListener(fe, this._translationsChanged), this._actions.clear(), this._serviceCalls.clear(), this._discoveryCache.clear(), this._overviewTiles.clear(), this._supportModelCache = void 0, this._renderableSectionsCache = void 0, super.disconnectedCallback();
  }
  render() {
    if (!this.hass)
      return c`<ha-card class="dhe-card">${l(void 0, "state.loading")}</ha-card>`;
    this._applyConfigMigration();
    const e = Ae("discovery", () => this._discoverEntities()), t = this._entityResolver(e), i = t("water_heating"), r = i.entityId, n = Un(
      this._config.name,
      i.definition,
      i.state,
      this.hass
    ), o = this._sectionRenderContext(t), a = Ae(
      "overview-tiles",
      () => this._overviewTiles.get(o, e)
    ), d = Ae(
      "section-filter",
      () => this._renderableSections(t, e)
    );
    return c`
      <ha-card class=${this._cardClass()} style=${this._cardStyle()}>
        <header>
          ${this._renderActionButton(
      r,
      "title-block entity-action",
      n,
      c`
              <div class=${this._headerIconClass(i.state)}><ha-icon icon="mdi:water-thermometer"></ha-icon></div>
              <div>
                <h2>${n}</h2>
                <p>${this._statusText(e, t)}</p>
              </div>
            `
    )}
          ${this._renderHeaderTemperature(i.state, r)}
        </header>
        ${this._errorMessage ? c`<div class="error-banner" role="alert">${this._errorMessage}</div>` : h}

        <div
          class="content-grid"
          style=${`--dhe-section-count: ${d.length};`}
        >
          ${M(
      d,
      (s) => s,
      (s) => this._renderSection(o, e, s, a)
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
      ...Oa(this._config),
      `icon-theme-${this._config.icon_theme}`
    ].filter(Boolean).join(" ");
  }
  _cardStyle() {
    const e = [ur(this._config)];
    return this._config.icon_theme === "custom" && e.push(ln(this._config.icon_colors)), e.join(" ");
  }
  _applyConfigMigration() {
    const e = tr(this.hass, this._sourceConfig);
    this._config = ee(e.config), e.legacy && ir("card", e.legacy);
  }
  _renderSection(e, t, i, r) {
    switch (i) {
      case "overview":
        return Xa(e, t, r);
      case "controls":
        return ms(e, t);
      case "bath":
        return gs(e, t);
      case "timers":
        return _s(e, t);
      case "memory":
        return vs(e, t);
      case "consumption":
      case "saving":
        return ci(e, t, i);
      case "weather":
        return fs(e, t);
      case "radio":
        return this._renderRadio(t, e.entity);
      case "diagnostics":
        return this._config.show_diagnostics ? ci(e, t, "diagnostics") : h;
      case "support":
        return this._config.show_support_mode ? Os({
          hass: this.hass,
          model: this._supportModel(t),
          exportSupportPackage: () => this._exportSupportPackage(t)
        }) : h;
      case "actions":
        return ys(e, t);
      default:
        return h;
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
    return c`
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
    const i = $(e, "temperature"), r = $(e, "current_temperature"), n = i !== void 0 ? l(this.hass, "label.target", { value: `${i}°` }) : r !== void 0 ? l(this.hass, "label.current", { value: r }) : T(this.hass, e);
    return c`
      ${this._renderActionButton(
      t,
      "temperature entity-action",
      n,
      c`
          <strong>${i !== void 0 ? `${i}°` : T(this.hass, e)}</strong>
          <span>
            ${r !== void 0 ? l(this.hass, "label.current", { value: r }) : l(this.hass, "label.target")}
          </span>
        `
    )}
    `;
  }
  _renderRadio(e, t) {
    const i = t(e, "radio"), r = i.entityId, n = i.state;
    return !this._canRender(i.definition, n) || !r || !n ? h : os({
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
    const i = oc(this._config, t, this.hass);
    if (this._renderableSectionsCache?.signature === i)
      return this._renderableSectionsCache.sections;
    const r = nr(
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
        return !!(i.entityId && i.state) || this._hasRenderableEntity(t, nc);
      }
      case "bath":
        return this._hasRenderableEntity(t, yi);
      case "timers":
        return this._hasRenderableEntity(t, bi);
      case "memory":
        return Y().some(
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
        return e === "diagnostics" && !this._config.show_diagnostics ? !1 : (ze[e] ?? []).some(
          (i) => this._isEntityRenderable(t, i.key)
        );
      case "support":
        return this._config.show_support_mode;
      case "weather":
        return this._hasRenderableEntity(t, ["weather", "weather_location"]);
      case "radio":
        return this._isEntityRenderable(t, "radio");
      case "actions":
        return this._hasRenderableEntity(t, wi);
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
    const i = $(t, "temperature") ?? z(t) ?? 38, r = $(t, "min_temp") ?? 20, n = $(t, "max_temp") ?? 60, o = $(t, "target_temp_step") ?? 0.5, a = this._isServiceBusy(e, "set_temperature"), d = t.state === "off" ? "turn_on" : "turn_off", s = this._isServiceBusy(e, d), p = this._isEntityBusy(e);
    return c`
      <div class="climate-control ${p ? "busy" : ""}" aria-busy=${String(p)}>
        <button class="icon" type="button" title=${l(this.hass, "tooltip.decrease")} aria-label=${l(this.hass, "tooltip.decrease")} ?disabled=${a} aria-busy=${String(a)} @click=${() => this._adjustTemp(e, t, -o)}>
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
            aria-label=${l(this.hass, "label.target")}
            ?disabled=${a}
            aria-busy=${String(a)}
            @change=${(m) => this._setClimateFromInput(e, t, m)}
          />
        </div>
        <button class="icon" type="button" title=${l(this.hass, "tooltip.increase")} aria-label=${l(this.hass, "tooltip.increase")} ?disabled=${a} aria-busy=${String(a)} @click=${() => this._adjustTemp(e, t, o)}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
        <button class="chip" type="button" ?disabled=${s} aria-busy=${String(s)} @click=${() => this._toggleClimate(e, t)}>
          ${t.state === "off" ? l(this.hass, "button.turn_on") : l(this.hass, "button.turn_off")}
        </button>
      </div>
    `;
  }
  _rowControl(e, t, i) {
    if (!t || !i || P(i))
      return h;
    switch (e.domain) {
      case "switch": {
        const r = ri(i), n = this._isServiceBusy(t, r), o = E(e, i, this.hass);
        return c`
          <button class="chip ${ye(i) ? "active" : ""}" type="button" aria-label=${o} ?disabled=${n} aria-busy=${String(n)} @click=${() => this._toggleSwitch(t, i)}>
            ${ye(i) ? l(this.hass, "button.on") : l(this.hass, "button.off")}
          </button>
        `;
      }
      case "button": {
        const r = this._isServiceBusy(t, "press"), n = E(e, i, this.hass);
        return c`
          <button class="chip" type="button" aria-label=${n} ?disabled=${r} aria-busy=${String(r)} @click=${() => this._pressButton(e, t)}>
            ${l(this.hass, "button.press")}
          </button>
        `;
      }
      case "number": {
        const r = this._isServiceBusy(t, "set_value"), n = E(e, i, this.hass);
        return c`
          <input
            class="number"
            type="number"
            min=${String(i.attributes.min ?? "")}
            max=${String(i.attributes.max ?? "")}
            step=${String(i.attributes.step ?? 1)}
            .value=${String(z(i) ?? "")}
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
        const r = this._isServiceBusy(t, "set_value"), n = E(e, i, this.hass);
        return c`
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
        return h;
    }
  }
  _selectControl(e, t) {
    const i = this._isServiceBusy(e, "select_option"), r = Array.isArray(t.attributes.options) ? t.attributes.options.map(String) : [], n = b(t.attributes.friendly_name, e) || e;
    return r.length ? c`
      <select
        ?disabled=${i}
        aria-label=${n}
        aria-busy=${String(i)}
        @change=${(o) => this._selectOption(e, o)}
      >
        ${r.map(
      (o) => c`<option value=${o} ?selected=${o === t.state}>
              ${b(o) || o}
            </option>`
    )}
      </select>
    ` : h;
  }
  _entity(e, t) {
    const i = vi[t] ?? Vr, r = e.entityIds[t], n = bt(this.hass, r);
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
    return e.dangerous && !this._config.show_dangerous_actions || e.diagnostic && !this._config.show_diagnostics ? !1 : t ? this._config.show_unavailable || !P(t) : this._config.show_optional && !!e.optional;
  }
  _iconBubbleClass(e, t) {
    return wa(e, t, this._config.show_icon_animations);
  }
  _headerIconClass(e) {
    const t = Pe(e);
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
      hasDoubleTap: Xe(this._config.double_tap_action),
      hasHold: Xe(this._config.hold_action),
      dispatch: (t, i) => this._fireAction(t, i)
    };
  }
  _fireAction(e, t) {
    if (!e)
      return;
    const i = en(this._config, t, e);
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
    return Ps(this.hass, {
      connection: t("connection_state").state,
      device: t("device_status").state,
      error: t("error_status").state,
      hasBaseEntity: !!e.baseEntity
    });
  }
  _supportModel(e) {
    const t = [
      X(e),
      this._config.show_diagnostics ? "diag1" : "diag0",
      X(this.hass?.states),
      X(this.hass?.entities),
      X(this.hass?.devices)
    ].join("|");
    if (this._supportModelCache?.signature === t)
      return this._supportModelCache.model;
    const i = Ae(
      "support-model",
      () => Us(this.hass, this._config, e)
    );
    return this._supportModelCache = { signature: t, model: i }, i;
  }
  async _call(e, t) {
    await this._runEntityService(e, t);
  }
  async _toggleClimate(e, t) {
    const i = t.state === "off" ? "turn_on" : "turn_off";
    await this._runEntityService(e, i);
  }
  async _toggleSwitch(e, t) {
    const i = ri(t);
    await this._runEntityService(e, i);
  }
  async _pressButton(e, t) {
    e.dangerous && !window.confirm(
      l(this.hass, "confirm.run", {
        label: E(e, void 0, this.hass)
      })
    ) || await this._runEntityService(t, "press");
  }
  async _adjustTemp(e, t, i) {
    await this._runServiceCall(
      R(e, "set_temperature"),
      () => ni(this.hass, e, t, i)
    );
  }
  async _setClimateFromInput(e, t, i) {
    await this._runServiceCall(
      R(e, "set_temperature"),
      () => ni(
        this.hass,
        e,
        t,
        Number(i.target.value) - ($(t, "temperature") ?? z(t) ?? 0)
      )
    );
  }
  async _setNumber(e, t, i) {
    await this._runServiceCall(
      R(e, "set_value"),
      () => aa(this.hass, e, t, i.target.value)
    );
  }
  async _setText(e, t) {
    await this._runServiceCall(
      R(e, "set_value"),
      () => sa(this.hass, e, t.target.value)
    );
  }
  async _selectOption(e, t) {
    await this._runServiceCall(
      R(e, "select_option"),
      () => ca(this.hass, e, t.target.value)
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
      () => la(this.hass, e, t.target.value)
    );
  }
  async _callWeather(e) {
    await this._runServiceCall(
      vr(this._weatherService),
      () => da(
        this.hass,
        this._weatherService,
        this._weatherForm,
        e.configEntryId
      )
    );
  }
  _exportSupportPackage(e) {
    const t = this._supportModel(e), i = Fs(t, this._config), r = JSON.stringify(i, null, 2);
    this.dispatchEvent(
      new CustomEvent("dhe-connect-support-package", {
        bubbles: !0,
        composed: !0,
        detail: { supportPackage: i, json: r }
      })
    ), Ys(Vs(), r);
  }
  async _runServiceCall(e, t) {
    await this._serviceCalls.run(e, async () => {
      try {
        this._errorMessage = void 0, await t();
      } catch (i) {
        const r = l(this.hass, "error.action_failed", {
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
K.styles = Ws;
le([
  mt({ attribute: !1 })
], K.prototype, "hass", 2);
le([
  se()
], K.prototype, "_weatherService", 2);
le([
  se()
], K.prototype, "_weatherForm", 2);
le([
  se()
], K.prototype, "_errorMessage", 2);
le([
  se()
], K.prototype, "_busyActionKeys", 2);
K = le([
  _i("dhe-connect-card")
], K);
function li(e) {
  return JSON.stringify(e);
}
function oc(e, t, i) {
  return JSON.stringify({
    sections: e.sections,
    overview: e.overview_entities,
    optional: e.show_optional,
    unavailable: e.show_unavailable,
    diagnostics: e.show_diagnostics,
    dangerous: e.show_dangerous_actions,
    support: e.show_support_mode,
    discovered: X(t),
    states: X(i?.states)
  });
}
const di = /* @__PURE__ */ new WeakMap();
let ac = 1;
function X(e) {
  if (!e || typeof e != "object")
    return 0;
  const t = e, i = di.get(t);
  if (i !== void 0)
    return i;
  const r = ac++;
  return di.set(t, r), r;
}
window.registerDheConnectCardTranslation = Ai;
window.registerDheConnectCardTranslations = Ci;
window.dheConnectCardTranslations && Ci(window.dheConnectCardTranslations);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "dhe-connect-card",
  name: "DHE Connect Card",
  description: "Mushroom-style card for the Stiebel DHE Connect integration",
  preview: !0
});
//# sourceMappingURL=ha-dhe-connect-card.js.map
