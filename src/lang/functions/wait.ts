/*
-- wait for X ms
--<
    WAIT <duration>
>--

WAIT 1000
*/

export async function wait (...args: string[]): Promise<void> {
  const unparsedMs = args[0]
  if (typeof unparsedMs === 'undefined') {
    return
  }
  const ms = parseFloat(unparsedMs)
  if (!isNaN(ms)) {
    await internalWait(ms)
    // console.log('< WAIT: wait completed for ', ms + 'ms')
  }
}

function internalWait (ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}