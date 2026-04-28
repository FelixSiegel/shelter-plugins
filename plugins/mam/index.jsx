const {
	flux: {
		storesFlat: { SelectedChannelStore }
	},
	observeDom,
	plugin: { store },
	solid: {
		For,
		Show,
		createEffect,
		createMemo,
		createSignal,
		onCleanup
	},
	solidWeb: { render: renderSolid },
	ui: {
		Button,
		ButtonColors,
		ButtonSizes,
		Divider,
		Header,
		HeaderTags,
		Text,
		TextBox,
		TextTags,
		TextWeights,
		ToastColors,
		niceScrollbarsClass,
		showToast
	},
	util: { log }
} = shelter;

const MAM_LABEL = "MAM";
const MAM_TAB_ATTR = "data-shelter-mam-tab";
const MAM_PANEL_ATTR = "data-shelter-mam-panel";
const MAM_BOUND_ATTR = "data-shelter-mam-bound";
const MAM_PANEL_ID_ATTR = "data-shelter-mam-panel-id";
const MAM_TAB_ID_ATTR = "data-shelter-mam-tab-id";
const MAM_OWNER_ATTR = "data-shelter-mam-owner";
const API_BASE_URL = "https://www.midevelopment.de";

store.apiKey ??= "";

const cleanupFns = new Set();
let pickerObserver = null;
let panelIdCounter = 0;

function authHeaders(apiKey) {
	return apiKey ? {"X-API-Key": apiKey} : {};
}

async function fetchMamJson(url, apiKey, signal) {
	const response = await fetch(url, {
		headers: authHeaders(apiKey),
		signal
	});

	if (!response.ok) {
		throw new Error(response.status === 401 ? "Invalid API key." : `Request failed (${response.status}).`);
	}

	return response.json();
}

function getNativeChannelId() {
	return SelectedChannelStore.getChannelId?.() ?? null;
}

function getActiveClassNames(tabList, sampleTab) {
	const activeTab = tabList.querySelector("[role='tab'][aria-selected='true'], [role='tab'][aria-current='page']") ?? sampleTab;
	const inactiveTab = tabList.querySelector("[role='tab']:not([aria-selected='true']):not([aria-current='page'])");

	if (!activeTab) return [];
	if (!inactiveTab) return Array.from(activeTab.classList).filter(name => name.toLowerCase().includes("active"));

	const inactiveClasses = new Set(inactiveTab.classList);
	return Array.from(activeTab.classList).filter(name => !inactiveClasses.has(name));
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

	return {panelId, tabId};
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
		entries.push({tabList, sampleTab: tab, samplePanel: panel});
	}

	return entries;
}

function resolveSamplePanel(tabList, fallback) {
	const activeTab = tabList.querySelector("[role='tab'][aria-selected='true'], [role='tab'][aria-current='page']")
		?? tabList.querySelector("[role='tab']:not([data-shelter-mam-tab])")
		?? tabList.querySelector("[role='tab']");
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
	const dispose = renderSolid(() => <MamView />, mamPanel);
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
			for (const tab of tabList.querySelectorAll("[role='tab']")) {
				if (tab !== mamTab) setTabActiveState(tab, false, activeClassNames);
			}
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

	const {panelId, tabId} = getMamIds(tabList);
	const activeClassNames = getActiveClassNames(tabList, sampleTab);
	const mamTab = sampleTab.cloneNode(true);
	mamTab.setAttribute(MAM_TAB_ATTR, "");
	mamTab.setAttribute("role", "tab");
	mamTab.setAttribute("aria-controls", panelId);
	mamTab.setAttribute("id", tabId);
	mamTab.textContent = MAM_LABEL;
	setTabActiveState(mamTab, false, activeClassNames);

	const onMamClick = event => {
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation?.();
		setMamActive(tabList, samplePanel, true, activeClassNames);
		queueMicrotask(() => setMamActive(tabList, samplePanel, true, activeClassNames));
	};

	const onMamMouseDown = event => {
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation?.();
		setMamActive(tabList, samplePanel, true, activeClassNames);
	};

	const onMamKeyDown = event => {
		if (event.key !== "Enter" && event.key !== " ") return;
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation?.();
		setMamActive(tabList, samplePanel, true, activeClassNames);
	};

	const onTabListClick = event => {
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
		for (const panel of panelContainer.querySelectorAll("[role='tabpanel']")) {
			if (panel.dataset.shelterMamDisplay !== undefined) {
				panel.style.display = panel.dataset.shelterMamDisplay;
				delete panel.dataset.shelterMamDisplay;
			}
		}

		const panel = panelContainer.querySelector(`[${MAM_PANEL_ATTR}]`);
		if (panel) {
			panel.remove();
		}

		mamTab.remove();
		tabList.removeAttribute(MAM_BOUND_ATTR);
		tabList.removeAttribute(MAM_PANEL_ID_ATTR);
		tabList.removeAttribute(MAM_TAB_ID_ATTR);
	};

	cleanupFns.add(cleanup);
}

