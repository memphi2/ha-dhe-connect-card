const xe = globalThis, rt = xe.ShadowRoot && (xe.ShadyCSS === void 0 || xe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, nt = /* @__PURE__ */ Symbol(), Et = /* @__PURE__ */ new WeakMap();
let ni = class {
  constructor(t, i, r) {
    if (this._$cssResult$ = !0, r !== nt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (rt && t === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (t = Et.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && Et.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ur = (e) => new ni(typeof e == "string" ? e : e + "", void 0, nt), ve = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((r, n, o) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[o + 1], e[0]);
  return new ni(i, e, nt);
}, hr = (e, t) => {
  if (rt) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const r = document.createElement("style"), n = xe.litNonce;
    n !== void 0 && r.setAttribute("nonce", n), r.textContent = i.cssText, e.appendChild(r);
  }
}, At = rt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const r of t.cssRules) i += r.cssText;
  return ur(i);
})(e) : e;
const { is: pr, defineProperty: mr, getOwnPropertyDescriptor: gr, getOwnPropertyNames: _r, getOwnPropertySymbols: vr, getPrototypeOf: fr } = Object, De = globalThis, Ct = De.trustedTypes, yr = Ct ? Ct.emptyScript : "", br = De.reactiveElementPolyfillSupport, se = (e, t) => e, Se = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? yr : null;
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
} }, ot = (e, t) => !pr(e, t), Tt = { attribute: !0, type: String, converter: Se, reflect: !1, useDefault: !1, hasChanged: ot };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), De.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let G = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Tt) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, r, i);
      n !== void 0 && mr(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, r) {
    const { get: n, set: o } = gr(this.prototype, t) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: n, set(a) {
      const l = n?.call(this);
      o?.call(this, a), this.requestUpdate(t, l, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Tt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(se("elementProperties"))) return;
    const t = fr(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(se("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(se("properties"))) {
      const i = this.properties, r = [..._r(i), ...vr(i)];
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
      for (const n of r) i.unshift(At(n));
    } else t !== void 0 && i.push(At(t));
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
    return hr(t, this.constructor.elementStyles), t;
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
      const o = (r.converter?.toAttribute !== void 0 ? r.converter : Se).toAttribute(i, r.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const r = this.constructor, n = r._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = r.getPropertyOptions(n), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Se;
      this._$Em = n;
      const l = a.fromAttribute(i, o.type);
      this[n] = l ?? this._$Ej?.get(n) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, i, r, n = !1, o) {
    if (t !== void 0) {
      const a = this.constructor;
      if (n === !1 && (o = this[t]), r ??= a.getPropertyOptions(t), !((r.hasChanged ?? ot)(o, i) || r.useDefault && r.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, r)))) return;
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
        const { wrapped: a } = o, l = this[n];
        a !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, o, l);
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
G.elementStyles = [], G.shadowRootOptions = { mode: "open" }, G[se("elementProperties")] = /* @__PURE__ */ new Map(), G[se("finalized")] = /* @__PURE__ */ new Map(), br?.({ ReactiveElement: G }), (De.reactiveElementVersions ??= []).push("2.1.2");
const at = globalThis, Ot = (e) => e, Ee = at.trustedTypes, Dt = Ee ? Ee.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, oi = "$lit$", I = `lit$${Math.random().toFixed(9).slice(2)}$`, ai = "?" + I, wr = `<${ai}>`, F = document, de = () => F.createComment(""), ue = (e) => e === null || typeof e != "object" && typeof e != "function", st = Array.isArray, $r = (e) => st(e) || typeof e?.[Symbol.iterator] == "function", We = `[ 	
\f\r]`, oe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Nt = /-->/g, It = />/g, P = RegExp(`>|${We}(?:([^\\s"'>=/]+)(${We}*=${We}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Rt = /'/g, Bt = /"/g, si = /^(?:script|style|textarea|title)$/i, kr = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), s = kr(1), j = /* @__PURE__ */ Symbol.for("lit-noChange"), h = /* @__PURE__ */ Symbol.for("lit-nothing"), zt = /* @__PURE__ */ new WeakMap(), H = F.createTreeWalker(F, 129);
function ci(e, t) {
  if (!st(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Dt !== void 0 ? Dt.createHTML(t) : t;
}
const xr = (e, t) => {
  const i = e.length - 1, r = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = oe;
  for (let l = 0; l < i; l++) {
    const c = e[l];
    let p, m, u = -1, f = 0;
    for (; f < c.length && (a.lastIndex = f, m = a.exec(c), m !== null); ) f = a.lastIndex, a === oe ? m[1] === "!--" ? a = Nt : m[1] !== void 0 ? a = It : m[2] !== void 0 ? (si.test(m[2]) && (n = RegExp("</" + m[2], "g")), a = P) : m[3] !== void 0 && (a = P) : a === P ? m[0] === ">" ? (a = n ?? oe, u = -1) : m[1] === void 0 ? u = -2 : (u = a.lastIndex - m[2].length, p = m[1], a = m[3] === void 0 ? P : m[3] === '"' ? Bt : Rt) : a === Bt || a === Rt ? a = P : a === Nt || a === It ? a = oe : (a = P, n = void 0);
    const _ = a === P && e[l + 1].startsWith("/>") ? " " : "";
    o += a === oe ? c + wr : u >= 0 ? (r.push(p), c.slice(0, u) + oi + c.slice(u) + I + _) : c + I + (u === -2 ? l : _);
  }
  return [ci(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class he {
  constructor({ strings: t, _$litType$: i }, r) {
    let n;
    this.parts = [];
    let o = 0, a = 0;
    const l = t.length - 1, c = this.parts, [p, m] = xr(t, i);
    if (this.el = he.createElement(p, r), H.currentNode = this.el.content, i === 2 || i === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (n = H.nextNode()) !== null && c.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const u of n.getAttributeNames()) if (u.endsWith(oi)) {
          const f = m[a++], _ = n.getAttribute(u).split(I), y = /([.?@])?(.*)/.exec(f);
          c.push({ type: 1, index: o, name: y[2], strings: _, ctor: y[1] === "." ? Er : y[1] === "?" ? Ar : y[1] === "@" ? Cr : Ne }), n.removeAttribute(u);
        } else u.startsWith(I) && (c.push({ type: 6, index: o }), n.removeAttribute(u));
        if (si.test(n.tagName)) {
          const u = n.textContent.split(I), f = u.length - 1;
          if (f > 0) {
            n.textContent = Ee ? Ee.emptyScript : "";
            for (let _ = 0; _ < f; _++) n.append(u[_], de()), H.nextNode(), c.push({ type: 2, index: ++o });
            n.append(u[f], de());
          }
        }
      } else if (n.nodeType === 8) if (n.data === ai) c.push({ type: 2, index: o });
      else {
        let u = -1;
        for (; (u = n.data.indexOf(I, u + 1)) !== -1; ) c.push({ type: 7, index: o }), u += I.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const r = F.createElement("template");
    return r.innerHTML = t, r;
  }
}
function J(e, t, i = e, r) {
  if (t === j) return t;
  let n = r !== void 0 ? i._$Co?.[r] : i._$Cl;
  const o = ue(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, i, r)), r !== void 0 ? (i._$Co ??= [])[r] = n : i._$Cl = n), n !== void 0 && (t = J(e, n._$AS(e, t.values), n, r)), t;
}
class Sr {
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
    H.currentNode = n;
    let o = H.nextNode(), a = 0, l = 0, c = r[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let p;
        c.type === 2 ? p = new te(o, o.nextSibling, this, t) : c.type === 1 ? p = new c.ctor(o, c.name, c.strings, this, t) : c.type === 6 && (p = new Tr(o, this, t)), this._$AV.push(p), c = r[++l];
      }
      a !== c?.index && (o = H.nextNode(), a++);
    }
    return H.currentNode = F, n;
  }
  p(t) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, i), i += r.strings.length - 2) : r._$AI(t[i])), i++;
  }
}
class te {
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
    t = J(this, t, i), ue(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== j && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : $r(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && ue(this._$AH) ? this._$AA.nextSibling.data = t : this.T(F.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: r } = t, n = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = he.createElement(ci(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const o = new Sr(n, this), a = o.u(this.options);
      o.p(i), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let i = zt.get(t.strings);
    return i === void 0 && zt.set(t.strings, i = new he(t)), i;
  }
  k(t) {
    st(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, n = 0;
    for (const o of t) n === i.length ? i.push(r = new te(this.O(de()), this.O(de()), this, this.options)) : r = i[n], r._$AI(o), n++;
    n < i.length && (this._$AR(r && r._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const r = Ot(t).nextSibling;
      Ot(t).remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Ne {
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
    if (o === void 0) t = J(this, t, i, 0), a = !ue(t) || t !== this._$AH && t !== j, a && (this._$AH = t);
    else {
      const l = t;
      let c, p;
      for (t = o[0], c = 0; c < o.length - 1; c++) p = J(this, l[r + c], i, c), p === j && (p = this._$AH[c]), a ||= !ue(p) || p !== this._$AH[c], p === h ? t = h : t !== h && (t += (p ?? "") + o[c + 1]), this._$AH[c] = p;
    }
    a && !n && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Er extends Ne {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class Ar extends Ne {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class Cr extends Ne {
  constructor(t, i, r, n, o) {
    super(t, i, r, n, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = J(this, t, i, 0) ?? h) === j) return;
    const r = this._$AH, n = t === h && r !== h || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, o = t !== h && (r === h || n);
    n && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Tr {
  constructor(t, i, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    J(this, t);
  }
}
const Or = { I: te }, Dr = at.litHtmlPolyfillSupport;
Dr?.(he, te), (at.litHtmlVersions ??= []).push("3.3.3");
const Nr = (e, t, i) => {
  const r = i?.renderBefore ?? t;
  let n = r._$litPart$;
  if (n === void 0) {
    const o = i?.renderBefore ?? null;
    r._$litPart$ = n = new te(t.insertBefore(de(), o), o, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
const ct = globalThis;
let q = class extends G {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Nr(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return j;
  }
};
q._$litElement$ = !0, q.finalized = !0, ct.litElementHydrateSupport?.({ LitElement: q });
const Ir = ct.litElementPolyfillSupport;
Ir?.({ LitElement: q });
(ct.litElementVersions ??= []).push("4.2.2");
const li = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const Rr = { attribute: !0, type: String, converter: Se, reflect: !1, hasChanged: ot }, Br = (e = Rr, t, i) => {
  const { kind: r, metadata: n } = i;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), r === "accessor") {
    const { name: a } = i;
    return { set(l) {
      const c = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(a, c, e, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(a, void 0, e, l), l;
    } };
  }
  if (r === "setter") {
    const { name: a } = i;
    return function(l) {
      const c = this[a];
      t.call(this, l), this.requestUpdate(a, c, e, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function lt(e) {
  return (t, i) => typeof i == "object" ? Br(e, t, i) : ((r, n, o) => {
    const a = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, r), a ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(e, t, i);
}
function ie(e) {
  return lt({ ...e, state: !0, attribute: !1 });
}
const X = [
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
], zr = {
  key: "unknown",
  domain: "sensor",
  section: "overview",
  label: "Unknown",
  icon: "mdi:help-circle-outline",
  order: 0
}, Lr = [
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
], Pr = [
  V("bath_fill_target_volume", "bath", "Bath fill target volume", "mdi:bathtub", 100),
  V("child_safety_temperature_limit", "controls", "Child safety temperature limit", "mdi:thermometer-high", 101),
  V("eco_flow_limit", "controls", "Eco flow limit", "mdi:water-pump", 102),
  V("brush_timer_duration", "timers", "Brush timer seconds", "mdi:toothbrush", 103),
  V("shower_timer_duration", "timers", "Shower timer seconds", "mdi:timer-edit", 104),
  ...U().map(
    (e) => V(
      `temperature_memory_${e}_temperature`,
      "memory",
      `Memory ${e} temperature`,
      ut(e),
      120 + e,
      e > 2
    )
  )
], Mr = [
  S("eco_mode", "controls", "Eco mode", "mdi:leaf", 150),
  S("child_safety_active", "controls", "Child safety", "mdi:thermometer-check", 151),
  S("bath_fill_active", "bath", "Bath fill", "mdi:bathtub", 152),
  S("brush_timer_active", "timers", "Brush timer", "mdi:toothbrush", 153),
  S("shower_timer_active", "timers", "Shower timer", "mdi:shower-head", 154),
  S("wellness_cold_prevention", "controls", "Cold prevention", "mdi:shower", 160),
  S("wellness_winter_refresh", "controls", "Winter refresh", "mdi:snowflake-thermometer", 161),
  S("wellness_summer_fitness", "controls", "Summer fitness", "mdi:weather-sunny", 162),
  S("wellness_circulation_support", "controls", "Circulation support", "mdi:heart-pulse", 163)
], Hr = [
  Y("reset_brush_timer", "timers", "Reset brush timer", "mdi:toothbrush", 180, !0),
  Y("reset_shower_timer", "timers", "Reset shower timer", "mdi:shower-head", 181, !0),
  Y("repair_pairing", "actions", "Repair pairing", "mdi:refresh", 182, !0, !0),
  Y("disconnect_radio_pairing", "actions", "Disconnect radio pairing", "mdi:speaker-bluetooth", 183, !0, !0),
  ...U().map(
    (e) => Y(`temperature_memory_${e}`, "memory", `Memory ${e}`, ut(e), 200 + e, e > 2)
  ),
  ...U(3).map(
    (e) => Y(
      `delete_temperature_memory_${e}`,
      "memory",
      `Delete memory ${e}`,
      "mdi:trash-can-outline",
      230 + e,
      !0,
      !0
    )
  )
], Kr = [
  {
    key: "controlunit_name",
    domain: "text",
    section: "diagnostics",
    label: "Device name",
    icon: "mdi:form-textbox",
    diagnostic: !0,
    order: 90
  },
  ...U().map((e) => ({
    key: `temperature_memory_${e}_name`,
    domain: "text",
    section: "memory",
    label: `Memory ${e} name`,
    icon: ut(e),
    optional: e > 2,
    order: 260 + e
  }))
], W = [
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
  ...Lr,
  ...Pr,
  ...Mr,
  ...Hr,
  ...Kr,
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
].sort((e, t) => e.order - t.order), di = Object.fromEntries(
  W.map((e) => [e.key, e])
), dt = Object.fromEntries(
  X.map((e) => [e, []])
);
for (const e of W)
  dt[e.section].push(e);
function U(e = 1, t = 12) {
  return Array.from({ length: t - e + 1 }, (i, r) => e + r);
}
function ut(e) {
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
function V(e, t, i, r, n, o = !1) {
  return { key: e, domain: "number", section: t, label: i, icon: r, optional: o, order: n };
}
function S(e, t, i, r, n) {
  return { key: e, domain: "switch", section: t, label: i, icon: r, order: n };
}
function Y(e, t, i, r, n, o = !1, a = !1) {
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
const Fr = 500, Lt = 250, ui = {
  tap: "tap_action",
  hold: "hold_action",
  double_tap: "double_tap_action"
}, jr = { action: "more-info" };
function Ue(e) {
  if (!(!e || typeof e != "object" || Array.isArray(e)))
    return { ...e };
}
function Pt(e, t, i) {
  const r = e[ui[t]];
  if (Ge(r))
    return typeof r.entity == "string" ? { ...r } : { ...r, entity: i };
}
function Ge(e) {
  return !!(e && e.action !== "none");
}
function Wr(e, t, i) {
  const r = Pt(e, t, i);
  if (!r)
    return;
  const o = { entity: typeof r.entity == "string" ? r.entity : i };
  for (const a of ["tap", "hold", "double_tap"]) {
    const l = Pt(e, a, i);
    l && (o[ui[a]] = l);
  }
  return o;
}
const Ur = [
  "water_flow",
  "power",
  "outlet_temperature",
  "inlet_temperature",
  "water_consumption_total",
  "energy_consumption_total",
  "bath_fill_remaining_volume",
  "device_status",
  "error_status"
], qe = [
  "eco_mode",
  "child_safety_active",
  "child_safety_temperature_limit",
  "eco_flow_limit"
], Ze = [
  "wellness_cold_prevention",
  "wellness_winter_refresh",
  "wellness_summer_fitness",
  "wellness_circulation_support"
], hi = [
  "bath_fill_active",
  "bath_fill_target_volume",
  "bath_fill_remaining_volume",
  "bath_fill_current_volume"
], pi = [
  "brush_timer_active",
  "brush_timer_duration",
  "brush_timer_remaining",
  "reset_brush_timer",
  "shower_timer_active",
  "shower_timer_duration",
  "shower_timer_remaining",
  "reset_shower_timer"
], mi = ["repair_pairing", "disconnect_radio_pairing"], gi = [
  "state",
  "ha",
  "muted",
  "vivid",
  "custom"
], ht = [
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
], Vr = new Set(ht), Yr = /^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, Gr = /^(?:rgb|rgba|hsl|hsla)\([-+0-9.%\s,/]+\)$/i, qr = /^var\(--[a-zA-Z0-9_-]+(?:\s*,\s*(?:#[0-9a-fA-F]{3,8}|[a-zA-Z]+))?\)$/, Zr = /^[a-zA-Z]+$/;
function Jr(e) {
  if (!tn(e))
    return {};
  const t = {};
  for (const [i, r] of Object.entries(e)) {
    if (!en(i))
      continue;
    const n = Qr(r);
    n && (t[i] = n);
  }
  return t;
}
function Xr(e) {
  return ht.flatMap((t) => {
    const i = e[t];
    return i ? [`--dhe-user-icon-${t}-color: ${i};`] : [];
  }).join(" ");
}
function Qr(e) {
  if (typeof e != "string")
    return;
  const t = e.trim();
  if (!(!t || t.includes(";") || t.includes("{") || t.includes("}")) && (Yr.test(t) || Gr.test(t) || qr.test(t) || Zr.test(t)))
    return t;
}
function en(e) {
  return Vr.has(e);
}
function tn(e) {
  return !!(e && typeof e == "object" && !Array.isArray(e));
}
const rn = new Set(X), _i = new Set(Object.keys(di)), nn = /* @__PURE__ */ new Set([
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
]), on = new Set(gi), vi = ["auto", "mini", "tablet", "panel", "kiosk"], fi = ["auto", "compact", "normal", "large"], an = new Set(vi), sn = new Set(fi);
function Z(e) {
  const t = Je(e) ? e : {};
  return {
    type: "custom:dhe-connect-card",
    device_id: mn(t.device_id),
    name: t.name,
    tap_action: Ue(t.tap_action) ?? { ...jr },
    hold_action: Ue(t.hold_action),
    double_tap_action: Ue(t.double_tap_action),
    show_unavailable: D(t.show_unavailable, !1),
    show_optional: D(t.show_optional, !1),
    show_diagnostics: D(t.show_diagnostics, !0),
    show_dangerous_actions: D(t.show_dangerous_actions, !1),
    show_weather_services: D(t.show_weather_services, !1),
    show_icon_animations: D(t.show_icon_animations, !0),
    show_display_buttons: D(t.show_display_buttons, !1),
    show_support_mode: D(t.show_support_mode, !1),
    icon_theme: Mt(t.icon_theme, on, "state"),
    icon_colors: Jr(t.icon_colors),
    layout_mode: Mt(t.layout_mode, an, "auto"),
    tile_size: gn(t.tile_size, t.compact),
    overview_columns: dn(t.overview_columns, 3, 1, 6),
    sections: cn(t.sections),
    overview_entities: ln(t.overview_entities),
    hide_entities: un(t.hide_entities),
    entities: hn(t.entities)
  };
}
function cn(e) {
  if (!Array.isArray(e) || !e.length)
    return [...X];
  const t = [
    ...new Set(e.filter((i) => rn.has(i)))
  ];
  return t.length ? t : [...X];
}
function ln(e) {
  return Array.isArray(e) ? [...new Set(e.filter((t) => _i.has(t)))] : [...Ur];
}
function dn(e, t, i, r) {
  return typeof e != "number" || !Number.isInteger(e) ? t : Math.min(r, Math.max(i, e));
}
function un(e) {
  return Array.isArray(e) ? [...new Set(e.filter((t) => Xe(t)))] : [];
}
function hn(e) {
  if (!Je(e))
    return {};
  const t = {};
  for (const [i, r] of Object.entries(e)) {
    if (typeof r == "string" && r.trim() && Xe(i)) {
      t[i] = r.trim();
      continue;
    }
    if (!Je(r) || !pn(i))
      continue;
    const n = {};
    for (const [o, a] of Object.entries(r))
      typeof a == "string" && a.trim() && Xe(o) && (n[o] = a.trim());
    Object.keys(n).length && (t[i] = n);
  }
  return t;
}
function Je(e) {
  return !!(e && typeof e == "object" && !Array.isArray(e));
}
function Xe(e) {
  return typeof e == "string" && _i.has(e);
}
function pn(e) {
  return typeof e == "string" && nn.has(e);
}
function mn(e) {
  return typeof e == "string" && e.trim() ? e.trim() : void 0;
}
function D(e, t) {
  return typeof e == "boolean" ? e : t;
}
function Mt(e, t, i) {
  return typeof e == "string" && t.has(e) ? e : i;
}
function gn(e, t) {
  return typeof e == "string" && sn.has(e) ? e : t === !1 ? "large" : t === !0 ? "compact" : "auto";
}
const _n = { button: { apply_memory: "Speicher anwenden", delete_memory: "Speicher löschen", off: "Aus", on: "Ein", press: "Ausführen", run: "Ausführen", turn_off: "Ausschalten", turn_on: "Einschalten" }, confirm: { run: "{label} ausführen?" }, editor: { action: { "call-service": "Dienst aufrufen", "more-info": "Mehr Info", navigate: "Navigieren", none: "Keine", toggle: "Umschalten", url: "URL" }, action_entity: "Aktions-Entität", action_entity_help: "Optionale Entität für Mehr-Info, Umschalten und ähnliche Aktionen.", action_type: "Aktion", action_type_help: "Legt fest, was bei dieser Interaktion passiert.", actions_help: "Konfiguriert Klick, Halten und Doppelklick.", advanced_options: "Erweiterte Optionen", advanced_options_help: "Darstellung, Diagnose und optionale Steuerung", available_overview_entities: "Verfügbare Kacheln", basic_settings: "Gerät und Darstellung", dangerous_actions: "Riskante Aktionen", dangerous_actions_help: "Zeigt Aktionen, die Gerätezustand zurücksetzen, löschen oder reparieren können.", device: "Gerät", device_help: "Pflichtfeld. Wähle das Home-Assistant-Gerät; die Entitäten werden darüber gefunden.", device_preview: "Geräte-Vorschau", device_preview_empty: "Gerät auswählen", device_preview_help: "Eingeklappte Vorschau des ausgewählten Home-Assistant-Geräts und Discovery-Status.", device_preview_loading: "Lade Entitäten", device_preview_ready: "Bereit", device_preview_selected: "DHE-Gerät ausgewählt", diagnostics: "Diagnose", diagnostics_help: "Zeigt Diagnose- und technische Geräte-Entitäten.", display_buttons: "Display-Button-Ansicht", display_buttons_help: "Stellt unterstützte Steuerungen als Kacheln ähnlich dem Gerätedisplay dar.", double_tap_action: "Doppelklick-Aktion", drag_to_reorder: "Zum Sortieren ziehen", entities: "Entitäten", entities_help: "Gefundene Entitäten anzeigen, ausblenden oder überschreiben.", entity_override: "Override", entity_override_help: "Optionale Ersatz-Entität für diese Kartenfunktion.", entity_visibility_help: "Zeigt oder versteckt diese Entität in der Karte.", hold_action: "Halten-Aktion", icon_animations: "Icon-Animationen", icon_animations_help: "Aktiviert zustandsabhängige Icon-Bewegung, wenn Bewegung erlaubt ist.", icon_color: { action: "Aktionen", alert: "Alarm", eco: "Eco", energy: "Energie", hot: "Warmwasser", memory: "Speicher", ok: "OK", radio: "Radio", safety: "Sicherheit", status: "Status", timer: "Timer", water: "Wasser", weather: "Wetter", wellness: "Wellness" }, icon_color_help: "Optionale CSS-Farbe, Hex-Wert oder Home-Assistant-Theme-Variable.", icon_theme: { _: "Icon-Theme", custom: "Eigene Farben", ha: "Home Assistant", muted: "Ruhig", state: "Statusfarben", vivid: "Kräftig" }, icon_theme_help: "Legt fest, wie stark Icons Statusfarben und dem aktiven Home-Assistant-Theme folgen.", layout_mode: { _: "Layoutmodus", auto: "Automatisch", kiosk: "Kiosk", mini: "Mini", panel: "Panel", tablet: "Tablet" }, layout_mode_help: "Passt den masonry-artigen Abschnittsfluss für Mobile, Tablet, Panel und Kiosk an.", legacy_entity_detected: "Legacy-Entity-Anker erkannt: {entity}.", legacy_entity_migrated_to_device: "Zu Gerät {device} migriert.", legacy_entity_migrated_to_override: "Nutze vorübergehend ein Warmwasser-Override, bis ein Gerät ausgewählt ist.", name: "Name", name_help: "Optionaler Kartentitel für den Kartenkopf.", navigation_path: "Navigationspfad", navigation_path_help: "Dashboard-Pfad, den eine Navigationsaktion öffnet.", optional_missing: "Optionale fehlende Entitäten", optional_missing_help: "Zeigt optionale Steuerungen auch dann, wenn ihre Entität fehlt.", overview_columns: "Übersicht-Spalten", overview_columns_help: "Standardanzahl der Übersichtsspalten bei normaler Kartenbreite.", overview_entities: "Übersicht-Kacheln", overview_entities_help: "Wähle Übersicht-Kacheln und ziehe ausgewählte Einträge in die gewünschte Reihenfolge.", overview_entity_visibility_help: "Nimmt diese Entität in die Übersicht-Kacheln auf.", section_visibility_help: "Zeigt diesen Abschnitt und macht ihn sortierbar.", sections: "Abschnitte", sections_help: "Wähle sichtbare Abschnitte und ziehe sie in die gewünschte Reihenfolge.", selected_overview_entities: "Ausgewählte Kacheln", service: "Dienst", service_data: "Dienstdaten als JSON", service_data_help: "Optionales JSON-Objekt, das als Dienstdaten übergeben wird.", service_help: "Home-Assistant-Dienst oder Perform-Action-Name.", service_target_area: "Dienst-Zielbereich-IDs", service_target_area_help: "Kommagetrennte Bereichs-IDs für das Dienstziel.", service_target_device: "Dienst-Zielgeräte-IDs", service_target_device_help: "Kommagetrennte Geräte-IDs für das Dienstziel.", service_target_entity: "Dienst-Zielentität", service_target_entity_help: "Entitäts-ID für das Dienstziel.", support_mode: "Diagnose- und Supportmodus", support_mode_help: "Zeigt Support-Werkzeuge für GitHub-Issues, Entity-Audits und lokale Kompatibilitätschecks.", tap_action: "Klick-Aktion", tile_size: { _: "Kachelgröße", auto: "Automatisch", compact: "Kompakt", large: "Groß", normal: "Normal" }, tile_size_help: "Steuert die dynamische Größe von Übersicht- und Display-Kacheln.", unavailable: "Nicht verfügbare Entitäten", unavailable_help: "Zeigt Entitäten auch, wenn Home Assistant sie als nicht verfügbar oder unbekannt meldet.", url_path: "URL-Pfad", url_path_help: "URL, die eine URL-Aktion öffnet.", weather_services: "Wetterdienste", weather_services_help: "Zeigt Hilfsdienste für die Wetterfunktionen." }, entity: { memory: "Speicher {slot}", memory_delete: "Speicher {slot} löschen", memory_name: "Speicher {slot} Name", memory_temperature: "Speicher {slot} Temperatur" }, error: { action_failed: "Aktion fehlgeschlagen: {message}" }, field: { country_id: "Länder-ID", location_id: "Standort-ID", name: "Name", result: "Ergebnis" }, label: { current: "Aktuell {value}°", memory: "Speicher {slot}", target: "Ziel" }, overview: { delta: "{value}", group: { bath: "Bad", control: "Steuerung", energy: "Energie", saving: "Sparen", status: "Status", temperature: "Temp", timer: "Timer", water: "Wasser" }, trend: { down: "Sinkt", flat: "Stabil", up: "Steigt" } }, overview_short: { bath_fill_remaining_volume: "Badewanne", device_status: "Gerät", energy_consumption_total: "Energie", error_status: "Fehler", inlet_temperature: "Zulauf", outlet_temperature: "Auslauf", power: "Strom", water_consumption_total: "Wasser", water_flow: "Durchfluss" }, section: { actions: "Aktionen", bath: "Badewannenfüllung", consumption: "Verbrauch", controls: "Steuerung", diagnostics: "Diagnose", memory: "Temperaturspeicher", overview: "Übersicht", radio: "Radio", radio_favorites: "Radio-Favoriten", saving: "Sparmonitor", support: "Diagnose & Support", timers: "Timer", water_heating: "Warmwasser", weather: "Wetter", wellness: "Wellnessprogramme" }, service: { add_weather_favorite: "Favorit hinzufügen", remove_weather_favorite: "Favorit entfernen", search_weather_location: "Suchen", select_weather_location: "Standort auswählen", toggle_weather_favorite: "Favorit umschalten" }, state: { loading: "Lädt", not_found: "Nicht gefunden", unavailable: "Nicht verfügbar", unknown: "Unbekannt" }, status: { connection: "Verbindung {state}", device: "Gerät {state}", discovered: "Gerät erkannt", select_device: "DHE-Gerät auswählen", status: "Status {state}" }, support: { check: { active_entities: "Aktive Entitäten", base_entity: "Basis-Klimaentität", custom_element: "Karten-Custom-Element", device: "Ausgewähltes Gerät", device_registry: "Geräte-Registry", disabled_entities: "Deaktivierte oder versteckte Registry-Einträge", entity_registry: "Entity-Registry", required_entities: "Abdeckung der Pflicht-Entitäten", support_export: "Support-Paket-Export", unavailable_entities: "Nicht verfügbare Entitäten" }, compatibility: "Kompatibilitätscheck", entity_audit: "Entity-Audit", entity_status: { available: "Verfügbar", missing: "Fehlt", unavailable: "Nicht verfügbar", unknown: "Unbekannt" }, export: "Support-Paket exportieren", export_hint: "Erstellt ein anonymisiertes JSON-Paket für GitHub-Issues.", integration_diagnostics: "Integrationsdiagnose", registry_status: { disabled: "Deaktiviert", enabled: "Aktiviert", hidden: "Versteckt", unknown: "Unbekannt" }, self_test: "Selbsttest", self_test_failed: "Fehlgeschlagene Checks", self_test_pass: "Alle Checks bestanden", self_test_warn: "Warnungen", stat: { available: "Verfügbar", base_entity: "Basis-Entität", config_entry: "Config Entry", device: "Gerät", mapped: "Zugeordnet", missing_required: "Pflicht fehlt", registry: "Registry", unavailable: "Nicht verfügbar" }, status: { fail: "Fehler", pass: "OK", warn: "Warnung" }, value: { no: "Nein", yes: "Ja" } }, tooltip: { decrease: "Verringern", increase: "Erhöhen", next: "Weiter", pause: "Pause", play: "Wiedergabe", previous: "Zurück" } }, vn = { bath_fill_active: "Badewannenfüllung", bath_fill_current_volume: "Aktuelle Badewannenfüllung", bath_fill_remaining_volume: "Restmenge Badewanne", bath_fill_target_volume: "Zielmenge Badewanne", bluetooth_mac: "Bluetooth-MAC", brush_timer_active: "Zahnbürsten-Timer", brush_timer_duration: "Zahnbürsten-Timer Sekunden", brush_timer_remaining: "Zahnbürsten-Timer verbleibend", child_safety_active: "Kindersicherung", child_safety_temperature_limit: "Temperaturgrenze Kindersicherung", connection_state: "Verbindungsstatus", controlunit_name: "Gerätename", device_info: "Geräteinfo", device_status: "Gerätestatus", disconnect_radio_pairing: "Radio-Kopplung trennen", eco_flow_limit: "Eco-Durchflussgrenze", eco_mode: "Eco-Modus", energy_consumption_total: "Energieverbrauch gesamt", energy_consumption_week: "Energieverbrauch Woche", energy_consumption_year: "Energieverbrauch Jahr", error_status: "Fehlerstatus", inlet_temperature: "Zulauftemperatur", last_reconnect_reason: "Letzter Wiederverbindungsgrund", last_usage_cost: "Letzte Kosten", last_usage_energy: "Letzter Energieverbrauch", last_usage_time: "Letzte Nutzungsdauer", last_usage_water: "Letzter Wasserverbrauch", next_reconnect_delay: "Nächster Wiederverbindungsversuch", nominal_power: "Nennleistung", odb_actual_water_saving: "Tatsächliche Wassereinsparung", odb_heating_energy: "Heizenergie gesamt", odb_hot_water_volume: "Warmwassermenge gesamt", odb_possible_energy_saving: "Mögliche Energieeinsparung", operating_duration: "Betriebsdauer", outlet_temperature: "Auslauftemperatur", power: "Aktuelle Leistungsaufnahme", product_id: "Produkt-ID", protocol_version: "Protokollversion", radio: "Radio", reconnect_count: "Wiederverbindungen", repair_pairing: "Kopplung reparieren", reset_brush_timer: "Zahnbürsten-Timer zurücksetzen", reset_shower_timer: "Dusch-Timer zurücksetzen", saving_monitor_activation_rate: "Sparmonitor Aktivierungsrate", saving_monitor_consumption_co2: "Sparmonitor CO2-Verbrauch", saving_monitor_consumption_energy: "Sparmonitor Energieverbrauch", saving_monitor_consumption_water: "Sparmonitor Wasserverbrauch", saving_monitor_possible_co2: "Sparmonitor mögliche CO2-Einsparung", saving_monitor_possible_cost: "Sparmonitor mögliche Kosteneinsparung", saving_monitor_possible_energy: "Sparmonitor mögliche Energieeinsparung", saving_monitor_possible_water: "Sparmonitor mögliche Wassereinsparung", saving_monitor_real_co2: "Sparmonitor reale CO2-Einsparung", saving_monitor_real_cost: "Sparmonitor reale Kosteneinsparung", saving_monitor_real_energy: "Sparmonitor reale Energieeinsparung", saving_monitor_real_water: "Sparmonitor reale Wassereinsparung", scald_protection_active: "Verbrühschutz aktiv", scald_protection_temperature_limit: "Temperaturgrenze Verbrühschutz", shower_timer_active: "Dusch-Timer", shower_timer_duration: "Dusch-Timer Sekunden", shower_timer_remaining: "Dusch-Timer verbleibend", unknown: "Unbekannt", water_consumption_total: "Wasserverbrauch gesamt", water_consumption_week: "Wasserverbrauch Woche", water_consumption_year: "Wasserverbrauch Jahr", water_flow: "Aktueller Wasserfluss", water_heating: "Warmwasser", weather: "Wetter", weather_location: "Wetterstandort", wellness_circulation_support: "Kreislaufunterstützung", wellness_cold_prevention: "Kaltwasservermeidung", wellness_summer_fitness: "Sommer-Fitness", wellness_winter_refresh: "Winter-Erfrischung", wlan_mac: "WLAN-MAC" }, fn = {
  ui: _n,
  entity_labels: vn
}, yn = { button: { apply_memory: "Apply memory", delete_memory: "Delete memory", off: "Off", on: "On", press: "Press", run: "Run", turn_off: "Turn off", turn_on: "Turn on" }, confirm: { run: "Run {label}?" }, editor: { action: { "call-service": "Call service", "more-info": "More info", navigate: "Navigate", none: "None", toggle: "Toggle", url: "URL" }, action_entity: "Action entity", action_entity_help: "Optional entity used by more-info, toggle and similar actions.", action_type: "Action", action_type_help: "Choose what happens when this interaction is triggered.", actions_help: "Configure tap, hold and double tap behavior.", advanced_options: "Advanced options", advanced_options_help: "Layout, diagnostics and optional controls", available_overview_entities: "Available tiles", basic_settings: "Device and layout", dangerous_actions: "Dangerous actions", dangerous_actions_help: "Show controls that can reset, delete or repair device state.", device: "Device", device_help: "Required. Select the Home Assistant device; entities are discovered from this device.", device_preview: "Device preview", device_preview_empty: "Select a device", device_preview_help: "Collapsed preview of the selected Home Assistant device and discovery state.", device_preview_loading: "Loading entities", device_preview_ready: "Ready", device_preview_selected: "DHE device selected", diagnostics: "Diagnostics", diagnostics_help: "Show diagnostic and technical device entities.", display_buttons: "Display-style buttons", display_buttons_help: "Render supported controls as tiles similar to the device display.", double_tap_action: "Double tap action", drag_to_reorder: "Drag to reorder", entities: "Entities", entities_help: "Show, hide or override discovered entities.", entity_override: "Override", entity_override_help: "Optional replacement entity for this card function.", entity_visibility_help: "Show or hide this entity in the card.", hold_action: "Hold action", icon_animations: "Icon animations", icon_animations_help: "Enable state-aware icon motion when motion is allowed.", icon_color: { action: "Actions", alert: "Alert", eco: "Eco", energy: "Energy", hot: "Hot water", memory: "Memory", ok: "OK", radio: "Radio", safety: "Safety", status: "Status", timer: "Timer", water: "Water", weather: "Weather", wellness: "Wellness" }, icon_color_help: "Optional CSS color, hex value or Home Assistant theme variable.", icon_theme: { _: "Icon theme", custom: "Custom", ha: "Home Assistant", muted: "Muted", state: "State colors", vivid: "Vivid" }, icon_theme_help: "Choose how strongly icons follow state colors and the active Home Assistant theme.", layout_mode: { _: "Layout mode", auto: "Auto", kiosk: "Kiosk", mini: "Mini", panel: "Panel", tablet: "Tablet" }, layout_mode_help: "Adjust masonry-like section flow for mobile, tablet, panel and kiosk dashboards.", legacy_entity_detected: "Legacy entity anchor detected: {entity}.", legacy_entity_migrated_to_device: "Migrated to device {device}.", legacy_entity_migrated_to_override: "Using a temporary water-heating override until a device can be selected.", name: "Name", name_help: "Optional card title shown in the card header.", navigation_path: "Navigation path", navigation_path_help: "Dashboard path opened by a navigate action.", optional_missing: "Optional missing entities", optional_missing_help: "Show optional controls even when their entity is missing.", overview_columns: "Overview columns", overview_columns_help: "Default overview tile columns for normal-width cards.", overview_entities: "Overview tiles", overview_entities_help: "Select overview tiles and drag selected entries into the display order.", overview_entity_visibility_help: "Include this entity in the overview tiles.", section_visibility_help: "Show this section and make it available for ordering.", sections: "Sections", sections_help: "Choose visible sections and drag them into the card order.", selected_overview_entities: "Selected tiles", service: "Service", service_data: "Service data JSON", service_data_help: "Optional JSON object passed as service data.", service_help: "Home Assistant service or perform-action name.", service_target_area: "Service target area IDs", service_target_area_help: "Comma-separated area IDs for the service target.", service_target_device: "Service target device IDs", service_target_device_help: "Comma-separated device IDs for the service target.", service_target_entity: "Service target entity", service_target_entity_help: "Entity ID used as the service target.", support_mode: "Diagnostics & support mode", support_mode_help: "Shows support tools for issue reports, entity audits and local compatibility checks.", tap_action: "Tap action", tile_size: { _: "Tile size", auto: "Auto", compact: "Compact", large: "Large", normal: "Normal" }, tile_size_help: "Controls dynamic overview and display tile sizing.", unavailable: "Unavailable entities", unavailable_help: "Show entities even when Home Assistant reports unavailable or unknown.", url_path: "URL path", url_path_help: "URL opened by a URL action.", weather_services: "Weather services", weather_services_help: "Show weather helper service controls." }, entity: { memory: "Memory {slot}", memory_delete: "Delete memory {slot}", memory_name: "Memory {slot} name", memory_temperature: "Memory {slot} temperature" }, error: { action_failed: "Action failed: {message}" }, field: { country_id: "Country ID", location_id: "Location ID", name: "Name", result: "Result" }, label: { current: "Current {value}°", memory: "Memory {slot}", target: "Target" }, overview: { delta: "{value}", group: { bath: "Bath", control: "Control", energy: "Energy", saving: "Saving", status: "Status", temperature: "Temp", timer: "Timer", water: "Water" }, trend: { down: "Down", flat: "Flat", up: "Up" } }, overview_short: { bath_fill_remaining_volume: "Bath left", device_status: "Device", energy_consumption_total: "Energy", error_status: "Error", inlet_temperature: "Inlet", outlet_temperature: "Outlet", power: "Power", water_consumption_total: "Water", water_flow: "Flow" }, section: { actions: "Actions", bath: "Bath fill", consumption: "Consumption", controls: "Controls", diagnostics: "Diagnostics", memory: "Temperature memories", overview: "Overview", radio: "Radio", radio_favorites: "Radio favorites", saving: "Saving monitor", support: "Diagnostics & support", timers: "Timers", water_heating: "Water heating", weather: "Weather", wellness: "Wellness programs" }, service: { add_weather_favorite: "Add favorite", remove_weather_favorite: "Remove favorite", search_weather_location: "Search", select_weather_location: "Select location", toggle_weather_favorite: "Toggle favorite" }, state: { loading: "Loading", not_found: "Not found", unavailable: "Unavailable", unknown: "Unknown" }, status: { connection: "Connection {state}", device: "Device {state}", discovered: "Device discovered", select_device: "Select a DHE device", status: "Status {state}" }, support: { check: { active_entities: "Active entities", base_entity: "Base climate entity", custom_element: "Card custom element", device: "Selected device", device_registry: "Device registry", disabled_entities: "Disabled or hidden registry entries", entity_registry: "Entity registry", required_entities: "Required entity coverage", support_export: "Support package export", unavailable_entities: "Unavailable entities" }, compatibility: "Compatibility checker", entity_audit: "Entity audit", entity_status: { available: "Available", missing: "Missing", unavailable: "Unavailable", unknown: "Unknown" }, export: "Export support package", export_hint: "Creates an anonymized JSON package for GitHub issues.", integration_diagnostics: "Integration diagnostics", registry_status: { disabled: "Disabled", enabled: "Enabled", hidden: "Hidden", unknown: "Unknown" }, self_test: "Self-test", self_test_failed: "Failed checks", self_test_pass: "All checks passed", self_test_warn: "Warnings", stat: { available: "Available", base_entity: "Base entity", config_entry: "Config entry", device: "Device", mapped: "Mapped", missing_required: "Missing required", registry: "Registry", unavailable: "Unavailable" }, status: { fail: "Fail", pass: "Pass", warn: "Warn" }, value: { no: "No", yes: "Yes" } }, tooltip: { decrease: "Decrease", increase: "Increase", next: "Next", pause: "Pause", play: "Play", previous: "Previous" } }, bn = { bath_fill_active: "Bath fill", bath_fill_current_volume: "Current bath fill volume", bath_fill_remaining_volume: "Bath fill remaining", bath_fill_target_volume: "Bath fill target volume", bluetooth_mac: "Bluetooth MAC", brush_timer_active: "Brush timer", brush_timer_duration: "Brush timer seconds", brush_timer_remaining: "Brush timer remaining", child_safety_active: "Child safety", child_safety_temperature_limit: "Child safety temperature limit", connection_state: "Connection state", controlunit_name: "Device name", device_info: "Device info", device_status: "Device status", disconnect_radio_pairing: "Disconnect radio pairing", eco_flow_limit: "Eco flow limit", eco_mode: "Eco mode", energy_consumption_total: "Total energy consumption", energy_consumption_week: "Energy consumption week", energy_consumption_year: "Energy consumption year", error_status: "Error status", inlet_temperature: "Inlet temperature", last_reconnect_reason: "Last reconnect reason", last_usage_cost: "Last usage cost", last_usage_energy: "Last usage energy", last_usage_time: "Last usage duration", last_usage_water: "Last usage water", next_reconnect_delay: "Next reconnect delay", nominal_power: "Nominal power", odb_actual_water_saving: "Actual water saving", odb_heating_energy: "Total heating energy", odb_hot_water_volume: "Total hot water volume", odb_possible_energy_saving: "Possible energy saving", operating_duration: "Operating duration", outlet_temperature: "Outlet temperature", power: "Current power consumption", product_id: "Product ID", protocol_version: "Protocol version", radio: "Radio", reconnect_count: "Reconnects", repair_pairing: "Repair pairing", reset_brush_timer: "Reset brush timer", reset_shower_timer: "Reset shower timer", saving_monitor_activation_rate: "Saving monitor activation rate", saving_monitor_consumption_co2: "Saving monitor consumption CO2", saving_monitor_consumption_energy: "Saving monitor consumption energy", saving_monitor_consumption_water: "Saving monitor consumption water", saving_monitor_possible_co2: "Saving monitor possible CO2 saving", saving_monitor_possible_cost: "Saving monitor possible cost saving", saving_monitor_possible_energy: "Saving monitor possible energy saving", saving_monitor_possible_water: "Saving monitor possible water saving", saving_monitor_real_co2: "Saving monitor real CO2 saving", saving_monitor_real_cost: "Saving monitor real cost saving", saving_monitor_real_energy: "Saving monitor real energy saving", saving_monitor_real_water: "Saving monitor real water saving", scald_protection_active: "Scald protection active", scald_protection_temperature_limit: "Scald protection temperature limit", shower_timer_active: "Shower timer", shower_timer_duration: "Shower timer seconds", shower_timer_remaining: "Shower timer remaining", unknown: "Unknown", water_consumption_total: "Total water consumption", water_consumption_week: "Water consumption week", water_consumption_year: "Water consumption year", water_flow: "Current water flow", water_heating: "Water heating", weather: "Weather", weather_location: "Weather location", wellness_circulation_support: "Circulation support", wellness_cold_prevention: "Cold prevention", wellness_summer_fitness: "Summer fitness", wellness_winter_refresh: "Winter refresh", wlan_mac: "WLAN MAC" }, wn = {
  ui: yn,
  entity_labels: bn
}, pe = "dhe-connect-card-translations-changed", K = {
  de: Qe(fn),
  en: Qe(wn)
}, yi = {};
K.de.ui, K.en.ui;
K.de.entityLabels, K.en.entityLabels;
const $n = [
  [/^temperature_memory_(\d+)$/, "entity.memory"],
  [/^temperature_memory_(\d+)_name$/, "entity.memory_name"],
  [/^temperature_memory_(\d+)_temperature$/, "entity.memory_temperature"],
  [/^delete_temperature_memory_(\d+)$/, "entity.memory_delete"]
];
function bi(e, t) {
  const i = gt(e);
  i && (yi[i] = Qe(t), Tn(i));
}
function wi(e) {
  for (const [t, i] of Object.entries(e))
    bi(t, i);
}
function kn(e) {
  return pt(e).split("-", 1)[0] || "en";
}
function pt(e) {
  const t = e?.locale?.language ?? (typeof navigator < "u" ? navigator.language : "") ?? "";
  return gt(t) || "en";
}
function d(e, t, i = {}) {
  return On(
    Sn(pt(e), t) ?? t,
    i
  );
}
function A(e, t) {
  return d(t, `section.${e}`);
}
function mt(e, t) {
  for (const [i, r] of $n) {
    const n = e.key.match(i);
    if (n?.[1])
      return d(t, r, { slot: n[1] });
  }
  return En(pt(t), e.key) ?? e.label;
}
function xn(e, t, i) {
  const r = `overview_short.${e.key}`, n = d(t, r);
  return n === r ? i : n;
}
function Sn(e, t) {
  for (const i of $i(e)) {
    const r = i.ui[t];
    if (r)
      return r;
  }
}
function En(e, t) {
  for (const i of $i(e)) {
    const r = i.entityLabels[t];
    if (r)
      return r;
  }
}
function $i(e) {
  const t = [];
  for (const i of An(e)) {
    const r = yi[i];
    r && t.push(r);
    const n = K[i];
    n && !t.includes(n) && t.push(n);
  }
  return t.includes(K.en) || t.push(K.en), t;
}
function An(e) {
  const t = gt(e), i = t.split("-", 1)[0] ?? "";
  return [...new Set([t, i, "en"].filter(Boolean))];
}
function gt(e) {
  return e.trim().toLowerCase().replace(/_/g, "-");
}
function Qe(e) {
  const t = Ae(e) ? e : {};
  return {
    ui: ki(Ae(t.ui) ? t.ui : {}),
    entityLabels: Cn(t.entity_labels)
  };
}
function ki(e, t = "") {
  const i = {};
  for (const [r, n] of Object.entries(e)) {
    const o = r === "_" ? t : t ? `${t}.${r}` : r;
    if (typeof n == "string") {
      o && (i[o] = n);
      continue;
    }
    Ae(n) && Object.assign(i, ki(n, o));
  }
  return i;
}
function Cn(e) {
  if (!Ae(e))
    return {};
  const t = {};
  for (const [i, r] of Object.entries(e))
    typeof r == "string" && (t[i] = r);
  return t;
}
function Tn(e) {
  typeof window > "u" || window.dispatchEvent(
    new CustomEvent(pe, {
      detail: { language: e }
    })
  );
}
function Ae(e) {
  return !!(e && typeof e == "object" && !Array.isArray(e));
}
function On(e, t) {
  return e.replace(
    /\{([a-z_]+)\}/g,
    (i, r) => Object.prototype.hasOwnProperty.call(t, r) ? String(t[r]) : i
  );
}
const Dn = /* @__PURE__ */ new Set(["unavailable"]), xi = /^(?:(?:stiebel(?:\s+eltron)?|stiebel-eltron)\s+)?dhe[\s_-]*connect\b/i, Nn = /^(?:\s*(?:card|integration|durchlauferhitzer|water\s+heater))?(?:\s*[-:–—/|]\s*|\s+|$)/i;
function w(e, t = "") {
  const i = Ce(e);
  if (!i)
    return t.trim();
  const r = Ht(i);
  if (r)
    return r;
  const n = Ce(t);
  return !n || n === i ? "" : Ht(n) || n;
}
function In(e) {
  const t = Ce(e);
  return !!(t && xi.test(t));
}
function Ht(e) {
  let t = Ce(e);
  if (!t)
    return "";
  for (let i = 0; i < 4; i += 1) {
    const r = t.replace(xi, "");
    if (r === t)
      break;
    t = r.replace(Nn, "").trim();
  }
  return Si(t);
}
function fe(e, t, i) {
  const r = mt(e, i).trim(), n = Bn(i, t) ?? t?.attributes.friendly_name, o = w(n, r) || r;
  return kn(i) === "de" && In(n) && zn(e, o) ? r : o;
}
function C(e, t) {
  if (!t)
    return d(e, "state.not_found");
  const i = e.formatEntityState?.(t);
  if (i)
    return w(i) || d(e, "state.unknown");
  const r = Ln(e, t.state);
  if (r)
    return r;
  const n = w(t.state) || d(e, "state.unknown"), o = t.attributes.unit_of_measurement;
  return typeof o == "string" && !Dn.has(t.state) ? `${n} ${o}` : n;
}
function Rn(e, t, i, r) {
  const n = fe(t, i, r);
  return typeof e == "string" && e.trim() && w(e, n) || n;
}
function Bn(e, t) {
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
function Si(e) {
  return e.replace(/\s+/g, " ").trim();
}
function Ce(e) {
  return typeof e == "string" ? Si(e) : "";
}
function zn(e, t) {
  const i = Kt(t), r = Kt(e.label);
  return i === r || r.endsWith(i);
}
function Kt(e) {
  return e.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
function Ln(e, t) {
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
const Ei = /* @__PURE__ */ new Set(["unavailable"]), Pn = /* @__PURE__ */ new Set(["heat", "heating", "on"]), Mn = /* @__PURE__ */ new Set(["heating", "preheating"]);
function Ie(e) {
  return e.includes(".") ? e.split(".").slice(1).join(".") : e;
}
function ce(e) {
  return e.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
function _t(e, t) {
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
function z(e) {
  return !e || Ei.has(e.state);
}
function Re(e) {
  if (!e || z(e))
    return !1;
  const t = e.attributes.hvac_action;
  return typeof t == "string" ? Mn.has(t.toLowerCase()) : Pn.has(e.state.toLowerCase());
}
function B(e) {
  if (!(!e || Ei.has(e.state)))
    return Be(e.state);
}
function $(e, t) {
  return Be(e?.attributes[t]);
}
function Be(e) {
  if (typeof e == "number")
    return Number.isFinite(e) ? e : void 0;
  if (typeof e != "string" || !e.trim())
    return;
  const t = Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function me(e) {
  return e?.state === "on" || e?.state === "heat" || e?.state === "playing";
}
function vt(e, t, i) {
  return Math.min(Math.max(e, t), i);
}
function Ai(e, t) {
  if (!Number.isFinite(t) || t <= 0)
    return e;
  const i = Math.max(0, String(t).split(".")[1]?.length ?? 0);
  return Number((Math.round(e / t) * t).toFixed(i));
}
function Ci(e) {
  return [
    e.key,
    e.label,
    ...e.aliases ?? []
  ].map(ce).filter((t, i, r) => !!t && r.indexOf(t) === i);
}
function Ti(e, t, i) {
  const r = Ci(e), n = ce(Ie(t)), o = typeof i?.translation_key == "string" ? ce(i.translation_key) : "", a = typeof i?.unique_id == "string" ? ce(i.unique_id) : "";
  let l = 0;
  return o && r.includes(o) && (l += 80), a && r.some((c) => a === c || a.endsWith(`_${c}`)) && (l += 75), r.some((c) => n === c || n.endsWith(`_${c}`)) && (l += 45), l;
}
function Hn(e, t, i) {
  return Ti(e, t, i) > 0;
}
const ze = "stiebel_dhe_connect";
function Oi(e, t) {
  const i = new Set(t.hide_entities), n = Wn(
    e,
    Ft(t, "water_heating", "climate"),
    "climate",
    t.device_id
  ) ?? Kn(e, t), o = Q(e, n), a = t.device_id ?? o?.device_id ?? void 0, l = n ? Vn(n) : [], c = {};
  for (const m of W) {
    if (i.has(m.key))
      continue;
    const u = Ft(t, m.key, m.domain), f = Di(e, u, m.domain);
    if (f) {
      c[m.key] = f;
      continue;
    }
    if (m.key === "water_heating" && n) {
      c[m.key] = n;
      continue;
    }
    const _ = Fn(
      e,
      m,
      a ?? null,
      l
    );
    _ && (c[m.key] = _);
  }
  const p = o?.config_entry_id ?? Object.values(c).map((m) => Q(e, m)?.config_entry_id).find((m) => typeof m == "string" && m.length > 0);
  return {
    baseEntity: n,
    configEntryId: p,
    deviceId: a ?? void 0,
    entityIds: c,
    definitions: W
  };
}
function Ft(e, t, i) {
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
function Kn(e, t) {
  const i = Object.keys(Le(e)).filter(
    (o) => o.startsWith("climate.") && Ni(e, o) && ft(e, o, t.device_id)
  ), r = t.device_id, n = i.find((o) => {
    const a = Q(e, o);
    return a?.platform === ze && (!r || a.device_id === r);
  });
  return n || i.find((o) => {
    const a = Ie(o);
    return a.includes("dhe") || a.includes("stiebel");
  });
}
function Fn(e, t, i, r) {
  let n;
  for (const o of Object.keys(Le(e))) {
    if (!o.startsWith(`${t.domain}.`) || !Ni(e, o) || !ft(e, o, i))
      continue;
    const a = jn(e, o, t, i, r);
    a <= 0 || (!n || a > n.score || a === n.score && o < n.entityId) && (n = { entityId: o, score: a });
  }
  return n?.entityId;
}
function jn(e, t, i, r, n) {
  const o = Q(e, t), a = Ie(t), l = Ci(i);
  let c = Ti(i, t, o), p = 0;
  o?.platform === ze && (p += 20), r && o?.device_id === r && (p += 50), n.some(
    (u) => l.some((f) => a === `${u}_${f}`)
  ) && (c += 25);
  const m = Un(e, t);
  return typeof m == "string" && l.some((u) => ce(m).includes(u)) && (c += 15), c > 0 ? p + c : 0;
}
function Q(e, t) {
  if (t)
    return e.entities?.[t];
}
function Di(e, t, i) {
  if (!(!t || !Le(e)[t]) && !(i && !t.startsWith(`${i}.`)))
    return t;
}
function Wn(e, t, i, r) {
  const n = Di(e, t, i);
  if (n)
    return ft(e, n, r) ? n : void 0;
}
function ft(e, t, i) {
  if (!i)
    return !0;
  const r = Q(e, t);
  return !r?.device_id || r.device_id === i;
}
function Ni(e, t) {
  const i = Q(e, t);
  return !i?.disabled_by && !i?.hidden_by && i?.hidden !== !0;
}
function Un(e, t) {
  const i = Le(e)[t];
  if (!i || typeof i != "object" || Array.isArray(i))
    return;
  const r = i.attributes;
  if (!(!r || typeof r != "object" || Array.isArray(r)))
    return r.friendly_name;
}
function Le(e) {
  return e.states && typeof e.states == "object" && !Array.isArray(e.states) ? e.states : {};
}
function Vn(e) {
  const t = Ie(e), i = t.split("_").filter(Boolean), r = /* @__PURE__ */ new Set();
  return i.length > 1 && r.add(i.slice(0, -1).join("_")), i.length > 2 && r.add(i.slice(0, -2).join("_")), r.add(t.replace(/_(setpoint|water_heating|durchlauferhitzer)$/, "")), [...r].filter(Boolean);
}
class Ii {
  get(t, i) {
    const r = Yn(t, i);
    if (this._entry?.signature === r)
      return this._entry.discovered;
    const n = Oi(t, i);
    return this._entry = { signature: r, discovered: n }, n;
  }
  clear() {
    this._entry = void 0;
  }
}
function Yn(e, t) {
  return JSON.stringify({
    device_id: t.device_id ?? "",
    hide_entities: t.hide_entities,
    entities: t.entities,
    registry: Gn(e),
    states: qn(e)
  });
}
function Gn(e) {
  return Object.entries(e.entities ?? {}).map(([t, i]) => [
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
function qn(e) {
  const t = e.states && typeof e.states == "object" ? e.states : {};
  return Object.entries(t).map(([i, r]) => [
    i,
    r?.attributes && typeof r.attributes == "object" && !Array.isArray(r.attributes) ? r.attributes.friendly_name ?? "" : ""
  ]).sort(([i], [r]) => String(i).localeCompare(String(r)));
}
const Ri = [
  "more-info",
  "toggle",
  "navigate",
  "url",
  "call-service",
  "none"
];
function Bi(e, t) {
  const i = typeof e?.action == "string" ? e.action : void 0;
  return i === "perform-action" ? "call-service" : zi(i) ? i : t === "tap_action" ? "more-info" : "none";
}
function Zn(e, t) {
  const i = zi(t.action) ? t.action : Bi(t, e);
  if (i === "none")
    return e === "tap_action" ? { action: i } : void 0;
  const r = { action: i };
  return we(t, r, "entity"), i === "navigate" && we(t, r, "navigation_path"), i === "url" && we(t, r, "url_path"), i === "call-service" && (r.action = "perform-action", we(t, r, "perform_action", t.service ?? t.perform_action), Wt(t, r, "target"), Wt(t, r, "data")), r;
}
function jt(e, t) {
  if (!ye(e))
    return "";
  const i = e[t];
  return typeof i == "string" ? i : Array.isArray(i) ? i.filter((r) => typeof r == "string").join(", ") : "";
}
function Jn(e, t, i) {
  const r = ye(e) ? { ...e } : {}, n = eo(i ?? "");
  return n.length ? r[t] = n.length === 1 ? n[0] : n : delete r[t], Object.keys(r).length ? r : void 0;
}
function Xn(e) {
  return ye(e) ? JSON.stringify(e, null, 2) : "";
}
function Qn(e) {
  if (!e.trim())
    return { valid: !0 };
  try {
    const t = JSON.parse(e);
    return ye(t) ? { valid: !0, value: t } : { valid: !1 };
  } catch {
    return { valid: !1 };
  }
}
function we(e, t, i, r = e[i]) {
  const n = r;
  typeof n == "string" && n.trim() && (t[i] = n.trim());
}
function Wt(e, t, i) {
  const r = e[i];
  ye(r) && Object.keys(r).length && (t[i] = { ...r });
}
function eo(e) {
  return e.split(/[\n,]/).map((t) => t.trim()).filter(Boolean);
}
function zi(e) {
  return typeof e == "string" && Ri.includes(e);
}
function ye(e) {
  return !!(e && typeof e == "object" && !Array.isArray(e));
}
function E(e, t) {
  const i = ["editor-foldout", t.className].filter(Boolean).join(" ");
  return s`
    <details class=${i} ?open=${!!t.open}>
      <summary>
        <span class="summary-label">
          <span>${d(e, t.titleKey)}</span>
          ${t.helpKey ? Pi(e, t.helpKey) : ""}
        </span>
        ${t.count !== void 0 ? s`<small>${t.count}</small>` : t.helpKey ? s`<small>${d(e, t.helpKey)}</small>` : ""}
      </summary>
      <div class="editor-foldout-content">${t.content}</div>
    </details>
  `;
}
function x(e, t, i, r, n = "") {
  return s`
    <div class=${["ha-form-row", n].filter(Boolean).join(" ")}>
      ${Li(e, t, i)}
      ${r}
    </div>
  `;
}
function to(e, t, i, r) {
  return s`
    <div class="action-textarea-row">
      ${Li(e, t, i)}
      ${r}
    </div>
  `;
}
function Pe(e, t, i, r, n = {}) {
  const o = n.isLocalizedText ? t : d(e, t), a = n.helpKey ? d(e, n.helpKey) : void 0;
  return s`
    <ha-formfield
      class="switch-formfield"
      .label=${o}
      title=${a ?? o}
      aria-label=${a ?? o}
    >
      <ha-switch
        .checked=${i}
        @click=${io}
        @change=${(c) => {
    c.stopPropagation(), r(c);
  }}
      ></ha-switch>
      <span slot="label" class="switch-formfield-label">${o}</span>
      ${a ? Mi(a, "label") : ""}
    </ha-formfield>
  `;
}
function Li(e, t, i) {
  return s`
    <span class="field-label">
      <span>${d(e, t)}</span>
      ${i ? Pi(e, i) : ""}
    </span>
  `;
}
function Pi(e, t) {
  return Mi(d(e, t));
}
function Mi(e, t) {
  return t ? s`
      <ha-icon
        class="help-icon"
        icon="mdi:help-circle-outline"
        slot=${t}
        title=${e}
        aria-label=${e}
      ></ha-icon>
    ` : s`
    <ha-icon
      class="help-icon"
      icon="mdi:help-circle-outline"
      title=${e}
      aria-label=${e}
    ></ha-icon>
  `;
}
function io(e) {
  e.stopPropagation();
}
function Me(e) {
  return !!(e.currentTarget || e.target).checked;
}
function $e(e) {
  const t = e.target?.value;
  return typeof t == "string" ? t : "";
}
function ke(e) {
  const i = e.detail?.value;
  if (typeof i == "string")
    return i || void 0;
  const r = e.target?.value;
  return typeof r == "string" && r || void 0;
}
function ro(e) {
  return typeof e == "string" ? e : "";
}
const no = {
  device: {
    filter: [{ integration: ze }],
    entity: [{ domain: "climate" }]
  }
}, oo = [
  { key: "show_diagnostics", labelKey: "editor.diagnostics" },
  { key: "show_weather_services", labelKey: "editor.weather_services" },
  { key: "show_icon_animations", labelKey: "editor.icon_animations" },
  { key: "show_display_buttons", labelKey: "editor.display_buttons" },
  { key: "show_support_mode", labelKey: "editor.support_mode" },
  { key: "show_dangerous_actions", labelKey: "editor.dangerous_actions" },
  { key: "show_unavailable", labelKey: "editor.unavailable" },
  { key: "show_optional", labelKey: "editor.optional_missing" }
], ao = [
  {
    key: "layout_mode",
    labelKey: "editor.layout_mode",
    options: vi
  },
  {
    key: "tile_size",
    labelKey: "editor.tile_size",
    options: fi
  },
  {
    key: "icon_theme",
    labelKey: "editor.icon_theme",
    options: gi
  }
];
function so(e) {
  return s`
    <section class="editor-section basic-editor">
      <h3>${d(e.hass, "editor.basic_settings")}</h3>
      <div class="ha-form-list">
        <ha-selector
          class="ha-picker-control"
          .hass=${e.hass}
          .label=${d(e.hass, "editor.device")}
          .helper=${d(e.hass, "editor.device_help")}
          .selector=${no}
          .value=${e.config.device_id ?? ""}
          .required=${!0}
          @value-changed=${e.deviceChanged}
        ></ha-selector>
        ${co(e)}
        ${lo(e)}
        ${x(
    e.hass,
    "editor.name",
    "editor.name_help",
    s`
            <ha-textfield
              .value=${ro(e.config.name)}
              .helper=${d(e.hass, "editor.name_help")}
              helperPersistent
              @input=${e.nameChanged}
            ></ha-textfield>
          `
  )}
      </div>

      <div class="numeric-grid">
        ${uo(e)}
      </div>
      ${E(e.hass, {
    className: "advanced-editor",
    titleKey: "editor.advanced_options",
    helpKey: "editor.advanced_options_help",
    content: s`
          <div class="advanced-selects">
            ${ao.map((t) => ho(e, t))}
          </div>
          ${e.config.icon_theme === "custom" ? po(e) : ""}
          <div class="checks">
            ${oo.map((t) => _o(e, t))}
          </div>
        `
  })}
    </section>
  `;
}
function co(e) {
  const t = !!e.config.device_id, i = t ? e.devicePreviewReady ? "editor.device_preview_ready" : "editor.device_preview_loading" : "editor.device_preview_empty", r = e.devicePreviewLabel || d(
    e.hass,
    t ? "editor.device_preview_selected" : "status.select_device"
  );
  return E(e.hass, {
    className: "device-preview-foldout",
    titleKey: "editor.device_preview",
    helpKey: "editor.device_preview_help",
    count: d(e.hass, i),
    content: s`
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
function lo(e) {
  const t = e.legacyMigration;
  if (!t)
    return "";
  const i = t.migratedDeviceId ? d(e.hass, "editor.legacy_entity_migrated_to_device", {
    device: t.migratedDeviceId
  }) : d(e.hass, "editor.legacy_entity_migrated_to_override");
  return s`
    <div class="migration-warning" role="alert">
      <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
      <span>
        ${d(e.hass, "editor.legacy_entity_detected", {
    entity: t.legacyEntity
  })}
        ${i}
      </span>
    </div>
  `;
}
function uo(e) {
  return x(
    e.hass,
    "editor.overview_columns",
    "editor.overview_columns_help",
    s`
      <ha-textfield
        type="number"
        min="1"
        max="6"
        step="1"
        .value=${String(e.config.overview_columns)}
        .helper=${d(e.hass, "editor.overview_columns_help")}
        helperPersistent
        @input=${e.overviewColumnsChanged}
      ></ha-textfield>
    `
  );
}
function ho(e, t) {
  const i = String(e.config[t.key]);
  return x(
    e.hass,
    t.labelKey,
    `${t.labelKey}_help`,
    s`
      <select
        data-option-key=${t.key}
        .value=${i}
        @change=${(r) => e.selectChanged(t.key, r.target.value)}
      >
        ${t.options.map(
      (r) => s`
            <option value=${r} ?selected=${r === i}>
              ${d(e.hass, `${t.labelKey}.${r}`)}
            </option>
          `
    )}
      </select>
    `
  );
}
function po(e) {
  return s`
    <div class="icon-color-grid">
      ${ht.map((t) => mo(e, t))}
    </div>
  `;
}
function mo(e, t) {
  const i = e.config.icon_colors[t] ?? "";
  return x(
    e.hass,
    `editor.icon_color.${t}`,
    "editor.icon_color_help",
    s`
      <div class="icon-color-control" style=${i ? `--dhe-editor-icon-color: ${i};` : ""}>
        <span class="icon-color-swatch" aria-hidden="true"></span>
        <ha-textfield
          data-icon-color-tone=${t}
          .value=${i}
          .placeholder=${go(t)}
          .helper=${d(e.hass, "editor.icon_color_help")}
          helperPersistent
          @change=${(r) => e.iconColorChanged(t, r)}
        ></ha-textfield>
      </div>
    `,
    "icon-color-row"
  );
}
function go(e) {
  return `var(--dhe-${e}-color)`;
}
function _o(e, t) {
  const i = !!e.config[t.key];
  return Pe(
    e.hass,
    t.labelKey,
    i,
    (r) => e.checkboxChanged(t.key, Me(r)),
    { helpKey: `${t.labelKey}_help` }
  );
}
const vo = { CHILD: 2 }, fo = (e) => (...t) => ({ _$litDirective$: e, values: t });
let yo = class {
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
const { I: bo } = Or, Ut = (e) => e, Vt = () => document.createComment(""), ae = (e, t, i) => {
  const r = e._$AA.parentNode, n = t === void 0 ? e._$AB : t._$AA;
  if (i === void 0) {
    const o = r.insertBefore(Vt(), n), a = r.insertBefore(Vt(), n);
    i = new bo(o, a, e, e.options);
  } else {
    const o = i._$AB.nextSibling, a = i._$AM, l = a !== e;
    if (l) {
      let c;
      i._$AQ?.(e), i._$AM = e, i._$AP !== void 0 && (c = e._$AU) !== a._$AU && i._$AP(c);
    }
    if (o !== n || l) {
      let c = i._$AA;
      for (; c !== o; ) {
        const p = Ut(c).nextSibling;
        Ut(r).insertBefore(c, n), c = p;
      }
    }
  }
  return i;
}, M = (e, t, i = e) => (e._$AI(t, i), e), wo = {}, $o = (e, t = wo) => e._$AH = t, ko = (e) => e._$AH, Ve = (e) => {
  e._$AR(), e._$AA.remove();
};
const Yt = (e, t, i) => {
  const r = /* @__PURE__ */ new Map();
  for (let n = t; n <= i; n++) r.set(e[n], n);
  return r;
}, ge = fo(class extends yo {
  constructor(e) {
    if (super(e), e.type !== vo.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e, t, i) {
    let r;
    i === void 0 ? i = t : t !== void 0 && (r = t);
    const n = [], o = [];
    let a = 0;
    for (const l of e) n[a] = r ? r(l, a) : a, o[a] = i(l, a), a++;
    return { values: o, keys: n };
  }
  render(e, t, i) {
    return this.dt(e, t, i).values;
  }
  update(e, [t, i, r]) {
    const n = ko(e), { values: o, keys: a } = this.dt(t, i, r);
    if (!Array.isArray(n)) return this.ut = a, o;
    const l = this.ut ??= [], c = [];
    let p, m, u = 0, f = n.length - 1, _ = 0, y = o.length - 1;
    for (; u <= f && _ <= y; ) if (n[u] === null) u++;
    else if (n[f] === null) f--;
    else if (l[u] === a[_]) c[_] = M(n[u], o[_]), u++, _++;
    else if (l[f] === a[y]) c[y] = M(n[f], o[y]), f--, y--;
    else if (l[u] === a[y]) c[y] = M(n[u], o[y]), ae(e, c[y + 1], n[u]), u++, y--;
    else if (l[f] === a[_]) c[_] = M(n[f], o[_]), ae(e, n[u], n[f]), f--, _++;
    else if (p === void 0 && (p = Yt(a, _, y), m = Yt(l, u, f)), p.has(l[u])) if (p.has(l[f])) {
      const v = m.get(a[_]), k = v !== void 0 ? n[v] : null;
      if (k === null) {
        const T = ae(e, n[u]);
        M(T, o[_]), c[_] = T;
      } else c[_] = M(k, o[_]), ae(e, n[u], k), n[v] = null;
      _++;
    } else Ve(n[f]), f--;
    else Ve(n[u]), u++;
    for (; _ <= y; ) {
      const v = ae(e, c[y + 1]);
      M(v, o[_]), c[_++] = v;
    }
    for (; u <= f; ) {
      const v = n[u++];
      v !== null && Ve(v);
    }
    return this.ut = a, $o(e, c), j;
  }
}), Hi = "application/x-dhe-connect-section", Ki = "application/x-dhe-connect-overview-entity";
function xo(e) {
  const t = Co(e.sections);
  return s`
    <section class="sections-editor">
      ${E(e.hass, {
    className: "sections-foldout",
    titleKey: "editor.sections",
    helpKey: "editor.sections_help",
    count: e.sections.length,
    content: s`
          <div class="order-list section-order-list">
            ${ge(
      t,
      (i) => i,
      (i) => Ao(e, i)
    )}
          </div>
        `
  })}
    </section>
  `;
}
function So(e) {
  const t = Do(e.activeEntityKeys), i = No(
    e.overviewEntities,
    t
  ), r = new Set(i.map((o) => o.key)), n = t.filter(
    (o) => !r.has(o.key)
  );
  return s`
    <section class="overview-editor">
      ${E(e.hass, {
    className: "overview-foldout",
    titleKey: "editor.overview_entities",
    helpKey: "editor.overview_entities_help",
    count: i.length,
    content: s`
          <div class="overview-entity-groups">
            ${i.length ? E(e.hass, {
      className: "overview-entity-section",
      titleKey: "editor.selected_overview_entities",
      count: i.length,
      content: s`
                    <div class="order-list overview-order-list">
                      ${ge(
        i,
        (o) => o.key,
        (o) => qt(e, o, r)
      )}
                    </div>
                  `
    }) : ""}
            ${n.length ? E(e.hass, {
      className: "overview-entity-section",
      titleKey: "editor.available_overview_entities",
      count: n.length,
      content: s`
                    <div class="overview-entity-grid">
                      ${ge(
        n,
        (o) => o.key,
        (o) => qt(e, o, r)
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
function Gt(e, t, i) {
  return i ? e.includes(t) ? [...e] : [...e, t] : e.filter((r) => r !== t);
}
function Fi(e, t) {
  return e.filter((i) => t.has(i));
}
function et(e, t, i) {
  if (t === i)
    return [...e];
  const r = [...e], n = r.indexOf(t), o = r.indexOf(i);
  if (n < 0 || o < 0)
    return r;
  const [a] = r.splice(n, 1);
  return r.splice(o, 0, a), r;
}
function Eo(e, t, i, r) {
  if (!r)
    return et(e, t, i);
  const n = Fi(e, r), o = et(n, t, i);
  return Io(e, r, o);
}
function Ao(e, t) {
  const i = e.sections.includes(t);
  return s`
    <div
      class="order-row section-order-row"
      data-section-key=${t}
      @dragover=${(r) => Wi(r, i)}
      @drop=${(r) => To(e, t, i, r)}
    >
      <div class="check switch-row">
        ${Pe(
    e.hass,
    A(t, e.hass),
    i,
    (r) => e.toggleSection(t, Me(r)),
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
          title=${d(e.hass, "editor.drag_to_reorder")}
          aria-label=${d(e.hass, "editor.drag_to_reorder")}
          draggable=${i ? "true" : "false"}
          ?disabled=${!i}
          @dragstart=${(r) => ji(r, Hi, t)}
        >
          <ha-icon icon="mdi:drag"></ha-icon>
        </button>
      </div>
    </div>
  `;
}
function qt(e, t, i) {
  const r = i.has(t.key);
  return s`
    <div
      class="overview-entity-toggle"
      data-overview-key=${t.key}
      @dragover=${(n) => Wi(n, r)}
      @drop=${(n) => Oo(e, t.key, r, n)}
    >
      <div class="check switch-row">
        ${Pe(
    e.hass,
    mt(t, e.hass),
    r,
    (n) => e.toggleOverviewEntity(t.key, Me(n)),
    {
      helpKey: "editor.overview_entity_visibility_help",
      isLocalizedText: !0
    }
  )}
      </div>
      ${r ? s`
            <div class="order-actions">
              <button
                class="drag-handle"
                type="button"
                title=${d(e.hass, "editor.drag_to_reorder")}
                aria-label=${d(e.hass, "editor.drag_to_reorder")}
                draggable="true"
                @dragstart=${(n) => ji(n, Ki, t.key)}
              >
                <ha-icon icon="mdi:drag"></ha-icon>
              </button>
            </div>
          ` : ""}
    </div>
  `;
}
function Co(e) {
  const t = new Set(e);
  return [
    ...e,
    ...X.filter((i) => !t.has(i))
  ];
}
function ji(e, t, i) {
  e.dataTransfer?.setData(t, i), e.dataTransfer && (e.dataTransfer.effectAllowed = "move");
}
function Wi(e, t) {
  t && (e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = "move"));
}
function To(e, t, i, r) {
  Ui(
    i,
    r,
    Hi,
    (n) => e.reorderSection(n, t)
  );
}
function Oo(e, t, i, r) {
  Ui(
    i,
    r,
    Ki,
    (n) => e.reorderOverviewEntity(n, t)
  );
}
function Ui(e, t, i, r) {
  if (!e)
    return;
  t.preventDefault();
  const n = t.dataTransfer?.getData(i);
  n && r(n);
}
function Do(e) {
  return e ? W.filter((t) => e.has(t.key)) : W;
}
function No(e, t) {
  if (!e.length || !t.length)
    return [];
  const i = new Map(
    t.map((r) => [r.key, r])
  );
  return e.map((r) => i.get(r)).filter((r) => !!r);
}
function Io(e, t, i) {
  const r = [...i];
  return e.map(
    (n) => t.has(n) ? r.shift() ?? n : n
  );
}
const Ro = ve`
  .editor {
    display: grid;
    gap: 16px;
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
    gap: 8px;
  }

  .actions-editor {
    display: grid;
    gap: 8px;
  }

  .action-list {
    display: grid;
    gap: 8px;
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
    gap: 8px;
  }

  .editor-section {
    padding: 10px;
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
    gap: 8px;
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
    gap: 8px;
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
    gap: 8px;
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
    flex: 0 0 auto;
    color: var(--secondary-text-color);
    --mdc-icon-size: 16px;
  }

  .help-icon:hover {
    color: var(--primary-color);
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
    gap: 8px;
    padding: 8px;
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
    gap: 6px;
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
    gap: 8px;
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
  }`, Zt = /* @__PURE__ */ new Set();
function Vi(e, t) {
  const i = Bo(t);
  if (!i)
    return { config: t };
  const r = zo(t), n = Po(e, i), o = Mo(n?.device_id);
  let a = !1;
  return !r.device_id && o && (r.device_id = o), !r.device_id && Lo(e, i, r) && (r.entities = {
    ...r.entities ?? {},
    water_heating: i
  }, a = !0), {
    config: r,
    legacy: {
      legacyEntity: i,
      migratedDeviceId: r.device_id,
      usedWaterHeatingOverride: a,
      resolved: !!(r.device_id || a || Gi(r))
    }
  };
}
function Yi(e, t) {
  const i = `${e}:${t.legacyEntity}:${t.migratedDeviceId ?? "unresolved"}`;
  if (Zt.has(i))
    return;
  Zt.add(i);
  const r = t.migratedDeviceId ? `device_id ${t.migratedDeviceId}` : t.usedWaterHeatingOverride ? "a temporary water_heating entity override" : "Home Assistant registry metadata", n = t.resolved ? `migrated to ${r}` : `waiting for ${r} before migration can complete`;
  console.warn(
    `DHE Connect Card: legacy card-level entity anchor "${t.legacyEntity}" detected; ${n}. Update the card config to device_id.`
  );
}
function Bo(e) {
  return typeof e.entity == "string" && e.entity.trim() ? e.entity.trim() : void 0;
}
function zo(e) {
  const t = { ...e };
  return delete t.entity, t;
}
function Lo(e, t, i) {
  return Gi(i) ? !1 : !!(e?.states[t] && t.startsWith("climate."));
}
function Gi(e) {
  const t = e.entities;
  if (!t)
    return !1;
  if (typeof t.water_heating == "string" && t.water_heating.trim())
    return !0;
  const i = t.climate;
  return !!(i && typeof i == "object" && !Array.isArray(i) && typeof i.water_heating == "string" && i.water_heating.trim());
}
function Po(e, t) {
  return e?.entities?.[t];
}
function Mo(e) {
  return typeof e == "string" && e.trim() ? e.trim() : void 0;
}
function qi(e, t) {
  if (!t || e.includes("support"))
    return [...e];
  const i = [...e], r = i.indexOf("diagnostics"), n = i.indexOf("actions"), o = r >= 0 ? r + 1 : n >= 0 ? n : i.length;
  return i.splice(o, 0, "support"), i;
}
var Ho = Object.defineProperty, Ko = Object.getOwnPropertyDescriptor, He = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Ko(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (r ? a(t, i, n) : a(n)) || n);
  return r && n && Ho(t, i, n), n;
};
const Fo = [
  { key: "tap_action", labelKey: "editor.tap_action" },
  { key: "hold_action", labelKey: "editor.hold_action" },
  { key: "double_tap_action", labelKey: "editor.double_tap_action" }
];
let ee = class extends q {
  constructor() {
    super(...arguments), this._config = Z({}), this._discoveryCache = new Ii(), this._sourceConfig = {}, this._translationsChanged = () => {
      this.requestUpdate();
    }, this._deviceChanged = (e) => {
      const t = ke(e);
      t && this._updateConfig({ device_id: t });
    }, this._nameChanged = (e) => {
      this._updateConfig({ name: $e(e) || void 0 });
    }, this._overviewColumnsChanged = (e) => {
      const t = e.target, i = Number.parseInt(t.value, 10);
      this._updateConfig({ overview_columns: i });
    };
  }
  setConfig(e) {
    this._sourceConfig = e, this._applyConfigMigration(!1);
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(pe, this._translationsChanged);
  }
  disconnectedCallback() {
    window.removeEventListener(pe, this._translationsChanged), super.disconnectedCallback();
  }
  willUpdate(e) {
    e.has("hass") && this._applyConfigMigration(!0);
  }
  render() {
    const e = this._activeEntityKeys(), t = new Set(this._config.hide_entities), i = this._orderingContext(e);
    return s`
      <div class="editor">
        ${so({
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
        ${xo(i)}
        ${So(i)}
        <section class="actions-editor">
          ${E(this.hass, {
      className: "actions-foldout",
      titleKey: "section.actions",
      helpKey: "editor.actions_help",
      content: s`
              <div class="action-list">
                ${Fo.map((r) => this._actionField(r))}
              </div>
            `
    })}
        </section>
        <section class="entity-editor">
          ${E(this.hass, {
      className: "entities-foldout",
      titleKey: "editor.entities",
      helpKey: "editor.entities_help",
      content: s`
              <div class="entity-section-list">
                ${X.map(
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
      overviewEntities: e ? Fi(this._config.overview_entities, e) : this._config.overview_entities,
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
    const i = dt[e] ?? [];
    if (!i.length)
      return "";
    const r = i.filter((n) => !t.has(n.key)).length;
    return E(this.hass, {
      className: "entity-section",
      titleKey: `section.${e}`,
      count: `${r}/${i.length}`,
      content: s`
        <div class="entity-mapping-list">
          ${i.map(
        (n) => this._entityMappingRow(n, t)
      )}
        </div>
      `
    });
  }
  _entityMappingRow(e, t) {
    const i = t.has(e.key), r = Uo(this._config.entities, e);
    return s`
      <div class="entity-mapping-row" data-entity-key=${e.key}>
        <div class="entity-visible switch-row">
          ${Pe(
      this.hass,
      mt(e, this.hass),
      !i,
      (n) => this._entityVisibilityChanged(e.key, Me(n)),
      {
        helpKey: "editor.entity_visibility_help",
        isLocalizedText: !0
      }
    )}
        </div>
        ${x(
      this.hass,
      "editor.entity_override",
      "editor.entity_override_help",
      s`
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
    const t = this._config[e.key], i = Bi(t, e.key), r = Wo(e.key, t, i);
    return s`
      <details class="editor-foldout action-card" data-action-card-key=${e.key} ?open=${r}>
        <summary>
          <span class="summary-label">
            <span>${d(this.hass, e.labelKey)}</span>
          </span>
          <small>${d(this.hass, `editor.action.${i}`)}</small>
        </summary>
        <div class="action-fields">
          ${x(
      this.hass,
      "editor.action_type",
      "editor.action_type_help",
      s`
              <select
                data-action-key=${e.key}
                .value=${i}
                @change=${(n) => this._actionTypeChanged(e.key, n)}
              >
                ${Ri.map(
        (n) => s`<option value=${n} ?selected=${n === i}>
                      ${d(this.hass, `editor.action.${n}`)}
                    </option>`
      )}
              </select>
            `,
      "action-form-row"
    )}
          ${i !== "none" ? s`
                ${x(
      this.hass,
      "editor.action_entity",
      "editor.action_entity_help",
      s`
                    <ha-entity-picker
                      data-action-key=${e.key}
                      data-action-property="entity"
                      .hass=${this.hass}
                      .value=${typeof t?.entity == "string" ? t.entity : ""}
                      @value-changed=${(n) => this._actionEntityChanged(e.key, n)}
                    ></ha-entity-picker>
                  `,
      "action-form-row"
    )}
              ` : ""}
          ${i === "navigate" ? this._actionTextField(e.key, "navigation_path", "editor.navigation_path") : ""}
          ${i === "url" ? this._actionTextField(e.key, "url_path", "editor.url_path") : ""}
          ${i === "call-service" ? s`
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
    return x(
      this.hass,
      i,
      `${i}_help`,
      s`
        <ha-textfield
          data-action-key=${e}
          data-action-property=${t}
          .value=${typeof n == "string" ? n : ""}
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
    return x(
      this.hass,
      "editor.service_target_entity",
      "editor.service_target_entity_help",
      s`
        <ha-entity-picker
          data-action-key=${e}
          data-action-property="target_entity"
          .hass=${this.hass}
          .value=${jt(t?.target, "entity_id")}
          @value-changed=${(i) => this._actionTargetEntityChanged(e, i)}
        ></ha-entity-picker>
      `,
      "action-form-row"
    );
  }
  _actionTargetTextField(e, t, i) {
    const r = this._config[e];
    return x(
      this.hass,
      i,
      `${i}_help`,
      s`
        <ha-textfield
          data-action-key=${e}
          data-action-property=${`target_${t}`}
          .value=${jt(r?.target, t)}
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
    return to(
      this.hass,
      "editor.service_data",
      "editor.service_data_help",
      s`
        <ha-textarea
          data-action-key=${e}
          data-action-property="data"
          .value=${Xn(t?.data)}
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
        sections: qi(this._config.sections, t)
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
    const i = $e(t), r = { ...this._config.icon_colors };
    i ? r[e] = i : delete r[e], this._updateConfig({ icon_colors: r });
  }
  _entityVisibilityChanged(e, t) {
    const i = new Set(this._config.hide_entities);
    t ? i.delete(e) : i.add(e), this._updateConfig({ hide_entities: [...i] });
  }
  _entityOverrideChanged(e, t) {
    this._updateConfig({
      entities: Vo(
        this._config.entities,
        e,
        ke(t)
      )
    });
  }
  _actionTypeChanged(e, t) {
    const i = t.target;
    this._updateActionConfig(e, { action: i.value });
  }
  _actionEntityChanged(e, t) {
    this._updateActionConfig(e, { entity: ke(t) });
  }
  _actionPropertyChanged(e, t, i) {
    const r = $e(i);
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
    this._updateActionTarget(e, "entity_id", ke(t));
  }
  _actionTargetTextChanged(e, t, i) {
    this._updateActionTarget(e, t, $e(i));
  }
  _updateActionTarget(e, t, i) {
    this._updateActionConfig(e, {
      target: Jn(this._config[e]?.target, t, i)
    });
  }
  _actionDataChanged(e, t) {
    const i = t.target, r = Qn(typeof i.value == "string" ? i.value : "");
    i.classList.toggle("invalid", !r.valid), i.toggleAttribute("aria-invalid", !r.valid), r.valid && this._updateActionConfig(e, { data: r.value });
  }
  _updateActionConfig(e, t) {
    const i = this._config[e], r = Zn(e, { ...i, ...t });
    this._updateConfig({ [e]: r });
  }
  _toggleSection(e, t) {
    this._updateConfig({
      sections: Gt(this._config.sections, e, t)
    });
  }
  _reorderSection(e, t) {
    const i = et(this._config.sections, e, t);
    this._updateConfig({ sections: i });
  }
  _overviewEntityChanged(e, t) {
    this._updateConfig({
      overview_entities: Gt(
        this._config.overview_entities,
        e,
        t
      )
    });
  }
  _reorderOverviewEntity(e, t, i) {
    const r = Eo(
      this._config.overview_entities,
      e,
      t,
      i
    );
    this._updateConfig({ overview_entities: r });
  }
  _updateConfig(e) {
    const t = Z({ ...this._config, ...e });
    this._sourceConfig = this._configForDispatch(t), this._config = t, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._sourceConfig },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _applyConfigMigration(e) {
    const t = Vi(this.hass, this._sourceConfig);
    if (this._legacyMigration = t.legacy, this._config = Z(t.config), !t.legacy || (Yi("editor", t.legacy), !e || !t.legacy.resolved))
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
    return !this._legacyMigration || this._legacyMigration.resolved || jo(e) ? (this._legacyMigration = void 0, e) : {
      ...e,
      entity: this._legacyMigration.legacyEntity
    };
  }
};
ee.styles = Ro;
He([
  lt({ attribute: !1 })
], ee.prototype, "hass", 2);
He([
  ie()
], ee.prototype, "_config", 2);
He([
  ie()
], ee.prototype, "_legacyMigration", 2);
ee = He([
  li("dhe-connect-card-editor")
], ee);
function jo(e) {
  if (typeof e.device_id == "string" && e.device_id.trim())
    return !0;
  const t = e.entities?.water_heating;
  if (typeof t == "string" && t.trim())
    return !0;
  const i = e.entities?.climate;
  return !!(i && typeof i == "object" && !Array.isArray(i) && typeof i.water_heating == "string" && i.water_heating.trim());
}
function Wo(e, t, i) {
  if (e !== "tap_action")
    return i !== "none";
  if (!t)
    return !1;
  const r = Object.keys(t);
  return !(t.action === "more-info" && r.length === 1);
}
function Uo(e, t) {
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
function Vo(e, t, i) {
  const r = { ...e }, n = r[t.domain];
  if (n && typeof n == "object" && !Array.isArray(n)) {
    const o = { ...n };
    delete o[t.key], Object.keys(o).length ? r[t.domain] = o : delete r[t.domain];
  }
  return i ? r[t.key] = i : delete r[t.key], r;
}
const Yo = {
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
function Jt(e) {
  return e?.state === "on" ? "turn_off" : "turn_on";
}
async function re(e, t, i, r = {}) {
  const n = t.split(".", 1)[0] ?? "";
  return e.callService(n, i, { entity_id: t, ...r });
}
async function Go(e, t, i, r) {
  if (!Number.isFinite(r))
    return;
  const n = $(i, "min_temp") ?? 20, o = $(i, "max_temp") ?? 60, a = $(i, "target_temp_step") ?? 0.5, l = Ai(vt(r, n, o), a);
  return re(e, t, "set_temperature", { temperature: l });
}
async function Xt(e, t, i, r) {
  const n = $(i, "temperature") ?? B(i) ?? 38;
  return Go(e, t, i, n + r);
}
async function qo(e, t, i, r) {
  const n = Be(r);
  if (n === void 0)
    return;
  const o = $(i, "min"), a = $(i, "max"), l = $(i, "step") ?? 1, c = Ai(
    vt(n, o ?? Number.NEGATIVE_INFINITY, a ?? Number.POSITIVE_INFINITY),
    l
  );
  return re(e, t, "set_value", { value: c });
}
async function Zo(e, t, i) {
  return re(e, t, "set_value", { value: i });
}
async function Jo(e, t, i) {
  return re(e, t, "select_option", { option: i });
}
async function Xo(e, t, i) {
  const r = Be(i);
  if (r === void 0)
    return;
  const n = vt(r, 0, 1);
  return re(e, t, "volume_set", { volume_level: n });
}
async function Qo(e, t, i, r) {
  const n = {}, o = r ? { entry_id: r, ...i } : i, a = Yo[t];
  if (a) {
    for (const [l, c] of Object.entries(o)) {
      if (!a.has(l))
        continue;
      const p = c.trim();
      if (p)
        if (l === "country_id" || l === "result_number") {
          const m = Number(p);
          if (!Number.isFinite(m))
            continue;
          n[l] = m;
        } else
          n[l] = p;
    }
    return e.callService("stiebel_dhe_connect", t, n);
  }
}
class ea {
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
    }, Lt);
    this.pendingTapTimers.set(r, n);
  }
  handleDoubleClick(t, i) {
    t.preventDefault(), t.stopPropagation();
    const r = i.entityId;
    !r || !i.hasDoubleTap || !this.clearPendingTap(r) || i.dispatch(r, "double_tap");
  }
  handlePointerDown(t, i) {
    const r = i.entityId;
    if (!r || !i.hasHold || !ta(t))
      return;
    this.clearPendingHold(), this.clearSuppressedClick();
    const n = window.setTimeout(() => {
      this.clearPendingTap(r), this.suppressedClickEntityId = r, this.pendingHold = void 0, i.dispatch(r, "hold");
    }, Fr);
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
    }, Lt + 100);
  }
  clearSuppressedClick() {
    this.suppressedClickEntityId = void 0, this.clearSuppressedClickResetTimer();
  }
  clearSuppressedClickResetTimer() {
    this.suppressedClickResetTimer !== void 0 && (window.clearTimeout(this.suppressedClickResetTimer), this.suppressedClickResetTimer = void 0);
  }
}
function ta(e) {
  return (!("button" in e) || e.button === 0) && e.isPrimary !== !1;
}
const ia = /* @__PURE__ */ new Set(["error_status", "reconnect_count", "last_reconnect_reason"]), Zi = /* @__PURE__ */ new Set([
  "device_status",
  "device_info",
  "protocol_version",
  "product_id",
  "wlan_mac",
  "bluetooth_mac",
  "connection_state",
  "controlunit_name"
]), ra = /* @__PURE__ */ new Set(["device_status", "connection_state"]), na = /* @__PURE__ */ new Set(["off", "idle", "standby"]), oa = /* @__PURE__ */ new Set(["0", "00:00", "00:00:00"]), aa = /* @__PURE__ */ new Set([
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
]), sa = /* @__PURE__ */ new Set(["false", "off", "unknown", "unbekannt"]), ca = /* @__PURE__ */ new Set([
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
]), la = [
  "error",
  "alarm",
  "fault",
  "fehler",
  "stoerung",
  "störung"
];
function da(e, t, i = !0) {
  const r = ua(e, t, i);
  return [
    "icon-bubble",
    r.tone,
    `motion-${r.motion}`,
    r.animated ? "animated" : "",
    r.active ? "active" : ""
  ].filter(Boolean).join(" ");
}
function ua(e, t, i = !0) {
  const r = ha(e, t), n = ga(e), o = !!(t && !z(t));
  return {
    tone: r,
    motion: n,
    active: !!(t && _a(e, t)),
    animated: o && i && va(e, t)
  };
}
function ha(e, t) {
  const i = e.key;
  if (i === "water_heating" && Re(t))
    return "hot";
  if (yt(e))
    return t && Xi(t.state) ? "alert" : "ok";
  if (ma(e) && t) {
    if (Ke(t.state))
      return "ok";
    if (er(t.state))
      return "alert";
  }
  return i === "outlet_temperature" ? "hot" : pa(e) ? "status" : i.includes("child_safety") || i.includes("scald") || e.icon.includes("shield") ? "safety" : i.includes("wellness") ? "wellness" : i.includes("memory") ? "memory" : i.startsWith("eco_") ? "eco" : i.includes("timer") || i.includes("duration") || i.includes("time") ? "timer" : i.includes("water") || i.includes("bath") || i.includes("flow") || i.includes("temperature") || i === "water_heating" ? "water" : i.includes("energy") || i.includes("power") || i.includes("cost") || i.includes("co2") ? "energy" : i.includes("eco") || i.includes("saving") ? "eco" : e.domain === "weather" || i === "weather_location" ? "weather" : e.domain === "media_player" ? "radio" : e.domain === "button" ? "action" : "water";
}
function yt(e) {
  return ia.has(e.key);
}
function pa(e) {
  return Zi.has(e.key);
}
function ma(e) {
  return ra.has(e.key);
}
function ga(e) {
  const t = e.key;
  return yt(e) ? "alert" : e.domain === "media_player" ? "radio" : t === "outlet_temperature" || t === "water_heating" ? "heat" : t.includes("bath") ? "water-fill" : t === "water_flow" || t.includes("flow") ? "water-flow" : t.includes("energy") || t.includes("power") || t.includes("cost") ? "energy" : t.includes("timer") || t.includes("duration") || t.includes("time") ? "timer" : t.includes("wellness") ? "wellness" : t.startsWith("eco_") || t.includes("saving") ? "eco" : t.includes("memory") ? "memory" : e.domain === "weather" || t === "weather_location" ? "weather" : t.includes("child_safety") || t.includes("scald") || e.icon.includes("shield") ? "safety" : Zi.has(t) ? "status" : "water-flow";
}
function _a(e, t) {
  return e.domain === "switch" ? me(t) : e.domain === "media_player" ? Ji(t) : e.domain === "button" ? !1 : e.domain === "climate" ? Re(t) : !0;
}
function Ji(e) {
  return !na.has(e.state.toLowerCase());
}
function va(e, t) {
  if (!t || z(t) || e.domain === "button")
    return !1;
  if (e.domain === "switch" || e.domain === "binary_sensor")
    return me(t);
  if (e.domain === "media_player")
    return Ji(t);
  if (e.domain === "climate")
    return Re(t);
  if (e.domain === "weather")
    return !0;
  const i = e.key;
  return i === "water_flow" || i === "power" ? (B(t) ?? 0) > 0 : i === "outlet_temperature" || i === "inlet_temperature" ? B(t) !== void 0 : i.includes("timer") || i.includes("duration") || i.includes("time") ? !oa.has(t.state) : i === "device_status" || i === "connection_state" ? Ke(t.state) || er(t.state) : yt(e) ? Xi(t.state) : !1;
}
function Ke(e) {
  const t = bt(e);
  return aa.has(t);
}
function Xi(e) {
  const t = bt(e);
  return !(!t || Ke(t) || Qi(t) || sa.has(t));
}
function Qi(e) {
  const t = Number(e);
  return Number.isFinite(t) && t === 0;
}
function er(e) {
  const t = bt(e);
  if (Ke(t) || Qi(t))
    return !1;
  const i = Number(t);
  return Number.isFinite(i) ? i !== 0 : ca.has(t) || la.some((r) => t.includes(r));
}
function bt(e) {
  return e.trim().toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ");
}
const tr = {
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
function fa(e) {
  return e.layout_mode === "mini" ? 4 : ["panel", "kiosk"].includes(e.layout_mode) ? 10 : e.tile_size === "large" ? 9 : e.tile_size === "normal" ? 7 : 5;
}
function ya(e) {
  return [
    `layout-${e.layout_mode}`,
    `tile-size-${e.tile_size}`
  ].filter(Boolean);
}
function ir(e) {
  const t = tr[e.tile_size], i = ba(e);
  return [
    `--dhe-overview-columns: ${e.overview_columns};`,
    `--dhe-overview-tile-height: ${t.height};`,
    i ? `--dhe-layout-icon-bubble-size: ${i};` : ""
  ].filter(Boolean).join(" ");
}
function ba(e) {
  if (!(e.layout_mode === "mini" && e.tile_size === "auto"))
    return tr[e.tile_size].icon;
}
const wa = /* @__PURE__ */ new Set([
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
]), $a = [
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
], ka = /* @__PURE__ */ new Set(["unavailable", "unknown", "unbekannt"]), rr = [
  "delta",
  "change",
  "change_since_last",
  "difference",
  "last_delta"
], nr = ["change_percent", "delta_percent", "percentage_delta"], xa = [
  "sparkline",
  "history",
  "samples",
  "trend_values",
  "values"
];
function Sa(e, t) {
  return e.config.overview_entities.map((i) => e.entity(t, i)).filter(({ definition: i, state: r }) => e.canRender(i, r)).map(
    ({ definition: i, entityId: r, state: n }) => Ea(e, i, r, n)
  );
}
function Ea(e, t, i, r) {
  const n = fe(t, r, e.hass), o = C(e.hass, r), a = Aa(t), l = Ca(t, r), c = Ta(e.hass, r), p = Oa(e.hass, r, c);
  return {
    key: t.key,
    definition: t,
    entityId: i,
    state: r,
    label: n,
    shortLabel: xn(t, e.hass, n),
    value: o,
    group: a,
    condition: l,
    iconClass: e.iconBubbleClass(t, r),
    trend: p,
    delta: c,
    sparkline: Da(r)
  };
}
function Aa(e) {
  const t = e.key;
  return t.includes("status") || t.includes("connection") || t.includes("reconnect") ? "status" : t.includes("energy") || t.includes("power") || t.includes("cost") || t.includes("co2") ? "energy" : t.includes("temperature") || t === "water_heating" ? "temperature" : t.includes("bath") ? "bath" : t.includes("timer") || t.includes("duration") || t.includes("time") ? "timer" : t.includes("eco") || t.includes("saving") ? "saving" : e.domain === "switch" || e.domain === "button" ? "control" : "water";
}
function Ca(e, t) {
  if (!t)
    return "neutral";
  if (e.key === "error_status" || e.key.includes("alarm"))
    return Qt(t.state) ? "alert" : "ok";
  if (e.key === "device_status" || e.key === "connection_state")
    return Qt(t.state) ? "alert" : or(t.state) ? "ok" : "warning";
  if (e.domain === "switch" || e.domain === "binary_sensor")
    return t.state === "on" ? "active" : "idle";
  const i = B(t);
  return i !== void 0 && ["water_flow", "power"].includes(e.key) ? i > 0 ? "active" : "idle" : "neutral";
}
function Ta(e, t) {
  const i = Te(t, rr), r = Te(t, nr), n = i ?? r;
  if (n === void 0)
    return;
  const o = n > 0 ? "+" : "", a = r !== void 0 && i === void 0 ? "%" : typeof t?.attributes.unit_of_measurement == "string" ? ` ${t.attributes.unit_of_measurement}` : "";
  return d(e, "overview.delta", { value: `${o}${La(n)}${a}` });
}
function Oa(e, t, i) {
  const r = Ia(t) ?? Ra(t);
  if (r)
    return {
      direction: r,
      icon: r === "up" ? "mdi:trending-up" : r === "down" ? "mdi:trending-down" : "mdi:trending-neutral",
      label: i ?? d(e, `overview.trend.${r}`)
    };
}
function Da(e) {
  const t = Na(e, xa);
  if (!(!t || t.length < 2))
    return {
      values: t,
      points: za(t)
    };
}
function Te(e, t) {
  if (e)
    for (const i of t) {
      const r = ar(e.attributes[i]);
      if (r !== void 0)
        return r;
    }
}
function Na(e, t) {
  if (e)
    for (const i of t) {
      const r = Ba(e.attributes[i]);
      if (r?.length)
        return r;
    }
}
function Ia(e) {
  const t = wt(e?.attributes.trend);
  if (t) {
    if (["down", "decreasing", "falling", "sinkend"].includes(t))
      return "down";
    if (["flat", "neutral", "stable", "gleichbleibend"].includes(t))
      return "flat";
    if (["rising", "steigend", "up", "increasing"].includes(t))
      return "up";
  }
}
function Ra(e) {
  const t = Te(e, rr) ?? Te(e, nr);
  if (t !== void 0)
    return t > 0 ? "up" : t < 0 ? "down" : "flat";
}
function Ba(e) {
  if (!Array.isArray(e))
    return;
  const t = e.map((i) => ar(i)).filter((i) => i !== void 0);
  return t.length >= 2 ? t.slice(-18) : void 0;
}
function za(e) {
  const t = Math.min(...e), r = Math.max(...e) - t || 1, n = e.length > 1 ? 100 / (e.length - 1) : 100;
  return e.map((o, a) => {
    const l = Number((a * n).toFixed(2)), c = Number((22 - (o - t) / r * 18).toFixed(2));
    return `${l},${c}`;
  }).join(" ");
}
function or(e) {
  return wa.has(wt(e));
}
function Qt(e) {
  const t = wt(e);
  if (!t)
    return !1;
  if (ka.has(t))
    return !0;
  if (or(t))
    return !1;
  const i = Number(t);
  return Number.isFinite(i) ? i !== 0 : $a.some((r) => t.includes(r));
}
function ar(e) {
  const t = typeof e == "number" ? e : typeof e == "string" ? Number(e) : NaN;
  return Number.isFinite(t) ? t : void 0;
}
function La(e) {
  return Number(e.toFixed(Math.abs(e) < 10 ? 1 : 0)).toString();
}
function wt(e) {
  return typeof e == "string" ? e.trim().toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ") : "";
}
function Pa(e, t) {
  const i = Sa(e, t);
  return i.length ? s`
    <section class="card-section" data-section="overview">
      <div
        class="metric-grid"
        style=${ir(e.config)}
      >
        ${ge(
    i,
    (r) => r.key,
    (r) => Ma(e, r)
  )}
      </div>
    </section>
  ` : h;
}
function Ma(e, t) {
  return s`
    <button
      class=${Ha(t)}
      type="button"
      data-overview-key=${t.key}
      data-overview-group=${t.group}
      data-overview-condition=${t.condition}
      ?disabled=${!t.entityId}
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
      ${t.trend ? s`
            <span class=${`overview-trend trend-${t.trend.direction}`}>
              <ha-icon icon=${t.trend.icon}></ha-icon>
              <span class=${t.delta ? "overview-delta" : ""}>${t.trend.label}</span>
            </span>
          ` : h}
      ${t.sparkline ? s`
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
function Ha(e) {
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
function Ka(e) {
  const t = Array.isArray(e.attributes.source_list) ? e.attributes.source_list.map(String).filter(Boolean) : [], i = Fa(e), r = typeof e.attributes.source == "string" ? e.attributes.source : "", n = t.map((o) => {
    const a = w(o) || o;
    return {
      id: i.find((c) => ja(c, o, a))?.id,
      label: a,
      source: o,
      active: o === r
    };
  });
  return n.length ? ei(n) : ei(
    i.map((o) => ({
      id: o.id,
      label: o.label,
      source: o.source,
      active: o.source === r || o.label === w(r)
    }))
  );
}
function Fa(e) {
  return Array.isArray(e.attributes.favorites) ? e.attributes.favorites.flatMap((t) => {
    if (!t || typeof t != "object")
      return [];
    const i = t, r = i.id ?? i.Id, n = i.name ?? i.Name, o = String(n ?? r ?? "").trim(), a = w(o) || o;
    return a ? [
      {
        id: r === void 0 ? void 0 : String(r),
        label: a,
        source: o
      }
    ] : [];
  }) : [];
}
function ja(e, t, i) {
  if (e.label === i)
    return !0;
  const r = w(t);
  return e.label === r ? !0 : !!(e.id && r.includes(`(${e.id})`));
}
function ei(e) {
  const t = /* @__PURE__ */ new Set();
  return e.filter((i) => {
    const r = `${i.source}:${i.id ?? ""}`;
    return t.has(r) ? !1 : (t.add(r), !0);
  });
}
const Wa = [
  {
    service: "media_previous_track",
    tooltipKey: "tooltip.previous",
    icon: "mdi:skip-previous"
  },
  { service: "media_play", tooltipKey: "tooltip.play", icon: "mdi:play" },
  { service: "media_pause", tooltipKey: "tooltip.pause", icon: "mdi:pause" },
  { service: "media_next_track", tooltipKey: "tooltip.next", icon: "mdi:skip-next" }
];
function Ua(e) {
  const t = Array.isArray(e.state.attributes.source_list) ? e.state.attributes.source_list.map(String) : [], i = typeof e.state.attributes.media_title == "string" && w(e.state.attributes.media_title) || C(e.hass, e.state), r = w(e.state.attributes.source) || w(e.state.state), n = Ka(e.state);
  return s`
    <section class="card-section" data-section="radio">
      <h3>${A("radio", e.hass)}</h3>
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
        ${Wa.map((o) => Va(e, o))}
      </div>
      ${Ya(e, t)}
      ${Ga(e, n)}
    </section>
  `;
}
function Va(e, t) {
  const i = e.serviceBusy(t.service), r = d(e.hass, t.tooltipKey);
  return s`
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
function Ya(e, t) {
  return s`
    <div class="inline-control ${e.sourceBusy || e.volumeBusy ? "busy" : ""}">
      <select
        ?disabled=${e.sourceBusy}
        aria-busy=${String(e.sourceBusy)}
        @change=${e.actions.selectSource}
      >
        ${t.map(
    (i) => s`<option value=${i} ?selected=${i === e.state.attributes.source}>
              ${w(i) || i}
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
        aria-busy=${String(e.volumeBusy)}
        @change=${e.actions.setVolume}
      />
    </div>
  `;
}
function Ga(e, t) {
  return t.length ? s`
    <div class="radio-favorites">
      <h4>${d(e.hass, "section.radio_favorites")}</h4>
      <div class="favorite-list">
        ${t.map(
    (i) => s`
            <button
              class="favorite-row ${i.active ? "active" : ""}"
              type="button"
              title=${i.label}
              aria-label=${i.label}
              ?disabled=${e.sourceBusy}
              aria-busy=${String(e.sourceBusy)}
              @click=${() => e.actions.selectSourceByName(i.source)}
            >
              <div class="favorite-icon"><ha-icon icon="mdi:star"></ha-icon></div>
              <span>${i.label}</span>
              ${i.id ? s`<small>#${i.id}</small>` : h}
            </button>
          `
  )}
      </div>
    </div>
  ` : h;
}
function b(e) {
  return e !== h && e !== null && e !== void 0 && e !== "";
}
class qa {
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
function N(e, t) {
  return `${e}:${t}`;
}
function sr(e) {
  return `weather:${e}`;
}
const Za = "search_weather_location", Ja = [
  { key: "name", labelKey: "field.name" },
  { key: "country_id", labelKey: "field.country_id" },
  { key: "result_number", labelKey: "field.result" },
  { key: "location_id", labelKey: "field.location_id" }
], Xa = {
  name: "",
  country_id: "34",
  result_number: "1",
  location_id: ""
}, Qa = [
  "search_weather_location",
  "add_weather_favorite",
  "remove_weather_favorite",
  "toggle_weather_favorite",
  "select_weather_location"
];
function es(e, t) {
  const i = e.entity(t, "water_heating"), r = tt(e, t, qe), n = tt(e, t, Ze), o = e.config.show_display_buttons ? it(e, t, qe, "controls") : r.length ? s`<div class="rows entity-list">${r}</div>` : h, a = e.config.show_display_buttons ? it(e, t, Ze, "wellness") : n.length ? s`<div class="rows entity-list wellness">${n}</div>` : h, l = i.entityId && i.state ? e.renderClimateControl(i.entityId, i.state) : h;
  return !b(l) && !b(o) && !b(a) ? h : s`
    <section class="card-section" data-section="controls">
      <h3>${d(e.hass, "section.water_heating")}</h3>
      ${l}
      ${o}
      ${b(a) ? s`
            <div class="subsection">
              <h4>${d(e.hass, "section.wellness")}</h4>
              ${a}
            </div>
          ` : h}
    </section>
  `;
}
function ts(e, t) {
  return cr(e, t, "bath", hi);
}
function is(e, t) {
  return cr(e, t, "timers", pi);
}
function rs(e, t) {
  if (e.config.show_display_buttons)
    return ls(e, t);
  const i = U().map((r) => us(e, t, r)).filter(b);
  return i.length ? s`
    <section class="card-section" data-section="memory">
      <h3>${A("memory", e.hass)}</h3>
      <div class="rows memory">${i}</div>
    </section>
  ` : h;
}
function ns(e, t) {
  const i = e.entity(t, "weather"), r = e.entity(t, "weather_location");
  return !e.canRender(i.definition, i.state) && !e.canRender(r.definition, r.state) ? h : s`
    <section class="card-section" data-section="weather">
      <h3>${A("weather", e.hass)}</h3>
      ${_e(e, t, "weather")}
      ${_e(e, t, "weather_location")}
      ${e.config.show_weather_services ? hs(e, t) : h}
    </section>
  `;
}
function os(e, t) {
  const i = mi.map((r) => _e(e, t, r)).filter(b);
  return i.length ? s`
    <section class="card-section" data-section="actions">
      <h3>${A("actions", e.hass)}</h3>
      <div class="rows">${i}</div>
    </section>
  ` : h;
}
function ti(e, t, i) {
  const r = (dt[i] ?? []).map((n) => _e(e, t, n.key)).filter(b);
  return r.length ? s`
    <section class="card-section" data-section=${i}>
      <h3>${A(i, e.hass)}</h3>
      <div class="rows">${r}</div>
    </section>
  ` : h;
}
function cr(e, t, i, r) {
  return e.config.show_display_buttons ? ss(e, A(i, e.hass), t, r, i) : as(e, A(i, e.hass), t, r, i);
}
function as(e, t, i, r, n) {
  const o = tt(e, i, r);
  return o.length ? s`
    <section class="card-section" data-section=${n}>
      <h3>${t}</h3>
      <div class="rows">${o}</div>
    </section>
  ` : h;
}
function ss(e, t, i, r, n) {
  const o = it(e, i, r, n);
  return b(o) ? s`
    <section class="card-section" data-section=${n}>
      <h3>${t}</h3>
      ${o}
    </section>
  ` : h;
}
function tt(e, t, i) {
  return i.map((r) => _e(e, t, r)).filter(b);
}
function _e(e, t, i) {
  const r = e.entity(t, i);
  if (!e.canRender(r.definition, r.state))
    return h;
  const n = fe(r.definition, r.state, e.hass), o = C(e.hass, r.state), a = e.renderRowControl(r.definition, r.entityId, r.state), l = e.isEntityBusy(r.entityId), c = `${n}: ${o}`;
  return s`
    <div class="entity-row ${l ? "busy" : ""}" aria-busy=${String(l)}>
      ${$t(
    e,
    r.entityId,
    "entity-main entity-action",
    c,
    s`
          <div class=${e.iconBubbleClass(r.definition, r.state)}>
            <ha-icon icon=${r.definition.icon}></ha-icon>
          </div>
          <div class="main">
            <strong>${n}</strong>
            <span>${o}</span>
          </div>
        `
  )}
      ${b(a) ? s`<div class="row-control">${a}</div>` : h}
    </div>
  `;
}
function it(e, t, i, r) {
  const n = i.map((o) => cs(e, t, o)).filter(b);
  return n.length ? s`<div class="display-button-grid ${r}">${n}</div>` : h;
}
function cs(e, t, i) {
  const r = e.entity(t, i);
  if (!e.canRender(r.definition, r.state))
    return h;
  const n = fe(r.definition, r.state, e.hass), o = C(e.hass, r.state), a = e.renderRowControl(r.definition, r.entityId, r.state), l = r.state ? me(r.state) : !1, c = e.isEntityBusy(r.entityId), p = `${n}: ${o}`;
  return s`
    <div
      class="display-button-tile ${l ? "active" : ""} ${c ? "busy" : ""}"
      data-entity-key=${r.definition.key}
      aria-busy=${String(c)}
    >
      ${$t(
    e,
    r.entityId,
    "display-button-main entity-action",
    p,
    s`
          <div class=${e.iconBubbleClass(r.definition, r.state)}>
            <ha-icon icon=${r.definition.icon}></ha-icon>
          </div>
          <span>${n}</span>
          <strong>${o}</strong>
        `
  )}
      ${b(a) ? s`<div class="display-button-control">${a}</div>` : h}
    </div>
  `;
}
function $t(e, t, i, r, n) {
  return s`
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
function ls(e, t) {
  const i = U().map((r) => ds(e, t, r)).filter(b);
  return i.length ? s`
    <section class="card-section" data-section="memory">
      <h3>${A("memory", e.hass)}</h3>
      <div class="display-button-grid memory-display">${i}</div>
    </section>
  ` : h;
}
function ds(e, t, i) {
  const r = lr(e, t, i);
  if (!dr(e, r))
    return h;
  const { name: n, temp: o, press: a, del: l } = r, c = n.state, p = o.state, m = a.state, u = l.state, f = c && !z(c) ? w(c.state) || d(e.hass, "label.memory", { slot: i }) : d(e.hass, "label.memory", { slot: i }), _ = p ? C(e.hass, p) : C(e.hass, m), y = a.entityId ?? o.entityId ?? n.entityId ?? l.entityId, v = p ? o.definition : a.definition, k = a.entityId, T = l.entityId, je = k ? e.isServiceBusy(k, "press") : !1, be = T ? e.isServiceBusy(T, "press") : !1, O = Oe(
    e,
    a.definition,
    k,
    m,
    "button.apply_memory",
    je,
    "mdi:play"
  ), xt = Oe(
    e,
    l.definition,
    T,
    u,
    "button.delete_memory",
    be,
    "mdi:trash-can-outline",
    !0
  ), St = e.isEntityBusy(y);
  return s`
    <div
      class="display-button-tile memory-display-tile ${St ? "busy" : ""}"
      data-memory-slot=${i}
      aria-busy=${String(St)}
    >
      ${$t(
    e,
    y,
    "display-button-main entity-action",
    `${f}: ${_}`,
    s`
          <div class=${e.iconBubbleClass(v, p ?? m)}>
            <ha-icon icon=${v.icon}></ha-icon>
          </div>
          <span>${f}</span>
          <strong>${_}</strong>
        `
  )}
      ${b(O) || b(xt) ? s`
            <div class="display-button-control memory-display-actions">
              ${O}
              ${xt}
            </div>
          ` : h}
    </div>
  `;
}
function us(e, t, i) {
  const { name: r, temp: n, press: o, del: a } = lr(e, t, i), l = r.entityId, c = r.state, p = n.entityId, m = n.state, u = o.entityId, f = o.state, _ = a.entityId, y = a.state;
  if (!dr(e, { name: r, temp: n, press: o, del: a }))
    return h;
  const v = l ? e.isServiceBusy(l, "set_value") : !1, k = p ? e.isServiceBusy(p, "set_value") : !1, T = u ? e.isServiceBusy(u, "press") : !1, je = _ ? e.isServiceBusy(_, "press") : !1, be = [l, p, u, _].some(
    (O) => e.isEntityBusy(O)
  );
  return s`
    <div class="memory-row ${be ? "busy" : ""}" aria-busy=${String(be)}>
      <div class=${e.iconBubbleClass(n.definition, n.state)}>
        <ha-icon icon=${n.definition.icon}></ha-icon>
      </div>
      <div class="memory-fields">
        ${l && c ? s`<input type="text" .value=${c.state} ?disabled=${v} aria-busy=${String(v)} @change=${(O) => e.setText(l, O)} />` : s`<strong>${d(e.hass, "label.memory", { slot: i })}</strong>`}
        ${p && m ? s`<input
              type="number"
              min=${String(m.attributes.min ?? 20)}
              max=${String(m.attributes.max ?? 60)}
              step=${String(m.attributes.step ?? 0.5)}
              .value=${String(B(m) ?? "")}
              ?disabled=${k}
              aria-busy=${String(k)}
              @change=${(O) => e.setNumber(p, m, O)}
            />` : h}
      </div>
      ${Oe(
    e,
    o.definition,
    u,
    f,
    "button.apply_memory",
    T,
    "mdi:play"
  )}
      ${Oe(
    e,
    a.definition,
    _,
    y,
    "button.delete_memory",
    je,
    "mdi:trash-can-outline",
    !0
  )}
    </div>
  `;
}
function Oe(e, t, i, r, n, o, a, l = !1) {
  if (!i || !r || l && !e.config.show_dangerous_actions)
    return h;
  const c = d(e.hass, n);
  return s`
    <button class=${`icon${l ? " danger" : ""}`} title=${c} aria-label=${c} ?disabled=${o} aria-busy=${String(o)} @click=${() => e.pressButton(t, i)}>
      <ha-icon icon=${a}></ha-icon>
    </button>
  `;
}
function lr(e, t, i) {
  return {
    name: e.entity(t, `temperature_memory_${i}_name`),
    temp: e.entity(t, `temperature_memory_${i}_temperature`),
    press: e.entity(t, `temperature_memory_${i}`),
    del: e.entity(t, `delete_temperature_memory_${i}`)
  };
}
function dr(e, t) {
  return Object.values(t).some(
    (i) => e.canRender(i.definition, i.state)
  );
}
function hs(e, t) {
  const i = e.isActionBusy(sr(e.weatherService));
  return s`
    <div class="service-box ${i ? "busy" : ""}" aria-busy=${String(i)}>
      <select
        .value=${e.weatherService}
        ?disabled=${i}
        aria-busy=${String(i)}
        @change=${(r) => {
    e.setWeatherService(r.target.value);
  }}
      >
        ${Qa.map(
    (r) => s`<option value=${r}>${d(e.hass, `service.${r}`)}</option>`
  )}
      </select>
      ${Ja.map((r) => ps(e, r, i))}
      <button class="chip" ?disabled=${i} aria-busy=${String(i)} @click=${() => e.callWeather(t)}>${d(e.hass, "button.run")}</button>
    </div>
  `;
}
function ps(e, t, i) {
  return s`
    <input
      placeholder=${d(e.hass, t.labelKey)}
      .value=${e.weatherForm[t.key]}
      ?disabled=${i}
      aria-busy=${String(i)}
      @input=${(r) => e.setWeatherFormValue(t.key, r.target.value)}
    />
  `;
}
const ms = {
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
}, gs = {
  fail: "support.status.fail",
  pass: "support.status.pass",
  warn: "support.status.warn"
};
function _s(e) {
  return s`
    <section class="card-section support-section" data-section="support">
      <h3>${d(e.hass, "section.support")}</h3>
      <div class="support-actions">
        <button class="chip" type="button" @click=${e.exportSupportPackage}>
          <ha-icon icon="mdi:package-down"></ha-icon>
          ${d(e.hass, "support.export")}
        </button>
        <span>${d(e.hass, "support.export_hint")}</span>
      </div>
      <div class="support-grid">
        ${vs(e)}
        ${fs(e)}
        ${ys(e)}
        ${bs(e)}
      </div>
    </section>
  `;
}
function vs(e) {
  const t = e.model.summary, i = e.model.checks.filter((n) => n.level === "fail").length, r = e.model.checks.filter((n) => n.level === "warn").length;
  return Fe(
    e,
    "support.self_test",
    "mdi:clipboard-pulse-outline",
    s`
      <div class="support-score ${i ? "fail" : r ? "warn" : "pass"}">
        <strong>${i || r || t.availableEntities}</strong>
        <span>
          ${i ? d(e.hass, "support.self_test_failed") : r ? d(e.hass, "support.self_test_warn") : d(e.hass, "support.self_test_pass")}
        </span>
      </div>
      <dl class="support-stats">
        ${R(e, "support.stat.mapped", t.mappedEntities)}
        ${R(e, "support.stat.available", t.availableEntities)}
        ${R(e, "support.stat.unavailable", t.unavailableEntities)}
        ${R(e, "support.stat.missing_required", t.missingRequiredEntities)}
      </dl>
    `
  );
}
function fs(e) {
  const t = e.model.diagnostics;
  return Fe(
    e,
    "support.integration_diagnostics",
    "mdi:stethoscope",
    s`
      <dl class="support-stats">
        ${R(e, "support.stat.device", t.deviceIdHash ?? "-")}
        ${R(e, "support.stat.config_entry", t.configEntryIdHash ?? "-")}
        ${R(e, "support.stat.base_entity", t.baseEntityHash ?? "-")}
        ${R(
      e,
      "support.stat.registry",
      d(
        e.hass,
        t.entityRegistryAvailable ? "support.value.yes" : "support.value.no"
      )
    )}
      </dl>
      ${Object.keys(t.domains).length ? s`
            <div class="support-domain-list">
              ${Object.entries(t.domains).map(
      ([i, r]) => s`<span>${i}: ${r}</span>`
    )}
            </div>
          ` : h}
    `
  );
}
function ys(e) {
  return Fe(
    e,
    "support.compatibility",
    "mdi:check-decagram-outline",
    s`
      <div class="support-checks">
        ${e.model.checks.map((t) => ws(e, t))}
      </div>
    `
  );
}
function bs(e) {
  return Fe(
    e,
    "support.entity_audit",
    "mdi:format-list-checks",
    s`
      <div class="support-entity-list">
        ${e.model.entities.map((t) => $s(e, t))}
      </div>
    `
  );
}
function Fe(e, t, i, r) {
  return s`
    <article class="support-panel">
      <h4>
        <ha-icon icon=${i}></ha-icon>
        ${d(e.hass, t)}
      </h4>
      ${r}
    </article>
  `;
}
function ws(e, t) {
  return s`
    <div class="support-check ${t.level}">
      <ha-icon icon=${ks(t.level)}></ha-icon>
      <span>${d(e.hass, ms[t.key])}</span>
      <strong>${d(e.hass, gs[t.level])}</strong>
      ${t.value !== void 0 ? s`<small>${t.value}</small>` : h}
    </div>
  `;
}
function $s(e, t) {
  return s`
    <div class="support-entity-row ${t.status}" title=${t.key}>
      <span>${t.key}</span>
      <small>${t.domain}</small>
      <strong>${d(e.hass, `support.entity_status.${t.status}`)}</strong>
      <small>${d(e.hass, `support.registry_status.${t.registryStatus}`)}</small>
    </div>
  `;
}
function R(e, t, i) {
  return s`
    <div>
      <dt>${d(e.hass, t)}</dt>
      <dd>${i}</dd>
    </div>
  `;
}
function ks(e) {
  switch (e) {
    case "pass":
      return "mdi:check-circle-outline";
    case "warn":
      return "mdi:alert-circle-outline";
    case "fail":
      return "mdi:close-circle-outline";
  }
}
function xs(e, t) {
  const i = Ye(e, t.connection);
  if (i)
    return d(e, "status.connection", { state: i });
  const r = Ye(e, t.device);
  if (r)
    return d(e, "status.device", { state: r });
  const n = Ye(e, t.error);
  return n ? d(e, "status.status", { state: n }) : t.hasBaseEntity ? d(e, "status.discovered") : d(e, "status.select_device");
}
function Ye(e, t) {
  if (!(!t || z(t)))
    return w(t.state) || d(e, "state.unknown");
}
const Ss = ve`
  @media (prefers-reduced-motion: reduce), (update: slow) {
    .icon-bubble,
    .icon-bubble::after,
    .icon-bubble ha-icon {
      animation: none !important;
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
`, Es = ve`
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
`, As = ve`
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
    outline: 2px solid var(--primary-color);
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
`, Cs = ve`
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
    will-change: transform, opacity, clip-path;
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
    will-change: transform, filter;
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
`, Ts = [Es, Cs, As, Ss];
function ii(e, t, i) {
  const r = t.device_id ?? i.deviceId, n = new Set(t.hide_entities), o = W.filter(
    (v) => !n.has(v.key)
  ), a = o.map(
    (v) => Rs(e, i, v, r)
  ), l = a.filter((v) => v.entityIdHash).length, c = a.filter((v) => v.status === "available").length, p = a.filter(
    (v) => ["unavailable", "unknown"].includes(v.status)
  ).length, m = a.filter(
    (v) => !v.optional && v.status === "missing"
  ).length, u = a.filter(
    (v) => v.optional && v.status === "missing"
  ).length, f = r ? kt(e, r).filter(
    ([, v]) => !!(v.disabled_by || v.hidden_by || v.hidden)
  ).length : 0, _ = a.filter(
    (v) => v.diagnostic && v.status !== "missing"
  ).length, y = {
    generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    summary: {
      knownEntities: o.length,
      mappedEntities: l,
      availableEntities: c,
      unavailableEntities: p,
      missingRequiredEntities: m,
      missingOptionalEntities: u,
      disabledOrHiddenRegistryEntities: f,
      diagnosticEntities: _
    },
    diagnostics: {
      cardType: t.type,
      deviceIdHash: le(i.deviceId),
      configEntryIdHash: le(i.configEntryId),
      baseEntityHash: le(i.baseEntity),
      selectedDevice: Is(e, t, i),
      entityRegistryAvailable: !!e.entities,
      deviceRegistryAvailable: !!e.devices,
      domains: zs(e, i)
    },
    entities: a,
    checks: []
  };
  return y.checks = Bs(y), y;
}
function Os(e, t) {
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
function Ds(e = /* @__PURE__ */ new Date()) {
  return `dhe-connect-card-support-${e.toISOString().replace(/[:.]/g, "-")}.json`;
}
function Ns(e, t) {
  if (typeof document > "u" || typeof URL > "u" || typeof URL.createObjectURL != "function" || typeof Blob > "u")
    return;
  const i = URL.createObjectURL(new Blob([t], { type: "application/json" })), r = document.createElement("a");
  r.href = i, r.download = e, r.rel = "noopener", r.click(), window.setTimeout(() => URL.revokeObjectURL(i), 0);
}
function Is(e, t, i) {
  const r = t.device_id ?? i.deviceId;
  return r ? e.devices?.[r] ? !0 : kt(e, r).some(
    ([, n]) => n.device_id === r
  ) : !1;
}
function Rs(e, t, i, r) {
  const n = t.entityIds[i.key], o = (n ? [n, e.entities?.[n]] : void 0) ?? Ls(e, r, i), a = o?.[0], l = o?.[1], c = _t(e, n ?? a);
  return {
    key: i.key,
    domain: i.domain,
    optional: !!i.optional,
    diagnostic: !!i.diagnostic,
    dangerous: !!i.dangerous,
    status: Ps(c),
    registryStatus: Ms(l),
    entityIdHash: le(n ?? a),
    registryHash: le(l?.unique_id ?? l?.translation_key)
  };
}
function Bs(e) {
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
      level: Hs() ? "pass" : "warn"
    },
    {
      key: "support_export",
      level: "pass"
    }
  ];
}
function zs(e, t) {
  const i = {};
  for (const r of Object.values(t.entityIds)) {
    if (!_t(e, r))
      continue;
    const n = r.split(".", 1)[0] ?? "unknown";
    i[n] = (i[n] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(i).sort(([r], [n]) => r.localeCompare(n)));
}
function kt(e, t) {
  return Object.entries(e.entities ?? {}).filter(([, i]) => i.platform !== ze ? !1 : !t || i.device_id === t);
}
function Ls(e, t, i) {
  if (t)
    return kt(e, t).find(([r, n]) => r.startsWith(`${i.domain}.`) ? Hn(i, r, n) : !1);
}
function Ps(e) {
  return e ? e.state === "unknown" ? "unknown" : z(e) ? "unavailable" : "available" : "missing";
}
function Ms(e) {
  return e ? e.disabled_by ? "disabled" : e.hidden || e.hidden_by ? "hidden" : "enabled" : "unknown";
}
function Hs() {
  return typeof customElements > "u" || !!customElements.get("dhe-connect-card");
}
function le(e) {
  if (!e)
    return;
  let t = 2166136261;
  for (let i = 0; i < e.length; i += 1)
    t ^= e.charCodeAt(i), t = Math.imul(t, 16777619);
  return `h${(t >>> 0).toString(16).padStart(8, "0")}`;
}
var Ks = Object.defineProperty, Fs = Object.getOwnPropertyDescriptor, ne = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Fs(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (r ? a(t, i, n) : a(n)) || n);
  return r && n && Ks(t, i, n), n;
};
let L = class extends q {
  constructor() {
    super(...arguments), this._sourceConfig = {}, this._config = Z({}), this._weatherService = Za, this._weatherForm = { ...Xa }, this._busyActionKeys = /* @__PURE__ */ new Set(), this._discoveryCache = new Ii(), this._actions = new ea(), this._serviceCalls = new qa((e) => {
      this._busyActionKeys = new Set(e);
    }), this._translationsChanged = () => {
      this.requestUpdate();
    }, this._cancelHoldAction = () => {
      this._actions.handlePointerEnd();
    };
  }
  setConfig(e) {
    const t = ri(this._config);
    this._sourceConfig = e, this._applyConfigMigration(), ri(this._config) !== t && this.requestUpdate();
  }
  getCardSize() {
    return fa(this._config);
  }
  static getConfigElement() {
    return document.createElement("dhe-connect-card-editor");
  }
  static getStubConfig(e) {
    return { type: "custom:dhe-connect-card", device_id: Oi(e, Z({})).deviceId };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(pe, this._translationsChanged);
  }
  disconnectedCallback() {
    window.removeEventListener(pe, this._translationsChanged), this._actions.clear(), this._serviceCalls.clear(), this._discoveryCache.clear(), super.disconnectedCallback();
  }
  render() {
    if (!this.hass)
      return s`<ha-card class="dhe-card">${d(void 0, "state.loading")}</ha-card>`;
    this._applyConfigMigration();
    const e = this._discoverEntities(), t = this._entity(e, "water_heating"), i = t.entityId, r = Rn(
      this._config.name,
      t.definition,
      t.state,
      this.hass
    ), n = this._sectionRenderContext(), o = this._renderableSections(e);
    return s`
      <ha-card class=${this._cardClass()} style=${this._cardStyle()}>
        <header>
          ${this._renderActionButton(
      i,
      "title-block entity-action",
      r,
      s`
              <div class=${this._headerIconClass(t.state)}><ha-icon icon="mdi:water-thermometer"></ha-icon></div>
              <div>
                <h2>${r}</h2>
                <p>${this._statusText(e)}</p>
              </div>
            `
    )}
          ${this._renderHeaderTemperature(t.state, i)}
        </header>
        ${this._errorMessage ? s`<div class="error-banner" role="alert">${this._errorMessage}</div>` : h}

        <div
          class="content-grid"
          style=${`--dhe-section-count: ${o.length};`}
        >
          ${ge(
      o,
      (a) => a,
      (a) => this._renderSection(n, e, a)
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
      ...ya(this._config),
      `icon-theme-${this._config.icon_theme}`
    ].filter(Boolean).join(" ");
  }
  _cardStyle() {
    const e = [ir(this._config)];
    return this._config.icon_theme === "custom" && e.push(Xr(this._config.icon_colors)), e.join(" ");
  }
  _applyConfigMigration() {
    const e = Vi(this.hass, this._sourceConfig);
    this._config = Z(e.config), e.legacy && Yi("card", e.legacy);
  }
  _renderSection(e, t, i) {
    switch (i) {
      case "overview":
        return Pa(e, t);
      case "controls":
        return es(e, t);
      case "bath":
        return ts(e, t);
      case "timers":
        return is(e, t);
      case "memory":
        return rs(e, t);
      case "consumption":
      case "saving":
        return ti(e, t, i);
      case "weather":
        return ns(e, t);
      case "radio":
        return this._renderRadio(t);
      case "diagnostics":
        return this._config.show_diagnostics ? ti(e, t, "diagnostics") : h;
      case "support":
        return this._config.show_support_mode ? _s({
          hass: this.hass,
          model: ii(this.hass, this._config, t),
          exportSupportPackage: () => this._exportSupportPackage(t)
        }) : h;
      case "actions":
        return os(e, t);
      default:
        return h;
    }
  }
  _sectionRenderContext() {
    return {
      hass: this.hass,
      config: this._config,
      weatherService: this._weatherService,
      weatherForm: this._weatherForm,
      entity: (e, t) => this._entity(e, t),
      canRender: (e, t) => this._canRender(e, t),
      iconBubbleClass: (e, t) => this._iconBubbleClass(e, t),
      renderClimateControl: (e, t) => this._climateControl(e, t),
      renderRowControl: (e, t, i) => this._rowControl(e, t, i),
      isActionBusy: (e) => this._isActionBusy(e),
      isServiceBusy: (e, t) => this._isServiceBusy(e, t),
      isEntityBusy: (e) => this._isEntityBusy(e),
      handleTap: (e, t) => this._handleTapAction(e, t),
      handleDoubleTap: (e, t) => this._handleDoubleTapAction(e, t),
      startHold: (e, t) => this._startHoldAction(e, t),
      cancelHold: this._cancelHoldAction,
      pressButton: (e, t) => {
        this._pressButton(e, t);
      },
      setNumber: (e, t, i) => {
        this._setNumber(e, t, i);
      },
      setText: (e, t) => {
        this._setText(e, t);
      },
      callWeather: (e) => {
        this._callWeather(e);
      },
      setWeatherService: (e) => {
        this._weatherService = e;
      },
      setWeatherFormValue: (e, t) => {
        this._weatherForm = {
          ...this._weatherForm,
          [e]: t
        };
      }
    };
  }
  _renderActionButton(e, t, i, r) {
    return s`
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
    const i = $(e, "temperature"), r = $(e, "current_temperature"), n = i !== void 0 ? d(this.hass, "label.target", { value: `${i}°` }) : r !== void 0 ? d(this.hass, "label.current", { value: r }) : C(this.hass, e);
    return s`
      ${this._renderActionButton(
      t,
      "temperature entity-action",
      n,
      s`
          <strong>${i !== void 0 ? `${i}°` : C(this.hass, e)}</strong>
          <span>
            ${r !== void 0 ? d(this.hass, "label.current", { value: r }) : d(this.hass, "label.target")}
          </span>
        `
    )}
    `;
  }
  _renderRadio(e) {
    const t = this._entity(e, "radio"), i = t.entityId, r = t.state;
    return !this._canRender(t.definition, r) || !i || !r ? h : Ua({
      hass: this.hass,
      entityId: i,
      state: r,
      iconClass: this._iconBubbleClass(t.definition, r),
      sourceBusy: this._isServiceBusy(i, "select_source"),
      volumeBusy: this._isServiceBusy(i, "volume_set"),
      mediaBusy: this._isEntityBusy(i),
      serviceBusy: (n) => this._isServiceBusy(i, n),
      actions: {
        tap: (n) => this._handleTapAction(n, i),
        doubleTap: (n) => this._handleDoubleTapAction(n, i),
        startHold: (n) => this._startHoldAction(n, i),
        cancelHold: this._cancelHoldAction,
        callService: (n) => {
          this._call(i, n);
        },
        selectSource: (n) => {
          this._selectMediaSource(i, n);
        },
        selectSourceByName: (n) => {
          this._selectMediaSourceByName(i, n);
        },
        setVolume: (n) => {
          this._setVolume(i, n);
        }
      }
    });
  }
  _renderableSections(e) {
    return qi(
      this._config.sections,
      this._config.show_support_mode
    ).filter(
      (t) => this._sectionHasRenderableContent(e, t)
    );
  }
  _sectionHasRenderableContent(e, t) {
    switch (t) {
      case "overview":
        return this._config.overview_entities.some(
          (i) => this._isEntityRenderable(e, i)
        );
      case "controls": {
        const i = this._entity(e, "water_heating");
        return !!(i.entityId && i.state) || this._hasRenderableEntity(e, [...qe, ...Ze]);
      }
      case "bath":
        return this._hasRenderableEntity(e, hi);
      case "timers":
        return this._hasRenderableEntity(e, pi);
      case "memory":
        return U().some(
          (i) => this._hasRenderableEntity(e, [
            `temperature_memory_${i}_name`,
            `temperature_memory_${i}_temperature`,
            `temperature_memory_${i}`,
            `delete_temperature_memory_${i}`
          ])
        );
      case "consumption":
      case "saving":
      case "diagnostics":
        return t !== "diagnostics" || this._config.show_diagnostics ? e.definitions.some(
          (i) => i.section === t && this._isEntityRenderable(e, i.key)
        ) : !1;
      case "support":
        return this._config.show_support_mode;
      case "weather":
        return this._hasRenderableEntity(e, ["weather", "weather_location"]);
      case "radio":
        return this._isEntityRenderable(e, "radio");
      case "actions":
        return this._hasRenderableEntity(e, mi);
      default:
        return !1;
    }
  }
  _hasRenderableEntity(e, t) {
    return t.some((i) => this._isEntityRenderable(e, i));
  }
  _isEntityRenderable(e, t) {
    const i = this._entity(e, t);
    return this._canRender(i.definition, i.state);
  }
  _climateControl(e, t) {
    const i = $(t, "temperature") ?? B(t) ?? 38, r = $(t, "min_temp") ?? 20, n = $(t, "max_temp") ?? 60, o = $(t, "target_temp_step") ?? 0.5, a = this._isServiceBusy(e, "set_temperature"), l = t.state === "off" ? "turn_on" : "turn_off", c = this._isServiceBusy(e, l), p = this._isEntityBusy(e);
    return s`
      <div class="climate-control ${p ? "busy" : ""}" aria-busy=${String(p)}>
        <button class="icon" title=${d(this.hass, "tooltip.decrease")} aria-label=${d(this.hass, "tooltip.decrease")} ?disabled=${a} aria-busy=${String(a)} @click=${() => this._adjustTemp(e, t, -o)}>
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
            ?disabled=${a}
            aria-busy=${String(a)}
            @change=${(m) => this._setClimateFromInput(e, t, m)}
          />
        </div>
        <button class="icon" title=${d(this.hass, "tooltip.increase")} aria-label=${d(this.hass, "tooltip.increase")} ?disabled=${a} aria-busy=${String(a)} @click=${() => this._adjustTemp(e, t, o)}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
        <button class="chip" ?disabled=${c} aria-busy=${String(c)} @click=${() => this._toggleClimate(e, t)}>
          ${t.state === "off" ? d(this.hass, "button.turn_on") : d(this.hass, "button.turn_off")}
        </button>
      </div>
    `;
  }
  _rowControl(e, t, i) {
    if (!t || !i || z(i))
      return h;
    switch (e.domain) {
      case "switch": {
        const r = Jt(i), n = this._isServiceBusy(t, r);
        return s`
          <button class="chip ${me(i) ? "active" : ""}" ?disabled=${n} aria-busy=${String(n)} @click=${() => this._toggleSwitch(t, i)}>
            ${me(i) ? d(this.hass, "button.on") : d(this.hass, "button.off")}
          </button>
        `;
      }
      case "button": {
        const r = this._isServiceBusy(t, "press");
        return s`
          <button class="chip" ?disabled=${r} aria-busy=${String(r)} @click=${() => this._pressButton(e, t)}>
            ${d(this.hass, "button.press")}
          </button>
        `;
      }
      case "number": {
        const r = this._isServiceBusy(t, "set_value");
        return s`
          <input
            class="number"
            type="number"
            min=${String(i.attributes.min ?? "")}
            max=${String(i.attributes.max ?? "")}
            step=${String(i.attributes.step ?? 1)}
            .value=${String(B(i) ?? "")}
            ?disabled=${r}
            aria-busy=${String(r)}
            @change=${(n) => this._setNumber(t, i, n)}
          />
        `;
      }
      case "select":
        return this._selectControl(t, i);
      case "text": {
        const r = this._isServiceBusy(t, "set_value");
        return s`
          <input
            class="text"
            type="text"
            .value=${i.state}
            ?disabled=${r}
            aria-busy=${String(r)}
            @change=${(n) => this._setText(t, n)}
          />
        `;
      }
      default:
        return h;
    }
  }
  _selectControl(e, t) {
    const i = this._isServiceBusy(e, "select_option"), r = Array.isArray(t.attributes.options) ? t.attributes.options.map(String) : [];
    return r.length ? s`
      <select ?disabled=${i} aria-busy=${String(i)} @change=${(n) => this._selectOption(e, n)}>
        ${r.map(
      (n) => s`<option value=${n} ?selected=${n === t.state}>
              ${w(n) || n}
            </option>`
    )}
      </select>
    ` : h;
  }
  _entity(e, t) {
    const i = di[t] ?? zr, r = e.entityIds[t], n = _t(this.hass, r);
    return { definition: i, entityId: r, state: n };
  }
  _canRender(e, t) {
    return e.dangerous && !this._config.show_dangerous_actions || e.diagnostic && !this._config.show_diagnostics ? !1 : t ? this._config.show_unavailable || !z(t) : this._config.show_optional && !!e.optional;
  }
  _iconBubbleClass(e, t) {
    return da(e, t, this._config.show_icon_animations);
  }
  _headerIconClass(e) {
    const t = Re(e);
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
      hasDoubleTap: Ge(this._config.double_tap_action),
      hasHold: Ge(this._config.hold_action),
      dispatch: (t, i) => this._fireAction(t, i)
    };
  }
  _fireAction(e, t) {
    if (!e)
      return;
    const i = Wr(this._config, t, e);
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
    return this._isActionBusy(N(e, t));
  }
  _isEntityBusy(e) {
    return e ? this._serviceCalls.isEntityBusy(e) : !1;
  }
  _statusText(e) {
    return xs(this.hass, {
      connection: this._entity(e, "connection_state").state,
      device: this._entity(e, "device_status").state,
      error: this._entity(e, "error_status").state,
      hasBaseEntity: !!e.baseEntity
    });
  }
  async _call(e, t) {
    await this._runEntityService(e, t);
  }
  async _toggleClimate(e, t) {
    const i = t.state === "off" ? "turn_on" : "turn_off";
    await this._runEntityService(e, i);
  }
  async _toggleSwitch(e, t) {
    const i = Jt(t);
    await this._runEntityService(e, i);
  }
  async _pressButton(e, t) {
    e.dangerous && !window.confirm(
      d(this.hass, "confirm.run", {
        label: fe(e, void 0, this.hass)
      })
    ) || await this._runEntityService(t, "press");
  }
  async _adjustTemp(e, t, i) {
    await this._runServiceCall(
      N(e, "set_temperature"),
      () => Xt(this.hass, e, t, i)
    );
  }
  async _setClimateFromInput(e, t, i) {
    await this._runServiceCall(
      N(e, "set_temperature"),
      () => Xt(
        this.hass,
        e,
        t,
        Number(i.target.value) - ($(t, "temperature") ?? B(t) ?? 0)
      )
    );
  }
  async _setNumber(e, t, i) {
    await this._runServiceCall(
      N(e, "set_value"),
      () => qo(this.hass, e, t, i.target.value)
    );
  }
  async _setText(e, t) {
    await this._runServiceCall(
      N(e, "set_value"),
      () => Zo(this.hass, e, t.target.value)
    );
  }
  async _selectOption(e, t) {
    await this._runServiceCall(
      N(e, "select_option"),
      () => Jo(this.hass, e, t.target.value)
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
      N(e, t),
      () => re(this.hass, e, t, i)
    );
  }
  async _setVolume(e, t) {
    await this._runServiceCall(
      N(e, "volume_set"),
      () => Xo(this.hass, e, t.target.value)
    );
  }
  async _callWeather(e) {
    await this._runServiceCall(
      sr(this._weatherService),
      () => Qo(
        this.hass,
        this._weatherService,
        this._weatherForm,
        e.configEntryId
      )
    );
  }
  _exportSupportPackage(e) {
    const t = ii(this.hass, this._config, e), i = Os(t, this._config), r = JSON.stringify(i, null, 2);
    this.dispatchEvent(
      new CustomEvent("dhe-connect-support-package", {
        bubbles: !0,
        composed: !0,
        detail: { supportPackage: i, json: r }
      })
    ), Ns(Ds(), r);
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
L.styles = Ts;
ne([
  lt({ attribute: !1 })
], L.prototype, "hass", 2);
ne([
  ie()
], L.prototype, "_weatherService", 2);
ne([
  ie()
], L.prototype, "_weatherForm", 2);
ne([
  ie()
], L.prototype, "_errorMessage", 2);
ne([
  ie()
], L.prototype, "_busyActionKeys", 2);
L = ne([
  li("dhe-connect-card")
], L);
function ri(e) {
  return JSON.stringify(e);
}
window.registerDheConnectCardTranslation = bi;
window.registerDheConnectCardTranslations = wi;
window.dheConnectCardTranslations && wi(window.dheConnectCardTranslations);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "dhe-connect-card",
  name: "DHE Connect Card",
  description: "Mushroom-style card for the Stiebel DHE Connect integration",
  preview: !0
});
//# sourceMappingURL=ha-dhe-connect-card.js.map
