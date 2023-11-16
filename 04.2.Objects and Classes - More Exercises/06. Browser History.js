function printBrowserHistory(browserHistory, inputArr) {
  for (const text of inputArr) {
    let [action, ...rest] = text.split(" ");
    const site = rest.join(" ");

    if (action === "Open") {
      browserHistory["Open Tabs"].push(site);
    } else if (action == "Clear") {
      browserHistory["Open Tabs"].length = 0;
      browserHistory["Recently Closed"].length = 0;
      browserHistory["Browser Logs"].length = 0;
      continue;
    } else {
      let siteIndex = browserHistory["Open Tabs"].indexOf(site);
      if (siteIndex < 0) {
        continue;
      }

      browserHistory["Open Tabs"].splice(siteIndex, 1);
      browserHistory["Recently Closed"].push(site);
    }

    browserHistory["Browser Logs"].push(text);
  }

  Object.entries(browserHistory).forEach(([key, value]) => {
    if (key === "Browser Name") {
      console.log(value);
    } else {
      console.log(`${key}: ${value.join(", ")}`);
    }
  });
}

printBrowserHistory(
  {
    "Browser Name": "Mozilla Firefox",
    "Open Tabs": ["YouTube"],
    "Recently Closed": ["Gmail", "Dropbox"],
    "Browser Logs": [
      "Open Gmail",
      "Close Gmail",
      "Open Dropbox",
      "Open YouTube",
      "Close Dropbox",
    ],
  },
  ["Open Wikipedia", "Clear History and Cache", "Open Twitter"]
);