function scanForPicker() {
	for (const {tabList, sampleTab, samplePanel} of findPickerEntries()) {
		injectMamTab(tabList, sampleTab, samplePanel);
	}
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
		showToast({title: "MAM", content: "No channel selected.", color: ToastColors.WARNING});
		return;
	}

	try {
		await shelter.http.ready;
		await shelter.http.post({
			url: `/channels/${channelId}/messages`,
			body: {content: gif.public_url}
		});
		showToast({title: "MAM", content: "GIF sent.", color: ToastColors.SUCCESS});
	} catch (error) {
		log(error, "error");
		showToast({title: "MAM", content: "Failed to send GIF.", color: ToastColors.CRITICAL});
	}
}

function GifTile(props) {
	return (
		<button
			onClick={() => void sendGif(props.gif)}
			style={{
				display: "block",
				width: "100%",
				padding: 0,
				margin: "0 0 8px",
				border: "none",
				background: "transparent",
				cursor: "pointer",
				breakInside: "avoid",
				pageBreakInside: "avoid",
				borderRadius: "8px",
				overflow: "hidden"
			}}
			aria-label="Send GIF"
			title="Send GIF"
		>
			<img
				src={props.gif.public_url}
				loading="lazy"
				style={{display: "block", width: "100%", height: "auto", borderRadius: "8px"}}
			/>
		</button>
	);
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
		if (queryValue && viewMode() !== "all") setViewMode("all");
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
		fetchMamJson(new URL("/api/gif-lists", API_BASE_URL).toString(), key, controller.signal)
			.then(data => setLists(Array.isArray(data) ? data : []))
			.catch(errorValue => {
				if (controller.signal.aborted) return;
				setListsError(errorValue instanceof Error ? errorValue.message : "Failed to fetch lists.");
				setLists([]);
			})
			.finally(() => {
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
			const fetchFirstGif = async url => {
				try {
					const data = await fetchMamJson(url.toString(), key, controller.signal);
					if (Array.isArray(data?.items) && data.items.length > 0) {
						return data.items[0]?.public_url ?? null;
					}
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

		fetchMamJson(url.toString(), key, controller.signal)
			.then(data => {
				if (controller.signal.aborted) return;
				const nextItems = Array.isArray(data?.items) ? data.items : [];
				setItems(previous => isPaginating ? [...previous, ...nextItems] : nextItems);
				const pagination = data?.pagination;
				setHasMore(typeof pagination?.has_more === "boolean" ? pagination.has_more : pagination?.next_page != null);
			})
			.catch(errorValue => {
				if (controller.signal.aborted) return;
				setError(errorValue instanceof Error ? errorValue.message : "Request failed.");
				if (!isPaginating) setItems([]);
				setHasMore(false);
			})
			.finally(() => {
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
			if (distanceFromBottom < 600) {
				setPage(current => current + 1);
			}
		};

		check();
		scroller.addEventListener("scroll", check, {passive: true});
		onCleanup(() => scroller.removeEventListener("scroll", check));
	});

	const showCategories = () => viewMode() === "categories";

	const renderCategoryGrid = () => {
		if (listsLoading()) {
			return <Text tag={TextTags.textSM}>Loading lists…</Text>;
		}

		if (listsError()) {
			return <Text tag={TextTags.textSM} style={{color: "var(--status-danger)"}}>{listsError()}</Text>;
		}

		const entries = [
			{id: null, name: "All GIFs", key: "all"},
			...lists().map(entry => ({id: entry.id, name: entry.name, key: entry.id.toString()}))
		];

		return (
			<div style={{display: "grid", gap: "8px", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))"}}>
				<For each={entries}>{entry => {
					const active = (viewMode() === "all" && entry.id === null) || (viewMode() === "list" && selectedListId() === entry.id);
					const previewUrl = listPreviews()[entry.key] ?? null;
					return (
						<button
							onClick={() => {
								setQuery("");
								if (entry.id === null) {
									setSelectedListId(null);
									setViewMode("all");
								} else {
									setSelectedListId(entry.id);
									setViewMode("list");
								}
							}}
							style={{
								position: "relative",
								border: "none",
								padding: 0,
								background: "transparent",
								borderRadius: "8px",
								cursor: "pointer",
								overflow: "hidden",
								height: "100px"
							}}
							aria-label={entry.name}
							title={entry.name}
						>
							<Show when={previewUrl} fallback={<div style={{width: "100%", height: "100%", backgroundColor: "var(--background-tertiary)"}} />}>
								<img src={previewUrl} loading="lazy" style={{width: "100%", height: "100%", objectFit: "cover"}} />
							</Show>
							<div style={{
								position: "absolute",
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: active ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.35)",
								transition: "background-color 0.2s"
							}} />
							<div style={{
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
								color: "white",
								fontWeight: 700,
								textShadow: "0 0 4px rgba(0,0,0,0.8)",
								pointerEvents: "none",
								textAlign: "center",
								padding: "0 8px"
							}}>
								{entry.name}
							</div>
						</button>
					);
				}}</For>
			</div>
		);
	};

	return (
		<div style={{display: "flex", flexDirection: "column", height: "100%", overflow: "hidden"}}>
			<div style={{padding: "8px 12px", display: "flex", gap: "8px", alignItems: "center"}}>
				<Show when={viewMode() !== "categories"}>
					<Button size={ButtonSizes.SMALL} color={ButtonColors.SECONDARY} onClick={() => {
						setQuery("");
						setSelectedListId(null);
						setViewMode("categories");
					}}>
						Back
					</Button>
				</Show>
				<Show when={viewMode() !== "list"}>
					<div style={{display: "flex", alignItems: "center", gap: "8px", flex: 1}}>
						<TextBox
							value={query()}
							placeholder="Search GIFs"
							onInput={setQuery}
							onFocus={() => setSearchFocused(true)}
							onBlur={() => setSearchFocused(false)}
							type="text"
							style={{
								flex: 1,
								boxShadow: searchFocused() ? "0 0 0 2px var(--brand-500)" : "none"
							}}
						/>
						<Show when={query() !== ""}>
							<Button
								size={ButtonSizes.SMALL}
								color={ButtonColors.SECONDARY}
								onClick={() => setQuery("")}
								aria-label="Clear search"
							>
								×
							</Button>
						</Show>
					</div>
				</Show>
			</div>

			<Show when={error()}>
				<Text tag={TextTags.textSM} style={{padding: "0 12px 8px", color: "var(--status-danger)"}}>
					{error()}
				</Text>
			</Show>

			<div ref={el => { scrollerEl = el; }} style={{flex: 1, overflow: "auto"}} class={niceScrollbarsClass()}>
				<div style={{padding: "8px 16px 12px"}}>
					<Show when={showCategories()} fallback={
						<Show when={!initialLoading()} fallback={<Text tag={TextTags.textSM}>Loading…</Text>}>
							<Show when={items().length > 0} fallback={<Text tag={TextTags.textSM}>{selectedListId() === null ? "No results." : "No items in this list."}</Text>}>
								<div style={{columnWidth: "160px", columnGap: "8px"}}>
									<For each={items()}>{gif => <GifTile gif={gif} />}</For>
								</div>
							</Show>
							<Show when={loadingMore()}>
								<Text tag={TextTags.textXS} style={{textAlign: "center", padding: "8px 0 4px", opacity: 0.6}}>
									Loading…
								</Text>
							</Show>
						</Show>
					}>
						{renderCategoryGrid()}
					</Show>
				</div>
			</div>
		</div>
	);
}

export function settings() {
	const apiKeyId = "mam-api-key-input";

	return (
		<div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
			<Header tag={HeaderTags.HeadingLG}>MAM</Header>
			<Text tag={TextTags.textSM} weight={TextWeights.normal} style={{opacity: 0.8}}>
				Add your API key to browse MAM GIF lists and search the library.
			</Text>
			<Divider />
			<div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
				<label for={apiKeyId}>
					<Text tag={TextTags.textSM} weight={TextWeights.semibold}>API key</Text>
				</label>
				<TextBox
					id={apiKeyId}
					value={store.apiKey}
					type="password"
					placeholder="Paste your MAM API key"
					onInput={value => {
						store.apiKey = value;
					}}
					autocomplete="off"
					spellcheck={false}
				/>
				<div style={{display: "flex", gap: "8px", alignItems: "center"}}>
					<Button size={ButtonSizes.SMALL} color={ButtonColors.SECONDARY} onClick={() => {
						store.apiKey = "";
					}}>
						Clear key
					</Button>
					<Text tag={TextTags.textXS} style={{opacity: 0.7}}>
						Stored locally in Shelter.
					</Text>
				</div>
			</div>
		</div>
	);
}

export function onLoad() {
	log("[MAM] loading shelter plugin");
	pickerObserver = observeDom("[id$='picker-tab-panel'], [id*='picker-tab-panel']", () => {
		scanForPicker();
	});
	scanForPicker();
	const fallback = setTimeout(scanForPicker, 500);
	cleanupFns.add(() => clearTimeout(fallback));
}

export function onUnload() {
	pickerObserver?.();
	pickerObserver = null;
	for (const cleanup of cleanupFns) cleanup();
	cleanupFns.clear();
	log("[MAM] unloading shelter plugin");
}
