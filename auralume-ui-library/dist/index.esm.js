import { jsx as f, jsxs as I, Fragment as kt } from "react/jsx-runtime";
import ve, { useRef as H, useEffect as G, useState as X, forwardRef as Ir, useId as po, useMemo as h0, useCallback as st, useImperativeHandle as bo, Children as yo, cloneElement as vo, createContext as xo, useContext as _o } from "react";
const wo = (e) => {
  const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
  return t ? {
    r: parseInt(t[1], 16),
    g: parseInt(t[2], 16),
    b: parseInt(t[3], 16)
  } : null;
}, ko = (e) => {
  const t = wo(e);
  if (!t) return {};
  const n = (l, c, h, d) => ({
    r: Math.min(255, Math.round(l + (255 - l) * d)),
    g: Math.min(255, Math.round(c + (255 - c) * d)),
    b: Math.min(255, Math.round(h + (255 - h) * d))
  }), s = (l, c, h, d) => ({
    r: Math.max(0, Math.round(l * (1 - d))),
    g: Math.max(0, Math.round(c * (1 - d))),
    b: Math.max(0, Math.round(h * (1 - d)))
  }), i = n(t.r, t.g, t.b, 0.9), r = n(t.r, t.g, t.b, 0.7), a = n(t.r, t.g, t.b, 0.5), o = s(t.r, t.g, t.b, 0.3);
  return {
    base: e,
    veryLight: `rgb(${i.r}, ${i.g}, ${i.b})`,
    light: `rgb(${r.r}, ${r.g}, ${r.b})`,
    mediumLight: `rgb(${a.r}, ${a.g}, ${a.b})`,
    dark: `rgb(${o.r}, ${o.g}, ${o.b})`
  };
}, Mo = ({ question: e, answer: t, isOpen: n, onToggle: s, colorVariants: i }) => /* @__PURE__ */ I(
  "div",
  {
    className: "accordion-item",
    style: {
      "--item-bg": i.mediumLight,
      "--item-hover": i.light,
      "--item-text": i.dark,
      "--icon-color": i.dark
    },
    children: [
      /* @__PURE__ */ I(
        "button",
        {
          className: "accordion-button",
          onClick: s,
          "aria-expanded": n,
          children: [
            /* @__PURE__ */ f("h2", { className: "accordion-question", children: e }),
            /* @__PURE__ */ f(
              "svg",
              {
                className: `accordion-icon ${n ? "accordion-icon-open" : ""}`,
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: /* @__PURE__ */ f(
                  "path",
                  {
                    d: "M6 9L12 15L18 9",
                    stroke: "var(--icon-color)",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                )
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ f("div", { className: `accordion-content ${n ? "accordion-content-open" : ""}`, children: /* @__PURE__ */ f("p", { className: "accordion-answer", children: t }) })
    ]
  }
), h1 = ({
  items: e = [],
  allowMultiple: t = !1,
  className: n = "",
  showHeader: s = !0,
  color: i = "#ffff00"
}) => {
  const [r, a] = ve.useState(/* @__PURE__ */ new Set()), o = ko(i), l = (c) => {
    const h = new Set(r);
    t ? h.has(c) ? h.delete(c) : h.add(c) : h.has(c) ? h.clear() : (h.clear(), h.add(c)), a(h);
  };
  return /* @__PURE__ */ f(
    "div",
    {
      className: `accordion-container ${n}`,
      style: {
        "--acc-bg-color": o.veryLight,
        "--acc-border-color": o.mediumLight
      },
      children: /* @__PURE__ */ I("div", { className: "accordion-wrapper", children: [
        s && /* @__PURE__ */ f("div", { className: "accordion-header" }),
        /* @__PURE__ */ f("div", { className: "accordion-list", children: e.map((c, h) => /* @__PURE__ */ f(
          Mo,
          {
            question: c.question,
            answer: c.answer,
            isOpen: r.has(h),
            onToggle: () => l(h),
            colorVariants: o
          },
          h
        )) })
      ] })
    }
  );
}, d1 = ({
  year: e = (/* @__PURE__ */ new Date()).getFullYear(),
  data: t = null,
  showReflection: n = !1,
  className: s = "",
  onDayClick: i = null,
  style: r = {},
  ...a
}) => {
  const o = H(null);
  G(() => {
    const c = o.current;
    if (!c) return;
    c.innerHTML = "";
    const u = (new Date(e, 0, 1).getDay() + 6) % 7;
    for (let b = 0; b < u; b++) {
      const m = document.createElement("span");
      m.classList.add("day-empty"), c.appendChild(m);
    }
    const g = e % 4 === 0 && e % 100 !== 0 || e % 400 === 0 ? 366 : 365;
    (t || Array.from({ length: g }, () => Math.floor(Math.random() * 5))).forEach((b, m) => {
      const y = l(m + 1, e), _ = document.createElement("div");
      _.classList.add("day", `level-${b}`, `m-${y.getMonth() + 1}`), _.setAttribute("title", `${y.toDateString()} - ${b} contributions`), _.setAttribute("data-date", y.toISOString().split("T")[0]), _.setAttribute("data-level", b), i && (_.style.cursor = "pointer", _.addEventListener("click", () => {
        i({
          date: y,
          level: b,
          dateString: y.toISOString().split("T")[0]
        });
      })), c.appendChild(_);
    });
  }, [e, t, i]);
  const l = (c, h) => {
    const d = new Date(h, 0, 1);
    return d.setDate(d.getDate() + (c - 1)), d;
  };
  return /* @__PURE__ */ f(
    "div",
    {
      className: `activity-grid-wrapper ${s}`,
      style: {
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
        ...r
      },
      ...a,
      children: /* @__PURE__ */ f("div", { className: "activity-grid-container", children: /* @__PURE__ */ f("div", { id: "activity-graph", ref: o }) })
    }
  );
}, u1 = ({
  isOpen: e = !1,
  onClose: t,
  onConfirm: n,
  title: s = "Alert",
  message: i = "Are you sure you want to continue?",
  confirmText: r = "Confirm",
  cancelText: a = "Cancel",
  type: o = "default",
  // 'default', 'danger', 'warning', 'success'
  showCancel: l = !0,
  className: c = "",
  ...h
}) => {
  G(() => {
    const g = (p) => {
      p.key === "Escape" && e && t?.();
    };
    return e && (document.addEventListener("keydown", g), document.body.style.overflow = "hidden"), () => {
      document.removeEventListener("keydown", g), document.body.style.overflow = "unset";
    };
  }, [e, t]);
  const d = () => {
    n?.(), t?.();
  }, u = () => {
    t?.();
  };
  return e ? /* @__PURE__ */ f(
    "div",
    {
      className: `alert-dialog-overlay ${c}`,
      ...h,
      children: /* @__PURE__ */ I("div", { className: `alert-dialog alert-dialog--${o}`, children: [
        /* @__PURE__ */ I("div", { className: "alert-dialog__header", children: [
          /* @__PURE__ */ f("h3", { className: "alert-dialog__title", children: s }),
          /* @__PURE__ */ f(
            "button",
            {
              className: "alert-dialog__close",
              onClick: t,
              "aria-label": "Close dialog",
              children: /* @__PURE__ */ f("svg", { style: { color: "gray" }, class: "w-6 h-6 text-gray-800 dark:text-white", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", fill: "none", viewBox: "0 0 24 24", children: /* @__PURE__ */ f("path", { stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M6 18 17.94 6M18 18 6.06 6" }) })
            }
          )
        ] }),
        /* @__PURE__ */ f("div", { className: "alert-dialog__body", children: /* @__PURE__ */ f("p", { className: "alert-dialog__message", children: i }) }),
        /* @__PURE__ */ I("div", { className: "alert-dialog__footer", children: [
          l && /* @__PURE__ */ f(
            "button",
            {
              className: "alert-dialog__button alert-dialog__button--cancel",
              onClick: u,
              children: a
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              className: `alert-dialog__button alert-dialog__button--confirm alert-dialog__button--${o}`,
              onClick: d,
              children: r
            }
          )
        ] })
      ] })
    }
  ) : null;
}, f1 = ({
  children: e,
  animationType: t = "alphabetical",
  className: n = "",
  style: s = {},
  onClick: i,
  href: r,
  size: a = "medium",
  // small, medium, large, responsive
  ...o
}) => {
  const l = H(null), c = H(null), [h, d] = X(!1);
  G(() => {
    const k = () => {
      d(window.innerWidth <= 768);
    };
    return k(), window.addEventListener("resize", k), () => window.removeEventListener("resize", k);
  }, []);
  const u = (k) => {
    switch (k) {
      case "alphabetical":
        return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      case "ascii":
        return "01";
      case "pixels":
        return "█▉▊▋▌▍▎▏▐░▒▓■□▪▫▬▭▮▯°∙·‥…⁘⁙⁚⁛⁜⁝⁞";
      default:
        return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    }
  }, g = (k) => k[Math.floor(Math.random() * k.length)], p = (k, M) => Array.from({ length: k }, () => g(M)).join(""), b = (k, M) => {
    if (!c.current) return;
    c.current.style.setProperty("--x", `${k}px`), c.current.style.setProperty("--y", `${M}px`);
    const S = u(t), N = h ? 1e3 : 2e3;
    c.current.innerText = p(N, S);
  }, m = (k) => {
    if (!l.current || h) return;
    const M = l.current.getBoundingClientRect(), S = k.clientX - M.left, N = k.clientY - M.top;
    b(S, N);
  }, y = (k) => {
    if (!l.current || !k.touches[0]) return;
    const M = l.current.getBoundingClientRect(), S = k.touches[0].clientX - M.left, N = k.touches[0].clientY - M.top;
    b(S, N);
  }, _ = (k) => {
    if (!l.current || !k.touches[0]) return;
    const M = l.current.getBoundingClientRect(), S = k.touches[0].clientX - M.left, N = k.touches[0].clientY - M.top;
    b(S, N);
  }, x = (k) => {
    i && i(k);
  }, w = [
    "animated-card-hover-container",
    t,
    a,
    n
  ].filter(Boolean).join(" "), v = /* @__PURE__ */ I(
    "div",
    {
      ref: l,
      className: w,
      style: {
        ...s,
        touchAction: "none"
        // Prevent default touch behaviors
      },
      onMouseMove: m,
      onTouchStart: y,
      onTouchMove: _,
      onClick: x,
      ...o,
      children: [
        /* @__PURE__ */ f("div", { className: "animated-card-gradient" }),
        /* @__PURE__ */ f("div", { className: "animated-card-content", children: e }),
        /* @__PURE__ */ f(
          "div",
          {
            ref: c,
            className: "animated-card-bg-characters"
          }
        )
      ]
    }
  );
  return r ? /* @__PURE__ */ f("div", { className: "animated-card-wrapper", children: /* @__PURE__ */ f("a", { href: r, className: "animated-card-link", children: v }) }) : /* @__PURE__ */ f("div", { className: "animated-card-wrapper", children: v });
}, g1 = ({
  children: e,
  size: t = "medium",
  disabled: n = !1,
  loading: s = !1,
  onClick: i,
  className: r = "",
  icon: a,
  iconPosition: o = "left",
  primaryColor: l,
  secondaryColor: c,
  ...h
}) => {
  const d = H(null), u = {};
  l && (u["--primary-color"] = l), c && (u["--secondary-color"] = c);
  const g = "my-ui-btn", p = `${g}--${t}`, b = n ? `${g}--disabled` : "", m = s ? `${g}--loading` : "", y = [
    g,
    `${g}--shiny`,
    p,
    b,
    m,
    r
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ I(
    "button",
    {
      ref: d,
      className: y,
      disabled: n || s,
      onClick: (w) => {
        !n && !s && i && i(w);
      },
      style: u,
      ...h,
      children: [
        s ? /* @__PURE__ */ I(kt, { children: [
          /* @__PURE__ */ f("span", { className: `${g}__spinner` }),
          /* @__PURE__ */ f("span", { className: `${g}__text ${g}__text--loading`, children: e })
        ] }) : a ? /* @__PURE__ */ I(kt, { children: [
          o === "left" && /* @__PURE__ */ f("span", { className: `${g}__icon`, children: a }),
          /* @__PURE__ */ f("span", { className: `${g}__text`, children: e }),
          o === "right" && /* @__PURE__ */ f("span", { className: `${g}__icon`, children: a })
        ] }) : /* @__PURE__ */ f("span", { className: `${g}__text`, children: e }),
        /* @__PURE__ */ f("span", { className: `${g}__shiny-shimmer` }),
        /* @__PURE__ */ f("span", { className: `${g}__shiny-glow` })
      ]
    }
  );
}, So = ({
  src: e,
  alt: t = "Avatar",
  size: n = "medium",
  variant: s = "circle",
  fallback: i,
  className: r = "",
  onClick: a,
  ...o
}) => {
  const l = `avatar-${n}`, c = `avatar-${s}`, h = (u) => {
    i ? u.target.src = i : (u.target.style.display = "none", u.target.nextSibling.style.display = "flex");
  }, d = (u) => u ? u.split(" ").map((g) => g.charAt(0)).join("").substring(0, 2).toUpperCase() : "?";
  return /* @__PURE__ */ f(
    "div",
    {
      className: `avatar ${l} ${c} ${r}`,
      onClick: a,
      ...o,
      children: e ? /* @__PURE__ */ I(kt, { children: [
        /* @__PURE__ */ f(
          "img",
          {
            src: e,
            alt: t,
            onError: h,
            className: "avatar-image"
          }
        ),
        /* @__PURE__ */ f("div", { className: "avatar-fallback", style: { display: "none" }, children: i ? /* @__PURE__ */ f("img", { src: i, alt: t, className: "avatar-image" }) : /* @__PURE__ */ f("span", { className: "avatar-initials", children: d(t) }) })
      ] }) : /* @__PURE__ */ f("div", { className: "avatar-fallback", children: i ? /* @__PURE__ */ f("img", { src: i, alt: t, className: "avatar-image" }) : /* @__PURE__ */ f("span", { className: "avatar-initials", children: d(t) }) })
    }
  );
}, m1 = ({
  avatars: e = [],
  max: t = 5,
  size: n = "medium",
  variant: s = "circle",
  spacing: i = "normal",
  showMore: r = !0,
  className: a = "",
  onAvatarClick: o,
  onMoreClick: l,
  ...c
}) => {
  const h = e.slice(0, t), d = e.length - t, u = `avatar-group-${i}`;
  return /* @__PURE__ */ I(
    "div",
    {
      className: `avatar-group ${u} ${a}`,
      ...c,
      children: [
        h.map((g, p) => /* @__PURE__ */ I(
          "div",
          {
            className: "avatar-group-item",
            style: { zIndex: h.length - p },
            children: [
              /* @__PURE__ */ f(
                So,
                {
                  src: g.src,
                  alt: g.alt || g.name,
                  size: n,
                  variant: s,
                  fallback: g.fallback,
                  onClick: () => o && o(g, p)
                }
              ),
              (g.name || g.alt) && /* @__PURE__ */ f("div", { className: "avatar-tooltip", children: g.name || g.alt })
            ]
          },
          g.id || p
        )),
        d > 0 && r && /* @__PURE__ */ f(
          "div",
          {
            className: `avatar avatar-${n} avatar-${s} avatar-more`,
            onClick: () => l && l(d),
            style: { zIndex: 0 },
            children: /* @__PURE__ */ I("span", { className: "avatar-more-text", children: [
              "+",
              d
            ] })
          }
        )
      ]
    }
  );
}, p1 = ({
  onSignIn: e = () => {
  },
  onSignUp: t = () => {
  },
  onSocialLogin: n = () => {
  },
  enableSocialLogin: s = !0,
  className: i = "",
  color: r = "#000000",
  ...a
}) => {
  const [o, l] = X(!1), [c, h] = X({
    name: "",
    email: "",
    password: ""
  }), d = (y) => {
    const _ = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(y);
    return _ ? {
      r: parseInt(_[1], 16),
      g: parseInt(_[2], 16),
      b: parseInt(_[3], 16)
    } : null;
  }, u = (y, _) => {
    const x = d(y);
    if (!x) return y;
    const w = (v) => {
      const k = v + (255 - v) * (_ / 100);
      return Math.min(255, Math.max(0, Math.round(k)));
    };
    if (_ > 0)
      return `#${w(x.r).toString(16).padStart(2, "0")}${w(x.g).toString(16).padStart(2, "0")}${w(x.b).toString(16).padStart(2, "0")}`;
    {
      const v = (k) => {
        const M = k * (1 + _ / 100);
        return Math.min(255, Math.max(0, Math.round(M)));
      };
      return `#${v(x.r).toString(16).padStart(2, "0")}${v(x.g).toString(16).padStart(2, "0")}${v(x.b).toString(16).padStart(2, "0")}`;
    }
  };
  G(() => {
    const y = document.documentElement, _ = d(r);
    y.style.setProperty("--form-bg-color", "#FFFFFF"), y.style.setProperty("--form-text-primary", r), y.style.setProperty("--form-text-secondary", u(r, 30)), y.style.setProperty("--form-text-color", "#FFFFFF"), y.style.setProperty("--form-input-color", u(r, 90)), y.style.setProperty("--form-focus-color", u(r, 80)), y.style.setProperty("--form-btn-color", r), y.style.setProperty("--form-btn-hover", u(r, -20)), y.style.setProperty("--form-btn-border", u(r, 40)), y.style.setProperty("--form-social-border", u(r, 70)), y.style.setProperty("--form-social-bg", "#FFFFFF"), y.style.setProperty("--form-social-hover", u(r, 95)), y.style.setProperty("--form-shadow-color", `rgba(${_?.r || 0}, ${_?.g || 0}, ${_?.b || 0}, 0.25)`), y.style.setProperty("--form-shadow-light", `rgba(${_?.r || 0}, ${_?.g || 0}, ${_?.b || 0}, 0.22)`);
  }, [r]);
  const g = (y) => {
    h({
      ...c,
      [y.target.name]: y.target.value
    });
  }, p = (y, _) => {
    y.preventDefault(), _ === "signin" ? e({ email: c.email, password: c.password }) : t(c);
  }, b = (y) => {
    n(y);
  }, m = () => s && /* @__PURE__ */ I("div", { className: "auth-social-container", children: [
    /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        className: "auth-social",
        onClick: () => b("facebook"),
        "aria-label": "Sign in with Facebook",
        children: /* @__PURE__ */ f("i", { className: "fab fa-facebook-f" })
      }
    ),
    /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        className: "auth-social",
        onClick: () => b("google"),
        "aria-label": "Sign in with Google",
        children: /* @__PURE__ */ f("i", { className: "fab fa-google-plus-g" })
      }
    ),
    /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        className: "auth-social",
        onClick: () => b("linkedin"),
        "aria-label": "Sign in with LinkedIn",
        children: /* @__PURE__ */ f("i", { className: "fab fa-linkedin-in" })
      }
    )
  ] });
  return /* @__PURE__ */ f("div", { className: `auth-container ${i}`, ...a, children: /* @__PURE__ */ f("div", { className: "auth-form-wrapper", children: /* @__PURE__ */ I(
    "form",
    {
      className: "auth-form",
      onSubmit: (y) => p(y, o ? "signup" : "signin"),
      children: [
        /* @__PURE__ */ f("h1", { children: o ? "Create Account" : "Sign In" }),
        /* @__PURE__ */ f(m, {}),
        s && /* @__PURE__ */ I("span", { className: "auth-divider", children: [
          "or use your email ",
          o ? "for registration" : ""
        ] }),
        o && /* @__PURE__ */ f(
          "input",
          {
            type: "text",
            name: "name",
            placeholder: "Name",
            value: c.name,
            onChange: g,
            required: !0
          }
        ),
        /* @__PURE__ */ f(
          "input",
          {
            type: "email",
            name: "email",
            placeholder: "Email",
            value: c.email,
            onChange: g,
            required: !0
          }
        ),
        /* @__PURE__ */ f(
          "input",
          {
            type: "password",
            name: "password",
            placeholder: "Password",
            value: c.password,
            onChange: g,
            required: !0
          }
        ),
        !o && /* @__PURE__ */ f("a", { href: "#", className: "auth-forgot-password", children: "Forgot your password?" }),
        /* @__PURE__ */ f("button", { type: "submit", className: "auth-submit-btn", children: o ? "Sign Up" : "Sign In" }),
        /* @__PURE__ */ I("div", { className: "auth-toggle", children: [
          /* @__PURE__ */ f("span", { children: o ? "Already have an account?" : "Don't have an account?" }),
          /* @__PURE__ */ f(
            "button",
            {
              type: "button",
              className: "auth-toggle-btn",
              onClick: () => l(!o),
              children: o ? "Sign In" : "Sign Up"
            }
          )
        ] })
      ]
    }
  ) }) });
}, Co = Ir(({
  children: e,
  variant: t = "default",
  size: n = "md",
  rounded: s = !1,
  closable: i = !1,
  tagged: r = !1,
  className: a = "",
  onClose: o,
  ...l
}, c) => {
  const h = "badge", d = `badge--${t}`, u = `badge--${n}`, m = [
    h,
    d,
    u,
    s ? "badge--rounded" : "",
    i ? "badge--closable" : "",
    r ? "badge--tagged" : "",
    a
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ I(
    "span",
    {
      ref: c,
      className: m,
      ...l,
      children: [
        r && /* @__PURE__ */ f("span", { className: "badge__tag-icon", "aria-hidden": "true", children: /* @__PURE__ */ f("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ f("path", { d: "M21.41 11.58L12.41 2.58A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 .59 1.42l9 9A2 2 0 0 0 13 22a2 2 0 0 0 1.41-.59l7-7A2 2 0 0 0 21.41 11.58zM7 9a2 2 0 1 1 2-2A2 2 0 0 1 7 9z" }) }) }),
        /* @__PURE__ */ f("span", { className: "badge__content", children: e }),
        i && /* @__PURE__ */ f(
          "button",
          {
            type: "button",
            className: "badge__close",
            onClick: (_) => {
              _.stopPropagation(), o && o(_);
            },
            "aria-label": "Remove badge",
            children: /* @__PURE__ */ f("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ f("path", { d: "M18.36 6.64a1 1 0 0 1 0 1.41L13.41 13l4.95 4.95a1 1 0 1 1-1.41 1.41L12 14.41l-4.95 4.95a1 1 0 0 1-1.41-1.41L10.59 13 5.64 8.05a1 1 0 0 1 1.41-1.41L12 11.59l4.95-4.95a1 1 0 0 1 1.41 0z" }) })
          }
        )
      ]
    }
  );
});
Co.displayName = "Badge";
const b1 = ({
  items: e = [],
  theme: t = "breadcrumb-light",
  separator: n = "fa-caret-right",
  color: s = null,
  onItemClick: i,
  className: r = "",
  ...a
}) => {
  const o = (c, h, d) => {
    i && i(c, h, d);
  };
  if (!e || e.length === 0)
    return null;
  const l = s ? {
    "--main-color": s,
    "--hover-color": s
  } : {};
  return /* @__PURE__ */ f(
    "div",
    {
      className: `breadcrumb-wrapper ${t} ${r}`,
      style: l,
      ...a,
      children: /* @__PURE__ */ f("nav", { className: "breadcrumb-nav", children: e.map((c, h) => /* @__PURE__ */ I("div", { className: "breadcrumb-wrap", children: [
        h > 0 && /* @__PURE__ */ f("span", { className: "sep", children: /* @__PURE__ */ f("i", { className: `fa ${n}` }) }),
        /* @__PURE__ */ f("span", { className: "breadcrumb", children: c.href ? /* @__PURE__ */ f(
          "a",
          {
            href: c.href,
            onClick: (d) => o(c, h, d),
            title: c.label,
            children: c.label
          }
        ) : /* @__PURE__ */ f(
          "span",
          {
            onClick: (d) => o(c, h, d),
            title: c.label,
            style: { cursor: c.onClick || i ? "pointer" : "default" },
            children: c.label
          }
        ) })
      ] }, h)) })
    }
  );
}, y1 = ({
  children: e,
  variant: t = "primary",
  size: n = "medium",
  disabled: s = !1,
  loading: i = !1,
  onClick: r,
  className: a = "",
  icon: o,
  iconPosition: l = "left",
  glitchText: c,
  shimmerEffect: h = "spin",
  hoverText: d,
  dataHover: u,
  svgUrl: g,
  // New color props
  btnColor: p,
  btnTextColor: b,
  btnHoverColor: m,
  btnBorderColor: y,
  btnBorderWeight: _,
  btnTextColorHover: x,
  neonColor: w,
  gradientColor1: v,
  gradientColor2: k,
  gradientColor3: M,
  ...S
}) => {
  const N = H(null), P = "my-ui-btn", R = `${P}--${t}`, C = `${P}--${n}`, A = s ? `${P}--disabled` : "", T = i ? `${P}--loading` : "", O = [
    P,
    R,
    C,
    A,
    T,
    a
  ].filter(Boolean).join(" "), D = t.startsWith("shimmer-");
  t.startsWith("shadow-"), t.startsWith("bg-"), t.startsWith("border-"), t.startsWith("transform-");
  const E = t === "glow-track", B = {
    ...S.style
    // Merge existing styles from props
  };
  p && (B["--btn-color"] = p), b && (B["--btn-textcolor"] = b), m && (B["--btn-hovercolor"] = m), y && (B["--btn-bordercolor"] = y), _ && (B["--btn-borderweight"] = _), x && (B["--btn-textcolor-hover"] = x), w && (B["--neon-color"] = w), v && (B["--gradient-color-1"] = v), k && (B["--gradient-color-2"] = k), M && (B["--gradient-color-3"] = M);
  const { style: z, ...L } = S;
  G(() => {
    if (E && N.current) {
      const V = N.current;
      let U = V.querySelector(".my-ui-btn__glow-gradient");
      U || (U = document.createElement("div"), U.classList.add("my-ui-btn__glow-gradient"), V.appendChild(U));
      const Z = (K) => {
        const J = V.getBoundingClientRect(), tt = K.clientX - J.left, at = K.clientY - J.top;
        tt / J.width;
        const mt = getComputedStyle(V).getPropertyValue("--button-glow-start").trim();
        getComputedStyle(V).getPropertyValue("--button-glow-end").trim();
        const nt = $(mt);
        V.style.setProperty("--pointer-x", `${tt}px`), V.style.setProperty("--pointer-y", `${at}px`), V.style.setProperty("--button-glow", nt);
      };
      return V.addEventListener("pointermove", Z), () => {
        V.removeEventListener("pointermove", Z);
      };
    }
  }, [E]);
  const $ = (V, U, Z) => V, F = (V) => {
    !s && !i && r && r(V);
  }, j = () => i ? /* @__PURE__ */ I(kt, { children: [
    /* @__PURE__ */ f("span", { className: `${P}__spinner` }),
    /* @__PURE__ */ f("span", { className: `${P}__text ${P}__text--loading`, children: e })
  ] }) : t === "border-corners" ? /* @__PURE__ */ f("span", { className: `${P}__text`, children: e }) : t === "border-sequence" ? /* @__PURE__ */ f("span", { className: `${P}__text`, children: e }) : t === "bg-split" ? /* @__PURE__ */ f("span", { className: `${P}__text`, children: e }) : t === "border-reveal" ? /* @__PURE__ */ f("span", { className: `${P}__text`, style: { position: "relative", zIndex: 3 }, children: e }) : t === "transform-double" ? /* @__PURE__ */ I(kt, { children: [
    /* @__PURE__ */ f("div", { className: `${P}__block`, children: /* @__PURE__ */ f("span", {}) }),
    /* @__PURE__ */ f("span", { className: `${P}__text`, "data-name": "hover", children: "Hover" }),
    /* @__PURE__ */ f("span", { className: `${P}__text`, "data-name": "me", children: "me" })
  ] }) : t === "transform-complex" ? /* @__PURE__ */ f("span", { className: `${P}__text`, children: e }) : o ? /* @__PURE__ */ I(kt, { children: [
    l === "left" && /* @__PURE__ */ f("span", { className: `${P}__icon`, children: o }),
    /* @__PURE__ */ f("span", { className: `${P}__text`, children: e }),
    l === "right" && /* @__PURE__ */ f("span", { className: `${P}__icon`, children: o })
  ] }) : e, W = () => {
    const V = [];
    return D && V.push(/* @__PURE__ */ f("span", { className: `${P}__shimmer` }, "shimmer")), t.includes("progress") && V.push(/* @__PURE__ */ f("span", { className: `${P}__progress-bar` }, "progress")), t.includes("pulse") && V.push(/* @__PURE__ */ f("span", { className: `${P}__pulse-ring` }, "pulse")), t.includes("dots") && V.push(
      /* @__PURE__ */ I("span", { className: `${P}__dots`, children: [
        /* @__PURE__ */ f("span", {}),
        /* @__PURE__ */ f("span", {}),
        /* @__PURE__ */ f("span", {})
      ] }, "dots")
    ), t === "shiny" && V.push(
      /* @__PURE__ */ f("span", { className: `${P}__shiny-dots` }, "shiny-dots"),
      /* @__PURE__ */ f("span", { className: `${P}__shiny-shimmer` }, "shiny-shimmer"),
      /* @__PURE__ */ f("span", { className: `${P}__shiny-glow` }, "shiny-glow")
    ), V;
  };
  return /* @__PURE__ */ I(
    "button",
    {
      ref: N,
      className: O,
      disabled: s || i,
      onClick: F,
      style: B,
      ...(() => {
        const V = {};
        return (u || t === "transform-slide" || t === "transform-complex" || t === "transform-3d") && (V["data-hover"] = u || d || "Click me!"), V;
      })(),
      ...L,
      children: [
        j(),
        W()
      ]
    }
  );
};
var ps = {};
(function e(t, n, s, i) {
  var r = !!(t.Worker && t.Blob && t.Promise && t.OffscreenCanvas && t.OffscreenCanvasRenderingContext2D && t.HTMLCanvasElement && t.HTMLCanvasElement.prototype.transferControlToOffscreen && t.URL && t.URL.createObjectURL), a = typeof Path2D == "function" && typeof DOMMatrix == "function", o = (function() {
    if (!t.OffscreenCanvas)
      return !1;
    var L = new OffscreenCanvas(1, 1), $ = L.getContext("2d");
    $.fillRect(0, 0, 1, 1);
    var F = L.transferToImageBitmap();
    try {
      $.createPattern(F, "no-repeat");
    } catch {
      return !1;
    }
    return !0;
  })();
  function l() {
  }
  function c(L) {
    var $ = n.exports.Promise, F = $ !== void 0 ? $ : t.Promise;
    return typeof F == "function" ? new F(L) : (L(l, l), null);
  }
  var h = /* @__PURE__ */ (function(L, $) {
    return {
      transform: function(F) {
        if (L)
          return F;
        if ($.has(F))
          return $.get(F);
        var j = new OffscreenCanvas(F.width, F.height), W = j.getContext("2d");
        return W.drawImage(F, 0, 0), $.set(F, j), j;
      },
      clear: function() {
        $.clear();
      }
    };
  })(o, /* @__PURE__ */ new Map()), d = (function() {
    var L = Math.floor(16.666666666666668), $, F, j = {}, W = 0;
    return typeof requestAnimationFrame == "function" && typeof cancelAnimationFrame == "function" ? ($ = function(Y) {
      var V = Math.random();
      return j[V] = requestAnimationFrame(function U(Z) {
        W === Z || W + L - 1 < Z ? (W = Z, delete j[V], Y()) : j[V] = requestAnimationFrame(U);
      }), V;
    }, F = function(Y) {
      j[Y] && cancelAnimationFrame(j[Y]);
    }) : ($ = function(Y) {
      return setTimeout(Y, L);
    }, F = function(Y) {
      return clearTimeout(Y);
    }), { frame: $, cancel: F };
  })(), u = /* @__PURE__ */ (function() {
    var L, $, F = {};
    function j(W) {
      function Y(V, U) {
        W.postMessage({ options: V || {}, callback: U });
      }
      W.init = function(U) {
        var Z = U.transferControlToOffscreen();
        W.postMessage({ canvas: Z }, [Z]);
      }, W.fire = function(U, Z, K) {
        if ($)
          return Y(U, null), $;
        var J = Math.random().toString(36).slice(2);
        return $ = c(function(tt) {
          function at(mt) {
            mt.data.callback === J && (delete F[J], W.removeEventListener("message", at), $ = null, h.clear(), K(), tt());
          }
          W.addEventListener("message", at), Y(U, J), F[J] = at.bind(null, { data: { callback: J } });
        }), $;
      }, W.reset = function() {
        W.postMessage({ reset: !0 });
        for (var U in F)
          F[U](), delete F[U];
      };
    }
    return function() {
      if (L)
        return L;
      if (!s && r) {
        var W = [
          "var CONFETTI, SIZE = {}, module = {};",
          "(" + e.toString() + ")(this, module, true, SIZE);",
          "onmessage = function(msg) {",
          "  if (msg.data.options) {",
          "    CONFETTI(msg.data.options).then(function () {",
          "      if (msg.data.callback) {",
          "        postMessage({ callback: msg.data.callback });",
          "      }",
          "    });",
          "  } else if (msg.data.reset) {",
          "    CONFETTI && CONFETTI.reset();",
          "  } else if (msg.data.resize) {",
          "    SIZE.width = msg.data.resize.width;",
          "    SIZE.height = msg.data.resize.height;",
          "  } else if (msg.data.canvas) {",
          "    SIZE.width = msg.data.canvas.width;",
          "    SIZE.height = msg.data.canvas.height;",
          "    CONFETTI = module.exports.create(msg.data.canvas);",
          "  }",
          "}"
        ].join(`
`);
        try {
          L = new Worker(URL.createObjectURL(new Blob([W])));
        } catch (Y) {
          return typeof console !== void 0 && typeof console.warn == "function" && console.warn("🎊 Could not load worker", Y), null;
        }
        j(L);
      }
      return L;
    };
  })(), g = {
    particleCount: 50,
    angle: 90,
    spread: 45,
    startVelocity: 45,
    decay: 0.9,
    gravity: 1,
    drift: 0,
    ticks: 200,
    x: 0.5,
    y: 0.5,
    shapes: ["square", "circle"],
    zIndex: 100,
    colors: [
      "#26ccff",
      "#a25afd",
      "#ff5e7e",
      "#88ff5a",
      "#fcff42",
      "#ffa62d",
      "#ff36ff"
    ],
    // probably should be true, but back-compat
    disableForReducedMotion: !1,
    scalar: 1
  };
  function p(L, $) {
    return $ ? $(L) : L;
  }
  function b(L) {
    return L != null;
  }
  function m(L, $, F) {
    return p(
      L && b(L[$]) ? L[$] : g[$],
      F
    );
  }
  function y(L) {
    return L < 0 ? 0 : Math.floor(L);
  }
  function _(L, $) {
    return Math.floor(Math.random() * ($ - L)) + L;
  }
  function x(L) {
    return parseInt(L, 16);
  }
  function w(L) {
    return L.map(v);
  }
  function v(L) {
    var $ = String(L).replace(/[^0-9a-f]/gi, "");
    return $.length < 6 && ($ = $[0] + $[0] + $[1] + $[1] + $[2] + $[2]), {
      r: x($.substring(0, 2)),
      g: x($.substring(2, 4)),
      b: x($.substring(4, 6))
    };
  }
  function k(L) {
    var $ = m(L, "origin", Object);
    return $.x = m($, "x", Number), $.y = m($, "y", Number), $;
  }
  function M(L) {
    L.width = document.documentElement.clientWidth, L.height = document.documentElement.clientHeight;
  }
  function S(L) {
    var $ = L.getBoundingClientRect();
    L.width = $.width, L.height = $.height;
  }
  function N(L) {
    var $ = document.createElement("canvas");
    return $.style.position = "fixed", $.style.top = "0px", $.style.left = "0px", $.style.pointerEvents = "none", $.style.zIndex = L, $;
  }
  function P(L, $, F, j, W, Y, V, U, Z) {
    L.save(), L.translate($, F), L.rotate(Y), L.scale(j, W), L.arc(0, 0, 1, V, U, Z), L.restore();
  }
  function R(L) {
    var $ = L.angle * (Math.PI / 180), F = L.spread * (Math.PI / 180);
    return {
      x: L.x,
      y: L.y,
      wobble: Math.random() * 10,
      wobbleSpeed: Math.min(0.11, Math.random() * 0.1 + 0.05),
      velocity: L.startVelocity * 0.5 + Math.random() * L.startVelocity,
      angle2D: -$ + (0.5 * F - Math.random() * F),
      tiltAngle: (Math.random() * (0.75 - 0.25) + 0.25) * Math.PI,
      color: L.color,
      shape: L.shape,
      tick: 0,
      totalTicks: L.ticks,
      decay: L.decay,
      drift: L.drift,
      random: Math.random() + 2,
      tiltSin: 0,
      tiltCos: 0,
      wobbleX: 0,
      wobbleY: 0,
      gravity: L.gravity * 3,
      ovalScalar: 0.6,
      scalar: L.scalar,
      flat: L.flat
    };
  }
  function C(L, $) {
    $.x += Math.cos($.angle2D) * $.velocity + $.drift, $.y += Math.sin($.angle2D) * $.velocity + $.gravity, $.velocity *= $.decay, $.flat ? ($.wobble = 0, $.wobbleX = $.x + 10 * $.scalar, $.wobbleY = $.y + 10 * $.scalar, $.tiltSin = 0, $.tiltCos = 0, $.random = 1) : ($.wobble += $.wobbleSpeed, $.wobbleX = $.x + 10 * $.scalar * Math.cos($.wobble), $.wobbleY = $.y + 10 * $.scalar * Math.sin($.wobble), $.tiltAngle += 0.1, $.tiltSin = Math.sin($.tiltAngle), $.tiltCos = Math.cos($.tiltAngle), $.random = Math.random() + 2);
    var F = $.tick++ / $.totalTicks, j = $.x + $.random * $.tiltCos, W = $.y + $.random * $.tiltSin, Y = $.wobbleX + $.random * $.tiltCos, V = $.wobbleY + $.random * $.tiltSin;
    if (L.fillStyle = "rgba(" + $.color.r + ", " + $.color.g + ", " + $.color.b + ", " + (1 - F) + ")", L.beginPath(), a && $.shape.type === "path" && typeof $.shape.path == "string" && Array.isArray($.shape.matrix))
      L.fill(E(
        $.shape.path,
        $.shape.matrix,
        $.x,
        $.y,
        Math.abs(Y - j) * 0.1,
        Math.abs(V - W) * 0.1,
        Math.PI / 10 * $.wobble
      ));
    else if ($.shape.type === "bitmap") {
      var U = Math.PI / 10 * $.wobble, Z = Math.abs(Y - j) * 0.1, K = Math.abs(V - W) * 0.1, J = $.shape.bitmap.width * $.scalar, tt = $.shape.bitmap.height * $.scalar, at = new DOMMatrix([
        Math.cos(U) * Z,
        Math.sin(U) * Z,
        -Math.sin(U) * K,
        Math.cos(U) * K,
        $.x,
        $.y
      ]);
      at.multiplySelf(new DOMMatrix($.shape.matrix));
      var mt = L.createPattern(h.transform($.shape.bitmap), "no-repeat");
      mt.setTransform(at), L.globalAlpha = 1 - F, L.fillStyle = mt, L.fillRect(
        $.x - J / 2,
        $.y - tt / 2,
        J,
        tt
      ), L.globalAlpha = 1;
    } else if ($.shape === "circle")
      L.ellipse ? L.ellipse($.x, $.y, Math.abs(Y - j) * $.ovalScalar, Math.abs(V - W) * $.ovalScalar, Math.PI / 10 * $.wobble, 0, 2 * Math.PI) : P(L, $.x, $.y, Math.abs(Y - j) * $.ovalScalar, Math.abs(V - W) * $.ovalScalar, Math.PI / 10 * $.wobble, 0, 2 * Math.PI);
    else if ($.shape === "star")
      for (var nt = Math.PI / 2 * 3, _t = 4 * $.scalar, Nt = 8 * $.scalar, Dt = $.x, Ot = $.y, Wt = 5, It = Math.PI / Wt; Wt--; )
        Dt = $.x + Math.cos(nt) * Nt, Ot = $.y + Math.sin(nt) * Nt, L.lineTo(Dt, Ot), nt += It, Dt = $.x + Math.cos(nt) * _t, Ot = $.y + Math.sin(nt) * _t, L.lineTo(Dt, Ot), nt += It;
    else
      L.moveTo(Math.floor($.x), Math.floor($.y)), L.lineTo(Math.floor($.wobbleX), Math.floor(W)), L.lineTo(Math.floor(Y), Math.floor(V)), L.lineTo(Math.floor(j), Math.floor($.wobbleY));
    return L.closePath(), L.fill(), $.tick < $.totalTicks;
  }
  function A(L, $, F, j, W) {
    var Y = $.slice(), V = L.getContext("2d"), U, Z, K = c(function(J) {
      function tt() {
        U = Z = null, V.clearRect(0, 0, j.width, j.height), h.clear(), W(), J();
      }
      function at() {
        s && !(j.width === i.width && j.height === i.height) && (j.width = L.width = i.width, j.height = L.height = i.height), !j.width && !j.height && (F(L), j.width = L.width, j.height = L.height), V.clearRect(0, 0, j.width, j.height), Y = Y.filter(function(mt) {
          return C(V, mt);
        }), Y.length ? U = d.frame(at) : tt();
      }
      U = d.frame(at), Z = tt;
    });
    return {
      addFettis: function(J) {
        return Y = Y.concat(J), K;
      },
      canvas: L,
      promise: K,
      reset: function() {
        U && d.cancel(U), Z && Z();
      }
    };
  }
  function T(L, $) {
    var F = !L, j = !!m($ || {}, "resize"), W = !1, Y = m($, "disableForReducedMotion", Boolean), V = r && !!m($ || {}, "useWorker"), U = V ? u() : null, Z = F ? M : S, K = L && U ? !!L.__confetti_initialized : !1, J = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion)").matches, tt;
    function at(nt, _t, Nt) {
      for (var Dt = m(nt, "particleCount", y), Ot = m(nt, "angle", Number), Wt = m(nt, "spread", Number), It = m(nt, "startVelocity", Number), Ge = m(nt, "decay", Number), qe = m(nt, "gravity", Number), q = m(nt, "drift", Number), Q = m(nt, "colors", w), dt = m(nt, "ticks", Number), vt = m(nt, "shapes"), ht = m(nt, "scalar"), ot = !!m(nt, "flat"), ut = k(nt), Mt = Dt, zt = [], Qt = L.width * ut.x, Ht = L.height * ut.y; Mt--; )
        zt.push(
          R({
            x: Qt,
            y: Ht,
            angle: Ot,
            spread: Wt,
            startVelocity: It,
            color: Q[Mt % Q.length],
            shape: vt[_(0, vt.length)],
            ticks: dt,
            decay: Ge,
            gravity: qe,
            drift: q,
            scalar: ht,
            flat: ot
          })
        );
      return tt ? tt.addFettis(zt) : (tt = A(L, zt, Z, _t, Nt), tt.promise);
    }
    function mt(nt) {
      var _t = Y || m(nt, "disableForReducedMotion", Boolean), Nt = m(nt, "zIndex", Number);
      if (_t && J)
        return c(function(It) {
          It();
        });
      F && tt ? L = tt.canvas : F && !L && (L = N(Nt), document.body.appendChild(L)), j && !K && Z(L);
      var Dt = {
        width: L.width,
        height: L.height
      };
      U && !K && U.init(L), K = !0, U && (L.__confetti_initialized = !0);
      function Ot() {
        if (U) {
          var It = {
            getBoundingClientRect: function() {
              if (!F)
                return L.getBoundingClientRect();
            }
          };
          Z(It), U.postMessage({
            resize: {
              width: It.width,
              height: It.height
            }
          });
          return;
        }
        Dt.width = Dt.height = null;
      }
      function Wt() {
        tt = null, j && (W = !1, t.removeEventListener("resize", Ot)), F && L && (document.body.contains(L) && document.body.removeChild(L), L = null, K = !1);
      }
      return j && !W && (W = !0, t.addEventListener("resize", Ot, !1)), U ? U.fire(nt, Dt, Wt) : at(nt, Dt, Wt);
    }
    return mt.reset = function() {
      U && U.reset(), tt && tt.reset();
    }, mt;
  }
  var O;
  function D() {
    return O || (O = T(null, { useWorker: !0, resize: !0 })), O;
  }
  function E(L, $, F, j, W, Y, V) {
    var U = new Path2D(L), Z = new Path2D();
    Z.addPath(U, new DOMMatrix($));
    var K = new Path2D();
    return K.addPath(Z, new DOMMatrix([
      Math.cos(V) * W,
      Math.sin(V) * W,
      -Math.sin(V) * Y,
      Math.cos(V) * Y,
      F,
      j
    ])), K;
  }
  function B(L) {
    if (!a)
      throw new Error("path confetti are not supported in this browser");
    var $, F;
    typeof L == "string" ? $ = L : ($ = L.path, F = L.matrix);
    var j = new Path2D($), W = document.createElement("canvas"), Y = W.getContext("2d");
    if (!F) {
      for (var V = 1e3, U = V, Z = V, K = 0, J = 0, tt, at, mt = 0; mt < V; mt += 2)
        for (var nt = 0; nt < V; nt += 2)
          Y.isPointInPath(j, mt, nt, "nonzero") && (U = Math.min(U, mt), Z = Math.min(Z, nt), K = Math.max(K, mt), J = Math.max(J, nt));
      tt = K - U, at = J - Z;
      var _t = 10, Nt = Math.min(_t / tt, _t / at);
      F = [
        Nt,
        0,
        0,
        Nt,
        -Math.round(tt / 2 + U) * Nt,
        -Math.round(at / 2 + Z) * Nt
      ];
    }
    return {
      type: "path",
      path: $,
      matrix: F
    };
  }
  function z(L) {
    var $, F = 1, j = "#000000", W = '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';
    typeof L == "string" ? $ = L : ($ = L.text, F = "scalar" in L ? L.scalar : F, W = "fontFamily" in L ? L.fontFamily : W, j = "color" in L ? L.color : j);
    var Y = 10 * F, V = "" + Y + "px " + W, U = new OffscreenCanvas(Y, Y), Z = U.getContext("2d");
    Z.font = V;
    var K = Z.measureText($), J = Math.ceil(K.actualBoundingBoxRight + K.actualBoundingBoxLeft), tt = Math.ceil(K.actualBoundingBoxAscent + K.actualBoundingBoxDescent), at = 2, mt = K.actualBoundingBoxLeft + at, nt = K.actualBoundingBoxAscent + at;
    J += at + at, tt += at + at, U = new OffscreenCanvas(J, tt), Z = U.getContext("2d"), Z.font = V, Z.fillStyle = j, Z.fillText($, mt, nt);
    var _t = 1 / F;
    return {
      type: "bitmap",
      // TODO these probably need to be transfered for workers
      bitmap: U.transferToImageBitmap(),
      matrix: [_t, 0, 0, _t, -J * _t / 2, -tt * _t / 2]
    };
  }
  n.exports = function() {
    return D().apply(this, arguments);
  }, n.exports.reset = function() {
    D().reset();
  }, n.exports.create = T, n.exports.shapeFromPath = B, n.exports.shapeFromText = z;
})(/* @__PURE__ */ (function() {
  return typeof window < "u" ? window : typeof self < "u" ? self : this || {};
})(), ps, !1);
const No = ps.exports;
ps.exports.create;
const ne = (e = {}) => {
  const {
    particleCount: t = 150,
    spread: n = 60,
    startVelocity: s = 30,
    decay: i = 0.9,
    gravity: r = 1,
    drift: a = 0,
    scalar: o = 1,
    colors: l,
    origin: c = { x: 0.5, y: 0.6 }
  } = e;
  No({
    particleCount: t,
    spread: n,
    startVelocity: s,
    decay: i,
    gravity: r,
    drift: a,
    scalar: o,
    colors: l,
    origin: c
  });
}, v1 = {
  // Basic celebration
  celebrate: () => ne(),
  // Success/achievement
  success: () => ne({
    particleCount: 100,
    spread: 70,
    colors: ["#00ff00", "#32cd32", "#90ee90"]
  }),
  // Party time
  party: () => ne({
    particleCount: 200,
    spread: 90,
    startVelocity: 45
  }),
  // Gentle celebration
  gentle: () => ne({
    particleCount: 80,
    spread: 45,
    startVelocity: 20
  }),
  // From left side
  fromLeft: () => ne({
    particleCount: 100,
    spread: 55,
    origin: { x: 0, y: 0.6 }
  }),
  // From right side  
  fromRight: () => ne({
    particleCount: 100,
    spread: 55,
    origin: { x: 1, y: 0.6 }
  }),
  // Rain from top
  rain: () => ne({
    particleCount: 150,
    spread: 120,
    origin: { x: 0.5, y: 0 },
    gravity: 2
  }),
  // Fireworks effect
  fireworks: () => {
    const e = () => ne({
      particleCount: 50,
      spread: 60,
      origin: { x: Math.random(), y: Math.random() * 0.6 + 0.2 }
    });
    e(), setTimeout(e, 200), setTimeout(e, 400);
  },
  // Continuous celebration
  continuous: (e = 3e3) => {
    const t = Date.now() + e, n = () => {
      ne({
        particleCount: 2,
        spread: 60,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        }
      }), Date.now() < t && requestAnimationFrame(n);
    };
    n();
  }
}, x1 = ({
  children: e,
  className: t = "",
  width: n = 300,
  height: s = 400,
  backgroundImage: i,
  bgColor: r,
  style: a = {},
  ...o
}) => {
  const l = H(null), c = H(null), h = H(null), d = (b) => {
    if (!l.current || !c.current || !h.current) return;
    const m = b.clientX, y = b.clientY, _ = m - h.current.x, x = y - h.current.y, w = {
      x: _ - h.current.width / 2,
      y: x - h.current.height / 2
    }, v = Math.sqrt(w.x ** 2 + w.y ** 2);
    l.current.style.transform = `
      scale3d(1.07, 1.07, 1.07)
      rotate3d(
        ${w.y / 100},
        ${-w.x / 100},
        0,
        ${Math.log(v) * 2}deg
      )
    `, c.current.style.backgroundImage = `
      radial-gradient(
        circle at
        ${w.x * 2 + h.current.width / 2}px
        ${w.y * 2 + h.current.height / 2}px,
        #ffffff55,
        #0000000f
      )
    `;
  }, u = () => {
    l.current && (h.current = l.current.getBoundingClientRect(), document.addEventListener("mousemove", d));
  }, g = () => {
    document.removeEventListener("mousemove", d), l.current && (l.current.style.transform = ""), c.current && (c.current.style.backgroundImage = "");
  };
  G(() => () => {
    document.removeEventListener("mousemove", d);
  }, []);
  const p = {
    width: `${n}px`,
    height: `${s}px`,
    ...i ? { backgroundImage: `url(${i})` } : r ? { background: r } : {},
    ...a
  };
  return /* @__PURE__ */ I(
    "div",
    {
      ref: l,
      className: `threed-card ${t}`,
      style: p,
      onMouseEnter: u,
      onMouseLeave: g,
      ...o,
      children: [
        e,
        /* @__PURE__ */ f("div", { ref: c, className: "threed-card-glow" })
      ]
    }
  );
}, Rr = (e) => {
  const t = (a) => {
    const o = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
    return o ? {
      r: parseInt(o[1], 16),
      g: parseInt(o[2], 16),
      b: parseInt(o[3], 16)
    } : null;
  }, n = (a, o, l) => {
    a /= 255, o /= 255, l /= 255;
    const c = Math.max(a, o, l), h = Math.min(a, o, l);
    let d, u, g = (c + h) / 2;
    if (c === h)
      d = u = 0;
    else {
      const p = c - h;
      switch (u = g > 0.5 ? p / (2 - c - h) : p / (c + h), c) {
        case a:
          d = ((o - l) / p + (o < l ? 6 : 0)) / 6;
          break;
        case o:
          d = ((l - a) / p + 2) / 6;
          break;
        case l:
          d = ((a - o) / p + 4) / 6;
          break;
      }
    }
    return { h: d * 360, s: u * 100, l: g * 100 };
  }, s = (a, o, l) => {
    a /= 360, o /= 100, l /= 100;
    let c, h, d;
    if (o === 0)
      c = h = d = l;
    else {
      const g = (m, y, _) => (_ < 0 && (_ += 1), _ > 1 && (_ -= 1), _ < 0.16666666666666666 ? m + (y - m) * 6 * _ : _ < 0.5 ? y : _ < 0.6666666666666666 ? m + (y - m) * (0.6666666666666666 - _) * 6 : m), p = l < 0.5 ? l * (1 + o) : l + o - l * o, b = 2 * l - p;
      c = g(b, p, a + 0.3333333333333333), h = g(b, p, a), d = g(b, p, a - 0.3333333333333333);
    }
    const u = (g) => {
      const p = Math.round(g * 255).toString(16);
      return p.length === 1 ? "0" + p : p;
    };
    return `#${u(c)}${u(h)}${u(d)}`;
  }, i = t(e);
  if (!i) return null;
  const r = n(i.r, i.g, i.b);
  return {
    primary: e,
    primaryDark: s(r.h, r.s, Math.max(r.l - 15, 0)),
    primaryLight: s(r.h, r.s, Math.min(r.l + 15, 95)),
    primaryLighter: s(r.h, Math.max(r.s - 20, 20), Math.min(r.l + 25, 95)),
    success: s(r.h, Math.max(r.s - 10, 40), Math.min(r.l + 10, 85)),
    hover: s(r.h, Math.max(r.s - 30, 10), Math.min(r.l + 35, 95))
  };
}, bs = ({
  selectedDate: e = /* @__PURE__ */ new Date(),
  onDateSelect: t = () => {
  },
  showToday: n = !0,
  minDate: s = null,
  maxDate: i = null,
  disabledDates: r = [],
  theme: a = "calendar-light",
  color: o = null
  // New color prop
}) => {
  const [l, c] = X(/* @__PURE__ */ new Date()), [h, d] = X(e), u = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ], g = /* @__PURE__ */ new Date(), p = o ? (() => {
    const v = Rr(o);
    return {
      "--color-primary-custom": v.primary,
      "--color-primary-dark-custom": v.primaryDark,
      "--color-primary-light-custom": v.primaryLight,
      "--color-success-custom": v.success,
      "--color-success-light-custom": v.primaryLighter,
      "--color-background-hover-custom": v.hover
    };
  })() : {}, b = () => {
    const v = l.getFullYear(), k = l.getMonth(), M = new Date(v, k, 1), S = new Date(M);
    S.setDate(M.getDate() - M.getDay());
    const N = [];
    let P = new Date(S);
    for (let R = 0; R < 6; R++) {
      const C = [];
      for (let A = 0; A < 7; A++)
        C.push(new Date(P)), P.setDate(P.getDate() + 1);
      N.push(C);
    }
    return N;
  }, m = (v, k) => v.getDate() === k.getDate() && v.getMonth() === k.getMonth() && v.getFullYear() === k.getFullYear(), y = (v) => s && v < s || i && v > i ? !0 : r.some((k) => m(v, k)), _ = (v) => {
    y(v) || (d(v), t(v));
  }, x = (v) => {
    const k = new Date(l);
    k.setMonth(l.getMonth() + v), c(k);
  }, w = b();
  return /* @__PURE__ */ I(
    "div",
    {
      className: `ui-calendar ${a} ${o ? "custom-color" : ""}`,
      style: p,
      children: [
        /* @__PURE__ */ I("div", { className: "calendar-header", children: [
          /* @__PURE__ */ f(
            "button",
            {
              className: "nav-button",
              onClick: () => x(-1),
              type: "button",
              children: "‹"
            }
          ),
          /* @__PURE__ */ I("h3", { className: "month-year", children: [
            u[l.getMonth()],
            " ",
            l.getFullYear()
          ] }),
          /* @__PURE__ */ f(
            "button",
            {
              className: "nav-button",
              onClick: () => x(1),
              type: "button",
              children: "›"
            }
          )
        ] }),
        /* @__PURE__ */ I("div", { className: "calendar-grid", children: [
          /* @__PURE__ */ f("div", { className: "day-headers", children: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((v) => /* @__PURE__ */ f("div", { className: "day-header", children: v }, v)) }),
          /* @__PURE__ */ f("div", { className: "dates-grid", children: w.map((v, k) => /* @__PURE__ */ f("div", { className: "week-row", children: v.map((M, S) => {
            const N = M.getMonth() === l.getMonth(), P = n && m(M, g), R = m(M, h), C = y(M);
            return /* @__PURE__ */ f(
              "button",
              {
                className: `date-cell ${N ? "current-month" : "other-month"} ${P ? "today" : ""} ${R ? "selected" : ""} ${C ? "disabled" : ""}`,
                onClick: () => _(M),
                disabled: C,
                type: "button",
                children: M.getDate()
              },
              S
            );
          }) }, k)) })
        ] })
      ]
    }
  );
}, _1 = ({
  placeholder: e = "Select date...",
  selectedDate: t = null,
  onDateSelect: n = () => {
  },
  format: s = "MMM DD, YYYY",
  disabled: i = !1,
  theme: r = "calendar-light",
  color: a = null,
  // New color prop
  ...o
}) => {
  const [l, c] = X(!1), [h, d] = X(t), u = (p) => {
    if (!p) return "";
    const b = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    switch (s) {
      case "MM/DD/YYYY":
        return `${(p.getMonth() + 1).toString().padStart(2, "0")}/${p.getDate().toString().padStart(2, "0")}/${p.getFullYear()}`;
      case "DD/MM/YYYY":
        return `${p.getDate().toString().padStart(2, "0")}/${(p.getMonth() + 1).toString().padStart(2, "0")}/${p.getFullYear()}`;
      case "YYYY-MM-DD":
        return `${p.getFullYear()}-${(p.getMonth() + 1).toString().padStart(2, "0")}-${p.getDate().toString().padStart(2, "0")}`;
      default:
        return `${b[p.getMonth()]} ${p.getDate()}, ${p.getFullYear()}`;
    }
  }, g = (p) => {
    d(p), n(p), c(!1);
  };
  return G(() => {
    const p = (b) => {
      b.target.closest(".date-picker-container") || c(!1);
    };
    return document.addEventListener("mousedown", p), () => document.removeEventListener("mousedown", p);
  }, []), /* @__PURE__ */ I("div", { className: `date-picker-container ${r}`, children: [
    /* @__PURE__ */ I(
      "div",
      {
        className: `date-picker-input ${i ? "disabled" : ""}`,
        onClick: () => !i && c(!l),
        children: [
          /* @__PURE__ */ f(
            "input",
            {
              type: "text",
              value: h ? u(h) : "",
              placeholder: e,
              readOnly: !0,
              disabled: i
            }
          ),
          /* @__PURE__ */ f("span", { className: "calendar-icon", children: /* @__PURE__ */ f("svg", { style: { color: "gray" }, class: "w-6 h-6 text-gray-800 dark:text-white", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ f("path", { "fill-rule": "evenodd", d: "M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z", "clip-rule": "evenodd" }) }) })
        ]
      }
    ),
    l && !i && /* @__PURE__ */ f("div", { className: "date-picker-dropdown", children: /* @__PURE__ */ f(
      bs,
      {
        selectedDate: h || /* @__PURE__ */ new Date(),
        onDateSelect: g,
        theme: r,
        color: a,
        ...o
      }
    ) })
  ] });
}, w1 = ({
  selectedDate: e = null,
  onDateTimeSelect: t = () => {
  },
  format: n = "MMM DD, YYYY HH:mm",
  placeholder: s = "Select date and time...",
  disabled: i = !1,
  showSeconds: r = !1,
  theme: a = "calendar-light",
  color: o = null,
  // New color prop
  ...l
}) => {
  const [c, h] = X(!1), [d, u] = X(e), [g, p] = X({
    hours: e ? e.getHours() : 12,
    minutes: e ? e.getMinutes() : 0,
    seconds: e ? e.getSeconds() : 0
  }), b = (_, x) => {
    if (!_) return "";
    new Date(_).setHours(x.hours, x.minutes, x.seconds);
    const v = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ], k = () => {
      const M = x.hours.toString().padStart(2, "0"), S = x.minutes.toString().padStart(2, "0"), N = x.seconds.toString().padStart(2, "0");
      return r ? `${M}:${S}:${N}` : `${M}:${S}`;
    };
    return `${v[_.getMonth()]} ${_.getDate()}, ${_.getFullYear()} ${k()}`;
  }, m = (_) => {
    u(_);
    const x = new Date(_);
    x.setHours(g.hours, g.minutes, g.seconds), t(x);
  }, y = (_, x) => {
    const w = { ...g, [_]: parseInt(x) };
    if (p(w), d) {
      const v = new Date(d);
      v.setHours(w.hours, w.minutes, w.seconds), t(v);
    }
  };
  return G(() => {
    const _ = (x) => {
      x.target.closest(".date-time-picker-container") || h(!1);
    };
    return document.addEventListener("mousedown", _), () => document.removeEventListener("mousedown", _);
  }, []), /* @__PURE__ */ I("div", { className: `date-time-picker-container ${a}`, children: [
    /* @__PURE__ */ I(
      "div",
      {
        className: `date-picker-input ${i ? "disabled" : ""}`,
        onClick: () => !i && h(!c),
        children: [
          /* @__PURE__ */ f(
            "input",
            {
              type: "text",
              value: d ? b(d, g) : "",
              placeholder: s,
              readOnly: !0,
              disabled: i
            }
          ),
          /* @__PURE__ */ f("span", { className: "calendar-icon", children: /* @__PURE__ */ f("svg", { style: { color: "gray" }, class: "w-6 h-6 text-gray-800 dark:text-white", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ f("path", { "fill-rule": "evenodd", d: "M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z", "clip-rule": "evenodd" }) }) })
        ]
      }
    ),
    c && !i && /* @__PURE__ */ I("div", { className: "date-time-picker-dropdown", children: [
      /* @__PURE__ */ f(
        bs,
        {
          selectedDate: d || /* @__PURE__ */ new Date(),
          onDateSelect: m,
          theme: a,
          color: o,
          ...l
        }
      ),
      /* @__PURE__ */ I("div", { className: "time-picker", children: [
        /* @__PURE__ */ f("h4", { children: "Select Time" }),
        /* @__PURE__ */ I("div", { className: "time-inputs", children: [
          /* @__PURE__ */ I("div", { className: "time-field", children: [
            /* @__PURE__ */ f("label", { children: "Hours" }),
            /* @__PURE__ */ f(
              "select",
              {
                value: g.hours,
                onChange: (_) => y("hours", _.target.value),
                children: Array.from({ length: 24 }, (_, x) => /* @__PURE__ */ f("option", { value: x, children: x.toString().padStart(2, "0") }, x))
              }
            )
          ] }),
          /* @__PURE__ */ I("div", { className: "time-field", children: [
            /* @__PURE__ */ f("label", { children: "Minutes" }),
            /* @__PURE__ */ f(
              "select",
              {
                value: g.minutes,
                onChange: (_) => y("minutes", _.target.value),
                children: Array.from({ length: 60 }, (_, x) => /* @__PURE__ */ f("option", { value: x, children: x.toString().padStart(2, "0") }, x))
              }
            )
          ] }),
          r && /* @__PURE__ */ I("div", { className: "time-field", children: [
            /* @__PURE__ */ f("label", { children: "Seconds" }),
            /* @__PURE__ */ f(
              "select",
              {
                value: g.seconds,
                onChange: (_) => y("seconds", _.target.value),
                children: Array.from({ length: 60 }, (_, x) => /* @__PURE__ */ f("option", { value: x, children: x.toString().padStart(2, "0") }, x))
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}, k1 = ({
  selectedDate: e = null,
  onSubmit: t = () => {
  },
  onCancel: n = () => {
  },
  submitText: s = "Confirm",
  cancelText: i = "Cancel",
  placeholder: r = "Select date...",
  disabled: a = !1,
  theme: o = "calendar-light",
  color: l = null,
  // New color prop
  ...c
}) => {
  const [h, d] = X(!1), [u, g] = X(e), [p, b] = X(e), m = (v) => v ? `${[
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ][v.getMonth()]} ${v.getDate()}, ${v.getFullYear()}` : "", y = l ? (() => {
    const v = Rr(l);
    return {
      "--color-primary-custom": v.primary,
      "--color-primary-dark-custom": v.primaryDark,
      "--color-primary-light-custom": v.primaryLight
    };
  })() : {}, _ = () => {
    g(p), t(p), d(!1);
  }, x = () => {
    b(u), n(), d(!1);
  }, w = (v) => {
    b(v);
  };
  return G(() => {
    const v = (k) => {
      k.target.closest(".date-picker-submit-container") || x();
    };
    if (h)
      return document.addEventListener("mousedown", v), () => document.removeEventListener("mousedown", v);
  }, [h]), /* @__PURE__ */ I(
    "div",
    {
      className: `date-picker-submit-container ${o} ${l ? "custom-color" : ""}`,
      style: y,
      children: [
        /* @__PURE__ */ I(
          "div",
          {
            className: `date-picker-input ${a ? "disabled" : ""}`,
            onClick: () => !a && d(!h),
            children: [
              /* @__PURE__ */ f(
                "input",
                {
                  type: "text",
                  value: u ? m(u) : "",
                  placeholder: r,
                  readOnly: !0,
                  disabled: a
                }
              ),
              /* @__PURE__ */ f("span", { className: "calendar-icon", children: /* @__PURE__ */ f("svg", { style: { color: "gray" }, class: "w-6 h-6 text-gray-800 dark:text-white", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ f("path", { "fill-rule": "evenodd", d: "M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z", "clip-rule": "evenodd" }) }) })
            ]
          }
        ),
        h && !a && /* @__PURE__ */ I("div", { className: "date-picker-submit-dropdown", children: [
          /* @__PURE__ */ f(
            bs,
            {
              selectedDate: p || /* @__PURE__ */ new Date(),
              onDateSelect: w,
              theme: o,
              color: l,
              ...c
            }
          ),
          /* @__PURE__ */ I("div", { className: "picker-actions", children: [
            /* @__PURE__ */ f("button", { className: "btn-cancel", onClick: x, type: "button", children: i }),
            /* @__PURE__ */ f(
              "button",
              {
                className: "btn-submit",
                onClick: _,
                disabled: !p,
                type: "button",
                children: s
              }
            )
          ] })
        ] })
      ]
    }
  );
}, M1 = ({
  className: e = "",
  autoPlay: t = !1,
  autoPlayInterval: n = 6e3,
  showDots: s = !1,
  showArrows: i = !1,
  data: r = [],
  headerColor: a = "#ffffff",
  textColor: o = "#ffffff"
}) => {
  const [l, c] = X(0), h = H(null), d = H(null), u = H(null), g = H({
    startX: null,
    startY: null,
    lock: !1
  }), p = H({
    dragging: !1,
    startX: 0,
    startY: 0,
    lock: !1
  }), b = H({
    accum: 0,
    lock: !1
  }), m = 36, y = 280, _ = 34, x = 260, w = 90, v = 420;
  G(() => (t && r.length > 1 && (u.current = setInterval(() => {
    c((C) => (C + 1) % r.length);
  }, n)), () => {
    u.current && clearInterval(u.current);
  }), [t, n, r.length]);
  const k = () => {
    u.current && (clearInterval(u.current), u.current = null);
  }, M = (C) => {
    k(), c((A) => (A + C + r.length) % r.length);
  };
  G(() => {
    const C = h.current;
    if (!C) return;
    const A = (D) => {
      if (g.current.lock) return;
      const E = D.touches[0];
      g.current.startX = E.clientX, g.current.startY = E.clientY;
    }, T = (D) => {
      const { startX: E, startY: B } = g.current;
      if (E === null) return;
      const z = D.touches[0], L = z.clientX - E, $ = z.clientY - B;
      Math.abs(L) > m && Math.abs(L) > Math.abs($) * 1.3 && (g.current.lock = !0, M(L < 0 ? 1 : -1), g.current.startX = null, g.current.startY = null, setTimeout(() => {
        g.current.lock = !1;
      }, y));
    }, O = () => {
      g.current.startX = null, g.current.startY = null;
    };
    return C.addEventListener("touchstart", A, { passive: !0 }), C.addEventListener("touchmove", T, { passive: !0 }), C.addEventListener("touchend", O, { passive: !0 }), () => {
      C.removeEventListener("touchstart", A), C.removeEventListener("touchmove", T), C.removeEventListener("touchend", O);
    };
  }, []), G(() => {
    const C = h.current;
    if (!C) return;
    const A = (D) => {
      p.current.lock || D.button !== 0 || (p.current.dragging = !0, p.current.startX = D.clientX, p.current.startY = D.clientY);
    }, T = (D) => {
      if (!p.current.dragging || p.current.lock) return;
      const E = D.clientX - p.current.startX, B = D.clientY - p.current.startY;
      Math.abs(E) > _ && Math.abs(E) > Math.abs(B) * 1.3 && (p.current.lock = !0, p.current.dragging = !1, M(E < 0 ? 1 : -1), setTimeout(() => {
        p.current.lock = !1;
      }, x));
    }, O = () => {
      p.current.dragging = !1;
    };
    return C.addEventListener("pointerdown", A), window.addEventListener("pointermove", T), window.addEventListener("pointerup", O), () => {
      C.removeEventListener("pointerdown", A), window.removeEventListener("pointermove", T), window.removeEventListener("pointerup", O);
    };
  }, []), G(() => {
    const C = h.current;
    if (!C) return;
    const A = (T) => {
      const O = Math.abs(T.deltaX) >= Math.abs(T.deltaY) ? T.deltaX : 0;
      if (!O || (T.preventDefault(), b.current.lock)) return;
      const D = T.deltaMode === 1 ? 16 : T.deltaMode === 2 ? C.clientWidth : 1;
      b.current.accum += O * D, Math.abs(b.current.accum) >= w && (M(b.current.accum > 0 ? 1 : -1), b.current.accum = 0, b.current.lock = !0, setTimeout(() => {
        b.current.lock = !1;
      }, v));
    };
    return C.addEventListener("wheel", A, { passive: !1 }), () => {
      C.removeEventListener("wheel", A);
    };
  }, []);
  const S = (C) => {
    C.key === "ArrowLeft" && M(-1), C.key === "ArrowRight" && M(1);
  }, N = () => {
    if (!r.length) return null;
    const C = r[l];
    return /* @__PURE__ */ I("div", { className: "carousel__slide", children: [
      C.icon && /* @__PURE__ */ f("i", { className: C.icon }),
      C.title && /* @__PURE__ */ f("h3", { children: C.title }),
      C.text && /* @__PURE__ */ f("p", { children: C.text }),
      C.description && /* @__PURE__ */ f("div", { className: "carousel__slide-description", children: C.description })
    ] });
  }, P = () => {
    if (!r.length) return {};
    const C = r[l];
    return C.image ? {
      backgroundImage: `url(${C.image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    } : C.backgroundColor ? {
      background: `radial-gradient(120% 140% at 50% 100%, ${C.backgroundColor} 0%, ${R(C.backgroundColor, -20)} 55%, ${R(C.backgroundColor, -40)} 100%)`
    } : {};
  }, R = (C, A) => {
    C = C.replace("#", "");
    const T = parseInt(C.substr(0, 2), 16), O = parseInt(C.substr(2, 2), 16), D = parseInt(C.substr(4, 2), 16), E = Math.max(0, Math.min(255, T + T * A / 100)), B = Math.max(0, Math.min(255, O + O * A / 100)), z = Math.max(0, Math.min(255, D + D * A / 100));
    return `#${Math.round(E).toString(16).padStart(2, "0")}${Math.round(B).toString(16).padStart(2, "0")}${Math.round(z).toString(16).padStart(2, "0")}`;
  };
  return r.length ? /* @__PURE__ */ I(
    "section",
    {
      ref: h,
      className: `carousel ${e}`,
      style: {
        ...P(),
        "--header-color": a,
        "--text-color": o
      },
      children: [
        /* @__PURE__ */ f("div", { className: "carousel__stage", "aria-hidden": "true" }),
        /* @__PURE__ */ f("div", { className: "carousel__overlay", "aria-hidden": "true" }),
        /* @__PURE__ */ f(
          "article",
          {
            ref: d,
            className: "carousel__panel",
            tabIndex: "0",
            "aria-roledescription": "carousel",
            onKeyDown: S,
            children: N()
          }
        ),
        i && r.length > 1 && /* @__PURE__ */ I(kt, { children: [
          /* @__PURE__ */ f(
            "button",
            {
              className: "carousel__nav carousel__nav--prev",
              "aria-label": "Previous slide",
              onClick: () => M(-1),
              children: /* @__PURE__ */ f("i", { className: "fa-solid fa-angle-left", "aria-hidden": "true" })
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              className: "carousel__nav carousel__nav--next",
              "aria-label": "Next slide",
              onClick: () => M(1),
              children: /* @__PURE__ */ f("i", { className: "fa-solid fa-angle-right", "aria-hidden": "true" })
            }
          )
        ] }),
        s && r.length > 1 && /* @__PURE__ */ f("div", { className: "carousel__progress", children: /* @__PURE__ */ f("div", { className: "carousel__dots", children: r.map((C, A) => /* @__PURE__ */ f(
          "span",
          {
            className: `carousel__dot ${A === l ? "active" : ""}`,
            onClick: () => {
              k(), c(A);
            },
            role: "button",
            tabIndex: 0,
            "aria-label": `Go to slide ${A + 1}`,
            onKeyDown: (T) => {
              (T.key === "Enter" || T.key === " ") && (T.preventDefault(), k(), c(A));
            }
          },
          A
        )) }) })
      ]
    }
  ) : /* @__PURE__ */ f("div", { className: `carousel ${e}`, children: "No data provided" });
}, S1 = ({
  type: e = "line",
  data: t = [],
  labels: n = [],
  color: s = "#000000",
  title: i = "",
  width: r = 400,
  height: a = 300,
  showLegend: o = !0,
  showValues: l = !0,
  animated: c = !0,
  theme: h = "chart-light"
}) => {
  const d = H(null), [u, g] = X(!1), b = ((v) => {
    const k = v.replace("#", ""), M = parseInt(k.substr(0, 2), 16), S = parseInt(k.substr(2, 2), 16), N = parseInt(k.substr(4, 2), 16), P = [], R = Math.max(t.length, n.length, 5);
    for (let C = 0; C < R; C++) {
      const A = 1 - C * 0.15, T = 0.8 - C * 0.1, O = Math.max(0, Math.min(255, Math.round(M * A))), D = Math.max(0, Math.min(255, Math.round(S * A))), E = Math.max(0, Math.min(255, Math.round(N * A)));
      P.push({
        solid: `rgb(${O}, ${D}, ${E})`,
        transparent: `rgba(${O}, ${D}, ${E}, ${T})`,
        light: `rgba(${O}, ${D}, ${E}, 0.3)`
      });
    }
    return P;
  })(s);
  G(() => {
    if (c) {
      const v = setTimeout(() => g(!0), 100);
      return () => clearTimeout(v);
    } else
      g(!0);
  }, [c]);
  const m = () => {
    const v = Math.max(...t), k = Math.min(...t), M = v - k, S = t.map((P, R) => {
      const C = R / (t.length - 1) * (r - 60) + 30, A = a - 60 - (P - k) / M * (a - 120);
      return `${C},${A}`;
    }).join(" "), N = t.map((P, R) => {
      const C = R / (t.length - 1) * (r - 60) + 30, A = a - 60 - (P - k) / M * (a - 120);
      return R === 0 ? `M ${C} ${A}` : `L ${C} ${A}`;
    }).join(" ");
    return /* @__PURE__ */ f("div", { className: `chart-viz-container line-chart ${u ? "visible" : ""}`, children: /* @__PURE__ */ I("svg", { width: r, height: a, className: "line-svg", children: [
      /* @__PURE__ */ f("defs", { children: /* @__PURE__ */ I("linearGradient", { id: "lineGradient", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [
        /* @__PURE__ */ f("stop", { offset: "0%", stopColor: b[0].transparent }),
        /* @__PURE__ */ f("stop", { offset: "100%", stopColor: b[0].light })
      ] }) }),
      [0, 1, 2, 3, 4].map((P) => /* @__PURE__ */ f(
        "line",
        {
          x1: "30",
          y1: 60 + P * (a - 120) / 4,
          x2: r - 30,
          y2: 60 + P * (a - 120) / 4,
          stroke: "rgba(200, 200, 200, 0.3)",
          strokeWidth: "1"
        },
        P
      )),
      /* @__PURE__ */ f(
        "path",
        {
          d: `${N} L ${(t.length - 1) * (r - 60) / (t.length - 1) + 30} ${a - 60} L 30 ${a - 60} Z`,
          fill: "url(#lineGradient)",
          className: "area-fill"
        }
      ),
      /* @__PURE__ */ f(
        "polyline",
        {
          points: S,
          fill: "none",
          stroke: b[0].solid,
          strokeWidth: "3",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          className: "chart-line"
        }
      ),
      t.map((P, R) => {
        const C = R / (t.length - 1) * (r - 60) + 30, A = a - 60 - (P - k) / M * (a - 120);
        return /* @__PURE__ */ I("g", { children: [
          /* @__PURE__ */ f(
            "circle",
            {
              cx: C,
              cy: A,
              r: "4",
              fill: b[0].solid,
              stroke: "white",
              strokeWidth: "2",
              className: "data-point"
            }
          ),
          l && /* @__PURE__ */ f(
            "text",
            {
              x: C,
              y: A - 10,
              textAnchor: "middle",
              className: "data-label",
              children: P
            }
          )
        ] }, R);
      }),
      n.map((P, R) => /* @__PURE__ */ f(
        "text",
        {
          x: R / (n.length - 1) * (r - 60) + 30,
          y: a - 30,
          textAnchor: "middle",
          className: "axis-label",
          children: P
        },
        R
      ))
    ] }) });
  }, y = () => {
    const v = t.reduce((P, R) => P + R, 0);
    let k = -90;
    const M = Math.min(r, a) / 2 - 40, S = r / 2, N = a / 2;
    return /* @__PURE__ */ f("div", { className: `chart-viz-container pie-chart ${u ? "visible" : ""}`, children: /* @__PURE__ */ I("svg", { width: r, height: a, className: "pie-svg", children: [
      t.map((P, R) => {
        const C = P / v * 360, A = k * Math.PI / 180, T = (k + C) * Math.PI / 180, O = S + M * Math.cos(A), D = N + M * Math.sin(A), E = S + M * Math.cos(T), B = N + M * Math.sin(T), z = C > 180 ? 1 : 0, L = [
          `M ${S} ${N}`,
          `L ${O} ${D}`,
          `A ${M} ${M} 0 ${z} 1 ${E} ${B}`,
          "Z"
        ].join(" ");
        return k += C, /* @__PURE__ */ f(
          "path",
          {
            d: L,
            fill: b[R % b.length].solid,
            stroke: "white",
            strokeWidth: "2",
            className: "pie-slice",
            style: { animationDelay: `${R * 0.1}s` }
          },
          R
        );
      }),
      /* @__PURE__ */ f(
        "circle",
        {
          cx: S,
          cy: N,
          r: M * 0.4,
          fill: "white",
          className: "pie-center"
        }
      )
    ] }) });
  }, _ = () => {
    const v = Math.max(...t), k = (r - 80) / t.length, M = a - 100;
    return /* @__PURE__ */ f("div", { className: `chart-viz-container bar-chart ${u ? "visible" : ""}`, children: /* @__PURE__ */ I("svg", { width: r, height: a, className: "bar-svg", children: [
      [0, 1, 2, 3, 4].map((S) => /* @__PURE__ */ f(
        "line",
        {
          x1: "40",
          y1: 40 + S * M / 4,
          x2: r - 20,
          y2: 40 + S * M / 4,
          stroke: "rgba(200, 200, 200, 0.3)",
          strokeWidth: "1"
        },
        S
      )),
      t.map((S, N) => {
        const P = S / v * M, R = 40 + N * k + k * 0.1, C = a - 60 - P, A = k * 0.8;
        return /* @__PURE__ */ I("g", { children: [
          /* @__PURE__ */ f(
            "rect",
            {
              x: R,
              y: C,
              width: A,
              height: P,
              fill: b[N % b.length].solid,
              className: "bar-item",
              style: { animationDelay: `${N * 0.1}s` }
            }
          ),
          l && /* @__PURE__ */ f(
            "text",
            {
              x: R + A / 2,
              y: C - 5,
              textAnchor: "middle",
              className: "data-label",
              children: S
            }
          ),
          n[N] && /* @__PURE__ */ f(
            "text",
            {
              x: R + A / 2,
              y: a - 30,
              textAnchor: "middle",
              className: "axis-label",
              children: n[N]
            }
          )
        ] }, N);
      })
    ] }) });
  }, x = () => !o || !n.length ? null : /* @__PURE__ */ f("div", { className: "chart-legend", children: n.map((v, k) => /* @__PURE__ */ I("div", { className: "legend-item", children: [
    /* @__PURE__ */ f(
      "span",
      {
        className: "legend-color",
        style: { backgroundColor: b[k % b.length].solid }
      }
    ),
    /* @__PURE__ */ f("span", { className: "legend-label", children: v }),
    e === "pie" && t[k] && /* @__PURE__ */ I("span", { className: "legend-value", children: [
      "(",
      (t[k] / t.reduce((M, S) => M + S, 0) * 100).toFixed(1),
      "%)"
    ] })
  ] }, k)) }), w = () => {
    switch (e) {
      case "line":
        return /* @__PURE__ */ f(m, {});
      case "pie":
        return /* @__PURE__ */ f(y, {});
      case "bar":
        return /* @__PURE__ */ f(_, {});
      default:
        return /* @__PURE__ */ f(m, {});
    }
  };
  return /* @__PURE__ */ I("div", { className: `chart-wrapper ${h}`, ref: d, children: [
    i && /* @__PURE__ */ f("h3", { className: "chart-title", children: i }),
    /* @__PURE__ */ I("div", { className: "chart-content", children: [
      w(),
      /* @__PURE__ */ f(x, {})
    ] })
  ] });
}, C1 = ({
  title: e = "Some Chat Room",
  lastActive: t = "0 min ago",
  initialMessages: n = [],
  currentUser: s = {
    name: "My profile",
    pic: "https://images.unsplash.com/photo-1534135954997-e58fbd6dbbfc?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=02d536c38d9cfeb4f35f17fdfaa36619"
  },
  otherUser: i = {
    name: "Other profile",
    pic: "https://images.unsplash.com/photo-1537396123722-b93d0acd8848?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE4NTg5fQ&s=efc6e85c24d3cfdd15cd36cb8a2471ed"
  },
  onSendMessage: r,
  enableAutoMessages: a = !1,
  placeholder: o = "Enter your message here..."
}) => {
  const [l, c] = X(n.length > 0 ? n : [
    { profile: "other", message: "Hello!" },
    { profile: "my", message: "Hi!" },
    { profile: "my", message: "How are you!" }
  ]), [h, d] = X(""), [u, g] = X(!1), [p, b] = X("40px"), m = H(null), y = H(null), _ = {
    my: s,
    other: i
  }, x = () => {
    m.current && (m.current.scrollTop = m.current.scrollHeight);
  };
  G(() => {
    x();
  }, [l]);
  const w = (N) => {
    d(N.target.value);
    const P = N.target;
    P.style.height = "0";
    const R = Math.min(P.scrollHeight + 1, 120);
    P.style.height = R + "px", b(R + "px");
  }, v = (N) => {
    N.key === "Enter" && !N.shiftKey && (N.preventDefault(), k());
  }, k = () => {
    if (h.trim() === "") return;
    const N = {
      profile: "my",
      message: h.trim()
    };
    c((P) => [...P, N]), d(""), b("40px"), y.current && (y.current.style.height = "40px"), r && r(N);
  }, M = (N, P) => {
    const R = { profile: N, message: P };
    c((C) => [...C, R]);
  };
  return G(() => {
    if (!a) return;
    const N = () => {
      setTimeout(() => {
        g(!0), setTimeout(() => {
          M("other", [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          ][Math.floor(Math.random() * 4)]), g(!1), N();
        }, 3e3);
      }, 8e3);
    }, P = setTimeout(N, 3e3);
    return () => clearTimeout(P);
  }, [a]), /* @__PURE__ */ f("div", { className: "flexbox", children: /* @__PURE__ */ I("div", { className: "chat-box", children: [
    /* @__PURE__ */ f("div", { className: "chat-box-header", children: /* @__PURE__ */ I("h3", { children: [
      e,
      /* @__PURE__ */ f("br", {}),
      /* @__PURE__ */ I("small", { children: [
        "Last active: ",
        t
      ] })
    ] }) }),
    /* @__PURE__ */ f("div", { className: "chat-box-body", ref: m, children: /* @__PURE__ */ f("div", { id: "chat_messages", children: (() => {
      const N = [];
      let P = null;
      return l.forEach((R, C) => {
        R.profile !== P && N.push(
          /* @__PURE__ */ I("div", { className: `profile ${R.profile}-profile`, children: [
            R.profile === "other" && /* @__PURE__ */ I(kt, { children: [
              /* @__PURE__ */ f(
                "img",
                {
                  src: _[R.profile].pic,
                  alt: _[R.profile].name,
                  width: "30",
                  height: "30"
                }
              ),
              /* @__PURE__ */ f("span", { children: _[R.profile].name })
            ] }),
            R.profile === "my" && /* @__PURE__ */ I(kt, { children: [
              /* @__PURE__ */ f("span", { children: _[R.profile].name }),
              /* @__PURE__ */ f(
                "img",
                {
                  src: _[R.profile].pic,
                  alt: _[R.profile].name,
                  width: "30",
                  height: "30"
                }
              )
            ] })
          ] }, `profile-${C}`)
        ), N.push(
          /* @__PURE__ */ f("div", { className: `message ${R.profile}-message`, children: R.message }, `message-${C}`)
        ), P = R.profile;
      }), N;
    })() }) }),
    /* @__PURE__ */ f("div", { className: `typing-indicator ${u ? "active" : ""}`, children: /* @__PURE__ */ I("div", { children: [
      /* @__PURE__ */ f("span", {}),
      /* @__PURE__ */ f("span", {}),
      /* @__PURE__ */ f("span", {}),
      /* @__PURE__ */ f("span", { className: "n", children: i.name }),
      " is typing..."
    ] }) }),
    /* @__PURE__ */ I("div", { className: "chat-box-footer", children: [
      /* @__PURE__ */ f(
        "textarea",
        {
          ref: y,
          value: h,
          onChange: w,
          onKeyDown: v,
          placeholder: o,
          className: "chat-input",
          style: { height: p }
        }
      ),
      /* @__PURE__ */ f("button", { onClick: k, className: "send-button", children: /* @__PURE__ */ f("svg", { style: { width: "24px", height: "24px" }, viewBox: "0 0 24 24", children: /* @__PURE__ */ f("path", { fill: "#006ae3", d: "M2,21L23,12L2,3V10L17,12L2,14V21Z" }) }) })
    ] })
  ] }) });
}, N1 = ({
  checked: e = !1,
  onChange: t,
  disabled: n = !1,
  label: s,
  id: i,
  name: r,
  value: a,
  className: o = "",
  color: l = "#6366F1",
  // Default indigo color
  matchTextColor: c = !1,
  ...h
}) => {
  const d = (m) => {
    t && !n && t(m);
  }, u = () => {
    let m = "checkbox-wrapper checkbox-basic";
    return n && (m += " checkbox-disabled"), o && (m += ` ${o}`), m;
  }, g = (m) => {
    const y = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(m);
    return y ? {
      r: parseInt(y[1], 16),
      g: parseInt(y[2], 16),
      b: parseInt(y[3], 16)
    } : { r: 99, g: 102, b: 241 };
  }, p = (m, y = 0.1) => {
    const _ = g(m);
    return `rgba(${_.r}, ${_.g}, ${_.b}, ${y})`;
  }, b = {
    "--checkbox-primary": l,
    "--checkbox-text": c ? l : null,
    "--checkbox-primary-light": p(l, 0.1),
    "--checkbox-primary-hover": p(l, 0.05)
  };
  return /* @__PURE__ */ I("div", { className: u(), style: b, children: [
    /* @__PURE__ */ f(
      "input",
      {
        type: "checkbox",
        id: i,
        name: r,
        value: a,
        checked: e,
        onChange: d,
        disabled: n,
        ...h
      }
    ),
    s && /* @__PURE__ */ f("label", { htmlFor: i, children: s })
  ] });
}, P1 = ({
  children: e,
  language: t = "javascript",
  showLineNumbers: n = !1,
  highlightLines: s = "",
  className: i = "",
  showCopyButton: r = !0,
  ...a
}) => {
  const o = H(null), l = H(null), [c, h] = X(!1), d = typeof e == "string" ? e.trim() : ve.Children.toArray(e).join("").trim();
  G(() => {
    if (n && l.current && o.current) {
      const m = l.current.querySelector(".line-numbers-rows");
      m && m.remove();
      const y = d.split(/\r\n|\r|\n/).length, _ = document.createElement("div");
      _.className = "line-numbers-rows", _.setAttribute("aria-hidden", "true");
      for (let x = 0; x < y; x++) {
        const w = document.createElement("span");
        _.appendChild(w);
      }
      l.current.insertBefore(_, o.current);
    }
    typeof window < "u" && window.Prism && o.current ? window.Prism.highlightElement(o.current) : typeof window < "u" && window.hljs && o.current && window.hljs.highlightElement(o.current);
  }, [d, t, n]);
  const u = async () => {
    if (o.current)
      try {
        if (navigator.clipboard && window.isSecureContext)
          await navigator.clipboard.writeText(o.current.textContent);
        else {
          const m = document.createElement("textarea");
          m.value = o.current.textContent, m.style.position = "absolute", m.style.left = "-999999px", document.body.prepend(m), m.select(), document.execCommand("copy"), m.remove();
        }
        h(!0), setTimeout(() => h(!1), 2e3);
      } catch (m) {
        console.warn("Failed to copy code:", m);
      }
  }, g = `language-${t}`, b = `${g} ${n ? "line-numbers" : ""} ${i}`.trim();
  return /* @__PURE__ */ I("figure", { className: "code-block-container", ...a, children: [
    /* @__PURE__ */ I("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: "10px", paddingRight: "10px" }, children: [
      /* @__PURE__ */ I("div", { style: { display: "flex", alignItems: "center", gap: "6px" }, children: [
        /* @__PURE__ */ f(
          "img",
          {
            src: "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/terminal.png",
            height: "15px",
            width: "15px",
            style: { filter: "brightness(0) saturate(100%) invert(54%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(90%) contrast(85%)" }
          }
        ),
        /* @__PURE__ */ f("figcaption", { className: "code-block-caption", children: t })
      ] }),
      r && /* @__PURE__ */ f(
        "button",
        {
          className: "copy-button",
          onClick: u,
          title: c ? "Copied!" : "Copy",
          "aria-label": c ? "Copied to clipboard" : "Copy code to clipboard",
          children: c ? /* @__PURE__ */ I("div", { style: { display: "flex", alignItems: "center", gap: "0.3rem", backgroundColor: "#1e293b", padding: "3px 5px", borderRadius: "6px" }, children: [
            /* @__PURE__ */ f("img", { src: "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/check.png", alt: "copied!", height: "13px", width: "13px", style: { filter: "brightness(0) invert(1)" } }),
            /* @__PURE__ */ f("p", { children: "copied" })
          ] }) : /* @__PURE__ */ f("div", { className: "copy-main", style: { display: "flex", alignItems: "center", gap: "0.3rem", backgroundColor: "#1e293b", padding: "4px 5px", borderRadius: "6px" }, children: /* @__PURE__ */ f("img", { src: "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/copy.png", alt: "copy", height: "13px", width: "13px", style: { filter: "brightness(0) invert(1)" } }) })
        }
      )
    ] }),
    /* @__PURE__ */ f(
      "pre",
      {
        ref: l,
        className: b,
        "data-line": s || void 0,
        children: /* @__PURE__ */ f(
          "code",
          {
            ref: o,
            className: g,
            contentEditable: "false",
            tabIndex: "0",
            spellCheck: "false",
            children: d
          }
        )
      }
    )
  ] });
}, ft = {
  Close: 0,
  CloseSelect: 1,
  First: 2,
  Last: 3,
  Next: 4,
  Open: 5,
  PageDown: 6,
  PageUp: 7,
  Previous: 8,
  Type: 10
};
function Ys(e = [], t, n = []) {
  return e.filter((s) => s.toLowerCase().indexOf(t.toLowerCase()) === 0 && n.indexOf(s) < 0);
}
function Po(e, t) {
  const { key: n, altKey: s, ctrlKey: i, metaKey: r } = e;
  if (!t && ["ArrowDown", "ArrowUp", "Enter", " "].includes(n))
    return ft.Open;
  if (n === "Home")
    return ft.First;
  if (n === "End")
    return ft.Last;
  if (n === "Backspace" || n === "Clear" || n.length === 1 && n !== " " && !s && !i && !r)
    return ft.Type;
  if (t) {
    if (n === "ArrowUp" && s)
      return ft.CloseSelect;
    if (n === "ArrowDown" && !s)
      return ft.Next;
    if (n === "ArrowUp")
      return ft.Previous;
    if (n === "PageUp")
      return ft.PageUp;
    if (n === "PageDown")
      return ft.PageDown;
    if (n === "Escape")
      return ft.Close;
    if (n === "Enter" || n === " ")
      return ft.CloseSelect;
  }
}
function To(e, t, n = 0) {
  const s = [
    ...e.slice(n),
    ...e.slice(0, n)
  ], i = Ys(s, t)[0], r = (a) => a.every((o) => o === a[0]);
  if (i)
    return e.indexOf(i);
  if (r(t.split(""))) {
    const a = Ys(s, t[0]);
    return e.indexOf(a[0]);
  } else
    return -1;
}
function $o(e, t, n) {
  switch (n) {
    case ft.First:
      return 0;
    case ft.Last:
      return t;
    case ft.Previous:
      return Math.max(0, e - 1);
    case ft.Next:
      return Math.min(t, e + 1);
    case ft.PageUp:
      return Math.max(0, e - 10);
    case ft.PageDown:
      return Math.min(t, e + 10);
    default:
      return e;
  }
}
function Us(e) {
  const t = e.getBoundingClientRect();
  return t.top >= 0 && t.left >= 0 && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) && t.right <= (window.innerWidth || document.documentElement.clientWidth);
}
function Ao(e) {
  return e && e.clientHeight < e.scrollHeight;
}
function Do(e, t) {
  const { offsetHeight: n, offsetTop: s } = e, { offsetHeight: i, scrollTop: r } = t, a = s < r, o = s + n > r + i;
  a ? t.scrollTo(0, s) : o && t.scrollTo(0, s - i + n);
}
const T1 = ({
  label: e,
  options: t = [],
  value: n,
  onChange: s,
  placeholder: i = "Choose an option",
  className: r = "",
  disabled: a = !1,
  id: o,
  ...l
}) => {
  const c = po(), h = o || c, [d, u] = X(!1), [g, p] = X(0), [b, m] = X(-1), [y, _] = X(""), x = H(null), w = H(null), v = H(null), k = H(!1);
  G(() => {
    if (n !== void 0) {
      const z = t.indexOf(n);
      m(z), p(z >= 0 ? z : 0);
    }
  }, [n, t]);
  const M = (z) => {
    v.current && clearTimeout(v.current), v.current = setTimeout(() => {
      _("");
    }, 500);
    const L = y + z;
    return _(L), L;
  }, S = () => {
    if (k.current) {
      k.current = !1;
      return;
    }
    d && (C(g), u(!1));
  }, N = () => {
    a || u(!d);
  }, P = (z) => {
    if (a) return;
    const L = t.length - 1, $ = Po(z, d);
    switch ($) {
      case ft.Last:
      case ft.First:
        u(!0);
      // intentional fallthrough
      case ft.Next:
      case ft.Previous:
      case ft.PageUp:
      case ft.PageDown:
        z.preventDefault();
        const F = $o(g, L, $);
        p(F);
        return;
      case ft.CloseSelect:
        z.preventDefault(), C(g);
      // intentional fallthrough
      case ft.Close:
        z.preventDefault(), u(!1);
        return;
      case ft.Type:
        R(z.key);
        return;
      case ft.Open:
        z.preventDefault(), u(!0);
        return;
    }
  }, R = (z) => {
    u(!0);
    const L = M(z), $ = To(t, L, g + 1);
    $ >= 0 ? p($) : (v.current && clearTimeout(v.current), _(""));
  }, C = (z) => {
    m(z), p(z), s && t[z] && s(t[z], z);
  }, A = (z) => {
    p(z), C(z), u(!1);
  }, T = () => {
    k.current = !0;
  };
  G(() => {
    if (d && w.current) {
      const L = w.current.querySelectorAll("[role=option]")[g];
      L && (Ao(w.current) && Do(L, w.current), Us(L) || L.scrollIntoView({ behavior: "smooth", block: "nearest" }));
    }
  }, [g, d]), G(() => {
    !d && x.current && !Us(x.current) && x.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [d]);
  const O = b >= 0 ? t[b] : i, D = `combo-${h}`, E = `listbox-${h}`, B = e ? `${D}-label` : void 0;
  return /* @__PURE__ */ I("div", { className: `combo-wrapper ${r}`, children: [
    e && /* @__PURE__ */ f("label", { id: B, className: "combo-label", children: e }),
    /* @__PURE__ */ I("div", { className: `combo ${d ? "open" : ""}`, children: [
      /* @__PURE__ */ f(
        "div",
        {
          ref: x,
          id: D,
          role: "combobox",
          className: "combo-input",
          tabIndex: a ? -1 : 0,
          "aria-controls": E,
          "aria-expanded": d,
          "aria-haspopup": "listbox",
          "aria-labelledby": B,
          "aria-activedescendant": d ? `${D}-${g}` : "",
          onBlur: S,
          onClick: N,
          onKeyDown: P,
          ...l,
          children: O
        }
      ),
      /* @__PURE__ */ f(
        "div",
        {
          ref: w,
          id: E,
          role: "listbox",
          className: "combo-menu",
          "aria-labelledby": B,
          tabIndex: -1,
          children: t.map((z, L) => /* @__PURE__ */ f(
            "div",
            {
              id: `${D}-${L}`,
              role: "option",
              className: `combo-option ${L === g ? "option-current" : ""}`,
              "aria-selected": L === b,
              onClick: () => A(L),
              onMouseDown: T,
              children: z
            },
            L
          ))
        }
      )
    ] })
  ] });
}, $1 = ({
  children: e,
  color: t = "#7F59AB",
  width: n = "300px",
  height: s = "450px",
  className: i = ""
}) => {
  const [r, a] = X({ x: 0, y: 0 }), [o, l] = X({ x: 0, y: 0 }), [c, h] = X(!1), d = H(null), u = H(null), p = ((w) => {
    const v = parseInt(w.slice(1, 3), 16), k = parseInt(w.slice(3, 5), 16), M = parseInt(w.slice(5, 7), 16), S = w, N = `rgb(${Math.min(v + 40, 255)}, ${Math.min(k - 20, 255)}, ${Math.max(M - 40, 0)})`, P = `rgb(${Math.max(v - 60, 0)}, ${Math.max(k - 40, 0)}, ${Math.max(M - 100, 0)})`;
    return { color1: S, color2: N, color3: P };
  })(t), b = (w) => {
    if (!d.current) return;
    const v = d.current.getBoundingClientRect(), k = v.width / 2, M = v.height / 2;
    a({
      x: w.clientX - v.left - k,
      y: w.clientY - v.top - M
    });
  }, m = () => {
    a({ x: 0, y: 0 }), h(!1);
  }, y = () => {
    h(!0);
  };
  G(() => {
    const w = () => {
      l((v) => ({
        x: v.x + (r.x - v.x) / 12,
        y: v.y + (r.y - v.y) / 12
      })), u.current = requestAnimationFrame(w);
    };
    return u.current = requestAnimationFrame(w), () => {
      u.current && cancelAnimationFrame(u.current);
    };
  }, [r]);
  const _ = {
    transform: `scale(1.03) translate(${o.x * 0.05}px, ${o.y * 0.05}px) rotateX(${o.y * 0.05}deg) rotateY(${o.x * 0.05}deg)`,
    width: n,
    height: s,
    "--base-color": t,
    "--gradient-color1": p.color1,
    "--gradient-color2": p.color2,
    "--gradient-color3": p.color3
  }, x = {
    background: `radial-gradient(circle at ${r.x + (d.current?.offsetWidth / 2 || 0)}px ${r.y + (d.current?.offsetHeight / 2 || 0)}px, rgba(255,255,255,0.4), transparent)`
  };
  return /* @__PURE__ */ f("div", { className: "cosmic-card-wrapper", children: /* @__PURE__ */ I(
    "div",
    {
      ref: d,
      className: `cosmic-card ${c ? "hovered" : ""} ${i}`,
      style: _,
      onMouseMove: b,
      onMouseLeave: m,
      onMouseEnter: y,
      children: [
        /* @__PURE__ */ f("div", { className: "cosmic-card-svg-background", children: /* @__PURE__ */ I("svg", { className: "cosmic-svg", viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid slice", children: [
          /* @__PURE__ */ I("defs", { children: [
            /* @__PURE__ */ I("linearGradient", { id: `cosmic-gradient-${t}`, x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [
              /* @__PURE__ */ f("stop", { offset: "0%", stopColor: p.color1 }),
              /* @__PURE__ */ f("stop", { offset: "50%", stopColor: p.color2 }),
              /* @__PURE__ */ f("stop", { offset: "100%", stopColor: p.color3 })
            ] }),
            /* @__PURE__ */ I("filter", { id: `cosmic-filter-${t}`, colorInterpolationFilters: "sRGB", x: "0", y: "0", width: "100%", height: "100%", children: [
              /* @__PURE__ */ f("feTurbulence", { baseFrequency: "2", numOctaves: "1", type: "fractalNoise" }),
              /* @__PURE__ */ f("feColorMatrix", { type: "matrix", values: "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 0" }),
              /* @__PURE__ */ I("feComponentTransfer", { children: [
                /* @__PURE__ */ f("feFuncR", { type: "discrete", children: /* @__PURE__ */ f("animate", { attributeName: "tableValues", values: `0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0`, dur: "6s", repeatCount: "indefinite" }) }),
                /* @__PURE__ */ f("feFuncG", { type: "discrete", children: /* @__PURE__ */ f("animate", { attributeName: "tableValues", values: `0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0`, dur: "6s", repeatCount: "indefinite" }) }),
                /* @__PURE__ */ f("feFuncB", { type: "discrete", children: /* @__PURE__ */ f("animate", { attributeName: "tableValues", values: `0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0;\r
                    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0`, dur: "6s", repeatCount: "indefinite" }) }),
                /* @__PURE__ */ f("feFuncA", { type: "discrete", children: /* @__PURE__ */ f("animate", { attributeName: "tableValues", values: `0.261 0.199 0.147 0.105 0.076 0.060 0.057 0.068 0.091 0.128 0.175 0.232 0.296 0.366 0.440 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.429 0.351 0.277 0.207 0.146 0.094 0.053 0.026 0.012 0.012 0.027 0.055 0.096 0.148 0.209 0.277 0.350 0.424 0.498 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.425 0.346 0.270 0.197 0.133 0.078 0.032 0.007 0.030 0.024 0.010 0.060 0.116 0.178 0.248 0.321 0.396 0.467 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.432 0.355 0.277 0.202 0.119 0.055 0.415 0.784 0.779 0.395 0.024 0.152 0.236 0.311 0.382 0.444 0.490 0.500 0.500 0.487 0.438 0.370 0.293 0.210 0.008 0.600 0.904 0.568 0.044 0.233 0.310 0.364 0.379 0.346 0.273 0.151 0.130 0.245 0.303 0.303 0.230 0.020 0.378 0.074 0.202 0.294 0.368 0.423 0.447 0.438 0.399 0.338 0.265 0.175 0.080 0.722 0.939 0.936 0.342 0.072 0.205 0.283 0.361 0.436 0.499 0.500 0.500 0.500 0.500 0.500 0.492 0.430 0.359 0.285 0.212 0.140 0.048 0.091 0.228 0.256 0.155 0.019 0.079 0.148 0.217 0.292 0.370 0.448 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.473 0.400 0.325 0.252 0.184 0.124 0.073 0.035 0.010 0.000 0.006 0.027 0.061 0.108 0.166 0.234 0.307 0.385 0.463 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.446 0.371 0.299 0.231 0.171 0.119 0.077 0.048 0.032 0.029 0.041 0.065 0.102 0.151 0.210 0.277 0.350 0.427 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500;\r
                    0.141 0.102 0.075 0.062 0.062 0.076 0.102 0.141 0.190 0.249 0.315 0.386 0.460 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.421 0.344 0.270 0.201 0.141 0.090 0.051 0.025 0.013 0.015 0.031 0.060 0.102 0.155 0.217 0.285 0.358 0.433 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.434 0.356 0.279 0.206 0.141 0.085 0.039 0.003 0.019 0.018 0.008 0.052 0.105 0.166 0.234 0.306 0.381 0.453 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.468 0.394 0.315 0.238 0.164 0.061 0.171 0.538 0.759 0.582 0.198 0.069 0.186 0.262 0.336 0.406 0.464 0.500 0.500 0.500 0.489 0.437 0.369 0.291 0.208 0.012 0.593 0.909 0.707 0.027 0.213 0.296 0.358 0.388 0.373 0.315 0.230 0.065 0.167 0.245 0.293 0.322 0.273 0.149 0.269 0.408 0.031 0.230 0.313 0.385 0.435 0.456 0.445 0.405 0.344 0.271 0.187 0.025 0.595 0.941 0.943 0.467 0.014 0.181 0.261 0.339 0.416 0.484 0.500 0.500 0.500 0.500 0.500 0.500 0.469 0.402 0.329 0.255 0.183 0.111 0.013 0.115 0.207 0.188 0.083 0.025 0.103 0.168 0.238 0.314 0.393 0.470 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.471 0.398 0.323 0.251 0.183 0.123 0.073 0.035 0.011 0.001 0.007 0.027 0.061 0.108 0.166 0.233 0.307 0.384 0.462 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.462 0.387 0.314 0.246 0.184 0.130 0.087 0.055 0.037 0.032 0.040 0.063 0.098 0.144 0.201 0.267 0.339 0.415 0.493 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500;\r
                    0.076 0.065 0.068 0.085 0.114 0.155 0.206 0.267 0.334 0.406 0.480 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.491 0.413 0.335 0.262 0.194 0.135 0.086 0.049 0.025 0.014 0.018 0.036 0.066 0.109 0.163 0.226 0.295 0.368 0.442 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.442 0.364 0.287 0.214 0.147 0.091 0.045 0.010 0.011 0.013 0.008 0.047 0.097 0.155 0.221 0.294 0.368 0.441 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.429 0.352 0.273 0.199 0.122 0.018 0.298 0.607 0.649 0.368 0.046 0.129 0.216 0.291 0.364 0.431 0.485 0.500 0.500 0.500 0.489 0.434 0.364 0.286 0.203 0.004 0.605 0.914 0.814 0.092 0.194 0.284 0.350 0.391 0.392 0.350 0.276 0.156 0.008 0.209 0.245 0.276 0.330 0.308 0.233 0.001 0.497 0.343 0.103 0.250 0.329 0.399 0.446 0.465 0.453 0.413 0.352 0.280 0.200 0.031 0.452 0.942 0.948 0.609 0.066 0.151 0.237 0.315 0.393 0.464 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.445 0.375 0.301 0.227 0.158 0.083 0.014 0.121 0.172 0.127 0.031 0.055 0.121 0.186 0.258 0.335 0.413 0.490 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.471 0.398 0.323 0.251 0.183 0.124 0.074 0.036 0.012 0.002 0.008 0.028 0.061 0.108 0.165 0.232 0.305 0.382 0.460 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.478 0.404 0.330 0.261 0.198 0.142 0.097 0.063 0.042 0.035 0.041 0.060 0.093 0.137 0.192 0.256 0.327 0.403 0.481 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500;\r
                    0.075 0.094 0.126 0.170 0.223 0.285 0.353 0.426 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.482 0.403 0.327 0.254 0.188 0.130 0.083 0.047 0.025 0.016 0.022 0.041 0.073 0.118 0.172 0.236 0.305 0.378 0.453 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.449 0.371 0.293 0.220 0.153 0.096 0.050 0.015 0.006 0.009 0.008 0.043 0.090 0.146 0.211 0.282 0.357 0.430 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.462 0.386 0.307 0.231 0.159 0.067 0.119 0.408 0.594 0.478 0.176 0.057 0.171 0.247 0.321 0.393 0.456 0.500 0.500 0.500 0.500 0.487 0.429 0.357 0.279 0.195 0.015 0.637 0.919 0.887 0.142 0.178 0.274 0.344 0.392 0.405 0.376 0.312 0.226 0.028 0.034 0.242 0.245 0.253 0.326 0.333 0.281 0.174 0.218 0.639 0.246 0.149 0.264 0.343 0.410 0.456 0.474 0.461 0.422 0.363 0.291 0.214 0.082 0.306 0.937 0.953 0.753 0.172 0.110 0.211 0.288 0.366 0.441 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.487 0.421 0.349 0.274 0.202 0.134 0.060 0.032 0.114 0.132 0.077 0.005 0.075 0.137 0.203 0.277 0.354 0.432 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.472 0.399 0.324 0.252 0.185 0.125 0.076 0.038 0.013 0.003 0.008 0.028 0.061 0.107 0.164 0.230 0.302 0.379 0.457 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.495 0.421 0.347 0.277 0.212 0.155 0.108 0.072 0.049 0.039 0.042 0.059 0.089 0.131 0.184 0.246 0.316 0.391 0.468 0.500 0.500 0.500 0.500 0.500 0.500 0.500;\r
                    0.139 0.185 0.240 0.304 0.373 0.446 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.472 0.393 0.317 0.245 0.180 0.124 0.079 0.045 0.025 0.018 0.026 0.047 0.081 0.127 0.182 0.247 0.317 0.390 0.465 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.454 0.376 0.298 0.225 0.158 0.100 0.053 0.019 0.002 0.006 0.009 0.040 0.084 0.139 0.203 0.273 0.347 0.421 0.492 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.491 0.417 0.339 0.262 0.188 0.114 0.006 0.228 0.465 0.500 0.286 0.030 0.122 0.206 0.280 0.354 0.423 0.482 0.500 0.500 0.500 0.500 0.483 0.421 0.347 0.269 0.183 0.046 0.689 0.924 0.910 0.172 0.166 0.267 0.338 0.391 0.414 0.397 0.343 0.266 0.134 0.097 0.118 0.267 0.245 0.224 0.312 0.347 0.319 0.250 0.079 0.460 0.693 0.156 0.177 0.276 0.353 0.420 0.465 0.482 0.471 0.434 0.376 0.305 0.230 0.125 0.168 0.742 0.955 0.880 0.304 0.053 0.182 0.259 0.337 0.414 0.485 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.467 0.398 0.325 0.251 0.180 0.114 0.041 0.040 0.098 0.095 0.039 0.030 0.091 0.151 0.219 0.294 0.372 0.450 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.475 0.401 0.327 0.255 0.187 0.128 0.078 0.040 0.015 0.005 0.009 0.027 0.060 0.105 0.161 0.226 0.299 0.375 0.454 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.438 0.365 0.293 0.228 0.169 0.120 0.082 0.056 0.043 0.044 0.058 0.085 0.125 0.176 0.236 0.304 0.378 0.456 0.500 0.500 0.500 0.500 0.500;\r
                    0.258 0.323 0.393 0.467 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.461 0.383 0.308 0.237 0.173 0.119 0.075 0.044 0.025 0.021 0.030 0.053 0.089 0.136 0.193 0.258 0.329 0.403 0.477 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.458 0.380 0.302 0.229 0.161 0.103 0.056 0.022 0.001 0.004 0.009 0.038 0.080 0.133 0.196 0.266 0.339 0.414 0.485 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.447 0.370 0.291 0.216 0.146 0.060 0.096 0.317 0.447 0.349 0.117 0.067 0.167 0.241 0.315 0.388 0.454 0.500 0.500 0.500 0.500 0.500 0.476 0.410 0.335 0.257 0.167 0.092 0.761 0.928 0.914 0.178 0.160 0.262 0.335 0.392 0.420 0.413 0.369 0.298 0.205 0.044 0.097 0.194 0.287 0.245 0.185 0.288 0.347 0.348 0.299 0.214 0.058 0.680 0.688 0.087 0.193 0.284 0.361 0.427 0.472 0.491 0.481 0.446 0.390 0.321 0.247 0.159 0.051 0.533 0.955 0.958 0.454 0.028 0.147 0.229 0.306 0.384 0.458 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.448 0.377 0.302 0.229 0.161 0.096 0.027 0.041 0.079 0.064 0.012 0.047 0.104 0.165 0.234 0.309 0.387 0.465 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.479 0.405 0.331 0.258 0.191 0.131 0.081 0.043 0.017 0.006 0.009 0.027 0.059 0.103 0.158 0.223 0.294 0.371 0.449 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.457 0.383 0.311 0.244 0.184 0.133 0.092 0.064 0.048 0.046 0.057 0.082 0.119 0.168 0.226 0.293 0.366 0.443 0.500 0.500 0.500;\r
                    0.414 0.488 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.450 0.372 0.298 0.228 0.166 0.113 0.071 0.042 0.026 0.024 0.036 0.061 0.098 0.147 0.205 0.271 0.342 0.416 0.491 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.461 0.383 0.305 0.231 0.164 0.106 0.059 0.024 0.003 0.002 0.009 0.036 0.077 0.129 0.190 0.260 0.333 0.407 0.479 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.474 0.398 0.319 0.243 0.171 0.099 0.009 0.186 0.352 0.356 0.186 0.007 0.128 0.205 0.278 0.352 0.423 0.484 0.500 0.500 0.500 0.500 0.500 0.465 0.397 0.320 0.242 0.144 0.155 0.848 0.932 0.892 0.163 0.160 0.261 0.333 0.393 0.426 0.426 0.390 0.325 0.244 0.070 0.224 0.028 0.243 0.300 0.245 0.143 0.258 0.333 0.364 0.339 0.276 0.170 0.227 0.854 0.657 0.038 0.203 0.290 0.367 0.433 0.478 0.499 0.492 0.460 0.407 0.340 0.266 0.187 0.040 0.331 0.837 0.963 0.604 0.137 0.101 0.197 0.273 0.351 0.428 0.498 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.496 0.429 0.356 0.282 0.210 0.143 0.081 0.018 0.037 0.060 0.039 0.008 0.060 0.115 0.177 0.247 0.323 0.401 0.479 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.484 0.410 0.336 0.263 0.196 0.136 0.085 0.046 0.020 0.008 0.010 0.027 0.057 0.100 0.154 0.218 0.289 0.365 0.443 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.476 0.401 0.329 0.261 0.199 0.146 0.103 0.072 0.054 0.049 0.057 0.079 0.114 0.160 0.217 0.282 0.354 0.430 0.500;\r
                    0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.439 0.361 0.287 0.219 0.159 0.108 0.068 0.041 0.028 0.028 0.042 0.069 0.108 0.158 0.218 0.285 0.356 0.431 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.463 0.384 0.307 0.233 0.166 0.107 0.060 0.026 0.005 0.001 0.010 0.035 0.075 0.126 0.187 0.255 0.328 0.403 0.475 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.498 0.424 0.346 0.268 0.195 0.127 0.045 0.087 0.248 0.318 0.223 0.048 0.087 0.171 0.244 0.318 0.391 0.458 0.500 0.500 0.500 0.500 0.500 0.500 0.452 0.381 0.303 0.225 0.114 0.237 0.929 0.936 0.823 0.128 0.165 0.261 0.335 0.395 0.432 0.437 0.408 0.348 0.271 0.153 0.186 0.210 0.156 0.277 0.306 0.245 0.119 0.216 0.308 0.363 0.367 0.325 0.254 0.112 0.404 0.898 0.623 0.008 0.209 0.293 0.370 0.436 0.484 0.500 0.500 0.475 0.425 0.360 0.287 0.211 0.106 0.157 0.619 0.921 0.724 0.271 0.036 0.162 0.238 0.315 0.393 0.467 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.481 0.412 0.338 0.264 0.193 0.129 0.069 0.012 0.031 0.043 0.020 0.022 0.070 0.124 0.188 0.259 0.336 0.414 0.491 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.490 0.417 0.342 0.270 0.202 0.141 0.090 0.050 0.023 0.010 0.011 0.026 0.055 0.097 0.150 0.213 0.283 0.359 0.437 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.495 0.420 0.347 0.278 0.215 0.160 0.115 0.081 0.060 0.053 0.058 0.077 0.109 0.153 0.208 0.271 0.342;\r
                    0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.427 0.350 0.277 0.210 0.151 0.102 0.065 0.041 0.029 0.032 0.048 0.077 0.119 0.171 0.231 0.299 0.371 0.446 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.463 0.385 0.307 0.234 0.166 0.108 0.061 0.027 0.006 0.000 0.010 0.035 0.073 0.124 0.184 0.252 0.325 0.400 0.473 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.448 0.370 0.292 0.217 0.148 0.079 0.019 0.155 0.256 0.228 0.091 0.048 0.140 0.212 0.285 0.359 0.430 0.492 0.500 0.500 0.500 0.500 0.500 0.499 0.436 0.361 0.283 0.205 0.072 0.342 0.936 0.939 0.722 0.080 0.175 0.265 0.338 0.399 0.438 0.447 0.423 0.368 0.294 0.202 0.074 0.378 0.020 0.230 0.303 0.303 0.245 0.130 0.151 0.273 0.346 0.379 0.364 0.310 0.233 0.044 0.568 0.904 0.600 0.008 0.210 0.293 0.370 0.438 0.487 0.500 0.500 0.490 0.444 0.382 0.311 0.236 0.152 0.024 0.395 0.779 0.784 0.415 0.055 0.119 0.202 0.277 0.355 0.432 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.467 0.396 0.321 0.248 0.178 0.116 0.060 0.010 0.024 0.030 0.007 0.032 0.078 0.133 0.197 0.270 0.346 0.425 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.498 0.424 0.350 0.277 0.209 0.148 0.096 0.055 0.027 0.012 0.012 0.026 0.053 0.094 0.146 0.207 0.277 0.351 0.429 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.440 0.366 0.296 0.232 0.175 0.128 0.091 0.068 0.057 0.060 0.076 0.105 0.147 0.199;\r
                    0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.493 0.415 0.339 0.267 0.201 0.144 0.098 0.063 0.040 0.032 0.037 0.055 0.087 0.130 0.184 0.246 0.314 0.387 0.462 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.462 0.384 0.307 0.233 0.166 0.108 0.061 0.027 0.007 0.001 0.011 0.035 0.073 0.123 0.183 0.251 0.323 0.398 0.471 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.470 0.393 0.314 0.238 0.168 0.103 0.025 0.083 0.188 0.207 0.115 0.013 0.111 0.183 0.255 0.329 0.402 0.469 0.500 0.500 0.500 0.500 0.500 0.500 0.484 0.416 0.339 0.261 0.181 0.014 0.467 0.943 0.941 0.595 0.025 0.187 0.271 0.344 0.405 0.445 0.456 0.435 0.385 0.313 0.230 0.031 0.408 0.269 0.149 0.273 0.322 0.293 0.245 0.167 0.065 0.230 0.315 0.373 0.388 0.358 0.296 0.213 0.027 0.707 0.909 0.593 0.012 0.208 0.291 0.369 0.437 0.489 0.500 0.500 0.500 0.464 0.406 0.336 0.262 0.186 0.069 0.198 0.582 0.759 0.538 0.171 0.061 0.164 0.238 0.315 0.394 0.468 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.453 0.381 0.306 0.234 0.166 0.105 0.052 0.008 0.018 0.019 0.003 0.039 0.085 0.141 0.206 0.279 0.356 0.434 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.433 0.358 0.285 0.217 0.155 0.102 0.060 0.031 0.015 0.013 0.025 0.051 0.090 0.141 0.201 0.270 0.344 0.421 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.460 0.386 0.315 0.249 0.190 0.141 0.102 0.076 0.062 0.062 0.075 0.102;\r
                    0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.481 0.403 0.327 0.256 0.192 0.137 0.093 0.060 0.041 0.035 0.042 0.063 0.097 0.142 0.198 0.261 0.330 0.404 0.478 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.460 0.382 0.305 0.232 0.165 0.108 0.061 0.028 0.008 0.002 0.012 0.036 0.074 0.124 0.183 0.251 0.323 0.398 0.471 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.490 0.413 0.335 0.258 0.186 0.121 0.055 0.031 0.127 0.172 0.121 0.014 0.083 0.158 0.227 0.301 0.375 0.445 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.464 0.393 0.315 0.237 0.151 0.066 0.609 0.948 0.942 0.452 0.031 0.200 0.280 0.352 0.413 0.453 0.465 0.446 0.399 0.329 0.250 0.103 0.343 0.497 0.001 0.233 0.308 0.330 0.276 0.245 0.209 0.008 0.156 0.276 0.350 0.392 0.391 0.350 0.284 0.194 0.092 0.814 0.914 0.605 0.004 0.203 0.286 0.364 0.434 0.489 0.500 0.500 0.500 0.485 0.431 0.364 0.291 0.216 0.129 0.046 0.368 0.649 0.607 0.298 0.018 0.122 0.199 0.273 0.352 0.429 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.441 0.368 0.294 0.221 0.155 0.097 0.047 0.008 0.013 0.011 0.010 0.045 0.091 0.147 0.214 0.287 0.364 0.442 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.442 0.368 0.295 0.226 0.163 0.109 0.066 0.036 0.018 0.014 0.025 0.049 0.086 0.135 0.194 0.262 0.335 0.413 0.491 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.480 0.406 0.334 0.267 0.206 0.155 0.114 0.085 0.068 0.065;\r
                    0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.468 0.391 0.316 0.246 0.184 0.131 0.089 0.059 0.042 0.039 0.049 0.072 0.108 0.155 0.212 0.277 0.347 0.421 0.495 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.457 0.379 0.302 0.230 0.164 0.107 0.061 0.028 0.008 0.003 0.013 0.038 0.076 0.125 0.185 0.252 0.324 0.399 0.472 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.432 0.354 0.277 0.203 0.137 0.075 0.005 0.077 0.132 0.114 0.032 0.060 0.134 0.202 0.274 0.349 0.421 0.487 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.441 0.366 0.288 0.211 0.110 0.172 0.753 0.953 0.937 0.306 0.082 0.214 0.291 0.363 0.422 0.461 0.474 0.456 0.410 0.343 0.264 0.149 0.246 0.639 0.218 0.174 0.281 0.333 0.326 0.253 0.245 0.242 0.034 0.028 0.226 0.312 0.376 0.405 0.392 0.344 0.274 0.178 0.142 0.887 0.919 0.637 0.015 0.195 0.279 0.357 0.429 0.487 0.500 0.500 0.500 0.500 0.456 0.393 0.321 0.247 0.171 0.057 0.176 0.478 0.594 0.408 0.119 0.067 0.159 0.231 0.307 0.386 0.462 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.430 0.357 0.282 0.211 0.146 0.090 0.043 0.008 0.009 0.006 0.015 0.050 0.096 0.153 0.220 0.293 0.371 0.449 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.453 0.378 0.305 0.236 0.172 0.118 0.073 0.041 0.022 0.016 0.025 0.047 0.083 0.130 0.188 0.254 0.327 0.403 0.482 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.426 0.353 0.285 0.223 0.170 0.126 0.094;\r
                    0.500 0.500 0.500 0.500 0.500 0.500 0.456 0.378 0.304 0.236 0.176 0.125 0.085 0.058 0.044 0.043 0.056 0.082 0.120 0.169 0.228 0.293 0.365 0.438 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.454 0.375 0.299 0.226 0.161 0.105 0.060 0.027 0.009 0.005 0.015 0.040 0.078 0.128 0.187 0.255 0.327 0.401 0.475 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.450 0.372 0.294 0.219 0.151 0.091 0.030 0.039 0.095 0.098 0.040 0.041 0.114 0.180 0.251 0.325 0.398 0.467 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.485 0.414 0.337 0.259 0.182 0.053 0.304 0.880 0.955 0.742 0.168 0.125 0.230 0.305 0.376 0.434 0.471 0.482 0.465 0.420 0.353 0.276 0.177 0.156 0.693 0.460 0.079 0.250 0.319 0.347 0.312 0.224 0.245 0.267 0.118 0.097 0.134 0.266 0.343 0.397 0.414 0.391 0.338 0.267 0.166 0.172 0.910 0.924 0.689 0.046 0.183 0.269 0.347 0.421 0.483 0.500 0.500 0.500 0.500 0.482 0.423 0.354 0.280 0.206 0.122 0.030 0.286 0.500 0.465 0.228 0.006 0.114 0.188 0.262 0.339 0.417 0.491 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.492 0.421 0.347 0.273 0.203 0.139 0.084 0.040 0.009 0.006 0.002 0.019 0.053 0.100 0.158 0.225 0.298 0.376 0.454 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.465 0.390 0.317 0.247 0.182 0.127 0.081 0.047 0.026 0.018 0.025 0.045 0.079 0.124 0.180 0.245 0.317 0.393 0.472 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.446 0.373 0.304 0.240 0.185;\r
                    0.500 0.500 0.500 0.500 0.443 0.366 0.293 0.226 0.168 0.119 0.082 0.057 0.046 0.048 0.064 0.092 0.133 0.184 0.244 0.311 0.383 0.457 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.449 0.371 0.294 0.223 0.158 0.103 0.059 0.027 0.009 0.006 0.017 0.043 0.081 0.131 0.191 0.258 0.331 0.405 0.479 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.465 0.387 0.309 0.234 0.165 0.104 0.047 0.012 0.064 0.079 0.041 0.027 0.096 0.161 0.229 0.302 0.377 0.448 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.458 0.384 0.306 0.229 0.147 0.028 0.454 0.958 0.955 0.533 0.051 0.159 0.247 0.321 0.390 0.446 0.481 0.491 0.472 0.427 0.361 0.284 0.193 0.087 0.688 0.680 0.058 0.214 0.299 0.348 0.347 0.288 0.185 0.245 0.287 0.194 0.097 0.044 0.205 0.298 0.369 0.413 0.420 0.392 0.335 0.262 0.160 0.178 0.914 0.928 0.761 0.092 0.167 0.257 0.335 0.410 0.476 0.500 0.500 0.500 0.500 0.500 0.454 0.388 0.315 0.241 0.167 0.067 0.117 0.349 0.447 0.317 0.096 0.060 0.146 0.216 0.291 0.370 0.447 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.485 0.414 0.339 0.266 0.196 0.133 0.080 0.038 0.009 0.004 0.001 0.022 0.056 0.103 0.161 0.229 0.302 0.380 0.458 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.477 0.403 0.329 0.258 0.193 0.136 0.089 0.053 0.030 0.021 0.025 0.044 0.075 0.119 0.173 0.237 0.308 0.383 0.461 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.467 0.393 0.323;\r
                    0.500 0.500 0.430 0.354 0.282 0.217 0.160 0.114 0.079 0.057 0.049 0.054 0.072 0.103 0.146 0.199 0.261 0.329 0.401 0.476 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.443 0.365 0.289 0.218 0.154 0.100 0.057 0.027 0.010 0.008 0.020 0.046 0.085 0.136 0.196 0.263 0.336 0.410 0.484 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.479 0.401 0.323 0.247 0.177 0.115 0.060 0.008 0.039 0.060 0.037 0.018 0.081 0.143 0.210 0.282 0.356 0.429 0.496 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.498 0.428 0.351 0.273 0.197 0.101 0.137 0.604 0.963 0.837 0.331 0.040 0.187 0.266 0.340 0.407 0.460 0.492 0.499 0.478 0.433 0.367 0.290 0.203 0.038 0.657 0.854 0.227 0.170 0.276 0.339 0.364 0.333 0.258 0.143 0.245 0.300 0.243 0.028 0.224 0.070 0.244 0.325 0.390 0.426 0.426 0.393 0.333 0.261 0.160 0.163 0.892 0.932 0.848 0.155 0.144 0.242 0.320 0.397 0.465 0.500 0.500 0.500 0.500 0.500 0.484 0.423 0.352 0.278 0.205 0.128 0.007 0.186 0.356 0.352 0.186 0.009 0.099 0.171 0.243 0.319 0.398 0.474 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.479 0.407 0.333 0.260 0.190 0.129 0.077 0.036 0.009 0.002 0.003 0.024 0.059 0.106 0.164 0.231 0.305 0.383 0.461 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.491 0.416 0.342 0.271 0.205 0.147 0.098 0.061 0.036 0.024 0.026 0.042 0.071 0.113 0.166 0.228 0.298 0.372 0.450 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.488;\r
                    0.417 0.342 0.271 0.208 0.153 0.109 0.077 0.058 0.053 0.060 0.081 0.115 0.160 0.215 0.278 0.347 0.420 0.495 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.437 0.359 0.283 0.213 0.150 0.097 0.055 0.026 0.011 0.010 0.023 0.050 0.090 0.141 0.202 0.270 0.342 0.417 0.490 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.491 0.414 0.336 0.259 0.188 0.124 0.070 0.022 0.020 0.043 0.031 0.012 0.069 0.129 0.193 0.264 0.338 0.412 0.481 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.467 0.393 0.315 0.238 0.162 0.036 0.271 0.724 0.921 0.619 0.157 0.106 0.211 0.287 0.360 0.425 0.475 0.500 0.500 0.484 0.436 0.370 0.293 0.209 0.008 0.623 0.898 0.404 0.112 0.254 0.325 0.367 0.363 0.308 0.216 0.119 0.245 0.306 0.277 0.156 0.210 0.186 0.153 0.271 0.348 0.408 0.437 0.432 0.395 0.335 0.261 0.165 0.128 0.823 0.936 0.929 0.237 0.114 0.225 0.303 0.381 0.452 0.500 0.500 0.500 0.500 0.500 0.500 0.458 0.391 0.318 0.244 0.171 0.087 0.048 0.223 0.318 0.248 0.087 0.045 0.127 0.195 0.268 0.346 0.424 0.498 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.475 0.403 0.328 0.255 0.187 0.126 0.075 0.035 0.010 0.001 0.005 0.026 0.060 0.107 0.166 0.233 0.307 0.384 0.463 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.431 0.356 0.285 0.218 0.158 0.108 0.069 0.042 0.028 0.028 0.041 0.068 0.108 0.159 0.219 0.287 0.361 0.439 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500;\r
                    0.261 0.199 0.147 0.105 0.076 0.060 0.057 0.068 0.091 0.128 0.175 0.232 0.296 0.366 0.440 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.429 0.351 0.277 0.207 0.146 0.094 0.053 0.026 0.012 0.012 0.027 0.055 0.096 0.148 0.209 0.277 0.350 0.424 0.498 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.425 0.346 0.270 0.197 0.133 0.078 0.032 0.007 0.030 0.024 0.010 0.060 0.116 0.178 0.248 0.321 0.396 0.467 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.432 0.355 0.277 0.202 0.119 0.055 0.415 0.784 0.779 0.395 0.024 0.152 0.236 0.311 0.382 0.444 0.490 0.500 0.500 0.487 0.438 0.370 0.293 0.210 0.008 0.600 0.904 0.568 0.044 0.233 0.310 0.364 0.379 0.346 0.273 0.151 0.130 0.245 0.303 0.303 0.230 0.020 0.378 0.074 0.202 0.294 0.368 0.423 0.447 0.438 0.399 0.338 0.265 0.175 0.080 0.722 0.939 0.936 0.342 0.072 0.205 0.283 0.361 0.436 0.499 0.500 0.500 0.500 0.500 0.500 0.492 0.430 0.359 0.285 0.212 0.140 0.048 0.091 0.228 0.256 0.155 0.019 0.079 0.148 0.217 0.292 0.370 0.448 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.473 0.400 0.325 0.252 0.184 0.124 0.073 0.035 0.010 0.000 0.006 0.027 0.061 0.108 0.166 0.234 0.307 0.385 0.463 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.446 0.371 0.299 0.231 0.171 0.119 0.077 0.048 0.032 0.029 0.041 0.065 0.102 0.151 0.210 0.277 0.350 0.427 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500 0.500`, dur: "6s", repeatCount: "indefinite" }) })
              ] }),
              /* @__PURE__ */ f("feComposite", { in2: "SourceGraphic", operator: "atop" })
            ] })
          ] }),
          /* @__PURE__ */ f("rect", { width: "100", height: "100", fill: `url(#cosmic-gradient-${t})`, filter: `url(#cosmic-filter-${t})` })
        ] }) }),
        /* @__PURE__ */ f("div", { className: "cosmic-card-color-overlay" }),
        /* @__PURE__ */ f("div", { className: "cosmic-card-highlight", style: x }),
        /* @__PURE__ */ f("div", { className: "cosmic-card-content", children: e })
      ]
    }
  ) });
};
function A1({ options: e = [], children: t, className: n = "" }) {
  const [s, i] = X(!1), [r, a] = X({ x: 0, y: 0 }), o = H(null), l = (h) => {
    h.preventDefault(), a({ x: h.clientX, y: h.clientY }), i(!0);
  };
  G(() => {
    if (!s) return;
    const h = (u) => {
      o.current && !o.current.contains(u.target) && i(!1);
    }, d = (u) => u.key === "Escape" && i(!1);
    return document.addEventListener("mousedown", h), document.addEventListener("keydown", d), () => {
      document.removeEventListener("mousedown", h), document.removeEventListener("keydown", d);
    };
  }, [s]);
  const c = ({ opt: h }) => {
    const [d, u] = X(!1), g = H(null), p = () => !h.disabled && u(!0), b = () => {
      g.current && clearTimeout(g.current), u(!1);
    }, m = () => {
      if (h.submenu) {
        const y = h.stayOpenFor ?? 5e3;
        u(!0), g.current && clearTimeout(g.current), g.current = setTimeout(() => u(!1), y);
      } else
        !h.disabled && h.onClick && h.onClick(), i(!1);
    };
    return /* @__PURE__ */ I(
      "div",
      {
        className: `context-item ${h.disabled ? "disabled" : ""}`,
        onMouseEnter: p,
        onMouseLeave: b,
        onClick: m,
        role: "menuitem",
        children: [
          /* @__PURE__ */ f("span", { children: h.label }),
          h.submenu && /* @__PURE__ */ f("span", { className: "arrow", children: /* @__PURE__ */ f("img", { src: "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/left-arrow.png", alt: ">", height: "25px", width: "25px", style: { filter: "brightness(0) invert(0.5)" } }) }),
          d && h.submenu && /* @__PURE__ */ f("div", { className: `context-menu submenu ${n}`, children: h.submenu.map(
            (y, _) => y.separator ? /* @__PURE__ */ f("div", { className: "context-separator" }, _) : /* @__PURE__ */ f(c, { opt: y }, _)
          ) })
        ]
      }
    );
  };
  return /* @__PURE__ */ I("div", { onContextMenu: l, style: { display: "inline-block" }, children: [
    t,
    s && /* @__PURE__ */ f(
      "div",
      {
        ref: o,
        className: `context-menu ${n}`,
        style: { top: r.y, left: r.x },
        children: e.map(
          (h, d) => h.separator ? /* @__PURE__ */ f("div", { className: "context-separator" }, d) : /* @__PURE__ */ f(c, { opt: h }, d)
        )
      }
    )
  ] });
}
const D1 = ({
  data: e = [],
  theme: t = "counter-light",
  columns: n = 3,
  gap: s = 24,
  padding: i = 24,
  fontSize: r = 50,
  labelSize: a = 20,
  borderRadius: o = 25,
  className: l = "",
  animationDuration: c = 1e3,
  threshold: h = 0.9,
  color: d = "#2D3748",
  ...u
}) => {
  const g = H(null), p = H([]), b = (k) => {
    const M = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(k);
    return M ? {
      r: parseInt(M[1], 16),
      g: parseInt(M[2], 16),
      b: parseInt(M[3], 16)
    } : null;
  }, m = (k, M) => {
    const S = b(k);
    if (!S) return k;
    const N = (P) => {
      const R = P + (255 - P) * (M / 100);
      return Math.min(255, Math.max(0, Math.round(R)));
    };
    if (M > 0)
      return `#${N(S.r).toString(16).padStart(2, "0")}${N(S.g).toString(16).padStart(2, "0")}${N(S.b).toString(16).padStart(2, "0")}`;
    {
      const P = (R) => {
        const C = R * (1 + M / 100);
        return Math.min(255, Math.max(0, Math.round(C)));
      };
      return `#${P(S.r).toString(16).padStart(2, "0")}${P(S.g).toString(16).padStart(2, "0")}${P(S.b).toString(16).padStart(2, "0")}`;
    }
  };
  G(() => {
    const k = document.documentElement, M = b(d);
    k.style.setProperty("--bg-color", m(d, 85)), k.style.setProperty("--bg-hover", m(d, 92)), k.style.setProperty("--text-color", d), k.style.setProperty("--border-color", `rgba(${M?.r || 0}, ${M?.g || 0}, ${M?.b || 0}, 0.1)`), k.style.setProperty("--shadow-color", `rgba(${M?.r || 0}, ${M?.g || 0}, ${M?.b || 0}, 0.15)`);
  }, [d]), G(() => ((async () => {
    if (window.Odometer) {
      y();
      return;
    }
    const M = document.createElement("link");
    M.rel = "stylesheet", M.href = "https://cdnjs.cloudflare.com/ajax/libs/odometer.js/0.4.7/themes/odometer-theme-default.css", document.head.appendChild(M);
    const S = document.createElement("script");
    S.src = "https://cdnjs.cloudflare.com/ajax/libs/odometer.js/0.4.7/odometer.min.js", S.onload = () => y(), document.body.appendChild(S);
  })(), () => {
    p.current.forEach(({ observer: M }) => {
      M && M.disconnect();
    });
  }), [e, h, c]);
  const y = () => {
    const k = g.current?.querySelectorAll(".counter-odometer");
    k && k.forEach((M, S) => {
      const N = new window.Odometer({
        el: M,
        value: 0,
        duration: c,
        format: "(,ddd)"
      });
      let P = !1;
      const R = {
        threshold: [0, h]
      }, C = (T) => {
        T.forEach((O) => {
          O.isIntersecting && !P && (N.update(e[S]?.value || 0), P = !0);
        });
      }, A = new IntersectionObserver(C, R);
      A.observe(M), p.current[S] = { odometer: N, observer: A };
    });
  }, _ = {
    gap: `${s}px`,
    gridTemplateColumns: `repeat(${n}, 1fr)`
  }, x = {
    padding: `${i}px`,
    borderRadius: `${o}px`
  }, w = {
    fontSize: `${r}px`
  }, v = {
    fontSize: `${a}px`
  };
  return /* @__PURE__ */ f(
    "div",
    {
      ref: g,
      className: `counter-container ${t} ${l}`,
      style: _,
      ...u,
      children: e.map((k, M) => /* @__PURE__ */ I(
        "div",
        {
          className: "counter-stat",
          style: x,
          children: [
            /* @__PURE__ */ f(
              "div",
              {
                className: `counter-odometer odometer ${k.showPlus ? "plus" : ""}`,
                style: w,
                children: "0"
              }
            ),
            /* @__PURE__ */ f("div", { className: "counter-type", style: v, children: k.label })
          ]
        },
        M
      ))
    }
  );
}, I1 = ({
  data: e = [],
  columns: t = [],
  sortable: n = !0,
  searchable: s = !1,
  className: i = "",
  rowsPerPage: r = 10,
  pagination: a = !1,
  onRowClick: o = null,
  loading: l = !1,
  emptyMessage: c = "No data available",
  theme: h = "datatable-light",
  // 'datatable-light', 'datatable-dark'
  color: d = "#3b82f6",
  ...u
}) => {
  const [g, p] = X({ key: null, direction: "asc" }), [b, m] = X(""), [y, _] = X(1), x = H(null), w = (T) => {
    const O = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(T);
    return O ? {
      r: parseInt(O[1], 16),
      g: parseInt(O[2], 16),
      b: parseInt(O[3], 16)
    } : null;
  }, v = (T, O) => {
    const D = w(T);
    if (!D) return T;
    {
      const E = (B) => {
        const z = B * (1 + O / 100);
        return Math.min(255, Math.max(0, Math.round(z)));
      };
      return `#${E(D.r).toString(16).padStart(2, "0")}${E(D.g).toString(16).padStart(2, "0")}${E(D.b).toString(16).padStart(2, "0")}`;
    }
  };
  G(() => {
    if (!x.current) return;
    const T = w(d);
    x.current.style.setProperty("--dt-primary", d), x.current.style.setProperty("--dt-primary-hover", v(d, -15)), x.current.style.setProperty("--dt-primary-light", `rgba(${T?.r || 0}, ${T?.g || 0}, ${T?.b || 0}, 0.1)`);
  }, [d]);
  const k = (T, O) => O.split(".").reduce((D, E) => D?.[E], T), M = h0(() => g.key ? [...e].sort((T, O) => {
    const D = k(T, g.key), E = k(O, g.key);
    if (typeof D == "number" && typeof E == "number")
      return g.direction === "asc" ? D - E : E - D;
    if (D instanceof Date && E instanceof Date)
      return g.direction === "asc" ? D.getTime() - E.getTime() : E.getTime() - D.getTime();
    const B = String(D || "").toLowerCase(), z = String(E || "").toLowerCase();
    return g.direction === "asc" ? B.localeCompare(z) : z.localeCompare(B);
  }) : e, [e, g]), S = h0(() => b ? M.filter(
    (T) => t.some((O) => {
      const D = k(T, O.key);
      return String(D || "").toLowerCase().includes(b.toLowerCase());
    })
  ) : M, [M, b, t]), N = h0(() => {
    if (!a) return S;
    const T = (y - 1) * r;
    return S.slice(T, T + r);
  }, [S, y, r, a]), P = Math.ceil(S.length / r), R = (T) => {
    n && p((O) => ({
      key: T,
      direction: O.key === T && O.direction === "asc" ? "desc" : "asc"
    }));
  }, C = (T, O) => {
    const D = k(T, O.key);
    return O.render && typeof O.render == "function" ? O.render(D, T) : O.type === "date" && D instanceof Date ? D.toLocaleDateString() : O.type === "currency" && typeof D == "number" ? new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(D) : O.type === "number" && typeof D == "number" ? D.toLocaleString() : D || "";
  }, A = (T) => !n || g.key !== T ? /* @__PURE__ */ f("span", { className: "datatable__sort-icon datatable__sort-icon--inactive", children: /* @__PURE__ */ f("svg", { class: "w-6 h-6 text-gray-800 dark:text-white", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", width: "15", height: "15", fill: "none", viewBox: "0 0 24 24", children: /* @__PURE__ */ f("path", { stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M8 20V7m0 13-4-4m4 4 4-4m4-12v13m0-13 4 4m-4-4-4 4" }) }) }) : g.direction === "asc" ? /* @__PURE__ */ f("span", { className: "datatable__sort-icon datatable__sort-icon--active", children: /* @__PURE__ */ f("svg", { class: "w-6 h-6 text-gray-800 dark:text-white", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", width: "15", height: "15", fill: "none", viewBox: "0 0 24 24", children: /* @__PURE__ */ f("path", { stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M12 6v13m0-13 4 4m-4-4-4 4" }) }) }) : /* @__PURE__ */ f("span", { className: "datatable__sort-icon datatable__sort-icon--active", children: /* @__PURE__ */ f("svg", { class: "w-6 h-6 text-gray-800 dark:text-white", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", width: "15", height: "15", fill: "none", viewBox: "0 0 24 24", children: /* @__PURE__ */ f("path", { stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M12 19V5m0 14-4-4m4 4 4-4" }) }) });
  return l ? /* @__PURE__ */ f("div", { ref: x, className: `datatable ${h} ${i}`, ...u, children: /* @__PURE__ */ I("div", { className: "datatable__loading", children: [
    /* @__PURE__ */ f("span", { className: "datatable__spinner", children: "⟳" }),
    /* @__PURE__ */ f("span", { children: "Loading..." })
  ] }) }) : /* @__PURE__ */ I("div", { ref: x, className: `datatable ${h} ${i}`, ...u, children: [
    s && /* @__PURE__ */ f("div", { className: "datatable__search", children: /* @__PURE__ */ I("div", { className: "datatable__search-input", children: [
      /* @__PURE__ */ f("span", { className: "datatable__search-icon", children: /* @__PURE__ */ I(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: "18",
          height: "18",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          viewBox: "0 0 24 24",
          "aria-hidden": "true",
          className: i,
          children: [
            /* @__PURE__ */ f("circle", { cx: "11", cy: "11", r: "8" }),
            /* @__PURE__ */ f("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
          ]
        }
      ) }),
      /* @__PURE__ */ f(
        "input",
        {
          type: "text",
          placeholder: "Search...",
          value: b,
          onChange: (T) => m(T.target.value),
          className: "datatable__input"
        }
      ),
      b && /* @__PURE__ */ f(
        "button",
        {
          onClick: () => m(""),
          className: "datatable__search-clear",
          type: "button",
          children: "✕"
        }
      )
    ] }) }),
    /* @__PURE__ */ f("div", { className: "datatable__container", children: /* @__PURE__ */ I("table", { className: "datatable__table", role: "grid", children: [
      /* @__PURE__ */ f("thead", { className: "datatable__head", children: /* @__PURE__ */ f("tr", { className: "datatable__row datatable__row--header", role: "row", children: t.map((T, O) => /* @__PURE__ */ f(
        "th",
        {
          className: `datatable__header ${n && T.sortable !== !1 ? "datatable__header--sortable" : ""}`,
          onClick: () => T.sortable !== !1 && R(T.key),
          role: "columnheader",
          "aria-sort": g.key === T.key ? g.direction === "asc" ? "ascending" : "descending" : "none",
          children: /* @__PURE__ */ I("div", { className: "datatable__header-content", children: [
            /* @__PURE__ */ f("span", { children: T.label || T.key }),
            n && T.sortable !== !1 && A(T.key)
          ] })
        },
        T.key || O
      )) }) }),
      /* @__PURE__ */ f("tbody", { className: "datatable__body", children: N.length === 0 ? /* @__PURE__ */ f("tr", { className: "datatable__row datatable__row--empty", role: "row", children: /* @__PURE__ */ f(
        "td",
        {
          className: "datatable__cell datatable__cell--empty",
          colSpan: t.length,
          role: "gridcell",
          children: /* @__PURE__ */ I("div", { className: "datatable__empty", children: [
            /* @__PURE__ */ f("span", { className: "datatable__empty-icon", children: "📭" }),
            /* @__PURE__ */ f("span", { children: c })
          ] })
        }
      ) }) : N.map((T, O) => /* @__PURE__ */ f(
        "tr",
        {
          className: `datatable__row datatable__row--data ${o ? "datatable__row--clickable" : ""}`,
          onClick: () => o && o(T, O),
          role: "row",
          children: t.map((D, E) => /* @__PURE__ */ f(
            "td",
            {
              className: "datatable__cell",
              role: "gridcell",
              children: C(T, D)
            },
            `${D.key}-${E}`
          ))
        },
        T.id || O
      )) })
    ] }) }),
    a && P > 1 && /* @__PURE__ */ I("div", { className: "datatable__pagination", children: [
      /* @__PURE__ */ I("div", { className: "datatable__pagination-info", children: [
        "Showing ",
        (y - 1) * r + 1,
        " to ",
        Math.min(y * r, S.length),
        " of ",
        S.length,
        " entries"
      ] }),
      /* @__PURE__ */ I("div", { className: "datatable__pagination-controls", children: [
        /* @__PURE__ */ f(
          "button",
          {
            onClick: () => _(1),
            disabled: y === 1,
            className: "datatable__pagination-btn datatable__pagination-btn--first",
            type: "button",
            children: /* @__PURE__ */ f("svg", { class: "w-6 h-6 text-gray-800 dark:text-white", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", fill: "none", viewBox: "0 0 24 24", children: /* @__PURE__ */ f("path", { stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "m17 16-4-4 4-4m-6 8-4-4 4-4" }) })
          }
        ),
        /* @__PURE__ */ f(
          "button",
          {
            onClick: () => _(y - 1),
            disabled: y === 1,
            className: "datatable__pagination-btn datatable__pagination-btn--prev",
            type: "button",
            children: /* @__PURE__ */ f("svg", { class: "w-6 h-6 text-gray-800 dark:text-white", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", width: "15", height: "15", fill: "none", viewBox: "0 0 24 24", children: /* @__PURE__ */ f("path", { stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "m15 19-7-7 7-7" }) })
          }
        ),
        /* @__PURE__ */ f("div", { className: "datatable__pagination-pages", children: Array.from({ length: Math.min(5, P) }, (T, O) => {
          let D;
          return P <= 5 || y <= 3 ? D = O + 1 : y >= P - 2 ? D = P - 4 + O : D = y - 2 + O, /* @__PURE__ */ f(
            "button",
            {
              onClick: () => _(D),
              className: `datatable__pagination-btn datatable__pagination-btn--page ${y === D ? "datatable__pagination-btn--active" : ""}`,
              type: "button",
              children: D
            },
            D
          );
        }) }),
        /* @__PURE__ */ f(
          "button",
          {
            onClick: () => _(y + 1),
            disabled: y === P,
            className: "datatable__pagination-btn datatable__pagination-btn--next",
            type: "button",
            children: /* @__PURE__ */ f("svg", { class: "w-6 h-6 text-gray-800 dark:text-white", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", width: "15", height: "15", fill: "none", viewBox: "0 0 24 24", children: /* @__PURE__ */ f("path", { stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "m9 5 7 7-7 7" }) })
          }
        ),
        /* @__PURE__ */ f(
          "button",
          {
            onClick: () => _(P),
            disabled: y === P,
            className: "datatable__pagination-btn datatable__pagination-btn--last",
            type: "button",
            children: /* @__PURE__ */ f("svg", { class: "w-6 h-6 text-gray-800 dark:text-white", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", fill: "none", viewBox: "0 0 24 24", children: /* @__PURE__ */ f("path", { stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "m7 16 4-4-4-4m6 8 4-4-4-4" }) })
          }
        )
      ] })
    ] })
  ] });
}, Io = Ir(({
  id: e,
  trigger: t,
  title: n,
  children: s,
  variant: i = "default",
  className: r = "",
  theme: a = "",
  width: o,
  bgBlur: l = "0px",
  bgOverlay: c = "rgba(0, 0, 0, 0.5)",
  onClose: h,
  autoCloseDelay: d = 3e3,
  ...u
}, g) => {
  const [p, b] = X(!1), [m, y] = X(null), _ = H(null), x = H(0), w = st(() => {
    b(!1), y(null), _.current && _.current.hidePopover(), document.body.style.position = "", document.body.style.top = "", document.body.style.width = "", document.body.style.overflow = "", window.scrollTo(0, x.current), h?.();
  }, [h]), v = st(() => {
    if (x.current = window.scrollY, document.body.style.position = "fixed", document.body.style.top = `-${x.current}px`, document.body.style.width = "100%", document.body.style.overflow = "hidden", b(!0), _.current && _.current.showPopover(), i === "auto-close") {
      const R = Math.ceil(d / 1e3);
      y(R);
    }
  }, [i, d]);
  G(() => {
    if (!p || i !== "auto-close" || m === null)
      return;
    if (m <= 0) {
      w();
      return;
    }
    const R = setTimeout(() => {
      y(m - 1);
    }, 1e3);
    return () => clearTimeout(R);
  }, [p, i, m, w]);
  const k = st(() => {
  }, []);
  bo(g, () => ({
    close: w,
    open: v,
    isOpen: p
  })), G(() => () => {
    p && (document.body.style.position = "", document.body.style.top = "", document.body.style.width = "", document.body.style.overflow = "");
  }, [p]);
  const M = () => /* @__PURE__ */ f(
    "button",
    {
      className: "dialog-close-x",
      onClick: w,
      "aria-label": "Close dialog",
      children: /* @__PURE__ */ f("svg", { style: { color: "gray" }, class: "w-6 h-6 text-gray-800 dark:text-white", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", fill: "none", viewBox: "0 0 24 24", children: /* @__PURE__ */ f("path", { stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M6 18 17.94 6M18 18 6.06 6" }) })
    }
  ), S = () => i === "auto-close" && m !== null && m > 0 ? /* @__PURE__ */ I("div", { className: "dialog-countdown", children: [
    "Closing in ",
    m,
    "s"
  ] }) : null, N = o ? { "--dialogbox-width": o } : {}, P = {
    "--background-blur": `blur(${l})`,
    "--background-overlay": c
  };
  return /* @__PURE__ */ I(kt, { children: [
    ve.cloneElement(t, {
      onClick: v,
      "aria-haspopup": "dialog"
    }),
    p && /* @__PURE__ */ f("div", { className: "dialog-backdrop", onClick: k, style: P }),
    /* @__PURE__ */ I(
      "dialog",
      {
        ref: _,
        id: e,
        popover: "manual",
        className: `dialog ${a} dialog-${i} ${r}`,
        style: N,
        ...u,
        children: [
          i === "cross" && M(),
          /* @__PURE__ */ I("div", { className: "dialog-content", children: [
            n && /* @__PURE__ */ f("h3", { className: "dialog-title", children: n }),
            /* @__PURE__ */ I("div", { className: "dialog-body", children: [
              s,
              S()
            ] })
          ] })
        ]
      }
    )
  ] });
});
Io.displayName = "Dialog";
const Ro = () => /* @__PURE__ */ f("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ f("polyline", { points: "20 6 9 17 4 12" }) }), R1 = ({
  type: e = "simple",
  label: t,
  placeholder: n = "Choose one",
  options: s = [],
  value: i,
  onChange: r,
  className: a = "",
  disabled: o = !1,
  width: l = "14rem",
  color: c = "#87CEEB",
  ...h
}) => {
  const [d, u] = X(!1), [g, p] = X(
    e === "multi" ? Array.isArray(i) ? i : [] : i || ""
  ), b = H(null), m = H(null), y = (C) => {
    const A = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(C);
    return A ? {
      r: parseInt(A[1], 16),
      g: parseInt(A[2], 16),
      b: parseInt(A[3], 16)
    } : null;
  }, _ = (C) => {
    const A = y(C);
    return A && (0.299 * A.r + 0.587 * A.g + 0.114 * A.b) / 255 > 0.5 ? "#000000" : "#ffffff";
  }, x = (C, A) => {
    const T = y(C);
    if (!T) return C;
    {
      const O = (D) => {
        const E = D * (1 + A / 100);
        return Math.min(255, Math.max(0, Math.round(E)));
      };
      return `#${O(T.r).toString(16).padStart(2, "0")}${O(T.g).toString(16).padStart(2, "0")}${O(T.b).toString(16).padStart(2, "0")}`;
    }
  };
  G(() => {
    if (!m.current) return;
    const C = y(c), A = _(c);
    m.current.style.setProperty("--dropdown-primary", c), m.current.style.setProperty("--dropdown-primary-hover", x(c, -10)), m.current.style.setProperty("--dropdown-primary-light", `rgba(${C?.r || 0}, ${C?.g || 0}, ${C?.b || 0}, 0.4)`), m.current.style.setProperty("--dropdown-focus-shadow", `rgba(${C?.r || 0}, ${C?.g || 0}, ${C?.b || 0}, 0.5)`), m.current.style.setProperty("--dropdown-tag-text", A);
  }, [c]), G(() => {
    const C = (T) => {
      b.current && !b.current.contains(T.target) && u(!1);
    }, A = (T) => {
      T.key === "Escape" && u(!1);
    };
    return document.addEventListener("mousedown", C), document.addEventListener("keydown", A), () => {
      document.removeEventListener("mousedown", C), document.removeEventListener("keydown", A);
    };
  }, []);
  const w = () => {
    o || u(!d);
  }, v = (C) => {
    C.onClick && C.onClick(), u(!1);
  }, k = (C) => {
    p(C.value), r && r(C.value), u(!1);
  }, M = (C) => {
    const A = g.includes(C.value) ? g.filter((T) => T !== C.value) : [...g, C.value];
    p(A), r && r(A);
  }, S = () => {
    if (e === "multi")
      return g.length === 0 ? /* @__PURE__ */ f("span", { className: "dropdown-placeholder", children: n }) : /* @__PURE__ */ f("div", { className: "dropdown-selected-tags", children: g.map((C) => {
        const A = s.find((T) => T.value === C);
        return A ? /* @__PURE__ */ f("span", { className: "dropdown-selected-tag", children: A.label }, C) : null;
      }) });
    if (e === "select") {
      const C = s.find((A) => A.value === g);
      return C ? C.label : n;
    }
    return n;
  }, N = () => s.map((C, A) => {
    if (e === "simple")
      return /* @__PURE__ */ f(
        "a",
        {
          href: C.href || "#",
          className: "dropdown-menu-item",
          role: "menuitem",
          onClick: (T) => {
            T.preventDefault(), v(C);
          },
          children: C.label
        },
        A
      );
    if (e === "select")
      return /* @__PURE__ */ f(
        "div",
        {
          className: "dropdown-select-option",
          role: "menuitem",
          onClick: () => k(C),
          children: C.label
        },
        C.value
      );
    if (e === "multi") {
      const T = g.includes(C.value);
      return /* @__PURE__ */ I(
        "div",
        {
          className: `dropdown-multi-select-option ${T ? "selected" : ""}`,
          role: "option",
          onClick: () => M(C),
          children: [
            /* @__PURE__ */ f("span", { children: C.label }),
            /* @__PURE__ */ f("span", { className: "dropdown-checkbox-icon", children: /* @__PURE__ */ f(Ro, {}) })
          ]
        },
        C.value
      );
    }
    return null;
  }), P = `dropdown-button ${e === "multi" ? "dropdown-multi-select-button" : e === "select" ? "dropdown-select-button" : "dropdown-simple-button"} ${o ? "disabled" : ""}`, R = `dropdown-container ${a}`;
  return /* @__PURE__ */ f("div", { className: R, ref: m, ...h, children: /* @__PURE__ */ I("div", { ref: b, children: [
    t && e !== "simple" && /* @__PURE__ */ f("label", { className: "dropdown-label", children: t }),
    /* @__PURE__ */ I(
      "button",
      {
        type: "button",
        className: P,
        onClick: w,
        disabled: o,
        style: { width: l },
        "aria-haspopup": "true",
        "aria-expanded": d,
        children: [
          /* @__PURE__ */ f("div", { className: "dropdown-button-content", children: S() }),
          /* @__PURE__ */ f("span", { className: `dropdown-icon ${d ? "rotated" : ""}`, children: /* @__PURE__ */ f("img", { src: "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/drop-down.png", alt: "", height: "20px", width: "20px" }) })
        ]
      }
    ),
    /* @__PURE__ */ f(
      "div",
      {
        className: `dropdown-content ${d ? "show" : ""}`,
        style: { width: l },
        children: /* @__PURE__ */ f(
          "div",
          {
            role: "menu",
            "aria-orientation": "vertical",
            style: { paddingTop: "0.25rem", paddingBottom: "0.25rem" },
            children: N()
          }
        )
      }
    )
  ] }) });
}, L1 = ({
  theme: e = "endlessreview-light",
  title: t = "",
  subtitle: n = "",
  reviews: s = [],
  animationDuration: i = 60,
  height: r = "40rem",
  color: a = "#60a5fa"
}) => {
  const o = e === "endlessreview-dark" ? "endlessreview-dark" : "endlessreview-light", l = H(null), c = (y) => {
    const _ = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(y);
    return _ ? {
      r: parseInt(_[1], 16),
      g: parseInt(_[2], 16),
      b: parseInt(_[3], 16)
    } : null;
  }, h = (y) => {
    const _ = c(y);
    if (!_) return { color1: "#60a5fa", color2: "#a855f7" };
    const x = Math.min(255, _.r + 80), w = Math.max(0, _.g - 40), v = Math.min(255, _.b + 80), k = `rgb(${_.r}, ${_.g}, ${_.b})`, M = `rgb(${x}, ${w}, ${v})`;
    return { color1: k, color2: M };
  }, d = (y, _) => {
    const x = c(y);
    if (!x) return y;
    const w = (S) => {
      if (_ > 0) {
        const N = S + (255 - S) * (_ / 100);
        return Math.min(255, Math.max(0, Math.round(N)));
      } else {
        const N = S * (1 + _ / 100);
        return Math.min(255, Math.max(0, Math.round(N)));
      }
    }, v = w(x.r), k = w(x.g), M = w(x.b);
    return `rgb(${v}, ${k}, ${M})`;
  };
  G(() => {
    if (!l.current) return;
    const y = c(a), { color1: _, color2: x } = h(a);
    l.current.style.setProperty("--gradient-color-1", _), l.current.style.setProperty("--gradient-color-2", x), l.current.style.setProperty("--card-border-color", d(a, e === "endlessreview-dark" ? -40 : 20)), l.current.style.setProperty("--card-hover-border", a), l.current.style.setProperty("--card-shadow-color", `rgba(${y?.r || 0}, ${y?.g || 0}, ${y?.b || 0}, 0.15)`), l.current.style.setProperty("--card-shadow-color-hover", `rgba(${y?.r || 0}, ${y?.g || 0}, ${y?.b || 0}, 0.3)`), l.current.style.setProperty("--name-accent-color", d(a, e === "endlessreview-dark" ? 30 : -10));
  }, [a, e]);
  const u = s.slice(0, Math.ceil(s.length / 3)), g = s.slice(Math.ceil(s.length / 3), Math.ceil(2 * s.length / 3)), p = s.slice(Math.ceil(2 * s.length / 3)), b = (y, _) => /* @__PURE__ */ I("div", { className: "endlessreview-card", children: [
    /* @__PURE__ */ I("div", { className: "endlessreview-card-header", children: [
      /* @__PURE__ */ f("span", { className: "endlessreview-avatar", children: y.avatar }),
      /* @__PURE__ */ I("div", { children: [
        /* @__PURE__ */ f("p", { className: "endlessreview-name", children: y.name }),
        /* @__PURE__ */ f("p", { className: "endlessreview-role", children: y.role })
      ] })
    ] }),
    /* @__PURE__ */ f("div", { className: "endlessreview-stars", children: y.rating }),
    /* @__PURE__ */ I("p", { className: "endlessreview-text", children: [
      '"',
      y.text,
      '"'
    ] })
  ] }, _), m = (y, _, x) => /* @__PURE__ */ f("div", { className: `endlessreview-column ${x}`, style: { height: r }, children: /* @__PURE__ */ I(
    "div",
    {
      className: `endlessreview-scroll ${_}`,
      style: { animationDuration: `${i}s` },
      children: [
        /* @__PURE__ */ f("div", { className: "endlessreview-scroll-content", children: y.map((w, v) => b(w, v)) }),
        /* @__PURE__ */ f("div", { className: "endlessreview-scroll-content", children: y.map((w, v) => b(w, `duplicate-${v}`)) })
      ]
    }
  ) });
  return /* @__PURE__ */ f("div", { className: `endlessreview-container ${o}`, ref: l, children: /* @__PURE__ */ I("div", { className: "endlessreview-wrapper", children: [
    /* @__PURE__ */ I("div", { className: "endlessreview-header", children: [
      /* @__PURE__ */ f("h1", { className: "endlessreview-title", children: t }),
      /* @__PURE__ */ f("p", { className: "endlessreview-subtitle", children: n })
    ] }),
    /* @__PURE__ */ I("div", { className: "endlessreview-grid", children: [
      m(u, "endlessreview-scroll-t2b", "endlessreview-mask-tb"),
      /* @__PURE__ */ f("div", { className: "endlessreview-column-md", children: m(g, "endlessreview-scroll-b2t", "endlessreview-mask-bt") }),
      /* @__PURE__ */ f("div", { className: "endlessreview-column-lg", children: m(p, "endlessreview-scroll-t2b", "endlessreview-mask-tb") })
    ] })
  ] }) });
}, E1 = ({
  type: e = "arc",
  theme: t = "fab-light",
  items: n = [],
  size: s = "medium",
  position: i = "bottom-right",
  color: r = "#000000",
  onItemClick: a = () => {
  },
  disabled: o = !1,
  className: l = "",
  style: c = {},
  triggerIcon: h = null,
  closeOnItemClick: d = !0
}) => {
  const [u, g] = X(!1), p = H(null), b = (S) => {
    const N = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(S);
    return N ? {
      r: parseInt(N[1], 16),
      g: parseInt(N[2], 16),
      b: parseInt(N[3], 16)
    } : null;
  }, m = (S) => {
    const N = b(S);
    return N && (0.299 * N.r + 0.587 * N.g + 0.114 * N.b) / 255 > 0.5 ? "#000000" : "#ffffff";
  }, y = (S, N) => {
    const P = b(S);
    if (!P) return S;
    const R = (O) => {
      {
        const D = O * (1 + N / 100);
        return Math.min(255, Math.max(0, Math.round(D)));
      }
    }, C = R(P.r), A = R(P.g), T = R(P.b);
    return `rgb(${C}, ${A}, ${T})`;
  };
  G(() => {
    if (p.current) {
      const S = b(r), N = m(r);
      p.current.style.setProperty("--fab-menu-bg", r), p.current.style.setProperty("--fab-menu-fg", N), p.current.style.setProperty("--fab-menu-hover", y(r, -10)), p.current.style.setProperty("--fab-menu-shadow", `rgba(${S?.r || 0}, ${S?.g || 0}, ${S?.b || 0}, 0.15)`), p.current.style.setProperty("--fab-item-bg", r), p.current.style.setProperty("--fab-item-fg", N), p.current.style.setProperty("--fab-item-hover", y(r, -10));
      const P = p.current.querySelectorAll(".fab-item"), R = P.length;
      p.current.style.setProperty("--max-items", R);
      let C = 1, A = 1;
      R <= 3 ? (C = 1, A = 1) : R <= 5 ? (C = 0.9, A = 1.1) : R <= 7 ? (C = 0.8, A = 1.2) : R <= 9 ? (C = 0.7, A = 1.3) : R <= 12 ? (C = 0.6, A = 1.4) : (C = Math.max(0.4, 1 - (R - 3) * 0.04), A = Math.min(1.8, 1 + (R - 3) * 0.035)), p.current.style.setProperty("--dynamic-scale", C), p.current.style.setProperty("--dynamic-distance-multiplier", A), P.forEach((T, O) => {
        T.style.setProperty("--item", O);
      });
    }
  }, [n, r]);
  const _ = () => {
    o || g(!u);
  }, x = (S, N) => {
    a(S, N), d && g(!1);
  }, w = () => {
    switch (s) {
      case "small":
        return "fab-small";
      case "large":
        return "fab-large";
      default:
        return "fab-medium";
    }
  }, v = () => {
    if (!i) return "";
    const S = "fab-fixed";
    switch (i) {
      case "top-left":
        return `${S} fab-top-left`;
      case "top-right":
        return `${S} fab-top-right`;
      case "bottom-left":
        return `${S} fab-bottom-left`;
      case "center":
        return `${S} fab-center`;
      case "bottom-right":
        return `${S} fab-bottom-right`;
      default:
        return "";
    }
  }, k = /* @__PURE__ */ I("div", { className: "fab-icon", children: [
    /* @__PURE__ */ f("span", {}),
    /* @__PURE__ */ f("span", {}),
    /* @__PURE__ */ f("span", {})
  ] }), M = () => e === "linear" ? n.map((S, N) => /* @__PURE__ */ f(
    "span",
    {
      className: "fab-item fab-item-linear",
      onClick: () => x(S, N),
      title: S.label,
      children: S.icon
    },
    N
  )) : n.map((S, N) => /* @__PURE__ */ f(
    "span",
    {
      className: "fab-item",
      onClick: () => x(S, N),
      title: S.label,
      children: S.icon
    },
    N
  ));
  return /* @__PURE__ */ I(
    "div",
    {
      ref: p,
      className: `
        fab-menu 
        ${t} 
        ${w()} 
        ${v()}
        fab-${e}
        ${u ? "fab-open" : ""}
        ${o ? "fab-disabled" : ""}
        ${l}
      `,
      style: c,
      children: [
        /* @__PURE__ */ f(
          "div",
          {
            className: "fab-trigger",
            onClick: _,
            role: "button",
            "aria-expanded": u,
            "aria-label": "Toggle menu",
            children: h || k
          }
        ),
        M()
      ]
    }
  );
}, O1 = ({
  children: e = "Fluid Button",
  onClick: t,
  disabled: n = !1,
  className: s = "",
  hue: i = 170,
  hueAnimation: r = !0,
  size: a = "1.5em",
  padding: o = "2em",
  animationDuration: l = 20,
  enableIntro: c = !0,
  ...h
}) => {
  const d = H(null), u = H(null), g = (x) => {
    if (n) return;
    const w = x.target.getBoundingClientRect(), v = (x.clientX - w.x) / w.width * 100, k = (x.clientY - w.y) / w.height * 100;
    x.target.style.setProperty("--x", v), x.target.style.setProperty("--y", k);
  }, p = () => {
    if (!c || !d.current) return;
    let x = 4;
    const w = d.current;
    w.style.setProperty("--a", "100%"), u.current = setInterval(() => {
      const v = (Math.cos(x) + 2) / 3.6 * 100, k = (Math.sin(x) + 2) / 3.6 * 100;
      w.style.setProperty("--x", v), w.style.setProperty("--y", k), x += 0.03, x > 11.5 && (clearInterval(u.current), w.style.setProperty("--a", ""));
    }, 16);
  }, b = (x) => {
    n || (u.current && clearInterval(u.current), x.target.style.setProperty("--a", ""));
  }, m = (x) => {
    n || t && t(x);
  };
  G(() => (p(), () => {
    u.current && clearInterval(u.current);
  }), [c]);
  const y = {
    "--hue": `${i}deg`,
    "--initial-hue": `${i}deg`,
    "--size": a,
    "--padding": o,
    "--animation-duration": `${l}s`,
    fontSize: a
  }, _ = `fluid-button ${r ? "" : "no-hue-animation"} ${s}`.trim();
  return /* @__PURE__ */ I(kt, { children: [
    /* @__PURE__ */ f("svg", { width: "0", height: "0", style: { position: "absolute" }, children: /* @__PURE__ */ I("filter", { id: "goo", x: "-50%", y: "-50%", width: "200%", height: "200%", children: [
      /* @__PURE__ */ f("feComponentTransfer", { children: /* @__PURE__ */ f("feFuncA", { type: "discrete", tableValues: "0 1" }) }),
      /* @__PURE__ */ f("feGaussianBlur", { stdDeviation: "5" }),
      /* @__PURE__ */ f("feComponentTransfer", { children: /* @__PURE__ */ f("feFuncA", { type: "table", tableValues: "-5 11" }) })
    ] }) }),
    /* @__PURE__ */ f(
      "button",
      {
        ref: d,
        type: "button",
        className: _,
        style: y,
        onClick: m,
        onPointerMove: g,
        onPointerOver: b,
        disabled: n,
        ...h,
        children: e
      }
    )
  ] });
}, z1 = ({ cards: e, gridCols: t = 3 }) => {
  const n = H([]);
  return G(() => {
    const s = (r) => {
      n.current.forEach((a, o) => {
        a && a.toggleAttribute("data-not-hover", o !== r);
      });
    }, i = () => {
      n.current.forEach((r) => {
        r && r.toggleAttribute("data-not-hover", !1);
      });
    };
    return n.current.forEach((r, a) => {
      if (r) {
        const o = () => s(a), l = () => i();
        r.addEventListener("mouseover", o), r.addEventListener("mouseleave", l), r._overHandler = o, r._leaveHandler = l;
      }
    }), () => {
      n.current.forEach((r) => {
        r && r._overHandler && r._leaveHandler && (r.removeEventListener("mouseover", r._overHandler), r.removeEventListener("mouseleave", r._leaveHandler));
      });
    };
  }, [e]), /* @__PURE__ */ f("div", { className: "focus-card-holder", style: { "--grid-cols": t }, children: e.map((s, i) => /* @__PURE__ */ I(
    "div",
    {
      className: "focus-card",
      ref: (r) => n.current[i] = r,
      children: [
        /* @__PURE__ */ f(
          "img",
          {
            className: "focus-card-image",
            src: s.image,
            alt: s.title
          }
        ),
        /* @__PURE__ */ f("div", { className: "focus-card-content", children: s.title })
      ]
    },
    i
  )) });
}, F1 = ({
  sections: e = [],
  bottomText: t = "",
  socialLinks: n = [],
  backgroundColor: s = "#1a1a1a",
  titleColor: i = "#000000",
  textColor: r = "#ffffff",
  linkColor: a = "#60a5fa",
  linkHoverColor: o = "#3b82f6",
  linkDecoration: l = "underline",
  borderRadius: c = "0px",
  color: h = null,
  className: d = "",
  containerMaxWidth: u = "1200px",
  showDivider: g = !0
}) => {
  const p = H(null), b = (M) => {
    const S = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(M);
    return S ? {
      r: parseInt(S[1], 16),
      g: parseInt(S[2], 16),
      b: parseInt(S[3], 16)
    } : null;
  }, m = (M) => {
    const S = b(M);
    return S && (0.299 * S.r + 0.587 * S.g + 0.114 * S.b) / 255 > 0.5 ? "#000000" : "#ffffff";
  }, y = (M, S) => {
    const N = b(M);
    if (!N) return M;
    const P = (T) => {
      if (S > 0) {
        const O = T + (255 - T) * (S / 100);
        return Math.min(255, Math.max(0, Math.round(O)));
      } else {
        const O = T * (1 + S / 100);
        return Math.min(255, Math.max(0, Math.round(O)));
      }
    }, R = P(N.r), C = P(N.g), A = P(N.b);
    return `#${R.toString(16).padStart(2, "0")}${C.toString(16).padStart(2, "0")}${A.toString(16).padStart(2, "0")}`;
  };
  G(() => {
    if (h && p.current) {
      const M = y(h, -60), S = m(M), N = y(h, 20), P = h, R = y(h, -15);
      p.current.style.setProperty("--auto-bg-color", M), p.current.style.setProperty("--auto-text-color", S), p.current.style.setProperty("--auto-title-color", N), p.current.style.setProperty("--auto-link-color", P), p.current.style.setProperty("--auto-link-hover-color", R);
    }
  }, [h]);
  const _ = h ? "var(--auto-bg-color)" : s, x = h ? "var(--auto-text-color)" : r, w = h ? "var(--auto-title-color)" : i, v = h ? "var(--auto-link-color)" : a, k = h ? "var(--auto-link-hover-color)" : o;
  return /* @__PURE__ */ f(
    "footer",
    {
      ref: p,
      className: `footer ${d}`,
      style: {
        backgroundColor: _,
        color: x,
        "--link-color": v,
        "--link-hover-color": k,
        "--text-decoration": l,
        "--border-radius": c,
        "--title-color": w
      },
      children: /* @__PURE__ */ I(
        "div",
        {
          className: "footer-container",
          style: { maxWidth: u },
          children: [
            e.length > 0 && /* @__PURE__ */ f("div", { className: "footer-sections", children: e.map((M, S) => /* @__PURE__ */ I("div", { className: "footer-section", children: [
              M.title && /* @__PURE__ */ f("h3", { className: "footer-section-title", children: M.title }),
              M.links && M.links.length > 0 && /* @__PURE__ */ f("ul", { className: "footer-links", children: M.links.map((N, P) => /* @__PURE__ */ f("li", { className: "footer-link-item", children: /* @__PURE__ */ f(
                "a",
                {
                  href: N.href,
                  target: N.external ? "_blank" : "_self",
                  rel: N.external ? "noopener noreferrer" : void 0,
                  className: "footer-link",
                  onClick: N.onClick,
                  children: N.text
                }
              ) }, P)) }),
              M.content && /* @__PURE__ */ f("div", { className: "footer-section-content", children: M.content })
            ] }, S)) }),
            n.length > 0 && /* @__PURE__ */ f("div", { className: "footer-social", children: /* @__PURE__ */ f("div", { className: "footer-social-links", children: n.map((M, S) => /* @__PURE__ */ f(
              "a",
              {
                href: M.href,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "footer-social-link",
                "aria-label": M.label,
                onClick: M.onClick,
                children: M.icon ? M.icon : M.label
              },
              S
            )) }) }),
            g && (e.length > 0 || n.length > 0) && t && /* @__PURE__ */ f("hr", { className: "footer-divider", style: { borderColor: x + "20" } }),
            t && /* @__PURE__ */ f("div", { className: "footer-bottom", children: /* @__PURE__ */ f("p", { className: "footer-bottom-text", children: t }) })
          ]
        }
      )
    }
  );
}, B1 = ({
  children: e,
  variant: t = "glow-track",
  size: n = "medium",
  disabled: s = !1,
  loading: i = !1,
  onClick: r,
  className: a = "",
  // Customizable theme properties for glow-track variant
  buttonBackground: o = "#09041e",
  buttonColor: l = "#fff",
  buttonShadow: c = "rgba(33, 4, 104, 0.2)",
  buttonShineLeft: h = "rgba(120, 0, 245, 0.8)",
  buttonShineRight: d = "rgba(200, 148, 255, 0.9)",
  buttonGlowStart: u = "#B000E8",
  buttonGlowEnd: g = "#009FFD",
  ...p
}) => {
  const b = H(null), m = "my-ui-btn", y = `${m}--${t}`, _ = `${m}--${n}`, x = s ? `${m}--disabled` : "", w = i ? `${m}--loading` : "", v = [
    m,
    y,
    _,
    x,
    w,
    a
  ].filter(Boolean).join(" "), k = t === "glow-track";
  G(() => {
    if (k && b.current) {
      const R = b.current;
      let C = R.querySelector(".my-ui-btn__glow-gradient");
      C || (C = document.createElement("div"), C.classList.add("my-ui-btn__glow-gradient"), R.appendChild(C));
      const A = (T) => {
        const O = R.getBoundingClientRect(), D = T.clientX - O.left, E = T.clientY - O.top;
        D / O.width;
        const B = getComputedStyle(R).getPropertyValue("--button-glow-start").trim();
        getComputedStyle(R).getPropertyValue("--button-glow-end").trim();
        const z = M(B);
        R.style.setProperty("--pointer-x", `${D}px`), R.style.setProperty("--pointer-y", `${E}px`), R.style.setProperty("--button-glow", z);
      };
      return R.addEventListener("pointermove", A), () => {
        R.removeEventListener("pointermove", A);
      };
    }
  }, [k]);
  const M = (R, C, A) => R;
  return /* @__PURE__ */ f(
    "button",
    {
      ref: b,
      className: v,
      disabled: s || i,
      onClick: (R) => {
        !s && !i && r && r(R);
      },
      style: k ? {
        "--button-background": o,
        "--button-color": l,
        "--button-shadow": c,
        "--button-shine-left": h,
        "--button-shine-right": d,
        "--button-glow-start": u,
        "--button-glow-end": g
      } : {},
      ...p,
      children: i ? /* @__PURE__ */ I(kt, { children: [
        /* @__PURE__ */ f("span", { className: `${m}__spinner` }),
        /* @__PURE__ */ f("span", { className: `${m}__text ${m}__text--loading`, children: e })
      ] }) : /* @__PURE__ */ f("span", { className: `${m}__text`, children: e })
    }
  );
}, H1 = ({
  children: e,
  colors: t = ["rgb(123, 31, 162)", "rgb(103, 58, 183)", "rgb(244, 143, 177)"],
  animationSpeed: n = 3e3,
  className: s = "",
  style: i = {},
  ...r
}) => {
  const a = H(null);
  return G(() => {
    if (!a.current) return;
    const o = t.length >= 3 ? t : [...t, ...t].slice(0, 3);
    a.current.style.setProperty("--gradient-color-1", o[0]), a.current.style.setProperty("--gradient-color-2", o[1]), a.current.style.setProperty("--gradient-color-3", o[2]), a.current.style.setProperty("--animation-speed", `${n}ms`);
  }, [t, n]), /* @__PURE__ */ f(
    "span",
    {
      ref: a,
      className: `magic ${s}`,
      style: i,
      ...r,
      children: /* @__PURE__ */ f("span", { className: "magic-text", children: e })
    }
  );
}, V1 = ({
  images: e = [],
  rows: t = 5,
  columns: n = 9,
  useInertia: s = !0,
  useCenterGrid: i = !0,
  dragResistance: r = 0.96,
  snapThreshold: a = 50,
  centerDuration: o = 700,
  imageSize: l = 0.35,
  gutter: c = 0.05,
  className: h = "",
  theme: d = "",
  onImageClick: u = null,
  loadingPlaceholder: g = !0,
  friction: p = 0.85,
  minVelocity: b = 0.5,
  enableCursorLerp: m = !1,
  lerpStrength: y = 0.05,
  lerpSmoothing: _ = 0.1
}) => {
  const x = H(null), w = H(null), v = H(null), k = H({ x: 0, y: 0 }), M = H(!1), S = H({ x: 0, y: 0 }), N = H({ x: 0, y: 0 }), P = H({ x: 0, y: 0 }), R = H(0), C = H({ x: 0, y: 0 }), A = H({ x: 0, y: 0 }), T = H(!1), O = H([]), D = H([]), E = H([]), B = H({ x: 0, y: 0 }), z = H({ x: 0, y: 0 }), L = H(null), [$, F] = X({
    boxWidth: 0,
    boxHeight: 0,
    gutterSize: 0,
    winWidth: 0,
    winHeight: 0,
    spacingX: 0,
    spacingY: 0
  }), [j, W] = X(!1), Y = st(() => {
    const q = window.innerWidth, Q = window.innerHeight, dt = q * l, vt = Q * l, ht = q * c, ot = dt + ht, ut = vt + ht;
    F({
      boxWidth: dt,
      boxHeight: vt,
      gutterSize: ht,
      winWidth: q,
      winHeight: Q,
      spacingX: ot,
      spacingY: ut
    });
  }, [l, c]), V = st((q, Q) => {
    if (!q) {
      if (g) {
        const dt = Math.floor(Math.max($.winWidth, $.winHeight) / 3);
        return `https://picsum.photos/${dt}/${dt}?random=${Q}`;
      }
      return null;
    }
    return typeof q == "string" ? q : q.url || q.src || null;
  }, [g, $]), U = st((q, Q) => {
    const { winWidth: dt, winHeight: vt, boxWidth: ht, boxHeight: ot } = $, ut = Math.max(ht, ot) * 0.1;
    return q >= -ut && q <= dt + ut && Q >= -ut && Q <= vt + ut;
  }, [$]), Z = st(() => {
    if (!x.current || $.boxWidth === 0) return;
    const q = x.current;
    q.innerHTML = "", O.current = [], D.current = [], E.current = [];
    for (let Q = 0; Q < t; Q++) {
      const dt = document.createElement("div");
      dt.className = "infinite-gallery-row", dt.style.position = "absolute";
      const vt = [];
      for (let ht = 0; ht < n; ht++) {
        const ot = document.createElement("div");
        ot.className = "infinite-gallery-image";
        const ut = Q * n + ht, Mt = e.length > 0 ? e[ut % e.length] : null, zt = V(Mt, ut);
        ot.style.position = "absolute", ot.style.width = `${$.boxWidth}px`, ot.style.height = `${$.boxHeight}px`, ot.style.backgroundSize = "cover", ot.style.backgroundPosition = "center", ot.style.backgroundRepeat = "no-repeat", ot.style.cursor = u ? "pointer" : "inherit", ot.style.zIndex = "10", ot.style.transition = "z-index 0.1s ease-out", zt && (ot.style.backgroundImage = `url(${zt})`), u && ot.addEventListener("click", (Ht) => {
          M.current || (Ht.stopPropagation(), u(Mt, ut));
        });
        const Qt = {
          element: ot,
          row: Q,
          col: ht,
          index: ut,
          imageData: Mt,
          baseX: ht * $.spacingX,
          baseY: Q * $.spacingY,
          currentX: ht * $.spacingX,
          currentY: Q * $.spacingY,
          isVisible: !0
        };
        vt.push(Qt), O.current.push(Qt), dt.appendChild(ot);
      }
      D.current.push(vt), E.current.push(dt), q.appendChild(dt);
    }
    W(!0);
  }, [$, t, n, e, V, u]), K = st(() => {
    if (!j) return;
    const { spacingX: q, spacingY: Q, winWidth: dt, winHeight: vt } = $, { x: ht, y: ot } = C.current, ut = m ? z.current.x : 0, Mt = m ? z.current.y : 0, zt = ht + ut, Qt = ot + Mt;
    O.current.forEach((Ht, o1) => {
      const { element: $0, row: js, col: oo } = Ht, lo = js % 2 === 1 ? $.boxWidth / 2 : 0, co = oo * q + lo, ho = js * Q;
      let te = co + zt, ee = ho + Qt;
      const A0 = Math.max($.boxWidth, $.boxHeight) * 2, uo = te, fo = ee;
      for (; te > dt + A0; )
        te -= n * q;
      for (; te < -A0 - $.boxWidth; )
        te += n * q;
      for (; ee > vt + A0; )
        ee -= t * Q;
      for (; ee < -A0 - $.boxHeight; )
        ee += t * Q;
      const go = uo !== te || fo !== ee, mo = U(te, ee);
      go || !mo ? ($0.style.zIndex = "-10", Ht.isVisible = !1) : ($0.style.zIndex = "10", Ht.isVisible = !0), $0.style.transform = `translate3d(${te}px, ${ee}px, 0)`, $0.style.willChange = M.current ? "transform" : "auto", Ht.currentX = te - ht, Ht.currentY = ee - ot;
    });
  }, [j, $, t, n, U, m]), J = st(() => {
    if (T.current) {
      const q = A.current.x - C.current.x, Q = A.current.y - C.current.y;
      if (Math.abs(q) < 0.5 && Math.abs(Q) < 0.5) {
        C.current = { ...A.current }, T.current = !1, K();
        return;
      }
      C.current.x += q * 0.12, C.current.y += Q * 0.12;
    } else s && !M.current && (Math.abs(k.current.x) > b || Math.abs(k.current.y) > b) && (C.current.x += k.current.x, C.current.y += k.current.y, k.current.x *= p, k.current.y *= p, Math.abs(k.current.x) < b && (k.current.x = 0), Math.abs(k.current.y) < b && (k.current.y = 0));
    K(), T.current || s && !M.current && (Math.abs(k.current.x) > b || Math.abs(k.current.y) > b) ? v.current = requestAnimationFrame(J) : i && !M.current && !T.current && setTimeout(mt, 200);
  }, [K, s, i, p, b]), tt = st(() => {
    if (!m) return;
    const { winWidth: q, winHeight: Q } = $;
    if (q === 0 || Q === 0) {
      L.current = requestAnimationFrame(tt);
      return;
    }
    const dt = B.current.x / q * 2 - 1, vt = B.current.y / Q * 2 - 1, ht = -dt * q * y, ot = -vt * Q * y;
    z.current.x += (ht - z.current.x) * _, z.current.y += (ot - z.current.y) * _, K(), L.current = requestAnimationFrame(tt);
  }, [m, $, y, _, K]), at = st((q) => {
    m && (B.current = {
      x: q.clientX,
      y: q.clientY
    });
  }, [m]), mt = st(() => {
    if (!j) return;
    const { winWidth: q, winHeight: Q } = $, dt = q / 2, vt = Q / 2;
    let ht = null, ot = 1 / 0;
    if (O.current.filter((ut) => ut.isVisible).forEach((ut) => {
      const Mt = ut.element.getBoundingClientRect(), zt = Mt.left + Mt.width / 2, Qt = Mt.top + Mt.height / 2, Ht = Math.sqrt(
        Math.pow(zt - dt, 2) + Math.pow(Qt - vt, 2)
      );
      Ht < ot && (ot = Ht, ht = { gridItem: ut, centerX: zt, centerY: Qt });
    }), ht && ot > a) {
      const ut = dt - ht.centerX, Mt = vt - ht.centerY;
      A.current = {
        x: C.current.x + ut,
        y: C.current.y + Mt
      }, T.current = !0, J();
    }
  }, [j, $, a, J]), nt = st((q, Q) => {
    M.current = !0, S.current = { x: q, y: Q }, N.current = { ...C.current }, P.current = { x: q, y: Q }, R.current = Date.now(), k.current = { x: 0, y: 0 }, T.current = !1, v.current && cancelAnimationFrame(v.current);
  }, []), _t = st((q, Q) => {
    if (!M.current) return;
    const dt = Date.now(), vt = Math.max(dt - R.current, 1), ht = q - P.current.x, ot = Q - P.current.y;
    k.current.x = ht / vt * 16 * r, k.current.y = ot / vt * 16 * r;
    const ut = q - S.current.x, Mt = Q - S.current.y;
    C.current = {
      x: N.current.x + ut,
      y: N.current.y + Mt
    }, P.current = { x: q, y: Q }, R.current = dt, K();
  }, [r, K]), Nt = st(() => {
    M.current && (M.current = !1, s && (Math.abs(k.current.x) > b || Math.abs(k.current.y) > b) ? J() : i && setTimeout(mt, 100));
  }, [s, i, J, mt, b]), Dt = st((q) => {
    q.preventDefault(), nt(q.clientX, q.clientY);
  }, [nt]), Ot = st((q) => {
    _t(q.clientX, q.clientY);
  }, [_t]), Wt = st(() => {
    Nt();
  }, [Nt]), It = st((q) => {
    q.preventDefault();
    const Q = q.touches[0];
    nt(Q.clientX, Q.clientY);
  }, [nt]), Ge = st((q) => {
    q.preventDefault();
    const Q = q.touches[0];
    _t(Q.clientX, Q.clientY);
  }, [_t]), qe = st((q) => {
    q.preventDefault(), Nt();
  }, [Nt]);
  return G(() => {
    Y();
    const q = () => {
      Y();
    };
    return window.addEventListener("resize", q), () => window.removeEventListener("resize", q);
  }, [Y]), G(() => {
    $.boxWidth > 0 && Z();
  }, [Z, $.boxWidth]), G(() => {
    if (j && $.boxWidth > 0) {
      const { winWidth: q, winHeight: Q, spacingX: dt, spacingY: vt } = $, ht = Math.floor(n / 2), ot = Math.floor(t / 2), ut = ot % 2 === 1 ? $.boxWidth / 2 : 0, Mt = ht * dt + ut, zt = ot * vt;
      C.current = {
        x: q / 2 - Mt - $.boxWidth / 2,
        y: Q / 2 - zt - $.boxHeight / 2
      }, m && (B.current = {
        x: q / 2,
        y: Q / 2
      }, L.current && cancelAnimationFrame(L.current), L.current = requestAnimationFrame(tt)), K();
    }
  }, [j, $, K, n, t, m, tt]), G(() => {
    const q = x.current;
    if (q)
      return q.addEventListener("mousedown", Dt), document.addEventListener("mousemove", Ot), document.addEventListener("mouseup", Wt), q.addEventListener("touchstart", It, { passive: !1 }), q.addEventListener("touchmove", Ge, { passive: !1 }), q.addEventListener("touchend", qe, { passive: !1 }), m && document.addEventListener("mousemove", at), () => {
        q.removeEventListener("mousedown", Dt), document.removeEventListener("mousemove", Ot), document.removeEventListener("mouseup", Wt), q.removeEventListener("touchstart", It), q.removeEventListener("touchmove", Ge), q.removeEventListener("touchend", qe), m && document.removeEventListener("mousemove", at), v.current && cancelAnimationFrame(v.current), L.current && cancelAnimationFrame(L.current);
      };
  }, [Dt, Ot, Wt, It, Ge, qe, m, at]), $.boxWidth === 0 ? /* @__PURE__ */ f("div", { className: `infinite-gallery loading ${d}`, children: "Loading..." }) : /* @__PURE__ */ I("div", { className: `infinite-gallery ${d}`, children: [
    /* @__PURE__ */ f(
      "div",
      {
        ref: w,
        className: "infinite-gallery-background"
      }
    ),
    /* @__PURE__ */ f(
      "div",
      {
        ref: x,
        className: "infinite-gallery-container",
        style: {
          cursor: M.current ? "grabbing" : "grab",
          userSelect: "none",
          touchAction: "none"
        }
      }
    )
  ] });
}, W1 = ({
  items: e = [],
  type: t = "type-1",
  slideWidth: n = "clamp(150px, 20vw, 300px)",
  animationDuration: s = "8s",
  backgroundColor: i = "#120020",
  color: r = null,
  className: a = "",
  onSlideClick: o = null,
  rows: l = 5,
  tagPrefix: c = "#",
  direction: h = "left",
  speed: d = "medium"
}) => {
  const u = H(null), g = (S) => {
    const N = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(S);
    return N ? {
      r: parseInt(N[1], 16),
      g: parseInt(N[2], 16),
      b: parseInt(N[3], 16)
    } : null;
  }, p = (S) => {
    const N = g(S);
    return N && (0.299 * N.r + 0.587 * N.g + 0.114 * N.b) / 255 > 0.5 ? "#000000" : "#ffffff";
  }, b = (S, N) => {
    const P = g(S);
    if (!P) return S;
    const R = (O) => {
      if (N > 0) {
        const D = O + (255 - O) * (N / 100);
        return Math.min(255, Math.max(0, Math.round(D)));
      } else {
        const D = O * (1 + N / 100);
        return Math.min(255, Math.max(0, Math.round(D)));
      }
    }, C = R(P.r), A = R(P.g), T = R(P.b);
    return `#${C.toString(16).padStart(2, "0")}${A.toString(16).padStart(2, "0")}${T.toString(16).padStart(2, "0")}`;
  };
  G(() => {
    if (r && u.current) {
      const S = g(r), N = b(r, -70), P = b(r, -20), R = b(r, -10), C = p(P), A = `rgba(${S?.r || 0}, ${S?.g || 0}, ${S?.b || 0}, 0.4)`;
      u.current.style.setProperty("--auto-bg-color", N), u.current.style.setProperty("--auto-btn-color", P), u.current.style.setProperty("--auto-btn-hover-color", R), u.current.style.setProperty("--auto-btn-text-color", C), u.current.style.setProperty("--auto-shadow-color", A);
    }
  }, [r]);
  const m = r ? "var(--auto-bg-color)" : i, y = [
    { id: 1, src: "https://images.pexels.com/photos/2887718/pexels-photo-2887718.jpeg", alt: "Image 1" },
    { id: 2, src: "https://images.pexels.com/photos/12176130/pexels-photo-12176130.jpeg", alt: "Image 2" },
    { id: 3, src: "https://images.pexels.com/photos/17042334/pexels-photo-17042334.jpeg", alt: "Image 3" },
    { id: 4, src: "https://images.pexels.com/photos/2836486/pexels-photo-2836486.jpeg", alt: "Image 4" },
    { id: 5, src: "https://images.pexels.com/photos/19759593/pexels-photo-19759593.jpeg", alt: "Image 5" },
    { id: 6, src: "https://images.pexels.com/photos/12774432/pexels-photo-12774432.jpeg", alt: "Image 6" }
  ], _ = [
    [
      { id: 1, text: "JavaScript" },
      { id: 2, text: "webdev" },
      { id: 3, text: "TypeScript" },
      { id: 4, text: "Next.js" },
      { id: 5, text: "UI/UX" }
    ],
    [
      { id: 6, text: "webdev" },
      { id: 7, text: "Gatsby" },
      { id: 8, text: "JavaScript" },
      { id: 9, text: "Tailwind" },
      { id: 10, text: "TypeScript" }
    ],
    [
      { id: 11, text: "animation" },
      { id: 12, text: "Tailwind" },
      { id: 13, text: "React" },
      { id: 14, text: "SVG" },
      { id: 15, text: "HTML" }
    ],
    [
      { id: 16, text: "Gatsby" },
      { id: 17, text: "HTML" },
      { id: 18, text: "CSS" },
      { id: 19, text: "React" },
      { id: 20, text: "Next.js" }
    ],
    [
      { id: 21, text: "Next.js" },
      { id: 22, text: "React" },
      { id: 23, text: "webdev" },
      { id: 24, text: "TypeScript" },
      { id: 25, text: "Gatsby" }
    ]
  ], x = [
    { id: 1, text: "Cheeky" },
    { id: 2, text: "monkey" },
    { id: 3, text: "swinging" },
    { id: 4, text: "through" },
    { id: 5, text: "trees" },
    { id: 6, text: "with" },
    { id: 7, text: "ease !" }
  ], w = [
    { id: 1, src: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80", alt: "brown monkey" },
    { id: 2, src: "https://images.unsplash.com/photo-1605559911160-a3d95d213904?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80", alt: "a little monkey" },
    { id: 3, src: "https://images.unsplash.com/photo-1615038552039-e1b271f14ec8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80", alt: "monkey with big mouth opened" },
    { id: 4, src: "https://images.unsplash.com/photo-1463852247062-1bbca38f7805?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80", alt: "a big monkey" },
    { id: 5, src: "https://images.unsplash.com/photo-1618661057302-8b01d93bd898?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80", alt: "a running monkey" },
    { id: 6, src: "https://images.unsplash.com/photo-1579786419323-980ee401051b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80", alt: "monkey hanging on a tree" },
    { id: 7, src: "https://images.unsplash.com/photo-1570288685280-7802a8f8c4fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80", alt: "a little monkey with a long mustache" }
  ], v = (S, N) => {
    o && o(S, N);
  }, k = (S, N, P) => {
    o && o(S, { rowIndex: N, tagIndex: P });
  }, M = (S = 15e3) => Math.floor(S + Math.random() * 5e3);
  if (t === "type-1") {
    const S = e.length > 0 ? e : y, N = [...S, ...S], P = {
      "--slide-width": n,
      "--slide-gap": `calc(${n} * 0.06)`,
      "--slide-border-radius": `calc(${n} * 0.06)`,
      "--background-color": m,
      "--animation-duration": s
    };
    return /* @__PURE__ */ f(
      "div",
      {
        ref: u,
        className: `scroller-container ${a}`,
        style: P,
        children: /* @__PURE__ */ f("div", { className: "scroller-wrapper", children: N.map((R, C) => /* @__PURE__ */ f(
          "div",
          {
            className: "scroller-slide",
            onClick: () => v(R, C),
            children: /* @__PURE__ */ f(
              "img",
              {
                src: R.src,
                alt: R.alt || `Slide ${C + 1}`,
                loading: "lazy"
              }
            )
          },
          `${R.id}-${C}`
        )) })
      }
    );
  }
  if (t === "type-2") {
    const N = (e.length > 0 ? e : _).slice(0, l), P = {
      "--background-color": m,
      "--btn-color": r ? "var(--auto-btn-color)" : void 0,
      "--btn-hover-color": r ? "var(--auto-btn-hover-color)" : void 0,
      "--btn-text-color": r ? "var(--auto-btn-text-color)" : void 0
    };
    return /* @__PURE__ */ I(
      "div",
      {
        ref: u,
        className: `tag-list ${a}`,
        style: P,
        children: [
          N.map((R, C) => {
            const A = [...R, ...R], T = C % 2 === 0 ? "normal" : "reverse", O = M();
            return /* @__PURE__ */ f(
              "div",
              {
                className: "loop-slider",
                style: {
                  "--duration": `${O}ms`,
                  "--direction": T
                },
                children: /* @__PURE__ */ f("div", { className: "inner", children: A.map((D, E) => /* @__PURE__ */ I(
                  "div",
                  {
                    className: "tag",
                    onClick: () => k(D, C, E),
                    children: [
                      /* @__PURE__ */ f("span", { children: c }),
                      " ",
                      D.text
                    ]
                  },
                  `${D.id}-${E}`
                )) })
              },
              C
            );
          }),
          /* @__PURE__ */ f("div", { className: "fade" })
        ]
      }
    );
  }
  if (t === "type-3") {
    const S = e.length > 0 ? e : e.some((C) => C.src) ? w : x, N = [...S, ...S], R = {
      "--background-color": m,
      "--animation-duration": (() => {
        switch (d) {
          case "slow":
            return "20s";
          case "fast":
            return "10s";
          case "medium":
          default:
            return "15s";
        }
      })(),
      "--animation-direction": h === "left" ? "forwards" : "reverse",
      "--btn-color": r ? "var(--auto-btn-color)" : void 0,
      "--btn-text-color": r ? "var(--auto-btn-text-color)" : void 0,
      "--shadow-color": r ? "var(--auto-shadow-color)" : void 0
    };
    return /* @__PURE__ */ f(
      "div",
      {
        ref: u,
        className: `horizontal-scroller ${a}`,
        style: R,
        children: /* @__PURE__ */ f("div", { className: "horizontal-scroller__inner", children: N.map((C, A) => C.src ? /* @__PURE__ */ f(
          "div",
          {
            className: "horizontal-scroller__item",
            onClick: () => v(C, A),
            children: /* @__PURE__ */ f(
              "img",
              {
                src: C.src,
                alt: C.alt || `Image ${A + 1}`,
                loading: "lazy"
              }
            )
          },
          `${C.id}-${A}`
        ) : /* @__PURE__ */ f(
          "div",
          {
            className: "horizontal-scroller__item horizontal-scroller__text",
            onClick: () => v(C, A),
            children: C.text
          },
          `${C.id}-${A}`
        )) })
      }
    );
  }
  return null;
}, j1 = ({
  label: e,
  id: t,
  name: n,
  type: s = "text",
  placeholder: i,
  hint: r,
  required: a = !1,
  maxLength: o,
  pattern: l,
  value: c,
  onChange: h,
  onBlur: d,
  onFocus: u,
  disabled: g = !1,
  size: p = "medium",
  // 'small', 'medium', 'large', 'full'
  focusColor: b,
  // Custom focus outline color
  className: m = "",
  ...y
}) => {
  const _ = t || `input-${Math.random().toString(36).substr(2, 9)}`, x = {
    small: "input-small",
    medium: "input-medium",
    large: "input-large",
    full: "input-full"
  }, w = b ? {
    "--custom-focus-color": b
  } : {};
  return /* @__PURE__ */ I(
    "div",
    {
      className: `labeled-input ${x[p]} ${b ? "has-custom-focus" : ""} ${m}`,
      style: w,
      children: [
        e && /* @__PURE__ */ f("label", { htmlFor: _, children: e }),
        /* @__PURE__ */ f(
          "input",
          {
            type: s,
            name: n,
            id: _,
            placeholder: i,
            required: a,
            maxLength: o,
            pattern: l,
            value: c,
            onChange: h,
            onBlur: d,
            onFocus: u,
            disabled: g,
            ...y
          }
        ),
        /* @__PURE__ */ I("div", { className: "hint-and-status", children: [
          r && /* @__PURE__ */ f("span", { className: "input-hint", children: r }),
          /* @__PURE__ */ f("span", { className: "input-status" })
        ] })
      ]
    }
  );
}, Y1 = ({
  length: e = 6,
  onComplete: t,
  onResend: n,
  email: s = "",
  timeLimit: i = 120,
  autoFocus: r = !0,
  disabled: a = !1,
  className: o = "inputotp-light",
  placeholder: l = "",
  focusColor: c,
  // Custom focus border and shadow color
  ...h
}) => {
  const [d, u] = X(new Array(e).fill("")), [g, p] = X(i), [b, m] = X(!1), [y, _] = X(!0), x = H([]);
  G(() => {
    r && x.current[0] && x.current[0].focus();
  }, [r]), G(() => (i > 0 && v(), () => {
    w.current && clearInterval(w.current);
  }), [i]);
  const w = H(null), v = () => {
    w.current && clearInterval(w.current), p(i), m(!1), _(!0), w.current = setInterval(() => {
      p((T) => T <= 1 ? (clearInterval(w.current), m(!0), _(!1), 0) : T - 1);
    }, 1e3);
  }, k = (T, O) => {
    const D = T.value;
    if (D.length > 1) {
      T.value = D.slice(0, 1);
      return;
    }
    const E = [...d];
    E[O] = D, u(E), D && O < e - 1 && x.current[O + 1].focus(), E.every((B) => B !== "") && t && t(E.join(""));
  }, M = (T, O) => {
    if (T.key === "e" || T.key === "E") {
      T.preventDefault();
      return;
    }
    if (T.key === "Backspace") {
      !d[O] && O > 0 && x.current[O - 1].focus();
      const D = [...d];
      D[O] = "", u(D);
    }
    T.key === "ArrowLeft" && O > 0 && x.current[O - 1].focus(), T.key === "ArrowRight" && O < e - 1 && x.current[O + 1].focus();
  }, S = (T) => {
    T.preventDefault();
    const D = T.clipboardData.getData("text").replace(/\D/g, "").slice(0, e), E = new Array(e).fill("");
    for (let L = 0; L < D.length; L++)
      E[L] = D[L];
    u(E);
    const B = E.findIndex((L) => L === ""), z = B !== -1 ? B : e - 1;
    x.current[z].focus(), E.every((L) => L !== "") && t && t(E.join(""));
  }, N = () => {
    y && n && (u(new Array(e).fill("")), x.current[0].focus(), v(), n());
  }, P = (T) => {
    const O = Math.floor(T / 60), D = T % 60;
    return `${O}:${D.toString().padStart(2, "0")}`;
  }, R = () => d.join(""), C = () => {
    u(new Array(e).fill("")), x.current[0] && x.current[0].focus();
  };
  ve.useImperativeHandle(h.ref, () => ({
    getValue: R,
    clear: C,
    focus: () => x.current[0]?.focus()
  }));
  const A = c ? {
    "--custom-focus-color": c,
    "--custom-focus-shadow": `${c}33`
    // Add 33 for 20% opacity
  } : {};
  return /* @__PURE__ */ I(
    "div",
    {
      className: `otp-container ${o} ${c ? "has-custom-focus" : ""}`,
      style: A,
      children: [
        /* @__PURE__ */ I("div", { className: "otp-header", children: [
          /* @__PURE__ */ f("h1", { className: "otp-title", children: "OTP Verification" }),
          s && /* @__PURE__ */ I("p", { className: "otp-description", children: [
            "Enter the OTP you received to ",
            /* @__PURE__ */ f("span", { className: "otp-email", children: s })
          ] })
        ] }),
        /* @__PURE__ */ f("div", { className: "otp-input-group", children: d.map((T, O) => /* @__PURE__ */ f(
          "input",
          {
            ref: (D) => x.current[O] = D,
            type: "number",
            min: "0",
            max: "9",
            value: T,
            onChange: (D) => k(D.target, O),
            onKeyDown: (D) => M(D, O),
            onPaste: S,
            disabled: a || b,
            className: `otp-input ${b ? "expired" : ""}`,
            placeholder: l,
            ...h
          },
          O
        )) }),
        i > 0 && /* @__PURE__ */ f("div", { className: "otp-footer", children: /* @__PURE__ */ I("div", { className: "resend-section", children: [
          /* @__PURE__ */ f("span", { className: "resend-text", children: "Didn't receive the code? " }),
          /* @__PURE__ */ f(
            "button",
            {
              type: "button",
              onClick: N,
              disabled: !y,
              className: `resend-link ${y ? "" : "disabled"}`,
              children: "Resend Code"
            }
          ),
          /* @__PURE__ */ f("span", { className: `timer ${b ? "expired" : ""}`, children: b ? "Code expired" : `(${P(g)})` })
        ] }) })
      ]
    }
  );
}, U1 = ({
  href: e,
  children: t,
  prefetch: n = "pageload",
  width: s = 256,
  height: i = 144,
  scale: r = 0.25,
  className: a = "",
  followCursor: o = !0,
  followIntensity: l = 0.15,
  linkColor: c = "#e33de0"
}) => {
  const [h, d] = X(!1), [u, g] = X(!1), [p, b] = X({ x: 0, y: 0 }), m = H(null), y = H(null), _ = H(null);
  G(() => {
    switch (n) {
      case "pageload":
        g(!0);
        break;
      case "parenthover":
        const v = m.current?.parentElement;
        y.current = v;
        const k = () => {
          g(!0);
        };
        return v?.addEventListener("mouseenter", k, { once: !0 }), () => {
          v?.removeEventListener("mouseenter", k);
        };
      case "none":
        const M = () => {
          g(!0);
        };
        return m.current?.addEventListener("mouseenter", M, { once: !0 }), () => {
          m.current?.removeEventListener("mouseenter", M);
        };
      default:
        console.warn("Prefetch setting not recognized:", n);
        break;
    }
  }, [n]), G(() => {
    if (!o || !m.current) return;
    const v = (S) => {
      const P = m.current.getBoundingClientRect(), R = P.left + P.width / 2, C = P.top + P.height / 2, A = (S.clientX - R) * l, T = (S.clientY - C) * l;
      b({ x: A, y: T });
    }, k = () => {
      b({ x: 0, y: 0 });
    }, M = m.current;
    return M.addEventListener("mousemove", v), M.addEventListener("mouseleave", k), () => {
      M.removeEventListener("mousemove", v), M.removeEventListener("mouseleave", k);
    };
  }, [o, l]), G(() => {
    if (_.current && m.current) {
      const v = m.current, k = _.current, M = parseInt(window.getComputedStyle(v).fontSize, 10), S = (v.offsetHeight + M) / 2, N = (v.offsetWidth - k.offsetWidth) / 2;
      k.style.top = `${S}px`, k.style.left = `${N}px`;
    }
  }, []);
  const x = () => {
    d(!0);
  }, w = 100 / r;
  return /* @__PURE__ */ I(
    "a",
    {
      href: e,
      ref: m,
      className: `link-preview ${a}`,
      target: "_blank",
      rel: "noopener noreferrer",
      style: { "--link-color": c },
      children: [
        t,
        /* @__PURE__ */ I(
          "div",
          {
            ref: _,
            className: "mini-preview-wrapper",
            style: {
              width: `${s}px`,
              height: `${i}px`,
              transform: `translate(${p.x}px, ${p.y}px)`
            },
            children: [
              /* @__PURE__ */ f("div", { className: "mini-preview-loading", style: { display: h ? "none" : "table" }, children: "Loading..." }),
              u && /* @__PURE__ */ f(
                "iframe",
                {
                  className: "mini-preview-frame",
                  src: e,
                  onLoad: x,
                  title: "Link Preview",
                  style: {
                    width: `${w}%`,
                    height: `${w}%`,
                    transform: `scale(${r})`,
                    backgroundColor: h ? "#fff" : "transparent"
                  }
                }
              ),
              /* @__PURE__ */ f("div", { className: "mini-preview-cover" })
            ]
          }
        )
      ]
    }
  );
}, X1 = ({
  children: e = "Button",
  onClick: t,
  className: n = "",
  speed: s = 0.8,
  radius: i = 8,
  size: r = 2.5,
  color: a = "#F0ABFC",
  backgroundColor: o = "#1F2124",
  ...l
}) => /* @__PURE__ */ I(
  "button",
  {
    className: `lume-button ${n}`,
    onClick: t,
    style: {
      "--speed": s,
      "--radius": `${i}px`,
      "--size": `${r}px`,
      "--color": a,
      "--btn-background": o
    },
    ...l,
    children: [
      /* @__PURE__ */ f("span", { className: "lume-glow-container", children: /* @__PURE__ */ f("span", { className: "lume-glow" }) }),
      /* @__PURE__ */ f("span", { className: "lume-text", children: e })
    ]
  }
), G1 = ({
  title: e,
  logo: t,
  endIcon: n,
  menuItems: s = [],
  searchable: i = !1,
  searchPlaceholder: r = "Search...",
  onSearch: a,
  className: o = "",
  variant: l = "default",
  centerLogo: c = !1,
  onMenuClick: h,
  onIconClick: d,
  color: u = "#3b82f6"
}) => {
  const [g, p] = X(!1), [b, m] = X({}), [y, _] = X(""), x = H({}), w = H(!1), v = H(null), k = (D) => {
    const E = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(D);
    return E ? {
      r: parseInt(E[1], 16),
      g: parseInt(E[2], 16),
      b: parseInt(E[3], 16)
    } : null;
  }, M = (D) => {
    const E = k(D);
    return E && (0.299 * E.r + 0.587 * E.g + 0.114 * E.b) / 255 > 0.5 ? "#000000" : "#ffffff";
  }, S = (D, E) => {
    const B = k(D);
    if (!B) return D;
    {
      const z = (L) => {
        const $ = L * (1 + E / 100);
        return Math.min(255, Math.max(0, Math.round($)));
      };
      return `#${z(B.r).toString(16).padStart(2, "0")}${z(B.g).toString(16).padStart(2, "0")}${z(B.b).toString(16).padStart(2, "0")}`;
    }
  };
  G(() => {
    if (!v.current) return;
    const D = k(u);
    M(u), v.current.style.setProperty("--navbar-primary", u), v.current.style.setProperty("--navbar-primary-hover", S(u, -10)), v.current.style.setProperty("--navbar-primary-light", `rgba(${D?.r || 0}, ${D?.g || 0}, ${D?.b || 0}, 0.1)`), v.current.style.setProperty("--navbar-focus-color", u), v.current.style.setProperty("--menu-btn-hovercolor", `rgba(${D?.r || 0}, ${D?.g || 0}, ${D?.b || 0}, 0.15)`), v.current.style.setProperty("--navbar-bg-tint", `rgba(${D?.r || 0}, ${D?.g || 0}, ${D?.b || 0}, 0.05)`);
  }, [u]), G(() => {
    const D = (E) => {
      if (w.current) {
        w.current = !1;
        return;
      }
      Object.keys(x.current).forEach((B) => {
        const z = x.current[B];
        z && !z.contains(E.target) && m((L) => ({ ...L, [B]: !1 }));
      });
    };
    return document.addEventListener("click", D), () => document.removeEventListener("click", D);
  }, []);
  const N = (D) => {
    m((E) => {
      const B = { ...E };
      return Object.keys(B).forEach((z) => {
        z !== D && (B[z] = !1);
      }), B[D] = !E[D], B;
    });
  }, P = (D) => {
    D.preventDefault(), a && a(y);
  }, R = (D, E, B) => {
    B.stopPropagation(), D.dropdown ? N(`menu-${E}`) : h && h(D, E), D.dropdown || p(!1);
  }, C = (D, E, B = "") => D ? typeof D == "string" ? /* @__PURE__ */ f(
    "button",
    {
      className: `navbar-icon ${B}`,
      onClick: E,
      "aria-label": "Icon button",
      children: D
    }
  ) : /* @__PURE__ */ f(
    "button",
    {
      className: `navbar-icon ${B}`,
      onClick: E,
      "aria-label": "Icon button",
      children: D
    }
  ) : null, A = (D, E) => {
    const B = D.dropdown && D.dropdown.length > 0, z = b[`menu-${E}`];
    return /* @__PURE__ */ I(
      "div",
      {
        className: "navbar-menu-item",
        ref: (L) => x.current[`menu-${E}`] = L,
        children: [
          /* @__PURE__ */ I(
            "button",
            {
              className: `navbar-menu-button ${B ? "has-dropdown" : ""} ${z ? "active" : ""}`,
              onClick: (L) => R(D, E, L),
              children: [
                D.icon && /* @__PURE__ */ f("span", { className: "menu-item-icon", children: D.icon }),
                /* @__PURE__ */ f("span", { children: D.label }),
                D.badge && /* @__PURE__ */ f("span", { className: "menu-badge", children: D.badge }),
                B && /* @__PURE__ */ f("span", { className: "dropdown-arrow", children: /* @__PURE__ */ f("img", { src: "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/down.png", alt: "", height: "10px", width: "10px" }) })
              ]
            }
          ),
          B && /* @__PURE__ */ f("div", { className: `navbar-dropdown ${z ? "open" : ""}`, children: D.dropdown.map((L, $) => /* @__PURE__ */ I(
            "button",
            {
              className: "navbar-dropdown-item",
              onClick: () => {
                h && h(L, `${E}-${$}`), m((F) => ({ ...F, [`menu-${E}`]: !1 })), p(!1);
              },
              children: [
                L.icon && /* @__PURE__ */ f("span", { className: "dropdown-item-icon", children: L.icon }),
                /* @__PURE__ */ f("span", { children: L.label })
              ]
            },
            $
          )) })
        ]
      },
      E
    );
  }, T = () => i ? /* @__PURE__ */ f("div", { className: "navbar-search", children: /* @__PURE__ */ I("form", { onSubmit: P, className: "search-form", children: [
    /* @__PURE__ */ f(
      "input",
      {
        type: "text",
        placeholder: r,
        value: y,
        onChange: (D) => _(D.target.value),
        className: "search-input"
      }
    ),
    /* @__PURE__ */ f("button", { type: "submit", className: "search-button", "aria-label": "Search", children: /* @__PURE__ */ f("img", { src: "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/loupe.png", alt: "", height: "15px", width: "15px" }) })
  ] }) }) : null, O = () => t ? /* @__PURE__ */ f("div", { className: "navbar-logo", children: typeof t == "string" ? /* @__PURE__ */ f("img", { src: t, alt: "Logo", className: "logo-image" }) : t }) : null;
  return /* @__PURE__ */ I("nav", { className: `navbar navbar-${l} navbar-responsive ${o}`, ref: v, children: [
    /* @__PURE__ */ I("div", { className: "navbar-container", children: [
      /* @__PURE__ */ I("div", { className: "navbar-left", children: [
        !c && O(),
        e && !c && /* @__PURE__ */ f("h1", { className: "navbar-title", children: e })
      ] }),
      /* @__PURE__ */ I("div", { className: "navbar-center", children: [
        c && O(),
        s.length > 0 && /* @__PURE__ */ f("div", { className: "navbar-menu desktop-menu", children: s.map((D, E) => A(D, E)) }),
        T()
      ] }),
      /* @__PURE__ */ I("div", { className: "navbar-right", children: [
        n && C(n, () => d && d("end")),
        s.length > 0 && /* @__PURE__ */ f(
          "button",
          {
            className: "navbar-mobile-toggle",
            onClick: () => p(!g),
            "aria-label": "Toggle menu",
            children: /* @__PURE__ */ I("div", { className: `hamburger ${g ? "is-active" : ""}`, children: [
              /* @__PURE__ */ f("span", { className: "hamburger-line" }),
              /* @__PURE__ */ f("span", { className: "hamburger-line" }),
              /* @__PURE__ */ f("span", { className: "hamburger-line" })
            ] })
          }
        )
      ] })
    ] }),
    s.length > 0 && /* @__PURE__ */ f("div", { className: `navbar-mobile-menu ${g ? "open" : ""}`, children: s.map((D, E) => A(D, E)) })
  ] });
}, q1 = ({
  currentPage: e = 1,
  totalPages: t = 7,
  onPageChange: n = () => {
  },
  theme: s = "pagination-light",
  variant: i = "simple",
  // 'simple', 'hoverable', 'bordered'
  showPrevNext: r = !0,
  className: a = "",
  disabled: o = !1,
  color: l = "#9e9e9e"
  // Primary color for theming
}) => {
  const c = H(null), h = (x) => {
    const w = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(x);
    return w ? {
      r: parseInt(w[1], 16),
      g: parseInt(w[2], 16),
      b: parseInt(w[3], 16)
    } : null;
  }, d = (x) => {
    const w = h(x);
    return w && (0.299 * w.r + 0.587 * w.g + 0.114 * w.b) / 255 > 0.5 ? "#000000" : "#ffffff";
  }, u = (x, w) => {
    const v = h(x);
    if (!v) return x;
    const k = (M) => {
      const S = M + (255 - M) * (w / 100);
      return Math.min(255, Math.max(0, Math.round(S)));
    };
    if (w > 0)
      return `#${k(v.r).toString(16).padStart(2, "0")}${k(v.g).toString(16).padStart(2, "0")}${k(v.b).toString(16).padStart(2, "0")}`;
    {
      const M = (S) => {
        const N = S * (1 + w / 100);
        return Math.min(255, Math.max(0, Math.round(N)));
      };
      return `#${M(v.r).toString(16).padStart(2, "0")}${M(v.g).toString(16).padStart(2, "0")}${M(v.b).toString(16).padStart(2, "0")}`;
    }
  };
  G(() => {
    if (!c.current) return;
    h(l);
    const x = d(l);
    c.current.style.setProperty("--pagination-primary", l), c.current.style.setProperty("--pagination-primary-hover", u(l, -10)), c.current.style.setProperty("--pagination-primary-light", u(l, 90)), c.current.style.setProperty("--pagination-text-on-primary", x), c.current.style.setProperty("--pagination-focus-outline", l);
    const w = u(l, 30);
    c.current.style.setProperty("--pagination-primary-lighter", w), c.current.style.setProperty("--pagination-text-on-lighter", d(w));
  }, [l]);
  const g = (x, w) => {
    w.preventDefault(), !o && x !== e && x >= 1 && x <= t && n(x);
  }, p = (x) => {
    x.preventDefault(), !o && e > 1 && n(e - 1);
  }, b = (x) => {
    x.preventDefault(), !o && e < t && n(e + 1);
  }, m = () => {
    if (i !== "smart")
      return Array.from({ length: t }, (v, k) => k + 1);
    const x = [], w = 2;
    for (let v = 1; v <= t; v++)
      v === 1 || // always show first page
      v === t || // always show last page
      v >= e - w && v <= e + w ? x.push(v) : x[x.length - 1] !== "..." && x.push("...");
    return x;
  }, y = () => `pagination ${s} pagination-${i}`, _ = m();
  return /* @__PURE__ */ f("div", { className: `pagination-wrapper ${a}`, ref: c, children: /* @__PURE__ */ I("ul", { className: y(), children: [
    r && /* @__PURE__ */ f("li", { children: /* @__PURE__ */ f(
      "a",
      {
        href: "#",
        onClick: p,
        className: `pagination-link ${e === 1 || o ? "disabled" : ""}`,
        "aria-label": "Previous page",
        children: "«"
      }
    ) }),
    _.map((x, w) => /* @__PURE__ */ f("li", { children: x === "..." ? /* @__PURE__ */ f("span", { className: "pagination-ellipsis", "aria-hidden": "true", children: "..." }) : /* @__PURE__ */ f(
      "a",
      {
        href: "#",
        onClick: (v) => g(x, v),
        className: `pagination-link ${e === x ? "active" : ""} ${o ? "disabled" : ""}`,
        "aria-label": `Go to page ${x}`,
        "aria-current": e === x ? "page" : void 0,
        children: x
      }
    ) }, `${x}-${w}`)),
    r && /* @__PURE__ */ f("li", { children: /* @__PURE__ */ f(
      "a",
      {
        href: "#",
        onClick: b,
        className: `pagination-link ${e === t || o ? "disabled" : ""}`,
        "aria-label": "Next page",
        children: "»"
      }
    ) })
  ] }) });
}, Z1 = ({
  theme: e = "pricingcard-light",
  title: t = "Basic Plan",
  price: n = "$9/mo",
  features: s = [],
  className: i = "",
  isPopular: r = !1,
  customClass: a = "",
  color: o = "#667eea",
  // Primary color for theming
  children: l
}) => {
  const c = H(null), h = (p) => {
    const b = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(p);
    return b ? {
      r: parseInt(b[1], 16),
      g: parseInt(b[2], 16),
      b: parseInt(b[3], 16)
    } : null;
  }, d = (p) => {
    const b = h(p);
    return b && (0.299 * b.r + 0.587 * b.g + 0.114 * b.b) / 255 > 0.5 ? "#000000" : "#ffffff";
  }, u = (p, b) => {
    const m = h(p);
    if (!m) return p;
    const y = (_) => {
      const x = _ + (255 - _) * (b / 100);
      return Math.min(255, Math.max(0, Math.round(x)));
    };
    if (b > 0)
      return `#${y(m.r).toString(16).padStart(2, "0")}${y(m.g).toString(16).padStart(2, "0")}${y(m.b).toString(16).padStart(2, "0")}`;
    {
      const _ = (x) => {
        const w = x * (1 + b / 100);
        return Math.min(255, Math.max(0, Math.round(w)));
      };
      return `#${_(m.r).toString(16).padStart(2, "0")}${_(m.g).toString(16).padStart(2, "0")}${_(m.b).toString(16).padStart(2, "0")}`;
    }
  };
  G(() => {
    if (!c.current) return;
    const p = h(o), b = d(o);
    c.current.style.setProperty("--pricing-primary", o), c.current.style.setProperty("--pricing-primary-dark", u(o, -15)), c.current.style.setProperty("--pricing-primary-light", u(o, 95)), c.current.style.setProperty("--pricing-text-on-primary", b);
    const m = u(o, -20);
    c.current.style.setProperty("--pricing-gradient-start", o), c.current.style.setProperty("--pricing-gradient-end", m), c.current.style.setProperty("--pricing-shadow-color", `rgba(${p?.r || 0}, ${p?.g || 0}, ${p?.b || 0}, 0.2)`), c.current.style.setProperty("--pricing-shadow-hover", `rgba(${p?.r || 0}, ${p?.g || 0}, ${p?.b || 0}, 0.4)`);
  }, [o]);
  const g = `pricingcard ${e} ${a} ${r ? "pricingcard-popular" : ""}`.trim();
  return /* @__PURE__ */ I("div", { className: g, ref: c, children: [
    r && /* @__PURE__ */ f("div", { className: "pricingcard-badge", children: "Most Popular" }),
    /* @__PURE__ */ I("div", { className: "pricingcard-content", children: [
      /* @__PURE__ */ I("div", { className: "pricingcard-header", children: [
        /* @__PURE__ */ f("h3", { className: "pricingcard-title", children: t }),
        /* @__PURE__ */ f("h1", { className: "pricingcard-price", children: n })
      ] }),
      s && s.length > 0 && /* @__PURE__ */ f("ul", { className: "pricingcard-features", children: s.map((p, b) => /* @__PURE__ */ f("li", { className: "pricingcard-feature", children: p }, b)) }),
      l
    ] })
  ] });
}, K1 = ({
  type: e = "linear",
  progress: t = 0,
  size: n = "medium",
  variant: s = "progressbar-light",
  showLabel: i = !1,
  label: r = "",
  className: a = "",
  color: o = "#3b82f6",
  // Primary color for theming
  ...l
}) => {
  const c = H(null), h = (m) => {
    const y = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(m);
    return y ? {
      r: parseInt(y[1], 16),
      g: parseInt(y[2], 16),
      b: parseInt(y[3], 16)
    } : null;
  }, d = (m) => {
    const y = h(m);
    return y && (0.299 * y.r + 0.587 * y.g + 0.114 * y.b) / 255 > 0.5 ? "#000000" : "#ffffff";
  }, u = (m, y) => {
    const _ = h(m);
    if (!_) return m;
    const x = (w) => {
      const v = w + (255 - w) * (y / 100);
      return Math.min(255, Math.max(0, Math.round(v)));
    };
    if (y > 0)
      return `#${x(_.r).toString(16).padStart(2, "0")}${x(_.g).toString(16).padStart(2, "0")}${x(_.b).toString(16).padStart(2, "0")}`;
    {
      const w = (v) => {
        const k = v * (1 + y / 100);
        return Math.min(255, Math.max(0, Math.round(k)));
      };
      return `#${w(_.r).toString(16).padStart(2, "0")}${w(_.g).toString(16).padStart(2, "0")}${w(_.b).toString(16).padStart(2, "0")}`;
    }
  };
  G(() => {
    if (!c.current) return;
    h(o);
    const m = d(o);
    c.current.style.setProperty("--progress-color", o), c.current.style.setProperty("--progress-color-dark", u(o, -30)), c.current.style.setProperty("--progress-color-light", u(o, 20)), c.current.style.setProperty("--progress-text-on-color", m), c.current.style.setProperty("--progress-focus-outline", o);
  }, [o]);
  const g = Math.min(Math.max(t, 0), 100), b = `${`progressbar progressbar--${e} progressbar--${n} ${s}`} ${a}`.trim();
  return e === "spinner" ? /* @__PURE__ */ f("div", { className: b, ref: c, ...l, children: /* @__PURE__ */ I("div", { className: "progressbar__spinner", children: [
    /* @__PURE__ */ I("svg", { className: "progressbar__spinner-svg", viewBox: "0 0 50 50", children: [
      /* @__PURE__ */ f(
        "circle",
        {
          className: "progressbar__spinner-track",
          cx: "25",
          cy: "25",
          r: "20",
          fill: "none",
          strokeWidth: "4"
        }
      ),
      /* @__PURE__ */ f(
        "circle",
        {
          className: "progressbar__spinner-fill",
          cx: "25",
          cy: "25",
          r: "20",
          fill: "none",
          strokeWidth: "4",
          strokeDasharray: `${g * 1.26} 126`,
          strokeDashoffset: "0"
        }
      )
    ] }),
    i && /* @__PURE__ */ f("div", { className: "progressbar__label progressbar__label--center", children: r || `${g}%` })
  ] }) }) : /* @__PURE__ */ I("div", { className: b, ref: c, ...l, children: [
    /* @__PURE__ */ f("div", { className: "progressbar__track", children: /* @__PURE__ */ f(
      "div",
      {
        className: "progressbar__fill",
        style: { width: `${g}%` }
      }
    ) }),
    i && /* @__PURE__ */ f("div", { className: "progressbar__label", children: r || `${g}%` })
  ] });
};
/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */
function C0(e) {
  return e + 0.5 | 0;
}
const ge = (e, t, n) => Math.max(Math.min(e, n), t);
function s0(e) {
  return ge(C0(e * 2.55), 0, 255);
}
function ye(e) {
  return ge(C0(e * 255), 0, 255);
}
function oe(e) {
  return ge(C0(e / 2.55) / 100, 0, 1);
}
function Xs(e) {
  return ge(C0(e * 100), 0, 100);
}
const Vt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Zn = [..."0123456789ABCDEF"], Lo = (e) => Zn[e & 15], Eo = (e) => Zn[(e & 240) >> 4] + Zn[e & 15], D0 = (e) => (e & 240) >> 4 === (e & 15), Oo = (e) => D0(e.r) && D0(e.g) && D0(e.b) && D0(e.a);
function zo(e) {
  var t = e.length, n;
  return e[0] === "#" && (t === 4 || t === 5 ? n = {
    r: 255 & Vt[e[1]] * 17,
    g: 255 & Vt[e[2]] * 17,
    b: 255 & Vt[e[3]] * 17,
    a: t === 5 ? Vt[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (n = {
    r: Vt[e[1]] << 4 | Vt[e[2]],
    g: Vt[e[3]] << 4 | Vt[e[4]],
    b: Vt[e[5]] << 4 | Vt[e[6]],
    a: t === 9 ? Vt[e[7]] << 4 | Vt[e[8]] : 255
  })), n;
}
const Fo = (e, t) => e < 255 ? t(e) : "";
function Bo(e) {
  var t = Oo(e) ? Lo : Eo;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + Fo(e.a, t) : void 0;
}
const Ho = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Lr(e, t, n) {
  const s = t * Math.min(n, 1 - n), i = (r, a = (r + e / 30) % 12) => n - s * Math.max(Math.min(a - 3, 9 - a, 1), -1);
  return [i(0), i(8), i(4)];
}
function Vo(e, t, n) {
  const s = (i, r = (i + e / 60) % 6) => n - n * t * Math.max(Math.min(r, 4 - r, 1), 0);
  return [s(5), s(3), s(1)];
}
function Wo(e, t, n) {
  const s = Lr(e, 1, 0.5);
  let i;
  for (t + n > 1 && (i = 1 / (t + n), t *= i, n *= i), i = 0; i < 3; i++)
    s[i] *= 1 - t - n, s[i] += t;
  return s;
}
function jo(e, t, n, s, i) {
  return e === i ? (t - n) / s + (t < n ? 6 : 0) : t === i ? (n - e) / s + 2 : (e - t) / s + 4;
}
function ys(e) {
  const n = e.r / 255, s = e.g / 255, i = e.b / 255, r = Math.max(n, s, i), a = Math.min(n, s, i), o = (r + a) / 2;
  let l, c, h;
  return r !== a && (h = r - a, c = o > 0.5 ? h / (2 - r - a) : h / (r + a), l = jo(n, s, i, h, r), l = l * 60 + 0.5), [l | 0, c || 0, o];
}
function vs(e, t, n, s) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, s)).map(ye);
}
function xs(e, t, n) {
  return vs(Lr, e, t, n);
}
function Yo(e, t, n) {
  return vs(Wo, e, t, n);
}
function Uo(e, t, n) {
  return vs(Vo, e, t, n);
}
function Er(e) {
  return (e % 360 + 360) % 360;
}
function Xo(e) {
  const t = Ho.exec(e);
  let n = 255, s;
  if (!t)
    return;
  t[5] !== s && (n = t[6] ? s0(+t[5]) : ye(+t[5]));
  const i = Er(+t[2]), r = +t[3] / 100, a = +t[4] / 100;
  return t[1] === "hwb" ? s = Yo(i, r, a) : t[1] === "hsv" ? s = Uo(i, r, a) : s = xs(i, r, a), {
    r: s[0],
    g: s[1],
    b: s[2],
    a: n
  };
}
function Go(e, t) {
  var n = ys(e);
  n[0] = Er(n[0] + t), n = xs(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function qo(e) {
  if (!e)
    return;
  const t = ys(e), n = t[0], s = Xs(t[1]), i = Xs(t[2]);
  return e.a < 255 ? `hsla(${n}, ${s}%, ${i}%, ${oe(e.a)})` : `hsl(${n}, ${s}%, ${i}%)`;
}
const Gs = {
  x: "dark",
  Z: "light",
  Y: "re",
  X: "blu",
  W: "gr",
  V: "medium",
  U: "slate",
  A: "ee",
  T: "ol",
  S: "or",
  B: "ra",
  C: "lateg",
  D: "ights",
  R: "in",
  Q: "turquois",
  E: "hi",
  P: "ro",
  O: "al",
  N: "le",
  M: "de",
  L: "yello",
  F: "en",
  K: "ch",
  G: "arks",
  H: "ea",
  I: "ightg",
  J: "wh"
}, qs = {
  OiceXe: "f0f8ff",
  antiquewEte: "faebd7",
  aqua: "ffff",
  aquamarRe: "7fffd4",
  azuY: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "0",
  blanKedOmond: "ffebcd",
  Xe: "ff",
  XeviTet: "8a2be2",
  bPwn: "a52a2a",
  burlywood: "deb887",
  caMtXe: "5f9ea0",
  KartYuse: "7fff00",
  KocTate: "d2691e",
  cSO: "ff7f50",
  cSnflowerXe: "6495ed",
  cSnsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "ffff",
  xXe: "8b",
  xcyan: "8b8b",
  xgTMnPd: "b8860b",
  xWay: "a9a9a9",
  xgYF: "6400",
  xgYy: "a9a9a9",
  xkhaki: "bdb76b",
  xmagFta: "8b008b",
  xTivegYF: "556b2f",
  xSange: "ff8c00",
  xScEd: "9932cc",
  xYd: "8b0000",
  xsOmon: "e9967a",
  xsHgYF: "8fbc8f",
  xUXe: "483d8b",
  xUWay: "2f4f4f",
  xUgYy: "2f4f4f",
  xQe: "ced1",
  xviTet: "9400d3",
  dAppRk: "ff1493",
  dApskyXe: "bfff",
  dimWay: "696969",
  dimgYy: "696969",
  dodgerXe: "1e90ff",
  fiYbrick: "b22222",
  flSOwEte: "fffaf0",
  foYstWAn: "228b22",
  fuKsia: "ff00ff",
  gaRsbSo: "dcdcdc",
  ghostwEte: "f8f8ff",
  gTd: "ffd700",
  gTMnPd: "daa520",
  Way: "808080",
  gYF: "8000",
  gYFLw: "adff2f",
  gYy: "808080",
  honeyMw: "f0fff0",
  hotpRk: "ff69b4",
  RdianYd: "cd5c5c",
  Rdigo: "4b0082",
  ivSy: "fffff0",
  khaki: "f0e68c",
  lavFMr: "e6e6fa",
  lavFMrXsh: "fff0f5",
  lawngYF: "7cfc00",
  NmoncEffon: "fffacd",
  ZXe: "add8e6",
  ZcSO: "f08080",
  Zcyan: "e0ffff",
  ZgTMnPdLw: "fafad2",
  ZWay: "d3d3d3",
  ZgYF: "90ee90",
  ZgYy: "d3d3d3",
  ZpRk: "ffb6c1",
  ZsOmon: "ffa07a",
  ZsHgYF: "20b2aa",
  ZskyXe: "87cefa",
  ZUWay: "778899",
  ZUgYy: "778899",
  ZstAlXe: "b0c4de",
  ZLw: "ffffe0",
  lime: "ff00",
  limegYF: "32cd32",
  lRF: "faf0e6",
  magFta: "ff00ff",
  maPon: "800000",
  VaquamarRe: "66cdaa",
  VXe: "cd",
  VScEd: "ba55d3",
  VpurpN: "9370db",
  VsHgYF: "3cb371",
  VUXe: "7b68ee",
  VsprRggYF: "fa9a",
  VQe: "48d1cc",
  VviTetYd: "c71585",
  midnightXe: "191970",
  mRtcYam: "f5fffa",
  mistyPse: "ffe4e1",
  moccasR: "ffe4b5",
  navajowEte: "ffdead",
  navy: "80",
  Tdlace: "fdf5e6",
  Tive: "808000",
  TivedBb: "6b8e23",
  Sange: "ffa500",
  SangeYd: "ff4500",
  ScEd: "da70d6",
  pOegTMnPd: "eee8aa",
  pOegYF: "98fb98",
  pOeQe: "afeeee",
  pOeviTetYd: "db7093",
  papayawEp: "ffefd5",
  pHKpuff: "ffdab9",
  peru: "cd853f",
  pRk: "ffc0cb",
  plum: "dda0dd",
  powMrXe: "b0e0e6",
  purpN: "800080",
  YbeccapurpN: "663399",
  Yd: "ff0000",
  Psybrown: "bc8f8f",
  PyOXe: "4169e1",
  saddNbPwn: "8b4513",
  sOmon: "fa8072",
  sandybPwn: "f4a460",
  sHgYF: "2e8b57",
  sHshell: "fff5ee",
  siFna: "a0522d",
  silver: "c0c0c0",
  skyXe: "87ceeb",
  UXe: "6a5acd",
  UWay: "708090",
  UgYy: "708090",
  snow: "fffafa",
  sprRggYF: "ff7f",
  stAlXe: "4682b4",
  tan: "d2b48c",
  teO: "8080",
  tEstN: "d8bfd8",
  tomato: "ff6347",
  Qe: "40e0d0",
  viTet: "ee82ee",
  JHt: "f5deb3",
  wEte: "ffffff",
  wEtesmoke: "f5f5f5",
  Lw: "ffff00",
  LwgYF: "9acd32"
};
function Zo() {
  const e = {}, t = Object.keys(qs), n = Object.keys(Gs);
  let s, i, r, a, o;
  for (s = 0; s < t.length; s++) {
    for (a = o = t[s], i = 0; i < n.length; i++)
      r = n[i], o = o.replace(r, Gs[r]);
    r = parseInt(qs[a], 16), e[o] = [r >> 16 & 255, r >> 8 & 255, r & 255];
  }
  return e;
}
let I0;
function Ko(e) {
  I0 || (I0 = Zo(), I0.transparent = [0, 0, 0, 0]);
  const t = I0[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Jo = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Qo(e) {
  const t = Jo.exec(e);
  let n = 255, s, i, r;
  if (t) {
    if (t[7] !== s) {
      const a = +t[7];
      n = t[8] ? s0(a) : ge(a * 255, 0, 255);
    }
    return s = +t[1], i = +t[3], r = +t[5], s = 255 & (t[2] ? s0(s) : ge(s, 0, 255)), i = 255 & (t[4] ? s0(i) : ge(i, 0, 255)), r = 255 & (t[6] ? s0(r) : ge(r, 0, 255)), {
      r: s,
      g: i,
      b: r,
      a: n
    };
  }
}
function tl(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${oe(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Nn = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, ze = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function el(e, t, n) {
  const s = ze(oe(e.r)), i = ze(oe(e.g)), r = ze(oe(e.b));
  return {
    r: ye(Nn(s + n * (ze(oe(t.r)) - s))),
    g: ye(Nn(i + n * (ze(oe(t.g)) - i))),
    b: ye(Nn(r + n * (ze(oe(t.b)) - r))),
    a: e.a + n * (t.a - e.a)
  };
}
function R0(e, t, n) {
  if (e) {
    let s = ys(e);
    s[t] = Math.max(0, Math.min(s[t] + s[t] * n, t === 0 ? 360 : 1)), s = xs(s), e.r = s[0], e.g = s[1], e.b = s[2];
  }
}
function Or(e, t) {
  return e && Object.assign(t || {}, e);
}
function Zs(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = ye(e[3]))) : (t = Or(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = ye(t.a)), t;
}
function nl(e) {
  return e.charAt(0) === "r" ? Qo(e) : Xo(e);
}
let zr = class Kn {
  constructor(t) {
    if (t instanceof Kn)
      return t;
    const n = typeof t;
    let s;
    n === "object" ? s = Zs(t) : n === "string" && (s = zo(t) || Ko(t) || nl(t)), this._rgb = s, this._valid = !!s;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Or(this._rgb);
    return t && (t.a = oe(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Zs(t);
  }
  rgbString() {
    return this._valid ? tl(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Bo(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? qo(this._rgb) : void 0;
  }
  mix(t, n) {
    if (t) {
      const s = this.rgb, i = t.rgb;
      let r;
      const a = n === r ? 0.5 : n, o = 2 * a - 1, l = s.a - i.a, c = ((o * l === -1 ? o : (o + l) / (1 + o * l)) + 1) / 2;
      r = 1 - c, s.r = 255 & c * s.r + r * i.r + 0.5, s.g = 255 & c * s.g + r * i.g + 0.5, s.b = 255 & c * s.b + r * i.b + 0.5, s.a = a * s.a + (1 - a) * i.a, this.rgb = s;
    }
    return this;
  }
  interpolate(t, n) {
    return t && (this._rgb = el(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new Kn(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = ye(t), this;
  }
  clearer(t) {
    const n = this._rgb;
    return n.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, n = C0(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
    return t.r = t.g = t.b = n, this;
  }
  opaquer(t) {
    const n = this._rgb;
    return n.a *= 1 + t, this;
  }
  negate() {
    const t = this._rgb;
    return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this;
  }
  lighten(t) {
    return R0(this._rgb, 2, t), this;
  }
  darken(t) {
    return R0(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return R0(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return R0(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Go(this._rgb, t), this;
  }
};
/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
function se() {
}
const sl = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function it(e) {
  return e == null;
}
function bt(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function rt(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function xt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function Ft(e, t) {
  return xt(e) ? e : t;
}
function et(e, t) {
  return typeof e > "u" ? t : e;
}
const il = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Fr = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function gt(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function ct(e, t, n, s) {
  let i, r, a;
  if (bt(e))
    for (r = e.length, i = 0; i < r; i++)
      t.call(n, e[i], i);
  else if (rt(e))
    for (a = Object.keys(e), r = a.length, i = 0; i < r; i++)
      t.call(n, e[a[i]], a[i]);
}
function en(e, t) {
  let n, s, i, r;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, s = e.length; n < s; ++n)
    if (i = e[n], r = t[n], i.datasetIndex !== r.datasetIndex || i.index !== r.index)
      return !1;
  return !0;
}
function nn(e) {
  if (bt(e))
    return e.map(nn);
  if (rt(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), s = n.length;
    let i = 0;
    for (; i < s; ++i)
      t[n[i]] = nn(e[n[i]]);
    return t;
  }
  return e;
}
function Br(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function rl(e, t, n, s) {
  if (!Br(e))
    return;
  const i = t[e], r = n[e];
  rt(i) && rt(r) ? m0(i, r, s) : t[e] = nn(r);
}
function m0(e, t, n) {
  const s = bt(t) ? t : [
    t
  ], i = s.length;
  if (!rt(e))
    return e;
  n = n || {};
  const r = n.merger || rl;
  let a;
  for (let o = 0; o < i; ++o) {
    if (a = s[o], !rt(a))
      continue;
    const l = Object.keys(a);
    for (let c = 0, h = l.length; c < h; ++c)
      r(l[c], e, a, n);
  }
  return e;
}
function d0(e, t) {
  return m0(e, t, {
    merger: al
  });
}
function al(e, t, n) {
  if (!Br(e))
    return;
  const s = t[e], i = n[e];
  rt(s) && rt(i) ? d0(s, i) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = nn(i));
}
const Ks = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function ol(e) {
  const t = e.split("."), n = [];
  let s = "";
  for (const i of t)
    s += i, s.endsWith("\\") ? s = s.slice(0, -1) + "." : (n.push(s), s = "");
  return n;
}
function ll(e) {
  const t = ol(e);
  return (n) => {
    for (const s of t) {
      if (s === "")
        break;
      n = n && n[s];
    }
    return n;
  };
}
function xe(e, t) {
  return (Ks[t] || (Ks[t] = ll(t)))(e);
}
function _s(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const p0 = (e) => typeof e < "u", _e = (e) => typeof e == "function", Js = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
};
function cl(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const lt = Math.PI, pt = 2 * lt, hl = pt + lt, sn = Number.POSITIVE_INFINITY, dl = lt / 180, wt = lt / 2, Me = lt / 4, Qs = lt * 2 / 3, me = Math.log10, Zt = Math.sign;
function u0(e, t, n) {
  return Math.abs(e - t) < n;
}
function ti(e) {
  const t = Math.round(e);
  e = u0(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(me(e))), s = e / n;
  return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 5 ? 5 : 10) * n;
}
function ul(e) {
  const t = [], n = Math.sqrt(e);
  let s;
  for (s = 1; s < n; s++)
    e % s === 0 && (t.push(s), t.push(e / s));
  return n === (n | 0) && t.push(n), t.sort((i, r) => i - r).pop(), t;
}
function fl(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function Ve(e) {
  return !fl(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function gl(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function Hr(e, t, n) {
  let s, i, r;
  for (s = 0, i = e.length; s < i; s++)
    r = e[s][n], isNaN(r) || (t.min = Math.min(t.min, r), t.max = Math.max(t.max, r));
}
function Yt(e) {
  return e * (lt / 180);
}
function ws(e) {
  return e * (180 / lt);
}
function ei(e) {
  if (!xt(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function Vr(e, t) {
  const n = t.x - e.x, s = t.y - e.y, i = Math.sqrt(n * n + s * s);
  let r = Math.atan2(s, n);
  return r < -0.5 * lt && (r += pt), {
    angle: r,
    distance: i
  };
}
function Jn(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function ml(e, t) {
  return (e - t + hl) % pt - lt;
}
function Tt(e) {
  return (e % pt + pt) % pt;
}
function b0(e, t, n, s) {
  const i = Tt(e), r = Tt(t), a = Tt(n), o = Tt(r - i), l = Tt(a - i), c = Tt(i - r), h = Tt(i - a);
  return i === r || i === a || s && r === a || o > l && c < h;
}
function Ct(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function pl(e) {
  return Ct(e, -32768, 32767);
}
function le(e, t, n, s = 1e-6) {
  return e >= Math.min(t, n) - s && e <= Math.max(t, n) + s;
}
function ks(e, t, n) {
  n = n || ((a) => e[a] < t);
  let s = e.length - 1, i = 0, r;
  for (; s - i > 1; )
    r = i + s >> 1, n(r) ? i = r : s = r;
  return {
    lo: i,
    hi: s
  };
}
const ce = (e, t, n, s) => ks(e, n, s ? (i) => {
  const r = e[i][t];
  return r < n || r === n && e[i + 1][t] === n;
} : (i) => e[i][t] < n), bl = (e, t, n) => ks(e, n, (s) => e[s][t] >= n);
function yl(e, t, n) {
  let s = 0, i = e.length;
  for (; s < i && e[s] < t; )
    s++;
  for (; i > s && e[i - 1] > n; )
    i--;
  return s > 0 || i < e.length ? e.slice(s, i) : e;
}
const Wr = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function vl(e, t) {
  if (e._chartjs) {
    e._chartjs.listeners.push(t);
    return;
  }
  Object.defineProperty(e, "_chartjs", {
    configurable: !0,
    enumerable: !1,
    value: {
      listeners: [
        t
      ]
    }
  }), Wr.forEach((n) => {
    const s = "_onData" + _s(n), i = e[n];
    Object.defineProperty(e, n, {
      configurable: !0,
      enumerable: !1,
      value(...r) {
        const a = i.apply(this, r);
        return e._chartjs.listeners.forEach((o) => {
          typeof o[s] == "function" && o[s](...r);
        }), a;
      }
    });
  });
}
function ni(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const s = n.listeners, i = s.indexOf(t);
  i !== -1 && s.splice(i, 1), !(s.length > 0) && (Wr.forEach((r) => {
    delete e[r];
  }), delete e._chartjs);
}
function jr(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const Yr = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function Ur(e, t) {
  let n = [], s = !1;
  return function(...i) {
    n = i, s || (s = !0, Yr.call(window, () => {
      s = !1, e.apply(t, n);
    }));
  };
}
function xl(e, t) {
  let n;
  return function(...s) {
    return t ? (clearTimeout(n), n = setTimeout(e, t, s)) : e.apply(this, s), t;
  };
}
const Ms = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Pt = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2, _l = (e, t, n, s) => e === (s ? "left" : "right") ? n : e === "center" ? (t + n) / 2 : t;
function Xr(e, t, n) {
  const s = t.length;
  let i = 0, r = s;
  if (e._sorted) {
    const { iScale: a, vScale: o, _parsed: l } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, h = a.axis, { min: d, max: u, minDefined: g, maxDefined: p } = a.getUserBounds();
    if (g) {
      if (i = Math.min(
        // @ts-expect-error Need to type _parsed
        ce(l, h, d).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? s : ce(t, h, a.getPixelForValue(d)).lo
      ), c) {
        const b = l.slice(0, i + 1).reverse().findIndex((m) => !it(m[o.axis]));
        i -= Math.max(0, b);
      }
      i = Ct(i, 0, s - 1);
    }
    if (p) {
      let b = Math.max(
        // @ts-expect-error Need to type _parsed
        ce(l, a.axis, u, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : ce(t, h, a.getPixelForValue(u), !0).hi + 1
      );
      if (c) {
        const m = l.slice(b - 1).findIndex((y) => !it(y[o.axis]));
        b += Math.max(0, m);
      }
      r = Ct(b, i, s) - i;
    } else
      r = s - i;
  }
  return {
    start: i,
    count: r
  };
}
function Gr(e) {
  const { xScale: t, yScale: n, _scaleRanges: s } = e, i = {
    xmin: t.min,
    xmax: t.max,
    ymin: n.min,
    ymax: n.max
  };
  if (!s)
    return e._scaleRanges = i, !0;
  const r = s.xmin !== t.min || s.xmax !== t.max || s.ymin !== n.min || s.ymax !== n.max;
  return Object.assign(s, i), r;
}
const L0 = (e) => e === 0 || e === 1, si = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * pt / n)), ii = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * pt / n) + 1, f0 = {
  linear: (e) => e,
  easeInQuad: (e) => e * e,
  easeOutQuad: (e) => -e * (e - 2),
  easeInOutQuad: (e) => (e /= 0.5) < 1 ? 0.5 * e * e : -0.5 * (--e * (e - 2) - 1),
  easeInCubic: (e) => e * e * e,
  easeOutCubic: (e) => (e -= 1) * e * e + 1,
  easeInOutCubic: (e) => (e /= 0.5) < 1 ? 0.5 * e * e * e : 0.5 * ((e -= 2) * e * e + 2),
  easeInQuart: (e) => e * e * e * e,
  easeOutQuart: (e) => -((e -= 1) * e * e * e - 1),
  easeInOutQuart: (e) => (e /= 0.5) < 1 ? 0.5 * e * e * e * e : -0.5 * ((e -= 2) * e * e * e - 2),
  easeInQuint: (e) => e * e * e * e * e,
  easeOutQuint: (e) => (e -= 1) * e * e * e * e + 1,
  easeInOutQuint: (e) => (e /= 0.5) < 1 ? 0.5 * e * e * e * e * e : 0.5 * ((e -= 2) * e * e * e * e + 2),
  easeInSine: (e) => -Math.cos(e * wt) + 1,
  easeOutSine: (e) => Math.sin(e * wt),
  easeInOutSine: (e) => -0.5 * (Math.cos(lt * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => L0(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => L0(e) ? e : si(e, 0.075, 0.3),
  easeOutElastic: (e) => L0(e) ? e : ii(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return L0(e) ? e : e < 0.5 ? 0.5 * si(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * ii(e * 2 - 1, 0.1125, 0.45);
  },
  easeInBack(e) {
    return e * e * ((1.70158 + 1) * e - 1.70158);
  },
  easeOutBack(e) {
    return (e -= 1) * e * ((1.70158 + 1) * e + 1.70158) + 1;
  },
  easeInOutBack(e) {
    let t = 1.70158;
    return (e /= 0.5) < 1 ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t)) : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  },
  easeInBounce: (e) => 1 - f0.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? f0.easeInBounce(e * 2) * 0.5 : f0.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function Ss(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function ri(e) {
  return Ss(e) ? e : new zr(e);
}
function Pn(e) {
  return Ss(e) ? e : new zr(e).saturate(0.5).darken(0.1).hexString();
}
const wl = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], kl = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Ml(e) {
  e.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
  }), e.describe("animation", {
    _fallback: !1,
    _indexable: !1,
    _scriptable: (t) => t !== "onProgress" && t !== "onComplete" && t !== "fn"
  }), e.set("animations", {
    colors: {
      type: "color",
      properties: kl
    },
    numbers: {
      type: "number",
      properties: wl
    }
  }), e.describe("animations", {
    _fallback: "animation"
  }), e.set("transitions", {
    active: {
      animation: {
        duration: 400
      }
    },
    resize: {
      animation: {
        duration: 0
      }
    },
    show: {
      animations: {
        colors: {
          from: "transparent"
        },
        visible: {
          type: "boolean",
          duration: 0
        }
      }
    },
    hide: {
      animations: {
        colors: {
          to: "transparent"
        },
        visible: {
          type: "boolean",
          easing: "linear",
          fn: (t) => t | 0
        }
      }
    }
  });
}
function Sl(e) {
  e.set("layout", {
    autoPadding: !0,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
const ai = /* @__PURE__ */ new Map();
function Cl(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let s = ai.get(n);
  return s || (s = new Intl.NumberFormat(e, t), ai.set(n, s)), s;
}
function N0(e, t, n) {
  return Cl(t, n).format(e);
}
const qr = {
  values(e) {
    return bt(e) ? e : "" + e;
  },
  numeric(e, t, n) {
    if (e === 0)
      return "0";
    const s = this.chart.options.locale;
    let i, r = e;
    if (n.length > 1) {
      const c = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (c < 1e-4 || c > 1e15) && (i = "scientific"), r = Nl(e, n);
    }
    const a = me(Math.abs(r)), o = isNaN(a) ? 1 : Math.max(Math.min(-1 * Math.floor(a), 20), 0), l = {
      notation: i,
      minimumFractionDigits: o,
      maximumFractionDigits: o
    };
    return Object.assign(l, this.options.ticks.format), N0(e, s, l);
  },
  logarithmic(e, t, n) {
    if (e === 0)
      return "0";
    const s = n[t].significand || e / Math.pow(10, Math.floor(me(e)));
    return [
      1,
      2,
      3,
      5,
      10,
      15
    ].includes(s) || t > 0.8 * n.length ? qr.numeric.call(this, e, t, n) : "";
  }
};
function Nl(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var pn = {
  formatters: qr
};
function Pl(e) {
  e.set("scale", {
    display: !0,
    offset: !1,
    reverse: !1,
    beginAtZero: !1,
    bounds: "ticks",
    clip: !0,
    grace: 0,
    grid: {
      display: !0,
      lineWidth: 1,
      drawOnChartArea: !0,
      drawTicks: !0,
      tickLength: 8,
      tickWidth: (t, n) => n.lineWidth,
      tickColor: (t, n) => n.color,
      offset: !1
    },
    border: {
      display: !0,
      dash: [],
      dashOffset: 0,
      width: 1
    },
    title: {
      display: !1,
      text: "",
      padding: {
        top: 4,
        bottom: 4
      }
    },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: !1,
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 3,
      display: !0,
      autoSkip: !0,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: pn.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: !1,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2
    }
  }), e.route("scale.ticks", "color", "", "color"), e.route("scale.grid", "color", "", "borderColor"), e.route("scale.border", "color", "", "borderColor"), e.route("scale.title", "color", "", "color"), e.describe("scale", {
    _fallback: !1,
    _scriptable: (t) => !t.startsWith("before") && !t.startsWith("after") && t !== "callback" && t !== "parser",
    _indexable: (t) => t !== "borderDash" && t !== "tickBorderDash" && t !== "dash"
  }), e.describe("scales", {
    _fallback: "scale"
  }), e.describe("scale.ticks", {
    _scriptable: (t) => t !== "backdropPadding" && t !== "callback",
    _indexable: (t) => t !== "backdropPadding"
  });
}
const Re = /* @__PURE__ */ Object.create(null), Qn = /* @__PURE__ */ Object.create(null);
function g0(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let s = 0, i = n.length; s < i; ++s) {
    const r = n[s];
    e = e[r] || (e[r] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function Tn(e, t, n) {
  return typeof t == "string" ? m0(g0(e, t), n) : m0(g0(e, ""), t);
}
class Tl {
  constructor(t, n) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (s) => s.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
      "mousemove",
      "mouseout",
      "click",
      "touchstart",
      "touchmove"
    ], this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: "normal",
      lineHeight: 1.2,
      weight: null
    }, this.hover = {}, this.hoverBackgroundColor = (s, i) => Pn(i.backgroundColor), this.hoverBorderColor = (s, i) => Pn(i.borderColor), this.hoverColor = (s, i) => Pn(i.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(n);
  }
  set(t, n) {
    return Tn(this, t, n);
  }
  get(t) {
    return g0(this, t);
  }
  describe(t, n) {
    return Tn(Qn, t, n);
  }
  override(t, n) {
    return Tn(Re, t, n);
  }
  route(t, n, s, i) {
    const r = g0(this, t), a = g0(this, s), o = "_" + n;
    Object.defineProperties(r, {
      [o]: {
        value: r[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const l = this[o], c = a[i];
          return rt(l) ? Object.assign({}, c, l) : et(l, c);
        },
        set(l) {
          this[o] = l;
        }
      }
    });
  }
  apply(t) {
    t.forEach((n) => n(this));
  }
}
var yt = /* @__PURE__ */ new Tl({
  _scriptable: (e) => !e.startsWith("on"),
  _indexable: (e) => e !== "events",
  hover: {
    _fallback: "interaction"
  },
  interaction: {
    _scriptable: !1,
    _indexable: !1
  }
}, [
  Ml,
  Sl,
  Pl
]);
function $l(e) {
  return !e || it(e.size) || it(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function rn(e, t, n, s, i) {
  let r = t[i];
  return r || (r = t[i] = e.measureText(i).width, n.push(i)), r > s && (s = r), s;
}
function Al(e, t, n, s) {
  s = s || {};
  let i = s.data = s.data || {}, r = s.garbageCollect = s.garbageCollect || [];
  s.font !== t && (i = s.data = {}, r = s.garbageCollect = [], s.font = t), e.save(), e.font = t;
  let a = 0;
  const o = n.length;
  let l, c, h, d, u;
  for (l = 0; l < o; l++)
    if (d = n[l], d != null && !bt(d))
      a = rn(e, i, r, a, d);
    else if (bt(d))
      for (c = 0, h = d.length; c < h; c++)
        u = d[c], u != null && !bt(u) && (a = rn(e, i, r, a, u));
  e.restore();
  const g = r.length / 2;
  if (g > n.length) {
    for (l = 0; l < g; l++)
      delete i[r[l]];
    r.splice(0, g);
  }
  return a;
}
function Se(e, t, n) {
  const s = e.currentDevicePixelRatio, i = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - i) * s) / s + i;
}
function oi(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function ts(e, t, n, s) {
  Zr(e, t, n, s, null);
}
function Zr(e, t, n, s, i) {
  let r, a, o, l, c, h, d, u;
  const g = t.pointStyle, p = t.rotation, b = t.radius;
  let m = (p || 0) * dl;
  if (g && typeof g == "object" && (r = g.toString(), r === "[object HTMLImageElement]" || r === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, s), e.rotate(m), e.drawImage(g, -g.width / 2, -g.height / 2, g.width, g.height), e.restore();
    return;
  }
  if (!(isNaN(b) || b <= 0)) {
    switch (e.beginPath(), g) {
      // Default includes circle
      default:
        i ? e.ellipse(n, s, i / 2, b, 0, 0, pt) : e.arc(n, s, b, 0, pt), e.closePath();
        break;
      case "triangle":
        h = i ? i / 2 : b, e.moveTo(n + Math.sin(m) * h, s - Math.cos(m) * b), m += Qs, e.lineTo(n + Math.sin(m) * h, s - Math.cos(m) * b), m += Qs, e.lineTo(n + Math.sin(m) * h, s - Math.cos(m) * b), e.closePath();
        break;
      case "rectRounded":
        c = b * 0.516, l = b - c, a = Math.cos(m + Me) * l, d = Math.cos(m + Me) * (i ? i / 2 - c : l), o = Math.sin(m + Me) * l, u = Math.sin(m + Me) * (i ? i / 2 - c : l), e.arc(n - d, s - o, c, m - lt, m - wt), e.arc(n + u, s - a, c, m - wt, m), e.arc(n + d, s + o, c, m, m + wt), e.arc(n - u, s + a, c, m + wt, m + lt), e.closePath();
        break;
      case "rect":
        if (!p) {
          l = Math.SQRT1_2 * b, h = i ? i / 2 : l, e.rect(n - h, s - l, 2 * h, 2 * l);
          break;
        }
        m += Me;
      /* falls through */
      case "rectRot":
        d = Math.cos(m) * (i ? i / 2 : b), a = Math.cos(m) * b, o = Math.sin(m) * b, u = Math.sin(m) * (i ? i / 2 : b), e.moveTo(n - d, s - o), e.lineTo(n + u, s - a), e.lineTo(n + d, s + o), e.lineTo(n - u, s + a), e.closePath();
        break;
      case "crossRot":
        m += Me;
      /* falls through */
      case "cross":
        d = Math.cos(m) * (i ? i / 2 : b), a = Math.cos(m) * b, o = Math.sin(m) * b, u = Math.sin(m) * (i ? i / 2 : b), e.moveTo(n - d, s - o), e.lineTo(n + d, s + o), e.moveTo(n + u, s - a), e.lineTo(n - u, s + a);
        break;
      case "star":
        d = Math.cos(m) * (i ? i / 2 : b), a = Math.cos(m) * b, o = Math.sin(m) * b, u = Math.sin(m) * (i ? i / 2 : b), e.moveTo(n - d, s - o), e.lineTo(n + d, s + o), e.moveTo(n + u, s - a), e.lineTo(n - u, s + a), m += Me, d = Math.cos(m) * (i ? i / 2 : b), a = Math.cos(m) * b, o = Math.sin(m) * b, u = Math.sin(m) * (i ? i / 2 : b), e.moveTo(n - d, s - o), e.lineTo(n + d, s + o), e.moveTo(n + u, s - a), e.lineTo(n - u, s + a);
        break;
      case "line":
        a = i ? i / 2 : Math.cos(m) * b, o = Math.sin(m) * b, e.moveTo(n - a, s - o), e.lineTo(n + a, s + o);
        break;
      case "dash":
        e.moveTo(n, s), e.lineTo(n + Math.cos(m) * (i ? i / 2 : b), s + Math.sin(m) * b);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function he(e, t, n) {
  return n = n || 0.5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function bn(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function yn(e) {
  e.restore();
}
function Dl(e, t, n, s, i) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (i === "middle") {
    const r = (t.x + n.x) / 2;
    e.lineTo(r, t.y), e.lineTo(r, n.y);
  } else i === "after" != !!s ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
  e.lineTo(n.x, n.y);
}
function Il(e, t, n, s) {
  if (!t)
    return e.lineTo(n.x, n.y);
  e.bezierCurveTo(s ? t.cp1x : t.cp2x, s ? t.cp1y : t.cp2y, s ? n.cp2x : n.cp1x, s ? n.cp2y : n.cp1y, n.x, n.y);
}
function Rl(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), it(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function Ll(e, t, n, s, i) {
  if (i.strikethrough || i.underline) {
    const r = e.measureText(s), a = t - r.actualBoundingBoxLeft, o = t + r.actualBoundingBoxRight, l = n - r.actualBoundingBoxAscent, c = n + r.actualBoundingBoxDescent, h = i.strikethrough ? (l + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = i.decorationWidth || 2, e.moveTo(a, h), e.lineTo(o, h), e.stroke();
  }
}
function El(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function Le(e, t, n, s, i, r = {}) {
  const a = bt(t) ? t : [
    t
  ], o = r.strokeWidth > 0 && r.strokeColor !== "";
  let l, c;
  for (e.save(), e.font = i.string, Rl(e, r), l = 0; l < a.length; ++l)
    c = a[l], r.backdrop && El(e, r.backdrop), o && (r.strokeColor && (e.strokeStyle = r.strokeColor), it(r.strokeWidth) || (e.lineWidth = r.strokeWidth), e.strokeText(c, n, s, r.maxWidth)), e.fillText(c, n, s, r.maxWidth), Ll(e, n, s, c, r), s += Number(i.lineHeight);
  e.restore();
}
function y0(e, t) {
  const { x: n, y: s, w: i, h: r, radius: a } = t;
  e.arc(n + a.topLeft, s + a.topLeft, a.topLeft, 1.5 * lt, lt, !0), e.lineTo(n, s + r - a.bottomLeft), e.arc(n + a.bottomLeft, s + r - a.bottomLeft, a.bottomLeft, lt, wt, !0), e.lineTo(n + i - a.bottomRight, s + r), e.arc(n + i - a.bottomRight, s + r - a.bottomRight, a.bottomRight, wt, 0, !0), e.lineTo(n + i, s + a.topRight), e.arc(n + i - a.topRight, s + a.topRight, a.topRight, 0, -wt, !0), e.lineTo(n + a.topLeft, s);
}
const Ol = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, zl = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Fl(e, t) {
  const n = ("" + e).match(Ol);
  if (!n || n[1] === "normal")
    return t * 1.2;
  switch (e = +n[2], n[3]) {
    case "px":
      return e;
    case "%":
      e /= 100;
      break;
  }
  return t * e;
}
const Bl = (e) => +e || 0;
function Cs(e, t) {
  const n = {}, s = rt(t), i = s ? Object.keys(t) : t, r = rt(e) ? s ? (a) => et(e[a], e[t[a]]) : (a) => e[a] : () => e;
  for (const a of i)
    n[a] = Bl(r(a));
  return n;
}
function Kr(e) {
  return Cs(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Ae(e) {
  return Cs(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function At(e) {
  const t = Kr(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function St(e, t) {
  e = e || {}, t = t || yt.font;
  let n = et(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let s = et(e.style, t.style);
  s && !("" + s).match(zl) && (console.warn('Invalid font style specified: "' + s + '"'), s = void 0);
  const i = {
    family: et(e.family, t.family),
    lineHeight: Fl(et(e.lineHeight, t.lineHeight), n),
    size: n,
    style: s,
    weight: et(e.weight, t.weight),
    string: ""
  };
  return i.string = $l(i), i;
}
function i0(e, t, n, s) {
  let i, r, a;
  for (i = 0, r = e.length; i < r; ++i)
    if (a = e[i], a !== void 0 && a !== void 0)
      return a;
}
function Hl(e, t, n) {
  const { min: s, max: i } = e, r = Fr(t, (i - s) / 2), a = (o, l) => n && o === 0 ? 0 : o + l;
  return {
    min: a(s, -Math.abs(r)),
    max: a(i, r)
  };
}
function we(e, t) {
  return Object.assign(Object.create(e), t);
}
function Ns(e, t = [
  ""
], n, s, i = () => e[0]) {
  const r = n || e;
  typeof s > "u" && (s = ea("_fallback", e));
  const a = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: r,
    _fallback: s,
    _getTarget: i,
    override: (o) => Ns([
      o,
      ...e
    ], t, r, s)
  };
  return new Proxy(a, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(o, l) {
      return delete o[l], delete o._keys, delete e[0][l], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(o, l) {
      return Qr(o, l, () => ql(l, t, e, o));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(o, l) {
      return Reflect.getOwnPropertyDescriptor(o._scopes[0], l);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(e[0]);
    },
    /**
    * A trap for the in operator.
    */
    has(o, l) {
      return ci(o).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(o) {
      return ci(o);
    },
    /**
    * A trap for setting property values.
    */
    set(o, l, c) {
      const h = o._storage || (o._storage = i());
      return o[l] = h[l] = c, delete o._keys, !0;
    }
  });
}
function We(e, t, n, s) {
  const i = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Jr(e, s),
    setContext: (r) => We(e, r, n, s),
    override: (r) => We(e.override(r), t, n, s)
  };
  return new Proxy(i, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(r, a) {
      return delete r[a], delete e[a], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(r, a, o) {
      return Qr(r, a, () => Wl(r, a, o));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(r, a) {
      return r._descriptors.allKeys ? Reflect.has(e, a) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(e, a);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(e);
    },
    /**
    * A trap for the in operator.
    */
    has(r, a) {
      return Reflect.has(e, a);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys() {
      return Reflect.ownKeys(e);
    },
    /**
    * A trap for setting property values.
    */
    set(r, a, o) {
      return e[a] = o, delete r[a], !0;
    }
  });
}
function Jr(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = t.scriptable, _indexable: s = t.indexable, _allKeys: i = t.allKeys } = e;
  return {
    allKeys: i,
    scriptable: n,
    indexable: s,
    isScriptable: _e(n) ? n : () => n,
    isIndexable: _e(s) ? s : () => s
  };
}
const Vl = (e, t) => e ? e + _s(t) : t, Ps = (e, t) => rt(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Qr(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const s = n();
  return e[t] = s, s;
}
function Wl(e, t, n) {
  const { _proxy: s, _context: i, _subProxy: r, _descriptors: a } = e;
  let o = s[t];
  return _e(o) && a.isScriptable(t) && (o = jl(t, o, e, n)), bt(o) && o.length && (o = Yl(t, o, e, a.isIndexable)), Ps(t, o) && (o = We(o, i, r && r[t], a)), o;
}
function jl(e, t, n, s) {
  const { _proxy: i, _context: r, _subProxy: a, _stack: o } = n;
  if (o.has(e))
    throw new Error("Recursion detected: " + Array.from(o).join("->") + "->" + e);
  o.add(e);
  let l = t(r, a || s);
  return o.delete(e), Ps(e, l) && (l = Ts(i._scopes, i, e, l)), l;
}
function Yl(e, t, n, s) {
  const { _proxy: i, _context: r, _subProxy: a, _descriptors: o } = n;
  if (typeof r.index < "u" && s(e))
    return t[r.index % t.length];
  if (rt(t[0])) {
    const l = t, c = i._scopes.filter((h) => h !== l);
    t = [];
    for (const h of l) {
      const d = Ts(c, i, e, h);
      t.push(We(d, r, a && a[e], o));
    }
  }
  return t;
}
function ta(e, t, n) {
  return _e(e) ? e(t, n) : e;
}
const Ul = (e, t) => e === !0 ? t : typeof e == "string" ? xe(t, e) : void 0;
function Xl(e, t, n, s, i) {
  for (const r of t) {
    const a = Ul(n, r);
    if (a) {
      e.add(a);
      const o = ta(a._fallback, n, i);
      if (typeof o < "u" && o !== n && o !== s)
        return o;
    } else if (a === !1 && typeof s < "u" && n !== s)
      return null;
  }
  return !1;
}
function Ts(e, t, n, s) {
  const i = t._rootScopes, r = ta(t._fallback, n, s), a = [
    ...e,
    ...i
  ], o = /* @__PURE__ */ new Set();
  o.add(s);
  let l = li(o, a, n, r || n, s);
  return l === null || typeof r < "u" && r !== n && (l = li(o, a, r, l, s), l === null) ? !1 : Ns(Array.from(o), [
    ""
  ], i, r, () => Gl(t, n, s));
}
function li(e, t, n, s, i) {
  for (; n; )
    n = Xl(e, t, n, s, i);
  return n;
}
function Gl(e, t, n) {
  const s = e._getTarget();
  t in s || (s[t] = {});
  const i = s[t];
  return bt(i) && rt(n) ? n : i || {};
}
function ql(e, t, n, s) {
  let i;
  for (const r of t)
    if (i = ea(Vl(r, e), n), typeof i < "u")
      return Ps(e, i) ? Ts(n, s, e, i) : i;
}
function ea(e, t) {
  for (const n of t) {
    if (!n)
      continue;
    const s = n[e];
    if (typeof s < "u")
      return s;
  }
}
function ci(e) {
  let t = e._keys;
  return t || (t = e._keys = Zl(e._scopes)), t;
}
function Zl(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const s of Object.keys(n).filter((i) => !i.startsWith("_")))
      t.add(s);
  return Array.from(t);
}
function na(e, t, n, s) {
  const { iScale: i } = e, { key: r = "r" } = this._parsing, a = new Array(s);
  let o, l, c, h;
  for (o = 0, l = s; o < l; ++o)
    c = o + n, h = t[c], a[o] = {
      r: i.parse(xe(h, r), c)
    };
  return a;
}
const Kl = Number.EPSILON || 1e-14, je = (e, t) => t < e.length && !e[t].skip && e[t], sa = (e) => e === "x" ? "y" : "x";
function Jl(e, t, n, s) {
  const i = e.skip ? t : e, r = t, a = n.skip ? t : n, o = Jn(r, i), l = Jn(a, r);
  let c = o / (o + l), h = l / (o + l);
  c = isNaN(c) ? 0 : c, h = isNaN(h) ? 0 : h;
  const d = s * c, u = s * h;
  return {
    previous: {
      x: r.x - d * (a.x - i.x),
      y: r.y - d * (a.y - i.y)
    },
    next: {
      x: r.x + u * (a.x - i.x),
      y: r.y + u * (a.y - i.y)
    }
  };
}
function Ql(e, t, n) {
  const s = e.length;
  let i, r, a, o, l, c = je(e, 0);
  for (let h = 0; h < s - 1; ++h)
    if (l = c, c = je(e, h + 1), !(!l || !c)) {
      if (u0(t[h], 0, Kl)) {
        n[h] = n[h + 1] = 0;
        continue;
      }
      i = n[h] / t[h], r = n[h + 1] / t[h], o = Math.pow(i, 2) + Math.pow(r, 2), !(o <= 9) && (a = 3 / Math.sqrt(o), n[h] = i * a * t[h], n[h + 1] = r * a * t[h]);
    }
}
function tc(e, t, n = "x") {
  const s = sa(n), i = e.length;
  let r, a, o, l = je(e, 0);
  for (let c = 0; c < i; ++c) {
    if (a = o, o = l, l = je(e, c + 1), !o)
      continue;
    const h = o[n], d = o[s];
    a && (r = (h - a[n]) / 3, o[`cp1${n}`] = h - r, o[`cp1${s}`] = d - r * t[c]), l && (r = (l[n] - h) / 3, o[`cp2${n}`] = h + r, o[`cp2${s}`] = d + r * t[c]);
  }
}
function ec(e, t = "x") {
  const n = sa(t), s = e.length, i = Array(s).fill(0), r = Array(s);
  let a, o, l, c = je(e, 0);
  for (a = 0; a < s; ++a)
    if (o = l, l = c, c = je(e, a + 1), !!l) {
      if (c) {
        const h = c[t] - l[t];
        i[a] = h !== 0 ? (c[n] - l[n]) / h : 0;
      }
      r[a] = o ? c ? Zt(i[a - 1]) !== Zt(i[a]) ? 0 : (i[a - 1] + i[a]) / 2 : i[a - 1] : i[a];
    }
  Ql(e, i, r), tc(e, r, t);
}
function E0(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function nc(e, t) {
  let n, s, i, r, a, o = he(e[0], t);
  for (n = 0, s = e.length; n < s; ++n)
    a = r, r = o, o = n < s - 1 && he(e[n + 1], t), r && (i = e[n], a && (i.cp1x = E0(i.cp1x, t.left, t.right), i.cp1y = E0(i.cp1y, t.top, t.bottom)), o && (i.cp2x = E0(i.cp2x, t.left, t.right), i.cp2y = E0(i.cp2y, t.top, t.bottom)));
}
function sc(e, t, n, s, i) {
  let r, a, o, l;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    ec(e, i);
  else {
    let c = s ? e[e.length - 1] : e[0];
    for (r = 0, a = e.length; r < a; ++r)
      o = e[r], l = Jl(c, o, e[Math.min(r + 1, a - (s ? 0 : 1)) % a], t.tension), o.cp1x = l.previous.x, o.cp1y = l.previous.y, o.cp2x = l.next.x, o.cp2y = l.next.y, c = o;
  }
  t.capBezierPoints && nc(e, n);
}
function $s() {
  return typeof window < "u" && typeof document < "u";
}
function As(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function an(e, t, n) {
  let s;
  return typeof e == "string" ? (s = parseInt(e, 10), e.indexOf("%") !== -1 && (s = s / 100 * t.parentNode[n])) : s = e, s;
}
const vn = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function ic(e, t) {
  return vn(e).getPropertyValue(t);
}
const rc = [
  "top",
  "right",
  "bottom",
  "left"
];
function De(e, t, n) {
  const s = {};
  n = n ? "-" + n : "";
  for (let i = 0; i < 4; i++) {
    const r = rc[i];
    s[r] = parseFloat(e[t + "-" + r + n]) || 0;
  }
  return s.width = s.left + s.right, s.height = s.top + s.bottom, s;
}
const ac = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function oc(e, t) {
  const n = e.touches, s = n && n.length ? n[0] : e, { offsetX: i, offsetY: r } = s;
  let a = !1, o, l;
  if (ac(i, r, e.target))
    o = i, l = r;
  else {
    const c = t.getBoundingClientRect();
    o = s.clientX - c.left, l = s.clientY - c.top, a = !0;
  }
  return {
    x: o,
    y: l,
    box: a
  };
}
function Pe(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: s } = t, i = vn(n), r = i.boxSizing === "border-box", a = De(i, "padding"), o = De(i, "border", "width"), { x: l, y: c, box: h } = oc(e, n), d = a.left + (h && o.left), u = a.top + (h && o.top);
  let { width: g, height: p } = t;
  return r && (g -= a.width + o.width, p -= a.height + o.height), {
    x: Math.round((l - d) / g * n.width / s),
    y: Math.round((c - u) / p * n.height / s)
  };
}
function lc(e, t, n) {
  let s, i;
  if (t === void 0 || n === void 0) {
    const r = e && As(e);
    if (!r)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const a = r.getBoundingClientRect(), o = vn(r), l = De(o, "border", "width"), c = De(o, "padding");
      t = a.width - c.width - l.width, n = a.height - c.height - l.height, s = an(o.maxWidth, r, "clientWidth"), i = an(o.maxHeight, r, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: s || sn,
    maxHeight: i || sn
  };
}
const pe = (e) => Math.round(e * 10) / 10;
function cc(e, t, n, s) {
  const i = vn(e), r = De(i, "margin"), a = an(i.maxWidth, e, "clientWidth") || sn, o = an(i.maxHeight, e, "clientHeight") || sn, l = lc(e, t, n);
  let { width: c, height: h } = l;
  if (i.boxSizing === "content-box") {
    const u = De(i, "border", "width"), g = De(i, "padding");
    c -= g.width + u.width, h -= g.height + u.height;
  }
  return c = Math.max(0, c - r.width), h = Math.max(0, s ? c / s : h - r.height), c = pe(Math.min(c, a, l.maxWidth)), h = pe(Math.min(h, o, l.maxHeight)), c && !h && (h = pe(c / 2)), (t !== void 0 || n !== void 0) && s && l.height && h > l.height && (h = l.height, c = pe(Math.floor(h * s))), {
    width: c,
    height: h
  };
}
function hi(e, t, n) {
  const s = t || 1, i = pe(e.height * s), r = pe(e.width * s);
  e.height = pe(e.height), e.width = pe(e.width);
  const a = e.canvas;
  return a.style && (n || !a.style.height && !a.style.width) && (a.style.height = `${e.height}px`, a.style.width = `${e.width}px`), e.currentDevicePixelRatio !== s || a.height !== i || a.width !== r ? (e.currentDevicePixelRatio = s, a.height = i, a.width = r, e.ctx.setTransform(s, 0, 0, s, 0, 0), !0) : !1;
}
const hc = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    $s() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function di(e, t) {
  const n = ic(e, t), s = n && n.match(/^(\d+)(\.\d+)?px$/);
  return s ? +s[1] : void 0;
}
function Te(e, t, n, s) {
  return {
    x: e.x + n * (t.x - e.x),
    y: e.y + n * (t.y - e.y)
  };
}
function dc(e, t, n, s) {
  return {
    x: e.x + n * (t.x - e.x),
    y: s === "middle" ? n < 0.5 ? e.y : t.y : s === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
  };
}
function uc(e, t, n, s) {
  const i = {
    x: e.cp2x,
    y: e.cp2y
  }, r = {
    x: t.cp1x,
    y: t.cp1y
  }, a = Te(e, i, n), o = Te(i, r, n), l = Te(r, t, n), c = Te(a, o, n), h = Te(o, l, n);
  return Te(c, h, n);
}
const fc = function(e, t) {
  return {
    x(n) {
      return e + e + t - n;
    },
    setWidth(n) {
      t = n;
    },
    textAlign(n) {
      return n === "center" ? n : n === "right" ? "left" : "right";
    },
    xPlus(n, s) {
      return n - s;
    },
    leftForLtr(n, s) {
      return n - s;
    }
  };
}, gc = function() {
  return {
    x(e) {
      return e;
    },
    setWidth(e) {
    },
    textAlign(e) {
      return e;
    },
    xPlus(e, t) {
      return e + t;
    },
    leftForLtr(e, t) {
      return e;
    }
  };
};
function Be(e, t, n) {
  return e ? fc(t, n) : gc();
}
function ia(e, t) {
  let n, s;
  (t === "ltr" || t === "rtl") && (n = e.canvas.style, s = [
    n.getPropertyValue("direction"),
    n.getPropertyPriority("direction")
  ], n.setProperty("direction", t, "important"), e.prevTextDirection = s);
}
function ra(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function aa(e) {
  return e === "angle" ? {
    between: b0,
    compare: ml,
    normalize: Tt
  } : {
    between: le,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function ui({ start: e, end: t, count: n, loop: s, style: i }) {
  return {
    start: e % n,
    end: t % n,
    loop: s && (t - e + 1) % n === 0,
    style: i
  };
}
function mc(e, t, n) {
  const { property: s, start: i, end: r } = n, { between: a, normalize: o } = aa(s), l = t.length;
  let { start: c, end: h, loop: d } = e, u, g;
  if (d) {
    for (c += l, h += l, u = 0, g = l; u < g && a(o(t[c % l][s]), i, r); ++u)
      c--, h--;
    c %= l, h %= l;
  }
  return h < c && (h += l), {
    start: c,
    end: h,
    loop: d,
    style: e.style
  };
}
function oa(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: s, start: i, end: r } = n, a = t.length, { compare: o, between: l, normalize: c } = aa(s), { start: h, end: d, loop: u, style: g } = mc(e, t, n), p = [];
  let b = !1, m = null, y, _, x;
  const w = () => l(i, x, y) && o(i, x) !== 0, v = () => o(r, y) === 0 || l(r, x, y), k = () => b || w(), M = () => !b || v();
  for (let S = h, N = h; S <= d; ++S)
    _ = t[S % a], !_.skip && (y = c(_[s]), y !== x && (b = l(y, i, r), m === null && k() && (m = o(y, i) === 0 ? S : N), m !== null && M() && (p.push(ui({
      start: m,
      end: S,
      loop: u,
      count: a,
      style: g
    })), m = null), N = S, x = y));
  return m !== null && p.push(ui({
    start: m,
    end: d,
    loop: u,
    count: a,
    style: g
  })), p;
}
function la(e, t) {
  const n = [], s = e.segments;
  for (let i = 0; i < s.length; i++) {
    const r = oa(s[i], e.points, t);
    r.length && n.push(...r);
  }
  return n;
}
function pc(e, t, n, s) {
  let i = 0, r = t - 1;
  if (n && !s)
    for (; i < t && !e[i].skip; )
      i++;
  for (; i < t && e[i].skip; )
    i++;
  for (i %= t, n && (r += i); r > i && e[r % t].skip; )
    r--;
  return r %= t, {
    start: i,
    end: r
  };
}
function bc(e, t, n, s) {
  const i = e.length, r = [];
  let a = t, o = e[t], l;
  for (l = t + 1; l <= n; ++l) {
    const c = e[l % i];
    c.skip || c.stop ? o.skip || (s = !1, r.push({
      start: t % i,
      end: (l - 1) % i,
      loop: s
    }), t = a = c.stop ? l : null) : (a = l, o.skip && (t = l)), o = c;
  }
  return a !== null && r.push({
    start: t % i,
    end: a % i,
    loop: s
  }), r;
}
function yc(e, t) {
  const n = e.points, s = e.options.spanGaps, i = n.length;
  if (!i)
    return [];
  const r = !!e._loop, { start: a, end: o } = pc(n, i, r, s);
  if (s === !0)
    return fi(e, [
      {
        start: a,
        end: o,
        loop: r
      }
    ], n, t);
  const l = o < a ? o + i : o, c = !!e._fullLoop && a === 0 && o === i - 1;
  return fi(e, bc(n, a, l, c), n, t);
}
function fi(e, t, n, s) {
  return !s || !s.setContext || !n ? t : vc(e, t, n, s);
}
function vc(e, t, n, s) {
  const i = e._chart.getContext(), r = gi(e.options), { _datasetIndex: a, options: { spanGaps: o } } = e, l = n.length, c = [];
  let h = r, d = t[0].start, u = d;
  function g(p, b, m, y) {
    const _ = o ? -1 : 1;
    if (p !== b) {
      for (p += l; n[p % l].skip; )
        p -= _;
      for (; n[b % l].skip; )
        b += _;
      p % l !== b % l && (c.push({
        start: p % l,
        end: b % l,
        loop: m,
        style: y
      }), h = y, d = b % l);
    }
  }
  for (const p of t) {
    d = o ? d : p.start;
    let b = n[d % l], m;
    for (u = d + 1; u <= p.end; u++) {
      const y = n[u % l];
      m = gi(s.setContext(we(i, {
        type: "segment",
        p0: b,
        p1: y,
        p0DataIndex: (u - 1) % l,
        p1DataIndex: u % l,
        datasetIndex: a
      }))), xc(m, h) && g(d, u - 1, p.loop, h), b = y, h = m;
    }
    d < u - 1 && g(d, u - 1, p.loop, h);
  }
  return c;
}
function gi(e) {
  return {
    backgroundColor: e.backgroundColor,
    borderCapStyle: e.borderCapStyle,
    borderDash: e.borderDash,
    borderDashOffset: e.borderDashOffset,
    borderJoinStyle: e.borderJoinStyle,
    borderWidth: e.borderWidth,
    borderColor: e.borderColor
  };
}
function xc(e, t) {
  if (!t)
    return !1;
  const n = [], s = function(i, r) {
    return Ss(r) ? (n.includes(r) || n.push(r), n.indexOf(r)) : r;
  };
  return JSON.stringify(e, s) !== JSON.stringify(t, s);
}
function O0(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function _c(e, t) {
  const { xScale: n, yScale: s } = e;
  return n && s ? {
    left: O0(n, t, "left"),
    right: O0(n, t, "right"),
    top: O0(s, t, "top"),
    bottom: O0(s, t, "bottom")
  } : t;
}
function ca(e, t) {
  const n = t._clip;
  if (n.disabled)
    return !1;
  const s = _c(t, e.chartArea);
  return {
    left: n.left === !1 ? 0 : s.left - (n.left === !0 ? 0 : n.left),
    right: n.right === !1 ? e.width : s.right + (n.right === !0 ? 0 : n.right),
    top: n.top === !1 ? 0 : s.top - (n.top === !0 ? 0 : n.top),
    bottom: n.bottom === !1 ? e.height : s.bottom + (n.bottom === !0 ? 0 : n.bottom)
  };
}
/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
class wc {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, n, s, i) {
    const r = n.listeners[i], a = n.duration;
    r.forEach((o) => o({
      chart: t,
      initial: n.initial,
      numSteps: a,
      currentStep: Math.min(s - n.start, a)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = Yr.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let n = 0;
    this._charts.forEach((s, i) => {
      if (!s.running || !s.items.length)
        return;
      const r = s.items;
      let a = r.length - 1, o = !1, l;
      for (; a >= 0; --a)
        l = r[a], l._active ? (l._total > s.duration && (s.duration = l._total), l.tick(t), o = !0) : (r[a] = r[r.length - 1], r.pop());
      o && (i.draw(), this._notify(i, s, t, "progress")), r.length || (s.running = !1, this._notify(i, s, t, "complete"), s.initial = !1), n += r.length;
    }), this._lastDate = t, n === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const n = this._charts;
    let s = n.get(t);
    return s || (s = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, n.set(t, s)), s;
  }
  listen(t, n, s) {
    this._getAnims(t).listeners[n].push(s);
  }
  add(t, n) {
    !n || !n.length || this._getAnims(t).items.push(...n);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const n = this._charts.get(t);
    n && (n.running = !0, n.start = Date.now(), n.duration = n.items.reduce((s, i) => Math.max(s, i._duration), 0), this._refresh());
  }
  running(t) {
    if (!this._running)
      return !1;
    const n = this._charts.get(t);
    return !(!n || !n.running || !n.items.length);
  }
  stop(t) {
    const n = this._charts.get(t);
    if (!n || !n.items.length)
      return;
    const s = n.items;
    let i = s.length - 1;
    for (; i >= 0; --i)
      s[i].cancel();
    n.items = [], this._notify(t, n, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var re = /* @__PURE__ */ new wc();
const mi = "transparent", kc = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const s = ri(e || mi), i = s.valid && ri(t || mi);
    return i && i.valid ? i.mix(s, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class Mc {
  constructor(t, n, s, i) {
    const r = n[s];
    i = i0([
      t.to,
      i,
      r,
      t.from
    ]);
    const a = i0([
      t.from,
      r,
      i
    ]);
    this._active = !0, this._fn = t.fn || kc[t.type || typeof a], this._easing = f0[t.easing] || f0.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = s, this._from = a, this._to = i, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, s) {
    if (this._active) {
      this._notify(!1);
      const i = this._target[this._prop], r = s - this._start, a = this._duration - r;
      this._start = s, this._duration = Math.floor(Math.max(a, t.duration)), this._total += r, this._loop = !!t.loop, this._to = i0([
        t.to,
        n,
        i,
        t.from
      ]), this._from = i0([
        t.from,
        i,
        n
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const n = t - this._start, s = this._duration, i = this._prop, r = this._from, a = this._loop, o = this._to;
    let l;
    if (this._active = r !== o && (a || n < s), !this._active) {
      this._target[i] = o, this._notify(!0);
      return;
    }
    if (n < 0) {
      this._target[i] = r;
      return;
    }
    l = n / s % 2, l = a && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[i] = this._fn(r, o, l);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((n, s) => {
      t.push({
        res: n,
        rej: s
      });
    });
  }
  _notify(t) {
    const n = t ? "res" : "rej", s = this._promises || [];
    for (let i = 0; i < s.length; i++)
      s[i][n]();
  }
}
class ha {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!rt(t))
      return;
    const n = Object.keys(yt.animation), s = this._properties;
    Object.getOwnPropertyNames(t).forEach((i) => {
      const r = t[i];
      if (!rt(r))
        return;
      const a = {};
      for (const o of n)
        a[o] = r[o];
      (bt(r.properties) && r.properties || [
        i
      ]).forEach((o) => {
        (o === i || !s.has(o)) && s.set(o, a);
      });
    });
  }
  _animateOptions(t, n) {
    const s = n.options, i = Cc(t, s);
    if (!i)
      return [];
    const r = this._createAnimations(i, s);
    return s.$shared && Sc(t.options.$animations, s).then(() => {
      t.options = s;
    }, () => {
    }), r;
  }
  _createAnimations(t, n) {
    const s = this._properties, i = [], r = t.$animations || (t.$animations = {}), a = Object.keys(n), o = Date.now();
    let l;
    for (l = a.length - 1; l >= 0; --l) {
      const c = a[l];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        i.push(...this._animateOptions(t, n));
        continue;
      }
      const h = n[c];
      let d = r[c];
      const u = s.get(c);
      if (d)
        if (u && d.active()) {
          d.update(u, h, o);
          continue;
        } else
          d.cancel();
      if (!u || !u.duration) {
        t[c] = h;
        continue;
      }
      r[c] = d = new Mc(u, t, c, h), i.push(d);
    }
    return i;
  }
  update(t, n) {
    if (this._properties.size === 0) {
      Object.assign(t, n);
      return;
    }
    const s = this._createAnimations(t, n);
    if (s.length)
      return re.add(this._chart, s), !0;
  }
}
function Sc(e, t) {
  const n = [], s = Object.keys(t);
  for (let i = 0; i < s.length; i++) {
    const r = e[s[i]];
    r && r.active() && n.push(r.wait());
  }
  return Promise.all(n);
}
function Cc(e, t) {
  if (!t)
    return;
  let n = e.options;
  if (!n) {
    e.options = t;
    return;
  }
  return n.$shared && (e.options = n = Object.assign({}, n, {
    $shared: !1,
    $animations: {}
  })), n;
}
function pi(e, t) {
  const n = e && e.options || {}, s = n.reverse, i = n.min === void 0 ? t : 0, r = n.max === void 0 ? t : 0;
  return {
    start: s ? r : i,
    end: s ? i : r
  };
}
function Nc(e, t, n) {
  if (n === !1)
    return !1;
  const s = pi(e, n), i = pi(t, n);
  return {
    top: i.end,
    right: s.end,
    bottom: i.start,
    left: s.start
  };
}
function Pc(e) {
  let t, n, s, i;
  return rt(e) ? (t = e.top, n = e.right, s = e.bottom, i = e.left) : t = n = s = i = e, {
    top: t,
    right: n,
    bottom: s,
    left: i,
    disabled: e === !1
  };
}
function da(e, t) {
  const n = [], s = e._getSortedDatasetMetas(t);
  let i, r;
  for (i = 0, r = s.length; i < r; ++i)
    n.push(s[i].index);
  return n;
}
function bi(e, t, n, s = {}) {
  const i = e.keys, r = s.mode === "single";
  let a, o, l, c;
  if (t === null)
    return;
  let h = !1;
  for (a = 0, o = i.length; a < o; ++a) {
    if (l = +i[a], l === n) {
      if (h = !0, s.all)
        continue;
      break;
    }
    c = e.values[l], xt(c) && (r || t === 0 || Zt(t) === Zt(c)) && (t += c);
  }
  return !h && !s.all ? 0 : t;
}
function Tc(e, t) {
  const { iScale: n, vScale: s } = t, i = n.axis === "x" ? "x" : "y", r = s.axis === "x" ? "x" : "y", a = Object.keys(e), o = new Array(a.length);
  let l, c, h;
  for (l = 0, c = a.length; l < c; ++l)
    h = a[l], o[l] = {
      [i]: h,
      [r]: e[h]
    };
  return o;
}
function $n(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function $c(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function Ac(e) {
  const { min: t, max: n, minDefined: s, maxDefined: i } = e.getUserBounds();
  return {
    min: s ? t : Number.NEGATIVE_INFINITY,
    max: i ? n : Number.POSITIVE_INFINITY
  };
}
function Dc(e, t, n) {
  const s = e[t] || (e[t] = {});
  return s[n] || (s[n] = {});
}
function yi(e, t, n, s) {
  for (const i of t.getMatchingVisibleMetas(s).reverse()) {
    const r = e[i.index];
    if (n && r > 0 || !n && r < 0)
      return i.index;
  }
  return null;
}
function vi(e, t) {
  const { chart: n, _cachedMeta: s } = e, i = n._stacks || (n._stacks = {}), { iScale: r, vScale: a, index: o } = s, l = r.axis, c = a.axis, h = $c(r, a, s), d = t.length;
  let u;
  for (let g = 0; g < d; ++g) {
    const p = t[g], { [l]: b, [c]: m } = p, y = p._stacks || (p._stacks = {});
    u = y[c] = Dc(i, h, b), u[o] = m, u._top = yi(u, a, !0, s.type), u._bottom = yi(u, a, !1, s.type);
    const _ = u._visualValues || (u._visualValues = {});
    _[o] = m;
  }
}
function An(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((s) => n[s].axis === t).shift();
}
function Ic(e, t) {
  return we(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Rc(e, t, n) {
  return we(e, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: n,
    index: t,
    mode: "default",
    type: "data"
  });
}
function Ze(e, t) {
  const n = e.controller.index, s = e.vScale && e.vScale.axis;
  if (s) {
    t = t || e._parsed;
    for (const i of t) {
      const r = i._stacks;
      if (!r || r[s] === void 0 || r[s][n] === void 0)
        return;
      delete r[s][n], r[s]._visualValues !== void 0 && r[s]._visualValues[n] !== void 0 && delete r[s]._visualValues[n];
    }
  }
}
const Dn = (e) => e === "reset" || e === "none", xi = (e, t) => t ? e : Object.assign({}, e), Lc = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: da(n, !0),
  values: null
};
class ke {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, n) {
    this.chart = t, this._ctx = t.ctx, this.index = n, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = $n(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && Ze(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, s = this.getDataset(), i = (d, u, g, p) => d === "x" ? u : d === "r" ? p : g, r = n.xAxisID = et(s.xAxisID, An(t, "x")), a = n.yAxisID = et(s.yAxisID, An(t, "y")), o = n.rAxisID = et(s.rAxisID, An(t, "r")), l = n.indexAxis, c = n.iAxisID = i(l, r, a, o), h = n.vAxisID = i(l, a, r, o);
    n.xScale = this.getScaleForId(r), n.yScale = this.getScaleForId(a), n.rScale = this.getScaleForId(o), n.iScale = this.getScaleForId(c), n.vScale = this.getScaleForId(h);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(t) {
    return this.chart.scales[t];
  }
  _getOtherScale(t) {
    const n = this._cachedMeta;
    return t === n.iScale ? n.vScale : n.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const t = this._cachedMeta;
    this._data && ni(this._data, this), t._stacked && Ze(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), s = this._data;
    if (rt(n)) {
      const i = this._cachedMeta;
      this._data = Tc(n, i);
    } else if (s !== n) {
      if (s) {
        ni(s, this);
        const i = this._cachedMeta;
        Ze(i), i._parsed = [];
      }
      n && Object.isExtensible(n) && vl(n, this), this._syncList = [], this._data = n;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const n = this._cachedMeta, s = this.getDataset();
    let i = !1;
    this._dataCheck();
    const r = n._stacked;
    n._stacked = $n(n.vScale, n), n.stack !== s.stack && (i = !0, Ze(n), n.stack = s.stack), this._resyncElements(t), (i || r !== n._stacked) && (vi(this, n._parsed), n._stacked = $n(n.vScale, n));
  }
  configure() {
    const t = this.chart.config, n = t.datasetScopeKeys(this._type), s = t.getOptionScopes(this.getDataset(), n, !0);
    this.options = t.createResolver(s, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, n) {
    const { _cachedMeta: s, _data: i } = this, { iScale: r, _stacked: a } = s, o = r.axis;
    let l = t === 0 && n === i.length ? !0 : s._sorted, c = t > 0 && s._parsed[t - 1], h, d, u;
    if (this._parsing === !1)
      s._parsed = i, s._sorted = !0, u = i;
    else {
      bt(i[t]) ? u = this.parseArrayData(s, i, t, n) : rt(i[t]) ? u = this.parseObjectData(s, i, t, n) : u = this.parsePrimitiveData(s, i, t, n);
      const g = () => d[o] === null || c && d[o] < c[o];
      for (h = 0; h < n; ++h)
        s._parsed[h + t] = d = u[h], l && (g() && (l = !1), c = d);
      s._sorted = l;
    }
    a && vi(this, u);
  }
  parsePrimitiveData(t, n, s, i) {
    const { iScale: r, vScale: a } = t, o = r.axis, l = a.axis, c = r.getLabels(), h = r === a, d = new Array(i);
    let u, g, p;
    for (u = 0, g = i; u < g; ++u)
      p = u + s, d[u] = {
        [o]: h || r.parse(c[p], p),
        [l]: a.parse(n[p], p)
      };
    return d;
  }
  parseArrayData(t, n, s, i) {
    const { xScale: r, yScale: a } = t, o = new Array(i);
    let l, c, h, d;
    for (l = 0, c = i; l < c; ++l)
      h = l + s, d = n[h], o[l] = {
        x: r.parse(d[0], h),
        y: a.parse(d[1], h)
      };
    return o;
  }
  parseObjectData(t, n, s, i) {
    const { xScale: r, yScale: a } = t, { xAxisKey: o = "x", yAxisKey: l = "y" } = this._parsing, c = new Array(i);
    let h, d, u, g;
    for (h = 0, d = i; h < d; ++h)
      u = h + s, g = n[u], c[h] = {
        x: r.parse(xe(g, o), u),
        y: a.parse(xe(g, l), u)
      };
    return c;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, n, s) {
    const i = this.chart, r = this._cachedMeta, a = n[t.axis], o = {
      keys: da(i, !0),
      values: n._stacks[t.axis]._visualValues
    };
    return bi(o, a, r.index, {
      mode: s
    });
  }
  updateRangeFromParsed(t, n, s, i) {
    const r = s[n.axis];
    let a = r === null ? NaN : r;
    const o = i && s._stacks[n.axis];
    i && o && (i.values = o, a = bi(i, r, this._cachedMeta.index)), t.min = Math.min(t.min, a), t.max = Math.max(t.max, a);
  }
  getMinMax(t, n) {
    const s = this._cachedMeta, i = s._parsed, r = s._sorted && t === s.iScale, a = i.length, o = this._getOtherScale(t), l = Lc(n, s, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: h, max: d } = Ac(o);
    let u, g;
    function p() {
      g = i[u];
      const b = g[o.axis];
      return !xt(g[t.axis]) || h > b || d < b;
    }
    for (u = 0; u < a && !(!p() && (this.updateRangeFromParsed(c, t, g, l), r)); ++u)
      ;
    if (r) {
      for (u = a - 1; u >= 0; --u)
        if (!p()) {
          this.updateRangeFromParsed(c, t, g, l);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const n = this._cachedMeta._parsed, s = [];
    let i, r, a;
    for (i = 0, r = n.length; i < r; ++i)
      a = n[i][t.axis], xt(a) && s.push(a);
    return s;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, s = n.iScale, i = n.vScale, r = this.getParsed(t);
    return {
      label: s ? "" + s.getLabelForValue(r[s.axis]) : "",
      value: i ? "" + i.getLabelForValue(r[i.axis]) : ""
    };
  }
  _update(t) {
    const n = this._cachedMeta;
    this.update(t || "default"), n._clip = Pc(et(this.options.clip, Nc(n.xScale, n.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, n = this.chart, s = this._cachedMeta, i = s.data || [], r = n.chartArea, a = [], o = this._drawStart || 0, l = this._drawCount || i.length - o, c = this.options.drawActiveElementsOnTop;
    let h;
    for (s.dataset && s.dataset.draw(t, r, o, l), h = o; h < o + l; ++h) {
      const d = i[h];
      d.hidden || (d.active && c ? a.push(d) : d.draw(t, r));
    }
    for (h = 0; h < a.length; ++h)
      a[h].draw(t, r);
  }
  getStyle(t, n) {
    const s = n ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(s) : this.resolveDataElementOptions(t || 0, s);
  }
  getContext(t, n, s) {
    const i = this.getDataset();
    let r;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const a = this._cachedMeta.data[t];
      r = a.$context || (a.$context = Rc(this.getContext(), t, a)), r.parsed = this.getParsed(t), r.raw = i.data[t], r.index = r.dataIndex = t;
    } else
      r = this.$context || (this.$context = Ic(this.chart.getContext(), this.index)), r.dataset = i, r.index = r.datasetIndex = this.index;
    return r.active = !!n, r.mode = s, r;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, t);
  }
  _resolveElementOptions(t, n = "default", s) {
    const i = n === "active", r = this._cachedDataOpts, a = t + "-" + n, o = r[a], l = this.enableOptionSharing && p0(s);
    if (o)
      return xi(o, l);
    const c = this.chart.config, h = c.datasetElementScopeKeys(this._type, t), d = i ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], u = c.getOptionScopes(this.getDataset(), h), g = Object.keys(yt.elements[t]), p = () => this.getContext(s, i, n), b = c.resolveNamedOptions(u, g, p, d);
    return b.$shared && (b.$shared = l, r[a] = Object.freeze(xi(b, l))), b;
  }
  _resolveAnimations(t, n, s) {
    const i = this.chart, r = this._cachedDataOpts, a = `animation-${n}`, o = r[a];
    if (o)
      return o;
    let l;
    if (i.options.animation !== !1) {
      const h = this.chart.config, d = h.datasetAnimationScopeKeys(this._type, n), u = h.getOptionScopes(this.getDataset(), d);
      l = h.createResolver(u, this.getContext(t, s, n));
    }
    const c = new ha(i, l && l.animations);
    return l && l._cacheable && (r[a] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || Dn(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const s = this.resolveDataElementOptions(t, n), i = this._sharedOptions, r = this.getSharedOptions(s), a = this.includeOptions(n, r) || r !== i;
    return this.updateSharedOptions(r, n, s), {
      sharedOptions: r,
      includeOptions: a
    };
  }
  updateElement(t, n, s, i) {
    Dn(i) ? Object.assign(t, s) : this._resolveAnimations(n, i).update(t, s);
  }
  updateSharedOptions(t, n, s) {
    t && !Dn(n) && this._resolveAnimations(void 0, n).update(t, s);
  }
  _setStyle(t, n, s, i) {
    t.active = i;
    const r = this.getStyle(n, i);
    this._resolveAnimations(n, s, i).update(t, {
      options: !i && this.getSharedOptions(r) || r
    });
  }
  removeHoverStyle(t, n, s) {
    this._setStyle(t, s, "active", !1);
  }
  setHoverStyle(t, n, s) {
    this._setStyle(t, s, "active", !0);
  }
  _removeDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !1);
  }
  _setDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !0);
  }
  _resyncElements(t) {
    const n = this._data, s = this._cachedMeta.data;
    for (const [o, l, c] of this._syncList)
      this[o](l, c);
    this._syncList = [];
    const i = s.length, r = n.length, a = Math.min(r, i);
    a && this.parse(0, a), r > i ? this._insertElements(i, r - i, t) : r < i && this._removeElements(r, i - r);
  }
  _insertElements(t, n, s = !0) {
    const i = this._cachedMeta, r = i.data, a = t + n;
    let o;
    const l = (c) => {
      for (c.length += n, o = c.length - 1; o >= a; o--)
        c[o] = c[o - n];
    };
    for (l(r), o = t; o < a; ++o)
      r[o] = new this.dataElementType();
    this._parsing && l(i._parsed), this.parse(t, n), s && this.updateElements(r, t, n, "reset");
  }
  updateElements(t, n, s, i) {
  }
  _removeElements(t, n) {
    const s = this._cachedMeta;
    if (this._parsing) {
      const i = s._parsed.splice(t, n);
      s._stacked && Ze(s, i);
    }
    s.data.splice(t, n);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [n, s, i] = t;
      this[n](s, i);
    }
    this.chart._dataChanges.push([
      this.index,
      ...t
    ]);
  }
  _onDataPush() {
    const t = arguments.length;
    this._sync([
      "_insertElements",
      this.getDataset().data.length - t,
      t
    ]);
  }
  _onDataPop() {
    this._sync([
      "_removeElements",
      this._cachedMeta.data.length - 1,
      1
    ]);
  }
  _onDataShift() {
    this._sync([
      "_removeElements",
      0,
      1
    ]);
  }
  _onDataSplice(t, n) {
    n && this._sync([
      "_removeElements",
      t,
      n
    ]);
    const s = arguments.length - 2;
    s && this._sync([
      "_insertElements",
      t,
      s
    ]);
  }
  _onDataUnshift() {
    this._sync([
      "_insertElements",
      0,
      arguments.length
    ]);
  }
}
function Ec(e, t) {
  if (!e._cache.$bar) {
    const n = e.getMatchingVisibleMetas(t);
    let s = [];
    for (let i = 0, r = n.length; i < r; i++)
      s = s.concat(n[i].controller.getAllParsedValues(e));
    e._cache.$bar = jr(s.sort((i, r) => i - r));
  }
  return e._cache.$bar;
}
function Oc(e) {
  const t = e.iScale, n = Ec(t, e.type);
  let s = t._length, i, r, a, o;
  const l = () => {
    a === 32767 || a === -32768 || (p0(o) && (s = Math.min(s, Math.abs(a - o) || s)), o = a);
  };
  for (i = 0, r = n.length; i < r; ++i)
    a = t.getPixelForValue(n[i]), l();
  for (o = void 0, i = 0, r = t.ticks.length; i < r; ++i)
    a = t.getPixelForTick(i), l();
  return s;
}
function zc(e, t, n, s) {
  const i = n.barThickness;
  let r, a;
  return it(i) ? (r = t.min * n.categoryPercentage, a = n.barPercentage) : (r = i * s, a = 1), {
    chunk: r / s,
    ratio: a,
    start: t.pixels[e] - r / 2
  };
}
function Fc(e, t, n, s) {
  const i = t.pixels, r = i[e];
  let a = e > 0 ? i[e - 1] : null, o = e < i.length - 1 ? i[e + 1] : null;
  const l = n.categoryPercentage;
  a === null && (a = r - (o === null ? t.end - t.start : o - r)), o === null && (o = r + r - a);
  const c = r - (r - Math.min(a, o)) / 2 * l;
  return {
    chunk: Math.abs(o - a) / 2 * l / s,
    ratio: n.barPercentage,
    start: c
  };
}
function Bc(e, t, n, s) {
  const i = n.parse(e[0], s), r = n.parse(e[1], s), a = Math.min(i, r), o = Math.max(i, r);
  let l = a, c = o;
  Math.abs(a) > Math.abs(o) && (l = o, c = a), t[n.axis] = c, t._custom = {
    barStart: l,
    barEnd: c,
    start: i,
    end: r,
    min: a,
    max: o
  };
}
function ua(e, t, n, s) {
  return bt(e) ? Bc(e, t, n, s) : t[n.axis] = n.parse(e, s), t;
}
function _i(e, t, n, s) {
  const i = e.iScale, r = e.vScale, a = i.getLabels(), o = i === r, l = [];
  let c, h, d, u;
  for (c = n, h = n + s; c < h; ++c)
    u = t[c], d = {}, d[i.axis] = o || i.parse(a[c], c), l.push(ua(u, d, r, c));
  return l;
}
function In(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function Hc(e, t, n) {
  return e !== 0 ? Zt(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1);
}
function Vc(e) {
  let t, n, s, i, r;
  return e.horizontal ? (t = e.base > e.x, n = "left", s = "right") : (t = e.base < e.y, n = "bottom", s = "top"), t ? (i = "end", r = "start") : (i = "start", r = "end"), {
    start: n,
    end: s,
    reverse: t,
    top: i,
    bottom: r
  };
}
function Wc(e, t, n, s) {
  let i = t.borderSkipped;
  const r = {};
  if (!i) {
    e.borderSkipped = r;
    return;
  }
  if (i === !0) {
    e.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: a, end: o, reverse: l, top: c, bottom: h } = Vc(e);
  i === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === s ? i = c : (n._bottom || 0) === s ? i = h : (r[wi(h, a, o, l)] = !0, i = c)), r[wi(i, a, o, l)] = !0, e.borderSkipped = r;
}
function wi(e, t, n, s) {
  return s ? (e = jc(e, t, n), e = ki(e, n, t)) : e = ki(e, t, n), e;
}
function jc(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function ki(e, t, n) {
  return e === "start" ? t : e === "end" ? n : e;
}
function Yc(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === "auto" ? n === 1 ? 0.33 : 0 : t;
}
class Uc extends ke {
  static id = "bar";
  static defaults = {
    datasetElementType: !1,
    dataElementType: "bar",
    categoryPercentage: 0.8,
    barPercentage: 0.9,
    grouped: !0,
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "base",
          "width",
          "height"
        ]
      }
    }
  };
  static overrides = {
    scales: {
      _index_: {
        type: "category",
        offset: !0,
        grid: {
          offset: !0
        }
      },
      _value_: {
        type: "linear",
        beginAtZero: !0
      }
    }
  };
  parsePrimitiveData(t, n, s, i) {
    return _i(t, n, s, i);
  }
  parseArrayData(t, n, s, i) {
    return _i(t, n, s, i);
  }
  parseObjectData(t, n, s, i) {
    const { iScale: r, vScale: a } = t, { xAxisKey: o = "x", yAxisKey: l = "y" } = this._parsing, c = r.axis === "x" ? o : l, h = a.axis === "x" ? o : l, d = [];
    let u, g, p, b;
    for (u = s, g = s + i; u < g; ++u)
      b = n[u], p = {}, p[r.axis] = r.parse(xe(b, c), u), d.push(ua(xe(b, h), p, a, u));
    return d;
  }
  updateRangeFromParsed(t, n, s, i) {
    super.updateRangeFromParsed(t, n, s, i);
    const r = s._custom;
    r && n === this._cachedMeta.vScale && (t.min = Math.min(t.min, r.min), t.max = Math.max(t.max, r.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, { iScale: s, vScale: i } = n, r = this.getParsed(t), a = r._custom, o = In(a) ? "[" + a.start + ", " + a.end + "]" : "" + i.getLabelForValue(r[i.axis]);
    return {
      label: "" + s.getLabelForValue(r[s.axis]),
      value: o
    };
  }
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
    const t = this._cachedMeta;
    t.stack = this.getDataset().stack;
  }
  update(t) {
    const n = this._cachedMeta;
    this.updateElements(n.data, 0, n.data.length, t);
  }
  updateElements(t, n, s, i) {
    const r = i === "reset", { index: a, _cachedMeta: { vScale: o } } = this, l = o.getBasePixel(), c = o.isHorizontal(), h = this._getRuler(), { sharedOptions: d, includeOptions: u } = this._getSharedOptions(n, i);
    for (let g = n; g < n + s; g++) {
      const p = this.getParsed(g), b = r || it(p[o.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(g), m = this._calculateBarIndexPixels(g, h), y = (p._stacks || {})[o.axis], _ = {
        horizontal: c,
        base: b.base,
        enableBorderRadius: !y || In(p._custom) || a === y._top || a === y._bottom,
        x: c ? b.head : m.center,
        y: c ? m.center : b.head,
        height: c ? m.size : Math.abs(b.size),
        width: c ? Math.abs(b.size) : m.size
      };
      u && (_.options = d || this.resolveDataElementOptions(g, t[g].active ? "active" : i));
      const x = _.options || t[g].options;
      Wc(_, x, y, a), Yc(_, x, h.ratio), this.updateElement(t[g], g, _, i);
    }
  }
  _getStacks(t, n) {
    const { iScale: s } = this._cachedMeta, i = s.getMatchingVisibleMetas(this._type).filter((h) => h.controller.options.grouped), r = s.options.stacked, a = [], o = this._cachedMeta.controller.getParsed(n), l = o && o[s.axis], c = (h) => {
      const d = h._parsed.find((g) => g[s.axis] === l), u = d && d[h.vScale.axis];
      if (it(u) || isNaN(u))
        return !0;
    };
    for (const h of i)
      if (!(n !== void 0 && c(h)) && ((r === !1 || a.indexOf(h.stack) === -1 || r === void 0 && h.stack === void 0) && a.push(h.stack), h.index === t))
        break;
    return a.length || a.push(void 0), a;
  }
  _getStackCount(t) {
    return this._getStacks(void 0, t).length;
  }
  _getAxisCount() {
    return this._getAxis().length;
  }
  getFirstScaleIdForIndexAxis() {
    const t = this.chart.scales, n = this.chart.options.indexAxis;
    return Object.keys(t).filter((s) => t[s].axis === n).shift();
  }
  _getAxis() {
    const t = {}, n = this.getFirstScaleIdForIndexAxis();
    for (const s of this.chart.data.datasets)
      t[et(this.chart.options.indexAxis === "x" ? s.xAxisID : s.yAxisID, n)] = !0;
    return Object.keys(t);
  }
  _getStackIndex(t, n, s) {
    const i = this._getStacks(t, s), r = n !== void 0 ? i.indexOf(n) : -1;
    return r === -1 ? i.length - 1 : r;
  }
  _getRuler() {
    const t = this.options, n = this._cachedMeta, s = n.iScale, i = [];
    let r, a;
    for (r = 0, a = n.data.length; r < a; ++r)
      i.push(s.getPixelForValue(this.getParsed(r)[s.axis], r));
    const o = t.barThickness;
    return {
      min: o || Oc(n),
      pixels: i,
      start: s._startPixel,
      end: s._endPixel,
      stackCount: this._getStackCount(),
      scale: s,
      grouped: t.grouped,
      ratio: o ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: n, _stacked: s, index: i }, options: { base: r, minBarLength: a } } = this, o = r || 0, l = this.getParsed(t), c = l._custom, h = In(c);
    let d = l[n.axis], u = 0, g = s ? this.applyStack(n, l, s) : d, p, b;
    g !== d && (u = g - d, g = d), h && (d = c.barStart, g = c.barEnd - c.barStart, d !== 0 && Zt(d) !== Zt(c.barEnd) && (u = 0), u += d);
    const m = !it(r) && !h ? r : u;
    let y = n.getPixelForValue(m);
    if (this.chart.getDataVisibility(t) ? p = n.getPixelForValue(u + g) : p = y, b = p - y, Math.abs(b) < a) {
      b = Hc(b, n, o) * a, d === o && (y -= b / 2);
      const _ = n.getPixelForDecimal(0), x = n.getPixelForDecimal(1), w = Math.min(_, x), v = Math.max(_, x);
      y = Math.max(Math.min(y, v), w), p = y + b, s && !h && (l._stacks[n.axis]._visualValues[i] = n.getValueForPixel(p) - n.getValueForPixel(y));
    }
    if (y === n.getPixelForValue(o)) {
      const _ = Zt(b) * n.getLineWidthForValue(o) / 2;
      y += _, b -= _;
    }
    return {
      size: b,
      base: y,
      head: p,
      center: p + b / 2
    };
  }
  _calculateBarIndexPixels(t, n) {
    const s = n.scale, i = this.options, r = i.skipNull, a = et(i.maxBarThickness, 1 / 0);
    let o, l;
    const c = this._getAxisCount();
    if (n.grouped) {
      const h = r ? this._getStackCount(t) : n.stackCount, d = i.barThickness === "flex" ? Fc(t, n, i, h * c) : zc(t, n, i, h * c), u = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, g = this._getAxis().indexOf(et(u, this.getFirstScaleIdForIndexAxis())), p = this._getStackIndex(this.index, this._cachedMeta.stack, r ? t : void 0) + g;
      o = d.start + d.chunk * p + d.chunk / 2, l = Math.min(a, d.chunk * d.ratio);
    } else
      o = s.getPixelForValue(this.getParsed(t)[s.axis], t), l = Math.min(a, n.min * n.ratio);
    return {
      base: o - l / 2,
      head: o + l / 2,
      center: o,
      size: l
    };
  }
  draw() {
    const t = this._cachedMeta, n = t.vScale, s = t.data, i = s.length;
    let r = 0;
    for (; r < i; ++r)
      this.getParsed(r)[n.axis] !== null && !s[r].hidden && s[r].draw(this._ctx);
  }
}
class Xc extends ke {
  static id = "bubble";
  static defaults = {
    datasetElementType: !1,
    dataElementType: "point",
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "borderWidth",
          "radius"
        ]
      }
    }
  };
  static overrides = {
    scales: {
      x: {
        type: "linear"
      },
      y: {
        type: "linear"
      }
    }
  };
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
  }
  parsePrimitiveData(t, n, s, i) {
    const r = super.parsePrimitiveData(t, n, s, i);
    for (let a = 0; a < r.length; a++)
      r[a]._custom = this.resolveDataElementOptions(a + s).radius;
    return r;
  }
  parseArrayData(t, n, s, i) {
    const r = super.parseArrayData(t, n, s, i);
    for (let a = 0; a < r.length; a++) {
      const o = n[s + a];
      r[a]._custom = et(o[2], this.resolveDataElementOptions(a + s).radius);
    }
    return r;
  }
  parseObjectData(t, n, s, i) {
    const r = super.parseObjectData(t, n, s, i);
    for (let a = 0; a < r.length; a++) {
      const o = n[s + a];
      r[a]._custom = et(o && o.r && +o.r, this.resolveDataElementOptions(a + s).radius);
    }
    return r;
  }
  getMaxOverflow() {
    const t = this._cachedMeta.data;
    let n = 0;
    for (let s = t.length - 1; s >= 0; --s)
      n = Math.max(n, t[s].size(this.resolveDataElementOptions(s)) / 2);
    return n > 0 && n;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, s = this.chart.data.labels || [], { xScale: i, yScale: r } = n, a = this.getParsed(t), o = i.getLabelForValue(a.x), l = r.getLabelForValue(a.y), c = a._custom;
    return {
      label: s[t] || "",
      value: "(" + o + ", " + l + (c ? ", " + c : "") + ")"
    };
  }
  update(t) {
    const n = this._cachedMeta.data;
    this.updateElements(n, 0, n.length, t);
  }
  updateElements(t, n, s, i) {
    const r = i === "reset", { iScale: a, vScale: o } = this._cachedMeta, { sharedOptions: l, includeOptions: c } = this._getSharedOptions(n, i), h = a.axis, d = o.axis;
    for (let u = n; u < n + s; u++) {
      const g = t[u], p = !r && this.getParsed(u), b = {}, m = b[h] = r ? a.getPixelForDecimal(0.5) : a.getPixelForValue(p[h]), y = b[d] = r ? o.getBasePixel() : o.getPixelForValue(p[d]);
      b.skip = isNaN(m) || isNaN(y), c && (b.options = l || this.resolveDataElementOptions(u, g.active ? "active" : i), r && (b.options.radius = 0)), this.updateElement(g, u, b, i);
    }
  }
  resolveDataElementOptions(t, n) {
    const s = this.getParsed(t);
    let i = super.resolveDataElementOptions(t, n);
    i.$shared && (i = Object.assign({}, i, {
      $shared: !1
    }));
    const r = i.radius;
    return n !== "active" && (i.radius = 0), i.radius += et(s && s._custom, r), i;
  }
}
function Gc(e, t, n) {
  let s = 1, i = 1, r = 0, a = 0;
  if (t < pt) {
    const o = e, l = o + t, c = Math.cos(o), h = Math.sin(o), d = Math.cos(l), u = Math.sin(l), g = (x, w, v) => b0(x, o, l, !0) ? 1 : Math.max(w, w * n, v, v * n), p = (x, w, v) => b0(x, o, l, !0) ? -1 : Math.min(w, w * n, v, v * n), b = g(0, c, d), m = g(wt, h, u), y = p(lt, c, d), _ = p(lt + wt, h, u);
    s = (b - y) / 2, i = (m - _) / 2, r = -(b + y) / 2, a = -(m + _) / 2;
  }
  return {
    ratioX: s,
    ratioY: i,
    offsetX: r,
    offsetY: a
  };
}
class Ds extends ke {
  static id = "doughnut";
  static defaults = {
    datasetElementType: !1,
    dataElementType: "arc",
    animation: {
      animateRotate: !0,
      animateScale: !1
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "circumference",
          "endAngle",
          "innerRadius",
          "outerRadius",
          "startAngle",
          "x",
          "y",
          "offset",
          "borderWidth",
          "spacing"
        ]
      }
    },
    cutout: "50%",
    rotation: 0,
    circumference: 360,
    radius: "100%",
    spacing: 0,
    indexAxis: "r"
  };
  static descriptors = {
    _scriptable: (t) => t !== "spacing",
    _indexable: (t) => t !== "spacing" && !t.startsWith("borderDash") && !t.startsWith("hoverBorderDash")
  };
  static overrides = {
    aspectRatio: 1,
    plugins: {
      legend: {
        labels: {
          generateLabels(t) {
            const n = t.data, { labels: { pointStyle: s, textAlign: i, color: r, useBorderRadius: a, borderRadius: o } } = t.legend.options;
            return n.labels.length && n.datasets.length ? n.labels.map((l, c) => {
              const d = t.getDatasetMeta(0).controller.getStyle(c);
              return {
                text: l,
                fillStyle: d.backgroundColor,
                fontColor: r,
                hidden: !t.getDataVisibility(c),
                lineDash: d.borderDash,
                lineDashOffset: d.borderDashOffset,
                lineJoin: d.borderJoinStyle,
                lineWidth: d.borderWidth,
                strokeStyle: d.borderColor,
                textAlign: i,
                pointStyle: s,
                borderRadius: a && (o || d.borderRadius),
                index: c
              };
            }) : [];
          }
        },
        onClick(t, n, s) {
          s.chart.toggleDataVisibility(n.index), s.chart.update();
        }
      }
    }
  };
  constructor(t, n) {
    super(t, n), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(t, n) {
    const s = this.getDataset().data, i = this._cachedMeta;
    if (this._parsing === !1)
      i._parsed = s;
    else {
      let r = (l) => +s[l];
      if (rt(s[t])) {
        const { key: l = "value" } = this._parsing;
        r = (c) => +xe(s[c], l);
      }
      let a, o;
      for (a = t, o = t + n; a < o; ++a)
        i._parsed[a] = r(a);
    }
  }
  _getRotation() {
    return Yt(this.options.rotation - 90);
  }
  _getCircumference() {
    return Yt(this.options.circumference);
  }
  _getRotationExtents() {
    let t = pt, n = -pt;
    for (let s = 0; s < this.chart.data.datasets.length; ++s)
      if (this.chart.isDatasetVisible(s) && this.chart.getDatasetMeta(s).type === this._type) {
        const i = this.chart.getDatasetMeta(s).controller, r = i._getRotation(), a = i._getCircumference();
        t = Math.min(t, r), n = Math.max(n, r + a);
      }
    return {
      rotation: t,
      circumference: n - t
    };
  }
  update(t) {
    const n = this.chart, { chartArea: s } = n, i = this._cachedMeta, r = i.data, a = this.getMaxBorderWidth() + this.getMaxOffset(r) + this.options.spacing, o = Math.max((Math.min(s.width, s.height) - a) / 2, 0), l = Math.min(il(this.options.cutout, o), 1), c = this._getRingWeight(this.index), { circumference: h, rotation: d } = this._getRotationExtents(), { ratioX: u, ratioY: g, offsetX: p, offsetY: b } = Gc(d, h, l), m = (s.width - a) / u, y = (s.height - a) / g, _ = Math.max(Math.min(m, y) / 2, 0), x = Fr(this.options.radius, _), w = Math.max(x * l, 0), v = (x - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = p * x, this.offsetY = b * x, i.total = this.calculateTotal(), this.outerRadius = x - v * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - v * c, 0), this.updateElements(r, 0, r.length, t);
  }
  _circumference(t, n) {
    const s = this.options, i = this._cachedMeta, r = this._getCircumference();
    return n && s.animation.animateRotate || !this.chart.getDataVisibility(t) || i._parsed[t] === null || i.data[t].hidden ? 0 : this.calculateCircumference(i._parsed[t] * r / pt);
  }
  updateElements(t, n, s, i) {
    const r = i === "reset", a = this.chart, o = a.chartArea, c = a.options.animation, h = (o.left + o.right) / 2, d = (o.top + o.bottom) / 2, u = r && c.animateScale, g = u ? 0 : this.innerRadius, p = u ? 0 : this.outerRadius, { sharedOptions: b, includeOptions: m } = this._getSharedOptions(n, i);
    let y = this._getRotation(), _;
    for (_ = 0; _ < n; ++_)
      y += this._circumference(_, r);
    for (_ = n; _ < n + s; ++_) {
      const x = this._circumference(_, r), w = t[_], v = {
        x: h + this.offsetX,
        y: d + this.offsetY,
        startAngle: y,
        endAngle: y + x,
        circumference: x,
        outerRadius: p,
        innerRadius: g
      };
      m && (v.options = b || this.resolveDataElementOptions(_, w.active ? "active" : i)), y += x, this.updateElement(w, _, v, i);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, n = t.data;
    let s = 0, i;
    for (i = 0; i < n.length; i++) {
      const r = t._parsed[i];
      r !== null && !isNaN(r) && this.chart.getDataVisibility(i) && !n[i].hidden && (s += Math.abs(r));
    }
    return s;
  }
  calculateCircumference(t) {
    const n = this._cachedMeta.total;
    return n > 0 && !isNaN(t) ? pt * (Math.abs(t) / n) : 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, s = this.chart, i = s.data.labels || [], r = N0(n._parsed[t], s.options.locale);
    return {
      label: i[t] || "",
      value: r
    };
  }
  getMaxBorderWidth(t) {
    let n = 0;
    const s = this.chart;
    let i, r, a, o, l;
    if (!t) {
      for (i = 0, r = s.data.datasets.length; i < r; ++i)
        if (s.isDatasetVisible(i)) {
          a = s.getDatasetMeta(i), t = a.data, o = a.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (i = 0, r = t.length; i < r; ++i)
      l = o.resolveDataElementOptions(i), l.borderAlign !== "inner" && (n = Math.max(n, l.borderWidth || 0, l.hoverBorderWidth || 0));
    return n;
  }
  getMaxOffset(t) {
    let n = 0;
    for (let s = 0, i = t.length; s < i; ++s) {
      const r = this.resolveDataElementOptions(s);
      n = Math.max(n, r.offset || 0, r.hoverOffset || 0);
    }
    return n;
  }
  _getRingWeightOffset(t) {
    let n = 0;
    for (let s = 0; s < t; ++s)
      this.chart.isDatasetVisible(s) && (n += this._getRingWeight(s));
    return n;
  }
  _getRingWeight(t) {
    return Math.max(et(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class qc extends ke {
  static id = "line";
  static defaults = {
    datasetElementType: "line",
    dataElementType: "point",
    showLine: !0,
    spanGaps: !1
  };
  static overrides = {
    scales: {
      _index_: {
        type: "category"
      },
      _value_: {
        type: "linear"
      }
    }
  };
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(t) {
    const n = this._cachedMeta, { dataset: s, data: i = [], _dataset: r } = n, a = this.chart._animationsDisabled;
    let { start: o, count: l } = Xr(n, i, a);
    this._drawStart = o, this._drawCount = l, Gr(n) && (o = 0, l = i.length), s._chart = this.chart, s._datasetIndex = this.index, s._decimated = !!r._decimated, s.points = i;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(s, void 0, {
      animated: !a,
      options: c
    }, t), this.updateElements(i, o, l, t);
  }
  updateElements(t, n, s, i) {
    const r = i === "reset", { iScale: a, vScale: o, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: h, includeOptions: d } = this._getSharedOptions(n, i), u = a.axis, g = o.axis, { spanGaps: p, segment: b } = this.options, m = Ve(p) ? p : Number.POSITIVE_INFINITY, y = this.chart._animationsDisabled || r || i === "none", _ = n + s, x = t.length;
    let w = n > 0 && this.getParsed(n - 1);
    for (let v = 0; v < x; ++v) {
      const k = t[v], M = y ? k : {};
      if (v < n || v >= _) {
        M.skip = !0;
        continue;
      }
      const S = this.getParsed(v), N = it(S[g]), P = M[u] = a.getPixelForValue(S[u], v), R = M[g] = r || N ? o.getBasePixel() : o.getPixelForValue(l ? this.applyStack(o, S, l) : S[g], v);
      M.skip = isNaN(P) || isNaN(R) || N, M.stop = v > 0 && Math.abs(S[u] - w[u]) > m, b && (M.parsed = S, M.raw = c.data[v]), d && (M.options = h || this.resolveDataElementOptions(v, k.active ? "active" : i)), y || this.updateElement(k, v, M, i), w = S;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, n = t.dataset, s = n.options && n.options.borderWidth || 0, i = t.data || [];
    if (!i.length)
      return s;
    const r = i[0].size(this.resolveDataElementOptions(0)), a = i[i.length - 1].size(this.resolveDataElementOptions(i.length - 1));
    return Math.max(s, r, a) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
class fa extends ke {
  static id = "polarArea";
  static defaults = {
    dataElementType: "arc",
    animation: {
      animateRotate: !0,
      animateScale: !0
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "startAngle",
          "endAngle",
          "innerRadius",
          "outerRadius"
        ]
      }
    },
    indexAxis: "r",
    startAngle: 0
  };
  static overrides = {
    aspectRatio: 1,
    plugins: {
      legend: {
        labels: {
          generateLabels(t) {
            const n = t.data;
            if (n.labels.length && n.datasets.length) {
              const { labels: { pointStyle: s, color: i } } = t.legend.options;
              return n.labels.map((r, a) => {
                const l = t.getDatasetMeta(0).controller.getStyle(a);
                return {
                  text: r,
                  fillStyle: l.backgroundColor,
                  strokeStyle: l.borderColor,
                  fontColor: i,
                  lineWidth: l.borderWidth,
                  pointStyle: s,
                  hidden: !t.getDataVisibility(a),
                  index: a
                };
              });
            }
            return [];
          }
        },
        onClick(t, n, s) {
          s.chart.toggleDataVisibility(n.index), s.chart.update();
        }
      }
    },
    scales: {
      r: {
        type: "radialLinear",
        angleLines: {
          display: !1
        },
        beginAtZero: !0,
        grid: {
          circular: !0
        },
        pointLabels: {
          display: !1
        },
        startAngle: 0
      }
    }
  };
  constructor(t, n) {
    super(t, n), this.innerRadius = void 0, this.outerRadius = void 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, s = this.chart, i = s.data.labels || [], r = N0(n._parsed[t].r, s.options.locale);
    return {
      label: i[t] || "",
      value: r
    };
  }
  parseObjectData(t, n, s, i) {
    return na.bind(this)(t, n, s, i);
  }
  update(t) {
    const n = this._cachedMeta.data;
    this._updateRadius(), this.updateElements(n, 0, n.length, t);
  }
  getMinMax() {
    const t = this._cachedMeta, n = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    };
    return t.data.forEach((s, i) => {
      const r = this.getParsed(i).r;
      !isNaN(r) && this.chart.getDataVisibility(i) && (r < n.min && (n.min = r), r > n.max && (n.max = r));
    }), n;
  }
  _updateRadius() {
    const t = this.chart, n = t.chartArea, s = t.options, i = Math.min(n.right - n.left, n.bottom - n.top), r = Math.max(i / 2, 0), a = Math.max(s.cutoutPercentage ? r / 100 * s.cutoutPercentage : 1, 0), o = (r - a) / t.getVisibleDatasetCount();
    this.outerRadius = r - o * this.index, this.innerRadius = this.outerRadius - o;
  }
  updateElements(t, n, s, i) {
    const r = i === "reset", a = this.chart, l = a.options.animation, c = this._cachedMeta.rScale, h = c.xCenter, d = c.yCenter, u = c.getIndexAngle(0) - 0.5 * lt;
    let g = u, p;
    const b = 360 / this.countVisibleElements();
    for (p = 0; p < n; ++p)
      g += this._computeAngle(p, i, b);
    for (p = n; p < n + s; p++) {
      const m = t[p];
      let y = g, _ = g + this._computeAngle(p, i, b), x = a.getDataVisibility(p) ? c.getDistanceFromCenterForValue(this.getParsed(p).r) : 0;
      g = _, r && (l.animateScale && (x = 0), l.animateRotate && (y = _ = u));
      const w = {
        x: h,
        y: d,
        innerRadius: 0,
        outerRadius: x,
        startAngle: y,
        endAngle: _,
        options: this.resolveDataElementOptions(p, m.active ? "active" : i)
      };
      this.updateElement(m, p, w, i);
    }
  }
  countVisibleElements() {
    const t = this._cachedMeta;
    let n = 0;
    return t.data.forEach((s, i) => {
      !isNaN(this.getParsed(i).r) && this.chart.getDataVisibility(i) && n++;
    }), n;
  }
  _computeAngle(t, n, s) {
    return this.chart.getDataVisibility(t) ? Yt(this.resolveDataElementOptions(t, n).angle || s) : 0;
  }
}
class Zc extends Ds {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
class Kc extends ke {
  static id = "radar";
  static defaults = {
    datasetElementType: "line",
    dataElementType: "point",
    indexAxis: "r",
    showLine: !0,
    elements: {
      line: {
        fill: "start"
      }
    }
  };
  static overrides = {
    aspectRatio: 1,
    scales: {
      r: {
        type: "radialLinear"
      }
    }
  };
  getLabelAndValue(t) {
    const n = this._cachedMeta.vScale, s = this.getParsed(t);
    return {
      label: n.getLabels()[t],
      value: "" + n.getLabelForValue(s[n.axis])
    };
  }
  parseObjectData(t, n, s, i) {
    return na.bind(this)(t, n, s, i);
  }
  update(t) {
    const n = this._cachedMeta, s = n.dataset, i = n.data || [], r = n.iScale.getLabels();
    if (s.points = i, t !== "resize") {
      const a = this.resolveDatasetElementOptions(t);
      this.options.showLine || (a.borderWidth = 0);
      const o = {
        _loop: !0,
        _fullLoop: r.length === i.length,
        options: a
      };
      this.updateElement(s, void 0, o, t);
    }
    this.updateElements(i, 0, i.length, t);
  }
  updateElements(t, n, s, i) {
    const r = this._cachedMeta.rScale, a = i === "reset";
    for (let o = n; o < n + s; o++) {
      const l = t[o], c = this.resolveDataElementOptions(o, l.active ? "active" : i), h = r.getPointPositionForValue(o, this.getParsed(o).r), d = a ? r.xCenter : h.x, u = a ? r.yCenter : h.y, g = {
        x: d,
        y: u,
        angle: h.angle,
        skip: isNaN(d) || isNaN(u),
        options: c
      };
      this.updateElement(l, o, g, i);
    }
  }
}
class Jc extends ke {
  static id = "scatter";
  static defaults = {
    datasetElementType: !1,
    dataElementType: "point",
    showLine: !1,
    fill: !1
  };
  static overrides = {
    interaction: {
      mode: "point"
    },
    scales: {
      x: {
        type: "linear"
      },
      y: {
        type: "linear"
      }
    }
  };
  getLabelAndValue(t) {
    const n = this._cachedMeta, s = this.chart.data.labels || [], { xScale: i, yScale: r } = n, a = this.getParsed(t), o = i.getLabelForValue(a.x), l = r.getLabelForValue(a.y);
    return {
      label: s[t] || "",
      value: "(" + o + ", " + l + ")"
    };
  }
  update(t) {
    const n = this._cachedMeta, { data: s = [] } = n, i = this.chart._animationsDisabled;
    let { start: r, count: a } = Xr(n, s, i);
    if (this._drawStart = r, this._drawCount = a, Gr(n) && (r = 0, a = s.length), this.options.showLine) {
      this.datasetElementType || this.addElements();
      const { dataset: o, _dataset: l } = n;
      o._chart = this.chart, o._datasetIndex = this.index, o._decimated = !!l._decimated, o.points = s;
      const c = this.resolveDatasetElementOptions(t);
      c.segment = this.options.segment, this.updateElement(o, void 0, {
        animated: !i,
        options: c
      }, t);
    } else this.datasetElementType && (delete n.dataset, this.datasetElementType = !1);
    this.updateElements(s, r, a, t);
  }
  addElements() {
    const { showLine: t } = this.options;
    !this.datasetElementType && t && (this.datasetElementType = this.chart.registry.getElement("line")), super.addElements();
  }
  updateElements(t, n, s, i) {
    const r = i === "reset", { iScale: a, vScale: o, _stacked: l, _dataset: c } = this._cachedMeta, h = this.resolveDataElementOptions(n, i), d = this.getSharedOptions(h), u = this.includeOptions(i, d), g = a.axis, p = o.axis, { spanGaps: b, segment: m } = this.options, y = Ve(b) ? b : Number.POSITIVE_INFINITY, _ = this.chart._animationsDisabled || r || i === "none";
    let x = n > 0 && this.getParsed(n - 1);
    for (let w = n; w < n + s; ++w) {
      const v = t[w], k = this.getParsed(w), M = _ ? v : {}, S = it(k[p]), N = M[g] = a.getPixelForValue(k[g], w), P = M[p] = r || S ? o.getBasePixel() : o.getPixelForValue(l ? this.applyStack(o, k, l) : k[p], w);
      M.skip = isNaN(N) || isNaN(P) || S, M.stop = w > 0 && Math.abs(k[g] - x[g]) > y, m && (M.parsed = k, M.raw = c.data[w]), u && (M.options = d || this.resolveDataElementOptions(w, v.active ? "active" : i)), _ || this.updateElement(v, w, M, i), x = k;
    }
    this.updateSharedOptions(d, i, h);
  }
  getMaxOverflow() {
    const t = this._cachedMeta, n = t.data || [];
    if (!this.options.showLine) {
      let o = 0;
      for (let l = n.length - 1; l >= 0; --l)
        o = Math.max(o, n[l].size(this.resolveDataElementOptions(l)) / 2);
      return o > 0 && o;
    }
    const s = t.dataset, i = s.options && s.options.borderWidth || 0;
    if (!n.length)
      return i;
    const r = n[0].size(this.resolveDataElementOptions(0)), a = n[n.length - 1].size(this.resolveDataElementOptions(n.length - 1));
    return Math.max(i, r, a) / 2;
  }
}
var Qc = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  BarController: Uc,
  BubbleController: Xc,
  DoughnutController: Ds,
  LineController: qc,
  PieController: Zc,
  PolarAreaController: fa,
  RadarController: Kc,
  ScatterController: Jc
});
function Ce() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Is {
  /**
  * Override default date adapter methods.
  * Accepts type parameter to define options type.
  * @example
  * Chart._adapters._date.override<{myAdapterOption: string}>({
  *   init() {
  *     console.log(this.options.myAdapterOption);
  *   }
  * })
  */
  static override(t) {
    Object.assign(Is.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return Ce();
  }
  parse() {
    return Ce();
  }
  format() {
    return Ce();
  }
  add() {
    return Ce();
  }
  diff() {
    return Ce();
  }
  startOf() {
    return Ce();
  }
  endOf() {
    return Ce();
  }
}
var th = {
  _date: Is
};
function eh(e, t, n, s) {
  const { controller: i, data: r, _sorted: a } = e, o = i._cachedMeta.iScale, l = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (o && t === o.axis && t !== "r" && a && r.length) {
    const c = o._reversePixels ? bl : ce;
    if (s) {
      if (i._sharedOptions) {
        const h = r[0], d = typeof h.getRange == "function" && h.getRange(t);
        if (d) {
          const u = c(r, t, n - d), g = c(r, t, n + d);
          return {
            lo: u.lo,
            hi: g.hi
          };
        }
      }
    } else {
      const h = c(r, t, n);
      if (l) {
        const { vScale: d } = i._cachedMeta, { _parsed: u } = e, g = u.slice(0, h.lo + 1).reverse().findIndex((b) => !it(b[d.axis]));
        h.lo -= Math.max(0, g);
        const p = u.slice(h.hi).findIndex((b) => !it(b[d.axis]));
        h.hi += Math.max(0, p);
      }
      return h;
    }
  }
  return {
    lo: 0,
    hi: r.length - 1
  };
}
function xn(e, t, n, s, i) {
  const r = e.getSortedVisibleDatasetMetas(), a = n[t];
  for (let o = 0, l = r.length; o < l; ++o) {
    const { index: c, data: h } = r[o], { lo: d, hi: u } = eh(r[o], t, a, i);
    for (let g = d; g <= u; ++g) {
      const p = h[g];
      p.skip || s(p, c, g);
    }
  }
}
function nh(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(s, i) {
    const r = t ? Math.abs(s.x - i.x) : 0, a = n ? Math.abs(s.y - i.y) : 0;
    return Math.sqrt(Math.pow(r, 2) + Math.pow(a, 2));
  };
}
function Rn(e, t, n, s, i) {
  const r = [];
  return !i && !e.isPointInArea(t) || xn(e, n, t, function(o, l, c) {
    !i && !he(o, e.chartArea, 0) || o.inRange(t.x, t.y, s) && r.push({
      element: o,
      datasetIndex: l,
      index: c
    });
  }, !0), r;
}
function sh(e, t, n, s) {
  let i = [];
  function r(a, o, l) {
    const { startAngle: c, endAngle: h } = a.getProps([
      "startAngle",
      "endAngle"
    ], s), { angle: d } = Vr(a, {
      x: t.x,
      y: t.y
    });
    b0(d, c, h) && i.push({
      element: a,
      datasetIndex: o,
      index: l
    });
  }
  return xn(e, n, t, r), i;
}
function ih(e, t, n, s, i, r) {
  let a = [];
  const o = nh(n);
  let l = Number.POSITIVE_INFINITY;
  function c(h, d, u) {
    const g = h.inRange(t.x, t.y, i);
    if (s && !g)
      return;
    const p = h.getCenterPoint(i);
    if (!(!!r || e.isPointInArea(p)) && !g)
      return;
    const m = o(t, p);
    m < l ? (a = [
      {
        element: h,
        datasetIndex: d,
        index: u
      }
    ], l = m) : m === l && a.push({
      element: h,
      datasetIndex: d,
      index: u
    });
  }
  return xn(e, n, t, c), a;
}
function Ln(e, t, n, s, i, r) {
  return !r && !e.isPointInArea(t) ? [] : n === "r" && !s ? sh(e, t, n, i) : ih(e, t, n, s, i, r);
}
function Mi(e, t, n, s, i) {
  const r = [], a = n === "x" ? "inXRange" : "inYRange";
  let o = !1;
  return xn(e, n, t, (l, c, h) => {
    l[a] && l[a](t[n], i) && (r.push({
      element: l,
      datasetIndex: c,
      index: h
    }), o = o || l.inRange(t.x, t.y, i));
  }), s && !o ? [] : r;
}
var rh = {
  modes: {
    index(e, t, n, s) {
      const i = Pe(t, e), r = n.axis || "x", a = n.includeInvisible || !1, o = n.intersect ? Rn(e, i, r, s, a) : Ln(e, i, r, !1, s, a), l = [];
      return o.length ? (e.getSortedVisibleDatasetMetas().forEach((c) => {
        const h = o[0].index, d = c.data[h];
        d && !d.skip && l.push({
          element: d,
          datasetIndex: c.index,
          index: h
        });
      }), l) : [];
    },
    dataset(e, t, n, s) {
      const i = Pe(t, e), r = n.axis || "xy", a = n.includeInvisible || !1;
      let o = n.intersect ? Rn(e, i, r, s, a) : Ln(e, i, r, !1, s, a);
      if (o.length > 0) {
        const l = o[0].datasetIndex, c = e.getDatasetMeta(l).data;
        o = [];
        for (let h = 0; h < c.length; ++h)
          o.push({
            element: c[h],
            datasetIndex: l,
            index: h
          });
      }
      return o;
    },
    point(e, t, n, s) {
      const i = Pe(t, e), r = n.axis || "xy", a = n.includeInvisible || !1;
      return Rn(e, i, r, s, a);
    },
    nearest(e, t, n, s) {
      const i = Pe(t, e), r = n.axis || "xy", a = n.includeInvisible || !1;
      return Ln(e, i, r, n.intersect, s, a);
    },
    x(e, t, n, s) {
      const i = Pe(t, e);
      return Mi(e, i, "x", n.intersect, s);
    },
    y(e, t, n, s) {
      const i = Pe(t, e);
      return Mi(e, i, "y", n.intersect, s);
    }
  }
};
const ga = [
  "left",
  "top",
  "right",
  "bottom"
];
function Ke(e, t) {
  return e.filter((n) => n.pos === t);
}
function Si(e, t) {
  return e.filter((n) => ga.indexOf(n.pos) === -1 && n.box.axis === t);
}
function Je(e, t) {
  return e.sort((n, s) => {
    const i = t ? s : n, r = t ? n : s;
    return i.weight === r.weight ? i.index - r.index : i.weight - r.weight;
  });
}
function ah(e) {
  const t = [];
  let n, s, i, r, a, o;
  for (n = 0, s = (e || []).length; n < s; ++n)
    i = e[n], { position: r, options: { stack: a, stackWeight: o = 1 } } = i, t.push({
      index: n,
      box: i,
      pos: r,
      horizontal: i.isHorizontal(),
      weight: i.weight,
      stack: a && r + a,
      stackWeight: o
    });
  return t;
}
function oh(e) {
  const t = {};
  for (const n of e) {
    const { stack: s, pos: i, stackWeight: r } = n;
    if (!s || !ga.includes(i))
      continue;
    const a = t[s] || (t[s] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    a.count++, a.weight += r;
  }
  return t;
}
function lh(e, t) {
  const n = oh(e), { vBoxMaxWidth: s, hBoxMaxHeight: i } = t;
  let r, a, o;
  for (r = 0, a = e.length; r < a; ++r) {
    o = e[r];
    const { fullSize: l } = o.box, c = n[o.stack], h = c && o.stackWeight / c.weight;
    o.horizontal ? (o.width = h ? h * s : l && t.availableWidth, o.height = i) : (o.width = s, o.height = h ? h * i : l && t.availableHeight);
  }
  return n;
}
function ch(e) {
  const t = ah(e), n = Je(t.filter((c) => c.box.fullSize), !0), s = Je(Ke(t, "left"), !0), i = Je(Ke(t, "right")), r = Je(Ke(t, "top"), !0), a = Je(Ke(t, "bottom")), o = Si(t, "x"), l = Si(t, "y");
  return {
    fullSize: n,
    leftAndTop: s.concat(r),
    rightAndBottom: i.concat(l).concat(a).concat(o),
    chartArea: Ke(t, "chartArea"),
    vertical: s.concat(i).concat(l),
    horizontal: r.concat(a).concat(o)
  };
}
function Ci(e, t, n, s) {
  return Math.max(e[n], t[n]) + Math.max(e[s], t[s]);
}
function ma(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function hh(e, t, n, s) {
  const { pos: i, box: r } = n, a = e.maxPadding;
  if (!rt(i)) {
    n.size && (e[i] -= n.size);
    const d = s[n.stack] || {
      size: 0,
      count: 1
    };
    d.size = Math.max(d.size, n.horizontal ? r.height : r.width), n.size = d.size / d.count, e[i] += n.size;
  }
  r.getPadding && ma(a, r.getPadding());
  const o = Math.max(0, t.outerWidth - Ci(a, e, "left", "right")), l = Math.max(0, t.outerHeight - Ci(a, e, "top", "bottom")), c = o !== e.w, h = l !== e.h;
  return e.w = o, e.h = l, n.horizontal ? {
    same: c,
    other: h
  } : {
    same: h,
    other: c
  };
}
function dh(e) {
  const t = e.maxPadding;
  function n(s) {
    const i = Math.max(t[s] - e[s], 0);
    return e[s] += i, i;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function uh(e, t) {
  const n = t.maxPadding;
  function s(i) {
    const r = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return i.forEach((a) => {
      r[a] = Math.max(t[a], n[a]);
    }), r;
  }
  return s(e ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function r0(e, t, n, s) {
  const i = [];
  let r, a, o, l, c, h;
  for (r = 0, a = e.length, c = 0; r < a; ++r) {
    o = e[r], l = o.box, l.update(o.width || t.w, o.height || t.h, uh(o.horizontal, t));
    const { same: d, other: u } = hh(t, n, o, s);
    c |= d && i.length, h = h || u, l.fullSize || i.push(o);
  }
  return c && r0(i, t, n, s) || h;
}
function z0(e, t, n, s, i) {
  e.top = n, e.left = t, e.right = t + s, e.bottom = n + i, e.width = s, e.height = i;
}
function Ni(e, t, n, s) {
  const i = n.padding;
  let { x: r, y: a } = t;
  for (const o of e) {
    const l = o.box, c = s[o.stack] || {
      placed: 0,
      weight: 1
    }, h = o.stackWeight / c.weight || 1;
    if (o.horizontal) {
      const d = t.w * h, u = c.size || l.height;
      p0(c.start) && (a = c.start), l.fullSize ? z0(l, i.left, a, n.outerWidth - i.right - i.left, u) : z0(l, t.left + c.placed, a, d, u), c.start = a, c.placed += d, a = l.bottom;
    } else {
      const d = t.h * h, u = c.size || l.width;
      p0(c.start) && (r = c.start), l.fullSize ? z0(l, r, i.top, u, n.outerHeight - i.bottom - i.top) : z0(l, r, t.top + c.placed, u, d), c.start = r, c.placed += d, r = l.right;
    }
  }
  t.x = r, t.y = a;
}
var $t = {
  addBox(e, t) {
    e.boxes || (e.boxes = []), t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
      return [
        {
          z: 0,
          draw(n) {
            t.draw(n);
          }
        }
      ];
    }, e.boxes.push(t);
  },
  removeBox(e, t) {
    const n = e.boxes ? e.boxes.indexOf(t) : -1;
    n !== -1 && e.boxes.splice(n, 1);
  },
  configure(e, t, n) {
    t.fullSize = n.fullSize, t.position = n.position, t.weight = n.weight;
  },
  update(e, t, n, s) {
    if (!e)
      return;
    const i = At(e.options.layout.padding), r = Math.max(t - i.width, 0), a = Math.max(n - i.height, 0), o = ch(e.boxes), l = o.vertical, c = o.horizontal;
    ct(e.boxes, (b) => {
      typeof b.beforeLayout == "function" && b.beforeLayout();
    });
    const h = l.reduce((b, m) => m.box.options && m.box.options.display === !1 ? b : b + 1, 0) || 1, d = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: i,
      availableWidth: r,
      availableHeight: a,
      vBoxMaxWidth: r / 2 / h,
      hBoxMaxHeight: a / 2
    }), u = Object.assign({}, i);
    ma(u, At(s));
    const g = Object.assign({
      maxPadding: u,
      w: r,
      h: a,
      x: i.left,
      y: i.top
    }, i), p = lh(l.concat(c), d);
    r0(o.fullSize, g, d, p), r0(l, g, d, p), r0(c, g, d, p) && r0(l, g, d, p), dh(g), Ni(o.leftAndTop, g, d, p), g.x += g.w, g.y += g.h, Ni(o.rightAndBottom, g, d, p), e.chartArea = {
      left: g.left,
      top: g.top,
      right: g.left + g.w,
      bottom: g.top + g.h,
      height: g.h,
      width: g.w
    }, ct(o.chartArea, (b) => {
      const m = b.box;
      Object.assign(m, e.chartArea), m.update(g.w, g.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class pa {
  acquireContext(t, n) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, n, s) {
  }
  removeEventListener(t, n, s) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, n, s, i) {
    return n = Math.max(0, n || t.width), s = s || t.height, {
      width: n,
      height: Math.max(0, i ? Math.floor(n / i) : s)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class fh extends pa {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const q0 = "$chartjs", gh = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Pi = (e) => e === null || e === "";
function mh(e, t) {
  const n = e.style, s = e.getAttribute("height"), i = e.getAttribute("width");
  if (e[q0] = {
    initial: {
      height: s,
      width: i,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", Pi(i)) {
    const r = di(e, "width");
    r !== void 0 && (e.width = r);
  }
  if (Pi(s))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const r = di(e, "height");
      r !== void 0 && (e.height = r);
    }
  return e;
}
const ba = hc ? {
  passive: !0
} : !1;
function ph(e, t, n) {
  e && e.addEventListener(t, n, ba);
}
function bh(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, ba);
}
function yh(e, t) {
  const n = gh[e.type] || e.type, { x: s, y: i } = Pe(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: s !== void 0 ? s : null,
    y: i !== void 0 ? i : null
  };
}
function on(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function vh(e, t, n) {
  const s = e.canvas, i = new MutationObserver((r) => {
    let a = !1;
    for (const o of r)
      a = a || on(o.addedNodes, s), a = a && !on(o.removedNodes, s);
    a && n();
  });
  return i.observe(document, {
    childList: !0,
    subtree: !0
  }), i;
}
function xh(e, t, n) {
  const s = e.canvas, i = new MutationObserver((r) => {
    let a = !1;
    for (const o of r)
      a = a || on(o.removedNodes, s), a = a && !on(o.addedNodes, s);
    a && n();
  });
  return i.observe(document, {
    childList: !0,
    subtree: !0
  }), i;
}
const v0 = /* @__PURE__ */ new Map();
let Ti = 0;
function ya() {
  const e = window.devicePixelRatio;
  e !== Ti && (Ti = e, v0.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function _h(e, t) {
  v0.size || window.addEventListener("resize", ya), v0.set(e, t);
}
function wh(e) {
  v0.delete(e), v0.size || window.removeEventListener("resize", ya);
}
function kh(e, t, n) {
  const s = e.canvas, i = s && As(s);
  if (!i)
    return;
  const r = Ur((o, l) => {
    const c = i.clientWidth;
    n(o, l), c < i.clientWidth && n();
  }, window), a = new ResizeObserver((o) => {
    const l = o[0], c = l.contentRect.width, h = l.contentRect.height;
    c === 0 && h === 0 || r(c, h);
  });
  return a.observe(i), _h(e, r), a;
}
function En(e, t, n) {
  n && n.disconnect(), t === "resize" && wh(e);
}
function Mh(e, t, n) {
  const s = e.canvas, i = Ur((r) => {
    e.ctx !== null && n(yh(r, e));
  }, e);
  return ph(s, t, i), i;
}
class Sh extends pa {
  acquireContext(t, n) {
    const s = t && t.getContext && t.getContext("2d");
    return s && s.canvas === t ? (mh(t, n), s) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[q0])
      return !1;
    const s = n[q0].initial;
    [
      "height",
      "width"
    ].forEach((r) => {
      const a = s[r];
      it(a) ? n.removeAttribute(r) : n.setAttribute(r, a);
    });
    const i = s.style || {};
    return Object.keys(i).forEach((r) => {
      n.style[r] = i[r];
    }), n.width = n.width, delete n[q0], !0;
  }
  addEventListener(t, n, s) {
    this.removeEventListener(t, n);
    const i = t.$proxies || (t.$proxies = {}), a = {
      attach: vh,
      detach: xh,
      resize: kh
    }[n] || Mh;
    i[n] = a(t, n, s);
  }
  removeEventListener(t, n) {
    const s = t.$proxies || (t.$proxies = {}), i = s[n];
    if (!i)
      return;
    ({
      attach: En,
      detach: En,
      resize: En
    }[n] || bh)(t, n, i), s[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, s, i) {
    return cc(t, n, s, i);
  }
  isAttached(t) {
    const n = t && As(t);
    return !!(n && n.isConnected);
  }
}
function Ch(e) {
  return !$s() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? fh : Sh;
}
class ue {
  static defaults = {};
  static defaultRoutes = void 0;
  x;
  y;
  active = !1;
  options;
  $animations;
  tooltipPosition(t) {
    const { x: n, y: s } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: n,
      y: s
    };
  }
  hasValue() {
    return Ve(this.x) && Ve(this.y);
  }
  getProps(t, n) {
    const s = this.$animations;
    if (!n || !s)
      return this;
    const i = {};
    return t.forEach((r) => {
      i[r] = s[r] && s[r].active() ? s[r]._to : this[r];
    }), i;
  }
}
function Nh(e, t) {
  const n = e.options.ticks, s = Ph(e), i = Math.min(n.maxTicksLimit || s, s), r = n.major.enabled ? $h(t) : [], a = r.length, o = r[0], l = r[a - 1], c = [];
  if (a > i)
    return Ah(t, c, r, a / i), c;
  const h = Th(r, t, i);
  if (a > 0) {
    let d, u;
    const g = a > 1 ? Math.round((l - o) / (a - 1)) : null;
    for (F0(t, c, h, it(g) ? 0 : o - g, o), d = 0, u = a - 1; d < u; d++)
      F0(t, c, h, r[d], r[d + 1]);
    return F0(t, c, h, l, it(g) ? t.length : l + g), c;
  }
  return F0(t, c, h), c;
}
function Ph(e) {
  const t = e.options.offset, n = e._tickSize(), s = e._length / n + (t ? 0 : 1), i = e._maxLength / n;
  return Math.floor(Math.min(s, i));
}
function Th(e, t, n) {
  const s = Dh(e), i = t.length / n;
  if (!s)
    return Math.max(i, 1);
  const r = ul(s);
  for (let a = 0, o = r.length - 1; a < o; a++) {
    const l = r[a];
    if (l > i)
      return l;
  }
  return Math.max(i, 1);
}
function $h(e) {
  const t = [];
  let n, s;
  for (n = 0, s = e.length; n < s; n++)
    e[n].major && t.push(n);
  return t;
}
function Ah(e, t, n, s) {
  let i = 0, r = n[0], a;
  for (s = Math.ceil(s), a = 0; a < e.length; a++)
    a === r && (t.push(e[a]), i++, r = n[i * s]);
}
function F0(e, t, n, s, i) {
  const r = et(s, 0), a = Math.min(et(i, e.length), e.length);
  let o = 0, l, c, h;
  for (n = Math.ceil(n), i && (l = i - s, n = l / Math.floor(l / n)), h = r; h < 0; )
    o++, h = Math.round(r + o * n);
  for (c = Math.max(r, 0); c < a; c++)
    c === h && (t.push(e[c]), o++, h = Math.round(r + o * n));
}
function Dh(e) {
  const t = e.length;
  let n, s;
  if (t < 2)
    return !1;
  for (s = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== s)
      return !1;
  return s;
}
const Ih = (e) => e === "left" ? "right" : e === "right" ? "left" : e, $i = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, Ai = (e, t) => Math.min(t || e, e);
function Di(e, t) {
  const n = [], s = e.length / t, i = e.length;
  let r = 0;
  for (; r < i; r += s)
    n.push(e[Math.floor(r)]);
  return n;
}
function Rh(e, t, n) {
  const s = e.ticks.length, i = Math.min(t, s - 1), r = e._startPixel, a = e._endPixel, o = 1e-6;
  let l = e.getPixelForTick(i), c;
  if (!(n && (s === 1 ? c = Math.max(l - r, a - l) : t === 0 ? c = (e.getPixelForTick(1) - l) / 2 : c = (l - e.getPixelForTick(i - 1)) / 2, l += i < t ? c : -c, l < r - o || l > a + o)))
    return l;
}
function Lh(e, t) {
  ct(e, (n) => {
    const s = n.gc, i = s.length / 2;
    let r;
    if (i > t) {
      for (r = 0; r < i; ++r)
        delete n.data[s[r]];
      s.splice(0, i);
    }
  });
}
function Qe(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function Ii(e, t) {
  if (!e.display)
    return 0;
  const n = St(e.font, t), s = At(e.padding);
  return (bt(e.text) ? e.text.length : 1) * n.lineHeight + s.height;
}
function Eh(e, t) {
  return we(e, {
    scale: t,
    type: "scale"
  });
}
function Oh(e, t, n) {
  return we(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function zh(e, t, n) {
  let s = Ms(e);
  return (n && t !== "right" || !n && t === "right") && (s = Ih(s)), s;
}
function Fh(e, t, n, s) {
  const { top: i, left: r, bottom: a, right: o, chart: l } = e, { chartArea: c, scales: h } = l;
  let d = 0, u, g, p;
  const b = a - i, m = o - r;
  if (e.isHorizontal()) {
    if (g = Pt(s, r, o), rt(n)) {
      const y = Object.keys(n)[0], _ = n[y];
      p = h[y].getPixelForValue(_) + b - t;
    } else n === "center" ? p = (c.bottom + c.top) / 2 + b - t : p = $i(e, n, t);
    u = o - r;
  } else {
    if (rt(n)) {
      const y = Object.keys(n)[0], _ = n[y];
      g = h[y].getPixelForValue(_) - m + t;
    } else n === "center" ? g = (c.left + c.right) / 2 - m + t : g = $i(e, n, t);
    p = Pt(s, a, i), d = n === "left" ? -wt : wt;
  }
  return {
    titleX: g,
    titleY: p,
    maxWidth: u,
    rotation: d
  };
}
class Oe extends ue {
  constructor(t) {
    super(), this.id = t.id, this.type = t.type, this.options = void 0, this.ctx = t.ctx, this.chart = t.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
  }
  init(t) {
    this.options = t.setContext(this.getContext()), this.axis = t.axis, this._userMin = this.parse(t.min), this._userMax = this.parse(t.max), this._suggestedMin = this.parse(t.suggestedMin), this._suggestedMax = this.parse(t.suggestedMax);
  }
  parse(t, n) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: n, _suggestedMin: s, _suggestedMax: i } = this;
    return t = Ft(t, Number.POSITIVE_INFINITY), n = Ft(n, Number.NEGATIVE_INFINITY), s = Ft(s, Number.POSITIVE_INFINITY), i = Ft(i, Number.NEGATIVE_INFINITY), {
      min: Ft(t, s),
      max: Ft(n, i),
      minDefined: xt(t),
      maxDefined: xt(n)
    };
  }
  getMinMax(t) {
    let { min: n, max: s, minDefined: i, maxDefined: r } = this.getUserBounds(), a;
    if (i && r)
      return {
        min: n,
        max: s
      };
    const o = this.getMatchingVisibleMetas();
    for (let l = 0, c = o.length; l < c; ++l)
      a = o[l].controller.getMinMax(this, t), i || (n = Math.min(n, a.min)), r || (s = Math.max(s, a.max));
    return n = r && n > s ? s : n, s = i && n > s ? n : s, {
      min: Ft(n, Ft(s, n)),
      max: Ft(s, Ft(n, s))
    };
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const t = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || [];
  }
  getLabelItems(t = this.chart.chartArea) {
    return this._labelItems || (this._labelItems = this._computeLabelItems(t));
  }
  beforeLayout() {
    this._cache = {}, this._dataLimitsCached = !1;
  }
  beforeUpdate() {
    gt(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, n, s) {
    const { beginAtZero: i, grace: r, ticks: a } = this.options, o = a.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = n, this._margins = s = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, s), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + s.left + s.right : this.height + s.top + s.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Hl(this, r, i), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = o < this.ticks.length;
    this._convertTicksToLabels(l ? Di(this.ticks, o) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), a.display && (a.autoSkip || a.source === "auto") && (this.ticks = Nh(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, n, s;
    this.isHorizontal() ? (n = this.left, s = this.right) : (n = this.top, s = this.bottom, t = !t), this._startPixel = n, this._endPixel = s, this._reversePixels = t, this._length = s - n, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    gt(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    gt(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    gt(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), gt(this.options[t], [
      this
    ]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {
  }
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    gt(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const n = this.options.ticks;
    let s, i, r;
    for (s = 0, i = t.length; s < i; s++)
      r = t[s], r.label = gt(n.callback, [
        r.value,
        s,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    gt(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    gt(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, n = t.ticks, s = Ai(this.ticks.length, t.ticks.maxTicksLimit), i = n.minRotation || 0, r = n.maxRotation;
    let a = i, o, l, c;
    if (!this._isVisible() || !n.display || i >= r || s <= 1 || !this.isHorizontal()) {
      this.labelRotation = i;
      return;
    }
    const h = this._getLabelSizes(), d = h.widest.width, u = h.highest.height, g = Ct(this.chart.width - d, 0, this.maxWidth);
    o = t.offset ? this.maxWidth / s : g / (s - 1), d + 6 > o && (o = g / (s - (t.offset ? 0.5 : 1)), l = this.maxHeight - Qe(t.grid) - n.padding - Ii(t.title, this.chart.options.font), c = Math.sqrt(d * d + u * u), a = ws(Math.min(Math.asin(Ct((h.highest.height + 6) / o, -1, 1)), Math.asin(Ct(l / c, -1, 1)) - Math.asin(Ct(u / c, -1, 1)))), a = Math.max(i, Math.min(r, a))), this.labelRotation = a;
  }
  afterCalculateLabelRotation() {
    gt(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    gt(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: n, options: { ticks: s, title: i, grid: r } } = this, a = this._isVisible(), o = this.isHorizontal();
    if (a) {
      const l = Ii(i, n.options.font);
      if (o ? (t.width = this.maxWidth, t.height = Qe(r) + l) : (t.height = this.maxHeight, t.width = Qe(r) + l), s.display && this.ticks.length) {
        const { first: c, last: h, widest: d, highest: u } = this._getLabelSizes(), g = s.padding * 2, p = Yt(this.labelRotation), b = Math.cos(p), m = Math.sin(p);
        if (o) {
          const y = s.mirror ? 0 : m * d.width + b * u.height;
          t.height = Math.min(this.maxHeight, t.height + y + g);
        } else {
          const y = s.mirror ? 0 : b * d.width + m * u.height;
          t.width = Math.min(this.maxWidth, t.width + y + g);
        }
        this._calculatePadding(c, h, m, b);
      }
    }
    this._handleMargins(), o ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, n, s, i) {
    const { ticks: { align: r, padding: a }, position: o } = this.options, l = this.labelRotation !== 0, c = o !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const h = this.getPixelForTick(0) - this.left, d = this.right - this.getPixelForTick(this.ticks.length - 1);
      let u = 0, g = 0;
      l ? c ? (u = i * t.width, g = s * n.height) : (u = s * t.height, g = i * n.width) : r === "start" ? g = n.width : r === "end" ? u = t.width : r !== "inner" && (u = t.width / 2, g = n.width / 2), this.paddingLeft = Math.max((u - h + a) * this.width / (this.width - h), 0), this.paddingRight = Math.max((g - d + a) * this.width / (this.width - d), 0);
    } else {
      let h = n.height / 2, d = t.height / 2;
      r === "start" ? (h = 0, d = t.height) : r === "end" && (h = n.height, d = 0), this.paddingTop = h + a, this.paddingBottom = d + a;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    gt(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: t, position: n } = this.options;
    return n === "top" || n === "bottom" || t === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(t);
    let n, s;
    for (n = 0, s = t.length; n < s; n++)
      it(t[n].label) && (t.splice(n, 1), s--, n--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const n = this.options.ticks.sampleSize;
      let s = this.ticks;
      n < s.length && (s = Di(s, n)), this._labelSizes = t = this._computeLabelSizes(s, s.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, n, s) {
    const { ctx: i, _longestTextCache: r } = this, a = [], o = [], l = Math.floor(n / Ai(n, s));
    let c = 0, h = 0, d, u, g, p, b, m, y, _, x, w, v;
    for (d = 0; d < n; d += l) {
      if (p = t[d].label, b = this._resolveTickFontOptions(d), i.font = m = b.string, y = r[m] = r[m] || {
        data: {},
        gc: []
      }, _ = b.lineHeight, x = w = 0, !it(p) && !bt(p))
        x = rn(i, y.data, y.gc, x, p), w = _;
      else if (bt(p))
        for (u = 0, g = p.length; u < g; ++u)
          v = p[u], !it(v) && !bt(v) && (x = rn(i, y.data, y.gc, x, v), w += _);
      a.push(x), o.push(w), c = Math.max(x, c), h = Math.max(w, h);
    }
    Lh(r, n);
    const k = a.indexOf(c), M = o.indexOf(h), S = (N) => ({
      width: a[N] || 0,
      height: o[N] || 0
    });
    return {
      first: S(0),
      last: S(n - 1),
      widest: S(k),
      highest: S(M),
      widths: a,
      heights: o
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, n) {
    return NaN;
  }
  getValueForPixel(t) {
  }
  getPixelForTick(t) {
    const n = this.ticks;
    return t < 0 || t > n.length - 1 ? null : this.getPixelForValue(n[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const n = this._startPixel + t * this._length;
    return pl(this._alignToPixels ? Se(this.chart, n, 0) : n);
  }
  getDecimalForPixel(t) {
    const n = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - n : n;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: n } = this;
    return t < 0 && n < 0 ? n : t > 0 && n > 0 ? t : 0;
  }
  getContext(t) {
    const n = this.ticks || [];
    if (t >= 0 && t < n.length) {
      const s = n[t];
      return s.$context || (s.$context = Oh(this.getContext(), t, s));
    }
    return this.$context || (this.$context = Eh(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, n = Yt(this.labelRotation), s = Math.abs(Math.cos(n)), i = Math.abs(Math.sin(n)), r = this._getLabelSizes(), a = t.autoSkipPadding || 0, o = r ? r.widest.width + a : 0, l = r ? r.highest.height + a : 0;
    return this.isHorizontal() ? l * s > o * i ? o / s : l / i : l * i < o * s ? l / s : o / i;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, s = this.chart, i = this.options, { grid: r, position: a, border: o } = i, l = r.offset, c = this.isHorizontal(), d = this.ticks.length + (l ? 1 : 0), u = Qe(r), g = [], p = o.setContext(this.getContext()), b = p.display ? p.width : 0, m = b / 2, y = function(D) {
      return Se(s, D, b);
    };
    let _, x, w, v, k, M, S, N, P, R, C, A;
    if (a === "top")
      _ = y(this.bottom), M = this.bottom - u, N = _ - m, R = y(t.top) + m, A = t.bottom;
    else if (a === "bottom")
      _ = y(this.top), R = t.top, A = y(t.bottom) - m, M = _ + m, N = this.top + u;
    else if (a === "left")
      _ = y(this.right), k = this.right - u, S = _ - m, P = y(t.left) + m, C = t.right;
    else if (a === "right")
      _ = y(this.left), P = t.left, C = y(t.right) - m, k = _ + m, S = this.left + u;
    else if (n === "x") {
      if (a === "center")
        _ = y((t.top + t.bottom) / 2 + 0.5);
      else if (rt(a)) {
        const D = Object.keys(a)[0], E = a[D];
        _ = y(this.chart.scales[D].getPixelForValue(E));
      }
      R = t.top, A = t.bottom, M = _ + m, N = M + u;
    } else if (n === "y") {
      if (a === "center")
        _ = y((t.left + t.right) / 2);
      else if (rt(a)) {
        const D = Object.keys(a)[0], E = a[D];
        _ = y(this.chart.scales[D].getPixelForValue(E));
      }
      k = _ - m, S = k - u, P = t.left, C = t.right;
    }
    const T = et(i.ticks.maxTicksLimit, d), O = Math.max(1, Math.ceil(d / T));
    for (x = 0; x < d; x += O) {
      const D = this.getContext(x), E = r.setContext(D), B = o.setContext(D), z = E.lineWidth, L = E.color, $ = B.dash || [], F = B.dashOffset, j = E.tickWidth, W = E.tickColor, Y = E.tickBorderDash || [], V = E.tickBorderDashOffset;
      w = Rh(this, x, l), w !== void 0 && (v = Se(s, w, z), c ? k = S = P = C = v : M = N = R = A = v, g.push({
        tx1: k,
        ty1: M,
        tx2: S,
        ty2: N,
        x1: P,
        y1: R,
        x2: C,
        y2: A,
        width: z,
        color: L,
        borderDash: $,
        borderDashOffset: F,
        tickWidth: j,
        tickColor: W,
        tickBorderDash: Y,
        tickBorderDashOffset: V
      }));
    }
    return this._ticksLength = d, this._borderValue = _, g;
  }
  _computeLabelItems(t) {
    const n = this.axis, s = this.options, { position: i, ticks: r } = s, a = this.isHorizontal(), o = this.ticks, { align: l, crossAlign: c, padding: h, mirror: d } = r, u = Qe(s.grid), g = u + h, p = d ? -h : g, b = -Yt(this.labelRotation), m = [];
    let y, _, x, w, v, k, M, S, N, P, R, C, A = "middle";
    if (i === "top")
      k = this.bottom - p, M = this._getXAxisLabelAlignment();
    else if (i === "bottom")
      k = this.top + p, M = this._getXAxisLabelAlignment();
    else if (i === "left") {
      const O = this._getYAxisLabelAlignment(u);
      M = O.textAlign, v = O.x;
    } else if (i === "right") {
      const O = this._getYAxisLabelAlignment(u);
      M = O.textAlign, v = O.x;
    } else if (n === "x") {
      if (i === "center")
        k = (t.top + t.bottom) / 2 + g;
      else if (rt(i)) {
        const O = Object.keys(i)[0], D = i[O];
        k = this.chart.scales[O].getPixelForValue(D) + g;
      }
      M = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (i === "center")
        v = (t.left + t.right) / 2 - g;
      else if (rt(i)) {
        const O = Object.keys(i)[0], D = i[O];
        v = this.chart.scales[O].getPixelForValue(D);
      }
      M = this._getYAxisLabelAlignment(u).textAlign;
    }
    n === "y" && (l === "start" ? A = "top" : l === "end" && (A = "bottom"));
    const T = this._getLabelSizes();
    for (y = 0, _ = o.length; y < _; ++y) {
      x = o[y], w = x.label;
      const O = r.setContext(this.getContext(y));
      S = this.getPixelForTick(y) + r.labelOffset, N = this._resolveTickFontOptions(y), P = N.lineHeight, R = bt(w) ? w.length : 1;
      const D = R / 2, E = O.color, B = O.textStrokeColor, z = O.textStrokeWidth;
      let L = M;
      a ? (v = S, M === "inner" && (y === _ - 1 ? L = this.options.reverse ? "left" : "right" : y === 0 ? L = this.options.reverse ? "right" : "left" : L = "center"), i === "top" ? c === "near" || b !== 0 ? C = -R * P + P / 2 : c === "center" ? C = -T.highest.height / 2 - D * P + P : C = -T.highest.height + P / 2 : c === "near" || b !== 0 ? C = P / 2 : c === "center" ? C = T.highest.height / 2 - D * P : C = T.highest.height - R * P, d && (C *= -1), b !== 0 && !O.showLabelBackdrop && (v += P / 2 * Math.sin(b))) : (k = S, C = (1 - R) * P / 2);
      let $;
      if (O.showLabelBackdrop) {
        const F = At(O.backdropPadding), j = T.heights[y], W = T.widths[y];
        let Y = C - F.top, V = 0 - F.left;
        switch (A) {
          case "middle":
            Y -= j / 2;
            break;
          case "bottom":
            Y -= j;
            break;
        }
        switch (M) {
          case "center":
            V -= W / 2;
            break;
          case "right":
            V -= W;
            break;
          case "inner":
            y === _ - 1 ? V -= W : y > 0 && (V -= W / 2);
            break;
        }
        $ = {
          left: V,
          top: Y,
          width: W + F.width,
          height: j + F.height,
          color: O.backdropColor
        };
      }
      m.push({
        label: w,
        font: N,
        textOffset: C,
        options: {
          rotation: b,
          color: E,
          strokeColor: B,
          strokeWidth: z,
          textAlign: L,
          textBaseline: A,
          translation: [
            v,
            k
          ],
          backdrop: $
        }
      });
    }
    return m;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: n } = this.options;
    if (-Yt(this.labelRotation))
      return t === "top" ? "left" : "right";
    let i = "center";
    return n.align === "start" ? i = "left" : n.align === "end" ? i = "right" : n.align === "inner" && (i = "inner"), i;
  }
  _getYAxisLabelAlignment(t) {
    const { position: n, ticks: { crossAlign: s, mirror: i, padding: r } } = this.options, a = this._getLabelSizes(), o = t + r, l = a.widest.width;
    let c, h;
    return n === "left" ? i ? (h = this.right + r, s === "near" ? c = "left" : s === "center" ? (c = "center", h += l / 2) : (c = "right", h += l)) : (h = this.right - o, s === "near" ? c = "right" : s === "center" ? (c = "center", h -= l / 2) : (c = "left", h = this.left)) : n === "right" ? i ? (h = this.left + r, s === "near" ? c = "right" : s === "center" ? (c = "center", h -= l / 2) : (c = "left", h -= l)) : (h = this.left + o, s === "near" ? c = "left" : s === "center" ? (c = "center", h += l / 2) : (c = "right", h = this.right)) : c = "right", {
      textAlign: c,
      x: h
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const t = this.chart, n = this.options.position;
    if (n === "left" || n === "right")
      return {
        top: 0,
        left: this.left,
        bottom: t.height,
        right: this.right
      };
    if (n === "top" || n === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: t.width
      };
  }
  drawBackground() {
    const { ctx: t, options: { backgroundColor: n }, left: s, top: i, width: r, height: a } = this;
    n && (t.save(), t.fillStyle = n, t.fillRect(s, i, r, a), t.restore());
  }
  getLineWidthForValue(t) {
    const n = this.options.grid;
    if (!this._isVisible() || !n.display)
      return 0;
    const i = this.ticks.findIndex((r) => r.value === t);
    return i >= 0 ? n.setContext(this.getContext(i)).lineWidth : 0;
  }
  drawGrid(t) {
    const n = this.options.grid, s = this.ctx, i = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let r, a;
    const o = (l, c, h) => {
      !h.width || !h.color || (s.save(), s.lineWidth = h.width, s.strokeStyle = h.color, s.setLineDash(h.borderDash || []), s.lineDashOffset = h.borderDashOffset, s.beginPath(), s.moveTo(l.x, l.y), s.lineTo(c.x, c.y), s.stroke(), s.restore());
    };
    if (n.display)
      for (r = 0, a = i.length; r < a; ++r) {
        const l = i[r];
        n.drawOnChartArea && o({
          x: l.x1,
          y: l.y1
        }, {
          x: l.x2,
          y: l.y2
        }, l), n.drawTicks && o({
          x: l.tx1,
          y: l.ty1
        }, {
          x: l.tx2,
          y: l.ty2
        }, {
          color: l.tickColor,
          width: l.tickWidth,
          borderDash: l.tickBorderDash,
          borderDashOffset: l.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: t, ctx: n, options: { border: s, grid: i } } = this, r = s.setContext(this.getContext()), a = s.display ? r.width : 0;
    if (!a)
      return;
    const o = i.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let c, h, d, u;
    this.isHorizontal() ? (c = Se(t, this.left, a) - a / 2, h = Se(t, this.right, o) + o / 2, d = u = l) : (d = Se(t, this.top, a) - a / 2, u = Se(t, this.bottom, o) + o / 2, c = h = l), n.save(), n.lineWidth = r.width, n.strokeStyle = r.color, n.beginPath(), n.moveTo(c, d), n.lineTo(h, u), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const s = this.ctx, i = this._computeLabelArea();
    i && bn(s, i);
    const r = this.getLabelItems(t);
    for (const a of r) {
      const o = a.options, l = a.font, c = a.label, h = a.textOffset;
      Le(s, c, 0, h, l, o);
    }
    i && yn(s);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: s, reverse: i } } = this;
    if (!s.display)
      return;
    const r = St(s.font), a = At(s.padding), o = s.align;
    let l = r.lineHeight / 2;
    n === "bottom" || n === "center" || rt(n) ? (l += a.bottom, bt(s.text) && (l += r.lineHeight * (s.text.length - 1))) : l += a.top;
    const { titleX: c, titleY: h, maxWidth: d, rotation: u } = Fh(this, l, n, o);
    Le(t, s.text, 0, 0, r, {
      color: s.color,
      maxWidth: d,
      rotation: u,
      textAlign: zh(o, n, i),
      textBaseline: "middle",
      translation: [
        c,
        h
      ]
    });
  }
  draw(t) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t));
  }
  _layers() {
    const t = this.options, n = t.ticks && t.ticks.z || 0, s = et(t.grid && t.grid.z, -1), i = et(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== Oe.prototype.draw ? [
      {
        z: n,
        draw: (r) => {
          this.draw(r);
        }
      }
    ] : [
      {
        z: s,
        draw: (r) => {
          this.drawBackground(), this.drawGrid(r), this.drawTitle();
        }
      },
      {
        z: i,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: n,
        draw: (r) => {
          this.drawLabels(r);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const n = this.chart.getSortedVisibleDatasetMetas(), s = this.axis + "AxisID", i = [];
    let r, a;
    for (r = 0, a = n.length; r < a; ++r) {
      const o = n[r];
      o[s] === this.id && (!t || o.type === t) && i.push(o);
    }
    return i;
  }
  _resolveTickFontOptions(t) {
    const n = this.options.ticks.setContext(this.getContext(t));
    return St(n.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class B0 {
  constructor(t, n, s) {
    this.type = t, this.scope = n, this.override = s, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const n = Object.getPrototypeOf(t);
    let s;
    Vh(n) && (s = this.register(n));
    const i = this.items, r = t.id, a = this.scope + "." + r;
    if (!r)
      throw new Error("class does not have id: " + t);
    return r in i || (i[r] = t, Bh(t, a, s), this.override && yt.override(t.id, t.overrides)), a;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, s = t.id, i = this.scope;
    s in n && delete n[s], i && s in yt[i] && (delete yt[i][s], this.override && delete Re[s]);
  }
}
function Bh(e, t, n) {
  const s = m0(/* @__PURE__ */ Object.create(null), [
    n ? yt.get(n) : {},
    yt.get(t),
    e.defaults
  ]);
  yt.set(t, s), e.defaultRoutes && Hh(t, e.defaultRoutes), e.descriptors && yt.describe(t, e.descriptors);
}
function Hh(e, t) {
  Object.keys(t).forEach((n) => {
    const s = n.split("."), i = s.pop(), r = [
      e
    ].concat(s).join("."), a = t[n].split("."), o = a.pop(), l = a.join(".");
    yt.route(r, i, l, o);
  });
}
function Vh(e) {
  return "id" in e && "defaults" in e;
}
class Wh {
  constructor() {
    this.controllers = new B0(ke, "datasets", !0), this.elements = new B0(ue, "elements"), this.plugins = new B0(Object, "plugins"), this.scales = new B0(Oe, "scales"), this._typedRegistries = [
      this.controllers,
      this.scales,
      this.elements
    ];
  }
  add(...t) {
    this._each("register", t);
  }
  remove(...t) {
    this._each("unregister", t);
  }
  addControllers(...t) {
    this._each("register", t, this.controllers);
  }
  addElements(...t) {
    this._each("register", t, this.elements);
  }
  addPlugins(...t) {
    this._each("register", t, this.plugins);
  }
  addScales(...t) {
    this._each("register", t, this.scales);
  }
  getController(t) {
    return this._get(t, this.controllers, "controller");
  }
  getElement(t) {
    return this._get(t, this.elements, "element");
  }
  getPlugin(t) {
    return this._get(t, this.plugins, "plugin");
  }
  getScale(t) {
    return this._get(t, this.scales, "scale");
  }
  removeControllers(...t) {
    this._each("unregister", t, this.controllers);
  }
  removeElements(...t) {
    this._each("unregister", t, this.elements);
  }
  removePlugins(...t) {
    this._each("unregister", t, this.plugins);
  }
  removeScales(...t) {
    this._each("unregister", t, this.scales);
  }
  _each(t, n, s) {
    [
      ...n
    ].forEach((i) => {
      const r = s || this._getRegistryForType(i);
      s || r.isForType(i) || r === this.plugins && i.id ? this._exec(t, r, i) : ct(i, (a) => {
        const o = s || this._getRegistryForType(a);
        this._exec(t, o, a);
      });
    });
  }
  _exec(t, n, s) {
    const i = _s(t);
    gt(s["before" + i], [], s), n[t](s), gt(s["after" + i], [], s);
  }
  _getRegistryForType(t) {
    for (let n = 0; n < this._typedRegistries.length; n++) {
      const s = this._typedRegistries[n];
      if (s.isForType(t))
        return s;
    }
    return this.plugins;
  }
  _get(t, n, s) {
    const i = n.get(t);
    if (i === void 0)
      throw new Error('"' + t + '" is not a registered ' + s + ".");
    return i;
  }
}
var qt = /* @__PURE__ */ new Wh();
class jh {
  constructor() {
    this._init = void 0;
  }
  notify(t, n, s, i) {
    if (n === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const r = i ? this._descriptors(t).filter(i) : this._descriptors(t), a = this._notify(r, t, n, s);
    return n === "afterDestroy" && (this._notify(r, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), a;
  }
  _notify(t, n, s, i) {
    i = i || {};
    for (const r of t) {
      const a = r.plugin, o = a[s], l = [
        n,
        i,
        r.options
      ];
      if (gt(o, l, a) === !1 && i.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    it(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const n = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), n;
  }
  _createDescriptors(t, n) {
    const s = t && t.config, i = et(s.options && s.options.plugins, {}), r = Yh(s);
    return i === !1 && !n ? [] : Xh(t, r, i, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], s = this._cache, i = (r, a) => r.filter((o) => !a.some((l) => o.plugin.id === l.plugin.id));
    this._notify(i(n, s), t, "stop"), this._notify(i(s, n), t, "start");
  }
}
function Yh(e) {
  const t = {}, n = [], s = Object.keys(qt.plugins.items);
  for (let r = 0; r < s.length; r++)
    n.push(qt.getPlugin(s[r]));
  const i = e.plugins || [];
  for (let r = 0; r < i.length; r++) {
    const a = i[r];
    n.indexOf(a) === -1 && (n.push(a), t[a.id] = !0);
  }
  return {
    plugins: n,
    localIds: t
  };
}
function Uh(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function Xh(e, { plugins: t, localIds: n }, s, i) {
  const r = [], a = e.getContext();
  for (const o of t) {
    const l = o.id, c = Uh(s[l], i);
    c !== null && r.push({
      plugin: o,
      options: Gh(e.config, {
        plugin: o,
        local: n[l]
      }, c, a)
    });
  }
  return r;
}
function Gh(e, { plugin: t, local: n }, s, i) {
  const r = e.pluginScopeKeys(t), a = e.getOptionScopes(s, r);
  return n && t.defaults && a.push(t.defaults), e.createResolver(a, i, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function es(e, t) {
  const n = yt.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function qh(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function Zh(e, t) {
  return e === t ? "_index_" : "_value_";
}
function Ri(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function Kh(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function ns(e, ...t) {
  if (Ri(e))
    return e;
  for (const n of t) {
    const s = n.axis || Kh(n.position) || e.length > 1 && Ri(e[0].toLowerCase());
    if (s)
      return s;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function Li(e, t, n) {
  if (n[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function Jh(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((s) => s.xAxisID === e || s.yAxisID === e);
    if (n.length)
      return Li(e, "x", n[0]) || Li(e, "y", n[0]);
  }
  return {};
}
function Qh(e, t) {
  const n = Re[e.type] || {
    scales: {}
  }, s = t.scales || {}, i = es(e.type, t), r = /* @__PURE__ */ Object.create(null);
  return Object.keys(s).forEach((a) => {
    const o = s[a];
    if (!rt(o))
      return console.error(`Invalid scale configuration for scale: ${a}`);
    if (o._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${a}`);
    const l = ns(a, o, Jh(a, e), yt.scales[o.type]), c = Zh(l, i), h = n.scales || {};
    r[a] = d0(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      o,
      h[l],
      h[c]
    ]);
  }), e.data.datasets.forEach((a) => {
    const o = a.type || e.type, l = a.indexAxis || es(o, t), h = (Re[o] || {}).scales || {};
    Object.keys(h).forEach((d) => {
      const u = qh(d, l), g = a[u + "AxisID"] || u;
      r[g] = r[g] || /* @__PURE__ */ Object.create(null), d0(r[g], [
        {
          axis: u
        },
        s[g],
        h[d]
      ]);
    });
  }), Object.keys(r).forEach((a) => {
    const o = r[a];
    d0(o, [
      yt.scales[o.type],
      yt.scale
    ]);
  }), r;
}
function va(e) {
  const t = e.options || (e.options = {});
  t.plugins = et(t.plugins, {}), t.scales = Qh(e, t);
}
function xa(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function td(e) {
  return e = e || {}, e.data = xa(e.data), va(e), e;
}
const Ei = /* @__PURE__ */ new Map(), _a = /* @__PURE__ */ new Set();
function H0(e, t) {
  let n = Ei.get(e);
  return n || (n = t(), Ei.set(e, n), _a.add(n)), n;
}
const t0 = (e, t, n) => {
  const s = xe(t, n);
  s !== void 0 && e.add(s);
};
class ed {
  constructor(t) {
    this._config = td(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(t) {
    this._config.type = t;
  }
  get data() {
    return this._config.data;
  }
  set data(t) {
    this._config.data = xa(t);
  }
  get options() {
    return this._config.options;
  }
  set options(t) {
    this._config.options = t;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const t = this._config;
    this.clearCache(), va(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return H0(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return H0(`${t}.transition.${n}`, () => [
      [
        `datasets.${t}.transitions.${n}`,
        `transitions.${n}`
      ],
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(t, n) {
    return H0(`${t}-${n}`, () => [
      [
        `datasets.${t}.elements.${n}`,
        `datasets.${t}`,
        `elements.${n}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(t) {
    const n = t.id, s = this.type;
    return H0(`${s}-plugin-${n}`, () => [
      [
        `plugins.${n}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, n) {
    const s = this._scopeCache;
    let i = s.get(t);
    return (!i || n) && (i = /* @__PURE__ */ new Map(), s.set(t, i)), i;
  }
  getOptionScopes(t, n, s) {
    const { options: i, type: r } = this, a = this._cachedScopes(t, s), o = a.get(n);
    if (o)
      return o;
    const l = /* @__PURE__ */ new Set();
    n.forEach((h) => {
      t && (l.add(t), h.forEach((d) => t0(l, t, d))), h.forEach((d) => t0(l, i, d)), h.forEach((d) => t0(l, Re[r] || {}, d)), h.forEach((d) => t0(l, yt, d)), h.forEach((d) => t0(l, Qn, d));
    });
    const c = Array.from(l);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), _a.has(n) && a.set(n, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      Re[n] || {},
      yt.datasets[n] || {},
      {
        type: n
      },
      yt,
      Qn
    ];
  }
  resolveNamedOptions(t, n, s, i = [
    ""
  ]) {
    const r = {
      $shared: !0
    }, { resolver: a, subPrefixes: o } = Oi(this._resolverCache, t, i);
    let l = a;
    if (sd(a, n)) {
      r.$shared = !1, s = _e(s) ? s() : s;
      const c = this.createResolver(t, s, o);
      l = We(a, s, c);
    }
    for (const c of n)
      r[c] = l[c];
    return r;
  }
  createResolver(t, n, s = [
    ""
  ], i) {
    const { resolver: r } = Oi(this._resolverCache, t, s);
    return rt(n) ? We(r, n, void 0, i) : r;
  }
}
function Oi(e, t, n) {
  let s = e.get(t);
  s || (s = /* @__PURE__ */ new Map(), e.set(t, s));
  const i = n.join();
  let r = s.get(i);
  return r || (r = {
    resolver: Ns(t, n),
    subPrefixes: n.filter((o) => !o.toLowerCase().includes("hover"))
  }, s.set(i, r)), r;
}
const nd = (e) => rt(e) && Object.getOwnPropertyNames(e).some((t) => _e(e[t]));
function sd(e, t) {
  const { isScriptable: n, isIndexable: s } = Jr(e);
  for (const i of t) {
    const r = n(i), a = s(i), o = (a || r) && e[i];
    if (r && (_e(o) || nd(o)) || a && bt(o))
      return !0;
  }
  return !1;
}
var id = "4.5.1";
const rd = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function zi(e, t) {
  return e === "top" || e === "bottom" || rd.indexOf(e) === -1 && t === "x";
}
function Fi(e, t) {
  return function(n, s) {
    return n[e] === s[e] ? n[t] - s[t] : n[e] - s[e];
  };
}
function Bi(e) {
  const t = e.chart, n = t.options.animation;
  t.notifyPlugins("afterRender"), gt(n && n.onComplete, [
    e
  ], t);
}
function ad(e) {
  const t = e.chart, n = t.options.animation;
  gt(n && n.onProgress, [
    e
  ], t);
}
function wa(e) {
  return $s() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const Z0 = {}, Hi = (e) => {
  const t = wa(e);
  return Object.values(Z0).filter((n) => n.canvas === t).pop();
};
function od(e, t, n) {
  const s = Object.keys(e);
  for (const i of s) {
    const r = +i;
    if (r >= t) {
      const a = e[i];
      delete e[i], (n > 0 || r > t) && (e[r + n] = a);
    }
  }
}
function ld(e, t, n, s) {
  return !n || e.type === "mouseout" ? null : s ? t : e;
}
class Rs {
  static defaults = yt;
  static instances = Z0;
  static overrides = Re;
  static registry = qt;
  static version = id;
  static getChart = Hi;
  static register(...t) {
    qt.add(...t), Vi();
  }
  static unregister(...t) {
    qt.remove(...t), Vi();
  }
  constructor(t, n) {
    const s = this.config = new ed(n), i = wa(t), r = Hi(i);
    if (r)
      throw new Error("Canvas is already in use. Chart with ID '" + r.id + "' must be destroyed before the canvas with ID '" + r.canvas.id + "' can be reused.");
    const a = s.createResolver(s.chartOptionScopes(), this.getContext());
    this.platform = new (s.platform || Ch(i))(), this.platform.updateConfig(s);
    const o = this.platform.acquireContext(i, a.aspectRatio), l = o && o.canvas, c = l && l.height, h = l && l.width;
    if (this.id = sl(), this.ctx = o, this.canvas = l, this.width = h, this.height = c, this._options = a, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new jh(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = xl((d) => this.update(d), a.resizeDelay || 0), this._dataChanges = [], Z0[this.id] = this, !o || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    re.listen(this, "complete", Bi), re.listen(this, "progress", ad), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: s, height: i, _aspectRatio: r } = this;
    return it(t) ? n && r ? r : i ? s / i : null : t;
  }
  get data() {
    return this.config.data;
  }
  set data(t) {
    this.config.data = t;
  }
  get options() {
    return this._options;
  }
  set options(t) {
    this.config.options = t;
  }
  get registry() {
    return qt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : hi(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return oi(this.canvas, this.ctx), this;
  }
  stop() {
    return re.stop(this), this;
  }
  resize(t, n) {
    re.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: n
    } : this._resize(t, n);
  }
  _resize(t, n) {
    const s = this.options, i = this.canvas, r = s.maintainAspectRatio && this.aspectRatio, a = this.platform.getMaximumSize(i, t, n, r), o = s.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = a.width, this.height = a.height, this._aspectRatio = this.aspectRatio, hi(this, o, !0) && (this.notifyPlugins("resize", {
      size: a
    }), gt(s.onResize, [
      this,
      a
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const n = this.options.scales || {};
    ct(n, (s, i) => {
      s.id = i;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, n = t.scales, s = this.scales, i = Object.keys(s).reduce((a, o) => (a[o] = !1, a), {});
    let r = [];
    n && (r = r.concat(Object.keys(n).map((a) => {
      const o = n[a], l = ns(a, o), c = l === "r", h = l === "x";
      return {
        options: o,
        dposition: c ? "chartArea" : h ? "bottom" : "left",
        dtype: c ? "radialLinear" : h ? "category" : "linear"
      };
    }))), ct(r, (a) => {
      const o = a.options, l = o.id, c = ns(l, o), h = et(o.type, a.dtype);
      (o.position === void 0 || zi(o.position, c) !== zi(a.dposition)) && (o.position = a.dposition), i[l] = !0;
      let d = null;
      if (l in s && s[l].type === h)
        d = s[l];
      else {
        const u = qt.getScale(h);
        d = new u({
          id: l,
          type: h,
          ctx: this.ctx,
          chart: this
        }), s[d.id] = d;
      }
      d.init(o, t);
    }), ct(i, (a, o) => {
      a || delete s[o];
    }), ct(s, (a) => {
      $t.configure(this, a, a.options), $t.addBox(this, a);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, s = t.length;
    if (t.sort((i, r) => i.index - r.index), s > n) {
      for (let i = n; i < s; ++i)
        this._destroyDatasetMeta(i);
      t.splice(n, s - n);
    }
    this._sortedMetasets = t.slice(0).sort(Fi("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: n } } = this;
    t.length > n.length && delete this._stacks, t.forEach((s, i) => {
      n.filter((r) => r === s._dataset).length === 0 && this._destroyDatasetMeta(i);
    });
  }
  buildOrUpdateControllers() {
    const t = [], n = this.data.datasets;
    let s, i;
    for (this._removeUnreferencedMetasets(), s = 0, i = n.length; s < i; s++) {
      const r = n[s];
      let a = this.getDatasetMeta(s);
      const o = r.type || this.config.type;
      if (a.type && a.type !== o && (this._destroyDatasetMeta(s), a = this.getDatasetMeta(s)), a.type = o, a.indexAxis = r.indexAxis || es(o, this.options), a.order = r.order || 0, a.index = s, a.label = "" + r.label, a.visible = this.isDatasetVisible(s), a.controller)
        a.controller.updateIndex(s), a.controller.linkScales();
      else {
        const l = qt.getController(o), { datasetElementType: c, dataElementType: h } = yt.datasets[o];
        Object.assign(l, {
          dataElementType: qt.getElement(h),
          datasetElementType: c && qt.getElement(c)
        }), a.controller = new l(this, s), t.push(a.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    ct(this.data.datasets, (t, n) => {
      this.getDatasetMeta(n).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const n = this.config;
    n.update();
    const s = this._options = n.createResolver(n.chartOptionScopes(), this.getContext()), i = this._animationsDisabled = !s.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const r = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let a = 0;
    for (let c = 0, h = this.data.datasets.length; c < h; c++) {
      const { controller: d } = this.getDatasetMeta(c), u = !i && r.indexOf(d) === -1;
      d.buildOrUpdateElements(u), a = Math.max(+d.getMaxOverflow(), a);
    }
    a = this._minPadding = s.layout.autoPadding ? a : 0, this._updateLayout(a), i || ct(r, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Fi("z", "_idx"));
    const { _active: o, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : o.length && this._updateHoverStyles(o, o, !0), this.render();
  }
  _updateScales() {
    ct(this.scales, (t) => {
      $t.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, n = new Set(Object.keys(this._listeners)), s = new Set(t.events);
    (!Js(n, s) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, n = this._getUniformDataChanges() || [];
    for (const { method: s, start: i, count: r } of n) {
      const a = s === "_removeElements" ? -r : r;
      od(t, i, a);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, s = (r) => new Set(t.filter((a) => a[0] === r).map((a, o) => o + "," + a.splice(1).join(","))), i = s(0);
    for (let r = 1; r < n; r++)
      if (!Js(i, s(r)))
        return;
    return Array.from(i).map((r) => r.split(",")).map((r) => ({
      method: r[1],
      start: +r[2],
      count: +r[3]
    }));
  }
  _updateLayout(t) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    $t.update(this, this.width, this.height, t);
    const n = this.chartArea, s = n.width <= 0 || n.height <= 0;
    this._layers = [], ct(this.boxes, (i) => {
      s && i.position === "chartArea" || (i.configure && i.configure(), this._layers.push(...i._layers()));
    }, this), this._layers.forEach((i, r) => {
      i._idx = r;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: t,
      cancelable: !0
    }) !== !1) {
      for (let n = 0, s = this.data.datasets.length; n < s; ++n)
        this.getDatasetMeta(n).controller.configure();
      for (let n = 0, s = this.data.datasets.length; n < s; ++n)
        this._updateDataset(n, _e(t) ? t({
          datasetIndex: n
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, n) {
    const s = this.getDatasetMeta(t), i = {
      meta: s,
      index: t,
      mode: n,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", i) !== !1 && (s.controller._update(n), i.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", i));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (re.has(this) ? this.attached && !re.running(this) && re.start(this) : (this.draw(), Bi({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: s, height: i } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(s, i);
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const n = this._layers;
    for (t = 0; t < n.length && n[t].z <= 0; ++t)
      n[t].draw(this.chartArea);
    for (this._drawDatasets(); t < n.length; ++t)
      n[t].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(t) {
    const n = this._sortedMetasets, s = [];
    let i, r;
    for (i = 0, r = n.length; i < r; ++i) {
      const a = n[i];
      (!t || a.visible) && s.push(a);
    }
    return s;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(!0);
  }
  _drawDatasets() {
    if (this.notifyPlugins("beforeDatasetsDraw", {
      cancelable: !0
    }) === !1)
      return;
    const t = this.getSortedVisibleDatasetMetas();
    for (let n = t.length - 1; n >= 0; --n)
      this._drawDataset(t[n]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const n = this.ctx, s = {
      meta: t,
      index: t.index,
      cancelable: !0
    }, i = ca(this, t);
    this.notifyPlugins("beforeDatasetDraw", s) !== !1 && (i && bn(n, i), t.controller.draw(), i && yn(n), s.cancelable = !1, this.notifyPlugins("afterDatasetDraw", s));
  }
  isPointInArea(t) {
    return he(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, s, i) {
    const r = rh.modes[n];
    return typeof r == "function" ? r(this, t, s, i) : [];
  }
  getDatasetMeta(t) {
    const n = this.data.datasets[t], s = this._metasets;
    let i = s.filter((r) => r && r._dataset === n).pop();
    return i || (i = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: n && n.order || 0,
      index: t,
      _dataset: n,
      _parsed: [],
      _sorted: !1
    }, s.push(i)), i;
  }
  getContext() {
    return this.$context || (this.$context = we(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(t) {
    const n = this.data.datasets[t];
    if (!n)
      return !1;
    const s = this.getDatasetMeta(t);
    return typeof s.hidden == "boolean" ? !s.hidden : !n.hidden;
  }
  setDatasetVisibility(t, n) {
    const s = this.getDatasetMeta(t);
    s.hidden = !n;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, n, s) {
    const i = s ? "show" : "hide", r = this.getDatasetMeta(t), a = r.controller._resolveAnimations(void 0, i);
    p0(n) ? (r.data[n].hidden = !s, this.update()) : (this.setDatasetVisibility(t, s), a.update(r, {
      visible: s
    }), this.update((o) => o.datasetIndex === t ? i : void 0));
  }
  hide(t, n) {
    this._updateVisibility(t, n, !1);
  }
  show(t, n) {
    this._updateVisibility(t, n, !0);
  }
  _destroyDatasetMeta(t) {
    const n = this._metasets[t];
    n && n.controller && n.controller._destroy(), delete this._metasets[t];
  }
  _stop() {
    let t, n;
    for (this.stop(), re.remove(this), t = 0, n = this.data.datasets.length; t < n; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: n } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), oi(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete Z0[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, n = this.platform, s = (r, a) => {
      n.addEventListener(this, r, a), t[r] = a;
    }, i = (r, a, o) => {
      r.offsetX = a, r.offsetY = o, this._eventHandler(r);
    };
    ct(this.options.events, (r) => s(r, i));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, n = this.platform, s = (l, c) => {
      n.addEventListener(this, l, c), t[l] = c;
    }, i = (l, c) => {
      t[l] && (n.removeEventListener(this, l, c), delete t[l]);
    }, r = (l, c) => {
      this.canvas && this.resize(l, c);
    };
    let a;
    const o = () => {
      i("attach", o), this.attached = !0, this.resize(), s("resize", r), s("detach", a);
    };
    a = () => {
      this.attached = !1, i("resize", r), this._stop(), this._resize(0, 0), s("attach", o);
    }, n.isAttached(this.canvas) ? o() : a();
  }
  unbindEvents() {
    ct(this._listeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._listeners = {}, ct(this._responsiveListeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, n, s) {
    const i = s ? "set" : "remove";
    let r, a, o, l;
    for (n === "dataset" && (r = this.getDatasetMeta(t[0].datasetIndex), r.controller["_" + i + "DatasetHoverStyle"]()), o = 0, l = t.length; o < l; ++o) {
      a = t[o];
      const c = a && this.getDatasetMeta(a.datasetIndex).controller;
      c && c[i + "HoverStyle"](a.element, a.datasetIndex, a.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const n = this._active || [], s = t.map(({ datasetIndex: r, index: a }) => {
      const o = this.getDatasetMeta(r);
      if (!o)
        throw new Error("No dataset found at index " + r);
      return {
        datasetIndex: r,
        element: o.data[a],
        index: a
      };
    });
    !en(s, n) && (this._active = s, this._lastEvent = null, this._updateHoverStyles(s, n));
  }
  notifyPlugins(t, n, s) {
    return this._plugins.notify(this, t, n, s);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((n) => n.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, n, s) {
    const i = this.options.hover, r = (l, c) => l.filter((h) => !c.some((d) => h.datasetIndex === d.datasetIndex && h.index === d.index)), a = r(n, t), o = s ? t : r(t, n);
    a.length && this.updateHoverStyle(a, i.mode, !1), o.length && i.mode && this.updateHoverStyle(o, i.mode, !0);
  }
  _eventHandler(t, n) {
    const s = {
      event: t,
      replay: n,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, i = (a) => (a.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", s, i) === !1)
      return;
    const r = this._handleEvent(t, n, s.inChartArea);
    return s.cancelable = !1, this.notifyPlugins("afterEvent", s, i), (r || s.changed) && this.render(), this;
  }
  _handleEvent(t, n, s) {
    const { _active: i = [], options: r } = this, a = n, o = this._getActiveElements(t, i, s, a), l = cl(t), c = ld(t, this._lastEvent, s, l);
    s && (this._lastEvent = null, gt(r.onHover, [
      t,
      o,
      this
    ], this), l && gt(r.onClick, [
      t,
      o,
      this
    ], this));
    const h = !en(o, i);
    return (h || n) && (this._active = o, this._updateHoverStyles(o, i, n)), this._lastEvent = c, h;
  }
  _getActiveElements(t, n, s, i) {
    if (t.type === "mouseout")
      return [];
    if (!s)
      return n;
    const r = this.options.hover;
    return this.getElementsAtEventForMode(t, r.mode, r, i);
  }
}
function Vi() {
  return ct(Rs.instances, (e) => e._plugins.invalidate());
}
function cd(e, t, n) {
  const { startAngle: s, x: i, y: r, outerRadius: a, innerRadius: o, options: l } = t, { borderWidth: c, borderJoinStyle: h } = l, d = Math.min(c / a, Tt(s - n));
  if (e.beginPath(), e.arc(i, r, a - c / 2, s + d / 2, n - d / 2), o > 0) {
    const u = Math.min(c / o, Tt(s - n));
    e.arc(i, r, o + c / 2, n - u / 2, s + u / 2, !0);
  } else {
    const u = Math.min(c / 2, a * Tt(s - n));
    if (h === "round")
      e.arc(i, r, u, n - lt / 2, s + lt / 2, !0);
    else if (h === "bevel") {
      const g = 2 * u * u, p = -g * Math.cos(n + lt / 2) + i, b = -g * Math.sin(n + lt / 2) + r, m = g * Math.cos(s + lt / 2) + i, y = g * Math.sin(s + lt / 2) + r;
      e.lineTo(p, b), e.lineTo(m, y);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function hd(e, t, n) {
  const { startAngle: s, pixelMargin: i, x: r, y: a, outerRadius: o, innerRadius: l } = t;
  let c = i / o;
  e.beginPath(), e.arc(r, a, o, s - c, n + c), l > i ? (c = i / l, e.arc(r, a, l, n + c, s - c, !0)) : e.arc(r, a, i, n + wt, s - wt), e.closePath(), e.clip();
}
function dd(e) {
  return Cs(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function ud(e, t, n, s) {
  const i = dd(e.options.borderRadius), r = (n - t) / 2, a = Math.min(r, s * t / 2), o = (l) => {
    const c = (n - Math.min(r, l)) * s / 2;
    return Ct(l, 0, Math.min(r, c));
  };
  return {
    outerStart: o(i.outerStart),
    outerEnd: o(i.outerEnd),
    innerStart: Ct(i.innerStart, 0, a),
    innerEnd: Ct(i.innerEnd, 0, a)
  };
}
function Fe(e, t, n, s) {
  return {
    x: n + e * Math.cos(t),
    y: s + e * Math.sin(t)
  };
}
function ln(e, t, n, s, i, r) {
  const { x: a, y: o, startAngle: l, pixelMargin: c, innerRadius: h } = t, d = Math.max(t.outerRadius + s + n - c, 0), u = h > 0 ? h + s + n + c : 0;
  let g = 0;
  const p = i - l;
  if (s) {
    const O = h > 0 ? h - s : 0, D = d > 0 ? d - s : 0, E = (O + D) / 2, B = E !== 0 ? p * E / (E + s) : p;
    g = (p - B) / 2;
  }
  const b = Math.max(1e-3, p * d - n / lt) / d, m = (p - b) / 2, y = l + m + g, _ = i - m - g, { outerStart: x, outerEnd: w, innerStart: v, innerEnd: k } = ud(t, u, d, _ - y), M = d - x, S = d - w, N = y + x / M, P = _ - w / S, R = u + v, C = u + k, A = y + v / R, T = _ - k / C;
  if (e.beginPath(), r) {
    const O = (N + P) / 2;
    if (e.arc(a, o, d, N, O), e.arc(a, o, d, O, P), w > 0) {
      const z = Fe(S, P, a, o);
      e.arc(z.x, z.y, w, P, _ + wt);
    }
    const D = Fe(C, _, a, o);
    if (e.lineTo(D.x, D.y), k > 0) {
      const z = Fe(C, T, a, o);
      e.arc(z.x, z.y, k, _ + wt, T + Math.PI);
    }
    const E = (_ - k / u + (y + v / u)) / 2;
    if (e.arc(a, o, u, _ - k / u, E, !0), e.arc(a, o, u, E, y + v / u, !0), v > 0) {
      const z = Fe(R, A, a, o);
      e.arc(z.x, z.y, v, A + Math.PI, y - wt);
    }
    const B = Fe(M, y, a, o);
    if (e.lineTo(B.x, B.y), x > 0) {
      const z = Fe(M, N, a, o);
      e.arc(z.x, z.y, x, y - wt, N);
    }
  } else {
    e.moveTo(a, o);
    const O = Math.cos(N) * d + a, D = Math.sin(N) * d + o;
    e.lineTo(O, D);
    const E = Math.cos(P) * d + a, B = Math.sin(P) * d + o;
    e.lineTo(E, B);
  }
  e.closePath();
}
function fd(e, t, n, s, i) {
  const { fullCircles: r, startAngle: a, circumference: o } = t;
  let l = t.endAngle;
  if (r) {
    ln(e, t, n, s, l, i);
    for (let c = 0; c < r; ++c)
      e.fill();
    isNaN(o) || (l = a + (o % pt || pt));
  }
  return ln(e, t, n, s, l, i), e.fill(), l;
}
function gd(e, t, n, s, i) {
  const { fullCircles: r, startAngle: a, circumference: o, options: l } = t, { borderWidth: c, borderJoinStyle: h, borderDash: d, borderDashOffset: u, borderRadius: g } = l, p = l.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(d || []), e.lineDashOffset = u, p ? (e.lineWidth = c * 2, e.lineJoin = h || "round") : (e.lineWidth = c, e.lineJoin = h || "bevel");
  let b = t.endAngle;
  if (r) {
    ln(e, t, n, s, b, i);
    for (let m = 0; m < r; ++m)
      e.stroke();
    isNaN(o) || (b = a + (o % pt || pt));
  }
  p && hd(e, t, b), l.selfJoin && b - a >= lt && g === 0 && h !== "miter" && cd(e, t, b), r || (ln(e, t, n, s, b, i), e.stroke());
}
class md extends ue {
  static id = "arc";
  static defaults = {
    borderAlign: "center",
    borderColor: "#fff",
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: void 0,
    borderRadius: 0,
    borderWidth: 2,
    offset: 0,
    spacing: 0,
    angle: void 0,
    circular: !0,
    selfJoin: !1
  };
  static defaultRoutes = {
    backgroundColor: "backgroundColor"
  };
  static descriptors = {
    _scriptable: !0,
    _indexable: (t) => t !== "borderDash"
  };
  circumference;
  endAngle;
  fullCircles;
  innerRadius;
  outerRadius;
  pixelMargin;
  startAngle;
  constructor(t) {
    super(), this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, t && Object.assign(this, t);
  }
  inRange(t, n, s) {
    const i = this.getProps([
      "x",
      "y"
    ], s), { angle: r, distance: a } = Vr(i, {
      x: t,
      y: n
    }), { startAngle: o, endAngle: l, innerRadius: c, outerRadius: h, circumference: d } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], s), u = (this.options.spacing + this.options.borderWidth) / 2, g = et(d, l - o), p = b0(r, o, l) && o !== l, b = g >= pt || p, m = le(a, c + u, h + u);
    return b && m;
  }
  getCenterPoint(t) {
    const { x: n, y: s, startAngle: i, endAngle: r, innerRadius: a, outerRadius: o } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: l, spacing: c } = this.options, h = (i + r) / 2, d = (a + o + c + l) / 2;
    return {
      x: n + Math.cos(h) * d,
      y: s + Math.sin(h) * d
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: n, circumference: s } = this, i = (n.offset || 0) / 4, r = (n.spacing || 0) / 2, a = n.circular;
    if (this.pixelMargin = n.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = s > pt ? Math.floor(s / pt) : 0, s === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const o = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(o) * i, Math.sin(o) * i);
    const l = 1 - Math.sin(Math.min(lt, s || 0)), c = i * l;
    t.fillStyle = n.backgroundColor, t.strokeStyle = n.borderColor, fd(t, this, c, r, a), gd(t, this, c, r, a), t.restore();
  }
}
function ka(e, t, n = t) {
  e.lineCap = et(n.borderCapStyle, t.borderCapStyle), e.setLineDash(et(n.borderDash, t.borderDash)), e.lineDashOffset = et(n.borderDashOffset, t.borderDashOffset), e.lineJoin = et(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = et(n.borderWidth, t.borderWidth), e.strokeStyle = et(n.borderColor, t.borderColor);
}
function pd(e, t, n) {
  e.lineTo(n.x, n.y);
}
function bd(e) {
  return e.stepped ? Dl : e.tension || e.cubicInterpolationMode === "monotone" ? Il : pd;
}
function Ma(e, t, n = {}) {
  const s = e.length, { start: i = 0, end: r = s - 1 } = n, { start: a, end: o } = t, l = Math.max(i, a), c = Math.min(r, o), h = i < a && r < a || i > o && r > o;
  return {
    count: s,
    start: l,
    loop: t.loop,
    ilen: c < l && !h ? s + c - l : c - l
  };
}
function yd(e, t, n, s) {
  const { points: i, options: r } = t, { count: a, start: o, loop: l, ilen: c } = Ma(i, n, s), h = bd(r);
  let { move: d = !0, reverse: u } = s || {}, g, p, b;
  for (g = 0; g <= c; ++g)
    p = i[(o + (u ? c - g : g)) % a], !p.skip && (d ? (e.moveTo(p.x, p.y), d = !1) : h(e, b, p, u, r.stepped), b = p);
  return l && (p = i[(o + (u ? c : 0)) % a], h(e, b, p, u, r.stepped)), !!l;
}
function vd(e, t, n, s) {
  const i = t.points, { count: r, start: a, ilen: o } = Ma(i, n, s), { move: l = !0, reverse: c } = s || {};
  let h = 0, d = 0, u, g, p, b, m, y;
  const _ = (w) => (a + (c ? o - w : w)) % r, x = () => {
    b !== m && (e.lineTo(h, m), e.lineTo(h, b), e.lineTo(h, y));
  };
  for (l && (g = i[_(0)], e.moveTo(g.x, g.y)), u = 0; u <= o; ++u) {
    if (g = i[_(u)], g.skip)
      continue;
    const w = g.x, v = g.y, k = w | 0;
    k === p ? (v < b ? b = v : v > m && (m = v), h = (d * h + w) / ++d) : (x(), e.lineTo(w, v), p = k, d = 0, b = m = v), y = v;
  }
  x();
}
function ss(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? vd : yd;
}
function xd(e) {
  return e.stepped ? dc : e.tension || e.cubicInterpolationMode === "monotone" ? uc : Te;
}
function _d(e, t, n, s) {
  let i = t._path;
  i || (i = t._path = new Path2D(), t.path(i, n, s) && i.closePath()), ka(e, t.options), e.stroke(i);
}
function wd(e, t, n, s) {
  const { segments: i, options: r } = t, a = ss(t);
  for (const o of i)
    ka(e, r, o.style), e.beginPath(), a(e, t, o, {
      start: n,
      end: n + s - 1
    }) && e.closePath(), e.stroke();
}
const kd = typeof Path2D == "function";
function Md(e, t, n, s) {
  kd && !t.options.segment ? _d(e, t, n, s) : wd(e, t, n, s);
}
class _n extends ue {
  static id = "line";
  static defaults = {
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: "miter",
    borderWidth: 3,
    capBezierPoints: !0,
    cubicInterpolationMode: "default",
    fill: !1,
    spanGaps: !1,
    stepped: !1,
    tension: 0
  };
  static defaultRoutes = {
    backgroundColor: "backgroundColor",
    borderColor: "borderColor"
  };
  static descriptors = {
    _scriptable: !0,
    _indexable: (t) => t !== "borderDash" && t !== "fill"
  };
  constructor(t) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t);
  }
  updateControlPoints(t, n) {
    const s = this.options;
    if ((s.tension || s.cubicInterpolationMode === "monotone") && !s.stepped && !this._pointsUpdated) {
      const i = s.spanGaps ? this._loop : this._fullLoop;
      sc(this._points, s, t, i, n), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = yc(this, this.options.segment));
  }
  first() {
    const t = this.segments, n = this.points;
    return t.length && n[t[0].start];
  }
  last() {
    const t = this.segments, n = this.points, s = t.length;
    return s && n[t[s - 1].end];
  }
  interpolate(t, n) {
    const s = this.options, i = t[n], r = this.points, a = la(this, {
      property: n,
      start: i,
      end: i
    });
    if (!a.length)
      return;
    const o = [], l = xd(s);
    let c, h;
    for (c = 0, h = a.length; c < h; ++c) {
      const { start: d, end: u } = a[c], g = r[d], p = r[u];
      if (g === p) {
        o.push(g);
        continue;
      }
      const b = Math.abs((i - g[n]) / (p[n] - g[n])), m = l(g, p, b, s.stepped);
      m[n] = t[n], o.push(m);
    }
    return o.length === 1 ? o[0] : o;
  }
  pathSegment(t, n, s) {
    return ss(this)(t, this, n, s);
  }
  path(t, n, s) {
    const i = this.segments, r = ss(this);
    let a = this._loop;
    n = n || 0, s = s || this.points.length - n;
    for (const o of i)
      a &= r(t, this, o, {
        start: n,
        end: n + s - 1
      });
    return !!a;
  }
  draw(t, n, s, i) {
    const r = this.options || {};
    (this.points || []).length && r.borderWidth && (t.save(), Md(t, this, s, i), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function Wi(e, t, n, s) {
  const i = e.options, { [n]: r } = e.getProps([
    n
  ], s);
  return Math.abs(t - r) < i.radius + i.hitRadius;
}
class Sd extends ue {
  static id = "point";
  parsed;
  skip;
  stop;
  /**
  * @type {any}
  */
  static defaults = {
    borderWidth: 1,
    hitRadius: 1,
    hoverBorderWidth: 1,
    hoverRadius: 4,
    pointStyle: "circle",
    radius: 3,
    rotation: 0
  };
  /**
  * @type {any}
  */
  static defaultRoutes = {
    backgroundColor: "backgroundColor",
    borderColor: "borderColor"
  };
  constructor(t) {
    super(), this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, t && Object.assign(this, t);
  }
  inRange(t, n, s) {
    const i = this.options, { x: r, y: a } = this.getProps([
      "x",
      "y"
    ], s);
    return Math.pow(t - r, 2) + Math.pow(n - a, 2) < Math.pow(i.hitRadius + i.radius, 2);
  }
  inXRange(t, n) {
    return Wi(this, t, "x", n);
  }
  inYRange(t, n) {
    return Wi(this, t, "y", n);
  }
  getCenterPoint(t) {
    const { x: n, y: s } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: n,
      y: s
    };
  }
  size(t) {
    t = t || this.options || {};
    let n = t.radius || 0;
    n = Math.max(n, n && t.hoverRadius || 0);
    const s = n && t.borderWidth || 0;
    return (n + s) * 2;
  }
  draw(t, n) {
    const s = this.options;
    this.skip || s.radius < 0.1 || !he(this, n, this.size(s) / 2) || (t.strokeStyle = s.borderColor, t.lineWidth = s.borderWidth, t.fillStyle = s.backgroundColor, ts(t, s, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Sa(e, t) {
  const { x: n, y: s, base: i, width: r, height: a } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let o, l, c, h, d;
  return e.horizontal ? (d = a / 2, o = Math.min(n, i), l = Math.max(n, i), c = s - d, h = s + d) : (d = r / 2, o = n - d, l = n + d, c = Math.min(s, i), h = Math.max(s, i)), {
    left: o,
    top: c,
    right: l,
    bottom: h
  };
}
function be(e, t, n, s) {
  return e ? 0 : Ct(t, n, s);
}
function Cd(e, t, n) {
  const s = e.options.borderWidth, i = e.borderSkipped, r = Kr(s);
  return {
    t: be(i.top, r.top, 0, n),
    r: be(i.right, r.right, 0, t),
    b: be(i.bottom, r.bottom, 0, n),
    l: be(i.left, r.left, 0, t)
  };
}
function Nd(e, t, n) {
  const { enableBorderRadius: s } = e.getProps([
    "enableBorderRadius"
  ]), i = e.options.borderRadius, r = Ae(i), a = Math.min(t, n), o = e.borderSkipped, l = s || rt(i);
  return {
    topLeft: be(!l || o.top || o.left, r.topLeft, 0, a),
    topRight: be(!l || o.top || o.right, r.topRight, 0, a),
    bottomLeft: be(!l || o.bottom || o.left, r.bottomLeft, 0, a),
    bottomRight: be(!l || o.bottom || o.right, r.bottomRight, 0, a)
  };
}
function Pd(e) {
  const t = Sa(e), n = t.right - t.left, s = t.bottom - t.top, i = Cd(e, n / 2, s / 2), r = Nd(e, n / 2, s / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: n,
      h: s,
      radius: r
    },
    inner: {
      x: t.left + i.l,
      y: t.top + i.t,
      w: n - i.l - i.r,
      h: s - i.t - i.b,
      radius: {
        topLeft: Math.max(0, r.topLeft - Math.max(i.t, i.l)),
        topRight: Math.max(0, r.topRight - Math.max(i.t, i.r)),
        bottomLeft: Math.max(0, r.bottomLeft - Math.max(i.b, i.l)),
        bottomRight: Math.max(0, r.bottomRight - Math.max(i.b, i.r))
      }
    }
  };
}
function On(e, t, n, s) {
  const i = t === null, r = n === null, o = e && !(i && r) && Sa(e, s);
  return o && (i || le(t, o.left, o.right)) && (r || le(n, o.top, o.bottom));
}
function Td(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function $d(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function zn(e, t, n = {}) {
  const s = e.x !== n.x ? -t : 0, i = e.y !== n.y ? -t : 0, r = (e.x + e.w !== n.x + n.w ? t : 0) - s, a = (e.y + e.h !== n.y + n.h ? t : 0) - i;
  return {
    x: e.x + s,
    y: e.y + i,
    w: e.w + r,
    h: e.h + a,
    radius: e.radius
  };
}
class Ad extends ue {
  static id = "bar";
  static defaults = {
    borderSkipped: "start",
    borderWidth: 0,
    borderRadius: 0,
    inflateAmount: "auto",
    pointStyle: void 0
  };
  static defaultRoutes = {
    backgroundColor: "backgroundColor",
    borderColor: "borderColor"
  };
  constructor(t) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, t && Object.assign(this, t);
  }
  draw(t) {
    const { inflateAmount: n, options: { borderColor: s, backgroundColor: i } } = this, { inner: r, outer: a } = Pd(this), o = Td(a.radius) ? y0 : $d;
    t.save(), (a.w !== r.w || a.h !== r.h) && (t.beginPath(), o(t, zn(a, n, r)), t.clip(), o(t, zn(r, -n, a)), t.fillStyle = s, t.fill("evenodd")), t.beginPath(), o(t, zn(r, n)), t.fillStyle = i, t.fill(), t.restore();
  }
  inRange(t, n, s) {
    return On(this, t, n, s);
  }
  inXRange(t, n) {
    return On(this, t, null, n);
  }
  inYRange(t, n) {
    return On(this, null, t, n);
  }
  getCenterPoint(t) {
    const { x: n, y: s, base: i, horizontal: r } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: r ? (n + i) / 2 : n,
      y: r ? s : (s + i) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
var Dd = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcElement: md,
  BarElement: Ad,
  LineElement: _n,
  PointElement: Sd
});
const is = [
  "rgb(54, 162, 235)",
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)"
  // grey
], ji = /* @__PURE__ */ is.map((e) => e.replace("rgb(", "rgba(").replace(")", ", 0.5)"));
function Ca(e) {
  return is[e % is.length];
}
function Na(e) {
  return ji[e % ji.length];
}
function Id(e, t) {
  return e.borderColor = Ca(t), e.backgroundColor = Na(t), ++t;
}
function Rd(e, t) {
  return e.backgroundColor = e.data.map(() => Ca(t++)), t;
}
function Ld(e, t) {
  return e.backgroundColor = e.data.map(() => Na(t++)), t;
}
function Ed(e) {
  let t = 0;
  return (n, s) => {
    const i = e.getDatasetMeta(s).controller;
    i instanceof Ds ? t = Rd(n, t) : i instanceof fa ? t = Ld(n, t) : i && (t = Id(n, t));
  };
}
function Yi(e) {
  let t;
  for (t in e)
    if (e[t].borderColor || e[t].backgroundColor)
      return !0;
  return !1;
}
function Od(e) {
  return e && (e.borderColor || e.backgroundColor);
}
function zd() {
  return yt.borderColor !== "rgba(0,0,0,0.1)" || yt.backgroundColor !== "rgba(0,0,0,0.1)";
}
var Fd = {
  id: "colors",
  defaults: {
    enabled: !0,
    forceOverride: !1
  },
  beforeLayout(e, t, n) {
    if (!n.enabled)
      return;
    const { data: { datasets: s }, options: i } = e.config, { elements: r } = i, a = Yi(s) || Od(i) || r && Yi(r) || zd();
    if (!n.forceOverride && a)
      return;
    const o = Ed(e);
    s.forEach(o);
  }
};
function Bd(e, t, n, s, i) {
  const r = i.samples || s;
  if (r >= n)
    return e.slice(t, t + n);
  const a = [], o = (n - 2) / (r - 2);
  let l = 0;
  const c = t + n - 1;
  let h = t, d, u, g, p, b;
  for (a[l++] = e[h], d = 0; d < r - 2; d++) {
    let m = 0, y = 0, _;
    const x = Math.floor((d + 1) * o) + 1 + t, w = Math.min(Math.floor((d + 2) * o) + 1, n) + t, v = w - x;
    for (_ = x; _ < w; _++)
      m += e[_].x, y += e[_].y;
    m /= v, y /= v;
    const k = Math.floor(d * o) + 1 + t, M = Math.min(Math.floor((d + 1) * o) + 1, n) + t, { x: S, y: N } = e[h];
    for (g = p = -1, _ = k; _ < M; _++)
      p = 0.5 * Math.abs((S - m) * (e[_].y - N) - (S - e[_].x) * (y - N)), p > g && (g = p, u = e[_], b = _);
    a[l++] = u, h = b;
  }
  return a[l++] = e[c], a;
}
function Hd(e, t, n, s) {
  let i = 0, r = 0, a, o, l, c, h, d, u, g, p, b;
  const m = [], y = t + n - 1, _ = e[t].x, w = e[y].x - _;
  for (a = t; a < t + n; ++a) {
    o = e[a], l = (o.x - _) / w * s, c = o.y;
    const v = l | 0;
    if (v === h)
      c < p ? (p = c, d = a) : c > b && (b = c, u = a), i = (r * i + o.x) / ++r;
    else {
      const k = a - 1;
      if (!it(d) && !it(u)) {
        const M = Math.min(d, u), S = Math.max(d, u);
        M !== g && M !== k && m.push({
          ...e[M],
          x: i
        }), S !== g && S !== k && m.push({
          ...e[S],
          x: i
        });
      }
      a > 0 && k !== g && m.push(e[k]), m.push(o), h = v, r = 0, p = b = c, d = u = g = a;
    }
  }
  return m;
}
function Pa(e) {
  if (e._decimated) {
    const t = e._data;
    delete e._decimated, delete e._data, Object.defineProperty(e, "data", {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: t
    });
  }
}
function Ui(e) {
  e.data.datasets.forEach((t) => {
    Pa(t);
  });
}
function Vd(e, t) {
  const n = t.length;
  let s = 0, i;
  const { iScale: r } = e, { min: a, max: o, minDefined: l, maxDefined: c } = r.getUserBounds();
  return l && (s = Ct(ce(t, r.axis, a).lo, 0, n - 1)), c ? i = Ct(ce(t, r.axis, o).hi + 1, s, n) - s : i = n - s, {
    start: s,
    count: i
  };
}
var Wd = {
  id: "decimation",
  defaults: {
    algorithm: "min-max",
    enabled: !1
  },
  beforeElementsUpdate: (e, t, n) => {
    if (!n.enabled) {
      Ui(e);
      return;
    }
    const s = e.width;
    e.data.datasets.forEach((i, r) => {
      const { _data: a, indexAxis: o } = i, l = e.getDatasetMeta(r), c = a || i.data;
      if (i0([
        o,
        e.options.indexAxis
      ]) === "y" || !l.controller.supportsDecimation)
        return;
      const h = e.scales[l.xAxisID];
      if (h.type !== "linear" && h.type !== "time" || e.options.parsing)
        return;
      let { start: d, count: u } = Vd(l, c);
      const g = n.threshold || 4 * s;
      if (u <= g) {
        Pa(i);
        return;
      }
      it(a) && (i._data = c, delete i.data, Object.defineProperty(i, "data", {
        configurable: !0,
        enumerable: !0,
        get: function() {
          return this._decimated;
        },
        set: function(b) {
          this._data = b;
        }
      }));
      let p;
      switch (n.algorithm) {
        case "lttb":
          p = Bd(c, d, u, s, n);
          break;
        case "min-max":
          p = Hd(c, d, u, s);
          break;
        default:
          throw new Error(`Unsupported decimation algorithm '${n.algorithm}'`);
      }
      i._decimated = p;
    });
  },
  destroy(e) {
    Ui(e);
  }
};
function jd(e, t, n) {
  const s = e.segments, i = e.points, r = t.points, a = [];
  for (const o of s) {
    let { start: l, end: c } = o;
    c = wn(l, c, i);
    const h = rs(n, i[l], i[c], o.loop);
    if (!t.segments) {
      a.push({
        source: o,
        target: h,
        start: i[l],
        end: i[c]
      });
      continue;
    }
    const d = la(t, h);
    for (const u of d) {
      const g = rs(n, r[u.start], r[u.end], u.loop), p = oa(o, i, g);
      for (const b of p)
        a.push({
          source: b,
          target: u,
          start: {
            [n]: Xi(h, g, "start", Math.max)
          },
          end: {
            [n]: Xi(h, g, "end", Math.min)
          }
        });
    }
  }
  return a;
}
function rs(e, t, n, s) {
  if (s)
    return;
  let i = t[e], r = n[e];
  return e === "angle" && (i = Tt(i), r = Tt(r)), {
    property: e,
    start: i,
    end: r
  };
}
function Yd(e, t) {
  const { x: n = null, y: s = null } = e || {}, i = t.points, r = [];
  return t.segments.forEach(({ start: a, end: o }) => {
    o = wn(a, o, i);
    const l = i[a], c = i[o];
    s !== null ? (r.push({
      x: l.x,
      y: s
    }), r.push({
      x: c.x,
      y: s
    })) : n !== null && (r.push({
      x: n,
      y: l.y
    }), r.push({
      x: n,
      y: c.y
    }));
  }), r;
}
function wn(e, t, n) {
  for (; t > e; t--) {
    const s = n[t];
    if (!isNaN(s.x) && !isNaN(s.y))
      break;
  }
  return t;
}
function Xi(e, t, n, s) {
  return e && t ? s(e[n], t[n]) : e ? e[n] : t ? t[n] : 0;
}
function Ta(e, t) {
  let n = [], s = !1;
  return bt(e) ? (s = !0, n = e) : n = Yd(e, t), n.length ? new _n({
    points: n,
    options: {
      tension: 0
    },
    _loop: s,
    _fullLoop: s
  }) : null;
}
function Gi(e) {
  return e && e.fill !== !1;
}
function Ud(e, t, n) {
  let i = e[t].fill;
  const r = [
    t
  ];
  let a;
  if (!n)
    return i;
  for (; i !== !1 && r.indexOf(i) === -1; ) {
    if (!xt(i))
      return i;
    if (a = e[i], !a)
      return !1;
    if (a.visible)
      return i;
    r.push(i), i = a.fill;
  }
  return !1;
}
function Xd(e, t, n) {
  const s = Kd(e);
  if (rt(s))
    return isNaN(s.value) ? !1 : s;
  let i = parseFloat(s);
  return xt(i) && Math.floor(i) === i ? Gd(s[0], t, i, n) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(s) >= 0 && s;
}
function Gd(e, t, n, s) {
  return (e === "-" || e === "+") && (n = t + n), n === t || n < 0 || n >= s ? !1 : n;
}
function qd(e, t) {
  let n = null;
  return e === "start" ? n = t.bottom : e === "end" ? n = t.top : rt(e) ? n = t.getPixelForValue(e.value) : t.getBasePixel && (n = t.getBasePixel()), n;
}
function Zd(e, t, n) {
  let s;
  return e === "start" ? s = n : e === "end" ? s = t.options.reverse ? t.min : t.max : rt(e) ? s = e.value : s = t.getBaseValue(), s;
}
function Kd(e) {
  const t = e.options, n = t.fill;
  let s = et(n && n.target, n);
  return s === void 0 && (s = !!t.backgroundColor), s === !1 || s === null ? !1 : s === !0 ? "origin" : s;
}
function Jd(e) {
  const { scale: t, index: n, line: s } = e, i = [], r = s.segments, a = s.points, o = Qd(t, n);
  o.push(Ta({
    x: null,
    y: t.bottom
  }, s));
  for (let l = 0; l < r.length; l++) {
    const c = r[l];
    for (let h = c.start; h <= c.end; h++)
      tu(i, a[h], o);
  }
  return new _n({
    points: i,
    options: {}
  });
}
function Qd(e, t) {
  const n = [], s = e.getMatchingVisibleMetas("line");
  for (let i = 0; i < s.length; i++) {
    const r = s[i];
    if (r.index === t)
      break;
    r.hidden || n.unshift(r.dataset);
  }
  return n;
}
function tu(e, t, n) {
  const s = [];
  for (let i = 0; i < n.length; i++) {
    const r = n[i], { first: a, last: o, point: l } = eu(r, t, "x");
    if (!(!l || a && o)) {
      if (a)
        s.unshift(l);
      else if (e.push(l), !o)
        break;
    }
  }
  e.push(...s);
}
function eu(e, t, n) {
  const s = e.interpolate(t, n);
  if (!s)
    return {};
  const i = s[n], r = e.segments, a = e.points;
  let o = !1, l = !1;
  for (let c = 0; c < r.length; c++) {
    const h = r[c], d = a[h.start][n], u = a[h.end][n];
    if (le(i, d, u)) {
      o = i === d, l = i === u;
      break;
    }
  }
  return {
    first: o,
    last: l,
    point: s
  };
}
class $a {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, n, s) {
    const { x: i, y: r, radius: a } = this;
    return n = n || {
      start: 0,
      end: pt
    }, t.arc(i, r, a, n.end, n.start, !0), !s.bounds;
  }
  interpolate(t) {
    const { x: n, y: s, radius: i } = this, r = t.angle;
    return {
      x: n + Math.cos(r) * i,
      y: s + Math.sin(r) * i,
      angle: r
    };
  }
}
function nu(e) {
  const { chart: t, fill: n, line: s } = e;
  if (xt(n))
    return su(t, n);
  if (n === "stack")
    return Jd(e);
  if (n === "shape")
    return !0;
  const i = iu(e);
  return i instanceof $a ? i : Ta(i, s);
}
function su(e, t) {
  const n = e.getDatasetMeta(t);
  return n && e.isDatasetVisible(t) ? n.dataset : null;
}
function iu(e) {
  return (e.scale || {}).getPointPositionForValue ? au(e) : ru(e);
}
function ru(e) {
  const { scale: t = {}, fill: n } = e, s = qd(n, t);
  if (xt(s)) {
    const i = t.isHorizontal();
    return {
      x: i ? s : null,
      y: i ? null : s
    };
  }
  return null;
}
function au(e) {
  const { scale: t, fill: n } = e, s = t.options, i = t.getLabels().length, r = s.reverse ? t.max : t.min, a = Zd(n, t, r), o = [];
  if (s.grid.circular) {
    const l = t.getPointPositionForValue(0, r);
    return new $a({
      x: l.x,
      y: l.y,
      radius: t.getDistanceFromCenterForValue(a)
    });
  }
  for (let l = 0; l < i; ++l)
    o.push(t.getPointPositionForValue(l, a));
  return o;
}
function Fn(e, t, n) {
  const s = nu(t), { chart: i, index: r, line: a, scale: o, axis: l } = t, c = a.options, h = c.fill, d = c.backgroundColor, { above: u = d, below: g = d } = h || {}, p = i.getDatasetMeta(r), b = ca(i, p);
  s && a.points.length && (bn(e, n), ou(e, {
    line: a,
    target: s,
    above: u,
    below: g,
    area: n,
    scale: o,
    axis: l,
    clip: b
  }), yn(e));
}
function ou(e, t) {
  const { line: n, target: s, above: i, below: r, area: a, scale: o, clip: l } = t, c = n._loop ? "angle" : t.axis;
  e.save();
  let h = r;
  r !== i && (c === "x" ? (qi(e, s, a.top), Bn(e, {
    line: n,
    target: s,
    color: i,
    scale: o,
    property: c,
    clip: l
  }), e.restore(), e.save(), qi(e, s, a.bottom)) : c === "y" && (Zi(e, s, a.left), Bn(e, {
    line: n,
    target: s,
    color: r,
    scale: o,
    property: c,
    clip: l
  }), e.restore(), e.save(), Zi(e, s, a.right), h = i)), Bn(e, {
    line: n,
    target: s,
    color: h,
    scale: o,
    property: c,
    clip: l
  }), e.restore();
}
function qi(e, t, n) {
  const { segments: s, points: i } = t;
  let r = !0, a = !1;
  e.beginPath();
  for (const o of s) {
    const { start: l, end: c } = o, h = i[l], d = i[wn(l, c, i)];
    r ? (e.moveTo(h.x, h.y), r = !1) : (e.lineTo(h.x, n), e.lineTo(h.x, h.y)), a = !!t.pathSegment(e, o, {
      move: a
    }), a ? e.closePath() : e.lineTo(d.x, n);
  }
  e.lineTo(t.first().x, n), e.closePath(), e.clip();
}
function Zi(e, t, n) {
  const { segments: s, points: i } = t;
  let r = !0, a = !1;
  e.beginPath();
  for (const o of s) {
    const { start: l, end: c } = o, h = i[l], d = i[wn(l, c, i)];
    r ? (e.moveTo(h.x, h.y), r = !1) : (e.lineTo(n, h.y), e.lineTo(h.x, h.y)), a = !!t.pathSegment(e, o, {
      move: a
    }), a ? e.closePath() : e.lineTo(n, d.y);
  }
  e.lineTo(n, t.first().y), e.closePath(), e.clip();
}
function Bn(e, t) {
  const { line: n, target: s, property: i, color: r, scale: a, clip: o } = t, l = jd(n, s, i);
  for (const { source: c, target: h, start: d, end: u } of l) {
    const { style: { backgroundColor: g = r } = {} } = c, p = s !== !0;
    e.save(), e.fillStyle = g, lu(e, a, o, p && rs(i, d, u)), e.beginPath();
    const b = !!n.pathSegment(e, c);
    let m;
    if (p) {
      b ? e.closePath() : Ki(e, s, u, i);
      const y = !!s.pathSegment(e, h, {
        move: b,
        reverse: !0
      });
      m = b && y, m || Ki(e, s, d, i);
    }
    e.closePath(), e.fill(m ? "evenodd" : "nonzero"), e.restore();
  }
}
function lu(e, t, n, s) {
  const i = t.chart.chartArea, { property: r, start: a, end: o } = s || {};
  if (r === "x" || r === "y") {
    let l, c, h, d;
    r === "x" ? (l = a, c = i.top, h = o, d = i.bottom) : (l = i.left, c = a, h = i.right, d = o), e.beginPath(), n && (l = Math.max(l, n.left), h = Math.min(h, n.right), c = Math.max(c, n.top), d = Math.min(d, n.bottom)), e.rect(l, c, h - l, d - c), e.clip();
  }
}
function Ki(e, t, n, s) {
  const i = t.interpolate(n, s);
  i && e.lineTo(i.x, i.y);
}
var cu = {
  id: "filler",
  afterDatasetsUpdate(e, t, n) {
    const s = (e.data.datasets || []).length, i = [];
    let r, a, o, l;
    for (a = 0; a < s; ++a)
      r = e.getDatasetMeta(a), o = r.dataset, l = null, o && o.options && o instanceof _n && (l = {
        visible: e.isDatasetVisible(a),
        index: a,
        fill: Xd(o, a, s),
        chart: e,
        axis: r.controller.options.indexAxis,
        scale: r.vScale,
        line: o
      }), r.$filler = l, i.push(l);
    for (a = 0; a < s; ++a)
      l = i[a], !(!l || l.fill === !1) && (l.fill = Ud(i, a, n.propagate));
  },
  beforeDraw(e, t, n) {
    const s = n.drawTime === "beforeDraw", i = e.getSortedVisibleDatasetMetas(), r = e.chartArea;
    for (let a = i.length - 1; a >= 0; --a) {
      const o = i[a].$filler;
      o && (o.line.updateControlPoints(r, o.axis), s && o.fill && Fn(e.ctx, o, r));
    }
  },
  beforeDatasetsDraw(e, t, n) {
    if (n.drawTime !== "beforeDatasetsDraw")
      return;
    const s = e.getSortedVisibleDatasetMetas();
    for (let i = s.length - 1; i >= 0; --i) {
      const r = s[i].$filler;
      Gi(r) && Fn(e.ctx, r, e.chartArea);
    }
  },
  beforeDatasetDraw(e, t, n) {
    const s = t.meta.$filler;
    !Gi(s) || n.drawTime !== "beforeDatasetDraw" || Fn(e.ctx, s, e.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const Ji = (e, t) => {
  let { boxHeight: n = t, boxWidth: s = t } = e;
  return e.usePointStyle && (n = Math.min(n, t), s = e.pointStyleWidth || Math.min(s, t)), {
    boxWidth: s,
    boxHeight: n,
    itemHeight: Math.max(t, n)
  };
}, hu = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class Qi extends ue {
  constructor(t) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, n, s) {
    this.maxWidth = t, this.maxHeight = n, this._margins = s, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const t = this.options.labels || {};
    let n = gt(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (n = n.filter((s) => t.filter(s, this.chart.data))), t.sort && (n = n.sort((s, i) => t.sort(s, i, this.chart.data))), this.options.reverse && n.reverse(), this.legendItems = n;
  }
  fit() {
    const { options: t, ctx: n } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const s = t.labels, i = St(s.font), r = i.size, a = this._computeTitleHeight(), { boxWidth: o, itemHeight: l } = Ji(s, r);
    let c, h;
    n.font = i.string, this.isHorizontal() ? (c = this.maxWidth, h = this._fitRows(a, r, o, l) + 10) : (h = this.maxHeight, c = this._fitCols(a, i, o, l) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(h, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, n, s, i) {
    const { ctx: r, maxWidth: a, options: { labels: { padding: o } } } = this, l = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], h = i + o;
    let d = t;
    r.textAlign = "left", r.textBaseline = "middle";
    let u = -1, g = -h;
    return this.legendItems.forEach((p, b) => {
      const m = s + n / 2 + r.measureText(p.text).width;
      (b === 0 || c[c.length - 1] + m + 2 * o > a) && (d += h, c[c.length - (b > 0 ? 0 : 1)] = 0, g += h, u++), l[b] = {
        left: 0,
        top: g,
        row: u,
        width: m,
        height: i
      }, c[c.length - 1] += m + o;
    }), d;
  }
  _fitCols(t, n, s, i) {
    const { ctx: r, maxHeight: a, options: { labels: { padding: o } } } = this, l = this.legendHitBoxes = [], c = this.columnSizes = [], h = a - t;
    let d = o, u = 0, g = 0, p = 0, b = 0;
    return this.legendItems.forEach((m, y) => {
      const { itemWidth: _, itemHeight: x } = du(s, n, r, m, i);
      y > 0 && g + x + 2 * o > h && (d += u + o, c.push({
        width: u,
        height: g
      }), p += u + o, b++, u = g = 0), l[y] = {
        left: p,
        top: g,
        col: b,
        width: _,
        height: x
      }, u = Math.max(u, _), g += x + o;
    }), d += u, c.push({
      width: u,
      height: g
    }), d;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: s, labels: { padding: i }, rtl: r } } = this, a = Be(r, this.left, this.width);
    if (this.isHorizontal()) {
      let o = 0, l = Pt(s, this.left + i, this.right - this.lineWidths[o]);
      for (const c of n)
        o !== c.row && (o = c.row, l = Pt(s, this.left + i, this.right - this.lineWidths[o])), c.top += this.top + t + i, c.left = a.leftForLtr(a.x(l), c.width), l += c.width + i;
    } else {
      let o = 0, l = Pt(s, this.top + t + i, this.bottom - this.columnSizes[o].height);
      for (const c of n)
        c.col !== o && (o = c.col, l = Pt(s, this.top + t + i, this.bottom - this.columnSizes[o].height)), c.top = l, c.left += this.left + i, c.left = a.leftForLtr(a.x(c.left), c.width), l += c.height + i;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      bn(t, this), this._draw(), yn(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: n, lineWidths: s, ctx: i } = this, { align: r, labels: a } = t, o = yt.color, l = Be(t.rtl, this.left, this.width), c = St(a.font), { padding: h } = a, d = c.size, u = d / 2;
    let g;
    this.drawTitle(), i.textAlign = l.textAlign("left"), i.textBaseline = "middle", i.lineWidth = 0.5, i.font = c.string;
    const { boxWidth: p, boxHeight: b, itemHeight: m } = Ji(a, d), y = function(k, M, S) {
      if (isNaN(p) || p <= 0 || isNaN(b) || b < 0)
        return;
      i.save();
      const N = et(S.lineWidth, 1);
      if (i.fillStyle = et(S.fillStyle, o), i.lineCap = et(S.lineCap, "butt"), i.lineDashOffset = et(S.lineDashOffset, 0), i.lineJoin = et(S.lineJoin, "miter"), i.lineWidth = N, i.strokeStyle = et(S.strokeStyle, o), i.setLineDash(et(S.lineDash, [])), a.usePointStyle) {
        const P = {
          radius: b * Math.SQRT2 / 2,
          pointStyle: S.pointStyle,
          rotation: S.rotation,
          borderWidth: N
        }, R = l.xPlus(k, p / 2), C = M + u;
        Zr(i, P, R, C, a.pointStyleWidth && p);
      } else {
        const P = M + Math.max((d - b) / 2, 0), R = l.leftForLtr(k, p), C = Ae(S.borderRadius);
        i.beginPath(), Object.values(C).some((A) => A !== 0) ? y0(i, {
          x: R,
          y: P,
          w: p,
          h: b,
          radius: C
        }) : i.rect(R, P, p, b), i.fill(), N !== 0 && i.stroke();
      }
      i.restore();
    }, _ = function(k, M, S) {
      Le(i, S.text, k, M + m / 2, c, {
        strikethrough: S.hidden,
        textAlign: l.textAlign(S.textAlign)
      });
    }, x = this.isHorizontal(), w = this._computeTitleHeight();
    x ? g = {
      x: Pt(r, this.left + h, this.right - s[0]),
      y: this.top + h + w,
      line: 0
    } : g = {
      x: this.left + h,
      y: Pt(r, this.top + w + h, this.bottom - n[0].height),
      line: 0
    }, ia(this.ctx, t.textDirection);
    const v = m + h;
    this.legendItems.forEach((k, M) => {
      i.strokeStyle = k.fontColor, i.fillStyle = k.fontColor;
      const S = i.measureText(k.text).width, N = l.textAlign(k.textAlign || (k.textAlign = a.textAlign)), P = p + u + S;
      let R = g.x, C = g.y;
      l.setWidth(this.width), x ? M > 0 && R + P + h > this.right && (C = g.y += v, g.line++, R = g.x = Pt(r, this.left + h, this.right - s[g.line])) : M > 0 && C + v > this.bottom && (R = g.x = R + n[g.line].width + h, g.line++, C = g.y = Pt(r, this.top + w + h, this.bottom - n[g.line].height));
      const A = l.x(R);
      if (y(A, C, k), R = _l(N, R + p + u, x ? R + P : this.right, t.rtl), _(l.x(R), C, k), x)
        g.x += P + h;
      else if (typeof k.text != "string") {
        const T = c.lineHeight;
        g.y += Aa(k, T) + h;
      } else
        g.y += v;
    }), ra(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, n = t.title, s = St(n.font), i = At(n.padding);
    if (!n.display)
      return;
    const r = Be(t.rtl, this.left, this.width), a = this.ctx, o = n.position, l = s.size / 2, c = i.top + l;
    let h, d = this.left, u = this.width;
    if (this.isHorizontal())
      u = Math.max(...this.lineWidths), h = this.top + c, d = Pt(t.align, d, this.right - u);
    else {
      const p = this.columnSizes.reduce((b, m) => Math.max(b, m.height), 0);
      h = c + Pt(t.align, this.top, this.bottom - p - t.labels.padding - this._computeTitleHeight());
    }
    const g = Pt(o, d, d + u);
    a.textAlign = r.textAlign(Ms(o)), a.textBaseline = "middle", a.strokeStyle = n.color, a.fillStyle = n.color, a.font = s.string, Le(a, n.text, g, h, s);
  }
  _computeTitleHeight() {
    const t = this.options.title, n = St(t.font), s = At(t.padding);
    return t.display ? n.lineHeight + s.height : 0;
  }
  _getLegendItemAt(t, n) {
    let s, i, r;
    if (le(t, this.left, this.right) && le(n, this.top, this.bottom)) {
      for (r = this.legendHitBoxes, s = 0; s < r.length; ++s)
        if (i = r[s], le(t, i.left, i.left + i.width) && le(n, i.top, i.top + i.height))
          return this.legendItems[s];
    }
    return null;
  }
  handleEvent(t) {
    const n = this.options;
    if (!gu(t.type, n))
      return;
    const s = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const i = this._hoveredItem, r = hu(i, s);
      i && !r && gt(n.onLeave, [
        t,
        i,
        this
      ], this), this._hoveredItem = s, s && !r && gt(n.onHover, [
        t,
        s,
        this
      ], this);
    } else s && gt(n.onClick, [
      t,
      s,
      this
    ], this);
  }
}
function du(e, t, n, s, i) {
  const r = uu(s, e, t, n), a = fu(i, s, t.lineHeight);
  return {
    itemWidth: r,
    itemHeight: a
  };
}
function uu(e, t, n, s) {
  let i = e.text;
  return i && typeof i != "string" && (i = i.reduce((r, a) => r.length > a.length ? r : a)), t + n.size / 2 + s.measureText(i).width;
}
function fu(e, t, n) {
  let s = e;
  return typeof t.text != "string" && (s = Aa(t, n)), s;
}
function Aa(e, t) {
  const n = e.text ? e.text.length : 0;
  return t * n;
}
function gu(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var mu = {
  id: "legend",
  _element: Qi,
  start(e, t, n) {
    const s = e.legend = new Qi({
      ctx: e.ctx,
      options: n,
      chart: e
    });
    $t.configure(e, s, n), $t.addBox(e, s);
  },
  stop(e) {
    $t.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, n) {
    const s = e.legend;
    $t.configure(e, s, n), s.options = n;
  },
  afterUpdate(e) {
    const t = e.legend;
    t.buildLabels(), t.adjustHitBoxes();
  },
  afterEvent(e, t) {
    t.replay || e.legend.handleEvent(t.event);
  },
  defaults: {
    display: !0,
    position: "top",
    align: "center",
    fullSize: !0,
    reverse: !1,
    weight: 1e3,
    onClick(e, t, n) {
      const s = t.datasetIndex, i = n.chart;
      i.isDatasetVisible(s) ? (i.hide(s), t.hidden = !0) : (i.show(s), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (e) => e.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(e) {
        const t = e.data.datasets, { labels: { usePointStyle: n, pointStyle: s, textAlign: i, color: r, useBorderRadius: a, borderRadius: o } } = e.legend.options;
        return e._getSortedDatasetMetas().map((l) => {
          const c = l.controller.getStyle(n ? 0 : void 0), h = At(c.borderWidth);
          return {
            text: t[l.index].label,
            fillStyle: c.backgroundColor,
            fontColor: r,
            hidden: !l.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (h.width + h.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: s || c.pointStyle,
            rotation: c.rotation,
            textAlign: i || c.textAlign,
            borderRadius: a && (o || c.borderRadius),
            datasetIndex: l.index
          };
        }, this);
      }
    },
    title: {
      color: (e) => e.chart.options.color,
      display: !1,
      position: "center",
      text: ""
    }
  },
  descriptors: {
    _scriptable: (e) => !e.startsWith("on"),
    labels: {
      _scriptable: (e) => ![
        "generateLabels",
        "filter",
        "sort"
      ].includes(e)
    }
  }
};
class Ls extends ue {
  constructor(t) {
    super(), this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, n) {
    const s = this.options;
    if (this.left = 0, this.top = 0, !s.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = t, this.height = this.bottom = n;
    const i = bt(s.text) ? s.text.length : 1;
    this._padding = At(s.padding);
    const r = i * St(s.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = r : this.width = r;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: n, left: s, bottom: i, right: r, options: a } = this, o = a.align;
    let l = 0, c, h, d;
    return this.isHorizontal() ? (h = Pt(o, s, r), d = n + t, c = r - s) : (a.position === "left" ? (h = s + t, d = Pt(o, i, n), l = lt * -0.5) : (h = r - t, d = Pt(o, n, i), l = lt * 0.5), c = i - n), {
      titleX: h,
      titleY: d,
      maxWidth: c,
      rotation: l
    };
  }
  draw() {
    const t = this.ctx, n = this.options;
    if (!n.display)
      return;
    const s = St(n.font), r = s.lineHeight / 2 + this._padding.top, { titleX: a, titleY: o, maxWidth: l, rotation: c } = this._drawArgs(r);
    Le(t, n.text, 0, 0, s, {
      color: n.color,
      maxWidth: l,
      rotation: c,
      textAlign: Ms(n.align),
      textBaseline: "middle",
      translation: [
        a,
        o
      ]
    });
  }
}
function pu(e, t) {
  const n = new Ls({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  $t.configure(e, n, t), $t.addBox(e, n), e.titleBlock = n;
}
var bu = {
  id: "title",
  _element: Ls,
  start(e, t, n) {
    pu(e, n);
  },
  stop(e) {
    const t = e.titleBlock;
    $t.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, n) {
    const s = e.titleBlock;
    $t.configure(e, s, n), s.options = n;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "bold"
    },
    fullSize: !0,
    padding: 10,
    position: "top",
    text: "",
    weight: 2e3
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const V0 = /* @__PURE__ */ new WeakMap();
var yu = {
  id: "subtitle",
  start(e, t, n) {
    const s = new Ls({
      ctx: e.ctx,
      options: n,
      chart: e
    });
    $t.configure(e, s, n), $t.addBox(e, s), V0.set(e, s);
  },
  stop(e) {
    $t.removeBox(e, V0.get(e)), V0.delete(e);
  },
  beforeUpdate(e, t, n) {
    const s = V0.get(e);
    $t.configure(e, s, n), s.options = n;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "normal"
    },
    fullSize: !0,
    padding: 0,
    position: "top",
    text: "",
    weight: 1500
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const a0 = {
  average(e) {
    if (!e.length)
      return !1;
    let t, n, s = /* @__PURE__ */ new Set(), i = 0, r = 0;
    for (t = 0, n = e.length; t < n; ++t) {
      const o = e[t].element;
      if (o && o.hasValue()) {
        const l = o.tooltipPosition();
        s.add(l.x), i += l.y, ++r;
      }
    }
    return r === 0 || s.size === 0 ? !1 : {
      x: [
        ...s
      ].reduce((o, l) => o + l) / s.size,
      y: i / r
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let n = t.x, s = t.y, i = Number.POSITIVE_INFINITY, r, a, o;
    for (r = 0, a = e.length; r < a; ++r) {
      const l = e[r].element;
      if (l && l.hasValue()) {
        const c = l.getCenterPoint(), h = Jn(t, c);
        h < i && (i = h, o = l);
      }
    }
    if (o) {
      const l = o.tooltipPosition();
      n = l.x, s = l.y;
    }
    return {
      x: n,
      y: s
    };
  }
};
function Gt(e, t) {
  return t && (bt(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function ae(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function vu(e, t) {
  const { element: n, datasetIndex: s, index: i } = t, r = e.getDatasetMeta(s).controller, { label: a, value: o } = r.getLabelAndValue(i);
  return {
    chart: e,
    label: a,
    parsed: r.getParsed(i),
    raw: e.data.datasets[s].data[i],
    formattedValue: o,
    dataset: r.getDataset(),
    dataIndex: i,
    datasetIndex: s,
    element: n
  };
}
function tr(e, t) {
  const n = e.chart.ctx, { body: s, footer: i, title: r } = e, { boxWidth: a, boxHeight: o } = t, l = St(t.bodyFont), c = St(t.titleFont), h = St(t.footerFont), d = r.length, u = i.length, g = s.length, p = At(t.padding);
  let b = p.height, m = 0, y = s.reduce((w, v) => w + v.before.length + v.lines.length + v.after.length, 0);
  if (y += e.beforeBody.length + e.afterBody.length, d && (b += d * c.lineHeight + (d - 1) * t.titleSpacing + t.titleMarginBottom), y) {
    const w = t.displayColors ? Math.max(o, l.lineHeight) : l.lineHeight;
    b += g * w + (y - g) * l.lineHeight + (y - 1) * t.bodySpacing;
  }
  u && (b += t.footerMarginTop + u * h.lineHeight + (u - 1) * t.footerSpacing);
  let _ = 0;
  const x = function(w) {
    m = Math.max(m, n.measureText(w).width + _);
  };
  return n.save(), n.font = c.string, ct(e.title, x), n.font = l.string, ct(e.beforeBody.concat(e.afterBody), x), _ = t.displayColors ? a + 2 + t.boxPadding : 0, ct(s, (w) => {
    ct(w.before, x), ct(w.lines, x), ct(w.after, x);
  }), _ = 0, n.font = h.string, ct(e.footer, x), n.restore(), m += p.width, {
    width: m,
    height: b
  };
}
function xu(e, t) {
  const { y: n, height: s } = t;
  return n < s / 2 ? "top" : n > e.height - s / 2 ? "bottom" : "center";
}
function _u(e, t, n, s) {
  const { x: i, width: r } = s, a = n.caretSize + n.caretPadding;
  if (e === "left" && i + r + a > t.width || e === "right" && i - r - a < 0)
    return !0;
}
function wu(e, t, n, s) {
  const { x: i, width: r } = n, { width: a, chartArea: { left: o, right: l } } = e;
  let c = "center";
  return s === "center" ? c = i <= (o + l) / 2 ? "left" : "right" : i <= r / 2 ? c = "left" : i >= a - r / 2 && (c = "right"), _u(c, e, t, n) && (c = "center"), c;
}
function er(e, t, n) {
  const s = n.yAlign || t.yAlign || xu(e, n);
  return {
    xAlign: n.xAlign || t.xAlign || wu(e, t, n, s),
    yAlign: s
  };
}
function ku(e, t) {
  let { x: n, width: s } = e;
  return t === "right" ? n -= s : t === "center" && (n -= s / 2), n;
}
function Mu(e, t, n) {
  let { y: s, height: i } = e;
  return t === "top" ? s += n : t === "bottom" ? s -= i + n : s -= i / 2, s;
}
function nr(e, t, n, s) {
  const { caretSize: i, caretPadding: r, cornerRadius: a } = e, { xAlign: o, yAlign: l } = n, c = i + r, { topLeft: h, topRight: d, bottomLeft: u, bottomRight: g } = Ae(a);
  let p = ku(t, o);
  const b = Mu(t, l, c);
  return l === "center" ? o === "left" ? p += c : o === "right" && (p -= c) : o === "left" ? p -= Math.max(h, u) + i : o === "right" && (p += Math.max(d, g) + i), {
    x: Ct(p, 0, s.width - t.width),
    y: Ct(b, 0, s.height - t.height)
  };
}
function W0(e, t, n) {
  const s = At(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - s.right : e.x + s.left;
}
function sr(e) {
  return Gt([], ae(e));
}
function Su(e, t, n) {
  return we(e, {
    tooltip: t,
    tooltipItems: n,
    type: "tooltip"
  });
}
function ir(e, t) {
  const n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return n ? e.override(n) : e;
}
const Da = {
  beforeTitle: se,
  title(e) {
    if (e.length > 0) {
      const t = e[0], n = t.chart.data.labels, s = n ? n.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return t.dataset.label || "";
      if (t.label)
        return t.label;
      if (s > 0 && t.dataIndex < s)
        return n[t.dataIndex];
    }
    return "";
  },
  afterTitle: se,
  beforeBody: se,
  beforeLabel: se,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const n = e.formattedValue;
    return it(n) || (t += n), t;
  },
  labelColor(e) {
    const n = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
    return {
      borderColor: n.borderColor,
      backgroundColor: n.backgroundColor,
      borderWidth: n.borderWidth,
      borderDash: n.borderDash,
      borderDashOffset: n.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(e) {
    const n = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
    return {
      pointStyle: n.pointStyle,
      rotation: n.rotation
    };
  },
  afterLabel: se,
  afterBody: se,
  beforeFooter: se,
  footer: se,
  afterFooter: se
};
function Rt(e, t, n, s) {
  const i = e[t].call(n, s);
  return typeof i > "u" ? Da[t].call(n, s) : i;
}
let rr = class extends ue {
  static positioners = a0;
  constructor(t) {
    super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = t.chart, this.options = t.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
  }
  initialize(t) {
    this.options = t, this._cachedAnimations = void 0, this.$context = void 0;
  }
  _resolveAnimations() {
    const t = this._cachedAnimations;
    if (t)
      return t;
    const n = this.chart, s = this.options.setContext(this.getContext()), i = s.enabled && n.options.animation && s.animations, r = new ha(this.chart, i);
    return i._cacheable && (this._cachedAnimations = Object.freeze(r)), r;
  }
  getContext() {
    return this.$context || (this.$context = Su(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, n) {
    const { callbacks: s } = n, i = Rt(s, "beforeTitle", this, t), r = Rt(s, "title", this, t), a = Rt(s, "afterTitle", this, t);
    let o = [];
    return o = Gt(o, ae(i)), o = Gt(o, ae(r)), o = Gt(o, ae(a)), o;
  }
  getBeforeBody(t, n) {
    return sr(Rt(n.callbacks, "beforeBody", this, t));
  }
  getBody(t, n) {
    const { callbacks: s } = n, i = [];
    return ct(t, (r) => {
      const a = {
        before: [],
        lines: [],
        after: []
      }, o = ir(s, r);
      Gt(a.before, ae(Rt(o, "beforeLabel", this, r))), Gt(a.lines, Rt(o, "label", this, r)), Gt(a.after, ae(Rt(o, "afterLabel", this, r))), i.push(a);
    }), i;
  }
  getAfterBody(t, n) {
    return sr(Rt(n.callbacks, "afterBody", this, t));
  }
  getFooter(t, n) {
    const { callbacks: s } = n, i = Rt(s, "beforeFooter", this, t), r = Rt(s, "footer", this, t), a = Rt(s, "afterFooter", this, t);
    let o = [];
    return o = Gt(o, ae(i)), o = Gt(o, ae(r)), o = Gt(o, ae(a)), o;
  }
  _createItems(t) {
    const n = this._active, s = this.chart.data, i = [], r = [], a = [];
    let o = [], l, c;
    for (l = 0, c = n.length; l < c; ++l)
      o.push(vu(this.chart, n[l]));
    return t.filter && (o = o.filter((h, d, u) => t.filter(h, d, u, s))), t.itemSort && (o = o.sort((h, d) => t.itemSort(h, d, s))), ct(o, (h) => {
      const d = ir(t.callbacks, h);
      i.push(Rt(d, "labelColor", this, h)), r.push(Rt(d, "labelPointStyle", this, h)), a.push(Rt(d, "labelTextColor", this, h));
    }), this.labelColors = i, this.labelPointStyles = r, this.labelTextColors = a, this.dataPoints = o, o;
  }
  update(t, n) {
    const s = this.options.setContext(this.getContext()), i = this._active;
    let r, a = [];
    if (!i.length)
      this.opacity !== 0 && (r = {
        opacity: 0
      });
    else {
      const o = a0[s.position].call(this, i, this._eventPosition);
      a = this._createItems(s), this.title = this.getTitle(a, s), this.beforeBody = this.getBeforeBody(a, s), this.body = this.getBody(a, s), this.afterBody = this.getAfterBody(a, s), this.footer = this.getFooter(a, s);
      const l = this._size = tr(this, s), c = Object.assign({}, o, l), h = er(this.chart, s, c), d = nr(s, c, h, this.chart);
      this.xAlign = h.xAlign, this.yAlign = h.yAlign, r = {
        opacity: 1,
        x: d.x,
        y: d.y,
        width: l.width,
        height: l.height,
        caretX: o.x,
        caretY: o.y
      };
    }
    this._tooltipItems = a, this.$context = void 0, r && this._resolveAnimations().update(this, r), t && s.external && s.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: n
    });
  }
  drawCaret(t, n, s, i) {
    const r = this.getCaretPosition(t, s, i);
    n.lineTo(r.x1, r.y1), n.lineTo(r.x2, r.y2), n.lineTo(r.x3, r.y3);
  }
  getCaretPosition(t, n, s) {
    const { xAlign: i, yAlign: r } = this, { caretSize: a, cornerRadius: o } = s, { topLeft: l, topRight: c, bottomLeft: h, bottomRight: d } = Ae(o), { x: u, y: g } = t, { width: p, height: b } = n;
    let m, y, _, x, w, v;
    return r === "center" ? (w = g + b / 2, i === "left" ? (m = u, y = m - a, x = w + a, v = w - a) : (m = u + p, y = m + a, x = w - a, v = w + a), _ = m) : (i === "left" ? y = u + Math.max(l, h) + a : i === "right" ? y = u + p - Math.max(c, d) - a : y = this.caretX, r === "top" ? (x = g, w = x - a, m = y - a, _ = y + a) : (x = g + b, w = x + a, m = y + a, _ = y - a), v = x), {
      x1: m,
      x2: y,
      x3: _,
      y1: x,
      y2: w,
      y3: v
    };
  }
  drawTitle(t, n, s) {
    const i = this.title, r = i.length;
    let a, o, l;
    if (r) {
      const c = Be(s.rtl, this.x, this.width);
      for (t.x = W0(this, s.titleAlign, s), n.textAlign = c.textAlign(s.titleAlign), n.textBaseline = "middle", a = St(s.titleFont), o = s.titleSpacing, n.fillStyle = s.titleColor, n.font = a.string, l = 0; l < r; ++l)
        n.fillText(i[l], c.x(t.x), t.y + a.lineHeight / 2), t.y += a.lineHeight + o, l + 1 === r && (t.y += s.titleMarginBottom - o);
    }
  }
  _drawColorBox(t, n, s, i, r) {
    const a = this.labelColors[s], o = this.labelPointStyles[s], { boxHeight: l, boxWidth: c } = r, h = St(r.bodyFont), d = W0(this, "left", r), u = i.x(d), g = l < h.lineHeight ? (h.lineHeight - l) / 2 : 0, p = n.y + g;
    if (r.usePointStyle) {
      const b = {
        radius: Math.min(c, l) / 2,
        pointStyle: o.pointStyle,
        rotation: o.rotation,
        borderWidth: 1
      }, m = i.leftForLtr(u, c) + c / 2, y = p + l / 2;
      t.strokeStyle = r.multiKeyBackground, t.fillStyle = r.multiKeyBackground, ts(t, b, m, y), t.strokeStyle = a.borderColor, t.fillStyle = a.backgroundColor, ts(t, b, m, y);
    } else {
      t.lineWidth = rt(a.borderWidth) ? Math.max(...Object.values(a.borderWidth)) : a.borderWidth || 1, t.strokeStyle = a.borderColor, t.setLineDash(a.borderDash || []), t.lineDashOffset = a.borderDashOffset || 0;
      const b = i.leftForLtr(u, c), m = i.leftForLtr(i.xPlus(u, 1), c - 2), y = Ae(a.borderRadius);
      Object.values(y).some((_) => _ !== 0) ? (t.beginPath(), t.fillStyle = r.multiKeyBackground, y0(t, {
        x: b,
        y: p,
        w: c,
        h: l,
        radius: y
      }), t.fill(), t.stroke(), t.fillStyle = a.backgroundColor, t.beginPath(), y0(t, {
        x: m,
        y: p + 1,
        w: c - 2,
        h: l - 2,
        radius: y
      }), t.fill()) : (t.fillStyle = r.multiKeyBackground, t.fillRect(b, p, c, l), t.strokeRect(b, p, c, l), t.fillStyle = a.backgroundColor, t.fillRect(m, p + 1, c - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[s];
  }
  drawBody(t, n, s) {
    const { body: i } = this, { bodySpacing: r, bodyAlign: a, displayColors: o, boxHeight: l, boxWidth: c, boxPadding: h } = s, d = St(s.bodyFont);
    let u = d.lineHeight, g = 0;
    const p = Be(s.rtl, this.x, this.width), b = function(S) {
      n.fillText(S, p.x(t.x + g), t.y + u / 2), t.y += u + r;
    }, m = p.textAlign(a);
    let y, _, x, w, v, k, M;
    for (n.textAlign = a, n.textBaseline = "middle", n.font = d.string, t.x = W0(this, m, s), n.fillStyle = s.bodyColor, ct(this.beforeBody, b), g = o && m !== "right" ? a === "center" ? c / 2 + h : c + 2 + h : 0, w = 0, k = i.length; w < k; ++w) {
      for (y = i[w], _ = this.labelTextColors[w], n.fillStyle = _, ct(y.before, b), x = y.lines, o && x.length && (this._drawColorBox(n, t, w, p, s), u = Math.max(d.lineHeight, l)), v = 0, M = x.length; v < M; ++v)
        b(x[v]), u = d.lineHeight;
      ct(y.after, b);
    }
    g = 0, u = d.lineHeight, ct(this.afterBody, b), t.y -= r;
  }
  drawFooter(t, n, s) {
    const i = this.footer, r = i.length;
    let a, o;
    if (r) {
      const l = Be(s.rtl, this.x, this.width);
      for (t.x = W0(this, s.footerAlign, s), t.y += s.footerMarginTop, n.textAlign = l.textAlign(s.footerAlign), n.textBaseline = "middle", a = St(s.footerFont), n.fillStyle = s.footerColor, n.font = a.string, o = 0; o < r; ++o)
        n.fillText(i[o], l.x(t.x), t.y + a.lineHeight / 2), t.y += a.lineHeight + s.footerSpacing;
    }
  }
  drawBackground(t, n, s, i) {
    const { xAlign: r, yAlign: a } = this, { x: o, y: l } = t, { width: c, height: h } = s, { topLeft: d, topRight: u, bottomLeft: g, bottomRight: p } = Ae(i.cornerRadius);
    n.fillStyle = i.backgroundColor, n.strokeStyle = i.borderColor, n.lineWidth = i.borderWidth, n.beginPath(), n.moveTo(o + d, l), a === "top" && this.drawCaret(t, n, s, i), n.lineTo(o + c - u, l), n.quadraticCurveTo(o + c, l, o + c, l + u), a === "center" && r === "right" && this.drawCaret(t, n, s, i), n.lineTo(o + c, l + h - p), n.quadraticCurveTo(o + c, l + h, o + c - p, l + h), a === "bottom" && this.drawCaret(t, n, s, i), n.lineTo(o + g, l + h), n.quadraticCurveTo(o, l + h, o, l + h - g), a === "center" && r === "left" && this.drawCaret(t, n, s, i), n.lineTo(o, l + d), n.quadraticCurveTo(o, l, o + d, l), n.closePath(), n.fill(), i.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, s = this.$animations, i = s && s.x, r = s && s.y;
    if (i || r) {
      const a = a0[t.position].call(this, this._active, this._eventPosition);
      if (!a)
        return;
      const o = this._size = tr(this, t), l = Object.assign({}, a, this._size), c = er(n, t, l), h = nr(t, l, c, n);
      (i._to !== h.x || r._to !== h.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = o.width, this.height = o.height, this.caretX = a.x, this.caretY = a.y, this._resolveAnimations().update(this, h));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const n = this.options.setContext(this.getContext());
    let s = this.opacity;
    if (!s)
      return;
    this._updateAnimationTarget(n);
    const i = {
      width: this.width,
      height: this.height
    }, r = {
      x: this.x,
      y: this.y
    };
    s = Math.abs(s) < 1e-3 ? 0 : s;
    const a = At(n.padding), o = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    n.enabled && o && (t.save(), t.globalAlpha = s, this.drawBackground(r, t, i, n), ia(t, n.textDirection), r.y += a.top, this.drawTitle(r, t, n), this.drawBody(r, t, n), this.drawFooter(r, t, n), ra(t, n.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, n) {
    const s = this._active, i = t.map(({ datasetIndex: o, index: l }) => {
      const c = this.chart.getDatasetMeta(o);
      if (!c)
        throw new Error("Cannot find a dataset at index " + o);
      return {
        datasetIndex: o,
        element: c.data[l],
        index: l
      };
    }), r = !en(s, i), a = this._positionChanged(i, n);
    (r || a) && (this._active = i, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, n, s = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const i = this.options, r = this._active || [], a = this._getActiveElements(t, r, n, s), o = this._positionChanged(a, t), l = n || !en(a, r) || o;
    return l && (this._active = a, (i.enabled || i.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, n))), l;
  }
  _getActiveElements(t, n, s, i) {
    const r = this.options;
    if (t.type === "mouseout")
      return [];
    if (!i)
      return n.filter((o) => this.chart.data.datasets[o.datasetIndex] && this.chart.getDatasetMeta(o.datasetIndex).controller.getParsed(o.index) !== void 0);
    const a = this.chart.getElementsAtEventForMode(t, r.mode, r, s);
    return r.reverse && a.reverse(), a;
  }
  _positionChanged(t, n) {
    const { caretX: s, caretY: i, options: r } = this, a = a0[r.position].call(this, t, n);
    return a !== !1 && (s !== a.x || i !== a.y);
  }
};
var Cu = {
  id: "tooltip",
  _element: rr,
  positioners: a0,
  afterInit(e, t, n) {
    n && (e.tooltip = new rr({
      chart: e,
      options: n
    }));
  },
  beforeUpdate(e, t, n) {
    e.tooltip && e.tooltip.initialize(n);
  },
  reset(e, t, n) {
    e.tooltip && e.tooltip.initialize(n);
  },
  afterDraw(e) {
    const t = e.tooltip;
    if (t && t._willRender()) {
      const n = {
        tooltip: t
      };
      if (e.notifyPlugins("beforeTooltipDraw", {
        ...n,
        cancelable: !0
      }) === !1)
        return;
      t.draw(e.ctx), e.notifyPlugins("afterTooltipDraw", n);
    }
  },
  afterEvent(e, t) {
    if (e.tooltip) {
      const n = t.replay;
      e.tooltip.handleEvent(t.event, n, t.inChartArea) && (t.changed = !0);
    }
  },
  defaults: {
    enabled: !0,
    external: null,
    position: "average",
    backgroundColor: "rgba(0,0,0,0.8)",
    titleColor: "#fff",
    titleFont: {
      weight: "bold"
    },
    titleSpacing: 2,
    titleMarginBottom: 6,
    titleAlign: "left",
    bodyColor: "#fff",
    bodySpacing: 2,
    bodyFont: {},
    bodyAlign: "left",
    footerColor: "#fff",
    footerSpacing: 2,
    footerMarginTop: 6,
    footerFont: {
      weight: "bold"
    },
    footerAlign: "left",
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (e, t) => t.bodyFont.size,
    boxWidth: (e, t) => t.bodyFont.size,
    multiKeyBackground: "#fff",
    displayColors: !0,
    boxPadding: 0,
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    animation: {
      duration: 400,
      easing: "easeOutQuart"
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "width",
          "height",
          "caretX",
          "caretY"
        ]
      },
      opacity: {
        easing: "linear",
        duration: 200
      }
    },
    callbacks: Da
  },
  defaultRoutes: {
    bodyFont: "font",
    footerFont: "font",
    titleFont: "font"
  },
  descriptors: {
    _scriptable: (e) => e !== "filter" && e !== "itemSort" && e !== "external",
    _indexable: !1,
    callbacks: {
      _scriptable: !1,
      _indexable: !1
    },
    animation: {
      _fallback: !1
    },
    animations: {
      _fallback: "animation"
    }
  },
  additionalOptionScopes: [
    "interaction"
  ]
}, Nu = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Colors: Fd,
  Decimation: Wd,
  Filler: cu,
  Legend: mu,
  SubTitle: yu,
  Title: bu,
  Tooltip: Cu
});
const Pu = (e, t, n, s) => (typeof t == "string" ? (n = e.push(t) - 1, s.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function Tu(e, t, n, s) {
  const i = e.indexOf(t);
  if (i === -1)
    return Pu(e, t, n, s);
  const r = e.lastIndexOf(t);
  return i !== r ? n : i;
}
const $u = (e, t) => e === null ? null : Ct(Math.round(e), 0, t);
function ar(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Au extends Oe {
  static id = "category";
  static defaults = {
    ticks: {
      callback: ar
    }
  };
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const n = this._addedLabels;
    if (n.length) {
      const s = this.getLabels();
      for (const { index: i, label: r } of n)
        s[i] === r && s.splice(i, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, n) {
    if (it(t))
      return null;
    const s = this.getLabels();
    return n = isFinite(n) && s[n] === t ? n : Tu(s, t, et(n, t), this._addedLabels), $u(n, s.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: n } = this.getUserBounds();
    let { min: s, max: i } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (s = 0), n || (i = this.getLabels().length - 1)), this.min = s, this.max = i;
  }
  buildTicks() {
    const t = this.min, n = this.max, s = this.options.offset, i = [];
    let r = this.getLabels();
    r = t === 0 && n === r.length - 1 ? r : r.slice(t, n + 1), this._valueRange = Math.max(r.length - (s ? 0 : 1), 1), this._startValue = this.min - (s ? 0.5 : 0);
    for (let a = t; a <= n; a++)
      i.push({
        value: a
      });
    return i;
  }
  getLabelForValue(t) {
    return ar.call(this, t);
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(t) {
    return typeof t != "number" && (t = this.parse(t)), t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getPixelForTick(t) {
    const n = this.ticks;
    return t < 0 || t > n.length - 1 ? null : this.getPixelForValue(n[t].value);
  }
  getValueForPixel(t) {
    return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
function Du(e, t) {
  const n = [], { bounds: i, step: r, min: a, max: o, precision: l, count: c, maxTicks: h, maxDigits: d, includeBounds: u } = e, g = r || 1, p = h - 1, { min: b, max: m } = t, y = !it(a), _ = !it(o), x = !it(c), w = (m - b) / (d + 1);
  let v = ti((m - b) / p / g) * g, k, M, S, N;
  if (v < 1e-14 && !y && !_)
    return [
      {
        value: b
      },
      {
        value: m
      }
    ];
  N = Math.ceil(m / v) - Math.floor(b / v), N > p && (v = ti(N * v / p / g) * g), it(l) || (k = Math.pow(10, l), v = Math.ceil(v * k) / k), i === "ticks" ? (M = Math.floor(b / v) * v, S = Math.ceil(m / v) * v) : (M = b, S = m), y && _ && r && gl((o - a) / r, v / 1e3) ? (N = Math.round(Math.min((o - a) / v, h)), v = (o - a) / N, M = a, S = o) : x ? (M = y ? a : M, S = _ ? o : S, N = c - 1, v = (S - M) / N) : (N = (S - M) / v, u0(N, Math.round(N), v / 1e3) ? N = Math.round(N) : N = Math.ceil(N));
  const P = Math.max(ei(v), ei(M));
  k = Math.pow(10, it(l) ? P : l), M = Math.round(M * k) / k, S = Math.round(S * k) / k;
  let R = 0;
  for (y && (u && M !== a ? (n.push({
    value: a
  }), M < a && R++, u0(Math.round((M + R * v) * k) / k, a, or(a, w, e)) && R++) : M < a && R++); R < N; ++R) {
    const C = Math.round((M + R * v) * k) / k;
    if (_ && C > o)
      break;
    n.push({
      value: C
    });
  }
  return _ && u && S !== o ? n.length && u0(n[n.length - 1].value, o, or(o, w, e)) ? n[n.length - 1].value = o : n.push({
    value: o
  }) : (!_ || S === o) && n.push({
    value: S
  }), n;
}
function or(e, t, { horizontal: n, minRotation: s }) {
  const i = Yt(s), r = (n ? Math.sin(i) : Math.cos(i)) || 1e-3, a = 0.75 * t * ("" + e).length;
  return Math.min(t / r, a);
}
class cn extends Oe {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return it(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: n, maxDefined: s } = this.getUserBounds();
    let { min: i, max: r } = this;
    const a = (l) => i = n ? i : l, o = (l) => r = s ? r : l;
    if (t) {
      const l = Zt(i), c = Zt(r);
      l < 0 && c < 0 ? o(0) : l > 0 && c > 0 && a(0);
    }
    if (i === r) {
      let l = r === 0 ? 1 : Math.abs(r * 0.05);
      o(r + l), t || a(i - l);
    }
    this.min = i, this.max = r;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: n, stepSize: s } = t, i;
    return s ? (i = Math.ceil(this.max / s) - Math.floor(this.min / s) + 1, i > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${i} ticks. Limiting to 1000.`), i = 1e3)) : (i = this.computeTickLimit(), n = n || 11), n && (i = Math.min(n, i)), i;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, n = t.ticks;
    let s = this.getTickLimit();
    s = Math.max(2, s);
    const i = {
      maxTicks: s,
      bounds: t.bounds,
      min: t.min,
      max: t.max,
      precision: n.precision,
      step: n.stepSize,
      count: n.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: n.minRotation || 0,
      includeBounds: n.includeBounds !== !1
    }, r = this._range || this, a = Du(i, r);
    return t.bounds === "ticks" && Hr(a, this, "value"), t.reverse ? (a.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), a;
  }
  configure() {
    const t = this.ticks;
    let n = this.min, s = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const i = (s - n) / Math.max(t.length - 1, 1) / 2;
      n -= i, s += i;
    }
    this._startValue = n, this._endValue = s, this._valueRange = s - n;
  }
  getLabelForValue(t) {
    return N0(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Iu extends cn {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: pn.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = xt(t) ? t : 0, this.max = xt(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, s = Yt(this.options.ticks.minRotation), i = (t ? Math.sin(s) : Math.cos(s)) || 1e-3, r = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, r.lineHeight / i));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const x0 = (e) => Math.floor(me(e)), Ne = (e, t) => Math.pow(10, x0(e) + t);
function lr(e) {
  return e / Math.pow(10, x0(e)) === 1;
}
function cr(e, t, n) {
  const s = Math.pow(10, n), i = Math.floor(e / s);
  return Math.ceil(t / s) - i;
}
function Ru(e, t) {
  const n = t - e;
  let s = x0(n);
  for (; cr(e, t, s) > 10; )
    s++;
  for (; cr(e, t, s) < 10; )
    s--;
  return Math.min(s, x0(e));
}
function Lu(e, { min: t, max: n }) {
  t = Ft(e.min, t);
  const s = [], i = x0(t);
  let r = Ru(t, n), a = r < 0 ? Math.pow(10, Math.abs(r)) : 1;
  const o = Math.pow(10, r), l = i > r ? Math.pow(10, i) : 0, c = Math.round((t - l) * a) / a, h = Math.floor((t - l) / o / 10) * o * 10;
  let d = Math.floor((c - h) / Math.pow(10, r)), u = Ft(e.min, Math.round((l + h + d * Math.pow(10, r)) * a) / a);
  for (; u < n; )
    s.push({
      value: u,
      major: lr(u),
      significand: d
    }), d >= 10 ? d = d < 15 ? 15 : 20 : d++, d >= 20 && (r++, d = 2, a = r >= 0 ? 1 : a), u = Math.round((l + h + d * Math.pow(10, r)) * a) / a;
  const g = Ft(e.max, u);
  return s.push({
    value: g,
    major: lr(g),
    significand: d
  }), s;
}
class Eu extends Oe {
  static id = "logarithmic";
  static defaults = {
    ticks: {
      callback: pn.formatters.logarithmic,
      major: {
        enabled: !0
      }
    }
  };
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    const s = cn.prototype.parse.apply(this, [
      t,
      n
    ]);
    if (s === 0) {
      this._zero = !0;
      return;
    }
    return xt(s) && s > 0 ? s : null;
  }
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = xt(t) ? Math.max(0, t) : null, this.max = xt(n) ? Math.max(0, n) : null, this.options.beginAtZero && (this._zero = !0), this._zero && this.min !== this._suggestedMin && !xt(this._userMin) && (this.min = t === Ne(this.min, 0) ? Ne(this.min, -1) : Ne(this.min, 0)), this.handleTickRangeOptions();
  }
  handleTickRangeOptions() {
    const { minDefined: t, maxDefined: n } = this.getUserBounds();
    let s = this.min, i = this.max;
    const r = (o) => s = t ? s : o, a = (o) => i = n ? i : o;
    s === i && (s <= 0 ? (r(1), a(10)) : (r(Ne(s, -1)), a(Ne(i, 1)))), s <= 0 && r(Ne(i, -1)), i <= 0 && a(Ne(s, 1)), this.min = s, this.max = i;
  }
  buildTicks() {
    const t = this.options, n = {
      min: this._userMin,
      max: this._userMax
    }, s = Lu(n, this);
    return t.bounds === "ticks" && Hr(s, this, "value"), t.reverse ? (s.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), s;
  }
  getLabelForValue(t) {
    return t === void 0 ? "0" : N0(t, this.chart.options.locale, this.options.ticks.format);
  }
  configure() {
    const t = this.min;
    super.configure(), this._startValue = me(t), this._valueRange = me(this.max) - me(t);
  }
  getPixelForValue(t) {
    return (t === void 0 || t === 0) && (t = this.min), t === null || isNaN(t) ? NaN : this.getPixelForDecimal(t === this.min ? 0 : (me(t) - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    const n = this.getDecimalForPixel(t);
    return Math.pow(10, this._startValue + n * this._valueRange);
  }
}
function as(e) {
  const t = e.ticks;
  if (t.display && e.display) {
    const n = At(t.backdropPadding);
    return et(t.font && t.font.size, yt.font.size) + n.height;
  }
  return 0;
}
function Ou(e, t, n) {
  return n = bt(n) ? n : [
    n
  ], {
    w: Al(e, t.string, n),
    h: n.length * t.lineHeight
  };
}
function hr(e, t, n, s, i) {
  return e === s || e === i ? {
    start: t - n / 2,
    end: t + n / 2
  } : e < s || e > i ? {
    start: t - n,
    end: t
  } : {
    start: t,
    end: t + n
  };
}
function zu(e) {
  const t = {
    l: e.left + e._padding.left,
    r: e.right - e._padding.right,
    t: e.top + e._padding.top,
    b: e.bottom - e._padding.bottom
  }, n = Object.assign({}, t), s = [], i = [], r = e._pointLabels.length, a = e.options.pointLabels, o = a.centerPointLabels ? lt / r : 0;
  for (let l = 0; l < r; l++) {
    const c = a.setContext(e.getPointLabelContext(l));
    i[l] = c.padding;
    const h = e.getPointPosition(l, e.drawingArea + i[l], o), d = St(c.font), u = Ou(e.ctx, d, e._pointLabels[l]);
    s[l] = u;
    const g = Tt(e.getIndexAngle(l) + o), p = Math.round(ws(g)), b = hr(p, h.x, u.w, 0, 180), m = hr(p, h.y, u.h, 90, 270);
    Fu(n, t, g, b, m);
  }
  e.setCenterPoint(t.l - n.l, n.r - t.r, t.t - n.t, n.b - t.b), e._pointLabelItems = Vu(e, s, i);
}
function Fu(e, t, n, s, i) {
  const r = Math.abs(Math.sin(n)), a = Math.abs(Math.cos(n));
  let o = 0, l = 0;
  s.start < t.l ? (o = (t.l - s.start) / r, e.l = Math.min(e.l, t.l - o)) : s.end > t.r && (o = (s.end - t.r) / r, e.r = Math.max(e.r, t.r + o)), i.start < t.t ? (l = (t.t - i.start) / a, e.t = Math.min(e.t, t.t - l)) : i.end > t.b && (l = (i.end - t.b) / a, e.b = Math.max(e.b, t.b + l));
}
function Bu(e, t, n) {
  const s = e.drawingArea, { extra: i, additionalAngle: r, padding: a, size: o } = n, l = e.getPointPosition(t, s + i + a, r), c = Math.round(ws(Tt(l.angle + wt))), h = Yu(l.y, o.h, c), d = Wu(c), u = ju(l.x, o.w, d);
  return {
    visible: !0,
    x: l.x,
    y: h,
    textAlign: d,
    left: u,
    top: h,
    right: u + o.w,
    bottom: h + o.h
  };
}
function Hu(e, t) {
  if (!t)
    return !0;
  const { left: n, top: s, right: i, bottom: r } = e;
  return !(he({
    x: n,
    y: s
  }, t) || he({
    x: n,
    y: r
  }, t) || he({
    x: i,
    y: s
  }, t) || he({
    x: i,
    y: r
  }, t));
}
function Vu(e, t, n) {
  const s = [], i = e._pointLabels.length, r = e.options, { centerPointLabels: a, display: o } = r.pointLabels, l = {
    extra: as(r) / 2,
    additionalAngle: a ? lt / i : 0
  };
  let c;
  for (let h = 0; h < i; h++) {
    l.padding = n[h], l.size = t[h];
    const d = Bu(e, h, l);
    s.push(d), o === "auto" && (d.visible = Hu(d, c), d.visible && (c = d));
  }
  return s;
}
function Wu(e) {
  return e === 0 || e === 180 ? "center" : e < 180 ? "left" : "right";
}
function ju(e, t, n) {
  return n === "right" ? e -= t : n === "center" && (e -= t / 2), e;
}
function Yu(e, t, n) {
  return n === 90 || n === 270 ? e -= t / 2 : (n > 270 || n < 90) && (e -= t), e;
}
function Uu(e, t, n) {
  const { left: s, top: i, right: r, bottom: a } = n, { backdropColor: o } = t;
  if (!it(o)) {
    const l = Ae(t.borderRadius), c = At(t.backdropPadding);
    e.fillStyle = o;
    const h = s - c.left, d = i - c.top, u = r - s + c.width, g = a - i + c.height;
    Object.values(l).some((p) => p !== 0) ? (e.beginPath(), y0(e, {
      x: h,
      y: d,
      w: u,
      h: g,
      radius: l
    }), e.fill()) : e.fillRect(h, d, u, g);
  }
}
function Xu(e, t) {
  const { ctx: n, options: { pointLabels: s } } = e;
  for (let i = t - 1; i >= 0; i--) {
    const r = e._pointLabelItems[i];
    if (!r.visible)
      continue;
    const a = s.setContext(e.getPointLabelContext(i));
    Uu(n, a, r);
    const o = St(a.font), { x: l, y: c, textAlign: h } = r;
    Le(n, e._pointLabels[i], l, c + o.lineHeight / 2, o, {
      color: a.color,
      textAlign: h,
      textBaseline: "middle"
    });
  }
}
function Ia(e, t, n, s) {
  const { ctx: i } = e;
  if (n)
    i.arc(e.xCenter, e.yCenter, t, 0, pt);
  else {
    let r = e.getPointPosition(0, t);
    i.moveTo(r.x, r.y);
    for (let a = 1; a < s; a++)
      r = e.getPointPosition(a, t), i.lineTo(r.x, r.y);
  }
}
function Gu(e, t, n, s, i) {
  const r = e.ctx, a = t.circular, { color: o, lineWidth: l } = t;
  !a && !s || !o || !l || n < 0 || (r.save(), r.strokeStyle = o, r.lineWidth = l, r.setLineDash(i.dash || []), r.lineDashOffset = i.dashOffset, r.beginPath(), Ia(e, n, a, s), r.closePath(), r.stroke(), r.restore());
}
function qu(e, t, n) {
  return we(e, {
    label: n,
    index: t,
    type: "pointLabel"
  });
}
class Zu extends cn {
  static id = "radialLinear";
  static defaults = {
    display: !0,
    animate: !0,
    position: "chartArea",
    angleLines: {
      display: !0,
      lineWidth: 1,
      borderDash: [],
      borderDashOffset: 0
    },
    grid: {
      circular: !1
    },
    startAngle: 0,
    ticks: {
      showLabelBackdrop: !0,
      callback: pn.formatters.numeric
    },
    pointLabels: {
      backdropColor: void 0,
      backdropPadding: 2,
      display: !0,
      font: {
        size: 10
      },
      callback(t) {
        return t;
      },
      padding: 5,
      centerPointLabels: !1
    }
  };
  static defaultRoutes = {
    "angleLines.color": "borderColor",
    "pointLabels.color": "color",
    "ticks.color": "color"
  };
  static descriptors = {
    angleLines: {
      _fallback: "grid"
    }
  };
  constructor(t) {
    super(t), this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = [];
  }
  setDimensions() {
    const t = this._padding = At(as(this.options) / 2), n = this.width = this.maxWidth - t.width, s = this.height = this.maxHeight - t.height;
    this.xCenter = Math.floor(this.left + n / 2 + t.left), this.yCenter = Math.floor(this.top + s / 2 + t.top), this.drawingArea = Math.floor(Math.min(n, s) / 2);
  }
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!1);
    this.min = xt(t) && !isNaN(t) ? t : 0, this.max = xt(n) && !isNaN(n) ? n : 0, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    return Math.ceil(this.drawingArea / as(this.options));
  }
  generateTickLabels(t) {
    cn.prototype.generateTickLabels.call(this, t), this._pointLabels = this.getLabels().map((n, s) => {
      const i = gt(this.options.pointLabels.callback, [
        n,
        s
      ], this);
      return i || i === 0 ? i : "";
    }).filter((n, s) => this.chart.getDataVisibility(s));
  }
  fit() {
    const t = this.options;
    t.display && t.pointLabels.display ? zu(this) : this.setCenterPoint(0, 0, 0, 0);
  }
  setCenterPoint(t, n, s, i) {
    this.xCenter += Math.floor((t - n) / 2), this.yCenter += Math.floor((s - i) / 2), this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(t, n, s, i));
  }
  getIndexAngle(t) {
    const n = pt / (this._pointLabels.length || 1), s = this.options.startAngle || 0;
    return Tt(t * n + Yt(s));
  }
  getDistanceFromCenterForValue(t) {
    if (it(t))
      return NaN;
    const n = this.drawingArea / (this.max - this.min);
    return this.options.reverse ? (this.max - t) * n : (t - this.min) * n;
  }
  getValueForDistanceFromCenter(t) {
    if (it(t))
      return NaN;
    const n = t / (this.drawingArea / (this.max - this.min));
    return this.options.reverse ? this.max - n : this.min + n;
  }
  getPointLabelContext(t) {
    const n = this._pointLabels || [];
    if (t >= 0 && t < n.length) {
      const s = n[t];
      return qu(this.getContext(), t, s);
    }
  }
  getPointPosition(t, n, s = 0) {
    const i = this.getIndexAngle(t) - wt + s;
    return {
      x: Math.cos(i) * n + this.xCenter,
      y: Math.sin(i) * n + this.yCenter,
      angle: i
    };
  }
  getPointPositionForValue(t, n) {
    return this.getPointPosition(t, this.getDistanceFromCenterForValue(n));
  }
  getBasePosition(t) {
    return this.getPointPositionForValue(t || 0, this.getBaseValue());
  }
  getPointLabelPosition(t) {
    const { left: n, top: s, right: i, bottom: r } = this._pointLabelItems[t];
    return {
      left: n,
      top: s,
      right: i,
      bottom: r
    };
  }
  drawBackground() {
    const { backgroundColor: t, grid: { circular: n } } = this.options;
    if (t) {
      const s = this.ctx;
      s.save(), s.beginPath(), Ia(this, this.getDistanceFromCenterForValue(this._endValue), n, this._pointLabels.length), s.closePath(), s.fillStyle = t, s.fill(), s.restore();
    }
  }
  drawGrid() {
    const t = this.ctx, n = this.options, { angleLines: s, grid: i, border: r } = n, a = this._pointLabels.length;
    let o, l, c;
    if (n.pointLabels.display && Xu(this, a), i.display && this.ticks.forEach((h, d) => {
      if (d !== 0 || d === 0 && this.min < 0) {
        l = this.getDistanceFromCenterForValue(h.value);
        const u = this.getContext(d), g = i.setContext(u), p = r.setContext(u);
        Gu(this, g, l, a, p);
      }
    }), s.display) {
      for (t.save(), o = a - 1; o >= 0; o--) {
        const h = s.setContext(this.getPointLabelContext(o)), { color: d, lineWidth: u } = h;
        !u || !d || (t.lineWidth = u, t.strokeStyle = d, t.setLineDash(h.borderDash), t.lineDashOffset = h.borderDashOffset, l = this.getDistanceFromCenterForValue(n.reverse ? this.min : this.max), c = this.getPointPosition(o, l), t.beginPath(), t.moveTo(this.xCenter, this.yCenter), t.lineTo(c.x, c.y), t.stroke());
      }
      t.restore();
    }
  }
  drawBorder() {
  }
  drawLabels() {
    const t = this.ctx, n = this.options, s = n.ticks;
    if (!s.display)
      return;
    const i = this.getIndexAngle(0);
    let r, a;
    t.save(), t.translate(this.xCenter, this.yCenter), t.rotate(i), t.textAlign = "center", t.textBaseline = "middle", this.ticks.forEach((o, l) => {
      if (l === 0 && this.min >= 0 && !n.reverse)
        return;
      const c = s.setContext(this.getContext(l)), h = St(c.font);
      if (r = this.getDistanceFromCenterForValue(this.ticks[l].value), c.showLabelBackdrop) {
        t.font = h.string, a = t.measureText(o.label).width, t.fillStyle = c.backdropColor;
        const d = At(c.backdropPadding);
        t.fillRect(-a / 2 - d.left, -r - h.size / 2 - d.top, a + d.width, h.size + d.height);
      }
      Le(t, o.label, 0, -r, h, {
        color: c.color,
        strokeColor: c.textStrokeColor,
        strokeWidth: c.textStrokeWidth
      });
    }), t.restore();
  }
  drawTitle() {
  }
}
const kn = {
  millisecond: {
    common: !0,
    size: 1,
    steps: 1e3
  },
  second: {
    common: !0,
    size: 1e3,
    steps: 60
  },
  minute: {
    common: !0,
    size: 6e4,
    steps: 60
  },
  hour: {
    common: !0,
    size: 36e5,
    steps: 24
  },
  day: {
    common: !0,
    size: 864e5,
    steps: 30
  },
  week: {
    common: !1,
    size: 6048e5,
    steps: 4
  },
  month: {
    common: !0,
    size: 2628e6,
    steps: 12
  },
  quarter: {
    common: !1,
    size: 7884e6,
    steps: 4
  },
  year: {
    common: !0,
    size: 3154e7
  }
}, Lt = /* @__PURE__ */ Object.keys(kn);
function dr(e, t) {
  return e - t;
}
function ur(e, t) {
  if (it(t))
    return null;
  const n = e._adapter, { parser: s, round: i, isoWeekday: r } = e._parseOpts;
  let a = t;
  return typeof s == "function" && (a = s(a)), xt(a) || (a = typeof s == "string" ? n.parse(a, s) : n.parse(a)), a === null ? null : (i && (a = i === "week" && (Ve(r) || r === !0) ? n.startOf(a, "isoWeek", r) : n.startOf(a, i)), +a);
}
function fr(e, t, n, s) {
  const i = Lt.length;
  for (let r = Lt.indexOf(e); r < i - 1; ++r) {
    const a = kn[Lt[r]], o = a.steps ? a.steps : Number.MAX_SAFE_INTEGER;
    if (a.common && Math.ceil((n - t) / (o * a.size)) <= s)
      return Lt[r];
  }
  return Lt[i - 1];
}
function Ku(e, t, n, s, i) {
  for (let r = Lt.length - 1; r >= Lt.indexOf(n); r--) {
    const a = Lt[r];
    if (kn[a].common && e._adapter.diff(i, s, a) >= t - 1)
      return a;
  }
  return Lt[n ? Lt.indexOf(n) : 0];
}
function Ju(e) {
  for (let t = Lt.indexOf(e) + 1, n = Lt.length; t < n; ++t)
    if (kn[Lt[t]].common)
      return Lt[t];
}
function gr(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: s, hi: i } = ks(n, t), r = n[s] >= t ? n[s] : n[i];
    e[r] = !0;
  }
}
function Qu(e, t, n, s) {
  const i = e._adapter, r = +i.startOf(t[0].value, s), a = t[t.length - 1].value;
  let o, l;
  for (o = r; o <= a; o = +i.add(o, 1, s))
    l = n[o], l >= 0 && (t[l].major = !0);
  return t;
}
function mr(e, t, n) {
  const s = [], i = {}, r = t.length;
  let a, o;
  for (a = 0; a < r; ++a)
    o = t[a], i[o] = a, s.push({
      value: o,
      major: !1
    });
  return r === 0 || !n ? s : Qu(e, s, i, n);
}
class os extends Oe {
  static id = "time";
  static defaults = {
    bounds: "data",
    adapters: {},
    time: {
      parser: !1,
      unit: !1,
      round: !1,
      isoWeekday: !1,
      minUnit: "millisecond",
      displayFormats: {}
    },
    ticks: {
      source: "auto",
      callback: !1,
      major: {
        enabled: !1
      }
    }
  };
  constructor(t) {
    super(t), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(t, n = {}) {
    const s = t.time || (t.time = {}), i = this._adapter = new th._date(t.adapters.date);
    i.init(n), d0(s.displayFormats, i.formats()), this._parseOpts = {
      parser: s.parser,
      round: s.round,
      isoWeekday: s.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : ur(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, n = this._adapter, s = t.time.unit || "day";
    let { min: i, max: r, minDefined: a, maxDefined: o } = this.getUserBounds();
    function l(c) {
      !a && !isNaN(c.min) && (i = Math.min(i, c.min)), !o && !isNaN(c.max) && (r = Math.max(r, c.max));
    }
    (!a || !o) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), i = xt(i) && !isNaN(i) ? i : +n.startOf(Date.now(), s), r = xt(r) && !isNaN(r) ? r : +n.endOf(Date.now(), s) + 1, this.min = Math.min(i, r - 1), this.max = Math.max(i + 1, r);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let n = Number.POSITIVE_INFINITY, s = Number.NEGATIVE_INFINITY;
    return t.length && (n = t[0], s = t[t.length - 1]), {
      min: n,
      max: s
    };
  }
  buildTicks() {
    const t = this.options, n = t.time, s = t.ticks, i = s.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && i.length && (this.min = this._userMin || i[0], this.max = this._userMax || i[i.length - 1]);
    const r = this.min, a = this.max, o = yl(i, r, a);
    return this._unit = n.unit || (s.autoSkip ? fr(n.minUnit, this.min, this.max, this._getLabelCapacity(r)) : Ku(this, o.length, n.minUnit, this.min, this.max)), this._majorUnit = !s.major.enabled || this._unit === "year" ? void 0 : Ju(this._unit), this.initOffsets(i), t.reverse && o.reverse(), mr(this, o, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let n = 0, s = 0, i, r;
    this.options.offset && t.length && (i = this.getDecimalForValue(t[0]), t.length === 1 ? n = 1 - i : n = (this.getDecimalForValue(t[1]) - i) / 2, r = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? s = r : s = (r - this.getDecimalForValue(t[t.length - 2])) / 2);
    const a = t.length < 3 ? 0.5 : 0.25;
    n = Ct(n, 0, a), s = Ct(s, 0, a), this._offsets = {
      start: n,
      end: s,
      factor: 1 / (n + 1 + s)
    };
  }
  _generate() {
    const t = this._adapter, n = this.min, s = this.max, i = this.options, r = i.time, a = r.unit || fr(r.minUnit, n, s, this._getLabelCapacity(n)), o = et(i.ticks.stepSize, 1), l = a === "week" ? r.isoWeekday : !1, c = Ve(l) || l === !0, h = {};
    let d = n, u, g;
    if (c && (d = +t.startOf(d, "isoWeek", l)), d = +t.startOf(d, c ? "day" : a), t.diff(s, n, a) > 1e5 * o)
      throw new Error(n + " and " + s + " are too far apart with stepSize of " + o + " " + a);
    const p = i.ticks.source === "data" && this.getDataTimestamps();
    for (u = d, g = 0; u < s; u = +t.add(u, o, a), g++)
      gr(h, u, p);
    return (u === s || i.bounds === "ticks" || g === 1) && gr(h, u, p), Object.keys(h).sort(dr).map((b) => +b);
  }
  getLabelForValue(t) {
    const n = this._adapter, s = this.options.time;
    return s.tooltipFormat ? n.format(t, s.tooltipFormat) : n.format(t, s.displayFormats.datetime);
  }
  format(t, n) {
    const i = this.options.time.displayFormats, r = this._unit, a = n || i[r];
    return this._adapter.format(t, a);
  }
  _tickFormatFunction(t, n, s, i) {
    const r = this.options, a = r.ticks.callback;
    if (a)
      return gt(a, [
        t,
        n,
        s
      ], this);
    const o = r.time.displayFormats, l = this._unit, c = this._majorUnit, h = l && o[l], d = c && o[c], u = s[n], g = c && d && u && u.major;
    return this._adapter.format(t, i || (g ? d : h));
  }
  generateTickLabels(t) {
    let n, s, i;
    for (n = 0, s = t.length; n < s; ++n)
      i = t[n], i.label = this._tickFormatFunction(i.value, n, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const n = this._offsets, s = this.getDecimalForValue(t);
    return this.getPixelForDecimal((n.start + s) * n.factor);
  }
  getValueForPixel(t) {
    const n = this._offsets, s = this.getDecimalForPixel(t) / n.factor - n.end;
    return this.min + s * (this.max - this.min);
  }
  _getLabelSize(t) {
    const n = this.options.ticks, s = this.ctx.measureText(t).width, i = Yt(this.isHorizontal() ? n.maxRotation : n.minRotation), r = Math.cos(i), a = Math.sin(i), o = this._resolveTickFontOptions(0).size;
    return {
      w: s * r + o * a,
      h: s * a + o * r
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, s = n.displayFormats, i = s[n.unit] || s.millisecond, r = this._tickFormatFunction(t, 0, mr(this, [
      t
    ], this._majorUnit), i), a = this._getLabelSize(r), o = Math.floor(this.isHorizontal() ? this.width / a.w : this.height / a.h) - 1;
    return o > 0 ? o : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], n, s;
    if (t.length)
      return t;
    const i = this.getMatchingVisibleMetas();
    if (this._normalized && i.length)
      return this._cache.data = i[0].controller.getAllParsedValues(this);
    for (n = 0, s = i.length; n < s; ++n)
      t = t.concat(i[n].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let n, s;
    if (t.length)
      return t;
    const i = this.getLabels();
    for (n = 0, s = i.length; n < s; ++n)
      t.push(ur(this, i[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return jr(t.sort(dr));
  }
}
function j0(e, t, n) {
  let s = 0, i = e.length - 1, r, a, o, l;
  n ? (t >= e[s].pos && t <= e[i].pos && ({ lo: s, hi: i } = ce(e, "pos", t)), { pos: r, time: o } = e[s], { pos: a, time: l } = e[i]) : (t >= e[s].time && t <= e[i].time && ({ lo: s, hi: i } = ce(e, "time", t)), { time: r, pos: o } = e[s], { time: a, pos: l } = e[i]);
  const c = a - r;
  return c ? o + (l - o) * (t - r) / c : o;
}
class tf extends os {
  static id = "timeseries";
  static defaults = os.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = j0(n, this.min), this._tableRange = j0(n, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: n, max: s } = this, i = [], r = [];
    let a, o, l, c, h;
    for (a = 0, o = t.length; a < o; ++a)
      c = t[a], c >= n && c <= s && i.push(c);
    if (i.length < 2)
      return [
        {
          time: n,
          pos: 0
        },
        {
          time: s,
          pos: 1
        }
      ];
    for (a = 0, o = i.length; a < o; ++a)
      h = i[a + 1], l = i[a - 1], c = i[a], Math.round((h + l) / 2) !== c && r.push({
        time: c,
        pos: a / (o - 1)
      });
    return r;
  }
  _generate() {
    const t = this.min, n = this.max;
    let s = super.getDataTimestamps();
    return (!s.includes(t) || !s.length) && s.splice(0, 0, t), (!s.includes(n) || s.length === 1) && s.push(n), s.sort((i, r) => i - r);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const n = this.getDataTimestamps(), s = this.getLabelTimestamps();
    return n.length && s.length ? t = this.normalize(n.concat(s)) : t = n.length ? n : s, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (j0(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, s = this.getDecimalForPixel(t) / n.factor - n.end;
    return j0(this._table, s * this._tableRange + this._minPos, !0);
  }
}
var ef = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  CategoryScale: Au,
  LinearScale: Iu,
  LogarithmicScale: Eu,
  RadialLinearScale: Zu,
  TimeScale: os,
  TimeSeriesScale: tf
});
const nf = [
  Qc,
  Dd,
  Nu,
  ef
];
Rs.register(...nf);
const ls = (e) => {
  const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
  return t ? {
    r: parseInt(t[1], 16),
    g: parseInt(t[2], 16),
    b: parseInt(t[3], 16)
  } : null;
}, sf = (e, t) => {
  const n = ls(e);
  if (!n) return e;
  const s = Math.min(255, Math.floor(n.r + (255 - n.r) * t)), i = Math.min(255, Math.floor(n.g + (255 - n.g) * t)), r = Math.min(255, Math.floor(n.b + (255 - n.b) * t));
  return `rgb(${s}, ${i}, ${r})`;
}, rf = (e) => {
  const t = ls(e);
  if (!t)
    return {
      primary: "rgba(43, 176, 212, 0.2)",
      primaryBorder: "rgb(43, 176, 212)",
      secondary: "rgba(97, 193, 145, 0.2)",
      secondaryBorder: "rgb(97, 193, 145)"
    };
  const n = `rgba(${t.r}, ${t.g}, ${t.b}, 0.2)`, s = `rgb(${t.r}, ${t.g}, ${t.b})`, i = sf(e, 0.4), r = ls(i) || t, a = `rgba(${r.r}, ${r.g}, ${r.b}, 0.2)`;
  return {
    primary: n,
    primaryBorder: s,
    secondary: a,
    secondaryBorder: i
  };
}, Q1 = ({
  data: e = {},
  width: t = 700,
  height: n = 500,
  animationDuration: s = 2e3,
  animationEasing: i = "easeInOutExpo",
  showLegend: r = !0,
  responsive: a = !0,
  maintainAspectRatio: o = !1,
  scaleMax: l = 100,
  scaleSteps: c = 5,
  // scaleColor = "#000000",
  color: h = "#2bb0d4",
  // Default color (blue)
  className: d = "",
  ...u
}) => {
  const g = H(null), p = H(null);
  return G(() => {
    if (!g.current) return;
    p.current && p.current.destroy();
    const b = g.current.getContext("2d"), m = rf(h), y = {
      ...e,
      datasets: e.datasets.map((v, k) => {
        const M = k === 0;
        return {
          ...v,
          backgroundColor: M ? m.primary : m.secondary,
          borderColor: M ? m.primaryBorder : m.secondaryBorder,
          pointBackgroundColor: M ? m.primaryBorder : m.secondaryBorder,
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: M ? m.primaryBorder : m.secondaryBorder
        };
      })
    }, x = {
      type: "radar",
      data: {
        ...y,
        datasets: y.datasets.map((v) => ({
          ...v,
          data: new Array(v.data.length).fill(0)
          // Start from zero
        }))
      },
      options: {
        responsive: a,
        maintainAspectRatio: o,
        plugins: {
          legend: {
            display: r,
            position: "bottom",
            labels: {
              usePointStyle: !0,
              padding: 20,
              font: {
                size: window.innerWidth <= 480 ? 10 : window.innerWidth <= 768 ? 12 : 14,
                weight: "600",
                family: "'freight-sans-pro', Calibri, Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif"
              }
            }
          },
          tooltip: {
            enabled: !0,
            backgroundColor: "rgba(0,0,0,0.8)",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "rgba(255,255,255,0.2)",
            borderWidth: 1
          }
        },
        scales: {
          r: {
            beginAtZero: !0,
            min: 0,
            max: l,
            ticks: {
              stepSize: l / c,
              color: "#99b",
              font: {
                size: window.innerWidth <= 480 ? 8 : window.innerWidth <= 768 ? 10 : 12
              },
              backdropColor: "transparent",
              z: 1
            },
            grid: {
              color: "rgba(200,200,200,.3)",
              lineWidth: 1
            },
            angleLines: {
              color: "rgba(200,200,250,.3)",
              lineWidth: 1
            },
            pointLabels: {
              color: "#99b",
              font: {
                size: window.innerWidth <= 480 ? 10 : window.innerWidth <= 768 ? 12 : 14,
                family: "'freight-sans-pro', Calibri, Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif"
              }
            }
          }
        },
        animation: {
          duration: s,
          easing: i,
          onComplete: () => {
          }
        },
        elements: {
          line: {
            borderWidth: window.innerWidth <= 768 ? 1.5 : 2
          },
          point: {
            radius: window.innerWidth <= 768 ? 3 : 4,
            hoverRadius: window.innerWidth <= 768 ? 5 : 6
          }
        }
      }
    };
    p.current = new Rs(b, x), setTimeout(() => {
      p.current && (p.current.data.datasets = y.datasets, p.current.update("active"));
    }, 100);
    const w = () => {
      p.current && p.current.resize();
    };
    return window.addEventListener("resize", w), () => {
      window.removeEventListener("resize", w), p.current && (p.current.destroy(), p.current = null);
    };
  }, [e, s, i, r, a, o, l, c, h]), /* @__PURE__ */ f("div", { className: `skillbar-container ${d}`, ...u, children: /* @__PURE__ */ f("div", { className: "skillbar-chart", children: /* @__PURE__ */ f(
    "canvas",
    {
      ref: g,
      className: "skillbar-canvas"
    }
  ) }) });
}, tb = ({
  options: e = [],
  name: t,
  value: n,
  onChange: s,
  variant: i = "basic",
  theme: r = "light",
  color: a = "#e33de0",
  // New color prop
  className: o = "",
  disabled: l = !1,
  ...c
}) => {
  const [h, d] = X(n || ""), u = (m) => {
    l || (d(m), s && s(m));
  }, g = a ? {
    "--radio-primary": a,
    "--radio-primary-light": `${a}20`
    // Add transparency
  } : {}, p = (m, y) => {
    const _ = h === m.value, x = `${t}-${m.value}-${y}`;
    switch (i) {
      case "basic":
        return /* @__PURE__ */ I("div", { className: "radio-option", children: [
          /* @__PURE__ */ f(
            "input",
            {
              type: "radio",
              id: x,
              name: t,
              value: m.value,
              checked: _,
              onChange: () => u(m.value),
              disabled: l
            }
          ),
          /* @__PURE__ */ f("label", { htmlFor: x, children: m.label })
        ] }, m.value);
      case "inline":
        return /* @__PURE__ */ I("div", { className: "radio-option", children: [
          /* @__PURE__ */ f(
            "input",
            {
              type: "radio",
              id: x,
              name: t,
              value: m.value,
              checked: _,
              onChange: () => u(m.value),
              disabled: l
            }
          ),
          /* @__PURE__ */ f("label", { htmlFor: x, children: m.label })
        ] }, m.value);
      case "modern-circle":
        return /* @__PURE__ */ I("div", { className: "radio-option", children: [
          /* @__PURE__ */ f(
            "input",
            {
              type: "radio",
              id: x,
              name: t,
              value: m.value,
              checked: _,
              onChange: () => u(m.value),
              disabled: l
            }
          ),
          /* @__PURE__ */ f("label", { htmlFor: x, children: m.label })
        ] }, m.value);
      case "toggle":
        return /* @__PURE__ */ I(ve.Fragment, { children: [
          /* @__PURE__ */ f(
            "input",
            {
              type: "radio",
              id: x,
              name: t,
              value: m.value,
              checked: _,
              onChange: () => u(m.value),
              disabled: l
            }
          ),
          /* @__PURE__ */ f("label", { htmlFor: x, children: m.label })
        ] }, m.value);
      case "card":
        return /* @__PURE__ */ I("div", { className: "card-radio", children: [
          /* @__PURE__ */ f(
            "input",
            {
              type: "radio",
              id: x,
              name: t,
              value: m.value,
              checked: _,
              onChange: () => u(m.value),
              disabled: l
            }
          ),
          /* @__PURE__ */ I("label", { htmlFor: x, children: [
            m.title && /* @__PURE__ */ f("div", { className: "card-title", children: m.title }),
            m.price && /* @__PURE__ */ f("div", { className: "price", children: m.price }),
            m.description && /* @__PURE__ */ f("div", { className: "description", children: m.description })
          ] })
        ] }, m.value);
      case "emoji-rating":
        return /* @__PURE__ */ I("div", { className: "radio-option", children: [
          /* @__PURE__ */ f(
            "input",
            {
              type: "radio",
              id: x,
              name: t,
              value: m.value,
              checked: _,
              onChange: () => u(m.value),
              disabled: l
            }
          ),
          /* @__PURE__ */ f("label", { htmlFor: x, children: m.emoji || m.label })
        ] }, m.value);
      case "color":
        return /* @__PURE__ */ I("div", { className: "image-radio", children: [
          /* @__PURE__ */ f(
            "input",
            {
              type: "radio",
              id: x,
              name: t,
              value: m.value,
              checked: _,
              onChange: () => u(m.value),
              disabled: l
            }
          ),
          /* @__PURE__ */ f("label", { htmlFor: x, children: /* @__PURE__ */ f(
            "div",
            {
              className: "color-box",
              style: { backgroundColor: m.color || m.value }
            }
          ) })
        ] }, m.value);
      case "vertical-list":
        return /* @__PURE__ */ I("div", { className: "vertical-list-item", children: [
          /* @__PURE__ */ f(
            "input",
            {
              type: "radio",
              id: x,
              name: t,
              value: m.value,
              checked: _,
              onChange: () => u(m.value),
              disabled: l
            }
          ),
          /* @__PURE__ */ f("label", { htmlFor: x, children: m.label })
        ] }, m.value);
      default:
        return null;
    }
  };
  return /* @__PURE__ */ I(
    "div",
    {
      className: `${(() => {
        const m = "radio-group", y = `radio-group-${i}`, _ = `radio-group-${r}`;
        switch (i) {
          case "basic":
            return `${m} ${y} ${_} basic-container`;
          case "inline":
            return `${m} ${y} ${_} inline-container`;
          case "modern-circle":
            return `${m} ${y} ${_} custom-radio-1`;
          case "toggle":
            return `${m} ${y} ${_} toggle-container`;
          case "card":
            return `${m} ${y} ${_} card-options`;
          case "emoji-rating":
            return `${m} ${y} ${_} rating-container`;
          case "color":
            return `${m} ${y} ${_} image-options`;
          case "vertical-list":
            return `${m} ${y} ${_} vertical-list`;
          default:
            return `${m} ${y} ${_}`;
        }
      })()} ${o} ${l ? "disabled" : ""}`,
      style: g,
      ...c,
      children: [
        e.map((m, y) => p(m, y)),
        i === "toggle" && /* @__PURE__ */ f("div", { className: "slide" })
      ]
    }
  );
}, eb = ({
  fields: e = [],
  onSubmit: t,
  title: n = "Form",
  submitButtonText: s = "Submit",
  resetButtonText: i = "Reset",
  showResetButton: r = !0,
  theme: a = "",
  className: o = "",
  formClassName: l = "",
  headerClassName: c = "",
  tableClassName: h = "",
  data: d = [],
  showDataTable: u = !1,
  tableTitle: g = "Data",
  customValidation: p = {},
  color: b = "#3b82f6",
  ...m
}) => {
  const [y, _] = X({}), [x, w] = X({}), [v, k] = X(d), M = h0(() => {
    const A = (B) => {
      const z = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(B);
      return z ? {
        r: parseInt(z[1], 16),
        g: parseInt(z[2], 16),
        b: parseInt(z[3], 16)
      } : { r: 59, g: 130, b: 246 };
    }, T = (B, z, L) => "#" + [B, z, L].map(($) => {
      const F = Math.round($).toString(16);
      return F.length === 1 ? "0" + F : F;
    }).join(""), O = (B, z) => ({
      r: Math.max(0, Math.min(255, B.r * z)),
      g: Math.max(0, Math.min(255, B.g * z)),
      b: Math.max(0, Math.min(255, B.b * z))
    }), D = A(b), E = O(D, 0.8);
    return {
      base: b,
      hover: T(E.r, E.g, E.b),
      light: `rgba(${D.r}, ${D.g}, ${D.b}, 0.1)`,
      rgb: `${D.r}, ${D.g}, ${D.b}`
    };
  }, [b]), S = (A, T, O) => {
    const D = p[A] || O.validation || {};
    return D.required && (!T || T.trim() === "") ? `${O.label || A} is required` : D.minLength && T && T.length < D.minLength ? `${O.label || A} must be at least ${D.minLength} characters` : D.maxLength && T && T.length > D.maxLength ? `${O.label || A} must be no more than ${D.maxLength} characters` : D.pattern && T && !D.pattern.test(T) ? D.message || `${O.label || A} format is invalid` : O.type === "email" && T && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(T) ? "Please enter a valid email address" : null;
  }, N = (A, T) => {
    _((O) => ({ ...O, [A]: T })), x[A] && w((O) => ({ ...O, [A]: null }));
  }, P = (A) => {
    A.preventDefault();
    const T = {};
    let O = !1;
    if (e.forEach((D) => {
      const E = S(D.name, y[D.name], D);
      E && (T[D.name] = E, O = !0);
    }), w(T), !O) {
      const D = {
        ...y,
        id: v.length + 1
      };
      u && k((E) => [...E, D]), t && t(D), _({});
    }
  }, R = () => {
    _({}), w({});
  }, C = (A) => {
    const {
      name: T,
      type: O = "text",
      label: D,
      placeholder: E,
      options: B = [],
      className: z = "",
      ...L
    } = A, $ = `rhf-input ${x[T] ? "rhf-input-error" : ""} ${z}`;
    switch (O) {
      case "select":
        return /* @__PURE__ */ I(
          "select",
          {
            className: $,
            value: y[T] || "",
            onChange: (F) => N(T, F.target.value),
            ...L,
            children: [
              /* @__PURE__ */ f("option", { value: "", children: E || `Select ${D || T}` }),
              B.map((F, j) => /* @__PURE__ */ f("option", { value: F.value || F, children: F.label || F }, j))
            ]
          }
        );
      case "textarea":
        return /* @__PURE__ */ f(
          "textarea",
          {
            className: $,
            value: y[T] || "",
            onChange: (F) => N(T, F.target.value),
            placeholder: E,
            rows: 4,
            ...L
          }
        );
      case "checkbox":
        return /* @__PURE__ */ I("label", { className: "rhf-checkbox-label", children: [
          /* @__PURE__ */ f(
            "input",
            {
              type: "checkbox",
              className: "rhf-checkbox",
              checked: y[T] || !1,
              onChange: (F) => N(T, F.target.checked),
              ...L
            }
          ),
          /* @__PURE__ */ f("span", { className: "rhf-checkbox-text", children: D || T })
        ] });
      case "radio":
        return /* @__PURE__ */ f("div", { className: "rhf-radio-group", children: B.map((F, j) => /* @__PURE__ */ I("label", { className: "rhf-radio-label", children: [
          /* @__PURE__ */ f(
            "input",
            {
              type: "radio",
              className: "rhf-radio",
              name: T,
              value: F.value || F,
              checked: y[T] === (F.value || F),
              onChange: (W) => N(T, W.target.value),
              ...L
            }
          ),
          /* @__PURE__ */ f("span", { className: "rhf-radio-text", children: F.label || F })
        ] }, j)) });
      default:
        return /* @__PURE__ */ f(
          "input",
          {
            type: O,
            className: $,
            value: y[T] || "",
            onChange: (F) => N(T, F.target.value),
            placeholder: E,
            ...L
          }
        );
    }
  };
  return /* @__PURE__ */ I(
    "div",
    {
      className: `rhf-container ${a}`,
      style: {
        "--rhf-color-base": M.base,
        "--rhf-color-hover": M.hover,
        "--rhf-color-light": M.light,
        "--rhf-color-rgb": M.rgb
      },
      ...m,
      children: [
        n && /* @__PURE__ */ f("header", { className: `rhf-header ${c}`, children: /* @__PURE__ */ f("h2", { className: "rhf-title", children: n }) }),
        /* @__PURE__ */ I("form", { onSubmit: P, className: `rhf-form ${l}`, children: [
          e.map((A) => /* @__PURE__ */ I("div", { className: "rhf-form-group", children: [
            A.type !== "checkbox" && /* @__PURE__ */ I("label", { htmlFor: A.name, className: "rhf-label", children: [
              A.label || A.name,
              A.validation?.required && /* @__PURE__ */ f("span", { className: "rhf-required", children: "*" })
            ] }),
            C(A),
            x[A.name] && /* @__PURE__ */ I("div", { className: "rhf-error-message", children: [
              /* @__PURE__ */ f("svg", { viewBox: "0 0 20 20", fill: "currentColor", className: "rhf-error-icon", children: /* @__PURE__ */ f("path", { fillRule: "evenodd", d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }),
              /* @__PURE__ */ f("span", { children: x[A.name] })
            ] })
          ] }, A.name)),
          /* @__PURE__ */ I("div", { className: "rhf-form-actions", children: [
            r && /* @__PURE__ */ f(
              "button",
              {
                type: "button",
                onClick: R,
                className: "rhf-button rhf-button-secondary",
                children: i
              }
            ),
            /* @__PURE__ */ f("button", { type: "submit", className: "rhf-button rhf-button-primary", children: s })
          ] })
        ] }),
        u && /* @__PURE__ */ I("div", { className: `rhf-data-table-container ${h}`, children: [
          /* @__PURE__ */ I("h3", { className: "rhf-data-title", children: [
            g,
            " (",
            v.length,
            ")"
          ] }),
          /* @__PURE__ */ I("table", { className: "rhf-data-table", children: [
            /* @__PURE__ */ f("thead", { children: /* @__PURE__ */ I("tr", { children: [
              /* @__PURE__ */ f("th", { children: "ID" }),
              e.filter((A) => A.type !== "checkbox" || y[A.name]).map((A) => /* @__PURE__ */ f("th", { children: A.label || A.name }, A.name))
            ] }) }),
            /* @__PURE__ */ f("tbody", { children: v.map((A) => /* @__PURE__ */ I("tr", { children: [
              /* @__PURE__ */ f("td", { children: A.id }),
              e.filter((T) => T.type !== "checkbox" || A[T.name]).map((T) => /* @__PURE__ */ f("td", { children: typeof A[T.name] == "boolean" ? A[T.name] ? "Yes" : "No" : A[T.name] || "-" }, T.name))
            ] }, A.id)) })
          ] })
        ] })
      ]
    }
  );
}, nb = ({
  children: e,
  directions: t = ["right", "bottom"],
  width: n,
  height: s,
  minWidth: i = 50,
  minHeight: r = 50,
  maxWidth: a,
  maxHeight: o,
  flex: l = !1,
  centeredX: c = !1,
  centeredY: h = !1,
  disabled: d = !1,
  handleContent: u,
  onResizeStart: g,
  onResize: p,
  onResizeEnd: b,
  className: m = "",
  style: y = {},
  ..._
}) => {
  const x = H(null), [w, v] = X(!1), [k, M] = X({
    direction: null,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    axis: null
  }), S = H(null), N = st((E, B = 16) => {
    S.current && clearTimeout(S.current), S.current = setTimeout(E, B);
  }, []), P = st(() => {
    const E = document.documentElement.style;
    return "flexBasis" in E ? "flexBasis" : "webkitFlexBasis" in E ? "webkitFlexBasis" : "msFlexPreferredSize" in E ? "msFlexPreferredSize" : "flexBasis";
  }, []), R = st((E, B) => {
    const z = x.current;
    if (!z) return;
    const L = l ? P() : null;
    if (E !== null) {
      const $ = Math.max(
        i,
        a ? Math.min(E, a) : E
      );
      l && k.axis === "x" ? z.style[L] = `${$}px` : z.style.width = `${$}px`;
    }
    if (B !== null) {
      const $ = Math.max(
        r,
        o ? Math.min(B, o) : B
      );
      l && k.axis === "y" ? z.style[L] = `${$}px` : z.style.height = `${$}px`;
    }
  }, [l, i, r, a, o, k.axis, P]), C = st((E) => {
    if (!w || !x.current) return;
    const { direction: B, startX: z, startY: L, startWidth: $, startHeight: F } = k, j = c ? 2 : 1, W = h ? 2 : 1;
    let Y = null, V = null;
    const U = z - E.clientX, Z = L - E.clientY;
    switch (B) {
      case "top":
        V = F + Z * W;
        break;
      case "bottom":
        V = F - Z * W;
        break;
      case "left":
        Y = $ + U * j;
        break;
      case "right":
        Y = $ - U * j;
        break;
    }
    R(Y, V), p && N(() => {
      x.current && p({
        width: Y || $,
        height: V || F,
        direction: B,
        event: E
      });
    });
  }, [w, k, c, h, p, N, R]), A = st((E) => {
    if (w) {
      if (v(!1), x.current?.classList.remove("no-transition"), b) {
        const B = x.current;
        if (B) {
          const z = B.getBoundingClientRect();
          b({
            width: z.width,
            height: z.height,
            direction: k.direction,
            event: E
          });
        }
      }
      M({
        direction: null,
        startX: 0,
        startY: 0,
        startWidth: 0,
        startHeight: 0,
        axis: null
      });
    }
  }, [w, k.direction, b]), T = st((E, B) => {
    if (d || E.button !== 0) return;
    E.preventDefault(), E.stopPropagation();
    const z = x.current;
    if (!z) return;
    z.getBoundingClientRect();
    const L = window.getComputedStyle(z), $ = parseInt(L.getPropertyValue("width"), 10), F = parseInt(L.getPropertyValue("height"), 10), j = B === "left" || B === "right" ? "x" : "y";
    M({
      direction: B,
      startX: E.clientX,
      startY: E.clientY,
      startWidth: $,
      startHeight: F,
      axis: j
    }), v(!0), z.classList.add("no-transition"), g && g({
      width: $,
      height: F,
      direction: B,
      event: E
    });
  }, [d, g]);
  G(() => (w && (document.addEventListener("mousemove", C, !1), document.addEventListener("mouseup", A, !1)), () => {
    document.removeEventListener("mousemove", C, !1), document.removeEventListener("mouseup", A, !1);
  }), [w, C, A]), G(() => {
    (n !== void 0 || s !== void 0) && R(n || null, s || null);
  }, [n, s, R]);
  const O = (E) => {
    const B = {
      className: `resize-handle rg-${E}${w && k.direction === E ? " dragging" : ""}`,
      onMouseDown: (z) => T(z, E),
      onDragStart: () => !1
      // Prevent default drag behavior
    };
    return /* @__PURE__ */ f("div", { ...B, children: u ? /* @__PURE__ */ f("div", { className: "custom-handle", children: u }) : /* @__PURE__ */ f("span", {}) }, E);
  }, D = {
    ...y,
    ...n !== void 0 && { width: `${n}px` },
    ...s !== void 0 && { height: `${s}px` }
  };
  return /* @__PURE__ */ I(
    "div",
    {
      ref: x,
      className: `resizable ${m}`,
      style: D,
      ..._,
      children: [
        e,
        !d && t.map(O)
      ]
    }
  );
}, sb = ({
  variant: e = "left",
  items: t = [],
  title: n,
  subtitle: s,
  className: i = "",
  showImages: r = !0,
  customLineColor: a,
  customAccentColor: o,
  theme: l = "roadmap-light",
  color: c = "#e33de0"
  // Primary color for theming
}) => {
  const h = H(null), d = (x) => {
    const w = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(x);
    return w ? {
      r: parseInt(w[1], 16),
      g: parseInt(w[2], 16),
      b: parseInt(w[3], 16)
    } : null;
  }, u = (x) => {
    const w = d(x);
    return w && (0.299 * w.r + 0.587 * w.g + 0.114 * w.b) / 255 > 0.5 ? "#000000" : "#ffffff";
  }, g = (x, w) => {
    const v = d(x);
    if (!v) return x;
    const k = (M) => {
      const S = M + (255 - M) * (w / 100);
      return Math.min(255, Math.max(0, Math.round(S)));
    };
    if (w > 0)
      return `#${k(v.r).toString(16).padStart(2, "0")}${k(v.g).toString(16).padStart(2, "0")}${k(v.b).toString(16).padStart(2, "0")}`;
    {
      const M = (S) => {
        const N = S * (1 + w / 100);
        return Math.min(255, Math.max(0, Math.round(N)));
      };
      return `#${M(v.r).toString(16).padStart(2, "0")}${M(v.g).toString(16).padStart(2, "0")}${M(v.b).toString(16).padStart(2, "0")}`;
    }
  };
  G(() => {
    if (!h.current) return;
    const x = d(c), w = u(c);
    h.current.style.setProperty("--roadmap-accent-color", c), h.current.style.setProperty("--roadmap-accent-light", g(c, 85)), h.current.style.setProperty("--roadmap-accent-dark", g(c, -15)), h.current.style.setProperty("--roadmap-text-on-accent", w);
    const v = g(c, 70);
    h.current.style.setProperty("--roadmap-line-color", v), h.current.style.setProperty("--roadmap-bar-color", `rgba(${x?.r || 0}, ${x?.g || 0}, ${x?.b || 0}, 0.5)`);
  }, [c]);
  const p = () => /* @__PURE__ */ I("div", { className: `roadmap-container roadmap-left ${l} ${i}`, children: [
    n && /* @__PURE__ */ I("div", { className: "roadmap-header", children: [
      /* @__PURE__ */ f("h1", { children: n }),
      s && /* @__PURE__ */ f("p", { children: s })
    ] }),
    /* @__PURE__ */ I("div", { className: "roadmap-timeline", children: [
      /* @__PURE__ */ f("div", { className: "roadmap-timeline-line" }),
      t.map((x, w) => /* @__PURE__ */ I("div", { className: "roadmap-timeline-item", children: [
        /* @__PURE__ */ f("div", { className: "roadmap-timeline-number", children: x.step || w + 1 }),
        /* @__PURE__ */ I("div", { className: "roadmap-timeline-content", children: [
          /* @__PURE__ */ f("h2", { children: x.title }),
          /* @__PURE__ */ f("p", { children: x.description }),
          x.date && /* @__PURE__ */ f("span", { className: "roadmap-date", children: x.date })
        ] }),
        r && x.icon && /* @__PURE__ */ f("div", { className: "roadmap-timeline-image", children: typeof x.icon == "string" ? /* @__PURE__ */ f("span", { className: "roadmap-emoji", children: x.icon }) : x.icon })
      ] }, w))
    ] })
  ] }), b = () => /* @__PURE__ */ I("div", { className: `roadmap-container roadmap-alternative ${l} ${i}`, children: [
    n && /* @__PURE__ */ I("div", { className: "roadmap-header", children: [
      /* @__PURE__ */ f("h1", { children: n }),
      s && /* @__PURE__ */ f("p", { children: s })
    ] }),
    /* @__PURE__ */ I("div", { className: "roadmap-timeline roadmap-timeline-alternative", children: [
      /* @__PURE__ */ f("div", { className: "roadmap-timeline-line-alt" }),
      t.map((x, w) => /* @__PURE__ */ I(
        "div",
        {
          className: `roadmap-timeline-item-alt ${w % 2 === 0 ? "roadmap-left-item" : "roadmap-right-item"}`,
          children: [
            /* @__PURE__ */ I("div", { className: "roadmap-timeline-content-alt", children: [
              /* @__PURE__ */ f("h2", { children: x.title }),
              /* @__PURE__ */ f("p", { children: x.description }),
              x.date && /* @__PURE__ */ f("span", { className: "roadmap-date", children: x.date })
            ] }),
            /* @__PURE__ */ f("div", { className: "roadmap-timeline-marker", children: /* @__PURE__ */ f("div", { className: "roadmap-timeline-dot", children: x.step || w + 1 }) })
          ]
        },
        w
      ))
    ] })
  ] }), m = () => {
    const w = Math.ceil(t.length / 3), v = [];
    for (let k = 0; k < w; k++)
      v.push(t.slice(k * 3, (k + 1) * 3));
    return /* @__PURE__ */ I("div", { className: `roadmap-container roadmap-zigzag ${l} ${i}`, children: [
      n && /* @__PURE__ */ I("div", { className: "roadmap-header", children: [
        /* @__PURE__ */ f("h1", { children: n }),
        s && /* @__PURE__ */ f("p", { children: s })
      ] }),
      /* @__PURE__ */ f("div", { className: "roadmap-map-wrapper", children: v.map((k, M) => /* @__PURE__ */ f("div", { className: "roadmap-row", children: Array.from({ length: 3 }).map((S, N) => {
        const P = k[N];
        return /* @__PURE__ */ f(
          "div",
          {
            className: `roadmap-item-bar ${P ? "" : "roadmap-empty"}`,
            children: P && /* @__PURE__ */ I(kt, { children: [
              /* @__PURE__ */ I("div", { className: "roadmap-item-info", children: [
                P.icon && /* @__PURE__ */ f("span", { className: "roadmap-item-emoji", children: typeof P.icon == "string" ? P.icon : "" }),
                P.title
              ] }),
              /* @__PURE__ */ f("div", { className: "roadmap-item-date", children: P.date })
            ] })
          },
          N
        );
      }) }, M)) })
    ] });
  }, y = () => {
    switch (e) {
      case "alternative":
        return b();
      case "zigzag":
        return m();
      case "left":
      default:
        return p();
    }
  }, _ = {};
  return a && (_["--roadmap-line-color"] = a), o && (_["--roadmap-accent-color"] = o), /* @__PURE__ */ f("div", { style: _, ref: h, children: y() });
}, Hn = ({ className: e = "" }) => /* @__PURE__ */ I(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    className: e,
    children: [
      /* @__PURE__ */ f("circle", { cx: "11", cy: "11", r: "8" }),
      /* @__PURE__ */ f("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
    ]
  }
), ib = ({
  type: e = "simple",
  // 'simple' or 'animated'
  placeholder: t = "Search...",
  value: n,
  onChange: s,
  onSubmit: i,
  onFocus: r,
  onBlur: a,
  disabled: o = !1,
  className: l = "",
  iconPosition: c = "left",
  // 'left' or 'right'
  size: h = "medium",
  // 'small', 'medium', 'large'
  variant: d = "default",
  // 'default', 'outlined', 'filled'
  theme: u = "light",
  // 'light' or 'dark'
  color: g = "#3b82f6",
  // Primary color for theming
  autoFocus: p = !1,
  clearable: b = !1,
  onClear: m,
  ...y
}) => {
  const [_, x] = X(""), [w, v] = X(!1), k = H(null), M = H(null), S = n !== void 0 ? n : _, N = n !== void 0, P = (F) => {
    const j = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(F);
    return j ? {
      r: parseInt(j[1], 16),
      g: parseInt(j[2], 16),
      b: parseInt(j[3], 16)
    } : null;
  }, R = (F) => {
    const j = P(F);
    return j && (0.299 * j.r + 0.587 * j.g + 0.114 * j.b) / 255 > 0.5 ? "#000000" : "#ffffff";
  }, C = (F, j) => {
    const W = P(F);
    if (!W) return F;
    const Y = (V) => {
      const U = V + (255 - V) * (j / 100);
      return Math.min(255, Math.max(0, Math.round(U)));
    };
    if (j > 0)
      return `#${Y(W.r).toString(16).padStart(2, "0")}${Y(W.g).toString(16).padStart(2, "0")}${Y(W.b).toString(16).padStart(2, "0")}`;
    {
      const V = (U) => {
        const Z = U * (1 + j / 100);
        return Math.min(255, Math.max(0, Math.round(Z)));
      };
      return `#${V(W.r).toString(16).padStart(2, "0")}${V(W.g).toString(16).padStart(2, "0")}${V(W.b).toString(16).padStart(2, "0")}`;
    }
  };
  G(() => {
    if (!M.current) return;
    const F = P(g), j = R(g);
    M.current.style.setProperty("--searchbar-primary", g), M.current.style.setProperty("--searchbar-primary-hover", C(g, -10)), M.current.style.setProperty("--searchbar-primary-light", C(g, 90)), M.current.style.setProperty("--searchbar-primary-dark", C(g, -20)), M.current.style.setProperty("--searchbar-focus-shadow", `rgba(${F?.r || 0}, ${F?.g || 0}, ${F?.b || 0}, 0.3)`), M.current.style.setProperty("--searchbar-text-on-primary", j), M.current.style.setProperty("--outline-color", g);
  }, [g]), G(() => {
    p && k.current && k.current.focus();
  }, [p]);
  const A = (F) => {
    const j = F.target.value;
    N || x(j), s?.(F);
  }, T = (F) => {
    F.preventDefault(), i?.(S, F);
  }, O = (F) => {
    e === "animated" && v(!0), r?.(F);
  }, D = (F) => {
    e === "animated" && !S.trim() && v(!1), a?.(F);
  }, E = () => {
    e === "animated" ? w ? S.trim() || v(!1) : (v(!0), setTimeout(() => k.current?.focus(), 50)) : k.current?.focus();
  }, B = () => {
    N || x(""), m?.(), k.current?.focus();
  }, z = (F) => {
    F.key === "Escape" && (k.current?.blur(), e === "animated" && !S.trim() && v(!1)), F.key === "Enter" && T(F);
  }, L = [
    "searchbar",
    `searchbar--${e}`,
    `searchbar--${h}`,
    `searchbar--${d}`,
    `searchbar--${u}`,
    `searchbar--icon-${c}`,
    w && e === "animated" ? "searchbar--active" : "",
    o ? "searchbar--disabled" : "",
    l
  ].filter(Boolean).join(" "), $ = b && S && !o;
  return e === "simple" ? /* @__PURE__ */ I("form", { className: L, onSubmit: T, ref: M, children: [
    c === "left" && /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        className: "searchbar__icon-btn",
        onClick: E,
        disabled: o,
        "aria-label": "Search",
        children: /* @__PURE__ */ f(Hn, {})
      }
    ),
    /* @__PURE__ */ f(
      "input",
      {
        ref: k,
        type: "search",
        className: "searchbar__input",
        placeholder: t,
        value: S,
        onChange: A,
        onFocus: O,
        onBlur: D,
        onKeyDown: z,
        disabled: o,
        "aria-label": "Search",
        ...y
      }
    ),
    $ && /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        className: "searchbar__clear-btn",
        onClick: B,
        "aria-label": "Clear search",
        children: "×"
      }
    ),
    c === "right" && /* @__PURE__ */ f(
      "button",
      {
        type: "submit",
        className: "searchbar__icon-btn",
        disabled: o,
        "aria-label": "Search",
        children: /* @__PURE__ */ f(Hn, {})
      }
    )
  ] }) : /* @__PURE__ */ I("div", { className: L, ref: M, children: [
    /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        className: "searchbar__icon-btn",
        onClick: E,
        disabled: o,
        "aria-label": w ? "Search" : "Open search",
        children: /* @__PURE__ */ f(Hn, {})
      }
    ),
    /* @__PURE__ */ f("form", { onSubmit: T, className: "searchbar__form", children: /* @__PURE__ */ f(
      "input",
      {
        ref: k,
        type: "search",
        className: "searchbar__input",
        placeholder: t,
        value: S,
        onChange: A,
        onFocus: O,
        onBlur: D,
        onKeyDown: z,
        disabled: o,
        "aria-label": "Search",
        ...y
      }
    ) }),
    $ && /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        className: "searchbar__clear-btn",
        onClick: B,
        "aria-label": "Clear search",
        children: "×"
      }
    )
  ] });
};
class af {
  constructor(t, n = {}) {
    this.canvas = t, this.gl = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl"), this.texture = null, this.program = null, this.time = 0, this.glitchIntensity = 0, this.targetGlitchIntensity = 0, this.imageWidth = 512, this.imageHeight = 512, this.glitchInterval = null, this.animationId = null, this.params = {
      // Glitch controls
      glitchFrequency: 0.5,
      glitchDuration: 300,
      maxGlitchIntensity: 1,
      minGlitchIntensity: 0.3,
      // Scanline controls
      scanlineSpeed: 0.15,
      scanlineIntensity: 0.04,
      thickScanlineSpeed: 0.03,
      thickScanlineIntensity: 0.02,
      scanlineGlitchThreshold: 0.98,
      // Distortion controls
      horizontalDistortion: 0.1,
      verticalGlitchBars: 0.2,
      rgbShiftIntensity: 1,
      // Visual effects
      colorGradeR: 1.1,
      colorGradeG: 0.95,
      colorGradeB: 0.9,
      noiseIntensity: 0.05,
      vignetteStrength: 0.3,
      // Image scaling
      imageScale: 0.8,
      // Animation
      pause: !1,
      ...n
      // Merge with provided options
    }, this.init();
  }
  init() {
    return this.gl ? (this.setupCanvas(), this.createShaders(), this.setupGlitchTiming(), !0) : (console.error("WebGL not supported"), !1);
  }
  setupCanvas() {
    const t = this.canvas.getBoundingClientRect();
    this.canvas.width = t.width * window.devicePixelRatio, this.canvas.height = t.height * window.devicePixelRatio, this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }
  createShaders() {
    const t = `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      uniform vec2 u_resolution;
      uniform vec2 u_imageSize;
      uniform float u_imageScale;
      varying vec2 v_texCoord;
      
      void main() {
          float screenAspect = u_resolution.x / u_resolution.y;
          float imageAspect = u_imageSize.x / u_imageSize.y;
          
          vec2 scale = vec2(1.0);
          if (imageAspect > screenAspect) {
              scale.y = screenAspect / imageAspect;
          } else {
              scale.x = imageAspect / screenAspect;
          }
          
          scale *= u_imageScale;
          
          gl_Position = vec4(a_position * scale, 0.0, 1.0);
          v_texCoord = a_texCoord;
      }
    `, n = `
      precision mediump float;
      uniform sampler2D u_texture;
      uniform float u_time;
      uniform float u_glitchIntensity;
      
      // Scanline uniforms
      uniform float u_scanlineSpeed;
      uniform float u_scanlineIntensity;
      uniform float u_thickScanlineSpeed;
      uniform float u_thickScanlineIntensity;
      uniform float u_scanlineGlitchThreshold;
      
      // Distortion uniforms
      uniform float u_horizontalDistortion;
      uniform float u_verticalGlitchBars;
      uniform float u_rgbShiftIntensity;
      
      // Visual effect uniforms
      uniform vec3 u_colorGrade;
      uniform float u_noiseIntensity;
      uniform float u_vignetteStrength;
      
      varying vec2 v_texCoord;

      float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      vec3 rgbShift(sampler2D tex, vec2 uv, float intensity) {
          float shift = intensity * u_rgbShiftIntensity * 0.01;
          float r = texture2D(tex, uv + vec2(shift, 0.0)).r;
          float g = texture2D(tex, uv).g;
          float b = texture2D(tex, uv - vec2(shift, 0.0)).b;
          return vec3(r, g, b);
      }

      void main() {
          vec2 uv = v_texCoord;
          
          // Moving VHS scanlines
          float scanlineOffset = u_time * u_scanlineSpeed;
          float scanlineY = uv.y + scanlineOffset;
          float scanline = sin(scanlineY * 800.0) * u_scanlineIntensity;
          
          // Glitching scanlines
          float scanlineGlitch = random(vec2(floor(scanlineY * 100.0), floor(u_time * 5.0)));
          if (scanlineGlitch > u_scanlineGlitchThreshold) {
              scanline *= 2.0;
          }
          
          // Thick scanline bands
          float thickScanline = sin((scanlineY + u_time * u_thickScanlineSpeed) * 50.0) * u_thickScanlineIntensity;
          scanline += thickScanline;
          
          // Horizontal distortion
          float noise = random(vec2(floor(uv.y * 150.0), floor(u_time * 10.0)));
          float distortion = (noise - 0.5) * u_glitchIntensity * u_horizontalDistortion;
          
          // Scanline-based distortion
          float scanlineDistort = step(0.985, random(vec2(floor(scanlineY * 200.0), floor(u_time * 8.0))));
          distortion += scanlineDistort * (noise - 0.5) * 0.03;
          
          uv.x += distortion;
          
          // Vertical glitch bars
          float glitchBar = step(0.98, random(vec2(floor(uv.y * 25.0), floor(u_time * 15.0))));
          uv.x += glitchBar * (noise - 0.5) * u_glitchIntensity * u_verticalGlitchBars;
          
          // RGB shift
          vec3 color = rgbShift(u_texture, uv, u_glitchIntensity);
          
          // Add moving scanlines
          color -= scanline;
          
          // Scanline color bleeding
          if (scanlineGlitch > u_scanlineGlitchThreshold) {
              color.r += 0.06;
              color.g -= 0.03;
          }
          
          // VHS color grading
          color *= u_colorGrade;
          
          // Add noise
          float grain = random(uv + u_time) * u_noiseIntensity;
          color += grain;
          
          // Vignette effect
          vec2 center = uv - 0.5;
          float vignette = 1.0 - dot(center, center) * u_vignetteStrength;
          color *= vignette;
          
          gl_FragColor = vec4(color, 1.0);
      }
    `, s = this.createShader(
      this.gl.VERTEX_SHADER,
      t
    ), i = this.createShader(
      this.gl.FRAGMENT_SHADER,
      n
    );
    if (this.program = this.gl.createProgram(), this.gl.attachShader(this.program, s), this.gl.attachShader(this.program, i), this.gl.linkProgram(this.program), !this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      const r = this.gl.getProgramInfoLog(this.program);
      console.error("Shader program failed to link:", r);
      return;
    }
    this.setupBuffers(), this.getUniformLocations();
  }
  getUniformLocations() {
    this.uniforms = {
      time: this.gl.getUniformLocation(this.program, "u_time"),
      glitchIntensity: this.gl.getUniformLocation(
        this.program,
        "u_glitchIntensity"
      ),
      resolution: this.gl.getUniformLocation(this.program, "u_resolution"),
      imageSize: this.gl.getUniformLocation(this.program, "u_imageSize"),
      imageScale: this.gl.getUniformLocation(this.program, "u_imageScale"),
      texture: this.gl.getUniformLocation(this.program, "u_texture"),
      // Scanline uniforms
      scanlineSpeed: this.gl.getUniformLocation(
        this.program,
        "u_scanlineSpeed"
      ),
      scanlineIntensity: this.gl.getUniformLocation(
        this.program,
        "u_scanlineIntensity"
      ),
      thickScanlineSpeed: this.gl.getUniformLocation(
        this.program,
        "u_thickScanlineSpeed"
      ),
      thickScanlineIntensity: this.gl.getUniformLocation(
        this.program,
        "u_thickScanlineIntensity"
      ),
      scanlineGlitchThreshold: this.gl.getUniformLocation(
        this.program,
        "u_scanlineGlitchThreshold"
      ),
      // Distortion uniforms
      horizontalDistortion: this.gl.getUniformLocation(
        this.program,
        "u_horizontalDistortion"
      ),
      verticalGlitchBars: this.gl.getUniformLocation(
        this.program,
        "u_verticalGlitchBars"
      ),
      rgbShiftIntensity: this.gl.getUniformLocation(
        this.program,
        "u_rgbShiftIntensity"
      ),
      // Visual effect uniforms
      colorGrade: this.gl.getUniformLocation(this.program, "u_colorGrade"),
      noiseIntensity: this.gl.getUniformLocation(
        this.program,
        "u_noiseIntensity"
      ),
      vignetteStrength: this.gl.getUniformLocation(
        this.program,
        "u_vignetteStrength"
      )
    }, this.attributes = {
      position: this.gl.getAttribLocation(this.program, "a_position"),
      texCoord: this.gl.getAttribLocation(this.program, "a_texCoord")
    };
  }
  createShader(t, n) {
    const s = this.gl.createShader(t);
    if (this.gl.shaderSource(s, n), this.gl.compileShader(s), !this.gl.getShaderParameter(s, this.gl.COMPILE_STATUS)) {
      const i = this.gl.getShaderInfoLog(s);
      return console.error("Shader compile error:", i), this.gl.deleteShader(s), null;
    }
    return s;
  }
  setupBuffers() {
    const t = new Float32Array([
      -1,
      -1,
      0,
      1,
      1,
      -1,
      1,
      1,
      -1,
      1,
      0,
      0,
      1,
      1,
      1,
      0
    ]);
    this.buffer = this.gl.createBuffer(), this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer), this.gl.bufferData(this.gl.ARRAY_BUFFER, t, this.gl.STATIC_DRAW);
  }
  loadImage(t) {
    return new Promise((n, s) => {
      const i = new Image();
      i.onload = () => {
        this.imageWidth = i.width, this.imageHeight = i.height, this.createTextureFromImage(i), n();
      }, i.onerror = s, i.crossOrigin = "anonymous", i.src = t;
    });
  }
  createTextureFromImage(t) {
    this.texture = this.gl.createTexture(), this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture), this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      t
    ), this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_S,
      this.gl.CLAMP_TO_EDGE
    ), this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_T,
      this.gl.CLAMP_TO_EDGE
    ), this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MIN_FILTER,
      this.gl.LINEAR
    ), this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MAG_FILTER,
      this.gl.LINEAR
    );
  }
  setupGlitchTiming() {
    const t = () => {
      const s = Math.random() * 3e3, i = this.params.glitchFrequency, r = 2e3 + s * (1 - i);
      this.glitchInterval = setTimeout(() => {
        Math.random() < i && this.triggerGlitch(), t();
      }, r);
    };
    t();
  }
  triggerGlitch() {
    const t = Math.random() * (this.params.maxGlitchIntensity - this.params.minGlitchIntensity) + this.params.minGlitchIntensity;
    this.targetGlitchIntensity = t, setTimeout(() => {
      this.targetGlitchIntensity = 0;
    }, this.params.glitchDuration);
  }
  updateParams(t) {
    this.params = { ...this.params, ...t };
  }
  start() {
    this.render();
  }
  render() {
    if (this.params.pause || (this.time += 0.016), this.glitchIntensity += (this.targetGlitchIntensity - this.glitchIntensity) * 0.1, this.gl.clearColor(0, 0, 0, 1), this.gl.clear(this.gl.COLOR_BUFFER_BIT), !this.texture) {
      this.animationId = requestAnimationFrame(() => this.render());
      return;
    }
    this.gl.useProgram(this.program), this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer), this.gl.enableVertexAttribArray(this.attributes.position), this.gl.vertexAttribPointer(
      this.attributes.position,
      2,
      this.gl.FLOAT,
      !1,
      16,
      0
    ), this.gl.enableVertexAttribArray(this.attributes.texCoord), this.gl.vertexAttribPointer(
      this.attributes.texCoord,
      2,
      this.gl.FLOAT,
      !1,
      16,
      8
    ), this.gl.uniform1f(this.uniforms.time, this.time), this.gl.uniform1f(this.uniforms.glitchIntensity, this.glitchIntensity), this.gl.uniform2f(
      this.uniforms.resolution,
      this.canvas.width,
      this.canvas.height
    ), this.gl.uniform2f(
      this.uniforms.imageSize,
      this.imageWidth,
      this.imageHeight
    ), this.gl.uniform1f(this.uniforms.imageScale, this.params.imageScale), this.gl.uniform1f(this.uniforms.scanlineSpeed, this.params.scanlineSpeed), this.gl.uniform1f(
      this.uniforms.scanlineIntensity,
      this.params.scanlineIntensity
    ), this.gl.uniform1f(
      this.uniforms.thickScanlineSpeed,
      this.params.thickScanlineSpeed
    ), this.gl.uniform1f(
      this.uniforms.thickScanlineIntensity,
      this.params.thickScanlineIntensity
    ), this.gl.uniform1f(
      this.uniforms.scanlineGlitchThreshold,
      this.params.scanlineGlitchThreshold
    ), this.gl.uniform1f(
      this.uniforms.horizontalDistortion,
      this.params.horizontalDistortion
    ), this.gl.uniform1f(
      this.uniforms.verticalGlitchBars,
      this.params.verticalGlitchBars
    ), this.gl.uniform1f(
      this.uniforms.rgbShiftIntensity,
      this.params.rgbShiftIntensity
    ), this.gl.uniform3f(
      this.uniforms.colorGrade,
      this.params.colorGradeR,
      this.params.colorGradeG,
      this.params.colorGradeB
    ), this.gl.uniform1f(this.uniforms.noiseIntensity, this.params.noiseIntensity), this.gl.uniform1f(
      this.uniforms.vignetteStrength,
      this.params.vignetteStrength
    ), this.gl.activeTexture(this.gl.TEXTURE0), this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture), this.gl.uniform1i(this.uniforms.texture, 0), this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4), this.animationId = requestAnimationFrame(() => this.render());
  }
  destroy() {
    this.glitchInterval && clearTimeout(this.glitchInterval), this.animationId && cancelAnimationFrame(this.animationId), this.gl && this.program && this.gl.deleteProgram(this.program), this.gl && this.texture && this.gl.deleteTexture(this.texture), this.gl && this.buffer && this.gl.deleteBuffer(this.buffer);
  }
}
const Es = ({
  src: e,
  alt: t = "Shader effect",
  className: n = "",
  style: s = {},
  glitchOptions: i = {},
  showControls: r = !1,
  title: a,
  description: o,
  onGlitch: l,
  children: c,
  ...h
}) => {
  const d = H(null), u = H(null), g = H(null), [p, b] = X(!0), [m, y] = X(!1);
  G(() => {
    if (!d.current) return;
    const v = new af(d.current, i);
    if (u.current = v, !v.init()) {
      console.error("Failed to initialize VHS effect"), y(!0), b(!1);
      return;
    }
    e ? v.loadImage(e).then(() => {
      v.start(), b(!1);
    }).catch((M) => {
      console.error("Failed to load image:", M), y(!0), b(!1);
    }) : v.loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfwAAAH8CAMAAAADjO0hAAACKFBMVEXsAIzsAI3sAIzsAYzsAo3sA43sBI7sBY7sBo/tB4/tCJDtCZDtCpHtC5HtDJHtDZLtDpLtD5PtEJPtEZTtEpTtFJXuFZXuFpbuF5buGJfuGpjuG5juHJnuHZnuHpruH5ruIJrvIpvvI5zvJJzvJZ3vJp3vJ57vKJ7vKZ7vKp/vK5/vLKDvLqHvL6HwMKLwMaLwMqPwM6PwNKPwNaTwNqTwN6XwOqbwO6fwPKfxPajxPqjxP6jxQKnxQanxRKvxRavxRqzySq3yS67yTK7yTa/yTq/yULDyUbHyUrHyVbLzWLTzWbTzWrXzW7XzXLXzXbbzXrbzX7fzYrjzY7nzZLn0Zbr0Zrr0aLv0a7z0bL30br70b771d8L2gMb2hMj2iMn3kc33ks73k873lM/3lc/3l9D3mdH3mtH4nNL4ndP4ntP4n9T4o9b4pNb4pdb4p9f5qNj5qdj5qtn5q9n5rNr5rdr5r9v5sdz5stz5s935tN36t9/6uN/6ud/6uuD6u+D6vOH6veH6vuL6weP7w+T7xOT7xeX7x+b7yOb7zOj7zej7zun7z+n70Or80er80uv80+v81Oz81ez81u381+382O382u782+/83O/93vD93/H94/L95PP95fP95vT95/T96PX96fX96vb+6/b+7Pb+7ff+7vf+7/j+8Pj+8fn+8vn+8/r+9Pr+9fr+9vv+9/v++Pz/+fz/+v3/+/3//P7//f7//v/////SUHNnAAAAAnRSTlOzzVyujk4AAAABYktHRLfdADtnAAAK9UlEQVR42u3diZ9WVR3HcTsImpAJCCklhFi2mAW2iJZLmYmR2TbZMkHbtGeSlWalLaSUW1lpyWDKogI2jCD336uX1AtS8XnO4d5zz3nu+/MXzHPfzPCd4cc8p71Gg+20oMEGH77gC77gC77gC77gC77gC77gC77gC77gC77gC77gC77gC77gC77gC77gC77gC77gC77gC77gw/cI4Au+4Au+4Au+4Au+4Au+4Au+4Au+4Au+4Au+4Au+4Au+CsdfuDZ/69andgnvNvFXNTU1O+rlvG0qsZs39dF6+C3iT1X1cpoZ+PDhw4cPHz58+PDhw4cPHz58+PDhw4cPHz58+PDhw4cPHz58+PDhw4cPHz58+PDhw4cPHz58+PDhw4cPHz58+PDhw4c/MfiPbsnVXfBLw78j5GoqB/72bH+WtzwAvzD86WwvJ8zAhw8fPnz48OHDhw8fPnz48OHDhw8fPnz48OHDhw8fPnz48OHDhw8ffl34V20b1Qz8ScXP8sUDPvwcrRn5JpFr4E8qfvfBhw8fPnz48OHDhw8fPnz48OHDhw8fPnz48OHDhw8fPnz48OHDhw8fPnz48OHDhw8fPnz48OHDhw8fPnz48OHDhw8fPnz48OHDhw8fPnz48OHDhw8fPnz48OGfrDunCmoJ/Kz4RbUKPnz48OHDhw8fPnz48OHDhw8fPnz48OHDhw8fPnz48OHDhw8fPnz48OHDhw8fPnz48OHDhw8fPnz48OHDhw8fPnz48OHDLxN/x0xBLYOfFd+vZYEPHz58+PDhw4cPHz58+IPGf2ZHOU3Bz4tfUtPw4cOHDx8+fPjw4cOHDx8+fPjw4cOHDx8+fPjw4cOHDx8+fPjw4cOHDx8+fPjw4cOHDx8+fPjw4cOHDx8+fPjw4cOHDx8+fPh58Reuranlo17O2k2jegd8wRd8wRd8wRd8wRd8wRd8wRd8wRd8wRd8wRd8wRd8wRd8wRd8wRd8wRd8wYcv+IIf06Zto5rK9lq+v2NUK0e/np/cnbvf7kjtrp7xp0f+IpOZbPg7Rn4sq1p4PQU1C3+4+LvgDxf/Cfjw4Q8Q/5/w4cMfIP6T8OHDHyD+U/Dhwx8g/m74w8XfAx8+/AHi74UPH/4A8ffBhw9/gPhPw4cPf4D4z8AfLv6z8OHDHyD+fvjw4Q8Q/wB8+PAHiH8QPnz4A8R/Dv5w8f8FH365+DvfBb+j5orHbw58dKLwb9+Spa2HJgK/OfLlScK/LstrWfG7MR7soQrwm+ZbZ8CP6p3/aCYGv/nVUvgRXfPMWE91vg785uE3wx+7qeebicJvdl8Of7wWbhn3mT5fC35zaDP8cTr7jrEf6eFq8Juj0wvgj+yNf2gmEb9pbj0L/ogufTzieR6pCb/5/Ur4r9oNzzUTi988djH8V+lLL0Q9zRfqwm/2fQj+yVr0zciHWRt+c/jz8F+55b+JfZZHa8Nvmq2nw3+FLvxLUxv+xY/F6/94CfyXdcWeePuv9Iwfzv11vP79b4L/km6ci36Kh24OfeOHRV+L19/5HvgntmD6aPQz3L0x9I8//r9DnHjgcR384732h/GfPw+uCUXgh2uejv7YuzjwqBV/rMONl94TvS4Ugh8u+mv8hz+zCP6LjXe48f9Tb0sr3zG19O5aKbPvl0vhh7EPN9qdeq3iJ82+h9fATxlMu94XysJPehVPvHfo+OMfbhzvgdY+Z1p8U8Wr42ff3OZh40ccbrQ79VrHDxcl/IByesj4MYcb7U699vHDuffE/0H+3pmDxY863Pjv1Ptkm17tvpfuoq/G629fOVD8uMONY1Ov3ZHU9hspJ8y+1g486sKPPNx4ceqtDkXjp8y+vR8cHn704Ua7U68j/LAufvbNf2po+PGHG+1Ova7wk2ZfKwce9eAnHG60O/U6w0+afbcvGRD++5/qe+p1h580++47fzD4CYcbbU+9LvHD1fviDzzePQz8lMONjg7fOsJPmX0HPjIE/ITDjQ6mXrf4YXn87DvyxcnHTzjcOHRTV0ad4YdFW3MfeFSAn3C40cnU6xo/afb9YulE4yccbnQz9brHT5l9D62ZYPyEz4au/o9D9/gps2/XZZOKn3C40dnUy4GfMvvmPj6Z+AmHG3M3davTMX7K7Es+8CgaP+Fwo8Oplwc/6S+67545cfgJhxv3rw7V44er4mff9hUThp9wuNHp1MuGH9Y9Ev3KH33rROHHH250PPXy4Yfld2c58CgVP+Fwo+uplxE/LIyfffM3Twp+wuHGKXy/Wx5+0uyLPvAoEz/hcKP7qZcXP2zcHT95Fk8AfsLhRoaplxk/Zfbdd171+PGHG1mmXm78cM7Po/Ufv7Ru/ITDjTxTLzt+yg+393+4ZvyEw43Zy8Jk4qfMviNfqBc/4XAj19TrAz9sjJ8/4x94FIafcLixbUmYYPyU2XfXOVXixx9uZJx6/eCnzL6HVleIH/833Nwncltkx0+ZfWP+wKsg/IQXmXXq9YWf9ElxY134CYcb918QBoGfMPvGOvAoBj/hcCPz1OsRP1wYP/u+c0Y1+PGHG9mnXp/44fV3Ruvfs7wS/PjDjfxTr1f8lEU08sCjDPz4w40epl6/+CF8Lnr27b2yfPyEw40+pl7f+Amzb8SvHS0AP+Fwo5ep1zt+wux79WHUP3784cbRLQvCIPFTZt+2xQXjxx9uzG3u8/n3ip8y++49r1j8+MON3qZeCfgps+/vby8TP+Fw448XhEHjh8ujv1Se9MCjV/yEw40ep14h+OHCP0cfeNxSHn784UavU68U/JTZt3VhYfjxhxv9Tr1i8FNm3yseePSHH3+4MbshwD/WZ6Nn34OrC8KP/zfqvqdeSfgJs2/XhlLwE75w3bYkwD+V2Xfw+jLw4w83Cph6ZeEnzL6XHXj0gh9/uFHC1CsMP+Wr57fP6B0//nCjiKlXGv5/Zt989IHHsp7x4w83yph65eEnzL6/vaVX/PjDjdsWB/htzb49V/SHH3+4cXR6QYB/0tkXPZ1PeAeKzPjxhxsHbyjraReGnzD7jn/jlBc//nBj54YAv+3Z978Dj6z48Ycb954f4I/qA09GP9Y3ZMePP9z40eIAf3Rro2ffsQOPfPjxhxuFTb1y8RNm3/5rc+LHH26UNvUKxk+YfYdvyYcff7ixc32A3+Xs23p6Jvz4w43ypl7Z+OHKPbGP+KePZMH/+rOxH9gPzgrwu559TRb8ZhKmXun4CbOvRPyDHyv3CReMn/KPvMXhFzr1yscP4TPzleOXOvVqwE/4aV9R+AX+VK8i/LD2T/XiFzz16sBvd/ZlxS956lWC3+rsy4lf9NSrBb/N2ZcRv+ypVw9+e7MvH37hU68i/NZmXy784qdeTfjh7J/VhF/+1KsKv6XZlwe/gqlXF34In56vBL+GqVcbfhuzLwf+rYsD/BJnX/f4lUy9+vBPffZ1jn/g+pqeZ1X4pzz7usavZuq1g79ifd6+UTL+7LV5H8YlPeNPNTXVxxlXh83Chw8fPnz48OHDhw8fPnz48OHDhw8fPnz48OHDhw8fPnz48OHDhw8fPnz48OHDhw8fPnz48OHDhw8fPnz48OHDhw8fPnz48IvH3zhTU8tGvp5N2ypqpmd8VRx8+IIv+IIv+IIv+IIv+IIv+IIv+IIv+IIv+IIv+IIv+IIv+IIv+IIv+IIv+IIv+IIv+IIv+IIP3yOAL/iCL/iCL/iCL/iCL/iCL/iCL/iCL/iCL/iCL/iCL/iCr+7wNdz+DYcepjBEjpmXAAAAAElFTkSuQmCC").then(() => {
      v.start(), b(!1);
    }).catch((S) => {
      console.error("Failed to load default image:", S), v.start(), b(!1);
    });
    const k = () => {
      u.current && g.current && u.current.setupCanvas();
    };
    return window.addEventListener("resize", k), () => {
      window.removeEventListener("resize", k), u.current && u.current.destroy();
    };
  }, [e, i]);
  const _ = () => {
    u.current && (u.current.triggerGlitch(), l && l());
  }, x = () => {
    if (u.current) {
      const v = !u.current.params.pause;
      u.current.updateParams({ pause: v });
    }
  };
  return /* @__PURE__ */ I(
    "div",
    {
      ref: g,
      className: (() => {
        let v = `shader-card ${n}`;
        return p && (v += " shader-card--loading"), m && (v += " shader-card--error"), v;
      })(),
      style: s,
      ...h,
      children: [
        /* @__PURE__ */ f(
          "canvas",
          {
            ref: d,
            className: "shader-card__canvas",
            style: { width: "100%", height: "100%" },
            alt: t
          }
        ),
        r && !m && /* @__PURE__ */ I("div", { className: "shader-card__controls", children: [
          /* @__PURE__ */ f(
            "button",
            {
              className: "shader-card__control-btn",
              onClick: _,
              title: "Trigger Glitch",
              children: "⚡"
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              className: "shader-card__control-btn",
              onClick: x,
              title: "Pause/Resume",
              children: "⏸️"
            }
          )
        ] }),
        a && /* @__PURE__ */ f("div", { className: "shader-card__title", children: a }),
        o && /* @__PURE__ */ f("div", { className: "shader-card__description", children: o }),
        c && /* @__PURE__ */ f("div", { className: "shader-card__content", children: c })
      ]
    }
  );
};
Es.displayName = "ShaderCard";
Es.updateParams = (e, t) => {
  e.current?.effectRef?.current && e.current.effectRef.current.updateParams(t);
};
Es.triggerGlitch = (e) => {
  e.current?.effectRef?.current && e.current.effectRef.current.triggerGlitch();
};
const rb = ({
  children: e,
  theme: t = "shinetext-dark",
  size: n = "medium",
  duration: s = 3,
  delay: i = 0,
  href: r,
  onClick: a,
  className: o = "",
  style: l = {},
  disabled: c = !1,
  ...h
}) => {
  const d = "shine-text", u = [
    d,
    t,
    `${d}--${n}`,
    c && `${d}--disabled`,
    o
  ].filter(Boolean).join(" "), g = {
    animationDuration: `${s}s`,
    animationDelay: `${i}s`,
    ...l
  }, p = {
    className: u,
    style: g,
    ...h
  };
  return r && !c ? /* @__PURE__ */ f("a", { href: r, onClick: a, ...p, children: e }) : a && !c ? /* @__PURE__ */ f("button", { type: "button", onClick: a, ...p, children: e }) : /* @__PURE__ */ f("span", { ...p, children: e });
}, ab = ({
  position: e = "left",
  width: t = 250,
  color: n = "#010101",
  hamburgerPosition: s = { top: 20, left: 20, right: 20 },
  items: i = [],
  isOpen: r = !1,
  onToggle: a,
  children: o,
  className: l = "",
  textColor: c = "#ffffff",
  hamburgerColor: h = "#333333",
  hamburgerBorder: d = "1px solid #a5a5a5",
  showHamburger: u = !0,
  closeOnItemClick: g = !0
}) => {
  const [p, b] = X(r), m = a !== void 0, y = m ? r : p, _ = () => {
    m ? a(!y) : b(!p);
  }, x = (v) => {
    g && (m ? a(!1) : b(!1)), v.onClick && v.onClick();
  }, w = {
    "--sidebar-width": `${t}px`,
    "--sidebar-bg": n,
    "--sidebar-text-color": c,
    "--hamburger-color": h,
    "--hamburger-border": d,
    "--hamburger-top": `${s.top}px`,
    "--hamburger-left": e === "left" ? `${s.left}px` : "auto",
    "--hamburger-right": e === "right" ? `${s.right}px` : "auto"
  };
  return /* @__PURE__ */ I(
    "nav",
    {
      className: `sidebar ${l}`,
      style: w,
      "data-position": e,
      children: [
        u && /* @__PURE__ */ I(
          "div",
          {
            className: `hamburger-menu ${y ? "is-active" : ""}`,
            onClick: _,
            role: "button",
            "aria-label": "Toggle navigation",
            tabIndex: 0,
            onKeyDown: (v) => {
              (v.key === "Enter" || v.key === " ") && (v.preventDefault(), _());
            },
            children: [
              /* @__PURE__ */ f("span", { className: "hamburger-line" }),
              /* @__PURE__ */ f("span", { className: "hamburger-line" }),
              /* @__PURE__ */ f("span", { className: "hamburger-line" })
            ]
          }
        ),
        /* @__PURE__ */ I("ul", { className: `sidebar-list ${y ? "slide-in" : ""}`, children: [
          i.map((v, k) => /* @__PURE__ */ f("li", { className: "sidebar-item", children: v.href ? /* @__PURE__ */ f(
            "a",
            {
              className: "sidebar-link",
              href: v.href,
              onClick: () => x(v),
              children: v.label
            }
          ) : /* @__PURE__ */ f(
            "button",
            {
              className: "sidebar-link sidebar-button",
              onClick: () => x(v),
              children: v.label
            }
          ) }, k)),
          o
        ] }),
        y && /* @__PURE__ */ f(
          "div",
          {
            className: "sidebar-overlay",
            onClick: _,
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}, ob = ({
  width: e = "100%",
  height: t = "20px",
  borderRadius: n = "4px",
  count: s = 1,
  spacing: i = "10px",
  variant: r = "text",
  // 'text', 'circular', 'rectangular', 'rounded'
  animation: a = "pulse",
  // 'pulse', 'wave', 'none'
  theme: o = "skeleton-light",
  className: l = "",
  style: c = {},
  ...h
}) => {
  const u = {
    width: e,
    height: t,
    ...(() => {
      switch (r) {
        case "circular":
          return {
            borderRadius: "50%",
            width: t
            // Make it square for perfect circle
          };
        case "rounded":
          return {
            borderRadius: "12px"
          };
        case "rectangular":
          return {
            borderRadius: "0"
          };
        case "text":
        default:
          return {
            borderRadius: n
          };
      }
    })(),
    ...c
  }, g = (p) => /* @__PURE__ */ f(
    "div",
    {
      className: `skeleton-loader ${o} skeleton-${a} ${l}`,
      style: {
        ...u,
        marginBottom: p < s - 1 ? i : "0"
      },
      ...h
    },
    p
  );
  return s === 1 ? g(0) : /* @__PURE__ */ f("div", { className: "skeleton-container", children: Array.from({ length: s }, (p, b) => g(b)) });
}, lb = ({
  skills: e = [],
  variant: t = "linear",
  title: n = "",
  animationDuration: s = 2e3,
  color: i = "#e33de0",
  className: r = "",
  theme: a = "skillbar-light"
}) => {
  const [o, l] = X(!1);
  return G(() => {
    const d = setTimeout(() => l(!0), 300);
    return () => clearTimeout(d);
  }, []), t === "circular" ? /* @__PURE__ */ I("div", { className: `skillbar-circular-container ${a} ${r}`, children: [
    n && /* @__PURE__ */ f("h3", { className: "skillbar-main-title", children: n }),
    /* @__PURE__ */ f("div", { className: "skillbar-circular-grid", children: e.map((d, u) => {
      const p = 2 * Math.PI * 45, b = p - d.level / 100 * p;
      return /* @__PURE__ */ I("div", { className: "skillbar-circular-box", children: [
        /* @__PURE__ */ I("div", { className: "skillbar-circular-wrapper", children: [
          /* @__PURE__ */ I("svg", { className: "skillbar-circular-svg", viewBox: "0 0 100 100", children: [
            /* @__PURE__ */ f(
              "circle",
              {
                className: "skillbar-circular-bg",
                cx: "50",
                cy: "50",
                r: 45
              }
            ),
            /* @__PURE__ */ f(
              "circle",
              {
                className: `skillbar-circular-progress ${o ? "animated" : ""}`,
                cx: "50",
                cy: "50",
                r: 45,
                style: {
                  stroke: i,
                  strokeDasharray: p,
                  strokeDashoffset: o ? b : p,
                  transition: `stroke-dashoffset ${s}ms ease-out ${u * 100}ms`,
                  opacity: 1
                }
              }
            )
          ] }),
          /* @__PURE__ */ f("div", { className: "skillbar-circular-text", children: /* @__PURE__ */ I("span", { className: "skillbar-circular-percent", children: [
            d.level,
            "%"
          ] }) })
        ] }),
        /* @__PURE__ */ f("span", { className: "skillbar-circular-name", children: d.name })
      ] }, u);
    }) })
  ] }) : /* @__PURE__ */ I("div", { className: `skillbar-container ${a} ${r}`, children: [
    n && /* @__PURE__ */ f("h3", { className: "skillbar-main-title", children: n }),
    e.map((d, u) => /* @__PURE__ */ I("div", { className: "skillbar-box", children: [
      /* @__PURE__ */ f("span", { className: "skillbar-title", children: d.name }),
      /* @__PURE__ */ f("div", { className: "skillbar-bar", children: /* @__PURE__ */ f(
        "span",
        {
          className: `skillbar-progress ${o ? "animated" : ""}`,
          style: {
            width: o ? `${d.level}%` : "0%",
            backgroundColor: i,
            transition: `width ${s}ms ease-out ${u * 100}ms`,
            opacity: 1
          },
          children: /* @__PURE__ */ I(
            "span",
            {
              className: "skillbar-tooltip",
              style: { backgroundColor: i },
              children: [
                d.level,
                "%"
              ]
            }
          )
        }
      ) })
    ] }, u))
  ] });
}, cb = ({
  min: e = 0,
  max: t = 100,
  step: n = 1,
  defaultValue: s = 50,
  defaultValues: i = [25, 75],
  variant: r = "default",
  dir: a = "ltr",
  disabled: o = !1,
  showOutput: l = !0,
  theme: c = "slider-light",
  color: h = "#e33de0",
  // Any valid CSS color
  className: d = "",
  onChange: u,
  onChangeEnd: g,
  ...p
}) => {
  const [b, m] = X(s), [y, _] = X(i), [x, w] = X(null), [v, k] = X(!1), M = H(null), S = H(null), N = H(null), P = H(null), R = H(null), C = () => ({
    "--fill-color": h,
    "--thumb-border-color": h,
    "--output-color": c === "slider-dark" ? "#f3f4f6" : "#374151"
  }), A = st((W) => (W - e) / (t - e) * 100, [e, t]), T = st((W) => {
    if (!S.current) return e;
    const Y = S.current.getBoundingClientRect(), V = a === "rtl";
    let U;
    V ? U = (Y.right - W) / Y.width : U = (W - Y.left) / Y.width, U = Math.max(0, Math.min(1, U));
    const Z = e + U * (t - e), K = Math.round(Z / n) * n;
    return Math.max(e, Math.min(t, K));
  }, [e, t, n, a]), O = st((W, Y = null) => {
    if (!S.current || !R.current) return;
    const V = a === "rtl";
    if (r === "dual" && Y) {
      const [U, Z] = Y, K = A(U), J = A(Z);
      N.current && P.current && (V ? (N.current.style.right = `${K}%`, P.current.style.right = `${J}%`) : (N.current.style.left = `${K}%`, P.current.style.left = `${J}%`));
      const tt = Math.min(K, J), at = Math.max(K, J);
      V ? (R.current.style.right = `${100 - at}%`, R.current.style.left = `${100 - tt}%`) : (R.current.style.left = `${tt}%`, R.current.style.right = `${100 - at}%`);
    } else {
      const U = A(W);
      N.current && (V ? N.current.style.right = `${U}%` : N.current.style.left = `${U}%`), V ? (R.current.style.right = `${U}%`, R.current.style.left = "0%") : (R.current.style.left = "0%", R.current.style.right = `${100 - U}%`);
    }
  }, [r, a, A]), D = st((W) => {
    o || (m(W), O(W), u?.(W));
  }, [o, u, O]), E = st((W, Y) => {
    if (o) return;
    const V = [...y];
    V[Y] = W, Y === 0 && W > y[1] ? V[1] = W : Y === 1 && W < y[0] && (V[0] = W), _(V), O(null, V), u?.(V);
  }, [o, y, u, O]), B = st((W) => {
    const Y = T(W), V = Math.abs(Y - y[0]), U = Math.abs(Y - y[1]);
    return V <= U ? 0 : 1;
  }, [y, T]), z = st((W) => {
    if (o) return;
    const Y = W.type.includes("touch") ? W.touches[0].clientX : W.clientX;
    if (r === "dual") {
      const V = B(Y);
      w(V);
    }
    k(!0), W.preventDefault();
  }, [o, r, B]), L = st((W) => {
    if (!v || o) return;
    const Y = W.type.includes("touch") ? W.touches[0].clientX : W.clientX, V = T(Y);
    r === "dual" && x !== null ? E(V, x) : r === "default" && D(V), W.preventDefault();
  }, [v, o, r, x, T, E, D]), $ = st(() => {
    if (!v) return;
    k(!1), w(null), g?.(r === "dual" ? y : b);
  }, [v, r, y, b, g]), F = st((W, Y = null) => {
    if (o) return;
    let V;
    const U = r === "dual" ? y[Y] : b;
    switch (W.key) {
      case "ArrowRight":
      case "ArrowUp":
        V = Math.min(t, U + n);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        V = Math.max(e, U - n);
        break;
      case "Home":
        V = e;
        break;
      case "End":
        V = t;
        break;
      default:
        return;
    }
    r === "dual" ? E(V, Y) : D(V), W.preventDefault();
  }, [o, r, y, b, e, t, n, E, D]);
  G(() => {
    r === "dual" ? O(null, y) : O(b);
  }, [r, b, y, O]), G(() => {
    if (!v) return;
    const W = (V) => L(V), Y = () => $();
    return document.addEventListener("mousemove", W), document.addEventListener("mouseup", Y), document.addEventListener("touchmove", W, { passive: !1 }), document.addEventListener("touchend", Y), () => {
      document.removeEventListener("mousemove", W), document.removeEventListener("mouseup", Y), document.removeEventListener("touchmove", W), document.removeEventListener("touchend", Y);
    };
  }, [v, L, $]);
  const j = [
    "slider",
    `slider--${r}`,
    `slider--${a}`,
    c,
    o ? "slider--disabled" : "",
    v ? "slider--dragging" : "",
    d
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ f("div", { className: j, ref: M, style: C(), ...p, children: /* @__PURE__ */ I("div", { className: "slider__container", children: [
    /* @__PURE__ */ I(
      "div",
      {
        className: "slider__track",
        ref: S,
        onMouseDown: z,
        onTouchStart: z,
        children: [
          /* @__PURE__ */ f("div", { className: "slider__fill", ref: R }),
          r === "default" ? /* @__PURE__ */ f(
            "div",
            {
              className: "slider__thumb",
              ref: N,
              tabIndex: o ? -1 : 0,
              role: "slider",
              "aria-valuemin": e,
              "aria-valuemax": t,
              "aria-valuenow": b,
              onKeyDown: (W) => F(W)
            }
          ) : /* @__PURE__ */ I(kt, { children: [
            /* @__PURE__ */ f(
              "div",
              {
                className: `slider__thumb slider__thumb--first ${x === 0 ? "slider__thumb--active" : ""}`,
                ref: N,
                tabIndex: o ? -1 : 0,
                role: "slider",
                "aria-valuemin": e,
                "aria-valuemax": t,
                "aria-valuenow": y[0],
                onKeyDown: (W) => F(W, 0)
              }
            ),
            /* @__PURE__ */ f(
              "div",
              {
                className: `slider__thumb slider__thumb--second ${x === 1 ? "slider__thumb--active" : ""}`,
                ref: P,
                tabIndex: o ? -1 : 0,
                role: "slider",
                "aria-valuemin": e,
                "aria-valuemax": t,
                "aria-valuenow": y[1],
                onKeyDown: (W) => F(W, 1)
              }
            )
          ] })
        ]
      }
    ),
    l && /* @__PURE__ */ f("div", { className: "slider__output", children: r === "dual" ? /* @__PURE__ */ I("div", { className: "slider__output-dual", children: [
      /* @__PURE__ */ f("span", { children: Math.round(y[0]) }),
      /* @__PURE__ */ f("span", { children: "-" }),
      /* @__PURE__ */ f("span", { children: Math.round(y[1]) })
    ] }) : /* @__PURE__ */ f("span", { children: Math.round(b) }) })
  ] }) });
}, hb = ({ children: e, color: t = "#00fff1", className: n = "" }) => {
  const s = H(null), i = (o) => {
    const l = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(o);
    return l ? {
      r: parseInt(l[1], 16),
      g: parseInt(l[2], 16),
      b: parseInt(l[3], 16)
    } : null;
  }, r = (o = 0.4) => `rgba(255, 255, 255, ${o})`, a = (o, l = 0.1) => {
    const c = i(o);
    if (!c) return o;
    const h = (d) => Math.floor(d * 0.5);
    return `rgba(${h(c.r)}, ${h(c.g)}, ${h(c.b)}, ${l})`;
  };
  return G(() => {
    const o = s.current;
    if (!o) return;
    const l = o.querySelectorAll(".spotlight-card"), c = r(0.4), h = a(t, 0.2);
    l.forEach((u) => {
      u.style.setProperty("--spotlight-color", c), u.style.setProperty("--border-color", h), u.style.setProperty("--bg-color", t);
    });
    const d = (u) => {
      l.forEach((g) => {
        const p = g.getBoundingClientRect(), b = u.clientX - p.left, m = u.clientY - p.top;
        g.style.setProperty("--xPos", `${b}px`), g.style.setProperty("--yPos", `${m}px`);
      });
    };
    return o.addEventListener("mousemove", d), () => {
      o.removeEventListener("mousemove", d);
    };
  }, [t]), /* @__PURE__ */ f("div", { className: `spotlight-cards ${n}`, ref: s, children: ve.Children.map(e, (o) => /* @__PURE__ */ f("div", { className: "spotlight-card", children: /* @__PURE__ */ f("div", { className: "spotlight-card-content", children: o }) })) });
}, db = ({
  variant: e = "toggle",
  // 'toggle' or 'three-state'
  size: t = "medium",
  // 'small', 'medium', 'large'
  color: n = "#e33de0",
  // Any valid CSS color
  checked: s = !1,
  value: i = "",
  onChange: r,
  disabled: a = !1,
  label: o,
  className: l = "",
  options: c = [],
  ...h
}) => {
  const [d, u] = X(s), [g, p] = X(i), b = H(null), m = () => ({
    "--switch-bgcolor": (e === "toggle" ? d : g) ? n : "#cbd5e1",
    "--switch-slidercolor": "#ffffff",
    "--text-color": "#1e293b",
    "--active-textcolor": "#1e293b"
  }), y = (w) => {
    if (a) return;
    const v = w.target.checked;
    u(v), r && r(v, w);
  }, _ = (w, v) => {
    a || (p(w), r && r(w, { target: { value: w }, index: v }));
  }, x = [
    "switch",
    `switch--${e}`,
    `switch--${t}`,
    a && "switch--disabled",
    l
  ].filter(Boolean).join(" ");
  if (e === "three-state") {
    const w = [c[0], c[1], c[2]], v = w.indexOf(g);
    return /* @__PURE__ */ I(
      "div",
      {
        className: x,
        ref: b,
        style: m(),
        children: [
          o && /* @__PURE__ */ f("span", { className: "switch__label", children: o }),
          /* @__PURE__ */ I("div", { className: "switch__container", children: [
            /* @__PURE__ */ f(
              "span",
              {
                className: "switch__pill",
                style: {
                  transform: `translateX(${v * 100}%)`
                }
              }
            ),
            c.map((k, M) => /* @__PURE__ */ f(
              "div",
              {
                className: `switch__option ${v === M ? "switch__option--active" : ""}`,
                onClick: () => _(w[M], M),
                children: k
              },
              M
            ))
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ I("div", { className: x, style: m(), children: [
    o && /* @__PURE__ */ f("span", { className: "switch__label", children: o }),
    /* @__PURE__ */ I("label", { className: "switch__wrapper", children: [
      /* @__PURE__ */ f(
        "input",
        {
          type: "checkbox",
          className: "switch__input",
          checked: d,
          onChange: y,
          disabled: a,
          ...h
        }
      ),
      /* @__PURE__ */ f("span", { className: "switch__slider" })
    ] })
  ] });
};
function of(e, t = 20) {
  const n = e.replace("#", ""), s = parseInt(n.substring(0, 2), 16), i = parseInt(n.substring(2, 4), 16), r = parseInt(n.substring(4, 6), 16), a = Math.max(0, Math.floor(s * (1 - t / 100))), o = Math.max(0, Math.floor(i * (1 - t / 100))), l = Math.max(0, Math.floor(r * (1 - t / 100)));
  return `#${a.toString(16).padStart(2, "0")}${o.toString(16).padStart(2, "0")}${l.toString(16).padStart(2, "0")}`;
}
function lf(e, t = 20) {
  const n = e.replace("#", ""), s = parseInt(n.substring(0, 2), 16), i = parseInt(n.substring(2, 4), 16), r = parseInt(n.substring(4, 6), 16), a = Math.min(255, Math.floor(s + (255 - s) * (t / 100))), o = Math.min(255, Math.floor(i + (255 - i) * (t / 100))), l = Math.min(255, Math.floor(r + (255 - r) * (t / 100)));
  return `#${a.toString(16).padStart(2, "0")}${o.toString(16).padStart(2, "0")}${l.toString(16).padStart(2, "0")}`;
}
function ub({
  children: e,
  theme: t = "tab-light",
  defaultTab: n = 0,
  onTabChange: s,
  className: i = "",
  tabGroupName: r,
  color: a = null,
  activeColor: o = null,
  textColor: l = null,
  maxWidth: c = "500px",
  showCopy: h = !1,
  ...d
}) {
  const [u, g] = X(n), [p, b] = X(!1), m = H(null), y = yo.toArray(e);
  G(() => {
    g(n);
  }, [n]);
  const _ = (N) => {
    g(N), b(!1), s && s(N);
  }, x = async () => {
    if (m.current) {
      const N = m.current.innerText;
      try {
        await navigator.clipboard.writeText(N), b(!0), setTimeout(() => b(!1), 2e3);
      } catch (P) {
        console.error("Failed to copy:", P);
      }
    }
  }, w = a ? of(a, 20) : null, v = a ? lf(a, 20) : null, k = {};
  a && (k["--bg-color"] = v), c && (k.maxWidth = c);
  const M = (N) => {
    const P = {};
    return a && (P["--tab-color"] = w), N && o ? P.color = o : l && (P.color = l), P;
  }, S = (N) => {
    const P = {
      borderTopLeftRadius: u !== 0 ? "12px" : "0px"
    };
    return a && (P["--tab-color"] = w), l && (P.color = l), P;
  };
  return /* @__PURE__ */ I(
    "div",
    {
      className: `tab-container ${t} ${i}`,
      ...d,
      style: k,
      children: [
        /* @__PURE__ */ f("ul", { className: "tab-list", role: "tablist", "aria-label": r, children: y.map((N, P) => {
          const R = u === P, C = N.props.label || `Tab ${P + 1}`;
          return /* @__PURE__ */ I(
            "li",
            {
              onClick: () => _(P),
              className: `tab-item ${R ? "active" : ""}`,
              role: "tab",
              "aria-selected": R,
              "aria-controls": `panel-${P}`,
              style: M(R),
              children: [
                P !== 0 && /* @__PURE__ */ f("div", { className: "tab-curve-left", children: /* @__PURE__ */ f("div", { className: "tab-curve-left-inner" }) }),
                /* @__PURE__ */ f("div", { className: "tab-curve-right", children: /* @__PURE__ */ f("div", { className: "tab-curve-right-inner" }) }),
                C
              ]
            },
            P
          );
        }) }),
        /* @__PURE__ */ I("div", { className: "tab-content-wrapper", children: [
          h && /* @__PURE__ */ f(
            "button",
            {
              className: `copy-button ${t}`,
              onClick: x,
              title: p ? "Copied!" : "Copy",
              "aria-label": "Copy",
              children: p ? /* @__PURE__ */ f("svg", { "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "none", viewBox: "0 0 24 24", children: /* @__PURE__ */ f("path", { stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 7 2 2 4-4m-5-9v4h4V3h-4Z" }) }) : /* @__PURE__ */ f("svg", { "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "none", viewBox: "0 0 24 24", children: /* @__PURE__ */ f("path", { stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-5-4v4h4V3h-4Z" }) })
            }
          ),
          y.map((N, P) => /* @__PURE__ */ f(
            "div",
            {
              ref: u === P ? m : null,
              className: `tab-panel ${u === P ? "active" : ""}`,
              role: "tabpanel",
              id: `panel-${P}`,
              "aria-hidden": u !== P,
              style: S(),
              children: vo(N, { isActive: u === P })
            },
            P
          ))
        ] })
      ]
    }
  );
}
const fb = ({
  testimonials: e = [],
  variant: t = "collage",
  theme: n = "testimonial-light",
  showQuotes: s = !0,
  showImages: i = !0,
  className: r = "",
  color: a = "#6c757d",
  // Default gray color
  ...o
}) => {
  const l = H(null), c = (m) => {
    const y = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(m);
    return y ? {
      r: parseInt(y[1], 16),
      g: parseInt(y[2], 16),
      b: parseInt(y[3], 16)
    } : null;
  }, h = (m) => {
    const y = c(m);
    return y && (0.299 * y.r + 0.587 * y.g + 0.114 * y.b) / 255 > 0.5 ? "#000000" : "#ffffff";
  }, d = (m, y) => {
    const _ = c(m);
    if (!_) return m;
    if (y > 0) {
      const x = (w) => {
        const v = w + (255 - w) * (y / 100);
        return Math.min(255, Math.max(0, Math.round(v)));
      };
      return `#${x(_.r).toString(16).padStart(2, "0")}${x(_.g).toString(16).padStart(2, "0")}${x(_.b).toString(16).padStart(2, "0")}`;
    } else {
      const x = (w) => {
        const v = w * (1 + y / 100);
        return Math.min(255, Math.max(0, Math.round(v)));
      };
      return `#${x(_.r).toString(16).padStart(2, "0")}${x(_.g).toString(16).padStart(2, "0")}${x(_.b).toString(16).padStart(2, "0")}`;
    }
  };
  G(() => {
    if (!l.current) return;
    const m = h(a), y = d(a, 85), _ = d(a, 70), x = d(a, -20), w = d(a, -35);
    d(a, -50);
    const v = d(a, 60), k = n === "testimonial-light" ? d(a, 90) : d(a, -80), M = n === "testimonial-light" ? "#212529" : "#f8f9fa";
    l.current.style.setProperty("--testimonial-primary", a), l.current.style.setProperty("--testimonial-text", m), l.current.style.setProperty("--testimonial-bg-1", a), l.current.style.setProperty("--testimonial-bg-2", x), l.current.style.setProperty("--testimonial-bg-3", y), l.current.style.setProperty("--testimonial-bg-4", _), l.current.style.setProperty("--testimonial-bg-5", w), l.current.style.setProperty("--testimonial-border", v), l.current.style.setProperty("--testimonial-container-bg", k), l.current.style.setProperty("--testimonial-container-text", M), l.current.style.setProperty("--testimonial-focus-color", a);
  }, [a, n]);
  const u = [
    {
      id: 1,
      name: "Kelly Sikkema",
      image: "https://i.ibb.co/SsyV7sf/testimonials-1.png",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non voluptate numquam doloribus placeat quia natus dolor! Expedita sint nobis vero eligendi, nemo consectetur, voluptas voluptatibus dignissimos in ullam inventore distinctio maxime dolorem omnis.",
      featured: !0
    },
    {
      id: 2,
      name: "Ethan Hoover",
      image: "https://i.ibb.co/98DW2mz/testimonials-2.png",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ratione aliquam voluptate alias error consequuntur fugiat suscipit perspiciatis velit dolore."
    },
    {
      id: 3,
      name: "Joseph Pearson",
      image: "https://i.ibb.co/xHsLjSZ/testimonials-3.png",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora unde ducimus ab nisi asperiores quaerat debitis repudiandae officiis vero recusandae deleniti culpa quos deserunt nam quibusdam dicta, ullam nostrum aperiam aliquam dolorem hic.",
      featured: !0
    },
    {
      id: 4,
      name: "Daniel Lincoln",
      image: "https://i.ibb.co/fqz3jGL/testimonials-4.png",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ratione aliquam voluptate alias error consequuntur fugiat suscipit perspiciatis velit dolore."
    },
    {
      id: 5,
      name: "Mike Austin",
      image: "https://i.ibb.co/LzdgpPg/testimonials-5.png",
      title: "Lorem ipsum dolor sit amet consectetur adipisicing",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, fugiat! Odio blanditiis aspernatur nesciunt quo dolorem asperiores atque, non reiciendis exercitationem velit debitis voluptate, cumque excepturi."
    }
  ], g = e.length > 0 ? e : u, p = (m, y) => {
    const _ = `testimonial-item testimonial-item-${y + 1} ${m.featured ? "testimonial-featured" : ""}`;
    return /* @__PURE__ */ I("div", { className: _, children: [
      i && m.image && /* @__PURE__ */ f(
        "img",
        {
          src: m.image,
          alt: `${m.name}`,
          className: "testimonial-image"
        }
      ),
      /* @__PURE__ */ f("div", { className: "testimonial-name", children: m.name }),
      /* @__PURE__ */ f("div", { className: "testimonial-title", children: m.title }),
      /* @__PURE__ */ I("div", { className: "testimonial-description", children: [
        s && /* @__PURE__ */ f("span", { className: "quote-before", children: '"' }),
        m.description,
        s && /* @__PURE__ */ f("span", { className: "quote-after", children: '"' })
      ] })
    ] }, m.id);
  }, b = [
    "testimonials",
    `testimonials--${t}`,
    n,
    r
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ f("section", { ref: l, className: b, ...o, children: /* @__PURE__ */ f("div", { className: "testimonials-container", children: g.map(
    (m, y) => p(m, y)
  ) }) });
}, gb = ({
  variant: e = "default",
  placeholder: t = "Start typing...",
  value: n = "",
  onChange: s = () => {
  },
  showCounter: i = !1,
  autoExpand: r = !1,
  minHeight: a = 60,
  maxHeight: o = 300,
  className: l = "",
  disabled: c = !1,
  rows: h = 4,
  theme: d = "textarea-light",
  color: u = "#6c757d",
  // Default gray color
  focusColor: g = "#3b82f6",
  // Custom focus color (falls back to color if not provided)
  ...p
}) => {
  const [b, m] = X(n), [y, _] = X(0), [x, w] = X(0), v = H(null), k = H(null), M = (A) => {
    const T = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(A);
    return T ? {
      r: parseInt(T[1], 16),
      g: parseInt(T[2], 16),
      b: parseInt(T[3], 16)
    } : null;
  }, S = (A) => {
    const T = M(A);
    return T && (0.299 * T.r + 0.587 * T.g + 0.114 * T.b) / 255 > 0.5 ? "#000000" : "#ffffff";
  }, N = (A, T) => {
    const O = M(A);
    if (!O) return A;
    if (T > 0) {
      const D = (E) => {
        const B = E + (255 - E) * (T / 100);
        return Math.min(255, Math.max(0, Math.round(B)));
      };
      return `#${D(O.r).toString(16).padStart(2, "0")}${D(O.g).toString(16).padStart(2, "0")}${D(O.b).toString(16).padStart(2, "0")}`;
    } else {
      const D = (E) => {
        const B = E * (1 + T / 100);
        return Math.min(255, Math.max(0, Math.round(B)));
      };
      return `#${D(O.r).toString(16).padStart(2, "0")}${D(O.g).toString(16).padStart(2, "0")}${D(O.b).toString(16).padStart(2, "0")}`;
    }
  };
  G(() => {
    if (!k.current) return;
    M(u);
    const A = g || u, T = M(A), O = S(u), D = "#000000", E = N(u, 80), B = N(u, -70), z = N(u, d === "textarea-light" ? 85 : -80), L = N(u, d === "textarea-light" ? 20 : -20);
    k.current.style.setProperty("--textarea-primary", u), k.current.style.setProperty("--textarea-focus-color", A), k.current.style.setProperty("--textarea-focus-rgb", `${T.r}, ${T.g}, ${T.b}`), k.current.style.setProperty("--textarea-text-dark", O), k.current.style.setProperty("--textarea-text-light", D), k.current.style.setProperty("--textarea-bg-light", E), k.current.style.setProperty("--textarea-bg-dark", B), k.current.style.setProperty("--textarea-disabled-bg", z), k.current.style.setProperty("--textarea-scrollbar", L), k.current.style.setProperty("--textarea-counter-color", u);
  }, [u, g, d]), G(() => {
    m(n);
  }, [n]), G(() => {
    const A = b;
    _(A.length);
    const T = A.trim().split(/\s+/).filter(Boolean);
    w(A.trim() === "" ? 0 : T.length);
  }, [b]), G(() => {
    if (r && v.current) {
      const A = v.current;
      A.style.height = "auto";
      const T = Math.min(Math.max(A.scrollHeight, a), o);
      A.style.height = T + "px";
    }
  }, [b, r, a, o]);
  const P = (A) => {
    const T = A.target.value;
    m(T), s(A);
  }, R = () => {
    let A = "textarea-component";
    return e === "counter" && (A += " textarea-counter-variant"), e === "auto-expand" && (A += " textarea-auto-expand-variant"), r && (A += " textarea-auto-expand"), c && (A += " textarea-disabled"), d && (A += ` ${d}`), l && (A += ` ${l}`), A;
  }, C = {
    ref: v,
    value: b,
    onChange: P,
    placeholder: t,
    disabled: c,
    className: "textarea-input",
    style: {
      minHeight: r ? `${a}px` : void 0,
      maxHeight: r ? `${o}px` : void 0,
      resize: r ? "none" : "vertical",
      overflow: r ? "hidden" : "auto"
    },
    rows: r ? void 0 : h,
    ...p
  };
  return /* @__PURE__ */ f("div", { ref: k, className: R(), children: /* @__PURE__ */ I("div", { className: "textarea-wrapper", children: [
    /* @__PURE__ */ f("textarea", { ...C }),
    (i || e === "counter") && /* @__PURE__ */ I("div", { className: "textarea-counter", children: [
      /* @__PURE__ */ f("span", { className: "char-count", children: y }),
      " chars |",
      /* @__PURE__ */ I("span", { className: "word-count", children: [
        " ",
        x
      ] }),
      " words"
    ] })
  ] }) });
}, mb = ({
  items: e = [],
  showControls: t = !0,
  className: n = "",
  expandedByDefault: s = !1,
  theme: i = "timeline-light",
  color: r = "#e33de0"
  // Default blue color
}) => {
  const [a, o] = X(() => s ? new Set(e.map((x, w) => w)) : /* @__PURE__ */ new Set()), [l, c] = X(/* @__PURE__ */ new Map()), h = H(null), d = (x) => {
    const w = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(x);
    return w ? {
      r: parseInt(w[1], 16),
      g: parseInt(w[2], 16),
      b: parseInt(w[3], 16)
    } : null;
  }, u = (x, w, v) => {
    x /= 255, w /= 255, v /= 255;
    const k = Math.max(x, w, v), M = Math.min(x, w, v);
    let S, N, P = (k + M) / 2;
    if (k === M)
      S = N = 0;
    else {
      const R = k - M;
      switch (N = P > 0.5 ? R / (2 - k - M) : R / (k + M), k) {
        case x:
          S = ((w - v) / R + (w < v ? 6 : 0)) / 6;
          break;
        case w:
          S = ((v - x) / R + 2) / 6;
          break;
        case v:
          S = ((x - w) / R + 4) / 6;
          break;
        default:
          S = 0;
      }
    }
    return {
      h: Math.round(S * 360),
      s: Math.round(N * 100),
      l: Math.round(P * 100)
    };
  }, g = (x) => {
    const w = d(x);
    return w ? (0.299 * w.r + 0.587 * w.g + 0.114 * w.b) / 255 > 0.5 ? "#000000" : "#ffffff" : "#000000";
  }, p = (x, w) => {
    const v = d(x);
    return v ? `rgba(${v.r}, ${v.g}, ${v.b}, ${w})` : `rgba(0, 0, 0, ${w})`;
  };
  G(() => {
    if (!h.current) return;
    const x = d(r);
    if (!x) return;
    const w = u(x.r, x.g, x.b), v = g(r), k = p(r, 0.1);
    h.current.style.setProperty("--timeline-hue", w.h.toString()), h.current.style.setProperty("--timeline-primary", r), h.current.style.setProperty("--timeline-primary-rgb", `${x.r}, ${x.g}, ${x.b}`), h.current.style.setProperty("--timeline-button-text", v), h.current.style.setProperty("--timeline-content-bg", k);
  }, [r]);
  const b = (x, w, v) => {
    const k = h.current?.querySelector(`#item${x}-ctrld`);
    if (!k) return;
    const M = "timeline__item-body--expanded", S = {
      duration: 300,
      easing: "cubic-bezier(0.65,0,0.35,1)"
    }, N = l.get(x);
    N && N.cancel();
    let P;
    v ? (k.classList.remove(M), S.duration *= 2, P = k.animate([
      { height: `${w}px` },
      { height: `${w}px` },
      { height: "0px" }
    ], S)) : (k.classList.add(M), P = k.animate([
      { height: "0px" },
      { height: `${w}px` }
    ], S)), c((R) => new Map(R).set(x, P)), P.addEventListener("finish", () => {
      c((R) => {
        const C = new Map(R);
        return C.delete(x), C;
      });
    });
  }, m = (x) => {
    const v = h.current?.querySelector(`#item${x}-ctrld`)?.firstElementChild?.offsetHeight, k = a.has(x);
    o((M) => {
      const S = new Set(M);
      return k ? S.delete(x) : S.add(x), S;
    }), v && b(x, v, k);
  }, y = () => {
    const x = e.map((w, v) => v).filter((w) => !a.has(w));
    o(new Set(e.map((w, v) => v))), x.forEach((w) => {
      const k = h.current?.querySelector(`#item${w}-ctrld`)?.firstElementChild?.offsetHeight;
      k && b(w, k, !1);
    });
  }, _ = () => {
    const x = Array.from(a);
    o(/* @__PURE__ */ new Set()), x.forEach((w) => {
      const k = h.current?.querySelector(`#item${w}-ctrld`)?.firstElementChild?.offsetHeight;
      k && b(w, k, !0);
    });
  };
  return /* @__PURE__ */ I("div", { className: `timeline ${i} ${n}`, ref: h, children: [
    /* @__PURE__ */ f("svg", { display: "none", children: /* @__PURE__ */ f("symbol", { id: "arrow", children: /* @__PURE__ */ f(
      "polyline",
      {
        points: "7 10,12 15,17 10",
        fill: "none",
        stroke: "currentcolor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2"
      }
    ) }) }),
    t && /* @__PURE__ */ I("div", { className: "btn-group", children: [
      /* @__PURE__ */ f("button", { className: "btn", type: "button", onClick: y, children: "Expand All" }),
      /* @__PURE__ */ f("button", { className: "btn", type: "button", onClick: _, children: "Collapse All" })
    ] }),
    e.map((x, w) => {
      const v = a.has(w);
      return /* @__PURE__ */ I("div", { className: "timeline__item", children: [
        /* @__PURE__ */ I("div", { className: "timeline__item-header", children: [
          /* @__PURE__ */ f(
            "button",
            {
              className: "timeline__arrow",
              type: "button",
              id: `item${w}`,
              "aria-labelledby": `item${w}-name`,
              "aria-expanded": v,
              "aria-controls": `item${w}-ctrld`,
              "aria-haspopup": "true",
              onClick: () => m(w),
              children: /* @__PURE__ */ f("svg", { className: "timeline__arrow-icon", viewBox: "0 0 24 24", width: "24px", height: "24px", children: /* @__PURE__ */ f("use", { href: "#arrow" }) })
            }
          ),
          /* @__PURE__ */ f("span", { className: "timeline__dot" }),
          /* @__PURE__ */ I("span", { id: `item${w}-name`, className: "timeline__meta", children: [
            /* @__PURE__ */ f("time", { className: "timeline__date", dateTime: x.date, children: x.dateDisplay }),
            /* @__PURE__ */ f("br", {}),
            /* @__PURE__ */ f("strong", { className: "timeline__title", children: x.title })
          ] })
        ] }),
        /* @__PURE__ */ f(
          "div",
          {
            className: `timeline__item-body ${v ? "timeline__item-body--expanded" : ""}`,
            id: `item${w}-ctrld`,
            role: "region",
            "aria-labelledby": `item${w}`,
            "aria-hidden": !v,
            children: /* @__PURE__ */ f("div", { className: "timeline__item-body-content", children: /* @__PURE__ */ f("div", { className: "timeline__item-p", children: typeof x.content == "string" ? /* @__PURE__ */ f("div", { dangerouslySetInnerHTML: { __html: x.content } }) : x.content }) })
          }
        )
      ] }, w);
    })
  ] });
}, pb = () => {
  const [e, t] = X([]), n = (c) => {
    const h = Date.now() + Math.random(), d = {
      id: h,
      ...c,
      isVisible: !0
    };
    t((g) => [...g, d]);
    const u = c.duration || 5e3;
    return setTimeout(() => {
      s(h);
    }, u + 500), h;
  }, s = (c) => {
    t((h) => h.filter((d) => d.id !== c));
  };
  return {
    toasts: e,
    showToast: n,
    removeToast: s,
    removeAllToasts: () => {
      t([]);
    },
    success: (c, h, d = {}) => n({ type: "success", title: c, message: h, ...d }),
    error: (c, h, d = {}) => n({ type: "error", title: c, message: h, ...d }),
    warning: (c, h, d = {}) => n({ type: "warning", title: c, message: h, ...d }),
    info: (c, h, d = {}) => n({ type: "info", title: c, message: h, ...d })
  };
}, bb = ({ toasts: e, onRemoveToast: t }) => /* @__PURE__ */ f(kt, { children: e.map((n) => /* @__PURE__ */ f(
  cf,
  {
    ...n,
    onClose: () => t(n.id)
  },
  n.id
)) }), cf = ({
  type: e = "success",
  title: t = "Notification",
  message: n = "",
  duration: s = 5e3,
  position: i = "top-right",
  onClose: r,
  isVisible: a = !1
}) => {
  const [o, l] = X(!1), [c, h] = X("");
  G(() => {
    if (a) {
      l(!0), h("toast-active");
      const g = setTimeout(() => {
        d();
      }, s);
      return () => clearTimeout(g);
    }
  }, [a, s]);
  const d = () => {
    h("toast-hide"), setTimeout(() => {
      l(!1), h(""), r && r();
    }, 500);
  }, u = () => {
    switch (e) {
      case "success":
        return /* @__PURE__ */ f("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "toast-icon", children: /* @__PURE__ */ f("path", { fillRule: "evenodd", d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z", clipRule: "evenodd" }) });
      case "error":
        return /* @__PURE__ */ f("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "toast-icon", children: /* @__PURE__ */ f("path", { fillRule: "evenodd", d: "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z", clipRule: "evenodd" }) });
      case "warning":
        return /* @__PURE__ */ f("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "toast-icon", children: /* @__PURE__ */ f("path", { fillRule: "evenodd", d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z", clipRule: "evenodd" }) });
      case "info":
        return /* @__PURE__ */ f("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "toast-icon", children: /* @__PURE__ */ f("path", { fillRule: "evenodd", d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z", clipRule: "evenodd" }) });
      default:
        return /* @__PURE__ */ f("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "toast-icon", children: /* @__PURE__ */ f("path", { fillRule: "evenodd", d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z", clipRule: "evenodd" }) });
    }
  };
  return o ? /* @__PURE__ */ f("div", { className: `toast toast-${e} toast-${i} ${c}`, children: /* @__PURE__ */ I("div", { className: "toast-inner", children: [
    /* @__PURE__ */ f("div", { className: "toast-left", children: u() }),
    /* @__PURE__ */ I("div", { className: "toast-body", children: [
      /* @__PURE__ */ f("h4", { className: "toast-title", children: t }),
      n && /* @__PURE__ */ f("div", { className: "toast-text", children: /* @__PURE__ */ f("p", { children: n }) })
    ] }),
    /* @__PURE__ */ f(
      "button",
      {
        className: "toast-close",
        onClick: d,
        "aria-label": "Close notification",
        children: /* @__PURE__ */ f("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "toast-close-icon", children: /* @__PURE__ */ f("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18 18 6M6 6l12 12" }) })
      }
    )
  ] }) }) : null;
}, yb = ({
  isOn: e = !1,
  onChange: t,
  size: n = "medium",
  disabled: s = !1,
  className: i = "",
  isStaticColor: r = !1,
  variant: a = "default",
  // "default" or "animated"
  lightIcon: o = "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/light.svg",
  darkIcon: l = "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/dark.svg",
  applyBodyTheme: c = !1,
  // Whether to apply theme to document body
  width: h,
  height: d,
  ...u
}) => {
  const [g, p] = X(e);
  G(() => {
    c && (g ? document.body.classList.add("dark-theme") : document.body.classList.remove("dark-theme"));
  }, [g, c]), G(() => () => {
    c && document.body.classList.remove("dark-theme");
  }, [c]);
  const b = () => {
    if (s) return;
    const M = !g;
    p(M), t && t(M);
  }, m = () => {
    switch (n) {
      case "small":
        return "toggle-small";
      case "large":
        return "toggle-large";
      default:
        return "toggle-medium";
    }
  }, y = () => a === "default" ? "toggle-theme" : "toggle-glassmorphic", _ = () => {
    if (h && d)
      return { width: `${h}px`, height: `${d}px` };
    switch (n) {
      case "small":
        return { width: "40px", height: "40px" };
      case "large":
        return { width: "80px", height: "80px" };
      default:
        return { width: "60px", height: "60px" };
    }
  }, x = (M) => typeof M == "string" && M.trim().startsWith("<svg"), w = (M, S, N = {}) => x(M) ? /* @__PURE__ */ f(
    "div",
    {
      className: "svg-icon-wrapper",
      dangerouslySetInnerHTML: { __html: M },
      style: N
    }
  ) : /* @__PURE__ */ f("img", { src: M, alt: S, style: N }), v = _();
  if (r) {
    const M = g ? l : o, S = {
      cursor: s ? "not-allowed" : "pointer",
      filter: g ? "invert(1)" : "none",
      transition: "all 0.3s ease",
      width: v.width,
      height: v.height
    };
    return /* @__PURE__ */ f(
      "div",
      {
        className: `toggle-container ${m()} ${y()} ${s ? "disabled" : ""} ${i}`,
        ...u,
        children: /* @__PURE__ */ f("div", { className: "theme-toggle-wrapper", children: /* @__PURE__ */ f(
          "div",
          {
            className: `theme-toggler ${g ? "dark-mode" : "light-mode"}`,
            onClick: b,
            role: "button",
            tabIndex: s ? -1 : 0,
            "aria-pressed": g,
            "aria-label": `Switch to ${g ? "light" : "dark"} theme`,
            onKeyDown: (N) => {
              (N.key === "Enter" || N.key === " ") && (N.preventDefault(), b());
            },
            style: {
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              ...S
            },
            children: w(M, "theme toggle", S)
          }
        ) })
      }
    );
  }
  if (a === "default") {
    const M = g ? l : o, S = {
      cursor: s ? "not-allowed" : "pointer",
      transition: "all 0.3s ease",
      width: v.width,
      height: v.height
    };
    return /* @__PURE__ */ f(
      "div",
      {
        className: `toggle-container ${m()} ${y()} ${s ? "disabled" : ""} ${i}`,
        ...u,
        children: /* @__PURE__ */ f("div", { className: "theme-toggle-wrapper", children: /* @__PURE__ */ f(
          "div",
          {
            className: `theme-toggler ${g ? "dark-mode" : "light-mode"}`,
            onClick: b,
            role: "button",
            tabIndex: s ? -1 : 0,
            "aria-pressed": g,
            "aria-label": `Switch to ${g ? "light" : "dark"} theme`,
            onKeyDown: (N) => {
              (N.key === "Enter" || N.key === " ") && (N.preventDefault(), b());
            },
            style: {
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              ...S
            },
            children: w(M, "theme toggle", S)
          }
        ) })
      }
    );
  }
  const k = `theme-${Math.random().toString(36).substr(2, 9)}`;
  return /* @__PURE__ */ I(
    "div",
    {
      className: `toggle-container ${m()} ${y()} ${s ? "disabled" : ""} ${i}`,
      ...u,
      children: [
        /* @__PURE__ */ f(
          "input",
          {
            type: "checkbox",
            id: k,
            className: "sr-only peer/theme",
            checked: g,
            onChange: b,
            disabled: s
          }
        ),
        /* @__PURE__ */ f("div", { className: "glassmorphic-wrapper", children: /* @__PURE__ */ f(
          "label",
          {
            htmlFor: k,
            className: "glassmorphic-theme-toggle",
            "aria-label": `Switch to ${g ? "light" : "dark"} mode`,
            style: {
              width: v.width,
              height: v.height
            },
            children: o && l ? /* @__PURE__ */ I(kt, { children: [
              /* @__PURE__ */ f(
                "div",
                {
                  className: "custom-dark-icon",
                  style: {
                    width: `calc(${v.width} * 0.5)`,
                    height: `calc(${v.height} * 0.5)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  },
                  children: w(
                    l,
                    "dark mode",
                    {
                      width: "100%",
                      height: "100%",
                      objectFit: "contain"
                    }
                  )
                }
              ),
              /* @__PURE__ */ f(
                "div",
                {
                  className: "custom-light-icon",
                  style: {
                    width: `calc(${v.width} * 0.5)`,
                    height: `calc(${v.height} * 0.5)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  },
                  children: w(
                    o,
                    "light mode",
                    {
                      width: "100%",
                      height: "100%",
                      objectFit: "contain"
                    }
                  )
                }
              )
            ] }) : /* @__PURE__ */ I(kt, { children: [
              /* @__PURE__ */ f("span", { className: "material-symbols-outlined dark-icon", children: "dark_mode" }),
              /* @__PURE__ */ f("span", { className: "material-symbols-outlined light-icon", children: "light_mode" })
            ] })
          }
        ) }),
        /* @__PURE__ */ f("div", { className: "glassmorphic-bg-mask" })
      ]
    }
  );
}, vb = ({
  buttons: e = [],
  defaultActive: t = 0,
  onToggle: n = () => {
  },
  className: s = "",
  variant: i = "default",
  // 'default', 'outline', 'minimal'
  theme: r = "togglegroup-light",
  // 'togglegroup-light', 'togglegroup-dark'
  color: a = "#e33de0"
}) => {
  const [o, l] = X(t), c = H(null), h = (b) => {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(b);
    return m ? {
      r: parseInt(m[1], 16),
      g: parseInt(m[2], 16),
      b: parseInt(m[3], 16)
    } : null;
  }, d = (b) => {
    const m = h(b);
    return m && (0.299 * m.r + 0.587 * m.g + 0.114 * m.b) / 255 > 0.5 ? "#000000" : "#ffffff";
  }, u = (b, m) => {
    const y = h(b);
    return y ? `rgba(${y.r}, ${y.g}, ${y.b}, ${m})` : `rgba(0, 0, 0, ${m})`;
  }, g = (b, m) => {
    const y = h(b);
    if (!y) return b;
    const _ = (x) => {
      const w = x + (255 - x) * (m / 100);
      return Math.min(255, Math.max(0, Math.round(w)));
    };
    return `#${_(y.r).toString(16).padStart(2, "0")}${_(y.g).toString(16).padStart(2, "0")}${_(y.b).toString(16).padStart(2, "0")}`;
  };
  G(() => {
    if (!c.current) return;
    const b = d(a), m = u(a, 0.1), y = g(a, 30), _ = u(a, 0.15), x = g(a, -10);
    c.current.style.setProperty("--active-color", a), c.current.style.setProperty("--active-text-color", b), c.current.style.setProperty("--button-bg-color", _), c.current.style.setProperty("--button-text-color", a), c.current.style.setProperty("--button-hover-bg", m), c.current.style.setProperty("--button-hover-text", x), c.current.style.setProperty("--hover-color", m), c.current.style.setProperty("--light-color", y);
  }, [a]);
  const p = (b) => {
    l(b), n(b, e[b]);
  };
  return /* @__PURE__ */ f(
    "div",
    {
      ref: c,
      className: `toggle-group ${i} ${r} ${s}`,
      children: e.map((b, m) => /* @__PURE__ */ I(
        "button",
        {
          className: `toggle-button ${o === m ? "active" : ""}`,
          onClick: () => p(m),
          type: "button",
          children: [
            b.icon && (typeof b.icon == "string" ? /* @__PURE__ */ f("i", { className: b.icon }) : b.icon),
            /* @__PURE__ */ f("span", { className: "text", children: b.text })
          ]
        },
        m
      ))
    }
  );
}, xb = ({
  children: e,
  text: t,
  position: n = "up",
  length: s = "medium",
  className: i = "",
  color: r = "#ddd",
  ...a
}) => {
  const o = H(null), l = (d) => {
    const u = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(d);
    return u ? {
      r: parseInt(u[1], 16),
      g: parseInt(u[2], 16),
      b: parseInt(u[3], 16)
    } : null;
  }, c = (d) => {
    const u = l(d);
    return u ? (0.299 * u.r + 0.587 * u.g + 0.114 * u.b) / 255 > 0.5 ? "#000000" : "#ffffff" : "#000000";
  }, h = (d, u = 10) => {
    const g = l(d);
    if (!g) return d;
    const p = (b) => {
      const m = b * (1 - u / 100);
      return Math.min(255, Math.max(0, Math.round(m)));
    };
    return `#${p(g.r).toString(16).padStart(2, "0")}${p(g.g).toString(16).padStart(2, "0")}${p(g.b).toString(16).padStart(2, "0")}`;
  };
  return G(() => {
    if (!o.current) return;
    const d = c(r), u = h(r, 15);
    o.current.style.setProperty("--tooltip-bg", r), o.current.style.setProperty("--tooltip-bs", u), o.current.style.setProperty("--tooltip-text", d);
  }, [r]), /* @__PURE__ */ f(
    "span",
    {
      ref: o,
      className: `tooltip ${i}`,
      "data-tooltip": t,
      "data-tooltip-pos": n,
      "data-tooltip-length": s,
      ...a,
      children: e
    }
  );
};
var hf = { value: () => {
} };
function Ra() {
  for (var e = 0, t = arguments.length, n = {}, s; e < t; ++e) {
    if (!(s = arguments[e] + "") || s in n || /[\s.]/.test(s)) throw new Error("illegal type: " + s);
    n[s] = [];
  }
  return new K0(n);
}
function K0(e) {
  this._ = e;
}
function df(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var s = "", i = n.indexOf(".");
    if (i >= 0 && (s = n.slice(i + 1), n = n.slice(0, i)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: s };
  });
}
K0.prototype = Ra.prototype = {
  constructor: K0,
  on: function(e, t) {
    var n = this._, s = df(e + "", n), i, r = -1, a = s.length;
    if (arguments.length < 2) {
      for (; ++r < a; ) if ((i = (e = s[r]).type) && (i = uf(n[i], e.name))) return i;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++r < a; )
      if (i = (e = s[r]).type) n[i] = pr(n[i], e.name, t);
      else if (t == null) for (i in n) n[i] = pr(n[i], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new K0(e);
  },
  call: function(e, t) {
    if ((i = arguments.length - 2) > 0) for (var n = new Array(i), s = 0, i, r; s < i; ++s) n[s] = arguments[s + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (r = this._[e], s = 0, i = r.length; s < i; ++s) r[s].value.apply(t, n);
  },
  apply: function(e, t, n) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var s = this._[e], i = 0, r = s.length; i < r; ++i) s[i].value.apply(t, n);
  }
};
function uf(e, t) {
  for (var n = 0, s = e.length, i; n < s; ++n)
    if ((i = e[n]).name === t)
      return i.value;
}
function pr(e, t, n) {
  for (var s = 0, i = e.length; s < i; ++s)
    if (e[s].name === t) {
      e[s] = hf, e = e.slice(0, s).concat(e.slice(s + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var cs = "http://www.w3.org/1999/xhtml";
const br = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: cs,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Mn(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), br.hasOwnProperty(t) ? { space: br[t], local: e } : e;
}
function ff(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === cs && t.documentElement.namespaceURI === cs ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function gf(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function La(e) {
  var t = Mn(e);
  return (t.local ? gf : ff)(t);
}
function mf() {
}
function Os(e) {
  return e == null ? mf : function() {
    return this.querySelector(e);
  };
}
function pf(e) {
  typeof e != "function" && (e = Os(e));
  for (var t = this._groups, n = t.length, s = new Array(n), i = 0; i < n; ++i)
    for (var r = t[i], a = r.length, o = s[i] = new Array(a), l, c, h = 0; h < a; ++h)
      (l = r[h]) && (c = e.call(l, l.__data__, h, r)) && ("__data__" in l && (c.__data__ = l.__data__), o[h] = c);
  return new Bt(s, this._parents);
}
function bf(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function yf() {
  return [];
}
function Ea(e) {
  return e == null ? yf : function() {
    return this.querySelectorAll(e);
  };
}
function vf(e) {
  return function() {
    return bf(e.apply(this, arguments));
  };
}
function xf(e) {
  typeof e == "function" ? e = vf(e) : e = Ea(e);
  for (var t = this._groups, n = t.length, s = [], i = [], r = 0; r < n; ++r)
    for (var a = t[r], o = a.length, l, c = 0; c < o; ++c)
      (l = a[c]) && (s.push(e.call(l, l.__data__, c, a)), i.push(l));
  return new Bt(s, i);
}
function Oa(e) {
  return function() {
    return this.matches(e);
  };
}
function za(e) {
  return function(t) {
    return t.matches(e);
  };
}
var _f = Array.prototype.find;
function wf(e) {
  return function() {
    return _f.call(this.children, e);
  };
}
function kf() {
  return this.firstElementChild;
}
function Mf(e) {
  return this.select(e == null ? kf : wf(typeof e == "function" ? e : za(e)));
}
var Sf = Array.prototype.filter;
function Cf() {
  return Array.from(this.children);
}
function Nf(e) {
  return function() {
    return Sf.call(this.children, e);
  };
}
function Pf(e) {
  return this.selectAll(e == null ? Cf : Nf(typeof e == "function" ? e : za(e)));
}
function Tf(e) {
  typeof e != "function" && (e = Oa(e));
  for (var t = this._groups, n = t.length, s = new Array(n), i = 0; i < n; ++i)
    for (var r = t[i], a = r.length, o = s[i] = [], l, c = 0; c < a; ++c)
      (l = r[c]) && e.call(l, l.__data__, c, r) && o.push(l);
  return new Bt(s, this._parents);
}
function Fa(e) {
  return new Array(e.length);
}
function $f() {
  return new Bt(this._enter || this._groups.map(Fa), this._parents);
}
function hn(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
hn.prototype = {
  constructor: hn,
  appendChild: function(e) {
    return this._parent.insertBefore(e, this._next);
  },
  insertBefore: function(e, t) {
    return this._parent.insertBefore(e, t);
  },
  querySelector: function(e) {
    return this._parent.querySelector(e);
  },
  querySelectorAll: function(e) {
    return this._parent.querySelectorAll(e);
  }
};
function Af(e) {
  return function() {
    return e;
  };
}
function Df(e, t, n, s, i, r) {
  for (var a = 0, o, l = t.length, c = r.length; a < c; ++a)
    (o = t[a]) ? (o.__data__ = r[a], s[a] = o) : n[a] = new hn(e, r[a]);
  for (; a < l; ++a)
    (o = t[a]) && (i[a] = o);
}
function If(e, t, n, s, i, r, a) {
  var o, l, c = /* @__PURE__ */ new Map(), h = t.length, d = r.length, u = new Array(h), g;
  for (o = 0; o < h; ++o)
    (l = t[o]) && (u[o] = g = a.call(l, l.__data__, o, t) + "", c.has(g) ? i[o] = l : c.set(g, l));
  for (o = 0; o < d; ++o)
    g = a.call(e, r[o], o, r) + "", (l = c.get(g)) ? (s[o] = l, l.__data__ = r[o], c.delete(g)) : n[o] = new hn(e, r[o]);
  for (o = 0; o < h; ++o)
    (l = t[o]) && c.get(u[o]) === l && (i[o] = l);
}
function Rf(e) {
  return e.__data__;
}
function Lf(e, t) {
  if (!arguments.length) return Array.from(this, Rf);
  var n = t ? If : Df, s = this._parents, i = this._groups;
  typeof e != "function" && (e = Af(e));
  for (var r = i.length, a = new Array(r), o = new Array(r), l = new Array(r), c = 0; c < r; ++c) {
    var h = s[c], d = i[c], u = d.length, g = Ef(e.call(h, h && h.__data__, c, s)), p = g.length, b = o[c] = new Array(p), m = a[c] = new Array(p), y = l[c] = new Array(u);
    n(h, d, b, m, y, g, t);
    for (var _ = 0, x = 0, w, v; _ < p; ++_)
      if (w = b[_]) {
        for (_ >= x && (x = _ + 1); !(v = m[x]) && ++x < p; ) ;
        w._next = v || null;
      }
  }
  return a = new Bt(a, s), a._enter = o, a._exit = l, a;
}
function Ef(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Of() {
  return new Bt(this._exit || this._groups.map(Fa), this._parents);
}
function zf(e, t, n) {
  var s = this.enter(), i = this, r = this.exit();
  return typeof e == "function" ? (s = e(s), s && (s = s.selection())) : s = s.append(e + ""), t != null && (i = t(i), i && (i = i.selection())), n == null ? r.remove() : n(r), s && i ? s.merge(i).order() : i;
}
function Ff(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, s = t._groups, i = n.length, r = s.length, a = Math.min(i, r), o = new Array(i), l = 0; l < a; ++l)
    for (var c = n[l], h = s[l], d = c.length, u = o[l] = new Array(d), g, p = 0; p < d; ++p)
      (g = c[p] || h[p]) && (u[p] = g);
  for (; l < i; ++l)
    o[l] = n[l];
  return new Bt(o, this._parents);
}
function Bf() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var s = e[t], i = s.length - 1, r = s[i], a; --i >= 0; )
      (a = s[i]) && (r && a.compareDocumentPosition(r) ^ 4 && r.parentNode.insertBefore(a, r), r = a);
  return this;
}
function Hf(e) {
  e || (e = Vf);
  function t(d, u) {
    return d && u ? e(d.__data__, u.__data__) : !d - !u;
  }
  for (var n = this._groups, s = n.length, i = new Array(s), r = 0; r < s; ++r) {
    for (var a = n[r], o = a.length, l = i[r] = new Array(o), c, h = 0; h < o; ++h)
      (c = a[h]) && (l[h] = c);
    l.sort(t);
  }
  return new Bt(i, this._parents).order();
}
function Vf(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Wf() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function jf() {
  return Array.from(this);
}
function Yf() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var s = e[t], i = 0, r = s.length; i < r; ++i) {
      var a = s[i];
      if (a) return a;
    }
  return null;
}
function Uf() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Xf() {
  return !this.node();
}
function Gf(e) {
  for (var t = this._groups, n = 0, s = t.length; n < s; ++n)
    for (var i = t[n], r = 0, a = i.length, o; r < a; ++r)
      (o = i[r]) && e.call(o, o.__data__, r, i);
  return this;
}
function qf(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Zf(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Kf(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Jf(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Qf(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function tg(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function eg(e, t) {
  var n = Mn(e);
  if (arguments.length < 2) {
    var s = this.node();
    return n.local ? s.getAttributeNS(n.space, n.local) : s.getAttribute(n);
  }
  return this.each((t == null ? n.local ? Zf : qf : typeof t == "function" ? n.local ? tg : Qf : n.local ? Jf : Kf)(n, t));
}
function Ba(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function ng(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function sg(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function ig(e, t, n) {
  return function() {
    var s = t.apply(this, arguments);
    s == null ? this.style.removeProperty(e) : this.style.setProperty(e, s, n);
  };
}
function rg(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? ng : typeof t == "function" ? ig : sg)(e, t, n ?? "")) : Ye(this.node(), e);
}
function Ye(e, t) {
  return e.style.getPropertyValue(t) || Ba(e).getComputedStyle(e, null).getPropertyValue(t);
}
function ag(e) {
  return function() {
    delete this[e];
  };
}
function og(e, t) {
  return function() {
    this[e] = t;
  };
}
function lg(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function cg(e, t) {
  return arguments.length > 1 ? this.each((t == null ? ag : typeof t == "function" ? lg : og)(e, t)) : this.node()[e];
}
function Ha(e) {
  return e.trim().split(/^|\s+/);
}
function zs(e) {
  return e.classList || new Va(e);
}
function Va(e) {
  this._node = e, this._names = Ha(e.getAttribute("class") || "");
}
Va.prototype = {
  add: function(e) {
    var t = this._names.indexOf(e);
    t < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(e) {
    var t = this._names.indexOf(e);
    t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(e) {
    return this._names.indexOf(e) >= 0;
  }
};
function Wa(e, t) {
  for (var n = zs(e), s = -1, i = t.length; ++s < i; ) n.add(t[s]);
}
function ja(e, t) {
  for (var n = zs(e), s = -1, i = t.length; ++s < i; ) n.remove(t[s]);
}
function hg(e) {
  return function() {
    Wa(this, e);
  };
}
function dg(e) {
  return function() {
    ja(this, e);
  };
}
function ug(e, t) {
  return function() {
    (t.apply(this, arguments) ? Wa : ja)(this, e);
  };
}
function fg(e, t) {
  var n = Ha(e + "");
  if (arguments.length < 2) {
    for (var s = zs(this.node()), i = -1, r = n.length; ++i < r; ) if (!s.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? ug : t ? hg : dg)(n, t));
}
function gg() {
  this.textContent = "";
}
function mg(e) {
  return function() {
    this.textContent = e;
  };
}
function pg(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function bg(e) {
  return arguments.length ? this.each(e == null ? gg : (typeof e == "function" ? pg : mg)(e)) : this.node().textContent;
}
function yg() {
  this.innerHTML = "";
}
function vg(e) {
  return function() {
    this.innerHTML = e;
  };
}
function xg(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function _g(e) {
  return arguments.length ? this.each(e == null ? yg : (typeof e == "function" ? xg : vg)(e)) : this.node().innerHTML;
}
function wg() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function kg() {
  return this.each(wg);
}
function Mg() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Sg() {
  return this.each(Mg);
}
function Cg(e) {
  var t = typeof e == "function" ? e : La(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Ng() {
  return null;
}
function Pg(e, t) {
  var n = typeof e == "function" ? e : La(e), s = t == null ? Ng : typeof t == "function" ? t : Os(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), s.apply(this, arguments) || null);
  });
}
function Tg() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function $g() {
  return this.each(Tg);
}
function Ag() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Dg() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Ig(e) {
  return this.select(e ? Dg : Ag);
}
function Rg(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Lg(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Eg(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", s = t.indexOf(".");
    return s >= 0 && (n = t.slice(s + 1), t = t.slice(0, s)), { type: t, name: n };
  });
}
function Og(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, s = -1, i = t.length, r; n < i; ++n)
        r = t[n], (!e.type || r.type === e.type) && r.name === e.name ? this.removeEventListener(r.type, r.listener, r.options) : t[++s] = r;
      ++s ? t.length = s : delete this.__on;
    }
  };
}
function zg(e, t, n) {
  return function() {
    var s = this.__on, i, r = Lg(t);
    if (s) {
      for (var a = 0, o = s.length; a < o; ++a)
        if ((i = s[a]).type === e.type && i.name === e.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = r, i.options = n), i.value = t;
          return;
        }
    }
    this.addEventListener(e.type, r, n), i = { type: e.type, name: e.name, value: t, listener: r, options: n }, s ? s.push(i) : this.__on = [i];
  };
}
function Fg(e, t, n) {
  var s = Eg(e + ""), i, r = s.length, a;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var l = 0, c = o.length, h; l < c; ++l)
        for (i = 0, h = o[l]; i < r; ++i)
          if ((a = s[i]).type === h.type && a.name === h.name)
            return h.value;
    }
    return;
  }
  for (o = t ? zg : Og, i = 0; i < r; ++i) this.each(o(s[i], t, n));
  return this;
}
function Ya(e, t, n) {
  var s = Ba(e), i = s.CustomEvent;
  typeof i == "function" ? i = new i(t, n) : (i = s.document.createEvent("Event"), n ? (i.initEvent(t, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i);
}
function Bg(e, t) {
  return function() {
    return Ya(this, e, t);
  };
}
function Hg(e, t) {
  return function() {
    return Ya(this, e, t.apply(this, arguments));
  };
}
function Vg(e, t) {
  return this.each((typeof t == "function" ? Hg : Bg)(e, t));
}
function* Wg() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var s = e[t], i = 0, r = s.length, a; i < r; ++i)
      (a = s[i]) && (yield a);
}
var Ua = [null];
function Bt(e, t) {
  this._groups = e, this._parents = t;
}
function P0() {
  return new Bt([[document.documentElement]], Ua);
}
function jg() {
  return this;
}
Bt.prototype = P0.prototype = {
  constructor: Bt,
  select: pf,
  selectAll: xf,
  selectChild: Mf,
  selectChildren: Pf,
  filter: Tf,
  data: Lf,
  enter: $f,
  exit: Of,
  join: zf,
  merge: Ff,
  selection: jg,
  order: Bf,
  sort: Hf,
  call: Wf,
  nodes: jf,
  node: Yf,
  size: Uf,
  empty: Xf,
  each: Gf,
  attr: eg,
  style: rg,
  property: cg,
  classed: fg,
  text: bg,
  html: _g,
  raise: kg,
  lower: Sg,
  append: Cg,
  insert: Pg,
  remove: $g,
  clone: Ig,
  datum: Rg,
  on: Fg,
  dispatch: Vg,
  [Symbol.iterator]: Wg
};
function Y0(e) {
  return typeof e == "string" ? new Bt([[document.querySelector(e)]], [document.documentElement]) : new Bt([[e]], Ua);
}
function Fs(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function Xa(e, t) {
  var n = Object.create(e.prototype);
  for (var s in t) n[s] = t[s];
  return n;
}
function T0() {
}
var _0 = 0.7, dn = 1 / _0, He = "\\s*([+-]?\\d+)\\s*", w0 = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Kt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Yg = /^#([0-9a-f]{3,8})$/, Ug = new RegExp(`^rgb\\(${He},${He},${He}\\)$`), Xg = new RegExp(`^rgb\\(${Kt},${Kt},${Kt}\\)$`), Gg = new RegExp(`^rgba\\(${He},${He},${He},${w0}\\)$`), qg = new RegExp(`^rgba\\(${Kt},${Kt},${Kt},${w0}\\)$`), Zg = new RegExp(`^hsl\\(${w0},${Kt},${Kt}\\)$`), Kg = new RegExp(`^hsla\\(${w0},${Kt},${Kt},${w0}\\)$`), yr = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Fs(T0, k0, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: vr,
  // Deprecated! Use color.formatHex.
  formatHex: vr,
  formatHex8: Jg,
  formatHsl: Qg,
  formatRgb: xr,
  toString: xr
});
function vr() {
  return this.rgb().formatHex();
}
function Jg() {
  return this.rgb().formatHex8();
}
function Qg() {
  return Ga(this).formatHsl();
}
function xr() {
  return this.rgb().formatRgb();
}
function k0(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = Yg.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? _r(t) : n === 3 ? new Et(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? U0(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? U0(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Ug.exec(e)) ? new Et(t[1], t[2], t[3], 1) : (t = Xg.exec(e)) ? new Et(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Gg.exec(e)) ? U0(t[1], t[2], t[3], t[4]) : (t = qg.exec(e)) ? U0(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Zg.exec(e)) ? Mr(t[1], t[2] / 100, t[3] / 100, 1) : (t = Kg.exec(e)) ? Mr(t[1], t[2] / 100, t[3] / 100, t[4]) : yr.hasOwnProperty(e) ? _r(yr[e]) : e === "transparent" ? new Et(NaN, NaN, NaN, 0) : null;
}
function _r(e) {
  return new Et(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function U0(e, t, n, s) {
  return s <= 0 && (e = t = n = NaN), new Et(e, t, n, s);
}
function tm(e) {
  return e instanceof T0 || (e = k0(e)), e ? (e = e.rgb(), new Et(e.r, e.g, e.b, e.opacity)) : new Et();
}
function hs(e, t, n, s) {
  return arguments.length === 1 ? tm(e) : new Et(e, t, n, s ?? 1);
}
function Et(e, t, n, s) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +s;
}
Fs(Et, hs, Xa(T0, {
  brighter(e) {
    return e = e == null ? dn : Math.pow(dn, e), new Et(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? _0 : Math.pow(_0, e), new Et(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Et(Ie(this.r), Ie(this.g), Ie(this.b), un(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: wr,
  // Deprecated! Use color.formatHex.
  formatHex: wr,
  formatHex8: em,
  formatRgb: kr,
  toString: kr
}));
function wr() {
  return `#${$e(this.r)}${$e(this.g)}${$e(this.b)}`;
}
function em() {
  return `#${$e(this.r)}${$e(this.g)}${$e(this.b)}${$e((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function kr() {
  const e = un(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Ie(this.r)}, ${Ie(this.g)}, ${Ie(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function un(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Ie(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function $e(e) {
  return e = Ie(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Mr(e, t, n, s) {
  return s <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new jt(e, t, n, s);
}
function Ga(e) {
  if (e instanceof jt) return new jt(e.h, e.s, e.l, e.opacity);
  if (e instanceof T0 || (e = k0(e)), !e) return new jt();
  if (e instanceof jt) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, s = e.b / 255, i = Math.min(t, n, s), r = Math.max(t, n, s), a = NaN, o = r - i, l = (r + i) / 2;
  return o ? (t === r ? a = (n - s) / o + (n < s) * 6 : n === r ? a = (s - t) / o + 2 : a = (t - n) / o + 4, o /= l < 0.5 ? r + i : 2 - r - i, a *= 60) : o = l > 0 && l < 1 ? 0 : a, new jt(a, o, l, e.opacity);
}
function nm(e, t, n, s) {
  return arguments.length === 1 ? Ga(e) : new jt(e, t, n, s ?? 1);
}
function jt(e, t, n, s) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +s;
}
Fs(jt, nm, Xa(T0, {
  brighter(e) {
    return e = e == null ? dn : Math.pow(dn, e), new jt(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? _0 : Math.pow(_0, e), new jt(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, s = n + (n < 0.5 ? n : 1 - n) * t, i = 2 * n - s;
    return new Et(
      Vn(e >= 240 ? e - 240 : e + 120, i, s),
      Vn(e, i, s),
      Vn(e < 120 ? e + 240 : e - 120, i, s),
      this.opacity
    );
  },
  clamp() {
    return new jt(Sr(this.h), X0(this.s), X0(this.l), un(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = un(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Sr(this.h)}, ${X0(this.s) * 100}%, ${X0(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Sr(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function X0(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Vn(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const qa = (e) => () => e;
function sm(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function im(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(s) {
    return Math.pow(e + s * t, n);
  };
}
function rm(e) {
  return (e = +e) == 1 ? Za : function(t, n) {
    return n - t ? im(t, n, e) : qa(isNaN(t) ? n : t);
  };
}
function Za(e, t) {
  var n = t - e;
  return n ? sm(e, n) : qa(isNaN(e) ? t : e);
}
const Cr = (function e(t) {
  var n = rm(t);
  function s(i, r) {
    var a = n((i = hs(i)).r, (r = hs(r)).r), o = n(i.g, r.g), l = n(i.b, r.b), c = Za(i.opacity, r.opacity);
    return function(h) {
      return i.r = a(h), i.g = o(h), i.b = l(h), i.opacity = c(h), i + "";
    };
  }
  return s.gamma = e, s;
})(1);
function fe(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
var ds = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Wn = new RegExp(ds.source, "g");
function am(e) {
  return function() {
    return e;
  };
}
function om(e) {
  return function(t) {
    return e(t) + "";
  };
}
function lm(e, t) {
  var n = ds.lastIndex = Wn.lastIndex = 0, s, i, r, a = -1, o = [], l = [];
  for (e = e + "", t = t + ""; (s = ds.exec(e)) && (i = Wn.exec(t)); )
    (r = i.index) > n && (r = t.slice(n, r), o[a] ? o[a] += r : o[++a] = r), (s = s[0]) === (i = i[0]) ? o[a] ? o[a] += i : o[++a] = i : (o[++a] = null, l.push({ i: a, x: fe(s, i) })), n = Wn.lastIndex;
  return n < t.length && (r = t.slice(n), o[a] ? o[a] += r : o[++a] = r), o.length < 2 ? l[0] ? om(l[0].x) : am(t) : (t = l.length, function(c) {
    for (var h = 0, d; h < t; ++h) o[(d = l[h]).i] = d.x(c);
    return o.join("");
  });
}
var Nr = 180 / Math.PI, us = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Ka(e, t, n, s, i, r) {
  var a, o, l;
  return (a = Math.sqrt(e * e + t * t)) && (e /= a, t /= a), (l = e * n + t * s) && (n -= e * l, s -= t * l), (o = Math.sqrt(n * n + s * s)) && (n /= o, s /= o, l /= o), e * s < t * n && (e = -e, t = -t, l = -l, a = -a), {
    translateX: i,
    translateY: r,
    rotate: Math.atan2(t, e) * Nr,
    skewX: Math.atan(l) * Nr,
    scaleX: a,
    scaleY: o
  };
}
var G0;
function cm(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? us : Ka(t.a, t.b, t.c, t.d, t.e, t.f);
}
function hm(e) {
  return e == null || (G0 || (G0 = document.createElementNS("http://www.w3.org/2000/svg", "g")), G0.setAttribute("transform", e), !(e = G0.transform.baseVal.consolidate())) ? us : (e = e.matrix, Ka(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Ja(e, t, n, s) {
  function i(c) {
    return c.length ? c.pop() + " " : "";
  }
  function r(c, h, d, u, g, p) {
    if (c !== d || h !== u) {
      var b = g.push("translate(", null, t, null, n);
      p.push({ i: b - 4, x: fe(c, d) }, { i: b - 2, x: fe(h, u) });
    } else (d || u) && g.push("translate(" + d + t + u + n);
  }
  function a(c, h, d, u) {
    c !== h ? (c - h > 180 ? h += 360 : h - c > 180 && (c += 360), u.push({ i: d.push(i(d) + "rotate(", null, s) - 2, x: fe(c, h) })) : h && d.push(i(d) + "rotate(" + h + s);
  }
  function o(c, h, d, u) {
    c !== h ? u.push({ i: d.push(i(d) + "skewX(", null, s) - 2, x: fe(c, h) }) : h && d.push(i(d) + "skewX(" + h + s);
  }
  function l(c, h, d, u, g, p) {
    if (c !== d || h !== u) {
      var b = g.push(i(g) + "scale(", null, ",", null, ")");
      p.push({ i: b - 4, x: fe(c, d) }, { i: b - 2, x: fe(h, u) });
    } else (d !== 1 || u !== 1) && g.push(i(g) + "scale(" + d + "," + u + ")");
  }
  return function(c, h) {
    var d = [], u = [];
    return c = e(c), h = e(h), r(c.translateX, c.translateY, h.translateX, h.translateY, d, u), a(c.rotate, h.rotate, d, u), o(c.skewX, h.skewX, d, u), l(c.scaleX, c.scaleY, h.scaleX, h.scaleY, d, u), c = h = null, function(g) {
      for (var p = -1, b = u.length, m; ++p < b; ) d[(m = u[p]).i] = m.x(g);
      return d.join("");
    };
  };
}
var dm = Ja(cm, "px, ", "px)", "deg)"), um = Ja(hm, ", ", ")", ")"), Ue = 0, o0 = 0, e0 = 0, Qa = 1e3, fn, l0, gn = 0, Ee = 0, Sn = 0, M0 = typeof performance == "object" && performance.now ? performance : Date, to = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Bs() {
  return Ee || (to(fm), Ee = M0.now() + Sn);
}
function fm() {
  Ee = 0;
}
function mn() {
  this._call = this._time = this._next = null;
}
mn.prototype = eo.prototype = {
  constructor: mn,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Bs() : +n) + (t == null ? 0 : +t), !this._next && l0 !== this && (l0 ? l0._next = this : fn = this, l0 = this), this._call = e, this._time = n, fs();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, fs());
  }
};
function eo(e, t, n) {
  var s = new mn();
  return s.restart(e, t, n), s;
}
function gm() {
  Bs(), ++Ue;
  for (var e = fn, t; e; )
    (t = Ee - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Ue;
}
function Pr() {
  Ee = (gn = M0.now()) + Sn, Ue = o0 = 0;
  try {
    gm();
  } finally {
    Ue = 0, pm(), Ee = 0;
  }
}
function mm() {
  var e = M0.now(), t = e - gn;
  t > Qa && (Sn -= t, gn = e);
}
function pm() {
  for (var e, t = fn, n, s = 1 / 0; t; )
    t._call ? (s > t._time && (s = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : fn = n);
  l0 = e, fs(s);
}
function fs(e) {
  if (!Ue) {
    o0 && (o0 = clearTimeout(o0));
    var t = e - Ee;
    t > 24 ? (e < 1 / 0 && (o0 = setTimeout(Pr, e - M0.now() - Sn)), e0 && (e0 = clearInterval(e0))) : (e0 || (gn = M0.now(), e0 = setInterval(mm, Qa)), Ue = 1, to(Pr));
  }
}
function Tr(e, t, n) {
  var s = new mn();
  return t = t == null ? 0 : +t, s.restart((i) => {
    s.stop(), e(i + t);
  }, t, n), s;
}
var bm = Ra("start", "end", "cancel", "interrupt"), ym = [], no = 0, $r = 1, gs = 2, J0 = 3, Ar = 4, ms = 5, Q0 = 6;
function Cn(e, t, n, s, i, r) {
  var a = e.__transition;
  if (!a) e.__transition = {};
  else if (n in a) return;
  vm(e, n, {
    name: t,
    index: s,
    // For context during callback.
    group: i,
    // For context during callback.
    on: bm,
    tween: ym,
    time: r.time,
    delay: r.delay,
    duration: r.duration,
    ease: r.ease,
    timer: null,
    state: no
  });
}
function Hs(e, t) {
  var n = Ut(e, t);
  if (n.state > no) throw new Error("too late; already scheduled");
  return n;
}
function Jt(e, t) {
  var n = Ut(e, t);
  if (n.state > J0) throw new Error("too late; already running");
  return n;
}
function Ut(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function vm(e, t, n) {
  var s = e.__transition, i;
  s[t] = n, n.timer = eo(r, 0, n.time);
  function r(c) {
    n.state = $r, n.timer.restart(a, n.delay, n.time), n.delay <= c && a(c - n.delay);
  }
  function a(c) {
    var h, d, u, g;
    if (n.state !== $r) return l();
    for (h in s)
      if (g = s[h], g.name === n.name) {
        if (g.state === J0) return Tr(a);
        g.state === Ar ? (g.state = Q0, g.timer.stop(), g.on.call("interrupt", e, e.__data__, g.index, g.group), delete s[h]) : +h < t && (g.state = Q0, g.timer.stop(), g.on.call("cancel", e, e.__data__, g.index, g.group), delete s[h]);
      }
    if (Tr(function() {
      n.state === J0 && (n.state = Ar, n.timer.restart(o, n.delay, n.time), o(c));
    }), n.state = gs, n.on.call("start", e, e.__data__, n.index, n.group), n.state === gs) {
      for (n.state = J0, i = new Array(u = n.tween.length), h = 0, d = -1; h < u; ++h)
        (g = n.tween[h].value.call(e, e.__data__, n.index, n.group)) && (i[++d] = g);
      i.length = d + 1;
    }
  }
  function o(c) {
    for (var h = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(l), n.state = ms, 1), d = -1, u = i.length; ++d < u; )
      i[d].call(e, h);
    n.state === ms && (n.on.call("end", e, e.__data__, n.index, n.group), l());
  }
  function l() {
    n.state = Q0, n.timer.stop(), delete s[t];
    for (var c in s) return;
    delete e.__transition;
  }
}
function xm(e, t) {
  var n = e.__transition, s, i, r = !0, a;
  if (n) {
    t = t == null ? null : t + "";
    for (a in n) {
      if ((s = n[a]).name !== t) {
        r = !1;
        continue;
      }
      i = s.state > gs && s.state < ms, s.state = Q0, s.timer.stop(), s.on.call(i ? "interrupt" : "cancel", e, e.__data__, s.index, s.group), delete n[a];
    }
    r && delete e.__transition;
  }
}
function _m(e) {
  return this.each(function() {
    xm(this, e);
  });
}
function wm(e, t) {
  var n, s;
  return function() {
    var i = Jt(this, e), r = i.tween;
    if (r !== n) {
      s = n = r;
      for (var a = 0, o = s.length; a < o; ++a)
        if (s[a].name === t) {
          s = s.slice(), s.splice(a, 1);
          break;
        }
    }
    i.tween = s;
  };
}
function km(e, t, n) {
  var s, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var r = Jt(this, e), a = r.tween;
    if (a !== s) {
      i = (s = a).slice();
      for (var o = { name: t, value: n }, l = 0, c = i.length; l < c; ++l)
        if (i[l].name === t) {
          i[l] = o;
          break;
        }
      l === c && i.push(o);
    }
    r.tween = i;
  };
}
function Mm(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var s = Ut(this.node(), n).tween, i = 0, r = s.length, a; i < r; ++i)
      if ((a = s[i]).name === e)
        return a.value;
    return null;
  }
  return this.each((t == null ? wm : km)(n, e, t));
}
function Vs(e, t, n) {
  var s = e._id;
  return e.each(function() {
    var i = Jt(this, s);
    (i.value || (i.value = {}))[t] = n.apply(this, arguments);
  }), function(i) {
    return Ut(i, s).value[t];
  };
}
function so(e, t) {
  var n;
  return (typeof t == "number" ? fe : t instanceof k0 ? Cr : (n = k0(t)) ? (t = n, Cr) : lm)(e, t);
}
function Sm(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Cm(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Nm(e, t, n) {
  var s, i = n + "", r;
  return function() {
    var a = this.getAttribute(e);
    return a === i ? null : a === s ? r : r = t(s = a, n);
  };
}
function Pm(e, t, n) {
  var s, i = n + "", r;
  return function() {
    var a = this.getAttributeNS(e.space, e.local);
    return a === i ? null : a === s ? r : r = t(s = a, n);
  };
}
function Tm(e, t, n) {
  var s, i, r;
  return function() {
    var a, o = n(this), l;
    return o == null ? void this.removeAttribute(e) : (a = this.getAttribute(e), l = o + "", a === l ? null : a === s && l === i ? r : (i = l, r = t(s = a, o)));
  };
}
function $m(e, t, n) {
  var s, i, r;
  return function() {
    var a, o = n(this), l;
    return o == null ? void this.removeAttributeNS(e.space, e.local) : (a = this.getAttributeNS(e.space, e.local), l = o + "", a === l ? null : a === s && l === i ? r : (i = l, r = t(s = a, o)));
  };
}
function Am(e, t) {
  var n = Mn(e), s = n === "transform" ? um : so;
  return this.attrTween(e, typeof t == "function" ? (n.local ? $m : Tm)(n, s, Vs(this, "attr." + e, t)) : t == null ? (n.local ? Cm : Sm)(n) : (n.local ? Pm : Nm)(n, s, t));
}
function Dm(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function Im(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function Rm(e, t) {
  var n, s;
  function i() {
    var r = t.apply(this, arguments);
    return r !== s && (n = (s = r) && Im(e, r)), n;
  }
  return i._value = t, i;
}
function Lm(e, t) {
  var n, s;
  function i() {
    var r = t.apply(this, arguments);
    return r !== s && (n = (s = r) && Dm(e, r)), n;
  }
  return i._value = t, i;
}
function Em(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var s = Mn(e);
  return this.tween(n, (s.local ? Rm : Lm)(s, t));
}
function Om(e, t) {
  return function() {
    Hs(this, e).delay = +t.apply(this, arguments);
  };
}
function zm(e, t) {
  return t = +t, function() {
    Hs(this, e).delay = t;
  };
}
function Fm(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Om : zm)(t, e)) : Ut(this.node(), t).delay;
}
function Bm(e, t) {
  return function() {
    Jt(this, e).duration = +t.apply(this, arguments);
  };
}
function Hm(e, t) {
  return t = +t, function() {
    Jt(this, e).duration = t;
  };
}
function Vm(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Bm : Hm)(t, e)) : Ut(this.node(), t).duration;
}
function Wm(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Jt(this, e).ease = t;
  };
}
function jm(e) {
  var t = this._id;
  return arguments.length ? this.each(Wm(t, e)) : Ut(this.node(), t).ease;
}
function Ym(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Jt(this, e).ease = n;
  };
}
function Um(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Ym(this._id, e));
}
function Xm(e) {
  typeof e != "function" && (e = Oa(e));
  for (var t = this._groups, n = t.length, s = new Array(n), i = 0; i < n; ++i)
    for (var r = t[i], a = r.length, o = s[i] = [], l, c = 0; c < a; ++c)
      (l = r[c]) && e.call(l, l.__data__, c, r) && o.push(l);
  return new de(s, this._parents, this._name, this._id);
}
function Gm(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, s = t.length, i = n.length, r = Math.min(s, i), a = new Array(s), o = 0; o < r; ++o)
    for (var l = t[o], c = n[o], h = l.length, d = a[o] = new Array(h), u, g = 0; g < h; ++g)
      (u = l[g] || c[g]) && (d[g] = u);
  for (; o < s; ++o)
    a[o] = t[o];
  return new de(a, this._parents, this._name, this._id);
}
function qm(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function Zm(e, t, n) {
  var s, i, r = qm(t) ? Hs : Jt;
  return function() {
    var a = r(this, e), o = a.on;
    o !== s && (i = (s = o).copy()).on(t, n), a.on = i;
  };
}
function Km(e, t) {
  var n = this._id;
  return arguments.length < 2 ? Ut(this.node(), n).on.on(e) : this.each(Zm(n, e, t));
}
function Jm(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function Qm() {
  return this.on("end.remove", Jm(this._id));
}
function tp(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Os(e));
  for (var s = this._groups, i = s.length, r = new Array(i), a = 0; a < i; ++a)
    for (var o = s[a], l = o.length, c = r[a] = new Array(l), h, d, u = 0; u < l; ++u)
      (h = o[u]) && (d = e.call(h, h.__data__, u, o)) && ("__data__" in h && (d.__data__ = h.__data__), c[u] = d, Cn(c[u], t, n, u, c, Ut(h, n)));
  return new de(r, this._parents, t, n);
}
function ep(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Ea(e));
  for (var s = this._groups, i = s.length, r = [], a = [], o = 0; o < i; ++o)
    for (var l = s[o], c = l.length, h, d = 0; d < c; ++d)
      if (h = l[d]) {
        for (var u = e.call(h, h.__data__, d, l), g, p = Ut(h, n), b = 0, m = u.length; b < m; ++b)
          (g = u[b]) && Cn(g, t, n, b, u, p);
        r.push(u), a.push(h);
      }
  return new de(r, a, t, n);
}
var np = P0.prototype.constructor;
function sp() {
  return new np(this._groups, this._parents);
}
function ip(e, t) {
  var n, s, i;
  return function() {
    var r = Ye(this, e), a = (this.style.removeProperty(e), Ye(this, e));
    return r === a ? null : r === n && a === s ? i : i = t(n = r, s = a);
  };
}
function io(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function rp(e, t, n) {
  var s, i = n + "", r;
  return function() {
    var a = Ye(this, e);
    return a === i ? null : a === s ? r : r = t(s = a, n);
  };
}
function ap(e, t, n) {
  var s, i, r;
  return function() {
    var a = Ye(this, e), o = n(this), l = o + "";
    return o == null && (l = o = (this.style.removeProperty(e), Ye(this, e))), a === l ? null : a === s && l === i ? r : (i = l, r = t(s = a, o));
  };
}
function op(e, t) {
  var n, s, i, r = "style." + t, a = "end." + r, o;
  return function() {
    var l = Jt(this, e), c = l.on, h = l.value[r] == null ? o || (o = io(t)) : void 0;
    (c !== n || i !== h) && (s = (n = c).copy()).on(a, i = h), l.on = s;
  };
}
function lp(e, t, n) {
  var s = (e += "") == "transform" ? dm : so;
  return t == null ? this.styleTween(e, ip(e, s)).on("end.style." + e, io(e)) : typeof t == "function" ? this.styleTween(e, ap(e, s, Vs(this, "style." + e, t))).each(op(this._id, e)) : this.styleTween(e, rp(e, s, t), n).on("end.style." + e, null);
}
function cp(e, t, n) {
  return function(s) {
    this.style.setProperty(e, t.call(this, s), n);
  };
}
function hp(e, t, n) {
  var s, i;
  function r() {
    var a = t.apply(this, arguments);
    return a !== i && (s = (i = a) && cp(e, a, n)), s;
  }
  return r._value = t, r;
}
function dp(e, t, n) {
  var s = "style." + (e += "");
  if (arguments.length < 2) return (s = this.tween(s)) && s._value;
  if (t == null) return this.tween(s, null);
  if (typeof t != "function") throw new Error();
  return this.tween(s, hp(e, t, n ?? ""));
}
function up(e) {
  return function() {
    this.textContent = e;
  };
}
function fp(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function gp(e) {
  return this.tween("text", typeof e == "function" ? fp(Vs(this, "text", e)) : up(e == null ? "" : e + ""));
}
function mp(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function pp(e) {
  var t, n;
  function s() {
    var i = e.apply(this, arguments);
    return i !== n && (t = (n = i) && mp(i)), t;
  }
  return s._value = e, s;
}
function bp(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, pp(e));
}
function yp() {
  for (var e = this._name, t = this._id, n = ro(), s = this._groups, i = s.length, r = 0; r < i; ++r)
    for (var a = s[r], o = a.length, l, c = 0; c < o; ++c)
      if (l = a[c]) {
        var h = Ut(l, t);
        Cn(l, e, n, c, a, {
          time: h.time + h.delay + h.duration,
          delay: 0,
          duration: h.duration,
          ease: h.ease
        });
      }
  return new de(s, this._parents, e, n);
}
function vp() {
  var e, t, n = this, s = n._id, i = n.size();
  return new Promise(function(r, a) {
    var o = { value: a }, l = { value: function() {
      --i === 0 && r();
    } };
    n.each(function() {
      var c = Jt(this, s), h = c.on;
      h !== e && (t = (e = h).copy(), t._.cancel.push(o), t._.interrupt.push(o), t._.end.push(l)), c.on = t;
    }), i === 0 && r();
  });
}
var xp = 0;
function de(e, t, n, s) {
  this._groups = e, this._parents = t, this._name = n, this._id = s;
}
function ro() {
  return ++xp;
}
var ie = P0.prototype;
de.prototype = {
  constructor: de,
  select: tp,
  selectAll: ep,
  selectChild: ie.selectChild,
  selectChildren: ie.selectChildren,
  filter: Xm,
  merge: Gm,
  selection: sp,
  transition: yp,
  call: ie.call,
  nodes: ie.nodes,
  node: ie.node,
  size: ie.size,
  empty: ie.empty,
  each: ie.each,
  on: Km,
  attr: Am,
  attrTween: Em,
  style: lp,
  styleTween: dp,
  text: gp,
  textTween: bp,
  remove: Qm,
  tween: Mm,
  delay: Fm,
  duration: Vm,
  ease: jm,
  easeVarying: Um,
  end: vp,
  [Symbol.iterator]: ie[Symbol.iterator]
};
function _p(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var wp = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: _p
};
function kp(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function Mp(e) {
  var t, n;
  e instanceof de ? (t = e._id, e = e._name) : (t = ro(), (n = wp).time = Bs(), e = e == null ? null : e + "");
  for (var s = this._groups, i = s.length, r = 0; r < i; ++r)
    for (var a = s[r], o = a.length, l, c = 0; c < o; ++c)
      (l = a[c]) && Cn(l, e, t, c, a, n || kp(l, t));
  return new de(s, this._parents, e, t);
}
P0.prototype.interrupt = _m;
P0.prototype.transition = Mp;
function Sp(e) {
  var t = 0, n = e.children, s = n && n.length;
  if (!s) t = 1;
  else for (; --s >= 0; ) t += n[s].value;
  e.value = t;
}
function Cp() {
  return this.eachAfter(Sp);
}
function Np(e, t) {
  let n = -1;
  for (const s of this)
    e.call(t, s, ++n, this);
  return this;
}
function Pp(e, t) {
  for (var n = this, s = [n], i, r, a = -1; n = s.pop(); )
    if (e.call(t, n, ++a, this), i = n.children)
      for (r = i.length - 1; r >= 0; --r)
        s.push(i[r]);
  return this;
}
function Tp(e, t) {
  for (var n = this, s = [n], i = [], r, a, o, l = -1; n = s.pop(); )
    if (i.push(n), r = n.children)
      for (a = 0, o = r.length; a < o; ++a)
        s.push(r[a]);
  for (; n = i.pop(); )
    e.call(t, n, ++l, this);
  return this;
}
function $p(e, t) {
  let n = -1;
  for (const s of this)
    if (e.call(t, s, ++n, this))
      return s;
}
function Ap(e) {
  return this.eachAfter(function(t) {
    for (var n = +e(t.data) || 0, s = t.children, i = s && s.length; --i >= 0; ) n += s[i].value;
    t.value = n;
  });
}
function Dp(e) {
  return this.eachBefore(function(t) {
    t.children && t.children.sort(e);
  });
}
function Ip(e) {
  for (var t = this, n = Rp(t, e), s = [t]; t !== n; )
    t = t.parent, s.push(t);
  for (var i = s.length; e !== n; )
    s.splice(i, 0, e), e = e.parent;
  return s;
}
function Rp(e, t) {
  if (e === t) return e;
  var n = e.ancestors(), s = t.ancestors(), i = null;
  for (e = n.pop(), t = s.pop(); e === t; )
    i = e, e = n.pop(), t = s.pop();
  return i;
}
function Lp() {
  for (var e = this, t = [e]; e = e.parent; )
    t.push(e);
  return t;
}
function Ep() {
  return Array.from(this);
}
function Op() {
  var e = [];
  return this.eachBefore(function(t) {
    t.children || e.push(t);
  }), e;
}
function zp() {
  var e = this, t = [];
  return e.each(function(n) {
    n !== e && t.push({ source: n.parent, target: n });
  }), t;
}
function* Fp() {
  var e = this, t, n = [e], s, i, r;
  do
    for (t = n.reverse(), n = []; e = t.pop(); )
      if (yield e, s = e.children)
        for (i = 0, r = s.length; i < r; ++i)
          n.push(s[i]);
  while (n.length);
}
function Ws(e, t) {
  e instanceof Map ? (e = [void 0, e], t === void 0 && (t = Vp)) : t === void 0 && (t = Hp);
  for (var n = new S0(e), s, i = [n], r, a, o, l; s = i.pop(); )
    if ((a = t(s.data)) && (l = (a = Array.from(a)).length))
      for (s.children = a, o = l - 1; o >= 0; --o)
        i.push(r = a[o] = new S0(a[o])), r.parent = s, r.depth = s.depth + 1;
  return n.eachBefore(jp);
}
function Bp() {
  return Ws(this).eachBefore(Wp);
}
function Hp(e) {
  return e.children;
}
function Vp(e) {
  return Array.isArray(e) ? e[1] : null;
}
function Wp(e) {
  e.data.value !== void 0 && (e.value = e.data.value), e.data = e.data.data;
}
function jp(e) {
  var t = 0;
  do
    e.height = t;
  while ((e = e.parent) && e.height < ++t);
}
function S0(e) {
  this.data = e, this.depth = this.height = 0, this.parent = null;
}
S0.prototype = Ws.prototype = {
  constructor: S0,
  count: Cp,
  each: Np,
  eachAfter: Tp,
  eachBefore: Pp,
  find: $p,
  sum: Ap,
  sort: Dp,
  path: Ip,
  ancestors: Lp,
  descendants: Ep,
  leaves: Op,
  links: zp,
  copy: Bp,
  [Symbol.iterator]: Fp
};
function Yp(e, t) {
  return e.parent === t.parent ? 1 : 2;
}
function jn(e) {
  var t = e.children;
  return t ? t[0] : e.t;
}
function Yn(e) {
  var t = e.children;
  return t ? t[t.length - 1] : e.t;
}
function Up(e, t, n) {
  var s = n / (t.i - e.i);
  t.c -= s, t.s += n, e.c += s, t.z += n, t.m += n;
}
function Xp(e) {
  for (var t = 0, n = 0, s = e.children, i = s.length, r; --i >= 0; )
    r = s[i], r.z += t, r.m += t, t += r.s + (n += r.c);
}
function Gp(e, t, n) {
  return e.a.parent === t.parent ? e.a : n;
}
function tn(e, t) {
  this._ = e, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = t;
}
tn.prototype = Object.create(S0.prototype);
function qp(e) {
  for (var t = new tn(e, 0), n, s = [t], i, r, a, o; n = s.pop(); )
    if (r = n._.children)
      for (n.children = new Array(o = r.length), a = o - 1; a >= 0; --a)
        s.push(i = n.children[a] = new tn(r[a], a)), i.parent = n;
  return (t.parent = new tn(null, 0)).children = [t], t;
}
function Zp() {
  var e = Yp, t = 1, n = 1, s = null;
  function i(c) {
    var h = qp(c);
    if (h.eachAfter(r), h.parent.m = -h.z, h.eachBefore(a), s) c.eachBefore(l);
    else {
      var d = c, u = c, g = c;
      c.eachBefore(function(_) {
        _.x < d.x && (d = _), _.x > u.x && (u = _), _.depth > g.depth && (g = _);
      });
      var p = d === u ? 1 : e(d, u) / 2, b = p - d.x, m = t / (u.x + p + b), y = n / (g.depth || 1);
      c.eachBefore(function(_) {
        _.x = (_.x + b) * m, _.y = _.depth * y;
      });
    }
    return c;
  }
  function r(c) {
    var h = c.children, d = c.parent.children, u = c.i ? d[c.i - 1] : null;
    if (h) {
      Xp(c);
      var g = (h[0].z + h[h.length - 1].z) / 2;
      u ? (c.z = u.z + e(c._, u._), c.m = c.z - g) : c.z = g;
    } else u && (c.z = u.z + e(c._, u._));
    c.parent.A = o(c, u, c.parent.A || d[0]);
  }
  function a(c) {
    c._.x = c.z + c.parent.m, c.m += c.parent.m;
  }
  function o(c, h, d) {
    if (h) {
      for (var u = c, g = c, p = h, b = u.parent.children[0], m = u.m, y = g.m, _ = p.m, x = b.m, w; p = Yn(p), u = jn(u), p && u; )
        b = jn(b), g = Yn(g), g.a = c, w = p.z + _ - u.z - m + e(p._, u._), w > 0 && (Up(Gp(p, c, d), c, w), m += w, y += w), _ += p.m, m += u.m, x += b.m, y += g.m;
      p && !Yn(g) && (g.t = p, g.m += _ - y), u && !jn(b) && (b.t = u, b.m += m - x, d = c);
    }
    return d;
  }
  function l(c) {
    c.x *= t, c.y = c.depth * n;
  }
  return i.separation = function(c) {
    return arguments.length ? (e = c, i) : e;
  }, i.size = function(c) {
    return arguments.length ? (s = !1, t = +c[0], n = +c[1], i) : s ? null : [t, n];
  }, i.nodeSize = function(c) {
    return arguments.length ? (s = !0, t = +c[0], n = +c[1], i) : s ? [t, n] : null;
  }, i;
}
function c0(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
c0.prototype = {
  constructor: c0,
  scale: function(e) {
    return e === 1 ? this : new c0(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new c0(this.k, this.x + this.k * e, this.y + this.k * t);
  },
  apply: function(e) {
    return [e[0] * this.k + this.x, e[1] * this.k + this.y];
  },
  applyX: function(e) {
    return e * this.k + this.x;
  },
  applyY: function(e) {
    return e * this.k + this.y;
  },
  invert: function(e) {
    return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
  },
  invertX: function(e) {
    return (e - this.x) / this.k;
  },
  invertY: function(e) {
    return (e - this.y) / this.k;
  },
  rescaleX: function(e) {
    return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
  },
  rescaleY: function(e) {
    return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
c0.prototype;
const _b = ({
  data: e,
  width: t = 1200,
  height: n = 800,
  margin: s = { top: 40, right: 150, bottom: 40, left: 200 },
  nodeColors: i = {
    root: "#023ad9",
    geolocation: "#023ad9",
    default: "#023ad9"
  },
  linkColor: r = "#023ad9",
  duration: a = 750,
  className: o = ""
}) => {
  const l = H(), c = H();
  return G(() => {
    if (!e) return;
    Y0(l.current).selectAll("*").remove();
    const h = t - s.left - s.right, d = n - s.top - s.bottom, g = Y0(l.current).attr("width", t).attr("height", n).append("g").attr("transform", `translate(${s.left},${s.top})`);
    let p = 0;
    const b = Zp().size([d, h]), m = Ws(e, (k) => k.children);
    m.x0 = d / 2, m.y0 = 0, m.children && m.children.forEach(y);
    function y(k) {
      k.children && (k._children = k.children, k._children.forEach(y), k.children = null);
    }
    function _(k, M) {
      k.each(function() {
        const S = Y0(this), N = S.text().split(/\s+/).reverse();
        let P, R = [], C = 0;
        const A = 1.1, T = S.attr("y"), O = parseFloat(S.attr("dy"));
        let D = S.text(null).append("tspan").attr("x", S.attr("x")).attr("y", T).attr("dy", O + "em");
        for (; P = N.pop(); )
          R.push(P), D.text(R.join(" ")), D.node().getComputedTextLength() > M && (R.pop(), D.text(R.join(" ")), R = [P], D = S.append("tspan").attr("x", S.attr("x")).attr("y", T).attr("dy", ++C * A + O + "em").text(P));
      });
    }
    function x(k) {
      const M = b(m), S = M.descendants(), N = M.descendants().slice(1);
      S.forEach((E) => {
        E.y = E.depth * 200;
      });
      const P = g.selectAll("g.node").data(S, (E) => E.id || (E.id = ++p)), R = P.enter().append("g").attr("class", "node").attr("transform", () => `translate(${k.y0},${k.x0})`).on("click", v);
      R.append("circle").attr("class", "node-circle").attr("r", 1e-6).style("fill", (E) => i[E.data.type] || i.default), R.append("text").attr("dy", ".35em").attr("x", (E) => E.children || E._children ? -15 : 15).attr("text-anchor", (E) => E.children || E._children ? "end" : "start").attr("class", (E) => E.data.type === "root" ? "main-title" : E.data.type === "geolocation" ? "geolocation-title" : "detail-text").text((E) => E.data.name).each(function(E) {
        (E.children || E._children) && Y0(this).call(_, 200);
      });
      const C = R.merge(P);
      C.transition().duration(a).attr("transform", (E) => `translate(${E.y},${E.x})`), C.select("circle.node-circle").attr("r", (E) => E.data.type === "root" ? 8 : E.data.type === "geolocation" ? 6 : 4).style("fill", (E) => i[E.data.type] || i.default).attr("cursor", "pointer");
      const A = P.exit().transition().duration(a).attr("transform", () => `translate(${k.y},${k.x})`).remove();
      A.select("circle").attr("r", 1e-6), A.select("text").style("fill-opacity", 1e-6);
      const T = g.selectAll("path.link").data(N, (E) => E.id);
      T.enter().insert("path", "g").attr("class", "link").attr("d", () => {
        const E = { x: k.x0, y: k.y0 };
        return w(E, E);
      }).merge(T).transition().duration(a).attr("d", (E) => w(E, E.parent)), T.exit().transition().duration(a).attr("d", () => {
        const E = { x: k.x, y: k.y };
        return w(E, E);
      }).remove(), S.forEach((E) => {
        E.x0 = E.x, E.y0 = E.y;
      });
    }
    function w(k, M) {
      return `M ${k.y} ${k.x}
              C ${(k.y + M.y) / 2} ${k.x},
                ${(k.y + M.y) / 2} ${M.x},
                ${M.y} ${M.x}`;
    }
    function v(k, M) {
      M.children ? (M._children = M.children, M.children = null) : (M.children = M._children, M._children = null), x(M);
    }
    x(m);
  }, [e, t, n, s, i, r, a]), /* @__PURE__ */ f("div", { className: `tree-container ${o}`, ref: c, children: /* @__PURE__ */ f("svg", { ref: l }) });
};
class Kp {
  constructor() {
    this.nodes = {}, this.length = 1;
  }
  getLength() {
    return this.length;
  }
  insert(t) {
    let n = this.nodes;
    t = t.split("").map((r) => r.toUpperCase());
    let s = 0, i = !1;
    for (; s < t.length; )
      n[t[s]] || (i = !0, n[t[s]] = {}), n = n[t[s]], s === t.length - 1 && (n.end = !0), s++;
    i && this.length++;
  }
  delete(t) {
    let n = this.search(t);
    if (!n) return !1;
    if (n.result.end && delete n.result.end, n.lastEnd) {
      const s = n.lastEnd.key;
      delete n.lastEnd.node[s];
    }
    return this.length--, !0;
  }
  search(t) {
    t = t.split("").map((i) => i.toUpperCase());
    let n = this.nodes, s = null;
    for (let i = 0; i < t.length; i++)
      if (n[t[i]])
        n = n[t[i]], Object.keys(n).length > 1 && i !== t.length - 1 && (s = { node: n, key: t[i + 1] });
      else
        return !1;
    return n.end ? { result: n, lastEnd: s } : !1;
  }
  find(t) {
    return !!this.search(t);
  }
  getNode(t) {
    t = t.split("").map((s) => s.toUpperCase());
    let n = this.nodes;
    for (let s = 0; s < t.length; s++)
      if (n[t[s]])
        n = n[t[s]];
      else
        return !1;
    return n;
  }
  printWords() {
    let t = [];
    return this._recursePrint(this.nodes, "", t), t;
  }
  _recursePrint(t, n, s) {
    let i = Object.keys(t);
    for (let r = 0; r < i.length; r++)
      i[r] === "end" ? s.push(n) : this._recursePrint(t[i[r]], n + i[r], s);
  }
  wildcardFind(t) {
    t = t.replace(/[^a-z*]/gi, "").split("").map((i) => i.toUpperCase());
    let n = [];
    return this._wildcardRecursePrint(this.nodes, "", n, t), n;
  }
  _wildcardRecursePrint(t, n, s, i) {
    let r = n.length;
    if (n.length > i.length) return !1;
    Object.keys(t).includes("end") && n.length === i.length && s.push(n);
    let a = i[r] === "*" ? Object.keys(t) : [i[r]];
    for (let o = 0; o < a.length; o++)
      t[a[o]] && a[o] !== "end" && this._wildcardRecursePrint(t[a[o]], n + a[o], s, i);
  }
  prefixFind(t, n = null) {
    let s = [];
    t = t.replace(/[^a-z]/gi, "").toUpperCase();
    let i = this.getNode(t);
    return i && this._prefixRecursePrint(i, t, s, t, n), s;
  }
  _prefixRecursePrint(t, n, s, i, r) {
    if (r && n.length > r) return !1;
    Object.keys(t).includes("end") && (r ? n.length === r && s.push(n) : s.push(n));
    let a = Object.keys(t).filter((o) => o !== "end");
    for (let o = 0; o < a.length; o++)
      this._prefixRecursePrint(t[a[o]], n + a[o], s, i, r);
  }
}
const wb = ({
  data: e = [],
  placeholder: t = "Enter word to search",
  maxResults: n = 50,
  showStats: s = !0,
  searchMode: i = "prefix",
  // 'prefix', 'wildcard', 'exact'
  onResultSelect: r = null,
  className: a = "",
  debounceMs: o = 100,
  caseSensitive: l = !1,
  theme: c = "search-light",
  // 'search-light' or 'search-dark'
  color: h = "#e33de0"
  // Accent color for focus and bar
}) => {
  const [d] = X(() => new Kp()), [u, g] = X(""), [p, b] = X([]), [m, y] = X({ totalWords: 0, searchTime: 0, avgSearchTime: 0 }), [_, x] = X(!1), w = H([]), v = H(null);
  G(() => {
    if (e.length > 0) {
      const P = performance.now();
      e.forEach((C) => {
        typeof C == "string" && C.trim() && d.insert(C.trim());
      });
      const R = performance.now();
      y((C) => ({
        ...C,
        totalWords: d.getLength(),
        initTime: R - P
      })), x(!0);
    }
  }, [e, d]);
  const k = (P) => {
    if (!P.trim()) {
      b([]);
      return;
    }
    const R = performance.now();
    let C = [];
    switch (i) {
      case "wildcard":
        C = d.wildcardFind(P);
        break;
      case "exact":
        C = d.find(P) ? [P.toUpperCase()] : [];
        break;
      case "prefix":
      default:
        C = d.prefixFind(P);
        break;
    }
    const T = performance.now() - R;
    T > 0 && C.length > 0 && (w.current.push(T / C.length), w.current.length > 100 && (w.current = w.current.slice(-50)));
    const O = w.current.length > 0 ? w.current.reduce((D, E) => D + E, 0) / w.current.length : 0;
    b(C.slice(0, n)), y((D) => ({
      ...D,
      searchTime: T,
      avgSearchTime: O,
      resultCount: C.length
    }));
  }, M = (P) => {
    const R = P.target.value;
    g(R), v.current && clearTimeout(v.current), v.current = setTimeout(() => {
      k(R);
    }, o);
  }, S = (P) => {
    r && r(P), g(P);
  }, N = () => {
    g(""), b([]), y((P) => ({ ...P, searchTime: 0, resultCount: 0 }));
  };
  return /* @__PURE__ */ I(
    "div",
    {
      className: `trie-search-container ${c} ${a}`,
      style: {
        "--trie-accent-color": h,
        "--trie-accent-color-light": `${h}1a`
        // 10% opacity
      },
      children: [
        /* @__PURE__ */ I("div", { className: "trie-search-input-wrapper", children: [
          /* @__PURE__ */ f(
            "input",
            {
              type: "text",
              value: u,
              onChange: M,
              placeholder: t,
              className: "trie-search-input"
            }
          ),
          u && /* @__PURE__ */ f(
            "button",
            {
              onClick: N,
              className: "trie-search-clear",
              "aria-label": "Clear search",
              children: "×"
            }
          )
        ] }),
        s && _ && /* @__PURE__ */ f("div", { className: "trie-search-stats", children: m.resultCount !== void 0 ? /* @__PURE__ */ I(kt, { children: [
          "Found ",
          m.resultCount,
          " words in ",
          m.searchTime.toFixed(2),
          " ms",
          w.current.length > 0 && /* @__PURE__ */ I(kt, { children: [
            " (avg: ",
            m.avgSearchTime.toFixed(3),
            " ms/word)"
          ] })
        ] }) : `Loaded ${m.totalWords} words in ${m.initTime?.toFixed(2)} ms` }),
        /* @__PURE__ */ f("div", { className: "trie-search-results", children: p.length > 0 ? p.map((P, R) => /* @__PURE__ */ f(
          "div",
          {
            className: "trie-search-result-item",
            onClick: () => S(P),
            children: l ? P : P.toLowerCase()
          },
          `${P}-${R}`
        )) : u && _ && /* @__PURE__ */ I("div", { className: "trie-search-no-results", children: [
          'No results found for "',
          u,
          '"'
        ] }) })
      ]
    }
  );
}, Xe = ({
  children: e,
  variant: t = "fadeInUp",
  fontSize: n = 48,
  color: s = "#FFFFFF",
  duration: i = 500,
  stagger: r = 80,
  trigger: a = "mount",
  // 'mount', 'hover', 'click', 'manual'
  className: o = "",
  style: l = {},
  ...c
}) => {
  const h = H(null), [d, u] = X(!1), [g, p] = X(!1), [b, m] = X(e), y = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*&%$#@!", _ = () => y[Math.floor(Math.random() * y.length)], x = () => {
    if (d || !h.current) return;
    u(!0);
    const k = h.current, M = typeof e == "string" ? e : k.textContent;
    k.innerHTML = "";
    const S = M.split("");
    S.forEach((P, R) => {
      const C = document.createElement("span");
      C.textContent = P, C.className = "typography-char", P === " " && (C.innerHTML = "&nbsp;"), C.style.opacity = "0", C.style.display = "inline-block", k.appendChild(C);
      const A = R * r;
      switch (t) {
        case "fadeInUp":
          C.animate([
            { opacity: 0, transform: `translateY(${n * 0.5}px)` },
            { opacity: 1, transform: "translateY(0px)" }
          ], {
            duration: i,
            delay: A,
            fill: "forwards",
            easing: "ease-out"
          }).addEventListener("finish", () => {
            C.style.opacity = "1", C.style.transform = "translateY(0px)";
          });
          break;
        case "flyInLeft":
          C.animate([
            { opacity: 0, transform: `translateX(-${n * 0.75}px)` },
            { opacity: 1, transform: "translateX(0px)" }
          ], {
            duration: i,
            delay: A,
            fill: "forwards",
            easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          }).addEventListener("finish", () => {
            C.style.opacity = "1", C.style.transform = "translateX(0px)";
          });
          break;
        case "flyInRight":
          C.animate([
            { opacity: 0, transform: `translateX(${n * 0.75}px)` },
            { opacity: 1, transform: "translateX(0px)" }
          ], {
            duration: i,
            delay: A,
            fill: "forwards",
            easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          }).addEventListener("finish", () => {
            C.style.opacity = "1", C.style.transform = "translateX(0px)";
          });
          break;
        case "decoder":
          C.style.opacity = "1";
          let T = 0;
          const O = Math.max(5, Math.floor(i / 80)), D = i / O / 1.5;
          setTimeout(() => {
            const E = setInterval(() => {
              C.textContent = _(), T++, T >= O && (clearInterval(E), C.textContent = P === " " ? " " : P, C.style.opacity = "1");
            }, D);
          }, A);
          break;
        case "typewriter":
          C.animate([
            { opacity: 0 },
            { opacity: 1 }
          ], {
            duration: 50,
            delay: A,
            fill: "forwards",
            easing: "step-start"
          }).addEventListener("finish", () => {
            C.style.opacity = "1";
          });
          break;
        case "zoomIn":
          C.animate([
            { opacity: 0, transform: "scale(0.5)" },
            { opacity: 1, transform: "scale(1)" }
          ], {
            duration: i,
            delay: A,
            fill: "forwards",
            easing: "ease-out"
          }).addEventListener("finish", () => {
            C.style.opacity = "1", C.style.transform = "scale(1)";
          });
          break;
        case "rotateIn":
          C.animate([
            { opacity: 0, transform: "rotate(180deg) scale(0.5)" },
            { opacity: 1, transform: "rotate(0deg) scale(1)" }
          ], {
            duration: i,
            delay: A,
            fill: "forwards",
            easing: "ease-out"
          }).addEventListener("finish", () => {
            C.style.opacity = "1", C.style.transform = "rotate(0deg) scale(1)";
          });
          break;
        case "fadeInDown":
          C.animate([
            { opacity: 0, transform: `translateY(-${n * 0.5}px)` },
            { opacity: 1, transform: "translateY(0px)" }
          ], {
            duration: i,
            delay: A,
            fill: "forwards",
            easing: "ease-out"
          }).addEventListener("finish", () => {
            C.style.opacity = "1", C.style.transform = "translateY(0px)";
          });
          break;
      }
    });
    const N = (S.length - 1) * r + i;
    setTimeout(() => {
      u(!1), p(!0), m(M), h.current && h.current.querySelectorAll(".typography-char").forEach((R) => {
        R.style.opacity = "1";
      });
    }, N + 100);
  };
  G(() => {
    p(!1), m(e), a === "mount" && setTimeout(() => {
      x();
    }, 50);
  }, [e]);
  const w = () => {
    (a === "click" || a === "hover") && (p(!1), x());
  }, v = {
    ref: h,
    className: `typography-container ${o}`,
    style: {
      fontSize: `${n}px`,
      color: s,
      minHeight: `${n * 1.2}px`,
      // Prevent layout shift
      display: "inline-block",
      ...l
    },
    ...c
  };
  return a === "click" ? (v.onClick = w, v.style.cursor = "pointer") : a === "hover" && (v.onMouseEnter = w), /* @__PURE__ */ f("span", { ...v, children: !g && a === "manual" ? e : "" });
}, kb = (e) => /* @__PURE__ */ f(Xe, { variant: "fadeInUp", fontSize: 48, ...e }), Mb = (e) => /* @__PURE__ */ f(Xe, { variant: "flyInLeft", fontSize: 36, ...e }), Sb = (e) => /* @__PURE__ */ f(Xe, { variant: "decoder", fontSize: 32, ...e }), Cb = (e) => /* @__PURE__ */ f(Xe, { variant: "typewriter", fontSize: 28, ...e }), Nb = (e) => /* @__PURE__ */ f(Xe, { variant: "zoomIn", fontSize: 24, ...e }), Pb = (e) => /* @__PURE__ */ f(Xe, { variant: "rotateIn", fontSize: 20, ...e }), Tb = ({
  children: e,
  colors: t = ["#ee7752", "#e73c7e", "#23a6d5", "#23d5ab"],
  angle: n = "-45deg",
  animationDuration: s = "15s",
  className: i = ""
}) => {
  const r = {
    background: `linear-gradient(${n}, ${t.join(", ")})`,
    backgroundSize: "400% 400%",
    animation: `gradient ${s} ease infinite`
  };
  return /* @__PURE__ */ f("div", { className: `gradient-background ${i}`, style: r, children: e });
}, $b = ({
  className: e = "",
  children: t,
  backgroundColor: n = "#19355d",
  gridColor: s = "rgba(55,89,138,0.2)",
  spotlightSize: i = "100vh",
  spotlightColor: r = "rgba(55,89,138,0.2)"
}) => {
  const a = H(null), [o, l] = X({ x: 0, y: 0 });
  G(() => {
    const x = (w) => {
      if (a.current) {
        const v = a.current.getBoundingClientRect(), k = ((w.clientX - v.left) / v.width - 0.5) * 2, M = ((w.clientY - v.top) / v.height - 0.5) * 2;
        l({ x: k, y: M });
      }
    };
    return window.addEventListener("mousemove", x), () => {
      window.removeEventListener("mousemove", x);
    };
  }, []);
  const c = (x, w) => {
    const v = parseInt(x.replace("#", ""), 16), k = Math.round(2.55 * w), M = (v >> 16) + k, S = (v >> 8 & 255) + k, N = (v & 255) + k;
    return "#" + (16777216 + (M < 255 ? M < 1 ? 0 : M : 255) * 65536 + (S < 255 ? S < 1 ? 0 : S : 255) * 256 + (N < 255 ? N < 1 ? 0 : N : 255)).toString(16).slice(1);
  }, h = (x, w) => {
    const v = parseInt(x.replace("#", ""), 16), k = v >> 16 & 255, M = v >> 8 & 255, S = v & 255;
    return `rgba(${k}, ${M}, ${S}, ${w})`;
  }, d = n, u = c(d, 20), g = c(d, 40), p = {
    transform: `translate(${o.x * 15}vh, ${o.y * 10}vh)`
  }, b = {
    transform: `rotate(${-o.x * 10}deg) scaleY(${1 + Math.abs(o.y) * 0.1}) translateY(${o.y * 2}vh)`
  }, m = {
    backgroundImage: `linear-gradient(#000000, ${d} 90%, ${d})`
  }, y = {
    ...p,
    backgroundImage: `radial-gradient(ellipse closest-side at 50% 82%, ${g}, ${h(g, 0)} 100%)`,
    transition: "none"
  }, _ = {
    backgroundImage: `radial-gradient(ellipse, ${h(u, 0.5)}, ${h(u, 0.2)} 25%, ${h(u, 0)} 50%)`,
    transition: "none"
  };
  return /* @__PURE__ */ I(
    "div",
    {
      ref: a,
      className: `spotlight-wrapper ${e}`,
      style: {
        "--grid-color": s,
        "--spotlight-size": i,
        "--spotlight-color": r
      },
      children: [
        /* @__PURE__ */ f("div", { className: "spotlight-backdrop", style: m }),
        /* @__PURE__ */ f("div", { className: "spotlight-stage-highlight", style: y }),
        /* @__PURE__ */ I("div", { className: "spotlight-swivel", style: b, children: [
          /* @__PURE__ */ f("div", { className: "spotlight-lamp", style: _ }),
          /* @__PURE__ */ f("div", { className: "spotlight-beam" })
        ] }),
        t && /* @__PURE__ */ f("div", { className: "spotlight-content", children: t })
      ]
    }
  );
};
function Jp(e, t, n, s, i, r, a, o, l) {
  const c = e + l * (n - e), h = t + l * (s - t), d = n + l * (i - n), u = s + l * (r - s), g = i + l * (a - i), p = r + l * (o - r), b = c + l * (d - c), m = h + l * (u - h), y = d + l * (g - d), _ = u + l * (p - u), x = b + l * (y - b), w = m + l * (_ - m);
  return { x, y: w };
}
const n0 = {
  CURVE_POINTS: 10,
  CURVE_POINT_X_JITTER: 1.5,
  CURVE_POINT_Y_JITTER: 3.5,
  CURVE_POINT_MAX_FLOAT_X_DIST: 270,
  CURVE_POINT_MAX_FLOAT_Y_DIST: 80,
  CURVE_POINT_MIN_FLOAT_DIST: 15,
  CURVE_POINT_MAX_FLOAT_TIME: 9e3,
  CURVE_POINT_MIN_FLOAT_TIME: 3e3,
  BRUSH_COUNT: 1e3,
  BRUSH_WIDTH: 30,
  BRUSH_HEIGHT: 450,
  BRUSH_MIN_SCALE_Y: 0.02,
  BRUSH_MAX_SCALE_Y_VARIANCE: 0.5,
  BRUSH_MAX_ALPHA_VARIANCE: 0.7,
  BRUSH_MAX_ANIM_TIME: 7e3,
  BRUSH_MIN_ANIM_TIME: 1500,
  BRUSH_MAX_Z_ANIM_TIME: 8e4,
  BRUSH_MIN_Z_ANIM_TIME: 58e3,
  BRUSH_ALPHA_DROPOFF: 0.07,
  MOUSE_X_OFFSET: 50,
  MOUSE_Y_OFFSET: 25
};
class Un {
  constructor(t, n, s, i, r) {
    this.x = t, this.y = n, this.z = s, this.cpLength = i, this.cpYOffset = Math.random() * i - i, this.config = r, this.xAnimTime = Math.random() * (r.CURVE_POINT_MAX_FLOAT_TIME - r.CURVE_POINT_MIN_FLOAT_TIME) + r.CURVE_POINT_MIN_FLOAT_TIME, this.xVariance = Math.max(
      Math.random() * this.z * r.CURVE_POINT_MAX_FLOAT_X_DIST,
      r.CURVE_POINT_MIN_FLOAT_DIST
    ), this.xMin = this.x - this.xVariance / 2, this.xAnimOffset = Math.random() * Math.PI, this.yAnimTime = Math.random() * (r.CURVE_POINT_MAX_FLOAT_TIME - r.CURVE_POINT_MIN_FLOAT_TIME) + r.CURVE_POINT_MIN_FLOAT_TIME, this.yVariance = Math.max(
      Math.random() * this.z * r.CURVE_POINT_MAX_FLOAT_Y_DIST,
      r.CURVE_POINT_MIN_FLOAT_DIST
    ), this.yMin = this.y - this.yVariance / 2, this.yAnimOffset = Math.random() * Math.PI, this.startTime = null;
  }
  getCps() {
    return [
      {
        x: this.x - this.cpLength,
        y: this.y - this.cpYOffset
      },
      {
        x: this.x + this.cpLength,
        y: this.y + this.cpYOffset
      }
    ];
  }
  updatePosition(t, n) {
    this.startTime || (this.startTime = Date.now());
    const i = Date.now() - this.startTime;
    this.x = this.xMin + (Math.sin(i / this.xAnimTime * Math.PI + this.xAnimOffset) * 0.5 + 0.5) * this.xVariance, this.x += this.z * (1 - t * 2) * this.config.MOUSE_X_OFFSET, this.y = this.yMin + (Math.sin(i / this.yAnimTime * Math.PI + this.yAnimOffset) * 0.5 + 0.5) * this.yVariance, this.y += this.z * (1 - n * 2) * this.config.MOUSE_Y_OFFSET;
  }
}
class Qp {
  constructor(t, n, s, i, r) {
    this.curve = t, this.z = n, this.alpha = n * Math.random() * 0.55 + 0.15, this.scaleYMod = (1 - r.BRUSH_MIN_SCALE_Y) * Math.random(), this.scaleXMod = 0.5 * Math.random() * (2 - this.scaleYMod * 2), this.noScale = !!i, this.color1 = s || "rgb(50, 170, 82)", this.config = r, this.scaleY = this.scaleYMod, this.alphaAnimTime = Math.random() * (r.BRUSH_MAX_ANIM_TIME - r.BRUSH_MIN_ANIM_TIME) + r.BRUSH_MIN_ANIM_TIME, this.alphaVariance = Math.max(Math.random() * r.BRUSH_MAX_ALPHA_VARIANCE, this.alpha), this.alphaMin = Math.max(this.alpha - this.alphaVariance / 2, 0), this.alphaAnimOffset = Math.random() * Math.PI, this.scaleYAnimTime = Math.random() * (r.BRUSH_MAX_ANIM_TIME - r.BRUSH_MIN_ANIM_TIME) + r.BRUSH_MIN_ANIM_TIME, this.scaleYVariance = Math.random() * r.BRUSH_MAX_SCALE_Y_VARIANCE, this.scaleYMin = this.scaleY - this.scaleYVariance / 2, this.scaleYAnimOffset = Math.random() * Math.PI, this.zAnimOffset = this.curve.vanishingPoint.z - (n - this.curve.vanishingPoint.z), this.zAnimTime = Math.random() * (r.BRUSH_MAX_Z_ANIM_TIME - r.BRUSH_MIN_Z_ANIM_TIME) + r.BRUSH_MIN_Z_ANIM_TIME, this.noScale && (this.alphaMin = 0, this.alphaVariance = 1), this.startTime = null;
  }
  draw(t) {
    if (this.z < this.curve.vanishingPoint.z || this.z > this.curve.endPoint.z) return !1;
    const n = this.curve.getPointAtZ(this.z);
    let s = (0.5 + 0.5 * Math.min(this.z, 1)) * this.alpha * this.curve.maxBrushAlpha;
    this.z - this.curve.vanishingPoint.z < this.config.BRUSH_ALPHA_DROPOFF ? s *= (this.z - this.curve.vanishingPoint.z) / this.config.BRUSH_ALPHA_DROPOFF : this.curve.endPoint.z - this.z < this.config.BRUSH_ALPHA_DROPOFF && (s *= (this.curve.endPoint.z - this.z) / this.config.BRUSH_ALPHA_DROPOFF);
    let i, r;
    this.noScale ? (i = this.scaleYMod + this.config.BRUSH_MIN_SCALE_Y, r = this.scaleXMod + 0.5) : (i = this.z * this.scaleYMod + this.config.BRUSH_MIN_SCALE_Y, r = this.z * this.scaleXMod + 0.5), t.fillStyle = this.color1, t.globalAlpha = s, t.beginPath(), t.moveTo(n.x, n.y - i * this.config.BRUSH_HEIGHT), t.quadraticCurveTo(
      n.x + r * this.config.BRUSH_WIDTH / 2,
      n.y - i * this.config.BRUSH_HEIGHT,
      n.x + r * this.config.BRUSH_WIDTH / 2,
      n.y
    ), t.quadraticCurveTo(
      n.x + r * this.config.BRUSH_WIDTH / 2,
      n.y + i * this.config.BRUSH_WIDTH,
      n.x,
      n.y + r * this.config.BRUSH_WIDTH / 2
    ), t.quadraticCurveTo(
      n.x - r * this.config.BRUSH_WIDTH / 2,
      n.y + i * this.config.BRUSH_WIDTH,
      n.x - r * this.config.BRUSH_WIDTH / 2,
      n.y
    ), t.quadraticCurveTo(
      n.x - r * this.config.BRUSH_WIDTH / 2,
      n.y - i * this.config.BRUSH_HEIGHT,
      n.x,
      n.y - i * this.config.BRUSH_HEIGHT
    ), t.fill();
  }
  updatePosition() {
    this.startTime || (this.startTime = Date.now() - 2e4);
    const t = Date.now(), n = t - this.startTime;
    this.alpha = Math.min(
      this.alphaMin + (Math.sin(n / this.alphaAnimTime * Math.PI + this.alphaAnimOffset) * 0.5 + 0.5) * this.alphaVariance,
      1
    ), this.scaleY = this.scaleYMin + (Math.sin(n / this.scaleYAnimTime * Math.PI + this.scaleYAnimOffset) * 0.5 + 0.5) * this.scaleYVariance, this.z = (n / this.zAnimTime + this.zAnimOffset) * this.curve.endPoint.z, this.z > this.curve.vanishingPoint.z && (this.z *= this.z), this.z > this.curve.endPoint.z && (this.z = this.z - this.curve.endPoint.z + this.curve.vanishingPoint.z, this.startTime = t);
  }
}
class Xn {
  constructor(t, n, s, i, r, a, o, l, c, h) {
    this.vanishingPoint = { x: t, y: n, z: s }, this.endPoint = { x: i, y: r, z: a }, this.brushCount = o || h.BRUSH_COUNT, this.maxBrushAlpha = l || 1, this.config = h, this.points = [new Un(this.vanishingPoint.x, this.vanishingPoint.y, this.vanishingPoint.z, 0, h)];
    for (let d = 0; d < h.CURVE_POINTS - 1; d++) {
      const u = ((d + 1) / h.CURVE_POINTS) ** 2, g = Math.random() * h.CURVE_POINT_X_JITTER - h.CURVE_POINT_X_JITTER / 2;
      let p = this.vanishingPoint.x + u * (this.endPoint.x - this.vanishingPoint.x);
      p += g * (p - this.points[d].x);
      const b = (1.2 - u) * (Math.random() * h.CURVE_POINT_Y_JITTER - h.CURVE_POINT_Y_JITTER / 2);
      let m = this.vanishingPoint.y + u * (this.endPoint.y - this.vanishingPoint.y);
      m += b * (m - this.points[d].y);
      const y = u * (this.endPoint.z - this.vanishingPoint.z) + this.vanishingPoint.z;
      this.points.push(
        new Un(
          p,
          m,
          y,
          (Math.random() * 0.33 + 0.33) * (p - this.points[d].x),
          h
        )
      );
    }
    this.points.push(
      new Un(this.endPoint.x, this.endPoint.y, this.endPoint.z, 0, h)
    ), this.brushes = [];
    for (let d = 0; d < this.brushCount; d++) {
      const u = Math.random() < 0.01;
      this.brushes.push(
        new Qp(
          this,
          d / this.brushCount * (this.endPoint.z - this.vanishingPoint.z) + this.vanishingPoint.z,
          u ? "rgb(200, 200, 220)" : c || null,
          u,
          h
        )
      );
    }
  }
  getPointAtZ(t) {
    if (t <= this.points[0].z)
      return this.points[0];
    if (t >= this.points[this.points.length - 1].z)
      return this.points[this.points.length - 1];
    {
      let n = 0;
      for (let l = this.points.length; n < l && !(t <= this.points[n].z); n++)
        ;
      const s = this.points[n - 1], i = s.getCps(), r = this.points[n], a = r.getCps(), o = (t - s.z) / (r.z - s.z);
      return Jp(
        s.x,
        s.y,
        i[1].x,
        i[1].y,
        a[0].x,
        a[0].y,
        r.x,
        r.y,
        o
      );
    }
  }
  update(t, n) {
    for (let s = 0; s < this.points.length; s++)
      this.points[s].updatePosition(t, n);
    for (let s = 0; s < this.brushes.length; s++)
      this.brushes[s].updatePosition();
  }
  draw(t) {
    for (let n = 0; n < this.brushes.length; n++)
      this.brushes[n].draw(t);
  }
}
function t1(e, t, n, s, i, r) {
  const a = e.createLinearGradient(t, n, s, i);
  return a.addColorStop(0.4, `hsl(${r}, 45%, 35%)`), a.addColorStop(0.6, `hsla(${r + 20}, 10%, 43%, 0.5)`), a;
}
function e1(e, t, n, s, i, r) {
  const a = e.createLinearGradient(t, n, s, i);
  return a.addColorStop(0.35, `hsl(${r + 10}, 45%, 35%)`), a.addColorStop(0.7, `hsla(${r - 10}, 30%, 30%, 0.7)`), a;
}
const Ab = ({ children: e, backgroundColor: t = "#18283d", hue: n = 160, className: s = "" }) => {
  const i = H(null), r = H(null), a = H(0.5), o = H(0.5), l = H([]), c = H(null);
  return G(() => {
    if (!i.current) return;
    const h = window.innerWidth, d = window.innerHeight, u = document.createElement("canvas");
    u.width = h, u.height = d;
    const g = u.getContext("2d");
    g.globalCompositeOperation = "color-dodge", r.current = u, u.style.position = "absolute", u.style.top = "0", u.style.left = "0", u.style.display = "block", u.style.filter = `blur(6px) drop-shadow(0 0 30px hsl(${n}, 55%, 60%))`, u.style.transformOrigin = "0 100%", u.style.transform = "skewX(-20deg)", u.style.animation = "fadein 6s 1", u.style.zIndex = "1", u.style.pointerEvents = "none", i.current.insertBefore(u, i.current.firstChild);
    const b = document.createElement("canvas").getContext("2d"), m = t1(b, h * 0.5, d, h * 0.35, 0, n), y = e1(b, h * 0.5, d * 0.5, h * 0.3, 0, n), _ = [
      new Xn(
        h * 0.17,
        d * 0.94,
        0.01,
        h * 0.8,
        d * 0.8,
        0.8,
        n0.BRUSH_COUNT * 0.3,
        0.4,
        `hsl(${n}, 50%, 41%)`,
        n0
      ),
      new Xn(
        h * 0.1,
        d * 0.9,
        0.05,
        h * 0.8,
        d * 0.4,
        1,
        null,
        0.8,
        m,
        n0
      ),
      new Xn(
        h * 0.25,
        d * 0.65,
        0.33,
        h * 0.55,
        0,
        1.1,
        n0.BRUSH_COUNT * 0.6,
        1,
        y,
        n0
      )
    ];
    l.current = _;
    const x = (k) => {
      a.current = k.clientX / h, o.current = k.clientY / d;
    };
    window.addEventListener("mousemove", x);
    const w = () => {
      g.clearRect(0, 0, h, d);
      for (let k = 0; k < _.length; k++)
        _[k].update(a.current, o.current), _[k].draw(g);
      c.current = requestAnimationFrame(w);
    };
    w();
    const v = () => {
      u.width = window.innerWidth, u.height = window.innerHeight;
    };
    return window.addEventListener("resize", v), () => {
      window.removeEventListener("mousemove", x), window.removeEventListener("resize", v), c.current && cancelAnimationFrame(c.current), r.current && i.current && i.current.removeChild(r.current);
    };
  }, [n]), /* @__PURE__ */ f("div", { style: { background: `${t} center center no-repeat` }, className: `aurora-background  ${s}`, ref: i, children: /* @__PURE__ */ f("div", { className: "aurora-background-content", children: e }) });
}, Db = ({ children: e, className: t = "" }) => /* @__PURE__ */ I("div", { className: `cosmic-background-container ${t}`, children: [
  /* @__PURE__ */ f("div", { id: "stars" }),
  /* @__PURE__ */ f("div", { id: "stars2" }),
  /* @__PURE__ */ f("div", { id: "stars3" }),
  /* @__PURE__ */ f("div", { id: "blue-stars" }),
  /* @__PURE__ */ f("div", { id: "red-stars" }),
  /* @__PURE__ */ f("div", { id: "green-stars" }),
  /* @__PURE__ */ f("div", { id: "yellow-stars" }),
  /* @__PURE__ */ f("div", { id: "purple-stars" }),
  /* @__PURE__ */ f("div", { id: "orange-stars" }),
  /* @__PURE__ */ f("div", { className: "nebula nebula-1" }),
  /* @__PURE__ */ f("div", { className: "nebula nebula-2" }),
  /* @__PURE__ */ f("div", { className: "nebula nebula-3" }),
  /* @__PURE__ */ f("div", { className: "nebula nebula-4" }),
  /* @__PURE__ */ f("div", { className: "cosmic-content", children: e })
] }), Ib = ({ children: e, className: t = "" }) => /* @__PURE__ */ I("article", { id: "wrap", className: `halo-wrap ${t}`, children: [
  /* @__PURE__ */ f("article", { id: "lightings", className: "halo-lightings", children: /* @__PURE__ */ f("section", { id: "one", className: "halo-section halo-one", children: /* @__PURE__ */ f("section", { id: "two", className: "halo-section halo-two", children: /* @__PURE__ */ f("section", { id: "three", className: "halo-section halo-three", children: /* @__PURE__ */ f("section", { id: "four", className: "halo-section halo-four", children: /* @__PURE__ */ f("section", { id: "five", className: "halo-section halo-five" }) }) }) }) }) }),
  /* @__PURE__ */ f("div", { className: "halo-content", children: e })
] }), Rb = ({
  children: e,
  className: t = "",
  animationChance: n = 0.02
}) => {
  const s = H(null), i = H(null), r = h0(() => [
    "four-seconds-green",
    "five-seconds-green",
    "six-seconds-green",
    "seven-seconds-green"
  ], []), a = () => Math.random() < 0.15 ? Math.random() < 0.5 ? "0" : "1" : "", o = () => {
    if (!i.current) return;
    i.current.innerHTML = "";
    const l = s.current.getBoundingClientRect(), c = 24, h = 14, d = Math.max(l.width, 320), u = Math.max(l.height, 480), g = Math.max(1, Math.floor(d / h)), p = Math.max(1, Math.floor(u / c));
    i.current.style.gridTemplateColumns = `repeat(${g}, 1fr)`, i.current.style.gridTemplateRows = `repeat(${p}, ${c}px)`;
    const b = document.createDocumentFragment(), m = r.length;
    for (let y = 0; y < g * p; y++) {
      const _ = document.createElement("span");
      if (Math.random() < n) {
        const w = Math.floor(Math.random() * m);
        _.className = `matrix-char ${r[w]}`;
      } else
        _.className = "matrix-char";
      const x = a();
      x && (_.textContent = x), b.appendChild(_);
    }
    i.current.appendChild(b);
  };
  return G(() => {
    let l;
    const c = () => {
      clearTimeout(l), l = setTimeout(() => {
        o();
      }, 300);
    };
    return o(), window.addEventListener("resize", c), () => {
      clearTimeout(l), window.removeEventListener("resize", c);
    };
  }, [n, r]), /* @__PURE__ */ I(
    "div",
    {
      ref: s,
      className: `matrix-container ${t}`,
      children: [
        /* @__PURE__ */ f("div", { ref: i, className: "matrix-grid" }),
        /* @__PURE__ */ f("div", { className: "matrix-content", children: e })
      ]
    }
  );
};
class n1 {
  constructor(t = 0) {
    this.grad3 = [
      [1, 1, 0],
      [-1, 1, 0],
      [1, -1, 0],
      [-1, -1, 0],
      [1, 0, 1],
      [-1, 0, 1],
      [1, 0, -1],
      [-1, 0, -1],
      [0, 1, 1],
      [0, -1, 1],
      [0, 1, -1],
      [0, -1, -1]
    ], this.p = [];
    for (let n = 0; n < 256; n++)
      this.p[n] = n;
    for (let n = 255; n > 0; n--) {
      const s = Math.floor(((t + n) * 9301 + 49297) % 233280 / 233280 * (n + 1));
      [this.p[n], this.p[s]] = [this.p[s], this.p[n]];
    }
    this.perm = [];
    for (let n = 0; n < 512; n++)
      this.perm[n] = this.p[n & 255];
  }
  dot(t, n, s, i) {
    return t[0] * n + t[1] * s + t[2] * i;
  }
  simplex3(t, n, s) {
    const i = 0.3333333333333333, r = 1 / 6;
    let a = (t + n + s) * i, o = Math.floor(t + a), l = Math.floor(n + a), c = Math.floor(s + a), h = (o + l + c) * r, d = o - h, u = l - h, g = c - h, p = t - d, b = n - u, m = s - g, y, _, x, w, v, k;
    p >= b ? b >= m ? (y = 1, _ = 0, x = 0, w = 1, v = 1, k = 0) : p >= m ? (y = 1, _ = 0, x = 0, w = 1, v = 0, k = 1) : (y = 0, _ = 0, x = 1, w = 1, v = 0, k = 1) : b < m ? (y = 0, _ = 0, x = 1, w = 0, v = 1, k = 1) : p < m ? (y = 0, _ = 1, x = 0, w = 0, v = 1, k = 1) : (y = 0, _ = 1, x = 0, w = 1, v = 1, k = 0);
    let M = p - y + r, S = b - _ + r, N = m - x + r, P = p - w + 2 * r, R = b - v + 2 * r, C = m - k + 2 * r, A = p - 1 + 3 * r, T = b - 1 + 3 * r, O = m - 1 + 3 * r, D = o & 255, E = l & 255, B = c & 255, z = this.perm[D + this.perm[E + this.perm[B]]] % 12, L = this.perm[D + y + this.perm[E + _ + this.perm[B + x]]] % 12, $ = this.perm[D + w + this.perm[E + v + this.perm[B + k]]] % 12, F = this.perm[D + 1 + this.perm[E + 1 + this.perm[B + 1]]] % 12, j = 0.6 - p * p - b * b - m * m, W = j < 0 ? 0 : Math.pow(j, 4) * this.dot(this.grad3[z], p, b, m), Y = 0.6 - M * M - S * S - N * N, V = Y < 0 ? 0 : Math.pow(Y, 4) * this.dot(this.grad3[L], M, S, N), U = 0.6 - P * P - R * R - C * C, Z = U < 0 ? 0 : Math.pow(U, 4) * this.dot(this.grad3[$], P, R, C), K = 0.6 - A * A - T * T - O * O, J = K < 0 ? 0 : Math.pow(K, 4) * this.dot(this.grad3[F], A, T, O);
    return 32 * (W + V + Z + J);
  }
}
const Lb = ({
  children: e,
  speed: t = 0.01,
  scaleX: n = 100,
  scaleY: s = 100,
  size: i = 20,
  radius: r = 0,
  hueBase: a = 258,
  hueRange: o = 10,
  saturationBase: l = 68,
  saturationRange: c = 0,
  lightnessBase: h = 58,
  lightnessRange: d = 0,
  backgroundColor: u = "hsl(258, 62%, 7%)",
  interactiveColor: g = "hsl(180, 80%, 70%)",
  interactiveRadius: p = 150,
  interactiveIntensity: b = 1.5,
  className: m = "",
  seed: y = 1e4
}) => {
  const _ = H(null), x = H({ x: -1e3, y: -1e3 }), w = H(null);
  return G(() => {
    const v = _.current;
    if (!v) return;
    const k = v.getContext("2d"), M = new n1(y);
    let S = [], N = 0, P = 0, R = 0;
    const C = () => {
      v.width = window.innerWidth, v.height = window.innerHeight, N = Math.floor(v.width / i) + 1, P = Math.floor(v.height / i) + 1, A();
    }, A = () => {
      S = new Array(N);
      for (let z = 0; z < N; z++) {
        S[z] = new Array(P);
        for (let L = 0; L < P; L++)
          S[z][L] = [0, 0];
      }
    }, T = () => {
      for (let z = 0; z < N; z++)
        for (let L = 0; L < P; L++) {
          let $ = M.simplex3(z / n, L / s, R) * 2;
          S[z][L][0] = $;
        }
    }, O = () => {
      for (let z = 0; z < N; z++)
        for (let L = 0; L < P; L++) {
          let $ = S[z][L][0];
          const F = z * i, j = L * i, W = F - x.current.x, Y = j - x.current.y, V = Math.sqrt(W * W + Y * Y);
          let U = Math.abs($ + r / 10), Z = a + $ * o, K = l + $ * c, J = h + $ * d;
          if (V < p) {
            const tt = 1 - V / p;
            U *= 1 + tt * b;
            const at = g.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
            if (at) {
              const [, mt, nt, _t] = at.map(Number);
              Z = Z * (1 - tt) + mt * tt, K = K * (1 - tt) + nt * tt, J = J * (1 - tt) + _t * tt;
            }
          }
          k.save(), k.translate(F, j), k.beginPath(), k.arc(0, 0, U, 0, 2 * Math.PI), k.fillStyle = `hsl(${Z}, ${K}%, ${J}%)`, k.fill(), k.restore();
        }
    }, D = () => {
      k.clearRect(0, 0, v.width, v.height), O(), w.current = requestAnimationFrame(D);
    }, E = (z) => {
      x.current = { x: z.clientX, y: z.clientY };
    }, B = () => {
      x.current = { x: -1e3, y: -1e3 };
    };
    return C(), T(), window.addEventListener("resize", C), window.addEventListener("mousemove", E), window.addEventListener("mouseleave", B), D(), () => {
      window.removeEventListener("resize", C), window.removeEventListener("mousemove", E), window.removeEventListener("mouseleave", B), w.current && cancelAnimationFrame(w.current);
    };
  }, [t, n, s, i, r, a, o, l, c, h, d, g, p, b, y]), /* @__PURE__ */ I("div", { className: `noise-background-container ${m}`, children: [
    /* @__PURE__ */ f(
      "canvas",
      {
        ref: _,
        className: "noise-background-canvas",
        style: { background: u }
      }
    ),
    /* @__PURE__ */ f("div", { className: "noise-background-content", children: e })
  ] });
}, Eb = ({ children: e, className: t = "", color: n = { r: 1, g: 1, b: 1 } }) => {
  const s = H(null), i = H(null), r = H(null), a = H(null), o = H(0), l = {
    orange: { r: 1, g: 0.4, b: 0.1 },
    red: { r: 1, g: 0, b: 0.1 },
    blue: { r: 0.3, g: 0.5, b: 1 },
    purple: { r: 0.8, g: 0.2, b: 1 },
    green: { r: 0.3, g: 1, b: 0.3 },
    cyan: { r: 0.2, g: 0.8, b: 1 },
    yellow: { r: 1, g: 0.9, b: 0.2 },
    white: { r: 1, g: 1, b: 1 },
    pink: { r: 1, g: 0.3, b: 0.6 }
  }, c = (h) => typeof h == "string" ? l[h.toLowerCase()] || l.orange : typeof h == "object" && h.r !== void 0 ? h : l.orange;
  return G(() => {
    const h = s.current;
    if (!h) return;
    const d = h.getContext("webgl");
    if (!d) {
      console.error("WebGL not supported");
      return;
    }
    r.current = d;
    const u = c(n), g = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0, 1.0);
      }
    `, p = `
      #define PI 3.14159265358979323846
      precision highp float;

      uniform float width;
      uniform float height;
      vec2 resolution = vec2(width, height);
      uniform float time;
      uniform vec3 sunColor;

      float random (in vec2 st) {
        return fract(sin(dot(st.xy/PI, vec2(12.9898,78.233))) * 43758.5453123);
      }

      vec2 rotate(vec2 _st, float _angle) {
        _st -= 0.5;
        _st = mat2(cos(_angle),-sin(_angle), sin(_angle),cos(_angle)) * _st;
        _st.y += 0.5;
        _st.x += .5;
        return _st;
      }

      float noise (in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      float surface(vec2 pos, float radius, float time) {
        float sphere = length(pos)*3.0;
        float a = atan(pos.y,pos.x);
        float m = a*time;
        m += noise(pos+time*0.1)*.5;
        a *= 1.+abs(atan(time*0.2))*.1;
        a *= 1.+noise(pos+time*0.1)*0.1;
        float distortion = .002*(1.0-pos.y);
        radius += sin(a*50.)*noise(pos+time*.2)*distortion;
        radius += (sin(a*20.)*.002);
        return 1.-smoothstep(radius,radius+0.015,sphere);
      }

      void main(){
        float aspect = width/height;
        vec2 uv = gl_FragCoord.xy/resolution.xy;
        
        // Normalize coordinates to maintain consistent positioning
        vec2 normalizedUV = uv;
        normalizedUV.x *= aspect;
        
        // Position sun at the right edge (x = aspect) and centered vertically (y = 0.5)
        vec2 pos = vec2(aspect, 0.5) - normalizedUV;
        float ds = length(pos);
        float dc = distance(vec2(.5,.5), uv);
        float ids = 1.0 - ds;
       
        float period = 17.2*PI;
        float t = mod(time, period);
        
        float movement = .00;
        float rotation = -t*.0000;
        float twinkle = (1.0+.2*cos(t*40.0*random(uv)));

        vec2 starPos = uv;
        starPos.y -= t*movement;
        starPos = rotate(starPos, rotation);
        float r = random(floor(starPos*500.));
        float brightnessModifier = .3*(fract(r*9.445)+.1);
        r *= step(.97, r);
        vec3 stars = vec3(.5,.7,1.0) * vec3(r)*ds;
        stars *= 1.0-step(ds,.2);
        vec4 starfield = brightnessModifier*vec4(stars,1.0);

        vec2 starPos2 = uv;
        starPos2.y -= t*movement;
        starPos2 = rotate(starPos2, rotation);
        float r2 = random(floor(starPos2*450.));
        brightnessModifier = fract(r2*14.4548);
        r2 *= step(.99, r2);
        vec3 stars2 = vec3(.5,.5,1.0) * vec3(r2)*ds;
        stars2 *= 1.0-step(ds,.2);
        vec4 starfield2 = (twinkle)*(.77*brightnessModifier)*vec4(stars2,1.0);

        vec2 starPos3 = uv;
        starPos3.y -= t*movement;
        starPos3 = rotate(starPos3, rotation);
        float r3 = random(floor(starPos3*470.));
        brightnessModifier = .4*fract(r3*68.7);
        r3 *= step(.9975, r3);
        vec3 stars3 = vec3(1.0,.7,.7) * vec3(r3)*ds;
        stars3 *= 1.0-step(ds,.2);
        vec4 starfield3 = twinkle*(brightnessModifier)*vec4(stars3,1.0);

        vec2 starPos4 = uv;
        starPos4.y -= t*movement;
        starPos4 = rotate(starPos4, rotation);
        float r4 = random(floor(starPos4*400.));
        brightnessModifier = .5+.5*fract(r4*34.5234);
        r4 *= step(.9986, r4);
        vec3 stars4 = vec3(.5,.5,1.0) * vec3(r4)*ds;
        stars4 += vec3(0.0,0.0,.05);
        stars4 *= 1.0-step(ds,.2);
        vec4 starfield4 = twinkle*brightnessModifier*vec4(stars4,1.0);

        float starfieldBrightness = .8;

        // Use custom sun color for the gradient
        vec3 coreColor = sunColor;
        vec3 midColor = sunColor * 0.8 + vec3(0.2, 0.2, 0.0);
        vec3 outerColor = sunColor * 0.6 + vec3(0.3, 0.3, 0.1);
        
        vec3 red = -ds + coreColor;
        vec3 orange = -ds + midColor;
        vec3 yellow = outerColor * clamp(ids, 0.0, 1.0);
        vec3 lime = (coreColor * 0.9 + vec3(0.1, 0.1, 0.0)) * clamp(ids, 0.0, 1.0);
        float lensing = (1.0-normalizedUV.y)-.5;
        vec3 colorz = (yellow)*(lime)*(lensing+.9*(lime+yellow+orange+red)); 
        float sunsetFactor = 2.0*normalizedUV.y;
        
        gl_FragColor = starfieldBrightness*(starfield2+starfield+starfield3+starfield4)+vec4(colorz+(sunsetFactor*(surface(pos,.6+.5*lensing,t))),1.0);
      }
    `, b = (C, A) => {
      const T = d.createShader(A);
      return d.shaderSource(T, C), d.compileShader(T), d.getShaderParameter(T, d.COMPILE_STATUS) ? T : (console.error("Shader compile failed:", d.getShaderInfoLog(T)), null);
    }, m = b(g, d.VERTEX_SHADER), y = b(p, d.FRAGMENT_SHADER);
    if (!m || !y) return;
    const _ = d.createProgram();
    d.attachShader(_, m), d.attachShader(_, y), d.linkProgram(_), d.useProgram(_), a.current = _;
    const x = new Float32Array([
      -1,
      1,
      -1,
      -1,
      1,
      1,
      1,
      -1
    ]), w = d.createBuffer();
    d.bindBuffer(d.ARRAY_BUFFER, w), d.bufferData(d.ARRAY_BUFFER, x, d.STATIC_DRAW);
    const v = d.getAttribLocation(_, "position");
    d.enableVertexAttribArray(v), d.vertexAttribPointer(v, 2, d.FLOAT, !1, 8, 0);
    const k = d.getUniformLocation(_, "time"), M = d.getUniformLocation(_, "width"), S = d.getUniformLocation(_, "height"), N = d.getUniformLocation(_, "sunColor");
    d.uniform3f(N, u.r, u.g, u.b);
    const P = () => {
      const C = h.getBoundingClientRect();
      h.width = C.width, h.height = C.height, d.viewport(0, 0, h.width, h.height), d.uniform1f(M, h.width), d.uniform1f(S, h.height);
    };
    P(), window.addEventListener("resize", P);
    const R = () => {
      o.current += 0.02, d.uniform1f(k, o.current), d.drawArrays(d.TRIANGLE_STRIP, 0, 4), i.current = requestAnimationFrame(R);
    };
    return R(), () => {
      window.removeEventListener("resize", P), i.current && cancelAnimationFrame(i.current);
    };
  }, [n]), /* @__PURE__ */ I("div", { className: `solar-background-wrapper ${t}`, children: [
    /* @__PURE__ */ f("canvas", { ref: s, className: "solar-background-canvas" }),
    /* @__PURE__ */ f("div", { className: "solar-background-content", children: e })
  ] });
}, Ob = ({
  children: e,
  numberOfStars: t = 300,
  numberOfMeteors: n = 5,
  meteorMinDuration: s = 10,
  meteorMaxDuration: i = 30,
  className: r = ""
}) => {
  const a = () => {
    const h = [];
    for (let d = 0; d < t; d++) {
      const u = Math.floor(Math.random() * 1920), g = Math.floor(Math.random() * 1e3);
      h.push(`${u}px ${g}px #fff`);
    }
    return h.join(", ");
  }, o = () => {
    const h = [];
    for (let d = 0; d < n; d++) {
      const u = Math.floor(Math.random() * 90) + 9, g = Math.floor(Math.random() * 250) + 50, p = (Math.floor(Math.random() * 70) / 10 + s).toFixed(1);
      h.push({
        id: d,
        left: `${u}%`,
        top: `${g}px`,
        duration: `${p}s`
      });
    }
    return h;
  }, l = ve.useMemo(() => a(), [t]), c = ve.useMemo(() => o(), [n, s, i]);
  return /* @__PURE__ */ I("div", { className: `stellar-background ${r}`, children: [
    /* @__PURE__ */ f(
      "div",
      {
        className: "stellar-stars",
        style: { boxShadow: l }
      }
    ),
    c.map((h) => /* @__PURE__ */ f(
      "div",
      {
        className: "stellar-meteor",
        style: {
          left: h.left,
          top: h.top,
          animationDuration: h.duration
        }
      },
      h.id
    )),
    /* @__PURE__ */ f("div", { className: "stellar-content", children: e })
  ] });
}, zb = ({
  backgroundColor: e = "#0A2463",
  blobColor: t = "rgba(47, 184, 255, 0.7)",
  numberOfBlobs: n = 3,
  animation: s = !0,
  animationSpeed: i = "normal",
  // 'slow', 'normal', 'fast'
  children: r
}) => {
  const o = (() => {
    switch (i) {
      case "slow":
        return 2;
      case "fast":
        return 0.5;
      case "normal":
      default:
        return 1;
    }
  })(), c = (() => {
    const h = [], d = [
      { left: "70%", top: "50%", size: 200 },
      { left: "-200px", top: "-150px", size: 500 },
      { left: "500px", top: "-150px", size: 350 },
      { left: "80%", top: "20%", size: 300 },
      { left: "10%", top: "70%", size: 400 },
      { left: "60%", top: "80%", size: 250 },
      { left: "-100px", top: "50%", size: 350 },
      { left: "90%", top: "-50px", size: 280 }
    ];
    for (let u = 0; u < n; u++) {
      const g = d[u % d.length];
      h.push({
        id: u,
        ...g,
        animationIndex: u % 2
      });
    }
    return h;
  })();
  return /* @__PURE__ */ I(
    "div",
    {
      className: "glassmorphic-container",
      style: { background: e },
      children: [
        c.map((h) => /* @__PURE__ */ f(
          "div",
          {
            className: `shape-blob ${s ? "animated" : "static"}`,
            style: {
              background: t,
              height: `${h.size}px`,
              width: `${h.size}px`,
              left: h.left,
              top: h.top,
              animationDuration: s ? `${20 * o}s, ${40 * o}s` : "none",
              animationName: s ? `transform, movement_${h.animationIndex === 0 ? "one" : "two"}` : "none"
            }
          },
          h.id
        )),
        r
      ]
    }
  );
}, Fb = ({
  numberOfTiles: e = 250,
  tileSize: t = 100,
  tileColor: n = "linear-gradient(135deg, #1c1c1c 0%, #2b2b2b 100%)",
  backgroundColor: s = "#111111",
  tileHoverColor: i = "linear-gradient(135deg, #d4af37 0%, #ffea00 100%)",
  skewedAngle: r = 45,
  pointerMode: a = !1,
  className: o = "",
  children: l
}) => {
  const h = ((m) => {
    const y = Math.ceil(Math.sqrt(m)), _ = [];
    let x = 0;
    for (let w = 0; w < y && x < m; w++) {
      const v = w % 2 === 0 ? 9 : 8, k = Math.min(v, m - x);
      _.push(k), x += k;
    }
    return _;
  })(e), d = Math.floor(t * 0.44), u = Math.floor(t * 0.49), g = Math.floor(t * 0.11), p = Math.floor(t * 0.056), b = {
    "--tile-size": `${t}px`,
    "--tile-color": n,
    "--tile-hover-color": i,
    "--bg-color": s,
    "--tile-gap": `${d}px`,
    "--margin-top": `-${u}px`,
    "--skewed-angle": `${r}deg`,
    "--side-width": `${g}px`,
    "--side-offset": `${p}px`,
    "--pointer-events": `${a ? "auto" : "none"}`
  };
  return /* @__PURE__ */ I("div", { className: `tile-background-wrapper ${o}`, style: b, children: [
    /* @__PURE__ */ f("div", { className: "tile-background-container", children: h.map((m, y) => /* @__PURE__ */ f("div", { className: "tile-row", children: Array.from({ length: m }).map((_, x) => /* @__PURE__ */ f("div", { className: "tile" }, x)) }, y)) }),
    /* @__PURE__ */ f("div", { className: "tile-background-content", children: l })
  ] });
}, s1 = 1 / 3, Xt = 1 / 6, Gn = (e) => Math.floor(e) | 0, qn = /* @__PURE__ */ new Float64Array([
  1,
  1,
  0,
  -1,
  1,
  0,
  1,
  -1,
  0,
  -1,
  -1,
  0,
  1,
  0,
  1,
  -1,
  0,
  1,
  1,
  0,
  -1,
  -1,
  0,
  -1,
  0,
  1,
  1,
  0,
  -1,
  1,
  0,
  1,
  -1,
  0,
  -1,
  -1
]);
function i1(e = Math.random) {
  const t = r1(e), n = new Float64Array(t).map((r) => qn[r % 12 * 3]), s = new Float64Array(t).map((r) => qn[r % 12 * 3 + 1]), i = new Float64Array(t).map((r) => qn[r % 12 * 3 + 2]);
  return function(a, o, l) {
    let c, h, d, u;
    const g = (a + o + l) * s1, p = Gn(a + g), b = Gn(o + g), m = Gn(l + g), y = (p + b + m) * Xt, _ = p - y, x = b - y, w = m - y, v = a - _, k = o - x, M = l - w;
    let S, N, P, R, C, A;
    v >= k ? k >= M ? (S = 1, N = 0, P = 0, R = 1, C = 1, A = 0) : v >= M ? (S = 1, N = 0, P = 0, R = 1, C = 0, A = 1) : (S = 0, N = 0, P = 1, R = 1, C = 0, A = 1) : k < M ? (S = 0, N = 0, P = 1, R = 0, C = 1, A = 1) : v < M ? (S = 0, N = 1, P = 0, R = 0, C = 1, A = 1) : (S = 0, N = 1, P = 0, R = 1, C = 1, A = 0);
    const T = v - S + Xt, O = k - N + Xt, D = M - P + Xt, E = v - R + 2 * Xt, B = k - C + 2 * Xt, z = M - A + 2 * Xt, L = v - 1 + 3 * Xt, $ = k - 1 + 3 * Xt, F = M - 1 + 3 * Xt, j = p & 255, W = b & 255, Y = m & 255;
    let V = 0.6 - v * v - k * k - M * M;
    if (V < 0)
      c = 0;
    else {
      const J = j + t[W + t[Y]];
      V *= V, c = V * V * (n[J] * v + s[J] * k + i[J] * M);
    }
    let U = 0.6 - T * T - O * O - D * D;
    if (U < 0)
      h = 0;
    else {
      const J = j + S + t[W + N + t[Y + P]];
      U *= U, h = U * U * (n[J] * T + s[J] * O + i[J] * D);
    }
    let Z = 0.6 - E * E - B * B - z * z;
    if (Z < 0)
      d = 0;
    else {
      const J = j + R + t[W + C + t[Y + A]];
      Z *= Z, d = Z * Z * (n[J] * E + s[J] * B + i[J] * z);
    }
    let K = 0.6 - L * L - $ * $ - F * F;
    if (K < 0)
      u = 0;
    else {
      const J = j + 1 + t[W + 1 + t[Y + 1]];
      K *= K, u = K * K * (n[J] * L + s[J] * $ + i[J] * F);
    }
    return 32 * (c + h + d + u);
  };
}
function r1(e) {
  const n = new Uint8Array(512);
  for (let s = 0; s < 512 / 2; s++)
    n[s] = s;
  for (let s = 0; s < 512 / 2 - 1; s++) {
    const i = s + ~~(e() * (256 - s)), r = n[s];
    n[s] = n[i], n[i] = r;
  }
  for (let s = 256; s < 512; s++)
    n[s] = n[s - 256];
  return n;
}
const Bb = ({
  children: e,
  colors: t = [330, 345, 360, 375, 390],
  className: n = ""
}) => {
  const s = H(null), i = H(null), r = H(0);
  return G(() => {
    const a = s.current;
    if (!a) return;
    const o = a.getContext("2d");
    let l, c;
    const h = i1(), d = {
      simplex3: (b, m, y) => h(b, m, y)
    }, u = () => {
      l = a.width = window.innerWidth, c = a.height = window.innerHeight, o.filter = "blur(30px)";
    };
    u(), window.addEventListener("resize", u);
    const g = (b) => {
      r.current += 2e-3;
      for (let m = 0; m < b; m++) {
        o.beginPath(), o.lineWidth = 30;
        const y = m % t.length;
        o.strokeStyle = `hsla(${t[y]}, 100%, 60%, 1)`;
        for (let _ = 0; _ < l; _ += 30) {
          const x = d.simplex3(_ / 800, 0.3 * m, r.current) * 100;
          o.lineTo(_, x + c / 2);
        }
        o.stroke(), o.closePath();
      }
    }, p = () => {
      o.fillStyle = "rgba(0, 12, 12, 1)", o.fillRect(0, 0, l, c), g(t.length), i.current = requestAnimationFrame(p);
    };
    return p(), () => {
      window.removeEventListener("resize", u), i.current && cancelAnimationFrame(i.current);
    };
  }, [t]), /* @__PURE__ */ I("div", { className: `wave-background-container ${n}`, children: [
    /* @__PURE__ */ f("canvas", { ref: s, className: "wave-canvas" }),
    /* @__PURE__ */ f("div", { className: "wave-content", children: e })
  ] });
}, Hb = ({
  variant: e = "default",
  children: t,
  className: n = "",
  style: s = {},
  speedFactor: i = 4,
  ...r
}) => {
  const a = () => {
    switch (e) {
      case "vivid":
        return "background-shader--vivid";
      case "metal":
        return "background-shader--metal";
      case "silk":
        return "background-shader--silk";
      default:
        return "";
    }
  }, o = {
    "--speed-factor": i,
    ...s
  };
  return /* @__PURE__ */ f(
    "div",
    {
      className: `background-shader ${a()} ${n}`,
      style: o,
      ...r,
      children: t
    }
  );
}, Vb = ({
  children: e,
  className: t = "",
  playAnimation: n = !1,
  hoverAnimation: s = !1,
  clickAnimation: i = !1,
  fontSize: r = "54px",
  fontWeight: a = "600",
  color: o = "#fff",
  ...l
}) => {
  const [c, h] = X(!1), d = (g) => {
    i && (h(!0), setTimeout(() => h(!1), 500)), l.onClick && l.onClick(g);
  };
  return /* @__PURE__ */ f(
    "button",
    {
      className: `rgb-glitch-btn ${n ? "rgb-glitch-btn--play" : c ? "rgb-glitch-btn--clicked" : s ? "rgb-glitch-btn--hover" : ""} ${t}`,
      "data-text": e,
      style: { fontSize: r, fontWeight: a, color: o },
      onClick: d,
      ...l,
      children: e
    }
  );
}, Wb = ({
  children: e,
  showFrame: t = !0,
  showFilmGrain: n = !0,
  showStatic: s = !0,
  playText: i = "Play",
  playTextColor: r = "#fff",
  sequence: a = "3",
  tapeNumber: o = "TAPE 003",
  date: l = "MAR. 03 2024",
  time: c = "00:00:00 AM",
  textColor: h = "#ff0000",
  className: d = "",
  ...u
}) => {
  const g = H(null);
  return G(() => {
    if (!n) return;
    const p = g.current;
    if (!p) return;
    const b = () => {
      const _ = Math.random() * 30 - 5, x = Math.random() * 46 - 12;
      return `translateX(${_}%) translateY(${x}%) translateZ(0px)`;
    }, m = () => {
      p.style.transform = b();
    };
    m();
    const y = setInterval(m, 100);
    return () => clearInterval(y);
  }, [n]), /* @__PURE__ */ I("div", { className: `vhs-wrapper ${d}`, ...u, children: [
    t && /* @__PURE__ */ I("div", { className: "vhs-frame", children: [
      /* @__PURE__ */ I("p", { className: "vhs-play", style: { color: h }, children: [
        i,
        /* @__PURE__ */ f("span", { children: /* @__PURE__ */ f(
          "svg",
          {
            width: "20",
            height: "24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ f(
              "path",
              {
                d: "M0 22.292V1.781A1 1 0 0 1 1.52.927L19.04 11.61a1 1 0 0 1-.03 1.726L1.49 23.165A1 1 0 0 1 0 22.292Z",
                fill: r
              }
            )
          }
        ) })
      ] }),
      /* @__PURE__ */ f("p", { className: "vhs-sequence", style: { color: h }, children: a }),
      /* @__PURE__ */ f("p", { className: "vhs-year", style: { color: h }, children: o }),
      /* @__PURE__ */ I("p", { className: "vhs-date", style: { color: h }, children: [
        /* @__PURE__ */ f("span", { children: l }),
        /* @__PURE__ */ f("span", { children: c })
      ] }),
      /* @__PURE__ */ I("div", { className: "vhs-tl", children: [
        /* @__PURE__ */ f("div", { className: "vhs-top" }),
        /* @__PURE__ */ f("div", { className: "vhs-bottom" })
      ] }),
      /* @__PURE__ */ I("div", { className: "vhs-tr", children: [
        /* @__PURE__ */ f("div", { className: "vhs-top" }),
        /* @__PURE__ */ f("div", { className: "vhs-bottom" })
      ] }),
      /* @__PURE__ */ I("div", { className: "vhs-br", children: [
        /* @__PURE__ */ f("div", { className: "vhs-top" }),
        /* @__PURE__ */ f("div", { className: "vhs-bottom-right" })
      ] }),
      /* @__PURE__ */ I("div", { className: "vhs-bl", children: [
        /* @__PURE__ */ f("div", { className: "vhs-top" }),
        /* @__PURE__ */ f("div", { className: "vhs-bottom" })
      ] }),
      /* @__PURE__ */ f("div", { className: "vhs-vignette" })
    ] }),
    s && /* @__PURE__ */ f("div", { className: "vhs-static", children: /* @__PURE__ */ f(
      "video",
      {
        src: "https://res.cloudinary.com/dhcl0fsay/video/upload/v1758365149/deadmeat-horror-awards-24/vhs_svgkmp.mp4",
        loop: !0,
        autoPlay: !0,
        playsInline: !0,
        muted: !0,
        style: {
          cursor: "auto",
          width: "100%",
          height: "100%",
          borderRadius: "0px",
          display: "block",
          objectFit: "cover",
          backgroundColor: "rgba(0, 0, 0, 0)",
          objectPosition: "50% 50%"
        }
      }
    ) }),
    n && /* @__PURE__ */ f("div", { className: "vhs-film-grain", children: /* @__PURE__ */ f("div", { className: "vhs-film-grain-container", children: /* @__PURE__ */ f(
      "div",
      {
        className: "vhs-film-grain-image",
        ref: g
      }
    ) }) }),
    /* @__PURE__ */ f("div", { className: "vhs-content", children: e })
  ] });
}, jb = ({
  children: e,
  className: t = "",
  backgroundImage: n = "",
  showGrain: s = !0,
  showScratches: i = !0,
  intensity: r = "normal",
  // 'light', 'normal', 'heavy'
  bgColor: a = "none",
  headerColor: o = "#fff",
  scanLineOpacity: l = 0.1,
  flickerIntensity: c = 0.03
}) => {
  const h = `crt-${r}`;
  return /* @__PURE__ */ I(
    "div",
    {
      className: `crt-wrapper ${h} ${t}`,
      style: {
        "--bg-color": a,
        "--text-color": o,
        "--scan-line-opacity": l,
        "--flicker-intensity": c
      },
      children: [
        /* @__PURE__ */ f("div", { className: "crt-outer-scratch", children: /* @__PURE__ */ f("div", { className: "crt-inner-scratch", children: /* @__PURE__ */ f(
          "div",
          {
            className: `crt-background ${s ? "crt-grain" : ""}`,
            style: {
              backgroundImage: n ? `url(${n})` : "none"
            },
            children: /* @__PURE__ */ f("div", { className: "crt-content", children: e })
          }
        ) }) }),
        i && /* @__PURE__ */ I(kt, { children: [
          /* @__PURE__ */ f("div", { className: "crt-scratch-overlay crt-scratch-quick" }),
          /* @__PURE__ */ f("div", { className: "crt-scratch-overlay crt-scratch-slow" })
        ] }),
        s && /* @__PURE__ */ f("div", { className: "crt-grain-overlay" })
      ]
    }
  );
}, Yb = ({
  image: e,
  width: t = 400,
  height: n = 500,
  autoGlitch: s = !0,
  glitchIntensity: i = 15,
  mouseIntensity: r = 25,
  className: a = "",
  ...o
}) => {
  const l = H(null), c = H(null), h = H(null), d = H(null), u = H(null), g = H(null), p = H(null), [b, m] = X(!1), [y, _] = X(!1), x = (A, T) => Math.random() * (T - A + 1) + A, w = (A, T) => {
    if (!c.current || !h.current || !d.current) return;
    const O = `translate(${A}px, ${T * 0.5}px)`, D = `translate(${-A * 0.5}px, ${T}px)`, E = `translate(${-A}px, ${-T * 0.5}px)`;
    c.current.style.transform = `translate(-50%, -50%) ${O}`, h.current.style.transform = `translate(-50%, -50%) ${D}`, d.current.style.transform = `translate(-50%, -50%) ${E}`;
  }, v = () => {
    if (!c.current || !h.current || !d.current) return;
    const A = "translate(-50%, -50%)";
    c.current.style.transform = A, h.current.style.transform = A, d.current.style.transform = A;
  }, k = (A = 1) => {
    if (!g.current) return;
    g.current.classList.add("active");
    const T = x(-i, i) * A, O = x(-i, i) * A;
    w(T, O), setTimeout(() => {
      g.current && g.current.classList.remove("active"), v();
    }, 300);
  }, M = () => {
    const A = () => {
      if (!s) return;
      k(x(0.5, 1));
      const T = x(2e3, 6e3);
      p.current = setTimeout(A, T);
    };
    p.current = setTimeout(A, x(1e3, 3e3));
  };
  G(() => (s && b && M(), () => {
    p.current && clearTimeout(p.current);
  }), [s, b]);
  const S = () => {
    m(!0), _(!1);
  }, N = () => {
    _(!0), m(!1);
  }, P = (A) => {
    if (!l.current) return;
    const T = l.current.getBoundingClientRect(), O = (A.clientX - T.left) / T.width, D = (A.clientY - T.top) / T.height;
    l.current.style.setProperty("--mouse-x", `${O * 100}%`), l.current.style.setProperty("--mouse-y", `${D * 100}%`);
    const E = (O - 0.5) * r, B = (D - 0.5) * r;
    w(E, B), Math.random() < 0.05 && k(0.3);
  }, R = () => {
    v();
  }, C = () => {
    k(0.4);
  };
  return e ? /* @__PURE__ */ I(
    "div",
    {
      ref: l,
      className: `chromatic-split-container ${a}`,
      onMouseMove: P,
      onMouseLeave: R,
      onMouseEnter: C,
      style: { width: t, height: n },
      ...o,
      children: [
        /* @__PURE__ */ I("div", { className: "chromatic-split-image-wrapper", children: [
          /* @__PURE__ */ f(
            "img",
            {
              ref: u,
              src: e,
              alt: "",
              className: "chromatic-split-image chromatic-split-normal",
              onLoad: S,
              onError: N,
              draggable: !1
            }
          ),
          /* @__PURE__ */ f(
            "img",
            {
              ref: c,
              src: e,
              alt: "",
              className: "chromatic-split-image chromatic-split-red",
              draggable: !1
            }
          ),
          /* @__PURE__ */ f(
            "img",
            {
              ref: h,
              src: e,
              alt: "",
              className: "chromatic-split-image chromatic-split-green",
              draggable: !1
            }
          ),
          /* @__PURE__ */ f(
            "img",
            {
              ref: d,
              src: e,
              alt: "",
              className: "chromatic-split-image chromatic-split-blue",
              draggable: !1
            }
          )
        ] }),
        /* @__PURE__ */ f(
          "div",
          {
            ref: g,
            className: "chromatic-split-glitch"
          }
        ),
        /* @__PURE__ */ f("div", { className: "chromatic-split-overlay" }),
        !b && !y && /* @__PURE__ */ f("div", { className: "chromatic-split-loading", children: "Loading" }),
        y && /* @__PURE__ */ f(
          "div",
          {
            className: "chromatic-split-loading",
            style: { color: "#ff6b6b" },
            children: "Failed to load image"
          }
        )
      ]
    }
  ) : /* @__PURE__ */ f(
    "div",
    {
      className: `chromatic-split-container ${a}`,
      style: {
        width: t,
        height: n,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#222",
        color: "#666"
      },
      children: "No image provided"
    }
  );
}, ao = xo(), Ub = () => {
  const e = _o(ao);
  if (!e)
    throw new Error("useTheme must be used within a ThemeProvider");
  return e;
}, Dr = {
  // ===== BASIC THEMES =====
  light: {
    background: "#ffffff",
    text: "#000000",
    buttonBg: "#e0e0e0",
    buttonText: "#000000",
    divBg: "#f5f5f5",
    divText: "#000000",
    h1: "#111111",
    h2: "#222222",
    h3: "#333333",
    progress: "#3b82f6",
    svgColor: "#000000",
    scrollbar: { track: "#ffffff", thumb: "#cccccc" }
  },
  dark: {
    background: "#1d232a",
    text: "#ffffff",
    buttonBg: "#191e24",
    buttonText: "#ffffff",
    divBg: "#15191e",
    divText: "#ffffff",
    h1: "#ffffff",
    h2: "#dddddd",
    h3: "#bbbbbb",
    progress: "#9ca3af",
    svgColor: "#ffffff",
    scrollbar: { track: "#1d232a", thumb: "#333333" }
  },
  dim: {
    background: "#2a303c",
    text: "#dcdcdc",
    buttonBg: "#9fe88d",
    buttonText: "#ffffff",
    divBg: "#222630",
    divText: "#dcdcdc",
    h1: "#ffffff",
    h2: "#cccccc",
    h3: "#aaaaaa",
    progress: "#dcdcdc",
    svgColor: "#dcdcdc",
    scrollbar: { track: "#2a303c", thumb: "#1c1c1c" }
  },
  night: {
    background: "#1a2338",
    text: "#90959e",
    buttonBg: "#3abdf8",
    buttonText: "#000000",
    divBg: "#0c1425",
    divText: "#f0f0f0",
    h1: "#c9cbd0",
    h2: "#c9cbd0",
    h3: "#c9cbd0",
    progress: "#38bdf8",
    svgColor: "#f0f0f0",
    scrollbar: { track: "#1a2338", thumb: "#505664" }
  },
  business: {
    background: "#f2f2f2",
    text: "#333333",
    buttonBg: "#0073e6",
    buttonText: "#ffffff",
    divBg: "#e6e6e6",
    divText: "#333333",
    h1: "#0073e6",
    h2: "#005bb5",
    h3: "#004494",
    progress: "#0073e6",
    svgColor: "#333333",
    scrollbar: { track: "#f2f2f2", thumb: "#cccccc" }
  },
  // ===== SEASONAL THEMES =====
  summer: {
    background: "#ffebc2",
    text: "#ff6f00",
    buttonBg: "#ffd166",
    buttonText: "#333333",
    divBg: "#fff8e1",
    divText: "#ff6f00",
    h1: "#ff8c42",
    h2: "#ff9e57",
    h3: "#ffaf6e",
    progress: "#ffd166",
    svgColor: "#ff6f00",
    scrollbar: { track: "#fff5e1", thumb: "#ffd166" }
  },
  autumn: {
    background: "#ffe8cc",
    text: "#804000",
    buttonBg: "#ff9933",
    buttonText: "#ffffff",
    divBg: "#fff8f0",
    divText: "#804000",
    h1: "#cc6600",
    h2: "#e67300",
    h3: "#ff8000",
    progress: "#ff9933",
    svgColor: "#804000",
    scrollbar: { track: "#ffe8cc", thumb: "#ff9933" }
  },
  winter: {
    background: "#c9e2ff",
    text: "#004080",
    buttonBg: "#66b3ff",
    buttonText: "#ffffff",
    divBg: "#e6f2ff",
    divText: "#004080",
    h1: "#3399ff",
    h2: "#4da6ff",
    h3: "#66b3ff",
    progress: "#3399ff",
    svgColor: "#004080",
    scrollbar: { track: "#c9e2ff", thumb: "#66b3ff" }
  },
  // ===== HOLIDAY & CELEBRATION THEMES =====
  valentine: {
    background: "#ffe5ec",
    text: "#a10043",
    buttonBg: "#ff4c79",
    buttonText: "#ffffff",
    divBg: "#fff0f5",
    divText: "#a10043",
    h1: "#ff4c79",
    h2: "#ff6699",
    h3: "#ff85aa",
    progress: "#ff4c79",
    svgColor: "#a10043",
    scrollbar: { track: "#ffe5ec", thumb: "#ff4c79" }
  },
  halloween: {
    background: "#1b1816",
    text: "#ff7518",
    buttonBg: "#ffa733",
    buttonText: "#131616",
    divBg: "#26221f",
    divText: "#ff7518",
    h1: "#cdcdcd",
    h2: "#cdcdcd",
    h3: "#cdcdcd",
    progress: "#ff4500",
    svgColor: "#ff7518",
    scrollbar: { track: "#1b1816", thumb: "#ff4500" }
  },
  // ===== NATURE THEMES =====
  forest: {
    background: "#2d2727",
    text: "#969494",
    buttonBg: "#1fb854",
    buttonText: "#000000",
    divBg: "#161212",
    divText: "#a4d4a4",
    h1: "#cac9c9",
    h2: "#cac9c9",
    h3: "#cac9c9",
    progress: "#2e8b57",
    svgColor: "#a4d4a4",
    scrollbar: { track: "#2d2727", thumb: "#2e8b57" }
  },
  aqua: {
    background: "#e0f7fa",
    text: "#006064",
    buttonBg: "#00bcd4",
    buttonText: "#ffffff",
    divBg: "#b2ebf2",
    divText: "#006064",
    h1: "#00bcd4",
    h2: "#26c6da",
    h3: "#4dd0e1",
    progress: "#00bcd4",
    svgColor: "#006064",
    scrollbar: { track: "#e0f7fa", thumb: "#00bcd4" }
  },
  sunset: {
    background: "#ffcccb",
    text: "#800000",
    buttonBg: "#ff7f50",
    buttonText: "#ffffff",
    divBg: "#ffd9d6",
    divText: "#800000",
    h1: "#ff4500",
    h2: "#ff6347",
    h3: "#ff7f50",
    progress: "#ff7f50",
    svgColor: "#800000",
    scrollbar: { track: "#ffcccb", thumb: "#ff7f50" }
  },
  // ===== WARM & COZY THEMES =====
  cream: {
    background: "#f8e8e8",
    text: "#3a1c1c",
    buttonBg: "#f9b8b8",
    buttonText: "#3a1c1c",
    divBg: "#faf7f5",
    divText: "#3a1c1c",
    h1: "#5c1a1a",
    h2: "#703333",
    h3: "#8a4d4d",
    progress: "#ff7f7f",
    svgColor: "#3a1c1c",
    scrollbar: { track: "#f8e8e8", thumb: "#f9b8b8" }
  },
  honey: {
    background: "#fff7aa",
    text: "#3b2f00",
    buttonBg: "#ffd500",
    buttonText: "#3b2f00",
    divBg: "#fffacd",
    divText: "#3b2f00",
    h1: "#5c3a00",
    h2: "#705000",
    h3: "#8a6600",
    progress: "#ffc107",
    svgColor: "#3b2f00",
    scrollbar: { track: "#fff7aa", thumb: "#ffd500" }
  },
  coffee: {
    background: "#2b202a",
    text: "#f3e0d8",
    buttonBg: "#6f4e37",
    buttonText: "#ffffff",
    divBg: "#1e151d",
    divText: "#95774f",
    h1: "#c59f61",
    h2: "#7f5c44",
    h3: "#8f6a51",
    progress: "#6f4e37",
    svgColor: "#f3e0d8",
    scrollbar: { track: "#2b202a", thumb: "#6f4e37" }
  },
  caramel: {
    background: "#ffd59a",
    text: "#5c3a21",
    buttonBg: "#e5a55c",
    buttonText: "#ffffff",
    divBg: "#ffe1b3",
    divText: "#5c3a21",
    h1: "#e5a55c",
    h2: "#f0b078",
    h3: "#f4c29a",
    progress: "#e5a55c",
    svgColor: "#5c3a21",
    scrollbar: { track: "#ffd59a", thumb: "#e5a55c" }
  },
  // ===== AESTHETIC & VIBE THEMES =====
  lofi: {
    background: "#f5f0e6",
    text: "#3d2b1f",
    buttonBg: "#b08ea2",
    buttonText: "#ffffff",
    divBg: "#f8f4ef",
    divText: "#3d2b1f",
    h1: "#7a5c48",
    h2: "#8a6b58",
    h3: "#9a7b68",
    progress: "#b08ea2",
    svgColor: "#3d2b1f",
    scrollbar: { track: "#f5f0e6", thumb: "#b08ea2" }
  },
  fantasy: {
    background: "#f0e6ff",
    text: "#4b0082",
    buttonBg: "#9370db",
    buttonText: "#ffffff",
    divBg: "#e6d6ff",
    divText: "#4b0082",
    h1: "#9370db",
    h2: "#a36fd7",
    h3: "#b38ede",
    progress: "#9370db",
    svgColor: "#4b0082",
    scrollbar: { track: "#f0e6ff", thumb: "#9370db" }
  },
  // ===== RETRO & VINTAGE THEMES =====
  retro: {
    background: "#ece3ca",
    text: "#793205",
    buttonBg: "#ff9fa0",
    buttonText: "#801518",
    divBg: "#e3d7b3",
    divText: "#9b673f",
    h1: "#793205",
    h2: "#793205",
    h3: "#793205",
    progress: "#d98c56",
    svgColor: "#5c3a21",
    scrollbar: { track: "#ece3ca", thumb: "#d98c56" }
  },
  "neo-retro": {
    background: "#09002f",
    text: "#747cc2",
    buttonBg: "#f861b4",
    buttonText: "#500323",
    divBg: "#140d3f",
    divText: "#747cc2",
    h1: "#a1b1ff",
    h2: "#a1b1ff",
    h3: "#a1b1ff",
    progress: "#ff3c9d",
    svgColor: "#ff6ec7",
    scrollbar: { track: "#09002f", thumb: "#ff3c9d" }
  },
  // ===== CYBERPUNK & FUTURISTIC THEMES =====
  cyberpunk: {
    background: "#fff248",
    text: "#000000",
    buttonBg: "#fa6393",
    buttonText: "#00ffff",
    divBg: "#f7e83a",
    divText: "#ff5861",
    h1: "#000000",
    h2: "#000000",
    h3: "#000000",
    progress: "#ff00ff",
    svgColor: "#00ffff",
    scrollbar: { track: "#fff248", thumb: "#00ffff" }
  },
  // ===== MYTHOLOGICAL & ANCIENT THEMES =====
  odyssey: {
    background: "#E7DCC8",
    text: "#704214",
    buttonBg: "#A0805A",
    buttonText: "#F4E8D0",
    divBg: "#F4E8D0",
    divText: "#5c3410",
    h1: "#704214",
    h2: "#8a5319",
    h3: "#a0651e",
    progress: "#A0805A",
    svgColor: "#704214",
    scrollbar: { track: "#E7DCC8", thumb: "#A0805A" }
  },
  thor: {
    background: "#1a1f2e",
    text: "#e0ffff",
    buttonBg: "#DC143C",
    buttonText: "#ffffff",
    divBg: "#2C3E50",
    divText: "#e0ffff",
    h1: "#FFD700",
    h2: "#00BFFF",
    h3: "#C0C0C0",
    progress: "#00BFFF",
    svgColor: "#FFD700",
    scrollbar: { track: "#1a1f2e", thumb: "#DC143C" }
  },
  // ===== DARK & HORROR THEMES =====
  eerie: {
    background: "#0a0a0a",
    text: "#8b7d6b",
    buttonBg: "#2d1810",
    buttonText: "#c9b8a0",
    divBg: "#1a0f0a",
    divText: "#8b7d6b",
    h1: "#4a2c1a",
    h2: "#5c3621",
    h3: "#6e4228",
    progress: "#4a2c1a",
    svgColor: "#6e4228",
    scrollbar: { track: "#0a0a0a", thumb: "#2d1810" }
  },
  abyzou: {
    background: "#000000",
    text: "#8b0000",
    buttonBg: "#1a0000",
    buttonText: "#ff0000",
    divBg: "#1a0a0a",
    divText: "#8b0000",
    h1: "#ff0000",
    h2: "#cc0000",
    h3: "#990000",
    progress: "#8b0000",
    svgColor: "#ff0000",
    scrollbar: { track: "#000000", thumb: "#8b0000" }
  }
}, a1 = () => {
  if (document.getElementById("ui-library-theme-base")) return;
  const e = document.createElement("style");
  e.id = "ui-library-theme-base", e.textContent = `
    :root {
      --bg-color: #ffffff;
      --text-color: #000000;
      --button-bg: #e0e0e0;
      --button-text: #000000;
      --div-bg: #f5f5f5;
      --div-text: #000000;
      --h1-color: #111111;
      --h2-color: #222222;
      --h3-color: #333333;
      --svg-color: #000000;
      --scrollbar-track: #f1f1f1;
      --scrollbar-thumb: #888888;
    }
    
    body {
      background-color: var(--bg-color);
      color: var(--text-color);
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    
    body::-webkit-scrollbar { width: 10px; }
    body::-webkit-scrollbar-track { background: var(--scrollbar-track); }
    body::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 10px; }
  `, document.head.appendChild(e);
}, Xb = ({ children: e, customThemes: t = {}, defaultTheme: n = "light" }) => {
  const s = { ...Dr, ...t }, [i, r] = X(() => {
    try {
      const o = localStorage.getItem("theme");
      return o && s[o] ? o : n;
    } catch {
      return n;
    }
  }), a = s[i] || s[n] || Dr.light;
  return G(() => {
    a1();
  }, []), G(() => {
    try {
      localStorage.setItem("theme", i);
    } catch {
    }
    document.documentElement.style.setProperty("--bg-color", a.background), document.documentElement.style.setProperty("--text-color", a.text), document.documentElement.style.setProperty("--button-bg", a.buttonBg), document.documentElement.style.setProperty("--button-text", a.buttonText), document.documentElement.style.setProperty("--div-bg", a.divBg || a.background), document.documentElement.style.setProperty("--div-text", a.divText || a.text), document.documentElement.style.setProperty("--h1-color", a.h1 || a.text), document.documentElement.style.setProperty("--h2-color", a.h2 || a.text), document.documentElement.style.setProperty("--h3-color", a.h3 || a.text), document.documentElement.style.setProperty("--svg-color", a.svgColor || a.text), document.documentElement.style.setProperty(
      "--scrollbar-track",
      a.scrollbar?.track || "#f1f1f1"
    ), document.documentElement.style.setProperty(
      "--scrollbar-thumb",
      a.scrollbar?.thumb || "#888"
    );
  }, [i, a]), /* @__PURE__ */ f(ao.Provider, { value: { theme: a, themeName: i, setThemeName: r, allThemes: s }, children: e });
}, Gb = {
  ALPHABETICAL: "alphabetical",
  ASCII: "ascii",
  PIXELS: "pixels"
}, qb = {
  DEFAULT: "",
  PURPLE: "purple",
  BLUE: "blue",
  GREEN: "green",
  RED: "red",
  ORANGE: "orange"
}, Zb = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large"
};
export {
  Gb as ANIMATION_TYPES,
  h1 as Accordion,
  d1 as ActivityGrid,
  u1 as AlertDialog,
  g1 as AnimatedBorderButton,
  f1 as AnimatedCard,
  Ab as AuroraBackground,
  p1 as Auth,
  So as Avatar,
  m1 as AvatarGroup,
  Co as Badge,
  b1 as Breadcrumb,
  y1 as Button,
  qb as COLOR_VARIANTS,
  jb as CRT,
  bs as Calendar,
  M1 as Carousel,
  S1 as Chart,
  C1 as ChatBox,
  N1 as Checkbox,
  Yb as ChromaticSplit,
  P1 as CodeBlock,
  T1 as ComboBox,
  A1 as ContextMenu,
  Db as CosmicBackground,
  $1 as CosmicCard,
  D1 as Counter,
  I1 as DataTable,
  _1 as DatePicker,
  k1 as DatePickerWithSubmit,
  w1 as DateTimePicker,
  Io as Dialog,
  R1 as Dropdown,
  L1 as EndlessReview,
  E1 as FabIcon,
  Hb as FakeShader,
  O1 as FluidButton,
  z1 as FocusCard,
  F1 as Footer,
  zb as GlassmorphicBackground,
  Vb as GlitchText,
  B1 as GlowTrackButton,
  Tb as GradientBackground,
  H1 as GradientText,
  Ib as HaloBackground,
  V1 as InfiniteGallery,
  W1 as InfiniteScroller,
  j1 as Input,
  Y1 as InputOTP,
  U1 as LinkPreview,
  X1 as LumeButton,
  Rb as MatrixBackground,
  G1 as Navbar,
  Lb as NoiseBackground,
  q1 as Pagination,
  Z1 as PricingCard,
  K1 as ProgressBar,
  Q1 as RadarChart,
  tb as RadioGroup,
  eb as ReactHookForm,
  nb as Resizable,
  sb as Roadmap,
  Zb as SIZE_VARIANTS,
  ib as SearchBar,
  Es as ShaderCard,
  rb as ShineText,
  ab as Sidebar,
  ob as SkeletonLoader,
  lb as Skillbar,
  cb as Slider,
  Eb as SolarBackground,
  hb as SpotLightCard,
  $b as SpotlightBackground,
  Ob as StellarBackground,
  db as Switch,
  ub as Tab,
  fb as Testimonial,
  gb as TextArea,
  yb as ThemeButton,
  ao as ThemeContext,
  Xb as ThemeProvider,
  x1 as ThreeDCard,
  x1 as ThreeDCardDefault,
  Fb as TileBackground,
  mb as Timeline,
  cf as Toast,
  bb as ToastContainer,
  vb as ToggleGroup,
  xb as Tooltip,
  _b as Tree,
  wb as TrieSearch,
  Xe as Typography,
  kb as Typography1,
  Mb as Typography2,
  Sb as Typography3,
  Cb as Typography4,
  Nb as Typography5,
  Pb as Typography6,
  Wb as VHS,
  Bb as WaveBackground,
  v1 as confettiVariations,
  Dr as themes,
  ne as triggerConfetti,
  Ub as useTheme,
  pb as useToast
};
