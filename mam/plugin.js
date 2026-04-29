(function(exports) {

//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion

//#region solid-js/web
var require_web = __commonJS({ "solid-js/web"(exports, module) {
	module.exports = shelter.solidWeb;
} });

//#endregion
//#region plugins/mam/index.jsx
var import_web = __toESM(require_web(), 1);
var import_web$1 = __toESM(require_web(), 1);
var import_web$2 = __toESM(require_web(), 1);
var import_web$3 = __toESM(require_web(), 1);
var import_web$4 = __toESM(require_web(), 1);
var import_web$5 = __toESM(require_web(), 1);
var import_web$6 = __toESM(require_web(), 1);
var import_web$7 = __toESM(require_web(), 1);
var import_web$8 = __toESM(require_web(), 1);
var import_web$9 = __toESM(require_web(), 1);
var import_web$10 = __toESM(require_web(), 1);
var import_web$11 = __toESM(require_web(), 1);
const _tmpl$ = /*#__PURE__*/ (0, import_web.template)(`<button aria-label="Send GIF" title="Send GIF"><img loading="lazy"></button>`, 3), _tmpl$2 = /*#__PURE__*/ (0, import_web.template)(`<div></div>`, 2), _tmpl$3 = /*#__PURE__*/ (0, import_web.template)(`<img loading="lazy">`, 1), _tmpl$4 = /*#__PURE__*/ (0, import_web.template)(`<button><!#><!/><div></div><div></div></button>`, 8), _tmpl$5 = /*#__PURE__*/ (0, import_web.template)(`<style>
				.mam-container { display: flex !important; flex-direction: column !important; height: 100% !important; overflow: hidden !important; }
				.mam-header-row { display: flex !important; flex-direction: row !important; gap: 8px !important; align-items: center !important; padding: 8px 12px !important; }
				.mam-search-container { border-radius: 16px !important; overflow: hidden !important; }
				.mam-search-input { color: #ffffff !important; background: transparent !important; border: none !important; }
				.mam-search-input::placeholder { color: var(--text-muted) !important; }
			</style>`, 2), _tmpl$6 = /*#__PURE__*/ (0, import_web.template)(`<svg class="mam-back-icon" role="img" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M10 8.26667V4L3 11.4667L10 18.9333V14.56C15 14.56 18.5 16.2667 21 20C20 14.6667 17 9.33333 10 8.26667Z"></path></svg>`, 4), _tmpl$7 = /*#__PURE__*/ (0, import_web.template)(`<button aria-label="Clear search">×</button>`, 2), _tmpl$8 = /*#__PURE__*/ (0, import_web.template)(`<div class="mam-search-container"><svg width="16" height="16" viewBox="0 0 24 24" role="img" aria-hidden="true"><path fill="currentColor" d="M10.5 3a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm8.85 12.44 3.2 3.2a1 1 0 0 1-1.42 1.42l-3.2-3.2a1 1 0 0 1 1.42-1.42Z"></path></svg><input placeholder="Search GIFs" type="text" class="mam-search-input"><!#><!/></div>`, 9), _tmpl$9 = /*#__PURE__*/ (0, import_web.template)(`<div class="mam-container"><div class="mam-header-row"><!#><!/><!#><!/></div><!#><!/><div><div></div></div></div>`, 14), _tmpl$0 = /*#__PURE__*/ (0, import_web.template)(`<style>
				.mam-settings { display: block !important; width: 100%; padding: 8px 0 10px; }
				.mam-settings * { flex-direction: column !important; }
				.mam-card { display: block !important; width: 100%; max-width: 760px; padding: 16px; background: linear-gradient(160deg, var(--background-secondary) 0%, var(--background-primary) 100%)); border: 1px solid var(--border-subtle); box-sizing: border-box; }
				.mam-title { display: block !important; margin: 0; color: var(--header-primary); font-size: 22px; line-height: 1.2; font-weight: 700; }
				.mam-desc { display: block !important; margin: 8px 0 0; color: var(--text-normal); opacity: 0.9; line-height: 1.45; font-size: 14px; max-width: 560px; }
				.mam-label { display: block !important; width: 100%; margin: 14px 0 8px 0; color: var(--header-secondary); font-size: 13px; font-weight: 700; letter-spacing: 0.2px; line-height: 1.25; }
				.mam-input-wrapper { display: block !important; width: 100%; padding: 1px; border-radius: 12px; border: 1px solid var(--border-subtle); box-sizing: border-box; }
				.mam-input { display: block !important; width: 100%; padding: 11px 12px; border: none; background: linear-gradient(180deg, color-mix(in oklab, var(--background-tertiary) 90%, black), var(--background-tertiary)); color: var(--text-normal); font-size: 14px; line-height: 1.3; font-family: inherit; letter-spacing: 0.2px; outline: none; appearance: none; box-sizing: border-box; }
				.mam-helper { display: block !important; width: 100%; margin: 10px 0 8px 0; opacity: 0.8; color: var(--text-muted); font-size: 12px; line-height: 1.35; }
				.mam-actions { display: block !important; width: 100%; }
			</style>`, 2), _tmpl$1 = /*#__PURE__*/ (0, import_web.template)(`<div class="mam-settings"><div class="mam-card"><h3 class="mam-title">MAM API</h3><p class="mam-desc">Add your API key to browse MAM GIF lists and search the library.</p><label for="mam-api-key-input" class="mam-label">API key</label><div class="mam-input-wrapper"><input id="mam-api-key-input" type="password" placeholder="Paste your MAM API key" autocomplete="off" spellcheck="false" class="mam-input"></div><div class="mam-helper">Stored locally in Shelter.</div><div class="mam-actions"></div></div></div>`, 17);
const { flux: { storesFlat: { SelectedChannelStore } }, observeDom, plugin: { store }, solid: { For, Show, createEffect, createMemo, createSignal, onCleanup, untrack }, solidWeb: { render: renderSolid }, ui: { Button, ButtonColors, ButtonSizes, Divider, Header, HeaderTags, Text, TextBox, TextTags, TextWeights, ToastColors, niceScrollbarsClass, showToast }, util: { log } } = shelter;
const MAM_LABEL = "MAM";
const MAM_TAB_ATTR = "data-shelter-mam-tab";
const MAM_PANEL_ATTR = "data-shelter-mam-panel";
const MAM_BOUND_ATTR = "data-shelter-mam-bound";
const MAM_PANEL_ID_ATTR = "data-shelter-mam-panel-id";
const MAM_TAB_ID_ATTR = "data-shelter-mam-tab-id";
const MAM_OWNER_ATTR = "data-shelter-mam-owner";
const API_BASE_URL = "http://127.0.0.1:8000";
store.apiKey ??= "";
const cleanupFns = new Set();
let pickerObserver = null;
let panelIdCounter = 0;
function authHeaders(apiKey) {
	return apiKey ? { "X-API-Key": apiKey } : {};
}
async function fetchMamJson(url, apiKey, signal) {
	const response = await fetch(url, {
		headers: authHeaders(apiKey),
		signal
	});
	if (!response.ok) throw new Error(response.status === 401 ? "Invalid API key." : `Request failed (${response.status}).`);
	return response.json();
}
function getNativeChannelId() {
	return SelectedChannelStore.getChannelId?.() ?? null;
}
function getActiveClassNames(tabList, sampleTab) {
	const activeTab = tabList.querySelector("[role='tab'][aria-selected='true'], [role='tab'][aria-current='page']") ?? sampleTab;
	const inactiveTab = tabList.querySelector("[role='tab']:not([aria-selected='true']):not([aria-current='page'])");
	if (!activeTab) return [];
	if (!inactiveTab) return Array.from(activeTab.classList).filter((name) => name.toLowerCase().includes("active"));
	const inactiveClasses = new Set(inactiveTab.classList);
	return Array.from(activeTab.classList).filter((name) => !inactiveClasses.has(name));
}
function setTabActiveState(tab, active, activeClassNames) {
	tab.setAttribute("aria-selected", active ? "true" : "false");
	if (active) {
		tab.setAttribute("aria-current", "page");
		tab.tabIndex = 0;
		for (const name of activeClassNames) tab.classList.add(name);
	} else {
		tab.removeAttribute("aria-current");
		tab.tabIndex = -1;
		for (const name of activeClassNames) tab.classList.remove(name);
	}
}
function getMamIds(tabList) {
	let panelId = tabList.getAttribute(MAM_PANEL_ID_ATTR);
	let tabId = tabList.getAttribute(MAM_TAB_ID_ATTR);
	if (!panelId || !tabId) {
		const id = ++panelIdCounter;
		panelId = `mam-picker-tab-panel-${id}`;
		tabId = `mam-picker-tab-${id}`;
		tabList.setAttribute(MAM_PANEL_ID_ATTR, panelId);
		tabList.setAttribute(MAM_TAB_ID_ATTR, tabId);
	}
	return {
		panelId,
		tabId
	};
}
function findPickerEntries() {
	const entries = [];
	const seen = new Set();
	const panels = document.querySelectorAll("[id$='picker-tab-panel'], [id*='picker-tab-panel']");
	for (const panel of panels) {
		const tab = document.querySelector(`[role='tab'][aria-controls='${panel.id}']`) ?? document.querySelector(`[aria-controls='${panel.id}']`);
		if (!tab) continue;
		const tabList = tab.closest("[role='tablist']") ?? tab.parentElement;
		if (!tabList || seen.has(tabList)) continue;
		seen.add(tabList);
		entries.push({
			tabList,
			sampleTab: tab,
			samplePanel: panel
		});
	}
	return entries;
}
function resolveSamplePanel(tabList, fallback) {
	const activeTab = tabList.querySelector("[role='tab'][aria-selected='true'], [role='tab'][aria-current='page']") ?? tabList.querySelector("[role='tab']:not([data-shelter-mam-tab])") ?? tabList.querySelector("[role='tab']");
	const panelId = activeTab?.getAttribute("aria-controls");
	if (panelId) {
		const panel = document.getElementById(panelId);
		if (panel) return panel;
	}
	if (fallback?.isConnected) return fallback;
	for (const tab of tabList.querySelectorAll("[role='tab'][aria-controls]")) {
		const id = tab.getAttribute("aria-controls");
		if (!id) continue;
		const panel = document.getElementById(id);
		if (panel) return panel;
	}
	return null;
}
function ensureMamPanel(samplePanel, panelId) {
	const panelContainer = samplePanel.parentElement ?? samplePanel;
	const existingPanel = panelContainer.querySelector(`[${MAM_PANEL_ATTR}]`);
	if (existingPanel) return existingPanel;
	const mamPanel = samplePanel.cloneNode(false);
	mamPanel.setAttribute(MAM_PANEL_ATTR, "");
	mamPanel.setAttribute(MAM_OWNER_ATTR, panelId);
	mamPanel.setAttribute("role", "tabpanel");
	mamPanel.id = panelId;
	mamPanel.style.display = "none";
	mamPanel.style.overflow = "hidden";
	mamPanel.innerHTML = "";
	panelContainer.appendChild(mamPanel);
	const dispose = renderSolid(() => (0, import_web$11.createComponent)(MamView, {}), mamPanel);
	cleanupFns.add(() => {
		dispose();
		mamPanel.remove();
	});
	return mamPanel;
}
function setMamActive(tabList, samplePanel, active, activeClassNames) {
	const resolvedPanel = resolveSamplePanel(tabList, samplePanel);
	if (!resolvedPanel) return;
	const mamTab = tabList.querySelector(`[${MAM_TAB_ATTR}]`);
	const mamPanel = ensureMamPanel(resolvedPanel, getMamIds(tabList).panelId);
	const panelContainer = resolvedPanel.parentElement ?? resolvedPanel;
	const panels = panelContainer.querySelectorAll("[role='tabpanel']");
	for (const panel of panels) {
		if (panel === mamPanel) continue;
		if (active) {
			if (panel.style.display !== "none") panel.dataset.shelterMamDisplay = panel.style.display;
			if (panel.dataset.shelterMamHidden === undefined) panel.dataset.shelterMamHidden = panel.hasAttribute("hidden") ? "1" : "0";
			panel.style.display = "none";
			panel.setAttribute("hidden", "");
		} else if (panel.dataset.shelterMamDisplay !== undefined) {
			panel.style.display = panel.dataset.shelterMamDisplay;
			delete panel.dataset.shelterMamDisplay;
			if (panel.dataset.shelterMamHidden !== undefined) {
				if (panel.dataset.shelterMamHidden === "1") panel.setAttribute("hidden", "");
else panel.removeAttribute("hidden");
				delete panel.dataset.shelterMamHidden;
			}
		}
	}
	if (mamTab) {
		if (active) {
			for (const tab of tabList.querySelectorAll("[role='tab']")) if (tab !== mamTab) setTabActiveState(tab, false, activeClassNames);
		}
		setTabActiveState(mamTab, active, activeClassNames);
	}
	mamPanel.style.display = active ? "" : "none";
	if (active) mamPanel.removeAttribute("hidden");
else mamPanel.setAttribute("hidden", "");
}
function injectMamTab(tabList, sampleTab, samplePanel) {
	if (tabList.hasAttribute(MAM_BOUND_ATTR)) return;
	tabList.setAttribute(MAM_BOUND_ATTR, "true");
	if (!sampleTab) return;
	const { panelId, tabId } = getMamIds(tabList);
	const activeClassNames = getActiveClassNames(tabList, sampleTab);
	const mamTab = sampleTab.cloneNode(true);
	mamTab.setAttribute(MAM_TAB_ATTR, "");
	mamTab.setAttribute("role", "tab");
	mamTab.setAttribute("aria-controls", panelId);
	mamTab.setAttribute("id", tabId);
	mamTab.textContent = MAM_LABEL;
	setTabActiveState(mamTab, false, activeClassNames);
	const onMamClick = (event) => {
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation?.();
		setMamActive(tabList, samplePanel, true, activeClassNames);
		queueMicrotask(() => setMamActive(tabList, samplePanel, true, activeClassNames));
	};
	const onMamMouseDown = (event) => {
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation?.();
		setMamActive(tabList, samplePanel, true, activeClassNames);
	};
	const onMamKeyDown = (event) => {
		if (event.key !== "Enter" && event.key !== " ") return;
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation?.();
		setMamActive(tabList, samplePanel, true, activeClassNames);
	};
	const onTabListClick = (event) => {
		const tab = event.target?.closest?.("[role='tab']");
		if (!tab || tab.hasAttribute(MAM_TAB_ATTR)) return;
		setMamActive(tabList, samplePanel, false, activeClassNames);
	};
	mamTab.addEventListener("mousedown", onMamMouseDown, true);
	mamTab.addEventListener("click", onMamClick, true);
	mamTab.addEventListener("keydown", onMamKeyDown, true);
	tabList.addEventListener("click", onTabListClick, true);
	tabList.appendChild(mamTab);
	const cleanup = () => {
		mamTab.removeEventListener("mousedown", onMamMouseDown, true);
		mamTab.removeEventListener("click", onMamClick, true);
		mamTab.removeEventListener("keydown", onMamKeyDown, true);
		tabList.removeEventListener("click", onTabListClick, true);
		const panelContainer = samplePanel.parentElement ?? samplePanel;
		for (const panel$1 of panelContainer.querySelectorAll("[role='tabpanel']")) if (panel$1.dataset.shelterMamDisplay !== undefined) {
			panel$1.style.display = panel$1.dataset.shelterMamDisplay;
			delete panel$1.dataset.shelterMamDisplay;
		}
		const panel = panelContainer.querySelector(`[${MAM_PANEL_ATTR}]`);
		if (panel) panel.remove();
		mamTab.remove();
		tabList.removeAttribute(MAM_BOUND_ATTR);
		tabList.removeAttribute(MAM_PANEL_ID_ATTR);
		tabList.removeAttribute(MAM_TAB_ID_ATTR);
	};
	cleanupFns.add(cleanup);
}
function scanForPicker() {
	for (const { tabList, sampleTab, samplePanel } of findPickerEntries()) injectMamTab(tabList, sampleTab, samplePanel);
}
function useDebouncedValue(source, delay) {
	const [value, setValue] = createSignal(source());
	createEffect(() => {
		const nextValue = source();
		const timeout = setTimeout(() => setValue(nextValue), delay);
		onCleanup(() => clearTimeout(timeout));
	});
	return value;
}
async function sendGif(gif) {
	const channelId = getNativeChannelId();
	if (!channelId) {
		showToast({
			title: "MAM",
			content: "No channel selected.",
			color: ToastColors.WARNING
		});
		return;
	}
	try {
		await shelter.http.ready;
		await shelter.http.post({
			url: `/channels/${channelId}/messages`,
			body: { content: gif.public_url }
		});
		showToast({
			title: "MAM",
			content: "GIF sent.",
			color: ToastColors.SUCCESS
		});
	} catch (error) {
		log(error, "error");
		showToast({
			title: "MAM",
			content: "Failed to send GIF.",
			color: ToastColors.CRITICAL
		});
	}
}
function GifTile(props) {
	return (() => {
		const _el$ = (0, import_web$9.getNextElement)(_tmpl$), _el$2 = _el$.firstChild;
		_el$.$$click = () => void sendGif(props.gif);
		_el$.style.setProperty("display", "block");
		_el$.style.setProperty("width", "100%");
		_el$.style.setProperty("padding", "0");
		_el$.style.setProperty("margin", "0 0 8px");
		_el$.style.setProperty("border", "none");
		_el$.style.setProperty("background", "transparent");
		_el$.style.setProperty("cursor", "pointer");
		_el$.style.setProperty("breakInside", "avoid");
		_el$.style.setProperty("pageBreakInside", "avoid");
		_el$.style.setProperty("borderRadius", "8px");
		_el$.style.setProperty("overflow", "hidden");
		_el$2.style.setProperty("display", "block");
		_el$2.style.setProperty("width", "100%");
		_el$2.style.setProperty("height", "auto");
		_el$2.style.setProperty("border-radius", "8px");
		(0, import_web$8.effect)(() => (0, import_web$7.setAttribute)(_el$2, "src", props.gif.public_url));
		(0, import_web$10.runHydrationEvents)();
		return _el$;
	})();
}
function MamView() {
	const apiKey = createMemo(() => store.apiKey.trim());
	const [query, setQuery] = createSignal("");
	const debouncedQuery = useDebouncedValue(query, 250);
	const [lists, setLists] = createSignal([]);
	const [selectedListId, setSelectedListId] = createSignal(null);
	const [viewMode, setViewMode] = createSignal("categories");
	const [searchFocused, setSearchFocused] = createSignal(false);
	const [listsLoading, setListsLoading] = createSignal(false);
	const [listsError, setListsError] = createSignal(null);
	const [listPreviews, setListPreviews] = createSignal({});
	const [items, setItems] = createSignal([]);
	const [error, setError] = createSignal(null);
	const [initialLoading, setInitialLoading] = createSignal(false);
	const [loadingMore, setLoadingMore] = createSignal(false);
	const [page, setPage] = createSignal(1);
	const [hasMore, setHasMore] = createSignal(false);
	let scrollerEl;
	createEffect(() => {
		apiKey();
		debouncedQuery();
		selectedListId();
		viewMode();
		setPage(1);
	});
	createEffect(() => {
		const queryValue = debouncedQuery().trim();
		if (queryValue && untrack(viewMode) !== "all") setViewMode("all");
	});
	createEffect(() => {
		const key = apiKey();
		const controller = new AbortController();
		onCleanup(() => controller.abort());
		if (!key) {
			setLists([]);
			setListPreviews({});
			setListsError(null);
			setListsLoading(false);
			return;
		}
		setListsLoading(true);
		setListsError(null);
		fetchMamJson(new URL("/api/gif-lists", API_BASE_URL).toString(), key, controller.signal).then((data) => setLists(Array.isArray(data) ? data : [])).catch((errorValue) => {
			if (controller.signal.aborted) return;
			setListsError(errorValue instanceof Error ? errorValue.message : "Failed to fetch lists.");
			setLists([]);
		}).finally(() => {
			if (!controller.signal.aborted) setListsLoading(false);
		});
	});
	createEffect(() => {
		const key = apiKey();
		const currentLists = lists();
		const controller = new AbortController();
		onCleanup(() => controller.abort());
		if (!key) return;
		(async () => {
			const previewMap = {};
			const fetchFirstGif = async (url) => {
				try {
					const data = await fetchMamJson(url.toString(), key, controller.signal);
					if (Array.isArray(data?.items) && data.items.length > 0) return data.items[0]?.public_url ?? null;
				} catch {
					return null;
				}
				return null;
			};
			const allUrl = new URL("/api/gifs", API_BASE_URL);
			allUrl.searchParams.set("limit", "1");
			allUrl.searchParams.set("page", "1");
			allUrl.searchParams.set("nsfw", "false");
			allUrl.searchParams.set("visibility", "published");
			previewMap.all = await fetchFirstGif(allUrl);
			for (const entry of currentLists) {
				const url = new URL(`/api/gif-lists/${entry.id}/items`, API_BASE_URL);
				url.searchParams.set("limit", "1");
				url.searchParams.set("page", "1");
				url.searchParams.set("nsfw", "false");
				previewMap[entry.id.toString()] = await fetchFirstGif(url);
			}
			if (!controller.signal.aborted) setListPreviews(previewMap);
		})();
	});
	createEffect(() => {
		const key = apiKey();
		const mode = viewMode();
		const listId = selectedListId();
		const currentPage = page();
		const queryValue = debouncedQuery().trim();
		const controller = new AbortController();
		onCleanup(() => controller.abort());
		if (mode === "categories") {
			setInitialLoading(false);
			setLoadingMore(false);
			return;
		}
		if (!key) {
			setItems([]);
			setHasMore(false);
			setError("Set your MAM API key in the plugin settings.");
			setInitialLoading(false);
			setLoadingMore(false);
			return;
		}
		const isPaginating = currentPage > 1;
		setError(null);
		setLoadingMore(isPaginating);
		setInitialLoading(!isPaginating);
		if (!isPaginating) setItems([]);
		let url;
		if (mode === "list" && listId != null) {
			url = new URL(`/api/gif-lists/${listId}/items`, API_BASE_URL);
			url.searchParams.set("limit", isPaginating ? "10" : "20");
			url.searchParams.set("page", String(currentPage));
			url.searchParams.set("nsfw", "false");
		} else {
			url = new URL("/api/gifs", API_BASE_URL);
			if (queryValue) url.searchParams.set("q", queryValue);
			url.searchParams.set("limit", isPaginating ? "10" : "20");
			url.searchParams.set("page", String(currentPage));
			url.searchParams.set("nsfw", "false");
			url.searchParams.set("visibility", "published");
		}
		fetchMamJson(url.toString(), key, controller.signal).then((data) => {
			if (controller.signal.aborted) return;
			const nextItems = Array.isArray(data?.items) ? data.items : [];
			setItems((previous) => isPaginating ? [...previous, ...nextItems] : nextItems);
			const pagination = data?.pagination;
			setHasMore(typeof pagination?.has_more === "boolean" ? pagination.has_more : pagination?.next_page != null);
		}).catch((errorValue) => {
			if (controller.signal.aborted) return;
			setError(errorValue instanceof Error ? errorValue.message : "Request failed.");
			if (!isPaginating) setItems([]);
			setHasMore(false);
		}).finally(() => {
			if (controller.signal.aborted) return;
			setInitialLoading(false);
			setLoadingMore(false);
		});
	});
	createEffect(() => {
		const scroller = scrollerEl;
		if (!scroller) return;
		const check = () => {
			if (!hasMore() || loadingMore() || initialLoading()) return;
			const distanceFromBottom = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
			if (distanceFromBottom < 600) setPage((current) => current + 1);
		};
		check();
		scroller.addEventListener("scroll", check, { passive: true });
		onCleanup(() => scroller.removeEventListener("scroll", check));
	});
	const showCategories = () => viewMode() === "categories";
	const renderCategoryGrid = () => {
		if (listsLoading()) return (0, import_web$11.createComponent)(Text, {
			get tag() {
				return TextTags.textSM;
			},
			children: "Loading lists…"
		});
		if (listsError()) return (0, import_web$11.createComponent)(Text, {
			get tag() {
				return TextTags.textSM;
			},
			style: { color: "var(--status-danger)" },
			get children() {
				return listsError();
			}
		});
		const entries = [{
			id: null,
			name: "All GIFs",
			key: "all"
		}, ...lists().map((entry) => ({
			id: entry.id,
			name: entry.name,
			key: entry.id.toString()
		}))];
		return (() => {
			const _el$3 = (0, import_web$9.getNextElement)(_tmpl$2);
			_el$3.style.setProperty("display", "grid");
			_el$3.style.setProperty("gap", "8px");
			_el$3.style.setProperty("grid-template-columns", "repeat(auto-fill, minmax(160px, 1fr))");
			(0, import_web$6.insert)(_el$3, (0, import_web$11.createComponent)(For, {
				each: entries,
				children: (entry) => {
					const active = viewMode() === "all" && entry.id === null || viewMode() === "list" && selectedListId() === entry.id;
					const previewUrl = listPreviews()[entry.key] ?? null;
					return (() => {
						const _el$4 = (0, import_web$9.getNextElement)(_tmpl$4), _el$8 = _el$4.firstChild, [_el$9, _co$] = (0, import_web$5.getNextMarker)(_el$8.nextSibling), _el$6 = _el$9.nextSibling, _el$7 = _el$6.nextSibling;
						_el$4.$$click = () => {
							setQuery("");
							if (entry.id === null) {
								setSelectedListId(null);
								setViewMode("all");
							} else {
								setSelectedListId(entry.id);
								setViewMode("list");
							}
						};
						_el$4.style.setProperty("position", "relative");
						_el$4.style.setProperty("border", "none");
						_el$4.style.setProperty("padding", "0");
						_el$4.style.setProperty("background", "transparent");
						_el$4.style.setProperty("borderRadius", "8px");
						_el$4.style.setProperty("cursor", "pointer");
						_el$4.style.setProperty("overflow", "hidden");
						_el$4.style.setProperty("height", "100px");
						(0, import_web$6.insert)(_el$4, (0, import_web$11.createComponent)(Show, {
							when: previewUrl,
							get fallback() {
								return (() => {
									const _el$0 = (0, import_web$9.getNextElement)(_tmpl$2);
									_el$0.style.setProperty("width", "100%");
									_el$0.style.setProperty("height", "100%");
									_el$0.style.setProperty("background-color", "var(--background-tertiary)");
									return _el$0;
								})();
							},
							get children() {
								const _el$5 = (0, import_web$9.getNextElement)(_tmpl$3);
								(0, import_web$7.setAttribute)(_el$5, "src", previewUrl);
								_el$5.style.setProperty("width", "100%");
								_el$5.style.setProperty("height", "100%");
								_el$5.style.setProperty("object-fit", "cover");
								return _el$5;
							}
						}), _el$9, _co$);
						_el$6.style.setProperty("position", "absolute");
						_el$6.style.setProperty("top", "0");
						_el$6.style.setProperty("left", "0");
						_el$6.style.setProperty("right", "0");
						_el$6.style.setProperty("bottom", "0");
						_el$6.style.setProperty("background-color", active ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.35)");
						_el$6.style.setProperty("transition", "background-color 0.2s");
						_el$7.style.setProperty("position", "absolute");
						_el$7.style.setProperty("top", "50%");
						_el$7.style.setProperty("left", "50%");
						_el$7.style.setProperty("transform", "translate(-50%, -50%)");
						_el$7.style.setProperty("color", "white");
						_el$7.style.setProperty("font-weight", "700");
						_el$7.style.setProperty("text-shadow", "0 0 4px rgba(0,0,0,0.8)");
						_el$7.style.setProperty("pointer-events", "none");
						_el$7.style.setProperty("text-align", "center");
						_el$7.style.setProperty("padding", "0 8px");
						(0, import_web$6.insert)(_el$7, () => entry.name);
						(0, import_web$8.effect)((_p$) => {
							const _v$ = entry.name, _v$2 = entry.name;
							_v$ !== _p$._v$ && (0, import_web$7.setAttribute)(_el$4, "aria-label", _p$._v$ = _v$);
							_v$2 !== _p$._v$2 && (0, import_web$7.setAttribute)(_el$4, "title", _p$._v$2 = _v$2);
							return _p$;
						}, {
							_v$: undefined,
							_v$2: undefined
						});
						(0, import_web$10.runHydrationEvents)();
						return _el$4;
					})();
				}
			}));
			return _el$3;
		})();
	};
	return [(0, import_web$9.getNextElement)(_tmpl$5), (() => {
		const _el$10 = (0, import_web$9.getNextElement)(_tmpl$9), _el$11 = _el$10.firstChild, _el$19 = _el$11.firstChild, [_el$20, _co$3] = (0, import_web$5.getNextMarker)(_el$19.nextSibling), _el$21 = _el$20.nextSibling, [_el$22, _co$4] = (0, import_web$5.getNextMarker)(_el$21.nextSibling), _el$25 = _el$11.nextSibling, [_el$26, _co$5] = (0, import_web$5.getNextMarker)(_el$25.nextSibling), _el$23 = _el$26.nextSibling, _el$24 = _el$23.firstChild;
		(0, import_web$6.insert)(_el$11, (0, import_web$11.createComponent)(Show, {
			get when() {
				return viewMode() !== "categories";
			},
			get children() {
				return (0, import_web$11.createComponent)(Button, {
					get size() {
						return ButtonSizes.SMALL;
					},
					get color() {
						return ButtonColors.PRIMARY;
					},
					onClick: () => {
						setQuery("");
						setViewMode("categories");
						setSelectedListId(null);
					},
					"aria-label": "Back to categories",
					title: "Back",
					get children() {
						return (0, import_web$9.getNextElement)(_tmpl$6);
					}
				});
			}
		}), _el$20, _co$3);
		(0, import_web$6.insert)(_el$11, (0, import_web$11.createComponent)(Show, {
			get when() {
				return viewMode() !== "list";
			},
			get children() {
				const _el$13 = (0, import_web$9.getNextElement)(_tmpl$8), _el$14 = _el$13.firstChild, _el$15 = _el$14.nextSibling, _el$17 = _el$15.nextSibling, [_el$18, _co$2] = (0, import_web$5.getNextMarker)(_el$17.nextSibling);
				_el$13.style.setProperty("flex", "1");
				_el$13.style.setProperty("display", "flex");
				_el$13.style.setProperty("align-items", "center");
				_el$13.style.setProperty("gap", "6px");
				_el$13.style.setProperty("height", "32px");
				_el$13.style.setProperty("padding", "0 10px");
				_el$13.style.setProperty("background-color", "var(--background-secondary)");
				_el$13.style.setProperty("transition", "border-color 0.15s ease");
				_el$13.style.setProperty("line-height", "0");
				_el$13.style.setProperty("box-sizing", "border-box");
				_el$14.style.setProperty("color", "var(--text-muted)");
				_el$14.style.setProperty("flex", "0 0 16px");
				_el$14.style.setProperty("display", "flex");
				_el$14.style.setProperty("align-items", "center");
				_el$14.style.setProperty("justify-content", "center");
				_el$15.addEventListener("blur", () => setSearchFocused(false));
				_el$15.addEventListener("focus", () => setSearchFocused(true));
				_el$15.$$input = (e) => setQuery(e.currentTarget.value);
				_el$15.style.setProperty("flex", "1");
				_el$15.style.setProperty("height", "100%");
				_el$15.style.setProperty("font-size", "14px");
				_el$15.style.setProperty("outline", "none");
				(0, import_web$6.insert)(_el$13, (0, import_web$11.createComponent)(Show, {
					get when() {
						return query() !== "";
					},
					get children() {
						const _el$16 = (0, import_web$9.getNextElement)(_tmpl$7);
						_el$16.$$click = () => setQuery("");
						_el$16.style.setProperty("border", "none");
						_el$16.style.setProperty("background", "transparent");
						_el$16.style.setProperty("color", "var(--text-muted)");
						_el$16.style.setProperty("cursor", "pointer");
						_el$16.style.setProperty("padding", "0");
						_el$16.style.setProperty("font-size", "16px");
						_el$16.style.setProperty("line-height", "1");
						(0, import_web$10.runHydrationEvents)();
						return _el$16;
					}
				}), _el$18, _co$2);
				(0, import_web$8.effect)(() => _el$13.style.setProperty("border", searchFocused() ? "2px solid var(--brand-500)" : "2px solid var(--background-tertiary)"));
				(0, import_web$8.effect)(() => _el$15.value = query());
				(0, import_web$10.runHydrationEvents)();
				return _el$13;
			}
		}), _el$22, _co$4);
		(0, import_web$6.insert)(_el$10, (0, import_web$11.createComponent)(Show, {
			get when() {
				return error();
			},
			get children() {
				return (0, import_web$11.createComponent)(Text, {
					get tag() {
						return TextTags.textSM;
					},
					style: {
						padding: "0 12px 8px",
						color: "var(--status-danger)"
					},
					get children() {
						return error();
					}
				});
			}
		}), _el$26, _co$5);
		(0, import_web$4.use)((el) => {
			scrollerEl = el;
		}, _el$23);
		_el$23.style.setProperty("flex", "1");
		_el$23.style.setProperty("overflow", "auto");
		_el$24.style.setProperty("padding", "8px 16px 12px");
		(0, import_web$6.insert)(_el$24, (0, import_web$11.createComponent)(Show, {
			get when() {
				return showCategories();
			},
			get fallback() {
				return (0, import_web$11.createComponent)(Show, {
					get when() {
						return !initialLoading();
					},
					get fallback() {
						return (0, import_web$11.createComponent)(Text, {
							get tag() {
								return TextTags.textSM;
							},
							children: "Loading…"
						});
					},
					get children() {
						return [(0, import_web$11.createComponent)(Show, {
							get when() {
								return items().length > 0;
							},
							get fallback() {
								return (() => {
									const _el$28 = (0, import_web$9.getNextElement)(_tmpl$2);
									_el$28.style.setProperty("width", "100%");
									_el$28.style.setProperty("display", "flex");
									_el$28.style.setProperty("justify-content", "center");
									_el$28.style.setProperty("padding", "8px 0");
									(0, import_web$6.insert)(_el$28, (0, import_web$11.createComponent)(Text, {
										get tag() {
											return TextTags.textSM;
										},
										get children() {
											return selectedListId() === null ? "No results." : "No items in this list.";
										}
									}));
									return _el$28;
								})();
							},
							get children() {
								const _el$27 = (0, import_web$9.getNextElement)(_tmpl$2);
								_el$27.style.setProperty("column-width", "160px");
								_el$27.style.setProperty("column-gap", "8px");
								(0, import_web$6.insert)(_el$27, (0, import_web$11.createComponent)(For, {
									get each() {
										return items();
									},
									children: (gif) => (0, import_web$11.createComponent)(GifTile, { gif })
								}));
								return _el$27;
							}
						}), (0, import_web$11.createComponent)(Show, {
							get when() {
								return loadingMore();
							},
							get children() {
								return (0, import_web$11.createComponent)(Text, {
									get tag() {
										return TextTags.textXS;
									},
									style: {
										"text-align": "center",
										padding: "8px 0 4px",
										opacity: .6
									},
									children: "Loading…"
								});
							}
						})];
					}
				});
			},
			get children() {
				return renderCategoryGrid();
			}
		}));
		(0, import_web$8.effect)(() => (0, import_web$3.className)(_el$23, niceScrollbarsClass()));
		return _el$10;
	})()];
}
function settings() {
	const apiKeyId = "mam-api-key-input";
	const [apiFocused, setApiFocused] = createSignal(false);
	return [(0, import_web$9.getNextElement)(_tmpl$0), (() => {
		const _el$30 = (0, import_web$9.getNextElement)(_tmpl$1), _el$31 = _el$30.firstChild, _el$32 = _el$31.firstChild, _el$33 = _el$32.nextSibling, _el$34 = _el$33.nextSibling, _el$35 = _el$34.nextSibling, _el$36 = _el$35.firstChild, _el$37 = _el$35.nextSibling, _el$38 = _el$37.nextSibling;
		_el$35.style.setProperty("transition", "background-color 0.15s ease, box-shadow 0.15s ease");
		_el$36.addEventListener("blur", () => setApiFocused(false));
		_el$36.addEventListener("focus", () => setApiFocused(true));
		_el$36.$$input = (event) => {
			store.apiKey = event.currentTarget.value;
		};
		(0, import_web$6.insert)(_el$38, (0, import_web$11.createComponent)(Button, {
			get size() {
				return ButtonSizes.SMALL;
			},
			get color() {
				return ButtonColors.SECONDARY;
			},
			onClick: () => {
				store.apiKey = "";
			},
			children: "Clear key"
		}));
		(0, import_web$8.effect)((_p$) => {
			const _v$3 = apiFocused() ? "var(--brand-500)" : "var(--border-subtle)", _v$4 = apiFocused() ? "0 0 0 3px color-mix(in oklab, var(--brand-500) 30%, transparent)" : "none";
			_v$3 !== _p$._v$3 && _el$35.style.setProperty("backgroundColor", _p$._v$3 = _v$3);
			_v$4 !== _p$._v$4 && _el$35.style.setProperty("boxShadow", _p$._v$4 = _v$4);
			return _p$;
		}, {
			_v$3: undefined,
			_v$4: undefined
		});
		(0, import_web$8.effect)(() => _el$36.value = store.apiKey);
		(0, import_web$10.runHydrationEvents)();
		return _el$30;
	})()];
}
function onLoad() {
	log("[MAM] loading shelter plugin");
	pickerObserver = observeDom("[id$='picker-tab-panel'], [id*='picker-tab-panel']", () => {
		scanForPicker();
	});
	scanForPicker();
	const fallback = setTimeout(scanForPicker, 500);
	cleanupFns.add(() => clearTimeout(fallback));
}
function onUnload() {
	pickerObserver?.();
	pickerObserver = null;
	for (const cleanup of cleanupFns) cleanup();
	cleanupFns.clear();
	log("[MAM] unloading shelter plugin");
}
(0, import_web$1.delegateEvents)(["click", "input"]);

//#endregion
exports.onLoad = onLoad
exports.onUnload = onUnload
exports.settings = settings
return exports;
})({});