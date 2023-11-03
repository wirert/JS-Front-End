function printLoadProgress(percentDone) {
  let progress = `[${"%".repeat(percentDone / 10)}${".".repeat(
    10 - percentDone / 10
  )}]`;

  if (percentDone === 100) {
    console.log(`100% Complete!`);
    console.log(progress);
    return;
  }

  console.log(`${percentDone}% ${progress}`);
  console.log("Still loading...");
}

printLoadProgress(50);
