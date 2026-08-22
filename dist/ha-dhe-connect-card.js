//#region node_modules/@lit/reactive-element/css-tag.js
var e = globalThis, t = e.ShadowRoot && (e.ShadyCSS === void 0 || e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, n = Symbol(), r = /* @__PURE__ */ new WeakMap(), i = class {
	constructor(e, t, r) {
		if (this._$cssResult$ = !0, r !== n) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, n = this.t;
		if (t && e === void 0) {
			let t = n !== void 0 && n.length === 1;
			t && (e = r.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && r.set(n, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, a = (e) => new i(typeof e == "string" ? e : e + "", void 0, n), o = (e, ...t) => new i(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, n), s = (n, r) => {
	if (t) n.adoptedStyleSheets = r.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let t of r) {
		let r = document.createElement("style"), i = e.litNonce;
		i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
	}
}, c = t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return a(t);
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: f, getOwnPropertySymbols: p, getPrototypeOf: m } = Object, h = globalThis, g = h.trustedTypes, ee = g ? g.emptyScript : "", te = h.reactiveElementPolyfillSupport, _ = (e, t) => e, v = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? ee : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, ne = (e, t) => !l(e, t), re = {
	attribute: !0,
	type: String,
	converter: v,
	reflect: !1,
	useDefault: !1,
	hasChanged: ne
};
Symbol.metadata ??= Symbol("metadata"), h.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var ie = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = re) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && u(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = d(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? re;
	}
	static _$Ei() {
		if (this.hasOwnProperty(_("elementProperties"))) return;
		let e = m(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(_("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(_("properties"))) {
			let e = this.properties, t = [...f(e), ...p(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(1 / 0).reverse());
			for (let e of n) t.unshift(c(e));
		} else e !== void 0 && t.push(c(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return s(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? v : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? v : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? ne)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
ie.elementStyles = [], ie.shadowRootOptions = { mode: "open" }, ie[_("elementProperties")] = /* @__PURE__ */ new Map(), ie[_("finalized")] = /* @__PURE__ */ new Map(), te?.({ ReactiveElement: ie }), (h.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var ae = globalThis, oe = (e) => e, se = ae.trustedTypes, ce = se ? se.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, le = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, ue = "?" + y, de = `<${ue}>`, b = document, fe = () => b.createComment(""), pe = (e) => e === null || typeof e != "object" && typeof e != "function", me = Array.isArray, he = (e) => me(e) || typeof e?.[Symbol.iterator] == "function", ge = "[ 	\n\f\r]", _e = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ve = /-->/g, ye = />/g, x = RegExp(`>|${ge}(?:([^\\s"'>=/]+)(${ge}*=${ge}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), be = /'/g, xe = /"/g, Se = /^(?:script|style|textarea|title)$/i, S = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), C = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), Ce = /* @__PURE__ */ new WeakMap(), T = b.createTreeWalker(b, 129);
function we(e, t) {
	if (!me(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return ce === void 0 ? t : ce.createHTML(t);
}
var Te = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = _e;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === _e ? c[1] === "!--" ? o = ve : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = x) : (Se.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = x) : o = ye : o === x ? c[0] === ">" ? (o = i ?? _e, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? x : c[3] === "\"" ? xe : be) : o === xe || o === be ? o = x : o === ve || o === ye ? o = _e : (o = x, i = void 0);
		let d = o === x && e[t + 1].startsWith("/>") ? " " : "";
		a += o === _e ? n + de : l >= 0 ? (r.push(s), n.slice(0, l) + le + n.slice(l) + y + d) : n + y + (l === -2 ? t : d);
	}
	return [we(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, Ee = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Te(t, n);
		if (this.el = e.createElement(l, r), T.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = T.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(le)) {
					let t = u[o++], n = i.getAttribute(e).split(y), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Ae : r[1] === "?" ? je : r[1] === "@" ? Me : ke
					}), i.removeAttribute(e);
				} else e.startsWith(y) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (Se.test(i.tagName)) {
					let e = i.textContent.split(y), t = e.length - 1;
					if (t > 0) {
						i.textContent = se ? se.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], fe()), T.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], fe());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === ue) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(y, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += y.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = b.createElement("template");
		return n.innerHTML = e, n;
	}
};
function E(e, t, n = e, r) {
	if (t === C) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = pe(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = E(e, i._$AS(e, t.values), i, r)), t;
}
var De = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? b).importNode(t, !0);
		T.currentNode = r;
		let i = T.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Oe(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Ne(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = T.nextNode(), a++);
		}
		return T.currentNode = b, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Oe = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = E(this, e, t), pe(e) ? e === w || e == null || e === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : e !== this._$AH && e !== C && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? he(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== w && pe(this._$AH) ? this._$AA.nextSibling.data = e : this.T(b.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Ee.createElement(we(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new De(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = Ce.get(e.strings);
		return t === void 0 && Ce.set(e.strings, t = new Ee(e)), t;
	}
	k(t) {
		me(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(fe()), this.O(fe()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = oe(e).nextSibling;
			oe(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, ke = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = w, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = w;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = E(this, e, t, 0), a = !pe(e) || e !== this._$AH && e !== C, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = E(this, r[n + o], t, o), s === C && (s = this._$AH[o]), a ||= !pe(s) || s !== this._$AH[o], s === w ? e = w : e !== w && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Ae = class extends ke {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === w ? void 0 : e;
	}
}, je = class extends ke {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== w);
	}
}, Me = class extends ke {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = E(this, e, t, 0) ?? w) === C) return;
		let n = this._$AH, r = e === w && n !== w || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== w && (n === w || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Ne = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		E(this, e);
	}
}, Pe = {
	M: le,
	P: y,
	A: ue,
	C: 1,
	L: Te,
	R: De,
	D: he,
	V: E,
	I: Oe,
	H: ke,
	N: je,
	U: Me,
	B: Ae,
	F: Ne
}, Fe = ae.litHtmlPolyfillSupport;
Fe?.(Ee, Oe), (ae.litHtmlVersions ??= []).push("3.3.3");
var Ie = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Oe(t.insertBefore(fe(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Le = globalThis, Re = class extends ie {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ie(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return C;
	}
};
Re._$litElement$ = !0, Re.finalized = !0, Le.litElementHydrateSupport?.({ LitElement: Re });
var ze = Le.litElementPolyfillSupport;
ze?.({ LitElement: Re }), (Le.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/custom-element.js
var Be = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, Ve = {
	attribute: !0,
	type: String,
	converter: v,
	reflect: !1,
	hasChanged: ne
}, He = (e = Ve, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
			},
			init(t) {
				return t !== void 0 && this.C(r, void 0, e, t), t;
			}
		};
	}
	if (r === "setter") {
		let { name: r } = n;
		return function(n) {
			let i = this[r];
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function Ue(e) {
	return (t, n) => typeof n == "object" ? He(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function We(e) {
	return Ue({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region node_modules/lit-html/directive.js
var Ge = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, Ke = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), qe = class {
	constructor(e) {}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AT(e, t, n) {
		this._$Ct = e, this._$AM = t, this._$Ci = n;
	}
	_$AS(e, t) {
		return this.update(e, t);
	}
	update(e, t) {
		return this.render(...t);
	}
}, { I: Je } = Pe, Ye = (e) => e, Xe = () => document.createComment(""), Ze = (e, t, n) => {
	let r = e._$AA.parentNode, i = t === void 0 ? e._$AB : t._$AA;
	if (n === void 0) n = new Je(r.insertBefore(Xe(), i), r.insertBefore(Xe(), i), e, e.options);
	else {
		let t = n._$AB.nextSibling, a = n._$AM, o = a !== e;
		if (o) {
			let t;
			n._$AQ?.(e), n._$AM = e, n._$AP !== void 0 && (t = e._$AU) !== a._$AU && n._$AP(t);
		}
		if (t !== i || o) {
			let e = n._$AA;
			for (; e !== t;) {
				let t = Ye(e).nextSibling;
				Ye(r).insertBefore(e, i), e = t;
			}
		}
	}
	return n;
}, D = (e, t, n = e) => (e._$AI(t, n), e), Qe = {}, $e = (e, t = Qe) => e._$AH = t, et = (e) => e._$AH, tt = (e) => {
	e._$AR(), e._$AA.remove();
}, nt = (e, t, n) => {
	let r = /* @__PURE__ */ new Map();
	for (let i = t; i <= n; i++) r.set(e[i], i);
	return r;
}, O = Ke(class extends qe {
	constructor(e) {
		if (super(e), e.type !== Ge.CHILD) throw Error("repeat() can only be used in text expressions");
	}
	dt(e, t, n) {
		let r;
		n === void 0 ? n = t : t !== void 0 && (r = t);
		let i = [], a = [], o = 0;
		for (let t of e) i[o] = r ? r(t, o) : o, a[o] = n(t, o), o++;
		return {
			values: a,
			keys: i
		};
	}
	render(e, t, n) {
		return this.dt(e, t, n).values;
	}
	update(e, [t, n, r]) {
		let i = et(e), { values: a, keys: o } = this.dt(t, n, r);
		if (!Array.isArray(i)) return this.ut = o, a;
		let s = this.ut ??= [], c = [], l, u, d = 0, f = i.length - 1, p = 0, m = a.length - 1;
		for (; d <= f && p <= m;) if (i[d] === null) d++;
		else if (i[f] === null) f--;
		else if (s[d] === o[p]) c[p] = D(i[d], a[p]), d++, p++;
		else if (s[f] === o[m]) c[m] = D(i[f], a[m]), f--, m--;
		else if (s[d] === o[m]) c[m] = D(i[d], a[m]), Ze(e, c[m + 1], i[d]), d++, m--;
		else if (s[f] === o[p]) c[p] = D(i[f], a[p]), Ze(e, i[d], i[f]), f--, p++;
		else if (l === void 0 && (l = nt(o, p, m), u = nt(s, d, f)), l.has(s[d])) {
			if (l.has(s[f])) {
				let t = u.get(o[p]), n = t === void 0 ? null : i[t];
				if (n === null) {
					let t = Ze(e, i[d]);
					D(t, a[p]), c[p] = t;
				} else c[p] = D(n, a[p]), Ze(e, i[d], n), i[t] = null;
				p++;
			} else tt(i[f]), f--;
		} else tt(i[d]), d++;
		for (; p <= m;) {
			let t = Ze(e, c[m + 1]);
			D(t, a[p]), c[p++] = t;
		}
		for (; d <= f;) {
			let e = i[d++];
			e !== null && tt(e);
		}
		return this.ut = o, $e(e, c), C;
	}
}), k = [
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
], rt = {
	key: "unknown",
	domain: "sensor",
	section: "overview",
	label: "Unknown",
	icon: "mdi:help-circle-outline",
	order: 0
}, it = [
	M("water_flow", "overview", "Current water flow", "mdi:waves-arrow-right", 10, !1, [
		"wasserfluss",
		"wasserdurchfluss",
		"aktueller_wasserdurchfluss"
	]),
	M("power", "overview", "Current power consumption", "mdi:flash", 11, !1, [
		"stromverbrauch",
		"aktueller_stromverbrauch",
		"leistungsaufnahme",
		"aktuelle_leistungsaufnahme"
	]),
	M("nominal_power", "diagnostics", "Nominal power", "mdi:flash-outline", 12, !0),
	M("inlet_temperature", "overview", "Inlet temperature", "mdi:thermometer-low", 13, !0, ["zulauftemperatur"]),
	M("outlet_temperature", "overview", "Outlet temperature", "mdi:thermometer-high", 14, !0, ["auslauftemperatur"]),
	M("scald_protection_temperature_limit", "diagnostics", "Scald protection temperature limit", "mdi:thermometer-alert", 15, !0),
	M("device_status", "overview", "Device status", "mdi:state-machine", 16, !0),
	M("protocol_version", "diagnostics", "Protocol version", "mdi:protocol", 17, !0),
	M("water_consumption_week", "consumption", "Water consumption week", "mdi:water", 30),
	M("water_consumption_year", "consumption", "Water consumption year", "mdi:water", 31),
	M("water_consumption_total", "consumption", "Total water consumption", "mdi:water-sync", 32),
	M("odb_hot_water_volume", "consumption", "Total hot water volume", "mdi:water-thermometer", 33, !0),
	M("energy_consumption_week", "consumption", "Energy consumption week", "mdi:lightning-bolt", 34),
	M("energy_consumption_year", "consumption", "Energy consumption year", "mdi:lightning-bolt", 35),
	M("energy_consumption_total", "consumption", "Total energy consumption", "mdi:lightning-bolt-circle", 36),
	M("odb_heating_energy", "consumption", "Total heating energy", "mdi:radiator", 37, !0),
	M("last_usage_water", "consumption", "Last usage water", "mdi:water-check", 38),
	M("last_usage_energy", "consumption", "Last usage energy", "mdi:lightning-bolt", 39),
	M("last_usage_time", "consumption", "Last usage duration", "mdi:timer-outline", 40),
	M("last_usage_cost", "consumption", "Last usage cost", "mdi:cash", 41),
	M("odb_possible_energy_saving", "saving", "Possible energy saving", "mdi:leaf-circle", 50, !0),
	M("odb_actual_water_saving", "saving", "Actual water saving", "mdi:water-percent", 51, !0),
	M("saving_monitor_consumption_water", "saving", "Saving monitor consumption water", "mdi:water", 52),
	M("saving_monitor_consumption_energy", "saving", "Saving monitor consumption energy", "mdi:flash", 53),
	M("saving_monitor_consumption_co2", "saving", "Saving monitor consumption CO2", "mdi:molecule-co2", 54),
	M("saving_monitor_activation_rate", "saving", "Saving monitor activation rate", "mdi:percent", 55),
	M("saving_monitor_possible_water", "saving", "Saving monitor possible water saving", "mdi:water-plus", 56),
	M("saving_monitor_possible_energy", "saving", "Saving monitor possible energy saving", "mdi:lightning-bolt-outline", 57),
	M("saving_monitor_possible_co2", "saving", "Saving monitor possible CO2 saving", "mdi:molecule-co2", 58),
	M("saving_monitor_possible_cost", "saving", "Saving monitor possible cost saving", "mdi:cash-plus", 59),
	M("saving_monitor_real_water", "saving", "Saving monitor real water saving", "mdi:water-check", 60),
	M("saving_monitor_real_energy", "saving", "Saving monitor real energy saving", "mdi:lightning-bolt", 61),
	M("saving_monitor_real_co2", "saving", "Saving monitor real CO2 saving", "mdi:molecule-co2", 62),
	M("saving_monitor_real_cost", "saving", "Saving monitor real cost saving", "mdi:cash-check", 63),
	M("bath_fill_remaining_volume", "bath", "Bath fill remaining", "mdi:bathtub", 70),
	M("bath_fill_current_volume", "bath", "Current bath fill volume", "mdi:bathtub-outline", 71, !0),
	M("brush_timer_remaining", "timers", "Brush timer remaining", "mdi:toothbrush", 80),
	M("shower_timer_remaining", "timers", "Shower timer remaining", "mdi:shower-head", 81),
	M("wellness_runtime_normalized", "diagnostics", "Wellness runtime", "mdi:chart-timeline-variant", 90, !0),
	M("error_status", "overview", "Error status", "mdi:alert-circle-outline", 18),
	M("reconnect_count", "diagnostics", "Reconnects", "mdi:restart", 91),
	M("connection_state", "diagnostics", "Connection state", "mdi:lan-connect", 92, !1, ["verbindungsstatus"]),
	M("last_reconnect_reason", "diagnostics", "Last reconnect reason", "mdi:alert-outline", 93),
	M("next_reconnect_delay", "diagnostics", "Next reconnect delay", "mdi:timer-sand", 94),
	M("device_info", "diagnostics", "Device info", "mdi:information-outline", 95, !0),
	M("product_id", "diagnostics", "Product ID", "mdi:identifier", 96, !0),
	M("wlan_mac", "diagnostics", "WLAN MAC", "mdi:wifi", 97, !0),
	M("bluetooth_mac", "diagnostics", "Bluetooth MAC", "mdi:bluetooth", 98, !0),
	M("operating_duration", "diagnostics", "Operating duration", "mdi:clock-outline", 99, !0)
], at = [
	ft("bath_fill_target_volume", "bath", "Bath fill target volume", "mdi:bathtub", 100),
	ft("child_safety_temperature_limit", "controls", "Child safety temperature limit", "mdi:thermometer-high", 101),
	ft("eco_flow_limit", "controls", "Eco flow limit", "mdi:water-pump", 102),
	ft("brush_timer_duration", "timers", "Brush timer seconds", "mdi:toothbrush", 103),
	ft("shower_timer_duration", "timers", "Shower timer seconds", "mdi:timer-edit", 104),
	...j().map((e) => ft(`temperature_memory_${e}_temperature`, "memory", `Memory ${e} temperature`, dt(e), 120 + e, e > 2))
], ot = [
	N("eco_mode", "controls", "Eco mode", "mdi:leaf", 150),
	N("child_safety_active", "controls", "Child safety", "mdi:thermometer-check", 151),
	N("bath_fill_active", "bath", "Bath fill", "mdi:bathtub", 152),
	N("brush_timer_active", "timers", "Brush timer", "mdi:toothbrush", 153),
	N("shower_timer_active", "timers", "Shower timer", "mdi:shower-head", 154),
	N("wellness_cold_prevention", "controls", "Cold prevention", "mdi:shower", 160),
	N("wellness_winter_pick_me_up", "controls", "Winter pick-me-up", "mdi:snowflake-thermometer", 161),
	N("wellness_summer_fitness", "controls", "Summer fitness", "mdi:weather-sunny", 162),
	N("wellness_circulation_boost", "controls", "Circulation boost", "mdi:heart-pulse", 163)
], st = [
	P("reset_brush_timer", "timers", "Reset brush timer", "mdi:toothbrush", 180, !0),
	P("reset_shower_timer", "timers", "Reset shower timer", "mdi:shower-head", 181, !0),
	P("repair_pairing", "actions", "Repair pairing", "mdi:refresh", 182, !0, !0),
	P("disconnect_radio_pairing", "actions", "Disconnect radio pairing", "mdi:speaker-bluetooth", 183, !0, !0),
	P("bridge_temperature_maximum", "controls", "Bridge maximum temperature (5 min)", "mdi:thermometer-chevron-up", 184),
	...j().map((e) => P(`temperature_memory_${e}`, "memory", `Memory ${e}`, dt(e), 200 + e, e > 2)),
	...j(3).map((e) => P(`delete_temperature_memory_${e}`, "memory", `Delete memory ${e}`, "mdi:trash-can-outline", 230 + e, !0, !0))
], ct = [{
	key: "controlunit_name",
	domain: "text",
	section: "diagnostics",
	label: "Device name",
	icon: "mdi:form-textbox",
	diagnostic: !0,
	order: 90
}, ...j().map((e) => ({
	key: `temperature_memory_${e}_name`,
	domain: "text",
	section: "memory",
	label: `Memory ${e} name`,
	icon: dt(e),
	optional: e > 2,
	order: 260 + e
}))], A = [
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
	...it,
	...at,
	...ot,
	...st,
	...ct,
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
].sort((e, t) => e.order - t.order), lt = Object.fromEntries(A.map((e) => [e.key, e])), ut = Object.fromEntries(k.map((e) => [e, []]));
for (let e of A) ut[e.section].push(e);
function j(e = 1, t = 12) {
	return Array.from({ length: t - e + 1 }, (t, n) => e + n);
}
function dt(e) {
	return e < 10 ? `mdi:numeric-${e}-box-outline` : "mdi:counter";
}
function M(e, t, n, r, i, a = !1, o = []) {
	return {
		key: e,
		domain: "sensor",
		section: t,
		label: n,
		icon: r,
		optional: a,
		diagnostic: t === "diagnostics",
		aliases: o,
		order: i
	};
}
function ft(e, t, n, r, i, a = !1) {
	return {
		key: e,
		domain: "number",
		section: t,
		label: n,
		icon: r,
		optional: a,
		order: i
	};
}
function N(e, t, n, r, i, a = []) {
	return {
		key: e,
		domain: "switch",
		section: t,
		label: n,
		icon: r,
		aliases: a,
		order: i
	};
}
function P(e, t, n, r, i, a = !1, o = !1) {
	return {
		key: e,
		domain: "button",
		section: t,
		label: n,
		icon: r,
		optional: a,
		dangerous: o,
		order: i
	};
}
//#endregion
//#region src/card-actions.ts
var pt = {
	tap: "tap_action",
	hold: "hold_action",
	double_tap: "double_tap_action"
}, mt = { action: "more-info" };
function ht(e) {
	if (!(!e || typeof e != "object" || Array.isArray(e))) return { ...e };
}
function gt(e, t, n) {
	let r = e[pt[t]];
	if (_t(r)) return typeof r.entity == "string" ? { ...r } : {
		...r,
		entity: n
	};
}
function _t(e) {
	return !!(e && e.action !== "none");
}
function vt(e, t, n) {
	let r = gt(e, t, n);
	if (!r) return;
	let i = { entity: typeof r.entity == "string" ? r.entity : n };
	for (let t of [
		"tap",
		"hold",
		"double_tap"
	]) {
		let r = gt(e, t, n);
		r && (i[pt[t]] = r);
	}
	return i;
}
//#endregion
//#region src/entity-groups.ts
var yt = [
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
], xt = [
	"wellness_cold_prevention",
	"wellness_winter_pick_me_up",
	"wellness_summer_fitness",
	"wellness_circulation_boost"
], St = [
	"bath_fill_active",
	"bath_fill_target_volume",
	"bath_fill_remaining_volume",
	"bath_fill_current_volume"
], Ct = [
	"brush_timer_active",
	"brush_timer_duration",
	"brush_timer_remaining",
	"reset_brush_timer",
	"shower_timer_active",
	"shower_timer_duration",
	"shower_timer_remaining",
	"reset_shower_timer"
], wt = ["repair_pairing", "disconnect_radio_pairing"], Tt = [
	"state",
	"ha",
	"muted",
	"vivid",
	"custom"
], Et = [
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
], Dt = new Set(Et), Ot = /^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, kt = /^(?:rgb|rgba|hsl|hsla)\([-+0-9.%\s,/]+\)$/i, At = /^var\(--[a-zA-Z0-9_-]+(?:\s*,\s*(?:#[0-9a-fA-F]{3,8}|[a-zA-Z]+))?\)$/, jt = /^[a-zA-Z]+$/;
function Mt(e) {
	if (!It(e)) return {};
	let t = {};
	for (let [n, r] of Object.entries(e)) {
		if (!Ft(n)) continue;
		let e = Pt(r);
		e && (t[n] = e);
	}
	return t;
}
function Nt(e) {
	return Et.flatMap((t) => {
		let n = e[t];
		return n ? [`--dhe-user-icon-${t}-color: ${n};`] : [];
	}).join(" ");
}
function Pt(e) {
	if (typeof e != "string") return;
	let t = e.trim();
	if (!(!t || t.includes(";") || t.includes("{") || t.includes("}")) && (Ot.test(t) || kt.test(t) || At.test(t) || jt.test(t))) return t;
}
function Ft(e) {
	return Dt.has(e);
}
function It(e) {
	return !!(e && typeof e == "object" && !Array.isArray(e));
}
//#endregion
//#region src/config.ts
var Lt = new Set(k), Rt = new Set(Object.keys(lt)), zt = /* @__PURE__ */ new Set([
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
]), Bt = new Set(Tt), Vt = [
	"auto",
	"mini",
	"tablet",
	"panel",
	"kiosk"
], Ht = [
	"auto",
	"compact",
	"normal",
	"large"
], Ut = new Set(Vt), Wt = new Set(Ht);
function F(e) {
	let t = $t(e) ? e : {};
	return {
		type: "custom:dhe-connect-card",
		device_id: tn(t.device_id),
		name: t.name,
		tap_action: ht(t.tap_action) ?? { ...mt },
		hold_action: ht(t.hold_action),
		double_tap_action: ht(t.double_tap_action),
		show_unavailable: I(t.show_unavailable, !1),
		show_optional: I(t.show_optional, !1),
		show_diagnostics: I(t.show_diagnostics, !0),
		show_dangerous_actions: I(t.show_dangerous_actions, !1),
		show_weather_services: I(t.show_weather_services, !1),
		show_icon_animations: I(t.show_icon_animations, !0),
		show_display_buttons: I(t.show_display_buttons, !1),
		show_support_mode: I(t.show_support_mode, !1),
		icon_theme: nn(t.icon_theme, Bt, "state"),
		icon_colors: Mt(t.icon_colors),
		layout_mode: nn(t.layout_mode, Ut, "auto"),
		tile_size: rn(t.tile_size),
		overview_columns: Jt(t.overview_columns, 3, 1, 6),
		sections: Gt(t.sections),
		overview_entities: Kt(t.overview_entities),
		section_entity_order: qt(t.section_entity_order),
		hide_entities: Yt(t.hide_entities),
		entities: Xt(t.entities)
	};
}
function Gt(e) {
	if (!Array.isArray(e) || !e.length) return [...k];
	let t = [...new Set(e.filter((e) => Lt.has(e)))];
	return t.length ? t : [...k];
}
function Kt(e) {
	return Array.isArray(e) ? Qt(e) : [...yt];
}
function qt(e) {
	if (!$t(e)) return {};
	let t = {};
	for (let [n, r] of Object.entries(e)) {
		if (!Lt.has(n) || !Array.isArray(r)) continue;
		let e = Qt(r).filter((e) => lt[e]?.section === n);
		e.length && (t[n] = e);
	}
	return t;
}
function Jt(e, t, n, r) {
	return typeof e != "number" || !Number.isInteger(e) ? t : Math.min(r, Math.max(n, e));
}
function Yt(e) {
	return Array.isArray(e) ? Qt(e) : [];
}
function Xt(e) {
	if (!$t(e)) return {};
	let t = {};
	for (let [n, r] of Object.entries(e)) {
		let e = Zt(n);
		if (typeof r == "string" && r.trim() && e) {
			t[e] = r.trim();
			continue;
		}
		if (!$t(r) || !en(n)) continue;
		let i = {};
		for (let [e, t] of Object.entries(r)) {
			let n = Zt(e);
			typeof t == "string" && t.trim() && n && (i[n] = t.trim());
		}
		Object.keys(i).length && (t[n] = i);
	}
	return t;
}
function Zt(e) {
	if (typeof e == "string") return Rt.has(e) ? e : void 0;
}
function Qt(e) {
	return [...new Set(e.map((e) => Zt(e)).filter((e) => !!e))];
}
function $t(e) {
	return !!(e && typeof e == "object" && !Array.isArray(e));
}
function en(e) {
	return typeof e == "string" && zt.has(e);
}
function tn(e) {
	return typeof e == "string" && e.trim() ? e.trim() : void 0;
}
function I(e, t) {
	return typeof e == "boolean" ? e : t;
}
function nn(e, t, n) {
	return typeof e == "string" && t.has(e) ? e : n;
}
function rn(e) {
	return typeof e == "string" && Wt.has(e) ? e : "auto";
}
var an = {
	ui: {
		button: {
			apply_memory: "Speicher anwenden",
			delete_memory: "Speicher löschen",
			off: "Aus",
			on: "Ein",
			press: "Ausführen",
			run: "Ausführen",
			turn_off: "Ausschalten",
			turn_on: "Einschalten"
		},
		confirm: { run: "{label} ausführen?" },
		editor: {
			action: {
				"call-service": "Dienst aufrufen",
				"more-info": "Mehr Info",
				navigate: "Navigieren",
				none: "Keine",
				toggle: "Umschalten",
				url: "URL"
			},
			action_entity: "Aktions-Entität",
			action_entity_help: "Optionale Entität für Mehr-Info, Umschalten und ähnliche Aktionen.",
			action_type: "Aktion",
			action_type_help: "Legt fest, was bei dieser Interaktion passiert.",
			actions_help: "Konfiguriert Klick, Halten und Doppelklick.",
			advanced_options: "Erweiterte Optionen",
			advanced_options_help: "Darstellung, Diagnose und optionale Steuerung",
			available_overview_entities: "Verfügbare Kacheln",
			available_section_entities: "Verfügbare Entitäten",
			basic_settings: "Gerät und Darstellung",
			dangerous_actions: "Riskante Aktionen",
			dangerous_actions_help: "Zeigt Aktionen, die Gerätezustand zurücksetzen, löschen oder reparieren können.",
			device: "Gerät",
			device_help: "Pflichtfeld. Wähle das Home-Assistant-Gerät; die Entitäten werden darüber gefunden.",
			device_preview: "Geräte-Vorschau",
			device_preview_empty: "Gerät auswählen",
			device_preview_help: "Eingeklappte Vorschau des ausgewählten Home-Assistant-Geräts und Discovery-Status.",
			device_preview_loading: "Lade Entitäten",
			device_preview_ready: "Bereit",
			device_preview_selected: "DHE-Gerät ausgewählt",
			diagnostics: "Diagnose",
			diagnostics_help: "Zeigt Diagnose- und technische Geräte-Entitäten.",
			display_buttons: "Display-Button-Ansicht",
			display_buttons_help: "Stellt unterstützte Steuerungen als Kacheln ähnlich dem Gerätedisplay dar.",
			double_tap_action: "Doppelklick-Aktion",
			drag_to_reorder: "Zum Sortieren ziehen",
			entities: "Entitäten",
			entities_help: "Gefundene Entitäten anzeigen, ausblenden oder überschreiben.",
			entity_override: "Override",
			entity_override_custom: "Benutzerdefinierte Entitäts-ID",
			entity_override_custom_help: "Nutze dieses Feld, wenn die Ziel-Entität noch nicht in der Liste steht.",
			entity_override_help: "Optionale Ersatz-Entität für diese Kartenfunktion.",
			entity_visibility_help: "Zeigt oder versteckt diese Entität in der Karte.",
			hold_action: "Halten-Aktion",
			icon_animations: "Icon-Animationen",
			icon_animations_help: "Aktiviert zustandsabhängige Icon-Bewegung, wenn Bewegung erlaubt ist.",
			icon_color: {
				action: "Aktionen",
				alert: "Alarm",
				eco: "Eco",
				energy: "Energie",
				hot: "Warmwasser",
				memory: "Speicher",
				ok: "OK",
				radio: "Radio",
				safety: "Sicherheit",
				status: "Status",
				timer: "Timer",
				water: "Wasser",
				weather: "Wetter",
				wellness: "Wellness"
			},
			icon_color_help: "Optionale CSS-Farbe, Hex-Wert oder Home-Assistant-Theme-Variable.",
			icon_theme: {
				_: "Icon-Theme",
				custom: "Eigene Farben",
				ha: "Home Assistant",
				muted: "Ruhig",
				state: "Statusfarben",
				vivid: "Kräftig"
			},
			icon_theme_help: "Legt fest, wie stark Icons Statusfarben und dem aktiven Home-Assistant-Theme folgen.",
			layout_mode: {
				_: "Layoutmodus",
				auto: "Automatisch",
				kiosk: "Kiosk",
				mini: "Mini",
				panel: "Panel",
				tablet: "Tablet"
			},
			layout_mode_help: "Passt den masonry-artigen Abschnittsfluss für Mobile, Tablet, Panel und Kiosk an.",
			name: "Name",
			name_help: "Optionaler Kartentitel für den Kartenkopf.",
			navigation_path: "Navigationspfad",
			navigation_path_help: "Dashboard-Pfad, den eine Navigationsaktion öffnet.",
			optional_missing: "Optionale fehlende Entitäten",
			optional_missing_help: "Zeigt optionale Steuerungen auch dann, wenn ihre Entität fehlt.",
			overview_entities: "Übersicht-Kacheln",
			overview_entities_help: "Wähle Übersicht-Kacheln und ziehe ausgewählte Einträge in die gewünschte Reihenfolge.",
			overview_entity_visibility_help: "Nimmt diese Entität in die Übersicht-Kacheln auf.",
			section_visibility_help: "Zeigt diesen Abschnitt und macht ihn sortierbar.",
			sections: "Abschnitte",
			sections_help: "Wähle sichtbare Abschnitte und ziehe sie in die gewünschte Reihenfolge.",
			selected_overview_entities: "Ausgewählte Kacheln",
			selected_section_entities: "Ausgewählte Entitäten",
			service: "Dienst",
			service_data: "Dienstdaten als JSON",
			service_data_help: "Optionales JSON-Objekt, das als Dienstdaten übergeben wird.",
			service_help: "Home-Assistant-Dienst oder Perform-Action-Name.",
			service_target_area: "Dienst-Zielbereich-IDs",
			service_target_area_help: "Kommagetrennte Bereichs-IDs für das Dienstziel.",
			service_target_device: "Dienst-Zielgeräte-IDs",
			service_target_device_help: "Kommagetrennte Geräte-IDs für das Dienstziel.",
			service_target_entity: "Dienst-Zielentität",
			service_target_entity_help: "Entitäts-ID für das Dienstziel.",
			support_mode: "Diagnose- und Supportmodus",
			support_mode_help: "Zeigt Support-Werkzeuge für GitHub-Issues, Entity-Audits und lokale Kompatibilitätschecks.",
			tap_action: "Klick-Aktion",
			tile_size: {
				_: "Kachelgröße",
				auto: "Automatisch",
				compact: "Kompakt",
				large: "Groß",
				normal: "Normal"
			},
			tile_size_help: "Steuert die dynamische Größe von Übersicht- und Display-Kacheln.",
			unavailable: "Nicht verfügbare Entitäten",
			unavailable_help: "Zeigt Entitäten auch, wenn Home Assistant sie als nicht verfügbar oder unbekannt meldet.",
			url_path: "URL-Pfad",
			url_path_help: "URL, die eine URL-Aktion öffnet.",
			weather_services: "Wetterdienste",
			weather_services_help: "Zeigt Hilfsdienste für die Wetterfunktionen."
		},
		entity: {
			memory: "Speicher {slot}",
			memory_delete: "Speicher {slot} löschen",
			memory_name: "Speicher {slot} Name",
			memory_temperature: "Speicher {slot} Temperatur"
		},
		error: { action_failed: "Aktion fehlgeschlagen: {message}" },
		field: {
			country_id: "Länder-ID",
			location_id: "Standort-ID",
			name: "Name",
			radio_source: "Radioquelle",
			result: "Ergebnis",
			volume: "Lautstärke",
			weather_service: "Wetterdienst"
		},
		label: {
			current: "Aktuell {value}°",
			memory: "Speicher {slot}",
			target: "Ziel"
		},
		overview: {
			delta: "{value}",
			group: {
				bath: "Bad",
				control: "Steuerung",
				energy: "Energie",
				saving: "Sparen",
				status: "Status",
				temperature: "Temp",
				timer: "Timer",
				water: "Wasser"
			},
			trend: {
				down: "Sinkt",
				flat: "Stabil",
				up: "Steigt"
			}
		},
		overview_short: {
			bath_fill_remaining_volume: "Badewanne",
			device_status: "Gerät",
			energy_consumption_total: "Energie",
			error_status: "Fehler",
			inlet_temperature: "Zulauf",
			outlet_temperature: "Auslauf",
			power: "Strom",
			water_consumption_total: "Wasser",
			water_flow: "Durchfluss"
		},
		section: {
			actions: "Aktionen",
			bath: "Badewannenfüllung",
			consumption: "Verbrauch",
			controls: "Steuerung",
			diagnostics: "Diagnose",
			memory: "Temperaturspeicher",
			overview: "Übersicht",
			radio: "Radio",
			radio_favorites: "Radio-Favoriten",
			saving: "Sparmonitor",
			support: "Diagnose & Support",
			timers: "Timer",
			water_heating: "Warmwasser",
			weather: "Wetter",
			wellness: "Wellnessprogramme"
		},
		service: {
			add_weather_favorite: "Favorit hinzufügen",
			remove_weather_favorite: "Favorit entfernen",
			search_weather_location: "Suchen",
			select_weather_location: "Standort auswählen",
			toggle_weather_favorite: "Favorit umschalten"
		},
		state: {
			loading: "Lädt",
			not_found: "Nicht gefunden",
			unavailable: "Nicht verfügbar",
			unknown: "Unbekannt"
		},
		status: {
			connection: "Verbindung {state}",
			device: "Gerät {state}",
			discovered: "Gerät erkannt",
			select_device: "DHE-Gerät auswählen",
			status: "Status {state}"
		},
		support: {
			check: {
				active_entities: "Aktive Entitäten",
				base_entity: "Basis-Klimaentität",
				custom_element: "Karten-Custom-Element",
				device: "Ausgewähltes Gerät",
				device_registry: "Geräte-Registry",
				disabled_entities: "Deaktivierte oder versteckte Registry-Einträge",
				entity_registry: "Entity-Registry",
				required_entities: "Abdeckung der Pflicht-Entitäten",
				support_export: "Support-Paket-Export",
				unavailable_entities: "Nicht verfügbare Entitäten"
			},
			compatibility: "Kompatibilitätscheck",
			compatibility_list: "Kompatibilitätsprüfungen",
			domain_distribution: "Domänenverteilung",
			entity_audit: "Entity-Audit",
			entity_audit_list: "Entity-Audit-Zeilen",
			entity_status: {
				available: "Verfügbar",
				missing: "Fehlt",
				unavailable: "Nicht verfügbar",
				unknown: "Unbekannt"
			},
			export: "Support-Paket exportieren",
			export_hint: "Erstellt ein anonymisiertes JSON-Paket für GitHub-Issues.",
			integration_diagnostics: "Integrationsdiagnose",
			registry_status: {
				disabled: "Deaktiviert",
				enabled: "Aktiviert",
				hidden: "Versteckt",
				unknown: "Unbekannt"
			},
			self_test: "Selbsttest",
			self_test_failed: "Fehlgeschlagene Checks",
			self_test_pass: "Alle Checks bestanden",
			self_test_warn: "Warnungen",
			stat: {
				available: "Verfügbar",
				base_entity: "Basis-Entität",
				config_entry: "Config Entry",
				device: "Gerät",
				mapped: "Zugeordnet",
				missing_required: "Pflicht fehlt",
				registry: "Registry",
				unavailable: "Nicht verfügbar"
			},
			status: {
				fail: "Fehler",
				pass: "OK",
				warn: "Warnung"
			},
			value: {
				no: "Nein",
				yes: "Ja"
			}
		},
		tooltip: {
			decrease: "Verringern",
			increase: "Erhöhen",
			next: "Weiter",
			pause: "Pause",
			play: "Wiedergabe",
			previous: "Zurück"
		}
	},
	entity_labels: {
		bath_fill_active: "Badewannenfüllung",
		bath_fill_current_volume: "Aktuelle Badewannenfüllung",
		bath_fill_remaining_volume: "Restmenge Badewanne",
		bath_fill_target_volume: "Zielmenge Badewanne",
		bluetooth_mac: "Bluetooth-MAC",
		bridge_temperature_maximum: "Maximum überbrücken (5 Min.)",
		brush_timer_active: "Zahnbürsten-Timer",
		brush_timer_duration: "Zahnbürsten-Timer Sekunden",
		brush_timer_remaining: "Zahnbürsten-Timer verbleibend",
		child_safety_active: "Kindersicherung",
		child_safety_temperature_limit: "Temperaturgrenze Kindersicherung",
		connection_state: "Verbindungsstatus",
		controlunit_name: "Gerätename",
		device_info: "Geräteinfo",
		device_status: "Gerätestatus",
		disconnect_radio_pairing: "Radio-Kopplung trennen",
		eco_flow_limit: "Eco-Durchflussgrenze",
		eco_mode: "Eco-Modus",
		energy_consumption_total: "Energieverbrauch gesamt",
		energy_consumption_week: "Energieverbrauch Woche",
		energy_consumption_year: "Energieverbrauch Jahr",
		error_status: "Fehlerstatus",
		inlet_temperature: "Zulauftemperatur",
		last_reconnect_reason: "Letzter Wiederverbindungsgrund",
		last_usage_cost: "Letzte Kosten",
		last_usage_energy: "Letzter Energieverbrauch",
		last_usage_time: "Letzte Nutzungsdauer",
		last_usage_water: "Letzter Wasserverbrauch",
		next_reconnect_delay: "Nächster Wiederverbindungsversuch",
		nominal_power: "Nennleistung",
		odb_actual_water_saving: "Tatsächliche Wassereinsparung",
		odb_heating_energy: "Heizenergie gesamt",
		odb_hot_water_volume: "Warmwassermenge gesamt",
		odb_possible_energy_saving: "Mögliche Energieeinsparung",
		operating_duration: "Betriebsdauer",
		outlet_temperature: "Auslauftemperatur",
		power: "Aktuelle Leistungsaufnahme",
		product_id: "Produkt-ID",
		protocol_version: "Protokollversion",
		radio: "Radio",
		reconnect_count: "Wiederverbindungen",
		repair_pairing: "Kopplung reparieren",
		reset_brush_timer: "Zahnbürsten-Timer zurücksetzen",
		reset_shower_timer: "Dusch-Timer zurücksetzen",
		saving_monitor_activation_rate: "Sparmonitor Aktivierungsrate",
		saving_monitor_consumption_co2: "Sparmonitor CO2-Verbrauch",
		saving_monitor_consumption_energy: "Sparmonitor Energieverbrauch",
		saving_monitor_consumption_water: "Sparmonitor Wasserverbrauch",
		saving_monitor_possible_co2: "Sparmonitor mögliche CO2-Einsparung",
		saving_monitor_possible_cost: "Sparmonitor mögliche Kosteneinsparung",
		saving_monitor_possible_energy: "Sparmonitor mögliche Energieeinsparung",
		saving_monitor_possible_water: "Sparmonitor mögliche Wassereinsparung",
		saving_monitor_real_co2: "Sparmonitor reale CO2-Einsparung",
		saving_monitor_real_cost: "Sparmonitor reale Kosteneinsparung",
		saving_monitor_real_energy: "Sparmonitor reale Energieeinsparung",
		saving_monitor_real_water: "Sparmonitor reale Wassereinsparung",
		scald_protection_active: "Verbrühschutz aktiv",
		scald_protection_temperature_limit: "Temperaturgrenze Verbrühschutz",
		shower_timer_active: "Dusch-Timer",
		shower_timer_duration: "Dusch-Timer Sekunden",
		shower_timer_remaining: "Dusch-Timer verbleibend",
		unknown: "Unbekannt",
		water_consumption_total: "Wasserverbrauch gesamt",
		water_consumption_week: "Wasserverbrauch Woche",
		water_consumption_year: "Wasserverbrauch Jahr",
		water_flow: "Aktueller Wasserfluss",
		water_heating: "Warmwasser",
		weather: "Wetter",
		weather_location: "Wetterstandort",
		wellness_circulation_boost: "Kreislauf-Boost",
		wellness_cold_prevention: "Kaltwasservermeidung",
		wellness_runtime_normalized: "Wellness-Laufzeit",
		wellness_summer_fitness: "Sommer-Fitness",
		wellness_winter_pick_me_up: "Winter-Belebung",
		wlan_mac: "WLAN-MAC"
	}
}, on = {
	ui: {
		button: {
			apply_memory: "Apply memory",
			delete_memory: "Delete memory",
			off: "Off",
			on: "On",
			press: "Press",
			run: "Run",
			turn_off: "Turn off",
			turn_on: "Turn on"
		},
		confirm: { run: "Run {label}?" },
		editor: {
			action: {
				"call-service": "Call service",
				"more-info": "More info",
				navigate: "Navigate",
				none: "None",
				toggle: "Toggle",
				url: "URL"
			},
			action_entity: "Action entity",
			action_entity_help: "Optional entity used by more-info, toggle and similar actions.",
			action_type: "Action",
			action_type_help: "Choose what happens when this interaction is triggered.",
			actions_help: "Configure tap, hold and double tap behavior.",
			advanced_options: "Advanced options",
			advanced_options_help: "Layout, diagnostics and optional controls",
			available_overview_entities: "Available tiles",
			available_section_entities: "Available entities",
			basic_settings: "Device and layout",
			dangerous_actions: "Dangerous actions",
			dangerous_actions_help: "Show controls that can reset, delete or repair device state.",
			device: "Device",
			device_help: "Required. Select the Home Assistant device; entities are discovered from this device.",
			device_preview: "Device preview",
			device_preview_empty: "Select a device",
			device_preview_help: "Collapsed preview of the selected Home Assistant device and discovery state.",
			device_preview_loading: "Loading entities",
			device_preview_ready: "Ready",
			device_preview_selected: "DHE device selected",
			diagnostics: "Diagnostics",
			diagnostics_help: "Show diagnostic and technical device entities.",
			display_buttons: "Display-style buttons",
			display_buttons_help: "Render supported controls as tiles similar to the device display.",
			double_tap_action: "Double tap action",
			drag_to_reorder: "Drag to reorder",
			entities: "Entities",
			entities_help: "Show, hide or override discovered entities.",
			entity_override: "Override",
			entity_override_custom: "Custom entity ID",
			entity_override_custom_help: "Use this when the target entity is not listed yet.",
			entity_override_help: "Optional replacement entity for this card function.",
			entity_visibility_help: "Show or hide this entity in the card.",
			hold_action: "Hold action",
			icon_animations: "Icon animations",
			icon_animations_help: "Enable state-aware icon motion when motion is allowed.",
			icon_color: {
				action: "Actions",
				alert: "Alert",
				eco: "Eco",
				energy: "Energy",
				hot: "Hot water",
				memory: "Memory",
				ok: "OK",
				radio: "Radio",
				safety: "Safety",
				status: "Status",
				timer: "Timer",
				water: "Water",
				weather: "Weather",
				wellness: "Wellness"
			},
			icon_color_help: "Optional CSS color, hex value or Home Assistant theme variable.",
			icon_theme: {
				_: "Icon theme",
				custom: "Custom",
				ha: "Home Assistant",
				muted: "Muted",
				state: "State colors",
				vivid: "Vivid"
			},
			icon_theme_help: "Choose how strongly icons follow state colors and the active Home Assistant theme.",
			layout_mode: {
				_: "Layout mode",
				auto: "Auto",
				kiosk: "Kiosk",
				mini: "Mini",
				panel: "Panel",
				tablet: "Tablet"
			},
			layout_mode_help: "Adjust masonry-like section flow for mobile, tablet, panel and kiosk dashboards.",
			name: "Name",
			name_help: "Optional card title shown in the card header.",
			navigation_path: "Navigation path",
			navigation_path_help: "Dashboard path opened by a navigate action.",
			optional_missing: "Optional missing entities",
			optional_missing_help: "Show optional controls even when their entity is missing.",
			overview_entities: "Overview tiles",
			overview_entities_help: "Select overview tiles and drag selected entries into the display order.",
			overview_entity_visibility_help: "Include this entity in the overview tiles.",
			section_visibility_help: "Show this section and make it available for ordering.",
			sections: "Sections",
			sections_help: "Choose visible sections and drag them into the card order.",
			selected_overview_entities: "Selected tiles",
			selected_section_entities: "Selected entities",
			service: "Service",
			service_data: "Service data JSON",
			service_data_help: "Optional JSON object passed as service data.",
			service_help: "Home Assistant service or perform-action name.",
			service_target_area: "Service target area IDs",
			service_target_area_help: "Comma-separated area IDs for the service target.",
			service_target_device: "Service target device IDs",
			service_target_device_help: "Comma-separated device IDs for the service target.",
			service_target_entity: "Service target entity",
			service_target_entity_help: "Entity ID used as the service target.",
			support_mode: "Diagnostics & support mode",
			support_mode_help: "Shows support tools for issue reports, entity audits and local compatibility checks.",
			tap_action: "Tap action",
			tile_size: {
				_: "Tile size",
				auto: "Auto",
				compact: "Compact",
				large: "Large",
				normal: "Normal"
			},
			tile_size_help: "Controls dynamic overview and display tile sizing.",
			unavailable: "Unavailable entities",
			unavailable_help: "Show entities even when Home Assistant reports unavailable or unknown.",
			url_path: "URL path",
			url_path_help: "URL opened by a URL action.",
			weather_services: "Weather services",
			weather_services_help: "Show weather helper service controls."
		},
		entity: {
			memory: "Memory {slot}",
			memory_delete: "Delete memory {slot}",
			memory_name: "Memory {slot} name",
			memory_temperature: "Memory {slot} temperature"
		},
		error: { action_failed: "Action failed: {message}" },
		field: {
			country_id: "Country ID",
			location_id: "Location ID",
			name: "Name",
			radio_source: "Radio source",
			result: "Result",
			volume: "Volume",
			weather_service: "Weather service"
		},
		label: {
			current: "Current {value}°",
			memory: "Memory {slot}",
			target: "Target"
		},
		overview: {
			delta: "{value}",
			group: {
				bath: "Bath",
				control: "Control",
				energy: "Energy",
				saving: "Saving",
				status: "Status",
				temperature: "Temp",
				timer: "Timer",
				water: "Water"
			},
			trend: {
				down: "Down",
				flat: "Flat",
				up: "Up"
			}
		},
		overview_short: {
			bath_fill_remaining_volume: "Bath left",
			device_status: "Device",
			energy_consumption_total: "Energy",
			error_status: "Error",
			inlet_temperature: "Inlet",
			outlet_temperature: "Outlet",
			power: "Power",
			water_consumption_total: "Water",
			water_flow: "Flow"
		},
		section: {
			actions: "Actions",
			bath: "Bath fill",
			consumption: "Consumption",
			controls: "Controls",
			diagnostics: "Diagnostics",
			memory: "Temperature memories",
			overview: "Overview",
			radio: "Radio",
			radio_favorites: "Radio favorites",
			saving: "Saving monitor",
			support: "Diagnostics & support",
			timers: "Timers",
			water_heating: "Water heating",
			weather: "Weather",
			wellness: "Wellness programs"
		},
		service: {
			add_weather_favorite: "Add favorite",
			remove_weather_favorite: "Remove favorite",
			search_weather_location: "Search",
			select_weather_location: "Select location",
			toggle_weather_favorite: "Toggle favorite"
		},
		state: {
			loading: "Loading",
			not_found: "Not found",
			unavailable: "Unavailable",
			unknown: "Unknown"
		},
		status: {
			connection: "Connection {state}",
			device: "Device {state}",
			discovered: "Device discovered",
			select_device: "Select a DHE device",
			status: "Status {state}"
		},
		support: {
			check: {
				active_entities: "Active entities",
				base_entity: "Base climate entity",
				custom_element: "Card custom element",
				device: "Selected device",
				device_registry: "Device registry",
				disabled_entities: "Disabled or hidden registry entries",
				entity_registry: "Entity registry",
				required_entities: "Required entity coverage",
				support_export: "Support package export",
				unavailable_entities: "Unavailable entities"
			},
			compatibility: "Compatibility checker",
			compatibility_list: "Compatibility checks",
			domain_distribution: "Domain distribution",
			entity_audit: "Entity audit",
			entity_audit_list: "Entity audit rows",
			entity_status: {
				available: "Available",
				missing: "Missing",
				unavailable: "Unavailable",
				unknown: "Unknown"
			},
			export: "Export support package",
			export_hint: "Creates an anonymized JSON package for GitHub issues.",
			integration_diagnostics: "Integration diagnostics",
			registry_status: {
				disabled: "Disabled",
				enabled: "Enabled",
				hidden: "Hidden",
				unknown: "Unknown"
			},
			self_test: "Self-test",
			self_test_failed: "Failed checks",
			self_test_pass: "All checks passed",
			self_test_warn: "Warnings",
			stat: {
				available: "Available",
				base_entity: "Base entity",
				config_entry: "Config entry",
				device: "Device",
				mapped: "Mapped",
				missing_required: "Missing required",
				registry: "Registry",
				unavailable: "Unavailable"
			},
			status: {
				fail: "Fail",
				pass: "Pass",
				warn: "Warn"
			},
			value: {
				no: "No",
				yes: "Yes"
			}
		},
		tooltip: {
			decrease: "Decrease",
			increase: "Increase",
			next: "Next",
			pause: "Pause",
			play: "Play",
			previous: "Previous"
		}
	},
	entity_labels: {
		bath_fill_active: "Bath fill",
		bath_fill_current_volume: "Current bath fill volume",
		bath_fill_remaining_volume: "Bath fill remaining",
		bath_fill_target_volume: "Bath fill target volume",
		bluetooth_mac: "Bluetooth MAC",
		bridge_temperature_maximum: "Bridge maximum temperature (5 min)",
		brush_timer_active: "Brush timer",
		brush_timer_duration: "Brush timer seconds",
		brush_timer_remaining: "Brush timer remaining",
		child_safety_active: "Child safety",
		child_safety_temperature_limit: "Child safety temperature limit",
		connection_state: "Connection state",
		controlunit_name: "Device name",
		device_info: "Device info",
		device_status: "Device status",
		disconnect_radio_pairing: "Disconnect radio pairing",
		eco_flow_limit: "Eco flow limit",
		eco_mode: "Eco mode",
		energy_consumption_total: "Total energy consumption",
		energy_consumption_week: "Energy consumption week",
		energy_consumption_year: "Energy consumption year",
		error_status: "Error status",
		inlet_temperature: "Inlet temperature",
		last_reconnect_reason: "Last reconnect reason",
		last_usage_cost: "Last usage cost",
		last_usage_energy: "Last usage energy",
		last_usage_time: "Last usage duration",
		last_usage_water: "Last usage water",
		next_reconnect_delay: "Next reconnect delay",
		nominal_power: "Nominal power",
		odb_actual_water_saving: "Actual water saving",
		odb_heating_energy: "Total heating energy",
		odb_hot_water_volume: "Total hot water volume",
		odb_possible_energy_saving: "Possible energy saving",
		operating_duration: "Operating duration",
		outlet_temperature: "Outlet temperature",
		power: "Current power consumption",
		product_id: "Product ID",
		protocol_version: "Protocol version",
		radio: "Radio",
		reconnect_count: "Reconnects",
		repair_pairing: "Repair pairing",
		reset_brush_timer: "Reset brush timer",
		reset_shower_timer: "Reset shower timer",
		saving_monitor_activation_rate: "Saving monitor activation rate",
		saving_monitor_consumption_co2: "Saving monitor consumption CO2",
		saving_monitor_consumption_energy: "Saving monitor consumption energy",
		saving_monitor_consumption_water: "Saving monitor consumption water",
		saving_monitor_possible_co2: "Saving monitor possible CO2 saving",
		saving_monitor_possible_cost: "Saving monitor possible cost saving",
		saving_monitor_possible_energy: "Saving monitor possible energy saving",
		saving_monitor_possible_water: "Saving monitor possible water saving",
		saving_monitor_real_co2: "Saving monitor real CO2 saving",
		saving_monitor_real_cost: "Saving monitor real cost saving",
		saving_monitor_real_energy: "Saving monitor real energy saving",
		saving_monitor_real_water: "Saving monitor real water saving",
		scald_protection_active: "Scald protection active",
		scald_protection_temperature_limit: "Scald protection temperature limit",
		shower_timer_active: "Shower timer",
		shower_timer_duration: "Shower timer seconds",
		shower_timer_remaining: "Shower timer remaining",
		unknown: "Unknown",
		water_consumption_total: "Total water consumption",
		water_consumption_week: "Water consumption week",
		water_consumption_year: "Water consumption year",
		water_flow: "Current water flow",
		water_heating: "Water heating",
		weather: "Weather",
		weather_location: "Weather location",
		wellness_circulation_boost: "Circulation boost",
		wellness_cold_prevention: "Cold prevention",
		wellness_runtime_normalized: "Wellness runtime",
		wellness_summer_fitness: "Summer fitness",
		wellness_winter_pick_me_up: "Winter pick-me-up",
		wlan_mac: "WLAN MAC"
	}
}, sn = "dhe-connect-card-translations-changed", L = {
	de: xn(an),
	en: xn(on)
}, cn = {};
L.de.ui, L.en.ui, {
	de: L.de.entityLabels,
	en: L.en.entityLabels
}.de;
var ln = [
	[/^temperature_memory_(\d+)$/, "entity.memory"],
	[/^temperature_memory_(\d+)_name$/, "entity.memory_name"],
	[/^temperature_memory_(\d+)_temperature$/, "entity.memory_temperature"],
	[/^delete_temperature_memory_(\d+)$/, "entity.memory_delete"]
];
function un(e, t) {
	let n = bn(e);
	n && (cn[n] = xn(t), wn(n));
}
function dn(e) {
	for (let [t, n] of Object.entries(e)) un(t, n);
}
function fn(e) {
	return pn(e).split("-", 1)[0] || "en";
}
function pn(e) {
	return bn(e?.locale?.language ?? (typeof navigator < "u" ? navigator.language : "") ?? "") || "en";
}
function R(e, t, n = {}) {
	return En(gn(pn(e), t) ?? t, n);
}
function z(e, t) {
	return R(t, `section.${e}`);
}
function mn(e, t) {
	for (let [n, r] of ln) {
		let i = e.key.match(n);
		if (i?.[1]) return R(t, r, { slot: i[1] });
	}
	return _n(pn(t), e.key) ?? e.label;
}
function hn(e, t, n) {
	let r = `overview_short.${e.key}`, i = R(t, r);
	return i === r ? n : i;
}
function gn(e, t) {
	for (let n of vn(e)) {
		let e = n.ui[t];
		if (e) return e;
	}
}
function _n(e, t) {
	for (let n of vn(e)) {
		let e = n.entityLabels[t];
		if (e) return e;
	}
}
function vn(e) {
	let t = [];
	for (let n of yn(e)) {
		let e = cn[n];
		e && t.push(e);
		let r = L[n];
		r && !t.includes(r) && t.push(r);
	}
	return t.includes(L.en) || t.push(L.en), t;
}
function yn(e) {
	let t = bn(e), n = t.split("-", 1)[0] ?? "";
	return [...new Set([
		t,
		n,
		"en"
	].filter(Boolean))];
}
function bn(e) {
	return e.trim().toLowerCase().replace(/_/g, "-");
}
function xn(e) {
	let t = Tn(e) ? e : {};
	return {
		ui: Sn(Tn(t.ui) ? t.ui : {}),
		entityLabels: Cn(t.entity_labels)
	};
}
function Sn(e, t = "") {
	let n = {};
	for (let [r, i] of Object.entries(e)) {
		let e = r === "_" ? t : t ? `${t}.${r}` : r;
		if (typeof i == "string") {
			e && (n[e] = i);
			continue;
		}
		Tn(i) && Object.assign(n, Sn(i, e));
	}
	return n;
}
function Cn(e) {
	if (!Tn(e)) return {};
	let t = {};
	for (let [n, r] of Object.entries(e)) typeof r == "string" && (t[n] = r);
	return t;
}
function wn(e) {
	typeof window > "u" || window.dispatchEvent(new CustomEvent(sn, { detail: { language: e } }));
}
function Tn(e) {
	return !!(e && typeof e == "object" && !Array.isArray(e));
}
function En(e, t) {
	return e.replace(/\{([a-z_]+)\}/g, (e, n) => Object.prototype.hasOwnProperty.call(t, n) ? String(t[n]) : e);
}
//#endregion
//#region src/display-text.ts
var Dn = /* @__PURE__ */ new Set(["unavailable"]), On = /^(?:(?:stiebel(?:\s+eltron)?|stiebel-eltron)\s+)?dhe[\s_-]*connect\b/i, kn = /^(?:\s*(?:card|integration|durchlauferhitzer|water\s+heater))?(?:\s*[-:–—/|]\s*|\s+|$)/i;
function B(e, t = "") {
	let n = Fn(e);
	if (!n) return t.trim();
	let r = jn(n);
	if (r) return r;
	let i = Fn(t);
	return !i || i === n ? "" : jn(i) || i;
}
function An(e) {
	let t = Fn(e);
	return !!(t && On.test(t));
}
function jn(e) {
	let t = Fn(e);
	if (!t) return "";
	for (let e = 0; e < 4; e += 1) {
		let e = t.replace(On, "");
		if (e === t) break;
		t = e.replace(kn, "").trim();
	}
	return Pn(t);
}
function V(e, t, n) {
	let r = mn(e, n).trim(), i = Nn(n, t) ?? t?.attributes.friendly_name, a = B(i, r) || r;
	return fn(n) === "de" && An(i) && In(e, a) ? r : a;
}
function H(e, t) {
	if (!t) return R(e, "state.not_found");
	let n = e.formatEntityState?.(t);
	if (n) return B(n) || R(e, "state.unknown");
	let r = Rn(e, t.state);
	if (r) return r;
	let i = B(t.state) || R(e, "state.unknown"), a = t.attributes.unit_of_measurement;
	return typeof a == "string" && !Dn.has(t.state) ? `${i} ${a}` : i;
}
function Mn(e, t, n, r) {
	let i = V(t, n, r);
	return typeof e == "string" && e.trim() && B(e, i) || i;
}
function Nn(e, t) {
	if (!(!e?.formatEntityName || !t)) try {
		let n = e.formatEntityName(t, [{ type: "entity" }], { separator: " " });
		return typeof n == "string" && n.trim() ? n : void 0;
	} catch {
		return;
	}
}
function Pn(e) {
	return e.replace(/\s+/g, " ").trim();
}
function Fn(e) {
	return typeof e == "string" ? Pn(e) : "";
}
function In(e, t) {
	let n = Ln(t), r = Ln(e.label);
	return n === r || r.endsWith(n);
}
function Ln(e) {
	return e.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
function Rn(e, t) {
	switch (t) {
		case "off": return R(e, "button.off");
		case "on": return R(e, "button.on");
		case "unavailable": return R(e, "state.unavailable");
		case "unknown": return R(e, "state.unknown");
		default: return;
	}
}
//#endregion
//#region src/format.ts
var zn = /* @__PURE__ */ new Set(["unavailable"]), Bn = /* @__PURE__ */ new Set([
	"heat",
	"heating",
	"on"
]), Vn = /* @__PURE__ */ new Set(["heating", "preheating"]);
function Hn(e) {
	return e.includes(".") ? e.split(".").slice(1).join(".") : e;
}
function Un(e) {
	return e.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
function Wn(e, t) {
	if (!t) return;
	let n = (e.states && typeof e.states == "object" && !Array.isArray(e.states) ? e.states : {})[t];
	if (!(!n || typeof n != "object")) return {
		...n,
		state: typeof n.state == "string" ? n.state : "unknown",
		attributes: n.attributes && typeof n.attributes == "object" && !Array.isArray(n.attributes) ? n.attributes : {},
		entity_id: t
	};
}
function U(e) {
	return !e || zn.has(e.state);
}
function Gn(e) {
	if (!e || U(e)) return !1;
	let t = e.attributes.hvac_action;
	return typeof t == "string" ? Vn.has(t.toLowerCase()) : Bn.has(e.state.toLowerCase());
}
function W(e) {
	if (!(!e || zn.has(e.state))) return Kn(e.state);
}
function G(e, t) {
	return Kn(e?.attributes[t]);
}
function Kn(e) {
	if (typeof e == "number") return Number.isFinite(e) ? e : void 0;
	if (typeof e != "string" || !e.trim()) return;
	let t = Number(e);
	return Number.isFinite(t) ? t : void 0;
}
function qn(e) {
	return e?.state === "on" || e?.state === "heat" || e?.state === "playing";
}
function Jn(e, t, n) {
	return Math.min(Math.max(e, t), n);
}
function Yn(e, t) {
	if (!Number.isFinite(t) || t <= 0) return e;
	let n = Math.max(0, String(t).split(".")[1]?.length ?? 0);
	return Number((Math.round(e / t) * t).toFixed(n));
}
//#endregion
//#region src/entity-matching.ts
function Xn(e) {
	return [
		e.key,
		e.label,
		...e.aliases ?? []
	].map(Un).filter((e, t, n) => !!e && n.indexOf(e) === t);
}
function Zn(e, t, n) {
	let r = Xn(e), i = Un(Hn(t)), a = typeof n?.translation_key == "string" ? Un(n.translation_key) : "", o = typeof n?.unique_id == "string" ? Un(n.unique_id) : "", s = 0;
	return a && r.includes(a) && (s += 80), o && r.some((e) => o === e || o.endsWith(`_${e}`)) && (s += 75), r.some((e) => i === e || i.endsWith(`_${e}`)) && (s += 45), s;
}
function Qn(e, t, n) {
	return Zn(e, t, n) > 0;
}
//#endregion
//#region src/types.ts
var $n = "stiebel_dhe_connect", er = new Set(A.map((e) => e.domain));
function tr(e, t) {
	let n = hr(e), r = new Set(t.hide_entities), i = ir(e, n, t.device_id), a = gr(e, n, i), o = dr(e, n, nr(t, "water_heating", "climate"), "climate", i) ?? rr(e, i, a.climate ?? []), s = lr(e, o), c = i ?? s?.device_id ?? void 0, l = o ? br(o) : [], u = {}, d = vr(e, c ?? null), f = (c ?? null) === i ? a : gr(e, n, c ?? null);
	for (let i of A) {
		if (r.has(i.key)) continue;
		let a = ur(n, nr(t, i.key, i.domain), i.domain);
		if (a) {
			u[i.key] = a;
			continue;
		}
		if (i.key === "water_heating" && o) {
			u[i.key] = o;
			continue;
		}
		let s = sr(e, n, i, c ?? null, l, f[i.domain] ?? []);
		if (s) {
			u[i.key] = s;
			continue;
		}
		if (i.diagnostic) {
			let e = d.get(i.key);
			e && (u[i.key] = e);
		}
	}
	return {
		baseEntity: o,
		configEntryId: s?.config_entry_id ?? Object.values(u).map((t) => lr(e, t)?.config_entry_id).find((e) => typeof e == "string" && e.length > 0),
		deviceId: c ?? void 0,
		entityIds: u,
		definitions: A
	};
}
function nr(e, t, n) {
	let r = e.entities[t];
	if (typeof r == "string") return r;
	let i = e.entities[n];
	if (typeof i == "string" && t === n) return i;
	if (i && typeof i == "object") {
		let e = i[t];
		if (typeof e == "string") return e;
	}
}
function rr(e, t, n) {
	let r = n;
	return r.find((n) => {
		let r = lr(e, n);
		return r?.platform === "stiebel_dhe_connect" && (!t || r.device_id === t);
	}) || r.find((e) => {
		let t = Hn(e);
		return t.includes("dhe") || t.includes("stiebel");
	});
}
function ir(e, t, n) {
	if (!n || ar(e, t, n)) return n ?? null;
	let r = or(e), [i] = r;
	return r.size === 1 && i ? i : n;
}
function ar(e, t, n) {
	return Object.entries(e.entities ?? {}).some(([r, i]) => i?.platform === "stiebel_dhe_connect" && i.device_id === n && !!t[r] && pr(e, r));
}
function or(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of Object.values(e.entities ?? {})) n?.platform !== "stiebel_dhe_connect" || !n.device_id || t.add(n.device_id);
	return t;
}
function sr(e, t, n, r, i, a) {
	let o;
	for (let s of a) {
		let a = cr(e, t, s, n, r, i);
		a <= 0 || (!o || a > o.score || a === o.score && s < o.entityId) && (o = {
			entityId: s,
			score: a
		});
	}
	return o?.entityId;
}
function cr(e, t, n, r, i, a) {
	let o = lr(e, n), s = Hn(n), c = Xn(r), l = Zn(r, n, o), u = 0;
	o?.platform === "stiebel_dhe_connect" && (u += 20), i && o?.device_id === i && (u += 50), a.some((e) => c.some((t) => s === `${e}_${t}`)) && (l += 25);
	let d = mr(t, n);
	return typeof d == "string" && c.some((e) => Un(d).includes(e)) && (l += 15), l > 0 ? u + l : 0;
}
function lr(e, t) {
	if (t) return e.entities?.[t];
}
function ur(e, t, n) {
	if (!(!t || !e[t]) && !(n && !t.startsWith(`${n}.`))) return t;
}
function dr(e, t, n, r, i) {
	let a = ur(t, n, r);
	if (a) return fr(e, a, i) ? a : void 0;
}
function fr(e, t, n) {
	if (!n) return !0;
	let r = lr(e, t);
	return !r?.device_id || r.device_id === n;
}
function pr(e, t) {
	let n = lr(e, t);
	return !n?.disabled_by && !n?.hidden_by && n?.hidden !== !0;
}
function mr(e, t) {
	let n = e[t];
	if (!n || typeof n != "object" || Array.isArray(n)) return;
	let r = n.attributes;
	if (!(!r || typeof r != "object" || Array.isArray(r))) return r.friendly_name;
}
function hr(e) {
	return e.states && typeof e.states == "object" && !Array.isArray(e.states) ? e.states : {};
}
function gr(e, t, n) {
	let r = {};
	for (let i of Object.keys(t)) {
		let t = _r(i);
		t && pr(e, i) && fr(e, i, n) && (r[t] ??= []).push(i);
	}
	return r;
}
function _r(e) {
	let [t] = e.split(".", 1);
	return t && er.has(t) ? t : void 0;
}
function vr(e, t) {
	let n = /* @__PURE__ */ new Map(), r = e.entities ?? {};
	for (let [i, a] of Object.entries(r)) {
		let r = _r(i);
		if (!r || !fr(e, i, t) || a?.hidden === !0 || a?.hidden_by || a?.disabled_by === "user") continue;
		let o = yr(i, r, a);
		if (!o) continue;
		let s = n.get(o);
		(!s || i < s) && n.set(o, i);
	}
	return n;
}
function yr(e, t, n) {
	let r = typeof n?.translation_key == "string" && n.translation_key.trim() ? n.translation_key.trim() : void 0;
	if (r && A.some((e) => e.domain === t && e.key === r)) return r;
	let i = typeof n?.unique_id == "string" ? n.unique_id : "";
	if (i) {
		for (let n of A) if (n.domain === t && (i.endsWith(`_${n.key}`) || e.endsWith(`_${n.key}`))) return n.key;
	}
}
function br(e) {
	let t = Hn(e), n = t.split("_").filter(Boolean), r = /* @__PURE__ */ new Set();
	return n.length > 1 && r.add(n.slice(0, -1).join("_")), n.length > 2 && r.add(n.slice(0, -2).join("_")), r.add(t.replace(/_(setpoint|water_heating|durchlauferhitzer)$/, "")), [...r].filter(Boolean);
}
//#endregion
//#region src/discovery-cache.ts
var xr = new Set(A.map((e) => e.domain)), Sr = class {
	constructor() {
		this._registrySignatureCache = "", this._stateSignatureCache = "";
	}
	get(e, t) {
		let n = Cr(t);
		if (this._entry && this._entry.configSignature === n && this._registrySource === e.entities && this._stateSource === e.states) return this._entry.discovered;
		let r = this._registrySignature(e), i = this._stateSignature(e);
		if (this._entry && this._entry.configSignature === n && this._entry.registrySignature === r && this._entry.stateSignature === i) return this._entry.discovered;
		let a = tr(e, t);
		return this._entry = {
			configSignature: n,
			registrySignature: r,
			stateSignature: i,
			discovered: a
		}, a;
	}
	clear() {
		this._entry = void 0, this._registrySource = void 0, this._registrySignatureCache = "", this._stateSource = void 0, this._stateSignatureCache = "";
	}
	_registrySignature(e) {
		let t = e.entities;
		return this._registrySource === t ? this._registrySignatureCache : (this._registrySource = t, this._registrySignatureCache = wr(e), this._registrySignatureCache);
	}
	_stateSignature(e) {
		let t = e.states;
		return this._stateSource === t ? this._stateSignatureCache : (this._stateSource = t, this._stateSignatureCache = Tr(e), this._stateSignatureCache);
	}
};
function Cr(e) {
	return JSON.stringify({
		device_id: e.device_id ?? "",
		hide_entities: e.hide_entities,
		entities: e.entities
	});
}
function wr(e) {
	let t = e.entities ?? {}, n = Object.keys(t).sort(), r = "";
	for (let e of n) {
		if (!Er(e)) continue;
		let n = t[e];
		r += `${e}\u001f${n?.config_entry_id ?? ""}\u001f${n?.device_id ?? ""}\u001f${n?.disabled_by ?? ""}\u001f${n?.hidden === !0 ? "1" : ""}\u001f${n?.hidden_by ?? ""}\u001f${n?.platform ?? ""}\u001f${n?.translation_key ?? ""}\u001f${n?.unique_id ?? ""}\u001e`;
	}
	return r;
}
function Tr(e) {
	let t = e.states && typeof e.states == "object" ? e.states : {}, n = Object.keys(t).sort(), r = "";
	for (let e of n) {
		if (!Er(e)) continue;
		let n = t[e], i = n?.attributes && typeof n.attributes == "object" && !Array.isArray(n.attributes) ? n.attributes.friendly_name ?? "" : "";
		r += `${e}\u001f${typeof i == "string" ? i : ""}\u001e`;
	}
	return r;
}
function Er(e) {
	let t = e.indexOf(".");
	if (t <= 0) return !1;
	let n = e.slice(0, t);
	return n ? xr.has(n) : !1;
}
//#endregion
//#region src/editor-actions.ts
var Dr = [
	"more-info",
	"toggle",
	"navigate",
	"url",
	"call-service",
	"none"
];
function Or(e, t) {
	let n = typeof e?.action == "string" ? e.action : void 0;
	return n === "perform-action" ? "call-service" : Lr(n) ? n : t === "tap_action" ? "more-info" : "none";
}
function kr(e, t) {
	let n = Lr(t.action) ? t.action : Or(t, e);
	if (n === "none") return e === "tap_action" ? { action: n } : void 0;
	let r = { action: n };
	return Pr(t, r, "entity"), n === "navigate" && Pr(t, r, "navigation_path"), n === "url" && Pr(t, r, "url_path"), n === "call-service" && (r.action = "perform-action", Pr(t, r, "perform_action", t.service ?? t.perform_action), Fr(t, r, "target"), Fr(t, r, "data")), r;
}
function Ar(e, t) {
	if (!Rr(e)) return "";
	let n = e[t];
	return typeof n == "string" ? n : Array.isArray(n) ? n.filter((e) => typeof e == "string").join(", ") : "";
}
function jr(e, t, n) {
	let r = Rr(e) ? { ...e } : {}, i = Ir(n ?? "");
	return i.length ? r[t] = i.length === 1 ? i[0] : i : delete r[t], Object.keys(r).length ? r : void 0;
}
function Mr(e) {
	return Rr(e) ? JSON.stringify(e, null, 2) : "";
}
function Nr(e) {
	if (!e.trim()) return { valid: !0 };
	try {
		let t = JSON.parse(e);
		return Rr(t) ? {
			valid: !0,
			value: t
		} : { valid: !1 };
	} catch {
		return { valid: !1 };
	}
}
function Pr(e, t, n, r = e[n]) {
	let i = r;
	typeof i == "string" && i.trim() && (t[n] = i.trim());
}
function Fr(e, t, n) {
	let r = e[n];
	Rr(r) && Object.keys(r).length && (t[n] = { ...r });
}
function Ir(e) {
	return e.split(/[\n,]/).map((e) => e.trim()).filter(Boolean);
}
function Lr(e) {
	return typeof e == "string" && Dr.includes(e);
}
function Rr(e) {
	return !!(e && typeof e == "object" && !Array.isArray(e));
}
//#endregion
//#region node_modules/lit-html/directives/if-defined.js
var zr = (e) => e ?? w;
//#endregion
//#region src/editor-form.ts
function K(e, t) {
	let n = t.count !== void 0, r = t.helpKey ? R(e, t.helpKey) : void 0;
	return S`
    <details class=${["editor-foldout", t.className].filter(Boolean).join(" ")} ?open=${!!t.open}>
      <summary>
        <span class="summary-label">
          <span>${R(e, t.titleKey)}</span>
          ${t.helpKey ? Ur(e, t.helpKey) : ""}
        </span>
        ${n || r ? S`
              <small class=${["summary-meta", n && r ? "with-count-and-help" : ""].filter(Boolean).join(" ")}>
                ${n ? S`<span class="summary-count">${t.count}</span>` : ""}
                ${r ? S`<span class="summary-help">${r}</span>` : ""}
              </small>
            ` : ""}
      </summary>
      <div class="editor-foldout-content">${t.content}</div>
    </details>
  `;
}
function q(e, t, n, r, i = "") {
	return S`
    <div class=${["ha-form-row", i].filter(Boolean).join(" ")}>
      ${Hr(e, t, n)}
      ${r}
    </div>
  `;
}
function Br(e, t, n, r) {
	return S`
    <div class="action-textarea-row">
      ${Hr(e, t, n)}
      ${r}
    </div>
  `;
}
function Vr(e, t, n, r, i = {}) {
	let a = i.isLocalizedText ? t : R(e, t), o = i.helpKey ? R(e, i.helpKey) : void 0;
	return S`
    <ha-formfield
      class="switch-formfield"
      .label=${a}
      title=${o ?? a}
      aria-label=${o ?? a}
    >
      <ha-switch
        .checked=${n}
        aria-label=${o ?? a}
        @click=${Gr}
        @change=${(e) => {
		e.stopPropagation(), r(e);
	}}
      ></ha-switch>
      <span slot="label" class="switch-formfield-label">${a}</span>
      ${o ? Wr(o, "label") : ""}
    </ha-formfield>
  `;
}
function Hr(e, t, n) {
	return S`
    <span class="field-label">
      <span>${R(e, t)}</span>
      ${n ? Ur(e, n) : ""}
    </span>
  `;
}
function Ur(e, t) {
	return Wr(R(e, t));
}
function Wr(e, t) {
	let n = S`<ha-icon icon="mdi:information-outline" aria-hidden="true"></ha-icon>`;
	return S`
    <button
      class="help-icon"
      type="button"
      slot=${zr(t)}
      title=${e}
      aria-label=${e}
      @click=${Gr}
      @pointerdown=${Gr}
      @keydown=${Kr}
    >
      ${n}
    </button>
  `;
}
function Gr(e) {
	e.stopPropagation();
}
function Kr(e) {
	(e.key === "Enter" || e.key === " ") && (e.preventDefault(), e.stopPropagation());
}
//#endregion
//#region src/editor-events.ts
function qr(e) {
	let t = Qr(e.target);
	if (t !== void 0) return t;
	let n = Qr(e.currentTarget);
	return n !== void 0 && n;
}
function Jr(e) {
	let t = $r(e.target);
	if (typeof t == "string") return t;
	let n = $r(e.currentTarget);
	return typeof n == "string" ? n : "";
}
function Yr(e) {
	let t = e.detail;
	return typeof t?.value == "string" ? t.value : Jr(e);
}
function Xr(e) {
	let t = e.detail?.value;
	if (typeof t == "string") return t || void 0;
	let n = $r(e.target);
	if (typeof n == "string") return n || void 0;
	let r = $r(e.currentTarget);
	return typeof r == "string" && r || void 0;
}
function Zr(e) {
	return typeof e == "string" ? e : "";
}
function Qr(e) {
	if (!e) return;
	let t = e.checked;
	return typeof t == "boolean" ? t : void 0;
}
function $r(e) {
	if (!e) return;
	let t = e.value;
	return typeof t == "string" ? t : void 0;
}
//#endregion
//#region src/editor-basic.ts
var ei = { device: {
	filter: [{ integration: $n }],
	entity: [{ domain: "climate" }]
} }, ti = { text: {} }, ni = [
	{
		key: "show_diagnostics",
		labelKey: "editor.diagnostics"
	},
	{
		key: "show_weather_services",
		labelKey: "editor.weather_services"
	},
	{
		key: "show_icon_animations",
		labelKey: "editor.icon_animations"
	},
	{
		key: "show_display_buttons",
		labelKey: "editor.display_buttons"
	},
	{
		key: "show_support_mode",
		labelKey: "editor.support_mode"
	},
	{
		key: "show_dangerous_actions",
		labelKey: "editor.dangerous_actions"
	},
	{
		key: "show_unavailable",
		labelKey: "editor.unavailable"
	},
	{
		key: "show_optional",
		labelKey: "editor.optional_missing"
	}
], ri = [
	{
		key: "layout_mode",
		labelKey: "editor.layout_mode",
		options: Vt
	},
	{
		key: "tile_size",
		labelKey: "editor.tile_size",
		options: Ht
	},
	{
		key: "icon_theme",
		labelKey: "editor.icon_theme",
		options: Tt
	}
];
function ii(e) {
	return S`
    <section class="editor-section basic-editor">
      <h3>${R(e.hass, "editor.basic_settings")}</h3>
      <div class="ha-form-list">
        <ha-selector
          class="ha-picker-control"
          .hass=${e.hass}
          .label=${R(e.hass, "editor.device")}
          .helper=${R(e.hass, "editor.device_help")}
          .selector=${ei}
          .value=${e.config.device_id ?? ""}
          .required=${!0}
          @value-changed=${e.deviceChanged}
        ></ha-selector>
        ${ai(e)}
        <ha-selector
          class="ha-picker-control"
          data-editor-field="name"
          .hass=${e.hass}
          .label=${R(e.hass, "editor.name")}
          .helper=${R(e.hass, "editor.name_help")}
          .selector=${ti}
          .value=${Zr(e.config.name)}
          @value-changed=${e.nameChanged}
          @change=${e.nameChanged}
        ></ha-selector>
      </div>

      ${K(e.hass, {
		className: "advanced-editor",
		titleKey: "editor.advanced_options",
		helpKey: "editor.advanced_options_help",
		content: S`
          <div class="advanced-group advanced-selects">
            ${ri.map((t) => oi(e, t))}
          </div>
          ${e.config.icon_theme === "custom" ? S`<div class="advanced-group">${si(e)}</div>` : ""}
          <div class="advanced-group checks">
            ${ni.map((t) => ui(e, t))}
          </div>
        `
	})}
    </section>
  `;
}
function ai(e) {
	let t = !!e.config.device_id, n = t ? e.devicePreviewReady ? "editor.device_preview_ready" : "editor.device_preview_loading" : "editor.device_preview_empty", r = e.devicePreviewLabel || R(e.hass, t ? "editor.device_preview_selected" : "status.select_device");
	return K(e.hass, {
		className: "device-preview-foldout",
		titleKey: "editor.device_preview",
		helpKey: "editor.device_preview_help",
		count: R(e.hass, n),
		content: S`
      <div class="device-preview">
        <ha-icon icon=${t ? "mdi:check-circle-outline" : "mdi:devices-off"}></ha-icon>
        <div>
          <strong>${r}</strong>
          <span>${R(e.hass, n)}</span>
        </div>
      </div>
    `
	});
}
function oi(e, t) {
	let n = String(e.config[t.key]), r = R(e.hass, t.labelKey);
	return q(e.hass, t.labelKey, `${t.labelKey}_help`, S`
      <select
        data-option-key=${t.key}
        .value=${n}
        aria-label=${r}
        @change=${(n) => e.selectChanged(t.key, n.target.value)}
      >
        ${t.options.map((r) => S`
            <option value=${r} ?selected=${r === n}>
              ${R(e.hass, `${t.labelKey}.${r}`)}
            </option>
          `)}
      </select>
    `);
}
function si(e) {
	return S`
    <div class="icon-color-grid">
      ${Et.map((t) => ci(e, t))}
    </div>
  `;
}
function ci(e, t) {
	let n = e.config.icon_colors[t] ?? "";
	return q(e.hass, `editor.icon_color.${t}`, "editor.icon_color_help", S`
      <div class="icon-color-control" style=${n ? `--dhe-editor-icon-color: ${n};` : ""}>
        <span class="icon-color-swatch" aria-hidden="true"></span>
        <ha-input
          data-icon-color-tone=${t}
          .value=${n}
          aria-label=${R(e.hass, `editor.icon_color.${t}`)}
          .placeholder=${li(t)}
          .helper=${R(e.hass, "editor.icon_color_help")}
          helperPersistent
          @change=${(n) => e.iconColorChanged(t, n)}
        ></ha-input>
      </div>
    `, "icon-color-row");
}
function li(e) {
	return `var(--dhe-${e}-color)`;
}
function ui(e, t) {
	let n = !!e.config[t.key];
	return Vr(e.hass, t.labelKey, n, (n) => e.checkboxChanged(t.key, qr(n)), { helpKey: `${t.labelKey}_help` });
}
//#endregion
//#region src/editor-ordering.ts
var di = "application/x-dhe-connect-section", fi = "application/x-dhe-connect-overview-entity";
function pi(e) {
	let t = xi(e.sections), n = R(e.hass, "editor.drag_to_reorder");
	return S`
    <section class="sections-editor">
      ${K(e.hass, {
		className: "sections-foldout",
		titleKey: "editor.sections",
		helpKey: "editor.sections_help",
		count: e.sections.length,
		content: S`
          <div class="order-list section-order-list">
            ${O(t, (e) => e, (t) => yi(e, t, n))}
          </div>
        `
	})}
    </section>
  `;
}
function mi(e) {
	let t = Oi(e.activeEntityKeys), n = ki(e.overviewEntities, t), r = n.map((e) => e.key), i = new Set(r), a = t.filter((e) => !i.has(e.key)), o = R(e.hass, "editor.drag_to_reorder");
	return S`
    <section class="overview-editor">
      ${K(e.hass, {
		className: "overview-foldout",
		titleKey: "editor.overview_entities",
		helpKey: "editor.overview_entities_help",
		count: n.length,
		content: S`
          <div class="overview-entity-groups">
            ${n.length ? K(e.hass, {
			className: "overview-entity-section",
			titleKey: "editor.selected_overview_entities",
			count: n.length,
			content: S`
                    <div class="order-list overview-order-list">
                      ${O(n, (e) => e.key, (t) => bi(e, t, i, r, o))}
                    </div>
                  `
		}) : ""}
            ${a.length ? K(e.hass, {
			className: "overview-entity-section",
			titleKey: "editor.available_overview_entities",
			count: a.length,
			content: S`
                    <div class="overview-entity-grid">
                      ${O(a, (e) => e.key, (t) => bi(e, t, i, r, o))}
                    </div>
                  `
		}) : ""}
          </div>
        `
	})}
    </section>
  `;
}
function hi(e, t, n) {
	return n ? e.includes(t) ? e : [...e, t] : e.includes(t) ? e.filter((e) => e !== t) : e;
}
function gi(e, t) {
	return e.every((e) => t.has(e)) ? e : e.filter((e) => t.has(e));
}
function _i(e, t, n) {
	if (t === n) return e;
	let r = e.indexOf(t), i = e.indexOf(n);
	if (r < 0 || i < 0) return e;
	let a = [...e], [o] = a.splice(r, 1);
	return a.splice(i, 0, o), a;
}
function vi(e, t, n, r) {
	return r ? Ai(e, r, _i(gi(e, r), t, n)) : _i(e, t, n);
}
function yi(e, t, n) {
	let r = e.sections.includes(t);
	return S`
    <div
      class="order-row section-order-row"
      data-section-key=${t}
      @dragover=${(e) => Ci(e, r)}
      @drop=${(n) => Ti(e, t, r, n)}
    >
      <div class="check switch-row">
        ${Vr(e.hass, z(t, e.hass), r, (n) => e.toggleSection(t, qr(n)), {
		helpKey: "editor.section_visibility_help",
		isLocalizedText: !0
	})}
      </div>
      <div class="order-actions">
        <button
          class="drag-handle"
          type="button"
          title=${n}
          aria-label=${n}
          aria-keyshortcuts="ArrowUp ArrowDown"
          draggable=${r ? "true" : "false"}
          ?disabled=${!r}
          @dragstart=${(e) => Si(e, di, t)}
          @keydown=${(n) => Di(n, t, e.sections, (n) => e.reorderSection(t, n), r)}
        >
          <ha-icon icon="mdi:drag"></ha-icon>
        </button>
      </div>
    </div>
  `;
}
function bi(e, t, n, r, i) {
	let a = n.has(t.key);
	return S`
    <div
      class="overview-entity-toggle"
      data-overview-key=${t.key}
      @dragover=${(e) => Ci(e, a)}
      @drop=${(n) => wi(e, t.key, a, n)}
    >
      <div class="check switch-row">
        ${Vr(e.hass, mn(t, e.hass), a, (n) => e.toggleOverviewEntity(t.key, qr(n)), {
		helpKey: "editor.overview_entity_visibility_help",
		isLocalizedText: !0
	})}
      </div>
      ${a ? S`
            <div class="order-actions">
              <button
                class="drag-handle"
                type="button"
                title=${i}
                aria-label=${i}
                aria-keyshortcuts="ArrowUp ArrowDown"
                draggable="true"
                @dragstart=${(e) => Si(e, fi, t.key)}
                @keydown=${(n) => Di(n, t.key, r, (n) => e.reorderOverviewEntity(t.key, n), !0)}
              >
                <ha-icon icon="mdi:drag"></ha-icon>
              </button>
            </div>
          ` : ""}
    </div>
  `;
}
function xi(e) {
	let t = new Set(e);
	return [...e, ...k.filter((e) => !t.has(e))];
}
function Si(e, t, n) {
	e.dataTransfer?.setData(t, n), e.dataTransfer && (e.dataTransfer.effectAllowed = "move");
}
function Ci(e, t) {
	t && (e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = "move"));
}
function wi(e, t, n, r) {
	Ei(n, r, fi, (n) => e.reorderOverviewEntity(n, t));
}
function Ti(e, t, n, r) {
	Ei(n, r, di, (n) => e.reorderSection(n, t));
}
function Ei(e, t, n, r) {
	if (!e) return;
	t.preventDefault();
	let i = t.dataTransfer?.getData(n);
	i && r(i);
}
function Di(e, t, n, r, i) {
	if (!i || e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
	e.preventDefault(), e.stopPropagation();
	let a = n.indexOf(t);
	if (a < 0) return;
	let o = n[a + (e.key === "ArrowUp" ? -1 : 1)];
	o && r(o);
}
function Oi(e) {
	return e ? A.filter((t) => e.has(t.key)) : A;
}
function ki(e, t) {
	if (!e.length || !t.length) return [];
	let n = new Map(t.map((e) => [e.key, e]));
	return e.map((e) => n.get(e)).filter((e) => !!e);
}
function Ai(e, t, n) {
	let r = [...n];
	return e.map((e) => t.has(e) ? r.shift() ?? e : e);
}
//#endregion
//#region src/editor-styles.ts
var ji = o`
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

  ha-input,
  ha-textarea {
    display: block;
    min-width: 0;
    width: 100%;
  }

  ha-textarea.invalid {
    --ha-color-danger: var(--error-color);
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
//#endregion
//#region src/sections.ts
function Mi(e, t) {
	if (!t || e.includes("support")) return [...e];
	let n = [...e], r = n.indexOf("diagnostics"), i = n.indexOf("actions"), a = r >= 0 ? r + 1 : i >= 0 ? i : n.length;
	return n.splice(a, 0, "support"), n;
}
//#endregion
//#region \0@oxc-project+runtime@0.146.0/helpers/esm/decorate.js
function J(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/editor.ts
var Ni = [
	{
		key: "tap_action",
		labelKey: "editor.tap_action"
	},
	{
		key: "hold_action",
		labelKey: "editor.hold_action"
	},
	{
		key: "double_tap_action",
		labelKey: "editor.double_tap_action"
	}
], Pi = k.filter((e) => e !== "overview"), Fi = new Set(Pi), Ii = Object.fromEntries(Object.entries(ut).map(([e, t]) => [e, t.map((e) => e.key)])), Li = "application/x-dhe-connect-section-entity", Ri = "editor.drag_to_reorder", zi = [
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
], Bi = [
	"sections",
	"overview_entities",
	"hide_entities"
], Vi = {
	controls: [...bt, ...xt],
	bath: St,
	timers: Ct,
	weather: ["weather", "weather_location"],
	actions: wt
}, Hi = class extends Re {
	constructor(...e) {
		super(...e), this._config = F({}), this._discoveryCache = new Sr(), this._activeEntityKeysCache = /* @__PURE__ */ new WeakMap(), this._translationsChanged = () => {
			this.requestUpdate();
		}, this._deviceChanged = (e) => {
			let t = Xr(e);
			t && this._updateConfig({ device_id: t });
		}, this._nameChanged = (e) => {
			this._updateConfig({ name: Yr(e) || void 0 });
		};
	}
	setConfig(e) {
		this._config = F(e);
	}
	connectedCallback() {
		super.connectedCallback(), window.addEventListener(sn, this._translationsChanged);
	}
	disconnectedCallback() {
		window.removeEventListener(sn, this._translationsChanged), super.disconnectedCallback();
	}
	render() {
		let e = this._activeEntityKeys(), t = new Set(this._config.hide_entities), n = this._pinnedEntityKeys(t), r = this._orderingContext(e);
		return S`
      <div class="editor">
        ${ii({
			hass: this.hass,
			config: this._config,
			devicePreviewLabel: this._devicePreviewLabel(),
			devicePreviewReady: e !== void 0,
			deviceChanged: this._deviceChanged,
			iconColorChanged: (e, t) => this._iconColorChanged(e, t),
			nameChanged: this._nameChanged,
			selectChanged: (e, t) => this._selectOptionChanged(e, t),
			checkboxChanged: (e, t) => this._checkboxChanged(e, t)
		})}
        <section class="actions-editor">
          ${K(this.hass, {
			className: "actions-foldout",
			titleKey: "section.actions",
			helpKey: "editor.actions_help",
			content: S`
              <div class="action-list">
                ${Ni.map((e) => this._actionField(e))}
              </div>
            `
		})}
        </section>
        ${pi(r)}
        ${mi(r)}
        <section class="entity-editor section-entities-editor">
          ${this._orderedEntityEditorSections().map((r) => this._sectionEntitySelector(r, t, n, e))}
        </section>
      </div>
    `;
	}
	_orderingContext(e) {
		return {
			hass: this.hass,
			sections: this._config.sections,
			overviewEntities: e ? gi(this._config.overview_entities, e) : this._config.overview_entities,
			activeEntityKeys: e,
			toggleSection: (e, t) => this._toggleSection(e, t),
			reorderSection: (e, t) => this._reorderSection(e, t),
			toggleOverviewEntity: (e, t) => this._overviewEntityChanged(e, t),
			reorderOverviewEntity: (t, n) => this._reorderOverviewEntity(t, n, e)
		};
	}
	_devicePreviewLabel() {
		let e = this._config.device_id;
		if (!e) return;
		let t = this.hass?.devices?.[e];
		return t?.name_by_user || t?.name || void 0;
	}
	_activeEntityKeys() {
		if (!this.hass) return;
		let e = this._discoveryCache.get(this.hass, this._config), t = this._activeEntityKeysCache.get(e);
		if (t) return t;
		let n = new Set(Object.keys(e.entityIds));
		return this._activeEntityKeysCache.set(e, n), n;
	}
	_orderedEntityEditorSections() {
		return this._config.sections.filter((e) => e !== "overview" && Fi.has(e));
	}
	_sectionEntitySelector(e, t, n, r) {
		let i = this._orderedSectionEntityDefinitions(e, n, r);
		if (!i.length) return w;
		let a = i.filter((e) => !t.has(e.key)), o = i.filter((e) => t.has(e.key)), s = a.map((e) => e.key), c = new Set(s);
		return K(this.hass, {
			className: `overview-foldout entity-section entity-section-${e}`,
			titleKey: `section.${e}`,
			count: a.length,
			content: S`
        <div class="overview-entity-groups section-entity-groups">
          ${a.length ? K(this.hass, {
				className: "overview-entity-section",
				titleKey: "editor.selected_section_entities",
				count: a.length,
				content: S`
                  <div class="order-list overview-order-list">
                    ${O(a, (e) => e.key, (t) => this._sectionEntityToggle(e, t, c, s))}
                  </div>
                `
			}) : ""}
          ${o.length ? K(this.hass, {
				className: "overview-entity-section",
				titleKey: "editor.available_section_entities",
				count: o.length,
				content: S`
                  <div class="overview-entity-grid">
                    ${O(o, (e) => e.key, (t) => this._sectionEntityToggle(e, t, c, s))}
                  </div>
                `
			}) : ""}
        </div>
      `
		});
	}
	_orderedSectionEntityDefinitions(e, t, n) {
		let r = (ut[e] ?? []).filter((e) => !n || n.has(e.key) || t?.has(e.key));
		if (!r.length) return [];
		let i = new Map(r.map((e) => [e.key, e])), a = Ui(e, Ii[e] ?? []).filter((e) => i.has(e)), o = new Set(a), s = [...a.map((e) => i.get(e)).filter((e) => !!e), ...r.filter((e) => !o.has(e.key))], c = this._config.section_entity_order[e];
		if (!c?.length) return s;
		let l = c.map((e) => i.get(e)).filter((e) => !!e), u = new Set(l.map((e) => e.key));
		return [...l, ...s.filter((e) => !u.has(e.key))];
	}
	_entityOverrideKeys() {
		let e = /* @__PURE__ */ new Set();
		for (let [t, n] of Object.entries(this._config.entities)) if (typeof n == "string" && lt[t] && e.add(t), !(!n || typeof n != "object" || Array.isArray(n))) for (let t of Object.keys(n)) lt[t] && e.add(t);
		return e;
	}
	_sectionEntityToggle(e, t, n, r) {
		let i = n.has(t.key), a = e !== "memory", o = Gi(this._config.entities, t), s = R(this.hass, Ri);
		return S`
      <div
        class="overview-entity-toggle section-entity-toggle"
        data-entity-key=${t.key}
        data-entity-section=${e}
        @dragover=${(e) => i && a ? this._allowEntityDrop(e) : void 0}
        @drop=${(n) => i && a ? this._dropSectionEntity(e, t.key, n) : void 0}
      >
        <div class="check switch-row">
          ${Vr(this.hass, mn(t, this.hass), i, (e) => this._entityVisibilityChanged(t.key, qr(e)), {
			helpKey: "editor.overview_entity_visibility_help",
			isLocalizedText: !0
		})}
        </div>
        ${this._renderSectionEntityDragHandle(i, a, e, t.key, r, s)}
        ${this._renderSectionEntityOverride(t, o)}
      </div>
    `;
	}
	_renderSectionEntityDragHandle(e, t, n, r, i, a) {
		return !e || !t ? w : S`
      <div class="order-actions">
        <button
          class="drag-handle"
          type="button"
          title=${a}
          aria-label=${a}
          aria-keyshortcuts="ArrowUp ArrowDown"
          draggable="true"
          @dragstart=${(e) => this._setSectionEntityDragData(e, r)}
          @keydown=${(e) => this._reorderSectionEntityByKeyboard(e, n, r, i)}
        >
          <ha-icon icon="mdi:drag"></ha-icon>
        </button>
      </div>
    `;
	}
	_renderSectionEntityOverride(e, t) {
		return S`
      <div class="entity-override-control entity-override-inline">
        ${Ji(this.hass, e, t, (t) => this._entityOverrideChanged(e, t))}
        <ha-input
          .value=${t}
          .label=${R(this.hass, "editor.entity_override_custom")}
          .helper=${R(this.hass, "editor.entity_override_custom_help")}
          helperPersistent
          @change=${(t) => this._entityOverrideTextChanged(e, t)}
        ></ha-input>
      </div>
    `;
	}
	_actionField(e) {
		let t = this._config[e.key], n = Or(t, e.key), r = Wi(e.key, t, n);
		return S`
      <details class="editor-foldout action-card" data-action-card-key=${e.key} ?open=${r}>
        <summary>
          <span class="summary-label">
            <span>${R(this.hass, e.labelKey)}</span>
          </span>
          <small>${R(this.hass, `editor.action.${n}`)}</small>
        </summary>
        <div class="action-fields">
          ${q(this.hass, "editor.action_type", "editor.action_type_help", S`
              <select
                data-action-key=${e.key}
                .value=${n}
                aria-label=${R(this.hass, "editor.action_type")}
                @change=${(t) => this._actionTypeChanged(e.key, t)}
              >
                ${Dr.map((e) => S`<option value=${e} ?selected=${e === n}>
                      ${R(this.hass, `editor.action.${e}`)}
                    </option>`)}
              </select>
            `, "action-form-row")}
          ${n === "none" ? "" : S`
                ${q(this.hass, "editor.action_entity", "editor.action_entity_help", S`
                    <ha-entity-picker
                      data-action-key=${e.key}
                      data-action-property="entity"
                      .hass=${this.hass}
                      .value=${typeof t?.entity == "string" ? t.entity : ""}
                      aria-label=${R(this.hass, "editor.action_entity")}
                      @value-changed=${(t) => this._actionEntityChanged(e.key, t)}
                    ></ha-entity-picker>
                  `, "action-form-row")}
              `}
          ${n === "navigate" ? this._actionTextField(e.key, "navigation_path", "editor.navigation_path") : ""}
          ${n === "url" ? this._actionTextField(e.key, "url_path", "editor.url_path") : ""}
          ${n === "call-service" ? S`
                ${this._actionTextField(e.key, "service", "editor.service")}
                ${this._actionTargetEntityField(e.key)}
                ${this._actionTargetTextField(e.key, "area_id", "editor.service_target_area")}
                ${this._actionTargetTextField(e.key, "device_id", "editor.service_target_device")}
                ${this._actionDataField(e.key)}
              ` : ""}
        </div>
      </details>
    `;
	}
	_actionTextField(e, t, n) {
		let r = this._config[e], i = t === "service" ? r?.service ?? r?.perform_action : r?.[t];
		return q(this.hass, n, `${n}_help`, S`
        <ha-input
          data-action-key=${e}
          data-action-property=${t}
          .value=${typeof i == "string" ? i : ""}
          aria-label=${R(this.hass, n)}
          .helper=${R(this.hass, `${n}_help`)}
          helperPersistent
          @input=${(n) => this._actionPropertyChanged(e, t, n)}
        ></ha-input>
      `, "action-form-row");
	}
	_actionTargetEntityField(e) {
		let t = this._config[e];
		return q(this.hass, "editor.service_target_entity", "editor.service_target_entity_help", S`
        <ha-entity-picker
          data-action-key=${e}
          data-action-property="target_entity"
          .hass=${this.hass}
          .value=${Ar(t?.target, "entity_id")}
          aria-label=${R(this.hass, "editor.service_target_entity")}
          @value-changed=${(t) => this._actionTargetEntityChanged(e, t)}
        ></ha-entity-picker>
      `, "action-form-row");
	}
	_actionTargetTextField(e, t, n) {
		let r = this._config[e];
		return q(this.hass, n, `${n}_help`, S`
        <ha-input
          data-action-key=${e}
          data-action-property=${`target_${t}`}
          .value=${Ar(r?.target, t)}
          aria-label=${R(this.hass, n)}
          .helper=${R(this.hass, `${n}_help`)}
          helperPersistent
          @input=${(n) => this._actionTargetTextChanged(e, t, n)}
        ></ha-input>
      `, "action-form-row");
	}
	_actionDataField(e) {
		let t = this._config[e];
		return Br(this.hass, "editor.service_data", "editor.service_data_help", S`
        <ha-textarea
          data-action-key=${e}
          data-action-property="data"
          .value=${Mr(t?.data)}
          aria-label=${R(this.hass, "editor.service_data")}
          .helper=${R(this.hass, "editor.service_data_help")}
          helperPersistent
          @input=${(t) => this._actionDataChanged(e, t)}
        ></ha-textarea>
      `);
	}
	_checkboxChanged(e, t) {
		if (e === "show_support_mode") {
			this._updateConfig({
				show_support_mode: t,
				sections: Mi(this._config.sections, t)
			});
			return;
		}
		this._updateConfig({ [e]: t });
	}
	_selectOptionChanged(e, t) {
		this._updateConfig({ [e]: t });
	}
	_iconColorChanged(e, t) {
		let n = Jr(t), r = { ...this._config.icon_colors };
		n ? r[e] = n : delete r[e], this._updateConfig({ icon_colors: r });
	}
	_entityVisibilityChanged(e, t) {
		let n = new Set(this._config.hide_entities);
		t ? n.delete(e) : n.add(e), this._updateConfig({ hide_entities: [...n] });
	}
	_entityOverrideChanged(e, t) {
		this._updateConfig({ entities: Ki(this._config.entities, e, Xr(t)) });
	}
	_entityOverrideTextChanged(e, t) {
		this._updateConfig({ entities: Ki(this._config.entities, e, Jr(t) || void 0) });
	}
	_actionTypeChanged(e, t) {
		let n = t.target;
		this._updateActionConfig(e, { action: n.value });
	}
	_actionEntityChanged(e, t) {
		this._updateActionConfig(e, { entity: Xr(t) });
	}
	_actionPropertyChanged(e, t, n) {
		let r = Jr(n);
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
		this._updateActionTarget(e, "entity_id", Xr(t));
	}
	_actionTargetTextChanged(e, t, n) {
		this._updateActionTarget(e, t, Jr(n));
	}
	_updateActionTarget(e, t, n) {
		this._updateActionConfig(e, { target: jr(this._config[e]?.target, t, n) });
	}
	_actionDataChanged(e, t) {
		let n = t.target, r = Nr(typeof n.value == "string" ? n.value : "");
		n.classList.toggle("invalid", !r.valid), n.toggleAttribute("aria-invalid", !r.valid), r.valid && this._updateActionConfig(e, { data: r.value });
	}
	_updateActionConfig(e, t) {
		let n = this._config[e], r = kr(e, {
			...n,
			...t
		});
		this._updateConfig({ [e]: r });
	}
	_toggleSection(e, t) {
		this._updateConfig({ sections: hi(this._config.sections, e, t) });
	}
	_reorderSection(e, t) {
		let n = _i(this._config.sections, e, t);
		this._updateConfig({ sections: n });
	}
	_overviewEntityChanged(e, t) {
		this._updateConfig({ overview_entities: hi(this._config.overview_entities, e, t) });
	}
	_reorderOverviewEntity(e, t, n) {
		let r = vi(this._config.overview_entities, e, t, n);
		this._updateConfig({ overview_entities: r });
	}
	_setSectionEntityDragData(e, t) {
		e.dataTransfer?.setData(Li, t), e.dataTransfer && (e.dataTransfer.effectAllowed = "move");
	}
	_allowEntityDrop(e) {
		e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = "move");
	}
	_dropSectionEntity(e, t, n) {
		n.preventDefault();
		let r = n.dataTransfer?.getData(Li);
		r && this._reorderSectionEntity(e, r, t);
	}
	_reorderSectionEntityByKeyboard(e, t, n, r) {
		if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
		e.preventDefault(), e.stopPropagation();
		let i = r.indexOf(n);
		if (i < 0) return;
		let a = r[i + (e.key === "ArrowUp" ? -1 : 1)];
		a && this._reorderSectionEntity(t, n, a);
	}
	_reorderSectionEntity(e, t, n) {
		let r = this._pinnedEntityKeys(), i = this._orderedSectionEntityDefinitions(e, r, this._activeEntityKeys()).map((e) => e.key), a = _i(i, t, n);
		if (Xi(i, a)) return;
		let o = Ui(e, Ii[e] ?? []), s = { ...this._config.section_entity_order };
		Xi(a, o) ? delete s[e] : s[e] = a, this._updateConfig({ section_entity_order: s });
	}
	_updateConfig(e) {
		let t = F({
			...this._config,
			...e
		});
		Zi(this._config, t) || (this._config = t, this._emitConfigChanged(t));
	}
	static {
		this.styles = ji;
	}
	_emitConfigChanged(e) {
		this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: e },
			bubbles: !0,
			composed: !0
		}));
	}
	_pinnedEntityKeys(e = new Set(this._config.hide_entities)) {
		return /* @__PURE__ */ new Set([...e, ...this._entityOverrideKeys()]);
	}
};
J([Ue({ attribute: !1 })], Hi.prototype, "hass", void 0), J([We()], Hi.prototype, "_config", void 0), Hi = J([Be("dhe-connect-card-editor")], Hi);
function Ui(e, t) {
	let n = Vi[e] ?? [], r = new Set(n), i = new Set(t), a = n.filter((e) => i.has(e)), o = t.filter((e) => !r.has(e));
	return [...a, ...o];
}
function Wi(e, t, n) {
	if (e !== "tap_action") return n !== "none";
	if (!t) return !1;
	let r = Object.keys(t);
	return t.action !== "more-info" || r.length !== 1;
}
function Gi(e, t) {
	let n = e[t.key];
	if (typeof n == "string") return n;
	let r = e[t.domain];
	if (r && typeof r == "object" && !Array.isArray(r)) {
		let e = r[t.key];
		return typeof e == "string" ? e : "";
	}
	return "";
}
function Ki(e, t, n) {
	let r = { ...e }, i = r[t.domain];
	if (i && typeof i == "object" && !Array.isArray(i)) {
		let e = { ...i };
		delete e[t.key], Object.keys(e).length ? r[t.domain] = e : delete r[t.domain];
	}
	return n ? r[t.key] = n : delete r[t.key], r;
}
function qi(e) {
	let t = $i.get(e);
	if (t) return t;
	let n = { entity: { filter: [{ domain: e }] } };
	return $i.set(e, n), n;
}
function Ji(e, t, n, r) {
	return Yi() ? S`
      <ha-selector
        class="ha-picker-control"
        .hass=${e}
        .value=${n}
        .selector=${qi(t.domain)}
        @value-changed=${r}
      ></ha-selector>
    ` : S`
    <ha-entity-picker
      class="ha-picker-control"
      .hass=${e}
      .value=${n}
      .includeDomains=${[t.domain]}
      @value-changed=${r}
    ></ha-entity-picker>
  `;
}
function Yi() {
	return typeof customElements < "u" && !!customElements.get("ha-selector");
}
function Xi(e, t) {
	return e.length === t.length && e.every((e, n) => e === t[n]);
}
function Zi(e, t) {
	if (e === t) return !0;
	for (let n of zi) if (e[n] !== t[n]) return !1;
	for (let n of Bi) if (!Xi(e[n] ?? [], t[n] ?? [])) return !1;
	return !(e.icon_colors !== t.icon_colors && !Qi(e.icon_colors, t.icon_colors) || e.entities !== t.entities && !Qi(e.entities, t.entities) || e.section_entity_order !== t.section_entity_order && !Qi(e.section_entity_order, t.section_entity_order) || e.tap_action !== t.tap_action && !Qi(e.tap_action, t.tap_action) || e.hold_action !== t.hold_action && !Qi(e.hold_action, t.hold_action) || e.double_tap_action !== t.double_tap_action && !Qi(e.double_tap_action, t.double_tap_action));
}
function Qi(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
var $i = /* @__PURE__ */ new Map(), ea = {}, ta = Ke(class extends qe {
	constructor() {
		super(...arguments), this.ot = ea;
	}
	render(e, t) {
		return t();
	}
	update(e, [t, n]) {
		if (Array.isArray(t)) {
			if (Array.isArray(this.ot) && this.ot.length === t.length && t.every((e, t) => e === this.ot[t])) return C;
		} else if (this.ot === t) return C;
		return this.ot = Array.isArray(t) ? Array.from(t) : t, this.render(t, n);
	}
}), na = {
	search_weather_location: /* @__PURE__ */ new Set([
		"entry_id",
		"name",
		"country_id"
	]),
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
function ra(e) {
	return e?.state === "on" ? "turn_off" : "turn_on";
}
async function ia(e, t, n, r = {}) {
	let i = t.trim(), [a, o] = i.split(".", 2);
	if (!(!a || !o)) return e.callService(a, n, {
		entity_id: i,
		...r
	});
}
async function aa(e, t, n, r) {
	if (!Number.isFinite(r)) return;
	let i = G(n, "min_temp") ?? 20, a = G(n, "max_temp") ?? 60, o = G(n, "target_temp_step") ?? .5;
	return ia(e, t, "set_temperature", { temperature: Yn(Jn(r, i, a), o) });
}
async function oa(e, t, n, r) {
	return aa(e, t, n, (G(n, "temperature") ?? W(n) ?? 38) + r);
}
async function sa(e, t, n, r) {
	let i = Kn(r);
	if (i === void 0) return;
	let a = G(n, "min"), o = G(n, "max"), s = G(n, "step") ?? 1;
	return ia(e, t, "set_value", { value: Yn(Jn(i, a ?? -Infinity, o ?? Infinity), s) });
}
async function ca(e, t, n) {
	return ia(e, t, "set_value", { value: n });
}
async function la(e, t, n) {
	if (n.length !== 0) return ia(e, t, "select_option", { option: n });
}
async function ua(e, t, n) {
	let r = Kn(n);
	if (r !== void 0) return ia(e, t, "volume_set", { volume_level: Jn(r, 0, 1) });
}
async function da(e, t, n, r) {
	let i = {}, a = r ? {
		entry_id: r,
		...n
	} : n, o = na[t];
	if (o) {
		for (let [e, t] of Object.entries(a)) {
			if (!o.has(e)) continue;
			let n = t.trim();
			if (n) {
				if (e === "country_id" || e === "result_number") {
					let t = Number(n);
					if (!Number.isFinite(t)) continue;
					i[e] = t;
				} else i[e] = n;
			}
		}
		return e.callService("stiebel_dhe_connect", t, i);
	}
}
//#endregion
//#region src/interaction-controller.ts
var fa = class {
	constructor() {
		this.pendingTapTimers = /* @__PURE__ */ new Map();
	}
	handleClick(e, t) {
		e.stopPropagation();
		let n = t.entityId;
		if (!n || this.consumeSuppressedClick(n)) return;
		if (!t.hasDoubleTap) {
			t.dispatch(n, "tap");
			return;
		}
		if (this.clearPendingTap(n)) {
			t.dispatch(n, "double_tap");
			return;
		}
		let r = window.setTimeout(() => {
			this.pendingTapTimers.delete(n), t.dispatch(n, "tap");
		}, 250);
		this.pendingTapTimers.set(n, r);
	}
	handleDoubleClick(e, t) {
		e.preventDefault(), e.stopPropagation();
		let n = t.entityId;
		!n || !t.hasDoubleTap || !this.clearPendingTap(n) || t.dispatch(n, "double_tap");
	}
	handlePointerDown(e, t) {
		let n = t.entityId;
		if (!n || !t.hasHold || !pa(e)) return;
		this.clearPendingHold(), this.clearSuppressedClick();
		let r = window.setTimeout(() => {
			this.clearPendingTap(n), this.suppressedClickEntityId = n, this.pendingHold = void 0, t.dispatch(n, "hold");
		}, 500);
		this.pendingHold = {
			entityId: n,
			timer: r
		};
	}
	handlePointerEnd() {
		this.clearPendingHold(), this.suppressedClickEntityId && this.scheduleSuppressedClickReset();
	}
	clear() {
		for (let e of this.pendingTapTimers.values()) window.clearTimeout(e);
		this.pendingTapTimers.clear(), this.clearPendingHold(), this.clearSuppressedClick();
	}
	clearPendingTap(e) {
		let t = this.pendingTapTimers.get(e);
		return t !== void 0 && (window.clearTimeout(t), this.pendingTapTimers.delete(e), !0);
	}
	clearPendingHold() {
		this.pendingHold &&= (window.clearTimeout(this.pendingHold.timer), void 0);
	}
	consumeSuppressedClick(e) {
		return this.suppressedClickEntityId === e && (this.clearSuppressedClick(), !0);
	}
	scheduleSuppressedClickReset() {
		this.clearSuppressedClickResetTimer(), this.suppressedClickResetTimer = window.setTimeout(() => {
			this.suppressedClickEntityId = void 0, this.suppressedClickResetTimer = void 0;
		}, 350);
	}
	clearSuppressedClick() {
		this.suppressedClickEntityId = void 0, this.clearSuppressedClickResetTimer();
	}
	clearSuppressedClickResetTimer() {
		this.suppressedClickResetTimer !== void 0 && (window.clearTimeout(this.suppressedClickResetTimer), this.suppressedClickResetTimer = void 0);
	}
};
function pa(e) {
	return (!("button" in e) || e.button === 0) && e.isPrimary !== !1;
}
//#endregion
//#region src/state-token.ts
var ma = 256, ha = /* @__PURE__ */ new Map();
function ga(e) {
	if (typeof e != "string") return "";
	let t = ha.get(e);
	if (t !== void 0) return t;
	let n = e.trim().toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ");
	return ha.size >= ma && ha.clear(), ha.set(e, n), n;
}
//#endregion
//#region src/icon-visuals.ts
var _a = /* @__PURE__ */ new Set([
	"error_status",
	"reconnect_count",
	"last_reconnect_reason"
]), va = /* @__PURE__ */ new Set([
	"device_status",
	"device_info",
	"protocol_version",
	"product_id",
	"wlan_mac",
	"bluetooth_mac",
	"connection_state",
	"controlunit_name"
]), ya = /* @__PURE__ */ new Set(["device_status", "connection_state"]), ba = /* @__PURE__ */ new Set([
	"off",
	"idle",
	"standby"
]), xa = /* @__PURE__ */ new Set([
	"0",
	"00:00",
	"00:00:00"
]), Sa = /* @__PURE__ */ new Set([
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
]), Ca = /* @__PURE__ */ new Set([
	"false",
	"off",
	"unknown",
	"unbekannt"
]), wa = /* @__PURE__ */ new Set([
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
]), Ta = [
	"error",
	"alarm",
	"fault",
	"fehler",
	"stoerung",
	"störung"
];
function Ea(e, t, n = !0) {
	let r = Da(e, t, n);
	return [
		"icon-bubble",
		r.tone,
		`motion-${r.motion}`,
		r.animated ? "animated" : "",
		r.active ? "active" : ""
	].filter(Boolean).join(" ");
}
function Da(e, t, n = !0) {
	let r = Oa(e, t), i = Ma(e), a = !!(t && !U(t));
	return {
		tone: r,
		motion: i,
		active: !!(t && Na(e, t)),
		animated: a && n && Fa(e, t)
	};
}
function Oa(e, t) {
	let n = e.key;
	if (n === "water_heating" && Gn(t)) return "hot";
	if (ka(e)) return t && La(t.state) ? "alert" : "ok";
	if (ja(e) && t) {
		if (Ia(t.state)) return "ok";
		if (za(t.state)) return "alert";
	}
	return n === "outlet_temperature" ? "hot" : Aa(e) ? "status" : n.includes("child_safety") || n.includes("scald") || e.icon.includes("shield") ? "safety" : e.domain === "switch" && n.startsWith("wellness_") ? "wellness" : n.includes("memory") ? "memory" : n.startsWith("eco_") ? "eco" : n.includes("timer") || n.includes("duration") || n.includes("time") ? "timer" : n.includes("water") || n.includes("bath") || n.includes("flow") || n.includes("temperature") || n === "water_heating" ? "water" : n.includes("energy") || n.includes("power") || n.includes("cost") || n.includes("co2") ? "energy" : n.includes("eco") || n.includes("saving") ? "eco" : e.domain === "weather" || n === "weather_location" ? "weather" : e.domain === "media_player" ? "radio" : e.domain === "button" ? "action" : "water";
}
function ka(e) {
	return _a.has(e.key);
}
function Aa(e) {
	return va.has(e.key);
}
function ja(e) {
	return ya.has(e.key);
}
function Ma(e) {
	let t = e.key;
	return ka(e) ? "alert" : e.domain === "media_player" ? "radio" : t === "outlet_temperature" || t === "water_heating" ? "heat" : t.includes("bath") ? "water-fill" : t === "water_flow" || t.includes("flow") ? "water-flow" : t.includes("energy") || t.includes("power") || t.includes("cost") ? "energy" : t.includes("timer") || t.includes("duration") || t.includes("time") ? "timer" : e.domain === "switch" && t.startsWith("wellness_") ? "wellness" : t.startsWith("eco_") || t.includes("saving") ? "eco" : t.includes("memory") ? "memory" : e.domain === "weather" || t === "weather_location" ? "weather" : t.includes("child_safety") || t.includes("scald") || e.icon.includes("shield") ? "safety" : va.has(t) ? "status" : "water-flow";
}
function Na(e, t) {
	return e.domain === "switch" ? qn(t) : e.domain === "media_player" ? Pa(t) : e.domain === "button" ? !1 : e.domain !== "climate" || Gn(t);
}
function Pa(e) {
	return !ba.has(e.state.toLowerCase());
}
function Fa(e, t) {
	if (!t || U(t) || e.domain === "button") return !1;
	if (e.domain === "switch" || e.domain === "binary_sensor") return qn(t);
	if (e.domain === "media_player") return Pa(t);
	if (e.domain === "climate") return Gn(t);
	if (e.domain === "weather") return !0;
	let n = e.key;
	return n === "water_flow" || n === "power" ? (W(t) ?? 0) > 0 : n === "outlet_temperature" || n === "inlet_temperature" ? W(t) !== void 0 : n.includes("timer") || n.includes("duration") || n.includes("time") ? !xa.has(t.state) : n === "device_status" || n === "connection_state" ? Ia(t.state) || za(t.state) : ka(e) ? La(t.state) : !1;
}
function Ia(e) {
	let t = ga(e);
	return Sa.has(t);
}
function La(e) {
	let t = ga(e);
	return !(!t || Ia(t) || Ra(t) || Ca.has(t));
}
function Ra(e) {
	let t = Number(e);
	return Number.isFinite(t) && t === 0;
}
function za(e) {
	let t = ga(e);
	if (Ia(t) || Ra(t)) return !1;
	let n = Number(t);
	return Number.isFinite(n) ? n !== 0 : wa.has(t) || Ta.some((e) => t.includes(e));
}
//#endregion
//#region src/layout.ts
var Ba = {
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
function Va(e) {
	return e.layout_mode === "mini" ? 4 : ["panel", "kiosk"].includes(e.layout_mode) ? 10 : e.tile_size === "large" ? 9 : e.tile_size === "normal" ? 7 : 5;
}
function Ha(e) {
	return [`layout-${e.layout_mode}`, `tile-size-${e.tile_size}`].filter(Boolean);
}
function Ua(e) {
	let t = Ba[e.tile_size], n = Wa(e);
	return [
		`--dhe-overview-columns: ${e.overview_columns};`,
		`--dhe-overview-tile-height: ${t.height};`,
		n ? `--dhe-layout-icon-bubble-size: ${n};` : ""
	].filter(Boolean).join(" ");
}
function Wa(e) {
	if (e.layout_mode !== "mini" || e.tile_size !== "auto") return Ba[e.tile_size].icon;
}
//#endregion
//#region src/perf.ts
function Ga(e, t) {
	if (!Ka()) return t();
	let n = performance.now(), r = t(), i = performance.now() - n;
	return console.debug(`[dhe-connect-card][perf] ${e}: ${i.toFixed(2)}ms`), r;
}
function Ka() {
	return !1;
}
//#endregion
//#region src/overview-engine.ts
var qa = /* @__PURE__ */ new Set([
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
]), Ja = [
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
], Ya = /* @__PURE__ */ new Set([
	"unavailable",
	"unknown",
	"unbekannt"
]), Xa = [
	"delta",
	"change",
	"change_since_last",
	"difference",
	"last_delta"
], Za = [
	"change_percent",
	"delta_percent",
	"percentage_delta"
], Qa = [
	"sparkline",
	"history",
	"samples",
	"trend_values",
	"values"
], $a = /* @__PURE__ */ new Set(["water_flow", "power"]), eo = /* @__PURE__ */ new Set([
	"down",
	"decreasing",
	"falling",
	"sinkend"
]), to = /* @__PURE__ */ new Set([
	"flat",
	"neutral",
	"stable",
	"gleichbleibend"
]), no = /* @__PURE__ */ new Set([
	"rising",
	"steigend",
	"up",
	"increasing"
]), ro = class {
	get(e, t) {
		let n = co(e, t);
		if (this._entry?.signature === n) return this._entry.tiles;
		let r = io(e, t);
		return this._entry = {
			signature: n,
			tiles: r
		}, r;
	}
	clear() {
		this._entry = void 0;
	}
};
function io(e, t) {
	let n = [];
	for (let r of e.config.overview_entities) {
		let { definition: i, entityId: a, state: o } = e.entity(t, r);
		e.canRender(i, o) && n.push(ao(e, i, a, o));
	}
	return n;
}
function ao(e, t, n, r) {
	let i = V(t, r, e.hass), a = H(e.hass, r), o = oo(t), s = so(t, r), c = uo(e.hass, r), l = fo(e.hass, r, c);
	return {
		key: t.key,
		definition: t,
		entityId: n,
		state: r,
		label: i,
		shortLabel: hn(t, e.hass, i),
		value: a,
		group: o,
		condition: s,
		iconClass: e.iconBubbleClass(t, r),
		trend: l,
		delta: c,
		sparkline: po(r)
	};
}
function oo(e) {
	let t = e.key;
	return t.includes("status") || t.includes("connection") || t.includes("reconnect") ? "status" : t.includes("energy") || t.includes("power") || t.includes("cost") || t.includes("co2") ? "energy" : t.includes("temperature") || t === "water_heating" ? "temperature" : t.includes("bath") ? "bath" : t.includes("timer") || t.includes("duration") || t.includes("time") ? "timer" : t.includes("eco") || t.includes("saving") ? "saving" : e.domain === "switch" || e.domain === "button" ? "control" : "water";
}
function so(e, t) {
	if (!t) return "neutral";
	if (e.key === "error_status" || e.key.includes("alarm")) return To(t.state) ? "alert" : "ok";
	if (e.key === "device_status" || e.key === "connection_state") return To(t.state) ? "alert" : wo(t.state) ? "ok" : "warning";
	if (e.domain === "switch" || e.domain === "binary_sensor") return t.state === "on" ? "active" : "idle";
	let n = W(t);
	return n !== void 0 && $a.has(e.key) ? n > 0 ? "active" : "idle" : "neutral";
}
function co(e, t) {
	let n = [
		e.hass.locale?.language ?? "",
		go(e.config.show_diagnostics),
		go(e.config.show_dangerous_actions),
		go(e.config.show_optional),
		go(e.config.show_unavailable)
	];
	for (let r of e.config.overview_entities) {
		let { definition: i, entityId: a, state: o } = e.entity(t, r);
		n.push(i.key, a ?? "", go(e.canRender(i, o)), e.iconBubbleClass(i, o), o?.state ?? "", vo(o, "friendly_name"), vo(o, "unit_of_measurement"), ho(o, [
			"trend",
			"trend_direction",
			"trendDirection"
		]) ?? "", _o(mo(o, Xa)), _o(mo(o, Za)), lo(o));
	}
	return n.join("");
}
function lo(e) {
	let t = yo(e, Qa);
	return t?.length ? `${t.length}:${t.join(",")}` : "";
}
function uo(e, t) {
	let n = mo(t, Xa), r = mo(t, Za), i = n ?? r;
	if (i === void 0) return;
	let a = i > 0 ? "+" : "", o = r !== void 0 && n === void 0 ? "%" : typeof t?.attributes.unit_of_measurement == "string" ? ` ${t.attributes.unit_of_measurement}` : "";
	return R(e, "overview.delta", { value: `${a}${Do(i)}${o}` });
}
function fo(e, t, n) {
	let r = bo(t) ?? xo(t);
	if (r) return {
		direction: r,
		icon: r === "up" ? "mdi:trending-up" : r === "down" ? "mdi:trending-down" : "mdi:trending-neutral",
		label: n ?? R(e, `overview.trend.${r}`)
	};
}
function po(e) {
	let t = yo(e, Qa);
	if (!(!t || t.length < 2)) return {
		values: t,
		points: Co(t)
	};
}
function mo(e, t) {
	if (e) for (let n of t) {
		let t = Eo(e.attributes[n]);
		if (t !== void 0) return t;
	}
}
function ho(e, t) {
	if (e) for (let n of t) {
		let t = e.attributes[n];
		if (typeof t == "string" && t.trim()) return t;
	}
}
function go(e) {
	return e ? "1" : "0";
}
function _o(e) {
	return e === void 0 ? "" : String(e);
}
function vo(e, t) {
	if (!e?.attributes || typeof e.attributes != "object" || Array.isArray(e.attributes)) return "";
	let n = e.attributes[t];
	return typeof n == "string" ? n : "";
}
function yo(e, t) {
	if (e) for (let n of t) {
		let t = So(e.attributes[n]);
		if (t?.length) return t;
	}
}
function bo(e) {
	let t = ga(ho(e, [
		"trend",
		"trend_direction",
		"trendDirection"
	]));
	if (t) {
		if (eo.has(t)) return "down";
		if (to.has(t)) return "flat";
		if (no.has(t)) return "up";
	}
}
function xo(e) {
	let t = mo(e, Xa) ?? mo(e, Za);
	if (t !== void 0) return t > 0 ? "up" : t < 0 ? "down" : "flat";
}
function So(e) {
	if (!Array.isArray(e)) return;
	let t = e.map((e) => Eo(e)).filter((e) => e !== void 0);
	return t.length >= 2 ? t.slice(-18) : void 0;
}
function Co(e) {
	let t = Math.min(...e), n = Math.max(...e) - t || 1, r = e.length > 1 ? 100 / (e.length - 1) : 100;
	return e.map((e, i) => `${Number((i * r).toFixed(2))},${Number((22 - (e - t) / n * 18).toFixed(2))}`).join(" ");
}
function wo(e) {
	return qa.has(ga(e));
}
function To(e) {
	let t = ga(e);
	if (!t) return !1;
	if (Ya.has(t)) return !0;
	if (wo(t)) return !1;
	let n = Number(t);
	return Number.isFinite(n) ? n !== 0 : Ja.some((e) => t.includes(e));
}
function Eo(e) {
	let t = typeof e == "number" ? e : typeof e == "string" ? Number(e) : NaN;
	return Number.isFinite(t) ? t : void 0;
}
function Do(e) {
	return Number(e.toFixed(+(Math.abs(e) < 10))).toString();
}
//#endregion
//#region src/render-overview.ts
function Oo(e, t, n) {
	let r = n ?? io(e, t);
	return r.length ? S`
    <section class="card-section" data-section="overview">
      <div
        class="metric-grid"
        style=${Ua(e.config)}
      >
        ${O(r, (e) => e.key, (t) => ko(e, t))}
      </div>
    </section>
  ` : w;
}
function ko(e, t) {
	return S`
    <button
      class=${Ao(t)}
      type="button"
      data-overview-key=${t.key}
      data-overview-group=${t.group}
      data-overview-condition=${t.condition}
      ?disabled=${!t.entityId}
      title=${t.label}
      aria-label=${`${t.label}: ${t.value}`}
      @click=${(n) => e.handleTap(n, t.entityId)}
      @dblclick=${(n) => e.handleDoubleTap(n, t.entityId)}
      @pointerdown=${(n) => e.startHold(n, t.entityId)}
      @pointerup=${e.cancelHold}
      @pointerleave=${e.cancelHold}
      @pointercancel=${e.cancelHold}
    >
      <div class=${t.iconClass}>
        <ha-icon icon=${t.definition.icon}></ha-icon>
      </div>
      <span class="metric-label" title=${t.label}>${t.shortLabel}</span>
      <strong class="metric-value">${t.value}</strong>
      ${t.trend ? S`
            <span class=${`overview-trend trend-${t.trend.direction}`}>
              <ha-icon icon=${t.trend.icon}></ha-icon>
              <span class=${t.delta ? "overview-delta" : ""}>${t.trend.label}</span>
            </span>
          ` : w}
      ${t.sparkline ? S`
            <svg
              class="overview-sparkline"
              viewBox="0 0 100 24"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polyline points=${t.sparkline.points}></polyline>
            </svg>
          ` : w}
    </button>
  `;
}
function Ao(e) {
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
//#endregion
//#region src/radio-favorites.ts
function jo(e) {
	let t = Array.isArray(e.attributes.source_list) ? e.attributes.source_list.map(String).filter(Boolean) : [], n = Mo(e), r = typeof e.attributes.source == "string" ? e.attributes.source : "", i = t.map((e) => {
		let t = B(e) || e;
		return {
			id: n.find((n) => No(n, e, t))?.id,
			label: t,
			source: e,
			active: e === r
		};
	});
	return i.length ? Po(i) : Po(n.map((e) => ({
		id: e.id,
		label: e.label,
		source: e.source,
		active: e.source === r || e.label === B(r)
	})));
}
function Mo(e) {
	return Array.isArray(e.attributes.favorites) ? e.attributes.favorites.flatMap((e) => {
		if (!e || typeof e != "object") return [];
		let t = e, n = t.id ?? t.Id, r = t.name ?? t.Name, i = String(r ?? n ?? "").trim(), a = B(i) || i;
		return a ? [{
			id: n === void 0 ? void 0 : String(n),
			label: a,
			source: i
		}] : [];
	}) : [];
}
function No(e, t, n) {
	if (e.label === n) return !0;
	let r = B(t);
	return e.label === r || !!(e.id && r.includes(`(${e.id})`));
}
function Po(e) {
	let t = /* @__PURE__ */ new Set();
	return e.filter((e) => {
		let n = `${e.source}:${e.id ?? ""}`;
		return !t.has(n) && (t.add(n), !0);
	});
}
//#endregion
//#region src/render-radio.ts
var Fo = [
	{
		service: "media_previous_track",
		tooltipKey: "tooltip.previous",
		icon: "mdi:skip-previous"
	},
	{
		service: "media_play",
		tooltipKey: "tooltip.play",
		icon: "mdi:play"
	},
	{
		service: "media_pause",
		tooltipKey: "tooltip.pause",
		icon: "mdi:pause"
	},
	{
		service: "media_next_track",
		tooltipKey: "tooltip.next",
		icon: "mdi:skip-next"
	}
];
function Io(e) {
	let t = Array.isArray(e.state.attributes.source_list) ? e.state.attributes.source_list.map(String) : [], n = typeof e.state.attributes.media_title == "string" && B(e.state.attributes.media_title) || H(e.hass, e.state), r = B(e.state.attributes.source) || B(e.state.state), i = jo(e.state);
	return S`
    <section class="card-section" data-section="radio">
      <h3>${z("radio", e.hass)}</h3>
      <div class="media-row ${e.mediaBusy ? "busy" : ""}" aria-busy=${String(e.mediaBusy)}>
        <button
          class="media-main entity-action"
          type="button"
          aria-label=${`${n}: ${r}`}
          @click=${e.actions.tap}
          @dblclick=${e.actions.doubleTap}
          @pointerdown=${e.actions.startHold}
          @pointerup=${e.actions.cancelHold}
          @pointerleave=${e.actions.cancelHold}
          @pointercancel=${e.actions.cancelHold}
        >
          <div class=${e.iconClass}><ha-icon icon="mdi:radio"></ha-icon></div>
          <div class="main">
            <strong>${n}</strong>
            <span>${r}</span>
          </div>
        </button>
        ${Fo.map((t) => Lo(e, t))}
      </div>
      ${Ro(e, t)}
      ${zo(e, i)}
    </section>
  `;
}
function Lo(e, t) {
	let n = e.serviceBusy(t.service), r = R(e.hass, t.tooltipKey);
	return S`
    <button
      class="icon"
      title=${r}
      aria-label=${r}
      ?disabled=${n}
      aria-busy=${String(n)}
      @click=${() => e.actions.callService(t.service)}
    >
      <ha-icon icon=${t.icon}></ha-icon>
    </button>
  `;
}
function Ro(e, t) {
	return S`
    <div class="inline-control ${e.sourceBusy || e.volumeBusy ? "busy" : ""}">
      <select
        ?disabled=${e.sourceBusy}
        aria-label=${R(e.hass, "field.radio_source")}
        aria-busy=${String(e.sourceBusy)}
        @change=${e.actions.selectSource}
      >
        ${t.map((t) => S`<option value=${t} ?selected=${t === e.state.attributes.source}>
              ${B(t) || t}
            </option>`)}
      </select>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        .value=${String(e.state.attributes.volume_level ?? 0)}
        ?disabled=${e.volumeBusy}
        aria-label=${R(e.hass, "field.volume")}
        aria-busy=${String(e.volumeBusy)}
        @change=${e.actions.setVolume}
      />
    </div>
  `;
}
function zo(e, t) {
	return t.length ? S`
    <div class="radio-favorites">
      <h4>${R(e.hass, "section.radio_favorites")}</h4>
      <div
        class="favorite-list"
        role="list"
        aria-label=${R(e.hass, "section.radio_favorites")}
      >
        ${t.map((t) => S`
            <div class="favorite-item" role="listitem">
              <button
                class="favorite-row ${t.active ? "active" : ""}"
                type="button"
                title=${t.label}
                aria-label=${t.label}
                aria-pressed=${String(t.active)}
                ?disabled=${e.sourceBusy}
                aria-busy=${String(e.sourceBusy)}
                @click=${() => e.actions.selectSourceByName(t.source)}
              >
                <div class="favorite-icon"><ha-icon icon="mdi:star"></ha-icon></div>
                <span>${t.label}</span>
                ${t.id ? S`<small>#${t.id}</small>` : w}
              </button>
            </div>
          `)}
      </div>
    </div>
  ` : w;
}
//#endregion
//#region src/rendering.ts
function Y(e) {
	return e !== w && e != null && e !== "";
}
//#endregion
//#region src/service-call-guard.ts
var Bo = class {
	constructor(e = () => void 0) {
		this.onChange = e, this.activeKeys = /* @__PURE__ */ new Set();
	}
	isBusy(e) {
		return this.activeKeys.has(e);
	}
	isEntityBusy(e) {
		let t = `${e}:`;
		for (let e of this.activeKeys) if (e.startsWith(t)) return !0;
		return !1;
	}
	async run(e, t) {
		if (!this.activeKeys.has(e)) {
			this.activeKeys.add(e), this.emit();
			try {
				return await t();
			} finally {
				this.activeKeys.delete(e), this.emit();
			}
		}
	}
	clear() {
		this.activeKeys.size && (this.activeKeys.clear(), this.emit());
	}
	emit() {
		this.onChange(new Set(this.activeKeys));
	}
};
function X(e, t) {
	return `${e}:${t}`;
}
function Vo(e) {
	return `weather:${e}`;
}
//#endregion
//#region src/weather-services.ts
var Ho = "search_weather_location", Uo = [
	{
		key: "name",
		labelKey: "field.name"
	},
	{
		key: "country_id",
		labelKey: "field.country_id"
	},
	{
		key: "result_number",
		labelKey: "field.result"
	},
	{
		key: "location_id",
		labelKey: "field.location_id"
	}
], Wo = {
	name: "",
	country_id: "34",
	result_number: "1",
	location_id: ""
}, Go = [
	"search_weather_location",
	"add_weather_favorite",
	"remove_weather_favorite",
	"toggle_weather_favorite",
	"select_weather_location"
], Ko = new Set(xt);
function qo(e, t) {
	let n = e.entity(t, "water_heating"), r = gs(ss(bs(e, "controls", [...bt, ...xt])), (n) => e.config.show_display_buttons ? ls(e, t, n) : cs(e, t, n)), i = n.entityId && n.state ? e.renderClimateControl(n.entityId, n.state) : w;
	return !Y(i) && !r.length ? w : S`
    <section class="card-section" data-section="controls">
      <h3>${R(e.hass, "section.water_heating")}</h3>
      ${i}
      ${r}
    </section>
  `;
}
function Jo(e, t) {
	return es(e, t, "bath", St);
}
function Yo(e, t) {
	return es(e, t, "timers", Ct);
}
function Xo(e, t) {
	if (e.config.show_display_buttons) return ds(e, t);
	let n = gs(j(), (n) => ps(e, t, n));
	return n.length ? S`
    <section class="card-section" data-section="memory">
      <h3>${z("memory", e.hass)}</h3>
      <div class="rows memory">${n}</div>
    </section>
  ` : w;
}
function Zo(e, t) {
	let n = rs(e, t, bs(e, "weather", ["weather", "weather_location"]));
	return n.length ? S`
    <section class="card-section" data-section="weather">
      <h3>${z("weather", e.hass)}</h3>
      ${n}
      ${e.config.show_weather_services ? vs(e, t) : w}
    </section>
  ` : w;
}
function Qo(e, t) {
	let n = rs(e, t, bs(e, "actions", wt));
	return n.length ? S`
    <section class="card-section" data-section="actions">
      <h3>${z("actions", e.hass)}</h3>
      <div class="rows">${n}</div>
    </section>
  ` : w;
}
function $o(e, t, n) {
	let r = gs(ys(e, n, ut[n] ?? []), (n) => is(e, t, n.key));
	return r.length ? S`
    <section class="card-section" data-section=${n}>
      <h3>${z(n, e.hass)}</h3>
      <div class="rows">${r}</div>
    </section>
  ` : w;
}
function es(e, t, n, r) {
	let i = bs(e, n, r);
	return e.config.show_display_buttons ? ns(e, z(n, e.hass), t, i, n) : ts(e, z(n, e.hass), t, i, n);
}
function ts(e, t, n, r, i) {
	let a = rs(e, n, r);
	return a.length ? S`
    <section class="card-section" data-section=${i}>
      <h3>${t}</h3>
      <div class="rows">${a}</div>
    </section>
  ` : w;
}
function ns(e, t, n, r, i) {
	let a = as(e, n, r, i);
	return Y(a) ? S`
    <section class="card-section" data-section=${i}>
      <h3>${t}</h3>
      ${a}
    </section>
  ` : w;
}
function rs(e, t, n) {
	return gs(n, (n) => is(e, t, n));
}
function is(e, t, n) {
	let r = e.entity(t, n);
	if (!e.canRender(r.definition, r.state)) return w;
	let i = V(r.definition, r.state, e.hass), a = H(e.hass, r.state), o = e.renderRowControl(r.definition, r.entityId, r.state), s = e.isEntityBusy(r.entityId), c = `${i}: ${a}`;
	return S`
    <div
      class="entity-row ${s ? "busy" : ""}"
      data-entity-key=${r.definition.key}
      aria-busy=${String(s)}
    >
      ${us(e, r.entityId, "entity-main entity-action", c, S`
          <div class=${e.iconBubbleClass(r.definition, r.state)}>
            <ha-icon icon=${r.definition.icon}></ha-icon>
          </div>
          <div class="main">
            <strong>${i}</strong>
            <span>${a}</span>
          </div>
        `)}
      ${Y(o) ? S`<div class="row-control">${o}</div>` : w}
    </div>
  `;
}
function as(e, t, n, r) {
	let i = gs(n, (n) => os(e, t, n));
	return i.length ? S`<div class="display-button-grid ${r}">${i}</div>` : w;
}
function os(e, t, n) {
	let r = e.entity(t, n);
	if (!e.canRender(r.definition, r.state)) return w;
	let i = V(r.definition, r.state, e.hass), a = H(e.hass, r.state), o = e.renderRowControl(r.definition, r.entityId, r.state), s = r.state ? qn(r.state) : !1, c = e.isEntityBusy(r.entityId), l = `${i}: ${a}`;
	return S`
    <div
      class="display-button-tile ${s ? "active" : ""} ${c ? "busy" : ""}"
      data-entity-key=${r.definition.key}
      aria-busy=${String(c)}
    >
      ${us(e, r.entityId, "display-button-main entity-action", l, S`
          <div class=${e.iconBubbleClass(r.definition, r.state)}>
            <ha-icon icon=${r.definition.icon}></ha-icon>
          </div>
          <span>${i}</span>
          <strong>${a}</strong>
        `)}
      ${Y(o) ? S`<div class="display-button-control">${o}</div>` : w}
    </div>
  `;
}
function ss(e) {
	let t = [];
	for (let n of e) {
		let e = Ko.has(n) ? "wellness" : "controls", r = t[t.length - 1];
		r && r.group === e ? r.keys.push(n) : t.push({
			group: e,
			keys: [n]
		});
	}
	return t;
}
function cs(e, t, n) {
	let r = rs(e, t, n.keys);
	if (!r.length) return w;
	let i = S`<div class=${n.group === "wellness" ? "rows entity-list wellness" : "rows entity-list"}>${r}</div>`;
	return n.group === "wellness" ? S`
    <div class="subsection">
      <h4>${R(e.hass, "section.wellness")}</h4>
      ${i}
    </div>
  ` : i;
}
function ls(e, t, n) {
	let r = n.group === "wellness" ? "wellness" : "controls", i = as(e, t, n.keys, r);
	return Y(i) ? n.group === "wellness" ? S`
    <div class="subsection">
      <h4>${R(e.hass, "section.wellness")}</h4>
      ${i}
    </div>
  ` : i : w;
}
function us(e, t, n, r, i) {
	return S`
    <button
      class=${n}
      type="button"
      ?disabled=${!t}
      aria-label=${r}
      @click=${(n) => e.handleTap(n, t)}
      @dblclick=${(n) => e.handleDoubleTap(n, t)}
      @pointerdown=${(n) => e.startHold(n, t)}
      @pointerup=${e.cancelHold}
      @pointerleave=${e.cancelHold}
      @pointercancel=${e.cancelHold}
    >
      ${i}
    </button>
  `;
}
function ds(e, t) {
	let n = gs(j(), (n) => fs(e, t, n));
	return n.length ? S`
    <section class="card-section" data-section="memory">
      <h3>${z("memory", e.hass)}</h3>
      <div class="display-button-grid memory-display">${n}</div>
    </section>
  ` : w;
}
function fs(e, t, n) {
	let r = hs(e, t, n);
	if (!_s(e, r)) return w;
	let { name: i, temp: a, press: o, del: s } = r, c = i.state, l = a.state, u = o.state, d = s.state, f = c && !U(c) && B(c.state) || R(e.hass, "label.memory", { slot: n }), p = l ? H(e.hass, l) : H(e.hass, u), m = o.entityId ?? a.entityId ?? i.entityId ?? s.entityId, h = l ? a.definition : o.definition, g = o.entityId, ee = s.entityId, te = g ? e.isServiceBusy(g, "press") : !1, _ = ee ? e.isServiceBusy(ee, "press") : !1, v = ms(e, o.definition, g, u, "button.apply_memory", te, "mdi:play"), ne = ms(e, s.definition, ee, d, "button.delete_memory", _, "mdi:trash-can-outline", !0), re = e.isEntityBusy(m);
	return S`
    <div
      class="display-button-tile memory-display-tile ${re ? "busy" : ""}"
      data-memory-slot=${n}
      aria-busy=${String(re)}
    >
      ${us(e, m, "display-button-main entity-action", `${f}: ${p}`, S`
          <div class=${e.iconBubbleClass(h, l ?? u)}>
            <ha-icon icon=${h.icon}></ha-icon>
          </div>
          <span>${f}</span>
          <strong>${p}</strong>
        `)}
      ${Y(v) || Y(ne) ? S`
            <div class="display-button-control memory-display-actions">
              ${v}
              ${ne}
            </div>
          ` : w}
    </div>
  `;
}
function ps(e, t, n) {
	let { name: r, temp: i, press: a, del: o } = hs(e, t, n), s = r.entityId, c = r.state, l = i.entityId, u = i.state, d = a.entityId, f = a.state, p = o.entityId, m = o.state;
	if (!_s(e, {
		name: r,
		temp: i,
		press: a,
		del: o
	})) return w;
	let h = s ? e.isServiceBusy(s, "set_value") : !1, g = l ? e.isServiceBusy(l, "set_value") : !1, ee = d ? e.isServiceBusy(d, "press") : !1, te = p ? e.isServiceBusy(p, "press") : !1, _ = [
		s,
		l,
		d,
		p
	].some((t) => e.isEntityBusy(t));
	return S`
    <div class="memory-row ${_ ? "busy" : ""}" aria-busy=${String(_)}>
      <div class=${e.iconBubbleClass(i.definition, i.state)}>
        <ha-icon icon=${i.definition.icon}></ha-icon>
      </div>
      <div class="memory-fields">
        ${s && c ? S`<input
              type="text"
              .value=${c.state}
              aria-label=${R(e.hass, "entity.memory_name", { slot: n })}
              ?disabled=${h}
              aria-busy=${String(h)}
              @change=${(t) => e.setText(s, t)}
            />` : S`<strong>${R(e.hass, "label.memory", { slot: n })}</strong>`}
        ${l && u ? S`<input
              type="number"
              min=${String(u.attributes.min ?? 20)}
              max=${String(u.attributes.max ?? 60)}
              step=${String(u.attributes.step ?? .5)}
              .value=${String(W(u) ?? "")}
              aria-label=${R(e.hass, "entity.memory_temperature", { slot: n })}
              ?disabled=${g}
              aria-busy=${String(g)}
              @change=${(t) => e.setNumber(l, u, t)}
            />` : w}
      </div>
      ${ms(e, a.definition, d, f, "button.apply_memory", ee, "mdi:play")}
      ${ms(e, o.definition, p, m, "button.delete_memory", te, "mdi:trash-can-outline", !0)}
    </div>
  `;
}
function ms(e, t, n, r, i, a, o, s = !1) {
	if (!n || !r || s && !e.config.show_dangerous_actions) return w;
	let c = R(e.hass, i);
	return S`
    <button
      class=${`icon${s ? " danger" : ""}`}
      type="button"
      title=${c}
      aria-label=${c}
      ?disabled=${a}
      aria-busy=${String(a)}
      @click=${() => e.pressButton(t, n)}
    >
      <ha-icon icon=${o}></ha-icon>
    </button>
  `;
}
function hs(e, t, n) {
	return {
		name: e.entity(t, `temperature_memory_${n}_name`),
		temp: e.entity(t, `temperature_memory_${n}_temperature`),
		press: e.entity(t, `temperature_memory_${n}`),
		del: e.entity(t, `delete_temperature_memory_${n}`)
	};
}
function gs(e, t) {
	let n = [];
	for (let r of e) {
		let e = t(r);
		Y(e) && n.push(e);
	}
	return n;
}
function _s(e, t) {
	return Object.values(t).some((t) => e.canRender(t.definition, t.state));
}
function vs(e, t) {
	let n = e.isActionBusy(Vo(e.weatherService));
	return S`
    <div class="service-box ${n ? "busy" : ""}" aria-busy=${String(n)}>
      <select
        .value=${e.weatherService}
        aria-label=${R(e.hass, "field.weather_service")}
        ?disabled=${n}
        aria-busy=${String(n)}
        @change=${(t) => {
		e.setWeatherService(t.target.value);
	}}
      >
        ${Go.map((t) => S`<option value=${t}>${R(e.hass, `service.${t}`)}</option>`)}
      </select>
      ${Uo.map((t) => xs(e, t, n))}
      <button
        class="chip"
        type="button"
        aria-label=${R(e.hass, "button.run")}
        ?disabled=${n}
        aria-busy=${String(n)}
        @click=${() => e.callWeather(t)}
      >
        ${R(e.hass, "button.run")}
      </button>
    </div>
  `;
}
function ys(e, t, n) {
	let r = e.config.section_entity_order[t];
	if (!r?.length || !n.length) return n;
	let i = new Map(n.map((e) => [e.key, e])), a = r.map((e) => i.get(e)).filter((e) => !!e);
	if (!a.length) return n;
	let o = new Set(a.map((e) => e.key));
	return [...a, ...n.filter((e) => !o.has(e.key))];
}
function bs(e, t, n) {
	let r = e.config.section_entity_order[t];
	if (!r?.length || !n.length) return n;
	let i = new Set(n), a = r.filter((e) => i.has(e));
	if (!a.length) return n;
	let o = new Set(a);
	return [...a, ...n.filter((e) => !o.has(e))];
}
function xs(e, t, n) {
	return S`
    <input
      placeholder=${R(e.hass, t.labelKey)}
      .value=${e.weatherForm[t.key]}
      aria-label=${R(e.hass, t.labelKey)}
      ?disabled=${n}
      aria-busy=${String(n)}
      @input=${(n) => e.setWeatherFormValue(t.key, n.target.value)}
    />
  `;
}
//#endregion
//#region src/render-support.ts
var Ss = {
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
}, Cs = {
	fail: "support.status.fail",
	pass: "support.status.pass",
	warn: "support.status.warn"
};
function ws(e) {
	let t = R(e.hass, "support.export");
	return S`
    <section
      class="card-section support-section"
      data-section="support"
      role="region"
      aria-labelledby="dhe-support-heading"
    >
      <h3 id="dhe-support-heading">${R(e.hass, "section.support")}</h3>
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
        <span id="dhe-support-export-hint">${R(e.hass, "support.export_hint")}</span>
      </div>
      <div class="support-grid">
        ${Ts(e)}
        ${Es(e)}
        ${Ds(e)}
        ${Os(e)}
      </div>
    </section>
  `;
}
function Ts(e) {
	let t = e.model.summary, n = e.model.checks.filter((e) => e.level === "fail").length, r = e.model.checks.filter((e) => e.level === "warn").length;
	return ks(e, "support.self_test", "dhe-support-self-test-title", "mdi:clipboard-pulse-outline", S`
      <div
        class="support-score ${n ? "fail" : r ? "warn" : "pass"}"
        role="status"
        aria-live="polite"
      >
        <strong>${n || r || t.availableEntities}</strong>
        <span>
          ${n ? R(e.hass, "support.self_test_failed") : r ? R(e.hass, "support.self_test_warn") : R(e.hass, "support.self_test_pass")}
        </span>
      </div>
      <dl class="support-stats">
        ${Z(e, "support.stat.mapped", t.mappedEntities)}
        ${Z(e, "support.stat.available", t.availableEntities)}
        ${Z(e, "support.stat.unavailable", t.unavailableEntities)}
        ${Z(e, "support.stat.missing_required", t.missingRequiredEntities)}
      </dl>
    `);
}
function Es(e) {
	let t = e.model.diagnostics;
	return ks(e, "support.integration_diagnostics", "dhe-support-diagnostics-title", "mdi:stethoscope", S`
      <dl class="support-stats">
        ${Z(e, "support.stat.device", t.deviceIdHash ?? "-")}
        ${Z(e, "support.stat.config_entry", t.configEntryIdHash ?? "-")}
        ${Z(e, "support.stat.base_entity", t.baseEntityHash ?? "-")}
        ${Z(e, "support.stat.registry", R(e.hass, t.entityRegistryAvailable ? "support.value.yes" : "support.value.no"))}
      </dl>
      ${Object.keys(t.domains).length ? S`
            <div
              class="support-domain-list"
              role="list"
              aria-label=${R(e.hass, "support.domain_distribution")}
            >
              ${O(Object.entries(t.domains), ([e]) => e, ([e, t]) => S`<span role="listitem">${e}: ${t}</span>`)}
            </div>
          ` : w}
    `);
}
function Ds(e) {
	return ks(e, "support.compatibility", "dhe-support-compatibility-title", "mdi:check-decagram-outline", S`
      <div
        class="support-checks"
        role="list"
        aria-label=${R(e.hass, "support.compatibility_list")}
      >
        ${O(e.model.checks, (e) => e.key, (t) => As(e, t))}
      </div>
    `);
}
function Os(e) {
	return ks(e, "support.entity_audit", "dhe-support-entity-audit-title", "mdi:format-list-checks", S`
      <div
        class="support-entity-list"
        role="list"
        aria-label=${R(e.hass, "support.entity_audit_list")}
      >
        ${O(e.model.entities, (e) => e.key, (t) => js(e, t))}
      </div>
    `);
}
function ks(e, t, n, r, i) {
	return S`
    <article class="support-panel" role="group" aria-labelledby=${n}>
      <h4 id=${n}>
        <ha-icon icon=${r}></ha-icon>
        ${R(e.hass, t)}
      </h4>
      ${i}
    </article>
  `;
}
function As(e, t) {
	return S`
    <div class="support-check ${t.level}" role="listitem">
      <ha-icon icon=${Ms(t.level)}></ha-icon>
      <span>${R(e.hass, Ss[t.key])}</span>
      <strong>${R(e.hass, Cs[t.level])}</strong>
      ${t.value === void 0 ? w : S`<small>${t.value}</small>`}
    </div>
  `;
}
function js(e, t) {
	let n = R(e.hass, `support.entity_status.${t.status}`), r = R(e.hass, `support.registry_status.${t.registryStatus}`);
	return S`
    <div
      class="support-entity-row ${t.status}"
      role="listitem"
      title=${t.key}
      aria-label=${`${t.key}: ${n}, ${r}`}
    >
      <span>${t.key}</span>
      <small>${t.domain}</small>
      <strong>${n}</strong>
      <small>${r}</small>
    </div>
  `;
}
function Z(e, t, n) {
	return S`
    <div>
      <dt>${R(e.hass, t)}</dt>
      <dd>${n}</dd>
    </div>
  `;
}
function Ms(e) {
	switch (e) {
		case "pass": return "mdi:check-circle-outline";
		case "warn": return "mdi:alert-circle-outline";
		case "fail": return "mdi:close-circle-outline";
	}
}
//#endregion
//#region src/status-text.ts
function Ns(e, t) {
	let n = Ps(e, t.connection);
	if (n) return R(e, "status.connection", { state: n });
	let r = Ps(e, t.device);
	if (r) return R(e, "status.device", { state: r });
	let i = Ps(e, t.error);
	return i ? R(e, "status.status", { state: i }) : t.hasBaseEntity ? R(e, "status.discovered") : R(e, "status.select_device");
}
function Ps(e, t) {
	if (!(!t || U(t))) return B(t.state) || R(e, "state.unknown");
}
//#endregion
//#region src/styles/animations.ts
var Fs = o`
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
`, Is = o`
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
`, Ls = o`
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
`, Rs = [
	Is,
	o`
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
`,
	Ls,
	Fs
];
//#endregion
//#region src/support.ts
function zs(e, t, n) {
	let r = n.deviceId ?? t.device_id, i = new Set(t.hide_entities), a = A.filter((e) => !i.has(e.key)), o = a.map((t) => Ws(e, n, t, r)), s = o.filter((e) => e.entityIdHash).length, c = o.filter((e) => e.status === "available").length, l = o.filter((e) => ["unavailable", "unknown"].includes(e.status)).length, u = o.filter((e) => !e.optional && e.status === "missing").length, d = o.filter((e) => e.optional && e.status === "missing").length, f = r ? qs(e, r).filter(([, e]) => !!(e.disabled_by || e.hidden_by || e.hidden)).length : 0, p = o.filter((e) => e.diagnostic && e.status !== "missing").length, m = {
		generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		summary: {
			knownEntities: a.length,
			mappedEntities: s,
			availableEntities: c,
			unavailableEntities: l,
			missingRequiredEntities: u,
			missingOptionalEntities: d,
			disabledOrHiddenRegistryEntities: f,
			diagnosticEntities: p
		},
		diagnostics: {
			cardType: t.type,
			deviceIdHash: Qs(n.deviceId),
			configEntryIdHash: Qs(n.configEntryId),
			baseEntityHash: Qs(n.baseEntity),
			selectedDevice: Us(e, t, n),
			entityRegistryAvailable: !!e.entities,
			deviceRegistryAvailable: !!e.devices,
			domains: Ks(e, n)
		},
		entities: o,
		checks: []
	};
	return m.checks = Gs(m), m;
}
function Bs(e, t) {
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
function Hs(e, t) {
	if (typeof document > "u" || typeof URL > "u" || typeof URL.createObjectURL != "function" || typeof Blob > "u") return;
	let n = URL.createObjectURL(new Blob([t], { type: "application/json" })), r = document.createElement("a");
	r.href = n, r.download = e, r.rel = "noopener", r.click(), window.setTimeout(() => URL.revokeObjectURL(n), 0);
}
function Us(e, t, n) {
	let r = n.deviceId ?? t.device_id;
	return r ? e.devices?.[r] ? !0 : qs(e, r).some(([, e]) => e.device_id === r) : !1;
}
function Ws(e, t, n, r) {
	let i = t.entityIds[n.key], a = (i ? [i, e.entities?.[i]] : void 0) ?? Js(e, r, n), o = a?.[0], s = a?.[1], c = Wn(e, i ?? o);
	return {
		key: n.key,
		domain: n.domain,
		optional: !!n.optional,
		diagnostic: !!n.diagnostic,
		dangerous: !!n.dangerous,
		status: Ys(c),
		registryStatus: Xs(s),
		entityIdHash: Qs(i ?? o),
		registryHash: Qs(s?.unique_id ?? s?.translation_key)
	};
}
function Gs(e) {
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
			level: Zs() ? "pass" : "warn"
		},
		{
			key: "support_export",
			level: "pass"
		}
	];
}
function Ks(e, t) {
	let n = {};
	for (let r of Object.values(t.entityIds)) {
		if (!Wn(e, r)) continue;
		let t = r.split(".", 1)[0] ?? "unknown";
		n[t] = (n[t] ?? 0) + 1;
	}
	return Object.fromEntries(Object.entries(n).sort(([e], [t]) => e.localeCompare(t)));
}
function qs(e, t) {
	return Object.entries(e.entities ?? {}).filter(([, e]) => e.platform === "stiebel_dhe_connect" ? !t || e.device_id === t : !1);
}
function Js(e, t, n) {
	if (t) return qs(e, t).find(([e, t]) => e.startsWith(`${n.domain}.`) ? Qn(n, e, t) : !1);
}
function Ys(e) {
	return e ? e.state === "unknown" ? "unknown" : U(e) ? "unavailable" : "available" : "missing";
}
function Xs(e) {
	return e ? e.disabled_by ? "disabled" : e.hidden || e.hidden_by ? "hidden" : "enabled" : "unknown";
}
function Zs() {
	return typeof customElements > "u" || !!customElements.get("dhe-connect-card");
}
function Qs(e) {
	if (!e) return;
	let t = 2166136261;
	for (let n = 0; n < e.length; n += 1) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
	return `h${(t >>> 0).toString(16).padStart(8, "0")}`;
}
//#endregion
//#region src/dhe-connect-card.ts
var $s = [...bt, ...xt], Q = class extends Re {
	constructor(...e) {
		super(...e), this._config = F({}), this._weatherService = Ho, this._weatherForm = { ...Wo }, this._busyActionKeys = /* @__PURE__ */ new Set(), this._discoveryCache = new Sr(), this._overviewTiles = new ro(), this._actions = new fa(), this._serviceCalls = new Bo((e) => {
			this._busyActionKeys = new Set(e);
		}), this._translationsChanged = () => {
			this._overviewTiles.clear(), this.requestUpdate();
		}, this._cancelHoldAction = () => {
			this._actions.handlePointerEnd();
		};
	}
	setConfig(e) {
		let t = ec(this._config);
		this._config = F(e), this._supportModelCache = void 0, this._renderableSectionsCache = void 0, ec(this._config) !== t && this.requestUpdate();
	}
	getCardSize() {
		return Va(this._config);
	}
	static getConfigElement() {
		return document.createElement("dhe-connect-card-editor");
	}
	static getStubConfig(e) {
		return {
			type: "custom:dhe-connect-card",
			device_id: tr(e, F({})).deviceId
		};
	}
	connectedCallback() {
		super.connectedCallback(), window.addEventListener(sn, this._translationsChanged);
	}
	disconnectedCallback() {
		window.removeEventListener(sn, this._translationsChanged), this._actions.clear(), this._serviceCalls.clear(), this._discoveryCache.clear(), this._overviewTiles.clear(), this._supportModelCache = void 0, this._renderableSectionsCache = void 0, super.disconnectedCallback();
	}
	render() {
		if (!this.hass) return S`<ha-card class="dhe-card">${R(void 0, "state.loading")}</ha-card>`;
		let e = Ga("discovery", () => this._discoverEntities()), t = this._entityResolver(e), n = t("water_heating"), r = n.entityId, i = Mn(this._config.name, n.definition, n.state, this.hass), a = this._sectionRenderContext(t), o = Ga("overview-tiles", () => this._overviewTiles.get(a, e)), s = Ga("section-filter", () => this._renderableSections(t, e));
		return S`
      <ha-card class=${this._cardClass()} style=${this._cardStyle()}>
        <header>
          ${this._renderActionButton(r, "title-block entity-action", i, S`
              <div class=${this._headerIconClass(n.state)}><ha-icon icon="mdi:water-thermometer"></ha-icon></div>
              <div>
                <h2>${i}</h2>
                <p>${this._statusText(e, t)}</p>
              </div>
            `)}
          ${this._renderHeaderTemperature(n.state, r)}
        </header>
        ${this._errorMessage ? S`<div class="error-banner" role="alert">${this._errorMessage}</div>` : w}

        <div
          class="content-grid"
          style=${`--dhe-section-count: ${s.length};`}
        >
          ${O(s, (e) => e, (t) => this._renderSection(a, e, t, o))}
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
			...Ha(this._config),
			`icon-theme-${this._config.icon_theme}`
		].filter(Boolean).join(" ");
	}
	_cardStyle() {
		let e = [Ua(this._config)];
		return this._config.icon_theme === "custom" && e.push(Nt(this._config.icon_colors)), e.join(" ");
	}
	_renderSection(e, t, n, r) {
		switch (n) {
			case "overview": return ta([
				r,
				this._config.layout_mode,
				this._config.tile_size,
				this._config.overview_columns
			], () => Oo(e, t, r));
			case "controls": return qo(e, t);
			case "bath": return Jo(e, t);
			case "timers": return Yo(e, t);
			case "memory": return Xo(e, t);
			case "consumption":
			case "saving": return $o(e, t, n);
			case "weather": return Zo(e, t);
			case "radio": return this._renderRadio(t, e.entity);
			case "diagnostics": return this._config.show_diagnostics ? $o(e, t, "diagnostics") : w;
			case "support": return this._config.show_support_mode ? this._renderSupportSection(t) : w;
			case "actions": return Qo(e, t);
			default: return w;
		}
	}
	_sectionRenderContext(e) {
		return {
			hass: this.hass,
			config: this._config,
			weatherService: this._weatherService,
			weatherForm: this._weatherForm,
			entity: (t, n) => e(n),
			canRender: (e, t) => this._canRender(e, t),
			iconBubbleClass: (e, t) => this._iconBubbleClass(e, t),
			renderClimateControl: (e, t) => this._climateControl(e, t),
			renderRowControl: (e, t, n) => this._rowControl(e, t, n),
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
			setNumber: (e, t, n) => {
				this._setNumber(e, t, n);
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
	_renderActionButton(e, t, n, r) {
		return S`
      <button
        class=${t}
        type="button"
        ?disabled=${!e}
        aria-label=${n}
        @click=${(t) => this._handleTapAction(t, e)}
        @dblclick=${(t) => this._handleDoubleTapAction(t, e)}
        @pointerdown=${(t) => this._startHoldAction(t, e)}
        @pointerup=${this._cancelHoldAction}
        @pointerleave=${this._cancelHoldAction}
        @pointercancel=${this._cancelHoldAction}
      >
        ${r}
      </button>
    `;
	}
	_renderHeaderTemperature(e, t) {
		let n = G(e, "temperature"), r = G(e, "current_temperature"), i = n === void 0 ? r === void 0 ? H(this.hass, e) : R(this.hass, "label.current", { value: r }) : R(this.hass, "label.target", { value: `${n}°` });
		return S`
      ${this._renderActionButton(t, "temperature entity-action", i, S`
          <strong>${n === void 0 ? H(this.hass, e) : `${n}°`}</strong>
          <span>
            ${r === void 0 ? R(this.hass, "label.target") : R(this.hass, "label.current", { value: r })}
          </span>
        `)}
    `;
	}
	_renderRadio(e, t) {
		let n = t(e, "radio"), r = n.entityId, i = n.state;
		return !this._canRender(n.definition, i) || !r || !i ? w : Io({
			hass: this.hass,
			entityId: r,
			state: i,
			iconClass: this._iconBubbleClass(n.definition, i),
			sourceBusy: this._isServiceBusy(r, "select_source"),
			volumeBusy: this._isServiceBusy(r, "volume_set"),
			mediaBusy: this._isEntityBusy(r),
			serviceBusy: (e) => this._isServiceBusy(r, e),
			actions: {
				tap: (e) => this._handleTapAction(e, r),
				doubleTap: (e) => this._handleDoubleTapAction(e, r),
				startHold: (e) => this._startHoldAction(e, r),
				cancelHold: this._cancelHoldAction,
				callService: (e) => {
					this._call(r, e);
				},
				selectSource: (e) => {
					this._selectMediaSource(r, e);
				},
				selectSourceByName: (e) => {
					this._selectMediaSourceByName(r, e);
				},
				setVolume: (e) => {
					this._setVolume(r, e);
				}
			}
		});
	}
	_renderableSections(e, t) {
		let n = tc(this._config, t, this.hass);
		if (this._renderableSectionsCache?.signature === n) return this._renderableSectionsCache.sections;
		let r = Mi(this._config.sections, this._config.show_support_mode).filter((t) => this._sectionHasRenderableContent(t, e));
		return this._renderableSectionsCache = {
			signature: n,
			sections: r
		}, r;
	}
	_sectionHasRenderableContent(e, t) {
		switch (e) {
			case "overview": return this._config.overview_entities.some((e) => this._isEntityRenderable(t, e));
			case "controls": {
				let e = t("water_heating");
				return !!(e.entityId && e.state) || this._hasRenderableEntity(t, $s);
			}
			case "bath": return this._hasRenderableEntity(t, St);
			case "timers": return this._hasRenderableEntity(t, Ct);
			case "memory": return j().some((e) => this._hasRenderableEntity(t, [
				`temperature_memory_${e}_name`,
				`temperature_memory_${e}_temperature`,
				`temperature_memory_${e}`,
				`delete_temperature_memory_${e}`
			]));
			case "consumption":
			case "saving":
			case "diagnostics": return e === "diagnostics" && !this._config.show_diagnostics ? !1 : (ut[e] ?? []).some((e) => this._isEntityRenderable(t, e.key));
			case "support": return this._config.show_support_mode;
			case "weather": return this._hasRenderableEntity(t, ["weather", "weather_location"]);
			case "radio": return this._isEntityRenderable(t, "radio");
			case "actions": return this._hasRenderableEntity(t, wt);
			default: return !1;
		}
	}
	_hasRenderableEntity(e, t) {
		return t.some((t) => this._isEntityRenderable(e, t));
	}
	_isEntityRenderable(e, t) {
		let n = e(t);
		return this._canRender(n.definition, n.state);
	}
	_climateControl(e, t) {
		let n = G(t, "temperature") ?? W(t) ?? 38, r = G(t, "min_temp") ?? 20, i = G(t, "max_temp") ?? 60, a = G(t, "target_temp_step") ?? .5, o = this._isServiceBusy(e, "set_temperature"), s = t.state === "off" ? "turn_on" : "turn_off", c = this._isServiceBusy(e, s), l = this._isEntityBusy(e);
		return S`
      <div class="climate-control ${l ? "busy" : ""}" aria-busy=${String(l)}>
        <button class="icon" type="button" title=${R(this.hass, "tooltip.decrease")} aria-label=${R(this.hass, "tooltip.decrease")} ?disabled=${o} aria-busy=${String(o)} @click=${() => this._adjustTemp(e, t, -a)}>
          <ha-icon icon="mdi:minus"></ha-icon>
        </button>
        <div class="temperature-control">
          <strong>${n} °C</strong>
          <input
            type="range"
            min=${String(r)}
            max=${String(i)}
            step=${String(a)}
            .value=${String(n)}
            aria-label=${R(this.hass, "label.target")}
            ?disabled=${o}
            aria-busy=${String(o)}
            @change=${(n) => this._setClimateFromInput(e, t, n)}
          />
        </div>
        <button class="icon" type="button" title=${R(this.hass, "tooltip.increase")} aria-label=${R(this.hass, "tooltip.increase")} ?disabled=${o} aria-busy=${String(o)} @click=${() => this._adjustTemp(e, t, a)}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
        <button class="chip" type="button" ?disabled=${c} aria-busy=${String(c)} @click=${() => this._toggleClimate(e, t)}>
          ${t.state === "off" ? R(this.hass, "button.turn_on") : R(this.hass, "button.turn_off")}
        </button>
      </div>
    `;
	}
	_rowControl(e, t, n) {
		if (!t || !n || U(n)) return w;
		switch (e.domain) {
			case "switch": {
				let r = ra(n), i = this._isServiceBusy(t, r), a = V(e, n, this.hass);
				return S`
          <button class="chip ${qn(n) ? "active" : ""}" type="button" aria-label=${a} ?disabled=${i} aria-busy=${String(i)} @click=${() => this._toggleSwitch(t, n)}>
            ${qn(n) ? R(this.hass, "button.on") : R(this.hass, "button.off")}
          </button>
        `;
			}
			case "button": {
				let r = this._isServiceBusy(t, "press");
				return S`
          <button class="chip" type="button" aria-label=${V(e, n, this.hass)} ?disabled=${r} aria-busy=${String(r)} @click=${() => this._pressButton(e, t)}>
            ${R(this.hass, "button.press")}
          </button>
        `;
			}
			case "number": {
				let r = this._isServiceBusy(t, "set_value"), i = V(e, n, this.hass);
				return S`
          <input
            class="number"
            type="number"
            min=${String(n.attributes.min ?? "")}
            max=${String(n.attributes.max ?? "")}
            step=${String(n.attributes.step ?? 1)}
            .value=${String(W(n) ?? "")}
            aria-label=${i}
            ?disabled=${r}
            aria-busy=${String(r)}
            @change=${(e) => this._setNumber(t, n, e)}
          />
        `;
			}
			case "select": return this._selectControl(t, n);
			case "text": {
				let r = this._isServiceBusy(t, "set_value"), i = V(e, n, this.hass);
				return S`
          <input
            class="text"
            type="text"
            .value=${n.state}
            aria-label=${i}
            ?disabled=${r}
            aria-busy=${String(r)}
            @change=${(e) => this._setText(t, e)}
          />
        `;
			}
			default: return w;
		}
	}
	_selectControl(e, t) {
		let n = this._isServiceBusy(e, "select_option"), r = Array.isArray(t.attributes.options) ? t.attributes.options.map(String) : [], i = B(t.attributes.friendly_name, e) || e;
		return r.length ? S`
      <select
        ?disabled=${n}
        aria-label=${i}
        aria-busy=${String(n)}
        @change=${(t) => this._selectOption(e, t)}
      >
        ${r.map((e) => S`<option value=${e} ?selected=${e === t.state}>
              ${B(e) || e}
            </option>`)}
      </select>
    ` : w;
	}
	_entity(e, t) {
		let n = lt[t] ?? rt, r = e.entityIds[t];
		return {
			definition: n,
			entityId: r,
			state: Wn(this.hass, r)
		};
	}
	_entityResolver(e) {
		let t = /* @__PURE__ */ new Map();
		return (n) => {
			let r = t.get(n);
			if (r) return r;
			let i = this._entity(e, n);
			return t.set(n, i), i;
		};
	}
	_canRender(e, t) {
		return this._config.hide_entities.includes(e.key) || e.dangerous && !this._config.show_dangerous_actions || e.diagnostic && !this._config.show_diagnostics ? !1 : t ? this._config.show_unavailable || !U(t) : !e.diagnostic && this._config.show_optional && !!e.optional;
	}
	_iconBubbleClass(e, t) {
		return Ea(e, t, this._config.show_icon_animations);
	}
	_headerIconClass(e) {
		let t = Gn(e);
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
			hasDoubleTap: _t(this._config.double_tap_action),
			hasHold: _t(this._config.hold_action),
			dispatch: (e, t) => this._fireAction(e, t)
		};
	}
	_fireAction(e, t) {
		if (!e) return;
		let n = vt(this._config, t, e);
		n && this.dispatchEvent(new CustomEvent("hass-action", {
			bubbles: !0,
			composed: !0,
			detail: {
				action: t,
				config: n
			}
		}));
	}
	_isActionBusy(e) {
		return this._busyActionKeys.has(e);
	}
	_isServiceBusy(e, t) {
		return this._isActionBusy(X(e, t));
	}
	_isEntityBusy(e) {
		return e ? this._serviceCalls.isEntityBusy(e) : !1;
	}
	_statusText(e, t) {
		return Ns(this.hass, {
			connection: t("connection_state").state,
			device: t("device_status").state,
			error: t("error_status").state,
			hasBaseEntity: !!e.baseEntity
		});
	}
	_supportModel(e) {
		let t = [
			$(e),
			this._config.show_diagnostics ? "diag1" : "diag0",
			$(this.hass?.states),
			$(this.hass?.entities),
			$(this.hass?.devices)
		].join("|");
		if (this._supportModelCache?.signature === t) return this._supportModelCache.model;
		let n = Ga("support-model", () => zs(this.hass, this._config, e));
		return this._supportModelCache = {
			signature: t,
			model: n
		}, n;
	}
	_renderSupportSection(e) {
		let t = this._supportModel(e);
		return ta([t, this.hass?.locale?.language ?? ""], () => ws({
			hass: this.hass,
			model: t,
			exportSupportPackage: () => this._exportSupportPackage(e)
		}));
	}
	async _call(e, t) {
		await this._runEntityService(e, t);
	}
	async _toggleClimate(e, t) {
		let n = t.state === "off" ? "turn_on" : "turn_off";
		await this._runEntityService(e, n);
	}
	async _toggleSwitch(e, t) {
		let n = ra(t);
		await this._runEntityService(e, n);
	}
	async _pressButton(e, t) {
		e.dangerous && !window.confirm(R(this.hass, "confirm.run", { label: V(e, void 0, this.hass) })) || await this._runEntityService(t, "press");
	}
	async _adjustTemp(e, t, n) {
		await this._runServiceCall(X(e, "set_temperature"), () => oa(this.hass, e, t, n));
	}
	async _setClimateFromInput(e, t, n) {
		await this._runServiceCall(X(e, "set_temperature"), () => oa(this.hass, e, t, Number(n.target.value) - (G(t, "temperature") ?? W(t) ?? 0)));
	}
	async _setNumber(e, t, n) {
		await this._runServiceCall(X(e, "set_value"), () => sa(this.hass, e, t, n.target.value));
	}
	async _setText(e, t) {
		await this._runServiceCall(X(e, "set_value"), () => ca(this.hass, e, t.target.value));
	}
	async _selectOption(e, t) {
		await this._runServiceCall(X(e, "select_option"), () => la(this.hass, e, t.target.value));
	}
	async _selectMediaSource(e, t) {
		await this._selectMediaSourceByName(e, t.target.value);
	}
	async _selectMediaSourceByName(e, t) {
		await this._runEntityService(e, "select_source", { source: t });
	}
	async _runEntityService(e, t, n) {
		await this._runServiceCall(X(e, t), () => ia(this.hass, e, t, n));
	}
	async _setVolume(e, t) {
		await this._runServiceCall(X(e, "volume_set"), () => ua(this.hass, e, t.target.value));
	}
	async _callWeather(e) {
		await this._runServiceCall(Vo(this._weatherService), () => da(this.hass, this._weatherService, this._weatherForm, e.configEntryId));
	}
	_exportSupportPackage(e) {
		let t = Bs(this._supportModel(e), this._config), n = JSON.stringify(t, null, 2);
		this.dispatchEvent(new CustomEvent("dhe-connect-support-package", {
			bubbles: !0,
			composed: !0,
			detail: {
				supportPackage: t,
				json: n
			}
		})), Hs(Vs(), n);
	}
	async _runServiceCall(e, t) {
		await this._serviceCalls.run(e, async () => {
			try {
				this._errorMessage = void 0, await t();
			} catch (e) {
				let t = R(this.hass, "error.action_failed", { message: e instanceof Error ? e.message : String(e) });
				this._errorMessage = t, this.dispatchEvent(new CustomEvent("hass-notification", {
					bubbles: !0,
					composed: !0,
					detail: { message: t }
				}));
			}
		});
	}
	static {
		this.styles = Rs;
	}
};
J([Ue({ attribute: !1 })], Q.prototype, "hass", void 0), J([We()], Q.prototype, "_weatherService", void 0), J([We()], Q.prototype, "_weatherForm", void 0), J([We()], Q.prototype, "_errorMessage", void 0), J([We()], Q.prototype, "_busyActionKeys", void 0), Q = J([Be("dhe-connect-card")], Q);
function ec(e) {
	return JSON.stringify(e);
}
function tc(e, t, n) {
	return [
		e.sections.join(","),
		e.overview_entities.join(","),
		ic(e.show_optional),
		ic(e.show_unavailable),
		ic(e.show_diagnostics),
		ic(e.show_dangerous_actions),
		ic(e.show_support_mode),
		String($(t)),
		String($(n?.states))
	].join("");
}
var nc = /* @__PURE__ */ new WeakMap(), rc = 1;
function $(e) {
	if (!e || typeof e != "object") return 0;
	let t = e, n = nc.get(t);
	if (n !== void 0) return n;
	let r = rc++;
	return nc.set(t, r), r;
}
function ic(e) {
	return e ? "1" : "0";
}
window.registerDheConnectCardTranslation = un, window.registerDheConnectCardTranslations = dn, window.dheConnectCardTranslations && dn(window.dheConnectCardTranslations), window.customCards = window.customCards ?? [], window.customCards.push({
	type: "dhe-connect-card",
	name: "DHE Connect Card",
	description: "Mushroom-style card for the Stiebel DHE Connect integration",
	preview: !0
});
//#endregion

//# sourceMappingURL=ha-dhe-connect-card.js.map