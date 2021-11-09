addEventListener('scheduled', event => {
  event.waitUntil(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const resp = await fetch("https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/9f2f26c4-26c4-4145-8c8a-b373f291b802", {
    method: 'POST'
  });
  const data = await resp.json();
  if (data.success) {
    console.log('Triggered deploy hook successfully');
    return new Response(JSON.stringify({
      result: true,
      message: 'DEPLOY HOOK TRIGGERED SUCCESSFULLY'
    }), {
      headers: { 'Content-type': 'application/json' },
      ok: true
    })
  } else {
    return new Response(JSON.stringify({
      result: true,
      message: 'Unable to trigger deploy hook'
    }), {
      headers: { 'Content-type': 'application/json' },
      ok: false,
      status: 400
    })
  }
}