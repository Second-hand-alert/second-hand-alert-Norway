(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    /**
     * A queue of expressions to run as soon as an async slot opens up.
     */
    const queueStack = new Set();
    /**
     * A stack of functions to run on the next tick.
     */
    const nextTicks = new Set();
    function isTpl(template) {
        return typeof template === 'function' && !!template.isT;
    }
    /**
     * Utility that ensures we only attempt to make reactive objects that _can_ be made reactive.
     *
     * Examples of objects that cause issues: NodeList, HTMLElement
     * @see {@link https://github.com/vuejs/core/blob/8998afa42755cbdb3403cd6c0fe158980da8492c/packages/reactivity/src/reactive.ts#L43-L62}
     */
    // export function canReactiveWrap(maybeObj: any): boolean {
    //   return ['Object', 'Array'].includes(
    //     // from https://github.com/vuejs/core/blob/8998afa42755cbdb3403cd6c0fe158980da8492c/packages/shared/src/general.ts#L64-L67
    //     // extracts "Type" from "[object Type]"
    //     Object.prototype.toString.call(maybeObj).slice(8, -1)
    //   )
    // }
    function isReactiveFunction(fn) {
        return '$on' in fn;
    }
    /**
     * Queue an item to execute after all synchronous functions have been run. This
     * is used for `w()` to ensure multiple dependency mutations tracked on the
     * same expression do not result in multiple calls.
     * @param  {CallableFunction} fn
     * @returns ObserverCallback
     */
    function queue(fn) {
        return (newValue, oldValue) => {
            function executeQueue() {
                // copy the current queues and clear it to allow new items to be added
                // during the execution of the current queue.
                const queue = Array.from(queueStack);
                queueStack.clear();
                const ticks = Array.from(nextTicks);
                nextTicks.clear();
                queue.forEach((fn) => fn(newValue, oldValue));
                ticks.forEach((fn) => fn());
                if (queueStack.size) {
                    // we received new items while executing the queue, so we need to
                    // execute the queue again.
                    queueMicrotask(executeQueue);
                }
            }
            if (!queueStack.size) {
                queueMicrotask(executeQueue);
            }
            queueStack.add(fn);
        };
    }
    const measurements = {};
    /**
     * A simple benchmarking function.
     * @param label - A label for the measurement
     * @param fn - A function to measure or a number to record
     * @returns
     */
    function measure(label, fn) {
        const start = performance.now();
        const isFn = typeof fn === 'function';
        label = isFn ? `${label} (ms)` : `${label} (calls)`;
        const x = isFn ? fn() : fn;
        const result = isFn ? performance.now() - start : fn;
        if (!measurements[label])
            measurements[label] = [result];
        else
            measurements[label].push(result);
        return x;
    }

    /**
     * A "global" dependency tracker object.
     */
    const dependencyCollector = new Map();
    /**
     * Watch a function and track any reactive dependencies on it, re-calling it if
     * those dependencies are changed.
     * @param  {CallableFunction} fn
     * @param  {CallableFunction} after?
     * @returns unknown
     */
    function w(fn, after) {
        const trackingId = Symbol();
        if (!dependencyCollector.has(trackingId)) {
            dependencyCollector.set(trackingId, new Map());
        }
        let currentDeps = new Map();
        const queuedCallFn = queue(callFn);
        function callFn() {
            dependencyCollector.set(trackingId, new Map());
            const value = fn();
            const newDeps = dependencyCollector.get(trackingId);
            dependencyCollector.delete(trackingId);
            // Disable existing properties
            currentDeps.forEach((propertiesToUnobserve, proxy) => {
                const newProperties = newDeps.get(proxy);
                if (newProperties) {
                    newProperties.forEach((prop) => propertiesToUnobserve.delete(prop));
                }
                propertiesToUnobserve.forEach((prop) => proxy.$off(prop, queuedCallFn));
            });
            // Start observing new properties.
            newDeps.forEach((properties, proxy) => {
                properties.forEach((prop) => proxy.$on(prop, queuedCallFn));
            });
            currentDeps = newDeps;
            return after ? after(value) : value;
        }
        // If this is a reactive function, then when the expression is updated, re-run
        if (isReactiveFunction(fn))
            fn.$on(callFn);
        return callFn();
    }

    /**
     * Event listeners that were bound by arrow and should be cleaned up should the
     * given node be garbage collected.
     */
    const listeners = new WeakMap();
    /**
     * A list of HTML templates to a HTMLTemplate element that contains instances
     * of each. This acts as a cache.
     */
    const templateMemo = {};
    /**
     * The delimiter that describes where expressions are located.
     */
    const delimiter = '➳❍';
    const bookend = '❍⇚';
    const delimiterComment = `<!--${delimiter}-->`;
    const bookendComment = `<!--${bookend}-->`;
    /**
     * The template tagging function, used like: html`<div></div>`(mountEl)
     * @param  {TemplateStringsArray} strings
     * @param  {any[]} ...expressions
     * @returns ArrowTemplate
     */
    function t(strings, ...expSlots) {
        const expressions = [];
        let str = '';
        const addExpressions = (expression, html) => {
            if (typeof expression === 'function') {
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                let observer = () => { };
                expressions.push(Object.assign((...args) => expression(...args), {
                    e: expression,
                    $on: (obs) => {
                        observer = obs;
                    },
                    _up: (exp) => {
                        expression = exp;
                        observer();
                    },
                }));
                return html + delimiterComment;
            }
            if (Array.isArray(expression)) {
                return expression.reduce((html, exp) => addExpressions(exp, html), html);
            }
            return html + expression;
        };
        const toString = () => {
            if (!str) {
                if (!expSlots.length && strings.length === 1 && strings[0] === '') {
                    str = '<!---->';
                }
                else {
                    str = strings.reduce(function interlaceTemplate(html, strVal, i) {
                        html += strVal;
                        return expSlots[i] !== undefined
                            ? addExpressions(expSlots[i], html)
                            : html;
                    }, '');
                }
            }
            return str;
        };
        const template = (el) => {
            const dom = createNodes(toString());
            const frag = fragment(dom, { i: 0, e: expressions });
            return el ? frag(el) : frag();
        };
        // If the template contains no expressions, it is 100% static so it's key
        // its own content
        template.isT = true;
        template._k = 0;
        template._h = () => [toString(), expressions, template._k];
        template.key = (key) => {
            template._k = key;
            return template;
        };
        return template;
    }
    /**
     * @param  {NodeList} dom
     * @param  {ReactiveExpressions} tokens
     * @param  {ReactiveProxy} data?
     */
    function fragment(dom, expressions) {
        let node;
        let i = 0;
        const children = dom.childNodes;
        while ((node = children.item(i++))) {
            // Delimiters in the body are found inside comments.
            if (node.nodeType === 8 && node.nodeValue === delimiter) {
                // We are dealing with a reactive node.
                comment(node, expressions);
                continue;
            }
            // Bind attributes, add events, and push onto the fragment.
            if (node instanceof Element)
                attrs(node, expressions);
            if (node.hasChildNodes()) {
                fragment(node, expressions);
            }
            // Select lists "default" selections get out of wack when being moved around
            // inside fragments, this resets them.
            if (node instanceof HTMLOptionElement)
                node.selected = node.defaultSelected;
        }
        return ((parent) => {
            if (parent) {
                parent.appendChild(dom);
                return parent;
            }
            return dom;
        });
    }
    /**
     * Given a node, parse for meaningful expressions.
     * @param  {Element} node
     * @returns void
     */
    function attrs(node, expressions) {
        var _a;
        const toRemove = [];
        let i = 0;
        let attr;
        while ((attr = node.attributes[i++])) {
            if (expressions.i >= expressions.e.length)
                return;
            if (attr.value !== delimiterComment)
                continue;
            let attrName = attr.name;
            const expression = expressions.e[expressions.i++];
            if (attrName.charAt(0) === '@') {
                const event = attrName.substring(1);
                node.addEventListener(event, expression);
                if (!listeners.has(node))
                    listeners.set(node, new Map());
                (_a = listeners.get(node)) === null || _a === undefined ? undefined : _a.set(event, expression);
                toRemove.push(attrName);
            }
            else {
                // Logic to determine if this is an IDL attribute or a content attribute
                const isIDL = (attrName === 'value' && 'value' in node) ||
                    attrName === 'checked' ||
                    (attrName.startsWith('.') && (attrName = attrName.substring(1)));
                w(expression, (value) => {
                    if (isIDL) {
                        // Handle all IDL attributes, TS won’t like this since it is not
                        // fully aware of the type we are operating on, but JavaScript is
                        // perfectly fine with it, so we need to ignore TS here.
                        // @ts-ignore:next-line
                        node[attrName] = value;
                        // Explicitly set the "value" to false remove the attribute. However
                        // we need to be sure this is not a "Reflected" attribute, so we check
                        // the current value of the attribute to make sure it is not the same
                        // as the value we just set. If it is the same, it must be reflected.
                        // so removing the attribute would remove the idl we just set.
                        if (node.getAttribute(attrName) != value)
                            value = false;
                    }
                    // Set a standard content attribute.
                    value !== false
                        ? node.setAttribute(attrName, value)
                        : (node.removeAttribute(attrName), i--);
                });
            }
        }
        toRemove.forEach((attrName) => node.removeAttribute(attrName));
    }
    /**
     * Removes DOM nodes from the dom and cleans up any attached listeners.
     * @param node - A DOM element to remove
     */
    function removeNodes(node) {
        node.forEach(removeNode);
    }
    /**
     * Removes the node from the dom and cleans up any attached listeners.
     * @param node - A DOM element to remove
     */
    function removeNode(node) {
        var _a;
        node.remove();
        (_a = listeners
            .get(node)) === null || _a === undefined ? undefined : _a.forEach((listener, event) => node.removeEventListener(event, listener));
    }
    /**
     * Given a textNode, parse the node for expressions and return a fragment.
     * @param  {Node} node
     * @param  {ReactiveProxy} data
     * @param  {ReactiveExpressions} tokens
     * @returns DocumentFragment
     */
    function comment(node, expressions) {
        var _a;
        // At this point, we know we're dealing with some kind of reactive token fn
        const expression = expressions.e[expressions.i++];
        let boundNode;
        if (expression && isTpl(expression.e)) {
            // If the expression is an html`` (ArrowTemplate), then call it with data
            // and then call the ArrowTemplate with no parent, so we get the nodes.
            boundNode = createPartial().add(expression.e)();
        }
        else {
            // This is where the *actual* reactivity takes place:
            let partialMemo;
            boundNode = (partialMemo = w(expression, (value) => setNode(value, partialMemo)))();
        }
        (_a = node.parentNode) === null || _a === undefined ? undefined : _a.replaceChild(boundNode, node);
    }
    /**
     * Set the value of a given node.
     * @param  {Node} n
     * @param  {any} value
     * @param  {ReactiveProxy} data
     * @returns Node
     */
    function setNode(value, p) {
        const isUpdate = typeof p === 'function';
        const partial = isUpdate ? p : createPartial();
        Array.isArray(value)
            ? value.forEach((item) => measure('partialAdd', () => partial.add(item)))
            : partial.add(value);
        if (isUpdate)
            partial._up();
        return partial;
    }
    /**
     * Given an HTML string, produce actual DOM elements.
     * @param html - a string of html
     * @returns
     */
    function createNodes(html) {
        var _a;
        const tpl = (_a = templateMemo[html]) !== null && _a !== undefined ? _a : (() => {
            const tpl = document.createElement('template');
            tpl.innerHTML = html;
            return (templateMemo[html] = tpl);
        })();
        const dom = tpl.content.cloneNode(true);
        dom.normalize(); // textNodes are automatically split somewhere around 65kb, this joins them back together.
        return dom;
    }
    /**
     * Template partials are stateful functions that perform a fragment render when
     * called, but also have function properties like ._up() which attempts to only
     * perform a patch of the previously rendered nodes.
     * @returns TemplatePartial
     */
    function createPartial(group = Symbol()) {
        let html = '';
        let expressions = { i: 0, e: [] };
        let chunks = [];
        let previousChunks = [];
        const keyedChunks = new Map();
        const toRemove = [];
        /**
         * This is the actual document partial function.
         */
        const partial = () => {
            let dom;
            if (!chunks.length)
                addPlaceholderChunk();
            if (chunks.length === 1 && !isTpl(chunks[0].tpl)) {
                // In this case we have only a textNode to render, so we can just return
                // the text node with the proper value applied.
                const chunk = chunks[0];
                chunk.dom.length
                    ? (chunk.dom[0].nodeValue = chunk.tpl)
                    : chunk.dom.push(document.createTextNode(chunk.tpl));
                dom = chunk.dom[0];
            }
            else {
                dom = assignDomChunks(fragment(createNodes(html), expressions)());
            }
            reset();
            return dom;
        };
        partial.ch = () => previousChunks;
        partial.l = 0;
        partial.add = (tpl) => {
            if (!tpl && tpl !== 0)
                return partial;
            // If the tpl is a string or a number it means the result should be a
            // textNode — in that case we do *not* want to generate any DOM nodes for it
            // so here we want to ensure that `html` is just ''.
            let localExpressions = [];
            let key;
            let template = '';
            if (isTpl(tpl)) {
                [template, localExpressions, key] = tpl._h();
            }
            html += template;
            html += bookendComment;
            const keyedChunk = key && keyedChunks.get(key);
            const chunk = keyedChunk || {
                html: template,
                exp: localExpressions,
                dom: [],
                tpl,
                key,
            };
            chunks.push(chunk);
            if (key) {
                // Since this is a keyed chunk, we need to either add it to the
                // keyedChunks map, or we need to update the expressions in that chunk.
                keyedChunk
                    ? keyedChunk.exp.forEach((exp, i) => exp._up(localExpressions[i].e))
                    : keyedChunks.set(key, chunk);
            }
            expressions.e.push(...localExpressions);
            partial.l++;
            return partial;
        };
        partial._up = () => {
            const subPartial = createPartial(group);
            let startChunking = 0;
            let lastNode = previousChunks[0].dom[0];
            // If this is an empty update, we need to "placehold" its spot in the dom
            // with an empty placeholder chunk.
            if (!chunks.length)
                addPlaceholderChunk(document.createComment(''));
            const closeSubPartial = () => {
                if (!subPartial.l)
                    return;
                const frag = subPartial();
                const last = frag.lastChild;
                lastNode[startChunking ? 'after' : 'before'](frag);
                transferChunks(subPartial, chunks, startChunking);
                lastNode = last;
            };
            chunks.forEach((chunk, index) => {
                // There are a few things that can happen in here:
                // 1. We match a key and output previously rendered nodes.
                // 2. We use a previous rendered dom, and swap the expression.
                // 3. The actual HTML chunk is changed/new so we need to remove the nodes.
                // 4. We render totally new nodes using a partial.
                const prev = previousChunks[index];
                if (chunk.key && chunk.dom.length) {
                    closeSubPartial();
                    // This is a keyed dom chunk that has already been rendered.
                    if (!prev || prev.dom !== chunk.dom) {
                        lastNode[index ? 'after' : 'before'](...chunk.dom);
                    }
                    lastNode = chunk.dom[chunk.dom.length - 1];
                    // Note: we don't need to update keyed chunks expressions here because
                    // it is done in partial.add as soon as a keyed chunk is added to the
                    // partial.
                }
                else if (prev && chunk.html === prev.html && !prev.key) {
                    // We can reuse the DOM node, and need to swap the expressions. First
                    // close out any partial chunks. Then "upgrade" the expressions.
                    closeSubPartial();
                    prev.exp.forEach((expression, i) => expression._up(chunk.exp[i].e));
                    // We always want to reference the root expressions as long as the
                    // chunks remain equivalent, so here we explicitly point the new chunk's
                    // expression set to the original chunk expression set — which was just
                    // updated with the new expression's "values".
                    chunk.exp = prev.exp;
                    chunk.dom = prev.dom;
                    lastNode = chunk.dom[chunk.dom.length - 1];
                    if (isTextNodeChunk(chunk) && lastNode instanceof Text) {
                        lastNode.nodeValue = chunk.tpl;
                    }
                }
                else {
                    if (prev && chunk.html !== prev.html && !prev.key) {
                        // The previous chunk in this position has changed its underlying html
                        // this happens when someone is using non-reactive values in the
                        // template. We need to remove the previous nodes.
                        toRemove.push(...prev.dom);
                    }
                    // Ok, now we're building some new DOM up y'all, let the chunking begin!
                    if (!subPartial.l)
                        startChunking = index;
                    subPartial.add(chunk.tpl);
                }
            });
            closeSubPartial();
            let node = lastNode === null || lastNode === undefined ? undefined : lastNode.nextSibling;
            while (node && group in node) {
                toRemove.push(node);
                const next = node.nextSibling;
                node = next;
            }
            removeNodes(toRemove);
            reset();
        };
        // What follows are internal "methods" for each partial.
        const reset = () => {
            toRemove.length = 0;
            html = '';
            partial.l = 0;
            expressions = { i: 0, e: [] };
            previousChunks = [...chunks];
            chunks = [];
        };
        const addPlaceholderChunk = (node) => {
            html = '<!---->';
            chunks.push({
                html,
                exp: [],
                dom: node ? [node] : [],
                tpl: t `${html}`,
                key: 0,
            });
        };
        /**
         * Walks through the document fragment and assigns the nodes to the correct
         * DOM chunk. Chunks of DOM are divided by the bookend comment.
         * @param frag - A document fragment that has been created from a partial
         * @returns
         */
        const assignDomChunks = (frag) => {
            let chunkIndex = 0;
            const toRemove = [];
            frag.childNodes.forEach((node) => {
                if (node.nodeType === 8 && node.data === bookend) {
                    chunkIndex++;
                    // Remove the comment
                    toRemove.push(node);
                    return;
                }
                Object.defineProperty(node, group, { value: group });
                chunks[chunkIndex].dom.push(node);
            });
            toRemove.forEach((node) => node.remove());
            return frag;
        };
        const transferChunks = (partialA, chunksB, chunkIndex) => {
            partialA.ch().forEach((chunk, index) => {
                chunksB[chunkIndex + index].dom = chunk.dom;
            });
        };
        return partial;
    }
    /**
     * Checks if a given chunk is a textNode chunk.
     * @param chunk - A partial chunk
     * @returns
     */
    function isTextNodeChunk(chunk) {
        return chunk.dom.length === 1 && !isTpl(chunk.tpl);
    }

    /**
     * html is an alias for t
     */
    const html = t;

    const browser$1 = chrome;

    function format (arr) {
      // need an if-statement to check if arr.response === null, and then make a placeholder HTML to draw
      console.log('array to format: ' + JSON.stringify(arr, null, 2));
      if (arr === null) {
        const appElement = document.getElementById('list');
        const template = html`
      <div class="searchItem">
        <h2>Her kommer produktlinker til brukte alternativer n&aring;r vi finner det.</h2>
      </div>
    `;
        template(appElement);
      } else if (arr !== null) {
        if (arr.length > 1) {
          arr.reverse();
        }
        const appElement = document.getElementById('list');
        console.log('array length: ' + arr.length);
        let tempTemplate = '';
        for (let i = 0; i < arr.length; i++) {
          console.log('Array item number: ' + i + ' ' + arr[i].searchSite);
          if (arr[i].searchSite === 'FINN.no') {
            const item = `
          <div class="searchItem">
            <h2>${arr[i].title}</h2>
            <p class="searchHits"><em>${arr[i].searchResults}</em> produkter p&aring; ${arr[i].searchSite}:<br /><a target="_blank" href="${arr[i].URL}">${arr[i].queryPartReadable}</a></p>
          </div>
        `;
            console.log('FINN item: ' + item);
            tempTemplate += item;
          } else if (arr[i].searchSite === 'Bookis.no') {
            const item = `
          <div class="searchItem">
            <h2>${arr[i].title}</h2>
            <p class="searchHits">${arr[i].searchResults} tilgjengelig p&aring; ${arr[i].searchSite}:<br /><a target="_blank" href="${arr[i].URL}">${arr[i].ISBN}</a></p>
          </div>
        `;
            console.log('Bookis item: ' + item);
            tempTemplate += item;
          }
        }
        const template = html`${tempTemplate}`;
        template(appElement);
      }
    }

    function sendMessage () {
      browser$1.runtime.sendMessage({ type: 'POPUP_OPEN' })
        .then((response) => {
          console.info('Popup-js received response from background: ', JSON.stringify(response, null, ' '));
        })
        .catch((error) => {
          console.warn('Popup.js could not send/receive message to/freom background', error);
        });
    }

    function handleMessage (obj, sender, sendResponse) {
      console.log('## Type:      ' + obj.type);
      console.log('## Sender:    ' + JSON.stringify(sender, null, ' '));
      format(obj.searchArr);
    }

    console.log('Hello popup.js!');

    // Trigger script when opened
    browser.runtime.onMessage.addListener(handleMessage);
    sendMessage();
    console.log('Hello popup.js!');

}));
