export async function connect(url: string) {
  const ws = new WebSocket(url);
  const inbox: any[] = [];

  // 1. the postman: put every incoming message in the letterbox
  // set this up first so even the very first message ("welcome") is caught.
  ws.onmessage = (event) => {
    try {
      inbox.push(JSON.parse(String(event.data)));
    } catch {
      inbox.push(event.data) // Not a JSON? keep the raw text anyway
    }
  };

  // 2. Wait untill the connection is open (evenet -> Promise)
  await new Promise<void>((resolve, reject) => {
    ws.onopen = () => resolve();
    ws.onerror = () => reject(new Error("Could not connect"));
  })

  // 3. Check the letterbox, waiting up to timeoutMs
  async function next(timeoutMs = 1000) {
    const start = Date.now();
    while (inbox.length === 0) {
      if (Date.now() - start > timeoutMs) {
        throw new Error(`No message within ${timeoutMs}ms`);
      }
      await Bun.sleep(10);
    }
    return inbox.shift();
  }

  // 4. Give the test some easy-to-use functions
  return {
    send: (msg: unknown) => ws.send(JSON.stringify(msg)),
    sendRaw: (text: string) => ws.send(text),
    next,
    close: () => ws.close(),
  };
}
